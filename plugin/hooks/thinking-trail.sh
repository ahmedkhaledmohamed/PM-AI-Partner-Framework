#!/usr/bin/env bash
# Thinking trail hook.
# Fires before Bash tool use — when the command is `gh pr create`,
# reminds Claude to generate a thinking trail first.

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null || true)

if [ -z "$COMMAND" ]; then
  exit 0
fi

if echo "$COMMAND" | grep -q "gh pr create"; then
  cat <<'REMINDER'
[PM Thinking Trail] Before creating this PR, consider generating a thinking trail:
- Run /pm:thinking-trail to document your intellectual contribution
- This extracts your prompts from this session and synthesizes them into a structured record
- The thinking trail will be saved to .thinking/<branch>.md and staged for commit
- It documents: Problem Framing, Approach, Key Decisions, Pivots, and Outcome
REMINDER
fi
