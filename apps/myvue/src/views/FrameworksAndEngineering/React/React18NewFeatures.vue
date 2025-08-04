<template>
  <div class="react18-guide">
    <header class="header">
      <div class="logo-container">
        <div class="react-logo">
          <div class="react-logo-inner"></div>
        </div>
        <div class="title-container">
          <h1>React 18 新特性指南</h1>
          <p class="subtitle">下一代 React 框架的核心改进与优化</p>
        </div>
      </div>
      <div class="version-badge">v18.0</div>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <div class="section-title">核心特性</div>
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
            <span v-if="item.badge" class="badge">{{ item.badge }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 并发渲染 -->
        <section v-show="activeSection === 'concurrent'" class="section">
          <div class="section-header">
            <h2>并发渲染 (Concurrent Rendering)</h2>
            <div class="feature-tag new">新特性</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">⚡</div>
              <div>
                <p>React 18 引入了全新的并发渲染器，这是本次更新的基础架构革新。</p>
                <p>并发渲染允许 React 同时准备多个版本的 UI，并根据优先级进行渲染。</p>
              </div>
            </div>

            <div class="feature-details">
              <h3>核心优势</h3>
              <div class="advantages">
                <div class="advantage">
                  <div class="advantage-icon">🚦</div>
                  <div>
                    <h4>可中断渲染</h4>
                    <p>高优先级更新可以中断低优先级渲染</p>
                  </div>
                </div>
                <div class="advantage">
                  <div class="advantage-icon">🔁</div>
                  <div>
                    <h4>并行处理</h4>
                    <p>同时处理多个渲染任务</p>
                  </div>
                </div>
                <div class="advantage">
                  <div class="advantage-icon">⏱️</div>
                  <div>
                    <h4>时间切片</h4>
                    <p>将渲染工作拆分成小块</p>
                  </div>
                </div>
              </div>

              <h3>并发模式 API</h3>
              <div class="code-block">
                <pre><code>// 使用新的根 API 启用并发模式
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(&lt;App /&gt;);</code></pre>
              </div>

              <div class="perf-comparison">
                <div class="perf-item">
                  <div class="perf-label">React 17</div>
                  <div class="perf-bar old" :style="{ width: '100%' }"></div>
                  <div class="perf-desc">同步阻塞渲染</div>
                </div>
                <div class="perf-item">
                  <div class="perf-label">React 18</div>
                  <div class="perf-bar new" :style="{ width: '70%' }"></div>
                  <div class="perf-desc">可中断并发渲染</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 自动批处理 -->
        <section v-show="activeSection === 'batching'" class="section">
          <div class="section-header">
            <h2>自动批处理 (Automatic Batching)</h2>
            <div class="feature-tag improved">优化</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">🔄</div>
              <div>
                <p>React 18 改进了状态更新批处理机制，提供更智能的更新合并。</p>
                <p>现在，所有状态更新（包括异步操作中的更新）都会自动批处理。</p>
              </div>
            </div>

            <div class="feature-details">
              <h3>批处理对比</h3>
              <div class="batching-comparison">
                <div class="comparison-item">
                  <h4>React 17 行为</h4>
                  <div class="code-block">
                    <pre><code>// 在事件处理中：批处理
handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只触发一次渲染
}

// 在异步操作中：不批处理
fetchData().then(() => {
  setCount(c => c + 1); // 第一次渲染
  setFlag(f => !f);     // 第二次渲染
});</code></pre>
                  </div>
                </div>

                <div class="comparison-item">
                  <h4>React 18 行为</h4>
                  <div class="code-block">
                    <pre><code>// 事件处理中：批处理
handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只触发一次渲染
}

// 异步操作中：自动批处理
fetchData().then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只触发一次渲染 ✅
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="tip-box">
                <div class="tip-icon">💡</div>
                <div>
                  <strong>注意：</strong>
                  <p>使用 <code>flushSync</code> 可以强制退出批处理：</p>
                  <div class="code-block">
                    <pre><code>import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
});
setFlag(f => !f); // 两次渲染</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Transition API -->
        <section v-show="activeSection === 'transition'" class="section">
          <div class="section-header">
            <h2>Transition API</h2>
            <div class="feature-tag new">新特性</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">🔄</div>
              <div>
                <p>Transition API 允许你将某些更新标记为非紧急，从而提高用户体验。</p>
                <p>React 会优先处理紧急更新（如输入、点击），延迟非紧急更新（如数据加载）。</p>
              </div>
            </div>

            <div class="feature-details">
              <h3>使用方法</h3>
              <div class="transition-demo">
                <div class="code-example">
                  <div class="code-block">
                    <pre><code>import { useState, useTransition } from 'react';

