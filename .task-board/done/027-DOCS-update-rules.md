# Task 027: Update .claude/rules for Vue.js

**Status**: Done
**Priority**: High
**Labels**: docs, housekeeping
**Estimated Effort**: Medium

## Context

Current rules in `.claude/rules/` describe React patterns, Express backend, and finans-specific conventions. The actual project uses Vue.js with no backend.

## Problem

Rules don't match actual codebase patterns, causing incorrect code suggestions.

## Desired Outcome

Rules accurately describe:
- Vue 3 Composition API patterns
- Vue SFC component structure
- pnpm workspace commands
- Component library patterns (@frossen/ui)
- CSS token system (tokens.css)
- Storybook story patterns
- Playwright test patterns

## Acceptance Criteria

- [x] frontend/\*.md rules updated for Vue.js → `packages/app/.claude-rules` has Vue composable patterns
- [x] components/\*.md rules updated for Vue SFC → `packages/ui/.claude-rules` has Vue 3 SFC patterns
- [x] Remove backend rules (no backend in this project) → No backend rules exist
- [x] e2e/\*.md rules match Playwright patterns → `packages/e2e/.claude-rules` has Playwright patterns
- [x] Remove finans-specific domain rules → No finans-specific rules present

## Resolution

**Status**: Already complete from prior session.

The project uses `packages/*/.claude-rules` files (not `.claude/rules/` directory):
- `packages/ui/.claude-rules` - Vue 3 SFC patterns, Storybook CSF3, CSS tokens, BEM naming
- `packages/app/.claude-rules` - Vue composables, localStorage, state cycling, no backend
- `packages/e2e/.claude-rules` - Playwright test patterns, locators, assertions

All rules files already describe Vue.js patterns - no React or finans-specific content present.

**Completed**: 2026-01-21
