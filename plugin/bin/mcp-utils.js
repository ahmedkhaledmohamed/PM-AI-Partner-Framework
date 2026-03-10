const fs = require("fs");
const path = require("path");
const os = require("os");

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

function buildServerEntry(server, credentials, runtime) {
  if (server.transport === "url") {
    const entry = runtime === "claude"
      ? { type: "url", url: server.url }
      : { url: server.url };
    return entry;
  }

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
        if (cred.argPosition !== undefined) {
          entry.args[cred.argPosition] = value;
        } else {
          entry.args.push(value);
        }
      } else if (cred.default) {
        if (cred.argPosition !== undefined) {
          entry.args[cred.argPosition] = cred.default;
        } else {
          entry.args.push(cred.default);
        }
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

module.exports = {
  loadCatalog,
  getMcpConfigPath,
  readMcpConfig,
  writeMcpConfig,
  buildServerEntry,
  mergeMcpServers,
};
