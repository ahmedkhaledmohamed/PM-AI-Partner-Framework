# PM AI Partner Framework

## What This Is

This is a **template repository** for Product Managers who want to use AI (Claude) as a structured thinking partner. Fork this repo, customize it for your context, and start working.

## Repository Structure

```
pm-ai-partner-framework/
├── CLAUDE.md              # You are here - root context
├── sandbox/               # Your personal drafts & exploration (private)
├── product-catalog/       # Polished artifacts for sharing (team/public)
├── framework/
│   ├── core/              # Methodology: agent modes, workflows, philosophy
│   └── templates/         # Config files to copy into your workspace
├── site/                  # Site source (presentations, images, index)
└── docs/                  # GitHub Pages deployment (mirrors site/)
```

## Quick Start

1. **Fork this repo** to your account
2. **Copy templates** from `framework/templates/` to your workspace
3. **Start in sandbox/** for drafts, graduate to `product-catalog/` when ready
4. **Use the agent modes** and workflows in `framework/core/`

## How to Use This Context

When working in this repo:
- **Read** `framework/core/pm-ai-partner-framework.md` for the full methodology
- **Use** `framework/core/quick-reference.md` as a daily cheat sheet
- **Copy** prompts from `framework/core/starter-prompts.md`
- **Follow** workflows in `framework/core/workflows/` for specific scenarios

## Formatting Rules

- **Use Mermaid diagrams rather than ASCII art** — When producing architecture diagrams, flowcharts, sequence diagrams, or any visual in Markdown files, use Mermaid (`\`\`\`mermaid`) format. Mermaid renders natively on GitHub and is easier to maintain than ASCII box drawings.

## The Core Principle

> **PM work is reconciling four sources of truth. AI helps you explore each faster and spot conflicts. Judgment stays human.**

| Source | Question | AI Role |
|--------|----------|---------|
| Code | "What CAN happen?" | Explore, map |
| Docs | "What's EXPECTED?" | Synthesize |
| Data | "What IS happening?" | Analyze |
| Judgment | "What SHOULD happen?" | Challenge |

## Agent Modes

Switch between these AI "personalities" based on your task. You can invoke these via slash commands (e.g., `/thought-partner`) if skills are installed.

| Mode | Command | When to Use |
|------|---------|-------------|
| Thought Partner | `/thought-partner` | Brainstorming, exploring options |
| Technical Analyst | `/technical-analyst` | Codebase exploration, capability audits |
| Writer | `/writer` | Strategy docs, narratives, communication |
| Devil's Advocate | `/devil-advocate` | Stress-testing ideas, preparing for pushback |
| Builder | `/builder` | Creating tools, prototypes, scripts |
| Data Analyst | `/data-analyst` | Metrics analysis, finding patterns |

---

## Skills (Slash Commands)

If you've installed the framework skills, these additional commands are available:

| Command | Description |
|---------|-------------|
| `/product-brief` | Structured PRD and feature spec creation |
| `/meeting-prep` | Meeting preparation with talking points |
| `/stakeholder-update` | Status reports and executive summaries |
| `/strategic-clarity` | Guided workflow for team identity and boundaries |

Skills are installed from `framework/templates/skills/`. See `getting-started.md` for installation instructions.

## Links

- [Full Framework](framework/core/pm-ai-partner-framework.md)
- [Quick Reference](framework/core/quick-reference.md)
- [Starter Prompts](framework/core/starter-prompts.md)
- [Workflows](framework/core/workflows/)
- [Templates](framework/templates/)

---

## Feedback

Using this framework? I'd love to hear what's working and what's not:

- ⭐ [Star the repo](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework) if it's helpful
- 💬 [Share feedback](https://docs.google.com/forms/d/e/1FAIpQLSdz3hPDtLGLdrjJ0ppYtpdjQX5YBRo2oeqjyhJz7-mT5HOmKg/viewform) (2 min survey)
- 📧 Email: ahmd.khaled.a.mohamed@gmail.com
