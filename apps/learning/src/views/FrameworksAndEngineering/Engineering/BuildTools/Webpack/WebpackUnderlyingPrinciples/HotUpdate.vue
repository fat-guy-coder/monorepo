<template>
  <div class="hmr-guide">
    <header class="header">
      <div class="header-content">
        <h1>Webpack HMR 热模块替换基本介绍</h1>
        <p>实现即时模块更新，提升开发体验</p>
      </div>
      <div class="heat-animation">
        <div class="heat-wave"></div>
        <div class="heat-icon">
          <i class="fas fa-fire"></i>
        </div>
      </div>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
                :class="{ active: activeSection === section.id }">
                <i :class="section.icon"></i>
                <span>{{ section.title }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="hot-indicator">
            <span class="hot-dot"></span>
            <span>HMR 已启用</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="introduction" class="section">
          <div class="section-header">
            <i class="fas fa-fire"></i>
            <h2>什么是HMR？</h2>
          </div>

          <div class="content-card">
            <p><strong>热模块替换（Hot Module Replacement）</strong>是Webpack提供的一项功能，允许在应用程序运行时替换、添加或删除模块，而无需完全刷新页面。</p>

            <div class="comparison">
              <div class="comparison-item">
                <div class="comparison-header without-hmr">
                  <i class="fas fa-sync-alt"></i>
                  <h3>传统开发模式</h3>
                </div>
                <ul>
                  <li>每次修改代码后需要刷新整个页面</li>
                  <li>应用状态会丢失（如表单数据）</li>
                  <li>重新加载所有资源（JS、CSS、图片等）</li>
                  <li>开发效率较低，尤其对于大型应用</li>
                </ul>
              </div>

              <div class="comparison-item">
                <div class="comparison-header with-hmr">
                  <i class="fas fa-bolt"></i>
                  <h3>使用HMR的开发模式</h3>
                </div>
                <ul>
                  <li>只更新修改的模块</li>
                  <li>保持应用状态不变</li>
                  <li>仅重新加载必要的资源</li>
                  <li>开发效率提升50%以上</li>
                  <li>即时反馈，无需等待完整重载</li>
                </ul>
              </div>
            </div>

            <div class="benefits">
              <h3>HMR 核心优势</h3>
              <div class="benefits-grid">
                <div class="benefit">
                  <i class="fas fa-rocket"></i>
                  <h4>开发效率提升</h4>
                  <p>减少等待时间，更快看到修改结果</p>
                </div>
                <div class="benefit">
                  <i class="fas fa-brain"></i>
                  <h4>状态保持</h4>
                  <p>保留应用状态（如Redux store、表单数据）</p>
                </div>
                <div class="benefit">
                  <i class="fas fa-code"></i>
                  <h4>CSS热更新</h4>
                  <p>CSS修改无需刷新页面，即时生效</p>
                </div>
                <div class="benefit">
                  <i class="fas fa-plug"></i>
                  <h4>模块化更新</h4>
                  <p>只更新修改的组件/模块</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="configuration" class="section">
          <div class="section-header">
            <i class="fas fa-cog"></i>
            <h2>HMR 配置指南</h2>
          </div>

          <div class="content-card">
            <h3>基础Webpack配置</h3>
            <p>在Webpack配置文件中启用HMR需要以下设置：</p>

            <div class="code-tabs">
              <div class="tabs-header">
                <button :class="{ active: activeTab === 'webpack' }"
                  @click="activeTab = 'webpack'">webpack.config.js</button>
                <button :class="{ active: activeTab === 'devServer' }"
                  @click="activeTab = 'devServer'">devServer配置</button>
                <button :class="{ active: activeTab === 'vue' }" @click="activeTab = 'vue'">Vue CLI配置</button>
              </div>

              <div class="tab-content">
                <div v-if="activeTab === 'webpack'" class="code-block">
                  <pre><code>const webpack = require('webpack');

module.exports = {
  // ...其他配置
  devServer: {
    hot: true, // 启用HMR
    open: true,
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // ...其他插件
  ]
};</code></pre>
                </div>

                <div v-if="activeTab === 'devServer'" class="code-block">
                  <pre><code>// 完整开发服务器配置示例
devServer: {
  hot: true, // 核心HMR开关
  liveReload: false, // 禁用完整重载
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    logging: 'warn', // 控制台日志级别
    progress: true, // 显示编译进度
    reconnect: 5, // 断开后重连次数
  },
  static: './dist',
  compress: true,
  port: 3000,
  historyApiFallback: true,
},</code></pre>
                </div>

                <div v-if="activeTab === 'vue'" class="code-block">
                  <pre><code>// Vue CLI项目中，HMR已默认启用
// 可通过vue.config.js自定义配置

