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

<style scoped src="./DayCell.css"></style>
