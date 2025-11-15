<template>
  <div class="proxy-container">
    <!-- 头部区域 -->
    <header class="hero-section">
      <div class="network-lines"></div>
      <div class="hero-content">
        <h1>代理与反向代理 <span class="subtitle">网络流量的智能路由</span></h1>
        <p class="tagline">优化网络请求路径，提升安全性与性能的核心技术</p>
        <div class="proxy-stats">
          <div class="stat">
            <div class="stat-value">87%</div>
            <div class="stat-label">企业使用代理服务器</div>
          </div>
          <div class="stat">
            <div class="stat-value">73%</div>
            <div class="stat-label">网站使用反向代理</div>
          </div>
          <div class="stat">
            <div class="stat-value">65%</div>
            <div class="stat-label">性能提升幅度</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 基本概念 -->
    <section class="concepts-section">
      <div class="section-header">
        <h2>基本概念</h2>
        <p>理解代理与反向代理的核心差异</p>
      </div>

      <div class="concept-cards">
        <div class="concept-card forward-proxy">
          <div class="card-header">
            <span class="icon">🛡️</span>
            <h3>正向代理 (Proxy)</h3>
          </div>
          <div class="card-body">
            <p>客户端使用的代理服务器，代表客户端向互联网发送请求。</p>
            <div class="characteristics">
              <div class="char-item">
                <span class="char-icon">📍</span>
                <span class="char-text">位置：客户端侧</span>
              </div>
              <div class="char-item">
                <span class="char-icon">👤</span>
                <span class="char-text">代理对象：客户端</span>
              </div>
              <div class="char-item">
                <span class="char-icon">🎯</span>
                <span class="char-text">目标：访问任意服务器</span>
              </div>
            </div>
          </div>
        </div>

        <div class="concept-card reverse-proxy">
          <div class="card-header">
            <span class="icon">🔁</span>
            <h3>反向代理 (Reverse Proxy)</h3>
          </div>
          <div class="card-body">
            <p>服务器端使用的代理，接收客户端请求并转发给后端服务器。</p>
            <div class="characteristics">
              <div class="char-item">
                <span class="char-icon">📍</span>
                <span class="char-text">位置：服务器侧</span>
              </div>
              <div class="char-item">
                <span class="char-icon">🖥️</span>
                <span class="char-text">代理对象：服务器</span>
              </div>
              <div class="char-item">
                <span class="char-icon">🎯</span>
                <span class="char-text">目标：保护后端服务器</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作原理可视化 -->
    <section class="workflow-section">
      <div class="section-header">
        <h2>工作原理</h2>
        <p>理解数据如何在代理系统中流动</p>
      </div>

      <div class="workflow-diagram">
        <div class="workflow forward-workflow">
          <h3>正向代理工作流</h3>
          <div class="steps">
            <div class="step client">
              <div class="step-icon">💻</div>
              <div class="step-label">客户端</div>
            </div>
            <div class="arrow">➔</div>
            <div class="step proxy">
              <div class="step-icon">🛡️</div>
              <div class="step-label">代理服务器</div>
            </div>
            <div class="arrow">➔</div>
            <div class="step internet">
              <div class="step-icon">🌐</div>
              <div class="step-label">互联网</div>
            </div>
            <div class="arrow">➔</div>
            <div class="step server">
              <div class="step-icon">📡</div>
              <div class="step-label">目标服务器</div>
            </div>
          </div>
          <div class="workflow-description">
            客户端通过代理服务器连接到互联网，目标服务器只能看到代理的IP地址
          </div>
        </div>

        <div class="workflow reverse-workflow">
          <h3>反向代理工作流</h3>
          <div class="steps reversed">
            <div class="step client">
              <div class="step-icon">💻</div>
              <div class="step-label">客户端</div>
            </div>
            <div class="arrow">➔</div>
            <div class="step proxy">
              <div class="step-icon">🔁</div>
              <div class="step-label">反向代理</div>
            </div>
            <div class="arrow">➔</div>
            <div class="step server-group">
              <div class="server">
                <div class="step-icon">📡</div>
                <div class="step-label">服务器A</div>
              </div>
              <div class="server">
                <div class="step-icon">📡</div>
                <div class="step-label">服务器B</div>
              </div>
              <div class="server">
                <div class="step-icon">📡</div>
                <div class="step-label">服务器C</div>
              </div>
            </div>
          </div>
          <div class="workflow-description">
            客户端直接连接到反向代理，代理将请求分发到后端服务器集群
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景比较 -->
    <section class="use-cases-section">
      <div class="section-header">
        <h2>使用场景</h2>
        <p>代理与反向代理的实际应用</p>
      </div>

      <div class="use-case-grid">
        <div class="use-case proxy-cases">
          <h3>正向代理常见用途</h3>
          <div class="case-card">
            <div class="case-icon">🌍</div>
            <div class="case-content">
              <h4>绕过地理限制</h4>
              <p>访问受地域限制的内容（如流媒体服务）</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">👀</div>
            <div class="case-content">
              <h4>隐私保护</h4>
              <p>隐藏用户真实IP地址，防止追踪</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🔐</div>
            <div class="case-content">
              <h4>企业安全策略</h4>
              <p>公司内网访问外部资源的统一出口</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🚫</div>
            <div class="case-content">
              <h4>内容过滤</h4>
              <p>阻止访问特定网站或内容类型</p>
            </div>
          </div>
        </div>

        <div class="use-case reverse-proxy-cases">
          <h3>反向代理常见用途</h3>
          <div class="case-card">
            <div class="case-icon">⚖️</div>
            <div class="case-content">
              <h4>负载均衡</h4>
              <p>在多台服务器间分配流量</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🛡️</div>
            <div class="case-content">
              <h4>安全防护</h4>
              <p>防止DDoS攻击，隐藏后端服务器</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🚀</div>
            <div class="case-content">
              <h4>性能优化</h4>
              <p>缓存静态内容，SSL终止</p>
            </div>
          </div>
          <div class="case-card">
            <div class="case-icon">🌉</div>
            <div class="case-content">
              <h4>统一入口点</h4>
              <p>为多个服务提供单一访问点</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关键技术对比 -->
    <section class="comparison-section">
      <div class="section-header">
        <h2>关键技术对比</h2>
        <p>正向代理与反向代理的核心差异</p>
      </div>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>正向代理</th>
              <th>反向代理</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>位置</td>
              <td>客户端侧</td>
              <td>服务器侧</td>
            </tr>
            <tr>
              <td>客户端感知</td>
              <td>需要显式配置</td>
              <td>对客户端透明</td>
            </tr>
            <tr>
              <td>主要目的</td>
              <td>代表客户端访问资源</td>
              <td>代表服务器提供服务</td>
            </tr>
            <tr>
              <td>IP地址暴露</td>
              <td>隐藏客户端IP</td>
              <td>隐藏服务器IP</td>
            </tr>
            <tr>
              <td>典型用例</td>
              <td>突破网络限制、隐私保护</td>
              <td>负载均衡、安全防护</td>
            </tr>
            <tr>
              <td>部署复杂度</td>
              <td>中等（需配置客户端）</td>
              <td>高（需配置服务器架构）</td>
            </tr>
            <tr>
              <td>常见工具</td>
              <td>Squid, Shadowsocks</td>
              <td>Nginx, HAProxy, Cloudflare</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 实际应用示例 -->
    <section class="examples-section">
      <div class="section-header">
        <h2>实际应用示例</h2>
        <p>真实世界中的代理技术应用</p>
      </div>

      <div class="example-cards">
        <div class="example-card">
          <div class="example-header">
            <div class="logo">🌐</div>
            <h3>VPN服务</h3>
          </div>
          <div class="example-body">
            <p>企业VPN使用正向代理技术，允许员工安全地访问公司内部资源。</p>
            <div class="proxy-type">正向代理应用</div>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="logo">📱</div>
            <h3>内容分发网络</h3>
          </div>
          <div class="example-body">
            <p>CDN使用反向代理缓存内容在全球边缘节点，加速用户访问。</p>
            <div class="proxy-type">反向代理应用</div>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="logo">🏢</div>
            <h3>企业Web网关</h3>
          </div>
          <div class="example-body">
            <p>企业使用正向代理监控和控制员工互联网访问，过滤不当内容。</p>
            <div class="proxy-type">正向代理应用</div>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="logo">🛡️</div>
            <h3>Web应用防火墙</h3>
          </div>
          <div class="example-body">
            <p>Cloudflare等WAF服务使用反向代理保护网站免受攻击。</p>
            <div class="proxy-type">反向代理应用</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术选择指南 -->
    <section class="selection-guide">
      <div class="section-header">
        <h2>技术选择指南</h2>
        <p>何时使用代理与反向代理</p>
      </div>

      <div class="guide-container">
        <div class="guide-card">
          <h3>选择正向代理当：</h3>
          <ul>
            <li>需要隐藏客户端身份和位置</li>
            <li>绕过地理位置限制或审查</li>
            <li>在企业环境中监控员工互联网使用</li>
            <li>需要统一客户端网络出口</li>
            <li>提高客户端访问速度（通过缓存）</li>
          </ul>
        </div>

        <div class="guide-card">
          <h3>选择反向代理当：</h3>
          <ul>
            <li>需要保护后端服务器免受直接访问</li>
            <li>在多台服务器间分配流量（负载均衡）</li>
            <li>需要为多个服务提供单一访问点</li>
            <li>需要提升网站性能和可靠性</li>
            <li>实施SSL终端以减轻后端服务器负担</li>
          </ul>
        </div>
      </div>

      <div class="hybrid-note">
        <div class="note-icon">💡</div>
        <div class="note-content">
          <strong>混合使用：</strong> 在实际架构中，常常同时使用正向代理和反向代理。例如：员工通过公司正向代理访问互联网，
          而公司网站则通过反向代理处理外部请求。
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="proxy-footer">
      <div class="footer-content">
        <div class="footer-summary">
          <h3>代理与反向代理总结</h3>
          <p>正向代理是客户端的"代言人"，隐藏用户身份访问外部资源；反向代理是服务器的"守门人"，保护后端资源并优化访问体验。</p>
        </div>
        <div class="footer-links">
          <h3>了解更多</h3>
          <ul>
            <li>Nginx反向代理配置</li>
            <li>Squid正向代理部署</li>
            <li>云服务商的代理解决方案</li>
            <li>现代Web架构设计</li>
          </ul>
        </div>
      </div>
      <div class="copyright">
         网络架构知识分享 | 代理技术基础介绍
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 动画效果
const animateElements = () => {
  const animateOnScroll = (elements: NodeListOf<Element>) => {
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.85) {
        element.classList.add('animated');
      }
    });
  };

  const animatedElements = document.querySelectorAll('.concept-card, .case-card, .example-card, .guide-card');
  window.addEventListener('scroll', () => animateOnScroll(animatedElements));
  animateOnScroll(animatedElements); // 初始化检查
};

