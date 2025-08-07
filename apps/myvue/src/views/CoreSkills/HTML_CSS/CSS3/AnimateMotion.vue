<template>
  <div class="path-animation-guide">
    <header class="guide-header">
      <h1>CSS路径动画基本指南</h1>
      <p>让元素沿着任意路径运动的现代CSS技术</p>
      <div class="header-animation">
        <svg viewBox="0 0 400 100" class="motion-path">
          <path d="M20,50 Q100,10 180,50 T340,50 500,50" fill="none" stroke="#000" stroke-width="2" />
          <circle r="8" fill="#4361ee" class="moving-dot" />
        </svg>
      </div>
    </header>

    <main class="guide-content">
      <section class="section">
        <h2 class="section-title">什么是路径动画？</h2>
        <div class="section-content">
          <div class="definition">
            <p>CSS路径动画是一种让元素沿着预定义路径（直线、曲线或复杂形状）移动的技术。它使用现代CSS属性如 <code>offset-path</code>、<code>offset-distance</code> 和 <code>offset-rotate</code> 实现复杂的运动轨迹。</p>

            <div class="comparison">
              <div class="comparison-card">
                <h3>传统位置动画</h3>
                <ul>
                  <li>只能沿直线移动</li>
                  <li>需要复杂的关键帧</li>
                  <li>难以实现曲线运动</li>
                  <li>代码维护困难</li>
                </ul>
              </div>
              <div class="comparison-card">
                <h3>CSS路径动画</h3>
                <ul>
                  <li>沿任意路径运动</li>
                  <li>简洁的CSS实现</li>
                  <li>支持复杂轨迹</li>
                  <li>高性能硬件加速</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心作用与优势</h2>
        <div class="section-content">
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🎯</div>
              <h3>复杂运动轨迹</h3>
              <p>实现曲线、圆形等复杂运动路径</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h3>高性能</h3>
              <p>GPU加速，流畅的60fps动画</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🔄</div>
              <h3>响应式设计</h3>
              <p>自动适应不同屏幕尺寸</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🎨</div>
              <h3>创意表达</h3>
              <p>增强UI动效和视觉吸引力</p>
            </div>
          </div>

          <div class="use-cases">
            <h3>典型应用场景</h3>
            <ul>
              <li>产品引导动画</li>
              <li>游戏角色移动</li>
              <li>数据可视化</li>
              <li>加载动画</li>
              <li>交互反馈效果</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心属性与参数</h2>
        <div class="section-content">
          <div class="properties-table">
            <table>
              <thead>
                <tr>
                  <th>属性</th>
                  <th>描述</th>
                  <th>可选值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>offset-path</code></td>
                  <td>定义元素运动的路径</td>
                  <td>path(), url(), circle(), ellipse()</td>
                </tr>
                <tr>
                  <td><code>offset-distance</code></td>
                  <td>设置元素在路径上的位置</td>
                  <td>0%-100%, 长度值</td>
                </tr>
                <tr>
                  <td><code>offset-rotate</code></td>
                  <td>控制元素沿路径的旋转</td>
                  <td>auto, reverse, 角度值</td>
                </tr>
                <tr>
                  <td><code>offset-anchor</code></td>
                  <td>设置路径上的锚点</td>
                  <td>center, top, left, 坐标值</td>
                </tr>
                <tr>
                  <td><code>offset-position</code></td>
                  <td>路径的起始位置</td>
                  <td>auto, top, left, 坐标值</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="property-details">
            <div class="property">
              <h3><code>offset-path</code> 路径定义</h3>
              <div class="code-block">
                <pre>/* 使用SVG路径 */
.element {
  offset-path: path('M20,20 C100,100 180,20 260,100');
}

/* 使用基本形状 */
.element {
  offset-path: circle(50% at center);
}

