<template>
  <div class="shared-worker-container">
    <header class="header">
      <h1>Shared Worker 基本指南</h1>
      <p class="subtitle">跨页面共享的后台线程技术</p>
    </header>

    <div class="content-wrapper">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🧠</span> 什么是 Shared Worker？
          </h2>
          <p class="section-description">理解 Shared Worker 的核心概念</p>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>定义</h3>
            <p>Shared Worker 是一种特殊的 Web Worker，可以被多个浏览器上下文（如标签页、iframe 或窗口）共享的后台线程。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔗</div>
            <h3>与普通 Worker 的区别</h3>
            <div class="comparison">
              <div class="comparison-item">
                <h4>Dedicated Worker</h4>
                <ul>
                  <li>只能被创建它的页面使用</li>
                  <li>页面关闭时自动终止</li>
                  <li>直接通过脚本创建</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>Shared Worker</h4>
                <ul>
                  <li>可被同源下的多个页面使用</li>
                  <li>所有连接关闭后终止</li>
                  <li>通过端口(port)通信</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h3>主要特性</h3>
            <ul>
              <li>跨页面共享状态和数据</li>
              <li>减少资源重复使用</li>
              <li>独立的全局作用域</li>
              <li>通过消息传递进行通信</li>
              <li>支持持久化连接</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用方式 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🛠️</span> 如何使用 Shared Worker
          </h2>
          <p class="section-description">创建、通信和管理 Shared Worker</p>
        </div>

        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建 Shared Worker</h3>
              <p>在页面中实例化 Shared Worker</p>
              <div class="code-block">
                <pre><code>// 在页面中创建 Shared Worker
const worker = new SharedWorker('/path/to/shared-worker.js');

// 设置消息处理器
worker.port.onmessage = (event) => {
  console.log('来自 Shared Worker 的消息:', event.data);
};

// 启动端口连接
worker.port.start();</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>编写 Shared Worker 脚本</h3>
              <p>在 worker 文件中处理连接和消息</p>
              <div class="code-block">
                <pre><code>// shared-worker.js
const ports = new Set();

self.onconnect = (event) => {
  // 获取连接端口
  const port = event.ports[0];
  ports.add(port);

  // 设置消息处理器
  port.onmessage = (e) => {
    // 广播消息给所有连接的端口
    for (const p of ports) {
      p.postMessage(`广播消息: ${e.data}`);
    }
  };

  // 通知新连接
  port.postMessage('已连接到 Shared Worker');
};</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>与 Shared Worker 通信</h3>
              <p>发送和接收消息</p>
              <div class="code-block">
                <pre><code>// 发送消息到 Shared Worker
document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  worker.port.postMessage(message);
});

// 接收来自 Shared Worker 的消息
worker.port.onmessage = (event) => {
  const messages = document.getElementById('messages');
  const li = document.createElement('li');
  li.textContent = event.data;
  messages.appendChild(li);
};</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>关闭连接</h3>
              <p>在不需要时关闭连接</p>
              <div class="code-block">
                <pre><code>// 关闭连接
function closeWorkerConnection() {
  // 发送关闭消息
  worker.port.postMessage({ type: 'CLOSE' });

  // 关闭端口
  worker.port.close();

  console.log('已断开 Shared Worker 连接');
}

// 在 Shared Worker 中处理关闭
port.onmessage = (e) => {
  if (e.data.type === 'CLOSE') {
    ports.delete(port);
    port.close();
  }
};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整示例 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">💻</span> Vue3 完整示例
          </h2>
          <p class="section-description">在 Vue3 应用中使用 Shared Worker</p>
        </div>

        <div class="vue-example">
          <div class="example-description">
            <p>实现一个跨标签页的实时消息系统：</p>
            <ol>
              <li>创建 Shared Worker 处理消息</li>
              <li>多个标签页连接到同一个 Shared Worker</li>
              <li>一个标签页发送消息，所有标签页都能接收</li>
            </ol>
          </div>

          <div class="code-columns">
            <div class="code-column">
              <h3>Shared Worker 实现 (shared-worker.js)</h3>
              <div class="code-block">
                <pre><code>// 存储所有连接的端口
const connectedPorts = new Set();

// 连接事件处理
self.onconnect = (event) => {
  const port = event.ports[0];
  connectedPorts.add(port);

  port.onmessage = (e) => {
    // 处理不同类型的消息
    switch (e.data.type) {
      case 'MESSAGE':
        broadcastMessage(e.data.message);
        break;
      case 'CLOSE':
        closeConnection(port);
        break;
    }
  };

  // 通知新连接
  port.postMessage({
    type: 'CONNECTED',
    message: '成功连接到 Shared Worker'
  });
};

