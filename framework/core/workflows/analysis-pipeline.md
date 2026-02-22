# Workflow: Analysis Pipeline

**When to use:** Turning a data question into a shareable presentation or deliverable

**Time:** Hours to days (depending on data complexity)

**Output:** Analysis document, HTML presentation, PPTX deck, deployed site

---

## Overview

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌─────────┐    ┌────────┐
│  QUERY  │ →  │ DOCUMENT │ →  │  PRESENT  │ →  │ GENERATE│ →  │ DEPLOY │
│         │    │          │    │           │    │         │    │        │
│  Data   │    │ Findings │    │  Slides   │    │  PPTX   │    │  Ship  │
└─────────┘    └──────────┘    └───────────┘    └─────────┘    └────────┘
```

---

## Philosophy

The most effective PM deliverables are data-backed and visually clear. This pipeline turns a raw data question into a polished, shareable presentation through progressive refinement. Each phase produces a standalone artifact — you can stop at any phase and still have something useful.

Key principles:

1. **Data first** — Every claim must have a query behind it
2. **Document before presenting** — Write the analysis doc to think clearly; build the presentation to communicate clearly
3. **Progressive fidelity** — Markdown analysis → HTML slides → PPTX deck, each building on the previous
4. **Ship early, iterate** — Deploy the HTML presentation as soon as it's useful; refine in place

---

## Phase 1: QUERY

### Goal

Answer the data question with evidence.

### Activities

- Write and validate SQL queries
- Run multi-dimensional breakdowns (platform, tier, age, region, tenure)
- Identify data caveats and instrumentation quirks
- Save queries for reproducibility

### AI Assistance

**Prompt: Initial Exploration**
```
I want to understand [metric/behavior].

Available tables: [list tables or describe domain]

Help me:
1. Write a query to measure [metric]
2. Break it down by [dimensions]
3. Identify any caveats in the data
```

**Prompt: Multi-Dimensional Breakdown**
```
The aggregate number for [metric] is [value].

Help me slice this by:
- Platform (iOS vs Android)
- User tier (Free vs Premium)
- Account age / tenure
- Region / market
- [Other relevant dimensions]

I want to find hidden patterns the aggregate hides.
```

### Tips

- Always filter on partition columns first to avoid scanning entire tables
- Validate what instrumentation specs actually measure before trusting CTR numbers
- Save queries in a `.sql` file with comments — you'll re-run them
- When a number looks surprising, verify with a second query from a different angle

### Output

- `.sql` file with documented queries
- Raw results (JSON or table format)
- List of caveats and data quality notes

---

## Phase 2: DOCUMENT

### Goal

Turn query results into a structured analysis document.

### Activities

- Write findings with tables and key numbers
- Interpret what the data means for product decisions
- Document limitations and caveats explicitly
- Formulate recommendations

### AI Assistance

**Prompt: Analysis Document**
```
Here are my query results: [paste results]

Help me write an analysis document that covers:
1. Key findings (with data tables)
2. What this means for [product area]
3. Caveats and limitations
4. Recommendations (actionable, specific)
```

**Prompt: Executive Summary**
```
I have a detailed analysis about [topic].

Key numbers: [list 3-5 key findings]

Help me write a one-page executive summary for [audience: leadership / engineering / cross-functional].
```

### Template: Analysis Document

```markdown
# [Topic] Analysis

## Key Finding
[One sentence — the most important thing]

## Data

| Dimension | Value A | Value B | Gap |
|-----------|---------|---------|-----|
| [dim]     | [val]   | [val]   | [x] |

## Interpretation
[What this means for the product — 2-3 paragraphs]

