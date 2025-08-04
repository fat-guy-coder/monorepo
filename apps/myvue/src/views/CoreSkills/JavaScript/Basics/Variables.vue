// VariablesDocument.vue

<template>
  <div class="variables-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">📦 JavaScript 变量基本指南</h1>
    </header>
    <div>
      <h2>变量是用于存储信息的"容器"</h2>
      <p>在 JavaScript 中，变量用于存储数据，并可以在程序执行过程中动态更改。</p>
      <p>在 JavaScript 中，变量可以存储各种类型的数据，如数字、字符串、对象、函数等。</p>
    </div>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 声明方式 -->
      <section class="section declaration">
        <h2 class="section-title">📜 变量声明方式</h2>
        <div class="declaration-grid">
          <div class="declaration-card var-card">
            <div class="card-header">
              <span class="keyword">var</span>
              <span class="ec">(ES1)</span>
            </div>
            <div class="card-body">
              <p class="desc">函数作用域变量声明</p>
              <div class="usage-scene">
                <h4>使用场景：</h4>
                <ul>
                  <li>旧代码维护</li>
                  <li>立即执行函数(IIFE)</li>
                  <li>需要变量提升特性时</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="declaration-card let-card">
            <div class="card-header">
              <span class="keyword">let</span>
              <span class="ec">(ES6)</span>
            </div>
            <div class="card-body">
              <p class="desc">块级作用域变量声明</p>
              <div class="usage-scene">
                <h4>使用场景：</h4>
                <ul>
                  <li>循环计数器</li>
                  <li>需要重新赋值的变量</li>
                  <li>块级作用域需求</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="declaration-card const-card">
            <div class="card-header">
              <span class="keyword">const</span>
              <span class="ec">(ES6)</span>
            </div>
            <div class="card-body">
              <p class="desc">块级作用域常量声明</p>
              <div class="usage-scene">
                <h4>使用场景：</h4>
                <ul>
                  <li>常量值声明</li>
                  <li>对象/数组引用</li>
                  <li>避免意外修改</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用域对比 -->
      <section class="section scope">
        <h2 class="section-title">🔍 作用域对比</h2>
        <div class="scope-comparison">
          <div class="code-example">
            <pre class="code-block"><code>function scopeExample() {
  var a = 1;   // 函数作用域
  let b = 2;   // 块级作用域
  const c = 3; // 块级作用域

  if (true) {
    var a = 10;    // 覆盖外部a
    let b = 20;    // 新块级变量
    const c = 30;  // 新块级常量
  }

  console.log(a); // 10
  console.log(b); // 2
  console.log(c); // 3
}</code></pre>
          </div>
          <div class="scope-diagram">
            <div class="diagram-item var-scope">
              <div class="scope-bar"></div>
              <span>var作用域</span>
            </div>
            <div class="diagram-item let-scope">
              <div class="scope-bar"></div>
              <span>let/const作用域</span>
            </div>
          </div>
        </div>
      </section>
      <section class="section hoisting">
        <h2 class="section-title">🚀 变量提升</h2>
        <div class="hoisting-explanation">
          <p>
            变量提升是 JavaScript
            的一个特性，允许在代码中使用变量之前声明它们。所有的变量声明都会被提升到函数或全局作用域的顶部，但赋值不会被提升。
          </p>
          <div class="code-example">
            <pre class="code-block"><code>console.log(x); // undefined
      var x = 5;
      console.log(x); // 5</code></pre>
          </div>
          <p>
            在上面的例子中，虽然变量 x 在使用之前没有被声明，但由于变量提升，JavaScript
            仍然允许访问它，返回值为 undefined。
          </p>
        </div>
      </section>


      <section class="section tdz">
        <h2 class="section-title">⏳ 暂存死区 (TDZ)</h2>
        <div class="tdz-explanation">
          <p>
            暂存死区是指在块级作用域中，变量在声明之前无法访问的状态。对于使用let和const声明的变量，如果在声明之前访问它们，将会抛出ReferenceError。
          </p>
          <div class="code-example">
            <pre class="code-block"><code>console.log(a); // ReferenceError: Cannot access 'a' before initialization
      let a = 10;</code></pre>
          </div>
          <p>
            在上面的例子中，变量 a
            在使用之前被访问，导致了一个错误。这是因为在块级作用域中，let和const变量存在暂存死区。
          </p>
        </div>
      </section>

      <section class="section release">
        <h2 class="section-title">🔄 手动释放变量</h2>
        <div class="release-explanation">
          <div class="code-example">
            <pre class="code-block"><code>let a = 10;
