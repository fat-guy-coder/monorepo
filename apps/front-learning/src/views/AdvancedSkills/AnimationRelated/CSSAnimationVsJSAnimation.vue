<template>
  <div class="animation-comparison">
    <!-- 头部区域 -->
    <div class="header">
      <h1>CSS vs JavaScript 动画对比分析</h1>
      <p>探索两种动画技术的性能、功能差异与应用场景</p>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 概览卡片 -->
      <div class="overview-cards">
        <div class="overview-card css-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.83L20.4,10.76L21.94,3H5M18.3,16L16.5,18.77L13.45,17.74L15.66,16H18.3Z" />
            </svg>
          </div>
          <h2>CSS 动画</h2>
          <div class="card-content">
            <p>使用CSS属性实现的声明式动画，由浏览器合成器线程处理</p>
            <div class="features">
              <span class="feature-tag">GPU加速</span>
              <span class="feature-tag">声明式</span>
              <span class="feature-tag">高性能</span>
            </div>
          </div>
        </div>

        <div class="overview-card js-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.22,17.68 9.11,17.04H7.73M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.3,17.06L13.71,17.86Z" />
            </svg>
          </div>
          <h2>JavaScript 动画</h2>
          <div class="card-content">
            <p>通过JavaScript动态计算实现的命令式动画，在主线程运行</p>
            <div class="features">
              <span class="feature-tag">完全控制</span>
              <span class="feature-tag">复杂逻辑</span>
              <span class="feature-tag">灵活交互</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能对比 -->
      <div class="comparison-section performance">
        <h2>性能对比</h2>
        <div class="comparison-grid">
          <div class="comparison-header">
            <div></div>
            <div>CSS 动画</div>
            <div>JavaScript 动画</div>
          </div>

          <div class="comparison-row">
            <div class="metric">渲染线程</div>
            <div class="css-value">合成器线程 (GPU)</div>
            <div class="js-value">主线程 (CPU)</div>
          </div>

          <div class="comparison-row">
            <div class="metric">低频率动画</div>
            <div class="css-value">极高性能 <span class="rating">★★★★★</span></div>
            <div class="js-value">高性能 <span class="rating">★★★★☆</span></div>
          </div>

          <div class="comparison-row">
            <div class="metric">高频率动画</div>
            <div class="css-value">稳定60FPS <span class="rating">★★★★★</span></div>
            <div class="js-value">可能丢帧 <span class="rating">★★★☆☆</span></div>
          </div>

          <div class="comparison-row">
            <div class="metric">多元素动画</div>
            <div class="css-value">批量处理 <span class="rating">★★★★★</span></div>
            <div class="js-value">逐个处理 <span class="rating">★★☆☆☆</span></div>
          </div>

          <div class="comparison-row">
            <div class="metric">资源消耗</div>
            <div class="css-value">GPU内存</div>
            <div class="js-value">CPU计算</div>
          </div>
        </div>
      </div>

      <!-- 功能对比 -->
      <div class="comparison-section capability">
        <h2>功能对比</h2>
        <div class="capability-grid">
          <div class="capability-card">
            <h3>CSS 动画优势</h3>
            <ul class="pros">
              <li>硬件加速，性能卓越</li>
              <li>声明式语法，简洁直观</li>
              <li>浏览器优化，低功耗</li>
              <li>与CSS生态系统无缝集成</li>
              <li>响应式设计友好</li>
            </ul>
          </div>

          <div class="capability-card">
            <h3>JavaScript 动画优势</h3>
            <ul class="pros">
              <li>完全控制动画过程</li>
              <li>复杂动画逻辑实现</li>
              <li>实时交互响应</li>
              <li>基于物理的动画效果</li>
              <li>复杂路径动画</li>
            </ul>
          </div>

          <div class="capability-card">
            <h3>CSS 动画限制</h3>
            <ul class="cons">
              <li>仅限于transform/opacity属性</li>
              <li>有限的时间轴控制</li>
              <li>难以实现复杂交互</li>
              <li>基于物理的动画困难</li>
              <li>路径动画支持有限</li>
            </ul>
          </div>

          <div class="capability-card">
            <h3>JavaScript 动画限制</h3>
            <ul class="cons">
              <li>主线程阻塞风险</li>
              <li>实现复杂度高</li>
              <li>功耗较高</li>
              <li>需要手动优化性能</li>
              <li>浏览器兼容性问题</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 实时演示 -->
      <div class="demo-section">
        <h2>实时性能演示</h2>
        <div class="demo-controls">
          <div class="control-group">
            <label>元素数量</label>
            <div class="slider-container">
              <input
                type="range"
                min="1"
                max="500"
                v-model="elementCount"
                class="slider"
              >
              <span>{{ elementCount }} 个元素</span>
            </div>
          </div>

          <div class="control-group">
            <label>动画类型</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="animationType" value="position">
                <span>位置变化</span>
              </label>
              <label>
                <input type="radio" v-model="animationType" value="scale">
                <span>缩放变化</span>
              </label>
              <label>
                <input type="radio" v-model="animationType" value="complex">
                <span>复杂动画</span>
              </label>
            </div>
          </div>
        </div>

        <div class="demo-area">
          <div class="demo-container">
            <h3>CSS 动画</h3>
            <div class="fps-counter">
              <span>FPS: {{ cssFps }}</span>
              <div class="fps-bar" :style="{ width: cssFpsPercent + '%' }"></div>
            </div>
            <div class="animation-area css-animation" ref="cssArea">
              <div
                v-for="i in elementCount"
                :key="'css-'+i"
                class="animated-element"
                :class="animationType"
              ></div>
            </div>
          </div>

          <div class="demo-container">
            <h3>JavaScript 动画</h3>
            <div class="fps-counter">
              <span>FPS: {{ jsFps }}</span>
              <div class="fps-bar" :style="{ width: jsFpsPercent + '%' }"></div>
            </div>
            <div class="animation-area js-animation" ref="jsArea">
              <div
                v-for="i in elementCount"
                :key="'js-'+i"
                class="animated-element"
                :ref="setJsElementRef"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用建议 -->
      <div class="recommendation-section">
        <h2>使用建议</h2>
        <div class="recommendation-grid">
          <div class="recommendation-card">
            <h3>使用 CSS 动画</h3>
            <ul>
              <li>简单UI过渡效果（悬停、加载）</li>
              <li>性能敏感的动画场景</li>
              <li>大量元素的动画效果</li>
              <li>不需要复杂交互的动画</li>
              <li>移动设备上的动画</li>
            </ul>
          </div>

          <div class="recommendation-card">
            <h3>使用 JavaScript 动画</h3>
            <ul>
              <li>需要复杂逻辑的动画</li>
              <li>用户交互驱动的动画</li>
              <li>基于物理的动画效果</li>
              <li>复杂路径动画</li>
              <li>需要暂停/反转/控制的动画</li>
            </ul>
          </div>

          <div class="recommendation-card">
            <h3>最佳实践</h3>
            <ul>
              <li>优先使用CSS动画处理简单效果</li>
              <li>复杂动画使用GSAP等专业库</li>
              <li>避免在JS动画中修改布局属性</li>
              <li>使用requestAnimationFrame</li>
              <li>CSS动画使用will-change优化</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// 元素数量
