<template>
  <div class="container-query-guide">
    <header class="guide-header">
      <h1>CSS容器查询深度指南</h1>
      <p>基于容器尺寸的响应式设计新时代</p>
    </header>

    <!-- 基本概念 -->
    <section class="concept-section">
      <h2>容器查询 vs 媒体查询</h2>
      <div class="comparison-grid">
        <div class="comparison-card media-query">
          <h3>媒体查询</h3>
          <div class="visual-demo"></div>
          <pre><code>@media (min-width: 600px) {
  /* 基于视口 */
}</code></pre>
        </div>
        <div class="comparison-card container-query">
          <h3>容器查询</h3>
          <div class="visual-demo"></div>
          <pre><code>@container (min-width: 300px) {
  /* 基于容器 */
}</code></pre>
        </div>
      </div>
    </section>

    <!-- 交互式演示 -->
    <section class="demo-section">
      <h2>交互式容器查询演示</h2>
      <div class="demo-container">
        <div class="size-controls">
          <label>
            容器宽度：
            <input type="range" v-model="containerWidth" min="200" max="600" />
            {{ containerWidth }}px
          </label>
        </div>

        <div class="resizable-container" :style="{ width: containerWidth + 'px' }">
          <div class="cq-card">
            <div class="card-content">
              <h3>容器尺寸：{{ containerWidth }}px</h3>
              <div class="card-state">
                {{ containerState }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实际应用示例 -->
    <section class="use-cases">
      <h2>实际应用场景</h2>
      <div class="case-grid">
        <div class="case-card grid-layout">
          <div class="component">
            <div class="item" v-for="n in 4" :key="n"></div>
          </div>
          <div class="case-info">
            <h3>自适应网格布局</h3>
            <pre><code>@container (width > 400px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}</code></pre>
          </div>
        </div>

        <div class="case-card card-design">
          <div class="component">
            <div class="avatar"></div>
            <div class="content">
              <div class="line"></div>
              <div class="line short"></div>
            </div>
          </div>
          <div class="case-info">
            <h3>卡片组件适配</h3>
            <pre><code>@container (width < 300px) {
  .avatar { display: none; }
  .content { padding: 1rem; }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用步骤 -->
    <section class="implementation">
      <h2>实现步骤</h2>
      <ol class="steps">
        <li>
          <h3>定义容器</h3>
          <pre><code>.component-container {
  container-type: inline-size;
  container-name: componentContainer;
}</code></pre>
        </li>
        <li>
          <h3>编写容器查询</h3>
          <pre><code>@container componentContainer (min-width: 400px) {
  .child-element { /* 样式调整 */ }
}</code></pre>
        </li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ContainerQueryGuide',
  setup() {
    const containerWidth = ref(300)

    const containerState = computed(() => {
      if (containerWidth.value < 300) return '紧凑模式'
      if (containerWidth.value < 450) return '常规模式'
      return '宽屏模式'
    })

    return {
      containerWidth,
      containerState,
    }
  },
})
</script>

<style scoped>
.container-query-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  border-radius: 16px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.comparison-card {
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.media-query .visual-demo {
  height: 150px;
  background: linear-gradient(45deg, #ff7f50, #e74c3c);
}

.container-query .visual-demo {
  height: 150px;
  background: linear-gradient(45deg, #42b983, #3498db);
}

.demo-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.resizable-container {
  margin: 2rem auto;
  border: 2px dashed #3498db;
  border-radius: 12px;
  padding: 1rem;
  transition: width 0.3s ease;
}

.cq-card {
  container-type: inline-size;
  container-name: demoContainer;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card-content {
  text-align: center;
  color: #2c3e50;
}

.card-state {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #3498db;
  color: white;
  border-radius: 20px;
}

/* 容器查询样式 */
@container demoContainer (width < 300px) {
  .cq-card {
    background: #ffe4c4;
  }

  .card-state {
    background: #e74c3c;
  }
}

@container demoContainer (width >=450px) {
  .cq-card {
    padding: 3rem;
  }

  .card-content h3 {
    font-size: 1.5rem;
  }
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.grid-layout .component {
  display: grid;
  gap: 1rem;
  container-type: inline-size;
}

.grid-layout .item {
  background: #42b983;
  height: 80px;
  border-radius: 8px;
}

@container (width > 400px) {
  .grid-layout .component {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-design .component {
  display: flex;
  gap: 1rem;
  container-type: inline-size;
}

.card-design .avatar {
  width: 60px;
  height: 60px;
  background: #3498db;
  border-radius: 50%;
}

@container (width < 300px) {
  .card-design .avatar {
    display: none;
  }
}

.steps {
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
}

.steps li {
  counter-increment: step-counter;
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.steps li::before {
  content: counter(step-counter);
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #3498db;
  color: white;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  margin-right: 1rem;
}

input[type='range'] {
  width: 100%;
  margin: 1rem 0;
}

pre {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .container-query-guide {
    padding: 1rem;
  }

  .guide-header {
    padding: 2rem;
  }
}
</style>
