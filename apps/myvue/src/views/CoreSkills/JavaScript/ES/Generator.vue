<template>
  <div class="generator-container">
    <h1 class="main-title">ES6 Generator 详解</h1>

    <div class="section">
      <h2 class="section-title">什么是 Generator？</h2>
      <p class="section-content">
        Generator（生成器）是 ES6 引入的一种特殊函数，可以控制函数的执行流程，实现暂停和恢复执行的功能。
        生成器函数使用 <code>function*</code> 语法定义，内部使用 <code>yield</code> 关键字暂停函数执行。
      </p>
      <div class="highlight-box">
        <div class="highlight-title">核心特性：</div>
        <ul>
          <li>可暂停和恢复的函数执行</li>
          <li>双向数据传递（函数内外）</li>
          <li>与迭代器协议紧密集成</li>
          <li>简化异步编程的解决方案</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">实现原理</h2>
      <p class="section-content">
        Generator 的实现基于迭代器协议和协程（Coroutine）概念：
      </p>

      <div class="principle-card">
        <div class="principle-header">1. 迭代器协议</div>
        <div class="principle-content">
          生成器函数返回一个迭代器对象，该对象实现了 <code>next()</code> 方法。
          每次调用 <code>next()</code> 都会执行到下一个 <code>yield</code> 或函数结束。
        </div>
      </div>

      <div class="principle-card">
        <div class="principle-header">2. 协程机制</div>
        <div class="principle-content">
          Generator 实现了轻量级协程，在函数执行中可以暂停并将控制权交还给调用者，稍后可以从暂停点恢复执行。
          JavaScript 引擎在内部维护生成器的执行上下文和状态。
        </div>
      </div>

      <div class="principle-card">
        <div class="principle-header">3. 状态机实现</div>
        <div class="principle-content">
          生成器函数被编译为一个状态机，每个 <code>yield</code> 对应一个状态节点。
          引擎通过 <code>next()</code> 调用驱动状态机从一个状态切换到下一个状态。
        </div>
      </div>

      <div class="code-block">
        <pre><code>function* generatorExample() {
  // 状态 0: 起点
  console.log('Start');
  const a = yield 1; // 状态 1: 第一个 yield

  // 状态 2: 恢复执行
  console.log('Received:', a);
  const b = yield 2; // 状态 3: 第二个 yield

  // 状态 4: 结束
  return a + b;
}</code></pre>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">基本用法</h2>
      <div class="usage-grid">
        <div class="usage-card">
          <div class="usage-header">1. 定义生成器函数</div>
          <div class="code-block">
            <pre><code>function* simpleGenerator() {
  yield 'First value';
  yield 'Second value';
  return 'Final value';
}</code></pre>
          </div>
        </div>

        <div class="usage-card">
          <div class="usage-header">2. 创建迭代器</div>
          <div class="code-block">
            <pre><code>const gen = simpleGenerator();

console.log(gen.next());
// { value: 'First value', done: false }

console.log(gen.next());
// { value: 'Second value', done: false }

console.log(gen.next());
// { value: 'Final value', done: true }</code></pre>
          </div>
        </div>

        <div class="usage-card">
          <div class="usage-header">3. 双向通信</div>
          <div class="code-block">
            <pre><code>function* twoWayGenerator() {
  const name = yield 'What is your name?';
  const age = yield `Hello ${name}, how old are you?`;
  return `${name} is ${age} years old`;
}

const gen = twoWayGenerator();
console.log(gen.next().value); // "What is your name?"
console.log(gen.next('Alice').value); // "Hello Alice, how old are you?"
console.log(gen.next(30).value); // "Alice is 30 years old"</code></pre>
          </div>
        </div>

        <div class="usage-card">
          <div class="usage-header">4. 错误处理</div>
          <div class="code-block">
            <pre><code>function* errorHandling() {
  try {
    yield 'Step 1';
    throw new Error('Generator error!');
  } catch (err) {
    yield `Caught: ${err.message}`;
  }
}

const gen = errorHandling();
console.log(gen.next()); // { value: 'Step 1', done: false }
console.log(gen.throw(new Error('External error')));
// { value: 'Caught: External error', done: false }</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">实际应用场景</h2>
      <div class="scenario-cards">
        <div class="scenario-card">
          <div class="scenario-icon">🔄</div>
          <div class="scenario-content">
            <h3>简化异步流程控制</h3>
            <p>Generator + Promise 实现类似 async/await 的异步控制：</p>
            <div class="code-block">
              <pre><code>function* fetchUserData() {
  try {
    const user = yield fetch('/api/user');
    const posts = yield fetch(`/api/posts/${user.id}`);
    return { user, posts };
  } catch (error) {
    console.error('Fetch failed', error);
  }
}

