# AI as a PM Thinking Partner: A Framework for Rigorous Collaboration

*How I use Claude to think more clearly, not to write for me*

---

Four months ago, I inherited a platform team navigating an identity crisis. The engineering was strong — systems were production-grade, serving hundreds of millions of users. But when I asked "what makes us different from the three adjacent teams?" nobody had a crisp answer.

I needed to build clarity fast while also shipping a roadmap. I couldn't do it alone.

This is the story of how I built a system for thinking with AI that helped me audit 50,000+ lines of code, produce 15+ strategy documents, and build an internal tool — all while delivering on commitments.

**This isn't about having AI write your work. It's about thinking more rigorously.**

---

## The Problem: Platform PM Clarity

Platform teams have a unique challenge. Unlike product teams with clear user-facing features, platform teams provide infrastructure that others build on. The value is often invisible:

- When things work, the teams you enable get credit
- When things break, you get the questions
- Your "customers" are other engineers and PMs, not end users

I joined a team where the previous PM had identified the core issue: the team had been "mis-sold" internally. People thought we did one thing when we actually did another. This caused misunderstanding, false starts, and loss of trust.

My job was to create clarity. But how do you define what a platform team "really does" when even the people on the team aren't sure?

---

## The Insight: Ground Strategy in Code

Here's what I realized: **the codebase doesn't lie.**

Strategy documents can be aspirational. Roadmaps can be optimistic. But the code shows what actually exists. If you want to understand what a platform team truly owns, look at what's implemented.

This became my approach:
1. Audit the codebase systematically
2. Map capabilities to actual code
3. Identify gaps between claims and reality
4. Build strategy grounded in implementation truth

But auditing 50,000+ lines of code across multiple repositories? That's where AI became essential.

---

## The Framework: Knowledge Mixing

I developed a mental model I call **Knowledge Mixing**. Every PM decision involves combining four types of knowledge:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    OPINION      │   │     FACTS       │   │   KNOWLEDGE     │
│   (Judgment)    │   │   (Codebase)    │   │     (Docs)      │
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                      ┌─────────────────┐
                      │  AI SYNTHESIS   │
                      │    (Claude)     │
                      └────────┬────────┘
                               ▼
                      ┌─────────────────┐
                      │    ARTIFACT     │
                      │  (Doc, PRD)     │
                      └─────────────────┘
```

**Opinion** is your judgment — intuition, values, experience, taste, priorities. This is human-only.

**Facts** are what the code actually does — APIs, contracts, implementations. AI can help you explore and understand these faster.

**Knowledge** is existing documentation — strategy docs, RFCs, handovers, context. AI can help synthesize and cross-reference.

**AI Synthesis** is where Claude helps — pattern recognition, structuring, completeness checks, articulation. AI turns your messy inputs into structured outputs.

The key principle:

> **I provide direction, constraints, and judgment. AI provides structure, completeness, and articulation.**

---

## The System: Five Agent Modes

I realized different tasks need different AI "personalities." I mentally switch between five modes:

### 1. Analyst Agent
For codebase exploration and capability audits. Rigorous, systematic, skeptical.

*"Act as a rigorous analyst. Examine this code and build a systematic assessment of what capabilities exist. Question my assumptions."*

### 2. Writer Agent
For strategy docs and narratives. Clear, structured, audience-aware.

*"Help me write a clear team charter for leadership. The key message is [X]. Here are my rough notes..."*

### 3. Devil's Advocate Agent
For stress-testing ideas before presenting them. Constructively critical.

*"Role-play as a skeptical director. What are the strongest objections to this strategy? What questions would you ask?"*

### 4. Builder Agent
For creating tools and prototypes. Technical, iterative, practical.

*"I want to build [X]. Here's the spec. Generate the scaffold, then we'll iterate."*

### 5. Thought Partner Agent
For brainstorming and exploration. Open-ended, generative.

*"Help me explore this space. What are different ways to think about this problem? What am I not considering?"*

---

## The Workflow: Strategic Clarity

Here's the specific workflow I used to define my team's identity:

### Phase 1: Absorb (Week 1)
Read everything — handovers, history, existing docs. Use AI to synthesize themes.

*"I've inherited this team. Here's what I've learned. Help me identify key themes and tensions."*

### Phase 2: Audit (Week 2)
Systematic codebase review. Use AI to map capabilities to code.

*"I'm a PM trying to understand this code's product meaning, not implementation. What capability does this represent?"*

### Phase 3: Articulate (Week 3)
Draft identity, boundaries, value proposition. Use AI to structure.

*"Based on my audit, here's what we own vs. don't own. Help me draft a clear mission statement."*

### Phase 4: Align (Week 4)
Socialize with stakeholders. Use AI to prepare for pushback.

*"I'm presenting this charter to [stakeholder]. Role-play as them. What would you push back on?"*

---

## The Results

Using this system over four months, I:

- **Audited 5 major codebases** — Created a 240-line capability audit with evidence links to specific files
- **Produced 15+ strategy documents** — Team charter, value narrative, operating guide, master plan
- **Built an internal tool** — A catalog builder using iterative AI prompts (7 steps, days instead of weeks)
- **Prepared for key conversations** — 290-line dev talk preparation document

More importantly, the team now has **clarity**. We can articulate what we own, what we don't, and why it matters. When stakeholders ask "what do you do?" we have a crisp answer grounded in reality.

---

## The Anti-Patterns

What doesn't work:

| ❌ Don't | Why It Fails |
|----------|--------------|
| "Write me a strategy doc" | No direction = generic output |
| Accept first draft | Always needs human refinement |
| Skip codebase grounding | Strategy disconnected from reality |
| Use AI for judgment calls | Can't know your organizational context |
| One mega-prompt | Iterative works better |

The key mistakes are expecting AI to replace your judgment or accepting outputs without critical review. AI amplifies your preparation — garbage in, garbage out.

---

## The Takeaway

AI hasn't changed *what* PMs do. It's changed *how fast* we can think rigorously about complex problems.

The framework I've described isn't magic. It's a system for:
- Providing clear direction to AI
- Iterating quickly on outputs  
- Grounding strategy in implementation reality
- Preparing for conversations systematically

If you're a PM dealing with ambiguity — whether that's a new role, an unclear team scope, or a complex technical domain — try this approach:

1. **Pick one messy problem**
2. **Choose an agent mode**
3. **Iterate with AI**
4. **Own the output**

The goal isn't to have AI write your documents. It's to think more rigorously, communicate more clearly, and move faster — while keeping judgment human.

---

## Resources

I've open-sourced the full framework:
- **GitHub:** [PM-AI-Partner-Framework](https://github.com/ahmedkhaledmohamed/PM-AI-Partner-Framework)
- **Quick Reference:** One-page cheat sheet
- **Workflow Templates:** Step-by-step guides for common scenarios

---

*Ahmed Khaled is a Product Manager at Spotify, working on messaging infrastructure that serves 700M+ users. He writes about platform product management and AI-augmented workflows.*

---

**Tags:** #ProductManagement #AI #Claude #PlatformPM #Productivity #Framework

