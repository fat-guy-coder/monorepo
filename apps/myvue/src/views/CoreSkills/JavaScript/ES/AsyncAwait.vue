<template>
  <div class="async-container">
    <header>
      <h1><i class="fas fa-bolt"></i> JavaScript Async/Await 介绍</h1>
      <p class="subtitle">现代JavaScript异步编程的核心技术</p>
    </header>

    <div class="content-grid">
      <!-- 概述部分 -->
      <section class="card overview">
        <h2><i class="fas fa-info-circle"></i> Async函数概述</h2>
        <p>
          Async函数是ES2017引入的异步编程解决方案，它建立在Promise之上，使用<code>async</code>和<code>await</code>关键字让异步代码拥有同步代码的书写结构和可读性。
        </p>

        <div class="feature-list">
          <div class="feature">
            <i class="fas fa-check-circle"></i>
            <h3>作用</h3>
            <p>简化异步操作，避免回调地狱，使异步代码更易读、维护</p>
          </div>
          <div class="feature">
            <i class="fas fa-check-circle"></i>
            <h3>特点</h3>
            <p>语法简洁，错误处理更直观，与Promise完美兼容</p>
          </div>
          <div class="feature">
            <i class="fas fa-check-circle"></i>
            <h3>兼容性</h3>
            <p>所有现代浏览器和Node.js 7.6+均支持</p>
          </div>
        </div>
      </section>

      <!-- 基本用法 -->
      <section class="card usage">
        <h2><i class="fas fa-code"></i> 基本用法</h2>
        <div class="code-block">
          <pre><code>// 声明async函数
async function fetchData() {
  // 使用await等待异步操作完成
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

// 调用async函数
fetchData()
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));</code></pre>
        </div>

        <div class="key-points">
          <div class="point">
            <i class="fas fa-key"></i>
            <div>
              <h3>async关键字</h3>
              <p>用于声明异步函数，函数会隐式返回一个Promise对象</p>
            </div>
          </div>
          <div class="point">
            <i class="fas fa-key"></i>
            <div>
              <h3>await关键字</h3>
              <p>只能在async函数内部使用，用于等待Promise完成</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 执行顺序 -->
      <section class="card execution">
        <h2><i class="fas fa-sort-amount-down"></i> 执行顺序</h2>
        <div class="execution-flow">
          <div class="step">
            <div class="step-number">1</div>
            <h3>进入async函数</h3>
            <p>同步执行await之前的代码</p>
          </div>
          <div class="arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>遇到await</h3>
            <p>暂停执行，等待Promise解决</p>
          </div>
          <div class="arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Promise解决</h3>
            <p>继续执行await之后的代码</p>
          </div>
          <div class="arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>函数结束</h3>
            <p>返回的Promise状态变为fulfilled</p>
          </div>
        </div>

        <div class="example">
          <h3>执行顺序示例：</h3>
          <div class="code-block">
            <pre><code>async function example() {
  console.log('开始执行');

  // 遇到await - 暂停执行
  const result = await new Promise(resolve =>
    setTimeout(() => resolve('数据加载完成'), 1000)
  );

  console.log(result); // 1秒后执行
  console.log('继续执行');

  return '完成';
}

console.log('调用前');
example().then(res => console.log(res));
console.log('调用后');</code></pre>
          </div>
        </div>
      </section>

      <!-- 返回值处理 -->
      <section class="card return-value">
        <h2><i class="fas fa-undo"></i> 返回值处理</h2>
        <div class="return-types">
          <div class="type">
            <div class="type-header">
              <i class="fas fa-check-square"></i>
              <h3>返回普通值</h3>
            </div>
            <p>async函数返回的值会被包装为已解决的Promise</p>
            <div class="code-block small">
              <pre><code>async function success() {
  return 42; // 等同于 Promise.resolve(42)
}

