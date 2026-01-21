# Task 012: Types export

**Status**: Backlog
**Phase**: 2 - UI Components
**Priority**: High
**Labels**: ui, types
**Depends On**: 004

## Goal

Create TypeScript types for the UI library and export from index.ts.

## Acceptance Criteria

- [x] `packages/ui/src/types.ts` created
- [x] Export `DayState = 'success' | 'warning' | 'fail'`
- [x] Export component prop interfaces
- [x] `index.ts` updated to export types
- [x] Types importable from @frossen/ui

## Implementation

### types.ts
```typescript
export type DayState = 'success' | 'warning' | 'fail';

export interface DayCellProps {
  day: number;
  state?: DayState | null;
  isToday?: boolean;
  disabled?: boolean;
}

export interface StatsCardProps {
  value: number;
  label: string;
  variant: 'success' | 'warning' | 'fail';
}

export interface MonthSelectorProps {
  month: number;
  year: number;
}

export interface CalendarGridProps {
  month: number;
  year: number;
  dayStates: Record<number, DayState>;
  today: Date;
}
```

### index.ts update
```typescript
// Types
export type { DayState, DayCellProps, StatsCardProps, MonthSelectorProps, CalendarGridProps } from './types';

// Components
export { default as DayCell } from './components/DayCell/DayCell.vue';
export { default as Legend } from './components/Legend/Legend.vue';
export { default as StatsCard } from './components/StatsCard/StatsCard.vue';
export { default as MonthSelector } from './components/MonthSelector/MonthSelector.vue';
export { default as CalendarGrid } from './components/CalendarGrid/CalendarGrid.vue';
```

## Verification

```bash
pnpm --filter @frossen/ui build
# Build succeeds, types in dist/
```

## Progress Log

### Completed
1. Enhanced `packages/ui/src/types/index.ts` with all required component prop interfaces:
   - DayCellProps interface
   - StatsCardProps interface
   - MonthSelectorProps interface
   - CalendarGridProps interface

2. Updated `packages/ui/src/index.ts` to export all new types:
   - Added DayCellProps, StatsCardProps, MonthSelectorProps, CalendarGridProps to export statement

3. Installed `vite-plugin-dts` to generate TypeScript declaration files

4. Updated `vite.config.ts` to use dts plugin for automatic .d.ts generation

5. Verified build succeeds with TypeScript types:
   - `dist/index.d.ts` correctly exports all types
   - `dist/types/index.d.ts` contains all type definitions
   - Types are importable from @frossen/ui package
