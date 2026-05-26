<template>
  <div class="gdscript-page">
    <!-- 顶部导航 -->
    <header class="nav-bar">
      <div class="nav-inner">
        <div class="logo-area">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">IndieDev</span>
        </div>
        <nav class="nav-links">
          <a href="#overview">概述</a>
          <a href="#features">特性</a>
          <a href="#syntax">语法</a>
          <a href="#why">为什么选择</a>
        </nav>
      </div>
    </header>

    <!-- 主视觉区 -->
    <section id="overview" class="hero">
      <div class="hero-content">
        <div class="hero-badge">Godot Engine 专属语言</div>
        <h1 class="hero-title">
          <span class="gradient-text">GDScript</span>
        </h1>
        <p class="hero-desc">
          一门专为游戏开发而生的脚本语言，深度集成于 Godot 引擎。
          语法简洁如 Python，性能针对游戏场景优化，让你的独立游戏创作更加得心应手。
        </p>
        <div class="hero-actions">
          <button class="btn-primary">开始学习</button>
          <button class="btn-outline">查看文档 →</button>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">3.6K+</span>
            <span class="stat-label">GitHub Stars</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">10年+</span>
            <span class="stat-label">持续迭代</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">100%</span>
            <span class="stat-label">引擎集成</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-preview">
          <div class="code-dots">
            <span class="dot red" />
            <span class="dot yellow" />
            <span class="dot green" />
          </div>
          <pre class="code-block"><code><span class="keyword">extends</span> <span class="class-name">CharacterBody2D</span>

<span class="keyword">var</span> <span class="var-name">speed</span> = <span class="number">400</span>
<span class="keyword">var</span> <span class="var-name">direction</span> = <span class="builtin">Vector2</span>.<span class="builtin">ZERO</span>

<span class="keyword">func</span> <span class="func-name">_physics_process</span>(<span class="param">delta</span>):
    <span class="var-name">direction</span> = <span class="builtin">Input</span>.<span class="method">get_vector</span>(
        <span class="string">"left"</span>, <span class="string">"right"</span>,
        <span class="string">"up"</span>, <span class="string">"down"</span>
    )
    <span class="var-name">velocity</span> = <span class="var-name">direction</span> * <span class="var-name">speed</span>
    <span class="method">move_and_slide</span>()</code></pre>
        </div>
      </div>
    </section>

    <!-- 特性卡片区 -->
    <section id="features" class="features">
      <div class="section-header">
        <span class="section-tag">核心优势</span>
        <h2>为什么 GDScript 适合独立游戏开发</h2>
        <p>从原型到成品，GDScript 在每一个环节都为你提效</p>
      </div>
      <div class="feature-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 语法亮点区 -->
    <section id="syntax" class="syntax-highlights">
      <div class="section-header">
        <span class="section-tag">语法速览</span>
        <h2>像写 Python 一样写游戏逻辑</h2>
        <p>无需分号、无需花括号，缩进即是一切</p>
      </div>
      <div class="syntax-cards">
        <div class="syntax-card">
          <div class="syntax-card-header">信号系统</div>
          <pre
            class="mini-code"><code><span class="keyword">signal</span> <span class="signal-name">health_changed</span>(<span class="param">new_hp</span>)

<span class="keyword">func</span> <span class="func-name">take_damage</span>(<span class="param">amount</span>):
    <span class="var-name">hp</span> -= <span class="param">amount</span>
    <span class="var-name">health_changed</span>.<span class="method">emit</span>(<span class="var-name">hp</span>)</code></pre>
        </div>
        <div class="syntax-card">
          <div class="syntax-card-header">节点引用</div>
          <pre class="mini-code"><code><span class="annotation">@onready</span> <span class="keyword">var</span> <span class="var-name">anim</span> = <span class="method">$AnimationPlayer</span>
<span class="annotation">@export</span> <span class="keyword">var</span> <span class="var-name">jump_force</span> = <span class="number">-600.0</span>

<span class="var-name">anim</span>.<span class="method">play</span>(<span class="string">"jump"</span>)</code></pre>
        </div>
        <div class="syntax-card">
          <div class="syntax-card-header">类型提示</div>
          <pre
            class="mini-code"><code><span class="keyword">var</span> <span class="var-name">player_name</span>: <span class="builtin">String</span> = <span class="string">"Hero"</span>
<span class="keyword">var</span> <span class="var-name">inventory</span>: <span class="builtin">Array</span>[<span class="class-name">Item</span>] = []

