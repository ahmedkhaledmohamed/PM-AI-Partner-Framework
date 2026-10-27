# Fictional example: improve saved searches

All people, records, requests and product behavior below are independently written examples. They do not describe an actual company or measurement.

## Task and completion condition

A product manager asks for a reviewable proposal for saving searches in a team knowledge tool. The stage is complete when the team can distinguish existing support, proposed changes and unresolved evidence, and decide what to investigate next. Shipping the feature is outside this stage.

## Source roles

| Source | What it tells us | What it does not tell us |
| --- | --- | --- |
| Original customer request | A team wants to reuse a search and share it | That the team has accepted development scope |
| Current code inspection | Personal saved queries exist in the inspected revision | Whether all deployed users have access |
| Approved product contract | Private query content must not be exposed to other members | Which sharing interface should be built |
| Usage query | Event coverage for saving queries is incomplete | That users never save searches |
| Planning decision | Investigate a team-sharing flow | That implementation or rollout is committed |

## Independently reviewable jobs

| Job | Current definition | Proposed change | Disposition |
| --- | --- | --- | --- |
| Reuse a personal search | A member can save and reopen a private query in the inspected code | No change proposed | Verify deployed availability before describing it as universally supported |
| Share a useful search | No team-sharing path was found within the inspected scope | Let a member share a named search with selected team members | Candidate development gap; confirm scope and privacy design |
| Understand reuse | Available events cannot answer repeated-use behavior reliably | Define and verify events for reopening and sharing | Measurement gap, separate from the product behavior |

One request produced three reviewable outcomes. The sharing capability may benefit more than one initiative, but its implementation estimate should be recorded once. Display names help readers; stable identifiers can support joins behind the view.

## Artefact ownership

The task document owns evidence and unresolved questions. The planning record owns selected scope and reviewer decisions. The tracker owns implementation status after work is created. A shared summary links to those records without becoming a second decision store.

## Handoff

- Completed: reviewed the request, inspected the declared source scope and prepared the comparison.
- Accepted decision: investigate sharing; no build commitment made.
- Open: deployed population, privacy design and event coverage.
- Next action: engineering reviews the proposed sharing behavior and checks the missing paths before estimating work.

The agent can finish this research stage with those explicit review items. It should not keep expanding the inventory or claim that a missing path is a confirmed gap across the whole product.

## Session correction and continuation

This is a fictional walkthrough, not a successful runtime evaluation. In the first pass an agent equates the existing personal saved-query handler with team sharing. The owner clarifies that the request concerns sharing between members. The revised result separates personal reuse from proposed team sharing, preserves the accepted discovery-only decision, and retains rollout uncertainty.

Before the review handoff, check all three independently reviewable outcomes, their evidence and disposition. In the next session, start with the handoff above and verify mutable sources. The next authorized action is engineering review of the proposed behavior, not implementation, publication or a change to a linked repository.
