# Task 009: StatsCard component

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: Medium
**Labels**: ui, component
**Depends On**: 006

## Goal

Create StatsCard component - displays count with label and variant color.

## Acceptance Criteria

- [x] `packages/ui/src/components/StatsCard/StatsCard.vue` created
- [x] Props: `value: number`, `label: string`, `variant: 'success' | 'warning' | 'fail'`
- [x] Renders: large number, small label below
- [x] `StatsCard.css` with clamp() font size, variant colors
- [x] `StatsCard.stories.ts` with Success, Warning, Fail, Zero variants
- [x] Exported from index.ts

## Implementation

### StatsCard.vue
```vue
<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
  variant: 'success' | 'warning' | 'fail';
}>();
</script>

<template>
  <div class="stats-card" :class="`stats-card--${variant}`">
    <span class="stats-card__value">{{ value }}</span>
    <span class="stats-card__label">{{ label }}</span>
  </div>
</template>
```

### StatsCard.css
```css
.stats-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-md);
  border: var(--border-width) solid var(--color-border);
}

.stats-card__value {
  font-size: var(--font-size-stat);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.stats-card--success .stats-card__value { color: var(--color-success); }
.stats-card--warning .stats-card__value { color: var(--color-warning); }
.stats-card--fail .stats-card__value { color: var(--color-fail); }

.stats-card__label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}
```

## Verification

```bash
pnpm --filter @frossen/ui storybook
# All story variants render correctly
```

## Progress Log

**Completed**:
- Created `packages/ui/src/components/StatsCard/StatsCard.vue` with TypeScript props (value, label, variant)
- Implemented template with flexible spacing and variant class binding
- Created `packages/ui/src/components/StatsCard/StatsCard.css` using design tokens:
  - Font size: `--font-size-stat` (clamp 2.5rem to 4rem) for large number display
  - Font weight: `--font-weight-bold` (900)
  - Variant colors: success (green), warning (amber), fail (red)
  - Label styling: uppercase with letter-spacing
- Created `packages/ui/src/stories/StatsCard.stories.ts` with four story variants:
  - Success: 42 Active Days
  - Warning: 8 Pending Tasks
  - Fail: 3 Failed Tests
  - Zero: 0 Errors
- Exported StatsCard from `packages/ui/src/index.ts`
- Verified component with TypeScript compilation (vue-tsc) - no errors
- Verified package build succeeds (pnpm build)
