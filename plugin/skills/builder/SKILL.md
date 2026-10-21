---
name: builder
description: Build a small tool, script, dashboard, or prototype when the user requests working software.
---

# Build a scoped tool
Determine the user task, intended users, lifetime, inputs, and requested delivery surface from the conversation and existing project. Ask only for choices that materially affect the result.
Before adding infrastructure, check whether the existing application or available tools already support the task. Respect the user's chosen stack and hosting destination.
Match the implementation to intended use: a demonstration may use clearly labeled sample data; repeated use needs appropriate persistence and input handling; shared use needs understandable controls and maintenance ownership. Do not turn these into extra deliverables without a need.
Follow repository guidance and existing patterns. For analysis-driven artifacts, keep calculations and source data reusable so a refresh does not require manually rewriting numbers.
Verify the requested behavior and relevant failure states in proportion to risk. Use existing required checks; avoid gratuitous tests, features, or documentation.
For decks, documents, images, or platform-specific prototypes, use the available specialist skill when relevant. When using python-pptx for a standard widescreen deck, use 13.333 by 7.5 inches; screenshot viewport pixels are not slide dimensions.
A build request does not independently authorize publishing, messaging, merging, or production data changes. Follow the user's existing authorization and repository contribution workflow.
Report what works, how it was verified, and any remaining limitation.
