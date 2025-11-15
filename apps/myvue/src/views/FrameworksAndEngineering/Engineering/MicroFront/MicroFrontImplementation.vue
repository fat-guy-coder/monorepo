<template>
  <div class="micro-frontend-guide">
    <header>
      <h1>微前端架构基本介绍</h1>
      <p>构建现代化、可扩展的前端应用架构</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">2016</div>
          <div class="stat-label">概念提出</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">5+</div>
          <div class="stat-label">主流方案</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 微前端概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>什么是微前端？</h3>
            <p>微前端是一种将前端应用分解为更小、更易管理的部分的架构风格，允许独立开发、部署和扩展各个子应用。</p>
          </div>
          <div class="overview-card">
            <h3>核心思想</h3>
            <ul>
              <li>技术栈无关 - 各子应用可使用不同框架</li>
              <li>独立开发部署 - 团队自治</li>
              <li>渐进式升级 - 逐步替换旧系统</li>
              <li>自治团队 - 按业务领域组织团队</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>解决的问题</h3>
            <div class="problems">
              <div class="problem">巨石应用维护难</div>
              <div class="problem">技术栈升级困难</div>
              <div class="problem">团队协作效率低</div>
              <div class="problem">部署周期长</div>
            </div>
          </div>
        </div>

        <div class="architecture-visual">
          <div class="main-app">
            <div class="app-header">主应用 (Shell)</div>
            <div class="apps-container">
              <div class="sub-app" v-for="app in subApps" :key="app.id" :style="{ backgroundColor: app.color }">
                <div class="app-icon">{{ app.icon }}</div>
                <div class="app-name">{{ app.name }}</div>
                <div class="app-tech">{{ app.tech }}</div>
              </div>
            </div>
          </div>
          <div class="legend">
            <div class="legend-item" v-for="app in subApps" :key="app.id">
              <div class="color-box" :style="{ backgroundColor: app.color }"></div>
              <div>{{ app.name }} ({{ app.tech }})</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现方案 -->
      <div class="section">
        <h2>🛠️ 微前端实现方案</h2>
        <div class="solutions-tabs">
          <div class="tabs-header">
            <div v-for="(tab, index) in solutionTabs" :key="index" class="tab" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </div>
          </div>
          <div class="tabs-content">
            <div v-if="activeTab === 0" class="solution-content">
              <h3>路由分发方案</h3>
              <p>根据URL路由将不同子应用加载到主容器中</p>

              <div class="code-columns">
                <div class="code-block">
                  <h4>主应用配置</h4>
                  <pre>// 主应用路由配置
const routes = [
  {
    path: '/app1/*',
    component: Layout,
    meta: { microApp: 'app1' }
  },
  {
    path: '/app2/*',
    component: Layout,
    meta: { microApp: 'app2' }
  }
];

// 动态加载子应用
const loadMicroApp = (appName) => {
  const script = document.createElement('script');
  script.src = `/${appName}/app.js`;
  document.body.appendChild(script);

  const container = document.getElementById('app-container');
  container.innerHTML = `<${appName}-root></${appName}-root>`;
};</pre>
                </div>
                <div class="code-block">
                  <h4>子应用打包配置</h4>
                  <pre>// webpack.config.js (子应用)
module.exports = {
  output: {
    library: 'app1',
    libraryTarget: 'umd',
    filename: 'app.js'
  }
};

// 子应用入口文件
import React from 'react';
import ReactDOM from 'react-dom';

export function mount() {
  ReactDOM.render(&lt;App /&gt;, document.getElementById('app1-root'));
}

