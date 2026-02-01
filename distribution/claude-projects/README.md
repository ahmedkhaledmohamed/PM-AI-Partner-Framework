# Claude Projects Distribution - PM AI Partner

This folder contains everything you need to create a Claude Project based on the PM AI Partner Framework.

## What You'll Get

A Claude Project that:
- Understands the PM AI Partner Framework deeply
- Operates in six distinct agent modes
- Knows eight PM workflow patterns
- Has full framework documentation in its knowledge base
- Persists context across conversations within the project

## Why Claude Projects?

| Advantage | Description |
|-----------|-------------|
| **Best reasoning** | Claude excels at nuanced PM analysis |
| **200K context** | Handle long documents, codebases, strategy docs |
| **Project memory** | Knowledge files persist across all conversations |
| **Native framework** | This framework was built with Claude |
| **Team sharing** | Share with team on Team/Enterprise plans |

---

## Setup Instructions

### Prerequisites
- Claude Pro ($20/month) or Team/Enterprise plan
- Access to [claude.ai](https://claude.ai)

### Step 1: Create a New Project

1. Go to [claude.ai](https://claude.ai)
2. Click **"Projects"** in the left sidebar
3. Click **"Create Project"** (or the + button)
4. Name it: `PM AI Partner`

### Step 2: Add Project Instructions

Click **"Set custom instructions"** and paste the content from `instructions.md`.

### Step 3: Upload Knowledge Files

Click **"Add content"** and upload these files from the main repository:

| File | Purpose |
|------|---------|
| `framework/core/pm-ai-partner-framework.md` | Complete methodology |
| `framework/core/quick-reference.md` | One-page cheat sheet |
| `framework/core/starter-prompts.md` | Copy-paste prompts |
| `framework/core/workflows/*.md` | All workflow guides |

**Tip:** You can also add your own team docs, strategy files, or codebase snippets as knowledge.

### Step 4: Test Your Project

Start a new conversation in the project and ask:

```
What are the six agent modes in the PM AI Partner Framework?
```

Claude should describe all six modes with their purposes and characteristics.

### Step 5: Share (Optional)

On Team/Enterprise plans:
1. Click the share icon on the project
2. Add team members
3. They'll see the same knowledge base and instructions

---

## How to Use Your Project

### Starting Conversations

Each conversation in the project has access to the knowledge files. Just start with your need:

```
"I need to define what my team does - help me build a charter."
"Act as Technical Analyst and audit this codebase for capabilities."
"Challenge my roadmap proposal as a skeptical VP."
```

### Invoking Agent Modes

Explicitly request a mode:

```
"Act as [Mode Name]. [Your request]"

Examples:
- "Act as Technical Analyst. Map the capabilities in this code."
- "Act as Devil's Advocate. Stress-test my strategy."
- "Act as Writer. Help me draft a PRD for leadership."
- "Act as Data Analyst. Find patterns in these metrics."
- "Act as Thought Partner. Help me explore our options."
- "Act as Builder. Create a prototype dashboard."
```

### Using Workflows

Describe your situation and Claude will guide you through the appropriate workflow:

```
"I just joined a new team and nobody can explain what we do."
→ Claude guides you through Strategic Clarity workflow

"I need to plan next quarter's priorities."
→ Claude guides you through Planning Cycle workflow

"What does this codebase actually do?"
→ Claude guides you through Codebase Deep-Dive workflow
```

---

## Example Sessions

### Session 1: Strategic Clarity
```
You: "I'm new to this team. There's confusion about what we own vs adjacent teams. Help me build clarity."

Claude: "Let's use the Strategic Clarity workflow. I'll guide you through four phases:

ABSORB → AUDIT → ARTICULATE → ALIGN

First, some questions:
1. What systems or services does your team currently own?
2. Who uses what you build - internal teams or end users?
3. What adjacent teams exist and how do people confuse you with them?
4. Do you have existing docs (charters, handovers, RFCs) I should review?

Once I understand the landscape, I'll help you articulate a clear identity."
```

### Session 2: Code Analysis
```
You: "Act as Technical Analyst. Here's our API gateway code: [paste code]
What product capabilities does this represent?"

Claude: "Analyzing as Technical Analyst. From a product perspective:

| Capability | Evidence | Product Meaning |
|------------|----------|-----------------|
| Rate limiting | ratelimit.go L45-89 | Protects services from overload |
| Auth proxy | auth.go L23-156 | Centralizes authentication |
| Request routing | router.go L12-234 | Directs traffic to services |
| Circuit breaker | breaker.go L67-123 | Graceful degradation |

Gaps I notice:
- No request tracing (debugging difficulty?)
- No A/B routing (experimentation limitation?)
- No caching layer (performance opportunity?)

Would you like me to explore any of these gaps further?"
```

### Session 3: Idea Challenge
```
You: "I want to propose we rebuild our data pipeline from scratch. Challenge this as a skeptical engineering director."

Claude: "As skeptical Engineering Director:

'I have significant concerns:

1. **Scope Creep**: Rebuilds always take 3x longer than estimated. What prevents incremental fixes?

2. **Opportunity Cost**: What customer value are we not delivering while rebuilding infra?

3. **Risk**: How do we migrate 50 TB of data without downtime? What's the rollback plan?

4. **Evidence**: Show me metrics proving the current pipeline is the bottleneck. Have we tried targeted optimizations?

5. **Alternatives considered**:
   - Add caching to slow queries?
   - Optimize the top 3 expensive transforms?
   - Scale horizontally before rewriting?

Before I approve, I need:
- Performance data showing current system is broken
- Cost-benefit analysis: rebuild vs targeted fixes
- Detailed migration plan with rollback strategy
- Stakeholder alignment from dependent teams'

---

How would you respond to these objections?"
```

---

## Adding Your Own Context

### Team-Specific Knowledge

Add files to your project's knowledge base:
- Team charter and mission docs
- Existing PRDs and strategy docs
- Stakeholder maps
- Code architecture diagrams
- Metrics dashboards (as screenshots or exports)

### Custom Instructions

Extend the base instructions with your context:

```markdown
## Team Context

This PM works at [Company] on the [Product] team.

Key stakeholders:
- VP Product: [Name] - Cares about [X]
- Engineering Director: [Name] - Cares about [Y]
- Design Lead: [Name] - Cares about [Z]

Internal terminology:
- [Term 1]: [Definition]
- [Term 2]: [Definition]

Current priorities:
1. [Priority 1]
2. [Priority 2]
```

---

## Differences from Other Platforms

| Feature | Claude Projects | Custom GPT | Gemini Gem |
|---------|-----------------|------------|------------|
| **Knowledge files** | Up to 200K tokens | Up to 10 files | No uploads |
| **Context window** | 200K tokens | ~128K tokens | ~32K tokens |
| **Reasoning depth** | Excellent | Good | Good |
| **Team sharing** | Team/Enterprise | Enterprise | Workspace |
| **Web browsing** | No | Optional | Built-in |
| **Code execution** | Artifacts | Code Interpreter | Colab |
| **Cost** | $20/mo (Pro) | $20/mo (Plus) | $20/mo (Advanced) |

### When to Use Claude Projects

- Complex strategic analysis requiring deep reasoning
- Long documents that need full context
- Work where you want persistent knowledge across sessions
- Native framework experience (built for Claude)
- Team collaboration on PM work

---

## Troubleshooting

### "Claude doesn't seem to know the framework"
- Verify knowledge files uploaded successfully (check project settings)
- Reference the framework explicitly: "Using the PM AI Partner Framework..."
- Invoke agent modes by name: "Act as Technical Analyst..."

### "Context seems lost between conversations"
- Each conversation is separate, but all share project knowledge
- For continuity, summarize previous work at session start
- Or copy key conclusions into a "progress.md" knowledge file

### "Responses are too generic"
- Provide more specific context in your prompt
- Reference uploaded documents: "Based on the team charter..."
- Be explicit about output format and audience

### "Knowledge files aren't being used"
- Check that files are in the project (not just attached to a conversation)
- Files must be text-based (.md, .txt, .pdf work best)
- Large codebases should be uploaded as relevant excerpts

---

## Sharing with Your Team

### On Claude Team/Enterprise

1. Open project settings
2. Click "Share project"
3. Add team members by email
4. They'll see all knowledge files and instructions

### Best Practices for Team Use

- **Centralize knowledge**: Add shared docs to project knowledge
- **Document conventions**: Note which modes to use for what
- **Share templates**: Create starter prompts for common tasks
- **Regular sync**: Update knowledge files as team docs evolve

---

## Maintenance

### Updating Knowledge Files

When framework or team docs change:
1. Remove outdated files from project
2. Upload new versions
3. Test a sample conversation
4. Notify team if shared

### Syncing with Framework Updates

1. Watch the [GitHub repo](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework) for updates
2. Download new framework files
3. Replace in project knowledge
4. Review instruction changes in `instructions.md`

---

## Limitations

**Current constraints:**
- No web browsing (unlike Gemini)
- No direct code execution (use Artifacts for code)
- Knowledge files must be uploaded (no live URL fetching)
- Cannot access local filesystem

**Compared to Cursor/Claude Code:**
- Claude Projects: Great for strategy, planning, documentation
- Cursor/Claude Code: Better for direct codebase work, refactoring

---

## Support

- **Issues:** [GitHub](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/issues)
- **Questions:** [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed)
- **Updates:** Star/watch the repo

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Initial Claude Projects distribution |

---

**Ready to create your project? Start with Step 1 above!**