## Caveats
- [Caveat 1: what the data can't tell us]
- [Caveat 2: instrumentation limitation]

## Recommendations
1. [Action] — [expected impact]
2. [Action] — [expected impact]

## Methodology
- Data source: [tables]
- Time period: [dates]
- Query: [link to .sql file]
```

### Output

- Markdown analysis document in `topics/[area]/`
- Executive summary (markdown or HTML)

---

## Phase 3: PRESENT

### Goal

Build an HTML presentation from the analysis.

### Activities

- Structure findings into slides (1 idea per slide)
- Add data tables, comparison grids, and verdict badges
- Use a consistent CSS system
- Create a narrative arc (problem → evidence → interpretation → recommendation)

### AI Assistance

**Prompt: Presentation Structure**
```
I have an analysis about [topic] with these findings:
[list key findings]

Help me structure this as a presentation:
1. How many slides?
2. What's the narrative arc?
3. Which data goes on which slide?
```

**Prompt: HTML Slide Generation**
```
Create an HTML presentation with these slides:
[list slide titles and content]

Use this CSS pattern:
- Dark background (#121212), white text
- .slide sections with min-height: 100vh
- .data-table for data
- .verdict badges for key callouts (green for good, red for critical)
- .comparison-grid for side-by-side comparisons
```

### CSS System

```css
:root {
  --bg-primary: #121212;
  --text-primary: #ffffff;
  --brand-green: #22c55e;
  --accent-error: #ff3b30;
  --accent-orange: #ff9500;
}

.slide { min-height: 100vh; padding: 4rem 2rem; }
.slide__title { font-size: 2rem; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.verdict { padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
```

### Output

- HTML file in `site/presentations/[name].html`
- Self-contained (no external dependencies)

---

## Phase 4: GENERATE

### Goal

Create a PPTX deck for meetings and email sharing.

### Activities

- Write a Python script using `python-pptx`
- Map HTML slides to PowerPoint slides
- Add data tables and formatted text
- Generate the `.pptx` file

### AI Assistance

**Prompt: PPTX Script**
```
I have an HTML presentation with [N] slides about [topic].

Create a Python script using python-pptx that generates a matching PPTX.
Slide content: [list slides with key data]

Requirements:
- Dark background matching the HTML
- Formatted data tables
- Consistent typography
- Helper functions for reusable layouts
```

### Tips

- Create helper functions (`add_title_slide`, `add_data_slide`, `add_comparison_slide`) and reuse them
- Use `Pt()` for font sizes, `Inches()` for positioning
- Set slide dimensions to widescreen (13.33 x 7.5 inches)
- Save the script in `scripts/` for future regeneration

### Output

- Python script in `scripts/generate_[name]_pptx.py`
- Generated `.pptx` file

---

## Phase 5: DEPLOY

### Goal

Make the presentation accessible via URL.

### Activities

- Deploy HTML to static hosting (GitHub Pages, Netlify, Vercel, or internal tooling)
- Update the presentations index page
- Share the URL

### Commands

```bash
# GitHub Pages deployment
npx gh-pages -d site

# Or Netlify
netlify deploy --prod

# Or Vercel
vercel --prod
```

### Tips

- Add the new presentation to your index/navigation page
- Order presentations by date (newest first)
- Remove or archive outdated presentations
- Keep the index page as the single entry point

### Output

- Live URL for the presentation
- Updated index page

---

## Repo Structure

```
your-product-catalog/
├── site/
│   ├── index.html              # Main site entry point
│   ├── presentations.html      # Presentations index
│   └── presentations/          # Individual HTML presentations
│       ├── analysis-a.html
│       └── analysis-b.html
├── topics/
│   ├── area-a/                 # Analysis documents by topic
│   │   ├── analysis.md
│   │   └── queries.sql
│   └── analytics/              # Shared query files
│       └── queries.sql
├── scripts/
│   ├── generate_a_pptx.py      # PPTX generators
│   └── generate_b_pptx.py
└── deploy.yaml                 # Deployment config (GitHub Pages, Netlify, etc.)
```

---

## Parallel Workstreams with Git Worktrees

When running multiple analyses simultaneously, use git worktrees:

```bash
# Create worktree for each analysis
git worktree add ../analysis-a ahmed/analysis-a
git worktree add ../analysis-b ahmed/analysis-b

# Each worktree gets its own directory and Claude session
# Work independently, merge when ready

# Clean up after merging
git worktree remove ../analysis-a
git branch -d ahmed/analysis-a
```

This enables 3-4 parallel analysis tracks without branch conflicts.

---

## Output Checklist

- [ ] SQL queries saved and documented
- [ ] Analysis document with findings, caveats, recommendations
- [ ] HTML presentation (self-contained)
- [ ] PPTX deck (optional, for meetings)
- [ ] Deployed to static hosting
- [ ] Index page updated
- [ ] Stale/superseded presentations archived

---

## Success Criteria

- [ ] Every data claim has a query behind it
- [ ] Caveats are documented, not hidden
- [ ] Presentation tells a narrative (not just shows data)
- [ ] Deliverable is shareable via URL
- [ ] Analysis is reproducible (queries saved, methodology documented)

---

_Related: [Data Analyst Skill](../../templates/skills/data-analyst/SKILL.md) | [Builder Skill](../../templates/skills/builder/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
