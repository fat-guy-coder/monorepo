<template>
  <div class="esm-container">
    <header class="header">
      <div class="logo-container">
        <div class="esm-logo">
          <div class="module-circle" v-for="n in 5" :key="n" :style="circleStyle(n)"></div>
        </div>
        <h1>ECMAScript Modules (ESM)</h1>
      </div>
      <p class="subtitle">JavaScript 的官方模块化标准</p>
    </header>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>核心概念</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <h3>什么是ES Module?</h3>
            <p>ES Module 是 ECMAScript 6 (ES6) 引入的官方模块系统，用于在 JavaScript 中组织和封装代码。它使用 <code>import</code> 和
              <code>export</code> 语法实现模块间的依赖关系。
            </p>
          </div>
          <div class="concept-card">
            <h3>设计目标</h3>
            <ul>
              <li>静态分析 - 编译时确定依赖关系</li>
              <li>异步加载 - 支持按需加载模块</li>
              <li>封装性 - 模块作用域隔离</li>
              <li>循环引用处理 - 支持模块间循环依赖</li>
            </ul>
          </div>
          <div class="concept-card">
            <h3>基本语法</h3>
            <pre class="inline-code">// 导出
export const name = 'ESM';
export function hello() {};

// 导入
import { name, hello } from './module.js';</pre>
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
              <h3>解析</h3>
              <p>JavaScript引擎解析入口文件，识别所有<code>import</code>语句</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>下载</h3>
              <p>浏览器下载所有依赖模块，构建模块依赖图</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>解析依赖</h3>
              <p>递归解析每个模块的依赖，直到所有依赖都被解析</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>实例化</h3>
              <p>为每个模块创建作用域，分配内存空间</p>
            </div>
          </div>
          <div class="process-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>求值</h3>
              <p>执行模块代码，填充导出内容</p>
            </div>
          </div>
        </div>

        <div class="comparison-section">
          <h3>与CommonJS的对比</h3>
          <div class="comparison-table">
            <div class="table-row header">
              <div class="table-cell">特性</div>
              <div class="table-cell">ES Module</div>
              <div class="table-cell">CommonJS</div>
            </div>
            <div class="table-row">
              <div class="table-cell">加载时机</div>
              <div class="table-cell">编译时</div>
              <div class="table-cell">运行时</div>
            </div>
            <div class="table-row">
              <div class="table-cell">输出类型</div>
              <div class="table-cell">只读引用</div>
              <div class="table-cell">值拷贝</div>
            </div>
            <div class="table-row">
              <div class="table-cell">循环引用</div>
              <div class="table-cell">支持</div>
              <div class="table-cell">有限支持</div>
            </div>
            <div class="table-row">
              <div class="table-cell">动态导入</div>
              <div class="table-cell">原生支持</div>
              <div class="table-cell">不支持</div>
            </div>
            <div class="table-row">
              <div class="table-cell">静态分析</div>
              <div class="table-cell">✅ 支持</div>
              <div class="table-cell">❌ 不支持</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>性能优化实践</h2>
      </div>
      <div class="section-content">
        <div class="optimization-grid">
          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">📦</div>
              <h3>代码分割</h3>
            </div>
            <p>将代码拆分为多个小模块，减少初始加载时间</p>
            <div class="code-block">
              <pre><code>// 使用动态导入实现代码分割
button.addEventListener('click', async () => {
  const module = await import('./heavyModule.js');
  module.runHeavyOperation();
});</code></pre>
            </div>
          </div>

          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">⏱️</div>
              <h3>预加载关键模块</h3>
            </div>
            <p>使用 <code>&lt;link rel="modulepreload"&gt;</code> 提前加载关键模块</p>
            <div class="code-block">
              <pre><code>&lt;!-- 在HTML中预加载关键模块 --&gt;
&lt;link rel="modulepreload" href="critical-module.js"&gt;</code></pre>
            </div>
          </div>

          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🧩</div>
              <h3>懒加载非关键模块</h3>
            </div>
            <p>延迟加载非必要模块，提升初始加载速度</p>
            <div class="code-block">
              <pre><code>// 按需加载模块
if (userNeedsFeature) {
  import('./featureModule.js')
    .then(module => module.init());
}</code></pre>
            </div>
          </div>

          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🔄</div>
              <h3>高效缓存策略</h3>
            </div>
            <p>使用内容哈希文件名实现长期缓存</p>
            <div class="code-block">
              <pre><code>// webpack.config.js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js',
}</code></pre>
            </div>
          </div>

          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🧠</div>
              <h3>Tree Shaking</h3>
            </div>
            <p>移除未使用的代码，减小包体积</p>
            <div class="code-block">
              <pre><code>// 仅导入需要的函数
import { specificFunction } from 'large-library';

// 而不是整个库
import * as largeLibrary from 'large-library';</code></pre>
            </div>
          </div>

          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🔗</div>
              <h3>使用HTTP/2</h3>
            </div>
            <p>利用HTTP/2的多路复用特性并行加载模块</p>
            <div class="code-block">
              <pre><code>// 服务器配置示例 (Nginx)
