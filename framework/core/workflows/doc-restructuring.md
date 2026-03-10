# Workflow: Doc Restructuring

**When to use:** Existing documentation is confusing, outdated, or scattered. Team can't find what they need. Onboarding new members takes too long because docs don't make sense.

**Time:** 1-3 days

**Output:** Restructured documentation with clear information architecture

---

## Overview

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌──────────┐
│  AUDIT  │ →  │  DESIGN  │ →  │ MIGRATE   │ →  │  VERIFY  │
│         │    │          │    │           │    │          │
│  Map    │    │ Structure│    │  Rewrite  │    │  Test    │
└─────────┘    └──────────┘    └───────────┘    └──────────┘
```

---

## Philosophy

Bad documentation isn't usually a writing problem — it's an information architecture problem. Docs get confusing when they're organized by when they were written instead of what the reader needs. Restructuring means rebuilding around the reader's tasks, not the author's history.

Key principles:

1. **Organize by user task, not by author** — Readers ask "how do I do X?" not "what did the team write in Q3?"
2. **Delete before restructuring** — Most doc problems come from too much content, not too little. Outdated pages confuse more than missing pages
3. **One source of truth per topic** — If the same information exists in three docs, all three are probably wrong. Consolidate
4. **Progressive disclosure** — A new team member needs different docs than a veteran. Structure so you can get the basics in 5 minutes and details on demand

---

## Phase 1: AUDIT (Half day)

### Goal

Map what exists, what's used, and what's broken.

### Activities

- Inventory all documentation (wikis, READMEs, Confluence, Google Docs, runbooks)
- Identify which docs are actually used vs. forgotten
- Find duplicates, contradictions, and outdated content
- Map common user journeys through the docs

### AI Assistance

**Prompt: Doc Inventory**

```
Here's a list of our documentation:
[paste doc titles/links, or describe the doc landscape]

Help me:
1. Categorize each doc by type (tutorial, reference, runbook, decision record, spec)
2. Identify likely duplicates or overlapping content
3. Flag docs that are probably outdated (based on title/date)
4. Suggest a priority order for review
```

**Prompt: Gap Analysis**

```
Our team is responsible for [area].

Common tasks for someone working with our area:
1. [task: e.g., "set up local dev environment"]
2. [task: e.g., "understand the data model"]
3. [task: e.g., "debug a production issue"]
4. [task: e.g., "add a new notification type"]

Current documentation: [list]

Help me identify:
1. Which tasks have good documentation
2. Which tasks have no documentation
3. Which tasks have outdated or misleading documentation
4. What a new team member would struggle with most
```

### Template: Doc Audit Spreadsheet

```markdown
| Doc Title | Location | Type | Last Updated | Used By | Status | Action |
|-----------|----------|------|-------------|---------|--------|--------|
| [title]   | [link]   | [type] | [date]    | [who]   | Current / Outdated / Duplicate | Keep / Update / Delete / Merge |
```

### Outputs

- [ ] Complete doc inventory with status assessment
- [ ] Duplicate and contradiction map
- [ ] Gap list (common tasks with no docs)
- [ ] Delete/merge candidates identified

---

## Phase 2: DESIGN (Half day)

### Goal

Create an information architecture that matches how people actually use the docs.

### Activities

- Define the doc categories based on user tasks
- Create a navigation structure (table of contents)
- Decide what to keep, merge, rewrite, and delete
- Plan the migration order

### AI Assistance

**Prompt: Information Architecture**

```
Our documentation needs to serve these audiences:
- [Audience 1]: [what they need, e.g., "new engineers joining the team"]
- [Audience 2]: [what they need, e.g., "PMs understanding capabilities"]
- [Audience 3]: [what they need, e.g., "on-call engineers debugging issues"]

Current doc inventory:
[paste inventory summary]

Help me design an information architecture that:
1. Groups docs by user task, not by team or chronology
2. Creates a clear landing page / table of contents
3. Defines what each section contains
4. Specifies the reading order for a new person
```

**Prompt: Documentation Categories**

```
Help me organize our docs into these standard categories:

1. **Getting Started** — Onboarding, setup, "hello world"
2. **How-To Guides** — Task-oriented instructions (do X)
3. **Reference** — API docs, data models, configuration
4. **Architecture** — System design, decisions, diagrams
5. **Runbooks** — On-call procedures, incident response
6. **Decision Records** — Why we chose X over Y

