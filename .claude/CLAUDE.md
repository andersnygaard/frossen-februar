# Frossen Februar - No-Spend Challenge Tracker

> PWA for tracking daily spending habits during a no-spend challenge. Built with Vue 3, TypeScript, and Vite.

## Project Overview

**Architecture**: pnpm monorepo with 3 workspaces

**Purpose**: Help users track daily spending during a no-spend challenge (like "Frozen February"). Users mark each day as success (no spend), warning (small spend), or fail (broke the challenge).

**Target Users**: People doing no-spend challenges, budget-conscious individuals

---

## Tech Stack

### App (`/packages/app`)
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State**: Composables (useChallenge)
- **Persistence**: localStorage (no backend)
- **PWA**: vite-plugin-pwa

### UI Library (`/packages/ui`)
- **Type**: Shared Vue component library
- **Documentation**: Storybook 8
- **Styling**: CSS custom properties (tokens.css)
- **Distribution**: Workspace dependency (@frossen/ui)

### E2E Tests (`/packages/e2e`)
- **Framework**: Playwright
- **Strategy**: E2E tests only, no unit tests
- **Focus**: Calendar interactions, navigation, data persistence

---

## Repository Structure

```
packages/
  app/           - Vue 3 PWA application
  ui/            - Shared component library
  e2e/           - Playwright E2E tests
.claude/         - Claude Code configuration
.docs/           - Design drafts and documentation
.task-board/     - Task tracking
```

---

## Design System

### Approved Design
Demo-08 (Bold Typography) - see `.docs/design-drafts/frossen-februar/demo-08.html`

### CSS Tokens
**Location**: `packages/ui/src/styles/tokens.css`

```css
:root {
  /* Colors */
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-border: #e5e5e5;
  --color-success: #10b981;    /* Green - no spend */
  --color-warning: #f59e0b;    /* Yellow - small spend */
  --color-fail: #ef4444;       /* Red - broke challenge */

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-weight-bold: 900;
  --font-size-stat: clamp(2.5rem, 8vw, 4rem);

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Layout */
  --max-width: 900px;
  --touch-target: 44px;
}
```

### Typography
- **Font**: System sans-serif
- **Weight**: 900 (extra bold) for headings and stats
- **Sizing**: Responsive via clamp()

---

## Components

| Component | Purpose |
|-----------|---------|
| **DayCell** | Single day button with state (success/warning/fail) |
| **CalendarGrid** | 7-column grid with weekday headers (Man-Søn) |
| **MonthSelector** | Prev/next navigation with month/year display |
| **StatsCard** | Large number display with label |
| **Legend** | Color legend for day states |

---

## Domain Concepts

| Term | Definition |
|------|------------|
| **DayState** | `'success' \| 'warning' \| 'fail' \| undefined` |
| **Success** | Green - no spending that day |
| **Warning** | Yellow - small/necessary spend |
| **Fail** | Red - broke the challenge |
| **State Cycling** | Click cycles: none → success → warning → fail → none |

---

## Data Structure

```typescript
// Storage key: 'frossen-februar-data'
interface ChallengeData {
  [monthKey: string]: Record<number, DayState>;
  // e.g., "2024-02": { 1: "success", 5: "warning", 10: "fail" }
}
```

- **Month key format**: `"YYYY-MM"` (e.g., "2024-02")
- **Day keys**: 1-31 (day of month)
- **Persistence**: localStorage with JSON serialization

---

## Development Commands

```bash
pnpm install              # Install all dependencies
pnpm dev                  # Run app dev server (localhost:5173)
pnpm storybook            # Run Storybook (localhost:6006)
pnpm build                # Build all packages
pnpm --filter @frossen/e2e test  # Run E2E tests
```

---

## Norwegian Labels

- **Frossen Februar** - Frozen February (the challenge name)
- **Man, Tir, Ons, Tor, Fre, Lør, Søn** - Weekday abbreviations
- **Suksess, Advarsel, Feil** - Success, Warning, Fail

---

## Coding Standards

### File Naming
- **Components**: `PascalCase/` folder with `Component.vue` + `Component.css`
- **Composables**: `useCamelCase.ts`
- **Stories**: `Component.stories.ts`
- **Tests**: `feature.spec.ts`

### Vue Patterns
- `<script setup lang="ts">` for all components
- `defineProps<T>()` and `defineEmits<T>()` with TypeScript
- Scoped CSS via `<style scoped>`
- Composables for shared state logic

### CSS Patterns
- Use tokens from `tokens.css`
- BEM-like naming: `.component`, `.component--modifier`, `.component__element`
- Mobile-first with `min-width` media queries

### Language
All code, comments, and documentation in English.
Norwegian only for user-facing labels.

---

## NOTES FROM THE USER
- USER IS A SENIOR DEV. EXPECTS SENIOR DEVELOPER LEVEL WORK.
- DO NOT BE LAZY. FIND ROOT CAUSE. NO TEMPORARY FIXES.
- ALWAYS USE TOOLS OVER BASH (Read, Edit, Write, Glob, Grep - not cat, sed, awk, find, grep)
- THINK HARD. WRITE ELEGANT CODE. NO SLOPPY SOLUTIONS.
- AFTER EVERY CODE BLOCK: LINT, COMPILE. DO THIS BEFORE WRITING THE NEXT CODE BLOCK.
- CLEAN, READABLE, DRY CODE. NO DUPLICATION.
- EDIT EXISTING CODE OVER ADDING NEW CODE. LOOK FOR REFACTORING OPPORTUNITIES.
- REVIEW YOUR OWN WORK AFTER EACH STEP. IS THIS CLEAN? IS THIS DRY? FIX IT BEFORE MOVING ON.
- LOAD RULES RELEVANT FOR TASK: Before starting, READ relevant rule files from package `.claude-rules` files.
