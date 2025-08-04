<template>
  <div class="currying-container">
    <header class="header">
      <div class="header-content">
        <h1>JavaScript 柯里化(Currying)</h1>
        <p>函数式编程的核心技术 - 将多参数函数转化为一系列单参数函数</p>
      </div>
      <div class="header-graphic">
        <div class="function-chain">
          <div class="function-box" v-for="(fn, index) in functionChain" :key="index">
            <div class="fn-name">f{{ index + 1 }}</div>
            <div class="fn-params">{{ fn.params }}</div>
            <div class="fn-arrow" v-if="index < functionChain.length - 1">→</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <!-- 概念解析部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">🧠</div>
          <h2>柯里化概念解析</h2>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="card-header">
              <div class="card-icon">🔁</div>
              <h3>什么是柯里化？</h3>
            </div>
            <div class="card-content">
              <p>柯里化(Currying)是一种将多参数函数转换为一系列单参数函数的技术。</p>
              <div class="formula">
                <div>f(a, b, c) →</div>
                <div>f(a)(b)(c)</div>
              </div>
              <p>柯里化不会立即调用函数，而是返回一个新函数，直到所有参数都被提供。</p>
            </div>
          </div>

          <div class="concept-card">
            <div class="card-header">
              <div class="card-icon">⚙️</div>
              <h3>柯里化原理</h3>
            </div>
            <div class="card-content">
              <p>柯里化函数基于闭包原理，保存已传递的参数，直到接收到所有参数后执行原始函数。</p>
              <div class="code-block">
                <pre><code>function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}</code></pre>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="card-header">
              <div class="card-icon">🔄</div>
              <h3>部分应用 vs 柯里化</h3>
            </div>
            <div class="card-content">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>柯里化</th>
                    <th>部分应用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>参数传递</td>
                    <td>一次一个参数</td>
                    <td>一次多个参数</td>
                  </tr>
                  <tr>
                    <td>返回结果</td>
                    <td>新函数</td>
                    <td>新函数或结果</td>
                  </tr>
                  <tr>
                    <td>参数顺序</td>
                    <td>严格顺序</td>
                    <td>可跳过参数</td>
                  </tr>
                  <tr>
                    <td>使用场景</td>
                    <td>函数组合</td>
                    <td>参数预设</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section class="use-cases">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>柯里化使用场景</h2>
        </div>

        <div class="scenario-cards">
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>函数组合</h3>
            <p>柯里化使函数更容易组合，创建可重用的小型函数</p>
            <div class="code-block">
              <pre><code>// 柯里化函数
const add = a => b => a + b;
const multiply = a => b => a * b;

// 函数组合
const addThenMultiply = (a, b, c) =>
  multiply(c)(add(a)(b));

// 使用
addThenMultiply(2, 3, 5); // (2+3)*5 = 25</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎛️</div>
            <h3>参数复用</h3>
            <p>创建预设部分参数的专用函数</p>
            <div class="code-block">
              <pre><code>// 通用日志函数
const log = level => source => message =>
  console.log(`[${level}] [${source}]: ${message}`);

// 创建预设函数
const logError = log('ERROR')('App');
const logInfo = log('INFO')('App');

// 使用预设函数
logError('Connection failed');
// [ERROR] [App]: Connection failed

logInfo('User logged in');
// [INFO] [App]: User logged in</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">💡</div>
            <h3>延迟执行</h3>
            <p>在需要时才提供剩余参数执行函数</p>
            <div class="code-block">
              <pre><code>// 柯里化数据获取函数
const fetchData = baseUrl => endpoint => params =>
  fetch(`${baseUrl}/${endpoint}?${new URLSearchParams(params)}`);

// 创建API实例
const api = fetchData('https://api.example.com');

// 当需要时提供具体参数
const getUser = api('users');
const getPosts = api('posts');

// 执行请求
getUser({ id: 123 });
getPosts({ userId: 123 });</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>单元测试</h3>
            <p>简化测试，更容易模拟部分功能</p>
            <div class="code-block">
              <pre><code>// 原始函数
const calculate = (a, b, c) => a * b + c;

// 柯里化版本
const curriedCalc = curry(calculate);

// 测试部分应用
const multiplyThenAdd = curriedCalc(2);
const result = multiplyThenAdd(3)(1); // 2*3 + 1 = 7

