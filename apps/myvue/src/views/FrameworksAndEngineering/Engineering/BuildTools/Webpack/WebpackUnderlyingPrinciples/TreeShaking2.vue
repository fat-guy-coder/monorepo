<template>
  <div class="tree-shaking-container">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1>Tree Shaking 技术基础介绍</h1>
        <p class="subtitle">深入解析现代 JavaScript 打包中的死代码消除技术</p>
        <div class="visualization">
          <div class="tree">
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="leaves">
              <div class="leaf" v-for="(leaf, index) in leaves" :key="index" :class="{
                'used': leaf.used,
                'unused': !leaf.used,
                'shaking': shaking && !leaf.used
              }"></div>
            </div>
          </div>
          <div class="ground"></div>
          <div class="result">
            <div class="bundle" :class="{ 'shaked': shaking }">
              <div class="module" v-for="(module, index) in modules" :key="index" :class="{ 'used': module.used }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="content">
      <!-- 概述部分 -->
      <section class="card overview">
        <h2><i class="icon info"></i> Tree Shaking 概述</h2>
        <div class="overview-content">
          <div class="definition">
            <p><strong>Tree Shaking</strong> 是一种用于 JavaScript 的<a class="highlight">死代码消除（Dead Code
                Elimination）</a>技术，它通过静态分析识别并移除应用程序中未使用的代码，从而显著减小最终打包文件的大小。</p>
          </div>
          <div class="comparison">
            <div class="comparison-item">
              <h3>没有 Tree Shaking</h3>
              <div class="bundle-size">
                <div class="size-bar full"></div>
                <div class="size-label">完整库 100%</div>
              </div>
              <div class="code-example">
                <pre>import { functionA } from 'library';

functionA(); // 只使用了 functionA
// 但整个 library 都被打包进来了</pre>
              </div>
            </div>
            <div class="comparison-item">
              <h3>使用 Tree Shaking</h3>
              <div class="bundle-size">
                <div class="size-bar partial"></div>
                <div class="size-label">仅 30% 被保留</div>
              </div>
              <div class="code-example">
                <pre>import { functionA } from 'library';

functionA(); // 只使用了 functionA
// 打包结果只包含 functionA 及其依赖</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现原理 -->
      <section class="card principles">
        <h2><i class="icon gear"></i> 底层实现原理</h2>
        <div class="principles-content">
          <div class="principle">
            <div class="principle-icon">1</div>
            <h3>ES Module 静态结构</h3>
            <p>Tree Shaking 依赖于 ES6 模块的静态结构特性。ES6 模块的导入导出在编译时就能确定，而不是运行时。</p>
            <div class="code-block">
              <pre>// 静态导入 - 可分析
import { funcA } from 'moduleA';

// 动态导入 - 不可分析
const module = await import('moduleB');</pre>
            </div>
          </div>

          <div class="principle">
            <div class="principle-icon">2</div>
            <h3>依赖图构建</h3>
            <p>打包工具从入口文件开始，递归分析所有导入的模块，构建完整的依赖关系图。</p>
            <div class="dependency-graph">
              <div class="entry">entry.js</div>
              <div class="dependencies">
                <div class="module">moduleA.js</div>
                <div class="module">moduleB.js</div>
                <div class="module">moduleC.js</div>
              </div>
            </div>
          </div>

          <div class="principle">
            <div class="principle-icon">3</div>
            <h3>静态代码分析</h3>
            <p>打包工具分析代码的副作用（Side Effects），识别未被使用的导出。</p>
            <div class="code-block">
              <pre>// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// app.js
