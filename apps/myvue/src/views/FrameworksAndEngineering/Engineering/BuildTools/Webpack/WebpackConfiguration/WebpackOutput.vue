<template>
  <div class="output-config-container">
    <!-- 顶部标题区 -->
    <div class="header-section">
      <div class="logo-icon">📦</div>
      <div class="header-content">
        <h1 class="main-title">Webpack Output 配置基础介绍</h1>
        <p class="subtitle">构建输出配置的核心指南</p>
        <div class="version-info">
          <span>适用版本：Webpack 4+</span>
          <span>配置位置：webpack.config.js</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">📌</div>
          <h2>Output 配置的作用</h2>
        </div>
        <div class="intro-content">
          <p>
            Webpack的<code>output</code>配置指定了如何将编译后的文件写入磁盘，控制着最终构建产物的输出方式和位置。
          </p>
          <div class="importance-grid">
            <div class="importance-card">
              <div class="importance-icon">📍</div>
              <h3>输出位置</h3>
              <p>定义构建文件的存储路径</p>
            </div>
            <div class="importance-card">
              <div class="importance-icon">🏷️</div>
              <h3>文件命名</h3>
              <p>控制输出文件的命名规则</p>
            </div>
            <div class="importance-card">
              <div class="importance-icon">🌐</div>
              <h3>资源引用</h3>
              <p>设置公共路径和资源URL</p>
            </div>
            <div class="importance-card">
              <div class="importance-icon">📚</div>
              <h3>库导出</h3>
              <p>配置库的导出方式和名称</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心配置表格 -->
      <section class="config-table-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>核心配置参数基础介绍</h2>
        </div>

        <div class="table-container">
          <table class="config-table">
            <thead>
              <tr>
                <th width="20%">配置项</th>
                <th width="15%">类型</th>
                <th width="20%">默认值</th>
                <th width="45%">描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>path</code></td>
                <td>String</td>
                <td><code>dist</code></td>
                <td>输出文件的目录（绝对路径）。所有输出文件的根目录</td>
              </tr>
              <tr>
                <td><code>filename</code></td>
                <td>String<br>Function</td>
                <td><code>'[name].js'</code></td>
                <td>入口 chunk 的文件名模板。支持[name]、[id]、[chunkhash]等占位符</td>
              </tr>
              <tr>
                <td><code>publicPath</code></td>
                <td>String<br>Function</td>
                <td>空字符串</td>
                <td>为项目中的所有资源指定基础路径。用于加载器、插件等生成的URL</td>
              </tr>
              <tr>
                <td><code>chunkFilename</code></td>
                <td>String</td>
                <td><code>'[id].js'</code></td>
                <td>非入口 chunk 的文件名模板（如动态导入生成的模块）</td>
              </tr>
              <tr>
                <td><code>library</code></td>
                <td>String</td>
                <td>-</td>
                <td>库的名称。配置后，库将导出为该名称的变量或模块</td>
              </tr>
              <tr>
                <td><code>libraryTarget</code></td>
                <td>String</td>
                <td><code>'var'</code></td>
                <td>
                  库的导出格式。可选值：'var'、'module'、'assign'、'this'、'window'、'global'、'commonjs'、'commonjs2'、'amd'、'umd'、'jsonp'
                </td>
              </tr>
              <tr>
                <td><code>globalObject</code></td>
                <td>String</td>
                <td><code>'window'</code></td>
                <td>指定全局对象。当目标环境不是浏览器时特别有用</td>
              </tr>
              <tr>
                <td><code>assetModuleFilename</code></td>
                <td>String</td>
                <td><code>'[hash][ext][query]'</code></td>
                <td>配置 asset modules 的输出文件名</td>
              </tr>
              <tr>
                <td><code>clean</code></td>
                <td>Boolean<br>Object</td>
                <td>false</td>
                <td>在生成输出文件之前清理输出目录。可配置对象：<code>{ dry: false, keep: /\.txt/ }</code></td>
              </tr>
              <tr>
                <td><code>pathinfo</code></td>
                <td>Boolean</td>
                <td>true</td>
                <td>在打包文件中包含模块路径信息。生产环境建议禁用以减少包大小</td>
              </tr>
              <tr>
                <td><code>chunkLoadingGlobal</code></td>
                <td>String</td>
                <td><code>'webpackChunk'</code></td>
                <td>webpack加载chunk时使用的全局变量名称</td>
              </tr>
              <tr>
                <td><code>chunkLoading</code></td>
                <td>String</td>
                <td><code>'jsonp'</code></td>
                <td>加载chunk的方法。可选值：'jsonp'、'import-scripts'、'require'等</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 占位符基础介绍 -->
      <section class="placeholders-section">
        <div class="section-header">
          <div class="icon">🔤</div>
          <h2>文件名占位符基础介绍</h2>
        </div>

        <div class="placeholders-grid">
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[name]</code></div>
            <div class="placeholder-desc">模块名称（通常是文件名）</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[id]</code></div>
            <div class="placeholder-desc">模块标识符</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[fullhash]</code></div>
            <div class="placeholder-desc">整个项目的构建哈希值</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[chunkhash]</code></div>
            <div class="placeholder-desc">chunk内容的哈希值</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[contenthash]</code></div>
            <div class="placeholder-desc">文件内容的哈希值</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[query]</code></div>
            <div class="placeholder-desc">模块查询参数（含?）</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[base]</code></div>
            <div class="placeholder-desc">文件基础名称（含扩展名）</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[path]</code></div>
            <div class="placeholder-desc">文件相对于context的路径</div>
          </div>
          <div class="placeholder-card">
            <div class="placeholder-name"><code>[ext]</code></div>
            <div class="placeholder-desc">文件扩展名（含.）</div>
          </div>
        </div>

        <div class="placeholder-tips">
          <h3>使用技巧：</h3>
          <ul>
            <li>生产环境使用<code>[name].[contenthash:8].js</code>实现长效缓存</li>
            <li>哈希长度指定：<code>[chunkhash:8]</code>表示8位哈希值</li>
            <li><code>contenthash</code>适用于CSS等静态资源</li>
            <li><code>chunkhash</code>适用于JavaScript模块</li>
          </ul>
        </div>
      </section>

      <!-- 配置示例 -->
      <section class="examples-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>配置示例</h2>
        </div>

        <div class="examples-tabs">
          <div v-for="(example, index) in examples" :key="index"
            :class="['example-tab', { active: activeExample === index }]" @click="activeExample = index">
            {{ example.title }}
          </div>
        </div>

        <div class="example-content">
          <div v-for="(example, index) in examples" :key="index" v-show="activeExample === index">
            <h3 class="example-title">{{ example.title }}</h3>
            <p class="example-desc">{{ example.description }}</p>
            <pre class="code-block">{{ example.code }}</pre>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>Output 配置最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="card-icon">1</div>
            <h3>路径使用绝对路径</h3>
            <p><code>path: path.resolve(__dirname, 'dist')</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">2</div>
            <h3>生产环境使用哈希</h3>
            <p><code>filename: '[name].[contenthash:8].js'</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">3</div>
            <h3>公共路径正确配置</h3>
            <p>CDN部署：<code>publicPath: 'https://cdn.example.com/assets/'</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">4</div>
            <h3>清理构建目录</h3>
            <p><code>clean: true</code> 或 <code>clean: { keep: /\.gitkeep/ }</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">5</div>
            <h3>区分入口与非入口</h3>
            <p><code>filename: '[name].bundle.js'</code><br><code>chunkFilename: '[name].chunk.js'</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">6</div>
            <h3>生产环境禁用路径信息</h3>
            <p><code>pathinfo: process.env.NODE_ENV !== 'production'</code></p>
          </div>
        </div>

        <div class="full-config-example">
          <h3>完整配置示例：</h3>
          <pre class="code-block">const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '/assets/',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: {
      dry: false,
      keep: /\.gitkeep/
    },
    pathinfo: false,
    library: 'MyLibrary',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};</pre>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Webpack Output 配置指南 | 构建优化最佳实践 | </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 配置示例数据
