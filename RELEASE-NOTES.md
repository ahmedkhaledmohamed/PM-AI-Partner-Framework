# PM AI Partner Framework

**Latest Version:** v3.0.0 (March 2026)
**Repo:** https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework

---

## What's New in v3.0.0

### 2 New Skills

| Skill | What It Does |
|-------|-------------|
| **Hypothesis Tester** | Design A/B tests, calculate sample sizes, interpret results honestly, catch novelty effects |
| **Competitor Analyst** | Map competitive landscapes, identify positioning gaps, apply Ignore/Monitor/Respond/Lead framework |

Both include 5 Advanced Patterns and detailed worked examples.

### 2 New Commands

| Command | What It Does |
|---------|-------------|
| `/pm:competitor-scan [competitor]` | Full competitive analysis with positioning maps, feature comparison with insight, and action recommendations |
| `/pm:metrics-review` | Structured metrics review — headlines, deep dives on movers, segment analysis, action items |

### Smarter Existing Commands

- **`/pm:plan-week`** now pulls context from MCP servers (GitHub PRs/issues, Linear sprint items, Slack requests, Google Drive docs, Memory for last week's plan) to pre-populate your weekly plan
- **`/pm:audit-codebase`** now auto-detects repo language/framework, generates Mermaid architecture diagrams, maps API surfaces and data models, and integrates with GitHub/Sentry MCP for additional context

### Totals: 12 skills, 6 commands, 3 hooks, 17 MCP servers

---

## What's New in v2.2.0

### Advanced Patterns Across All Skills

Every skill now includes an **Advanced Patterns** section with 5+ experience-encoded patterns — real lessons from PM practice, not textbook frameworks. These patterns are what differentiate this project from generic AI prompting tools.

Examples:
- **Thought Partner**: "Reframing the question" — catching when a PM is solving the wrong problem
- **Devil's Advocate**: "The data gap" — proposals that sound data-driven but rest on data that doesn't exist
- **Writer**: "Executive summary inversion" — leading with the ask, not the background
- **Product Brief**: "Scope negotiation" — writing Out of Scope sections that actually hold
- **Meeting Prep**: "The real meeting behind the meeting" — identifying the actual decision being made
- **Stakeholder Update**: "The bad news sandwich is dead" — leading with honesty + plan

### 9 Complete Workflows (5 new)

All 9 promised workflows are now fully documented with step-by-step phases, AI prompts, and output checklists:

| New Workflow | Phases | When to Use |
|---|---|---|
| **Planning Cycle** | REVIEW → PRIORITIZE → COMMIT → COMMUNICATE | Quarterly/sprint planning |
| **Data Investigation** | QUESTION → QUERY → INTERPRET → RECOMMEND | Metric moved unexpectedly |
| **PM-Eng Bridge** | TRANSLATE → NEGOTIATE → SPECIFY → VERIFY | Scoping, eng collaboration |
| **Communication Prep** | CONTEXT → POSITION → ANTICIPATE → REHEARSE | High-stakes meetings |
| **Doc Restructuring** | AUDIT → DESIGN → MIGRATE → VERIFY | Confusing documentation |

### Cross-Platform Getting Started

The getting-started guide now covers macOS, Linux, and Windows (with WSL2 recommended path).

---

## What's New in v2.0.0

### Claude Code Plugin

The framework now ships as a proper Claude Code plugin with one-command installation:

```bash
npx pm-ai-partner@latest
```

The `plugin/` directory contains the full plugin structure compliant with the official Claude Code plugin format (`.claude-plugin/plugin.json` manifest).

### Multi-Platform Support

The installer supports Claude Code, Cursor, and Codex with both global and local installation scopes.

### 4 Workflow Commands

New explicit slash commands for recurring PM workflows:

| Command | What It Does |
|---------|-------------|
| `/pm:plan-week` | Weekly planning — assess state, set priorities, flag risks |
| `/pm:write-brief [feature]` | Guided product brief creation with quality checklist |
| `/pm:prep-meeting [topic]` | Meeting prep with talking points, Q&A, and role-play |
| `/pm:audit-codebase [system]` | PM-focused codebase exploration — capabilities, gaps, implications |

### 3 Automation Hooks

PM-specific hooks that fire automatically:

| Hook | Trigger | What It Does |
|------|---------|-------------|
| Quality Gate | Write to `product-catalog/` | Checks document against quality bar |
| Draft Status | Write to `sandbox/` | Reminds to add status markers |
| Commit Reminder | `git commit` | Prompts to capture lessons in CLAUDE.md |

### npm Package

Published as `pm-ai-partner` on npm for one-command installation across platforms.

### Terminal Demo

Added SVG terminal visualization and VHS tape file for generating animated demos.

### Updated Files

| File | Change |
|------|--------|
| `plugin/` (26 files) | New — complete Claude Code plugin |
| `plugin/.claude-plugin/plugin.json` | New — plugin manifest |
| `plugin/package.json` | New — npm package definition |
| `plugin/bin/install.js` | New — interactive installer |
| `plugin/commands/pm/*.md` (4 files) | New — workflow commands |
| `plugin/hooks/` (4 files) | New — automation hooks |
| `plugin/skills/` (10 SKILL.md files) | New — migrated skills in plugin format |
| `plugin/README.md` | New — plugin-focused README |
| `plugin/PUBLISHING.md` | New — distribution guide |
| `plugin/demo/terminal.svg` | New — terminal demo SVG |
| `README.md` | Updated — install command first, badges, star history |
| `RELEASE-NOTES.md` | Updated — v2.0.0 entry |

---

## What's New in v1.4.0

### Product Brief Template

Added a ready-to-use product brief template to the `product-brief` skill at `framework/templates/skills/product-brief/product-brief-template.md`. Sections include Problem Statement, Hypothesis, Requirements (P0/P1/P2), Success Metrics, Test Plan, Constraints, and Appendix.

### Skill Correction: Technical Analyst

Rewrote the technical-analyst skill example based on codebase audit findings. The original propagated an incorrect hypothesis ("iOS uses native prompt, Android redirects to Settings"). Corrected version reflects reality: both platforms redirect to Settings, but iOS lands on notification settings (one tap) while Android landed on general app info. Also documents Android's unused second native prompt attempt.

### Updated Files

| File | Change |
|------|--------|
| `framework/templates/skills/product-brief/product-brief-template.md` | New — Product Brief template |
| `framework/templates/skills/technical-analyst/SKILL.md` | Fixed — corrected permission flow example |

---

## What's New in v1.3.0

### Cursor Skills (10 new)

Reusable AI behaviors invoked via slash commands or auto-triggered by conversation context:

| Type | Skills |
|------|--------|
| Agent Modes (6) | thought-partner, technical-analyst, writer, devil-advocate, builder, data-analyst |
| Scenarios (3) | product-brief, meeting-prep, stakeholder-update |
| Workflows (1) | strategic-clarity |

Each skill includes instructions, examples, and lessons learned from real usage.

### Analysis Pipeline Workflow

New 5-phase workflow from raw data question to deployed presentation:

```
QUERY → DOCUMENT → PRESENT → GENERATE → DEPLOY
```

Includes AI prompts, templates, CSS system, PPTX generation pattern, and git worktree strategy.

### Advanced Patterns in Skills

- **data-analyst:** Multi-dimensional breakdown, data caveat identification, CTR analysis, partition filtering
- **builder:** HTML presentations, PPTX generation, static site deployment, git worktrees, Product Catalog pattern
- **technical-analyst:** Codebase-to-product-insight, cross-platform comparison, evidence-backed recommendations

### Updated Files

| File | Change |
|------|--------|
| `framework/templates/skills/` (12 files) | New — all skill definitions + README |
| `framework/core/workflows/analysis-pipeline.md` | New — 5-phase workflow |
| `framework/core/workflows/README.md` | Added analysis-pipeline entry |
| `CLAUDE.md` | Added slash command references |
| `getting-started.md` | Added Step 9.5: Install Cursor Skills |
| `framework/templates/README.md` | Added skills installation section |

---

## What's New in v1.2

### Context Variance Demo

Added a new demo segment that shows the **compounding value** of accumulated context:

| Addition | Location |
|----------|----------|
| **New Slide 7** — "Why Context Matters" | `site/demo-presentation.html` |
| **New Step 0** — Context variance live demo | `framework/demo/demo-script.md` |
| **Context variance guide** | `framework/demo/context-variance-demo.md` |
| **Assessment template** | `framework/demo/assessment-template.md` |

### Demo Flow Update

The demo now starts with a **5-minute context variance comparison**:

1. Same prompt to vanilla setup → generic response
2. Same prompt to context-rich setup → hypothesis-aware, team-aware response
3. **"This is what months of accumulated context gives you."**

### New Demo Files

| File | Purpose |
|------|---------|
| `context-variance-demo.md` | Standalone guide for the variance demo |
| `assessment-template.md` | Template to evaluate session quality |

### Presentation Updates

- **Duration:** 60 → 65 min
- **Slides:** 12 → 13
- **New first demo item:** "Context variance — Vanilla vs Framework setup"

---

## What's New in v1.1

### Claude Code Best Practices

Added tips from **Boris Cherny** (Claude Code creator) and the Claude Code team:

| Addition | Location |
|----------|----------|
| **Plan Mode guidance** | `framework/templates/CLAUDE.md` |
| **Advanced prompting techniques** | `framework/core/starter-prompts.md` |
| **Power prompt shortcuts** | `framework/core/quick-reference.md` |
| **Git worktree parallelism** | `getting-started.md` |
| **Self-correcting CLAUDE.md** | All templates |

### New Prompting Shortcuts

| Shorthand | Effect |
|-----------|--------|
| "plan first" | Start in plan mode, wait for approval |
| "grill me" | Review critically as a Staff Engineer |
| "elegant solution" | Scrap current approach, implement cleanly |
| "use subagents" | Parallelize with multiple agents |
| "prove it works" | Show behavioral diff or test output |

### Git Worktree Workflow

Added shell aliases for running parallel Claude sessions:
- `wt <branch>` — Create worktree from existing branch
- `wtn <branch>` — Create new branch + worktree
- `wtl` — List all worktrees
- `wtr <path>` — Remove a worktree

### Two-Claude Pattern

New workflow for important work:
1. Claude A writes the plan/code
2. Claude B reviews it as a Staff Engineer
3. Iterate until Claude B approves, then implement

---

# v1.0 Release Notes

---

## What is this?

The **PM AI Partner Framework** is a ready-to-use template repository for Product Managers who want to work smarter with AI. Fork it, customize it, and start using AI as your thinking partner immediately.

> **Core Principle:** PM work is reconciling four sources of truth (Code, Docs, Data, Judgment). AI helps you explore each faster. Judgment stays human.

---

## What's Included

### Fork-Ready Structure

| Folder | Purpose |
|--------|---------|
| `CLAUDE.md` | Main AI context (customize this!) |
| `sandbox/` | Personal drafts & exploration |
| `product-catalog/` | Polished work ready to share |
| `framework/core/` | Agent modes, workflows, philosophy |
| `framework/templates/` | Config templates for your tools |
| `framework/demo/` | Demo scripts & materials |
| `framework/examples/` | Real case studies |
| `getting-started.md` | Step-by-step setup guide |
| `site/` | Visual landing page |

### Six Agent Modes

| Mode | Purpose |
|------|---------|
| **Thought Partner** | Brainstorming, exploring ideas |
| **Technical Analyst** | Understanding systems & code |
| **Writer** | Creating clear documents |
| **Devil's Advocate** | Stress-testing proposals |
| **Builder** | Creating tools & prototypes |
| **Data Analyst** | Analyzing metrics & patterns |

### Eight Workflow Patterns

1. **Strategic Clarity** — Define team mission and value
2. **Planning Cycle** — Quarterly/sprint planning
3. **Codebase Discovery** — Understand what actually exists
4. **Tool Building** — Create internal tools
5. **Communication Prep** — Presentations & talks
6. **PM-Eng Bridge** — Translate code ↔ product
7. **Data Investigation** — Metrics analysis
8. **Doc Restructuring** — Fix confusing docs

### Starter Prompts

40+ copy-paste prompts for common PM scenarios including first session setup, all six agent modes, writing briefs, preparing meetings, analyzing decisions, creating roadmaps, and exploring hypotheses.

### Configuration Templates

Ready-to-use templates in `framework/templates/`:
- `CLAUDE.md` — AI context file
- `mcp.json` — MCP tool configuration
- `settings.local.json` — Cursor settings
- `cursorrules.txt` — Custom AI rules

### Real Case Study

Complete example of the Strategic Clarity workflow applied to a real team, showing the framework in action.

---

## Quick Start

1. Fork the repo (click "Fork" on GHE)
2. Clone: `git clone github.com:YOUR_USERNAME/PM-AI-Partner-Framework.git`
3. Open in Cursor: `cd pm-ai-partner-framework && cursor .`
4. Customize `CLAUDE.md` with your context
5. Start working!

---

## Key Resources

| Need | Location |
|------|----------|
| Get set up | `getting-started.md` |
| Full philosophy | `framework/core/pm-ai-partner-framework.md` |
| Quick cheat sheet | `framework/core/quick-reference.md` |
| Copy-paste prompts | `framework/core/starter-prompts.md` |
| Config templates | `framework/templates/` |
| Case study | `framework/examples/case-studies/` |
| Visual landing page | `site/index.html` |

---

## What's New in v1.0

This is the first public release, restructured for easy adoption:

- **Single-repo template** — Everything you need in one place
- **Pre-configured folders** — `sandbox/` and `product-catalog/` with their own `CLAUDE.md` files
- **Example files** — Learn by seeing real examples in `_examples/` folders
- **Comprehensive templates** — All configuration files ready to customize
- **Demo materials** — Scripts and presentations for team workshops

---

## Feedback

Questions, suggestions, or success stories? Reach out:

- **Email:** ahmd.khaled.a.mohamed@gmail.com
- **LinkedIn:** [Ahmed Khaled](https://linkedin.com/in/ahmedkhaledmohamed)

---

*Built by Ahmed Khaled Mohamed*
