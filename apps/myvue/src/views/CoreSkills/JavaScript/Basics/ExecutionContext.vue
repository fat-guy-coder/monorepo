<template>
  <div class="execution-context-container">
    <header class="header">
      <h1>JavaScript 执行上下文详解</h1>
      <p>深入理解 JavaScript 代码执行的底层机制</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <div class="section-header">
          <div class="icon">🧠</div>
          <h2>概念解析</h2>
        </div>
        <div class="content">
          <p class="definition">执行上下文（Execution Context）是 JavaScript 代码执行时的环境抽象，包含了代码执行所需的所有信息。</p>

          <div class="analogy">
            <div class="analogy-card">
              <div class="analogy-icon">🏗️</div>
              <div class="analogy-content">
                <h3>代码执行的基础</h3>
                <p>每当 JavaScript 代码执行时，都会创建一个新的执行上下文</p>
              </div>
            </div>

            <div class="analogy-card">
              <div class="analogy-icon">📚</div>
              <div class="analogy-content">
                <h3>环境记录器</h3>
                <p>存储变量、函数声明和形参信息</p>
              </div>
            </div>
          </div>

          <div class="context-types">
            <h3>三种执行上下文类型</h3>
            <div class="types-grid">
              <div class="type">
                <h4>全局执行上下文</h4>
                <p>基础上下文，代码开始执行时创建</p>
                <div class="code-snippet"><code>// 不在任何函数内部的代码</code></div>
              </div>
              <div class="type">
                <h4>函数执行上下文</h4>
                <p>每次函数调用时创建</p>
                <div class="code-snippet"><code>function example() { /* 新上下文 */ }</code></div>
              </div>
              <div class="type">
                <h4>eval 执行上下文</h4>
                <p>eval() 函数内部代码（不推荐使用）</p>
                <div class="code-snippet"><code>eval('var a = 10');</code></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用部分 -->
      <section class="card role">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>核心作用</h2>
        </div>

        <div class="content">
          <div class="role-grid">
            <div class="role-item">
              <div class="role-icon">📦</div>
              <h3>变量存储</h3>
              <p>存储变量、函数和参数</p>
            </div>
            <div class="role-item">
              <div class="role-icon">🔗</div>
              <h3>作用域链</h3>
              <p>确定变量和函数的可访问性</p>
            </div>
            <div class="role-item">
              <div class="role-icon">📍</div>
              <h3>this 绑定</h3>
              <p>确定函数内部的 this 值</p>
            </div>
            <div class="role-item">
              <div class="role-icon">🔄</div>
              <h3>执行顺序</h3>
              <p>管理代码执行流程</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 创建过程 -->
      <section class="card creation">
        <div class="section-header">
          <div class="icon">🔨</div>
          <h2>创建过程</h2>
        </div>

        <div class="content">
          <div class="creation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>创建阶段</h3>
                <ul>
                  <li>创建变量对象（VO）</li>
                  <li>建立作用域链</li>
                  <li>确定 this 值</li>
                </ul>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>执行阶段</h3>
                <ul>
                  <li>变量赋值</li>
                  <li>函数引用</li>
                  <li>执行代码</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="creation-details">
            <h3>变量对象（VO）详解</h3>
            <div class="vo-details">
              <div class="vo-phase">
                <h4>创建阶段</h4>
                <pre><code>function example(a, b) {
  var c = 10;
  function d() {}
  var e = function() {};
}

// 创建阶段的 VO（未执行）
VO = {
  arguments: {0: a, 1: b, length: 2},
  a: undefined,
  b: undefined,
  c: undefined,
  d: pointer to function d(),
  e: undefined
}</code></pre>
              </div>

              <div class="vo-phase">
                <h4>执行阶段</h4>
                <pre><code>// 执行阶段的 VO（执行后）
