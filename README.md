# PM-AI-Partner-Framework

A framework for using AI (Claude) as a Product Management thinking partner.

![PM AI Partner Framework](docs/images/framework-diagram.png)

---

## Author

**Ahmed Khaled**  
Product Manager, Client Messaging @ Spotify  
Building messaging infrastructure serving 700M+ MAU

---

## What This Is

This is my **personal operating system** for AI-augmented product management. It documents:

- **How I think with AI** — The collaboration model
- **Workflow patterns** — Repeatable processes for common PM tasks
- **Agent modes** — Different AI "personalities" for different jobs
- **Templates** — Starting points for common artifacts

This is not about having AI write your work — it's about **thinking more rigorously** with AI assistance.

---

## The Core Principle

> **PM work is reconciling four sources of truth. AI helps you explore each faster and spot conflicts. Judgment stays human.**

---

## What's Here

```
PM-AI-Partner-Framework/
├── README.md                           # You are here
├── getting-started.md                  # Setup guide (start here!)
├── framework/
│   ├── pm-ai-partner-framework.md      # Complete framework (main doc)
│   └── quick-reference.md              # One-page cheat sheet
├── workflows/
│   ├── strategic-clarity.md            # New role / team identity
│   ├── codebase-deep-dive.md           # Reality audit
│   └── tool-building.md                # Prototyping with AI
├── blog/
│   └── ai-as-pm-thinking-partner.md    # Blog post (Substack/LinkedIn)
├── talk/
│   └── pm-ai-partner-knowledge-sharing.md  # Presentation outline
└── docs/
    └── index.html                      # Interactive landing page (GitHub Pages)
```

---

## Quick Start

| Need                         | Start Here                               |
| ---------------------------- | ---------------------------------------- |
| **Set up on your machine**   | [`getting-started.md`](getting-started.md) ⬅️ Start here |
| Interactive overview         | [`docs/index.html`](https://ahmedkhaledmohamed.github.io/PM-AI-Partner-Framework/) |
| Full framework understanding | `framework/pm-ai-partner-framework.md`   |
| Quick daily reference        | `framework/quick-reference.md`           |
| Specific workflow            | `workflows/` folder                      |
| Blog post / external sharing | `blog/` folder                           |
| Presentation materials       | `talk/` folder                           |

---

## Four Sources of Truth

Every PM decision reconciles different types of truth:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    CODE     │  │    DOCS     │  │    DATA     │  │  JUDGMENT   │
│  Technical  │  │ Contextual  │  │  Empirical  │  │    Human    │
│             │  │             │  │             │  │             │
│ What CAN    │  │ What's      │  │ What IS     │  │ What        │
│ happen?     │  │ expected?   │  │ happening?  │  │ SHOULD?     │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │                │
       └────────────────┴────────┬───────┴────────────────┘
                                 ▼
                    ┌─────────────────────┐
                    │    RECONCILIATION   │
                    └─────────────────────┘
```

| Source       | Question Answered     |
| ------------ | --------------------- |
| **Code**     | "What CAN happen?"    |
| **Docs**     | "What's EXPECTED?"    |
| **Data**     | "What IS happening?"  |
| **Judgment** | "What SHOULD happen?" |

---

## Six Agent Modes

![Six Agent Modes Diagram](docs/images/agent-modes-diagram.png)

| Mode                  | When to Use          | Prompt Prefix                     |
| --------------------- | -------------------- | --------------------------------- |
| **Technical Analyst** | Codebase exploration | "Act as a rigorous analyst..."    |
| **Writer**            | Strategy docs        | "Help me write a clear..."        |
| **Devil's Advocate**  | Stress-testing       | "Challenge this. Role-play as..." |
| **Builder**           | Tools, prototypes    | "Build [X] with this spec..."     |
| **Thought Partner**   | Brainstorming        | "Help me explore the space..."    |
| **Data Analyst**      | Metrics, insights    | "Here's [data]. What patterns?"   |

---

## Git as AI Memory

Your repo is the persistent layer; chat is ephemeral. Every meaningful AI session should produce a commit.

| Practice | Why |
| -------- | --- |
| Commit after each session | Preserve context |
| Use branches for exploration | Safe experimentation |
| Review diffs before sharing | Maintain ownership |
| Write descriptive messages | Future you will thank you |

**Anti-pattern:** Long AI sessions with no commits = lost context, no rollback.

---

## Background

I developed this framework while building clarity for a platform team at Spotify. The team had strong engineering but lacked a clear product identity. Over 4 months, I used AI assistance to:

- Audit 50,000+ lines of code to understand capabilities
- Produce 15+ strategy documents
- Build internal tools
- Prepare for stakeholder conversations

The framework emerged from what actually worked.

---

## License

MIT — Use freely, attribution appreciated.

---

## Contact

- GitHub: [@ahmedkhaledmohamed](https://github.com/ahmedkhaledmohamed)
- LinkedIn: [Ahmed Khaled](https://linkedin.com/in/ahmedkhaledmohamed)
