<template>
  <div class="webpack-intro">
    <header class="header">
      <h1><span class="highlight">Webpack</span> - 现代JavaScript应用的静态模块打包器</h1>
      <p class="subtitle">用于构建现代Web应用程序的核心工具</p>
    </header>

    <div class="content-container">
      <section class="section">
        <h2 class="section-title">🔍 Webpack的作用</h2>
        <div class="section-content">
          <p>Webpack是一个开源的JavaScript模块打包工具，主要用于将多个模块及其依赖打包成一个或多个浏览器可识别的静态资源文件。</p>
          <div class="feature-cards">
            <div class="feature-card">
              <div class="icon">📦</div>
              <h3>模块打包</h3>
              <p>将项目中的各种资源（JS、CSS、图片、字体等）视为模块，打包成静态资源</p>
            </div>
            <div class="feature-card">
              <div class="icon">⚙️</div>
              <h3>代码转换</h3>
              <p>使用loader转换TypeScript、Sass/Less等为浏览器可识别的格式</p>
            </div>
            <div class="feature-card">
              <div class="icon">✨</div>
              <h3>优化与压缩</h3>
              <p>代码分割、Tree Shaking、压缩混淆等优化手段提升应用性能</p>
            </div>
            <div class="feature-card">
              <div class="icon">🚀</div>
              <h3>开发支持</h3>
              <p>提供热更新、Source Map等开发工具提升开发体验</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">⚙️ Webpack核心配置项</h2>
        <div class="section-content">
          <div class="config-table">
            <div class="config-row header">
              <div class="config-name">配置项</div>
              <div class="config-description">描述</div>
              <div class="config-example">示例</div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>entry</code></div>
              <div class="config-description">应用程序的入口起点</div>
              <div class="config-example"><code>entry: './src/index.js'</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>output</code></div>
              <div class="config-description">输出打包结果的位置和命名</div>
              <div class="config-example"><code>output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' }</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>module</code></div>
              <div class="config-description">配置模块处理规则（loader）</div>
              <div class="config-example"><code>module: { rules: [ ... ] }</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>plugins</code></div>
              <div class="config-description">扩展功能的插件列表</div>
              <div class="config-example"><code>plugins: [ new HtmlWebpackPlugin() ]</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>mode</code></div>
              <div class="config-description">设置构建模式（development/production）</div>
              <div class="config-example"><code>mode: 'development'</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>resolve</code></div>
              <div class="config-description">模块解析配置</div>
              <div class="config-example"><code>resolve: { extensions: ['.ts', '.js'] }</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>devServer</code></div>
              <div class="config-description">开发服务器配置</div>
              <div class="config-example"><code>devServer: { port: 8080, hot: true }</code></div>
            </div>
            <div class="config-row">
              <div class="config-name"><code>optimization</code></div>
              <div class="config-description">优化配置（代码分割等）</div>
              <div class="config-example"><code>optimization: { splitChunks: { chunks: 'all' } }</code></div>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="section column">
          <h2 class="section-title">📚 常用Loader</h2>
          <div class="section-content">
            <ul class="item-list">
              <li><span class="item-name">babel-loader</span> - 使用Babel转换ES6+代码</li>
              <li><span class="item-name">ts-loader</span> - 编译TypeScript代码</li>
              <li><span class="item-name">style-loader</span> - 将CSS注入到DOM</li>
              <li><span class="item-name">css-loader</span> - 解析CSS中的@import和url()</li>
              <li><span class="item-name">sass-loader</span> - 编译Sass/SCSS文件</li>
              <li><span class="item-name">less-loader</span> - 编译Less文件</li>
              <li><span class="item-name">postcss-loader</span> - 使用PostCSS处理CSS</li>
              <li><span class="item-name">file-loader</span> - 处理文件资源</li>
              <li><span class="item-name">url-loader</span> - 类似file-loader，但可转base64</li>
              <li><span class="item-name">vue-loader</span> - 处理Vue单文件组件</li>
            </ul>
          </div>
        </section>

        <section class="section column">
          <h2 class="section-title">🔌 常用Plugin</h2>
          <div class="section-content">
            <ul class="item-list">
              <li><span class="item-name">HtmlWebpackPlugin</span> - 自动生成HTML文件</li>
              <li><span class="item-name">MiniCssExtractPlugin</span> - 提取CSS到单独文件</li>
              <li><span class="item-name">CleanWebpackPlugin</span> - 清理构建目录</li>
              <li><span class="item-name">HotModuleReplacementPlugin</span> - 启用热模块替换</li>
              <li><span class="item-name">DefinePlugin</span> - 定义全局常量</li>
              <li><span class="item-name">CopyWebpackPlugin</span> - 复制静态文件</li>
              <li><span class="item-name">CompressionPlugin</span> - 生成gzip压缩文件</li>
              <li><span class="item-name">BundleAnalyzerPlugin</span> - 分析包内容</li>
              <li><span class="item-name">TerserPlugin</span> - 压缩JavaScript代码</li>
              <li><span class="item-name">VueLoaderPlugin</span> - 配合vue-loader使用</li>
            </ul>
          </div>
        </section>
      </div>

      <section class="section">
        <h2 class="section-title">✅ Webpack优缺点</h2>
        <div class="section-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>强大的模块化支持，可处理各种类型资源</li>
                <li>丰富的插件生态系统，高度可扩展</li>
                <li>支持代码分割和懒加载，优化性能</li>
                <li>强大的开发工具支持（HMR、Source Map）</li>
                <li>社区活跃，文档完善</li>
                <li>支持Tree Shaking减少最终包体积</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li>配置复杂，学习曲线陡峭</li>
                <li>大型项目构建速度较慢</li>
                <li>文档有时难以查找特定配置</li>
                <li>默认配置功能有限，需要大量自定义</li>
                <li>插件和loader版本兼容性问题常见</li>
                <li>配置错误时错误信息有时不明确</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p>Webpack是现代前端开发的核心工具，虽然配置复杂但功能强大，理解其原理和配置是前端工程师的重要技能。</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用setup语法，这里不需要响应式数据
