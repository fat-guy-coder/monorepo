<template>
  <div class="webpack-container">
    <header class="header">
      <h1>Webpack 高频问题指南</h1>
      <p class="subtitle">面试必备 + 生产实践解决方案</p>
    </header>

    <div class="content-wrapper">
      <!-- 基础概念部分 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">📚</span> Webpack 核心概念
          </h2>
          <p class="section-description">理解这些是解决复杂问题的基础</p>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔧</div>
            <h3>Loader 与 Plugin 区别</h3>
            <div class="comparison">
              <div class="comparison-item">
                <h4>Loader</h4>
                <ul>
                  <li>文件加载器（转换器）</li>
                  <li>处理单个文件</li>
                  <li>在 module.rules 中配置</li>
                  <li>如：babel-loader, css-loader</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>Plugin</h4>
                <ul>
                  <li>插件（扩展器）</li>
                  <li>作用于整个构建过程</li>
                  <li>在 plugins 数组中配置</li>
                  <li>如：HtmlWebpackPlugin, CleanWebpackPlugin</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>构建流程</h3>
            <ol class="build-process">
              <li>初始化参数：合并配置</li>
              <li>开始编译：创建 Compiler 对象</li>
              <li>确定入口：从 entry 开始</li>
              <li>编译模块：调用 loader 处理</li>
              <li>完成编译：得到模块依赖图</li>
              <li>输出资源：根据依赖生成 chunks</li>
              <li>写入文件系统：emit 阶段</li>
            </ol>
          </div>

          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h3>模块热替换原理</h3>
            <div class="hmr-flow">
              <div class="step">1. 建立 WebSocket 连接</div>
              <div class="step">2. 文件修改触发编译</div>
              <div class="step">3. Webpack 发送更新消息</div>
              <div class="step">4. 客户端接收更新通知</div>
              <div class="step">5. 通过 JSONP 获取新模块</div>
              <div class="step">6. 替换旧模块并执行回调</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 面试高频问题 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">💼</span> 面试高频问题
          </h2>
          <p class="section-description">求职面试中常被问到的 Webpack 问题</p>
        </div>

        <div class="problem-grid">
          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag">高频</span>
              <h3>如何优化 Webpack 构建速度？</h3>
            </div>
            <div class="solution">
              <h4>解决方案：</h4>
              <ul>
                <li>使用 <code>speed-measure-webpack-plugin</code> 分析构建耗时</li>
                <li>开启缓存：<code>cache-loader</code> 或 <code>hard-source-webpack-plugin</code></li>
                <li>多线程/并行构建：<code>thread-loader</code></li>
                <li>合理配置 <code>resolve.extensions</code> 和 <code>resolve.modules</code></li>
                <li>使用 <code>DllPlugin</code> 预编译不常变化的模块</li>
                <li>缩小文件搜索范围：设置 <code>exclude</code>/<code>include</code></li>
              </ul>
              <div class="code-block">
                <pre><code>// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'thread-loader', // 多线程
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 启用缓存
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin() // 模块缓存
  ]
};</code></pre>
              </div>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag">高频</span>
              <h3>如何优化打包体积？</h3>
            </div>
            <div class="solution">
              <h4>解决方案：</h4>
              <ul>
                <li>使用 <code>webpack-bundle-analyzer</code> 分析包体积</li>
                <li>代码分割：<code>SplitChunksPlugin</code></li>
                <li>Tree Shaking：ES6 模块 + <code>sideEffects: false</code></li>
                <li>按需加载：动态 <code>import()</code></li>
                <li>压缩代码：<code>TerserWebpackPlugin</code></li>
                <li>压缩图片：<code>image-webpack-loader</code></li>
                <li>使用 CDN 加载第三方库</li>
              </ul>
              <div class="code-block">
                <pre><code>// 按需加载示例
const Login = () => import('./views/Login.vue');

