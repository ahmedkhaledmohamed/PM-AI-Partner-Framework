# Document AI-assisted contribution

Use when a repository or reviewer needs an account of material decisions behind the work. Follow its actual contribution policy; a small edit does not automatically need a long document.

## Prepare a sanitized record

Read the visible task context, accepted decisions and actual diff. Summarize problem framing, approach, key decisions, pivots and outcome where applicable, with one to three sentences per section. Paraphrase the contribution. Do not include conversations, direct prompt quotations, session identifiers, credentials, personal machine paths or internal hostnames.

If a repository artifact is requested, use an immutable dated file such as `.thinking/YYYY-MM-DD-topic.md`. Do not overwrite a previous record, automatically stage it, or post it to a review. Show the record with the relevant diff and follow the target approval rules.

An approved extractor may help locate material decisions, but its output is private working material. The bundled legacy helper reads local Claude records only; it does not cover all runtimes and does not write, stage, send data to an API or post a comment. Missing sessions and incomplete parsing are failures, not evidence of zero contribution. Use a manual synthesis of visible context when appropriate and state that method.

## Example structure

- Problem framing: the user need and material constraints.
- Approach: the chosen investigation or implementation direction.
- Decisions: accepted options and trade-offs with provenance.
- Pivots: a substantive change of direction, if any.
- Outcome: what was produced and actually verified, including unresolved limits.

The contribution record is not an approval, ownership declaration or measurement of individual performance. It should neither inflate nor erase human judgment. Keep useful decisions in the existing task handoff as well, with links rather than duplicated private material.

Use the [thinking-trail skill](../../../plugin/skills/thinking-trail/SKILL.md). For the full task lifecycle see the [operating model](../workspace-operating-model.md).
