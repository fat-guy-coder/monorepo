<template>
  <div class="https-container">
    <header class="protocol-header">
      <div class="header-content">
        <h1>HTTPS 协议基本介绍</h1>
        <p class="subtitle">构建安全可靠的网络通信</p>
        <div class="protocol-tags">
          <span class="tag">TLS/SSL</span>
          <span class="tag">加密传输</span>
          <span class="tag">身份验证</span>
          <span class="tag">数据完整性</span>
        </div>
      </div>
      <div class="protocol-icon">🔒</div>
    </header>

    <div class="content-navigation">
      <div v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ active: activeNav === item.id }"
        @click="activeNav = item.id">
        <div class="nav-icon">{{ item.icon }}</div>
        <div class="nav-text">{{ item.title }}</div>
      </div>
    </div>

    <div class="content-section">
      <!-- 概念部分 -->
      <section v-if="activeNav === 'concept'" class="concept-section">
        <div class="https-definition">
          <h2>HTTPS 是什么？</h2>
          <div class="definition-card">
            <p>
              <strong>HTTPS（HyperText Transfer Protocol Secure）</strong>是HTTP的安全版本，
              通过使用SSL/TLS协议为通信提供加密、身份验证和数据完整性保护。
            </p>
            <div class="analogy">
              <h3>现实世界类比</h3>
              <div class="analogy-content">
                <div class="analogy-icon">📮</div>
                <p>
                  想象HTTP就像邮寄明信片 - 任何人都可以阅读内容。HTTPS则像是把信件放入上锁的保险箱，
                  只有收件人有钥匙打开它。即使有人截获了保险箱，也无法读取里面的内容。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="core-components">
          <h2>HTTPS 核心组件</h2>
          <div class="component-cards">
            <div class="component-card">
              <div class="component-icon">🔑</div>
              <h3>非对称加密</h3>
              <p>使用公钥/私钥对进行安全密钥交换</p>
            </div>
            <div class="component-card">
              <div class="component-icon">🔐</div>
              <h3>对称加密</h3>
              <p>使用会话密钥加密实际传输的数据</p>
            </div>
            <div class="component-card">
              <div class="component-icon">📜</div>
              <h3>数字证书</h3>
              <p>由CA颁发的服务器身份凭证</p>
            </div>
            <div class="component-card">
              <div class="component-icon">✅</div>
              <h3>完整性校验</h3>
              <p>防止数据在传输中被篡改</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置方法部分 -->
      <section v-if="activeNav === 'configuration'" class="configuration-section">
        <h2>HTTPS 配置方法</h2>

        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>获取SSL/TLS证书</h3>
              <p>从证书颁发机构(CA)获取证书，或使用Let's Encrypt等免费服务</p>
              <div class="code-snippet">
                <pre># 使用Certbot获取Let's Encrypt证书
sudo apt install certbot
sudo certbot certonly --webroot -w /var/www/example -d example.com</pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>配置Web服务器</h3>
              <p>在服务器上配置HTTPS支持</p>
              <div class="server-configs">
                <div class="server-config">
                  <div class="server-icon">🛠️</div>
                  <h4>Nginx 配置</h4>
                  <pre>server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # 启用HTTP/2
    listen 443 ssl http2;

    # 其他配置...
}</pre>
                </div>
                <div class="server-config">
                  <div class="server-icon">🛠️</div>
                  <h4>Apache 配置</h4>
                  <pre>&lt;VirtualHost *:443&gt;
    ServerName example.com

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/privkey.pem
    SSLCertificateChainFile /path/to/chain.pem

    # 其他配置...
&lt;/VirtualHost&gt;</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>HTTP重定向到HTTPS</h3>
              <p>将所有HTTP流量重定向到HTTPS</p>
              <div class="redirect-configs">
                <div class="redirect-config">
                  <h4>Nginx 重定向</h4>
                  <pre>server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}</pre>
                </div>
                <div class="redirect-config">
                  <h4>Apache 重定向</h4>
                  <pre>&lt;VirtualHost *:80&gt;
    ServerName example.com
    Redirect permanent / https://example.com/
