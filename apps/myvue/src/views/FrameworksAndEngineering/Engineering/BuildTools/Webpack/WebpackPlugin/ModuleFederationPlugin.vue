<template>
  <div class="module-federation-guide">
    <header>
      <h1>Webpack 模块联邦基本介绍</h1>
      <p>解锁跨应用模块共享的终极解决方案</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">2020</div>
          <div class="stat-label">首次发布</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">5.0+</div>
          <div class="stat-label">Webpack版本要求</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 模块联邦概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>什么是模块联邦？</h3>
            <p>模块联邦(Module Federation)是Webpack 5引入的革命性功能，允许在独立构建的应用间动态共享代码。</p>
            <div class="feature-badge">跨应用共享</div>
            <div class="feature-badge">运行时加载</div>
            <div class="feature-badge">依赖去重</div>
          </div>
          <div class="overview-card">
            <h3>解决的问题</h3>
            <ul>
              <li>微前端架构中的模块共享</li>
              <li>避免多应用重复打包相同依赖</li>
              <li>独立部署共享组件</li>
              <li>跨团队代码复用</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>核心优势</h3>
            <div class="advantages">
              <div class="advantage">
                <div class="icon">🚀</div>
                <div>减少构建体积</div>
              </div>
              <div class="advantage">
                <div class="icon">🔄</div>
                <div>实时更新</div>
              </div>
              <div class="advantage">
                <div class="icon">🧩</div>
                <div>灵活组合</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工作原理 -->
      <div class="section">
        <h2>⚙️ 模块联邦工作原理</h2>
        <div class="workflow">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>定义远程模块</h3>
              <p>应用通过ModuleFederationPlugin暴露模块</p>
              <pre class="code-block">new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './Header': './src/components/Header'
  }
})</pre>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>消费远程模块</h3>
              <p>其他应用通过配置引用远程模块</p>
              <pre class="code-block">new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js'
  }
})</pre>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>动态加载模块</h3>
              <p>在代码中按需加载远程模块</p>
              <pre class="code-block">// React示例
const RemoteButton = React.lazy(() => import('app1/Button'));

