<template>
  <div class="react-animation-guide">
    <header class="animated-header">
      <div class="header-content">
        <h1>React 动画方案基本指南</h1>
        <p class="subtitle">让您的应用动起来的专业解决方案</p>
        <div class="animation-showcase">
          <div class="demo-box fade">淡入淡出</div>
          <div class="demo-box slide">滑动效果</div>
          <div class="demo-box bounce">弹性动画</div>
          <div class="demo-box rotate">旋转效果</div>
        </div>
      </div>
    </header>

    <main class="content-container">
      <!-- 简介部分 -->
      <section class="section intro-section">
        <h2 class="section-title">
          <span class="icon">🎬</span>
          React 动画的重要性
        </h2>

        <div class="intro-grid">
          <div class="intro-card">
            <div class="icon">👁️</div>
            <h3>用户体验提升</h3>
            <p>动画引导用户注意力，创造流畅的交互体验</p>
          </div>
          <div class="intro-card">
            <div class="icon">🧠</div>
            <h3>认知负荷降低</h3>
            <p>动画帮助用户理解元素之间的关系和状态变化</p>
          </div>
          <div class="intro-card">
            <div class="icon">💫</div>
            <h3>品牌个性表达</h3>
            <p>独特的动画风格增强品牌辨识度</p>
          </div>
        </div>

        <div class="key-principles">
          <h3>核心动画原则</h3>
          <div class="principles-grid">
            <div class="principle">
              <div class="number">1</div>
              <div class="content">
                <h4>性能优先</h4>
                <p>使用GPU加速的属性，避免布局抖动</p>
              </div>
            </div>
            <div class="principle">
              <div class="number">2</div>
              <div class="content">
                <h4>适度使用</h4>
                <p>避免过度动画分散用户注意力</p>
              </div>
            </div>
            <div class="principle">
              <div class="number">3</div>
              <div class="content">
                <h4>自然流畅</h4>
                <p>使用物理基础的运动曲线</p>
              </div>
            </div>
            <div class="principle">
              <div class="number">4</div>
              <div class="content">
                <h4>一致性</h4>
                <p>整个应用保持一致的动画风格</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CSS动画方案 -->
      <section class="section css-animation">
        <h2 class="section-title">
          <span class="icon">🎨</span>
          CSS 动画方案
        </h2>

        <div class="animation-card-grid">
          <div class="animation-card">
            <div class="card-header">
              <div class="tech-logo css-logo">CSS</div>
              <div class="difficulty">简单</div>
            </div>
            <h3>原生CSS动画</h3>
            <div class="features">
              <span>关键帧</span>
              <span>过渡</span>
              <span>变换</span>
            </div>

            <div class="usage">
              <h4>使用方法</h4>
              <pre class="code-block"><code class="language-css">/* 定义动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}</code></pre>

              <pre class="code-block"><code class="language-jsx">// React组件中使用
function FadeInBox() {
  return (
    &lt;div className="fade-in"&gt;
      淡入效果的内容
    &lt;/div&gt;
  );
}</code></pre>
            </div>

            <div class="scenarios">
              <h4>适用场景</h4>
              <ul>
                <li>简单的状态变化效果（悬停、激活）</li>
                <li>元素进入/退出页面的基础动画</li>
                <li>不需要复杂逻辑的微交互</li>
              </ul>
            </div>
          </div>

          <div class="animation-card">
            <div class="card-header">
              <div class="tech-logo css-modules-logo">CSS Modules</div>
              <div class="difficulty">简单</div>
            </div>
            <h3>CSS-in-JS 动画</h3>
            <div class="features">
              <span>样式隔离</span>
              <span>动态样式</span>
              <span>主题支持</span>
            </div>

            <div class="usage">
              <h4>使用方法</h4>
              <pre class="code-block"><code class="language-jsx">import styled, { keyframes } from 'styled-components';

// 创建关键帧
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 创建动画组件
const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;

function LoadingSpinner() {
  return &lt;Spinner&gt;加载中...&lt;/Spinner&gt;;
}</code></pre>
            </div>

            <div class="scenarios">
              <h4>适用场景</h4>
              <ul>
                <li>需要动态生成样式的动画</li>
                <li>与组件状态紧密耦合的动画</li>
                <li>主题化的动画效果</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 专用动画库 -->
      <section class="section animation-libraries">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          专用动画库
        </h2>

        <div class="library-tabs">
          <div v-for="(tab, index) in libraryTabs" :key="index" :class="['tab', { active: activeLibraryTab === index }]"
            @click="activeLibraryTab = index">
            <div class="tab-icon">{{ tab.icon }}</div>
            <div class="tab-label">{{ tab.label }}</div>
          </div>
        </div>

        <div class="library-content">
          <div v-if="activeLibraryTab === 0" class="library-info">
            <div class="library-header">
              <div class="logo">💫</div>
              <h3>Framer Motion</h3>
              <div class="popularity">最流行</div>
            </div>

            <div class="description">
              <p>Framer Motion 是一个功能强大且易于使用的 React 动画库，提供简洁的 API 和丰富的功能。</p>
            </div>

            <div class="usage">
              <h4>基本使用</h4>
              <pre class="code-block"><code class="language-jsx">import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    &lt;motion.div
      initial=&#123;&#123; opacity: 0, scale: 0.5 &#125;&#125;
      animate=&#123;&#123; opacity: 1, scale: 1 &#125;&#125;
      transition=&#123;&#123; duration: 0.5 &#125;&#125;
      whileHover=&#123;&#123; scale: 1.2 &#125;&#125;
      whileTap=&#123;&#123; scale: 0.9 &#125;&#125;
    &gt;
      可交互的动画元素
    &lt;/motion.div&gt;
  );
}</code></pre>
            </div>

            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h5>布局动画</h5>
                <p>自动处理布局变化的动画</p>
              </div>
              <div class="feature">
                <div class="feature-icon">👆</div>
                <h5>手势支持</h5>
                <p>悬停、点击和拖动手势</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📱</div>
                <h5>响应式</h5>
                <p>适配各种屏幕尺寸</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🎚️</div>
                <h5>高级控制</h5>
                <p>自定义过渡和关键帧</p>
              </div>
            </div>

            <div class="scenarios">
              <h4>适用场景</h4>
              <ul>
                <li>复杂的用户交互动画</li>
                <li>页面过渡和路由动画</li>
                <li>拖放交互和手势控制</li>
                <li>需要精细控制的动画序列</li>
              </ul>
            </div>
          </div>

          <div v-if="activeLibraryTab === 1" class="library-info">
            <div class="library-header">
              <div class="logo">🪀</div>
              <h3>React Spring</h3>
              <div class="popularity">高性能</div>
            </div>

            <div class="description">
              <p>React Spring 是一个基于物理的动画库，创建真实、流畅的动画效果。</p>
            </div>

            <div class="usage">
              <h4>基本使用</h4>
              <pre class="code-block"><code class="language-jsx">import { useSpring, animated } from 'react-spring';

function SpringAnimation() {
  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 20 }
  });

  return (
    &lt;animated.div style={props}&gt;
      基于物理的动画效果
    &lt;/animated.div&gt;
  );
}</code></pre>
            </div>

            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">📐</div>
                <h5>物理基础</h5>
                <p>真实的弹簧物理效果</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🚀</div>
                <h5>高性能</h5>
                <p>使用requestAnimationFrame</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔗</div>
                <h5>链式动画</h5>
                <p>创建复杂的动画序列</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h5>插值</h5>
                <p>复杂值的动画过渡</p>
              </div>
            </div>

            <div class="scenarios">
              <h4>适用场景</h4>
              <ul>
                <li>物理真实的动画效果</li>
                <li>数据可视化动画</li>
                <li>复杂的动画序列</li>
                <li>需要高性能的复杂动画</li>
              </ul>
            </div>
          </div>

          <div v-if="activeLibraryTab === 2" class="library-info">
            <div class="library-header">
              <div class="logo">🔄</div>
              <h3>React Transition Group</h3>
              <div class="popularity">轻量级</div>
            </div>

            <div class="description">
              <p>React Transition Group 提供组件生命周期管理，帮助实现CSS过渡和动画。</p>
            </div>

            <div class="usage">
              <h4>基本使用</h4>
              <pre class="code-block"><code class="language-jsx">import { CSSTransition } from 'react-transition-group';

function FadeTransition({ in: inProp }) {
  return (
    &lt;CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
    &gt;
      &lt;div&gt;淡入淡出的内容&lt;/div&gt;
    &lt;/CSSTransition&gt;
  );
}

// CSS样式
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms; }
.fade-exit { opacity: 1; }
.fade-exit-active { opacity: 0; transition: opacity 300ms; }</code></pre>
            </div>

            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">📦</div>
                <h5>轻量级</h5>
                <p>非常小的包大小</p>
              </div>
              <div class="feature">
                <div class="feature-icon">⏱️</div>
                <h5>生命周期</h5>
                <p>组件进入/退出动画</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔌</div>
                <h5>灵活</h5>
                <p>与任何CSS动画库兼容</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h5>简单API</h5>
                <p>易于集成到现有项目</p>
              </div>
            </div>

            <div class="scenarios">
              <h4>适用场景</h4>
              <ul>
                <li>组件挂载/卸载动画</li>
                <li>路由过渡效果</li>
                <li>列表添加/删除动画</li>
                <li>需要精细控制CSS动画的项目</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 动画方案对比 -->
      <section class="section comparison">
        <h2 class="section-title">
          <span class="icon">📊</span>
          动画方案对比
        </h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>上手难度</th>
                <th>包大小</th>
                <th>性能</th>
                <th>灵活性</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>原生CSS</td>
                <td>简单</td>
                <td>0KB</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>中</td>
                <td>简单过渡效果</td>
              </tr>
              <tr>
                <td>CSS-in-JS</td>
                <td>中等</td>
                <td>10-30KB</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>高</td>
                <td>动态样式动画</td>
              </tr>
              <tr>
                <td>Framer Motion</td>
                <td>中等</td>
                <td>50KB</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>极高</td>
                <td>复杂交互动画</td>
              </tr>
              <tr>
                <td>React Spring</td>
                <td>较高</td>
                <td>40KB</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>极高</td>
                <td>物理基础动画</td>
              </tr>
              <tr>
                <td>Transition Group</td>
                <td>简单</td>
                <td>5KB</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>中</td>
                <td>组件生命周期动画</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="selection-guide">
          <h3>如何选择合适的动画方案</h3>
          <div class="guide-grid">
            <div class="guide-card">
              <div class="icon">🎯</div>
              <h4>简单过渡效果</h4>
              <p>原生CSS或Transition Group</p>
            </div>
            <div class="guide-card">
              <div class="icon">🧩</div>
              <h4>组件状态动画</h4>
              <p>CSS-in-JS方案</p>
            </div>
            <div class="guide-card">
              <div class="icon">🕹️</div>
              <h4>复杂交互</h4>
              <p>Framer Motion</p>
            </div>
            <div class="guide-card">
              <div class="icon">📈</div>
              <h4>数据可视化</h4>
              <p>React Spring</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section best-practices">
        <h2 class="section-title">
          <span class="icon">🏆</span>
          React 动画最佳实践
        </h2>

        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>优先使用CSS动画</h3>
              <p>对于简单动画，CSS性能通常优于JavaScript方案</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>使用transform和opacity</h3>
              <p>这些属性不会引起重排，动画更流畅</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>避免动画阻塞主线程</h3>
              <p>使用will-change或transform属性启用GPU加速</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>提供减少动画选项</h3>
              <p>尊重用户的偏好设置</p>
              <pre class="mini-code">@media (prefers-reduced-motion: reduce) {
  * { animation: none; }
}</pre>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>React 动画方案基本指南 · {{ currentYear }}</p>
      <div class="resources">
        <a href="#" class="resource-link">Framer Motion文档</a>
        <a href="#" class="resource-link">React Spring示例</a>
        <a href="#" class="resource-link">动画灵感</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const libraryTabs = [
  { icon: '💫', label: 'Framer Motion' },
  { icon: '🪀', label: 'React Spring' },
  { icon: '🔄', label: 'Transition Group' }
];

const activeLibraryTab = ref(0);
const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@primary: #4361ee;
@primary-light: rgba(67, 97, 238, 0.1);
@secondary: #7209b7;
@text-primary: #2b2d42;
@text-secondary: #4a5568;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@code-bg: #2b2d42;
@warning: #f72585;
@success: #06d6a0;

.react-animation-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.animated-header {
  margin: 30px 0 40px;
  background: linear-gradient(135deg, #f0f4ff, #e6eeff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(67, 97, 238, 0.15);
  padding: 40px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    color: @primary;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    margin-bottom: 30px;
  }
}

.animation-showcase {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;

  .demo-box {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    color: white;

    &.fade {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      animation: fadeDemo 3s infinite alternate;
    }

    &.slide {
      background: linear-gradient(135deg, #f72585, #b5179e);
      animation: slideDemo 3s infinite alternate;
    }

    &.bounce {
      background: linear-gradient(135deg, #4cc9f0, #4895ef);
      animation: bounceDemo 3s infinite alternate;
    }

    &.rotate {
      background: linear-gradient(135deg, #ff9e00, #ff5400);
      animation: rotateDemo 5s infinite linear;
    }
  }
}

@keyframes fadeDemo {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes slideDemo {

  0%,
  100% {
    transform: translateX(-30px);
  }

  50% {
    transform: translateX(30px);
  }
}

@keyframes bounceDemo {

  0%,
  100% {
    transform: translateY(-20px);
  }

  50% {
    transform: translateY(20px);
  }
}

@keyframes rotateDemo {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 1.4rem;
  }
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.intro-card {
  text-align: center;
  padding: 25px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #f0f4ff, #ffffff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    height: 60px;
  }

  h3 {
    margin: 0 0 10px;
    color: @primary;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.key-principles {
  background: rgba(67, 97, 238, 0.03);
  border-radius: 12px;
  padding: 25px;

  h3 {
    color: @primary;
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.principle {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .number {
    font-size: 1.2rem;
    font-weight: 700;
    min-width: 32px;
    height: 32px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    margin: 0 0 5px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.9rem;
  }
}

.animation-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.animation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 5px solid @primary;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 20px 25px;
    background: rgba(67, 97, 238, 0.05);
  }

  .tech-logo {
    font-weight: 700;
    padding: 6px 15px;
    border-radius: 30px;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .css-logo {
    background: rgba(86, 61, 124, 0.1);
    color: #563d7c;
  }

  .css-modules-logo {
    background: rgba(219, 55, 83, 0.1);
    color: #db3753;
  }

  .difficulty {
    background: rgba(67, 97, 238, 0.1);
    color: @primary;
    padding: 6px 15px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  h3 {
    padding: 15px 25px 10px;
    margin: 0;
    font-size: 1.4rem;
  }

  .features {
    display: flex;
    gap: 10px;
    padding: 0 25px 20px;
    flex-wrap: wrap;

    span {
      background: rgba(67, 97, 238, 0.1);
      color: @primary;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
    }
  }

  .usage,
  .scenarios {
    padding: 15px 25px;

    h4 {
      margin-top: 0;
      margin-bottom: 15px;
      color: @primary;
    }
  }

  .scenarios {
    background: rgba(67, 97, 238, 0.03);
    border-top: 1px solid @border;

    ul {
      margin: 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 8px;
    }
  }
}

.library-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 140px;
  padding: 20px 10px;
  border-radius: 16px;
  background: rgba(67, 97, 238, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(67, 97, 238, 0.2);
  }

  &.active {
    background: @primary;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(67, 97, 238, 0.3);

    .tab-icon,
    .tab-label {
      color: white;
    }
  }

  .tab-icon {
    font-size: 2rem;
    margin-bottom: 5px;
  }

  .tab-label {
    font-weight: 600;
  }
}

.library-content {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.library-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;

  .logo {
    font-size: 2.5rem;
  }

  h3 {
    margin: 0;
    font-size: 1.8rem;
    color: @text-primary;
  }

  .popularity {
    background: rgba(67, 97, 238, 0.1);
    color: @primary;
    padding: 5px 15px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.description {
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.7;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature {
  text-align: center;
  padding: 25px 15px;
  border-radius: 12px;
  background: rgba(67, 97, 238, 0.03);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(67, 97, 238, 0.08);
  }

  .feature-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary;
  }

  h5 {
    margin: 0 0 8px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.9rem;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 40px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid @border;
    }

    th {
      background: rgba(67, 97, 238, 0.08);
      font-weight: 600;
      color: @primary;
    }

    tr:hover {
      background: rgba(67, 97, 238, 0.03);
    }
  }
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.guide-card {
  text-align: center;
  padding: 25px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #f0f4ff, #ffffff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary;
    display: inline-block;
  }

  h4 {
    margin: 0 0 8px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.practices {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.practice {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .number {
    font-size: 1.8rem;
    font-weight: 700;
    color: @primary;
    min-width: 50px;
    height: 50px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    h3 {
      margin: 0 0 8px;
      font-size: 1.1rem;
    }

    p {
      margin: 0 0 10px;
      color: @text-secondary;
    }

    .mini-code {
      font-family: 'Fira Code', monospace;
      background: rgba(43, 45, 66, 0.05);
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 0.85rem;
      overflow-x: auto;
    }
  }
}

.code-block {
  font-family: 'Fira Code', monospace;
  background: @code-bg;
  color: #edf2f4;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 15px 0;
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid @border;
  color: @text-secondary;

  .resources {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;

    .resource-link {
      color: @primary;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .animated-header {
    padding: 30px 20px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section {
    padding: 25px 20px;
  }

  .animation-card-grid {
    grid-template-columns: 1fr;
  }

  .library-tabs {
    .tab {
      width: 110px;
      padding: 15px 5px;
    }
  }
}
</style>
