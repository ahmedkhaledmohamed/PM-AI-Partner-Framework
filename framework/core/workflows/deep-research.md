# Workflow: Deep Research

**When to use:** Competitive analysis, technology evaluation, market research, due diligence, policy research

**Time:** 1-4 hours (depending on breadth)

**Output:** Research brief with cited sources, structured findings, and confidence levels

---

## Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌─────────┐
│  DEFINE  │ →  │ FAN-OUT  │ →  │  VERIFY  │ →  │ SYNTHESIZE│ →  │  GAPS   │
│          │    │          │    │          │    │           │    │         │
│ Question │    │  Search  │    │  Sources │    │  Findings │    │ Follow  │
└──────────┘    └──────────┘    └──────────┘    └───────────┘    └─────────┘
```

---

## Philosophy

Most PM research fails not because of bad searching, but because of bad scoping. A vague question produces vague results. The discipline is in Phase 1 (defining what you actually need to know) and Phase 3 (verifying that what you found is true), not Phase 2 (searching).

Key principles:

1. **Define before searching** — A narrow question produces actionable answers; a broad question produces a Wikipedia article
2. **Fan-out, then converge** — Multiple search angles catch what a single query misses
3. **Verify adversarially** — Actively seek disconfirming evidence, not just supporting sources
4. **Cite everything** — Every claim needs a source; uncited claims are opinions
5. **Name the gaps** — What you couldn't find is as important as what you found

---

## Phase 1: DEFINE

### Goal

Narrow the research question to something answerable within the time box.

### Activities

- Write a 1-sentence research question
- Define scope boundaries (domain, time period, geography, market segment)
- Identify what "good enough" looks like (how precise do findings need to be?)
- Set a time box (prevent scope creep)
- List what you already know (avoid re-discovering known information)

### AI Assistance

**Prompt: Scope the Research**
```
I need to research [topic].

Help me:
1. Narrow this to a specific, answerable research question
2. Define what's in-scope vs. out-of-scope
3. Identify what I already know vs. what I need to find
4. Set a reasonable depth for [context: quick decision / thorough analysis / formal report]
```

**Prompt: Research Question Refinement**
```
My initial question is: "[broad question]"

