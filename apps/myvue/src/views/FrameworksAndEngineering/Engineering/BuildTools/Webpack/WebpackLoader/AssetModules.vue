<template>
  <div class="asset-modules-container">
    <!-- Banner 区域 -->
    <div class="header-banner">
      <div class="logo-icon">📦</div>
      <div class="header-content">
        <h1 class="main-title">Webpack Asset Modules</h1>
        <p class="subtitle">现代资源处理的完美解决方案</p>
        <div class="versions">
          <span>兼容版本：Webpack 5+</span>
          <span>替代方案：file-loader, url-loader, raw-loader</span>
        </div>
      </div>
    </div>

    <!-- 内容容器 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>Asset Modules 是什么？</h2>
        </div>
        <div class="intro-content">
          <p>
            Asset Modules 是 Webpack 5 引入的资源处理模块，它允许开发者在不使用额外 loader（如 file-loader、url-loader）的情况下，
            通过内置功能处理项目中的静态资源文件。
          </p>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h3>原生支持</h3>
              <p>Webpack 5 原生支持无需安装额外 loader</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>简化配置</h3>
              <p>单一配置取代多个 loader 的复杂设置</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>自动优化</h3>
              <p>智能处理资源类型与优化策略</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心类型区域 -->
      <section class="types-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>四种资源模块类型</h2>
        </div>

        <div class="types-tabs">
          <div v-for="type in assetTypes" :key="type.id" :class="['type-tab', { active: activeType === type.id }]"
            @click="activeType = type.id">
            <div class="tab-icon">{{ type.icon }}</div>
            <div class="tab-title">{{ type.name }}</div>
          </div>
        </div>

        <div class="type-content">
          <!-- asset/resource 类型 -->
          <div v-if="activeType === 'resource'" class="type-details">
            <div class="type-header">
              <h3>asset/resource</h3>
              <div class="tag">文件导出</div>
            </div>
            <p>
              发送一个单独的文件并导出 URL（类似于 file-loader）。
              资源会被输出到输出目录，并且返回文件的 URL。
            </p>
            <div class="use-case">
              <h4>适用场景：</h4>
              <ul>
                <li>大尺寸图片文件</li>
                <li>PDF、Word 等文档</li>
                <li>字体文件</li>
                <li>需要保留原始文件的情况</li>
              </ul>
            </div>
            <div class="config-example">
              <h4>配置示例：</h4>
              <pre class="code-block">{
  test: /\.(png|jpe?g|gif|svg|pdf)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'static/images/[name][ext]'
  }
}</pre>
            </div>
          </div>

          <!-- asset/inline 类型 -->
          <div v-if="activeType === 'inline'" class="type-details">
            <div class="type-header">
              <h3>asset/inline</h3>
              <div class="tag">内联导出</div>
            </div>
            <p>
              导出一个资源的 data URI（类似于 url-loader）。
              资源会被作为 base64 编码的字符串直接嵌入到 bundle 中。
            </p>
            <div class="use-case">
              <h4>适用场景：</h4>
              <ul>
                <li>小图标（小于10KB）</li>
                <li>需要减少HTTP请求的小文件</li>
                <li>SVG图标</li>
                <li>不需要单独缓存的小资源</li>
              </ul>
            </div>
            <div class="config-example">
              <h4>配置示例：</h4>
              <pre class="code-block">{
  test: /\.(ico|svg)$/i,
  type: 'asset/inline',
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024 // 4KB
    }
  }
}</pre>
            </div>
          </div>

          <!-- asset/source 类型 -->
          <div v-if="activeType === 'source'" class="type-details">
            <div class="type-header">
              <h3>asset/source</h3>
              <div class="tag">源码导出</div>
            </div>
            <p>
              导出资源的源代码（类似于 raw-loader）。
              资源的内容会作为字符串直接导入到模块中。
            </p>
            <div class="use-case">
              <h4>适用场景：</h4>
              <ul>
                <li>txt文件</li>
                <li>XML文件</li>
                <li>SVG源码操作</li>
                <li>GLSL着色器文件</li>
                <li>需要直接操作文件源码的情况</li>
              </ul>
            </div>
            <div class="config-example">
              <h4>配置示例：</h4>
              <pre class="code-block">{
  test: /\.(txt|xml|glsl)$/i,
  type: 'asset/source'
}</pre>
            </div>
          </div>

          <!-- asset 类型 -->
          <div v-if="activeType === 'asset'" class="type-details">
            <div class="type-header">
              <h3>asset</h3>
              <div class="tag">自动选择</div>
            </div>
            <p>
              在导出一个 data URI 和发送一个单独的文件之间自动选择（类似 url-loader + file-loader）。
              根据文件大小自动判断使用 inline 还是 resource 方式。
            </p>
            <div class="use-case">
              <h4>适用场景：</h4>
              <ul>
                <li>通用图片处理</li>
                <li>图标字体</li>
                <li>不确定大小的资源</li>
                <li>需要自动优化策略的情况</li>
              </ul>
            </div>
            <div class="config-example">
              <h4>配置示例：</h4>
              <pre class="code-block">{
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024 // 10KB
    }
  },
  generator: {
    filename: 'static/images/[name].[hash][ext]'
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置参数基础介绍 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>关键配置参数基础介绍</h2>
        </div>

        <div class="config-table-container">
          <table class="config-table">
            <thead>
              <tr>
                <th>配置项</th>
                <th>类型</th>
                <th>默认值</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>type</code></td>
                <td>String</td>
                <td>-</td>
                <td>资源模块类型（asset/resource, asset/inline, asset/source, asset）</td>
              </tr>
              <tr>
                <td><code>parser.dataUrlCondition.maxSize</code></td>
                <td>Number</td>
                <td>8096 (8kb)</td>
                <td>内联资源的最大大小（字节）。小于此值使用内联，大于此值生成单独文件</td>
              </tr>
              <tr>
                <td><code>generator.filename</code></td>
                <td>String/Function</td>
                <td>'[hash][ext][query]'</td>
                <td>自定义输出文件名模板，支持占位符：<br>[name], [hash], [ext], [query]</td>
              </tr>
              <tr>
                <td><code>generator.outputPath</code></td>
                <td>String</td>
                <td>-</td>
                <td>自定义输出路径，相对于output.path</td>
              </tr>
              <tr>
                <td><code>generator.publicPath</code></td>
                <td>String/Function</td>
                <td>默认output.publicPath</td>
                <td>自定义资源公共路径</td>
              </tr>
              <tr>
                <td><code>generator.emit</code></td>
                <td>Boolean</td>
                <td>true</td>
                <td>是否生成资源文件（false时只返回publicPath）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="placeholder-examples">
          <h3>文件名占位符基础介绍：</h3>
          <div class="placeholders-grid">
            <div class="placeholder-card">
              <div class="placeholder-name"><code>[hash]</code></div>
              <div class="placeholder-desc">文件内容的哈希值，默认使用20位MD5散列</div>
            </div>
            <div class="placeholder-card">
              <div class="placeholder-name"><code>[name]</code></div>
              <div class="placeholder-desc">原始文件名（不含路径和扩展名）</div>
            </div>
            <div class="placeholder-card">
              <div class="placeholder-name"><code>[ext]</code></div>
              <div class="placeholder-desc">文件扩展名（含"."）</div>
            </div>
            <div class="placeholder-card">
              <div class="placeholder-name"><code>[query]</code></div>
              <div class="placeholder-desc">资源请求查询参数（含"?"）</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>最佳实践指南</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="card-icon">1</div>
            <h3>小文件内联</h3>
            <p>对于小于8KB的图片/SVG使用<code>asset/inline</code>，减少HTTP请求</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">2</div>
            <h3>大文件单独处理</h3>
            <p>大于8KB的文件使用<code>asset/resource</code>，避免bundle过大</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">3</div>
            <h3>自动优化策略</h3>
            <p>使用<code>asset</code>类型让Webpack自动选择最佳处理方式</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">4</div>
            <h3>内容哈希命名</h3>
            <p>使用<code>[name].[hash:8][ext]</code>实现长效缓存</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">5</div>
            <h3>资源分类存储</h3>
            <p>不同类型资源使用不同目录：<br><code>fonts/[name][ext]</code></p>
          </div>

          <div class="practice-card">
            <div class="card-icon">6</div>
            <h3>统一公共路径</h3>
            <p>使用<code>generator.publicPath</code>统一资源路径</p>
          </div>
        </div>

        <div class="full-config-example">
          <h3>完整配置示例：</h3>
          <pre class="code-block">// webpack.config.js
module.exports = {
  module: {
    rules: [
      // 处理字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash:8][ext]'
        }
      },
      // 处理图片资源
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8KB以下内联
          }
        },
        generator: {
          filename: 'static/images/[name].[hash:8][ext]'
        }
      },
      // 处理文本文件
      {
        test: /\.(txt|md|csv)$/i,
        type: 'asset/source'
      }
    ]
  }
}</pre>
        </div>
      </section>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <p>Webpack Asset Modules 基础介绍 | 资源处理最佳实践 | © 2023</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 资源类型数据
