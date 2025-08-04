<template>
  <div class="parallax-container">
    <!-- 标题区域 -->
    <header class="header">
      <h1>CSS 视差滚动技术指南</h1>
      <p>创建深度感与沉浸式用户体验</p>
    </header>

    <!-- 视差效果展示 -->
    <div class="parallax-demo">
      <div class="parallax-layer background" data-speed="0.2"></div>
      <div class="parallax-layer mountains" data-speed="0.4"></div>
      <div class="parallax-layer clouds" data-speed="0.6"></div>
      <div class="parallax-layer foreground" data-speed="0.8"></div>
      <div class="content">
        <h2>视差滚动效果</h2>
        <p>不同图层以不同速度滚动，创造深度感</p>
      </div>
    </div>

    <!-- 实现方法区域 -->
    <div class="methods-section">
      <div class="section-header">
        <div class="icon">🔧</div>
        <h2>视差滚动实现方法</h2>
      </div>

      <div class="methods-grid">
        <!-- 方法 1: background-attachment -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">1</div>
            <h3>background-attachment: fixed</h3>
            <div class="popularity high">最简单</div>
          </div>
          <div class="method-content">
            <p class="method-description">
              使用CSS background-attachment属性固定背景，实现前景滚动背景固定的效果
            </p>

            <div class="code-example">
              <pre><code>.parallax-section {
  background-image: url('background.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.content {
  /* 常规内容样式 */
}</code></pre>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>实现简单，只需几行CSS</li>
                  <li>浏览器兼容性好</li>
                  <li>不需要JavaScript</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>移动端支持有限</li>
                  <li>无法创建多层视差</li>
                  <li>性能不如其他方法</li>
                </ul>
              </div>
            </div>

            <div class="use-case">
              <h4>适用场景</h4>
              <p>简单的单层视差效果，全屏背景展示，桌面端网站</p>
            </div>
          </div>
        </div>

        <!-- 方法 2: transform: translate3d -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">2</div>
            <h3>transform: translate3d()</h3>
            <div class="popularity high">最常用</div>
          </div>
          <div class="method-content">
            <p class="method-description">
              使用CSS transform属性根据滚动位置调整图层位置，利用GPU加速提高性能
            </p>

            <div class="code-example">
              <pre><code>&lt;div class="parallax-container">
  &lt;div class="parallax-layer" data-speed="0.2">&lt;/div>
  &lt;div class="parallax-layer" data-speed="0.5">&lt;/div>
&lt;/div></code></pre>
              <pre><code>.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  will-change: transform;
}

// JavaScript 实现
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.dataset.speed);
    const offset = -scrollY * speed;
    layer.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
});</code></pre>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>高性能（GPU加速）</li>
                  <li>支持多层复杂视差效果</li>
                  <li>移动端友好</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要JavaScript配合</li>
                  <li>实现相对复杂</li>
                  <li>需要处理滚动事件优化</li>
                </ul>
              </div>
            </div>

            <div class="use-case">
              <h4>适用场景</h4>
              <p>复杂的多层视差效果，故事叙述网站，产品展示页面</p>
            </div>
          </div>
        </div>

        <!-- 方法 3: CSS perspective -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">3</div>
            <h3>CSS perspective</h3>
            <div class="popularity medium">3D效果</div>
          </div>
          <div class="method-content">
            <p class="method-description">
              使用CSS 3D变换创建真实的视差效果，通过改变元素在Z轴上的位置实现
            </p>

            <div class="code-example">
              <pre><code>.parallax-scene {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-origin: center;
}

.layer-1 {
  transform: translateZ(-1px) scale(2);
}

.layer-2 {
  transform: translateZ(-2px) scale(3);
}

.layer-3 {
  transform: translateZ(-3px) scale(4);
}</code></pre>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>纯CSS解决方案</li>
                  <li>真实的3D效果</li>
                  <li>高性能</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>实现复杂</li>
                  <li>浏览器兼容性问题</li>
                  <li>需要精确计算缩放比例</li>
                </ul>
              </div>
            </div>

            <div class="use-case">
              <h4>适用场景</h4>
              <p>3D视差效果，高级视觉展示，现代浏览器支持的项目</p>
            </div>
          </div>
        </div>

        <!-- 方法 4: CSS scroll-snap -->
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">4</div>
            <h3>CSS scroll-snap</h3>
            <div class="popularity medium">现代方法</div>
          </div>
          <div class="method-content">
            <p class="method-description">结合CSS scroll-snap和视差效果创建分屏滚动体验</p>

            <div class="code-example">
              <pre><code>.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

