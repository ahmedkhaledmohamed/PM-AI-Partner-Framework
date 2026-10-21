# Framework contributor instructions

This repository contains a portable product-work operating model, workspace templates and a self-contained skill bundle. Read README.md and the relevant maintained source; do not load every workflow for a narrow change.

- The user workspace scaffold is maintained in `framework/templates/workspace/`; the safe local CLI is `plugin/bin/workspace.js`.
- `plugin/skills/` is the framework's bundled skill snapshot. `plugin/skill-bundle.json` identifies imported files and hashes. Use the reviewed export procedure rather than maintaining duplicate skill templates.
- Core product guidance is in `framework/core/`; task and data examples must be independently written and clearly fictional.
- Keep portable instructions separate from local accounts, connectors, repositories and live evidence. Folder names do not make content private. Never commit private conversations, internal business details, credentials or machine-specific configuration.
- Follow the owner's branch/worktree, exact-diff, sanitized contribution-record, publishing and merge rules. Never self-merge or release a package without explicit authorization.
- The workspace CLI previews changes by default, refuses conflicts and does not install connectors/hooks or edit global settings. Preserve these boundaries when extending it. Keep legacy installation behavior and migration limits explicit.
- Run relevant Node tests and the offline bundle/link/content checks. Test workspace mutations in temporary directories. Do not configure real accounts, run live services or invoke a model just to verify a template.

Use literal descriptive titles and evidence-qualified claims. Prefer one maintained source per fact and derived views with provenance. Existing task documents own handoffs; avoid adding a parallel tracker.
