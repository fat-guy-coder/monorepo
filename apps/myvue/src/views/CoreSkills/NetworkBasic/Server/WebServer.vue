<template>
  <div class="web-server-container">
    <!-- 标题区域 -->
    <section class="hero-section">
      <h1 class="hero-title">Web服务器介绍</h1>
      <div class="hero-subtitle">互联网世界的核心基础设施</div>
      <div class="hero-stats">
        <div class="stat-card">
          <div class="stat-icon">🌐</div>
          <div class="stat-value">45亿+</div>
          <div class="stat-label">互联网用户</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">1.8亿+</div>
          <div class="stat-label">活跃网站</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡️</div>
          <div class="stat-value">73%</div>
          <div class="stat-label">市场份额</div>
        </div>
      </div>
    </section>

    <!-- 概念介绍 -->
    <section class="section">
      <h2 class="section-title">什么是Web服务器？</h2>
      <div class="concept-card">
        <div class="concept-icon">🔍</div>
        <div class="concept-content">
          <p>
            <strong>Web服务器</strong>是一种专门用来处理HTTP请求的软件或硬件系统，
            它接收来自客户端（通常是浏览器）的请求，处理这些请求并返回响应（通常是网页）。
          </p>
          <div class="highlight-box">
            <div class="highlight-icon">💡</div>
            <div class="highlight-content">
              Web服务器是互联网基础设施的核心组件，负责存储、处理和传输网页内容，使用HTTP/HTTPS协议与客户端通信。
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心组件 -->
    <section class="section">
      <h2 class="section-title">Web服务器核心组件</h2>
      <div class="components-grid">
        <div class="component-card">
          <div class="component-icon">📡</div>
          <h3>监听器</h3>
          <p>监听特定端口（通常是80或443），接收客户端请求</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🔍</div>
          <h3>请求解析器</h3>
          <p>解析HTTP请求头和方法，确定客户端需求</p>
        </div>
        <div class="component-card">
          <div class="component-icon">📁</div>
          <h3>资源处理器</h3>
          <p>定位并读取请求的资源（HTML、CSS、JS文件等）</p>
        </div>
        <div class="component-card">
          <div class="component-icon">🔄</div>
          <h3>响应生成器</h3>
          <p>构建包含状态码、头部和数据主体的HTTP响应</p>
        </div>
      </div>
    </section>

    <!-- 工作原理图解 -->
    <section class="section">
      <h2 class="section-title">Web服务器工作原理</h2>
      <div class="workflow-container">
        <div class="workflow-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>建立连接</h3>
            <p>客户端通过TCP三次握手与服务器建立连接</p>
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>接收请求</h3>
            <p>服务器接收HTTP请求并解析方法、URL和头部</p>
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>处理请求</h3>
            <p>定位资源、执行服务器端脚本（如PHP/Python）</p>
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>生成响应</h3>
            <p>构建包含状态码、头部和内容主体的HTTP响应</p>
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>发送响应</h3>
            <p>通过TCP连接将响应发送回客户端</p>
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step">
          <div class="step-number">6</div>
          <div class="step-content">
            <h3>日志记录</h3>
            <p>在访问日志中记录请求详细信息</p>
          </div>
        </div>
      </div>
      <div class="protocol-diagram">
        <div class="protocol-client">
          <div class="device-icon">💻</div>
          <div class="device-label">客户端</div>
        </div>
        <div class="protocol-arrow">⇄ HTTP(S) ⇄</div>
        <div class="protocol-server">
          <div class="device-icon">🖥️</div>
          <div class="device-label">Web服务器</div>
        </div>
        <div class="protocol-arrow">⇄ TCP/IP ⇄</div>
        <div class="protocol-database">
          <div class="device-icon">🗄️</div>
          <div class="device-label">数据库/文件系统</div>
        </div>
      </div>
    </section>

    <!-- 服务器类型比较 -->
    <section class="section">
      <h2 class="section-title">主流Web服务器比较</h2>
      <div class="comparison-table">
        <div class="table-header">
          <div class="table-cell feature">特性</div>
          <div class="table-cell">Apache</div>
          <div class="table-cell">Nginx</div>
          <div class="table-cell">IIS</div>
          <div class="table-cell">Lighttpd</div>
        </div>

        <div class="table-row">
          <div class="table-cell feature">首次发布</div>
          <div class="table-cell">1995年</div>
          <div class="table-cell">2004年</div>
          <div class="table-cell">1995年</div>
          <div class="table-cell">2003年</div>
        </div>

        <div class="table-row">
          <div class="table-cell feature">占用内存</div>
          <div class="table-cell">较高</div>
          <div class="table-cell">很低</div>
          <div class="table-cell">中等</div>
          <div class="table-cell">极低</div>
        </div>

        <div class="table-row">
          <div class="table-cell feature">并发处理</div>
          <div class="table-cell">进程/线程模型</div>
          <div class="table-cell">事件驱动</div>
          <div class="table-cell">线程池</div>
          <div class="table-cell">事件驱动</div>
        </div>

        <div class="table-row">
          <div class="table-cell feature">配置文件</div>
          <div class="table-cell">.htaccess</div>
          <div class="table-cell">nginx.conf</div>
          <div class="table-cell">GUI/web.config</div>
          <div class="table-cell">lighttpd.conf</div>
        </div>

        <div class="table-row">
          <div class="table-cell feature">适用场景</div>
          <div class="table-cell">传统应用</div>
          <div class="table-cell">高并发站点</div>
          <div class="table-cell">Windows环境</div>
          <div class="table-cell">嵌入式系统</div>
        </div>
      </div>
    </section>

    <!-- 服务器功能表 -->
    <section class="section">
      <h2 class="section-title">Web服务器核心功能</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📂</div>
          <h3>静态文件服务</h3>
          <p>提供HTML、CSS、JS、图像等静态资源</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h3>动态内容处理</h3>
          <p>执行PHP、Python、Node.js等服务器端脚本</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>HTTPS支持</h3>
          <p>通过SSL/TLS实现安全加密通信</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚖️</div>
          <h3>负载均衡</h3>
          <p>在多台服务器间分配请求负载</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>访问控制</h3>
          <p>基于IP、用户、角色的权限管理</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>日志记录</h3>
          <p>记录访问日志和错误日志用于分析</p>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="section">
      <h2 class="section-title">Web服务器应用场景</h2>
      <div class="use-case-container">
        <div class="use-case">
          <div class="use-case-icon">🌐</div>
          <div class="use-case-content">
            <h3>网站托管</h3>
            <p>托管个人博客、企业官网、电子商务平台等各种网站</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">📱</div>
          <div class="use-case-content">
            <h3>API服务</h3>
            <p>为移动应用和前端提供RESTful或GraphQL API接口</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">🔄</div>
          <div class="use-case-content">
            <h3>反向代理</h3>
            <p>作为前端服务器分发请求到后端应用服务器</p>
          </div>
        </div>
        <div class="use-case">
          <div class="use-case-icon">🔁</div>
          <div class="use-case-content">
            <h3>内容缓存</h3>
            <p>缓存静态内容减轻后端服务器压力</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 选择建议 -->
    <section class="section">
      <h2 class="section-title">如何选择Web服务器？</h2>
      <div class="selection-guide">
        <div class="guide-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>评估需求</h3>
            <p>确定预期的流量、并发连接数和资源类型</p>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>考虑环境</h3>
            <p>Linux环境下优先考虑Nginx/Apache，Windows选择IIS</p>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>性能要求</h3>
            <p>高并发场景选择Nginx，传统应用可选Apache</p>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>功能需求</h3>
            <p>需要特定模块支持时应检查服务器兼容性</p>
          </div>
        </div>
        <div class="guide-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>安全考量</h3>
            <p>评估安全功能和社区支持力度</p>
          </div>
        </div>
      </div>

      <div class="recommendation-box">
        <div class="rec-icon">👍</div>
        <div class="rec-content">
          <p>对于大多数现代应用，<strong>Nginx</strong>是首选解决方案，特别适合高并发场景。</p>
          <p>传统LAMP栈应用仍可使用<strong>Apache</strong>。</p>
          <p>Windows服务器环境可选择<strong>IIS</strong>。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
