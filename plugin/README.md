# Product workflow package

## Workspace model v2: source preview

The new local workspace flow is described in [getting started](../getting-started.md). From a source checkout:

```sh
node plugin/bin/install.js init ../my-product --runtime codex
node plugin/bin/install.js init ../my-product --runtime codex --apply
node plugin/bin/install.js doctor ../my-product
```

`install.js` dispatches init, doctor, start and skills to the workspace CLI. `workspace.js` is the same direct interface. The proposed package also declares a pm-workspace executable for a later release; the currently published package is not changed by this source update.

Initialization previews by default, preflights conflicts, installs only selected local skills, and changes no global hooks, accounts or MCP settings. Codex, Claude and Cursor skill layouts are supported; automatic launch is available only for independently installed Codex/Claude executables. Cursor launch remains manual.

## Skill selection and provenance

See [skill-bundle.json](skill-bundle.json) for the actual selection, presets and file hashes. The package includes all references and scripts needed by selected bundled workflows and the derived workspace template, so source-repository access is not required. Imported skills are reviewed snapshots, not a live mirror of the user's installed skills.

```sh
node plugin/bin/workspace.js skills
node plugin/bin/build-workspace-bundle.js --check
```

Maintain template sources in framework/templates/workspace and regenerate the package copy. See [distribution](../framework/core/skill-distribution.md).

## Legacy installation

Earlier standalone installation flags such as `--codex --local`, `--cursor --local`, and `--claude --local` remain available. They install the entire current bundle rather than the small v2 selection; Claude's legacy path also copies command/hook resources. Existing differing files now cause an error instead of being overwritten, but newly copied files can remain when a later legacy copy conflicts. Compare and migrate existing installations manually.

Legacy MCP setup/list flags apply only to the supported legacy runtime configurations. Verify provider packages, runtime schemas, credentials and merge behavior before using them. Connector configuration is an explicit separate operation, not part of workspace initialization. The included shell hooks are optional reminders, not mechanically enforced approval gates or universal cross-runtime hooks.

## Contribution records

The thinking-trail workflow produces a sanitized account of material decisions and outcomes. It no longer writes conversation excerpts, stages files automatically, accesses a credential store or sends prompts to a model API. The legacy helper can explicitly extract local Claude records to stdout for private synthesis; do not save that output in a repository. Other runtimes use visible task context or their own authorized export mechanisms.

## Validate

```sh
cd plugin
npm test
npm run check:bundle
```

No new package release or automatic update of an installed workspace is implied.