// 测试完整调用
expect(curriedCalc(2)(3)(1)).toBe(7);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons">
        <div class="section-header">
          <div class="section-icon">⚖️</div>
          <h2>柯里化优缺点分析</h2>
        </div>

        <div class="comparison">
          <div class="pros">
            <h3>✅ 柯里化的优点</h3>
            <ul>
              <li>
                <strong>函数复用性</strong>
                <p>通过部分应用创建新函数，减少重复代码</p>
              </li>
              <li>
                <strong>代码可读性</strong>
                <p>链式调用使代码更清晰表达意图</p>
              </li>
              <li>
                <strong>函数组合能力</strong>
                <p>便于创建函数管道和组合</p>
              </li>
              <li>
                <strong>延迟执行</strong>
                <p>可以在需要时才提供所有参数</p>
              </li>
              <li>
                <strong>参数顺序灵活性</strong>
                <p>允许以不同顺序提供参数</p>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>⚠️ 柯里化的缺点</h3>
            <ul>
              <li>
                <strong>性能开销</strong>
                <p>创建多个闭包带来额外内存和性能开销</p>
              </li>
              <li>
                <strong>调试难度</strong>
                <p>堆栈跟踪可能更复杂，增加调试难度</p>
              </li>
              <li>
                <strong>学习曲线</strong>
                <p>对初学者可能难以理解和掌握</p>
              </li>
              <li>
                <strong>参数顺序要求</strong>
                <p>参数必须按特定顺序传递</p>
              </li>
              <li>
                <strong>过度使用风险</strong>
                <p>可能使简单问题复杂化</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 实现示例 -->
      <section class="implementation">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>柯里化实现示例</h2>
        </div>

        <div class="implementation-tabs">
          <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab.label }}
          </button>
        </div>

        <div class="implementation-content">
          <div v-if="activeTab === 0" class="tab-content">
            <h3>基础柯里化实现</h3>
            <div class="code-block">
              <pre><code>function curry(fn) {
  // 获取原始函数的参数个数
  const arity = fn.length;

  return function curried(...args) {
    // 如果参数足够，调用原始函数
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    // 否则返回新函数接收剩余参数
    else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      }
    }
  };
}

// 使用示例
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6</code></pre>
            </div>
          </div>

          <div v-if="activeTab === 1" class="tab-content">
            <h3>高级柯里化实现（占位符支持）</h3>
            <div class="code-block">
              <pre><code>const _ = Symbol('placeholder');

function advancedCurry(fn) {
  return function curried(...args) {
    // 过滤占位符
    const filteredArgs = args.filter(arg => arg !== _);

    // 参数足够且没有占位符
    if (filteredArgs.length >= fn.length && !args.includes(_)) {
      return fn.apply(this, filteredArgs);
    }

    // 返回新函数
    return function(...nextArgs) {
      // 替换占位符
      const combinedArgs = args.map(arg =>
        arg === _ && nextArgs.length ? nextArgs.shift() : arg
      ).concat(nextArgs);

      return curried.apply(this, combinedArgs);
    };
  };
}

// 使用示例
const sum = (a, b, c) => a + b + c;
const curriedSum = advancedCurry(sum);

console.log(curriedSum(_, 2)(1)(3)); // 1+2+3=6
console.log(curriedSum(1, _, 3)(2)); // 1+2+3=6</code></pre>
            </div>
          </div>

          <div v-if="activeTab === 2" class="tab-content">
            <h3>柯里化在实际项目中的应用</h3>
            <div class="code-block">
              <pre><code>// 1. 事件处理
const handleEvent = eventType => element => handler => {
  element.addEventListener(eventType, handler);
  return () => element.removeEventListener(eventType, handler);
};

// 创建特定事件处理函数
const onClick = handleEvent('click');
const onButtonClick = onClick(document.getElementById('btn'));

// 使用
const removeListener = onButtonClick(e => {
  console.log('Button clicked!');
});

// 移除事件监听器
// removeListener();

// 2. UI组件配置
const createButton = color => size => text => {
  return {
    element: 'button',
    styles: {
      backgroundColor: color,
      fontSize: `${size}px`,
      padding: '10px 20px'
    },
    text
  };
};

// 创建预设按钮
const primaryButton = createButton('#3498db');
const largePrimaryButton = primaryButton(16);

// 使用预设创建按钮
const myButton = largePrimaryButton('Click Me');
console.log(myButton);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="section-icon">🏆</div>
          <h2>柯里化最佳实践</h2>
        </div>

        <div class="practices">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <h3>明确柯里化的目的</h3>
            <p>只在需要部分应用、函数组合或提高代码可读性时使用柯里化，避免不必要的复杂性。</p>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <h3>控制柯里化深度</h3>
            <p>避免过度柯里化，通常2-3层柯里化足够满足大多数场景。</p>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <h3>使用箭头函数简化</h3>
            <p>利用箭头函数语法使柯里化函数更简洁。</p>
            <div class="code-block small">
              <pre><code>// 传统写法
function add(a) {
  return function(b) {
    return a + b;
  }
}

// 箭头函数写法
const add = a => b => a + b;</code></pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <h3>合理命名柯里化函数</h3>
            <p>使用清晰的名字表明这是部分应用的函数。</p>
            <div class="code-block small">
              <pre><code>// 不好
const get = curry(fetchData);

// 更好
const getWithBaseUrl = curry(fetchData);</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 JavaScript 柯里化指南 | 函数式编程的强大工具</p>
      <p>合理使用柯里化，让代码更简洁、更灵活</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 函数链展示数据
