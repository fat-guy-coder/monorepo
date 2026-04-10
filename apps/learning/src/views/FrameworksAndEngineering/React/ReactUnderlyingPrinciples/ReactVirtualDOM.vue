<template>
  <div class="virtual-dom-container">
    <header class="header">
      <h1>React虚拟DOM基础介绍</h1>
      <div class="subtitle">前端性能优化关键技术解析</div>
    </header>

    <div class="content">
      <section class="section">
        <h2 class="section-title">什么是虚拟DOM？</h2>
        <div class="section-content">
          <div class="concept-card">
            <div class="card-content">
              <p>
                虚拟DOM（Virtual
                DOM）是React的核心概念之一，它是一个轻量级的JavaScript对象，用于描述真实DOM的结构和属性。
              </p>
              <p>
                本质上，虚拟DOM是一个存储在内存中的DOM树状结构表示，包含了元素类型、属性、子节点等信息。
              </p>
              <div class="code-block">
                <pre><code>// 虚拟DOM对象示例
{
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello, Virtual DOM!'
        }
      },
      {
        type: 'p',
        props: {
          children: 'This is a virtual representation'
        }
      }
    ]
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">为什么需要虚拟DOM？</h2>
        <div class="section-content">
          <div class="reason-cards">
            <div class="reason-card">
              <div class="reason-number">1</div>
              <h3>真实DOM操作成本高</h3>
              <p>直接操作DOM会导致浏览器重排（reflow）和重绘（repaint），这些操作非常消耗性能。</p>
              <p>有待商榷:react最后还是要操作真实DOM的</p>
              <p>其实是dom-diff时直接用dom引用比较，耗内存和性能，所以采用虚拟dom</p>
            </div>
            <div class="reason-card">
              <div class="reason-number">2</div>
              <h3>频繁更新导致性能问题</h3>
              <p>在复杂应用中，频繁的DOM更新会导致界面卡顿和响应缓慢。</p>
              <p>有待商榷:react最后还是要操作真实DOM的，而且原生可以利用fragment优化性能</p>
            </div>
            <div class="reason-card">
              <div class="reason-number">3</div>
              <h3>跨平台渲染需求</h3>
              <p>虚拟DOM抽象了渲染目标，使得React可以渲染到Web、移动端(Native)等多种平台。</p>
            </div>
          </div>

          <div class="comparison">
            <div class="comparison-item">
              <h3>直接操作DOM</h3>
              <div class="process">
                <div class="step">状态变化</div>
                <div class="arrow">→</div>
                <div class="step">直接更新DOM</div>
                <div class="arrow">→</div>
                <div class="step">界面更新</div>
              </div>
              <div class="performance-issue">性能问题</div>
            </div>
            <div class="comparison-item">
              <h3>使用虚拟DOM</h3>
              <div class="process">
                <div class="step">状态变化</div>
                <div class="arrow">→</div>
                <div class="step">创建新虚拟DOM</div>
                <div class="arrow">→</div>
                <div class="step diff">Diff算法比较差异</div>
                <div class="arrow">→</div>
                <div class="step">局部更新真实DOM</div>
                <div class="arrow">→</div>
                <div class="step">界面更新</div>
              </div>
              <div class="performance-good">性能优化</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">虚拟DOM的核心作用</h2>
        <div class="section-content">
          <div class="feature-grid">
            <div class="feature-card">
              <h3>性能优化</h3>
              <p>通过Diff算法找出最小变更集，批量更新DOM，减少重排和重绘次数。</p>
            </div>
            <div class="feature-card">
              <h3>声明式编程</h3>
              <p>开发者只需关注UI状态，不必手动操作DOM，提高开发效率。</p>
            </div>
            <div class="feature-card">
              <h3>跨平台能力</h3>
              <p>虚拟DOM抽象了渲染过程，使React可以用于Web、Native、VR等不同平台。</p>
            </div>
            <div class="feature-card">
              <h3>服务端渲染(SSR)</h3>
              <p>虚拟DOM可以在服务端生成，实现首屏快速渲染和SEO优化。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Diff算法工作原理</h2>
        <div class="section-content">
          <div class="algorithm-steps">
            <div class="step-item">
              <div class="step-number">1</div>
              <h3>同级比较</h3>
              <p>React只比较同一层级节点，不跨层级比较</p>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <h3>类型比较</h3>
              <p>节点类型不同时直接替换整个子树</p>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <h3>Key属性优化</h3>
              <p>使用key标识元素，提高列表更新效率</p>
            </div>
          </div>

          <div class="algorithm-visualization">
            <div class="dom-tree">
              <div class="tree-node root">Root</div>
              <div class="tree-children">
                <div class="tree-node">A</div>
                <div class="tree-node">B</div>
                <div class="tree-node">C</div>
              </div>
            </div>

            <div class="diff-arrow">→</div>

            <div class="dom-tree">
              <div class="tree-node root">Root</div>
              <div class="tree-children">
                <div class="tree-node updated">A(更新)</div>
                <div class="tree-node new">D(新增)</div>
                <div class="tree-node">B</div>
                <div class="tree-node">C</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section summary">
        <h2 class="section-title">总结</h2>
        <div class="section-content">
          <ul class="summary-list">
            <li>虚拟DOM是内存中的DOM表示，是React高效渲染的核心机制</li>
            <li>通过Diff算法找出最小变更集，减少直接操作DOM的性能开销</li>
            <li>实现了声明式UI编程范式，提高开发效率</li>
            <li>为React的跨平台能力提供了基础架构</li>
            <li>虽然虚拟DOM本身有内存开销，但在复杂应用中利大于弊</li>
          </ul>

          <div class="quote">
            "虚拟DOM的价值不在于它比直接操作DOM更快，而在于它提供了一种声明式、可组合的UI编程方式，同时保证了在复杂应用中的良好性能。"
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 简单的响应式数据示例
const counter = ref(0)

