<template>
  <div class="module-federation-container">
    <header>
      <h1>Webpack 模块联邦技术</h1>
      <p>革命性的微前端架构解决方案</p>
      <div class="header-tagline">
        <span>跨应用共享代码</span>
        <span>·</span>
        <span>动态依赖加载</span>
        <span>·</span>
        <span>独立部署</span>
      </div>
    </header>

    <div class="content-grid">
      <!-- 概念解释部分 -->
      <section class="concept-section">
        <div class="section-header">
          <h2><i class="icon-concept"></i> 核心概念</h2>
          <div class="divider"></div>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="concept-icon" style="background-color: #4361ee;">
              <i class="icon-microfrontend"></i>
            </div>
            <h3>微前端架构</h3>
            <p>将单体应用拆分为独立开发、部署的子应用，通过模块联邦实现跨应用共享</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon" style="background-color: #3f37c9;">
              <i class="icon-share"></i>
            </div>
            <h3>跨应用共享</h3>
            <p>不同应用间共享模块，避免重复打包，减少代码冗余</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon" style="background-color: #4cc9f0;">
              <i class="icon-dynamic"></i>
            </div>
            <h3>动态加载</h3>
            <p>按需加载远程模块，运行时动态解析依赖关系</p>
          </div>
        </div>

        <div class="architecture-diagram">
          <div class="host-app">
            <span>主应用 (Host)</span>
            <div class="host-modules">
              <div class="module">模块A</div>
              <div class="module">模块B</div>
              <div class="federated-module">共享模块</div>
            </div>
            <div class="remote-connection">
              <i class="icon-connect"></i>
            </div>
          </div>

          <div class="remote-app">
            <span>远程应用 (Remote)</span>
            <div class="remote-modules">
              <div class="module">模块X</div>
              <div class="federated-module">共享模块</div>
              <div class="module">模块Y</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用方式部分 -->
      <section class="usage-section">
        <div class="section-header">
          <h2><i class="icon-config"></i> 配置与使用</h2>
          <div class="divider"></div>
        </div>

        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>配置远程应用</h3>
            <pre><code>// webpack.config.js (远程应用)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Header': './src/components/Header'
      },
      shared: ['react', 'react-dom']
    })
  ]
};</code></pre>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>配置主应用</h3>
            <pre><code>// webpack.config.js (主应用)
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    remoteApp: `remoteApp@http://remote-domain.com/remoteEntry.js`
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
});</code></pre>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>在主应用中使用远程模块</h3>
            <pre><code>// 主应用组件中
import React, { lazy, Suspense } from 'react';

const RemoteButton = lazy(() => import('remoteApp/Button'));

