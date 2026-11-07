# Shared investigation workspace

Use this space to find ongoing questions, understand current findings and propose an attributed contribution. Existing research keeps its maintained source. Sharing context means sharing a readable record and accessible evidence references, not collecting everyone's local files.

## Start and contribute

Tell your agent: “Show open investigations.” It reads the registry and lists IDs, coordinators and questions. Choose an ID, then ask: “Read the current shared context for this investigation. Compare it with these selected local files and propose anything new for review.” Supply the paths or connected sources you authorize it to inspect.

The agent checks the current default branch and open proposals, reads the relevant originals and prepares a contribution if there is new evidence, a correction or an independent reproduction. An unchanged result can correctly produce no update. It must show what would be shared before publication under your local policy. Repository access and an authenticated publishing/review tool are supplied by your environment; this setup does not configure accounts or require you to type Git commands.

## Open an investigation

Copy `investigations/_template/` to `investigations/<stable-id>/`, remove the unused contribution template from that new record if appropriate, and add its registry entry. Select a coordinator or record `null` until someone accepts. Record the question, current uncertainty and next action before gathering more evidence. The registry's `sources` entries identify each artifact's owner, maintained location, revision and access limitation. The installed shared-investigations skill includes the record contract.

## Review and reconcile

Use `investigations/_template/contribution/` to prepare each proposed contribution. Its readable account explains the method, findings and limitations; its manifest binds attribution, evidence IDs and the inspected revision for each source. Preserve those inspected revisions when the current evidence later advances. Reference established evidence at its existing source. Store newly produced shareable artifacts alongside a contribution only when that is their chosen maintained home. Restricted evidence stays at its authorized source; record the access gap without changing permissions.

Submit through your team's existing review process. The coordinator reconciles accepted findings into the investigation record, preserving disagreement and source references. Keep open questions, decisions and next action there so another person can continue. Closing a record requires an accepted outcome and any remaining limitations.

## Check records

Requires Node.js 18+; no dependency install, database, connector or model is needed:

```sh
node scripts/investigations.cjs list .
node scripts/investigations.cjs check .
```

Add the check command to the existing CI review job and require that check through the repository's normal administration process. The initializer does not change remote protection or approval permissions. Checks validate IDs, attribution, local paths and reference consistency. They cannot establish evidence quality, source access, semantic duplication, reviewer approval or that an agent followed the procedure.

The registry starts empty. Connect only the sources needed for selected work. A source becoming unavailable is a stated limitation, not permission to import private material or invent a replacement.
