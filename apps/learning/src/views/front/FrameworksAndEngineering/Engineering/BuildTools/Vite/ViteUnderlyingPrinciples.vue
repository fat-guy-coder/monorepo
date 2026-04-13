<template>
  <div class="vite-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="vite-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 404">
            <path
              d="M399.641 59.525l-183.997 339.999c-3.799 6.999-13.865 6.999-17.664 0L10.359 59.525c-4.093-7.592-.745-17.401 7.573-19.194L193.667.035c1.438-.324 2.928-.324 4.366 0l175.735 40.296c8.318 1.793 11.666 11.602 7.573 19.194z"
              fill="#646cff" />
            <path
              d="M292.965 1.587l-115.496 75.1L30.128 61.768c-5.318-.953-10.635 2.22-11.583 7.531-.948 5.312 2.22 10.635 7.531 11.583l155.761 24.768L287.56 21.48c4.567-2.969 5.88-8.999 2.911-13.567-2.968-4.567-8.999-5.88-13.567-2.911z"
              fill="#fff" />
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Vite 底层原理基础介绍</h1>
        <p class="subtitle">下一代前端开发与构建工具的核心机制解析</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>Vite 的设计哲学</h2>
        </div>

        <div class="intro-content">
          <div class="design-grid">
            <div class="design-card">
              <div class="design-icon">⚡</div>
              <h3>极速启动</h3>
              <p>利用浏览器原生 ES 模块支持，无需打包整个应用</p>
            </div>

            <div class="design-card">
              <div class="design-icon">🔍</div>
              <h3>按需编译</h3>
              <p>只有当前路由需要的模块才会被编译</p>
            </div>

            <div class="design-card">
              <div class="design-icon">🔄</div>
              <h3>高效热更新</h3>
              <p>基于模块边界的热替换，保留应用状态</p>
            </div>

            <div class="design-card">
              <div class="design-icon">🎛️</div>
              <h3>统一构建</h3>
              <p>开发环境基于原生 ESM，生产环境使用 Rollup 打包</p>
            </div>
          </div>

          <div class="comparison-container">
            <div class="comparison-card">
              <h3>传统打包工具 (Webpack)</h3>
              <ul>
                <li>启动时打包整个应用</li>
                <li>重新打包所有模块进行热更新</li>
                <li>打包器作为开发服务器核心</li>
                <li>请求资源需要经过打包流程</li>
              </ul>
              <div class="performance-bar slow">
                <div class="bar-fill"></div>
                <span>启动时间：随项目增长而增加</span>
              </div>
            </div>

            <div class="vs-divider">VS</div>

            <div class="comparison-card">
              <h3>Vite</h3>
              <ul>
                <li>按需编译模块</li>
                <li>仅编译修改的模块</li>
                <li>原生 ESM 支持</li>
                <li>开发服务器直接提供模块</li>
              </ul>
              <div class="performance-bar fast">
                <div class="bar-fill"></div>
                <span>启动时间：恒定快速</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心架构 -->
      <section class="architecture-section">
        <div class="section-header">
          <div class="icon">🏗️</div>
          <h2>Vite 核心架构</h2>
        </div>

        <div class="architecture-grid">
          <div class="layer-card">
            <div class="layer-header">
              <div class="layer-icon">1</div>
              <h3>原生 ESM 加载</h3>
            </div>
            <div class="layer-content">
              <p>浏览器直接加载 ES 模块，无需打包：</p>
              <pre class="code-block">// index.html
&lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;

// main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')</pre>
              <p><strong>关键机制</strong>：浏览器解析模块依赖树，按需请求模块</p>
            </div>
          </div>

          <div class="layer-card">
            <div class="layer-header">
              <div class="layer-icon">2</div>
              <h3>开发服务器</h3>
            </div>
            <div class="layer-content">
              <ul>
                <li>拦截模块请求</li>
                <li>转换浏览器不支持的格式（如 .vue, .tsx）</li>
                <li>应用中间件处理请求</li>
                <li>支持 HTTP/2 提升加载效率</li>
              </ul>
              <div class="request-flow">
                <div class="flow-step">
                  <div>浏览器请求</div>
                  <div>→</div>
                  <div>模块路径</div>
                </div>
                <div class="flow-step">
                  <div>Vite 服务器</div>
                  <div>→</div>
                  <div>按需编译</div>
                </div>
                <div class="flow-step">
                  <div>返回</div>
                  <div>→</div>
                  <div>转换后的 ES 模块</div>
                </div>
              </div>
            </div>
          </div>

          <div class="layer-card">
            <div class="layer-header">
              <div class="layer-icon">3</div>
              <h3>预构建依赖</h3>
            </div>
            <div class="layer-content">
              <p><strong>解决的问题</strong>：第三方库通常包含大量小模块（如 lodash-es 有 600+ 模块）</p>

              <div class="pre-bundle-process">
                <div class="process-step">
                  <div>1. 扫描依赖</div>
                  <pre class="code-block">// 通过扫描 import 语句
