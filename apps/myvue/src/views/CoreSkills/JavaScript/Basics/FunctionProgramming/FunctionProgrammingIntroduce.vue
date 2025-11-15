<template>
  <div class="functional-programming-container">
    <header class="hero">
      <div class="hero-content">
        <h1>JavaScript函数式编程</h1>
        <p class="subtitle">构建更简洁、更可预测、更易维护的代码</p>
        <div class="decorative-shapes">
          <div class="shape circle"></div>
          <div class="shape triangle"></div>
          <div class="shape square"></div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-card">
        <div class="section-header">
          <i class="icon fas fa-info-circle"></i>
          <h2>什么是函数式编程？</h2>
        </div>
        <div class="card-content">
          <p>函数式编程(FP)是一种<strong>声明式</strong>编程范式，它将计算视为数学函数的求值，并避免使用程序状态和可变数据。</p>
          <p>核心思想：<span class="highlight">函数是第一等公民</span>，即函数可以作为参数传递、作为返回值，并且可以赋值给变量。</p>
          <div class="comparison">
            <div class="paradigm imperative">
              <h3>命令式编程</h3>
              <ul>
                <li>"如何做" - 详细步骤</li>
                <li>可变状态</li>
                <li>循环控制结构</li>
                <li>面向过程</li>
              </ul>
            </div>
            <div class="paradigm functional">
              <h3>函数式编程</h3>
              <ul>
                <li>"做什么" - 声明结果</li>
                <li>不可变数据</li>
                <li>递归和高阶函数</li>
                <li>纯函数</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="principles-section">
        <div class="section-header">
          <i class="icon fas fa-cogs"></i>
          <h2>函数式编程核心原则</h2>
        </div>
        <div class="principles-grid">
          <div class="principle-card">
            <div class="principle-icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>纯函数</h3>
            <p>相同输入总是产生相同输出，且没有副作用</p>
            <div class="code-example">
              <pre><code>// 非纯函数
let taxRate = 0.1;
function calculateTax(amount) {
  return amount * taxRate; // 依赖外部状态
}

// 纯函数
function pureCalculateTax(amount, rate) {
  return amount * rate;
}</code></pre>
            </div>
          </div>

          <div class="principle-card">
            <div class="principle-icon">
              <i class="fas fa-ban"></i>
            </div>
            <h3>不可变性</h3>
            <p>数据创建后不能被修改，只能通过创建新数据来更新</p>
            <div class="code-example">
              <pre><code>// 可变操作
const arr = [1, 2, 3];
arr.push(4); // 修改原数组

// 不可变操作
const newArr = [...arr, 4];
// 或使用concat: arr.concat(4)</code></pre>
            </div>
          </div>

          <div class="principle-card">
            <div class="principle-icon">
              <i class="fas fa-ban"></i>
            </div>
            <h3>单一职责原则</h3>
            <p>一个函数只做一件事</p>
            <div class="code-example">
              <pre><code>function handle(num) {
  return num * 2
}

function handle2(num) {
  return num * 3
}</code></pre>
            </div>
          </div>




        </div>
      </section>

      <section class="types-section">
        <div class="section-header">
          <i class="icon fas fa-shapes"></i>
          <h2>函数式编程核心概念</h2>
        </div>
        <div class="types-container">
          <div class="type-card">
            <h3><i class="fas fa-filter"></i> 柯里化 (Currying)</h3>
            <p>将多参数函数转换为一系列单参数函数</p>
            <div class="code-example">
              <pre><code>// 普通函数
const add = (a, b) => a + b;

// 柯里化版本
const curriedAdd = a => b => a + b;

const add5 = curriedAdd(5);
add5(3); // 8</code></pre>
            </div>
          </div>

          <div class="type-card">
            <h3><i class="fas fa-magic"></i> 部分应用 (Partial Application)</h3>
            <p>固定函数的部分参数，创建一个新函数</p>
            <div class="code-example">
              <pre><code>const partial = (fn, ...fixedArgs) =>
  (...remainingArgs) =>
    fn(...fixedArgs, ...remainingArgs);

const multiply = (a, b) => a * b;
const double = partial(multiply, 2);
double(5); // 10</code></pre>
            </div>
          </div>
          <div class="type-card">
            <h3>函数组合</h3>
            <p>将多个简单函数组合成更复杂的功能</p>
            <div class="code-example">
              <pre><code>const compose = (f, g) => x => f(g(x));

const toUpperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;

const shout = compose(exclaim, toUpperCase);

shout('hello'); // "HELLO!"</code></pre>
            </div>
          </div>

          <div class="type-card">
            <h3>高阶函数</h3>
            <p>接收函数作为参数或返回函数的函数</p>
            <div class="code-example">
              <pre><code>// 接受函数作为参数
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// 返回函数
const multiplier = factor =>
  number => number * factor;

