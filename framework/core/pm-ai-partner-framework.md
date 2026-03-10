# PM AI Partner Framework

## A System for Structured Thinking with LLMs

**Author:** Ahmed Khaled  
**Role:** Product Manager  
**Version:** 2.0 (March 2026)

---

## Executive Summary

This document describes a **personal operating system** for using AI (specifically Claude) as a product management partner. It covers:

1. **The Philosophy** — How human judgment mixes with AI capabilities
2. **The Plugin** — 10 skills, 4 commands, 3 hooks in one install
3. **The Workspace Architecture** — Structured knowledge organization
4. **The Workflow Patterns** — Repeatable processes for common PM tasks
5. **The Agent Modes** — Different Claude "personalities" for different jobs
6. **The Tool Selection** — When to use interactive AI vs CLI

This is not about replacing PM work — it's about **augmenting depth, speed, and rigor**.

---

## The Problem

Platform PMs face a unique challenge: **the truth lives in code, but strategy lives in docs, and the two rarely match.**

### What Goes Wrong

- You inherit a team and nobody can articulate what makes it different from adjacent teams
- Strategy documents claim capabilities that don't exist (or miss ones that do)
- The same questions get asked repeatedly by different stakeholders
- Deep codebase understanding takes months — time you don't have
- Writing rigorous docs competes with operational demands
- Data exists but isn't connected to decisions

### Traditional Approaches Don't Scale

```
Read docs → Form opinions → Write more docs → Hope you didn't miss something
                              ↓
              Iterate slowly through review cycles
                              ↓
              Context lives in people's heads, not systems
```

### The Opportunity

**AI changes what's possible** — but only if you know how to collaborate with it effectively.

| Without System | With System |
|----------------|-------------|
| AI writes generic docs | AI explores, you decide |
| Context lost between sessions | Structured workspace compounds knowledge |
| Ad-hoc prompting | Repeatable workflows |
| "Write me a strategy" | "Help me reconcile these sources" |

This framework is the system I built to bridge the gap.

---

## Part 1: The Philosophy

### Four Sources of Truth

