<template>
  <div class="async-iterator-container">
    <header class="header">
      <h1 class="title">JavaScript 异步迭代器介绍</h1>
      <div class="subtitle">处理异步数据流的现代解决方案</div>
    </header>

    <div class="intro-section">
      <div class="intro-card">
        <div class="intro-icon">🔄</div>
        <div class="intro-content">
          <h3>异步迭代器是什么？</h3>
          <p>
            异步迭代器允许我们遍历异步数据源，每次迭代返回一个 Promise，解决为迭代序列的下一个值。
          </p>
        </div>
      </div>
      <div class="intro-card">
        <div class="intro-icon">⚡️</div>
        <div class="intro-content">
          <h3>关键特性</h3>
          <p>使用 Symbol.asyncIterator 定义异步迭代器，通过 for await...of 循环遍历</p>
        </div>
      </div>
      <div class="intro-card">
        <div class="intro-icon">🚀</div>
        <div class="intro-content">
          <h3>主要用途</h3>
          <p>处理流式数据、分页API、实时数据源等异步数据序列</p>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 左侧内容区域 -->
      <main class="main-content">
        <section class="section">
          <h2 class="section-title">异步迭代器核心概念</h2>

          <div class="concept-grid">
            <div class="concept-card">
              <h3>Symbol.asyncIterator</h3>
              <p>异步可迭代对象必须实现的方法，返回一个异步迭代器</p>
            </div>
            <div class="concept-card">
              <h3>异步迭代器协议</h3>
              <p>对象必须实现 next() 方法，返回 Promise，解决为 {value, done} 对象</p>
            </div>
            <div class="concept-card">
              <h3>for await...of</h3>
              <p>用于遍历异步可迭代对象的循环语法</p>
            </div>
          </div>

          <div class="comparison">
            <h3>同步迭代 vs 异步迭代</h3>
            <div class="comparison-table">
              <div class="table-row header">
                <div class="table-cell">特性</div>
                <div class="table-cell">同步迭代器</div>
                <div class="table-cell">异步迭代器</div>
              </div>
              <div class="table-row">
                <div class="table-cell">迭代方法</div>
                <div class="table-cell">[Symbol.iterator]</div>
                <div class="table-cell">[Symbol.asyncIterator]</div>
              </div>
              <div class="table-row">
                <div class="table-cell">next() 返回</div>
                <div class="table-cell">{value, done}</div>
                <div class="table-cell">Promise<{value, done}></div>
              </div>
              <div class="table-row">
                <div class="table-cell">遍历语法</div>
                <div class="table-cell">for...of</div>
                <div class="table-cell">for await...of</div>
              </div>
              <div class="table-row">
                <div class="table-cell">适用场景</div>
                <div class="table-cell">同步数据源</div>
                <div class="table-cell">异步数据流</div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">创建与使用异步迭代器</h2>

          <div class="usage-tabs">
            <div class="tab-buttons">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                :class="['tab-button', { active: activeTab === index }]"
                @click="activeTab = index"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <div v-show="activeTab === 0">
                <h3>基本异步迭代器</h3>
                <pre>
// 创建异步迭代器
const asyncIterator = {
  data: [1, 2, 3],
  async next() {
    if (this.data.length === 0) {
      return { done: true };
    }

    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      value: this.data.shift(),
      done: false
    };
  },
  [Symbol.asyncIterator]() {
    return this;
  }
};

// 使用异步迭代器
(async function() {
  for await (const value of asyncIterator) {
    console.log(value); // 1 (延迟500ms), 2 (延迟500ms), 3 (延迟500ms)
  }
})();</pre
                >
              </div>

              <div v-show="activeTab === 1">
                <h3>生成器函数实现异步迭代器</h3>
                <pre>
// 异步生成器函数
async function* asyncGenerator() {
  const urls = [
    'https://api.example.com/page1',
    'https://api.example.com/page2',
    'https://api.example.com/page3'
  ];

  for (const url of urls) {
    // 获取数据
    const response = await fetch(url);

    // 解析JSON
    const data = await response.json();

    // 产生数据
    yield data;
  }
}

// 使用异步生成器
(async function() {
  for await (const pageData of asyncGenerator()) {
    console.log(pageData);
    // 每页数据
  }
})();</pre
                >
              </div>

              <div v-show="activeTab === 2">
                <h3>处理Node.js文件流</h3>
                <pre>
import fs from 'fs';
import readline from 'readline';

