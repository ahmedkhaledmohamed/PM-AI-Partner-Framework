# Skill distribution and maintenance

The portable skill collection owns reusable workflow instructions. The framework owns workspace architecture, documentation, templates, installer behavior and a selected self-contained skill bundle.

## Reviewed snapshots

`plugin/skill-bundle.json` lists every bundled skill file and hash, identifies portable imports versus framework-owned skills, and records a content snapshot hash for the imports. A content snapshot does not claim a remote commit was released or public. Users can run the framework without access to the skill source repository.

The starter preset selects context, thought partnership and writing. The product preset adds the principal evidence, planning, reconciliation and execution workflows. The evidence preset includes source-backed specifications and their references/scripts. Cursor-specific helpers, evaluation-framework adapters and other optional domain extensions remain in the separate collection.

## Export procedure

1. Review the selected source skills and their references for portability, source rights, private details and dependencies. Do not export an installed directory wholesale.
2. Use an explicitly selected local source checkout:

```sh
node plugin/bin/build-workspace-bundle.js --skills-source ../agent-skills
node plugin/bin/build-workspace-bundle.js --check
```

The exporter replaces only its named imported skill directories and the derived workspace-template directory. Run it in a clean review worktree and inspect the complete diff. It never downloads or discovers user-installed skills.

3. Review changed instructions and validate representative outcomes. Check source/template hashes and tests. Publish through the owner's reviewed branch and PR workflow.

Maintain workspace templates in `framework/templates/workspace/`; `plugin/workspace-template/` is a derived package copy. Maintain imported skill content in its source collection and export it. The current bundle is selected from the portable collection. Framework-specific skill entries, if added later, must identify that origin explicitly. Do not manually update the retired template copies or silently replace a user's installed customizations.

## Releases and rights

The existing framework package declares MIT licensing. Do not infer rights to third-party plugins or export their resources. A private source repository does not need to become public for a reviewed framework bundle to work. The skill collection's own license and visibility are separate owner decisions.

Package publication is not part of a source update. Verify package contents in a temporary pack before a separately approved release. Do not fetch framework updates or synchronize private workspaces automatically.
