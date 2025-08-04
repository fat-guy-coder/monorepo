<template>
  <div class="clip-path-guide">
    <header class="guide-header">
      <h1>CSS Clip-Path 完全指南</h1>
      <p>掌握创建复杂形状和视觉效果的强大CSS属性</p>
      <div class="shapes-container">
        <div class="shape circle"></div>
        <div class="shape triangle"></div>
        <div class="shape polygon"></div>
        <div class="shape custom"></div>
      </div>
    </header>

    <main class="guide-content">
      <section class="section">
        <h2 class="section-title">什么是 Clip-Path？</h2>
        <div class="section-content">
          <div class="definition">
            <p>
              CSS
              <code>clip-path</code>
              属性允许你创建一个裁剪区域，用于定义元素的可见部分。区域内的内容会显示，区域外的内容则会被隐藏。
            </p>

            <div class="comparison">
              <div class="comparison-card">
                <h3>传统裁剪方法</h3>
                <ul>
                  <li>使用PNG透明图片</li>
                  <li>需要额外HTTP请求</li>
                  <li>难以动态修改</li>
                  <li>响应式支持有限</li>
                </ul>
              </div>
              <div class="comparison-card">
                <h3>Clip-Path 优势</h3>
                <ul>
                  <li>纯CSS实现，无需图片</li>
                  <li>完全响应式</li>
                  <li>可动画化</li>
                  <li>高性能硬件加速</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="visual-explanation">
            <div class="original-element">
              <div class="element-content">原始元素</div>
            </div>
            <div class="arrow">➔</div>
            <div class="clipped-element">
              <div class="element-content">裁剪后元素</div>
              <div class="clip-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">基本形状</h2>
        <div class="section-content">
          <div class="shapes-grid">
            <div class="shape-card">
              <div class="shape-demo circle"></div>
              <h3>圆形</h3>
              <div class="code-block">
                <pre>clip-path: circle(50% at center);</pre>
              </div>
              <p>circle(半径 at 圆心位置)</p>
            </div>

            <div class="shape-card">
              <div class="shape-demo ellipse"></div>
              <h3>椭圆形</h3>
              <div class="code-block">
                <pre>clip-path: ellipse(50% 30% at 50% 50%);</pre>
              </div>
              <p>ellipse(水平半径 垂直半径 at 圆心)</p>
            </div>

            <div class="shape-card">
              <div class="shape-demo inset"></div>
              <h3>内切矩形</h3>
              <div class="code-block">
                <pre>clip-path: inset(20% 10% 15% 5%);</pre>
              </div>
              <p>inset(上 右 下 左)</p>
            </div>

            <div class="shape-card">
              <div class="shape-demo polygon"></div>
              <h3>多边形</h3>
              <div class="code-block">
                <pre>
