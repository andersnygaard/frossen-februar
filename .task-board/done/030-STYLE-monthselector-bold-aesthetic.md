# Task 030: Update MonthSelector to Match Demo-08 Bold Aesthetic

**Status**: Done
**Created**: 2026-01-21
**Priority**: Medium
**Labels**: frontend, styling, ui
**Estimated Effort**: Simple - 1 hour

## Context & Motivation

Task 028 aligned most components with demo-08's bold typography design, but MonthSelector was not updated. The navigation buttons still use light gray borders (`var(--color-border)`) and the month label font size doesn't match demo-08's scale.

## Current State

MonthSelector currently:
- Buttons have `border: var(--border-width) solid var(--color-border)` (light gray #e5e5e5)
- Month text uses `font-size: var(--font-size-xl)` (~2rem)
- No hover effects on buttons

Demo-08 reference:
- Month label font-size: `clamp(2rem, 6vw, 4rem)` with weight 800
- No navigation buttons in the static demo (but user wants to keep them)

## Desired Outcome

MonthSelector matches the bold aesthetic of demo-08:
- Navigation buttons have black borders
- Month label has larger, bolder typography
- Buttons have hover state consistent with rest of app

## Acceptance Criteria

- [x] Navigation buttons have `border: 2px solid #000000`
- [x] Month label uses `font-size: clamp(2rem, 6vw, 4rem)` and `font-weight: 800`
- [x] Buttons have hover effect (e.g., scale or background change)
- [x] Build passes
- [x] Visual check confirms consistency with demo-08

## Affected Components

### Frontend
- **File**: `packages/ui/src/components/MonthSelector/MonthSelector.css`

## Technical Approach

### Implementation Steps

1. **Update MonthSelector.css**:
   ```css
   .month-selector__text {
     font-size: clamp(2rem, 6vw, 4rem);
     font-weight: 800;
     letter-spacing: -0.02em;
   }

   .month-selector__btn {
     min-width: var(--touch-target);
     min-height: var(--touch-target);
     font-size: var(--font-size-lg);
     background: transparent;
     border: 2px solid #000000;
     cursor: pointer;
     transition: all 0.15s ease;
   }

   .month-selector__btn:hover {
     transform: scale(1.05);
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   }

   .month-selector__btn:active {
     transform: scale(0.98);
   }
   ```

2. **Run build to verify**: `pnpm build`

3. **Visual verification**: `pnpm dev` and compare to demo-08

## Code References

### Current MonthSelector.css
```css
// File: packages/ui/src/components/MonthSelector/MonthSelector.css
.month-selector__btn {
  border: var(--border-width) solid var(--color-border);  // light gray
}
```

### Demo-08 Reference
```css
// File: .docs/design-drafts/frossen-februar/demo-08.html
.month-label {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}
```

## Verification

- [x] `pnpm build` passes
- [x] `pnpm dev` shows black borders on nav buttons
- [x] Month label typography matches demo-08 scale
- [x] Hover effects work on buttons

---

**Completed**: 2026-01-21
