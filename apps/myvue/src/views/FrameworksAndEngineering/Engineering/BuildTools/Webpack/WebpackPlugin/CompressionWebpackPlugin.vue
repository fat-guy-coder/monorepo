<template>
  <div class="compression-container">
    <div class="header">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24">
            <path
              d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
          </svg>
        </div>
        <div class="logo-text">compression-webpack-plugin</div>
      </div>
      <h1>Webpack 资源压缩插件</h1>
      <p class="subtitle">优化前端资源体积，提升应用加载速度</p>
    </div>

    <div class="content">
      <!-- 插件概述 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">📦</div>
          <h2>插件概述</h2>
        </div>
        <div class="section-content">
          <div class="overview">
            <div class="overview-card">
              <div class="card-icon">⚡</div>
              <h3>作用</h3>
              <p>为静态资源（JS/CSS/HTML等）提供 Gzip/Brotli 压缩支持，减少传输体积，提升应用加载速度。</p>
            </div>
            <div class="overview-card">
              <div class="card-icon">🔧</div>
              <h3>工作原理</h3>
              <p>在 Webpack 构建过程中，对输出文件进行压缩处理，生成 .gz 或 .br 文件。</p>
            </div>
            <div class="overview-card">
              <div class="card-icon">📉</div>
              <h3>压缩效果</h3>
              <p>通常可将文件体积减少 60%-80%，显著提升页面加载性能。</p>
            </div>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">3.2M+</div>
              <div class="stat-label">周下载量</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">4.7K</div>
              <div class="stat-label">GitHub Stars</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">98%</div>
              <div class="stat-label">现代浏览器支持率</div>
            </div>
          </div>

          <div class="integration">
            <h3>适用场景</h3>
            <ul>
              <li>生产环境构建优化</li>
              <li>SPA（单页应用）性能优化</li>
              <li>静态资源托管（CDN）优化</li>
              <li>提升 Lighthouse 性能评分</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 核心配置 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">⚙️</div>
          <h2>核心配置项</h2>
        </div>
        <div class="section-content">
          <div class="config-grid">
            <div class="config-card">
              <div class="config-header">
                <div class="config-name">test</div>
                <div class="config-type">RegExp | Array&lt;RegExp&gt;
                </div>
                <div class="config-default">默认：undefined</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>指定匹配规则，决定哪些文件需要被压缩</p>
                <div class="code-block">
                  <pre>test: /\.(js|css|html|svg)$/</pre>
                </div>
              </div>
            </div>

            <div class="config-card">
              <div class="config-header">
                <div class="config-name">filename</div>
                <div class="config-type">String | Function</div>
                <div class="config-default">默认：'[path][base].gz'</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>自定义压缩文件的命名规则</p>
                <div class="code-block">
                  <pre>filename: '[path][base].gz'</pre>
                </div>
              </div>
            </div>

            <div class="config-card">
              <div class="config-header">
                <div class="config-name">algorithm</div>
                <div class="config-type">String | Function</div>
                <div class="config-default">默认：'gzip'</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>指定压缩算法，支持 'gzip' 或 'brotliCompress'</p>
                <div class="code-block">
                  <pre>algorithm: 'gzip'</pre>
                </div>
              </div>
            </div>

            <div class="config-card">
              <div class="config-header">
                <div class="config-name">threshold</div>
                <div class="config-type">Number</div>
                <div class="config-default">默认：0</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>设置文件大小阈值（字节），只有大于此值的文件才会被压缩</p>
                <div class="code-block">
                  <pre>threshold: 10240 // 10KB</pre>
                </div>
              </div>
            </div>

            <div class="config-card">
              <div class="config-header">
                <div class="config-name">minRatio</div>
                <div class="config-type">Number</div>
                <div class="config-default">默认：0.8</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>压缩比阈值，只有压缩比优于此值的文件才会被输出</p>
                <div class="code-block">
                  <pre>minRatio: 0.8 // 压缩率必须小于80%</pre>
                </div>
              </div>
            </div>

            <div class="config-card">
              <div class="config-header">
                <div class="config-name">deleteOriginalAssets</div>
                <div class="config-type">Boolean</div>
                <div class="config-default">默认：false</div>
              </div>
              <div class="config-content">
                <h3>作用</h3>
                <p>是否删除原始文件（仅保留压缩文件）</p>
                <div class="code-block">
                  <pre>deleteOriginalAssets: false</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 算法参数 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🔬</div>
          <h2>压缩算法参数</h2>
        </div>
        <div class="section-content">
          <div class="algorithm-tabs">
            <div class="tab-buttons">
              <button :class="{ active: activeTab === 'gzip' }" @click="activeTab = 'gzip'">Gzip 参数</button>
              <button :class="{ active: activeTab === 'brotli' }" @click="activeTab = 'brotli'">Brotli 参数</button>
            </div>

            <div class="tab-content" v-if="activeTab === 'gzip'">
              <div class="param-card">
                <h3>Gzip 压缩参数</h3>
                <p>通过 <code>compressionOptions</code> 传递给 zlib.gzipSync</p>

                <div class="param-grid">
                  <div class="param-item">
                    <div class="param-name">level</div>
                    <div class="param-type">Number</div>
                    <div class="param-default">默认：9</div>
                    <div class="param-desc">压缩级别 (0-9)，9为最高压缩率</div>
                  </div>

                  <div class="param-item">
                    <div class="param-name">memLevel</div>
                    <div class="param-type">Number</div>
                    <div class="param-default">默认：8</div>
                    <div class="param-desc">内存使用级别 (1-9)，影响压缩速度</div>
                  </div>

                  <div class="param-item">
                    <div class="param-name">strategy</div>
                    <div class="param-type">Number</div>
                    <div class="param-default">默认：0</div>
                    <div class="param-desc">压缩策略（默认策略为Z_DEFAULT_STRATEGY）</div>
                  </div>
                </div>

                <div class="code-block">
                  <pre>new CompressionPlugin({
  algorithm: 'gzip',
  compressionOptions: {
    level: 9,
    memLevel: 8
  }
})</pre>
                </div>
              </div>
            </div>

            <div class="tab-content" v-if="activeTab === 'brotli'">
              <div class="param-card">
                <h3>Brotli 压缩参数</h3>
                <p>通过 <code>compressionOptions</code> 传递给 zlib.brotliCompressSync</p>

                <div class="param-grid">
                  <div class="param-item">
                    <div class="param-name">params</div>
                    <div class="param-type">Object</div>
                    <div class="param-default">默认：{}</div>
                    <div class="param-desc">Brotli 高级参数配置</div>
                  </div>

                  <div class="param-item">
                    <div class="param-name">quality</div>
                    <div class="param-type">Number (0-11)</div>
                    <div class="param-default">默认：11</div>
                    <div class="param-desc">压缩质量，值越大压缩率越高</div>
                  </div>

                  <div class="param-item">
                    <div class="param-name">size_hint</div>
                    <div class="param-type">Number</div>
                    <div class="param-default">默认：0</div>
                    <div class="param-desc">预期输入大小，帮助优化压缩</div>
                  </div>
                </div>

                <div class="code-block">
                  <pre>new CompressionPlugin({
  filename: '[path][base].br',
  algorithm: 'brotliCompress',
  compressionOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11
    }
  }
})</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用示例 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>完整使用示例</h2>
        </div>
        <div class="section-content">
          <div class="example-card">
            <h3>基础配置</h3>
            <div class="code-block">
              <pre>// webpack.config.js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // ...其他配置
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // 大于10KB的文件才压缩
      minRatio: 0.8, // 压缩率小于0.8才输出
    })
  ]
};</pre>
            </div>
          </div>

          <div class="example-card">
            <h3>高级配置（Gzip + Brotli）</h3>
            <div class="code-block">
              <pre>const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = {
  plugins: [
    // Gzip 压缩
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // Brotli 压缩
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8,
    })
  ]
};</pre>
            </div>
          </div>

          <div class="tips">
            <h3>最佳实践建议</h3>
            <ul>
              <li>仅在生产环境启用压缩</li>
              <li>优先使用 Brotli 压缩（现代浏览器支持）</li>
              <li>压缩级别设置要权衡时间和压缩率</li>
              <li>配置服务器优先提供 Brotli，回退到 Gzip</li>
              <li>使用 CDN 自动处理压缩文件服务</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>compression-webpack-plugin v9.0.0 | MIT License</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('gzip');
