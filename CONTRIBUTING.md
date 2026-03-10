# Contributing to PM AI Partner Framework

Thank you for your interest in contributing! This framework is built by PMs, for PMs, and your input makes it better for everyone.

---

## Ways to Contribute

| Contribution | Effort | Impact |
|---|---|---|
| [Add Advanced Patterns to a skill](#improving-an-existing-skill) | Low | High |
| [Share a success story / case study](#contributing-a-case-study) | Low | High |
| [Add a new skill](#contributing-a-new-skill) | Medium | High |
| [Add a workflow](#contributing-a-workflow) | Medium | Medium |
| [Fix bugs or improve docs](#other-contributions) | Low | Medium |

---

## Improving an Existing Skill

**This is the highest-leverage contribution.** Adding Advanced Patterns to existing skills encodes real PM experience into the framework.

### What's an Advanced Pattern?

Advanced Patterns are specific lessons from PM practice — not textbook advice.

**Good pattern:**
> **The data gap** — Many proposals sound data-driven but rest on data that doesn't exist yet. When reviewing a brief that says "we'll measure X," check: does the instrumentation exist? Is the data flowing? Can you query it today? If not, the metric is aspirational, not measurable. Flag it and propose a proxy metric that's available now.

**Bad pattern (too generic):**
> **Use data** — Always support your arguments with data and metrics.

The test: would a PM with 5+ years of experience nod and say "yes, I've learned that the hard way"? If it reads like a textbook, it's not specific enough.

### Steps

1. Edit `plugin/skills/<skill-name>/SKILL.md`
2. Add your pattern to the `### Advanced Patterns` section, numbered sequentially
3. Copy the updated file to `framework/templates/skills/<skill-name>/SKILL.md`
4. Submit a PR explaining the pattern and the experience behind it

---

## Contributing a New Skill

### Skill File Structure

Every skill lives in `plugin/skills/<skill-name>/SKILL.md`:

```markdown
---
name: skill-name
description: One sentence explaining when this skill triggers. Include specific trigger words.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
argument-hint: [what the user provides]
---

# Skill Name Mode

## Instructions

What the AI should do in this mode.

### Behavior
1. Step-by-step behavior rules (5 items)

### Tone
- Bullet list of tone guidelines (4 items)

### What NOT to Do
- Anti-patterns to avoid (4 items)

### Advanced Patterns
1. **Pattern Name** — Description of a real lesson from PM practice.
2. **Pattern Name** — Another specific insight from doing the work.
3. (aim for 5+ patterns)

## Output Format
How to structure the response.

## Examples

### Example 1: [Scenario]
**User:** [realistic prompt]
**Good Response:** [detailed response showing the skill in action]

### Example 2: [Scenario]
**User:** [realistic prompt]
**Good Response:** [detailed response]
```

### Checklist for New Skills

1. **Create the skill file:**
   ```
   plugin/skills/your-skill-name/SKILL.md
   ```

2. **Copy to framework templates:**
   ```
   framework/templates/skills/your-skill-name/SKILL.md
   ```

3. **Update the installer** — Add your skill name to the `SKILLS` array in `plugin/bin/install.js`

4. **Update documentation:**
   - `plugin/README.md` — Add row to the skills table
   - `README.md` — Add to the skills summary
   - `CLAUDE.md` — Add slash command reference

5. **Run tests:**
   ```bash
   cd plugin && npm test
   ```

6. **Submit a PR** with:
   - Title: `Add [skill-name] skill`
   - Body: What PM task this covers, why it's distinct from existing skills, and what experience informed the Advanced Patterns

### What Makes a Good Skill Candidate

A skill should cover a **distinct PM activity** not already handled well by existing skills. Ask:

- Does this require a different AI "personality" than existing skills?
- Can you write 5+ Advanced Patterns from real experience?
- Would a PM use this at least monthly?

Current skills: thought-partner, technical-analyst, writer, devil-advocate, builder, data-analyst, product-brief, meeting-prep, stakeholder-update, strategic-clarity, hypothesis-tester, competitor-analyst.

---

## Contributing a Workflow

Workflows live in `framework/core/workflows/` and follow a 4-phase structure:

```markdown
# Workflow Name

## When to Use
One paragraph describing the trigger scenario.

## Phases

### Phase 1: VERB (e.g., REVIEW, QUESTION, TRANSLATE)
What to do, AI prompts to use, expected output.

### Phase 2: VERB
...

### Phase 3: VERB
...

### Phase 4: VERB
...

## Output Checklist
- [ ] Concrete deliverables from each phase

## Common Patterns
Lessons learned from running this workflow in practice.
```

See `framework/core/workflows/data-investigation.md` for a strong example.

After creating the file, update `framework/core/workflows/README.md` with the new entry.

---

## Contributing a Case Study

Case studies demonstrate the framework in action. Use the template at `framework/examples/case-studies/TEMPLATE.md`.

Key requirements:
- Real scenario (anonymized if needed)
- Show the specific skills and workflows used
- Include a **Before/After** section — what does this task look like without the framework?
- Be honest about limitations and what the framework didn't help with

---

## Other Contributions

### Report Issues

- Use the "Bug Report" template
- Include your environment (Claude Code / Cursor / Codex, OS)
- Describe what happened vs. what you expected

### Suggest Features

- Open an issue describing the problem you're solving
- Share alternatives you've considered

### Improve Documentation

- Fix typos, unclear explanations, or broken links
- Use Mermaid diagrams instead of ASCII art for visuals

---

## Style Guide

- **Markdown**: Use Mermaid for diagrams, not ASCII art
- **Tone**: Direct and practical. No filler. Lead with the insight.
- **Examples**: Use realistic PM scenarios, not generic placeholders
- **Skills**: Second person ("You should...") for instructions, third person for patterns

### Plugin Contributions

The plugin lives in `plugin/` and ships as an npm package (`pm-ai-partner`). When contributing:

- **New skills** go in `plugin/skills/skill-name/SKILL.md` — include YAML frontmatter with `name`, `description`, and optionally `allowed-tools`
- **New commands** go in `plugin/commands/pm/command-name.md`
- **New hooks** are defined in `plugin/hooks/hooks.json` with corresponding shell scripts in `plugin/hooks/`
- **Installer changes** go in `plugin/bin/install.js`
- After adding skills, mirror them to `framework/templates/skills/` (Cursor) and `framework/templates/claude-code-skills/` (Claude Code) for users who prefer manual setup
- Run `npx pm-ai-partner@latest` locally to test the install flow before submitting

---

## Community Guidelines

- Be respectful and constructive
- Help others learn
- Give credit where it's due
- Assume good intent

---

## Questions?

- **Discussions**: [GitHub Discussions](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/discussions)
- **Email**: ahmd.khaled.a.mohamed@gmail.com

---

## Recognition

Contributors are recognized in:
- The README (for significant contributions)
- Release notes (when changes ship)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