function App() {
  return (
    &lt;Suspense fallback="Loading..."&gt;
      &lt;RemoteButton /&gt;
    &lt;/Suspense&gt;
  );
}</pre>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>运行时集成</h3>
              <p>Webpack在运行时动态加载远程模块并集成到当前应用</p>
              <div class="runtime-visual">
                <div class="host-app">Host App</div>
                <div class="remote-module">app1/Button</div>
                <div class="integration">⬌ 动态集成 ⬌</div>
                <div class="remote-app">Remote App</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 配置基本介绍 -->
      <div class="section">
        <h2>🔧 配置项基本介绍</h2>
        <div class="configuration-grid">
          <div class="config-card">
            <h3>核心配置</h3>
            <div class="config-option">
              <div class="option-name">name <span class="required">必需</span></div>
              <div class="option-desc">当前应用唯一标识符</div>
              <pre class="code-block">name: 'app_name'</pre>
            </div>

            <div class="config-option">
              <div class="option-name">filename</div>
              <div class="option-desc">远程入口文件名（默认remoteEntry.js）</div>
              <pre class="code-block">filename: 'my_remote_entry.js'</pre>
            </div>

            <div class="config-option">
              <div class="option-name">remotes</div>
              <div class="option-desc">引用的远程模块映射</div>
              <pre class="code-block">remotes: {
  app1: 'app1@http://example.com/remoteEntry.js'
}</pre>
            </div>
          </div>

          <div class="config-card">
            <h3>模块暴露配置</h3>
            <div class="config-option">
              <div class="option-name">exposes</div>
              <div class="option-desc">暴露给其他应用的模块</div>
              <pre class="code-block">exposes: {
  './Button': './src/components/Button',
  './Widget': {
    import: './src/components/Widget',
    name: 'special_widget'
  }
}</pre>
            </div>

            <div class="config-option">
              <div class="option-name">expose 高级配置</div>
              <div class="option-desc">
                <ul>
                  <li><strong>import</strong>: 模块路径</li>
                  <li><strong>name</strong>: 自定义模块名</li>
                  <li><strong>eager</strong>: 是否预加载</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="config-card">
            <h3>共享依赖配置</h3>
            <div class="config-option">
              <div class="option-name">shared</div>
              <div class="option-desc">共享的依赖项配置</div>
              <pre class="code-block">shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.0.0'
  },
  'react-dom': {
    singleton: true,
    eager: true
  }
}</pre>
            </div>

            <div class="config-option">
              <div class="option-name">shared 配置项</div>
              <div class="option-desc">
                <ul>
                  <li><strong>singleton</strong>: 是否只使用单个版本</li>
                  <li><strong>requiredVersion</strong>: 要求的版本范围</li>
                  <li><strong>eager</strong>: 是否立即加载</li>
                  <li><strong>strictVersion</strong>: 是否严格匹配版本</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section">
        <h2>🚀 模块联邦使用场景</h2>
        <div class="use-cases">
          <div class="use-case-card">
            <div class="case-icon">🧩</div>
            <h3>微前端架构</h3>
            <p>在微前端中共享公共组件和工具库</p>
            <div class="case-badge">跨应用共享</div>
          </div>
          <div class="use-case-card">
            <div class="case-icon">📚</div>
            <h3>组件库共享</h3>
            <p>独立部署和更新共享组件库</p>
            <div class="case-badge">独立部署</div>
          </div>
          <div class="use-case-card">
            <div class="case-icon">🔄</div>
            <h3>多应用共享依赖</h3>
            <p>避免重复打包React等大型库</p>
            <div class="case-badge">依赖优化</div>
          </div>
          <div class="use-case-card">
            <div class="case-icon">🚀</div>
            <h3>插件化架构</h3>
            <p>动态加载功能插件</p>
            <div class="case-badge">动态扩展</div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="section">
        <h2>🏆 最佳实践指南</h2>
        <div class="best-practices">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>版本管理策略</h3>
              <p>使用语义化版本控制共享模块，避免破坏性变更</p>
              <pre class="code-block">shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.1.0'
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>依赖共享策略</h3>
              <p>合理配置singleton和eager选项，平衡性能和一致性</p>
              <pre class="code-block">shared: {
  'react-dom': {
    singleton: true, // 确保单例
    eager: false     // 按需加载
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>错误处理</h3>
              <p>实现模块加载失败时的优雅降级</p>
              <pre class="code-block">const RemoteComponent = React.lazy(() => import('app1/Button')
  .catch(() => ({
    default: () => &lt;div&gt;组件加载失败&lt;/div&gt;
  }))
);</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <div class="practice-content">
              <h3>性能优化</h3>
              <p>使用预加载和代码分割优化加载性能</p>
              <pre class="code-block">// webpack配置
remotes: {
  app1: 'app1@http://cdn.example.com/remoteEntry.js'
},
// 预加载重要模块
shared: {
  'react': { eager: true }
}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 完整示例 -->
      <div class="section">
        <h2>💻 完整配置示例</h2>
        <div class="full-example">
          <div class="example-tabs">
            <div v-for="(tab, index) in exampleTabs" :key="index" class="tab"
              :class="{ active: activeExampleTab === index }" @click="activeExampleTab = index">
              {{ tab.title }}
            </div>
          </div>

          <div class="example-content">
            <div v-if="activeExampleTab === 0">
              <h3>远程应用配置 (React)</h3>
              <pre class="code-block">// webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'component_lib',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.jsx',
        './Card': './src/components/Card.jsx',
        './Header': './src/components/Header.jsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0'
        }
      }
    })
  ]
};</pre>
            </div>

            <div v-if="activeExampleTab === 1">
              <h3>主机应用配置 (Vue)</h3>
              <pre class="code-block">// webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_app',
      remotes: {
        component_lib: 'component_lib@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.2.0'
        }
      }
    })
  ]
};</pre>
            </div>

            <div v-if="activeExampleTab === 2">
              <h3>Vue组件中使用远程React组件</h3>
              <pre class="code-block">&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;h1&gt;Vue主机应用&lt;/h1&gt;
    &lt;Suspense&gt;
      &lt;RemoteButton /&gt;
      &lt;template #fallback&gt;
        加载远程按钮中...
      &lt;/template&gt;
    &lt;/Suspense&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { defineAsyncComponent, ref } from 'vue';

