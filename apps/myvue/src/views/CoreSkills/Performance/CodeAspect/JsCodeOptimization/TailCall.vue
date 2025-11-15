<template>
  <div class="tail-optimization-container">
    <header class="header">
      <h1>JavaScript 尾递归与尾调用优化</h1>
      <p class="subtitle">提升递归性能的核心技术</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="definition-card">
          <div class="card-header">
            <div class="icon">🔄</div>
            <h2>什么是尾调用？</h2>
          </div>
          <div class="card-content">
            <p>尾调用(Tail Call)是指函数在最后一步操作中调用另一个函数，且不需要执行额外的计算。</p>
            <div class="example">
              <h3>尾调用示例：</h3>
              <pre><code>function a() {
  return b();  // 尾调用
}</code></pre>
            </div>
            <div class="example">
              <h3>非尾调用示例：</h3>
              <pre><code>function a() {
  return b() + 1;  // 非尾调用，需要执行加法运算
}</code></pre>
            </div>
          </div>
        </div>

        <div class="definition-card">
          <div class="card-header">
            <div class="icon">♻️</div>
            <h2>什么是尾递归？</h2>
          </div>
          <div class="card-content">
            <p>尾递归(Tail Recursion)是尾调用的特例，指递归函数在最后一步调用自身，不需要执行额外的计算。</p>
            <div class="example">
              <h3>尾递归示例：</h3>
              <pre><code>function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);  // 尾递归
}</code></pre>
            </div>
            <div class="example">
              <h3>非尾递归示例：</h3>
              <pre><code>function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // 非尾递归，需要执行乘法
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="principle-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>底层原理：尾调用优化(TCO)</h2>
        </div>

        <div class="principle-content">
          <div class="stack-diagram">
            <div class="stack">
              <div class="example">
                <h3>原函数</h3>
                <pre><code>function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}</code></pre>
                <h3>优化后</h3>
                <pre><code>function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}</code></pre>
              </div>
              <div class="frame" v-for="(frame, idx) in stackFrames" :key="idx">
                <div class="frame-header">调用帧 {{ idx + 1 }}</div>
                <div class="frame-vars">
                  <div>变量: {{ frame.vars }}</div>
                  <div>返回地址: {{ frame.return }}</div>
                </div>
              </div>
            </div>
            <div class="optimized-stack">
              <div class="frame">
                <div class="frame-header">优化后调用帧</div>
                <div class="frame-vars">
                  <div>变量: 动态更新</div>
                  <div>返回地址: 保持不变</div>
                </div>
              </div>
            </div>
          </div>

          <div class="principle-explanation">
            <h3>优化原理：</h3>
            <ol>
              <li>在尾调用位置，当前函数的栈帧不再需要</li>
              <li>引擎会复用当前栈帧，而不是创建新的栈帧</li>
              <li>参数被更新为被调用函数的新参数</li>
              <li>控制权直接转移到被调用函数</li>
            </ol>

            <h3>优化效果：</h3>
            <div class="comparison">
              <div class="comparison-item">
                <div class="label">未优化</div>
                <div class="value">O(n) 栈空间</div>
              </div>
              <div class="arrow">→</div>
              <div class="comparison-item optimized">
                <div class="label">优化后</div>
                <div class="value">O(1) 栈空间</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>代码示例与对比</h2>
        </div>

        <div class="code-comparison">
          <div class="code-block">
            <h3>传统递归 (阶乘计算)</h3>
            <pre><code>function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 调用栈增长：
// factorial(5)
// 5 * factorial(4)
// 5 * (4 * factorial(3))
// 5 * (4 * (3 * factorial(2)))
// 5 * (4 * (3 * (2 * factorial(1))))
// 5 * (4 * (3 * (2 * 1)))
// ... 逐步计算返回</code></pre>
            <div class="complexity">
              <span class="time">时间复杂度: O(n)</span>
              <span class="space">空间复杂度: O(n)</span>
            </div>
          </div>

          <div class="code-block optimized">
            <h3>尾递归优化 (阶乘计算)</h3>
            <pre><code>function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}

// 优化后调用栈：
// factorial(5, 1)
// factorial(4, 5)
// factorial(3, 20)
// factorial(2, 60)
// factorial(1, 120)
// 返回 120</code></pre>
            <div class="complexity">
              <span class="time">时间复杂度: O(n)</span>
              <span class="space">空间复杂度: O(1)</span>
            </div>
          </div>
        </div>

        <div class="code-comparison">
          <div class="code-block">
            <h3>传统递归 (斐波那契数列)</h3>
            <pre><code>function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) +
         fibonacci(n - 2);
}