import _ from 'lodash'</pre>
                </div>

                <div class="process-step">
                  <div>2. 使用 esbuild 打包</div>
                  <pre class="code-block">// 输出单文件
node_modules/.vite/lodash.js</pre>
                </div>

                <div class="process-step">
                  <div>3. 替换引用路径</div>
                  <pre class="code-block">// 原始
import _ from 'lodash'

// 转换后
import _ from '/node_modules/.vite/lodash.js'</pre>
                </div>
              </div>

              <p><strong>优势</strong>：减少 HTTP 请求数量，兼容 CommonJS 模块</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 热更新机制 -->
      <section class="hmr-section">
        <div class="section-header">
          <div class="icon">🔥</div>
          <h2>高效热更新机制 (HMR)</h2>
        </div>

        <div class="hmr-process">
          <div class="hmr-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>文件修改检测</h3>
              <p>Vite 通过文件系统监听检测文件变更</p>
            </div>
          </div>

          <div class="hmr-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>精确更新边界</h3>
              <p>使用模块依赖图确定需要更新的最小范围</p>
              <div class="module-graph">
                <div class="module">App.vue</div>
                <div class="dependencies">
                  <div class="module">Header.vue</div>
                  <div class="module">MainContent.vue</div>
                  <div class="module">Footer.vue</div>
                </div>
              </div>
            </div>
          </div>

          <div class="hmr-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>HMR API 更新</h3>
              <p>通过 WebSocket 推送更新信息</p>
              <pre class="code-block">{
  type: 'update',
  updates: [
    {
      type: 'js-update',
      path: '/src/components/Header.vue',
      acceptedPath: '/src/components/Header.vue'
    }
  ]
}</pre>
            </div>
          </div>

          <div class="hmr-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>模块替换</h3>
              <p>浏览器获取新模块并替换旧模块，保留应用状态</p>
              <div class="hot-replace">
                <div class="before">
                  <div class="module old">Header.vue (旧)</div>
                </div>
                <div class="arrow">→</div>
                <div class="after">
                  <div class="module new">Header.vue (新)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hmr-optimization">
          <h3>性能优化手段</h3>
          <div class="optimization-grid">
            <div class="optimization-card">
              <div class="optimization-icon">🚫</div>
              <h4>避免重新加载页面</h4>
              <p>仅更新修改的模块</p>
            </div>

            <div class="optimization-card">
              <div class="optimization-icon">⚡</div>
              <h4>esbuild 编译</h4>
              <p>使用 Go 编写的超快编译器</p>
            </div>

            <div class="optimization-card">
              <div class="optimization-icon">🧩</div>
              <h4>缓存机制</h4>
              <p>模块转换结果缓存</p>
            </div>

            <div class="optimization-card">
              <div class="optimization-icon">🔍</div>
              <h4>增量构建</h4>
              <p>仅处理变更部分</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 模块转换 -->
      <section class="transform-section">
        <div class="section-header">
          <div class="icon">🔄</div>
          <h2>模块转换机制</h2>
        </div>

        <div class="transform-process">
          <div class="transform-step">
            <h3>1. 模块加载请求</h3>
            <div class="request-flow">
              <div class="client">浏览器</div>
              <div class="arrow">→</div>
              <div class="request">GET /src/App.vue</div>
            </div>
          </div>

          <div class="transform-step">
            <h3>2. 服务器拦截与转换</h3>
            <div class="transform-types">
              <div class="transform-type">
                <div class="file-type">.vue</div>
                <div class="arrow">→</div>
                <div class="process">拆分为 template/style/script</div>
              </div>

              <div class="transform-type">
                <div class="file-type">.tsx</div>
                <div class="arrow">→</div>
                <div class="process">转换为 JavaScript</div>
              </div>

              <div class="transform-type">
                <div class="file-type">.scss</div>
                <div class="arrow">→</div>
                <div class="process">编译为 CSS</div>
              </div>

              <div class="transform-type">
                <div class="file-type">.svg</div>
                <div class="arrow">→</div>
                <div class="process">转换为组件或 URL</div>
              </div>
            </div>
          </div>

          <div class="transform-step">
            <h3>3. 返回转换结果</h3>
            <pre class="code-block">// 转换后的 App.vue
