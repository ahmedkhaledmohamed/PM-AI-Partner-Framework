# Contribute to the framework

Use a feature branch and reviewed pull request. Follow the repository owner's applicable approval, contribution-record and publication policy. Do not push to the default branch or self-merge. Keep private context, company material, conversations, credentials and local account configuration outside the repository.

## Change the maintained source

The current priority is to evaluate whether PMs can use the method to produce a reviewable decision brief and return to it for another task. Follow the [usefulness pilot](framework/core/usefulness-pilot.md). Until that review, pause feature expansion, new generic personas and additional installation infrastructure. Fix concrete defects and improve instructions or examples where observed friction justifies the change. Existing proposals remain separate review decisions; this policy neither merges nor withdraws them.

| Change | Source | Verification |
| --- | --- | --- |
| Workspace behavior and source authority | `framework/core/workspace-operating-model.md` | Check consistency with templates, commands and a representative task |
| Scaffold instructions or structure | `framework/templates/workspace/` | Regenerate package copy; run bundle and workspace checks |
| Initialization, diagnostics, recipe export or launch | `plugin/bin/workspace.js` | Test round trips and meaningful failure paths in temporary projects; exclude private bindings/content from recipes |
| Portable imported skill | Reviewed source collection, then explicit export | Read full skill/references; compare export hashes and outcomes |
| Framework-owned specialist skill | `plugin/skills/` | Keep trigger precise, references useful and boundaries explicit; regenerate manifest |
| Website messaging | `site/index.html`; derive `docs/index.html` with `node plugin/bin/build-site.js` | Run the site check and inspect changed reader content |
| Workflow guide | `framework/core/workflows/` | State actual inputs, decision, output and stopping condition |

The retired skill-template directories are navigation only. Do not manually maintain another copy there. See [skill distribution](framework/core/skill-distribution.md) for the explicit local export procedure.

## Skill quality

A skill should improve a distinct repeatable task. Short precise descriptions help routing; full instructions and references supply the procedure only when relevant. Do not require a personality, a fixed count of patterns or mandatory phases for every small request. Keep non-obvious constraints and concrete failure handling; remove repeated generic coaching.

Use fictional examples that do not reproduce private work under changed names. Do not copy third-party plugins or assume their licensing. Distinguish installed capability, inspected source, deployed behavior and measured outcomes.

## Checks

```sh
node --test plugin/test/*.test.js
node plugin/bin/build-workspace-bundle.js --check
node plugin/bin/build-site.js --check
python3 plugin/skills/evidence-backed-specs/scripts/validate_bundle.py plugin/skills/evidence-backed-specs/examples/bundle.json
```

Also verify affected Markdown links and publication content. A clean pattern check does not prove safe disclosure; review binaries, history and repository surfaces before any visibility change. Do not include private findings in a public review comment.

## Release boundary

Tests and source approval do not authorize publishing an npm package, changing visibility, modifying user installations or merging. Inspect a temporary package archive and verify its self-contained commands before a separately approved release. Keep the npm registry explicit and preserve existing user settings.
