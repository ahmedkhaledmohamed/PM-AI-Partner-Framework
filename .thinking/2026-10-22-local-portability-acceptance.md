# Local portability acceptance command

## Problem Framing

The framework had automated recipe round-trip coverage but lacked a user-facing way to repeat the packaged-baseline check locally and inspect the restored workspace. A baseline pass also needed to remain distinct from verified agent behavior or connected-service access.

## Approach

Added a preview-first acceptance command that uses a new temporary directory and an isolated child-process home. It packs the framework offline, restores a synthetic workspace through the extracted CLI, compares managed files and retains artifacts and manual fresh-session instructions.

## Key Decisions

Accept no existing workspace path and use fictional private-content and binding fixtures. Report automated checks separately from untested runtime discovery, continuation, account access and full-machine portability; do not launch an agent or configure live accounts.

## Outcome

All forty-three offline tests passed. A retained local run passed five checks and compared thirteen managed files; manual fresh-session acceptance remains pending. Bundle, syntax, link and publication-pattern checks passed with the pattern check's existing binary-coverage limits. The contribution extractor found no matching sessions, so this record summarizes the visible task.
