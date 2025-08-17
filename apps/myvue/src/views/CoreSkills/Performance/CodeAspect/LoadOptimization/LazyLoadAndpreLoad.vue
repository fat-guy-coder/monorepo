<template>
  <div class="loading-optimization-container">
    <header class="header">
      <h1>资源加载优化：预加载与懒加载</h1>
      <p class="subtitle">提升网页性能的关键技术</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <div class="comparison-cards">
          <div class="loading-card lazy">
            <div class="card-header">
              <div class="icon">🦥</div>
              <h2>懒加载 (Lazy Loading)</h2>
            </div>
            <div class="card-content">
              <p>延迟加载非关键资源，直到需要时再加载</p>
              <div class="loading-bar">
                <div class="progress" style="width: 30%"></div>
              </div>
              <div class="stats">
                <div class="stat">
                  <span class="value">30%</span>
                  <span class="label">初始加载量</span>
                </div>
                <div class="stat">
                  <span class="value">按需</span>
                  <span class="label">加载时机</span>
                </div>
              </div>
            </div>
          </div>

          <div class="vs">VS</div>

          <div class="loading-card preload">
            <div class="card-header">
              <div class="icon">⚡</div>
              <h2>预加载 (Preloading)</h2>
            </div>
            <div class="card-content">
              <p>提前加载后续页面所需的关键资源</p>
              <div class="loading-bar">
                <div class="progress" style="width: 100%"></div>
              </div>
              <div class="stats">
                <div class="stat">
                  <span class="value">100%</span>
                  <span class="label">初始加载量</span>
                </div>
                <div class="stat">
                  <span class="value">提前</span>
                  <span class="label">加载时机</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="lazy-loading">
          <h2><span class="icon">🦥</span> 懒加载介绍</h2>
          <div class="card">
            <h3>实现原理</h3>
            <p>懒加载的核心思想是延迟加载非关键资源，直到用户需要它们时再加载。</p>

            <div class="implementation">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>占位内容</h4>
                  <p>初始加载时使用占位内容（如图片占位符、骨架屏）</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>监听视口</h4>
                  <p>使用IntersectionObserver API监听元素是否进入视口</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>动态加载</h4>
                  <p>当元素进入视口时，动态加载实际资源</p>
                </div>
              </div>
            </div>

            <div class="code-block">
              <pre><code>// 图片懒加载示例
const lazyImages = document.querySelectorAll('img.lazy');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  observer.observe(img);
});</code></pre>
            </div>

            <h3>使用场景</h3>
            <div class="scenarios">
              <div class="scenario">
                <div class="icon">🖼️</div>
                <div class="content">
                  <h4>长页面图片</h4>
                  <p>只加载用户可见区域的图片</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">📜</div>
                <div class="content">
                  <h4>无限滚动内容</h4>
                  <p>加载用户即将浏览的内容</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">📦</div>
                <div class="content">
                  <h4>大型组件库</h4>
                  <p>按需加载UI组件</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">📄</div>
                <div class="content">
                  <h4>多页签内容</h4>
                  <p>只在激活时加载内容</p>
                </div>
              </div>
            </div>

            <h3>优缺点</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>减少初始加载时间</li>
                  <li>降低带宽消耗</li>
                  <li>提升首屏性能</li>
                  <li>节省用户流量（移动端）</li>
                </ul>
              </div>

              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>滚动时可能产生内容闪烁</li>
                  <li>需要额外JS实现</li>
                  <li>SEO可能受影响（需正确处理）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="preloading">
          <h2><span class="icon">⚡</span> 预加载介绍</h2>
          <div class="card">
            <h3>实现原理</h3>
            <p>预加载的核心是提前获取后续页面所需的关键资源。</p>

            <div class="preload-types">
              <div class="type">
                <div class="type-header">
                  <h4>Resource Hints</h4>
                  <span class="tag">HTML</span>
                </div>
                <div class="code-block">
                  <pre><code>&lt;!-- DNS预解析 --&gt;
&lt;link rel="dns-prefetch" href="//example.com"&gt;

&lt;!-- 预连接 --&gt;
&lt;link rel="preconnect" href="//api.example.com"&gt;

&lt;!-- 预加载 --&gt;
&lt;link rel="preload" href="critical.js" as="script"&gt;

