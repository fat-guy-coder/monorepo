<template>
  <div class="lighthouse-guide">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Lighthouse性能监控工具</h1>
        <p class="subtitle">全面提升你的Web应用性能</p>
        <div class="lighthouse-score">
          <div class="score-card" v-for="(score, index) in scores" :key="index">
            <div class="score-value" :style="{ color: score.color }">
              {{ score.value }}
            </div>
            <div class="score-title">{{ score.title }}</div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="graphic-lighthouse">
          <div class="tower">
            <div class="light-beam"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="section usage-section">
      <h2 class="section-title">如何使用Lighthouse</h2>
      <div class="usage-methods">
        <div class="method-card" v-for="(method, index) in usageMethods" :key="index">
          <div class="method-icon">{{ method.icon }}</div>
          <h3>{{ method.title }}</h3>
          <p>{{ method.description }}</p>
          <div class="method-steps">
            <div class="step" v-for="(step, stepIndex) in method.steps" :key="stepIndex">
              <span class="step-number">{{ stepIndex + 1 }}</span>
              {{ step }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section metrics-section">
      <h2 class="section-title">核心性能指标</h2>
      <div class="metrics-intro">
        Lighthouse报告包含六个核心性能指标，帮助你全面评估网站性能
      </div>
      <div class="metrics-grid">
        <div class="metric-card" v-for="(metric, index) in coreMetrics" :key="index">
          <div class="metric-header">
            <div class="metric-icon">{{ metric.icon }}</div>
            <div class="metric-name">{{ metric.name }}</div>
            <div class="metric-abbr">{{ metric.abbr }}</div>
          </div>
          <div class="metric-definition">
            {{ metric.definition }}
          </div>
          <div class="metric-target">
            <span class="target-label">目标值:</span>
            <span class="target-value">{{ metric.target }}</span>
          </div>
          <div class="metric-description">
            {{ metric.description }}
          </div>
          <div class="metric-impact">
            影响: <span :style="{ color: metric.impactColor }">{{ metric.impact }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section optimization-section">
      <h2 class="section-title">性能优化场景</h2>
      <div class="scenarios">
        <div class="scenario" v-for="(scenario, index) in optimizationScenarios" :key="index">
          <div class="scenario-header">
            <div class="scenario-icon">{{ scenario.icon }}</div>
            <h3>{{ scenario.title }}</h3>
          </div>
          <p>{{ scenario.description }}</p>
          <div class="optimization-tips">
            <div class="tip" v-for="(tip, tipIndex) in scenario.tips" :key="tipIndex">
              <span class="tip-icon">💡</span> {{ tip }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section report-section">
      <h2 class="section-title">解读Lighthouse报告</h2>
      <div class="report-preview">
        <div class="report-categories">
          <div class="category" v-for="(category, index) in reportCategories" :key="index">
            <div class="category-score" :style="{ background: category.color }">
              {{ category.score }}
            </div>
            <div class="category-name">{{ category.name }}</div>
          </div>
        </div>
        <div class="report-details">
          <div class="detail-item" v-for="(detail, index) in reportDetails" :key="index">
            <div class="detail-title">
              <span class="detail-icon">{{ detail.icon }}</span>
              {{ detail.title }}
            </div>
            <p>{{ detail.description }}</p>
            <div class="detail-actions" v-if="detail.actions">
              <span v-for="(action, actionIndex) in detail.actions" :key="actionIndex">
                {{ action }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="report-actions">
        <button class="action-btn primary">生成报告</button>
        <button class="action-btn secondary">保存结果</button>
        <button class="action-btn">导出为PDF</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Lighthouse评分示例
const scores = ref([
  { title: '性能', value: '92', color: '#0cce6b' },
  { title: '可访问性', value: '94', color: '#0cce6b' },
  { title: '最佳实践', value: '87', color: '#ffa400' },
  { title: 'SEO', value: '90', color: '#0cce6b' }
]);

// 使用方法
const usageMethods = ref([
  {
    icon: '🛠️',
    title: 'Chrome DevTools',
    description: '直接在浏览器中运行Lighthouse',
    steps: [
      '打开Chrome开发者工具',
      '切换到Lighthouse标签页',
      '选择需要测试的设备类型',
      '勾选需要评估的类别',
      '点击"生成报告"按钮'
    ]
  },
  {
    icon: '📱',
    title: 'Chrome扩展',
    description: '使用Lighthouse浏览器扩展',
    steps: [
      '安装Lighthouse Chrome扩展',
      '导航到要测试的页面',
      '点击浏览器工具栏中的Lighthouse图标',
      '选择生成报告选项',
      '等待分析完成查看结果'
    ]
  },
  {
    icon: '💻',
    title: '命令行工具',
    description: '通过Node.js命令行运行',
    steps: [
      '安装Node.js（v14或更高版本）',
      '运行 npm install -g lighthouse',
      '在终端输入命令 lighthouse [URL]',
      '添加选项如 --view查看报告',
      '使用--output参数导出报告'
    ]
  }
]);

// 核心性能指标
const coreMetrics = ref([
  {
    name: '首次内容绘制',
    abbr: 'FCP',
    icon: '⏱️',
    definition: '页面开始加载到任意内容首次呈现的时间',
    target: '<1.8秒',
    description: '衡量用户感知页面加载速度的关键指标',
    impact: '高',
    impactColor: '#e74c3c'
  },
  {
    name: '最大内容绘制',
    abbr: 'LCP',
    icon: '📊',
    definition: '视口中最大内容元素呈现所需时间',
    target: '<2.5秒',
    description: '衡量页面主要内容加载完成的时间点',
    impact: '高',
    impactColor: '#e74c3c'
  },
  {
    name: '累积布局偏移',
    abbr: 'CLS',
    icon: '📐',
    definition: '页面生命周期中意外布局偏移的评分',
    target: '<0.1',
    description: '量化页面视觉稳定性的指标',
    impact: '高',
    impactColor: '#e74c3c'
  },
  {
    name: '首次输入延迟',
    abbr: 'FID',
    icon: '⌨️',
    definition: '用户首次与页面交互到浏览器响应该交互的时间',
    target: '<100毫秒',
    description: '衡量页面交互响应速度的关键指标',
    impact: '中',
    impactColor: '#f39c12'
  },
  {
    name: '交互时间',
    abbr: 'TTI',
    icon: '⚡',
    definition: '页面完全交互所需的时间',
    target: '<3.8秒',
    description: '衡量页面需要多久才能完全可交互',
    impact: '中',
    impactColor: '#f39c12'
  },
  {
    name: '总阻塞时间',
    abbr: 'TBT',
    icon: '🚧',
    definition: 'FCP与TTI之间主线程被阻塞的总时间',
    target: '<200毫秒',
    description: '量化主线程被阻塞影响交互的指标',
    impact: '中',
    impactColor: '#f39c12'
  }
]);

// 优化场景
const optimizationScenarios = ref([
  {
    icon: '🚀',
    title: '首屏加载优化',
    description: '改善用户首次访问时的体验',
    tips: [
      '优化关键渲染路径',
      '延迟加载非关键资源',
      '移除未使用的CSS/JS',
      '使用CDN分发静态资源',
      '预加载关键资源'
    ]
  },
  {
    icon: '📱',
    title: '移动端性能优化',
    description: '针对移动设备优化页面性能',
    tips: [
      '实施响应式图片策略',
      '优化触摸事件处理',
      '压缩图片资源',
      '减少主线程工作量',
      '使用移动端友好的交互模式'
    ]
  },
  {
    icon: '🛒',
    title: '电子商务优化',
    description: '提高转化率的关键性能优化',
    tips: [
      '优化结账流程性能',
      '减少产品页加载时间',
      '优化图片加载策略',
      '预取关键用户路径资源',
      '确保搜索功能快速响应'
    ]
  }
]);

// 报告类别
const reportCategories = ref([
  { name: '性能', score: 92, color: '#0cce6b' },
  { name: '可访问性', score: 94, color: '#0cce6b' },
  { name: '最佳实践', score: 87, color: '#ffa400' },
  { name: 'SEO', score: 90, color: '#0cce6b' },
  { name: 'PWA', score: 70, color: '#ff4e42' }
]);

// 报告详情
const reportDetails = ref([
  {
    icon: '🔍',
    title: '性能诊断',
    description: '识别影响页面加载速度的关键因素',
    actions: ['查看机会', '诊断问题', '通过审核']
  },
  {
    icon: '📉',
    title: '指标分析',
    description: '详细的核心Web指标数据与时间线分析'
  },
  {
    icon: '✅',
    title: '通过审核',
    description: '您的页面符合最佳实践的项目列表'
  },
  {
    icon: '❗',
    title: '改进建议',
    description: '提升性能的具体可行建议和优化机会'
  }
]);
</script>

<style scoped lang="less">
@primary: #4285f4;
@secondary: #34a853;
@warning: #fbbc05;
@danger: #ea4335;
@light-bg: #f8f9fa;
@dark-text: #202124;
@light-text: #5f6368;
@radius: 12px;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.lighthouse-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @dark-text;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 30px;
  background: linear-gradient(135deg, #4285F4, #34A853);
  border-radius: @radius;
  margin-bottom: 40px;
  color: white;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,100 L0,100 Z" fill="rgba(255,255,255,0.05)"/></svg>');
    background-size: cover;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    margin-bottom: 30px;
  }
}

.lighthouse-score {
  display: flex;
  gap: 20px;

  .score-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 20px;
    min-width: 120px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .score-value {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .score-title {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.hero-image {
  .graphic-lighthouse {
    position: relative;
    width: 250px;
    height: 300px;

    .tower {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 220px;
      background: linear-gradient(to right, #f5f5f5, #e0e0e0);
      border-radius: 10px 10px 0 0;
      box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.1);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 30px;
        background: #e74c3c;
        border-radius: 50px 50px 0 0;
      }
    }

    .light-beam {
      position: absolute;
      top: -150px;
      left: 50%;
      transform: translateX(-50%) rotate(-30deg);
      width: 15px;
      height: 250px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      animation: sweep 6s infinite ease-in-out;
    }
  }
}

@keyframes sweep {

  0%,
  100% {
    transform: translateX(-50%) rotate(-30deg);
  }

  50% {
    transform: translateX(-50%) rotate(30deg);
  }
}

.section {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    color: @primary;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f1f3f4;
  }
}

.usage-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .method-card {
    border: 1px solid #e8eaed;
    border-radius: @radius;
    padding: 25px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .method-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 15px;
      color: @dark-text;
    }

    p {
      color: @light-text;
      line-height: 1.6;
      margin-bottom: 20px;
    }
  }
}

.method-steps {
  .step {
    padding: 12px 15px;
    background: @light-bg;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 0.95rem;

    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: @primary;
      color: white;
      border-radius: 50%;
      margin-right: 12px;
      flex-shrink: 0;
      font-size: 0.9rem;
    }
  }
}

.metrics-intro {
  background: #e8f0fe;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  color: #1a73e8;
  font-weight: 500;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.metric-card {
  border: 1px solid #e8eaed;
  border-radius: @radius;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: @primary;
    box-shadow: 0 5px 15px rgba(66, 133, 244, 0.1);
  }

  .metric-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .metric-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    color: @primary;
  }

  .metric-name {
    font-weight: 600;
    font-size: 1.2rem;
    flex: 1;
  }

  .metric-abbr {
    background: #e8f0fe;
    color: #1a73e8;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .metric-definition {
    font-weight: 500;
    margin-bottom: 12px;
    min-height: 60px;
  }

  .metric-target {
    margin-bottom: 15px;

    .target-label {
      color: @light-text;
    }

    .target-value {
      font-weight: 700;
      color: @secondary;
      margin-left: 8px;
    }
  }

  .metric-description {
    color: @light-text;
    font-size: 0.95rem;
    margin-bottom: 15px;
  }

  .metric-impact {
    font-weight: 500;
    padding-top: 10px;
    border-top: 1px dashed #e8eaed;
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.scenario {
  border: 1px solid #e8eaed;
  border-radius: @radius;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .scenario-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .scenario-icon {
    font-size: 2rem;
    margin-right: 15px;
    color: @primary;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0;
    color: @dark-text;
  }

  p {
    color: @light-text;
    line-height: 1.6;
    margin-bottom: 20px;
  }
}

.optimization-tips {
  background: @light-bg;
  border-radius: 8px;
  padding: 15px;

  .tip {
    padding: 10px 15px;
    background: white;
    border-radius: 6px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    .tip-icon {
      margin-right: 10px;
      font-size: 1.2rem;
    }
  }
}

.report-preview {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.report-categories {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;

  .category {
    background: white;
    border: 1px solid #e8eaed;
    border-radius: @radius;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .category-score {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin: 0 auto 15px;
  }

  .category-name {
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.report-details {
  flex: 2;

  .detail-item {
    background: white;
    border: 1px solid #e8eaed;
    border-radius: @radius;
    padding: 20px;
    margin-bottom: 20px;

    .detail-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }

    .detail-icon {
      font-size: 1.5rem;
      margin-right: 12px;
      color: @primary;
    }

    p {
      color: @light-text;
      line-height: 1.6;
      margin-bottom: 15px;
    }
  }
}

.detail-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  span {
    background: #e8f0fe;
    color: #1a73e8;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.report-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #e8eaed;
}

.action-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: @primary;
    color: white;

    &:hover {
      background: darken(@primary, 10%);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(66, 133, 244, 0.4);
    }
  }

  &.secondary {
    background: @secondary;
    color: white;

    &:hover {
      background: darken(@secondary, 10%);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(52, 168, 83, 0.4);
    }
  }

  &:not(.primary):not(.secondary) {
    background: white;
    border: 1px solid #e8eaed;
    color: @dark-text;

    &:hover {
      background: @light-bg;
      transform: translateY(-3px);
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;

    .lighthouse-score {
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  .report-actions {
    flex-wrap: wrap;
  }
}
</style>