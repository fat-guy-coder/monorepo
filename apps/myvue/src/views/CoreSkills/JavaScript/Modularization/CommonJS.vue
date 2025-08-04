<template>
  <div class="commonjs-container">
    <header class="header">
      <div class="logo-container">
        <div class="commonjs-logo">
          <div class="module" v-for="(mod, index) in modules" :key="index" :style="moduleStyle(index)">
            <div class="module-name">{{ mod.name }}</div>
            <div class="module-exports">{{ mod.exports.join(', ') }}</div>
          </div>
        </div>
        <h1>CommonJS 模块系统</h1>
      </div>
      <p class="subtitle">Node.js 的模块化标准</p>
    </header>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>核心概念</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <h3>什么是 CommonJS?</h3>
            <p>CommonJS 是 JavaScript 的模块规范，主要用于服务器端环境（如 Node.js）。它使用 <code>require()</code> 函数加载模块，使用
              <code>module.exports</code> 或 <code>exports</code> 导出模块。
            </p>
          </div>
          <div class="concept-card">
            <h3>设计目标</h3>
            <ul>
              <li>服务器端模块化</li>
              <li>同步加载机制</li>
              <li>简单的模块定义语法</li>
              <li>解决全局命名空间污染问题</li>
            </ul>
          </div>
          <div class="concept-card">
            <h3>历史背景</h3>
            <p>CommonJS 规范诞生于 2009 年，旨在解决浏览器端 JavaScript 的局限性，为 JavaScript 在服务器端应用提供标准模块系统。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h2>加载原理</h2>
      </div>
      <div class="section-content">
        <div class="loading-process">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>路径解析</h3>
              <p>解析 <code>require()</code> 中的模块标识符，确定模块的绝对路径</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>模块加载</h3>
              <p>根据文件扩展名（.js, .json, .node）加载对应模块</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>模块包装</h3>
              <p>将模块代码包装在函数中，提供 <code>module</code>、<code>exports</code>、<code>require</code> 等变量</p>
              <pre class="inline-code">(function(exports, require, module, __filename, __dirname) {
  // 模块代码
});</pre>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>执行模块</h3>
              <p>执行包装后的函数，初始化模块的 exports 对象</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>返回 exports</h3>
              <p>返回 <code>module.exports</code> 对象给调用者</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>缓存模块</h3>
              <p>将模块加入缓存，后续 require 调用直接返回缓存结果</p>
            </div>
          </div>
        </div>

        <div class="cache-diagram">
          <h3>模块缓存机制</h3>
          <div class="diagram-container">
            <div class="cache-item" v-for="(item, index) in cacheItems" :key="index">
              <div class="cache-key">{{ item.key }}</div>
              <div class="cache-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">💻</div>
        <h2>基本使用</h2>
      </div>
      <div class="section-content">
        <div class="usage-examples">
          <div class="example-card">
            <h3>模块导出</h3>
            <div class="code-block">
              <pre><code>// math.js - 导出单个函数
exports.add = (a, b) => a + b;

// 或导出整个模块
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// 或导出类
class Calculator {
  // ...
}
module.exports = Calculator;</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>模块导入</h3>
            <div class="code-block">
              <pre><code>// 导入整个模块
const math = require('./math.js');
console.log(math.add(2, 3)); // 5

// 解构导入
const { add, subtract } = require('./math.js');
console.log(subtract(5, 2)); // 3

// 导入JSON文件
const config = require('./config.json');

// 导入内置模块
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  // ...
});</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>循环依赖处理</h3>
            <div class="code-block">
              <pre><code>// a.js
exports.loaded = false;
const b = require('./b');
console.log('在 a 中, b.loaded =', b.loaded);
exports.loaded = true;

// b.js
exports.loaded = false;
const a = require('./a');
console.log('在 b 中, a.loaded =', a.loaded);
exports.loaded = true;

// main.js
require('./a');

