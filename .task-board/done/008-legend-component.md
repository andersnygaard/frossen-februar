# Task 008: Legend component

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: Medium
**Labels**: ui, component
**Depends On**: 006

## Goal

Create Legend component - visual guide to day states.

## Acceptance Criteria

- [x] `packages/ui/src/components/Legend/Legend.vue` created
- [x] No props, static content
- [x] Renders: 3 color boxes with Norwegian labels
- [x] `Legend.css` with mobile stack, desktop row
- [x] `Legend.stories.ts` with default story
- [x] Exported from index.ts

## Implementation

### Legend.vue
```vue
<script setup lang="ts">
const items = [
  { state: 'success', label: 'Ingen forbruk' },
  { state: 'warning', label: 'Nødvendig' },
  { state: 'fail', label: 'Unødvendig' },
];
</script>

<template>
  <div class="legend">
    <div v-for="item in items" :key="item.state" class="legend__item">
      <span class="legend__color" :class="`legend__color--${item.state}`" />
      <span class="legend__label">{{ item.label }}</span>
    </div>
  </div>
</template>
```

### Legend.css
```css
.legend {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.legend__item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.legend__color {
  width: 40px;
  height: 40px;
  border: var(--border-width) solid var(--color-border);
}

.legend__color--success { background: var(--color-success); }
.legend__color--warning { background: var(--color-warning); }
.legend__color--fail { background: var(--color-fail); }

@media (min-width: 640px) {
  .legend {
    flex-direction: row;
    justify-content: center;
  }
}
```

## Verification

```bash
pnpm --filter @frossen/ui storybook
# Story renders correctly on mobile and desktop
```

## Progress Log

### Completed
- Created Legend.vue with static items array containing 3 states (success, warning, fail) with Norwegian labels
- Implemented v-for loop rendering 3 legend items with color boxes and labels
- Created Legend.css with mobile-first design: stacked (column) on mobile, horizontal row (centered) on desktop at 640px breakpoint
- All CSS variables properly used: --space-md, --space-sm, --border-width, --color-border, --color-success, --color-warning, --color-fail
- Created Legend.stories.ts with Default story, following DayCell pattern with centered layout and autodocs tags
- Exported Legend from packages/ui/src/index.ts
- Verified build succeeds with pnpm build (no TypeScript or lint errors)
- All 6 acceptance criteria completed