</script>

<style lang="less" scoped>
@primary-color: #42b883;
@secondary-color: #35495e;
@accent-color: #ff7e67;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@code-bg: #f5f5f5;
@code-border: #e0e0e0;
@success-color: #42b883;
@warning-color: #ffb300;

.compression-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 2rem 1rem;
  margin-bottom: 1.5rem;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .logo-icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 32px;
        height: 32px;
        fill: white;
      }
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: @secondary-color;
    }
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  margin-bottom: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-color;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

// 概述部分
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .overview-card {
    background: rgba(@primary-color, 0.03);
    border: 1px solid fade(@primary-color, 15%);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @secondary-color;
    }

    p {
      margin: 0;
      color: @light-text;
      line-height: 1.6;
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  .stat-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.3rem;
    }

    .stat-label {
      font-size: 0.95rem;
      color: @light-text;
    }
  }
}

.integration {
  background: rgba(@accent-color, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @accent-color;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @accent-color;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
    }
  }
}

// 配置部分
.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;

  .config-card {
    border: 1px solid @border-color;
    border-radius: 12px;
    overflow: hidden;
    background: @card-bg;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }

    .config-header {
      background: rgba(@primary-color, 0.08);
      padding: 1rem;
      border-bottom: 1px solid @border-color;

      .config-name {
        font-size: 1.2rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.3rem;
      }

      .config-type {
        font-size: 0.9rem;
        color: @light-text;
        margin-bottom: 0.3rem;
      }

      .config-default {
        font-size: 0.9rem;
        background: fade(@primary-color, 10%);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        display: inline-block;
      }
    }

    .config-content {
      padding: 1.2rem;

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
      }

      p {
        margin-bottom: 1rem;
        color: @light-text;
      }
    }
  }
}

