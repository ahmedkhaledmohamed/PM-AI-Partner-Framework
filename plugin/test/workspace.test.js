"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawnSync } = require("node:child_process");
const { init, doctor, launch } = require("../bin/workspace");

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pm-workspace-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return path.join(dir, "project");
}

test("init previews without creating the target or installing anything", (t) => {
  const root = fixture(t);
  const result = init(root);
  assert.equal(result.applied, false);
  assert.deepEqual(result.skills, ["workspace-context", "thought-partner", "writer"]);
  assert.equal(fs.existsSync(root), false);
});

for (const [runtime, directory] of [["codex", ".agents/skills"], ["claude", ".claude/skills"], ["cursor", ".cursor/skills"]]) {
  test(`init creates a self-contained ${runtime} workspace and is repeatable`, (t) => {
    const root = fixture(t);
    assert.equal(init(root, { runtime, apply: true }).applied, true);
    assert.ok(fs.existsSync(path.join(root, directory, "workspace-context/SKILL.md")));
    assert.ok(fs.existsSync(path.join(root, ".gitignore")));
    assert.equal(fs.existsSync(path.join(root, "gitignore.template")), false);
    const result = doctor(root);
    assert.deepEqual(result.errors, []);
    assert.equal(result.warnings.filter((s) => s.startsWith("Source not configured:")).length, 5);
    assert.equal(init(root, { runtime }).files.every((f) => f.action === "unchanged"), true);
    for (const name of [".codex/config.toml", ".claude/settings.json", ".cursor/mcp.json", ".git/config"]) {
      assert.equal(fs.existsSync(path.join(root, name)), false);
    }
  });
}

test("a user edit blocks the complete apply and remains unchanged", (t) => {
  const root = fixture(t);
  init(root, { apply: true });
  const agent = path.join(root, "AGENTS.md");
  fs.writeFileSync(agent, "Local instructions to preserve.\n");
  fs.unlinkSync(path.join(root, "archive/README.md"));
  const result = init(root, { apply: true });
  assert.ok(result.error);
  assert.equal(fs.readFileSync(agent, "utf8"), "Local instructions to preserve.\n");
  assert.equal(fs.existsSync(path.join(root, "archive/README.md")), false);
});

test("doctor reports modified skills and missing instructions without repairing them", (t) => {
  const root = fixture(t);
  init(root, { apply: true });
  const skill = path.join(root, ".agents/skills/writer/SKILL.md");
  fs.appendFileSync(skill, "\nLocal customization.\n");
  assert.ok(doctor(root).warnings.some((s) => s.includes("writer/SKILL.md")));
  fs.unlinkSync(path.join(root, "WORKSPACE.md"));
  assert.ok(doctor(root).errors.some((s) => s.includes("WORKSPACE.md")));
  assert.equal(fs.existsSync(path.join(root, "WORKSPACE.md")), false);
});

test("managed symlinks cannot redirect an install", { skip: process.platform === "win32" }, (t) => {
  const root = fixture(t);
  const outside = path.join(path.dirname(root), "outside");
  fs.mkdirSync(outside);
  fs.mkdirSync(root);
  fs.symlinkSync(outside, path.join(root, ".agents"), "dir");
  assert.throws(() => init(root, { apply: true }), /symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test("launch previews argument arrays and treats focus as data", (t) => {
  const root = fixture(t);
  init(root, { apply: true });
  const focus = "review a request; $(echo unsafe)";
  const result = launch(root, { focus });
  assert.equal(result.started, false);
  assert.equal(result.command, "codex");
  assert.equal(result.args[0], "-C");
  assert.ok(result.args[2].includes(focus));
  assert.throws(() => launch(root, { task: "../outside.md" }), /relative workspace path/);
  assert.throws(() => launch(root, { task: "missing.md" }), /existing file/);
  const resumed = launch(root, { task: "working/task.md" });
  assert.ok(resumed.prompt.includes("working/task.md"));
});

test("Cursor has an explicit manual launch boundary", (t) => {
  const root = fixture(t);
  init(root, { runtime: "cursor", apply: true });
  assert.ok(launch(root).note.includes("Open in Cursor"));
  assert.throws(() => launch(root, { apply: true }), /automatic Cursor launch is not configured/);
});

test("invalid presets and CLI options fail without writes", (t) => {
  const root = fixture(t);
  assert.throws(() => init(root, { preset: "unknown" }), /valid preset/);
  assert.throws(() => init(root, { skills: "../../outside" }), /Unknown bundled skill/);
  const cli = path.join(__dirname, "../bin/workspace.js");
  const result = spawnSync(process.execPath, [cli, "init", root, "--runtime", "unknown", "--apply"], { encoding: "utf8" });
  assert.equal(result.status, 2);
  assert.equal(fs.existsSync(root), false);
});

test("evidence preset includes the references and runnable example validator", (t) => {
  const root = fixture(t);
  init(root, { preset: "evidence", apply: true });
  const folder = path.join(root, ".agents/skills/evidence-backed-specs");
  assert.ok(fs.existsSync(path.join(folder, "references/operating-model.md")));
  assert.ok(fs.existsSync(path.join(folder, "scripts/validate_bundle.py")));
  assert.deepEqual(doctor(root).errors, []);
});

test("npm package includes every file required by its bundle manifest", { skip: process.platform === "win32" && !process.env.npm_execpath }, (t) => {
  const root = fixture(t);
  const packageRoot = path.resolve(__dirname, "..");
  const args = ["--cache", path.join(path.dirname(root), "npm-cache"), "pack", "--dry-run", "--ignore-scripts", "--offline", "--json"];
  const result = process.env.npm_execpath
    ? spawnSync(process.execPath, [process.env.npm_execpath, ...args], { cwd: packageRoot, encoding: "utf8" })
    : spawnSync("npm", args, { cwd: packageRoot, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const packed = new Set(JSON.parse(result.stdout)[0].files.map((entry) => entry.path));
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, "skill-bundle.json"), "utf8"));
  for (const file of [...manifest.templates, ...manifest.skills.flatMap((skill) => skill.files)]) {
    assert.ok(packed.has(file.path), `Missing from package: ${file.path}`);
  }
  for (const file of ["bin/workspace.js", "skill-bundle.json"]) assert.ok(packed.has(file));
});
