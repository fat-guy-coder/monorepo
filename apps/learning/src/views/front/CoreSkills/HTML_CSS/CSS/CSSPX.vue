<template>
  <div class="pixel-guide">
    <h1 class="main-title">前端像素基本介绍</h1>

    <!-- 基础概念 -->
    <section class="concept-section">
      <h2 class="section-title">🔍 核心概念</h2>
      <div class="grid-container">
        <div class="concept-card" v-for="item in basicConcepts" :key="item.title">
          <h3>{{ item.title }}</h3>
          <div class="concept-content">
            <p>{{ item.definition }}</p>
            <div class="key-points">
              <p v-for="(point, index) in item.points" :key="index">▹ {{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术指标 -->
    <section class="metrics-section">
      <h2 class="section-title">📐 技术指标解析</h2>
      <div class="metric-grid">
        <div class="metric-card" v-for="metric in metrics" :key="metric.name">
          <div class="metric-header">
            <span class="abbr">{{ metric.abbr }}</span>
            <span class="name">{{ metric.name }}</span>
          </div>
          <div class="metric-body">
            <p>{{ metric.definition }}</p>
            <div class="formula" v-if="metric.formula">
              {{ metric.formula }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 生产处理方案 -->
    <section class="solution-section">
      <h2 class="section-title">⚙️ 生产环境解决方案</h2>
      <div class="solution-list">
        <div class="solution-item" v-for="(solution, index) in solutions" :key="index">
          <div class="solution-index">#{{ index + 1 }}</div>
          <div class="solution-content">
            <h3>{{ solution.title }}</h3>
            <p>{{ solution.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-grid">
        <div class="notice-card" v-for="(notice, index) in notices" :key="index">
          <div class="notice-icon">{{ notice.icon }}</div>
          <div class="notice-content">
            <h3>{{ notice.title }}</h3>
            <p>{{ notice.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const basicConcepts = reactive([
  {
    title: 'CSS像素',
    definition: '逻辑像素，浏览器使用的抽象单位',
    points: [
      '与设备无关的测量单位',
      '受缩放系数影响',
      '1px不一定对应1物理像素'
    ]
  },
  {
    title: '物理像素',
    definition: '设备屏幕的实际发光点',
    points: [
      '硬件层面的最小单位',
      '设备出厂固定值',
      '高密度屏幕包含更多物理像素'
    ]
  },
  {
    title: '设备独立像素(DIP)',
    definition: '与屏幕密度无关的抽象单位',
    points: [
      '操作系统使用的逻辑单位',
      '160 DIP ≈ 1英寸',
      '决定CSS像素的基准'
    ]
  }
])

const metrics = reactive([
  {
    name: '每英寸像素数',
    abbr: 'PPI',
    definition: '屏幕物理像素密度，计算公式：',
    formula: '√(水平像素² + 垂直像素²) / 屏幕对角线英寸数'
  },
  {
    name: '设备像素比',
    abbr: 'DPR',
    definition: '物理像素与CSS像素的比例',
    formula: 'DPR = 物理像素 / CSS像素'
  },
  {
    name: '点每英寸',
    abbr: 'DPI',
    definition: '印刷品像素密度度量标准',
    formula: '1英寸内的墨点数'
  }
])

const solutions = reactive([
  {
    title: '视口元标签配置',
    description: '通过viewport的initial-scale控制CSS像素缩放'
  },
  {
    title: '响应式像素适配',
    description: '使用rem配合媒体查询适配不同DPR设备'
  },
  {
    title: '高精度媒体查询',
    description: '@media (-webkit-min-device-pixel-ratio: 2)'
  },
  {
    title: '矢量图形优先',
    description: '使用SVG代替位图避免像素失真'
  }
])

const notices = reactive([
  {
    icon: '📱',
    title: '移动端适配',
    content: '注意iOS和Android的DPR差异'
  },
  {
    icon: '🖥️',
    title: '高分屏处理',
    content: '为2x/3x屏幕提供高清素材'
  },
  {
    icon: '⚡',
    title: '性能优化',
    content: '避免过多使用高精度媒体查询'
  }
])
</script>

<style lang="less" scoped>
.pixel-guide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background: #f9fafb;
}

.main-title {
  color: #111827;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: none;
}

.section-title {
  color: #2563eb;
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.grid-container,
.metric-grid,
.notice-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.concept-card,
.metric-card,
.notice-card {
  background: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.concept-card h3 {
  color: #2563eb;
  margin-bottom: 0.7rem;
}

.key-points {
  margin-top: 0.7rem;
  padding-left: 1rem;
  border-left: 2px solid #e5e7eb;
}

.metric-header .abbr {
  font-size: 1.2rem;
  color: #3b82f6;
  font-weight: 600;
  margin-right: 0.7rem;
}

.formula {
  margin-top: 0.7rem;
  padding: 0.5rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-family: monospace;
}

.solution-list {
  display: grid;
  gap: 1rem;
}

.solution-item {
  display: flex;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.solution-index {
  font-size: 1rem;
  color: #3b82f6;
  margin-right: 1rem;
}

.notice-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .pixel-guide {
    padding: 1rem;
  }
}
</style>
