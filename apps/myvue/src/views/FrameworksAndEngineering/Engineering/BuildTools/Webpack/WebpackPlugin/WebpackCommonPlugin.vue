<template>
  <div class="webpack-plugins-container">
    <div class="intro-header">
      <h1 class="main-title">
        <span class="title-icon">📦</span> Webpack 常用 Plugin 基础介绍
      </h1>
      <div class="subtitle">
        提升构建效率与项目优化的核心工具
      </div>
    </div>

    <div class="content-explanation">
      <div class="explanation-card">
        <h2 class="explanation-title">🔍 什么是 Webpack Plugin?</h2>
        <p class="explanation-text">
          Plugin 是 Webpack 生态系统的重要组成部分，用于执行更广泛的任务，包括打包优化、资源管理和环境变量注入等。
          与 loader 不同，plugin 可以深入到打包流程的各个环节，提供更强大的定制功能。
        </p>
      </div>
    </div>

    <div class="plugin-grid">
      <!-- HtmlWebpackPlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">📄</div>
          <h3 class="plugin-title">HtmlWebpackPlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>自动生成 HTML 文件</li>
            <li>自动注入打包后的 JS/CSS 资源</li>
            <li>支持模板定制和变量注入</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'My App',
      favicon: './src/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>SPA 应用入口文件生成</li>
            <li>多页面应用(MPA)的 HTML 管理</li>
            <li>自动化资源注入</li>
          </ul>
        </div>
      </div>

      <!-- MiniCssExtractPlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">🎨</div>
          <h3 class="plugin-title">MiniCssExtractPlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>提取 CSS 到单独文件</li>
            <li>支持 CSS 和 SourceMaps 按需加载</li>
            <li>减少 JS 体积，提高加载速度</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: 'styles/[id].[contenthash:8].css'
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>生产环境 CSS 优化</li>
            <li>大型项目样式文件管理</li>
            <li>CSS 文件缓存优化</li>
          </ul>
        </div>
      </div>

      <!-- CopyWebpackPlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">📂</div>
          <h3 class="plugin-title">CopyWebpackPlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>复制文件/目录到构建目录</li>
            <li>支持文件过滤和路径转换</li>
            <li>保留文件原始结构和属性</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public/assets',
          to: 'static',
          globOptions: {
            ignore: ['**/.DS_Store', '**/temp/**']
          }
        },
        {
          from: 'public/favicon.ico',
          to: 'favicon.ico'
        }
      ]
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>静态资源（图片/字体）复制</li>
            <li>配置文件（如 robots.txt）复制</li>
            <li>第三方库不需要打包时的复制</li>
          </ul>
        </div>
      </div>

      <!-- DefinePlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">🔧</div>
          <h3 class="plugin-title">DefinePlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>定义全局常量</li>
            <li>在编译阶段替换代码中的变量</li>
            <li>区分开发环境与生产环境</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // 字符串需要 JSON.stringify
      'process.env.API_URL': JSON.stringify('https://api.example.com'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'APP_VERSION': JSON.stringify('1.2.0'),
      __DEV__: process.env.NODE_ENV === 'development'
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>环境变量注入</li>
            <li>全局配置常量</li>
            <li>条件编译（开发/生产环境）</li>
          </ul>
        </div>
      </div>

      <!-- CleanWebpackPlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">🧹</div>
          <h3 class="plugin-title">CleanWebpackPlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>在每次构建前清理输出目录</li>
            <li>避免旧文件残留</li>
            <li>支持排除特定文件</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!stats.json', // 排除特定文件
        '!important-config.json'
      ],
      cleanAfterEveryBuildPatterns: ['!*.html'],
      dry: false, // 模拟删除（测试用）
      verbose: true // 显示删除日志
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>生产构建前清理 dist 目录</li>
            <li>避免旧文件导致构建结果不一致</li>
            <li>CI/CD 环境自动化清理</li>
          </ul>
        </div>
      </div>

      <!-- BundleAnalyzerPlugin -->
      <div class="plugin-card">
        <div class="plugin-header">
          <div class="plugin-icon">📊</div>
          <h3 class="plugin-title">BundleAnalyzerPlugin</h3>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">💡 作用</h4>
          <ul class="feature-list">
            <li>可视化分析打包结果</li>
            <li>展示模块大小及依赖关系</li>
            <li>帮助识别性能瓶颈</li>
          </ul>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">⚙️ 配置示例</h4>
          <pre class="code-block">const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // server | static | disabled
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json'
    })
  ]
}</pre>
        </div>

        <div class="plugin-section">
          <h4 class="section-title">🎯 使用场景</h4>
          <ul class="usage-list">
            <li>分析打包体积大小</li>
            <li>识别重复依赖和大型模块</li>
            <li>优化应用程序加载性能</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2 class="section-title">⚖️ Plugin vs Loader 对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Plugin</th>
              <th>Loader</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>主要职责</td>
              <td>扩展功能，执行更广泛的任务</td>
              <td>转换特定类型模块</td>
            </tr>
            <tr>
              <td>执行时机</td>
              <td>整个构建生命周期</td>
              <td>模块加载时</td>
            </tr>
            <tr>
              <td>功能范围</td>
              <td>打包优化、资源管理、环境注入</td>
              <td>文件转换（如JSX→JS）</td>
            </tr>
            <tr>
              <td>配置位置</td>
              <td>plugins 数组</td>
              <td>module.rules 数组</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="best-practices">
      <h2 class="section-title">🚀 Plugin 最佳实践</h2>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">1️⃣</div>
          <h3>按环境使用</h3>
          <p>开发环境：热更新插件<br>生产环境：压缩、优化插件</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">2️⃣</div>
          <h3>注意执行顺序</h3>
          <p>plugins数组中的顺序很重要，影响执行顺序</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">3️⃣</div>
          <h3>定期更新</h3>
          <p>保持插件版本更新以获取性能改进和安全修复</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">4️⃣</div>
          <h3>适当配置</h3>
          <p>避免使用默认配置，根据项目需求调整参数</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 简单模拟数据，实际组件中不需要