import { ref } from 'vue'

// 示例数据 - 实际应用中可替换为API获取的数据
const serverStats = ref({
  apacheUsage: 23.5,
  nginxUsage: 35.1,
  iisUsage: 15.3,
  others: 26.1,
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@highlight-bg: rgba(74, 108, 247, 0.05);

// 基础样式
.web-server-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(@primary-color, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-title {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: @text-light;
    margin-bottom: 2rem;
    font-weight: 400;
    position: relative;
    z-index: 1;
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  .stat-card {
    background: white;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 140px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.section {
  margin-bottom: 3rem;
  background: @light-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: @card-shadow;

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @primary-color;
    color: darken(@primary-color, 10%);
  }
}

.concept-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  .concept-icon {
    font-size: 3rem;
    flex-shrink: 0;
    color: @primary-color;
  }

  .concept-content {
    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
  }
}

.highlight-box {
  background: @highlight-bg;
  border-left: 4px solid @primary-color;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;

  .highlight-icon {
    font-size: 1.8rem;
    color: @accent-color;
  }

  .highlight-content {
    font-size: 1.05rem;
    font-weight: 500;
  }
}

.components-grid,
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  .component-card,
  .feature-card {
    background: white;
    padding: 1.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s ease;
    border-top: 3px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .component-icon,
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: @text-color;
    }

    p {
      margin: 0;
      color: @text-light;
      font-size: 0.98rem;
    }
  }
}

.workflow-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;

  .workflow-step {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    min-width: 160px;
    flex: 1;
    position: relative;
    border: 1px solid @border-color;

    .step-number {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 28px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .step-content {
      h3 {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .workflow-arrow {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: @primary-color;
    margin: 0 -0.5rem;
  }
}

.protocol-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  .protocol-client,
  .protocol-server,
  .protocol-database {
    display: flex;
    flex-direction: column;
    align-items: center;

    .device-icon {
      font-size: 3rem;
      margin-bottom: 0.75rem;
    }

    .device-label {
      font-weight: 500;
      text-align: center;
    }
  }

  .protocol-arrow {
    color: @primary-color;
    font-weight: 700;
    font-size: 1.1rem;
  }
}

.comparison-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .table-header {
    display: flex;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    font-weight: 600;

    .table-cell {
      padding: 1.25rem 1rem;
      flex: 1;
      text-align: center;

      &.feature {
        flex: 1.5;
        text-align: left;
      }
    }
  }

  .table-row {
    display: flex;
    border-bottom: 1px solid @border-color;

    &:nth-child(even) {
      background: @light-bg;
    }

    &:last-child {
      border-bottom: none;
    }

    .table-cell {
      padding: 1rem;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &.feature {
        flex: 1.5;
        font-weight: 500;
        justify-content: flex-start;
        padding-left: 1.5rem;
      }
    }
  }
}

.use-case-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .use-case {
    display: flex;
    gap: 1.25rem;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border-left: 4px solid @primary-color;

    .use-case-icon {
      font-size: 2rem;
      color: @primary-color;
      flex-shrink: 0;
    }

    .use-case-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.98rem;
      }
    }
  }
}

