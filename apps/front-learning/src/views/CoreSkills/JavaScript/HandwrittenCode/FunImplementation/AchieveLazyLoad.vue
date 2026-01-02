<template>
  <div class="resource-loading-container">
    <header class="header">
      <div class="title-group">
        <h1>资源懒加载与预加载技术</h1>
        <p class="subtitle">优化页面加载性能的关键策略</p>
      </div>
      <div class="performance-indicators">
        <div class="indicator">
          <div class="indicator-value">70%</div>
          <div class="indicator-label">加载时间减少</div>
        </div>
        <div class="indicator">
          <div class="indicator-value">40%</div>
          <div class="indicator-label">带宽节省</div>
        </div>
        <div class="indicator">
          <div class="indicator-value">90%</div>
          <div class="indicator-label">用户感知提升</div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 概念对比 -->
      <div class="concept-comparison card">
        <h2 class="section-title"><i class="icon icon-compare"></i> 懒加载 vs 预加载</h2>
        <div class="comparison-content">
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-item"></div>
              <div class="header-item">懒加载 (Lazy Loading)</div>
              <div class="header-item">预加载 (Preloading)</div>
            </div>
            <div class="table-row">
              <div class="row-title">加载时机</div>
              <div class="row-item">需要时加载（滚动到视图或交互时）</div>
              <div class="row-item">提前加载（空闲时或预测需要时）</div>
            </div>
            <div class="table-row">
              <div class="row-title">适用场景</div>
              <div class="row-item">首屏外图片/视频、折叠内容、非关键资源</div>
              <div class="row-item">关键资源、下一步操作所需资源</div>
            </div>
            <div class="table-row">
              <div class="row-title">性能影响</div>
              <div class="row-item">减少初始加载时间，节省带宽</div>
              <div class="row-item">提升后续操作流畅度，可能增加初始负载</div>
            </div>
            <div class="table-row">
              <div class="row-title">实现方式</div>
              <div class="row-item">Intersection Observer、滚动事件</div>
              <div class="row-item">link rel="preload"、Resource Hints</div>
            </div>
          </div>

          <div class="visual-representation">
            <div class="loading-visual">
              <div class="viewport">
                <div class="screen-label">可视区域</div>
                <div class="lazy-item">图片1（已加载）</div>
                <div class="lazy-item">图片2（已加载）</div>
                <div class="lazy-item placeholder">图片3（未加载）</div>
                <div class="lazy-item placeholder">图片4（未加载）</div>
                <div class="preload-indicator">预加载资源已准备好</div>
              </div>
              <div class="scroll-bar">
                <div class="scroll-thumb"></div>
              </div>
            </div>
            <div class="loading-legend">
              <div class="legend-item">
                <div class="color-box loaded"></div>
                <span>已加载资源</span>
              </div>
              <div class="legend-item">
                <div class="color-box placeholder"></div>
                <span>未加载资源</span>
              </div>
              <div class="legend-item">
                <div class="color-box preloaded"></div>
                <span>预加载资源</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 懒加载实现 -->
      <div class="lazy-loading-section card">
        <h2 class="section-title"><i class="icon icon-lazy"></i> 懒加载实现</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>标记需懒加载资源</h3>
              <p>使用data-src代替src属性，添加占位符</p>
              <pre><code>&lt;img data-src="image.jpg"
     src="placeholder.jpg"
     class="lazy"&gt;</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>检测元素进入视图</h3>
              <p>使用Intersection Observer API监测元素位置</p>
              <pre><code>const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 加载资源
    }
  });
});</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>加载并替换资源</h3>
              <p>将data-src的值赋给src属性，触发加载</p>
              <pre><code>const img = entry.target;
img.src = img.dataset.src;
img.classList.remove('lazy');
observer.unobserve(img);</code></pre>
            </div>
          </div>
        </div>

        <div class="full-implementation">
          <h3>完整实现代码</h3>
          <div class="code-container">
            <pre><code>// 懒加载图片实现
