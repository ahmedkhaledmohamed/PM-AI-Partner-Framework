# PM AI Partner Framework

A practical guide and optional starter workspace for product managers working with AI agents.

Start with one product question. Identify the relevant requests, approved intent, implementation, rollout and measurements, then produce a decision brief that makes the evidence, uncertainty and proposed next action reviewable. Use the sources your question requires; code and analytics access are optional.

## Who this helps

Use the framework if you need a method and examples for organizing evidence and carrying a product task across sessions. If you already have a working agent setup, adopt the relevant practices without replacing your workspace or installing the bundle.

Read the [operating model](framework/core/workspace-operating-model.md), then follow the [fictional saved-search task](framework/examples/workspace-task.md). Try a real question in your authorized workspace. A useful brief states the decision, distinguishes observations from proposals, links its evidence, identifies unknowns and names the next action for human review.

The framework's usefulness to other PMs has not yet been established through an observed pilot. Local software checks verify narrower implementation properties. The next investment decision is an [evaluation with three PMs](framework/core/usefulness-pilot.md); feature expansion is paused while that evidence is gathered.

## Repository responsibilities

| Location | Maintains |
| --- | --- |
| This framework | Method, worked examples, starter workspace and a selected reviewed skill snapshot |
| Separate `agent-skills` collection | Reusable workflow instructions; imported changes reach this framework through reviewed exports |
| Your authorized workspace and systems | Actual tasks, private source mappings, integrations, evidence and decisions |

The framework works without access to the skill source collection. Maintain reusable instructions there rather than creating another version here; see [distribution and maintenance](framework/core/skill-distribution.md).

**Workspace model v2 is a source preview.** The published npm package has not been updated by this change. Use the checked-out source commands below to try the new workspace flow.

## Optional: start with a small local workspace

Requires Node.js 18+ for the validation suite and an independently installed agent if you want to launch one. No package install, connector, database or API key is needed to create and inspect the workspace.

```sh
git clone https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework
node plugin/bin/workspace.js init ../my-product --runtime codex
```

Inspect the preview, then apply the same selection:

```sh
node plugin/bin/workspace.js init ../my-product --runtime codex --apply
node plugin/bin/workspace.js doctor ../my-product
node plugin/bin/workspace.js start ../my-product --focus "Review a product request and identify what needs a decision"
```

`start` also previews by default. Add `--apply` to launch Codex or Claude. Cursor setup produces a workspace and a prompt to use in the editor; automatic Cursor launch is not configured.

The initializer refuses differing existing files, installs a small local skill set, and leaves global settings, hooks, accounts and connectors alone. No agent or service is started by `init` or `doctor`. Source locations initially remain unconfigured; diagnostic warnings make that explicit.

## How the pieces fit

| Piece | Purpose | Maintained source |
| --- | --- | --- |
| Instructions | Stable behavior and authorization boundaries | AGENTS.md; compatibility files point to it |
| Source map | Select relevant context for the task | WORKSPACE.md and local source configuration |
| Task document | Goal, evidence, accepted decisions and handoff | Existing working document; create another only when needed |
| Skills | Reusable workflow instructions loaded when relevant | Selected directories from the reviewed bundle |
| Reader artifacts | Approved output with useful source links | Maintained sources with derived views where useful |

The core principle is to reconcile sources with different authority: requests, approved intent, inspected implementation, rollout evidence and measurements. Human judgment decides the action. Code is optional when the question does not concern implementation. [Read the operating model](framework/core/workspace-operating-model.md).

## Choose skills deliberately

- **starter:** task context, thought partnership and writing.
- **product:** planning, analysis, briefs, reconciliation, execution and collaboration.
- **evidence:** source-backed specifications and their supporting references/scripts.

Select a preset before applying, or pass `--skills name,name`. Run `node plugin/bin/workspace.js skills` for the actual bundle. The default is a small local selection; a large global installation is not required.

The bundle includes reviewed portable imports and framework-owned specialist skills. [File hashes and provenance](plugin/skill-bundle.json) make it usable without access to the source skill repository. Third-party plugins and private workspace content are not bundled.

## Where to go next

| Need | Reference |
| --- | --- |
| Setup, commands and runtime boundaries | [Getting started](getting-started.md) |
| Understand the workspace lifecycle | [Operating model](framework/core/workspace-operating-model.md) |
| Adopt v2 without losing an existing setup | [Migration](framework/core/workspace-migration.md) |
| See a complete fictional task | [Worked example](framework/examples/workspace-task.md) |
| Research, planning, analysis and publication | [Workflow guides](framework/core/workflows/README.md) |
| Templates and source configuration | [Workspace templates](framework/templates/README.md) |
| Skill export and updates | [Distribution](framework/core/skill-distribution.md) |
| Older standalone skill installer and plugin | [Plugin compatibility](plugin/README.md) |

Private information belongs in authorized private systems. A folder called sandbox or working is not an access control. Examples in the workspace model are fictional; connect your own sources without copying them into this public repository.

## Validate and contribute

```sh
cd plugin
npm test
npm run check:bundle
```

The tests use temporary local projects and do not run a model or configure real accounts. See [contributing](CONTRIBUTING.md) for source ownership and review expectations. A source update does not publish a package, change repository visibility or authorize a merge.
