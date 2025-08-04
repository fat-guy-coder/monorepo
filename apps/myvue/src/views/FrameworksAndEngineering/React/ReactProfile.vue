<template>
  <div class="react-guide-container">
    <header class="header">
      <div class="logo-container">
        <div class="react-logo">
          <div class="react-logo-inner"></div>
        </div>
        <h1>React框架基本介绍</h1>
      </div>
      <p class="subtitle">构建现代用户界面的JavaScript库</p>
      <a href="https://zh-hans.react.dev/learn" target="_blank">React官方文档</a>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <section v-show="activeSection === 'overview'" class="section">
          <h2><i class="icon-info"></i>React概述</h2>
          <div class="card">
            <p>React 是由 Facebook 开发的一个用于构建用户界面的 JavaScript 库。它的核心思想是：</p>
            <ul>
              <li>组件化开发 - 将 UI 拆分为独立可复用的组件</li>
              <li>声明式编程 - 描述 UI 应该是什么样子</li>
              <li>虚拟 DOM - 高效更新实际 DOM</li>
              <li>单向数据流 - 数据从父组件流向子组件</li>
            </ul>

            <div class="code-block">
              <pre><code>// 一个简单的React组件示例
function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}</code></pre>
            </div>

            <div class="highlight-box">
              <strong>主要特点：</strong>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">⚛️</div>
                  <div>JSX语法扩展</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🔄</div>
                  <div>组件生命周期</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📦</div>
                  <div>状态管理</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">⚡</div>
                  <div>高性能渲染</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'history'" class="section">
          <h2><i class="icon-history"></i>发展历史</h2>
          <div class="card">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-date">2013.05</div>
                <div class="timeline-content">
                  <h3>React诞生</h3>
                  <p>Facebook首次开源React，主要解决大型应用的性能问题</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2015.02</div>
                <div class="timeline-content">
                  <h3>React Native发布</h3>
                  <p>使用React开发原生移动应用的框架</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2016.02</div>
                <div class="timeline-content">
                  <h3>React v15发布</h3>
                  <p>改进服务器端渲染，更稳定的内部架构</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2017.09</div>
                <div class="timeline-content">
                  <h3>React v16发布</h3>
                  <p>引入Fiber架构、错误边界、Fragment、Portal等新特性</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2019.02</div>
                <div class="timeline-content">
                  <h3>React Hooks发布</h3>
                  <p>在v16.8中引入Hooks，无需类组件即可使用状态和生命周期</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2020.10</div>
                <div class="timeline-content">
                  <h3>React v17发布</h3>
                  <p>渐进式升级，为未来特性做准备，无重大新特性</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">2022.03</div>
                <div class="timeline-content">
                  <h3>React 18发布</h3>
                  <p>引入并发渲染、自动批处理、Suspense等特性</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'principles'" class="section">
          <h2><i class="icon-gear"></i>核心原理</h2>
          <div class="card">
            <h3>虚拟DOM（Virtual DOM）</h3>
            <p>React的核心创新之一，是一个轻量级的JavaScript对象，表示真实DOM的抽象。</p>
            <div class="principle-diagram">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">数据变化时创建新的虚拟DOM</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">比较新旧虚拟DOM（Diff算法）</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">仅更新变化的部分到真实DOM</div>
              </div>
            </div>

            <h3>组件生命周期</h3>
            <p>类组件的生命周期方法：</p>
            <div class="lifecycle">
              <div class="phase">挂载阶段</div>
              <div>constructor() → render() → componentDidMount()</div>
              <div class="phase">更新阶段</div>
              <div>shouldComponentUpdate() → render() → componentDidUpdate()</div>
              <div class="phase">卸载阶段</div>
              <div>componentWillUnmount()</div>
            </div>

            <h3>JSX语法</h3>
            <p>JavaScript XML，允许在JavaScript中编写类似HTML的代码：</p>
            <div class="code-block">
              <pre><code>const element = (
  &lt;div className="container"&gt;
    &lt;h1&gt;Hello, React!&lt;/h1&gt;
    &lt;p&gt;This is JSX syntax.&lt;/p&gt;
  &lt;/div&gt;
);</code></pre>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'usage'" class="section">
          <h2><i class="icon-apps"></i>使用场景</h2>
          <div class="card">
            <div class="use-cases">
              <div class="use-case">
                <div class="case-icon">💻</div>
                <h3>单页应用 (SPA)</h3>
                <p>构建无需页面刷新的流畅用户体验</p>
              </div>
              <div class="use-case">
                <div class="case-icon">📱</div>
                <h3>移动应用</h3>
                <p>通过React Native开发跨平台原生应用</p>
              </div>
              <div class="use-case">
                <div class="case-icon">🛒</div>
                <h3>电子商务</h3>
                <p>构建动态产品展示和购物车</p>
              </div>
              <div class="use-case">
                <div class="case-icon">📊</div>
                <h3>数据看板</h3>
                <p>实时数据可视化和复杂交互界面</p>
              </div>
            </div>

            <h3>适用场景</h3>
            <ul>
              <li>需要频繁更新的数据驱动界面</li>
              <li>包含复杂交互和状态管理的应用</li>
              <li>需要跨平台开发（Web、移动端、桌面端）</li>
              <li>大型项目需要可维护的组件架构</li>
            </ul>

            <h3>不适用场景</h3>
            <ul>
              <li>内容为主的静态网站（可使用简单HTML）</li>
              <li>非常小的功能增强（可直接使用原生JS）</li>
              <li>需要SEO优化的内容网站（需配合Next.js等框架）</li>
            </ul>
          </div>
        </section>

        <section v-show="activeSection === 'ecosystem'" class="section">
          <h2><i class="icon-ecosystem"></i>生态系统</h2>
          <div class="card">
            <div class="ecosystem">
              <div class="ecosystem-category">
                <h3>状态管理</h3>
                <div class="tool">Redux</div>
                <div class="tool">MobX</div>
                <div class="tool">Recoil</div>
                <div class="tool">Context API</div>
              </div>
              <div class="ecosystem-category">
                <h3>路由</h3>
                <div class="tool">React Router</div>
                <div class="tool">Reach Router</div>
              </div>
              <div class="ecosystem-category">
                <h3>UI框架</h3>
                <div class="tool">Material-UI</div>
                <div class="tool">Ant Design</div>
                <div class="tool">Chakra UI</div>
                <div class="tool">Bootstrap React</div>
              </div>
              <div class="ecosystem-category">
                <h3>服务端渲染</h3>
                <div class="tool">Next.js</div>
                <div class="tool">Gatsby</div>
                <div class="tool">Remix</div>
              </div>
              <div class="ecosystem-category">
                <h3>测试</h3>
                <div class="tool">Jest</div>
                <div class="tool">React Testing Library</div>
                <div class="tool">Cypress</div>
              </div>
              <div class="ecosystem-category">
                <h3>构建工具</h3>
                <div class="tool">Create React App</div>
                <div class="tool">Vite</div>
                <div class="tool">Webpack</div>
              </div>
            </div>

            <h3>React社区</h3>
            <div class="community">
              <div class="community-item">
                <div class="community-icon">📚</div>
                <div>
                  <strong>官方文档</strong>
                  <p>reactjs.org - 优秀的官方学习资源</p>
                </div>
              </div>
              <div class="community-item">
                <div class="community-icon">💬</div>
                <div>
                  <strong>社区支持</strong>
                  <p>Stack Overflow、Reactiflux Discord</p>
                </div>
              </div>
              <div class="community-item">
                <div class="community-icon">📦</div>
                <div>
                  <strong>npm包</strong>
                  <p>超过150万个与React相关的npm包</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 React框架学习指南 | 使用Vue3制作</p>
      <p>React是Facebook的注册商标</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'overview', title: '概述' },
  { id: 'history', title: '发展历史' },
  { id: 'principles', title: '核心原理' },
  { id: 'usage', title: '使用场景' },
  { id: 'ecosystem', title: '生态系统' }
]);

