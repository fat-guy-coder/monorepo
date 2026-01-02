<template>
  <div class="qiankun-container">
    <header class="header">
      <div class="logo-container">
        <div class="logo">Q</div>
        <h1>乾坤微前端框架</h1>
      </div>
      <p class="subtitle">构建可扩展的企业级微前端应用 <a href="https://qiankun.umijs.org/" target="_blank">官方文档</a></p>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span class="icon">{{ item.icon }}</span>
            <span class="text">{{ item.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <section v-show="activeSection === 'introduction'" class="section">
          <h2>什么是乾坤？</h2>
          <div class="definition-card">
            <p><strong>乾坤（qiankun）</strong>是一个基于 <span class="highlight">single-spa</span> 的微前端实现库，由蚂蚁金服团队开发并开源。</p>
          </div>

          <div class="features">
            <div class="feature-card">
              <div class="feature-icon">📦</div>
              <h3>技术栈无关</h3>
              <p>主框架与技术栈无关，兼容各种前端框架</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>高性能</h3>
              <p>子应用独立运行时，资源按需加载</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔧</div>
              <h3>简单易用</h3>
              <p>提供核心API，接入成本低，学习曲线平缓</p>
            </div>
          </div>

          <div class="architecture">
            <h3>架构图</h3>
            <div class="architecture-diagram">
              <div class="main-app">主应用</div>
              <div class="arrows">⇅</div>
              <div class="sub-apps">
                <div class="app">子应用A</div>
                <div class="app">子应用B</div>
                <div class="app">子应用C</div>
              </div>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'usage'" class="section">
          <h2>如何使用乾坤</h2>

          <div class="step">
            <h3>1. 主应用安装乾坤</h3>
            <pre><code class="language-bash">npm install qiankun -S</code></pre>
          </div>

          <div class="step">
            <h3>2. 主应用注册子应用</h3>
            <pre><code class="language-javascript">import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'vue-app',
    entry: '//localhost:7100',
    container: '#subapp-viewport',
    activeRule: '/vue',
  },
  {
    name: 'react-app',
    entry: '//localhost:7101',
    container: '#subapp-viewport',
    activeRule: '/react',
  },
]);

start();</code></pre>
          </div>

          <div class="step">
            <h3>3. 子应用导出生命周期钩子</h3>
            <pre><code class="language-javascript">// Vue 子应用
import Vue from 'vue';

let app = null;

function render(props) {
  const { container } = props;
  app = new Vue({
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  app.$destroy();
}</code></pre>
          </div>

          <div class="step">
            <h3>4. 子应用配置打包工具</h3>
            <pre><code class="language-javascript">// vue.config.js
module.exports = {
  devServer: {
    port: 7100,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: 'vueApp',
      libraryTarget: 'umd',
    },
  },
};</code></pre>
          </div>
        </section>

        <section v-show="activeSection === 'best-practices'" class="section">
          <h2>最佳实践</h2>

          <div class="practice">
            <div class="practice-icon">🔒</div>
            <div class="practice-content">
              <h3>样式隔离</h3>
              <p>使用乾坤提供的沙箱功能，开启样式隔离，避免子应用间样式冲突</p>
              <pre><code class="language-javascript">start({ sandbox: { experimentalStyleIsolation: true } });</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="practice-icon">📡</div>
            <div class="practice-content">
              <h3>应用间通信</h3>
              <p>使用官方推荐的通信方案 initGlobalState</p>
              <pre><code class="language-javascript">// 主应用
import { initGlobalState } from 'qiankun';

const state = { user: 'admin' };
const actions = initGlobalState(state);

// 子应用
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    console.log('状态变更：', state, prev);
  });

  props.setGlobalState({ user: 'user123' });
}</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="practice-icon">🚀</div>
            <div class="practice-content">
              <h3>预加载策略</h3>
              <p>优化用户体验，配置子应用预加载</p>
              <pre><code class="language-javascript">import { prefetchApps } from 'qiankun';

prefetchApps([
  { name: 'vue-app', entry: '//localhost:7100' },
  { name: 'react-app', entry: '//localhost:7101' },
]);</code></pre>
            </div>
          </div>
        </section>

        <section v-show="activeSection === 'comparison'" class="section">
          <h2>与其他方案的对比</h2>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>乾坤</th>
                  <th>Single-SPA</th>
                  <th>Web Components</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>学习曲线</td>
                  <td>⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️</td>
                  <td>⭐️⭐️⭐️⭐️⭐️</td>
                </tr>
                <tr>
                  <td>样式隔离</td>
                  <td>✅ 内置支持</td>
                  <td>❌ 需手动实现</td>
                  <td>✅ Shadow DOM</td>
                </tr>
                <tr>
                  <td>JS沙箱</td>
                  <td>✅ 内置支持</td>
                  <td>❌ 需手动实现</td>
                  <td>✅ 原生支持</td>
                </tr>
                <tr>
                  <td>资源预加载</td>
                  <td>✅ 支持</td>
                  <td>⚠️ 需要额外配置</td>
                  <td>⚠️ 需要额外配置</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>完整的微前端解决方案</li>
                <li>完善的文档和社区支持</li>
                <li>支持多种前端框架</li>
                <li>丰富的功能（沙箱、预加载等）</li>
                <li>在生产环境有大量验证</li>
              </ul>
            </div>
            <div class="cons">
              <h3>注意事项</h3>
              <ul>
                <li>子应用需要适配生命周期钩子</li>
                <li>主应用需要管理子应用的状态</li>
                <li>复杂的路由管理需要额外设计</li>
                <li>调试相对复杂</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>了解更多乾坤微前端框架：</p>
      <div class="links">
        <a href="https://qiankun.umijs.org/" target="_blank">官方文档</a>
        <a href="https://github.com/umijs/qiankun" target="_blank">GitHub仓库</a>
      </div>
      <p class="copyright">© 2024 乾坤微前端框架介绍页面 - 仅供学习使用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSection = ref('introduction');

