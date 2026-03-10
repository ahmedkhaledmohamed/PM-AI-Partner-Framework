# Workflow: Data Investigation

**When to use:** A metric moved unexpectedly, leadership asks "what happened?", or you need to validate an assumption with data

**Time:** Hours to days (depending on data access and complexity)

**Output:** Root cause analysis, data-backed recommendation, shareable summary

---

## Overview

```
┌──────────┐    ┌─────────┐    ┌───────────┐    ┌───────────┐
│ QUESTION │ →  │  QUERY  │ →  │ INTERPRET │ →  │ RECOMMEND │
│          │    │         │    │           │    │           │
│  Frame   │    │  Slice  │    │  Meaning  │    │  Action   │
└──────────┘    └─────────┘    └───────────┘    └───────────┘
```

---

## Philosophy

Most data investigations fail at the first step: the question is wrong. "Why did retention drop?" is a symptom, not a question. A good investigation starts by reframing the symptom into testable hypotheses, then systematically eliminates them.

Key principles:

1. **Frame before you query** — A SQL query without a hypothesis is a fishing expedition
2. **Slice everything** — Aggregate numbers lie. Break down by platform, tier, cohort, region, version
3. **Verify the instrument** — Before trusting a number, verify the event spec actually measures what you think it measures
4. **Separate correlation from causation** — Two things moving together is interesting. It's not a root cause
5. **Recommend, don't just report** — "Retention dropped 3%" is a finding. "We should investigate the Android 8.4 release because retention dropped 3% exclusively on Android post-release" is useful

---

## Phase 1: QUESTION (30 minutes)

### Goal

Turn a vague concern into testable hypotheses.

### Activities

- Clarify what actually happened (what moved, by how much, when)
- List possible causes as hypotheses
- Prioritize which hypotheses to test first
- Identify which data sources you'll need

### AI Assistance

**Prompt: Hypothesis Generation**

```
[Metric] changed from [X] to [Y] over [time period].

Help me:
1. List 5-7 possible causes, from most to least likely
2. For each, define what the data would look like if that cause were true
3. Identify which data source/table I'd query to test each hypothesis
4. Suggest the order to investigate (cheapest/fastest tests first)
```

**Prompt: Question Reframing**

```
Leadership asked: "[vague question]"

Help me reframe this into:
1. A specific, measurable question
2. The decision this answer will inform
3. What "good" and "bad" answers look like
4. What data I need to answer it
```

### Outputs

- [ ] Specific question defined
- [ ] 3-5 hypotheses ranked by likelihood
- [ ] Data sources identified
- [ ] Investigation order planned

---

## Phase 2: QUERY (Hours)

### Goal

Test hypotheses with data, systematically eliminating causes.

### Activities

- Write queries for the highest-priority hypothesis first
- Slice by all relevant dimensions (platform, version, tier, region, cohort)
- Check for confounding variables
- Document queries for reproducibility

### AI Assistance

**Prompt: Hypothesis Testing Query**

```
Hypothesis: [metric] dropped because of [cause].

If this hypothesis is true, I'd expect to see:
- [pattern A] in the data
- [pattern B] by [dimension]

Available tables: [list]
Partition column: [column]

Write a query to test this hypothesis.
```

**Prompt: Multi-Dimensional Breakdown**

```
The aggregate for [metric] is [value].
Help me break this down by:
- Platform (iOS vs Android)
- App version (last 5 releases)
- User tier (Free vs Premium)
- Market (top 10 by volume)
- Account age (new vs established)

I want to find where the aggregate hides divergent behavior.
```

### Tips

- **Filter on partition columns first** — Always include `WHERE _PARTITIONDATE BETWEEN ...` or equivalent
- **Verify the event spec** — Read the spec definition before trusting the data. Shared specs often track more than you think
- **CTR = positive / impressions** — Also track negative (dismiss) and "other" clicks separately
- **Save every query** — In a `.sql` file with a comment explaining the hypothesis it tests
- **When surprised, verify** — Run a second query from a different table/angle to confirm

### Outputs

- [ ] Queries saved with hypothesis comments
- [ ] Results for each hypothesis (confirmed/rejected/inconclusive)
- [ ] Unexpected findings documented
- [ ] Data caveats noted

---

## Phase 3: INTERPRET (1-2 hours)

### Goal

Turn data findings into meaning — what does this tell us about the product?

### Activities

- Synthesize results across all queries
- Identify the most likely root cause (or combination)
- Quantify the impact (users affected, revenue at risk, severity)
- Distinguish what the data tells us from what we're assuming

### AI Assistance

**Prompt: Synthesis**

