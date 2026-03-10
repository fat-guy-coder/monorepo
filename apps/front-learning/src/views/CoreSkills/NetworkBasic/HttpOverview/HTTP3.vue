<template>
  <div class="http3-container">
    <header class="protocol-header">
      <div class="header-content">
        <h1>HTTP/3 协议基本介绍</h1>
        <p class="subtitle">下一代互联网传输协议的革命性变革</p>
        <div class="protocol-tags">
          <span class="tag">QUIC</span>
          <span class="tag">UDP</span>
          <span class="tag">零RTT</span>
          <span class="tag">多路复用</span>
        </div>
      </div>
      <div class="protocol-icon">🌐</div>
    </header>

    <div class="content-navigation">
      <div v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ active: activeNav === item.id }"
        @click="activeNav = item.id">
        <div class="nav-icon">{{ item.icon }}</div>
        <div class="nav-text">{{ item.title }}</div>
      </div>
    </div>

    <div class="content-section">
      <!-- 概述部分 -->
      <section v-if="activeNav === 'overview'" class="overview-section">

        <div class="core-concept">
          <h2>HTTP/3 核心概念</h2>
          <h3>什么是HTTP/3？</h3>
          <h4>
            HTTP/3 是超文本传输协议（HTTP）的第三个主要版本，是继 HTTP/1.1 和 HTTP/2 之后的又一次重大升级。与前代协议不同，HTTP/3 不再基于 TCP，而是采用了全新的
            <strong>QUIC</strong> 协议作为传输层。QUIC 是由 Google 设计并推动的基于 UDP 的传输协议，具备更低的延迟、更强的安全性和更好的多路复用能力。
          </h4>
          <h4>
            HTTP/3 主要解决了 HTTP/2 在实际应用中遇到的“队头阻塞”问题，并通过内置的 TLS 1.3 加密机制，提升了数据传输的安全性和效率。它支持
            0-RTT（零往返时延）连接建立，极大地缩短了首次请求的等待时间，非常适合现代互联网对高性能和低延迟的需求。
          </h4>
          <h4>
            目前，HTTP/3 已被主流浏览器（如 Chrome、Firefox、Edge）和大型互联网公司（如 Google、Facebook、Cloudflare）广泛支持，正逐步成为新一代互联网传输协议的标准。
          </h4>

          <div class="concept-cards">
            <div class="concept-card">
              <div class="concept-icon">🚀</div>
              <h3>基于QUIC协议</h3>
              <p>HTTP/3使用QUIC作为传输层协议，替代了TCP</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🔒</div>
              <h3>内置TLS 1.3加密</h3>
              <p>安全层内置在传输层，默认提供端到端加密</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⚡</div>
              <h3>零往返时间(0-RTT)</h3>
              <p>允许在首次连接时立即发送数据，减少延迟</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🔀</div>
              <h3>真正的多路复用</h3>
              <p>独立的数据流，彻底解决队头阻塞问题</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用方法部分 -->
      <section v-if="activeNav === 'usage'" class="usage-section">
        <h2>HTTP/3 使用方法</h2>

        <div class="usage-cards">
          <div class="usage-card">
            <div class="card-header">
              <div class="card-icon">🛠️</div>
              <h3>服务器端配置</h3>
            </div>
            <div class="card-content">
              <p>主流Web服务器配置HTTP/3的方法：</p>
              <ul>
                <li><strong>Nginx</strong>: 需要编译支持QUIC的分支，配置listen 443 quic</li>
                <li><strong>Apache</strong>: 使用mod_http3模块</li>
                <li><strong>Caddy</strong>: 自动启用HTTP/3，无需额外配置</li>
                <li><strong>Cloudflare</strong>: 在控制台启用HTTP/3支持</li>
              </ul>
              <div class="code-snippet">
                <pre># Nginx 配置示例
