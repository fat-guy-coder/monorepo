<template>
  <div class="async-function-guide">
    <header class="guide-header">
      <div class="header-content">
        <h1>Async/Await 指南</h1>
        <p>使用现代JavaScript优雅处理异步操作</p>
      </div>
      <div class="header-graphic">
        <div class="async-graphic">
          <div class="promise-circle" v-for="n in 3" :key="n" :style="`--delay: ${n * 0.3}s`"></div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <div class="quick-summary">
        <div class="summary-card">
          <div class="summary-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z M19,11c0,1.85-0.51,3.65-1.38,5.21l-1.45-1.45 c1.29-1.94,1.07-4.58-0.64-6.29c-1.95-1.95-5.12-1.95-7.07,0c-1.95,1.95-1.95,5.12,0,7.07c1.71,1.71,4.35,1.92,6.29,0.64 l1.45,1.45C17.76,17.45,15.46,19,13,19c-3.87,0-7-3.13-7-7s3.13-7,7-7S19,7.13,19,11z M14,12c0-1.11-0.89-2-2-2s-2,0.89-2,2 s0.89,2,2,2S14,13.11,14,12z"/>
            </svg>
          </div>
          <div>
            <h3>核心概念</h3>
            <p>让异步代码像同步代码一样可读</p>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
            </svg>
          </div>
          <div>
            <h3>语法糖</h3>
            <p>基于Promise的语法糖</p>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24.21-.34.1-.79-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72z"/>
            </svg>
          </div>
          <div>
            <h3>错误处理</h3>
            <p>使用try/catch处理错误</p>
          </div>
        </div>
      </div>

      <div class="main-content">
        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">⏱️</span>
            什么是Async函数？
          </h2>
          <div class="section-content">
            <p>Async函数是ES2017引入的异步编程解决方案，它建立在Promise之上，使得异步代码的编写和阅读更加直观。</p>

            <div class="definition-card">
              <h3>核心特点：</h3>
              <ul>
                <li>使用<code>async</code>关键字声明函数</li>
                <li>函数内部可以使用<code>await</code>关键字</li>
                <li>总是返回一个Promise对象</li>
                <li>让异步代码拥有同步代码的外观</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">💡</span>
            基本用法
          </h2>
          <div class="section-content">
            <div class="code-block">
              <pre><code class="javascript">// 声明async函数
async function fetchData() {
  // 使用await等待Promise解决
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

// 调用async函数
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));</code></pre>
            </div>

            <div class="usage-grid">
              <div class="usage-item">
                <div class="usage-icon">✅</div>
                <h3>简化Promise链</h3>
                <p>避免多层.then()嵌套</p>
              </div>

              <div class="usage-item">
                <div class="usage-icon">🔄</div>
                <h3>顺序执行</h3>
                <p>让异步操作顺序执行</p>
              </div>

              <div class="usage-item">
                <div class="usage-icon">🚦</div>
                <h3>错误处理</h3>
                <p>使用try/catch捕获错误</p>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">📝</span>
            返回值解析
          </h2>
          <div class="section-content">
            <div class="return-value-table">
              <div class="table-header">
                <div>返回值类型</div>
                <div>Promise状态</div>
                <div>示例</div>
              </div>

              <div class="table-row">
                <div>普通值</div>
                <div>fulfilled</div>
                <div><code>return 42;</code> → Promise.resolve(42)</div>
              </div>

              <div class="table-row">
                <div>Promise对象</div>
                <div>取决于Promise</div>
                <div><code>return fetch(...);</code> → 原始Promise</div>
              </div>

              <div class="table-row">
                <div>抛出错误</div>
                <div>rejected</div>
                <div><code>throw new Error(...);</code> → Promise.reject(error)</div>
              </div>

              <div class="table-row">
                <div>无返回值</div>
                <div>fulfilled(undefined)</div>
                <div><code>return;</code> → Promise.resolve(undefined)</div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">🔁</span>
            for await...of 循环
          </h2>
          <div class="section-content">
            <p>用于遍历异步可迭代对象，按顺序处理每个异步操作：</p>

            <div class="code-block">
              <pre><code class="javascript">async function processMultipleRequests(urls) {
  for await (const response of fetchUrls(urls)) {
    console.log('Received:', response);
  }
}

