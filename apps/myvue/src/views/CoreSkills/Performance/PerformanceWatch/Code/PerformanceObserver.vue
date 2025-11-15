<template>
  <div class="performance-observer-container">
    <header class="po-header">
      <h1>PerformanceObserver API 基础介绍</h1>
      <p class="subtitle">实时监控Web应用性能的强大工具</p>
      <div class="po-badges">
        <div class="po-badge">
          <div class="badge-icon">⚡</div>
          <div class="badge-text">实时性能监控</div>
        </div>
        <div class="po-badge">
          <div class="badge-icon">📊</div>
          <div class="badge-text">多种性能指标</div>
        </div>
        <div class="po-badge">
          <div class="badge-icon">🌐</div>
          <div class="badge-text">浏览器原生支持</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="navigation">
        <button v-for="section in sections" :key="section.id" :class="{ active: activeSection === section.id }"
          @click="activeSection = section.id">
          {{ section.title }}
        </button>
      </div>

      <section v-show="activeSection === 'intro'" class="content-section">
        <h2>PerformanceObserver 是什么？</h2>
        <div class="concept-card">
          <div class="concept-text">
            <p>
              <strong>PerformanceObserver</strong> 是一个浏览器原生API，用于监测性能测量事件并异步接收性能指标数据。
              它解决了传统 <code>performance.getEntries*</code> 方法的局限性，提供了更高效、更灵活的性能监控方式。
            </p>

            <div class="feature-list">
              <div class="feature-item">
                <div class="feature-icon">🔄</div>
                <div>
                  <h3>异步监控</h3>
                  <p>避免轮询性能数据，减少性能开销</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <div>
                  <h3>精准监测</h3>
                  <p>只收集你关心的性能指标</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📈</div>
                <div>
                  <h3>实时反馈</h3>
                  <p>性能事件发生时立即获取数据</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>为什么需要 PerformanceObserver？</h3>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Performance.getEntries</th>
                <th>PerformanceObserver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据获取方式</td>
                <td>主动轮询</td>
                <td>事件驱动</td>
              </tr>
              <tr>
                <td>内存使用</td>
                <td>高（缓存所有条目）</td>
                <td>低（按需缓存）</td>
              </tr>
              <tr>
                <td>实时性</td>
                <td>延迟获取</td>
                <td>实时通知</td>
              </tr>
              <tr>
                <td>资源消耗</td>
                <td>高（频繁轮询）</td>
                <td>低（事件触发）</td>
              </tr>
              <tr>
                <td>监控新条目</td>
                <td>无法检测新条目</td>
                <td>自动检测新条目</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-show="activeSection === 'usage'" class="content-section">
        <h2>基本使用方法</h2>

        <div class="code-demo">
          <div class="code-block">
            <pre><code>// 创建 PerformanceObserver 实例
const observer = new PerformanceObserver((list) => {
  // 获取性能条目
  const entries = list.getEntries();

  // 处理性能数据
  entries.forEach(entry => {
    console.log(`[${entry.entryType}] ${entry.name}:`,
                entry.duration.toFixed(2), 'ms');
  });
});

// 配置观察的类型
observer.observe({
  // 监控资源加载性能
  entryTypes: ['resource', 'paint', 'longtask']
});

