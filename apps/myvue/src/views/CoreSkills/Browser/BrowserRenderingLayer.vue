<template>
  <div class="browser-layers-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>浏览器图层机制解析</h1>
        <p>深入理解现代浏览器的图层合成与渲染优化</p>
        <div class="layer-animation">
          <div class="layer" v-for="(layer, index) in layers" :key="index" :style="layerStyle(index)">
            <div class="layer-label">图层 {{ layers - index }}</div>
            <div class="layer-content">
              <div v-if="index === 0" class="composite-demo">
                <div class="demo-element"></div>
                <div class="demo-element"></div>
                <div class="demo-element"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 图层概述 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-layer-group"></i>
          <h2>图层概述</h2>
        </div>
        <div class="section-content">
          <p>浏览器图层(Layer)是浏览器渲染引擎中的关键概念，它将页面内容分解为多个独立的绘制层，通过分层渲染和合成技术优化页面性能。</p>

          <div class="info-grid">
            <div class="info-card">
              <i class="fas fa-lightbulb"></i>
              <h3>核心目的</h3>
              <p>优化渲染性能，减少不必要的重绘，实现高效动画</p>
            </div>
            <div class="info-card">
              <i class="fas fa-puzzle-piece"></i>
              <h3>实现方式</h3>
              <p>将页面分解为多个独立层，分别绘制后合成最终图像</p>
            </div>
            <div class="info-card">
              <i class="fas fa-rocket"></i>
              <h3>性能优势</h3>
              <p>GPU加速、局部重绘、避免布局抖动</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 图层的作用 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-tasks"></i>
          <h2>图层的作用</h2>
        </div>
        <div class="section-content">
          <div class="role-cards">
            <div class="role-card">
              <div class="role-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h3>GPU加速渲染</h3>
              <p>图层内容可以交由GPU处理，利用硬件加速提升渲染性能</p>
            </div>

            <div class="role-card">
              <div class="role-icon">
                <i class="fas fa-sync"></i>
              </div>
              <h3>减少重绘范围</h3>
              <p>仅更新变化图层，避免整个页面重绘</p>
            </div>

            <div class="role-card">
              <div class="role-icon">
                <i class="fas fa-film"></i>
              </div>
              <h3>高效动画支持</h3>
              <p>对独立图层进行变换操作不影响其他元素</p>
            </div>

            <div class="role-card">
              <div class="role-icon">
                <i class="fas fa-clipboard-check"></i>
              </div>
              <h3>避免布局抖动</h3>
              <p>图层化可以隔离变化，减少布局重排影响</p>
            </div>
          </div>

          <div class="visualization">
            <div class="visualization-title">
              <i class="fas fa-chart-bar"></i>
              <h3>图层渲染性能对比</h3>
            </div>
            <div class="chart-container">
              <div class="chart-bar" style="height: 80%; background-color: #ff6b6b;">
                <div class="chart-label">无图层渲染</div>
                <div class="chart-value">80ms</div>
              </div>
              <div class="chart-bar" style="height: 35%; background-color: #4ecdc4;">
                <div class="chart-label">图层化渲染</div>
                <div class="chart-value">35ms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 渲染时机 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-clock"></i>
          <h2>图层渲染时机</h2>
        </div>
        <div class="section-content">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>1. 初始页面加载</h3>
                <p>浏览器解析HTML、CSS后创建渲染树，根据图层触发条件生成初始图层结构</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>2. 样式变化</h3>
                <p>当元素样式改变且影响视觉效果时，浏览器检查是否需要创建新图层</p>
                <div class="code-example">
                  <pre>element.style.transform = 'translateX(100px)';</pre>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>3. 内容更新</h3>
                <p>元素内容变化时，浏览器判断该元素是否在独立图层，决定重绘范围</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>4. 动画执行</h3>
                <p>每帧动画触发前，浏览器准备图层内容，动画执行时进行图层合成</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>5. 滚动事件</h3>
                <p>页面滚动时，浏览器优先合成现有图层，减少重绘计算</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图层触发条件 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-magic"></i>
          <h2>图层触发条件</h2>
        </div>
        <div class="section-content">
          <div class="trigger-grid">
            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fab fa-css3-alt"></i>
                <h3>CSS 3D变换</h3>
              </div>
              <p>使用3D变换属性会触发新图层创建</p>
              <div class="code-example">
                <pre>transform: translate3d(0, 0, 0);</pre>
                <pre>transform: rotateY(30deg);</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-full"></i>
                <span>GPU加速，高效渲染</span>
              </div>
            </div>

            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fas fa-video"></i>
                <h3>视频与Canvas</h3>
              </div>
              <p>视频元素和Canvas元素默认创建独立图层</p>
              <div class="code-example">
                <pre>&lt;video src="movie.mp4"&gt;&lt;/video&gt;</pre>
                <pre>&lt;canvas id="myCanvas"&gt;&lt;/canvas&gt;</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-three-quarters"></i>
                <span>中等开销，内容更新频繁</span>
              </div>
            </div>

            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fas fa-window-restore"></i>
                <h3>叠加上下文</h3>
              </div>
              <p>position: fixed、z-index等创建叠加上下文</p>
              <div class="code-example">
                <pre>position: fixed;</pre>
                <pre>z-index: 10;</pre>
                <pre>opacity: 0.5;</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-half"></i>
                <span>根据内容复杂度变化</span>
              </div>
            </div>

            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fas fa-flash"></i>
                <h3>动画属性</h3>
              </div>
              <p>使用opacity和transform的动画会触发图层</p>
              <div class="code-example">
                <pre>@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-full"></i>
                <span>GPU加速，高效动画</span>
              </div>
            </div>

            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fas fa-scroll"></i>
                <h3>滚动关联</h3>
              </div>
              <p>与滚动相关的元素可能创建独立图层</p>
              <div class="code-example">
                <pre>overflow: scroll;</pre>
                <pre>-webkit-overflow-scrolling: touch;</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-quarter"></i>
                <span>根据滚动内容复杂度</span>
              </div>
            </div>

            <div class="trigger-card">
              <div class="trigger-header">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>will-change</h3>
              </div>
              <p>显式告知浏览器元素将要变化</p>
              <div class="code-example">
                <pre>will-change: transform;</pre>
                <pre>will-change: opacity;</pre>
              </div>
              <div class="efficiency">
                <i class="fas fa-battery-three-quarters"></i>
                <span>提前准备，优化性能</span>
              </div>
            </div>
          </div>

          <div class="optimization-tips">
            <h3><i class="fas fa-tips"></i> 图层优化建议</h3>
            <ul>
              <li>避免过度使用图层，每个图层消耗额外内存</li>
              <li>优先使用transform和opacity进行动画</li>
              <li>使用will-change时要及时清除</li>
              <li>定期检查页面图层数量（通过浏览器开发者工具）</li>
              <li>复杂静态内容可考虑提升为图层减少重绘</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="summary-section">
        <h3><i class="fas fa-check-circle"></i> 关键总结</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <i class="fas fa-th"></i>
            <p>图层是浏览器优化渲染性能的核心机制</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-bolt"></i>
            <p>合理使用图层可充分利用GPU加速</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-sync"></i>
            <p>图层可减少重绘范围，提高渲染效率</p>
          </div>
          <div class="summary-item">
            <i class="fas fa-exclamation"></i>
            <p>过度使用图层会导致内存占用增加</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>浏览器图层机制解析 | 前端性能优化核心知识</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-chrome"></i> Chrome Layers Panel</a>
        <a href="#"><i class="fas fa-book"></i> 浏览器渲染原理文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const layers = ref(5); // 图层数量

