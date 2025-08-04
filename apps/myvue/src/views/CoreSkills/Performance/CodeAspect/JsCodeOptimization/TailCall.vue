<template>
  <div class="tail-call-container">
    <header class="header">
      <h1>JavaScript 尾调用与尾递归详解</h1>
      <p>优化递归性能，避免堆栈溢出</p>
    </header>

    <div class="content-card">
      <div class="section-header">
        <div class="icon">📚</div>
        <h2>核心概念</h2>
      </div>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>尾调用 (Tail Call)</h3>
          <p>函数中最后一步操作是调用另一个函数，且不需要额外的栈空间</p>
          <div class="example">
            <pre><code>// 尾调用示例
function a() {
  return b(); // 尾调用
}</code></pre>
          </div>
        </div>

        <div class="concept-card">
          <h3>尾递归 (Tail Recursion)</h3>
          <p>递归函数中，递归调用是函数执行的最后一步操作</p>
          <div class="example">
            <pre><code>// 尾递归示例
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total); // 尾递归
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="section-header">
        <div class="icon">🔍</div>
        <h2>尾调用优化原理</h2>
      </div>

      <div class="stack-visualization">
        <div class="stack-container">
          <div class="stack-frame" v-for="(frame, index) in callStack" :key="index">
            <div class="frame-header">栈帧 #{{ callStack.length - index }}</div>
            <div class="frame-content">
              <div>函数: {{ frame.function }}</div>
              <div>参数: n={{ frame.n }}, total={{ frame.total }}</div>
              <div>返回地址: {{ frame.returnAddress }}</div>
            </div>
          </div>
          <div class="stack-bottom">调用栈底部</div>
        </div>

        <div class="optimization-info">
          <div class="info-card">
            <h3>普通递归调用栈</h3>
            <p>每次递归调用都会创建新的栈帧，占用大量栈空间</p>
            <div class="stack-size">栈深度: {{ callStack.length }}</div>
          </div>

          <div class="info-card optimized">
            <h3>尾调用优化效果</h3>
            <p>复用当前栈帧，避免创建新栈帧，防止堆栈溢出</p>
            <div class="stack-size">优化后栈深度: 1</div>
          </div>
        </div>
      </div>

      <div class="optimization-steps">
        <h3>优化过程详解</h3>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <p>编译器识别尾调用位置</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <p>清理当前函数的栈帧（局部变量、参数等）</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <p>复用当前栈帧，准备新函数参数</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <p>跳转到新函数入口（非调用）</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="section-header">
        <div class="icon">💻</div>
        <h2>代码示例对比</h2>
      </div>

      <div class="code-comparison">
        <div class="code-section">
          <h3>普通递归（易堆栈溢出）</h3>
          <pre><code>function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// 调用栈示例
factorial(5)
  5 * factorial(4)
    4 * factorial(3)
      3 * factorial(2)
        2 * factorial(1)
          1
        // 然后逐层返回计算结果</code></pre>
          <div class="performance">
            <div class="perf-badge warning">最大调用深度: O(n)</div>
            <div class="perf-badge warning">10000次: 堆栈溢出</div>
          </div>
        </div>

        <div class="code-section optimized">
          <h3>尾递归（可优化）</h3>
          <pre><code>function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

