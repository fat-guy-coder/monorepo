<template>
  <div class="sse-container">
    <header class="header">
      <div class="logo-container">
        <div class="sse-logo">
          <div class="server-icon">💻</div>
          <div class="arrow">➡️</div>
          <div class="client-icon">🌐</div>
          <div class="event-pulse"></div>
        </div>
        <h1>Server-Sent Events (SSE)</h1>
      </div>
      <p class="subtitle">单向服务器到客户端实时通信技术</p>
    </header>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>核心概念</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <h3>什么是SSE？</h3>
            <p>SSE是一种基于HTTP的服务器推送技术，允许服务器主动向客户端发送更新，而无需客户端反复请求。</p>
          </div>
          <div class="concept-card">
            <h3>工作原理</h3>
            <p>客户端通过EventSource API建立连接，服务器保持HTTP连接打开并通过文本流发送事件。</p>
          </div>
          <div class="concept-card">
            <h3>与WebSocket对比</h3>
            <p>SSE是单向通信（服务器→客户端），而WebSocket是双向的。SSE更简单，基于HTTP，自动重连。</p>
          </div>
        </div>

        <div class="comparison-table">
          <div class="table-row header">
            <div class="table-cell">特性</div>
            <div class="table-cell">SSE</div>
            <div class="table-cell">WebSocket</div>
          </div>
          <div class="table-row">
            <div class="table-cell">通信方向</div>
            <div class="table-cell">单向（服务器→客户端）</div>
            <div class="table-cell">双向</div>
          </div>
          <div class="table-row">
            <div class="table-cell">协议</div>
            <div class="table-cell">HTTP</div>
            <div class="table-cell">WebSocket</div>
          </div>
          <div class="table-row">
            <div class="table-cell">数据格式</div>
            <div class="table-cell">文本（UTF-8）</div>
            <div class="table-cell">二进制或文本</div>
          </div>
          <div class="table-row">
            <div class="table-cell">自动重连</div>
            <div class="table-cell">✅ 支持</div>
            <div class="table-cell">❌ 需手动实现</div>
          </div>
          <div class="table-row">
            <div class="table-cell">复杂度</div>
            <div class="table-cell">简单</div>
            <div class="table-cell">中等</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">💻</div>
        <h2>客户端实现</h2>
      </div>
      <div class="section-content">
        <div class="implementation">
          <div class="code-block">
            <div class="code-header">Vue3中使用SSE</div>
            <pre><code>import { ref, onMounted, onUnmounted } from 'vue';

// 响应式数据
const messages = ref&lt;string[]&gt;([]);
const eventSource = ref&lt;EventSource | null&gt;(null);
const connectionStatus = ref('disconnected');

// 建立连接
const connectSSE = () => {
  // 创建EventSource实例
  eventSource.value = new EventSource('/api/sse');

  // 监听消息事件
  eventSource.value.onmessage = (event) => {
    messages.value.push(event.data);
  };

  // 监听自定义事件
  eventSource.value.addEventListener('statusUpdate', (event) => {
    console.log('状态更新:', event.data);
  });

  // 错误处理
  eventSource.value.onerror = () => {
    connectionStatus.value = 'error';
    // 自动重连是SSE的内置特性
  };

  connectionStatus.value = 'connected';
};

// 关闭连接
const disconnectSSE = () => {
  eventSource.value?.close();
  connectionStatus.value = 'disconnected';
};

onMounted(() => {
  connectSSE();
});

onUnmounted(() => {
  disconnectSSE();
});</code></pre>
          </div>

          <div class="demo-container">
            <div class="demo-header">实时消息演示</div>
            <div class="demo-content">
              <div class="status-indicator">
                <div :class="['status-dot', connectionStatus]"></div>
                <span>{{ statusText }}</span>
              </div>

              <div class="message-list">
                <div v-for="(msg, index) in demoMessages" :key="index" class="message">
                  {{ msg }}
                </div>
              </div>

              <div class="demo-controls">
                <button @click="startDemo" :disabled="isConnected">开始演示</button>
                <button @click="stopDemo" :disabled="!isConnected">停止演示</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🛠️</div>
        <h2>服务器端实现</h2>
      </div>
      <div class="section-content">
        <div class="server-examples">
          <div class="example-card">
            <h3>Node.js (Express)</h3>
            <div class="code-block">
              <pre><code>// Express服务器示例
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/sse', (req, res) => {
  // 设置SSE所需的响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 发送初始消息
  res.write('data: 连接已建立\n\n');

  // 定期发送消息
  const intervalId = setInterval(() => {
    const data = `服务器时间: ${new Date().toLocaleTimeString()}`;
    res.write(`data: ${data}\n\n`);
  }, 2000);

  // 客户端断开连接时清理
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE服务器运行在 http://localhost:${PORT}`);
});</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>数据格式规范</h3>
            <div class="code-block">
              <pre><code>// 基本消息格式