import { add } from './math';
add(1, 2); // subtract 未被使用</pre>
            </div>
          </div>

          <div class="principle">
            <div class="principle-icon">4</div>
            <h3>标记与清除</h3>
            <p>打包工具标记所有被使用的代码路径，然后清除所有未被标记的代码（死代码）。</p>
            <div class="mark-and-sweep">
              <div class="code-paths">
                <div class="path used">入口文件</div>
                <div class="path used">add 函数</div>
                <div class="path unused">subtract 函数</div>
                <div class="path unused">未使用的依赖</div>
              </div>
              <div class="arrow">→</div>
              <div class="result">清除未使用代码</div>
            </div>
          </div>
        </div>
      </section>


      <!-- INSERT_YOUR_CODE -->
      <!-- Webpack 如何获得 ESModule 静态依赖关系 -->
      <section class="card esmodule-analysis">
        <h2><i class="icon search"></i> Webpack 如何获得 ESModule 的静态依赖关系</h2>
        <div class="esmodule-analysis-content">
          <p>
            <strong>核心原理：</strong> Webpack 通过解析 <code>import</code> 和 <code>export</code> 语句，静态分析每个模块的依赖关系，构建依赖图。<br>
            由于 ESModule 的 <code>import/export</code> 语法是静态的，Webpack 可以在不执行代码的情况下，准确地收集依赖信息。
          </p>
          <div class="analysis-steps">
            <div class="step">
              <div class="step-icon">1</div>
              <div class="step-content">
                <strong>解析源码</strong>
                <p>Webpack 使用 <code>acorn</code> 等 JS 解析器，将源码转换为抽象语法树（AST）。</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">2</div>
              <div class="step-content">
                <strong>遍历 AST</strong>
                <p>遍历 AST，查找 <code>ImportDeclaration</code> 和 <code>ExportDeclaration</code> 节点，收集依赖模块路径。</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">3</div>
              <div class="step-content">
                <strong>递归分析</strong>
                <p>对每个依赖模块重复上述过程，最终形成完整的依赖图。</p>
              </div>
            </div>
          </div>
          <div class="code-block">
            <pre>// 简化流程示意
const acorn = require('acorn');
const code = "import { foo } from './foo.js'";
const ast = acorn.parse(code, { sourceType: 'module' });

ast.body.forEach(node => {
  if (node.type === 'ImportDeclaration') {
    console.log('依赖模块:', node.source.value); // 输出: ./foo.js
  }
});</pre>
          </div>
          <div class="esmodule-note">
            <i class="icon info"></i>
            <span>只有 ESModule 的静态依赖（import/export）才能被准确分析，动态 <code>require</code> 或 <code>import()</code> 需特殊处理。</span>
          </div>
        </div>
      </section>

      <!-- INSERT_YOUR_CODE -->
      <!-- Acorn 解析器简介 -->
      <section class="card esmodule-analysis">
        <h2><i class="icon code"></i> Acorn 解析器简介</h2>
        <div class="esmodule-analysis-content">
          <p>
            <strong>Acorn</strong> 是一个轻量级、高性能的 JavaScript 解析器，能够将 JS 源码解析为抽象语法树（AST）。<br>
            它被广泛应用于 Webpack、Rollup、Babel 等主流前端工具中，作为底层的语法分析引擎。
          </p>
          <ul>
            <li>支持最新的 ECMAScript 标准，兼容性强</li>
            <li>体积小、速度快，适合在构建工具中集成</li>
            <li>可扩展性强，支持插件机制</li>
          </ul>
          <div class="code-block">
            <pre>// 使用 acorn 解析 JS 代码
const acorn = require('acorn');
const code = "export const a = 1;";
const ast = acorn.parse(code, { sourceType: 'module' });

console.log(ast); // 输出 AST 结构
</pre>
          </div>
          <div class="esmodule-note">
            <i class="icon info"></i>
            <span>Acorn 只负责“解析”源码，不做代码转换。它生成的 AST 可被其他工具（如 Webpack、Babel）进一步处理。</span>
          </div>
        </div>
      </section>

      <!-- 打包工具实现 -->
      <section class="card implementations">
        <h2><i class="icon tools"></i> 打包工具的实现</h2>
        <div class="tools">
          <div class="tool-card">
            <div class="tool-logo webpack"></div>
            <h3>Webpack</h3>
            <div class="implementation-details">
              <p><strong>实现方式：</strong> 结合 Terser 插件进行代码压缩和 Tree Shaking</p>
              <p><strong>配置：</strong></p>
              <pre class="code-block">// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // 启用 Tree Shaking
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};</pre>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-logo rollup"></div>
            <h3>Rollup</h3>
            <div class="implementation-details">
              <p><strong>实现方式：</strong> 内置 Tree Shaking 功能，基于 ES6 模块静态分析</p>
              <p><strong>配置：</strong></p>
              <pre class="code-block">// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'esm'
  },
  treeshake: true, // 启用 Tree Shaking
};</pre>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-logo vite"></div>
            <h3>Vite</h3>
            <div class="implementation-details">
              <p><strong>实现方式：</strong> 使用 Rollup 进行生产环境打包，继承其 Tree Shaking 能力</p>
              <p><strong>特点：</strong> 开箱即用，无需额外配置</p>
              <pre class="code-block">// vite 自动启用 Tree Shaking
