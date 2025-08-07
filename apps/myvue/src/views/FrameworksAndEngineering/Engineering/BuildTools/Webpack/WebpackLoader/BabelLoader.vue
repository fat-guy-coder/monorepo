<template>
  <div class="babel-loader-container">
    <header class="header">
      <div class="header-content">
        <h1>Webpack babel-loader 基本指南</h1>
        <p>现代 JavaScript 代码转换的核心工具</p>
      </div>
      <div class="babel-logo">
        <div class="logo-circle">
          <span>B</span>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="intro-section">
        <div class="intro-card">
          <h2>什么是 babel-loader？</h2>
          <p>babel-loader 是 Webpack 的核心 loader 之一，它允许使用 Babel 和 Webpack 转换 JavaScript 文件。通过 babel-loader，开发者可以：</p>
          <ul>
            <li>将现代 JavaScript (ES6+) 转换为向后兼容的版本</li>
            <li>转换 JSX 语法为普通 JavaScript</li>
            <li>添加 polyfill 支持新的 JavaScript 特性</li>
            <li>集成 TypeScript 和 Flow 等类型系统</li>
          </ul>
        </div>
      </div>

      <div class="columns">
        <section class="core-section">
          <h2>核心配置项</h2>
          <div class="config-card">
            <div class="config-item" v-for="(item, index) in coreConfigs" :key="index">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="param-table">
                <div class="param-row" v-for="(param, pIndex) in item.params" :key="pIndex">
                  <div class="param-name">
                    <code>{{ param.name }}</code>
                  </div>
                  <div class="param-type">
                    <span class="type-tag">{{ param.type }}</span>
                  </div>
                  <div class="param-desc">
                    {{ param.description }}
                    <div v-if="param.default" class="param-default">
                      默认值: <code>{{ param.default }}</code>
                    </div>
                  </div>
                </div>
              </div>
              <div class="code-example">
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section class="plugins-section">
          <h2>常用插件</h2>
          <div class="plugins-grid">
            <div class="plugin-card" v-for="(plugin, index) in plugins" :key="index">
              <div class="plugin-icon">
                <div class="icon-bg" :class="`plugin-${index + 1}`"></div>
              </div>
              <h3>{{ plugin.name }}</h3>
              <p>{{ plugin.description }}</p>
              <div class="plugin-example">
                <pre><code>{{ plugin.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="workflow-section">
        <h2>工作原理</h2>
        <div class="workflow-diagram">
          <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
          <div class="workflow-arrow" v-for="i in 5" :key="`arrow-${i}`">→</div>
        </div>
      </section>

      <section class="example-section">
        <h2>完整配置示例</h2>
        <div class="example-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <pre v-show="activeTab === 0"><code class="javascript">// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ],
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      }
    ]
  }
};</code></pre>

            <pre v-show="activeTab === 1"><code class="javascript">// .babelrc 配置文件
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "> 1%", "not dead"]
      },
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}</code></pre>

            <pre v-show="activeTab === 2"><code class="javascript">// 使用 babel.config.js
module.exports = function(api) {
  // 缓存配置
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'not ie < 11']
      }
    }],
    '@babel/preset-react'
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ];

  // 测试环境添加额外插件
  if (api.env('test')) {
    plugins.push('babel-plugin-dynamic-import-node');
  }

  return {
    presets,
    plugins
  };
};</code></pre>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>babel-loader 与其他工具对比</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell">特性</div>
            <div class="header-cell">babel-loader</div>
            <div class="header-cell">ts-loader</div>
            <div class="header-cell">esbuild-loader</div>
          </div>
          <div class="table-row">
            <div class="row-cell">转换现代 JavaScript</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell warning">部分</div>
            <div class="row-cell success">✓</div>
          </div>
          <div class="table-row">
            <div class="row-cell">处理 JSX/TSX</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
          </div>
          <div class="table-row">
            <div class="row-cell">插件系统</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell error">✗</div>
            <div class="row-cell warning">有限</div>
          </div>
          <div class="table-row">
            <div class="row-cell">Polyfill 支持</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell error">✗</div>
            <div class="row-cell error">✗</div>
          </div>
          <div class="table-row">
            <div class="row-cell">构建速度</div>
            <div class="row-cell warning">中等</div>
            <div class="row-cell warning">中等</div>
            <div class="row-cell success">快速</div>
          </div>
          <div class="table-row">
            <div class="row-cell">配置灵活性</div>
            <div class="row-cell success">高</div>
            <div class="row-cell warning">中</div>
            <div class="row-cell warning">中</div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2>最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="icon">⚡️</div>
            <h3>启用缓存</h3>
            <p>设置 <code>cacheDirectory: true</code> 可以显著提升构建速度</p>
          </div>
          <div class="practice-card">
            <div class="icon">🎯</div>
            <h3>精确指定目标</h3>
            <p>在 preset-env 中配置 targets 避免不必要的转换</p>
          </div>
          <div class="practice-card">
            <div class="icon">🧩</div>
            <h3>按需引入 Polyfill</h3>
            <p>使用 <code>useBuiltIns: 'usage'</code> 自动按需引入 polyfill</p>
          </div>
          <div class="practice-card">
            <div class="icon">📦</div>
            <h3>使用 transform-runtime</h3>
            <p>避免 helpers 重复，减少包体积</p>
          </div>
          <div class="practice-card">
            <div class="icon">🚫</div>
            <h3>排除 node_modules</h3>
            <p>通过 exclude 排除 node_modules 提升构建速度</p>
          </div>
          <div class="practice-card">
            <div class="icon">🧪</div>
            <h3>环境特定配置</h3>
            <p>使用 babel.config.js 根据环境配置不同插件</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>babel-loader 是现代 JavaScript 开发不可或缺的工具，合理配置可以提升代码兼容性、性能和开发体验。</p>
      <div class="footer-links">
        <a href="https://babeljs.io/docs/en/babel-loader" target="_blank">官方文档</a>
        <a href="https://github.com/babel/babel-loader" target="_blank">GitHub 仓库</a>
        <a href="https://babeljs.io/docs/en/presets" target="_blank">Preset 文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { label: 'Webpack 配置' },
  { label: '.babelrc 配置' },
  { label: 'babel.config.js' }
];

