# Migrate an existing workspace

Workspace model v2 is an unreleased operating-model update. It does not rename or downgrade the existing npm package version. Existing published packages remain unchanged until a separate release is approved.

## What changes

| Earlier pattern | Maintained replacement | Why |
| --- | --- | --- |
| Large root context and duplicate instruction files | Concise AGENTS.md plus a task-specific WORKSPACE.md; compatibility pointers | Keep stable constraints discoverable without loading unrelated background |
| The same skill copied into several template directories | Selected, content-pinned `plugin/skills/` bundle and explicit export procedure | Reduce source drift; public users need no private repository access |
| All skills installed globally by default | Small local preset, explicit larger selections | Limit overlapping metadata and preserve unrelated configuration |
| Branch-named contribution files with conversation excerpts | Dated immutable sanitized synthesis, reviewed under the target policy | Preserve decision context without publishing conversations |
| A new briefing or tracker for each surface | One maintained home for each fact, with linked or derived views | Preserve manual decisions and clarify ownership |
| Status inferred from closure, cancellation or a color | Separate explicit tracking, delivery, scope and evidence states | Avoid mistaking a tracking change for delivered or dropped capability |
| A named draft folder described as private | Explicit repository/document access boundary | Folder names do not control disclosure |

## Apply incrementally

1. Preserve the existing checkout and local instructions. Start from current upstream in an isolated worktree when changing a repository.
2. Preview the initializer against a new temporary project. Inspect the proposed instructions and selected skills before applying them.
3. Choose the relevant changes for the existing workspace. The initializer refuses differing files; compare and merge manually rather than deleting your customizations.
4. Identify the current decision record, tracker, intent, implementation and measurement sources. Record their actual roles; do not migrate confidential evidence into a public template.
5. Add a handoff section to the current substantial task document. Test one real startup and continuation before expanding the setup.
6. Review older skills, hooks and connectors for duplication and applicability. Do not remove safeguards or enable global automation as a cleanup side effect.

Legacy template skill directories now point to the maintained bundle. Copy a complete selected skill directory, including references/scripts, when migrating an existing installation. The v2 local CLI does not update or uninstall existing global skills. Its diagnostic reports local modifications without repairing them.

## Legacy installer and integrations

`plugin/bin/install.js` continues to accept older runtime installation flags. Existing different files now cause a conflict rather than being replaced; earlier newly created files can remain if a later legacy copy conflicts. Prefer the v2 initializer's complete preflight for new projects. Legacy connector configuration is a separate explicit operation; verify providers, schemas, accounts and existing settings before using it.

Workspace initialization installs no hooks or MCP configuration. The legacy shell hooks are runtime-specific reminders, not approval enforcement, and are not assumed to work in every runtime. Codex and Claude launch previews are available; Cursor workspace setup is supported but launch remains a manual editor step. Unit tests verify scaffold behavior, not every editor version, SSO flow or live connector.

## Publication

Review current content, reachable history and remote surfaces before changing visibility. Removing a tracked file does not erase earlier commits. History rewrites, visibility changes, package releases and merges require their own applicable authorization. The proposed framework removes tracked outreach material and a legacy conversation-bearing record from its current tree; it makes no claim that historical public exposure has been erased.
