<template>
  <div class="contenthash-container">
    <header class="header">
      <h1>Webpack <span class="highlight">ContentHash</span> 基础介绍</h1>
      <p class="subtitle">利用文件内容哈希实现持久化缓存策略</p>
    </header>

    <div class="content">
      <div class="intro-cards">
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-fingerprint"></i>
          </div>
          <h3>什么是 ContentHash？</h3>
          <p>ContentHash 是 Webpack 基于文件内容生成的唯一哈希值，用于创建具有持久缓存能力的文件名。</p>
        </div>
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-bolt"></i>
          </div>
          <h3>核心价值</h3>
          <p>当文件内容不变时，哈希值保持不变，浏览器可使用缓存版本，极大提升应用加载性能。</p>
        </div>
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-cogs"></i>
          </div>
          <h3>工作原理</h3>
          <p>Webpack 使用哈希算法（默认为 md4）处理文件内容，生成唯一的固定长度哈希字符串。</p>
        </div>
      </div>

      <section class="comparison">
        <h2 class="section-title">
          <i class="fas fa-balance-scale"></i> 哈希策略对比
        </h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>哈希类型</th>
                <th>描述</th>
                <th>变化时机</th>
                <th>适用场景</th>
                <th>示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>[hash]</code></td>
                <td>项目级哈希，所有文件共享</td>
                <td>项目任意文件变化时</td>
                <td>小型项目或不需精细缓存控制</td>
                <td><code>app.3e7f4c8.js</code></td>
              </tr>
              <tr>
                <td><code>[chunkhash]</code></td>
                <td>chunk 级别哈希</td>
                <td>所属 chunk 变化时</td>
                <td>代码分割后的 chunk</td>
                <td><code>vendors.4d8f2a1.js</code></td>
              </tr>
              <tr>
                <td><code>[contenthash]</code></td>
                <td>文件内容哈希</td>
                <td>文件内容变化时</td>
                <td>所有需要持久缓存的文件</td>
                <td><code>main.8c7b6d5.css</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="comparison-visual">
          <div class="visual-card">
            <div class="file-name">app.[hash].js</div>
            <div class="change-effect">
              <div class="change change-html">修改 index.html</div>
              <div class="arrow">→</div>
              <div class="result changed">哈希改变</div>
            </div>
          </div>
          <div class="visual-card">
            <div class="file-name">vendors.[chunkhash].js</div>
            <div class="change-effect">
              <div class="change change-css">修改 app.css</div>
              <div class="arrow">→</div>
              <div class="result unchanged">哈希不变</div>
            </div>
          </div>
          <div class="visual-card">
            <div class="file-name">main.[contenthash].css</div>
            <div class="change-effect">
              <div class="change change-js">修改 utils.js</div>
              <div class="arrow">→</div>
              <div class="result unchanged">哈希不变</div>
            </div>
          </div>
        </div>
      </section>

      <section class="configuration">
        <h2 class="section-title">
          <i class="fas fa-wrench"></i> ContentHash 配置指南
        </h2>

        <div class="config-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>基础配置</h3>
              <p>在输出文件名中使用 <code>[contenthash]</code> 占位符：</p>
              <pre><code>output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].chunk.js',
}</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>CSS 文件配置</h3>
              <p>在 MiniCssExtractPlugin 中配置 CSS 文件名：</p>
              <pre><code>plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[id].[contenthash].css',
  }),
]</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>资源文件配置</h3>
              <p>在 file-loader 或 asset modules 中配置资源文件名：</p>
              <pre><code>module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name].[contenthash][ext]'
      }
    }
  ]
}</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>自定义哈希长度</h3>
              <p>使用 <code>[contenthash:8]</code> 指定哈希长度：</p>
              <pre><code>output: {
  filename: '[name].[contenthash:8].js'
}</code></pre>
              <p>默认长度为 20，指定长度可缩短文件名</p>
            </div>
          </div>
        </div>
      </section>

      <section class="workflow">
        <h2 class="section-title">
          <i class="fas fa-project-diagram"></i> ContentHash 工作流程
        </h2>

        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-icon">
              <i class="fas fa-file-code"></i>
            </div>
            <div class="step-content">
              <h3>1. 文件内容读取</h3>
              <p>Webpack 读取源文件内容，包括所有依赖和资源</p>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-icon">
              <i class="fas fa-hashtag"></i>
            </div>
            <div class="step-content">
              <h3>2. 哈希计算</h3>
              <p>使用指定算法（默认为 md4）计算文件内容的哈希值</p>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-icon">
              <i class="fas fa-file-signature"></i>
            </div>
            <div class="step-content">
              <h3>3. 文件名生成</h3>
              <p>将哈希值插入到配置的文件名模板中</p>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <div class="step-content">
              <h3>4. 内容变化检测</h3>
              <p>当文件内容变化时，重新计算哈希并生成新文件名</p>
            </div>
          </div>

          <div class="workflow-step">
            <div class="step-icon">
              <i class="fas fa-cloud-download-alt"></i>
            </div>
            <div class="step-content">
              <h3>5. 缓存利用</h3>
              <p>浏览器对未变化的文件使用缓存，只下载变化文件</p>
            </div>
          </div>
        </div>

        <div class="workflow-diagram">
          <div class="diagram-row">
            <div class="diagram-item">
              <div class="diagram-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="diagram-label">源文件</div>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-item">
              <div class="diagram-icon">
                <i class="fas fa-calculator"></i>
              </div>
              <div class="diagram-label">哈希计算</div>
            </div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-item">
              <div class="diagram-icon">
                <i class="fas fa-file-code"></i>
              </div>
              <div class="diagram-label">输出文件</div>
            </div>
          </div>
          <div class="diagram-row diagram-row-reverse">
            <div class="diagram-arrow">←</div>
            <div class="diagram-item">
              <div class="diagram-icon">
                <i class="fas fa-redo"></i>
              </div>
              <div class="diagram-label">内容变化</div>
            </div>
            <div class="diagram-arrow">←</div>
            <div class="diagram-item">
              <div class="diagram-icon">
                <i class="fas fa-cloud"></i>
              </div>
              <div class="diagram-label">浏览器缓存</div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-check-circle"></i> 最佳实践与注意事项
        </h2>

        <div class="practices">
          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>常见问题</h3>
            <ul>
              <li>哈希值意外变化 - 由运行时内容或模块ID变动引起</li>
              <li>缓存失效 - 未正确配置长期缓存策略</li>
              <li>哈希不一致 - 不同环境或机器生成不同哈希</li>
              <li>旧文件累积 - 需配置自动清理旧文件</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3>优化建议</h3>
            <ul>
              <li>使用 <code>contenthash</code> 而非 <code>chunkhash</code></li>
              <li>提取运行时文件 <code>runtimeChunk: 'single'</code></li>
              <li>模块ID稳定化 <code>optimization.moduleIds: 'deterministic'</code></li>
              <li>配置长期缓存策略（Cache-Control: max-age=31536000）</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-tools"></i>
            </div>
            <h3>工具与技巧</h3>
            <ul>
              <li>使用 webpack-bundle-analyzer 分析包内容</li>
              <li>配置 clean-webpack-plugin 自动清理旧文件</li>
              <li>设置哈希长度 <code>[contenthash:8]</code> 缩短文件名</li>
              <li>使用 <code>optimization.realContentHash</code> 解决二次压缩问题</li>
            </ul>
          </div>
        </div>

        <div class="complete-example">
          <h3><i class="fas fa-code"></i> 完整配置示例</h3>
          <pre><code>const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: '/',
  },
  optimization: {
    moduleIds: 'deterministic', // 稳定模块ID
    runtimeChunk: 'single',     // 分离运行时文件
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理dist目录
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      },
    ],
  },
};</code></pre>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p> Webpack ContentHash 基础介绍 | 使用 Vue 3 和 TypeScript 实现</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// 不需要太多逻辑，主要是展示静态内容
</script>