// 只需确保使用 ES6 模块语法</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practices">
        <h2><i class="icon star"></i> Tree Shaking 最佳实践</h2>
        <div class="practices">
          <div class="practice">
            <div class="practice-icon">✓</div>
            <h3>使用 ES6 模块语法</h3>
            <p>确保你的代码使用 import/export 语法，而不是 CommonJS 的 require/module.exports。</p>
          </div>

          <div class="practice">
            <div class="practice-icon">✓</div>
            <h3>配置 package.json</h3>
            <p>在库的 package.json 中设置 "sideEffects" 属性，帮助打包工具识别无副作用的模块。</p>
            <pre class="code-block">{
  "name": "your-library",
  "sideEffects": false, // 所有文件都是无副作用的
  "sideEffects": [ // 或者指定有副作用的文件
    "*.css",
    "*.scss"
  ]
}</pre>
          </div>

          <div class="practice">
            <div class="practice-icon">✓</div>
            <h3>避免顶层副作用</h3>
            <p>避免在模块顶层执行有副作用的操作，这会影响 Tree Shaking 的效果。</p>
            <pre class="code-block">// 避免这样写
window.myPlugin = { ... };

// 改为导出一个函数
export function initPlugin() {
  window.myPlugin = { ... };
}</pre>
          </div>

          <div class="practice">
            <div class="practice-icon">✓</div>
            <h3>使用支持 Tree Shaking 的库</h3>
            <p>选择使用如 lodash-es 而不是 lodash，前者使用 ES 模块，更易于 Tree Shaking。</p>
            <div class="library-comparison">
              <div class="library bad">lodash (CommonJS)</div>
              <div class="vs">vs</div>
              <div class="library good">lodash-es (ES Modules)</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 限制与挑战 -->
      <section class="card limitations">
        <h2><i class="icon warning"></i> 限制与挑战</h2>
        <div class="limitations-grid">
          <div class="limitation">
            <h3>动态导入问题</h3>
            <p>打包工具无法分析动态导入的模块，这些模块可能不会被正确 Tree Shaking。</p>
            <pre class="code-block">// 无法静态分析
const module = await import(`./${name}.js`);</pre>
          </div>

          <div class="limitation">
            <h3>副作用处理</h3>
            <p>打包工具难以准确识别代码的副作用，可能保留看似未使用但有副作用的代码。</p>
            <pre class="code-block">// 有副作用的代码
let initialized = false;

export function init() {
  if (!initialized) {
    setupGlobal();
    initialized = true;
  }
}</pre>
          </div>

          <div class="limitation">
            <h3>CommonJS 模块</h3>
            <p>Tree Shaking 对 CommonJS 模块效果有限，因为其动态特性难以静态分析。</p>
            <pre class="code-block">// CommonJS 模块 - 难以 Tree Shaking
