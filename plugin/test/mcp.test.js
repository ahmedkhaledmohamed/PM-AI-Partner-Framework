const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const os = require("os");

const {
  getMcpConfigPath,
  readMcpConfig,
  writeMcpConfig,
  buildServerEntry,
  mergeMcpServers,
} = require("../bin/mcp-utils");

// ── buildServerEntry ────────────────────────────────────────────────

describe("buildServerEntry", () => {
  it("builds a stdio server with no credentials", () => {
    const server = {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-memory"],
      credentials: [],
    };
    const result = buildServerEntry(server, {}, "claude");
    assert.deepStrictEqual(result, {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-memory"],
    });
  });

  it("builds a stdio server with env credentials provided", () => {
    const server = {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      credentials: [
        { key: "GITHUB_PERSONAL_ACCESS_TOKEN", type: "env", label: "Token" },
      ],
    };
    const creds = { GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_abc123" };
    const result = buildServerEntry(server, creds, "claude");
    assert.deepStrictEqual(result, {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: { GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_abc123" },
    });
  });

  it("marks a server disabled when env credential is skipped", () => {
    const server = {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      credentials: [
        { key: "GITHUB_PERSONAL_ACCESS_TOKEN", type: "env", label: "Token" },
      ],
    };
    const result = buildServerEntry(server, {}, "claude");
    assert.strictEqual(result.disabled, true);
    assert.strictEqual(result.env.GITHUB_PERSONAL_ACCESS_TOKEN, "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE");
  });

  it("builds a stdio server with arg credentials provided", () => {
    const server = {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-postgres"],
      credentials: [
        { key: "_ARG_", type: "arg", label: "Connection string" },
      ],
    };
    const creds = { _ARG_: "postgresql://localhost:5432/db" };
    const result = buildServerEntry(server, creds, "claude");
    assert.deepStrictEqual(result.args, ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/db"]);
    assert.strictEqual(result.disabled, undefined);
  });

  it("uses arg default when no value provided", () => {
    const server = {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem"],
      credentials: [
        { key: "_ARG_", type: "arg", label: "Dir", default: "." },
      ],
    };
    const result = buildServerEntry(server, {}, "claude");
    assert.deepStrictEqual(result.args, ["-y", "@modelcontextprotocol/server-filesystem", "."]);
  });

  it("replaces arg at argPosition when provided", () => {
    const server = {
      transport: "stdio",
      command: "uvx",
      args: ["mcp-server-git", "--repository", "."],
      credentials: [
        { key: "_ARG_REPOSITORY_", type: "arg", argPosition: 2, label: "Repo path", default: "." },
      ],
    };
    const creds = { _ARG_REPOSITORY_: "/home/user/my-repo" };
    const result = buildServerEntry(server, creds, "claude");
    assert.deepStrictEqual(result.args, ["mcp-server-git", "--repository", "/home/user/my-repo"]);
  });

  it("builds a remote URL server for Claude Code", () => {
    const server = {
      transport: "url",
      url: "https://mcp.linear.app/sse",
      credentials: [],
    };
    const result = buildServerEntry(server, {}, "claude");
    assert.deepStrictEqual(result, { type: "url", url: "https://mcp.linear.app/sse" });
  });

  it("builds a remote URL server for Cursor (no type field)", () => {
    const server = {
      transport: "url",
      url: "https://mcp.linear.app/sse",
      credentials: [],
    };
    const result = buildServerEntry(server, {}, "cursor");
    assert.deepStrictEqual(result, { url: "https://mcp.linear.app/sse" });
  });
});

// ── mergeMcpServers ─────────────────────────────────────────────────

describe("mergeMcpServers", () => {
  it("merges into an empty config", () => {
    const result = mergeMcpServers({}, { memory: { command: "npx", args: [] } });
    assert.deepStrictEqual(result, {
      mcpServers: { memory: { command: "npx", args: [] } },
    });
  });

  it("preserves existing servers and adds new ones", () => {
    const existing = {
      mcpServers: { memory: { command: "npx", args: ["-y", "old"] } },
    };
    const result = mergeMcpServers(existing, {
      memory: { command: "npx", args: ["-y", "new"] },
      fetch: { command: "npx", args: ["-y", "fetch"] },
    });
    assert.deepStrictEqual(result.mcpServers.memory.args, ["-y", "old"]);
    assert.deepStrictEqual(result.mcpServers.fetch.args, ["-y", "fetch"]);
  });

  it("preserves other top-level keys in the config", () => {
    const existing = { someKey: "value", mcpServers: {} };
    const result = mergeMcpServers(existing, { memory: { command: "npx", args: [] } });
    assert.strictEqual(result.someKey, "value");
    assert.ok(result.mcpServers.memory);
  });

  it("handles mixed enabled/disabled servers", () => {
    const result = mergeMcpServers(
      {},
      {
        memory: { command: "npx", args: [] },
        github: { command: "npx", args: [], disabled: true },
      }
    );
    assert.strictEqual(result.mcpServers.memory.disabled, undefined);
    assert.strictEqual(result.mcpServers.github.disabled, true);
  });
});

// ── readMcpConfig ───────────────────────────────────────────────────

describe("readMcpConfig", () => {
  it("returns empty object for missing file", () => {
    const result = readMcpConfig("/tmp/definitely-does-not-exist-mcp.json");
    assert.deepStrictEqual(result, {});
  });

  it("returns empty object for invalid JSON", () => {
    const tmpFile = path.join(os.tmpdir(), `mcp-test-invalid-${Date.now()}.json`);
    fs.writeFileSync(tmpFile, "not json {{{{");
    try {
      const result = readMcpConfig(tmpFile);
      assert.deepStrictEqual(result, {});
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  it("returns parsed content for valid JSON", () => {
    const tmpFile = path.join(os.tmpdir(), `mcp-test-valid-${Date.now()}.json`);
    fs.writeFileSync(tmpFile, JSON.stringify({ mcpServers: { test: {} } }));
    try {
      const result = readMcpConfig(tmpFile);
      assert.deepStrictEqual(result, { mcpServers: { test: {} } });
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});

// ── writeMcpConfig ──────────────────────────────────────────────────

describe("writeMcpConfig", () => {
  it("writes config and creates parent directories", () => {
    const tmpDir = path.join(os.tmpdir(), `mcp-test-write-${Date.now()}`);
    const tmpFile = path.join(tmpDir, "nested", "mcp.json");
    try {
      writeMcpConfig(tmpFile, { mcpServers: { test: {} } });
      const content = JSON.parse(fs.readFileSync(tmpFile, "utf8"));
      assert.deepStrictEqual(content, { mcpServers: { test: {} } });
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

// ── getMcpConfigPath ────────────────────────────────────────────────

describe("getMcpConfigPath", () => {
  it("returns ~/.claude.json for claude global", () => {
    const result = getMcpConfigPath("claude", "global");
    assert.strictEqual(result, path.join(os.homedir(), ".claude.json"));
  });

  it("returns .mcp.json for claude local", () => {
    const result = getMcpConfigPath("claude", "local");
    assert.strictEqual(result, path.join(process.cwd(), ".mcp.json"));
  });

  it("returns ~/.cursor/mcp.json for cursor global", () => {
    const result = getMcpConfigPath("cursor", "global");
    assert.strictEqual(result, path.join(os.homedir(), ".cursor", "mcp.json"));
  });

  it("returns .cursor/mcp.json for cursor local", () => {
    const result = getMcpConfigPath("cursor", "local");
    assert.strictEqual(result, path.join(process.cwd(), ".cursor", "mcp.json"));
  });

  it("returns null for unsupported runtime", () => {
    assert.strictEqual(getMcpConfigPath("codex", "global"), null);
    assert.strictEqual(getMcpConfigPath("unknown", "local"), null);
  });
});
