<template>
  <div class="hol-container">
    <header class="header">
      <h1>HTTP 队头阻塞问题基本介绍</h1>
      <p class="subtitle">深入理解网络性能瓶颈与解决方案</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>队头阻塞问题概述</h2>
          <div class="overview-grid">
            <div class="overview-card">
              <div class="overview-icon">🚧</div>
              <h3>什么是队头阻塞</h3>
              <p>队头阻塞（Head-of-Line Blocking, HOL）是网络通信中的性能瓶颈问题，指队列中的第一个数据包被阻塞时，后续所有数据包都无法处理的现象。</p>
            </div>
            <div class="overview-card">
              <div class="overview-icon">📊</div>
              <h3>影响范围</h3>
              <ul>
                <li>HTTP/1.x 请求级阻塞</li>
                <li>TCP 传输层数据包级阻塞</li>
                <li>QUIC/UDP 协议级阻塞</li>
                <li>应用层处理能力限制</li>
              </ul>
            </div>
            <div class="overview-card">
              <div class="overview-icon">⏱️</div>
              <h3>性能影响</h3>
              <p>队头阻塞会导致：</p>
              <ul>
                <li>页面加载延迟增加 30-50%</li>
                <li>网络资源利用率下降</li>
                <li>高延迟网络下性能急剧下降</li>
                <li>用户体验显著降低</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>HTTP 层队头阻塞</h2>
          <div class="hol-visualization">
            <div class="protocol-label">HTTP/1.1</div>
            <div class="request-queue">
              <div class="request" v-for="(req, index) in httpRequests" :key="index" :class="{
                'processing': index === 0,
                'blocked': index > 0 && index < 3,
                'waiting': index >= 3
              }">
                <div class="req-icon">📦</div>
                <div class="req-info">
                  <div>请求 {{ index + 1 }}</div>
                  <div>{{ req.status }}</div>
                </div>
              </div>
            </div>
            <div class="explanation">
              <p>在 HTTP/1.1 中，浏览器对同一域名最多允许 6 个并发连接。当第一个请求处理缓慢时，后续请求会被阻塞等待。</p>
            </div>
          </div>

          <div class="solution-section">
            <h3>HTTP 层解决方案</h3>
            <div class="solutions">
              <div class="solution-card">
                <div class="solution-icon">🚀</div>
                <h4>HTTP/2 多路复用</h4>
                <p>通过二进制分帧层实现真正的多路复用，允许在单个连接上并行交错传输多个请求和响应</p>
                <pre>// 服务器启用 HTTP/2
server {
  listen 443 ssl http2;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/private.key;
}</pre>
              </div>

              <div class="solution-card">
                <div class="solution-icon">🔀</div>
                <h4>域名分片</h4>
                <p>将资源分散到多个子域名，绕过浏览器对同一域名的连接限制</p>
                <pre>// 域名分片示例
&lt;img src="https://static1.example.com/image1.jpg"&gt;
&lt;img src="https://static2.example.com/image2.jpg"&gt;
&lt;img src="https://static3.example.com/image3.jpg"&gt;</pre>
              </div>

              <div class="solution-card">
                <div class="solution-icon">📦</div>
                <h4>资源合并</h4>
                <p>减少请求数量，将小文件合并为单个文件</p>
                <pre>// CSS 文件合并
@import "header.css";
@import "footer.css";
@import "main.css";

// JavaScript 文件合并
// 使用 Webpack 等打包工具</pre>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>TCP 层队头阻塞</h2>
          <div class="tcp-visualization">
            <div class="protocol-stack">
              <div class="layer application">
                <div>应用层</div>
                <div>HTTP/2</div>
              </div>
              <div class="layer transport">
                <div>传输层</div>
                <div>TCP</div>
              </div>
              <div class="layer network">
                <div>网络层</div>
                <div>IP</div>
              </div>
            </div>

            <div class="tcp-packets">
              <div class="packet" v-for="(pkt, index) in tcpPackets" :key="index" :class="{
                'lost': pkt.status === 'lost',
                'blocked': pkt.status === 'blocked',
                'delivered': pkt.status === 'delivered'
              }">
                <div class="seq">Seq: {{ pkt.sequence }}</div>
                <div class="status">{{ pkt.statusText }}</div>
              </div>
            </div>

            <div class="tcp-explanation">
              <p>TCP 保证数据包按序到达，当序列 2 的数据包丢失时，即使序列 3、4 已到达，接收方也无法处理，必须等待序列 2 重传。</p>
            </div>
          </div>

          <div class="solution-section">
            <h3>TCP 层解决方案</h3>
            <div class="solutions">
              <div class="solution-card">
                <div class="solution-icon">🆕</div>
                <h4>QUIC 协议</h4>
                <p>基于 UDP 的传输协议，提供独立数据流，解决 TCP 队头阻塞问题</p>
                <pre>// 主要特性：