// 当前活动部分
const activeSection = ref('overview');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #61dafb;
@primary-dark: #00a3cc;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@accent-color: #4f46e5;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.react-guide-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: linear-gradient(135deg, #0ea5e9, @primary-color);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
  margin-bottom: 2rem;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }
}

// React Logo动画
.react-logo {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid @primary-color;
  animation: rotate 15s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid @primary-color;
  }

  &::before {
    transform: rotate(60deg);
  }

  &::after {
    transform: rotate(-60deg);
  }

  .react-logo-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    background-color: @primary-color;
    border-radius: 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 220px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    .transition;

    &:hover {
      background-color: lighten(@primary-color, 40%);
    }

    &.active {
      background-color: lighten(@primary-color, 35%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.75rem;
    color: @primary-dark;
    margin-top: 0;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    i {
      font-size: 1.5rem;
    }
  }
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow;

  h3 {
    color: @primary-dark;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }

  p {
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: @text-secondary;
    }
  }
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;

  pre {
    margin: 0;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
  }
}

.highlight-box {
  background: lighten(@primary-color, 43%);
  border-left: 4px solid @primary-color;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  margin: 1.5rem 0;

  strong {
    font-size: 1.1rem;
    color: @primary-dark;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  .feature {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    .box-shadow;
    .transition;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    &-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }
}

.timeline {
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: @primary-color;
    border-radius: 2px;
  }

  &-item {
    position: relative;
    margin-bottom: 2rem;

    &::before {
      content: '';
      position: absolute;
      left: -36px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      border: 3px solid @primary-color;
    }
  }

  &-date {
    font-weight: 600;
    color: @primary-dark;
    margin-bottom: 0.5rem;
  }

  &-content {
    background: lighten(@primary-color, 43%);
    border-radius: 8px;
    padding: 1rem;
    .box-shadow;

    h3 {
      margin-top: 0;
      font-size: 1.2rem;
    }
  }
}

.principle-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;

  .step {
    flex: 1;
    background: lighten(@success-color, 45%);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    .box-shadow;

    &-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: @success-color;
      color: white;
      border-radius: 50%;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }
  }

  .arrow {
    padding: 0 1rem;
    font-size: 1.5rem;
    color: @text-secondary;
  }
}

.lifecycle {
  background: lighten(@warning-color, 45%);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;

  .phase {
    font-weight: 600;
    color: @warning-color;
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .use-case {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    .box-shadow;
    .transition;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0.5rem 0;
      color: @accent-color;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
    }
  }
}

.ecosystem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  &-category {
    background: white;
    border-radius: 8px;
    padding: 1.25rem;
    .box-shadow;

    h3 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
      color: @accent-color;
    }
  }

  .tool {
    background: lighten(@primary-color, 43%);
    border-radius: 6px;
    padding: 0.6rem 1rem;
    margin: 0.5rem 0;
    font-weight: 500;
  }
}

.community {
  margin-top: 1.5rem;

  &-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    margin-bottom: 1rem;
    .box-shadow;

    .community-icon {
      font-size: 1.8rem;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 1rem;
  }

  .sidebar {
    flex: none;
    width: 100%;
  }

  .header h1 {
    font-size: 2rem;
  }

  .principle-diagram {
    flex-direction: column;
    gap: 1rem;

    .arrow {
      transform: rotate(90deg);
      padding: 1rem 0;
    }
  }
}
</style>
