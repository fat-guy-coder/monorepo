// DestructuringDocument.vue

<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🎁</span>
          ES6 解构赋值基本指南
        </h1>
        <p class="page-subtitle">优雅的数据提取艺术</p>
      </header>

      <!-- 概述 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🌟</span>
            核心概念
          </h2>
        </div>
        <div class="concept-cards">
          <div class="concept-card">
            <div class="icon">📦</div>
            <h3>数据解包</h3>
            <p>从数组/对象中提取值到变量</p>
          </div>
          <div class="concept-card">
            <div class="icon">⚡</div>
            <h3>语法糖</h3>
            <p>简化数据访问的语法形式</p>
          </div>
          <div class="concept-card">
            <div class="icon">🎯</div>
            <h3>模式匹配</h3>
            <p>左侧定义匹配模式</p>
          </div>
        </div>
      </div>
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💎</span>
            特性
          </h2>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon-box">🔀</div>
            <h3>默认值</h3>
            <pre class="code-example">const { name = 'Anonymous' } = {};</pre>
          </div>
          <div class="feature-card">
            <div class="icon-box">🎭</div>
            <h3>重命名</h3>
            <pre class="code-example">const { name: userName } = user;</pre>
          </div>
          <div class="feature-card">
            <div class="icon-box">🎯</div>
            <h3>嵌套解构</h3>
            <pre class="code-example">const { addr: { city } } = user;</pre>
          </div>
          <div class="feature-card">
            <div class="icon-box">🔄</div>
            <h3>变量交换</h3>
            <pre class="code-example">[a, b] = [b, a];</pre>
          </div>
        </div>
      </div>

      <!-- 数组解构 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">📋</span>
            数组解构
          </h2>
        </div>
        <div class="two-column">
          <div class="code-example">
            <pre class="code-block"><code>// 基础解构
const [a, b] = [1, 2];
console.log(a); // 1

// 跳过元素
const [,,c] = [1, 2, 3];

// 默认值
const [d=5] = [];

// 剩余项
const [head, ...tail] = [1,2,3,4];</code></pre>
          </div>
          <div class="feature-list">
            <h3>💡 特点</h3>
            <ul>
              <li>按索引位置匹配</li>
              <li>支持嵌套解构</li>
              <li>支持默认值</li>
              <li>可与剩余参数配合</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 对象解构 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">📌</span>
            对象解构
          </h2>
        </div>
        <div class="two-column reverse">
          <div class="code-example">
            <pre class="code-block"><code>interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = {
  name: 'Alice',
  age: 25
};

// 基础解构
const { name, age } = user;

// 别名
const { name: userName } = user;

// 默认值
const { email = 'N/A' } = user;

// 嵌套解构
const { addr: { city } } = { addr: { city: 'BJ' } };</code></pre>
          </div>
          <div class="feature-list">
            <h3>💡 特点</h3>
            <ul>
              <li>按属性名匹配</li>
              <li>支持别名</li>
              <li>默认值处理</li>
              <li>深层嵌套支持</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 混合解构 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔀</span>
            混合解构
          </h2>
        </div>
        <div class="code-example wide">
          <pre class="code-block"><code>const config = {
  server: ['127.0.0.1', 8080],
  db: {
    type: 'mysql',
    credentials: {
      user: 'root',
      password: 'secret'
    }
  }
};

const {
  server: [host, port],
  db: {
    type,
    credentials: { user }
  }
} = config;</code></pre>
        </div>
      </div>

      <!-- 函数参数 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🎯</span>
            函数参数解构
          </h2>
        </div>
        <div class="comparison">
          <div class="before">
            <h3>传统写法</h3>
            <pre class="code-block"><code>function showMenu(title, width, height) {
  // ...
}</code></pre>
          </div>
          <div class="arrow">⇒</div>
          <div class="after">
            <h3>解构写法</h3>
            <pre class="code-block"><code>function showMenu({
  title = 'Untitled',
  width: w = 100,
  height: h = 200
}) {
  // 使用 w, h
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="card">
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-md">⚠️ 注意事项</h3>
          <ul class="feature-list">
            <li>解构<span class="hl">null/undefined</span>会报错</li>
            <li>默认值在<span class="hl">undefined</span>时生效</li>
            <li>别名语法容易与类型声明混淆</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/unified-styles.css';
</script>

<style scoped>
/* 组件特定样式 */
.concept-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.concept-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.concept-card:hover {
  background: var(--primary-bg);
}

.concept-card .icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.concept-card h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon-box {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

.two-column.reverse {
  grid-template-columns: 1fr 1fr;
  direction: rtl;
}

.two-column.reverse>* {
  direction: ltr;
}

.feature-list h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.feature-list ul {
  list-style: none;
  padding-left: var(--spacing-lg);
}

.feature-list li {
  position: relative;
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
}

.feature-list li::before {
  content: '✓';
  color: var(--success-color);
  position: absolute;
  left: -1.5rem;
}

.code-example {
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.code-example.wide {
  grid-column: span 2;
}

.code-block {
  color: var(--text-primary);
  font-family: var(--font-mono);
  padding: var(--spacing-lg);
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

.arrow {
  font-size: 2rem;
  color: var(--primary-color);
  padding: 0 var(--spacing-md);
}

.before .code-block,
.after .code-block {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.feature-list {
  list-style: none;
  padding-left: var(--spacing-md);
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

.hl {
  color: var(--error-color);
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {

  .concept-cards,
  .two-column {
    grid-template-columns: 1fr !important;
  }

  .comparison {
    grid-template-columns: 1fr !important;
  }

  .comparison .arrow {
    display: none;
  }
}
</style>
