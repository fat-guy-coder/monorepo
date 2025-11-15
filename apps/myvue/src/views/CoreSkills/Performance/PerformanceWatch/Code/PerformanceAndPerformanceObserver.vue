<template>
  <div class="performance-comparison">
    <header class="comparison-header">
      <h1>Performance 与 PerformanceObserver 对比基本介绍</h1>
      <p class="subtitle">全面掌握浏览器性能监控的两种核心API</p>
    </header>

    <div class="comparison-overview">
      <div class="overview-card">
        <div class="overview-icon">⏱️</div>
        <h2>Performance API</h2>
        <p>提供对浏览器性能时间线的访问，包含页面加载、资源加载和用户自定义性能指标的数据</p>
      </div>

      <div class="comparison-vs">VS</div>

      <div class="overview-card">
        <div class="overview-icon">🔍</div>
        <h2>PerformanceObserver</h2>
        <p>观察性能时间线上的事件，在性能条目可用时异步通知，避免轮询性能数据</p>
      </div>
    </div>

    <div class="comparison-content">
      <section class="core-differences">
        <h2>核心区别</h2>

        <div class="differences-table">
          <div class="table-header">
            <div class="header-item">特性</div>
            <div class="header-item performance-header">Performance API</div>
            <div class="header-item observer-header">PerformanceObserver</div>
          </div>

          <div class="table-row">
            <div class="row-title">数据获取方式</div>
            <div class="row-item">主动拉取（Pull）</div>
            <div class="row-item">事件驱动（Push）</div>
          </div>

          <div class="table-row">
            <div class="row-title">实时性</div>
            <div class="row-item">需要轮询获取新数据</div>
            <div class="row-item">新条目创建时立即通知</div>
          </div>

          <div class="table-row">
            <div class="row-title">内存使用</div>
            <div class="row-item">缓存所有性能条目</div>
            <div class="row-item">按需缓存，内存更友好</div>
          </div>

          <div class="table-row">
            <div class="row-title">性能开销</div>
            <div class="row-item">轮询可能导致性能问题</div>
            <div class="row-item">事件驱动，开销更小</div>
          </div>

          <div class="table-row">
            <div class="row-title">监控新条目</div>
            <div class="row-item">无法检测新创建的条目</div>
            <div class="row-item">自动检测新条目</div>
          </div>

          <div class="table-row">
            <div class="row-title">使用场景</div>
            <div class="row-item">初始加载性能分析</div>
            <div class="row-item">实时性能监控</div>
          </div>
        </div>
      </section>

      <section class="usage-comparison">
        <h2>使用方式对比</h2>

        <div class="usage-examples">
          <div class="usage-card">
            <h3 class="performance-title">Performance API</h3>
            <div class="code-block">
              <pre><code>// 获取页面导航性能数据
const navigationEntry = performance.getEntriesByType('navigation')[0];

console.log('页面加载时间:',
  navigationEntry.loadEventEnd - navigationEntry.startTime);

// 获取所有资源加载数据
const resources = performance.getEntriesByType('resource');

resources.forEach(res => {
  console.log(`${res.name} 加载耗时: ${res.duration}ms`);
});

// 创建自定义性能标记
performance.mark('custom-start');
// ...执行某些操作
performance.mark('custom-end');

// 测量自定义标记
performance.measure('custom-measure', 'custom-start', 'custom-end');</code></pre>
            </div>
          </div>

          <div class="usage-card">
            <h3 class="observer-title">PerformanceObserver</h3>
            <div class="code-block">
              <pre><code>// 创建观察器实例
const observer = new PerformanceObserver(list => {
  const entries = list.getEntries();

  entries.forEach(entry => {
    switch (entry.entryType) {
      case 'navigation':
        console.log('页面加载完成:',
          entry.loadEventEnd - entry.startTime);
        break;
      case 'resource':
        console.log(`资源加载: ${entry.name}`, entry.duration);
        break;
      case 'mark':
        console.log(`自定义标记: ${entry.name}`);
        break;
      case 'measure':
        console.log(`自定义测量: ${entry.name}`, entry.duration);
        break;
    }
  });
});

// 观察多种性能条目类型
observer.observe({
  entryTypes: ['navigation', 'resource', 'mark', 'measure']
});