export function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app1-root'));
}</pre>
                </div>
              </div>

              <div class="solution-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>实现简单</li>
                    <li>子应用完全隔离</li>
                    <li>技术栈无关</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>应用切换体验差</li>
                    <li>全局状态共享困难</li>
                    <li>重复依赖加载</li>
                  </ul>
                </div>
              </div>
              <div class="recommend">
                <h4>推荐指数</h4>
                <p>⭐</p>
              </div>
              <div class="scene">
                <h4>适用场景</h4>
                <p>适用于需要完全隔离的子应用，如第三方登录、支付等</p>
              </div>
            </div>

            <div v-if="activeTab === 1" class="solution-content">
              <h3>基于 iframe</h3>
              <p>使用 iframe 技术封装子应用</p>

              <div class="code-columns">
                <div class="code-block">
                  <h4>定义 iframe</h4>
                  <pre>&lt;iframe
src="https://example.com/app1"
width="100%"
height="100%"
frameborder="0"
sandbox="allow-scripts allow-same-origin"
&lt;/iframe&gt;
                  </pre>
                </div>
                <div class="code-block">
                  <h4>通信(postMessage)</h4>
                  <pre>// 主应用
// 主应用发送消息
iframe.contentWindow.postMessage('hello', 'https://example.com');
// 主应用监听消息
window.addEventListener('message', (event) => {
  console.log(event.data);
});

