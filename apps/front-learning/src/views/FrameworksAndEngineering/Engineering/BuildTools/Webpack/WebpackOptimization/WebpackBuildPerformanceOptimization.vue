<template>
  <div class="build-optimization">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Webpack 构建性能优化</h1>
        <p>加速开发流程，提升构建效率的基本指南</p>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">60-80%</div>
            <div class="stat-label">构建时间减少</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">50-70%</div>
            <div class="stat-label">内存占用降低</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">90%+</div>
            <div class="stat-label">开发者使用率</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="speed-gauge">
          <div class="gauge-before">慢速构建</div>
          <div class="gauge-needle" :style="needleStyle"></div>
          <div class="gauge-after">快速构建</div>
          <div class="gauge-labels">
            <span>10s+</span>
            <span>5s</span>
            <span>1s</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="optimization-section">
        <h2 class="section-title">核心构建优化技术</h2>
        <p class="section-subtitle">应用这些技术可显著提升Webpack构建速度</p>

        <div class="techniques-grid">
          <div
            v-for="(tech, index) in techniques"
            :key="index"
            class="tech-card"
            :style="cardStyle(index)"
          >
            <div class="card-header">
              <div class="tech-icon">{{ tech.icon }}</div>
              <h3>{{ tech.title }}</h3>
              <div class="speed-impact">速度提升: {{ tech.impact }}</div>
            </div>
            <div class="card-body">
              <p>{{ tech.description }}</p>
              <div class="config-example">
                <pre><code class="language-javascript">{{ tech.config }}</code></pre>
              </div>
              <div class="card-footer">
                <div class="use-case"><strong>适用场景:</strong> {{ tech.useCase }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-section">
        <h2 class="section-title">优化前后对比</h2>
        <div class="comparison-content">
          <div class="comparison-chart">
            <div class="chart-title">构建时间对比 (秒)</div>
            <div class="chart-bars">
              <div class="bar unoptimized" :style="{ height: '100%' }">
                <div class="bar-label">优化前: 12.4s</div>
              </div>
              <div class="bar optimized" :style="{ height: '30%' }">
                <div class="bar-label">优化后: 3.7s</div>
              </div>
            </div>
          </div>

          <div class="comparison-stats">
            <div class="stat">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <div class="stat-value">69%</div>
                <div class="stat-label">构建时间减少</div>
              </div>
            </div>
            <div class="stat">
              <div class="stat-icon">💾</div>
              <div class="stat-info">
                <div class="stat-value">58%</div>
                <div class="stat-label">内存占用降低</div>
              </div>
            </div>
            <div class="stat">
              <div class="stat-icon">🚀</div>
              <div class="stat-info">
                <div class="stat-value">3.3x</div>
                <div class="stat-label">开发效率提升</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow-section">
        <h2 class="section-title">优化工作流程</h2>
        <div class="workflow-steps">
          <div v-for="(step, index) in workflow" :key="index" class="workflow-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-tools">
                <span v-for="(tool, toolIndex) in step.tools" :key="toolIndex">{{ tool }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2 class="section-title">高级优化策略</h2>
        <div class="advanced-techniques">
          <div class="advanced-card">
            <div class="advanced-icon">🔧</div>
            <div class="advanced-content">
              <h3>模块联邦 (Module Federation)</h3>
              <p>将应用拆分为多个独立构建的模块，实现跨应用的代码共享</p>
              <pre><code class="language-javascript">// webpack.config.js
new ModuleFederationPlugin({
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
});</code></pre>
            </div>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">⚡</div>
            <div class="advanced-content">
              <h3>使用 SWC 或 esbuild</h3>
              <p>用 Rust/Go 编写的超快工具替代 JavaScript 实现的转译器</p>
              <pre><code class="language-javascript">// 使用 esbuild-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015'
        }
      }
    ]
  }
};</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践总结</h2>
        <div class="practices-grid">
          <div v-for="(practice, index) in practices" :key="index" class="practice-card">
            <div class="practice-header">
              <div class="practice-icon">{{ practice.icon }}</div>
              <h3>{{ practice.title }}</h3>
            </div>
            <div class="practice-body">
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-content">
        <p>通过实施这些优化策略，您可以将Webpack构建性能提升至全新水平</p>
        <div class="resources">
          <a href="#">Webpack性能优化文档</a>
          <a href="#">构建分析工具</a>
          <a href="#">高级配置示例</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 构建优化技术数据