const double = multiplier(2);
double(5); // 10</code></pre>
            </div>
          </div>

          <div class="type-card">
            <h3><i class="fas fa-box"></i> 函子 (Functors)</h3>
            <p>实现了map方法并遵守特定规则的对象</p>
            <div class="code-example">
              <pre><code>// 数组是函子
[1, 2, 3].map(x => x * 2);

// 自定义函子
class Maybe {
  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return this.value
      ? new Maybe(fn(this.value))
      : new Maybe(null);
  }
}</code></pre>
            </div>
          </div>

          <div class="type-card">
            <h3><i class="fas fa-link"></i> Monad</h3>
            <p>处理副作用和异步操作的结构</p>
            <div class="code-example">
              <pre><code>// Promise是Monad
fetch('/api/data')
  .then(response => response.json())
  .then(data => process(data))
  .catch(error => handleError(error));

// Maybe Monad
new Maybe(5)
  .map(x => x * 2)
  .map(x => x + 1); // Maybe(11)</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="pros-cons-section">
        <div class="section-header">
          <i class="icon fas fa-balance-scale"></i>
          <h2>函数式编程的优缺点</h2>
        </div>
        <div class="pros-cons-container">
          <div class="pros">
            <h3>优势</h3>
            <ul>
              <li><i class="fas fa-check-circle"></i> 更易理解和维护的代码</li>
              <li><i class="fas fa-check-circle"></i> 更好的可测试性（纯函数）</li>
              <li><i class="fas fa-check-circle"></i> 更少的bug（无副作用）</li>
              <li><i class="fas fa-check-circle"></i> 更好的并发支持</li>
              <li><i class="fas fa-check-circle"></i> 代码复用性高</li>
              <li><i class="fas fa-check-circle"></i> 惰性求值提高性能</li>
            </ul>
          </div>

          <div class="cons">
            <h3>挑战</h3>
            <ul>
              <li><i class="fas fa-exclamation-triangle"></i> 学习曲线陡峭</li>
              <li><i class="fas fa-exclamation-triangle"></i> 递归可能导致堆栈溢出</li>
              <li><i class="fas fa-exclamation-triangle"></i> 处理I/O等副作用较复杂</li>
              <li><i class="fas fa-exclamation-triangle"></i> 可能产生性能开销</li>
              <li><i class="fas fa-exclamation-triangle"></i> 需要改变思维方式</li>
              <li><i class="fas fa-exclamation-triangle"></i> 调试可能更困难</li>
            </ul>
          </div>
        </div>

        <div class="applications">
          <h3>适用场景</h3>
          <div class="app-grid">
            <div class="app-card">
              <i class="fas fa-calculator"></i>
              <h4>数据处理</h4>
              <p>数据转换、过滤和聚合</p>
            </div>
            <div class="app-card">
              <i class="fas fa-chart-line"></i>
              <h4>并发编程</h4>
              <p>并行任务处理</p>
            </div>
            <div class="app-card">
              <i class="fas fa-sitemap"></i>
              <h4>复杂状态管理</h4>
              <p>Redux/Vuex等状态管理库</p>
            </div>
            <div class="app-card">
              <i class="fas fa-code"></i>
              <h4>领域特定语言</h4>
              <p>创建声明式API</p>
            </div>
          </div>
        </div>
      </section>

      <section class="adoption-section">
        <div class="section-header">
          <i class="icon fas fa-rocket"></i>
          <h2>在JavaScript中采用函数式编程</h2>
        </div>
        <div class="adoption-content">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>从纯函数开始</h3>
                <p>确保函数没有副作用，相同输入总是产生相同输出</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>使用高阶函数</h3>
                <p>掌握map、filter、reduce等数组方法</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>拥抱不可变性</h3>
                <p>使用Object.freeze、Object.assign、展开运算符等</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>尝试函数组合</h3>
                <p>使用lodash/fp或Ramda等函数式工具库</p>
              </div>
            </div>
          </div>

          <div class="resources">
            <h3>学习资源</h3>
            <ul>
              <li><i class="fas fa-book"></i> "函数式编程指北" - 开源书籍</li>
              <li><i class="fab fa-github"></i> Ramda - 实用的函数式JavaScript库</li>
              <li><i class="fab fa-js"></i> Lodash/fp - lodash的函数式版本</li>
              <li><i class="fas fa-video"></i> "Functional Programming in JavaScript" - Udemy课程</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> JavaScript函数式编程指南 | 使用Vue 3和TypeScript构建</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-github"></i> GitHub</a>
        <a href="#"><i class="fab fa-codepen"></i> CodePen</a>
        <a href="#"><i class="fab fa-js"></i> JavaScript</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据，实际组件中可能不需要
