<template>
  <div class="webpack-config-container">
    <header class="header">
      <h1>⚙️ Webpack 配置基础介绍</h1>
      <p class="subtitle">掌握核心配置项，构建高效前端工程</p>
    </header>

    <div class="navigation">
      <div class="nav-item" :class="{ active: activeSection === 'entry' }" @click="activeSection = 'entry'">
        <div class="nav-icon">📁</div>
        <div>入口(entry)</div>
      </div>
      <div class="nav-item" :class="{ active: activeSection === 'output' }" @click="activeSection = 'output'">
        <div class="nav-icon">📦</div>
        <div>输出(output)</div>
      </div>
      <div class="nav-item" :class="{ active: activeSection === 'loader' }" @click="activeSection = 'loader'">
        <div class="nav-icon">🔧</div>
        <div>加载器(loader)</div>
      </div>
      <div class="nav-item" :class="{ active: activeSection === 'plugin' }" @click="activeSection = 'plugin'">
        <div class="nav-icon">🧩</div>
        <div>插件(plugin)</div>
      </div>
    </div>

    <div class="content-section">
      <!-- Entry 配置 -->
      <div v-if="activeSection === 'entry'" class="config-section">
        <h2><span class="section-icon">📁</span> 入口(entry)</h2>

        <div class="config-description">
          <p>入口起点(entry point)指示 Webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。</p>
          <p>进入入口起点后，Webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。</p>
        </div>

        <div class="config-card">
          <h3>配置方式</h3>

          <div class="config-option">
            <h4>1. 单入口（字符串语法）</h4>
            <pre class="code">module.exports = {
  entry: './src/index.js'
};</pre>
            <p>适用于简单的单页面应用(SPA)</p>
          </div>

          <div class="config-option">
            <h4>2. 多入口（对象语法）</h4>
            <pre class="code">module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  }
};</pre>
            <p>适用于多页面应用(MPA)，每个入口生成一个 bundle</p>
          </div>

          <div class="config-option">
            <h4>3. 动态入口（函数语法）</h4>
            <pre class="code">module.exports = {
  entry: () => ({
    app: './src/app.js',
    admin: './src/admin.js'
  })
};</pre>
            <p>适用于需要动态生成入口点的场景</p>
          </div>
        </div>

        <div class="use-case">
          <h3>使用场景</h3>
          <ul>
            <li>单页面应用：单入口配置</li>
            <li>多页面应用：多个入口点对应不同页面</li>
            <li>代码分离：不同入口共享公共模块</li>
            <li>动态加载：根据条件动态生成入口点</li>
          </ul>
        </div>
      </div>

      <!-- Output 配置 -->
      <div v-if="activeSection === 'output'" class="config-section">
        <h2><span class="section-icon">📦</span> 输出(output)</h2>

        <div class="config-description">
          <p>output 属性告诉 Webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。</p>
          <p>主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。</p>
        </div>

        <div class="config-card">
          <h3>核心配置项</h3>

          <div class="config-option">
            <h4>path</h4>
            <p>输出文件的目标路径</p>
            <pre class="code">const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};</pre>
          </div>

          <div class="config-option">
            <h4>filename</h4>
            <p>输出文件的名称</p>
            <pre class="code">module.exports = {
  output: {
    filename: 'bundle.js'
    // 或使用占位符
    // filename: '[name].bundle.js'
    // filename: '[name].[contenthash].js'
  }
};</pre>
          </div>

          <div class="config-option">
            <h4>publicPath</h4>
            <p>公共路径，用于加载外部资源</p>
            <pre class="code">module.exports = {
  output: {
    publicPath: '/assets/'
    // 或使用CDN
    // publicPath: 'https://cdn.example.com/assets/'
  }
};</pre>
          </div>

          <div class="config-option">
            <h4>chunkFilename</h4>
            <p>非入口(non-entry) chunk 文件的名称</p>
            <pre class="code">module.exports = {
  output: {
    chunkFilename: '[name].chunk.js'
  }
};</pre>
          </div>
        </div>

        <div class="use-case">
          <h3>最佳实践</h3>
          <ul>
            <li>使用 <code>path.resolve</code> 处理绝对路径</li>
            <li>使用 <code>[contenthash]</code> 实现长效缓存</li>
            <li>生产环境使用CDN配置 <code>publicPath</code></li>
            <li>为不同环境配置不同的输出路径</li>
          </ul>
        </div>
      </div>

      <!-- Loader 配置 -->
      <div v-if="activeSection === 'loader'" class="config-section">
        <h2><span class="section-icon">🔧</span> 加载器(loader)</h2>

        <div class="config-description">
          <p>loader 用于对模块的源代码进行转换。它们允许你预处理文件，将其转换为 JavaScript 可以识别的格式。</p>
          <p>loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。</p>
        </div>

        <div class="config-card">
          <h3>配置方式</h3>

          <div class="config-option">
            <h4>基本结构</h4>
            <pre class="code">module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,  // 匹配文件扩展名
        use: [          // 使用的loader
          'loader-name'
        ],
        exclude: /node_modules/  // 排除目录
      }
    ]
  }
};</pre>
          </div>

          <div class="common-loaders">
            <h3>常用 Loader 示例</h3>

            <div class="loader-example">
              <h4>Babel Loader</h4>
              <p>转换 ES6+ 语法</p>
              <pre class="code">{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}</pre>
            </div>

            <div class="loader-example">
              <h4>CSS Loader + Style Loader</h4>
              <p>处理 CSS 文件</p>
              <pre class="code">{
  test: /\.css$/,
  use: [
    'style-loader',  // 将CSS注入DOM
    'css-loader'     // 解析CSS导入
  ]
}</pre>
            </div>

            <div class="loader-example">
              <h4>File Loader</h4>
              <p>处理文件资源</p>
              <pre class="code">{
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/'
      }
    }
  ]
}</pre>
            </div>
          </div>
        </div>

        <div class="use-case">
          <h3>Loader 执行顺序</h3>
          <p>Loader 从右到左（或从下到上）执行：</p>
          <pre class="code">use: [
  'style-loader', // 最后执行
  'css-loader',   // 其次执行
  'sass-loader'   // 最先执行
]</pre>
          <p>数据流：sass → css → style</p>
        </div>
      </div>

      <!-- Plugin 配置 -->
      <div v-if="activeSection === 'plugin'" class="config-section">
        <h2><span class="section-icon">🧩</span> 插件(plugin)</h2>

        <div class="config-description">
          <p>插件是 Webpack 的支柱功能，用于执行范围更广的任务。插件的范围包括从打包优化和压缩，一直到重新定义环境中的变量。</p>
          <p>插件接口功能极其强大，可以用来处理各种各样的任务。</p>
        </div>

        <div class="config-card">
          <h3>配置方式</h3>

          <div class="config-option">
            <h4>基本结构</h4>
            <pre class="code">const ExamplePlugin = require('example-plugin');

