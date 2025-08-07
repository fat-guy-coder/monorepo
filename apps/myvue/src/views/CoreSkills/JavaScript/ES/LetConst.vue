<template>
  <div class="container">
    <header class="header">
      <h1 class="title">ES6 中的 let 与 const</h1>
      <p class="subtitle">块级作用域变量的新时代</p>
    </header>

    <main class="main-content">
      <!-- 基本介绍 -->
      <section class="section">
        <h2 class="section-title">什么是 let 和 const？</h2>
        <div class="section-content">
          <p>
            let 和 const 是 ES6（ECMAScript 2015）引入的新变量声明方式，用于解决 var 声明变量时的一些问题。
            它们提供了块级作用域，使 JavaScript 变量管理更加严谨和可预测。
          </p>
          <div class="code-example">
            <pre><code>// var 声明
var a = 1;

// let 声明
let b = 2;

// const 声明
const c = 3;</code></pre>
          </div>
        </div>
      </section>

      <!-- 主要作用 -->
      <section class="section">
        <h2 class="section-title">主要作用</h2>
        <div class="section-content">
          <div class="feature-grid">
            <div class="feature-card">
              <h3>let 的作用</h3>
              <ul>
                <li>声明块级作用域的变量</li>
                <li>允许重新赋值但不允许重复声明</li>
                <li>解决变量提升带来的问题</li>
                <li>在循环中创建独立作用域</li>
              </ul>
            </div>
            <div class="feature-card">
              <h3>const 的作用</h3>
              <ul>
                <li>声明块级作用域的常量</li>
                <li>声明时必须初始化且不允许重新赋值</li>
                <li>对于引用类型，允许修改其属性</li>
                <li>提高代码可读性和可维护性</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作原理 -->
      <section class="section">
        <h2 class="section-title">工作原理</h2>
        <div class="section-content">
          <div class="principle-card">
            <h3>块级作用域</h3>
            <p>
              let 和 const 声明的变量具有块级作用域，即只在最近的花括号 <code>{}</code> 内有效，
              包括 if、for、while 等语句块。
            </p>
            <div class="code-example">
              <pre><code>if (true) {
  let x = 10;
  const y = 20;
}
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined</code></pre>
            </div>
          </div>

          <div class="principle-card">
            <h3>变量提升与暂时性死区</h3>
            <p>
              let 和 const 声明的变量存在"暂时性死区"（Temporal Dead Zone），在声明之前使用会抛出错误，
              这与 var 声明的变量会被提升到作用域顶部不同。
            </p>
            <div class="code-example">
              <pre><code>console.log(a); // undefined (var声明的变量提升)
var a = 1;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 3;</code></pre>
            </div>
          </div>

          <div class="principle-card">
            <h3>const 的不可变性</h3>
            <p>
              const 声明的变量不能重新赋值，但对于对象和数组等引用类型，其内部属性或元素是可以修改的，
              因为 const 只保证变量引用不变。
            </p>
            <div class="code-example">
              <pre><code>const PI = 3.14159;
PI = 3.14; // TypeError: Assignment to constant variable

const person = { name: "Alice" };
person.name = "Bob"; // 允许修改属性
person.age = 30; // 允许添加属性

const numbers = [1, 2, 3];
numbers.push(4); // 允许修改数组
numbers[0] = 0; // 允许修改元素</code></pre>
            </div>
          </div>

          <section class="principle-card">
        <h2 class="section-title">🧐 let/const 也有变量提升吗？</h2>
        <div class="let-const-hoisting-explanation">
          <p>
            很多人以为 <code>let</code> 和 <code>const</code> 没有变量提升，其实它们也会被提升到当前作用域的顶部，
            <strong>只是不会初始化</strong>。在声明之前访问会进入“暂存死区”（TDZ），导致 <code>ReferenceError</code>。
          </p>
          <div class="code-example">
            <pre class="code-block"><code>console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 30;</code></pre>
          </div>
          <p>
            <strong>原理解析：</strong> <br>
            <code>let</code> 和 <code>const</code> 声明的变量在作用域开始时就已经“被创建”，
            但在代码运行到声明语句之前，变量处于“未初始化”状态，不能被访问。
            这就是为什么会报错，而不是像 <code>var</code> 那样返回 <code>undefined</code>。
          </p>
          <div class="code-example">
            <pre class="code-block"><code>// 伪代码理解
{
  // TDZ开始
  // 访问b会报错
  let b; // 声明提升到块顶部，但未初始化
  // 现在b可用
}</code></pre>
          </div>
          <ul>
            <li><strong>var：</strong> 声明提升+初始化为<code>undefined</code>，可提前访问</li>
            <li><strong>let/const：</strong> 只提升声明，不初始化，提前访问报错</li>
          </ul>
        </div>
      </section>

        </div>
      </section>

      <!-- 实际提升 -->
      <section class="section">
        <h2 class="section-title">实际开发中的提升</h2>
        <div class="section-content">
          <div class="improvement-list">
            <div class="improvement-item">
              <h3>1. 减少变量污染</h3>
              <p>
                块级作用域避免了变量泄露到外部作用域，减少了全局变量污染和意外的变量覆盖。
              </p>
            </div>
            <div class="improvement-item">
              <h3>2. 提高代码可读性</h3>
              <p>
                const 明确表示变量不会被重新赋值，让代码意图更清晰，提高了代码的可维护性。
              </p>
            </div>
            <div class="improvement-item">
              <h3>3. 减少错误</h3>
              <p>
                暂时性死区和不允许重复声明的特性，帮助开发者在编码阶段发现潜在错误。
              </p>
            </div>
            <div class="improvement-item">
              <h3>4. 循环中的表现</h3>
              <p>
                let 在 for 循环中每次迭代都会创建一个新的变量绑定，解决了 var 导致的循环闭包问题。
              </p>
              <div class="code-example">
                <pre><code>// 使用 var 的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 3 3 3
}