// - 基于 UDP，避免操作系统 TCP 栈限制
// - 每个流独立传输，互不影响
// - 内置 TLS 1.3 加密
// - 0-RTT 和 1-RTT 握手</pre>
              </div>

              <div class="solution-card">
                <div class="solution-icon">📈</div>
                <h4>TCP BBR 拥塞控制</h4>
                <p>Google 开发的拥塞控制算法，减少重传和延迟</p>
                <pre>// 启用 TCP BBR
# 加载模块
sudo modprobe tcp_bbr

# 设置拥塞控制算法
echo "tcp_bbr" | sudo tee /proc/sys/net/ipv4/tcp_congestion_control</pre>
              </div>

              <div class="solution-card">
                <div class="solution-icon">🔧</div>
                <h4>多路 TCP 连接</h4>
                <p>应用程序使用多个 TCP 连接并行传输数据</p>
                <pre>// 客户端建立多个连接
const conn1 = new WebSocket('wss://example.com');
const conn2 = new WebSocket('wss://example.com');
const conn3 = new WebSocket('wss://example.com');</pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="comparison-card">
          <h3>HTTP 协议演进对比</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>HTTP/1.1</th>
                <th>HTTP/2</th>
                <th>HTTP/3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>传输协议</td>
                <td>TCP</td>
                <td>TCP</td>
                <td>QUIC (UDP)</td>
              </tr>
              <tr>
                <td>队头阻塞</td>
                <td>请求级 + TCP 级</td>
                <td>TCP 级</td>
                <td>无</td>
              </tr>
              <tr>
                <td>多路复用</td>
                <td>❌ 有限</td>
                <td>✅ 优秀</td>
                <td>✅ 卓越</td>
              </tr>
              <tr>
                <td>连接建立</td>
                <td>1-3 RTT</td>
                <td>1-3 RTT</td>
                <td>0-1 RTT</td>
              </tr>
              <tr>
                <td>加密要求</td>
                <td>可选</td>
                <td>可选</td>
                <td>强制 TLS 1.3+</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>100%</td>
                <td>98.5%</td>
                <td>92.7%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="performance-card">
          <h3>性能影响数据</h3>
          <div class="metric">
            <div class="metric-label">HTTP/1.1 延迟</div>
            <div class="metric-bar">
              <div class="bar-fill" style="width: 100%">350ms</div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">HTTP/2 延迟</div>
            <div class="metric-bar">
              <div class="bar-fill" style="width: 70%">250ms</div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">HTTP/3 延迟</div>
            <div class="metric-bar">
              <div class="bar-fill" style="width: 40%">150ms</div>
            </div>
          </div>
          <div class="metric-note">
            * 测试环境：3% 丢包率，100ms RTT
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>优先启用 HTTP/2 或 HTTP/3</li>
            <li>使用 CDN 提供 HTTP/3 支持</li>
            <li>减少关键请求链的依赖</li>
            <li>优化服务器拥塞控制算法</li>
            <li>实施资源预加载</li>
            <li>使用资源提示 (preconnect, preload)</li>
          </ul>
        </div>

        <div class="adoption-card">
          <h3>协议采用率</h3>
          <div class="adoption-chart">
            <div class="chart-bar">
              <div class="bar-label">HTTP/1.1</div>
              <div class="bar-container">
                <div class="bar" style="width: 25%; background: #ea4335;">25%</div>
              </div>
            </div>
            <div class="chart-bar">
              <div class="bar-label">HTTP/2</div>
              <div class="bar-container">
                <div class="bar" style="width: 68%; background: #4285f4;">68%</div>
              </div>
            </div>
            <div class="chart-bar">
              <div class="bar-label">HTTP/3</div>
              <div class="bar-container">
                <div class="bar" style="width: 7%; background: #34a853;">7%</div>
              </div>
            </div>
          </div>
          <div class="adoption-note">
            全球前 1000 万网站协议使用统计 (2023)
          </div>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>HTTP/3 与 QUIC 协议</h2>
      <div class="http3-details">
        <div class="http3-visual">
          <div class="quic-stack">
            <div class="layer application">HTTP/3</div>
            <div class="layer quic">QUIC</div>
            <div class="layer transport">UDP</div>
            <div class="layer network">IP</div>
          </div>
          <div class="quic-streams">
            <div class="stream" v-for="stream in quicStreams" :key="stream.id"
              :style="{ height: stream.height + 'px' }">
              <div class="stream-label">流 {{ stream.id }}</div>
              <div class="packets">
                <div v-for="pkt in stream.packets" :key="pkt.id" class="packet" :class="{
                  'delivered': pkt.status === 'delivered',
                  'lost': pkt.status === 'lost'
                }">
                  {{ pkt.id }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="http3-benefits">
          <h3>QUIC 协议优势</h3>
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🚫</div>
              <h4>解决队头阻塞</h4>
              <p>每个数据流独立传输，丢失的数据包只影响单个流</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🔒</div>
              <h4>增强安全性</h4>
              <p>内置 TLS 1.3 加密，握手过程更安全高效</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h4>快速连接建立</h4>
              <p>0-RTT 和 1-RTT 握手大幅减少连接延迟</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🔄</div>
              <h4>无缝网络切换</h4>
              <p>连接 ID 保持稳定，Wi-Fi 和移动网络切换不中断</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>实施指南</h2>
      <div class="implementation-guide">
        <div class="guide-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>评估当前协议支持</h3>
            <pre># 检查服务器协议支持
curl -I --http2 https://example.com
curl -I --http3 https://example.com

# 浏览器开发者工具查看协议
Network > Protocol 列</pre>
          </div>
        </div>

        <div class="guide-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>启用 HTTP/2 或 HTTP/3</h3>
            <pre># Nginx 启用 HTTP/2
server {
  listen 443 ssl http2;
  ...
}

# Nginx 启用 HTTP/3 (需要 QUIC 模块)
server {
  listen 443 quic reuseport;
  listen 443 ssl http2;
  ssl_protocols TLSv1.3;
  add_header Alt-Svc 'h3=":443"; ma=86400';
}</pre>
          </div>
        </div>

        <div class="guide-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>前端优化策略</h3>
            <pre>// 使用资源提示
&lt;link rel="preconnect" href="https://cdn.example.com"&gt;
&lt;link rel="preload" href="critical.css" as="style"&gt;

// 关键资源优先加载
&lt;script src="main.js" defer&gt;&lt;/script&gt;
&lt;link rel="stylesheet" href="critical.css"&gt;

// 非关键资源异步加载
&lt;script src="analytics.js" async&gt;&lt;/script&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>队头阻塞问题是网络性能优化的重要挑战，通过理解不同协议层的解决方案，可以显著提升网站加载速度和用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// HTTP 请求状态模拟
const httpRequests = ref([
  { status: "处理中..." },
  { status: "等待中" },
  { status: "等待中" },
  { status: "等待中" },
  { status: "等待中" },
  { status: "等待中" },
]);

// TCP 数据包状态模拟
const tcpPackets = ref([
  { sequence: 1, status: "delivered", statusText: "已送达" },
  { sequence: 2, status: "lost", statusText: "已丢失" },
  { sequence: 3, status: "blocked", statusText: "阻塞中" },
  { sequence: 4, status: "blocked", statusText: "阻塞中" },
  { sequence: 5, status: "blocked", statusText: "阻塞中" },
]);

// QUIC 流模拟
const quicStreams = ref([
  {
    id: 1,
    height: 120,
    packets: [
      { id: "1-1", status: "delivered" },
      { id: "1-2", status: "delivered" },
      { id: "1-3", status: "delivered" }
    ]
  },
  {
    id: 2,
    height: 90,
    packets: [
      { id: "2-1", status: "delivered" },
      { id: "2-2", status: "lost" },
      { id: "2-3", status: "delivered" }
    ]
  },
  {
    id: 3,
    height: 150,
    packets: [
      { id: "3-1", status: "delivered" },
      { id: "3-2", status: "delivered" },
      { id: "3-3", status: "delivered" }
    ]
  }
]);

// 模拟状态更新
onMounted(() => {
  // HTTP 请求状态更新
  setInterval(() => {
    httpRequests.value = httpRequests.value.map((req, index) => {
      if (index === 0) return { status: "处理中..." };
      if (index === 1) return { status: "处理中..." };
      return { status: "等待中" };
    });

    setTimeout(() => {
      httpRequests.value = [
        { status: "已完成" },
        { status: "处理中..." },
        { status: "等待中" },
        { status: "等待中" },
        { status: "等待中" },
        { status: "等待中" },
      ];
    }, 2000);
  }, 4000);

  // TCP 数据包状态更新
  setInterval(() => {
    tcpPackets.value = [
      { sequence: 1, status: "delivered", statusText: "已送达" },
      { sequence: 2, status: "delivered", statusText: "已送达" },
      { sequence: 3, status: "delivered", statusText: "已送达" },
      { sequence: 4, status: "delivered", statusText: "已送达" },
      { sequence: 5, status: "delivered", statusText: "已送达" },
    ];

    setTimeout(() => {
      tcpPackets.value = [
        { sequence: 1, status: "delivered", statusText: "已送达" },
        { sequence: 2, status: "lost", statusText: "已丢失" },
        { sequence: 3, status: "blocked", statusText: "阻塞中" },
        { sequence: 4, status: "blocked", statusText: "阻塞中" },
        { sequence: 5, status: "blocked", statusText: "阻塞中" },
      ];
    }, 3000);
  }, 6000);
});
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@text-color: #202124;
@light-bg: #f8f9fa;
@border-color: #dadce0;
@card-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hol-container {
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #5f6368;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
    font-size: 1.8rem;
  }
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.overview-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .overview-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  p,
  ul {
    line-height: 1.7;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.hol-visualization {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  .protocol-label {
    background: @accent-color;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 15px;
    font-weight: bold;
  }
}

.request-queue {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;

  .request {
    flex: 1;
    min-width: 150px;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;

    &.processing {
      border-color: @primary-color;
      background: fade(@primary-color, 10%);
      transform: scale(1.05);
    }

    &.blocked {
      border-color: #fbbc05;
      background: fade(#fbbc05, 10%);
    }

    &.waiting {
      opacity: 0.7;
    }

    .req-icon {
      font-size: 1.8rem;
    }
  }
}

.tcp-visualization {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;
}

.protocol-stack {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 20px;

  .layer {
    padding: 15px;
    background: #f1f3f4;
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    &.application {
      background: fade(@primary-color, 10%);
    }

    &.transport {
      background: fade(@secondary-color, 10%);
    }

    &.network {
      background: fade(@accent-color, 10%);
    }
  }
}

.tcp-packets {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  .packet {
    width: 80px;
    height: 60px;
    border: 1px solid @border-color;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;

    &.lost {
      border-color: @accent-color;
      background: fade(@accent-color, 10%);
      animation: pulse 1.5s infinite;
    }

    &.blocked {
      border-color: #fbbc05;
      background: fade(#fbbc05, 10%);
    }

    &.delivered {
      border-color: @secondary-color;
      background: fade(@secondary-color, 10%);
    }

    .seq {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

.solution-section {
  margin-top: 30px;

  h3 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.solutions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.solution-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  border-top: 4px solid @primary-color;

  .solution-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  h4 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    margin-top: 15px;
    line-height: 1.4;
  }
}

.comparison-card,
.performance-card,
.adoption-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: fade(@primary-color, 8%);
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
}

.metric {
  margin-bottom: 15px;

  .metric-label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: #5f6368;
  }

  .metric-bar {
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;

    .bar-fill {
      height: 100%;
      background: @primary-color;
      color: white;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      font-weight: bold;
    }
  }
}

.metric-note {
  font-size: 0.8rem;
  color: #5f6368;
  margin-top: 10px;
}

.best-practices {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

.adoption-chart {
  .chart-bar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .bar-label {
      width: 100px;
      font-size: 0.9rem;
    }

    .bar-container {
      flex: 1;
      height: 25px;
      background: #f1f3f4;
      border-radius: 4px;
      overflow: hidden;

      .bar {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
  }
}

.adoption-note {
  font-size: 0.8rem;
  color: #5f6368;
  margin-top: 10px;
  text-align: center;
}

.http3-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 25px;
}

.http3-visual {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .quic-stack {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-bottom: 20px;

    .layer {
      padding: 15px;
      background: #f1f3f4;
      font-weight: bold;

      &.application {
        background: fade(@primary-color, 15%);
      }

      &.quic {
        background: fade(#34a853, 15%);
      }

      &.transport {
        background: fade(#fbbc05, 15%);
      }

      &.network {
        background: fade(@accent-color, 15%);
      }
    }
  }

  .quic-streams {
    display: flex;
    gap: 15px;

    .stream {
      flex: 1;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 10px;

      .stream-label {
        font-weight: bold;
        margin-bottom: 10px;
        color: @secondary-color;
      }

      .packets {
        display: flex;
        gap: 5px;

        .packet {
          flex: 1;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;

          &.delivered {
            background: fade(@secondary-color, 30%);
            border: 1px solid @secondary-color;
          }

          &.lost {
            background: fade(@accent-color, 30%);
            border: 1px solid @accent-color;
            animation: pulse 1.5s infinite;
          }
        }
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  text-align: center;

  .benefit-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  h4 {
    color: @primary-color;
    margin-bottom: 10px;
  }
}

.implementation-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.guide-step {
  display: flex;
  gap: 15px;

  .step-number {
    width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    font-size: 1.2rem;
  }

  .step-content {
    h3 {
      color: @primary-color;
      margin-bottom: 10px;
    }

    pre {
      background: #f1f3f4;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.85rem;
      margin-top: 10px;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #5f6368;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .http3-details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {

  .overview-grid,
  .solutions,
  .benefits-grid,
  .implementation-guide {
    grid-template-columns: 1fr;
  }

  .request-queue .request {
    min-width: 100%;
  }
}
</style>
