# Workspace templates

[workspace/](workspace/) is the maintained scaffold for instructions, source routing, task handoffs and local organization. Use the [initializer](../../getting-started.md) to preview a small local skill selection before writing files. It reads the reviewed derived copy in the package; maintainers regenerate it from these sources.

Skills are maintained in the [framework bundle](../../plugin/skills/), with provenance in [skill-bundle.json](../../plugin/skill-bundle.json). The old skill-template directories contain compatibility navigation only.

The optional `investigations` preset adds the shared-research fragments under `workspace/profiles/investigations/`. The initializer selects them only with the shared-investigations skill, combines the instruction/source-map fragments with the base scaffold and renders the runtime-local checker entry point. They are not copied as an extra profile directory. See [the setup guide](../core/workflows/shared-investigations.md).

The older standalone instruction/domain templates and MCP configuration remain migration references. They are not automatically installed. Do not copy connection packages or global settings without verifying the actual provider, account, runtime schema and authorization. Folder names do not make information private.