<span class="keyword">func</span> <span class="func-name">get_damage</span>() -> <span class="builtin">float</span>:
    <span class="keyword">return</span> <span class="var-name">base_dmg</span> * <span class="number">1.5</span></code></pre>
        </div>
      </div>
    </section>

    <!-- 适合独立开发的理由 -->
    <section id="why" class="why-section">
      <div class="section-header">
        <span class="section-tag">独立开发首选</span>
        <h2>一个人也能高效完成游戏开发</h2>
        <p>GDScript 为独立开发者量身打造的工作流</p>
      </div>
      <div class="why-list">
        <div v-for="(item, index) in whyItems" :key="index" class="why-item">
          <div class="why-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="why-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <p>开始你的独立游戏之旅 · Godot + GDScript 让创作回归纯粹</p>
      <span class="footer-heart">♥</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface WhyItem {
  title: string
  desc: string
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: '零编译时间',
    description: '修改代码后即刻在编辑器中看到效果，无需等待编译链接。极速迭代是独立开发的最大利器。'
  },
  {
    icon: '🧩',
    title: '深度引擎集成',
    description: '与 Godot 的场景树、信号系统、动画节点完美融合，所有 API 都触手可及，无需胶水代码。'
  },
  {
    icon: '📖',
    title: '语法平易近人',
    description: '基于缩进的语法设计，与 Python 高度相似。即使没有编程经验也能在几小时内上手。'
  },
  {
    icon: '🎯',
    title: '专为游戏优化',
    description: '内置 Vector2、Color、Transform 等游戏专用类型，物理帧回调、输入处理都开箱即用。'
  },
  {
    icon: '🔧',
    title: '编辑器内实时调试',
    description: '在 Godot 编辑器中直接设置断点、查看变量，运行时修改属性值，调试体验流畅。'
  },
  {
    icon: '🌍',
    title: '跨平台一键导出',
    description: '配合 Godot 引擎，一份代码即可导出到 Windows、macOS、Linux、Android、iOS 及 Web。'
  }
]

const whyItems: WhyItem[] = [
  {
    title: '极致快速的原型开发',
    desc: 'GDScript 的动态类型和简洁语法让你在几天内就能做出可玩原型，快速验证游戏创意。'
  },
  {
    title: '全功能编辑器内置',
    desc: '代码编辑、场景搭建、动画制作、材质编辑都在同一个 Godot 编辑器中完成，无需切换工具。'
  },
  {
    title: '活跃友好的社区',
    desc: 'Godot 社区对独立开发者极其友好，大量开源项目、教程和插件可供参考和使用。'
  },
  {
    title: '完全免费无抽成',
    desc: 'MIT 开源协议，没有授权费，没有收入抽成。你赚的每一分钱都归你自己所有。'
  }
]
</script>

<style lang="less" scoped>
// ========== 变量定义 ==========
@bg-primary: #0d1117;
@bg-secondary: #161b22;
@bg-card: #1c2129;
@bg-code: #0d1117;
@text-primary: #e6edf3;
@text-secondary: #8b949e;
@text-muted: #6e7681;
@accent: #58a6ff;
@accent-green: #3fb950;
@accent-orange: #d2991d;
@accent-purple: #a371f7;
@accent-red: #f85149;
@border-color: #30363d;
@radius-sm: 6px;
@radius-md: 12px;
@radius-lg: 20px;
@radius-xl: 28px;
@font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
@font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// ========== 全局重置 ==========
.gdscript-page {
  background: @bg-primary;
  color: @text-primary;
  font-family: @font-sans;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ========== 导航栏 ==========
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid @border-color;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 22px;
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: @text-primary;
}

.nav-links {
  display: flex;
  gap: 28px;

  a {
    color: @text-secondary;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: @text-primary;
    }
  }
}

// ========== 主视觉区 ==========
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 32px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(88, 166, 255, 0.1);
  color: @accent;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  width: fit-content;
  letter-spacing: 0.3px;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin: 0;
}

