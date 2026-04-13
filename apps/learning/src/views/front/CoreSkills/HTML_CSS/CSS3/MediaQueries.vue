<template>
  <div class="media-query-guide">
    <h1 class="main-title">📱 CSS 媒体查询基本指南</h1>

    <!-- 介绍部分 -->
    <section class="intro-section">
      <h2 class="section-title">📖 什么是媒体查询?</h2>
      <div class="intro-content">
        <p class="intro-text">
          媒体查询(Media Queries)是CSS3中引入的一个强大特性,它允许我们根据设备特性(如视口宽度、设备方向等)来应用不同的CSS样式。
          通过媒体查询,我们可以实现响应式设计,让网页在不同设备上都能呈现最佳的显示效果。
        </p>

        <div class="key-points">
          <h3>主要优势:</h3>
          <ul>
            <li>
              <strong>响应式设计:</strong>
              根据设备特性自动调整布局和样式,提供最佳用户体验。
            </li>
            <li>
              <strong>设备适配:</strong>
              针对不同设备(手机、平板、桌面)提供定制化的样式。
            </li>
            <li>
              <strong>性能优化:</strong>
              可以针对不同设备加载不同大小的图片等资源。
            </li>
            <li>
              <strong>打印优化:</strong>
              为打印媒体提供专门的样式。
            </li>
          </ul>
        </div>

        <div class="use-cases">
          <h3>常见应用场景:</h3>
          <ul>
            <li>根据屏幕宽度调整布局</li>
            <li>针对不同像素密度显示不同分辨率图片</li>
            <li>根据设备方向调整内容排列</li>
            <li>针对深色模式提供不同配色方案</li>
            <li>为打印版本移除不必要的元素</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 基础语法 -->
    <section class="syntax-section">
      <h2 class="section-title">🎮 基础语法</h2>
      <div class="syntax-grid">
        <div class="syntax-card">
          <div class="syntax-example">
            <pre><code>@media (max-width: 600px) {
  .element {
    /* 移动端样式 */
  }
}</code></pre>
          </div>
          <div class="syntax-desc">
            <h3>断点查询</h3>
            <p>基于视口宽度的条件判断</p>
          </div>
        </div>

        <div class="syntax-card">
          <div class="syntax-example">
            <pre><code>@media screen and (orientation: landscape) {
  /* 横屏样式 */
}</code></pre>
          </div>
          <div class="syntax-desc">
            <h3>设备特性</h3>
            <p>检测设备方向/分辨率等</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 媒体特性 -->
    <section class="media-features">
      <h2 class="section-title">🔍 常用媒体特性</h2>
      <div class="feature-grid">
        <div v-for="feature in mediaFeatures" :key="feature.feature" class="feature-card">
          <h3>{{ feature.feature }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 常见断点 -->
    <section class="breakpoints-section">
      <h2 class="section-title">📐 常见断点</h2>
      <div class="breakpoint-list">
        <div v-for="bp in breakpoints" :key="bp.name" class="breakpoint-card" :style="{ '--color': bp.color }">
          <div class="device-icon">{{ bp.icon }}</div>
          <h3>{{ bp.name }}</h3>
          <div class="size-range">{{ bp.range }}</div>
          <div class="usage">{{ bp.usage }}</div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="use-cases">
      <h2 class="section-title">🌟 使用场景</h2>
      <div class="case-grid">
        <div class="case-card">
          <div class="case-icon">📱</div>
          <h3>移动优先设计</h3>
          <p>从小屏幕开始逐步增强</p>
        </div>
        <div class="case-card">
          <div class="case-icon">🖨️</div>
          <h3>打印优化</h3>
          <p>@media print 样式调整</p>
        </div>
        <div class="case-card">
          <div class="case-icon">🌓</div>
          <h3>暗黑模式</h3>
          <p>prefers-color-scheme 检测</p>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practice">
      <h2 class="section-title">🏆 最佳实践</h2>
      <ul class="practice-list">
        <li v-for="practice in practices" :key="practice" class="practice-item">
          ✅ {{ practice }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const breakpoints = [
  {
    name: '手机',
    icon: '📱',
    range: '< 640px',
    usage: '移动端布局',
    color: '#64b5f6',
  },
  {
    name: '平板',
    icon: '💻',
    range: '641px - 1024px',
    usage: '中等屏幕适配',
    color: '#81c784',
  },
  {
    name: '桌面',
    icon: '🖥️',
    range: '> 1025px',
    usage: '大屏优化',
    color: '#ffb74d',
  },
]
const mediaFeatures = [
  { feature: 'max-width', description: '显示区域的最大宽度，例如浏览器窗口' },
  { feature: 'width', description: '视口宽度' },
  { feature: 'orientation', description: '设备方向（横向或纵向）' },
  { feature: 'resolution', description: '设备分辨率' },
  { feature: 'height', description: '视口高度' },
  { feature: 'aspect-ratio', description: '视口宽高比' },
  { feature: 'color', description: '设备支持的颜色数' },
  { feature: 'color-index', description: '设备的颜色索引数' },
  { feature: 'monochrome', description: '单色设备的位深度' },
  { feature: 'grid', description: '设备是否是网格设备' },
  { feature: 'scan', description: '电视扫描方式' },
]

const practices = [
  '使用移动优先原则',
  '避免过多断点（推荐3-5个）',
  '使用em代替px作为单位',
  '组合多个媒体特征',
  '配合CSS变量使用',
]
</script>

<style scoped>
h3,
li,
p,
div,
button {
  color: #000;
}

.media-query-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.core-concept {
  margin: 3rem 0;
}

.concept-card {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.device-mockup {
  width: 300px;
  height: 500px;
  background: #e0e0e0;
  border-radius: 24px;
  padding: 1rem;
  position: relative;
}

.screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.responsive-bar {
  position: absolute;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  left: 0;
  right: 0;
}

.mobile {
  width: 30%;
  top: 20%;
}

.tablet {
  width: 60%;
  top: 40%;
}

.desktop {
  width: 90%;
  top: 60%;
}

.feature-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background: #e3f2fd;
  color: #1a73e8;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.syntax-section {
  margin: 3rem 0;
}

.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.syntax-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.syntax-card:hover {
  transform: translateY(-5px);
}

pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
}

.breakpoints-section {
  margin: 3rem 0;
}

.breakpoint-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.breakpoint-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border-bottom: 4px solid var(--color);
  transition: transform 0.3s ease;
}

.breakpoint-card:hover {
  transform: translateY(-5px);
}

.device-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.use-cases {
  margin: 3rem 0;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
}

.media-features {
  margin: 3rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.best-practice {
  margin: 3rem 0;
}

.practice-list {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.practice-item {
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
  transition: background 0.3s ease;
}

.practice-item:hover {
  background: #f8f9fa;
}
</style>
