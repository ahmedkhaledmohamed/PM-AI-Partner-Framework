#!/usr/bin/env python3
"""Read local Claude session records on explicit request; never write or publish them.

No API client, credential store, automatic staging or PR comment is used.
Other runtimes should use visible context or their own authorized export tools.
"""
import argparse
import json
from pathlib import Path
import subprocess


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--branch")
    parser.add_argument("--session-dir", type=Path)
    parser.add_argument("--extract-json", action="store_true", help="Explicitly emit matching prompt text to stdout for private local synthesis")
    parser.add_argument("--dry-run", action="store_true", help="Report counts only; no prompt preview")
    args = parser.parse_args()
    try:
        branch = args.branch or subprocess.check_output(["git", "branch", "--show-current"], text=True, stderr=subprocess.DEVNULL).strip()
        if not branch:
            raise ValueError("No named branch")
        directory = args.session_dir or Path.home() / ".claude/projects" / str(Path.cwd()).replace("/", "-")
        files = sorted(directory.glob("*.jsonl")) if directory.is_dir() else []
        if not files:
            print(json.dumps({"error": "No sessions found; use visible context for a sanitized manual record."}))
            return 1
        prompts = []
        seen = set()
        malformed = 0
        for file in files:
            if file.is_symlink():
                raise ValueError("Session path is a symlink")
            for line in file.read_text().splitlines():
                try:
                    item = json.loads(line)
                except json.JSONDecodeError:
                    malformed += 1
                    continue
                if item.get("type") != "user" or item.get("gitBranch") != branch:
                    continue
                content = item.get("message", {}).get("content", "")
                if isinstance(content, list):
                    content = "\n".join(block.get("text", "") for block in content if isinstance(block, dict) and block.get("type") == "text")
                if isinstance(content, str) and content.strip() and content not in seen:
                    seen.add(content)
                    prompts.append({"text": content.strip()})
        if malformed:
            print(json.dumps({"error": "Some session records were malformed; extraction is incomplete."}))
            return 1
        result = {"count": len(prompts), "method": "Local Claude records; no output files or external calls"}
        if args.extract_json and not args.dry_run:
            result["prompts"] = prompts
        print(json.dumps(result, indent=2))
        return 0
    except (OSError, ValueError, subprocess.CalledProcessError):
        print(json.dumps({"error": "Extraction incomplete; not a successful zero-prompt result."}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
