<template>
  <div class="bundleless-guide">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">⚡</div>
        </div>
        <div class="title-container">
          <h1>Bundleless开发模式</h1>
          <p class="subtitle">零打包的现代前端开发新范式</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">95%+</div>
          <div class="stat-label">速度提升</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10x</div>
          <div class="stat-label">构建效率</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">0s</div>
          <div class="stat-label">冷启动时间</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🧩</span> 什么是Bundleless？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="definition">
            <div class="quote">
              "Bundleless是一种利用浏览器原生ES模块功能，直接在开发和生产环境中加载模块的前端开发范式，无需传统打包工具（如Webpack）处理。"
            </div>
          </div>

          <div class="comparison">
            <h3>Bundleless vs 传统打包</h3>

            <div class="comparison-grid">
              <div class="comparison-header">
                <div></div>
                <div class="traditional">传统打包</div>
                <div class="bundleless">Bundleless</div>
              </div>

              <div class="comparison-item">
                <div class="criteria">构建方式</div>
                <div class="traditional">打包所有模块为单个/少量文件</div>
                <div class="bundleless">按需加载单个模块文件</div>
              </div>

              <div class="comparison-item">
                <div class="criteria">启动时间</div>
                <div class="traditional">慢（依赖打包）</div>
                <div class="bundleless">快（接近即时）</div>
              </div>

              <div class="comparison-item">
                <div class="criteria">热更新</div>
                <div class="traditional">重建整个bundle</div>
                <div class="bundleless">单个模块更新</div>
              </div>

              <div class="comparison-item">
                <div class="criteria">开发依赖</div>
                <div class="traditional">打包器（Webpack等）</div>
                <div class="bundleless">ESM加载器（浏览器/Vite）</div>
              </div>

              <div class="comparison-item">
                <div class="criteria">HTTP请求</div>
                <div class="traditional">少量</div>
                <div class="bundleless">较多（但HTTP/2友好）</div>
              </div>
            </div>
          </div>

          <div class="key-concepts">
            <h3>核心概念</h3>
            <div class="concepts">
              <div class="concept-card">
                <h4>原生ES模块</h4>
                <p>浏览器原生支持的模块系统</p>
              </div>
              <div class="concept-card">
                <h4>按需加载</h4>
                <p>仅在需要时加载模块</p>
              </div>
              <div class="concept-card">
                <h4>无打包开发</h4>
                <p>开发环境无需打包过程</p>
              </div>
              <div class="concept-card">
                <h4>生产优化</h4>
                <p>生产环境可选轻量打包</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用与优势 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🚀</span> 为什么使用Bundleless？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="benefits">
            <div class="benefit">
              <div class="benefit-header">
                <div class="benefit-icon">⚡</div>
                <h3>极速启动</h3>
              </div>
              <p>无需打包过程，开发服务器启动时间从秒级提升到毫秒级</p>
              <div class="progress">
                <div class="progress-bar" style="width: 30%">传统打包: 15-60s</div>
                <div class="progress-bar bundleless" style="width: 70%">Bundleless: 50-500ms</div>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-header">
                <div class="benefit-icon">✨</div>
                <h3>即时热更新</h3>
              </div>
              <p>修改代码后只更新相关模块，HMR速度快10-100倍</p>
              <div class="code-snippet">
                <pre>// 传统打包 - 全量更新
[HMR] Updated modules: 126

