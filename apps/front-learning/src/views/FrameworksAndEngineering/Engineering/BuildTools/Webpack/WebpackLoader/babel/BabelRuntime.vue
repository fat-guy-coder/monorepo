<template>
  <div class="babel-runtime-container">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1>Babel Runtime 基础介绍</h1>
        <p class="subtitle">深入解析 Babel Runtime 的原理、配置方法与核心功能</p>
        <div class="babel-logo">
          <div class="babel-circle">
            <span>Babel</span>
          </div>
          <div class="runtime-text">Runtime</div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="content">
      <!-- 概述部分 -->
      <section class="card overview">
        <h2><i class="icon info"></i> Babel Runtime 概述</h2>
        <div class="overview-content">
          <div class="definition">
            <p><strong>Babel Runtime</strong> 是一个用于转换 ECMAScript 2015+ 代码的工具库，它通过外部依赖的方式提供辅助函数和内置对象的
              polyfill，从而减少代码冗余并优化打包体积。</p>
          </div>
          <div class="comparison">
            <div class="comparison-item">
              <h3>使用 Babel Runtime</h3>
              <div class="code-block">
                <pre>// 转换前
class Example {}

// 转换后
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';

function _classCallCheck(instance, Constructor) {
  //...
}

var Example = function Example() {
  _classCallCheck(this, Example);
};</pre>
              </div>
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>避免辅助函数重复</li>
                  <li>减小打包体积</li>
                  <li>避免全局污染</li>
                </ul>
              </div>
            </div>
            <div class="comparison-item">
              <h3>不使用 Babel Runtime</h3>
              <div class="code-block">
                <pre>// 转换前
class Example {}

// 转换后
function _classCallCheck(instance, Constructor) {
  //...
}

var Example = function Example() {
  _classCallCheck(this, Example);
};

// 每个文件都会生成自己的辅助函数</pre>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>辅助函数重复出现</li>
                  <li>打包体积增大</li>
                  <li>全局命名空间污染</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作原理 -->
      <section class="card principles">
        <h2><i class="icon gear"></i> 工作原理</h2>
        <div class="principles-content">
          <div class="principle">
            <div class="principle-icon">1</div>
            <h3>辅助函数提取</h3>
            <p>Babel 在转换代码时，将原本内联生成的辅助函数替换为从 babel-runtime 导入的公共函数</p>
          </div>
          <div class="principle">
            <div class="principle-icon">2</div>
            <h3>内置对象转换</h3>
            <p>通过 core-js 提供对 Promise、Map、Set 等新特性的 polyfill，避免全局污染</p>
          </div>
          <div class="principle">
            <div class="principle-icon">3</div>
            <h3>模块化导入</h3>
            <p>所有辅助函数和 polyfill 都通过 ES6 模块方式导入，确保按需加载</p>
          </div>
          <div class="principle">
            <div class="principle-icon">4</div>
            <h3>运行时依赖</h3>
            <p>作为项目依赖而非开发依赖，确保在生产环境中可用</p>
          </div>

          <div class="workflow">
            <h3>Babel Runtime 工作流程</h3>
            <div class="workflow-diagram">
              <div class="step">
                <div class="step-label">源代码</div>
                <div class="step-content">ES6+ 语法 (class, async/await, etc.)</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-label">Babel 转换</div>
                <div class="step-content">使用 @babel/plugin-transform-runtime</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-label">输出代码</div>
                <div class="step-content">ES5 语法 + babel-runtime 导入</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置方法 -->
      <section class="card configuration">
        <h2><i class="icon settings"></i> 配置方法</h2>
        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>安装依赖</h3>
            <pre class="code-block">npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime</pre>
            <p>@babel/runtime 是运行时依赖，@babel/plugin-transform-runtime 是开发依赖</p>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>配置 .babelrc</h3>
            <pre class="code-block">{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3,         // 使用 core-js@3 提供 polyfill
      "helpers": true,     // 自动替换辅助函数
      "regenerator": true  // 使用 regenerator 处理 async/await
    }]
  ]
}</pre>
            <p>corejs 选项可以是 false（默认）、2 或 3，推荐使用 corejs: 3</p>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>Webpack 配置</h3>
            <pre class="code-block">// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-transform-runtime', {
                corejs: 3
              }]
            ]
          }
        }
      }
    ]
  }
}</pre>
          </div>
        </div>

        <div class="config-options">
          <h3>配置选项基础介绍</h3>
          <table>
            <thead>
              <tr>
                <th>选项</th>
                <th>类型</th>
                <th>默认值</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>corejs</td>
                <td>boolean/number</td>
                <td>false</td>
                <td>使用 core-js 的版本 (false, 2, 3)</td>
              </tr>
              <tr>
                <td>helpers</td>
                <td>boolean</td>
                <td>true</td>
                <td>是否自动替换 Babel 辅助函数</td>
              </tr>
              <tr>
                <td>regenerator</td>
                <td>boolean</td>
                <td>true</td>
                <td>是否转换 generator 函数</td>
              </tr>
              <tr>
                <td>useESModules</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否使用 ES 模块语法</td>
              </tr>
              <tr>
                <td>absoluteRuntime</td>
                <td>boolean/string</td>
                <td>false</td>
                <td>是否使用绝对路径引用运行时</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 核心功能 -->
      <section class="card features">
        <h2><i class="icon feature"></i> 核心功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon helpers"></div>
            <h3>辅助函数复用</h3>
            <p>提取 Babel 编译生成的辅助函数到公共模块，避免在每个文件中重复定义</p>
            <div class="feature-code">
              <div class="before">转换前: class MyClass {}</div>
              <div class="after">转换后: import _classCallCheck from 'babel-runtime/helpers/classCallCheck'</div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon polyfill"></div>
            <h3>内置对象 Polyfill</h3>
            <p>通过 core-js 提供 Promise、Symbol、Map、Set 等新特性的实现，不污染全局环境</p>
            <div class="feature-code">
              <div class="before">转换前: new Promise(...)</div>
              <div class="after">转换后: import _Promise from 'babel-runtime/core-js/promise'</div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon regenerator"></div>
            <h3>Generator 支持</h3>
            <p>转换 async/await 和 generator 函数，提供兼容旧浏览器的解决方案</p>
            <div class="feature-code">
              <div class="before">转换前: async function fetchData() {}</div>
              <div class="after">转换后: import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator'</div>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon sandbox"></div>
            <h3>沙箱环境</h3>
            <p>所有 polyfill 都在模块内部使用，避免与全局内置对象冲突</p>
            <div class="feature-code">
              <pre>// 不会修改全局 Promise