import { render } from '/src/App.vue?type=template'
import script from '/src/App.vue?type=script'
import '/src/App.vue?type=style'

script.render = render
export default script</pre>
          </div>
        </div>
      </section>

      <!-- 生产构建 -->
      <section class="production-section">
        <div class="section-header">
          <div class="icon">🏭</div>
          <h2>生产环境构建</h2>
        </div>

        <div class="build-process">
          <div class="build-step">
            <div class="step-header">
              <div class="step-icon">1</div>
              <h3>依赖预构建</h3>
            </div>
            <p>使用 esbuild 打包所有依赖项</p>
          </div>

          <div class="build-step">
            <div class="step-header">
              <div class="step-icon">2</div>
              <h3>应用代码打包</h3>
            </div>
            <p>Rollup 处理应用代码，执行以下操作：</p>
            <ul>
              <li>Tree-shaking 移除未使用代码</li>
              <li>代码分割（动态导入）</li>
              <li>静态资源处理</li>
              <li>CSS 提取和压缩</li>
            </ul>
          </div>

          <div class="build-step">
            <div class="step-header">
              <div class="step-icon">3</div>
              <h3>高级优化</h3>
            </div>
            <div class="optimizations">
              <div class="optimization">
                <h4>异步块加载优化</h4>
                <pre class="code-block">// 自动生成预加载指令
&lt;link rel="modulepreload" href="/assets/chunk.js"&gt;</pre>
              </div>

              <div class="optimization">
                <h4>CSS 代码分割</h4>
                <p>按需加载的 CSS 文件</p>
              </div>

              <div class="optimization">
                <h4>资源内联阈值</h4>
                <p>小文件自动转换为 Base64</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rollup-comparison">
          <div class="comparison-card">
            <h3>开发环境</h3>
            <ul>
              <li>不打包源代码</li>
              <li>按需编译模块</li>
              <li>原生 ESM 加载</li>
              <li>esbuild 转换</li>
              <li>毫秒级 HMR</li>
            </ul>
          </div>

          <div class="vs-divider">→</div>

          <div class="comparison-card">
            <h3>生产环境</h3>
            <ul>
              <li>Rollup 打包所有资源</li>
              <li>Tree-shaking 优化</li>
              <li>代码分割</li>
              <li>资源压缩</li>
              <li>生成静态文件</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 插件系统 -->
      <section class="plugin-section">
        <div class="section-header">
          <div class="icon">🧩</div>
          <h2>插件系统架构</h2>
        </div>

        <div class="plugin-architecture">
          <div class="plugin-layer">
            <h3>Vite 插件钩子</h3>
            <div class="hook-grid">
              <div class="hook-card">
                <h4>config</h4>
                <p>修改 Vite 配置</p>
              </div>

              <div class="hook-card">
                <h4>configResolved</h4>
                <p>配置解析完成后</p>
              </div>

              <div class="hook-card">
                <h4>configureServer</h4>
                <p>配置开发服务器</p>
              </div>

              <div class="hook-card">
                <h4>transform</h4>
                <p>转换模块内容</p>
              </div>
            </div>
          </div>

          <div class="plugin-layer">
            <h3>Rollup 插件兼容性</h3>
            <div class="compatibility">
              <div class="rollup-plugins">
                <h4>Rollup 插件钩子</h4>
                <ul>
                  <li>resolveId</li>
                  <li>load</li>
                  <li>transform</li>
                  <li>buildEnd</li>
                </ul>
              </div>

              <div class="compatibility-info">
                <div class="compatibility-icon">✅</div>
                <p>大部分 Rollup 插件可直接用于 Vite</p>
              </div>
            </div>
          </div>

          <div class="plugin-example">
            <h3>自定义插件示例</h3>
            <pre class="code-block">// vite-plugin-example.js