onMounted(() => {
  animateElements();
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@accent-color: #e74c3c;
@background-color: #f8f9ff;
@text-color: #2c3e50;
@card-bg: #ffffff;
@border-color: #ecf0f1;
@forward-proxy-color: #3498db;
@reverse-proxy-color: #9b59b6;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.proxy-container {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;
}

/* 头部样式 */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  border-radius: 0 0 30px 30px;
  padding: 80px 20px 70px;
  margin-bottom: 50px;
  color: white;
  text-align: center;
  overflow: hidden;

  .network-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;

    h1 {
      font-size: 3.2rem;
      margin: 0 0 15px;
      font-weight: 800;
      letter-spacing: -1px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      font-size: 1.6rem;
      font-weight: 300;
      opacity: 0.9;
    }

    .tagline {
      font-size: 1.4rem;
      max-width: 700px;
      margin: 20px auto 40px;
      font-weight: 300;
      opacity: 0.85;
    }
  }

  .proxy-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;

    .stat {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      padding: 20px 30px;
      min-width: 160px;

      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 1.1rem;
        opacity: 0.9;
      }
    }
  }
}

/* 通用分区头部样式 */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
    color: @text-color;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, @primary-color, @secondary-color);
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-top: 20px;
  }
}

/* 基本概念部分 */
.concepts-section {
  margin-bottom: 70px;

  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .concept-card {

    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animated {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      padding: 25px 30px 15px;
      display: flex;
      align-items: center;
      gap: 15px;

      .icon {
        font-size: 2.5rem;
      }

      h3 {
        font-size: 1.8rem;
        margin: 0;
      }
    }

    .card-body {
      padding: 20px 30px 30px;

      p {
        font-size: 1.1rem;
        margin-bottom: 25px;
        line-height: 1.7;
      }
    }

    &.forward-proxy {
      border-top: 5px solid @forward-proxy-color;

      .card-header {
        background: rgba(@forward-proxy-color, 0.08);
      }
    }

    &.reverse-proxy {
      border-top: 5px solid @reverse-proxy-color;

      .card-header {
        background: rgba(@reverse-proxy-color, 0.08);
      }
    }

    .characteristics {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;

      .char-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 15px;
        background: rgba(0, 0, 0, 0.02);
        border-radius: 8px;

        .char-icon {
          font-size: 1.3rem;
        }

        .char-text {
          font-weight: 500;
        }
      }
    }
  }
}

