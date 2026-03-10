# [Team Name] — B2B PM Workspace

## What This Is

B2B PM workspace for [product/feature area]. Focused on enterprise customer needs, sales enablement, and account-driven product decisions.

## Current Focus

- **Primary metric:** [e.g., Net Revenue Retention, logo churn rate, expansion ARR]
- **This quarter:** [e.g., Launch SSO/SCIM for Enterprise tier, reduce onboarding time from 6 weeks to 2 weeks]
- **Active deals depending on roadmap:** [number]

## Key Context

### Team
- **Team name:** [Your Team]
- **Mission:** [e.g., "Make [product] the default choice for teams of 50-500"]
- **Key stakeholders:** [e.g., Sales (deal support), CS (retention), Solutions Engineering (implementation)]

### Customer Segments

| Segment | # Accounts | ARR | Key Needs | Churn Risk |
|---------|-----------|-----|-----------|------------|
| Enterprise (500+) | [n] | [$X] | [e.g., SSO, audit logs, SLAs] | [Low/Med/High] |
| Mid-Market (50-500) | [n] | [$X] | [e.g., Team management, integrations] | [Low/Med/High] |
| SMB (<50) | [n] | [$X] | [e.g., Self-serve, simple pricing] | [Low/Med/High] |

### Top Accounts to Know

| Account | ARR | Tier | Status | Key Contact | Notes |
|---------|-----|------|--------|-------------|-------|
| [Acme Corp] | [$X] | Enterprise | [Renewing Q3] | [Name, role] | [e.g., Needs API v2 before renewal] |
| [Beta Inc] | [$X] | Mid-Market | [Expanding] | [Name, role] | [e.g., Adding 3 teams] |
| [Gamma LLC] | [$X] | Enterprise | [At risk] | [Name, role] | [e.g., Competitor eval in progress] |

### Sales-Product Interface

- **Feature request process:** [e.g., Sales logs in Salesforce, PM reviews weekly, prioritized in sprint planning]
- **Deal support process:** [e.g., SE leads, PM joins for roadmap questions only]
- **Competitive loss tracking:** [e.g., Logged in Gong/Salesforce, reviewed monthly]

### Systems We Own

- [Admin console / team management] — [e.g., RBAC, SSO, user provisioning]
- [Billing / subscription management] — [e.g., Stripe integration, usage metering]
- [Integration layer] — [e.g., REST API, webhooks, Zapier]
- [Reporting / analytics] — [e.g., Usage dashboards for admins]

## How to Help

When I ask about:
- **Feature prioritization** → Use `/thought-partner`. Weight by: revenue impact, number of accounts requesting, competitive pressure, engineering cost. Don't just count requests.
- **Competitive analysis** → Use `/competitor-analyst`. Focus on deals lost, not feature lists. Map JTBD, not checkboxes.
- **Customer-facing specs** → Use `/product-brief`. Include: which accounts unblock, revenue at stake, migration path for existing customers.
- **Pricing/packaging** → Use `/devil-advocate`. Challenge: are we giving away enterprise features in lower tiers? Are we pricing on value or cost?

## B2B-Specific Rules

- **Revenue context is mandatory** — Every feature request should include: how many accounts asked, total ARR of those accounts, and whether any are at churn risk. "5 customers want this" is different from "5 customers representing $2M ARR with renewals in 60 days want this."
- **Don't build for one customer** — If only one account needs it (even a big one), explore alternatives: professional services, workaround documentation, or a configuration option. Building bespoke features creates maintenance debt.
- **Competitive features ≠ competitive advantage** — Matching a competitor's checkbox doesn't win deals. Understand *why* you're losing: is it the feature, the positioning, the price, or the relationship?
- **Segment before prioritizing** — A feature that's #1 for SMB and irrelevant for Enterprise is a packaging decision, not a prioritization decision.
- **Sales asks are symptoms, not diagnoses** — "We need feature X to close deal Y" means "deal Y has a blocker." Understand the blocker before committing to a specific feature.

## Constraints

- **Use Mermaid diagrams rather than ASCII art** for customer journey maps, pricing tier comparisons, and deal flow diagrams
- [Add company-specific constraints: security review process, SOC2 requirements, data residency rules, etc.]

## Links

- [CRM / Salesforce]
- [Feature request tracker]
- [Competitive intel wiki]
- [Customer health dashboard]
- [Pricing/packaging docs]