server {
    listen 443 ssl;
    listen 443 quic reuseport;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 启用HTTP/3
    add_header Alt-Svc 'h3=":443"; ma=86400';
}</pre>
              </div>
            </div>
          </div>

          <div class="usage-card">
            <div class="card-header">
              <div class="card-icon">🌐</div>
              <h3>客户端使用</h3>
            </div>
            <div class="card-content">
              <p>浏览器支持情况：</p>
              <div class="browser-support">
                <div class="browser">
                  <div class="browser-icon">🚀</div>
                  <div class="browser-name">Chrome</div>
                  <div class="support-version">v87+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">🦊</div>
                  <div class="browser-name">Firefox</div>
                  <div class="support-version">v88+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">🅢</div>
                  <div class="browser-name">Safari</div>
                  <div class="support-version">v14+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">𝐄</div>
                  <div class="browser-name">Edge</div>
                  <div class="support-version">v88+</div>
                </div>
              </div>
              <p>在JavaScript中检测HTTP/3支持：</p>
              <div class="code-snippet">
                <pre>// 检测HTTP/3支持
if (window.connection && window.connection.protocol === 'h3') {
  console.log('使用HTTP/3连接');
} else {
  console.log('使用HTTP/2或HTTP/1.1');
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section v-if="activeNav === 'scenarios'" class="scenarios-section">
        <h2>HTTP/3 使用场景</h2>

        <div class="scenario-cards">
          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>移动端应用</h3>
            <p>在移动网络环境（4G/5G）下，HTTP/3能显著减少连接建立时间，改善弱网环境下的性能</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎮</div>
            <h3>实时交互应用</h3>
            <p>在线游戏、视频会议等实时应用受益于低延迟和连接迁移特性</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>大数据传输</h3>
            <p>多路复用特性使大量小文件传输效率提升30%-50%</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🌍</div>
            <h3>高延迟网络</h3>
            <p>在卫星网络、偏远地区等高延迟环境中性能优势明显</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛡️</div>
            <h3>安全敏感应用</h3>
            <p>内置TLS 1.3加密，提供更强的安全保障</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <h3>CDN服务</h3>
            <p>内容分发网络使用HTTP/3减少边缘节点延迟</p>
          </div>
        </div>
      </section>

      <!-- 优缺点部分 -->
      <section v-if="activeNav === 'pros-cons'" class="pros-cons-section">
        <h2>HTTP/3 优缺点分析</h2>

        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>更低的延迟</strong>
                  <p>0-RTT连接建立，减少握手时间</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>解决队头阻塞</strong>
                  <p>独立数据流传输，避免TCP队头阻塞</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>更好的移动支持</strong>
                  <p>连接迁移功能，网络切换时保持连接</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>增强的安全性</strong>
                  <p>内置TLS 1.3，防止中间人攻击</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>前向纠错(FEC)</strong>
                  <p>减少重传，提高弱网环境性能</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>挑战与限制</h3>
            <ul>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>部署复杂性</strong>
                  <p>需要服务器和客户端同时支持</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>中间设备支持</strong>
                  <p>防火墙和NAT设备可能阻止UDP流量</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>CPU消耗增加</strong>
                  <p>QUIC加密处理需要更多计算资源</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>协议成熟度</strong>
                  <p>新协议，可能存在未发现的实现问题</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>调试难度</strong>
                  <p>缺乏成熟的调试工具和监控方案</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="performance-comparison">
          <h3>性能对比</h3>
          <div class="performance-chart">
            <div class="chart-header">
              <div class="metric">协议</div>
              <div class="bar-header">连接建立时间</div>
              <div class="bar-header">弱网吞吐量</div>
              <div class="bar-header">丢包恢复</div>
            </div>
            <div class="chart-row">
              <div class="protocol-name">HTTP/1.1</div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '100%', backgroundColor: '#e74c3c' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '40%', backgroundColor: '#e74c3c' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '30%', backgroundColor: '#e74c3c' }"></div>
              </div>
            </div>
            <div class="chart-row">
              <div class="protocol-name">HTTP/2</div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '90%', backgroundColor: '#f39c12' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '70%', backgroundColor: '#f39c12' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '50%', backgroundColor: '#f39c12' }"></div>
              </div>
            </div>
            <div class="chart-row">
              <div class="protocol-name">HTTP/3</div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '30%', backgroundColor: '#2ecc71' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '95%', backgroundColor: '#2ecc71' }"></div>
              </div>
              <div class="bar-container">
                <div class="bar" :style="{ width: '90%', backgroundColor: '#2ecc71' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 未来展望部分 -->
      <section v-if="activeNav === 'future'" class="future-section">
        <h2>HTTP/3 未来展望</h2>

        <div class="adoption-stats">
          <h3>全球采用率</h3>
          <div class="stats-container">
            <div class="stat">
              <div class="stat-value">25.7%</div>
              <div class="stat-label">全球TOP 1000网站支持率</div>
            </div>
            <div class="stat">
              <div class="stat-value">68.3%</div>
              <div class="stat-label">浏览器支持率</div>
            </div>
            <div class="stat">
              <div class="stat-value">42.1%</div>
              <div class="stat-label">CDN提供商支持率</div>
            </div>
          </div>
        </div>

        <div class="future-trends">
          <h3>发展趋势</h3>
          <div class="trend-cards">
            <div class="trend-card">
              <div class="trend-icon">📈</div>
              <h4>标准化进程加速</h4>
              <p>IETF正在完善QUIC和HTTP/3标准</p>
            </div>
            <div class="trend-card">
              <div class="trend-icon">🤝</div>
              <h4>行业广泛支持</h4>
              <p>Google、Cloudflare、Fastly等公司积极推动</p>
            </div>
            <div class="trend-card">
              <div class="trend-icon">🔧</div>
              <h4>工具链完善</h4>
              <p>Wireshark、Chrome DevTools等增加HTTP/3支持</p>
            </div>
          </div>
        </div>

        <div class="migration-tips">
          <h3>迁移建议</h3>
          <div class="tips">
            <div class="tip">
              <div class="tip-number">1</div>
              <p>评估应用场景，优先在移动端和弱网环境中部署</p>
            </div>
            <div class="tip">
              <div class="tip-number">2</div>
              <p>使用支持HTTP/3的CDN服务提供商</p>
            </div>
            <div class="tip">
              <div class="tip-number">3</div>
              <p>确保UDP 443端口开放且未被防火墙阻止</p>
            </div>
            <div class="tip">
              <div class="tip-number">4</div>
              <p>监控性能指标，验证HTTP/3带来的实际收益</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="activeNav === 'quic'" class="quic-section">
        <h2>QUIC协议</h2>
        <div class="quic-intro">
          <h3>什么是QUIC？</h3>
          <p>
            QUIC（Quick UDP Internet
            Connections）是由Google主导开发的新一代传输层网络协议，旨在替代TCP+TLS，提升互联网传输效率。QUIC基于UDP实现，集成了多路复用、0-RTT连接建立、强加密和拥塞控制等特性，是HTTP/3的底层基础。
          </p>
          <ul class="quic-features">
            <li><strong>1. 基于UDP：</strong>突破传统TCP的限制，减少中间设备干扰。</li>
            <li><strong>2. 连接建立更快：</strong>支持0-RTT和1-RTT握手，极大降低延迟。</li>
            <li><strong>3. 多路复用：</strong>同一连接可并发多条流，彻底解决“队头阻塞”问题。</li>
            <li><strong>4. 内置加密：</strong>所有数据默认加密，安全性更高。</li>
            <li><strong>5. 更智能的拥塞控制：</strong>集成现代拥塞控制算法，提升弱网环境下的性能。</li>
          </ul>
          <div class="quic-diagram">
            <h4>QUIC协议结构简图</h4>
            <img src="https://img.cdn.sugarat.top/mdImg/MTY4ODg2Nzg2NTYyNw==688867865627" alt="QUIC协议结构"
              style="max-width: 100%; border:1px solid #eee; border-radius:8px; margin: 16px 0;">
            <p style="font-size: 0.95em; color: #888;">QUIC协议集成了传输层和安全层，简化了连接流程</p>
          </div>
          <div class="quic-vs-tcp">
            <h4>QUIC与TCP+TLS对比</h4>
            <table class="quic-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>TCP+TLS</th>
                  <th>QUIC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>连接建立</td>
                  <td>3次握手+TLS握手，至少2-3 RTT</td>
                  <td>1次握手（1-RTT），支持0-RTT</td>
                </tr>
                <tr>
                  <td>多路复用</td>
                  <td>有队头阻塞</td>
                  <td>无队头阻塞</td>
                </tr>
                <tr>
                  <td>加密</td>
                  <td>可选（TLS）</td>
                  <td>强制加密（TLS 1.3）</td>
                </tr>
                <tr>
                  <td>拥塞控制</td>
                  <td>内核实现，升级慢</td>
                  <td>用户态实现，升级灵活</td>
                </tr>
                <tr>
                  <td>中断恢复</td>
                  <td>IP变更需重连</td>
                  <td>连接ID支持无缝迁移</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="quic-summary" style="margin-top: 20px;">
            <p>
              <strong>总结：</strong>QUIC通过创新的设计，极大提升了网络传输的速度与安全性，是现代互联网（尤其是HTTP/3）的核心基石。未来，QUIC有望成为主流的互联网传输协议。
            </p>
          </div>
        </div>
      </section>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'overview', title: '协议概述', icon: '📖' },
  { id: 'quic', title: 'QUIC协议', icon: '💡' },
  { id: 'usage', title: '使用方法', icon: '🛠️' },
  { id: 'scenarios', title: '使用场景', icon: '📍' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
  { id: 'future', title: '未来展望', icon: '🔮' },
]);

