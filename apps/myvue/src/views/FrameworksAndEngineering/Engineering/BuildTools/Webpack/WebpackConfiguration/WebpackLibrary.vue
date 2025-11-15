<template>
  <div class="library-container">
    <!-- 顶部标题区 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="webpack-logo">
          <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1035.6 879.29l-418.11 236.8a60.14 60.14 0 0 1-60.14 0l-418.11-236.8A60.14 60.14 0 0 1 59.54 829L478.1 592.17a60.14 60.14 0 0 1 60.14 0L956.8 829a60.14 60.14 0 0 1 28.28 50.29 60.14 60.14 0 0 1-10.13 33.3 60.14 60.14 0 0 1-8.58 12.7 60.14 60.14 0 0 1-30.77 16.4z"
              fill="#8ed6fb" />
            <path
              d="M1035.6 650.91L617.49 887.73a60.14 60.14 0 0 1-60.14 0L164.4 650.91a60.14 60.14 0 0 1-28.28-50.29 60.14 60.14 0 0 1 10.13-33.3 60.14 60.14 0 0 1 8.58-12.7 60.14 60.14 0 0 1 30.77-16.4l418.11-236.8a60.14 60.14 0 0 1 60.14 0l418.11 236.8a60.14 60.14 0 0 1 28.28 50.29 60.14 60.14 0 0 1-10.13 33.3 60.14 60.14 0 0 1-8.58 12.7 60.14 60.14 0 0 1-30.77 16.4z"
              fill="#1c78c0" />
            <path
              d="M1035.6 422.53L617.49 659.35a60.14 60.14 0 0 1-60.14 0L164.4 422.53a60.14 60.14 0 0 1-28.28-50.29 60.14 60.14 0 0 1 10.13-33.3 60.14 60.14 0 0 1 8.58-12.7 60.14 60.14 0 0 1 30.77-16.4l418.11-236.8a60.14 60.14 0 0 1 60.14 0l418.11 236.8a60.14 60.14 0 0 1 28.28 50.29 60.14 60.14 0 0 1-10.13 33.3 60.14 60.14 0 0 1-8.58 12.7 60.14 60.14 0 0 1-30.77 16.4z"
              fill="#8ed6fb" />
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Webpack Library 配置基础介绍</h1>
        <p class="subtitle">构建可复用 JavaScript 库的核心配置</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>什么是 Library 配置?</h2>
        </div>

        <div class="intro-content">
          <p>
            <strong>Webpack 的 library 配置</strong> 是用于创建可复用 JavaScript 库的核心设置。它允许开发者将代码打包为可在不同环境中使用的模块格式（如
            CommonJS、AMD、ES Module 等），并指定全局变量名，使得库可以在浏览器中通过 script 标签直接引入使用。
          </p>

          <div class="benefit-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🔌</div>
              <h3>模块化输出</h3>
              <p>支持多种模块规范输出</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">🌐</div>
              <h3>全局访问</h3>
              <p>通过全局变量暴露库功能</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">📦</div>
              <h3>库封装</h3>
              <p>将复杂功能封装为独立库</p>
            </div>
          </div>

          <div class="core-functions">
            <h3 class="section-subtitle">核心作用</h3>
            <ul>
              <li>定义库的入口点和导出方式</li>
              <li>控制库在不同环境中的暴露方式</li>
              <li>支持多种模块格式输出</li>
              <li>避免全局命名冲突</li>
              <li>优化库的打包体积和性能</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 基本配置 -->
      <section class="basic-config">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>基本配置示例</h2>
        </div>

        <div class="config-examples">
          <div class="example-card">
            <h3>简单配置</h3>
            <pre class="code-block">// webpack.config.js
module.exports = {
  // ...其他配置
  output: {
    filename: 'my-library.js',
    library: 'MyLibrary'
  }
};</pre>
          </div>

          <div class="example-card">
            <h3>完整配置</h3>
            <pre class="code-block">// webpack.config.js
