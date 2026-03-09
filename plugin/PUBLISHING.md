# Publishing & Distribution Guide

Steps to publish the PM AI Partner plugin and get it featured.

## 1. Publish to npm

```bash
cd plugin/

# Login (one-time)
npm login

# Publish
npm publish

# Verify
npm info pm-ai-partner
```

After publishing, users can install via:
```bash
npx pm-ai-partner@latest
```

### Updating

1. Bump version in `package.json` and `.claude-plugin/plugin.json`
2. Run `npm publish`

---

## 2. Submit to Anthropic Official Marketplace

Submit at one of:
- **Console:** [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)
- **Claude.ai:** [claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)

### What to Include

- **Plugin name:** `pm-ai-partner`
- **Description:** AI-powered skills for Product Managers — 10 agent modes for thinking, writing, analyzing, building, and decision-making.
- **Repository:** `https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework`
- **Plugin directory:** `plugin/` (contains `.claude-plugin/plugin.json`)
- **Version:** 2.0.0

Once accepted, users can install via:
```
/plugin install pm-ai-partner
```

---

## 3. Submit to Superpowers Marketplace

The Superpowers marketplace at [github.com/obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) is a curated Claude Code plugin collection.

1. Fork the superpowers-marketplace repo
2. Add your plugin entry
3. Submit a PR

---

## 4. Get Featured on prodmgmt.world

[prodmgmt.world/claude-code](https://www.prodmgmt.world/claude-code) curates Claude Code plugins for PMs.

### Contact

Reach out via:
- The prodmgmt.world website contact form
- Twitter/X — find the site owner via the newsletter
- Direct email if available

### Pitch

Subject: PM AI Partner — Claude Code plugin built for Product Managers

Key points:
- **10 PM-specific skills** — not engineering skills repurposed for PMs
- **4 workflow commands** — plan-week, write-brief, prep-meeting, audit-codebase
- **3 automation hooks** — quality gate, draft status, commit reminders
- **One-command install** — `npx pm-ai-partner@latest`
- **Multi-platform** — Claude Code, Cursor, Codex
- **Full methodology** — backed by a complete PM-AI framework with case studies
- **Open source** — MIT licensed

### Differentiators vs Other Plugins

- Only PM-focused plugin in the ecosystem
- Based on a real PM methodology (four sources of truth)
- Includes worked case study (OpenClaw deep dive)
- Skills are battle-tested from actual PM work (not generic)
- Hooks automate PM-specific quality gates

---

## 5. Promote on Social Media

Pre-written templates are available in `framework/demo/SOCIAL-POSTS.md`.

### Posting Order

1. **LinkedIn** — Primary PM audience
2. **Twitter/X** — Dev + PM audience
3. **Reddit** — r/ProductManagement, r/ArtificialIntelligence
4. **Hacker News** — Show HN post

### Key Metrics to Track

- npm weekly downloads
- GitHub stars
- GitHub discussions activity
- Plugin install count (if marketplace provides)

---

## 6. Collect Social Proof

After users start installing:

1. Ask early users for testimonials (even 1-2 sentences)
2. Add testimonials to plugin README
3. Track "used by PMs at [company]" endorsements
4. Link to blog posts or tweets about the framework
