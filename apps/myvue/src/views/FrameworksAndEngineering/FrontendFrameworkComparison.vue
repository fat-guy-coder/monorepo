<template>
  <div class="framework-comparison">
    <header class="page-header">
      <div class="header-content">
        <h1>前端框架深度对比</h1>
        <p class="subtitle">Vue、React、Angular、Svelte 全方位分析</p>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">4</span>
            <span class="stat-label">主流框架</span>
          </div>
          <div class="stat">
            <span class="stat-number">5+</span>
            <span class="stat-label">对比维度</span>
          </div>
          <div class="stat">
            <span class="stat-number">2024</span>
            <span class="stat-label">最新数据</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="intro-content">
          <h2>为什么需要框架对比？</h2>
          <p>
            选择合适的前端框架对项目成功至关重要。不同框架在性能、学习曲线、生态系统等方面各有优劣，本分析基于最新数据和实际项目经验，为您提供全面的决策参考。
          </p>
          <div class="quick-nav">
            <button
              v-for="nav in quickNavs"
              :key="nav.id"
              class="nav-button"
              :class="{ active: activeSection === nav.id }"
              @click="scrollToSection(nav.id)"
            >
              <span class="nav-icon">{{ nav.icon }}</span>
              {{ nav.title }}
            </button>
          </div>
        </div>
      </section>

      <section class="overview-section" id="overview">
        <h2 class="section-title">框架概览</h2>
        <div class="framework-cards">
          <div
            v-for="framework in frameworks"
            :key="framework.id"
            class="framework-card"
            :class="{ featured: featuredFramework === framework.id }"
            @mouseenter="featuredFramework = framework.id"
            @mouseleave="featuredFramework = null"
          >
            <div class="card-header">
              <div class="framework-logo">
                <span class="logo-icon">{{ framework.icon }}</span>
              </div>
              <div class="framework-info">
                <h3>{{ framework.name }}</h3>
                <p class="framework-meta">{{ framework.meta }}</p>
              </div>
              <div class="trend-indicator" :class="framework.trend">
                {{ framework.trend === 'up' ? '📈' : framework.trend === 'stable' ? '➡️' : '📉' }}
              </div>
            </div>
            <div class="card-body">
              <p class="framework-desc">{{ framework.description }}</p>
              <div class="framework-tags">
                <span v-for="tag in framework.tags" :key="tag" class="framework-tag">{{
                  tag
                }}</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="stat-item">
                <span class="stat-value">{{ framework?.stats?.stars }}</span>
                <span class="stat-label">GitHub Stars</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ framework?.stats?.community }}</span>
                <span class="stat-label">社区规模</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section" id="comparison">
        <h2 class="section-title">详细对比分析</h2>

        <div class="comparison-tabs">
          <button
            v-for="tab in comparisonTabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.title }}
          </button>
        </div>

        <div class="tab-content">
          <!-- 学习曲线对比 -->
          <div v-show="activeTab === 'learning'" class="comparison-content">
            <div class="learning-chart">
              <div v-for="item in learningCurveData" :key="item.framework" class="learning-item">
                <div class="framework-name">{{ item.framework }}</div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: item.ease + '%' }"
                    :class="item.framework.toLowerCase()"
                  ></div>
                  <span class="progress-text">{{ item.ease }}%</span>
                </div>
                <div class="difficulty-info">
                  <span class="difficulty-label">上手难度: {{ item.difficulty }}</span>
                  <span class="time-estimate">⏱️ {{ item.time }}</span>
                </div>
              </div>
            </div>

            <div class="learning-details">
              <h3>学习资源丰富度</h3>
              <div class="resources-grid">
                <div
                  v-for="resource in learningResources"
                  :key="resource.framework"
                  class="resource-item"
                >
                  <h4>{{ resource.framework }}</h4>
                  <div class="resource-stats">
                    <div class="stat">
                      <span class="stat-value">{{ resource.docs }}</span>
                      <span class="stat-label">文档质量</span>
                    </div>
                    <div class="stat">
                      <span class="stat-value">{{ resource.tutorials }}</span>
                      <span class="stat-label">教程数量</span>
                    </div>
                    <div class="stat">
                      <span class="stat-value">{{ resource.community }}</span>
                      <span class="stat-label">社区支持</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 性能对比 -->
          <div v-show="activeTab === 'performance'" class="comparison-content">
            <div class="performance-charts">
              <div class="chart-container">
                <h3>运行时性能对比</h3>
                <div class="bar-chart">
                  <div
                    v-for="metric in performanceData.runtime"
                    :key="metric.framework"
                    class="bar-item"
                  >
                    <div class="bar-label">{{ metric.framework }}</div>
                    <div class="bar-track">
                      <div
                        class="bar-fill"
                        :style="{ width: metric.score + '%' }"
                        :class="metric.framework.toLowerCase()"
                      ></div>
                      <span class="bar-value">{{ metric.score }}分</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chart-container">
                <h3>打包体积对比 (gzip)</h3>
                <div class="bar-chart">
                  <div
                    v-for="metric in performanceData.bundleSize"
                    :key="metric.framework"
                    class="bar-item"
                  >
                    <div class="bar-label">{{ metric.framework }}</div>
                    <div class="bar-track">
                      <div
                        class="bar-fill reverse"
                        :style="{ width: 100 - metric.size + '%' }"
                        :class="metric.framework.toLowerCase()"
                      ></div>
                      <span class="bar-value">{{ metric.size }}KB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="performance-details">
              <h3>性能关键指标</h3>
              <div class="metrics-grid">
                <div class="metric-card">
                  <h4>🚀 启动时间</h4>
                  <div class="ranking">
                    <div
                      v-for="item in performanceRankings.startup"
                      :key="item.framework"
                      class="rank-item"
                    >
                      <span class="rank">{{ item.rank }}</span>
                      <span class="framework">{{ item.framework }}</span>
                      <span class="time">{{ item.time }}ms</span>
                    </div>
                  </div>
                </div>
                <div class="metric-card">
                  <h4>📦 内存占用</h4>
                  <div class="ranking">
                    <div
                      v-for="item in performanceRankings.memory"
                      :key="item.framework"
                      class="rank-item"
                    >
                      <span class="rank">{{ item.rank }}</span>
                      <span class="framework">{{ item.framework }}</span>
                      <span class="time">{{ item.memory }}MB</span>
                    </div>
                  </div>
                </div>
                <div class="metric-card">
                  <h4>⚡ 渲染性能</h4>
                  <div class="ranking">
                    <div
                      v-for="item in performanceRankings.rendering"
                      :key="item.framework"
                      class="rank-item"
                    >
                      <span class="rank">{{ item.rank }}</span>
                      <span class="framework">{{ item.framework }}</span>
                      <span class="time">{{ item.fps }} FPS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 生态对比 -->
          <div v-show="activeTab === 'ecosystem'" class="comparison-content">
            <div class="ecosystem-overview">
              <h3>生态系统成熟度</h3>
              <div class="ecosystem-chart">
                <div v-for="eco in ecosystemData" :key="eco.framework" class="ecosystem-item">
                  <div class="eco-header">
                    <h4>{{ eco.framework }}</h4>
                    <span class="eco-score">{{ eco.maturity }}/10</span>
                  </div>
                  <div class="eco-details">
                    <div class="eco-metric">
                      <span class="metric-label">UI库数量</span>
                      <div class="metric-bar">
                        <div
                          class="metric-fill"
                          :style="{ width: eco.uiLibraries + '%' }"
                          :class="eco.framework.toLowerCase()"
                        ></div>
                      </div>
                      <span class="metric-value">{{ Math.round(eco.uiLibraries * 2) }}+</span>
                    </div>
                    <div class="eco-metric">
                      <span class="metric-label">状态管理</span>
                      <div class="metric-bar">
                        <div
                          class="metric-fill"
                          :style="{ width: eco.stateManagement + '%' }"
                          :class="eco.framework.toLowerCase()"
                        ></div>
                      </div>
                      <span class="metric-value">{{ eco.stateManagement }}/10</span>
                    </div>
                    <div class="eco-metric">
                      <span class="metric-label">工具链</span>
                      <div class="metric-bar">
                        <div
                          class="metric-fill"
                          :style="{ width: eco.tooling + '%' }"
                          :class="eco.framework.toLowerCase()"
                        ></div>
                      </div>
                      <span class="metric-value">{{ eco.tooling }}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="popular-libraries">
              <h3>热门库和工具</h3>
              <div class="libraries-grid">
                <div v-for="lib in popularLibraries" :key="lib.category" class="library-category">
                  <h4>{{ lib.category }}</h4>
                  <div class="library-list">
                    <div v-for="item in lib.items" :key="item.name" class="library-item">
                      <span class="lib-name">{{ item.name }}</span>
                      <span class="lib-framework" :class="item.framework">{{
                        item.framework
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 使用量对比 -->
          <div v-show="activeTab === 'usage'" class="comparison-content">
            <div class="usage-stats">
              <div class="usage-chart">
                <h3>全球使用分布</h3>
                <div class="global-usage">
                  <div v-for="usage in globalUsage" :key="usage.framework" class="usage-item">
                    <div class="usage-header">
                      <span class="framework-name">{{ usage.framework }}</span>
                      <span class="usage-percent">{{ usage.global }}%</span>
                    </div>
                    <div class="usage-bar">
                      <div
                        class="usage-fill"
                        :style="{ width: usage.global + '%' }"
                        :class="usage.framework.toLowerCase()"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="regional-usage">
                <h3>地区使用偏好</h3>
                <div class="region-comparison">
                  <div class="region-china">
                    <h4>🇨🇳 中国市场</h4>
                    <div class="region-data">
                      <div v-for="item in chinaUsage" :key="item.framework" class="region-item">
                        <span class="framework">{{ item.framework }}</span>
                        <span class="percentage">{{ item.percentage }}%</span>
                      </div>
                    </div>
                  </div>
                  <div class="region-global">
                    <h4>🌍 全球市场</h4>
                    <div class="region-data">
                      <div
                        v-for="item in globalMarketshare"
                        :key="item.framework"
                        class="region-item"
                      >
                        <span class="framework">{{ item.framework }}</span>
                        <span class="percentage">{{ item.percentage }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="trend-analysis">
              <h3>趋势分析</h3>
              <div class="trend-cards">
                <div class="trend-card">
                  <h4>📈 上升趋势</h4>
                  <p>Vue 3 和 Svelte 在中小型项目中增长迅速，React 在企业级市场保持稳定</p>
                </div>
                <div class="trend-card">
                  <h4>🏢 企业采用</h4>
                  <p>React 和 Angular 在企业级应用中占据主导，Vue 在创业公司中更受欢迎</p>
                </div>
                <div class="trend-card">
                  <h4>🚀 新兴技术</h4>
                  <p>Svelte 的编译时优化和 Qwik 的恢复性设计是未来发展方向</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="recommendation-section" id="recommendation">
        <h2 class="section-title">选型建议</h2>
        <div class="scenario-cards">
          <div v-for="scenario in usageScenarios" :key="scenario.id" class="scenario-card">
            <div class="scenario-header">
              <h3>{{ scenario.title }}</h3>
              <span class="scenario-icon">{{ scenario.icon }}</span>
            </div>
            <p class="scenario-desc">{{ scenario.description }}</p>
            <div class="recommendation">
              <strong>推荐框架:</strong>
              <div class="framework-recs">
                <span
                  v-for="rec in scenario.recommendations"
                  :key="rec.framework"
                  class="framework-rec"
                  :class="rec.framework.toLowerCase()"
                >
                  {{ rec.framework }} <span class="rec-reason">({{ rec.reason }})</span>
                </span>
              </div>
            </div>
            <div class="considerations">
              <strong>考虑因素:</strong>
              <ul>
                <li v-for="consideration in scenario.considerations" :key="consideration">
                  {{ consideration }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="conclusion-section">
        <h2 class="section-title">总结</h2>
        <div class="conclusion-content">
          <div class="key-takeaways">
            <h3>核心要点</h3>
            <div class="takeaway-list">
              <div v-for="takeaway in keyTakeaways" :key="takeaway.id" class="takeaway-item">
                <span class="takeaway-icon">{{ takeaway.icon }}</span>
                <div class="takeaway-content">
                  <h4>{{ takeaway.title }}</h4>
                  <p>{{ takeaway.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="final-thoughts">
            <h3>最终建议</h3>
            <p>
              没有"最好"的框架，只有"最适合"的框架。选择时应综合考虑团队技能、项目需求、长期维护和性能要求。
            </p>
            <div class="decision-factors">
              <div class="factor">
                <strong>团队熟悉度 > 框架流行度</strong>
                <p>选择团队最熟悉的框架通常比选择"最热门"的框架更有效率</p>
              </div>
              <div class="factor">
                <strong>项目需求 > 技术偏好</strong>
                <p>根据项目具体需求选择技术栈，而不是个人技术偏好</p>
              </div>
              <div class="factor">
                <strong>长期维护 > 快速开发</strong>
                <p>考虑项目的长期维护成本，而不仅仅是开发速度</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>前端框架对比分析</h3>
          <p>基于 2024 年最新数据和社区反馈 · 定期更新</p>
        </div>
        <div class="footer-links">
          <a href="https://vuejs.org" target="_blank">Vue.js</a>
          <a href="https://reactjs.org" target="_blank">React</a>
          <a href="https://angular.io" target="_blank">Angular</a>
          <a href="https://svelte.dev" target="_blank">Svelte</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeSection = ref('overview')
const featuredFramework = ref<string | null>(null)
const activeTab = ref('learning')

// 快速导航
const quickNavs = ref([
  { id: 'overview', title: '框架概览', icon: '👀' },
  { id: 'comparison', title: '详细对比', icon: '📊' },
  { id: 'recommendation', title: '选型建议', icon: '💡' },
])

// 框架概览数据
const frameworks = ref([
  {
    id: 'vue',
    name: 'Vue.js',
    meta: '渐进式框架',
    icon: '🟢',
    description: '易学易用，文档完善，适合中小型项目和快速原型开发',
    tags: ['响应式', '组合式API', '单文件组件'],
    trend: 'up',
    stats: {
      stars: '210k',
      community: '巨大',
    },
  },
  {
    id: 'react',
    name: 'React',
    meta: 'UI 库',
    icon: '🔵',
    description: 'Facebook维护，生态丰富，适合复杂应用和企业级项目',
    tags: ['虚拟DOM', 'JSX', 'Hook'],
    trend: 'stable',
    stats: {
      stars: '218k',
      community: '极大',
    },
  },
  {
    id: 'angular',
    name: 'Angular',
    meta: '完整框架',
    icon: '🔴',
    description: 'Google维护，功能全面，适合大型企业级应用',
    tags: ['TypeScript', '依赖注入', 'RxJS'],
    trend: 'stable',
    stats: {
      stars: '93k',
      community: '大',
    },
  },
  {
    id: 'svelte',
    name: 'Svelte',
    meta: '编译时框架',
    icon: '🟠',
    description: '无虚拟DOM，编译时优化，性能优秀，代码简洁',
    tags: ['无运行时', '响应式', '编译优化'],
    trend: 'up',
    stats: {
      stars: '75k',
      community: '快速增长',
    },
  },
])

// 对比标签页
const comparisonTabs = ref([
  { id: 'learning', title: '学习曲线', icon: '📚' },
  { id: 'performance', title: '性能对比', icon: '⚡' },
  { id: 'ecosystem', title: '生态系统', icon: '🌐' },
  { id: 'usage', title: '使用统计', icon: '📈' },
])

// 学习曲线数据
const learningCurveData = ref([
  { framework: 'Vue', ease: 85, difficulty: '简单', time: '1-2周' },
  { framework: 'React', ease: 70, difficulty: '中等', time: '2-3周' },
  { framework: 'Angular', ease: 50, difficulty: '困难', time: '3-4周' },
  { framework: 'Svelte', ease: 80, difficulty: '简单', time: '1-2周' },
])

const learningResources = ref([
  { framework: 'Vue', docs: 95, tutorials: 90, community: 88 },
  { framework: 'React', docs: 90, tutorials: 95, community: 95 },
  { framework: 'Angular', docs: 85, tutorials: 80, community: 85 },
  { framework: 'Svelte', docs: 80, tutorials: 75, community: 70 },
])

// 性能数据
const performanceData = ref({
  runtime: [
    { framework: 'Svelte', score: 95 },
    { framework: 'Vue', score: 88 },
    { framework: 'React', score: 82 },
    { framework: 'Angular', score: 78 },
  ],
  bundleSize: [
    { framework: 'Svelte', size: 15 },
    { framework: 'Vue', size: 34 },
    { framework: 'React', size: 42 },
    { framework: 'Angular', size: 143 },
  ],
})

const performanceRankings = ref({
  startup: [
    { rank: 1, framework: 'Svelte', time: 45 },
    { rank: 2, framework: 'Vue', time: 68 },
    { rank: 3, framework: 'React', time: 72 },
    { rank: 4, framework: 'Angular', time: 125 },
  ],
  memory: [
    { rank: 1, framework: 'Svelte', memory: 12 },
    { rank: 2, framework: 'Vue', memory: 18 },
    { rank: 3, framework: 'React', memory: 22 },
    { rank: 4, framework: 'Angular', memory: 35 },
  ],
  rendering: [
    { rank: 1, framework: 'Svelte', fps: 60 },
    { rank: 2, framework: 'Vue', fps: 58 },
    { rank: 3, framework: 'React', fps: 55 },
    { rank: 4, framework: 'Angular', fps: 52 },
  ],
})

// 生态系统数据
const ecosystemData = ref([
  { framework: 'React', maturity: 9.5, uiLibraries: 95, stateManagement: 95, tooling: 90 },
  { framework: 'Vue', maturity: 9.0, uiLibraries: 85, stateManagement: 88, tooling: 92 },
  { framework: 'Angular', maturity: 8.5, uiLibraries: 80, stateManagement: 90, tooling: 88 },
  { framework: 'Svelte', maturity: 7.0, uiLibraries: 60, stateManagement: 75, tooling: 80 },
])

const popularLibraries = ref([
  {
    category: '状态管理',
    items: [
      { name: 'Pinia', framework: 'vue' },
      { name: 'Redux', framework: 'react' },
      { name: 'NgRx', framework: 'angular' },
      { name: 'Stores', framework: 'svelte' },
    ],
  },
  {
    category: '路由',
    items: [
      { name: 'Vue Router', framework: 'vue' },
      { name: 'React Router', framework: 'react' },
      { name: 'Angular Router', framework: 'angular' },
      { name: 'SvelteKit', framework: 'svelte' },
    ],
  },
  {
    category: 'UI 框架',
    items: [
      { name: 'Element Plus', framework: 'vue' },
      { name: 'Ant Design', framework: 'react' },
      { name: 'Material UI', framework: 'react' },
      { name: 'PrimeNG', framework: 'angular' },
    ],
  },
  {
    category: '构建工具',
    items: [
      { name: 'Vite', framework: 'vue' },
      { name: 'Create React App', framework: 'react' },
      { name: 'Angular CLI', framework: 'angular' },
      { name: 'SvelteKit', framework: 'svelte' },
    ],
  },
])

// 使用量数据
const globalUsage = ref([
  { framework: 'React', global: 42 },
  { framework: 'Vue', global: 18 },
  { framework: 'Angular', global: 22 },
  { framework: 'Svelte', global: 8 },
])

const chinaUsage = ref([
  { framework: 'Vue', percentage: 45 },
  { framework: 'React', percentage: 35 },
  { framework: 'Angular', percentage: 12 },
  { framework: 'Svelte', percentage: 5 },
])

const globalMarketshare = ref([
  { framework: 'React', percentage: 40 },
  { framework: 'Angular', percentage: 25 },
  { framework: 'Vue', percentage: 18 },
  { framework: 'Svelte', percentage: 5 },
])

// 使用场景建议
const usageScenarios = ref([
  {
    id: 'startup',
    title: '创业公司/快速原型',
    icon: '🚀',
    description: '需要快速迭代和验证产品想法的场景',
    recommendations: [
      { framework: 'Vue', reason: '学习成本低，开发速度快' },
      { framework: 'React', reason: '生态丰富，招聘容易' },
    ],
    considerations: ['开发速度至关重要', '团队规模较小', '需求变化频繁'],
  },
  {
    id: 'enterprise',
    title: '大型企业应用',
    icon: '🏢',
    description: '需要长期维护和稳定性的复杂业务系统',
    recommendations: [
      { framework: 'Angular', reason: '完整的解决方案，强类型' },
      { framework: 'React', reason: '生态成熟，社区活跃' },
    ],
    considerations: ['代码可维护性', '团队协作规范', '长期技术债务'],
  },
  {
    id: 'performance',
    title: '高性能应用',
    icon: '⚡',
    description: '对性能有极致要求的应用场景',
    recommendations: [
      { framework: 'Svelte', reason: '编译时优化，运行时轻量' },
      { framework: 'Vue', reason: '性能优秀，渐进式采用' },
    ],
    considerations: ['首屏加载时间', '运行时性能', '包体积大小'],
  },
  {
    id: 'legacy',
    title: '现有系统维护',
    icon: '🔧',
    description: '维护和升级现有的前端项目',
    recommendations: [
      { framework: '保持原有技术栈', reason: '降低迁移成本' },
      { framework: '渐进式迁移', reason: '平稳过渡' },
    ],
    considerations: ['现有团队技能', '迁移成本评估', '业务连续性'],
  },
])

// 核心要点
const keyTakeaways = ref([
  {
    id: 'performance',
    icon: '⚡',
    title: '性能不是唯一标准',
    description: 'Svelte在性能测试中表现优异，但实际项目中团队效率和生态支持同样重要',
  },
  {
    id: 'ecosystem',
    icon: '🌐',
    title: '生态决定上限',
    description: 'React拥有最丰富的生态，Angular提供最完整的解决方案，Vue平衡了易用性和功能',
  },
  {
    id: 'learning',
    icon: '📚',
    title: '学习曲线影响团队效率',
    description: 'Vue和Svelte更容易上手，React和Angular需要更多学习时间但功能更强大',
  },
  {
    id: 'trend',
    icon: '📈',
    title: '关注技术趋势',
    description: '编译时优化、类型安全、开发体验是当前前端发展的重要方向',
  },
])

// 方法
const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="less" scoped>
.framework-comparison {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  max-width: 1200px;
  margin:  0 auto;
  font-family:
    'Inter',
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>')
      no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2d3748;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
}

// 介绍区域样式
.intro-section {
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }

  .quick-nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #4a5568;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: white;
      border-color: #667eea;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-color: #667eea;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .nav-icon {
      font-size: 1.2rem;
    }
  }
}

// 框架概览样式
.framework-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.framework-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover,
  &.featured {
    background: white;
    border-color: #667eea;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-bottom: 1px solid #e2e8f0;

    .framework-logo {
      margin-right: 1rem;

      .logo-icon {
        font-size: 2.5rem;
      }
    }

    .framework-info {
      flex: 1;

      h3 {
        margin: 0 0 0.25rem 0;
        color: #2d3748;
        font-size: 1.3rem;
      }

      .framework-meta {
        margin: 0;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }

    .trend-indicator {
      font-size: 1.2rem;
    }
  }

  .card-body {
    padding: 1.5rem;

    .framework-desc {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .framework-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .framework-tag {
      background: #e0e7ff;
      color: #3730a3;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  .card-footer {
    display: flex;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;

    .stat-item {
      flex: 1;
      text-align: center;

      .stat-value {
        display: block;
        font-size: 1.1rem;
        font-weight: 700;
        color: #2d3748;
      }

      .stat-label {
        font-size: 0.8rem;
        color: #6b7280;
      }
    }
  }
}

// 对比标签页样式
.comparison-section {
  .comparison-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #4a5568;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: white;
      border-color: #667eea;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-color: #667eea;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .tab-icon {
      font-size: 1.2rem;
    }
  }

  .tab-content {
    min-height: 500px;
  }
}

// 学习曲线样式
.learning-chart {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.learning-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;

  .framework-name {
    font-weight: 600;
    color: #2d3748;
  }

  .progress-bar {
    position: relative;
    background: #e2e8f0;
    border-radius: 20px;
    height: 30px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      border-radius: 20px;
      transition: width 0.8s ease;

      &.vue {
        background: linear-gradient(90deg, #42b883, #347474);
      }
      &.react {
        background: linear-gradient(90deg, #61dafb, #2d79c7);
      }
      &.angular {
        background: linear-gradient(90deg, #dd0031, #b52e31);
      }
      &.svelte {
        background: linear-gradient(90deg, #ff3e00, #d83a00);
      }
    }

    .progress-text {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .difficulty-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;

    .difficulty-label {
      font-size: 0.9rem;
      color: #4a5568;
    }

    .time-estimate {
      font-size: 0.8rem;
      color: #6b7280;
    }
  }
}

.learning-details {
  h3 {
    margin-bottom: 1rem;
    color: #2d3748;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .resource-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;

    h4 {
      margin: 0 0 1rem 0;
      color: #2d3748;
    }

    .resource-stats {
      display: flex;
      justify-content: space-around;

      .stat {
        text-align: center;

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #6b7280;
        }
      }
    }
  }
}

// 性能对比样式
.performance-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.chart-container {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;

  h3 {
    margin: 0 0 1.5rem 0;
    text-align: center;
    color: #2d3748;
  }
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  align-items: center;

  .bar-label {
    font-weight: 600;
    color: #2d3748;
  }

  .bar-track {
    position: relative;
    background: #e2e8f0;
    border-radius: 20px;
    height: 25px;
    overflow: hidden;

    .bar-fill {
      height: 100%;
      border-radius: 20px;
      transition: width 0.8s ease;

      &.vue {
        background: linear-gradient(90deg, #42b883, #347474);
      }
      &.react {
        background: linear-gradient(90deg, #61dafb, #2d79c7);
      }
      &.angular {
        background: linear-gradient(90deg, #dd0031, #b52e31);
      }
      &.svelte {
        background: linear-gradient(90deg, #ff3e00, #d83a00);
      }

      &.reverse {
        margin-left: auto;
      }
    }

    .bar-value {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-weight: 600;
      font-size: 0.8rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
}

.performance-details {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .metric-card {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin: 0 0 1rem 0;
      color: #2d3748;
    }

    .ranking {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .rank-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      background: white;
      border-radius: 6px;

      .rank {
        width: 24px;
        height: 24px;
        background: #667eea;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 600;
      }

      .framework {
        flex: 1;
        font-weight: 500;
        color: #2d3748;
      }

      .time {
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

// 生态系统样式
.ecosystem-overview {
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .ecosystem-chart {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .ecosystem-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;

    .eco-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h4 {
        margin: 0;
        color: #2d3748;
      }

      .eco-score {
        background: #667eea;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-weight: 600;
      }
    }

    .eco-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .eco-metric {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: 0.75rem;
      align-items: center;

      .metric-label {
        font-size: 0.9rem;
        color: #4a5568;
      }

      .metric-bar {
        background: #e2e8f0;
        border-radius: 10px;
        height: 8px;
        overflow: hidden;

        .metric-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.8s ease;

          &.vue {
            background: #42b883;
          }
          &.react {
            background: #61dafb;
          }
          &.angular {
            background: #dd0031;
          }
          &.svelte {
            background: #ff3e00;
          }
        }
      }

      .metric-value {
        font-size: 0.9rem;
        color: #6b7280;
        font-weight: 500;
      }
    }
  }
}

.popular-libraries {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .libraries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .library-category {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin: 0 0 1rem 0;
      color: #2d3748;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }

    .library-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .library-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: white;
      border-radius: 6px;

      .lib-name {
        font-weight: 500;
        color: #2d3748;
      }

      .lib-framework {
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;

        &.vue {
          background: #42b883;
          color: white;
        }
        &.react {
          background: #61dafb;
          color: #1a365d;
        }
        &.angular {
          background: #dd0031;
          color: white;
        }
        &.svelte {
          background: #ff3e00;
          color: white;
        }
      }
    }
  }
}

// 使用量样式
.usage-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.usage-chart {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .global-usage {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .usage-item {
    .usage-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      .framework-name {
        font-weight: 600;
        color: #2d3748;
      }

      .usage-percent {
        color: #6b7280;
        font-weight: 600;
      }
    }

    .usage-bar {
      background: #e2e8f0;
      border-radius: 10px;
      height: 20px;
      overflow: hidden;

      .usage-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 0.8s ease;

        &.vue {
          background: linear-gradient(90deg, #42b883, #347474);
        }
        &.react {
          background: linear-gradient(90deg, #61dafb, #2d79c7);
        }
        &.angular {
          background: linear-gradient(90deg, #dd0031, #b52e31);
        }
        &.svelte {
          background: linear-gradient(90deg, #ff3e00, #d83a00);
        }
      }
    }
  }
}

.regional-usage {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .region-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .region-china,
  .region-global {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin: 0 0 1rem 0;
      color: #2d3748;
    }

    .region-data {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .region-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: white;
      border-radius: 6px;

      .framework {
        font-weight: 500;
        color: #2d3748;
      }

      .percentage {
        color: #6b7280;
        font-weight: 600;
      }
    }
  }
}

.trend-analysis {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .trend-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .trend-card {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin: 0 0 0.75rem 0;
      color: #2d3748;
    }

    p {
      margin: 0;
      color: #4a5568;
      line-height: 1.5;
    }
  }
}

// 选型建议样式
.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.scenario-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #667eea;

  .scenario-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      color: #2d3748;
      font-size: 1.3rem;
    }

    .scenario-icon {
      font-size: 2rem;
    }
  }

  .scenario-desc {
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .recommendation {
    margin-bottom: 1.5rem;

    strong {
      display: block;
      margin-bottom: 0.75rem;
      color: #2d3748;
    }

    .framework-recs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .framework-rec {
      padding: 0.5rem 0.75rem;
      background: white;
      border-radius: 6px;
      border-left: 4px solid;

      &.vue {
        border-left-color: #42b883;
      }
      &.react {
        border-left-color: #61dafb;
      }
      &.angular {
        border-left-color: #dd0031;
      }
      &.svelte {
        border-left-color: #ff3e00;
      }

      .rec-reason {
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }

  .considerations {
    strong {
      display: block;
      margin-bottom: 0.75rem;
      color: #2d3748;
    }

    ul {
      margin: 0;
      padding-left: 1.5rem;
      color: #4a5568;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
}

// 总结样式
.conclusion-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.key-takeaways {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  .takeaway-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .takeaway-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;

    .takeaway-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .takeaway-content {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
      }

      p {
        margin: 0;
        color: #4a5568;
        line-height: 1.5;
      }
    }
  }
}

.final-thoughts {
  h3 {
    margin-bottom: 1.5rem;
    color: #2d3748;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .decision-factors {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .factor {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;

    strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #2d3748;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: #4a5568;
      line-height: 1.5;
    }
  }
}

// 页脚样式
.page-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.8rem !important;
    }
  }

  .framework-cards {
    grid-template-columns: 1fr;
  }

  .comparison-tabs {
    flex-direction: column;
  }

  .tab-button {
    justify-content: center;
  }

  .learning-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