<style lang="less" scoped>



.contenthash-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;

        i {
          font-size: 2rem;
          color: white;
        }
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .comparison {
    margin-bottom: 3rem;

    .comparison-table {
      background: white;
      border-radius: 12px;
      overflow: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8fafc;
          font-weight: 600;
          color: #2c3e50;
        }

        tbody tr:hover {
          background: #f8fafc;
        }

        code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #d35400;
        }
      }
    }

    .comparison-visual {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .visual-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .file-name {
          font-family: 'Fira Code', monospace;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          padding: 0.8rem;
          background: #f1f5f9;
          border-radius: 8px;
          text-align: center;
          color: #2c3e50;
        }

        .change-effect {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;

          .change {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;

            &.change-html {
              background: rgba(231, 76, 60, 0.1);
              color: #c0392b;
            }

            &.change-css {
              background: rgba(46, 204, 113, 0.1);
              color: #27ae60;
            }

            &.change-js {
              background: rgba(52, 152, 219, 0.1);
              color: #2980b9;
            }
          }

          .arrow {
            color: #7f8c8d;
          }

          .result {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;

            &.changed {
              background: rgba(231, 76, 60, 0.1);
              color: #c0392b;
            }

            &.unchanged {
              background: rgba(46, 204, 113, 0.1);
              color: #27ae60;
            }
          }
        }
      }
    }
  }

  .configuration {
    margin-bottom: 3rem;

    .config-steps {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .step {
        display: flex;
        gap: 1.5rem;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .step-number {
          min-width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3498db, #2c3e50);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .step-content {
          flex: 1;

          h3 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            color: #2c3e50;
          }

          pre {
            background: #2c3e50;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;
            margin-top: 1rem;

            code {
              font-family: 'Fira Code', monospace;
              color: #e0e0e0;
              font-size: 0.9rem;
              line-height: 1.5;

              .hljs-attr {
                color: #82aaff;
              }

              .hljs-string {
                color: #c3e88d;
              }
            }
          }
        }
      }
    }
  }

  .workflow {
    margin-bottom: 3rem;

    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .workflow-step {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .step-icon {
          width: 60px;
          height: 60px;
          background: #3498db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;

          i {
            font-size: 1.8rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }
      }
    }

    .workflow-diagram {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .diagram-row {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;

        &.diagram-row-reverse {
          flex-direction: row-reverse;
        }
      }

      .diagram-item {
        text-align: center;
        padding: 1rem;

        .diagram-icon {
          width: 80px;
          height: 80px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;

          i {
            font-size: 2rem;
            color: #3498db;
          }
        }

        .diagram-label {
          font-weight: 500;
          color: #2c3e50;
        }
      }

      .diagram-arrow {
        font-size: 2rem;
        color: #3498db;
        margin: 0 2rem;
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3498db, #2c3e50);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          i {
            font-size: 1.5rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            line-height: 1.5;

            code {
              background: #f1f5f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: #d35400;
            }
          }
        }
      }
    }

    .complete-example {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      pre {
        background: #2c3e50;
        border-radius: 8px;
        padding: 1.5rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;

          .hljs-keyword {
            color: #ff9a76;
          }

          .hljs-title {
            color: #82aaff;
          }

          .hljs-attr {
            color: #82aaff;
          }

          .hljs-string {
            color: #c3e88d;
          }

          .hljs-number {
            color: #f78c6c;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .contenthash-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }

    .workflow-diagram {
      .diagram-row {
        flex-direction: column;
        margin-bottom: 1rem;

        .diagram-arrow {
          transform: rotate(90deg);
          margin: 1rem 0;
        }
      }
    }
  }
}
</style>