// JavaScript
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    const rect = section.getBoundingClientRect();
    const speed = 0.3;

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.scrollY - section.offsetTop) * speed;
      bg.style.transform = `translateY(${offset}px)`;
    }
  });
});</code></pre>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>创建分屏滚动体验</li>
                  <li>现代且用户友好</li>
                  <li>结合了两种流行技术</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要JavaScript配合</li>
                  <li>scroll-snap兼容性有限</li>
                  <li>实现复杂度较高</li>
                </ul>
              </div>
            </div>

            <div class="use-case">
              <h4>适用场景</h4>
              <p>全屏滚动网站，产品展示，作品集网站</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <div class="section-header">
        <div class="icon">💡</div>
        <h2>视差滚动最佳实践</h2>
      </div>

      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">⚡</div>
          <h3>性能优化</h3>
          <p>使用 will-change: transform 和 transform: translate3d() 触发GPU加速</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📱</div>
          <h3>移动端适配</h3>
          <p>在移动设备上禁用或简化视差效果，减少性能消耗</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🎚️</div>
          <h3>速度控制</h3>
          <p>保持视差速度在0.1-0.8之间，避免过快或过慢</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🚫</div>
          <h3>避免过度使用</h3>
          <p>只在关键区域使用视差效果，避免整个页面使用</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🧪</div>
          <h3>测试兼容性</h3>
          <p>在不同浏览器和设备上测试视差效果</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🛑</div>
          <h3>提供关闭选项</h3>
          <p>为晕动症用户提供关闭视差效果的选项</p>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="use-cases">
      <div class="section-header">
        <div class="icon">🌟</div>
        <h2>视差滚动应用场景</h2>
      </div>

      <div class="cases-grid">
        <div class="case-card">
          <div class="case-icon">🖼️</div>
          <h3>产品展示页面</h3>
          <p>通过视差效果展示产品不同角度和细节</p>
        </div>
        <div class="case-card">
          <div class="case-icon">📖</div>
          <h3>故事叙述网站</h3>
          <p>随着滚动讲述故事，增强用户参与感</p>
        </div>
        <div class="case-card">
          <div class="case-icon">🎮</div>
          <h3>游戏宣传页面</h3>
          <p>创建沉浸式游戏世界预览</p>
        </div>
        <div class="case-card">
          <div class="case-icon">🌐</div>
          <h3>旅游网站</h3>
          <p>展示目的地风景，创造深度体验</p>
        </div>
        <div class="case-card">
          <div class="case-icon">🎨</div>
          <h3>创意作品集</h3>
          <p>突出创意工作，展示设计细节</p>
        </div>
        <div class="case-card">
          <div class="case-icon">📱</div>
          <h3>应用介绍页面</h3>
          <p>动态展示应用界面和功能</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>CSS 视差滚动技术指南 | 创建引人入胜的网页体验</p>
      <p>© 2023 现代Web设计技术</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// 视差滚动效果实现
onMounted(() => {
  const parallaxDemo = document.querySelector('.parallax-demo')

  const handleScroll = () => {
    if (!parallaxDemo) return

    const scrollY = window.scrollY
    const layers = parallaxDemo.querySelectorAll('.parallax-layer')

    layers.forEach((layer: Element) => {
      const htmlLayer = layer as HTMLElement
      const speed = parseFloat(htmlLayer.dataset.speed || '0.5')
      const offset = -scrollY * speed
      htmlLayer.style.transform = `translate3d(0, ${offset}px, 0)`
    })
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@success-color: #27ae60;
@warning-color: #e74c3c;
@header-gradient: linear-gradient(135deg, #6a11cb, #2575fc);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.parallax-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
  overflow-x: hidden;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 60px 20px;
  background: @header-gradient;
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

.parallax-demo {
  position: relative;
  height: 70vh;
  margin: 40px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  .parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .background {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
  }

  .mountains {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><path fill="%23486b8a" d="M0,400 L0,200 Q300,100 600,200 T1200,300 L1200,400 Z"/></svg>')
      bottom center;
    background-size: 120% auto;
    background-repeat: no-repeat;
  }

  .clouds {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200"><path fill="%23ffffff" opacity="0.7" d="M0,150 Q150,100 300,130 T600,110 T900,140 T1200,100 L1200,200 L0,200 Z"/></svg>')
      top center;
    background-size: 120% auto;
    background-repeat: repeat-x;
  }

  .foreground {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><path fill="%23398a4c" d="M0,300 L0,200 Q400,250 600,180 T1200,220 L1200,300 Z"/></svg>')
      bottom center;
    background-size: 120% auto;
    background-repeat: no-repeat;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 10;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }
}

.methods-section,
.best-practices,
.use-cases {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, @primary-color, #8e44ad);
    color: white;
    border-radius: 50%;
  }

  h2 {
    font-size: 1.9rem;
    color: @text-color;
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.method-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
}

.method-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(52, 152, 219, 0.05);
  border-bottom: 1px solid @border-color;

  .method-icon {
    background: @primary-color;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 15px;
    flex-shrink: 0;
  }

  h3 {
    font-size: 1.5rem;
    color: @text-color;
    flex: 1;
  }
}

.popularity {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;

  &.high {
    background: lighten(@success-color, 40%);
    color: darken(@success-color, 20%);
  }

  &.medium {
    background: lighten(#f39c12, 40%);
    color: darken(#f39c12, 20%);
  }
}

.method-content {
  padding: 20px;

  .method-description {
    margin-bottom: 20px;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  padding: 15px;
  border-radius: 8px;

  h4 {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 8px 0;
      padding-left: 20px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 5px;
        top: 8px;
        color: @primary-color;
      }
    }
  }
}

.pros {
  background: rgba(39, 174, 96, 0.08);

  h4 {
    color: darken(@success-color, 10%);

    &::before {
      background: @success-color;
    }
  }
}

.cons {
  background: rgba(231, 76, 60, 0.08);

  h4 {
    color: darken(@warning-color, 10%);

    &::before {
      background: @warning-color;
    }
  }
}

.use-case {
  background: rgba(52, 152, 219, 0.08);
  border-radius: 8px;
  padding: 15px;

  h4 {
    margin-bottom: 8px;
    color: @primary-color;
  }

  p {
    margin: 0;
    font-weight: 500;
  }
}

.practices-grid,
.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.practice-card,
.case-card {
  background: white;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }

  .practice-icon,
  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  p {
    color: #7f8c8d;
    font-size: 1rem;
    line-height: 1.6;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: #7f8c8d;
  font-size: 1rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .parallax-demo {
    height: 50vh;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }
}
</style>