PM work is fundamentally about **reconciling different sources of truth**. Each source answers a different question:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FOUR SOURCES OF TRUTH                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │    CODE     │ │    DOCS     │ │    DATA     │ │  JUDGMENT   │   │
│  │  Technical  │ │ Contextual  │ │  Empirical  │ │    Human    │   │
│  │             │ │             │ │             │ │             │   │
│  │ What CAN    │ │ What's      │ │ What IS     │ │ What        │   │
│  │ happen?     │ │ expected?   │ │ happening?  │ │ SHOULD?     │   │
│  │             │ │             │ │             │ │             │   │
│  │ • APIs      │ │ • Strategy  │ │ • Metrics   │ │ • Intuition │   │
│  │ • Contracts │ │ • RFCs      │ │ • Analytics │ │ • Values    │   │
│  │ • Implement │ │ • Handovers │ │ • A/B tests │ │ • Experience│   │
│  │ • Patterns  │ │ • Context   │ │ • Research  │ │ • Priorities│   │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘   │
│         │               │               │               │          │
│         └───────────────┴───────┬───────┴───────────────┘          │
│                                 │                                   │
│                    ┌────────────▼────────────┐                      │
│                    │     RECONCILIATION      │                      │
│                    │      (AI + Human)       │                      │
│                    │                         │                      │
│                    │  AI: Explore, analyze,  │                      │
│                    │       spot conflicts    │                      │
│                    │  Human: Judge, decide,  │                      │
│                    │         prioritize      │                      │
│                    └────────────┬────────────┘                      │
│                                 │                                   │
│                    ┌────────────▼────────────┐                      │
│                    │        DECISION         │                      │
│                    │    (Doc, PRD, Plan)     │                      │
│                    └─────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────┘
```

| Source       | Type of Truth | Question Answered     | AI Role                     |
| ------------ | ------------- | --------------------- | --------------------------- |
| **Code**     | Technical     | "What CAN happen?"    | Explore, map capabilities   |
| **Docs**     | Contextual    | "What's EXPECTED?"    | Synthesize, cross-reference |
| **Data**     | Empirical     | "What IS happening?"  | Analyze, find patterns      |
| **Judgment** | Human         | "What SHOULD happen?" | Challenge, structure        |

### Where Conflicts Happen (The Interesting Part)

These sources often **conflict** — which is where PM work gets interesting:

| Conflict        | Example                                   | PM Question             |
| --------------- | ----------------------------------------- | ----------------------- |
| Code ≠ Docs     | "We claim to do X but code shows Y"       | Which is true?          |
| Data ≠ Docs     | "Strategy says X matters, metrics show Y" | Are we measuring right? |
| Code ≠ Data     | "Feature exists but isn't being used"     | Why the gap?            |
| Judgment ≠ Data | "I think X, but data shows Y"             | Am I wrong?             |

**This is where PMs add value** — reconciling these conflicts and making decisions.

### What AI Does Well (By Source)

| Source       | AI Capability                    | Example                                |
| ------------ | -------------------------------- | -------------------------------------- |
| **Code**     | Explore, map, explain            | "What capability does this represent?" |
| **Docs**     | Synthesize, cross-reference      | "What themes emerge from these docs?"  |
| **Data**     | Query, analyze, find patterns    | "What's anomalous in these metrics?"   |
| **Judgment** | Challenge, structure, articulate | "What are the strongest objections?"   |

### What AI Doesn't Do (Human-Only)

| Human Judgment                | Why AI Can't                             |
| ----------------------------- | ---------------------------------------- |
| **Organizational politics**   | Doesn't know the people                  |
| **Taste / Values**            | Can suggest, can't decide                |
| **Prioritization**            | Needs your constraints                   |
| **Stakeholder relationships** | Trust is earned, not computed            |
| **Risk appetite**             | Only you know what you're willing to bet |
| **"This feels wrong"**        | Intuition from experience                |

### The Collaboration Principle

> **PM work is reconciling four sources of truth. AI helps you explore each source faster and spot conflicts between them. Judgment about what SHOULD happen stays human.**

This isn't "AI writes my docs" — it's "AI helps me think more rigorously by surfacing what I might miss."

---

## Part 1.5: The Plugin

As of v2.0, the framework ships as an installable plugin:

```bash
npx pm-ai-partner@latest
```

One command installs 10 agent skills, 4 workflow commands, and 3 automation hooks. The installer supports Claude Code, Cursor, and Codex with both global and local scopes.

### Plugin Architecture

```
plugin/
├── .claude-plugin/plugin.json   # Claude Code manifest
├── skills/                      # 10 agent skills (SKILL.md each)
├── commands/pm/                 # 4 workflow commands
├── hooks/                       # 3 automation hooks
├── bin/install.js               # Interactive installer
└── package.json                 # npm: pm-ai-partner
```

### Workflow Commands

Multi-step workflows for recurring PM tasks — not single prompts:

| Command | What It Does |
|---------|-------------|
| `/pm:plan-week` | Reviews context, sets priorities, flags risks |
| `/pm:write-brief [feature]` | Guided PRD creation with quality checklist |
| `/pm:prep-meeting [topic]` | Meeting prep with talking points, Q&A, and role-play |
| `/pm:audit-codebase [system]` | PM-focused codebase exploration — capabilities, gaps, implications |

### Automation Hooks

Hooks run automatically — no manual invocation needed:

| Hook | Trigger | What It Does |
|------|---------|-------------|
| Quality Gate | Write to `product-catalog/` | Checks doc against quality bar (evidence, clarity, audience) |
| Draft Status | Write to `sandbox/` | Reminds to add status markers |
| Commit Reminder | `git commit` | Prompts to capture lessons in CLAUDE.md |

### Multi-Platform Support

The plugin works across three runtimes:

| Runtime | Skills Location | How It Works |
|---------|----------------|-------------|
| Claude Code | `.claude/skills/` + `.claude-plugin/` | Plugin manifest + skills + commands + hooks |
| Cursor | `~/.cursor/skills/` | Skills with slash command support |
| Codex | `~/.codex/skills/` | Skills for OpenAI's CLI agent |

For the full plugin documentation, see [`plugin/README.md`](../../plugin/README.md).

---

## Part 2: Workspace Architecture

### The Information Hierarchy

A well-organized workspace helps AI understand context. Here's my structure:

```
workspace/
├── CLAUDE.md              # 🧭 Root navigation for AI
├── published/             # 📢 Polished docs for sharing
│   ├── [product-area-1]/
│   ├── [product-area-2]/
│   └── strategy/
├── working/               # 🔬 Personal working space
│   ├── strategy/          # Tier 1: The "What" and "Why"
│   ├── planning/          # Tier 2: The "How" and "When"
│   ├── analysis/          # Tier 3: Evidence and Research
│   ├── context/           # Tier 4: Background and History
│   ├── architecture/      # Technical documentation
│   └── meta/              # Meta-workflows (like this doc)
├── codebase/              # 📱 Source code
└── tools/                 # 🛠️ Internal tools
```

### Two Documentation Spaces

| Space        | Purpose                             | Audience                   | State          |
| ------------ | ----------------------------------- | -------------------------- | -------------- |
| `working/`   | Working drafts, analysis, iteration | Personal                   | In progress    |
| `published/` | Polished, shareable artifacts       | Team, leadership, external | Ready to share |

**The Graduation Flow:**

```
working/ (iterate) → published/ (publish)
```

Ideas start rough in `working/`, get refined with AI assistance, then graduate to `published/` when ready for broader consumption.

### Document Tiers (Read Order)

| Tier  | Folder      | Purpose                           | Audience            | Update Frequency |
| ----- | ----------- | --------------------------------- | ------------------- | ---------------- |
| **1** | `strategy/` | Mission, identity, value          | Leadership, reviews | Quarterly        |
| **2** | `planning/` | Roadmaps, priorities              | Team, manager       | Monthly          |
| **3** | `analysis/` | Audits, stakeholder maps, metrics | Self, team          | As needed        |
| **4** | `context/`  | History, handovers, background    | Onboarding          | Rarely           |

### The CLAUDE.md Pattern

Every significant folder gets a `CLAUDE.md` that tells AI:

1. **What this folder contains**
2. **Where to start reading**
3. **How documents relate**
4. **Key constraints and rules**

This creates **scoped AI contexts** — different levels of the workspace have different AI "personalities."

### Git as AI Memory

Your repo is the persistent layer; chat is ephemeral. **Every meaningful AI session should produce a commit.**

**Why this matters:**

| Benefit | How It Helps |
|---------|--------------|
| **Diffs** | See exactly what AI changed vs. what you wrote |
| **Branches** | Experiment freely without risk |
| **History** | Audit trail of how docs evolved |
| **Rollback** | Revert if AI made things worse |
| **Compound** | Each commit builds on the last; chat disappears |

**The Pattern:**

```
1. Start a branch for exploratory work
2. Commit after each meaningful iteration
3. Use descriptive messages: "Add metrics per AI suggestion"
4. Review the diff before sharing
5. Merge when satisfied, discard if not
```

**Anti-pattern:** Long AI sessions with no commits = lost context, no rollback, invisible changes.

**Pro tip:** The diff is your review tool. Before sharing any AI-assisted doc, look at what actually changed. This is how you maintain ownership.

---

## Part 3: Workflow Patterns

### Pattern 1: Strategic Clarity (The "Identity" Workflow)

**When to use:** Starting a new role, inherited ambiguity, team lacks definition

**Process:**

```
1. ABSORB
   └── Read handovers, history, existing docs
   └── AI: "Summarize the key themes and tensions"

