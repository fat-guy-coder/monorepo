<template>
  <div class="aot-jit-comparison">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1 class="title">AOT vs JIT 编译技术详解</h1>
      <p class="subtitle">Vue3框架中的编译策略对比分析</p>
    </header>

    <!-- 技术概览 -->
    <section class="overview-section">
      <div class="section-header">
        <h2 class="section-title">技术概览</h2>
        <p class="section-description">了解两种编译技术的基本概念与工作原理</p>
      </div>

      <div class="cards-container">
        <div class="tech-card aot-card">
          <div class="card-header">
            <div class="card-icon">🏗️</div>
            <h3 class="card-title">AOT (Ahead-of-Time)</h3>
            <div class="card-badge">编译时优化</div>
          </div>
          <div class="card-content">
            <p class="card-description">
              AOT（预编译）是在代码执行之前进行的编译过程，将源代码转换为机器代码或中间代码。
            </p>
            <ul class="feature-list">
              <li class="feature-item">
                <span class="feature-icon">⚡</span>
                <span class="feature-text">在构建阶段完成编译</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">📦</span>
                <span class="feature-text">生成静态可执行文件</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">🔍</span>
                <span class="feature-text">编译时可进行深度优化</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="tech-card jit-card">
          <div class="card-header">
            <div class="card-icon">⚙️</div>
            <h3 class="card-title">JIT (Just-in-Time)</h3>
            <div class="card-badge">运行时优化</div>
          </div>
          <div class="card-content">
            <p class="card-description">
              JIT（即时编译）是在程序运行时进行的编译过程，将字节码或中间代码转换为机器代码。
            </p>
            <ul class="feature-list">
              <li class="feature-item">
                <span class="feature-icon">🔄</span>
                <span class="feature-text">在程序运行时编译</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">🎯</span>
                <span class="feature-text">基于运行时信息优化</span>
              </li>
              <li class="feature-item">
                <span class="feature-icon">📊</span>
                <span class="feature-text">自适应性能优化</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 对比表格 -->
    <section class="comparison-section">
      <div class="section-header">
        <h2 class="section-title">全面对比</h2>
        <p class="section-description">AOT与JIT在各个维度的详细比较</p>
      </div>

      <div class="comparison-table">
        <div class="table-header">
          <div class="header-cell category">对比维度</div>
          <div class="header-cell aot-col">AOT (预编译)</div>
          <div class="header-cell jit-col">JIT (即时编译)</div>
        </div>

        <div class="table-row" v-for="item in comparisonData" :key="item.dimension">
          <div class="row-cell category">{{ item.dimension }}</div>
          <div class="row-cell aot-col">
            <div class="cell-content" :class="{ highlight: item.aotScore > item.jitScore }">
              <span class="cell-text">{{ item.aot }}</span>
              <div class="score-indicator" v-if="item.aotScore !== undefined">
                <div class="score-bar" :style="{ width: `${item.aotScore * 20}%` }"></div>
              </div>
            </div>
          </div>
          <div class="row-cell jit-col">
            <div class="cell-content" :class="{ highlight: item.jitScore > item.aotScore }">
              <span class="cell-text">{{ item.jit }}</span>
              <div class="score-indicator" v-if="item.jitScore !== undefined">
                <div class="score-bar" :style="{ width: `${item.jitScore * 20}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优缺点分析 -->
    <section class="pros-cons-section">
      <div class="section-header">
        <h2 class="section-title">优缺点分析</h2>
        <p class="section-description">两种编译策略的优劣对比</p>
      </div>

      <div class="analysis-grid">
        <div class="analysis-card advantage">
          <h3 class="analysis-title">AOT 优势</h3>
          <ul class="analysis-list">
            <li>更快的启动时间（无编译开销）</li>
            <li>更好的内存使用效率</li>
            <li>编译时可进行深度优化</li>
            <li>更安全的代码（提前发现错误）</li>
            <li>适合资源受限环境</li>
          </ul>
        </div>

        <div class="analysis-card disadvantage">
          <h3 class="analysis-title">AOT 劣势</h3>
          <ul class="analysis-list">
            <li>编译产物体积较大</li>
            <li>无法基于运行时信息优化</li>
            <li>热重载能力有限</li>
            <li>构建时间较长</li>
            <li>缺乏运行时适应性</li>
          </ul>
        </div>

        <div class="analysis-card advantage">
          <h3 class="analysis-title">JIT 优势</h3>
          <ul class="analysis-list">
            <li>自适应性能优化</li>
            <li>更好的峰值性能</li>
            <li>支持动态代码执行</li>
            <li>热重载/热更新能力强</li>
            <li>开发体验更佳</li>
          </ul>
        </div>

        <div class="analysis-card disadvantage">
          <h3 class="analysis-title">JIT 劣势</h3>
          <ul class="analysis-list">
            <li>启动时间较慢（编译开销）</li>
            <li>内存占用较高</li>
            <li>安全风险（动态代码执行）</li>
            <li>优化不稳定（取决于使用模式）</li>
            <li>不适合资源受限环境</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="use-cases-section">
      <div class="section-header">
        <h2 class="section-title">使用场景</h2>
        <p class="section-description">根据不同需求选择合适的编译策略</p>
      </div>

      <div class="use-case-container">
        <div class="use-case-card">
          <div class="use-case-icon">📱</div>
          <h3 class="use-case-title">适合AOT的场景</h3>
          <ul class="use-case-list">
            <li>移动端应用（启动速度敏感）</li>
            <li>IoT/嵌入式设备（资源受限）</li>
            <li>对安全要求高的应用</li>
            <li>需要稳定性能的应用</li>
            <li>CDN分发的前端应用</li>
          </ul>
        </div>

        <div class="use-case-card">
          <div class="use-case-icon">💻</div>
          <h3 class="use-case-title">适合JIT的场景</h3>
          <ul class="use-case-list">
            <li>开发环境（需要热重载）</li>
            <li>复杂计算密集型应用</li>
            <li>动态功能加载的应用</li>
            <li>需要运行时优化的应用</li>
            <li>桌面/服务器端应用</li>
          </ul>
        </div>

        <div class="use-case-card">
          <div class="use-case-icon">🔄</div>
          <h3 class="use-case-title">混合策略</h3>
          <ul class="use-case-list">
            <li>Vue3: AOT生产 + JIT开发</li>
            <li>Angular: AOT为主 + JIT备用</li>
            <li>React: 默认JIT + 预编译优化</li>
            <li>现代框架：构建时AOT + 运行时JIT</li>
            <li>渐进式Web应用</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Vue3中的实现 -->
    <section class="vue3-implementation">
      <div class="section-header">
        <h2 class="section-title">Vue3中的编译策略</h2>
        <p class="section-description">Vue3如何巧妙结合AOT与JIT的优势</p>
      </div>

      <div class="vue3-details">
        <div class="implementation-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>模板编译阶段</h3>
            <p>
              Vue3在构建时通过<code>@vue/compiler-sfc</code>将SFC转换为优化的渲染函数，这是AOT的核心。
            </p>
            <div class="code-snippet">
              <pre><code>// Vue SFC → 编译为渲染函数