// 执行函数
function runGenerator(gen) {
  const it = gen();

  function handle(result) {
    if (result.done) return result.value;
    return result.value.then(data => {
      return handle(it.next(data));
    });
  }

  return handle(it.next());
}</code></pre>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">♾️</div>
          <div class="scenario-content">
            <h3>无限数据流</h3>
            <p>生成无限序列，按需获取值：</p>
            <div class="code-block">
              <pre><code>function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const userIds = idGenerator();
console.log(userIds.next().value); // 1
console.log(userIds.next().value); // 2
// 可以无限调用...</code></pre>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">⏱️</div>
          <div class="scenario-content">
            <h3>复杂状态机</h3>
            <p>实现具有多个状态的工作流：</p>
            <div class="code-block">
              <pre><code>function* purchaseFlow() {
  // 状态1: 选择商品
  const product = yield showProducts();

  // 状态2: 确认数量
  const quantity = yield askQuantity(product);

  // 状态3: 支付
  const payment = yield processPayment(product, quantity);

  // 状态4: 完成
  yield completePurchase(payment);
}</code></pre>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">📊</div>
          <div class="scenario-content">
            <h3>数据管道处理</h3>
            <p>构建数据处理管道：</p>
            <div class="code-block">
              <pre><code>function* dataPipeline() {
  const rawData = yield fetchData();
  const cleaned = yield cleanData(rawData);
  const transformed = yield transformData(cleaned);
  const analyzed = yield analyzeData(transformed);
  return analyzed;
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Generator vs Async/Await</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Generator</th>
              <th>Async/Await</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>语法</td>
              <td><code>function*</code> + <code>yield</code></td>
              <td><code>async function</code> + <code>await</code></td>
            </tr>
            <tr>
              <td>返回值</td>
              <td>迭代器对象</td>
              <td>Promise</td>
            </tr>
            <tr>
              <td>错误处理</td>
              <td><code>try/catch</code> + <code>gen.throw()</code></td>
              <td><code>try/catch</code></td>
            </tr>
            <tr>
              <td>双向通信</td>
              <td>支持（通过 <code>next(value)</code>）</td>
              <td>不支持</td>
            </tr>
            <tr>
              <td>应用场景</td>
              <td>复杂控制流、状态机、自定义迭代器</td>
              <td>异步操作简化</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <p>ES6 Generator 是 JavaScript 异步编程发展史上的重要里程碑，虽然现在大多被 Async/Await 取代，但理解其原理有助于深入掌握 JavaScript 异步模型。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加一些响应式数据或方法
const activeTab = ref('usage');
</script>

<style lang="less" scoped>
.generator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  line-height: 1.6;

  .main-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #3498db;
    font-size: 2.5rem;
  }

  .section {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    margin-bottom: 2rem;

    .section-title {
      color: #2980b9;
      border-left: 4px solid #3498db;
      padding-left: 1rem;
      margin-top: 0;
      font-size: 1.8rem;
    }

    .section-content {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
  }

  .highlight-box {
    background: #e8f4fc;
    border-left: 4px solid #3498db;
    padding: 1.2rem;
    border-radius: 0 8px 8px 0;
    margin: 1.5rem 0;

    .highlight-title {
      font-weight: bold;
      margin-bottom: 0.8rem;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .principle-card {
    background: #f8f9fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.2rem;

    .principle-header {
      font-weight: bold;
      color: #2980b9;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .principle-content {
      color: #555;
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    padding: 1.2rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;

    pre {
      margin: 0;
    }

    code {
      display: block;
      line-height: 1.5;
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .usage-card {
      background: #f0f7ff;
      border: 1px solid #c5e1ff;
      border-radius: 8px;
      overflow: hidden;

      .usage-header {
        background: #3498db;
        color: white;
        padding: 0.8rem 1rem;
        font-weight: bold;
      }
    }
  }

  .scenario-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .scenario-card {
      background: white;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      }

      .scenario-icon {
        background: #3498db;
        color: white;
        font-size: 2rem;
        text-align: center;
        padding: 1rem;
      }

      .scenario-content {
        padding: 1.2rem;

        h3 {
          margin-top: 0;
          color: #2c3e50;
        }

        p {
          color: #555;
          margin-bottom: 1rem;
        }
      }
    }
  }

  .comparison-table {
    overflow-x: auto;
    margin-top: 1.5rem;

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border: 1px solid #e1e4e8;
      }

      th {
        background: #3498db;
        color: white;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: #f8f9fa;
      }
    }
  }

  .footer {
    text-align: center;
    padding: 1.5rem;
    margin-top: 2rem;
    background: #2c3e50;
    color: white;
    border-radius: 8px;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .main-title {
      font-size: 2rem;
    }

    .section {
      padding: 1.5rem;
    }

    .usage-grid,
    .scenario-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
