<template>
  <div class="websocket-doc">
    <h1 class="title">WebSocket 技术基本介绍</h1>

    <section class="section">
      <h2 class="section-title">1. WebSocket 概述</h2>
      <p class="content">
        WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。它使得客户端和服务器之间的数据交换变得更加简单，
        允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，
        两者之间就直接可以创建持久性的连接，并进行双向数据传输。
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">2. WebSocket 协议</h2>
      <div class="content">
        <h3 class="sub-title">协议特点</h3>
        <ul class="feature-list">
          <li>建立在 TCP 协议之上</li>
          <li>与 HTTP 协议有着良好的兼容性，默认端口也是80和443</li>
          <li>数据格式比较轻量，性能开销小，通信高效</li>
          <li>可以发送文本，也可以发送二进制数据</li>
          <li>没有同源限制，客户端可以与任意服务器通信</li>
          <li>协议标识符是ws（非加密）或wss（加密）</li>
        </ul>

        <h3 class="sub-title">握手过程</h3>
        <pre class="code-block">GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13</pre>

        <p>服务器响应：</p>
        <pre class="code-block">HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat</pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">3. Vue 中使用 WebSocket</h2>
      <div class="content">
        <h3 class="sub-title">示例代码</h3>
        <pre class="code-block">{{ exampleCode }}</pre>

        <div class="demo-area">
          <h4>连接状态: <span :class="statusClass">{{ connectionStatus }}</span></h4>
          <div class="message-box">
            <div v-for="(msg, index) in messages" :key="index" class="message">
              {{ msg }}
            </div>
          </div>
          <div class="control-group">
            <input v-model="messageInput" @keyup.enter="sendMessage" placeholder="输入消息并回车发送" class="input-field" />
            <button @click="toggleConnection"
              :class="['btn', connectionStatus === '已连接' ? 'btn-danger' : 'btn-success']">
              {{ connectionStatus === '已连接' ? '断开连接' : '建立连接' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">4. 使用场景</h2>
      <div class="content">
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>实时聊天应用</h3>
            <p>即时通讯、在线客服等需要低延迟双向通信的场景</p>
          </div>
          <div class="scenario-card">
            <h3>实时数据监控</h3>
            <p>股票行情、实时日志、物联网设备监控等</p>
          </div>
          <div class="scenario-card">
            <h3>多人在线游戏</h3>
            <p>需要快速同步玩家状态的在线游戏</p>
          </div>
          <div class="scenario-card">
            <h3>协同编辑</h3>
            <p>多人同时编辑文档、表格等协作工具</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">5. 注意事项</h2>
      <div class="content">
        <ul class="note-list">
          <li>兼容性问题：不是所有浏览器都支持 WebSocket，需要考虑降级方案</li>
          <li>连接稳定性：网络波动可能导致连接断开，需要实现自动重连机制</li>
          <li>心跳机制：长时间不通信可能导致连接被关闭，需要定期发送心跳包</li>
          <li>数据格式：需要约定好客户端和服务端之间的数据格式（如 JSON）</li>
          <li>性能考虑：大量连接会消耗服务器资源，需要合理设计架构</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">6. 安全问题及解决方案</h2>
      <div class="content">
        <div class="security-grid">
          <div class="security-card danger">
            <h3>跨站劫持 (CSWSH)</h3>
            <p>攻击者通过跨站请求伪造 WebSocket 连接</p>
            <div class="solution">
              <strong>解决方案：</strong>验证 Origin 头部，使用 CSRF 令牌
            </div>
          </div>
          <div class="security-card warning">
            <h3>数据泄露</h3>
            <p>敏感数据通过未加密的 WebSocket 传输</p>
            <div class="solution">
              <strong>解决方案：</strong>始终使用 wss 协议（WebSocket Secure）
            </div>
          </div>
          <div class="security-card info">
            <h3>拒绝服务</h3>
            <p>大量连接耗尽服务器资源</p>
            <div class="solution">
              <strong>解决方案：</strong>实施连接限制和速率控制
            </div>
          </div>
          <div class="security-card success">
            <h3>注入攻击</h3>
            <p>恶意数据注入 WebSocket 消息</p>
            <div class="solution">
              <strong>解决方案：</strong>严格验证和清理所有输入数据
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue'

// 示例代码
const exampleCode = `// Vue 3 + TypeScript WebSocket 示例
import { ref, onUnmounted } from 'vue'

export default {
  setup() {
    const socket = ref<WebSocket | null>(null)
    const messages = ref<string[]>([])
    const messageInput = ref('')
    const connectionStatus = ref('未连接')

    // 初始化连接
    const initWebSocket = () => {
      socket.value = new WebSocket('wss://echo.websocket.org')

      socket.value.onopen = () => {
        connectionStatus.value = '已连接'
        messages.value.push('连接已建立')
      }

      socket.value.onmessage = (event) => {
        messages.value.push(\`收到消息: \${event.data}\`)
      }

      socket.value.onclose = () => {
        connectionStatus.value = '已断开'
        messages.value.push('连接已关闭')
      }
    }

    // 发送消息
    const sendMessage = () => {
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send(messageInput.value)
        messages.value.push(\`发送消息: \${messageInput.value}\`)
        messageInput.value = ''
      }
    }

    // 关闭连接
    const closeConnection = () => {
      socket.value?.close()
    }

    onUnmounted(() => {
      closeConnection()
    })

    return { messages, messageInput, connectionStatus, sendMessage, initWebSocket, closeConnection }
  }
}`

// 演示区域状态
const socket = ref<WebSocket | null>(null)
const messages = ref<string[]>([])
const messageInput = ref('')
const connectionStatus = ref('未连接')

// 初始化连接
const initWebSocket = () => {
  socket.value = new WebSocket('wss://echo.websocket.org')

  socket.value.onopen = () => {
    connectionStatus.value = '已连接'
    messages.value.push('连接已建立')
  }

  socket.value.onmessage = (event) => {
    messages.value.push(`收到消息: ${event.data}`)
  }

  socket.value.onerror = () => {
    connectionStatus.value = '连接错误'
    messages.value.push('连接发生错误')
  }

  socket.value.onclose = () => {
    connectionStatus.value = '已断开'
    messages.value.push('连接已关闭')
  }
}

// 发送消息
const sendMessage = () => {
  if (socket.value?.readyState === WebSocket.OPEN && messageInput.value.trim()) {
    socket.value.send(messageInput.value)
    messages.value.push(`发送消息: ${messageInput.value}`)
    messageInput.value = ''
  }
}

// 切换连接状态
const toggleConnection = () => {
  if (connectionStatus.value === '已连接') {
    socket.value?.close()
  } else {
    messages.value = []
    initWebSocket()
  }
}

// 计算状态类
const statusClass = computed(() => {
  return {
    'status-connected': connectionStatus.value === '已连接',
    'status-disconnected': connectionStatus.value !== '已连接'
  }
})

// 组件卸载时关闭连接
onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>

<style lang="less" scoped>
.websocket-doc {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;

  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eee;
  }

  .section {
    margin-bottom: 40px;
    background: #fff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .section-title {
      color: #3498db;
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .sub-title {
      color: #2c3e50;
      margin: 20px 0 10px;
    }

    .content {
      color: #555;
    }
  }

  .feature-list,
  .note-list {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }

  .code-block {
    background: #f5f7fa;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    margin: 15px 0;
    border-left: 4px solid #3498db;
  }

  .demo-area {
    margin-top: 30px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;

    .status-connected {
      color: #27ae60;
      font-weight: bold;
    }

    .status-disconnected {
      color: #e74c3c;
      font-weight: bold;
    }

    .message-box {
      height: 200px;
      overflow-y: auto;
      border: 1px solid #ddd;
      padding: 10px;
      margin: 15px 0;
      background: #fff;
      border-radius: 4px;

      .message {
        padding: 5px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .control-group {
      display: flex;
      gap: 10px;

      .input-field {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
        transition: border 0.3s;

        &:focus {
          border-color: #3498db;
        }
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;

        &-success {
          background: #27ae60;
          color: white;

          &:hover {
            background: #2ecc71;
          }
        }

        &-danger {
          background: #e74c3c;
          color: white;

          &:hover {
            background: #c0392b;
          }
        }
      }
    }
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .scenario-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #3498db;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      p {
        color: #7f8c8d;
        font-size: 0.9em;
      }
    }
  }

  .security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .security-card {
      padding: 15px;
      border-radius: 6px;
      color: white;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        margin-top: 0;
      }

      .solution {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.3);
      }

      &.danger {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
      }

      &.warning {
        background: linear-gradient(135deg, #f39c12, #d35400);
      }

      &.info {
        background: linear-gradient(135deg, #3498db, #2980b9);
      }

      &.success {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
      }
    }
  }
}

@media (max-width: 768px) {
  .websocket-doc {
    padding: 10px;

    .section {
      padding: 15px;
    }

    .scenario-grid,
    .security-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
