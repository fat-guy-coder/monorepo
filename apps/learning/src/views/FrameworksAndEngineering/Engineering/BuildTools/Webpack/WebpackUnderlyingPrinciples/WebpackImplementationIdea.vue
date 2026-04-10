<template>
  <div class="webpack-implementation">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Webpack 核心实现原理</h1>
        <p>深入理解现代前端构建工具的底层机制</p>
        <div class="hero-stats">
          <div class="stat">
            <div class="number">2000+</div>
            <div class="label">开源插件</div>
          </div>
          <div class="stat">
            <div class="number">80%+</div>
            <div class="label">现代项目使用率</div>
          </div>
          <div class="stat">
            <div class="number">10M+</div>
            <div class="label">周下载量</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="webpack-logo">
          <div class="cube">
            <div class="face top"></div>
            <div class="face left"></div>
            <div class="face right"></div>
          </div>
          <div class="logo-text">Webpack</div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="section core-concepts">
        <h2 class="section-title">
          <span class="icon">🧠</span> Webpack 核心思想
        </h2>

        <div class="concepts-grid">
          <div class="concept-card" v-for="(concept, idx) in coreConcepts" :key="idx">
            <div class="concept-icon">{{ concept.icon }}</div>
            <h3>{{ concept.title }}</h3>
            <p>{{ concept.description }}</p>
            <div class="concept-visual" v-if="concept.visual">
              <div class="visual-item" v-for="(item, i) in concept.visual" :key="i">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section workflow">
        <h2 class="section-title">
          <span class="icon">🔄</span> Webpack 工作流程
        </h2>

        <div class="workflow-steps">
          <div class="step" v-for="(step, idx) in workflowSteps" :key="idx">
            <div class="step-header">
              <div class="step-number">{{ idx + 1 }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <div class="step-content">
              <p>{{ step.description }}</p>
              <div class="step-hooks" v-if="step.hooks">
                <div class="hook" v-for="(hook, hIdx) in step.hooks" :key="hIdx">
                  {{ hook }}
                </div>
              </div>
              <div class="step-code" v-if="step.code">
                <pre><code class="language-javascript">{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="module-graph">
          <h3>模块依赖图解析</h3>
          <div class="graph-container">
            <div class="entry">入口文件<br><span>index.js</span></div>
            <div class="dependencies">
              <div class="module" v-for="(mod, idx) in modules" :key="idx">
                <div class="module-name">{{ mod.name }}</div>
                <div class="module-deps">
                  <div class="dep" v-for="(dep, dIdx) in mod.deps" :key="dIdx">
                    {{ dep }}
                  </div>
                </div>
              </div>
            </div>
            <div class="chunks">
              <div class="chunk">主 chunk</div>
              <div class="chunk">异步 chunk</div>
            </div>
            <div class="bundle">输出 bundle.js</div>
          </div>
        </div>
      </div>

      <div class="section compilation">
        <h2 class="section-title">
          <span class="icon">⚙️</span> 编译过程基础介绍
        </h2>

        <div class="compilation-process">
          <div class="process-column">
            <h3>模块解析</h3>
            <div class="process-card">
              <h4>文件系统解析</h4>
              <p>Webpack 根据配置的入口文件开始解析，使用 enhanced-resolve 库处理模块路径</p>
              <pre><code class="language-javascript">resolve: {
  extensions: ['.js', '.jsx', '.ts'],
  modules: ['node_modules'],
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}</code></pre>
            </div>

            <div class="process-card">
              <h4>Loader 处理链</h4>
              <p>匹配文件类型后，按配置顺序应用 loader 进行处理</p>
              <pre><code class="language-javascript">module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}</code></pre>
            </div>
          </div>

          <div class="process-column">
            <h3>抽象语法树</h3>
            <div class="process-card">
              <h4>AST 转换</h4>
              <p>使用 acorn 解析 JavaScript 生成 AST，通过遍历 AST 分析依赖关系</p>
              <div class="ast-example">
                <div class="ast-code">
                  <pre><code class="language-javascript">// 原始代码
import Header from './Header';
const button = document.createElement('button');</code></pre>
                </div>
                <div class="ast-arrow">⇒</div>
                <div class="ast-visual">
                  <div class="ast-node">ImportDeclaration</div>
                  <div class="ast-node">VariableDeclaration</div>
                </div>
              </div>
            </div>

            <div class="process-card">
              <h4>依赖收集</h4>
              <p>在 AST 中识别 import/require 语句，收集模块依赖</p>
              <pre><code class="language-javascript">// 收集到的依赖
[
  './Header.js',
  'react'
]</code></pre>
            </div>
          </div>

          <div class="process-column">
            <h3>代码生成</h3>
            <div class="process-card">
              <h4>模块封装</h4>
              <p>Webpack 使用函数封装每个模块，实现作用域隔离</p>
              <pre><code class="language-javascript">/******/ (function(module, exports, __webpack_require__) {

  // 模块代码
  const Header = __webpack_require__(/*! ./Header */ "./src/Header.js");

/******/ });</code></pre>
            </div>

            <div class="process-card">
              <h4>运行时注入</h4>
              <p>添加模块加载、缓存等运行时逻辑</p>
              <pre><code class="language-javascript">// Webpack 运行时
var __webpack_modules__ = ({});
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // 检查缓存
  if (__webpack_module_cache__[moduleId]) {
    return __webpack_module_cache__[moduleId].exports;
  }
  // 创建新模块并缓存
  var module = {
    exports: {}
  };
  __webpack_module_cache__[moduleId] = module;
  // 执行模块函数
  __webpack_modules__[moduleId](module, exports, __webpack_require__);
  return module.exports;
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section tapable-system">
        <h2 class="section-title">
          <span class="icon">🔌</span> Tapable 插件系统
        </h2>

        <div class="tapable-explanation">
          <div class="tapable-card">
            <h3>事件驱动架构</h3>
            <p>Webpack 基于 Tapable 库实现事件发布订阅机制，在整个构建生命周期中暴露了数百个钩子</p>
            <div class="hook-types">
              <div class="hook-type">
                <h4>同步钩子</h4>
                <ul>
                  <li>SyncHook</li>
                  <li>SyncBailHook</li>
                  <li>SyncWaterfallHook</li>
                </ul>
              </div>
              <div class="hook-type">
                <h4>异步钩子</h4>
                <ul>
                  <li>AsyncParallelHook</li>
                  <li>AsyncSeriesHook</li>
                  <li>AsyncSeriesWaterfallHook</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="tapable-card">
            <h3>插件实现机制</h3>
            <p>插件通过 tap 方法订阅特定生命周期事件</p>
            <pre><code class="language-javascript">class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // 在生成资源到输出目录前执行
      console.log('准备生成文件...');
    });
  }
}</code></pre>
          </div>

          <div class="tapable-card">
            <h3>插件执行流程</h3>
            <div class="plugin-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <p>Webpack 创建 compiler 实例</p>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <p>加载配置中的插件，调用 apply 方法</p>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <p>插件注册钩子监听器</p>
              </div>
              <div class="flow-step">
                <div class="step-number">4</div>
                <p>构建过程中触发对应钩子</p>
              </div>
              <div class="flow-step">
                <div class="step-number">5</div>
                <p>执行插件注册的回调函数</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section bundle-analysis">
        <h2 class="section-title">
          <span class="icon">📊</span> Bundle 分析
        </h2>

        <div class="bundle-content">
          <div class="bundle-stats">
            <h3>典型 Bundle 结构</h3>
            <div class="bundle-chart">
              <div class="chart-item" style="width: 40%; background: #3498db;">
                <div class="chart-label">应用代码 (40%)</div>
              </div>
              <div class="chart-item" style="width: 35%; background: #2ecc71;">
                <div class="chart-label">依赖库 (35%)</div>
              </div>
              <div class="chart-item" style="width: 15%; background: #e74c3c;">
                <div class="chart-label">Webpack 运行时 (15%)</div>
              </div>
              <div class="chart-item" style="width: 10%; background: #f39c12;">
                <div class="chart-label">模块映射 (10%)</div>
              </div>
            </div>
          </div>

          <div class="bundle-code">
            <h3>生成代码结构</h3>
            <pre><code class="language-javascript">(function(modules) { // webpackBootstrap
  // 模块缓存
  var installedModules = {};

  // require 函数
  function __webpack_require__(moduleId) {
    // ...模块加载逻辑
  }

  // 入口模块执行
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
  "./src/index.js": (function(module, exports, __webpack_require__) {
    // 模块代码
  }),
  "./src/Header.js": (function(module, exports, __webpack_require__) {
    // 模块代码
  }),
  "react": (function(module, exports) {
    // 模块代码
  })
});</code></pre>
          </div>
        </div>
      </div>

      <div class="section evolution">
        <h2 class="section-title">
          <span class="icon">🚀</span> Webpack 的演进
        </h2>

        <div class="timeline">
          <div class="timeline-item" v-for="(item, idx) in timeline" :key="idx">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>深入理解 Webpack 的实现原理，有助于开发更高效的前端构建流程和定制化插件</p>
      <div class="footer-links">
        <a href="#">Webpack 源码</a>
        <a href="#">Tapable 文档</a>
        <a href="#">高级优化指南</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 核心概念