.selection-guide {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;

  .guide-step {
    display: flex;
    gap: 1rem;
    flex: 1;
    min-width: 300px;

    .step-number {
      width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 0.25rem;
    }

    .step-content {
      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.98rem;
      }
    }
  }
}

.recommendation-box {
  background: linear-gradient(135deg, rgba(@accent-color, 0.08), transparent);
  border-left: 4px solid @accent-color;
  border-radius: 0 12px 12px 0;
  padding: 1.5rem;
  display: flex;
  gap: 1.25rem;

  .rec-icon {
    font-size: 2.5rem;
    color: @accent-color;
    flex-shrink: 0;
  }

  .rec-content {
    p {
      margin: 0.5rem 0;
      font-size: 1.05rem;

      strong {
        color: @accent-color;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .web-server-container {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.25rem !important;
  }

  .hero-subtitle {
    font-size: 1.1rem !important;
  }

  .hero-stats {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 120px;
    }
  }

  .section {
    padding: 1.5rem;
  }

  .concept-card {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .concept-icon {
      margin-bottom: 1rem;
    }
  }

  .workflow-container {
    flex-direction: column;
    align-items: center;

    .workflow-arrow {
      transform: rotate(90deg);
      margin: -0.5rem 0;
    }
  }

  .protocol-diagram {
    flex-direction: column;
    gap: 1rem;

    .protocol-arrow {
      transform: rotate(90deg);
      margin: -0.5rem 0;
    }
  }

  .comparison-table {
    .table-header,
    .table-row {
      flex-direction: column;
    }

    .table-cell {
      text-align: center !important;
      padding: 0.75rem !important;
      justify-content: center !important;

      &.feature {
        background: rgba(@primary-color, 0.05);
        font-weight: 600;
      }
    }
  }
}
</style>
