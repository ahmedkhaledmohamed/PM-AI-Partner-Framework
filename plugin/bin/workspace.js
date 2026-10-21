#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

const PACKAGE = path.resolve(__dirname, "..");
const sha = (data) => crypto.createHash("sha256").update(data).digest("hex");

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { throw new Error(`Cannot read valid JSON: ${path.basename(file)}`); }
}

function inside(root, relative) {
  if (!relative || path.isAbsolute(relative) || relative.split(/[\\/]/).some((part) => part === ".." || part === ".git")) {
    throw new Error("Expected a relative workspace path without parent traversal");
  }
  const target = path.resolve(root, relative);
  if (target === root || !target.startsWith(root + path.sep)) throw new Error("Path escapes workspace");
  let cursor = target;
  while (cursor !== root) {
    if (fs.existsSync(cursor) || (() => { try { fs.lstatSync(cursor); return true; } catch { return false; } })()) {
      if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error("Refusing a symlink in a managed path");
    }
    cursor = path.dirname(cursor);
  }
  return target;
}

function targetRoot(value) {
  const root = path.resolve(value);
  if (root === path.parse(root).root || root === os.homedir()) throw new Error("Choose a project directory, not the filesystem root or home directory");
  if (fs.existsSync(root) && fs.lstatSync(root).isSymbolicLink()) throw new Error("Use the real workspace path rather than a symlink");
  return root;
}

function bundle() {
  const data = readJson(path.join(PACKAGE, "skill-bundle.json"));
  if (data.schemaVersion !== 2 || !Array.isArray(data.skills) || !Array.isArray(data.templates)) throw new Error("Unsupported bundle manifest");
  return data;
}

function runtimeDir(runtime) {
  const dirs = { codex: ".agents/skills", claude: ".claude/skills", cursor: ".cursor/skills" };
  if (!dirs[runtime]) throw new Error("Runtime must be codex, claude or cursor");
  return dirs[runtime];
}

