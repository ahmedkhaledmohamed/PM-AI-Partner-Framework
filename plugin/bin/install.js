#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");

const VERSION = "2.0.0";
const PLUGIN_NAME = "pm-ai-partner";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const SKILLS = [
  { name: "thought-partner", desc: "Brainstorming & idea exploration" },
  { name: "technical-analyst", desc: "Codebase analysis for PMs" },
  { name: "writer", desc: "PM document drafting & polish" },
  { name: "devil-advocate", desc: "Stress-test ideas & proposals" },
  { name: "builder", desc: "Build tools, scripts & prototypes" },
  { name: "data-analyst", desc: "Metrics analysis & SQL queries" },
  { name: "product-brief", desc: "PRDs & feature specs" },
  { name: "meeting-prep", desc: "Meeting preparation & talking points" },
  { name: "stakeholder-update", desc: "Status reports & exec summaries" },
  { name: "strategic-clarity", desc: "Team identity & boundaries" },
];

const COMMANDS = [
  { name: "plan-week", desc: "Weekly planning workflow" },
  { name: "write-brief", desc: "Product brief creation" },
  { name: "prep-meeting", desc: "Meeting preparation" },
  { name: "audit-codebase", desc: "PM-focused codebase exploration" },
];

function printBanner() {
  console.log();
  console.log(
    `${BOLD}${CYAN}  PM AI Partner ${DIM}v${VERSION}${RESET}`
  );
  console.log(
    `${DIM}  AI-powered skills for Product Managers${RESET}`
  );
  console.log();
}