export function render(_ctx, _cache) {
  return _openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "Hello, Vue3!")
  ])
}</code></pre>
            </div>
          </div>
        </div>

        <div class="implementation-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>运行时优化</h3>
            <p>Vue3的响应式系统和虚拟DOM diff算法在运行时持续优化，具有JIT的特性。</p>
            <div class="code-snippet">
              <pre><code>// 响应式系统跟踪依赖
const state = reactive({ count: 0 })
watchEffect(() => {
  console.log(`Count: ${state.count}`)
})</code></pre>
            </div>
          </div>
        </div>

        <div class="implementation-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>开发与生产模式</h3>
            <p>开发模式下保留更多运行时信息支持热重载，生产模式则进行最大程度的AOT优化。</p>
            <div class="code-snippet">
              <pre><code>// 构建配置
export default defineConfig({
  build: {
    // 生产模式开启AOT优化
    target: 'es2015',
    minify: 'terser',
    
    // 开发模式保留JIT能力
    sourcemap: process.env.NODE_ENV === 'development'
  }
})</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="conclusion">
        <h3>总结</h3>
        <p>
          Vue3采用了<strong>构建时AOT优化 + 运行时轻量JIT</strong>的混合策略：
          在构建阶段将模板编译为高效的渲染函数（AOT优势），
          同时在运行时保持灵活性支持响应式更新（JIT优势）。
          这种设计既保证了生产环境的性能，又提供了优秀的开发体验。
        </p>
      </div>
    </section>

    <!-- 底部信息 -->
    <footer class="page-footer">
      <div class="footer-content">
        <p class="footer-text">AOT vs JIT 编译技术对比分析</p>
        <p class="footer-subtext">Vue3 TypeScript + Less 实现</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AotJitComparison',

  setup() {
    // 对比数据
    const comparisonData = [
      { dimension: '编译时机', aot: '构建时', jit: '运行时', aotScore: 5, jitScore: 5 },
      { dimension: '启动性能', aot: '优秀', jit: '一般', aotScore: 5, jitScore: 3 },
      { dimension: '峰值性能', aot: '良好', jit: '优秀', aotScore: 4, jitScore: 5 },
      { dimension: '内存使用', aot: '较低', jit: '较高', aotScore: 5, jitScore: 3 },
      { dimension: '代码体积', aot: '较大', jit: '较小', aotScore: 3, jitScore: 4 },
      { dimension: '优化潜力', aot: '静态优化', jit: '动态优化', aotScore: 4, jitScore: 5 },
      { dimension: '热重载', aot: '有限', jit: '优秀', aotScore: 2, jitScore: 5 },
      { dimension: '安全性', aot: '较高', jit: '较低', aotScore: 5, jitScore: 3 },
      { dimension: '调试支持', aot: '一般', jit: '优秀', aotScore: 3, jitScore: 5 },
      { dimension: '适用性', aot: '生产环境', jit: '开发环境', aotScore: 5, jitScore: 5 },
    ]

    return {
      comparisonData,
    }
  },
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@light-color: #f8f9fa;
@dark-color: #212529;
@gray-light: #e9ecef;
@gray-medium: #adb5bd;
@gray-dark: #495057;
@success-color: #4cc9f0;
@warning-color: #f72585;
@border-radius: 12px;
@shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

