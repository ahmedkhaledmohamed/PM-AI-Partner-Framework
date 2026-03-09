Help me understand the codebase for: $ARGUMENTS

## Instructions

Conduct a PM-focused codebase exploration. The goal is not to understand every line of code, but to map **what the system can do** and **what that means for the product**.

### Process

1. **Explore structure** — Identify entry points, key services, data flows
2. **Map capabilities** — What product capabilities does this code enable?
3. **Find the gaps** — What's claimed in docs but missing in code? What exists but isn't documented?
4. **Connect to product decisions** — What does this mean for what we can build, change, or promise?

### Tools to Use

- Search the codebase for key patterns, APIs, and data models
- Read configuration files, READMEs, and service definitions
- Trace user-facing flows from entry point to data store
- Compare implementation reality to documentation claims

### Output Format

```markdown
# Codebase Audit: [System/Service Name]

## One-Sentence Summary
What this system does in plain language.

## Architecture Overview
[Mermaid diagram of key components and data flow]

## Capability Map
| Capability | Status | Evidence | Product Implication |
|------------|--------|----------|---------------------|
| [Feature] | Exists/Partial/Missing | [file/pattern] | [What this means for PM decisions] |

## Key Findings
1. **[Finding]** — [Evidence] → [Product implication]
2. **[Finding]** — [Evidence] → [Product implication]

## Gap Inventory
| Expected (from docs) | Reality (from code) | Impact |
|----------------------|---------------------|--------|

## Questions for Engineering
- [Things code can't answer alone]

## Recommendations
1. [Action item with evidence backing]
```

### Principles

- **Evidence over assumption** — Cite file paths and code patterns
- **Product language** — Translate technical findings into PM-relevant insights
- **Honest about limits** — Flag what you can't determine from code alone
- **Mermaid for diagrams** — Use Mermaid format for architecture diagrams, not ASCII art
