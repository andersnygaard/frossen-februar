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

<style scoped src="./CalendarGrid.css"></style>