// 停止监控
observer.disconnect();
</code></pre>
          </div>
          <div class="demo-explanation">
            <h3>核心步骤</h3>
            <ol>
              <li>创建 PerformanceObserver 实例并定义回调函数</li>
              <li>在回调中处理性能数据</li>
              <li>调用 observe() 方法并指定监控类型</li>
              <li>在不需要时调用 disconnect() 停止监控</li>
            </ol>

            <div class="notice">
              <strong>最佳实践：</strong>
              在应用启动时初始化 PerformanceObserver，避免遗漏早期性能数据
            </div>
          </div>
        </div>

        <h3>监控生命周期</h3>
        <div class="lifecycle">
          <div class="lifecycle-stage">
            <div class="stage-icon">1</div>
            <div class="stage-content">
              <h4>初始化</h4>
              <p>创建 PerformanceObserver 实例</p>
            </div>
          </div>
          <div class="lifecycle-arrow">→</div>
          <div class="lifecycle-stage">
            <div class="stage-icon">2</div>
            <div class="stage-content">
              <h4>配置</h4>
              <p>调用 observe() 指定监控类型</p>
            </div>
          </div>
          <div class="lifecycle-arrow">→</div>
          <div class="lifecycle-stage">
            <div class="stage-icon">3</div>
            <div class="stage-content">
              <h4>监控</h4>
              <p>异步接收性能条目通知</p>
            </div>
          </div>
          <div class="lifecycle-arrow">→</div>
          <div class="lifecycle-stage">
            <div class="stage-icon">4</div>
            <div class="stage-content">
              <h4>停止</h4>
              <p>调用 disconnect() 结束监控</p>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeSection === 'metrics'" class="content-section">
        <h2>性能指标监控</h2>
        <p class="section-description">PerformanceObserver 支持监控多种性能指标类型</p>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">🎨</div>
              <h3>Paint Timing</h3>
              <div class="metric-type">paint</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>首次绘制(FP)和首次内容绘制(FCP)</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">name, startTime</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">测量页面渲染性能</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ type: 'paint', buffered: true });</code></pre>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">📦</div>
              <h3>Resource Timing</h3>
              <div class="metric-type">resource</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>所有资源加载时间(JS, CSS, 图片等)</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">duration, initiatorType</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">优化资源加载性能</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ entryTypes: ['resource'] });</code></pre>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">⏱️</div>
              <h3>Long Tasks</h3>
              <div class="metric-type">longtask</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>执行时间超过50ms的任务</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">duration, attribution</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">识别阻塞主线程的任务</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ entryTypes: ['longtask'] });</code></pre>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">📝</div>
              <h3>Layout Shifts</h3>
              <div class="metric-type">layout-shift</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>意外的布局偏移(CLS)</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">value, hadRecentInput</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">改善视觉稳定性</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ type: 'layout-shift', buffered: true });</code></pre>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">🔍</div>
              <h3>Element Timing</h3>
              <div class="metric-type">element</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>特定元素的渲染时间</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">renderTime, loadTime</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">监控关键元素加载</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ type: 'element', buffered: true });</code></pre>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon">🚀</div>
              <h3>Navigation Timing</h3>
              <div class="metric-type">navigation</div>
            </div>
            <div class="metric-content">
              <p><strong>监控内容：</strong>页面导航和加载时间</p>
              <div class="metric-details">
                <div class="detail-item">
                  <div class="detail-label">关键属性</div>
                  <div class="detail-value">domComplete, loadEventEnd</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">使用场景</div>
                  <div class="detail-value">分析整页加载性能</div>
                </div>
              </div>
              <div class="code-snippet">
                <pre><code>observer.observe({ entryTypes: ['navigation'] });</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-show="activeSection === 'advanced'" class="content-section">
        <h2>高级用法与最佳实践</h2>

        <div class="advanced-card">
          <h3>缓冲模式 (Buffered Mode)</h3>
          <p>
            使用 <code>buffered: true</code> 选项可以获取观察器注册前已经存在的性能条目，
            确保不会遗漏关键性能数据。
          </p>
          <div class="code-block">
            <pre><code>// 启用缓冲模式获取历史性能数据
observer.observe({
  type: 'paint',
  buffered: true  // 获取已存在的条目
});</code></pre>
          </div>
        </div>

        <div class="advanced-card">
          <h3>性能监控封装示例</h3>
          <div class="code-block">
            <pre><code>import { onMounted, onUnmounted } from 'vue';

// 性能监控组合函数
export function usePerformanceObserver(entryTypes, callback) {
  let observer: PerformanceObserver | null = null;

  const initObserver = () => {
    if (!('PerformanceObserver' in window)) return;

    observer = new PerformanceObserver((list) => {
      callback(list.getEntries());
    });

    observer.observe({ entryTypes });
  };

  const disconnect = () => {
    observer?.disconnect();
  };

  onMounted(initObserver);
  onUnmounted(disconnect);

  return { disconnect };
}

// 在组件中使用
usePerformanceObserver(['paint', 'resource'], (entries) => {
  entries.forEach(entry => {
    console.log('性能条目:', entry);
  });
});</code></pre>
          </div>
        </div>

        <div class="advanced-card">
          <h3>实际应用场景</h3>
          <div class="use-case">
            <h4>核心Web指标监控</h4>
            <div class="code-block">
              <pre><code>// 监控LCP (最大内容绘制)
const po = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcpEntry = entries[entries.length - 1];

  console.log('LCP:', lcpEntry.startTime);
});

po.observe({ type: 'largest-contentful-paint', buffered: true });

// 监控CLS (累积布局偏移)
let clsValue = 0;
let sessionValue = 0;
let sessionEntries = [];

const po = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      sessionEntries.push(entry);
      sessionValue += entry.value;

      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        console.log('CLS更新:', clsValue);
      }
    }
  }
});

po.observe({ type: 'layout-shift', buffered: true });</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="po-footer">
      <p> 前端性能监控指南 | PerformanceObserver API v2</p>
      <div class="browser-support">
        支持浏览器: Chrome 52+, Firefox 57+, Edge 79+, Safari 11.1+
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSection = ref('intro');

const sections = [
  { id: 'intro', title: '概述' },
  { id: 'usage', title: '基本用法' },
  { id: 'metrics', title: '监控指标' },
  { id: 'advanced', title: '高级用法' }
];
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;