// 指数级复杂度
// 重复计算严重</code></pre>
            <div class="complexity">
              <span class="time">时间复杂度: O(2^n)</span>
              <span class="space">空间复杂度: O(n)</span>
            </div>
          </div>

          <div class="code-block optimized">
            <h3>尾递归优化 (斐波那契数列)</h3>
            <pre><code>function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;
  return fibonacci(n - 1, b, a + b);
}

// 线性复杂度
// 无重复计算</code></pre>
            <div class="complexity">
              <span class="time">时间复杂度: O(n)</span>
              <span class="space">空间复杂度: O(1)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="scenario-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>适用场景与优缺点</h2>
        </div>

        <div class="scenario-content">
          <div class="use-cases">
            <h3>适用场景：</h3>
            <div class="case-grid">
              <div class="case-card">
                <div class="icon">🧮</div>
                <h4>数学计算</h4>
                <p>阶乘、斐波那契等递归算法</p>
              </div>
              <div class="case-card">
                <div class="icon">🔄</div>
                <h4>数据处理</h4>
                <p>递归处理链表、树结构</p>
              </div>
              <div class="case-card">
                <div class="icon">⚙️</div>
                <h4>状态机</h4>
                <p>递归状态转换实现</p>
              </div>
              <div class="case-card">
                <div class="icon">🧠</div>
                <h4>编译器</h4>
                <p>语法分析等递归下降解析</p>
              </div>
            </div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点：</h3>
              <ul>
                <li>避免栈溢出错误</li>
                <li>减少内存使用</li>
                <li>提高递归性能</li>
                <li>使深度递归成为可能</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点：</h3>
              <ul>
                <li>代码可读性降低</li>
                <li>需要传递累积参数</li>
                <li>并非所有递归都能转换</li>
                <li>浏览器支持不统一</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="support-section">
        <div class="section-header">
          <div class="icon">🌐</div>
          <h2>浏览器支持情况</h2>
        </div>

        <div class="support-content">
          <div class="support-status">
            <div class="browser-support">
              <div class="browser">
                <div class="name">Safari</div>
                <div class="version">≥ 10</div>
                <div class="status supported">✅ 完全支持</div>
              </div>
              <div class="browser">
                <div class="name">Node.js</div>
                <div class="version">≥ 6.5 (--harmony)</div>
                <div class="status partial">⚠️ 部分支持</div>
              </div>
              <div class="browser">
                <div class="name">Chrome</div>
                <div class="version">实验性支持</div>
                <div class="status unsupported">❌ 无支持</div>
              </div>
              <div class="browser">
                <div class="name">Firefox</div>
                <div class="version">实验性支持</div>
                <div class="status unsupported">❌ 无支持</div>
              </div>
              <div class="browser">
                <div class="name">Edge</div>
                <div class="version">-</div>
                <div class="status unsupported">❌ 无支持</div>
              </div>
            </div>

            <div class="support-summary">
              <h3>当前支持状态：</h3>
              <p>尾调用优化(TCO)是ES6规范的一部分，但大多数浏览器厂商尚未实现。</p>
              <p>Safari是唯一完全支持TCO的主流浏览器。</p>
              <p>在Node.js中，可以在6.5版本后使用<code>--harmony</code>标志启用。</p>
            </div>
          </div>

          <div class="workarounds">
            <h3>替代方案：</h3>
            <div class="workaround-card">
              <h4>1. 循环转换</h4>
              <pre><code>// 尾递归转换的阶乘函数
function factorial(n) {
  let acc = 1;
  for (let i = n; i > 1; i--) {
    acc *= i;
  }
  return acc;
}</code></pre>
            </div>
            <div class="workaround-card">
              <h4>2. 蹦床函数(Trampoline)</h4>
              <pre><code>function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

const factorial = trampoline(function f(n, acc = 1) {
  return n <= 1 ? acc : () => f(n - 1, n * acc);
});</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> JavaScript性能优化 | 尾递归与尾调用专题</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stackFrames = ref([
  { vars: "n=5", return: "main" },
  { vars: "n=4", return: "factorial@line3" },
  { vars: "n=3", return: "factorial@line3" },
  { vars: "n=2", return: "factorial@line3" },
  { vars: "n=1", return: "factorial@line3" },
]);
</script>

