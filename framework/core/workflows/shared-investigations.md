# Set up collaborative investigations

Use the optional investigation preset when several people need to find ongoing research, read current findings and contribute selected evidence. The team maintains a shared registry and investigation records. Existing reports, queries, datasets and charts stay at their maintained sources. A contributor reads relevant references on demand rather than downloading everyone's context.

## Install the collaboration files

Requires Node.js 18+. Git and an authenticated repository review tool are needed when the team uses Git-based collaboration; an installed agent is needed for natural-language intake. Source readers and connectors are supplied by the environment. No database, knowledge index, automatic synchronization or model call is required by setup.

From a checked-out framework source, preview and then apply:

```sh
node plugin/bin/workspace.js init ../team-research --runtime codex --preset investigations
node plugin/bin/workspace.js init ../team-research --runtime codex --preset investigations --apply
node plugin/bin/workspace.js doctor ../team-research
```

Use `claude` or `cursor` to select another supported skill layout. These commands exercise file installation, not runtime discovery certification. The published npm package may not contain this source-preview preset; use the exact source or reviewed package archive that includes it. This source change does not publish a release.

The preset installs:

| File or directory | Responsibility |
| --- | --- |
| `AGENTS.md` and compatibility entry | Stable local rules and investigation startup route |
| `WORKSPACE.md` and `INVESTIGATIONS.md` | Selective source navigation and contributor workflow |
| Runtime-local `shared-investigations` skill | Discovery, attributed intake, comparison and coordinator reconciliation |
| `investigations/registry.json` | Stable IDs, coordinators, status and maintained evidence references |
| `investigations/_template/` | Readable record and contribution manifest templates |
| `scripts/investigations.cjs` | Offline listing and structural validation |
| `.workspace-install.json` | Exact installed bundle and baseline for reviewed comparisons |

The registry starts empty. The default starter and product presets do not install this extension. Local source bindings remain ignored; setup recipes contain only the reviewed runtime/skill baseline. The same selected skill recreates this profile when restoring its recipe.

## Adopt into an existing environment

Run the preview against the selected repository. A differing existing file blocks the entire apply; the initializer never overwrites it or silently appends policy. Have the agent prepare a reviewed merge in an isolated worktree, using a temporary initialized workspace as the source of proposed files. Preserve existing instructions and source routes, merging only the investigation-specific guidance from `AGENTS.md` and `WORKSPACE.md`. Keep one canonical instruction file and use compatibility pointers as appropriate. Do not adopt private bindings, unrelated framework policy or fictional research as team evidence.

After manual adoption, the installation receipt must describe the baseline that was actually installed; do not copy a receipt that claims untouched generated instructions when you merged them differently. The existing initializer's diagnostics and recipe flow apply to managed installations. A manually integrated environment should run the standalone investigation checker and keep its own reviewed setup record until its installation baseline is reconciled. This first version does not automate arbitrary instruction-file merges or upgrades.

## Finish the team setup

Choose the shared repository and review workflow, identify who coordinates each investigation, and record canonical evidence locations and access limitations. The portable tooling repository contains methods and fictional examples only. Actual research belongs in the team's authorized space, with machine-local source bindings separate from both.

Run `node scripts/investigations.cjs check .` in the existing CI review job. Configure the repository to require that job and the team's normal review before merging. Neither initialization nor validation changes remote permissions, connects accounts, sends notifications or merges proposals. An ordinary reader can use the shared Markdown without installing an agent.

The contribution cycle is: find the record, check current shared context and proposals, select local inputs, compare findings, prepare an attributed proposal, review it, then have the coordinator reconcile accepted findings. Keep disagreement and unknowns visible. Refer to established artifacts; newly produced supporting artifacts can be maintained in the contribution when that home is chosen. A no-change comparison should create no contribution.

## Verify the setup

The automated checks cover installation for each supported layout, recipe reproduction without private findings, read-only listing, attribution and source-reference failures. They do not demonstrate an agent followed the skill or that a team benefited.

Pilot with independently fictional research: Morgan contributes a study referenced at its original source; Riley adds a conflicting reproduction from another selected project. Verify both accounts retain attribution and limitations, the maintained evidence is referenced once, and coordinator acceptance remains pending. Repeat intake with an unchanged copy and verify no new contribution is produced. Run these prompts in fresh agent sessions using the installed skill, inspect the actual actions and artifacts, and record access gaps. The source collection includes behavioral cases for these decisions; they remain unverified until actual recorded runs are reviewed.

Use the existing read-only `compare` command before an upgrade; preserve local edits and review differences. Initialization is not an automatic updater, and a setup recipe never exports the team's investigation context.