export default function myPlugin() {
  return {
    name: 'vite-plugin-example',

    // 转换 Markdown 文件
    transform(code, id) {
      if (id.endsWith('.md')) {
        return `
          import { marked } from 'marked'
          const html = marked(\`${code}\`)
          export default html
        `
      }
    },

    // 配置开发服务器中间件
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        console.log(`Request: ${req.url}`)
        next()
      })
    }
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="performance-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>性能优化深度分析</h2>
        </div>

        <div class="performance-metrics">
          <div class="metrics-card">
            <div class="metric-value">10-100x</div>
            <div class="metric-title">冷启动速度提升</div>
            <div class="metric-desc">相比传统打包工具</div>
          </div>

          <div class="metrics-card">
            <div class="metric-value">1-2ms</div>
            <div class="metric-title">HMR 更新时间</div>
            <div class="metric-desc">大型项目热更新速度</div>
          </div>

          <div class="metrics-card">
            <div class="metric-value">50%+</div>
            <div class="metric-title">内存占用减少</div>
            <div class="metric-desc">无打包开销</div>
          </div>
        </div>

        <div class="performance-reasons">
          <h3>性能优化关键点</h3>
          <div class="reasons-grid">
            <div class="reason-card">
              <div class="reason-icon">1</div>
              <div class="reason-content">
                <h4>原生 ESM 加载</h4>
                <p>浏览器直接处理模块依赖，消除打包开销</p>
              </div>
            </div>

            <div class="reason-card">
              <div class="reason-icon">2</div>
              <div class="reason-content">
                <h4>按需编译</h4>
                <p>只编译当前路由所需的模块</p>
              </div>
            </div>

            <div class="reason-card">
              <div class="reason-icon">3</div>
              <div class="reason-content">
                <h4>Esbuild 集成</h4>
                <p>Go 编写的超快编译工具（比 Babel 快 10-100 倍）</p>
              </div>
            </div>

            <div class="reason-card">
              <div class="reason-icon">4</div>
              <div class="reason-content">
                <h4>高效缓存机制</h4>
                <p>文件系统缓存和内存缓存优化</p>
              </div>
            </div>
          </div>
        </div>

        <div class="performance-tips">
          <h3>项目优化建议</h3>
          <div class="tips-grid">
            <div class="tip-card">
              <h4>惰性导入组件</h4>
              <pre class="code-block">// 使用动态导入
const Modal = defineAsyncComponent(
  () => import('./components/Modal.vue')
)</pre>
            </div>

            <div class="tip-card">
              <h4>静态资源处理</h4>
              <pre class="code-block">// 小文件内联
import imgUrl from './image.png?url'

// 大文件外部引用
import imgUrl from './image.png?url'</pre>
            </div>

            <div class="tip-card">
              <h4>配置预构建</h4>
              <pre class="code-block">// vite.config.js
export default {
  optimizeDeps: {
    include: ['heavy-library']
  }
}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Vite 底层原理基础介绍 | 下一代前端工具核心机制 | </p>
      <div class="footer-links">
        <a href="https://vitejs.dev" target="_blank">官方文档</a>
        <a href="https://vitejs.dev/guide/why.html" target="_blank">为什么选择 Vite</a>
        <a href="https://github.com/vitejs/vite" target="_blank">GitHub 仓库</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 本组件不需要复杂的逻辑，仅用于展示信息
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

@color-primary: #646cff;
@color-primary-light: #747bff;
@color-primary-dark: #535bf2;
@color-bg: #f8f9fb;
@color-card: #ffffff;
@color-text: #2d3748;
@color-text-light: #718096;
@color-border: #e2e8f0;

.vite-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: @color-bg;
  color: @color-text;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, @color-primary, @color-primary-dark);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .vite-logo {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 80px;
      height: 80px;
    }
  }
}

.main-title {
  font-size: 2.5rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid @color-border;

  .icon {
    font-size: 1.8rem;
    background: lighten(@color-primary-light, 35%);
    color: @color-primary;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: darken(@color-text, 10%);
  }
}

.intro-content {
  background: @color-card;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.design-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.design-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: lighten(@color-primary-light, 40%);
  border: 1px solid @color-border;

  .design-icon {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  h3 {
    margin: 0 0 0.6rem;
    color: @color-primary-dark;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: @color-text-light;
  }
}

.comparison-container {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .comparison-card {
    flex: 1;
    padding: 1.5rem;
    border-radius: 10px;
    background: @color-card;
    border: 1px solid @color-border;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: @color-primary;
      font-size: 1.3rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
    }
  }

  .vs-divider {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: @color-primary;
    padding: 0 1rem;
  }
}

.performance-bar {
  height: 30px;
  background: @color-border;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  .bar-fill {
    height: 100%;
    background: @color-primary;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
  }

  &.slow .bar-fill {
    width: 30%;
    background: #f56565;
  }

  &.fast .bar-fill {
    width: 90%;
    background: #48bb78;
  }
}

