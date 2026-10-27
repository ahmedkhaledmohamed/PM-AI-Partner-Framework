# Fictional journey: correct an export completion brief

All counts and records are independently fictional. This is a worked example, not measured performance or a report of an actual agent run.

## Task and evidence

Prepare a short local brief on export completion for a product review. Completion means a reproducible definition, a qualified finding and the decision it supports; changing instrumentation or publishing the brief is outside this stage.

The query contains 10,000 eligible accounts, 8,000 accounts exposed to a new export screen, 1,200 eligible accounts with a successful export and 700 successful-export accounts within the exposed population. All counts use the same fictional window and one account-level deduplication rule. Exposure was not randomized.

## First pass and analyst correction

A first draft divides all 1,200 successful accounts by 8,000 exposed accounts and calls 15% the exposed completion rate. The analyst identifies the population mismatch and asks whether the draft also overstates impact.

The corrected brief uses matched populations:

| Measure | Definition | Result |
| --- | --- | --- |
| Eligible-account completion | 1,200 successful eligible accounts / 10,000 eligible accounts | 12% |
| Exposed-account completion | 700 successful exposed accounts / 8,000 exposed accounts | 8.75% |
| Causal effect of the new screen | Requires a valid comparison design and exposure analysis | Not established |

These are separate population measures, not ordered funnel stages. The brief does not subtract or divide them to estimate uplift. Query revision, window, timezone, inclusion rules and missing-event coverage accompany the actual artifact in a real task; this fictional example supplies no baseline for another product.

## Decision and continuation

The review owner accepts a follow-up to investigate population selection and event coverage. No implementation or experiment commitment is inferred. Verify the two divisions, the population labels, and the retained causal qualification in any derived slide or shared document.

Handoff: the denominator correction is complete; impact remains unverified. Next, inspect assignment/exposure and missingness evidence before recommending an experiment. If a later document write reports success, read back the tables and conclusions before calling the shared version verified.
