<template>
  <div class="abort-controller-guide">
    <header class="guide-header">
      <h1>AbortController 使用指南</h1>
      <p>优雅地取消异步请求和控制异步操作</p>
    </header>

    <div class="content-container">
      <section class="section">
        <h2 class="section-title">什么是 AbortController?</h2>
        <div class="definition">
          <p>
            <strong>AbortController</strong> 是一个 JavaScript 内置对象，它提供了一个控制器对象和一个信号对象（AbortSignal），
            用于在需要时中止一个或多个 Web 请求。
          </p>
          <p>
            AbortController 主要与 <code>fetch()</code> API 一起使用，但也可以用于其他可中止的操作。
          </p>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心作用</h2>
        <div class="card-grid">
          <div class="card">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path d="M16 8H8v8h8V8z"/>
              </svg>
            </div>
            <h3>取消网络请求</h3>
            <p>在用户离开页面或执行新操作时，取消未完成的请求</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
            </div>
            <h3>超时控制</h3>
            <p>为请求设置超时，自动取消长时间未响应的请求</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
              </svg>
            </div>
            <h3>避免竞态条件</h3>
            <p>确保只处理最新请求的结果，忽略旧请求</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <h3>防止内存泄漏</h3>
            <p>在组件卸载时取消请求，避免更新已卸载的组件</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">基本使用方式</h2>
        <div class="code-example">
          <pre><code class="language-javascript">// 创建 AbortController 实例
const controller = new AbortController();
const signal = controller.signal;

// 在 fetch 中使用
fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('请求已取消');
    } else {
      console.error('请求出错', err);
    }
  });

// 取消请求
controller.abort();</code></pre>
        </div>
      </section>

      <div class="columns-container">
        <section class="section">
          <h2 class="section-title">适用场景</h2>
          <ul class="usage-list">
            <li>
              <strong>用户导航离开页面</strong>
              <p>在组件卸载时取消所有未完成的请求</p>
            </li>
            <li>
              <strong>搜索/筛选功能</strong>
              <p>当用户快速输入时，取消之前的搜索请求</p>
            </li>
            <li>
              <strong>表单提交</strong>
              <p>用户多次点击提交按钮时，取消之前的提交请求</p>
            </li>
            <li>
              <strong>大数据加载</strong>
              <p>用户取消加载或切换页面时中止数据加载</p>
            </li>
            <li>
              <strong>轮询操作</strong>
              <p>需要停止轮询时取消所有定时请求</p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h2 class="section-title">优点与缺点</h2>
          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>原生支持，无需额外依赖</li>
                <li>API 简单直观，易于理解</li>
                <li>可以同时取消多个请求</li>
                <li>减少不必要的网络流量</li>
                <li>避免内存泄漏和更新卸载组件的问题</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li>旧版浏览器需要 polyfill</li>
                <li>仅支持 fetch API，不适用于 XMLHttpRequest</li>
                <li>取消后无法重新启动同一请求</li>
                <li>需要手动处理 AbortError</li>
                <li>不支持部分取消（只能全部取消）</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section class="section">
        <h2 class="section-title">在 Vue 中的使用示例</h2>
        <div class="vue-example">
          <div class="example-controls">
            <button @click="fetchData" :disabled="isLoading">
              获取数据
            </button>
            <button @click="cancelRequest" :disabled="!isLoading">
              取消请求
            </button>
            <button @click="reset">
              重置
            </button>
          </div>

          <div class="example-output">
            <p v-if="isLoading">请求中... ({{ elapsedTime }}秒)</p>
            <p v-else-if="data">成功获取数据: {{ data }}</p>
            <p v-else-if="error">错误: {{ error }}</p>
            <p v-else>点击"获取数据"按钮开始请求</p>
          </div>
        </div>

        <div class="code-example">
          <pre><code class="language-typescript">import { ref, onUnmounted } from 'vue';

// 在 Vue 组件中使用
export default {
  setup() {
    const data = ref(null);
    const error = ref(null);
    const isLoading = ref(false);
    const elapsedTime = ref(0);
    let controller: AbortController | null = null;
    let timer: number | null = null;

    const fetchData = async () => {
      // 如果已有请求在进行，先取消
      if (controller) {
        controller.abort();
      }

      // 创建新的控制器
      controller = new AbortController();
      isLoading.value = true;
      error.value = null;
      elapsedTime.value = 0;

      // 计时器
      timer = setInterval(() => {
        elapsedTime.value += 0.5;
      }, 500);

      try {
        // 模拟 API 请求
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
          signal: controller.signal
        });

        if (!response.ok) throw new Error('请求失败');

        data.value = await response.json();
      } catch (err) {
        if (err.name !== 'AbortError') {
          error.value = err.message;
        }
      } finally {
        isLoading.value = false;
        if (timer) clearInterval(timer);
        controller = null;
      }
    };

    const cancelRequest = () => {
      if (controller) {
        controller.abort();
      }
    };

    const reset = () => {
      if (controller) controller.abort();
      data.value = null;
      error.value = null;
      isLoading.value = false;
      elapsedTime.value = 0;
    };

    // 组件卸载时取消请求
    onUnmounted(() => {
      if (controller) controller.abort();
      if (timer) clearInterval(timer);
    });

    return {
      fetchData,
      cancelRequest,
      reset,
      data,
      error,
      isLoading,
      elapsedTime
    };
  }
};</code></pre>
        </div>
      </section>
    </div>

    <footer class="guide-footer">
      <p> AbortController 使用指南 | 在 Vue 中实现优雅的异步控制</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const data = ref<any>(null);
