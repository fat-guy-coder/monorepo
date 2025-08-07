<template>
  <div class="setstate-container">
    <header class="header">
      <div class="header-content">
        <h1>React setState 异步机制解析</h1>
        <p class="subtitle">深入理解React状态更新的异步行为</p>
      </div>
    </header>

    <main class="content">
      <!-- 简介部分 -->
      <section class="section intro-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>为什么setState是异步的？</h2>
        </div>

        <div class="section-content">
          <p class="highlight-box">
            React中的<code>setState</code>方法不会立即更新组件状态，而是将状态更新放入一个队列中，
            在适当的时机批量执行更新，这种设计是React性能优化策略的核心部分。
          </p>

          <div class="analogy">
            <div class="analogy-icon">📦</div>
            <div class="analogy-content">
              <h3>快递包裹的比喻</h3>
              <p>想象setState就像发送快递包裹：</p>
              <ul>
                <li>你发出多个包裹(setState调用)</li>
                <li>快递公司(React)不会每收到一个包裹就立即派送</li>
                <li>而是收集一批包裹，优化路线后批量派送(批量更新)</li>
                <li>最终所有包裹都会送达(状态更新完成)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心原因 -->
      <section class="section reasons-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>异步设计的核心原因</h2>
        </div>

        <div class="reasons-grid">
          <div class="reason-card">
            <div class="reason-icon">⚡</div>
            <h3>性能优化</h3>
            <p>避免不必要的渲染，将多个状态更新合并为一次渲染</p>
            <div class="code-block">
              <pre><code>// 连续调用setState
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
// 实际只执行一次渲染，count增加1</code></pre>
            </div>
          </div>

          <div class="reason-card">
            <div class="reason-icon">🔄</div>
            <h3>一致性保证</h3>
            <p>确保props和state更新的一致性，避免中间状态</p>
            <div class="code-block">
              <pre><code>// 父组件和子组件同时更新
Parent.setState() → Child.setState()
// React保证先完成父组件更新，再更新子组件</code></pre>
            </div>
          </div>

          <div class="reason-card">
            <div class="reason-icon">🧩</div>
            <h3>事务机制</h3>
            <p>使用事务机制包装更新，支持生命周期钩子</p>
            <div class="code-block">
              <pre><code>// 更新过程
setState()
  → 进入事务
  → shouldComponentUpdate()
  → render()
  → 退出事务</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 异步更新机制 -->
      <section class="section mechanism-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>异步更新机制基础介绍</h2>
        </div>

        <div class="mechanism-container">
          <div class="mechanism-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>状态更新请求</h3>
                <p>调用setState()时，更新被放入pending队列</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>批量处理</h3>
                <p>React收集当前事件循环中的所有更新请求</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>事务处理</h3>
                <p>将更新包装在事务中，执行预处理操作</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>合并更新</h3>
                <p>合并多个setState调用，计算最终状态</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>组件更新</h3>
                <p>触发重新渲染，调用生命周期方法</p>
              </div>
            </div>
          </div>

          <div class="lifecycle-chart">
            <div class="lifecycle-title">生命周期与更新流程</div>
            <div class="lifecycle-flow">
              <div class="phase">setState调用</div>
              <div class="arrow">↓</div>
              <div class="phase">shouldComponentUpdate</div>
              <div class="arrow">↓</div>
              <div class="phase">render执行</div>
              <div class="arrow">↓</div>
              <div class="phase">componentDidUpdate</div>
            </div>
            <div class="lifecycle-note">
              注意：在React 16.8+中，函数组件使用useState和useEffect代替
            </div>
          </div>
        </div>
      </section>

      <!-- 获取更新后的状态 -->
      <section class="section access-section">
        <div class="section-header">
          <div class="icon">🔑</div>
          <h2>获取更新后的状态</h2>
        </div>

        <div class="access-methods">
          <div class="method-card">
            <h3>回调函数</h3>
            <p>setState接受第二个参数作为回调函数</p>
            <div class="code-block">
              <pre><code>this.setState(
  { count: this.state.count + 1 },
  () => {
    console.log('Updated count:', this.state.count);
  }
);</code></pre>
            </div>
          </div>

          <div class="method-card">
            <h3>生命周期方法</h3>
            <p>在componentDidUpdate中访问最新状态</p>
            <div class="code-block">
              <pre><code>componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    console.log('Count updated to:', this.state.count);
  }
}</code></pre>
            </div>
          </div>

          <div class="method-card">
            <h3>函数式更新</h3>
            <p>使用函数形式确保基于最新状态更新</p>
            <div class="code-block">
              <pre><code>// 函数式setState
