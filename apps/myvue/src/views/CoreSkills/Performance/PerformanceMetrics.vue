<template>
  <div class="performance-metrics-container">
    <header class="performance-header">
      <h1>前端性能指标基础介绍</h1>
      <p class="subtitle">构建高性能Web应用的关键指标与优化策略</p>
      <div class="metric-summary">
        <div class="summary-card">
          <div class="summary-icon loading"></div>
          <div>
            <div class="summary-value">6+</div>
            <div class="summary-label">加载性能指标</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon interaction"></div>
          <div>
            <div class="summary-value">4+</div>
            <div class="summary-label">交互性能指标</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon visual"></div>
          <div>
            <div class="summary-value">3+</div>
            <div class="summary-label">视觉稳定性指标</div>
          </div>
        </div>
      </div>
    </header>

    <div class="navigation">
      <button v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
        @click="activeCategory = category.id">
        {{ category.name }}
      </button>
    </div>

    <div class="metrics-content">
      <section v-show="activeCategory === 'loading'" class="metrics-section">
        <h2>加载性能指标</h2>
        <p class="section-description">衡量页面加载速度和资源获取效率的关键指标</p>

        <div class="metric-card">
          <div class="metric-header">
            <h3>FP (First Paint) - 首次绘制</h3>
            <div class="metric-badge critical">关键指标</div>
            <div>利用MutationObserver采集信息，计算FP</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>浏览器首次将像素渲染到屏幕上的时间点</p>
            <p><strong>测量方式：</strong>使用PerformanceObserver监听'paint'事件</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 1.0s</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量代码</div>
                <div class="detail-code">performance.getEntriesByName('first-paint')[0].startTime</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>减少关键渲染路径的资源数量</li>
                <li>优化服务器响应时间(TTFB)</li>
                <li>使用CDN加速静态资源加载</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3>FCP (First Contentful Paint) - 首次内容绘制</h3>
            <div class="metric-badge core">核心指标</div>
            <div>利用MutationObserver采集信息，计算FCP</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>浏览器首次渲染DOM内容的时刻（文本、图像、非白色canvas等）</p>
            <p><strong>重要性：</strong>用户感知页面开始加载的关键时间点</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 1.8s</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量工具</div>
                <div class="detail-value">Lighthouse, Chrome DevTools</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>消除渲染阻塞资源（CSS、JS）</li>
                <li>内联关键CSS</li>
                <li>预加载关键请求</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3>FMP (First Meaningful Paint) - 首次有意义绘制</h3>
            <div class="metric-badge core">核心指标</div>
            <div>利用MutationObserver采集信息，计算FMP</div>
          </div>

          <div class="metric-content">
            <p><strong>定义：</strong>浏览器首次渲染有意义内容的时间点</p>
            <p><strong>重要性：</strong>衡量页面内容是否足够丰富，用户是否能快速理解页面内容</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 1.8s</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量方式</div>
                <div class="detail-value">Lighthouse, Chrome DevTools</div>
              </div>
              <div class="optimization">
                <h4>优化策略：</h4>
                <ul>
                  <li>优化图片和视频资源</li>
                  <li>使用CSS动画代替JavaScript动画</li>
                  <li>减少不必要的重排重绘</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3>LCP (Largest Contentful Paint) - 最大内容绘制</h3>
            <div class="metric-badge core">核心指标</div>
            <div>利用MutationObserver采集信息，计算LCP</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>可视区域内最大内容元素渲染完成的时间</p>
            <p><strong>重要性：</strong>Google核心Web指标之一，衡量主要内容加载完成时间</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 2.5s</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">影响因素</div>
                <div class="detail-value">图片/视频大小、服务器响应速度、客户端渲染</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>优化和压缩图片资源</li>
                <li>预加载重要资源</li>
                <li>使用CDN和缓存策略</li>
                <li>服务端渲染关键内容</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3>TTI (Time to Interactive) - 可交互时间</h3>
            <div class="metric-badge critical">关键指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>页面完全可交互所需时间（主线程空闲且可响应用户输入）</p>
            <p><strong>测量方式：</strong>通过Lighthouse或WebPageTest测量</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 3.9s</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">计算方式</div>
                <div class="detail-value">FMP + 主线程连续空闲5秒的时间</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>拆分长任务</li>
                <li>延迟加载非关键JavaScript</li>
                <li>使用Web Workers处理复杂任务</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeCategory === 'interactive'" class="metrics-section">
        <h2>交互性能指标</h2>
        <p class="section-description">衡量页面响应速度和交互流畅度的关键指标</p>

        <div class="metric-card">
          <div class="metric-header">
            <h3>FID (First Input Delay) - 首次输入延迟</h3>
            <div class="metric-badge core">核心指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>用户首次与页面交互到浏览器实际响应该交互的时间</p>
            <p><strong>重要性：</strong>衡量用户首次交互体验的关键指标</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 100ms</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量代码</div>
                <div class="detail-code">new PerformanceObserver(entryList => { /* 处理逻辑 */ }).observe(...);</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>减少JavaScript执行时间</li>
                <li>分解长任务</li>
                <li>优化第三方脚本加载</li>
                <li>使用Web Workers</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <h3>INP (Interaction to Next Paint) - 下次绘制交互</h3>
            <div class="metric-badge new">新核心指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>用户交互开始到下一次绘制完成的总时间（取代FID）</p>
            <p><strong>重要性：</strong>2024年成为新的核心Web指标，衡量所有用户交互的响应能力</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 200ms</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量方式</div>
                <div class="detail-value">Chrome User Experience Report (CrUX)</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>优化事件处理程序</li>
                <li>减少JavaScript执行时间</li>
                <li>避免布局抖动</li>
                <li>使用requestIdleCallback调度非关键任务</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeCategory === 'visual'" class="metrics-section">
        <h2>视觉稳定性指标</h2>
        <p class="section-description">衡量页面布局稳定性和视觉一致性的关键指标</p>

        <div class="metric-card">
          <div class="metric-header">
            <h3>CLS (Cumulative Layout Shift) - 累积布局偏移</h3>
            <div class="metric-badge core">核心指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>页面生命周期内所有意外布局偏移得分的总和</p>
            <p><strong>计算公式：</strong>布局偏移分数 = 影响范围 * 距离分数</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 0.1</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">常见原因</div>
                <div class="detail-value">无尺寸图片/广告、动态注入内容、Web字体</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>为图片和视频设置尺寸属性</li>
                <li>预加载Web字体</li>
                <li>避免在现有内容上方插入新内容</li>
                <li>使用transform动画代替影响布局的属性</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeCategory === 'resource'" class="metrics-section">
        <h2>资源性能指标</h2>
        <p class="section-description">衡量资源加载效率和网络性能的关键指标</p>

        <div class="metric-card">
          <div class="metric-header">
            <h3>TTFB (Time to First Byte) - 首字节时间</h3>
            <div class="metric-badge critical">关键指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>从发起请求到接收到响应第一个字节的时间</p>
            <p><strong>重要性：</strong>衡量服务器响应速度的关键指标</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&lt; 200ms</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量工具</div>
                <div class="detail-value">Chrome DevTools, WebPageTest</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>优化服务器配置和数据库查询</li>
                <li>使用CDN缓存静态资源</li>
                <li>启用HTTP/2或HTTP/3</li>
                <li>减少服务器端重定向</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeCategory === 'advanced'" class="metrics-section">
        <h2>高级性能指标</h2>
        <p class="section-description">针对特定场景和深入优化的专业指标</p>

        <div class="metric-card">
          <div class="metric-header">
            <h3>FPS (Frames Per Second) - 帧率</h3>
            <div class="metric-badge animation">动画指标</div>
          </div>
          <div class="metric-content">
            <p><strong>定义：</strong>页面每秒渲染的帧数，衡量动画和交互的流畅度</p>
            <p><strong>重要性：</strong>60fps是流畅体验的标准（每帧16.7ms）</p>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">良好标准</div>
                <div class="detail-value">&gt; 50fps</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">测量方式</div>
                <div class="detail-value">Chrome DevTools Rendering面板</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化策略：</h4>
              <ul>
                <li>避免强制同步布局</li>
                <li>优化JavaScript执行效率</li>
                <li>使用CSS动画代替JavaScript动画</li>
                <li>减少绘制区域和复杂度</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeCategory === 'rail'" class="metrics-section">
        <h2>RAIL模型</h2>
        <p class="section-description">系统化衡量和优化用户体验的性能模型</p>
        <div class="metric-card">
          <div class="metric-header">
            <h3>RAIL四大阶段</h3>
            <div class="metric-badge rail">性能模型</div>
          </div>
          <div class="metric-content">
            <ul>
              <li>
                <strong>R - Response（响应）</strong>：<br>
                用户操作后，应用应在 <b>50ms</b> 内响应，确保交互流畅无延迟。
              </li>
              <li>
                <strong>A - Animation（动画）</strong>：<br>
                动画和滚动应以 <b>60fps</b>（每帧约16ms）运行，保证视觉流畅。
              </li>
              <li>
                <strong>I - Idle（空闲）</strong>：<br>
                利用主线程空闲时间分批处理任务，每次任务不超过 <b>50ms</b>，避免阻塞关键交互。
              </li>
              <li>
                <strong>L - Load（加载）</strong>：<br>
                页面内容应在 <b>1000ms</b> 内完成主要渲染，提升首屏体验。
              </li>
            </ul>
            <div class="metric-details">
              <div class="detail-item">
                <div class="detail-label">目标</div>
                <div class="detail-value">以用户为中心的性能优化</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">应用场景</div>
                <div class="detail-value">交互、动画、空闲任务、页面加载</div>
              </div>
            </div>
            <div class="optimization">
              <h4>优化建议：</h4>
              <ul>
                <li>拆分长任务，利用<code>requestIdleCallback</code>等API</li>
                <li>动画优先使用CSS硬件加速</li>
                <li>减少首次渲染阻塞资源</li>
                <li>交互事件处理尽量精简，避免主线程阻塞</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="metrics-summary">
      <h2>核心Web指标 (Core Web Vitals)</h2>
      <div class="vitals-container">
        <div class="vital-card">
          <div class="vital-icon lcp"></div>
          <h3>LCP</h3>
          <p>最大内容绘制</p>
          <div class="vital-standard">良好: &lt; 2.5s</div>
        </div>
        <div class="vital-card">
          <div class="vital-icon inp"></div>
          <h3>INP</h3>
          <p>下次绘制交互</p>
          <div class="vital-standard">良好: &lt; 200ms</div>
        </div>
        <div class="vital-card">
          <div class="vital-icon cls"></div>
          <h3>CLS</h3>
          <p>累积布局偏移</p>
          <div class="vital-standard">良好: &lt; 0.1</div>
        </div>
      </div>
    </div>

    <footer class="performance-footer">
      <p>© 2023 前端性能优化指南 | 基于Google Core Web Vitals和W3C性能标准</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeCategory = ref('loading');

