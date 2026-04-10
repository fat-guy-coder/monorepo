<!-- ToolCard.vue -->
<template>
  <a :href="tool.url" target="_blank" rel="noopener" class="tool-card">
    <div class="card-header">
      <h3>{{ tool.name }}</h3>
      <span class="category">{{ tool.category }}</span>
    </div>
    <p class="desc">{{ tool.desc }}</p>
    <ul class="features">
      <li v-for="(feature, index) in tool.features" :key="index">✅ {{ feature }}</li>
    </ul>
  </a>
</template>

<script setup lang="ts">
import type { Tool } from '../CSS/CSSTools.vue'

defineProps<{
  tool: Tool
}>()
</script>

<style lang="less">
.tool-card {
  display: block;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      color: #3498db;
      font-size: 1.2rem;
    }

    .category {
      background: #f8f9fa;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      text-transform: capitalize;
    }
  }

  .desc {
    color: #7f8c8d;
    margin-bottom: 1rem;
    min-height: 3em;
  }

  .features {
    list-style: none;
    padding-left: 0;
    margin: 0;
    font-size: 0.9rem;

    li {
      padding: 0.3rem 0;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 6px;
        height: 6px;
        background: #3498db;
        border-radius: 50%;
      }
    }
  }
}
</style>