const coreConcepts = ref([
  {
    icon: '📦',
    title: '一切皆模块',
    description: 'Webpack 将所有资源（JS、CSS、图片等）视为模块，统一处理依赖关系',
    visual: ['JS', 'CSS', 'PNG', 'SVG', 'FONT']
  },
  {
    icon: '🧩',
    title: '依赖图谱',
    description: '从入口文件开始，递归构建模块依赖图，描述所有资源的依赖关系',
    visual: ['入口', '模块', '依赖', '依赖', '依赖']
  },
  {
    icon: '🏗️',
    title: '可扩展的插件系统',
    description: '基于 Tapable 的插件架构，允许在编译生命周期中注入自定义逻辑',
    visual: ['Loader', 'Plugin', 'Plugin', 'Plugin', 'Optimize']
  },
  {
    icon: '🧠',
    title: '基于事件的工作流',
    description: '通过事件钩子驱动整个编译过程，每个阶段都有对应的生命周期事件',
    visual: ['初始化', '编译', '优化', '输出', '完成']
  }
]);

// 工作流程步骤
const workflowSteps = ref([
  {
    title: '初始化',
    description: '读取配置，创建 Compiler 实例，加载插件，初始化环境参数',
    hooks: ['environment', 'afterEnvironment', 'initialize'],
    code: `const compiler = webpack(config);`
  },
  {
    title: '开始编译',
    description: '确定入口文件，创建 Compilation 对象，开始构建过程',
    hooks: ['beforeRun', 'run', 'compile'],
    code: `compiler.run((err, stats) => {
  // 编译完成回调
});`
  },
  {
    title: '模块解析',
    description: '解析入口文件，使用 loader 转换模块，递归收集所有依赖',
    hooks: ['make', 'finishMake', 'buildModule'],
    code: `// 使用 enhanced-resolve 解析模块路径
const resolver = resolverFactory.get('normal');`
  },
  {
    title: '构建依赖图',
    description: '根据模块依赖关系构建依赖图谱，包括所有模块的引用关系',
    hooks: ['finishModules', 'seal'],
    code: `// 依赖图数据结构
class ModuleGraph {
  constructor() {
    this._modules = new Map();
  }
}`
  },
  {
    title: '优化处理',
    description: '对模块和 chunk 进行优化（Tree Shaking、代码分割等）',
    hooks: ['optimize', 'optimizeModules', 'optimizeChunks'],
    code: `// Tree Shaking 标记未使用导出
if (!module.isUsed(exportName)) {
  // 标记为未使用
}`
  },
  {
    title: '代码生成',
    description: '根据依赖图生成最终 bundle，包含模块封装代码和运行时',
    hooks: ['afterCompile', 'emit', 'afterEmit'],
    code: `// 生成模块代码
source = this.generateModuleCode(module);`
  },
  {
    title: '输出文件',
    description: '将生成的 bundle 写入文件系统，完成整个构建过程',
    hooks: ['done', 'assetEmitted'],
    code: `// 写入输出文件
compiler.outputFileSystem.writeFile(...);`
  }
]);