import _Promise from 'core-js-pure/features/promise'

const p = new _Promise(...)</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practices">
        <h2><i class="icon star"></i> 最佳实践</h2>
        <div class="practices">
          <div class="practice">
            <h3>库开发</h3>
            <p>在开发供他人使用的库时，必须使用 babel-runtime 避免污染全局环境</p>
            <div class="practice-detail">
              <pre>// 正确做法
export class MyLibrary {
  // 使用 babel-runtime 提供的辅助函数
}

// 错误做法
// 污染全局 Promise
if (!window.Promise) {
  window.Promise = MyPromisePolyfill;
}</pre>
            </div>
          </div>

          <div class="practice">
            <h3>应用开发</h3>
            <p>在应用开发中，babel-runtime 与 @babel/polyfill 配合使用：</p>
            <div class="practice-detail">
              <pre>// 入口文件
import '@babel/polyfill'; // 全局 polyfill

// 其他文件
// 使用 babel-runtime 处理辅助函数和局部 polyfill</pre>
            </div>
          </div>

          <div class="practice">
            <h3>core-js 版本选择</h3>
            <p>根据项目需求选择合适的 core-js 版本：</p>
            <div class="version-comparison">
              <div class="version">
                <h4>corejs: false</h4>
                <ul>
                  <li>仅处理辅助函数</li>
                  <li>不提供内置对象 polyfill</li>
                  <li>最小化依赖</li>
                </ul>
              </div>
              <div class="version">
                <h4>corejs: 2</h4>
                <ul>
                  <li>支持 ES6+ 内置对象</li>
                  <li>稳定但不再更新</li>
                  <li>文件体积较大</li>
                </ul>
              </div>
              <div class="version">
                <h4>corejs: 3</h4>
                <ul>
                  <li>支持最新 ECMAScript 特性</li>
                  <li>提案阶段特性的 polyfill</li>
                  <li>推荐用于新项目</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 与 Polyfill 对比 -->
      <section class="card comparison">
        <h2><i class="icon compare"></i> Babel Runtime vs Babel Polyfill</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Babel Runtime</th>
                <th>Babel Polyfill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>实现方式</td>
                <td>模块化导入</td>
                <td>全局修改</td>
              </tr>
              <tr>
                <td>污染全局</td>
                <td>否</td>
                <td>是</td>
              </tr>
              <tr>
                <td>辅助函数处理</td>
                <td>提取为公共模块</td>
                <td>不处理</td>
              </tr>
              <tr>
                <td>打包体积</td>
                <td>按需加载，体积小</td>
                <td>整个 polyfill，体积大</td>
              </tr>
              <tr>
                <td>适用场景</td>
                <td>库开发、应用局部</td>
                <td>应用全局 polyfill</td>
              </tr>
              <tr>
                <td>使用方式</td>
                <td>Babel 插件自动转换</td>
                <td>入口文件引入</td>
              </tr>
              <tr>
                <td>依赖安装</td>
                <td>@babel/runtime + @babel/plugin-transform-runtime</td>
                <td>@babel/polyfill</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="conclusion">
          <h3>使用建议：</h3>
          <p>在库开发中只使用 <strong>babel-runtime</strong>，避免污染用户环境；在应用开发中结合使用 <strong>@babel/polyfill</strong>（全局）和
            <strong>babel-runtime</strong>（局部辅助函数）
          </p>
        </div>
      </section>
    </main>

    <!-- 页脚区域 -->
    <footer class="footer">
      <div class="summary">
        <h3>Babel Runtime 核心价值</h3>
        <ul>
          <li>减少代码冗余，优化打包体积</li>
          <li>避免全局命名空间污染</li>
          <li>提供可预测的模块化 polyfill</li>
          <li>支持库的安全发布</li>
          <li>灵活的 core-js 版本选择</li>
        </ul>
      </div>
      <div class="resources">
        <h3>学习资源</h3>
        <ul>
          <li><a href="#">Babel 官方文档</a></li>
          <li><a href="#">core-js 项目仓库</a></li>
          <li><a href="#">Babel Runtime 配置指南</a></li>
          <li><a href="#">现代 JavaScript 编译最佳实践</a></li>
        </ul>
      </div>
      <div class="copyright">
         Babel 生态系统指南 | 使用 Vue3 + TypeScript 实现
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 响应式数据
const corejsVersion = ref(3);
const isHelpersEnabled = ref(true);
const isRegeneratorEnabled = ref(true);