const RemoteButton = defineAsyncComponent(() =>
  import('component_lib/Button')
    .then(module => module.default)
    .catch(() => ({
      template: '&lt;div&gt;按钮加载失败&lt;/div&gt;'
    }))
);
&lt;/script&gt;</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>Webpack 模块联邦指南 © 2023 | 使用 Vue 3 + TypeScript 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const exampleTabs = ref([
  { title: '远程应用配置' },
  { title: '主机应用配置' },
  { title: '组件使用示例' }
]);

const activeExampleTab = ref(0);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.module-federation-guide {
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
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
      color: #1d4ed8;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #dbeafe;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #1d4ed8;
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
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #dbeafe;

      h3 {
        font-size: 1.3rem;
        color: #1d4ed8;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
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
            color: #3b82f6;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .feature-badge {
        display: inline-block;
        background: #dbeafe;
        color: #1d4ed8;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
        margin-right: 8px;
        margin-bottom: 10px;
      }

      .advantages {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;

        .advantage {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          background: #eff6ff;
          border-radius: 8px;

          .icon {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  .workflow {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .workflow-step {
    display: flex;
    gap: 20px;

    .step-number {
      background: #3b82f6;
      color: white;
      min-width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .step-content {
      flex-grow: 1;

      h3 {
        font-size: 1.3rem;
        color: #1d4ed8;
        margin-top: 0;
        margin-bottom: 15px;
      }

      .runtime-visual {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        padding: 20px;
        background: #eff6ff;
        border-radius: 8px;

        .host-app,
        .remote-app {
          padding: 15px 25px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          font-weight: 600;
        }

        .remote-module {
          padding: 10px 15px;
          background: #dbeafe;
          color: #1d4ed8;
          border-radius: 6px;
          font-family: monospace;
        }

        .integration {
          color: #3b82f6;
          font-weight: 500;
        }
      }
    }
  }

  .configuration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .config-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #dbeafe;

      h3 {
        font-size: 1.3rem;
        color: #1d4ed8;
        margin-top: 0;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #dbeafe;
      }
    }
  }

  .config-option {
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }

    .option-name {
      font-weight: 600;
      color: #1d4ed8;
      margin-bottom: 8px;
      font-size: 1.1rem;

      .required {
        background: #fee2e2;
        color: #dc2626;
        font-size: 0.7rem;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    .option-desc {
      font-size: 0.95rem;
      color: #475569;
      margin-bottom: 12px;
      line-height: 1.5;

      ul {
        padding-left: 20px;
        margin-top: 10px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #3b82f6;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .use-case-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #3b82f6;
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
        color: #1d4ed8;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #64748b;
        margin-bottom: 15px;
        line-height: 1.5;
      }

      .case-badge {
        display: inline-block;
        background: #dbeafe;
        color: #1d4ed8;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }
  }

  .best-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .practice-card {
      display: flex;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #dbeafe;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .practice-number {
        background: #3b82f6;
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
        flex-shrink: 0;
      }

      .practice-content {
        h3 {
          font-size: 1.2rem;
          color: #1d4ed8;
          margin-top: 0;
          margin-bottom: 10px;
        }

        p {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 15px;
          line-height: 1.5;
        }
      }
    }
  }

  .full-example {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #dbeafe;

    .example-tabs {
      display: flex;
      background: #eff6ff;
      border-bottom: 1px solid #dbeafe;

      .tab {
        padding: 15px 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        border-bottom: 3px solid transparent;

        &:hover {
          background: #dbeafe;
        }

        &.active {
          color: #1d4ed8;
          border-bottom: 3px solid #1d4ed8;
          background: #dbeafe;
        }
      }
    }

    .example-content {
      padding: 25px;
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
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

    .workflow-step {
      flex-direction: column;
      gap: 10px;

      .step-number {
        margin-top: 0;
      }
    }
  }
}
</style>
