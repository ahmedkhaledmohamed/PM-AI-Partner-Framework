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
[PM Contribution Record] Follow this repository's contribution-record policy before opening a PR. If a record is required, paraphrase material decisions into a dated immutable file, review it with the diff, and exclude transcripts and private details. This reminder does not enforce approval or authorize staging, posting or merging.
REMINDER
fi