success().then(value =>
  console.log(value) // 42
);</code></pre>
            </div>
          </div>

          <div class="type">
            <div class="type-header">
              <i class="fas fa-exclamation-triangle"></i>
              <h3>抛出错误</h3>
            </div>
            <p>抛出异常会被捕获并返回拒绝状态的Promise</p>
            <div class="code-block small">
              <pre><code>async function fail() {
  throw new Error('出错了!');
}

fail().catch(error =>
  console.error(error.message) // '出错了!'
);</code></pre>
            </div>
          </div>

          <div class="type">
            <div class="type-header">
              <i class="fas fa-sync-alt"></i>
              <h3>返回Promise</h3>
            </div>
            <p>返回的Promise会直接作为async函数的返回值</p>
            <div class="code-block small">
              <pre><code>async function getData() {
  return fetch('/api/data')
    .then(response => response.json());
}

// 等同于
async function getData() {
  const response = await fetch('/api/data');
  return response.json();
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 错误处理 -->
      <section class="card error-handling">
        <h2><i class="fas fa-bug"></i> 错误处理</h2>
        <div class="error-methods">
          <div class="method">
            <h3>try/catch</h3>
            <p>在async函数内部捕获错误</p>
            <div class="code-block">
              <pre><code>async function fetchWithTryCatch() {
  try {
    const response = await fetch('...');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    return null;
  }
}</code></pre>
            </div>
          </div>

          <div class="method">
            <h3>.catch()方法</h3>
            <p>在调用处捕获错误</p>
            <div class="code-block">
              <pre><code>async function fetchData() {
  const response = await fetch('...');
  return response.json();
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error('错误:', error));</code></pre>
            </div>
          </div>
        </div>

        <div class="best-practice">
          <h3><i class="fas fa-lightbulb"></i> 最佳实践</h3>
          <ul>
            <li>在async函数内部使用try/catch处理预期错误</li>
            <li>在调用链的末端使用.catch()处理未捕获异常</li>
            <li>对于多个并行操作，使用Promise.all()优化性能</li>
          </ul>
        </div>
      </section>

      <!-- 原理分析 -->
      <section class="card principle">
        <h2><i class="fas fa-cogs"></i> 底层原理</h2>
        <div class="principle-content">
          <p>Async函数本质上是Generator函数的语法糖，由以下部分组成：</p>

          <div class="generator-comparison">
            <div class="generator">
              <h3>Generator实现</h3>
              <div class="code-block">
                <pre><code>function* fetchGenerator() {
  const response = yield fetch('...');
  const data = yield response.json();
  return data;
}

// 使用执行器管理Generator
function run(generator) {
  const iterator = generator();

  function handle(result) {
    if (result.done) return result.value;
    return result.value.then(data =>
      handle(iterator.next(data))
    );
  }

  return handle(iterator.next());
}

run(fetchGenerator);</code></pre>
              </div>
            </div>

            <div class="async-equivalent">
              <h3>Async函数等价实现</h3>
              <div class="code-block">
                <pre><code>async function fetchAsync() {
  const response = await fetch('...');
  const data = await response.json();
  return data;
}</code></pre>
              </div>
            </div>
          </div>

          <div class="transformation">
            <h3><i class="fas fa-exchange-alt"></i> 转换过程</h3>
            <p>Async函数在编译时会被转换为：</p>
            <ol>
              <li>Generator函数</li>
              <li>自动执行器（类似co库）</li>
              <li>返回Promise的包装器</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="card summary">
        <h2><i class="fas fa-clipboard-check"></i> 总结</h2>
        <div class="summary-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li><i class="fas fa-plus-circle"></i> 代码更简洁易读</li>
                <li><i class="fas fa-plus-circle"></i> 错误处理更直观</li>
                <li><i class="fas fa-plus-circle"></i> 同步编程思维处理异步</li>
                <li><i class="fas fa-plus-circle"></i> 与Promise完美兼容</li>
              </ul>
            </div>
            <div class="cons">
              <h3>注意事项</h3>
              <ul>
                <li><i class="fas fa-exclamation-circle"></i> await只能在async函数中使用</li>
                <li><i class="fas fa-exclamation-circle"></i> 过度串行化可能影响性能</li>
                <li><i class="fas fa-exclamation-circle"></i> 顶层作用域不能直接使用await</li>
              </ul>
            </div>
          </div>

          <div class="final-thoughts">
            <h3>使用建议</h3>
            <p>Async/await是现代JavaScript异步编程的首选方案，尤其适用于：</p>
            <ul>
              <li>需要顺序执行的异步操作</li>
              <li>复杂异步逻辑需要清晰代码结构</li>
              <li>需要同步方式处理错误</li>
            </ul>
            <p>
              对于并行操作，结合使用<code>Promise.all()</code>和<code>Promise.race()</code>可以达到最佳性能。
            </p>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>JavaScript异步编程 &copy; 2023 - 深入理解Async/Await</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.async-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  padding: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  padding: 25px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #4b6cb7;
}

