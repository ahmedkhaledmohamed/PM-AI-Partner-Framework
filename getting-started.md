# Set up a product workspace

Workspace model v2 is available in this source tree. The older published npm package does not yet contain this update; a package release is a separate step.

## 1. Preview a local project

From the framework checkout:

```sh
node plugin/bin/workspace.js init ../my-product --runtime codex --preset starter
```

Choose `codex`, `claude` or `cursor`. The starter preset installs workspace-context, thought-partner and writer. Use `--preset product` for the broader product workflows, `--preset evidence` for specification work, or `--skills workspace-context,data-analyst` for a named selection. Review the chosen skill instructions before applying.

## 2. Apply and inspect

```sh
node plugin/bin/workspace.js init ../my-product --runtime codex --preset starter --apply
node plugin/bin/workspace.js doctor ../my-product
```

The initializer preflights every target and refuses the entire apply when an existing file differs. Repeating the identical selection is harmless. It does not overwrite local edits or automatically migrate another preset. If adopting an existing workspace, use the [migration guide](framework/core/workspace-migration.md).

Created content includes AGENTS.md, a compatibility CLAUDE.md, WORKSPACE.md, workspace.json, a task-document template, small working/published/archive directories, selected local skills and an installation manifest. No Git repository/remote, model dependency, MCP configuration, hook or global instruction is created. Core files and skills are content-pinned to the bundled manifest.

## 3. Set your sources and policy

Edit WORKSPACE.md and the source locations in workspace.json. Decide which record owns human scope decisions, which tracker owns delivery status, which documents describe approved intent, and where implementation and measurements can be verified. For work without code or analytics, leave those routes explicitly unavailable rather than inventing evidence.

Specify the applicable review and authorization rules in AGENTS.md. Keep private mappings and credentials in authorized private storage such as an ignored .local directory or an approved connector, not in public templates. A workspace folder name does not make it private.

`doctor` reports unconfigured sources, missing files and local modifications. It reads local configuration and files only. It also warns about same-named user-level skills without reading their contents or changing them. It does not authenticate, contact a tracker, verify live accounts or determine whether a fact is current. Modified templates are expected after customization; preserve them and compare future changes manually.

## 4. Start a task

```sh
node plugin/bin/workspace.js start ../my-product --focus "Review a product request and propose the next decision"
```

This previews the command and prompt. Add `--apply` when you want to launch the independently installed Codex or Claude executable. Codex uses the project's `.agents/skills`; Claude uses `.claude/skills`; Cursor uses `.cursor/skills`. Installation layout is checked locally; runtime behavior should also be checked in the installed editor version. Hooks and slash-command support are runtime-specific, not a universal interface.

For Cursor, open the target folder in the editor and submit the displayed prompt. The CLI does not guess an editor launch command. You can also launch Codex directly in the target project and say: `Read workspace context, then focus on <task>. Done when <result>.`

## 5. Continue existing work

Put a concise handoff in the existing task document. Then preview continuation:

```sh
node plugin/bin/workspace.js start ../my-product --task working/task.md
```

This starts a new task-context prompt when applied; it does not select a native chat history or reconstruct unrelated sessions. Use your runtime's own session-resume UI/command when you want that history. A handoff preserves decisions and next actions but does not grant new approval.

## Verify the framework itself

```sh
node --test plugin/test/*.test.js
node plugin/bin/build-workspace-bundle.js --check
```

Tests cover dry-run, all three skill layouts, repeated setup, preserved user edits, symlink conflicts, missing files, prompt arguments and bundled references. They do not certify live editor integrations, real credentials, deployed systems or business outcomes.
