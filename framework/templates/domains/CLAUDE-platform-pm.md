# [Team Name] — Platform PM Workspace

## What This Is

Platform PM workspace for [platform/infrastructure area]. Focused on enabling internal teams (our customers) to build faster and more reliably.

## Current Focus

- **Primary goal:** [e.g., Reduce integration time for new consumers from 2 weeks to 2 days]
- **This quarter:** [e.g., Launch self-serve onboarding, deprecate v1 API, migrate 5 consumers to v2]
- **Active migrations:** [number] in progress

## Key Context

### Team
- **Team name:** [Your Team]
- **Mission:** [e.g., "Make it trivial for any team at [company] to send real-time messages to users"]
- **Key stakeholders:** [e.g., Consumer teams (clients), SRE (reliability), Architecture Review Board]

### Platform Health

| Metric | Current | SLA |
|--------|---------|-----|
| Availability | [e.g., 99.97%] | [e.g., 99.95%] |
| P99 latency | [e.g., 120ms] | [e.g., 200ms] |
| Consumer teams | [e.g., 14] | — |
| Monthly API calls | [e.g., 2.1B] | — |
| Active incidents (P1/P2) | [e.g., 0/1] | — |

### Consumer Teams (Your Customers)

| Team | What They Use | Integration Status | Pain Points |
|------|--------------|-------------------|-------------|
| [Team A] | [e.g., Push API v2] | Migrated | [e.g., None] |
| [Team B] | [e.g., Push API v1] | Migration planned Q2 | [e.g., Rate limiting issues] |
| [Team C] | [e.g., Email + Push] | Onboarding | [e.g., Missing docs for batch API] |

### Systems We Own

- [Core API/Service] — [e.g., RESTful API, gRPC service, event bus]
- [SDK/Client Library] — [e.g., Java SDK, Python SDK, JS SDK]
- [Admin/Config UI] — [e.g., Self-serve dashboard for consumer teams]
- [Data Pipeline] — [e.g., Event logging, analytics pipeline]

### API Surface

- **Current version:** [e.g., v2]
- **Deprecated versions:** [e.g., v1 — EOL June 2026]
- **Docs:** [link to API docs]
- **Breaking change policy:** [e.g., 6-month deprecation window, migration guide required]

## How to Help

When I ask about:
- **Architecture decisions** → Use `/technical-analyst`. Map dependencies, identify blast radius, check for single points of failure.
- **Consumer feedback** → Use `/thought-partner`. Distinguish between "nice to have" requests and systemic platform gaps.
- **Migration planning** → Use `/product-brief`. Include rollback plan, migration timeline per consumer, and success criteria per phase.
- **Incident reviews** → Use `/devil-advocate`. Challenge whether the fix addresses root cause or just the symptom.

## Platform-Specific Rules

- **Backwards compatibility by default** — Breaking changes require a migration guide, deprecation timeline, and consumer-by-consumer rollout plan. No exceptions.
- **Internal customers are still customers** — Their pain points, adoption friction, and feature requests deserve the same rigor as external user research.
- **Measure adoption, not just availability** — A platform with 99.99% uptime and 3 consumers is failing. Track: new integrations per quarter, time-to-first-API-call, consumer NPS.
- **Self-serve is the goal** — If a consumer team needs to file a ticket or DM you to use the platform, that's a product gap, not a support issue.
- **Document decisions, not just APIs** — Consumers need to understand *why* the API works this way, not just *how*. ADRs (Architecture Decision Records) for every significant choice.

## Constraints

- **Use Mermaid diagrams rather than ASCII art** for architecture diagrams, sequence flows, and dependency maps
- [Add company-specific constraints: change management process, SLA commitments, on-call rotation, etc.]

## Links

- [API documentation]
- [Architecture diagrams / wiki]
- [Dashboard: platform health]
- [Dashboard: consumer adoption]
- [On-call runbook]
