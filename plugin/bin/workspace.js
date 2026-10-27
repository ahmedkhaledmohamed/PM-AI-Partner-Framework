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
  if (typeof runtime !== "string" || !Object.prototype.hasOwnProperty.call(dirs, runtime)) throw new Error("Runtime must be codex, claude or cursor");
  return dirs[runtime];
}

function fingerprint(data = bundle()) { return sha(JSON.stringify(data)); }

function readRecipe(file, data) {
  const recipe = readJson(file);
  if (!recipe || typeof recipe !== "object" || Array.isArray(recipe)) throw new Error("Invalid setup recipe");
  const keys = ["schemaVersion", "kind", "bundleSha256", "runtime", "skills"];
  if (Object.keys(recipe).some((key) => !keys.includes(key)) || recipe.schemaVersion !== 1 || recipe.kind !== "pm-workspace-setup"
      || !Array.isArray(recipe.skills) || !recipe.skills.length || recipe.skills.some((name) => typeof name !== "string")) {
    throw new Error("Invalid setup recipe; source bindings, content and account configuration do not belong here");
  }
  runtimeDir(recipe.runtime);
  if (recipe.bundleSha256 !== fingerprint(data)) throw new Error("Recipe needs the exact framework bundle used to export it; preserve that source checkout or package archive");
  return recipe;
}

function readBindings(file) {
  const data = readJson(file);
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid local bindings");
  if (data.schemaVersion !== 1 || !Array.isArray(data.sources) || Object.keys(data).some((key) => !["schemaVersion", "sources"].includes(key))) {
    throw new Error("Local bindings need schemaVersion 1 and source locations only");
  }
  const seen = new Set();
  for (const source of data.sources) {
    if (!source || Object.keys(source).some((key) => !["kind", "location", "authority"].includes(key))
        || typeof source.kind !== "string" || !source.kind || typeof source.location !== "string" || !source.location
        || (source.authority !== undefined && typeof source.authority !== "string") || seen.has(source.kind)) {
      throw new Error("Invalid or duplicate local source binding");
    }
    seen.add(source.kind);
    if (source.location.includes("://")) {
      let url;
      try { url = new URL(source.location); } catch { throw new Error("Invalid local source URL"); }
      if (url.username || url.password || url.search || url.hash) throw new Error("Keep credentials and URL parameters in the approved connector, outside source bindings");
    }
  }
  return data;
}

function planInit(target, options = {}) {
  const root = targetRoot(target);
  const data = bundle();
  if (options.recipe && ["runtime", "preset", "skills"].some((key) => options[key])) throw new Error("A recipe fixes runtime and skill selection; do not combine selection overrides");
  const recipe = options.recipe ? readRecipe(options.recipe, data) : null;
  const runtime = recipe ? recipe.runtime : options.runtime || "codex";
  const skillDir = runtimeDir(runtime);
  const preset = options.preset || "starter";
  const names = recipe ? recipe.skills : options.skills ? options.skills.split(",").map((s) => s.trim()).filter(Boolean) : data.presets[preset];
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
    schemaVersion: 2, edition: data.edition, bundleSha256: fingerprint(data), runtime,
    skills: selected.map((s) => s.name),
    files: Object.fromEntries([...files].map(([name, contents]) => [name, sha(contents)])),
    baseline: Object.fromEntries([...files].map(([name, contents]) => [name, contents.toString("utf8")])),
  };
  files.set(".workspace-install.json", Buffer.from(JSON.stringify(installed, null, 2) + "\n"));
  // Machine-local pointers are not part of the managed/public setup manifest.
  if (options.bindings) {
    const bindings = readBindings(options.bindings);
    if (bindings.sources.some((source) => !config.sources.some((role) => role.kind === source.kind))) throw new Error("Binding kind is not declared in workspace.json");
    files.set(".local/sources.json", Buffer.from(JSON.stringify(bindings, null, 2) + "\n"));
  }
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
      fs.mkdirSync(path.dirname(op.file), { recursive: true, mode: op.name.startsWith(".local/") ? 0o700 : 0o755 });
      fs.writeFileSync(op.file, op.content, { flag: "wx", mode: op.name.startsWith(".local/") ? 0o600 : 0o644 });
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
  let bindings = { sources: [] };
  const bindingFile = inside(root, ".local/sources.json");
  if (fs.existsSync(bindingFile)) bindings = readBindings(bindingFile);
  for (const source of config.sources) {
    if (!source || typeof source.kind !== "string") errors.push("Malformed source entry");
    else if (!source.location && !bindings.sources.some((entry) => entry.kind === source.kind)) warnings.push(`Source not configured: ${source.kind}`);
  }
  return { root, runtime: config.runtime, skills: installed.skills, errors, warnings,
    launchDirectory: root,
    instructionCandidates: config.runtime === "claude" ? ["CLAUDE.md", "AGENTS.md"] : ["AGENTS.md"],
    discovery: "Candidate entry files only; the runtime's actual instruction chain and plugin skills were not inspected.",
    sources: config.sources.filter((source) => source && typeof source.kind === "string")
      .map((source) => ({ kind: source.kind, authority: source.authority || null, configured: Boolean(source.location || bindings.sources.some((entry) => entry.kind === source.kind)), verification: "not checked" })),
    note: "Local file/configuration checks only. No connector, account, model, service or dataset was contacted." };
}

