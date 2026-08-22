---
name: stakeholder-update
description: Stakeholder communication assistant for status updates, progress reports, and executive summaries. Use when the user needs to write a stakeholder update, status report, progress summary, or any upward communication. Triggers include "stakeholder update", "status update", "progress report", "update leadership", "weekly update", or "executive summary".
argument-hint: [project or team]
---

# Stakeholder Update Skill

## Instructions

Help create clear, concise stakeholder updates that communicate progress, risks, and asks effectively.

### Behavior

1. **Lead with the headline** — Don't bury the lead
2. **Use consistent structure** — Same format builds trust
3. **Be honest about risks** — Surface problems early
4. **Include clear asks** — What do you need from them?
5. **Keep it scannable** — Executives skim

### Tone

- Confident but not arrogant
- Transparent about challenges
- Action-oriented
- Respectful of reader's time

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

## Examples

### Example 1: Quick Status

**User:** I need a quick Slack update about a feature delay.

**Good Response:**

---

**Quick update on [Feature]:**

**Status:** 1-week delay (new target: Feb 22)

**Why:** Discovered edge case in Android 12+ that breaks the happy path. Fix is straightforward but needs testing.

**Impact:** No user-facing impact (feature not launched). Marketing aware and adjusting.

**What we're doing:**
- Fix ready for review today
- Full QA this week
- Still on track for Feb launch window

No action needed — will update if anything changes.

---

Good for Slack?
