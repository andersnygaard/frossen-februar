<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
  variant: 'success' | 'warning' | 'fail';
}>();
</script>

<template>
  <div class="stats-card" :class="`stats-card--${variant}`">
    <span class="stats-card__value">{{ value }}</span>
    <span class="stats-card__label">{{ label }}</span>
  </div>
</template>

<style scoped src="./StatsCard.css"></style>
