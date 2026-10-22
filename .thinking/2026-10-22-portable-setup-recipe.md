# Portable baseline setup distribution

## Problem Framing

The reusable setup process needed a public distribution path independent of private content repositories and local account configuration. Recreating a workspace baseline should not require packaging the information accessed through that workspace.

## Approach

Extended the existing framework initializer with a content-pinned setup recipe and separate machine-local source bindings. Documented exporting a recipe, preserving the matching package archive and recreating the baseline without access to the skill-source repository.

## Key Decisions

Keep owner-specific home policy, plugins, accounts and private information outside the public recipe. Refuse changed managed skills and mismatched bundles rather than silently producing a different setup. Included the existing missing-validator fix needed for a self-contained evidence workflow; other pending proposals remain separate.

## Outcome

Forty offline tests passed, including recipe round trips for the supported layouts, private-content exclusion and recreation through an extracted package without Git metadata. Bundle, example and content checks passed; live runtime sessions, account access and second-machine acceptance remain unverified. The contribution extractor found no matching sessions, so this record summarizes the visible task.
