<template>
  <div class="network-process-container">
    <header class="network-header">
      <h1>前端渲染网络过程基础介绍</h1>
      <p class="subtitle">从DNS解析到资源加载的全过程剖析</p>
    </header>

    <div class="timeline-overview">
      <div class="timeline-bar">
        <div class="timeline-step" :style="{ left: '0%' }">
          <div class="step-badge">1</div>
          <div class="step-label">DNS解析</div>
        </div>
        <div class="timeline-step" :style="{ left: '20%' }">
          <div class="step-badge">2</div>
          <div class="step-label">TCP连接</div>
        </div>
        <div class="timeline-step" :style="{ left: '40%' }">
          <div class="step-badge">3</div>
          <div class="step-label">TLS握手</div>
        </div>
        <div class="timeline-step" :style="{ left: '60%' }">
          <div class="step-badge">4</div>
          <div class="step-label">HTTP请求</div>
        </div>
        <div class="timeline-step" :style="{ left: '80%' }">
          <div class="step-badge">5</div>
          <div class="step-label">响应处理</div>
        </div>
      </div>
    </div>

    <div class="network-steps">
      <!-- DNS解析 -->
      <section class="step-card">
        <div class="step-header">
          <div class="step-number">1</div>
          <h2>DNS解析 (Domain Name System)</h2>
        </div>
        <div class="step-content">
          <p>将人类可读的域名转换为机器可识别的IP地址</p>

          <div class="dns-process">
            <div class="dns-step">
              <div class="dns-icon">💻</div>
              <div class="dns-text">浏览器缓存检查</div>
            </div>
            <div class="dns-arrow">→</div>
            <div class="dns-step">
              <div class="dns-icon">📚</div>
              <div class="dns-text">系统缓存检查</div>
            </div>
            <div class="dns-arrow">→</div>
            <div class="dns-step">
              <div class="dns-icon">🏢</div>
              <div class="dns-text">路由器缓存检查</div>
            </div>
            <div class="dns-arrow">→</div>
            <div class="dns-step">
              <div class="dns-icon">🌐</div>
              <div class="dns-text">ISP DNS服务器</div>
            </div>
            <div class="dns-arrow">→</div>
            <div class="dns-step">
              <div class="dns-icon">🔍</div>
              <div class="dns-text">递归查询</div>
            </div>
          </div>

          <div class="performance-data">
            <h3>性能指标</h3>
            <div class="metric">
              <span>解析时间：</span>
              <span class="metric-value">{{ dnsLookupTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>缓存命中率：</span>
              <span class="metric-value">{{ dnsCacheHitRate * 100 }}%</span>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>使用DNS预加载：<code>&lt;link rel="dns-prefetch" href="//example.com"&gt;</code></li>
              <li>减少不同域名数量（减少DNS查询次数）</li>
              <li>设置较长的TTL值</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TCP连接 -->
      <section class="step-card">
        <div class="step-header">
          <div class="step-number">2</div>
          <h2>TCP连接 (Transmission Control Protocol)</h2>
        </div>
        <div class="step-content">
          <p>在浏览器和服务器之间建立可靠的双向通信通道</p>

          <div class="tcp-process">
            <div class="tcp-step">
              <div class="tcp-icon">📨</div>
              <div class="tcp-text">SYN</div>
            </div>
            <div class="tcp-arrow">⇄</div>
            <div class="tcp-step">
              <div class="tcp-icon">📬</div>
              <div class="tcp-text">SYN-ACK</div>
            </div>
            <div class="tcp-arrow">⇄</div>
            <div class="tcp-step">
              <div class="tcp-icon">📩</div>
              <div class="tcp-text">ACK</div>
            </div>
          </div>

          <div class="code-example">
            <pre><code>// TCP三次握手过程
1. 客户端发送SYN包(Seq=x)到服务器，进入SYN_SENT状态
2. 服务器响应SYN-ACK包(Seq=y, Ack=x+1)，进入SYN_RCVD状态
3. 客户端发送ACK包(Ack=y+1)，双方进入ESTABLISHED状态</code></pre>
          </div>

          <div class="performance-data">
            <h3>性能指标</h3>
            <div class="metric">
              <span>连接时间：</span>
              <span class="metric-value">{{ tcpConnectTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>平均RTT：</span>
              <span class="metric-value">{{ rttTime.toFixed(2) }} ms</span>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>启用HTTP Keep-Alive保持连接复用</li>
              <li>使用HTTP/2多路复用减少连接开销</li>
              <li>优化TCP拥塞控制算法</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TLS握手 -->
      <section class="step-card">
        <div class="step-header">
          <div class="step-number">3</div>
          <h2>TLS握手 (Transport Layer Security)</h2>
        </div>
        <div class="step-content">
          <p>为通信连接提供安全性和数据完整性保障</p>

          <div class="tls-steps">
            <div class="tls-step">
              <div class="tls-phase">客户端发送"Client Hello"</div>
              <div class="tls-desc">支持的TLS版本、加密套件、随机数</div>
            </div>
            <div class="tls-step">
              <div class="tls-phase">服务器响应"Server Hello"</div>
              <div class="tls-desc">选择的加密套件、随机数、服务器证书</div>
            </div>
            <div class="tls-step">
              <div class="tls-phase">客户端验证证书</div>
              <div class="tls-desc">验证证书链的有效性和域名匹配</div>
            </div>
            <div class="tls-step">
              <div class="tls-phase">密钥交换</div>
              <div class="tls-desc">生成会话密钥，加密后续通信</div>
            </div>
          </div>

          <div class="performance-data">
            <h3>性能指标</h3>
            <div class="metric">
              <span>TLS握手时间：</span>
              <span class="metric-value">{{ tlsHandshakeTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>证书验证时间：</span>
              <span class="metric-value">{{ certVerificationTime.toFixed(2) }} ms</span>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>启用TLS 1.3（减少握手次数）</li>
              <li>使用OCSP Stapling减少证书验证时间</li>
              <li>优化证书链（移除不必要的中间证书）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- HTTP请求 -->
      <section class="step-card">
        <div class="step-header">
          <div class="step-number">4</div>
          <h2>HTTP请求处理</h2>
        </div>
        <div class="step-content">
          <p>浏览器向服务器发送资源请求并接收响应</p>

          <div class="request-response">
            <div class="request-section">
              <h3>HTTP请求</h3>
              <div class="http-message">
                <pre><code>GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Encoding: gzip, deflate
Connection: keep-alive
Cookie: sessionId=abc123</code></pre>
              </div>
            </div>

            <div class="response-section">
              <h3>HTTP响应</h3>
              <div class="http-message">
                <pre><code>HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 15320
Cache-Control: public, max-age=3600
Content-Encoding: gzip
Connection: keep-alive</code></pre>
              </div>
            </div>
          </div>

          <div class="performance-data">
            <h3>性能指标</h3>
            <div class="metric">
              <span>请求排队时间：</span>
              <span class="metric-value">{{ requestQueueTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>服务器处理时间：</span>
              <span class="metric-value">{{ serverProcessTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>内容下载时间：</span>
              <span class="metric-value">{{ contentDownloadTime.toFixed(2) }} ms</span>
            </div>
          </div>

          <div class="optimization">
            <h3>优化策略</h3>
            <ul>
              <li>使用HTTP/2或HTTP/3减少延迟</li>
              <li>启用Gzip/Brotli压缩减小资源体积</li>
              <li>优化缓存策略（Cache-Control, ETag）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 响应处理 -->
      <section class="step-card">
        <div class="step-header">
          <div class="step-number">5</div>
          <h2>响应处理与资源加载</h2>
        </div>
        <div class="step-content">
          <p>浏览器解析响应并开始加载页面资源</p>

          <div class="resource-loading">
            <div class="resource-type">
              <div class="resource-icon">📄</div>
              <div class="resource-name">HTML</div>
            </div>
            <div class="resource-arrow">⇒</div>
            <div class="resource-type">
              <div class="resource-icon">🎨</div>
              <div class="resource-name">CSS</div>
            </div>
            <div class="resource-arrow">⇒</div>
            <div class="resource-type">
              <div class="resource-icon">🖼️</div>
              <div class="resource-name">图片</div>
            </div>
            <div class="resource-arrow">⇒</div>
            <div class="resource-type">
              <div class="resource-icon">🧩</div>
              <div class="resource-name">JS</div>
            </div>
            <div class="resource-arrow">⇒</div>
            <div class="resource-type">
              <div class="resource-icon">📦</div>
              <div class="resource-name">字体</div>
            </div>
          </div>

          <div class="critical-path">
            <h3>关键渲染路径优化</h3>
            <ul>
              <li>最小化关键CSS（Critical CSS）</li>
              <li>JavaScript异步加载（async/defer）</li>
              <li>资源预加载（preload/prefetch）</li>
              <li>图片懒加载（Lazy Loading）</li>
            </ul>
          </div>

          <div class="performance-data">
            <h3>性能指标</h3>
            <div class="metric">
              <span>DOM解析时间：</span>
              <span class="metric-value">{{ domParseTime.toFixed(2) }} ms</span>
            </div>
            <div class="metric">
              <span>资源加载总时间：</span>
              <span class="metric-value">{{ resourceLoadTime.toFixed(2) }} ms</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="network-footer">
      <h3>网络过程性能总结</h3>
      <div class="summary-metrics">
        <div class="summary-metric">
          <div class="metric-name">DNS查找</div>
          <div class="metric-bar" :style="{ width: dnsLookupTime * 2 + 'px' }">
            <div class="metric-value">{{ dnsLookupTime.toFixed(2) }}ms</div>
          </div>
        </div>
        <div class="summary-metric">
          <div class="metric-name">TCP连接</div>
          <div class="metric-bar" :style="{ width: tcpConnectTime * 2 + 'px' }">
            <div class="metric-value">{{ tcpConnectTime.toFixed(2) }}ms</div>
          </div>
        </div>
        <div class="summary-metric">
          <div class="metric-name">TLS握手</div>
          <div class="metric-bar" :style="{ width: tlsHandshakeTime * 2 + 'px' }">
            <div class="metric-value">{{ tlsHandshakeTime.toFixed(2) }}ms</div>
          </div>
        </div>
        <div class="summary-metric">
          <div class="metric-name">请求响应</div>
          <div class="metric-bar"
            :style="{ width: (requestQueueTime + serverProcessTime + contentDownloadTime) * 2 + 'px' }">
            <div class="metric-value">{{ (requestQueueTime + serverProcessTime + contentDownloadTime).toFixed(2) }}ms
            </div>
          </div>
        </div>
      </div>

      <div class="total-time">
        总网络时间：<strong>{{ totalNetworkTime.toFixed(2) }}ms</strong>
      </div>

      <div class="optimization-tips">
        <h3>网络性能优化黄金法则</h3>
        <ol>
          <li>减少DNS查询次数（使用dns-prefetch）</li>
          <li>减少HTTP请求数量（合并资源）</li>
          <li>使用CDN加速内容分发</li>
          <li>开启Gzip/Brotli压缩</li>
          <li>利用浏览器缓存（Cache-Control, ETag）</li>
          <li>优化图片资源（WebP格式，响应式图片）</li>
          <li>最小化重定向（避免301/302跳转）</li>
        </ol>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 模拟网络过程性能数据
const dnsLookupTime = ref(28.5);
const dnsCacheHitRate = ref(0.65);
const tcpConnectTime = ref(42.8);
const rttTime = ref(85.0);
const tlsHandshakeTime = ref(125.7);
const certVerificationTime = ref(37.2);
const requestQueueTime = ref(15.3);
const serverProcessTime = ref(87.6);
const contentDownloadTime = ref(136.9);
const domParseTime = ref(68.4);
const resourceLoadTime = ref(423.7);

// 计算总网络时间
const totalNetworkTime = ref(0);

// 模拟性能数据变更效果
const animateMetrics = () => {
  const metrics = [
    dnsLookupTime,
    tcpConnectTime,
    tlsHandshakeTime,
    requestQueueTime,
    serverProcessTime,
    contentDownloadTime,
    domParseTime,
    resourceLoadTime
  ];

  metrics.forEach(metric => {
    const original = metric.value;
    // 添加小范围随机变化
    metric.value = original * (0.9 + Math.random() * 0.2);
  });

  // 更新总时间
  totalNetworkTime.value = [
    dnsLookupTime.value,
    tcpConnectTime.value,
    tlsHandshakeTime.value,
    requestQueueTime.value,
    serverProcessTime.value,
    contentDownloadTime.value
  ].reduce((acc, val) => acc + val, 0);
};

onMounted(() => {
  // 初始化总时间
  totalNetworkTime.value = dnsLookupTime.value +
    tcpConnectTime.value +
    tlsHandshakeTime.value +
    requestQueueTime.value +
    serverProcessTime.value +
    contentDownloadTime.value;

  // 定时更新数据（模拟实时变化）
  setInterval(animateMetrics, 3000);
});
</script>

<style scoped lang="less">
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@background-dark: #2c3e50;
@background-light: #ecf0f1;
@text-light: #fff;
@text-dark: #34495e;
@border-radius: 8px;
@box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

.network-process-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-dark;
  background-color: #fafbfc;
}

.network-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #1a5276, @primary-color);
  color: @text-light;
  border-radius: @border-radius;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.85;
    font-weight: 300;
  }
}

.timeline-overview {
  background: white;
  border-radius: @border-radius;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  .timeline-bar {
    height: 6px;
    background: linear-gradient(to right,
        @primary-color,
        lighten(@primary-color, 15%),
        @secondary-color,
        lighten(@secondary-color, 10%),
        @accent-color);
    border-radius: 3px;
    position: relative;
    margin: 40px 10px;
  }

  .timeline-step {
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
    width: 70px;
    text-align: center;

    .step-badge {
      width: 40px;
      height: 40px;
      background: white;
      border: 3px solid @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: @primary-color;
      margin: 0 auto 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .step-label {
      font-weight: 600;
      font-size: 0.9rem;
    }
  }
}

.network-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.step-card {
  background: white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .step-header {
    padding: 20px;
    background: linear-gradient(to right, @background-dark, lighten(@background-dark, 10%));
    color: @text-light;
    display: flex;
    align-items: center;

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 15px;
    }

    h2 {
      margin: 0;
      font-size: 1.6rem;
    }
  }

  .step-content {
    padding: 25px;

    p {
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 20px;
    }
  }
}

.dns-process {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 25px 0;

  .dns-step {
    background: @background-light;
    border-radius: @border-radius;
    padding: 15px;
    text-align: center;
    min-width: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    .dns-icon {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    .dns-text {
      font-size: 0.9rem;
    }
  }

  .dns-arrow {
    color: #7f8c8d;
    font-size: 1.5rem;
  }
}

.tcp-process {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 30px 0;

  .tcp-step {
    background: #e3f2fd;
    border-radius: @border-radius;
    padding: 15px 20px;
    text-align: center;

    .tcp-icon {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    .tcp-text {
      font-weight: bold;
      color: #0d47a1;
    }
  }

  .tcp-arrow {
    font-size: 1.8rem;
    color: #1976d2;
  }
}

.tls-steps {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 25px 0;

  .tls-step {
    background: #e8f5e9;
    border-left: 4px solid #4caf50;
    padding: 12px 15px;
    border-radius: 0 @border-radius @border-radius 0;

    .tls-phase {
      font-weight: bold;
      color: #2e7d32;
    }

    .tls-desc {
      font-size: 0.9rem;
      color: #555;
    }
  }
}

.request-response {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;

  .request-section {
    background: #e3f2fd;
    border-radius: @border-radius;
    overflow: hidden;
  }

  .response-section {
    background: #e8f5e9;
    border-radius: @border-radius;
    overflow: hidden;
  }

  h3 {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
    margin: 0;
    padding: 10px 15px;
    font-size: 1.1rem;
  }

  .http-message {
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
    overflow-x: auto;
  }
}

.resource-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px 0;

  .resource-type {
    text-align: center;
    background: #f5f5f5;
    border-radius: @border-radius;
    padding: 15px;
    min-width: 100px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    .resource-icon {
      font-size: 2.2rem;
      margin-bottom: 8px;
    }

    .resource-name {
      font-weight: bold;
      color: #555;
    }
  }

  .resource-arrow {
    font-size: 1.5rem;
    color: #7f8c8d;
  }
}

.performance-data {
  background: @background-light;
  border-radius: @border-radius;
  padding: 15px;
  margin: 25px 0;

  h3 {
    margin-top: 0;
    color: @background-dark;
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }

  .metric {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed #ddd;

    &:last-child {
      border-bottom: none;
    }

    .metric-value {
      font-weight: bold;
      color: @accent-color;
    }
  }
}

.optimization {
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 @border-radius @border-radius 0;
  padding: 15px;
  margin: 25px 0;

  h3 {
    margin-top: 0;
    color: #e65100;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
  }
}

.code-example {
  background: #2d2d2d;
  color: #f5f5f5;
  border-radius: @border-radius;
  padding: 15px;
  margin: 20px 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.critical-path {
  background: #f3e5f5;
  border-left: 4px solid #9c27b0;
  border-radius: 0 @border-radius @border-radius 0;
  padding: 15px;

  h3 {
    margin-top: 0;
    color: #7b1fa2;
  }

  ul {
    padding-left: 20px;
  }
}

.network-footer {
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  box-shadow: @box-shadow;

  h3 {
    margin-top: 0;
    color: @background-dark;
    text-align: center;
    font-size: 1.5rem;
  }
}

.summary-metrics {
  margin: 30px 0;

  .summary-metric {
    margin-bottom: 20px;

    .metric-name {
      font-weight: bold;
      margin-bottom: 8px;
      color: #555;
    }

    .metric-bar {
      height: 30px;
      background: linear-gradient(to right, #3498db, #2ecc71);
      border-radius: 4px;
      position: relative;
      transition: width 1.5s ease;

      .metric-value {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
}

.total-time {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: @accent-color;
  margin: 30px 0;
  padding: 15px;
  background: #ffebee;
  border-radius: @border-radius;
}

.optimization-tips {
  background: #e3f2fd;
  border-radius: @border-radius;
  padding: 25px;

  h3 {
    margin-top: 0;
    text-align: center;
    color: @background-dark;
    border-bottom: 1px solid #bbdefb;
    padding-bottom: 15px;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 15px;
      padding-left: 10px;
      position: relative;
      line-height: 1.6;

      &::before {
        content: '★';
        color: @primary-color;
        position: absolute;
        left: -20px;
      }
    }
  }
}

@media (max-width: 768px) {
  .network-header h1 {
    font-size: 1.8rem;
  }

  .step-header h2 {
    font-size: 1.3rem;
  }

  .dns-process {
    flex-wrap: wrap;
  }

  .tcp-process {
    flex-wrap: wrap;
    gap: 15px;
  }

  .request-response {
    grid-template-columns: 1fr;
  }

  .resource-loading {
    flex-wrap: wrap;
  }

  .timeline-step {
    width: 50px;

    .step-badge {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }

    .step-label {
      font-size: 0.7rem;
    }
  }
}
</style>
