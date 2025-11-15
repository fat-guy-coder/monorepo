<template>
  <div class="vite-qiankun-container">
    <div class="hero-section">
      <h1>Vite + 乾坤(Qiankun)微前端整合指南</h1>
      <p class="subtitle">现代化构建工具与微前端框架的完美结合</p>
      <div class="tech-badges">
        <span class="vite-badge">Vite</span>
        <span class="qiankun-badge">乾坤</span>
        <span class="vue-badge">Vue 3</span>
      </div>
    </div>

    <div class="main-content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>为什么选择Vite + 乾坤?</h2>
          <div class="intro-grid">
            <div class="intro-item">
              <div class="icon">⚡</div>
              <h3>极速开发体验</h3>
              <p>Vite提供闪电般快速的冷启动和热更新</p>
            </div>
            <div class="intro-item">
              <div class="icon">🧩</div>
              <h3>微前端架构</h3>
              <p>乾坤实现多个独立应用的聚合与隔离</p>
            </div>
            <div class="intro-item">
              <div class="icon">🚀</div>
              <h3>高效生产构建</h3>
              <p>Vite的Rollup生产构建优化性能</p>
            </div>
            <div class="intro-item">
              <div class="icon">🔒</div>
              <h3>沙箱隔离</h3>
              <p>乾坤提供JS/CSS沙箱确保应用独立</p>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <h2>与传统方案对比</h2>
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-item">特性</div>
              <div class="header-item">Webpack + Qiankun</div>
              <div class="header-item">Vite + Qiankun</div>
            </div>
            <div class="table-row">
              <div class="row-title">冷启动时间</div>
              <div class="row-item"><span class="negative">15-30s+</span></div>
              <div class="row-item"><span class="positive">1s以内</span></div>
            </div>
            <div class="table-row">
              <div class="row-title">HMR热更新</div>
              <div class="row-item"><span class="negative">较慢(1-3s)</span></div>
              <div class="row-item"><span class="positive">极快(50ms)</span></div>
            </div>
            <div class="table-row">
              <div class="row-title">配置复杂度</div>
              <div class="row-item"><span class="negative">高 (Webpack配置复杂)</span></div>
              <div class="row-item"><span class="positive">低 (Vite开箱即用)</span></div>
            </div>
            <div class="table-row">
              <div class="row-title">生产包体积</div>
              <div class="row-item"><span class="warning">较大</span></div>
              <div class="row-item"><span class="positive">较小(Rollup优化)</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="integration-section">
        <h2 class="section-title">整合步骤基本介绍</h2>
        <div class="integration-steps">
          <div class="step-card">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>主应用安装配置</h3>
            </div>
            <div class="step-content">
              <p>安装乾坤依赖并配置主应用入口</p>
              <div class="code-block">
                <pre><code>// 安装乾坤
npm install qiankun -S

// main.ts 主应用入口
import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import App from './App.vue'

createApp(App).mount('#app')

// 注册微应用
registerMicroApps([
  {
    name: 'vue3-app', // 应用名称
    entry: '//localhost:7101', // 子应用入口
    container: '#subapp-container', // 挂载容器
    activeRule: '/vue3', // 激活路径
  }
])

// 启动乾坤
start({
  sandbox: {
    experimentalStyleIsolation: true // 开启样式隔离
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>子应用适配Vite</h3>
            </div>
            <div class="step-content">
              <p>子应用需要安装<code>vite-plugin-qiankun</code>插件</p>
              <div class="code-block">
                <pre><code>// 安装Vite乾坤插件
npm install vite-plugin-qiankun -D

// vite.config.ts
import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue3-app', { // 微应用名称
      useDevMode: true // 开发模式
    })
  ],
  server: {
    port: 7101, // 固定端口号
    origin: '//localhost:7101' // 定义资源基础路径
  },
  base: '/vue3-app' // 设置基础路径
})</code></pre>
              </div>
            </div>
            <div class="step-content">
              <p>为什么需要安装vite-plugin-qiankun插件？</p>
              <p> <b>因为vite使用的是esmodule，生成的是如下代码</b></p>
              <div class="code-block">
                <pre><code>import { defineComponent } from 'vue'</code></pre>
              </div>
              <p>而乾坤加载js时，会使用new Function执行，而new
                Function内执行代码不能使用import(只在编译时才起作用)，所以需要使用vite-plugin-qiankun插件将代码转换为普通js代码</p>
              <p>vite-plugin-qiankun的原理是：</p>
              <p> 1.在vite-plugin-qiankun插件中，使用vite的钩子函数，将代码转换为普通js代码</p>
              <p> 2. 或者转为动态import，然后使用new Function执行</p>

            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>子应用生命周期配置</h3>
            </div>
            <div class="step-content">
              <p>在子应用入口文件中导出乾坤生命周期钩子</p>
              <div class="code-block">
                <pre><code>// 子应用入口文件 main.ts
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper'

