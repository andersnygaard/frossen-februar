# FEATURE: Frossen Februar - Bold Typography Variants

**Status**: Done
**Created**: 2025-01-20
**Completed**: 2025-01-20
**Priority**: Medium
**Labels**: frontend, design, standalone
**Estimated Effort**: Medium - 1 day

## Context & Motivation

Bruker liker demo-08 (bold typography) fra task 001. Ønsker 5 nye design-varianter som beholder det typografiske DNA-et mens de utforsker ulike visuelle retninger.

**Bug fix**: Originale demoer sammenligner mot `new Date()`. For demo-formål hardkodes "today" til 20. februar 2026.

## Desired Outcome

5 nye standalone HTML-filer basert på demo-08s bold typography stil, hver med unik visuell variant.

## Acceptance Criteria

- [x] 5 HTML-filer opprettet i `.docs/design-drafts/frossen-februar/`
- [x] Hver fil er standalone (HTML + CSS + JS i én fil)
- [x] Hver fil implementerer alle funksjonelle krav
- [x] Hver fil beholder bold typography DNA fra demo-08
- [x] Alle filer hardkoder today til 20. februar 2026
- [x] Alle filer fungerer korrekt i moderne nettlesere

## Functional Requirements (fra task 001)

1. **Title**: "Frossen Februar"
2. **Calendar View**: Februar 2026 som grid
3. **Interaction**: Klikk på dag (i dag eller tidligere) cycler gjennom:
   - `none → green → yellow → red → none`
4. **Colors**:
   - Ingen farge = ikke registrert
   - Grønn = Ingen forbruk
   - Gul = Nødvendig forbruk
   - Rød = Unødvendig forbruk
5. **Legend**: Forklaring av farger
6. **Future days**: Ikke klikkbare (grayed out)
7. **Weekdays**: Header med Man-Søn
8. **Day numbers**: Alltid synlige
9. **Today marker**: Visuell markering på dag 20

## Technical Requirements

- Standalone HTML (HTML + CSS + JS i én fil)
- Ingen eksterne avhengigheter
- Responsivt design
- LocalStorage for persistens
- Uke starter på mandag
- Statistikk: telling av hver farge
- **KRITISK**: Hardkode today til 20. februar 2026:
  ```javascript
  const today = new Date(2026, 1, 20); // 20. februar 2026
  ```

## Design DNA fra Demo-08

Behold disse elementene:
- Font-weight: 900 på titler
- CSS clamp() for responsiv typografi
- Sterk visuell hierarki
- Store tall i statistikk
- Minimalistisk fargepalett
- Tydelige borders

## 5 Design Varianter

| # | Fil | Variant | Beskrivelse | Status |
|---|-----|---------|-------------|--------|
| 11 | `demo-11.html` | Monochrome Bold | Svart/hvit + gråtoner med patterns/ikoner for status | Done |
| 12 | `demo-12.html` | Gradient Typography | Gradient på tittel og tall, mesh-gradienter | Done |
| 13 | `demo-13.html` | Condensed Stacked | Kondensert font, vertikalt stacked layout | Done |
| 14 | `demo-14.html` | Outline Typography | Outline/stroke tittel, transparent tekst | Done |
| 15 | `demo-15.html` | Split Color | Diagonal split bakgrunn, bold kontrast | Done |

## Progress Log

- 2025-01-20 - Task moved to in-progress
- 2025-01-20 - Ran 5 parallel subagents with sonnet model
- 2025-01-20 - All 5 variants completed successfully

## Resolution

Successfully created 5 new standalone HTML files based on demo-08's bold typography DNA.

**Files created**:
- `.docs/design-drafts/frossen-februar/demo-11.html` - Monochrome Bold (black/white with patterns)
- `.docs/design-drafts/frossen-februar/demo-12.html` - Gradient Typography (animated gradients)
- `.docs/design-drafts/frossen-februar/demo-13.html` - Condensed Stacked (ultra-condensed vertical)
- `.docs/design-drafts/frossen-februar/demo-14.html` - Outline Typography (stroke-only titles)
- `.docs/design-drafts/frossen-februar/demo-15.html` - Split Color (diagonal black/white split)

**Design DNA preserved in all variants**:
- Font-weight 900 on titles
- CSS clamp() for responsive typography
- Strong visual hierarchy
- Large stat numbers
- 2-3px borders
- LocalStorage persistence

**All variants implement**:
- Calendar grid with Norwegian weekdays (Man-Søn)
- Monday-first week start
- Click cycling: none → green → yellow → red → none
- Days 1-20 clickable, 21-28 disabled
- Day 20 marked as "today"
- Statistics counter
- Hardcoded today: February 20, 2026

**Next step**: User reviews all 5 designs and selects the best variant.
