<template>
  <div class="react-components-wrapper">
    <header class="hero-banner">
      <h1>React 内置组件深度解析</h1>
      <p class="subtitle">提升开发效率的核心工具库</p>
      <div class="featured-components">
        <div class="component-tag fragment">Fragment</div>
        <div class="component-tag suspense">Suspense</div>
        <div class="component-tag strict-mode">StrictMode</div>
        <div class="component-tag profiler">Profiler</div>
      </div>
    </header>

    <section class="content-section">
      <h2 class="section-title">
        <span class="icon">📘</span>
        什么是React内置组件？
      </h2>

      <div class="definition-card">
        <div class="definition-content">
          <p><strong>React内置组件</strong>是React库提供的特殊组件类型，用于解决特定场景下的开发需求，提供性能优化、开发调试等额外功能。</p>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🧩</div>
              <h3>无需额外安装</h3>
              <p>直接包含在React核心库中</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>性能优化</h3>
              <p>帮助构建高效应用</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🛠️</div>
              <h3>开发辅助</h3>
              <p>提供调试和错误检测工具</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fragment 组件 -->
    <section class="component-section fragment">
      <div class="component-header">
        <h2 class="component-title">
          <span class="icon">🧩</span>
          Fragment 组件
        </h2>
        <div class="component-tag">JSX 分组</div>
      </div>

      <div class="component-content">
        <div class="description">
          <h3>是什么？</h3>
          <p>允许你在不添加额外DOM节点的情况下对子元素进行分组。</p>

          <h3>为什么需要？</h3>
          <p>React组件必须返回单个根元素，Fragment提供了无需额外DOM节点的解决方案。</p>
        </div>

        <div class="usage-example">
          <div class="code-sample">
            <h4>使用语法</h4>
            <pre><code class="language-jsx">import { Fragment } from 'react';

function Component() {
  return (
    &lt;Fragment&gt;
      &lt;ChildA /&gt;
      &lt;ChildB /&gt;
      &lt;ChildC /&gt;
    &lt;/Fragment&gt;
  );
}

