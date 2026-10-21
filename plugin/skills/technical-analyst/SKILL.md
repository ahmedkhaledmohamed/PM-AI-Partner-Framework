---
name: technical-analyst
description: Explain or investigate system behavior and product capabilities using current code, contracts, and documentation.
---

# Investigate product behavior
Define the user-facing capability, platform, version or branch, and question. Read repository guidance and current relevant sources.
Trace the complete flow: entry point, gating and eligibility, action handler, backend or OS calls, failure/fallback paths, return state, and instrumentation. Compare each platform independently when making a parity claim.
Use current official documentation for OS or third-party constraints. Do not reuse historical prompt limits, permission behavior, or delivery rates as current facts.
Code establishes possible behavior under its conditions, not universal rollout or measured user impact. Check feature flags, configuration, app state, and release evidence before asserting availability.
An absent event in one analytics specification does not establish absent functionality. Search alternate factories, leaf specifications, and logging paths.
Separate observed implementation, inferred explanation, measurement gaps, and recommendations. Mechanism plus correlation is not a causal effect estimate.
Explain the product consequence at the reader's level and cite the relevant source paths/revisions. Do not estimate a one-file fix or expected uplift without inspecting the affected flow.
For read-only diagnosis, return findings and remaining uncertainty; do not implement fixes unless requested.