&lt;/VirtualHost&gt;</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>证书续期与维护</h3>
              <p>设置自动续期，确保证书不过期</p>
              <div class="renewal-config">
                <pre># 设置cron任务自动续期
0 0 * * * certbot renew --quiet --post-hook "systemctl reload nginx"</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优势部分 -->
      <section v-if="activeNav === 'advantages'" class="advantages-section">
        <h2>HTTPS 的优势</h2>

        <div class="comparison">
          <div class="http-vs-https">
            <h3>HTTP vs HTTPS</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>HTTP</th>
                    <th>HTTPS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>数据传输安全</td>
                    <td class="negative">明文传输</td>
                    <td class="positive">加密传输</td>
                  </tr>
                  <tr>
                    <td>身份验证</td>
                    <td class="negative">无服务器验证</td>
                    <td class="positive">CA验证服务器身份</td>
                  </tr>
                  <tr>
                    <td>数据完整性</td>
                    <td class="negative">无完整性保护</td>
                    <td class="positive">防止数据篡改</td>
                  </tr>
                  <tr>
                    <td>SEO优化</td>
                    <td class="neutral">无优势</td>
                    <td class="positive">Google排名提升</td>
                  </tr>
                  <tr>
                    <td>浏览器信任</td>
                    <td class="negative">显示"不安全"警告</td>
                    <td class="positive">显示安全锁图标</td>
                  </tr>
                  <tr>
                    <td>协议支持</td>
                    <td class="neutral">HTTP/1.1, HTTP/2</td>
                    <td class="positive">HTTP/2, HTTP/3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="benefits">
            <h3>关键优势基本介绍</h3>
            <div class="benefit-cards">
              <div class="benefit-card">
                <div class="benefit-icon">🛡️</div>
                <h4>数据加密保护</h4>
                <p>防止敏感信息（密码、信用卡号等）被窃取</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">🔍</div>
                <h4>身份真实性验证</h4>
                <p>确保用户访问的是真实网站而非钓鱼网站</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">📈</div>
                <h4>SEO优化优势</h4>
                <p>Google等搜索引擎优先索引HTTPS网站</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">✅</div>
                <h4>用户信任提升</h4>
                <p>浏览器地址栏显示安全锁图标，增强用户信心</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">⚡</div>
                <h4>性能提升</h4>
                <p>HTTP/2和HTTP/3需要HTTPS，提供更快的传输速度</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">🔐</div>
                <h4>合规性要求</h4>
                <p>满足GDPR、PCI DSS等数据安全法规要求</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作流程部分 -->
      <section v-if="activeNav === 'workflow'" class="workflow-section">
        <h2>HTTPS 工作流程</h2>

        <div class="handshake-process">
          <h3>TLS 握手过程</h3>
          <div class="handshake-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Client Hello</h4>
                <p>客户端发送支持的TLS版本、加密套件列表和随机数</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Server Hello</h4>
                <p>服务器选择TLS版本、加密套件，发送随机数和证书</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>证书验证</h4>
                <p>客户端验证服务器证书的有效性和可信性</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>密钥交换</h4>
                <p>客户端生成预主密钥，用服务器公钥加密后发送</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>生成会话密钥</h4>
                <p>双方使用预主密钥和随机数生成相同的会话密钥</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h4>握手完成</h4>
                <p>双方交换加密的完成消息，开始加密通信</p>
              </div>
            </div>
          </div>
        </div>

        <div class="encryption-types">
          <h3>加密技术</h3>
          <div class="encryption-cards">
            <div class="encryption-card">
              <div class="encryption-icon">🔑</div>
              <h4>非对称加密</h4>
              <p>RSA, ECC, Diffie-Hellman</p>
              <p class="desc">用于安全交换对称密钥</p>
            </div>
            <div class="encryption-card">
              <div class="encryption-icon">🔐</div>
              <h4>对称加密</h4>
              <p>AES, ChaCha20, Camellia</p>
              <p class="desc">用于加密实际传输的数据</p>
            </div>
            <div class="encryption-card">
              <div class="encryption-icon">📜</div>
              <h4>数字签名</h4>
              <p>ECDSA, RSA-PSS, EdDSA</p>
              <p class="desc">用于验证数据完整性和身份</p>
            </div>
            <div class="encryption-card">
              <div class="encryption-icon">🔍</div>
              <h4>散列函数</h4>
              <p>SHA-256, SHA-384, SHA-512</p>
              <p class="desc">用于生成消息认证码(MAC)</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section v-if="activeNav === 'scenarios'" class="scenarios-section">
        <h2>HTTPS 使用场景</h2>

        <div class="scenario-cards">
          <div class="scenario-card critical">
            <div class="scenario-icon">🛒</div>
            <h3>电子商务</h3>
            <p>保护支付信息和用户账户安全</p>
          </div>
          <div class="scenario-card critical">
            <div class="scenario-icon">👤</div>
            <h3>用户登录</h3>
            <p>防止密码和会话令牌被窃取</p>
          </div>
          <div class="scenario-card essential">
            <div class="scenario-icon">🏦</div>
            <h3>金融服务</h3>
            <p>银行、证券交易等敏感操作</p>
          </div>
          <div class="scenario-card essential">
            <div class="scenario-icon">🏥</div>
            <h3>医疗健康</h3>
            <p>保护患者隐私和医疗记录</p>
          </div>
          <div class="scenario-card recommended">
            <div class="scenario-icon">📱</div>
            <h3>移动应用</h3>
            <p>API通信和用户数据保护</p>
          </div>
          <div class="scenario-card recommended">
            <div class="scenario-icon">🌐</div>
            <h3>所有网站</h3>
            <p>现代浏览器要求所有网站使用HTTPS</p>
          </div>
        </div>

        <div class="adoption-stats">
          <h3>HTTPS采用统计</h3>
          <div class="stats-container">
            <div class="stat">
              <div class="stat-value">95%</div>
              <div class="stat-label">Google流量已加密</div>
            </div>
            <div class="stat">
              <div class="stat-value">90%</div>
              <div class="stat-label">Chrome页面加载使用HTTPS</div>
            </div>
            <div class="stat">
              <div class="stat-value">80%</div>
              <div class="stat-label">Alexa Top 100万网站启用HTTPS</div>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3>HTTPS最佳实践</h3>
          <div class="practices-grid">
            <div class="practice">
              <div class="practice-icon">🔍</div>
              <h4>使用HSTS</h4>
              <p>强制浏览器只使用HTTPS连接</p>
            </div>
            <div class="practice">
              <div class="practice-icon">🔄</div>
              <h4>HTTP重定向</h4>
              <p>将所有HTTP请求重定向到HTTPS</p>
            </div>
            <div class="practice">
              <div class="practice-icon">📜</div>
              <h4>证书管理</h4>
              <p>确保证书有效并设置自动续期</p>
            </div>
            <div class="practice">
              <div class="practice-icon">🔐</div>
              <h4>强加密套件</h4>
              <p>使用TLS 1.3和强加密算法</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="protocol-footer">
      <p>HTTPS 是现代互联网安全的基石，保护用户隐私和数据安全</p>
      <div class="footer-links">
        <a href="#">SSL Labs 测试工具</a>
        <a href="#">Let's Encrypt</a>
        <a href="#">Mozilla SSL 配置生成器</a>
        <a href="#">TLS 1.3 RFC</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: '概念', icon: '📚' },
  { id: 'configuration', title: '配置', icon: '🛠️' },
  { id: 'advantages', title: '优势', icon: '💪' },
  { id: 'workflow', title: '工作流程', icon: '🔄' },
  { id: 'scenarios', title: '使用场景', icon: '📍' }
]);