&lt;!-- 预获取 --&gt;
&lt;link rel="prefetch" href="next-page-data.json" as="fetch"&gt;</code></pre>
                </div>
              </div>

              <div class="type">
                <div class="type-header">
                  <h4>HTTP头部</h4>
                  <span class="tag">Server</span>
                </div>
                <div class="code-block">
                  <pre><code>Link: &lt;/critical.css&gt;; rel=preload; as=style
Link: &lt;/next-page.js&gt;; rel=prefetch; as=script</code></pre>
                </div>
              </div>
            </div>

            <h3>预加载JS执行时机</h3>
            <div class="execution-timing">
              <div class="timeline">
                <div class="event">
                  <div class="time">0ms</div>
                  <div class="description">页面开始加载</div>
                </div>
                <div class="event">
                  <div class="time">100ms</div>
                  <div class="description">预加载JS完成下载</div>
                </div>
                <div class="event">
                  <div class="time">200ms</div>
                  <div class="description">主JS执行</div>
                </div>
                <div class="event highlight">
                  <div class="time">300ms</div>
                  <div class="description">预加载JS执行*</div>
                </div>
              </div>
              <div class="note">
                <p>* 预加载的资源仅提前下载，执行时机由浏览器控制：</p>
                <ul>
                  <li>脚本按文档顺序执行</li>
                  <li>默认不会提前执行</li>
                  <li>可通过<code>async</code>或<code>defer</code>控制</li>
                </ul>
              </div>
            </div>

            <h3>prefetch vs preconnect</h3>
            <div class="comparison">
              <div class="comparison-row">
                <div class="comparison-header"></div>
                <div class="comparison-header">prefetch</div>
                <div class="comparison-header">preconnect</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-cell">目的</div>
                <div class="comparison-cell">获取特定资源</div>
                <div class="comparison-cell">建立连接通道</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-cell">使用场景</div>
                <div class="comparison-cell">下页面的关键资源</div>
                <div class="comparison-cell">跨域API调用</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-cell">资源类型</div>
                <div class="comparison-cell">JS/CSS/字体/图像</div>
                <div class="comparison-cell">DNS/TCP/TLS</div>
              </div>

              <div class="comparison-row">
                <div class="comparison-cell">优先级</div>
                <div class="comparison-cell">Low (最低)</div>
                <div class="comparison-cell">Medium (中等)</div>
              </div>
            </div>

            <h3>使用场景</h3>
            <div class="scenarios">
              <div class="scenario">
                <div class="icon">📊</div>
                <div class="content">
                  <h4>关键渲染路径资源</h4>
                  <p>提前加载阻塞渲染的CSS/JS</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">🔄</div>
                <div class="content">
                  <h4>下一页资源</h4>
                  <p>预加载用户可能访问的下一页资源</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">🔠</div>
                <div class="content">
                  <h4>自定义字体</h4>
                  <p>避免字体加载时的布局偏移</p>
                </div>
              </div>

              <div class="scenario">
                <div class="icon">🎥</div>
                <div class="content">
                  <h4>媒体文件</h4>
                  <p>预加载视频/音频关键帧</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="best-practices">
        <h2><span class="icon">✅</span> 最佳实践</h2>
        <div class="card">
          <div class="practices-grid">
            <div class="practice">
              <div class="icon">🎯</div>
              <h3>关键资源优先</h3>
              <p>使用preload加载首屏关键资源，使用prefetch加载后续资源</p>
            </div>

            <div class="practice">
              <div class="icon">📱</div>
              <h3>考虑网络条件</h3>
              <p>在慢速网络上谨慎使用预加载，避免浪费带宽</p>
            </div>

            <div class="practice">
              <div class="icon">⚖️</div>
              <h3>平衡加载策略</h3>
              <p>首屏使用预加载，非首屏内容使用懒加载</p>
            </div>

            <div class="practice">
              <div class="icon">🔍</div>
              <h3>监控性能</h3>
              <p>使用Chrome DevTools分析加载性能</p>
            </div>
          </div>

          <div class="performance-metrics">
            <h3>性能指标对比</h3>
            <div class="metrics-table">
              <table>
                <thead>
                  <tr>
                    <th>策略</th>
                    <th>LCP</th>
                    <th>FID</th>
                    <th>加载时间</th>
                    <th>带宽使用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>无优化</td>
                    <td>3.2s</td>
                    <td>120ms</td>
                    <td>4.5s</td>
                    <td>2.1MB</td>
                  </tr>
                  <tr>
                    <td>仅懒加载</td>
                    <td>1.8s</td>
                    <td>85ms</td>
                    <td>2.9s</td>
                    <td>1.4MB</td>
                  </tr>
                  <tr>
                    <td>仅预加载</td>
                    <td>1.5s</td>
                    <td>45ms</td>
                    <td>2.2s</td>
                    <td>2.3MB</td>
                  </tr>
                  <tr class="highlight">
                    <td>组合使用</td>
                    <td>1.2s</td>
                    <td>32ms</td>
                    <td>1.8s</td>
                    <td>1.6MB</td>
                  </tr>
                </tbody>
              </table>
              <p class="note">
                测试数据基于典型电商页面，数值越低越好（LCP: 最大内容绘制，FID: 首次输入延迟）
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation">
        <h2><span class="icon">💻</span> 实际实现</h2>
        <div class="card">
          <div class="tabs">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="['tab', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 'vue'" class="code-example">
              <h3>Vue中的实现</h3>
              <div class="code-block">
                <pre><code>// 懒加载组件
