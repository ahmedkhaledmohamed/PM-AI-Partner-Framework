# Artifact model and traceability

Use structured records as the canonical layer; generate prose and interactive views from them. JSON, YAML, or a database are reasonable if stable IDs, schema checks, and revision history are available. Markdown is useful for scope and explanation, but should not be the only representation of many atomic, cross-linked requirements. The [portable JSON Schema](record.schema.json) defines example record kinds; adapt its fields and enums to local needs while preserving the evidence distinctions below. See [architecture](architecture.md) for the boundary between canonical records, derived views, and review queues.

| Artifact | Minimum fields | Key distinction |
| --- | --- | --- |
| Scope and ownership manifest | Scope ID; unit ID; source kind and locator; owner evidence; inclusion status; baseline version; access status | The denominator for source review, never inferred from existing spec rows |
| Feature or outcome map | Stable feature ID; candidate owner and scope status; source-unit and capability links; relevant needs and requirements; review limits | Product coverage denominator; maps many-to-many to implementation and historical delivery |
| Historical deliverable | Stable ID; cycle; source and status; parent outcome or DoD; candidate feature links; unresolved carryover | Tracking status is not proof of delivery, approved requirement, or whole-feature cancellation |
| Requirement-source assessment | Source revision; authority and approval status; exact rows or sections reviewed; scope disposition; conflicts and unresolved owner questions | A document or workbook is evidence of proposed intent until its authority is resolved |
| Source review | Unit ID; reviewed version; paths and contracts inspected; review depth; disposition; reviewer and date; remaining work | A disposition may be partial or type-only; it does not prove all behavior was examined |
| Observation | Stable ID; atomic observed statement; applicable version/population; primary source citations; verification method; limitations; related requirement IDs | What source evidence currently supports, not what the system ought to do |
| Requirement | Stable ID; singular verifiable statement; scope; status; accountable owner; approval source and date when approved; acceptance criteria; verification plan; related observations | Approved intended behavior is separate from draft goals and code |
| Change review | Unit ID; before/after exact versions; changed paths; impact classification; affected record IDs; evidence; reviewer/date; baseline action | A new revision requires a new review even if an earlier revision was reviewed |
| Goal or stakeholder need | Stable ID; source, owner, date, status, population, desired outcome, success measure | A need is not automatically a requirement or committed scope |
| Gap assessment | Need ID; related requirement and observation IDs; classification; evidence for/against; uncertainty; decision owner; next verification; decision status | Candidate development gaps are different from missing specifications |
| Verification evidence | Claim ID; code, enabled population, execution, measurement, or outcome stage; pinned evidence and limitations | A checked-in code path and a measured customer result are different claims |

Prefer precise citations: repository + immutable commit + path or symbol; API schema/version; dataset snapshot, query, and time window; decision document version and approver. Record retrieval time for mutable systems. Sensitive source material can remain in an access-controlled system; the spec may store a locator and a defensible summary where policy allows.

## Example records

These are illustrative shapes, not a mandated schema or evidence claim:

```json
{
  "id": "OBS-API-001",
  "kind": "observation",
  "statement": "For a valid create request, the service returns an identifier after persistence succeeds.",
  "scope": "API v2, staging environment",
  "evidence": [{"locator": "repo://service@COMMIT/path/handler", "version": "COMMIT", "retrievedAt": "2026-01-01T12:00:00Z", "method": "code inspection"}],
  "verification": "Handler and focused tests inspected; production behavior unverified.",
  "limitations": ["Production rollout and persistence outcome not verified."],
  "relatedRequirementIds": ["REQ-API-001"]
}
```

```json
{
  "id": "REQ-API-001",
  "kind": "requirement",
  "status": "proposed",
  "statement": "When a valid create request is accepted, the service shall return a stable identifier.",
  "scope": "API v2",
  "owner": "API product owner",
  "source": {"locator": "decision://create-contract-draft-v2", "version": "draft-v2", "retrievedAt": "2026-01-01T12:00:00Z", "method": "document review"},
  "acceptanceCriteria": ["A successful response contains a nonempty stable identifier."],
  "verification": "Contract test and approved API review",
  "relatedObservationIds": ["OBS-API-001"]
}
```

Use `approved` only when the decision source identifies the accountable approver and approval date. Supersede records rather than reusing an ID for a different obligation. Preserve historical revisions and explicit links among needs, requirements, observations, source units, tests, and gap assessments. Validate references and required fields at publication time; a passing schema check cannot validate truth or completeness.

For datasets, an observation should include lineage, transformation, grain, partition, freshness, null handling, access constraints, and quality checks when relevant. For APIs, include version, inputs and outputs, error semantics, authentication boundary, and consumer compatibility. For product surfaces, include platform, format, gating, accessibility, and measurement where relevant. Stable links between these records should be checked independently of schema validity; the [minimal example](../examples/bundle.json) and [validator](../scripts/validate_bundle.py) show declared-scope and reference checks without pretending to judge claim truth.
