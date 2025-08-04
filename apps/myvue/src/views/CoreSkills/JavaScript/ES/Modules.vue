<template>
  <div class="module-container">
    <!-- 头部标题 -->
    <div class="header-section">
      <div class="title-group">
        <div class="logo-container">
          <div class="module-logo">
            <div class="m">M</div>
          </div>
        </div>
        <div class="text-content">
          <h1>ES6 Modules 深度解析</h1>
          <p class="subtitle">现代 JavaScript 的模块化解决方案</p>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <h3>代码组织</h3>
            <p>按功能模块化组织代码</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔗</div>
          <div class="stat-content">
            <h3>依赖管理</h3>
            <p>明确的导入导出关系</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <h3>静态分析</h3>
            <p>支持编译时优化</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Module介绍 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>什么是 ES Modules？</h2>
      </div>
      <div class="section-content">
        <div class="info-card">
          <p>
            <strong>ES Modules</strong> (简称 ESM) 是 ECMAScript 6 (ES2015)
            引入的官方模块系统，它提供了一种标准化的方式来组织、封装和复用 JavaScript 代码。
          </p>

          <div class="comparison">
            <div class="comparison-item">
              <h4>为什么需要模块化？</h4>
              <ul>
                <li>解决全局命名空间污染问题</li>
                <li>提高代码的可维护性和可读性</li>
                <li>便于依赖管理和代码复用</li>
                <li>支持静态分析和编译优化</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>ESM 核心概念</h4>
              <ul>
                <li><strong>模块作用域</strong> - 每个模块有自己的作用域</li>
                <li><strong>显式导入</strong> - 导入其他模块的功能</li>
                <li><strong>显式导出</strong> - 导出当前模块的功能</li>
                <li><strong>静态结构</strong> - 依赖在编译时确定</li>
              </ul>
            </div>
          </div>

          <div class="evolution-timeline">
            <h3>模块化方案的演进</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-icon">1</div>
                <div class="timeline-content">
                  <h4>IIFE (立即执行函数)</h4>
                  <p>早期解决方案，使用函数作用域隔离代码</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">2</div>
                <div class="timeline-content">
                  <h4>CommonJS</h4>
                  <p>Node.js 的模块系统，同步加载</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">3</div>
                <div class="timeline-content">
                  <h4>AMD (异步模块定义)</h4>
                  <p>RequireJS 实现的浏览器端模块方案</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-icon">4</div>
                <div class="timeline-content">
                  <h4>ES Modules</h4>
                  <p>JavaScript 语言标准模块方案</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 基本使用 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🛠️</div>
        <h2>基本使用</h2>
      </div>
      <div class="section-content">
        <div class="usage-grid">
          <div class="usage-card">
            <h3>导出 (Export)</h3>
            <pre><code>// 命名导出
export const PI = 3.14;
export function calculateArea(r) {
  return PI * r * r;
}

// 默认导出
export default class Circle {
  constructor(r) { this.radius = r; }
  area() { return PI * this.radius ** 2; }
}</code></pre>
          </div>

          <div class="usage-card">
            <h3>导入 (Import)</h3>
            <pre><code>// 导入命名导出
import { PI, calculateArea } from './math.js';

// 导入默认导出
import Circle from './circle.js';

// 混合导入
import Circle, { PI } from './shapes.js';

// 导入所有命名导出
import * as math from './math.js';
console.log(math.PI);</code></pre>
          </div>
        </div>

        <div class="special-cases">
          <h3>特殊用例</h3>
          <div class="case-grid">
            <div class="case-card">
              <h4>重新导出</h4>
              <pre><code>// 重新导出其他模块的命名导出
export { PI, calculateArea } from './math.js';

// 重新导出默认导出
export { default } from './circle.js';</code></pre>
            </div>
            <div class="case-card">
              <h4>动态导入</h4>
              <pre><code>// 动态导入模块（返回Promise）
