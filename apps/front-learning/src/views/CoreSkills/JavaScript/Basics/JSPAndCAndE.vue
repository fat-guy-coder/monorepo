<template>
  <div class="js-execution-container">
    <header class="header">
      <h1>浏览器执行JavaScript流程介绍</h1>
      <p class="subtitle">从下载到执行的全过程解析</p>
    </header>

    <div class="content-wrapper">
      <section class="overview">
        <h2><span class="icon">🌐</span> 整体流程概览</h2>
        <div class="process-flow">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>下载</h3>
              <p>从服务器获取JavaScript文件</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>解析</h3>
              <p>将源代码转换为抽象语法树(AST)</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>编译</h3>
              <p>将AST转换为字节码或机器码</p>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>执行</h3>
              <p>在JavaScript引擎中执行代码</p>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="download">
          <h2><span class="icon">📥</span> 下载阶段</h2>
          <div class="card">
            <p>当浏览器遇到 <code>&lt;script&gt;</code> 标签时，会开始下载JavaScript文件。</p>

            <div class="comparison">
              <div class="script-type">
                <h3>常规脚本</h3>
                <div class="code-block">
                  <pre><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
                </div>
                <ul>
                  <li>阻塞HTML解析</li>
                  <li>下载完成后立即执行</li>
                  <li>按文档顺序执行</li>
                </ul>
              </div>

              <div class="script-type">
                <h3>异步脚本</h3>
                <div class="code-block">
                  <pre><code>&lt;script async src="app.js"&gt;&lt;/script&gt;</code></pre>
                </div>
                <ul>
                  <li>异步下载，不阻塞HTML解析</li>
                  <li>下载完成后立即执行</li>
                  <li>执行顺序不确定</li>
                </ul>
              </div>

              <div class="script-type">
                <h3>延迟脚本</h3>
                <div class="code-block">
                  <pre><code>&lt;script defer src="app.js"&gt;&lt;/script&gt;</code></pre>
                </div>
                <ul>
                  <li>异步下载，不阻塞HTML解析</li>
                  <li>在DOMContentLoaded事件前按顺序执行</li>
                  <li>保证执行顺序</li>
                </ul>
              </div>
            </div>

            <div class="optimization">
              <h3>优化建议：</h3>
              <ul>
                <li>使用<code>async</code>或<code>defer</code>属性避免阻塞渲染</li>
                <li>压缩JavaScript文件减少下载时间</li>
                <li>使用HTTP/2多路复用加速下载</li>
                <li>利用浏览器缓存减少重复下载</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="parsing">
          <h2><span class="icon">🔍</span> 解析阶段</h2>
          <div class="card">
            <p>解析是将源代码转换为抽象语法树(AST)的过程。</p>

            <h3>解析步骤：</h3>
            <ol class="detailed-steps">
              <li>
                <strong>词法分析(Lexical Analysis)</strong>
                <p>将字符流分解为token（标记）序列</p>
                <div class="code-example">
                  <pre><code>// 源代码
const sum = a + b;

