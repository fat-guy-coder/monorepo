<template>
  <div class="protocol-page">
    <!-- 头部标题区域 -->
    <header class="page-header">
      <h1 class="page-title">AI 协议生态</h1>
      <p class="page-subtitle">
        了解推动 AI 与外部世界安全交互的核心协议
      </p>
      <div class="header-divider"></div>
    </header>

    <!-- 双卡片对比区域 -->
    <div class="cards-container">
      <!-- MCP 卡片 -->
      <article class="protocol-card mcp-card">
        <div class="card-accent"></div>
        <div class="card-header">
          <div class="card-icon mcp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
              <path d="M5.64 5.64l2.83 2.83m7.07 7.07l2.83 2.83M5.64 18.36l2.83-2.83m7.07-7.07l2.83-2.83" />
            </svg>
          </div>
          <div class="card-label-group">
            <span class="card-tag tag-protocol">协议</span>
            <h2 class="card-title">MCP</h2>
            <p class="card-fullname">Model Context Protocol</p>
            <p class="card-chinese">模型上下文协议</p>
          </div>
        </div>
        <div class="card-body">
          <p class="card-intro">
            MCP 是由 <strong>Anthropic</strong> 于 2024 年底推出的开放标准协议，旨在为
            AI 模型与外部工具、数据源之间建立<em>统一的连接标准</em>。
          </p>
          <ul class="feature-list">
            <li>
              <span class="feature-dot"></span>
              <span><strong>标准化接口</strong> — 让任意 AI 模型无缝对接任意工具</span>
            </li>
            <li>
              <span class="feature-dot"></span>
              <span><strong>上下文管理</strong> — 在对话中持久化并传递上下文信息</span>
            </li>
            <li>
              <span class="feature-dot"></span>
              <span><strong>工具发现</strong> — 自动发现并调用可用的外部能力</span>
            </li>
            <li>
              <span class="feature-dot"></span>
              <span><strong>双向通信</strong> — 支持模型主动请求与工具响应</span>
            </li>
          </ul>
          <div class="highlight-box mcp-highlight">
            <span class="highlight-label">核心理念</span>
            <span class="highlight-text">连接即能力 · 开放即智能</span>
          </div>
        </div>
      </article>

      <!-- SCP 卡片 -->
      <article class="protocol-card scp-card">
        <div class="card-accent"></div>
        <div class="card-header">
          <div class="card-icon scp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>
          <div class="card-label-group">
            <span class="card-tag tag-safety">安全</span>
            <h2 class="card-title">SCP</h2>
            <p class="card-fullname">Safety Control Protocol</p>
            <p class="card-chinese">安全控制协议</p>
          </div>
        </div>
        <div class="card-body">
          <p class="card-intro">
            SCP 是 AI 系统中用于<em>安全策略管理与访问控制</em>的协议层，确保 AI
            在与外部交互时始终运行在<strong>安全边界</strong>之内。
          </p>
          <ul class="feature-list">
            <li>
              <span class="feature-dot scp-dot"></span>
              <span><strong>权限管控</strong> — 细粒度控制 AI 可访问的资源范围</span>
            </li>
            <li>
              <span class="feature-dot scp-dot"></span>
              <span><strong>行为审计</strong> — 记录并追溯每一次外部调用</span>
            </li>
            <li>
              <span class="feature-dot scp-dot"></span>
              <span><strong>合规检查</strong> — 确保操作符合法规与组织策略</span>
            </li>
            <li>
              <span class="feature-dot scp-dot"></span>
              <span><strong>风险拦截</strong> — 实时检测并阻断高危行为</span>
            </li>
          </ul>
          <div class="highlight-box scp-highlight">
            <span class="highlight-label">核心理念</span>
            <span class="highlight-text">安全即底线 · 可控方可信</span>
          </div>
        </div>
      </article>
    </div>

    <!-- 对比总结区域 -->
    <section class="comparison-section">
      <h3 class="comparison-title">MCP 与 SCP 的协作关系</h3>
      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="comparison-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <p class="comparison-label">MCP 负责</p>
          <p class="comparison-desc">打通连接通道，让 AI 能够<strong>调用</strong>外部能力</p>
        </div>
        <div class="comparison-divider-col">
          <div class="comparison-plus">+</div>
        </div>
        <div class="comparison-item">
          <div class="comparison-icon-wrap scp-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p class="comparison-label">SCP 负责</p>
          <p class="comparison-desc">守住安全底线，让 AI 在<strong>可控范围</strong>内运行</p>
        </div>
        <div class="comparison-divider-col">
          <div class="comparison-equals">=</div>
        </div>
        <div class="comparison-item">
          <div class="comparison-icon-wrap result-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <p class="comparison-label">共同实现</p>
          <p class="comparison-desc"><strong>安全且强大</strong>的 AI 智能体系统</p>
        </div>
      </div>
    </section>

    <!-- 底部引用 -->
    <footer class="page-footer">
      <p>开放协议推动 AI 生态健康发展 · 连接与安全并重</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// 组件：ProtocolIntro
