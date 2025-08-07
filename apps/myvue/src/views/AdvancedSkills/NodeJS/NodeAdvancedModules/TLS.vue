<template>
  <div class="tls-container">
    <header class="header">
      <div class="logo-container">
        <div class="node-logo">
          <div class="hexagon"></div>
          <div class="inner-hexagon"></div>
          <div class="node-text">JS</div>
        </div>
        <div class="title-container">
          <h1>Node.js TLS 模块指南</h1>
          <p class="subtitle">实现安全的网络通信传输</p>
        </div>
      </div>
      <div class="security-badge">
        <div class="lock-icon">🔒</div>
        <div>安全通信</div>
      </div>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <div class="section-title">核心主题</div>
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
            <span class="badge">{{ item.badge }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- TLS 概念 -->
        <section v-show="activeSection === 'concept'" class="section">
          <div class="section-header">
            <h2>TLS 基础概念</h2>
            <div class="tag">加密通信</div>
          </div>

          <div class="card">
            <div class="concept-grid">
              <div class="concept-card">
                <div class="concept-icon">🔐</div>
                <h3>什么是 TLS？</h3>
                <p>传输层安全性协议 (Transport Layer Security) 是用于在计算机网络中提供安全通信的加密协议。</p>
              </div>
              <div class="concept-card">
                <div class="concept-icon">🛡️</div>
                <h3>TLS 的作用</h3>
                <p>提供数据加密、身份验证和消息完整性验证，防止窃听、篡改和中间人攻击。</p>
              </div>
              <div class="concept-card">
                <div class="concept-icon">🔑</div>
                <h3>TLS vs SSL</h3>
                <p>TLS 是 SSL 的继任者，Node.js 的 tls 模块实现了 TLS 协议，支持 SSL 仅为了兼容性。</p>
              </div>
            </div>

            <div class="tls-process">
              <h3>TLS 握手过程</h3>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>客户端 Hello</h4>
                    <p>客户端发送支持的 TLS 版本、加密套件列表和随机数</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>服务器 Hello</h4>
                    <p>服务器选择 TLS 版本和加密套件，发送证书和随机数</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>验证与密钥交换</h4>
                    <p>客户端验证证书，生成预主密钥并用服务器公钥加密发送</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>完成握手</h4>
                    <p>双方计算会话密钥，交换加密完成消息，开始安全通信</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="encryption-demo">
              <h3>加密原理演示</h3>
              <div class="encryption-flow">
                <div class="client">
                  <div class="label">客户端</div>
                  <div class="message plain">明文数据</div>
                  <div class="arrow">↓</div>
                  <div class="message encrypted">加密数据</div>
                  <div class="arrow">↓</div>
                  <div class="message sent">发送</div>
                </div>

                <div class="network">
                  <div class="insecure">不安全网络</div>
                  <div class="hacker">攻击者无法解密</div>
                </div>

                <div class="server">
                  <div class="label">服务器</div>
                  <div class="message received">接收</div>
                  <div class="arrow">↓</div>
                  <div class="message encrypted">加密数据</div>
                  <div class="arrow">↓</div>
                  <div class="message plain">明文数据</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TLS 作用 -->
        <section v-show="activeSection === 'benefits'" class="section">
          <div class="section-header">
            <h2>TLS 的核心作用</h2>
            <div class="tag">安全保障</div>
          </div>

          <div class="card">
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="benefit-icon">🔒</div>
                <h3>数据加密</h3>
                <p>使用对称加密算法（如 AES）对传输数据进行加密，防止数据在传输过程中被窃取。</p>
                <div class="algorithms">
                  <div class="algorithm">AES-256-GCM</div>
                  <div class="algorithm">CHACHA20-POLY1305</div>
                  <div class="algorithm">AES-128-CCM</div>
                </div>
              </div>

              <div class="benefit-card">
                <div class="benefit-icon">🆔</div>
                <h3>身份认证</h3>
                <p>通过数字证书验证通信双方的身份，防止中间人攻击。</p>
                <div class="certificate-flow">
                  <div class="cert-step">
                    <div class="step-label">客户端</div>
                    <div class="step-action">请求证书</div>
                  </div>
                  <div class="arrow">→</div>
                  <div class="cert-step">
                    <div class="step-label">服务器</div>
                    <div class="step-action">发送证书</div>
                  </div>
                  <div class="arrow">→</div>
                  <div class="cert-step">
                    <div class="step-label">客户端</div>
                    <div class="step-action">验证证书</div>
                  </div>
                </div>
              </div>

              <div class="benefit-card">
                <div class="benefit-icon">✋</div>
                <h3>完整性保护</h3>
                <p>使用消息认证码（MAC）确保数据在传输过程中未被篡改。</p>
                <div class="integrity-demo">
                  <div class="original">原始数据</div>
                  <div class="arrow">+ HMAC →</div>
                  <div class="protected">受保护数据</div>
                  <div class="arrow">传输</div>
                  <div class="check">验证 HMAC</div>
                </div>
              </div>
            </div>

            <div class="security-levels">
              <h3>安全级别对比</h3>
              <div class="comparison">
                <div class="comparison-row header">
                  <div class="comparison-cell">特性</div>
                  <div class="comparison-cell">HTTP</div>
                  <div class="comparison-cell">HTTPS (TLS)</div>
                </div>
                <div class="comparison-row">
                  <div class="comparison-cell">数据加密</div>
                  <div class="comparison-cell danger">❌ 无</div>
                  <div class="comparison-cell success">✅ 强加密</div>
                </div>
                <div class="comparison-row">
                  <div class="comparison-cell">身份验证</div>
                  <div class="comparison-cell danger">❌ 无</div>
                  <div class="comparison-cell success">✅ 证书验证</div>
                </div>
                <div class="comparison-row">
                  <div class="comparison-cell">完整性保护</div>
                  <div class="comparison-cell warning">⚠️ 有限</div>
                  <div class="comparison-cell success">✅ 完整保护</div>
                </div>
                <div class="comparison-row">
                  <div class="comparison-cell">防止窃听</div>
                  <div class="comparison-cell danger">❌ 无</div>
                  <div class="comparison-cell success">✅ 有效防止</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TLS API -->
        <section v-show="activeSection === 'api'" class="section">
          <div class="section-header">
            <h2>TLS 模块核心 API</h2>
            <div class="tag">编程接口</div>
          </div>

          <div class="card">
            <div class="api-categories">
              <div class="category">
                <h3>服务器 API</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">tls.createServer()</div>
                    <div class="api-desc">创建 TLS 服务器</div>
                    <div class="api-code">
                      <pre><code>const tls = require('tls');
const server = tls.createServer(options, (socket) => {
  // 处理连接
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">server.listen()</div>
                    <div class="api-desc">启动服务器监听端口</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">server.addContext()</div>
                    <div class="api-desc">为特定主机名添加证书</div>
                  </div>
                </div>
              </div>

              <div class="category">
                <h3>客户端 API</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">tls.connect()</div>
                    <div class="api-desc">连接到 TLS 服务器</div>
                    <div class="api-code">
                      <pre><code>const socket = tls.connect({
  host: 'example.com',
  port: 443,
  rejectUnauthorized: true
}, () => {
  console.log('连接已加密');
});</code></pre>
                    </div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">socket.write()</div>
                    <div class="api-desc">发送加密数据</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">socket.end()</div>
                    <div class="api-desc">安全关闭连接</div>
                  </div>
                </div>
              </div>

              <div class="category">
                <h3>证书工具</h3>
                <div class="api-list">
                  <div class="api-item">
                    <div class="api-name">tls.createSecureContext()</div>
                    <div class="api-desc">创建安全上下文</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">tls.createSecurePair()</div>
                    <div class="api-desc">创建安全套接字对</div>
                  </div>
                  <div class="api-item">
                    <div class="api-name">tls.checkServerIdentity()</div>
                    <div class="api-desc">验证服务器身份</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="full-example">
              <h3>完整示例：TLS 服务器与客户端</h3>
              <div class="example-tabs">
                <div class="tab" :class="{ active: activeTab === 'server' }" @click="activeTab = 'server'">服务器代码</div>
                <div class="tab" :class="{ active: activeTab === 'client' }" @click="activeTab = 'client'">客户端代码</div>
                <div class="tab" :class="{ active: activeTab === 'cert' }" @click="activeTab = 'cert'">证书生成</div>
              </div>

              <div class="example-content">
                <div v-if="activeTab === 'server'" class="code-block">
                  <pre><code>const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),

  // 要求客户端提供证书
  requestCert: true,

  // 拒绝未通过验证的客户端
  rejectUnauthorized: true
};

const server = tls.createServer(options, (socket) => {
  console.log('服务器已连接',
    socket.authorized ? '已授权' : '未授权');

  socket.on('data', (data) => {
    console.log('收到数据:', data.toString());
    socket.write('已收到你的消息');
  });
});

server.listen(8000, () => {
  console.log('服务器在 8000 端口监听');
});</code></pre>
                </div>

                <div v-if="activeTab === 'client'" class="code-block">
                  <pre><code>const tls = require('tls');
const fs = require('fs');

const options = {
  host: 'localhost',
  port: 8000,

  // 客户端证书
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),

  // 服务器 CA 证书
  ca: [fs.readFileSync('server-ca.pem')],

  // 验证服务器证书
  rejectUnauthorized: true
};

