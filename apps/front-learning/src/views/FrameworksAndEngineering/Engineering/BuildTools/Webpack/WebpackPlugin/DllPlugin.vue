<template>
  <div class="dll-container">
    <!-- 头部区域 -->
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
        <h1 class="main-title">Webpack DllPlugin 基础介绍</h1>
        <p class="subtitle">提升大型项目构建速度的利器</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- DllPlugin 简介 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>什么是 DllPlugin？</h2>
        </div>

        <div class="intro-content">
          <p>
            <strong>Webpack 的 DllPlugin</strong> 是用于提升大型项目构建性能的插件。"DLL" 是 Dynamic Link
            Library（动态链接库）的缩写，该插件允许您将不经常更改的代码打包成单独的库文件，从而显著减少后续构建的时间。
          </p>

          <div class="benefit-grid">
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h3>构建加速</h3>
              <p>减少重复构建时间达 50-80%</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">📦</div>
              <h3>代码拆分</h3>
              <p>分离稳定依赖与业务代码</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-icon">🔄</div>
              <h3>缓存利用</h3>
              <p>充分利用浏览器缓存机制</p>
            </div>
          </div>

          <div class="core-functions">
            <h3 class="section-subtitle">核心原理</h3>
            <ul>
              <li><strong>预编译机制</strong>：将稳定依赖（如 Vue、React、Lodash）预先打包</li>
              <li><strong>清单文件</strong>：生成 manifest.json 描述模块关系</li>
              <li><strong>引用分离</strong>：主构建过程跳过预打包模块</li>
              <li><strong>动态链接</strong>：运行时通过全局变量引用预打包模块</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 工作流程 -->
      <section class="workflow-section">
        <div class="section-header">
          <div class="icon">🔁</div>
          <h2>DllPlugin 工作流程</h2>
        </div>

        <div class="workflow-steps">
          <div class="workflow-card">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建 DLL 配置</h3>
              <p>定义稳定的第三方库作为入口</p>
              <pre class="code-block">// webpack.dll.config.js