/* 工作流程部分 */
.workflow-section {
  margin-bottom: 70px;

  .workflow-diagram {
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
    max-width: 1000px;
    margin: 0 auto;

    .workflow {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

      h3 {
        text-align: center;
        font-size: 1.6rem;
        margin-bottom: 30px;
        color: @text-color;
      }
    }

    .forward-workflow h3 {
      color: @forward-proxy-color;
    }

    .reverse-workflow h3 {
      color: @reverse-proxy-color;
    }

    .steps {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;

      &.reversed {
        .server-group {
          display: flex;
          gap: 15px;

          .server {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 120px;

        .step-icon {
          font-size: 3.5rem;
          margin-bottom: 10px;
        }

        .step-label {
          font-weight: 500;
          text-align: center;
        }
      }

      .arrow {
        font-size: 2rem;
        color: #7f8c8d;
        margin: -10px 0 0;
      }
    }

    .workflow-description {
      text-align: center;
      font-style: italic;
      color: #7f8c8d;
      padding: 15px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 8px;
    }
  }
}

/* 使用场景部分 */
.use-cases-section {
  margin-bottom: 70px;

  .use-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .use-case {
    background: @card-bg;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 1.6rem;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid @border-color;
    }

    &.proxy-cases h3 {
      color: @forward-proxy-color;
    }

    &.reverse-proxy-cases h3 {
      color: @reverse-proxy-color;
    }
  }

  .case-card {
    display: flex;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid @border-color;
    opacity: 1;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &:last-child {
      border-bottom: none;
    }

    &.animated {
      opacity: 1;
      transform: translateY(0);
    }

    .case-icon {
      font-size: 2.5rem;
      min-width: 50px;
    }

    .case-content {
      h4 {
        font-size: 1.3rem;
        margin: 5px 0 10px;
      }

      p {
        color: #7f8c8d;
        line-height: 1.7;
      }
    }
  }
}

/* 对比表格部分 */
.comparison-section {
  margin-bottom: 70px;

  .comparison-table {
    background: @card-bg;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 18px 25px;
        text-align: left;
      }

      thead {
        background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
        color: white;

        th {
          font-weight: 600;

          &:first-child {
            border-radius: 16px 0 0 0;
          }

          &:last-child {
            border-radius: 0 16px 0 0;
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid @border-color;

          &:nth-child(odd) {
            background: rgba(0, 0, 0, 0.02);
          }

          &:last-child {
            border-bottom: none;
          }

          td:first-child {
            font-weight: 500;
          }

          td:nth-child(2) {
            color: @forward-proxy-color;
          }

          td:nth-child(3) {
            color: @reverse-proxy-color;
          }
        }
      }
    }
  }
}