this.setState(prevState => ({
  count: prevState.count + 1
}));</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 同步更新情况 -->
      <section class="section sync-section">
        <div class="section-header">
          <div class="icon">⚠️</div>
          <h2>同步更新的特殊情况</h2>
        </div>

        <div class="sync-content">
          <div class="sync-info">
            <p>在React的某些上下文环境中，setState会表现出同步行为：</p>
            <ul>
              <li><strong>setTimeout/setInterval</strong> 中的setState</li>
              <li><strong>原生DOM事件</strong> 处理函数中的setState</li>
              <li><strong>异步函数</strong> 中的setState（在React 18之前）</li>
            </ul>
            <p class="warning-note">
              注意：React 18中默认所有更新都是异步批处理的，即使是在setTimeout中
            </p>
          </div>

          <div class="sync-example">
            <h3>同步更新示例</h3>
            <div class="code-block">
              <pre><code>// 在setTimeout中，React 17及之前是同步更新
setTimeout(() => {
  this.setState({ count: 100 });
  console.log(this.state.count); // 立即输出100
}, 0);</code></pre>
            </div>
            <div class="react-version">
              <div class="version-badge">React 17-</div>
              <p>同步更新</p>
            </div>
            <div class="react-version">
              <div class="version-badge">React 18+</div>
              <p>默认异步批处理</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践与总结</h2>
        </div>

        <div class="practices-container">
          <div class="practice-list">
            <h3>使用建议</h3>
            <ul>
              <li>始终认为setState是异步的 - 不要依赖立即更新的状态</li>
              <li>使用函数式setState进行连续状态更新</li>
              <li>在componentDidUpdate或useEffect中响应状态变化</li>
              <li>避免在render方法中调用setState</li>
              <li>理解React 18的自动批处理特性</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>核心要点总结</h3>
            <div class="summary-point">
              <div class="point-icon">🚀</div>
              <div class="point-text">异步更新是React性能优化的核心机制</div>
            </div>
            <div class="summary-point">
              <div class="point-icon">🧠</div>
              <div class="point-text">批处理减少不必要的渲染，提高性能</div>
            </div>
            <div class="summary-point">
              <div class="point-icon">🛡️</div>
              <div class="point-text">确保状态一致性，避免UI不一致</div>
            </div>
            <div class="summary-point">
              <div class="point-icon">🔄</div>
              <div class="point-text">React 18+默认所有更新都是异步批处理的</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>React状态管理机制解析 · {{ currentYear }}</p>
      <div class="resources">
        <a href="https://reactjs.org/docs/state-and-lifecycle.html" target="_blank" class="resource-link">React官方文档</a>
        <a href="https://github.com/facebook/react" target="_blank" class="resource-link">React源码</a>
        <a href="https://overreacted.io/react-as-a-ui-runtime/" target="_blank" class="resource-link">Dan Abramov文章</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>


@primary: #61dafb;
@secondary: #282c34;
@text-primary: #2d3748;
@text-secondary: #4a5568;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@success: #48bb78;
@warning: #ecc94b;
@error: #e53e3e;
@info: #4299e1;

.setstate-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.header {
  text-align: center;
  margin: 30px 0 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #e6f7ff, #d1f0ff);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(97, 218, 251, 0.15);

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    color: @secondary;
    line-height: 1.2;

    &:before {
      content: "⚛";
      margin-right: 12px;
      color: @primary;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    max-width: 700px;
    margin: 0 auto 20px;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;

  &-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      margin: 0;
    }

    .icon {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: fade(@primary, 15%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: darken(@primary, 20%);
    }
  }
}