This is too broad. Help me break it into 3-5 specific sub-questions
that together answer the original question.
Each sub-question should be independently answerable.
```

### Template: Research Scope

```markdown
## Research Scope
- **Question:** [1 sentence]
- **Sub-questions:** [3-5 specific questions]
- **In-scope:** [what to cover]
- **Out-of-scope:** [what to explicitly exclude]
- **Time box:** [hours]
- **Known already:** [what I don't need to research]
- **Good enough means:** [how precise/comprehensive findings need to be]
```

### Tips

- If you can't write the research question in one sentence, the scope is too broad
- "What is X?" is a Wikipedia query. "Should we use X given our constraints?" is a research question
- Include your constraints in the question — "for a B2B SaaS with 10K users" produces different answers than "for a consumer mobile app"

---

## Phase 2: FAN-OUT

### Goal

Cast a wide net with multiple search queries from different angles.

### Activities

- Generate 5-8 search queries from different perspectives
- Run searches in parallel where possible
- Collect source URLs and key excerpts
- Note initial impressions (surprising findings, contradictions)

### AI Assistance

**Prompt: Generate Search Queries**
```
My research question is: "[question]"

Generate 8 search queries from different angles:
1. Direct answer query
2. Comparison query ("[X] vs [alternatives]")
3. Problem query ("problems with [X]" / "[X] criticism")
4. Expert opinion query ("[X] review" / "[X] analysis [year]")
5. Case study query ("[X] case study" / "company using [X]")
6. Technical query (implementation details, architecture)
7. Market query (market size, adoption, trends)
8. Contrarian query (why NOT to use [X], [X] failures)
```

**Prompt: Multi-Source Search**
```
Search for: [query]
Collect the top 5 results. For each, note:
- Source name and URL
- Source type (primary research, vendor content, news, blog, academic)
- Key claim or finding
- Publication date
```

### Query Matrix Template

```markdown
| # | Angle | Query | Sources Found | Key Finding |
|---|-------|-------|---------------|-------------|
| 1 | Direct | [query] | [N] | [summary] |
| 2 | Comparison | [query] | [N] | [summary] |
| 3 | Problems | [query] | [N] | [summary] |
| 4 | Expert | [query] | [N] | [summary] |
| 5 | Case study | [query] | [N] | [summary] |
| 6 | Technical | [query] | [N] | [summary] |
| 7 | Market | [query] | [N] | [summary] |
| 8 | Contrarian | [query] | [N] | [summary] |
```

### Tips

- Don't stop at the first answer — the first result is often vendor content, not evidence
- Include queries from different time periods (last month, last year, last 3 years) to spot trends
- "Problems with X" and "X criticism" queries are the most valuable — they surface what the marketing page won't tell you
- If all your queries return the same sources, your angles aren't diverse enough

---

## Phase 3: VERIFY

### Goal

Evaluate source quality and cross-reference claims. This is where most research fails — skipping verification turns research into aggregated marketing.

### Activities

- Rate each source (primary / secondary / tertiary)
- Check publication date (is this still current?)
- Identify potential bias (vendor content, sponsored, advocacy)
- Cross-reference key claims across multiple sources
- Actively search for counter-evidence to main findings
- Flag single-source claims

### AI Assistance

**Prompt: Source Evaluation**
```
I found these sources for my research on [topic]:
[list sources with URLs and key claims]

For each source, evaluate:
1. Source type (primary research, vendor, news, blog, academic, forum)
2. Potential bias (vendor selling something? Advocacy group? Competitor?)
3. Recency (is this still accurate?)
4. Corroboration (does any other source confirm this claim?)
```

**Prompt: Adversarial Verification**
```
My main finding is: "[claim]"
This is based on [N] sources.

Now actively try to disprove this:
1. Search for evidence that contradicts this finding
2. Identify conditions where this finding wouldn't hold
3. Find critics or alternative viewpoints
4. Rate my confidence: should I trust this finding?
```

### Source Evaluation Matrix

```markdown
| Source | Type | Bias Risk | Recency | Key Claim | Corroborated? |
|--------|------|-----------|---------|-----------|---------------|
| [name] | Primary/Vendor/Blog | Low/Med/High | [date] | [claim] | Yes (by X) / No |
```

### Source Type Hierarchy

1. **Primary research** — Original data, academic papers, government reports → Highest trust
2. **Independent analysis** — Analyst reports, reputable journalism, peer-reviewed reviews → High trust
3. **Industry reports** — Gartner, Forrester, etc. → Medium trust (may have vendor bias)
4. **Expert blogs** — Known practitioners writing from experience → Medium trust
5. **News articles** — May oversimplify or sensationalize → Lower trust
6. **Vendor content** — Marketing pages, case studies, whitepapers → Lowest trust (claims, not evidence)

### Tips

- A claim supported by 3 vendor pages is not well-corroborated — that's 3 instances of marketing, not 3 independent sources
- If you can only find one source for a key claim, flag it explicitly in your findings
- Check the date — a 2023 analysis of a market that changed significantly in 2025 is misleading
- "Widely reported" is not the same as "verified" — multiple outlets can repeat the same unverified claim

---

## Phase 4: SYNTHESIZE

### Goal

Structure verified findings into a decision-ready document.

### Activities

- Group findings by theme or sub-question
- Assign confidence levels (High / Medium / Low) based on source quality and corroboration
- Write the research brief
- Include dissenting evidence alongside main findings
- Clearly separate findings (what the evidence says) from recommendations (what you think should happen)

### AI Assistance

**Prompt: Synthesis**
```
Here are my verified findings for [research question]:
[paste findings with sources]

Create a research brief that:
1. Answers the original research question directly
2. Groups findings by theme
3. Assigns confidence levels (High/Med/Low) with reasoning
4. Includes counter-evidence where it exists
5. Separates findings from recommendations
```

### Template: Research Brief

```markdown
# Research Brief: [Topic]

## Research Question
[The specific question we set out to answer]

## Bottom Line
[1-2 sentence direct answer to the research question]

## Key Findings

### [Theme 1]
**Finding:** [Claim] (Confidence: High/Medium/Low)
- Evidence: [source1], [source2]
- Counter-evidence: [source3] or "None found"
- Implication: [What this means for our decision]

### [Theme 2]
**Finding:** [Claim] (Confidence: High/Medium/Low)
- Evidence: [source1], [source2]
- Counter-evidence: [source3] or "None found"
- Implication: [What this means for our decision]

## Confidence Assessment

| Finding | Confidence | Sources | Basis |
|---------|-----------|---------|-------|
| [finding] | High | [N] | Corroborated across independent sources |
| [finding] | Medium | [N] | Single authoritative source, no contradiction |
| [finding] | Low | [N] | Single source or conflicting evidence |

## Recommendations
1. [Action] — supported by [findings]
2. [Action] — supported by [findings]

## What We Don't Know
- [Gap 1: What we looked for but couldn't find]
- [Gap 2: Area where evidence is conflicting]

## Sources
1. [Name/Title] — [URL] — accessed [date]
2. [Name/Title] — [URL] — accessed [date]
```

### Tips

- Lead with the bottom line — busy stakeholders read the first paragraph, not the last
- "Medium confidence" is not a cop-out — it's honest. A finding with Medium confidence and clear reasoning is more useful than a High confidence claim with no backing
- Separate "what the evidence says" from "what I recommend" — they're different things

---

## Phase 5: GAPS

### Goal

Identify what's missing and determine whether follow-up is needed.

### Activities

- List questions that remain unanswered
- Identify areas with Low confidence findings
- Determine whether gaps are acceptable or blocking
- Recommend follow-up actions (deeper research, expert consultation, primary data collection)

### AI Assistance

**Prompt: Gap Analysis**
```
Review my research brief on [topic].

What's missing?
1. What questions did I not answer?
2. Which findings have weak evidence?
3. What search angles did I not try?
4. What would change my conclusions if discovered?
5. Should I do follow-up research, or is this good enough for [decision context]?
```

### Tips

- Explicitly state what you looked for but couldn't find — this prevents the reader from assuming you covered everything
- "We don't know X" is a useful finding. "We don't know X and it doesn't matter for this decision" is even better
- If a gap is blocking, convert it to a follow-up research question and scope it using Phase 1

---

## Common Pitfalls

| Pitfall | Why It Happens | Fix |
|---------|---------------|-----|
| Confirmation bias | Searching for evidence that supports your hypothesis | Include adversarial searches ("problems with X", "X criticism") |
| Single-source reliance | First result seems authoritative | Require 2+ independent sources for key claims |
| Recency bias | Newest article feels most relevant | Check if older, more rigorous research exists |
| Vendor content as evidence | Marketing pages rank high in search | Distinguish vendor claims from independent analysis |
| Scope creep | Research keeps expanding | Time-box each phase; stop at diminishing returns |
| Missing the "so what" | Thorough research with no recommendation | Phase 4 must include implications, not just findings |
| Aggregated marketing | Multiple vendor sources treated as corroboration | 3 marketing pages are 1 claim, not 3 |
| No gap analysis | Assuming completeness | Phase 5 exists specifically to prevent this |

---

## Output Checklist

- [ ] Research question is specific and answerable
- [ ] Multiple search angles used (not just direct queries)
- [ ] Sources evaluated for bias, recency, and corroboration
- [ ] Adversarial verification attempted for key claims
- [ ] Confidence levels assigned with reasoning
- [ ] Counter-evidence included alongside main findings
- [ ] Gaps and unanswered questions documented
- [ ] Recommendations separated from findings
- [ ] All claims cited with sources

---

## Success Criteria

- [ ] A reader can assess the quality of evidence without re-doing the research
- [ ] Confidence levels help the reader calibrate trust appropriately
- [ ] Counter-evidence is presented fairly, not buried
- [ ] Gaps are named explicitly, not hidden
- [ ] Recommendations flow logically from findings

---

_Related: [Competitor Analyst Skill](../../../plugin/skills/competitor-analyst/SKILL.md) | [Technical Analyst Skill](../../../plugin/skills/technical-analyst/SKILL.md) | [Full Framework](../pm-ai-partner-framework.md)_
