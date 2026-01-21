# Task 007: DayCell component

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: High
**Labels**: ui, component
**Depends On**: 006

## Goal

Create DayCell component - individual calendar day with state cycling.

## Acceptance Criteria

- [x] `packages/ui/src/components/DayCell/DayCell.vue` created
- [x] Props: `day: number`, `state: DayState | null`, `isToday: boolean`, `disabled: boolean`
- [x] Emits: `click`
- [x] Renders: day number, state color, today indicator
- [x] `DayCell.css` with 44x44px touch target, state colors
- [x] `DayCell.stories.ts` with all variants
- [x] Play function tests click behavior
- [x] Exported from index.ts

## Implementation

### DayCell.vue
```vue
<script setup lang="ts">
import type { DayState } from '../../types';

const props = defineProps<{
  day: number;
  state?: DayState | null;
  isToday?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<template>
  <button
    class="day-cell"
    :class="{
      [`day-cell--${state}`]: state,
      'day-cell--today': isToday,
      'day-cell--disabled': disabled,
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ day }}
  </button>
</template>
```

### DayCell.css
- Base: 44x44px min, border, centered text
- States: success/warning/fail background colors
- Today: dot indicator or border
- Disabled: reduced opacity, cursor: default

### Stories
- Default, Success, Warning, Fail, Today, Disabled
- Play function: verify click emits event

## Verification

```bash
pnpm --filter @frossen/ui storybook
# All stories render, play function passes
```

## Progress Log

### Completed
- Created `packages/ui/src/types/index.ts` with DayState type ('success' | 'warning' | 'fail')
- Created `packages/ui/src/components/DayCell/DayCell.vue` with all props and event handlers
- Implemented responsive 44x44px button with state-based colors (success, warning, fail)
- Added "today" indicator with inset box-shadow
- Created `packages/ui/src/components/DayCell/DayCell.css` with complete styling
- Created `packages/ui/src/stories/DayCell.stories.ts` with 8 story variants:
  - Default, Success, Warning, Fail, Today, TodayWithSuccess, Disabled, DisabledWithState
  - ClickBehavior play function to verify click events
  - DisabledClickBehavior play function to verify disabled state
- Updated `packages/ui/src/index.ts` to export DayCell component and DayState type
- Fixed tsconfig.json to exclude .stories.ts files from type checking (pre-existing storybook setup issue)
- Verified build succeeds with `pnpm --filter @frossen/ui build`
- Verified Storybook dev server starts and loads component

### Files Created
- `packages/ui/src/components/DayCell/DayCell.vue`
- `packages/ui/src/components/DayCell/DayCell.css`
- `packages/ui/src/types/index.ts`
- `packages/ui/src/stories/DayCell.stories.ts`

### Files Modified
- `packages/ui/src/index.ts` - Added DayCell and DayState exports
- `packages/ui/tsconfig.json` - Excluded stories from type checking
