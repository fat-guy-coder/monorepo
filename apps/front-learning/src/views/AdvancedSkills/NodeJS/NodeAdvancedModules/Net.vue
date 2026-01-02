<template>
  <div class="net-container">
    <header class="header">
      <div class="logo-container">
        <div class="node-logo">
          <div class="hexagon"></div>
          <div class="inner-hexagon"></div>
          <div class="node-text">JS</div>
        </div>
        <div class="title-container">
          <h1>Node.js Net 模块基本指南</h1>
          <p class="subtitle">构建高性能网络应用的基础工具</p>
        </div>
      </div>
      <div class="network-icon">🌐</div>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <div class="section-title">核心内容</div>
        <ul>
          <li
            v-for="item in navItems"
            :key="item.id"
            :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id"
          >
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 概念与作用 -->
        <section v-show="activeSection === 'concept'" class="section">
          <div class="section-header">
            <h2>Net 模块概念与作用</h2>
            <div class="tag">网络基础</div>
          </div>

          <div class="card">
            <div class="concept-grid">
              <div class="concept-card">
                <div class="concept-icon">📦</div>
                <h3>什么是 Net 模块？</h3>
                <p>
                  Net 模块是 Node.js 的核心模块，提供了基于流的 TCP 网络通信能力，用于创建 TCP
                  服务器和客户端。
                </p>
              </div>
              <div class="concept-card">
                <div class="concept-icon">⚙️</div>
                <h3>核心功能</h3>
                <p>提供创建 TCP 服务器和客户端的能力，处理网络套接字通信，支持全双工数据流。</p>
              </div>
              <div class="concept-card">
                <div class="concept-icon">🔌</div>
                <h3>与 HTTP 模块的关系</h3>
                <p>
                  HTTP 模块基于 Net 模块构建，在 TCP 基础上实现了 HTTP 协议。Net
                  模块更底层，提供更基础的控制。
                </p>
              </div>
            </div>

            <div class="tcp-process">
              <h3>TCP 通信过程</h3>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>创建服务器</h4>
                    <p>使用 net.createServer() 创建 TCP 服务器</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>监听端口</h4>
                    <p>服务器监听指定端口等待客户端连接</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>客户端连接</h4>
                    <p>客户端使用 net.connect() 连接到服务器</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>数据交换</h4>
                    <p>服务器和客户端通过 Socket 对象进行双向数据通信</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h4>关闭连接</h4>
                    <p>任意一方调用 socket.end() 关闭连接</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 核心 API -->
        <section v-show="activeSection === 'api'" class="section">
          <div class="section-header">
            <h2>Net 模块核心 API</h2>
            <div class="tag">编程接口</div>
          </div>

          <div class="card">
            <div class="api-categories">
              <div class="category">
                <h3>服务器 API</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">net.createServer()</div>
                    <div class="api-desc">创建 TCP 服务器</div>
                    <div class="api-code">
                      <pre><code>const server = net.createServer((socket) => {
  // 处理新连接
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">server.listen()</div>
                    <div class="api-desc">启动服务器监听端口</div>
                    <div class="api-code">
                      <pre><code>server.listen(3000, () => {
  console.log('服务器在 3000 端口监听');
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">server.close()</div>
                    <div class="api-desc">停止服务器接受新连接</div>
                  </div>
                </div>
              </div>

              <div class="category">
                <h3>客户端 API</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">net.connect() / net.createConnection()</div>
                    <div class="api-desc">创建到服务器的连接</div>
                    <div class="api-code">
                      <pre><code>const client = net.connect({
  port: 3000
}, () => {
  console.log('已连接到服务器');
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">socket.write()</div>
                    <div class="api-desc">向连接写入数据</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">socket.end()</div>
                    <div class="api-desc">优雅地关闭连接</div>
                  </div>
                </div>
              </div>

              <div class="category">
                <h3>Socket 事件</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">'data'</div>
                    <div class="api-desc">接收到数据时触发</div>
                    <div class="api-code">
                      <pre><code>socket.on('data', (data) => {
  console.log('收到数据:', data.toString());
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">'connect'</div>
                    <div class="api-desc">成功建立连接时触发</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">'end'</div>
                    <div class="api-desc">连接另一端发送 FIN 包时触发</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">'close'</div>
                    <div class="api-desc">连接完全关闭时触发</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">'error'</div>
                    <div class="api-desc">发生错误时触发</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section v-show="activeSection === 'usecases'" class="section">
          <div class="section-header">
            <h2>Net 模块使用场景</h2>
            <div class="tag">实际应用</div>
          </div>

          <div class="card">
            <div class="use-cases">
              <div class="use-case">
                <div class="case-icon">💬</div>
                <div class="case-content">
                  <h3>实时聊天应用</h3>
                  <p>构建高性能、低延迟的聊天服务器</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">特点</div>
                      <div class="detail-value">低延迟、双向通信</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">优势</div>
                      <div class="detail-value">比 HTTP 更高效</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">🎮</div>
                <div class="case-content">
                  <h3>多人游戏服务器</h3>
                  <p>处理实时游戏状态同步和玩家通信</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">特点</div>
                      <div class="detail-value">高频率数据更新</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">优势</div>
                      <div class="detail-value">低延迟数据传输</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">📡</div>
                <div class="case-content">
                  <h3>自定义协议实现</h3>
                  <p>开发特定应用层协议的网络服务</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">特点</div>
                      <div class="detail-value">完全控制数据格式</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">优势</div>
                      <div class="detail-value">优化特定场景性能</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">📊</div>
                <div class="case-content">
                  <h3>实时数据监控</h3>
                  <p>传输实时传感器数据或监控指标</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">特点</div>
                      <div class="detail-value">持续数据流</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">优势</div>
                      <div class="detail-value">高效处理流数据</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="full-example">
              <h3>完整示例：TCP 聊天服务器</h3>
              <div class="example-tabs">
                <div
                  class="tab"
                  :class="{ active: activeTab === 'server' }"
                  @click="activeTab = 'server'"
                >
                  服务器代码
                </div>
                <div
                  class="tab"
                  :class="{ active: activeTab === 'client' }"
                  @click="activeTab = 'client'"
                >
                  客户端代码
                </div>
              </div>

              <div class="example-content">
                <div v-if="activeTab === 'server'" class="code-block">
                  <pre><code>const net = require('net');
const clients = [];

// 创建 TCP 服务器
const server = net.createServer((socket) => {
  // 新客户端连接
  clients.push(socket);
  console.log(`客户端 ${socket.remoteAddress}:${socket.remotePort} 已连接`);

  // 广播消息给所有客户端
  const broadcast = (message, sender) => {
    clients.forEach(client => {
      if (client !== sender) {
        client.write(message);
      }
    });
  };

  // 处理客户端数据
  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`收到消息: ${message}`);
    broadcast(`${socket.remotePort}: ${message}\n`, socket);
  });

  // 客户端断开连接
  socket.on('end', () => {
    console.log(`客户端 ${socket.remotePort} 已断开`);
    clients.splice(clients.indexOf(socket), 1);
  });

  // 错误处理
  socket.on('error', (err) => {
    console.error(`客户端错误: ${err.message}`);
  });
});

// 启动服务器
server.listen(3000, () => {
  console.log('聊天服务器在 3000 端口运行');
});</code></pre>
                </div>

                <div v-if="activeTab === 'client'" class="code-block">
                  <pre><code>const net = require('net');
const readline = require('readline');

// 创建客户端连接
const client = net.connect({ port: 3000 }, () => {
  console.log('已连接到聊天服务器');

  // 设置命令行接口
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 提示用户输入
  rl.setPrompt('> ');
  rl.prompt();

  // 处理用户输入
  rl.on('line', (input) => {
    client.write(`${input}\n`);
    rl.prompt();
  });

  // 处理服务器数据
  client.on('data', (data) => {
    console.log(data.toString());
    rl.prompt();
  });

  // 断开连接
  client.on('end', () => {
    console.log('已断开与服务器的连接');
    rl.close();
  });
});

// 错误处理
client.on('error', (err) => {
  console.error(`连接错误: ${err.message}`);
});</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最佳实践 -->
        <section v-show="activeSection === 'best'" class="section">
          <div class="section-header">
            <h2>Net 模块最佳实践</h2>
            <div class="tag">高效开发</div>
          </div>

          <div class="card">
            <div class="best-practices">
              <div class="practice">
                <div class="practice-icon">🚀</div>
                <div class="practice-content">
                  <h3>连接池管理</h3>
                  <p>对于高频短连接场景，使用连接池重用连接</p>
                  <div class="code-block">
                    <pre><code>// 使用连接池
const pool = new ConnectionPool({
  create: () => net.connect(3000),
  destroy: (client) => client.end(),
  max: 10 // 最大连接数
});

// 获取连接
pool.acquire((err, client) => {
  if (err) return console.error(err);

  client.write('请求数据');
  // 使用后释放连接
  pool.release(client);
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="practice">
                <div class="practice-icon">🛡️</div>
                <div class="practice-content">
                  <h3>安全数据传输</h3>
                  <p>敏感数据使用TLS加密，避免明文传输</p>
                  <div class="code-block">
                    <pre><code>const tls = require('tls');
const net = require('net');

// 创建安全的TCP服务器
const server = net.createServer((socket) => {
  const secureSocket = tls.connect({
    socket: socket,
    // TLS配置...
  });

  // 使用secureSocket进行安全通信
});</code></pre>
                  </div>
                </div>
              </div>

              <div class="practice">
                <div class="practice-icon">⚖️</div>
                <div class="practice-content">
                  <h3>负载均衡</h3>
                  <p>使用集群模块分发连接，提高并发能力</p>
                  <div class="code-block">
                    <pre><code>const cluster = require('cluster');
const net = require('net');

if (cluster.isMaster) {
  // 创建多个工作进程
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
} else {
  // 每个工作进程创建TCP服务器
  net.createServer((socket) => {
    // 处理连接...
  }).listen(3000);
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="practice">
                <div class="practice-icon">📦</div>
                <div class="practice-content">
                  <h3>数据序列化</h3>
                  <p>使用高效的数据序列化格式</p>
                  <div class="comparison">
                    <div class="format">
                      <div class="format-name">JSON</div>
                      <div class="format-desc">易读但体积大</div>
                    </div>
                    <div class="format">
                      <div class="format-name">MessagePack</div>
                      <div class="format-desc">二进制，体积小</div>
                    </div>
                    <div class="format">
                      <div class="format-name">Protocol Buffers</div>
                      <div class="format-desc">高效，类型安全</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="performance-tips">
              <h3>性能优化技巧</h3>
              <div class="tips-grid">
                <div class="tip">
                  <div class="tip-icon">⏱️</div>
                  <div>
                    <h4>设置超时</h4>
                    <p>使用 socket.setTimeout() 防止空闲连接占用资源</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">🧩</div>
                  <div>
                    <h4>连接复用</h4>
                    <p>保持长连接减少握手开销</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">📦</div>
                  <div>
                    <h4>数据缓冲</h4>
                    <p>合理使用 cork()/uncork() 减少系统调用</p>
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-icon">🚫</div>
                  <div>
                    <h4>错误处理</h4>
                    <p>始终监听 'error' 事件防止进程崩溃</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">Node.js Net</div>
        <div class="footer-links">
          <a href="#">Node.js 文档</a>
          <a href="#">TCP/IP 指南</a>
          <a href="#">网络编程</a>
          <a href="#">性能优化</a>
        </div>
      </div>
      <div class="footer-copyright">
        <p> Node.js Net 模块指南 | 使用 Vue3 制作</p>
        <p>Node.js 是 OpenJS Foundation 的商标</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航项
const navItems = ref([
  { id: 'concept', title: '概念与作用' },
  { id: 'api', title: '核心 API' },
  { id: 'usecases', title: '使用场景' },
  { id: 'best', title: '最佳实践' },
])

// 当前活动部分
const activeSection = ref('concept')

// 示例标签页
const activeTab = ref('server')
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #339933; // Node.js 绿色
@primary-dark: #267326;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@tcp-blue: #1a73e8;

// 混合
.box-shadow {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.net-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 10%), @primary-color);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .title-container {
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0.25rem 0 0;
      font-weight: 300;
    }
  }

  .network-icon {
    font-size: 2.5rem;
  }
}

// Node.js 徽标
.node-logo {
  position: relative;
  width: 70px;
  height: 80px;

  .hexagon {
    position: absolute;
    width: 70px;
    height: 40px;
    background: #8cc84b;
    border-radius: 5px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 0;
      border-left: 35px solid transparent;
      border-right: 35px solid transparent;
    }

    &::before {
      top: -20px;
      border-bottom: 20px solid #8cc84b;
    }

    &::after {
      bottom: -20px;
      border-top: 20px solid #8cc84b;
    }
  }

  .inner-hexagon {
    position: absolute;
    width: 45px;
    height: 26px;
    top: 27px;
    left: 12.5px;
    background: #fff;
    border-radius: 3px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 0;
      border-left: 22.5px solid transparent;
      border-right: 22.5px solid transparent;
    }

    &::before {
      top: -13px;
      border-bottom: 13px solid #fff;
    }

    &::after {
      bottom: -13px;
      border-top: 13px solid #fff;
    }
  }

  .node-text {
    position: absolute;
    top: 40px;
    left: 0;
    width: 70px;
    text-align: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #8cc84b;
  }
}

.content-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 260px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;

  .section-title {
    color: @text-secondary;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 1.5rem 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    .transition;

    &:hover {
      background-color: lighten(@primary-color, 50%);
    }

    &.active {
      background-color: lighten(@primary-color, 45%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.75rem;
      color: @primary-dark;
      margin: 0;
    }
  }
}

.tag {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  background: lighten(@tcp-blue, 40%);
  color: darken(@tcp-blue, 15%);
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .concept-card {
    background: lighten(@primary-color, 50%);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      color: @primary-dark;
    }
  }
}

.tcp-process {
  margin: 2rem 0;

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: lighten(@tcp-blue, 50%);
      border-radius: 10px;
      padding: 1.25rem;

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: @tcp-blue;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
      }
    }
  }
}

