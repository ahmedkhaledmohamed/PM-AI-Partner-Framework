---
name: strategic-clarity
description: "Guided workflow for establishing team identity, boundaries, and strategic clarity. Generates team charter documents, creates ownership matrices, maps stakeholder boundaries, and produces capability audit reports. Use when starting a new role, inheriting ambiguity, when a team lacks clear identity, or when you need to define 'what we own' vs 'what we don't'. Triggers include 'strategic clarity', 'team identity', 'new role', 'inherited ambiguity', 'what does my team own', or 'define our boundaries'."
version: 1.0.0
author: Ahmed Khaled Mohamed <ahmd.khaled.a.mohamed@gmail.com>
license: MIT
allowed-tools: Read, Glob, Grep
argument-hint: [phase: absorb/audit/articulate/align]
---

# Strategic Clarity Workflow

## Overview

A 4-phase workflow for establishing team identity and strategic positioning.

```
+---------+    +---------+    +-----------+    +---------+
| ABSORB  | -> |  AUDIT  | -> | ARTICULATE| -> |  ALIGN  |
|         |    |         |    |           |    |         |
| Context |    | Reality |    | Identity  |    | Buy-in  |
+---------+    +---------+    +-----------+    +---------+
```

**When to use:** Starting a new role, inherited ambiguity, team lacks clear identity
**Output:** Team charter, value proposition, capability audit

### Advanced Patterns

1. **The inherited narrative trap** — When you inherit a team, everyone will tell you what the team does. Their descriptions will conflict. Don't average them — map the contradictions. Where people disagree about team scope is exactly where boundaries are unclear and where future conflicts will emerge. The contradictions are the diagnosis
2. **Capability vs. responsibility** — Teams often confuse what they *can* do with what they *should* do. A messaging team that *can* build email doesn't mean email is their responsibility. During the audit phase, separate capabilities (what the code does) from responsibilities (what stakeholders expect). Mismatches between these create the biggest organizational friction
3. **The "without us" test** — To find your team's real value, ask: "If our team disappeared tomorrow, what would break first?" The thing that breaks first is your core value. The thing that breaks second is your growth opportunity. The thing nobody notices is your candidate for deprecation. This test cuts through aspirational mission statements to find ground truth
4. **Adjacent team mapping** — Don't just define what you own. Explicitly define the boundary with each adjacent team: "We own the push delivery pipeline. Platform team owns the notification scheduling. We hand off at [specific interface]." Vague boundaries between teams cause more organizational damage than vague team charters. Name the seams
5. **The 30-60-90 checkpoint** — Strategic clarity isn't a one-time exercise. At 30 days, you should have hypotheses. At 60 days, you should have a charter draft. At 90 days, you should have stakeholder alignment. If you're still "absorbing" at day 60, you're avoiding the hard work of articulating a position. Set a deadline for yourself

## Quick Start

Tell me your situation and phase (`absorb`, `audit`, `articulate`, or `align`) and I'll walk you through it — or say "starting fresh" to begin at Phase 1.

---

## Phase 1: ABSORB (Week 1)

### Goal
Understand what exists before forming opinions.

### Activities
- Read all existing documentation
- Meet with team members
- Study handover notes
- Review historical decisions

### AI Assistance — Example Output

When you share your notes, here is the kind of synthesis you will receive:

```markdown
## Context Synthesis: Notifications Team (Week 1)

### Key Themes
1. **Ownership confusion** — Three teams touch push notifications; no single owner for delivery reliability
2. **Legacy migration** — Half the codebase is on the old gateway; migration stalled 6 months ago
3. **Metric mismatch** — PM tracks "notifications sent"; engineering tracks "delivery success rate"

### Contradictions Found
- Design says your team owns in-app messaging; backend says Platform does
- Manager expects email within scope; tech lead says it was explicitly removed last quarter

### Still Unclear
- Who approved the scope change for email? (Ask: @director-eng or check Q3 planning doc)
- What SLA does the old gateway actually meet? (Check: `monitoring/push-gateway-sla.md`)
- Is the mobile SDK integration your team's job or Mobile Platform's? (Ask: @mobile-pm)
```

### Phase 1 Checklist
- [ ] Reading notes captured
- [ ] Key questions documented
- [ ] Initial mental model forming

---

## Phase 2: AUDIT (Week 2)

### Goal
Understand what actually exists vs. what's claimed.

### Activities
- Systematic codebase review
- Map capabilities to code
- Identify gaps
- Compare reality to documentation

### AI Assistance — Example Output

Share your team's claimed responsibilities and you will receive a filled audit:

