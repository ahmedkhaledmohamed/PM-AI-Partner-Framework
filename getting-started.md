# Getting Started: Replicate This Setup

A step-by-step guide to set up AI-augmented PM workflows on your machine.

**Time required:** ~30-60 minutes  
**Difficulty:** Beginner-friendly

---

## Prerequisites

Before you start, ensure you have:

- [ ] macOS (this guide is Mac-focused; adapt for Linux/Windows)
- [ ] Basic familiarity with terminal/command line
- [ ] Git installed

---

## Step 1: Install Cursor IDE

Cursor is VS Code with built-in AI capabilities.

1. **Download Cursor:** https://cursor.sh
2. **Install** by dragging to Applications
3. **Open Cursor** and sign in (you can use your GitHub account)

### Verify Installation

```bash
# Cursor should be accessible from terminal
cursor --version
```

---

## Step 2: Configure Claude in Cursor

1. Open Cursor
2. Go to **Settings** (⌘ + ,) → **AI** → **Models**
3. Ensure **Claude** is selected as the default model
4. For Opus/Sonnet access, you may need a Cursor Pro subscription or API key

### Test It

Open any file and press `⌘ + K` to open the AI prompt. Type "Hello" — you should get a response.

---

## Step 3: Install MCP Tools (Optional but Recommended)

MCP (Model Context Protocol) extends Cursor's capabilities with external tools.

### 3.1 Create MCP Config Directory

```bash
mkdir -p ~/.cursor
```

### 3.2 Create MCP Configuration

Create the file `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "bigquery-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/bigquery-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/your/credentials.json"
      }
    },
    "text2sql-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/text2sql-mcp"]
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic/google-drive-mcp"]
    }
  }
}
```

