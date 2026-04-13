<template>
  <div class="virtual-dom-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="hero">
        <div class="logo">
          <div class="v">V</div>
          <div class="dom">DOM</div>
        </div>
        <div class="header-content">
          <h1>虚拟DOM：现代前端框架的核心</h1>
          <p class="subtitle">深度解析虚拟DOM的利弊与性能影响</p>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-value">200X</div>
              <div class="stat-label">操作优化</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">90%</div>
              <div class="stat-label">框架采用率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">60%</div>
              <div class="stat-label">性能提升</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 虚拟DOM介绍 -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">🌐</div>
        <h2>什么是虚拟DOM？</h2>
      </div>
      <div class="section-content">
        <div class="definition-card">
          <div class="definition-text">
            <p>
              <strong>虚拟DOM (Virtual DOM)</strong
              >是真实DOM的轻量级JavaScript对象表示。它是现代前端框架（如React、Vue）的核心机制，通过抽象层优化DOM操作。
            </p>
            <p>
              虚拟DOM的核心思想是：先在内存中构建UI的虚拟表示，与实际DOM比较差异，然后只更新变化的部分。
            </p>
          </div>
          <div class="diagram">
            <div class="diagram-item">
              <div class="diagram-node">应用状态</div>
              <div class="arrow">→</div>
              <div class="diagram-node">虚拟DOM</div>
              <div class="arrow">→</div>
              <div class="diagram-node">真实DOM</div>
            </div>
            <div class="diagram-caption">虚拟DOM在状态和UI之间的桥梁作用</div>
          </div>
        </div>

        <div class="workflow">
          <h3>虚拟DOM工作流程</h3>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>组件渲染</h4>
                <p>根据组件状态生成虚拟DOM树</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>差异对比</h4>
                <p>比较新旧虚拟DOM树的差异（Diffing）</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>批量更新</h4>
                <p>将差异批量更新到真实DOM（Patching）</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 虚拟DOM的优点 -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">✅</div>
        <h2>虚拟DOM的优势</h2>
      </div>
      <div class="section-content">
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon">⚡</div>
            <h3>性能优化</h3>
            <ul>
              <li>最小化昂贵的DOM操作</li>
              <li>批量更新减少布局抖动</li>
              <li>避免不必要的重绘与回流</li>
            </ul>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">💻</div>
            <h3>跨平台能力</h3>
            <ul>
              <li>同一套代码渲染不同平台</li>
              <li>支持Web、移动端、桌面应用</li>
              <li>服务端渲染(SSR)的基础</li>
            </ul>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🛡️</div>
            <h3>开发体验提升</h3>
            <ul>
              <li>声明式UI编程模式</li>
              <li>自动处理DOM更新</li>
              <li>减少手动DOM操作错误</li>
            </ul>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🧩</div>
            <h3>组件化支持</h3>
            <ul>
              <li>简化组件复用</li>
              <li>支持高阶组件模式</li>
              <li>组件状态独立管理</li>
            </ul>
          </div>
        </div>

        <div class="performance-comparison">
          <h3>性能对比：直接DOM操作 vs 虚拟DOM</h3>
          <div class="comparison-chart">
            <div class="chart-bar" style="width: 85%; background-color: #ff6b6b">
              <div class="bar-label">直接DOM操作：85ms</div>
            </div>
            <div class="chart-bar" style="width: 35%; background-color: #4ecdc4; margin-top: 15px">
              <div class="bar-label">虚拟DOM：35ms</div>
            </div>
          </div>
          <p class="chart-caption">典型场景下虚拟DOM操作耗时对比（数据为模拟示例）</p>
        </div>
      </div>
    </section>

    <!-- 虚拟DOM的缺点 -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">⚠️</div>
        <h2>虚拟DOM的局限性</h2>
      </div>
      <div class="section-content">
        <div class="disadvantages-grid">
          <div class="disadvantage-card">
            <div class="disadvantage-icon">⏱️</div>
            <h3>初始渲染开销</h3>
            <p>首次渲染需要额外步骤创建虚拟DOM树，增加了启动时间</p>
          </div>
          <div class="disadvantage-card">
            <div class="disadvantage-icon">🧠</div>
            <h3>内存占用</h3>
            <p>虚拟DOM树占用额外的内存空间，可能影响低端设备性能</p>
          </div>
          <div class="disadvantage-card">
            <div class="disadvantage-icon">🔄</div>
            <h3>Diffing算法开销</h3>
            <p>大型应用的Diffing计算可能成为性能瓶颈</p>
          </div>
        </div>

        <div class="performance-impact">
          <h3>虚拟DOM性能影响因素</h3>
          <div class="impact-table">
            <div class="table-header">
              <div class="header-cell">因素</div>
              <div class="header-cell">影响</div>
              <div class="header-cell">优化建议</div>
            </div>
            <div class="table-row">
              <div class="table-cell">DOM树大小</div>
              <div class="table-cell">树越大，Diffing耗时越长</div>
              <div class="table-cell">组件拆分、虚拟列表</div>
            </div>
            <div class="table-row">
              <div class="table-cell">更新频率</div>
              <div class="table-cell">高频更新增加计算负担</div>
              <div class="table-cell">防抖、批量更新</div>
            </div>
            <div class="table-row">
              <div class="table-cell">组件复杂度</div>
              <div class="table-cell">复杂组件增加渲染时间</div>
              <div class="table-cell">简化组件、PureComponent</div>
            </div>
            <div class="table-row">
              <div class="table-cell">Diffing算法</div>
              <div class="table-cell">算法效率决定性能上限</div>
              <div class="table-cell">使用key属性优化</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能场景分析 -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">📊</div>
        <h2>性能场景分析</h2>
      </div>
      <div class="section-content">
        <div class="scenario-container">
          <div class="scenario-card performance-gain">
            <div class="scenario-header">
              <div class="scenario-icon">📈</div>
              <h3>性能提升场景</h3>
            </div>
            <ul>
              <li>
                <strong>复杂UI更新</strong>
                <p>频繁更改的大型列表或表格</p>
              </li>
              <li>
                <strong>多来源状态更新</strong>
                <p>多个异步操作同时更新UI</p>
              </li>
              <li>
                <strong>动画与交互</strong>
                <p>需要协调多个元素的复杂动画</p>
              </li>
              <li>
                <strong>跨组件更新</strong>
                <p>状态变化影响多个组件的情况</p>
              </li>
            </ul>
          </div>

          <div class="scenario-card performance-loss">
            <div class="scenario-header">
              <div class="scenario-icon">📉</div>
              <h3>性能下降场景</h3>
            </div>
            <ul>
              <li>
                <strong>简单静态页面</strong>
                <p>几乎没有交互的静态内容</p>
              </li>
              <li>
                <strong>高频小更新</strong>
                <p>如鼠标移动事件触发的微更新</p>
              </li>
              <li>
                <strong>超大列表渲染</strong>
                <p>渲染数千项而没有虚拟列表优化</p>
              </li>
              <li>
                <strong>性能敏感操作</strong>
                <p>Canvas/SVG等原生动画场景</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="optimization-example">
          <h3>优化示例：列表渲染</h3>
          <div class="code-comparison">
            <div class="code-block">
              <h4>未优化（性能差）</h4>
              <pre><code>function List({ items }) {
  return (
    &lt;ul&gt;
      {items.map(item => (
        &lt;li key={index}&gt;{item.text}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
              <div class="performance-tag bad">O(n) 每次全量Diff</div>
            </div>
            <div class="code-block">
              <h4>优化后（性能好）</h4>
              <pre><code>function OptimizedList({ items }) {
  return (
    &lt;VirtualList
      itemCount={items.length}
      itemSize={50}
      renderItem={({ index }) => (
        &lt;li key={items[index].id}&gt;
          {items[index].text}
        &lt;/li&gt;
      )}
    /&gt;
  );
}</code></pre>
              <div class="performance-tag good">O(1) 恒定时间Diff</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 框架实现对比 -->
    <section class="section">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>框架实现对比</h2>
      </div>
      <div class="section-content">
        <div class="framework-comparison">
          <div class="framework-card">
            <div class="framework-logo react">⚛️</div>
            <h3>React</h3>
            <ul>
              <li>全量Diff算法（Fiber架构）</li>
              <li>可中断渲染过程</li>
              <li>基于优先级调度更新</li>
            </ul>
          </div>
          <div class="framework-card">
            <div class="framework-logo vue">🖖</div>
            <h3>Vue</h3>
            <ul>
              <li>组件级追踪依赖</li>
              <li>更细粒度的更新控制</li>
              <li>编译时优化提示</li>
            </ul>
          </div>
          <div class="framework-card">
            <div class="framework-logo svelte">✨</div>
            <h3>Svelte</h3>
            <ul>
              <li>编译时优化</li>
              <li>无运行时虚拟DOM</li>
              <li>生成高效命令式代码</li>
            </ul>
          </div>
        </div>

        <div class="trends">
          <h3>虚拟DOM未来发展趋势</h3>
          <div class="trends-grid">
            <div class="trend-card">
              <h4>编译时优化</h4>
              <p>减少运行时Diff开销</p>
            </div>
            <div class="trend-card">
              <h4>细粒度响应式</h4>
              <p>结合Proxy实现精确更新</p>
            </div>
            <div class="trend-card">
              <h4>WebAssembly加速</h4>
              <p>高性能Diff算法实现</p>
            </div>
            <div class="trend-card">
              <h4>混合渲染模式</h4>
              <p>虚拟DOM与命令式混合使用</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 结论 -->
    <section class="conclusion-section">
      <h2>虚拟DOM适用性结论</h2>
      <div class="conclusion-card">
        <div class="conclusion-icon">👍</div>
        <div class="conclusion-content">
          <h3>使用虚拟DOM</h3>
          <p>当构建复杂交互应用、跨平台项目或大型团队协作时</p>
        </div>
      </div>
      <div class="conclusion-card">
        <div class="conclusion-icon">👎</div>
        <div class="conclusion-content">
          <h3>避免虚拟DOM</h3>
          <p>当开发简单静态页面、性能敏感动画或无框架轻量级项目时</p>
        </div>
      </div>
      <div class="final-thought">
        <div class="thought-icon">💡</div>
        <p>
          虚拟DOM是平衡开发效率和运行性能的折中方案，理解其原理和适用场景是构建高性能应用的关键。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const stats = ref({
  optimization: 200,
  adoption: 90,
  performance: 60,
})
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@warning-color: #e74c3c;
@dark-color: #2c3e50;
@light-color: #ecf0f1;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.virtual-dom-container {
  font-family:
    'Segoe UI',
    'SF Pro Display',
    -apple-system,
    system-ui,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: #2c3e50;
  line-height: 1.6;
}

.header-section {
  margin: 30px 0 40px;

  .hero {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-bottom: 30px;

    .logo {
      display: flex;

      .v {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, @primary-color, @accent-color);
        color: white;
        font-size: 48px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        box-shadow: @shadow;
      }

      .dom {
        font-size: 24px;
        font-weight: 700;
        color: @primary-color;
        align-self: flex-end;
        margin-left: 10px;
        transform: translateY(-10px);
      }
    }

    .header-content {
      flex: 1;

      h1 {
        font-size: 36px;
        margin: 0 0 10px;
        color: @dark-color;
        line-height: 1.2;
      }

      .subtitle {
        font-size: 20px;
        color: #7f8c8d;
        margin: 0 0 20px;
      }
    }
  }

  .stats {
    display: flex;
    gap: 20px;

    .stat-item {
      background: @card-bg;
      border-radius: 12px;
      padding: 15px 20px;
      box-shadow: @shadow;
      text-align: center;
      flex: 1;
      transition: @transition;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      }

      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 14px;
        color: #7f8c8d;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: @shadow;

  .section-header {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    background: #f8f9fa;
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 24px;
      margin-right: 15px;
    }

    h2 {
      margin: 0;
      font-size: 24px;
      color: @dark-color;
    }
  }

  .section-content {
    padding: 30px;
  }
}

.definition-card {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;

  .definition-text {
    flex: 1;

    p {
      font-size: 18px;
      margin-top: 0;

      strong {
        color: @primary-color;
      }
    }
  }

  .diagram {
    flex: 1;

    .diagram-item {
      display: flex;
      align-items: center;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
      margin-bottom: 10px;
    }

    .diagram-node {
      background: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      font-weight: 600;
    }

    .arrow {
      margin: 0 15px;
      color: @primary-color;
      font-weight: bold;
    }

    .diagram-caption {
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
      margin-top: 10px;
    }
  }
}

.workflow {
  h3 {
    color: @primary-color;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid @border-color;
  }

  .steps {
    display: flex;
    gap: 20px;

    .step {
      flex: 1;
      position: relative;
      padding-bottom: 30px;

      &::after {
        content: '';
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(to right, @primary-color, @secondary-color);
        z-index: 1;
      }

      &:last-child::after {
        display: none;
      }

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 15px;
        position: relative;
        z-index: 2;
      }

      .step-content {
        h4 {
          margin: 0 0 10px;
          color: @dark-color;
        }

        p {
          margin: 0;
          color: #7f8c8d;
        }
      }
    }
  }
}

.advantages-grid,
.disadvantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.advantage-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid @secondary-color;
  transition: @transition;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .advantage-icon {
    font-size: 32px;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @dark-color;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.4;
    }
  }
}