.api-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  .category {
    h3 {
      color: @primary-dark;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid lighten(@primary-color, 30%);
    }
  }

  .api-list {
    margin-top: 1rem;
  }

  .api-item {
    background: lighten(@primary-color, 52%);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;

    .api-name {
      font-family: 'Fira Code', monospace;
      font-weight: 500;
      color: @primary-dark;
    }

    .api-desc {
      font-size: 0.9rem;
      color: @text-secondary;
      margin: 0.25rem 0 0.5rem;
    }

    .api-code {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 0.75rem;
      font-size: 0.85rem;
      overflow-x: auto;

      pre {
        margin: 0;
      }
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .use-case {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    .box-shadow;

    .case-icon {
      font-size: 2rem;
      flex-shrink: 0;
      color: @tcp-blue;
    }

    .case-detail {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.9rem;

      .detail-label {
        font-weight: 500;
        color: @primary-dark;
      }
    }
  }
}

.full-example {
  margin-top: 2rem;

  .example-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .tab {
      padding: 0.5rem 1rem;
      background: #f1f5f9;
      border-radius: 6px;
      cursor: pointer;
      .transition;

      &:hover {
        background: #e2e8f0;
      }

      &.active {
        background: @primary-color;
        color: white;
        font-weight: 500;
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  .practice {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    .box-shadow;

    &-icon {
      font-size: 2.5rem;
      text-align: center;
      padding: 1rem;
      background: lighten(@primary-color, 50%);
      color: @primary-color;
    }

    &-content {
      padding: 1.25rem;

      h3 {
        margin-top: 0;
        color: @primary-dark;
      }

      .comparison {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;

        .format {
          flex: 1;
          text-align: center;
          padding: 0.75rem;
          background: #f1f5f9;
          border-radius: 6px;

          &-name {
            font-weight: 500;
          }

          &-desc {
            font-size: 0.85rem;
            color: @text-secondary;
            margin-top: 0.25rem;
          }
        }
      }
    }
  }
}

.performance-tips {
  margin-top: 2rem;

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .tip {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: lighten(@tcp-blue, 50%);
      border-radius: 10px;

      .tip-icon {
        font-size: 1.75rem;
        flex-shrink: 0;
      }
    }
  }
}

.footer {
  background: @card-bg;
  border-top: 1px solid @border-color;
  padding: 3rem 2rem 1.5rem;
  margin-top: 3rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid @border-color;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: @primary-dark;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;

    a {
      color: @text-secondary;
      text-decoration: none;
      .transition;

      &:hover {
        color: @primary-color;
      }
    }
  }

  .footer-copyright {
    max-width: 1200px;
    margin: 1.5rem auto 0;
    text-align: center;
    font-size: 0.9rem;
    color: @text-secondary;

    p {
      margin: 0.25rem 0;
    }
  }
}

// 响应式设计
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.25rem;

    h1 {
      font-size: 1.8rem;
    }

    .network-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .content-container {
    padding: 1rem;
  }

  .best-practices {
    grid-template-columns: 1fr;
  }
}
</style>