const activeSection = ref(0);
</script>

<style lang="less" scoped>



// 配色方案
@primary: #4e6dc5;
@secondary: #6d4ec5;
@accent: #4ec5a8;
@background: #f8f9fc;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;
@success: #67c23a;
@warning: #e6a23c;
@error: #f56c6c;
@info: #909399;
@purple: #9c27b0;

.functional-programming-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text;
  background-color: @background;
  min-height: 100vh;

  .hero {
    text-align: center;
    padding: 60px 20px 40px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, @primary 0%, @secondary 100%);
    color: white;
    border-radius: 0 0 20px 20px;
    position: relative;
    overflow: hidden;

    .hero-content {
      position: relative;
      z-index: 2;
    }

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .decorative-shapes {
      display: flex;
      justify-content: center;
      gap: 25px;
      margin-top: 30px;

      .shape {
        width: 80px;
        height: 80px;
        opacity: 0.2;
        animation: float 6s ease-in-out infinite;

        &.circle {
          border-radius: 50%;
          background: white;
          animation-delay: 0s;
        }

        &.triangle {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid white;
          background: transparent;
          animation-delay: 0.5s;
        }

        &.square {
          background: white;
          animation-delay: 1s;
        }
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      color: @text;
      margin: 0;
    }

    .icon {
      margin-right: 12px;
      color: @primary;
      font-size: 1.5rem;
    }
  }

  .intro-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;

    p {
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 20px;
    }

    .highlight {
      background: linear-gradient(120deg, fade(@accent, 20%) 0%, fade(@accent, 0%) 100%);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    .comparison {
      display: flex;
      gap: 25px;
      margin-top: 30px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .paradigm {
        flex: 1;
        padding: 25px;
        border-radius: 12px;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid @border;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.6;
          }
        }

        &.imperative {
          background: fade(@error, 7%);
          border-left: 4px solid @error;
        }

        &.functional {
          background: fade(@success, 7%);
          border-left: 4px solid @success;
        }
      }
    }
  }

  .principles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .principle-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .principle-icon {
      width: 60px;
      height: 60px;
      background: fade(@primary, 10%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      i {
        font-size: 1.8rem;
        color: @primary;
      }
    }

    h3 {
      font-size: 1.4rem;
      color: @primary;
      margin-top: 0;
      margin-bottom: 15px;
    }

    p {
      color: @text-light;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .code-example {
      background: #f6f8fa;
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      border: 1px solid @border;

      pre {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      code {
        color: #24292e;
      }
    }
  }

  .types-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .type-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.3rem;
      color: @secondary;
      margin-top: 0;
      margin-bottom: 15px;
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
        color: @purple;
      }
    }

    p {
      color: @text-light;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .code-example {
      background: #f6f8fa;
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      border: 1px solid @border;
      font-size: 0.85rem;
    }
  }

  .pros-cons-container {
    display: flex;
    gap: 25px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .pros,
    .cons {
      flex: 1;
      padding: 25px;
      border-radius: 16px;
      background: @card-bg;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.4rem;
        margin-top: 0;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid @border;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 15px;
          padding-left: 35px;
          position: relative;
          line-height: 1.6;

          i {
            position: absolute;
            left: 0;
            top: 3px;
            font-size: 1.2rem;
          }
        }
      }
    }

    .pros {
      border-top: 4px solid @success;

      i {
        color: @success;
      }
    }

    .cons {
      border-top: 4px solid @error;

      i {
        color: @error;
      }
    }
  }

  .applications {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;

    h3 {
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 25px;
      color: @text;
    }

    .app-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .app-card {
      text-align: center;
      padding: 25px 15px;
      border-radius: 12px;
      background: fade(@accent, 7%);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        background: fade(@accent, 12%);
      }

      i {
        font-size: 2.5rem;
        color: @accent;
        margin-bottom: 15px;
      }

      h4 {
        margin: 0 0 10px;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .adoption-content {
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .steps {
      flex: 1;
    }

    .resources {
      flex: 1;
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.4rem;
        margin-top: 0;
        margin-bottom: 20px;
        color: @text;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 15px;
          padding-left: 35px;
          position: relative;
          line-height: 1.6;

          i {
            position: absolute;
            left: 0;
            top: 3px;
            font-size: 1.2rem;
            color: @primary;
          }
        }
      }
    }
  }

  .step {
    display: flex;
    margin-bottom: 25px;
    background: @card-bg;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-right: 20px;
    }

    .step-content {
      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: @text;
      }

      p {
        margin: 0;
        color: @text-light;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border;

    .footer-links {
      margin-top: 15px;

      a {
        color: @primary;
        text-decoration: none;
        margin: 0 15px;
        display: inline-block;

        i {
          margin-right: 5px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