.architecture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.layer-card {
  background: @color-card;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @color-border;

  .layer-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    background: lighten(@color-primary-light, 35%);
    border-bottom: 1px solid @color-border;

    .layer-icon {
      width: 30px;
      height: 30px;
      background: @color-primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: @color-primary-dark;
    }
  }

  .layer-content {
    padding: 1.5rem;

    p {
      margin: 0 0 1rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.request-flow,
.pre-bundle-process,
.hmr-process,
.transform-process {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.2rem 0;
}

.flow-step,
.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: lighten(@color-primary-light, 42%);
  border-radius: 8px;
  font-size: 0.95rem;
}

.module-graph {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  .module {
    padding: 0.8rem 1.5rem;
    background: lighten(@color-primary, 40%);
    border-radius: 8px;
    font-weight: 600;
    color: @color-primary-dark;
    text-align: center;

    &.old {
      background: #feb2b2;
    }

    &.new {
      background: #9ae6b4;
    }
  }

  .dependencies {
    display: flex;
    gap: 1rem;
  }
}

.hot-replace {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  margin: 1rem 0;

  .arrow {
    font-size: 2rem;
    color: @color-primary;
  }
}

.optimization-grid,
.reasons-grid,
.hook-grid,
.metrics-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.optimization-card,
.hook-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: @color-card;
  border: 1px solid @color-border;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  .optimization-icon {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  h4 {
    margin: 0 0 0.5rem;
    color: @color-primary-dark;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @color-text-light;
  }
}

.transform-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.transform-type {
  padding: 1rem;
  background: lighten(@color-primary-light, 42%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  .file-type {
    font-weight: 600;
    color: @color-primary-dark;
  }
}

.build-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.build-step {
  background: @color-card;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @color-border;

  .step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .step-icon {
      width: 30px;
      height: 30px;
      background: @color-primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 1rem 0;

    li {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
  }
}

.rollup-comparison {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.plugin-architecture {
  background: @color-card;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-top: 1.5rem;
}

.plugin-layer {
  margin-bottom: 2rem;

  h3 {
    color: @color-primary;
    font-size: 1.3rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @color-border;
  }
}

.hook-grid {
  margin-top: 1rem;
}

.hook-card {
  padding: 1.2rem;
  background: lighten(@color-primary-light, 42%);
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 0.3rem;
    color: @color-primary-dark;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: @color-text-light;
  }
}

.compatibility {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  .rollup-plugins {
    flex: 1;
    padding: 1.2rem;
    background: lighten(@color-primary-light, 42%);
    border-radius: 8px;

    h4 {
      margin-top: 0;
      color: @color-primary-dark;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.8rem 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
    }
  }

  .compatibility-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;

    .compatibility-icon {
      font-size: 2.5rem;
    }
  }
}

.plugin-example {
  margin-top: 1.5rem;

  h3 {
    color: @color-primary;
    font-size: 1.3rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @color-border;
  }
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.metrics-card {
  text-align: center;
  padding: 1.8rem;
  background: @color-card;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @color-border;

  .metric-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: @color-primary;
    margin-bottom: 0.5rem;
  }

  .metric-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: @color-primary-dark;
    margin-bottom: 0.3rem;
  }

  .metric-desc {
    font-size: 0.95rem;
    color: @color-text-light;
  }
}

.reasons-grid {
  margin-top: 2rem;
}

.reason-card {
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  background: @color-card;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid @color-border;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  .reason-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: @color-primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .reason-content {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem;
      color: @color-primary-dark;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: @color-text-light;
      line-height: 1.5;
    }
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tip-card {
  padding: 1.5rem;
  background: @color-card;
  border-radius: 10px;
  border: 1px solid @color-border;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

  h4 {
    margin-top: 0;
    color: @color-primary;
    font-size: 1.1rem;
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: @color-text-light;
  font-size: 0.95rem;
  margin-top: 4rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: @color-primary;
      text-decoration: none;
      margin: 0 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.code-block {
  background-color: darken(@color-bg, 5%);
  color: @color-text;
  border-radius: 8px;
  padding: 1rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
  border: 1px solid @color-border;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .comparison-container {
    flex-direction: column;

    .vs-divider {
      padding: 1rem 0;
    }
  }

  .architecture-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .vite-logo {
    width: 80px;
    height: 80px;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  .section-header {
    .icon {
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
    }
  }
}
</style>bi