module.exports = {
  devServer: {
    hot: true,
    // 高级配置
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    // 解决HMR在某些环境下的问题
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: true,
      },
    },
  },
  chainWebpack: config => {
    // 确保HMR插件已启用
    config.plugin('hot').use(webpack.HotModuleReplacementPlugin);
  }
};</code></pre>
                </div>
              </div>
            </div>

            <h3>项目入口文件配置</h3>
            <p>在应用入口文件中添加HMR接受代码：</p>

            <div class="code-block">
              <pre><code>// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

// HMR支持
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  import.meta.webpackHot.dispose(() => {
    app.unmount();
  });
}

// 或者使用module.hot API
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}</code></pre>
            </div>

            <div class="config-tips">
              <h4><i class="fas fa-lightbulb"></i> 配置注意事项</h4>
              <ul>
                <li>确保<code>webpack-dev-server</code>版本与Webpack兼容</li>
                <li>在Vue CLI项目中，HMR默认启用，无需额外配置</li>
                <li>使用<code>import.meta.hot</code>替代旧的<code>module.hot</code> API</li>
                <li>对于复杂应用，可能需要手动管理模块更新逻辑</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="principle" class="section">
          <div class="section-header">
            <i class="fas fa-microscope"></i>
            <h2>HMR 底层原理</h2>
          </div>

          <div class="content-card">
            <h3>HMR 工作流程</h3>
            <div class="workflow">
              <div class="workflow-step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>文件修改检测</h4>
                  <p>Webpack通过文件系统监视文件变更</p>
                </div>
              </div>

              <div class="workflow-step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>增量编译</h4>
                  <p>仅重新编译修改的模块及其依赖</p>
                </div>
              </div>

              <div class="workflow-step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>更新通知</h4>
                  <p>通过WebSocket向客户端发送更新消息</p>
                </div>
              </div>

              <div class="workflow-step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>模块热替换</h4>
                  <p>客户端运行时应用更新，替换旧模块</p>
                </div>
              </div>
            </div>

            <div class="architecture">
              <h3>HMR 架构图解</h3>
              <div class="architecture-diagram">
                <div class="diagram-row">
                  <div class="diagram-item server">
                    <div class="diagram-label">Webpack Dev Server</div>
                    <div class="diagram-content">
                      <div class="module">模块系统</div>
                      <div class="compiler">编译器</div>
                      <div class="websocket">WebSocket</div>
                    </div>
                  </div>
                </div>

                <div class="diagram-row connection">
                  <div class="connection-line"></div>
                </div>

                <div class="diagram-row">
                  <div class="diagram-item client">
                    <div class="diagram-label">浏览器客户端</div>
                    <div class="diagram-content">
                      <div class="runtime">HMR Runtime</div>
                      <div class="module">应用模块</div>
                      <div class="module">应用模块</div>
                      <div class="module updated">更新模块</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="deep-dive">
              <h3>关键技术解析</h3>
              <div class="tech-grid">
                <div class="tech-card">
                  <h4>WebSocket 通信</h4>
                  <p>服务器与客户端通过WebSocket保持长连接，实时推送更新事件</p>
                </div>
                <div class="tech-card">
                  <h4>模块依赖图</h4>
                  <p>Webpack构建模块依赖图，确定需要更新的最小模块集合</p>
                </div>
                <div class="tech-card">
                  <h4>运行时接口</h4>
                  <p>HMR Runtime提供accept/dispose等API管理模块生命周期</p>
                </div>
                <div class="tech-card">
                  <h4>模块标识</h4>
                  <p>每个模块有唯一ID，确保精确替换</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="optimization" class="section">
          <div class="section-header">
            <i class="fas fa-tachometer-alt"></i>
            <h2>HMR 性能优化</h2>
          </div>

          <div class="content-card">
            <h3>HMR 速度优化策略</h3>

            <div class="optimization-methods">
              <div class="method">
                <div class="method-header">
                  <i class="fas fa-project-diagram"></i>
                  <h4>减少监视文件范围</h4>
                </div>
                <div class="code-block small">
                  <pre><code>// webpack.config.js
module.exports = {
  // ...
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
};</code></pre>
                </div>
              </div>

              <div class="method">
                <div class="method-header">
                  <i class="fas fa-memory"></i>
                  <h4>增加构建内存</h4>
                </div>
                <p>在package.json中增加Node.js内存限制：</p>
                <div class="code-block small">
                  <pre><code>// package.json