function SearchPage() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term); // 紧急更新

    startTransition(() => { // 非紧急更新
      fetchResults(term).then(data => {
        setResults(data);
      });
    });
  };

  return (
    &lt;div&gt;
      &lt;input
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
      /&gt;
      {isPending ? &lt;Spinner /&gt; : &lt;Results data={results} /&gt;}
    &lt;/div&gt;
  );
}</code></pre>
                  </div>
                </div>

                <div class="explanation">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>标记非紧急更新</h4>
                      <p>使用 <code>startTransition</code> 包裹非紧急更新</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>跟踪状态</h4>
                      <p><code>isPending</code> 指示是否有待处理的过渡</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>提升用户体验</h4>
                      <p>确保用户交互不被阻塞</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="benefits">
                <h3>核心优势</h3>
                <div class="benefit-list">
                  <div class="benefit-item">
                    <div class="benefit-icon">🚀</div>
                    <div>
                      <h4>响应更迅速</h4>
                      <p>用户交互不会被长时间任务阻塞</p>
                    </div>
                  </div>
                  <div class="benefit-item">
                    <div class="benefit-icon">📉</div>
                    <div>
                      <h4>减少卡顿</h4>
                      <p>避免界面冻结或掉帧</p>
                    </div>
                  </div>
                  <div class="benefit-item">
                    <div class="benefit-icon">🔄</div>
                    <div>
                      <h4>智能优先级</h4>
                      <p>React 自动管理更新优先级</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Suspense 增强 -->
        <section v-show="activeSection === 'suspense'" class="section">
          <div class="section-header">
            <h2>Suspense 增强</h2>
            <div class="feature-tag improved">优化</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">⏳</div>
              <div>
                <p>React 18 对 Suspense 进行了重大改进，使其支持服务器端渲染和更多使用场景。</p>
                <p>现在可以更优雅地处理数据加载、代码分割等异步操作。</p>
              </div>
            </div>

            <div class="feature-details">
              <h3>服务器端 Suspense</h3>
              <div class="suspense-demo">
                <div class="code-block">
                  <pre><code>// 服务器端组件
function App() {
  return (
    &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
      &lt;Layout&gt;
        &lt;NavBar /&gt;
        &lt;Sidebar /&gt;
        &lt;Content&gt;
          &lt;ProfilePage /&gt;
        &lt;/Content&gt;
      &lt;/Layout&gt;
    &lt;/Suspense&gt;
  );
}