2. AUDIT
   └── Systematic codebase review
   └── AI: "What capabilities exist? What's missing?"
   └── Output: Capability Audit

3. ARTICULATE
   └── Draft identity, boundaries, value proposition
   └── AI: "Help me structure this as a charter"
   └── Output: Team Charter

4. ALIGN
   └── Socialize with stakeholders
   └── AI: "Role-play as a skeptical stakeholder"
   └── Output: Value Narrative
```

**Documents produced:**

- Capability Audit
- Team Charter
- Value Narrative

---

### Pattern 2: Planning Cycle (The "Roadmap" Workflow)

**When to use:** Quarterly planning, sprint planning

**Process:**

```
1. GATHER
   └── Collect asks, commitments, ideas
   └── AI: "Categorize these by type and urgency"

2. FRAME
   └── Define optimization function
   └── AI: "What should we optimize for?"
   └── Output: Operating Guide

3. PRIORITIZE
   └── Score against criteria
   └── AI: "Help me build a scoring rubric"
   └── Output: Planning Doc

4. SEQUENCE
   └── Dependencies, capacity, timing
   └── AI: "What's the critical path?"
   └── Output: Roadmap
```

---

### Pattern 3: Codebase Deep-Dive (The "Reality" Workflow)

**When to use:** Understanding what actually exists, grounding strategy in reality

**Process:**

```
1. EXPLORE
   └── Navigate codebase with AI assistance
   └── "Show me all places where X happens"
   └── "What does this enum represent?"

