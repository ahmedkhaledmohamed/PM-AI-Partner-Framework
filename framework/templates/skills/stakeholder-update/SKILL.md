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

### Advanced Patterns

1. **The bad news sandwich is dead** — Don't bury risks between good news. Executives see through it and lose trust. Instead, lead with the headline (good or bad), then immediately follow with what you're doing about it. "Android delivery dropped to 88%. Root cause identified, fix deploying Monday, ETA to recover: 2 weeks." Confidence comes from having a plan, not from hiding problems
2. **Metric trend > metric snapshot** — A single number is noise. Three data points are a trend. Always show the direction: "Checkout completion: 76% (up from 72% last month, target 78%)." The reader can instantly assess: are we improving, stable, or declining? Without trend, they'll ask — and you'll look unprepared
3. **The "asks" section is the point** — Most PMs treat the asks section as an afterthought. But the entire update exists to get your asks answered. If you have no asks, you're sending a status report — send it as an email. If you have asks, lead with them in the TL;DR: "On track for March launch. Need: decision on scope cut by Friday."
4. **Audience-calibrated detail** — Your skip-level wants 3 bullets. Your manager wants a page. Your team wants the full picture. Don't write one update for three audiences. Write the full version, then create progressively shorter summaries. The TL;DR section should stand alone as a complete Slack message
5. **Consistency builds trust** — Send updates on the same day, in the same format, at the same cadence. When stakeholders know what to expect, they read it. When the format varies, they skim or ignore. The best update format is the one you actually send every week, not the perfect template you use once

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