// 当前激活的导航项
const activeNav = ref('overview');
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

.http3-container {
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

    // 概述部分样式
    .overview-section {
      .protocol-evolution {
        margin-bottom: 40px;

        .timeline {
          position: relative;
          padding-left: 30px;
          margin-top: 20px;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
            background: @primary-color;
            border-radius: 2px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 30px;
            padding-left: 30px;

            &::before {
              content: '';
              position: absolute;
              left: -8px;
              top: 0;
              width: 20px;
              height: 20px;
              background: @primary-color;
              border-radius: 50%;
              border: 4px solid white;
              box-shadow: 0 0 0 2px @primary-color;
            }

            &.current::before {
              background: @secondary-color;
              box-shadow: 0 0 0 2px @secondary-color;
            }

            .timeline-year {
              font-weight: bold;
              font-size: 1.1rem;
              color: @primary-color;
              margin-bottom: 8px;
            }

            .timeline-content {
              background: @light-bg;
              padding: 15px;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

              .version {
                font-weight: bold;
                font-size: 1.2rem;
                margin-bottom: 5px;
                color: @dark-bg;
              }

              p {
                color: lighten(@text-color, 20%);
              }
            }
          }
        }
      }

      .core-concept {
        .concept-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;

          .concept-card {
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

            .concept-icon {
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

    // 使用方法部分样式
    .usage-section {
      .usage-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 25px;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }

        .usage-card {
          background: @light-bg;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

          .card-header {
            display: flex;
            align-items: center;
            padding: 20px;
            background: fade(@primary-color, 10%);
            border-bottom: 1px solid @border-color;

            .card-icon {
              font-size: 2rem;
              margin-right: 15px;
              color: @primary-color;
            }

            h3 {
              font-size: 1.4rem;
              color: @dark-bg;
            }
          }

          .card-content {
            padding: 20px;

            ul {
              padding-left: 20px;
              margin: 15px 0;

              li {
                margin-bottom: 10px;
                line-height: 1.6;
              }
            }

            .browser-support {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
              gap: 15px;
              margin: 20px 0;

              .browser {
                text-align: center;
                padding: 15px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

                .browser-icon {
                  font-size: 2rem;
                  margin-bottom: 8px;
                }

                .browser-name {
                  font-weight: 500;
                  margin-bottom: 5px;
                }

                .support-version {
                  font-size: 0.9rem;
                  color: lighten(@text-color, 20%);
                }
              }
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

        .scenario-card {
          background: @light-bg;
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          border-top: 4px solid @primary-color;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .scenario-icon {
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

    // 优缺点部分样式
    .pros-cons-section {
      .comparison {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
        margin-bottom: 40px;

        .pros,
        .cons {
          padding: 20px;
          border-radius: 12px;
        }

        .pros {
          background: fade(@success-color, 10%);
          border-left: 4px solid @success-color;
        }

        .cons {
          background: fade(@warning-color, 10%);
          border-left: 4px solid @warning-color;
        }

        h3 {
          font-size: 1.4rem;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid fade(@border-color, 50%);
        }

        ul {
          list-style: none;

          li {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid fade(@border-color, 30%);

            .icon {
              font-size: 1.5rem;
              flex-shrink: 0;
              margin-top: 3px;
            }

            div {
              flex: 1;

              strong {
                display: block;
                margin-bottom: 5px;
                font-size: 1.1rem;
              }

              p {
                color: lighten(@text-color, 20%);
                line-height: 1.6;
              }
            }
          }
        }
      }

      .performance-comparison {
        .performance-chart {
          background: @light-bg;
          border-radius: 12px;
          padding: 25px;

          .chart-header {
            display: grid;
            grid-template-columns: 120px 1fr 1fr 1fr;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid @border-color;

            .bar-header {
              text-align: center;
            }
          }

          .chart-row {
            display: grid;
            grid-template-columns: 120px 1fr 1fr 1fr;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px 0;

            .protocol-name {
              font-weight: 500;
            }

            .bar-container {
              background: fade(@border-color, 30%);
              height: 20px;
              border-radius: 10px;
              margin: 0 15px;

              .bar {
                height: 100%;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }

    // 未来展望部分样式
    .future-section {
      .adoption-stats {
        margin-bottom: 40px;

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;

          .stat {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

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

      .future-trends {
        margin-bottom: 40px;

        .trend-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 20px;

          .trend-card {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }

            .trend-icon {
              font-size: 3rem;
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

      .migration-tips {
        .tips {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;

          .tip {
            display: flex;
            gap: 15px;
            background: @light-bg;
            border-radius: 12px;
            padding: 20px;
            align-items: center;

            .tip-number {
              width: 36px;
              height: 36px;
              background: @primary-color;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 1.2rem;
              flex-shrink: 0;
            }

            p {
              flex: 1;
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

  .timeline {
    padding-left: 20px !important;

    .timeline-item {
      padding-left: 20px !important;
    }
  }
}

.quic-section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(44, 62, 80, 0.06);
  padding: 36px 32px 32px 32px;
  margin: 32px 0;
  color: @text-color;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: @primary-color;
  }

  .quic-intro {
    margin-bottom: 32px;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: @accent-color;
    }

    p {
      font-size: 1.08rem;
      line-height: 1.8;
      margin-bottom: 16px;
    }

    .quic-features {
      margin: 0 0 18px 0;
      padding-left: 20px;

      li {
        font-size: 1.05rem;
        margin-bottom: 8px;
        line-height: 1.7;

        strong {
          color: @secondary-color;
        }
      }
    }
  }

  .quic-diagram {
    margin: 24px 0 18px 0;
    text-align: center;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 10px;
      color: @primary-color;
    }

    img {
      max-width: 100%;
      border: 1px solid @border-color;
      border-radius: 8px;
      margin: 12px 0;
      box-shadow: 0 2px 8px rgba(44, 62, 80, 0.04);
    }

    p {
      font-size: 0.95em;
      color: #888;
      margin-top: 4px;
    }
  }

  .quic-vs-tcp {
    margin: 28px 0 0 0;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 10px;
      color: @primary-color;
    }

    .quic-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      background: #fafbfc;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(44, 62, 80, 0.04);

      th,
      td {
        padding: 10px 14px;
        border-bottom: 1px solid @border-color;
        text-align: center;
        font-size: 1rem;
      }

      th {
        background: @primary-color;
        color: #fff;
        font-weight: 600;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .quic-summary {
    margin-top: 20px;
    background: @light-bg;
    border-left: 4px solid @secondary-color;
    padding: 14px 18px;
    border-radius: 6px;
    font-size: 1.05rem;
    color: @text-color;

    strong {
      color: @secondary-color;
    }
  }
}

// 响应式
@media (max-width: 768px) {
  .quic-section {
    padding: 18px 8px 18px 8px;
    margin: 18px 0;

    h2 {
      font-size: 1.3rem;
    }

    .quic-intro h3 {
      font-size: 1.05rem;
    }

    .quic-diagram h4,
    .quic-vs-tcp h4 {
      font-size: 1rem;
    }

    .quic-table th,
    .quic-table td {
      padding: 7px 4px;
      font-size: 0.95rem;
    }
  }
}
</style>
