# Shared investigation setup

## Problem Framing

Teams need a repeatable way to install shared investigation records and contribution guidance without bundling their research or replacing existing local policy.

## Approach

Extend the existing workspace initializer with an optional investigation preset and import the reviewed portable workflow. Provide maintained templates, runtime-specific checker entry points and setup guidance through the existing bundle process.

## Key Decisions

Keep the default selection unchanged and use a scoped exception to the feature-expansion pause. Preview changes, refuse differing files, retain reviewed setup provenance and exclude findings and private bindings from recipes. Existing environments require a deliberate merge of conflicting instructions.

## Outcome

Local installation, package and recipe checks pass for the supported file layouts. The change does not publish a package or configure accounts, and a fresh-session agent pilot remains necessary.
