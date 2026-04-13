<template>
  <div class="module-federation-container">
    <header class="header">
      <h1>Webpack 模块联邦原理剖析</h1>
      <p class="subtitle">深入理解微前端架构的核心技术</p>
    </header>

    <div class="toc-container">
      <div class="toc-card">
        <h2 class="toc-title">内容导航</h2>
        <ul class="toc-list">
          <li v-for="item in toc" :key="item.id">
            <a :href="`#${item.id}`" class="toc-link">
              <i class="toc-icon">→</i>
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="content-section">
      <section id="overview" class="section">
        <h2 class="section-title">
          <i class="section-icon">🔍</i>
          模块联邦概述
        </h2>
        <div class="section-content">
          <p>
            Webpack 模块联邦（Module Federation）是 Webpack 5
            引入的一项革命性功能，它允许在独立的应用程序之间共享代码和依赖项。
            这种技术使得微前端架构能够真正实现独立部署和运行时集成。
          </p>
          <div class="core-principle">
            <h3>核心原理</h3>
            <p>
              <strong>动态加载远程模块</strong> - 在运行时从其他独立部署的应用程序中加载模块<br />
              <strong>共享依赖</strong> - 在主机和远程应用之间共享公共依赖项<br />
              <strong>去中心化架构</strong> - 每个应用都可以作为主机或远程应用<br />
              <strong>运行时集成</strong> - 不需要在构建时集成所有代码
            </p>
          </div>
        </div>
      </section>

      <section id="architecture" class="section">
        <h2 class="section-title">
          <i class="section-icon">🏗️</i>
          系统架构
        </h2>
        <div class="section-content">
          <div class="architecture-diagram">
            <div class="architecture-row">
              <div class="app-card host">
                <div class="app-header">主机应用 (Host)</div>
                <div class="app-modules">
                  <div class="module">模块 A</div>
                  <div class="module">模块 B</div>
                  <div class="module remote-module">远程模块 X</div>
                </div>
                <div class="app-footer">Webpack</div>
              </div>

              <div class="connection">
                <div class="connection-line"></div>
                <div class="connection-label">模块联邦</div>
              </div>

              <div class="app-card remote">
                <div class="app-header">远程应用 (Remote)</div>
                <div class="app-modules">
                  <div class="module shared">共享依赖</div>
                  <div class="module exposed">模块 X</div>
                  <div class="module">模块 Y</div>
                </div>
                <div class="app-footer">Webpack</div>
              </div>
            </div>

            <div class="architecture-legend">
              <div class="legend-item">
                <div class="color-box host"></div>
                <span>主机应用</span>
              </div>
              <div class="legend-item">
                <div class="color-box remote"></div>
                <span>远程应用</span>
              </div>
              <div class="legend-item">
                <div class="color-box shared"></div>
                <span>共享依赖</span>
              </div>
              <div class="legend-item">
                <div class="color-box exposed"></div>
                <span>暴露的模块</span>
              </div>
            </div>
          </div>

          <div class="architecture-desc">
            <h3>架构关键点：</h3>
            <ul>
              <li><strong>主机应用 (Host)</strong> - 消费远程模块的应用</li>
              <li><strong>远程应用 (Remote)</strong> - 提供模块给其他应用使用的应用</li>
              <li><strong>共享作用域 (Shared Scope)</strong> - 用于共享公共依赖项</li>
              <li><strong>容器 (Container)</strong> - 每个应用都是一个容器，可以消费其他容器</li>
              <li><strong>覆盖机制</strong> - 当多个版本共享时，选择最高兼容版本</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" class="section">
        <h2 class="section-title">
          <i class="section-icon">🔄</i>
          工作流程
        </h2>
        <div class="section-content">
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>远程应用配置</h3>
                <p>在 Webpack 配置中暴露模块：</p>
                <pre class="code-block">
new ModuleFederationPlugin({
  name: 'remote_app',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
  },
  shared: ['react', 'react-dom']
})</pre
                >
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>主机应用配置</h3>
                <p>在 Webpack 配置中引用远程应用：</p>
                <pre class="code-block">