button.addEventListener('click', async () => {
  const module = await import('./dialog.js');
  module.openDialog();
});</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载与执行 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">⏱️</div>
        <h2>加载方式与执行机制</h2>
      </div>
      <div class="section-content">
        <div class="execution-flow">
          <h3>模块加载流程</h3>
          <div class="flow-diagram">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>解析 (Parsing)</h4>
                <p>识别所有 import 语句，构建依赖图</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>获取 (Fetching)</h4>
                <p>下载所有依赖模块文件</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>实例化 (Instantiation)</h4>
                <p>为模块分配内存空间，连接导入导出</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>求值 (Evaluation)</h4>
                <p>执行模块代码，填充导出值</p>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-table">
          <h3>模块系统对比</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>ES Modules</th>
                <th>CommonJS</th>
                <th>AMD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>加载方式</td>
                <td>异步</td>
                <td>同步</td>
                <td>异步</td>
              </tr>
              <tr>
                <td>静态分析</td>
                <td>支持</td>
                <td>不支持</td>
                <td>部分支持</td>
              </tr>
              <tr>
                <td>浏览器原生支持</td>
                <td>是</td>
                <td>否</td>
                <td>否</td>
              </tr>
              <tr>
                <td>Tree Shaking</td>
                <td>支持</td>
                <td>不支持</td>
                <td>不支持</td>
              </tr>
              <tr>
                <td>循环依赖处理</td>
                <td>支持</td>
                <td>有限支持</td>
                <td>支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 底层原理 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>底层原理</h2>
      </div>
      <div class="section-content">
        <div class="technical-details">
          <div class="detail-card">
            <h3>模块记录 (Module Record)</h3>
            <p>每个模块对应一个模块记录，包含：</p>
            <ul>
              <li>依赖模块列表</li>
              <li>导入绑定映射</li>
              <li>导出绑定映射</li>
              <li>执行状态（未执行、执行中、已完成）</li>
            </ul>
          </div>

          <div class="detail-card">
            <h3>模块环境记录 (Module Environment Record)</h3>
            <p>存储模块范围内的变量绑定，包括：</p>
            <ul>
              <li>顶级变量声明</li>
              <li>函数声明</li>
              <li>类声明</li>
              <li>导入绑定（只读）</li>
            </ul>
          </div>

          <div class="technical-diagram">
            <h3>模块依赖关系图</h3>
            <div class="dependency-graph">
              <div class="module-card">
                <div class="module-name">main.js</div>
                <div class="imports">
                  <span class="import-icon">⬇️</span> import { PI } from 'math.js'
                </div>
              </div>
              <div class="module-card">
                <div class="module-name">math.js</div>
                <div class="exports">export const PI = 3.14</div>
              </div>
              <div class="module-card">
                <div class="module-name">main.js</div>
                <div class="imports">
                  <span class="import-icon">⬇️</span> import Circle from 'circle.js'
                </div>
              </div>
              <div class="module-card">
                <div class="module-name">circle.js</div>
                <div class="imports">
                  <span class="import-icon">⬇️</span> import { PI } from 'math.js'
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Import Attributes -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🔖</div>
        <h2>Import Attributes (导入属性)</h2>
      </div>
      <div class="section-content">
        <div class="attributes-intro">
          <p>Import Attributes 允许为导入语句提供额外信息，主要用于指定模块类型或行为。</p>

          <div class="attributes-examples">
            <div class="example-card">
              <h3>JSON Modules</h3>
              <pre><code>import jsonData from './data.json'
  with { type: 'json' };</code></pre>
              <p>显式指定导入 JSON 文件</p>
            </div>

            <div class="example-card">
              <h3>Web Worker</h3>
              <pre><code>const worker = new Worker(
  './worker.js',
  { type: 'module' }
);</code></pre>
              <p>指定 Worker 使用模块系统</p>
            </div>

            <div class="example-card">
              <h3>CSS Modules</h3>
              <pre><code>import styles from './styles.css'
  with { type: 'css' };</code></pre>
              <p>导入 CSS 模块（实验性功能）</p>
            </div>
          </div>
        </div>

        <div class="import-meta">
          <h3>import.meta 对象</h3>
          <p>每个模块内部都可以访问的特殊对象，包含当前模块的元信息。</p>
          <div class="meta-grid">
            <div class="meta-card">
              <h4>import.meta.url</h4>
              <p>当前模块的完整 URL</p>
              <pre><code>console.log(import.meta.url);
