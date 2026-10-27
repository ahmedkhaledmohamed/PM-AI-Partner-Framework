# Skill distribution and maintenance

The portable skill collection owns reusable workflow instructions. The framework owns workspace architecture, documentation, templates, installer behavior and a selected self-contained skill bundle.

## Reviewed snapshots

`plugin/skill-bundle.json` lists every bundled skill file and hash, identifies portable imports versus framework-owned skills, and records a content snapshot hash for the imports. A content snapshot does not claim a remote commit was released or public. Users can run the framework without access to the skill source repository.

The starter preset selects context, thought partnership and writing. The product preset adds the principal evidence, planning, reconciliation and execution workflows. The evidence preset includes source-backed specifications and their references/scripts. Cursor-specific helpers, evaluation-framework adapters and other optional domain extensions remain in the separate collection.

## Export procedure

Keep setup distribution distinct from information storage. The framework's recipe and preserved package archive recreate a reviewed runtime/skill baseline. Machine-local source bindings, credentials and private content stay in local stores or connected services. An owner's optional private backup is independent of the framework and is not required to use its bundled skills. Recipes do not replace separately maintained private policy overlays or native runtime/plugin setup.

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

## Behavioral evidence and dependency review

The source collection maintains `catalog.json` for runtime targets/dependency groups and `evals/cases.json` for fictional behavioral cases. Review the selected skill's actual requirements before exporting. The framework bundles workflow instructions and their required resources, not external evaluation frameworks, private traces or every optional integration.

Run selected cases against the source skill and the exported copy when a change affects behavior; use the same inputs and record runtime/model/skill versions, actions, semantic reviewer findings and unverified cases. Definition validation and synthetic evaluator unit tests do not prove an agent followed a skill. Do not run a model or export traces automatically during bundling. See the source collection's `evals/README.md` and `PORTING.md` for the recorded-run format and lesson-placement procedure.

Keep a changing task fact in its working document, a personal policy in local instructions, a repository convention in its repository, and a general repeatable procedure in its skill. A demonstrated failure can justify a behavioral case; it does not automatically justify another global rule. Propose and review the smallest correction rather than synchronizing installed directories or rewriting global configuration.