const categories = [
  { id: 'loading', name: '加载性能' },
  { id: 'interactive', name: '交互性能' },
  { id: 'visual', name: '视觉稳定性' },
  { id: 'resource', name: '资源性能' },
  { id: 'advanced', name: '高级指标' },
  { id: 'rail', name: 'RAIL模型' }
];
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@critical-color: #e74c3c;
@warning-color: #f39c12;
@success-color: #2ecc71;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;

.performance-metrics-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.performance-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
}

.metric-summary {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .summary-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.15);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    backdrop-filter: blur(5px);

    .summary-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;

      &.loading::before {
        content: "⏱️";
      }

      &.interaction::before {
        content: "🖱️";
      }

      &.visual::before {
        content: "👁️";
      }
    }

    .summary-value {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .summary-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 30px;
    background: @background-light;
    color: @text-color;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    &:hover {
      background: darken(@background-light, 5%);
      transform: translateY(-2px);
    }

    &.active {
      background: @accent-color;
      color: white;
      box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
    }
  }
}

.metrics-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: @secondary-color;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: @accent-color;
      border-radius: 3px;
    }
  }

  .section-description {
    color: lighten(@text-color, 20%);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
}

.metric-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.metric-header {
  padding: 1.2rem 1.5rem;
  background: @background-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @border-color;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: @secondary-color;
  }
}