const examples = [
  {
    title: '基础配置',
    description: '适用于小型项目的基础output配置',
    code: `// webpack.config.js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};`
  },
  {
    title: '多入口配置',
    description: '包含多个入口点的项目配置',
    code: `// webpack.config.js
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  }
};`
  },
  {
    title: '长效缓存配置',
    description: '使用内容哈希实现长效缓存',
    code: `// webpack.config.js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: 'https://cdn.example.com/assets/',
    assetModuleFilename: 'static/[hash][ext][query]'
  }
};`
  },
  {
    title: '库打包配置',
    description: '将项目打包为可复用库的配置',
    code: `// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-library.js',
    library: 'MyLibrary',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  }
};`
  }
];

const activeExample = ref(0);
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.output-config-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-icon {
    font-size: 4rem;
    flex-shrink: 0;
  }

  .header-content {
    flex: 1;
  }
}

.main-title {
  font-size: 2.8rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1rem;
  font-weight: 400;
}

.version-info {
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;
  opacity: 0.85;
}

.content-wrapper {
  padding: 0 2rem 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.5rem;

  .icon {
    font-size: 1.8rem;
    background: #e0e7ff;
    color: #6366f1;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }
}

.intro-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.intro-content {
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #475569;

    code {
      background: #e0e7ff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #6366f1;
      font-family: @font-code;
    }
  }
}

