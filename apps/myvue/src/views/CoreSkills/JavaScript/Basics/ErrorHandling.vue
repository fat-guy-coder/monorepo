<template>
  <div class="error-container">
    <h1 class="main-title">JavaScript 错误处理指南</h1>

    <div class="demo-section">
      <div class="control-group">
        <button class="error-button syntax" @click="triggerSyntaxError">
          触发语法错误
        </button>
        <button class="error-button reference" @click="triggerReferenceError">
          触发引用错误
        </button>
        <button class="error-button custom" @click="triggerCustomError">
          触发自定义错误
        </button>
        <button class="error-button async" @click="triggerAsyncError">
          触发异步错误
        </button>
      </div>

      <div class="error-display">
        <div class="error-card" v-if="currentError">
          <h2 class="error-type">{{ currentError.name }}</h2>
          <div class="error-message">消息：{{ currentError.message }}</div>
          <pre class="error-stack">{{ currentError.stack }}</pre>
          <div class="error-details">
            <span>位置：{{ currentError.file }}:{{ currentError.line }}</span>
            <span>组件：{{ currentError.component }}</span>
          </div>
        </div>
        <div class="placeholder" v-else>
          👇 点击按钮查看错误处理效果
        </div>
      </div>
    </div>

    <section>
      <h3>📝 Error 对象</h3>
      <p>在 JavaScript 中，Error 对象用于表示运行时错误。它包含以下属性：</p>
      <ul>
        <li><strong>name</strong>: 错误的名称，例如 "TypeError"。</li>
        <li><strong>message</strong>: 描述错误的消息。</li>
        <li><strong>stack</strong>: 可选，表示错误发生时的调用栈。</li>
        <li><strong>cause</strong>: 可选，表示导致当前错误的原始错误（ES2022 引入）。</li>
      </ul>
      <h3>抛出错误</h3>
      <pre><code>throw new Error('错误消息')</code></pre>
    </section>

    <section>
      <!-- 内容区 -->
      <main class="guide-content">
        <!-- 核心概念 -->
        <section id="concept" class="content-section">
          <div class="concept-grid">
            <div class="concept-card">
              <div class="error-icon">🚨</div>
              <h3>错误类型体系</h3>
              <ul class="error-types">
                <li v-for="error in errorTypes" :key="error.name">
                  <code>{{ error.name }}</code>
                  <span>{{ error.desc }}</span>
                </li>
              </ul>
            </div>

            <div class="concept-card">
              <div class="error-icon">🛠️</div>
              <h3>错误组成要素</h3>
              <div class="error-structure">
                <pre><code>interface Error {
  name: string;
  message: string;
  stack?: string;  // 非标准
  cause?: Error;   // ES2022
}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用方法 -->
        <section id="usage" class="content-section">
          <h2>🛠️ 使用方法</h2>
          <div class="usage-columns">
            <div class="usage-card">
              <h3>基础错误处理</h3>
              <pre><code class="language-ts">try {
  JSON.parse(invalidJson);
} catch (err) {
  console.error('解析失败:', err.message);
  // 重新抛出保留堆栈
  throw new Error('处理失败', { cause: err });
}</code></pre>
            </div>

            <div class="usage-card">
              <h3>异步错误处理</h3>
              <pre><code class="language-ts">// Promise链式处理
fetchData()
  .then(handleData)
  .catch(err => {
    sentry.captureException(err);
    showToast(err.message);
  });

