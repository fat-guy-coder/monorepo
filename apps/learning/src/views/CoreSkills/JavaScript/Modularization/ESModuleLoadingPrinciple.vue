<template>
  <div class="esm-container">
    <header class="app-header">
      <h1>ES Module加载原理深度解析</h1>
      <p class="subtitle">探索现代JavaScript模块系统的底层工作机制</p>
    </header>

    <div class="content-wrapper">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="info-card">
          <div class="header-with-icon">
            <div class="icon">📦</div>
            <h2>什么是ES Module?</h2>
          </div>
          <p>ES Module（ECMAScript Module）是JavaScript官方的模块系统，于ES6(2015)引入。它提供了模块化编程的标准化方案，具有静态结构、异步加载、循环引用处理等特性。</p>

          <div class="key-features">
            <div class="feature">
              <div class="feature-icon">🔍</div>
              <h3>静态结构</h3>
              <p>依赖关系在代码执行前确定</p>
            </div>
            <div class="feature">
              <div class="feature-icon">⚡</div>
              <h3>异步加载</h3>
              <p>支持按需加载和代码分割</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔄</div>
              <h3>循环引用</h3>
              <p>内置循环依赖处理机制</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 加载过程 -->
      <section class="process-section">
        <h2 class="section-title">模块加载四个核心阶段</h2>

        <div class="process-steps">
          <div class="step-card">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>解析(Resolution)</h3>
            </div>
            <div class="step-content">
              <p>确定模块依赖关系，构建模块依赖图</p>
              <div class="technical-details">
                <h4>底层原理：</h4>
                <ul>
                  <li>从入口文件开始深度优先遍历</li>
                  <li>解析<code>import</code>语句，获取模块URL</li>
                  <li>将模块URL解析为绝对路径</li>
                  <li>检查模块缓存避免重复加载</li>
                </ul>
              </div>
              <pre class="code-block">// 解析过程示例
import utils from './utils.js';
import { PI } from './math/constants.js';</pre>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>获取(Fetching)</h3>
            </div>
            <div class="step-content">
              <p>下载模块源代码并解析为模块记录</p>
              <div class="technical-details">
                <h4>底层原理：</h4>
                <ul>
                  <li>浏览器发起网络请求获取模块文件</li>
                  <li>Node.js从文件系统读取模块</li>
                  <li>解析源代码为抽象语法树(AST)</li>
                  <li>创建模块记录(Module Record)</li>
                </ul>
              </div>
              <div class="module-record">
                <div class="record-header">模块记录结构</div>
                <pre class="code-block">ModuleRecord {
  Environment: {...},    // 词法环境
  RequestedModules: [],  // 依赖模块
  ImportEntries: [],     // 导入条目
  ExportEntries: []      // 导出条目
}</pre>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>实例化(Instantiation)</h3>
            </div>
            <div class="step-content">
              <p>为模块创建作用域并绑定导入导出</p>
              <div class="technical-details">
                <h4>底层原理：</h4>
                <ul>
                  <li>深度优先遍历依赖图</li>
                  <li>为每个模块创建模块环境记录(Module Environment Record)</li>
                  <li>在内存中为导出分配空间（但未赋值）</li>
                  <li>建立导入与导出的绑定关系</li>
                </ul>
              </div>
              <div class="binding-visual">
                <div class="binding-diagram">
                  <div class="module">
                    <div class="module-name">moduleA.js</div>
                    <div class="exports">
                      <div class="export-item">count: <span class="uninitialized">未初始化</span></div>
                    </div>
                  </div>
                  <div class="binding-arrow">⇄</div>
                  <div class="module">
                    <div class="module-name">moduleB.js</div>
                    <div class="imports">
                      <div class="import-item">count: <span class="binding">绑定到moduleA</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">4</div>
              <h3>求值(Evaluation)</h3>
            </div>
            <div class="step-content">
              <p>执行模块代码并填充导出值</p>
              <div class="technical-details">
                <h4>底层原理：</h4>
                <ul>
                  <li>深度优先遍历依赖图（后序遍历）</li>
                  <li>执行模块顶层代码</li>
                  <li>填充导出变量的值</li>
                  <li>处理循环依赖（通过"死区"机制）</li>
                </ul>
              </div>
              <div class="execution-flow">
                <div class="flow-diagram">
                  <div class="module">dependency1</div>
                  <div class="arrow">↓</div>
                  <div class="module">dependency2</div>
                  <div class="arrow">↓</div>
                  <div class="module main">main module</div>
                  <div class="flow-label">深度优先后序遍历</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 关键机制 -->
      <section class="mechanisms-section">
        <h2 class="section-title">关键机制基础介绍</h2>

        <div class="mechanism-grid">
          <div class="mechanism-card">
            <div class="mechanism-header">
              <div class="icon">🔄</div>
              <h3>循环依赖处理</h3>
            </div>
            <div class="mechanism-content">
              <p>ES Module通过"绑定"机制处理循环依赖</p>
              <pre class="code-block">// moduleA.js
