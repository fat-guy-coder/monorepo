<template>
  <div class="performance-container">
    <!-- 封面标题 -->
    <header class="hero-banner">
      <h1 class="title">利用Performance监控性能</h1>
    </header>


    <!-- 核心指标 -->
    <section class="section">
      <h2 class="section-title">📊 核心性能指标</h2>
      <div class="metric-grid">
        <div v-for="metric in metrics" :key="metric.name" class="metric-card" @click="showDetail(metric)">
          <div class="metric-icon">{{ metric.emoji }}</div>
          <h3>{{ metric.name }}</h3>
          <p class="metric-value">{{ metric.value }}</p>
        </div>
      </div>
    </section>

    <!-- Performance API 介绍 -->
    <section class="section">
      <h2 class="section-title">📈 Performance API 介绍</h2>
      <p>Performance API 提供了一组接口，用于监控和测量网页性能。以下是一些主要的 API：</p>
      <ul>
        <li>
          <strong>performance.now(): </strong>
          返回当前时间戳，单位为毫秒。
        </li>
        <li>
          <strong>performance.mark(name: string):</strong>
          用于标记代码执行的特定点，便于后续测量。
        </li>
        <li>
          <strong>performance.measure(name: string, startMark?: string, endMark?: string):</strong>
          用于测量两个标记之间的时间差。
        </li>
        <li>
          <strong>performance.getEntriesByName(name: string):</strong>
          获取指定名称的性能条目，便于分析性能数据。
        </li>
        <li>
          <strong>performance.getEntriesByType(type: string):</strong>
          获取指定类型的所有性能条目，例如 'resource' 或 'paint'。
        </li>
        <li>
          <strong>performance.clearMarks(name?: string):</strong>
          清除指定名称的标记，帮助管理性能数据。
        </li>
        <li>
          <strong>performance.clearMeasures(name?: string):</strong>
          清除指定名称的测量，保持性能数据的整洁。
        </li>
      </ul>
      <p>通过这些 API，开发者可以深入了解应用的性能瓶颈，并进行相应的优化。</p>
    </section>

    <!-- 使用方法 -->
    <section class="section">
      <h2 class="section-title">🛠️ 使用方法</h2>
      <div class="usage-tabs">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <!-- 时间测量 -->
      <div v-show="activeTab === 'timing'" class="code-section">
        <pre class="code-block">// 标记开始点
performance.mark('startTask');

// 执行需要测量的代码
await heavyTask();

// 标记结束点
performance.mark('endTask');

// 测量时间差
performance.measure('taskDuration', 'startTask', 'endTask');

// 获取测量结果
const [measure] = performance.getEntriesByName('taskDuration');
console.log(`耗时: ${measure.duration}ms`);</pre>
      </div>

      <!-- 资源监控 -->
      <div v-show="activeTab === 'resource'" class="code-section">
        <pre class="code-block">// 获取所有资源加载信息
const resources = performance.getEntriesByType('resource');

// 分析图片加载性能
const images = resources.filter(entry =>
  entry.initiatorType === 'img'
);

// 计算平均加载时间
const avgLoadTime = images.reduce((sum, entry) =>
  sum + entry.duration, 0
) / images.length;</pre>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="section">
      <h2 class="section-title">🎯 使用场景</h2>
      <div class="scenario-grid">
        <div v-for="scenario in scenarios" :key="scenario.title" class="scenario-card">
          <div class="scenario-icon">{{ scenario.emoji }}</div>
          <h3>{{ scenario.title }}</h3>
          <p>{{ scenario.description }}</p>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type Metric = {
  name: string;
  value: string;
  emoji: string;
};

const activeTab = ref('timing');
const perfData = ref<Record<string, string>>({});

const metrics: Metric[] = [
  { name: 'FP', value: 'First Paint', emoji: '🖌️' },
  { name: 'FCP', value: 'First Contentful Paint', emoji: '🎨' },
  { name: 'LCP', value: 'Largest Contentful Paint', emoji: '🖼️' },
  { name: 'FID', value: 'First Input Delay', emoji: '⌨️' }
];

const tabs = [
  { id: 'timing', label: '时间测量' },
  { id: 'resource', label: '资源监控' }
];

const scenarios = [
  {
    title: '页面加载分析',
    emoji: '📈',
    description: '监控各阶段加载时间，优化首屏性能'
  },
  {
    title: '接口性能追踪',
    emoji: '🔗',
    description: '记录API请求耗时，定位慢查询'
  },
  {
    title: '用户交互监测',
    emoji: '🖱️',
    description: '跟踪点击/滚动等操作的响应速度'
  }
];

const showDetail = (metric: Metric) => {
  const entry = performance.getEntriesByName(metric.name)[0];
  if (entry) {
    alert(`${metric.name} 时间: ${entry.startTime.toFixed(2)}ms`);
  }
};



onMounted(() => {
  // 自动记录关键指标
  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach(entry => {
    console.log(`[Performance] ${entry.name}: ${entry.startTime}ms`);
  });
});
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@bg-color: #f8f9fa;

.performance-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;

  .hero-banner {
    text-align: center;
    padding: 1rem 1rem;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    border-radius: 1rem;
    margin-bottom: 2rem;

    .title {
      color: white;
      font-size: 2.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
    }
  }

  .section {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    &-title {
      color: @primary-color;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      border-left: 4px solid @secondary-color;
    }
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;

    .metric-card {
      padding: 1.5rem;
      border: 2px solid #eee;
      border-radius: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      }

      .metric-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .metric-value {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }

  .usage-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      background: @bg-color;
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: @secondary-color;
        color: white;
      }
    }
  }

  .code-block {
    background: #282c34;
    color: #abb2bf;
    padding: 1.5rem;
    border-radius: 0.8rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }

  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .scenario-card {
      padding: 1.5rem;
      border: 2px solid #eee;
      border-radius: 1rem;
      text-align: center;

      .scenario-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }

  .demo-box {
    text-align: center;

    .demo-btn {
      padding: 1rem 2rem;
      background: @secondary-color;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: darken(@secondary-color, 10%);
      }
    }

    .demo-result {
      margin-top: 2rem;

      .result-item {
        display: flex;
        justify-content: space-between;
        padding: 0.8rem;
        margin: 0.5rem 0;
        background: @bg-color;
        border-radius: 0.5rem;

        .result-label {
          font-weight: bold;
        }

        .result-value {
          color: @accent-color;
          font-family: monospace;
        }
      }
    }
  }
}
</style>