// 用途：介绍 MCP (Model Context Protocol) 与 SCP (Safety Control Protocol)
// 技术栈：Vue 3 + TypeScript + setup 语法糖 + Less
// ============================================================

interface ProtocolFeature {
  id: number
  title: string
  description: string
}

// MCP 特性列表（静态展示，无需响应式追踪）
const mcpFeatures: ProtocolFeature[] = [
  { id: 1, title: '标准化接口', description: '让任意 AI 模型无缝对接任意工具' },
  { id: 2, title: '上下文管理', description: '在对话中持久化并传递上下文信息' },
  { id: 3, title: '工具发现', description: '自动发现并调用可用的外部能力' },
  { id: 4, title: '双向通信', description: '支持模型主动请求与工具响应' },
]

// SCP 特性列表
const scpFeatures: ProtocolFeature[] = [
  { id: 1, title: '权限管控', description: '细粒度控制 AI 可访问的资源范围' },
  { id: 2, title: '行为审计', description: '记录并追溯每一次外部调用' },
  { id: 3, title: '合规检查', description: '确保操作符合法规与组织策略' },
  { id: 4, title: '风险拦截', description: '实时检测并阻断高危行为' },
]

// 可在控制台输出以便调试
console.log('[ProtocolIntro] MCP Features:', mcpFeatures)
console.log('[ProtocolIntro] SCP Features:', scpFeatures)
</script>

<style lang="less" scoped>
// ============================================================
// Less 样式变量
// ============================================================
@color-mcp-primary: #4a7cf7;
@color-mcp-light: #eef3ff;
@color-mcp-glow: rgba(74, 124, 247, 0.12);

@color-scp-primary: #10b981;
@color-scp-light: #ecfdf5;
@color-scp-glow: rgba(16, 185, 129, 0.12);

@color-bg: #f9fafb;
@color-card-bg: #ffffff;
@color-text-primary: #1a1a2e;
@color-text-secondary: #5a5f72;
@color-text-muted: #8b8fa3;
@color-border: #e8ecf1;
@color-shadow: rgba(0, 0, 0, 0.06);

@radius-card: 16px;
@radius-inner: 10px;
@transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

// ============================================================
// 页面容器
// ============================================================
.protocol-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 28px 36px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue',
    sans-serif;
  background-color: @color-bg;
  min-height: 100vh;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ============================================================
// 头部区域
// ============================================================
.page-header {
  text-align: center;
  margin-bottom: 44px;
}

.page-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: @color-text-primary;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.05rem;
  color: @color-text-secondary;
  margin: 0 0 20px;
  font-weight: 400;
  line-height: 1.5;
}

.header-divider {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, @color-mcp-primary, @color-scp-primary);
  border-radius: 2px;
  margin: 0 auto;
}

// ============================================================
// 卡片容器 - 双列布局
// ============================================================
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

// ============================================================
// 协议卡片通用样式
// ============================================================
.protocol-card {
  background: @color-card-bg;
  border-radius: @radius-card;
  padding: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px @color-shadow, 0 0 0 1px @color-border;
  transition: box-shadow @transition-smooth, transform @transition-smooth;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px @color-border;
    transform: translateY(-2px);
  }
}

// 卡片顶部装饰色条
.card-accent {
  height: 4px;
  width: 100%;
  border-radius: @radius-card @radius-card 0 0;
}

.mcp-card .card-accent {
  background: @color-mcp-primary;
}