data: 这是一条普通消息\n\n

// 多行消息
data: 第一行内容\n
data: 第二行内容\n\n

// 命名事件
event: userUpdate\n
data: {"id": 123, "name": "张三"}\n\n

// 重连时间（毫秒）
retry: 5000\n\n

// 消息ID（用于断线重连）
id: 12345\n
data: 带ID的消息\n\n</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>使用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">📈</div>
            <div>
              <h3>实时数据更新</h3>
              <p>股票行情、加密货币价格、实时分析仪表板</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <div>
              <h3>通知系统</h3>
              <p>新消息提醒、系统通知、用户活动提醒</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📰</div>
            <div>
              <h3>实时新闻推送</h3>
              <p>突发新闻、体育赛事比分、博客更新</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <div>
              <h3>状态监控</h3>
              <p>服务器状态、任务进度、实时日志</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🌍</div>
            <div>
              <h3>实时协作</h3>
              <p>文档编辑指示器、团队活动流</p>
            </div>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <div>
              <h3>实时分析</h3>
              <p>网站访问统计、用户行为分析</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section pros-cons">
      <div class="section-header">
        <div class="section-icon">⚖️</div>
        <h2>优点与限制</h2>
      </div>
      <div class="section-content">
        <div class="comparison-columns">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>简单易用，基于标准HTTP协议</li>
              <li>自动处理连接重连</li>
              <li>轻量级，适合文本数据传输</li>
              <li>内置消息事件支持</li>
              <li>良好的浏览器支持（除IE）</li>
              <li>不需要额外协议或端口</li>
            </ul>
          </div>
          <div class="cons">
            <h3>限制</h3>
            <ul>
              <li>仅支持文本数据（UTF-8编码）</li>
              <li>单向通信（服务器→客户端）</li>
              <li>HTTP/1.1有最多6个并发连接限制</li>
              <li>不支持IE浏览器</li>
              <li>长连接可能消耗服务器资源</li>
              <li>需要特殊处理跨域请求（CORS）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>SSE是构建实时应用的强大工具，特别适用于服务器向客户端推送更新的场景。它提供了一种简单、高效的解决方案，无需复杂的协议或基础设施。</p>
      <div class="resources">
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" target="_blank">MDN文档</a>
        <a href="https://html.spec.whatwg.org/multipage/server-sent-events.html" target="_blank">规范标准</a>
        <a href="https://github.com/EventSource/eventsource" target="_blank">Node.js库</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 演示状态
const demoMessages = ref<string[]>([]);
const connectionStatus = ref<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
let demoInterval: number | null = null;

// 计算状态文本
const statusText = computed(() => {
  switch (connectionStatus.value) {
    case 'disconnected': return '未连接';
    case 'connecting': return '连接中...';
    case 'connected': return '已连接';
    case 'error': return '连接错误';
    default: return '未知状态';
  }
});

// 检查是否已连接
const isConnected = computed(() => connectionStatus.value === 'connected');

// 开始演示
const startDemo = () => {
  connectionStatus.value = 'connecting';
  demoMessages.value = [];

  // 模拟连接延迟
  setTimeout(() => {
    connectionStatus.value = 'connected';

    // 添加初始消息
    demoMessages.value.push('SSE连接已建立');
    demoMessages.value.push('开始接收实时更新...');

    // 模拟服务器消息
    demoInterval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const messages = [
        `新消息: ${time}`,
        `用户活动: 用户${Math.floor(Math.random() * 1000)}登录`,
        `系统状态: CPU使用率 ${Math.floor(Math.random() * 50) + 20}%`,
        `更新: 版本${(Math.random() * 0.1 + 1.0).toFixed(2)}发布`,
        `通知: 您有${Math.floor(Math.random() * 5)}条新消息`
      ];

      demoMessages.value.push(messages[Math.floor(Math.random() * messages.length)]);

      // 限制消息数量
      if (demoMessages.value.length > 15) {
        demoMessages.value.shift();
      }
    }, 1500) as unknown as number;
  }, 800);
};