function exportRecipe(target, options = {}) {
  const root = targetRoot(target);
  const installed = readJson(inside(root, ".workspace-install.json"));
  if (installed.schemaVersion !== 2 || !Array.isArray(installed.skills) || !installed.files || typeof installed.files !== "object") throw new Error("Invalid installation metadata");
  if (readJson(inside(root, "workspace.json")).runtime !== installed.runtime) throw new Error("Workspace runtime differs from the installed layout; resolve migration before exporting");
  const plan = planInit(root, { runtime: installed.runtime, skills: installed.skills.join(",") });
  if (installed.bundleSha256 && installed.bundleSha256 !== fingerprint()) throw new Error("Use the framework bundle that created this workspace before exporting its recipe");
  let localTemplates = false;
  const dir = runtimeDir(installed.runtime) + "/";
  for (const op of plan.operations.filter((entry) => entry.name !== ".workspace-install.json")) {
    const baseline = installed.files[op.name];
    if (baseline !== sha(op.content)) throw new Error("Installed setup baseline differs from this bundle; inspect the original package before exporting");
    if (op.name.startsWith(dir) && op.action !== "unchanged") throw new Error("A managed skill is missing or customized; review it in its maintained source before exporting a reproducible recipe");
    if (!op.name.startsWith(dir) && op.action !== "unchanged") localTemplates = true;
  }
  const recipe = { schemaVersion: 1, kind: "pm-workspace-setup", bundleSha256: fingerprint(), runtime: installed.runtime, skills: plan.skills };
  const report = { recipe, applied: false, exclusions: ["Local source bindings", "Private content and task history", "Credentials and accounts", "Home configuration, plugins and hooks", "Unmanaged files and additional local skills"],
    warnings: localTemplates ? ["Local instruction/scaffold changes are excluded; the recipe recreates the reviewed bundle baseline."] : [] };
  if (options.output) {
    const output = inside(root, options.output);
    const content = JSON.stringify(recipe, null, 2) + "\n";
    if (fs.existsSync(output) && (!fs.statSync(output).isFile() || fs.readFileSync(output, "utf8") !== content)) return { ...report, error: "Recipe output differs; nothing was written" };
    if (options.apply && !fs.existsSync(output)) {
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, content, { flag: "wx" });
    }
    return { ...report, output: options.output, applied: Boolean(options.apply) };
  }
  if (options.apply) throw new Error("Choose a relative --output for an applied recipe export");
  return report;
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
  if (command === "test-portability") return require("./portability").main(rest);
  if (!command || command === "--help" || command === "help") {
    console.log("pm-workspace init <directory> [--runtime codex|claude|cursor] [--preset starter|product|evidence] [--skills name,name] [--recipe file] [--bindings local-file] [--apply]\npm-workspace recipe <directory> [--output relative-file] [--apply]\npm-workspace doctor <directory>\npm-workspace compare <directory>\npm-workspace start <directory> [--focus text] [--task relative-file] [--apply]\npm-workspace skills\npm-workspace test-portability [--runtime codex|claude|cursor] [--preset starter|product|evidence] [--skills name,name] [--apply]\nPreview is the default. Recipes contain setup selection only; no private content, bindings, global settings, hooks or connectors are copied.");
    return 0;
  }
  const options = {};
  let target;
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--apply") options.apply = true;
    else if (["--runtime", "--preset", "--skills", "--recipe", "--bindings", "--output", "--focus", "--task"].includes(arg)) {
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
  if (!target || !["init", "doctor", "compare", "start", "recipe"].includes(command)) throw new Error("Choose init, recipe, doctor, compare or start and a project directory");
  if (options.output && command !== "recipe") throw new Error("Recipe output belongs to recipe");
  if (["recipe", "bindings"].some((key) => options[key]) && command !== "init") throw new Error("Recipe input and local bindings belong to init");
  if (command === "recipe" && Object.keys(options).some((key) => !["output", "apply"].includes(key))) throw new Error("recipe accepts only output and apply options");
  if (command === "init" && (options.focus || options.task)) throw new Error("Focus and task options belong to start");
  if (["doctor", "compare"].includes(command) && Object.keys(options).length) throw new Error(`${command} is read-only and accepts no setup or launch options`);
  if (command !== "init" && ["runtime", "preset", "skills"].some((key) => options[key])) throw new Error("Runtime and skill selection belong to init; review workspace migration explicitly");
  const report = command === "init" ? init(target, options) : command === "recipe" ? exportRecipe(target, options) : command === "doctor" ? doctor(target) : command === "compare" ? compare(target) : launch(target, options);
  console.log(JSON.stringify(report, null, 2));
  return report.error || (report.errors && report.errors.length) ? 1 : report.exitCode || 0;
}

module.exports = { inside, planInit, init, doctor, compare, launch, exportRecipe, fingerprint, main, sha };
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error(error.message); process.exitCode = 2; }
}