.performance-observer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.po-header {
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

.po-badges {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .po-badge {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: rgba(255, 255, 255, 0.15);
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    backdrop-filter: blur(5px);

    .badge-icon {
      font-size: 1.5rem;
    }

    .badge-text {
      font-weight: 600;
    }
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.navigation {
  display: flex;
  border-bottom: 1px solid @border-color;

  button {
    flex: 1;
    padding: 1.2rem;
    border: none;
    background: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: lighten(@text-color, 30%);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: @background-light;
      color: @text-color;
    }

    &.active {
      background: @accent-color;
      color: white;
      box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
    }
  }
}

.content-section {
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
    position: relative;
    padding-bottom: 0.8rem;

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

  h3 {
    font-size: 1.4rem;
    color: @secondary-color;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}

.concept-card {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .concept-text {
    flex: 1;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }
  }

  .concept-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  .feature-item {
    display: flex;
    gap: 1rem;
    background: lighten(@accent-color, 45%);
    padding: 1.2rem;
    border-radius: 8px;

    .feature-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      color: darken(@accent-color, 15%);
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }
  }
}

.architecture-diagram {
  position: relative;
  width: 100%;
  height: 250px;
  background: lighten(@primary-color, 45%);
  border-radius: 8px;
  padding: 1rem;

  >div {
    position: absolute;
    padding: 12px 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .browser {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    background: @accent-color;
    color: white;
  }

  .performance-timeline {
    top: 80px;
    left: 20%;
    background: #9b59b6;
    color: white;
    width: 160px;
  }

  .observer {
    top: 80px;
    right: 20%;
    background: @primary-color;
    color: white;
    width: 200px;
  }

  .callback {
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    background: #f39c12;
    color: white;
    width: 180px;
  }

  .arrow {
    position: absolute;
    height: 2px;
    background: #7f8c8d;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -4px;
      width: 10px;
      height: 10px;
      border-right: 2px solid #7f8c8d;
      border-bottom: 2px solid #7f8c8d;
      transform: rotate(-45deg);
    }

    &.arrow1 {
      top: 60px;
      left: 50%;
      width: 0;
      height: 30px;
      transform: translateX(-50%);
    }

    &.arrow2 {
      top: 110px;
      left: 30%;
      width: 25%;
      transform: rotate(-30deg);
    }

    &.arrow3 {
      top: 110px;
      right: 30%;
      width: 25%;
      transform: rotate(30deg);
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 2rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @background-light;
      font-weight: 600;
      color: @secondary-color;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background: lighten(@background-light, 1%);
    }
  }
}

.code-demo {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .code-block {
    flex: 1;
  }

  .demo-explanation {
    flex: 1;
    background: lighten(@accent-color, 45%);
    padding: 1.5rem;
    border-radius: 8px;

    h3 {
      margin-top: 0;
      color: darken(@accent-color, 15%);
    }

    ol {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
      }
    }

    .notice {
      margin-top: 1.5rem;
      padding: 1rem;
      background: darken(@accent-color, 5%);
      color: white;
      border-radius: 6px;
      font-weight: 500;
    }
  }
}

.lifecycle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  flex-wrap: wrap;

  .lifecycle-stage {
    flex: 1;
    min-width: 180px;
    text-align: center;
    margin: 1rem 0;

    .stage-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    h4 {
      margin: 0;
      color: @secondary-color;
    }

    p {
      margin: 0.5rem 0 0;
      font-size: 0.95rem;
      color: lighten(@text-color, 20%);
    }
  }

  .lifecycle-arrow {
    color: lighten(@text-color, 40%);
    font-weight: bold;
    font-size: 1.5rem;

    @media (max-width: 768px) {
      display: none;
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.metric-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.metric-header {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  background: @background-light;
  border-bottom: 1px solid @border-color;

  .metric-icon {
    font-size: 1.8rem;
    margin-right: 1rem;
  }

  h3 {
    flex: 1;
    margin: 0;
    font-size: 1.2rem;
    color: @secondary-color;
  }

  .metric-type {
    background: lighten(@accent-color, 30%);
    color: darken(@accent-color, 20%);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }
}

.metric-content {
  padding: 1.2rem;

  p {
    margin-top: 0;
  }
}

.metric-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
}

.detail-item {
  .detail-label {
    font-size: 0.9rem;
    color: lighten(@text-color, 20%);
    margin-bottom: 0.3rem;
  }

  .detail-value {
    font-weight: 600;
    font-size: 1rem;
  }
}

.code-snippet {
  background: @code-bg;
  color: @code-color;
  padding: 0.8rem;
  border-radius: 6px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.advanced-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.code-block {
  background: @code-bg;
  color: @code-color;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      .comment {
        color: #75715e;
      }

      .keyword {
        color: #f92672;
      }

      .string {
        color: #a6e22e;
      }

      .function {
        color: #66d9ef;
      }

      .variable {
        color: #fd971f;
      }
    }
  }
}

.use-case {
  margin-top: 2rem;

  h4 {
    font-size: 1.2rem;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }
}

.po-footer {
  text-align: center;
  padding: 1.5rem;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 2rem;

  .browser-support {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: lighten(@text-color, 40%);
  }
}
</style>