import { b } from './moduleB.js';
export const a = 'A';
console.log(b); // 输出: B

// moduleB.js
import { a } from './moduleA.js';
export const b = 'B';
console.log(a); // 输出: undefined (死区)</pre>
              <div class="explanation">
                <h4>工作原理：</h4>
                <ol>
                  <li>模块A和B在实例化阶段建立绑定关系</li>
                  <li>执行阶段先执行moduleB</li>
                  <li>此时moduleA尚未执行，导出a处于未初始化状态</li>
                  <li>moduleB访问a时得到undefined（TDZ）</li>
                  <li>moduleA执行后，a的值自动更新</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="mechanism-card">
            <div class="mechanism-header">
              <div class="icon">🔗</div>
              <h3>实时绑定(Live Bindings)</h3>
            </div>
            <div class="mechanism-content">
              <p>导入导出是动态绑定关系，而非值拷贝</p>
              <pre class="code-block">// counter.js
export let count = 0;
export function increment() {
  count++;
}

// main.js
import { count, increment } from './counter.js';
console.log(count); // 0
increment();
console.log(count); // 1 (实时更新)</pre>
              <div class="explanation">
                <h4>特点：</h4>
                <ul>
                  <li>导出模块修改变量会反映在所有导入模块</li>
                  <li>导入模块不能直接修改绑定变量（只读）</li>
                  <li>与CommonJS的值拷贝有本质区别</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mechanism-card">
            <div class="mechanism-header">
              <div class="icon">📝</div>
              <h3>静态分析</h3>
            </div>
            <div class="mechanism-content">
              <p>依赖关系在代码执行前确定</p>
              <div class="static-analysis">
                <pre class="code-block">// 有效导入（静态）
import { foo } from './module.js';

