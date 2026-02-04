# Context Variance Demo Script

**Goal:** Show how accumulated context changes AI responses  
**Setup:** Same MCP tools, same prompt, Vanilla vs Framework  
**Duration:** ~10 minutes

---

## The Concept

This demo shows the difference between:
- **Vanilla setup:** Fresh Cursor install with MCP tools but no context
- **Framework setup:** Your workspace with accumulated context (CLAUDE.md, hypotheses, team info, history)

---

## The Script

### Single Prompt (Ask Both Setups)

```
What should [YOUR_TEAM] prioritize this quarter and why?
```

Replace `[YOUR_TEAM]` with your actual team name.

---

## Expected Responses

### Vanilla Setup (No Context)

Will likely say something generic like:

> "I don't have specific context about [YOUR_TEAM]. To answer this, I'd need to:
> - Search internal docs
> - Understand the team structure
> - Know current metrics and challenges
> 
> Would you like me to search for this information?"

**Or** will search and give a **generic answer** based on docs:
- Mentions system names (from docs)
- No opinion on priorities
- No awareness of YOUR hypotheses
- No knowledge of team members
- Generic advice

---

### Framework Setup (Your Context)

Should immediately reference:

1. **Your Hypotheses:**
   > "Based on your hypotheses.md, H1 is marked as high priority..."

2. **Your Team:**
   > "[Team member] is already working on [project]..."

3. **Your Metrics:**
   > "Your biggest gap is [metric] at [value]..."

4. **Your Strategic Context:**
   > "Your theme this quarter is [theme]..."

5. **Specific Recommendations:**
   > "I'd recommend focusing on [hypothesis] since it addresses [question] and [person] can lead..."

---

## What to Highlight

| Aspect | Vanilla | Framework Setup |
|--------|---------|-----------------|
| Knows your hypotheses | ❌ | ✅ |
| Knows your team | ❌ | ✅ |
| Knows your metrics | ❌ | ✅ |
| Knows your strategy | ❌ | ✅ |
| Gives specific advice | ❌ Generic | ✅ Tailored |

---

## Alternative Prompts

### Stakeholder-Aware
```
I have a meeting with [STAKEHOLDER] from [TEAM] tomorrow. What should I discuss?
```

**Vanilla:** "Who is [STAKEHOLDER]? What is [TEAM]?"  
**Framework:** References your hypotheses and open questions relevant to them.

---

### Code + Strategy Link
```
Why is [METRIC_A] lower than [METRIC_B]?
```

**Vanilla:** Generic technical explanation  
**Framework:** References your specific hypothesis about this, who's working on it, and recommended approach.

---

### Decision Support
```
Should we invest in [OPTION_A] or [OPTION_B] this quarter?
```

**Vanilla:** "I'd need more context..."  
**Framework:** References your hypothesis priorities, team capacity, and strategic alignment.

---

## Demo Flow

1. **Open Vanilla workspace** (fresh Cursor, MCP only)
2. **Ask:** "What should [YOUR_TEAM] prioritize this quarter and why?"
3. **Show response** (generic/searching)
4. **Open Your workspace** (with CLAUDE.md, hypotheses, etc.)
5. **Ask same prompt**
6. **Show response** (specific, hypothesis-aware, team-aware)
7. **Highlight the difference** (table above)

---

## Key Talking Point

> "The AI has the same tools. The difference is **accumulated context** — 
> my CLAUDE.md, my hypotheses, my team structure, my history.
> 
> Over months of work, this compounds. The AI becomes a true partner
> who knows my domain, not just a search engine."

---

*Customize this script with your own team name, hypotheses, and examples.*
