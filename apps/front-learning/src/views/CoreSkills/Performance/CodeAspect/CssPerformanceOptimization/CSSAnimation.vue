<template>
  <div class="css-animation-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>CSS动画性能优化指南</h1>
        <p class="subtitle">利用硬件加速提升前端渲染性能</p>

        <div class="performance-comparison">
          <div class="comparison-card">
            <div class="comparison-header">
              <div class="comparison-icon">🔄</div>
              <h3>CSS动画</h3>
            </div>
            <ul class="comparison-features">
              <li>硬件加速</li>
              <li>帧率稳定</li>
              <li>低CPU占用</li>
              <li>流畅体验</li>
            </ul>
            <div class="performance-indicator good">
              90+FPS
            </div>
          </div>

          <div class="comparison-card">
            <div class="comparison-header">
              <div class="comparison-icon">⏱️</div>
              <h3>JS动画</h3>
            </div>
            <ul class="comparison-features">
              <li>主线程阻塞</li>
              <li>帧率波动</li>
              <li>高CPU占用</li>
              <li>卡顿风险</li>
            </ul>
            <div class="performance-indicator bad">
              30-60FPS
            </div>
          </div>
        </div>
      </div>

      <div class="animation-demo">
        <div class="demo-container">
          <div class="animated-element" :class="{ 'running': demoRunning }">CSS动画</div>
          <div class="controls">
            <button @click="toggleDemo" class="demo-btn">
              {{ demoRunning ? '停止动画' : '开始动画' }}
            </button>
            <div class="fps-meter">
              <div class="fps-gauge" :style="{ width: fps + '%' }">{{ fps }} FPS</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">CSS动画性能优势</h2>

      <div class="performance-grid">
        <div class="performance-card">
          <div class="card-icon">⚙️</div>
          <h3>硬件加速</h3>
          <p>现代浏览器对CSS动画进行GPU加速，减少主线程负担</p>
        </div>

        <div class="performance-card">
          <div class="card-icon">🚀</div>
          <h3>合成器线程</h3>
          <p>浏览器在合成器线程处理CSS动画，避免阻塞主线程</p>
        </div>

        <div class="performance-card">
          <div class="card-icon">🔋</div>
          <h3>低功耗</h3>
          <p>CSS动画比JS动画更节能，特别在移动设备上</p>
        </div>

        <div class="performance-card">
          <div class="card-icon">🔄</div>
          <h3>帧率稳定</h3>
          <p>浏览器可以优化CSS动画执行，保持高帧率流畅度</p>
        </div>
      </div>

      <div class="render-pipeline">
        <h3>浏览器渲染管道优化</h3>
        <div class="pipeline-diagram">
          <div class="pipeline-stage">JS</div>
          <div class="pipeline-stage">样式计算</div>
          <div class="pipeline-stage">布局</div>
          <div class="pipeline-stage">绘制</div>
          <div class="pipeline-stage">合成</div>

          <div class="pipeline-flow css-flow"></div>
          <div class="pipeline-flow js-flow"></div>

          <div class="pipeline-label css-label">CSS动画路径</div>
          <div class="pipeline-label js-label">JS动画路径</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">高性能CSS动画最佳实践</h2>

      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-number">1</div>
          <div class="practice-content">
            <h3>使用变换(transform)和透明度(opacity)</h3>
            <p>transform和opacity不会触发布局重排或绘制，性能最佳</p>
            <div class="code-block">
              <pre><code>.animate {
  /* 高性能 */
  transform: translateX(100px);
  opacity: 0.8;

  /* 低性能 */
  margin-left: 100px;
}</code></pre>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">2</div>
          <div class="practice-content">
            <h3>启用GPU加速</h3>
            <p>使用transform: translateZ(0)或will-change属性触发GPU渲染</p>
            <div class="code-block">
              <pre><code>.accelerate {
  /* 触发GPU加速 */
  transform: translateZ(0);
  /* 或 */
  will-change: transform;
}</code></pre>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">3</div>
          <div class="practice-content">
            <h3>避免布局抖动</h3>
            <p>在动画中避免读取布局属性，防止强制同步布局</p>
            <div class="code-block">
              <pre><code>// ❌ 避免在动画帧中读取布局属性
element.style.width = (element.offsetWidth + 1) + 'px';