// 无效导入（动态）
if (condition) {
  import('./module.js'); // 只能用于动态导入
}</pre>
                <div class="analysis-details">
                  <h4>优势：</h4>
                  <ul>
                    <li>支持tree-shaking优化</li>
                    <li>提高代码可预测性</li>
                    <li>便于工具进行静态分析</li>
                    <li>支持编译时优化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="mechanism-card">
            <div class="mechanism-header">
              <div class="icon">⚙️</div>
              <h3>模块缓存</h3>
            </div>
            <div class="mechanism-content">
              <p>每个模块只加载和执行一次</p>
              <div class="cache-visual">
                <div class="cache-diagram">
                  <div class="module-entry">入口模块</div>
                  <div class="arrow">↓</div>
                  <div class="cache-box">
                    <div class="cache-header">模块缓存</div>
                    <div class="cached-module">moduleA.js ✓</div>
                    <div class="cached-module">moduleB.js ✓</div>
                    <div class="cached-module">moduleC.js ✓</div>
                  </div>
                </div>
              </div>
              <div class="explanation">
                <h4>缓存机制：</h4>
                <ul>
                  <li>以模块URL为键缓存模块实例</li>
                  <li>相同URL的导入返回缓存实例</li>
                  <li>确保模块状态一致性</li>
                  <li>避免重复加载和执行</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 对比 -->
      <section class="comparison-section">
        <h2 class="section-title">ES Module vs CommonJS</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>ES Module</th>
                <th>CommonJS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>加载方式</td>
                <td>异步加载</td>
                <td>同步加载</td>
              </tr>
              <tr>
                <td>加载时机</td>
                <td>编译时</td>
                <td>运行时</td>
              </tr>
              <tr>
                <td>导出类型</td>
                <td>实时绑定</td>
                <td>值拷贝</td>
              </tr>
              <tr>
                <td>循环依赖</td>
                <td>支持（部分未初始化）</td>
                <td>支持（部分未加载）</td>
              </tr>
              <tr>
                <td>Tree Shaking</td>
                <td>支持</td>
                <td>不支持</td>
              </tr>
              <tr>
                <td>动态导入</td>
                <td><code>import()</code></td>
                <td><code>require()</code></td>
              </tr>
              <tr>
                <td>顶层作用域</td>
                <td>模块作用域</td>
                <td>文件作用域</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="key-differences">
          <h3>核心差异总结</h3>
          <ul>
            <li><strong>加载机制</strong>：ESM是异步的、静态的；CJS是同步的、动态的</li>
            <li><strong>绑定方式</strong>：ESM使用实时绑定；CJS使用值拷贝</li>
            <li><strong>设计目标</strong>：ESM为浏览器设计；CJS为服务器设计</li>
            <li><strong>性能优化</strong>：ESM支持tree-shaking；CJS不支持</li>
          </ul>
        </div>
      </section>

      <!-- 现代应用 -->
      <section class="modern-usage">
        <h2 class="section-title">现代应用中的ES Module</h2>

        <div class="usage-grid">
          <div class="usage-card">
            <div class="usage-icon">🌐</div>
            <h3>浏览器原生支持</h3>
            <pre class="code-block">&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</pre>
            <p>现代浏览器直接支持ES Module</p>
          </div>

          <div class="usage-card">
            <div class="usage-icon">🛠️</div>
            <h3>Node.js支持</h3>
            <pre class="code-block">// package.json
{
  "type": "module"
}</pre>
            <p>Node.js 12+ 原生支持ES Module</p>
          </div>

          <div class="usage-card">
            <div class="usage-icon">⚡</div>
            <h3>打包工具处理</h3>
            <pre class="code-block">// webpack.config.js
module.exports = {
  experiments: {
    outputModule: true
  }
};</pre>
            <p>Webpack/Rollup等工具优化ESM</p>
          </div>
        </div>

        <div class="optimization">
          <h3>性能优化建议</h3>
          <ul>
            <li>使用静态导入优先</li>
            <li>按需使用动态导入 <code>import()</code> 进行代码分割</li>
            <li>利用HTTP/2的多路复用优化模块加载</li>
            <li>使用预加载指令 <code>&lt;link rel="modulepreload"&gt;</code></li>
            <li>模块静态分析实现tree-shaking</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const moduleExamples = ref([
  { name: "静态导入", code: "import { func } from './module.js';" },
  { name: "动态导入", code: "const module = await import('./module.js');" },
  { name: "默认导出", code: "export default function() {};" },
  { name: "命名导出", code: "export const value = 42;" }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;

.esm-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: @light-bg;
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 10px 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  border-bottom: 2px solid @primary-color;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}

// 介绍部分样式
.intro-section {
  .info-card {
    background-color: #eef2ff;
    border-left: 4px solid @primary-color;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;

    .header-with-icon {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h2 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.6rem;
      }
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .key-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 25px;

    .feature {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
      }
    }
  }
}