.metric-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;

  &.critical {
    background: lighten(@critical-color, 40%);
    color: darken(@critical-color, 15%);
  }

  &.core {
    background: lighten(@accent-color, 40%);
    color: darken(@accent-color, 15%);
  }

  &.new {
    background: lighten(@primary-color, 40%);
    color: darken(@primary-color, 15%);
  }

  &.animation {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 15%);
  }
}

.metric-content {
  padding: 1.5rem;

  p {
    margin-bottom: 1rem;
  }
}

.metric-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: @background-light;
  border-radius: 8px;
}

.detail-item {
  .detail-label {
    font-size: 0.9rem;
    color: lighten(@text-color, 20%);
    margin-bottom: 0.3rem;
  }

  .detail-value {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .detail-code {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 0.8rem;
    border-radius: 6px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
  }
}

.optimization {
  background: lighten(@accent-color, 45%);
  padding: 1.2rem;
  border-radius: 8px;
  margin-top: 1.5rem;

  h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: darken(@accent-color, 15%);
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.metrics-summary {
  background: linear-gradient(135deg, #f8f9fa, #eef2f6);
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
  }
}

.vitals-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.vital-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .vital-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;

    &.lcp {
      background: lighten(@accent-color, 40%);
      color: darken(@accent-color, 15%);

      &::before {
        content: "⏱️";
      }
    }

    &.inp {
      background: lighten(@primary-color, 40%);
      color: darken(@primary-color, 15%);

      &::before {
        content: "⚡";
      }
    }

    &.cls {
      background: lighten(@warning-color, 40%);
      color: darken(@warning-color, 15%);

      &::before {
        content: "📏";
      }
    }
  }

  h3 {
    margin: 0.5rem 0;
    color: @secondary-color;
  }

  p {
    color: lighten(@text-color, 20%);
    margin-bottom: 1rem;
  }

  .vital-standard {
    background: @background-light;
    padding: 0.5rem;
    border-radius: 6px;
    font-weight: 600;
    color: @accent-color;
  }
}

.performance-footer {
  text-align: center;
  padding: 1.5rem;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .performance-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .metric-summary {
    flex-direction: column;
    align-items: center;

    .summary-card {
      width: 100%;
      max-width: 300px;
    }
  }

  .navigation {
    flex-wrap: wrap;

    button {
      flex: 1;
      min-width: 120px;
    }
  }

  .metric-details {
    grid-template-columns: 1fr;
  }
}
</style>
