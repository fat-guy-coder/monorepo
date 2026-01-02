<template>
  <div class="webpack-externals-container">
    <header class="header">
      <h1>Webpack externals 配置基础介绍</h1>
      <p>优化打包体积，避免重复加载外部依赖</p>
    </header>

    <div class="content">
      <section class="intro-section">
        <h2>什么是 externals？</h2>
        <div class="card">
          <p>Webpack 的 <code>externals</code> 配置允许你从 bundle 中排除某些依赖，这些依赖会在运行时从外部获取。这在以下场景非常有用：</p>
          <ul>
            <li>库开发时避免打包依赖项</li>
            <li>应用中使用 CDN 加载公共库</li>
            <li>避免重复打包大型库</li>
            <li>优化构建速度和输出体积</li>
          </ul>
        </div>
      </section>

      <div class="columns">
        <section class="config-section">
          <h2>配置方式</h2>
          <div class="config-card">
            <div class="config-item" v-for="(item, index) in configTypes" :key="index">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="code-example">
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section class="usage-section">
          <h2>使用场景</h2>
          <div class="usage-card">
            <div class="usage-item" v-for="(item, index) in usageScenarios" :key="index">
              <div class="icon">{{ item.icon }}</div>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>

          <h2 class="benefits-title">externals 的优势</h2>
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="icon">📦</div>
              <h3>减小包体积</h3>
              <p>排除大型外部依赖，显著减小打包文件大小</p>
            </div>
            <div class="benefit-item">
              <div class="icon">⚡️</div>
              <h3>加快构建速度</h3>
              <p>减少需要处理的模块数量，提升构建性能</p>
            </div>
            <div class="benefit-item">
              <div class="icon">🔗</div>
              <h3>利用浏览器缓存</h3>
              <p>通过 CDN 加载常用库，利用用户已有的缓存</p>
            </div>
            <div class="benefit-item">
              <div class="icon">🧩</div>
              <h3>模块复用</h3>
              <p>避免多个 bundle 重复打包相同依赖</p>
            </div>
          </div>
        </section>
      </div>

      <section class="examples-section">
        <h2>配置示例</h2>
        <div class="examples-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <div v-show="activeTab === 0" class="example-content">
              <h3>基本配置</h3>
              <pre><code class="javascript">// webpack.config.js
module.exports = {
  //...
  externals: {
    // 将 'jquery' 排除，通过全局变量 jQuery 访问
    jquery: 'jQuery',

    // lodash 使用不同名称
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // 指向全局变量 _
    },

    // 排除多个依赖
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};</code></pre>
              <div class="example-desc">
                <p>在 HTML 中引入 CDN：</p>
                <pre><code class="html">&lt;!-- index.html --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"&gt;&lt;/script&gt;</code></pre>
              </div>
            </div>

            <div v-show="activeTab === 1" class="example-content">
              <h3>函数形式配置</h3>
              <pre><code class="javascript">// webpack.config.js
