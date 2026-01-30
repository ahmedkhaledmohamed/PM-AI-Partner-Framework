# Knowledge Files for Custom GPT

These files should be uploaded to your Custom GPT to give it complete context about the PM AI Partner Framework.

## Priority 1: Essential Files (Required)

These files are **required** for the GPT to function properly:

### 1. `framework/pm-ai-partner-framework.md`
- **Size:** ~22KB
- **Purpose:** Complete framework documentation
- **Contains:** Philosophy, workspace architecture, workflows, agent modes, tool selection

### 2. `framework/quick-reference.md`
- **Size:** ~4KB
- **Purpose:** Quick cheat sheet for daily use
- **Contains:** One-page summary of sources, modes, workflows, prompts

### 3. `workflows/strategic-clarity.md`
- **Size:** ~8KB
- **Purpose:** Step-by-step workflow for defining team identity
- **Contains:** Phase-by-phase guide, prompts, outputs

### 4. `workflows/codebase-deep-dive.md`
- **Size:** ~6KB
- **Purpose:** Workflow for understanding existing capabilities
- **Contains:** Exploration process, mapping techniques, audit templates

### 5. `workflows/tool-building.md`
- **Size:** ~5KB
- **Purpose:** Workflow for building internal tools/prototypes
- **Contains:** Iterative building process, best practices

**Total for Priority 1:** ~45KB (5 files)

---

## Priority 2: Contextual Files (Recommended)

These files provide additional context and examples:

### 6. `README.md`
- **Size:** ~3KB
- **Purpose:** Repository overview
- **Contains:** What the framework is, quick start, background

### 7. `getting-started.md`
- **Size:** ~12KB
- **Purpose:** Setup guide for new users
- **Contains:** Installation steps, workspace setup, testing

### 8. `blog/ai-as-pm-thinking-partner.md`
- **Size:** ~10KB
- **Purpose:** Real-world application story
- **Contains:** How framework was developed, results, examples

**Total for Priority 2:** ~25KB (3 files)

**Combined Total (Priority 1 + 2):** ~70KB (8 files)

---

## Priority 3: Extended Workflows (Optional)

If you have file slots remaining:

### 9. `workflows/README.md`
- **Size:** ~1KB
- **Purpose:** Workflow overview
- **Contains:** When to use each workflow

### 10. Additional workflow files as they're created

---

## File Upload Limits

**Custom GPT Constraints:**
- Maximum 10 files
- Maximum 512MB total size
- Supported formats: .md, .txt, .pdf, .docx

**Recommended Strategy:**
- Start with Priority 1 files (5 files, essential)
- Add Priority 2 files if space allows (3 more files, helpful)
- Keep 2 slots free for your own team-specific docs

---

## How to Upload

### In GPT Configuration:

1. Go to **Configure** tab
2. Scroll to **Knowledge** section
3. Click **"Upload files"**
4. Select files in this order:
   - Start with Priority 1 files
   - Add Priority 2 if within limit
   - Add team-specific files last

### Verification:

After upload, ask your GPT:
```
"What files do you have access to? List them."
```

The GPT should list all uploaded files.

---

## Adding Your Own Files

Consider uploading team-specific knowledge:

### Your Team Context
- Team charter or mission statement
- Product area documentation
- Internal glossary/terminology
- Org chart or stakeholder map

### Templates You Use
- PRD template
- Tech spec template
- Planning doc format
- Weekly update format

### Example Documents
- Past successful PRDs
- Good capability audits
- Well-written strategy docs

**Naming convention:**
Save as `CUSTOM-[filename].md` to distinguish from framework files.

---

## File Update Strategy

When the framework is updated on GitHub:

1. **Check for changes:** Review repo commits
2. **Download updated files:** Get latest versions
3. **Re-upload to GPT:** Replace old files
4. **Test functionality:** Verify GPT behavior

**Tip:** Follow the repo to get notifications of updates.

---

## Alternative: Link to GitHub

Instead of uploading files, you can:
- Enable **Web Browsing** on your GPT
- In instructions, add: "For latest framework docs, check: https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework"
- GPT will fetch live content when needed

**Trade-offs:**
- ✅ Always uses latest version
- ✅ Doesn't count toward file limit
- ❌ Requires internet for every query
- ❌ Slower response time

---

## Download Commands

To quickly download all Priority 1 & 2 files:

```bash
# Clone the repo
git clone https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework.git
cd PM-AI-Partner-Framework

# Copy priority files to a folder
mkdir gpt-knowledge
cp framework/pm-ai-partner-framework.md gpt-knowledge/
cp framework/quick-reference.md gpt-knowledge/
cp workflows/strategic-clarity.md gpt-knowledge/
cp workflows/codebase-deep-dive.md gpt-knowledge/
cp workflows/tool-building.md gpt-knowledge/
cp README.md gpt-knowledge/
cp getting-started.md gpt-knowledge/
cp blog/ai-as-pm-thinking-partner.md gpt-knowledge/

# All files are now in gpt-knowledge/ ready to upload
ls gpt-knowledge/
```

Then upload files from `gpt-knowledge/` to your Custom GPT.

---

## Questions?

If you're unsure which files to include, start with **Priority 1 only**. You can always add more files later as you learn what your GPT needs.
