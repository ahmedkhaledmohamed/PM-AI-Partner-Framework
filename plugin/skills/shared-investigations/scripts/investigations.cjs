#!/usr/bin/env node
"use strict";

// Offline, read-only checks of declared references; no source crawling or fetching.
const fs = require("node:fs");
const path = require("node:path");
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validId = (v) => typeof v === "string" && ID.test(v);
const text = (v) => typeof v === "string" && v.trim().length > 0;

function localFile(root, relative) {
  if (!text(relative) || path.isAbsolute(relative) || /[\\\x00]/.test(relative)
      || relative.split("/").some((p) => !p || ["..", ".", ".git", ".local"].includes(p))) {
    throw new Error("Expected a shared workspace-relative file without traversal or private configuration");
  }
  const target = path.resolve(root, relative);
  let cursor = target;
  while (cursor !== root) {
    if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error("Shared reference traverses a symlink");
    cursor = path.dirname(cursor);
  }
  if (!fs.statSync(target).isFile()) throw new Error("Shared reference is not a file");
  return target;
}

function inspect(directory) {
  const root = path.resolve(directory);
  const errors = [];
  const attempt = (label, fn) => { try { return fn(); } catch (error) { errors.push(`${label}: ${error.message}`); } };
  const read = (relative) => JSON.parse(fs.readFileSync(localFile(root, relative), "utf8"));
  const registry = attempt("registry", () => read("investigations/registry.json"));
  if (!registry || registry.schemaVersion !== 1 || !Array.isArray(registry.sources) || !Array.isArray(registry.investigations)) {
    return { root, errors: [...errors, "Registry needs schemaVersion 1, sources and investigations arrays"], investigations: [] };
  }
  const sourceMap = new Map(), locations = new Set(), ids = new Set(), manifests = new Set(), records = new Set();
  function uniqueStrings(value, label) {
    if (!Array.isArray(value) || value.some((s) => !text(s)) || new Set(value).size !== value.length) throw new Error(`${label} must be a unique string array`);
  }
  function refs(value) {
    uniqueStrings(value, "sourceIds");
    for (const id of value) if (!sourceMap.has(id)) throw new Error(`Unknown source ID: ${id}`);
  }
  for (const source of registry.sources) attempt("source", () => {
    if (!source || !validId(source.id) || ![source.title, source.owner, source.location, source.revision].every(text)
        || !["shared", "restricted"].includes(source.access)) throw new Error("Invalid source identity, owner, location, revision or access");
    if (source.access === "restricted" && !text(source.accessNote)) throw new Error("Restricted source needs an accessNote");
    if (sourceMap.has(source.id)) throw new Error(`Duplicate source ID: ${source.id}`);
    let location;
    if (/^[a-z][a-z0-9+.-]*:/i.test(source.location)) {
      const url = new URL(source.location);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error("Use a stable HTTPS source reference without embedded credentials");
      location = url.href;
    } else location = localFile(root, source.location);
    if (locations.has(location)) throw new Error("Multiple source IDs declare the same maintained location");
    sourceMap.set(source.id, source); locations.add(location);
  });
  const investigations = [];
  for (const item of registry.investigations) attempt("investigation", () => {
    if (!item || !validId(item.id) || ![item.title, item.question].every(text)
        || !["open", "paused", "closed"].includes(item.status)
        || !(item.coordinator === null || text(item.coordinator))) throw new Error("Invalid investigation identity, question, status or coordinator");
    if (ids.has(item.id)) throw new Error(`Duplicate investigation ID: ${item.id}`);
    ids.add(item.id);
    uniqueStrings(item.contributors, "contributors"); refs(item.sourceIds);
    const record = localFile(root, item.record);
    if (!/\.md$/i.test(record) || records.has(record)) throw new Error("Investigation needs its own Markdown record");
    records.add(record);
    uniqueStrings(item.contributions, "contributions");
    const contributionIds = new Set();
    for (const relative of item.contributions) attempt(`contribution for ${item.id}`, () => {
      const file = localFile(root, relative);
      if (manifests.has(file)) throw new Error("Contribution manifest is registered more than once");
      manifests.add(file);
      const c = JSON.parse(fs.readFileSync(file, "utf8"));
      if (!c || c.schemaVersion !== 1 || !validId(c.id) || c.investigationId !== item.id
          || !text(c.contributor) || !["finding", "correction", "reproduction"].includes(c.kind)) throw new Error("Invalid contribution identity, attribution, kind or investigation binding");
      if (contributionIds.has(c.id)) throw new Error("Duplicate contribution ID in this investigation");
      contributionIds.add(c.id);
      if (!item.contributors.includes(c.contributor)) throw new Error("Contribution author is missing from investigation contributors");
      const parent = path.posix.dirname(relative);
      // Validate the manifest-relative path before resolving against the workspace.
      if (!text(c.summary) || c.summary.split(/[\\/]/).some((p) => p === "..") || path.isAbsolute(c.summary)) throw new Error("Summary must stay inside its contribution directory");
      const summary = localFile(root, parent + "/" + c.summary);
      if (!/\.md$/i.test(summary)) throw new Error("Contribution summary must be Markdown");
      refs(c.sourceIds); uniqueStrings(c.newArtifactSourceIds, "newArtifactSourceIds");
      if (!c.sourceRevisions || typeof c.sourceRevisions !== "object" || Array.isArray(c.sourceRevisions)
          || Object.keys(c.sourceRevisions).length !== c.sourceIds.length
          || c.sourceIds.some((id) => !Object.hasOwn(c.sourceRevisions, id) || !text(c.sourceRevisions[id]))) {
        throw new Error("Contribution needs the inspected revision for each source ID");
      }
      for (const id of c.sourceIds) if (!item.sourceIds.includes(id)) throw new Error("Contribution source is not declared by its investigation");
      for (const id of c.newArtifactSourceIds) {
        if (!c.sourceIds.includes(id)) throw new Error("New artifact must also be a contribution source");
        const source = sourceMap.get(id);
        if (!source.location.startsWith(parent + "/")) throw new Error("New artifact must be maintained inside its contribution directory");
        localFile(root, source.location);
      }
    });
    investigations.push({ id: item.id, title: item.title, status: item.status, coordinator: item.coordinator,
      question: item.question, contributors: item.contributors, record: item.record, contributions: item.contributions.length });
  });
  return { root, errors, investigations, limits: "Offline structural checks only; evidence quality, external access, semantic duplication and review approval are not verified." };
}

function main(args = process.argv.slice(2)) {
  const [command, directory = ".", ...extra] = args;
  if (!["list", "check"].includes(command) || extra.length) {
    console.error("Use list|check <workspace>. Commands are read-only and never fetch evidence."); return 2;
  }
  const report = inspect(directory);
  if (command === "list") report.investigations = report.investigations.filter((item) => item.status === "open");
  console.log(JSON.stringify(report, null, 2));
  return report.errors.length ? 1 : 0;
}
module.exports = { inspect, localFile, main };
if (require.main === module) process.exitCode = main();