let app: any = null

function render(props: any) {
  const { container } = props
  app = createApp(App)
  app.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

// 乾坤生命周期
renderWithQiankun({
  mount(props) {
    console.log('vue3-app mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props: any) {
    console.log('vue3-app unmount')
    app.unmount()
    app = null
  },
  update(props: any) {
    console.log('vue3-app update')
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">4</div>
              <h3>路由配置适配</h3>
            </div>
            <div class="step-content">
              <p>子应用需要根据乾坤环境设置路由base</p>
              <div class="code-block">
                <pre><code>// 子应用路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/es/helper'

// 根据乾坤环境设置基础路径
const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue3' : '/'

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    // 路由配置...
  ]
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="challenges-section">
        <h2 class="section-title">常见问题与解决方案</h2>

        <div class="challenges-grid">
          <div class="challenge-card">
            <div class="challenge-header">
              <div class="icon warning">⚠️</div>
              <h3>样式冲突问题</h3>
            </div>
            <div class="challenge-content">
              <p><strong>问题描述：</strong>子应用样式影响主应用或其他子应用</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>开启乾坤样式隔离：<code>start({ sandbox: { experimentalStyleIsolation: true } })</code></li>
                <li>使用CSS Modules或Scoped CSS</li>
                <li>为子应用添加唯一前缀命名空间</li>
              </ul>
            </div>
          </div>

          <div class="challenge-card">
            <div class="challenge-header">
              <div class="icon warning">⚠️</div>
              <h3>静态资源加载问题</h3>
            </div>
            <div class="challenge-content">
              <p><strong>问题描述：</strong>图片、字体等静态资源404</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>使用绝对路径引用资源</li>
                <li>
                  设置Vite的<code>base</code>配置：<code>base: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue3-app/' : '/'</code>
                </li>
                <li>使用<code>import</code>引入资源而非相对路径</li>
              </ul>
            </div>
          </div>

          <div class="challenge-card">
            <div class="challenge-header">
              <div class="icon warning">⚠️</div>
              <h3>开发环境跨域问题</h3>
            </div>
            <div class="challenge-content">
              <p><strong>问题描述：</strong>子应用资源访问被浏览器阻止</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>配置开发服务器CORS：</li>
                <div class="code-block small">
                  <pre><code>// vite.config.ts
server: {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}</code></pre>
                </div>
              </ul>
            </div>
          </div>

          <div class="challenge-card">
            <div class="challenge-header">
              <div class="icon warning">⚠️</div>
              <h3>状态管理共享</h3>
            </div>
            <div class="challenge-content">
              <p><strong>问题描述：</strong>应用间状态隔离导致通信困难</p>
              <p><strong>解决方案：</strong></p>
              <ul>
                <li>使用乾坤的<code>initGlobalState</code>通信机制</li>
                <li>通过URL参数传递必要数据</li>
                <li>使用自定义事件通信</li>
                <li>建立共享状态库</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practice">
        <h2 class="section-title">最佳实践建议</h2>

        <div class="practice-grid">
          <div class="practice-card">
            <div class="practice-icon">1</div>
            <h3>统一开发规范</h3>
            <p>主应用和子应用采用一致的代码规范、提交规范和目录结构</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">2</div>
            <h3>渐进式集成</h3>
            <p>从非核心模块开始集成，逐步迁移整个应用</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">3</div>
            <h3>依赖管理</h3>
            <p>共享通用依赖，避免重复打包（如Vue, VueRouter）</p>
          </div>

          <div class="practice-card">
            <div class="practice-icon">4</div>
            <h3>性能优化</h3>
            <p>使用按需加载，设置资源预加载，监控子应用加载性能</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Vite + 乾坤微前端整合指南 | 构建现代化微前端架构</p>
      <p> 前端架构实践手册</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置组件逻辑
import { ref } from 'vue';

const activeStep = ref(1);
</script>

<style lang="less" scoped>
@vite-color: #646cff;
@qiankun-color: #5e35b1;
@vue-color: #42b883;
@light-bg: #f8f9fc;
@card-bg: #ffffff;
@border-color: #e0e0e6;
@text-color: #2c3a5c;
@light-text: #6a7699;
@warning-color: #faad14;
@success-color: #52c41a;
@error-color: #f5222d;

.vite-qiankun-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding-bottom: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(135deg, #f0f2ff, #e6f7ff);
  border-radius: 0 0 16px 16px;
  padding: 3rem 2rem 4rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, @vite-color, @qiankun-color);
  }

  h1 {
    margin: 0 0 1rem;
    font-size: 2.4rem;
    color: @text-color;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    margin: 0 0 1.5rem;
  }
}

.tech-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;

  span {
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
  }

  .vite-badge {
    background: linear-gradient(135deg, @vite-color, lighten(@vite-color, 15%));
    color: white;
    box-shadow: 0 4px 10px rgba(@vite-color, 0.2);
  }

  .qiankun-badge {
    background: linear-gradient(135deg, @qiankun-color, lighten(@qiankun-color, 15%));
    color: white;
    box-shadow: 0 4px 10px rgba(@qiankun-color, 0.2);
  }

  .vue-badge {
    background: linear-gradient(135deg, @vue-color, lighten(@vue-color, 15%));
    color: white;
    box-shadow: 0 4px 10px rgba(@vue-color, 0.2);
  }
}

.main-content {
  padding: 0 2rem;
}

.intro-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
}