// 算法参数部分
.algorithm-tabs {
  .tab-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      background: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(@primary-color, 0.05);
      }

      &.active {
        background: @primary-color;
        color: white;
        border-color: @primary-color;
      }
    }
  }

  .param-card {
    background: rgba(@primary-color, 0.03);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid fade(@primary-color, 15%);

    h3 {
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: @secondary-color;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid @border-color;
    }

    p {
      color: @light-text;
      margin-bottom: 1.5rem;
    }
  }

  .param-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .param-item {
      background: @card-bg;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid @border-color;

      .param-name {
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      .param-type {
        font-size: 0.9rem;
        color: @light-text;
        margin-bottom: 0.3rem;
      }

      .param-default {
        font-size: 0.9rem;
        background: fade(@primary-color, 8%);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 0.5rem;
      }

      .param-desc {
        font-size: 0.95rem;
        color: @light-text;
      }
    }
  }
}

// 公共样式
.tips {
  background: rgba(@accent-color, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid @accent-color;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @accent-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
    }
  }
}

.code-block {
  background: #282c34;
  border-radius: 8px;
  padding: 1.2rem;
  margin: 1.2rem 0;
  overflow-x: auto;

  pre {
    color: #abb2bf;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
}

.example-card {
  margin-bottom: 2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @secondary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem 0.5rem;

    .logo {
      .logo-text {
        font-size: 1.4rem;
      }
    }

    h1 {
      font-size: 1.8rem;
    }
  }

  .config-grid {
    grid-template-columns: 1fr;
  }

  .param-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .overview {
    grid-template-columns: 1fr;
  }

  .tab-buttons {
    flex-direction: column;
  }
}
</style>