2. MAP
   └── Create capability → code mapping
   └── AI: "Build a table of capabilities and evidence"

3. GAP
   └── Compare to responsibilities
   └── AI: "What's missing vs our mission?"
   └── Output: Capability Audit

4. PRIORITIZE
   └── Effort estimates, impact assessment
   └── AI: "Help me sequence these gaps"
```

**Key prompt:** "I'm a PM trying to understand what this code actually does, not how it's implemented. Explain the product/business meaning."

---

### Pattern 4: Tool Building (The "Builder" Workflow)

**When to use:** Creating internal tools, prototypes, demos

**Process:**

```
1. SPEC
   └── Define what you need
   └── AI: "Help me write a clear spec"
   └── Output: Initial prompt

2. SCAFFOLD
   └── Generate initial structure
   └── AI: Generate project + data model

3. ITERATE
   └── Refine in steps
   └── AI: "Now add X capability" (Step 2, 3, 4...)

4. POLISH
   └── UX, edge cases, deployment
   └── AI: "Make this production-ready"
```

**Key insight:** Iterative prompts work better than one mega-prompt. Build up complexity step by step.

---

### Pattern 5: Communication Prep (The "Narrative" Workflow)

**When to use:** Performance reviews, stakeholder presentations, important meetings

**Process:**

```
1. BRAIN DUMP
   └── Stream of consciousness about topic
   └── AI: "Help me structure this"

2. STRUCTURE
   └── Framework selection (CAB, SCQA, etc.)
   └── AI: "Organize this using [framework]"

3. EVIDENCE
   └── Connect claims to documents/data
   └── AI: "What evidence supports each point?"

4. ANTICIPATE
   └── Prepare for questions
   └── AI: "Role-play as [skeptical director]"
   └── AI: "What questions would you ask?"
```

---

### Pattern 6: Engineering Questions (The "PM-Eng Bridge" Workflow)

**When to use:** Translating code into product meaning

**Process:**

```
1. SURFACE
   └── Engineers ask technical questions
   └── Document them systematically

2. ANSWER
   └── Provide product context
   └── AI: "Help me explain this decision"
   └── AI: "What's the product rationale for X?"

3. CAPTURE
   └── Build a knowledge base
   └── Output: Engineering Questions doc

4. PATTERN
   └── Look for repeated themes
   └── AI: "What themes emerge from these questions?"
```

---

## Part 4: Agent Modes

Different tasks need different Claude "personalities." I mentally switch between:

### Mode 1: Technical Analyst Agent

**Purpose:** Codebase exploration, capability audits, gap analysis

**Characteristics:**

- Rigorous, systematic
- Asks "what evidence supports this?"
- Builds tables and mappings
- Skeptical of assumptions

**Sample prompt prefix:**

> "Act as a rigorous analyst. I need you to examine [X] and build a systematic assessment. Question my assumptions."

---

### Mode 2: Writer Agent

**Purpose:** Strategy docs, narratives, communication

**Characteristics:**

- Clear, structured prose
- Audience-aware framing
- Connects ideas to evidence
- Iterates on drafts

**Sample prompt prefix:**

> "Help me write a clear [document type] for [audience]. The key message is [X]. I'll provide rough notes and you'll help structure them."

---

### Mode 3: Devil's Advocate Agent

**Purpose:** Stress-testing ideas, preparing for pushback

**Characteristics:**

- Constructively critical
- Finds weaknesses
- Role-plays skeptics
- Suggests counter-arguments

**Sample prompt prefix:**

> "I want you to challenge this idea. Role-play as a skeptical [director/engineer/PM]. What are the strongest objections?"

---

### Mode 4: Builder Agent

**Purpose:** Creating tools, prototypes, code

**Characteristics:**

- Technical, practical
- Iterative (build → refine → extend)
- Focuses on working software
- Understands constraints

**Sample prompt prefix:**

> "I want to build [X]. Here's the spec: [detailed requirements]. Generate the scaffold, then we'll iterate."

---

### Mode 5: Thought Partner Agent

**Purpose:** Brainstorming, ideation, exploration

**Characteristics:**

- Open-ended
- Generates options
- Explores implications
- Doesn't judge prematurely

**Sample prompt prefix:**

> "I'm thinking about [X]. Help me explore the space. What are the different ways to think about this? What am I not considering?"

---

### Mode 6: Data Analyst Agent

**Purpose:** Metrics exploration, insight generation, hypothesis testing

**Characteristics:**

- Quantitative focus
- Pattern-finding
- Hypothesis generation
- Connects data to decisions

**Sample prompt prefix:**

> "I have this data: [metrics/results]. Help me identify patterns, generate hypotheses for what's happening, and suggest what to investigate next."

**Data-specific prompts:**

```
# Writing queries
"I need to understand [X]. Help me write a SQL query
to get [specific metrics]."

