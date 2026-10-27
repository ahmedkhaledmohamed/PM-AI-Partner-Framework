"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { init, doctor, exportRecipe } = require("../bin/workspace");

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pm-portability-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function json(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n"); }

test("recipe round trip reproduces every managed baseline file for all runtimes", (t) => {
  const base = fixture(t);
  for (const runtime of ["codex", "claude", "cursor"]) {
    const source = path.join(base, runtime);
    init(source, { runtime, apply: true });
    const preview = exportRecipe(source, { output: "setup-recipe.json" });
    assert.equal(preview.applied, false);
    assert.equal(fs.existsSync(path.join(source, "setup-recipe.json")), false);
    exportRecipe(source, { output: "setup-recipe.json", apply: true });
    const destination = path.join(base, runtime + "-restored");
    init(destination, { recipe: path.join(source, "setup-recipe.json"), apply: true });
    const baseline = JSON.parse(fs.readFileSync(path.join(source, ".workspace-install.json")));
    for (const relative of Object.keys(baseline.files)) {
      assert.deepEqual(fs.readFileSync(path.join(source, relative)), fs.readFileSync(path.join(destination, relative)), relative);
    }
    assert.deepEqual(doctor(destination).errors, []);
  }
});

test("bindings and private content stay local and never enter the recipe or restored workspace", (t) => {
  const base = fixture(t);
  const source = path.join(base, "source");
  const privateFolder = path.join(base, "private-source");
  fs.mkdirSync(privateFolder);
  fs.writeFileSync(path.join(privateFolder, "records.txt"), "SYNTHETIC_PRIVATE_CONTENT");
  const bindings = path.join(base, "bindings.json");
  json(bindings, { schemaVersion: 1, sources: [{ kind: "decisions", location: privateFolder, authority: "Private evidence" }] });
  init(source, { bindings, apply: true });
  const before = fs.readFileSync(path.join(privateFolder, "records.txt"));
  fs.writeFileSync(path.join(source, "working/private-task.md"), "SYNTHETIC_PRIVATE_TASK");
  fs.writeFileSync(path.join(source, "AGENTS.md"), "SYNTHETIC_PRIVATE_INSTRUCTIONS");
  const report = exportRecipe(source, { output: "setup-recipe.json", apply: true });
  assert.ok(report.warnings.length);
  const text = fs.readFileSync(path.join(source, "setup-recipe.json"), "utf8");
  assert.equal(text.includes(privateFolder), false);
  assert.equal(text.includes("SYNTHETIC_PRIVATE"), false);
  const restored = path.join(base, "restored");
  init(restored, { recipe: path.join(source, "setup-recipe.json"), apply: true });
  assert.equal(fs.existsSync(path.join(restored, ".local/sources.json")), false);
  assert.equal(fs.existsSync(path.join(restored, "working/private-task.md")), false);
  assert.deepEqual(fs.readFileSync(path.join(privateFolder, "records.txt")), before);
  assert.equal(doctor(source).warnings.filter((s) => s.startsWith("Source not configured:")).length, 4);
  assert.equal(doctor(source).sources.find((s) => s.kind === "decisions").configured, true);
  // Local configuration is editable without modifying the managed/public baseline.
  fs.writeFileSync(path.join(source, "AGENTS.md"), fs.readFileSync(path.join(restored, "AGENTS.md")));
  json(path.join(source, ".local/sources.json"), { schemaVersion: 1, sources: [] });
  assert.equal(init(source).files.every((file) => file.action === "unchanged"), true);
  assert.equal(doctor(source).warnings.filter((s) => s.startsWith("Source not configured:")).length, 5);
  if (process.platform !== "win32") assert.equal(fs.statSync(path.join(source, ".local/sources.json")).mode & 0o777, 0o600);
});

test("a changed bundle, injected recipe fields or selection overrides fail before writes", (t) => {
  const base = fixture(t);
  const source = path.join(base, "source");
  init(source, { apply: true });
  const recipe = exportRecipe(source).recipe;
  const file = path.join(base, "recipe.json");
  const target = path.join(base, "restored");
  json(file, { ...recipe, bundleSha256: "0".repeat(64) });
  assert.throws(() => init(target, { recipe: file, apply: true }), /exact framework bundle/);
  json(file, { ...recipe, sources: [{ content: "private" }] });
  assert.throws(() => init(target, { recipe: file, apply: true }), /do not belong here/);
  json(file, recipe);
  assert.throws(() => init(target, { recipe: file, runtime: "claude", apply: true }), /selection overrides/);
  assert.equal(fs.existsSync(target), false);
});

test("modified managed skills cannot be silently reproduced from a clean bundle", (t) => {
  const base = fixture(t);
  const source = path.join(base, "source");
  init(source, { apply: true });
  fs.appendFileSync(path.join(source, ".agents/skills/writer/SKILL.md"), "\nUnreviewed local workflow.\n");
  assert.throws(() => exportRecipe(source, { output: "setup-recipe.json", apply: true }), /managed skill/);
  assert.equal(fs.existsSync(path.join(source, "setup-recipe.json")), false);
});

test("recipe output preserves existing files and refuses traversal or symlinks", (t) => {
  const base = fixture(t);
  const source = path.join(base, "source");
  init(source, { apply: true });
  fs.writeFileSync(path.join(source, "recipe.json"), "Preserve existing content");
  assert.ok(exportRecipe(source, { output: "recipe.json", apply: true }).error);
  assert.equal(fs.readFileSync(path.join(source, "recipe.json"), "utf8"), "Preserve existing content");
  assert.throws(() => exportRecipe(source, { output: "../outside.json", apply: true }), /relative workspace path/);
  if (process.platform !== "win32") {
    fs.symlinkSync(path.join(base, "outside.json"), path.join(source, "linked.json"));
    assert.throws(() => exportRecipe(source, { output: "linked.json", apply: true }), /symlink/);
    assert.equal(fs.existsSync(path.join(base, "outside.json")), false);
  }
});

test("binding credentials and malformed input fail without creating a workspace", (t) => {
  const base = fixture(t);
  const input = path.join(base, "bindings.json");
  const target = path.join(base, "workspace");
  for (const data of [
    { schemaVersion: 1, sources: [], token: "synthetic" },
    { schemaVersion: 1, sources: [{ kind: "decisions", location: "https://fixture.invalid/data?token=synthetic" }] },
    { schemaVersion: 1, sources: [{ kind: "unknown", location: "a local source" }] }
  ]) {
    json(input, data);
    assert.throws(() => init(target, { bindings: input, apply: true }));
    assert.equal(fs.existsSync(target), false);
  }
});

test("an offline package recreates a recipe without Git metadata or skill-source access", { skip: process.platform === "win32" }, (t) => {
  const base = fixture(t);
  const packageRoot = path.resolve(__dirname, "..");
  const args = ["--cache", path.join(base, "cache"), "pack", "--ignore-scripts", "--offline", "--json", "--pack-destination", base];
  const pack = process.env.npm_execpath
    ? spawnSync(process.execPath, [process.env.npm_execpath, ...args], { cwd: packageRoot, encoding: "utf8" })
    : spawnSync("npm", args, { cwd: packageRoot, encoding: "utf8" });
  assert.equal(pack.status, 0, pack.stderr);
  const archive = JSON.parse(pack.stdout)[0].filename;
  const extracted = spawnSync("tar", ["-xzf", path.join(base, archive), "-C", base], { encoding: "utf8" });
  assert.equal(extracted.status, 0, extracted.stderr);
  const source = path.join(base, "source");
  init(source, { preset: "evidence", apply: true });
  exportRecipe(source, { output: "recipe.json", apply: true });
  const destination = path.join(base, "destination");
  const cli = path.join(base, "package/bin/workspace.js");
  const wrapper = spawnSync(process.execPath, [path.join(base, "package/bin/install.js"), "recipe", source, "--output", "packed-recipe.json", "--apply"], { cwd: base, encoding: "utf8" });
  assert.equal(wrapper.status, 0, wrapper.stderr + wrapper.stdout);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(source, "packed-recipe.json"))), JSON.parse(fs.readFileSync(path.join(source, "recipe.json"))));
  const result = spawnSync(process.execPath, [cli, "init", destination, "--recipe", path.join(source, "recipe.json"), "--apply"], { cwd: base, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr + result.stdout);
  assert.equal(fs.existsSync(path.join(base, "package/.git")), false);
  assert.ok(fs.existsSync(path.join(destination, ".agents/skills/evidence-backed-specs/scripts/validate_bundle.py")));
  const check = spawnSync(process.execPath, [cli, "doctor", destination], { cwd: base, encoding: "utf8" });
  assert.equal(check.status, 0, check.stderr);
});

