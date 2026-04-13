<template>
  <div class="tech-card">
    <div class="tech-header">
      <h3>{{ title }}</h3>
      <div class="tech-tags">
        <span v-for="tag in tags" :key="tag.title" class="tech-tag">{{ tag }}</span>
      </div>
    </div>
    <div class="hot">热度：{{ hot }}</div>
    <div class="needLearn">需要学习：{{ needLearn }}</div>
    <div class="tech-content">
      <p>{{ desc }}</p>
      <div class="tech-scene">
        <strong>使用场景：</strong> {{ scene }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  title: String,
  tags: Array,
  desc: String,
  scene: String,
  hot: String,
  needLearn: String
});

</script>

<style scoped>
.tech-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border-color: #c7d2fe;
  }

  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0;
      color: #1e293b;
    }
  }

  .tech-tags {
    display: flex;
    gap: 6px;
  }

  .tech-tag {
    background: #eef2ff;
    color: #4f46e5;
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: 20px;
    font-weight: 500;
  }

  .tech-content {
    p {
      font-size: 0.95rem;
      color: #475569;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .tech-scene {
      font-size: 0.9rem;
      background: #f8fafc;
      padding: 10px;
      border-radius: 6px;
      border-left: 3px solid #c7d2fe;
      color: #475569;

      strong {
        color: #4f46e5;
      }
    }
  }
}
</style>
