"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { randomBytes } = require("node:crypto");
const { init, sha } = require("./workspace");

const PACKAGE = path.resolve(__dirname, "..");
const PRIVATE = "FICTIONAL_PRIVATE_ACCEPTANCE_MARKER";
const PROMPT = "Read workspace context, then focus on this fictional task: a notes app wants to reduce abandoned drafts. Identify the problem, assumptions and evidence needed; invent no evidence. Use the local SELECTED_SKILL skill and identify its file path. Save a concise handoff in working/task.md. Do not contact services or read files outside this workspace.";
const LIMITS = ["No agent was launched; skill discovery and fresh-session continuation remain unchecked.", "No accounts, plugins, connectors or private source data were tested.", "This is a synthetic baseline test on this machine, not a clean-machine or full environment certification."];

function json(file, value) { fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", { flag: "wx" }); }

function run(command, args, cwd, env) {
  const result = spawnSync(command, args, { cwd, env, encoding: "utf8", shell: false, timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Local ${path.basename(command)} step failed: ${result.error ? result.error.message : result.stderr || result.stdout}`);
  return result.stdout;
}

function testPortability(options = {}) {
  // Validate the entire selection before creating any files.
  const selection = init(path.join(os.tmpdir(), "pm-acceptance-selection-" + randomBytes(8).toString("hex")), { ...options, apply: false });
  if (selection.error) throw new Error(selection.error);
  const preview = { applied: false, runtime: selection.runtime, skills: selection.skills,
    plan: ["Create a new temporary test directory and isolated child-process home.", "Pack this local framework offline, then extract the archive without Git metadata.", "Create a synthetic source workspace, export its recipe and restore through the extracted CLI.", "Compare every managed file and check synthetic private content and bindings are excluded.", "Retain the archive, recipe, source, restored workspace and report for inspection."],
    prerequisites: ["Node.js", "npm", "tar"], limits: LIMITS };
  if (!options.apply) return preview;

  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pm-portability-acceptance-"));
  const home = path.join(root, "isolated-home");
  fs.mkdirSync(home, { mode: 0o700 });
  const env = { PATH: process.env.PATH, HOME: home, USERPROFILE: home,
    XDG_CONFIG_HOME: path.join(home, ".config"), CODEX_HOME: path.join(home, ".codex"),
    CLAUDE_CONFIG_DIR: path.join(home, ".claude"), npm_config_userconfig: path.join(home, ".npmrc"),
    npm_config_globalconfig: path.join(home, "global-npmrc"), npm_config_registry: "https://registry.npmjs.org/",
    TMPDIR: root, TMP: root, TEMP: root };
  for (const key of ["SystemRoot", "COMSPEC", "PATHEXT"]) if (process.env[key]) env[key] = process.env[key];
  const prompt = PROMPT.replace("SELECTED_SKILL", selection.skills.includes("thought-partner") ? "thought-partner" : selection.skills[0]);
  const checks = [];
  const report = { ...preview, applied: true, status: "fail", root, node: process.version, platform: process.platform,
    arch: process.arch, checks, limits: LIMITS, report: path.join(root, "report.json") };
  function check(name, action) {
    const entry = { name, status: "fail" };
    checks.push(entry);
    action();
    entry.status = "pass";
  }
  try {
    let archive;
    const extracted = path.join(root, "package");
    const cli = path.join(extracted, "bin/workspace.js");
    const source = path.join(root, "source");
    const restored = path.join(root, "restored");
    function cliRun(args) { return JSON.parse(run(process.execPath, [cli, ...args], root, env)); }
    check("offline-package", () => {
      const args = ["--cache", path.join(root, "npm-cache"), "pack", "--ignore-scripts", "--offline", "--json", "--registry=https://registry.npmjs.org/", "--pack-destination", root];
      const output = process.env.npm_execpath
        ? run(process.execPath, [process.env.npm_execpath, ...args], PACKAGE, env)
        : run(process.platform === "win32" ? "npm.cmd" : "npm", args, PACKAGE, env);
      const filename = JSON.parse(output)[0].filename;
      if (path.basename(filename) !== filename) throw new Error("Unexpected package filename");
      archive = path.join(root, filename);
      report.archive = archive;
      report.archiveSha256 = sha(fs.readFileSync(archive));
      run("tar", ["-xzf", archive, "-C", root], root, env);
      if (fs.existsSync(path.join(extracted, ".git"))) throw new Error("Unexpected Git metadata");
    });
    check("recipe-export-and-restore", () => {
      const selected = ["--runtime", selection.runtime, "--skills", selection.skills.join(",")];
      cliRun(["init", source, ...selected, "--apply"]);
      fs.writeFileSync(path.join(source, "working/private-fixture.md"), PRIVATE);
      fs.mkdirSync(path.join(source, ".local"), { mode: 0o700 });
      json(path.join(source, ".local/sources.json"), { schemaVersion: 1, sources: [{ kind: "decisions", location: path.join(root, "fictional-private-store") }] });
      cliRun(["recipe", source, "--output", "setup-recipe.json", "--apply"]);
      fs.copyFileSync(path.join(source, "setup-recipe.json"), path.join(root, "setup-recipe.json"));
      cliRun(["init", restored, "--recipe", path.join(root, "setup-recipe.json"), "--apply"]);
      report.restored = restored;
    });
    check("managed-file-equality", () => {
      const manifest = JSON.parse(fs.readFileSync(path.join(source, ".workspace-install.json")));
      const files = [...Object.keys(manifest.files), ".workspace-install.json"];
      for (const file of files) {
        if (!fs.readFileSync(path.join(source, file)).equals(fs.readFileSync(path.join(restored, file)))) throw new Error(`Managed file differs: ${file}`);
      }
      report.managedFilesCompared = files.length;
      report.bundleSha256 = manifest.bundleSha256;
    });
    check("private-fixture-exclusion", () => {
      const recipe = fs.readFileSync(path.join(root, "setup-recipe.json"), "utf8");
      if (recipe.includes(PRIVATE) || recipe.includes(root) || recipe.includes("fictional-private-store")) throw new Error("Private fixture leaked into recipe");
      if (fs.existsSync(path.join(restored, ".local")) || fs.existsSync(path.join(restored, "working/private-fixture.md"))) throw new Error("Private fixture copied into restored workspace");
      if (fs.readFileSync(path.join(source, "working/private-fixture.md"), "utf8") !== PRIVATE) throw new Error("Source fixture changed");
    });
    check("restored-local-diagnostics", () => {
      const result = cliRun(["doctor", restored]);
      if (result.errors.length || result.warnings.some((s) => !s.startsWith("Source not configured:"))) throw new Error("Unexpected restored workspace diagnostics");
      report.expectedWarnings = result.warnings;
    });
    report.status = "pass";
    report.manual = { workspace: restored, prompt,
      continuationPrompt: "Resume working/task.md. Read the handoff and state the unresolved decision and next action. Do not contact services or read files outside this workspace.",
      steps: ["Open the restored workspace in a fresh session of the selected agent runtime using your normal account.", "Submit the prompt; verify the skill path belongs to this restored workspace and inspect the handoff.", "Start another fresh session in the same workspace; submit the continuation prompt and check it uses the saved handoff."],
      note: "Your actual agent session may inherit machine-global policy, plugins and sign-ins. Inspect those separately; this check does not certify them." };
    const instructions = [`# Local portability acceptance`, ``, `Automated baseline: PASS`, ``, `Restored workspace: ${restored}`, ``, `Runtime: ${selection.runtime}`, ``, `Open this directory in a fresh agent session and submit:`, ``, prompt, ``, `Then open another fresh session in the same directory and submit:`, ``, report.manual.continuationPrompt, ``, ...LIMITS, ``, `Cleanup: remove only this generated test directory after inspection: ${root}`, ``].join("\n");
    fs.writeFileSync(path.join(root, "INSPECT.md"), instructions, { flag: "wx" });
  } catch (error) {
    report.status = "fail";
    report.error = error.message;
  }
  json(report.report, report);
  return report;
}

function main(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--apply") options.apply = true;
    else if (["--runtime", "--preset", "--skills"].includes(arg) && args[i + 1] && !args[i + 1].startsWith("--")) options[arg.slice(2)] = args[++i];
    else throw new Error("test-portability accepts only --runtime, --preset, --skills and --apply; it never takes an existing workspace path");
  }
  const report = testPortability(options);
  console.log(JSON.stringify(report, null, 2));
  return report.status === "fail" ? 1 : 0;
}

module.exports = { testPortability, main };
