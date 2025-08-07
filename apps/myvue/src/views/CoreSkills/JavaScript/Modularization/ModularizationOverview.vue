<template>
  <div class="modular-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🧩 JavaScript 模块化基本指南</h1>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 发展历程 -->
      <section class="section history">
        <h2 class="section-title">⏳ 模块化演进史</h2>
        <div class="timeline">
          <div class="era">
            <div class="era-icon">🥚</div>
            <h3>IIFE 时代 (2009)</h3>
            <pre class="code-block"><code>(function() {
  // 模块代码
})();</code></pre>
            <p class="era-desc">立即执行函数实现作用域隔离</p>
          </div>

          <div class="era">
            <div class="era-icon">🦄</div>
            <h3>CommonJS (2009)</h3>
            <pre class="code-block"><code>// 导出
module.exports = { ... }

// 导入
const mod = require('./module');</code></pre>
            <p class="era-desc">Node.js 的模块化标准</p>
          </div>

          <div class="era">
            <div class="era-icon">🚀</div>
            <h3>ES Modules (2015)</h3>
            <pre class="code-block"><code>// 导出
export const name = 'value';

// 导入
import { name } from './module';</code></pre>
            <p class="era-desc">浏览器原生模块化方案</p>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="section concepts">
        <h2 class="section-title">🧠 核心概念</h2>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h3>模块作用域</h3>
            <p>每个模块拥有独立作用域，避免全局污染</p>
            <pre class="code-block"><code>// module.js
let count = 0; // 模块私有变量</code></pre>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔗</div>
            <h3>依赖管理</h3>
            <p>显式声明依赖关系，自动解析依赖树</p>
            <pre class="code-block"><code>import { helper } from './utils';
export function main() {
  helper();
}</code></pre>
          </div>
        </div>
      </section>

      <!-- AMD 基础介绍 -->
      <section class="section amd-details">
        <h2 class="section-title">📚 AMD (Asynchronous Module Definition)</h2>
        <div class="amd-content">
          <div class="amd-intro">
            <h3>历史背景</h3>
            <p>AMD 规范诞生于2009年,由 RequireJS 的作者 James Burke 提出。它的出现是为了解决浏览器端 JavaScript 模块化的需求,特别是异步加载的问题。</p>
          </div>

          <div class="box">
            <h3>基本用法</h3>
            <pre class="code-block"><code>// 定义模块
define(['jquery'], function($) {
    return {
        init: function() {
            $('body').text('Hello AMD!');
        }
    };
});

// 加载模块
require(['myModule'], function(myModule) {
    myModule.init();
});</code></pre>
          </div>

          <div class="box">
            <h3>核心特性</h3>
            <ul>
              <li>
                <strong>异步加载：</strong>
                <p>AMD 采用异步方式加载模块,不会阻塞页面渲染</p>
              </li>
              <li>
                <strong>依赖前置：</strong>
                <p>在定义模块时需要显式声明所有依赖</p>
              </li>
              <li>
                <strong>配置灵活：</strong>
                <p>支持路径别名、插件加载等高级配置</p>
              </li>
            </ul>
          </div>

          <div class="box">
            <h3>优点与局限</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>适合浏览器环境</li>
                  <li>异步加载提升性能</li>
                  <li>依赖管理清晰</li>
                </ul>
              </div>
              <div class="cons">
                <h4>局限</h4>
                <ul>
                  <li>代码体积较大</li>
                  <li>配置相对复杂</li>
                  <li>已逐渐被 ES Modules 取代</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="box">
            <h3>生态系统</h3>
            <p>RequireJS 是最著名的 AMD 实现,它提供了完整的模块加载器和丰富的插件系统。在 ES Modules 标准化之前,AMD 和 RequireJS 在前端模块化领域发挥了重要作用。</p>
          </div>
        </div>
      </section>

      <section class="section commonjs">
        <h2 class="section-title">📦 CommonJS 规范</h2>
        <div class="commonjs-content">
          <div class="commonjs-intro">
            <h3>发展历史</h3>
            <p>CommonJS 规范最初于2009年提出,旨在解决 JavaScript 缺乏模块化标准的问题。它最初被命名为"ServerJS",后来改名为"CommonJS"。Node.js
              采用并推广了这一规范,使其成为服务器端 JavaScript 的事实标准。</p>
          </div>

          <div class="commonjs-principle">
            <h3>工作原理</h3>
            <pre class="code-block"><code>// 导出模块
module.exports = {
  method: function() {
    // ...
  }
};

