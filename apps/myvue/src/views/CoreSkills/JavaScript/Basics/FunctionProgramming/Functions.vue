<template>
  <div class="function-container">
    <header class="app-header">
      <h1>JavaScript 函数基础介绍</h1>
      <p class="subtitle">探索JavaScript函数的核心概念、类型与应用</p>
    </header>

    <div class="content-wrapper">
      <!-- 介绍部分 -->
      <section class="intro-section">
        <div class="info-card">
          <h2>什么是函数？</h2>
          <p>函数是JavaScript中的一等公民，是可重复使用的代码块，用于执行特定任务或计算值。函数可以接收输入（参数）并返回输出（返回值）。</p>

          <div class="function-anatomy">
            <div class="anatomy-card">
              <h3>函数结构</h3>
              <pre class="code-block">function <span class="function-name">functionName</span>(<span class="param">parameter1</span>, <span class="param">parameter2</span>) {
  <span class="comment">// 函数体 - 执行代码</span>
  return <span class="return">result</span>; <span class="comment">// 返回值 (可选)</span>
}</pre>
            </div>

            <div class="anatomy-card">
              <h3>函数核心概念</h3>
              <ul class="concept-list">
                <li><strong>作用域</strong> - 函数创建自己的作用域</li>
                <li><strong>闭包</strong> - 函数可以记住并访问其词法作用域</li>
                <li><strong>this绑定</strong> - 执行上下文的关键概念</li>
                <li><strong>参数传递</strong> - 值传递 vs 引用传递</li>
                <li><strong>高阶函数</strong> - 接收函数作为参数或返回函数</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 创建方式 -->
      <section class="creation-section">
        <h2 class="section-title">函数创建方式</h2>

        <div class="creation-grid">
          <div class="creation-card">
            <div class="creation-header">
              <div class="icon">📜</div>
              <h3>函数声明</h3>
            </div>
            <pre class="code-block">function add(a, b) {
  return a + b;
}</pre>
            <div class="characteristics">
              <p><strong>特点：</strong></p>
              <ul>
                <li>函数提升（可在声明前调用）</li>
                <li>有函数名（必要）</li>
                <li>创建自己的this上下文</li>
              </ul>
            </div>
          </div>

          <div class="creation-card">
            <div class="creation-header">
              <div class="icon">💡</div>
              <h3>函数表达式</h3>
            </div>
            <pre class="code-block">const multiply = function(a, b) {
  return a * b;
};</pre>
            <div class="characteristics">
              <p><strong>特点：</strong></p>
              <ul>
                <li>无函数提升（只能在定义后调用）</li>
                <li>函数名可选（匿名函数）</li>
                <li>常用于回调函数和立即调用函数</li>
              </ul>
            </div>
          </div>

          <div class="creation-card">
            <div class="creation-header">
              <div class="icon">🏹</div>
              <h3>箭头函数</h3>
            </div>
            <pre class="code-block">const divide = (a, b) => a / b;</pre>
            <div class="characteristics">
              <p><strong>特点：</strong></p>
              <ul>
                <li>简洁语法（可省略return和{}）</li>
                <li>没有自己的this（继承外层作用域）</li>
                <li>不能用作构造函数</li>
              </ul>
            </div>
          </div>

          <div class="creation-card">
            <div class="creation-header">
              <div class="icon">🏭</div>
              <h3>构造函数</h3>
            </div>
            <pre class="code-block">const subtract = new Function(
  'a', 'b', 'return a - b'
);</pre>
            <div class="characteristics">
              <p><strong>特点：</strong></p>
              <ul>
                <li>动态创建函数</li>
                <li>性能较差（不推荐）</li>
                <li>安全问题（可执行任意代码）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 函数类型 -->
      <section class="types-section">
        <h2 class="section-title">函数类型基础介绍</h2>

        <div class="type-grid">
          <div class="type-card">
            <div class="type-header">
              <div class="icon">🔹</div>
              <h3>普通函数</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 执行特定任务或计算</p>
              <pre class="code-block">function greet(name) {
  return `Hello, ${name}!`;
}</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>有自己的this绑定</li>
                  <li>可通过call/apply/bind改变this</li>
                  <li>可用作构造函数</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header">
              <div class="icon">🔄</div>
              <h3>生成器函数</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 创建可暂停和恢复的函数</p>
              <pre class="code-block">function* idGenerator() {
  let id = 1;
  while(true) {
    yield id++;
  }
}</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>使用function*语法定义</li>
                  <li>使用yield关键字暂停执行</li>
                  <li>返回生成器对象（可迭代）</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header">
              <div class="icon">⏳</div>
              <h3>异步函数</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 简化Promise的使用</p>
              <pre class="code-block">async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>使用async关键字定义</li>
                  <li>内部可使用await暂停执行</li>
                  <li>总是返回Promise对象</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header">
              <div class="icon">📦</div>
              <h3>IIFE (立即调用函数)</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 创建独立作用域，避免污染全局</p>
              <pre class="code-block">(function() {
  const privateVar = 'Secret';
  console.log(privateVar);
})();</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>函数定义后立即执行</li>
                  <li>创建私有作用域</li>
                  <li>常用于模块模式</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header">
              <div class="icon">🎯</div>
              <h3>回调函数</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 作为参数传递给其他函数</p>
              <pre class="code-block">function processData(data, callback) {
  // 处理数据...
  callback(result);
}</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>常用于异步操作</li>
                  <li>注意回调地狱问题</li>
                  <li>箭头函数可解决this问题</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header">
              <div class="icon">🚀</div>
              <h3>高阶函数</h3>
            </div>
            <div class="type-content">
              <p><strong>作用：</strong> 操作其他函数的函数</p>
              <pre class="code-block">function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}</pre>
              <div class="notes">
                <p><strong>注意事项：</strong></p>
                <ul>
                  <li>接收函数作为参数或返回函数</li>
                  <li>实现函数组合和柯里化</li>
                  <li>函数式编程的核心</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 函数对比 -->
      <section class="comparison-section">
        <h2 class="section-title">函数类型对比</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>函数类型</th>
                <th>语法</th>
                <th>this绑定</th>
                <th>构造函数</th>
                <th>提升</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>函数声明</td>
                <td>function name() {}</td>
                <td>动态</td>
                <td>是</td>
                <td>是</td>
                <td>通用函数</td>
              </tr>
              <tr>
                <td>函数表达式</td>
                <td>const fn = function() {}</td>
                <td>动态</td>
                <td>是</td>
                <td>否</td>
                <td>回调、IIFE</td>
              </tr>
              <tr>
                <td>箭头函数</td>
                <td>const fn = () => {}</td>
                <td>词法</td>
                <td>否</td>
                <td>否</td>
                <td>简短函数、需要固定this</td>
              </tr>
              <tr>
                <td>生成器函数</td>
                <td>function* name() {}</td>
                <td>动态</td>
                <td>是</td>
                <td>是</td>
                <td>可迭代序列</td>
              </tr>
              <tr>
                <td>异步函数</td>
                <td>async function name() {}</td>
                <td>动态</td>
                <td>是</td>
                <td>是</td>
                <td>异步操作</td>
              </tr>
              <tr>
                <td>构造函数</td>
                <td>new Function(...)</td>
                <td>全局</td>
                <td>是</td>
                <td>否</td>
                <td>动态代码执行（不推荐）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="key-differences">
          <h3>关键差异总结</h3>
          <ul>
            <li><strong>this绑定</strong>：箭头函数继承外层this，其他函数有独立this</li>
            <li><strong>提升</strong>：函数声明会被提升，表达式和箭头函数不会</li>
            <li><strong>构造函数</strong>：箭头函数和异步函数不能用作构造函数</li>
            <li><strong>arguments对象</strong>：箭头函数没有自己的arguments对象</li>
            <li><strong>原型属性</strong>：箭头函数没有prototype属性</li>
          </ul>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">函数最佳实践</h2>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">✨</div>
            <h3>单一职责</h3>
            <p>每个函数只做一件事并做好</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📛</div>
            <h3>合理命名</h3>
            <p>使用动词或动宾短语命名函数</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📏</div>
            <h3>控制长度</h3>
            <p>保持函数简短（通常不超过20行）</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🧪</div>
            <h3>纯函数</h3>
            <p>尽可能创建无副作用的纯函数</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📚</div>
            <h3>合理注释</h3>
            <p>使用JSDoc为复杂函数添加文档</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚠️</div>
            <h3>避免副作用</h3>
            <p>减少对外部状态的修改</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const functionExamples = ref([
  { name: "普通函数", code: "function add(a, b) {\n  return a + b;\n}" },
  { name: "箭头函数", code: "const multiply = (a, b) => a * b;" },
  { name: "生成器函数", code: "function* idGenerator() {\n  let id = 1;\n  while(true) yield id++;\n}" },
  { name: "异步函数", code: "async function fetchData(url) {\n  const res = await fetch(url);\n  return res.json();\n}" }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #f72585;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;

.function-container {
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

    h2 {
      margin-top: 0;
      color: @secondary-color;
      font-size: 1.6rem;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .function-anatomy {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-top: 20px;

    .anatomy-card {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: @primary-color;
        font-size: 1.4rem;
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

  .function-name {
    color: #ff79c6;
  }

  .param {
    color: #50fa7b;
  }

  .return {
    color: #f1fa8c;
  }

  .comment {
    color: #6272a4;
  }
}

.concept-list {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    padding-left: 10px;
    position: relative;

    &:before {
      content: "•";
      color: @accent-color;
      font-weight: bold;
      position: absolute;
      left: -15px;
    }

    strong {
      color: @secondary-color;
    }
  }
}

// 创建方式部分
.creation-section {
  .creation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .creation-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .creation-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.4rem;
      }
    }

    .characteristics {
      background-color: #f8f9ff;
      border-radius: 8px;
      padding: 15px;
      margin-top: 15px;

      p {
        margin: 0 0 10px 0;
        font-weight: 600;
        color: @primary-color;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
      }
    }
  }
}

// 函数类型部分
.types-section {
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .type-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .type-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background-color: #f0f4ff;
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.5rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }
    }

    .type-content {
      padding: 20px;

      p {
        margin: 0 0 15px 0;

        strong {
          color: @primary-color;
        }
      }

      .notes {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed @border-color;

        p {
          font-weight: 600;
          color: @accent-color;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 8px;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

// 对比表格部分
.comparison-section {
  .comparison-table {
    overflow-x: auto;
    margin-bottom: 30px;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

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

      td {
        &:first-child {
          font-weight: 500;
          color: @primary-color;
        }
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

// 最佳实践部分
.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .practice-card {
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

    .practice-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      margin: 0;
      color: #555;
      font-size: 0.95rem;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .function-anatomy {
    grid-template-columns: 1fr !important;
  }

  .creation-grid,
  .type-grid,
  .practices-grid {
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