// Token序列:
[
  { type: 'Keyword', value: 'const' },
  { type: 'Identifier', value: 'sum' },
  { type: 'Punctuator', value: '=' },
  { type: 'Identifier', value: 'a' },
  { type: 'Punctuator', value: '+' },
  { type: 'Identifier', value: 'b' },
  { type: 'Punctuator', value: ';' }
]</code></pre>
                </div>
              </li>

              <li>
                <strong>语法分析(Syntax Analysis)</strong>
                <p>根据语法规则将token序列转换为AST</p>
                <div class="code-example">
                  <pre><code>// AST结构
{
  type: "Program",
  body: [{
    type: "VariableDeclaration",
    declarations: [{
      type: "VariableDeclarator",
      id: { type: "Identifier", name: "sum" },
      init: {
        type: "BinaryExpression",
        operator: "+",
        left: { type: "Identifier", name: "a" },
        right: { type: "Identifier", name: "b" }
      }
    }],
    kind: "const"
  }]
}</code></pre>
                </div>
              </li>
            </ol>

            <div class="parsing-notes">
              <h3>解析注意事项：</h3>
              <ul>
                <li>现代浏览器使用流式解析，可以边下载边解析</li>
                <li>语法错误会在解析阶段被发现</li>
                <li>解析是CPU密集型操作，应避免过大的JS文件</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section class="ast">
        <h2><span class="icon">🌲</span> 抽象语法树(AST)</h2>
        <div class="card">
          <div class="ast-intro">
            <p>
              抽象语法树(Abstract Syntax
              Tree)是源代码的树状表示，它省略了源代码中的细节（如分号、空白符），只保留程序的结构信息。
            </p>

            <div class="ast-visual">
              <div class="ast-node root">
                Program
                <div class="ast-node child">
                  FunctionDeclaration
                  <div class="ast-node child">Identifier (name: "sum")</div>
                  <div class="ast-node child">
                    BlockStatement
                    <div class="ast-node child">
                      ReturnStatement
                      <div class="ast-node child">
                        BinaryExpression (operator: "+")
                        <div class="ast-node child">Identifier (name: "a")</div>
                        <div class="ast-node child">Identifier (name: "b")</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ast-usage">
            <h3>AST的应用场景：</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>代码转换</h4>
                <p>Babel使用AST将ES6+代码转换为ES5</p>
              </div>
              <div class="usage-card">
                <h4>代码压缩</h4>
                <p>UglifyJS通过AST删除无用代码</p>
              </div>
              <div class="usage-card">
                <h4>代码格式化</h4>
                <p>Prettier使用AST重新生成格式化的代码</p>
              </div>
              <div class="usage-card">
                <h4>语法高亮</h4>
                <p>编辑器通过AST确定代码结构</p>
              </div>
            </div>
          </div>

          <div class="ast-tools">
            <h3>AST探索工具：</h3>
            <ul>
              <li>
                <a href="https://astexplorer.net/" target="_blank">AST Explorer</a> - 在线AST查看器
              </li>
              <li>Babel Parser - 生成JavaScript AST</li>
              <li>ESLint - 使用AST进行代码检查</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="compilation">
          <h2><span class="icon">⚙️</span> 编译阶段</h2>
          <div class="card">
            <p>JavaScript引擎将AST转换为可执行的字节码或机器码。</p>

            <h3>V8引擎编译流程：</h3>
            <div class="compilation-steps">
              <div class="step">
                <div class="step-header">1. Ignition解释器</div>
                <div class="step-content">
                  <p>将AST转换为字节码</p>
                  <ul>
                    <li>快速生成可执行代码</li>
                    <li>占用内存少</li>
                    <li>执行速度较慢</li>
                  </ul>
                </div>
              </div>

              <div class="step">
                <div class="step-header">2. TurboFan优化编译器</div>
                <div class="step-content">
                  <p>将热点函数编译为优化机器码</p>
                  <ul>
                    <li>分析代码执行模式</li>
                    <li>进行类型特化和内联缓存</li>
                    <li>生成高度优化的机器码</li>
                  </ul>
                </div>
              </div>

              <div class="step">
                <div class="step-header">3. Deoptimization</div>
                <div class="step-content">
                  <p>当优化假设失效时回退到字节码</p>
                  <ul>
                    <li>类型变化导致优化无效</li>
                    <li>回退到解释器执行</li>
                    <li>重新收集类型信息</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="code-block">
              <pre><code>// 优化示例
function add(a, b) {
  return a + b;
}

// 重复调用相同类型
add(1, 2); // 被TurboFan优化
add(3, 4); // 使用优化机器码

// 类型变化导致去优化
add('5', '6'); // 回退到字节码执行</code></pre>
            </div>
          </div>
        </section>

        <section class="execution">
          <h2><span class="icon">🚀</span> 执行阶段</h2>
          <div class="card">
            <p>JavaScript代码在引擎中执行，涉及调用栈、事件循环和内存管理。</p>

            <h3>执行上下文栈</h3>
            <div class="execution-context">
              <div class="context-stack">
                <div class="context">全局执行上下文</div>
                <div class="context">函数A上下文</div>
                <div class="context">函数B上下文</div>
              </div>
              <div class="context-explain">
                <p>后进先出(LIFO)结构，当前上下文在栈顶</p>
              </div>
            </div>

            <h3>事件循环机制</h3>
            <div class="event-loop">
              <div class="loop-phase">
                <div class="phase-name">调用栈</div>
                <div class="phase-tasks">同步任务</div>
              </div>
              <div class="loop-arrow">↓</div>
              <div class="loop-phase">
                <div class="phase-name">微任务队列</div>
                <div class="phase-tasks">Promise.then<br />MutationObserver</div>
              </div>
              <div class="loop-arrow">↓</div>
              <div class="loop-phase">
                <div class="phase-name">宏任务队列</div>
                <div class="phase-tasks">setTimeout<br />setInterval<br />事件回调</div>
              </div>
            </div>

            <div class="code-block">
              <pre><code>console.log('开始');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('结束');

