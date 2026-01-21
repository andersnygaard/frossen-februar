# Task 010: MonthSelector component

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: High
**Labels**: ui, component
**Depends On**: 006

## Goal

Create MonthSelector component - navigation between months.

## Acceptance Criteria

- [x] `packages/ui/src/components/MonthSelector/MonthSelector.vue` created
- [x] Props: `month: number` (1-12), `year: number`
- [x] Emits: `prev`, `next`
- [x] Renders: prev button, "Februar 2026" text, next button
- [x] `MonthSelector.css` with flexbox, touch-friendly buttons
- [x] `MonthSelector.stories.ts` with stories and play function
- [x] Exported from index.ts

## Implementation

### MonthSelector.vue
```vue
<script setup lang="ts">
const props = defineProps<{
  month: number; // 1-12
  year: number;
}>();

const emit = defineEmits<{
  prev: [];
  next: [];
}>();

const monthNames = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
];

const displayText = computed(() => `${monthNames[props.month - 1]} ${props.year}`);
</script>

<template>
  <div class="month-selector">
    <button class="month-selector__btn" @click="emit('prev')">&larr;</button>
    <span class="month-selector__text">{{ displayText }}</span>
    <button class="month-selector__btn" @click="emit('next')">&rarr;</button>
  </div>
</template>
```

### MonthSelector.css
```css
.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
}

.month-selector__text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.month-selector__btn {
  min-width: var(--touch-target);
  min-height: var(--touch-target);
  font-size: var(--font-size-lg);
  background: transparent;
  border: var(--border-width) solid var(--color-border);
  cursor: pointer;
}
```

## Verification

```bash
pnpm --filter @frossen/ui storybook
# Stories render, play function verifies emit
```

## Progress Log

### Implementation Complete
- Created `packages/ui/src/components/MonthSelector/MonthSelector.vue` with:
  - `computed` import from Vue for displayText
  - Props: month (1-12), year
  - Emits: prev, next events
  - Norwegian month names array (Januar through Desember)
  - Template with prev button, month/year display, next button

- Created `packages/ui/src/components/MonthSelector/MonthSelector.css` with:
  - Flexbox layout with space-between distribution
  - Touch-friendly buttons (44px minimum via CSS tokens)
  - Proper styling using design system tokens

- Created `packages/ui/src/stories/MonthSelector.stories.ts` with:
  - Default story showing February 2026
  - January and December edge cases
  - EmitBehavior story with play function that verifies button clicks and emit events

- Updated `packages/ui/src/index.ts` to export MonthSelector component

### Build Verification
- TypeScript compilation: ✓ No errors (vue-tsc --noEmit)
- Package build: ✓ Successful (vite build)
- All files present and properly formatted
