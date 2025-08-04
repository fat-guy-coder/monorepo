<template>
  <div class="optimization-container">
    <div class="header">
      <div class="header-content">
        <h1 class="title">
          <span class="title-icon">⚙️</span> Webpack Optimization 配置基础介绍
        </h1>
        <p class="subtitle">提升构建性能与输出质量的关键配置</p>
      </div>
    </div>

    <div class="content">
      <!-- 介绍部分 -->
      <div class="intro-section">
        <div class="intro-card">
          <div class="card-icon">🚀</div>
          <h2 class="card-title">为什么需要 Optimization 配置？</h2>
          <p class="card-text">
            Webpack 的 optimization 配置是优化构建输出结果的核心部分，它控制着代码分割、压缩、
            摇树优化等关键行为。合理配置可以显著减少包体积、提升加载性能、改善缓存效率，
            同时保持代码的可维护性和调试能力。
          </p>
        </div>
      </div>

      <!-- 核心价值 -->
      <div class="value-section">
        <h2 class="section-title">✨ Optimization 的核心价值</h2>
        <div class="value-grid">
          <div class="value-card">
            <div class="value-icon">📦</div>
            <h3>减小包体积</h3>
            <p>通过代码压缩、摇树优化减少输出文件大小</p>
          </div>
          <div class="value-card">
            <div class="value-icon">⚡</div>
            <h3>提升加载速度</h3>
            <p>代码分割实现按需加载，减少首屏加载时间</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🔄</div>
            <h3>优化缓存</h3>
            <p>分离变动频繁的模块，提高缓存利用率</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🧩</div>
            <h3>改善性能</h3>
            <p>并行处理、优化模块ID等提升构建效率</p>
          </div>
        </div>
      </div>

      <!-- 核心配置基础介绍 -->
      <div class="config-section">
        <h2 class="section-title">⚙️ Optimization 核心配置基础介绍</h2>

        <div class="config-group">
          <div class="config-header">
            <div class="config-icon">✂️</div>
            <h3>splitChunks - 代码分割</h3>
            <p>将公共模块分离到单独文件，避免重复加载</p>
          </div>

          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>chunks</code></td>
                  <td>String</td>
                  <td><code>"async"</code></td>
                  <td>指定分割模式：<code>async</code>(异步), <code>initial</code>(同步), <code>all</code>(全部)</td>
                </tr>
                <tr>
                  <td><code>minSize</code></td>
                  <td>Number</td>
                  <td><code>20000</code></td>
                  <td>生成 chunk 的最小体积（单位 bytes）</td>
                </tr>
                <tr>
                  <td><code>maxSize</code></td>
                  <td>Number</td>
                  <td><code>0</code></td>
                  <td>尝试将大于此值的 chunk 拆分</td>
                </tr>
                <tr>
                  <td><code>minChunks</code></td>
                  <td>Number</td>
                  <td><code>1</code></td>
                  <td>分割前模块的最小引用次数</td>
                </tr>
                <tr>
                  <td><code>maxAsyncRequests</code></td>
                  <td>Number</td>
                  <td><code>30</code></td>
                  <td>按需加载时的最大并行请求数</td>
                </tr>
                <tr>
                  <td><code>maxInitialRequests</code></td>
                  <td>Number</td>
                  <td><code>30</code></td>
                  <td>入口点的最大并行请求数</td>
                </tr>
                <tr>
                  <td><code>automaticNameDelimiter</code></td>
                  <td>String</td>
                  <td><code>"~"</code></td>
                  <td>生成名称的分隔符</td>
                </tr>
                <tr>
                  <td><code>cacheGroups</code></td>
                  <td>Object</td>
                  <td>-</td>
                  <td>自定义缓存组，核心配置项</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-example">
            <h4>splitChunks 配置示例</h4>
            <pre class="code-block">optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        name: 'vendors'
      },
      common: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}</pre>
          </div>
        </div>

        <div class="config-group">
          <div class="config-header">
            <div class="config-icon">🔧</div>
            <h3>minimize & minimizer - 代码压缩</h3>
            <p>控制是否压缩代码及使用的压缩工具</p>
          </div>

          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>minimize</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>是否启用代码压缩（生产模式默认开启）</td>
                </tr>
                <tr>
                  <td><code>minimizer</code></td>
                  <td>Array</td>
                  <td><code>[TerserPlugin]</code></td>
                  <td>配置压缩工具，可覆盖默认配置</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-example">
            <h4>minimizer 配置示例</h4>
            <pre class="code-block">const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true, // 启用多进程
      extractComments: false, // 不提取注释
      terserOptions: {
        compress: {
          drop_console: true // 移除 console
        }
      }
    }),
    new CssMinimizerPlugin() // CSS 压缩
  ]
}</pre>
          </div>
        </div>

        <div class="config-group">
          <div class="config-header">
            <div class="config-icon">📦</div>
            <h3>runtimeChunk - 运行时分离</h3>
            <p>分离 Webpack 的运行时文件</p>
          </div>

          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>runtimeChunk</code></td>
                  <td>Boolean/Object</td>
                  <td><code>false</code></td>
                  <td>设置为 <code>true</code> 或对象进行配置</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-example">
            <h4>runtimeChunk 配置示例</h4>
            <pre class="code-block">optimization: {
  // 基本用法 - 生成单个运行时文件
  runtimeChunk: true,

  // 高级用法 - 为每个入口生成运行时文件
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`
  }
}</pre>
          </div>
        </div>

        <div class="config-group">
          <div class="config-header">
            <div class="config-icon">🆔</div>
            <h3>moduleIds & chunkIds - 模块标识</h3>
            <p>控制模块和 chunk 的 ID 生成策略</p>
          </div>

          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>moduleIds</code></td>
                  <td>String</td>
                  <td><code>"deterministic"</code></td>
                  <td>可选值: <code>natural</code>, <code>named</code>, <code>deterministic</code>, <code>size</code></td>
                </tr>
                <tr>
                  <td><code>chunkIds</code></td>
                  <td>String</td>
                  <td><code>"deterministic"</code></td>
                  <td>可选值: <code>natural</code>, <code>named</code>, <code>deterministic</code>, <code>size</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-example">
            <h4>ID 配置示例</h4>
            <pre class="code-block">optimization: {
  // 生产环境推荐使用 deterministic
  moduleIds: 'deterministic',
  chunkIds: 'deterministic',

  // 开发环境可以使用 named 便于调试
  // moduleIds: 'named',
  // chunkIds: 'named'
}</pre>
            <p class="config-tip">
              <strong>提示：</strong> <code>deterministic</code> 选项会生成短的数字 ID（通常为3位），
              在文件内容不变的情况下保持 ID 不变，有利于长期缓存。
            </p>
          </div>
        </div>

        <div class="config-group">
          <div class="config-header">
            <div class="config-icon">🧩</div>
            <h3>其他重要配置</h3>
            <p>更多优化构建和输出的配置项</p>
          </div>

          <div class="config-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>emitOnErrors</code></td>
                  <td>Boolean</td>
                  <td><code>false</code></td>
                  <td>出错时是否继续输出资源</td>
                </tr>
                <tr>
                  <td><code>innerGraph</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>启用内部依赖图分析</td>
                </tr>
                <tr>
                  <td><code>mangleExports</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>是否混淆导出名称</td>
                </tr>
                <tr>
                  <td><code>mergeDuplicateChunks</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>合并内容相同的 chunk</td>
                </tr>
                <tr>
                  <td><code>removeAvailableModules</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>移除已包含在父 chunk 中的模块</td>
                </tr>
                <tr>
                  <td><code>removeEmptyChunks</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>移除空 chunk</td>
                </tr>
                <tr>
                  <td><code>usedExports</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>启用tree shaking</td>
                </tr>
                <tr>
                  <td><code>sideEffects</code></td>
                  <td>Boolean</td>
                  <td><code>true</code></td>
                  <td>
                    <p>启用 package.json 的 sideEffects 标志</p>
                    <p>sideEffects 标志用于告诉 Webpack 哪些模块是副作用(会对外部产生影响)模块，哪些模块是纯(不会对外部产生影响)模块。</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="best-practices">
        <h2 class="section-title">🚀 Optimization 最佳实践</h2>

        <div class="practice-grid">
          <div class="practice-card">
            <div class="practice-icon">📦</div>
            <h3>代码分割策略</h3>
            <ul>
              <li>使用 <code>splitChunks</code> 分离第三方库</li>
              <li>按路由分割实现按需加载</li>
              <li>合理设置 <code>minSize</code> 避免过小 chunk</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>压缩优化</h3>
            <ul>
              <li>生产环境开启代码压缩</li>
              <li>使用 <code>TerserPlugin</code> 移除 console</li>
              <li>配置 <code>CssMinimizerPlugin</code> 压缩 CSS</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔄</div>
            <h3>缓存优化</h3>
            <ul>
              <li>使用 <code>runtimeChunk</code> 分离运行时</li>
              <li>设置 <code>deterministic</code> 模块 ID</li>
              <li>使用 contenthash 命名输出文件</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🧩</div>
            <h3>构建性能</h3>
            <ul>
              <li>开发环境禁用部分优化</li>
              <li>合理配置并行处理选项</li>
              <li>使用缓存提升二次构建速度</li>
            </ul>
          </div>
        </div>

        <div class="env-comparison">
          <h3>开发环境 vs 生产环境配置</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>配置项</th>
                  <th>开发环境</th>
                  <th>生产环境</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>minimize</code></td>
                  <td>关闭</td>
                  <td>开启</td>
                </tr>
                <tr>
                  <td><code>minimizer</code></td>
                  <td>简化配置</td>
                  <td>完整配置</td>
                </tr>
                <tr>
                  <td><code>splitChunks</code></td>
                  <td>简化或关闭</td>
                  <td>精细配置</td>
                </tr>
                <tr>
                  <td><code>runtimeChunk</code></td>
                  <td>可选</td>
                  <td>推荐开启</td>
                </tr>
                <tr>
                  <td><code>moduleIds</code></td>
                  <td><code>named</code></td>
                  <td><code>deterministic</code></td>
                </tr>
                <tr>
                  <td><code>chunkIds</code></td>
                  <td><code>named</code></td>
                  <td><code>deterministic</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 完整配置示例 -->
      <div class="full-example">
        <h2 class="section-title">📝 完整配置示例</h2>

        <div class="example-tabs">
          <div class="tab" :class="{ active: activeTab === 'dev' }" @click="activeTab = 'dev'">
            开发环境
          </div>
          <div class="tab" :class="{ active: activeTab === 'prod' }" @click="activeTab = 'prod'">
            生产环境
          </div>
        </div>

        <div class="example-content">
          <div v-if="activeTab === 'dev'" class="code-block">
            <pre>// webpack.dev.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  // ...其他配置

  optimization: {
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};</pre>
          </div>

          <div v-if="activeTab === 'prod'" class="code-block">
            <pre>// webpack.prod.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  // ...其他配置

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd/,
          name: 'antd',
          priority: -5
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>© 2023 Webpack Optimization 配置指南 | 构建优化，性能提升</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref<'dev' | 'prod'>('dev');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.optimization-container {
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
  padding: 0 1.5rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  margin: 2.5rem 0 1.5rem;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
  }
}

.intro-section {
  margin-bottom: 2.5rem;
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
    line-height: 1.7;
  }
}

.value-section {
  margin-bottom: 3rem;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: white;
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .value-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e40af;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #64748b;
  }
}

.config-section {
  margin-bottom: 3rem;
}

.config-group {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.config-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .config-icon {
    font-size: 2rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0;
    color: #1e40af;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 1rem;
  }
}

.config-table {
  overflow-x: auto;
  margin-bottom: 1.5rem;

  table {
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
      background-color: #eff6ff;
      color: #1d4ed8;
      font-weight: 600;
    }

    td {
      vertical-align: top;
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
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 3px solid #3b82f6;

  h4 {
    margin: 0 0 1rem;
    color: #1e40af;
    font-size: 1.1rem;
  }
}

.config-tip {
  background: #fffbeb;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #854d0e;
  border-left: 3px solid #f59e0b;

  strong {
    color: #b45309;
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

.best-practices {
  margin-bottom: 3rem;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.practice-card {
  background: white;
  border-radius: 10px;
  padding: 1.8rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    margin: 0 0 1rem;
    color: #1e40af;
    font-size: 1.3rem;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;

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
}

.env-comparison {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  h3 {
    margin: 0 0 1.5rem;
    color: #1e40af;
    font-size: 1.3rem;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

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

.full-example {
  margin-bottom: 3rem;
}

.example-tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;

  .tab {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #64748b;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease;

    &.active {
      color: #3b82f6;
      border-bottom: 3px solid #3b82f6;
      background: #eff6ff;
    }

    &:hover:not(.active) {
      background: #f1f5f9;
    }
  }
}

.example-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .code-block {
    margin: 0;
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 1.5rem;
  color: #64748b;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .value-grid,
  .practice-grid {
    grid-template-columns: 1fr;
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
  .config-group,
  .example-content {
    padding: 1.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