const socket = tls.connect(options, () => {
  console.log('客户端已连接',
    socket.authorized ? '已授权' : '未授权');

  socket.write('Hello TLS Server');
});

socket.on('data', (data) => {
  console.log('服务器响应:', data.toString());
  socket.end();
});</code></pre>
                </div>

                <div v-if="activeTab === 'cert'" class="code-block">
                  <pre><code># 生成 CA 私钥
openssl genrsa -out ca-key.pem 4096

# 生成 CA 证书
openssl req -new -x509 -days 365 -key ca-key.pem -out ca-cert.pem

# 生成服务器私钥
openssl genrsa -out server-key.pem 4096

# 生成服务器证书签名请求 (CSR)
openssl req -new -key server-key.pem -out server.csr

# 使用 CA 签署服务器证书
openssl x509 -req -days 365 -in server.csr -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem

# 生成客户端私钥和证书（类似服务器步骤）
# ...</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section v-show="activeSection === 'usecases'" class="section">
          <div class="section-header">
            <h2>TLS 使用场景</h2>
            <div class="tag">实际应用</div>
          </div>

          <div class="card">
            <div class="use-cases">
              <div class="use-case">
                <div class="case-icon">🌐</div>
                <div class="case-content">
                  <h3>HTTPS 服务器</h3>
                  <p>保护网站数据传输安全，防止敏感信息泄露</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">模块</div>
                      <div class="detail-value">https 模块（基于 tls）</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">证书</div>
                      <div class="detail-value">Let's Encrypt 或其他 CA</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">📡</div>
                <div class="case-content">
                  <h3>API 安全通信</h3>
                  <p>保护微服务之间的 API 调用，确保数据传输安全</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">认证</div>
                      <div class="detail-value">双向证书认证</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">协议</div>
                      <div class="detail-value">gRPC over TLS</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">📦</div>
                <div class="case-content">
                  <h3>数据库安全连接</h3>
                  <p>保护数据库连接，防止凭证和数据泄露</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">数据库</div>
                      <div class="detail-value">PostgreSQL, MySQL, MongoDB</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">配置</div>
                      <div class="detail-value">ssl: true 选项</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="use-case">
                <div class="case-icon">🔌</div>
                <div class="case-content">
                  <h3>安全消息队列</h3>
                  <p>保护消息队列通信，确保消息完整性和机密性</p>
                  <div class="case-detail">
                    <div class="detail-item">
                      <div class="detail-label">技术</div>
                      <div class="detail-value">RabbitMQ, Kafka with TLS</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">优势</div>
                      <div class="detail-value">端到端加密</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="best-practices">
              <h3>最佳实践</h3>
              <div class="practices-grid">
                <div class="practice">
                  <div class="practice-icon">🔏</div>
                  <h4>使用强加密套件</h4>
                  <p>优先选择 ECDHE 密钥交换和 AES-GCM 加密算法</p>
                </div>
                <div class="practice">
                  <div class="practice-icon">📅</div>
                  <h4>定期更新证书</h4>
                  <p>设置提醒在证书到期前更新，避免服务中断</p>
                </div>
                <div class="practice">
                  <div class="practice-icon">🔄</div>
                  <h4>启用 OCSP Stapling</h4>
                  <p>减少握手时间，提高性能</p>
                </div>
                <div class="practice">
                  <div class="practice-icon">📊</div>
                  <h4>监控与日志</h4>
                  <p>记录 TLS 握手失败和证书验证问题</p>
                </div>
              </div>
            </div>

            <div class="tls-config">
              <h3>推荐配置选项</h3>
              <div class="config-block">
                <pre><code>const tlsOptions = {
  minVersion: 'TLSv1.2', // 最低 TLS 1.2
  maxVersion: 'TLSv1.3', // 支持 TLS 1.3
  ciphers: [
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES256-GCM-SHA384',
    // 禁用不安全的加密套件
  ].join(':'),
  honorCipherOrder: true,
  rejectUnauthorized: true, // 验证证书
  requestCert: true, // 要求客户端证书
};</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">Node.js TLS</div>
        <div class="footer-links">
          <a href="#">Node.js 文档</a>
          <a href="#">TLS/SSL 指南</a>
          <a href="#">加密最佳实践</a>
          <a href="#">证书管理</a>
        </div>
      </div>
      <div class="footer-copyright">
        <p>© 2023 Node.js TLS 模块指南 | 使用 Vue3 制作</p>
        <p>Node.js 是 OpenJS Foundation 的商标</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: 'TLS 概念', badge: '基础' },
  { id: 'benefits', title: '核心作用', badge: '安全' },
  { id: 'api', title: 'API 基础介绍', badge: '编程' },
  { id: 'usecases', title: '使用场景', badge: '实践' }
]);

