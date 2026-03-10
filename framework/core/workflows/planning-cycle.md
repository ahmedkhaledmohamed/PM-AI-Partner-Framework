# Workflow: Planning Cycle

**When to use:** Quarterly planning, sprint planning, roadmap prioritization

**Time:** 1-2 weeks (quarterly) or 1-2 days (sprint)

**Output:** Prioritized roadmap, sprint commitments, stakeholder alignment

---

## Overview

```
┌─────────┐    ┌────────────┐    ┌──────────┐    ┌─────────────┐
│ REVIEW  │ →  │ PRIORITIZE │ →  │  COMMIT  │ →  │ COMMUNICATE │
│         │    │            │    │          │    │             │
│ Reality │    │ Trade-offs │    │ Capacity │    │  Alignment  │
└─────────┘    └────────────┘    └──────────┘    └─────────────┘
```

---

## Philosophy

Planning fails when it starts with a wishlist. It succeeds when it starts with reality — what actually shipped last cycle, what's in flight, what's blocking, and what's changed in the world since the last plan.

Key principles:

1. **Audit before you plan** — Last quarter's results constrain this quarter's ambitions
2. **Prioritize by cost of delay** — Not "what's most valuable" but "what gets more expensive if we wait"
3. **Commit to less than capacity** — Leave 20-30% for unplanned work. Teams that plan to 100% deliver at 60%
4. **Communicate the "why not"** — Stakeholders care less about what you're doing and more about why their request didn't make the cut

---

## Phase 1: REVIEW (Days 1-3)

### Goal

Understand what actually happened before planning what's next.

### Activities

- Audit last cycle's commitments vs. actuals
- Identify what shipped, what slipped, what was cut
- Gather post-launch metrics for shipped features
- Collect team feedback on process and blockers

### AI Assistance

**Prompt: Cycle Retrospective**

```
Here's what we committed to last quarter:
[list commitments]

Here's what actually shipped:
[list shipped items]

Help me:
1. Calculate our commitment accuracy (shipped / committed)
2. Identify patterns in what slipped (dependencies? scope creep? estimation?)
3. Surface lessons for this cycle's planning
```

**Prompt: Metrics Review**

```
These features shipped last quarter:
[list features with metrics]

Help me assess:
1. Which features hit their success metrics?
2. Which underperformed and why?
3. What follow-up work is needed?
```

### Outputs

- [ ] Last cycle scorecard (committed vs. delivered)
- [ ] Metric results for shipped features
- [ ] Lessons learned document
- [ ] Carryover items identified

---

## Phase 2: PRIORITIZE (Days 3-5)

### Goal

Decide what matters most given current reality, not just what people want.

### Activities

- Collect inputs (user feedback, data insights, stakeholder requests, tech debt)
- Apply prioritization framework
- Identify dependencies and blockers
- Make explicit trade-offs

### AI Assistance

**Prompt: Input Synthesis**

```
Here are the inputs for this quarter's planning:
- User feedback: [themes]
- Data insights: [key findings]
- Stakeholder requests: [list]
- Tech debt: [items]
- Carryover: [from last quarter]

Help me:
1. Group these into themes
2. Identify conflicts (e.g., stakeholder wants X but data says Y)
3. Flag items that are urgent vs. important
```

**Prompt: Cost-of-Delay Analysis**

```
I'm choosing between these initiatives:
1. [Initiative A] — [description]
2. [Initiative B] — [description]
3. [Initiative C] — [description]

For each, help me assess:
- What happens if we delay 1 quarter?
- Is the opportunity time-sensitive?
- Does delay increase implementation cost?
- Are there dependencies that get worse with time?
```

**Prompt: Trade-off Framing**

```
I can only do 2 of these 4 things this quarter:
[list items]

Help me:
1. Frame the trade-offs clearly
2. Identify what we lose with each "no"
3. Draft a "Why not" explanation for items we cut
```

### Outputs

- [ ] Prioritized initiative list with rationale
- [ ] Trade-off decisions documented
- [ ] "Why not" explanations for deprioritized items

---

## Phase 3: COMMIT (Days 5-7)

### Goal

Match ambition to capacity with honest scoping.

### Activities

- Estimate effort with engineering
- Map initiatives to team capacity (including buffer)
- Define success criteria for each commitment
- Identify risks and mitigations

### AI Assistance

**Prompt: Capacity Planning**

```
Team capacity this quarter:
- [N] engineers, [N] designers
- Known absences: [list]
- Ongoing maintenance: ~[X]% of capacity
- Buffer for unplanned: [X]%

Proposed initiatives:
[list with eng estimates]

Help me:
1. Check if this fits within capacity
2. Identify overcommitment risks
3. Suggest what to cut or phase if over capacity
```

**Prompt: Success Criteria Definition**

```
For each initiative, help me define:
1. A primary metric with a target
2. A guardrail metric (what shouldn't get worse)
3. A "ship date" that's a date, not a quarter
4. A "done" definition that's testable
```

### Outputs

- [ ] Quarterly commitments with capacity math
- [ ] Success criteria per initiative
- [ ] Risk register with mitigations
- [ ] Buffer allocation documented

---

## Phase 4: COMMUNICATE (Days 7-10)

### Goal

Get buy-in by explaining decisions, not just announcing them.

### Activities

- Draft the quarterly plan document
- Prepare stakeholder-specific versions
- Address "why not" for deprioritized requests
- Align with manager before broader sharing

### AI Assistance

**Prompt: Quarterly Plan Document**

```
Here's our quarterly plan:
[commitments, rationale, metrics, risks]

Help me structure this as a one-page plan with:
1. Theme (what's the narrative for this quarter?)
2. Top 3 commitments with success criteria
3. What we're NOT doing and why
4. Key risks and mitigations
5. How we'll track progress
```

**Prompt: Stakeholder "Why Not" Messages**

```
These stakeholders requested items we deprioritized:
- [Stakeholder A] wanted [X]
- [Stakeholder B] wanted [Y]

Help me draft respectful, honest responses that:
1. Acknowledge the request's value
2. Explain what we chose instead and why
3. Offer a timeline or alternative
4. Keep the relationship intact
```

### Outputs

- [ ] Quarterly plan document (1-2 pages)
- [ ] Manager alignment confirmed
- [ ] Stakeholder communications sent
- [ ] Plan shared with team

---

## Document Checklist

| Document | Location | Status |
|----------|----------|--------|
| Last cycle scorecard | `analysis/` | [ ] |
| Prioritization rationale | `strategy/` | [ ] |
| Quarterly plan | `strategy/` | [ ] |
| Stakeholder responses | `comms/` | [ ] |

---

## Success Criteria

- [ ] Last quarter's results are documented honestly (not just wins)
- [ ] Every commitment has a success metric and ship date
- [ ] Capacity math shows 20-30% buffer
- [ ] Deprioritized items have "why not" explanations
- [ ] Manager and key stakeholders are aligned before team announcement

---

_Related: [Stakeholder Update Skill](../../templates/skills/stakeholder-update/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
