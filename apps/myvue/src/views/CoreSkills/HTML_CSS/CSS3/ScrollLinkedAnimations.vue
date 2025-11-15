<template>
  <div class="scroll-animations-guide">
    <div class="scroll-box"></div>
    <header class="guide-header">
      <h1>CSS Scroll-Linked Animations</h1>
      <p>创建基于滚动位置的精美动画效果</p>
      <div class="scroll-indicator">
        <div class="scroll-progress"></div>
      </div>
    </header>

    <main class="guide-content">
      <section class="section">
        <h2 class="section-title">什么是滚动链接动画？</h2>
        <div class="section-content">
          <div class="definition">
            <p>
              CSS Scroll-Linked Animations
              是一种现代CSS技术，允许开发者创建基于滚动位置触发的动画效果。不同于传统动画，这些动画直接与用户的滚动行为相关联，提供了更加沉浸式的用户体验。
            </p>

            <div class="comparison">
              <div class="comparison-card">
                <h3>传统滚动动画</h3>
                <ul>
                  <li>依赖JavaScript监听滚动事件</li>
                  <li>需要复杂的位置计算</li>
                  <li>性能开销较大</li>
                  <li>代码维护困难</li>
                </ul>
              </div>
              <div class="comparison-card">
                <h3>CSS滚动链接动画</h3>
                <ul>
                  <li>纯CSS实现，无需JavaScript</li>
                  <li>硬件加速，性能优异</li>
                  <li>简洁的API和声明式语法</li>
                  <li>与浏览器渲染引擎深度集成</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="animation-types">
            <h3>主要动画类型</h3>
            <div class="types-grid">
              <div class="type-card">
                <div class="type-icon">📏</div>
                <h4>基于滚动位置</h4>
                <p>元素动画与滚动位置直接关联</p>
              </div>
              <div class="type-card">
                <div class="type-icon">🎯</div>
                <h4>基于元素位置</h4>
                <p>当元素进入/离开视口时触发</p>
              </div>
              <div class="type-card">
                <div class="type-icon">🔄</div>
                <h4>视口进度</h4>
                <p>动画与元素在视口中的可见比例关联</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">核心属性与API</h2>
        <div class="section-content">
          <div class="properties-table">
            <table>
              <thead>
                <tr>
                  <th>属性</th>
                  <th>描述</th>
                  <th>值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>animation-timeline</code></td>
                  <td>指定用于控制动画的时间轴</td>
                  <td><code>scroll()</code>, <code>view()</code>, <code>auto</code></td>
                </tr>
                <tr>
                  <td><code>scroll-timeline</code></td>
                  <td>定义基于滚动的时间轴</td>
                  <td><code>name</code>, <code>axis</code>, <code>scroller</code></td>
                </tr>
                <tr>
                  <td><code>view-timeline</code></td>
                  <td>定义基于元素视口位置的时间轴</td>
                  <td><code>name</code>, <code>axis</code>, <code>inset</code></td>
                </tr>
                <tr>
                  <td><code>timeline-scope</code></td>
                  <td>设置时间轴的命名范围</td>
                  <td>时间轴名称</td>
                </tr>
                <tr>
                  <td><code>animation-range</code></td>
                  <td>定义动画在时间轴上的作用范围</td>
                  <td>
                    <code>cover</code>, <code>contain</code>, <code>entry</code>, <code>exit</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="property-details">
            <div class="property">
              <h3><code>scroll()</code> 函数</h3>
              <p>创建基于滚动位置的动画时间轴</p>
              <div class="code-block">
                <pre>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fade-in linear;
  animation-timeline: scroll(root block); /* 根滚动容器，垂直方向 */
}</pre
                >
              </div>
              <h3>接受两个参数：scroller和axis</h3>
              <p>scroller: 指定动画的滚动容器，可以是root、nearest或者self</p>
              <p>root: 指定动画的滚动容器为根元素</p>
              <p>nearest: 指定动画的滚动容器为最近的父元素(默认值)</p>
              <p>self: 指定动画的滚动容器为自身</p>
              <p>取名: 指定动画的滚动容器为取名</p>
              <p>axis: 指定动画的轴向，可以是block或inline或者x/y或者both</p>
              <div class="code-block">
                取名
                <pre><code>.father {
scroll-timeline-axis: block;
scroll-timeline-name: --myTimeline;
scroll-timeline: --myTimeline;//简写
}
使用时：
.element {
  animation: fade-in linear;
  animation-timeline: --myTimeline;
}
</code>
                  </pre>
              </div>
            </div>

            <div class="property">
              <h3><code>view()</code> 函数</h3>
              <p>创建基于元素在视口中可见性的动画</p>
              <div class="code-block">
                <pre>
