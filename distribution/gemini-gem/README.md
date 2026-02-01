# Gemini Gem Distribution - PM AI Partner

This folder contains everything you need to create a Gemini Gem based on the PM AI Partner Framework.

## What You'll Get

A specialized Gemini assistant that:
- Understands the PM AI Partner Framework
- Operates in six distinct agent modes
- Knows eight PM workflow patterns
- Reconciles Code, Docs, Data, and Judgment
- Helps you think rigorously, not write for you

## Setup Instructions

### Prerequisites
- Google account with Gemini access
- Gemini Advanced (recommended for best performance, but works with free tier)

### Step 1: Access Gemini Gems

1. Go to [Gemini](https://gemini.google.com)
2. Look for **"Gem Manager"** in the sidebar (or top-right menu)
3. Click **"Create new Gem"**

> **Note:** Gems are currently in experimental/preview. If you don't see Gem Manager, check Google Labs settings or wait for rollout.

### Step 2: Basic Configuration

**Gem Name:**
```
PM AI Partner
```

**Description:**
```
A thinking partner for Product Managers using the PM AI Partner Framework. Reconciles Code, Docs, Data, and Judgment through six agent modes and workflow patterns.
```

### Step 3: Add Instructions

Copy the **entire content** from `instructions.md` into the instructions field.

**Tips for Gemini:**
- Gemini Gems support longer instructions than Custom GPTs
- The instruction field is free-form markdown
- You can include examples directly in the instructions

### Step 4: Knowledge Base

Unlike Custom GPTs, Gemini Gems don't support file uploads (yet). Instead, you'll provide context in two ways:

#### Option A: Include Knowledge in Instructions (Recommended)

Add this section at the end of `instructions.md`:

```markdown
## Framework Reference

You have access to the full PM AI Partner Framework. Key resources:

- Full framework: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/framework/pm-ai-partner-framework.md
- Quick reference: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/blob/main/framework/quick-reference.md
- Workflows: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework/tree/main/workflows

When PMs ask for specific workflow details, fetch the latest from GitHub.
```

#### Option B: Paste Key Framework Sections

Include essential sections directly in the instructions (increases token count but more reliable):

1. **Four Sources of Truth** — Already included
2. **Six Agent Modes** — Already included
3. **Workflow Summaries** — Already included
4. **Example Prompts** — Add from quick-reference.md

### Step 5: Set Conversation Style

In Gem settings (if available):
- **Tone:** Professional, direct, structured
- **Response length:** Medium (adaptable based on request)
- **Creativity:** Balanced (not too creative, not too rigid)

### Step 6: Test Your Gem

Click **"Save"** then test with:

```
"What are the six agent modes in the PM AI Partner Framework?"
```

Expected response: Should list all six modes with brief descriptions.

### Step 7: Share Your Gem

Gemini Gems can be:
- **Private** — Only you
- **Shared with link** — Anyone with link
- **Organization-wide** (Google Workspace accounts)

Choose based on your needs.

---

## How to Use Your Gem

### Starting a Conversation

When you open the Gem, it's ready to help. Just start with your need:

```
"I need to understand what my team does. Help me define our charter."
"Act as a Technical Analyst and map capabilities in this codebase."
"Challenge my roadmap as a skeptical director."
```

### Invoking Agent Modes

Explicitly state which mode you want:

```
"Act as [Mode Name]. [Your request]"

Examples:
- "Act as Technical Analyst. Examine this API code."
- "Act as Devil's Advocate. Challenge my strategy."
- "Act as Writer. Help me draft a PRD."
- "Act as Data Analyst. Find patterns in these metrics."
- "Act as Thought Partner. Help me explore options."
- "Act as Builder. Create a prototype dashboard."
```

### Using Workflows

Describe your situation, and the Gem will recognize the workflow:

```
"I just joined a new team and don't know what we do."
→ Gem suggests Strategic Clarity workflow

"I need to plan next quarter's roadmap."
→ Gem suggests Planning Cycle workflow

"I want to build a tool to track metrics."
→ Gem suggests Tool Building workflow
```

---

## Example Sessions

### Session 1: Strategic Clarity
```
You: "I'm a new PM. My team doesn't have a clear identity. Help."

Gem: "Let's use the Strategic Clarity workflow. I'll guide you through 4 phases:
ABSORB → AUDIT → ARTICULATE → ALIGN

First, tell me:
1. What systems/services does your team own?
2. Who are your users (internal teams? end users?)?
3. What adjacent teams exist and how are you different?

I'll help you build a clear team charter."

[You provide context, iterate through phases with Gem's help]
```

### Session 2: Code Analysis
```
You: "Act as Technical Analyst. Here's our backend code: [paste]
What product capabilities does this represent?"

Gem: "Analyzing as Technical Analyst. From a product perspective, this code implements:

| Capability | Evidence | Product Meaning |
|------------|----------|-----------------|
| Authentication | auth.py lines 23-89 | Secure user login |
| Rate limiting | middleware.py lines 45-67 | API usage control |
| Webhooks | events.py lines 102-234 | Real-time event notifications |

Gaps I notice:
- No audit logging (compliance issue?)
- No retry logic for webhooks (reliability concern?)

Should we explore these gaps?"
```

### Session 3: Meeting Prep
```
You: "I'm presenting to the VP tomorrow about our roadmap. Help me prepare."

Gem: "Let's prep using the Communication Prep workflow.

Clarify for me:
1. What's the VP's main concern about your team?
2. What decision do you need from them?
3. What pushback do you anticipate?

Then I'll help you structure:
- Key messages
- Supporting evidence
- Anticipated Q&A
- Responses to objections"

[You answer, Gem structures your presentation]
```

---

## Customization Tips

### Add Your Team Context

Edit the instructions to include:
- Your company name and product area
- Internal terminology and acronyms
- Your team's specific workflows
- Links to internal docs (if accessible to Gemini)

Example addition:
```markdown
## Team Context

This PM works at [Company] on the [Product Area] team.
Key terms:
- [Term 1]: [Definition]
- [Term 2]: [Definition]

Stakeholders:
- VP: [Name] - Cares about [X]
- EM: [Name] - Cares about [Y]
```

### Adjust Agent Modes

Add specialized modes for your domain:
```markdown
### Mode 7: Compliance Agent
**When:** Regulatory requirements, privacy reviews
**Behavior:**
- Flag GDPR, SOC2, HIPAA concerns
- Suggest compliant alternatives
- Reference relevant regulations
```

### Add Your Templates

Include your preferred document templates:
```markdown
## PRD Template

When writing PRDs, use this structure:
1. Problem Statement
2. User Impact
3. Proposed Solution
4. Success Metrics
5. Risks & Mitigations
6. Open Questions
```

---

## Differences from Custom GPT

| Feature | Custom GPT | Gemini Gem |
|---------|------------|------------|
| **File uploads** | ✅ Up to 10 files | ❌ Not yet (use URLs) |
| **Instruction length** | ~8K chars | ~32K+ chars |
| **Web access** | Optional | Built-in |
| **Code execution** | Yes (Code Interpreter) | Yes (via Colab) |
| **Mobile app** | ✅ iOS & Android | ✅ iOS & Android |
| **Organization sharing** | Enterprise only | Google Workspace |
| **Cost** | ChatGPT Plus ($20/mo) | Gemini Advanced ($20/mo) or Free tier |

### When to Use Which

**Use Gemini Gem if:**
- You're in the Google ecosystem (Workspace, Gmail, Drive)
- You need web access by default
- You prefer longer, more detailed instructions
- You want integration with Google services

**Use Custom GPT if:**
- You want to upload knowledge files directly
- You prefer ChatGPT's interface
- You need more granular file-based context
- You're already a ChatGPT Plus user

---

## Advanced: Google Workspace Integration

If you have Google Workspace, you can extend your Gem with:

### Connect Google Drive
Your Gem can access (with permission):
- Team docs in shared drives
- Your personal strategy documents
- Planning spreadsheets
- PRDs and specs

**How:** In Gem settings, enable Drive integration

### Connect Gmail
Use for:
- Summarizing stakeholder email threads
- Drafting responses to product questions
- Extracting action items from emails

### Connect Calendar
Use for:
- Prepping for upcoming meetings
- Summarizing past meeting patterns
- Identifying stakeholder engagement gaps

---

## Troubleshooting

### Gem Doesn't Follow Instructions
- **Check length:** Gemini may truncate very long instructions
- **Test incrementally:** Start with core instructions, add gradually
- **Use section headers:** Clear markdown structure helps

### Gem Gives Generic Responses
- **Invoke agent mode explicitly:** "Act as [Mode Name]"
- **Provide more context:** Share background, constraints, goals
- **Reference framework:** "Using the Strategic Clarity workflow..."

### Gem Can't Access Knowledge Files
- Gemini Gems don't support file uploads yet
- **Workaround 1:** Include key content in instructions
- **Workaround 2:** Paste relevant sections in each conversation
- **Workaround 3:** Link to GitHub and ask Gem to fetch when needed

### Gem Forgets Context Between Sessions
- Gemini Gems are session-based, no persistent memory
- **Workaround:** Start each session with a brief context reminder
- **Or:** Copy-paste key context from previous session

---

## Sharing Your Gem

### With Your Team (Google Workspace)
1. Set sharing to **"Organization"**
2. Share link in Slack/email
3. Create a team guide on when to use which mode

### Publicly
1. Set sharing to **"Anyone with link"**
2. Post on LinkedIn/Twitter with link
3. Add to your PM portfolio or personal site

---

## Updating Your Gem

When the framework is updated:

1. **Check GitHub** for new commits
2. **Review changes** in framework docs
3. **Update instructions** with new content
4. **Test key workflows** to ensure behavior is correct
5. **Notify team** if shared

**Pro tip:** Watch the GitHub repo for automatic notifications.

---

## Limitations

**Current Gemini Gem Constraints:**
- No file uploads (paste content instead)
- No persistent memory across sessions
- Cannot commit to git (copy outputs manually)
- Cannot access local files/codebases (share snippets)

**Compared to Cursor/CLI:**
- Gemini Gem: Great for strategic thinking, planning, communication
- Cursor/CLI: Better for deep codebase work, multi-file refactoring

---

## Support

- **Issues:** Open an issue on [GitHub](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)
- **Questions:** Reach out on [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed)
- **Updates:** Watch the repo for framework improvements

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-30 | Initial Gemini Gem distribution |

---

**Ready to create your Gem? Start with Step 1 above! 🚀**
