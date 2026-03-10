# [Team Name] — Growth PM Workspace

## What This Is

Growth PM workspace for [product/area]. Focused on acquisition, activation, retention, and monetization experiments.

## Current Focus

- **Primary metric:** [e.g., 7-day retention, activation rate, trial-to-paid conversion]
- **This quarter:** [e.g., Reduce Day 1 churn by 15%, Improve onboarding completion from 40% to 60%]
- **Active experiments:** [number] running, [number] in design

## Key Context

### Team
- **Team name:** [Your Team]
- **Mission:** [e.g., "Maximize the number of users who reach their aha moment in the first session"]
- **Key stakeholders:** [e.g., Marketing (acquisition), Data Science (experimentation), Engineering]

### Metric Stack

| Level | Metric | Current | Target |
|-------|--------|---------|--------|
| North Star | [e.g., Weekly Active Users] | [value] | [value] |
| Primary | [e.g., Day 7 Retention] | [value] | [value] |
| Input 1 | [e.g., Onboarding Completion] | [value] | [value] |
| Input 2 | [e.g., First Value Action] | [value] | [value] |
| Guardrail | [e.g., Support Ticket Rate] | [value] | don't exceed |

### Funnel

```
[Acquisition Channel] → Landing → Signup → Onboarding → First Value → Retained
     [X%]                [Y%]      [Z%]       [A%]          [B%]        [C%]
```

Replace with your actual funnel stages and conversion rates.

### Experimentation

- **Platform:** [e.g., Optimizely, LaunchDarkly, internal]
- **MDE (Minimum Detectable Effect):** [e.g., 2% relative change with 80% power at p<0.05]
- **Typical experiment duration:** [e.g., 2 weeks for most, 4 weeks for retention]
- **Current experiment velocity:** [e.g., 3-4 experiments per sprint]

### Systems We Own

- [Onboarding flow] — [e.g., 5-step wizard, server-driven UI]
- [Notification system] — [e.g., push, email, in-app triggers]
- [Paywall / upgrade flow] — [e.g., trial management, pricing page]

## How to Help

When I ask about:
- **Experiment design** → Use `/hypothesis-tester`. Check MDE, sample size, guardrail metrics.
- **Funnel analysis** → Use `/data-analyst`. Always break down by platform, cohort, and acquisition channel.
- **Feature specs** → Use `/product-brief`. Frame around the metric it moves, not the feature itself.
- **Results interpretation** → Watch for novelty effects (compare week 1 vs week 2+), segment effects (does it help new users but hurt power users?), and metric cannibalization.

## Growth-Specific Rules

- **Every feature needs a hypothesis** — "We believe [change] will [move metric] because [reason]." No exceptions.
- **Guardrail metrics are mandatory** — Never ship an experiment that moves the primary metric without checking guardrails.
- **Segment before celebrating** — An overall +5% might be a +20% for new users and -5% for existing. That's a different decision.
- **Measure long-term effects** — Short-term activation gains that hurt 30-day retention are net negative. Always check downstream metrics.
- **Document failed experiments** — They're as valuable as successes. Record the hypothesis, result, and what you learned.

## Constraints

- **Use Mermaid diagrams rather than ASCII art** for flowcharts, funnels, and experiment designs
- [Add company-specific constraints: experiment review process, data access rules, etc.]

## Links

- [Experiment tracker / wiki]
- [Dashboard: funnel metrics]
- [Dashboard: experiment results]
- [Data warehouse / query tool]