.intro-section {
  .highlight-box {
    background: fade(@primary, 10%);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid @primary;
    font-size: 1.1rem;
    line-height: 1.7;

    code {
      font-family: 'JetBrains Mono', monospace;
      background: fade(@primary, 15%);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.95rem;
      color: darken(@primary, 30%);
    }
  }

  .analogy {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    padding: 20px;
    background: fade(@success, 8%);
    border-radius: 12px;
    border-left: 4px solid @success;

    &-icon {
      font-size: 2.5rem;
    }

    &-content {
      flex: 1;

      h3 {
        margin-top: 0;
        color: darken(@success, 20%);
      }

      ul {
        padding-left: 25px;

        li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 25px;

          &:before {
            content: "•";
            color: @success;
            position: absolute;
            left: 10px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.reasons-section {
  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .reason-card {
    background: fade(@info, 8%);
    border-radius: 12px;
    padding: 25px;
    border-top: 4px solid @info;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    &-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: darken(@info, 20%);
    }

    p {
      margin-top: 0;
      margin-bottom: 20px;
      color: @text-secondary;
    }
  }
}

.mechanism-section {
  .mechanism-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .mechanism-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 25px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: fade(@primary, 30%);
      z-index: 1;
    }
  }

  .step {
    display: flex;
    gap: 20px;
    position: relative;
    z-index: 2;

    &-number {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: @primary;
      color: white;
      font-weight: 700;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    &-content {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      flex: 1;

      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: @secondary;
      }
    }
  }

  .lifecycle-chart {
    background: fade(@warning, 8%);
    border-radius: 12px;
    padding: 25px;
    border-top: 4px solid @warning;

    .lifecycle-title {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: darken(@warning, 25%);
      text-align: center;
    }

    .lifecycle-flow {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .phase {
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      font-weight: 500;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      width: 100%;
      text-align: center;
    }

    .arrow {
      font-size: 1.5rem;
      color: @warning;
    }

    .lifecycle-note {
      font-size: 0.9rem;
      font-style: italic;
      color: @text-secondary;
      text-align: center;
      margin-top: 15px;
    }
  }
}

.access-section {
  .access-methods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .method-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      background: fade(@success, 15%);
      margin: 0;
      padding: 15px 20px;
      color: darken(@success, 20%);
    }

    p {
      padding: 15px 20px 0;
      margin: 0;
      color: @text-secondary;
    }
  }
}

.sync-section {
  .sync-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .sync-info {
    p {
      margin-top: 0;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          color: @error;
          position: absolute;
          left: 10px;
          font-weight: bold;
        }
      }
    }

    .warning-note {
      background: fade(@error, 8%);
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid @error;
      font-weight: 500;
    }
  }

  .sync-example {
    .react-version {
      display: inline-block;
      margin-right: 15px;
      margin-top: 15px;

      .version-badge {
        background: @secondary;
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
        display: inline-block;
      }

      p {
        margin: 5px 0 0;
        text-align: center;
      }
    }
  }
}

.best-practices {
  .practices-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .practice-list {
    background: fade(@success, 8%);
    border-radius: 12px;
    padding: 25px;
    border-top: 4px solid @success;

    h3 {
      margin-top: 0;
      color: darken(@success, 20%);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 15px;
        position: relative;
        padding-left: 35px;

        &:before {
          content: "✓";
          position: absolute;
          left: 10px;
          width: 24px;
          height: 24px;
          background: @success;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
      }
    }
  }

  .summary-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border-top: 4px solid @primary;

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: darken(@primary, 20%);
    }
  }

  .summary-point {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    align-items: flex-start;

    .point-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .point-text {
      font-weight: 500;
    }
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
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;

    .resource-link {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// 通用代码块样式
.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #f8f8f2;

    code {
      font-family: inherit;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 1.8rem;
    }
  }

  .section {
    padding: 25px 20px;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }
}
</style>
