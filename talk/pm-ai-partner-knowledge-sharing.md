# Knowledge Sharing: AI as a PM Thinking Partner

## How I Use Claude to Think More Rigorously

**Author:** Ahmed Khaled  
**Role:** Product Manager, Client Messaging @ Spotify  
**Format:** 30-45 minute talk + Q&A  
**Audience:** PMs, tech leads, anyone interested in AI-augmented workflows

---

## Hook (2 min)

### The Setup

> "Four months ago, I inherited a platform team navigating an identity crisis. The engineering was strong, but nobody could articulate what made us different from three adjacent teams. I had to build clarity fast — while also shipping a roadmap."

### The Reveal

> "I didn't do it alone. I built a system for thinking with AI that helped me audit 50,000+ lines of code, produce 15+ strategy documents, and build an internal tool — all while delivering on commitments."

### The Promise

> "This talk is about how product managers can use AI not to replace thinking, but to think more rigorously."

---

## Part 1: The Problem (5 min)

### Platform PM Challenges

1. **Scope is unclear** — "What do we actually own?"
2. **Reality is in code** — Strategy disconnected from implementation
3. **Communication is constant** — Same questions, different audiences
4. **Time is scarce** — Operational demands crowd out strategic work

### The Traditional Approach

- Read docs → form opinions → write more docs
- Hope you haven't missed something
- Iterate slowly through review cycles

### What's Different Now

- AI can process and synthesize at scale
- But: AI doesn't know your organization, your judgment, your constraints
- **The gap:** How do you collaborate effectively?

---

## Part 2: The Framework (10 min)

### Four Sources of Truth

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
                    │     (AI + Human)    │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │      DECISION       │
                    └─────────────────────┘
```

### The Principle

> "PM work is reconciling four sources of truth. AI helps you explore each faster and spot conflicts. Judgment stays human."

### What AI Does Well (By Source)

| Source | AI Capability | Example |
| ------ | ------------- | ------- |
| **Code** | Explore, map | "What capability does this represent?" |
| **Docs** | Synthesize | "What themes emerge from these docs?" |
| **Data** | Analyze, pattern-find | "What's anomalous in these metrics?" |
| **Judgment** | Challenge, structure | "What are the strongest objections?" |

### What AI Doesn't Do

| Human-only | Why |
|------------|-----|
| Organizational politics | Doesn't know the people |
| Prioritization | Needs your constraints |
| Taste / Values | Can suggest, can't decide |
| "This feels wrong" | Experience-based intuition |

---

## Part 3: The System (10 min)

### Agent Modes

**Show the six modes:**

1. **Analyst** — Audits, systematic assessment (Code)
2. **Writer** — Strategy docs, narratives (Docs)
3. **Devil's Advocate** — Challenge ideas (Judgment)
4. **Builder** — Create tools, prototypes
5. **Thought Partner** — Explore options
6. **Data Analyst** — Metrics, insights, patterns (Data)

**Key insight:** Same AI, different prompts = different collaboration. Each mode excels at exploring different sources of truth.

### Workflow Patterns

**Walk through one example:**

**Strategic Clarity Workflow:**

1. ABSORB — Read context, AI synthesizes themes
2. AUDIT — Explore code, AI maps capabilities
3. ARTICULATE — Draft identity, AI structures
4. ALIGN — Prepare for pushback, AI role-plays skeptics

### The Workspace Architecture

```
workspace/
├── strategy/      # Tier 1: "What" and "Why"
├── planning/      # Tier 2: "How" and "When"
├── analysis/      # Tier 3: Evidence
├── context/       # Tier 4: Background
└── meta/          # How I work
```

**Key innovation:** `CLAUDE.md` files create scoped AI contexts

---

## Part 4: Examples (8 min)

### Example 1: Capability Audit

**The task:** Understand what my platform team actually owns

**The process:**

- Explored 5 major codebases
- AI helped map capabilities to code files
- Built systematic audit document

**The output:** 240-line capability audit with evidence links

**Key prompt:**

> "I'm a PM trying to understand this code's product meaning, not implementation. What capability does this represent?"

### Example 2: Building a Tool

**The task:** Create an internal catalog tool

**The process:**

- Wrote detailed spec with data model
- 7 iterative prompts, each building on previous
- Days instead of weeks

**The output:** Working Next.js app deployed internally

**Key insight:** Iterative prompts > monolithic asks

### Example 3: Presentation Prep

**The task:** Prepare for performance review conversation

**The process:**

- Brain dump of 4 months' work
- AI structured using CAB framework
- Role-played director's questions

**The output:** 290-line preparation document

**Key prompt:**

> "Role-play as a skeptical director. What questions would you ask about this strategy?"

---

## Part 5: Anti-Patterns & Lessons (5 min)

### What Doesn't Work

| ❌ Anti-Pattern | Why It Fails |
|----------------|--------------|
| "Write me a strategy" | No direction = generic output |
| Accept first draft | Always needs human refinement |
| Skip codebase grounding | Strategy disconnected from reality |
| Use AI for judgment | Can't know your context |
| One mega-prompt | Iterative works better |

### What I Learned

1. **AI amplifies preparation** — Garbage in, garbage out
2. **Iteration > perfection** — Draft fast, refine with AI
3. **Structure enables speed** — CLAUDE.md pays off
4. **Judgment stays human** — AI suggests, you decide
5. **Document the meta** — How you work evolves too

---

## Closing (2 min)

### The Shift

> "AI hasn't changed _what_ PMs do. It's changed _how fast_ we can think rigorously about complex problems."

### The Invitation

> "I've open-sourced my framework. Try one workflow. See if it helps you think better."

### The Call to Action

1. Pick one messy problem
2. Choose an agent mode
3. Iterate with AI
4. Own the output

---

## Q&A Preparation

### Likely Questions

**"Isn't this just having AI write your work?"**

> "No — I provide direction, constraints, and judgment. AI helps structure and articulate. I own every word I share."

**"How do you avoid generic AI outputs?"**

> "By providing rich context: real code, real constraints, real organizational knowledge. The CLAUDE.md files help."

**"What about sensitive information?"**

> "I work with local models when needed. The workspace is private. Judgment about what to share stays human."

**"How much time does this save?"**

> "Hard to quantify. The capability audit would have taken weeks manually. The tool would have taken much longer. But time isn't the point — rigor is."

**"What's the learning curve?"**

> "A few days to get effective. A few weeks to develop your own patterns. The framework helps accelerate."

---

## Lightning Talk Version (10 min)

### Condensed Structure

1. **Hook** (1 min) — The problem: platform PM clarity
2. **Framework** (3 min) — Knowledge mixing model, one principle
3. **Example** (4 min) — Capability audit walkthrough
4. **Takeaway** (2 min) — Anti-patterns, invitation

### Key Slides

1. The knowledge mixing diagram
2. Agent modes table
3. Before/after: messy notes → structured audit
4. One key prompt example

---

## Slide Suggestions

| Slide | Content |
|-------|---------|
| 1 | Title + hook |
| 2 | Knowledge mixing diagram |
| 3 | "I provide direction, AI provides structure" |
| 4 | Agent modes table |
| 5 | Workflow phases (one example) |
| 6 | Before: messy notes |
| 7 | After: structured document |
| 8 | Key prompt example |
| 9 | Anti-patterns table |
| 10 | "Try one workflow" CTA |

---

## Resources

| Resource | Link |
|----------|------|
| Full framework | [GitHub](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework) |
| Quick reference | `framework/quick-reference.md` |
| Workflow templates | `workflows/` |

---

_Last updated: January 2026_