// webpack 配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true, // 并行压缩
        extractComments: false // 移除注释
      })
    ]
  }
};</code></pre>
              </div>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag">高频</span>
              <h3>Loader 和 Plugin 的执行顺序？</h3>
            </div>
            <div class="solution">
              <h4>执行顺序规则：</h4>
              <ol>
                <li>配置文件中 <code>plugins</code> 数组按顺序执行</li>
                <li>每个文件按 <code>rules</code> 中 loader 从右到左执行（从下到上）</li>
                <li>Pitching loader 从左到右执行</li>
                <li>Normal loader 从右到左执行</li>
              </ol>
              <div class="diagram">
                <div class="loader-flow">
                  <div class="flow-step">pitch-loader1</div>
                  <div class="arrow">→</div>
                  <div class="flow-step">pitch-loader2</div>
                  <div class="arrow">→</div>
                  <div class="flow-step">文件资源</div>
                  <div class="arrow">→</div>
                  <div class="flow-step">normal-loader2</div>
                  <div class="arrow">→</div>
                  <div class="flow-step">normal-loader1</div>
                </div>
              </div>
              <div class="code-block">
                <pre><code>// loader 执行顺序示例
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader',  // 最后执行
        'css-loader',    // 其次执行
        'sass-loader'   // 最先执行
      ]
    }
  ]
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生产环境问题 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🏭</span> 生产环境问题
          </h2>
          <p class="section-description">实际开发中遇到的棘手问题及解决方案</p>
        </div>

        <div class="problem-grid">
          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag warning">生产</span>
              <h3>如何解决长缓存问题？</h3>
            </div>
            <div class="solution">
              <h4>问题描述：</h4>
              <p>用户浏览器缓存导致更新后无法获取最新代码</p>

              <h4>解决方案：</h4>
              <ul>
                <li>文件名添加 contenthash：<code>filename: '[name].[contenthash:8].js'</code></li>
                <li>提取 runtime 到单独文件</li>
                <li>模块 ID 使用 <code>hashed</code> 替代数字 ID</li>
                <li>确保依赖模块的 <code>package.json</code> 版本固定</li>
              </ul>
              <div class="code-block">
                <pre><code>// webpack.config.js
output: {
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].chunk.js'
},

optimization: {
  runtimeChunk: 'single', // 提取 runtime
  moduleIds: 'deterministic', // 模块ID稳定
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag warning">生产</span>
              <h3>如何调试 Source Map？</h3>
            </div>
            <div class="solution">
              <h4>问题描述：</h4>
              <p>生产环境错误难以定位到源代码位置</p>

              <h4>解决方案：</h4>
              <ul>
                <li>开发环境：<code>devtool: 'eval-cheap-module-source-map'</code></li>
                <li>生产环境：<code>devtool: 'hidden-source-map'</code></li>
                <li>上传 Source Map 到错误监控平台</li>
                <li>使用 <code>source-map-loader</code> 处理第三方库</li>
                <li>避免在生产环境暴露完整 Source Map</li>
              </ul>
              <div class="code-block">
                <pre><code>// 推荐配置
module.exports = {
  devtool: process.env.NODE_ENV === 'production'
    ? 'hidden-source-map'  // 生产环境
    : 'eval-cheap-module-source-map', // 开发环境

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre', // 优先执行
        use: ['source-map-loader'] // 加载现有 Source Map
      }
    ]
  }
};</code></pre>
              </div>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag warning">生产</span>
              <h3>如何处理 CSS 兼容性问题？</h3>
            </div>
            <div class="solution">
              <h4>问题描述：</h4>
              <p>不同浏览器对 CSS 特性支持不一致</p>

              <h4>解决方案：</h4>
              <ul>
                <li>使用 <code>postcss-loader</code> + <code>autoprefixer</code></li>
                <li>添加 <code>browserslist</code> 配置</li>
                <li>使用 <code>cssnano</code> 压缩 CSS</li>
                <li>使用 <code>@babel/preset-env</code> 处理 JS 兼容性</li>
              </ul>
              <div class="code-block">
                <pre><code>// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 8',
        'Android >= 4'
      ]
    }),
    require('cssnano') // 压缩CSS
  ]
};

// webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader' // 处理兼容性
      ]
    }
  ]
}</code></pre>
              </div>
            </div>
          </div>

          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-tag warning">生产</span>
              <h3>如何优化首屏加载速度？</h3>
            </div>
            <div class="solution">
              <h4>解决方案：</h4>
              <ul>
                <li>代码分割 + 按需加载</li>
                <li>预加载关键资源：<code>&lt;link rel="preload"&gt;</code></li>
                <li>使用骨架屏（Skeleton Screen）</li>
                <li>服务端渲染（SSR）或静态站点生成（SSG）</li>
                <li>开启 HTTP/2 和 Gzip 压缩</li>
                <li>使用 CDN 加速资源加载</li>
              </ul>
              <div class="code-block">
                <pre><code>// 预加载关键资源示例
import(/* webpackPreload: true */ 'CriticalModule');

// 按需加载非关键模块
const NonCriticalModule = () => import('./NonCriticalModule');

// 路由懒加载（Vue）
const routes = [
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ './Dashboard.vue')
  }
];</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级技巧 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🚀</span> 高级技巧与优化
          </h2>
          <p class="section-description">提升 Webpack 配置的专业技巧</p>
        </div>

        <div class="tips-grid">
          <div class="tip-card">
            <h3>自定义 Loader</h3>
            <p>创建简单的 markdown 加载器</p>
            <div class="code-block">
              <pre><code>// markdown-loader.js
const marked = require('marked');

