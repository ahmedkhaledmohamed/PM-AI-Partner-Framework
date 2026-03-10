# Workflow: Communication Prep

**When to use:** Preparing for high-stakes meetings, leadership reviews, cross-functional presentations, difficult conversations

**Time:** 1-3 hours per meeting

**Output:** Talking points, anticipated Q&A, meeting brief, slide structure

---

## Overview

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌──────────┐
│ CONTEXT │ →  │ POSITION │ →  │ ANTICIPATE│ →  │ REHEARSE │
│         │    │          │    │           │    │          │
│  Gather │    │  Frame   │    │ Objections│    │  Polish  │
└─────────┘    └──────────┘    └───────────┘    └──────────┘
```

---

## Philosophy

High-stakes communication fails when PMs prepare for what they want to say instead of what the audience needs to hear. A VP doesn't need your analysis journey — they need your conclusion. An engineer doesn't need your business case — they need the problem and constraints.

Key principles:

1. **Audience first** — Structure your message for how they'll process it, not how you discovered it
2. **Prepare for questions, not just content** — The Q&A reveals more about your mastery than the presentation
3. **Know your one thing** — If the audience remembers only one point, what should it be? Build everything around that
4. **Silence is data** — If a rehearsal leaves you stumbling on a question, that's the question you need to prepare for most

---

## Phase 1: CONTEXT (30 minutes)

### Goal

Understand the meeting's real purpose and the audience's mental state.

### Activities

- Clarify the meeting's actual purpose (decision, alignment, update, or exploration)
- Identify each attendee's interests and concerns
- Understand the political landscape (who's aligned, who's skeptical)
- Review any pre-read or prior decisions on this topic

### AI Assistance

**Prompt: Meeting Analysis**

```
I have a meeting with [attendees/roles] about [topic].