// 输出: "https://example.com/js/module.js"</code></pre>
            </div>
            <div class="meta-card">
              <h4>import.meta.resolve()</h4>
              <p>解析相对于当前模块的路径</p>
              <pre><code>const helperPath = import.meta.resolve('./helper.js');
// "https://example.com/js/helper.js"</code></pre>
            </div>
            <div class="meta-card">
              <h4>自定义属性</h4>
              <p>宿主环境可扩展自定义属性</p>
              <pre><code>// 在构建工具中常见
console.log(import.meta.env); // { MODE: 'development' }</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优势与适用场景 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">📈</div>
        <h2>优势与适用场景</h2>
      </div>
      <div class="section-content">
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">✅</div>
            <h3>主要优势</h3>
            <ul>
              <li><strong>标准化</strong> - ECMAScript 官方标准</li>
              <li><strong>静态分析</strong> - 支持 Tree Shaking 优化</li>
              <li><strong>浏览器原生支持</strong> - 无需额外工具</li>
              <li><strong>异步加载</strong> - 更适合浏览器环境</li>
              <li><strong>更好的循环依赖处理</strong> - 解决传统模块系统问题</li>
            </ul>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h3>性能优化</h3>
            <ul>
              <li>预加载: <code>&lt;link rel="modulepreload"&gt;</code></li>
              <li>依赖共享: 相同模块只加载一次</li>
              <li>编译优化: Scope Hoisting</li>
              <li>按需加载: 动态 import()</li>
            </ul>
          </div>
        </div>

        <div class="use-cases">
          <h3>适用场景</h3>
          <div class="scenario-grid">
            <div class="scenario-card">
              <div class="scenario-icon">🌐</div>
              <h4>Web 应用</h4>
              <p>现代浏览器原生支持的模块系统</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🛠️</div>
              <h4>工具库开发</h4>
              <p>构建可复用组件库</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📱</div>
              <h4>SPA 应用</h4>
              <p>结合路由实现代码分割</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">⚙️</div>
              <h4>Node.js 应用</h4>
              <p>支持现代模块系统</p>
            </div>
          </div>
        </div>

        <div class="modern-workflow">
          <h3>现代开发工作流</h3>
          <div class="workflow-steps">
            <div class="step">
              <div class="step-icon">1</div>
              <div class="step-text">使用 ES Modules 编写代码</div>
            </div>
            <div class="step">
              <div class="step-icon">2</div>
              <div class="step-text">使用 Vite/Rollup 进行构建</div>
            </div>
            <div class="step">
              <div class="step-icon">3</div>
              <div class="step-text">Tree Shaking 移除未使用代码</div>
            </div>
            <div class="step">
              <div class="step-icon">4</div>
              <div class="step-text">按需加载优化性能</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <div class="summary-content">
        <h3>ES Modules 使用总结</h3>
        <div class="summary-points">
          <div class="point">
            <div class="point-icon">📦</div>
            <div class="point-text">使用 import/export 组织代码结构</div>
          </div>
          <div class="point">
            <div class="point-icon">⚡</div>
            <div class="point-text">利用动态导入实现按需加载</div>
          </div>
          <div class="point">
            <div class="point-icon">🔍</div>
            <div class="point-text">了解模块加载机制以优化性能</div>
          </div>
          <div class="point">
            <div class="point-icon">🔖</div>
            <div class="point-text">使用 Import Attributes 增强导入功能</div>
          </div>
        </div>

        <div class="final-tip">
          <div class="tip-icon">💡</div>
          <p>ES Modules 是现代 JavaScript 开发的基石，它改变了我们组织和管理代码的方式。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const moduleFeatures = ref([
  { name: '静态结构', icon: '🧩', description: '依赖关系在编译时确定' },
  { name: '异步加载', icon: '⏱️', description: '适合浏览器环境' },
  { name: '作用域隔离', icon: '🔒', description: '避免全局污染' },
])
</script>

