# Release the reviewed workspace bundle

Workspace model v2 remains an unreleased source preview. A merged source change is not a published package. Package publication, visibility changes, external submissions and merges require their own authorization.

## Prepare a concrete release

1. Use a clean worktree at the intended release revision and verify the personal remote and effective Git identity.
2. Review imported skill provenance and the complete export, including scripts and references. Keep private mappings, traces and third-party resources out of the package. Verify source rights; package metadata alone is not a review of imported rights.
3. Run the clean-checkout validation workflow's commands:

```sh
node --test plugin/test/*.test.js
node plugin/bin/build-workspace-bundle.js --check
node plugin/bin/build-site.js --check
python3 plugin/skills/evidence-backed-specs/scripts/validate_bundle.py plugin/skills/evidence-backed-specs/examples/bundle.json
```

The package-content test checks every manifest file, including nested scripts. The clean checkout catches files that exist locally but were ignored or never committed. The root ignore rule must not exclude bundled nested script directories.

4. In a temporary directory, create an archive with `npm pack --ignore-scripts --registry=https://registry.npmjs.org/` from `plugin/`, inspect its contents and exercise starter and evidence initialization from the extracted archive. Do not run a model, configure accounts or start services for this check.
5. Prepare the version change and release notes in a reviewed PR. Align package/plugin version metadata, the README and website. Keep source-preview instructions distinct from the currently published npm entry point.
6. Show the exact release artifacts, checks and remaining limitations for the owner's explicit publication decision. Only then use the approved registry/account to publish. Verify the actual published version separately; do not infer publication from a source merge.

## What validation establishes

Local tests cover workspace setup, preservation, comparison, diagnostic output and package contents. They do not certify every editor version, connector, account, live dataset or behavioral outcome. The portable skill collection owns fictional behavioral cases and recorded-run review; synthetic evaluator fixtures are not successful agent runs.

External marketplace submissions and outreach are separate requests. Do not reuse historical promotional counts or treat this release procedure as authorization to contact others.