// 流式传输到客户端
const { pipe } = renderToPipeableStream(&lt;App /&gt;, {
  onShellReady() {
    response.setHeader('Content-type', 'text/html');
    pipe(response);
  }
});</code></pre>
                </div>

                <div class="explanation">
                  <h4>流式渲染优势</h4>
                  <ul>
                    <li>更快的首屏渲染时间</li>
                    <li>逐步加载内容</li>
                    <li>更好的用户体验</li>
                    <li>更少的内存使用</li>
                  </ul>
                </div>
              </div>

              <div class="new-apis">
                <h3>新的 Suspense API</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name"><code>useDeferredValue</code></div>
                    <div class="api-desc">延迟更新某些值以避免阻塞渲染</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name"><code>&lt;SuspenseList&gt;</code></div>
                    <div class="api-desc">协调多个 Suspense 组件的显示顺序</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name"><code>renderToPipeableStream</code></div>
                    <div class="api-desc">用于 Node.js 环境的流式渲染 API</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name"><code>renderToReadableStream</code></div>
                    <div class="api-desc">用于 Web Streams 环境的流式渲染 API</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 新的 Hooks -->
        <section v-show="activeSection === 'hooks'" class="section">
          <div class="section-header">
            <h2>新的 Hooks API</h2>
            <div class="feature-tag new">新特性</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">🎣</div>
              <div>
                <p>React 18 引入了多个新的 Hook，帮助开发者更好地利用并发特性。</p>
                <p>这些 Hook 提供了更细粒度的控制能力。</p>
              </div>
            </div>

            <div class="feature-details">
              <div class="hooks-grid">
                <div class="hook-card">
                  <div class="hook-header">
                    <div class="hook-icon">🆔</div>
                    <h3>useId</h3>
                  </div>
                  <div class="hook-desc">生成唯一 ID，用于无障碍属性</div>
                  <div class="code-block">
                    <pre><code>function Checkbox() {
  const id = useId();
  return (
    &lt;&gt;
      &lt;label htmlFor={id}&gt;Accept&lt;/label&gt;
      &lt;input id={id} type="checkbox" /&gt;
    &lt;/&gt;
  );
}</code></pre>
                  </div>
                </div>

                <div class="hook-card">
                  <div class="hook-header">
                    <div class="hook-icon">📤</div>
                    <h3>useSyncExternalStore</h3>
                  </div>
                  <div class="hook-desc">订阅外部数据源，推荐库作者使用</div>
                  <div class="code-block">
                    <pre><code>const state = useSyncExternalStore(
  subscribe, // 订阅函数
  getSnapshot // 获取当前快照
);</code></pre>
                  </div>
                </div>

                <div class="hook-card">
                  <div class="hook-header">
                    <div class="hook-icon">📊</div>
                    <h3>useInsertionEffect</h3>
                  </div>
                  <div class="hook-desc">在 DOM 变更前运行，适用于 CSS-in-JS 库</div>
                  <div class="code-block">
                    <pre><code>useInsertionEffect(() => {
  const style = document.createElement('style');
  style.innerHTML = '.css-in-js { color: red }';
  document.head.appendChild(style);
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="hooks-updates">
                <h3>现有 Hook 的行为变化</h3>
                <div class="update-list">
                  <div class="update-item">
                    <div class="hook-name">useState / useReducer</div>
                    <div class="update-desc">在严格模式下会调用两次以检测副作用</div>
                  </div>
                  <div class="update-item">
                    <div class="hook-name">useEffect</div>
                    <div class="update-desc">在布局和绘制后异步执行</div>
                  </div>
                  <div class="update-item">
                    <div class="hook-name">useLayoutEffect</div>
                    <div class="update-desc">在 DOM 变更后同步执行</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 严格模式更新 -->
        <section v-show="activeSection === 'strict-mode'" class="section">
          <div class="section-header">
            <h2>严格模式更新</h2>
            <div class="feature-tag improved">优化</div>
          </div>

          <div class="card">
            <div class="feature-intro">
              <div class="feature-icon">🔍</div>
              <div>
                <p>React 18 增强了严格模式，帮助开发者在开发阶段发现潜在问题。</p>
                <p>这些改进旨在为未来的并发特性做好准备。</p>
              </div>
            </div>

            <div class="feature-details">
              <h3>主要变化</h3>
              <div class="strict-changes">
                <div class="change-item">
                  <div class="change-icon">🔄</div>
                  <div>
                    <h4>组件双调用</h4>
                    <p>在开发模式下，组件会被调用两次以检测副作用</p>
                  </div>
                </div>
                <div class="change-item">
                  <div class="change-icon">🗑️</div>
                  <div>
                    <h4>卸载/重挂载模拟</h4>
                    <p>模拟组件卸载和重挂载的行为</p>
                  </div>
                </div>
              </div>

              <div class="code-block">
                <pre><code>// 启用严格模式
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  &lt;StrictMode&gt;
    &lt;App /&gt;
  &lt;/StrictMode&gt;
);</code></pre>
              </div>

              <div class="tip-box warning">
                <div class="tip-icon">⚠️</div>
                <div>
                  <strong>注意：</strong>
                  <p>这些行为仅发生在开发模式，不影响生产环境。</p>
                  <p>它们帮助确保组件在并发渲染下的稳定性。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">React 18</div>
        <div class="footer-links">
          <a href="#">官方文档</a>
          <a href="#">升级指南</a>
          <a href="#">GitHub</a>
          <a href="#">社区</a>
        </div>
      </div>
      <div class="footer-copyright">
        <p>© 2023 React 18 特性指南 | 本页面使用 Vue3 制作</p>
        <p>React 是 Facebook 的注册商标</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concurrent', title: '并发渲染', badge: '核心' },
  { id: 'batching', title: '自动批处理', badge: '优化' },
  { id: 'transition', title: 'Transition API', badge: '新特性' },
  { id: 'suspense', title: 'Suspense 增强', badge: 'SSR' },
  { id: 'hooks', title: '新的 Hooks', badge: 'API' },
  { id: 'strict-mode', title: '严格模式更新', badge: '开发' }
]);

// 当前活动部分
const activeSection = ref('concurrent');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #61dafb;
@primary-dark: #00a3cc;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@accent-color: #4f46e5;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.react18-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 15%), @primary-color);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    z-index: 1;
  }

  .title-container {
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0.25rem 0 0;
      font-weight: 300;
    }
  }

  .version-badge {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 0.25rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    z-index: 1;
  }
}

