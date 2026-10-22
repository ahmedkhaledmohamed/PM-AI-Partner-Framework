# Workspace source map

Customize these routes for your work. `workspace.json` declares source roles; keep actual locations in the ignored `.local/sources.json` or approved connected-service configuration. Supply a local bindings file at initialization or edit it locally later. Setup does not read, copy, index or back up the content at those locations. This source map is read when relevant; it is not an instruction file automatically loaded by every agent.

| Need | Start with | Authority |
| --- | --- | --- |
| Resume a task | The existing task document's handoff | Accepted decisions, remaining work and next action; verify mutable sources |
| Decide or review scope | Selected planning record and original request | Human decisions and request provenance |
| Understand implementation | Applicable repository instructions, current code/contracts | Behavior at the inspected revision; rollout needs separate evidence |
| Investigate impact | Primary datasets, event definitions and reproducible queries | Measured behavior for the defined cohort/window |
| Publish or share | Maintained artifact and intended audience/access | Approved content with source links; derived views must preserve qualifications |
| Find history | [Archive](archive/README.md) | Dated context, not current scope |

## Start

Request: `Read workspace context, then focus on <task>. Done when <observable result>.`

Continue: `Resume <task> from <working document>. Verify current sources and continue the approved next action.`

Use installed skills by their runtime-supported invocation or natural language. Check available tools instead of assuming every configured connector works. Do not read the entire workspace or scan every repository for each request.

## Local organization

[working/](working/README.md) contains selected task documents. [published/](published/README.md) contains approved reader-facing artifacts. [archive/](archive/README.md) retains dated history. These directories are conventions, not privacy controls or automatic lifecycle transitions.

Keep a handoff inside each substantial task document using [working/task.md](working/task.md). Create additional registers only when the work genuinely needs them. Do not duplicate a live tracker or decision record just to fill this template.

## Reproduce setup

A portable setup recipe records the selected runtime and bundled skills for this exact framework bundle. It excludes local bindings, source content, task history, credentials, home settings and local instruction customizations. Keep personal/work information in its existing locations and connect the destination independently. Optional private backups are a separate workflow.