// 优化后调用流程
factorial(5, 1)
factorial(4, 5)
factorial(3, 20)
factorial(2, 60)
factorial(1, 120) → 120</code></pre>
          <div class="performance">
            <div class="perf-badge success">最大调用深度: O(1)</div>
            <div class="perf-badge success">10000次: 正常执行</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="section-header">
        <div class="icon">📊</div>
        <h2>适用场景与兼容性</h2>
      </div>

      <div class="use-cases">
        <div class="use-case-card">
          <div class="case-icon">🧮</div>
          <h3>数学计算</h3>
          <p>阶乘、斐波那契数列等数学计算</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">📚</div>
          <h3>数据结构处理</h3>
          <p>树结构遍历、链表处理等递归操作</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🔄</div>
          <h3>状态机实现</h3>
          <p>解析器、编译器中的状态转换</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">⚙️</div>
          <h3>函数式编程</h3>
          <p>递归代替循环，保持函数纯度</p>
        </div>
      </div>

      <div class="compatibility">
        <h3>浏览器/环境兼容性</h3>
        <div class="compat-table">
          <div class="compat-row">
            <div class="env">Safari</div>
            <div class="support supported">完全支持</div>
            <div class="version">10+</div>
          </div>
          <div class="compat-row">
            <div class="env">Node.js</div>
            <div class="support partial">部分支持</div>
            <div class="version">6.5+ (需--harmony)</div>
          </div>
          <div class="compat-row">
            <div class="env">Chrome</div>
            <div class="support unsupported">不支持</div>
            <div class="version">-</div>
          </div>
          <div class="compat-row">
            <div class="env">Firefox</div>
            <div class="support unsupported">不支持</div>
            <div class="version">-</div>
          </div>
          <div class="compat-row">
            <div class="env">Edge</div>
            <div class="support unsupported">不支持</div>
            <div class="version">-</div>
          </div>
        </div>
        <div class="compat-note">注意：ES6规范包含尾调用优化，但多数浏览器未实现</div>
      </div>
    </div>

    <div class="content-card pros-cons">
      <div class="section-header">
        <div class="icon">⚖️</div>
        <h2>优缺点分析</h2>
      </div>

      <div class="comparison">
        <div class="pros">
          <h3>优点</h3>
          <ul>
            <li>避免递归导致的堆栈溢出错误</li>
            <li>减少内存占用，提高性能</li>
            <li>使递归成为循环的安全替代方案</li>
            <li>代码更简洁，表达力更强</li>
            <li>符合函数式编程范式</li>
          </ul>
        </div>

        <div class="cons">
          <h3>缺点与限制</h3>
          <ul>
            <li>多数JS引擎未实现尾调用优化</li>
            <li>调试更困难（栈帧复用）</li>
            <li>需要重构代码为尾递归形式</li>
            <li>部分场景需要额外参数</li>
            <li>错误堆栈信息不完整</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-card summary">
      <div class="section-header">
        <div class="icon">💎</div>
        <h2>总结与最佳实践</h2>
      </div>

      <div class="summary-content">
        <div class="key-points">
          <div class="point">
            <div class="point-icon">1</div>
            <p>在递归函数中，确保递归调用是最后一步操作</p>
          </div>
          <div class="point">
            <div class="point-icon">2</div>
            <p>使用累加器参数保存中间结果</p>
          </div>
          <div class="point">
            <div class="point-icon">3</div>
            <p>在支持的环境中启用严格模式（"use strict"）</p>
          </div>
          <div class="point">
            <div class="point-icon">4</div>
            <p>对于复杂递归，考虑使用Trampoline技术</p>
          </div>
        </div>

        <div class="trampoline-example">
          <h3>Trampoline 技术示例</h3>
          <pre><code>// 解决尾递归兼容性问题
