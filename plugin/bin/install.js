#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");

const VERSION = "2.1.0";
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

// ── MCP Server Support ──────────────────────────────────────────────

function loadCatalog(pluginRoot) {
  const catalogPath = path.join(pluginRoot, "mcp", "catalog.json");
  if (!fs.existsSync(catalogPath)) return null;
  return JSON.parse(fs.readFileSync(catalogPath, "utf8"));
}

function getMcpConfigPath(runtime, scope) {
  if (runtime === "claude") {
    return scope === "global"
      ? path.join(os.homedir(), ".claude.json")
      : path.join(process.cwd(), ".mcp.json");
  }
  if (runtime === "cursor") {
    return scope === "global"
      ? path.join(os.homedir(), ".cursor", "mcp.json")
      : path.join(process.cwd(), ".cursor", "mcp.json");
  }
  return null;
}

function readMcpConfig(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

function writeMcpConfig(filePath, config) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + "\n");
}

function buildServerEntry(server, credentials) {
  const entry = {
    command: server.command,
    args: [...server.args],
  };

  const envVars = {};
  let disabled = false;

  for (const cred of server.credentials || []) {
    const value = credentials[cred.key];

    if (cred.type === "arg") {
      if (value && value !== "") {
        entry.args.push(value);
      } else if (cred.default) {
        entry.args.push(cred.default);
      } else {
        disabled = true;
      }
    } else {
      if (value && value !== "") {
        envVars[cred.key] = value;
      } else {
        envVars[cred.key] = `YOUR_${cred.key}_HERE`;
        disabled = true;
      }
    }
  }

  if (Object.keys(envVars).length > 0) entry.env = envVars;
  if (disabled) entry.disabled = true;

  return entry;
}

function mergeMcpServers(existing, newServers) {
  const merged = { ...existing };
  if (!merged.mcpServers) merged.mcpServers = {};

  for (const [id, entry] of Object.entries(newServers)) {
    if (!merged.mcpServers[id]) {
      merged.mcpServers[id] = entry;
    }
  }

  return merged;
}

function printCatalog(catalog) {
  const tiers = catalog.tiers;
  const servers = catalog.servers;
  let idx = 1;
  const indexMap = {};

  for (const tierId of ["zero-config", "pm-essentials", "data-analytics"]) {
    const tier = tiers[tierId];
    const tierServers = servers.filter((s) => s.tier === tierId);
    if (tierServers.length === 0) continue;

    console.log();
    console.log(`  ${BOLD}${tier.label}${RESET}`);
    console.log(`  ${DIM}${tier.description}${RESET}`);

    for (const s of tierServers) {
      indexMap[idx] = s;
      const creds = (s.credentials || []).filter((c) => c.type === "env");
      const credHint =
        creds.length > 0 ? ` ${DIM}(needs ${creds.map((c) => c.key).join(", ")})${RESET}` : "";
      console.log(
        `    ${CYAN}${String(idx).padStart(2)}${RESET}) ${s.name} — ${DIM}${s.pmUseCase}${RESET}${credHint}`
      );
      idx++;
    }
  }

  return indexMap;
}

async function promptMcpServers(catalog) {
  const indexMap = printCatalog(catalog);

  console.log();
  console.log(`  ${DIM}Enter numbers separated by commas, "all" for everything, or "none" to skip${RESET}`);
  const answer = await ask(`  ${BOLD}Servers:${RESET} `);

  if (!answer || answer.toLowerCase() === "none" || answer.toLowerCase() === "n") {
    return [];
  }

  if (answer.toLowerCase() === "all") {
    return catalog.servers;
  }

  const selected = [];
  for (const part of answer.split(",")) {
    const num = parseInt(part.trim(), 10);
    if (indexMap[num]) selected.push(indexMap[num]);
  }
  return selected;
}

