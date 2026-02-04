# PM AI Partner Framework

A framework for using AI (Claude) as a Product Management thinking partner.

**Fork this repo. Customize it. Start working.**

[![Star this repo](https://img.shields.io/github/stars/ahmedkhaledmohamed/PM-AI-Partner-Framework?style=social)](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)

![PM AI Partner Framework](docs/images/framework-diagram.png)

> **Finding this useful?** ⭐ [Star this repo](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework) — it helps others discover it!
>
> **Questions or feedback?** [Quick survey](https://docs.google.com/forms/d/e/1FAIpQLSdz3hPDtLGLdrjJ0ppYtpdjQX5YBRo2oeqjyhJz7-mT5HOmKg/viewform) (2 min) · [Start a discussion](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/discussions) · [Share your experience](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/issues/new?template=success_story.md)

---

## Quick Start

```bash
# 1. Fork this repo on GitHub
# 2. Clone your fork
git clone git@github.com:YOUR-USERNAME/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework

# 3. Copy templates to your workspace
cp framework/templates/CLAUDE.md ~/your-workspace/
cp framework/templates/CLAUDE-sandbox.md ~/your-workspace/sandbox/CLAUDE.md

# 4. Start using the framework
# Open in Cursor/VS Code and start iterating with AI
```

---

## What This Is

This is a **template repository** for AI-augmented product management. It provides:

- **Structured workspace** - sandbox for drafts, product-catalog for polished work
- **Agent modes** - Six AI "personalities" for different tasks
- **Workflow patterns** - Step-by-step guides for common PM scenarios
- **Config templates** - CLAUDE.md files, MCP configs, Cursor rules

**This is not about having AI write your work. It's about thinking more rigorously.**

---

## Repository Structure

```
pm-ai-partner-framework/
├── CLAUDE.md                    # Root workspace context
├── sandbox/                     # Personal drafts & exploration
│   ├── CLAUDE.md
│   └── _examples/
├── product-catalog/             # Polished, shareable work
│   ├── CLAUDE.md
│   └── _examples/
├── framework/
│   ├── core/                    # Methodology
│   │   ├── pm-ai-partner-framework.md   # Full framework doc
│   │   ├── quick-reference.md           # One-page cheat sheet
│   │   ├── starter-prompts.md           # Copy-paste prompts
│   │   └── workflows/                   # Step-by-step guides
│   └── templates/               # Config files to copy
│       ├── CLAUDE.md            # Workspace template
│       ├── mcp.json             # MCP configuration
│       └── cursorrules.txt      # Cursor IDE rules
└── docs/                        # GitHub Pages site
```

---

## The Core Principle

> **PM work is reconciling four sources of truth. AI helps you explore each faster and spot conflicts. Judgment stays human.**

| Source | Question | AI Role |
|--------|----------|---------|
| **Code** | "What CAN happen?" | Explore, map |
| **Docs** | "What's EXPECTED?" | Synthesize |
| **Data** | "What IS happening?" | Analyze |
| **Judgment** | "What SHOULD happen?" | Challenge |

---

## Six Agent Modes

![Six Agent Modes Diagram](docs/images/agent-modes-diagram.png)

| Mode | When to Use | Prompt Prefix |
|------|-------------|---------------|
| **Technical Analyst** | Codebase exploration | "Act as a rigorous analyst..." |
| **Writer** | Strategy docs | "Help me write a clear..." |
| **Devil's Advocate** | Stress-testing | "Challenge this. Role-play as..." |
| **Builder** | Tools, prototypes | "Build [X] with this spec..." |
| **Thought Partner** | Brainstorming | "Help me explore the space..." |
| **Data Analyst** | Metrics, insights | "Here's [data]. What patterns?" |

See [starter-prompts.md](framework/core/starter-prompts.md) for copy-paste prompts.

---

## Workflows

| Scenario | Workflow | Output |
|----------|----------|--------|
| New role, unclear identity | [Strategic Clarity](framework/core/workflows/strategic-clarity.md) | Charter, Value Proposition |
| Understanding what exists | [Codebase Deep-Dive](framework/core/workflows/codebase-deep-dive.md) | Capability Audit |
| Building internal tools | [Tool Building](framework/core/workflows/tool-building.md) | Working Prototype |

---

## Getting Started

| Need | Go Here |
|------|---------|
| **Set up on your machine** | [getting-started.md](getting-started.md) |
| **Full framework understanding** | [framework/core/pm-ai-partner-framework.md](framework/core/pm-ai-partner-framework.md) |
| **Quick daily reference** | [framework/core/quick-reference.md](framework/core/quick-reference.md) |
| **Copy-paste prompts** | [framework/core/starter-prompts.md](framework/core/starter-prompts.md) |
| **Config templates** | [framework/templates/](framework/templates/) |
| **Interactive overview** | [docs/index.html](https://ahmedkhaledmohamed.github.io/PM-AI-Partner-Framework/) |

---

## Git as AI Memory

Your repo is the persistent layer; chat is ephemeral. Every meaningful AI session should produce a commit.

| Practice | Why |
|----------|-----|
| Commit after each session | Preserve context |
| Use branches for exploration | Safe experimentation |
| Review diffs before sharing | Maintain ownership |
| Write descriptive messages | Future you will thank you |

---

## Contributing

We welcome contributions! See [`CONTRIBUTING.md`](CONTRIBUTING.md) for ways to help:

- Share your success stories
- Report issues or suggest features
- Add examples and case studies
- Improve documentation

---

## Author

**Ahmed Khaled Mohamed**
- GitHub: [@ahmedkhaledmohamed](https://github.com/ahmedkhaledmohamed)
- Email: ahmd.khaled.a.mohamed@gmail.com
- LinkedIn: [Ahmed Khaled](https://linkedin.com/in/ahmedkhaledmohamed)

---

## License

MIT - Use freely, attribution appreciated.