const coreConfigs = [
  {
    title: "test 属性",
    description: "指定哪些文件需要被 loader 处理",
    params: [
      {
        name: "test",
        type: "RegExp",
        description: "匹配文件扩展名的正则表达式",
        default: "无"
      }
    ],
    example: `{
  test: /\\.jsx?$/, // 匹配 .js 和 .jsx 文件
  use: ['babel-loader']
}`
  },
  {
    title: "exclude 属性",
    description: "指定不需要处理的文件或目录",
    params: [
      {
        name: "exclude",
        type: "RegExp|String|Array",
        description: "排除 node_modules 或其他目录",
        default: "无"
      }
    ],
    example: `{
  exclude: /node_modules/, // 排除 node_modules 目录
  use: ['babel-loader']
}`
  },
  {
    title: "include 属性",
    description: "指定需要处理的文件或目录",
    params: [
      {
        name: "include",
        type: "RegExp|String|Array",
        description: "只包含特定目录或文件",
        default: "无"
      }
    ],
    example: `{
  include: path.resolve(__dirname, 'src'), // 只处理 src 目录
  use: ['babel-loader']
}`
  },
  {
    title: "options 属性",
    description: "传递给 Babel 的配置选项",
    params: [
      {
        name: "presets",
        type: "Array",
        description: "Babel 预设配置集合",
        default: "[]"
      },
      {
        name: "plugins",
        type: "Array",
        description: "Babel 插件集合",
        default: "[]"
      },
      {
        name: "cacheDirectory",
        type: "Boolean",
        description: "启用缓存提升构建速度",
        default: "false"
      },
      {
        name: "cacheCompression",
        type: "Boolean",
        description: "是否压缩缓存文件",
        default: "true"
      }
    ],
    example: `use: {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime'],
    cacheDirectory: true,
    cacheCompression: false
  }
}`
  }
];

const plugins = [
  {
    name: "@babel/preset-env",
    description: "智能预设，根据目标环境自动确定需要的 Babel 插件和 polyfill",
    example: `{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "> 1%", "not dead"]
      },
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}`
  },
  {
    name: "@babel/preset-react",
    description: "转换 JSX 语法，支持 React 开发",
    example: `{
  "presets": ["@babel/preset-react"]
}`
  },
  {
    name: "@babel/preset-typescript",
    description: "支持 TypeScript 语法转换",
    example: `{
  "presets": ["@babel/preset-typescript"]
}`
  },
  {
    name: "@babel/plugin-transform-runtime",
    description: "复用 Babel 注入的 helper 代码，减少代码体积",
    example: `{
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}`
  },
  {
    name: "@babel/plugin-proposal-class-properties",
    description: "支持类属性语法提案",
    example: `{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}`
  },
  {
    name: "@babel/plugin-syntax-dynamic-import",
    description: "支持动态 import() 语法",
    example: `{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}`
  }
];