const navItems = [
  { id: 'introduction', title: '框架介绍', icon: '📚' },
  { id: 'usage', title: '使用指南', icon: '🛠️' },
  { id: 'best-practices', title: '最佳实践', icon: '🏆' },
  { id: 'comparison', title: '方案对比', icon: '⚖️' }
];
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@light-bg: #f8f9fa;
@border-color: #eaeaea;
@text-color: #333;
@light-text: #666;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;
@box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

.qiankun-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, @primary-color, #1a56db);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: @box-shadow;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;

    .logo {
      width: 50px;
      height: 50px;
      background: white;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin: 0;
      font-weight: 600;
      font-size: 1.8rem;
    }
  }

  .subtitle {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.content-container {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
}

.sidebar {
  width: 220px;
  background: white;
  border-radius: 8px;
  box-shadow: @box-shadow;
  padding: 1rem 0;
  align-self: flex-start;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: @light-bg;
        color: @primary-color;
      }

      &.active {
        background: fade(@primary-color, 10%);
        color: @primary-color;
        border-right: 3px solid @primary-color;
        font-weight: 500;
      }

      .icon {
        font-size: 1.1rem;
      }

      .text {
        font-size: 0.95rem;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section {
  background: white;
  border-radius: 8px;
  box-shadow: @box-shadow;
  padding: 1.5rem 2rem;

  h2 {
    color: @secondary-color;
    border-bottom: 2px solid @primary-color;
    padding-bottom: 0.5rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  h3 {
    color: @secondary-color;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0.75rem 0;
  }
}

.definition-card {
  background: fade(@primary-color, 7%);
  border-left: 4px solid @primary-color;
  padding: 1rem 1.5rem;
  border-radius: 0 4px 4px 0;
  margin: 1.5rem 0;

  p {
    margin: 0;

    strong {
      color: @primary-color;
    }

    .highlight {
      background: fade(@primary-color, 15%);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      color: darken(@primary-color, 10%);
      font-weight: 500;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  p {
    color: @light-text;
    font-size: 0.9rem;
    margin: 0;
  }
}

.architecture {
  margin: 2rem 0;

  .architecture-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;

    .main-app {
      background: @primary-color;
      color: white;
      padding: 1.5rem 3rem;
      border-radius: 8px;
      font-weight: bold;
      box-shadow: @box-shadow;
    }

    .arrows {
      font-size: 1.5rem;
      color: @primary-color;
    }

    .sub-apps {
      display: flex;
      gap: 1.5rem;

      .app {
        background: fade(@primary-color, 15%);
        color: @primary-color;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        box-shadow: @box-shadow;
      }
    }
  }
}

.step {
  margin: 1.5rem 0;

  pre {
    background: #2d2d2d;
    color: #f5f5f5;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    box-shadow: @box-shadow;
  }
}

.practice {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  align-items: flex-start;

  .practice-icon {
    font-size: 1.8rem;
    background: fade(@primary-color, 10%);
    color: @primary-color;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .practice-content {
    flex: 1;

    pre {
      background: #2d2d2d;
      color: #f5f5f5;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: center;
      border: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 10%);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: @light-bg;
    }

    td:nth-child(1) {
      text-align: left;
      font-weight: 500;
    }

    .highlight {
      background: fade(@success-color, 15%);
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .pros,
  .cons {
    border-radius: 8px;
    padding: 1.5rem;
  }

  .pros {
    background: fade(@success-color, 10%);
    border-left: 4px solid @success-color;

    h3 {
      color: @success-color;
    }
  }

  .cons {
    background: fade(@warning-color, 10%);
    border-left: 4px solid @warning-color;

    h3 {
      color: @warning-color;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 1rem 0;

    li {
      margin: 0.5rem 0;
    }
  }
}

.footer {
  background: @secondary-color;
  color: white;
  padding: 1.5rem;
  text-align: center;
  margin-top: 2rem;

  p {
    margin: 0.5rem 0;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 1rem 0;

    a {
      color: #a0c4ff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: white;
      }
    }
  }

  .copyright {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 1rem;

    ul {
      display: flex;
      overflow-x: auto;

      li {
        white-space: nowrap;
      }
    }
  }

  .features {
    grid-template-columns: 1fr;
  }

  .architecture-diagram {
    .sub-apps {
      flex-direction: column;
    }
  }
}
</style>
