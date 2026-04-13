<template>
  <div class="code-splitting-container">
    <div class="hero-banner">
      <div class="banner-content">
        <h1 class="main-title">
          <span class="icon">📦</span> Webpack 代码分割基础介绍
        </h1>
        <p class="subtitle">优化前端性能的关键技术：SplitChunks、Entry配置与动态import</p>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 介绍部分 -->
      <div class="intro-section">
        <div class="intro-card">
          <div class="card-icon">🚀</div>
          <h2>为什么要进行代码分割？</h2>
          <p>
            代码分割是现代前端优化的核心技术，它允许将代码拆分为多个小块(chunks)，实现：
          </p>
          <ul>
            <li>更快的初始加载时间</li>
            <li>更高效的缓存策略</li>
            <li>按需加载资源，减少带宽消耗</li>
            <li>并行加载资源，提升加载速度</li>
          </ul>
          <div class="metrics">
            <div class="metric">
              <div class="metric-value">60%</div>
              <div class="metric-label">初始加载时间减少</div>
            </div>
            <div class="metric">
              <div class="metric-value">40%</div>
              <div class="metric-label">带宽节省</div>
            </div>
            <div class="metric">
              <div class="metric-value">75%</div>
              <div class="metric-label">缓存命中率提升</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 三种分割方式 -->
      <div class="methods-section">
        <h2 class="section-title">
          <span class="icon">🔧</span> Webpack 三种代码分割方式
        </h2>

        <div class="methods-tabs">
          <div v-for="method in methods" :key="method.id"
            :class="['method-tab', { active: activeMethod === method.id }]" @click="activeMethod = method.id">
            <div class="tab-icon">{{ method.icon }}</div>
            <div class="tab-title">{{ method.title }}</div>
          </div>
        </div>

        <div class="method-content">
          <!-- SplitChunks 方式 -->
          <div v-if="activeMethod === 'split'" class="method-details">
            <div class="method-header">
              <h3>SplitChunks 配置方式</h3>
              <div class="tag-group">
                <span class="tag recommended">推荐</span>
                <span class="tag use-case">公共代码提取</span>
              </div>
            </div>

            <div class="method-explanation">
              <p>
                Webpack 4+ 默认的代码分割方式，通过 <code>optimization.splitChunks</code> 配置提取公共模块，
                智能分割代码块，适用于提取第三方库和公共业务代码。
              </p>
            </div>

            <div class="config-section">
              <h4>核心配置参数：</h4>
              <div class="config-table">
                <table>
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>默认值</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>chunks</code></td>
                      <td><code>"async"</code></td>
                      <td>选择分割范围：<code>async</code>(异步加载), <code>initial</code>(同步加载), <code>all</code>(全部)</td>
                    </tr>
                    <tr>
                      <td><code>minSize</code></td>
                      <td><code>20000</code></td>
                      <td>生成chunk的最小大小(字节)</td>
                    </tr>
                    <tr>
                      <td><code>maxSize</code></td>
                      <td><code>0</code></td>
                      <td>尝试将大于此值的chunk拆分</td>
                    </tr>
                    <tr>
                      <td><code>minChunks</code></td>
                      <td><code>1</code></td>
                      <td>被引用最小次数才拆分</td>
                    </tr>
                    <tr>
                      <td><code>cacheGroups</code></td>
                      <td><code>{}</code></td>
                      <td>自定义缓存组配置核心</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>配置示例：</h4>
              <pre class="code-block">// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        // 提取node_modules中的第三方库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        // 提取公共业务代码
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        },
        // 单独提取特定库（如React）
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          chunks: 'all',
          priority: 5
        }
      }
    }
  }
}</pre>

              <div class="pros-cons">
                <div class="pros">
                  <h5>✅ 优点</h5>
                  <ul>
                    <li>自动提取公共代码，减少重复</li>
                    <li>高度可配置，满足复杂需求</li>
                    <li>支持多入口公共代码提取</li>
                    <li>与Webpack深度集成，无需改业务代码</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>⚠️ 缺点</h5>
                  <ul>
                    <li>配置相对复杂</li>
                    <li>需要理解Webpack内部机制</li>
                    <li>过度拆分可能导致请求过多</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Entry 配置方式 -->
          <div v-if="activeMethod === 'entry'" class="method-details">
            <div class="method-header">
              <h3>Entry 入口配置方式</h3>
              <div class="tag-group">
                <span class="tag use-case">多页面应用</span>
                <span class="tag legacy">传统方式</span>
              </div>
            </div>

            <div class="method-explanation">
              <p>
                通过配置多个入口点来手动分割代码，每个入口生成独立的bundle。
                适用于多页面应用(MPA)或需要明确分离代码的场景。
              </p>
            </div>

            <div class="config-section">
              <h4>配置方法：</h4>
              <pre class="code-block">// webpack.config.js
