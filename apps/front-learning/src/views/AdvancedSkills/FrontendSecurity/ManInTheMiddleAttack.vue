<template>
  <div class="mitm-container">
    <header class="header">
      <h1>前端安全：中间人攻击基本介绍</h1>
      <p>保护您的应用免受网络通信中的安全威胁</p>
    </header>

    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-value">68%</div>
        <div class="stat-label">公共WiFi存在中间人攻击风险</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">42%</div>
        <div class="stat-label">网站未完全启用HTTPS</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3.5秒</div>
        <div class="stat-label">平均攻击建立时间</div>
      </div>
    </div>

    <div class="content-section">
      <div class="content-column">
        <section class="explanation-section">
          <h2>什么是中间人攻击？</h2>
          <div class="definition-card">
            <p>中间人攻击(Man-in-the-Middle Attack, MitM)是指攻击者秘密介入两个通信系统之间，拦截、监视或篡改通信数据。</p>
            <p>在Web应用中，攻击者通常位于用户浏览器和目标服务器之间，能够：</p>
            <ul>
              <li>窃取登录凭证和个人信息</li>
              <li>篡改网页内容</li>
              <li>注入恶意脚本</li>
              <li>重定向用户到钓鱼网站</li>
            </ul>
          </div>

          <div class="attack-flow">
            <h3>中间人攻击流程</h3>
            <div class="flow-diagram">
              <div class="entity user">
                <div class="icon">👤</div>
                <div class="label">用户</div>
              </div>
              <div class="connection">← 安全连接 →</div>
              <div class="entity server">
                <div class="icon">🌐</div>
                <div class="label">服务器</div>
              </div>

              <div class="mitm-position">
                <div class="attacker">🕵️♂️</div>
                <div class="label">攻击者介入</div>
              </div>

              <div class="compromised-flow">
                <div class="connection">← 用户 ↔ 攻击者 →</div>
                <div class="connection">← 攻击者 ↔ 服务器 →</div>
              </div>
            </div>
          </div>

          <div class="vulnerability-types">
            <h3>常见中间人攻击技术</h3>
            <div class="vuln-grid">
              <div class="vuln-card">
                <div class="vuln-icon">📡</div>
                <h4>ARP欺骗</h4>
                <p>攻击者伪造MAC地址，将网络流量重定向到自己的设备</p>
              </div>
              <div class="vuln-card">
                <div class="vuln-icon">📶</div>
                <h4>WiFi监听</h4>
                <p>在公共WiFi上监听未加密的网络流量</p>
              </div>
              <div class="vuln-card">
                <div class="vuln-icon">🔑</div>
                <h4>SSL剥离</h4>
                <p>将HTTPS连接降级为HTTP</p>
              </div>
              <div class="vuln-card">
                <div class="vuln-icon">📝</div>
                <h4>证书伪造</h4>
                <p>使用自签名证书冒充合法网站</p>
              </div>
            </div>
          </div>
        </section>

        <section class="attack-demo">
          <h2>中间人攻击演示</h2>
          <div class="demo-container">
            <div class="demo-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>网络监听</h3>
                <p>攻击者使用工具监听网络流量</p>
                <pre><code># 使用Wireshark捕获网络包
wireshark -i wlan0 -k</code></pre>
              </div>
            </div>

            <div class="demo-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>ARP欺骗</h3>
                <p>攻击者发送虚假ARP响应</p>
                <pre><code># 使用arpspoof进行ARP欺骗
arpspoof -i eth0 -t 192.168.1.100 192.168.1.1</code></pre>
              </div>
            </div>

            <div class="demo-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>流量劫持</h3>
                <p>拦截和修改HTTP流量</p>
                <pre><code># 使用mitmproxy拦截HTTP
mitmproxy -T --host</code></pre>
              </div>
            </div>

            <div class="demo-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>HTTPS攻击</h3>
                <p>使用伪造证书进行HTTPS中间人攻击</p>
                <pre><code># 生成伪造证书
openssl req -new -x509 -keyout ca.key -out ca.crt

# 配置mitmproxy使用伪造证书
mitmproxy --certs *=ca.crt</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="content-column">
        <section class="protection-section">
          <h2>中间人攻击防护策略</h2>

          <div class="strategy-card">
            <h3>1. 强制使用HTTPS</h3>
            <ul>
              <li>使用HSTS强制浏览器使用HTTPS</li>
              <li>部署全站HTTPS</li>
              <li>启用HTTP严格传输安全</li>
            </ul>
            <pre><code># Nginx配置HTTPS重定向
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}

# 启用HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;</code></pre>
          </div>

          <div class="strategy-card">
            <h3>2. 安全证书配置</h3>
            <ul>
              <li>使用可信CA颁发的证书</li>
              <li>启用证书钉扎(HPKP)</li>
              <li>配置完善的证书链</li>
            </ul>
            <pre><code># 证书链配置示例