// Bundleless - 精准更新
[HMR] Updated modules: 1</pre>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-header">
                <div class="benefit-icon">🧠</div>
                <h3>简化开发流程</h3>
              </div>
              <p>减少工具链复杂度，配置更简单，调试更直观</p>
              <div class="complexity">
                <div class="traditional-box">
                  <h4>传统打包依赖</h4>
                  <ul>
                    <li>Webpack/Rollup</li>
                    <li>Babel</li>
                    <li>Loader系统</li>
                    <li>插件生态系统</li>
                  </ul>
                </div>
                <div class="arrow">➡️</div>
                <div class="bundleless-box">
                  <h4>Bundleless核心</h4>
                  <ul>
                    <li>ESM加载器</li>
                    <li>原生浏览器支持</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="benefit">
              <div class="benefit-header">
                <div class="benefit-icon">🔍</div>
                <h3>更透明的调试</h3>
              </div>
              <p>直接在浏览器调试源文件，无需source-map映射</p>
              <div class="comparison">
                <div class="comparison-item">
                  <div><span class="badge traditional">传统</span> bundle.js: 1.2MB (minified)</div>
                  <div><span class="badge bundleless">Bundleless</span> component.vue: 4.2KB</div>
                </div>
                <div class="note info">
                  <strong>优势：</strong> 断点可直接定位到源文件，堆栈跟踪更清晰
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 如何使用 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🛠️</span> 如何使用Bundleless？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="methods">
            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">1</span> 使用现代开发工具</h3>
              </div>
              <div class="method-content">
                <p>使用支持Bundleless开发的工具，如Vite、Snowpack或WMR</p>

                <div class="tools">
                  <div class="tool">
                    <div class="tool-logo">V</div>
                    <h4>Vite</h4>
                    <p>Vue作者开发的下一代前端工具</p>
                    <div class="code-snippet">
                      <pre>npm create vite@latest my-app</pre>
                    </div>
                  </div>
                  <div class="tool">
                    <div class="tool-logo">S</div>
                    <h4>Snowpack</h4>
                    <p>专注于Bundleless开发的构建工具</p>
                    <div class="code-snippet">
                      <pre>npx create-snowpack-app my-app</pre>
                    </div>
                  </div>
                  <div class="tool">
                    <div class="tool-logo">W</div>
                    <h4>WMR</h4>
                    <p>Preact团队的轻量级工具</p>
                    <div class="code-snippet">
                      <pre>npm init wmr my-app</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">2</span> 配置ES模块</h3>
              </div>
              <div class="method-content">
                <p>在项目中正确使用ES模块语法</p>

                <div class="steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>使用import/export语法</h4>
                      <div class="code-snippet">
                        <pre>// utils.js
export function formatDate(date) {
  return new Date(date).toLocaleString();
}

// app.js
import { formatDate } from './utils.js';</pre>
                      </div>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>在HTML中加载入口模块</h4>
                      <div class="code-snippet">
                        <pre>&lt;!-- index.html --&gt;
&lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;</pre>
                      </div>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>配置模块解析</h4>
                      <p>使用bare module imports（需工具支持）</p>
                      <div class="code-snippet">
                        <pre>// 传统方式
import _ from '../node_modules/lodash/lodash.js';

// Bundleless方式
import _ from 'lodash';</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">3</span> 处理非JS资源</h3>
              </div>
              <div class="method-content">
                <p>Bundleless工具通过按需转换处理非JS资源</p>

                <div class="assets">
                  <div class="asset">
                    <div class="asset-icon">🎨</div>
                    <h4>CSS</h4>
                    <p>导入CSS生成&lt;style&gt;标签</p>
                    <div class="code-snippet">
                      <pre>import './styles.css';</pre>
                    </div>
                  </div>

                  <div class="asset">
                    <div class="asset-icon">🖼️</div>
                    <h4>图片/字体</h4>
                    <p>导入返回解析后的URL</p>
                    <div class="code-snippet">
                      <pre>import logo from './logo.png';
