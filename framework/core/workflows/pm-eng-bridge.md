# Workflow: PM-Eng Bridge

**When to use:** Translating between code reality and product intent — scoping work, understanding technical constraints, reviewing implementations, communicating decisions to engineering

**Time:** Ongoing (embedded in daily work)

**Output:** Shared understanding between PM and engineering

---

## Overview

```
┌───────────┐    ┌───────────┐    ┌───────────┐    ┌──────────┐
│ TRANSLATE │ →  │ NEGOTIATE │ →  │  SPECIFY  │ →  │  VERIFY  │
│           │    │           │    │           │    │          │
│ Understand│    │ Trade-off │    │ Agreement │    │ Confirm  │
└───────────┘    └───────────┘    └───────────┘    └──────────┘
```

---

## Philosophy

The PM-Eng relationship breaks down when either side speaks only their own language. PMs describe features; engineers describe systems. The bridge is translating between "what the user needs" and "what the code does" — and finding the solutions that serve both.

Key principles:

1. **Understand before you ask** — Read the code (or have AI explain it) before asking engineering to change it. Requests grounded in reality get better responses
2. **Constraints are features** — Technical constraints aren't obstacles to your vision — they're information about what's possible. A PM who understands constraints proposes better solutions
3. **Specificity earns trust** — "Can we make it faster?" is a PM request. "The P95 latency on this endpoint is 800ms and users drop off after 500ms — can we investigate caching?" is a partnership
4. **Trade-offs, not mandates** — Never hand engineering a solution. Hand them a problem with constraints, and collaborate on the solution

---

## Phase 1: TRANSLATE (Before the conversation)

### Goal

Understand the technical landscape before proposing product changes.

### Activities

- Explore the relevant codebase
- Map product features to code components
- Identify existing capabilities and limitations
- Understand the data model and dependencies

### AI Assistance

**Prompt: Codebase Exploration**

```
I'm a PM exploring [repo/service].

Help me understand:
1. What product capability does this code represent?
2. What's the architecture (components, dependencies, data flow)?
3. What are the current limitations I should know about?
4. What would be easy vs. hard to change based on the current design?
```

**Prompt: Feature-to-Code Mapping**

```
I want to [product change].

Help me:
1. Find where this behavior currently lives in the code
2. Identify what systems would need to change
3. Estimate rough complexity (is this a config change, a feature, or a rewrite?)
4. List the teams/services I'd need to coordinate with
```

**Prompt: Technical Constraint Discovery**

```
I'm looking at [system/service].

Help me identify:
1. Hard constraints (what can't change without a rewrite)
2. Soft constraints (what could change with effort)
3. Performance characteristics (latency, throughput, reliability)
4. Known tech debt that affects this area
```

### Outputs

- [ ] Architecture understanding documented
- [ ] Feature-to-code mapping created
- [ ] Constraints identified (hard vs. soft)
- [ ] Informed questions prepared for engineering

---

## Phase 2: NEGOTIATE (The scoping conversation)

### Goal

Find the solution that maximizes user value within technical reality.

### Activities

- Present the problem (not the solution)
- Share what you've learned about the technical landscape
- Explore options together
- Make trade-offs explicit

### AI Assistance

**Prompt: Scoping Prep**

```
I'm meeting with engineering to scope [feature].

User problem: [problem statement]
What I've learned about the code: [findings from Phase 1]
My initial idea: [proposed approach]

Help me prepare:
1. How to frame the problem without prescribing a solution
2. Questions to ask engineering about feasibility
3. Trade-offs I should be ready to discuss (scope, timeline, quality)
4. Red flags to listen for (signs it's harder than expected)
```

**Prompt: Trade-off Framework**

```
Engineering proposed [option A] and [option B].

Option A: [description, timeline, limitations]
Option B: [description, timeline, limitations]

Help me evaluate:
1. Which option better serves the user need?
2. What do we give up with each option?
3. Is there an option C that combines the best of both?
4. What questions should I ask to decide?
```

### Tips

- **Show your homework** — When you can say "I looked at the code and noticed X," engineers engage differently
- **Ask "what would make this easy?"** — Sometimes the best solution is one the PM wouldn't have thought of
- **Listen for "well, actually"** — When engineers correct your technical understanding, that's valuable. Update your mental model
- **Document decisions, not just outcomes** — Write down why you chose option A over B. Future you will thank present you