const _ = require('lodash');
_.debounce(...);</pre>
          </div>

          <div class="limitation">
            <h3>工具链依赖</h3>
            <p>Tree Shaking 效果取决于整个工具链的支持（Babel、压缩工具等）。</p>
            <div class="toolchain">
              <div class="tool">源代码</div>
              <div class="arrow">→</div>
              <div class="tool">Babel</div>
              <div class="arrow">→</div>
              <div class="tool">打包工具</div>
              <div class="arrow">→</div>
              <div class="tool">压缩工具</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚区域 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="summary">
          <h3>Tree Shaking 的核心价值</h3>
          <ul>
            <li>显著减小应用体积，提升加载性能</li>
            <li>消除未使用代码，减少解析和执行时间</li>
            <li>优化缓存利用率，提升用户体验</li>
            <li>促进模块化开发实践</li>
          </ul>
        </div>
        <div class="resources">
          <h3>学习资源</h3>
          <ul>
            <li><a href="#">Webpack Tree Shaking 文档</a></li>
            <li><a href="#">Rollup Tree Shaking 基础介绍</a></li>
            <li><a href="#">ES 模块与 Tree Shaking</a></li>
            <li><a href="#">Tree Shaking 性能优化实战</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        © 2023 前端性能优化指南 | 使用 Vue3 + TypeScript 实现
      </div>
    </footer>

    <!-- 交互控制 -->
    <div class="controls">
      <button class="shake-btn" @click="toggleShaking">
        {{ shaking ? '停止摇树' : '开始 Tree Shaking' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 响应式数据
const shaking = ref(false);
const leaves = ref([
  { id: 1, used: true },
  { id: 2, used: false },
  { id: 3, used: true },
  { id: 4, used: false },
  { id: 5, used: true },
  { id: 6, used: false },
  { id: 7, used: true },
  { id: 8, used: false },
]);

const modules = ref([
  { id: 1, used: true },
  { id: 2, used: true },
  { id: 3, used: false },
  { id: 4, used: true },
  { id: 5, used: false },
  { id: 6, used: false },
  { id: 7, used: true },
  { id: 8, used: false },
]);

// 切换摇树效果
const toggleShaking = () => {
  shaking.value = !shaking.value;
};

// 初始化效果
onMounted(() => {
  // 可以添加一些初始动画效果
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap');

.tree-shaking-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  min-height: 100vh;
  position: relative;
}

.esmodule-analysis {
  margin-top: 30px;
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.04);
  padding: 24px 28px;
}

.esmodule-analysis-content {
  font-size: 1rem;
  color: #333;
}

.analysis-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin: 18px 0 10px 0;
}

.analysis-steps .step {
  background: #e3eaf7;
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  align-items: flex-start;
  min-width: 180px;
  flex: 1;
}

.analysis-steps .step-icon {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 12px;
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.08);
}

.analysis-steps .step-content {
  flex: 1;
}

.esmodule-note {
  margin-top: 16px;
  background: #fffbe6;
  color: #ad8b00;
  border-left: 4px solid #ffe58f;
  padding: 10px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 0.98rem;
}

.esmodule-note .icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  background: linear-gradient(120deg, #3498db, #2c3e50);
  color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(52, 152, 219, 0.2);
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    margin-bottom: 30px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
}

.visualization {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 40px;
  height: 300px;
  position: relative;

  .tree {
    position: relative;
    width: 150px;
    height: 250px;

    .branch {
      position: absolute;
      bottom: 0;
      width: 20px;
      height: 150px;
      background: #8B4513;
      border-radius: 10px;

      &:nth-child(1) {
        left: 65px;
      }

      &:nth-child(2) {
        left: 40px;
        height: 120px;
        transform: rotate(-10deg);
      }

      &:nth-child(3) {
        left: 90px;
        height: 120px;
        transform: rotate(10deg);
      }
    }

    .leaves {
      position: absolute;
      bottom: 140px;
      left: 25px;
      width: 100px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .leaf {
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        margin: 3px;
        transition: all 1s ease;

        &.used {
          background: #27ae60;
          transform: rotate(0deg);
        }

        &.unused {
          background: #e74c3c;
        }

        &.shaking {
          animation: shake 0.5s ease-in-out infinite;
        }
      }
    }
  }

  .ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    background: #7f8c8d;
    border-radius: 10px;
  }

  .result {
    margin-left: 100px;
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bundle {
      width: 200px;
      height: 150px;
      background: #e0e7ff;
      border: 3px solid #3498db;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      transition: all 1s ease;

      &.shaked {
        height: 70px;
        background: #d4f7e7;
        border-color: #27ae60;
      }

      .module {
        width: 40px;
        height: 40px;
        margin: 5px;
        border-radius: 5px;
        transition: all 1s ease;

        &.used {
          background: #27ae60;
        }

        &:not(.used) {
          background: #e74c3c;

          .bundle.shaked & {
            opacity: 0;
            transform: scale(0);
          }
        }
      }
    }
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }

  25% {
    transform: translateX(-3px) rotate(-2deg);
  }

  50% {
    transform: translateX(3px) rotate(2deg);
  }

  75% {
    transform: translateX(-3px) rotate(-2deg);
  }
}

.content {
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(52, 152, 219, 0.1);
  }

  h2 {
    color: #3498db;
    font-size: 1.8rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    .icon {
      width: 36px;
      height: 36px;
      background: #d6eaf8;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      color: #3498db;
      font-size: 1.2rem;
    }
  }
}

