<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🔐</span>
          ES6 声明指南：let 与 const
        </h1>
        <p class="page-subtitle">优雅的数据提取艺术</p>
      </header>

      <!-- 导航区 -->
      <nav class="guide-nav">
        <div class="nav-links">
          <a v-for="section in sections" :key="section.id" :href="`#${section.id}`"
            @click.prevent="scrollTo(section.id)" class="nav-link">
            {{ section.title }}
          </a>
        </div>
      </nav>

      <!-- 核心概念 -->
      <div class="card mb-xl" id="concept">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💡</span>
            核心概念
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="concept-card let-card">
              <div class="card-header">
                <span class="card-icon">🔁</span>
                <h3>let 声明</h3>
              </div>
              <ul class="feature-list">
                <li>块级作用域</li>
                <li>可重新赋值</li>
                <li>不可重复声明</li>
              </ul>
            </div>

            <div class="concept-card const-card">
              <div class="card-header">
                <span class="card-icon">🔒</span>
                <h3>const 声明</h3>
              </div>
              <ul class="feature-list">
                <li>块级作用域</li>
                <li>不可重新赋值</li>
                <li>必须初始化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 暂存死区 -->
      <div class="card mb-xl" id="temporal-dead-zone">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⏳</span>
            暂存死区
          </h2>
        </div>
        <div class="card-body">
          <p class="text-secondary mb-md">
            暂存死区是指在块级作用域内，使用let和const声明的变量在声明之前是不可访问的。这意味着在变量声明之前访问它们会导致ReferenceError。
          </p>
          <div class="code-block">
            <pre><code>function demoTDZ() {
  console.log(a); // 报错: Cannot access 'a' before initialization
  let a = 10;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 对比表格 -->
      <div class="card mb-xl" id="compare">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚖️</span>
            特性对比
          </h2>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>var</th>
                  <th>let</th>
                  <th>const</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in comparisonData" :key="row.label">
                  <td>{{ row.label }}</td>
                  <td :class="{ yes: row.var }">{{ row.var ? '✔️' : '❌' }}</td>
                  <td :class="{ yes: row.let }">{{ row.let ? '✔️' : '❌' }}</td>
                  <td :class="{ yes: row.const }">{{ row.const ? '✔️' : '❌' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 使用示例 -->
      <div class="card mb-xl" id="usage">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🛠️</span>
            使用示例
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">块级作用域</h3>
              <div class="code-block">
                <pre><code>function demoScope() {
  if (true) {
    let blockVar = '内部';
    const BLOCK_CONST = 100;
  }
  console.log(blockVar); // 报错
  console.log(BLOCK_CONST); // 报错
}</code></pre>
              </div>
            </div>
            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">循环中的使用</h3>
              <div class="code-block">
                <pre><code>// let 在循环中的正确用法
for (let i = 0; i &lt; 5; i++) {
  setTimeout(() =&gt; console.log(i), 100); // 0,1,2,3,4
}

// const 在for-of循环
const arr = [1,2,3];
for (const num of arr) {
  console.log(num);
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/css/unified-styles.css';

const sections = ref([
  { id: 'concept', title: '核心概念' },
  { id: 'compare', title: '特性对比' },
  { id: 'usage', title: '使用示例' },
]);

const comparisonData = ref([
  { label: '作用域提升', var: true, let: false, const: false },
  { label: '块级作用域', var: false, let: true, const: true },
  { label: '重复声明', var: true, let: false, const: false },
  { label: '暂时性死区', var: false, let: true, const: true }
]);

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped>
/* 组件特定样式 */
.guide-nav {
  background: linear-gradient(135deg, #2c3e50, #2980b9);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.concept-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
  transition: transform 0.2s ease;
}

.concept-card:hover {
  transform: translateY(-2px);
}

.concept-card.let-card {
  border-top: 4px solid var(--primary-color);
}

.concept-card.const-card {
  border-top: 4px solid var(--success-color);
}

.concept-card .card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.concept-card .card-icon {
  font-size: 1.5rem;
}

.concept-card h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--text-lg);
  font-weight: 600;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

.example-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.yes {
  color: var(--success-color);
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