// 广播消息给所有客户端
function broadcastMessage(message) {
  for (const port of connectedPorts) {
    port.postMessage({
      type: 'BROADCAST',
      message: message
    });
  }
}

// 关闭连接
function closeConnection(port) {
  port.postMessage({
    type: 'DISCONNECTED',
    message: '连接已关闭'
  });
  connectedPorts.delete(port);
  port.close();
}</code></pre>
              </div>
            </div>

            <div class="code-column">
              <h3>Vue 组件 (SharedWorkerDemo.vue)</h3>
              <div class="code-block">
                <pre><code>&lt;template&gt;
  &lt;div class="demo-container"&gt;
    &lt;h3&gt;Shared Worker 演示 (标签页 &#123;&#123; tabId &#125;&#125;)&lt;/h3&gt;
    &lt;div class="message-box"&gt;
      &lt;input v-model="message" placeholder="输入消息" /&gt;
      &lt;button @click="sendMessage"&gt;发送&lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="messages"&gt;
      &lt;div v-for="(msg, index) in messages" :key="index"&gt;
        &#123;&#123; msg &#125;&#125;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted, onBeforeUnmount } from 'vue';

const tabId = ref(Math.floor(Math.random() * 1000));
const message = ref('');
const messages = ref&lt;string[]&gt;([]);
let worker: SharedWorker | null = null;

onMounted(() => {
  // 创建 Shared Worker
  worker = new SharedWorker(new URL('./shared-worker.js', import.meta.url), {
    name: 'message-worker'
  });

  // 设置消息处理器
  worker.port.onmessage = (event) => {
    const data = event.data;
    switch (data.type) {
      case 'BROADCAST':
        messages.value.push(`[标签页 ${tabId.value}] 收到: ${data.message}`);
        break;
      case 'CONNECTED':
        messages.value.push(data.message);
        break;
    }
  };

  // 启动端口
  worker.port.start();
});

onBeforeUnmount(() => {
  if (worker) {
    // 通知 worker 关闭连接
    worker.port.postMessage({ type: 'CLOSE' });
    worker.port.close();
  }
});

function sendMessage() {
  if (worker && message.value.trim()) {
    worker.port.postMessage({
      type: 'MESSAGE',
      message: `标签页 ${tabId.value}: ${message.value}`
    });
    message.value = '';
  }
}
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="demo-preview">
            <div class="preview-header">示例效果预览</div>
            <div class="preview-content">
              <div class="tab-view">
                <div class="tab">标签页 1</div>
                <div class="tab active">标签页 2</div>
                <div class="tab">标签页 3</div>
              </div>
              <div class="message-log">
                <div class="log-entry">[标签页 2] 收到: 标签页 1: 大家好！</div>
                <div class="log-entry">[标签页 2] 收到: 标签页 3: 我在另一个标签页</div>
                <div class="log-entry">[标签页 2] 发送: 这是来自标签页 2 的消息</div>
              </div>
              <div class="input-area">
                <input type="text" placeholder="输入消息..." />
                <button>发送</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🚀</span> Shared Worker 使用场景
          </h2>
          <p class="section-description">适合使用 Shared Worker 的应用场景</p>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🔔</div>
            <h3>跨页面通知系统</h3>
            <p>在一个标签页中操作，通知其他标签页更新状态</p>
            <ul>
              <li>用户登录/登出状态同步</li>
              <li>购物车更新通知</li>
              <li>实时数据更新广播</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📡</div>
            <h3>共享网络连接</h3>
            <p>多个页面共享一个 WebSocket 连接</p>
            <ul>
              <li>减少服务器连接数</li>
              <li>统一管理连接状态</li>
              <li>避免重复建立连接</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>后台数据处理</h3>
            <p>在后台线程处理计算密集型任务</p>
            <ul>
              <li>大数据集处理</li>
              <li>复杂计算任务</li>
              <li>图像/视频处理</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>共享缓存</h3>
            <p>在多个页面间共享缓存数据</p>
            <ul>
              <li>API响应缓存</li>
              <li>用户偏好设置</li>
              <li>应用状态持久化</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">⚠️</span> 注意事项
          </h2>
          <p class="section-description">使用 Shared Worker 时的重要考量</p>
        </div>

        <div class="considerations">
          <div class="consideration-item">
            <div class="consideration-icon">🌐</div>
            <div class="consideration-content">
              <h3>浏览器兼容性</h3>
              <p>Shared Worker 在现代浏览器中得到良好支持：</p>
              <ul>
                <li>Chrome: 支持</li>
                <li>Firefox: 支持</li>
                <li>Safari: 支持（≥16.4）</li>
                <li>Edge: 支持</li>
                <li>Internet Explorer: 不支持</li>
              </ul>
              <p>对于不支持的浏览器，需要提供回退方案或使用其他技术替代。</p>
            </div>
          </div>

          <div class="consideration-item">
            <div class="consideration-icon">🔒</div>
            <div class="consideration-content">
              <h3>安全限制</h3>
              <ul>
                <li>Shared Worker 必须通过 HTTPS 加载（localhost 除外）</li>
                <li>遵循同源策略（Same-Origin Policy）</li>
                <li>不能直接访问 DOM</li>
                <li>通过 postMessage 通信，数据会被结构化克隆算法处理</li>
              </ul>
            </div>
          </div>

          <div class="consideration-item">
            <div class="consideration-icon">⚙️</div>
            <div class="consideration-content">
              <h3>最佳实践</h3>
              <ul>
                <li>使用端口(port)的 start() 方法显式启动连接</li>
                <li>在页面卸载时关闭连接</li>
                <li>使用结构化数据（JSON）进行通信</li>
                <li>实现错误处理机制</li>
                <li>避免传输大型对象（使用 Transferable 对象优化）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="key-points">
        <h3>Shared Worker 核心要点：</h3>
        <ul>
          <li>允许多个浏览器上下文共享一个后台线程</li>
          <li>通过端口(port)进行双向通信</li>
          <li>适合跨页面状态同步和共享资源</li>
          <li>需要显式管理连接生命周期</li>
          <li>不能直接访问 DOM，但可以执行计算任务</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker" target="_blank">MDN 文档</a>
        <a href="https://web.dev/workers-overview/" target="_blank">Web Workers 指南</a>
        <a href="https://caniuse.com/sharedworkers" target="_blank">浏览器兼容性</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.shared-worker-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 50px 20px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray-light);
}