// 输出:
// 在 b 中, a.loaded = false
// 在 a 中, b.loaded = true</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🔄</div>
        <h2>与 ES Module 对比</h2>
      </div>
      <div class="section-content">
        <div class="comparison-table">
          <div class="table-row header">
            <div class="table-cell">特性</div>
            <div class="table-cell">CommonJS</div>
            <div class="table-cell">ES Module</div>
          </div>
          <div class="table-row">
            <div class="table-cell">加载方式</div>
            <div class="table-cell">同步加载</div>
            <div class="table-cell">异步加载</div>
          </div>
          <div class="table-row">
            <div class="table-cell">使用环境</div>
            <div class="table-cell">Node.js 环境</div>
            <div class="table-cell">浏览器/Node.js</div>
          </div>
          <div class="table-row">
            <div class="table-cell">导出类型</div>
            <div class="table-cell">动态导出</div>
            <div class="table-cell">静态导出</div>
          </div>
          <div class="table-row">
            <div class="table-cell">值类型</div>
            <div class="table-cell">值拷贝</div>
            <div class="table-cell">只读引用</div>
          </div>
          <div class="table-row">
            <div class="table-cell">语法</div>
            <div class="table-cell">require/module.exports</div>
            <div class="table-cell">import/export</div>
          </div>
          <div class="table-row">
            <div class="table-cell">循环依赖</div>
            <div class="table-cell">支持但有限制</div>
            <div class="table-cell">原生支持</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>关于commonjs导出是的值的拷贝</h2>
      </div>
      <div class="section-content">
        <div> 其实如果导出的是一个对象，那么这个对象的地址是拷贝的，而不是对象的深拷贝。请看如下代码</div>
        <div class="code-block">
          <pre><code>
            //a.js
            let a = {
              name: 'a',
              age: 18
            }
            module.exports.a = a;

            setTimeout(() => {
              a.name = 'b';
            }, 1000);

            //b.js
            const m = require('./a');
            console.log(m.a); // { name: 'a', age: 18 }

            setTimeout(() => {
              console.log(m.a); // { name: 'b', age: 18 }
            }, 2000);
            //所以说如果导出的是一个对象，那么这个对象的地址是拷贝的，而不是拷贝对象的。
          </code></pre>
        </div>
        <div>同理，es module 导出的是一个对象的引用，改变这个对象的值，引入的模块对象也会随之改变(因为导出的是引用)。</div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>使用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">🖥️</div>
            <div>
              <h3>Node.js 后端开发</h3>
              <p>服务器应用、API服务、命令行工具</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <div>
              <h3>NPM 包开发</h3>
              <p>创建可复用的Node.js模块</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔌</div>
            <div>
              <h3>插件系统</h3>
              <p>实现动态加载的插件架构</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🛠️</div>
            <div>
              <h3>构建工具</h3>
              <p>Webpack、Gulp等工具的核心模块系统</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <div>
              <h3>代码迁移</h3>
              <p>将传统JS代码迁移到模块化系统</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <div>
              <h3>模块热替换</h3>
              <p>开发环境下的模块热更新</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section best-practices">
      <div class="section-header">
        <div class="section-icon">⭐</div>
        <h2>最佳实践</h2>
      </div>
      <div class="section-content">
        <ul class="practices-list">
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>优先使用 module.exports</h3>
              <p>避免直接重写 exports 变量，使用 module.exports 更安全</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>避免循环依赖</h3>
              <p>虽然支持，但循环依赖可能导致不可预期的行为</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>使用绝对路径</h3>
              <p>通过 __dirname 构建绝对路径，避免相对路径问题</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>合理组织模块</h3>
              <p>保持模块职责单一，避免过大的模块文件</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>处理同步异常</h3>
              <p>require() 是同步操作，需要适当处理错误</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>缓存利用</h3>
              <p>多次 require 同一模块只执行一次，利用此特性优化</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>CommonJS 是 Node.js 生态的基石，它提供了简单而强大的模块化能力，使 JavaScript 能够在服务器端构建复杂应用。</p>
      <div class="resources">
        <a href="https://nodejs.org/docs/latest/api/modules.html" target="_blank">Node.js 文档</a>
        <a href="https://www.commonjs.org/" target="_blank">CommonJS 规范</a>
        <a href="https://github.com/nodejs/node" target="_blank">Node.js 源码</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模块数据
const modules = ref([
  { name: 'math.js', exports: ['add', 'subtract'] },
  { name: 'utils.js', exports: ['formatDate', 'log'] },
  { name: 'config.json', exports: ['appConfig'] },
  { name: 'app.js', exports: ['main'] }
]);