function lazyLoadImages() {
  // 配置Intersection Observer
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // 创建观察器
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // 替换data-src为src
        img.src = img.dataset.src;
        // 加载完成后移除lazy类
        img.onload = () => {
          img.classList.remove('lazy');
          img.parentElement?.classList.add('loaded');
        };
        // 停止观察该元素
        observer.unobserve(img);
      }
    });
  }, options);

  // 观察所有带lazy类的图片
  document.querySelectorAll('img.lazy').forEach(img => {
    observer.observe(img);
  });
}

// 初始化懒加载
document.addEventListener('DOMContentLoaded', lazyLoadImages);</code></pre>
          </div>
        </div>

        <div class="advanced-options">
          <h3>高级懒加载选项</h3>
          <div class="options-grid">
            <div class="option">
              <h4>滚动事件回退</h4>
              <p>对不支持Intersection Observer的浏览器提供回退方案</p>
              <pre><code>if (!('IntersectionObserver' in window)) {
  window.addEventListener('scroll', throttle(lazyLoadFallback, 200));
}</code></pre>
            </div>

            <div class="option">
              <h4>模糊到清晰效果</h4>
              <p>使用CSS实现加载时的平滑过渡效果</p>
              <pre><code>.lazy-container {
  position: relative;
  background: #f0f0f0;
  overflow: hidden;
}

.lazy {
  filter: blur(5px);
  transition: filter 0.3s;
}

.lazy.loaded {
  filter: blur(0);
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 预加载实现 -->
      <div class="preload-section card">
        <h2 class="section-title"><i class="icon icon-preload"></i> 预加载实现</h2>

        <div class="preload-methods">
          <div class="method">
            <h3>1. HTML link 标签</h3>
            <p>使用rel="preload"预加载关键资源</p>
            <pre><code>&lt;link rel="preload"
      href="critical.css"
      as="style"&gt;

&lt;link rel="preload"
      href="hero-image.webp"
      as="image"&gt;

&lt;link rel="preload"
      href="main.js"
      as="script"&gt;</code></pre>
          </div>

          <div class="method">
            <h3>2. Resource Hints</h3>
            <p>使用dns-prefetch、preconnect、prefetch和prerender</p>
            <pre><code>&lt;!-- DNS预解析 --&gt;
&lt;link rel="dns-prefetch" href="//cdn.example.com"&gt;

&lt;!-- 预连接 --&gt;
&lt;link rel="preconnect" href="https://api.example.com"&gt;

&lt;!-- 预取资源 --&gt;
&lt;link rel="prefetch" href="next-page.html" as="document"&gt;

&lt;!-- 预渲染页面 --&gt;
&lt;link rel="prerender" href="https://example.com/next-page"&gt;</code></pre>
          </div>

          <div class="method">
            <h3>3. JavaScript动态预加载</h3>
            <p>使用JavaScript创建预加载元素</p>
            <pre><code>// 预加载图片
function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

// 预加载CSS
function preloadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = 'style';
  document.head.appendChild(link);
}