.overview {
  .comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    margin-top: 25px;

    .comparison-item {
      background: #f8f9ff;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #e0e7ff;

      h3 {
        color: #2c3e50;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #3498db;
      }
    }

    .bundle-size {
      margin: 20px 0;

      .size-bar {
        height: 30px;
        border-radius: 15px;
        margin-bottom: 10px;

        &.full {
          width: 100%;
          background: linear-gradient(90deg, #3498db, #e74c3c);
        }

        &.partial {
          width: 30%;
          background: linear-gradient(90deg, #27ae60, #2ecc71);
        }
      }

      .size-label {
        text-align: center;
        font-weight: 500;
        color: #7f8c8d;
      }
    }
  }
}

.principles-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .principle {
    background: #f8f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e0e7ff;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
    }

    .principle-icon {
      width: 40px;
      height: 40px;
      background: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 15px;
      text-align: center;
    }

    p {
      color: #555;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .dependency-graph {
    text-align: center;
    margin-top: 15px;

    .entry,
    .module {
      padding: 10px 15px;
      background: #3498db;
      color: white;
      border-radius: 5px;
      display: inline-block;
      margin: 5px;
      font-weight: 500;
    }

    .entry {
      background: #e74c3c;
    }

    .dependencies {
      margin-top: 10px;
    }
  }

  .mark-and-sweep {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

    .code-paths {
      .path {
        padding: 8px 12px;
        margin: 5px 0;
        border-radius: 5px;
        font-size: 0.9rem;

        &.used {
          background: #d5f5e3;
          color: #27ae60;
        }

        &.unused {
          background: #fadbd8;
          color: #e74c3c;
        }
      }
    }

    .arrow {
      font-size: 2rem;
      color: #3498db;
      margin: 0 20px;
    }

    .result {
      background: #d5f5e3;
      padding: 10px 20px;
      border-radius: 5px;
      color: #27ae60;
      font-weight: 500;
    }
  }
}

.implementations {
  .tools {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .tool-card {
    background: #f8f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e0e7ff;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
    }

    .tool-logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto 20px;
      background: #3498db;
      position: relative;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        color: white;
        font-size: 1.2rem;
      }

      &.webpack::after {
        content: "W";
        font-size: 2rem;
      }

      &.rollup::after {
        content: "R";
      }

      &.vite::after {
        content: "V";
        font-size: 2rem;
      }
    }

    h3 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}

.best-practices {
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .practice {
    background: #f8f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e0e7ff;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
    }

    .practice-icon {
      width: 40px;
      height: 40px;
      background: #27ae60;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }

    h3 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 15px;
    }

    p {
      color: #555;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .library-comparison {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    .library {
      padding: 10px 15px;
      border-radius: 5px;
      font-weight: 500;

      &.bad {
        background: #fadbd8;
        color: #e74c3c;
      }

      &.good {
        background: #d5f5e3;
        color: #27ae60;
      }
    }

    .vs {
      margin: 0 15px;
      color: #7f8c8d;
    }
  }
}

.limitations {
  .limitations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .limitation {
    background: #f8f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e0e7ff;

    h3 {
      color: #e74c3c;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fadbd8;
    }
  }

  .toolchain {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    .tool {
      padding: 8px 15px;
      background: #3498db;
      color: white;
      border-radius: 5px;
      font-weight: 500;
    }

    .arrow {
      margin: 0 10px;
      color: #7f8c8d;
    }
  }
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 15px 0;

  .highlight {
    background: #e74c3c;
    padding: 2px 4px;
    border-radius: 3px;
    color: white;
  }
}

.footer {
  background: #2c3e50;
  color: white;
  border-radius: 16px;
  padding: 40px 30px 20px;
  margin-top: 30px;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-bottom: 30px;
  }

  .summary,
  .resources {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #3498db;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .resources a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
}

.controls {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;

  .shake-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    transition: all 0.3s ease;

    &:hover {
      background: #2980b9;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(52, 152, 219, 0.6);
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .visualization {
    flex-direction: column;
    align-items: center;
    height: auto;

    .result {
      margin-left: 0;
      margin-top: 40px;
    }
  }

  .controls {
    position: static;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
