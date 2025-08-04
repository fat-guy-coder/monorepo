<template>
  <div class="vue-container" :class="{ 'dark-mode': darkMode }">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="vue-logo">
            <div class="logo-core"></div>
            <div class="logo-v">V</div>
          </div>
          <h1>Vue.js</h1>
          <h3><a href="https://cn.vuejs.org/" target="_blank">跳转官网</a></h3>
        </div>
        <p class="subtitle">渐进式 JavaScript 框架 - 易学易用，灵活高效</p>
      </div>
      <div class="theme-toggle">
        <button @click="toggleTheme">
          {{ darkMode ? '🌞 浅色模式' : '🌙 深色模式' }}
        </button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 导航菜单 -->
      <nav class="navigation">
        <ul>
          <li v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === item.id }"
            @click="scrollToSection(item.id)">
            {{ item.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content-sections">
        <!-- 概述部分 -->
        <section id="overview" class="content-section">
          <h2 class="section-title">Vue.js 概述</h2>
          <div class="section-content">
            <div class="intro-card">
              <div class="intro-text">
                <p>Vue (发音为 /vjuː/，类似 <strong>view</strong>) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。</p>
                <p>Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</p>
              </div>
              <div class="intro-features">
                <div class="feature">
                  <div class="feature-icon">💡</div>
                  <h3>易学易用</h3>
                  <p>基于标准 HTML、CSS 和 JavaScript 构建，提供简单易懂的 API</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🚀</div>
                  <h3>高性能</h3>
                  <p>虚拟 DOM 和智能优化确保极快的运行速度</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🧩</div>
                  <h3>灵活渐进</h3>
                  <p>可以从简单的库逐步扩展到全功能框架</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 发展历史 -->
        <section id="history" class="content-section">
          <h2 class="section-title">发展历史</h2>
          <div class="timeline">
            <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-event">
              <div class="event-date">{{ event.date }}</div>
              <div class="event-content">
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 核心原理 -->
        <section id="principles" class="content-section">
          <h2 class="section-title">核心原理</h2>
          <div class="principles-grid">
            <div class="principle">
              <h3>响应式系统</h3>
              <div class="principle-visual">
                <div class="data-object">Data Object</div>
                <div class="arrow">⇒</div>
                <div class="getter-setter">Getter/Setter</div>
                <div class="arrow">⇒</div>
                <div class="dep">Dep</div>
                <div class="arrow">⇒</div>
                <div class="watcher">Watcher</div>
                <div class="arrow">⇒</div>
                <div class="update">UI Update</div>
              </div>
              <p>Vue 使用基于依赖追踪的响应式系统，通过 Object.defineProperty（Vue 2）或 Proxy（Vue 3）实现数据劫持，自动跟踪依赖关系并在数据变化时更新视图。</p>
            </div>

            <div class="principle">
              <h3>虚拟 DOM</h3>
              <div class="principle-visual">
                <div class="vdom">Virtual DOM</div>
                <div class="diff">Diff 算法</div>
                <div class="patch">Patch</div>
                <div class="arrow">⇒</div>
                <div class="real-dom">Real DOM</div>
              </div>
              <p>Vue 维护一个虚拟的 DOM 树，当状态变化时，通过高效的 Diff 算法计算出最小更新量，然后批量更新到真实 DOM，提高渲染性能。</p>
            </div>

            <div class="principle">
              <h3>组件系统</h3>
              <div class="component-tree">
                <div class="root">Root Component</div>
                <div class="children">
                  <div class="child">Child A</div>
                  <div class="child">Child B</div>
                  <div class="grandchildren">
                    <div class="grandchild">Grandchild 1</div>
                    <div class="grandchild">Grandchild 2</div>
                  </div>
                </div>
              </div>
              <p>Vue 的组件系统允许开发者将 UI 拆分为独立可复用的组件，每个组件包含自己的模板、逻辑和样式，通过 props 和 events 进行通信。</p>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section id="use-cases" class="content-section">
          <h2 class="section-title">使用场景</h2>
          <div class="use-cases">
            <div class="case-card" v-for="(useCase, index) in useCases" :key="index">
              <div class="case-icon">{{ useCase.icon }}</div>
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="case-examples">
                <span v-for="(example, idx) in useCase.examples" :key="idx" class="example-tag">{{ example }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 生态系统 -->
        <section id="ecosystem" class="content-section">
          <h2 class="section-title">生态系统</h2>
          <div class="ecosystem">
            <div class="core">
              <h3>核心库</h3>
              <div class="core-item">Vue.js</div>
            </div>

            <div class="tools">
              <h3>开发工具</h3>
              <div class="tool-item">Vue CLI</div>
              <div class="tool-item">Vite</div>
              <div class="tool-item">Vue DevTools</div>
            </div>

            <div class="routers">
              <h3>路由</h3>
              <div class="router-item">Vue Router</div>
            </div>

            <div class="state">
              <h3>状态管理</h3>
              <div class="state-item">Vuex</div>
              <div class="state-item">Pinia</div>
            </div>

            <div class="ui-frameworks">
              <h3>UI 框架</h3>
              <div class="ui-item">Element Plus</div>
              <div class="ui-item">Vuetify</div>
              <div class="ui-item">Ant Design Vue</div>
              <div class="ui-item">Quasar</div>
            </div>

            <div class="ssr">
              <h3>服务端渲染</h3>
              <div class="ssr-item">Nuxt.js</div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="vue-version">
          <div class="vue-logo-small"></div>
          <p>Vue.js {{ vueVersion }}</p>
        </div>
        <div class="resources">
          <h4>学习资源</h4>
          <ul>
            <li><a href="https://vuejs.org" target="_blank">官方文档</a></li>
            <li><a href="https://github.com/vuejs" target="_blank">GitHub</a></li>
            <li><a href="https://vuejs.org/community" target="_blank">社区</a></li>
            <li><a href="https://vuejobs.com" target="_blank">Vue Jobs</a></li>
          </ul>
        </div>
        <div class="quote">
          <blockquote>"Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。"</blockquote>
          <p class="author">— Evan You，Vue.js 创造者</p>
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 Vue.js 技术全景 | 使用 Vue 3 构建</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 响应式数据
const darkMode = ref(false);
const activeSection = ref('overview');
const vueVersion = ref('3.3.4');

// 导航项
const navItems = ref([
  { id: 'overview', title: '概述' },
  { id: 'history', title: '发展历史' },
  { id: 'principles', title: '核心原理' },
  { id: 'use-cases', title: '使用场景' },
  { id: 'ecosystem', title: '生态系统' }
]);

// 时间线事件
const timelineEvents = ref([
  {
    date: '2013年',
    title: '构想诞生',
    description: 'Evan You 在 Google 工作时开始思考如何结合 Angular 的优点并构建更轻量级的框架'
  },
  {
    date: '2014年2月',
    title: '首次发布',
    description: 'Vue.js 首次公开发布，版本号 0.8，名字来源于法语 "vue"（视图）'
  },
  {
    date: '2015年10月',
    title: 'Vue 1.0 发布',
    description: '代号 "新世纪福音战士"，引入虚拟DOM和响应式系统'
  },
  {
    date: '2016年10月',
    title: 'Vue 2.0 发布',
    description: '代号 "攻壳机动队"，重写虚拟DOM，支持服务端渲染，性能大幅提升'
  },
  {
    date: '2018年9月',
    title: 'Vue CLI 3.0',
    description: '全新的项目脚手架，提供可视化界面和插件系统'
  },
  {
    date: '2020年9月',
    title: 'Vue 3.0 发布',
    description: '代号 "One Piece"，使用 Composition API，全面采用 TypeScript，性能优化'
  },
  {
    date: '2022年2月',
    title: 'Vue 3 成为默认版本',
    description: 'Vue 3 成为官方文档和生态系统的默认版本'
  }
]);

// 使用场景
const useCases = ref([
  {
    icon: '🖥️',
    title: '单页应用 (SPA)',
    description: '构建现代单页应用程序，提供流畅的用户体验',
    examples: ['后台管理系统', '企业应用', '复杂交互应用']
  },
  {
    icon: '📱',
    title: '移动应用',
    description: '通过跨平台解决方案构建原生移动应用',
    examples: ['Ionic Vue', 'NativeScript Vue', 'Capacitor']
  },
  {
    icon: '🌐',
    title: '静态网站',
    description: '使用静态站点生成器创建高性能网站',
    examples: ['VuePress', 'Vitepress', '博客', '文档站点']
  },
  {
    icon: '🚀',
    title: '渐进式 Web 应用',
    description: '构建具有原生应用体验的 Web 应用',
    examples: ['离线应用', '推送通知', '添加到主屏幕']
  },
  {
    icon: '🎮',
    title: '交互式界面',
    description: '创建复杂的数据可视化和交互式体验',
    examples: ['数据仪表盘', '游戏界面', '可视化工具']
  },
  {
    icon: '🧩',
    title: '微前端架构',
    description: '作为微前端架构中的独立模块',
    examples: ['大型企业应用', '模块化系统', '可插拔功能']
  }
]);

// 切换主题
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};

// 滚动到指定区域
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动事件以更新活动导航项
const handleScroll = () => {
  const sections = Array.from(document.querySelectorAll('.content-section'));
  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i] as HTMLElement;
    if (section.offsetTop <= scrollPosition) {
      activeSection.value = section.id;
      break;
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初始滚动位置处理
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
@primary-color: #42b883;
@secondary-color: #35495e;
@accent-color: #ff7e5f;
@light-bg: #f8f9fa;
@light-text: #2c3e50;
@light-card: #ffffff;
@dark-bg: #1a1a2e;
@dark-text: #e6e6e6;
@dark-card: #16213e;
@border-radius: 12px;
@box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.vue-container {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @light-bg;
  color: @light-text;
  min-height: 100vh;
  transition: @transition;
  line-height: 1.6;

  &.dark-mode {
    background-color: @dark-bg;
    color: @dark-text;
  }
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 10%), @secondary-color);
  color: white;
  padding: 2rem 1rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size: cover;
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.vue-logo {
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 1.5rem;

  .logo-core {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #42b883;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    opacity: 0.8;
  }

  .logo-v {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    font-weight: bold;
    color: white;
  }
}

h1 {
  font-size: 2.8rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.4rem;
  max-width: 800px;
  margin: 1rem auto 0;
  opacity: 0.9;
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;

  button {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: @transition;
    backdrop-filter: blur(5px);
    font-size: 1rem;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
  }
}

.main-content {
  display: flex;
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 1rem 3rem;
  gap: 2rem;
}

.navigation {
  flex: 0 0 220px;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  background: @light-card;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 1.5rem 0;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;

  .dark-mode & {
    background: @dark-card;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.9rem 1.5rem;
    margin: 0.3rem 0;
    cursor: pointer;
    transition: @transition;
    font-weight: 500;
    position: relative;

    &:hover {
      background: fade(@primary-color, 8%);
      color: @primary-color;
    }

    &.active {
      background: fade(@primary-color, 15%);
      color: @primary-color;
      font-weight: 600;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: @primary-color;
        border-radius: 0 4px 4px 0;
      }
    }
  }
}

.content-sections {
  flex: 1;
}

.content-section {
  background: @light-card;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: @transition;

  .dark-mode & {
    background: @dark-card;
  }
}

.section-title {
  color: @primary-color;
  margin-top: 0;
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid fade(@primary-color, 20%);
  font-size: 1.8rem;
}

.intro-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  .intro-text {
    font-size: 1.1rem;
    line-height: 1.8;

    p {
      margin-bottom: 1.5rem;
    }
  }
}

