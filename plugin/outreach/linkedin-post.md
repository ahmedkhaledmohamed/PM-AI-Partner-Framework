# LinkedIn Post — PM AI Partner v2.0 Update

**Context:** This is a follow-up to the original launch post:
https://www.linkedin.com/posts/ahmedkhaledmohamed_productmanagement-ai-framework-activity-7421877137277722624-0zfI

---

## Post

A month ago I shared the PM AI Partner Framework — the idea that PM work is reconciling four sources of truth (code, docs, data, judgment), and AI should help you explore each one.

The response made one thing clear: the framework resonated, but getting started was too much friction.

So I turned it into a plugin you can install in one command:

npx pm-ai-partner@latest

What changed in v2.0:

The six agent modes are now 12 installable skills. You invoke them by name — /pm:devil-advocate to stress-test a proposal, /pm:technical-analyst to explore a codebase, /pm:hypothesis-tester to design an A/B test, /pm:competitor-analyst to map a competitive landscape.

Added 6 workflow commands for recurring PM tasks — /pm:plan-week, /pm:write-brief, /pm:prep-meeting, /pm:audit-codebase, /pm:competitor-scan, /pm:metrics-review. Each one is a multi-step workflow, not a single prompt.

Added 3 automation hooks that run in the background — a quality gate that checks docs before you share them, draft status tracking, and commit reminders.

And it now works with Claude Code, Cursor, and Codex. One install covers all three.

The biggest lesson from building this: the gap isn't "AI can't do PM work." It's that nobody packaged PM thinking patterns into a format AI tools can actually use. Skills aren't prompts — they're encoded judgment.

Still open source. Still free. If you try it, I'd love to hear what's missing.

GitHub: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework
npm: https://www.npmjs.com/package/pm-ai-partner

#ProductManagement #ClaudeCode #AI #OpenSource