"scripts": {
  "dev": "NODE_OPTIONS=--max-old-space-size=4096 webpack serve"
}</code></pre>
                </div>
              </div>

              <div class="method">
                <div class="method-header">
                  <i class="fas fa-code"></i>
                  <h4>使用ESBuild加速</h4>
                </div>
                <p>配置ESBuild-loader加速TS/JS编译：</p>
                <div class="code-block small">
                  <pre><code>// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      }
    ]
  }
};</code></pre>
                </div>
              </div>
            </div>

            <h3>Vue项目优化建议</h3>
            <div class="vue-optimization">
              <div class="tip">
                <i class="fas fa-check-circle"></i>
                <p>使用<code>vue-loader v16+</code>，它针对HMR进行了优化</p>
              </div>
              <div class="tip">
                <i class="fas fa-check-circle"></i>
                <p>避免在根组件使用复杂逻辑，减少更新范围</p>
              </div>
              <div class="tip">
                <i class="fas fa-check-circle"></i>
                <p>对于大型组件，使用<code>markRaw</code>避免不必要的响应式转换</p>
              </div>
              <div class="tip">
                <i class="fas fa-check-circle"></i>
                <p>配置<code>cache-loader</code>或<code>hard-source-webpack-plugin</code>提升二次编译速度</p>
              </div>
            </div>

            <div class="hmr-stats">
              <h3>优化前后性能对比</h3>
              <div class="stats-grid">
                <div class="stat">
                  <div class="stat-label">未优化</div>
                  <div class="stat-bar" style="height: 80%">
                    <span>1200ms</span>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-label">基本优化</div>
                  <div class="stat-bar" style="height: 50%">
                    <span>750ms</span>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-label">高级优化</div>
                  <div class="stat-bar" style="height: 30%">
                    <span>450ms</span>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-label">极限优化</div>
                  <div class="stat-bar" style="height: 20%">
                    <span>300ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section conclusion">
          <div class="section-header">
            <i class="fas fa-flag-checkered"></i>
            <h2>总结与最佳实践</h2>
          </div>

          <div class="content-card">
            <h3>HMR 最佳实践</h3>
            <div class="best-practices">
              <div class="practice">
                <div class="number">1</div>
                <div class="content">
                  <h4>保持Webpack更新</h4>
                  <p>使用最新Webpack版本以获得最佳HMR性能和稳定性</p>
                </div>
              </div>

              <div class="practice">
                <div class="number">2</div>
                <div class="content">
                  <h4>模块化设计</h4>
                  <p>将应用拆分为小模块，减少HMR更新范围</p>
                </div>
              </div>

              <div class="practice">
                <div class="number">3</div>
                <div class="content">
                  <h4>状态管理分离</h4>
                  <p>将状态管理与UI组件分离（如使用Pinia/Vuex），确保状态在HMR中保留</p>
                </div>
              </div>

              <div class="practice">
                <div class="number">4</div>
                <div class="content">
                  <h4>监控HMR性能</h4>
                  <p>使用<code>speed-measure-webpack-plugin</code>分析构建速度，找出瓶颈</p>
                </div>
              </div>
            </div>

            <div class="final-tip">
              <i class="fas fa-magic"></i>
              <div class="tip-content">
                <p>通过合理配置HMR，开发者可以节省大量等待时间，研究显示HMR可以将开发效率提升40%-60%。</p>
                <p>在大型项目中，优化后的HMR系统每次更新只需300-500ms，而完整重载可能需要5-10秒。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Webpack HMR 热模块替换指南 | Vue3 + TypeScript 实现</p>
      <p> Webpack 高级开发技术</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 活动导航项
const activeSection = ref('introduction');
const activeTab = ref('webpack');

// 导航部分
const sections = ref([
  { id: 'introduction', title: 'HMR简介', icon: 'fas fa-fire' },
  { id: 'configuration', title: '配置指南', icon: 'fas fa-cog' },
  { id: 'principle', title: '底层原理', icon: 'fas fa-microscope' },
  { id: 'optimization', title: '性能优化', icon: 'fas fa-tachometer-alt' }
]);

// 滚动监听
const handleScroll = () => {
  const sectionElements = sections.value.map(s =>
    document.getElementById(s.id)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight) {
      activeSection.value = section.id;
    }
  });
};

// 滚动到指定区域
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 模拟HMR效果
  const heatWave = document.querySelector('.heat-wave') as HTMLElement;
  if (heatWave) {
    setInterval(() => {
      heatWave.style.animation = 'none';
      setTimeout(() => {
        heatWave.style.animation = 'heatEffect 3s infinite';
      }, 10);
    }, 5000);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>



// 变量定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@success-color: #2ec4b6;
@error-color: #e71d36;
@warning-color: #ff9f1c;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@card-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background-color: #f0f2f5;
  overflow-x: hidden;
}