// 使用 let 的解决
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 0 1 2
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="section">
        <h2 class="section-title">适用场景</h2>
        <div class="section-content">
          <div class="use-case-grid">
            <div class="use-case-card">
              <h3>使用 let 的场景</h3>
              <ul>
                <li>循环计数器（for、while 循环）</li>
                <li>需要重新赋值的变量</li>
                <li>条件语句中声明的变量</li>
                <li>函数内部需要多次修改的变量</li>
              </ul>
              <div class="code-snippet">
                <code>let count = 0;
count += 1; // 需要重新赋值，使用let</code>
              </div>
            </div>
            <div class="use-case-card">
              <h3>使用 const 的场景</h3>
              <ul>
                <li>声明不希望被重新赋值的变量</li>
                <li>配置项和常量值（如 PI、URL 等）</li>
                <li>声明对象和数组（即使需要修改其内容）</li>
                <li>导入模块和定义函数</li>
              </ul>
              <div class="code-snippet">
                <code>const MAX_SIZE = 100;
const user = { name: "John" };
user.age = 25; // 允许，使用const</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section">
        <h2 class="section-title">注意事项</h2>
        <div class="section-content">
          <div class="warning-list">
            <div class="warning-item">
              <h3>1. 重复声明</h3>
              <p>
                在同一作用域内，let 和 const 不允许重复声明同一变量，也不允许与 var 声明的变量重名。
              </p>
              <div class="code-snippet error">
                <code>let x = 1;
let x = 2; // SyntaxError: Identifier 'x' has already been declared</code>
              </div>
            </div>
            <div class="warning-item">
              <h3>2. const 初始化</h3>
              <p>
                const 声明的变量必须在声明时初始化，否则会报错。
              </p>
              <div class="code-snippet error">
                <code>const x; // SyntaxError: Missing initializer in const declaration</code>
              </div>
            </div>
            <div class="warning-item">
              <h3>3. 块级作用域边界</h3>
              <p>
                要注意块级作用域的边界，避免在作用域外访问 let/const 声明的变量。
              </p>
            </div>
            <div class="warning-item">
              <h3>4. 循环中的 const</h3>
              <p>
                在 for 循环中不能使用 const 作为循环变量（因为需要重新赋值），但在 for...in 和 for...of 中可以。
              </p>
              <div class="code-snippet">
                <code>// 错误
for (const i = 0; i < 3; i++) {} // TypeError: Assignment to constant variable

// 正确
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}</code>
              </div>
            </div>
            <div class="warning-item">
              <h3>5. 全局作用域</h3>
              <p>
                在全局作用域中，let/const 声明的变量不会成为 window 对象的属性，而 var 声明的会。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section">
        <h2 class="section-title">最佳实践</h2>
        <div class="section-content">
          <ul class="best-practices">
            <li>优先使用 const，只有当需要重新赋值时才使用 let</li>
            <li>避免使用 var，保持代码风格一致</li>
            <li>对引用类型使用 const 声明，明确表示不改变引用</li>
            <li>在循环中使用 let 声明计数器变量</li>
            <li>利用块级作用域封装临时变量，减少命名冲突</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>ES6 let 与 const 详解 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑部分，当前为静态展示
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  color: #334155;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.7;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;

  .title {
    color: #1e293b;
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
  }
}

.main-content {
  .section {
    margin-bottom: 40px;

    .section-title {
      color: #1e293b;
      border-bottom: 2px solid #dbeafe;
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    .section-content {
      background-color: #fff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
  }

  .code-example {
    background-color: #f8fafc;
    border-radius: 6px;
    margin: 15px 0;
    overflow-x: auto;
    border: 1px solid #e2e8f0;

    pre {
      margin: 0;
      padding: 15px;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: #0f172a;
      }
    }
  }

  .code-snippet {
    background-color: #f8fafc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    border: 1px solid #e2e8f0;
    overflow-x: auto;

    &.error {
      background-color: #fee2e2;
      border-color: #fecaca;
      color: #b91c1c;
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .feature-card, .use-case-card {
    background-color: #f8fafc;
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      margin-top: 0;
      color: #1e293b;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }

    ul {
      margin: 0;
      padding-left: 25px;

      li {
        margin-bottom: 8px;
      }
    }
  }

  .principle-card {
    margin-bottom: 25px;

    h3 {
      color: #1e293b;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .improvement-list {
    .improvement-item {
      margin-bottom: 25px;

      h3 {
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.1rem;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .use-case-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .warning-list {
    .warning-item {
      background-color: #fffbeb;
      border-radius: 6px;
      padding: 18px;
      margin-bottom: 15px;
      border-left: 3px solid #f59e0b;

      h3 {
        color: #92400e;
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.1rem;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .best-practices {
    background-color: #f0fdf4;
    border-radius: 6px;
    padding: 20px 25px;
    margin: 0;
    border: 1px solid #dcfce7;

    li {
      margin-bottom: 10px;
      position: relative;

      &::before {
        content: "•";
        color: #166534;
        font-weight: bold;
        position: absolute;
        left: -20px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

footer.footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .feature-grid, .use-case-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.5rem;
  }
}
</style>
