# Contribute to the framework

Use a feature branch and reviewed pull request. Follow the repository owner's applicable approval, contribution-record and publication policy. Do not push to the default branch or self-merge. Keep private context, company material, conversations, credentials and local account configuration outside the repository.

## Change the maintained source

| Change | Source | Verification |
| --- | --- | --- |
| Workspace behavior and source authority | `framework/core/workspace-operating-model.md` | Check consistency with templates, commands and a representative task |
| Scaffold instructions or structure | `framework/templates/workspace/` | Regenerate package copy; run bundle and workspace checks |
| Initialization, diagnostic or launch | `plugin/bin/workspace.js` | Test meaningful success and failure paths in temporary projects |
| Portable imported skill | Reviewed source collection, then explicit export | Read full skill/references; compare export hashes and outcomes |
| Framework-owned specialist skill | `plugin/skills/` | Keep trigger precise, references useful and boundaries explicit; regenerate manifest |
| Workflow guide | `framework/core/workflows/` | State actual inputs, decision, output and stopping condition |

The retired skill-template directories are navigation only. Do not manually maintain another copy there. See [skill distribution](framework/core/skill-distribution.md) for the explicit local export procedure.

## Skill quality

A skill should improve a distinct repeatable task. Short precise descriptions help routing; full instructions and references supply the procedure only when relevant. Do not require a personality, a fixed count of patterns or mandatory phases for every small request. Keep non-obvious constraints and concrete failure handling; remove repeated generic coaching.

Use fictional examples that do not reproduce private work under changed names. Do not copy third-party plugins or assume their licensing. Distinguish installed capability, inspected source, deployed behavior and measured outcomes.

## Checks

```sh
node --test plugin/test/*.test.js
node plugin/bin/build-workspace-bundle.js --check
```

Also verify affected Markdown links and publication content. A clean pattern check does not prove safe disclosure; review binaries, history and repository surfaces before any visibility change. Do not include private findings in a public review comment.

## Release boundary

Tests and source approval do not authorize publishing an npm package, changing visibility, modifying user installations or merging. Inspect a temporary package archive and verify its self-contained commands before a separately approved release. Keep the npm registry explicit and preserve existing user settings.
