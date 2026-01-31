# Workflow: Tool Building

**When to use:** Creating internal tools, prototypes, demos

**Time:** Hours to days (depending on scope)

**Output:** Working software

---

## Overview

```
┌────────┐    ┌──────────┐    ┌─────────┐    ┌────────┐
│  SPEC  │ → │ SCAFFOLD │ → │ ITERATE │ → │ POLISH │
│        │    │          │    │         │    │        │
│ Define │    │ Generate │    │ Refine  │    │ Ship   │
└────────┘    └──────────┘    └─────────┘    └────────┘
```

---

## Philosophy

Building tools with AI assistance requires:

1. **Clear specs** — AI can't read your mind
2. **Iterative prompts** — Build up, don't ask for everything at once
3. **Hands-on refinement** — AI scaffolds, you shape
4. **Known tech stack** — Use what AI knows well

---

## Phase 1: SPEC

### Goal

Define what you need clearly enough that AI can build it.

### Activities

- Define the problem
- Specify data model
- Describe user flows
- Choose tech stack

### Writing a Good Spec

**Include:**

- Purpose statement
- Data model (entities, relationships)
- User flows (what screens, what actions)
- Tech stack (be specific)
- Constraints (what to avoid)

**Don't include:**

- Implementation details (unless critical)
- Premature optimization
- Features for "later"

### Template: Tool Spec

```markdown
# [Tool Name] Specification

## Purpose
One sentence: what problem does this solve?

## Users
Who will use this? What do they need?

## Tech Stack
- Framework: [Next.js / React / etc.]
- Styling: [Tailwind / etc.]
- Data: [Database / localStorage / etc.]
- Other: [specific libraries]

## Data Model
[Define entities and relationships]

model [Entity] {
  id          Int
  [field]     [Type]
  [relation]  [Type]
}

## User Flows
1. [Flow name]
   - User [action]
   - System [response]

2. [Flow name]
   - ...

## UI Structure
- [Page/view 1]: [what it shows]
- [Page/view 2]: [what it shows]

## Constraints
- [Must not: X]
- [Must use: Y]
```

---

## Phase 2: SCAFFOLD

### Goal

Generate initial working structure.

### Activities

- Send spec to AI
- Get initial scaffold
- Verify it runs
- Identify gaps

### Prompting Strategy

**First prompt:** Full spec + scaffold request

```
I want to build [tool name].

[Full spec from Phase 1]

Please generate:
1. Project structure
2. Data model
3. Basic CRUD operations
4. Initial UI pages

Make sure the project builds successfully.
```

### Tips

- Ask for running code, not explanations
- Request it builds/compiles
- Have AI explain key architecture decisions
- Don't accept code you don't understand

---

## Phase 3: ITERATE

### Goal

Refine and extend through successive prompts.

### Activities

- Test what was generated
- Identify what's missing
- Request specific additions
- Build up complexity

### Iterative Prompt Pattern

```
Step N: [Feature Name]

The current state: [what exists]

Now I want to add:
- [Specific capability 1]
- [Specific capability 2]

Requirements:
- [Constraint]
- [Constraint]

Please implement this while preserving existing functionality.
```

### Example Iteration Sequence

1. **Step 1:** Basic scaffold + data model
2. **Step 2:** Database integration
3. **Step 3:** Detailed CRUD UI
4. **Step 4:** Edit modals and forms
5. **Step 5:** Relationship linking
6. **Step 6:** Full detail pages
7. **Step 7:** Local storage / export

Each step built on the previous, never asking for too much at once.

### Tips

- One major feature per prompt
- Reference what already exists
- Test after each iteration
- Don't accumulate tech debt early

---

## Phase 4: POLISH

### Goal

Make it production-ready and shippable.

### Activities

- Fix edge cases
- Improve UX
- Add deployment config
- Document

### Prompting for Polish

**UX Improvements:**

```
The current [page/component] works but feels rough.

Issues:
- [specific issue]
- [specific issue]

Improve the UX while keeping functionality identical.
```

**Edge Cases:**

```
Users might:
- [edge case scenario]
- [edge case scenario]

Add handling for these cases.
```

**Deployment:**

```
I want to deploy this to [platform].

Current setup: [describe]

Add the necessary configuration for [deployment target].
```

---

## Tech Stack Recommendations

### For Internal Tools (PM Use)

**Recommended:**

- Next.js + App Router (good AI support)
- Tailwind CSS (fast styling)
- shadcn/ui (component library)
- localStorage or JSON file (simple data)

**When to add database:**

- Multiple users need shared data
- Data persistence across devices
- Complex queries needed

### AI-Friendly Patterns

- Clear file structure
- Explicit types (TypeScript)
- Conventional naming
- Modular components

---

## Common Pitfalls

| Pitfall | How to Avoid |
|---------|--------------|
| Spec too vague | Write explicit data model |
| Asking for too much | One major feature per prompt |
| Accepting broken code | Always test before next step |
| Ignoring architecture | Understand key decisions |
| Feature creep | Stick to original spec |
| Skipping polish | Users judge by edges |

---

## Documentation

### For Yourself

```markdown
# [Tool Name] Development Log

## Purpose
[Why I built this]

## Prompts Used
1. [Summary of Step 1] → [Outcome]
2. [Summary of Step 2] → [Outcome]
...

## Key Decisions
- [Decision]: [Rationale]

## Future Ideas
- [Idea 1]
- [Idea 2]
```

### For Users

```markdown
# [Tool Name]

## What It Does
[One paragraph]

## How to Use
1. [Step]
2. [Step]

## How to Run
\`\`\`bash
[commands]
\`\`\`

## Data
[Where data is stored, how to reset]
```

---

## Output Checklist

- [ ] Working application
- [ ] Runs locally
- [ ] Core user flows work
- [ ] Edge cases handled
- [ ] Deployed (if needed)
- [ ] README written
- [ ] Development log archived

---

_Related: [Full Framework](../pm-ai-partner-framework.md)_