/* 应用示例部分 */
.examples-section {
  margin-bottom: 70px;

  .example-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .example-card {
    background: @card-bg;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 1;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;

    &.animated {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .example-header {
      padding: 25px 25px 15px;
      display: flex;
      align-items: center;
      gap: 15px;

      .logo {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.4rem;
        margin: 0;
      }
    }

    .example-body {
      padding: 0 25px 30px;

      p {
        line-height: 1.7;
        margin-bottom: 20px;
      }

      .proxy-type {
        display: inline-block;
        padding: 6px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    &:nth-child(1) .proxy-type,
    &:nth-child(3) .proxy-type {
      background: rgba(@forward-proxy-color, 0.15);
      color: @forward-proxy-color;
    }

    &:nth-child(2) .proxy-type,
    &:nth-child(4) .proxy-type {
      background: rgba(@reverse-proxy-color, 0.15);
      color: @reverse-proxy-color;
    }
  }
}

/* 选择指南部分 */
.selection-guide {
  margin-bottom: 70px;

  .guide-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
    max-width: 1000px;
    margin: 0 auto 40px;
  }

  .guide-card {
    background: @card-bg;
    border-radius: 16px;
    padding: 35px 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
    }

    &:first-child::before {
      background: @forward-proxy-color;
    }

    &:last-child::before {
      background: @reverse-proxy-color;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid @border-color;
    }

    ul {
      list-style-type: none;

      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 15px;
        line-height: 1.7;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 0;
          width: 22px;
          height: 22px;
          background: rgba(46, 204, 113, 0.15);
          color: #27ae60;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
      }
    }
  }

  .hybrid-note {
    background: rgba(241, 196, 15, 0.1);
    border-radius: 16px;
    padding: 25px 30px;
    display: flex;
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
    border-left: 4px solid #f1c40f;

    .note-icon {
      font-size: 2.5rem;
      color: #f1c40f;
    }

    .note-content {
      strong {
        display: block;
        margin-bottom: 10px;
        font-size: 1.1rem;
        color: @text-color;
      }

      p {
        line-height: 1.7;
        color: #7f8c8d;
      }
    }
  }
}