const error = ref<string | null>(null);
const isLoading = ref(false);
const elapsedTime = ref(0);

let controller: AbortController | null = null;
let timer: number | null = null;

const fetchData = async () => {
  // 如果已有请求在进行，先取消
  if (controller) {
    controller.abort();
  }

  // 创建新的控制器
  controller = new AbortController();
  isLoading.value = true;
  error.value = null;
  elapsedTime.value = 0;

  // 计时器
  timer = setInterval(() => {
    elapsedTime.value += 0.5;
  }, 500);

  try {
    // 模拟 API 请求（使用延迟）
    const response = await fetchWithDelay();

    if (!response.ok) throw new Error('请求失败');

    data.value = await response.json();
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      error.value = err.message || '请求出错';
    }
  } finally {
    isLoading.value = false;
    if (timer) clearInterval(timer);
    controller = null;
  }
};

// 添加延迟的 fetch 函数
const fetchWithDelay = (): Promise<Response> => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
          signal: controller?.signal
        });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    }, 2000);
  });
};

const cancelRequest = () => {
  if (controller) {
    controller.abort();
  }
};

const reset = () => {
  if (controller) controller.abort();
  if (timer) clearInterval(timer);
  data.value = null;
  error.value = null;
  isLoading.value = false;
  elapsedTime.value = 0;
};

// 组件卸载时取消请求
onUnmounted(() => {
  if (controller) controller.abort();
  if (timer) clearInterval(timer);
});
</script>

<style lang="less" scoped>
//

:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --success: #4cc9f0;
  --danger: #f72585;
  --warning: #f8961e;
  --info: #90e0ef;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.abort-controller-guide {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  line-height: 1.6;
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.guide-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));

  border-radius: var(--border-radius) var(--border-radius) 0 0;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content-container {
  padding: 0 20px;
}

.section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--light-gray);

  &:last-child {
    border-bottom: none;
  }
}

.section-title {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--light-gray);
}

.definition {
  background: var(--light);
  padding: 20px;
  border-radius: var(--border-radius);
  border-left: 4px solid var(--primary);

  p {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--primary);
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  padding: 25px 20px;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  border-top: 3px solid var(--primary);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .icon {
    width: 50px;
    height: 50px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    svg {
      fill: var(--primary);
      width: 24px;
      height: 24px;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--dark);
  }

  p {
    color: var(--gray);
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 15px;
  box-shadow: var(--box-shadow);

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: #f8f8f2;
      line-height: 1.5;
    }
  }
}

.columns-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.usage-list {
  list-style: none;
  padding: 0;

  li {
    background: white;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    border-left: 3px solid var(--success);

    &:hover {
      transform: translateX(5px);
    }

    strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 5px;
      color: var(--dark);
    }

    p {
      color: var(--gray);
      margin: 0;
      font-size: 0.95rem;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .pros, .cons {
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  .pros {
    border-top: 3px solid var(--success);

    h3 {
      color: var(--success);
    }
  }

  .cons {
    border-top: 3px solid var(--danger);

    h3 {
      color: var(--danger);
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--light-gray);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--primary);
        font-weight: bold;
      }
    }
  }
}

.vue-example {
  background: var(--light);
  border-radius: var(--border-radius);
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--light-gray);
}

.example-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  button {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    background: var(--primary);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;

    &:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }

    &:active {
      background: #3f37c9;
    }

    &:disabled {
      background: var(--light-gray);
      color: var(--gray);
      cursor: not-allowed;
      transform: none;
    }

    &:nth-child(2) {
      background: var(--danger);

      &:hover {
        background: darken(#f72585, 10%);
      }
    }

    &:nth-child(3) {
      background: var(--gray);

      &:hover {
        background: darken(#6c757d, 10%);
      }
    }
  }
}

.example-output {
  background: white;
  padding: 20px;
  border-radius: var(--border-radius);
  min-height: 80px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  border-left: 4px solid var(--primary);

  p {
    margin: 0;
  }
}

.guide-footer {
  text-align: center;
  padding: 25px 0;
  margin-top: 30px;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid var(--light-gray);
}

@media (max-width: 768px) {
  .guide-header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .content-container {
    padding: 0 10px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .vue-example {
    padding: 15px;
  }

  .example-controls {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