async function* fetchUrls(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}</code></pre>
            </div>

            <div class="use-cases">
              <h3>适用场景：</h3>
              <ul>
                <li>按顺序处理多个API请求</li>
                <li>处理Node.js流数据</li>
                <li>分页数据获取</li>
                <li>读取大文件分块处理</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">⚖️</span>
            最佳实践
          </h2>
          <div class="section-content">
            <div class="best-practices">
              <div class="practice-card good">
                <h3>✅ 推荐做法</h3>
                <ul>
                  <li>始终使用try/catch处理错误</li>
                  <li>合理使用Promise.all()并行请求</li>
                  <li>为异步函数添加明确的返回类型</li>
                  <li>使用AbortController取消请求</li>
                </ul>
              </div>

              <div class="practice-card bad">
                <h3>❌ 避免做法</h3>
                <ul>
                  <li>在顶层模块使用await</li>
                  <li>在循环中不必要地顺序await</li>
                  <li>忽略错误处理</li>
                  <li>过度使用async/await导致性能问题</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">
            <span class="title-icon">🛠️</span>
            在Vue中的使用示例
          </h2>
          <div class="section-content">
            <div class="vue-example">
              <div class="example-controls">
                <button @click="fetchUserData" :disabled="loading">
                  {{ loading ? '加载中...' : '获取用户数据' }}
                </button>
                <button @click="fetchMultipleData" :disabled="loading">
                  并行请求
                </button>
              </div>

              <div class="example-output">
                <div v-if="loading" class="loading-indicator">
                  <div class="spinner"></div>
                  <p>正在获取数据...</p>
                </div>

                <div v-else-if="userData" class="result-card">
                  <h3>用户信息</h3>
                  <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
                </div>

                <div v-else class="welcome-message">
                  <p>点击上方按钮开始异步请求</p>
                </div>

                <div v-if="multipleData.length" class="result-card">
                  <h3>并行请求结果</h3>
                  <ul>
                    <li v-for="(item, index) in multipleData" :key="index">
                      请求 {{ index + 1 }}: {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="code-block">
              <pre><code class="typescript">import { ref } from 'vue';

export default {
  setup() {
    const userData = ref(null);
    const multipleData = ref([]);
    const loading = ref(false);

    // 基本的async函数
    const fetchUserData = async () => {
      try {
        loading.value = true;
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users/1'
        );
        userData.value = await response.json();
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 并行请求
    const fetchMultipleData = async () => {
      try {
        loading.value = true;
        const [todo1, todo2, todo3] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/todos/1'),
          fetch('https://jsonplaceholder.typicode.com/todos/2'),
          fetch('https://jsonplaceholder.typicode.com/todos/3')
        ]);

        multipleData.value = [
          await todo1.json(),
          await todo2.json(),
          await todo3.json()
        ];
      } catch (error) {
        console.error('并行请求失败:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      userData,
      multipleData,
      loading,
      fetchUserData,
      fetchMultipleData
    };
  }
};</code></pre>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer class="guide-footer">
      <p>© 2023 Async/Await使用指南 | 在Vue中优雅处理异步操作</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userData = ref<any>(null);
const multipleData = ref<any[]>([]);
const loading = ref(false);

// 基本的async函数示例
const fetchUserData = async () => {
  try {
    loading.value = true;
    userData.value = null;
    multipleData.value = [];

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    userData.value = await response.json();
  } catch (error) {
    console.error('获取用户数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 并行请求示例
const fetchMultipleData = async () => {
  try {
    loading.value = true;
    userData.value = null;
    multipleData.value = [];

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
      'https://jsonplaceholder.typicode.com/todos/3'
    ];

    const responses = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );

    multipleData.value = responses;
  } catch (error) {
    console.error('并行请求失败:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>


:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --primary-dark: #3f37c9;
  --secondary: #f72585;
  --success: #4cc9f0;
  --warning: #f8961e;
  --error: #e63946;
  --background: #f9fafb;
  --card-bg: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --border: #e5e7eb;
  --border-radius: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --transition: all 0.3s ease;
}

.async-function-guide {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--text-primary);
  background-color: var(--background);
  line-height: 1.6;
}

.guide-header {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border-radius: var(--border-radius);
  padding: 40px;
  margin: 30px 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow);

  .header-content {
    max-width: 600px;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 15px;
      line-height: 1.2;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0;
    }
  }

  .header-graphic {
    .async-graphic {
      position: relative;
      width: 200px;
      height: 200px;

      .promise-circle {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 3px dashed rgba(255, 255, 255, 0.3);
        animation: rotate 8s linear infinite;
        animation-delay: var(--delay);

        &:nth-child(2) {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
        }

        &:nth-child(3) {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
        }
      }
    }
  }
}

.quick-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  .summary-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 25px;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border-top: 4px solid var(--primary);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
    }

    .summary-icon {
      width: 60px;
      height: 60px;
      background: rgba(67, 97, 238, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;

      svg {
        width: 30px;
        height: 30px;
        fill: var(--primary);
      }
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 8px;
    }

    p {
      color: var(--text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.content-section {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--shadow);

  .section-title {
    font-size: 1.6rem;
    color: var(--primary);
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;

    .title-icon {
      margin-right: 12px;
      font-size: 1.4rem;
    }
  }
}

.definition-card {
  background: rgba(67, 97, 238, 0.05);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  padding: 20px;
  margin-top: 20px;

  h3 {
    margin-top: 0;
    color: var(--primary);
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }
}

.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      color: #f8f8f2;
      line-height: 1.5;
    }
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .usage-item {
    background: rgba(72, 149, 239, 0.05);
    border-radius: var(--border-radius);
    padding: 20px;
    text-align: center;

    .usage-icon {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 0 0 8px;
      font-size: 1.2rem;
    }

    p {
      color: var(--text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }
  }
}

.return-value-table {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  overflow: hidden;

  .table-header, .table-row {
    display: contents;

    > div {
      padding: 15px;
    }
  }

  .table-header {
    > div {
      background: var(--primary);
      color: white;
      font-weight: 600;
      text-align: center;
    }
  }

  .table-row {
    > div {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border);

      &:nth-child(3) {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }

    &:nth-child(even) > div {
      background: rgba(67, 97, 238, 0.03);
    }

    &:last-child > div {
      border-bottom: none;
    }
  }
}

.use-cases {
  background: rgba(76, 201, 240, 0.05);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-top: 20px;

  h3 {
    margin-top: 0;
    color: var(--success);
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  .practice-card {
    border-radius: var(--border-radius);
    padding: 25px;

    h3 {
      margin-top: 0;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 12px;
        line-height: 1.5;
      }
    }

    &.good {
      background: rgba(76, 201, 240, 0.08);
      border-top: 4px solid var(--success);
    }

    &.bad {
      background: rgba(230, 57, 70, 0.08);
      border-top: 4px solid var(--error);
    }
  }
}

.vue-example {
  .example-controls {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    button {
      padding: 12px 24px;
      background: var(--primary);

      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      font-size: 1rem;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background: var(--border);
        cursor: not-allowed;
        transform: none;
      }

      &:nth-child(2) {
        background: var(--secondary);

        &:hover {
          background: darken(#f72585, 10%);
        }
      }
    }
  }

  .example-output {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 25px;
    min-height: 200px;
    box-shadow: var(--shadow);

    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;

      .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(67, 97, 238, 0.2);
        border-top: 4px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      p {
        margin: 0;
        color: var(--text-secondary);
      }
    }

    .welcome-message {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px;

      p {
        font-size: 1.1rem;
        color: var(--text-secondary);
      }
    }

    .result-card {
      background: rgba(67, 97, 238, 0.03);
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;

      h3 {
        margin-top: 0;
        color: var(--primary);
        font-size: 1.2rem;
      }

      pre {
        background: rgba(0, 0, 0, 0.02);
        padding: 15px;
        border-radius: 6px;
        overflow-x: auto;
        font-size: 0.9rem;
      }

      ul {
        padding-left: 20px;
        margin: 15px 0 0;

        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}

.guide-footer {
  text-align: center;
  padding: 30px 0 10px;
  margin-top: 50px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  border-top: 1px solid var(--border);
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .guide-header {
    flex-direction: column;
    text-align: center;
    gap: 30px;

    .header-graphic {
      order: -1;
    }
  }

  .return-value-table {
    grid-template-columns: 1fr;

    .table-header {
      display: none;
    }

    .table-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 15px;
      border-bottom: 1px solid var(--border);

      > div {
        padding: 0;
        border: none;

        &:first-child {
          grid-column: 1 / 2;
          font-weight: 600;
        }

        &:nth-child(2) {
          grid-column: 2 / 3;
        }

        &:nth-child(3) {
          grid-column: 1 / 3;
        }
      }
    }
  }

  .best-practices {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .quick-summary {
    grid-template-columns: 1fr;
  }

  .guide-header {
    padding: 30px 20px;

    h1 {
      font-size: 2.2rem;
    }
  }

  .content-section {
    padding: 25px 20px;
  }
}
</style>
