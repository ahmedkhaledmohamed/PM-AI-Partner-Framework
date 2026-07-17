# Workflow: Documenting AI-Assisted Work

**When to use:** Creating PRs after AI-assisted work, building a record of PM intellectual contribution, team retrospectives on AI collaboration

**Time:** 15-30 minutes

**Output:** Thinking trail document, PR annotation, contribution record

---

## Overview

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌─────────┐
│ EXTRACT  │ →  │ SYNTHESIZE│ →  │ PUBLISH  │ →  │ REFLECT │
│          │    │           │    │          │    │         │
│ Prompts  │    │ Patterns  │    │ Document │    │  Learn  │
└──────────┘    └───────────┘    └──────────┘    └─────────┘
```

---

## Philosophy

AI amplifies your thinking, but the thinking is yours. As AI-assisted work becomes standard, the question shifts from "did you write this code?" to "did you direct this work?" The thinking trail answers that question with evidence.

Key principles:

1. **Document decisions, not outputs** — What you chose and why matters more than what the AI generated
2. **Pivots are the most valuable signal** — Moments where you changed direction reveal where judgment was applied
3. **Keep it proportional** — A one-line fix doesn't need a multi-section document
4. **Use your actual words** — The trail should be built from your real prompts, not a retroactive narrative

---

## Phase 1: EXTRACT

### Goal

Collect all user prompts from Claude Code sessions for the current branch.

### Activities

- Identify the current git branch
- Run the extraction script to scan session JSONL files
- Review the prompt count and time span
- Decide whether a full or minimal trail is warranted (threshold: 5 prompts)

### AI Assistance

**Prompt: Run Extraction**
```
Run /pm:thinking-trail to extract my prompts for this branch.
```

**Manual Alternative (no extraction script)**
```
Scan ~/.claude/projects/ for JSONL session files.
For each file, find entries where type="user" and gitBranch="<current branch>".
Extract the prompt text, timestamp, and session ID.
Deduplicate and sort chronologically.
```

### Tips

- Session files can be large (10+ MB). The extraction script streams line-by-line — don't try to load entire files into memory
- Prompts from multiple sessions on the same branch are aggregated automatically
- The `gitBranch` field is on each user entry, not per-session, so branch switching within a session is handled correctly

---

## Phase 2: SYNTHESIZE

### Goal

Identify the thinking arc in the extracted prompts and structure it into a readable document.

### Activities

- Group prompts by session (different sessions often represent different phases of work)
- Identify the problem framing (first few prompts usually set context)
- Find pivots (prompts that contradict or redirect earlier direction)
- Extract explicit constraints ("don't X", "keep it under Y", "must work with Z")
- Determine the outcome (final prompts usually confirm or validate)

### AI Assistance

**Prompt: Synthesize Prompts**
```
Here are my extracted prompts for branch [name]: [paste JSON]

Synthesize these into a thinking trail document with sections:
- Problem Framing: What was I solving? What constraints did I set?
- Approach: How did I direct the work?
- Key Decisions: What tradeoffs did I navigate?
- Pivots: Where did I change direction?
- Outcome: What was the end result?

Use my actual words where possible. Skip sections that don't apply.
1-3 sentences per section.
```

### What to Look For

| Signal | What It Means | Example |
|--------|--------------|---------|
| First 2-3 prompts | Problem framing | "I need to fix the retry logic because..." |
| "Don't X" / "Keep it Y" | Constraint setting | "Don't over-engineer this" |
| "Actually..." / "Wait" / "Scrap that" | Pivot | "Actually, let's use a circuit breaker instead" |
| "What about..." / "Have you considered" | Tradeoff navigation | "What about the thundering herd problem?" |
| "Ship it" / "Looks good" / "Create the PR" | Outcome confirmation | "This is ready, create the PR" |

### Tips

- Don't over-interpret short prompts like "continue" or "yes" — they're confirmations, not decisions
- Context continuation prompts ("This session is being continued...") should be skipped
- If prompts are too sparse to tell a story, say so honestly rather than inventing a narrative

---

## Phase 3: PUBLISH

### Goal

Write the thinking trail to the repository and attach it to the PR.

### Activities

- Create `.thinking/` directory if it doesn't exist
- Write the thinking trail to `.thinking/<branch-name>.md`
- Stage the file with `git add`
- Commit before or alongside the PR creation
- Optionally post the synthesis as a PR comment

### Template: Thinking Trail Document

```markdown
# Thinking Trail — `<branch>`

> Generated <date>
> <N> prompts across <M> session(s) | <first_ts> → <last_ts>

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

### PR Comment (Optional)

```markdown
## Thinking Trail — `<branch>`

_N prompts synthesized_

[Synthesis sections from above]

---
_Auto-generated by thinking-trail_
```

### Tips

- The `.thinking/` directory should be committed — it's documentation, not artifacts
- Include a link to the thinking trail file in the PR description
- For teams: agree on whether thinking trails are required or optional per PR

---

## Phase 4: REFLECT

### Goal

Learn from your own decision patterns over time.

### Activities

- Review the thinking trail before submitting the PR
- Ask: Was my problem framing accurate? Did my pivots improve the outcome?
- Update CLAUDE.md with any lessons learned (e.g., "always check for existing retry patterns before implementing new ones")
- Over time, review `.thinking/` files to spot recurring patterns in your decision-making

### AI Assistance

**Prompt: Reflection**
```
Review the thinking trail I just generated for [branch].
What patterns do you notice in my decision-making?
Any blind spots or recurring pivots that suggest I should change my initial approach?
```

### Tips

- Reflection is optional but valuable — even 2 minutes of review improves future decisions
- Look for recurring pivots — if you always pivot at the same point, your initial approach might need adjustment
- Thinking trails become more useful as they accumulate — after 10-20 PRs, patterns emerge

---

## Common Pitfalls

| Pitfall | Why It Happens | Fix |
|---------|---------------|-----|
| Over-documenting trivial changes | Treating every branch equally | Use summary-only for <5 prompts |
| Retrospective rationalization | Writing what you wish you'd thought | Use actual prompt text as evidence |
| Omitting pivots | Pivots feel like mistakes | Reframe: pivots show judgment, not failure |
| Forgetting to run before PR | Not yet habitual | The thinking-trail hook reminds you |
| Including sensitive info | Prompts may contain API keys or internal URLs | Review the raw prompts section before committing |

---

## Output Checklist

- [ ] Prompts extracted for the correct branch
- [ ] Synthesis uses actual prompt text, not retroactive narrative
- [ ] Sections that don't apply are skipped (not filled with filler)
- [ ] `.thinking/<branch>.md` committed to the repo
- [ ] Raw prompts reviewed for sensitive information
- [ ] PR comment posted (optional)

---

## Success Criteria

- [ ] A reader can understand what the PM directed without seeing the AI's responses
- [ ] Pivots and constraint-setting are explicitly documented
- [ ] The trail is proportional to the work (summary for small, full for complex)
- [ ] The PM's actual words are used, not paraphrased

---

_Related: [Thinking Trail Skill](../../templates/skills/thinking-trail/SKILL.md) | [Writer Skill](../../templates/skills/writer/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
