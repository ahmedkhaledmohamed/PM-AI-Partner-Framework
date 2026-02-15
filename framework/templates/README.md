# Templates

Configuration and context templates for your workspace.

## How to Use

1. **Copy** these files to your workspace
2. **Customize** the bracketed sections for your context
3. **Rename** as needed (e.g., `CLAUDE.md` goes in your project root)

## Files

| File/Folder | Purpose | Copy To |
|-------------|---------|---------|
| `CLAUDE.md` | Root workspace context | Project root |
| `CLAUDE-sandbox.md` | Sandbox folder context | `sandbox/CLAUDE.md` |
| `CLAUDE-product-catalog.md` | Product catalog context | `product-catalog/CLAUDE.md` |
| `settings.local.json` | Claude Code settings | `.claude/settings.local.json` |
| `mcp.json` | MCP server configuration | `~/.cursor/mcp.json` |
| `cursorrules.txt` | Cursor IDE rules | `.cursorrules` |
| `skills/` | AI skills (slash commands) | `~/.cursor/skills/` or `~/.claude/skills/` |

## Setup Steps

### 1. Clone/Fork the Framework

```bash
git clone https://github.com/[your-username]/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework
```

### 2. Copy Templates to Your Project

```bash
# Copy root CLAUDE.md
cp framework/templates/CLAUDE.md /path/to/your-project/

# Copy sandbox context
cp framework/templates/CLAUDE-sandbox.md /path/to/your-project/sandbox/CLAUDE.md

# Copy product-catalog context
cp framework/templates/CLAUDE-product-catalog.md /path/to/your-project/product-catalog/CLAUDE.md
```

### 3. Configure Claude Code (Optional)

```bash
mkdir -p .claude
cp framework/templates/settings.local.json .claude/
```

### 4. Configure MCP (Optional)

```bash
mkdir -p ~/.cursor
cp framework/templates/mcp.json ~/.cursor/
# Edit to add your credentials and enable desired servers
```

### 5. Install Skills (Recommended)

Skills enable slash commands like `/thought-partner` and `/product-brief`. They work with both **Cursor** and **Claude CLI**.

**For Cursor:**
```bash
mkdir -p ~/.cursor/skills
cp -r framework/templates/skills/*/ ~/.cursor/skills/
```

**For Claude CLI:**
```bash
mkdir -p ~/.claude/skills
cp -r framework/templates/skills/*/ ~/.claude/skills/
```

See [`skills/README.md`](skills/README.md) for full documentation and available skills.

## Customization

Each template has bracketed sections like `[Your Team]` that you should replace:

```markdown
# Before
This is [Your Team]'s workspace.

# After
This is Platform Engineering's workspace.
```

## See Also

- [Framework Overview](../core/pm-ai-partner-framework.md)
- [Getting Started](../../getting-started.md)
