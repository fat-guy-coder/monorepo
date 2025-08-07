<template>
  <div class="analyzer-container">
    <div class="header">
      <div class="header-content">
        <h1 class="title">
          <span class="title-icon">📊</span> Webpack Bundle Analyzer Plugin
        </h1>
        <p class="subtitle">可视化分析打包体积，优化应用性能的利器</p>
      </div>
    </div>

    <div class="content">
      <div class="intro-card">
        <div class="card-icon">🔍</div>
        <h2 class="card-title">Bundle Analyzer 是什么？</h2>
        <p class="card-text">
          Bundle Analyzer 是一个强大的 Webpack 插件，用于可视化分析 Webpack 打包输出文件的体积大小和组成。
          它提供了一个交互式的树状图（Treemap）可视化界面，帮助开发者直观地查看各个模块的大小和依赖关系。
        </p>
      </div>

      <div class="grid-section">
        <!-- 作用 -->
        <div class="card">
          <div class="card-header">
            <div class="icon-wrapper">
              <span class="icon">🎯</span>
            </div>
            <h3>核心作用</h3>
          </div>
          <div class="card-content">
            <ul class="feature-list">
              <li>可视化展示打包文件的体积大小</li>
              <li>识别最大的 JavaScript/CSS 模块</li>
              <li>发现重复依赖和未使用的代码</li>
              <li>分析第三方库的体积影响</li>
              <li>帮助优化首屏加载时间</li>
              <li>支持不同输出格式（treemap, sunburst 等）</li>
            </ul>
          </div>
        </div>

        <!-- 使用场景 -->
        <div class="card">
          <div class="card-header">
            <div class="icon-wrapper">
              <span class="icon">🚀</span>
            </div>
            <h3>使用场景</h3>
          </div>
          <div class="card-content">
            <ul class="usage-list">
              <li>项目构建后体积过大需要优化</li>
              <li>首屏加载时间过长需要诊断</li>
              <li>引入大型库前评估体积影响</li>
              <li>排查打包中的重复依赖问题</li>
              <li>生产环境部署前的性能审计</li>
              <li>代码分割策略的效果验证</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 安装配置 -->
      <div class="section">
        <h2 class="section-title">📦 安装与配置</h2>

        <div class="steps-container">
          <div class="step-card">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>安装插件</h3>
            </div>
            <pre class="code-block">npm install --save-dev webpack-bundle-analyzer