// 简写语法
function Component() {
  return (
    &lt;&gt;
      &lt;ChildA /&gt;
      &lt;ChildB /&gt;
      &lt;ChildC /&gt;
    &lt;/&gt;
  );
}</code></pre>
          </div>

          <div class="use-cases">
            <h4>使用场景</h4>
            <ul>
              <li>返回多个元素无需包裹容器时</li>
              <li>表格组件中返回多个元素</li>
              <li>列表组件中返回多个</li>
              <li>元素</li>
              <li>需要避免不必要的div嵌套时</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Suspense 组件 -->
    <section class="component-section suspense">
      <div class="component-header">
        <h2 class="component-title">
          <span class="icon">⏳</span>
          Suspense 组件
        </h2>
        <div class="component-tag">异步处理</div>
      </div>

      <div class="component-content">
        <div class="description">
          <h3>是什么？</h3>
          <p>允许组件在等待异步操作时展示后备内容（fallback）。</p>

          <h3>为什么需要？</h3>
          <p>简化异步数据加载、代码分割等场景的用户体验处理。</p>
        </div>

        <div class="usage-example">
          <div class="code-sample">
            <h4>使用语法</h4>
            <pre><code class="language-jsx">import { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

function App() {
  return (
    &lt;Suspense fallback={&lt;LoadingSpinner /&gt;}&gt;
      &lt;AsyncComponent /&gt;
    &lt;/Suspense&gt;
  );
}

// 结合React.lazy动态导入
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;OtherComponent /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
          </div>

          <div class="use-cases">
            <h4>使用场景</h4>
            <ul>
              <li>代码分割加载组件时</li>
              <li>数据获取期间展示加载状态</li>
              <li>图片懒加载</li>
              <li>流式渲染（配合React 18）</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- StrictMode 组件 -->
    <section class="component-section strict-mode">
      <div class="component-header">
        <h2 class="component-title">
          <span class="icon">🔍</span>
          StrictMode 组件
        </h2>
        <div class="component-tag">开发调试</div>
      </div>

      <div class="component-content">
        <div class="description">
          <h3>是什么？</h3>
          <p>用于检测应用中的潜在问题以及不安全的生命周期方法的使用。</p>

          <h3>为什么需要？</h3>
          <p>帮助开发者提前发现并修复问题，提高代码质量。</p>
        </div>

        <div class="usage-example">
          <div class="code-sample">
            <h4>使用语法</h4>
            <pre><code class="language-jsx">import { StrictMode } from 'react';

function App() {
  return (
    &lt;StrictMode&gt;
      &lt;MyComponent /&gt;
    &lt;/StrictMode&gt;
  );
}</code></pre>

            <h4>检测内容</h4>
            <ul>
              <li>识别不安全的生命周期方法</li>
              <li>警告遗留的字符串ref API使用</li>
              <li>检测意外的副作用</li>
              <li>检测废弃的findDOMNode方法</li>
              <li>检测过时的上下文API</li>
            </ul>
          </div>

          <div class="use-cases">
            <h4>使用场景</h4>
            <ul>
              <li>开发环境调试应用</li>
              <li>识别潜在的性能问题</li>
              <li>确保代码兼容未来React版本</li>
              <li>检测意外的副作用</li>
            </ul>

            <div class="note warning">
              <h4>⚠️ 注意事项</h4>
              <p>StrictMode可能会导致组件渲染两次（仅开发环境），用于检测副作用问题。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profiler 组件 -->
    <section class="component-section profiler">
      <div class="component-header">
        <h2 class="component-title">
          <span class="icon">📊</span>
          Profiler 组件
        </h2>
        <div class="component-tag">性能分析</div>
      </div>

      <div class="component-content">
        <div class="description">
          <h3>是什么？</h3>
          <p>测量React应用渲染性能，收集渲染时间相关信息。</p>

          <h3>为什么需要？</h3>
          <p>帮助开发者识别应用中的性能瓶颈。</p>
        </div>

        <div class="usage-example">
          <div class="code-sample">
            <h4>使用语法</h4>
            <pre><code class="language-jsx">import { Profiler } from 'react';

function onRenderCallback(
  id, // 发生提交的 Profiler 树的 "id"
  phase, // "mount"（组件挂载）或 "update"（组件更新）
  actualDuration, // 本次更新花费的渲染时间
  baseDuration, // 不使用 memoization 的情况下渲染整颗子树所需时间
  startTime, // React 开始渲染此更新的时间戳
  commitTime, // React 提交此更新的时间戳
  interactions // 本次更新的 interaction 的集合
) {
  // 处理或记录渲染信息
}

function App() {
  return (
    &lt;Profiler id="Navigation" onRender={onRenderCallback}&gt;
      &lt;Navigation /&gt;
    &lt;/Profiler&gt;
  );
}</code></pre>
          </div>

          <div class="use-cases">
            <h4>使用场景</h4>
            <ul>
              <li>识别应用中的性能瓶颈</li>
              <li>测量优化前后的性能差异</li>
              <li>监控生产环境中的性能问题</li>
              <li>分析复杂组件的渲染成本</li>
            </ul>

            <div class="note info">
              <h4>💡 专业提示</h4>
              <p>Profiler会增加轻微的运行时开销，建议仅在需要性能分析时使用。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 其他组件 -->
    <section class="component-section other-components">
      <h2 class="section-title">
        <span class="icon">🧰</span>
        其他内置组件
      </h2>

      <div class="components-grid">
        <div class="mini-card">
          <h3>
            <span class="icon">🚧</span>
            Profiler API
          </h3>
          <p>用于性能分析的API组件方案</p>
        </div>

        <div class="mini-card">
          <h3>
            <span class="icon">🧪</span>
            实验性特性
          </h3>
          <p>Offscreen、Cache等实验性组件</p>
        </div>

        <div class="mini-card">
          <h3>
            <span class="icon">🔄</span>
            Context Provider
          </h3>
          <p>传统Context API的提供者组件</p>
        </div>

        <div class="mini-card">
          <h3>
            <span class="icon">🦺</span>
            Error Boundary
          </h3>
          <p>捕获组件树中JavaScript错误的组件</p>
        </div>
      </div>
    </section>

    <section class="comparison-section">
      <h2 class="section-title">
        <span class="icon">📊</span>
        内置组件使用对比
      </h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>组件</th>
              <th>主要用途</th>
              <th>使用频率</th>
              <th>开发环境</th>
              <th>生产环境</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fragment</td>
              <td>分组元素</td>
              <td>高</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Suspense</td>
              <td>异步处理</td>
              <td>中高</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>StrictMode</td>
              <td>开发调试</td>
              <td>中</td>
              <td>✓</td>
              <td>✗</td>
            </tr>
            <tr>
              <td>Profiler</td>
              <td>性能分析</td>
              <td>低</td>
              <td>✓</td>
              <td>可选</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="best-practices">
      <h2 class="section-title">
        <span class="icon">🏆</span>
        最佳实践
      </h2>

      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">1</div>
          <div class="practice-content">
            <h3>合理使用Fragment</h3>
            <p>避免不必要的DOM嵌套，提高渲染性能</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">2</div>
          <div class="practice-content">
            <h3>开发环境启用StrictMode</h3>
            <p>提前发现潜在问题，提高代码质量</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">3</div>
          <div class="practice-content">
            <h3>异步操作使用Suspense</h3>
            <p>提供更好的用户体验，防止布局抖动</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">4</div>
          <div class="practice-content">
            <h3>Profiler用于性能优化</h3>
            <p>识别瓶颈，针对性优化关键组件</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>React内置组件指南 · 提升开发效率 · {new Date().getFullYear()}</p>
      <div class="footer-links">
        <a href="#">React官方文档</a> ·
        <a href="#">性能优化指南</a> ·
        <a href="#">组件最佳实践</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 不需要实际逻辑，仅用于演示
const activeTab = ref('fragment');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #4361ee;
@fragment-color: #3a0ca3;
@suspense-color: #f72585;
@strict-mode-color: #4cc9f0;
@profiler-color: #2ec4b6;
@text-primary: #2b2d42;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@warning-color: #ff9e00;
@success-color: #06d6a0;

.react-components-wrapper {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.hero-banner {
  text-align: center;
  background: linear-gradient(135deg, lighten(@primary-color, 43%), lighten(@primary-color, 38%));
  border-radius: 16px;
  padding: 40px 30px;
  margin-bottom: 30px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: darken(@primary-color, 15%);
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    margin-bottom: 30px;
  }
}

.featured-components {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.component-tag {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;

  &.fragment {
    background: fade(@fragment-color, 15%);
    color: @fragment-color;
  }

  &.suspense {
    background: fade(@suspense-color, 15%);
    color: @suspense-color;
  }

  &.strict-mode {
    background: fade(@strict-mode-color, 15%);
    color: @strict-mode-color;
  }

  &.profiler {
    background: fade(@profiler-color, 15%);
    color: @profiler-color;
  }
}

.content-section {
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
  padding-bottom: 15px;
  border-bottom: 2px solid fade(@primary-color, 10%);
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    font-size: 1.4rem;
  }
}

.definition-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-left: 4px solid @primary-color;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: fade(@primary-color, 5%);

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }
}

