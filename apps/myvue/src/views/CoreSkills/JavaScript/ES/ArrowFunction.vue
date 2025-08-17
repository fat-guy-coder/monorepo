<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">➡️</span>
          ES6 箭头函数介绍
        </h1>
        <p class="page-subtitle">现代JavaScript的核心特性：简洁、强大且独特的函数表达式</p>
      </header>

      <!-- 统计信息 -->
      <div class="card mb-xl">
        <div class="card-body">
          <div class="grid grid-3">
            <div class="stat-card">
              <div class="stat-value">2015</div>
              <div class="stat-label">ES6引入</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">87%</div>
              <div class="stat-label">项目使用率</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">40%</div>
              <div class="stat-label">代码精简</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基本语法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">➡️</span>
            基本语法
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="syntax-card">
              <h3 class="text-lg font-semibold mb-md">单参数</h3>
              <div class="code-block">
                <pre><code>// 传统函数
<span class="code-bad">const double = function(n) {
  return n * 2;
}</span>

// 箭头函数
<span class="code-good">const double = n => n * 2;</span></code></pre>
              </div>
            </div>

            <div class="syntax-card">
              <h3 class="text-lg font-semibold mb-md">多参数</h3>
              <div class="code-block">
                <pre><code>// 传统函数
<span class="code-bad">const sum = function(a, b) {
  return a + b;
}</span>

// 箭头函数
<span class="code-good">const sum = (a, b) => a + b;</span></code></pre>
              </div>
            </div>

            <div class="syntax-card">
              <h3 class="text-lg font-semibold mb-md">多行语句</h3>
              <div class="code-block">
                <pre><code>// 传统函数
<span class="code-bad">const process = function(x) {
  const y = x * 2;
  return y + 10;
}</span>

// 箭头函数
<span class="code-good">const process = x => {
  const y = x * 2;
  return y + 10;
}</span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- this绑定 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔗</span>
            this绑定机制
          </h2>
          <p class="page-subtitle">箭头函数最核心的特性：词法作用域的this绑定</p>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="explanation-card">
              <h3 class="text-lg font-semibold mb-md">传统函数的this问题</h3>
              <div class="code-block">
                <pre><code>class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(function() {
      <span class="code-bad">// this不再指向Timer实例
      this.seconds++; // 错误！</span>
    }, 1000);
  }
}</code></pre>
              </div>
              <p class="text-secondary">传统函数有自己的this绑定，取决于调用方式</p>
            </div>

            <div class="explanation-card">
              <h3 class="text-lg font-semibold mb-md">箭头函数的解决方案</h3>
              <div class="code-block">
                <pre><code>class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(<span class="code-good">() => {
      //箭头函数的this在定义时已绑定，无法通过call/apply/bind改变
      this.seconds++; // 正确
    }</span>, 1000);
  }
}</code></pre>
              </div>
              <p class="text-secondary">
                箭头函数的this，在函数定义时绑定，无法通过call/apply/bind运行时改变
              </p>
            </div>
          </div>

          <div class="binding-diagram mt-xl">
            <div class="grid grid-3">
              <div class="binding-node">
                <div class="node-label">外层作用域</div>
                <div class="node-this">this = obj</div>
              </div>

              <div class="binding-arrow">↓</div>

              <div class="binding-node">
                <div class="node-label">箭头函数</div>
                <div class="node-this">this = obj</div>
              </div>

              <div class="binding-arrow">↓</div>

              <div class="binding-node">
                <div class="node-label">传统函数</div>
                <div class="node-this">this = 调用者</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🚀</span>
            最佳使用场景
          </h2>
          <p class="page-subtitle">箭头函数在以下场景中特别有用</p>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="scenario-card">
              <div class="scenario-icon">1</div>
              <h3 class="text-lg font-semibold mb-md">数组方法回调</h3>
              <div class="code-block">
                <pre><code>const numbers = [1, 2, 3, 4];

// 使用箭头函数
const doubled = numbers.map(<span class="code-good">n => n * 2</span>);

const evens = numbers.filter(<span class="code-good">n => n % 2 === 0</span>);</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">2</div>
              <h3 class="text-lg font-semibold mb-md">事件处理函数</h3>
              <div class="code-block">
                <pre><code>class Button {
  constructor() {
    this.count = 0;
    this.element = document.createElement('button');

    // 箭头函数保持正确的this
    this.element.addEventListener('click', <span class="code-good">() => {
      this.count++;
      this.updateText();
    }</span>);
  }

  updateText() {
    this.element.textContent = `Clicked ${this.count} times`;
  }
}</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">3</div>
              <h3 class="text-lg font-semibold mb-md">Promise链</h3>
              <div class="code-block">
                <pre><code>fetch('/api/data')
  .then(<span class="code-good">response => response.json()</span>)
  .then(<span class="code-good">data => processData(data)</span>)
  .catch(<span class="code-good">error => handleError(error)</span>);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚠️</span>
            注意事项
          </h2>
          <p class="page-subtitle">使用箭头函数时需特别注意这些点</p>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="warning-card">
              <div class="warning-icon">❗</div>
              <h3 class="text-lg font-semibold mb-md">不能作为构造函数</h3>
              <div class="code-block">
                <pre><code><span class="code-bad">const Person = (name) => {
  this.name = name; // 错误！
}</span>