# 或
yarn add -D webpack-bundle-analyzer</pre>
          </div>

          <div class="step-card">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>基本配置</h3>
            </div>
            <pre class="code-block">// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}</pre>
          </div>
        </div>
      </div>

      <!-- 配置选项 -->
      <div class="section">
        <h2 class="section-title">⚙️ 配置选项基础介绍</h2>

        <div class="config-table">
          <table>
            <thead>
              <tr>
                <th>选项</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>analyzerMode</code></td>
                <td>String</td>
                <td><code>"server"</code></td>
                <td>分析模式：<code>server</code>、<code>static</code>、<code>disabled</code>、<code>json</code></td>
              </tr>
              <tr>
                <td><code>analyzerHost</code></td>
                <td>String</td>
                <td><code>"127.0.0.1"</code></td>
                <td>服务器模式的主机地址</td>
              </tr>
              <tr>
                <td><code>analyzerPort</code></td>
                <td>Number</td>
                <td><code>8888</code></td>
                <td>服务器模式的端口号</td>
              </tr>
              <tr>
                <td><code>reportFilename</code></td>
                <td>String</td>
                <td><code>"report.html"</code></td>
                <td>静态模式下的报告文件名</td>
              </tr>
              <tr>
                <td><code>openAnalyzer</code></td>
                <td>Boolean</td>
                <td><code>true</code></td>
                <td>是否自动在浏览器中打开报告</td>
              </tr>
              <tr>
                <td><code>generateStatsFile</code></td>
                <td>Boolean</td>
                <td><code>false</code></td>
                <td>是否生成 stats.json 文件</td>
              </tr>
              <tr>
                <td><code>statsFilename</code></td>
                <td>String</td>
                <td><code>"stats.json"</code></td>
                <td>生成的 stats 文件名</td>
              </tr>
              <tr>
                <td><code>statsOptions</code></td>
                <td>Object</td>
                <td><code>null</code></td>
                <td>stats 文件的自定义选项</td>
              </tr>
              <tr>
                <td><code>excludeAssets</code></td>
                <td>String/RegExp/Function</td>
                <td><code>null</code></td>
                <td>排除特定资源不进行分析</td>
              </tr>
              <tr>
                <td><code>logLevel</code></td>
                <td>String</td>
                <td><code>"info"</code></td>
                <td>日志级别：<code>info</code>、<code>warn</code>、<code>error</code>、<code>silent</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="config-example">
          <h3>完整配置示例</h3>
          <pre class="code-block">const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 启动分析服务器
      analyzerHost: 'localhost',
      analyzerPort: 8888, // 端口号
      reportFilename: 'report.html', // 报告文件名
      openAnalyzer: true, // 构建完成后自动打开浏览器
      generateStatsFile: true, // 生成 stats.json 文件
      statsFilename: 'stats.json', // stats 文件名
      statsOptions: {
        // stats 配置选项
        excludeModules: false,
        source: true
      },
      excludeAssets: (assetName) => assetName.includes('.map'), // 排除 source map
      logLevel: 'info' // 日志级别
    })
  ]
}</pre>
        </div>
      </div>

      <!-- 使用方式 -->
      <div class="section">
        <h2 class="section-title">🚀 使用方式</h2>

        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>基本使用</h3>
              <p>将插件添加到 Webpack 配置文件中，然后运行构建命令：</p>
              <pre class="code-block">npm run build</pre>
              <p>构建完成后会自动在浏览器中打开分析报告页面。</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>按需分析</h3>
              <p>通过环境变量控制分析器的启用，避免每次构建都进行分析：</p>
              <pre class="code-block">// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    // 只有 ANALYZE 环境变量为 true 时才启用
    process.env.ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean)
}</pre>
              <p>使用命令：</p>
              <pre class="code-block">ANALYZE=true npm run build</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>查看静态报告</h3>
              <p>生成静态 HTML 报告，方便分享和存档：</p>
              <pre class="code-block">new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'bundle-report.html'
})</pre>
              <p>构建后会在输出目录生成 <code>bundle-report.html</code> 文件。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 分析报告解读 -->
      <div class="section">
        <h2 class="section-title">🔍 分析报告解读</h2>

        <div class="report-guide">
          <div class="report-feature">
            <div class="feature-icon">📦</div>
            <h3>模块大小分析</h3>
            <p>通过矩形块大小直观展示模块体积占比，快速识别大型模块。</p>
          </div>

          <div class="report-feature">
            <div class="feature-icon">🔍</div>
            <h3>依赖关系可视化</h3>
            <p>使用树状结构展示模块间的依赖关系，识别深层依赖问题。</p>
          </div>

          <div class="report-feature">
            <div class="feature-icon">📊</div>
            <h3>多维度视图</h3>
            <p>支持 treemap、sunburst 等多种视图模式，从不同角度分析数据。</p>
          </div>

          <div class="report-feature">
            <div class="feature-icon">🔎</div>
            <h3>搜索与筛选</h3>
            <p>支持按名称搜索模块，按大小、类型等条件筛选结果。</p>
          </div>
        </div>

        <div class="report-preview">
          <div class="preview-container">
            <div class="preview-header">
              <div class="tab active">Treemap 视图</div>
              <div class="tab">Sunburst 视图</div>
              <div class="tab">Network 视图</div>
            </div>
            <div class="preview-content">
              <div class="treemap">
                <div class="treemap-row">
                  <div class="module large" style="width: 40%; background-color: #6366f1;">react-dom (120KB)</div>
                  <div class="module medium" style="width: 25%; background-color: #8b5cf6;">lodash (75KB)</div>
                  <div class="module small" style="width: 15%; background-color: #ec4899;">moment (45KB)</div>
                </div>
                <div class="treemap-row">
                  <div class="module" style="width: 20%; background-color: #10b981;">axios (30KB)</div>
                  <div class="module" style="width: 20%; background-color: #f59e0b;">antd (30KB)</div>
                  <div class="module" style="width: 20%; background-color: #3b82f6;">utils (30KB)</div>
                  <div class="module" style="width: 20%; background-color: #ef4444;">components (30KB)</div>
                </div>
              </div>
            </div>
            <div class="preview-legend">
              <div class="legend-item">
                <div class="color-box" style="background-color: #6366f1;"></div>
                <span>核心库</span>
              </div>
              <div class="legend-item">
                <div class="color-box" style="background-color: #8b5cf6;"></div>
                <span>工具库</span>
              </div>
              <div class="legend-item">
                <div class="color-box" style="background-color: #ec4899;"></div>
                <span>日期处理</span>
              </div>
              <div class="legend-item">
                <div class="color-box" style="background-color: #10b981;"></div>
                <span>网络请求</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优化建议 -->
      <div class="section">
        <h2 class="section-title">💡 优化建议</h2>

        <div class="optimization-grid">
          <div class="optimization-card">
            <div class="card-icon">⚡</div>
            <h3>代码分割</h3>
            <p>使用动态导入和异步加载分割大型模块</p>
          </div>

          <div class="optimization-card">
            <div class="card-icon">🧹</div>
            <h3>清理未使用代码</h3>
            <p>使用 Tree Shaking 和 dead code elimination</p>
          </div>

          <div class="optimization-card">
            <div class="card-icon">📦</div>
            <h3>按需引入</h3>
            <p>对于大型库只引入需要的功能模块</p>
          </div>

          <div class="optimization-card">
            <div class="card-icon">🔄</div>
            <h3>重复依赖处理</h3>
            <p>使用 dedupe 插件解决重复依赖问题</p>
          </div>

          <div class="optimization-card">
            <div class="card-icon">🖼️</div>
            <h3>资源优化</h3>
            <p>压缩图片、字体等静态资源</p>
          </div>

          <div class="optimization-card">
            <div class="card-icon">🔧</div>
            <h3>生产模式</h3>
            <p>确保生产环境启用压缩和优化</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>© 2023 Webpack Bundle Analyzer 指南 | 提升应用性能从分析开始</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 这里不需要逻辑，因为这是一个静态展示组件
