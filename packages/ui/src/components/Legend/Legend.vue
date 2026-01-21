<script setup lang="ts">
const items = [
  { state: 'success', label: 'Ingen forbruk' },
  { state: 'warning', label: 'Nødvendig' },
  { state: 'fail', label: 'Unødvendig' },
];
</script>

<template>
  <section class="legend">
    <h2 class="legend__title">Forklaring</h2>
    <div class="legend__box">
      <div v-for="item in items" :key="item.state" class="legend__item">
        <span class="legend__color" :class="`legend__color--${item.state}`" />
        <span class="legend__label">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped src="./Legend.css"></style>