// 模块数据
const modules = ref([
  { name: 'Header.js', deps: ['React', 'Logo.svg'] },
  { name: 'App.js', deps: ['Header.js', 'Footer.js', 'utils.js'] },
  { name: 'utils.js', deps: ['lodash'] },
  { name: 'Footer.js', deps: ['React', 'Links.js'] }
]);

// 时间线
const timeline = ref([
  {
    year: '2012',
    title: 'Webpack 诞生',
    description: 'Tobias Koppers 创建 Webpack，解决代码分割问题'
  },
  {
    year: '2014',
    title: 'Webpack 1.0',
    description: '正式发布，引入 Loader 系统'
  },
  {
    year: '2016',
    title: 'Webpack 2.0',
    description: '支持 ES Modules，Tree Shaking，性能改进'
  },
  {
    year: '2017',
    title: 'Webpack 3.0',
    description: '引入 Scope Hoisting，模块连接优化'
  },
  {
    year: '2018',
    title: 'Webpack 4.0',
    description: '零配置启动，模式区分，性能大幅提升'
  },
  {
    year: '2020',
    title: 'Webpack 5.0',
    description: '模块联邦，持久化缓存，改进 Tree Shaking'
  },
  {
    year: '2022',
    title: 'Webpack 5.64+',
    description: '持续优化，改进构建性能和开发体验'
  }
]);
</script>

