# PM AI Partner Framework

**Latest Version:** v1.3 (February 2026)
**Repo:** https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework

---

## What's New in v1.3

### Claude Code Skills

Added Claude Code versions of all 10 PM skills, alongside the existing Cursor skills. Claude Code skills use the same `SKILL.md` format but take advantage of Claude Code-specific frontmatter fields.

| Addition | Location |
|----------|----------|
| **10 Claude Code skills** | `framework/templates/claude-code-skills/` |
| **Claude Code skills README** | `framework/templates/claude-code-skills/README.md` |

### Skills Included

**Agent modes (6):**

| Skill | Command | Claude Code Feature |
|-------|---------|-------------------|
| thought-partner | `/thought-partner` | `argument-hint` |
| technical-analyst | `/technical-analyst` | `allowed-tools: Read, Grep, Glob, Bash(git *)` |
| writer | `/writer` | `argument-hint` |
| devil-advocate | `/devil-advocate` | `argument-hint` |
| builder | `/builder` | `allowed-tools: Read, Write, Edit, Bash, Grep, Glob` |
| data-analyst | `/data-analyst` | `allowed-tools: Read, Grep, Glob, Bash` |

**Scenarios (3):** product-brief, meeting-prep, stakeholder-update
**Workflows (1):** strategic-clarity

### Claude Code-Specific Frontmatter

These fields are available in Claude Code but not Cursor:

| Field | Purpose |
|-------|---------|
| `allowed-tools` | Grant tool access without asking — key for technical-analyst, builder, data-analyst |
| `argument-hint` | Show usage hint in autocomplete (e.g., `[topic or question]`) |
| `context: fork` | Run skill in an isolated subagent |
| `agent` | Choose subagent type (Explore, Plan, etc.) |
| `disable-model-invocation` | Prevent auto-triggering for dangerous operations |

### Installation

```bash
# Install all skills (personal, all projects)
mkdir -p ~/.claude/skills
cp -R framework/templates/claude-code-skills/*/ ~/.claude/skills/

# Or install specific skills
cp -R framework/templates/claude-code-skills/thought-partner ~/.claude/skills/
```

### Multi-Editor Support

The framework now supports both editors side by side:

```
framework/templates/
├── skills/                  # Cursor skills (existing)
└── claude-code-skills/      # Claude Code skills (new)
```

Same 10 skills, same content, optimized for each editor's capabilities.

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
2. Clone: `git clone git@github.com:YOUR_USERNAME/PM-AI-Partner-Framework.git`
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
- **LinkedIn:** [linkedin.com/in/ahmedkhaledmohamed](https://linkedin.com/in/ahmedkhaledmohamed)

---

*Built by Ahmed Khaled Mohamed*