// 导入模块
const module = require('./module');</code></pre>
            <p>CommonJS 通过 module.exports 导出模块,通过 require() 同步加载模块。每个模块都运行在独立的作用域中,避免了全局变量污染。模块在第一次被 require 时执行,之后会被缓存。
            </p>
          </div>

          <div class="box">
            <h3>使用场景</h3>
            <ul>
              <li>Node.js 服务器端开发</li>
              <li>后端工具和脚本开发</li>
              <li>通过打包工具在浏览器中使用</li>
              <li>Electron 等桌面应用开发</li>
            </ul>
          </div>

          <div class="box">
            <h3>核心特性</h3>
            <ul>
              <li>
                <strong>同步加载：</strong>
                <p>模块加载是同步的,适合服务器环境</p>
              </li>
              <li>
                <strong>单例模式：</strong>
                <p>模块只会被加载和执行一次</p>
              </li>
              <li>
                <strong>动态加载：</strong>
                <p>支持条件加载和动态路径</p>
              </li>
            </ul>
          </div>

          <div class="box">
            <h3>优点与局限</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>简单易用</li>
                  <li>模块缓存</li>
                  <li>广泛支持</li>
                  <li>动态加载</li>
                </ul>
              </div>
              <div class="cons">
                <h4>局限</h4>
                <ul>
                  <li>同步加载影响性能</li>
                  <li>不适合浏览器环境</li>
                  <li>无法静态分析</li>
                  <li>不支持 Tree Shaking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ES Modules 基础介绍 -->
      <section class="section es-modules">
        <h2 class="section-title">📦 ES Modules 基础介绍</h2>

        <div class="es-modules-content">
          <div class="box">
            <h3>发展历史</h3>
            <ul>
              <li>2015年：ECMAScript 6 正式引入 ES Modules</li>
              <li>2017年：主流浏览器开始原生支持 ES Modules</li>
              <li>2019年：Node.js 开始稳定支持 ES Modules</li>
              <li>现在：已成为前端模块化的标准解决方案</li>
            </ul>
          </div>

          <div class="box">
            <h3>核心原理</h3>
            <ul>
              <li>
                <strong>静态分析：</strong>
                <p>编译时确定模块的依赖关系，支持 Tree Shaking</p>
              </li>
              <li>
                <strong>异步加载：</strong>
                <p>浏览器环境下可以异步加载模块，提高性能</p>
              </li>
              <li>
                <strong>实时绑定：</strong>
                <p>导出值是动态引用，而非拷贝</p>
              </li>
              <li>
                <strong>严格模式：</strong>
                <p>模块自动运行在严格模式下</p>
              </li>
            </ul>
          </div>

          <div class="box">
            <h3>使用方法</h3>
            <div class="code-examples">
              <div class="export-examples">
                <h4>导出方式</h4>
                <pre class="code-block"><code>
// 命名导出
export const name = 'ES Modules';
export function hello() { }

// 默认导出
export default class MyClass { }

// 重命名导出
export { name as moduleName };
                </code></pre>
              </div>
              <div>
                <h4>导入方式</h4>
                <pre class="code-block"><code>
// 导入命名导出
import { name, hello } from './module.js';

// 导入默认导出
import MyClass from './module.js';

// 重命名导入
import { name as newName } from './module.js';