### Outputs

- [ ] Problem framed without solution prescription
- [ ] Options explored with trade-offs documented
- [ ] Agreed approach with rationale
- [ ] Open questions for follow-up

---

## Phase 3: SPECIFY (After alignment)

### Goal

Write a spec that engineering can build from without ambiguity.

### Activities

- Document the agreed solution
- Define acceptance criteria
- Specify edge cases and error handling
- Clarify what's in scope and out of scope

### AI Assistance

**Prompt: Acceptance Criteria**

```
We're building [feature].

Agreed approach: [description]

Help me write acceptance criteria that:
1. Are testable (pass/fail, not subjective)
2. Cover the happy path and key edge cases
3. Include error states and fallback behavior
4. Are specific enough that PM and eng agree on "done"
```

**Prompt: Edge Case Discovery**

```
We're building [feature] that works like this:
[description]

Help me find edge cases:
1. What happens when inputs are unexpected?
2. What if a dependency is down?
3. What about concurrent operations?
4. What about users with unusual states (new, inactive, migrated)?
5. What about extreme volumes or empty states?
```

### Template: Engineering Spec

```markdown
# [Feature] — Engineering Spec

## Problem
[1-2 sentences: what user problem this solves]

## Agreed Approach
[Description of the solution, from the scoping conversation]

## Acceptance Criteria
- [ ] [Testable criterion 1]
- [ ] [Testable criterion 2]
- [ ] [Testable criterion 3]

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| [edge case] | [what should happen] |

## Out of Scope
- [Explicitly excluded item — and why]

## Dependencies
- [Service/team]: [what we need from them, by when]

## Open Questions
- [Anything still TBD]
```

### Outputs

- [ ] Engineering spec with acceptance criteria
- [ ] Edge cases documented
- [ ] Dependencies confirmed with owning teams
- [ ] Open questions tracked

---

## Phase 4: VERIFY (During and after implementation)

### Goal

Confirm what was built matches what was agreed, without micromanaging.

### Activities

- Review PRs for product correctness (not code quality — that's eng's job)
- Test the feature against acceptance criteria
- Validate metrics instrumentation
- Confirm edge case handling

### AI Assistance

**Prompt: PR Review (Product Lens)**

```
Here's a PR for [feature]: [link or description]

Help me review from a product perspective:
1. Does the implementation match the spec?
2. Are the acceptance criteria met?
3. Is the metrics instrumentation correct?
4. Any user-facing behavior I should test manually?
```

**Prompt: Instrumentation Verification**

```
We're shipping [feature] and need to track [metrics].

Help me verify:
1. Are the right events being logged?
2. Do the event properties match what we need for analysis?
3. Are there any gaps (events we need but aren't logging)?
4. Will the existing dashboards pick these up or do we need new ones?
```

### Outputs

- [ ] Feature reviewed against acceptance criteria
- [ ] Metrics instrumentation verified
- [ ] Edge cases tested
- [ ] Launch readiness confirmed

---

## Anti-Patterns to Avoid

| Anti-Pattern | What It Looks Like | Better Approach |
|---|---|---|
| **The Throw-Over** | PM writes a spec in isolation, hands it to eng | Co-create during scoping |
| **The Micromanager** | PM reviews every PR and questions code decisions | Review for product correctness, trust eng on code quality |
| **The Wishful Thinker** | PM ignores constraints and pushes for the ideal | Understand constraints, propose solutions within them |
| **The Translator Gap** | PM uses product jargon, eng uses technical jargon, nobody bridges | Learn each other's language. Use concrete examples, not abstract descriptions |
| **The Scope Creeper** | PM adds "one more thing" during implementation | If it wasn't in the spec, it goes in the next iteration |

---

## Success Criteria

- [ ] Can explain the technical architecture in plain language
- [ ] Engineering feels their constraints were heard and respected
- [ ] Spec is unambiguous — PM and eng agree on what "done" means
- [ ] Trade-off decisions are documented with rationale
- [ ] Feature ships matching the spec (no surprises)

---

_Related: [Technical Analyst Skill](../../templates/skills/technical-analyst/SKILL.md) | [Product Brief Skill](../../templates/skills/product-brief/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
