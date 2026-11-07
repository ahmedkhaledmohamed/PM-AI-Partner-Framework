# Shared investigation records

Use this contract for the optional framework scaffold and bundled checker. An existing collaboration system can use its own records if it provides the same identities, attribution, maintained-source ownership and review boundaries; do not migrate it just to match a directory layout.

`investigations/registry.json` has `schemaVersion: 1`, `sources` and `investigations` arrays. Sources have a unique `id`, `title`, `owner`, `location`, `revision` and `access` (`shared` or `restricted`). A location is a stable HTTPS reference or a file relative to the shared workspace. Use the actual inspected revision or an explicit limitation such as `unversioned; inspected YYYY-MM-DD`; do not invent a hash. Restricted sources also need an `accessNote` explaining the access limitation. Credentials and expiring authorization links do not belong in shared records.

An investigation has a unique `id`, `title`, `question`, `status` (`open`, `paused` or `closed`), `coordinator` (name or explicit `null`), `contributors` (names), `record` (workspace-relative Markdown file), `sourceIds` and `contributions` (workspace-relative manifest paths). Names identify contributors, not assumed consent or availability. The readable record owns the current summary, alternatives, open questions, accepted decisions and next action.

A contribution manifest has `schemaVersion: 1`, `id`, `investigationId`, `contributor`, `kind` (`finding`, `correction` or `reproduction`), `summary` (Markdown file relative to its manifest), `sourceIds`, `sourceRevisions` (an ID-to-inspected-revision map) and `newArtifactSourceIds`. The latter is a subset of `sourceIds` identifying newly produced artifacts maintained beside the contribution. Their registered locations must point inside that contribution directory. Existing evidence is referenced without including it again. All contribution source IDs must also be declared by its investigation.

Keep the registry's source binding once. Each contribution preserves its inspected revisions even when the current registry later points to newer evidence. Use an explicit unversioned/date limitation if the source has no version; never silently rewrite an older contribution’s provenance. Contributions reference the same ID, allowing several people to cite one artifact without copying its metadata or content. If an existing source needs a different owner or maintained location, propose that migration explicitly; do not silently rebind the ID during intake. The checker detects duplicate IDs and locations but cannot determine whether two different URLs contain the same research.

For example, an independently fictional investigation might use:

```json
{
  "schemaVersion": 1,
  "sources": [{
    "id": "draft-study",
    "title": "Draft recovery usability study",
    "owner": "Notes research team",
    "location": "https://example.org/research/draft-recovery",
    "revision": "study-3",
    "access": "restricted",
    "accessNote": "Requires the research team's existing access."
  }],
  "investigations": [{
    "id": "draft-recovery",
    "title": "Recovering unsaved drafts",
    "question": "Where do people lose a draft during recovery?",
    "status": "open",
    "coordinator": "Casey",
    "contributors": ["Morgan"],
    "record": "investigations/draft-recovery/README.md",
    "sourceIds": ["draft-study"],
    "contributions": []
  }]
}
```

List and check commands read only declared records and workspace-relative files. They do not fetch external evidence, follow local source bindings, synchronize repositories or judge findings. For CI, run `node scripts/investigations.cjs check .` using the installed framework profile. Configure the team's existing PR checks to require it; setup does not change remote branch protection or reviewer permissions.
