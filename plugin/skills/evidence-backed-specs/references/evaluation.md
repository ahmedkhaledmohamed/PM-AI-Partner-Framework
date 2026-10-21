# Evaluate specification and gap claims

## Structural gate

Validate record shapes, stable unique IDs, reference targets and types, and the explicitly declared source/feature/need denominator. Confirm generated views match canonical records. The [example validator](../scripts/validate_bundle.py) checks only references and declared-scope coverage; run a JSON Schema validator separately when adapting the [record schema](record.schema.json). A structurally valid bundle can still be wrong or incomplete.

## Evidence review

Sample records across feature homes, client and service paths, APIs or datasets, proposals, and historical delivery. For each claim, ask whether the cited version contains the stated behavior at the stated scope; whether contracts, consumers, tests, flags, and adjacent owners were checked; whether the source was accessible and current; and what remains unverified. For a dataset, inspect grain, lineage, freshness, nulls, exclusions, and query window. For a product outcome, distinguish code presence, rollout population, executed delivery, measurement coverage, and observed effect.

For an **absence** claim, inspect plausible alternate implementations, platform versions, owner boundaries, aliases, and delivery homes. One empty search, missing spec row, or absent event definition is insufficient. If this search is incomplete, classify the question as an evidence or specification gap.

## Intent and gap review

Check source authority, approver, decision date, cycle, and status before labelling a requirement approved. A historical Epic or DoD, draft workbook row, and current goal can all inform discovery without becoming the same obligation. Resolve conflicts across versions explicitly; preserve the earlier decision and proposed carryover.

Before recommending development, verify the expected behavior is scoped and accepted, the relevant current path is inspected, and enablement or outcome evidence is sufficient for the claim being made. Use separate classes for approved-requirement conflict, candidate development gap, specification gap, evidence gap, expected variation, and unresolved. State evidence for and against, the next discriminating check, and the decision owner. Record priority and commitment only through the team's planning process.

## Feedback and regression

Keep reviewed examples of correct classifications and past false positives. On each workflow update, re-evaluate a small mix of approved intent, draft needs, source-only behavior, moved ownership, no-change drift, and apparent absence. Compare the reasoning and citations, not just the labels. Escalate repeated disagreements to the responsible domain or product owner; do not tune the rubric to make uncertainty disappear.