const elementCount = ref(50)
const animationType = ref('position')

// FPS计数器
const cssFps = ref(0)
const jsFps = ref(0)
const cssFpsPercent = ref(0)
const jsFpsPercent = ref(0)

// JS动画元素引用
const jsElements = ref<HTMLDivElement[]>([])
const setJsElementRef = (el: HTMLDivElement) => {
  if (el) {
    jsElements.value.push(el)
  }
}

// FPS计算
const calculateFps = (startTime: number, frameCount: number) => {
  const now = performance.now()
  const elapsed = now - startTime
  return Math.round((frameCount / elapsed) * 1000)
}

// CSS动画FPS监控
let cssFrameCount = 0
let cssStartTime = 0
const cssArea = ref<HTMLDivElement | null>(null)

const monitorCssFps = () => {
  if (!cssArea.value) return

  const observer = new MutationObserver(() => {
    cssFrameCount++
    const currentFps = calculateFps(cssStartTime, cssFrameCount)
    cssFps.value = currentFps
    cssFpsPercent.value = Math.min(100, (currentFps / 60) * 100)
  })

  observer.observe(cssArea.value, {
    attributes: true,
    subtree: true,
    attributeFilter: ['style']
  })

  return observer
}

// JS动画实现
let jsFrameCount = 0
let jsStartTime = 0
let animationId: number | null = null
const jsArea = ref<HTMLDivElement | null>(null)
let phase = 0