clip-path: polygon(50% 0%, 100% 50%,
                  50% 100%, 0% 50%);</pre
                >
              </div>
              <p>polygon(x1 y1, x2 y2, ...)</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">高级多边形应用</h2>
        <div class="section-content">
          <div class="polygon-controls">
            <div class="control-group">
              <label>多边形点数: {{ polygonPoints }}</label>
              <input type="range" min="3" max="10" v-model="polygonPoints" />
            </div>
            <div class="control-group">
              <label>半径: {{ polygonRadius }}%</label>
              <input type="range" min="20" max="80" v-model="polygonRadius" />
            </div>
            <div class="control-group">
              <label>旋转角度: {{ polygonRotation }}°</label>
              <input type="range" min="0" max="360" v-model="polygonRotation" />
            </div>
          </div>

          <div class="polygon-demo">
            <div class="polygon-visual" :style="polygonStyle">
              <div
                class="point"
                v-for="(point, index) in calculatedPoints"
                :key="index"
                :style="{ left: point.x + '%', top: point.y + '%' }"
              >
                <div class="point-label">{{ index + 1 }}</div>
              </div>
            </div>
            <div class="polygon-code">
              <div class="code-block">
                <pre>clip-path: polygon({{ polygonPath }});</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">实际应用场景</h2>
        <div class="section-content">
          <div class="use-cases">
            <div class="use-case">
              <div class="case-visual">
                <div class="image-mask">
                  <div class="masked-image"></div>
                </div>
              </div>
              <h3>图像遮罩</h3>
              <p>为图片创建非矩形形状</p>
            </div>

            <div class="use-case">
              <div class="case-visual">
                <div class="hover-effect">
                  <div class="effect-box">
                    <div class="effect-content">悬停效果</div>
                  </div>
                </div>
              </div>
              <h3>悬停动画</h3>
              <p>创建平滑的形状过渡效果</p>
            </div>

            <div class="use-case">
              <div class="case-visual">
                <div class="text-clip">
                  <h4 class="clipped-text">创意排版</h4>
                </div>
              </div>
              <h3>文字裁剪</h3>
              <p>为文字添加独特形状</p>
            </div>

            <div class="use-case">
              <div class="case-visual">
                <div class="reveal-animation">
                  <div class="reveal-content">动画效果</div>
                </div>
              </div>
              <h3>动画展示</h3>
              <p>元素出现/消失动画</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">浏览器支持与最佳实践</h2>
        <div class="section-content">
          <div class="browser-support">
            <div class="browser">
              <div class="browser-icon chrome"></div>
              <div class="support">Chrome: 55+</div>
            </div>
            <div class="browser">
              <div class="browser-icon firefox"></div>
              <div class="support">Firefox: 54+</div>
            </div>
            <div class="browser">
              <div class="browser-icon safari"></div>
              <div class="support">Safari: 9.1+</div>
            </div>
            <div class="browser">
              <div class="browser-icon edge"></div>
              <div class="support">Edge: 79+</div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>使用 <code>@supports</code> 提供回退方案</li>
              <li>避免在大型元素上使用复杂路径</li>
              <li>结合 <code>transition</code> 创建平滑动画</li>
              <li>使用工具生成复杂路径</li>
              <li>考虑使用SVG作为更高级的裁剪源</li>
            </ul>
          </div>

          <div class="tools">
            <h3>实用工具</h3>
            <ul>
              <li><a href="#">Clippy - CSS clip-path生成器</a></li>
              <li><a href="#">Bennettfeely's clip-path工具</a></li>
              <li><a href="#">SVG Path编辑器</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">动画与过渡效果</h2>
        <div class="section-content">
          <div class="animation-demo">
            <div class="animation-box" @click="toggleAnimation" :class="{ animated: isAnimated }">
              <div class="animation-content">点击查看动画</div>
            </div>
          </div>

          <div class="animation-code">
            <div class="code-block">
              <pre>
.element {
  clip-path: circle(0% at center);
  transition: clip-path 0.8s ease-in-out;
}

.element.animated {
  clip-path: circle(75% at center);
}</pre
              >
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="footer-logo">CSS Clip-Path 指南</div>
        <div class="footer-links">
          <a href="#" class="footer-link">MDN文档</a>
          <a href="#" class="footer-link">交互式工具</a>
          <a href="#" class="footer-link">示例库</a>
        </div>
        <div class="footer-copyright">© 2023 CSS Clip-Path完全指南 | 现代Web设计技术</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 多边形控制
const polygonPoints = ref(6)
const polygonRadius = ref(40)
const polygonRotation = ref(0)
const isAnimated = ref(false)

// 计算多边形路径
const calculatedPoints = computed(() => {
  const points = []
  const center = 50
  const angleStep = 360 / polygonPoints.value

  for (let i = 0; i < polygonPoints.value; i++) {
    const angle = ((angleStep * i + polygonRotation.value) * Math.PI) / 180
    const x = center + polygonRadius.value * Math.cos(angle)
    const y = center + polygonRadius.value * Math.sin(angle)
    points.push({ x, y })
  }

  return points
})

// 生成多边形路径字符串
const polygonPath = computed(() => {
  return calculatedPoints.value.map((p) => `${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`).join(', ')
})

// 多边形样式
const polygonStyle = computed(() => ({
  clipPath: `polygon(${polygonPath.value})`,
}))

// 切换动画
const toggleAnimation = () => {
  isAnimated.value = !isAnimated.value
}
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@primary-color: #4361ee;
@primary-light: #eef2ff;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-color: #f8fafc;
@dark-color: #1e293b;
@text-color: #334155;
@border-color: #e2e8f0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@transition: all 0.3s ease;
@success-color: #00c853;

.clip-path-guide {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: var(--light-color);
  color: var(--text-color);
  line-height: 1.6;
  min-height: 100vh;
  padding: 0 0 40px;
}