server {
  listen 443 ssl http2;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # 启用服务器推送
  http2_push_preload on;
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>高级使用模式</h2>
      </div>
      <div class="section-content">
        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>命名空间导入</h3>
            <div class="code-block">
              <pre><code>import * as Utils from './utils.js';

Utils.formatDate(new Date());
Utils.calculateTotal(products);</code></pre>
            </div>
          </div>

          <div class="advanced-card">
            <h3>默认导出</h3>
            <div class="code-block">
              <pre><code>// module.js
export default class MyClass {
  // ...
}

// app.js
import MyClass from './module.js';
const instance = new MyClass();</code></pre>
            </div>
          </div>

          <div class="advanced-card">
            <h3>动态导入表达式</h3>
            <div class="code-block">
              <pre><code>// 根据条件动态加载模块
const moduleName = getUserPreferences() ?
  'premiumFeatures' : 'basicFeatures';

import(`./features/${moduleName}.js`)
  .then(module => module.init());</code></pre>
            </div>
          </div>

          <div class="advanced-card">
            <h3>模块元信息</h3>
            <div class="code-block">
              <pre><code>// 获取当前模块的URL
console.log(import.meta.url);

// 在Vite中访问环境变量
console.log(import.meta.env.MODE);</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>注意:任何将ts或者js转译为AST树代码的工具，在转译前,import语句都可以不写在顶部,<br>但是，原生js import语句必须写在顶部，否则会报错</h2>
      </div>
      <div class="section-content">
        <h2>这是因为转译前可以不管顺序，反正转译后都会将import提升到最顶部</h2>
        <h2>不能在条件和循环和函数中使用，是因为在转译前，无法确定条件和循环和函数中是否存在import语句，所以会报错（说白了懒得去分析） </h2>
        <h2>包括babel，typescript，esbuild，rollup，vite，webpack等工具，在转译前，import语句都可以不写在顶部</h2>
        <div class="optimization-grid">
          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🧠</div>
              <h3>不限制导入位置</h3>
            </div>
            <p>在转译前，ES模块的导入语句可以出现在任何位置，而不仅仅是文件的顶部。</p>
            <div class="code-block">
              <pre><code>const a = require('./a.js');
console.log(a);

import b from './b.js';
console.log(b);</code></pre>
            </div>
          </div>
          <div class="optimization-card">
            <div class="card-header">
              <div class="icon">🧠</div>
              <h3>但是不能在条件和循环和函数中使用（会报错）</h3>
            </div>
            <p>不能在条件和循环和函数中使用。</p>
            <div class="code-block">
              <pre><code>if (condition) {
  import('./a.js');
}

for (let i = 0; i < 10; i++) {
  import('./a.js');
}</code></pre>
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
              <h3>优先使用命名导出</h3>
              <p>命名导出支持更好的Tree Shaking和代码提示</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>避免循环依赖</h3>
              <p>虽然ESM支持循环依赖，但应尽可能避免复杂的循环引用</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>使用.js扩展名</h3>
              <p>在import语句中始终包含文件扩展名，提高兼容性</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>模块职责单一</h3>
              <p>每个模块只关注单一功能，保持模块简洁</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>按功能组织目录</h3>
              <p>按功能而非类型组织模块目录结构</p>
            </div>
          </li>
          <li>
            <div class="practice-icon">✅</div>
            <div>
              <h3>使用绝对导入路径</h3>
              <p>配置模块解析器使用绝对路径，避免复杂的相对路径</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>ES Module是JavaScript模块化的未来，它提供了强大的代码组织能力和性能优化特性，是现代Web开发的基石。</p>
      <div class="resources">
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">MDN文档</a>
        <a href="https://exploringjs.com/es6/ch_modules.html" target="_blank">深入ES6模块</a>
        <a href="https://v8.dev/features/modules" target="_blank">V8引擎实现</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 为模块圆环生成随机位置
const circleStyle = (index: number) => {
  const angle = (index / 5) * Math.PI * 2;
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  return {
    left: `${centerX + Math.cos(angle) * radius - 30}px`,
    top: `${centerY + Math.sin(angle) * radius - 30}px`,
    animationDelay: `${index * 0.2}s`
  };
};



// 模块加载统计（演示用）
const modulesLoaded = computed(() => Math.floor(Math.random() * 100) + 50);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@background: #f8f9ff;
@card-bg: #ffffff;
@text-color: #1e1b4b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@code-bg: #1e293b;

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.esm-container {
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

  .esm-logo {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 2rem;

    .module-circle {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      .box-shadow();
      animation: float 3s infinite ease-in-out;
    }

    .module-circle:nth-child(1)::after {
      content: 'A';
    }

    .module-circle:nth-child(2)::after {
      content: 'B';
    }

    .module-circle:nth-child(3)::after {
      content: 'C';
    }

    .module-circle:nth-child(4)::after {
      content: 'D';
    }

    .module-circle:nth-child(5)::after {
      content: 'E';
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

  pre.inline-code {
    background: fade(@primary-color, 10%);
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    overflow-x: auto;
    margin: 1rem 0 0;
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
  }
}

.comparison-table {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;
  margin-top: 2rem;

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

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.optimization-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow();
  border-top: 3px solid @accent-color;

  .card-header {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    background: fade(@primary-color, 5%);

    .icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    h3 {
      margin: 0;
      color: @primary-color;
    }
  }

  p {
    padding: 0 1.25rem;
    margin: 0.5rem 0 1rem;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 0 0 10px 10px;

  pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.95rem;
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

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.advanced-card {
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
      color: @success-color;
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
  .esm-container {
    padding: 1.25rem;
  }

  .header {
    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .esm-logo {
      width: 200px;
      height: 200px;

      .module-circle {
        width: 40px;
        height: 40px;
      }
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