// 基础样式
.aot-jit-comparison {
  font-family:
    'Segoe UI',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  line-height: 1.6;
  color: @dark-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

// 页面标题
.page-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0 20px;

  .title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @gray-dark;
    max-width: 700px;
    margin: 0 auto;
  }
}

// 章节标题
.section-header {
  margin-bottom: 40px;
  text-align: center;

  .section-title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: @dark-color;
  }

  .section-description {
    font-size: 1.1rem;
    color: @gray-dark;
    max-width: 800px;
    margin: 0 auto;
  }
}

// 技术概览卡片
.cards-container {
  display: flex;
  gap: 30px;
  margin-bottom: 80px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.tech-card {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  box-shadow: @shadow;
  transition: @transition;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  &.aot-card {
    border-top: 4px solid @primary-color;
  }

  &.jit-card {
    border-top: 4px solid @accent-color;
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .card-icon {
    font-size: 2.5rem;
    margin-right: 15px;
  }

  .card-title {
    font-size: 1.8rem;
    font-weight: 600;
    flex: 1;
  }

  .card-badge {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.card-content {
  .card-description {
    font-size: 1.1rem;
    margin-bottom: 25px;
    color: @gray-dark;
  }
}

.feature-list {
  list-style: none;
  padding: 0;

  .feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .feature-icon {
      font-size: 1.2rem;
      margin-right: 12px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @gray-light;
      border-radius: 50%;
    }

    .feature-text {
      font-size: 1rem;
    }
  }
}

// 对比表格
.comparison-section {
  margin-bottom: 80px;
}

.comparison-table {
  background: white;
  border-radius: @border-radius;
  overflow: hidden;
  box-shadow: @shadow;

  .table-header {
    display: flex;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    font-weight: 600;

    .header-cell {
      flex: 1;
      padding: 20px;
      text-align: center;
      font-size: 1.1rem;

      &.category {
        flex: 1.2;
        text-align: left;
      }

      &.aot-col {
        background: rgba(255, 255, 255, 0.1);
      }

      &.jit-col {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }

  .table-row {
    display: flex;
    border-bottom: 1px solid @gray-light;
    transition: @transition;

    &:hover {
      background-color: fade(@primary-color, 3%);
    }

    &:last-child {
      border-bottom: none;
    }

    .row-cell {
      flex: 1;
      padding: 18px 20px;

      &.category {
        flex: 1.2;
        font-weight: 600;
        background-color: fade(@gray-light, 30%);
      }
    }
  }
}

.cell-content {
  display: flex;
  flex-direction: column;

  &.highlight {
    font-weight: 600;
  }

  .cell-text {
    margin-bottom: 8px;
  }
}

.score-indicator {
  height: 6px;
  background: @gray-light;
  border-radius: 3px;
  overflow: hidden;

  .score-bar {
    height: 100%;
    background: linear-gradient(90deg, @primary-color, @accent-color);
    border-radius: 3px;
    transition: width 0.8s ease;
  }
}

// 优缺点分析
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.analysis-card {
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  box-shadow: @shadow;

  &.advantage {
    border-top: 4px solid @success-color;
  }

  &.disadvantage {
    border-top: 4px solid @warning-color;
  }

  .analysis-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  &.advantage .analysis-title::before {
    background-color: @success-color;
  }

  &.disadvantage .analysis-title::before {
    background-color: @warning-color;
  }
}

.analysis-list {
  list-style: none;
  padding: 0;

  li {
    padding: 10px 0;
    border-bottom: 1px dashed @gray-light;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '•';
      margin-right: 10px;
      font-size: 1.2rem;
    }
  }

  .advantage & li::before {
    color: @success-color;
  }

  .disadvantage & li::before {
    color: @warning-color;
  }
}

// 使用场景
.use-case-container {
  display: flex;
  gap: 30px;
  margin-bottom: 80px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.use-case-card {
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  text-align: center;
  box-shadow: @shadow;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
  }

  .use-case-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .use-case-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: @dark-color;
  }
}

.use-case-list {
  list-style: none;
  padding: 0;
  text-align: left;

  li {
    padding: 10px 0;
    border-bottom: 1px solid @gray-light;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '✓';
      display: inline-block;
      width: 20px;
      height: 20px;
      background: fade(@primary-color, 10%);
      color: @primary-color;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      margin-right: 10px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
}

// Vue3实现部分
.vue3-implementation {
  margin-bottom: 80px;
}

.vue3-details {
  max-width: 800px;
  margin: 0 auto 40px;
}

.implementation-step {
  display: flex;
  margin-bottom: 40px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .step-number {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-right: 20px;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: @dark-color;
    }

    p {
      margin-bottom: 15px;
      color: @gray-dark;
    }
  }
}

.code-snippet {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  margin-top: 15px;

  pre {
    margin: 0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  code {
    font-family: inherit;
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@accent-color, 8%));
  border-radius: @border-radius;
  padding: 30px;
  margin-top: 40px;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;

    strong {
      color: @primary-color;
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid @gray-light;
  margin-top: 40px;

  .footer-text {
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: @gray-dark;
  }

  .footer-subtext {
    color: @gray-medium;
  }
}
</style>
