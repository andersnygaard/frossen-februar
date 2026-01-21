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

  const hasAnyData = computed(() => {
    return Object.values(data).some(monthData =>
      Object.keys(monthData).length > 0
    );
  });

  // Persistence
  watch(data, () => saveToStorage(data), { deep: true });

  return {
    currentMonth,
    currentYear,
    dayStates,
    hasAnyData,
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