@keyframes reveal {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.element {
  animation: reveal linear;
  animation-timeline: view(block); /* 垂直方向 */
  animation-range: entry; /* 元素进入视口时 */
}</pre
                >
              </div>
              <div>
                <p>接受两个个参数： inset和axis</p>
                <p>inset: 指定动画的视口范围，可以是0 100%或者0 100px或者0 100vh</p>
                <p>两个值时，第一个值是开始位置，第二个值是结束位置</p>
                <p>axis: 指定动画的轴向，可以是block或inline或者x/y或者both</p>
                <p>默认是block</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">使用示例</h2>
        <div class="section-content">
          <div class="example-container">
            <div class="example-demo">
              <div class="scroll-demo">
                <div class="progress-bar"></div>
                <div
                  class="demo-section"
                  v-for="n in 6"
                  :key="n"
                  :class="{ 'animated-section': n > 1 }"
                >
                  <div class="section-number">Section {{ n }}</div>
                  <div v-if="n > 1" class="animation-box"></div>
                </div>
              </div>
            </div>

            <div class="example-code">
              <div class="code-block">
                <pre>
/* 滚动进度动画 */
.progress-bar {
  height: 5px;
  background: #4361ee;
  position: fixed;
  top: 0;
  left: 0;
  animation: grow-progress linear;
  animation-timeline: scroll(root);
}

@keyframes grow-progress {
  from { width: 0%; }
  to { width: 100%; }
}

/* 元素进入视口动画 */
.animated-element {
  opacity: 0;
  transform: translateY(50px);
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry;
}

@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}</pre
                >
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
              <div class="case-icon">📊</div>
              <h3>进度指示器</h3>
              <p>显示页面滚动进度</p>
            </div>
            <div class="use-case">
              <div class="case-icon">🖼️</div>
              <h3>视差效果</h3>
              <p>创建深度感知的滚动效果</p>
            </div>
            <div class="use-case">
              <div class="case-icon">✨</div>
              <h3>元素揭示</h3>
              <p>内容滚动进入时动画展示</p>
            </div>
            <div class="use-case">
              <div class="case-icon">📝</div>
              <h3>阅读进度</h3>
              <p>高亮当前阅读部分</p>
            </div>
          </div>

          <div class="case-study">
            <h3>最佳实践案例</h3>
            <div class="case">
              <h4>新闻网站文章页</h4>
              <p><strong>实现效果:</strong></p>
              <ul>
                <li>标题随滚动逐渐固定到顶部</li>
                <li>图片滚动到视口时淡入放大</li>
                <li>侧边栏进度指示器</li>
                <li>章节标题进入视口时高亮</li>
              </ul>
              <p><strong>结果:</strong> 用户参与度提高35%，平均阅读时间增加28%</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">浏览器支持与兼容性</h2>
        <div class="section-content">
          <div class="browser-support">
            <div class="browser">
              <div class="browser-icon chrome"></div>
              <div class="support">Chrome: 115+</div>
            </div>
            <div class="browser">
              <div class="browser-icon edge"></div>
              <div class="support">Edge: 115+</div>
            </div>
            <div class="browser">
              <div class="browser-icon firefox"></div>
              <div class="support">Firefox: 实验性支持</div>
            </div>
            <div class="browser">
              <div class="browser-icon safari"></div>
              <div class="support">Safari: 17+</div>
            </div>
          </div>

          <div class="polyfill-section">
            <h3>渐进增强策略</h3>
            <div class="code-block">
              <pre>