document.getElementById('logo').src = logo;</pre>
                    </div>
                  </div>

                  <div class="asset">
                    <div class="asset-icon">🔄</div>
                    <h4>JSON</h4>
                    <p>默认支持JSON导入</p>
                    <div class="code-snippet">
                      <pre>import config from './config.json';</pre>
                    </div>
                  </div>

                  <div class="asset">
                    <div class="asset-icon">⚛️</div>
                    <h4>框架组件</h4>
                    <p>Vue/JSX/Svelte组件开箱即用</p>
                    <div class="code-snippet">
                      <pre>import MyComponent from './MyComponent.vue';</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">4</span> 生产环境优化</h3>
              </div>
              <div class="method-content">
                <p>生产环境可选用轻量打包优化性能</p>

                <div class="optimizations">
                  <div class="optimization">
                    <div class="optimization-icon">📦</div>
                    <div>
                      <h4>轻量打包</h4>
                      <p>使用Rollup进行生产构建，优化资源加载</p>
                    </div>
                  </div>

                  <div class="optimization">
                    <div class="optimization-icon">⚡</div>
                    <div>
                      <h4>代码分割</h4>
                      <p>自动分割动态导入的模块</p>
                      <div class="code-snippet">
                        <pre>const module = await import('./heavy-module.js');</pre>
                      </div>
                    </div>
                  </div>

                  <div class="optimization">
                    <div class="optimization-icon">🌐</div>
                    <div>
                      <h4>预加载</h4>
                      <p>使用&lt;link rel="modulepreload"&gt;提示浏览器</p>
                    </div>
                  </div>

                  <div class="optimization">
                    <div class="optimization-icon">🔀</div>
                    <div>
                      <h4>HTTP/2优化</h4>
                      <p>利用HTTP/2的多路复用减少请求开销</p>
                    </div>
                  </div>
                </div>

                <div class="note info">
                  <strong>注意：</strong> 生产环境仍可保持Bundleless模式，但打包通常能获得更好的性能
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📌</span> 适用场景</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="scenarios">
            <div class="scenario">
              <div class="scenario-header ideal">
                <h3>✅ 理想场景</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>中小型项目（模块数 &lt; 500）</li>
                  <li>现代浏览器应用（无需支持IE11）</li>
                  <li>频繁重启的开发环境</li>
                  <li>组件库/工具库开发</li>
                  <li>快速原型开发</li>
                  <li>微前端架构的子应用</li>
                </ul>
              </div>
            </div>

            <div class="scenario">
              <div class="scenario-header caution">
                <h3>⚠️ 需评估场景</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>大型项目（模块数 &gt; 1000）</li>
                  <li>需要支持旧浏览器（如IE11）</li>
                  <li>大量CommonJS依赖项</li>
                  <li>深度定制打包流程的项目</li>
                  <li>需要复杂代码拆分的应用</li>
                  <li>严重依赖Webpack插件生态</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="migration">
            <h3>传统项目迁移建议</h3>
            <div class="migration-steps">
              <div class="migration-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>评估依赖</h4>
                  <p>检查兼容ESM的依赖项比例</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="migration-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>逐步迁移</h4>
                  <p>使用Vite等工具创建新功能</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="migration-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>混合模式</h4>
                  <p>新旧系统并行运行</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="migration-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>完全迁移</h4>
                  <p>替换旧构建系统</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">✅</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="summary">
              <p>Bundleless代表了前端开发演进的下一步，它利用现代浏览器能力简化开发流程，大幅提升开发体验。</p>

              <div class="key-points">
                <h3>核心价值：</h3>
                <ul>
                  <li>⚡ <strong>极致开发速度</strong>：毫秒级服务器启动</li>
                  <li>🔧 <strong>简化工具链</strong>：减少复杂配置和依赖</li>
                  <li>🔍 <strong>透明化调试</strong>：直接映射源代码</li>
                  <li>📦 <strong>按需构建</strong>：只编译必要模块</li>
                  <li>🚀 <strong>未来导向</strong>：拥抱原生Web平台特性</li>
                </ul>
              </div>
            </div>

            <div class="next-steps">
              <h3>下一步建议</h3>
              <div class="steps">
                <div class="step-card">
                  <div class="step-icon">1</div>
                  <p>尝试使用Vite创建新项目</p>
                </div>
                <div class="step-card">
                  <div class="step-icon">2</div>
                  <p>评估现有项目迁移的可能性</p>
                </div>
                <div class="step-card">
                  <div class="step-icon">3</div>
                  <p>学习ES模块标准和动态导入</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="https://vitejs.dev" target="_blank">Vite文档</a>
          <a href="https://www.snowpack.dev" target="_blank">Snowpack文档</a>
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules" target="_blank">MDN ESM指南</a>
        </div>
        <p>© 2023 Bundleless开发指南 | 下一代前端开发范式</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置组件逻辑（如果有的话）
</script>

<style lang="less" scoped>
@primary: #646cff;
@dark-primary: #535bf2;
@secondary: #2c3e50;
@accent: #4caf50;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;
@warning: #ff9800;
@success: #4caf50;
@info: #2196f3;
@traditional: #ff7043;
@bundleless: #42a5f5;

