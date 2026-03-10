# LinkedIn Post — PM AI Partner v3.0 Update

**Context:** This is a follow-up to the original launch post:
https://www.linkedin.com/posts/ahmedkhaledmohamed_productmanagement-ai-framework-activity-7421877137277722624-0zfI

---

## Post

Two months ago I shared the PM AI Partner Framework — the idea that PM work is reconciling four sources of truth (code, docs, data, judgment), and AI should help you explore each one.

The response made one thing clear: the framework resonated, but getting started was too much friction.

So I turned it into a plugin you can install in one command:

npx pm-ai-partner@latest

What's in v3.0:

The six original agent modes are now 12 installable skills. You invoke them by name — /pm:devil-advocate to stress-test a proposal, /pm:technical-analyst to explore a codebase, /pm:hypothesis-tester to design an A/B test, /pm:competitor-analyst to map a competitive landscape.

6 workflow commands for recurring PM tasks — /pm:plan-week, /pm:write-brief, /pm:prep-meeting, /pm:audit-codebase, /pm:competitor-scan, /pm:metrics-review. Each one is a multi-step workflow, not a single prompt.

3 automation hooks that run in the background — a quality gate that checks docs before you share them, draft status tracking, and commit reminders.

17 MCP server configurations — GitHub, Linear, Slack, BigQuery, Google Drive, and more. Your weekly planning command now pulls context from your actual tools.

Every skill now includes 5+ Advanced Patterns — encoded PM judgment, not textbook templates. The Devil's Advocate skill knows to check for "the data gap" (proposals that sound data-driven but rest on data that doesn't exist). The Writer skill knows executive summaries should lead with the ask, not the background.

The biggest lesson from building this: the gap isn't "AI can't do PM work." It's that nobody packaged PM thinking patterns into a format AI tools can actually use. Skills aren't prompts — they're encoded judgment.

Works with Claude Code, Cursor, and Codex. Still open source. Still free. If you try it, I'd love to hear what's missing.

GitHub: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework
npm: https://www.npmjs.com/package/pm-ai-partner

#ProductManagement #ClaudeCode #AI #OpenSource
