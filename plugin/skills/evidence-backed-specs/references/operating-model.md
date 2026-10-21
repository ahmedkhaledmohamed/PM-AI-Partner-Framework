# Evidence-backed specification operating model

## Goal and completion standard

Represent the **verified ownership boundary** of a team across software, services, public or internal APIs, datasets, models, configuration, and product surfaces. For each area, explain current behavior, intended requirements, scope and exceptions, verification evidence, and unresolved questions. Then compare that baseline with dated goals and customer or stakeholder expectations to identify candidate development work.

The deliverable is a maintained system of records, not a one-time narrative. “Complete” is always scoped and dated: all identified in-scope source units have a review disposition at pinned versions; ownership and inaccessible sources are recorded; requirement sources have been assessed for authority; all material findings have traces and open questions. Completion never means that every behavior has an approved requirement or that production outcome has been measured.

## Work sequence

1. **Frame scope.** Name the team, product boundary, source types, environments, versions, populations, exclusions, and decision makers. Record the date and access limitations.
2. **Census sources.** Enumerate repositories/modules, endpoints, schemas, pipelines, tables, configuration, tests, owner metadata, and approved product or policy sources. Reconcile duplicates and migrations; keep historical and adjacent systems distinct. Track search filters, pagination, retrieval date, and unresolved candidates.
3. **Reconcile feature homes.** Build a provisional feature and outcome map from owner declarations, current product surfaces, historical delivery work, and customer or partner journeys. Map source units and capabilities to features many-to-many. Reconcile migrated systems, umbrella features, specific deliverables, and adjacent owners. Trace a full path across producers, contracts, consumers, client or service behavior, failure modes, instrumentation, and owners. A feature home is the product review unit; source units remain the implementation trace. Neither denominator establishes portfolio completeness by itself.
4. **Record current state.** Write atomic observations from primary sources with exact versions and applicability. Include negative cases and boundaries when supported. Distinguish source-level implementation from enablement, production execution, and measured effects.
5. **Record intended state.** Reconcile each source's authority, cycle, scope, and version before extracting singular, verifiable requirements. Keep historical deliverables, current goals, stakeholder requests, and approved obligations separate. Preserve proposed carryover and conflicting versions explicitly. Capture acceptance criteria and approval provenance; an Epic's tracking status does not establish delivery or cancellation of a shared capability.
6. **Reconcile.** Link requirements, observations, tests, data evidence, and owner decisions. Triage contradictions, missing evidence, rollout variations, and uncovered source units. Publish a readable explorer or index if useful, generated from canonical records rather than edited independently.
7. **Compare goals.** Convert each dated goal or stakeholder expectation to a traceable need, preserving status, owner, cycle, and success measure. Classify specification gaps (missing accepted contract), evidence gaps (behavior or outcome unknown), and candidate implementation differences separately before proposing development. Keep priority separate from evidence confidence and owner acceptance.
8. **Maintain.** Run the change loop and periodic ownership and requirement-source reviews. Publish reviewed changes through the target environment's contribution process and verify the published artifact.

## Roles and decisions

| Role | Responsibility | Cannot establish alone |
| --- | --- | --- |
| Portfolio steward | Owns scope, source census, review queue, and published spec quality | Another team's ownership or requirement approval |
| Domain reviewer | Inspects changed source and verifies claims and affected paths | Production rollout from code presence alone |
| Product or policy owner | Approves intended behavior and changes to it | As-built behavior without technical evidence |
| Data or operations reviewer | Validates datasets, event meaning, rollout, and outcomes | General behavior from a single sample or query |
| Independent diff reviewer | Challenges missing source coverage, provenance, claims, and publication diff | Permission to publish or merge without explicit delegation |

One person may fill multiple roles. Record who made each consequential decision. An agent may help with source discovery, record drafting, diff review, or gap mapping, but approval and deployment authority follow the local rules.

## Coverage report

Report separate dimensions: feature/outcome candidates and ownership decisions; source units identified and owner-confirmed; units with no, partial, or full path review; historical deliverables reconciled; requirement sources assessed and candidates by approval status; source changes awaiting triage; rollout and outcome evidence; unresolved ownership and inaccessible sources. Give each denominator, version, retrieval date, and exclusion. Do not equate a high file-review percentage or a fully mapped capability list with feature or requirements completeness.

## Question and gap-query method

For an evidence question, resolve terms and scope first: asset, platform or API version, population, environment, time window, and whether the question asks about code, release, usage, or outcome. Retrieve linked records and source reviews by stable ID and source unit, then check freshness against current primary sources. Follow the path across producers, contracts, consumers, and measurements; search alternate paths before asserting absence. Return a concise answer with evidence version, applicable scope, and unanswered conditions.

For a new expectation, create or locate a need record and search feature homes, linked requirements, observations, historical delivery, and open change reviews. Compare its success measure and acceptance conditions to approved intent and verified behavior. A draft need with no accepted contract is ordinarily a specification gap; a scoped but unverified path is an evidence gap. Record a candidate implementation difference only when the expected behavior and relevant implementation path have both been examined. Include evidence for and against, the next discriminating check, and the accountable decision owner. Record priority only after the evidence classification, using the team's planning process.

An output should make its layers legible: **approved intent**, **proposed need**, **observed implementation**, **enabled or operating population**, **measured outcome**, and **gap decision**. A layer without evidence remains unknown; do not fill it from a neighboring layer.
