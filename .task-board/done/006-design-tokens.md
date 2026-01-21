# Task 006: Create design tokens

**Status**: Backlog
**Phase**: 1 - Project Foundation
**Priority**: High
**Labels**: ui, styling
**Depends On**: 004

## Goal

Create CSS custom properties extracted from demo-08 design.

## Acceptance Criteria

- [x] `packages/ui/src/styles/tokens.css` created
- [x] Colors: white, black, success (#10b981), warning (#f59e0b), fail (#ef4444)
- [x] Typography: system font stack, clamp() font sizes
- [x] Spacing: gap, padding values
- [x] Breakpoints as CSS custom properties
- [x] tokens.css imports without errors in Storybook preview

## Implementation

Create `packages/ui/src/styles/tokens.css`:

```css
:root {
  /* Colors */
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-border: #e5e5e5;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-fail: #ef4444;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-weight-bold: 900;
  --font-size-xs: clamp(0.75rem, 2vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 2.5vw, 1rem);
  --font-size-base: clamp(1rem, 3vw, 1.125rem);
  --font-size-lg: clamp(1.25rem, 4vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 5vw, 2rem);
  --font-size-2xl: clamp(2rem, 6vw, 3rem);
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
  --border-width: 2px;
  --border-radius: 0;

  /* Touch */
  --touch-target: 44px;

  /* Breakpoints (for reference in JS) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
}
```

## Verification

Import in Storybook preview.ts and confirm no errors.

## Progress Log

**Completed**: 2026-01-20

1. Replaced placeholder tokens.css with full implementation
   - Added 7 color tokens (bg, text, text-muted, border, success, warning, fail)
   - Added 9 typography tokens (sans font family, bold weight, 7 responsive font sizes using clamp())
   - Added 6 spacing tokens (xs through 2xl)
   - Added layout tokens (max-width, border-width, border-radius, touch-target)
   - Added 2 breakpoint tokens for media queries

2. Verified tokens.css:
   - File loads successfully (1089 bytes)
   - All required tokens present and correctly formatted
   - Imports without errors in Storybook preview.ts
   - CSS transforms correctly during build process

3. Updated task acceptance criteria:
   - All 6 criteria marked as complete
   - Task ready for review