entry: {
  vendor: ['vue', 'vue-router', 'axios']
}</pre>
            </div>
          </div>

          <div class="workflow-card">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>打包 DLL 文件</h3>
              <p>运行专用命令打包 DLL</p>
              <pre class="code-block">webpack --config webpack.dll.config.js</pre>
            </div>
          </div>

          <div class="workflow-card">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>生成清单文件</h3>
              <p>DllPlugin 生成 manifest.json</p>
              <pre class="code-block">new webpack.DllPlugin({
  path: path.join(__dirname, 'dll', '[name]-manifest.json'),
  name: '[name]_[hash]'
})</pre>
            </div>
          </div>

          <div class="workflow-card">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>主构建引用</h3>
              <p>使用 DllReferencePlugin 关联</p>
              <pre class="code-block">new webpack.DllReferencePlugin({
  manifest: require('./dll/vendor-manifest.json')
})</pre>
            </div>
          </div>

          <div class="workflow-card">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>HTML 引入</h3>
              <p>通过 script 标签加载 DLL 文件</p>
              <pre class="code-block">&lt;script src="dll/vendor.dll.js"&gt;&lt;/script&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置基础介绍 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>DllPlugin 配置基础介绍</h2>
        </div>

        <div class="config-grid">
          <div class="config-card">
            <div class="param-header">
              <div class="param-name">context (可选)</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> manifest 文件中请求的上下文，默认为当前 webpack 配置的上下文</p>
              <p><strong>使用场景：</strong> 当 DLL 和应用程序在不同路径时需要配置</p>
              <pre class="code-block">context: path.resolve(__dirname, 'src')</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">name</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 暴露的 DLL 函数的名称，需与 output.library 保持一致</p>
              <p><strong>命名格式：</strong> 推荐使用 [name]_[hash] 防止冲突</p>
              <pre class="code-block">name: 'vendor_[hash]'</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">path</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> manifest.json 文件的输出路径</p>
              <p><strong>注意：</strong> DllReferencePlugin 依赖此文件映射关系</p>
              <pre class="code-block">path: path.join(__dirname, 'dll', '[name]-manifest.json')</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">entryOnly (可选)</div>
              <div class="param-type">boolean</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 是否仅将入口模块导出</p>
              <p><strong>默认值：</strong> <code>true</code></p>
              <p>设置为 false 时，会导出 DLL bundle 中的所有模块</p>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">type (可选)</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 生成 DLL bundle 的类型</p>
              <p><strong>可选值：</strong></p>
              <ul>
                <li><code>'var'</code> - 通过变量导出（默认）</li>
                <li><code>'commonjs'</code> - CommonJS 模块导出</li>
                <li><code>'commonjs2'</code> - 以 module.exports 导出</li>
                <li><code>'this'</code> - 绑定到 this 对象</li>
                <li><code>'window'</code> - 绑定到 window 对象</li>
                <li><code>'global'</code> - 绑定到 global 对象</li>
              </ul>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">format (可选)</div>
              <div class="param-type">boolean</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 控制 manifest 文件的格式</p>
              <p><strong>默认值：</strong> <code>true</code>（使用 JSON 格式）</p>
              <p>设置为 false 时可以使用自定义格式</p>
            </div>
          </div>
        </div>
      </section>

      <!-- DllReferencePlugin 配置 -->
      <section class="reference-section">
        <div class="section-header">
          <div class="icon">🔗</div>
          <h2>DllReferencePlugin 配置</h2>
        </div>

        <div class="config-grid">
          <div class="config-card">
            <div class="param-header">
              <div class="param-name">context</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 与 DllPlugin 的 context 保持一致</p>
              <p><strong>注意：</strong> 必须与 DllPlugin 配置一致</p>
              <pre class="code-block">context: path.resolve(__dirname, 'src')</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">manifest</div>
              <div class="param-type">string | object</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 导入 DllPlugin 生成的 manifest 文件</p>
              <p><strong>必要参数：</strong> 必须配置否则插件无效</p>
              <pre class="code-block">manifest: require('./dll/vendor-manifest.json')</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">name (可选)</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> DLL bundle 暴露的名称</p>
              <p><strong>注意：</strong> 需与 DllPlugin 的 name 配置一致</p>
              <pre class="code-block">name: 'vendor_[hash]'</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">scope (可选)</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> DLL 中模块的前缀</p>
              <p><strong>使用场景：</strong> 访问特定 DLL 中的嵌套模块</p>
              <pre class="code-block">scope: 'my_scope'</pre>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">sourceType (可选)</div>
              <div class="param-type">string</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> 设置 DLL 的导出类型</p>
              <p><strong>可选值：</strong> <code>'var'</code>, <code>'commonjs'</code>, <code>'commonjs2'</code> 等</p>
              <p>默认与 DllPlugin 的 type 一致</p>
            </div>
          </div>

          <div class="config-card">
            <div class="param-header">
              <div class="param-name">content (可选)</div>
              <div class="param-type">string | object</div>
            </div>
            <div class="param-desc">
              <p><strong>作用：</strong> manifest 的内容（替代 manifest 文件路径）</p>
              <p><strong>使用场景：</strong> 动态生成 manifest 时</p>
              <pre class="code-block">content: { /* manifest 对象 */ }</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <div class="section-header">
          <div class="icon">🎯</div>
          <h2>最佳使用场景</h2>
        </div>

        <div class="cases-grid">
          <div class="case-card">
            <div class="case-icon">🏗️</div>
            <h3>大型企业应用</h3>
            <p>项目依赖大量第三方库，构建时间超过 30 秒</p>
            <div class="stats">
              <span>构建时间减少</span>
              <span class="highlight">60-80%</span>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">📱</div>
            <h3>多页应用(MPA)</h3>
            <p>多个入口共享相同依赖库</p>
            <div class="stats">
              <span>依赖库复用</span>
              <span class="highlight">100%</span>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🚀</div>
            <h3>持续集成环境</h3>
            <p>CI/CD 环境中需要频繁构建</p>
            <div class="stats">
              <span>构建次数减少</span>
              <span class="highlight">90%+</span>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🧪</div>
            <h3>开发环境加速</h3>
            <p>开发时频繁修改业务代码</p>
            <div class="stats">
              <span>HMR 速度提升</span>
              <span class="highlight">40-60%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 完整配置示例 -->
      <section class="full-example">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>完整配置示例</h2>
        </div>

        <div class="tabs">
          <div :class="['tab', { active: activeTab === 'dll' }]" @click="activeTab = 'dll'">
            webpack.dll.config.js
          </div>
          <div :class="['tab', { active: activeTab === 'main' }]" @click="activeTab = 'main'">
            webpack.config.js
          </div>
          <div :class="['tab', { active: activeTab === 'package' }]" @click="activeTab = 'package'">
            package.json
          </div>
        </div>

        <div class="example-container">
          <div v-if="activeTab === 'dll'" class="code-container">
            <pre class="code-block">const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios',
      'lodash',
      'moment'
    ]
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[fullhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[fullhash]'
    })
  ]
};</pre>
          </div>

          <div v-if="activeTab === 'main'" class="code-container">
            <pre class="code-block">const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor-manifest.json'),
      context: path.resolve(__dirname, 'src')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // 自动注入 DLL 文件
      dll: './dll/vendor.dll.js'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080
  }
};</pre>
          </div>

          <div v-if="activeTab === 'package'" class="code-container">
            <pre class="code-block">{
  "scripts": {
    "build:dll": "webpack --config webpack.dll.config.js",
    "build": "npm run build:dll && webpack",
    "dev": "npm run build:dll && webpack serve"
  },
  "dependencies": {
    "vue": "^3.2.33",
    "vue-router": "^4.0.15",
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.8.1",
    "html-webpack-plugin": "^5.5.0"
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践指南</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">📁</div>
            <div class="practice-content">
              <h3>合理分组</h3>
              <p>根据更新频率分组打包：</p>
              <ul>
                <li>核心框架 (Vue/React)</li>
                <li>工具库 (Lodash/Moment)</li>
                <li>UI库 (Element/Ant Design)</li>
              </ul>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔐</div>
            <div class="practice-content">
              <h3>版本控制</h3>
              <p>在 DLL 文件名中包含哈希值：</p>
              <pre class="code-block">output: {
  filename: '[name].[fullhash].dll.js',
  library: '[name]_[fullhash]'
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📊</div>
            <div class="practice-content">
              <h3>自动注入</h3>
              <p>使用插件自动注入 DLL 引用：</p>
              <pre class="code-block">// html-webpack-include-assets-plugin
new HtmlWebpackPlugin(),
new HtmlWebpackIncludeAssetsPlugin({
  assets: ['dll/vendor.dll.js'],
  append: false
})</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🚦</div>
            <div class="practice-content">
              <h3>更新策略</h3>
              <p>当 DLL 依赖更新时：</p>
              <ol>
                <li>更新 package.json</li>
                <li>重新运行 build:dll</li>
                <li>更新主应用版本号</li>
              </ol>
            </div>
          </div>
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
            <h3>DLL 文件未加载</h3>
            <p><strong>症状：</strong> 控制台报错 "xxx is not defined"</p>
            <p><strong>解决方案：</strong></p>
            <ol>
              <li>检查 HTML 中是否引入 DLL 文件</li>
              <li>确认 DllPlugin 和 DllReferencePlugin 的 name 一致</li>
              <li>检查路径是否正确</li>
            </ol>
          </div>

          <div class="faq-card">
            <h3>模块未找到</h3>
            <p><strong>症状：</strong> "Module not found" 错误</p>
            <p><strong>解决方案：</strong></p>
            <ol>
              <li>确认所有依赖都已包含在 DLL 入口</li>
              <li>检查 manifest 文件是否最新</li>
              <li>清理缓存并重新构建</li>
            </ol>
          </div>

          <div class="faq-card">
            <h3>构建速度未提升</h3>
            <p><strong>原因：</strong> 未正确配置 DllReferencePlugin</p>
            <p><strong>解决方案：</strong></p>
            <ol>
              <li>确认主配置使用了 DllReferencePlugin</li>
              <li>检查 manifest 路径是否正确</li>
              <li>确保 context 配置一致</li>
            </ol>
          </div>

          <div class="faq-card">
            <h3>版本更新问题</h3>
            <p><strong>症状：</strong> 更新依赖后页面报错</p>
            <p><strong>解决方案：</strong></p>
            <ol>
              <li>更新 DLL 依赖后必须重新打包 DLL</li>
              <li>更新主应用版本号强制缓存刷新</li>
              <li>考虑使用文件名哈希</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 现代替代方案 -->
      <section class="alternatives">
        <div class="section-header">
          <div class="icon">🆕</div>
          <h2>现代替代方案</h2>
        </div>

        <div class="alternatives-content">
          <p>随着 Webpack 5 的发布，DllPlugin 不再是唯一的选择：</p>

          <div class="alt-grid">
            <div class="alt-card">
              <div class="alt-icon">🔗</div>
              <h3>模块联盟(Module Federation)</h3>
              <p>Webpack 5 原生支持，更灵活的动态模块加载</p>
              <p><strong>优势：</strong> 无需要求加载顺序，支持运行时动态加载</p>
            </div>

            <div class="alt-card">
              <div class="alt-icon">📝</div>
              <h3>持久缓存</h3>
              <p>Webpack 5 内置持久缓存机制</p>
              <p><strong>配置：</strong></p>
              <pre class="code-block">cache: {
  type: 'filesystem',
  buildDependencies: {
    config: [__filename]
  }
}</pre>
            </div>
          </div>

          <div class="comparison">
            <h3>DllPlugin vs 模块联盟</h3>
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>DllPlugin</th>
                  <th>模块联盟</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Webpack 版本</td>
                  <td>v2+</td>
                  <td>v5+</td>
                </tr>
                <tr>
                  <td>配置复杂度</td>
                  <td>中等</td>
                  <td>较高</td>
                </tr>
                <tr>
                  <td>动态加载</td>
                  <td>有限</td>
                  <td>优秀</td>
                </tr>
                <tr>
                  <td>微前端支持</td>
                  <td>弱</td>
                  <td>优秀</td>
                </tr>
                <tr>
                  <td>构建速度提升</td>
                  <td>60-80%</td>
                  <td>50-70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Webpack DllPlugin 基础介绍 | 构建性能优化方案 | </p>
      <div class="footer-links">
        <a href="https://webpack.js.org/plugins/dll-plugin/" target="_blank">官方文档</a>
        <a href="https://github.com/webpack/webpack" target="_blank">GitHub</a>
        <a href="https://medium.com/webpack/webpack-performance-optimization-dll-plugin-vs-externals-1cd6f594e44b"
          target="_blank">性能对比</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref('dll');
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.dll-container {
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
  background: linear-gradient(135deg, #4c6ef5, #364fc7);
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
    color: #4c6ef5;
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
    background: #edf2ff;
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
      color: #4c6ef5;
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
    color: #364fc7;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #dbe4ff;
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
        color: #4c6ef5;
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: #364fc7;
      }
    }
  }
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

.workflow-card {
  display: flex;
  gap: 1.2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-left: 4px solid #4c6ef5;

  .step-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: #4c6ef5;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    background: #edf2ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-content {
    flex: 1;

    h3 {
      margin: 0 0 0.8rem;
      font-size: 1.3rem;
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

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.config-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #748ffc;

  .param-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background: #edf2ff;

    .param-name {
      font-weight: 700;
      font-size: 1.1rem;
      color: #364fc7;
    }

    .param-type {
      background: #dbe4ff;
      color: #364fc7;
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

    ol {
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
    border-top: 3px solid #91a7ff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .case-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #5c7cfa;
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

    .stats {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #5c7cfa;
      border-top: 1px dashed #e2e8f0;
      padding-top: 0.8rem;

      .highlight {
        font-weight: 700;
        font-size: 1.1rem;
        color: #364fc7;
      }
    }
  }
}

.tabs {
  display: flex;
  margin: 1.5rem 0;
  border-bottom: 1px solid #e2e8f0;

  .tab {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #94a3b8;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      color: #4c6ef5;
    }

    &.active {
      color: #4c6ef5;
      border-bottom: 3px solid #4c6ef5;
      font-weight: 600;
    }
  }
}

.example-container {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  overflow: hidden;
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
    background: #edf2ff;
    color: #4c6ef5;
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

    ul,
    ol {
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
  border-top: 3px solid #748ffc;

  h3 {
    margin: 0 0 1rem;
    font-size: 1.2rem;
    color: #364fc7;
  }

  p {
    margin: 0 0 0.8rem;
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  ol {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.alternatives-content {
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

.alt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.alt-card {
  background: #edf2ff;
  border-radius: 12px;
  padding: 1.5rem;

  .alt-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #4c6ef5;
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.3rem;
    color: #1e293b;
  }

  p {
    margin: 0 0 0.8rem;
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.comparison {
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    th {
      background: #4c6ef5;
      color: white;
      padding: 1rem;
      text-align: left;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }

    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #4c6ef5;
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

  .config-grid {
    grid-template-columns: 1fr;
  }

  .workflow-steps {
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

  .tabs {
    flex-direction: column;

    .tab {
      text-align: center;
      border-bottom: 1px solid #e2e8f0;

      &.active {
        border-bottom: 3px solid #4c6ef5;
      }
    }
  }
}
</style>