module.exports = {
  plugins: [
    new ExamplePlugin({ options })
  ]
};</pre>
            <p>插件通过构造函数实例化后添加到 plugins 数组</p>
          </div>

          <div class="common-plugins">
            <h3>常用插件示例</h3>

            <div class="plugin-example">
              <h4>HtmlWebpackPlugin</h4>
              <p>自动生成 HTML 文件并注入资源</p>
              <pre class="code">const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    })
  ]
};</pre>
            </div>

            <div class="plugin-example">
              <h4>MiniCssExtractPlugin</h4>
              <p>将 CSS 提取到单独的文件</p>
              <pre class="code">const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};</pre>
            </div>

            <div class="plugin-example">
              <h4>CleanWebpackPlugin</h4>
              <p>在构建前清理输出目录</p>
              <pre class="code">const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};</pre>
            </div>
          </div>
        </div>

        <div class="use-case">
          <h3>插件使用场景</h3>
          <ul>
            <li>资源管理：生成HTML、提取CSS</li>
            <li>优化：压缩代码、去除未使用代码</li>
            <li>环境变量：定义全局常量</li>
            <li>开发辅助：热更新、进度条</li>
            <li>分析：包大小分析、依赖可视化</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="full-config">
      <h2><span class="section-icon">📄</span> 完整配置示例</h2>
      <pre class="code">const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 入口配置
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },

  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },

  // 模块和loader配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },

  // 插件配置
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 开发服务器
  devServer: {
    contentBase: './dist',
    hot: true
  },

  // 模式配置
  mode: 'development'
};</pre>
    </div>

    <footer class="footer">
      <p>Webpack 配置指南 | 最后更新: {{ currentDate }}</p>
      <div class="footer-links">
        <a href="https://webpack.js.org/" target="_blank">官方文档</a>
        <a href="#">配置示例</a>
        <a href="#">最佳实践</a>
        <a href="#">问题反馈</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSection = ref('entry');
