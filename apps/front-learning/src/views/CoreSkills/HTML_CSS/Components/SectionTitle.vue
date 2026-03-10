<template>
  <div class="section-title" :style="{ '--accent-color': color }">
    <div class="decorative-line"></div>
    <h2>{{ title }}</h2>
    <div class="decorative-line"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  color?: string
}>()
</script>

<style lang="less" scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2.5rem 0 1.5rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--accent-color, #2c3e50);
    white-space: nowrap;
  }

  .decorative-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg,
        transparent 0%,
        var(--accent-color, #3498db) 50%,
        transparent 100%);
    opacity: 0.6;
  }
}
</style>