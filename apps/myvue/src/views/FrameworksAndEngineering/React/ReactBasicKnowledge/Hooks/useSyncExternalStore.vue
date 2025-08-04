<template>
  <div class="use-sync-external-store-guide">
    <header class="header-banner">
      <div class="header-content">
        <h1>React useSyncExternalStore 基本指南</h1>
        <p class="subtitle">无缝集成外部状态管理的专业解决方案</p>
        <div class="key-features">
          <div class="feature">外部存储集成</div>
          <div class="feature">并发模式兼容</div>
          <div class="feature">高效订阅机制</div>
          <div class="feature">SSR 支持</div>
        </div>
      </div>
      <div class="hook-visual">
        <div class="hook-diagram">
          <div class="external-store">外部存储</div>
          <div class="arrow">→</div>
          <div class="hook">useSyncExternalStore</div>
          <div class="arrow">→</div>
          <div class="component">React组件</div>
        </div>
      </div>
    </header>

    <main class="content-container">
      <!-- 简介部分 -->
      <section class="section intro-section">
        <h2 class="section-title">
          <span class="icon">🔌</span>
          useSyncExternalStore 是什么？
        </h2>

        <div class="definition-card">
          <p><strong>useSyncExternalStore</strong> 是 React 18 引入的一个官方 Hook，用于帮助 React 组件安全高效地订阅外部数据源。</p>

          <div class="purpose-grid">
            <div class="purpose-card">
              <div class="icon">🔄</div>
              <h3>解决外部状态问题</h3>
              <p>在 React 之外管理状态（如 Redux、Zustand）</p>
            </div>

            <div class="purpose-card">
              <div class="icon">⚡</div>
              <h3>并发模式兼容</h3>
              <p>确保与 React 18 并发特性兼容</p>
            </div>

            <div class="purpose-card">
              <div class="icon">🧩</div>
              <h3>简化集成</h3>
              <p>提供标准化的外部状态订阅方式</p>
            </div>
          </div>
        </div>

        <div class="basic-syntax">
          <h3>基本语法</h3>
          <pre class="code-block"><code class="language-js">const state = useSyncExternalStore(
  subscribe,   // 订阅函数
  getSnapshot, // 获取快照函数
  getServerSnapshot? // SSR 使用的快照函数（可选）
);</code></pre>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="section core-concepts">
        <h2 class="section-title">
          <span class="icon">🧠</span>
          核心概念解析
        </h2>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">📡</div>
              <h3>订阅函数 (subscribe)</h3>
            </div>
            <p>用于订阅外部存储的变化。当存储发生变化时，应调用提供的回调函数通知 React。</p>
            <pre class="code-example"><code class="language-js">const subscribe = (callback) => {
  // 订阅外部存储
  const unsubscribe = store.subscribe(callback);
  // 返回取消订阅函数
  return unsubscribe;
};</code></pre>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">📸</div>
              <h3>快照函数 (getSnapshot)</h3>
            </div>
            <p>返回存储的当前值（快照）。此函数应始终返回缓存值，除非存储发生变化。</p>
            <pre class="code-example"><code class="language-js">const getSnapshot = () => {
  // 返回当前状态值
  return store.getState();
};</code></pre>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">🌐</div>
              <h3>服务器快照 (getServerSnapshot)</h3>
            </div>
            <p>在服务器端渲染期间返回初始快照值。用于确保服务器和客户端初始渲染一致。</p>
            <pre class="code-example"><code class="language-js">const getServerSnapshot = () => {
  // 返回初始状态值
  return initialState;
};</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用示例 -->
      <section class="section usage-examples">
        <h2 class="section-title">
          <span class="icon">💻</span>
          使用示例
        </h2>

        <div class="tabs">
          <div v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index">
            {{ tab.label }}
          </div>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 0" class="example">
            <h3>基础用法：集成外部计数器</h3>
            <p>创建自定义计数器存储并集成到 React 组件中</p>

            <div class="code-container">
              <div class="code-block">
                <h4>外部存储实现</h4>
                <pre><code class="language-js">// counterStore.js
let count = 0;
let listeners = [];

function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

function getSnapshot() {
  return count;
}

function increment() {
  count++;
  emitChange();
}

function decrement() {
  count--;
  emitChange();
}

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export { subscribe, getSnapshot, increment, decrement };</code></pre>
              </div>

              <div class="code-block">
                <h4>React组件集成</h4>
                <pre><code class="language-jsx">import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, increment, decrement } from './counterStore';