.intro-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature {
  background: fade(@primary-color, 5%);
  border-radius: @border-radius;
  padding: 1.5rem;
  text-align: center;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: @secondary-color;

    .dark-mode & {
      color: @dark-text;
    }
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.timeline {
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    height: 100%;
    width: 3px;
    background: @primary-color;
  }
}

.timeline-event {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 5px;
    width: 20px;
    height: 20px;
    background: @light-card;
    border: 3px solid @primary-color;
    border-radius: 50%;
    z-index: 1;

    .dark-mode & {
      background: @dark-card;
    }
  }
}

.event-date {
  font-weight: 700;
  color: @primary-color;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.event-content {
  background: fade(@primary-color, 5%);
  border-radius: @border-radius;
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
  }
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.principle {
  background: fade(@secondary-color, 3%);
  border-radius: @border-radius;
  padding: 1.8rem;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: @accent-color;
    margin-top: 0;
    font-size: 1.4rem;
  }
}

.principle-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  color: @secondary-color;
  flex-wrap: wrap;

  .dark-mode & {
    color: @dark-text;
  }

  div {
    padding: 0.8rem 1.2rem;
    margin: 0.5rem;
    background: fade(@primary-color, 10%);
    border-radius: 6px;
    font-weight: 500;
  }

  .arrow {
    background: none;
    font-size: 1.2rem;
  }
}