// 触发自定义标记
performance.mark('observer-start');
// ...执行某些操作
performance.mark('observer-end');
performance.measure('observer-measure',
  'observer-start', 'observer-end');</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2>使用场景对比</h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon performance">P</div>
            <h3>Performance API 适用场景</h3>
            <ul>
              <li>分析页面初始加载性能</li>
              <li>一次性获取所有性能数据</li>
              <li>测量脚本执行时间</li>
              <li>获取资源加载的详细时间数据</li>
              <li>自定义性能标记和测量</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon observer">O</div>
            <h3>PerformanceObserver 适用场景</h3>
            <ul>
              <li>实时监控长任务</li>
              <li>追踪布局偏移（CLS）</li>
              <li>监控资源加载（动态添加的资源）</li>
              <li>跟踪绘制时间（FP/FCP）</li>
              <li>监控用户自定义性能标记</li>
            </ul>
          </div>

          <div class="case-card">
            <div class="case-icon combined">C</div>
            <h3>结合使用的最佳实践</h3>
            <ul>
              <li>初始加载用 Performance API</li>
              <li>运行时监控用 PerformanceObserver</li>
              <li>自定义标记使用 performance.mark()</li>
              <li>通过 PerformanceObserver 捕获标记</li>
              <li>核心Web指标监控使用 PerformanceObserver</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="comparison-diagram">
        <h2>性能监控流程对比</h2>

        <div class="diagram-container">
          <div class="diagram performance-diagram">
            <h3>Performance API 流程</h3>
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">页面加载/操作完成</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">性能数据存入时间线</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">开发者主动查询数据</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">分析获取的性能数据</div>
            </div>
          </div>

          <div class="diagram observer-diagram">
            <h3>PerformanceObserver 流程</h3>
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">注册观察器</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">性能事件发生</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">自动通知观察器</div>
            </div>
            <div class="arrow">↓</div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">实时处理性能数据</div>
            </div>
          </div>
        </div>
      </section>

      <section class="key-takeaways">
        <h2>核心要点总结</h2>

        <div class="takeaways-grid">
          <div class="takeaway-card">
            <h3>何时使用 Performance API</h3>
            <ul>
              <li>分析页面加载性能时</li>
              <li>需要一次性获取所有性能数据时</li>
              <li>创建自定义性能标记时</li>
              <li>浏览器兼容性要求较高时</li>
            </ul>
          </div>

          <div class="takeaway-card">
            <h3>何时使用 PerformanceObserver</h3>
            <ul>
              <li>需要实时性能监控时</li>
              <li>监控核心Web指标（LCP、FID、CLS）时</li>
              <li>避免轮询性能数据时</li>
              <li>减少内存占用时</li>
            </ul>
          </div>

          <div class="takeaway-card">
            <h3>最佳实践</h3>
            <ul>
              <li>结合使用两者以获得完整性能数据</li>
              <li>初始加载用Performance，运行时用Observer</li>
              <li>使用buffered: true获取历史数据</li>
              <li>及时disconnect不再需要的观察器</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="comparison-footer">
      <p> 前端性能监控指南 | Performance API vs PerformanceObserver</p>
      <div class="browser-support">
        支持浏览器: Chrome 52+, Firefox 57+, Edge 79+, Safari 11.1+
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const performanceData = ref([
  { name: 'Page Load', duration: '1.2s', api: 'Performance' },
  { name: 'Image Load', duration: '450ms', api: 'Both' },
  { name: 'Long Task', duration: '210ms', api: 'PerformanceObserver' },
  { name: 'Layout Shift', duration: '0.05', api: 'PerformanceObserver' },
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@performance-color: #9b59b6;
@observer-color: #e74c3c;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;

.performance-comparison {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.comparison-header {
  text-align: center;
  margin-bottom: 3rem;
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
  }
}

.comparison-overview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.overview-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .overview-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 0;
    color: @secondary-color;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.comparison-vs {
  font-size: 1.8rem;
  font-weight: bold;
  color: lighten(@text-color, 30%);
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
    transform: rotate(90deg);
  }
}

.comparison-content {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.core-differences,
.usage-comparison,
.use-cases,
.comparison-diagram,
.key-takeaways {
  padding: 2.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

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
}

.differences-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1.5rem;
}

.table-header {
  display: contents;

  .header-item {
    padding: 1.2rem;
    font-weight: 700;
    text-align: center;
    background: @background-light;

    &.performance-header {
      background: lighten(@performance-color, 40%);
      color: darken(@performance-color, 20%);
    }

    &.observer-header {
      background: lighten(@observer-color, 40%);
      color: darken(@observer-color, 20%);
    }
  }
}

.table-row {
  display: contents;

  .row-title {
    font-weight: 600;
    padding: 1rem;
    background: lighten(@background-light, 2%);
  }

  .row-item {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid @border-color;
  }

  &:nth-child(even) {

    .row-title,
    .row-item {
      background: lighten(@background-light, 1%);
    }
  }
}

.usage-examples {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.usage-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0;
    padding: 1.2rem;
    text-align: center;
    font-size: 1.4rem;

    &.performance-title {
      background: lighten(@performance-color, 40%);
      color: darken(@performance-color, 20%);
    }

    &.observer-title {
      background: lighten(@observer-color, 40%);
      color: darken(@observer-color, 20%);
    }
  }
}

.code-block {
  background: @code-bg;
  color: @code-color;
  padding: 1.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }

  code {
    display: block;

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

.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .case-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;

    &.performance {
      background: lighten(@performance-color, 40%);
      color: darken(@performance-color, 20%);
    }

    &.observer {
      background: lighten(@observer-color, 40%);
      color: darken(@observer-color, 20%);
    }

    &.combined {
      background: lighten(@accent-color, 40%);
      color: darken(@accent-color, 20%);
    }
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
}

.comparison-diagram {
  background: lighten(@background-light, 1%);
}

.diagram-container {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.diagram {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  h3 {
    text-align: center;
    margin-top: 0;
    color: @secondary-color;
  }
}

.performance-diagram {
  border-top: 4px solid @performance-color;
}

.observer-diagram {
  border-top: 4px solid @observer-color;
}

.step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  background: @background-light;
  border-radius: 8px;

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: @accent-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    font-weight: 500;
  }
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: @accent-color;
  margin: 0.5rem 0;
}

.takeaways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.takeaway-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
    border-bottom: 2px solid @accent-color;
    padding-bottom: 0.5rem;
    display: inline-block;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
}

.comparison-footer {
  text-align: center;
  padding: 1.5rem;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;

  .browser-support {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: lighten(@text-color, 40%);
  }
}

@media (max-width: 768px) {
  .comparison-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .core-differences,
  .usage-comparison,
  .use-cases,
  .comparison-diagram,
  .key-takeaways {
    padding: 1.5rem;
  }
}
</style>
