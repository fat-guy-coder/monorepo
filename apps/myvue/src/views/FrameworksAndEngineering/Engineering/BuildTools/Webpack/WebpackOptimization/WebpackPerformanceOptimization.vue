<template>
  <div class="performance-optimization">
    <div class="hero-banner">
      <h1>Webpack前端性能优化指南</h1>
      <p>使用Webpack提升应用加载速度和运行效率的最佳实践</p>
      <div class="stats-bar">
        <div class="stat">
          <div class="stat-value">60-70%</div>
          <div class="stat-label">加载时间减少</div>
        </div>
        <div class="stat">
          <div class="stat-value">40-50%</div>
          <div class="stat-label">文件体积缩小</div>
        </div>
        <div class="stat">
          <div class="stat-value">80%+</div>
          <div class="stat-label">现代网站使用</div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="optimization-techniques">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>核心性能优化技术</h2>
          <p>现代前端开发必备的性能优化策略</p>
        </div>

        <div class="technique-grid">
          <div class="technique-card" v-for="(tech, index) in techniques" :key="index" :style="cardStyle(index)">
            <div class="card-header">
              <div class="tech-icon">{{ tech.icon }}</div>
              <h3>{{ tech.title }}</h3>
            </div>
            <div class="card-body">
              <p>{{ tech.description }}</p>
              <div class="config-example" v-if="tech.config">
                <pre><code class="language-javascript">{{ tech.config }}</code></pre>
              </div>
              <div class="benefit-tag" v-if="tech.benefit">
                效益: {{ tech.benefit }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <div class="section-header">
          <div class="icon">📊</div>
          <h2>优化前后对比</h2>
          <p>性能优化带来的实际效果提升</p>
        </div>

        <div class="comparison-charts">
          <div class="chart">
            <h3>资源体积对比 (KB)</h3>
            <div class="bar-chart">
              <div class="bar unoptimized" :style="{ height: '100%' }">
                <div class="bar-label">优化前: 1.8MB</div>
              </div>
              <div class="bar optimized" :style="{ height: '28%' }">
                <div class="bar-label">优化后: 512KB</div>
              </div>
            </div>
          </div>

          <div class="chart">
            <h3>加载时间对比 (ms)</h3>
            <div class="bar-chart">
              <div class="bar unoptimized" :style="{ height: '100%' }">
                <div class="bar-label">优化前: 4200ms</div>
              </div>
              <div class="bar optimized" :style="{ height: '35%' }">
                <div class="bar-label">优化后: 1480ms</div>
              </div>
            </div>
          </div>

          <div class="chart">
            <h3>请求数量对比</h3>
            <div class="bar-chart">
              <div class="bar unoptimized" :style="{ height: '100%' }">
                <div class="bar-label">优化前: 36</div>
              </div>
              <div class="bar optimized" :style="{ height: '50%' }">
                <div class="bar-label">优化后: 18</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>Webpack优化工作流</h2>
          <p>现代前端构建流程中的性能优化步骤</p>
        </div>

        <div class="workflow-steps">
          <div class="step" v-for="(step, index) in workflow" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-tools" v-if="step.tools">
                <span v-for="(tool, i) in step.tools" :key="i">{{ tool }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <div class="section-header">
          <div class="icon">🏆</div>
          <h2>性能优化最佳实践</h2>
          <p>专业开发者的经验总结</p>
        </div>

        <div class="practices-list">
          <div class="practice-item" v-for="(practice, index) in practices" :key="index">
            <div class="practice-icon">{{ practice.icon }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      <p>通过综合应用这些Webpack优化技术，您可以将应用性能提升至专业水平</p>
      <div class="resources">
        <a href="#">Webpack性能优化文档</a>
        <a href="#">Vite与Webpack对比</a>
        <a href="#">高级优化技巧</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 性能优化技术数据
const techniques = ref([
  {
    icon: '🗜️',
    title: '代码压缩',
    description: '使用TerserPlugin压缩JavaScript代码，移除空格、注释和无效代码，减少文件大小',
    config: `// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
    })],
  },
};`,
    benefit: '减小JS文件体积30-50%'
  },
  {
    icon: '🖼️',
    title: '图片压缩',
    description: '使用image-webpack-loader自动压缩图片资源，支持JPG、PNG、GIF和SVG格式',
    config: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
            },
          },
        ],
      }
    ]
  }
};`,
    benefit: '减少图片体积40-70%'
  },
  {
    icon: '📦',
    title: 'Gzip压缩',
    description: '使用CompressionPlugin生成Gzip压缩版本，配合服务器配置提供压缩文件',
    config: `// webpack.config.js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};`,
    benefit: '额外减少文件大小70%+'
  },
  {
    icon: '🌳',
    title: 'Tree Shaking',
    description: '消除未使用代码，仅打包实际使用的模块，依赖ES模块语法',
    config: `// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
  },
};

// package.json
{
  "sideEffects": ["*.css", "*.scss"]
}`,
    benefit: '移除未使用代码，减少bundle大小'
  },
  {
    icon: '🧩',
    title: '代码分离',
    description: '将代码拆分成多个chunk，实现按需加载或并行加载',
    config: `// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

// 动态导入
const module = await import('./module.js');`,
    benefit: '加快初始加载时间'
  },
  {
    icon: '📚',
    title: '公共代码提取',
    description: '将多个入口共享的代码提取到单独文件，避免重复打包',
    config: `// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};`,
    benefit: '减少重复代码，利用浏览器缓存'
  },
  {
    icon: '⏱️',
    title: '缓存优化',
    description: '使用缓存提高构建速度，包括文件缓存和loader缓存',
    config: `// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }
    ]
  }
};`,
    benefit: '提高后续构建速度50-80%'
  },
  {
    icon: '🔍',
    title: 'Bundle分析',
    description: '使用分析工具可视化bundle组成，识别优化机会',
    config: `// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
    })
  ]
};`,
    benefit: '识别体积问题，优化依赖'
  }
]);

