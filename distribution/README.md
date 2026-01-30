# Distribution - PM AI Partner Framework

This folder contains ready-to-use configurations for distributing the PM AI Partner Framework on different AI platforms.

## Available Distributions

| Platform | Folder | Status | Best For |
|----------|--------|--------|----------|
| **Custom GPT** (OpenAI) | [`custom-gpt/`](custom-gpt/) | ✅ Ready | ChatGPT Plus users, file uploads, mobile access |
| **Gemini Gem** (Google) | [`gemini-gem/`](gemini-gem/) | ✅ Ready | Google Workspace users, web integration |

---

## Which Should You Choose?

### Choose Custom GPT if you:
- ✅ Already use ChatGPT Plus or Enterprise
- ✅ Want to upload knowledge files directly (up to 10 files)
- ✅ Prefer ChatGPT's interface and tools
- ✅ Need iOS app access (Gemini is Android-only)
- ✅ Want granular file-based context management

**Setup time:** 10-15 minutes
**Cost:** ChatGPT Plus ($20/month) or Enterprise
**Guide:** [`custom-gpt/README.md`](custom-gpt/README.md)

---

### Choose Gemini Gem if you:
- ✅ Use Google Workspace (Gmail, Drive, Calendar)
- ✅ Want built-in web search and access
- ✅ Prefer longer, more detailed instructions
- ✅ Need Google service integrations
- ✅ Want free tier access (limited) or Gemini Advanced

**Setup time:** 5-10 minutes
**Cost:** Free tier or Gemini Advanced ($20/month)
**Guide:** [`gemini-gem/README.md`](gemini-gem/README.md)

---

### Why Not Both?

You can set up both! They complement each other:
- **Custom GPT** — File-based knowledge, structured uploads
- **Gemini Gem** — Web access, Google integrations

**Workflow:** Use Custom GPT for deep analysis with uploaded files, Gemini Gem for quick strategy discussions with web context.

---

## Quick Comparison

| Feature | Custom GPT | Gemini Gem |
|---------|------------|------------|
| **Knowledge files** | ✅ Upload up to 10 files | ❌ Paste or link only |
| **Instructions length** | ~8K characters | ~32K+ characters |
| **Web browsing** | Optional | Built-in |
| **Code execution** | ✅ Code Interpreter | ✅ Via Colab |
| **Mobile app** | ✅ iOS & Android | ⚠️ Android only |
| **Cost (advanced)** | $20/month | $20/month |
| **Free tier** | ❌ | ✅ Limited |
| **File context** | Rich (direct uploads) | Limited (paste/link) |
| **Setup time** | 10-15 min | 5-10 min |

---

## What's Included

### For Custom GPT (`custom-gpt/`)
- **`instructions.md`** — Complete system prompt for the GPT
- **`README.md`** — Step-by-step setup guide
- **`knowledge-files.md`** — List of framework files to upload

### For Gemini Gem (`gemini-gem/`)
- **`instructions.md`** — Complete instructions for the Gem
- **`README.md`** — Detailed setup and usage guide
- **`setup-guide.md`** — Quick 5-minute setup

---

## Quick Start

### Custom GPT (10 minutes)

1. Go to [ChatGPT](https://chat.openai.com) → **My GPTs** → **Create**
2. Copy instructions from [`custom-gpt/instructions.md`](custom-gpt/instructions.md)
3. Upload framework files (see [`custom-gpt/knowledge-files.md`](custom-gpt/knowledge-files.md))
4. Test: "What are the six agent modes?"
5. Done! Full guide: [`custom-gpt/README.md`](custom-gpt/README.md)

### Gemini Gem (5 minutes)

1. Go to [Gemini](https://gemini.google.com) → **Gem Manager** → **Create**
2. Copy instructions from [`gemini-gem/instructions.md`](gemini-gem/instructions.md)
3. Save and test: "What are the six agent modes?"
4. Done! Full guide: [`gemini-gem/README.md`](gemini-gem/README.md)

---

## Common Use Cases

### Use Case 1: Strategic Clarity
**Platform:** Either (Custom GPT if you have existing docs to upload)

```
"I just joined a new team. Nobody can articulate what we do vs adjacent teams.
Help me define our identity using the Strategic Clarity workflow."
```

### Use Case 2: Codebase Analysis
**Platform:** Custom GPT (if you can upload code files) or Gemini Gem (paste snippets)

```
"Act as Technical Analyst. Here's our backend code: [paste]
Map all product capabilities and identify gaps."
```

### Use Case 3: Meeting Prep
**Platform:** Either (Gemini Gem if meeting is in Google Calendar)

```
"I'm meeting with the VP tomorrow about our roadmap.
Help me prepare: structure messages, anticipate questions, prep responses."
```

### Use Case 4: Data Analysis
**Platform:** Both support data analysis

```
"Act as Data Analyst. Here's 3 months of user engagement metrics: [data]
What patterns? What hypotheses? What should I investigate?"
```

---

## Customization

Both distributions can be customized with:

### Your Team Context
```markdown
## Team Context
- Company: [Your company]
- Product: [Your product area]
- Stakeholders: [Key people and what they care about]
- Terminology: [Internal terms and definitions]
```

### Your Templates
```markdown
## Document Templates
When writing PRDs, use this structure:
1. Problem Statement
2. User Impact
3. Proposed Solution
...
```

### Your Workflows
```markdown
## Custom Workflows
### [Your workflow name]
**When:** [Trigger situation]
**Phases:** [Steps]
**Output:** [Deliverables]
```

---

## Troubleshooting

### "I don't see Gem Manager in Gemini"
- Gems are rolling out gradually
- Check Google Labs settings to enable experimental features
- Try accessing from desktop browser
- Check if available in your region

### "My Custom GPT doesn't remember uploaded files"
- Verify files uploaded successfully (check in Configure tab)
- File must be <512MB total
- Supported formats: .md, .txt, .pdf, .docx
- Try re-uploading

### "Responses are too generic"
- Invoke agent mode explicitly: "Act as [Mode Name]"
- Provide more context in your prompt
- Reference the framework: "Using [Workflow] workflow..."

### "Can I use both?"
- Yes! They complement each other
- Custom GPT: Deep file-based analysis
- Gemini Gem: Quick strategy with web context

---

## Coming Soon

### Planned Distributions
- **Claude Projects Template** — Pre-configured Claude Project setup
- **Poe Bot** — Shareable bot on Poe platform
- **Notion Template** — Framework as Notion workspace

Want to contribute a distribution? Open an issue or PR on GitHub!

---

## Support

- **Setup issues:** See platform-specific READMEs
- **Framework questions:** [Main repo](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)
- **Feature requests:** Open an issue on GitHub
- **Contact:** [LinkedIn](https://linkedin.com/in/ahmedkhaledmohamed)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-30 | Initial distribution for Custom GPT and Gemini Gem |

---

## License

MIT — Use freely, attribution appreciated.

---

**Choose your platform and get started! 🚀**

- [Custom GPT Setup →](custom-gpt/README.md)
- [Gemini Gem Setup →](gemini-gem/README.md)
