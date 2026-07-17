# Workflow: Model Routing

**When to use:** Choosing the right model for a PM task, optimizing AI costs, setting up multi-model workflows

**Time:** Reference guide (consult as needed)

**Output:** Informed model selection per task type

---

## Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  FABLE   │    │  OPUS    │    │  SONNET  │    │  HAIKU   │
│          │    │          │    │          │    │          │
│ Strategic│    │  Daily   │    │   Bulk   │    │  Search  │
│ Thinking │    │   Work   │    │ Mechanic │    │  Explore │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     ▲               ▲               ▲               ▲
     │               │               │               │
  Complex        Standard         Volume          Speed
  Reasoning       Tasks           Work           Critical
```

---

## Philosophy

Not every task needs the most powerful model. Most PM work falls into patterns — a meeting prep doesn't need the same reasoning depth as a strategic analysis. Matching model tier to task complexity gets 90% of the benefit of a sophisticated routing system with zero infrastructure.

Key principles:

1. **You are the router** — In interactive sessions, you already know whether you're about to do strategy or formatting
2. **Default to the middle** — Opus handles 80% of PM tasks well; escalate and de-escalate from there
3. **Speed vs. depth is the real tradeoff** — Fable thinks deeper but slower; Haiku is fast but shallow
4. **Cost follows naturally** — When you match model to task, cost optimization is a side effect

---

## Model Tiers

| Tier | Model | Strength | Cost (per 1M tokens) | When to Use |
|------|-------|----------|---------------------|-------------|
| **Tier 1** | Fable 5 | Deep reasoning, multi-step synthesis, novel problems | $10 in / $50 out | Strategic analysis, complex writing, architecture decisions, devil's advocate |
| **Tier 2** | Opus 4 | Balanced reasoning + execution, reliable tool use | $6 in / $30 out | Daily default — product briefs, meeting prep, code analysis, most PM work |
| **Tier 3** | Sonnet 4 | Fast execution, good at well-patterned tasks | $3 in / $15 out | Bulk edits, formatting, SQL generation, boilerplate, routine writing |
| **Tier 4** | Haiku 4.5 | Speed, exploration, extraction | $0.80 in / $4 out | Codebase search, quick lookups, data extraction, triage |

**Note:** Pricing changes over time. The relative tiers (Fable > Opus > Sonnet > Haiku) remain stable even as absolute prices shift.

---

## Task-to-Model Mapping

### Strategic Work → Fable

| Task | Why Fable |
|------|-----------|
| Strategic clarity / team charter | Requires reasoning across multiple stakeholder perspectives |
| Devil's advocate review | Genuine counterargument needs deep reasoning, not pattern matching |
| Complex competitive analysis | Novel market dynamics, not just filling in a template |
| Architecture decisions | Multi-dimensional tradeoffs with long-term consequences |
| Cross-functional synthesis | Combining technical, business, and user perspectives into coherent strategy |

### Daily PM Work → Opus (Default)

| Task | Why Opus |
|------|----------|
| Product briefs and PRDs | Needs good writing + structured thinking, but well-patterned |
| Meeting prep | Contextual synthesis, moderate complexity |
| Technical analysis | Code understanding + PM translation |
| Thinking trail generation | Prompt synthesis needs nuanced reading |
| Hypothesis design | Statistical reasoning + product context |
| Stakeholder updates | Needs judgment about what to include/exclude |

### Volume Work → Sonnet

| Task | Why Sonnet |
|------|-----------|
| Bulk document formatting | Mechanical transformation, no reasoning needed |
| SQL query generation | Well-patterned, deterministic output |
| Data extraction and cleaning | Pattern matching, not reasoning |
| Boilerplate generation | Templates, not original thinking |
| Simple status updates | Filling in known information |
| Routine edits across many files | Repetitive, well-defined changes |

### Speed-Critical → Haiku

| Task | Why Haiku |
|------|-----------|
| Codebase search and exploration | Needs speed, not depth |
| Quick fact lookups | Single-turn retrieval |
| Triage and categorization | Classification, not reasoning |
| Initial data profiling | Summarize before deep analysis |
| File listing and navigation | Mechanical exploration |

---

## Switching Models in Claude Code

```bash
# Switch model for current session
/model                    # Interactive model picker

# Use fast mode (same model, faster output)
/fast                     # Toggle fast mode on/off

# Start a session with a specific model
claude --model claude-fable-5
claude --model claude-opus-4-6
claude --model claude-sonnet-4-6
```

---

## Cost Optimization Strategies

### The 10-80-10 Rule

Use Fable for the first 10% (problem framing, strategy), Opus for 80% (execution, implementation), and Fable again for final 10% (review, critique). This concentrates expensive reasoning where it has the most leverage.

```
Session 1 (Fable): "Help me think through the approach for..."
Session 2 (Opus):  "Implement the plan we discussed..."
Session 3 (Fable): "Review what we built — what did we miss?"
```

### Cascading

Start with the cheapest viable model and escalate only when quality is insufficient:

1. Try Haiku for exploration and scoping
2. Use Sonnet for well-defined execution
3. Escalate to Opus when reasoning quality matters
4. Reserve Fable for genuinely hard problems

**Result:** 60-85% cost reduction while maintaining 95% quality for most tasks.

### /fast Mode

Opus fast mode gives you the same model with faster output. Use it for:
- Exploration and navigation
- Simple edits and formatting
- Running familiar commands
- Tasks where speed matters more than depth

**Don't use /fast for:** Strategic analysis, nuanced writing, complex multi-step reasoning.

### Session Reuse

Long context windows are expensive. Instead of re-sending large documents:
- Reuse the current session when the context is already loaded
- Reference previous output by description, not by re-pasting
- Use `/compact` to compress context when sessions get long

---

## Common Mistakes

| Mistake | Why It's Wrong | Better Approach |
|---------|---------------|-----------------|
| Using Fable for everything | Expensive and slow for routine tasks | Reserve for genuinely complex reasoning |
| Using Haiku for complex reasoning | Produces shallow or incorrect analysis | Escalate to Opus or Fable |
| Never using /fast | Wastes time on trivial tasks | Toggle /fast for exploration and simple edits |
| Re-sending full context every message | Multiplies token cost | Use session continuity, reference previous output |
| Choosing model by habit | Same model regardless of task type | Match model tier to task complexity |
| Over-rotating on cost | Choosing Haiku for everything to save money | A bad analysis costs more than the model difference |
| Building a router | Infrastructure overhead for interactive use | You are the router — just switch models |

---

## Decision Flowchart

```
Is this a novel, complex problem requiring deep reasoning?
├── Yes → Fable
└── No
    ├── Is this standard PM work requiring judgment?
    │   ├── Yes → Opus (default)
    │   └── No
    │       ├── Is this repetitive/mechanical work?
    │       │   ├── Yes → Sonnet
    │       │   └── No → Is speed critical?
    │       │       ├── Yes → Haiku
    │       │       └── No → Opus (default)
    └── Unsure → Start with Opus, escalate if quality is insufficient
```

---

## Output Checklist

- [ ] Task type identified (strategic / standard / bulk / search)
- [ ] Model matched to task complexity
- [ ] /fast mode considered for simple tasks
- [ ] Session reuse preferred over new sessions with re-sent context

---

_Related: [Thought Partner Skill](../../templates/skills/thought-partner/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
