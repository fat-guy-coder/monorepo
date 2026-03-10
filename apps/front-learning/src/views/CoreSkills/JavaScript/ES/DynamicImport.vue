<template>
  <div class="dynamic-import-container">
    <div class="header">
      <h1>ES 动态导入 `import()` 介绍</h1>
      <p class="subtitle">按需加载模块的现代 JavaScript 技术</p>
      <div class="features-badge">
        <span class="feature">代码分割</span>
        <span class="feature">按需加载</span>
        <span class="feature">异步模块</span>
        <span class="feature">性能优化</span>
      </div>
    </div>

    <div class="content-grid">
      <!-- 概念解释 -->
      <div class="card concept-card">
        <div class="card-header">
          <div class="icon">📚</div>
          <h2>动态导入概念</h2>
        </div>
        <div class="card-content">
          <p>
            动态导入 `import()` 是 ECMAScript 2020 引入的一种语法，允许在运行时异步加载 JavaScript
            模块。
          </p>

          <div class="comparison">
            <h3>与静态导入对比</h3>
            <div class="comparison-row">
              <div class="static">
                <h4>静态导入</h4>
                <pre><code>// 静态导入 - 编译时加载
import utils from './utils';

// 使用
utils.doSomething();</code></pre>
                <div class="characteristics">
                  <span class="char">编译时加载</span>
                  <span class="char">同步执行</span>
                  <span class="char">所有模块打包</span>
                </div>
              </div>
              <div class="dynamic">
                <h4>动态导入</h4>
                <pre><code>// 动态导入 - 运行时加载
import('./utils')
  .then(module => {
    module.doSomething();
  });</code></pre>
                <div class="characteristics">
                  <span class="char">运行时加载</span>
                  <span class="char">异步执行</span>
                  <span class="char">按需加载模块</span>
                </div>
              </div>
            </div>
          </div>

          <div class="key-features">
            <h3>核心特性</h3>
            <div class="features">
              <div class="feature">
                <div class="icon">⏱️</div>
                <div>
                  <h4>异步加载</h4>
                  <p>模块在需要时异步加载，不阻塞主线程</p>
                </div>
              </div>
              <div class="feature">
                <div class="icon">✂️</div>
                <div>
                  <h4>代码分割</h4>
                  <p>自动将模块拆分为独立 chunk</p>
                </div>
              </div>
              <div class="feature">
                <div class="icon">🚀</div>
                <div>
                  <h4>性能优化</h4>
                  <p>减少初始加载时间和资源大小</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基本使用 -->
      <div class="card usage-card">
        <div class="card-header">
          <div class="icon">💻</div>
          <h2>基本使用</h2>
        </div>
        <div class="card-content">
          <div class="usage-section">
            <h3>基本语法</h3>
            <pre><code>// 返回 Promise
import('./module.js')
  .then(module => {
    // 使用模块
    module.doSomething();
  })
  .catch(err => {
    // 处理加载错误
    console.error('模块加载失败', err);
  });</code></pre>
          </div>

          <div class="usage-section">
            <h3>使用 async/await</h3>
            <pre><code>async function loadModule() {
  try {
    const module = await import('./module.js');
    module.doSomething();
  } catch (err) {
    console.error('模块加载失败', err);
  }
}

// 调用
loadModule();</code></pre>
          </div>

          <div class="usage-section">
            <h3>动态路径</h3>
            <pre><code>// 根据条件加载不同模块
function loadDashboardModule(userType) {
  const modulePath = `./dashboards/${userType}Dashboard.js`;

  import(modulePath)
    .then(module => module.render())
    .catch(err => console.error('加载失败', err));
}

// 使用
loadDashboardModule('admin');</code></pre>
          </div>

          <div class="usage-section">
            <h3>默认导出处理</h3>
            <pre><code>// 模块 default 导出
// math.js
export default {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}