// 当前活动部分
const activeSection = ref('concept');

// 示例标签页
const activeTab = ref('server');
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
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;
@tls-blue: #1a73e8;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.tls-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

  .security-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-weight: 500;
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: lighten(@primary-color, 50%);
    }

    &.active {
      background-color: lighten(@primary-color, 45%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }

    .badge {
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 10px;
      font-weight: 500;
      background: lighten(@primary-color, 40%);
      color: darken(@primary-color, 25%);
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
  background: lighten(@tls-blue, 40%);
  color: darken(@tls-blue, 15%);
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

.tls-process {
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
      background: lighten(@tls-blue, 50%);
      border-radius: 10px;
      padding: 1.25rem;

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: @tls-blue;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
      }
    }
  }
}

.encryption-demo {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;

  .encryption-flow {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;

    .client,
    .server {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .label {
        font-weight: 600;
        color: @primary-dark;
      }

      .message {
        width: 100%;
        text-align: center;
        padding: 0.75rem;
        border-radius: 8px;
        font-weight: 500;

        &.plain {
          background: lighten(@success-color, 45%);
          border: 1px solid @success-color;
        }

        &.encrypted {
          background: lighten(@tls-blue, 40%);
          border: 1px solid @tls-blue;
        }

        &.sent,
        &.received {
          background: lighten(@warning-color, 40%);
          border: 1px solid @warning-color;
        }
      }

      .arrow {
        color: @text-secondary;
        font-size: 1.25rem;
      }
    }

    .network {
      width: 35%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .insecure {
        background: lighten(@error-color, 40%);
        border: 1px solid @error-color;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
      }

      .hacker {
        background: #f8f9fa;
        border: 1px dashed @error-color;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        color: @error-color;
        font-size: 0.9rem;
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .benefit-card {
    background: @card-bg;
    border-radius: 10px;
    padding: 1.5rem;
    .box-shadow;

    .benefit-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: @tls-blue;
    }

    .algorithms {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;

      .algorithm {
        background: lighten(@tls-blue, 50%);
        color: darken(@tls-blue, 15%);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
      }
    }

    .certificate-flow {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .cert-step {
        text-align: center;
        width: 30%;

        .step-label {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .step-action {
          background: lighten(@success-color, 45%);
          border: 1px solid @success-color;
          border-radius: 6px;
          padding: 0.5rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }
      }

      .arrow {
        align-self: center;
        color: @text-secondary;
        font-weight: bold;
      }
    }

    .integrity-demo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.9rem;

      .original,
      .protected {
        background: lighten(@success-color, 45%);
        border: 1px solid @success-color;
        padding: 0.5rem;
        border-radius: 6px;
      }

      .arrow {
        color: @text-secondary;
      }

      .check {
        background: lighten(@tls-blue, 40%);
        border: 1px solid @tls-blue;
        padding: 0.5rem;
        border-radius: 6px;
      }
    }
  }
}

.security-levels {
  margin-top: 2rem;

  .comparison {
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 1rem;

    .comparison-row {
      display: flex;

      &.header {
        font-weight: 600;
        background: lighten(@tls-blue, 50%);

        .comparison-cell {
          border-bottom: 1px solid @border-color;
        }
      }

      .comparison-cell {
        flex: 1;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid @border-color;

        &:not(:last-child) {
          border-right: 1px solid @border-color;
        }

        &.success {
          background: lighten(@success-color, 50%);
          color: darken(@success-color, 20%);
        }

        &.warning {
          background: lighten(@warning-color, 50%);
          color: darken(@warning-color, 20%);
        }

        &.danger {
          background: lighten(@error-color, 45%);
          color: darken(@error-color, 20%);
        }
      }

      &:last-child .comparison-cell {
        border-bottom: none;
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
      color: @tls-blue;
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

.best-practices {
  margin-top: 2rem;

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .practice {
      background: lighten(@primary-color, 52%);
      border-radius: 10px;
      padding: 1.25rem;
      text-align: center;

      .practice-icon {
        font-size: 2rem;
        margin-bottom: 0.75rem;
      }
    }
  }
}

.tls-config {
  margin-top: 2rem;

  .config-block {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    font-size: 0.95rem;

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
      color: #2f363d;
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

    .security-badge {
      margin-top: 1rem;
    }
  }

  .encryption-flow {
    flex-direction: column;
    gap: 2rem !important;

    .client,
    .server,
    .network {
      width: 100% !important;
    }
  }
}

@media (max-width: 768px) {
  .header .title-container h1 {
    font-size: 1.8rem;
  }

  .content-container {
    padding: 1rem;
  }
}
</style>
