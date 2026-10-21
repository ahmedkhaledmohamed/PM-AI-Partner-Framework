---
name: evidence-backed-specs
description: Build and maintain traceable specifications for a team's owned software, APIs, data products, or other source-backed systems; answer questions and assess new expectations against them.
---

# Maintain evidence-backed specifications

Use this skill when a team needs a reviewable account of its owned features and deliverables, the systems that implement them, intended requirements, and possible differences from a new goal or stakeholder need. Select the mode from the request: **establish coverage**, **review changes**, **answer from evidence**, or **assess a gap**. Read the matching reference below rather than loading every procedure.

## Invariants

- Establish the ownership boundary from current owner declarations and accountable people. A catalog row count, search result count, or empty change report is not proof of complete coverage. Preserve disputed, adjacent, retired, and inaccessible sources visibly.
- Track feature or outcome coverage separately from source-unit review depth. A complete code-file census, capability inventory, or feature map alone cannot establish the other two.
- Keep **observed behavior**, **approved intended requirement**, **proposed need**, **rollout**, and **measured outcome** separate. Code, schemas, dataset definitions, tests, documentation, and runtime data answer different questions. Promote a requirement to approved only with an accountable decision and date.
- Pin primary evidence to a source revision or data snapshot and retrieval time. Trace claims to the narrowest relevant file, symbol, contract, query, test, or decision. State what remains unverified.
- Never silently rewrite an approved requirement to match changed implementation. A change creates a review item and, where warranted, an explicit conflict or change proposal.
- Respect the target environment's access rules, publication gates, identity, and merge authority. A reviewer agent can critique evidence and a diff; it cannot confer human approval unless that authority was explicitly granted.

## Modes

**Establish coverage:** Read [operating model](references/operating-model.md), [artifact model](references/artifact-model.md), and [architecture](references/architecture.md). Define the team's boundary, enumerate source systems and ownership evidence, reconcile historical deliverables and current feature homes, then inspect coherent end-to-end paths. Publish machine-readable records with derived human-readable views. Report source, feature, requirement-source, rollout, and outcome coverage separately, with unknowns visible. Do not call the suite complete without a dated boundary and explicit dispositions for the declared scope.

**Review changes:** Read [change loop](references/change-loop.md). Compare current source versions with pinned baselines; inspect actual diffs, affected contracts, behavior, flags, tests, consumers, data lineage, and adjacent owners. Record a disposition for every changed in-scope unit, including units that produce no spec change. Advance a baseline only after all changed units at that exact revision are triaged. Use a supported scheduler only if durable automation was requested and configured; an in-session loop does not continue after the session ends.

**Answer from evidence:** Retrieve the relevant features, requirements, observations, source reviews, and fresh sources when the question depends on the present. Use the [evaluation guide](references/evaluation.md) for consequential answers. State the conclusion with record IDs, source versions, applicable population, and confidence limits. Distinguish implementation availability, enablement, execution or delivery, measurement, and outcomes. A missing record or one empty query does not prove absence.

**Assess a gap:** Establish the goal or stakeholder expectation, its owner, date, status, scope, and success measure. Map it to feature homes, approved requirements, proposed needs, observed behavior, rollout and outcome evidence, then classify each issue as approved-requirement conflict, candidate development gap, specification gap, evidence gap, expected variation, or unverified. Use the [evaluation guide](references/evaluation.md) to challenge absence and conflict claims. Name the evidence and decision owner needed to resolve it. A new idea is input to review, not automatically an obligation.

## Porting

Read [porting guide](references/porting-guide.md) when installing this workflow for another team or runtime. It identifies adapters, review roles, minimum artifacts, and a sample operating cadence. Keep organization-specific source locations, credentials, and sensitive evidence in the target environment; this skill contains no live connector configuration.