const plugins = ref([
  { name: 'HtmlWebpackPlugin', description: '生成HTML文件并注入资源' },
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.webpack-plugins-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.intro-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.main-title {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  .title-icon {
    font-size: 2.2rem;
  }
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
}

.content-explanation {
  margin-bottom: 2.5rem;

  .explanation-card {
    background: white;
    border-radius: 12px;
    padding: 1.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }

  .explanation-title {
    font-size: 1.5rem;
    margin-top: 0;
    color: #1e40af;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .explanation-text {
    font-size: 1.05rem;
    margin-bottom: 0;
    color: #475569;
  }
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.plugin-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.plugin-header {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  padding: 1.3rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.plugin-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-title {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 600;
}

.plugin-section {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
}

.section-title {
  font-size: 1.15rem;
  margin: 0.5rem 0 1rem;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #3b82f6;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
}

.feature-list,
.usage-list {
  padding-left: 1.2rem;
  margin: 0.8rem 0;

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1.2rem;

    &::before {
      content: "•";
      color: #3b82f6;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
}

.usage-list li::before {
  color: #10b981;
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.88rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
  border-left: 4px solid #3b82f6;
}

.comparison-section {
  background: white;
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .section-title {
    font-size: 1.5rem;
    margin-top: 0;
    color: #1e40af;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border: 1px solid #e2e8f0;
    }

    th {
      background-color: #eff6ff;
      color: #1d4ed8;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    tr:hover {
      background-color: #f1f5f9;
    }
  }
}

.best-practices {
  .section-title {
    font-size: 1.5rem;
    margin-top: 0;
    color: #1e40af;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    margin: 1rem 0 0.8rem;
    color: #1e40af;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.practice-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .plugin-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    table {
      min-width: 100%;
    }
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .plugin-header {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