// ✅ 使用transform代替
element.style.transform = `translateX(${position}px)`;</code></pre>
            </div>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">4</div>
          <div class="practice-content">
            <h3>优化动画时间函数</h3>
            <p>使用linear、ease代替cubic-bezier(0,0,1,1)等复杂函数</p>
            <div class="code-block">
              <pre><code>.smooth {
  /* 高性能 */
  animation-timing-function: ease;

  /* 复杂函数需更多计算 */
  animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">CSS对比JS动画性能分析</h2>

      <div class="comparison-table">
        <div class="comparison-header">
          <div class="comparison-column">特性</div>
          <div class="comparison-column">CSS动画</div>
          <div class="comparison-column">JS动画</div>
        </div>

        <div class="comparison-row">
          <div class="comparison-cell">渲染线程</div>
          <div class="comparison-cell">合成器线程</div>
          <div class="comparison-cell">主线程</div>
        </div>

        <div class="comparison-row">
          <div class="comparison-cell">CPU使用率</div>
          <div class="comparison-cell">低</div>
          <div class="comparison-cell">高</div>
        </div>

        <div class="comparison-row">
          <div class="comparison-cell">GPU加速</div>
          <div class="comparison-cell">✅ 自动</div>
          <div class="comparison-cell">⚠️ 需手动</div>
        </div>

        <div class="comparison-row">
          <div class="comparison-cell">帧率稳定性</div>
          <div class="comparison-cell">高</div>
          <div class="comparison-cell">中低</div>
        </div>

        <div class="comparison-row">
          <div class="comparison-cell">适用场景</div>
          <div class="comparison-cell">简单UI动画</div>
          <div class="comparison-cell">复杂交互动画</div>
        </div>
      </div>

      <div class="performance-tips">
        <h3>何时使用CSS动画？</h3>
        <ul>
          <li>过渡效果（悬停、焦点状态）</li>
          <li>元素进入/离开动画</li>
          <li>简单加载动画</li>
          <li>背景装饰动画</li>
          <li>响应式布局变换</li>
        </ul>

        <h3>何时考虑JS动画？</h3>
        <ul>
          <li>需要复杂逻辑控制的动画</li>
          <li>基于滚动位置的复杂动画</li>
          <li>物理引擎驱动的动画</li>
          <li>需要暂停/反转/动态调整的动画</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">高级CSS动画优化技巧</h2>

      <div class="advanced-techniques">
        <div class="technique-card">
          <div class="technique-icon">🎚️</div>
          <h3>层创建与控制</h3>
          <p>使用will-change属性提示浏览器提前优化</p>
          <pre><code>.optimized {
  will-change: transform, opacity;
}</code></pre>
          <div class="technique-tip">提示：避免过度使用，仅在需要时添加</div>
        </div>

        <div class="technique-card">
          <div class="technique-icon">📐</div>
          <h3>减少重绘区域</h3>
          <p>缩小动画元素的尺寸和影响范围</p>
          <pre><code>.minimal-repaint {
  width: 100px;
  height: 100px;
  position: absolute;
}</code></pre>
          <div class="technique-tip">提示：使用position: absolute隔离动画元素</div>
        </div>

        <div class="technique-card">
          <div class="technique-icon">📉</div>
          <h3>优化动画复杂度</h3>
          <p>简化动画效果，减少CSS属性的变化</p>
          <pre><code>/* 优化前 */
.complex {
  transform: translateX(50%) rotate(30deg) scale(1.2);
  filter: blur(2px) drop-shadow(2px 4px 6px black);
}

/* 优化后 */
.simple {
  transform: translateX(50%);
}</code></pre>
          <div class="technique-tip">提示：避免同时使用过多变换效果</div>
        </div>
      </div>
    </div>

    <div class="resources-section">
      <h2>CSS动画性能分析工具</h2>
      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-icon">🔍</div>
          <h3>Chrome DevTools</h3>
          <p>Performance面板分析帧率和渲染瓶颈</p>
        </div>

        <div class="tool-card">
          <div class="tool-icon">📊</div>
          <h3>Lighthouse</h3>
          <p>检测未使用的CSS和动画性能问题</p>
        </div>

        <div class="tool-card">
          <div class="tool-icon">📈</div>
          <h3>CSS Triggers</h3>
          <p>分析CSS属性对渲染管道的影响</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const demoRunning = ref(false);
const fps = ref(0);
let frameCount = 0;
let lastFrameTime = performance.now();
let animationFrameId: number | null = null;

const toggleDemo = () => {
  demoRunning.value = !demoRunning.value;

  if (demoRunning.value) {
    startFpsCounter();
    frameCount = 0;
    lastFrameTime = performance.now();
  } else {
    stopFpsCounter();
  }
};

const startFpsCounter = () => {
  frameCount = 0;
  lastFrameTime = performance.now();

  const updateCounter = () => {
    frameCount++;
    const now = performance.now();
    const delta = now - lastFrameTime;

    if (delta >= 1000) {
      fps.value = Math.round((frameCount * 1000) / delta);
      frameCount = 0;
      lastFrameTime = now;
    }

    if (demoRunning.value) {
      animationFrameId = requestAnimationFrame(updateCounter);
    }
  };

  animationFrameId = requestAnimationFrame(updateCounter);
};

const stopFpsCounter = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

onMounted(() => {
  // 初始启动演示
  toggleDemo();
  setTimeout(() => toggleDemo(), 3000);
});

onBeforeUnmount(() => {
  stopFpsCounter();
});
</script>

<style scoped lang="less">
.css-animation-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  line-height: 1.6;
  background-color: #f9fafb;
}