.component-section {
  background: white;
  border-radius: 16px;
  padding: 0;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.component-header {
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid @border-color;

  .component-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 1.4rem;

    .icon {
      font-size: 1.6rem;
    }
  }

  .component-tag {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }
}

.fragment .component-header {
  background: fade(@fragment-color, 8%);

  .component-tag {
    background: fade(@fragment-color, 15%);
    color: @fragment-color;
  }
}

.suspense .component-header {
  background: fade(@suspense-color, 8%);

  .component-tag {
    background: fade(@suspense-color, 15%);
    color: @suspense-color;
  }
}

.strict-mode .component-header {
  background: fade(@strict-mode-color, 8%);

  .component-tag {
    background: fade(@strict-mode-color, 15%);
    color: @strict-mode-color;
  }
}

.profiler .component-header {
  background: fade(@profiler-color, 8%);

  .component-tag {
    background: fade(@profiler-color, 15%);
    color: @profiler-color;
  }
}

.component-content {
  padding: 25px;
}

.description {
  margin-bottom: 25px;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    color: @primary-color;
  }
}

.usage-example {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-sample {

  pre,
  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  pre {
    background: #2b2d42;
    color: #edf2f4;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;

    code {
      background: transparent;
      padding: 0;
    }
  }

  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: @text-primary;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.use-cases {
  h4 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @text-primary;
  }

  ul {
    padding-left: 20px;
    margin: 0 0 20px 0;

    li {
      margin-bottom: 10px;
      padding-left: 5px;
    }
  }
}

.note {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;

  h4 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &.warning {
    background: fade(@warning-color, 8%);
    border-left: 3px solid @warning-color;
  }

  &.info {
    background: fade(@primary-color, 8%);
    border-left: 3px solid @primary-color;
  }
}

.other-components {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.mini-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }
}

.comparison-section {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
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
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 5%);
      font-weight: 600;
      color: @text-primary;
    }

    tr:hover {
      background: fade(@primary-color, 3%);
    }
  }
}

.best-practices {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.practice-card {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  background: fade(@success-color, 8%);
  border-left: 3px solid @success-color;

  .practice-icon {
    font-size: 1.2rem;
    font-weight: bold;
    width: 32px;
    height: 32px;
    background: white;
    color: @success-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 3px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-secondary;
  font-size: 0.9rem;

  .footer-links {
    margin-top: 10px;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 30px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content-section,
  .component-section,
  .other-components,
  .comparison-section,
  .best-practices {
    padding: 20px 15px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .usage-example {
    grid-template-columns: 1fr;
  }
}
</style>