// 子应用监听消息
window.addEventListener('message', (event) => {
  console.log(event.data);
});
                  </pre>
                </div>
              </div>

              <div class="solution-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>实现简单</li>
                    <li>子应用完全隔离</li>
                    <li>技术栈无关</li>
                    <li>浏览器原生支持</li>
                    <li>样式和DOM隔离</li>
                    <li>支持预加载</li>
                    <li>支持缓存</li>
                    <li>支持离线访问</li>
                    <li>支持跨域访问</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>应用切换体验差</li>
                    <li>全局状态共享困难</li>
                    <li>刷新url后，子应用会重新加载</li>
                    <li>UI差，iframe 的样式和DOM隔离，导致样式和DOM隔离</li>
                    <li>性能较差，每个iframe都是一个独立的进程，通信成本高</li>
                    <li>内存共享困难</li>
                    <li>兼容性问题</li>
                    <li>开发体验不完善，需要手动管理iframe的通信</li>
                  </ul>
                </div>
              </div>
              <div class="recommend">
                <h4>推荐指数</h4>
                <p>⭐⭐⭐⭐</p>
              </div>
              <div class="scene">
                <h4>适用场景</h4>
                <p>适用于需要完全隔离的子应用，如第三方登录、支付等</p>
              </div>
            </div>

            <div v-if="activeTab === 2" class="solution-content">
              <h3>基于 Web Components</h3>
              <p>使用浏览器原生组件技术封装子应用</p>

              <div class="code-columns">
                <div class="code-block">
                  <h4>定义Web Component</h4>
                  <pre>class MicroApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div id="app-container"></div>
    `;
    this.mountApp();
  }

  mountApp() {
    const appName = this.getAttribute('app');
    import(`/micro-apps/${appName}.js`)
      .then(module => {
        module.mount(this.shadowRoot.getElementById('app-container'));
      });
  }

  disconnectedCallback() {
    import(`/micro-apps/${this.getAttribute('app')}.js`)
      .then(module => module.unmount());
  }
}

customElements.define('micro-app', MicroApp);</pre>
                </div>
                <div class="code-block">
                  <h4>在HTML中使用</h4>
                  <pre>&lt;!-- 主应用HTML --&gt;
&lt;div class="app-shell"&gt;
  &lt;header&gt;主应用头部&lt;/header&gt;
  &lt;main&gt;
    &lt;micro-app app="dashboard"&gt;&lt;/micro-app&gt;
  &lt;/main&gt;
  &lt;footer&gt;主应用底部&lt;/footer&gt;
&lt;/div&gt;</pre>
                </div>
              </div>

              <div class="solution-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>浏览器原生支持</li>
                    <li>真正的技术栈无关</li>
                    <li>样式和DOM隔离</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>浏览器兼容性问题</li>
                    <li>开发体验不完善</li>
                    <li>社区生态不成熟</li>
                  </ul>
                </div>
              </div>
              <div class="recommend">
                <h4>推荐指数</h4>
                <p>⭐⭐⭐</p>
              </div>
              <div class="scene">
                <h4>适用场景</h4>
                <p> </p>
              </div>
            </div>

            <div v-if="activeTab === 3" class="solution-content">
              <h3>基于框架的方案 (qiankun)</h3>
              <p>蚂蚁金服开源的微前端框架</p>

              <div class="code-columns">
                <div class="code-block">
                  <h4>主应用配置</h4>
                  <pre>import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:7100',
    container: '#subapp-container',
    activeRule: '/react',
    props: {
      user: currentUser,
      onGlobalStateChange: (state, prev) => { /* ... */ }
    }
  },
  {
    name: 'vue-app',
    entry: '//localhost:7101',
    container: '#subapp-container',
    activeRule: '/vue',
  }
]);

// 启动 qiankun
start({
  sandbox: { strictStyleIsolation: true },
  prefetch: 'all'
});</pre>
                </div>
                <div class="code-block">
                  <h4>子应用配置 (Vue)</h4>
                  <pre>// 入口文件 main.js
let instance = null;

function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 生命周期钩子
export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}</pre>
                </div>
              </div>

              <div class="solution-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>功能完善，开箱即用</li>
                    <li>样式和JS沙箱隔离</li>
                    <li>支持预加载</li>
                    <li>完善的社区支持</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>学习曲线较陡峭</li>
                    <li>框架耦合度较高</li>
                    <li>子应用需改造</li>
                  </ul>
                </div>
              </div>
              <div class="recommend">
                <h4>推荐指数</h4>
                <p>⭐⭐⭐⭐</p>
              </div>
              <div class="scene">
                <h4>适用场景</h4>
                <p>适用于SPA应用，如React/Vue/Angular等</p>
              </div>
            </div>

            <div v-if="activeTab === 4" class="solution-content">
              <h3>基于 Module Federation</h3>
              <p>Webpack 5 原生支持的模块联邦技术</p>

              <div class="code-columns">
                <div class="code-block">
                  <h4>主机应用配置</h4>
                  <pre>// webpack.config.js (主机应用)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// React组件中动态加载
const RemoteComponent = React.lazy(() => import('app1/Button'));

function App() {
  return (
    &lt;div&gt;
      &lt;Suspense fallback="Loading Button">
        &lt;RemoteComponent /&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</pre>
                </div>
                <div class="code-block">
                  <h4>远程应用配置</h4>
                  <pre>// webpack.config.js (远程应用)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.js',
        './App': './src/App.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};</pre>
                </div>
              </div>

              <div class="solution-pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>Webpack原生支持</li>
                    <li>按需加载模块</li>
                    <li>共享依赖减少体积</li>
                    <li>开发体验优秀</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要Webpack 5+</li>
                    <li>对非Webpack项目不友好</li>
                    <li>版本管理复杂</li>
                  </ul>
                </div>
              </div>
              <div class="recommend">
                <h4>推荐指数</h4>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
              <div class="scene">
                <h4>适用场景</h4>
                <p>适用于需要完全隔离的子应用，如第三方登录、支付等</p>
              </div>
            </div>

            <div class="code-columns">
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section">
        <h2>🚀 微前端使用场景</h2>
        <div class="use-cases">
          <div class="use-case-card">
            <div class="case-icon">🏢</div>
            <h3>大型企业应用</h3>
            <p>将复杂的企业管理系统拆分为多个子应用，不同团队负责不同业务模块</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">🔄</div>
            <h3>渐进式重构</h3>
            <p>逐步替换遗留系统，新旧系统共存并逐步迁移</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">🌐</div>
            <h3>多团队协作</h3>
            <p>多个团队独立开发、部署各自的前端应用</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">📱</div>
            <h3>跨平台统一体验</h3>
            <p>在多个平台（Web、移动端、桌面端）复用业务模块</p>
          </div>
        </div>

        <div class="case-studies">
          <h3>典型案例分析</h3>
          <div class="case-study">
            <div class="company-logo">淘宝</div>
            <div class="case-content">
              <h4>电商平台微前端实践</h4>
              <ul>
                <li>主应用：提供导航、用户认证等基础服务</li>
                <li>子应用：商品搜索、购物车、订单管理、支付等独立应用</li>
                <li>技术栈：主应用使用React，子应用使用React/Vue/Angular</li>
                <li>方案：基于qiankun的微前端架构</li>
              </ul>
            </div>
          </div>
          <div class="case-study">
            <div class="company-logo">Spotify</div>
            <div class="case-content">
              <h4>音乐平台微前端改造</h4>
              <ul>
                <li>挑战：单体应用难以满足快速增长的业务需求</li>
                <li>解决方案：将播放器、歌单、发现、播客等模块拆分为独立应用</li>
                <li>成果：部署频率提高3倍，团队开发效率提升40%</li>
                <li>技术方案：基于Web Components的微前端架构</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 实施建议 -->
      <div class="section">
        <h2>🏆 微前端实施建议</h2>
        <div class="recommendations">
          <div class="recommendation-card">
            <div class="rec-number">1</div>
            <div class="rec-content">
              <h3>明确边界划分</h3>
              <p>根据业务领域而非技术划分微应用边界，确保高内聚低耦合</p>
            </div>
          </div>
          <div class="recommendation-card">
            <div class="rec-number">2</div>
            <div class="rec-content">
              <h3>统一设计系统</h3>
              <p>建立共享的设计系统和UI组件库，保持用户体验一致</p>
            </div>
          </div>
          <div class="recommendation-card">
            <div class="rec-number">3</div>
            <div class="rec-content">
              <h3>标准化通信机制</h3>
              <p>使用Custom Events或状态管理库实现应用间通信</p>
            </div>
          </div>
          <div class="recommendation-card">
            <div class="rec-number">4</div>
            <div class="rec-content">
              <h3>自动化部署流水线</h3>
              <p>为每个微应用建立独立的CI/CD流水线</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 技术选型 -->
      <div class="section">
        <h2>🔍 技术方案对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>技术栈</th>
                <th>隔离性</th>
                <th>复杂度</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>路由分发</td>
                <td>无限制</td>
                <td>高</td>
                <td>低</td>
                <td>简单应用，技术栈差异大</td>
              </tr>
              <tr>
                <td>Web Components</td>
                <td>浏览器原生</td>
                <td>高</td>
                <td>中</td>
                <td>长期项目，技术栈多样</td>
              </tr>
              <tr>
                <td>qiankun</td>
                <td>JavaScript</td>
                <td>中高</td>
                <td>中高</td>
                <td>企业级应用，React/Vue为主</td>
              </tr>
              <tr>
                <td>Module Federation</td>
                <td>Webpack 5+</td>
                <td>中</td>
                <td>高</td>
                <td>模块共享，技术栈统一</td>
              </tr>
              <tr>
                <td>Single-SPA</td>
                <td>JavaScript</td>
                <td>中</td>
                <td>高</td>
                <td>定制化需求高</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer>
      <p>微前端架构指南  | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 子应用数据
const subApps = ref([
  { id: 1, name: '用户中心', tech: 'Vue 3', icon: '👤', color: '#a78bfa' },
  { id: 2, name: '数据分析', tech: 'React 18', icon: '📊', color: '#fbbf24' },
  { id: 3, name: '订单管理', tech: 'Angular 15', icon: '📦', color: '#34d399' },
  { id: 4, name: '支付系统', tech: 'Svelte', icon: '💳', color: '#60a5fa' },
  { id: 5, name: '消息通知', tech: 'Lit', icon: '🔔', color: '#f472b6' }
]);

// 解决方案标签页
const solutionTabs = ref([
  { title: '路由分发' },
  { title: 'iframe' },
  { title: 'Web Components' },
  { title: 'qiankun' },
  { title: 'Module Federation' }
]);

const activeTab = ref(2); // 默认选中qiankun方案
</script>

<style lang="less" scoped>


.micro-frontend-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .recommend {
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .scene {

    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4f46e5;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4f46e5;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #4f46e5;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p,
      ul {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #4f46e5;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .problems {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .problem {
          background: #eef2ff;
          color: #4f46e5;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .architecture-visual {
    background: white;
    border-radius: 10px;
    padding: 25px;
    margin-top: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .main-app {
      border: 2px solid #4f46e5;
      border-radius: 8px;
      overflow: hidden;

      .app-header {
        background: #4f46e5;
        color: white;
        padding: 12px;
        text-align: center;
        font-weight: 600;
      }

      .apps-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 20px;
        padding: 20px;
      }
    }

    .sub-app {
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .app-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .app-name {
        font-weight: 600;
        margin-bottom: 5px;
      }

      .app-tech {
        font-size: 0.8rem;
        background: rgba(255, 255, 255, 0.7);
        padding: 3px 8px;
        border-radius: 10px;
        display: inline-block;
      }
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;

        .color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }
      }
    }
  }

  .solutions-tabs {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    .tabs-header {
      display: flex;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;

      .tab {
        padding: 15px 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        border-bottom: 3px solid transparent;

        &:hover {
          background: #ede9fe;
        }

        &.active {
          color: #4f46e5;
          border-bottom: 3px solid #4f46e5;
          background: #f5f3ff;
        }
      }
    }

    .tabs-content {
      padding: 25px;

      .solution-content {
        h3 {
          font-size: 1.4rem;
          color: #4f46e5;
          margin-top: 0;
          margin-bottom: 15px;
        }

        p {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 20px;
        }
      }
    }
  }

  .code-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .code-block {
      background: #f8fafc;
      border-radius: 8px;
      padding: 15px;
      border: 1px solid #e2e8f0;

      h4 {
        font-size: 1.1rem;
        color: #4f46e5;
        margin-top: 0;
        margin-bottom: 10px;
      }

      pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 15px;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        overflow-x: auto;
        line-height: 1.5;
        margin: 0;
      }
    }
  }

  .solution-pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;

    .pros,
    .cons {
      border-radius: 8px;
      padding: 20px;

      h4 {
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 1.1rem;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4f46e5;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }

    .pros {
      background: #f0fdf4;
      border-left: 4px solid #34d399;
    }

    .cons {
      background: #fef2f2;
      border-left: 4px solid #f87171;
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .use-case-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #4f46e5;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .case-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        color: #4f46e5;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #64748b;
        margin: 0;
        line-height: 1.5;
      }
    }
  }

  .case-studies {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.3rem;
      color: #4f46e5;
      margin-top: 0;
      margin-bottom: 20px;
    }

    .case-study {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .company-logo {
        min-width: 100px;
        height: 100px;
        background: #ede9fe;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #4f46e5;
      }

      .case-content {
        h4 {
          font-size: 1.2rem;
          color: #4f46e5;
          margin-top: 0;
          margin-bottom: 15px;
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 10px;
            position: relative;
            font-size: 0.95rem;
            color: #475569;

            &::before {
              content: '•';
              color: #4f46e5;
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }
    }
  }

  .recommendations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .recommendation-card {
      display: flex;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .rec-number {
        background: #4f46e5;
        color: white;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 15px;
      }

      .rec-content {
        h3 {
          font-size: 1.2rem;
          color: #4f46e5;
          margin-top: 0;
          margin-bottom: 8px;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      overflow: hidden;

      th,
      td {
        padding: 16px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
      }

      thead {
        background: linear-gradient(to right, #4f46e5, #7c3aed);
        color: white;

        th {
          font-weight: 600;
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: #f9f9f9;
          }

          &:hover {
            background-color: #f5f3ff;
          }
        }
      }
    }
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }
  }
}
</style>