.feature i {
  color: #4b6cb7;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2c3e50;
}

.code-block {
  background: #e2e8f0;
  color: #2d3748;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 15px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 20px 0;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.code-block.small {
  font-size: 14px;
  padding: 15px;
}

pre {
  margin: 0;
}

code {
  font-family: 'Fira Code', monospace;
}

.key-points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 25px;
}

.point {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.point i {
  color: #4b6cb7;
  font-size: 1.5rem;
  margin-top: 5px;
}

.point h3 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.execution-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}

.step {
  background: #f0f7ff;
  border: 1px solid #d0e0f0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  flex: 1;
  max-width: 200px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4b6cb7;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 15px;
}

.step h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #2c3e50;
}

.arrow {
  color: #4b6cb7;
  font-size: 1.5rem;
}

.return-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.type {
  background: #f9fbfd;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
}

.type-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.type-header i {
  font-size: 1.3rem;
}

.type-header h3 {
  color: #2c3e50;
}

.error-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 20px;
}

.method h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f4f8;
}

.best-practice {
  background: #f0f7ff;
  border-left: 4px solid #4b6cb7;
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin-top: 25px;
}

.best-practice h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.best-practice ul {
  padding-left: 25px;
}

.best-practice li {
  margin-bottom: 8px;
}

.generator-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 25px;
}

.generator,
.async-equivalent {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
}

.generator h3,
.async-equivalent h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

.transformation {
  background: #f0f7ff;
  padding: 25px;
  border-radius: 8px;
  margin-top: 25px;
}

.transformation h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.transformation ol {
  padding-left: 30px;
}

.transformation li {
  margin-bottom: 10px;
}

.summary-content {
  display: grid;
  gap: 25px;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.pros,
.cons {
  padding: 20px;
  border-radius: 8px;
}

.pros {
  background: #f0f7ff;
}

.cons {
  background: #fff0f0;
}

.pros h3,
.cons h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pros ul,
.cons ul {
  padding-left: 25px;
}

.pros li,
.cons li {
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.final-thoughts {
  background: #f8fafc;
  padding: 25px;
  border-radius: 8px;
}

.final-thoughts h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.final-thoughts p {
  margin-bottom: 15px;
}

.final-thoughts ul {
  padding-left: 25px;
  margin-bottom: 15px;
}

footer {
  text-align: center;
  padding: 25px;
  background: #f0f4f8;
  color: #4a5568;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1100px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .key-points,
  .error-methods,
  .pros-cons,
  .generator-comparison {
    grid-template-columns: 1fr;
  }

  .execution-flow {
    flex-direction: column;
    gap: 20px;
  }

  .step {
    max-width: 100%;
    width: 100%;
  }

  .arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 600px) {
  header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .card {
    padding: 20px 15px;
  }
}
</style>