// 模块位置计算
const moduleStyle = (index: number) => {
  const positions = [
    { top: '20%', left: '10%' },
    { top: '60%', left: '30%' },
    { top: '30%', left: '70%' },
    { top: '70%', left: '50%' }
  ];

  return {
    top: positions[index].top,
    left: positions[index].left,
    animationDelay: `${index * 0.2}s`
  };
};

// 缓存项目数据
const cacheItems = ref([
  { key: 'moduleA', value: '{ ... }' },
  { key: 'moduleB', value: '{ ... }' },
  { key: 'moduleC', value: '{ ... }' },
  { key: 'moduleD', value: '{ ... }' }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #8b5cf6;
@secondary-color: #7c3aed;
@accent-color: #a78bfa;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@code-bg: #1e293b;
@cache-bg: #ede9fe;

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.commonjs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-color;
  background-color: @background;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .commonjs-logo {
    position: relative;
    height: 300px;
    width: 100%;
    margin: 0 auto 2rem;
    background: linear-gradient(135deg, #f5f3ff, #ede9fe);
    border-radius: 16px;
    .box-shadow();
    overflow: hidden;
  }

  .module {
    position: absolute;
    width: 140px;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    .box-shadow();
    border-top: 3px solid @primary-color;
    animation: float 3s infinite ease-in-out;

    .module-name {
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .module-exports {
      font-size: 0.8rem;
      color: @text-secondary;
      line-height: 1.4;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(90deg, @primary-color 0%, @secondary-color 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.25rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-section {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(90deg, @primary-color 0%, @secondary-color 100%);

    .section-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .section-content {
    padding: 2rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @primary-color;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  p,
  ul {
    margin: 0 0 1rem 0;
    color: @text-secondary;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
}

.loading-process {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 28px;
    top: 48px;
    bottom: -20px;
    width: 2px;
    background: fade(@primary-color, 20%);
  }

  &:last-child::before {
    display: none;
  }

  .step-number {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    flex-shrink: 0;
    z-index: 2;
  }

  .step-content {
    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: @primary-color;
    }

    p {
      margin: 0;
      color: @text-secondary;
      line-height: 1.6;
    }

    pre.inline-code {
      background: fade(@primary-color, 10%);
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      overflow-x: auto;
    }
  }
}

.cache-diagram {
  margin-top: 2rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.diagram-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: @cache-bg;
  border-radius: 12px;
  padding: 1.5rem;
}

.cache-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  .box-shadow();

  .cache-key {
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 0.25rem;
  }

  .cache-value {
    font-size: 0.9rem;
    color: @text-secondary;
    font-family: 'Fira Code', monospace;
  }
}

.usage-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow();

  h3 {
    background: fade(@primary-color, 5%);
    padding: 1rem 1.25rem;
    margin: 0;
    color: @primary-color;
    border-bottom: 1px solid @border-color;
  }
}

.code-block {
  background: @code-bg;

  pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.9rem;
      line-height: 1.5;

      .comment {
        color: #94a3b8;
      }

      .keyword {
        color: #f472b6;
      }

      .function {
        color: #60a5fa;
      }

      .string {
        color: #34d399;
      }

      .variable {
        color: #fbbf24;
      }
    }
  }
}

.comparison-table {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;

  .table-row {
    display: flex;

    &:nth-child(even) {
      background-color: fade(@primary-color, 3%);
    }

    &.header {
      background-color: @primary-color;

      .table-cell {
        color: white;
        font-weight: 600;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;

    &:first-child {
      flex: 0 0 200px;
      font-weight: 500;
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  border-left: 3px solid @primary-color;

  .scenario-icon {
    font-size: 1.8rem;
    flex: 0 0 40px;
    color: @primary-color;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.best-practices {
  .section-content {
    padding: 2rem;
  }
}

.practices-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    padding: 1.25rem;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    .practice-icon {
      font-size: 1.5rem;
      margin-right: 1.5rem;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      color: @text-secondary;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  color: @text-secondary;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;

  .resources {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      .transition();

      &:hover {
        color: darken(@primary-color, 15%);
        text-decoration: underline;
      }
    }
  }
}

// 动画
@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .commonjs-container {
    padding: 1.25rem;
  }

  .header {
    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content-section .section-content {
    padding: 1.5rem;
  }

  .process-step {
    gap: 1rem;

    .step-number {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }
  }
}
</style>
