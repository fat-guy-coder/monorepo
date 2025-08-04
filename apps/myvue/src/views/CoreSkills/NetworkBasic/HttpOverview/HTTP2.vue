<template>
  <div class="http2-container">
    <header class="protocol-header">
      <div class="header-content">
        <h1>HTTP/2 协议基本介绍</h1>
        <p class="subtitle">现代网络传输的革命性升级</p>
        <div class="protocol-tags">
          <span class="tag">二进制协议</span>
          <span class="tag">多路复用</span>
          <span class="tag">头部压缩</span>
          <span class="tag">服务器推送</span>
        </div>
      </div>
      <div class="protocol-icon">🚀</div>
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
        <div class="protocol-evolution">
          <h2>HTTP协议演进历程</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">1991</div>
              <div class="timeline-content">
                <div class="version">HTTP/0.9</div>
                <p>单行协议，只支持GET方法</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1996</div>
              <div class="timeline-content">
                <div class="version">HTTP/1.0</div>
                <p>增加头部信息、状态码和多种方法</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">1997</div>
              <div class="timeline-content">
                <div class="version">HTTP/1.1</div>
                <p>持久连接、管道化、缓存控制</p>
              </div>
            </div>
            <div class="timeline-item current">
              <div class="timeline-year">2015</div>
              <div class="timeline-content">
                <div class="version">HTTP/2</div>
                <p>二进制分帧、头部压缩、多路复用</p>
              </div>
            </div>
          </div>
        </div>

        <div class="core-concept">
          <h2>HTTP/2 核心概念</h2>
          <div class="concept-cards">
            <div class="concept-card">
              <div class="concept-icon">🔢</div>
              <h3>二进制分帧层</h3>
              <p>将HTTP消息分解为更小的帧，提高传输效率</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>多路复用</h3>
              <p>单一连接上并行处理多个请求/响应</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">📦</div>
              <h3>头部压缩</h3>
              <p>使用HPACK算法减少头部数据量</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⬆️</div>
              <h3>服务器推送</h3>
              <p>服务器主动向客户端推送资源</p>
            </div>
          </div>
        </div>
      </section>

      <section class="binary-frame-section">
        <h2>HTTP/2 二进制分帧层基本介绍</h2>
        <div class="binary-frame-content">
          <p>
            在HTTP/2中，所有数据都以<strong>二进制帧（Frame）</strong>的形式进行传输。与HTTP/1.x基于文本的报文不同，HTTP/2将请求和响应拆分为更小的帧，并在同一连接上交错发送，大大提升了传输效率和灵活性。
          </p>
          <ul class="frame-features">
            <li><strong>帧类型丰富：</strong> 包括HEADERS、DATA、SETTINGS、PRIORITY、RST_STREAM等，每种帧承担不同功能。</li>
            <li><strong>流（Stream）机制：</strong> 每个HTTP请求/响应对应一个流，帧通过流ID进行关联，实现多路复用。</li>
            <li><strong>顺序与重组：</strong> 接收端可根据帧头信息将分散的帧重新组装为完整的消息。</li>
            <li><strong>高效传输：</strong> 二进制格式解析更快，减少了协议歧义和解析开销。</li>
          </ul>
          <div class="frame-diagram">
            <h3>帧结构示意图</h3>
            <img src="https://img-blog.csdnimg.cn/20190806155357936.png" alt="HTTP/2帧结构"
              style="max-width: 400px; width: 100%; border: 1px solid #eee; border-radius: 6px;">
            <p class="diagram-desc">
              <small>每个帧由帧头（Frame Header）和帧体（Frame Payload）组成，帧头包含长度、类型、标志、流标识等信息。</small>
            </p>
          </div>
          <div class="frame-example">
            <h3>常见帧类型举例</h3>
            <table class="frame-table">
              <thead>
                <tr>
                  <th>帧类型</th>
                  <th>作用</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DATA</td>
                  <td>承载实际的HTTP请求或响应数据</td>
                </tr>
                <tr>
                  <td>HEADERS</td>
                  <td>发送HTTP头部信息，标识请求或响应的开始</td>
                </tr>
                <tr>
                  <td>SETTINGS</td>
                  <td>协商连接参数，初始化连接</td>
                </tr>
                <tr>
                  <td>PRIORITY</td>
                  <td>指定流的优先级</td>
                </tr>
                <tr>
                  <td>PUSH_PROMISE</td>
                  <td>服务器推送资源时的预告帧</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 使用方法部分 -->
      <section v-if="activeNav === 'usage'" class="usage-section">
        <h2>HTTP/2 使用方法</h2>

        <div class="usage-cards">
          <div class="usage-card">
            <div class="card-header">
              <div class="card-icon">🛠️</div>
              <h3>服务器端配置</h3>
            </div>
            <div class="card-content">
              <p>主流Web服务器启用HTTP/2的方法：</p>
              <ul>
                <li><strong>Nginx</strong>: 1.9.5+版本支持，配置listen 443 ssl http2</li>
                <li><strong>Apache</strong>: 2.4.17+版本支持，使用mod_http2模块</li>
                <li><strong>Node.js</strong>: 使用spdy或http2模块</li>
                <li><strong>CDN服务</strong>: Cloudflare、Akamai等默认启用</li>
              </ul>
              <div class="code-snippet">
                <pre># Nginx 配置示例