const techniques = ref([
  {
    icon: '💾',
    title: '持久化缓存',
    description: '使用文件系统缓存，避免重复处理未修改的模块',
    impact: '40-60%',
    config: `// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  },
};`,
    useCase: '大型项目，频繁构建',
  },
  {
    icon: '🧵',
    title: '多线程处理',
    description: '使用thread-loader将耗时的loader放在worker池中运行',
    impact: '30-50%',
    config: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
              workerParallelJobs: 50,
              poolTimeout: 2000,
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
};`,
    useCase: 'CPU密集型任务（如Babel）',
  },
  {
    icon: '🎯',
    title: '缩小处理范围',
    description: '使用include/exclude精确控制loader的处理范围',
    impact: '20-40%',
    config: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
    ],
  },
};`,
    useCase: '所有项目，特别是依赖node_modules的项目',
  },
  {
    icon: '🧩',
    title: 'DLL 预编译',
    description: '将不常变化的库预先编译为单独文件',
    impact: '50-70%',
    config: `// webpack.dll.config.js
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json'),
    }),
  ],
};

// 主配置
new webpack.DllReferencePlugin({
  manifest: require('./vendor-manifest.json'),
});`,
    useCase: '大型项目，依赖大量第三方库',
  },
  {
    icon: '🔍',
    title: '优化解析配置',
    description: '减少模块解析的搜索范围',
    impact: '10-30%',
    config: `// webpack.config.js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};`,
    useCase: '所有项目，特别是模块众多的项目',
  },
  {
    icon: '🚫',
    title: '避免生产优化',
    description: '在开发环境禁用不必要的优化',
    impact: '20-40%',
    config: `// webpack.config.js
module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
  },
};`,
    useCase: '开发环境构建',
  },
])

// 工作流程
const workflow = ref([
  {
    title: '性能分析',
    description: '使用speed-measure-webpack-plugin分析构建时间',
    tools: ['speed-measure-webpack-plugin', 'webpack-stats-analyzer'],
  },
  {
    title: '应用缓存',
    description: '配置持久化文件系统缓存',
    tools: ['cache: filesystem'],
  },
  {
    title: '多线程处理',
    description: '为耗时loader添加thread-loader',
    tools: ['thread-loader', 'HappyPack'],
  },
  {
    title: '范围优化',
    description: '精确设置loader的include/exclude',
    tools: ['include/exclude'],
  },
  {
    title: '解析优化',
    description: '配置resolve选项减少搜索范围',
    tools: ['resolve.modules', 'resolve.extensions'],
  },
  {
    title: '生产优化',
    description: '开发环境禁用生产优化',
    tools: ['optimization配置'],
  },
])

// 最佳实践
const practices = ref([
  {
    icon: '1️⃣',
    title: '渐进式优化',
    description: '一次应用一个优化，测量效果后再继续',
  },
  {
    icon: '2️⃣',
    title: '监控构建指标',
    description: '持续监控构建时间和资源大小',
  },
  {
    icon: '3️⃣',
    title: '更新依赖',
    description: '保持Webpack和loader的最新版本',
  },
  {
    icon: '4️⃣',
    title: '精简Source Map',
    description: '开发环境使用轻量级source map',
  },
  {
    icon: '5️⃣',
    title: '减少构建步骤',
    description: '移除不必要的构建步骤和插件',
  },
  {
    icon: '6️⃣',
    title: '按需加载',
    description: '使用动态导入拆分代码',
  },
])

// 卡片背景样式
const cardStyle = (index: number) => {
  const colors = [
    'linear-gradient(135deg, #43cea2, #185a9d)',
    'linear-gradient(135deg, #ff7e5f, #feb47b)',
    'linear-gradient(135deg, #654ea3, #da98b4)',
    'linear-gradient(135deg, #3a7bd5, #00d2ff)',
    'linear-gradient(135deg, #ff416c, #ff4b2b)',
    'linear-gradient(135deg, #7f00ff, #e100ff)',
  ]
  return {
    background: colors[index % colors.length],
  }
}