.hmr-guide {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

// 页眉样式
.header {
  background: linear-gradient(135deg, darken(@secondary-color, 10%), @primary-color);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  .header-content {
    z-index: 2;

    h1 {
      font-size: 2.4rem;
      margin-bottom: 0.8rem;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
    }
  }
}

.heat-animation {
  position: relative;
  width: 150px;
  height: 150px;

  .heat-wave {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 100, 0, 0.3) 0%, rgba(255, 100, 0, 0) 70%);
    animation: heatEffect 3s infinite;
    opacity: 0.7;
  }

  .heat-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 4rem;
      color: #ff6b35;
      text-shadow: 0 0 15px rgba(255, 100, 0, 0.7);
    }
  }
}

@keyframes heatEffect {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }

  100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
}

// 内容布局
.content-container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 280px;
  background: @light-bg;
  border-right: 1px solid @border-color;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: calc(100vh - 80px);

  nav ul {
    list-style: none;
    flex: 1;

    li {
      margin-bottom: 0.3rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.9rem 1.5rem;
      text-decoration: none;
      color: @text-color;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;

      i {
        font-size: 1.1rem;
        width: 25px;
        margin-right: 0.8rem;
      }

      &:hover {
        background: rgba(@primary-color, 0.05);
        color: @primary-color;
      }

      &.active {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        border-left: 4px solid @primary-color;
        font-weight: 600;
      }
    }
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid @border-color;

  .hot-indicator {
    display: flex;
    align-items: center;
    background: rgba(@success-color, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: darken(@success-color, 10%);
    font-weight: 500;

    .hot-dot {
      width: 12px;
      height: 12px;
      background: @success-color;
      border-radius: 50%;
      margin-right: 0.7rem;
      box-shadow: 0 0 8px @success-color;
      animation: pulse 1.5s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

// 章节样式
.section {
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    i {
      font-size: 1.8rem;
      color: @primary-color;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.8rem;
      color: @secondary-color;
    }
  }
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  h4 {
    font-size: 1.2rem;
    margin: 1.2rem 0 0.8rem;
    color: darken(@text-color, 10%);
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
}

// 对比部分
.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  .comparison-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
  }

  .comparison-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    color: white;

    i {
      font-size: 1.8rem;
      margin-right: 1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }

    &.without-hmr {
      background: linear-gradient(135deg, #6c757d, #495057);
    }

    &.with-hmr {
      background: linear-gradient(135deg, @success-color, darken(@success-color, 10%));
    }
  }

  ul {
    padding: 1.5rem;

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

// 代码块样式
.code-tabs {
  margin: 1.5rem 0;

  .tabs-header {
    display: flex;
    border-bottom: 2px solid @border-color;
    margin-bottom: -1px;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      color: @text-color;
      position: relative;
      transition: all 0.3s;

      &:hover {
        color: @primary-color;
      }

      &.active {
        color: @primary-color;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: @primary-color;
          border-radius: 3px 3px 0 0;
        }
      }
    }
  }

  .tab-content {
    border: 1px solid @border-color;
    border-radius: 0 6px 6px 6px;
    overflow: hidden;
  }
}

.code-block {
  background: #2b2b2b;
  color: #f8f8f2;
  font-family: 'Source Code Pro', monospace;
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 1.5rem;

    code {
      display: block;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  &.small {
    pre {
      padding: 1rem;

      code {
        font-size: 0.85rem;
      }
    }
  }
}

// 架构图样式
.architecture {
  margin: 2.5rem 0;

  .architecture-diagram {
    background: #f9fafb;
    border-radius: 10px;
    padding: 2rem;
    border: 1px solid @border-color;

    .diagram-row {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      &.connection {
        height: 40px;
        position: relative;

        .connection-line {
          height: 100%;
          width: 4px;
          background: linear-gradient(to bottom, @accent-color, lighten(@accent-color, 20%));
          border-radius: 2px;
          position: relative;

          &::before,
          &::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: @accent-color;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            top: -6px;
          }

          &::after {
            bottom: -6px;
          }
        }
      }
    }

    .diagram-item {
      width: 80%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      &.server {
        background: linear-gradient(135deg, @primary-color, lighten(@primary-color, 10%));
      }

      &.client {
        background: linear-gradient(135deg, @success-color, lighten(@success-color, 10%));
      }

      .diagram-label {
        padding: 1rem;
        background: rgba(0, 0, 0, 0.1);
        color: white;
        font-weight: 600;
        text-align: center;
      }

      .diagram-content {
        display: flex;
        justify-content: space-around;
        padding: 1.5rem;
        min-height: 120px;
        align-items: center;

        div {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 1rem;
          color: white;
          text-align: center;
          min-width: 100px;

          &.updated {
            background: rgba(255, 255, 255, 0.4);
            border: 2px dashed white;
          }
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 1100px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid @border-color;
  }

  .main-content {
    padding: 1.5rem;
  }

  .header {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;

    .header-content {
      margin-bottom: 1.5rem;
    }
  }
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }

  .architecture-diagram .diagram-item {
    width: 95%;
  }

  .content-card {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