function trampoline(fn) {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

// 使用
const factorial = trampoline(function(n, total = 1) {
  if (n === 1) return total;
  return () => factorial(n - 1, n * total);
});</code></pre>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 尾调用与尾递归详解 | 使用 Vue 3 + TypeScript 构建</p>
      <p>© 2023 前端高级编程技术</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 模拟调用栈状态
const callStack = ref([
  { function: 'factorial', n: 5, total: 1, returnAddress: 'main' },
  { function: 'factorial', n: 4, total: 5, returnAddress: 'factorial@5' },
  { function: 'factorial', n: 3, total: 20, returnAddress: 'factorial@4' },
  { function: 'factorial', n: 2, total: 60, returnAddress: 'factorial@3' },
  { function: 'factorial', n: 1, total: 120, returnAddress: 'factorial@2' },
])

// 模拟调用栈动画效果
onMounted(() => {
  let count = 5
  const interval = setInterval(() => {
    if (count > 1) {
      callStack.value.pop()
      count--
    } else {
      clearInterval(interval)
    }
  }, 1500)
})
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@warning-color: #e74c3c;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@success-color: #27ae60;
@optimized-color: #9b59b6;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tail-call-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 0;
  background: linear-gradient(135deg, @primary-color, #8e44ad);
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-card {
  background-color: @card-bg;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &.pros-cons {
    border-top: 4px solid @secondary-color;
  }

  &.summary {
    border-top: 4px solid @optimized-color;
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
    background: linear-gradient(135deg, @primary-color, #8e44ad);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @text-color;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.concept-card {
  background: lighten(@light-bg, 2%);
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid @primary-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;

  pre {
    margin: 0;
    overflow-x: auto;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.stack-visualization {
  display: flex;
  gap: 30px;
  margin: 30px 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.stack-container {
  flex: 1;
  border: 2px solid @border-color;
  border-radius: 10px;
  padding: 15px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column-reverse;
}

.stack-frame {
  background: white;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-left: 4px solid @primary-color;
  overflow: hidden;
  transition: all 0.5s ease;

  &:last-child {
    margin-bottom: 0;
  }
}

.frame-header {
  background: lighten(@primary-color, 40%);
  padding: 10px 15px;
  font-weight: 600;
  color: darken(@primary-color, 20%);
}

.frame-content {
  padding: 15px;
  font-size: 0.95rem;

  div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.stack-bottom {
  text-align: center;
  padding: 10px;
  color: #7f8c8d;
  font-style: italic;
  border-top: 1px dashed @border-color;
  margin-top: 10px;
}

.optimization-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  border-top: 4px solid @warning-color;

  &.optimized {
    border-top: 4px solid @success-color;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.stack-size {
  background: #f1f1f1;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 600;
  display: inline-block;
}

.optimization-steps {
  margin-top: 30px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: @text-color;
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.step {
  background: lighten(@primary-color, 45%);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  position: relative;

  &::after {
    content: '→';
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: @primary-color;

    @media (max-width: 768px) {
      content: '↓';
      right: 50%;
      top: auto;
      bottom: -15px;
      transform: translateX(50%);
    }
  }

  &:last-child::after {
    content: none;
  }
}

.step-number {
  width: 40px;
  height: 40px;
  background: @primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 auto 15px;
}

.code-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.code-section {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &.optimized {
    border-top: 4px solid @success-color;
  }

  h3 {
    background: #f8f9fa;
    padding: 15px 20px;
    margin: 0;
    font-size: 1.3rem;
    color: @text-color;
    border-bottom: 1px solid @border-color;
  }

  pre {
    margin: 0;
    padding: 20px;
    background: #2d2d2d;
    overflow-x: auto;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.performance {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid @border-color;
}

.perf-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;

  &.success {
    background: lighten(@success-color, 45%);
    color: darken(@success-color, 20%);
  }

  &.warning {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 20%);
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.use-case-card {
  background: white;
  border-radius: 10px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
  }
}

.compatibility {
  margin-top: 40px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: @text-color;
  }
}

.compat-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.compat-row {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background: #f8f9fa;
  }
}

.env {
  flex: 1;
  font-weight: 600;
}

.support {
  flex: 1;
  font-weight: 600;

  &.supported {
    color: @success-color;
  }

  &.partial {
    color: #f39c12;
  }

  &.unsupported {
    color: @warning-color;
  }
}

.version {
  flex: 1;
  color: #7f8c8d;
}

.compat-note {
  margin-top: 15px;
  padding: 12px 20px;
  background: lighten(@warning-color, 45%);
  border-radius: 8px;
  color: darken(@warning-color, 20%);
  font-size: 0.95rem;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.pros,
.cons {
  padding: 25px;
  border-radius: 10px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;
  }
}

.pros {
  background: lighten(@success-color, 52%);
  border-left: 4px solid @success-color;

  h3 {
    color: darken(@success-color, 15%);
  }
}

.cons {
  background: lighten(@warning-color, 42%);
  border-left: 4px solid @warning-color;

  h3 {
    color: darken(@warning-color, 15%);
  }
}

ul {
  list-style: none;
  padding: 0;

  li {
    padding: 12px 0;
    padding-left: 30px;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &::before {
      content: '•';
      position: absolute;
      left: 15px;
      top: 12px;
      font-weight: 700;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.summary-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.key-points {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.point {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  .point-icon {
    background: @primary-color;
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.6;
  }
}

.trampoline-example {
  background: #2d2d2d;
  border-radius: 10px;
  padding: 20px;

  h3 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }

  pre {
    margin: 0;
    overflow-x: auto;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px;
  color: #7f8c8d;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .concept-grid,
  .code-comparison,
  .comparison,
  .summary-content {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: 1fr;

    .step::after {
      display: none;
    }
  }
}
</style>