function Counter() {
  const count = useSyncExternalStore(subscribe, getSnapshot);

  return (
    &lt;div&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 1" class="example">
            <h3>高级用法：集成 Redux Store</h3>
            <p>将现有的 Redux Store 集成到 React 组件中</p>

            <div class="code-container">
              <div class="code-block">
                <h4>创建 Redux 集成 Hook</h4>
                <pre><code class="language-js">// useReduxStore.js
import { useSyncExternalStore } from 'react';

export function useReduxStore(store) {
  const state = useSyncExternalStore(
    (callback) => {
      const unsubscribe = store.subscribe(callback);
      return unsubscribe;
    },
    () => store.getState()
  );

  return state;
}</code></pre>
              </div>

              <div class="code-block">
                <h4>在组件中使用</h4>
                <pre><code class="language-jsx">import { useReduxStore } from './useReduxStore';
import store from './reduxStore';

function UserProfile() {
  const state = useReduxStore(store);

  return (
    &lt;div&gt;
      &lt;h2&gt;{state.user.name}&lt;/h2&gt;
      &lt;p&gt;Email: {state.user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 2" class="example">
            <h3>服务端渲染 (SSR) 支持</h3>
            <p>在 Next.js 应用中支持服务器端渲染</p>

            <pre><code class="language-jsx">import { useSyncExternalStore } from 'react';

function ThemeSwitcher() {
  // 获取初始主题（服务器端）
  const getServerSnapshot = () => {
    return typeof window !== 'undefined'
      ? localStorage.getItem('theme') || 'light'
      : 'light';
  };

  const theme = useSyncExternalStore(
    (callback) => {
      // 仅客户端添加事件监听
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', callback);
        return () => window.removeEventListener('storage', callback);
      }
      return () => {};
    },
    () => {
      // 客户端获取当前主题
      return localStorage.getItem('theme') || 'light';
    },
    getServerSnapshot
  );

  return &lt;div&gt;当前主题: {theme}&lt;/div&gt;;
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section use-cases">
        <h2 class="section-title">
          <span class="icon">📌</span>
          适用场景
        </h2>

        <div class="use-case-grid">
          <div class="use-case-card">
            <div class="icon">📦</div>
            <h3>状态管理库集成</h3>
            <p>集成 Redux, Zustand, MobX 等状态管理库</p>
          </div>

          <div class="use-case-card">
            <div class="icon">🔄</div>
            <h3>浏览器 API 同步</h3>
            <p>同步 localStorage、sessionStorage 等浏览器 API</p>
          </div>

          <div class="use-case-card">
            <div class="icon">📡</div>
            <h3>WebSocket 数据流</h3>
            <p>实时数据流（股票行情、聊天消息等）</p>
          </div>

          <div class="use-case-card">
            <div class="icon">🕒</div>
            <h3>时间敏感数据</h3>
            <p>定时更新的数据（时钟、计时器等）</p>
          </div>
        </div>

        <div class="comparison-section">
          <h3>与其他 Hook 对比</h3>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>方法</th>
                  <th>外部存储</th>
                  <th>并发安全</th>
                  <th>SSR支持</th>
                  <th>使用复杂度</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>useSyncExternalStore</td>
                  <td>✅ 优秀</td>
                  <td>✅ 安全</td>
                  <td>✅ 支持</td>
                  <td>中等</td>
                </tr>
                <tr>
                  <td>useState + useEffect</td>
                  <td>⚠️ 有限</td>
                  <td>⚠️ 有风险</td>
                  <td>❌ 不支持</td>
                  <td>简单</td>
                </tr>
                <tr>
                  <td>useContext</td>
                  <td>⚠️ 需包装</td>
                  <td>✅ 安全</td>
                  <td>✅ 支持</td>
                  <td>简单</td>
                </tr>
                <tr>
                  <td>自定义Hook</td>
                  <td>✅ 优秀</td>
                  <td>⚠️ 需手动实现</td>
                  <td>⚠️ 需手动实现</td>
                  <td>复杂</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section best-practices">
        <h2 class="section-title">
          <span class="icon">🏆</span>
          最佳实践
        </h2>

        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>避免在渲染中创建新函数</h3>
              <p>将 subscribe 和 getSnapshot 函数移到组件外部或使用 useCallback 避免重复创建</p>
              <pre
                class="mini-code">const subscribe = useCallback(callback => store.subscribe(callback), [store]);</pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>优化快照函数</h3>
              <p>确保 getSnapshot 是高效操作，避免不必要的计算</p>
              <pre class="mini-code">// 优化前: store.getState().largeData
// 优化后: store.getState().specificValue</pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>处理 SSR 场景</h3>
              <p>总是提供 getServerSnapshot 函数以确保服务器端和客户端渲染一致</p>
              <pre class="mini-code">const getServerSnapshot = () => initialValue;</pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>避免在订阅函数中调用 setState</h3>
              <p>订阅函数应仅用于设置订阅，状态更新由 React 自动处理</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section caveats">
        <h2 class="section-title">
          <span class="icon">⚠️</span>
          注意事项
        </h2>

        <div class="warnings">
          <div class="warning">
            <div class="warning-icon">🚫</div>
            <div class="warning-content">
              <h3>不可变快照</h3>
              <p>getSnapshot 返回的值必须是不可变的，或者每次返回新引用</p>
            </div>
          </div>

          <div class="warning">
            <div class="warning-icon">🔁</div>
            <div class="warning-content">
              <h3>订阅一致性</h3>
              <p>确保订阅函数在存储变化时调用所有监听器</p>
            </div>
          </div>

          <div class="warning">
            <div class="warning-icon">⚙️</div>
            <div class="warning-content">
              <h3>并发模式行为</h3>
              <p>在并发模式下，更新可能会被暂停或中断</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>React useSyncExternalStore 基本指南 · {{ currentYear }}</p>
      <div class="resources">
        <a href="#" class="resource-link">官方文档</a>
        <a href="#" class="resource-link">使用示例</a>
        <a href="#" class="resource-link">高级模式</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tabs = [
  { label: '基础示例' },
  { label: 'Redux 集成' },
  { label: 'SSR 支持' }
];

const activeTab = ref(0);
const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@primary: #4361ee;
@primary-light: rgba(67, 97, 238, 0.1);
@secondary: #7209b7;
@text-primary: #2b2d42;
@text-secondary: #4a5568;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@code-bg: #2b2d42;
@warning: #f72585;
@success: #06d6a0;

.use-sync-external-store-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.header-banner {
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0 40px;
  background: linear-gradient(135deg, #f0f4ff, #e6eeff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);

  .header-content {
    padding: 40px;
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 10px;
      color: @primary;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-secondary;
      margin-bottom: 30px;
    }
  }

  .hook-visual {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 400px;
    background: rgba(255, 255, 255, 0.7);
  }
}

.key-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;

  .feature {
    background: rgba(67, 97, 238, 0.1);
    color: @primary;
    padding: 6px 15px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.hook-diagram {
  display: flex;
  align-items: center;
  gap: 20px;

  .external-store,
  .hook,
  .component {
    font-weight: 600;
    padding: 15px 25px;
    border-radius: 12px;
    text-align: center;
    min-width: 120px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .external-store {
    background: lighten(@primary, 42%);
    border: 2px solid lighten(@primary, 30%);
  }

  .hook {
    background: lighten(@primary, 38%);
    border: 2px dashed lighten(@primary, 25%);
    font-weight: 700;
  }

  .component {
    background: lighten(@primary, 35%);
    border: 3px solid @primary;
  }

  .arrow {
    font-size: 1.5rem;
    color: @primary;
    font-weight: 700;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 1.4rem;
  }
}

.definition-card {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;

    strong {
      color: @primary;
    }
  }
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.purpose-card {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary;
  }

  h3 {
    margin: 0 0 10px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.basic-syntax {
  background: rgba(43, 45, 66, 0.05);
  border-radius: 12px;
  padding: 20px;

  h3 {
    margin-top: 0;
    color: @primary;
  }
}

.code-block {
  font-family: 'Fira Code', monospace;
  background: @code-bg;
  color: #edf2f4;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 15px 0;
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-top: 4px solid @primary;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .concept-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    .concept-icon {
      font-size: 2rem;
      color: @primary;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }
  }

  p {
    color: @text-secondary;
    margin-bottom: 15px;
  }
}

.code-example {
  font-family: 'Fira Code', monospace;
  background: rgba(43, 45, 66, 0.05);
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  overflow-x: auto;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.tab {
  background: rgba(67, 97, 238, 0.1);
  color: @primary;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(67, 97, 238, 0.2);
  }

  &.active {
    background: @primary;
    color: white;
  }
}

.example {
  h3 {
    margin-top: 0;
    color: @primary;
  }

  p {
    color: @text-secondary;
    margin-bottom: 20px;
  }
}

.code-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.use-case-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-top: 3px solid @primary;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary;
  }

  h3 {
    margin: 0 0 10px;
    color: @text-primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.comparison-section {
  margin-top: 40px;

  h3 {
    color: @primary;
    margin-top: 0;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border;
    }

    th {
      background: rgba(67, 97, 238, 0.08);
      font-weight: 600;
      color: @primary;
    }

    tr:hover {
      background: rgba(67, 97, 238, 0.03);
    }

    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5) {
      text-align: center;
    }
  }
}

.practices {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.practice {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .number {
    font-size: 1.8rem;
    font-weight: 700;
    color: @primary;
    min-width: 50px;
    height: 50px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    h3 {
      margin: 0 0 8px;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 10px;
      color: @text-secondary;
    }

    .mini-code {
      font-family: 'Fira Code', monospace;
      background: rgba(43, 45, 66, 0.05);
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 0.85rem;
      overflow-x: auto;
    }
  }
}

.warnings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.warning {
  display: flex;
  gap: 15px;
  background: rgba(247, 37, 133, 0.05);
  border-radius: 12px;
  padding: 20px;
  border-left: 3px solid @warning;

  .warning-icon {
    font-size: 2rem;
    color: @warning;
    min-width: 40px;
  }

  h3 {
    margin: 0 0 5px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid @border;
  color: @text-secondary;

  .resources {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;

    .resource-link {
      color: @primary;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-banner {
    flex-direction: column;

    .header-content {
      padding: 30px 20px;
    }

    .hook-visual {
      min-width: auto;
      padding: 20px;
    }
  }

  .hook-diagram {
    flex-direction: column;
    gap: 15px;

    .arrow {
      transform: rotate(90deg);
    }
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section {
    padding: 25px 20px;
  }

  .purpose-grid,
  .concept-cards,
  .use-case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