.component-tree {
  margin: 1.5rem 0;
  text-align: center;

  .root,
  .child,
  .grandchild {
    padding: 0.8rem;
    background: fade(@primary-color, 15%);
    border-radius: 6px;
    margin: 0.5rem auto;
    font-weight: 500;
    max-width: 200px;
  }

  .children {
    margin: 1rem 0;
    padding-top: 1rem;
    border-top: 1px dashed fade(@primary-color, 30%);
  }

  .grandchildren {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
}

.case-card {
  background: @light-card;
  border-radius: @border-radius;
  padding: 1.8rem;
  text-align: center;
  transition: @transition;
  border: 1px solid fade(@primary-color, 15%);

  .dark-mode & {
    background: @dark-card;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    border-color: @primary-color;
  }

  .case-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @secondary-color;

    .dark-mode & {
      color: @dark-text;
    }
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
  }
}

.case-examples {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;

  .example-tag {
    background: fade(@primary-color, 15%);
    color: darken(@primary-color, 10%);
    border-radius: 20px;
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 500;

    .dark-mode & {
      color: lighten(@primary-color, 10%);
    }
  }
}

.ecosystem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  >div {
    background: fade(@primary-color, 5%);
    border-radius: @border-radius;
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: @accent-color;
      font-size: 1.3rem;
    }
  }
}