module.exports = {
  // ...其他配置
  output: {
    filename: 'my-library.js',
    library: {
      name: 'MyLibrary',
      type: 'umd',
      umdNamedDefine: true
    },
    globalObject: 'this'
  }
};</pre>
          </div>
        </div>
      </section>

      <!-- 配置项基础介绍 -->
      <section class="config-details">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>详细配置参数</h2>
        </div>

        <div class="params-grid">
          <div class="param-card">
            <div class="param-header">
              <div class="param-name">name</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 定义库的全局变量名</p>
              <p><strong>示例：</strong></p>
              <pre class="code-block">library: 'MyLibrary'</pre>
              <p>在浏览器中使用：<code>window.MyLibrary.doSomething()</code></p>
            </div>
          </div>

          <div class="param-card">
            <div class="param-header">
              <div class="param-name">type</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 指定库的导出方式</p>
              <p><strong>可选值：</strong></p>
              <ul>
                <li><code>'var'</code> - 通过变量导出 (默认)</li>
                <li><code>'module'</code> - ES Module 导出</li>
                <li><code>'assign'</code> - 直接赋值给全局变量</li>
                <li><code>'this'</code> - 赋值给 this (如 window)</li>
                <li><code>'window'</code> - 赋值给 window 对象</li>
                <li><code>'global'</code> - 赋值给 global 对象 (Node.js)</li>
                <li><code>'commonjs'</code> - CommonJS 导出</li>
                <li><code>'commonjs2'</code> - 以 module.exports 导出</li>
                <li><code>'amd'</code> - AMD 导出</li>
                <li><code>'umd'</code> - 通用模块定义 (支持多种环境)</li>
                <li><code>'system'</code> - SystemJS 模块导出</li>
              </ul>
            </div>
          </div>

          <div class="param-card">
            <div class="param-header">
              <div class="param-name">umdNamedDefine</div>
              <div class="param-type">boolean</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 在使用 UMD 时，为 AMD 模块命名</p>
              <p><strong>默认值：</strong> <code>false</code></p>
              <p>当设置为 <code>true</code> 时，会为 AMD 模块命名，有助于调试：</p>
              <pre class="code-block">define('MyLibrary', [], factory);</pre>
            </div>
          </div>

          <div class="param-card">
            <div class="param-header">
              <div class="param-name">auxiliaryComment</div>
              <div class="param-type">string | object</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 在 UMD 包装器中添加注释</p>
              <p><strong>示例：</strong></p>
              <pre class="code-block">library: {
  name: 'MyLibrary',
  type: 'umd',
  auxiliaryComment: 'Library Comment'
}</pre>
              <p>输出：</p>
              <pre class="code-block">// Library Comment
