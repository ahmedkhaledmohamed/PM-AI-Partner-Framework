# Source change review loop

## Inputs and comparison

Load the current scope manifest and prior approved baseline. Obtain fresh source versions from each authoritative system. For Git, compare immutable tree IDs for the scoped path and inspect commits/diffs when they differ. For APIs or datasets, compare versioned schemas, pipeline definitions, contracts, or snapshot metadata as available. Re-run ownership discovery; changes outside known units may reveal an omitted unit or migrated owner. Treat failed access, incomplete pagination, and missing units as review items, never as an empty diff. The inventory denominator and the feature/outcome denominator must be revisited independently.

## Triage each changed unit

Inspect the exact before and after versions and relevant implementation, contracts, tests, flags, configuration, consumers, data lineage, and rollout evidence. Follow dependencies across source units when the behavior crosses ownership boundaries. Record what was read and what remains. Classify the change as one or more of:

- Observed behavior correction or new observation
- Conflict with an approved requirement
- Proposed requirement or contract change
- Expected platform, version, population, or rollout variation
- Ownership or source-location correction
- No material spec change, with a reason
- Unresolved because evidence or authority is missing

An automated comparator creates candidates; it cannot decide whether behavior changed or whether a requirement conflict exists. Review a nested unit even when only its parent tree was reported. Advance the baseline only after all changed in-scope units at the **same exact target revision** have dispositions. If the source moves during review, retain the reviewed revision and queue the newer one.

## Review changed intent

Compare dated decisions, requirement documents, planning tabs, delivery trackers, and stakeholder inputs on their own cadence. Preserve source title, version, retrieval date, row or section, owner, approval state, and cycle. Reconcile moved or duplicated delivery homes and distinguish Epic tracking status from implementation or outcome status. Map each changed need to provisional feature homes and existing requirements; do not update an approved requirement merely because a draft plan changed. Queue owner questions and conflicting versions explicitly.

## Publication and repetition

Regenerate derived views, validate IDs and traces, run proportionate repository checks, obtain the required diff and decision review, and publish through the local branch/PR or equivalent process. Verify the published view and record the new baseline and open questions. Then fetch fresh source versions and continue the next coherent batch.

For a requested autonomous in-session loop, keep a visible queue, report progress periodically, stop on user instruction, and pause only on an actual blocker or required authorization. For durable scheduling, configure an approved scheduler and credentials, run read-only detection first, deduplicate by unit + exact version, and create a review queue or draft change. Do not silently authorize writes, requirement approvals, PR merges, or deployment. Set retry and escalation limits for failed connectors. Distinguish the scheduled detector from the human or delegated reviewer that classifies changes.

Periodically refresh ownership scope as well as source baselines. A zero-change report means only that known sources match the recorded versions. Report the current queue by exact revision and review depth, plus separate feature coverage, source review, requirement authority, rollout, and outcome status. Use the [evaluation guide](evaluation.md) before turning a candidate difference into a development recommendation.