// 当前激活的导航项
const activeNav = ref('concept');
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@dark-bg: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@success-color: #2ecc71;
@warning-color: #f39c12;
@error-color: #e74c3c;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.https-container {
  font-family: 'Roboto', 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #f0f5ff;
  min-height: 100vh;
  line-height: 1.6;

  .protocol-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 10%));
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);

    .header-content {
      h1 {
        font-size: 2.8rem;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
      }

      .subtitle {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 20px;
        max-width: 700px;
      }

      .protocol-tags {
        display: flex;
        gap: 12px;

        .tag {
          background: fade(white, 15%);
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }

    .protocol-icon {
      font-size: 5rem;
      opacity: 0.9;
    }
  }

  .content-navigation {
    display: flex;
    justify-content: space-between;
    background: @card-bg;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
    padding: 15px;

    .nav-item {
      flex: 1;
      text-align: center;
      padding: 15px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: fade(@primary-color, 10%);
      }

      &.active {
        background: fade(@primary-color, 15%);
        box-shadow: 0 4px 8px fade(@primary-color, 20%);

        .nav-icon {
          transform: scale(1.2);
          color: @primary-color;
        }

        .nav-text {
          color: @primary-color;
          font-weight: 500;
        }
      }

      .nav-icon {
        font-size: 2rem;
        margin-bottom: 8px;
        transition: all 0.3s ease;
      }

      .nav-text {
        font-size: 1.05rem;
        font-weight: 400;
      }
    }
  }

  .content-section {
    background: @card-bg;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      color: @dark-bg;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid @border-color;
    }

    // 概念部分样式
    .concept-section {
      .https-definition {
        margin-bottom: 40px;

        .definition-card {
          background: @light-bg;
          padding: 25px;
          border-radius: 10px;
          line-height: 1.7;
          font-size: 1.1rem;

          p {
            margin-bottom: 20px;
          }
        }

        .analogy {
          background: fade(@accent-color, 8%);
          border-radius: 10px;
          padding: 20px;
          margin-top: 25px;
          border-left: 4px solid @accent-color;

          h3 {
            color: @accent-color;
            margin-bottom: 15px;
            font-size: 1.3rem;
          }

          .analogy-content {
            display: flex;
            gap: 20px;
            align-items: center;

            .analogy-icon {
              font-size: 2.5rem;
              flex-shrink: 0;
            }

            p {
              line-height: 1.8;
            }
          }
        }
      }

      .core-components {
        .component-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;

          .component-card {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: transform 0.3s ease;
            border-top: 4px solid @primary-color;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }

            .component-icon {
              font-size: 3rem;
              margin-bottom: 15px;
            }

            h3 {
              font-size: 1.3rem;
              margin-bottom: 12px;
              color: @dark-bg;
            }

            p {
              color: lighten(@text-color, 20%);
              line-height: 1.6;
            }
          }
        }
      }
    }

    // 配置部分样式
    .configuration-section {
      .config-steps {
        .step {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px dashed @border-color;

          &:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }

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
            font-size: 1.2rem;
            flex-shrink: 0;
            margin-top: 5px;
          }

          .step-content {
            flex: 1;

            h3 {
              font-size: 1.4rem;
              margin-bottom: 15px;
              color: @dark-bg;
            }

            p {
              margin-bottom: 15px;
              color: lighten(@text-color, 15%);
            }

            .code-snippet {
              background: #2d2d2d;
              color: #f8f8f2;
              border-radius: 8px;
              padding: 15px;
              margin-top: 15px;
              overflow-x: auto;

              pre {
                font-family: 'Fira Code', 'Consolas', monospace;
                font-size: 0.95rem;
                line-height: 1.5;
                margin: 0;
              }
            }

            .server-configs,
            .redirect-configs {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
              margin-top: 20px;

              .server-config,
              .redirect-config {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                border-left: 4px solid @primary-color;

                h4 {
                  margin-bottom: 10px;
                  color: @primary-color;
                }

                pre {
                  background: #2d2d2d;
                  color: #f8f8f2;
                  padding: 15px;
                  border-radius: 6px;
                  overflow-x: auto;
                  font-family: 'Fira Code', 'Consolas', monospace;
                  font-size: 0.9rem;
                }
              }
            }

            .server-icon {
              font-size: 2rem;
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    // 优势部分样式
    .advantages-section {
      .comparison {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 30px;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }

        .http-vs-https {
          .comparison-table {
            overflow-x: auto;

            table {
              width: 100%;
              border-collapse: collapse;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

              th,
              td {
                padding: 15px;
                text-align: left;
                border: 1px solid @border-color;
              }

              th {
                background: @primary-color;
                color: white;
                font-weight: 500;
              }

              tr:nth-child(even) {
                background: @light-bg;
              }

              .positive {
                background: fade(@success-color, 10%);
                font-weight: 500;
                color: darken(@success-color, 15%);
              }

              .negative {
                background: fade(@error-color, 10%);
                color: darken(@error-color, 15%);
              }

              .neutral {
                background: fade(@warning-color, 10%);
                color: darken(@warning-color, 15%);
              }
            }
          }
        }

        .benefits {
          .benefit-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;

            .benefit-card {
              background: @light-bg;
              border-radius: 12px;
              padding: 25px;
              text-align: center;
              border-top: 4px solid @success-color;
              transition: transform 0.3s ease;

              &:hover {
                transform: translateY(-5px);
              }

              .benefit-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
              }

              h4 {
                font-size: 1.2rem;
                margin-bottom: 10px;
                color: @dark-bg;
              }

              p {
                color: lighten(@text-color, 20%);
                line-height: 1.6;
              }
            }
          }
        }
      }
    }

    // 工作流程部分样式
    .workflow-section {
      .handshake-process {
        margin-bottom: 40px;

        .handshake-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;

          .step {
            display: flex;
            gap: 15px;
            background: @light-bg;
            border-radius: 12px;
            padding: 20px;
            align-items: flex-start;
            border-left: 4px solid @primary-color;

            .step-number {
              width: 32px;
              height: 32px;
              background: @primary-color;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              flex-shrink: 0;
              margin-top: 3px;
            }

            .step-content {
              flex: 1;

              h4 {
                font-size: 1.2rem;
                margin-bottom: 8px;
                color: @dark-bg;
              }

              p {
                color: lighten(@text-color, 15%);
              }
            }
          }
        }
      }

      .encryption-types {
        .encryption-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;

          .encryption-card {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @accent-color;

            .encryption-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h4 {
              font-size: 1.2rem;
              margin-bottom: 10px;
              color: @dark-bg;
            }

            p {
              margin-bottom: 5px;
            }

            .desc {
              font-style: italic;
              color: lighten(@text-color, 25%);
              margin-top: 10px;
            }
          }
        }
      }
    }

    // 使用场景部分样式
    .scenarios-section {
      .scenario-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 40px;

        .scenario-card {
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          .scenario-icon {
            font-size: 3rem;
            margin-bottom: 15px;
          }

          h3 {
            font-size: 1.3rem;
            margin-bottom: 12px;
          }

          p {
            color: lighten(@text-color, 20%);
            line-height: 1.6;
          }

          &.critical {
            background: fade(@error-color, 10%);
            border-top: 4px solid @error-color;
          }

          &.essential {
            background: fade(@warning-color, 10%);
            border-top: 4px solid @warning-color;
          }

          &.recommended {
            background: fade(@success-color, 10%);
            border-top: 4px solid @success-color;
          }
        }
      }

      .adoption-stats {
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;

          .stat {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border-top: 4px solid @primary-color;

            .stat-value {
              font-size: 2.5rem;
              font-weight: bold;
              color: @primary-color;
              margin-bottom: 10px;
            }

            .stat-label {
              color: lighten(@text-color, 20%);
            }
          }
        }
      }

      .best-practices {
        .practices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;

          .practice {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @secondary-color;

            .practice-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h4 {
              font-size: 1.2rem;
              margin-bottom: 10px;
              color: @dark-bg;
            }

            p {
              color: lighten(@text-color, 20%);
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .protocol-footer {
    text-align: center;
    padding: 30px;
    background: @light-bg;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: @dark-bg;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 25px;
      flex-wrap: wrap;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: darken(@primary-color, 15%);
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .protocol-header {
    flex-direction: column;
    text-align: center;
    padding: 20px !important;

    .header-content {
      margin-bottom: 20px;
    }
  }

  .content-navigation {
    flex-wrap: wrap;

    .nav-item {
      flex: 1 0 120px;
      margin-bottom: 10px;
    }
  }

  .config-steps .step {
    flex-direction: column;
  }
}
</style>