// 模拟一个方法
const increment = () => {
  counter.value++
}
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #f5f7f9;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

// 基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.virtual-dom-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.section {
  margin-bottom: 3rem;

  &-title {
    font-size: 1.8rem;
    color: @primary-color;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@primary-color, 40%);
  }
}

.concept-card {
  display: flex;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;

  .card-icon {
    flex: 0 0 120px;
    background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 15%));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
  }

  .card-content {
    padding: 1.5rem;
    flex: 1;

    p {
      margin-bottom: 1rem;
    }
  }
}

.reason-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.reason-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:first-child {
    background: @accent-color;
  }

  &:nth-child(2) {
    background: @accent-color;
  }

  &:hover {
    transform: translateY(-5px);
  }

  .reason-number {
    width: 36px;
    height: 36px;
    background: @secondary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: darken(@text-color, 10%);
  }
}

.comparison {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;

  .comparison-item {
    flex: 1;
    min-width: 300px;
  }

  .process {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    .step {
      background: @light-bg;
      padding: 0.8rem 1.2rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;

      &.diff {
        background: lighten(@secondary-color, 40%);
        color: darken(@secondary-color, 20%);
      }
    }

    .arrow {
      margin: 0 0.5rem;
      color: #95a5a6;
    }
  }

  .performance-issue {
    color: @accent-color;
    font-weight: 500;
    text-align: center;
    margin-top: 0.5rem;
  }

  .performance-good {
    color: @secondary-color;
    font-weight: 500;
    text-align: center;
    margin-top: 0.5rem;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;

  .feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    background: lighten(@primary-color, 40%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @primary-color;
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: @text-color;
  }
}

.algorithm-steps {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;

  .step-item {
    flex: 1;
    text-align: center;
    padding: 0 1rem;

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
      margin: 0 auto 1rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: @text-color;
    }
  }
}

.algorithm-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  .dom-tree {
    background: @light-bg;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: @card-shadow;

    .tree-node {
      background: white;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      &.root {
        background: @primary-color;
        color: white;
      }

      &.updated {
        background: lighten(@secondary-color, 35%);
        color: darken(@secondary-color, 25%);
      }

      &.new {
        background: lighten(@accent-color, 35%);
        color: darken(@accent-color, 20%);
      }
    }

    .tree-children {
      padding-left: 2rem;
      margin-top: 0.8rem;
    }
  }

  .diff-arrow {
    margin: 0 2rem;
    font-size: 2rem;
    color: #95a5a6;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 6px;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;

  pre {
    margin: 0;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

.summary {
  .summary-list {
    list-style-type: none;
    margin: 1.5rem 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.8rem;
      background: lighten(@secondary-color, 45%);
      border-left: 4px solid @secondary-color;
      border-radius: 0 4px 4px 0;
    }
  }

  .quote {
    font-style: italic;
    padding: 1.5rem;
    background: @light-bg;
    border-radius: 8px;
    border-left: 4px solid @primary-color;
    margin-top: 1.5rem;
    color: #7f8c8d;
  }
}

@media (max-width: 768px) {
  .virtual-dom-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .concept-card {
    flex-direction: column;

    .card-icon {
      width: 100%;
      height: 100px;
    }
  }

  .algorithm-steps {
    flex-direction: column;
    gap: 1.5rem;
  }

  .algorithm-visualization {
    flex-direction: column;

    .diff-arrow {
      margin: 1.5rem 0;
      transform: rotate(90deg);
    }
  }
}
</style>