// 配置示例
const babelConfig = ref({
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: corejsVersion.value,
        helpers: isHelpersEnabled.value,
        regenerator: isRegeneratorEnabled.value
      }
    ]
  ]
});
</script>

<style lang="less" scoped>


.babel-runtime-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  background: linear-gradient(120deg, #f9dc5c, #f46036);
  color: #2a2d34;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(244, 96, 54, 0.2);
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
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

.babel-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  .babel-circle {
    width: 120px;
    height: 120px;
    background: #2a2d34;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f9dc5c;
    font-weight: 700;
    font-size: 1.8rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .runtime-text {
    margin-top: 15px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #2a2d34;
    background: rgba(249, 220, 92, 0.7);
    padding: 8px 25px;
    border-radius: 30px;
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
    box-shadow: 0 12px 40px rgba(244, 96, 54, 0.1);
  }

  h2 {
    color: #f46036;
    font-size: 1.8rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    .icon {
      width: 36px;
      height: 36px;
      background: #fef0db;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      color: #f46036;
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
      background: #f9f9ff;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #eee;

      h3 {
        color: #2a2d34;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f9dc5c;
      }
    }

    .pros,
    .cons {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;

      h4 {
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }

      ul {
        list-style: none;
        padding-left: 0;

        li {
          padding: 8px 0;
          display: flex;
          align-items: center;

          &::before {
            content: '✓';
            color: #4caf50;
            margin-right: 10px;
            font-weight: bold;
          }
        }
      }
    }

    .pros {
      background: #e8f5e9;

      h4::before {
        content: '✓';
        color: #4caf50;
        font-weight: bold;
      }
    }

    .cons {
      background: #ffebee;

      h4::before {
        content: '✗';
        color: #f44336;
        font-weight: bold;
      }

      li::before {
        content: '✗';
        color: #f44336;
      }
    }
  }
}

.principles-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .principle {
    background: #f9f9ff;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #eee;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }

    .principle-icon {
      width: 50px;
      height: 50px;
      background: #f46036;
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
      color: #2a2d34;
      margin-bottom: 15px;
    }

    p {
      color: #555;
      font-size: 0.95rem;
    }
  }

  .workflow {
    grid-column: 1 / -1;
    margin-top: 30px;

    h3 {
      color: #2a2d34;
      text-align: center;
      margin-bottom: 25px;
    }
  }

  .workflow-diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;

    .step {
      text-align: center;
      flex: 1;

      .step-label {
        font-weight: 700;
        color: #f46036;
        margin-bottom: 10px;
        font-size: 1.1rem;
      }

      .step-content {
        background: #f9f9ff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .arrow {
      font-size: 2rem;
      color: #f9dc5c;
      font-weight: bold;
    }
  }
}