// 速度表针样式
const needleStyle = computed(() => {
  return {
    transform: `rotate(${-45 + 135 * 0.7}deg)`, // 70% 优化程度
  }
})
</script>

<style lang="less" scoped>


.build-optimization {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: #f8f9fa;
  line-height: 1.6;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #3498db, #8e44ad);
    border-radius: 16px;
    padding: 2.5rem;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    .hero-content {
      flex: 1;
      min-width: 300px;

      h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }

      .stats {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;

        .stat-item {
          .stat-value {
            font-size: 2.2rem;
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

    .hero-visual {
      flex: 1;
      min-width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .speed-gauge {
        position: relative;
        width: 280px;
        height: 140px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 140px 140px 0 0;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: linear-gradient(90deg, #e74c3c 0%, #f1c40f 50%, #2ecc71 100%);
        }

        .gauge-before,
        .gauge-after {
          position: absolute;
          bottom: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .gauge-before {
          left: 20px;
        }

        .gauge-after {
          right: 20px;
        }

        .gauge-labels {
          position: absolute;
          bottom: 45px;
          width: 100%;
          display: flex;
          justify-content: space-around;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .gauge-needle {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 4px;
          height: 120px;
          background: white;
          transform-origin: bottom center;
          border-radius: 4px 4px 0 0;
          transition: transform 1s ease;
          z-index: 10;
        }
      }
    }
  }

  .content-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .techniques-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .tech-card {
      border-radius: 12px;
      overflow: hidden;
      color: white;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        padding: 1.5rem 1.5rem 1rem;
        position: relative;

        .tech-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.4rem;
          margin: 0;
          font-weight: 600;
        }

        .speed-impact {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
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

        .card-footer {
          .use-case {
            font-size: 0.85rem;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.6rem;
            border-radius: 6px;
          }
        }
      }
    }
  }

  .comparison-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;

    .comparison-chart {
      flex: 1;
      min-width: 300px;
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1.5rem;

      .chart-title {
        text-align: center;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #2c3e50;
      }

      .chart-bars {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 200px;
        gap: 3rem;
        padding: 0 2rem;

        .bar {
          width: 80px;
          border-radius: 8px 8px 0 0;
          position: relative;

          .bar-label {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 0.9rem;
          }
        }

        .unoptimized {
          background: linear-gradient(to top, #e74c3c, #ff6b6b);
          height: 100%;
        }

        .optimized {
          background: linear-gradient(to top, #2ecc71, #1abc9c);
        }
      }
    }

    .comparison-stats {
      flex: 1;
      min-width: 300px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      .stat {
        display: flex;
        align-items: center;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .stat-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }

        .stat-info {
          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #3498db;
          }

          .stat-label {
            font-size: 0.95rem;
            color: #7f8c8d;
          }
        }
      }
    }
  }

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .workflow-step {
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

  .advanced-techniques {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .advanced-card {
      display: flex;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .advanced-icon {
        min-width: 70px;
        background: linear-gradient(135deg, #3498db, #8e44ad);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
      }

      .advanced-content {
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

        pre {
          background: #2d2d2d;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;

          code {
            font-family: 'Fira Code', monospace;
            color: #f8f8f2;
          }
        }
      }
    }
  }

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .practice-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      .practice-header {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-bottom: 1px solid #eee;

        .practice-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          min-width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #2c3e50;
        }
      }

      .practice-body {
        padding: 1.5rem;

        p {
          color: #7f8c8d;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;

    .footer-content {
      max-width: 800px;
      margin: 0 auto;

      p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
      }

      .resources {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;

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
}

@media (max-width: 768px) {
  .build-optimization {
    padding: 10px;

    .hero-section {
      padding: 1.5rem;

      .hero-content {
        h1 {
          font-size: 2rem;
        }

        p {
          font-size: 1.1rem;
        }

        .stats {
          flex-wrap: wrap;
          gap: 1rem;

          .stat-item {
            min-width: 120px;
          }
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.6rem;
    }
  }
}
</style>
