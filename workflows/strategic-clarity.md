# Workflow: Strategic Clarity

**When to use:** Starting a new role, inherited ambiguity, team lacks clear identity

**Time:** 2-4 weeks (part-time)

**Output:** Team identity, boundaries, value proposition

---

## Overview

```
┌─────────┐    ┌─────────┐    ┌───────────┐    ┌─────────┐
│ ABSORB  │ → │  AUDIT  │ → │ ARTICULATE│ →  │  ALIGN  │
│         │    │         │    │           │    │         │
│ Context │    │ Reality │    │ Identity  │    │ Buy-in  │
└─────────┘    └─────────┘    └───────────┘    └─────────┘
```

---

## Phase 1: ABSORB (Week 1)

### Goal

Understand what exists before forming opinions.

### Activities

- Read all existing documentation
- Meet with team members
- Study handover notes
- Review historical decisions

### AI Assistance

**Prompt: Synthesize Context**

```
I've inherited a team called [X]. Here's what I've learned so far:

[Paste notes from meetings, docs, handovers]

Help me:
1. Identify the key themes
2. Surface tensions or contradictions
3. List what's still unclear
```

**Prompt: Question Generation**

```
Based on this context, what questions should I be asking?
Who should I talk to to get answers?
```

### Outputs

- [ ] Reading notes captured
- [ ] Key questions documented
- [ ] Initial mental model forming

---

## Phase 2: AUDIT (Week 2)

### Goal

Understand what actually exists vs. what's claimed.

### Activities

- Systematic codebase review
- Map capabilities to code
- Identify gaps
- Compare reality to documentation

### AI Assistance

**Prompt: Capability Mapping**

```
I'm auditing [team]'s capabilities. Our claimed responsibilities are:
1. [responsibility]
2. [responsibility]
...

Help me build an audit template with:
- Capability name
- Status (exists/partial/missing)
- Evidence (code files/patterns)
- Gap description
- Impact
```

**Prompt: Codebase Exploration**

```
I'm looking at [codebase/file].

Help me understand:
1. What product capability does this represent?
2. What's the business logic encoded here?
3. What use cases does this support?
4. What's notably missing?
```

### Outputs

- [ ] Capability audit document
- [ ] Gap inventory prioritized
- [ ] Reality vs. perception documented

---

## Phase 3: ARTICULATE (Week 3)

### Goal

Define and document team identity clearly.

### Activities

- Draft mission statement
- Define responsibility boundaries
- Create value proposition
- Build communication frameworks

### AI Assistance

**Prompt: Mission Drafting**

```
Based on my audit, here's what [team] actually owns:
[list capabilities]

Here's what we don't own:
[list what other teams own]

Help me draft a clear mission statement that:
1. States what we're accountable for
2. Distinguishes us from adjacent teams
3. Is concrete, not vague
```

**Prompt: Charter Structure**

```
I need to create a one-page team charter for [team].

Key constraints:
- Must fit on one page
- Audience: Leadership, quarterly reviews
- Should clarify common misunderstandings

Information I have:
[paste context]

Help me structure this as a clear charter.
```

**Prompt: Value Narrative**

```
I need to explain [team]'s value to different audiences.

Help me create a communication framework with:
1. One-sentence pitch
2. "Without us, [consequence]" statements
3. Boundary explanations for adjacent teams
4. Leadership-friendly framing
```

### Outputs

- [ ] Team charter
- [ ] Value narrative
- [ ] Boundary contract defined

---

## Phase 4: ALIGN (Week 4)

### Goal

Validate and socialize the work.

### Activities

- Present to manager
- Discuss with peer PMs
- Gather feedback
- Iterate based on input

### AI Assistance

**Prompt: Stakeholder Role-Play**

```
I'm presenting my team's charter to [stakeholder].

Their likely concerns:
- [concern]
- [concern]

Role-play as them. What questions would you ask?
What might you push back on?
```

**Prompt: Presentation Polish**

```
Here's my draft charter:
[paste]

Help me:
1. Sharpen the language
2. Anticipate common objections
3. Add evidence for key claims
4. Make it more memorable
```

### Outputs

- [ ] Manager alignment
- [ ] Peer PM feedback incorporated
- [ ] Final documents published
- [ ] Communication plan for broader sharing

---

## Document Checklist

| Document | Location | Status |
|----------|----------|--------|
| Reading notes | `context/` | [ ] |
| Capability audit | `analysis/` | [ ] |
| Team charter | `strategy/` | [ ] |
| Value narrative | `strategy/` | [ ] |
| Stakeholder map | `analysis/` | [ ] |

---

## Success Criteria

- [ ] Can articulate team value in one sentence
- [ ] Boundary with adjacent teams is documented
- [ ] Manager endorses the framing
- [ ] Peer PMs understand what you own
- [ ] Gap inventory feeds into roadmap

---

_Related: [Full Framework](../framework/pm-ai-partner-framework.md)_

