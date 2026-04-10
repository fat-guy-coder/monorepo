<template>
  <div class="http2-multiplexing">
    <header class="header">
      <div class="header-content">
        <h1>🚀 HTTP/2 多路复用 (Multiplexing)</h1>
        <p>突破HTTP/1.1性能瓶颈的关键技术</p>
      </div>
      <div class="protocol-visualization">
        <div class="protocol-comparison">
          <div class="http1">
            <div class="protocol-title">HTTP/1.1</div>
            <div class="connection">
              <div class="pipe" v-for="i in 6" :key="'http1-' + i"></div>
            </div>
          </div>
          <div class="http2">
            <div class="protocol-title">HTTP/2</div>
            <div class="connection">
              <div class="multiplexed-pipe"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>多路复用概念</h2>
        </div>
        <div class="concept-content">
          <div class="definition-card">
            <p>
              <strong>HTTP/2 多路复用</strong> 允许在单个TCP连接上并行发送多个请求和响应消息。
              不同于HTTP/1.1的"线头阻塞"问题，HTTP/2通过二进制分帧层实现了真正的请求/响应并行，
              显著提高了Web性能。
            </p>
          </div>

          <div class="comparison">
            <h3>HTTP/1.1 vs HTTP/2 请求对比</h3>
            <div class="comparison-grid">
              <div class="comparison-card">
                <div class="comparison-title">HTTP/1.1</div>
                <div class="comparison-details">
                  <ul>
                    <li>多个TCP连接（通常6个）</li>
                    <li>顺序请求处理</li>
                    <li>线头阻塞（Head-of-Line Blocking）</li>
                    <li>高延迟</li>
                    <li>高TCP连接开销</li>
                  </ul>
                </div>
              </div>
              <div class="comparison-card">
                <div class="comparison-title">HTTP/2</div>
                <div class="comparison-details">
                  <ul>
                    <li>单一持久化TCP连接</li>
                    <li>并行请求/响应处理</li>
                    <li>无队头阻塞</li>
                    <li>低延迟</li>
                    <li>高效连接利用率</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术原理 -->
      <section class="tech-section">
        <div class="section-header">
          <div class="section-icon">⚙️</div>
          <h2>技术原理</h2>
        </div>

        <div class="tech-content">
          <div class="frame-layer">
            <h3>二进制分帧层</h3>
            <p>HTTP/2 将通信分解为帧（Frame），每个帧都有特定的类型和用途：</p>

            <div class="frame-types">
              <div class="frame-card" v-for="frame in frameTypes" :key="frame.type">
                <div class="frame-header">{{ frame.type }}</div>
                <div class="frame-desc">{{ frame.description }}</div>
              </div>
            </div>

            <div class="multiplexing-process">
              <h4>多路复用流程</h4>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h5>建立连接</h5>
                    <p>客户端通过TLS ALPN协商建立HTTP/2连接</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h5>请求分解</h5>
                    <p>请求被分解为多个帧（HEADERS + DATA）</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h5>帧传输</h5>
                    <p>帧通过流（Stream）在单个连接上交错传输</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h5>服务器重组</h5>
                    <p>服务器根据流ID重组帧为完整请求</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h5>响应处理</h5>
                    <p>响应同样分解为帧并发回客户端</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置启用 -->
      <section class="config-section">
        <div class="section-header">
          <div class="section-icon">🔧</div>
          <h2>配置启用</h2>
        </div>

        <div class="config-tabs">
          <button v-for="(server, index) in servers" :key="index"
            :class="['config-tab', { active: activeConfigTab === index }]" @click="activeConfigTab = index">
            {{ server.name }}
          </button>
        </div>

        <div class="config-content">
          <div class="config-example">
            <h3>{{ servers[activeConfigTab].configTitle }}</h3>
            <pre>{{ servers[activeConfigTab].configCode }}</pre>
            <div class="config-notes">
              <p v-for="(note, index) in servers[activeConfigTab].notes" :key="index">{{ note }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <div class="section-header">
          <div class="section-icon">💡</div>
          <h2>使用场景</h2>
        </div>

        <div class="usage-grid">
          <div class="usage-card" v-for="(scenario, index) in usageScenarios" :key="index">
            <div class="usage-icon">{{ scenario.icon }}</div>
            <h3>{{ scenario.title }}</h3>
            <p>{{ scenario.description }}</p>
            <div class="benefit-badge">
              <span>性能提升: {{ scenario.benefit }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能对比 -->
      <section class="performance-section">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>性能对比</h2>
        </div>

        <div class="performance-chart">
          <div class="chart-header">
            <div class="metric">加载时间 (ms)</div>
            <div class="http1-bar">HTTP/1.1</div>
            <div class="http2-bar">HTTP/2</div>
          </div>

          <div class="chart-row" v-for="(item, index) in performanceData" :key="index">
            <div class="metric-name">{{ item.metric }}</div>
            <div class="chart-bars">
              <div class="http1-bar" :style="{ width: item.http1 + '%' }">
                <span>{{ item.http1 }}ms</span>
              </div>
              <div class="http2-bar" :style="{ width: item.http2 + '%' }">
                <span>{{ item.http2 }}ms</span>
              </div>
            </div>
          </div>
        </div>

        <div class="performance-summary">
          <div class="summary-card">
            <div class="summary-value">40-60%</div>
            <div class="summary-label">页面加载时间减少</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">50%</div>
            <div class="summary-label">服务器资源节省</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">30-50%</div>
            <div class="summary-label">带宽消耗减少</div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="pros-cons-section">
        <div class="section-header">
          <div class="section-icon">⚖️</div>
          <h2>优缺点分析</h2>
        </div>

        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <div class="icon">✔️</div>
                <div>{{ pro }}</div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <div class="icon">⚠️</div>
                <div>{{ con }}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="summary">
          <h3>HTTP/2多路复用总结</h3>
          <p>
            HTTP/2多路复用技术通过二进制分帧和流机制，解决了HTTP/1.1的线头阻塞问题，
            显著提升了Web应用的性能和效率。在现代Web开发中，启用HTTP/2已成为性能优化的关键步骤。
          </p>
        </div>
        <div class="footer-links">
          <a href="https://http2.github.io/" target="_blank">HTTP/2官方规范</a>
          <a href="https://developers.google.com/web/fundamentals/performance/http2" target="_blank">Google HTTP/2指南</a>
          <a href="https://httpwg.org/specs/rfc7540.html" target="_blank">RFC 7540文档</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeConfigTab = ref(0);

const frameTypes = [
  { type: 'HEADERS', description: '包含HTTP头部信息' },
  { type: 'DATA', description: '包含请求/响应主体' },
  { type: 'SETTINGS', description: '配置连接参数' },
  { type: 'PRIORITY', description: '设置流优先级' },
  { type: 'RST_STREAM', description: '终止流' },
  { type: 'PUSH_PROMISE', description: '服务器推送资源' }
];

const servers = [
  {
    name: 'Nginx',
    configTitle: '启用HTTP/2',
    configCode: `# 在HTTPS服务器块中添加http2参数
server {
  listen 443 ssl http2;  # 启用HTTP/2
  server_name example.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/private.key;

  # 推荐配置
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
  ssl_prefer_server_ciphers on;

  # 其他配置...
}`,
    notes: [
      '★ 需要Nginx 1.9.5及以上版本',
      '★ 必须启用HTTPS才能使用HTTP/2',
      '★ 使用 nginx -V 检查是否包含 --with-http_v2_module'
    ]
  },
  {
    name: 'Apache',
    configTitle: '启用HTTP/2模块',
    configCode: `# 启用HTTP/2模块
LoadModule http2_module modules/mod_http2.so

# 在虚拟主机配置中
<VirtualHost *:443>
  ServerName example.com

  # 启用HTTP/2
  Protocols h2 http/1.1

  # 强制使用HTTP/2
  H2Direct on

  # 服务器推送配置
  H2Push on
  H2PushPriority * after

  # TLS配置
  SSLEngine on
  SSLCertificateFile /path/to/cert.pem
  SSLCertificateKeyFile /path/to/private.key

  # 其他配置...
</VirtualHost>`,
    notes: [
      '★ 需要Apache 2.4.17及以上版本',
      '★ 启用模块: a2enmod http2',
      '★ 使用 mod_ssl 提供HTTPS支持'
    ]
  },
  {
    name: 'Node.js',
    configTitle: '使用spdy或http2模块',
    configCode: `const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  allowHTTP1: true // 同时支持HTTP/1.1
});

server.on('stream', (stream, headers) => {
  // 处理请求流
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });

  stream.end('<h1>Hello HTTP/2!</h1>');
});

// 服务器推送示例
server.on('request', (req, res) => {
  if (req.url === '/') {
    const push = res.push('/styles.css');
    push.writeHead(200);
    push.end('body { background: #fff; }');

    res.writeHead(200);
    res.end('<link rel="stylesheet" href="/styles.css">');
  }
});

server.listen(443, () => {
  console.log('HTTP/2 server running on port 443');
});`,
    notes: [
      '★ Node.js 8.4.0+ 内置http2模块',
      '★ 或使用spdy模块（已弃用）',
      '★ 建议使用HTTP/2 over TLS (HTTPS)'
    ]
  }
];

const usageScenarios = [
  {
    icon: '🌐',
    title: '内容密集型网站',
    description: '包含大量资源（图片、CSS、JS）的现代网站',
    benefit: '40-60%'
  },
  {
    icon: '📱',
    title: '移动端应用',
    description: '高延迟网络环境下的移动Web应用',
    benefit: '50-70%'
  },
  {
    icon: '🛒',
    title: '电商平台',
    description: '需要快速加载大量产品图片的电商网站',
    benefit: '35-55%'
  },
  {
    icon: '🎮',
    title: '实时应用',
    description: '需要低延迟的实时游戏和交互应用',
    benefit: '30-50%'
  },
  {
    icon: '📹',
    title: '媒体流服务',
    description: '视频/音频流媒体服务',
    benefit: '25-40%'
  },
  {
    icon: '📊',
    title: '仪表盘应用',
    description: '需要同时加载多个数据源的监控仪表盘',
    benefit: '45-65%'
  }
];

const performanceData = [
  { metric: '连接建立', http1: 300, http2: 300 },
  { metric: 'SSL握手', http1: 400, http2: 400 },
  { metric: '请求排队', http1: 600, http2: 50 },
  { metric: '资源加载', http1: 1200, http2: 500 },
  { metric: '页面渲染', http1: 200, http2: 200 },
  { metric: '总时间', http1: 2700, http2: 1450 }
];

const pros = [
  '消除HTTP/1.1的线头阻塞问题',
  '减少TCP连接数量，降低服务器负载',
  '通过单一连接实现并行请求',
  '降低延迟，提高页面加载速度',
  '支持请求优先级设置',
  '头部压缩（HPACK）减少开销',
  '支持服务器推送（Server Push）'
];

const cons = [
  '需要HTTPS加密（实践中）',
  '中间设备支持可能不完善',
  'TCP层仍可能发生拥塞（TCP HOL阻塞）',
  '调试和问题排查更复杂',
  '旧版浏览器不支持（IE11及更早版本）',
  '服务器配置更复杂',
  '对长距离高延迟网络改善有限'
];
</script>

<style lang="less" scoped>


.http2-multiplexing {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(120deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  color: white;

  .header-content {
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      color: #dbeafe;
      margin-top: 0;
    }
  }
}

.protocol-visualization {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.protocol-comparison {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.http1,
.http2 {
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.protocol-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
}

.connection {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
}

.pipe {
  height: 8px;
  background: linear-gradient(90deg, #93c5fd, #60a5fa);
  margin-bottom: 0.8rem;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 20px;
    background: rgba(255, 255, 255, 0.5);
    animation: moveLight 2s infinite linear;
  }
}

@keyframes moveLight {
  0% {
    left: -20px;
  }

  100% {
    left: 100%;
  }
}

.multiplexed-pipe {
  height: 150px;
  background: linear-gradient(90deg, #86efac, #4ade80);
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 20px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: moveLight 1.5s infinite linear;
  }
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #e0f2fe 0%, #bae6fd 100%);
  border-bottom: 2px solid #7dd3fc;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #0369a1;
  }

  .section-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    background: #0ea5e9;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}

.concept-section {
  .concept-content {
    padding: 2rem;
  }
}

.definition-card {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #0ea5e9;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0;

    strong {
      color: #0369a1;
    }
  }
}

.comparison {
  h3 {
    color: #0369a1;
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
  }

  .comparison-title {
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #bae6fd;

    &:first-child {
      color: #ef4444;
    }

    &:last-child {
      color: #10b981;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 0;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: flex-start;

      &:last-child {
        border-bottom: none;
      }

      &::before {
        content: '•';
        color: #0ea5e9;
        font-weight: bold;
        display: inline-block;
        width: 1.5rem;
        margin-left: -1.5rem;
      }
    }
  }
}

.tech-section {
  .tech-content {
    padding: 2rem;
  }
}

.frame-layer {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    color: #0369a1;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
}

.frame-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.frame-card {
  background: white;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(14, 165, 233, 0.1);
  }

  .frame-header {
    font-weight: 700;
    color: #075985;
    margin-bottom: 0.5rem;
    font-family: 'Fira Code', monospace;
  }

  .frame-desc {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.multiplexing-process {
  h4 {
    color: #075985;
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  .step-number {
    width: 40px;
    height: 40px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }

  .step-content {
    h5 {
      color: #075985;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    p {
      color: #4b5563;
      margin: 0;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}

.config-section {
  .config-tabs {
    display: flex;
    padding: 0 2rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e5e7eb;
  }
}

.config-tab {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #e0f2fe;
    color: #0369a1;
  }

  &.active {
    background: white;
    color: #0369a1;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #0ea5e9;
    }
  }
}

.config-content {
  padding: 1.5rem 2rem;
}

.config-example {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 1.5rem;

    code {
      display: block;
    }
  }
}

.config-notes {
  p {
    padding: 0.8rem;
    background: #fffbeb;
    border-radius: 6px;
    color: #92400e;
    border-left: 3px solid #f59e0b;

    &::before {
      content: '★';
      margin-right: 0.5rem;
    }
  }
}

.usage-section {
  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.usage-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
  }

  .usage-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: #0ea5e9;
  }

  h3 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin: 0 0 1.5rem;
    line-height: 1.6;
  }
}

.benefit-badge {
  background: linear-gradient(90deg, #86efac, #4ade80);
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
}

.performance-section {
  .performance-chart {
    padding: 1.5rem 2rem;
  }
}

.chart-header {
  display: flex;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #075985;

  .metric {
    width: 150px;
  }

  .http1-bar,
  .http2-bar {
    flex: 1;
    text-align: center;
  }
}

.chart-row {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;

  .metric-name {
    width: 150px;
    font-weight: 500;
    color: #4b5563;
  }

  .chart-bars {
    flex: 1;
    display: flex;
    height: 40px;
  }
}

.http1-bar {
  background: linear-gradient(90deg, #fca5a5, #ef4444);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  color: white;
  font-weight: 500;
  transition: width 1s ease;
}

.http2-bar {
  background: linear-gradient(90deg, #86efac, #22c55e);
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: white;
  font-weight: 500;
  transition: width 1s ease;
}

.performance-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem 2rem;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  .summary-value {
    font-size: 2rem;
    font-weight: 700;
    color: #0ea5e9;
    margin-bottom: 0.5rem;
  }

  .summary-label {
    color: #4b5563;
    font-size: 1.1rem;
  }
}

.pros-cons-section {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 0 2rem 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.pros,
.cons {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #bae6fd;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    padding: 0.8rem 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .icon {
      margin-right: 0.8rem;
      font-size: 1.2rem;
      width: 24px;
      flex-shrink: 0;
    }
  }
}

.pros {
  border-left: 4px solid #10b981;

  h3 {
    color: #10b981;
  }

  li {
    color: #047857;
  }
}

.cons {
  border-left: 4px solid #ef4444;

  h3 {
    color: #ef4444;
  }

  li {
    color: #b91c1c;
  }
}

.footer {
  background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 2rem;

  .summary {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #e0f2fe;
    }

    p {
      font-size: 1.1rem;
      color: #cbd5e1;
      line-height: 1.7;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

    a {
      color: #7dd3fc;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      border: 1px solid #334155;
      transition: all 0.3s ease;

      &:hover {
        background: #0ea5e9;
        color: white;
        border-color: #0ea5e9;
      }
    }
  }
}

@media (max-width: 768px) {
  .http2-multiplexing {
    padding: 1rem;
  }

  .header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .section-header {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
