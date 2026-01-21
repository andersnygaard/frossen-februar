# Task 016: App styling

**Status**: Backlog
**Phase**: 3 - Application
**Priority**: High
**Labels**: app, styling
**Depends On**: 015

## Goal

Style App.vue to match demo-08 visual design.

## Acceptance Criteria

- [x] `packages/app/src/style.css` created
- [x] Import @frossen/ui tokens
- [x] Container: max-width 900px, centered
- [x] Header: large bold typography from demo-08
- [x] Sections: proper spacing (margin-bottom)
- [x] Mobile-first: stack on mobile, same layout scales up
- [x] Matches demo-08 visually

## Implementation

### style.css
```css
@import '@frossen/ui/styles/tokens.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
}

.app {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md);
}

.header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-xs);
}

.subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.main {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (min-width: 640px) {
  .app {
    padding: var(--space-xl);
  }
}
```

## Verification

Compare with demo-08.html visually. Check mobile and desktop views.

## Progress Log

**Implementation Complete**

- Replaced old style.css with clean, semantic CSS following design system tokens
- CSS Reset: Applied universal reset with margin/padding/box-sizing
- Color & Typography: Uses @frossen/ui token variables for consistency
- Layout:
  - `.app`: max-width 900px (--max-width token), centered with auto margins
  - `.header`: Centered text with proper spacing (--space-2xl margin-bottom)
  - `.title`: Uses --font-size-2xl and --font-weight-bold for large bold typography
  - `.subtitle`: Muted color with smaller font size for visual hierarchy
  - `.main`: Flexbox column with --space-xl gap for vertical spacing
  - `.stats`: 3-column grid (repeat(3, 1fr)) with --space-md gap
- Mobile-First Responsive: Base styles for mobile, media query for padding enhancement at 640px breakpoint
- Build Verification: `pnpm --filter app build` succeeded with no errors
- All acceptance criteria met and checked off
