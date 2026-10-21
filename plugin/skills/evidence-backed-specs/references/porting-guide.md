# Port this workflow to another team

This package creates a reusable coordinator skill, a portable record contract, and the procedures below. It does not bundle a source connector, scheduler, live data integration, or publication bot; those must be supplied and authorized in the target environment.

## Required local adapters

1. **Source readers:** authenticated, read-only access to the team's code, APIs, datasets, model registry, configuration, and version history. Record the identity and completeness of each retrieval; use immutable revisions where possible.
2. **Ownership reader:** current owner declarations plus a named person or process to resolve disputed boundaries. Older docs and existing catalogs are candidates, not final ownership evidence.
3. **Intent readers:** approved contracts, decisions, policies, and current goals or stakeholder requests, each with status, owner, date, and provenance.
4. **Artifact store:** a versioned repository or database for canonical records, feature homes, historical deliverables, source assessments, and source baselines. Add schema and cross-reference validation, with generated reader views if useful.
5. **Contribution path:** local review, approval, publication, and rollback mechanism. Keep approval authority explicit.
6. **Optional scheduler:** a durable runner only if ongoing unattended detection is wanted and authorized. It needs scoped credentials, a queue, deduplication, failure reporting, and a human or explicitly delegated decision point.

Do not copy an organization's source material or credential configuration into this skill. Instantiate a local configuration or manifest in the target environment. Start with one representative feature and an end-to-end path that crosses the relevant source types, confirm the record shape and reviewer roles, then expand the owner, feature, and source censuses to the full boundary. A pilot validates the method; it is not proof of portfolio coverage. The [architecture](architecture.md) and [example bundle](../examples/bundle.json) give a local file layout; `python3 skills/evidence-backed-specs/scripts/validate_bundle.py skills/evidence-backed-specs/examples/bundle.json` checks its declared denominator and record links.

## Reuse and agent roles

The `evidence-backed-specs` skill is the portable coordinator. An implementation may assign these scoped roles to agents when delegation is available and authorized:

- **Source census agent:** finds ownership candidates and reconciles migrations and exclusions; submits a reviewable inventory.
- **Domain evidence agent:** inspects one coherent path and drafts observations with exact citations and limitations.
- **Requirements agent:** identifies intended-source status and drafts atomic, testable requirements without approving them.
- **Change reviewer agent:** independently challenges a proposed source disposition and exact publication diff.
- **Gap analyst agent:** maps a dated need to requirements, behavior, rollout, and outcomes, then names decisions and verification work.

These are roles, not necessary separate runtime plugins. Reuse existing code search, data analysis, document collaboration, review, and loop skills where present. Keep each agent's source scope and write permissions explicit; no agent role grants authority to approve a requirement or publish externally by itself.

| Work | Reusable skill in this collection | Local component to provide |
| --- | --- | --- |
| Scope and source inventory | `portfolio-reconciliation` for inventory discipline; `evidence-backed-specs` for ownership and behavior traces | Owner metadata reader and source manifest |
| Code, API, and system behavior | `technical-analyst`; `evidence-backed-specs` for record decisions | Authorized code/contract search and immutable source access |
| Dataset meaning and measured outcomes | `data-analyst` | Approved query access, dataset catalog, and time-window definitions |
| Intended-source review | `document-collaboration` for document handling; `evidence-backed-specs` for authority and status | Decision and policy source access plus accountable approver |
| Diff challenge and publication | Available code-review skill; `evidence-backed-specs` for provenance review | Repository-specific checks, contribution gate, and publication path |
| Repeated in-session checks | `loop` | Wait mechanism and explicit stop condition |
| Durable change detection | No universal skill or agent is sufficient | Approved scheduler, source adapters, version comparator, queue, scoped credentials, and operator |

Create a domain-specific adapter or script only when the target source system needs deterministic comparison or repeated queries. Keep the comparator's output as a **review queue**, not an automatically approved specification update. A local domain reviewer or owner may need to be named; a generic agent cannot resolve that authority by itself.

## First operating cycle

Define the boundary and decision owners. Create the manifest, provisional feature map, and unresolved-source queue. Review one path end to end to calibrate records, then complete the owner and feature discovery and batch source reviews. Reconcile historical deliverables and current intent sources separately. Publish a dated coverage report that exposes unreviewed features, source units, and unapproved requirements. Compare one real goal or customer expectation to the reviewed path and log the gap decision. Only then turn on recurring drift detection; it should update the queue, not claim automatic spec correctness.

Expected outputs are a maintained source manifest, provisional feature map, historical deliverable and requirement-source assessments, source review register, observation and requirement records, need and gap register, change-review history, generated reader view, and dated coverage report. If access, ownership, or approval is missing, publish the uncertainty rather than inventing an answer.