<style lang="less" scoped>
@primary-color: #1976d2;
@secondary-color: #2196f3;
@accent-color: #82b1ff;
@background-light: #f8fafd;
@card-bg: #ffffff;
@text-primary: #1a237e;
@text-secondary: #283593;
@border-color: #e3f2fd;
@success-color: #4caf50;
@info-color: #2196f3;
@shadow-light:
  0 4px 6px rgba(25, 118, 210, 0.1),
  0 2px 4px rgba(25, 118, 210, 0.06);
@code-bg: #f5f9ff;
@timeline-color: #bbdefb;

.module-container {
  font-family:
    'Segoe UI',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.header-section {
  margin: 2rem 0 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .logo-container {
      .module-logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px rgba(25, 118, 210, 0.2);

        .m {
          color: white;
          font-size: 3.5rem;
          font-weight: 800;
          font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
          transform: translateY(-2px);
        }
      }
    }

    .text-content {
      h1 {
        font-size: 2.4rem;
        margin: 0 0 0.5rem;
        color: @text-primary;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.3rem;
        color: @text-secondary;
        margin: 0;
      }
    }
  }

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .stat-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @shadow-light;
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease;
      border-left: 4px solid @accent-color;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(25, 118, 210, 0.15);
      }

      .stat-icon {
        font-size: 2rem;
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        background: fade(@accent-color, 15%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: @primary-color;
      }

      .stat-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.3rem;
        }

        p {
          margin: 0;
          color: @text-secondary;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .header-section .stats-cards {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid @border-color;

  .section-icon {
    font-size: 1.8rem;
    color: @primary-color;
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
  }
}

.section-content {
  .info-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    p {
      margin-top: 0;
      font-size: 1.1rem;

      strong {
        color: @primary-color;
      }
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin: 1.5rem 0;

      .comparison-item {
        background: lighten(@border-color, 5%);
        border-radius: 10px;
        padding: 1.5rem;

        h4 {
          margin-top: 0;
          color: @primary-color;
          border-bottom: 1px solid @border-color;
          padding-bottom: 0.5rem;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 0;

          li {
            margin-bottom: 0.8rem;
          }
        }
      }
    }

    .evolution-timeline {
      margin-top: 2rem;

      h3 {
        color: @primary-color;
        margin-top: 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }

      .timeline {
        position: relative;
        padding-left: 30px;
        margin-top: 1.5rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: @timeline-color;
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-start;

          .timeline-icon {
            position: absolute;
            left: -40px;
            top: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: @primary-color;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 1;
          }

          .timeline-content {
            background: @card-bg;
            border-radius: 10px;
            padding: 1.2rem;
            box-shadow: @shadow-light;
            width: 100%;

            h4 {
              margin-top: 0;
              color: @text-primary;
            }

            p {
              margin-bottom: 0;
              color: @text-secondary;
            }
          }
        }
      }
    }
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .usage-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @shadow-light;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }
}

.special-cases {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @shadow-light;
  border-left: 4px solid @accent-color;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  .case-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    .case-card {
      background: lighten(@border-color, 5%);
      border-radius: 10px;
      padding: 1.2rem;

      h4 {
        margin-top: 0;
        color: @text-primary;
      }
    }
  }
}

.execution-flow {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;
  margin-bottom: 2rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  .flow-diagram {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .flow-step {
      background: fade(@accent-color, 10%);
      border-radius: 10px;
      padding: 1.2rem;
      text-align: center;
      border-top: 3px solid @primary-color;

      .step-number {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: @primary-color;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-weight: bold;
      }

      .step-content {
        h4 {
          margin: 0 0 0.5rem;
          color: @text-primary;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }
}

.comparison-table {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;
  overflow-x: auto;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.8rem 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@accent-color, 15%);
      color: @text-primary;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: fade(@accent-color, 5%);
    }

    td:first-child,
    th:first-child {
      font-weight: 500;
    }
  }
}

