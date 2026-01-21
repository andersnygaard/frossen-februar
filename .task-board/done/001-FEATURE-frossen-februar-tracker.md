# FEATURE: Frossen Februar - No-Spend Tracker Design Competition

**Status**: Done
**Created**: 2025-01-20
**Completed**: 2025-01-20
**Priority**: Medium
**Labels**: frontend, design, standalone
**Estimated Effort**: Medium - 1 day

## Context & Motivation

Create a simple no-spend challenge tracker as a standalone HTML page. The goal is to run a design competition with 10 different visual interpretations of the same spec, each created by a subagent using the `frontend-design` skill.

## Desired Outcome

10 standalone HTML files, each implementing the same functionality with a unique visual style. User will review all 10 and select the best design.

## Acceptance Criteria

- [x] 10 HTML files created in `.docs/design-drafts/frossen-februar/`
- [x] Each file is standalone (HTML + CSS + JS in one file)
- [x] Each file implements all functional requirements
- [x] Each file has a distinct visual style
- [x] All files work correctly in modern browsers

## Functional Requirements

1. **Title**: "Frossen Februar" (or creative variation)
2. **Calendar View**: Current month displayed as grid of day squares (dynamic)
3. **Interaction**: Click on day (today or earlier) cycles through colors:
   - `none → green → yellow → red → none`
4. **Colors**:
   - No color = not registered
   - Green = Didn't spend money
   - Yellow = Spent on necessary items
   - Red = Spent on unnecessary items
5. **Legend**: Explanation of colors
6. **Future days**: Not clickable (grayed out or visually marked)
7. **Dynamic month**: Always shows current month
8. **Weekdays**: Header row with Mon-Sun above grid
9. **Day numbers**: Always visible in each square (even when colored)
10. **Today marker**: Special visual indication (border/outline)

## Technical Requirements

- Standalone HTML file (HTML + CSS + JS in one file)
- No external dependencies
- Responsive design
- LocalStorage for persistence (required)
- Week starts on Monday (Norwegian standard)
- Statistics display: count of each color (e.g., "12 green, 5 yellow, 3 red")
- No reset button

## 10 Design Styles - COMPLETED

| # | File | Style Focus | Status |
|---|------|-------------|--------|
| 1 | `demo-01.html` | Minimalist Scandinavian | Done |
| 2 | `demo-02.html` | Playful and colorful | Done |
| 3 | `demo-03.html` | Dark mode / neon | Done |
| 4 | `demo-04.html` | Paper/sketchbook | Done |
| 5 | `demo-05.html` | Glassmorphism | Done |
| 6 | `demo-06.html` | Retro/pixel | Done |
| 7 | `demo-07.html` | Organic/nature | Done |
| 8 | `demo-08.html` | Bold typography | Done |
| 9 | `demo-09.html` | Neumorphism | Done |
| 10 | `demo-10.html` | Brutalist | Done |

## Progress Log

- 2025-01-20: Task moved to in-progress
- 2025-01-20: Created output folder `.docs/design-drafts/frossen-februar/`
- 2025-01-20: Ran 10 parallel subagents with sonnet model
- 2025-01-20: All 10 designs completed successfully

## Resolution

Successfully created 10 standalone HTML files for the "Frossen Februar" no-spend tracker design competition.

**Files created**:
- `.docs/design-drafts/frossen-februar/demo-01.html` - Minimalist Scandinavian
- `.docs/design-drafts/frossen-februar/demo-02.html` - Playful and colorful
- `.docs/design-drafts/frossen-februar/demo-03.html` - Dark mode / neon
- `.docs/design-drafts/frossen-februar/demo-04.html` - Paper/sketchbook
- `.docs/design-drafts/frossen-februar/demo-05.html` - Glassmorphism
- `.docs/design-drafts/frossen-februar/demo-06.html` - Retro/pixel
- `.docs/design-drafts/frossen-februar/demo-07.html` - Organic/nature
- `.docs/design-drafts/frossen-februar/demo-08.html` - Bold typography
- `.docs/design-drafts/frossen-februar/demo-09.html` - Neumorphism
- `.docs/design-drafts/frossen-februar/demo-10.html` - Brutalist

**All designs implement**:
- Calendar grid with Norwegian weekday names (Man-Søn)
- Monday-first week start
- Click cycling: none → green → yellow → red → none
- Future days disabled
- Today marker
- Statistics counter
- LocalStorage persistence
- Responsive design
- No external dependencies

**Next step**: User reviews all 10 designs and selects the best one.
