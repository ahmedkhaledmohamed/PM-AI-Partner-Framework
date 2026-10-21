# Portable specification system architecture

The system has five boundaries. Keep the connectors and credentials in the target environment; keep the record contract and review method portable.

1. **Source adapters** read code, owner metadata, contracts, documents, planning systems, datasets, flags, releases, and telemetry. Each retrieval records the source identity, query or filter, pagination result, access status, time, and immutable version or snapshot where possible. A failed read is a review item.
2. **Pinned evidence** preserves locators and versions, not a silently refreshed paraphrase. Separate implementation, enablement, execution, measurement, and outcome evidence. Historical delivery records retain their original cycle and tracking status.
3. **Canonical records** hold the scope manifest, feature map, source reviews, observations, requirements, needs, source assessments, verification evidence, change reviews, and gap assessments. IDs and many-to-many links survive source moves. A source version change creates a new review item rather than changing approved intent.
4. **Validation and review** check record shape, duplicate IDs, references, the declared scope denominator, exact source versions, evidence quality, authority, and negative claims. Deterministic checks can establish structural consistency; accountable reviewers decide meaning and approval.
5. **Reader views** derive indexes, diagrams, answers, and interactive explorers from canonical records. Publishing a view does not promote proposed content to approved. The contribution process records who reviewed and published each revision.

```text
authorized source readers ──> pinned evidence ──> canonical records
          │                                         │
          └──> exact-version change queue           ├──> validators + review
                                                    └──> generated views + answers
```

Run two change loops: source and ownership drift for what exists, and intent drift for decisions, plans, and stakeholder needs. Deduplicate queue items by source unit plus exact target version. A detector proposes work; a reviewer inspects the changed path and chooses a disposition. Advance a baseline only for the reviewed revision and declared scope. Never infer a complete portfolio from one inventory or a zero-change queue.

The [example bundle](../examples/bundle.json) and [validator](../scripts/validate_bundle.py) demonstrate local record links and declared-scope checks. They are deliberately file-based and read-only. Replace their source reader and publication path for the target environment; do not copy private source material into this portable package.
