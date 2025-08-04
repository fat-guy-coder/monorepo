<template>
  <div class="tls-container">
    <div class="header">
      <h1>TLS/SSL 安全协议详解</h1>
      <p class="subtitle">保障互联网通信安全的加密技术</p>
      <div class="security-badges">
        <span class="badge">🔒 加密传输</span>
        <span class="badge">🛡️ 数据完整性</span>
        <span class="badge">🔑 身份验证</span>
      </div>
    </div>

    <div class="overview-cards">
      <div class="card what-is">
        <div class="card-header">
          <div class="icon">❓</div>
          <h2>TLS/SSL 是什么？</h2>
        </div>
        <div class="card-content">
          <p><strong>TLS (Transport Layer Security)</strong> 和 <strong>SSL (Secure Sockets Layer)</strong>
            是用于在互联网上提供安全通信的加密协议。</p>

          <div class="evolution">
            <h3>协议演进</h3>
            <div class="protocol-timeline">
              <div class="version">
                <div class="name">SSL 1.0</div>
                <div class="year">1994</div>
                <div class="status deprecated">已弃用</div>
              </div>
              <div class="version">
                <div class="name">SSL 2.0</div>
                <div class="year">1995</div>
                <div class="status deprecated">已弃用</div>
              </div>
              <div class="version">
                <div class="name">SSL 3.0</div>
                <div class="year">1996</div>
                <div class="status deprecated">已弃用</div>
              </div>
              <div class="version">
                <div class="name">TLS 1.0</div>
                <div class="year">1999</div>
                <div class="status deprecated">已弃用</div>
              </div>
              <div class="version">
                <div class="name">TLS 1.1</div>
                <div class="year">2006</div>
                <div class="status deprecated">已弃用</div>
              </div>
              <div class="version">
                <div class="name">TLS 1.2</div>
                <div class="year">2008</div>
                <div class="status active">广泛使用</div>
              </div>
              <div class="version">
                <div class="name">TLS 1.3</div>
                <div class="year">2018</div>
                <div class="status active">最新标准</div>
              </div>
            </div>
          </div>

          <div class="key-functions">
            <h3>核心功能</h3>
            <div class="functions">
              <div class="function">
                <div class="icon">🔐</div>
                <div>
                  <h4>加密</h4>
                  <p>防止窃听，保护数据隐私</p>
                </div>
              </div>
              <div class="function">
                <div class="icon">✅</div>
                <div>
                  <h4>认证</h4>
                  <p>验证通信双方身份</p>
                </div>
              </div>
              <div class="function">
                <div class="icon">🔏</div>
                <div>
                  <h4>完整性</h4>
                  <p>防止数据在传输中被篡改</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card usage">
        <div class="card-header">
          <div class="icon">💻</div>
          <h2>如何使用 TLS/SSL</h2>
        </div>
        <div class="card-content">
          <div class="implementation">
            <h3>网站实现</h3>
            <ol>
              <li>从证书颁发机构(CA)获取SSL证书</li>
              <li>在服务器上安装证书</li>
              <li>配置服务器强制HTTPS</li>
              <li>设置HTTP严格传输安全(HSTS)</li>
            </ol>

            <div class="code-sample">
              <h4>Nginx 配置示例</h4>
              <pre><code>server {
  listen 443 ssl;
  server_name example.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/private.key;

  # 启用TLS 1.2和1.3
  ssl_protocols TLSv1.2 TLSv1.3;

  # 优化加密套件
  ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:...';

  # 强制HTTPS
  return 301 https://$host$request_uri;
}</code></pre>
            </div>
          </div>

          <div class="client-usage">
            <h3>客户端使用</h3>
            <p>现代浏览器自动使用HTTPS，用户可通过以下方式验证连接安全：</p>
            <div class="browser-indicators">
              <div class="indicator secure">
                <div class="icon">🔒</div>
                <div>
                  <h4>安全连接</h4>
                  <p>地址栏显示锁图标和"安全"字样</p>
                </div>
              </div>
              <div class="indicator warning">
                <div class="icon">⚠️</div>
                <div>
                  <h4>证书问题</h4>
                  <p>浏览器显示"连接不安全"警告</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="handshake-section">
      <h2>TLS 握手过程</h2>
      <p class="section-description">TLS握手是建立安全连接的关键步骤</p>

      <div class="handshake-diagram">
        <div class="participant client">
          <div class="label">客户端</div>
          <div class="steps">
            <div class="step">1. ClientHello</div>
            <div class="step">3. 验证证书</div>
            <div class="step">5. 发送加密数据</div>
          </div>
        </div>

        <div class="participant server">
          <div class="label">服务器</div>
          <div class="steps">
            <div class="step">2. ServerHello</div>
            <div class="step">4. ServerDone</div>
            <div class="step">6. 接收加密数据</div>
          </div>
        </div>

        <div class="connections">
          <div class="connection">
            <div class="arrow">↓</div>
            <div class="description">支持的协议版本、加密套件、随机数</div>
          </div>
          <div class="connection">
            <div class="arrow">↑</div>
            <div class="description">选择的协议、服务器证书、随机数</div>
          </div>
          <div class="connection">
            <div class="arrow">↓</div>
            <div class="description">预主密钥（用服务器公钥加密）</div>
          </div>
          <div class="connection">
            <div class="arrow">↑</div>
            <div class="description">完成握手信号</div>
          </div>
          <div class="connection encrypted">
            <div class="arrow">⇅</div>
            <div class="description">加密的应用数据</div>
          </div>
        </div>
      </div>

      <div class="tls-versions">
        <div class="version-diff">
          <h3>TLS 1.2 vs TLS 1.3 握手改进</h3>
          <div class="comparison">
            <div class="tls12">
              <h4>TLS 1.2 (传统握手)</h4>
              <ul>
                <li>2-RTT（两次往返时间）</li>
                <li>支持过时的加密算法</li>
                <li>易受降级攻击</li>
                <li>不支持0-RTT</li>
              </ul>
            </div>
            <div class="tls13">
              <h4>TLS 1.3 (现代握手)</h4>
              <ul>
                <li>1-RTT（一次往返时间）</li>
                <li>仅支持强加密算法</li>
                <li>内置防降级保护</li>
                <li>支持0-RTT模式</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="algorithms-section">
      <h2>加密算法与技术</h2>

      <div class="algorithm-cards">
        <div class="algorithm">
          <div class="header">
            <div class="icon">🔑</div>
            <h3>非对称加密</h3>
          </div>
          <div class="content">
            <p>用于密钥交换和身份验证</p>
            <ul>
              <li>RSA (2048位或更高)</li>
              <li>ECDSA (椭圆曲线数字签名算法)</li>
              <li>Diffie-Hellman (DH)</li>
              <li>ECDH (椭圆曲线DH)</li>
            </ul>
          </div>
        </div>

        <div class="algorithm">
          <div class="header">
            <div class="icon">🔒</div>
            <h3>对称加密</h3>
          </div>
          <div class="content">
            <p>用于数据传输加密</p>
            <ul>
              <li>AES (128/256位GCM模式)</li>
              <li>ChaCha20-Poly1305</li>
              <li>Camellia</li>
              <li>3DES (已弃用)</li>
            </ul>
          </div>
        </div>

        <div class="algorithm">
          <div class="header">
            <div class="icon">📝</div>
            <h3>散列算法</h3>
          </div>
          <div class="content">
            <p>用于数据完整性验证</p>
            <ul>
              <li>SHA-256</li>
              <li>SHA-384</li>
              <li>SHA-512</li>
              <li>MD5 (已弃用)</li>
              <li>SHA-1 (已弃用)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="perfect-forward-secrecy">
        <h3>完美前向保密 (PFS)</h3>
        <p>即使长期密钥泄露，历史会话也不会被解密</p>
        <div class="pfs-explanation">
          <div class="step">
            <div class="number">1</div>
            <div class="content">每次会话生成唯一临时密钥</div>
          </div>
          <div class="step">
            <div class="number">2</div>
            <div class="content">临时密钥用于加密会话数据</div>
          </div>
          <div class="step">
            <div class="number">3</div>
            <div class="content">会话结束后密钥立即销毁</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pros-cons-section">
      <h2>TLS/SSL 优缺点分析</h2>

      <div class="comparison">
        <div class="pros">
          <h3>优点 ✅</h3>
          <ul>
            <li>
              <div class="icon">🔐</div>
              <div>
                <h4>数据安全</h4>
                <p>防止中间人攻击和数据窃取</p>
              </div>
            </li>
            <li>
              <div class="icon">📈</div>
              <div>
                <h4>信任建立</h4>
                <p>证书验证增强用户信任</p>
              </div>
            </li>
            <li>
              <div class="icon">⚖️</div>
              <div>
                <h4>合规要求</h4>
                <p>满足GDPR、PCI DSS等法规要求</p>
              </div>
            </li>
            <li>
              <div class="icon">🚀</div>
              <div>
                <h4>SEO优势</h4>
                <p>Google优先索引HTTPS网站</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="cons">
          <h3>缺点 ❌</h3>
          <ul>
            <li>
              <div class="icon">⏱️</div>
              <div>
                <h4>性能开销</h4>
                <p>加密解密增加服务器CPU负载</p>
              </div>
            </li>
            <li>
              <div class="icon">💰</div>
              <div>
                <h4>证书成本</h4>
                <p>商业证书需要年费，DV证书免费</p>
              </div>
            </li>
            <li>
              <div class="icon">🛠️</div>
              <div>
                <h4>配置复杂</h4>
                <p>正确配置需要专业知识</p>
              </div>
            </li>
            <li>
              <div class="icon">⚠️</div>
              <div>
                <h4>证书管理</h4>
                <p>需要定期更新和续订证书</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <h2>TLS/SSL 最佳实践</h2>

      <div class="practices">
        <div class="practice">
          <div class="number">1</div>
          <div class="content">
            <h3>使用强加密套件</h3>
            <p>优先使用TLS 1.3或TLS 1.2，禁用旧协议</p>
            <pre><code># 推荐加密套件
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
ECDHE-ECDSA-AES256-GCM-SHA384</code></pre>
          </div>
        </div>

        <div class="practice">
          <div class="number">2</div>
          <div class="content">
            <h3>实现HSTS</h3>
            <p>HTTP严格传输安全强制浏览器使用HTTPS</p>
            <pre><code># Nginx配置
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;</code></pre>
          </div>
        </div>

        <div class="practice">
          <div class="number">3</div>
          <div class="content">
            <h3>证书管理</h3>
            <p>使用自动化工具管理证书续订</p>
            <div class="tools">
              <span>Let's Encrypt</span>
              <span>Certbot</span>
              <span>ACME客户端</span>
            </div>
          </div>
        </div>

        <div class="practice">
          <div class="number">4</div>
          <div class="content">
            <h3>定期安全评估</h3>
            <p>使用工具检查配置安全性</p>
            <div class="tools">
              <span>SSL Labs (ssllabs.com)</span>
              <span>Security Headers</span>
              <span>Mozilla SSL配置生成器</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>总结</h2>
      <div class="summary">
        <p>TLS/SSL是互联网安全的基石，为数据传输提供加密、认证和完整性保障。</p>
        <p>随着TLS 1.3的普及，安全协议变得更高效、更安全，同时保持了良好的兼容性。</p>
      </div>
      <div class="recommendation">
        <div class="icon">💡</div>
        <p>所有网站都应部署HTTPS，使用最新TLS协议，并遵循安全最佳实践</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不需要复杂逻辑，主要是展示内容
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.tls-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}