// 工作流步骤
const workflow = ref([
  {
    title: '开发环境分析',
    description: '使用webpack-bundle-analyzer分析当前bundle组成',
    tools: ['Bundle Analyzer', 'Webpack Stats']
  },
  {
    title: '代码分割',
    description: '根据路由和功能模块拆分代码',
    tools: ['Dynamic Imports', 'SplitChunksPlugin']
  },
  {
    title: '资源优化',
    description: '压缩图片、字体等静态资源',
    tools: ['ImageMin', 'FontMin']
  },
  {
    title: '代码优化',
    description: 'Tree Shaking、代码压缩、作用域提升',
    tools: ['Terser', 'Scope Hoisting']
  },
  {
    title: '缓存策略',
    description: '配置长效缓存和Gzip压缩',
    tools: ['ContentHash', 'CompressionPlugin']
  },
  {
    title: '性能监控',
    description: '集成性能预算和持续监控',
    tools: ['Performance Budget', 'Lighthouse CI']
  }
]);

// 最佳实践
const practices = ref([
  {
    icon: '1️⃣',
    title: '按需加载',
    description: '使用动态导入拆分代码，只在需要时加载模块'
  },
  {
    icon: '2️⃣',
    title: '优化依赖',
    description: '定期审查依赖项，移除未使用的库或替换为更小的替代品'
  },
  {
    icon: '3️⃣',
    title: '持久缓存',
    description: '使用[contenthash]生成文件名，利用浏览器长效缓存'
  },
  {
    icon: '4️⃣',
    title: '预加载关键资源',
    description: '使用preload/prefetch提高关键资源加载优先级'
  },
  {
    icon: '5️⃣',
    title: '设置性能预算',
    description: '定义可接受的性能阈值，防止性能回退'
  },
  {
    icon: '6️⃣',
    title: '渐进式优化',
    description: '优先优化关键渲染路径，确保首屏快速加载'
  }
]);

// 卡片背景样式
const cardStyle = (index: number) => {
  const colors = [
    'linear-gradient(135deg, #43cea2, #185a9d)',
    'linear-gradient(135deg, #ff7e5f, #feb47b)',
    'linear-gradient(135deg, #654ea3, #da98b4)',
    'linear-gradient(135deg, #3a7bd5, #00d2ff)',
    'linear-gradient(135deg, #ff416c, #ff4b2b)',
    'linear-gradient(135deg, #7f00ff, #e100ff)',
    'linear-gradient(135deg, #11998e, #38ef7d)',
    'linear-gradient(135deg, #5433ff, #20bdff)'
  ];
  return {
    background: colors[index % colors.length]
  };
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.performance-optimization {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: #f8f9fa;

  .hero-banner {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    color: white;
    text-align: center;
    padding: 3rem 2rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-top: 2rem;

      .stat {
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  }

  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }

    p {
      font-size: 1.1rem;
      color: #7f8c8d;
    }
  }

  .technique-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .technique-card {
      border-radius: 12px;
      overflow: hidden;
      color: white;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        padding: 1.5rem 1.5rem 1rem;

        .tech-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.4rem;
          margin: 0;
          font-weight: 600;
        }
      }

      .card-body {
        padding: 0 1.5rem 1.5rem;
        background: rgba(0, 0, 0, 0.2);

        p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }

        .config-example {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          overflow-x: auto;

          pre {
            margin: 0;
            font-size: 0.8rem;
            line-height: 1.4;

            code {
              font-family: 'Fira Code', 'Source Code Pro', monospace;
              color: #e0e0e0;
            }
          }
        }

        .benefit-tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
      }
    }
  }

  .comparison-charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;

    .chart {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        text-align: center;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
      }

      .bar-chart {
        display: flex;
        height: 250px;
        align-items: flex-end;
        gap: 1.5rem;
        justify-content: center;

        .bar {
          width: 80px;
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 1s ease;

          .bar-label {
            position: absolute;
            bottom: -40px;
            left: 0;
            width: 100%;
            text-align: center;
            font-weight: 600;
          }
        }

        .unoptimized {
          background: linear-gradient(to top, #e74c3c, #ff6b6b);
        }

        .optimized {
          background: linear-gradient(to top, #2ecc71, #1abc9c);
        }
      }
    }
  }

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .step {
      display: flex;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .step-number {
        min-width: 60px;
        background: linear-gradient(135deg, #3498db, #8e44ad);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 700;
      }

      .step-content {
        padding: 1.5rem;

        h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #7f8c8d;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .step-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          span {
            background: #e0f7fa;
            color: #00838f;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  .practices-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .practice-item {
      display: flex;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .practice-icon {
        font-size: 1.5rem;
        min-width: 50px;
        height: 50px;
        background: #f0f7ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.2rem;
        font-weight: 700;
      }

      .practice-content {
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        p {
          color: #7f8c8d;
          font-size: 0.95rem;
          margin: 0;
        }
      }
    }
  }

  .footer-note {
    text-align: center;
    padding: 2rem;
    margin-top: 2rem;
    color: #7f8c8d;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .resources {
      display: flex;
      justify-content: center;
      gap: 2rem;

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #e74c3c;
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .performance-optimization {
    padding: 10px;

    .hero-banner {
      padding: 2rem 1rem;

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.1rem;
      }

      .stats-bar {
        gap: 1.5rem;
        flex-wrap: wrap;

        .stat {
          min-width: 120px;
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section-header {
      h2 {
        font-size: 1.6rem;
      }
    }

    .technique-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>