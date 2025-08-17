<template>
  <div class="trampoline-container">
    <header class="header">
      <h1 class="title">蹦床函数详解</h1>
      <p class="subtitle">解决递归调用栈溢出的优雅方案</p>
      <div class="decoration">
        <div class="loop"></div>
        <div class="loop"></div>
        <div class="loop"></div>
      </div>
    </header>

    <div class="content">
      <section class="card intro-card">
        <h2 class="section-title">什么是蹦床函数？</h2>
        <div class="definition">
          <p>蹦床函数(Trampoline Function)是一种将递归调用转换为循环迭代的技术，用于解决深层递归导致的调用栈溢出问题。</p>
          <p>它通过将递归函数包装为返回函数的函数，然后使用循环来连续调用这些函数，从而避免调用栈的不断增长。</p>
        </div>
      </section>

      <div class="grid-layout">
        <section class="card">
          <h2 class="section-title">作用与价值</h2>
          <ul class="benefits">
            <li>
              <div class="icon">🚫</div>
              <div>
                <h3>解决栈溢出问题</h3>
                <p>避免深度递归导致的调用栈溢出错误</p>
              </div>
            </li>
            <li>
              <div class="icon">⚡</div>
              <div>
                <h3>提升性能</h3>
                <p>减少函数调用开销，优化内存使用</p>
              </div>
            </li>
            <li>
              <div class="icon">🔄</div>
              <div>
                <h3>实现无限递归</h3>
                <p>理论上可以支持无限深度的递归操作</p>
              </div>
            </li>
            <li>
              <div class="icon">🎯</div>
              <div>
                <h3>保持代码清晰</h3>
                <p>相比迭代实现，更接近递归的思维模式</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="card">
          <h2 class="section-title">核心原理</h2>
          <div class="principle">
            <div class="step">
              <div class="step-number">1</div>
              <p>递归函数不再直接调用自身，而是返回一个封装了下一个调用的函数</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>蹦床函数接收初始函数并循环执行返回的函数</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>当返回非函数值时，循环终止并返回结果</p>
            </div>
            <div class="visualization">
              <div class="recursion">
                <span>递归调用</span>
                <div class="stack">
                  <div class="frame">调用帧1</div>
                  <div class="frame">调用帧2</div>
                  <div class="frame">调用帧3</div>
                  <div class="frame">调用帧4</div>
                  <div class="frame danger">栈溢出!</div>
                </div>
              </div>
              <div class="trampoline">
                <span>蹦床函数</span>
                <div class="loop">
                  <div class="iteration">迭代1</div>
                  <div class="iteration">迭代2</div>
                  <div class="iteration">迭代3</div>
                  <div class="iteration">迭代4</div>
                  <div class="iteration">...</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="card code-section">
        <h2 class="section-title">实现与使用</h2>
        <div class="code-examples">
          <div class="code-block">
            <h3>蹦床函数实现</h3>
            <pre><code>function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);

    while (typeof result === 'function') {
      result = result();
    }

    return result;
  };
}</code></pre>
          </div>

          <div class="code-block">
            <h3>递归函数改造</h3>
            <pre><code>// 普通递归 (容易栈溢出)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 蹦床版本
function trampolineFactorial(n, acc = 1) {
  if (n <= 1) return acc;

  // 返回函数而不是直接递归
  return () => trampolineFactorial(
    n - 1,
    n * acc
  );
}

// 使用蹦床函数包装
const safeFactorial = trampoline(trampolineFactorial);