server {
    listen 443 ssl http2;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 启用HTTP/2
    http2_push_preload on;
}</pre>
              </div>
            </div>
          </div>

          <div class="usage-card">
            <div class="card-header">
              <div class="card-icon">🌐</div>
              <h3>客户端支持</h3>
            </div>
            <div class="card-content">
              <p>浏览器支持情况：</p>
              <div class="browser-support">
                <div class="browser">
                  <div class="browser-icon">🚀</div>
                  <div class="browser-name">Chrome</div>
                  <div class="support-version">v41+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">🦊</div>
                  <div class="browser-name">Firefox</div>
                  <div class="support-version">v36+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">🅢</div>
                  <div class="browser-name">Safari</div>
                  <div class="support-version">v9+</div>
                </div>
                <div class="browser">
                  <div class="browser-icon">𝐄</div>
                  <div class="browser-name">Edge</div>
                  <div class="support-version">v12+</div>
                </div>
              </div>
              <p>在JavaScript中检测HTTP/2支持：</p>
              <div class="code-snippet">
                <pre>// 检测HTTP/2支持
if (window.performance && window.performance.getEntriesByType) {
  const resources = window.performance.getEntriesByType('resource');
  const isHttp2 = resources.some(r => r.nextHopProtocol === 'h2');
  console.log(isHttp2 ? '使用HTTP/2' : '使用HTTP/1.1');
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- HTTP/1.1 vs HTTP/1.0 -->
      <section v-if="activeNav === 'http1-comparison'" class="comparison-section">
        <h2>HTTP/1.1 vs HTTP/1.0</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>HTTP/1.0</th>
                <th>HTTP/1.1</th>
                <th>改进说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>连接管理</td>
                <td>每个请求需要新连接</td>
                <td>持久连接（Keep-Alive）</td>
                <td>减少TCP握手次数，提高效率</td>
              </tr>
              <tr>
                <td>管道化</td>
                <td>不支持</td>
                <td>支持</td>
                <td>允许发送多个请求而不等待响应</td>
              </tr>
              <tr>
                <td>缓存控制</td>
                <td>基本支持</td>
                <td>强缓存/协商缓存机制</td>
                <td>ETag, Last-Modified等头部</td>
              </tr>
              <tr>
                <td>主机头</td>
                <td>可选</td>
                <td>必须</td>
                <td>支持虚拟主机</td>
              </tr>
              <tr>
                <td>状态码</td>
                <td>基本状态码</td>
                <td>新增100, 203, 205等</td>
                <td>更精确的状态反馈</td>
              </tr>
              <tr>
                <td>分块传输</td>
                <td>不支持</td>
                <td>支持（Transfer-Encoding）</td>
                <td>支持流式传输</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="http11-benefits">
          <h3>HTTP/1.1的主要优点</h3>
          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">🔗</div>
              <h4>持久连接</h4>
              <p>减少TCP握手次数，提高资源加载效率</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">⏱️</div>
              <h4>管道化支持</h4>
              <p>允许同时发送多个请求，减少延迟</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">💾</div>
              <h4>增强缓存机制</h4>
              <p>更精细的缓存控制，减少带宽消耗</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🌐</div>
              <h4>虚拟主机支持</h4>
              <p>单个IP托管多个域名</p>
            </div>
          </div>
        </div>
      </section>

      <!-- HTTP/2新增功能 -->
      <section v-if="activeNav === 'features'" class="features-section">
        <h2>HTTP/2 新增功能</h2>

        <div class="features-comparison">
          <h3>与HTTP/1.1相比的主要改进</h3>
          <div class="comparison-grid">
            <div class="comparison-item">
              <div class="http1">
                <div class="label">HTTP/1.1</div>
                <div class="diagram">
                  <div class="connection">连接1: 请求1 → 响应1</div>
                  <div class="connection">连接2: 请求2 → 响应2</div>
                  <div class="connection">连接3: 请求3 → 响应3</div>
                </div>
                <div class="description">多个并行连接处理请求</div>
              </div>
              <div class="arrow">→</div>
              <div class="http2">
                <div class="label">HTTP/2</div>
                <div class="diagram">
                  <div class="connection">连接1: 请求1 → 响应1<br>请求2 → 响应2<br>请求3 → 响应3</div>
                </div>
                <div class="description">单一连接多路复用所有请求</div>
              </div>
            </div>

            <div class="comparison-item">
              <div class="http1">
                <div class="label">HTTP/1.1</div>
                <div class="diagram">
                  <div class="header">Header: 500-800字节</div>
                </div>
                <div class="description">重复头部信息增加负载</div>
              </div>
              <div class="arrow">→</div>
              <div class="http2">
                <div class="label">HTTP/2</div>
                <div class="diagram">
                  <div class="header">HPACK压缩头部</div>
                  <div class="header">减少40%-90%头部大小</div>
                </div>
                <div class="description">高效头部压缩减少开销</div>
              </div>
            </div>

            <div class="comparison-item">
              <div class="http1">
                <div class="label">HTTP/1.1</div>
                <div class="diagram">
                  <div class="request">客户端请求HTML</div>
                  <div class="request">客户端请求CSS</div>
                  <div class="request">客户端请求JS</div>
                </div>
                <div class="description">客户端必须请求每个资源</div>
              </div>
              <div class="arrow">→</div>
              <div class="http2">
                <div class="label">HTTP/2</div>
                <div class="diagram">
                  <div class="request">客户端请求HTML</div>
                  <div class="push">服务器推送CSS+JS</div>
                </div>
                <div class="description">服务器主动推送相关资源</div>
              </div>
            </div>
          </div>
        </div>

        <div class="priority-features">
          <h3>流量控制与优先级</h3>
          <div class="priority-cards">
            <div class="priority-card">
              <div class="priority-icon">📶</div>
              <h4>流量控制</h4>
              <p>基于信用机制，防止接收方过载</p>
            </div>
            <div class="priority-card">
              <div class="priority-icon">🔝</div>
              <h4>流优先级</h4>
              <p>客户端可指定资源加载优先级</p>
            </div>
            <div class="priority-card">
              <div class="priority-icon">🛡️</div>
              <h4>更安全的TLS</h4>
              <p>要求TLS 1.2+，禁用不安全加密套件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section v-if="activeNav === 'scenarios'" class="scenarios-section">
        <h2>HTTP/2 使用场景</h2>

        <div class="scenario-cards">
          <div class="scenario-card">
            <div class="scenario-icon">🌐</div>
            <h3>内容丰富的网站</h3>
            <p>加载大量CSS、JS和图片资源的网站</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>移动端应用</h3>
            <p>减少延迟，提高移动网络性能</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎥</div>
            <h3>流媒体服务</h3>
            <p>视频/音频流传输，多路复用提高效率</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🛒</div>
            <h3>电子商务平台</h3>
            <p>加快页面加载，提升用户体验和转化率</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>API服务</h3>
            <p>高效处理大量并发API请求</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <h3>CDN服务</h3>
            <p>内容分发网络减少边缘节点延迟</p>
          </div>
        </div>

        <div class="performance-impact">
          <h3>性能影响</h3>
          <div class="performance-stats">
            <div class="stat">
              <div class="stat-value">30-50%</div>
              <div class="stat-label">页面加载时间减少</div>
            </div>
            <div class="stat">
              <div class="stat-value">60-70%</div>
              <div class="stat-label">头部大小减少</div>
            </div>
            <div class="stat">
              <div class="stat-value">90%</div>
              <div class="stat-label">连接数减少</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点部分 -->
      <section v-if="activeNav === 'pros-cons'" class="pros-cons-section">
        <h2>HTTP/2 优缺点分析</h2>

        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>减少延迟</strong>
                  <p>多路复用解决队头阻塞问题</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>提高吞吐量</strong>
                  <p>单一连接处理更多请求</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>头部压缩</strong>
                  <p>显著减少协议开销</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>服务器推送</strong>
                  <p>主动推送资源，减少往返次数</p>
                </div>
              </li>
              <li>
                <div class="icon">✅</div>
                <div>
                  <strong>请求优先级</strong>
                  <p>优化关键资源加载顺序</p>
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
                  <strong>TCP层阻塞</strong>
                  <p>仍受TCP队头阻塞影响</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>服务器推送实现复杂</strong>
                  <p>需要智能预测客户端需求</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>加密要求</strong>
                  <p>浏览器要求HTTPS连接</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>中间设备兼容性</strong>
                  <p>老旧代理服务器可能不支持</p>
                </div>
              </li>
              <li>
                <div class="icon">⚠️</div>
                <div>
                  <strong>调试复杂性</strong>
                  <p>二进制协议更难直接调试</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="adoption-tips">
          <h3>采用建议</h3>
          <div class="tips">
            <div class="tip">
              <div class="tip-number">1</div>
              <p>优先在HTTPS网站上启用HTTP/2</p>
            </div>
            <div class="tip">
              <div class="tip-number">2</div>
              <p>使用支持HTTP/2的CDN服务</p>
            </div>
            <div class="tip">
              <div class="tip-number">3</div>
              <p>优化服务器推送策略，避免过度推送</p>
            </div>
            <div class="tip">
              <div class="tip-number">4</div>
              <p>监控性能指标，验证HTTP/2带来的收益</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="protocol-footer">
      <p>HTTP/2 是现代Web性能优化的基础，显著提升了网络应用的加载速度和用户体验</p>
      <div class="footer-links">
        <a href="#">RFC 7540 规范</a>
        <a href="#">HTTP/2 实现指南</a>
        <a href="#">性能测试工具</a>
        <a href="#">浏览器支持列表</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'overview', title: '协议概述', icon: '📖' },
  { id: 'usage', title: '使用方法', icon: '🛠️' },
  { id: 'http1-comparison', title: 'HTTP/1.1改进', icon: '🔄' },
  { id: 'features', title: 'HTTP/2功能', icon: '✨' },
  { id: 'scenarios', title: '使用场景', icon: '📍' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' }
]);