<style lang="less" scoped>


.webpack-implementation {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: #f8f9fa;
  line-height: 1.6;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #1a237e, #283593);
    border-radius: 16px;
    padding: 2.5rem;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    .hero-content {
      flex: 1;
      min-width: 300px;

      h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }

      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;

        .stat {
          .number {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .label {
            font-size: 1rem;
            opacity: 0.85;
          }
        }
      }
    }

    .hero-visual {
      flex: 1;
      min-width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .webpack-logo {
        position: relative;
        width: 280px;
        height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .cube {
          position: relative;
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          transform: rotateX(-30deg) rotateY(-30deg);
          animation: rotate 8s infinite linear;

          .face {
            position: absolute;
            width: 150px;
            height: 150px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            backdrop-filter: blur(5px);
          }

          .top {
            transform: rotateX(90deg) translateZ(75px);
            background: rgba(142, 68, 173, 0.3);
          }

          .left {
            transform: rotateY(-90deg) translateZ(75px);
            background: rgba(52, 152, 219, 0.3);
          }

          .right {
            transform: rotateX(0deg) translateZ(75px);
            background: rgba(46, 204, 113, 0.3);
          }

          @keyframes rotate {
            from {
              transform: rotateX(-30deg) rotateY(0deg);
            }

            to {
              transform: rotateX(-30deg) rotateY(360deg);
            }
          }
        }

        .logo-text {
          margin-top: 2rem;
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .content-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;

      .icon {
        font-size: 1.8rem;
      }
    }
  }

  .core-concepts {
    .concepts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .concept-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
        border-top: 4px solid #3498db;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .concept-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          min-height: 60px;
        }

        .concept-visual {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;

          .visual-item {
            background: #e3f2fd;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
          }
        }
      }
    }
  }

  .workflow {
    .workflow-steps {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;

      .step {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #3498db;

        .step-header {
          padding: 1.2rem 1.5rem;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;

          .step-number {
            width: 30px;
            height: 30px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-right: 1rem;
          }

          h3 {
            margin: 0;
            font-size: 1.3rem;
            color: #2c3e50;
          }
        }

        .step-content {
          padding: 1.5rem;

          p {
            color: #4a5568;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          .step-hooks {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;

            .hook {
              background: #e3f2fd;
              padding: 0.4rem 0.8rem;
              border-radius: 4px;
              font-size: 0.85rem;
              font-family: 'Fira Code', monospace;
            }
          }

          .step-code {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.9rem;

            pre {
              margin: 0;

              code {
                font-family: 'Fira Code', monospace;
              }
            }
          }
        }
      }
    }

    .module-graph {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
      }

      .graph-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;

        >div {
          padding: 1rem 2rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        .entry {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          font-size: 1.1rem;

          span {
            font-size: 0.9rem;
            opacity: 0.9;
          }
        }

        .dependencies {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          background: #f8f9fa;
          width: 100%;
          padding: 1.5rem;

          .module {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
            min-width: 150px;

            .module-name {
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            .module-deps {
              display: flex;
              flex-direction: column;
              gap: 0.3rem;

              .dep {
                background: #e3f2fd;
                padding: 0.3rem;
                border-radius: 4px;
                font-size: 0.85rem;
              }
            }
          }
        }

        .chunks {
          display: flex;
          gap: 2rem;

          .chunk {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            padding: 1rem 2rem;
          }
        }

        .bundle {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          font-size: 1.1rem;
          padding: 1.2rem 3rem;
        }
      }
    }
  }

  .compilation {
    .compilation-process {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .process-column {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
          padding-left: 0.5rem;
          border-left: 4px solid #3498db;
        }
      }

      .process-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h4 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          margin-bottom: 1rem;
        }

        pre {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;

          code {
            font-family: 'Fira Code', monospace;
          }
        }

        .ast-example {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;

          .ast-code {
            flex: 1;
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            font-size: 0.85rem;
          }

          .ast-arrow {
            font-size: 1.5rem;
            color: #7f8c8d;
          }

          .ast-visual {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .ast-node {
              background: #e3f2fd;
              padding: 0.8rem;
              border-radius: 8px;
              text-align: center;
              font-family: 'Fira Code', monospace;
            }
          }
        }
      }
    }
  }

  .tapable-system {
    .tapable-explanation {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .tapable-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          margin-bottom: 1rem;
        }

        .hook-types {
          display: flex;
          gap: 1rem;

          .hook-type {
            flex: 1;
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;

            h4 {
              margin-top: 0;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            ul {
              padding-left: 1.2rem;
              margin: 0;

              li {
                margin-bottom: 0.3rem;
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
              }
            }
          }
        }

        pre {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;

          code {
            font-family: 'Fira Code', monospace;
          }
        }

        .plugin-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;

          .flow-step {
            text-align: center;

            .step-number {
              width: 30px;
              height: 30px;
              background: #3498db;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              margin: 0 auto 0.5rem;
            }

            p {
              margin: 0;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  .bundle-analysis {
    .bundle-content {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;

      .bundle-stats {
        flex: 1;
        min-width: 300px;

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        .bundle-chart {
          height: 50px;
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

          .chart-item {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
            font-size: 0.9rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

            .chart-label {
              padding: 0 0.5rem;
              text-align: center;
            }
          }
        }
      }

      .bundle-code {
        flex: 1;
        min-width: 300px;

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        pre {
          background: #2d2d2d;
          border-radius: 8px;
          padding: 1.5rem;
          overflow-x: auto;

          code {
            font-family: 'Fira Code', monospace;
            color: #f8f8f2;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .evolution {
    .timeline {
      position: relative;
      padding-left: 20px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: #3498db;
        border-radius: 2px;
      }

      .timeline-item {
        position: relative;
        margin-bottom: 2rem;
        padding-left: 30px;

        &::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3498db;
          border: 4px solid white;
          box-shadow: 0 0 0 2px #3498db;
        }

        .timeline-year {
          position: absolute;
          left: -70px;
          top: 5px;
          background: #3498db;
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .timeline-content {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            color: #4a5568;
            margin: 0;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #e74c3c;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .webpack-implementation {
    padding: 10px;

    .hero-section {
      padding: 1.5rem;

      .hero-content {
        h1 {
          font-size: 2rem;
        }

        p {
          font-size: 1.1rem;
        }

        .hero-stats {
          flex-wrap: wrap;
          gap: 1rem;
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.6rem;
    }

    .timeline {
      padding-left: 10px;

      .timeline-item {
        padding-left: 20px;

        .timeline-year {
          position: relative;
          left: 0;
          top: 0;
          display: inline-block;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