const animateJs = () => {
  const now = performance.now()
  const elapsed = now - jsStartTime
  phase = (elapsed / 2000) * Math.PI * 2 // 2秒周期

  jsElements.value.forEach((el, index) => {
    const offset = index * 0.1
    const currentPhase = phase + offset

    if (animationType.value === 'position') {
      // 位置变化动画
      const x = Math.sin(currentPhase) * 100
      const y = Math.cos(currentPhase) * 50
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    else if (animationType.value === 'scale') {
      // 缩放变化动画
      const scale = 0.5 + Math.abs(Math.sin(currentPhase)) * 0.5
      el.style.transform = `scale(${scale})`
    }
    else {
      // 复杂动画
      const x = Math.sin(currentPhase) * 100
      const y = Math.cos(currentPhase * 1.5) * 50
      const scale = 0.5 + Math.abs(Math.sin(currentPhase * 2)) * 0.5
      const rotation = currentPhase * (180 / Math.PI)
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`
    }
  })

  jsFrameCount++
  const currentFps = calculateFps(jsStartTime, jsFrameCount)
  jsFps.value = currentFps
  jsFpsPercent.value = Math.min(100, (currentFps / 60) * 100)

  animationId = requestAnimationFrame(animateJs)
}

// 启动/停止JS动画
const startJsAnimation = () => {
  if (animationId) return

  jsFrameCount = 0
  jsStartTime = performance.now()
  animationId = requestAnimationFrame(animateJs)
}

const stopJsAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// 响应元素数量变化
watch(elementCount, (newVal, oldVal) => {
  if (newVal < oldVal) {
    jsElements.value = jsElements.value.slice(0, newVal)
  }
})

// 响应动画类型变化
watch(animationType, () => {
  // 重置JS元素样式
  jsElements.value.forEach(el => {
    el.style.transform = ''
  })
})

// 生命周期钩子
onMounted(() => {
  const cssObserver = monitorCssFps()
  cssStartTime = performance.now()

  startJsAnimation()

  onUnmounted(() => {
    if (cssObserver) cssObserver.disconnect()
    stopJsAnimation()
  })
})
</script>

<style lang="less" scoped>

@primary-color: #4e79c7;
@secondary-color: #e15759;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@text-secondary: #718096;
@shadow: 0 4px 12px rgba(78, 121, 199, 0.1);
@css-color: #4e79c7;
@js-color: #e15759;

.animation-comparison {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: @light-bg;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @text-color;
    margin-bottom: 0.8rem;
    background: linear-gradient(135deg, @css-color, @js-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.overview-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow;
  display: flex;
  flex-direction: column;

  .card-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    color: @text-color;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-bottom: 1.5rem;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .feature-tag {
      background: rgba(78, 121, 199, 0.1);
      color: @css-color;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.css-card {
  border-top: 4px solid @css-color;

  .card-icon {
    background: rgba(78, 121, 199, 0.1);

    svg {
      fill: @css-color;
    }
  }

  .features .feature-tag {
    background: rgba(78, 121, 199, 0.1);
    color: @css-color;
  }
}

.js-card {
  border-top: 4px solid @js-color;

  .card-icon {
    background: rgba(225, 87, 89, 0.1);

    svg {
      fill: @js-color;
    }
  }

  .features .feature-tag {
    background: rgba(225, 87, 89, 0.1);
    color: @js-color;
  }
}

.comparison-section {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: @text-color;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .comparison-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #f1f5f9;
    font-weight: 600;
    color: @text-color;

    > div {
      padding: 1rem;
      text-align: center;
    }
  }

  .comparison-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid @border-color;

    > div {
      padding: 1rem;
    }

    .metric {
      font-weight: 500;
      background: #f8fafc;
      color: @text-color;
    }

    .css-value {
      text-align: center;
      color: @css-color;
      border-left: 1px solid @border-color;
    }

    .js-value {
      text-align: center;
      color: @js-color;
      border-left: 1px solid @border-color;
    }

    .rating {
      display: block;
      font-size: 1.2rem;
      letter-spacing: 2px;
      color: #f59e0b;
    }
  }
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.capability-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.3rem;
    color: @text-color;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }

  .pros li::before {
    background: #10b981;
  }

  .cons li::before {
    background: #ef4444;
  }
}

.demo-section {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: @text-color;
    margin-bottom: 1.5rem;
  }
}

.demo-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .control-group {
    label {
      display: block;
      font-weight: 500;
      color: @text-color;
      margin-bottom: 0.8rem;
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 1rem;

      .slider {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: #e2e8f0;
        outline: none;
        -webkit-appearance: none;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: @primary-color;
          cursor: pointer;
        }
      }

      span {
        min-width: 80px;
        font-size: 0.9rem;
        color: @text-secondary;
      }
    }

    .radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0;
        font-weight: normal;
        cursor: pointer;

        input {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}

.demo-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.demo-container {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.3rem;
    color: @text-color;
    margin-bottom: 1rem;
  }
}

.fps-counter {
  background: white;
  border-radius: 6px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid @border-color;

  span {
    font-weight: 500;
    min-width: 80px;
  }

  .fps-bar {
    height: 10px;
    border-radius: 5px;
    transition: width 0.3s ease;
  }
}

.css-animation .fps-bar {
  background: @css-color;
}

.js-animation .fps-bar {
  background: @js-color;
}

.animation-area {
  height: 300px;
  border-radius: 8px;
  border: 1px dashed @border-color;
  position: relative;
  overflow: hidden;
}

.animated-element {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.css-animation .animated-element {
  background: @css-color;

  &.position {
    animation: css-position 2s infinite alternate ease-in-out;
  }

  &.scale {
    animation: css-scale 2s infinite alternate ease-in-out;
  }

  &.complex {
    animation:
      css-position 3s infinite alternate ease-in-out,
      css-scale 1.5s infinite alternate ease-in-out,
      css-rotate 4s infinite linear;
  }
}

.js-animation .animated-element {
  background: @js-color;
}

@keyframes css-position {
  0% { transform: translate(-100px, -50px); }
  100% { transform: translate(100px, 50px); }
}

@keyframes css-scale {
  0% { transform: translate(-50%, -50%) scale(0.5); }
  100% { transform: translate(-50%, -50%) scale(1.5); }
}

@keyframes css-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.recommendation-section {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow;

  h2 {
    font-size: 1.8rem;
    color: @text-color;
    margin-bottom: 1.5rem;
  }
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.recommendation-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.3rem;
    color: @text-color;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .demo-area {
    grid-template-columns: 1fr;
  }

  .comparison-grid {
    grid-template-columns: 1fr;

    .comparison-header {
      display: none;
    }

    .comparison-row {
      grid-template-columns: 1fr;
      border-bottom: 1px solid @border-color;

      > div {
        padding: 0.8rem;
        border-left: none !important;
      }

      .metric {
        font-weight: 600;
        background: #f1f5f9;
      }
    }
  }
}
</style>
