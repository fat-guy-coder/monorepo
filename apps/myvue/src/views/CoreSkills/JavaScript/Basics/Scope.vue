<template>
  <div class="scope-container">
    <header class="header">
      <h1>JavaScript作用域与作用域链</h1>
      <p class="subtitle">深入理解变量访问的核心机制</p>
    </header>

    <div class="content">
      <section class="section">
        <h2>作用域是什么？</h2>
        <div class="definition-card">
          <p>作用域(Scope)是程序中定义变量的区域，它决定了变量和函数的可访问范围。</p>
          <p>JavaScript采用词法作用域(lexical scoping)，作用域在代码编写阶段就已经确定。</p>
        </div>
      </section>

      <div class="columns">
        <section class="section">
          <h2>作用域类型</h2>

          <div class="scope-type">
            <h3>1. 全局作用域 (Global Scope)</h3>
            <div class="code-block">
              <pre><code>// 在代码任何地方都可访问
const globalVar = '全局变量';

function globalFunc() {
  console.log(globalVar); // 可访问
}</code></pre>
            </div>
          </div>

          <div class="scope-type">
            <h3>2. 函数作用域 (Function Scope)</h3>
            <div class="code-block">
              <pre><code>function outer() {
  // 函数作用域开始
  const outerVar = '外部变量';

  function inner() {
    // 内部函数作用域
    const innerVar = '内部变量';
    console.log(outerVar); // 可访问外部变量
  }

  inner();
  // console.log(innerVar); // 错误！无法访问内部变量
}</code></pre>
            </div>
          </div>

          <div class="scope-type">
            <h3>3. 块级作用域 (Block Scope - ES6+)</h3>
            <div class="code-block">
              <pre><code>{
  // 块级作用域开始
  let blockVar = '块级变量';
  const PI = 3.14;

  console.log(blockVar); // 可访问
}

// console.log(blockVar); // 错误！无法访问块级变量
// console.log(PI);       // 错误！</code></pre>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>作用域链</h2>
          <div class="definition-card">
            <p>作用域链(Scope Chain)是变量查找的机制：当访问变量时，JS引擎会从当前作用域开始查找，然后逐级向上查找，直到全局作用域。</p>
            <div class="scope-chain-diagram">
              <div class="chain-item global-scope">全局作用域</div>
              <div class="chain-arrow">↑</div>
              <div class="chain-item outer-scope">外层函数作用域</div>
              <div class="chain-arrow">↑</div>
              <div class="chain-item inner-scope">内层函数作用域</div>
            </div>
          </div>

          <h3>作用域链示例</h3>
          <div class="code-block">
            <pre><code>const globalVar = '全局';

function outer() {
  const outerVar = '外部';

  function inner() {
    const innerVar = '内部';

    // 变量查找顺序：
    // 1. inner作用域
    // 2. outer作用域
    // 3. 全局作用域
    console.log(innerVar);  // '内部' (在当前作用域找到)
    console.log(outerVar);  // '外部' (在outer作用域找到)
    console.log(globalVar); // '全局' (在全局作用域找到)
  }

  inner();
}

outer();</code></pre>
          </div>
        </section>
      </div>

      <section class="section">
        <h2>作用域与闭包</h2>
        <div class="closure-explanation">
          <p>闭包(Closure)是指函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。</p>

          <div class="code-block">
            <pre><code>function createCounter() {
  let count = 0; // 闭包保护的变量

  return {
    increment: () => { count++; },
    getCount: () => count,
    reset: () => { count = 0; }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1</code></pre>
          </div>

          <div class="closure-card">
            <p>闭包的关键点：</p>
            <ul>
              <li>内部函数访问外部函数作用域中的变量</li>
              <li>外部函数执行后，其作用域变量仍然被内部函数引用</li>
              <li>形成私有变量，避免全局污染</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>作用域最佳实践</h2>
        <div class="best-practices">
          <div class="practice-card">
            <div class="icon">✅</div>
            <h3>优先使用块级作用域</h3>
            <p>使用 let/const 替代 var，避免变量提升和意外覆盖</p>
          </div>

          <div class="practice-card">
            <div class="icon">✅</div>
            <h3>避免全局变量</h3>
            <p>减少全局命名空间污染，使用模块封装</p>
          </div>

          <div class="practice-card">
            <div class="icon">✅</div>
            <h3>合理使用闭包</h3>
            <p>用于创建私有变量和封装功能，但避免内存泄漏</p>
          </div>

          <div class="practice-card">
            <div class="icon">✅</div>
            <h3>理解变量提升</h3>
            <p>函数声明整体提升，变量声明提升但赋值不提升</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>深入理解作用域和作用域链是掌握JavaScript核心概念的关键一步</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示作用域概念，无交互逻辑
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@code-bg: #f1f1f1;
@border-color: #e0e0e0;
@shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

.scope-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
  }
}

.content {
  background: white;
  border-radius: 8px;
  box-shadow: @shadow;
  padding: 2rem;
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.8rem;
    color: @primary-color;
    margin-bottom: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@primary-color, 40%);
  }

  h3 {
    font-size: 1.4rem;
    color: darken(@secondary-color, 10%);
    margin: 1.5rem 0 0.8rem;
  }
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.definition-card {
  background: lighten(@light-bg, 2%);
  border-left: 4px solid @primary-color;
  padding: 1.2rem;
  border-radius: 0 4px 4px 0;
  margin-bottom: 1.5rem;
}

.scope-type {
  margin-bottom: 1.8rem;
}

.code-block {
  background: @code-bg;
  border-radius: 6px;
  padding: 1.2rem;
  margin: 0.8rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.95rem;
    line-height: 1.5;

    code {
      color: #333;
    }
  }
}

.scope-chain-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0;

  .chain-item {
    padding: 1rem;
    border: 2px solid @border-color;
    border-radius: 8px;
    width: 80%;
    text-align: center;
    margin: 0.5rem 0;
    background: white;
    font-weight: bold;

    &.global-scope {
      background: lighten(@primary-color, 45%);
      border-color: lighten(@primary-color, 20%);
    }

    &.outer-scope {
      background: lighten(@secondary-color, 40%);
      border-color: lighten(@secondary-color, 20%);
    }

    &.inner-scope {
      background: lighten(@accent-color, 40%);
      border-color: lighten(@accent-color, 20%);
    }
  }

  .chain-arrow {
    font-size: 1.2rem;
    color: lighten(@text-color, 40%);
    margin: 0.2rem 0;
  }
}

.closure-explanation {
  .closure-card {
    background: lighten(@light-bg, 2%);
    border-radius: 8px;
    padding: 1.2rem;
    margin-top: 1.2rem;
    border: 1px solid lighten(@secondary-color, 30%);

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .practice-card {
    background: white;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: @shadow;
    border-top: 3px solid @secondary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      color: @secondary-color;
    }

    h3 {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: @text-color;
    }

    p {
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  color: lighten(@text-color, 30%);
  font-style: italic;
  border-top: 1px solid @border-color;
}
</style>
