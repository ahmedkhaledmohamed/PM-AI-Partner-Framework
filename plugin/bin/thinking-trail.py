#!/usr/bin/env python3
"""
Thinking Trail Generator

Extracts user prompts from Claude Code sessions for the current git branch
and outputs them for synthesis. Two modes:

  --extract-json    Output prompts as JSON (for Claude Code to synthesize)
  (default)         Full pipeline with LLM synthesis (requires ANTHROPIC_API_KEY)

Usage:
    thinking-trail.py --extract-json           # JSON output for Claude Code
    thinking-trail.py --extract-json --branch X # Override branch
    thinking-trail.py                           # Full pipeline (needs API key)
    thinking-trail.py --comment 42              # Also post as PR comment
    thinking-trail.py --dry-run                 # Preview without writing
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

CLAUDE_PROJECTS_DIR = Path.home() / ".claude" / "projects"
HAIKU_MODEL = "claude-haiku-4-5-20251001"


def get_current_branch():
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
    except subprocess.CalledProcessError:
        return None


def get_project_key():
    cwd = os.getcwd()
    return cwd.replace("/", "-")


def find_session_files():
    project_key = get_project_key()
    project_dir = CLAUDE_PROJECTS_DIR / project_key
    if not project_dir.exists():
        return []
    return sorted(project_dir.glob("*.jsonl"))


def extract_prompts(session_files, branch):
    prompts = []
    seen = set()
    for session_file in session_files:
        with open(session_file) as f:
            for line in f:
                try:
                    entry = json.loads(line)
                except (json.JSONDecodeError, UnicodeDecodeError):
                    continue

                if entry.get("type") != "user":
                    continue
                if entry.get("gitBranch") != branch:
                    continue

                content = entry.get("message", {}).get("content", "")
                if isinstance(content, list):
                    text_parts = []
                    for block in content:
                        if isinstance(block, dict) and block.get("type") == "text":
                            text_parts.append(block["text"])
                    content = "\n".join(text_parts)

                content = content.strip()
                if not content:
                    continue

                content_hash = hash(content)
                if content_hash in seen:
                    continue
                seen.add(content_hash)

                prompts.append({
                    "text": content,
                    "timestamp": entry.get("timestamp", ""),
                    "session_id": entry.get("sessionId", ""),
                })

    prompts.sort(key=lambda p: p["timestamp"])
    return prompts


def get_api_key():
    key = os.environ.get("ANTHROPIC_API_KEY")
    if key:
        return key
    try:
        import keyring
        key = keyring.get_password("khalil-assistant", "anthropic-api-key")
        if key:
            return key
    except ImportError:
        pass
    return None


def synthesize(prompts, branch):
    try:
        import anthropic
    except ImportError:
        return None

    api_key = get_api_key()
    if not api_key:
        return None

    prompt_text = "\n\n".join(
        f"[{i+1}] ({p['timestamp'][:16]})\n{p['text']}"
        for i, p in enumerate(prompts)
    )

    if len(prompt_text) > 80_000:
        lines = prompt_text.split("\n\n")
        mid = len(lines) // 2
        keep_start = lines[:mid // 2]
        keep_end = lines[-mid // 2:]
        prompt_text = "\n\n".join(keep_start) + \
            f"\n\n[... {len(lines) - len(keep_start) - len(keep_end)} prompts omitted for length ...]\n\n" + \
            "\n\n".join(keep_end)

    synthesis_prompt = f"""Analyze these prompts from a Claude Code session on branch '{branch}' and create a structured "Thinking Trail" — a concise record of the intellectual contribution that drove this work.

Focus on: problem framing, constraints, direction changes, decisions — not the AI's output.