# Interpreting results
"Here are the results: [data]. What patterns do you see?
What's surprising? What questions does this raise?"

# Connecting to strategy
"This data shows [finding]. How does this relate to our
strategy of [X]? What should we do differently?"
```

---

## Part 5: Tool Selection — Cursor vs CLI

### Two Ways to Work with Claude

| Aspect              | **Cursor/IDE Agent**               | **Claude Code CLI**             |
| ------------------- | ---------------------------------- | ------------------------------- |
| **Best for**        | Interactive, iterative work        | Autonomous, multi-step tasks    |
| **Context**         | Sees open files, cursor, workspace | You define context explicitly   |
| **Workflow**        | "Let's figure this out together"   | "Go do this thing"              |
| **Scope**           | Best within one workspace          | Can span multiple repos         |
| **Feedback**        | Real-time back-and-forth           | Runs to completion, then review |
| **IDE integration** | Full (edits, lints, navigation)    | None (pure terminal)            |

### When to Use Each

**Use IDE Agent when:**

- Iterating on ideas, exploring options
- Working with open files in context
- Need real-time feedback and steering
- Building something incrementally
- Want to approve each change

**Use Claude Code CLI when:**

- Task is well-defined and autonomous
- Spanning multiple repos or directories
- Batch operations (rename, format, migrate)
- You trust it to run without supervision
- Want to script or chain commands

### Delegation Triggers

IDE Agent should suggest CLI when:

| Trigger                   | Example                           | CLI Command                             |
| ------------------------- | --------------------------------- | --------------------------------------- |
| **Bulk file operations**  | "Rename across 20 files"          | `claude "rename X to Y in src/"`        |
| **Cross-repo work**       | "Find all uses of API in 3 repos" | `claude "search for X in ~/projects/*"` |
| **Well-defined refactor** | "Update all imports to new path"  | `claude "migrate imports from A to B"`  |
| **Autonomous generation** | "Generate docs for all endpoints" | `claude "create API docs for backend/"` |
| **Batch formatting**      | "Fix all markdown tables"         | `claude "format tables in docs/"`       |

---

## Part 6: Templates & Repeatable Tasks

### Template: Weekly Planning Review

```markdown
## Context

- Current priorities: [link to planning doc]
- Open questions: [list]

## This Week

### What I accomplished

- [list]

### What's blocked

- [list]

### What I learned

- [list]

## Next Week

### Must do

- [list]

### Should do

- [list]

## Questions for AI

- [specific questions to explore]
```

---

### Template: Capability Audit Entry

```markdown
## [Capability Name]

**Pillar:** [which responsibility pillar]

### Status