/* 页脚 */
.proxy-footer {
  background: @text-color;
  color: white;
  border-radius: 30px 30px 0 0;
  padding: 60px 40px 30px;
  margin-top: 50px;

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50px;
    max-width: 1200px;
    margin: 0 auto 40px;

    .footer-summary {
      h3 {
        font-size: 1.8rem;
        margin-bottom: 20px;
      }

      p {
        line-height: 1.8;
        opacity: 0.85;
      }
    }

    .footer-links {
      h3 {
        font-size: 1.4rem;
        margin-bottom: 20px;
      }

      ul {
        list-style-type: none;

        li {
          margin-bottom: 15px;
          opacity: 0.85;
          transition: opacity 0.3s;

          &:hover {
            opacity: 1;
            cursor: pointer;
          }
        }
      }
    }
  }

  .copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.7;
    font-size: 0.9rem;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-section {
    padding: 50px 20px 40px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .tagline {
      font-size: 1.1rem;
    }

    .proxy-stats {
      flex-direction: column;
      gap: 20px;
      max-width: 300px;
      margin: 30px auto 0;

      .stat {
        padding: 15px;
      }
    }
  }

  .concept-cards,
  .use-case-grid,
  .guide-container {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .workflow-diagram {
    .steps {
      flex-wrap: wrap;
      gap: 10px;

      .arrow {
        transform: rotate(90deg);
        margin: 0;
      }
    }
  }
}
</style>
