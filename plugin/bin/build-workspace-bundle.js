#!/usr/bin/env node
"use strict";

// Explicit local export only: never discover installed user skills or download code.
const fs = require("node:fs");
const path = require("node:path");
const { sha } = require("./workspace");
const PACKAGE = path.resolve(__dirname, "..");
const REPO = path.resolve(PACKAGE, "..");
const IMPORTS = ["workspace-context", "work-execution", "artifact-reconciliation", "thought-partner", "technical-analyst", "writer", "devil-advocate", "builder", "data-analyst", "product-brief", "meeting-prep", "stakeholder-update", "strategic-clarity", "planning-workflow", "portfolio-reconciliation", "evidence-backed-specs", "document-collaboration", "competitor-analyst", "hypothesis-tester", "thinking-trail"];

function files(root) {
  const found = [];
  function visit(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (item.name.startsWith(".") || item.name === "__pycache__") continue;
      const full = path.join(dir, item.name);
      if (item.isSymbolicLink()) throw new Error("Symlinks are not permitted in a portable bundle");
      if (item.isDirectory()) visit(full);
      else if (item.isFile()) found.push(full);
    }
  }
  visit(root);
  return found;
}

function description(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^description:\s*(.+)$/m);
  if (!match) throw new Error("Skill needs a concise description");
  return match[1].replace(/^["']|["']$/g, "");
}

function manifest() {
  const skills = fs.readdirSync(path.join(PACKAGE, "skills"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).map((entry) => {
      const root = path.join(PACKAGE, "skills", entry.name);
      return { name: entry.name, description: description(path.join(root, "SKILL.md")), origin: IMPORTS.includes(entry.name) ? "reviewed-agent-skills-export" : "framework-owned", files: files(root).map((file) => ({ path: path.relative(PACKAGE, file).split(path.sep).join("/"), sha256: sha(fs.readFileSync(file)) })) };
    }).sort((a, b) => a.name.localeCompare(b.name));
  const templates = files(path.join(PACKAGE, "workspace-template"))
    .map((file) => ({ path: path.relative(PACKAGE, file).split(path.sep).join("/"), sha256: sha(fs.readFileSync(file)) }));
  templates.sort((a, b) => a.path.localeCompare(b.path));
  const importedFiles = skills.filter((s) => s.origin === "reviewed-agent-skills-export").flatMap((s) => s.files);
  return {
    schemaVersion: 2,
    edition: "workspace-model-v2-unreleased",
    source: { repository: "ahmedkhaledmohamed/agent-skills", contentSnapshotSha256: sha(JSON.stringify(importedFiles)), note: "Content-pinned, reviewed export. This does not claim the source is released or public; the bundle needs no remote access." },
    presets: { starter: ["workspace-context", "thought-partner", "writer"], product: IMPORTS.filter((name) => name !== "evidence-backed-specs"), evidence: ["workspace-context", "technical-analyst", "data-analyst", "evidence-backed-specs"] },
    skills, templates,
  };
}

function sync(source) {
  const root = fs.realpathSync(source);
  if (fs.lstatSync(path.join(root, "skills")).isSymbolicLink()) throw new Error("Use the real reviewed skill source");
  // Read and validate all source paths before replacing derived export directories.
  const inputs = IMPORTS.map((name) => {
    const dir = path.join(root, "skills", name);
    if (!fs.existsSync(path.join(dir, "SKILL.md"))) throw new Error(`Missing source skill: ${name}`);
    return { name, root: dir, files: files(dir).map((file) => ({ relative: path.relative(dir, file), data: fs.readFileSync(file) })) };
  });
  for (const input of inputs) {
    const dest = path.join(PACKAGE, "skills", input.name);
    fs.rmSync(dest, { recursive: true, force: true });
    for (const file of input.files) {
      const target = path.join(dest, file.relative);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file.data);
    }
  }
  const template = path.join(REPO, "framework/templates/workspace");
  const dest = path.join(PACKAGE, "workspace-template");
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(template, dest, { recursive: true });
  fs.writeFileSync(path.join(PACKAGE, "skill-bundle.json"), JSON.stringify(manifest(), null, 2) + "\n");
}

function check() {
  const actual = fs.readFileSync(path.join(PACKAGE, "skill-bundle.json"), "utf8");
  if (actual !== JSON.stringify(manifest(), null, 2) + "\n") throw new Error("Bundle manifest differs; review sources and regenerate");
  for (const file of manifest().templates) {
    const source = path.join(REPO, "framework/templates/workspace", file.path.replace(/^workspace-template\//, ""));
    if (!fs.existsSync(source) || sha(fs.readFileSync(source)) !== file.sha256) throw new Error("Template export is stale");
  }
  const sourceNames = files(path.join(REPO, "framework/templates/workspace")).map((p) => path.relative(path.join(REPO, "framework/templates/workspace"), p).split(path.sep).join("/"));
  if (sourceNames.sort().join("\n") !== manifest().templates.map((f) => f.path.replace(/^workspace-template\//, "")).sort().join("\n")) throw new Error("Template export coverage differs");
  console.log("Bundle hashes and template export match maintained sources.");
}

if (require.main === module) {
  try {
    if (process.argv[2] === "--check") check();
    else if (process.argv[2] === "--skills-source" && process.argv[3]) sync(process.argv[3]);
    else throw new Error("Use --check, or --skills-source <reviewed-repository> to regenerate reviewed exports");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { IMPORTS, manifest, check };