test("acceptance CLI previews and rejects existing-workspace arguments without mutation", () => {
  const cli = path.join(__dirname, "../bin/workspace.js");
  const preview = spawnSync(process.execPath, [cli, "test-portability"], { encoding: "utf8" });
  assert.equal(preview.status, 0, preview.stderr);
  const report = JSON.parse(preview.stdout);
  assert.equal(report.applied, false);
  assert.equal(report.root, undefined);
  const invalid = spawnSync(process.execPath, [cli, "test-portability", os.homedir(), "--apply"], { encoding: "utf8" });
  assert.equal(invalid.status, 2);
  assert.match(invalid.stderr, /never takes an existing workspace/);
});

test("acceptance command retains an independently usable package, recipe and inspectable report", { skip: process.platform === "win32" }, (t) => {
  const { testPortability } = require("../bin/portability");
  const report = testPortability({ runtime: "codex", preset: "evidence", apply: true });
  if (report.root) t.after(() => fs.rmSync(report.root, { recursive: true, force: true }));
  assert.equal(report.status, "pass", report.error);
  assert.equal(report.checks.length, 5);
  assert.ok(report.checks.every((c) => c.status === "pass"));
  assert.ok(report.managedFilesCompared > 0);
  assert.equal(JSON.parse(fs.readFileSync(report.report)).status, "pass");
  assert.ok(fs.existsSync(path.join(report.root, "INSPECT.md")));
  assert.ok(fs.existsSync(path.join(report.restored, ".agents/skills/evidence-backed-specs/scripts/validate_bundle.py")));
  assert.equal(fs.existsSync(path.join(report.restored, ".local")), false);
  assert.equal(fs.existsSync(path.join(report.root, "package/.git")), false);
  assert.deepEqual(fs.readdirSync(path.join(report.root, "isolated-home")), []);
  const packed = spawnSync(process.execPath, [path.join(report.root, "package/bin/install.js"), "test-portability", "--runtime", "cursor"], { encoding: "utf8" });
  assert.equal(packed.status, 0, packed.stderr);
  assert.equal(JSON.parse(packed.stdout).runtime, "cursor");
});

test("acceptance command reports a missing local prerequisite as failure and keeps diagnostics", { skip: process.platform === "win32" }, (t) => {
  const cli = path.join(__dirname, "../bin/workspace.js");
  const env = { ...process.env, PATH: "" };
  delete env.npm_execpath;
  const result = spawnSync(process.execPath, [cli, "test-portability", "--apply"], { env, encoding: "utf8" });
  assert.equal(result.status, 1, result.stderr);
  const report = JSON.parse(result.stdout);
  t.after(() => fs.rmSync(report.root, { recursive: true, force: true }));
  assert.equal(report.status, "fail");
  assert.equal(report.checks[0].status, "fail");
  assert.match(report.error, /npm/);
  assert.equal(JSON.parse(fs.readFileSync(report.report)).status, "fail");
  assert.equal(fs.existsSync(path.join(report.root, "restored")), false);
});