a = null; // 手动释放变量</code></pre>
          </div>
        </div>
      </section>
      <!-- 最佳实践 -->
      <section class="section best-practice">
        <h2 class="section-title">🏆 最佳实践</h2>
        <div class="practice-steps">
          <div class="step">
            <div class="step-icon">1️⃣</div>
            <h3>优先使用const</h3>
            <p>确保变量不会被意外重新赋值</p>
          </div>
          <div class="step">
            <div class="step-icon">2️⃣</div>
            <h3>必要时使用let</h3>
            <p>需要重新赋值时使用块级作用域</p>
          </div>
          <div class="step">
            <div class="step-icon">3️⃣</div>
            <h3>避免使用var</h3>
            <p>防止作用域污染和变量提升问题</p>
          </div>
        </div>
      </section>

      <!-- 特殊声明 -->
      <section class="section special">
        <h2 class="section-title">⚡ 特殊声明</h2>
        <div class="special-grid">
          <div class="special-card">
            <h3>全局变量</h3>
            <pre class="code-block"><code>// 浏览器环境
window.globalVar = value;

// Node.js环境
global.globalVar = value;</code></pre>
          </div>
          <div class="special-card">
            <h3>解构声明</h3>
            <pre class="code-block"><code>const { prop } = object;
const [first] = array;</code></pre>
          </div>
        </div>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice-board">
        <h3>⚠️ 重要注意事项</h3>
        <div class="notice-content">
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>var允许重复声明，let/const不允许</p>
          </div>
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>const必须初始化且不能重新赋值</p>
          </div>
          <div class="notice-item">
            <div class="warning-icon">❗</div>
            <p>暂时性死区(TDZ)影响let/const</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VariablesDocument',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Source+Code+Pro&display=swap');

h3,
p,
span,
li {
  color: #000;
}

code {
  color: #fff;
}

.variables-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    .title {
      color: #0984e3;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(9, 132, 227, 0.1);
    }

    .subtitle {
      color: #636e72;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-wave {
      width: 180px;
      height: 4px;
      background: repeating-linear-gradient(90deg,
          #0984e3 0px,
          #0984e3 10px,
          transparent 10px,
          transparent 20px);
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
        color: #2d3436;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .declaration-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .declaration-card {
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid;
          transition: all 0.3s ease;

          &.var-card {
            border-color: #e74c3c;
            background: #f9ebec;
          }

          &.let-card {
            border-color: #2ecc71;
            background: #ebf8f2;
          }

          &.const-card {
            border-color: #3498db;
            background: #e8f3fd;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;

            .keyword {
              font-family: 'Source Code Pro', monospace;
              font-size: 1.2rem;
              font-weight: 600;
            }

            .ec {
              color: #636e72;
              font-size: 0.9rem;
            }
          }

          .usage-scene {
            h4 {
              color: #2d3436;
              margin: 1rem 0 0.5rem;
            }

            ul {
              list-style: none;
              padding-left: 1rem;

              li {
                position: relative;
                padding-left: 1.5rem;
                margin: 0.5rem 0;

                &::before {
                  content: '•';
                  position: absolute;
                  left: 0;
                  color: #0984e3;
                }
              }
            }
          }
        }
      }

      .scope-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;

        .scope-diagram {
          .diagram-item {
            margin: 1.5rem 0;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;

            .scope-bar {
              height: 8px;
              border-radius: 4px;
              margin: 0.5rem 0;

              &.var-scope {
                background: #e74c3c;
                width: 100%;
              }

              &.let-scope {
                background: #2ecc71;
                width: 60%;
              }
            }
          }
        }
      }

      .practice-steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .step {
          text-align: center;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;

          .step-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          h3 {
            color: #0984e3;
            margin: 0.5rem 0;
          }
        }
      }

      .special-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .special-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;

          pre {
            background: #2d3436;
            border-radius: 6px;
          }
        }
      }
    }

    .code-example {
      background: #2d3436;
      border-radius: 8px;
      overflow: hidden;

      .code-block {
        color: #dfe6e9;
        font-family: 'Source Code Pro', monospace;
        padding: 1.5rem;
        font-size: 0.95rem;
        line-height: 1.6;
        overflow-x: auto;

        code {
          display: block;
        }
      }
    }
  }

  .doc-footer {
    .notice-board {
      background: #ffeaa7;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #fdcb6e;

      h3 {
        color: #d63031;
        margin-bottom: 1rem;
      }

      .notice-content {
        .notice-item {
          display: flex;
          align-items: center;
          margin: 1rem 0;

          .warning-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: #d63031;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .variables-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .declaration-grid,
    .practice-steps,
    .special-grid,
    .scope-comparison {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