Map each existing doc to a category, and identify gaps per category.
```

### Outputs

- [ ] Information architecture defined
- [ ] Navigation structure / table of contents
- [ ] Keep/merge/rewrite/delete decisions for every doc
- [ ] Migration plan with priorities

---

## Phase 3: MIGRATE (1-2 days)

### Goal

Execute the restructuring — rewrite, merge, move, and delete.

### Activities

- Start with the highest-traffic docs
- Merge duplicates into single sources of truth
- Rewrite confusing docs (don't just reorganize bad content)
- Delete outdated docs (archive, don't ghost)
- Add redirects or "moved to" notes where possible

### AI Assistance

**Prompt: Doc Rewrite**

```
Here's an existing doc that needs rewriting:
[paste content]

Problems:
- [problem: e.g., "too long", "assumes context", "outdated sections"]

Help me rewrite this to:
1. Lead with the most important information
2. Use clear headings that match user tasks
3. Remove outdated content
4. Add a "last updated" and "owner" header
5. Keep it under [N] words/sections
```

**Prompt: Doc Merge**

```
These 3 docs cover the same topic:
- Doc A: [summary]
- Doc B: [summary]
- Doc C: [summary]

Help me merge them into a single doc that:
1. Takes the best content from each
2. Resolves contradictions (flag any I need to verify)
3. Follows a logical structure
4. Notes which original docs it replaces
```

**Prompt: Landing Page**

```
I need a landing page / README for our documentation.

Sections:
[list from Phase 2]

Help me write a landing page that:
1. Orients the reader in 30 seconds
2. Links to each section with a one-line description
3. Highlights the "start here" path for new people
4. Includes a "last updated" date
```

### Tips

- **Migrate in order of traffic** — Fix the docs people actually read first
- **Archive, don't delete** — Move outdated docs to an "archive" folder with a note. Someone might need the history
- **Add "last updated" to every doc** — This is the single most useful metadata for trust
- **One PR per doc** — Makes reviews manageable and revertible

### Outputs

- [ ] High-traffic docs rewritten
- [ ] Duplicates merged
- [ ] Outdated docs archived
- [ ] Landing page created
- [ ] Redirects added for moved content

---

## Phase 4: VERIFY (Half day)

### Goal

Test that the new structure works for real users.

### Activities

- Have a new team member navigate the docs (observe, don't guide)
- Check that common tasks are findable in under 2 minutes
- Verify all links work
- Get feedback from the team

### AI Assistance

**Prompt: Usability Test Design**

```
I've restructured our documentation.

Help me design a quick usability test:
1. 5 tasks a new person should be able to complete using only the docs
2. Expected time per task (benchmark)
3. What to observe (where do they get stuck?)
4. How to collect feedback without leading the witness
```

**Prompt: Link Verification**

```
Here's our documentation structure:
[paste table of contents with links]

Help me create a checklist to verify:
1. Every link resolves to a real page
2. Cross-references between docs are correct
3. "Related" sections point to the right content
4. No orphan pages (pages not linked from anywhere)
```

### Outputs

- [ ] Usability test completed with at least 1 person
- [ ] All links verified working
- [ ] Team feedback collected
- [ ] Follow-up improvements logged

---

## Maintenance Plan

Restructuring is a one-time fix. Without maintenance, docs decay again within 3-6 months.

| Practice | Frequency | Owner |
|----------|-----------|-------|
| Review "last updated" dates | Monthly | PM or tech lead |
| Delete docs older than 12 months with no updates | Quarterly | Team |
| Test onboarding path with new hires | Each new hire | Onboarding buddy |
| Add new docs to the landing page | Each doc created | Author |

---

## Success Criteria

- [ ] New team member can find answers to common tasks in under 2 minutes
- [ ] No duplicate docs covering the same topic
- [ ] Every doc has a "last updated" date and owner
- [ ] Landing page exists and is accurate
- [ ] Team agrees the docs are better (not just different)

---

_Related: [Writer Skill](../../templates/skills/writer/SKILL.md) | [Strategic Clarity Workflow](./strategic-clarity.md) | [Full Framework](../pm-ai-partner-framework.md)_