.technical-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .detail-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @shadow-light;

    h3 {
      margin-top: 0;
      color: @primary-color;
      border-bottom: 1px solid @border-color;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.7rem;
      }
    }
  }

  .technical-diagram {
    grid-column: 1 / -1;

    h3 {
      color: @primary-color;
    }

    .dependency-graph {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .module-card {
        background: @card-bg;
        border-radius: 10px;
        padding: 1.2rem;
        box-shadow: @shadow-light;
        border-top: 3px solid @primary-color;

        .module-name {
          font-weight: 600;
          color: @text-primary;
          margin-bottom: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid @border-color;
        }

        .imports,
        .exports {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: @text-secondary;

          .import-icon {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}

.attributes-intro {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;
  margin-bottom: 2rem;

  p {
    margin-top: 0;
  }

  .attributes-examples {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;

    .example-card {
      background: lighten(@border-color, 5%);
      border-radius: 10px;
      padding: 1.2rem;

      h3 {
        margin-top: 0;
        color: @text-primary;
        font-size: 1.1rem;
      }

      p {
        margin-bottom: 0;
        font-size: 0.9rem;
      }
    }
  }
}

.import-meta {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: @shadow-light;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  p {
    margin-top: 0;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .meta-card {
      background: lighten(@border-color, 5%);
      border-radius: 10px;
      padding: 1.2rem;

      h4 {
        margin-top: 0;
        color: @primary-color;
      }

      p {
        margin-bottom: 1rem;
        color: @text-secondary;
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  .benefit-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.8rem;
    box-shadow: @shadow-light;

    .benefit-icon {
      font-size: 2rem;
      color: @primary-color;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 1rem;
      color: @primary-color;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.8rem;
      }
    }
  }
}

.use-cases {
  margin-bottom: 2rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .scenario-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @shadow-light;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(25, 118, 210, 0.15);
      }

      .scenario-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h4 {
        margin: 0 0 0.5rem;
        color: @text-primary;
      }

      p {
        margin: 0;
        color: @text-secondary;
        font-size: 0.9rem;
      }
    }
  }
}

.modern-workflow {
  background: lighten(@success-color, 50%);
  border-radius: 12px;
  padding: 1.8rem;
  border: 1px solid fade(@success-color, 20%);

  h3 {
    color: @success-color;
    margin-top: 0;
  }

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .step-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: @success-color;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .step-text {
        font-weight: 500;
        color: @text-primary;
      }
    }
  }
}

pre {
  background: @code-bg;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 1rem 0;

  code {
    color: #1a3c1e;
  }
}

.summary-section {
  margin-top: 3rem;
  background: linear-gradient(to bottom, fade(@accent-color, 5%), transparent);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid @border-color;

  .summary-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    h3 {
      text-align: center;
      margin-top: 0;
      font-size: 1.8rem;
      color: @primary-color;
    }

    .summary-points {
      margin: 1.5rem 0;

      .point {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        align-items: center;

        .point-icon {
          font-size: 1.5rem;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          background: fade(@primary-color, 15%);
          color: @primary-color;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .point-text {
          flex: 1;
        }
      }
    }

    .final-tip {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid @border-color;
      margin-top: 1.5rem;

      .tip-icon {
        font-size: 1.5rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 0;
        font-style: italic;
        font-size: 1.1rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .usage-grid,
  .special-cases .case-grid,
  .flow-diagram,
  .attributes-examples,
  .meta-grid,
  .benefits-grid,
  .scenario-grid,
  .workflow-steps,
  .technical-details {
    grid-template-columns: 1fr;
  }

  .comparison {
    grid-template-columns: 1fr !important;
  }

  .technical-diagram {
    grid-column: 1 / -1;
  }
}
</style>