const assetTypes = [
  { id: 'resource', name: 'asset/resource', icon: '📁' },
  { id: 'inline', name: 'asset/inline', icon: '🔗' },
  { id: 'source', name: 'asset/source', icon: '📝' },
  { id: 'asset', name: 'asset', icon: '🤖' }
];

const activeType = ref('resource');
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.asset-modules-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-banner {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
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

.versions {
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
    color: #4f46e5;
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
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #e0e7ff;
  }

  .feature-icon {
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

.types-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.types-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.type-tab {
  background: white;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c7d2fe;
    transform: translateY(-3px);
  }

  &.active {
    border-color: #4f46e5;
    background: #eef2ff;
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.15);

    .tab-icon {
      background: #4f46e5;
      color: white;
    }
  }

  .tab-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 1rem;
    background: #eef2ff;
    color: #4f46e5;
    transition: all 0.3s ease;
  }

  .tab-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1e293b;
  }
}

.type-details {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.8rem;
  border: 1px solid #e2e8f0;

  .type-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;

    h3 {
      font-size: 1.5rem;
      margin: 0;
      color: #1e293b;
    }

    .tag {
      background: #c7d2fe;
      color: #4f46e5;
      padding: 0.3rem 0.8rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
    }
  }

  p {
    margin: 0 0 1.5rem;
    color: #475569;
    line-height: 1.7;
  }
}