.hero-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  color: #111827;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
}

.hero-section h1 {
  font-size: 2.2rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.hero-content {
  flex: 1;
  min-width: 300px;
}

.animation-demo {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-container {
  width: 100%;
  max-width: 400px;
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.animated-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  margin: 0 auto;
}

.animated-element.running {
  animation: cssAnimationDemo 2s infinite alternate ease-in-out;
}

@keyframes cssAnimationDemo {
  0% {
    transform: translateX(-80px) rotate(0deg) scale(1);
    border-radius: 8px;
  }

  50% {
    transform: translateX(80px) rotate(180deg) scale(1.2);
    border-radius: 50%;
    background: linear-gradient(45deg, #8b5cf6, #a78bfa);
  }

  100% {
    transform: translateX(-80px) rotate(360deg) scale(1);
    border-radius: 8px;
    background: linear-gradient(45deg, #10b981, #34d399);
  }
}

.controls {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.demo-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.demo-btn:hover {
  background: #2563eb;
}

.fps-meter {
  width: 100%;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.fps-gauge {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #f59e0b, #84cc16);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  font-weight: bold;
  min-width: 50px;
  font-size: 0.9rem;
}

.performance-comparison {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.comparison-card {
  flex: 1;
  min-width: 250px;
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.comparison-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.comparison-header .comparison-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.comparison-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.comparison-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.comparison-features li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.comparison-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: #16a34a;
  font-weight: bold;
}

.performance-indicator {
  text-align: center;
  padding: 0.6rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
}

.performance-indicator.good {
  background: #dcfce7;
  color: #166534;
}

.performance-indicator.bad {
  background: #fee2e2;
  color: #991b1b;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.3rem;
  color: #3b82f6;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.performance-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.performance-card .card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.performance-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
}

.performance-card p {
  margin: 0;
  color: #4b5563;
}

.render-pipeline {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
}

.render-pipeline h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #111827;
}

.best-practices {
  display: grid;
  gap: 1.5rem;
}

.practice-card {
  display: flex;
  gap: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.practice-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.practice-content h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: #111827;
}

.practice-content p {
  margin-bottom: 1rem;
  color: #4b5563;
}

.code-block {
  background: #1f2937;
  color: #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.code-block pre {
  margin: 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.comparison-header,
.comparison-row {
  display: table-row;
}

.comparison-column,
.comparison-cell {
  padding: 0.8rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.comparison-header {
  background: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

.comparison-row .comparison-cell:first-child {
  font-weight: 500;
  text-align: left;
}

.performance-tips {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.performance-tips>div {
  flex: 1;
  min-width: 280px;
}

.performance-tips h3 {
  color: #111827;
  margin-top: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.performance-tips ul {
  padding-left: 1.2rem;
}

.performance-tips li {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.advanced-techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.technique-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.technique-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.technique-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
}

.technique-card p {
  margin-bottom: 1rem;
  color: #4b5563;
}

.technique-card pre {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  text-align: left;
}

.technique-tip {
  margin-top: 1rem;
  padding: 0.8rem;
  background: #eff6ff;
  color: #1e40af;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.resources-section {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  color: #111827;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.resources-section h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.tool-card .tool-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tool-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
}

.tool-card p {
  margin: 0;
  color: #4b5563;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
}
</style>