// 尝试实例化
<span class="code-bad">const john = new Person('John');
// TypeError: Person is not a constructor</span></code></pre>
              </div>
              <p class="text-secondary">箭头函数没有prototype属性，不能使用new调用</p>
            </div>

            <div class="warning-card">
              <div class="warning-icon">❗</div>
              <h3 class="text-lg font-semibold mb-md">没有arguments对象</h3>
              <div class="code-block">
                <pre><code><span class="code-bad">const sum = () => {
  console.log(arguments); // 错误！
}</span>

// 正确做法：使用rest参数
<span class="code-good">const sum = (...args) => {
  console.log(args);
}</span></code></pre>
              </div>
              <p class="text-secondary">箭头函数没有自己的arguments对象，使用rest参数替代</p>
            </div>

            <div class="warning-card">
              <div class="warning-icon">❗</div>
              <h3 class="text-lg font-semibold mb-md">不能改变this绑定</h3>
              <div class="code-block">
                <pre><code>const obj = {
  value: 42,
  getValue: () => this.value // 错误！
};

<span class="code-bad">obj.getValue(); // undefined</span>

// 正确做法：使用传统函数
<span class="code-good">const obj = {
  value: 42,
  getValue() {
    return this.value; // 正确
  }
};</span></code></pre>
              </div>
              <p class="text-secondary">
                箭头函数的this在定义时已绑定，无法通过call/apply/bind改变
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 优缺点 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚖️</span>
            优点与缺点
          </h2>
          <p class="page-subtitle">合理使用箭头函数，平衡代码简洁性和可读性</p>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="pros">
              <h3 class="text-lg font-semibold mb-md">优点</h3>
              <ul class="feature-list">
                <li><strong>简洁语法</strong>：减少样板代码，更易读</li>
                <li><strong>词法作用域</strong>：this绑定更可预测</li>
                <li><strong>适合回调</strong>：避免this绑定问题</li>
                <li><strong>隐式返回</strong>：单行表达式无需return</li>
                <li><strong>函数式编程</strong>：更适合纯函数</li>
              </ul>
            </div>

            <div class="cons">
              <h3 class="text-lg font-semibold mb-md">缺点</h3>
              <ul class="feature-list">
                <li><strong>不能作为构造函数</strong>：无法使用new</li>
                <li><strong>没有arguments对象</strong>：需使用rest参数</li>
                <li><strong>调试困难</strong>：匿名函数栈追踪更困难</li>
                <li><strong>不适合方法</strong>：对象方法中this行为异常</li>
                <li><strong>可读性降低</strong>：过度使用可能降低代码清晰度</li>
              </ul>
            </div>
          </div>

          <div class="recommendation mt-xl">
            <h3 class="text-lg font-semibold mb-md">使用建议</h3>
            <div class="grid grid-3">
              <div class="rec-card rec-good">
                <div class="rec-icon">✓</div>
                <p>回调函数（数组方法、事件处理、定时器）</p>
              </div>
              <div class="rec-card rec-good">
                <div class="rec-icon">✓</div>
                <p>函数式编程（纯函数、无状态操作）</p>
              </div>
              <div class="rec-card rec-bad">
                <div class="rec-icon">✗</div>
                <p>对象方法（需要访问实例属性时）</p>
              </div>
              <div class="rec-card rec-bad">
                <div class="rec-icon">✗</div>
                <p>需要动态this绑定的场景</p>
              </div>
              <div class="rec-card rec-good">
                <div class="rec-icon">✓</div>
                <p>顶层函数（立即执行函数表达式）</p>
              </div>
              <div class="rec-card rec-bad">
                <div class="rec-icon">✗</div>
                <p>构造函数或原型方法</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="card">
        <div class="card-body">
          <p class="text-center text-secondary">ES6 特性介绍 | 箭头函数 | Vue 3 技术演示</p>
          <p class="text-center text-secondary">
            理解箭头函数的特性，编写更简洁、可维护的JavaScript代码
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/css/unified-styles.css'

// 示例响应式数据
const activeSection = ref('syntax')
</script>

<style scoped>
/* 组件特定样式 */
.stat-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.syntax-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.explanation-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.binding-diagram {
  text-align: center;
}

.binding-node {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 2px solid var(--border-light);
  text-align: center;
}

.node-label {
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.node-this {
  background: var(--primary-bg);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
}

.binding-arrow {
  font-size: 2rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scenario-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.scenario-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-bg);
  border-radius: 50%;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  color: var(--primary-color);
}

.warning-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.warning-icon {
  font-size: 1.8rem;
  color: var(--error-color);
  margin-bottom: var(--spacing-sm);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

.pros .feature-list li {
  color: var(--success-color);
}

.cons .feature-list li {
  color: var(--error-color);
}

.rec-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  border: 1px solid var(--border-light);
}

.rec-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  margin-right: var(--spacing-md);
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.rec-good .rec-icon {
  background: var(--success-bg);
  color: var(--success-color);
}

.rec-bad .rec-icon {
  background: var(--error-bg);
  color: var(--error-color);
}

.rec-card p {
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

.code-good {
  color: var(--success-color);
}

.code-bad {
  color: var(--error-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .binding-diagram .grid-3 {
    grid-template-columns: 1fr;
  }

  .binding-arrow {
    transform: rotate(90deg);
    margin: var(--spacing-md) 0;
  }
}
</style>