<style lang="less" scoped>

.tail-optimization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #228be6, #4c6ef5);
  color: white;
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.15);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;

  .icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e7f5ff;
    border-radius: 12px;
    color: #228be6;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #2d3748;
  }
}

.intro-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.definition-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
  }
}

.card-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.example {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    font-size: 1.15rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  pre {
    background: #1e293b;
    color: #f8fafc;
    border-radius: 12px;
    padding: 15px;
    overflow-x: auto;
    font-size: 0.95rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.principle-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.principle-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.stack-diagram {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .stack, .optimized-stack {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .stack {
    .frame {
      padding: 15px;
      border-bottom: 1px dashed #e2e8f0;
      background: #f8f9fa;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .optimized-stack {
    .frame {
      padding: 15px;
      background: #e6fcf5;
      border: 2px solid #38d9a9;
    }
  }

  .frame-header {
    font-weight: 600;
    margin-bottom: 10px;
    color: #495057;
  }

  .frame-vars {
    font-size: 0.95rem;
    color: #495057;
  }
}

.principle-explanation {
  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ol {
    padding-left: 25px;
    margin-bottom: 25px;

    li {
      margin-bottom: 10px;
      padding-left: 8px;
    }
  }
}

.comparison {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;

  .comparison-item {
    flex: 1;
    text-align: center;
    padding: 20px;
    border-radius: 12px;
    background: #f8f9fa;

    &.optimized {
      background: #e6fcf5;
      border: 2px solid #38d9a9;
    }

    .label {
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }

    .value {
      font-size: 1.2rem;
      font-weight: 700;
      color: #228be6;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: #adb5bd;
  }
}

.code-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.code-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.code-block {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
  padding: 0;

  &.optimized {
    background: #e6fcf5;
    border: 2px solid #38d9a9;
  }

  h3 {
    background: #e9ecef;
    margin: 0;
    padding: 15px 20px;
    font-size: 1.2rem;
  }

  pre {
    padding: 20px;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    max-height: 300px;
    overflow-y: auto;

    code {
      font-family: 'Fira Code', monospace;
      white-space: pre-wrap;
    }
  }
}

.complexity {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background: #e9ecef;
  font-size: 0.95rem;

  .time::before {
    content: '⏱️ ';
  }

  .space::before {
    content: '💾 ';
  }
}

.scenario-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.scenario-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.use-cases {
  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #2d3748;
  }
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.case-card {
  background: #f1f3f9;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #4c6ef5;
  }

  h4 {
    font-size: 1.2rem;
    margin: 0 0 8px 0;
    color: #3b5bdb;
  }

  p {
    font-size: 0.95rem;
    margin: 0;
    color: #495057;
  }
}

.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 25px;

  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
  }

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 12px;
      padding-left: 8px;
    }
  }

  .pros {
    ul li {
      color: #2b8a3e;
      &::marker {
        content: '✓ ';
        color: #2b8a3e;
      }
    }
  }

  .cons {
    ul li {
      color: #c92a2a;
      &::marker {
        content: '✗ ';
        color: #c92a2a;
      }
    }
  }
}

.support-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;
}

.support-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.support-status {
  .browser-support {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
  }

  .browser {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;

    .name {
      flex: 1;
      font-weight: 500;
    }

    .version {
      width: 150px;
      text-align: right;
      color: #495057;
    }

    .status {
      width: 120px;
      text-align: center;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;

      &.supported {
        background: #ebfbee;
        color: #2b8a3e;
      }

      &.partial {
        background: #fff9db;
        color: #e67700;
      }

      &.unsupported {
        background: #fff5f5;
        color: #c92a2a;
      }
    }
  }

  .support-summary {
    background: #e7f5ff;
    border-radius: 12px;
    padding: 20px;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    code {
      background: #d0ebff;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.workarounds {
  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #2d3748;
  }
}

.workaround-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 25px;

  h4 {
    background: #e9ecef;
    margin: 0;
    padding: 12px 20px;
    font-size: 1.1rem;
  }

  pre {
    padding: 20px;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', monospace;
      white-space: pre-wrap;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .case-grid {
    grid-template-columns: 1fr;
  }

  .code-comparison {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .principle-content,
  .scenario-content,
  .support-content {
    grid-template-columns: 1fr;
  }
}
</style>
