<template>
  <div class="main-container">
    <h1 class="main-title">Top-level await 基本指南</h1>

    <section class="introduction">
      <h2>什么是 Top-level await?</h2>
      <p>Top-level await 允许在模块的顶层直接使用 await，而无需将其放入 async 函数中。这使得异步代码的书写更加简洁和直观，特别是在处理模块依赖时。</p>
    </section>

    <div class="demo-section">
      <div class="control-group">
        <button class="demo-button" :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'">
          基础用法
        </button>
        <button class="demo-button" :class="{ active: activeTab === 'dynamic' }" @click="activeTab = 'dynamic'">
          动态导入
        </button>
        <button class="demo-button" :class="{ active: activeTab === 'multiple' }" @click="activeTab = 'multiple'">
          多模块协调
        </button>
      </div>

      <div class="code-preview">
        <pre v-if="activeTab === 'basic'"><code>// 模块顶层直接使用
const data = await fetchData();
export default data;</code></pre>

        <pre v-if="activeTab === 'dynamic'"><code>// 动态导入模块
const { default: utils } = await import('./utils.js');
export const result = await utils.process();</code></pre>

        <pre v-if="activeTab === 'multiple'"><code>// 多模块协同
const [user, product] = await Promise.all([
  fetch('/api/user'),
  fetch('/api/product')
]);</code></pre>
      </div>

      <div class="live-demo">
        <div v-if="loading" class="loader">⏳ 数据加载中...</div>
        <div v-else class="data-display">
          <h3>最新用户数据</h3>
          <pre>{{ demoData }}</pre>
        </div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-card feature">
        <h2>核心特性 🚀</h2>
        <ul>
          <li>模块顶层直接使用await</li>
          <li>简化异步依赖管理</li>
          <li>自动处理依赖关系</li>
          <li>支持动态模块导入</li>
        </ul>
      </div>

      <div class="info-card usage">
        <h2>使用场景 💡</h2>
        <ul>
          <li>配置初始化加载</li>
          <li>动态功能模块导入</li>
          <li>多接口并行请求</li>
          <li>环境检测与适配</li>
          <li>第三方SDK异步加载</li>
        </ul>
      </div>

      <div class="info-card notice">
        <h2>注意事项 ⚠️</h2>
        <ul>
          <li>仅支持ES Modules</li>
          <li>影响模块加载时序</li>
          <li>注意浏览器兼容性</li>
          <li>避免循环依赖</li>
          <li>谨慎处理错误边界</li>
        </ul>
      </div>

      <div class="info-card example">
        <h2>典型示例 📝</h2>
        <pre><code>// 配置初始化
const config = await initConfig();

// 动态加载polyfill
if (!window.Intl) {
  await import('intl-polyfill');
}

export default config;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref<'basic' | 'dynamic' | 'multiple'>('basic')
const loading = ref(true)
const demoData = ref<object | null>(null)

// 模拟顶层await效果
const fetchDemoData = async () => {
  loading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    demoData.value = {
      user: 'John Doe',
      age: 28,
      lastLogin: new Date().toISOString()
    }
  } finally {
    loading.value = false
  }
}

// 初始化加载数据
onMounted(fetchDemoData)
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.main-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.4em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.control-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.demo-button {
  padding: 12px 24px;
  border: 2px solid #3498db;
  border-radius: 8px;
  background: white;
  color: #3498db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-button:hover {
  background: #3498db20;
}

.demo-button.active {
  background: #3498db;
  color: white;
}

.code-preview {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.code-preview pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
}

.code-preview code {
  color: #2c3e50;
  font-size: 0.95em;
}

.live-demo {
  border: 2px dashed #eee;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  min-height: 200px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 1.2em;
}

.data-display {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-display pre {
  white-space: pre-wrap;
  color: #444;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.info-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-card h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.3em;
}

.info-card ul {
  padding-left: 1.2rem;
  line-height: 1.6;
  color: #444;
}

.feature {
  border-left: 4px solid #3498db;
}

.usage {
  border-left: 4px solid #2ecc71;
}

.notice {
  border-left: 4px solid #e74c3c;
}

.example {
  border-left: 4px solid #9b59b6;
}

@media (max-width: 768px) {
  .control-group {
    flex-direction: column;
  }

  .demo-button {
    width: 100%;
  }
}
</style>