.scp-card .card-accent {
  background: @color-scp-primary;
}

// ============================================================
// 卡片头部
// ============================================================
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 28px 28px 0;
}

.card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  svg {
    width: 24px;
    height: 24px;
  }
}

.mcp-icon {
  background: @color-mcp-primary;
  box-shadow: 0 4px 14px @color-mcp-glow;
}

.scp-icon {
  background: @color-scp-primary;
  box-shadow: 0 4px 14px @color-scp-glow;
}

.card-label-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 10px;
  border-radius: 20px;
  width: fit-content;
  margin-bottom: 4px;
}

.tag-protocol {
  background: @color-mcp-light;
  color: @color-mcp-primary;
}

.tag-safety {
  background: @color-scp-light;
  color: @color-scp-primary;
}

.card-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: @color-text-primary;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.card-fullname {
  font-size: 0.95rem;
  color: @color-text-secondary;
  margin: 2px 0 0;
  font-weight: 500;
}

.card-chinese {
  font-size: 0.82rem;
  color: @color-text-muted;
  margin: 0;
  font-weight: 400;
}

// ============================================================
// 卡片正文
// ============================================================
.card-body {
  padding: 20px 28px 28px;
}

.card-intro {
  font-size: 0.95rem;
  color: @color-text-secondary;
  line-height: 1.7;
  margin: 0 0 20px;

  strong {
    color: @color-text-primary;
    font-weight: 600;
  }

  em {
    font-style: normal;
    font-weight: 600;
    color: @color-text-primary;
    background: linear-gradient(180deg,
        transparent 60%,
        rgba(74, 124, 247, 0.13) 60%);
    padding: 0 2px;
  }

  .scp-card & em {
    background: linear-gradient(180deg,
        transparent 60%,
        rgba(16, 185, 129, 0.13) 60%);
  }
}

// ============================================================
// 特性列表
// ============================================================
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  color: @color-text-secondary;
  line-height: 1.5;

  strong {
    color: @color-text-primary;
    font-weight: 600;
  }
}

.feature-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: @color-mcp-primary;
  margin-top: 6px;
  box-shadow: 0 0 0 3px @color-mcp-glow;
}

.scp-dot {
  background: @color-scp-primary;
  box-shadow: 0 0 0 3px @color-scp-glow;
}

// ============================================================
// 高亮理念框
// ============================================================
.highlight-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: @radius-inner;
  font-size: 0.88rem;
}

.mcp-highlight {
  background: @color-mcp-light;
  border-left: 3px solid @color-mcp-primary;
}

.scp-highlight {
  background: @color-scp-light;
  border-left: 3px solid @color-scp-primary;
}

.highlight-label {
  font-weight: 600;
  color: @color-text-primary;
  font-size: 0.78rem;
  white-space: nowrap;
  opacity: 0.7;
}

.highlight-text {
  font-weight: 600;
  color: @color-text-primary;
  letter-spacing: 0.01em;
}

// ============================================================
// 对比总结区域
// ============================================================
.comparison-section {
  background: @color-card-bg;
  border-radius: @radius-card;
  padding: 32px 28px;
  box-shadow: 0 2px 12px @color-shadow, 0 0 0 1px @color-border;
  margin-bottom: 28px;
}

.comparison-title {
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  color: @color-text-primary;
  margin: 0 0 28px;
}

.comparison-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 14px;
  }
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 140px;
  max-width: 200px;
}

.comparison-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: @color-mcp-light;
  color: @color-mcp-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
}

.scp-icon-wrap {
  background: @color-scp-light;
  color: @color-scp-primary;
}

.result-icon {
  background: #f0fdf6;
  color: #059669;
}

.comparison-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: @color-text-primary;
  margin: 0 0 4px;
}

.comparison-desc {
  font-size: 0.82rem;
  color: @color-text-muted;
  margin: 0;
  line-height: 1.5;

  strong {
    color: @color-text-primary;
    font-weight: 600;
  }
}

.comparison-divider-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.comparison-plus,
.comparison-equals {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: @color-bg;
  color: @color-text-muted;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
}

// ============================================================
// 底部
// ============================================================
.page-footer {
  text-align: center;
  color: @color-text-muted;
  font-size: 0.82rem;
  padding-top: 8px;
}
</style>