ssl_certificate /path/to/fullchain.pem;
ssl_certificate_key /path/to/privkey.pem;

# 启用OCSP装订
ssl_stapling on;
ssl_stapling_verify on;</code></pre>
          </div>

          <div class="strategy-card">
            <h3>3. 内容安全策略</h3>
            <ul>
              <li>实施严格的CSP策略</li>
              <li>阻止混合内容</li>
              <li>启用X-Frame-Options</li>
            </ul>
            <pre><code>// 示例安全头部
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade</code></pre>
          </div>

          <div class="strategy-card">
            <h3>4. 用户端防护</h3>
            <ul>
              <li>教育用户识别安全连接</li>
              <li>警告用户不要忽略证书警告</li>
              <li>推荐使用VPN在公共网络</li>
            </ul>
            <div class="secure-indicators">
              <div class="indicator secure">
                <div class="icon">🔒</div>
                <div class="text">https://example.com</div>
                <div class="status">安全连接</div>
              </div>
              <div class="indicator insecure">
                <div class="icon">⚠️</div>
                <div class="text">http://example.com</div>
                <div class="status">不安全连接</div>
              </div>
              <div class="indicator warning">
                <div class="icon">❗</div>
                <div class="text">https://example.com</div>
                <div class="status">证书无效</div>
              </div>
            </div>
          </div>
        </section>

        <section class="best-practices-section">
          <h2>最佳实践</h2>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-icon">🔐</div>
              <h3>全站HTTPS</h3>
              <p>确保所有资源通过HTTPS加载</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🔄</div>
              <h3>HTTP重定向</h3>
              <p>将所有HTTP请求重定向到HTTPS</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">📋</div>
              <h3>安全头部</h3>
              <p>配置完整的安全响应头</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🔍</div>
              <h3>定期审计</h3>
              <p>使用SSL Labs测试SSL配置</p>
            </div>
          </div>

          <div class="workflow-diagram">
            <h3>防御中间人攻击工作流</h3>
            <div class="workflow-steps">
              <div class="workflow-step">强制HTTPS</div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">配置HSTS</div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">启用安全头部</div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">证书管理</div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">用户教育</div>
            </div>
          </div>
        </section>

        <section class="tools-section">
          <h2>检测与防护工具</h2>
          <div class="tools-grid">
            <div class="tool-card">
              <h3>SSL Labs</h3>
              <p>测试服务器SSL配置</p>
              <div class="tool-link">ssllabs.com</div>
            </div>
            <div class="tool-card">
              <h3>OWASP ZAP</h3>
              <p>中间人攻击测试工具</p>
              <div class="tool-link">owasp.org/zap</div>
            </div>
            <div class="tool-card">
              <h3>Burp Suite</h3>
              <p>专业Web安全测试工具</p>
              <div class="tool-link">portswigger.net</div>
            </div>
            <div class="tool-card">
              <h3>mitmproxy</h3>
              <p>中间人攻击工具（防御测试）</p>
              <div class="tool-link">mitmproxy.org</div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <footer class="footer">
      <p>中间人攻击是Web应用面临的主要威胁之一。通过实施HTTPS、配置安全头部和用户教育，可以显著降低风险。</p>
      <p> 前端安全实践指南 | 最后更新: 2023年10月</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const attackStats = ref([
  { name: "公共WiFi风险", value: 68, unit: "%" },
  { name: "未完全HTTPS", value: 42, unit: "%" },
  { name: "攻击建立时间", value: 3.5, unit: "秒" }
]);
</script>

<style scoped lang="less">


:root {
  --primary: #2c3e50;
  --primary-dark: #1a252f;
  --secondary: #3498db;
  --accent: #e74c3c;
  --success: #2ecc71;
  --warning: #f39c12;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --gray: #95a5a6;
  --border: #bdc3c7;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.mitm-container {
  font-family: 'Inter', sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fb, #eef2f6);
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  padding: 50px 20px;
  margin-bottom: 30px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.2);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin-bottom: 40px;

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    min-width: 220px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 1rem;
      color: var(--dark);
    }
  }
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.content-column {
  >section {
    background: white;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    h2 {
      color: var(--primary-dark);
      margin-bottom: 25px;
      font-size: 1.6rem;
      position: relative;
      padding-bottom: 15px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 4px;
        background: var(--secondary);
        border-radius: 2px;
      }
    }
  }
}

.definition-card {
  background: #f8fafc;
  border-left: 4px solid var(--secondary);
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 30px;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
    margin-top: 15px;

    li {
      padding: 8px 0;
      padding-left: 30px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 15px;
        color: var(--accent);
        font-weight: bold;
      }
    }
  }
}