.security-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;

  .badge {
    padding: 0.4rem 1rem;
    background-color: fade(@primary-color, 15%);
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;
  }
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;

  &.what-is {
    border-top: 4px solid @primary-color;
  }

  &.usage {
    border-top: 4px solid @success-color;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;

  .icon {
    font-size: 1.8rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.card-content {
  padding: 1.5rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.evolution {
  margin-bottom: 1.5rem;

  .protocol-timeline {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0.5rem 0;
    margin-bottom: 1rem;

    .version {
      min-width: 120px;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 0.8rem;
      text-align: center;

      .name {
        font-weight: 500;
        margin-bottom: 0.3rem;
      }

      .year {
        font-size: 0.9rem;
        color: @text-light;
        margin-bottom: 0.3rem;
      }

      .status {
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        border-radius: 20px;
        display: inline-block;

        &.active {
          background-color: fade(@success-color, 20%);
          color: darken(@success-color, 20%);
        }

        &.deprecated {
          background-color: fade(@warning-color, 20%);
          color: darken(@warning-color, 20%);
        }
      }
    }
  }
}

.key-functions {
  .functions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;

    .function {
      display: flex;
      gap: 0.8rem;
      align-items: center;
      padding: 0.8rem;
      background-color: fade(@primary-color, 8%);
      border-radius: 8px;

      .icon {
        font-size: 1.5rem;
      }

      h4 {
        margin: 0 0 0.2rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }
}

.code-sample {
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin-top: 1rem;

  h4 {
    color: #f0f0f0;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }
}

.browser-indicators {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  .indicator {
    display: flex;
    gap: 0.8rem;
    padding: 1rem;
    border-radius: 8px;
    align-items: center;

    &.secure {
      background-color: fade(@success-color, 15%);
      border-left: 3px solid @success-color;
    }

    &.warning {
      background-color: fade(@warning-color, 15%);
      border-left: 3px solid @warning-color;
    }

    .icon {
      font-size: 1.5rem;
    }

    h4 {
      margin: 0 0 0.2rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

.handshake-section {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .section-description {
    text-align: center;
    color: @text-light;
    margin-bottom: 2rem;
  }
}

.handshake-diagram {
  display: flex;
  justify-content: space-between;
  position: relative;
  min-height: 400px;
  margin-bottom: 2rem;

  .participant {
    width: 200px;
    text-align: center;

    .label {
      font-weight: 700;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background-color: fade(@primary-color, 10%);
      border-radius: 6px;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .step {
        padding: 1rem;
        background-color: @light-bg;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
    }
  }

  .connections {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .connection {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .arrow {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: @light-bg;
        border-radius: 50%;
      }

      .description {
        position: absolute;
        top: 100%;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        text-align: center;
        background-color: fade(@accent-color, 10%);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        white-space: nowrap;
      }

      &.encrypted {
        .arrow {
          background-color: fade(@success-color, 20%);
        }

        .description {
          background-color: fade(@success-color, 20%);
        }
      }
    }
  }
}

.tls-versions {
  background-color: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;

  .version-diff {
    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .tls12,
      .tls13 {
        padding: 1rem;
        border-radius: 8px;

        h4 {
          margin-top: 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid @border-color;
        }

        ul {
          padding-left: 1.2rem;

          li {
            margin-bottom: 0.5rem;
          }
        }
      }

      .tls12 {
        background-color: fade(@warning-color, 10%);
        border-left: 3px solid @warning-color;
      }

      .tls13 {
        background-color: fade(@success-color, 10%);
        border-left: 3px solid @success-color;
      }
    }
  }
}

.algorithms-section {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
}

.algorithm-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .algorithm {
    background-color: white;
    border-radius: 12px;
    box-shadow: @card-shadow;
    overflow: hidden;

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.2rem;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;

      .icon {
        font-size: 1.5rem;
      }

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }

    .content {
      padding: 1.5rem;

      p {
        margin-top: 0;
        font-weight: 500;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.2rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}

.perfect-forward-secrecy {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-top: 0;
  }

  p {
    color: @text-light;
    margin-bottom: 1.5rem;
  }

  .pfs-explanation {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .step {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex: 1;
      padding: 1rem;
      background-color: fade(@accent-color, 10%);
      border-radius: 8px;
      margin: 0 0.5rem;

      @media (max-width: 768px) {
        margin: 0;
      }

      .number {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .content {
        font-size: 0.95rem;
      }
    }
  }
}

.pros-cons-section {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      background-color: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;

      h3 {
        margin-top: 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          align-items: flex-start;

          .icon {
            font-size: 1.5rem;
            flex-shrink: 0;
            margin-top: 0.2rem;
          }

          h4 {
            margin: 0 0 0.3rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: @text-light;
          }
        }
      }
    }

    .pros li {
      background-color: fade(@success-color, 10%);
    }

    .cons li {
      background-color: fade(@warning-color, 10%);
    }
  }
}

.best-practices {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .practices {
    .practice {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      align-items: flex-start;

      .number {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .content {
        flex-grow: 1;

        h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: @text-dark;
        }

        p {
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 0.8rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }

        .tools {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          span {
            padding: 0.3rem 0.8rem;
            background-color: @light-bg;
            border-radius: 20px;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .summary {
    max-width: 800px;
    margin: 0 auto 1.5rem;
    text-align: left;

    p {
      margin-bottom: 1rem;
      line-height: 1.7;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .recommendation {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    background-color: white;
    border-radius: 30px;
    padding: 0.8rem 1.5rem;
    box-shadow: @card-shadow;
    font-weight: 500;

    .icon {
      font-size: 1.5rem;
      color: @accent-color;
    }

    p {
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .tls-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .handshake-diagram {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    min-height: auto;

    .participant {
      width: 100%;
      max-width: 300px;
    }

    .connections {
      position: static;
      transform: none;
      width: 100%;
      margin-top: 1rem;
    }
  }

  .overview-cards {
    grid-template-columns: 1fr;
  }
}
</style>