VO = {
  arguments: {0: a, 1: b, length: 2},
  a: 1,         // 假设调用 example(1, 2)
  b: 2,
  c: 10,
  d: pointer to function d(),
  e: pointer to function expression
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 执行栈 -->
      <section class="card stack">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>执行栈 <a @click="goToByRouteName('AsyncProgrammingIntroduce')">跳转详细</a> </h2>
        </div>

        <div class="content">
          <div class="stack-explanation">
            <p>执行栈（调用栈）是一个 LIFO（后进先出）结构，用于存储代码执行期间创建的所有执行上下文。</p>

            <div class="stack-visualization">
              <div class="stack-item top">
                <div class="stack-label">当前执行</div>
                <div class="stack-content">funcC() 上下文</div>
              </div>
              <div class="stack-item">
                <div class="stack-content">funcB() 上下文</div>
              </div>
              <div class="stack-item">
                <div class="stack-content">funcA() 上下文</div>
              </div>
              <div class="stack-item bottom">
                <div class="stack-label">栈底</div>
                <div class="stack-content">全局上下文</div>
              </div>
            </div>
          </div>

          <div class="stack-example">
            <h3>代码执行流程</h3>
            <div class="code-flow">
              <pre><code>function funcA() {
  console.log('进入 funcA');
  funcB();
  console.log('离开 funcA');
}

function funcB() {
  console.log('进入 funcB');
  funcC();
  console.log('离开 funcB');
}

function funcC() {
  console.log('进入 funcC');
  console.log('离开 funcC');
}

console.log('全局开始');
funcA();
console.log('全局结束');</code></pre>

              <div class="console-output">
                <h4>输出顺序：</h4>
                <ol>
                  <li>全局开始</li>
                  <li>进入 funcA</li>
                  <li>进入 funcB</li>
                  <li>进入 funcC</li>
                  <li>离开 funcC</li>
                  <li>离开 funcB</li>
                  <li>离开 funcA</li>
                  <li>全局结束</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用域链 -->
      <section class="card scope-chain">
        <div class="section-header">
          <div class="icon">🔗</div>
          <h2>作用域链<a @click="goToByRouteName('Scope')">跳转详细</a></h2>
        </div>

        <div class="content">
          <div class="scope-explanation">
            <p>作用域链是执行上下文的属性，用于解析变量和函数。它是当前上下文变量对象 + 所有父级上下文变量对象的集合。</p>

            <div class="scope-example">
              <pre><code>var globalVar = 'global';

function outer() {
  var outerVar = 'outer';

  function inner() {
    var innerVar = 'inner';
    console.log(innerVar);    // 当前上下文
    console.log(outerVar);    // 父级上下文
    console.log(globalVar);   // 全局上下文
  }

  inner();
}

outer();</code></pre>

              <div class="scope-chain-visual">
                <div class="scope-level">
                  <div class="scope-label">inner() 作用域链</div>
                  <div class="scope-items">
                    <div class="scope-item">inner VO</div>
                    <div class="scope-arrow">→</div>
                    <div class="scope-item">outer VO</div>
                    <div class="scope-arrow">→</div>
                    <div class="scope-item">Global VO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- this 绑定 -->
      <section class="card this-binding">
        <div class="section-header">
          <div class="icon">📍</div>
          <h2>this 绑定规则<a @click="goToByRouteName('ThisBinding')">跳转详细</a></h2>
        </div>

        <div class="content">
          <div class="binding-rules">
            <div class="rule">
              <h3>1. 默认绑定</h3>
              <p>独立函数调用：this 指向全局对象</p>
              <pre><code>function example() {
  console.log(this); // 浏览器: window
}</code></pre>
            </div>

            <div class="rule">
              <h3>2. 隐式绑定</h3>
              <p>方法调用：this 指向调用对象</p>
              <pre><code>const obj = {
  value: 42,
  getValue: function() {
    console.log(this.value); // 42
  }
};
obj.getValue();</code></pre>
            </div>

            <div class="rule">
              <h3>3. 显式绑定</h3>
              <p>call/apply/bind：明确指定 this</p>
              <pre><code>function showValue() {
  console.log(this.value);
}

const obj = { value: 99 };
showValue.call(obj); // 99</code></pre>
            </div>

            <div class="rule">
              <h3>4. new 绑定</h3>
              <p>构造函数：this 指向新创建的对象</p>
              <pre><code>function Person(name) {
  this.name = name;
}

const p = new Person('Alice');
console.log(p.name); // Alice</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>关键要点</h3>
        <p>执行上下文是 JavaScript 代码执行的底层环境，包含变量对象、作用域链和 this 绑定。理解执行上下文对于掌握作用域、闭包和 this 机制至关重要。</p>
      </div>
      <div class="copyright">JavaScript 核心机制 | 深入理解执行上下文</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['goToByRouteName']);