.bundleless-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #2c3e50 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '⚡';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.1;
    transform: rotate(25deg);
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: white;
        color: @dark-primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        box-shadow: 0 5px 15px rgba(100, 108, 255, 0.5);
      }
    }

    .title-container {
      h1 {
        font-size: 2.8rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.definition {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .quote {
    font-size: 1.3rem;
    font-style: italic;
    text-align: center;
    position: relative;
    padding: 20px 40px;
    margin: 0;

    &::before,
    &::after {
      content: '"';
      font-size: 5rem;
      opacity: 0.1;
      position: absolute;
      color: @primary;
    }

    &::before {
      top: -30px;
      left: 10px;
    }

    &::after {
      bottom: -60px;
      right: 10px;
    }
  }
}

.comparison {
  margin-bottom: 30px;

  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  border: 1px solid @border;
  border-radius: 8px;
  overflow: hidden;

  .comparison-header {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    background: @primary;
    color: white;
    font-weight: 600;
    text-align: center;
    padding: 15px;

    .traditional,
    .bundleless {
      padding: 5px;
      border-radius: 4px;
    }

    .traditional {
      background: rgba(@traditional, 0.8);
    }

    .bundleless {
      background: rgba(@bundleless, 0.8);
    }
  }

  .comparison-item {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    border-top: 1px solid @border;

    &>div {
      padding: 15px;
      display: flex;
      align-items: center;
    }

    .criteria {
      font-weight: 500;
      background: rgba(@primary, 0.05);
    }

    .traditional {
      background: rgba(@traditional, 0.07);
      justify-content: center;
    }

    .bundleless {
      background: rgba(@bundleless, 0.07);
      justify-content: center;
      font-weight: 500;
    }

    &:nth-child(odd) {

      .criteria,
      .traditional,
      .bundleless {
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }
}

.key-concepts {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary;
  }

  p {
    margin-bottom: 0;
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.benefit {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .benefit-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .benefit-icon {
      font-size: 2.5rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
  }
}

.complexity {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .traditional-box,
  .bundleless-box {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h4 {
      margin-top: 0;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    ul {
      padding-left: 20px;
      margin-bottom: 0;
    }
  }

  .traditional-box {
    border-left: 3px solid @traditional;
  }

  .bundleless-box {
    border-left: 3px solid @bundleless;
  }

  .arrow {
    margin: 0 15px;
    font-size: 1.5rem;
    color: @primary;
  }
}

.progress {
  height: 30px;
  background: #e9ecef;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 15px;
  display: flex;

  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    height: 100%;

    &.bundleless {
      background: @bundleless;
    }
  }
}

.methods {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.method {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .method-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;

      .method-icon {
        width: 30px;
        height: 30px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-weight: 700;
      }
    }
  }
}

.tools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tool {
  background: rgba(@primary, 0.05);
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  .tool-logo {
    width: 60px;
    height: 60px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;

  .step-number {
    width: 40px;
    height: 40px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
}

.assets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.asset {
  background: rgba(@primary, 0.05);
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  .asset-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
}

.optimizations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.optimization {
  display: flex;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .optimization-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
}

.scenarios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.scenario {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .scenario-header {
    padding: 15px 25px;

    &.ideal {
      background: rgba(@success, 0.15);
      border-bottom: 3px solid @success;
    }

    &.caution {
      background: rgba(@warning, 0.15);
      border-bottom: 3px solid @warning;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }
  }

  .scenario-content {
    padding: 20px 25px;

    ul {
      padding-left: 20px;
      margin-bottom: 0;

      li {
        margin-bottom: 10px;
      }
    }
  }
}

.migration {
  background: rgba(@primary, 0.05);
  border-radius: 12px;
  padding: 25px;

  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.migration-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.migration-step {
  flex: 1;
  text-align: center;
  position: relative;

  .step-number {
    width: 50px;
    height: 50px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto;
  }

  .step-content {
    padding: 15px;

    h4 {
      margin-top: 15px;
      margin-bottom: 5px;
    }

    p {
      margin-bottom: 0;
      font-size: 0.9rem;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 25px;
    right: -15%;
    width: 30%;
    height: 2px;
    background: @border;
  }

  &:last-child::after {
    display: none;
  }
}

.step-arrow {
  font-size: 1.5rem;
  color: @primary;
}

.conclusion {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.summary {
  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.key-points {
  margin-top: 25px;

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      position: relative;
      padding-left: 40px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(@primary, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }
}

.next-steps {
  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .step-icon {
    width: 50px;
    height: 50px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  p {
    margin-bottom: 0;
    font-weight: 500;
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }
}

.note {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;

  &.info {
    background: lighten(@info, 45%);
    border-left: 3px solid @info;

    strong {
      color: @info;
    }
  }
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;

  &.traditional {
    background: rgba(@traditional, 0.15);
    color: darken(@traditional, 15%);
  }

  &.bundleless {
    background: rgba(@bundleless, 0.15);
    color: darken(@bundleless, 15%);
  }
}

.footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid @border;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    a {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;

    .logo-container {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .migration-steps {
    flex-direction: column;

    .migration-step {
      width: 100%;
      margin-bottom: 30px;

      &::after {
        top: auto;
        bottom: -15px;
        right: 50%;
        transform: rotate(90deg);
        width: 30px;
      }
    }
  }

  .scenarios {
    grid-template-columns: 1fr;
  }
}
</style>