> **Note:** MCP tools require additional setup. See [MCP Documentation](https://modelcontextprotocol.io) for details.

### 3.3 Configure GCP Credentials (for BigQuery)

If using BigQuery:

1. Go to [GCP Console](https://console.cloud.google.com/)
2. Create a service account with BigQuery access
3. Download the JSON key file
4. Update the path in `mcp.json`

### 3.4 Restart Cursor

After configuring MCP, restart Cursor for changes to take effect.

### Verify MCP Tools

In Cursor chat, ask: "What MCP tools do you have access to?"

---

## Step 4: Set Up Your Workspace

### 4.1 Create a Workspace Directory

```bash
mkdir -p ~/Developer/MyProject
cd ~/Developer/MyProject
```

### 4.2 Clone Relevant Repos

Clone the repos you work with:

```bash
# Example: clone your team's repos
git clone git@github.com:your-org/backend.git
git clone git@github.com:your-org/frontend.git
git clone git@github.com:your-org/docs.git
```

### 4.3 Create Your Working Folders

```bash
mkdir -p sandbox/{strategy,analysis,planning,context}
mkdir -p product-catalog
```

### Your workspace should look like:

```
~/Developer/MyProject/
├── backend/          # Codebase
├── frontend/         # Codebase
├── docs/             # Team docs
├── sandbox/          # Your working space
│   ├── strategy/     # Strategy docs
│   ├── analysis/     # Deep dives
│   ├── planning/     # Roadmaps, priorities
│   └── context/      # Historical docs, handovers
└── product-catalog/  # Polished artifacts for sharing
```

---

## Step 5: Create CLAUDE.md Files

CLAUDE.md files give AI context about your workspace. Create one at the root:

### Root CLAUDE.md

```bash
touch ~/Developer/MyProject/CLAUDE.md
```

Add this content:

```markdown
# Project Context

## What This Is

[Brief description of your team/project]

## Directory Structure

- `backend/` — Backend services
- `frontend/` — Frontend code
- `docs/` — Team docs
- `sandbox/` — My working space for drafts and analysis
- `product-catalog/` — Polished artifacts for team sharing

## Key Contacts

- PM: [you]
- EM: [name]
- Tech Lead: [name]

## Current Focus

[What you're working on this quarter]

## How to Help

When I ask about:

- Code questions → Look in backend/ and frontend/
- Strategy → Look in sandbox/strategy/
- Historical context → Look in sandbox/context/
```

### Sandbox CLAUDE.md

Create a more specific context file for your sandbox:

```bash
touch ~/Developer/MyProject/sandbox/CLAUDE.md
```

```markdown
# Sandbox: Working Space

This folder contains my drafts, analysis, and planning docs.

## Subfolders

- `strategy/` — Team mission, charter, value narrative
- `analysis/` — Codebase audits, capability assessments
- `planning/` — Roadmaps, priorities, planning docs
- `context/` — Handovers, historical decisions

## Document Status

Files here are drafts unless marked [FINAL].

## When Editing

- Preserve existing structure
- Add to existing docs rather than creating new ones
- Use markdown tables for comparisons
```

---

## Step 6: Open in Cursor

```bash
cursor ~/Developer/MyProject
```

### Let Cursor Index Your Codebase

1. Cursor will automatically start indexing
2. Wait for indexing to complete (check status bar)
3. Once done, you can use semantic search across all files

---

## Step 7: Install Claude CLI (Optional)

For autonomous multi-step tasks:

```bash
# Install via npm
npm install -g @anthropic-ai/claude-cli

# Or via Homebrew
brew install claude-cli

# Authenticate
claude auth
```

### When to Use CLI vs Cursor

| Task                         | Tool       |
| ---------------------------- | ---------- |
| Interactive exploration      | Cursor     |
| Doc writing with preview     | Cursor     |
| Multi-file refactoring       | Claude CLI |
| Long strategic conversations | Claude CLI |
| Autonomous tasks             | Claude CLI |

---

## Step 8: Learn the Agent Modes

The framework uses six "agent modes" — different AI personalities for different tasks. Invoke them by name:

| Mode                  | When to Use                          | How to Invoke                                             |
| --------------------- | ------------------------------------ | --------------------------------------------------------- |
| **Technical Analyst** | Exploring code, mapping capabilities | "Act as a Technical Analyst. Examine [X] systematically." |
| **Writer**            | Drafting docs, structuring arguments | "Help me write a clear [doc type] for [audience]."        |
| **Devil's Advocate**  | Stress-testing ideas, finding gaps   | "Challenge this. Role-play as a skeptical [stakeholder]." |
| **Builder**           | Creating tools, scripts, prototypes  | "Build [X] with this spec: [requirements]"                |
| **Thought Partner**   | Brainstorming, exploring options     | "Help me explore [space]. What am I not considering?"     |
| **Data Analyst**      | Analyzing metrics, finding patterns  | "Here's [data]. What patterns? What hypotheses?"          |

### Try Each Mode

```
# Technical Analyst
"Act as a Technical Analyst. Map all the API endpoints in the backend/ folder."

# Writer
"Help me write a one-page charter for my team. Audience: leadership."

# Devil's Advocate
"I want to propose we rebuild the auth system. Challenge this decision."

# Builder
"Build me a simple HTML dashboard that displays [metrics]."

# Thought Partner
"I'm trying to decide between option A and B. Help me think through tradeoffs."

# Data Analyst
"Here's our monthly active users by platform. What trends do you see?"
```

---

## Step 9: Learn the Workflow Patterns

The framework includes eight repeatable workflows for common PM tasks:

| #   | Workflow               | When to Use                     | Key Output                 |
| --- | ---------------------- | ------------------------------- | -------------------------- |
| 1   | **Strategic Clarity**  | New role, unclear team identity | Charter, Value Proposition |
| 2   | **Planning Cycle**     | Quarterly/sprint planning       | Roadmap, Priorities        |
| 3   | **Codebase Discovery** | Understanding what exists       | Capability Audit           |
| 4   | **Tool Building**      | Need internal tools             | Working Prototype          |
| 5   | **Communication Prep** | Big meetings, presentations     | Talk Structure, Q&A Prep   |
| 6   | **PM-Eng Bridge**      | Translating code ↔ product      | Engineering Questions Doc  |
| 7   | **Data Investigation** | Metrics analysis                | Insights, Hypotheses       |
| 8   | **Doc Restructuring**  | Confusing documentation         | Cleaner Structure          |

### Try a Workflow

**Example: Strategic Clarity Workflow**

```
1. Start with: "I need to define what my team does. Help me create a charter."

2. AI will ask clarifying questions about:
   - What systems you own
   - Who your users are
   - What makes you different from adjacent teams

3. Iterate through drafts until you have a clear one-pager.

4. Save to: sandbox/strategy/team-charter.md
```

See detailed workflow guides in [`workflows/`](workflows/).

---

## Step 10: Test Your Setup

### Test 1: Codebase Search

In Cursor chat:

> "Search the codebase for API endpoints related to [feature]"

### Test 2: Create a Document

> "Help me create a capability audit for [system]. Save it to sandbox/analysis/"

### Test 3: Agent Mode

> "Act as a Devil's Advocate. Challenge my assumption that [X]."

### Test 4: Workflow

> "I'm new to this team. Help me run the Strategic Clarity workflow to define our charter."

---

## Troubleshooting

### MCP Tools Not Showing

- Restart Cursor after editing `mcp.json`
- Check file permissions: `chmod 644 ~/.cursor/mcp.json`
- Verify JSON syntax is valid

### Cursor Not Indexing

- Check if `.cursorignore` is excluding important files
- Try: `Cursor` → `Command Palette` → `Reindex Workspace`

### Claude CLI Auth Issues

- Run `claude auth logout` then `claude auth` again
- Check your API key is valid

---

## Next Steps

1. **Read the full framework:** [`framework/pm-ai-partner-framework.md`](framework/pm-ai-partner-framework.md)
2. **Try a workflow:** Start with [Strategic Clarity](workflows/strategic-clarity.md)
3. **Customize your CLAUDE.md:** Add team-specific context
4. **Commit your setup:** Use git to track your sandbox

---

## Resources

| Resource             | Link                                  |
| -------------------- | ------------------------------------- |
| Cursor Documentation | https://docs.cursor.sh                |
| MCP Protocol         | https://modelcontextprotocol.io       |
| Claude CLI           | https://docs.anthropic.com/claude-cli |
| This Framework       | [README.md](README.md)                |

---

## Questions?

Open an issue on this repo or reach out on [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed).

---

_Last updated: January 2026_