// 导入所有
import * as module from './module.js';
                </code></pre>
              </div>
            </div>
          </div>

          <div class="box">
            <h3>主要优势</h3>
            <ul>
              <li>原生支持，无需打包工具</li>
              <li>静态分析，支持 Tree Shaking</li>
              <li>异步加载，性能更好</li>
              <li>规范统一，未来标准</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 对比表格 -->
      <section class="section comparison">
        <h2 class="section-title">🆚 模块系统对比</h2>
        <table class="module-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>CommonJS</th>
              <th>AMD</th>
              <th>ES Modules</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>加载方式</td>
              <td>同步加载</td>
              <td>静态分析/异步加载</td>
              <td>异步加载</td>
            </tr>
            <tr>
              <td>适用环境</td>
              <td>Node.js</td>
              <td>浏览器/Node.js</td>
              <td>浏览器</td>
            </tr>
            <tr>
              <td>Tree Shaking</td>
              <td>❌</td>
              <td>✅</td>

              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- CommonJS 与 ES Modules 对比 -->
      <section class="section comparison-details">
        <h2 class="section-title">🔍 CommonJS 与AMD 与 ES Modules 的区别</h2>
        <div class="comparison-details-content">
          <h3>1. 加载方式</h3>
          <p>CommonJS 是同步加载模块，AMD 是异步加载模块，而 ES Modules 支持异步加载，允许在浏览器中更高效地加载模块。</p>

          <h3>2. 导出与导入</h3>
          <p>CommonJS 使用 <code>module.exports</code> 导出模块，使用 <code>require()</code> 导入模块；AMD 使用 <code>define()</code>
            导出模块，使用 <code>require()</code> 导入模块；而 ES Modules 使用
            <code>export</code> 和 <code>import</code> 语法。
          </p>

          <h3>3. 作用域</h3>
          <p>CommonJS 模块的作用域是模块自身，AMD 模块的作用域是全局，而 ES Modules 的作用域是全局的，允许更灵活的模块间交互。</p>

          <h3>4. Tree Shaking</h3>
          <p>ES Modules 支持 Tree Shaking，AMD 支持 Tree Shaking，而 CommonJS 不支持。</p>
        </div>
      </section>

      <!-- CommonJS 加载原理 -->
      <section class="section commonjs-loading">
        <h2 class="section-title">📦 CommonJS 加载原理</h2>
        <div class="loading-details-content">
          <h3>1. 模块加载</h3>
          <p>CommonJS 模块在加载时会执行模块代码，并将其导出的内容缓存到一个对象中。每次调用 <code>require()</code> 时，都会返回这个缓存对象。</p>

          <h3>2. 模块作用域</h3>
          <p>每个模块都有自己的作用域，模块内的变量不会污染全局作用域。这使得模块之间的代码相互独立。</p>

          <h3>3. 同步加载</h3>
          <p>CommonJS 使用同步方式加载模块，这意味着在加载模块时，代码会阻塞，直到模块加载完成。这在服务器端是可行的，但在浏览器中可能导致性能问题。</p>

          <h3>4. 示例代码</h3>
          <pre class="code-block"><code>const moduleA = require('./moduleA');
    console.log(moduleA);</code></pre>
        </div>
      </section>

      <!-- 现代方案 -->
      <section class="section modern">
        <h2 class="section-title">🌟 现代打包方案</h2>
        <div class="tool-grid">
          <div class="tool-card">
            <!-- <img src="webpack-icon.svg" alt="Webpack" class="tool-logo" /> -->
            <h3>Webpack</h3>
            <p>模块打包器，支持多种模块格式</p>
          </div>
          <div class="tool-card">
            <!-- <img src="vite-icon.svg" alt="Vite" class="tool-logo" /> -->
            <h3>Vite</h3>
            <p>基于ESM的下一代前端工具</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 最佳实践 -->
    <footer class="doc-footer">
      <div class="best-practice">
        <h3>🏆 最佳实践建议</h3>
        <div class="practice-list">
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>优先使用ES Modules语法</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>保持模块单一职责原则</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>合理拆分业务与工具模块</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>


.section {
  padding: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.box {
  padding: 0.5rem;
  background: white;
  margin: 0.5rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.modular-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 1rem;

    .title {
      color: #3498db;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(52, 152, 219, 0.1);
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-puzzle {
      width: 120px;
      height: 4px;
      background: repeating-linear-gradient(45deg,
          #3498db 0px,
          #3498db 10px,
          #2ecc71 10px,
          #2ecc71 20px);
      margin: 1.5rem auto;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .section-title {
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .timeline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;

        .era {
          padding: 1.5rem;
          border-radius: 8px;
          background: #f8f9fa;
          text-align: center;

          .era-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
        }
      }

      .concept-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;

        .concept-card {
          padding: 1.5rem;
          border-radius: 8px;
          background: #f8f9fa;
          text-align: center;

          .concept-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
        }
      }

      .vue-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;

        .file-tree {
          padding: 1.5rem;
          background: #2c3e50;
          color: #ecf0f1;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;

          .indent {
            padding-left: 1.5rem;
          }
        }
      }

      .module-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #3498db;
          color: white;
        }

        tr:nth-child(even) {
          background: #f8f9fa;
        }
      }

      .tool-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;

        .tool-card {
          padding: 1.5rem;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;

          .tool-logo {
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
          }
        }
      }
    }

    .code-block {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
    }
  }

  .doc-footer {
    .best-practice {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #3498db;

      .practice-list {
        .practice-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;

          .icon {
            font-size: 1.5rem;
            color: #3498db;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .modular-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .timeline,
    .concept-grid,
    .tool-grid {
      grid-template-columns: 1fr !important;
    }

    .vue-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModularDocument',
  setup() {
    return {}
  },
})
</script>
