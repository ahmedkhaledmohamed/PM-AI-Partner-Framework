---
name: product-brief
description: "Generates structured product briefs and PRDs including problem statements, user stories, success metrics, and scope definitions. Use when the user needs to write a product brief, PRD, feature spec, or any document that defines what to build and why. Triggers include 'product brief', 'PRD', 'spec', 'feature doc', 'write a brief', 'define this feature', or when scoping work for engineering."
version: 1.0.0
author: Ahmed Khaled Mohamed <ahmd.khaled.a.mohamed@gmail.com>
license: MIT
allowed-tools: Read, Glob, Grep
argument-hint: [feature name]
---

# Product Brief Skill

## Instructions

Guide the creation of clear, actionable product briefs that engineering can use to scope and build.

### Behavior

1. **Gather context first** — Problem, users, constraints
2. **Use a consistent structure** — Same format every time
3. **Focus on "what" and "why"** — Leave "how" to engineering
4. **Include success metrics** — How will we know it worked?
5. **Surface open questions** — Don't hide uncertainty

### Tone

- Clear and decisive
- Specific over vague
- Honest about what's unknown
- Respectful of engineering's expertise

## Brief Structure

Every product brief should include:

```markdown
# [Feature Name]

## Problem Statement
What problem are we solving? Who has this problem? Why does it matter now?

## Proposed Solution
What are we building? (High-level, not implementation details)

## User Value
Why will users care? What's the benefit?

## Success Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Primary metric | X | Y |
| Secondary metric | A | B |

## Scope
### In Scope
- What's included in v1

### Out of Scope
- What we're explicitly NOT doing (and why)

## Open Questions
- Things we need to figure out before/during implementation

## Dependencies
- Other teams, systems, or work this depends on

## Timeline
- Target dates (if known), or "TBD pending scoping"
```

### Advanced Patterns

1. **Scope negotiation** — The In Scope / Out of Scope section is the most-debated part of any brief. Write Out of Scope as a decision, not a deferral: "We're not building desktop support because mobile accounts for 92% of this use case's sessions. Revisit threshold: if desktop sessions exceed 20%." This turns "why not?" conversations into data conversations
2. **Metric selection** — Pick metrics you can actually measure within the project timeline. "Increase retention" is meaningless in a brief for a feature shipping in 4 weeks — you won't have retention data for months. Instead, pick a leading indicator: "Increase Day-1 feature activation from X% to Y%." Every metric in the brief should have a known data source and a realistic measurement window
3. **Dependency surfacing** — The Dependencies section should scare you a little. If it doesn't, you haven't thought hard enough. For each dependency, document: who owns it, have you talked to them, what's their timeline, and what happens to your project if they slip. Briefs with a clean "no dependencies" section are usually briefs where the PM hasn't discovered the dependencies yet
4. **The "jobs to be done" problem statement** — Don't describe the problem as a feature gap ("we don't have voice messages"). Describe it as a user struggle: "Users in messaging-heavy markets abandon threads when typing becomes slower than speaking — they switch to WhatsApp mid-conversation." The first framing invites solution debates; the second invites empathy and creative solutions
5. **Progressive disclosure of detail** — A brief should be readable at three speeds: skim (problem + solution + metrics in 30 seconds), read (full brief in 5 minutes), reference (open questions + dependencies when scoping). Structure the document so each speed gives a complete picture at its level of detail

## Process

1. **Ask clarifying questions** about the feature
2. **Propose the brief structure** with initial content
3. **Draft each section** based on user input
4. **Validate the draft** using the checkpoints below
5. **Review and refine** together
6. **Highlight gaps** that need stakeholder input

### Validation Checkpoints

Before finalizing any brief, verify each of these:

- [ ] **Metrics are measurable now** — Every metric in the Success Metrics table has a known data source and a realistic measurement window. If instrumentation does not exist yet, flag it and propose a proxy metric that is available today.
- [ ] **Out of Scope includes rationale** — Each Out of Scope item states *why* it is excluded (e.g. "Desktop support — mobile accounts for 92% of sessions; revisit if desktop exceeds 20%"). Items without rationale invite scope creep.
- [ ] **Dependencies have owners** — Every dependency names the owning team, confirms whether they have been contacted, and notes their timeline. A clean "no dependencies" section usually means dependencies have not been discovered yet.
- [ ] **Open Questions are actionable** — Each open question identifies who can answer it and a target date for resolution. Unanswered questions at launch are risks, not unknowns.
- [ ] **Problem Statement is user-centered** — The problem is framed as a user struggle, not a feature gap. "Users abandon threads when typing is slower than speaking" beats "We don't have voice messages."

## Examples

For full worked examples (new feature brief, quick brief), see [references/examples.md](references/examples.md).

### Inline Example: Context Gathering

**User:** Help me write a product brief for adding voice messages to our chat feature.

**Good Response:**

Let me gather some context first:

1. **Problem**: What's driving this? User requests? Competitive pressure? Usage data?
2. **Users**: All users, or specific segments (power users, specific markets)?
3. **Constraints**: Any technical limitations? Timeline pressure?
4. **Success**: How will we measure if this worked?

Based on what you share, I'll draft the brief using the standard structure above — starting with Problem Statement and working through each section. I'll flag any validation checkpoint failures (e.g. metrics without a data source, Out of Scope items missing rationale) as we go.
