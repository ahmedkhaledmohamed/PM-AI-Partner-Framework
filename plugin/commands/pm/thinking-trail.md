Help me generate a thinking trail for the current branch: $ARGUMENTS

## Instructions

Generate a structured record of my intellectual contribution on this branch by extracting and synthesizing my prompts from Claude Code sessions.

### Context Sources

- **Claude Code sessions** — `~/.claude/projects/<project>/*.jsonl` files contain full conversation history with timestamps, branch names, and user prompts
- **Git branch** — Current branch name (or specified in $ARGUMENTS) determines which prompts to extract
- **Extraction script** — `thinking-trail.py` in `~/.claude/bin/` or the plugin's `bin/` directory handles JSONL parsing and deduplication

### Process

1. **Detect branch** — Get the current git branch (or use the branch specified in $ARGUMENTS)
2. **Extract prompts** — Run `python3 <path>/thinking-trail.py --extract-json` to get all user prompts for this branch as JSON
3. **Assess volume** — If <5 prompts, generate a summary-only trail. If 0 prompts, report that no prompts were found for this branch
4. **Synthesize** — Read the extracted JSON and create a structured thinking trail with these sections (skip any that don't apply):
   - **Problem Framing** — What was being solved? What constraints were set?
   - **Approach** — How was the work directed? What strategy was chosen?
   - **Key Decisions** — What tradeoffs were navigated? What was chosen or rejected?
   - **Pivots** — Where did thinking change direction? What triggered the change?
   - **Outcome** — What was the end result?
5. **Write** — Save to `.thinking/<branch-name>.md` (replace `/` with `-` in branch name)
6. **Stage** — Run `git add` on the output file

### Output Format

```markdown
# Thinking Trail — `<branch>`

> Generated <date>
> <N> prompts across <M> session(s) | <first timestamp> → <last timestamp>

## Problem Framing
[1-3 sentences using the PM's actual words]

## Approach
[1-3 sentences]

## Key Decisions
[1-3 sentences]

## Pivots
[1-3 sentences, skip if approach was linear]

## Outcome
[1-3 sentences]

---

<details>
<summary>Raw Prompts (N)</summary>

**[1]** _timestamp_
> prompt text

</details>
```

### Tips

- Run this before creating a PR to capture your contribution
- The thinking trail pairs well with the PR description — include the synthesis in the PR body or post as a PR comment
- If extraction finds 0 prompts, you may be on the wrong branch or session files may have been cleaned up
- The `.thinking/` directory should be committed — it's documentation, not build artifacts
- Use the PM's actual phrasing from prompts, not your interpretation of what they meant
- For branches with <5 prompts, write a single summary paragraph instead of the full 5-section format