module.exports = function(source) {
  const html = marked(source);

  // 返回 JS 模块
  return `module.exports = ${JSON.stringify(html)}`;
};

// webpack.config.js
module: {
  rules: [
    {
      test: /\.md$/,
      use: 'markdown-loader'
    }
  ]
}</code></pre>
            </div>
          </div>

          <div class="tip-card">
            <h3>自定义 Plugin</h3>
            <p>创建构建完成通知插件</p>
            <div class="code-block">
              <pre><code>class BuildNotifyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildNotify', stats => {
      if (stats.hasErrors()) {
        console.error('❌ 构建失败！');
        // 发送错误通知...
      } else {
        console.log('✅ 构建成功！');
        // 发送成功通知...
      }
    });
  }
}

// webpack.config.js
plugins: [
  new BuildNotifyPlugin()
]</code></pre>
            </div>
          </div>

          <div class="tip-card">
            <h3>多环境配置</h3>
            <p>使用 webpack-merge 管理配置</p>
            <div class="code-block">
              <pre><code>// webpack.common.js
module.exports = {
  entry: './src/index.js',
  // 公共配置...
};

// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 开发环境特有配置...
});

// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // 生产环境特有配置...
});</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>Webpack 最佳实践：</h3>
        <ul>
          <li>使用最新 Webpack 版本（v5+）以获得最佳性能和特性</li>
          <li>定期更新依赖（loader/plugin）以修复安全问题</li>
          <li>使用 <code>webpack-cli</code> 和 <code>webpack-dev-server</code> 提高开发效率</li>
          <li>配置持续集成（CI）环境缓存 node_modules 和构建缓存</li>
          <li>监控生产环境的资源加载性能</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="https://webpack.js.org/" target="_blank">Webpack 官方文档</a>
        <a href="https://github.com/webpack-contrib/awesome-webpack" target="_blank">Awesome Webpack</a>
        <a href="https://webpack.academy/" target="_blank">Webpack Academy</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.webpack-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 50px 20px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray-light);
}

.section-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--secondary-color);

  .icon {
    font-size: 1.5em;
  }
}

.section-description {
  font-size: 1.1rem;
  color: var(--gray-medium);
  margin-top: 5px;
}

// 核心概念部分
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-color);
  }

  .concept-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 20px;
    color: var(--secondary-color);
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  .comparison-item {
    background: var(--light-color);
    border-radius: var(--border-radius);
    padding: 15px;

    h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--primary-color);
      text-align: center;
    }
  }
}

.build-process {
  padding-left: 20px;

  li {
    margin-bottom: 12px;
    position: relative;
    padding-left: 25px;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
  }
}

.hmr-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .step {
    background: var(--light-color);
    border-radius: var(--border-radius);
    padding: 12px;
    text-align: center;
    font-size: 0.9rem;
  }
}

// 问题卡片
.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.problem-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.problem-header {
  padding: 20px;
  background: var(--primary-light);
  border-bottom: 1px solid var(--gray-light);
  display: flex;
  align-items: center;
  gap: 15px;

  h3 {
    font-size: 1.4rem;
    margin: 0;
    color: var(--secondary-color);
  }
}

.problem-tag {
  padding: 5px 12px;
  border-radius: 30px;
  background: var(--primary-color);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;

  &.warning {
    background: var(--warning-color);
  }
}

.solution {
  padding: 20px;

  h4 {
    font-size: 1.1rem;
    margin: 15px 0 10px;
    color: var(--primary-color);
  }

  ul,
  ol {
    padding-left: 25px;
    margin-bottom: 15px;

    li {
      margin-bottom: 8px;
    }
  }
}

.code-block {
  background: #f5f7ff;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 15px 0;
  border: 1px solid var(--gray-light);

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
      color: var(--secondary-color);
      line-height: 1.5;
    }
  }
}

.diagram {
  background: var(--light-color);
  border-radius: var(--border-radius);
  padding: 15px;
  margin: 15px 0;
}

.loader-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .flow-step {
    background: white;
    border: 1px solid var(--gray-light);
    border-radius: var(--border-radius);
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  .arrow {
    color: var(--primary-color);
    font-weight: bold;
  }
}

// 高级技巧部分
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.tip-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  padding: 20px;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
    text-align: center;
  }

  p {
    text-align: center;
    margin-bottom: 15px;
    color: #495057;
  }
}

// 页脚
.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);

  .summary {
    background: var(--primary-light);
    border-radius: var(--border-radius);
    padding: 25px;
    margin-bottom: 25px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        font-weight: 500;

        code {
          background: rgba(67, 97, 238, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: var(--primary-color);
        }
      }
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 8px 15px;
      border-radius: 30px;
      border: 1px solid var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
        text-decoration: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .hmr-flow {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