async function processLargeFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // 逐行处理大文件
  for await (const line of rl) {
    // 处理每一行数据
    console.log('Line:', line);
  }
}

processLargeFile('large-data.txt');</pre
                >
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 右侧信息区域 -->
      <aside class="sidebar">
        <section class="section">
          <h2 class="section-title">主要使用场景</h2>
          <div class="scenario-cards">
            <div class="scenario-card">
              <div class="scenario-icon">📡</div>
              <div class="scenario-content">
                <h3>API分页数据</h3>
                <p>遍历分页API的所有结果页</p>
              </div>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">📂</div>
              <div class="scenario-content">
                <h3>大文件处理</h3>
                <p>逐行或分块读取大文件</p>
              </div>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <div class="scenario-content">
                <h3>实时数据流</h3>
                <p>处理WebSocket或SSE实时数据</p>
              </div>
            </div>
            <div class="scenario-card">
              <div class="scenario-icon">🧩</div>
              <div class="scenario-content">
                <h3>数据库查询</h3>
                <p>迭代大型数据库查询结果</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">异步迭代器优点</h2>
          <ul class="benefit-list">
            <li>统一处理异步数据序列</li>
            <li>简化复杂异步流程控制</li>
            <li>内存高效，适合大数据集</li>
            <li>代码可读性好，更易于维护</li>
            <li>避免回调地狱和深层Promise链</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">注意事项</h2>
          <div class="warning-cards">
            <div class="warning-card">
              <h3>错误处理</h3>
              <p>使用try/catch包裹for await...of循环捕获错误</p>
            </div>
            <div class="warning-card">
              <h3>浏览器支持</h3>
              <p>现代浏览器支持良好，但旧浏览器需要polyfill</p>
            </div>
            <div class="warning-card">
              <h3>性能考虑</h3>
              <p>避免在热代码路径中频繁创建迭代器实例</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">兼容性解决方案</h2>
          <div class="polyfill">
            <pre>
// 为不支持的环境添加异步迭代支持
if (!Symbol.asyncIterator) {
  Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator");
}

// 异步迭代器的polyfill
function asyncIteratorPolyfill(iterable) {
  const method = iterable[Symbol.asyncIterator];
  if (method) return method.call(iterable);

  return {
    next() {
      return Promise.resolve(iterable.next());
    }
  };
}</pre
            >
          </div>
        </section>
      </aside>
    </div>

    <section class="section advanced-section">
      <h2 class="section-title">高级用法</h2>

      <div class="advanced-grid">
        <div class="advanced-card">
          <h3>组合异步迭代器</h3>
          <pre>
async function* mergeAsyncIterators(...iterators) {
  for (const iterator of iterators) {
    for await (const value of iterator) {
      yield value;
    }
  }
}

// 合并多个数据流
const combined = mergeAsyncIterators(
  fetchDataStream('source1'),
  fetchDataStream('source2')
);

for await (const value of combined) {
  processValue(value);
}</pre
          >
        </div>

        <div class="advanced-card">
          <h3>异步迭代器转换</h3>
          <pre>
async function* transformAsyncIterator(iterator, transformFn) {
  for await (const value of iterator) {
    yield transformFn(value);
  }
}

// 使用转换管道
const dataStream = fetchDataStream('source');
const transformedStream = transformAsyncIterator(
  dataStream,
  value => ({ ...value, processed: true })
);

for await (const item of transformedStream) {
  console.log(item);
}</pre
          >
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="adoption">
        <h3>异步迭代器采用情况</h3>
        <div class="adoption-stats">
          <div class="stat">
            <div class="stat-value">92%</div>
            <div class="stat-label">现代浏览器支持</div>
          </div>
          <div class="stat">
            <div class="stat-value">Node.js 10+</div>
            <div class="stat-label">原生支持</div>
          </div>
          <div class="stat">
            <div class="stat-value">ES2018</div>
            <div class="stat-label">正式规范</div>
          </div>
        </div>
      </div>

      <p class="summary">
        异步迭代器提供了一种优雅的方式来处理异步数据序列，是现代JavaScript应用中处理流式数据、分页API和大文件处理的强大工具。结合async/await语法，可以编写出简洁高效的异步代码。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 标签页状态
const tabs = ref([{ label: '基础示例' }, { label: 'API分页' }, { label: '文件处理' }])
const activeTab = ref(0)