// 预加载JS
function preloadJS(url) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.head.appendChild(script);
}</code></pre>
          </div>
        </div>

        <div class="preload-strategies">
          <h3>预加载策略</h3>
          <div class="strategies-grid">
            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-critical"></i>
              </div>
              <h4>关键资源预加载</h4>
              <p>预加载首屏渲染所需的关键CSS、JS和字体</p>
            </div>

            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-predict"></i>
              </div>
              <h4>预测性预加载</h4>
              <p>基于用户行为预测下一步所需资源</p>
            </div>

            <div class="strategy">
              <div class="strategy-icon">
                <i class="icon icon-idle"></i>
              </div>
              <h4>空闲时预加载</h4>
              <p>使用requestIdleCallback在空闲时间加载资源</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="best-practices card">
        <h2 class="section-title"><i class="icon icon-practice"></i> 最佳实践</h2>

        <div class="practice-content">
          <div class="practice-list">
            <div class="practice-item">
              <div class="practice-number">1</div>
              <div class="practice-details">
                <h3>懒加载首屏外所有图片和视频</h3>
                <p>首屏内资源直接加载，其他资源使用懒加载</p>
              </div>
            </div>

            <div class="practice-item">
              <div class="practice-number">2</div>
              <div class="practice-details">
                <h3>预加载关键渲染路径资源</h3>
                <p>使用preload加载阻塞渲染的CSS和JS</p>
              </div>
            </div>

            <div class="practice-item">
              <div class="practice-number">3</div>
              <div class="practice-details">
                <h3>优化占位符体验</h3>
                <p>使用LQIP（低质量图片占位符）或SVG占位符</p>
              </div>
            </div>

            <div class="practice-item">
              <div class="practice-number">4</div>
              <div class="practice-details">
                <h3>合理使用预加载优先级</h3>
                <p>不要过度预加载，避免浪费带宽</p>
              </div>
            </div>
          </div>

          <div class="performance-metrics">
            <h3>性能指标对比</h3>
            <div class="metrics-chart">
              <div class="metric">
                <div class="metric-label">初始加载时间</div>
                <div class="metric-bar">
                  <div class="bar-value baseline" style="width: 100%">100%</div>
                  <div class="bar-value lazy" style="width: 65%">65%</div>
                  <div class="bar-value preload" style="width: 85%">85%</div>
                  <div class="bar-value both" style="width: 50%">50%</div>
                </div>
              </div>

              <div class="metric">
                <div class="metric-label">交互响应时间</div>
                <div class="metric-bar">
                  <div class="bar-value baseline" style="width: 100%">100%</div>
                  <div class="bar-value lazy" style="width: 90%">90%</div>
                  <div class="bar-value preload" style="width: 60%">60%</div>
                  <div class="bar-value both" style="width: 40%">40%</div>
                </div>
              </div>

              <div class="metric">
                <div class="metric-label">带宽使用</div>
                <div class="metric-bar">
                  <div class="bar-value baseline" style="width: 100%">100%</div>
                  <div class="bar-value lazy" style="width: 45%">45%</div>
                  <div class="bar-value preload" style="width: 110%">110%</div>
                  <div class="bar-value both" style="width: 70%">70%</div>
                </div>
              </div>
            </div>

            <div class="chart-legend">
              <div class="legend-item">
                <div class="color-box baseline"></div>
                <span>无优化</span>
              </div>
              <div class="legend-item">
                <div class="color-box lazy"></div>
                <span>仅懒加载</span>
              </div>
              <div class="legend-item">
                <div class="color-box preload"></div>
                <span>仅预加载</span>
              </div>
              <div class="legend-item">
                <div class="color-box both"></div>
                <span>懒加载+预加载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion card">
      <h2 class="section-title"><i class="icon icon-summary"></i> 总结</h2>
      <div class="conclusion-content">
        <div class="key-takeaways">
          <h3>核心要点</h3>
          <ul>
            <li>懒加载优化初始加载性能，预加载提升后续交互体验</li>
            <li>使用Intersection Observer API实现高效懒加载</li>
            <li>通过rel="preload"预加载关键渲染路径资源</li>
            <li>结合使用两种技术实现最佳性能平衡</li>
            <li>始终考虑兼容性和优雅降级方案</li>
          </ul>
        </div>

        <div class="implementation-checklist">
          <h3>实施检查清单</h3>
          <div class="checklist-items">
            <label class="checkbox">
              <input type="checkbox" checked />
              <span>识别关键资源进行预加载</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" checked />
              <span>非关键图片/视频添加懒加载</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" />
              <span>实现合适的资源占位符</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" />
              <span>设置预加载资源优先级</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" />
              <span>添加兼容性回退方案</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" />
              <span>性能测试和优化调整</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'


// 组件挂载时初始化懒加载
onMounted(() => {

})
</script>

