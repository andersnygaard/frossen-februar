# Task 014: useChallenge composable

**Status**: Backlog
**Phase**: 3 - Application
**Priority**: Critical
**Labels**: app, state
**Depends On**: 013

## Goal

Create composable for challenge state management with localStorage persistence.

## Acceptance Criteria

- [x] `packages/app/src/composables/useChallenge.ts` created
- [x] State: `currentMonth`, `currentYear` refs
- [x] State: `data` reactive Map of month-key to day states
- [x] Methods: `goToPrevMonth()`, `goToNextMonth()`
- [x] Methods: `toggleDay(day: number)` - cycles none→success→warning→fail→none
- [x] Methods: `getStats()` - returns {success, warning, fail} counts
- [x] Persistence: load from localStorage on init, save on change
- [x] Data persists on refresh

## Implementation

### useChallenge.ts
```typescript
import { ref, reactive, computed, watch } from 'vue';
import type { DayState } from '@frossen/ui';

const STORAGE_KEY = 'frossen-februar-data';

interface ChallengeData {
  [monthKey: string]: Record<number, DayState>;
}

export function useChallenge() {
  const currentMonth = ref(new Date().getMonth() + 1); // 1-12
  const currentYear = ref(new Date().getFullYear());

  const data = reactive<ChallengeData>(loadFromStorage());

  const monthKey = computed(() => `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`);

  const dayStates = computed(() => data[monthKey.value] || {});

  function goToPrevMonth() {
    if (currentMonth.value === 1) {
      currentMonth.value = 12;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
  }

  function goToNextMonth() {
    if (currentMonth.value === 12) {
      currentMonth.value = 1;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
  }

  function toggleDay(day: number) {
    const key = monthKey.value;
    if (!data[key]) data[key] = {};

    const states: (DayState | undefined)[] = [undefined, 'success', 'warning', 'fail'];
    const current = data[key][day];
    const nextIndex = (states.indexOf(current) + 1) % states.length;
    const next = states[nextIndex];

    if (next) {
      data[key][day] = next;
    } else {
      delete data[key][day];
    }
  }

  function getStats() {
    const states = Object.values(dayStates.value);
    return {
      success: states.filter(s => s === 'success').length,
      warning: states.filter(s => s === 'warning').length,
      fail: states.filter(s => s === 'fail').length,
    };
  }

  // Persistence
  watch(data, () => saveToStorage(data), { deep: true });

  return {
    currentMonth,
    currentYear,
    dayStates,
    goToPrevMonth,
    goToNextMonth,
    toggleDay,
    getStats,
  };
}

function loadFromStorage(): ChallengeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: ChallengeData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
```

## Verification

Manual test in App.vue - click days, refresh, verify persistence.

## Progress Log

**Completed**: 2026-01-21

- Created `/packages/app/src/composables/useChallenge.ts` with complete implementation
- Imported `DayState` type from `@frossen/ui` package
- Implemented state management with Vue 3 Composition API:
  - `currentMonth` and `currentYear` refs initialized to current date
  - `data` reactive object with localStorage persistence
  - `monthKey` computed property for month-year formatting (YYYY-MM)
  - `dayStates` computed property for current month's day states
- Implemented navigation methods:
  - `goToPrevMonth()` handles year decrement when moving from January
  - `goToNextMonth()` handles year increment when moving to January
- Implemented day state cycling:
  - `toggleDay(day)` cycles through: none → success → warning → fail → none
  - Proper cleanup: deletes day entry when state becomes undefined
- Implemented statistics:
  - `getStats()` returns object with counts for success, warning, fail states
  - Counts derived from current month's dayStates
- Implemented localStorage persistence:
  - `loadFromStorage()` loads data on composable initialization
  - `saveToStorage()` called via deep watcher on data changes
  - Safe JSON parsing with error fallback to empty object
- TypeScript compilation verified: no errors
- All 8 acceptance criteria met and checked off
