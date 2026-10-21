---
name: artifact-reconciliation
description: Reconcile related documents, spreadsheets, structured records and published views while preserving manual decisions and assigning each fact a maintained source.
---

# Reconcile artifacts

Start with the reader's task and the artifacts within scope. Read their current content and any accepted decisions before proposing a new structure. Do not create another overview or tracker by default.

Identify which source owns each fact: request wording and provenance; selected scope and reviewer decisions; tracker status; observed implementation; measurements; and presentation. Keep source records and derived views distinct. A website projection must not silently overwrite a human decision in a workbook.

Use stable IDs for joins and meaningful titles for readers. Never rely on remembered row numbers after the user has reordered a sheet. Verify headers and record identities before every write. Group shared context under a request, but retain one row for each independently reviewable job/deliverable. Merge repeated display cells only when they describe the same parent; do not merge independent decisions.

Maintain many-to-many relationships. One request may change several jobs; one deliverable may contribute to several outcomes. Record one underlying piece of work with linked contributions, rather than duplicating its estimate or implying one deliverable per completion criterion. Distinguish new work, confirmed continuation, possible rollover, routine support, adjacent-team requests and dropped work using the agreed vocabulary.

When consolidating, propose a destination for every meaningful field and preserve original wording/provenance where needed. Keep reviewer edits and decisions. Separate goals from implementation gaps: a desired outcome is not evidence that code is missing. Historical cancellations do not establish cancellation of shared capabilities.

For spreadsheet links, prefer separate columns for distinct destinations or one link per cell when multiple links cannot be used reliably. Put readable titles in links; retain IDs in supporting fields. Keep status colors consistent with explicit status values rather than using color as the only record.

After an authorized update, read back every changed cell/record and verify formulas, validation rules, sorting, grouping and conditional formatting that could have shifted. A successful write response or matching row count is insufficient. Compare derived views with the same dated source snapshot. Report unresolved conflicts and verification limits without silently resolving them.

A reader may need one job with its current behavior, requested change, evidence and decision, even when several underlying record types support it. Keep technical relationships available as supporting detail; do not force a one-to-one job/capability/requirement mapping or overwhelm the main reading path with identifiers. Proposed changes must not be labelled as currently supported jobs.