// 调用安全版本
console.log(safeFactorial(10000)); // 可计算超大数</code></pre>
          </div>
        </div>
      </section>

      <div class="grid-layout">
        <section class="card">
          <h2 class="section-title">使用场景</h2>
          <ul class="use-cases">
            <li>
              <div class="icon">🧮</div>
              <div>
                <h3>数学计算</h3>
                <p>阶乘、斐波那契数列等递归算法</p>
              </div>
            </li>
            <li>
              <div class="icon">🌳</div>
              <div>
                <h3>树形结构操作</h3>
                <p>深度优先遍历大型树结构</p>
              </div>
            </li>
            <li>
              <div class="icon">🔄</div>
              <div>
                <h3>状态机实现</h3>
                <p>需要长时间运行的状态转换</p>
              </div>
            </li>
            <li>
              <div class="icon">🧩</div>
              <div>
                <h3>复杂算法</h3>
                <p>回溯算法、解析器等需要深度递归的场景</p>
              </div>
            </li>
            <li>
              <div class="icon">⚙️</div>
              <div>
                <h3>编译器实现</h3>
                <p>递归下降解析器等编译技术</p>
              </div>
            </li>
            <li>
              <div class="icon">📊</div>
              <div>
                <h3>数据处理</h3>
                <p>处理深度嵌套的JSON数据结构</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="card">
          <h2 class="section-title">对比与优势</h2>
          <div class="comparison">
            <div class="approach">
              <h3>普通递归</h3>
              <ul>
                <li>代码简洁直观</li>
                <li class="negative">栈深度受限</li>
                <li class="negative">大数计算会溢出</li>
                <li class="negative">性能较差</li>
              </ul>
            </div>

            <div class="vs">VS</div>

            <div class="approach">
              <h3>蹦床函数</h3>
              <ul>
                <li>避免栈溢出</li>
                <li>支持深层计算</li>
                <li>内存占用稳定</li>
                <li>性能更优</li>
                <li class="negative">代码稍复杂</li>
              </ul>
            </div>
          </div>

          <div class="performance-chart">
            <div class="chart-bar" style="height: 80%; background-color: #ff6b6b;">
              <span>普通递归</span>
              <div class="value">栈溢出风险</div>
            </div>
            <div class="chart-bar" style="height: 30%; background-color: #4ecdc4;">
              <span>蹦床函数</span>
              <div class="value">安全</div>
            </div>
          </div>
        </section>
      </div>

      <section class="card advanced-section">
        <h2 class="section-title">高级应用</h2>
        <div class="advanced-topics">
          <div class="topic">
            <h3>1. 异步蹦床函数</h3>
            <pre><code>async function asyncTrampoline(fn) {
  let result = await fn();

  while (typeof result === 'function') {
    result = await result();
  }

  return result;
}</code></pre>
          </div>

          <div class="topic">
            <h3>2. 尾递归优化</h3>
            <p>蹦床函数天然支持尾递归优化：</p>
            <pre><code>// 尾递归形式
function tailRecursive(n, acc = 1) {
  if (n <= 1) return acc;
  return () => tailRecursive(n - 1, n * acc);
}</code></pre>
          </div>

          <div class="topic">
            <h3>3. 通用蹦床函数</h3>
            <pre><code>function universalTrampoline(fn) {
  return (...args) => {
    let result = fn(...args);

    while (result &&
          typeof result === 'object' &&
          typeof result.execute === 'function') {
      result = result.execute();
    }

    return result;
  };
}</code></pre>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>蹦床函数技术详解 © 2023 | 函数式编程核心技术</p>
      <div class="links">
        <a href="#">尾调用优化</a> •
        <a href="#">递归与迭代</a> •
        <a href="#">函数式编程</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要逻辑，仅展示蹦床函数概念
</script>

<style lang="less" scoped>

// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #e9ecef;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@error-color: #e71d36;

