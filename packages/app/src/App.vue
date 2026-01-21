<script setup lang="ts">
import { computed } from 'vue';
import {
  CalendarGrid,
  MonthSelector,
  Legend,
  StatsCard,
} from '@frossen/ui';
import '@frossen/ui/styles/tokens.css';
import '@frossen/ui/style.css';
import { useChallenge } from './composables/useChallenge';
import './style.css';

const {
  currentMonth,
  currentYear,
  dayStates,
  hasAnyData,
  goToPrevMonth,
  goToNextMonth,
  toggleDay,
  getStats,
} = useChallenge();

const stats = computed(() => getStats());
const today = new Date();
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Frossen<br>Februar</h1>
      <p class="subtitle">No-Spend Challenge 2026</p>
    </header>

    <main class="main">
      <div v-if="!hasAnyData" class="onboarding-hint" aria-hidden="true">
        <span class="onboarding-hint__text">Klikk på<br>en dato</span>
        <svg class="onboarding-hint__arrow" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5 C5 60, 5 120, 30 180 Q60 210, 180 195"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M165 185 L180 195 L168 205"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <MonthSelector
        :month="currentMonth"
        :year="currentYear"
        @prev="goToPrevMonth"
        @next="goToNextMonth"
      />

      <CalendarGrid
        :month="currentMonth"
        :year="currentYear"
        :day-states="dayStates"
        :today="today"
        @day-click="toggleDay"
      />

      <Legend />

      <section class="stats-section">
        <h2 class="section-title">Oppsummering</h2>
        <div class="stats">
          <StatsCard :value="stats.success" label="Ingen forbruk" variant="success" />
          <StatsCard :value="stats.warning" label="Nødvendig" variant="warning" />
          <StatsCard :value="stats.fail" label="Unødvendig" variant="fail" />
        </div>
      </section>
    </main>
  </div>
</template>