.gradient-text {
  background: linear-gradient(135deg, @accent 0%, @accent-purple 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 17px;
  color: @text-secondary;
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 4px;
}

.btn-primary {
  background: @accent;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: @radius-md;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: lighten(@accent, 8%);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-outline {
  background: transparent;
  color: @text-primary;
  border: 1px solid @border-color;
  padding: 12px 24px;
  border-radius: @radius-md;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: @text-secondary;
    background: rgba(255, 255, 255, 0.03);
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid @border-color;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-size: 22px;
  font-weight: 700;
  color: @text-primary;
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: 12px;
  color: @text-muted;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: @border-color;
}

// 代码预览窗口
.hero-visual {
  display: flex;
  justify-content: center;
}

.code-preview {
  background: @bg-code;
  border: 1px solid @border-color;
  border-radius: @radius-lg;
  overflow: hidden;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.code-dots {
  display: flex;
  gap: 8px;
  padding: 14px 18px;
  background: @bg-secondary;
  border-bottom: 1px solid @border-color;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;

  &.red {
    background: #ff5f56;
  }

  &.yellow {
    background: #ffbd2e;
  }

  &.green {
    background: #27c93f;
  }
}

.code-block {
  padding: 20px 22px;
  margin: 0;
  font-family: @font-mono;
  font-size: 13.5px;
  line-height: 1.75;
  color: @text-primary;
  overflow-x: auto;

  code {
    .keyword {
      color: #ff7b72;
    }

    .class-name {
      color: #ffa657;
    }

    .var-name {
      color: #79c0ff;
    }

    .func-name {
      color: #d2a8ff;
    }

    .param {
      color: #ffa657;
    }

    .number {
      color: #79c0ff;
    }

    .string {
      color: #a5d6ff;
    }

    .builtin {
      color: #ffa657;
    }

    .method {
      color: #d2a8ff;
    }

    .annotation {
      color: #8b949e;
      font-style: italic;
    }

    .signal-name {
      color: #7ee787;
    }
  }
}

// ========== 通用 section header ==========
.section-header {
  text-align: center;
  margin-bottom: 52px;

  .section-tag {
    display: inline-block;
    background: rgba(163, 113, 247, 0.1);
    color: @accent-purple;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 14px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    margin-bottom: 14px;
    text-transform: uppercase;
  }

  h2 {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.8px;
    margin: 0 0 10px;
    color: @text-primary;
  }

  p {
    font-size: 16px;
    color: @text-secondary;
    margin: 0;
  }
}

// ========== 特性卡片 ==========
.features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px 80px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  background: @bg-card;
  border: 1px solid @border-color;
  border-radius: @radius-md;
  padding: 28px 24px;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;

  &:hover {
    border-color: @text-muted;
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .feature-icon {
    font-size: 32px;
    margin-bottom: 14px;
  }

  h3 {
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 8px;
    color: @text-primary;
    letter-spacing: -0.2px;
  }

  p {
    font-size: 14px;
    color: @text-secondary;
    margin: 0;
    line-height: 1.65;
  }
}

// ========== 语法亮点 ==========
.syntax-highlights {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px 80px;
  border-top: 1px solid @border-color;
}

.syntax-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.syntax-card {
  background: @bg-card;
  border: 1px solid @border-color;
  border-radius: @radius-md;
  overflow: hidden;

  .syntax-card-header {
    padding: 14px 18px;
    font-size: 13px;
    font-weight: 600;
    color: @text-secondary;
    background: @bg-secondary;
    border-bottom: 1px solid @border-color;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .mini-code {
    padding: 16px 18px;
    margin: 0;
    font-family: @font-mono;
    font-size: 13px;
    line-height: 1.7;
    color: @text-primary;
    overflow-x: auto;

    code {
      .keyword {
        color: #ff7b72;
      }

      .func-name {
        color: #d2a8ff;
      }

      .var-name {
        color: #79c0ff;
      }

      .param {
        color: #ffa657;
      }

      .number {
        color: #79c0ff;
      }

      .string {
        color: #a5d6ff;
      }

      .builtin {
        color: #ffa657;
      }

      .method {
        color: #d2a8ff;
      }

      .annotation {
        color: #8b949e;
        font-style: italic;
      }

      .signal-name {
        color: #7ee787;
      }

      .class-name {
        color: #ffa657;
      }
    }
  }
}

// ========== 为什么选择 ==========
.why-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px 100px;
  border-top: 1px solid @border-color;
}

.why-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 700px;
  margin: 0 auto;
}

.why-item {
  display: flex;
  gap: 24px;
  padding: 22px 0;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }
}

.why-number {
  font-family: @font-mono;
  font-size: 28px;
  font-weight: 700;
  color: @text-muted;
  min-width: 48px;
  line-height: 1;
  padding-top: 2px;
}

.why-content {
  h3 {
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 4px;
    color: @text-primary;
    letter-spacing: -0.2px;
  }

  p {
    font-size: 14px;
    color: @text-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

// ========== 底部 ==========
.footer {
  text-align: center;
  padding: 40px 32px;
  border-top: 1px solid @border-color;
  color: @text-muted;
  font-size: 14px;

  p {
    margin: 0 0 6px;
  }

  .footer-heart {
    color: @accent-red;
    font-size: 16px;
  }
}

// ========== 响应式 ==========
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 24px 60px;
    gap: 36px;
  }

  .hero-title {
    font-size: 38px;
  }

  .hero-desc {
    font-size: 15px;
  }

  .feature-grid,
  .syntax-cards {
    grid-template-columns: 1fr;
  }

  .features,
  .syntax-highlights,
  .why-section {
    padding: 40px 24px 50px;
  }

  .section-header h2 {
    font-size: 26px;
  }

  .nav-links {
    display: none;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 12px;
  }

  .stat-divider {
    display: none;
  }
}
</style>