function printSkillsTable() {
  console.log(`${BOLD}  Skills (10):${RESET}`);
  for (const s of SKILLS) {
    console.log(`    ${GREEN}/pm:${s.name}${RESET}  ${DIM}${s.desc}${RESET}`);
  }
  console.log();
  console.log(`${BOLD}  Commands (4):${RESET}`);
  for (const c of COMMANDS) {
    console.log(`    ${GREEN}/pm:${c.name}${RESET}  ${DIM}${c.desc}${RESET}`);
  }
  console.log();
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getPluginRoot() {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "skills")) && fs.existsSync(path.join(dir, ".claude-plugin"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return path.resolve(__dirname, "..");
}

function detectRuntimes() {
  const found = [];
  const claudeDir = path.join(os.homedir(), ".claude");
  const codexDir = path.join(os.homedir(), ".codex");
  const cursorDir = path.join(os.homedir(), ".cursor");

  if (fs.existsSync(claudeDir)) found.push("claude");
  if (fs.existsSync(codexDir)) found.push("codex");
  if (fs.existsSync(cursorDir)) found.push("cursor");
  return found;
}

function installClaude(pluginRoot, scope) {
  const base =
    scope === "global"
      ? path.join(os.homedir(), ".claude")
      : path.join(process.cwd(), ".claude");

  const skillsDest = path.join(base, "skills");
  const commandsDest = path.join(base, "commands", "pm");

  fs.mkdirSync(skillsDest, { recursive: true });
  fs.mkdirSync(commandsDest, { recursive: true });

  const skillsSrc = path.join(pluginRoot, "skills");
  for (const skill of fs.readdirSync(skillsSrc, { withFileTypes: true })) {
    if (skill.isDirectory()) {
      copyDirRecursive(
        path.join(skillsSrc, skill.name),
        path.join(skillsDest, skill.name)
      );
    }
  }

  const commandsSrc = path.join(pluginRoot, "commands", "pm");
  if (fs.existsSync(commandsSrc)) {
    for (const cmd of fs.readdirSync(commandsSrc)) {
      fs.copyFileSync(
        path.join(commandsSrc, cmd),
        path.join(commandsDest, cmd)
      );
    }
  }

  const hooksSrc = path.join(pluginRoot, "hooks", "hooks.json");
  if (fs.existsSync(hooksSrc)) {
    const hooksDest = path.join(base, "hooks");
    fs.mkdirSync(hooksDest, { recursive: true });

    const hooksScriptsSrc = path.join(pluginRoot, "hooks");
    for (const f of fs.readdirSync(hooksScriptsSrc)) {
      fs.copyFileSync(
        path.join(hooksScriptsSrc, f),
        path.join(hooksDest, f)
      );
    }
  }

  return base;
}

function installCursor(pluginRoot, scope) {
  const base =
    scope === "global"
      ? path.join(os.homedir(), ".cursor", "skills")
      : path.join(process.cwd(), ".cursor", "skills");

  fs.mkdirSync(base, { recursive: true });

  const skillsSrc = path.join(pluginRoot, "skills");
  for (const skill of fs.readdirSync(skillsSrc, { withFileTypes: true })) {
    if (skill.isDirectory()) {
      copyDirRecursive(
        path.join(skillsSrc, skill.name),
        path.join(base, skill.name)
      );
    }
  }

  return base;
}

function installCodex(pluginRoot, scope) {
  const base =
    scope === "global"
      ? path.join(os.homedir(), ".codex", "skills")
      : path.join(process.cwd(), ".codex", "skills");

  fs.mkdirSync(base, { recursive: true });

  const skillsSrc = path.join(pluginRoot, "skills");
  for (const skill of fs.readdirSync(skillsSrc, { withFileTypes: true })) {
    if (skill.isDirectory()) {
      copyDirRecursive(
        path.join(skillsSrc, skill.name),
        path.join(base, skill.name)
      );
    }
  }

  return base;
}

async function main() {
  const args = process.argv.slice(2);
  const nonInteractive =
    args.includes("--claude") ||
    args.includes("--cursor") ||
    args.includes("--codex") ||
    args.includes("--all");
  const isGlobal = args.includes("--global") || args.includes("-g");
  const isLocal = args.includes("--local") || args.includes("-l");
  const isUninstall = args.includes("--uninstall");

  if (isUninstall) {
    console.log(`${YELLOW}Uninstall not yet implemented. Remove the skills manually.${RESET}`);
    process.exit(0);
  }

  printBanner();

  const pluginRoot = getPluginRoot();

  if (!fs.existsSync(path.join(pluginRoot, "skills"))) {
    console.error(`${RED}Error: Could not find plugin skills directory.${RESET}`);
    console.error(`Expected at: ${pluginRoot}/skills/`);
    process.exit(1);
  }

  let runtimes = [];
  let scope = "";

  if (nonInteractive) {
    if (args.includes("--all")) runtimes = ["claude", "cursor", "codex"];
    else {
      if (args.includes("--claude")) runtimes.push("claude");
      if (args.includes("--cursor")) runtimes.push("cursor");
      if (args.includes("--codex")) runtimes.push("codex");
    }
    scope = isLocal ? "local" : "global";
  } else {
    const detected = detectRuntimes();
    console.log(
      `${DIM}  Detected runtimes: ${detected.length > 0 ? detected.join(", ") : "none"}${RESET}`
    );
    console.log();

    printSkillsTable();

    console.log(`  ${BOLD}Choose runtime:${RESET}`);
    console.log(`    ${CYAN}1${RESET}) Claude Code`);
    console.log(`    ${CYAN}2${RESET}) Cursor`);
    console.log(`    ${CYAN}3${RESET}) Codex`);
    console.log(`    ${CYAN}4${RESET}) All`);
    console.log();

    const runtimeChoice = await ask(`  ${BOLD}Runtime [1-4]:${RESET} `);
    switch (runtimeChoice) {
      case "1":
        runtimes = ["claude"];
        break;
      case "2":
        runtimes = ["cursor"];
        break;
      case "3":
        runtimes = ["codex"];
        break;
      case "4":
        runtimes = ["claude", "cursor", "codex"];
        break;
      default:
        runtimes = ["claude"];
    }

    console.log();
    console.log(`  ${BOLD}Choose scope:${RESET}`);
    console.log(`    ${CYAN}1${RESET}) Global (all projects — recommended)`);
    console.log(`    ${CYAN}2${RESET}) Local (current project only)`);
    console.log();

    const scopeChoice = await ask(`  ${BOLD}Scope [1-2]:${RESET} `);
    scope = scopeChoice === "2" ? "local" : "global";
  }

  console.log();
  console.log(`${BOLD}  Installing...${RESET}`);
  console.log();

  for (const runtime of runtimes) {
    let dest;
    switch (runtime) {
      case "claude":
        dest = installClaude(pluginRoot, scope);
        console.log(
          `  ${GREEN}+${RESET} Claude Code — ${DIM}${dest}${RESET}`
        );
        console.log(
          `    ${DIM}Skills: 10 | Commands: /pm:plan-week, /pm:write-brief, /pm:prep-meeting, /pm:audit-codebase | Hooks: 3${RESET}`
        );
        break;
      case "cursor":
        dest = installCursor(pluginRoot, scope);
        console.log(
          `  ${GREEN}+${RESET} Cursor — ${DIM}${dest}${RESET}`
        );
        console.log(
          `    ${DIM}Skills: 10 (commands and hooks require Claude Code)${RESET}`
        );
        break;
      case "codex":
        dest = installCodex(pluginRoot, scope);
        console.log(
          `  ${GREEN}+${RESET} Codex — ${DIM}${dest}${RESET}`
        );
        console.log(
          `    ${DIM}Skills: 10 (commands and hooks require Claude Code)${RESET}`
        );
        break;
    }
  }

  console.log();
  console.log(`  ${GREEN}${BOLD}Done!${RESET} Restart your editor to load the skills.`);
  console.log();

  if (runtimes.includes("claude")) {
    console.log(`  ${BOLD}Verify:${RESET} Run ${CYAN}/pm:thought-partner${RESET} in Claude Code`);
  } else if (runtimes.includes("cursor")) {
    console.log(`  ${BOLD}Verify:${RESET} Type ${CYAN}/thought-partner${RESET} in Cursor chat`);
  }

  console.log();
  console.log(
    `  ${DIM}Full framework & methodology: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework${RESET}`
  );
  console.log();
}

main().catch((err) => {
  console.error(`${RED}Error: ${err.message}${RESET}`);
  process.exit(1);
});
