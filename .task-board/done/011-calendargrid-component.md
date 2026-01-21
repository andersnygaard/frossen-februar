# Task 011: CalendarGrid component

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: Critical
**Labels**: ui, component
**Depends On**: 007

## Goal

Create CalendarGrid component - main calendar display using DayCell.

## Acceptance Criteria

- [x] `packages/ui/src/components/CalendarGrid/CalendarGrid.vue` created
- [x] Props: `month: number`, `year: number`, `dayStates: Record<number, DayState>`, `today: Date`
- [x] Emits: `dayClick(day: number)`
- [x] Computes: days in month, start day of week, disabled days
- [x] Renders: day headers (Man-Søn), empty cells, DayCell for each day
- [x] `CalendarGrid.css` with 7-column CSS grid
- [x] `CalendarGrid.stories.ts` with stories and play function
- [x] Exported from index.ts

## Implementation

### CalendarGrid.vue
```vue
<script setup lang="ts">
import { computed } from 'vue';
import DayCell from '../DayCell/DayCell.vue';
import type { DayState } from '../../types';

const props = defineProps<{
  month: number; // 1-12
  year: number;
  dayStates: Record<number, DayState>;
  today: Date;
}>();

const emit = defineEmits<{
  dayClick: [day: number];
}>();

const weekdays = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

const daysInMonth = computed(() => new Date(props.year, props.month, 0).getDate());

const startDayOfWeek = computed(() => {
  const firstDay = new Date(props.year, props.month - 1, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday=0 to Monday-first
});

const isToday = (day: number) => {
  return props.today.getFullYear() === props.year
    && props.today.getMonth() + 1 === props.month
    && props.today.getDate() === day;
};

const isDisabled = (day: number) => {
  const date = new Date(props.year, props.month - 1, day);
  return date > props.today;
};
</script>

<template>
  <div class="calendar-grid">
    <div v-for="day in weekdays" :key="day" class="calendar-grid__header">
      {{ day }}
    </div>
    <div v-for="_ in startDayOfWeek" :key="`empty-${_}`" class="calendar-grid__empty" />
    <DayCell
      v-for="day in daysInMonth"
      :key="day"
      :day="day"
      :state="dayStates[day]"
      :is-today="isToday(day)"
      :disabled="isDisabled(day)"
      @click="emit('dayClick', day)"
    />
  </div>
</template>
```

### CalendarGrid.css
```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
}

.calendar-grid__header {
  text-align: center;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  padding: var(--space-sm) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}
```

## Verification

```bash
pnpm --filter @frossen/ui storybook
# Grid layout correct, play function passes
```

## Progress Log

**2026-01-20**: Implementation completed

- Created `packages/ui/src/components/CalendarGrid/CalendarGrid.vue` with:
  - Props for month (1-12), year, dayStates Record, and today Date
  - Emits dayClick event with day number
  - Computed properties for daysInMonth and startDayOfWeek
  - isToday() and isDisabled() helper methods
  - Template with 7-column grid, weekday headers (Man-Søn), empty cells, and DayCell components

- Created `packages/ui/src/components/CalendarGrid/CalendarGrid.css` with:
  - 7-column CSS grid layout
  - Styling for header row with uppercase weekday names

- Created `packages/ui/src/stories/CalendarGrid.stories.ts` with:
  - 6 story variants: Default, CurrentMonth, NoStates, AllStates, DayClickInteraction, GridLayout
  - Play functions for interaction and grid layout verification
  - Proper TypeScript typing and Storybook integration

- Updated `packages/ui/src/index.ts` to export CalendarGrid component

- Verified:
  - Build passes: `pnpm --filter @frossen/ui build` completes successfully
  - TypeScript: `vue-tsc --noEmit` passes with no errors
  - No breaking changes to existing exports