const ProductGallery = () => import('./ProductGallery.vue');

// 预加载关键资源
&lt;link rel="preload" href="/fonts/roboto.woff2" as="font" crossorigin&gt;

// 路由预获取
const router = new VueRouter({
  routes: [...],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// 使用路由守卫预取数据
router.beforeResolve((to, from, next) => {
  if (to.meta.prefetchData) {
    store.dispatch('prefetchData', to.params.id)
  }
  next()
})</code></pre>
              </div>
            </div>

            <div v-if="activeTab === 'react'" class="code-example">
              <h3>React中的实现</h3>
              <div class="code-block">
                <pre><code>// 懒加载组件
const ProductDetails = React.lazy(() => import('./ProductDetails'));

// 预加载资源
import { Helmet } from 'react-helmet';

function App() {
  return (
    &lt;&gt;
      &lt;Helmet&gt;
        &lt;link rel="preload" href="critical.css" as="style" /&gt;
        &lt;link rel="prefetch" href="next-page-data.json" as="fetch" /&gt;
      &lt;/Helmet&gt;
      {/* 应用内容 */}
    &lt;/&gt;
  );
}

// 使用Suspense处理加载状态
&lt;Suspense fallback={&lt;Spinner /&gt}&gt;
  &lt;ProductDetails /&gt;
&lt;/Suspense&gt;</code></pre>
              </div>
            </div>

            <div v-if="activeTab === 'native'" class="code-example">
              <h3>原生JavaScript实现</h3>
              <div class="code-block">
                <pre><code>// 动态预加载资源
function preloadResource(url, as = 'script') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

// 条件预加载
if (navigator.connection.effectiveType === '4g') {
  preloadResource('next-page.js');
}

// 图片懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img.lazy').forEach(img => {
  observer.observe(img);
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>预加载和懒加载是优化网页性能的互补技术，正确组合使用可显著提升用户体验。</p>
      <p>使用Chrome DevTools的Performance和Network面板分析你的应用加载性能。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { id: 'vue', label: 'Vue实现' },
  { id: 'react', label: 'React实现' },
  { id: 'native', label: '原生JS实现' },
]

const activeTab = ref('vue')
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@secondary-color: #657ef8;
@accent-color: #ff6b6b;
@light-bg: #f8faff;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e7ff;
@code-bg: #f0f4ff;
@lazy-color: #6a89cc;
@preload-color: #4cd137;
@warning-color: #ff9f43;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.loading-optimization-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, #3051d3);
  color: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(74, 108, 247, 0.2);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

h4 {
  font-size: 1.2rem;
  color: @primary-color;
  margin: 15px 0 10px;
}

.card {
  background-color: @card-bg;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @border-color;
}

// 对比卡片
.comparison-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin: 30px 0;

  .loading-card {
    flex: 1;
    min-width: 300px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.lazy {
      border-top: 4px solid @lazy-color;
    }

    &.preload {
      border-top: 4px solid @preload-color;
    }

    .card-header {
      padding: 20px;
      background: linear-gradient(135deg, #f0f4ff, #e6eeff);
      display: flex;
      align-items: center;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
      }

      h2 {
        margin: 0;
        padding: 0;
        border: none;
        color: @text-color;
      }
    }

    .card-content {
      padding: 20px;

      p {
        margin-bottom: 15px;
      }

      .loading-bar {
        height: 8px;
        background-color: #e0e7ff;
        border-radius: 4px;
        overflow: hidden;
        margin: 20px 0;

        .progress {
          height: 100%;
          border-radius: 4px;
        }

        .lazy & .progress {
          background-color: @lazy-color;
        }

        .preload & .progress {
          background-color: @preload-color;
        }
      }

      .stats {
        display: flex;
        justify-content: space-around;

        .stat {
          text-align: center;

          .value {
            display: block;
            font-size: 1.8rem;
            font-weight: 700;
          }

          .label {
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
    }
  }

  .vs {
    font-size: 1.5rem;
    font-weight: bold;
    color: @warning-color;
    padding: 10px;
  }
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 懒加载部分
.implementation {
  display: grid;
  gap: 20px;
  margin: 20px 0;

  .step {
    display: flex;
    align-items: flex-start;

    .step-number {
      width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .step-content {
      h4 {
        margin-top: 0;
      }
    }
  }
}

// 使用场景网格
.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;

  .scenario {
    display: flex;
    align-items: center;
    background: #f0f4ff;
    border-radius: 10px;
    padding: 15px;

    .icon {
      font-size: 1.8rem;
      margin-right: 15px;
    }

    .content {
      h4 {
        margin: 0 0 5px 0;
      }

      p {
        font-size: 0.9rem;
        color: #666;
        margin: 0;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  .pros,
  .cons {
    padding: 15px;
    border-radius: 10px;
  }

  .pros {
    background: #e6f7ee;
    border-left: 4px solid @preload-color;
  }

  .cons {
    background: #ffefef;
    border-left: 4px solid @accent-color;
  }
}

// 预加载部分
.preload-types {
  display: grid;
  gap: 20px;
  margin: 20px 0;

  .type {
    border: 1px solid @border-color;
    border-radius: 10px;
    overflow: hidden;

    .type-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: #f0f4ff;

      .tag {
        background: @primary-color;
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
      }
    }
  }
}

.execution-timing {
  background: #f0f4ff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;

  .timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 30px 0;

    &::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      height: 4px;
      background: #d0d9ff;
      z-index: 1;
    }

    .event {
      text-align: center;
      position: relative;
      z-index: 2;

      .time {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .description {
        background: white;
        padding: 5px 10px;
        border-radius: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        width: 16px;
        height: 16px;
        background: @primary-color;
        border-radius: 50%;
        transform: translateX(-50%);
      }

      &.highlight::before {
        background: @preload-color;
        width: 20px;
        height: 20px;
        top: 9px;
      }
    }
  }

  .note {
    background: white;
    border-left: 4px solid @preload-color;
    padding: 15px;
    border-radius: 0 8px 8px 0;
  }
}

.comparison {
  border: 1px solid @border-color;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;

  .comparison-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &:nth-child(odd) {
      background: #f8faff;
    }

    &:first-child {
      background: @primary-color;
      color: white;
    }
  }

  .comparison-cell {
    padding: 12px 15px;
  }
}

// 最佳实践
.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;

  .practice {
    text-align: center;
    padding: 25px 20px;
    border-radius: 12px;
    background: #f0f4ff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 10px 0;
    }
  }
}

.performance-metrics {
  margin-top: 30px;

  .metrics-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

      th,
      td {
        padding: 12px 15px;
        text-align: center;
        border: 1px solid @border-color;
      }

      thead {
        background: @primary-color;
        color: white;
      }

      tbody {
        tr {
          &:nth-child(even) {
            background: #f8faff;
          }

          &.highlight {
            background: #e6f7ee;
            font-weight: bold;
          }
        }
      }
    }

    .note {
      font-size: 0.9rem;
      color: #666;
      margin-top: 10px;
      text-align: center;
    }
  }
}

// 实现部分
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  .tab {
    padding: 10px 20px;
    background: #f0f4ff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.code-example {
  h3 {
    margin-top: 0;
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 10px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .comparison-cards {
    flex-direction: column;

    .vs {
      transform: rotate(90deg);
    }
  }

  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