// 停止演示
const stopDemo = () => {
  connectionStatus.value = 'disconnected';
  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
  }
  demoMessages.value.push('连接已关闭');
};

// 组件卸载时清理
onUnmounted(() => {
  stopDemo();
});
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3b82f6;
@secondary-color: #2563eb;
@accent-color: #60a5fa;
@success-color: #10b981;
@error-color: #ef4444;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@code-bg: #1e293b;
@header-bg: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%);

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.sse-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-color;
  background-color: @background;
}

.header {
  background: @header-bg;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  .box-shadow();

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .sse-logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;

    .server-icon,
    .client-icon {
      font-size: 3rem;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 16px;
      .box-shadow();
    }

    .arrow {
      font-size: 2rem;
      color: @text-secondary;
    }

    .event-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: @primary-color;
      border-radius: 50%;
      opacity: 0;
      animation: pulse 2s infinite;
    }
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    color: @primary-color;
  }

  .subtitle {
    font-size: 1.25rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-section {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(90deg, @primary-color 0%, @secondary-color 100%);

    .section-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .section-content {
    padding: 2rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.concept-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @primary-color;

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.comparison-table {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;
  margin-top: 1.5rem;

  .table-row {
    display: flex;

    &:nth-child(even) {
      background-color: fade(@primary-color, 3%);
    }

    &.header {
      background-color: @primary-color;

      .table-cell {
        color: white;
        font-weight: 600;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;

    &:first-child {
      flex: 0 0 150px;
      font-weight: 500;
    }
  }
}

.implementation {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  .code-block {
    flex: 1;
  }

  .demo-container {
    flex: 1;
    min-width: 300px;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 10px;
  overflow: hidden;
  .box-shadow();

  .code-header {
    background: darken(@code-bg, 5%);
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    color: #94a3b8;
    font-weight: 500;
  }

  pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      .comment {
        color: #94a3b8;
      }

      .keyword {
        color: #f472b6;
      }

      .function {
        color: #60a5fa;
      }

      .string {
        color: #34d399;
      }

      .variable {
        color: #fbbf24;
      }
    }
  }
}

.demo-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow();

  .demo-header {
    background: linear-gradient(90deg, @primary-color 0%, @secondary-color 100%);
    padding: 0.75rem 1.25rem;
    color: white;
    font-weight: 500;
  }

  .demo-content {
    padding: 1.5rem;
  }
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &.disconnected {
      background: @text-secondary;
    }

    &.connecting {
      background: #f59e0b;
      animation: pulse 1.5s infinite;
    }

    &.connected {
      background: @success-color;
    }

    &.error {
      background: @error-color;
    }
  }
}

.message-list {
  height: 300px;
  overflow-y: auto;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: fade(@primary-color, 2%);

  .message {
    padding: 0.75rem;
    border-bottom: 1px solid @border-color;
    font-size: 0.95rem;

    &:last-child {
      border-bottom: none;
    }

    &:nth-child(odd) {
      background: fade(@primary-color, 5%);
    }
  }
}

.demo-controls {
  display: flex;
  gap: 1rem;

  button {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    background: @primary-color;
    color: white;
    font-weight: 500;
    cursor: pointer;
    .transition();

    &:hover:not(:disabled) {
      background: darken(@primary-color, 10%);
    }

    &:disabled {
      background: @text-secondary;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

.server-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow();

  h3 {
    background: fade(@primary-color, 5%);
    padding: 1rem 1.5rem;
    margin: 0;
    color: @primary-color;
    border-bottom: 1px solid @border-color;
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  border-left: 3px solid @primary-color;

  .scenario-icon {
    font-size: 1.8rem;
    flex: 0 0 40px;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.pros-cons {
  .section-content {
    padding: 2rem;
  }
}

.comparison-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  .pros,
  .cons {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    .box-shadow();
  }

  .pros {
    border-top: 4px solid @success-color;
  }

  .cons {
    border-top: 4px solid @error-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 0.75rem;
    }
  }

  .pros h3::before {
    background: @success-color;
  }

  .cons h3::before {
    background: @error-color;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
  }

  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  color: @text-secondary;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;

  .resources {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      .transition();

      &:hover {
        color: darken(@primary-color, 15%);
        text-decoration: underline;
      }
    }
  }
}

// 动画
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  70% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

// 响应式设计
@media (max-width: 900px) {
  .implementation {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .sse-container {
    padding: 1.25rem;
  }

  .header {
    padding: 2rem 1rem;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content-section .section-content {
    padding: 1.5rem;
  }
}
</style>