.attack-flow {
  margin-bottom: 30px;

  h3 {
    color: var(--primary-dark);
    margin-bottom: 20px;
    font-size: 1.3rem;
  }

  .flow-diagram {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: #f8fafc;
    border-radius: 12px;

    .entity {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px 0;

      .icon {
        font-size: 3rem;
        margin-bottom: 10px;
      }

      .label {
        font-weight: 500;
      }
    }

    .connection {
      color: var(--success);
      font-weight: 500;
      margin: 10px 0;
    }

    .mitm-position {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(231, 76, 60, 0.1);
      padding: 15px;
      border-radius: 10px;
      text-align: center;

      .attacker {
        font-size: 2.5rem;
      }

      .label {
        font-weight: 500;
        color: var(--accent);
        margin-top: 5px;
      }
    }

    .compromised-flow {
      margin-top: 20px;
      width: 100%;

      .connection {
        color: var(--accent);
        margin: 5px 0;
      }
    }
  }
}

.vulnerability-types {
  margin-bottom: 30px;

  h3 {
    color: var(--primary-dark);
    margin-bottom: 20px;
    font-size: 1.3rem;
  }

  .vuln-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .vuln-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .vuln-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      h4 {
        color: var(--primary);
        margin-bottom: 10px;
      }

      p {
        font-size: 0.9rem;
        color: var(--gray);
      }
    }
  }
}

.attack-demo {
  .demo-container {
    .demo-step {
      display: flex;
      margin-bottom: 25px;
      align-items: flex-start;

      .step-number {
        width: 36px;
        height: 36px;
        background: var(--secondary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        flex-shrink: 0;
        margin-right: 15px;
        margin-top: 5px;
      }

      .step-content {
        h3 {
          color: var(--primary);
          margin-bottom: 10px;
          font-size: 1.2rem;
        }

        p {
          margin-bottom: 15px;
          color: var(--gray);
        }
      }
    }
  }
}

pre {
  background: var(--primary-dark);
  color: #e0f5f1;
  padding: 18px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  code {
    display: block;
    white-space: pre;
  }
}

.protection-section {
  .strategy-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h3 {
      color: var(--primary);
      margin-bottom: 15px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;

      &::before {
        content: '🛡️';
        margin-right: 10px;
      }
    }

    ul {
      list-style-type: none;
      margin-bottom: 20px;

      li {
        padding: 8px 0;
        padding-left: 30px;
        position: relative;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 8px;
          width: 22px;
          height: 22px;
          background: #dcfce7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          font-weight: bold;
        }
      }
    }
  }
}

.secure-indicators {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;

  .indicator {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;

    .icon {
      font-size: 1.5rem;
      margin-right: 15px;
    }

    .text {
      flex-grow: 1;
    }

    .status {
      font-weight: 500;
    }

    &.secure {
      background: rgba(46, 204, 113, 0.1);
      border: 1px solid #2ecc71;
      color: #27ae60;
    }

    &.insecure {
      background: rgba(231, 76, 60, 0.1);
      border: 1px solid #e74c3c;
      color: #c0392b;
    }

    &.warning {
      background: rgba(243, 156, 18, 0.1);
      border: 1px solid #f39c12;
      color: #d35400;
    }
  }
}

.best-practices-section {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 25px;

    .practice-card {
      background: #f0f7ff;
      border-radius: 12px;
      padding: 20px;
      text-align: center;

      .practice-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      h3 {
        color: var(--primary);
        margin-bottom: 10px;
        font-size: 1.2rem;
      }

      p {
        font-size: 0.9rem;
        color: var(--gray);
      }
    }
  }

  .workflow-diagram {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;

    h3 {
      color: var(--primary);
      margin-bottom: 20px;
      font-size: 1.2rem;
      text-align: center;
    }

    .workflow-steps {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .workflow-step {
        background: var(--secondary);
        color: white;
        padding: 12px 20px;
        border-radius: 30px;
        font-weight: 500;
        min-width: 120px;
        text-align: center;
        margin: 5px 0;
      }

      .workflow-arrow {
        color: var(--secondary);
        font-weight: bold;
        font-size: 1.5rem;
        padding: 0 10px;

        @media (max-width: 768px) {
          display: none;
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;

        .workflow-step {
          width: 100%;
        }
      }
    }
  }
}

.tools-section {
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .tool-card {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      h3 {
        color: var(--primary);
        margin-bottom: 10px;
        font-size: 1.3rem;
      }

      p {
        color: var(--gray);
        margin-bottom: 10px;
      }

      .tool-link {
        color: var(--secondary);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        margin-top: 10px;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  color: var(--gray);
  font-size: 1rem;

  p:first-child {
    margin-bottom: 10px;
    font-weight: 500;
    max-width: 800px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .stats-section {
    gap: 15px;

    .stat-card {
      padding: 20px;
      min-width: 160px;

      .stat-value {
        font-size: 2rem;
      }
    }
  }

  .content-column>section {
    padding: 20px;
  }

  .flow-diagram {
    padding: 15px !important;

    .mitm-position {
      position: relative !important;
      top: auto !important;
      transform: none !important;
      margin: 20px 0;
    }
  }
}
</style>
