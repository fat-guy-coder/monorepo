<template>
  <div class="source-map-container">
    <header class="header">
      <div class="header-content">
        <h1>Source Map 前端调试基本指南</h1>
        <p>解密压缩代码，提升调试效率</p>
        <p><a @click="goToAdvanced">跳转进阶</a></p>
      </div>
      <div class="source-map-logo">
        <div class="logo-circle">
          <span>SM</span>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <h2>什么是 Source Map？</h2>
        <div class="intro-card">
          <p>Source Map 是一种将压缩、合并后的代码映射回原始源代码的技术。它解决了现代前端开发中的一个核心问题：如何在生产环境使用优化代码的同时，还能高效调试原始代码。</p>

          <div class="comparison">
            <div class="without-sourcemap">
              <h3>❌ 无 Source Map</h3>
              <div class="code-placeholder">
                <div class="line">webpackJsonp([1],{</div>
                <div class="line">"XzY3": function(e,t,n){"use strict";</div>
                <div class="line">n.r(t);var r=n("abcd")</div>
                <div class="line">// ... 难以理解的压缩代码</div>
              </div>
              <div class="problem">开发者面对压缩代码束手无策</div>
            </div>
            <div class="with-sourcemap">
              <h3>✅ 使用 Source Map</h3>
              <div class="code-placeholder">
                <div class="line">function calculateTotal(products) {</div>
                <div class="line"> return products.reduce((sum, product) => {</div>
                <div class="line"> return sum + product.price * product.quantity;</div>
                <div class="line"> }, 0);</div>
                <div class="line">}</div>
              </div>
              <div class="benefit">开发者调试原始代码</div>
            </div>
          </div>
        </div>
      </section>

      <section class="config-section">
        <h2>核心配置参数</h2>
        <div class="config-grid">
          <div class="config-card" v-for="(config, index) in configOptions" :key="index">
            <div class="config-header">
              <span class="param-name">{{ config.name }}</span>
              <span class="param-type">{{ config.type }}</span>
            </div>
            <div class="config-body">
              <p class="config-desc">{{ config.description }}</p>
              <div class="values-section" v-if="config.values">
                <div class="value-item" v-for="(value, vIndex) in config.values" :key="vIndex">
                  <code>{{ value.value }}</code>
                  <span class="value-desc">{{ value.description }}</span>
                </div>
              </div>
            </div>
            <div class="config-example">
              <pre><code>{{ config.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <h2>Source Map 工作流程</h2>
        <div class="workflow-steps">
          <div class="step" v-for="(step, index) in workflow" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="tool-section">
        <h2>工具支持</h2>
        <div class="tool-grid">
          <div class="tool-card" v-for="(tool, index) in tools" :key="index">
            <div class="tool-icon" :class="`tool-${index + 1}`"></div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <div class="tool-config">
              <pre><code>{{ tool.config }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2>最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="icon">🔒</div>
            <h3>生产环境安全</h3>
            <p>不要将 source map 文件部署到生产服务器</p>
            <p class="detail">使用专用服务器或 S3 存储，通过 HTTP 认证保护</p>
          </div>
          <div class="practice-card">
            <div class="icon">⚡️</div>
            <h3>性能优化</h3>
            <p>开发环境使用 <code>eval-source-map</code></p>
            <p class="detail">提供最佳的重建速度和调试体验</p>
          </div>
          <div class="practice-card">
            <div class="icon">📦</div>
            <h3>生产环境配置</h3>
            <p>使用 <code>hidden-source-map</code></p>
            <p class="detail">生成 source map 但不包含引用，需要手动上传</p>
          </div>
          <div class="practice-card">
            <div class="icon">🧩</div>
            <h3>错误监控集成</h3>
            <p>与 Sentry 等工具集成</p>
            <p class="detail">自动上传 source map 以获取原始堆栈跟踪</p>
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>配置示例</h2>
        <div class="example-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <pre v-show="activeTab === 0"><code class="javascript">// Webpack 配置示例
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  // 生产环境配置
  // devtool: 'hidden-source-map',

  output: {
    sourceMapFilename: '[file].map[query]'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
};</code></pre>

            <pre v-show="activeTab === 1"><code class="javascript">// Vite 配置示例
// vite.config.js
export default {
  build: {
    sourcemap: true, // 生产环境生成 source map

    // 开发环境配置
    // sourcemap: 'inline'
  },

  // 高级配置
  sourcemapIgnoreList: (relativeSourcePath) => {
    return relativeSourcePath.includes('node_modules');
  }
};</code></pre>

            <pre v-show="activeTab === 2"><code class="javascript">// TypeScript 配置 (tsconfig.json)
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true,
    "sourceRoot": "/src",

    // 生成声明文件的 source map
    "declarationMap": true
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section class="considerations">
        <h2>注意事项</h2>
        <div class="considerations-grid">
          <div class="consideration-card">
            <div class="icon">⚠️</div>
            <h3>文件大小</h3>
            <p>Source map 文件可能比原始代码大几倍</p>
          </div>
          <div class="consideration-card">
            <div class="icon">📡</div>
            <h3>加载性能</h3>
            <p>浏览器只在使用开发者工具时加载 source map</p>
          </div>
          <div class="consideration-card">
            <div class="icon">🔍</div>
            <h3>调试精度</h3>
            <p>复杂转换可能导致行号映射不精确</p>
          </div>
          <div class="consideration-card">
            <div class="icon">🔄</div>
            <h3>缓存问题</h3>
            <p>确保 source map 版本与部署代码版本匹配</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Source Map 是现代前端开发不可或缺的调试技术，合理配置可以大幅提升开发效率和调试体验。</p>
      <div class="footer-links">
        <a href="https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map" target="_blank">MDN
          文档</a>
        <a href="https://webpack.js.org/configuration/devtool/" target="_blank">Webpack 配置</a>
        <a href="https://sourcemaps.info/spec.html" target="_blank">技术规范</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['goToByRouteName'])

const goToAdvanced = () => {
  emit('goToByRouteName', 'WebpackSourceMap')
}


const activeTab = ref(0);

const tabs = [
  { label: 'Webpack' },
  { label: 'Vite' },
  { label: 'TypeScript' }
];

const configOptions = [
  {
    name: "devtool",
    type: "string",
    description: "控制如何生成 source map，不同值代表不同策略",
    values: [
      { value: "eval", description: "最快但不生成 source map" },
      { value: "source-map", description: "生成完整 source map 文件" },
      { value: "eval-source-map", description: "开发最佳选择，source map 内联在 eval 中" },
      { value: "cheap-source-map", description: "不包含列映射，更快但精度低" },
      { value: "inline-source-map", description: "将 source map 作为 DataURL 嵌入" }
    ],
    example: `// webpack.config.js
module.exports = {
  devtool: 'source-map'
}`
  },
  {
    name: "sourceMapFilename",
    type: "string",
    description: "自定义生成的 source map 文件名",
    example: `// webpack.config.js
output: {
  sourceMapFilename: 'sourcemaps/[file].map[query]'
}`
  },
  {
    name: "nosources-source-map",
    type: "boolean",
    description: "生成不包含源代码的 source map，只包含堆栈信息",
    example: `// webpack.config.js
devtool: 'nosources-source-map'`
  },
  {
    name: "hidden-source-map",
    type: "boolean",
    description: "生成 source map 但不添加引用注释，需要手动关联",
    example: `// webpack.config.js
devtool: 'hidden-source-map'`
  },
  {
    name: "inlineSources",
    type: "boolean",
    description: "将原始源代码内联到 source map 中",
    example: `// tsconfig.json
{
  "compilerOptions": {
    "inlineSources": true
  }
}`
  },
  {
    name: "sourceRoot",
    type: "string",
    description: "指定原始源代码的根路径",
    example: `// tsconfig.json
{
  "compilerOptions": {
    "sourceRoot": "/src"
  }
}`
  }
];

const workflow = [
  {
    title: "源代码编写",
    description: "开发者编写原始源代码（TypeScript/JSX/SCSS 等）"
  },
  {
    title: "构建过程",
    description: "代码被转译、压缩、合并为生产环境代码"
  },
  {
    title: "生成映射",
    description: "构建工具生成 source map 文件，包含原始代码位置信息"
  },
  {
    title: "浏览器请求",
    description: "开发者打开浏览器开发者工具"
  },
  {
    title: "加载映射",
    description: "浏览器下载并解析 source map 文件"
  },
  {
    title: "调试体验",
    description: "开发者直接在原始源代码上调试，设置断点等"
  }
];

const tools = [
  {
    name: "Webpack",
    description: "通过 devtool 选项配置 source map 生成方式",
    config: `// webpack.config.js
module.exports = {
  devtool: 'source-map'
}`
  },
  {
    name: "Vite",
    description: "使用 build.sourcemap 选项控制 source map 生成",
    config: `// vite.config.js
export default {
  build: {
    sourcemap: true
  }
}`
  },
  {
    name: "Babel",
    description: "通过 sourceMaps 选项启用 source map 生成",
    config: `// .babelrc
{
  "sourceMaps": true
}`
  },
  {
    name: "TypeScript",
    description: "在 tsconfig.json 中配置 sourceMap 选项",
    config: `// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true
  }
}`
  },
  {
    name: "SASS",
    description: "使用 --source-map 标志生成 CSS 的 source map",
    config: `$ sass input.scss output.css --source-map`
  },
  {
    name: "错误监控工具",
    description: "Sentry 等工具可自动上传 source map",
    config: `// Sentry 上传示例
npx @sentry/cli releases files VERSION \\
  upload-sourcemaps ./dist --url-prefix ~/static/js`
  }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 基础变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #212529;
@light-text: #6c757d;
@border-color: #e9ecef;
@code-bg: #2d3748;
@success-color: #2ecc71;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@transition: all 0.3s ease;

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.source-map-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @background;
  color: @text-color;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  .header-content {
    flex: 1;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1.25rem;
      color: @light-text;
    }
  }
}

.source-map-logo {
  .logo-circle {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 1.8rem;
      font-weight: 800;
      color: white;
    }
  }
}

.content {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 2rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.75rem;
  color: @primary-color;
  margin: 1.5rem 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid lighten(@primary-color, 40%);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: @primary-color;
  }
}

.intro-section {
  margin-bottom: 2.5rem;
}

.intro-card {
  background: lighten(@background, 1%);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid @primary-color;

  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }
}

.comparison {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.without-sourcemap,
.with-sourcemap {
  flex: 1;
  background: @card-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
  }
}

.without-sourcemap {
  border-top: 4px solid #e74c3c;
}

.with-sourcemap {
  border-top: 4px solid @success-color;
}

.code-placeholder {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Fira Code', monospace;
  color: #e2e8f0;

  .line {
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 0.1rem 0;
  }
}

.problem,
.benefit {
  text-align: center;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
}

.problem {
  background: rgba(#e74c3c, 0.1);
  color: #c0392b;
}

.benefit {
  background: rgba(@success-color, 0.1);
  color: darken(@success-color, 15%);
}

.config-section {
  margin: 2.5rem 0;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.config-card {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: lighten(@primary-color, 40%);
}

.param-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: @primary-color;
}

.param-type {
  background: rgba(@primary-color, 0.2);
  color: @primary-color;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.config-body {
  padding: 1.25rem;
}

.config-desc {
  color: @light-text;
  margin-bottom: 1rem;
}

.values-section {
  margin-top: 1rem;
  background: rgba(@primary-color, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.value-item {
  display: flex;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  code {
    min-width: 120px;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    color: @primary-color;
  }

  .value-desc {
    margin-left: 0.75rem;
    color: @light-text;
    flex: 1;
  }
}

.config-example {
  background: @code-bg;
  border-radius: 0 0 8px 8px;
  padding: 1rem;

  pre {
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;

    code {
      display: block;
    }
  }
}

.workflow-section {
  margin: 2.5rem 0;
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  border-left: 4px solid @accent-color;
}

.step-number {
  width: 36px;
  height: 36px;
  background: @primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-content {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: @text-color;
  }

  p {
    color: @light-text;
  }
}

.tool-section {
  margin: 2.5rem 0;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  text-align: center;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
  }
}

.tool-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, @primary-color, @accent-color);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    filter: invert(1);
  }

  // 为每个工具图标创建不同的样式
  .tool-1::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20.8 22.7l-5.6-5.6C13.9 17.9 12.9 18 12 18c-3.3 0-6-2.7-6-6 0-.9.1-1.9.9-3.2L1.1 3l1.3-1.3 19.7 19.7-1.3 1.3zM12 8c.6 0 1.1.1 1.6.3l-1.6 1.6V8zM18 12c0 1.5-.5 2.8-1.3 3.9l-1.5-1.5c.4-.7.6-1.5.6-2.4 0-1.9-1.3-3.6-3-4.1v1.8l-2-2V4c3.3.4 6 3.1 6 6.5V12z'/%3E%3C/svg%3E");
  }

  .tool-2::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E");
  }

  .tool-3::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z'/%3E%3C/svg%3E");
  }

  .tool-4::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M3 3v18h18V3H3zm9 15H8v-8h4v8zm-2-6H9V9h1v3zm6 6h-4v-8h4v8zm-2-6h-1V9h1v3z'/%3E%3C/svg%3E");
  }

  .tool-5::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E");
  }

  .tool-6::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z'/%3E%3C/svg%3E");
  }
}