module.exports = {
  //...
  externals: [
    function({ context, request }, callback) {
      // 排除所有 node_modules 中的包
      if (/^[a-z\-0-9]+$/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    {
      // 外部化所有以 'app/' 开头的模块
      'app/': function({ request }, callback) {
        const moduleName = request.replace(/^app\//, '');
        callback(null, `var App.${moduleName}`);
      }
    }
  ]
};</code></pre>
              <div class="example-desc">
                <p>函数形式提供最大灵活性：</p>
                <ul>
                  <li>可以根据请求路径动态决定是否外部化</li>
                  <li>可以自定义外部化模块的访问方式</li>
                  <li>适用于复杂的模块排除需求</li>
                </ul>
              </div>
            </div>

            <div v-show="activeTab === 2" class="example-content">
              <h3>在框架中使用</h3>
              <pre><code class="javascript">// vue.config.js
module.exports = {
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production'
      ? {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          axios: 'axios'
        }
      : {}
  }
};

// 在 index.html 中添加
&lt;script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/vue-router@4.0.12/dist/vue-router.global.prod.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/vuex@4.0.2/dist/vuex.global.prod.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/axios@0.26.0/dist/axios.min.js"&gt;&lt;/script&gt;</code></pre>
              <div class="example-desc">
                <p>生产环境排除框架依赖：</p>
                <ul>
                  <li>Vue 应用打包体积减少 30%-50%</li>
                  <li>利用 CDN 加速框架加载</li>
                  <li>开发环境仍然使用本地依赖便于调试</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="considerations-section">
        <h2>注意事项</h2>
        <div class="considerations-grid">
          <div class="consideration-item">
            <div class="icon">⚠️</div>
            <div>
              <h3>全局变量可用性</h3>
              <p>确保在运行时外部依赖的全局变量已经存在</p>
            </div>
          </div>
          <div class="consideration-item">
            <div class="icon">📝</div>
            <div>
              <h3>类型定义</h3>
              <p>使用 TypeScript 时，确保有正确的类型声明</p>
            </div>
          </div>
          <div class="consideration-item">
            <div class="icon">🔍</div>
            <div>
              <h3>依赖版本</h3>
              <p>CDN 版本应与 package.json 中的版本兼容</p>
            </div>
          </div>
          <div class="consideration-item">
            <div class="icon">🌐</div>
            <div>
              <h3>网络依赖</h3>
              <p>应用需要网络连接来加载外部资源</p>
            </div>
          </div>
          <div class="consideration-item">
            <div class="icon">🔄</div>
            <div>
              <h3>Tree Shaking</h3>
              <p>外部化的库无法进行 Tree Shaking</p>
            </div>
          </div>
          <div class="consideration-item">
            <div class="icon">📚</div>
            <div>
              <h3>库开发</h3>
              <p>开发库时正确声明 peerDependencies</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Webpack externals 是优化大型应用打包的有效手段，合理使用可以显著提升应用性能。</p>
      <div class="footer-links">
        <a href="https://webpack.js.org/configuration/externals/" target="_blank">官方文档</a>
        <a href="https://github.com/webpack/webpack" target="_blank">GitHub 仓库</a>
        <a href="https://webpack.js.org/guides/author-libraries/" target="_blank">库开发指南</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { label: '基本配置' },
  { label: '函数配置' },
  { label: '框架示例' }
];

const configTypes = [
  {
    title: "字符串格式",
    description: "最简单的配置方式，将模块名映射到全局变量",
    example: `externals: {
  jquery: 'jQuery',
  lodash: '_'
}`
  },
  {
    title: "数组格式",
    description: "排除多个依赖，每个依赖对应一个全局变量",
    example: `externals: [
  {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  /^@angular\\//  // 使用正则匹配
]`
  },
  {
    title: "对象格式",
    description: "更精确地控制模块在不同环境下的行为",
    example: `externals: {
  lodash: {
    commonjs: 'lodash',
    commonjs2: 'lodash',
    amd: 'lodash',
    root: '_'  // 浏览器环境下的全局变量
  }
}`
  },
  {
    title: "函数格式",
    description: "提供最大灵活性，可编程决定是否排除模块",
    example: `externals: function({ context, request }, callback) {
  // 排除所有 node_modules 中的包
  if (/^[a-z\\-0-9]+$/.test(request)) {
    return callback(null, 'commonjs ' + request);
  }
  callback();
}`
  },
  {
    title: "正则表达式",
    description: "匹配符合特定模式的模块名称",
    example: `externals: [
  /^@angular\\//,    // 排除所有 @angular/ 开头的模块
  /^lodash\\/.+/    // 排除 lodash 的子模块
]`
  }
];

const usageScenarios = [
  {
    icon: "📚",
    title: "库开发",
    description: "开发第三方库时避免将依赖打包进最终产物，让用户自行安装依赖"
  },
  {
    icon: "🚀",
    title: "性能优化",
    description: "排除大型库如 React、Vue、Lodash 等，通过 CDN 加载以减小包体积"
  },
  {
    icon: "🏢",
    title: "企业应用",
    description: "在微前端架构中，主应用和子应用共享公共依赖"
  },
  {
    icon: "🌐",
    title: "CDN 加速",
    description: "利用公共 CDN 加载常用库，提高加载速度并利用浏览器缓存"
  },
  {
    icon: "🔌",
    title: "插件系统",
    description: "开发插件系统时，主应用提供核心依赖，插件无需重复打包"
  },
  {
    icon: "🧪",
    title: "测试环境",
    description: "在测试环境中模拟外部依赖的行为"
  }
];
</script>

<style lang="less" scoped>


// 基础变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@background: #f8f9fa;
@text-color: #212529;
@light-text: #6c757d;
@border-color: #e9ecef;
@card-bg: #ffffff;
@code-bg: #2d3748;
@success-color: #2ecc71;
@card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.webpack-externals-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @background;
  color: @text-color;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

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
  margin: 1.5rem 0 1rem;
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

.card {
  background: lighten(@background, 1%);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
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

  code {
    background: rgba(@primary-color, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: darken(@primary-color, 10%);
  }
}

.columns {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.config-section,
.usage-section {
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
      background: none;
      padding: 0;
      color: inherit;
    }
  }
}

.usage-card {
  background: lighten(@background, 1%);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid @border-color;
  margin-bottom: 1.5rem;
}

.usage-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px dashed @border-color;

  &:last-child {
    border-bottom: none;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    min-width: 40px;
    text-align: center;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
    color: @text-color;
  }

  p {
    color: @light-text;
  }
}

.benefits-title {
  margin: 1.5rem 0 1rem;
  color: @primary-color;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.benefit-item {
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  p {
    color: @light-text;
    font-size: 0.95rem;
  }
}

.examples-section {
  margin: 2.5rem 0;
}

.examples-tabs {
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
  padding: 1.5rem;
  background: @card-bg;
}

.example-content {
  h3 {
    font-size: 1.3rem;
    color: @primary-color;
    margin-bottom: 1rem;
  }

  pre {
    background: @code-bg;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 1.25rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
}

.example-desc {
  background: lighten(@background, 1%);
  border-radius: 8px;
  padding: 1.25rem;
  border-left: 3px solid @accent-color;

  p {
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: @light-text;
    }
  }
}

.considerations-section {
  margin-top: 2.5rem;
}

.considerations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.consideration-item {
  display: flex;
  align-items: flex-start;
  background: lighten(@background, 1%);
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid @border-color;

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    min-width: 40px;
  }

  h3 {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
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
  .webpack-externals-container {
    padding: 1rem;
  }

  .header {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
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
}
</style>