// 加载过程部分
.process-section {
  .process-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 20px;
  }

  .step-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .step-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(to right, #f0f4ff, #e6f7ff);
      border-bottom: 1px solid @border-color;

      .step-number {
        width: 40px;
        height: 40px;
        background-color: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }

    .step-content {
      padding: 25px;

      p {
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: #444;
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 18px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow: auto;
  margin: 15px 0;
}

.technical-details {
  background-color: #f8f9ff;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;

  h4 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 20px;
    margin: 10px 0 0;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 15px;

      &::before {
        content: "•";
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
}

.module-record,
.binding-visual,
.execution-flow {
  background-color: #f0f8ff;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;

  .record-header {
    font-weight: bold;
    color: @primary-color;
    margin-bottom: 10px;
  }
}

.binding-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 15px;

  .module {
    background-color: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    min-width: 180px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

    .module-name {
      font-weight: bold;
      color: @secondary-color;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
    }

    .export-item,
    .import-item {
      padding: 5px;
      font-size: 0.9rem;

      .uninitialized {
        color: #e74c3c;
        font-style: italic;
      }

      .binding {
        color: #27ae60;
      }
    }
  }

  .binding-arrow {
    font-size: 1.8rem;
    color: @primary-color;
  }
}

.execution-flow {
  .flow-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;

    .module {
      background-color: white;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 12px 25px;
      margin: 10px 0;
      text-align: center;
      width: 200px;

      &.main {
        background-color: #e3f2fd;
        border-color: @primary-color;
        font-weight: bold;
      }
    }

    .arrow {
      font-size: 1.5rem;
      color: @primary-color;
    }

    .flow-label {
      margin-top: 10px;
      font-style: italic;
      color: #777;
    }
  }
}

// 关键机制部分
.mechanisms-section {
  .mechanism-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .mechanism-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .mechanism-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background-color: #f0f4ff;
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }
    }

    .mechanism-content {
      padding: 20px;

      p {
        font-weight: 500;
        color: #444;
        margin-bottom: 15px;
      }
    }
  }
}

.static-analysis,
.cache-visual {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  .code-block {
    flex: 1;
  }

  .analysis-details,
  .explanation {
    flex: 1;

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.cache-diagram {
  text-align: center;

  .cache-box {
    background-color: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    margin: 15px auto;
    max-width: 300px;

    .cache-header {
      font-weight: bold;
      color: @primary-color;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }

    .cached-module {
      padding: 8px;
      background-color: #e8f5e9;
      margin: 5px 0;
      border-radius: 4px;
      color: #2e7d32;
      font-family: monospace;
    }
  }
}

// 对比表格
.comparison-section {
  .comparison-table {
    overflow-x: auto;
    margin-bottom: 30px;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;

      th,
      td {
        border: 1px solid @border-color;
        padding: 12px 15px;
        text-align: left;
      }

      th {
        background-color: #f0f4ff;
        color: @secondary-color;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background-color: #f8f9ff;
      }

      td:nth-child(2) {
        color: #27ae60;
        font-weight: 500;
      }

      td:nth-child(3) {
        color: #e74c3c;
        font-weight: 500;
      }
    }
  }

  .key-differences {
    background-color: #fff8f5;
    border-left: 4px solid @accent-color;
    border-radius: 0 8px 8px 0;
    padding: 20px;

    h3 {
      margin-top: 0;
      color: @accent-color;
      font-size: 1.3rem;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          color: @accent-color;
          font-weight: bold;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
        }

        strong {
          color: @secondary-color;
        }
      }
    }
  }
}

// 现代应用部分
.modern-usage {
  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .usage-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 25px 20px;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-color: @primary-color;
    }

    .usage-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 15px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    .code-block {
      margin: 15px 0;
      font-size: 0.85rem;
      text-align: left;
    }

    p {
      margin: 15px 0 0;
      color: #555;
      font-size: 0.95rem;
    }
  }

  .optimization {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;

    h3 {
      margin-top: 0;
      color: #2e7d32;
    }

    ul {
      padding-left: 20px;
      margin: 15px 0 0;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          color: #2e7d32;
          font-weight: bold;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
        }

        code {
          background-color: #d1e7dd;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .key-features {
    grid-template-columns: 1fr !important;
  }

  .app-header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }
}
</style>
