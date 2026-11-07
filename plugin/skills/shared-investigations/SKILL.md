---
name: shared-investigations
description: Find, contribute to or reconcile a shared investigation with attributed findings and links to maintained evidence. Use for collaborative research intake and handoffs.
---

# Collaborate on an investigation

Use the workspace's investigation registry and shared record as the collaboration entry point. Existing reports, datasets, queries and visualizations keep their maintained homes; reference the relevant originals instead of making another editable bundle. Read [the record contract](references/records.md) when creating or changing records.

## Find the relevant work

For an investigation ID or question, open the matching record directly. For an unfocused research request, list open investigations with ID, title, coordinator, status and current question; let the contributor choose. Do not interrupt unrelated work with research onboarding or read every investigation's evidence.

Before a contribution, check the current default-branch registry, selected record and open proposals for that ID through an authorized repository reader. Preserve dirty checkouts. When unavailable, label the context as unchecked against upstream rather than assuming local files are current. An open proposal is not an accepted finding.

## Prepare a contribution

Ask which local paths or connected sources the contributor wants considered if they have not selected them. Read those inputs and the relevant referenced evidence; do not inventory a home directory, ingest chat history or download everyone's research. Discover available authorized tools, and state access gaps without changing permissions.

Compare the selected material with existing findings. Distinguish new evidence, a correction, an independent reproduction and an already-shared result. If nothing new is present, explain the comparison and leave the shared workspace unchanged. A copy, reformat or unchanged result does not by itself justify another contribution.

Prepare an attributed account using the workspace's contribution template. State the question, method and inspected scope, findings, uncertainty, evidence revisions and effect on the current conclusion. Keep disagreement visible. Reference existing sources by stable ID; add a source reference for new evidence. Newly produced shareable artifacts can have their maintained home in the contribution directory when no other home is established. Keep restricted evidence at its authorized source with an access limitation and enough method detail for an authorized reviewer.

Update the investigation record and registry references together. Show the contributor the proposed shared text, artifact list and full diff before publication, applying local review policy. A linked source does not authorize editing its repository, publishing it or broadening its audience. Repository operations and publication use the environment's existing authenticated workflow; do not require the contributor to type Git commands if their agent can prepare the review.

## Reconcile and continue

The named coordinator reconciles reviewed contributions into the current summary, records accepted decisions and keeps unresolved alternatives visible. Proposing a conclusion does not grant coordinator approval. Retain attribution and evidence references when consolidating findings. Close an investigation only when its owner accepts the outcome and records remaining limitations or follow-up.

Keep the next action and handoff in the shared investigation record. Personal notes may link to it; do not create a second maintained conclusion. Notify collaborators only through explicitly authorized channels.

Run the local investigation checker before review. The bundled Node.js script can list records and check their structural references without contacting services:

```sh
node <installed-skill>/scripts/investigations.cjs list <workspace>
node <installed-skill>/scripts/investigations.cjs check <workspace>
```

The framework's optional investigation preset also installs `scripts/investigations.cjs` as a short entry point. Checks establish reference consistency and local-file existence, not evidence quality, external access, semantic duplication, completeness or actual agent compliance. Review those separately.
