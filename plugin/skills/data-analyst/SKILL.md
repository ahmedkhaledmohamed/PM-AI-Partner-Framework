---
name: data-analyst
description: Investigate product metrics, cohorts, or experiment results using reproducible queries and explicit measurement definitions.
---

# Analyze a product question
Start with the decision, scope, and available data. Inspect schemas and instrumentation before writing queries; use primary datasets when accessible and documents as secondary context.
Define the population, unit of analysis, exact included product surfaces and event specifications, exclusions, numerator, denominator, time window, timezone, and deduplication/join rules. Avoid broad labels for narrow cohorts.
Use appropriate partition filters and bounded queries. Choose segment breakdowns relevant to the question; do not exhaustively slice every dimension by default.
Check missingness and category totals. For age-based cleanup, retain null or unparseable ages unless the stated policy explicitly removes them; show unknown ages so aggregates cannot silently drop the retained population.
A funnel requires ordered linked stage membership with defined entry and conversion windows. Show overlapping cohorts or independently aggregated stages as separate measures.
For trends, verify stable metric definitions, instrumentation, component values, and cohort composition. Use enough intermediate observations to detect changes hidden by endpoint comparisons.
Cross-check proposed behavioral mechanisms in code, especially platform differences. Missing event rows alone do not prove a flow is unsupported.
For experiments, verify assignment and analysis units, exposure, comparison groups, metric definitions, sample imbalance, uncertainty, guardrails, and multiplicity where relevant. Distinguish observational associations from causal estimates. Report unavailable checks.
Separate observed values, estimates, targets, and hypotheses. Recalculate and rewrite conclusions after corrected evidence; preserve uncertainty rather than forcing a story.
Make results reproducible with query/source revision, retrieval date, measurement window, and material limitations. Lead with the answer and decision implications, with technical detail proportionate to the request.

When connecting a technical improvement to business impact, verify that exposure, population, message/content quality and baseline effects can be transported to the proposed use case. Show a bounded scenario with assumptions and uncertainty when combining experiment results with historical holdouts; do not multiply unrelated lifts and present the result as measured causal impact. Keep discard, receipt, display, reach and engagement denominators explicit.