new ModuleFederationPlugin({
  name: 'host_app',
  remotes: {
    remote_app: 'remote_app@http://example.com/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})</pre
                >
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>运行时加载</h3>
                <p>主机应用动态加载远程模块：</p>
                <pre class="code-block">
const RemoteButton = React.lazy(() =>
  import('remote_app/Button')
);</pre
                >
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>共享依赖解析</h3>
                <p>Webpack 创建共享作用域，加载并管理共享依赖：</p>
                <pre class="code-block">
__webpack_require__.S = (global) => {
  // 共享作用域管理
  // 检查依赖版本兼容性
  // 加载最高兼容版本
}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="core-mechanism" class="section">
        <h2 class="section-title">
          <i class="section-icon">⚙️</i>
          核心机制
        </h2>
        <div class="section-content">
          <div class="mechanism-grid">
            <div class="mechanism-card">
              <h3>1. 容器初始化</h3>
              <p>当主机应用启动时，会加载远程应用的入口文件（remoteEntry.js），该文件包含：</p>
              <ul>
                <li>远程模块的映射表</li>
                <li>共享依赖的版本信息</li>
                <li>初始化函数和加载逻辑</li>
              </ul>
            </div>

            <div class="mechanism-card">
              <h3>2. 模块加载协议</h3>
              <p>当主机应用请求远程模块时：</p>
              <pre class="code-block">
// 1. 检查共享依赖
// 2. 加载远程模块容器
// 3. 从容器中获取模块工厂
// 4. 执行工厂函数创建模块实例</pre
              >
            </div>

            <div class="mechanism-card">
              <h3>3. 共享依赖管理</h3>
              <p>Webpack 使用共享作用域（__webpack_require__.S）来：</p>
              <ul>
                <li>存储所有共享依赖</li>
                <li>解决版本冲突（使用语义化版本控制）</li>
                <li>确保所有应用使用相同的依赖实例</li>
              </ul>
            </div>

            <div class="mechanism-card">
              <h3>4. 异步加载机制</h3>
              <p>模块联邦使用 Webpack 的动态导入功能：</p>
              <pre class="code-block">
// 底层使用 promise 链
__webpack_require__.e("remote_app_Button")
  .then(__webpack_require__.bind(__webpack_require__,
        "remote_app/Button"))
  .then(module => {
    // 使用模块
  });</pre
              >
            </div>
          </div>
        </div>
      </section>

      <section id="config-reference" class="section">
        <h2 class="section-title">
          <i class="section-icon">⚙️</i>
          配置参考
        </h2>
        <div class="section-content">
          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>说明</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>string</td>
                  <td>应用唯一标识</td>
                  <td><code>name: 'app1'</code></td>
                </tr>
                <tr>
                  <td><code>filename</code></td>
                  <td>string</td>
                  <td>远程入口文件名</td>
                  <td><code>filename: 'remoteEntry.js'</code></td>
                </tr>
                <tr>
                  <td><code>remotes</code></td>
                  <td>object</td>
                  <td>引用的远程应用</td>
                  <td><code>remotes: { app2: 'app2@[url]' }</code></td>
                </tr>
                <tr>
                  <td><code>exposes</code></td>
                  <td>object</td>
                  <td>暴露给其他应用的模块</td>
                  <td><code>exposes: { './Button': './src/Button' }</code></td>
                </tr>
                <tr>
                  <td><code>shared</code></td>
                  <td>array/object</td>
                  <td>共享的依赖项</td>
                  <td><code>shared: ['react', 'react-dom']</code></td>
                </tr>
                <tr>
                  <td><code>library</code></td>
                  <td>object</td>
                  <td>模块导出类型</td>
                  <td><code>library: { type: 'var', name: 'app1' }</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-details">
            <h3>共享依赖高级配置</h3>
            <pre class="code-block">
shared: {
  react: {
    requiredVersion: '^17.0.0',
    singleton: true, // 只允许单个实例
    eager: true      // 立即加载而非异步
  },
  'react-dom': {
    requiredVersion: '^17.0.0',
    singleton: true
  }
}</pre
            >
          </div>
        </div>
      </section>

      <section id="advantages" class="section">
        <h2 class="section-title">
          <i class="section-icon">🚀</i>
          优势与挑战
        </h2>
        <div class="section-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>优势</h3>
              <ul>
                <li><strong>独立部署</strong> - 每个应用可以独立构建和部署</li>
                <li><strong>运行时集成</strong> - 不需要在构建时集成所有代码</li>
                <li><strong>代码共享</strong> - 高效共享公共依赖和组件</li>
                <li><strong>团队自治</strong> - 不同团队可以使用不同技术栈</li>
                <li><strong>增量升级</strong> - 逐步替换旧系统组件</li>
              </ul>
            </div>

            <div class="cons">
              <h3>挑战</h3>
              <ul>
                <li><strong>依赖管理</strong> - 共享依赖版本冲突问题</li>
                <li><strong>性能影响</strong> - 初始加载可能需要多个请求</li>
                <li><strong>调试复杂度</strong> - 跨应用调试更困难</li>
                <li><strong>类型安全</strong> - TypeScript 支持需要额外配置</li>
                <li><strong>安全考虑</strong> - 需要确保远程资源的安全性</li>
              </ul>
            </div>
          </div>

          <div class="optimization">
            <h3>最佳实践与优化</h3>
            <ul>
              <li>使用 <code>singleton: true</code> 确保共享依赖单例</li>
              <li>合理设置 <code>requiredVersion</code> 约束版本范围</li>
              <li>对关键共享依赖使用 <code>eager: true</code> 预加载</li>
              <li>使用 CDN 分发远程入口文件</li>
              <li>实现模块联邦的容错和降级机制</li>
              <li>使用类型安全工具（如 @module-federation/typescript）</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Webpack 模块联邦原理介绍  | 前端架构与工程化</p>
      <p class="version">Webpack 5+ | 模块联邦 API v1.0</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toc = ref([
  { id: 'overview', title: '模块联邦概述' },
  { id: 'architecture', title: '系统架构' },
  { id: 'workflow', title: '工作流程' },
  { id: 'core-mechanism', title: '核心机制' },
  { id: 'config-reference', title: '配置参考' },
  { id: 'advantages', title: '优势与挑战' },
])
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.module-federation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-top: 10px;
    opacity: 0.9;
    font-weight: 300;
  }
}

.toc-container {
  margin-bottom: 40px;

  .toc-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border-left: 4px solid @accent-color;
  }

  .toc-title {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.5rem;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }

  .toc-link {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    background: #f9f9ff;
    border-radius: 8px;
    text-decoration: none;
    color: @text-color;
    transition: all 0.3s;
    border-left: 3px solid @primary-color;

    &:hover {
      background: rgba(67, 97, 238, 0.1);
      transform: translateX(5px);
    }

    .toc-icon {
      margin-right: 10px;
      color: @primary-color;
      font-weight: bold;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 40px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  color: @secondary-color;
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;

  .section-icon {
    margin-right: 15px;
    font-size: 1.5rem;
  }
}

.section-content {
  h3 {
    color: @primary-color;
    margin-top: 25px;
    font-size: 1.3rem;
  }

  p {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.architecture-diagram {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid #e8e8ff;
}

.architecture-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.app-card {
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .app-header {
    padding: 15px;
    font-weight: bold;
    text-align: center;
    font-size: 1.1rem;
  }

  .app-modules {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 150px;
  }

  .app-footer {
    padding: 10px;
    text-align: center;
    font-size: 0.9rem;
    color: @text-lighter;
    background: #f0f0f0;
  }
}

.host {
  .app-header {
    background: fade(@primary-color, 20%);
    color: darken(@primary-color, 10%);
  }
}

.remote {
  .app-header {
    background: fade(@accent-color, 20%);
    color: darken(@accent-color, 20%);
  }
}

.module {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  background: #f0f0f0;
  font-size: 0.9rem;
}

.remote-module {
  background: fade(@accent-color, 30%);
  border: 1px dashed @accent-color;
}

.exposed {
  background: fade(@success-color, 30%);
  border: 1px dashed @success-color;
}

.shared {
  background: fade(@warning-color, 30%);
  border: 1px dashed @warning-color;
}

.connection {
  text-align: center;

  .connection-line {
    width: 2px;
    height: 100px;
    background: @secondary-color;
    margin: 0 auto;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border: 2px solid @secondary-color;
      border-radius: 50%;
      background: white;
      left: 50%;
      transform: translateX(-50%);
    }

    &::before {
      top: -5px;
    }

    &::after {
      bottom: -5px;
    }
  }

  .connection-label {
    margin-top: 10px;
    font-weight: bold;
    color: @secondary-color;
    background: fade(@secondary-color, 10%);
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
  }
}

.architecture-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .color-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    &.host {
      background: fade(@primary-color, 30%);
      border: 1px solid @primary-color;
    }

    &.remote {
      background: fade(@accent-color, 30%);
      border: 1px solid @accent-color;
    }

    &.shared {
      background: fade(@warning-color, 30%);
      border: 1px solid @warning-color;
    }

    &.exposed {
      background: fade(@success-color, 30%);
      border: 1px solid @success-color;
    }
  }
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
  counter-reset: step-counter;
}

.step {
  display: flex;
  position: relative;
  padding-left: 70px;
  counter-increment: step-counter;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: @primary-color;
  }
}

.step-number {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: @primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 2;
}

.step-content {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  border-left: 3px solid @primary-color;

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.mechanism-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
}

.mechanism-card {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid @accent-color;

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
  }

  ul {
    padding-left: 20px;
  }
}

.config-table {
  overflow-x: auto;
  margin-bottom: 30px;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
    }

    th {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      font-weight: 600;
    }

    tr:hover {
      background: #f9f9ff;
    }

    code {
      background: fade(@primary-color, 10%);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 15px 0;

  pre {
    margin: 0;
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;

  h3 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
  }
}

.pros {
  border-left: 4px solid @success-color;
}

.cons {
  border-left: 4px solid @warning-color;
}

.optimization {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid @accent-color;
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 0;
  color: @text-lighter;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .version {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .section {
    padding: 20px;
  }

  .architecture-row {
    gap: 30px;
    flex-direction: column;
  }

  .step {
    padding-left: 50px;
  }

  .step-number {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
}
</style>