// 使用
import('./math.js')
  .then(mathModule => {
    const math = mathModule.default;
    console.log(math.add(2, 3)); // 5
  });</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作原理 -->
    <div class="card workflow-card">
      <div class="card-header">
        <div class="icon">⚙️</div>
        <h2>工作原理</h2>
      </div>
      <div class="card-content">
        <div class="workflow-diagram">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>代码解析</h3>
              <p>构建工具识别 import() 语法</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>代码分割</h3>
              <p>将模块拆分为独立 chunk 文件</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>运行时触发</h3>
              <p>代码执行到 import() 时触发加载</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>网络请求</h3>
              <p>浏览器发起 chunk 文件请求</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>模块解析</h3>
              <p>下载完成后解析和执行模块</p>
            </div>
          </div>

          <div class="connector">↓</div>

          <div class="step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>Promise 解决</h3>
              <p>模块可用后解析 Promise</p>
            </div>
          </div>
        </div>

        <div class="technical-details">
          <h3>技术细节</h3>
          <div class="details">
            <div class="detail">
              <h4>Chunk 命名</h4>
              <p>构建工具自动生成 chunk 名称，可通过魔法注释自定义：</p>
              <pre><code>import(/* webpackChunkName: "my-chunk" */ './module.js');</code></pre>
            </div>

            <div class="detail">
              <h4>预加载/预取</h4>
              <p>使用魔法注释优化加载策略：</p>
              <pre><code>// 预加载 - 高优先级
import(/* webpackPreload: true */ './module.js');