```
Here are my investigation results:
- Hypothesis 1 ([cause]): [confirmed/rejected] — [key data]
- Hypothesis 2 ([cause]): [confirmed/rejected] — [key data]
- Hypothesis 3 ([cause]): [confirmed/rejected] — [key data]

Unexpected findings:
- [finding]

Help me:
1. Determine the most likely root cause
2. Quantify the impact (how many users, what severity)
3. Identify what the data CAN'T tell us (remaining uncertainty)
4. Flag anything that needs a follow-up investigation
```

**Prompt: Impact Sizing**

```
The issue affects [description].

Help me frame the impact for leadership:
- Users affected: [number or %]
- Revenue/engagement impact: [estimate]
- Duration: [how long has this been happening]
- Trend: [getting worse, stable, recovering]
```

### Outputs

- [ ] Root cause identified (with confidence level)
- [ ] Impact quantified
- [ ] Remaining uncertainty documented
- [ ] Follow-up questions identified

---

## Phase 4: RECOMMEND (1 hour)

### Goal

Turn findings into action — what should we do about this?

### Activities

- Formulate specific, actionable recommendations
- Tie each recommendation to the evidence
- Propose monitoring to verify the fix
- Write a shareable summary

### AI Assistance

**Prompt: Recommendation Framing**

```
Root cause: [finding]
Impact: [quantified impact]
Confidence: [high/medium/low]

Help me write recommendations that:
1. Start with the most impactful action
2. Distinguish "fix now" from "investigate further" from "monitor"
3. Include how we'll verify the fix worked
4. Are specific enough for engineering to act on
```

**Prompt: Investigation Summary**

```
I investigated [metric change] and found [root cause].

Help me write a one-page summary for [audience] covering:
1. What happened (1 paragraph)
2. What we found (key data, 2-3 findings)
3. What we recommend (actions with owners)
4. What we're still unsure about
5. How we'll monitor going forward
```

### Template: Investigation Summary

```markdown
# [Metric] Investigation Summary

## What Happened
[1 paragraph: what moved, by how much, when]

## Root Cause
[1-2 paragraphs: what we found and the evidence]

## Key Data

| Dimension | Before | After | Change |
|-----------|--------|-------|--------|
| [dim]     | [val]  | [val] | [delta]|

## Recommendations

| Action | Priority | Owner | Verification |
|--------|----------|-------|-------------|
| [action] | P0 | [team] | [how to verify] |

## Remaining Uncertainty
- [What the data can't tell us]
- [Follow-up investigations needed]

## Monitoring
- [Metric to watch]
- [Alert threshold]
- [Review cadence]
```

### Outputs

- [ ] Recommendations documented with evidence
- [ ] Summary written for target audience
- [ ] Monitoring plan defined
- [ ] Follow-up investigations queued

---

## Common Investigation Patterns

### The Version Regression

**Signal:** Metric drops shortly after an app release.

**Approach:** Segment by app version. Compare the metric for users on the new version vs. the old version during the same time period. Check if the metric was already declining for other reasons.

### The Instrumentation Break

**Signal:** A metric drops to zero or jumps 10x overnight.

**Approach:** Before investigating product changes, check if the event spec was modified, the logging pipeline had an outage, or a code change altered how events are fired. Many "metric drops" are logging bugs.

### The Seasonal Pattern

**Signal:** A metric looks concerning this week but has always dipped this time of year.

**Approach:** Compare year-over-year. Overlay the same week from 12 months ago. Normalize for seasonality before concluding something is broken.

### The Cohort Effect

**Signal:** An aggregate metric is declining, but no single change caused it.

**Approach:** Break down by user signup cohort. If newer cohorts have lower values than older cohorts did at the same age, the product experience for new users has degraded. If all cohorts are declining, something systemic changed.

---

## Document Checklist

| Document | Location | Status |
|----------|----------|--------|
| Hypotheses list | `analysis/` | [ ] |
| SQL queries | `analysis/queries/` | [ ] |
| Investigation summary | `analysis/` | [ ] |
| Monitoring plan | `analysis/` | [ ] |

---

## Success Criteria

- [ ] Question was specific and testable (not vague)
- [ ] Every hypothesis has a query that tests it
- [ ] Root cause is supported by data, not just plausible
- [ ] Recommendations are specific and actionable
- [ ] Remaining uncertainty is documented, not hidden
- [ ] Summary is readable by non-technical stakeholders

---

_Related: [Data Analyst Skill](../../templates/skills/data-analyst/SKILL.md) | [Analysis Pipeline Workflow](./analysis-pipeline.md) | [Full Framework](../pm-ai-partner-framework.md)_
