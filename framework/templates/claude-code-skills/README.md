# Claude Code Skills for PM AI Partner Framework

This directory contains Claude Code Skills — reusable AI behaviors that can be invoked via slash commands or triggered automatically based on conversation context.

## What Are Skills?

Skills are markdown files (`SKILL.md`) with YAML frontmatter that define how Claude Code should behave in specific situations. Each skill has:
- **Name**: Lowercase, hyphenated identifier (used as `/slash-command`)
- **Description**: When to use this skill (used for auto-triggering)
- **Instructions**: How Claude should behave
- **Examples**: Concrete input/output demonstrations

### Claude Code-Specific Features

These skills use Claude Code frontmatter fields not available in other editors:

| Field | Purpose |
|-------|---------|
| `allowed-tools` | Tools Claude can use without asking permission |
| `argument-hint` | Hint shown in autocomplete (e.g., `[topic]`) |
| `disable-model-invocation` | Prevent Claude from auto-triggering the skill |
| `context: fork` | Run the skill in an isolated subagent |
| `agent` | Subagent type to use (e.g., `Explore`, `Plan`) |

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

### Option 1: Personal Skills (All Projects)

Copy all skills to your personal Claude Code skills directory:

```bash
mkdir -p ~/.claude/skills
cp -r thought-partner ~/.claude/skills/
cp -r technical-analyst ~/.claude/skills/
cp -r writer ~/.claude/skills/
cp -r devil-advocate ~/.claude/skills/
cp -r builder ~/.claude/skills/
cp -r data-analyst ~/.claude/skills/
cp -r product-brief ~/.claude/skills/
cp -r meeting-prep ~/.claude/skills/
cp -r stakeholder-update ~/.claude/skills/
cp -r strategic-clarity ~/.claude/skills/
```

Or as a one-liner:

```bash
mkdir -p ~/.claude/skills && for d in */; do [ -f "$d/SKILL.md" ] && cp -r "$d" ~/.claude/skills/; done
```

### Option 2: Project-Level Skills

To share skills with your team via a repository:

```bash
mkdir -p .claude/skills
cp -r thought-partner .claude/skills/
# ... add others
git add .claude/skills
git commit -m "Add PM skills for Claude Code"
```

### Option 3: Install Specific Skills

Copy only the skills you need:

```bash
mkdir -p ~/.claude/skills
cp -r thought-partner ~/.claude/skills/
cp -r writer ~/.claude/skills/
# ... add others as needed
```

## Usage

Once installed, skills work in two ways:

### 1. Slash Commands

Type the skill name as a slash command in Claude Code:

```
/thought-partner I need to think through our Q2 priorities
```

```
/technical-analyst How does the push notification service work?
```

```
/data-analyst What's our delivery rate trend for the last 30 days?
```

### 2. Auto-Triggering

Skills automatically activate based on conversation context. For example:

- Saying "help me brainstorm" triggers `thought-partner`
- Saying "write a product brief" triggers `product-brief`
- Asking "challenge my proposal" triggers `devil-advocate`

## Skill Locations

| Location | Scope | Use Case |
|----------|-------|----------|
| `~/.claude/skills/` | All projects | Personal skills, available everywhere |
| `.claude/skills/` | Single project | Shared with team via git |

## Customizing Skills

Feel free to customize these skills for your context:

1. **Adjust tone** — Make them more/less formal
2. **Add examples** — Include scenarios from your domain
3. **Modify triggers** — Change the description to match how you talk
4. **Add domain context** — Reference your team's tools, processes, terminology
5. **Adjust allowed-tools** — Add MCP tools specific to your setup

### Example Customization

```yaml
---
name: thought-partner
description: Collaborative thinking partner for [YOUR TEAM] strategy discussions.
  Use when exploring [YOUR DOMAIN] problems, brainstorming features, or thinking
  through [YOUR COMPANY] priorities.
argument-hint: [topic or question]
---
```

## Differences from Cursor Skills

These skills are adapted from the Cursor Skills in `../skills/`. Key differences:

| Feature | Cursor Skills | Claude Code Skills |
|---------|--------------|-------------------|
| Location | `~/.cursor/skills/` | `~/.claude/skills/` |
| Tool permissions | Not supported | `allowed-tools` field |
| Argument hints | Not supported | `argument-hint` field |
| Subagent isolation | Not supported | `context: fork` |
| Auto-triggering | Via description | Via description |
| Slash commands | Same (`/skill-name`) | Same (`/skill-name`) |

## Contributing

Improvements welcome:

1. Fork the repository
2. Edit the skill in `framework/templates/claude-code-skills/`
3. Submit a PR with your improvements

---

*Part of the [PM AI Partner Framework](../../../README.md)*
