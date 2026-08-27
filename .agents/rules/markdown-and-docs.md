---
trigger: always_on
---

# Lean Markdown & Token-Efficient Documentation Rules

## Agent-First Documentation & Token Efficiency
- **Agent-First Purpose:** All markdown files in `docs/` and project documentation exist primarily for AI agent context consumption, not human-facing presentation or marketing.
- **Token Efficiency & High Density:** Maximize information density and minimize token waste. Keep descriptions concise, factual, and direct. Avoid narrative fluff, conversational filler, and verbose explanations.
- **No Fancy Icons, Symbols, or Graphs:** Do not include decorative emojis, icons, ASCII art, or complex diagrams/graphs in documentation unless explicitly requested. Plain markdown lines, bullet points, and concise key-value structures are sufficient.

## Lean Markdown & Document Formatting
When creating or editing any Markdown (`.md`) file, plan, note, or document:
- **No Numbered Headers:** Never prefix headers with numbers (e.g., use `### Timeline & Date Logic`, NOT `### 6. Timeline & Date Logic`). Numbering creates fragile coupling when re-ordering or adding sections.
- **No Numbered Lists:** Prefer bullet points (`-` or `*`) over numbered lists (`1.`, `2.`, `3.`) to keep items easy to re-order and scan without numerical clutter.
- **No Emojis / Decorative Icons:** Avoid decorative emojis or icons (e.g., ✅, ❌, 🔴, ⚠️). Use clean plain text labels instead (e.g., `Good:`, `Bad:`, `Warning:`, `Note:`).
- **Hierarchy Via Headers:** Use clean Markdown header levels (`#`, `##`, `###`) to establish logical structure.
- **Bold Prefixes & Action-Oriented:** Start bullet points with bold prefixes (e.g., `- **Category / Key Point**: ...`) and keep items concise and action-oriented.
