---
name: thinking-trail
description: Generate a structured record of PM intellectual contribution for the current branch. Use when creating PRs, documenting decision rationale, or capturing the thinking behind AI-assisted work. Triggers include "thinking trail", "document my thinking", "what did I decide", "capture my contribution", or before creating a PR.
version: 1.0.0
author: Ahmed Khaled Mohamed
license: MIT
allowed-tools: Read, Write, Bash(python3:*), Bash(git:*)
argument-hint: [branch name or leave blank for current]
---

# Thinking Trail

## Instructions

Generate a structured record of the PM's intellectual contribution on the current branch by extracting and synthesizing their prompts from Claude Code sessions.

### Behavior

1. **Extract prompts** — Run the thinking-trail extraction script to get all user prompts for the current branch
2. **Assess volume** — If <5 prompts, generate a summary-only trail (single paragraph). If 0 prompts, report that none were found
3. **Synthesize** — Read the extracted prompts and identify the thinking arc: problem framing, approach decisions, direction changes, and outcomes
4. **Write** — Save to `.thinking/<branch-name>.md` (replace `/` with `-` in branch name)
5. **Stage** — Run `git add` on the output file

### Process

1. Detect the current branch (or use the branch specified by the user)
2. Run: `python3 <plugin-bin>/thinking-trail.py --extract-json` (check `~/.claude/bin/thinking-trail.py`, then the plugin's `bin/` directory)
3. If no extraction script found, manually scan `~/.claude/projects/` for session JSONL files matching the branch
4. Read the JSON output and synthesize into the output format below
5. Create the `.thinking/` directory if it doesn't exist
6. Write the thinking trail document
7. Stage the file with `git add .thinking/<branch-name>.md`

### Tone

- Documentary, not evaluative
- Factual, not promotional
- Use the PM's actual words and phrasing where possible
- Concise — 1-3 sentences per section

### What NOT to Do

- Don't editorialize or add opinions about the PM's approach
- Don't include AI responses — only user prompts matter
- Don't create a thinking trail for trivial changes (typo fixes, formatting)
- Don't inflate the contribution — if the prompts were simple, say so honestly
- Don't include sensitive information (API keys, passwords) that may appear in prompts

### Advanced Patterns

1. **The "why" extraction** — User prompts often contain implicit reasoning. "Make it simpler" after a complex implementation reveals a design decision. Extract the constraint, not just the action. The directive IS the decision.
2. **Pivot detection** — Look for prompts that contradict earlier direction ("actually, let's try X instead", "wait, that's not right", "scrap that"). These pivots are the most valuable part of the trail — they document where judgment was applied and the PM changed course.
3. **Constraint setting** — When a PM says "don't over-engineer this" or "keep it under 200 lines" or "it needs to work on mobile", they're making architectural decisions. These constraints shape the work more than feature requests do. Surface them explicitly.
4. **Session boundaries** — Multiple sessions on the same branch often represent different work phases. Group prompts by session and identify the transition points — they usually mark when the PM reflected and changed approach between sessions.
5. **The minimal trail** — For branches with <5 prompts, a full 5-section document is overkill. Output a single "Summary" paragraph instead. Not every branch needs a detailed thinking trail. Proportion the documentation to the work.

## Output Format

```markdown
# Thinking Trail — `<branch>`

> Generated <date>
> <N> prompts across <M> session(s) | <first timestamp> → <last timestamp>

## Problem Framing
[What problem was being solved? What constraints were set?]

## Approach
[How was the work directed? What strategy was chosen?]

## Key Decisions
[What tradeoffs were navigated? What was chosen and rejected?]

## Pivots
[Where did thinking change direction? What triggered the change?]

## Outcome
[What was the end result?]

---

<details>
<summary>Raw Prompts (N)</summary>

**[1]** _timestamp_
> prompt text

**[2]** _timestamp_
> prompt text

</details>
```

## Examples

### Example 1: Feature Implementation with Pivot

**User:** /thinking-trail

**Good Response:**

Found 24 prompts across 3 sessions for branch `feature/retry-logic`.

*(Writes to `.thinking/feature-retry-logic.md`:)*

# Thinking Trail — `feature/retry-logic`

> Generated 2026-07-15 14:30 UTC
> 24 prompts across 3 sessions | 2026-07-10T09:15 → 2026-07-15T14:20

## Problem Framing
Intermittent order-processing failures in an example commerce service. Constraint: must be backward-compatible with existing retry configuration and not increase p99 latency by more than 50ms.

## Approach
Started with exponential backoff implementation. Directed exploration of existing retry patterns in the codebase before writing new code.

## Key Decisions
Chose jittered backoff over simple exponential — "we need to avoid thundering herd on recovery." Rejected dead letter queue as "overkill for current scale." Selected circuit breaker pattern over simple retry cap for cascading failure protection.

## Pivots
Session 2 shifted from retry-only to circuit breaker after reviewing production metrics: "the real problem isn't individual failures, it's cascading failures taking down the whole pipeline." This reframed the solution from retry optimization to failure isolation.

## Outcome
Circuit breaker with jittered backoff. 3 files changed, backward-compatible, validated against representative traffic patterns.

### Example 2: Minimal Trail (Few Prompts)

**User:** /thinking-trail fix/typo-readme

**Good Response:**

Found 2 prompts across 1 session for branch `fix/typo-readme`.

*(Writes to `.thinking/fix-typo-readme.md`:)*

# Thinking Trail — `fix/typo-readme`

> Generated 2026-07-15 14:30 UTC
> 2 prompts across 1 session | 2026-07-15T14:00 → 2026-07-15T14:05

Straightforward typo fix — corrected documentation errors in README.md. No design decisions or pivots involved.

---

<details>
<summary>Raw Prompts (2)</summary>

**[1]** _2026-07-15T14:00_
> fix the typos in the README

**[2]** _2026-07-15T14:05_
> also fix the broken link in the contributing section

</details>
