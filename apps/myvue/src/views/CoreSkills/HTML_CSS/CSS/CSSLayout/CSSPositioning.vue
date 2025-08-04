<template>
  <div class="position-guide">
    <h1 class="main-title">CSS 定位基本指南</h1>

    <h3>CSS 定位是指通过不同的定位方式来控制元素在页面中的位置。常见的定位方式包括 Static、Relative、Absolute、Fixed 和 Sticky。每种定位方式都有其独特的特性和使用场景。</h3>

    <!-- 定位概览 -->
    <section class="overview-section">
      <div class="overview-card">
        <div class="position-types">
          <span v-for="type in positionTypes" :key="type.name" :class="['type-tag', type.class]">
            {{ type.name }}
          </span>
        </div>
        <p class="overview-text" style="color: #fff">
          CSS 定位允许控制元素在文档中的精确位置，包含五种定位模式：
        </p>
      </div>
    </section>

    <!-- Static 定位 -->
    <section class="position-card static">
      <h2 class="card-title">📌 Static 定位（默认）</h2>
      <div class="card-content">
        <div class="demo-box">
          <div class="box static-box">元素1</div>
          <div class="box static-box">元素2</div>
          <div class="box static-box">元素3</div>
        </div>
        <div class="code-section">
          <pre><code>position: static;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>常规文档流布局</li>
            <li>需要重置定位属性时</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">不脱离文档流</span>
          <span class="feature-tag">忽略top/right/bottom/left</span>
        </div>
        <p class="description">Static 定位是默认的定位方式，元素按照文档流进行排列，不会影响其他元素的位置。</p>
      </div>
    </section>

    <!-- Relative 定位 -->
    <section class="position-card relative">
      <h2 class="card-title">🎯 Relative 相对定位</h2>
      <div class="card-content">
        <div class="demo-box relative-demo">
          <div class="box">正常位置</div>
          <div class="box relative-box">偏移元素</div>
          <div class="box">后续元素</div>
        </div>
        <div class="code-section">
          <pre><code>position: relative;
  top: 20px;
  left: 30px;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>微调元素位置</li>
            <li>作为absolute定位的锚点</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">保留原空间</span>
          <span class="feature-tag">相对自身定位</span>
        </div>
        <p class="description">Relative 定位允许元素相对于其正常位置进行偏移，仍然占据原有空间。</p>
      </div>
    </section>

    <!-- Absolute 定位 -->
    <section class="position-card absolute">
      <h2 class="card-title">🎯 Absolute 绝对定位</h2>
      <div class="card-content">
        <div class="demo-box absolute-demo">
          <div class="anchor-box">
            父容器（position: relative）
            <div class="absolute-box">绝对定位元素</div>
          </div>
        </div>
        <div class="code-section">
          <pre><code>position: absolute;
  top: 0;
  right: 0;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>弹出层/模态框</li>
            <li>自定义图标位置</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">脱离文档流</span>
          <span class="feature-tag">相对最近定位祖先</span>
        </div>
        <p class="description">Absolute 定位使元素脱离文档流，位置相对于最近的定位祖先元素。</p>
      </div>
    </section>

    <!-- Fixed 定位 -->
    <section class="position-card fixed">
      <h2 class="card-title">🌐 Fixed 固定定位</h2>
      <div class="card-content">
        <div class="demo-box fixed-demo">
          <div class="fixed-box">固定定位元素</div>
        </div>
        <div class="code-section">
          <pre><code>position: fixed;
  bottom: 20px;
  right: 20px;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>固定导航栏</li>
            <li>悬浮按钮</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">相对视口定位</span>
          <span class="feature-tag">不随滚动移动</span>
        </div>
        <p class="description">Fixed 定位使元素相对于视口固定，滚动页面时元素位置不变。</p>
      </div>
    </section>

    <!-- Sticky 定位 -->
    <section class="position-card sticky">
      <h2 class="card-title">📌 Sticky 粘性定位</h2>
      <div class="card-content">
        <div class="demo-box sticky-demo">
          <div class="sticky-box">粘性元素</div>
          <div class="scroll-content"></div>
        </div>
        <div class="code-section">
          <pre><code>position: sticky;
  top: 0;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>吸顶导航</li>
            <li>表头固定</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">混合定位模式</span>
          <span class="feature-tag">到达阈值后固定</span>
        </div>
        <p class="description">Sticky 定位结合了相对和固定定位，元素在滚动到特定位置时变为固定。</p>
        <p>sticky 定位失效的原因：</p>
        <ul>
          <li>父元素overflow:hidden或者overflow:auto属性，或者body height:100%</li>
          <li>没有指定top、right、bottom、left</li>
          <li>父元素的高度低于sticky元素的高度</li>

        </ul>
      </div>
    </section>
    <!-- Inset 属性 -->
    <section class="position-card inset">
      <h2 class="card-title">📏 Inset简写属性(CSS新特性)</h2>
      <div class="card-content">
        <div class="code-section">
          <pre><code>/* 四个方向统一设置 */