// 当前激活的导航项
const activeNav = ref('overview');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

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

.http2-container {
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

    // HTTP/1.1比较部分
    .comparison-section {
      .comparison-table {
        overflow-x: auto;
        margin-bottom: 40px;

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

          tr:hover {
            background: fade(@primary-color, 8%);
          }
        }
      }

      .http11-benefits {
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;

          .benefit {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @warning-color;

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

    // HTTP/2功能部分
    .features-section {
      .features-comparison {
        margin-bottom: 40px;

        .comparison-grid {
          display: grid;
          gap: 30px;

          .comparison-item {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .http1,
            .http2 {
              flex: 1;
              text-align: center;

              .label {
                font-weight: bold;
                font-size: 1.2rem;
                margin-bottom: 15px;
              }

              .diagram {
                background: white;
                padding: 20px;
                border-radius: 8px;
                min-height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

                .connection,
                .header,
                .request,
                .push {
                  padding: 10px;
                  margin: 5px 0;
                  border-radius: 6px;
                }

                .connection {
                  background: fade(@error-color, 10%);
                  border-left: 3px solid @error-color;
                }

                .header {
                  background: fade(@warning-color, 10%);
                  border-left: 3px solid @warning-color;
                }

                .request {
                  background: fade(@primary-color, 10%);
                  border-left: 3px solid @primary-color;
                }

                .push {
                  background: fade(@success-color, 10%);
                  border-left: 3px solid @success-color;
                }
              }

              .description {
                margin-top: 15px;
                color: lighten(@text-color, 20%);
              }
            }

            .arrow {
              font-size: 2rem;
              padding: 0 20px;
              color: @primary-color;
            }
          }
        }
      }

      .priority-features {
        .priority-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;

          .priority-card {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border-top: 4px solid @accent-color;

            .priority-icon {
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

    // 使用场景部分样式
    .scenarios-section {
      .scenario-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 40px;

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

      .performance-impact {
        .performance-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;

          .stat {
            background: @light-bg;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border-top: 4px solid @success-color;

            .stat-value {
              font-size: 2.5rem;
              font-weight: bold;
              color: @success-color;
              margin-bottom: 10px;
            }

            .stat-label {
              color: lighten(@text-color, 20%);
            }
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

      .adoption-tips {
        .tips {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;

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

  .comparison-item {
    flex-direction: column !important;
    gap: 20px !important;

    .arrow {
      transform: rotate(90deg);
      padding: 20px 0 !important;
    }
  }
}

/* 概述部分样式 */
.overview-section {
  background: #f8fafc;
  border-radius: 10px;
  padding: 32px 24px 24px 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.protocol-evolution {
  margin-bottom: 32px;
}

.protocol-evolution h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #2b3a55;
}

.timeline {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding-left: 40px;
}

.timeline-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 18px 20px;
  min-width: 120px;
  position: relative;
  border-left: 4px solid #b3c6e0;
  transition: border-color 0.3s;
}

.timeline-item.current {
  border-left: 4px solid #3b82f6;
  background: #e8f1ff;
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 6px;
}

.timeline-content .version {
  font-size: 1rem;
  font-weight: 600;
  color: #22223b;
  margin-bottom: 4px;
}

.timeline-content p {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
}

/* 核心概念卡片 */
.core-concept {
  margin-bottom: 32px;
}

.core-concept h2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: #2b3a55;
}

.concept-cards {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.concept-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 18px 20px;
  flex: 1 1 180px;
  min-width: 160px;
  text-align: center;
  margin-bottom: 12px;
}

.concept-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.concept-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #2563eb;
}

.concept-card p {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
}

/* 二进制分帧层基本介绍 */
.binary-frame-section {
  background: #f4f7fb;
  border-radius: 10px;
  padding: 32px 24px 24px 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.binary-frame-section h2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: #2b3a55;
}

.binary-frame-content p {
  font-size: 1rem;
  color: #374151;
  margin-bottom: 14px;
}

.frame-features {
  margin-bottom: 18px;
  padding-left: 18px;
}

.frame-features li {
  font-size: 0.98rem;
  color: #374151;
  margin-bottom: 6px;
  list-style: disc;
}

.frame-diagram {
  margin-bottom: 18px;
  text-align: center;
}

.frame-diagram h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2563eb;
}

.frame-diagram img {
  margin-bottom: 6px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.diagram-desc {
  color: #6b7280;
  font-size: 0.92rem;
}

.frame-example {
  margin-top: 10px;
}

.frame-example h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2563eb;
}

.frame-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.frame-table th,
.frame-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  font-size: 0.98rem;
}

.frame-table th {
  background: #f1f5f9;
  color: #2563eb;
  font-weight: 600;
}

.frame-table tr:last-child td {
  border-bottom: none;
}

/* 响应式 */
@media (max-width: 900px) {
  .timeline {
    flex-direction: column;
    gap: 16px;
    padding-left: 0;
  }

  .concept-cards {
    flex-wrap: wrap;
    gap: 12px;
  }
}

@media (max-width: 600px) {

  .overview-section,
  .binary-frame-section {
    padding: 16px 8px 12px 8px;
  }

  .concept-cards {
    flex-direction: column;
    gap: 8px;
  }

  .timeline-item {
    min-width: 0;
    padding: 12px 10px;
  }

  .frame-table th,
  .frame-table td {
    padding: 7px 6px;
    font-size: 0.92rem;
  }
}
</style>