<style lang="less" scoped>
.resource-loading-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
  line-height: 1.6;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #4a6cf7 0%, #6a11cb 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(106, 17, 203, 0.15);

    .title-group {
      margin-bottom: 1.5rem;

      h1 {
        font-weight: 700;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-top: 0;
      }
    }

    .performance-indicators {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      .indicator {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        min-width: 120px;

        .indicator-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .indicator-label {
          font-size: 0.95rem;
          opacity: 0.9;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.8rem;
    margin-bottom: 2rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    background: #f8f9fa;
    margin: 0;
    padding: 1.2rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .icon {
      font-size: 1.2rem;
      color: #4a6cf7;
    }
  }

  .concept-comparison {
    .comparison-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .comparison-table {
        border: 1px solid #eaeaea;
        border-radius: 8px;
        overflow: hidden;

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          background: #f0f7ff;
          font-weight: 600;

          .header-item {
            padding: 1rem;
            text-align: center;

            &:first-child {
              background: #f8f9fa;
            }

            &:nth-child(2) {
              color: #4a6cf7;
            }

            &:nth-child(3) {
              color: #6a11cb;
            }
          }
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .row-title {
            padding: 1rem;
            background: #f8f9fa;
            font-weight: 500;
            display: flex;
            align-items: center;
          }

          .row-item {
            padding: 1rem;
            font-size: 0.95rem;
          }
        }
      }

      .visual-representation {
        .loading-visual {
          border: 1px solid #eaeaea;
          border-radius: 8px;
          padding: 1rem;
          background: #f8f9fa;
          height: 300px;
          display: flex;
          position: relative;

          .viewport {
            flex: 1;
            border: 2px dashed #4a6cf7;
            border-radius: 4px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow: hidden;

            .screen-label {
              position: absolute;
              top: 0;
              right: 0;
              background: #4a6cf7;
              color: white;
              padding: 0.2rem 0.5rem;
              font-size: 0.8rem;
              border-radius: 0 0 0 4px;
            }

            .lazy-item {
              background: #e3f2fd;
              padding: 1rem;
              border-radius: 4px;
              font-size: 0.9rem;

              &.placeholder {
                background: #f0f0f0;
                color: #999;
              }
            }

            .preload-indicator {
              position: absolute;
              bottom: 1rem;
              left: 1rem;
              right: 1rem;
              background: #e8f5e9;
              border: 1px solid #a5d6a7;
              padding: 0.8rem;
              text-align: center;
              border-radius: 4px;
              font-size: 0.9rem;
            }
          }

          .scroll-bar {
            width: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            margin-left: 0.5rem;
            position: relative;

            .scroll-thumb {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 30%;
              background: #4a6cf7;
              border-radius: 5px;
            }
          }
        }

        .loading-legend {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          justify-content: center;

          .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;

            .color-box {
              width: 16px;
              height: 16px;
              border-radius: 3px;

              &.loaded {
                background: #e3f2fd;
                border: 1px solid #90caf9;
              }

              &.placeholder {
                background: #f0f0f0;
                border: 1px solid #e0e0e0;
              }

              &.preloaded {
                background: #e8f5e9;
                border: 1px solid #a5d6a7;
              }
            }
          }
        }
      }
    }
  }

  .lazy-loading-section {
    .implementation-steps {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .step {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        border-left: 4px solid #4a6cf7;

        .step-number {
          width: 36px;
          height: 36px;
          background: #4a6cf7;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .step-content {
          h3 {
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          p {
            margin: 0 0 1rem;
            color: #555;
            font-size: 0.95rem;
          }

          pre {
            background: #f0f7ff;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.85rem;

            code {
              font-family: 'Fira Code', monospace;
            }
          }
        }
      }
    }

    .full-implementation {
      padding: 1.5rem;
      border-top: 1px solid #f0f0f0;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .code-container {
        background: #2d3748;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        pre {
          margin: 0;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            color: #e2e8f0;

            .token.comment {
              color: #a0aec0;
            }
            .token.keyword {
              color: #f6ad55;
            }
            .token.function {
              color: #63b3ed;
            }
            .token.string {
              color: #68d391;
            }
            .token.operator {
              color: #f6e05e;
            }
          }
        }
      }
    }

    .advanced-options {
      padding: 1.5rem;
      border-top: 1px solid #f0f0f0;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;

        .option {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.2rem;

          h4 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            margin: 0 0 1rem;
            color: #555;
            font-size: 0.95rem;
          }

          pre {
            background: #f0f7ff;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.85rem;
          }
        }
      }
    }
  }

  .preload-section {
    .preload-methods {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .method {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        border-top: 3px solid #6a11cb;

        h3 {
          margin-top: 0;
          color: #2c3e50;
        }

        p {
          margin: 0 0 1rem;
          color: #555;
          font-size: 0.95rem;
        }

        pre {
          background: #f0f7ff;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;
        }
      }
    }

    .preload-strategies {
      padding: 1.5rem;
      border-top: 1px solid #f0f0f0;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .strategies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;

        .strategy {
          text-align: center;
          padding: 1.5rem 1rem;
          background: #f0f7ff;
          border-radius: 10px;

          .strategy-icon {
            width: 60px;
            height: 60px;
            background: #4a6cf7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;

            .icon {
              color: white;
              font-size: 1.8rem;
            }
          }

          h4 {
            margin: 0 0 0.5rem;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .best-practices {
    .practice-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .practice-list {
        .practice-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed #eaeaea;

          &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .practice-number {
            width: 36px;
            height: 36px;
            background: #4a6cf7;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 1.1rem;
            flex-shrink: 0;
          }

          .practice-details {
            h3 {
              margin-top: 0;
              margin-bottom: 0.5rem;
              color: #2c3e50;
            }

            p {
              margin: 0;
              color: #555;
              font-size: 0.95rem;
            }
          }
        }
      }

      .performance-metrics {
        h3 {
          margin-top: 0;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .metrics-chart {
          .metric {
            margin-bottom: 1.5rem;

            .metric-label {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
              color: #555;
            }

            .metric-bar {
              height: 30px;
              background: #f0f0f0;
              border-radius: 4px;
              position: relative;
              overflow: hidden;

              .bar-value {
                position: absolute;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 500;
                font-size: 0.9rem;

                &.baseline {
                  background: #718096;
                }

                &.lazy {
                  background: #4a6cf7;
                }

                &.preload {
                  background: #6a11cb;
                }

                &.both {
                  background: #38a169;
                }
              }
            }
          }
        }

        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1.5rem;

          .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;

            .color-box {
              width: 16px;
              height: 16px;
              border-radius: 3px;

              &.baseline {
                background: #718096;
              }

              &.lazy {
                background: #4a6cf7;
              }

              &.preload {
                background: #6a11cb;
              }

              &.both {
                background: #38a169;
              }
            }
          }
        }
      }
    }
  }

  .conclusion {
    .conclusion-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .key-takeaways {
        h3 {
          margin-top: 0;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.5;
            position: relative;
            padding-left: 1.5rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: #4a6cf7;
              font-weight: bold;
            }
          }
        }
      }

      .implementation-checklist {
        h3 {
          margin-top: 0;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .checklist-items {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;

          .checkbox {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem;
            background: #f8f9fa;
            border-radius: 6px;
            transition: background 0.2s;

            &:hover {
              background: #f0f7ff;
            }

            input {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
  }
}

// 图标样式
.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  &-compare::before {
    content: 'compare_arrows';
  }
  &-lazy::before {
    content: 'timer';
  }
  &-preload::before {
    content: 'bolt';
  }
  &-practice::before {
    content: 'checklist';
  }
  &-summary::before {
    content: 'summarize';
  }
  &-critical::before {
    content: 'priority_high';
  }
  &-predict::before {
    content: 'trending_up';
  }
  &-idle::before {
    content: 'hourglass_empty';
  }
}
</style>