Context:
- Meeting type: [decision / alignment / update / exploration]
- What happened before: [prior meetings, decisions, context]
- Current tensions: [what's unresolved]

Help me:
1. Identify what each attendee likely cares about
2. Surface any hidden agendas or tensions
3. Determine the real decision that needs to happen
4. Suggest how to structure the meeting time
```

**Prompt: Audience Mapping**

```
My audience includes:
- [Person A]: [role, what they care about, stance on topic]
- [Person B]: [role, what they care about, stance on topic]

Help me understand:
1. What does each person need from this meeting?
2. Where are they aligned vs. in conflict?
3. Who is the real decision maker?
4. What's the right communication style for each?
```

### Outputs

- [ ] Meeting purpose clarified (decision/alignment/update/exploration)
- [ ] Attendee concerns mapped
- [ ] Political landscape understood
- [ ] Prior context reviewed

---

## Phase 2: POSITION (30-45 minutes)

### Goal

Frame your message for maximum clarity and impact.

### Activities

- Define your core message (the one thing)
- Structure your argument (conclusion first, evidence second)
- Select supporting data (only what's needed)
- Prepare the "so what" for each point

### AI Assistance

**Prompt: Message Framing**

```
I need to communicate [topic] to [audience].

My key point: [what I want them to understand/decide]
Supporting evidence: [list 3-5 data points or arguments]
Potential resistance: [what might they push back on]

Help me:
1. Craft a one-sentence "headline" that captures my point
2. Structure the argument (conclusion → evidence → ask)
3. Choose which evidence to lead with
4. Write a clear "ask" (what I need from them)
```

**Prompt: Meeting Type Templates**

For **decision meetings**:
```
I need a decision on [topic]. Help me structure:
1. The decision question (yes/no, A vs B, or go/no-go)
2. Recommendation with 1-paragraph rationale
3. Key data supporting the recommendation
4. Risks of the recommendation
5. What happens if we don't decide today
```

For **alignment meetings**:
```
I need alignment on [topic]. Help me structure:
1. What we agree on (start here to build common ground)
2. Where we differ (frame as trade-offs, not disagreements)
3. Proposal for resolving the differences
4. What each party gains from the proposed alignment
```

For **update meetings**:
```
I'm updating [audience] on [topic]. Help me structure:
1. TL;DR (1-2 sentences: what's the state?)
2. Progress since last update (metrics and milestones)
3. What's changed or new
4. What needs attention (risks, blockers, decisions)
5. Next milestone and timeline
```

### Outputs

- [ ] Core message defined (one sentence)
- [ ] Argument structured (conclusion first)
- [ ] Supporting data selected
- [ ] Clear ask defined

---

## Phase 3: ANTICIPATE (30-45 minutes)

### Goal

Prepare for every question you might face.

### Activities

- Generate likely questions per attendee
- Prepare concise answers for each
- Identify your weakest points and prepare honest responses
- Prepare "I don't know, but here's how I'd find out" responses

### AI Assistance

**Prompt: Q&A Preparation**

```
I'm presenting [topic] to [audience].

My position: [summary]
Known weaknesses: [what I'm less confident about]

Help me anticipate:
1. Top 5 likely questions
2. The hardest question someone could ask
3. The question I'm hoping nobody asks
4. For each, draft a concise answer (2-3 sentences)
```

**Prompt: Stakeholder Role-Play**

```
Act as [stakeholder role/name]. Your concerns are:
- [concern 1]
- [concern 2]

I'm about to present [topic].

Ask me the tough questions you'd ask, one at a time.
After each answer, tell me:
1. Whether my answer addressed your concern
2. What follow-up you'd ask
3. How to strengthen my response
```

**Prompt: Weakness Preparation**

```
The weakest parts of my position are:
- [weakness 1: e.g., "limited data", "unproven approach"]
- [weakness 2]

Help me prepare honest responses that:
1. Acknowledge the gap without undermining my position
2. Explain what I'm doing to close the gap
3. Reframe the weakness in context of the bigger picture
4. Avoid defensive language
```

### Outputs

- [ ] Q&A document with prepared answers
- [ ] Weakest points addressed honestly
- [ ] Role-play completed for key stakeholders
- [ ] "I don't know" answers prepared (with follow-up plan)

---

## Phase 4: REHEARSE (15-30 minutes)

### Goal

Polish the delivery and build confidence.

### Activities

- Rehearse the opening (first 30 seconds sets the tone)
- Time the presentation against the slot
- Practice transitions between topics
- Do a final pass for jargon, filler, and unnecessary complexity

### AI Assistance

**Prompt: Opening Line**

```
I have 30 seconds to set the context for [topic] in a meeting with [audience].

Help me write a strong opening that:
1. States the purpose immediately
2. Creates a reason to pay attention
3. Signals whether this is a decision, update, or discussion
4. Is natural, not scripted-sounding
```

**Prompt: Polish Pass**

```
Here are my talking points:
[paste]

Help me:
1. Cut anything that doesn't support the core message
2. Replace jargon with plain language
3. Tighten wordy sentences
4. Check that the flow is logical
5. Ensure the ending is strong (don't fade out)
```

### Tips

- **The 3-breath test** — If you can't explain your core message in 3 breaths, it's not clear enough
- **Cut 30%** — Whatever you've prepared, it's too long. Cut the weakest 30% and the strongest points get more air
- **Prepare your first sentence** — The opening words set the audience's attention level. Don't start with "So, um, as you know..."
- **Prepare your last sentence** — End with the ask or the key takeaway, not "any questions?"

### Outputs

- [ ] Talking points finalized
- [ ] Opening and closing lines written
- [ ] Timing checked against meeting slot
- [ ] Confidence in Q&A preparedness

---

## Meeting Type Quick Reference

| Meeting Type | Lead With | Structure | End With |
|---|---|---|---|
| **Decision** | The recommendation | Recommendation → Evidence → Risks → Ask | "I recommend X. Can we align?" |
| **Alignment** | Common ground | Agreement → Differences → Proposal | "Here's what I propose. What's missing?" |
| **Update** | The headline | TL;DR → Progress → Changes → Needs | "The key risk is X. Here's my plan." |
| **Exploration** | The question | Question → What we know → Gaps → Next steps | "Based on this, I'll come back with X." |
| **Difficult** | Empathy | Acknowledge → Explain → Path forward | "Here's what I'm committed to doing." |

---

## Success Criteria

- [ ] Can state the core message in one sentence
- [ ] Prepared answer for the hardest question
- [ ] Audience-specific framing (not one-size-fits-all)
- [ ] Opening and closing lines are strong
- [ ] Comfortable with what you don't know (and how you'll follow up)

---

_Related: [Meeting Prep Skill](../../templates/skills/meeting-prep/SKILL.md) | [Devil's Advocate Skill](../../templates/skills/devil-advocate/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