</script>

<style lang="less" scoped>


.analyzer-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  padding: 2.5rem 1.5rem;
  border-radius: 0 0 20px 20px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .header-content {
    max-width: 1000px;
    margin: 0 auto;
  }
}

.title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .title-icon {
    font-size: 2.3rem;
  }
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.content {
  padding: 0 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.intro-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3b82f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  .card-title {
    font-size: 1.8rem;
    margin: 0 0 1rem;
    color: #1e40af;
  }

  .card-text {
    font-size: 1.1rem;
    margin: 0;
    max-width: 800px;
  }
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .card-header {
    background: #eff6ff;
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #dbeafe;

    .icon-wrapper {
      background: #dbeafe;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      font-size: 1.5rem;
      color: #3b82f6;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
      color: #1e40af;
    }
  }

  .card-content {
    padding: 1.5rem;
  }
}

.feature-list,
.usage-list {
  padding-left: 1.2rem;
  margin: 0;

  li {
    margin-bottom: 0.7rem;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: "•";
      color: #3b82f6;
      font-weight: bold;
      position: absolute;
      left: 0;
      font-size: 1.2rem;
    }
  }
}

.usage-list li::before {
  color: #10b981;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  margin: 0 0 1.5rem;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
  }
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .step-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .step-number {
      background: #3b82f6;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: #1e40af;
    }
  }
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 1rem 0;
  border-left: 4px solid #3b82f6;
}

.config-table {
  overflow-x: auto;
  margin-bottom: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    th,
    td {
      padding: 0.8rem 1rem;
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

    code {
      background: #e0f2fe;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }
  }
}

.config-example {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  h3 {
    margin: 0 0 1rem;
    color: #1e40af;
  }
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .step-number {
    background: #3b82f6;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h3 {
      margin: 0 0 0.8rem;
      color: #1e40af;
    }

    p {
      margin: 0.5rem 0;
    }
  }
}

.report-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.report-feature {
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.report-preview {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.preview-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.preview-header {
  display: flex;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;

  .tab {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #64748b;
    border-bottom: 3px solid transparent;

    &.active {
      color: #3b82f6;
      border-bottom: 3px solid #3b82f6;
      background: #eff6ff;
    }
  }
}

.preview-content {
  padding: 1.5rem;
  background: #0f172a;
  min-height: 250px;
}

.treemap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.treemap-row {
  display: flex;
  gap: 0.5rem;
  height: 60px;
}

.module {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &.large {
    font-size: 1.1rem;
  }

  &.medium {
    font-size: 1rem;
  }

  &.small {
    font-size: 0.85rem;
  }
}

.preview-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  background: #f1f5f9;
  border-top: 1px solid #e2e8f0;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .color-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.optimization-card {
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #64748b;
  }
}

.footer {
  text-align: center;
  padding: 2rem 1.5rem;
  color: #64748b;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .steps-container,
  .grid-section {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;
  }

  .config-table table {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.7rem;
  }

  .intro-card,
  .card,
  .step-card,
  .report-preview {
    padding: 1.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