.section-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--secondary-color);

  .icon {
    font-size: 1.5em;
  }
}

.section-description {
  font-size: 1.1rem;
  color: var(--gray-medium);
  margin-top: 5px;
}

// 概念部分
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-color);
  }

  .concept-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p,
  ul {
    color: #495057;
    font-size: 0.95rem;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 15px;

  .comparison-item {
    background: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--primary-color);
      text-align: center;
    }

    ul {
      padding-left: 20px;

      li {
        font-size: 0.9rem;
      }
    }
  }
}

// 使用步骤
.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step {
  display: flex;
  gap: 20px;

  .step-number {
    min-width: 40px;
    height: 40px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 5px;
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    p {
      margin-bottom: 15px;
      color: #495057;
    }
  }
}

.code-block {
  background: #f5f7ff;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-top: 15px;
  border: 1px solid var(--gray-light);

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.5;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: var(--secondary-color);
    }
  }
}

// Vue 示例部分
.vue-example {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.example-description {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 20px;

  p {
    margin-bottom: 15px;
    font-weight: 500;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 10px;
    }
  }
}

.code-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.code-column {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--primary-color);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-light);
  }
}

.demo-preview {
  background: var(--light-color);
  border-radius: var(--border-radius);
  overflow: hidden;

  .preview-header {
    background: var(--primary-color);
    color: white;
    padding: 12px 20px;
    font-weight: 500;
  }

  .preview-content {
    padding: 20px;
  }
}

.tab-view {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  .tab {
    padding: 8px 15px;
    background: var(--gray-light);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;

    &.active {
      background: var(--primary-color);
      color: white;
    }
  }
}

.message-log {
  background: white;
  border-radius: var(--border-radius);
  padding: 15px;
  min-height: 200px;
  margin-bottom: 15px;
  border: 1px solid var(--gray-light);

  .log-entry {
    padding: 8px 0;
    border-bottom: 1px solid var(--gray-light);
    font-size: 0.9rem;

    &:last-child {
      border-bottom: none;
    }
  }
}

.input-area {
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid var(--gray-light);
    border-radius: var(--border-radius);
  }

  button {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 0 20px;
    cursor: pointer;
  }
}

// 使用场景部分
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.scenario-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .scenario-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p {
    text-align: center;
    margin-bottom: 15px;
    color: #495057;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

// 注意事项部分
.considerations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.consideration-item {
  display: flex;
  gap: 15px;
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 20px;

  .consideration-icon {
    font-size: 1.8rem;
    min-width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

// 页脚
.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);

  .key-points {
    background: var(--primary-light);
    border-radius: var(--border-radius);
    padding: 25px;
    margin-bottom: 25px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        font-weight: 500;
      }
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 8px 15px;
      border-radius: 30px;
      border: 1px solid var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
        text-decoration: none;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .step {
    flex-direction: column;

    .step-number {
      align-self: flex-start;
    }
  }
}
</style>