@supports (animation-timeline: scroll()) {
  /* 使用原生滚动动画 */
  .element {
    animation: fade-in linear;
    animation-timeline: scroll();
  }
}

@supports not (animation-timeline: scroll()) {
  /* 降级方案：使用JavaScript实现 */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const element = document.querySelector('.element');
    // 手动计算和应用动画
  });
}</pre
              >
            </div>
          </div>

          <div class="performance">
            <h3>性能优化建议</h3>
            <ul>
              <li>优先使用 <code>transform</code> 和 <code>opacity</code> 属性</li>
              <li>避免在滚动动画中修改布局属性</li>
              <li>使用 <code>will-change</code> 提示浏览器优化</li>
              <li>限制同时活动的滚动动画数量</li>
              <li>使用 <code>@media (prefers-reduced-motion)</code> 提供可访问性选项</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">完整示例：滚动故事叙述</h2>
        <div class="section-content">
          <div class="story-container">
            <div class="story-scroll">
              <div class="story-section" v-for="(story, index) in stories" :key="index">
                <div class="story-content">
                  <h3>{{ story.title }}</h3>
                  <p>{{ story.description }}</p>
                </div>
                <div class="story-visual" :style="{ backgroundColor: story.color }"></div>
              </div>
            </div>
          </div>

          <div class="story-code">
            <div class="code-block">
              <pre>
