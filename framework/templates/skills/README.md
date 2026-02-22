# Cursor Skills for PM AI Partner Framework

This directory contains Cursor Skills — reusable AI behaviors that can be invoked via slash commands or triggered automatically based on conversation context.

## What Are Skills?

Skills are markdown files that define how the AI should behave in specific situations. Each skill has:
- **Name**: Lowercase, hyphenated identifier
- **Description**: When to use this skill (used for auto-triggering)
- **Instructions**: How the AI should behave
- **Examples**: Concrete input/output demonstrations

## Available Skills

### Agent Modes (6)

| Skill | Command | Use For |
|-------|---------|---------|
| [thought-partner](thought-partner/SKILL.md) | `/thought-partner` | Exploring ideas, brainstorming, thinking through problems |
| [technical-analyst](technical-analyst/SKILL.md) | `/technical-analyst` | Understanding systems, code, and technical concepts |
| [writer](writer/SKILL.md) | `/writer` | Drafting documents, briefs, and communications |
| [devil-advocate](devil-advocate/SKILL.md) | `/devil-advocate` | Challenging ideas, finding weaknesses, stress-testing |
| [builder](builder/SKILL.md) | `/builder` | Creating tools, scripts, dashboards, prototypes |
| [data-analyst](data-analyst/SKILL.md) | `/data-analyst` | Querying data, analyzing metrics, extracting insights |

### Scenarios (3)

| Skill | Command | Use For |
|-------|---------|---------|
| [product-brief](product-brief/SKILL.md) | `/product-brief` | Writing PRDs, specs, and feature documentation |
| [meeting-prep](meeting-prep/SKILL.md) | `/meeting-prep` | Preparing talking points, anticipating questions |
| [stakeholder-update](stakeholder-update/SKILL.md) | `/stakeholder-update` | Status reports, progress updates, executive summaries |

### Workflows (1)

| Skill | Command | Use For |
|-------|---------|---------|
| [strategic-clarity](strategic-clarity/SKILL.md) | `/strategic-clarity` | New role onboarding, team identity, establishing boundaries |

## Installation

### Option 1: Install All Skills (Recommended)

Copy all skills to your personal Cursor skills directory:

```bash
# Create the destination if it doesn't exist
mkdir -p ~/.cursor/skills

# Copy all skills
cp -r thought-partner ~/.cursor/skills/
cp -r technical-analyst ~/.cursor/skills/
cp -r writer ~/.cursor/skills/
cp -r devil-advocate ~/.cursor/skills/
cp -r builder ~/.cursor/skills/
cp -r data-analyst ~/.cursor/skills/
cp -r product-brief ~/.cursor/skills/
cp -r meeting-prep ~/.cursor/skills/
cp -r stakeholder-update ~/.cursor/skills/
cp -r strategic-clarity ~/.cursor/skills/
```

Or as a one-liner:

```bash
mkdir -p ~/.cursor/skills && cp -r */  ~/.cursor/skills/
```

### Option 2: Install Specific Skills

Copy only the skills you need:

```bash
mkdir -p ~/.cursor/skills
cp -r thought-partner ~/.cursor/skills/
cp -r writer ~/.cursor/skills/
# ... add others as needed
```

### Option 3: Project-Level Skills

To share skills with your team via a repository:

```bash
mkdir -p .cursor/skills
cp -r thought-partner .cursor/skills/
# ... add others
git add .cursor/skills
git commit -m "Add PM skills"
```

## Usage

Once installed, skills work in two ways:

### 1. Slash Commands

Type the skill name as a slash command:

```
/thought-partner
I need to think through our Q2 priorities
```

### 2. Auto-Triggering

Skills automatically activate based on conversation context. For example:

- Saying "help me brainstorm" triggers `thought-partner`
- Saying "write a product brief" triggers `product-brief`
- Asking "challenge my proposal" triggers `devil-advocate`

## Skill Locations

| Location | Scope | Use Case |
|----------|-------|----------|
| `~/.cursor/skills/` | All projects | Personal skills, available everywhere |
| `.cursor/skills/` | Single project | Shared with team via git |

**Note:** Do not modify skills in `~/.cursor/skills-cursor/` — those are Cursor's built-in skills.

## Customizing Skills

Feel free to customize these skills for your context:

1. **Adjust tone** — Make them more/less formal
2. **Add examples** — Include scenarios from your domain
3. **Modify triggers** — Change the description to match how you talk
4. **Add domain context** — Reference your team's tools, processes, terminology

### Example Customization

```markdown
---
name: thought-partner
description: Collaborative thinking partner for [YOUR TEAM] strategy discussions. 
Use when exploring [YOUR DOMAIN] problems, brainstorming features, or thinking 
through [YOUR COMPANY] priorities.
---
```

## Creating New Skills

Use this template:

```markdown
---
name: your-skill-name
description: Brief description of when to use this skill. Include trigger 
phrases like "help me [action]" or "I need to [task]".
---

# Skill Name

## Instructions

Clear guidance for AI behavior in this mode.

### Behavior
1. [How to act]
2. [What to prioritize]
3. [What to avoid]

### Tone
- [Voice characteristics]

## Examples

### Example 1: [Scenario]

**User:** [Sample input]

**Good Response:**
[Sample output demonstrating the skill]
```

## Troubleshooting

### Skills Not Appearing

1. Check the skill is in the correct location (`~/.cursor/skills/skill-name/SKILL.md`)
2. Verify the YAML frontmatter is valid (no tabs, proper `---` delimiters)
3. Restart Cursor to reload skills

### Skills Not Auto-Triggering

- The `description` field controls auto-triggering
- Include common phrases users might say
- Be specific about when the skill applies

### Conflicts with Built-in Skills

- Your skills take precedence over built-in skills
- If a built-in skill keeps triggering, rename your skill or adjust its description

## Contributing

Found a better way to structure a skill? Improvements welcome:

1. Fork the repository
2. Edit the skill in `framework/templates/skills/`
3. Submit a PR with your improvements

---

*Part of the [PM AI Partner Framework](../../../README.md)*