.importance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.importance-card {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #e0e7ff;
  }

  .importance-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e293b;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
}

.config-table-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  th,
  td {
    padding: 1.1rem 1.2rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #e0e7ff;
    color: #4f46e5;
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  tr {
    &:nth-child(even) {
      background-color: #f8fafc;
    }

    &:hover {
      background-color: #f1f5f9;
    }
  }

  td {
    color: #475569;
    font-size: 0.95rem;

    &:first-child {
      font-family: @font-code;
      font-weight: 600;
      color: #6366f1;
    }
  }

  code {
    font-family: @font-code;
    background: #e0e7ff;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    color: #4f46e5;
    font-size: 0.9rem;
  }
}

.placeholders-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.placeholders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.placeholder-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.2rem;
  border: 1px solid #e2e8f0;
  text-align: center;

  .placeholder-name {
    font-family: @font-code;
    font-weight: 600;
    color: #4f46e5;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .placeholder-desc {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
  }
}

.placeholder-tips {
  background: #e0e7ff;
  border-radius: 10px;
  padding: 1.2rem;

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.8rem;
    color: #4338ca;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #4f46e5;
      line-height: 1.7;
    }
  }
}

.examples-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.examples-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.example-tab {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: #6366f1;
    background: #f1f5f9;
  }

  &.active {
    color: #4f46e5;
    background: white;
    border: 1px solid #e2e8f0;
    border-bottom: none;
    position: relative;
    top: 1px;
    font-weight: 600;
  }
}

.example-content {
  .example-title {
    font-size: 1.4rem;
    color: #1e293b;
    margin: 0 0 0.5rem;
  }

  .example-desc {
    color: #64748b;
    margin: 0 0 1.2rem;
  }
}

.best-practices {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

.practice-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .card-icon {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 50px;
    height: 50px;
    background: #6366f1;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    opacity: 0.15;
    z-index: 1;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.8rem;
    color: #1e293b;
    position: relative;
    z-index: 2;
  }

  p {
    margin: 0;
    color: #64748b;
    line-height: 1.7;
    position: relative;
    z-index: 2;

    code {
      font-family: @font-code;
      background: #e0e7ff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #4f46e5;
    }
  }
}

.full-config-example {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;

  h3 {
    padding: 1.2rem 1.5rem;
    margin: 0;
    background: #0f172a;
    color: #e2e8f0;
    font-size: 1.1rem;
  }
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: @font-code;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1.2rem 0;
  border-left: 4px solid #6366f1;

  code {
    font-family: inherit;
  }
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;

    .icon {
      margin: 0 auto;
    }
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 1rem 2rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .examples-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
}
</style>
