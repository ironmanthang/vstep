---
trigger: always_on
---

# Vstep Project & Monorepo Rules

## Refactor Audit & Dead Code Pruning
- **Refactor feature audit:** When redesigning or refactoring a component, audit every existing feature against the new data model. Do NOT carry features forward by default — each one must justify itself against the new model from scratch. If a feature no longer fits cleanly (e.g., creates a second live representation of the same data, requires a lossy round-trip, or adds a special-case path), flag it for removal proactively, without waiting for the user to notice.
- **Proactive Dead Code Pruning:** After any refactor, audit the full call surface (hook signatures, exported types, service layers, import statements) for functions, props, or types that are no longer called or have been superseded. Remove them immediately — never leave dead exports or stale interfaces lingering for the user to discover.

## File Boundaries & Structure
- **File size & structure alerts:** After coding, if any source code logic file ends up above 400 lines (excluding special files such as i18n JSON locales, auto-generated/lock files, raw data/mock constants, build/config manifests, and central entry points), or a folder has more than 10 files, alert the user and suggest a way to split/refactor the structure. Name subfolders appropriately so AI agents understand file contents.

## Precise File Editing & Target Containment
- **Zero Collateral Deletions**: When editing files with replacement tools (`replace_file_content` / `multi_replace_file_content`), strictly scope `TargetContent` and line boundaries to the exact lines being modified. Never sweep adjacent unrelated lines, comments, or bullet points into `TargetContent` unless they are intentionally being rewritten.
- **Mandatory Post-Edit Diff Audit**: Inspect the generated diff block immediately after every file replacement to verify that no neighboring lines, imports, state variables, or documentation points were accidentally truncated or overwritten.

## Commands & Monorepo Workflow
- **PowerShell Shell (Windows):** The shell is PowerShell (`pwsh`), not bash. Never use Linux/bash-only commands. Common substitutions: `head -n N` → `Select-Object -First N`, `tail -n N` → `Select-Object -Last N`, `grep` → `Select-String`.
- **pnpm typecheck pattern:** To run `tsc` in a workspace package, always use `pnpm --filter <workspace-name> exec tsc --noEmit`. Never use `pnpm --filter <workspace-name> tsc --noEmit` — that fails because `tsc` is a binary, not a package.json script.
- **Proactive Command Execution:** Whenever a diagnostic check, environment check, file existence check (e.g., `Test-Path`), log inspection, or non-destructive read-only command is needed, proactively run or propose the command instead of asking the user to execute it manually.
- **Proactive Self-Correction & Learning:** Whenever the user points out a mistake in behavior/execution, or you catch your own mistake during a task, proactively suggest and propose an update to the appropriate rule file (global or workspace rule) so the lesson is persisted for future sessions.