/* 引用SVG中的路径 */
.element {
  offset-path: url(#motionPath);
}</pre>
              </div>
            </div>

            <div class="property">
              <h3><code>offset-rotate</code> 旋转控制</h3>
              <div class="code-block">
                <pre>/* 自动旋转（默认） */
offset-rotate: auto;

/* 反向旋转 */
offset-rotate: reverse;

/* 固定角度 */
offset-rotate: 45deg;

/* 组合使用 */
offset-rotate: auto 90deg; /* 路径方向 + 90度偏移 */</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">基本使用方法</h2>
        <div class="section-content">
          <div class="example-container">
            <div class="example-demo">
              <div class="path-container">
                <svg viewBox="0 0 400 200" class="path-visualization">
                  <path d="M20,100 C100,20 180,180 260,100" fill="none" stroke="#e2e8f0" stroke-width="2" />
                </svg>
                <div class="moving-element" :style="elementStyle"></div>
              </div>

              <div class="controls">
                <button @click="toggleAnimation" class="control-button">
                  {{ isAnimating ? '暂停动画' : '播放动画' }}
                </button>
                <button @click="resetAnimation" class="control-button">重置</button>

                <div class="slider-control">
                  <label>路径位置: {{ offsetDistance }}%</label>
                  <input type="range" min="0" max="100" v-model="offsetDistance">
                </div>

                <div class="slider-control">
                  <label>旋转角度: {{ offsetRotate }}</label>
                  <input type="range" min="0" max="360" v-model="offsetRotate">
                </div>
              </div>
            </div>

            <div class="example-code">
              <div class="code-block">
                <pre>&lt;!-- HTML --&gt;
&lt;div class="moving-element"&gt;&lt;/div&gt;

/* CSS */
.moving-element {
  width: 40px;
  height: 40px;
  background: #4361ee;
  border-radius: 50%;

  /* 定义运动路径 */
  offset-path: path('M20,100 C100,20 180,180 260,100');

  /* 动画设置 */
  animation: moveAlongPath 3s infinite alternate ease-in-out;
}

@keyframes moveAlongPath {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">进阶路径动画</h2>
        <div class="section-content">
          <div class="advanced-demos">
            <div class="demo-card">
              <h3>圆形路径</h3>
              <div class="demo-visual">
                <div class="circle-path">
                  <div class="circle-element"></div>
                </div>
              </div>
              <div class="demo-code">
                <pre>.element {
  offset-path: circle(100px at center);
  animation: circle 5s infinite linear;
}

@keyframes circle {
  to { offset-distance: 100%; }
}</pre>
              </div>
            </div>

            <div class="demo-card">
              <h3>SVG路径引用</h3>
              <div class="demo-visual">
                <svg viewBox="0 0 400 200" class="svg-demo">
                  <path id="demoPath" d="M50,150 Q150,50 250,150 T450,150" fill="none" stroke="#e2e8f0" stroke-width="2" />
                  <circle r="10" fill="#4361ee" class="svg-element" />
                </svg>
              </div>
              <div class="demo-code">
                <pre>&lt;svg viewBox="0 0 500 200"&gt;
  &lt;path id="motionPath" d="M50,150 Q150,50 250,150 T450,150"
        fill="none" stroke="#e2e8f0"/&gt;
  &lt;circle r="10" fill="#4361ee"
          style="offset-path: url(#motionPath);"/&gt;
&lt;/svg&gt;</pre>
              </div>
            </div>

            <div class="demo-card">
              <h3>组合动画</h3>
              <div class="demo-visual">
                <div class="combined-animation">
                  <div class="animated-box"></div>
                </div>
              </div>
              <div class="demo-code">
                <pre>.box {
  offset-path: path('M20,20 C100,100 180,20 260,100');
  animation:
    move 4s infinite ease-in-out,
    scale 2s infinite alternate;
}

@keyframes move {
  to { offset-distance: 100%; }
}

@keyframes scale {
  50% { transform: scale(1.5); }
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">浏览器支持与注意事项</h2>
        <div class="section-content">
          <div class="browser-support">
            <div class="browser">
              <div class="browser-icon chrome"></div>
              <div class="support">Chrome: 78+</div>
            </div>
            <div class="browser">
              <div class="browser-icon firefox"></div>
              <div class="support">Firefox: 72+</div>
            </div>
            <div class="browser">
              <div class="browser-icon safari"></div>
              <div class="support">Safari: 14+</div>
            </div>
            <div class="browser">
              <div class="browser-icon edge"></div>
              <div class="support">Edge: 79+</div>
            </div>
          </div>

          <div class="considerations">
            <h3>重要注意事项</h3>
            <ul>
              <li>使用前缀确保兼容性：<code>-webkit-offset-path</code></li>
              <li>路径坐标系与元素位置相关</li>
              <li>复杂路径可能影响性能，需测试优化</li>
              <li>移动设备上减少动画元素数量</li>
              <li>提供降级方案（使用JavaScript）</li>
            </ul>
          </div>

          <div class="polyfill">
            <h3>兼容性解决方案</h3>
            <div class="code-block">
              <pre>// 使用path-polyfill库
import 'path-polyfill';

// 检测支持情况
if (!CSS.supports('offset-path', 'path("")')) {
  // 使用JavaScript替代方案
  implementPathAnimationWithJS();
}</pre>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="footer-logo">CSS Path Animations</div>
        <div class="footer-links">
          <a href="#" class="footer-link">MDN文档</a>
          <a href="#" class="footer-link">示例库</a>
          <a href="#" class="footer-link">Polyfill</a>
        </div>
        <div class="footer-copyright">
          © 2023 CSS路径动画基本指南 | 现代CSS动画技术
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const isAnimating = ref(true);
const offsetDistance = ref(50);
const offsetRotate = ref(0);
let animationInterval: number;

const elementStyle = computed(() => ({
  'offset-distance': `${offsetDistance.value}%`,
  'offset-rotate': `${offsetRotate.value}deg`,
  'animation-play-state': isAnimating.value ? 'running' : 'paused'
}));

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
};

const resetAnimation = () => {
  offsetDistance.value = 0;
  offsetRotate.value = 0;
};

const startAutoAnimation = () => {
  animationInterval = window.setInterval(() => {
    if (!isAnimating.value) return;

    offsetDistance.value = (offsetDistance.value + 1) % 100;

    if (offsetDistance.value === 0) {
      offsetRotate.value = (offsetRotate.value + 45) % 360;
    }
  }, 50);
};

onMounted(() => {
  startAutoAnimation();

  // 初始化SVG动画
  const dot = document.querySelector('.moving-dot');
  if (dot) {
    dot.classList.add('animate');
  }
});

onBeforeUnmount(() => {
  clearInterval(animationInterval);
});
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --light-color: #f8fafc;
  --dark-color: #1e293b;
  --text-color: #334155;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

.path-animation-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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

.header-animation {
  max-width: 1600px;
  margin: 40px auto 0;
  padding: 20px;

  .motion-path {
    width: 100%;
    height: 120px;

    .moving-dot {
      fill: white;
      offset-path: path('M20,50 Q100,10 180,50 T340,50');
      animation: moveDot 4s infinite ease-in-out;

      &.animate {
        animation: moveDot 4s infinite ease-in-out;
      }
    }
  }
}

@keyframes moveDot {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
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
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: var(--transition);

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
      background: var(--primary-light);
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
    background: var(--primary-light);
    border-radius: 12px;
    padding: 25px;
    border-left: 4px solid var(--primary-color);

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: var(--secondary-color);
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
          color: var(--primary-color);
          font-weight: bold;
        }
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 0 0 15px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.use-cases {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 0;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
}

.properties-table {
  overflow-x: auto;
  margin-bottom: 30px;
  box-shadow: var(--card-shadow);
  border-radius: 12px;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      background: var(--primary-light);
      color: var(--secondary-color);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    tr:hover {
      background: #f0f7ff;
    }

    code {
      background: rgba(67, 97, 238, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.property-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.property {
  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
  }
}

.code-block {
  background: #1e293b;
  color: #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.example-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.example-demo {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  border-top: 4px solid var(--accent-color);
}

.path-container {
  position: relative;
  height: 200px;
  margin-bottom: 20px;

  .path-visualization {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .moving-element {
    width: 40px;
    height: 40px;
    background: #000;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    offset-path: path('M20,100 C100,20 180,180 260,100');
    animation: moveAlongPath 3s infinite alternate ease-in-out;
  }
}

@keyframes moveAlongPath {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.control-button {
  padding: 12px;
  background: var(--primary-color);
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }
}

.slider-control {
  grid-column: span 2;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input {
    width: 100%;
  }
}

.advanced-demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
  }
}

.demo-visual {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

.circle-path {
  width: 150px;
  height: 150px;
  border: 2px dashed var(--border-color);
  border-radius: 50%;
  position: relative;

  .circle-element {
    width: 25px;
    height: 25px;
    background: #000;
    border-radius: 50%;
    offset-path: circle(75px at center);
    animation: circle 5s infinite linear;
  }
}

@keyframes circle {
  to {
    offset-distance: 100%;
  }
}

.svg-demo {
  width: 100%;
  height: 150px;

  .svg-element {
    offset-path: url(#demoPath);
    animation: movePath 4s infinite ease-in-out;
  }
}

@keyframes movePath {
  to { offset-distance: 100%; }
}

.combined-animation {
  width: 100%;
  height: 150px;
  position: relative;

  .animated-box {
    width: 30px;
    height: 30px;
    background: #000;
    border-radius: 6px;
    offset-path: path('M20,75 C100,20 180,130 260,75');
    animation:
      move 4s infinite ease-in-out,
      scale 2s infinite alternate;
  }
}

@keyframes move {
  to { offset-distance: 100%; }
}

@keyframes scale {
  50% { transform: scale(1.5); }
}

.demo-code {
  background: #f8fafc;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
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
  box-shadow: var(--card-shadow);

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

.considerations {
  background: #fff0f0;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--error-color);
  margin-bottom: 30px;

  h3 {
    margin-top: 0;
    color: var(--error-color);
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.polyfill {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
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
    color: var(--primary-color);
    margin-bottom: 15px;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;

    .footer-link {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition);

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
}
</style>
