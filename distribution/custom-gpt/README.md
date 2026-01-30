# Custom GPT Distribution - PM AI Partner

This folder contains everything you need to create a Custom GPT based on the PM AI Partner Framework.

## What You'll Get

A specialized ChatGPT that:
- Understands the PM AI Partner Framework
- Operates in six distinct agent modes
- Knows eight PM workflow patterns
- Reconciles Code, Docs, Data, and Judgment
- Helps you think rigorously, not write for you

## Setup Instructions

### Prerequisites
- ChatGPT Plus or Enterprise account
- Access to Custom GPT creation

### Step 1: Create the GPT

1. Go to [ChatGPT](https://chat.openai.com)
2. Click your profile icon → **"My GPTs"**
3. Click **"Create a GPT"**
4. Click **"Configure"** tab

### Step 2: Basic Info

**Name:**
```
PM AI Partner
```

**Description:**
```
A thinking partner for Product Managers using the PM AI Partner Framework. Helps reconcile Code, Docs, Data, and Judgment through six agent modes and eight workflow patterns.
```

**Instructions:**
Copy and paste the entire content from `instructions.md` into the instructions field.

### Step 3: Upload Knowledge Files

Click **"Upload files"** and add these files from the repository:

**Required:**
- `framework/pm-ai-partner-framework.md`
- `framework/quick-reference.md`
- `workflows/strategic-clarity.md`
- `workflows/codebase-deep-dive.md`
- `workflows/tool-building.md`

**Optional (for richer context):**
- `README.md`
- `getting-started.md`
- `blog/ai-as-pm-thinking-partner.md`

**File limit:** Custom GPTs support up to 10 files (512MB total)

### Step 4: Capabilities

Enable these capabilities:
- ✅ **Web Browsing** — For looking up documentation
- ✅ **Code Interpreter** — For data analysis, generating charts
- ❌ **DALL-E** — Not needed for PM work

### Step 5: Conversation Starters

Add these suggested prompts:

```
1. "Help me understand what my team actually does"
2. "Act as a Technical Analyst and audit this codebase"
3. "Challenge my strategy as a skeptical director"
4. "I need to prepare for a big stakeholder meeting"
```

### Step 6: Save and Test

1. Click **"Save"** in the top right
2. Choose visibility:
   - **Only me** — Private, for personal use
   - **Anyone with a link** — Share with specific people
   - **Public** — Listed in GPT Store (requires verification)

3. Test with: "What are the six agent modes?"

The GPT should list all six modes accurately.

## How to Use Your GPT

### Invoking Agent Modes

Simply state which mode you want:

```
"Act as a Technical Analyst. Map all API endpoints in this code."
"Act as a Devil's Advocate. Challenge this product strategy."
"Act as a Writer. Help me draft a team charter."
```

### Starting a Workflow

Describe your situation:

```
"I just joined a new team and need to define what we do."
→ GPT will suggest Strategic Clarity workflow

"I need to understand what capabilities exist in our codebase."
→ GPT will suggest Codebase Deep-Dive workflow
```

### Iterating on Docs

```
User: "Help me write a team charter for leadership."
GPT: [asks clarifying questions about team, mission, etc.]
User: [provides context]
GPT: [produces first draft]
User: "Make it more concise and add metrics."
GPT: [refines]
```

## Example Sessions

### Session 1: Strategic Clarity
```
User: "I'm a new PM. My team lacks a clear identity. Help me define it."

GPT: "I'll guide you through the Strategic Clarity workflow. Let's start with
understanding what exists. Can you share:
1. What systems/services does your team own?
2. Who are your users/customers?
3. What adjacent teams exist and how are you different?"

[User provides context, GPT helps structure a charter over multiple iterations]
```

### Session 2: Code Exploration
```
User: "Act as a Technical Analyst. Here's our backend code: [paste]
What capabilities does this represent from a product perspective?"

GPT: "Analyzing as a Technical Analyst. This code implements:

| Capability | Evidence | Product Meaning |
|------------|----------|-----------------|
| User authentication | auth.py lines 45-120 | Secure login flow |
| Rate limiting | middleware.py | API usage controls |
..."
```

### Session 3: Meeting Prep
```
User: "I'm presenting our roadmap to the VP tomorrow. Help me prepare."

GPT: "Let's prep using the Communication Prep workflow.

First, clarify:
- What's the VP's main concern about your team?
- What decision do you need from them?
- What pushback do you anticipate?

[User answers, GPT structures talking points and Q&A prep]
```

## Customization Tips

### Adapt Instructions for Your Context

Edit `instructions.md` to add:
- Your company's specific terminology
- Your team's product area focus
- Your preferred document templates
- Your organization's decision-making frameworks

### Add Your Own Knowledge Files

Upload files specific to your work:
- Your team's charter/mission
- Internal product documentation
- Planning templates you use
- Past PRDs as examples

### Adjust Agent Modes

Modify or add agent modes to match your needs:
- **Legal/Compliance Agent** — For regulated industries
- **Accessibility Agent** — For inclusive product work
- **Internationalization Agent** — For global products

## Sharing Your GPT

### With Your Team
1. Set visibility to **"Anyone with a link"**
2. Share the link via Slack/email
3. Consider creating a team guide

### Publicly
1. Polish the instructions
2. Set visibility to **"Public"**
3. Submit to GPT Store (requires verification)
4. Promote on LinkedIn/Twitter

## Troubleshooting

### GPT Doesn't Follow Instructions
- Check that instructions.md was fully copied
- Ensure knowledge files uploaded successfully
- Try rephrasing your prompt to invoke specific agent mode

### GPT Makes Up Information
- Remind it to ground in provided context
- Upload more knowledge files with accurate info
- Add "Only use information from uploaded files" to instructions

### GPT Responses Too Generic
- Invoke specific agent mode by name
- Provide more context in your prompt
- Use workflow-specific language

## Limitations

**Custom GPT Constraints:**
- 10 file upload limit (choose most important)
- No access to your local codebase (use code snippets in chat)
- Can't commit to git (copy outputs manually)
- Session context doesn't persist (summarize previous work if needed)

**Compared to Cursor/CLI:**
- Custom GPT: Great for anywhere access, mobile-friendly
- Cursor/CLI: Better for deep codebase work, git integration

## Support

- **Issues:** Open an issue on the [GitHub repo](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)
- **Questions:** Reach out on [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed)
- **Updates:** Watch the repo for framework improvements

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-30 | Initial Custom GPT distribution |

---

**Ready to create your GPT? Start with Step 1 above! 🚀**