/* 输出顺序:
   开始
   结束
   Promise
   setTimeout
*/</code></pre>
            </div>

            <div class="memory-management">
              <h3>内存管理</h3>
              <ul>
                <li><strong>堆内存</strong>：存储对象和闭包</li>
                <li><strong>栈内存</strong>：存储原始值和引用地址</li>
                <li><strong>垃圾回收</strong>：标记清除和分代回收</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section class="optimization">
        <h2><span class="icon">🚀</span> 性能优化建议</h2>
        <div class="card">
          <div class="optimization-grid">
            <div class="optimization-card">
              <h3>减少解析时间</h3>
              <ul>
                <li>代码分割（Code Splitting）</li>
                <li>避免过大的JavaScript文件</li>
                <li>使用Tree Shaking删除无用代码</li>
              </ul>
            </div>

            <div class="optimization-card">
              <h3>优化执行性能</h3>
              <ul>
                <li>避免"魔鬼优化杀手"（如arguments）</li>
                <li>保持函数参数类型一致</li>
                <li>避免在热点函数中分配新对象</li>
              </ul>
            </div>

            <div class="optimization-card">
              <h3>高效内存使用</h3>
              <ul>
                <li>及时解除不再需要的引用</li>
                <li>避免内存泄漏（全局变量、未清除的定时器）</li>
                <li>使用WeakMap/WeakSet管理临时引用</li>
              </ul>
            </div>

            <div class="optimization-card">
              <h3>利用现代API</h3>
              <ul>
                <li>使用Web Workers执行CPU密集型任务</li>
                <li>使用requestIdleCallback安排非关键任务</li>
                <li>使用IntersectionObserver延迟加载资源</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>理解浏览器执行JavaScript的流程对于编写高性能Web应用至关重要。</p>
      <p>使用Chrome DevTools的Performance和Memory面板分析你的应用性能。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件不需要额外的逻辑，仅用于展示JavaScript执行流程
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #1976d2;
@secondary-color: #0d47a1;
@accent-color: #2196f3;
@light-bg: #f5f8fc;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #f8f9fc;
@success-color: #4caf50;
@warning-color: #ff9800;
@danger-color: #f44336;
@info-color: #2196f3;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.js-execution-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

h4 {
  font-size: 1.2rem;
  color: @primary-color;
  margin: 15px 0 10px;
}

.card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  border-left: 4px solid @primary-color;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 流程概览
.process-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;

  .process-step {
    flex: 1;
    min-width: 200px;
    text-align: center;
    background: #e3f2fd;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    position: relative;

    .step-number {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 30px;
      height: 30px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .step-content {
      h3 {
        color: @primary-color;
        margin-top: 0;
      }
    }
  }

  .arrow {
    font-size: 2rem;
    color: @primary-color;
    margin: 0 -10px;
    z-index: 1;

    @media (max-width: 768px) {
      transform: rotate(90deg);
      margin: -10px 0;
    }
  }
}

// 下载阶段比较
.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .script-type {
    background: #e8f4ff;
    border-radius: 8px;
    padding: 15px;

    h3 {
      margin-top: 0;
      color: @info-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

// 详细步骤
.detailed-steps {
  list-style: none;
  counter-reset: step-counter;

  li {
    margin-bottom: 30px;
    padding-left: 50px;
    position: relative;

    &::before {
      counter-increment: step-counter;
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 0;
      width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }
}

.code-example {
  background-color: @code-bg;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;
  border: 1px solid @border-color;
}

// AST可视化
.ast-visual {
  margin: 20px 0;
  display: flex;
  justify-content: center;

  .ast-node {
    border: 2px solid @primary-color;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 10px;
    text-align: center;
    background: #e3f2fd;
    position: relative;

    &.root {
      background: @primary-color;
      color: white;
      font-weight: bold;
    }

    &.child {
      margin-top: 30px;

      &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        width: 2px;
        height: 20px;
        background: @primary-color;
      }
    }
  }
}

// 使用场景网格
.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  .usage-card {
    background: #e8f4ff;
    border-radius: 8px;
    padding: 15px;

    h4 {
      margin-top: 0;
      color: @primary-color;
    }
  }
}

// 编译步骤
.compilation-steps {
  display: grid;
  gap: 20px;

  .step {
    background: #e3f2fd;
    border-radius: 8px;
    overflow: hidden;

    .step-header {
      background: @primary-color;
      color: white;
      padding: 12px 15px;
      font-weight: bold;
    }

    .step-content {
      padding: 15px;

      ul {
        padding-left: 20px;
      }
    }
  }
}

// 执行上下文
.execution-context {
  .context-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;

    .context {
      width: 80%;
      padding: 15px;
      background: #e3f2fd;
      border: 2px solid @primary-color;
      text-align: center;
      margin-bottom: 10px;
      border-radius: 8px;

      &:last-child {
        background: @primary-color;
        color: white;
        font-weight: bold;
      }
    }
  }
}

// 事件循环
.event-loop {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  .loop-phase {
    width: 80%;
    padding: 15px;
    background: #e3f2fd;
    border: 2px solid @primary-color;
    border-radius: 8px;
    margin-bottom: 15px;

    .phase-name {
      font-weight: bold;
      margin-bottom: 8px;
      color: @primary-color;
    }
  }

  .loop-arrow {
    font-size: 1.5rem;
    color: @primary-color;
    margin: 5px 0;
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

// 优化网格
.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .optimization-card {
    background: #e8f4ff;
    border-radius: 8px;
    padding: 20px;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 20px;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .process-flow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: -10px 0;
    }
  }

  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