Sections (skip any that don't apply):
## Problem Framing — What problem was being solved? What constraints were set?
## Approach — How was the work directed? What strategy was chosen?
## Key Decisions — What tradeoffs were navigated? What was chosen or rejected?
## Pivots — Where did thinking change direction? What triggered the change?
## Outcome — What was the end result?

Rules: 1-3 sentences per section. Use the person's actual words where possible. No editorializing.

{len(prompts)} prompts, {prompts[0]['timestamp'][:16]} → {prompts[-1]['timestamp'][:16]}:

{prompt_text}"""

    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model=HAIKU_MODEL,
        max_tokens=2000,
        messages=[{"role": "user", "content": synthesis_prompt}],
    )
    return response.content[0].text


def write_thinking_trail(branch, synthesis, prompts, repo_root):
    thinking_dir = Path(repo_root) / ".thinking"
    thinking_dir.mkdir(exist_ok=True)

    filename = branch.replace("/", "-") + ".md"
    filepath = thinking_dir / filename

    session_ids = sorted(set(p["session_id"] for p in prompts))
    first_ts = prompts[0]["timestamp"][:16] if prompts else "?"
    last_ts = prompts[-1]["timestamp"][:16] if prompts else "?"

    doc = f"""# Thinking Trail — `{branch}`

> Generated {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}
> {len(prompts)} prompts across {len(session_ids)} session(s) | {first_ts} → {last_ts}

{synthesis}

---

<details>
<summary>Raw Prompts ({len(prompts)})</summary>

"""
    for i, p in enumerate(prompts, 1):
        text = p["text"].replace("\n", "\n> ")
        doc += f"**[{i}]** _{p['timestamp'][:16]}_\n> {text}\n\n"

    doc += "</details>\n"

    filepath.write_text(doc)
    return filepath


def post_pr_comment(pr_number, synthesis, branch, prompt_count):
    comment_body = f"""## Thinking Trail — `{branch}`

_{prompt_count} prompts synthesized_

{synthesis}

---
_Auto-generated by thinking-trail_"""

    try:
        subprocess.run(
            ["gh", "pr", "comment", str(pr_number), "--body", comment_body],
            check=True,
            capture_output=True,
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"Warning: Failed to post PR comment: {e}", file=sys.stderr)
        return False


def get_repo_root():
    try:
        return subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
    except subprocess.CalledProcessError:
        return os.getcwd()


def main():
    parser = argparse.ArgumentParser(description="Generate thinking trail from Claude Code sessions")
    parser.add_argument("--branch", help="Branch name (default: current branch)")
    parser.add_argument("--comment", type=int, metavar="PR_NUMBER", help="Post synthesis as PR comment")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing files")
    parser.add_argument("--extract-json", action="store_true", help="Output extracted prompts as JSON (for external synthesis)")
    args = parser.parse_args()

    branch = args.branch or get_current_branch()
    if not branch:
        print("Error: Not in a git repo and no --branch specified.", file=sys.stderr)
        sys.exit(1)

    session_files = find_session_files()
    if not session_files:
        print(json.dumps({"error": "No sessions found", "branch": branch}) if args.extract_json
              else "No Claude Code sessions found for this project.", file=sys.stderr)
        sys.exit(1)

    prompts = extract_prompts(session_files, branch)

    if not prompts:
        if args.extract_json:
            print(json.dumps({"branch": branch, "prompts": [], "count": 0}))
        else:
            print(f"No prompts found for branch '{branch}'.")
        sys.exit(0)

    if args.extract_json:
        output = {
            "branch": branch,
            "count": len(prompts),
            "sessions": len(set(p["session_id"] for p in prompts)),
            "first_timestamp": prompts[0]["timestamp"],
            "last_timestamp": prompts[-1]["timestamp"],
            "prompts": [{"index": i + 1, "timestamp": p["timestamp"][:16], "text": p["text"]}
                        for i, p in enumerate(prompts)],
        }
        print(json.dumps(output, indent=2))
        return

    if args.dry_run:
        print(f"Branch: {branch}")
        print(f"Found {len(prompts)} prompts across {len(set(p['session_id'] for p in prompts))} session(s)")
        print("\n--- Prompt preview (first 5) ---")
        for i, p in enumerate(prompts[:5], 1):
            print(f"\n[{i}] ({p['timestamp'][:16]})")
            print(p["text"][:200])
        print(f"\n... and {max(0, len(prompts) - 5)} more")
        return

    # Full pipeline
    print(f"Branch: {branch}", file=sys.stderr)
    print(f"Found {len(prompts)} prompts across {len(set(p['session_id'] for p in prompts))} session(s)", file=sys.stderr)

    print("Synthesizing with Haiku...", file=sys.stderr)
    synthesis = synthesize(prompts, branch)
    if not synthesis:
        print("No API key available. Use --extract-json for Claude Code synthesis.", file=sys.stderr)
        sys.exit(1)

    repo_root = get_repo_root()
    filepath = write_thinking_trail(branch, synthesis, prompts, repo_root)
    print(f"Written: {filepath}", file=sys.stderr)

    if args.comment:
        print(f"Posting comment to PR #{args.comment}...", file=sys.stderr)
        if post_pr_comment(args.comment, synthesis, branch, len(prompts)):
            print("PR comment posted.", file=sys.stderr)

    try:
        subprocess.run(["git", "add", str(filepath)], check=True, capture_output=True)
        print(f"Staged: {filepath}", file=sys.stderr)
    except subprocess.CalledProcessError:
        pass

    print(str(filepath))


if __name__ == "__main__":
    main()
