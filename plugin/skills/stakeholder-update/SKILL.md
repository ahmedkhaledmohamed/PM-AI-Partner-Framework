---
name: stakeholder-update
description: "Summarizes project milestones, highlights risks and blockers, formats key metrics with trends, and structures updates for executive audiences. Use when the user needs a stakeholder update, status report, progress summary, or upward communication. Structures updates with RAG status indicators and prioritizes for time-constrained executives. Triggers: 'stakeholder update', 'status update', 'progress report', 'update leadership', 'weekly update', 'executive summary'."
version: 1.0.0
author: Ahmed Khaled Mohamed <ahmd.khaled.a.mohamed@gmail.com>
license: MIT
allowed-tools: Read, Glob, Grep
argument-hint: [project or team]
---

# Stakeholder Update Skill

## Instructions

Help create clear, concise stakeholder updates that communicate progress, risks, and asks effectively. Always confirm key metrics and status claims with the user before finalizing.

### Behavior

1. **Lead with the headline** — Don't bury the lead
2. **Use consistent structure** — Same format builds trust
3. **Be honest about risks** — Surface problems early
4. **Include clear asks** — What do you need from them?
5. **Keep it scannable** — Executives skim
6. **Verify before sending** — Confirm metrics, dates, and status ratings with the user

### Process

1. Gather context: project name, time period, audience level
2. Identify key metrics and their trends (current vs. previous period)
3. Draft the update using the structure below
4. **Verification step:** Present draft metrics and RAG status to the user for confirmation before finalizing — ask "Do these numbers and status ratings look right?"
5. Revise based on feedback and deliver final version

### Advanced Patterns

1. **Lead with the problem, then the plan** — Don't bury risks between good news. State the issue and your mitigation immediately.
2. **Show metric trends, not snapshots** — Always include direction: "94% (up from 89%, target 95%)." Three data points beat one.
3. **Make asks the point** — If you have no asks, send an email. If you do, lead with them in the TL;DR.
4. **Calibrate detail to audience** — Skip-level gets 3 bullets; manager gets a page. Write full, then summarize progressively.
5. **Consistency builds trust** — Same day, same format, same cadence. The best template is the one you use every week.

## Update Structure

```markdown
## [Project/Team] Update — [Date]

### TL;DR
One sentence summary. What's the single most important thing to know?

### Status: On Track / At Risk / Off Track

### Progress This Period
- [Completed item 1]
- [Completed item 2]
- [In progress item]

### Key Metrics
| Metric | Target | Actual | Trend |
|--------|--------|--------|-------|
| [Metric 1] | X | Y | up/down/flat |

### Risks & Blockers
| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| [Risk 1] | [High/Med/Low] | [What we're doing] | [Who] |

### Asks
- [ ] [What you need from leadership]

### Next Period
- [ ] [What's coming next]
```

## Principles

### Headline First
Bad: "We had several meetings this week and discussed various topics..."
Good: "We're on track to launch March 1st. Key risk: Android testing capacity."

### Specific Over Vague
Bad: "Good progress on performance"
Good: "Reduced P99 latency from 450ms to 180ms (-60%)"

### Honest About Problems
Bad: "Minor delays expected"
Good: "Timeline at risk: 2-week slip likely due to API dependency. We need [specific help]."

### Clear Asks
Bad: "Would be helpful to have more resources"
Good: "Requesting: 1 additional Android engineer for 3 weeks, or we slip by 2 weeks"

## Example: Quick Slack Status

> **Quick update on [Feature]:**
> **Status:** 1-week delay (new target: Feb 22)
> **Why:** Edge case in Android 12+ breaks the happy path. Fix straightforward but needs testing.
> **Impact:** No user-facing impact. Marketing aware.
> **Next:** Fix in review today, full QA this week, still on track for Feb launch window.

See [references/examples.md](references/examples.md) for full weekly update, executive summary, and Slack examples.