.core-item,
.tool-item,
.router-item,
.state-item,
.ui-item,
.ssr-item {
  background: @light-card;
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.8rem;
  border-radius: 6px;
  font-weight: 500;
  transition: @transition;

  .dark-mode & {
    background: @dark-card;
  }

  &:hover {
    background: fade(@primary-color, 15%);
    transform: translateX(5px);
  }
}

.footer {
  background: @secondary-color;
  color: white;
  padding: 3rem 1rem 1rem;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.vue-version {
  display: flex;
  align-items: center;
  gap: 1rem;

  .vue-logo-small {
    width: 50px;
    height: 50px;
    background: @primary-color;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
}

.resources {
  h4 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: fade(white, 80%);
    text-decoration: none;
    transition: @transition;

    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
}

.quote {
  blockquote {
    font-style: italic;
    margin: 0 0 1rem;
    padding-left: 1.5rem;
    border-left: 3px solid @primary-color;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .author {
    text-align: right;
    font-size: 0.95rem;
    opacity: 0.8;
  }
}

.copyright {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid fade(white, 15%);
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .header {
    padding: 1.5rem 1rem 3rem;
  }

  h1 {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .vue-logo {
    width: 90px;
    height: 90px;

    .logo-v {
      font-size: 3rem;
    }
  }
}
</style>