// 基础样式
.trampoline-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  background-color: @background-light;
  color: @text-dark;
  line-height: 1.6;

  .header {
    text-align: center;
    padding: 4rem 2rem 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;

    .title {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: @primary-color;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .subtitle {
      font-size: 1.3rem;
      color: @text-light;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      opacity: 0.05;

      .loop {
        position: absolute;
        border: 2px dashed @primary-color;
        border-radius: 50%;
        animation: float 15s infinite linear;

        &:nth-child(1) {
          width: 300px;
          height: 300px;
          top: 20%;
          left: 10%;
        }

        &:nth-child(2) {
          width: 200px;
          height: 200px;
          top: 50%;
          right: 15%;
          animation-duration: 12s;
          animation-direction: reverse;
        }

        &:nth-child(3) {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 40%;
          animation-duration: 18s;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .card {
    background-color: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border: 1px solid fade(@border-color, 50%);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    }
  }

  .intro-card {
    background: linear-gradient(135deg, fade(@primary-color, 5%), fade(@accent-color, 5%));
    border-top: 4px solid @primary-color;

    .definition {
      font-size: 1.1rem;
      line-height: 1.8;
      padding: 1rem 0;

      p {
        margin-bottom: 1rem;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @primary-color;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid fade(@primary-color, 15%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @accent-color);
      border-radius: 2px;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 1.8rem;
  }

  .benefits, .use-cases {
    li {
      display: flex;
      align-items: flex-start;
      padding: 1.2rem 0;
      border-bottom: 1px solid fade(@border-color, 50%);

      &:last-child {
        border-bottom: none;
      }

      .icon {
        font-size: 1.8rem;
        margin-right: 1rem;
        min-width: 40px;
        text-align: center;
      }

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .principle {
    .step {
      display: flex;
      margin-bottom: 1.2rem;
      align-items: flex-start;

      .step-number {
        background: @primary-color;
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        flex-shrink: 0;
        font-weight: 600;
      }

      p {
        margin: 0;
        padding-top: 3px;
      }
    }

    .visualization {
      display: flex;
      margin-top: 1.5rem;
      gap: 1.5rem;

      > div {
        flex: 1;
        border-radius: 8px;
        padding: 1.2rem;
        background: fade(@background-light, 70%);

        span {
          display: block;
          font-weight: 600;
          margin-bottom: 1rem;
          color: @text-light;
        }
      }

      .recursion {
        .stack {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .frame {
            background: white;
            padding: 0.8rem;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            border-left: 3px solid @warning-color;

            &.danger {
              border-left-color: @error-color;
              color: @error-color;
              font-weight: 600;
            }
          }
        }
      }

      .trampoline {
        .loop {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .iteration {
            background: white;
            padding: 0.8rem 1rem;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            border-left: 3px solid @success-color;
          }
        }
      }
    }
  }

  .code-section {
    .code-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 1.8rem;
    }

    .code-block {
      background: #f8f9ff;
      border-radius: 8px;
      overflow: hidden;

      h3 {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        margin: 0;
        padding: 0.8rem 1.2rem;
        font-size: 1rem;
        font-weight: 500;
      }

      pre {
        margin: 0;
        padding: 1.2rem;
        overflow: auto;

        code {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #3a3a3a;
          display: block;

          &::selection {
            background: fade(@primary-color, 30%);
          }
        }
      }
    }
  }

  .comparison {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .approach {
      flex: 1;
      background: fade(@background-light, 70%);
      border-radius: 8px;
      padding: 1.2rem;

      h3 {
        margin-top: 0;
        text-align: center;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid fade(@border-color, 50%);
      }

      ul {
        padding-left: 1.2rem;

        li {
          margin-bottom: 0.6rem;

          &.negative {
            color: @error-color;
            position: relative;

            &::before {
              content: '✕';
              margin-right: 0.5rem;
            }
          }
        }
      }
    }

    .vs {
      display: flex;
      align-items: center;
      font-weight: 700;
      color: @text-light;
    }
  }

  .performance-chart {
    display: flex;
    height: 200px;
    align-items: flex-end;
    gap: 2rem;
    padding: 0 1rem;

    .chart-bar {
      flex: 1;
      max-width: 150px;
      border-radius: 8px 8px 0 0;
      position: relative;
      transition: height 1s ease;

      span {
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        text-align: center;
        font-weight: 600;
      }

      .value {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        text-align: center;
        color: white;
        font-weight: 600;
      }
    }
  }

  .advanced-section {
    .advanced-topics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .topic {
        background: fade(@background-light, 70%);
        border-radius: 8px;
        padding: 1.2rem;

        h3 {
          margin-top: 0;
          color: @secondary-color;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid fade(@border-color, 50%);
        }

        pre {
          background: #f8f9ff;
          border-radius: 6px;
          padding: 0.8rem;
          overflow: auto;

          code {
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border-color;

    .links {
      margin-top: 0.5rem;

      a {
        color: @primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // 动画
  @keyframes float {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .trampoline-container {
    padding: 0 1rem 2rem;

    .header {
      padding: 2.5rem 1rem 2rem;

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .grid-layout {
      grid-template-columns: 1fr;
    }

    .code-section .code-examples {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1.5rem;
    }

    .principle .visualization {
      flex-direction: column;
    }

    .comparison {
      flex-direction: column;
    }

    .performance-chart {
      gap: 1rem;
    }
  }
}
</style>