function planInit(target, options = {}) {
  const root = targetRoot(target);
  const data = bundle();
  const runtime = options.runtime || "codex";
  const skillDir = runtimeDir(runtime);
  const preset = options.preset || "starter";
  const names = options.skills ? options.skills.split(",").map((s) => s.trim()).filter(Boolean) : data.presets[preset];
  if (!names || !names.length) throw new Error("Choose a valid preset or at least one bundled skill");
  const selected = [...new Set(names)].map((name) => {
    const entry = data.skills.find((s) => s.name === name);
    if (!entry || !/^[a-z0-9-]+$/.test(name)) throw new Error("Unknown bundled skill");
    return entry;
  });
  const files = new Map();
  function add(source, destination, expected) {
    const input = fs.readFileSync(inside(PACKAGE, source));
    if (sha(input) !== expected) throw new Error("Bundled file does not match its reviewed hash");
    files.set(destination, input);
  }
  for (const file of data.templates) {
    const relative = file.path.replace(/^workspace-template\//, "");
    add(file.path, relative === "gitignore.template" ? ".gitignore" : relative, file.sha256);
  }
  const config = JSON.parse(files.get("workspace.json").toString());
  config.runtime = runtime;
  files.set("workspace.json", Buffer.from(JSON.stringify(config, null, 2) + "\n"));
  for (const skill of selected) {
    for (const file of skill.files) add(file.path, file.path.replace(/^skills\//, skillDir + "/"), file.sha256);
  }
  const installed = {
    schemaVersion: 2, edition: data.edition, runtime,
    skills: selected.map((s) => s.name),
    files: Object.fromEntries([...files].map(([name, contents]) => [name, sha(contents)])),
    baseline: Object.fromEntries([...files].map(([name, contents]) => [name, contents.toString("utf8")])),
  };
  files.set(".workspace-install.json", Buffer.from(JSON.stringify(installed, null, 2) + "\n"));
  const operations = [...files].map(([name, content]) => {
    const file = inside(root, name);
    const exists = fs.existsSync(file);
    const action = !exists ? "create" : fs.statSync(file).isFile() && fs.readFileSync(file).equals(content) ? "unchanged" : "conflict";
    return { name, file, content, action };
  });
  return { root, runtime, skills: installed.skills, operations };
}

function init(target, options = {}) {
  const plan = planInit(target, options);
  const report = { root: plan.root, runtime: plan.runtime, skills: plan.skills, applied: false, files: plan.operations.map(({ name, action }) => ({ name, action })) };
  if (plan.operations.some((op) => op.action === "conflict")) {
    return { ...report, error: "Existing files differ. Review and merge manually; nothing was written." };
  }
  if (!options.apply) return report;
  const created = [];
  try {
    for (const op of plan.operations) {
      if (op.action !== "create") continue;
      inside(plan.root, op.name);
      fs.mkdirSync(path.dirname(op.file), { recursive: true });
      fs.writeFileSync(op.file, op.content, { flag: "wx" });
      created.push(op.file);
    }
  } catch (error) {
    for (const file of created.reverse()) fs.unlinkSync(file);
    throw error;
  }
  return { ...report, applied: true };
}

function installation(root) {
  const config = readJson(inside(root, "workspace.json"));
  const installed = readJson(inside(root, ".workspace-install.json"));
  if (config.schemaVersion !== 2 || installed.schemaVersion !== 2) throw new Error("Unsupported workspace schema");
  if (!Array.isArray(config.sources) || !Array.isArray(installed.skills) || !installed.skills.length ||
      !installed.files || typeof installed.files !== "object" || Array.isArray(installed.files) ||
      installed.skills.some((name) => typeof name !== "string" || !/^[a-z0-9-]+$/.test(name))) {
    throw new Error("Malformed workspace metadata");
  }
  runtimeDir(config.runtime);
  if (config.runtime !== installed.runtime) throw new Error("Runtime differs from the installed skill layout; review migration manually");
  return { config, installed };
}

// A review patch from local text to bundled text, not an automatic merge.
function reviewPatch(name, local, proposed) {
  if (local === proposed) return "";
  const lines = (value) => value === null ? [] : value.match(/[^\n]*\n|[^\n]+$/g) || [];
  const before = lines(local), after = lines(proposed);
  const render = (line, prefix) => prefix + line + (line.endsWith("\n") ? "" : "\n\\ No newline at end of file\n");
  return `--- ${local === null ? "/dev/null" : "a/" + name}\n+++ ${proposed === null ? "/dev/null" : "b/" + name}\n` +
    `@@ -${before.length ? 1 : 0},${before.length} +${after.length ? 1 : 0},${after.length} @@\n` +
    before.map((line) => render(line, "-")).join("") + after.map((line) => render(line, "+")).join("");
}

function compare(target) {
  const root = targetRoot(target);
  const { config, installed } = installation(root);
  const proposed = planInit(root, { runtime: config.runtime, skills: installed.skills.join(",") });
  const next = new Map(proposed.operations.filter((op) => op.name !== ".workspace-install.json").map((op) => [op.name, op.content.toString("utf8")]));
  const files = [];
  for (const name of [...new Set([...Object.keys(installed.files), ...next.keys()])].sort()) {
    const file = inside(root, name);
    const local = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
    const upstream = next.has(name) ? next.get(name) : null;
    const baseHash = installed.files[name] || null;
    const base = installed.baseline && Object.hasOwn(installed.baseline, name) ? installed.baseline[name] : null;
    if (base !== null && (typeof base !== "string" || sha(Buffer.from(base)) !== baseHash)) throw new Error("Installed baseline does not match its recorded hash");
    const hash = (value) => value === null ? null : sha(Buffer.from(value));
    let status;
    if (local === upstream) status = "unchanged";
    else if (!baseHash) status = local === null ? "new-upstream" : "conflict";
    else if (hash(upstream) === baseHash) status = "local-only";
    else if (hash(local) === baseHash) status = "upstream-only";
    else status = "conflict";
    files.push({ name, status, baseAvailable: base !== null, base, local, proposed: upstream, patch: reviewPatch(name, local, upstream) });
  }
  return { root, runtime: config.runtime, files, applied: false,
    note: "Read-only three-way review. Local-only files and conflicts need deliberate merging; patches show local-to-bundle differences, not safe automatic updates. Older installs may have hashes without original text. Output can contain private local customizations; keep it private." };
}

function doctor(target) {
  const root = targetRoot(target);
  const errors = [];
  const warnings = [];
  for (const name of ["AGENTS.md", "WORKSPACE.md", "workspace.json", ".workspace-install.json"]) {
    try { if (!fs.statSync(inside(root, name)).isFile()) errors.push(`Missing file: ${name}`); }
    catch { errors.push(`Missing or unsafe file: ${name}`); }
  }
  if (errors.length) return { root, errors, warnings };
  let config, installed;
  try { ({ config, installed } = installation(root)); }
  catch (error) { return { root, errors: [error.message], warnings }; }
  const dir = runtimeDir(config.runtime);
  for (const [name, expected] of Object.entries(installed.files)) {
    try {
      const file = inside(root, name);
      if (sha(fs.readFileSync(file)) !== expected) warnings.push(`Locally modified; preserve: ${name}`);
    } catch { errors.push(`Missing or unsafe managed file: ${name}`); }
  }
  for (const name of installed.skills) {
    if (!/^[a-z0-9-]+$/.test(name) || !fs.existsSync(inside(root, `${dir}/${name}/SKILL.md`))) errors.push("An installed skill entry is missing or invalid");
  }
  const globalDirs = config.runtime === "codex"
    ? [path.join(os.homedir(), ".agents/skills"), path.join(os.homedir(), ".codex/skills")]
    : [path.join(os.homedir(), config.runtime === "claude" ? ".claude/skills" : ".cursor/skills")];
  for (const name of installed.skills.filter((name) => /^[a-z0-9-]+$/.test(name))) {
    if (globalDirs.some((directory) => fs.existsSync(path.join(directory, name, "SKILL.md")))) warnings.push(`A user-level skill has the same name; compare runtime discovery: ${name}`);
  }
  for (const source of config.sources) {
    if (!source || typeof source.kind !== "string") errors.push("Malformed source entry");
    else if (!source.location) warnings.push(`Source not configured: ${source.kind}`);
  }
  return { root, runtime: config.runtime, skills: installed.skills, errors, warnings,
    launchDirectory: root,
    instructionCandidates: config.runtime === "claude" ? ["CLAUDE.md", "AGENTS.md"] : ["AGENTS.md"],
    discovery: "Candidate entry files only; the runtime's actual instruction chain and plugin skills were not inspected.",
    sources: config.sources.filter((source) => source && typeof source.kind === "string")
      .map((source) => ({ kind: source.kind, authority: source.authority || null, configured: Boolean(source.location), verification: "not checked" })),
    note: "Local file/configuration checks only. No connector, account, model, service or dataset was contacted." };
}

function launch(target, options = {}) {
  const report = doctor(target);
  if (report.errors.length) return { ...report, error: "Resolve local workspace errors before launch" };
  let prompt = options.focus ? `Read workspace context, then focus on ${options.focus}` : "Read the workspace entry point and ask me for the focus.";
  if (options.task) {
    const task = inside(report.root, options.task);
    if (!fs.existsSync(task) || !fs.statSync(task).isFile()) throw new Error("Task handoff must be an existing file inside this workspace");
    prompt = `Resume the task in ${options.task}. Read its handoff, verify current sources and continue within existing approvals.` + (options.focus ? ` Focus on ${options.focus}` : "");
  }
  if (report.runtime === "cursor") {
    if (options.apply) throw new Error("Open this workspace in Cursor and submit the displayed prompt; automatic Cursor launch is not configured");
    return { ...report, prompt, note: "Open in Cursor and submit this prompt. No application was started." };
  }
  const command = report.runtime === "codex" ? "codex" : "claude";
  const args = report.runtime === "codex" ? ["-C", report.root, prompt] : [prompt];
  if (!options.apply) return { ...report, command, args, prompt, started: false };
  const result = spawnSync(command, args, { cwd: report.root, stdio: "inherit", shell: false });
  if (result.error) throw new Error("Agent executable unavailable; install it using the runtime's official guidance");
  return { ...report, started: true, exitCode: result.status === null ? 1 : result.status };
}

function main(argv = process.argv.slice(2)) {
  const [command, ...rest] = argv;
  if (!command || command === "--help" || command === "help") {
    console.log("pm-workspace init <directory> [--runtime codex|claude|cursor] [--preset starter|product|evidence] [--skills name,name] [--apply]\npm-workspace doctor <directory>\npm-workspace compare <directory>\npm-workspace start <directory> [--focus text] [--task relative-file] [--apply]\npm-workspace skills\nPreview is the default. No global settings, hooks or connectors are installed.");
    return 0;
  }
  const options = {};
  let target;
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--apply") options.apply = true;
    else if (["--runtime", "--preset", "--skills", "--focus", "--task"].includes(arg)) {
      if (!rest[i + 1] || rest[i + 1].startsWith("--")) throw new Error("Option needs a value");
      options[arg.slice(2)] = rest[++i];
    } else if (!arg.startsWith("-") && target === undefined) target = arg;
    else throw new Error("Unexpected argument");
  }
  if (command === "skills") {
    if (target || Object.keys(options).length) throw new Error("skills does not accept workspace or mutation options");
    const data = bundle();
    console.log(JSON.stringify({ presets: data.presets, skills: data.skills.map(({ name, description }) => ({ name, description })) }, null, 2));
    return 0;
  }
  if (!target || !["init", "doctor", "compare", "start"].includes(command)) throw new Error("Choose init, doctor, compare or start and a project directory");
  if (command === "init" && (options.focus || options.task)) throw new Error("Focus and task options belong to start");
  if (["doctor", "compare"].includes(command) && Object.keys(options).length) throw new Error(`${command} is read-only and accepts no setup or launch options`);
  if (command !== "init" && ["runtime", "preset", "skills"].some((key) => options[key])) throw new Error("Runtime and skill selection belong to init; review workspace migration explicitly");
  const report = command === "init" ? init(target, options) : command === "doctor" ? doctor(target) : command === "compare" ? compare(target) : launch(target, options);
  console.log(JSON.stringify(report, null, 2));
  return report.error || (report.errors && report.errors.length) ? 1 : report.exitCode || 0;
}

module.exports = { inside, planInit, init, doctor, compare, launch, main, sha };
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error(error.message); process.exitCode = 2; }
}