const goToByRouteName = (routeName: string) => {
  emit('goToByRouteName', routeName);
};

// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.execution-context-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #1e40af;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .icon {
    font-size: 1.8rem;
    margin-right: 16px;
    color: #3b82f6;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
    border-bottom: 2px solid #dbeafe;
    padding-bottom: 8px;
  }
}

/* 概念部分样式 */
.concept {
  .definition {
    font-size: 1.1rem;
    background: #eff6ff;
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
    margin-bottom: 24px;
  }

  .analogy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;

    .analogy-card {
      display: flex;
      background: #f0f9ff;
      border-radius: 12px;
      padding: 18px;
      border: 1px solid #dbeafe;

      .analogy-icon {
        font-size: 2rem;
        margin-right: 16px;
        min-width: 50px;
      }

      h3 {
        margin: 0 0 8px;
        font-size: 1.2rem;
        color: #1e40af;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #4b5563;
      }
    }
  }

  .context-types {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .type {
      background: #f0f9ff;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #dbeafe;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }

      h4 {
        margin: 0 0 8px;
        color: #1e40af;
      }

      p {
        margin: 0 0 12px;
        color: #4b5563;
        font-size: 0.95rem;
      }

      .code-snippet {
        background: #e0f2fe;
        border-radius: 6px;
        padding: 8px;
        font-size: 0.9rem;

        code {
          font-family: 'SFMono-Regular', Consolas, monospace;
          color: #1e40af;
        }
      }
    }
  }
}

/* 作用部分样式 */
.role {
  .role-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .role-item {
    background: #f0fdf4;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #bbf7d0;

    .role-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      color: #10b981;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #065f46;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 创建过程样式 */
.creation {
  .creation-steps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .step {
    display: flex;
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    .step-number {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .step-content {
      h3 {
        font-size: 1.3rem;
        margin: 0 0 12px;
        color: #1e40af;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          color: #4b5563;
        }
      }
    }
  }

  .creation-details {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .vo-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .vo-phase {
      h4 {
        font-size: 1.1rem;
        margin: 0 0 12px;
        color: #1e40af;
      }
    }
  }
}

/* 执行栈样式 */
.stack {
  .stack-explanation {
    margin-bottom: 24px;

    p {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }

  .stack-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;

    .stack-item {
      width: 80%;
      padding: 18px;
      background: #f0f9ff;
      border: 2px solid #dbeafe;
      text-align: center;
      position: relative;

      &.top {
        background: #dbeafe;
        border-color: #3b82f6;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        z-index: 3;

        .stack-label {
          position: absolute;
          top: -10px;
          right: 20px;
          background: #3b82f6;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }

      &.bottom {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        z-index: 1;

        .stack-label {
          position: absolute;
          bottom: -10px;
          left: 20px;
          background: #64748b;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }
    }
  }

  .stack-example {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .code-flow {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .console-output {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e2e8f0;

      h4 {
        font-size: 1.1rem;
        margin: 0 0 12px;
        color: #1e40af;
      }

      ol {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          padding-left: 8px;
        }
      }
    }
  }
}

/* 作用域链样式 */
.scope-chain {
  .scope-explanation {
    p {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }

  .scope-example {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .scope-chain-visual {
    background: #f0f9ff;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #dbeafe;

    .scope-level {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .scope-label {
      font-weight: 500;
      margin-bottom: 8px;
      color: #1e40af;
    }

    .scope-items {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .scope-item {
      background: #dbeafe;
      padding: 12px 20px;
      border-radius: 8px;
      margin: 0 8px;
    }

    .scope-arrow {
      color: #93c5fd;
      font-weight: bold;
    }
  }
}

/* this 绑定样式 */
.this-binding {
  .binding-rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .rule {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  text-align: center;

  .summary {
    max-width: 800px;
    margin: 0 auto 20px;

    h3 {
      font-size: 1.4rem;
      margin: 0 0 16px;
      color: #2563eb;
    }

    p {
      font-size: 1.1rem;
      color: #4b5563;
      margin: 0;
      line-height: 1.7;
    }
  }

  .copyright {
    font-size: 0.95rem;
    color: #64748b;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }
}
</style>
