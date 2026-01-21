<script setup lang="ts">
import { computed } from 'vue';

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

<style scoped src="./MonthSelector.css"></style>
