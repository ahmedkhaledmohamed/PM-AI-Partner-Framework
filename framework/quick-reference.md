# Quick Reference: AI-Augmented PM

One-page cheat sheet for daily use.

---

## The Principle

> **I provide direction, constraints, and judgment.**  
> **AI provides structure, completeness, and articulation.**

---

## Agent Modes

| Need | Mode | Start With |
|------|------|------------|
| Understand code | **Analyst** | "Examine [X] systematically. Build a capability table." |
| Write docs | **Writer** | "Help me write a [doc type] for [audience]. Key message: [X]" |
| Test ideas | **Devil's Advocate** | "Challenge this. Role-play as a skeptical [person]." |
| Build tools | **Builder** | "Build [X] with this spec: [requirements]" |
| Explore | **Thought Partner** | "Help me explore [space]. What am I not considering?" |

---

## Workflow Triggers

| Situation | Workflow | Output |
|-----------|----------|--------|
| "What does this team do?" | Strategic Clarity | Charter, Value Narrative |
| "What should we build?" | Planning Cycle | Roadmap, Operating Guide |
| "What actually exists?" | Codebase Deep-Dive | Capability Audit |
| "I need a tool for X" | Tool Building | Working prototype |
| "I have a big meeting" | Communication Prep | Talk structure, Q&A prep |
| "Engineers keep asking about X" | PM-Eng Bridge | Engineering Questions doc |

---

## Document Tiers

| Tier | Folder | What Goes Here | Update Frequency |
|------|--------|----------------|------------------|
| 1 | `strategy/` | Mission, charter, value | Quarterly |
| 2 | `planning/` | Roadmaps, priorities | Monthly |
| 3 | `analysis/` | Audits, research | As needed |
| 4 | `context/` | History, handovers | Rarely |

---

## Key Prompts

### Starting a Strategy Doc

```
I need to write a [charter/narrative/plan] for [audience].

Context:
- We are: [team description]
- The problem: [what's unclear]
- The goal: [what this doc should accomplish]

Here are my rough notes: [paste notes]

Help me structure this clearly.
```

### Codebase Understanding

```
I'm a PM trying to understand this code's product meaning, not implementation details.

Code: [paste or reference]

Questions:
1. What capability does this represent?
2. What business rule does this encode?
3. What's missing that a user might expect?
```

### Stress-Testing an Idea

```
I want to propose [X].

My argument: [summary]

Role-play as a skeptical [director/engineer/peer PM].
What are the strongest objections?
What questions would you ask?
```

### Preparing for a Meeting

```
I'm meeting with [person], [role] on [topic].

What I want to accomplish:
1. [goal]
2. [goal]

What they care about: [context]

Help me:
1. Structure my key messages
2. Anticipate their questions
3. Prepare responses to pushback
```

---

## Quality Checks

Before sharing any AI-assisted doc, verify:

- [ ] **Accuracy** — Claims match reality (code, data)
- [ ] **Ownership** — I can defend every sentence
- [ ] **Voice** — Sounds like me, not generic AI
- [ ] **Evidence** — Key claims have links/references
- [ ] **Audience** — Appropriate for who will read it

---

## Anti-Patterns to Avoid

| ❌ Don't | ✅ Do Instead |
|----------|---------------|
| "Write me a strategy doc" | Provide direction, let AI structure |
| Accept first draft | Iterate at least once |
| Skip human review | Own every word you share |
| Use AI for judgment calls | AI suggests, you decide |
| Let AI make up facts | Ground in codebase/docs |

---

## Daily Rhythm

```
Morning:
├── Set context: "Today I'm working on [X]"
├── Open relevant docs
└── Identify 1-2 focus areas

Working:
├── Iterate: draft → AI feedback → refine
├── Save to appropriate folder
└── Link to related docs

End of day:
├── Update living docs if needed
├── Capture open questions
└── Note what worked
```

---

_Full framework: [`ai-augmented-pm-framework.md`](ai-augmented-pm-framework.md)_

