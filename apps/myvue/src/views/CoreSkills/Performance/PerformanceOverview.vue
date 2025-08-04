<template>
  <div class="performance-guide">
    <header class="guide-header">
      <h1 class="title">前端性能优化全景图</h1>
      <p class="subtitle">构建快速、流畅、高效的现代Web应用</p>
    </header>

    <div class="category-container">
      <!-- 资源加载优化 -->
      <section class="optimization-category">
        <h2 class="category-title">📦 资源加载优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.resourceOptimizations" :key="item.name"
            :title="item.name" :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>

      <!-- 渲染性能优化 -->
      <section class="optimization-category">
        <h2 class="category-title">🎨 渲染性能优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.renderingOptimizations" :key="item.name"
            :title="item.name" :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>

      <!-- JS执行优化 -->
      <section class="optimization-category">
        <h2 class="category-title">⚡ JavaScript优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.jsOptimizations" :key="item.name" :title="item.name"
            :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>

      <!-- 网络传输优化 -->
      <section class="optimization-category">
        <h2 class="category-title">🌐 网络传输优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.networkOptimizations" :key="item.name"
            :title="item.name" :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>

      <!-- 用户体验优化 -->
      <section class="optimization-category">
        <h2 class="category-title">😊 用户体验优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.uxOptimizations" :key="item.name" :title="item.name"
            :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>

      <!-- 构建工具优化 -->
      <section class="optimization-category">
        <h2 class="category-title">🛠️ 构建工具优化</h2>
        <div class="optimization-grid">
          <OptimizationCard v-for="item in OptimizationsMethods.buildOptimizations" :key="item.name" :title="item.name"
            :description="item.description" :scenarios="item.scenarios" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OptimizationCard from './Components/OptimizationCard.vue'

interface OptimizationItem {
  name: string
  description: string
  scenarios: string[]
}

interface OptimizationData {
  [key: string]: OptimizationItem[]
}

const OptimizationsMethods = ref<OptimizationData>({})

onMounted(async () => {
  const { default: data } = await import('./JSON/OptimizationsMethods.json')
  OptimizationsMethods.value = data
})
</script>

<style lang="less" scoped>
.performance-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
    font-weight: 800;
    background: linear-gradient(90deg, #6b46c1, #3182ce);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    font-weight: 400;
  }
}

.category-container {
  display: grid;
  gap: 3rem;
}

.optimization-category {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #edf2f7;
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>