- [ ] ✅ Exists — [evidence]
- [ ] ⚠️ Partial — [what's missing]
- [ ] ❌ Missing — [why it matters]

### Evidence

- File: `[path]`
- Key code: `[snippet]`

### Gap Description

[What's missing, why it matters]

### Effort Estimate

[T-shirt size + rationale]
```

---

### Template: PRD Section

```markdown
## [Feature/Initiative Name]

### Problem Statement

> One sentence: what problem does this solve?

### Context

- Links to strategy docs
- Why now?

### Proposed Solution

[Description]

### Success Metrics

| Metric | Baseline | Target |
| ------ | -------- | ------ |

### Risks & Mitigations

| Risk | Mitigation |
| ---- | ---------- |

### Open Questions

- [ ] [question]
```

---

### Template: Stakeholder Conversation Prep

```markdown
## Meeting: [Person], [Date]

### Their Context

- Role: [X]
- What they care about: [Y]
- Recent interactions: [Z]

### My Goals

1. [outcome I want]
2. [outcome I want]

### Key Messages

1. [message]
2. [message]

### Questions to Ask

1. [question]

### Anticipated Pushback

| They might say | My response |
| -------------- | ----------- |

### Post-Meeting Notes

[fill after meeting]
```

---

## Part 7: The Meta-Workflow

### How I Work With This System

```
Morning:
├── Review open threads and docs
├── Identify 1-2 focus areas
└── Set context for AI ("Today I'm working on X")

Working Session:
├── Open relevant docs in IDE
├── AI has context via CLAUDE.md files
├── Iterate: draft → AI feedback → refine
└── Save artifacts to appropriate folder

End of Day:
├── Update any living docs
├── Capture open questions
└── Note what worked / didn't
```

### Iteration Principle

> **First draft is for me. Second draft is for sharing. Third draft is for presenting.**

AI helps accelerate each stage, but I still own the judgment calls.

---

## Part 8: Sharing This Work

### Who This Might Help

- PMs joining platform/infrastructure teams
- Anyone dealing with "what does this team actually do?"
- Tool builders wanting to prototype quickly
- PMs who want to be more rigorous with AI

### Angles That Resonate

1. **"Platform PM clarity problem"** — How I defined a team that lacked identity
2. **"Codebase as product truth"** — Grounding strategy in implementation reality
3. **"AI as thinking partner, not writer"** — The collaboration model
4. **"Workspace architecture for AI"** — CLAUDE.md pattern, document hierarchy

### Formats

- **Blog post:** Single workflow pattern deep-dive
- **Talk:** Full framework with examples
- **Template repo:** This repository

---

## Appendix: My Setup

### Tools

| Tool | Purpose | Required? |
|------|---------|-----------|
| **Cursor IDE** | Primary interface — code exploration, doc writing, iteration | Yes |
| **Claude in Cursor** | AI partner for all workflows | Yes |
| **MCP: BigQuery / SQL** | Query metrics directly from chat | Recommended |
| **MCP: Google Drive** | Pull context from team docs | Recommended |
| **MCP: Code Search** | Search across repos | Recommended |
| **Claude CLI** | Autonomous multi-step tasks | Optional |

### Workspace Structure

I keep relevant repos checked out locally so Cursor can index and search them:

```
~/Developer/my-project/
├── backend/          # Codebase — Cursor indexes for semantic search
├── client/           # Codebase
├── documentation/    # Team docs
├── sandbox/          # My working space (drafts, analysis, planning)
└── product-catalog/  # Polished artifacts for team sharing
```

### Why Local Repos?

| Benefit | How It Helps |
|---------|--------------|
| **Cursor indexing** | Semantic search across code and docs |
| **Direct editing** | AI can create/update files in place |
| **Git tracking** | Version history of AI-assisted work |
| **CLAUDE.md context** | Scoped AI guidance per folder |

You don't *need* local repos — Code Search MCP can find code remotely. But local checkout enables the full edit-and-version workflow.

### How It Connects

```
┌─────────────────────────────────────────────────────────────┐
│                        CURSOR IDE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Local Workspace          MCP Tools (External)              │
│   ┌─────────────┐         ┌─────────────────────┐           │
│   │ Codebase    │         │ BigQuery / SQL      │           │
│   │ Docs        │         │ Google Drive        │           │
│   │ sandbox/    │         │ Code Search         │           │
│   │ CLAUDE.md   │         │                     │           │
│   └─────────────┘         └─────────────────────┘           │
│         │                          │                         │
│         └──────────┬───────────────┘                         │
│                    ▼                                         │
│              Claude (AI)                                     │
│     Sees code + docs + can query data + search repos         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Document Governance

| Version | Date       | Changes                |
| ------- | ---------- | ---------------------- |
| 1.0     | 2026-01-12 | Initial public release |
| 1.5     | 2026-01-23 | Added Problem section, Git as AI Memory, Setup appendix |
| 2.0     | 2026-03-09 | Plugin architecture, npm package, 4 commands, 3 hooks, multi-platform |

---

_This document describes how I work. It will evolve as I learn what's effective._
