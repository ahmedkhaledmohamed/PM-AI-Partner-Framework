# PM AI Partner

**10 AI skills, 4 workflow commands, 3 automation hooks, and 17 MCP servers built for Product Managers.**

[![npm version](https://img.shields.io/npm/v/pm-ai-partner?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/pm-ai-partner)
[![GitHub stars](https://img.shields.io/github/stars/ahmedkhaledmohamed/PM-AI-Partner-Framework?style=for-the-badge&logo=github&color=181717)](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

```bash
npx pm-ai-partner@latest
```

**Works with Claude Code, Cursor, and Codex. Mac, Windows, and Linux.**

![PM AI Partner Install](demo/install.gif)

*"Finally — AI skills that understand PM work, not just engineering."*

---

## Why This Exists

AI coding assistants are built for engineers. PMs get generic chatbot responses — "have you considered your stakeholders?" — instead of tools that match how we actually work.

PM AI Partner gives Claude the context to be useful for PM tasks:
- **Thinking through strategy** — not generating buzzword soup
- **Translating code to product insights** — not dumping raw implementations
- **Writing briefs that engineering can scope from** — not vague wishlists
- **Challenging your ideas constructively** — not agreeing with everything

## What You Get

### 10 Agent Skills

Tell Claude which "hat" to wear. Skills auto-activate based on context or invoke them explicitly.

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Thought Partner** | `/pm:thought-partner` | Brainstorm, explore options, surface assumptions |
| **Technical Analyst** | `/pm:technical-analyst` | Translate code and systems into PM-friendly insights |
| **Writer** | `/pm:writer` | Draft briefs, updates, emails — concise and structured |
| **Devil's Advocate** | `/pm:devil-advocate` | Stress-test proposals, anticipate objections |
| **Builder** | `/pm:builder` | Build tools, scripts, dashboards, prototypes |
| **Data Analyst** | `/pm:data-analyst` | Write queries, analyze metrics, extract insights |
| **Product Brief** | `/pm:product-brief` | Create structured PRDs and feature specs |
| **Meeting Prep** | `/pm:meeting-prep` | Prepare talking points, anticipate questions |
| **Stakeholder Update** | `/pm:stakeholder-update` | Status reports and executive summaries |
| **Strategic Clarity** | `/pm:strategic-clarity` | Define team identity, boundaries, and charter |

### 4 Workflow Commands

Multi-step workflows for recurring PM tasks.

| Command | What It Does |
|---------|-------------|
| `/pm:plan-week` | Weekly planning — assess state, set priorities, flag risks |
| `/pm:write-brief [feature]` | Guided product brief creation with quality checklist |
| `/pm:prep-meeting [topic]` | Meeting prep with talking points, Q&A, and role-play |
| `/pm:audit-codebase [system]` | PM-focused codebase exploration — capabilities, gaps, implications |

### 3 Automation Hooks

Hooks fire automatically — no manual invocation needed.

| Hook | Trigger | What It Does |
|------|---------|-------------|
| **Quality Gate** | Write to `product-catalog/` | Checks document against quality bar (evidence, clarity, audience) |
| **Draft Status** | Write to `sandbox/` | Reminds to add status markers to draft documents |
| **Commit Reminder** | `git commit` | Prompts to capture lessons learned in CLAUDE.md |

### 17 MCP Servers

Connect your AI assistant to external tools. The installer offers a curated catalog of PM-relevant MCP servers — pick what you need and the config is generated automatically.

**Zero-config (work immediately):**

| Server | What It Does |
|--------|-------------|
| **Memory** | Persistent knowledge graph — track decisions across sessions |
| **Fetch** | Pull web pages as markdown into chat |
| **Sequential Thinking** | Enhanced step-by-step reasoning for complex problems |
| **Filesystem** | Read/write local files with directory scoping |
| **Puppeteer** | Browser automation — screenshots, page navigation, form filling |
| **Git** | Git log, diff, status, branch operations *(requires Python/uvx)* |

**PM Essentials (one credential each):**

| Server | What It Does | Credential |
|--------|-------------|------------|
| **GitHub** | Issues, PRs, code search | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **Linear** | Issues, projects, sprints *(remote — OAuth)* | Authenticates via browser |
| **Atlassian** | Jira issues + Confluence pages *(remote — OAuth)* | Authenticates via browser |
| **Google Drive** | Team docs, sheets, slides | `GOOGLE_APPLICATION_CREDENTIALS` |
| **Slack** | Channels, threads, search | `SLACK_BOT_TOKEN` |
| **Brave Search** | Web search for research | `BRAVE_API_KEY` |
| **Notion** | Pages, databases, wikis | `OPENAPI_MCP_HEADERS` |
| **Sentry** | Error reports, stack traces, issue trends | `SENTRY_AUTH_TOKEN` |

**Data & Analytics (credentials + setup):**

| Server | What It Does | Credential |
|--------|-------------|------------|
| **PostgreSQL** | SQL queries against Postgres | Connection string |
| **SQLite** | Query local SQLite databases | File path |
| **BigQuery** | Google BigQuery analytics | GCP credentials JSON |

Servers you skip are added as `disabled` with placeholder values — enable them later by adding your credentials to the config file. Remote servers (Linear, Atlassian) authenticate via browser on first use.

---

## Install

### One Command

```bash
npx pm-ai-partner@latest
```

The installer prompts you to choose:
1. **Runtime** — Claude Code, Cursor, Codex, or all
2. **Scope** — Global (all projects) or local (current project only)
3. **MCP Servers** — optionally browse and install from a catalog of 17 servers

### Non-Interactive

```bash
# Claude Code — global
npx pm-ai-partner --claude --global

# Cursor — global
npx pm-ai-partner --cursor --global

# All runtimes — global
npx pm-ai-partner --all --global

# Current project only
npx pm-ai-partner --claude --local

# Include MCP servers (all zero-config servers)
npx pm-ai-partner --claude --global --mcp

# Specific MCP servers by ID
npx pm-ai-partner --claude --global --mcp=memory,fetch,github

# MCP only (skip skills, just configure servers)
npx pm-ai-partner --mcp-only --claude --global

# List currently configured MCP servers
npx pm-ai-partner --mcp-list --claude --global
```

### Claude Code Plugin (Alternative)

```bash
# If the plugin is published to a marketplace:
/plugin install pm-ai-partner
```

### Manual Install

```bash
git clone https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework/plugin
node bin/install.js
```

### Verify

After installing, restart your editor and run:

```
/pm:thought-partner What should I focus on this quarter?
```

---

## How It Works

### Skills = Agent Modes

Each skill gives Claude a different "personality" optimized for a PM task. Instead of generic AI responses, you get structured, PM-aware output:

**Without PM AI Partner:**
> "You should consider stakeholder alignment and create a roadmap..."

**With `/pm:devil-advocate`:**
> **What's strong:** Clear user value, low engineering lift.
>
> **Key challenges:**
> 1. Quality consistency — what's your plan when AI descriptions are wrong?
> 2. Success metric is fuzzy — how will you know this worked in 3 months?
>
> **Likely objections:**
> - Engineering: "Why not improve search instead?"
> - Legal: "Who owns AI-generated text?"
>
> **Suggested mitigations:** [table with specific actions]

### Hooks = Automated Quality

Hooks run in the background. When you write a document to `product-catalog/`, the quality gate automatically checks that it meets the bar:

- Accurate: Claims backed by evidence
- Clear: Readable without context
- Owned: Has author and date
- Evidenced: Links to supporting data
- Audience-appropriate: Tone matches the reader

### Commands = PM Workflows

Commands are multi-step workflows. `/pm:plan-week` doesn't just ask "what are your priorities?" — it:

1. Reviews your existing context (CLAUDE.md, sandbox/, product-catalog/)
2. Assesses current state and in-flight work
3. Identifies top priorities based on team context
4. Maps priorities to concrete actions
5. Flags risks for the week
6. Sets measurable success criteria

---

## The Methodology Behind It

PM AI Partner is built on a simple idea:

> **PM work is reconciling four sources of truth. AI helps you explore each faster. Judgment stays human.**

| Source | Question | AI Role |
|--------|----------|---------|
| **Code** | What CAN happen? | Explore, map |
| **Docs** | What's EXPECTED? | Synthesize |
| **Data** | What IS happening? | Analyze |
| **Judgment** | What SHOULD happen? | Challenge |

The skills map to this framework — Technical Analyst explores code, Data Analyst queries data, Writer synthesizes docs, Devil's Advocate challenges judgment.

For the full methodology, workspace architecture, and workflow patterns, see the [PM AI Partner Framework](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework).

---

## Case Study: OpenClaw Deep Dive

A worked example showing the framework in action — a PM-style deep dive into [OpenClaw](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/framework/examples/case-studies/openclaw-deep-dive.md) completed in ~3 hours:

1. **Technical Analyst** — Mapped architecture (Gateway, Brain, Hands, Memory, Heartbeat)
2. **Data Analyst** — Analyzed growth (0 → 220K stars in 84 days)
3. **Devil's Advocate** — Surfaced security risks (6 CVEs, ~900 malicious skills, $16M crypto scam)
4. **Builder** — Generated HTML presentation and PPTX deck

[Read the full case study →](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/framework/examples/case-studies/openclaw-deep-dive.md)

---

## Configuration

### Workspace Setup

For the best experience, create a `CLAUDE.md` in your project root with your team context:

```markdown
# My Workspace
**Team:** [Your Team]
**Mission:** [One sentence]
**Systems:** [What you own]
**Current Focus:** [This quarter's priorities]
```

The more context you provide, the better the skills perform. Templates are available in the [full framework](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/tree/main/framework/templates).

### Workspace Structure

The framework works best with this layout:

```
your-workspace/
├── CLAUDE.md           # Team context for AI
├── sandbox/            # Drafts & exploration (private)
└── product-catalog/    # Polished artifacts (shareable)
```

The **quality gate hook** activates for `product-catalog/` files. The **draft status hook** activates for `sandbox/` files.

---

## Updating

```bash
npx pm-ai-partner@latest
```

Re-running the installer updates all skills, commands, and hooks. MCP server configs are never overwritten — existing servers are preserved.

---

## Contributing

Improvements welcome — especially:
- New PM-specific skills or commands
- Better examples from real PM work
- Bug reports and feature requests
- Hooks for additional PM workflows

See [CONTRIBUTING.md](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/CONTRIBUTING.md).

---

## Full Framework

This plugin is part of the **PM AI Partner Framework** — a complete methodology for using AI as a structured PM thinking partner. The framework includes:

- **4 detailed workflow patterns** (Strategic Clarity, Codebase Deep-Dive, Tool Building, Analysis Pipeline)
- **Workspace architecture** (sandbox → product-catalog graduation)
- **CLAUDE.md templates** for team context
- **17 MCP server configs** (Memory, GitHub, Linear, Atlassian, Slack, BigQuery, and more)
- **Case studies** with worked examples
- **Presentations** and demo materials

[Explore the full framework →](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)

---

## Author

**Ahmed Khaled Mohamed**
- [GitHub](https://github.com/ahmedkhaledmohamed)
- [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed)
- [Email](mailto:ahmd.khaled.a.mohamed@gmail.com)

---

## License

MIT License. See [LICENSE](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/LICENSE) for details.