```markdown
# Capability Audit: Notifications Team

| Capability | Status | Evidence | Gap | Impact |
|------------|--------|----------|-----|--------|
| Push delivery (iOS) | Exists | `services/push/apns-gateway.ts` | — | — |
| Push delivery (Android) | Exists | `services/push/fcm-gateway.ts` | — | — |
| In-app notification center | Partial | `components/NotificationList.tsx` | No read/unread state sync | Users see stale badges |
| Webhook dispatch | Partial | `services/webhooks/dispatch.ts` | No retry logic; fire-and-forget | Partners miss ~8% of events |
| Notification analytics | Missing | — | No delivery tracking pipeline | Cannot measure SLA compliance |
```

### Phase 2 Checklist
- [ ] Capability audit document created
- [ ] Gap inventory prioritized
- [ ] Reality vs. perception documented

### Output: Capability Audit Template

```markdown
# Capability Audit: [Team Name]

| Capability | Status | Evidence | Gap | Impact |
|------------|--------|----------|-----|--------|
| [Capability 1] | Exists | [code/system] | — | — |
| [Capability 2] | Partial | [code/system] | [missing piece] | [user impact] |
| [Capability 3] | Missing | — | [full description] | [business impact] |
```

---

## Phase 3: ARTICULATE (Week 3)

### Goal
Define and document team identity clearly.

### Activities
- Draft mission statement
- Define responsibility boundaries
- Create value proposition
- Build communication frameworks

### AI Assistance — Example Output

Share what you own vs. don't own and you will receive a draft like:

```markdown
# Notifications Team Charter

## Mission
We ensure every user-facing notification (push, in-app, webhook) is delivered reliably and on time, so product teams can reach users without building delivery infrastructure.

## We Own
- Push notification delivery pipeline (iOS APNs, Android FCM)
- In-app notification center UI and API
- Webhook dispatch for third-party integrations
- Delivery reliability SLAs (99.5% within 30 s)

## We Don't Own
- Notification content/copy — owned by each product team
- Email delivery — owned by Comms Platform
- Notification scheduling/orchestration — owned by Platform team
- Mobile SDK integration — owned by Mobile Platform

## Value Proposition
Without us: Product teams build one-off delivery hacks; delivery rate drops below 90%; no unified notification UX.
With us: Single reliable pipeline handling 4M+ daily notifications with <30 s p95 latency.

## Key Metrics
- Delivery success rate (target: 99.5%)
- p95 delivery latency (target: <30 s)
- Notification opt-out rate (monitor, not own)

## Boundaries
| Area | Us | Them |
|------|----|----- |
| Push delivery | Gateway → device | Platform: scheduling; Product: content |
| In-app notifications | Render + store | Mobile Platform: SDK surface |
| Webhooks | Dispatch + retry | Partner Eng: endpoint registration |
```

### Phase 3 Checklist
- [ ] Team charter drafted
- [ ] Value proposition documented
- [ ] Boundary contract defined

### Output: Team Charter Template

```markdown
# [Team Name] Charter

## Mission
[One sentence: what we do and why it matters]

## We Own
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

## We Don't Own
- [Adjacent area 1] — owned by [other team]
- [Adjacent area 2] — owned by [other team]

## Value Proposition
Without us: [what breaks or doesn't exist]
With us: [what users/business gets]

## Key Metrics
- [Primary metric we move]
- [Secondary metric]

## Boundaries
| Area | Us | Them |
|------|----|----- |
| [Shared area] | [Our part] | [Their part] |
```

---

## Phase 4: ALIGN (Week 4)

### Goal
Validate and socialize the work.

### Activities
- Present to manager
- Discuss with peer PMs
- Gather feedback
- Iterate based on input

### AI Assistance — Example Output

Tell me who you are presenting to and I will role-play their pushback:

```
You: "I'm presenting to VP Engineering. She cares about headcount efficiency and will push
back on us not owning email."

[Role-play as VP Engineering]:
"I see you've carved email out. That means I need a separate team for email delivery — that's
two teams doing similar plumbing. Convince me the split is worth the headcount."

Preparation notes:
- Lead with data: push volume (4M/day) vs email volume (200K/day) — different scaling profiles
- Emphasize: push requires real-time SLA; email is batch-tolerant — different operational models
- Offer: "We'll own the shared notification routing layer so Comms Platform doesn't rebuild it"
```

### Phase 4 Checklist
- [ ] Manager alignment achieved
- [ ] Peer PM feedback incorporated
- [ ] Final documents published
- [ ] Communication plan for broader sharing

---

## Document Checklist

| Document | Location | Status |
|----------|----------|--------|
| Reading notes | `context/` | [ ] |
| Capability audit | `analysis/capability-audit.md` | [ ] |
| Team charter | `strategy/team-charter.md` | [ ] |
| Value proposition | `strategy/value-proposition.md` | [ ] |
| Stakeholder map | `analysis/stakeholder-map.md` | [ ] |

---

## Success Criteria

By the end of this workflow, you should be able to:

- [ ] Articulate team value in one sentence
- [ ] Explain boundary with adjacent teams clearly
- [ ] Have manager endorsement of your framing
- [ ] Have peer PMs understand what you own
- [ ] Feed gap inventory into roadmap planning