(function webpackUniversalModuleDefinition(root, factory) {
  // ...
})</pre>
            </div>
          </div>

          <div class="param-card">
            <div class="param-header">
              <div class="param-name">export</div>
              <div class="param-type">string | string[]</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 指定导出的子模块</p>
              <p><strong>使用场景：</strong> 当库有多个入口点时</p>
              <pre class="code-block">library: {
  name: 'MyLibrary',
  type: 'umd',
  export: ['default', 'namedExport']
}</pre>
            </div>
          </div>

          <div class="param-card">
            <div class="param-header">
              <div class="param-name">globalObject</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 指定全局对象，用于在非浏览器环境中定位全局对象</p>
              <p><strong>默认值：</strong> <code>'self'</code></p>
              <p><strong>推荐值：</strong> <code>'this'</code> (适用于 WebWorker 和 Node.js)</p>
              <pre class="code-block">output: {
  library: 'MyLibrary',
  globalObject: 'this'
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>使用场景</h2>
        </div>

        <div class="cases-grid">
          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>UI 组件库</h3>
            <p>创建可复用的 UI 组件库，通过全局变量或模块系统引入</p>
            <pre class="code-block">library: {
  name: 'MyUI',
  type: 'umd'
}</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🔧</div>
            <h3>工具函数库</h3>
            <p>封装常用工具函数，支持多种环境使用</p>
            <pre class="code-block">library: {
  name: 'Utils',
  type: 'umd'
}</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">📱</div>
            <h3>SDK 开发</h3>
            <p>为第三方服务创建 JavaScript SDK</p>
            <pre class="code-block">library: {
  name: 'MySDK',
  type: 'umd',
  globalObject: 'this'
}</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🔄</div>
            <h3>插件系统</h3>
            <p>为主框架开发可插拔的插件系统</p>
            <pre class="code-block">library: {
  type: 'assign',
  name: 'MyPluginSystem'
}</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🌐</div>
            <h3>微前端共享库</h3>
            <p>在微前端架构中共享公共库</p>
            <pre class="code-block">library: {
  name: 'SharedLib',
  type: 'window'
}</pre>
          </div>

          <div class="case-card">
            <div class="case-icon">🧩</div>
            <h3>模块联邦</h3>
            <p>作为 Webpack 5 模块联邦的远程库</p>
            <pre class="code-block">library: {
  type: 'module',
  name: 'FederatedModule'
}</pre>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔤</div>
            <div class="practice-content">
              <h3>命名空间策略</h3>
              <p>使用唯一前缀避免全局命名冲突</p>
              <pre class="code-block">library: 'CompanyName_LibraryName'</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <div class="practice-content">
              <h3>UMD 通用导出</h3>
              <p>优先使用 UMD 格式兼容多种环境</p>
              <pre class="code-block">library: {
  name: 'MyLibrary',
  type: 'umd',
  umdNamedDefine: true
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔗</div>
            <div class="practice-content">
              <h3>外部依赖处理</h3>
              <p>将第三方库标记为外部依赖</p>
              <pre class="code-block">externals: {
  lodash: {
    commonjs: 'lodash',
    commonjs2: 'lodash',
    amd: 'lodash',
    root: '_'
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚙️</div>
            <div class="practice-content">
              <h3>多环境支持</h3>
              <p>正确配置 globalObject</p>
              <pre class="code-block">output: {
  library: 'MyLibrary',
  globalObject: 'this' // 支持 Node.js 和浏览器环境
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📝</div>
            <div class="practice-content">
              <h3>类型声明生成</h3>
              <p>为 TypeScript 库生成声明文件</p>
              <pre class="code-block">// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist/types"
  }
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📚</div>
            <div class="practice-content">
              <h3>多入口点配置</h3>
              <p>支持按需加载子模块</p>
              <pre class="code-block">entry: {
  main: './src/index.ts',
  utils: './src/utils/index.ts'
},
output: {
  filename: '[name].js',
  library: ['MyLibrary', '[name]'],
  libraryTarget: 'umd'
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整示例 -->
      <section class="full-example">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>完整配置示例</h2>
        </div>

        <div class="example-container">
          <pre class="code-block">const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-library.js',
    library: {
      name: 'MyLibrary',
      type: 'umd',
      umdNamedDefine: true
    },
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    // 将 lodash 标记为外部依赖
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};</pre>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>常见问题与解决方案</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-card">
            <h3>库无法在浏览器中使用</h3>
            <p><strong>原因：</strong> 缺少全局变量定义或类型错误</p>
            <p><strong>解决方案：</strong> 检查 library.name 配置，确保正确设置 globalObject</p>
            <pre class="code-block">output: {
  library: 'MyLibrary',
  globalObject: 'this'
}</pre>
          </div>

          <div class="faq-card">
            <h3>UMD 打包体积过大</h3>
            <p><strong>原因：</strong> 包含了所有模块系统支持代码</p>
            <p><strong>解决方案：</strong> 按目标环境选择特定模块类型</p>
            <pre class="code-block">// 仅针对浏览器环境
library: {
  type: 'window',
  name: 'MyLibrary'
}</pre>
          </div>

          <div class="faq-card">
            <h3>库在 Node.js 中无法使用</h3>
            <p><strong>原因：</strong> 缺少 CommonJS 支持</p>
            <p><strong>解决方案：</strong> 使用 UMD 或 CommonJS 类型</p>
            <pre class="code-block">library: {
  type: 'commonjs2'
}</pre>
          </div>

          <div class="faq-card">
            <h3>多个库冲突</h3>
            <p><strong>原因：</strong> 全局变量名冲突</p>
            <p><strong>解决方案：</strong> 使用命名空间或更独特的库名</p>
            <pre class="code-block">library: 'Company_MyLibrary'</pre>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Webpack Library 配置基础介绍 | JavaScript 库打包指南 | </p>
      <div class="footer-links">
        <a href="https://webpack.js.org/configuration/output/#outputlibrary" target="_blank">官方文档</a>
        <a href="https://github.com/webpack/webpack" target="_blank">GitHub</a>
        <a href="https://webpack.js.org/guides/author-libraries/" target="_blank">库开发指南</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 无需复杂逻辑，主要用于展示
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.library-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #1e88e5, #0d47a1);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .webpack-logo {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      width: 60px;
      height: 60px;
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
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    background: #dbeafe;
    color: #1e88e5;
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
    color: #1e293b;
  }
}

.intro-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .benefit-card {
    background: #e3f2fd;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1e88e5;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.core-functions {
  margin-top: 2.5rem;

  .section-subtitle {
    font-size: 1.4rem;
    color: #1565c0;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #bbdefb;
  }

  ul {
    list-style-type: none;
    padding-left: 1.5rem;

    li {
      position: relative;
      padding-left: 1.8rem;
      margin-bottom: 0.8rem;
      font-size: 1.05rem;

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #1e88e5;
        font-size: 1.5rem;
        line-height: 1;
      }
    }
  }
}

.config-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  .example-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    border-top: 3px solid #64b5f6;

    h3 {
      margin-top: 0;
      color: #1e293b;
      font-size: 1.3rem;
    }
  }
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.param-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #42a5f5;

  .param-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background: #e3f2fd;

    .param-name {
      font-weight: 700;
      font-size: 1.1rem;
      color: #1565c0;
    }

    .param-type {
      background: #bbdefb;
      color: #0d47a1;
      padding: 0.2rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

  .param-desc {
    padding: 1.2rem;

    p {
      margin: 0 0 0.8rem;
      color: #4b5563;
      line-height: 1.5;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0.8rem 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .case-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    border-top: 3px solid #90caf9;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #42a5f5;
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 1rem;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  display: flex;
  gap: 1rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  .practice-icon {
    font-size: 1.8rem;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #e3f2fd;
    color: #1e88e5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .practice-content {
    flex: 1;

    h3 {
      margin: 0 0 0.8rem;
      font-size: 1.2rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 0.8rem;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.example-container {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.faq-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #64b5f6;

  h3 {
    margin: 0 0 1rem;
    font-size: 1.2rem;
    color: #1565c0;
  }

  p {
    margin: 0 0 0.8rem;
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.5;

    strong {
      color: #1e293b;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #90a4ae;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #1e88e5;
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
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
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

  .config-examples {
    grid-template-columns: 1fr;
  }

  .params-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .webpack-logo {
    width: 60px;
    height: 60px;

    svg {
      width: 45px;
      height: 45px;
    }
  }
}
</style>