const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
</script>

<style lang="less" scoped>


:root {
  --primary: #4a6cf7;
  --primary-light: #eef2ff;
  --secondary: #8b5cf6;
  --accent: #0ea5e9;
  --background: #f8fafc;
  --card-bg: #ffffff;
  --text: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --code-bg: #f1f5f9;
  --nav-active: #e0e7ff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.webpack-config-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 3rem 0 1.5rem;
  margin-bottom: 1rem;

  h1 {
    font-size: 2.5rem;
    color: var(--primary);
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 800px;
    margin: 0 auto;
  }
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 15px 0;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 25px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 120px;

    &:hover {
      background: var(--primary-light);
    }

    &.active {
      background: var(--nav-active);
      color: var(--primary);
      font-weight: 600;
    }

    .nav-icon {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
  }
}

.content-section {
  flex: 1;
}

.config-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border);

    .section-icon {
      font-size: 1.5rem;
    }
  }
}

.config-description {
  background: var(--primary-light);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;

  p {
    margin-bottom: 15px;
    line-height: 1.7;
    color: var(--text);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.config-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: var(--primary);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }
}

.config-option {
  margin-bottom: 30px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin-bottom: 15px;
    color: var(--text-light);
    line-height: 1.6;
  }
}

.common-loaders,
.common-plugins {
  margin-top: 30px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: var(--primary);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }
}

.loader-example,
.plugin-example {
  background: var(--primary-light);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--secondary);
  }

  p {
    margin-bottom: 15px;
    color: var(--text-light);
  }
}

.use-case {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--primary);
  }

  ul {
    list-style: none;

    li {
      padding: 10px 0;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '•';
        position: absolute;
        left: 10px;
        top: 10px;
        color: var(--primary);
        font-size: 1.2rem;
      }
    }
  }
}

.code {
  background: var(--code-bg);
  border-radius: 8px;
  padding: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 15px 0;
  display: block;
  border: 1px solid var(--border);
  color: var(--text);
  line-height: 1.5;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.full-config {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border);
  }
}

.footer {
  text-align: center;
  padding: 25px 0;
  margin-top: auto;
  color: var(--text-light);
  font-size: 0.9rem;
  border-top: 1px solid var(--border);

  .footer-links {
    margin-top: 10px;

    a {
      color: var(--primary);
      text-decoration: none;
      margin: 0 10px;
      transition: color 0.3s;

      &:hover {
        color: var(--secondary);
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .navigation {
    gap: 8px;

    .nav-item {
      padding: 10px 15px;
      min-width: 100px;
    }
  }

  .config-section {
    padding: 20px;
  }

  .config-card {
    padding: 15px;
  }

  .code {
    font-size: 0.85rem;
    padding: 15px;
  }
}
</style>