.intro-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid @vite-color;

  h2 {
    margin-top: 0;
    color: @text-color;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;

  .intro-item {
    background: fade(@vite-color, 5%);
    border-radius: 10px;
    padding: 1.5rem 1.2rem;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }

    h3 {
      margin: 0 0 0.8rem;
      font-size: 1.1rem;
      color: @text-color;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @light-text;
    }
  }
}

.comparison-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid @qiankun-color;

  h2 {
    margin-top: 0;
    color: @text-color;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.comparison-table {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;

  .table-header {
    display: flex;
    background: fade(@qiankun-color, 8%);
    border-bottom: 1px solid @border-color;

    .header-item {
      flex: 1;
      padding: 1rem;
      font-weight: 600;
      text-align: center;

      &:first-child {
        flex: 0.5;
      }
    }
  }

  .table-row {
    display: flex;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    .row-title {
      flex: 0.5;
      padding: 1rem;
      font-weight: 500;
      background: fade(@vite-color, 3%);
      border-right: 1px solid @border-color;
      display: flex;
      align-items: center;
    }

    .row-item {
      flex: 1;
      padding: 1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .positive {
        color: @success-color;
        font-weight: 500;
      }

      .negative {
        color: @error-color;
        font-weight: 500;
      }

      .warning {
        color: @warning-color;
        font-weight: 500;
      }
    }
  }
}

.section-title {
  text-align: center;
  color: @text-color;
  margin: 3rem 0 2rem;
  position: relative;
  font-size: 1.8rem;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, @vite-color, @qiankun-color);
    margin: 0.8rem auto;
    border-radius: 2px;
  }
}

.integration-steps {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.step-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid @vite-color;

  .step-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: fade(@vite-color, 5%);
    border-bottom: 1px solid @border-color;
  }

  .step-number {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, @vite-color, @qiankun-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
  }

  .step-content {
    padding: 1.5rem;

    p {
      margin-top: 0;
      margin-bottom: 1.2rem;
      font-size: 1.05rem;
      color: @text-color;
    }
  }
}

.code-block {
  background: #2a2a56;
  color: #e2e2ff;
  border-radius: 8px;
  padding: 1.2rem;
  margin: 1.2rem 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.92rem;
  line-height: 1.5;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    font-family: inherit;
  }

  &.small {
    font-size: 0.85rem;
    padding: 0.8rem;
  }
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.challenge-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid @warning-color;

  .challenge-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: fade(@warning-color, 8%);
    border-bottom: 1px solid @border-color;

    .icon {
      font-size: 1.8rem;
      margin-right: 0.8rem;
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: darken(@warning-color, 10%);
    }
  }

  .challenge-content {
    padding: 1.5rem;

    p {
      margin-bottom: 0.8rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-top: 1rem;

      li {
        margin-bottom: 0.6rem;
        position: relative;
        padding-left: 0.5rem;

        &::before {
          content: "•";
          position: absolute;
          left: -1rem;
          color: @qiankun-color;
        }
      }
    }
  }
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.practice-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid @qiankun-color;
  text-align: center;

  .practice-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, @vite-color, @qiankun-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1.2rem;
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.2rem;
    color: @text-color;
  }

  p {
    margin: 0;
    color: @light-text;
    font-size: 0.95rem;
  }
}

.footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem 0;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.3rem 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem 3rem;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .intro-section {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .code-block {
    font-size: 0.8rem;
    padding: 1rem;
  }
}
</style>