.disadvantage-card {
  background: #fff8f8;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid @warning-color;
  transition: @transition;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .disadvantage-icon {
    font-size: 32px;
    margin-bottom: 15px;
    color: @warning-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @dark-color;
  }

  p {
    margin: 0;
    color: #7f8c8d;
  }
}

.performance-comparison {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;

  h3 {
    color: @dark-color;
    margin-top: 0;
  }

  .comparison-chart {
    margin: 20px 0;

    .chart-bar {
      height: 40px;
      border-radius: 8px;
      position: relative;

      .bar-label {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-weight: 600;
      }
    }
  }

  .chart-caption {
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
  }
}

.performance-impact {
  .impact-table {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .table-header,
    .table-row {
      display: flex;

      .header-cell,
      .table-cell {
        flex: 1;
        padding: 15px 20px;
      }
    }

    .table-header {
      background: @primary-color;
      color: white;
      font-weight: 600;

      .header-cell {
        &:nth-child(2) {
          flex: 1.5;
        }
      }
    }

    .table-row {
      background: white;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: #f8f9fa;
      }

      .table-cell {
        &:first-child {
          font-weight: 600;
        }

        &:nth-child(2) {
          flex: 1.5;
        }
      }
    }
  }
}

.scenario-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.scenario-card {
  flex: 1;
  border-radius: 12px;
  padding: 25px;

  &.performance-gain {
    background: #f0f9ff;
    border: 1px solid #d1e9ff;
  }

  &.performance-loss {
    background: #fff0f0;
    border: 1px solid #ffd1d1;
  }

  .scenario-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .scenario-icon {
      font-size: 24px;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 20px;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      strong {
        display: block;
        margin-bottom: 5px;
        font-size: 17px;
      }

      p {
        margin: 0;
        color: #7f8c8d;
      }
    }
  }
}

