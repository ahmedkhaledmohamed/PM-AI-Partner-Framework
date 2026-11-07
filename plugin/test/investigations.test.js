"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { init, doctor, compare, exportRecipe } = require("../bin/workspace");

function fixture(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "pm-investigations-"));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  return base;
}
function run(root, command) {
  return spawnSync(process.execPath, [path.join(root, "scripts/investigations.cjs"), command, root], { encoding: "utf8" });
}

for (const runtime of ["codex", "claude", "cursor"]) {
  test(`investigation preset installs a self-contained ${runtime} collaboration space`, (t) => {
    const root = path.join(fixture(t), "workspace");
    assert.equal(init(root, { runtime, preset: "investigations" }).applied, false);
    assert.equal(fs.existsSync(root), false);
    assert.equal(init(root, { runtime, preset: "investigations", apply: true }).applied, true);
    assert.deepEqual(doctor(root).errors, []);
    assert.equal(fs.existsSync(path.join(root, "profiles")), false);
    assert.equal(fs.existsSync(path.join(root, "AGENTS.append.md")), false);
    const result = run(root, "check");
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout).investigations, []);
    assert.ok(init(root, { runtime, preset: "investigations" }).files.every((f) => f.action === "unchanged"));
    assert.ok(compare(root).files.every((f) => f.status === "unchanged"));
  });
}

test("the default and product selections do not silently opt into shared research", (t) => {
  const base = fixture(t);
  for (const preset of ["starter", "product", "evidence"]) {
    const root = path.join(base, preset);
    const result = init(root, { preset, apply: true });
    assert.equal(result.skills.includes("shared-investigations"), false);
    assert.equal(fs.existsSync(path.join(root, "investigations")), false);
    assert.equal(fs.existsSync(path.join(root, "profiles")), false);
  }
});

test("an existing instruction file blocks all writes and preserves its local policy", (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, "AGENTS.md"), "Keep this environment's local policy.\n");
  const result = init(root, { preset: "investigations", apply: true });
  assert.ok(result.error);
  assert.equal(fs.readFileSync(path.join(root, "AGENTS.md"), "utf8"), "Keep this environment's local policy.\n");
  assert.deepEqual(fs.readdirSync(root), ["AGENTS.md"]);
});

test("two contribution records share source IDs and an installed checker detects broken bindings", (t) => {
  const root = path.join(fixture(t), "workspace");
  init(root, { preset: "investigations", apply: true });
  const recordDir = path.join(root, "investigations/draft-recovery");
  fs.mkdirSync(recordDir); fs.writeFileSync(path.join(recordDir, "README.md"), "# Fictional research\nBoth observations remain visible pending coordinator review.\n");
  const registry = { schemaVersion: 1, sources: [{ id: "draft-study", title: "Fictional recovery study", owner: "Research team",
    location: "https://example.org/study/3", revision: "study-3", access: "shared" }], investigations: [{ id: "draft-recovery", title: "Draft recovery", question: "What interrupts recovery?", status: "open", coordinator: "Casey", contributors: ["Morgan", "Riley"], record: "investigations/draft-recovery/README.md", sourceIds: ["draft-study"], contributions: [] }] };
  for (const [id, contributor] of [["study-review", "Morgan"], ["reproduction", "Riley"]]) {
    const relative = `investigations/draft-recovery/contributions/${id}`;
    fs.mkdirSync(path.join(root, relative), { recursive: true });
    fs.writeFileSync(path.join(root, relative, "README.md"), `# Fictional contribution by ${contributor}\nSee draft-study; method and limitations recorded here.\n`);
    const manifest = relative + "/contribution.json";
    fs.writeFileSync(path.join(root, manifest), JSON.stringify({ schemaVersion: 1, id, investigationId: "draft-recovery", contributor, kind: "reproduction", summary: "README.md", sourceIds: ["draft-study"], sourceRevisions: { "draft-study": "study-3" }, newArtifactSourceIds: [] }));
    registry.investigations[0].contributions.push(manifest);
  }
  const file = path.join(root, "investigations/registry.json");
  fs.writeFileSync(file, JSON.stringify(registry));
  assert.equal(run(root, "check").status, 0);
  const result = JSON.parse(run(root, "list").stdout);
  assert.equal(result.investigations[0].contributions, 2);
  assert.equal(result.investigations[0].coordinator, "Casey");
  const before = fs.readFileSync(file); run(root, "list"); run(root, "check");
  assert.deepEqual(fs.readFileSync(file), before);
  registry.investigations[0].sourceIds = []; fs.writeFileSync(file, JSON.stringify(registry));
  assert.equal(run(root, "check").status, 1);
});

test("a recipe recreates the investigation setup while excluding findings and private bindings", (t) => {
  const base = fixture(t), source = path.join(base, "source"), destination = path.join(base, "restored");
  init(source, { preset: "investigations", apply: true });
  const registry = { schemaVersion: 1, sources: [], investigations: [{ id: "private-question", title: "PRIVATE_FIXTURE", question: "PRIVATE_FIXTURE", status: "open", coordinator: null, contributors: [], record: "investigations/private-question/README.md", sourceIds: [], contributions: [] }] };
  fs.mkdirSync(path.join(source, "investigations/private-question"));
  fs.writeFileSync(path.join(source, "investigations/private-question/README.md"), "PRIVATE_FIXTURE");
  fs.writeFileSync(path.join(source, "investigations/registry.json"), JSON.stringify(registry));
  fs.mkdirSync(path.join(source, ".local"));
  fs.writeFileSync(path.join(source, ".local/sources.json"), JSON.stringify({ schemaVersion: 1, sources: [] }));
  const report = exportRecipe(source, { output: "setup.json", apply: true });
  assert.ok(report.warnings.length);
  assert.equal(fs.readFileSync(path.join(source, "setup.json"), "utf8").includes("PRIVATE_FIXTURE"), false);
  init(destination, { recipe: path.join(source, "setup.json"), apply: true });
  assert.deepEqual(JSON.parse(run(destination, "check").stdout).investigations, []);
  assert.equal(fs.existsSync(path.join(destination, "investigations/private-question")), false);
  assert.equal(fs.existsSync(path.join(destination, ".local")), false);
});