.guide-header {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
  color: white;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.shapes-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;

  .shape {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.5);

    &.circle {
      clip-path: circle(50% at center);
    }

    &.triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    &.polygon {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    &.custom {
      clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
    }
  }
}

.guide-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  background: linear-gradient(90deg, #4f6df5, #3a56e6);
  padding: 18px 30px;
  margin: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
}

.section-content {
  padding: 30px;
}

.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
    line-height: 1.8;

    code {
      background: @primary-light;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  .comparison-card {
    background: @primary-light;
    border-radius: 12px;
    padding: 25px;
    border-left: 4px solid @primary-color;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: @secondary-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

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
}

.visual-explanation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;

  .original-element,
  .clipped-element {
    width: 200px;
    height: 150px;
    background: @primary-color;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .element-content {
      color: white;
      font-weight: 600;
      z-index: 2;
    }
  }

  .clipped-element {
    .clip-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.7);
      clip-path: circle(30% at center);
    }
  }

  .arrow {
    font-size: 30px;
    color: @primary-color;
  }
}

.shapes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.shape-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: @transition;

  &:hover {
    border-color: @primary-color;
    transform: translateY(-5px);
  }

  h3 {
    margin: 15px 0 10px;
    color: @secondary-color;
  }

  p {
    margin: 10px 0 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.shape-demo {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  background: #000;
  transition: @transition;

  &.circle {
    clip-path: circle(50% at center);
    border-radius: 0;
  }

  &.ellipse {
    clip-path: ellipse(50% 30% at 50% 50%);
  }

  &.inset {
    clip-path: inset(20% 10% 15% 5%);
  }

  &.polygon {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
}

.code-block {
  background: #1e293b;
  color: #cbd5e1;
  border-radius: 12px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 15px;
  text-align: left;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.polygon-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  .control-group {
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input {
      width: 100%;
    }
  }
}

.polygon-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.polygon-visual {
  width: 100%;
  height: 300px;
  background: @primary-color;
  position: relative;
  transition: clip-path 0.5s ease;

  .point {
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid @secondary-color;

    .point-label {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      font-weight: bold;
      color: @secondary-color;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.use-case {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: @transition;

  &:hover {
    border-color: @primary-color;
    transform: translateY(-5px);
  }

  h3 {
    margin: 20px 0 10px;
    color: @secondary-color;
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.case-visual {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;

  .image-mask {
    width: 150px;
    height: 150px;
    overflow: hidden;

    .masked-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #4361ee, #4cc9f0);
      clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
    }
  }

  .hover-effect {
    .effect-box {
      width: 120px;
      height: 120px;
      background: @primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: clip-path 0.5s ease;
      clip-path: circle(50% at center);

      &:hover {
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }

      .effect-content {
        color: white;
        font-weight: 500;
      }
    }
  }

  .text-clip {
    .clipped-text {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(45deg, #4361ee, #ff6b6b);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
    }
  }

  .reveal-animation {
    .reveal-content {
      width: 120px;
      height: 120px;
      background: @primary-color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      clip-path: circle(0% at center);
      animation: reveal 3s infinite alternate ease-in-out;
    }
  }
}

@keyframes reveal {
  0% {
    clip-path: circle(0% at center);
  }
  100% {
    clip-path: circle(75% at center);
  }
}

.browser-support {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.browser {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: @card-shadow;

  .browser-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;

    &.chrome {
      background-color: #4285f4;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'/%3E%3Cpath fill='white' d='M12 2C9.85 2 7.7 2.69 6 4.05c1.2.12 2.37.51 3.47 1.17.35.22.68.46 1 .72.38-.1.77-.15 1.18-.15.41 0 .8.05 1.18.15.32-.26.65-.5 1-.72-1.1-.66-2.27-1.05-3.47-1.17C9.7 2.69 7.55 2 5.4 2 2.42 2 0 4.42 0 7.4c0 2.98 2.42 5.4 5.4 5.4.2 0 .4-.02.6-.04.33.6.75 1.14 1.24 1.62.49.48 1.03.9 1.63 1.23-.02.2-.04.4-.04.6 0 2.98 2.42 5.4 5.4 5.4s5.4-2.42 5.4-5.4-2.42-5.4-5.4-5.4c-.2 0-.4.02-.6.04-.33-.6-.75-1.14-1.24-1.62-.49-.48-1.03-.9-1.63-1.23.02-.2.04-.4.04-.6 0-2.98-2.42-5.4-5.4-5.4Z'/%3E%3C/svg%3E");
    }

    &.firefox {
      background-color: #ff7139;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.25 14.51c-.72.95-1.76 1.57-2.96 1.57-1.15 0-2.17-.58-2.79-1.47-.32-.46-.56-1-.7-1.57-.14.57-.38 1.11-.7 1.57-.62.89-1.64 1.47-2.79 1.47-1.2 0-2.24-.62-2.96-1.57.73.32 1.54.51 2.4.51 1.49 0 2.84-.63 3.81-1.64.97 1.01 2.32 1.64 3.81 1.64.86 0 1.67-.19 2.4-.51Zm-8.4-7.35c-.15 0-.29.01-.43.03.15-.6.44-1.14.84-1.59.4-.45.9-.8 1.47-1.02.57-.22 1.19-.31 1.8-.26.61.05 1.2.24 1.73.56.53.32.99.77 1.33 1.32.34.55.56 1.18.63 1.84.07.66-.01 1.32-.24 1.94-.23.62-.59 1.18-1.06 1.63-.47.45-1.03.79-1.64.99-.61.2-1.26.26-1.9.17-.64-.09-1.24-.33-1.76-.69-.52-.36-.94-.84-1.23-1.4-.28-.56-.42-1.18-.4-1.8.02-.62.18-1.23.49-1.77.31-.54.74-1 1.26-1.34.52-.34 1.11-.55 1.73-.61.62-.06 1.24.03 1.81.26.57.23 1.07.58 1.47 1.03.4.45.69.99.84 1.59-.14.02-.28.03-.43.03-1.1 0-2.12-.5-2.82-1.35-.7-.85-1.04-1.98-.93-3.11.11-1.13.69-2.17 1.61-2.85.92-.68 2.08-.94 3.2-.74 1.12.2 2.11.84 2.77 1.77.66.93.94 2.08.78 3.21-.16 1.13-.76 2.16-1.68 2.83-.92.67-2.08.93-3.2.73-1.12-.2-2.11-.84-2.77-1.77-.16-.23-.3-.47-.41-.72-.11.25-.25.49-.41.72-.7.85-1.72 1.35-2.82 1.35Z'/%3E%3C/svg%3E");
    }

    &.safari {
      background-color: #000000;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1.85 15.87-1.35-3.49-3.49-1.35 1.35 3.49 3.49 1.35Zm.64-6.53-1.96-1.96c-.2-.2-.2-.51 0-.71l1.96-1.96c.2-.2.51-.2.71 0l1.96 1.96c.2.2.2.51 0 .71l-1.96 1.96c-.2.2-.51.2-.71 0Z'/%3E%3C/svg%3E");
    }

    &.edge {
      background-color: #0078d7;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.8 13.9c-.6.9-1.5 1.5-2.6 1.5h-6.5c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h6.5c1.1 0 2 .6 2.6 1.5.3.5.5 1.1.5 1.8 0 .7-.2 1.3-.5 1.8.3.5.5 1.1.5 1.8 0 .7-.2 1.3-.5 1.8Zm-8.3-7.9v3h4.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H9.5v-2h5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5Zm6 6.5c0-.3-.2-.5-.5-.5H9.5v2h5.5c.3 0 .5-.2.5-.5v-1Z'/%3E%3C/svg%3E");
    }
  }

  .support {
    font-weight: 500;
  }
}

.best-practices {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid @primary-color;
  margin-bottom: 30px;

  h3 {
    margin-top: 0;
    color: @secondary-color;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.tools {
  background: #f0fdf4;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid @success-color;

  h3 {
    margin-top: 0;
      color: @success-color;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;

      a {
        color: @primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.animation-demo {
  margin-bottom: 30px;

  .animation-box {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: @primary-color;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
    clip-path: circle(0% at center);
    transition: clip-path 0.8s ease-in-out;

    &.animated {
      clip-path: circle(75% at center);
    }

    .animation-content {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
}

.guide-footer {
  margin-top: 60px;
  padding: 40px 20px 20px;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 15px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    .footer-link {
      color: @primary-color;
      text-decoration: none;
      transition: @transition;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .guide-header {
    padding: 40px 15px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .comparison {
    grid-template-columns: 1fr;
  }

  .visual-explanation {
    flex-direction: column;
    gap: 20px;

    .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