// 仅作为展示Webpack信息的静态组件
</script>

<style lang="less" scoped>


:root {
  --primary: #4a6cf7;
  --primary-light: #eef2ff;
  --text: #333;
  --text-light: #666;
  --text-lighter: #999;
  --bg: #f8f9fa;
  --card-bg: #ffffff;
  --border: #e2e8f0;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.webpack-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%);
  border-radius: 12px;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--text);

    .highlight {
      color: var(--primary);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(74, 108, 247, 0.2);
        border-radius: 3px;
      }
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
  }
}

.content-container {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 30px;
}

.section {
  margin-bottom: 40px;

  .section-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--text);
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-light);
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .feature-card {
    background: var(--card-bg);
    border-radius: 10px;
    padding: 25px;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .icon {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 10px;
      color: var(--primary);
    }

    p {
      color: var(--text-light);
      line-height: 1.5;
    }
  }
}

.config-table {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;

  .config-row {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr;
    border-bottom: 1px solid var(--border);

    &:last-child {
      border-bottom: none;
    }

    &.header {
      background-color: var(--primary-light);
      font-weight: 600;
    }

    > div {
      padding: 15px 20px;
      display: flex;
      align-items: center;
    }

    .config-name {
      font-weight: 500;
      border-right: 1px solid var(--border);

      code {
        background: rgba(74, 108, 247, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        color: var(--primary);
        font-weight: 600;
      }
    }

    .config-description {
      border-right: 1px solid var(--border);
    }

    .config-example {
      code {
        background: #f8f8f8;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.9rem;
        display: inline-block;
        color: var(--text-light);
      }
    }
  }
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.item-list {
  list-style: none;
  padding: 0;

  li {
    padding: 12px 15px;
    margin-bottom: 8px;
    background: var(--primary-light);
    border-radius: 6px;
    transition: background 0.2s;

    &:hover {
      background: rgba(74, 108, 247, 0.15);
    }

    .item-name {
      display: inline-block;
      min-width: 180px;
      font-weight: 600;
      color: var(--primary);
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros, .cons {
    padding: 25px;
    border-radius: 10px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid;
    }
  }

  .pros {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);

    h3 {
      color: var(--success);
      border-bottom-color: rgba(16, 185, 129, 0.3);
    }

    li::before {
      content: '✓';
      color: var(--success);
      font-weight: bold;
      margin-right: 10px;
    }
  }

  .cons {
    background: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);

    h3 {
      color: var(--error);
      border-bottom-color: rgba(239, 68, 68, 0.3);
    }

    li::before {
      content: '⚠️';
      margin-right: 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      display: flex;
      align-items: flex-start;
    }
  }
}

.footer {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  background: var(--primary-light);
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