const workflowSteps = [
  {
    title: "Webpack 匹配文件",
    description: "Webpack 根据配置的 test 规则匹配需要处理的文件"
  },
  {
    title: "babel-loader 处理",
    description: "匹配的文件通过 babel-loader 进行处理"
  },
  {
    title: "Babel 解析代码",
    description: "Babel 将源代码解析为抽象语法树 (AST)"
  },
  {
    title: "插件转换",
    description: "Babel 使用配置的插件和预设对 AST 进行转换"
  },
  {
    title: "生成兼容代码",
    description: "转换后的 AST 被生成为目标环境兼容的代码"
  },
  {
    title: "返回 Webpack",
    description: "处理后的代码返回给 Webpack 继续后续处理"
  }
];
</script>

<style lang="less" scoped>


// 基础变量
@primary-color: #654ea3;
@secondary-color: #4a3f76;
@accent-color: #da98b4;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2d3748;
@light-text: #718096;
@border-color: #e2e8f0;
@success-color: #48bb78;
@warning-color: #ed8936;
@error-color: #e53e3e;
@code-bg: #2d3748;
@card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.babel-loader-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @background;
  color: @text-color;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid @border-color;
  margin-bottom: 2rem;

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

.babel-logo {
  margin-left: 2rem;

  .logo-circle {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 2.5rem;
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
  margin: 0 0 1.5rem;
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
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: "•";
        color: @primary-color;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }
}

.columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.core-section,
.plugins-section {
  flex: 1;
}

.config-card {
  background: lighten(@background, 1%);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;
}

.config-item {
  padding: 1.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.3rem;
    color: @secondary-color;
    margin-bottom: 0.75rem;
  }

  p {
    color: @light-text;
    margin-bottom: 1rem;
  }
}

.param-table {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
}

.param-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  >div {
    padding: 0.75rem;
  }
}

.param-name {
  font-weight: 500;
  background: rgba(@primary-color, 0.05);
}

.param-type {
  .type-tag {
    background: lighten(@primary-color, 35%);
    color: darken(@primary-color, 10%);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.param-desc {
  color: @light-text;
  font-size: 0.95rem;
}

.param-default {
  margin-top: 0.5rem;
  font-size: 0.9rem;

  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: #e53e3e;
  }
}

.code-example {
  margin-top: 1rem;

  pre {
    background: @code-bg;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      display: block;
    }
  }
}

.plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.plugin-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .plugin-icon {
    text-align: center;
    margin-bottom: 1rem;

    .icon-bg {
      width: 60px;
      height: 60px;
      margin: 0 auto;
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
    }

    // 为每个插件图标创建不同的样式
    .plugin-1::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
    }

    .plugin-2::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z'/%3E%3C/svg%3E");
    }

    .plugin-3::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'/%3E%3C/svg%3E");
    }

    .plugin-4::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'/%3E%3C/svg%3E");
    }

    .plugin-5::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z'/%3E%3C/svg%3E");
    }

    .plugin-6::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z'/%3E%3C/svg%3E");
    }
  }

  h3 {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    color: @light-text;
    margin-bottom: 1rem;
    min-height: 60px;
  }
}

.plugin-example {
  pre {
    background: lighten(@background, 1%);
    border-radius: 8px;
    padding: 0.75rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    border: 1px solid @border-color;

    code {
      color: @text-color;
    }
  }
}

.workflow-section {
  margin: 2.5rem 0;
}

.workflow-diagram {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.workflow-step {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: @card-shadow;
  text-align: center;
  position: relative;
  z-index: 1;

  .step-number {
    width: 32px;
    height: 32px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin: 0 auto 0.75rem;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: @text-color;
  }

  p {
    color: @light-text;
    font-size: 0.9rem;
  }
}

.workflow-arrow {
  text-align: center;
  color: @light-text;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 900px) {
    display: none;
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

.comparison-section {
  margin: 2.5rem 0;
}

.comparison-table {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  background: @primary-color;
  color: white;
  font-weight: 600;

  .header-cell {
    padding: 1rem;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  .row-cell {
    padding: 1rem;
    display: flex;
    align-items: center;

    &:first-child {
      font-weight: 500;
    }
  }
}

.success {
  color: @success-color;
  font-weight: bold;
  justify-content: center;
}

.warning {
  color: @warning-color;
  font-weight: bold;
  justify-content: center;
}

.error {
  color: @error-color;
  font-weight: bold;
  justify-content: center;
}

.best-practices {
  margin-top: 2.5rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

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

    code {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
      color: darken(@primary-color, 10%);
    }
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
    padding: 1.5rem 0;

    .babel-logo {
      margin: 1.5rem 0 0;
    }
  }

  .content {
    padding: 1.5rem;
  }

  .tabs {
    flex-direction: column;

    button {
      padding: 0.8rem;
    }
  }

  .footer-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    font-size: 0.9rem;

    .header-cell,
    .row-cell {
      text-align: center !important;
    }
  }
}
</style>