inset: 20px;

/* 上下 左右分别设置 */
inset: 20px 50px;

/* 上 左右 下分别设置 */
inset: 20px 50px 30px;

/* 上 右 下 左分别设置 */
inset: 20px 50px 30px 40px;</code></pre>
        </div>
        <div class="usage-section">
          <h3>🚀 使用场景</h3>
          <ul>
            <li>快速设置定位元素四边距离</li>
            <li>居中定位元素</li>
            <li>创建全屏覆盖层</li>
          </ul>
        </div>
        <div class="features">
          <span class="feature-tag">简写属性</span>
          <span class="feature-tag">替代top/right/bottom/left</span>
        </div>
        <p class="description">Inset 是一个简写属性，用于同时设置 top、right、bottom、left 值，可以大大简化定位元素的样式代码。</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const positionTypes = [
  { name: 'static', class: 'static' },
  { name: 'relative', class: 'relative' },
  { name: 'absolute', class: 'absolute' },
  { name: 'fixed', class: 'fixed' },
  { name: 'sticky', class: 'sticky' },
]
</script>

<style scoped>
h3,
li {
  color: #000;
}

.position-guide {
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

.position-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.position-card:hover {
  transform: translateY(-5px);
}

.card-title {
  color: #34495e;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.demo-box {
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
  min-height: 200px;
}

.box {
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  margin: 0.5rem;
  border-radius: 4px;
}

/* 各定位类型特色样式 */
.relative .demo-box {
  background: #e3f2fd;
}

.absolute .demo-box {
  background: #f3e5f5;
}

.fixed .demo-box {
  background: #ffebee;
}

.sticky .demo-box {
  background: #e8f5e9;
}

.code-section {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-family: 'Fira Code', monospace;
}

.usage-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.features {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.feature-tag {
  background: #e0f7fa;
  color: #00796b;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* 定位演示具体样式 */
.relative-box {
  position: relative;
  top: 20px;
  left: 30px;
  background: #90caf9;
}

.anchor-box {
  position: relative;
  height: 150px;
  background: #ce93d8;
  padding: 1rem;
}

.absolute-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ab47bc;
  color: white;
}

.fixed-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ef5350;
  color: white;
  padding: 1rem;
  border-radius: 50px;
}

.sticky-demo {
  height: 300px;
  overflow-y: auto;
}

.sticky-box {
  position: sticky;
  top: 0;
  background: #66bb6a;
  color: white;
  z-index: 1;
}

.scroll-content {
  height: 800px;
}

.type-tag {
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  margin: 0.3rem;
  font-weight: 500;
}

.static {
  background: #cfd8dc;
}

.relative {
  background: #90caf9;
}

.absolute {
  background: #ce93d8;
}

.fixed {
  background: #ef9a9a;
}

.sticky {
  background: #a5d6a7;
}
</style>
