# [Project/Team Name] Workspace

## What This Is

[Brief description of your team/project and what you're working on]

## Directory Structure

```
[your-workspace]/
├── CLAUDE.md           # This file
├── sandbox/            # Personal drafts, exploration, iteration
├── product-catalog/    # Polished artifacts for sharing
└── [other folders]/    # Add as needed
```

## Current Focus

[What you're working on this quarter/sprint]

## Key Context

### Team

- **Team name:** [Your Team]
- **Mission:** [One sentence]
- **Key stakeholders:** [List]

### Systems We Own

- [System 1] - [brief description]
- [System 2] - [brief description]

### Adjacent Teams

- [Team A] - [what they own, how we interact]
- [Team B] - [what they own, how we interact]

## How to Help

When I ask about:
- **Strategy** - Look in `sandbox/strategy/` or `product-catalog/strategy/`
- **Analysis** - Look in `sandbox/analysis/`
- **Planning** - Look in `sandbox/planning/`
- **Context** - Look in `sandbox/context/`

## Constraints

- [Any important rules or constraints to follow]
- [Things to avoid or be careful about]

## Links

- [Internal wiki/docs]
- [Codebase location]
- [Dashboard/metrics]

---

## Claude Code Best Practices

_Based on tips from Boris Cherny (Claude Code creator) and the Claude Code team._

### Plan Mode for Complex Tasks

For complex tasks, start in **plan mode** (shift+Tab in Claude Code):

1. Pour energy into getting the plan right
2. Review the plan critically before implementation
3. Once solid, Claude can 1-shot the implementation

**Prompt:** "Before implementing, create a detailed plan. I'll review it before you proceed."

### Self-Correcting Context

After every correction or mistake, update this file:

> "Update CLAUDE.md so you don't make that mistake again."

Claude is good at writing rules for itself. Ruthlessly edit this file over time.

### Advanced Prompting Techniques

**Challenge Claude (make it your reviewer):**
```
Grill me on these changes and don't proceed until I pass your test.
```

**Verify behavior:**
```
Prove to me this works - show me the diff or test output.
```

**After mediocre solutions:**
```
Knowing everything you know now, scrap this and implement the elegant solution.
```

**Reduce ambiguity:**
Write detailed specs before handing work off. The more specific, the better the output.

### Subagents for Heavy Lifting

Append "use subagents" to throw more compute at complex problems:

```
Explore this codebase and explain the architecture. Use subagents.
```

### Parallel Work with Git Worktrees

For multi-tasking, use git worktrees to run parallel Claude sessions:

```bash
# Create worktree for a feature
git worktree add ../repo-feature feature-branch

# Each worktree gets its own Claude session
cd ../repo-feature && claude
```

### Effective Review Prompt

When you want critical feedback:

```
Review this as a Staff Engineer would. Be critical. Look for:
- Edge cases I might have missed
- Performance implications
- Simpler alternatives
- Potential bugs

Don't approve unless it's actually good.
```
