<template>
  <div class="optimization-card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>

    <div class="scenarios-section">
      <h4 class="scenarios-title">适用场景</h4>
      <ul class="scenarios-list">
        <li v-for="(scenario, index) in scenarios" :key="index">
          {{ scenario }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  scenarios: string[]
}>()
</script>

<style lang="less" scoped>
.optimization-card {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.25rem;
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e0;
  }
}

.card-title {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #2d3748;
  font-weight: 600;
}

.card-description {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.scenarios-title {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.scenarios-list {
  padding-left: 1.25rem;
  margin: 0;

  li {
    color: #4a5568;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 0.25rem;

    &::marker {
      color: #a0aec0;
    }
  }
}
</style>