.optimization-example {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;

  h3 {
    color: @dark-color;
    margin-top: 0;
  }

  .code-comparison {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .code-block {
      flex: 1;
      position: relative;

      h4 {
        margin-top: 0;
        font-size: 17px;
        color: #7f8c8d;
      }

      pre {
        background: #2c3e50;
        color: #ecf0f1;
        border-radius: 8px;
        padding: 20px;
        overflow-x: auto;
        font-family: 'Fira Code', monospace;
        font-size: 14px;
        line-height: 1.5;
      }

      .performance-tag {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 12px;
        border-radius: 0 8px 0 8px;
        font-weight: 600;
        font-size: 12px;

        &.good {
          background: @secondary-color;
          color: white;
        }

        &.bad {
          background: @warning-color;
          color: white;
        }
      }
    }
  }
}

.framework-comparison {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  .framework-card {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 25px;
    border: 1px solid @border-color;
    text-align: center;

    .framework-logo {
      font-size: 48px;
      margin-bottom: 15px;

      &.react {
        color: #61dafb;
      }

      &.vue {
        color: #42b983;
      }

      &.svelte {
        color: #ff3e00;
      }
    }

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    ul {
      text-align: left;
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.trends {
  .trends-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .trend-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid @border-color;
      text-align: center;

      h4 {
        margin-top: 0;
        margin-bottom: 10px;
        color: @primary-color;
      }
    }
  }
}

.conclusion-section {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  padding: 30px;
  box-shadow: @shadow;
  margin-top: 40px;
  text-align: center;

  h2 {
    margin-top: 0;
    color: @dark-color;
    font-size: 28px;
    margin-bottom: 30px;
  }

  .conclusion-card {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    .conclusion-icon {
      font-size: 32px;
      margin-right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    &:first-child .conclusion-icon {
      background: #e8f5e9;
      color: @secondary-color;
    }

    &:last-child .conclusion-icon {
      background: #ffebee;
      color: @warning-color;
    }

    .conclusion-content {
      h3 {
        margin: 0 0 10px;
      }

      p {
        margin: 0;
        color: #7f8c8d;
      }
    }
  }

  .final-thought {
    display: flex;
    align-items: center;
    background: #fffde7;
    border-radius: 12px;
    padding: 20px;
    margin-top: 30px;
    text-align: left;

    .thought-icon {
      font-size: 32px;
      margin-right: 20px;
      color: #f9a825;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-style: italic;
      font-size: 18px;
      color: #5d4037;
    }
  }
}

@media (max-width: 768px) {
  .header-section .hero {
    flex-direction: column;
    text-align: center;

    .logo {
      justify-content: center;
    }

    .header-content {
      .stats {
        flex-direction: column;
      }
    }
  }

  .definition-card {
    flex-direction: column;
  }

  .workflow .steps {
    flex-direction: column;

    .step {
      padding-bottom: 50px;

      &::after {
        height: 30px;
        width: 3px;
        top: 40px;
        bottom: 0;
        left: 20px;
        right: auto;
      }
    }
  }

  .scenario-container,
  .code-comparison,
  .framework-comparison {
    flex-direction: column;
  }
}
</style>
