# Starter Prompts

Copy-paste prompts for common PM scenarios. Customize the bracketed sections for your context.

---

## Agent Mode Prompts

### Technical Analyst

```
Act as a rigorous Technical Analyst. I need you to examine [system/codebase/feature] and build a systematic assessment.

Focus on:
1. What capabilities actually exist?
2. What's the evidence for each claim?
3. What's missing or incomplete?
4. What patterns do you observe?

Question my assumptions. Be skeptical.
```

### Writer

```
Help me write a clear [document type] for [audience].

Context:
- We are: [team/project description]
- The purpose: [what this doc should accomplish]
- Key message: [one sentence summary]

Here are my rough notes:
[paste notes]

Structure this clearly and help me iterate.
```

### Devil's Advocate

```
I want you to challenge this idea. Role-play as a skeptical [director/engineer/PM/stakeholder].

My proposal: [summary of your idea]

What are the strongest objections?
What questions would you ask?
What am I not considering?

Be constructively critical.
```

### Builder

```
I want to build [tool/prototype/script].

Spec:
- Purpose: [what problem it solves]
- Users: [who will use it]
- Tech: [preferred stack, e.g., Next.js + Tailwind]
- Core features: [list key capabilities]

Generate the initial scaffold, then we'll iterate step by step.
```

### Thought Partner

```
Help me think through [topic/problem].

Context: [relevant background]

What are the different ways to approach this?
What frameworks might apply?
What am I not considering?
What questions should I be asking?

Explore the space with me.
```

### Data Analyst

```
I have this data:
[paste or describe data]

Help me:
1. Identify patterns and anomalies
2. Generate hypotheses for what's happening
3. Suggest what to investigate next
4. Connect findings to [strategic goal/question]
```

---

## First Session Prompts

### New Role Orientation

```
I've just joined [team/company] as a PM. Here's what I know so far:

[paste notes from onboarding, meetings, docs]

Help me:
1. Identify key themes and tensions
2. Surface contradictions or gaps
3. List what's still unclear
4. Suggest questions I should be asking
```

### Codebase First Look

```
I'm a PM trying to understand [codebase/system] for the first time.

I need to understand the product meaning, not implementation details.

Start by helping me:
1. Identify the overall architecture
2. Find key entry points
3. Understand what capabilities exist
4. Map features to code locations
```

### Team Identity Discovery

```
I'm trying to define what [team name] actually does. There's confusion about our scope and boundaries.

What I've learned so far:
[paste notes]

Help me:
1. Draft a clear mission statement
2. Define boundaries with adjacent teams
3. Articulate our unique value
4. Identify common misunderstandings to address
```

---

## Common Scenarios

### Write a Brief

```
I need to write a [decision brief/PRD/strategy doc] about [topic].

Audience: [who will read this]
Goal: [what decision or action this should drive]
Constraints: [timeline, dependencies, limitations]

Here's my thinking so far:
[paste notes]

Help me structure this into a clear, compelling document.
```

### Understand a System

```
I'm trying to understand [system/feature/codebase].

What I know:
[paste what you've learned]

Questions I have:
1. [question]
2. [question]

Help me build a mental model. Focus on product capabilities, not implementation.
```

### Prepare for a Meeting

```
I'm meeting with [person], [their role], about [topic].

What I want to accomplish:
1. [goal 1]
2. [goal 2]

What they care about: [context about their priorities]

Help me:
1. Structure my key messages
2. Anticipate their questions
3. Prepare responses to likely pushback
4. Identify what I should ask them
```

### Stress-Test an Idea

```
I'm proposing [idea/strategy/decision].

My argument:
[summary of your reasoning]

Before I present this:
1. What are the strongest objections?
2. What evidence am I missing?
3. What assumptions am I making?
4. How would a skeptic respond?

Help me strengthen this before sharing.
```

### Synthesize Research

```
I've gathered these sources:
[list or paste excerpts]

Help me:
1. Identify key themes across sources
2. Surface contradictions or tensions
3. Highlight gaps in information
4. Draft a synthesis document

Focus on [specific question/goal].
```

### Draft Stakeholder Communication

```
I need to communicate [topic] to [audience].

Key points:
- [point 1]
- [point 2]
- [point 3]

Tone: [formal/casual/urgent/etc.]
Format: [email/slack/doc/presentation]

Draft this for me, then I'll refine.
```

---

## Iteration Patterns

### After First Draft

```
Here's the current draft:
[paste draft]

Help me improve:
1. Sharpen the language
2. Strengthen weak sections
3. Add evidence where claims are unsupported
4. Make it more [concise/detailed/actionable]
```

### Before Sharing

```
I'm about to share this with [audience]:
[paste document]

Review it for:
1. Clarity - Will they understand without context?
2. Accuracy - Are claims defensible?
3. Completeness - Is anything missing?
4. Tone - Is it appropriate for the audience?

What should I change before sending?
```

### After Feedback

```
I received this feedback on [document]:
[paste feedback]

My original intent was: [what you were trying to accomplish]

Help me:
1. Understand the feedback
2. Decide what to address
3. Revise accordingly
```

---

## Advanced Prompting (Claude Code Tips)

_From Boris Cherny (Claude Code creator) and the Claude Code team._

### Plan First, Execute Second
```
Before implementing anything, create a detailed plan with:
1. What you'll change and why
2. Files you'll modify
3. Potential risks or edge cases

I'll review the plan before you proceed.
```

### Challenge Mode (Staff Engineer Review)
```
Grill me on these changes. Don't make a PR until I pass your test.

Look for:
- Edge cases I might have missed
- Performance implications
- Simpler alternatives
- Potential bugs

Be harsh - I want to ship quality.
```

### Prove It Works
```
Prove to me this works. Show me:
- The behavioral diff between main and this branch
- Test output demonstrating the fix
- Before/after comparison
```

### Elegant Solution Prompt
```
Knowing everything you know now, scrap this implementation 
and build the elegant solution from scratch.
```

### Fix Bugs Autonomously
```
# With failing CI
Go fix the failing CI tests. Don't micromanage how.

# With error logs
Here are the error logs. Debug and fix: [paste logs]
```

### Subagent Power Mode
```
Explore this codebase and create a comprehensive architecture document.
Use subagents to parallelize - one for each major component.
```

### Learning Mode
```
Explain every change you make with the "why", not just the "what".
I'm trying to learn from this, not just get it done.
```

### Self-Documenting Prompt
```
After this task, update CLAUDE.md with any new context or rules 
that would help future sessions. What did you learn about this codebase?
```

---

## Workflow Accelerators

### Two-Claude Pattern
Use two Claude sessions for complex tasks:
1. **Claude A**: Write the plan/proposal
2. **Claude B**: Review it as a Staff Engineer
3. Iterate until Claude B approves, then implement

### Worktree Parallelism
For multi-track work:
```bash
# Create isolated worktrees
git worktree add ../repo-feature-a feature-a
git worktree add ../repo-feature-b feature-b

# Run separate Claude sessions in each
# No stashing, no context pollution
```

---

_See [Quick Reference](quick-reference.md) for the full framework cheat sheet._