function App() {
  return (
    &lt;Suspense fallback="Loading Button..."&gt;
      &lt;RemoteButton /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
          </div>
        </div>

        <div class="shared-dependencies">
          <h3><i class="icon-dependency"></i> 共享依赖策略</h3>
          <div class="dependency-table">
            <div class="table-header">
              <div>配置选项</div>
              <div>说明</div>
              <div>示例</div>
            </div>
            <div class="table-row">
              <div><code>singleton</code></div>
              <div>强制只使用单个版本</div>
              <div><code>react: { singleton: true }</code></div>
            </div>
            <div class="table-row">
              <div><code>requiredVersion</code></div>
              <div>指定依赖版本范围</div>
              <div><code>'react-dom': { requiredVersion: '^17.0.0' }</code></div>
            </div>
            <div class="table-row">
              <div><code>eager</code></div>
              <div>立即加载而非异步</div>
              <div><code>lodash: { eager: true }</code></div>
            </div>
            <div class="table-row">
              <div><code>strictVersion</code></div>
              <div>版本不匹配时报错</div>
              <div><code>vue: { strictVersion: true }</code></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section class="scenarios-section">
        <div class="section-header">
          <h2><i class="icon-scenario"></i> 使用场景</h2>
          <div class="divider"></div>
        </div>

        <div class="scenario-cards">
          <div class="scenario-card">
            <div class="scenario-icon">
              <i class="icon-microfrontend"></i>
            </div>
            <h3>微前端架构</h3>
            <p>构建可独立开发、部署和维护的微前端应用</p>
            <ul>
              <li>团队自治开发</li>
              <li>技术栈无关</li>
              <li>渐进式升级</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">
              <i class="icon-design"></i>
            </div>
            <h3>共享组件库</h3>
            <p>跨应用共享UI组件，保持设计一致性</p>
            <ul>
              <li>独立版本管理</li>
              <li>按需加载</li>
              <li>热更新</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">
              <i class="icon-plugin"></i>
            </div>
            <h3>插件系统</h3>
            <p>构建可扩展的插件架构</p>
            <ul>
              <li>动态添加功能</li>
              <li>独立部署插件</li>
              <li>安全隔离</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">
              <i class="icon-monorepo"></i>
            </div>
            <h3>Monorepo优化</h3>
            <p>优化大型Monorepo项目的构建</p>
            <ul>
              <li>减少重复打包</li>
              <li>并行开发</li>
              <li>按需加载子模块</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons-section">
        <div class="pros-cons-grid">
          <div class="pros">
            <div class="section-header">
              <h2><i class="icon-pros"></i> 优势</h2>
              <div class="divider"></div>
            </div>

            <div class="pros-list">
              <div class="pro-item">
                <div class="pro-icon">
                  <i class="icon-check"></i>
                </div>
                <div>
                  <h3>独立部署</h3>
                  <p>应用可独立部署，无需协调发布</p>
                </div>
              </div>

              <div class="pro-item">
                <div class="pro-icon">
                  <i class="icon-check"></i>
                </div>
                <div>
                  <h3>减少代码冗余</h3>
                  <p>共享模块避免重复打包，减小bundle体积</p>
                </div>
              </div>

              <div class="pro-item">
                <div class="pro-icon">
                  <i class="icon-check"></i>
                </div>
                <div>
                  <h3>技术栈无关</h3>
                  <p>支持不同技术栈的应用间共享代码</p>
                </div>
              </div>

              <div class="pro-item">
                <div class="pro-icon">
                  <i class="icon-check"></i>
                </div>
                <div>
                  <h3>运行时集成</h3>
                  <p>动态加载远程模块，灵活组合应用</p>
                </div>
              </div>
            </div>
          </div>

          <div class="cons">
            <div class="section-header">
              <h2><i class="icon-cons"></i> 挑战</h2>
              <div class="divider"></div>
            </div>

            <div class="cons-list">
              <div class="con-item">
                <div class="con-icon">
                  <i class="icon-warning"></i>
                </div>
                <div>
                  <h3>版本管理</h3>
                  <p>共享依赖版本冲突需要仔细管理</p>
                </div>
              </div>

              <div class="con-item">
                <div class="con-icon">
                  <i class="icon-warning"></i>
                </div>
                <div>
                  <h3>调试复杂性</h3>
                  <p>跨应用调试需要额外配置</p>
                </div>
              </div>

              <div class="con-item">
                <div class="con-icon">
                  <i class="icon-warning"></i>
                </div>
                <div>
                  <h3>网络依赖</h3>
                  <p>加载远程模块依赖网络状况</p>
                </div>
              </div>

              <div class="con-item">
                <div class="con-icon">
                  <i class="icon-warning"></i>
                </div>
                <div>
                  <h3>安全考虑</h3>
                  <p>需要确保远程资源的安全性</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="best-practices">
          <h3><i class="icon-best"></i> 最佳实践</h3>
          <ol>
            <li><strong>版本控制</strong>：使用语义化版本管理共享模块</li>
            <li><strong>依赖管理</strong>：使用singleton模式共享核心库</li>
            <li><strong>错误处理</strong>：实现模块加载失败的回退机制</li>
            <li><strong>性能优化</strong>：预加载关键远程模块</li>
            <li><strong>安全措施</strong>：验证远程模块来源和完整性</li>
          </ol>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>模块联邦总结</h3>
          <p>Webpack模块联邦是微前端架构的革命性解决方案，通过跨应用共享代码、动态依赖加载和独立部署能力，解决了传统前端架构的多个痛点。</p>
        </div>

        <div class="footer-links">
          <a href="#">官方文档</a>
          <a href="#">配置指南</a>
          <a href="#">案例研究</a>
          <a href="#">GitHub示例</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p>© 2023 前端架构研究组 | Webpack 模块联邦技术指南 v2.1</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const stats = ref({
  bundleReduction: "30-60%",
  loadTime: "减少40%",
  deploymentFrequency: "提升3倍"
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #2a9d8f;
@warning-color: #f8961e;
@error-color: #e63946;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@code-bg: #f1f3f5;

// 混合
.box-shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.border-radius {
  border-radius: 10px;
}

.transition {
  transition: all 0.3s ease;
}

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.module-federation-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 0;
    background: linear-gradient(135deg, #f0f4ff, #e6f7ff);
    .border-radius();
    .box-shadow();

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 15px;
    }

    .header-tagline {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      font-size: 1.1rem;
      font-weight: 500;
      color: @secondary-color;
      margin-top: 20px;
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .section-header {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: @text-dark;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    .divider {
      flex-grow: 1;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, transparent);
      margin-left: 20px;
    }
  }

  // 概念部分样式
  .concept-section {
    .concept-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .concept-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px 20px;
        text-align: center;
        border-top: 4px solid @primary-color;

        .concept-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;

          i {
            font-size: 2rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: @text-dark;
        }

        p {
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .architecture-diagram {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 30px;
      margin-top: 20px;
      border: 1px solid @border-color;
      position: relative;

      .host-app,
      .remote-app {
        position: relative;
        padding: 50px 20px 20px;
        .border-radius();
        border: 2px dashed @primary-color;
        margin-bottom: 30px;

        span {
          position: absolute;
          top: 15px;
          left: 15px;
          font-weight: 600;
          color: @primary-color;
          background: white;
          padding: 5px 10px;
          border-radius: 20px;
        }
      }

      .remote-app {
        border-color: @accent-color;

        span {
          color: @accent-color;
        }
      }

      .host-modules,
      .remote-modules {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;

        .module,
        .federated-module {
          padding: 20px 15px;
          .border-radius();
          text-align: center;
          font-weight: 500;
        }

        .module {
          background: lighten(@primary-color, 40%);
          border: 1px solid lighten(@primary-color, 20%);
          color: darken(@primary-color, 20%);
        }

        .federated-module {
          background: lighten(@success-color, 50%);
          border: 1px solid lighten(@success-color, 20%);
          color: darken(@success-color, 20%);
        }
      }

      .remote-connection {
        position: absolute;
        right: -30px;
        top: 50%;
        transform: translateY(-50%);
        background: @card-bg;
        padding: 15px;
        border-radius: 50%;
        .box-shadow();

        i {
          font-size: 2rem;
          color: @primary-color;
        }
      }
    }
  }

  // 使用方式部分
  .usage-section {
    .config-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 25px;
      margin-bottom: 30px;

      .step {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
        position: relative;
        overflow: hidden;

        .step-number {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 50px;
          height: 50px;
          background: @primary-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          .box-shadow();
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: @secondary-color;
          padding-right: 40px;
        }

        pre {
          background: @code-bg;
          padding: 15px;
          border-radius: 8px;
          overflow-x: auto;
          margin-top: 15px;
          border-left: 3px solid @primary-color;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            color: @text-dark;
            line-height: 1.5;
          }
        }
      }
    }

    .shared-dependencies {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px;
      margin-top: 20px;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        i {
          margin-right: 10px;
          color: @primary-color;
          font-size: 1.8rem;
        }
      }

      .dependency-table {
        display: grid;
        grid-template-columns: 1fr;
        border: 1px solid @border-color;
        border-radius: 8px;
        overflow: hidden;

        .table-header,
        .table-row {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr;
          padding: 12px 15px;
        }

        .table-header {
          background: @primary-color;
          color: white;
          font-weight: 600;
        }

        .table-row {
          &:nth-child(even) {
            background: @light-bg;
          }

          div {
            padding: 8px 5px;
          }

          code {
            background: @code-bg;
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
          }
        }
      }
    }
  }

  // 使用场景部分
  .scenarios-section {
    .scenario-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;

      .scenario-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 30px 25px;
        border-top: 4px solid @primary-color;
        .transition();

        &:hover {
          transform: translateY(-5px);
          border-top-color: @secondary-color;
        }

        .scenario-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: lighten(@primary-color, 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          i {
            font-size: 1.8rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: @text-dark;
        }

        p {
          color: @text-light;
          margin-bottom: 15px;
          min-height: 60px;
        }

        ul {
          padding-left: 20px;
          margin-top: 15px;

          li {
            margin-bottom: 8px;
            position: relative;
            padding-left: 25px;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 8px;
              width: 12px;
              height: 12px;
              background: @primary-color;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  // 优缺点部分
  .pros-cons-section {
    .pros-cons-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 25px;
      }

      .pros {
        border-top: 4px solid @success-color;

        .pro-item {
          display: flex;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid @border-color;

          .pro-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: lighten(@success-color, 40%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            i {
              color: @success-color;
              font-size: 1.3rem;
            }
          }

          h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
          }

          p {
            color: @text-light;
            font-size: 0.95rem;
          }
        }
      }

      .cons {
        border-top: 4px solid @warning-color;

        .con-item {
          display: flex;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid @border-color;

          .con-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: lighten(@warning-color, 35%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            i {
              color: @warning-color;
              font-size: 1.3rem;
            }
          }

          h3 {
            font-size: 1.2rem;
            margin-bottom: 5px;
          }

          p {
            color: @text-light;
            font-size: 0.95rem;
          }
        }
      }
    }

    .best-practices {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px;
      margin-top: 30px;
      border-top: 4px solid @primary-color;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        i {
          margin-right: 10px;
          color: @primary-color;
          font-size: 1.8rem;
        }
      }

      ol {
        padding-left: 25px;

        li {
          margin-bottom: 15px;
          padding-left: 15px;
          position: relative;

          &:before {
            position: absolute;
            left: -25px;
            top: 0;
            width: 20px;
            height: 20px;
            background: @primary-color;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.8rem;
          }

          &:nth-child(1):before {
            content: '1';
          }

          &:nth-child(2):before {
            content: '2';
          }

          &:nth-child(3):before {
            content: '3';
          }

          &:nth-child(4):before {
            content: '4';
          }

          &:nth-child(5):before {
            content: '5';
          }

          strong {
            color: @primary-color;
          }
        }
      }
    }
  }

  // 页脚样式
  footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid @border-color;

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .footer-summary {
        h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .footer-links {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        a {
          padding: 10px 20px;
          background: lighten(@primary-color, 40%);
          color: @primary-color;
          border-radius: 30px;
          font-weight: 500;
          text-decoration: none;
          .transition();

          &:hover {
            background: @primary-color;
            color: white;
          }
        }
      }
    }

    .footer-copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid @border-color;
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'mf-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAATAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'mf-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-concept:before {
  content: "\e900";
}

.icon-microfrontend:before {
  content: "\e901";
}

.icon-share:before {
  content: "\e902";
}

.icon-dynamic:before {
  content: "\e903";
}

.icon-connect:before {
  content: "\e904";
}

.icon-config:before {
  content: "\e905";
}

.icon-dependency:before {
  content: "\e906";
}

.icon-scenario:before {
  content: "\e907";
}

.icon-design:before {
  content: "\e908";
}

.icon-plugin:before {
  content: "\e909";
}

.icon-monorepo:before {
  content: "\e90a";
}

.icon-pros:before {
  content: "\e90b";
}

.icon-cons:before {
  content: "\e90c";
}

.icon-check:before {
  content: "\e90d";
}

.icon-warning:before {
  content: "\e90e";
}

.icon-best:before {
  content: "\e90f";
}
</style>