const functionChain = ref([
  { params: 'a' },
  { params: 'b' },
  { params: 'c' }
]);

// 实现示例标签页
const tabs = ref([
  { label: '基础实现' },
  { label: '高级实现' },
  { label: '实际应用' }
]);

const activeTab = ref(0);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #8e44ad;
  --secondary-color: #3498db;
  --accent-color: #9b59b6;
  --background-light: #f8f9fa;
  --card-bg: #ffffff;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --border-radius: 16px;
  --code-bg: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-light);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.currying-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--background-light);
  min-height: 100vh;
}

.header {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a2a3a, #2c3e50);
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 var(--border-radius) var(--border-radius);

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;

    h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: white;
    }

    p {
      font-size: 1.4rem;
      color: rgba(255, 255, 255, 0.85);
    }
  }

  .header-graphic {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  .function-chain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .function-box {
    display: flex;
    align-items: center;
    background: rgba(142, 68, 173, 0.3);
    border-radius: 8px;
    padding: 0.8rem 1.2rem;

    .fn-name {
      font-weight: 700;
      margin-right: 0.5rem;
    }

    .fn-params {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
    }

    .fn-arrow {
      margin-left: 1rem;
      color: var(--secondary-color);
      font-weight: bold;
    }
  }
}

.content {
  padding: 2rem;
  transform: translateY(-50px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(142, 68, 173, 0.2);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .section-icon {
    font-size: 2rem;
    background: var(--primary-color);
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(142, 68, 173, 0.3);
  }
}

/* 概念卡片样式 */
.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.concept-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid var(--primary-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(90deg, rgba(142, 68, 173, 0.1), rgba(52, 152, 219, 0.1));

    h3 {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .card-icon {
      font-size: 1.8rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(142, 68, 173, 0.2);
      color: var(--primary-color);
    }
  }

  .card-content {
    padding: 1.5rem;

    p {
      margin-bottom: 1.5rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }
  }
}

.formula {
  background: rgba(142, 68, 173, 0.05);
  border-left: 4px solid var(--primary-color);
  padding: 1rem;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  line-height: 1.8;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: rgba(142, 68, 173, 0.1);
    font-weight: 600;
  }

  tr:hover {
    background: rgba(142, 68, 173, 0.05);
  }
}

.code-block {
  background: var(--code-bg);
  border-radius: 10px;
  padding: 1.2rem;
  margin-top: 1rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;

  pre {
    margin: 0;

    code {
      color: #000;
      display: block;

      .token.keyword {
        color: #c678dd;
      }

      .token.function {
        color: #61afef;
      }

      .token.string {
        color: #98c379;
      }

      .token.comment {
        color: #5c6370;
      }

      .token.operator {
        color: #56b6c2;
      }

      .token.punctuation {
        color: #abb2bf;
      }

      .token.number {
        color: #d19a66;
      }
    }
  }

  &.small {
    font-size: 0.85rem;
    padding: 1rem;
  }
}

/* 使用场景样式 */
.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.scenario-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
  border-top: 4px solid var(--primary-color);

  &:hover {
    transform: translateY(-5px);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
}

/* 优缺点分析 */
.pros-cons {
  margin-bottom: 3rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid;
  }
}

.pros {
  border-top: 4px solid #2ecc71;

  h3 {
    border-color: rgba(46, 204, 113, 0.3);
    color: #2ecc71;
  }
}

.cons {
  border-top: 4px solid #e74c3c;

  h3 {
    border-color: rgba(231, 76, 60, 0.3);
    color: #e74c3c;
  }
}

ul {
  list-style: none;

  li {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.3em;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    strong {
      display: block;
      margin-bottom: 0.3rem;
    }
  }
}

.pros li::before {
  background: #2ecc71;
}

.cons li::before {
  background: #e74c3c;
}

/* 实现部分样式 */
.implementation {
  margin-bottom: 3rem;
}

.implementation-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  button {
    padding: 0.8rem 1.5rem;
    background: rgba(142, 68, 173, 0.1);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    color: var(--text-secondary);

    &:hover {
      background: rgba(142, 68, 173, 0.2);
    }

    &.active {
      background: var(--primary-color);
      color: white;
    }
  }
}

.implementation-content {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
}

/* 最佳实践部分 */
.best-practices {
  margin-bottom: 3rem;
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.practice-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  position: relative;
  border-left: 4px solid var(--primary-color);

  .practice-number {
    position: absolute;
    top: -15px;
    left: -15px;
    background: var(--primary-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(142, 68, 173, 0.3);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(142, 68, 173, 0.1);
  color: var(--text-secondary);

  p {
    &:first-child {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 2rem 1rem;

    .header-content h1 {
      font-size: 2.2rem;
    }

    .header-content p {
      font-size: 1.1rem;
    }
  }

  .content {
    padding: 1rem;
    transform: translateY(-30px);
  }

  .section-header {
    flex-direction: column;
    text-align: center;

    .section-icon {
      margin: 0 auto;
    }
  }
}
</style>