.tool-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: @primary-color;
}

.tool-card p {
  color: @light-text;
  margin-bottom: 1rem;
  min-height: 60px;
}

.tool-config {
  background: @code-bg;
  border-radius: 8px;
  padding: 1rem;

  pre {
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    line-height: 1.5;
    overflow-x: auto;

    code {
      display: block;
    }
  }
}

.best-practices {
  margin: 2.5rem 0;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    color: @light-text;
    margin-bottom: 0.5rem;

    &.detail {
      font-size: 0.9rem;
      font-style: italic;
      color: darken(@light-text, 10%);
    }
  }

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: darken(@primary-color, 10%);
  }
}

.example-section {
  margin: 2.5rem 0;
}

.example-tabs {
  border: 1px solid @border-color;
  border-radius: 10px;
  overflow: hidden;
}

.tabs {
  display: flex;
  background: linear-gradient(to right, @primary-color, @secondary-color);

  button {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &.active {
      color: white;
      background: rgba(255, 255, 255, 0.15);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: white;
      }
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.tab-content {
  pre {
    margin: 0;
    border-radius: 0;
    max-height: 500px;
    overflow: auto;
    background: @code-bg;
    color: #e2e8f0;
    padding: 1.5rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

.considerations {
  margin: 2.5rem 0;
}

.considerations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.consideration-card {
  background: lighten(@background, 1%);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: @text-color;
  }

  p {
    color: @light-text;
    font-size: 0.95rem;
  }
}

.footer {
  text-align: center;
  padding: 2rem 0 1rem;
  color: @light-text;
  border-top: 1px solid @border-color;

  p {
    margin-bottom: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;

  a {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: @secondary-color;
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;

    .source-map-logo {
      margin-top: 1.5rem;
    }
  }

  .content {
    padding: 1.5rem;
  }

  .tabs {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