async function collectCredentials(servers) {
  const results = [];

  for (const server of servers) {
    const creds = {};

    if (!server.credentials || server.credentials.length === 0) {
      results.push({ server, credentials: creds });
      continue;
    }

    const envCreds = server.credentials.filter((c) => c.type === "env");
    const argCreds = server.credentials.filter((c) => c.type === "arg");

    if (envCreds.length > 0 || argCreds.length > 0) {
      console.log();
      console.log(`  ${BOLD}${server.name}${RESET}`);
    }

    for (const cred of envCreds) {
      console.log(`  ${DIM}${cred.help}${RESET}`);
      const value = await ask(`  ${cred.label} ${DIM}(enter to skip):${RESET} `);
      creds[cred.key] = value;
    }

    for (const cred of argCreds) {
      console.log(`  ${DIM}${cred.help}${RESET}`);
      const defaultHint = cred.default ? ` ${DIM}[${cred.default}]${RESET}` : "";
      const value = await ask(`  ${cred.label}${defaultHint}: `);
      creds[cred.key] = value || cred.default || "";
    }

    results.push({ server, credentials: creds });
  }

  return results;
}

async function installMcpServers(catalog, runtimes, scope, mcpServerIds) {
  let selected;

  if (mcpServerIds) {
    selected = mcpServerIds === "all"
      ? catalog.servers
      : catalog.servers.filter((s) => mcpServerIds.split(",").map((x) => x.trim()).includes(s.id));
  } else {
    selected = await promptMcpServers(catalog);
  }

  if (selected.length === 0) return 0;

  const serversWithCreds = mcpServerIds
    ? selected.map((s) => ({ server: s, credentials: {} }))
    : await collectCredentials(selected);

  const newServers = {};
  for (const { server, credentials } of serversWithCreds) {
    newServers[server.id] = buildServerEntry(server, credentials);
  }

  let configsWritten = 0;
  for (const runtime of runtimes) {
    const configPath = getMcpConfigPath(runtime, scope);
    if (!configPath) continue;

    const existing = readMcpConfig(configPath);
    const merged = mergeMcpServers(existing, newServers);
    writeMcpConfig(configPath, merged);

    const enabledCount = Object.values(newServers).filter((e) => !e.disabled).length;
    const disabledCount = Object.values(newServers).filter((e) => e.disabled).length;

    console.log(
      `  ${GREEN}+${RESET} MCP config — ${DIM}${configPath}${RESET}`
    );
    const parts = [];
    if (enabledCount > 0) parts.push(`${enabledCount} enabled`);
    if (disabledCount > 0) parts.push(`${disabledCount} disabled (add credentials to enable)`);
    console.log(`    ${DIM}${parts.join(", ")}${RESET}`);
    configsWritten++;
  }

  return configsWritten;
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
  const mcpFlag = args.find((a) => a.startsWith("--mcp"));
  const mcpServerIds = mcpFlag
    ? mcpFlag.includes("=") ? mcpFlag.split("=")[1] : "all"
    : null;

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

  // ── MCP Server Configuration ───────────────────────────────────────

  const mcpRuntimes = runtimes.filter((r) => r === "claude" || r === "cursor");

  if (mcpRuntimes.length > 0) {
    const catalog = loadCatalog(pluginRoot);

    if (catalog) {
      let shouldInstallMcp = false;

      if (mcpServerIds) {
        shouldInstallMcp = true;
      } else if (!nonInteractive) {
        console.log();
        console.log(
          `  ${BOLD}MCP Servers${RESET} — connect AI to external tools (GitHub, Slack, databases...)`
        );
        const mcpAnswer = await ask(
          `  ${BOLD}Configure MCP servers? [y/N]:${RESET} `
        );
        shouldInstallMcp =
          mcpAnswer.toLowerCase() === "y" || mcpAnswer.toLowerCase() === "yes";
      }

      if (shouldInstallMcp) {
        console.log();
        await installMcpServers(catalog, mcpRuntimes, scope, mcpServerIds);
      }
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
