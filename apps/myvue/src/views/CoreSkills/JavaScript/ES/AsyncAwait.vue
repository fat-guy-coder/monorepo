<template>
  <div class="async-container">
    <header class="header">
      <h1>JavaScript Async 函数详解</h1>
      <div class="subtitle">用同步方式写异步代码的终极方案</div>
    </header>

    <main class="content">
      <!-- 原理图示 -->
      <section class="card principle">
        <h2>⚙️ 运行原理</h2>
        <div class="principle-diagram">
          <div class="execution-flow">
            <div class="step">
              <div class="step-icon">1</div>
              <p>调用 async 函数</p>
            </div>
            <div class="arrow">⇒</div>
            <div class="step">
              <div class="step-icon">2</div>
              <p>隐式返回 Promise</p>
            </div>
            <div class="arrow">⇒</div>
            <div class="step">
              <div class="step-icon">3</div>
              <p>自动执行 Generator</p>
              <div class="sub-flow">
                <span class="await">遇到 await</span>
                <div class="arrow">↓</div>
                <span class="pause">暂停执行</span>
                <div class="arrow">↓</div>
                <span class="resume">异步完成恢复</span>
              </div>
            </div>
          </div>
          <div class="principle-desc">
            <h3>核心机制：</h3>
            <ul>
              <li>▸ 语法糖：基于 Generator + Promise 的封装</li>
              <li>▸ 自动执行：通过内置执行器自动迭代 Generator</li>
              <li>▸ 微任务调度：await 后的代码会被包装成微任务</li>
              <li>▸ 错误冒泡：自动捕获异常并 reject Promise</li>
            </ul>
            <div>
              <h3>优点</h3>
              <ul>
                <li>▸ 语法简洁，易于理解</li>
                <li>▸ 可读性强，代码更直观</li>
                <li>▸ 错误处理方便，易于调试:try catch直接捕获异常</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <!-- 基本用法 -->
      <section class="card usage">
        <h2>📌 基本语法</h2>
        <div class="syntax-section">
          <pre class="code-block"><code>// 函数声明