const layerStyle = computed(() => (index: number) => {
  const zIndex = layers.value - index;
  const scale = 1 - (index * 0.05);
  const rotate = index % 2 === 0 ? index * 0.5 : -index * 0.5;

  return {
    zIndex: zIndex,
    transform: `scale(${scale}) rotate(${rotate}deg)`,
    opacity: 1 - (index * 0.1),
    backgroundColor: `hsl(${200 + (index * 10)}, 70%, ${85 - (index * 5)}%)`
  };
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.browser-layers-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
}

.layer-animation {
  max-width: 500px;
  height: 300px;
  margin: 40px auto 0;
  position: relative;
  perspective: 1000px;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease, opacity 0.5s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  .layer-label {
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
  }

  .layer-content {
    flex: 1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.composite-demo {
  display: flex;
  gap: 20px;

  .demo-element {
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
    border-radius: 8px;
    animation: float 3s ease-in-out infinite;

    &:nth-child(2) {
      background: linear-gradient(45deg, #a1c4fd, #c2e9fb);
      animation-delay: 0.5s;
    }

    &:nth-child(3) {
      background: linear-gradient(45deg, #d4fc79, #96e6a1);
      animation-delay: 1s;
    }
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.info-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  }

  i {
    font-size: 2.5rem;
    color: #4f46e5;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 15px;
    color: #1e293b;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.role-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .role-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 1.8rem;
  }

  h3 {
    margin: 0 0 15px;
    color: #1e293b;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
}

.visualization {
  background: #f8fafc;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
  border: 1px solid #e2e8f0;

  .visualization-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    i {
      font-size: 1.5rem;
      color: #4f46e5;
      margin-right: 10px;
    }

    h3 {
      margin: 0;
      color: #1e293b;
    }
  }
}

.chart-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  height: 200px;
  align-items: flex-end;
  padding: 0 30px;
}

.chart-bar {
  width: 100px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  .chart-label {
    position: absolute;
    top: -30px;
    font-weight: 600;
    color: #334155;
  }

  .chart-value {
    margin-bottom: 10px;
    color: white;
    font-weight: 600;
  }
}

.timeline {
  position: relative;
  padding-left: 30px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #c7d2fe;
    border-radius: 2px;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: -38px;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #4f46e5;
    border-radius: 50%;
    border: 4px solid #eef2ff;
  }

  .timeline-content {
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    border-left: 3px solid #4f46e5;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #1e293b;
    }

    p {
      margin-bottom: 15px;
    }
  }
}

.code-example {
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 6px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin-top: 15px;

  pre {
    margin: 0;
  }
}

.trigger-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.trigger-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .trigger-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    color: white;

    i {
      font-size: 1.8rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }
  }

  p {
    padding: 15px 20px 0;
    margin: 0;
    font-size: 1rem;
  }

  .code-example {
    margin: 15px 20px;
    border-radius: 6px;
  }

  .efficiency {
    display: flex;
    align-items: center;
    padding: 10px 20px 20px;
    font-size: 0.9rem;
    color: #64748b;

    i {
      margin-right: 8px;
      font-size: 1.2rem;
    }
  }
}

.optimization-tips {
  background: #e0f2fe;
  border-left: 4px solid #0ea5e9;
  border-radius: 0 8px 8px 0;
  padding: 20px;

  h3 {
    display: flex;
    align-items: center;
    margin-top: 0;
    color: #0369a1;

    i {
      margin-right: 10px;
    }
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;

  h3 {
    display: flex;
    align-items: center;
    margin-top: 0;
    font-size: 1.5rem;

    i {
      margin-right: 15px;
    }
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;

  i {
    font-size: 1.8rem;
    margin-right: 15px;
    color: #c7d2fe;
  }

  p {
    margin: 0;
    font-size: 1.05rem;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #4f46e5;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section .hero-content h1 {
    font-size: 2rem;
  }

  .hero-section .hero-content p {
    font-size: 1.1rem;
  }

  .layer-animation {
    height: 200px;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .chart-container {
    gap: 20px;
  }

  .chart-bar {
    width: 80px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 15px;
  }

  .section-content {
    padding: 15px;
  }

  .chart-container {
    gap: 10px;
    padding: 0 10px;
  }

  .chart-bar {
    width: 60px;
  }
}
</style>
