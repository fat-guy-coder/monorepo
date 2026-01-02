<template>
  <div class="treeshaking-optimization">
    <header class="header">
      <div class="header-content">
        <h1>代码层面 Tree Shaking 优化指南</h1>
        <p>编写更合理的代码，最大化 Tree Shaking 效果</p>
      </div>
      <div class="tree-shaking-visual">
        <div class="original-module">
          <div class="export used">export functionA()</div>
          <div class="export used">export functionB()</div>
          <div class="export unused">export functionC()</div>
          <div class="export unused">export functionD()</div>
        </div>
        <div class="shaking-process">
          <i class="fas fa-wind"></i>
          <div class="shaking-animation"></div>
        </div>
        <div class="optimized-module">
          <div class="export used">export functionA()</div>
          <div class="export used">export functionB()</div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
                :class="{ active: activeSection === section.id }">
                <i :class="section.icon"></i>
                <span>{{ section.title }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="optimization-indicator">
            <div class="leaf"></div>
            <span>Tree Shaking 已优化</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="principles" class="section">
          <div class="section-header">
            <i class="fas fa-seedling"></i>
            <h2>Tree Shaking 友好代码原则</h2>
          </div>

          <div class="content-card">
            <div class="principle-cards">
              <div class="principle-card">
                <div class="principle-icon">
                  <i class="fas fa-cube"></i>
                </div>
                <h3>模块化设计</h3>
                <p>将功能拆分为小模块，避免大而全的单文件</p>
                <div class="code-comparison">
                  <div class="bad-example">
                    <h4>不推荐</h4>
                    <pre><code>// utils.js
export function formatDate() { /* ... */ }
export function debounce() { /* ... */ }
export function throttle() { /* ... */ }
export function currencyFormat() { /* ... */ }</code></pre>
                  </div>
                  <div class="good-example">
                    <h4>推荐</h4>
                    <pre><code>// dateUtils.js
export function formatDate() { /* ... */ }

// functionUtils.js
export function debounce() { /* ... */ }
export function throttle() { /* ... */ }

// numberUtils.js
export function currencyFormat() { /* ... */ }</code></pre>
                  </div>
                </div>
              </div>

              <div class="principle-card">
                <div class="principle-icon">
                  <i class="fas fa-leaf"></i>
                </div>
                <h3>纯函数优先</h3>
                <p>编写无副作用的纯函数，便于静态分析</p>
                <div class="code-comparison">
                  <div class="bad-example">
                    <h4>不推荐</h4>
                    <pre><code>let counter = 0;

export function increment() {
  counter++; // 副作用
  return counter;
}</code></pre>
                  </div>
                  <div class="good-example">
                    <h4>推荐</h4>
                    <pre><code>export function increment(current) {
  return current + 1; // 纯函数
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="principle-card">
                <div class="principle-icon">
                  <i class="fas fa-filter"></i>
                </div>
                <h3>按需导入</h3>
                <p>仅导入需要的功能而非整个模块</p>
                <div class="code-comparison">
                  <div class="bad-example">
                    <h4>不推荐</h4>
                    <pre><code>import _ from 'lodash';

// 使用
_.debounce(myFunc, 300);</code></pre>
                  </div>
                  <div class="good-example">
                    <h4>推荐</h4>
                    <pre><code>import debounce from 'lodash/debounce';

// 使用
debounce(myFunc, 300);</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="export-strategies" class="section">
          <div class="section-header">
            <i class="fas fa-file-export"></i>
            <h2>导出策略优化</h2>
          </div>

          <div class="content-card">
            <h3>导出方式对比</h3>

            <div class="export-comparison">
              <div class="export-type">
                <h4>命名导出 (推荐)</h4>
                <div class="code-block">
                  <pre><code>// mathUtils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}</code></pre>
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <i class="fas fa-check-circle"></i>
                    <ul>
                      <li>Tree Shaking 友好</li>
                      <li>明确导出函数名</li>
                      <li>按需导入简单</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="export-type">
                <h4>默认导出 (谨慎使用)</h4>
                <div class="code-block">
                  <pre><code>// mathUtils.js
export default {
  add(a, b) { /* ... */ },
  subtract(a, b) { /* ... */ }
}</code></pre>
                </div>
                <div class="pros-cons">
                  <div class="cons">
                    <i class="fas fa-exclamation-triangle"></i>
                    <ul>
                      <li>整个对象会被导入</li>
                      <li>即使只使用一个方法</li>
                      <li>不利于 Tree Shaking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="export-type">
                <h4>类导出 (注意副作用)</h4>
                <div class="code-block">
                  <pre><code>// Logger.js
export default class Logger {
  constructor() { /* ... */ }

  log(message) {
    console.log(message);
  }

  // 静态方法
  static timestamp() {
    return new Date();
  }
}</code></pre>
                </div>
                <div class="pros-cons">
                  <div class="notes">
                    <i class="fas fa-info-circle"></i>
                    <ul>
                      <li>即使未实例化，类也会被包含</li>
                      <li>使用静态方法时更需注意</li>
                      <li>避免在构造函数中产生副作用</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="advanced-export">
              <h3>高级导出技巧</h3>
              <div class="tips">
                <div class="tip">
                  <h4>1. 入口文件重导出</h4>
                  <p>创建 index.js 统一导出模块，同时保持 Tree Shaking 能力</p>
                  <div class="code-block small">
                    <pre><code>// utils/index.js
export { default as formatDate } from './dateUtils';
export { debounce, throttle } from './functionUtils';
export { currencyFormat } from './numberUtils';</code></pre>
                  </div>
                </div>

                <div class="tip">
                  <h4>2. 副作用标记</h4>
                  <p>使用 / * #__PURE__ * / 注释标记无副作用调用</p>
                  <div class="code-block small">
                    <pre><code>// 标记函数调用为纯函数
const result = /*#__PURE__*/ calculateValues();

// 标记类实例化
export const myService = /*#__PURE__*/ new MyService();</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="import-best-practices" class="section">
          <div class="section-header">
            <i class="fas fa-file-import"></i>
            <h2>导入最佳实践</h2>
          </div>

          <div class="content-card">
            <div class="import-strategies">
              <div class="strategy">
                <h3>1. 按需导入</h3>
                <p>只导入实际需要的功能，而不是整个库</p>
                <div class="code-comparison">
                  <div class="bad-example">
                    <h4>不推荐</h4>
                    <pre><code>import * as utils from './utils';</code></pre>
                    <p class="warning">导入整个模块，所有导出都会被包含</p>
                  </div>
                  <div class="good-example">
                    <h4>推荐</h4>
                    <pre><code>import { debounce } from './functionUtils';</code></pre>
                    <p class="success">只导入需要的功能</p>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <h3>2. 避免动态导入</h3>
                <p>避免使用无法静态分析的动态导入方式</p>
                <div class="code-comparison">
                  <div class="bad-example">
                    <h4>不推荐</h4>
                    <pre><code>// Webpack 无法静态分析
const moduleName = 'mathUtils';
import(moduleName).then(module => {
  // ...
});</code></pre>
                  </div>
                  <div class="good-example">
                    <h4>推荐</h4>
                    <pre><code>// 静态导入
import { add } from './mathUtils';

// 或显式动态导入
import('./mathUtils').then(module => {
  module.add(1, 2);
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <h3>3. 第三方库优化</h3>
                <p>使用支持 Tree Shaking 的库并正确导入</p>
                <div class="library-examples">
                  <div class="library">
                    <h4>Lodash</h4>
                    <div class="code-block small">
                      <pre><code>// 不推荐
import { debounce } from 'lodash';

// 推荐
import debounce from 'lodash/debounce';</code></pre>
                    </div>
                  </div>
                  <div class="library">
                    <h4>Date-fns</h4>
                    <div class="code-block small">
                      <pre><code>// 不推荐
import { format } from 'date-fns';

// 推荐
import format from 'date-fns/format';</code></pre>
                    </div>
                  </div>
                  <div class="library">
                    <h4>Material-UI</h4>
                    <div class="code-block small">
                      <pre><code>// 不推荐
import { Button } from '@mui/material';

// 推荐
import Button from '@mui/material/Button';</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="side-effects" class="section">
          <div class="section-header">
            <i class="fas fa-radiation"></i>
            <h2>副作用处理策略</h2>
          </div>

          <div class="content-card">
            <h3>理解副作用</h3>
            <div class="side-effect-explanation">
              <p><strong>副作用</strong>是指模块在被导入时执行的代码，而不仅仅是导出功能。</p>
              <p>副作用会阻止 Tree Shaking，因为 Webpack 必须假设这些代码需要执行。</p>

              <div class="examples">
                <div class="example">
                  <h4>常见副作用示例</h4>
                  <div class="code-block">
                    <pre><code>// 1. 全局状态修改
window.myApp = window.myApp || {};

// 2. 立即执行函数
(function init() {
  console.log('Module initialized');
})();

// 3. CSS 导入
import './styles.css';

// 4. Polyfill 导入
import 'core-js/stable';</code></pre>
                  </div>
                </div>

                <div class="example">
                  <h4>无副作用示例</h4>
                  <div class="code-block">
                    <pre><code>// 纯函数导出
export function add(a, b) {
  return a + b;
}

// 无立即执行代码
const PI = 3.14;

export function circleArea(radius) {
  return PI * radius * radius;
}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <h3>副作用管理策略</h3>
            <div class="management-strategies">
              <div class="strategy">
                <div class="strategy-icon">
                  <i class="fas fa-archive"></i>
                </div>
                <div class="strategy-content">
                  <h4>1. 隔离副作用</h4>
                  <p>将有副作用的代码分离到单独文件</p>
                  <div class="code-block small">
                    <pre><code>// polyfills.js (在入口文件中导入)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// styles.js (导入所有全局CSS)
import './main.css';
import './theme.css';</code></pre>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <div class="strategy-icon">
                  <i class="fas fa-tag"></i>
                </div>
                <div class="strategy-content">
                  <h4>2. 正确标记副作用</h4>
                  <p>在 package.json 中声明副作用文件</p>
                  <div class="code-block small">
                    <pre><code>{
  "name": "my-project",
  "sideEffects": [
    "**/*.css",
    "**/*.scss",
    "./src/polyfills.js"
  ]
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="strategy">
                <div class="strategy-icon">
                  <i class="fas fa-code"></i>
                </div>
                <div class="strategy-content">
                  <h4>3. 惰性初始化</h4>
                  <p>将初始化逻辑封装在函数中，按需调用</p>
                  <div class="code-block small">
                    <pre><code>// 避免
const analytics = initAnalytics(); // 立即执行

// 推荐
let analytics = null;

export function getAnalytics() {
  if (!analytics) {
    analytics = initAnalytics();
  }
  return analytics;
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" class="section">
          <div class="section-header">
            <i class="fas fa-tools"></i>
            <h2>验证与优化工具</h2>
          </div>

          <div class="content-card">
            <h3>Tree Shaking 效果验证</h3>

            <div class="validation-tools">
              <div class="tool">
                <h4>Webpack Bundle Analyzer</h4>
                <p>可视化分析 bundle 内容，识别未摇掉的代码</p>
                <div class="code-block small">
                  <pre><code>// 安装
npm install --save-dev webpack-bundle-analyzer

// webpack.config.js
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};</code></pre>
                </div>
              </div>

              <div class="tool">
                <h4>手动验证方法</h4>
                <ol class="validation-steps">
                  <li>构建生产版本 <code>npm run build</code></li>
                  <li>检查生成的 bundle 文件</li>
                  <li>搜索应被移除的函数/变量</li>
                  <li>使用 Source Map 定位原始文件</li>
                </ol>
                <div class="tip">
                  <i class="fas fa-lightbulb"></i>
                  <p>在代码中添加特定注释（如 /* UNUSED_FUNCTION */），然后检查 bundle 中是否还存在</p>
                </div>
              </div>
            </div>

            <h3>持续优化策略</h3>
            <div class="optimization-cycle">
              <div class="cycle-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>代码编写</h4>
                  <p>遵循 Tree Shaking 友好原则</p>
                </div>
              </div>
              <div class="cycle-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>构建分析</h4>
                  <p>使用分析工具检查 bundle</p>
                </div>
              </div>
              <div class="cycle-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>问题识别</h4>
                  <p>找出未摇掉的代码模块</p>
                </div>
              </div>
              <div class="cycle-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>重构优化</h4>
                  <p>调整代码结构或导入方式</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section conclusion">
          <div class="section-header">
            <i class="fas fa-flag-checkered"></i>
            <h2>总结与最佳实践</h2>
          </div>

          <div class="content-card">
            <div class="summary">
              <p>在代码层面合理利用 Tree Shaking 可以显著减小 bundle 体积，提升应用性能。</p>

              <div class="key-takeaways">
                <h3>核心最佳实践</h3>
                <ul>
                  <li>使用 ES6 模块语法（import/export）</li>
                  <li>编写纯函数，避免模块级副作用</li>
                  <li>按需导入第三方库功能</li>
                  <li>使用命名导出而非默认导出对象</li>
                  <li>正确标记副作用文件</li>
                </ul>
              </div>

              <div class="impact-stats">
                <div class="stat">
                  <div class="stat-value">40-70%</div>
                  <div class="stat-label">潜在体积减少</div>
                </div>
                <div class="stat">
                  <div class="stat-value">2-5x</div>
                  <div class="stat-label">加载速度提升</div>
                </div>
                <div class="stat">
                  <div class="stat-value">30-50%</div>
                  <div class="stat-label">内存占用减少</div>
                </div>
              </div>

              <div class="final-tip">
                <i class="fas fa-lightbulb"></i>
                <p>将 Tree Shaking 友好的编码风格作为团队规范，结合自动化工具持续优化，可显著提升应用性能。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Tree Shaking 代码优化指南 | Vue3 + TypeScript 实现</p>
      <p> 前端性能优化专家</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 活动导航项
const activeSection = ref('principles');

// 导航部分
const sections = ref([
  { id: 'principles', title: '编码原则', icon: 'fas fa-seedling' },
  { id: 'export-strategies', title: '导出策略', icon: 'fas fa-file-export' },
  { id: 'import-best-practices', title: '导入实践', icon: 'fas fa-file-import' },
  { id: 'side-effects', title: '副作用处理', icon: 'fas fa-radiation' },
  { id: 'tools', title: '验证工具', icon: 'fas fa-tools' }
]);

// 滚动监听
const handleScroll = () => {
  const sectionElements = sections.value.map(s =>
    document.getElementById(s.id)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight) {
      activeSection.value = section.id;
    }
  });
};

// 滚动到指定区域
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>



// 变量定义
@primary-color: #2e7d32; // 绿色主题
@secondary-color: #1b5e20;
@accent-color: #4caf50;
@light-green: #c8e6c9;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@card-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
@sidebar-width: 280px;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background-color: #f0f2f5;
  overflow-x: hidden;
}

.treeshaking-optimization {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

// 页眉样式
.header {
  background: linear-gradient(135deg, darken(@secondary-color, 10%), @primary-color);
  color: white;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  .header-content {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;
    z-index: 2;
    position: relative;

    h1 {
      font-size: 2.6rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
    }
  }
}

.tree-shaking-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  gap: 2rem;

  .original-module,
  .optimized-module {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-width: 200px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 1.5rem;

    .export {
      padding: 0.8rem 1.2rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      font-weight: 500;
      text-align: center;

      &.used {
        background: rgba(76, 175, 80, 0.5);
      }

      &.unused {
        opacity: 0.6;
        text-decoration: line-through;
      }
    }
  }

  .shaking-process {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.7);
    position: relative;

    .shaking-animation {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px dashed rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      animation: shake 3s infinite;
    }
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  25% {
    transform: translate(-50%, -50%) rotate(5deg);
  }

  75% {
    transform: translate(-50%, -50%) rotate(-5deg);
  }
}

// 内容布局
.content-container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: @sidebar-width;
  background: @light-green;
  border-right: 1px solid darken(@light-green, 10%);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: calc(100vh - 80px);

  nav ul {
    list-style: none;
    flex: 1;

    li {
      margin-bottom: 0.3rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.9rem 1.5rem;
      text-decoration: none;
      color: @text-color;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;

      i {
        font-size: 1.1rem;
        width: 25px;
        margin-right: 0.8rem;
      }

      &:hover {
        background: rgba(@accent-color, 0.1);
        color: @primary-color;
      }

      &.active {
        background: rgba(@accent-color, 0.2);
        color: @primary-color;
        border-left: 4px solid @primary-color;
        font-weight: 600;
      }
    }
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid darken(@light-green, 10%);

  .optimization-indicator {
    display: flex;
    align-items: center;
    background: rgba(@accent-color, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: darken(@accent-color, 30%);
    font-weight: 500;

    .leaf {
      width: 12px;
      height: 12px;
      background: @accent-color;
      border-radius: 50%;
      margin-right: 0.7rem;
      animation: shake 1.5s infinite;
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

// 章节样式
.section {
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    i {
      font-size: 1.8rem;
      color: @primary-color;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.8rem;
      color: @secondary-color;
    }
  }
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  h4 {
    font-size: 1.2rem;
    margin: 1.2rem 0 0.8rem;
    color: darken(@text-color, 10%);
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
}

// 原则卡片
.principle-cards {
  display: grid;
  grid-template-columns: 1;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .principle-card {
    background: #f9f9f9;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid @border-color;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }

    .principle-icon {
      width: 60px;
      height: 60px;
      background: rgba(@primary-color, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;

      i {
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    h3 {
      text-align: center;
      margin-top: 0;
    }
  }
}

// 代码对比
.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;

  .bad-example,
  .good-example {
    padding: 1rem;
    border-radius: 8px;

    h4 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }

  .bad-example {
    background: #fff8f8;
    border: 1px solid #ffcccc;

    h4 {
      color: #e53935;
    }

    .warning {
      color: #e53935;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }

  .good-example {
    background: #f8fff8;
    border: 1px solid #ccffcc;

    h4 {
      color: #43a047;
    }

    .success {
      color: #43a047;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }
}

// 导出比较
.export-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .export-type {
    background: #f9f9f9;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid @border-color;

    h4 {
      text-align: center;
      margin-top: 0;
    }
  }
}

// 响应式调整
@media (max-width: 1100px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid darken(@light-green, 10%);
  }

  .main-content {
    padding: 1.5rem;
  }

  .header {
    padding: 1.5rem;

    .header-content h1 {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .tree-shaking-visual {
    flex-direction: column;
  }

  .principle-cards,
  .export-comparison {
    grid-template-columns: 1fr;
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }
}
</style>