async function fetchData() {
  try {
    const response = await fetch('/api');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 箭头函数
const getUser = async (userId) => {
  const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);
  return user;
};

// IIFE 立即执行
(async () => {
  await initApp();
})();</code></pre>
        </div>
      </section>

      <!-- for await...of 用法 -->
      <section class="card for-await-of">
        <h2>🔄 for await...of 用法</h2>
        <div class="syntax-section">
          <pre class="code-block"><code>async function processItems(items) {
      for await (const item of items) {
        console.log(item); // 逐个处理异步操作
      }
    }</code></pre>
          <p>
            使用 for await...of 可以简化处理异步可迭代对象的代码，适用于需要逐个处理异步结果的场景。
          </p>
        </div>
      </section>

      <!-- for 循环中使用 await -->
      <section class="card for-await-loop">
        <h2>🔄 for 循环中使用 await</h2>
        <div class="syntax-section">
          <pre class="code-block"><code>async function processUrls(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // 逐个处理每个 URL 的响应
      }
    }</code></pre>
          <p>使用 for 循环结合 await 可以逐个处理异步请求，适用于需要顺序执行的场景。</p>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card use-cases">
        <h2>💡 典型应用场景</h2>
        <div class="case-grid">
          <div class="case-card">
            <h3>1. 顺序异步操作</h3>
            <pre><code>async function processOrder() {
  const user = await getUser();
  const cart = await getCart(user.id);
  const order = await createOrder(cart);
  await sendConfirmation(order);
}</code></pre>
          </div>

          <div class="case-card">
            <h3>2. 并行异步操作</h3>
            <pre><code>async function loadData() {
  const [user, product] = await Promise.all([
    fetchUser(),
    fetchProduct()
  ]);
  return { user, product };
}</code></pre>
          </div>

          <div class="case-card">
            <h3>3. 错误处理</h3>
            <pre><code>async function safeFetch() {
  try {
    return await fetchData();
  } catch (err) {
    logError(err);
    return fallbackData;
  }
}</code></pre>
          </div>

          <div class="case-card">
            <h3>4. 循环处理</h3>
            <pre><code>async function processBatch(items) {
  for (const item of items) {
    await processItem(item); // 顺序执行
  }

  // 并行版本
  await Promise.all(items.map(processItem));
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="card pitfalls">
        <h2>⚠️ 注意事项</h2>
        <div class="warning-grid">
          <div class="warning">
            <h3>不要忘记 await</h3>
            <p>错误示例：</p>
            <pre><code>async function example() {
  const data = fetchData(); // 缺少 await
  return data; // 返回的是 Promise 对象
}</code></pre>
          </div>

          <div class="warning">
            <h3>合理处理并行</h3>
            <pre><code>// 低效顺序执行
await a();
await b();

// 高效并行执行
await Promise.all([a(), b()]);</code></pre>
          </div>

          <div class="warning">
            <h3>避免顶层 await</h3>
            <pre><code>// 模块顶层 (ES2022+)
await init(); // 可能造成模块加载阻塞

// 推荐包裹在 async IIFE 中
(async () => {
  await init();
})();</code></pre>
          </div>

          <div class="warning">
            <h3>性能陷阱</h3>
            <pre><code>// 循环中的串行 await
for (const url of urls) {
  await fetch(url); // 逐个请求，速度慢
}

// 批量并行处理
const promises = urls.map(url => fetch(url));
await Promise.all(promises);</code></pre>
          </div>
        </div>
      </section>

      <!-- 实现原理 -->
      <section class="card implementation">
        <h2>🔧 Promise + Generator 实现 Async</h2>
        <div class="implementation-content">
          <p>async/await 本质上是 Generator + Promise 的语法糖,下面是其核心实现原理:</p>
          <pre><code>function asyncToGenerator(generatorFunc) {
  // 返回一个包装函数
  return function(...args) {
    const gen = generatorFunc.apply(this, args);

    // 返回Promise
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let genResult;
        try {
          genResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = genResult;

        if (done) {
          // Generator 执行完毕
          return resolve(value);
        } else {
          // 确保返回值是 Promise
          return Promise.resolve(value).then(
            val => step('next', val),
            err => step('throw', err)
          );
        }
      }

      step('next');
    });
  }
}

// 使用示例
const getData = asyncToGenerator(function* () {
  const data1 = yield fetch('url1');
  const data2 = yield fetch('url2');
  return data2;
});</code></pre>

          <div class="implementation-notes">
            <h3>实现要点:</h3>
            <ul>
              <li>将 Generator 函数包装成返回 Promise 的函数</li>
              <li>自动执行 Generator 直到结束</li>
              <li>处理中间值,确保是 Promise</li>
              <li>错误传递和异常处理</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
li,
p,
h3,
h4 {
  color: rgb(0, 0, 0);
}

.async-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.principle-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.execution-flow {
  background: #f4f6f8;
  padding: 2rem;
  border-radius: 8px;
}

.step {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-icon {
  width: 30px;
  height: 30px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  line-height: 30px;
}

.arrow {
  font-size: 1.5rem;
  color: #7f8c8d;
  text-align: center;
  margin: 1rem 0;
}

.sub-flow {
  margin-top: 1rem;
  color: #e67e22;
}

.principle-desc ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}

.principle-desc li {
  margin: 0.8rem 0;
}

.case-grid,
.warning-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.case-card,
.warning {
  background: #f8f9fa;
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.warning {
  border-color: #e74c3c;
}

.code-block {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

pre code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .principle-diagram {
    grid-template-columns: 1fr;
  }

  .case-grid,
  .warning-grid {
    grid-template-columns: 1fr;
  }
}
</style>
