# Anthropic Marketplace Submission

**Submit at:** https://platform.claude.com/plugins/submit
**Alternative:** https://claude.ai/settings/plugins/submit

---

## Submission Fields

**Plugin name:** pm-ai-partner

**Display name:** PM AI Partner

**Description:**
AI-powered skills for Product Managers — 10 agent modes for thinking, writing, analyzing, building, and decision-making. Turn Claude into your PM thinking partner with structured skills, workflow commands, and automation hooks.

**Short description (one line):**
10 PM-specific agent skills, 4 workflow commands, and 3 automation hooks for Product Managers.

**Repository URL:** https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework

**Plugin directory in repo:** plugin/

**Version:** 2.0.0

**Author:** Ahmed Khaled Mohamed

**Author email:** ahmd.khaled.a.mohamed@gmail.com

**License:** MIT

**Category:** Productivity / Product Management

**Tags:** product-management, pm, skills, workflows, writing, analysis, meetings, strategy

---

## Components

### Skills (10)
- thought-partner — Brainstorming and idea exploration
- technical-analyst — Codebase analysis translated for PMs
- writer — PM document drafting and polish
- devil-advocate — Stress-test ideas and proposals
- builder — Build tools, scripts, and prototypes
- data-analyst — Metrics analysis and SQL queries
- product-brief — PRDs and feature specs
- meeting-prep — Meeting preparation and talking points
- stakeholder-update — Status reports and executive summaries
- strategic-clarity — Team identity and boundaries

### Commands (4)
- /pm:plan-week — Weekly planning workflow
- /pm:write-brief — Guided product brief creation
- /pm:prep-meeting — Meeting preparation
- /pm:audit-codebase — PM-focused codebase exploration

### Hooks (3)
- Quality gate (PostToolUse Write|Edit) — Checks product-catalog/ docs against quality bar
- Draft status (PostToolUse Write|Edit) — Reminds to add status markers in sandbox/
- Commit reminder (PreToolUse Bash) — Prompts to capture lessons in CLAUDE.md before git commit

---

## Steps

1. Go to https://platform.claude.com/plugins/submit (or https://claude.ai/settings/plugins/submit)
2. Fill in the fields above
3. Point to the `plugin/` directory in the repo
4. Submit and wait for review