// 预取 - 低优先级
import(/* webpackPrefetch: true */ './module.js');</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="card scenarios-card">
      <div class="card-header">
        <div class="icon">💼</div>
        <h2>使用场景</h2>
      </div>
      <div class="card-content">
        <div class="scenarios-grid">
          <div class="scenario">
            <div class="icon">📦</div>
            <h3>路由级代码分割</h3>
            <p>按路由加载页面组件</p>
            <pre><code>// Vue Router
{
  path: '/dashboard',
  component: () => import('./views/Dashboard.vue')
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">🖼️</div>
            <h3>组件懒加载</h3>
            <p>延迟加载非关键组件</p>
            <pre><code>// Vue 组件
export default {
  components: {
    HeavyComponent: () => import('./HeavyComponent.vue')
  }
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">📊</div>
            <h3>按需加载库</h3>
            <p>只在需要时加载大型库</p>
            <pre><code>async function generateChart() {
  const ChartJS = await import('chart.js');
  // 使用 ChartJS...
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">🌐</div>
            <h3>条件加载模块</h3>
            <p>根据特性支持加载不同实现</p>
            <pre><code>async function loadImageProcessor() {
  if (supportsWebGL) {
    return import('./webgl-processor.js');
  } else {
    return import('./canvas-processor.js');
  }
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 优缺点 -->
    <div class="card pros-cons-card">
      <div class="card-header">
        <div class="icon">⚖️</div>
        <h2>优缺点分析</h2>
      </div>
      <div class="card-content">
        <div class="comparison">
          <div class="pros">
            <h3>优点 ✅</h3>
            <ul>
              <li>
                <div class="icon">🚀</div>
                <div>
                  <h4>优化加载性能</h4>
                  <p>减少初始包大小，加快首屏加载</p>
                </div>
              </li>
              <li>
                <div class="icon">📊</div>
                <div>
                  <h4>减少资源浪费</h4>
                  <p>只加载用户实际需要的代码</p>
                </div>
              </li>
              <li>
                <div class="icon">🧩</div>
                <div>
                  <h4>提高灵活性</h4>
                  <p>根据条件加载不同模块实现</p>
                </div>
              </li>
              <li>
                <div class="icon">⚡</div>
                <div>
                  <h4>改善用户体验</h4>
                  <p>避免长时间加载空白页面</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点 ❌</h3>
            <ul>
              <li>
                <div class="icon">⏳</div>
                <div>
                  <h4>延迟交互</h4>
                  <p>模块加载时用户可能无法立即交互</p>
                </div>
              </li>
              <li>
                <div class="icon">📡</div>
                <div>
                  <h4>额外网络请求</h4>
                  <p>增加HTTP请求数量</p>
                </div>
              </li>
              <li>
                <div class="icon">🧪</div>
                <div>
                  <h4>调试复杂度</h4>
                  <p>代码分割增加调试难度</p>
                </div>
              </li>
              <li>
                <div class="icon">📦</div>
                <div>
                  <h4>可能重复代码</h4>
                  <p>共享依赖可能导致多chunk重复</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="balance-tip">
          <div class="icon">💡</div>
          <p>最佳实践：对非关键功能使用动态导入，核心功能静态导入</p>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="card best-practices-card">
      <div class="card-header">
        <div class="icon">🏆</div>
        <h2>最佳实践</h2>
      </div>
      <div class="card-content">
        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>加载状态处理</h3>
              <p>提供加载指示器，增强用户体验</p>
              <pre><code>async function loadComponent() {
  // 显示加载状态
  showLoader();

  try {
    const module = await import('./HeavyComponent.vue');
    // 渲染组件
    renderComponent(module.default);
  } catch (err) {
    showError('加载失败');
  } finally {
    // 隐藏加载状态
    hideLoader();
  }
}</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>错误处理</h3>
              <p>优雅处理模块加载失败情况</p>
              <pre><code>async function loadFeature() {
  try {
    const module = await import('./feature.js');
    module.init();
  } catch (err) {
    // 回退到基本功能
    useBasicFeature();
    // 记录错误
    logError(err);
  }
}</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>预加载策略</h3>
              <p>合理使用预加载提高性能</p>
              <pre><code>// 用户交互后预加载可能需要的模块
button.addEventListener('click', () => {
  // 预取报表模块
  import(/* webpackPrefetch: true */ './reportModule.js');

  // 当前操作...
});</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>合理拆分</h3>
              <p>避免过度拆分导致性能下降</p>
              <pre><code>// 不推荐：拆分过细
import('./Button.vue');
import('./Input.vue');
import('./Label.vue');

// 推荐：合理分组
import('./FormComponents.js'); // 包含所有表单组件</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="card support-card">
      <div class="card-header">
        <div class="icon">🌐</div>
        <h2>浏览器支持</h2>
      </div>
      <div class="card-content">
        <div class="support-info">
          <p>动态导入在现代浏览器中得到良好支持：</p>

          <div class="browser-support">
            <div class="browser">
              <div class="name">Chrome</div>
              <div class="version">63+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Firefox</div>
              <div class="version">67+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Safari</div>
              <div class="version">11.1+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Edge</div>
              <div class="version">79+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Node.js</div>
              <div class="version">13.2.0+</div>
              <div class="status supported">✅</div>
            </div>
          </div>

          <div class="legacy-note">
            <h3>旧浏览器支持</h3>
            <p>对于旧浏览器，可通过 Babel 插件和 polyfill 提供支持：</p>
            <pre><code>// 安装 polyfill
npm install @babel/plugin-syntax-dynamic-import</code></pre>

            <pre><code>// babel.config.js
module.exports = {
  plugins: ['@babel/plugin-syntax-dynamic-import']
};</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="conclusion">
      <h2>动态导入总结</h2>
      <div class="summary">
        <p>动态导入 `import()` 是现代 JavaScript 应用性能优化的关键技术：</p>
        <ul>
          <li>实现代码分割和按需加载</li>
          <li>显著减少初始加载时间和资源大小</li>
          <li>提高大型应用的用户体验</li>
          <li>支持条件加载和动态路径</li>
          <li>与构建工具深度集成，提供优化选项</li>
        </ul>
      </div>
      <div class="recommendation">
        <div class="icon">💡</div>
        <p>在性能敏感的应用中合理使用动态导入，平衡初始加载和运行时体验</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不需要复杂逻辑，主要是展示内容
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.dynamic-import-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}

.features-badge {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;

  .feature {
    padding: 0.4rem 1rem;
    background-color: fade(@primary-color, 15%);
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;

  .icon {
    font-size: 1.8rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.card-content {
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.concept-card {
  .comparison {
    background-color: @light-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;

    .comparison-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .static,
      .dynamic {
        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 0.5rem;
          margin-bottom: 1rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }

        .characteristics {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .char {
            padding: 0.3rem 0.8rem;
            background-color: fade(@text-dark, 8%);
            border-radius: 20px;
            font-size: 0.8rem;
          }
        }
      }

      .dynamic {
        pre code {
          color: #4ec9b0;
        }
      }
    }
  }

  .key-features {
    .features {
      display: grid;
      gap: 1rem;

      .feature {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background-color: fade(@success-color, 10%);
        border-radius: 8px;
        border-left: 3px solid @success-color;

        .icon {
          font-size: 1.5rem;
        }

        h4 {
          margin: 0 0 0.3rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-light;
        }
      }
    }
  }
}

.usage-card {
  .usage-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  }
}

.workflow-card {
  margin-bottom: 2rem;

  .workflow-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .step {
      display: flex;
      align-items: center;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1.2rem;
      width: 100%;
      max-width: 500px;

      .step-number {
        width: 36px;
        height: 36px;
        background-color: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 0.3rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .connector {
      font-size: 1.5rem;
      color: @text-light;
      height: 30px;
    }
  }

  .technical-details {
    .details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .detail {
        background-color: fade(@accent-color, 8%);
        border-radius: 8px;
        padding: 1.2rem;
        border-left: 3px solid @accent-color;

        h4 {
          margin-top: 0;
        }

        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 0.8rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.scenarios-card {
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .scenario {
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1.2rem;
      text-align: center;

      .icon {
        font-size: 2rem;
        margin-bottom: 0.8rem;
      }

      h3 {
        margin: 0 0 0.5rem;
      }

      p {
        margin: 0 0 1rem;
        color: @text-light;
      }

      pre {
        background-color: #2d2d2d;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        text-align: left;
        font-size: 0.8rem;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          line-height: 1.4;
        }
      }
    }
  }
}

.pros-cons-card {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    h3 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        align-items: flex-start;

        .icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        h4 {
          margin: 0 0 0.3rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-light;
        }
      }
    }

    .pros li {
      background-color: fade(@success-color, 10%);
    }

    .cons li {
      background-color: fade(@warning-color, 10%);
    }
  }

  .balance-tip {
    display: flex;
    gap: 1rem;
    background-color: fade(@accent-color, 10%);
    border-radius: 8px;
    padding: 1.2rem;
    margin-top: 1.5rem;
    align-items: center;
    border-left: 3px solid @accent-color;

    .icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    p {
      margin: 0;
      font-weight: 500;
    }
  }
}

.best-practices-card {
  .practices {
    .practice {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      .content {
        h3 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: 0;

          &::before {
            content: attr(data-number);
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, @primary-color, @secondary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
        }

        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 0.8rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.support-card {
  .support-info {
    p {
      margin-bottom: 1.5rem;
    }
  }

  .browser-support {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .browser {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1rem;

      .name {
        font-weight: 500;
        margin-bottom: 0.3rem;
      }

      .version {
        font-size: 0.9rem;
        color: @text-light;
        margin-bottom: 0.3rem;
      }

      .status {
        font-size: 1.2rem;

        &.supported {
          color: @success-color;
        }
      }
    }
  }

  .legacy-note {
    background-color: fade(@warning-color, 10%);
    border-radius: 8px;
    padding: 1.2rem;
    border-left: 3px solid @warning-color;

    h3 {
      margin-top: 0;
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      code {
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .summary {
    max-width: 800px;
    margin: 0 auto 1.5rem;
    text-align: left;

    ul {
      padding-left: 1.5rem;
      text-align: left;
      display: inline-block;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .recommendation {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    background-color: white;
    border-radius: 30px;
    padding: 0.8rem 1.5rem;
    box-shadow: @card-shadow;
    font-weight: 500;

    .icon {
      font-size: 1.5rem;
      color: @accent-color;
    }

    p {
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .dynamic-import-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .comparison-row {
    grid-template-columns: 1fr !important;
  }
}
</style>
