# STYLE: Legend and StatsCard Refinement

**Status**: Completed
**Created**: 2026-01-21
**Priority**: Medium
**Labels**: ui, styling, polish
**Estimated Effort**: Simple - 1 hour

## Context & Motivation

The current legend section and stats cards are visually unbalanced. The stats numbers are too large (dominating the UI), spacing is inconsistent, and the Norwegian labels could be more descriptive.

## Current State

- Legend title says "Status" (not ideal terminology)
- Legend labels are terse: "Ingen forbruk", "Nødvendig", "Unødvendig"
- StatsCard numbers use `clamp(3rem, 8vw, 5rem)` - too large
- Stats grid has `gap: var(--space-md)` (1rem) - could use more breathing room

## Desired Outcome

- More appropriate title "Forklaring" (Explanation)
- More descriptive Norwegian labels
- Smaller, more balanced stat numbers
- Better spacing between and after stats cards

## Acceptance Criteria

- [x] Legend title changed from "Status" to "Forklaring"
- [x] Legend labels updated to more descriptive Norwegian
- [x] Stats numbers visually smaller and more balanced
- [x] Uniform spacing between stats cards
- [x] Added breathing room after the stats section

## Affected Components

### UI Package
- `packages/ui/src/components/Legend/Legend.vue` - Title and labels
- `packages/ui/src/components/StatsCard/StatsCard.css` - Number font-size

### App Package
- `packages/app/src/style.css` - Stats grid spacing

## Technical Approach

### Implementation Steps

1. **Legend.vue - Update title and labels**
   - Line 11: Change `Status` → `Forklaring`
   - Lines 3-5: Update labels:
     - `Ingen forbruk` → `Ingen forbruk i dag`
     - `Nødvendig` → `Nødvendig kjøp`
     - `Unødvendig` → `Unødvendig kjøp`

2. **StatsCard.css - Reduce number size**
   - Line 11: Change `font-size: clamp(3rem, 8vw, 5rem)` → `clamp(2rem, 5vw, 3rem)`

3. **App style.css - Improve stats spacing**
   - Line 55: Change `gap: var(--space-md)` → `var(--space-lg)` (1.5rem)
   - Add `margin-bottom: var(--space-xl)` to `.stats` for breathing room

## Code References

### Current Legend.vue (lines 2-11)
```vue
const items = [
  { state: 'success', label: 'Ingen forbruk' },
  { state: 'warning', label: 'Nødvendig' },
  { state: 'fail', label: 'Unødvendig' },
];
// ...
<div class="legend__title">Status</div>
```

### Current StatsCard.css (line 11)
```css
.stats-card__value {
  font-size: clamp(3rem, 8vw, 5rem);
```

### Current App style.css (lines 52-56)
```css
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}
```

## Verification

1. Run `pnpm dev` and visually confirm:
   - Legend title shows "Forklaring"
   - Legend labels are more descriptive
   - Stats numbers are smaller and balanced
   - Uniform spacing between stats cards
   - Breathing room after the stats section
2. Run `pnpm storybook` to verify components in isolation

---

**Next Steps**: Ready for implementation. Move to `.task-board/in-progress/` when starting work.
