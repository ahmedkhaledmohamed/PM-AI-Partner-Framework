# Workflow: Codebase Deep-Dive

**When to use:** Need to understand what actually exists, grounding strategy in reality

**Time:** 1-2 weeks (varies by codebase size)

**Output:** Capability audit, evidence-backed understanding

---

## Overview

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌────────────┐
│ EXPLORE │ → │   MAP   │ → │   GAP   │ → │ PRIORITIZE │
│         │    │         │    │         │    │            │
│Navigate │    │Evidence │    │Missing  │    │ Sequence   │
└─────────┘    └─────────┘    └─────────┘    └────────────┘
```

---

## Phase 1: EXPLORE

### Goal

Navigate and understand the codebase structure.

### Activities

- Identify key directories
- Understand architecture patterns
- Find entry points
- Map service boundaries

### AI Assistance

**Prompt: Initial Orientation**

```
I'm exploring [codebase/directory] for the first time.

Help me understand:
1. What's the overall architecture?
2. What are the key entry points?
3. What patterns are used?
4. What does each major directory contain?
```

**Prompt: Code Meaning Extraction**

```
I'm a PM trying to understand this code's product meaning, not implementation.

[paste code or describe file]

Questions:
1. What user capability does this enable?
2. What business rule is encoded?
3. What happens when this fails?
4. What would a user notice?
```

**Prompt: Pattern Recognition**

```
Search for all [pattern/term] in [codebase].

For each occurrence:
1. What product feature does it relate to?
2. Is it active or deprecated?
3. What's the user-facing impact?
```

### Tips

- Start with public APIs and interfaces
- Look at enum values — they often encode business logic
- Configuration files reveal feature toggles
- Tests describe expected behavior

---

## Phase 2: MAP

### Goal

Create capability → code mappings.

### Activities

- Document capabilities with evidence
- Link claims to specific files/lines
- Build reference tables
- Capture key code patterns

### AI Assistance

**Prompt: Capability Evidence Table**

```
I'm documenting [capability] in [codebase].

Found evidence:
- File: [path]
- Code: [snippet]
- Related files: [list]

Help me create an evidence summary:
1. What does this capability do?
2. What's the implementation status?
3. What are limitations?
4. What files are key?
```

**Prompt: Cross-Reference**

```
I've found [capability A] in [file].

Help me:
1. Find related code that interacts with this
2. Trace the data flow
3. Identify dependencies
4. Find where this is called
```

### Template: Capability Entry

```markdown
## [Capability Name]

**Pillar:** [which responsibility area]

### Status
- [✅/⚠️/❌] [Exists/Partial/Missing]

### Evidence
- **Primary file:** `[path]`
- **Key code:**
  ```
  [relevant snippet]
  ```
- **Related files:**
  - `[path]` — [what it does]

### What It Does
[Product-level description]

### Limitations
[What doesn't work or is missing]

### Key Code Patterns
[Patterns or conventions to know]
```

---

## Phase 3: GAP

### Goal

Compare actual capabilities to responsibilities.

### Activities

- List claimed responsibilities
- Check evidence for each
- Document what's missing
- Assess impact of gaps

### AI Assistance

**Prompt: Gap Analysis**

```
Our claimed responsibilities are:
1. [responsibility]
2. [responsibility]
...

Based on my audit, here's what I found:
[paste capability evidence]

Help me identify:
1. Which responsibilities are fully covered?
2. Which are partially covered (and what's missing)?
3. Which have no evidence at all?
4. What's the impact of each gap?
```

**Prompt: Missing Capability Detection**

```
Looking at [codebase], I notice [pattern/behavior].

But I don't see:
- [expected thing 1]
- [expected thing 2]

Is this actually missing, or might it exist elsewhere?
Where should I look?
```

### Template: Gap Inventory

```markdown
## Gap Inventory

### Critical Gaps (Mission-Blocking)

| Gap | Pillar | Impact | Effort |
|-----|--------|--------|--------|
| [gap] | [pillar] | [impact] | [estimate] |

### High-Priority Gaps

| Gap | Pillar | Impact | Effort |
|-----|--------|--------|--------|

### Medium-Priority Gaps

| Gap | Pillar | Impact | Effort |
|-----|--------|--------|--------|

### Investigation Needed

| Area | Question |
|------|----------|
| [area] | [what's unclear] |
```

---

## Phase 4: PRIORITIZE

### Goal

Sequence gaps into actionable backlog.

### Activities

- Estimate effort
- Assess dependencies
- Phase recommendations
- Connect to strategy

### AI Assistance

**Prompt: Effort Estimation**

```
Here are the gaps I've identified:
[list gaps with descriptions]

For each, help me estimate:
1. Engineering complexity (T-shirt size)
2. Dependencies on other work
3. Risk factors
4. Rough timeline
```

**Prompt: Phasing Strategy**

```
I have [N] gaps to address over [timeframe].

Constraints:
- [constraint 1]
- [constraint 2]

Help me create a phased approach:
1. What's foundational (enables other work)?
2. What has highest impact/effort ratio?
3. What can be done in parallel?
4. What should wait?
```

### Template: Backlog Recommendations

```markdown
## Backlog Recommendations

### Phase 1: Foundation ([timeframe])
1. [item] — enables everything else
2. [item] — [reason]

### Phase 2: [Theme] ([timeframe])
3. [item]
4. [item]

### Phase 3: [Theme] ([timeframe])
5. [item]
6. [item]

### Rationale
[Why this sequence]
```

---

## Output Checklist

| Document | Location | Status |
|----------|----------|--------|
| Capability audit | `analysis/` | [ ] |
| Key files reference | `architecture/` | [ ] |
| Gap inventory | In capability audit | [ ] |
| Backlog recommendations | In capability audit | [ ] |

---

## Success Criteria

- [ ] Every claimed capability has evidence or documented gap
- [ ] Key files are identified for each area
- [ ] Gaps are prioritized with effort estimates
- [ ] Findings connect to strategic decisions
- [ ] Can answer "what actually exists?" questions

---

## Tips for Large Codebases

1. **Start with interfaces** — Public APIs reveal intended functionality
2. **Use enums** — They encode business domains and states
3. **Check tests** — They describe expected behavior
4. **Search for patterns** — Common naming reveals architecture
5. **Ask engineers** — They know where bodies are buried
6. **Iterate** — First pass reveals questions for second pass

---

_Related: [Full Framework](../framework/pm-ai-partner-framework.md)_