// React Logo动画
.react-logo {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid white;
  animation: rotate 15s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.7);
  }

  &::before {
    transform: rotate(60deg);
  }

  &::after {
    transform: rotate(-60deg);
  }

  .react-logo-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.content-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 260px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;

  .section-title {
    color: @text-secondary;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 1.5rem 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    .transition;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: lighten(@primary-color, 43%);
    }

    &.active {
      background-color: lighten(@primary-color, 38%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }

    .badge {
      background: @primary-color;
      color: white;
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 10px;
      font-weight: 500;
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.75rem;
      color: @primary-dark;
      margin: 0;
    }
  }
}

.feature-tag {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;

  &.new {
    background: lighten(@success-color, 45%);
    color: darken(@success-color, 15%);
  }

  &.improved {
    background: lighten(@primary-color, 40%);
    color: darken(@primary-color, 25%);
  }
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow;

  h3 {
    color: @primary-dark;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }

  h4 {
    color: @text-color;
    margin: 1rem 0 0.5rem;
  }

  p {
    color: @text-secondary;
    margin-bottom: 1rem;
  }
}

.feature-intro {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;
  margin-bottom: 1.5rem;

  .feature-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }
}

.feature-details {
  .advantages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;

    .advantage {
      background: lighten(@primary-color, 45%);
      border-radius: 10px;
      padding: 1.25rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      &-icon {
        font-size: 1.75rem;
        margin-top: 0.25rem;
      }
    }
  }
}

.code-block {
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
    font-size: 0.95rem;
  }

  code {
    font-family: 'Fira Code', monospace;
    color: #2f363d;
  }
}

.perf-comparison {
  margin: 2rem 0;

  .perf-item {
    margin-bottom: 1.5rem;
  }

  .perf-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .perf-bar {
    height: 10px;
    border-radius: 5px;

    &.old {
      background: @text-secondary;
    }

    &.new {
      background: @primary-color;
    }
  }

  .perf-desc {
    font-size: 0.9rem;
    color: @text-secondary;
    margin-top: 0.5rem;
  }
}

.batching-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.tip-box {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: lighten(@warning-color, 45%);
  border-left: 4px solid @warning-color;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  margin: 1.5rem 0;

  &.warning {
    background: lighten(@error-color, 40%);
    border-left-color: @error-color;
  }

  .tip-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
}

.transition-demo {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .explanation {
    .step {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      &-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
      }
    }
  }
}

.benefit-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    background: lighten(@success-color, 45%);
    border-radius: 10px;

    .benefit-icon {
      font-size: 1.75rem;
    }
  }
}

.suspense-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .explanation {
    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
        color: @text-secondary;
      }
    }
  }
}

.api-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;

  .api-item {
    background: lighten(@primary-color, 45%);
    border-radius: 8px;
    padding: 1rem;

    .api-name {
      font-family: 'Fira Code', monospace;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .api-desc {
      font-size: 0.9rem;
      color: @text-secondary;
    }
  }
}

.hooks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .hook-card {
    background: lighten(@primary-color, 45%);
    border-radius: 10px;
    padding: 1.5rem;

    .hook-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .hook-icon {
        font-size: 1.75rem;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
        color: @primary-dark;
      }
    }

    .hook-desc {
      color: @text-secondary;
      margin-bottom: 1rem;
    }
  }
}

.hooks-updates {
  margin-top: 2rem;

  .update-list {
    .update-item {
      padding: 1rem;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }

      .hook-name {
        font-family: 'Fira Code', monospace;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .update-desc {
        font-size: 0.9rem;
        color: @text-secondary;
      }
    }
  }
}

.strict-changes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .change-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    background: lighten(@warning-color, 45%);
    border-radius: 10px;

    .change-icon {
      font-size: 1.75rem;
    }
  }
}

.footer {
  background: @card-bg;
  border-top: 1px solid @border-color;
  padding: 3rem 2rem 1.5rem;
  margin-top: 3rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid @border-color;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: @primary-dark;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;

    a {
      color: @text-secondary;
      text-decoration: none;
      .transition;

      &:hover {
        color: @primary-color;
      }
    }
  }

  .footer-copyright {
    max-width: 1200px;
    margin: 1.5rem auto 0;
    text-align: center;
    font-size: 0.9rem;
    color: @text-secondary;

    p {
      margin: 0.25rem 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    .version-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .sidebar {
    width: 100%;
  }
}
</style>
