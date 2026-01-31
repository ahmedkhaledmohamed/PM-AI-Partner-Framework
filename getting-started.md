# Getting Started: Replicate This Setup

A step-by-step guide to set up AI-augmented PM workflows on your machine.

**Time required:** ~30-60 minutes
**Difficulty:** Beginner-friendly

---

## Quick Start (15 minutes)

Already familiar with the concepts? Here's the fast path:

```bash
# 1. Fork and clone
git clone git@github.com:YOUR-USERNAME/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework

# 2. Copy templates to your workspace
mkdir -p ~/your-workspace/sandbox ~/your-workspace/product-catalog
cp framework/templates/CLAUDE.md ~/your-workspace/
cp framework/templates/CLAUDE-sandbox.md ~/your-workspace/sandbox/CLAUDE.md
cp framework/templates/CLAUDE-product-catalog.md ~/your-workspace/product-catalog/CLAUDE.md

# 3. (Optional) Set up MCP
mkdir -p ~/.cursor
cp framework/templates/mcp.json ~/.cursor/
# Edit ~/.cursor/mcp.json with your credentials

# 4. Open in Cursor and start working
cursor ~/your-workspace
```

Then try: "I'm using the PM AI Partner Framework. Help me create a team charter."

---

## Full Setup Guide

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Install Cursor IDE](#step-1-install-cursor-ide)
3. [Configure Claude](#step-2-configure-claude-in-cursor)
4. [Install MCP Tools](#step-3-install-mcp-tools-optional-but-recommended)
5. [Set Up Your Workspace](#step-4-set-up-your-workspace)
6. [Create CLAUDE.md Files](#step-5-create-claudemd-files)
7. [Bootstrap the AI](#step-6-bootstrap-the-ai-with-framework-context)
8. [Learn the Agent Modes](#step-7-learn-the-agent-modes)
9. [Learn the Workflow Patterns](#step-8-learn-the-workflow-patterns)
10. [Test Your Setup](#step-9-test-your-setup)

---

## Prerequisites

Before you start, ensure you have:

- [ ] macOS (this guide is Mac-focused; adapt for Linux/Windows)
- [ ] Basic familiarity with terminal/command line
- [ ] Git installed (`git --version` to check)

### Already Have These?

| Tool | Check Command | Skip To |
|------|---------------|---------|
| Git | `git --version` | Step 1 |
| Cursor | `cursor --version` | Step 2 |
| MCP configured | Check `~/.cursor/mcp.json` | Step 4 |

---

## Step 1: Install Cursor IDE

Cursor is VS Code with built-in AI capabilities.

1. **Download Cursor:** https://cursor.sh
2. **Install** by dragging to Applications
3. **Open Cursor** and sign in (you can use your GitHub account)

### Verify Installation

```bash
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

The recommended setup uses **three core repos** plus any dependencies you need.

### 4.1 The Three Core Repos

| Repo | Purpose | Visibility |
|------|---------|------------|
| **Sandbox** | Personal working space — drafts, analysis, planning | **Private** |
| **Product-catalog** | Team artifacts — polished specs, docs, presentations | Team/Public |
| **Framework** | Fork of PM AI Partner Framework — methodology reference | Private/Public |

### 4.2 Recommended Directory Structure

```
~/Developer/
├── my-sandbox/                  # Private: your personal drafts, analysis, planning
│   ├── strategy/
│   ├── analysis/
│   ├── planning/
│   └── context/
├── team-product-catalog/        # Team: polished artifacts for sharing
├── pm-ai-partner-framework/     # Forked: methodology, agent modes, workflows
└── [dependencies]/              # Cloned as needed for your work
    ├── frontend/
    ├── backend/
    └── docs/
```

### 4.3 Create Your Workspace

```bash
# Create the base directory
mkdir -p ~/Developer
cd ~/Developer

# Create your sandbox
mkdir -p my-sandbox/{strategy,analysis,planning,context}
cd my-sandbox
git init
echo "# My Sandbox" > README.md
git add . && git commit -m "Initial structure"

# Create your product catalog
cd ~/Developer
mkdir -p team-product-catalog
cd team-product-catalog
git init
echo "# Product Catalog" > README.md
git add . && git commit -m "Initial commit"

# Fork and clone this framework
# 1. Fork this repo on GitHub: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework
# 2. Clone your fork:
cd ~/Developer
git clone git@github.com:YOUR-USERNAME/PM-AI-Partner-Framework.git pm-ai-partner-framework

# Clone dependencies as needed
git clone git@github.com:your-org/backend.git
git clone git@github.com:your-org/frontend.git
```

### 4.4 Why Three Repos?

| Repo | Why Separate? |
|------|---------------|
| **Sandbox** | Private space for messy drafts — you control visibility |
| **Product-catalog** | Team ownership — others can contribute and review |
| **Framework** | Fork lets you customize while pulling updates from upstream |

> **Tip:** Keep your Sandbox private. Move polished artifacts to Product-catalog when ready to share.

---

## Step 5: Create CLAUDE.md Files

CLAUDE.md files give AI context about your workspace. Create one at the root:

### Root CLAUDE.md

```bash
touch ~/Developer/my-sandbox/CLAUDE.md
```

Add this content:

```markdown
# Project Context

## What This Is
[Brief description of your team/project]

## Directory Structure
- `strategy/` — Team mission, charter, value narrative
- `analysis/` — Codebase audits, capability assessments
- `planning/` — Roadmaps, priorities, planning docs
- `context/` — Handovers, historical decisions

## Key Contacts
- PM: [you]
- EM: [name]
- Tech Lead: [name]

## Current Focus
[What you're working on this quarter]

## How to Help
When I ask about:
- Strategy → Look in strategy/
- Historical context → Look in context/
```

### Sandbox CLAUDE.md

```markdown
# Sandbox: Working Space

This folder contains my drafts, analysis, and planning docs.

## Document Status
Files here are drafts unless marked [FINAL].

## When Editing
- Preserve existing structure
- Add to existing docs rather than creating new ones
- Use markdown tables for comparisons
```

---

## Step 6: Bootstrap the AI with Framework Context

Before using the agent modes and workflows, introduce the framework to your AI assistant. This helps Claude understand the methodology and provide better responses.

### 6.1 Why Bootstrap?

The AI doesn't automatically know about the PM AI Partner Framework. By pointing it at the framework docs, you help it:
- Understand the six agent modes
- Know the eight workflow patterns
- Apply the "Four Sources of Truth" philosophy
- Use consistent terminology and approaches

### 6.2 How to Bootstrap

Open your forked `pm-ai-partner-framework/` folder in Cursor, then in the AI chat:

**Option 1: Full onboarding**
```
Read through the framework/ folder. Understand the agent modes, 
workflow patterns, and philosophy. Summarize what you learned.
```

**Option 2: Quick intro**
```
I'm using the PM AI Partner Framework. Before we start,
familiarize yourself with framework/core/workflows/ and the
six agent modes in framework/core/pm-ai-partner-framework.md.
```

**Option 3: Session reminder**
```
I work with the PM AI Partner Framework. Key concepts:
- Four Sources of Truth: Code, Docs, Data, Judgment
- Six Agent Modes: Technical Analyst, Writer, Devil's Advocate, Builder, Thought Partner, Data Analyst
- Judgment stays human — you help explore, I decide.

Let's begin.
```

### 6.3 Verify Understanding

Ask Claude to confirm:
```
What are the six agent modes in the PM AI Partner Framework? 
When would I use each one?
```

Claude should list all six modes with their purposes. If not, point it at the framework docs again.

> **Tip:** You don't need to bootstrap every session. Once Claude has read the framework in a workspace, it retains context within that session. For new sessions, a quick reminder (Option 3) is often enough.

---

## Step 7: Learn the Agent Modes

The framework uses six "agent modes" — different AI personalities for different tasks. Invoke them by name:

![Six Agent Modes Diagram](docs/images/agent-modes-diagram.png)

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

## Step 8: Learn the Workflow Patterns

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

See detailed workflow guides in [`framework/core/workflows/`](framework/core/workflows/).

---

## Step 9: Test Your Setup

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

## Optional: Install Claude CLI

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

## Optional: Deploy Static Sites

As a PM, you'll often build dashboards, documentation sites, or presentation pages. Here's how to deploy them for free.

### Option 1: GitHub Pages (Recommended)

Deploy directly from your repo — perfect for documentation and simple sites.

1. **Create a `docs/` folder** in your repo with your site files
2. **Go to repo Settings** → **Pages**
3. **Set Source** to "Deploy from a branch" → select `main` → `/docs`
4. Your site will be at: `https://username.github.io/repo-name/`

```bash
# Example: Deploy your framework site
mkdir -p docs
cp -r site/* docs/
git add docs && git commit -m "Add site for GitHub Pages"
git push
```

### Option 2: Netlify (One-Click Deploy)

Best for SPAs and sites with build steps.

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your repo
4. Set build command (e.g., `npm run build`) and publish directory (e.g., `build/`)
5. Click **Deploy**

Your site gets a URL like: `https://your-site.netlify.app`

### Option 3: Vercel (Great for React/Next.js)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your repo
4. Vercel auto-detects framework and deploys

Your site gets a URL like: `https://your-site.vercel.app`

### Quick Comparison

| Platform | Best For | Build Support | Custom Domain |
|----------|----------|---------------|---------------|
| **GitHub Pages** | Static HTML, docs | Limited | Yes (free) |
| **Netlify** | SPAs, JAMstack | Yes | Yes (free) |
| **Vercel** | React, Next.js | Yes | Yes (free) |

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

1. **Read the full framework:** [`framework/core/pm-ai-partner-framework.md`](framework/core/pm-ai-partner-framework.md)
2. **Try a workflow:** Start with [Strategic Clarity](framework/core/workflows/strategic-clarity.md)
3. **Copy starter prompts:** [`framework/core/starter-prompts.md`](framework/core/starter-prompts.md)
4. **Customize your CLAUDE.md:** Add team-specific context
5. **Commit your setup:** Use git to track your sandbox

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
