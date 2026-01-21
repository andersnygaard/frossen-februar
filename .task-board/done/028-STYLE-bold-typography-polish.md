# Task 028: Polish App Styling to Match Demo-08

**Status**: Done
**Priority**: Medium
**Labels**: frontend, styling
**Estimated Effort**: Medium

## Context

The Vue app implements demo-08's bold typography design, but some details differ from the original HTML demo.

## Current vs Demo-08

| Element | Demo-08 | Current App |
|---------|---------|-------------|
| Title | Two lines "Frossen<br>Februar", massive font | Single line, smaller |
| Header | 4px border-bottom | No border |
| Day cells | aspect-ratio: 1, scale(1.05) hover | Fixed 44x44px |
| Today marker | ::before black dot | box-shadow |
| Legend | "Status" title, larger boxes | Simple row |
| Stat cards | 3px borders, larger numbers | 2px borders |

## Acceptance Criteria

- [x] Title matches demo-08 typography (clamp sizes, 2 lines)
- [x] Header has bottom border
- [x] Day cells are square with hover scale effect
- [x] Today marker uses dot indicator
- [x] Legend has "Status" title
- [x] Stat cards have bolder styling
- [x] Mobile responsive matches demo-08

## Changes Implemented

### packages/app/src/style.css
- Updated `.header` with `border-bottom: 4px solid #000000`, increased `padding-bottom` to 40px, `margin-bottom` to 60px
- Updated `.title` font-size to `clamp(3rem, 12vw, 8rem)` with `line-height: 0.95`, `letter-spacing: -0.03em`, `text-transform: uppercase`
- Updated `.subtitle` font-size to `clamp(1rem, 3vw, 1.5rem)`, added `font-weight: 300`, `letter-spacing: 0.1em`, `text-transform: uppercase`
- Added mobile responsive styles with max-width: 640px media query

### packages/app/src/App.vue
- Changed title from "FROSSEN FEBRUAR" to "Frossen<br>Februar" (two lines)
- Changed subtitle from "Spor ditt forbruk dag for dag" to "No-Spend Challenge 2026"

### packages/ui/src/components/DayCell/DayCell.css
- Changed from fixed 44x44px to `aspect-ratio: 1` for square cells
- Updated border color to `#000000`
- Changed font-size to `clamp(1.2rem, 4vw, 2.5rem)` with `font-weight: 700`
- Updated hover effect: `transform: scale(1.05)` with `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)`
- Updated active state: `transform: scale(0.98)`
- Changed today indicator from inset box-shadow to `::before` pseudo-element with 8px black dot

### packages/ui/src/components/Legend/Legend.vue
- Added "Status" title wrapper in template with `.legend__title` class
- Wrapped legend items in `.legend__items` container for proper grid layout

### packages/ui/src/components/Legend/Legend.css
- Added `margin-bottom: 60px`, `padding: 30px`, `border: 3px solid #000000`
- Added `.legend__title` with `font-size: clamp(1.5rem, 4vw, 2.5rem)`, `font-weight: 800`
- Changed `.legend__items` to grid with `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`, `gap: 15px`
- Updated `.legend__color` sizing (40x40px) with `border: 2px solid #000000` and color-matched borders
- Updated `.legend__label` with `font-size: clamp(0.9rem, 2.5vw, 1.1rem)`, `font-weight: 600`
- Added mobile responsive styles

### packages/ui/src/components/StatsCard/StatsCard.css
- Increased padding from `var(--space-md)` to 30px
- Updated border from 2px to 3px solid #000000
- Updated font-size to `clamp(3rem, 8vw, 5rem)`
- Added `margin-bottom: 10px` to value
- Updated label font-size to `clamp(0.8rem, 2vw, 1rem)` with `font-weight: 700`
- Added mobile responsive styles with 2px borders and 20px padding

### packages/ui/src/components/CalendarGrid/CalendarGrid.css
- Updated gap from 4px to 8px
- Updated header font-size to `clamp(0.7rem, 2vw, 0.9rem)` with `font-weight: 700`
- Added `letter-spacing: 0.05em` and `padding: 12px 0`
- Updated border-bottom to 2px solid #000000
- Added mobile responsive styles with 4px gap

## Build Status
✓ Build passed successfully

## Reference

- Demo: `.docs/design-drafts/frossen-februar/demo-08.html`