// 浏览器支持数据
const browserSupport = ref({
  chrome: { version: 63, support: true },
  firefox: { version: 57, support: true },
  safari: { version: 11, support: true },
  edge: { version: 79, support: true },
  node: { version: '10.0.0', support: true },
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #6e45e2;
@secondary-color: #4a6cf7;
@accent-color: #ff6b6b;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f1f5ff;

// 基础样式
.async-iterator-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    font-weight: 400;
  }
}

.intro-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  .intro-card {
    display: flex;
    gap: 1.2rem;
    padding: 1.5rem;
    background: @light-bg;
    border-radius: 12px;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .intro-icon {
      font-size: 2.5rem;
      min-width: 60px;
      height: 60px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .intro-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: @primary-color;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.98rem;
      }
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 2.5rem;
  background: @light-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;

  .concept-card {
    padding: 1.25rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(110, 69, 226, 0.1);
    border-left: 4px solid @secondary-color;

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @primary-color;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.comparison {
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(110, 69, 226, 0.08);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @primary-color;
    text-align: center;
  }
}

.comparison-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  .table-row {
    display: table-row;

    &.header {
      font-weight: 600;
      background: rgba(110, 69, 226, 0.06);
    }

    &:not(.header):hover {
      background: rgba(110, 69, 226, 0.03);
    }
  }

  .table-cell {
    display: table-cell;
    padding: 0.75rem;
    border-bottom: 1px solid @border-color;

    &:first-child {
      font-weight: 500;
      width: 30%;
    }
  }
}

.usage-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(110, 69, 226, 0.1);

  .tab-buttons {
    display: flex;
    background: linear-gradient(135deg, @primary-color, @secondary-color);

    .tab-button {
      flex: 1;
      padding: 1rem;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border-bottom: 3px solid white;
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .tab-content {
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    pre {
      background: @code-bg;
      padding: 1.5rem;
      border-radius: 8px;
      font-size: 0.95rem;
      overflow-x: auto;
      margin: 0;
    }
  }
}

.sidebar {
  .scenario-cards {
    display: grid;
    gap: 1.2rem;

    .scenario-card {
      display: flex;
      gap: 1rem;
      padding: 1.25rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(110, 69, 226, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(110, 69, 226, 0.15);
      }

      .scenario-icon {
        font-size: 1.8rem;
        min-width: 50px;
        height: 50px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .scenario-content {
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: @primary-color;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }

  .benefit-list {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.8rem;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-weight: bold;
        width: 24px;
        height: 24px;
        background: rgba(110, 69, 226, 0.1);
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .warning-cards {
    display: grid;
    gap: 1rem;

    .warning-card {
      padding: 1.25rem;
      background: rgba(255, 107, 107, 0.05);
      border-left: 4px solid @accent-color;
      border-radius: 0 8px 8px 0;

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: darken(@accent-color, 15%);
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .polyfill {
    pre {
      background: @code-bg;
      padding: 1.25rem;
      border-radius: 8px;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 0;
    }
  }
}

.advanced-section {
  background: linear-gradient(135deg, @light-bg, rgba(110, 69, 226, 0.03));
  border: 2px dashed rgba(110, 69, 226, 0.15);

  .section-title {
    text-align: center;
    border-bottom: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(to right, @primary-color, @secondary-color);
      border-radius: 3px;
    }
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .advanced-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 16px rgba(110, 69, 226, 0.1);

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }

    pre {
      background: @code-bg;
      padding: 1.25rem;
      border-radius: 8px;
      font-size: 0.9rem;
      overflow-x: auto;
    }
  }
}

.footer {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid @border-color;

  .adoption {
    text-align: center;
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.3rem;
      color: @primary-color;
      margin-bottom: 1.5rem;
    }

    .adoption-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      .stat {
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: @primary-color;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }
  }

  .summary {
    text-align: center;
    font-size: 1.05rem;
    max-width: 800px;
    margin: 1.5rem auto 0;
    padding: 1.5rem;
    background: rgba(110, 69, 226, 0.03);
    border-radius: 12px;
    font-weight: 500;
  }
}

// 代码样式
code,
pre {
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
}

pre {
  position: relative;
  padding-left: 1.5rem !important;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, @primary-color, @secondary-color);
    border-radius: 4px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .async-iterator-container {
    padding: 1rem;
  }

  .header .title {
    font-size: 2rem;
  }

  .intro-section {
    grid-template-columns: 1fr;
  }
}
</style>