module.exports = {
  // 多入口配置
  entry: {
    main: './src/app.js',
    admin: './src/admin.js',
    vendor: ['react', 'react-dom', 'lodash']
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: {
    // 提取公共依赖到单独文件
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
}</pre>

              <h4>生成文件：</h4>
              <div class="output-files">
                <div class="file">
                  <div class="file-icon">📄</div>
                  <div class="file-name">main.bundle.js</div>
                  <div class="file-desc">主应用代码</div>
                </div>
                <div class="file">
                  <div class="file-icon">📄</div>
                  <div class="file-name">admin.bundle.js</div>
                  <div class="file-desc">后台管理代码</div>
                </div>
                <div class="file">
                  <div class="file-icon">🧩</div>
                  <div class="file-name">vendor.bundle.js</div>
                  <div class="file-desc">第三方库代码</div>
                </div>
                <div class="file">
                  <div class="file-icon">🔗</div>
                  <div class="file-name">commons.bundle.js</div>
                  <div class="file-desc">公共业务代码</div>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>✅ 优点</h5>
                  <ul>
                    <li>控制精确，明确分离代码</li>
                    <li>适合多页面应用结构</li>
                    <li>简单直观，易于理解</li>
                    <li>独立部署不同功能模块</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>⚠️ 缺点</h5>
                  <ul>
                    <li>无法动态按需加载</li>
                    <li>不能自动提取公共模块</li>
                    <li>可能导致冗余代码</li>
                    <li>入口点增加时配置复杂</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 动态 Import 方式 -->
          <div v-if="activeMethod === 'dynamic'" class="method-details">
            <div class="method-header">
              <h3>动态 Import 方式</h3>
              <div class="tag-group">
                <span class="tag recommended">推荐</span>
                <span class="tag use-case">按需加载</span>
                <span class="tag modern">现代方式</span>
              </div>
            </div>

            <div class="method-explanation">
              <p>
                使用ECMAScript动态<code>import()</code>语法实现按需加载，当代码执行到该语句时才会加载对应模块。
                适用于路由级分割、组件级分割等按需加载场景。
              </p>
            </div>

            <div class="config-section">
              <h4>基本语法：</h4>
              <pre class="code-block">// 普通模块动态导入
import('./module')
  .then(module => {
    // 使用加载的模块
    module.doSomething();
  })
  .catch(err => {
    // 处理加载失败
  });

// React 组件懒加载
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    &lt;div&gt;
      &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
        &lt;LazyComponent /&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}
</pre>
              <h4>Webpack 配置：</h4>
              <pre class="code-block">// webpack.config.js
module.exports = {
  // 不需要额外配置，开箱即用
  // 但可以配合splitChunks优化

  // 自定义动态导入的chunk名称
  output: {
    chunkFilename: '[name].[contenthash].chunk.js',
  },

  optimization: {
    splitChunks: {
      // 确保异步chunks也能被优化
      chunks: 'all'
    }
  }
}</pre>

              <h4>使用场景：</h4>
              <div class="use-cases">
                <div class="case">
                  <div class="case-icon">🚩</div>
                  <div class="case-content">
                    <h5>路由级分割</h5>
                    <p>为每个路由生成单独chunk，仅当访问时才加载</p>
                  </div>
                </div>
                <div class="case">
                  <div class="case-icon">🧩</div>
                  <div class="case-content">
                    <h5>组件级分割</h5>
                    <p>对复杂/非关键组件进行懒加载</p>
                  </div>
                </div>
                <div class="case">
                  <div class="case-icon">📦</div>
                  <div class="case-content">
                    <h5>库/模块分割</h5>
                    <p>按需加载大型第三方库（如地图、图表）</p>
                  </div>
                </div>
                <div class="case">
                  <div class="case-icon">🔄</div>
                  <div class="case-content">
                    <h5>条件加载</h5>
                    <p>根据用户操作或条件加载特定功能</p>
                  </div>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>✅ 优点</h5>
                  <ul>
                    <li>显著减少初始加载体积</li>
                    <li>按需加载，提升用户体验</li>
                    <li>代码组织更灵活</li>
                    <li>支持预加载/prefetch优化</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>⚠️ 缺点</h5>
                  <ul>
                    <li>增加额外的网络请求</li>
                    <li>需要处理加载状态和错误</li>
                    <li>过度使用可能导致代码碎片化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 对比总结 -->
      <div class="comparison-section">
        <h2 class="section-title">
          <span class="icon">📊</span> 三种方式对比
        </h2>

        <div class="comparison-grid">
          <div class="comparison-row header">
            <div class="comparison-cell"></div>
            <div class="comparison-cell">SplitChunks</div>
            <div class="comparison-cell">Entry配置</div>
            <div class="comparison-cell">动态Import</div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">定位</div>
            <div class="comparison-cell">公共代码提取</div>
            <div class="comparison-cell">多入口分离</div>
            <div class="comparison-cell">按需加载</div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">配置位置</div>
            <div class="comparison-cell">webpack配置</div>
            <div class="comparison-cell">webpack配置</div>
            <div class="comparison-cell">业务代码</div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">适用场景</div>
            <div class="comparison-cell">提取公共依赖</div>
            <div class="comparison-cell">多页面应用</div>
            <div class="comparison-cell">SPA路由分割</div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">自动化程度</div>
            <div class="comparison-cell">
              <div class="rating high">高</div>
            </div>
            <div class="comparison-cell">
              <div class="rating low">低</div>
            </div>
            <div class="comparison-cell">
              <div class="rating medium">中</div>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">学习曲线</div>
            <div class="comparison-cell">
              <div class="rating high">高</div>
            </div>
            <div class="comparison-cell">
              <div class="rating low">低</div>
            </div>
            <div class="comparison-cell">
              <div class="rating medium">中</div>
            </div>
          </div>

          <div class="comparison-row">
            <div class="comparison-cell">推荐指数</div>
            <div class="comparison-cell">
              <div class="stars">★★★★★</div>
            </div>
            <div class="comparison-cell">
              <div class="stars">★★★☆☆</div>
            </div>
            <div class="comparison-cell">
              <div class="stars">★★★★☆</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="best-practices">
        <h2 class="section-title">
          <span class="icon">🚀</span> 代码分割最佳实践
        </h2>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="card-icon">1</div>
            <h3>组合使用多种方式</h3>
            <p>结合SplitChunks提取公共代码 + 动态Import实现按需加载</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">2</div>
            <h3>合理设置分割粒度</h3>
            <p>避免过细分割导致请求过多，也避免过粗分割失去优化意义</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">3</div>
            <h3>使用一致性哈希命名</h3>
            <pre class="inline-code">[name].[contenthash].js</pre>
            <p>确保文件内容不变时hash不变，最大化利用浏览器缓存</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">4</div>
            <h3>预加载关键资源</h3>
            <pre class="inline-code">import(/* webpackPrefetch: true */ './module')</pre>
            <p>对后续可能需要的资源使用prefetch/preload</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">5</div>
            <h3>监控分析分割效果</h3>
            <p>使用Webpack Bundle Analyzer分析包组成，持续优化</p>
          </div>

          <div class="practice-card">
            <div class="card-icon">6</div>
            <h3>按路由懒加载</h3>
            <p>在React/Vue等框架中，结合路由实现自动代码分割</p>
          </div>
        </div>

        <div class="final-tip">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            最佳分割策略 = SplitChunks配置（提取公共模块） + 动态导入（按需加载） + 合适的缓存策略
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Webpack 代码分割技术 | 优化前端性能的艺术 | </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const methods = [
  { id: 'split', title: 'SplitChunks', icon: '🔧' },
  { id: 'entry', title: 'Entry配置', icon: '📂' },
  { id: 'dynamic', title: '动态Import', icon: '🚀' }
];

const activeMethod = ref('split');
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.code-splitting-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.hero-banner {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

  .banner-content {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
}

.main-title {
  font-size: 2.8rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .icon {
    font-size: 2.6rem;
  }
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  margin: 3rem 0 1.8rem;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #e2e8f0;

  .icon {
    font-size: 1.6rem;
  }
}

.intro-section {
  margin-bottom: 3rem;
}

.intro-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #4f46e5;

  .card-icon {
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #4f46e5;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0 0 1.5rem;
    color: #1e293b;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    margin: 0 0 1.2rem;
    line-height: 1.7;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 2rem;

    li {
      margin-bottom: 0.7rem;
      position: relative;
      padding-left: 1.8rem;

      &::before {
        content: "•";
        color: #4f46e5;
        font-weight: bold;
        font-size: 1.5rem;
        position: absolute;
        left: 0;
        top: -2px;
      }
    }
  }
}

.metrics {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 1.5rem;

  .metric {
    text-align: center;
    width: 120px;

    .metric-value {
      font-size: 2.2rem;
      font-weight: 800;
      color: #4f46e5;
      margin-bottom: 0.3rem;
    }

    .metric-label {
      font-size: 0.95rem;
      color: #64748b;
    }
  }
}

.methods-section {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.methods-tabs {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.method-tab {
  flex: 1;
  max-width: 220px;
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
    box-shadow: 0 6px 12px rgba(79, 70, 229, 0.15);

    .tab-icon {
      background: #4f46e5;
      color: white;
    }
  }

  .tab-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1rem;
    background: #eef2ff;
    color: #4f46e5;
    transition: all 0.3s ease;
  }

  .tab-title {
    font-weight: 600;
    font-size: 1.2rem;
    color: #1e293b;
  }
}

.method-details {
  background: #f8fafc;
  border-radius: 14px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.8rem;

  h3 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e293b;
  }
}