.configuration {
  .config-steps {
    display: grid;
    gap: 30px;

    .step {
      background: #f9f9ff;
      padding: 25px;
      border-radius: 12px;
      position: relative;
      border: 1px solid #eee;

      .step-number {
        position: absolute;
        top: -15px;
        left: 20px;
        width: 40px;
        height: 40px;
        background: #f46036;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
      }

      h3 {
        color: #2a2d34;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      p {
        color: #666;
        margin-top: 15px;
        font-size: 0.95rem;
      }
    }
  }

  .config-options {
    margin-top: 40px;

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;

      th,
      td {
        border: 1px solid #eee;
        padding: 15px;
        text-align: left;
      }

      th {
        background: #f9f9ff;
        color: #f46036;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: #fcfcff;
      }
    }
  }
}

.code-block {
  background: #2a2d34;
  color: #f9dc5c;
  padding: 20px;
  border-radius: 10px;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 15px 0;
}

.features {
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .feature-card {
    background: #f9f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 1.8rem;
      color: white;

      &.helpers {
        background: #f46036;
      }

      &.polyfill {
        background: #2a2d34;
      }

      &.regenerator {
        background: #4caf50;
      }

      &.sandbox {
        background: #2196f3;
      }
    }

    h3 {
      color: #2a2d34;
      margin-bottom: 15px;
    }

    p {
      color: #555;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .feature-code {
    background: #2a2d34;
    color: #f9dc5c;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.85rem;

    .before,
    .after {
      padding: 8px 0;
    }

    .before {
      color: #f46036;
    }

    .after {
      color: #4caf50;
    }
  }
}

.best-practices {
  .practices {
    display: grid;
    gap: 30px;
  }

  .practice {
    background: #f9f9ff;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #eee;

    h3 {
      color: #f46036;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f9dc5c;
    }

    p {
      margin-bottom: 15px;
    }
  }

  .version-comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .version {
      background: #f0f4ff;
      padding: 20px;
      border-radius: 10px;

      h4 {
        color: #2a2d34;
        text-align: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f9dc5c;
      }

      ul {
        list-style: none;
        padding-left: 0;

        li {
          padding: 8px 0;
          display: flex;
          align-items: center;

          &::before {
            content: '•';
            color: #f46036;
            margin-right: 10px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.comparison {
  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;

      th,
      td {
        border: 1px solid #eee;
        padding: 15px;
        text-align: left;
      }

      th {
        background: #f9f9ff;
        color: #f46036;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: #fcfcff;
      }

      td:first-child {
        font-weight: 500;
      }
    }
  }

  .conclusion {
    background: #e8f5e9;
    padding: 25px;
    border-radius: 12px;
    margin-top: 30px;

    h3 {
      color: #2a2d34;
      margin-bottom: 15px;
    }

    p {
      color: #555;

      strong {
        color: #f46036;
      }
    }
  }
}

.footer {
  background: #2a2d34;
  color: white;
  border-radius: 16px;
  padding: 40px 30px 20px;
  margin-top: 30px;

  .summary,
  .resources {
    margin-bottom: 30px;

    h3 {
      color: #f9dc5c;
      font-size: 1.4rem;
      margin-bottom: 20px;
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
    color: #4cd964;
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

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .workflow-diagram {
    flex-direction: column;
    gap: 20px !important;

    .arrow {
      transform: rotate(90deg);
    }
  }

  .comparison {
    overflow-x: auto;
  }
}
</style>
