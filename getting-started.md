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

Edit WORKSPACE.md for source-selection guidance. workspace.json declares source roles; store actual source locations in the ignored .local/sources.json or the approved connector configuration. Decide which record owns human scope decisions, which tracker owns delivery status, which documents describe approved intent, and where implementation and measurements can be verified. For work without code or analytics, leave those routes explicitly unavailable rather than inventing evidence.

For an initial local binding, create a JSON file on the destination machine:

```json
{
  "schemaVersion": 1,
  "sources": [
    {"kind": "decisions", "location": "/local/path/to/existing/records", "authority": "Accepted decisions"}
  ]
}
```

Supply `--bindings /local/path/source-bindings.json` during init, with the same selection used in the preview and apply. Only location metadata is written to .local/sources.json, with private file permissions. Source content is never read or imported by setup. You may edit that local file later; it is excluded from the managed/public baseline and recipe. URL credentials and query parameters are refused; use the approved connector for authentication. Empty bindings are valid until a task needs a source. Existing non-empty workspace.json source locations remain readable for compatibility but should not be shared as a setup recipe.

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

## 6. Reproduce the setup on another machine

Export a baseline setup recipe from the workspace:

```sh
node plugin/bin/workspace.js recipe ../my-product --output setup-recipe.json
node plugin/bin/workspace.js recipe ../my-product --output setup-recipe.json --apply
```

The recipe records only schema, bundle fingerprint, runtime and selected skills. It does not contain local bindings, private content, task history, credentials, home settings, plugins or hooks. Local scaffold/instruction edits are excluded with a warning. A changed managed skill blocks export because the clean bundle cannot reproduce it; review that workflow in its maintained source first. The recipe describes the reviewed baseline, not a backup of every local customization.

Preserve the exact reviewed framework source checkout or a self-contained package archive alongside the recipe. To create an archive locally from that checkout:

```sh
cd plugin
npm pack --ignore-scripts --offline --registry=https://registry.npmjs.org/
```

This creates a local archive without publishing it. Record its checksum and source revision. The package version is still the unreleased source preview's existing version, so a filename/version alone does not identify its contents. Do not replace the preserved archive with npm latest and expect the same bundle.

On the destination, install the appropriate Node and agent runtime, unpack that exact archive and place the exported recipe beside it. Create your own local bindings file as in step 3, then preview and apply:

```sh
node package/bin/workspace.js init ./my-workspace --recipe ./setup-recipe.json --bindings ./local-bindings.json
node package/bin/workspace.js init ./my-workspace --recipe ./setup-recipe.json --bindings ./local-bindings.json --apply
node package/bin/workspace.js doctor ./my-workspace
node package/bin/workspace.js start ./my-workspace --focus "Review a product question. Done when the next decision and evidence are clear."
```

Omit --bindings from both init commands if sources are not yet configured. The archive contains selected skill resources; it does not require Git metadata, access to the skill-source repository, or a Personal/work-content checkout. A recipe/bundle mismatch is refused instead of silently selecting newer instructions. Start previews; add --apply to launch Codex or Claude, or use the displayed prompt manually in Cursor.

Authenticate the intended accounts and install any additional plugins or private policy overlays separately. Private information remains in its existing local stores or connected services; moving to another machine may require reconnecting those sources, not packaging their contents. Optional private backups remain an independent choice.

Verify one actual task and fresh-session continuation on the destination before calling the environment ready. Files, a recipe round trip and local diagnostics do not prove runtime discovery, live account access, connector behavior or equivalence with every plugin in a previous environment.

## 7. Test recreation locally

You can test the packaged baseline on your current machine before using a second machine. From a reviewed source checkout, preview and run:

```sh
node plugin/bin/workspace.js test-portability --runtime codex --preset starter
node plugin/bin/workspace.js test-portability --runtime codex --preset starter --apply
```

The same subcommand is available through the package entry point (`pm-workspace test-portability`, or `pm-ai-partner test-portability`). It also runs from an extracted archive with `node package/bin/workspace.js test-portability`. Use `--runtime claude` or `--runtime cursor` for another layout, and `--preset evidence` or `--skills name,name` for another bundled selection. Node, npm and tar must be available locally. No dependencies are installed, and npm runs offline with lifecycle scripts disabled and the public registry explicitly selected.

Preview writes nothing. Apply creates a new temporary directory; the command never accepts an existing workspace path. It packs the local framework, records the archive checksum, extracts it without Git metadata, creates a synthetic source workspace, exports a recipe and restores through the extracted CLI. It compares every managed file, checks synthetic private content and local bindings stay excluded, and runs local diagnostics. Child processes use a separate test home and configuration paths. This is configuration isolation, not an operating-system sandbox or network firewall.

The JSON result includes `status`, individual `checks`, `archiveSha256`, `restored` and `report`. Exit status is 0 for a successful preview or baseline check, 1 for a failed applied check, and 2 for invalid arguments or setup errors. Missing prerequisites fail the applied check and retain diagnostics rather than being reported as a pass. Expected unconfigured-source warnings are listed separately. Temporary files are retained until you remove the generated test directory.

Open the generated `INSPECT.md` for the manual steps:

1. Open the reported `restored` directory in a fresh session of your chosen agent. Submit the supplied fictional task prompt. Check that the selected skill comes from this restored workspace and inspect the saved handoff.
2. Open another fresh session in that directory. Submit the supplied continuation prompt and check that the agent uses the handoff to identify the next action.
3. Remove only the generated test directory when finished, or retain the archive, recipe and checksum for another-machine verification.

An automated pass verifies this synthetic baseline recreation. It does not export your current workspace, run an agent, validate live sources or prove that every part of your existing environment is portable. The manual agent sessions may inherit your machine's global instructions, plugins and sign-ins. Test those separately with authorized sources, and use a clean user account or second machine to uncover dependencies hidden by this machine's setup. No npm release is implied by running the command.

## Verify the framework itself

```sh
node --test plugin/test/*.test.js
node plugin/bin/build-workspace-bundle.js --check
```

Tests cover dry-run, all three skill layouts, repeated setup, preserved user edits, symlink conflicts, missing files, prompt arguments and bundled references. They do not certify live editor integrations, real credentials, deployed systems or business outcomes.