/* 故事部分样式 */
.story-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* 内容动画 */
.story-content {
  animation: slide-in linear;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 视觉元素动画 */
.story-visual {
  animation: scale-up linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
}

@keyframes scale-up {
  from {
    opacity: 0.3;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}</pre
              >
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="guide-footer">
      <div class="footer-content">
        <div class="footer-logo">CSS Scroll-Linked Animations</div>
        <div class="footer-links">
          <a href="#" class="footer-link">MDN文档</a>
          <a href="#" class="footer-link">示例库</a>
          <a href="#" class="footer-link">CanIUse</a>
        </div>
        <div class="footer-copyright"> CSS滚动动画指南 | 现代Web动画技术</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 故事叙述数据
const stories = ref([
  {
    title: '旅程开始',
    description: '随着用户向下滚动，故事的第一章逐渐展现，介绍背景和主要角色。',
    color: '#ff6b6b',
  },
  {
    title: '挑战出现',
    description: '主角面临第一个重大挑战，动画效果增强紧张氛围。',
    color: '#4facfe',
  },
  {
    title: '转折点',
    description: '故事的关键转折点，视觉元素变化反映剧情发展。',
    color: '#42e695',
  },
  {
    title: '高潮时刻',
    description: '故事达到高潮，全屏动画创造沉浸式体验。',
    color: '#ffda79',
  },
  {
    title: '圆满结局',
    description: '故事结束，元素和谐展示最终场景。',
    color: '#9b5de5',
  },
])

// 初始化滚动效果
onMounted(() => {
  // 添加滚动监听器用于顶部进度条（仅用于演示）
  const updateProgressBar = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const progress = (scrollPosition / (documentHeight - windowHeight)) * 100

    const progressBar = document.querySelector('.scroll-progress')
    if (progressBar) {
      ;(progressBar as HTMLElement).style.width = `${progress}%`
    }
  }

  window.addEventListener('scroll', updateProgressBar)
  updateProgressBar()
})
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

.scroll-animations-guide {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: var(--light-color);
  color: var(--text-color);
  line-height: 1.6;
  padding: 0 0 40px;
  scroll-timeline: --scale-progress;
  //height: auto;
}

.scroll-box {
  width: 50px;
  height: 50px;
  position: sticky;
  background-color: #7dfc8e;
  top: 0;
  left: 0;
  border: 1px solid var(--border-color);
  // transform: translateY(100%);
  border-radius: 12px;
  z-index: 1000;
  animation: scroll-animation2 linear;
  animation-timeline: scroll(nearest block);
  offset-path: path(
    "M.5 122.7s24.7-275 276.9 0c327.1 356.7 266.1-330.3 548-33.3 256.9 270.7 271.1 0 271.1 0"
  );
  //animation-range: 0 100%;
}

@keyframes scroll-animation2 {
  from {
    offset-distance: 0;
  }
  to {
    offset-distance: 100%;
  }
}

.guide-header {
  text-align: center;
  padding: 60px 20px 80px;
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

.scroll-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 100%;
  height: 6px;
  width: 6px;
  background: rgba(255, 255, 255, 0.2);

  .scroll-progress {
    height: 100%;
    width: 0%;
    background: white;
    transition: var(--transition);
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

.animation-types {
  margin-top: 40px;

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.type-card {
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

  .type-icon {
    font-size: 40px;
    margin-bottom: 15px;
  }

  h4 {
    margin: 0 0 10px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
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

    th,
    td {
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

.scroll-demo {
  height: 400px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  position: relative;
  scroll-timeline: --scale-progress;

  .progress-bar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: #000;
    z-index: 1000;
    animation: scroll-animation linear;
    transform-origin: 0 50%;
    animation-timeline: scroll(nearest block);
  }

  @keyframes scroll-animation {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  .demo-section {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }

    .section-number {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--secondary-color);
    }
  }

  .animated-section {
    .animation-box {
      width: 100px;
      height: 100px;
      background: #000;
      border-radius: 12px;
      margin-top: 20px;
      animation:
        scale-up linear,
        rotate linear;
      animation-timeline: view();
      animation-range: entry 10% cover 30%;

      /* 在现代浏览器中应用滚动动画 */
      // @supports (animation-timeline: view()) {
      //   animation:
      //     scale-up linear,
      //     rotate linear;
      //   animation-timeline: view();
      //   animation-range: entry 10% cover 30%;
      // }
    }
  }
}

@keyframes scale-up {
  from {
    opacity: 0.3;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.use-case {
  text-align: center;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .case-icon {
    font-size: 40px;
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  h3 {
    margin: 0 0 10px;
    color: var(--secondary-color);
  }

  p {
    margin: 0;
    color: var(--text-color);
    font-size: 0.95rem;
  }
}

.case-study {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--primary-color);

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }

  .case {
    h4 {
      margin-top: 0;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 20px;
      margin-bottom: 15px;

      li {
        margin-bottom: 8px;
      }
    }
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

.polyfill-section {
  margin-bottom: 30px;

  h3 {
    margin-top: 0;
    color: var(--secondary-color);
    margin-bottom: 15px;
  }
}

.performance {
  background: #f0fdf4;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid var(--success-color);

  h3 {
    margin-top: 0;
    color: var(--success-color);
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.story-container {
  margin-bottom: 30px;
}

.story-scroll {
  height: 500px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 12px;

  .story-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 40px;

    .story-content {
      flex: 1;
      max-width: 500px;

      h3 {
        font-size: 2rem;
        color: var(--secondary-color);
        margin-bottom: 20px;
      }
    }

    .story-visual {
      width: 300px;
      height: 300px;
      border-radius: 16px;

      /* 在现代浏览器中应用滚动动画 */
      @supports (animation-timeline: view()) {
        animation:
          scale-up linear,
          fade-in linear;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.story-code {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
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
    padding: 40px 15px 60px;

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

  .property-details {
    grid-template-columns: 1fr;
  }

  .example-container {
    grid-template-columns: 1fr;
  }

  .story-section {
    flex-direction: column;
    text-align: center;

    .story-visual {
      margin-top: 40px;
    }
  }
}
</style>
