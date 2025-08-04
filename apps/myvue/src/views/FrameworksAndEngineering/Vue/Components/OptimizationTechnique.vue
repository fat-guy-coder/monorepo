<template>
  <div class="technique-card">
    <div class="card-header">
      <h3 class="technique-title">{{ technique.title }}</h3>
      <span class="technique-category">{{ technique.category }}</span>
    </div>

    <div class="technique-reason">
      <strong>优化原因：</strong> {{ technique.reason }}
    </div>

    <div class="technique-impact">
      <strong>性能影响：</strong> {{ technique.impact }}
    </div>

    <div class="code-block">
      <pre>{{ technique.code }}</pre>
    </div>

    <div class="vue-comparison">
      <strong>Vue2 对比：</strong> {{ technique.vue2Comparison }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  technique: {
    type: Object,
    required: true
  }
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #eaeaea;

.technique-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.technique-title {
  font-size: 1.2rem;
  margin: 0;
  color: darken(@primary-color, 10%);
}

.technique-category {
  background-color: lighten(@primary-color, 40%);
  color: darken(@primary-color, 20%);
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.technique-reason,
.technique-impact,
.vue-comparison {
  font-size: 0.95rem;
  margin-bottom: 12px;
  line-height: 1.5;
}

.code-block {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;
  flex-grow: 1;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.4;
    white-space: pre-wrap;
  }
}
</style>