// async/await
async function load() {
  try {
    await initApp();
  } catch (err) {
    logError(err);
  }
}</code></pre>
            </div>
          </div>
        </section>

        <!-- 注意事项 -->
        <section id="notice" class="content-section">
          <h2>⚠️ 注意事项</h2>
          <div class="notice-grid">
            <div class="notice-card" v-for="note in notices" :key="note.title">
              <div class="notice-icon">{{ note.icon }}</div>
              <div>
                <h3>{{ note.title }}</h3>
                <p>{{ note.content }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>

    <div class="info-grid">
      <div class="info-card try-catch">
        <h2>Try/Catch 处理</h2>
        <pre><code>try {
  // 可能出错的代码
} catch (error) {
  console.error('捕获错误:', error);
  // 处理错误逻辑
}</code></pre>
      </div>

      <div class="info-card error-types">
        <h2>常见错误类型error.name</h2>
        <ul>
          <li>SyntaxError - 语法错误</li>
          <li>ReferenceError - 引用错误</li>
          <li>TypeError - 类型错误</li>
          <li>RangeError - 范围错误</li>
          <li>自定义错误 - new Error()</li>
        </ul>
      </div>

      <div class="info-card error-object">
        <h2>Error 对象属性</h2>
        <ul>
          <li>name: 错误类型名称</li>
          <li>message: 错误描述信息</li>
          <li>stack: 错误堆栈跟踪</li>
          <li>fileName: 出错文件名</li>
          <li>lineNumber: 出错行号</li>
        </ul>
      </div>

      <div class="info-card best-practice">
        <h2>最佳实践</h2>
        <ul>
          <li>始终处理Promise拒绝</li>
          <li>使用错误边界组件</li>
          <li>记录错误日志</li>
          <li>用户友好提示</li>
          <li>生产环境错误上报</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ErrorInfo {
  name: string
  message: string
  stack?: string
  line?: number
  file?: string
  component?: string
}

const currentError = ref<ErrorInfo | null>(null)

// 全局错误处理
window.onerror = (message, source, lineno, colno, error) => {
  currentError.value = {
    name: error?.name || 'UnknownError',
    message: message.toString(),
    stack: error?.stack,
    line: lineno,
    file: source,
    component: 'Global'
  }
  return true // 阻止默认处理
}

const triggerSyntaxError = () => {
  try {
    throw new Error('SyntaxError')
  } catch (error) {
    handleError(error, 'SyntaxDemo')
  }
}

const triggerReferenceError = () => {
  try {
    // @ts-ignore 故意生成引用错误
    console.log(undefinedVariable)
  } catch (error) {
    handleError(error, 'ReferenceDemo')
  }
}

const triggerCustomError = () => {
  try {
    throw new Error('自定义业务逻辑错误')
  } catch (error) {
    handleError(error, 'CustomDemo')
  }
}

const triggerAsyncError = async () => {
  try {
    await new Promise((_, reject) => {
      setTimeout(() => reject(new Error('异步操作失败')), 100)
    })
  } catch (error) {
    handleError(error, 'AsyncDemo')
  }
}

const handleError = (error: unknown, component: string) => {
  const err = error as Error
  currentError.value = {
    name: err.name,
    message: err.message,
    stack: err.stack,
    component
  }
}

const errorTypes = ref([
  { name: 'Error', desc: '通用错误基类' },
  { name: 'SyntaxError', desc: '语法解析错误' },
  { name: 'TypeError', desc: '类型错误' },
  { name: 'ReferenceError', desc: '引用错误' }
]);

const notices = ref([
  {
    icon: '🚫',
    title: '避免静默失败',
    content: '不要使用空的catch块，至少记录错误信息'
  },
  {
    icon: '📝',
    title: '错误信息',
    content: '提供足够上下文，避免敏感信息泄露'
  },
  {
    icon: '⏱️',
    title: '性能影响',
    content: '避免在try块中执行耗时操作'
  },
  {
    icon: '🔗',
    title: '错误链',
    content: '使用cause属性保留原始错误信息'
  }
]);
</script>

<style scoped>
.error-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.main-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.4em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.control-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.error-button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1em;
}

.error-button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.syntax {
  background: #e74c3c;
}

.reference {
  background: #3498db;
}

.custom {
  background: #9b59b6;
}

.async {
  background: #f1c40f;
  color: #2c3e50;
}

.error-display {
  min-height: 200px;
  margin-bottom: 3rem;
  border: 2px dashed #eee;
  border-radius: 12px;
  padding: 1rem;
}

.error-card {
  background: #fff5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

.error-type {
  color: #c0392b;
  margin-top: 0;
}

.error-message {
  color: #666;
  margin: 1rem 0;
  font-weight: 500;
}

.error-stack {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 6px;
  white-space: pre-wrap;
  font-size: 0.9em;
  color: #666;
}

.error-details {
  margin-top: 1rem;
  font-size: 0.9em;
  color: #888;
  display: flex;
  justify-content: space-between;
}

.placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2em;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.info-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-card h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.3em;
}

.info-card pre {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.info-card ul {
  padding-left: 1.2rem;
  line-height: 1.6;
  color: #444;
}

.try-catch {
  border-left: 4px solid #3498db;
}

.error-types {
  border-left: 4px solid #9b59b6;
}

.error-object {
  border-left: 4px solid #2ecc71;
}

.best-practice {
  border-left: 4px solid #f1c40f;
}

@media (max-width: 768px) {
  .control-group {
    flex-direction: column;
  }

  .error-button {
    width: 100%;
  }
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    border-left: 4px solid #e74c3c;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .error-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .error-types {
    list-style: none;
    padding: 0;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      code {
        background: #f3f3f3;
        padding: 2px 4px;
        border-radius: 3px;
      }
    }
  }
}

.usage-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.usage-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;

  h3 {
    margin: 0;
    padding: 1rem;
    background: #e9ecef;
  }

  pre {
    margin: 0;
    padding: 1rem;
  }
}

.vue-example {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .error-boundary {
    border: 2px solid #e74c3c;
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .error-panel {
    padding: 1.5rem;
    background: #fdecea;
    text-align: center;

    button {
      background: #e74c3c;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.notice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.notice-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .notice-icon {
    font-size: 2rem;
  }
}

pre code {
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .error-guide {
    padding: 1rem;
  }
}
</style>