.tag-group {
  display: flex;
  gap: 0.8rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-weight: 600;

  &.recommended {
    background: #e0f2fe;
    color: #0c4a6e;
  }

  &.use-case {
    background: #dbeafe;
    color: #1e40af;
  }

  &.modern {
    background: #ede9fe;
    color: #5b21b6;
  }

  &.legacy {
    background: #fce7f3;
    color: #9d174d;
  }
}

.method-explanation {
  background: #f1f5f9;
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.8rem;

  p {
    margin: 0;
    line-height: 1.7;
    color: #334155;

    code {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: @font-code;
      font-size: 0.9rem;
    }
  }
}

.config-section {
  h4 {
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem;
    color: #1e293b;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #4f46e5;
      border-radius: 50%;
      margin-right: 0.8rem;
    }
  }
}

.config-table {
  overflow-x: auto;
  margin-bottom: 1.5rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

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

.inline-code {
  display: inline-block;
  background: #e0e7ff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: @font-code;
  color: #4f46e5;
  margin: 0.5rem 0;
}

.pros-cons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  >div {
    flex: 1;
    padding: 1.2rem;
    border-radius: 10px;
  }

  .pros {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;

    h5 {
      color: #15803d;
      margin: 0 0 1rem;
    }

    ul li::marker {
      color: #22c55e;
    }
  }

  .cons {
    background: #fff1f2;
    border: 1px solid #fecdd3;

    h5 {
      color: #be123c;
      margin: 0 0 1rem;
    }

    ul li::marker {
      color: #f43f5e;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.7rem;
    }
  }
}