.use-case {
  background: #e0e7ff;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;

  h4 {
    margin: 0 0 0.8rem;
    color: #4338ca;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #4f46e5;
    }
  }
}

.config-example {
  h4 {
    font-size: 1.1rem;
    margin: 0 0 0.8rem;
    color: #1e293b;
  }
}

.config-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.config-table-container {
  overflow-x: auto;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border: 1px solid #e2e8f0;
  }

  th {
    background-color: #e0e7ff;
    color: #4338ca;
    font-weight: 600;
  }

  td {
    vertical-align: top;
    font-size: 0.95rem;

    &:first-child code {
      font-weight: 600;
    }
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  code {
    font-family: @font-code;
    background: #e0e7ff;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    color: #4f46e5;
  }
}

.placeholder-examples {
  margin-top: 2rem;

  h3 {
    font-size: 1.3rem;
    color: #1e293b;
    margin: 0 0 1.2rem;
  }
}

.placeholders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
}

.placeholder-card {
  background: #f1f5f9;
  border-radius: 10px;
  padding: 1.2rem;
  border: 1px solid #e2e8f0;

  .placeholder-name {
    font-family: @font-code;
    font-weight: 600;
    color: #4f46e5;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .placeholder-desc {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

.practice-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .card-icon {
    width: 35px;
    height: 35px;
    background: #4f46e5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.8rem;
    color: #1e293b;
  }

  p {
    margin: 0;
    color: #64748b;
    line-height: 1.7;
    font-size: 0.95rem;

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
  margin-top: 2rem;

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
  border-left: 4px solid #4f46e5;

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
  .header-banner {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .types-tabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .config-table {
    min-width: 100%;
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

  .types-tabs {
    grid-template-columns: 1fr;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