.output-files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;

  .file {
    background: white;
    border-radius: 10px;
    padding: 1.2rem;
    text-align: center;
    border: 1px solid #e2e8f0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.03);

    .file-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .file-name {
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: #1e293b;
    }

    .file-desc {
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;

  .case {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background: white;
    border-radius: 10px;
    padding: 1.2rem;
    border: 1px solid #e2e8f0;

    .case-icon {
      font-size: 1.8rem;
      color: #4f46e5;
    }

    h5 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: #64748b;
    }
  }
}

.comparison-section {
  margin-bottom: 3rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.comparison-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  &.header {
    background: #4f46e5;
    color: white;
    font-weight: 600;
  }
}

.comparison-cell {
  padding: 1.2rem;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  display: flex;
  align-items: center;

  .comparison-row:last-child & {
    border-bottom: none;
  }

  &:last-child {
    border-right: none;
  }

  .header & {
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-right: none;
    }
  }
}

.rating {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;

  &.high {
    background: #dcfce7;
    color: #166534;
  }

  &.medium {
    background: #fef9c3;
    color: #854d0e;
  }

  &.low {
    background: #fee2e2;
    color: #b91c1c;
  }
}

.stars {
  color: #fbbf24;
  font-size: 1.2rem;
  letter-spacing: -1px;
}

.best-practices {
  margin-bottom: 3rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
}

.practice-card {
  background: white;
  border-radius: 14px;
  padding: 1.8rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(79, 70, 229, 0.1);
  }

  .card-icon {
    width: 40px;
    height: 40px;
    background: #e0e7ff;
    color: #4f46e5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0 0 1rem;
    color: #1e293b;
  }

  p {
    margin: 0;
    color: #64748b;
    line-height: 1.7;
  }
}

.final-tip {
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  color: white;
  border-radius: 12px;
  padding: 1.8rem;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .tip-icon {
    font-size: 2.5rem;
  }

  .tip-content {
    font-size: 1.3rem;
    font-weight: 500;
  }
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .methods-tabs {
    flex-direction: column;
    align-items: center;
  }

  .method-tab {
    max-width: 100%;
    width: 100%;
  }

  .pros-cons {
    flex-direction: column;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
    overflow-x: auto;
  }

  .comparison-row {
    grid-template-columns: repeat(4, 200px);
  }

  .main-title {
    font-size: 2.2rem;
  }

  .metrics {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .intro-card {
    padding: 1.5rem;
  }

  .method-details {
    padding: 1.2rem;
  }
}
</style>
