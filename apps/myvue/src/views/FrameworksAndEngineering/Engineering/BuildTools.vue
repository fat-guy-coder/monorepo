<template>
  <div class="build-tools-intro">
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">前端构建工具演进与比较</h1>
        <p class="subtitle">从任务运行器到下一代打包工具</p>
        <div class="tool-logos">
          <div class="logo-item" v-for="tool in featuredTools" :key="tool.name">
            <div class="logo" :style="{ backgroundColor: tool.color }">
              {{ tool.abbr }}
            </div>
            <span class="logo-name">{{ tool.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <nav class="nav-sidebar">
        <ul class="nav-list">
          <li
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="scrollToSection(section.id)"
          >
            <span class="nav-icon">{{ section.icon }}</span>
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 发展历史 -->
        <section id="history" class="content-section">
          <h2>发展历史</h2>
          <p>前端构建工具的发展经历了从简单的任务运行器到复杂的模块打包器，再到现代的零配置构建工具的过程。</p>

          <div class="timeline">
            <div class="timeline-item" v-for="item in timeline" :key="item.year">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <div class="timeline-tools">
                  <span
                    v-for="tool in item.tools"
                    :key="tool"
                    class="tool-tag"
                    :style="{ backgroundColor: getToolColor(tool) }"
                  >
                    {{ tool }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 功能对比 -->
        <section id="features" class="content-section">
          <h2>功能对比</h2>
          <p>现代构建工具在功能上各有侧重，但都致力于提升开发体验和构建性能。</p>

          <div class="feature-comparison">
            <div class="comparison-table">
              <div class="table-header">
                <div class="table-cell">功能</div>
                <div class="table-cell" v-for="tool in comparisonTools" :key="tool">
                  {{ tool }}
                </div>
              </div>
              <div class="table-row" v-for="feature in features" :key="feature.name">
                <div class="table-cell feature-name">{{ feature.name }}</div>
                <div
                  class="table-cell"
                  v-for="tool in comparisonTools"
                  :key="tool"
                  :class="{
                    'supported': feature[tool as keyof typeof feature] === true,
                    'partial': feature[tool as keyof typeof feature] === 'partial',
                    'unsupported': feature[tool as keyof typeof feature] === false
                  }"
                >
                  <span v-if="feature[tool as keyof typeof feature  ] === true">✓</span>
                  <span v-else-if="feature[tool as keyof typeof feature] === 'partial'">~</span>
                  <span v-else-if="feature[tool as keyof typeof feature] === false">✗</span>
                  <span v-else>{{ feature[tool as keyof typeof feature] }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="feature-details">
            <h3>核心功能详解</h3>
            <div class="feature-grid">
              <div class="feature-card" v-for="detail in featureDetails" :key="detail.title">
                <h4>{{ detail.title }}</h4>
                <p>{{ detail.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 性能对比 -->
        <section id="performance" class="content-section">
          <h2>性能对比</h2>
          <p>构建性能直接影响开发效率和部署速度，是选择构建工具的重要考量因素。</p>

          <div class="performance-charts">
            <div class="chart-container">
              <h3>冷启动时间 (秒)</h3>
              <div class="bar-chart">
                <div
                  class="bar"
                  v-for="tool in performanceData.coldStart"
                  :key="tool.name"
                  :style="{ width: `${(tool.value / maxColdStart) * 90 + 10}%`, backgroundColor: getToolColor(tool.name) }"
                >
                  <span class="bar-label">{{ tool.name }}: {{ tool.value }}s</span>
                </div>
              </div>
            </div>

            <div class="chart-container">
              <h3>热更新速度 (毫秒)</h3>
              <div class="bar-chart">
                <div
                  class="bar"
                  v-for="tool in performanceData.hmr"
                  :key="tool.name"
                  :style="{ width: `${100 - (tool.value / maxHmr) * 90}%`, backgroundColor: getToolColor(tool.name) }"
                >
                  <span class="bar-label">{{ tool.name }}: {{ tool.value }}ms</span>
                </div>
              </div>
            </div>
          </div>

          <div class="performance-tips">
            <h3>性能优化建议</h3>
            <ul>
              <li>使用ESBuild或SWC等Rust/Go编写的工具进行转译</li>
              <li>合理配置缓存策略，减少重复工作</li>
              <li>使用模块联邦等现代技术实现微前端架构</li>
              <li>按需加载和代码分割减少初始包大小</li>
            </ul>
          </div>
        </section>

        <!-- 兼容性 -->
        <section id="compatibility" class="content-section">
          <h2>兼容性</h2>
          <p>不同构建工具对模块系统、浏览器支持和开发环境的兼容性各不相同。</p>

          <div class="compatibility-grid">
            <div class="compat-item" v-for="compat in compatibility" :key="compat.category">
              <h3>{{ compat.category }}</h3>
              <div class="compat-details">
                <div
                  class="compat-tool"
                  v-for="tool in compat.tools"
                  :key="tool.name"
                >
                  <span class="tool-name">{{ tool.name }}</span>
                  <div class="compat-level">
                    <div
                      class="level-bar"
                      :style="{ width: `${tool.level}%`, backgroundColor: getToolColor(tool.name) }"
                    ></div>
                    <span class="level-text">{{ tool.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 生态系统 -->
        <section id="ecosystem" class="content-section">
          <h2>生态系统</h2>
          <p>丰富的插件生态和社区支持是构建工具成功的关键因素。</p>

          <div class="ecosystem-stats">
            <div class="stat-card" v-for="stat in ecosystemStats" :key="stat.tool">
              <div class="stat-header">
                <h3>{{ stat.tool }}</h3>
                <div class="stat-logo" :style="{ backgroundColor: getToolColor(stat.tool) }">
                  {{ getToolAbbr(stat.tool) }}
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-item">
                  <span class="stat-label">NPM周下载量</span>
                  <span class="stat-value">{{ stat.weeklyDownloads }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">GitHub Stars</span>
                  <span class="stat-value">{{ stat.githubStars }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">插件数量</span>
                  <span class="stat-value">{{ stat.plugins }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">首次发布</span>
                  <span class="stat-value">{{ stat.firstRelease }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 热度趋势 -->
        <section id="trends" class="content-section">
          <h2>热度趋势</h2>
          <p>通过NPM下载量和Google搜索趋势可以了解各构建工具的发展态势。</p>

          <div class="trend-charts">
            <div class="trend-container">
              <h3>NPM周下载量趋势 (万)</h3>
              <div class="trend-chart">
                <div
                  class="trend-line"
                  v-for="tool in trendData"
                  :key="tool.name"
                >
                  <div class="tool-trend">
                    <span class="tool-name">{{ tool.name }}</span>
                    <div class="trend-points">
                      <div
                        class="point"
                        v-for="(value, year) in tool.downloads"
                        :key="year"
                        :style="{
                          left: `${(parseInt(year) - 2018) * 25}%`,
                          bottom: `${(value as number / maxDownloads) * 80}%`,
                          backgroundColor: getToolColor(tool.name)
                        }"
                        :title="`${year}: ${value}万`"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="selection-guide">
            <h3>工具选择指南</h3>
            <div class="guide-cards">
              <div class="guide-card" v-for="guide in selectionGuides" :key="guide.scenario">
                <h4>{{ guide.scenario }}</h4>
                <p>{{ guide.description }}</p>
                <div class="recommended-tools">
                  <span
                    v-for="tool in guide.tools"
                    :key="tool"
                    class="tool-tag"
                    :style="{ backgroundColor: getToolColor(tool) }"
                  >
                    {{ tool }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="page-footer">
      <p>前端构建工具 - 持续演进，助力高效开发</p>
      <p class="update-time">数据更新于: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 响应式数据
const activeSection = ref('history');
const currentDate = new Date().toLocaleDateString('zh-CN');

// 精选工具展示
const featuredTools = [
  { name: 'Webpack', abbr: 'W', color: '#8dd6f9' },
  { name: 'Vite', abbr: 'V', color: '#ffd859' },
  { name: 'Rollup', abbr: 'R', color: '#ff3333' },
  { name: 'Parcel', abbr: 'P', color: '#bb8cf9' },
  { name: 'esbuild', abbr: 'E', color: '#6ce5a7' },
  { name: 'Snowpack', abbr: 'S', color: '#5bc0de' }
];

// 导航章节
const sections = [
  { id: 'history', title: '发展历史', icon: '📅' },
  { id: 'features', title: '功能对比', icon: '⚙️' },
  { id: 'performance', title: '性能对比', icon: '🚀' },
  { id: 'compatibility', title: '兼容性', icon: '🔧' },
  { id: 'ecosystem', title: '生态系统', icon: '🌐' },
  { id: 'trends', title: '热度趋势', icon: '📈' }
];

// 发展时间线
const timeline = [
  {
    year: '2012',
    title: '任务运行器时代',
    description: 'Grunt 和 Gulp 等任务运行器出现，通过配置任务自动化前端工作流',
    tools: ['Grunt', 'Gulp']
  },
  {
    year: '2014',
    title: '模块打包器兴起',
    description: 'Webpack 发布，引入模块化打包概念，支持各种资源类型',
    tools: ['Webpack', 'Browserify']
  },
  {
    year: '2017',
    title: '零配置工具',
    description: 'Parcel 推出零配置构建工具，简化构建流程',
    tools: ['Parcel']
  },
  {
    year: '2018',
    title: '原生ES模块',
    description: 'Snowpack 利用原生ES模块，实现更快的开发服务器启动',
    tools: ['Snowpack']
  },
  {
    year: '2020',
    title: '下一代工具',
    description: 'Vite 和 esbuild 采用Go/Rust编写，显著提升构建性能',
    tools: ['Vite', 'esbuild']
  }
];

// 功能对比数据
const comparisonTools = ['Webpack', 'Vite', 'Rollup', 'Parcel', 'esbuild'];
const features = [
  { name: 'HMR热更新', Webpack: true, Vite: true, Rollup: false, Parcel: true, esbuild: false },
  { name: '代码分割', Webpack: true, Vite: true, Rollup: true, Parcel: true, esbuild: 'partial' },
  { name: 'Tree Shaking', Webpack: true, Vite: true, Rollup: true, Parcel: true, esbuild: true },
  { name: 'CSS处理', Webpack: true, Vite: true, Rollup: 'plugin', Parcel: true, esbuild: true },
  { name: 'TypeScript', Webpack: 'loader', Vite: true, Rollup: 'plugin', Parcel: true, esbuild: true },
  { name: '零配置', Webpack: false, Vite: true, Rollup: false, Parcel: true, esbuild: true },
  { name: '多页面应用', Webpack: true, Vite: 'plugin', Rollup: 'plugin', Parcel: true, esbuild: false }
];

// 功能详解
const featureDetails = [
  {
    title: '模块联邦',
    description: 'Webpack 5 引入的微前端解决方案，允许在运行时动态加载远程模块'
  },
  {
    title: '依赖预构建',
    description: 'Vite 在首次启动时预构建依赖，将CommonJS转换为ESM，提升后续加载速度'
  },
  {
    title: '持久缓存',
    description: '现代构建工具利用文件系统缓存，避免重复处理未变化的模块'
  },
  {
    title: '懒编译',
    description: '按需编译和代码分割，只构建当前路由需要的代码，提升开发体验'
  }
];

// 性能数据
const performanceData = {
  coldStart: [
    { name: 'Webpack', value: 12.5 },
    { name: 'Vite', value: 0.3 },
    { name: 'Rollup', value: 8.2 },
    { name: 'Parcel', value: 4.7 },
    { name: 'esbuild', value: 0.1 }
  ],
  hmr: [
    { name: 'Webpack', value: 450 },
    { name: 'Vite', value: 50 },
    { name: 'Rollup', value: 0 },
    { name: 'Parcel', value: 120 },
    { name: 'esbuild', value: 10 }
  ]
};

// 计算最大值的计算属性
const maxColdStart = computed(() => Math.max(...performanceData.coldStart.map(t => t.value)));
const maxHmr = computed(() => Math.max(...performanceData.hmr.map(t => t.value)));

// 兼容性数据
const compatibility = [
  {
    category: '模块系统',
    tools: [
      { name: 'Webpack', level: 95 },
      { name: 'Vite', level: 90 },
      { name: 'Rollup', level: 85 },
      { name: 'Parcel', level: 88 },
      { name: 'esbuild', level: 80 }
    ]
  },
  {
    category: '浏览器支持',
    tools: [
      { name: 'Webpack', level: 98 },
      { name: 'Vite', level: 92 },
      { name: 'Rollup', level: 90 },
      { name: 'Parcel', level: 95 },
      { name: 'esbuild', level: 85 }
    ]
  },
  {
    category: '开发体验',
    tools: [
      { name: 'Webpack', level: 85 },
      { name: 'Vite', level: 95 },
      { name: 'Rollup', level: 75 },
      { name: 'Parcel', level: 90 },
      { name: 'esbuild', level: 70 }
    ]
  }
];

// 生态系统数据
const ecosystemStats = [
  {
    tool: 'Webpack',
    weeklyDownloads: '25,000,000',
    githubStars: '63k',
    plugins: '2000+',
    firstRelease: '2014'
  },
  {
    tool: 'Vite',
    weeklyDownloads: '3,500,000',
    githubStars: '58k',
    plugins: '400+',
    firstRelease: '2020'
  },
  {
    tool: 'Rollup',
    weeklyDownloads: '15,000,000',
    githubStars: '23k',
    plugins: '800+',
    firstRelease: '2015'
  },
  {
    tool: 'Parcel',
    weeklyDownloads: '800,000',
    githubStars: '42k',
    plugins: '100+',
    firstRelease: '2017'
  }
];

// 趋势数据
const trendData = [
  {
    name: 'Webpack',
    downloads: {
      '2018': 1200,
      '2019': 1500,
      '2020': 1800,
      '2021': 2100,
      '2022': 2500
    }
  },
  {
    name: 'Vite',
    downloads: {
      '2020': 50,
      '2021': 800,
      '2022': 3500
    }
  },
  {
    name: 'Rollup',
    downloads: {
      '2018': 600,
      '2019': 800,
      '2020': 1000,
      '2021': 1300,
      '2022': 1500
    }
  }
];

// 计算最大下载量
const maxDownloads = computed(() => {
  let max = 0;
  trendData.forEach(tool => {
    Object.values(tool.downloads).forEach(value => {
      if (value > max) max = value;
    });
  });
  return max;
});

// 选择指南
const selectionGuides = [
  {
    scenario: '企业级应用',
    description: '需要稳定、功能全面、有长期维护保障的构建工具',
    tools: ['Webpack', 'Rollup']
  },
  {
    scenario: '现代框架开发',
    description: '追求极致开发体验，快速启动和热更新',
    tools: ['Vite', 'Snowpack']
  },
  {
    scenario: '库/组件开发',
    description: '需要生成多种格式的打包输出，体积优化重要',
    tools: ['Rollup', 'esbuild']
  },
  {
    scenario: '快速原型',
    description: '零配置，开箱即用，快速开始项目',
    tools: ['Parcel', 'Vite']
  }
];

// 工具颜色映射
const getToolColor = (toolName: string) => {
  const tool = featuredTools.find(t => t.name === toolName);
  return tool ? tool.color : '#cccccc';
};

// 工具缩写
const getToolAbbr = (toolName: string) => {
  const tool = featuredTools.find(t => t.name === toolName);
  return tool ? tool.abbr : '?';
};

// 滚动到指定章节
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动以更新活动章节
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #3498db;
@primary-dark: #2980b9;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@text-light: #7f8c8d;
@border-color: #e1e8ed;
@bg-color: #ffffff;
@sidebar-bg: #f8fafc;
@card-bg: #fdfdfd;
@shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@shadow-hover: 0 8px 24px 0 rgba(0, 0, 0, 0.15);

// 基础样式
.build-tools-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @bg-color;
  min-height: 100vh;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, @primary-color 0%, @primary-dark 100%);
  color: white;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    margin: 0 0 2.5rem;
    font-weight: 400;
  }

  .tool-logos {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

    .logo-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .logo {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .logo-name {
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
}

// 内容布局
.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 2rem;
}

// 导航侧边栏
.nav-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: @sidebar-bg;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @shadow;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      &:hover {
        background-color: darken(@sidebar-bg, 2%);
        color: @primary-color;
      }

      &.active {
        background-color: white;
        color: @primary-color;
        border-left-color: @primary-color;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  max-width: 880px;
}

// 内容区块
.content-section {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: @shadow;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid @border-color;
    color: @primary-dark;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h4 {
    font-size: 1.1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: @text-color;
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      position: relative;

      &::marker {
        color: @primary-color;
      }
    }
  }
}

// 时间线样式
.timeline {
  position: relative;
  margin: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: @primary-color;
    opacity: 0.3;
  }

  .timeline-item {
    display: flex;
    margin-bottom: 2.5rem;
    position: relative;

    .timeline-year {
      width: 60px;
      flex-shrink: 0;
      font-weight: 700;
      color: @primary-color;
      font-size: 1.1rem;
      text-align: center;
      padding-top: 0.25rem;
    }

    .timeline-content {
      flex: 1;
      background: @card-bg;
      padding: 1.5rem;
      border-radius: 8px;
      margin-left: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-left: 3px solid @primary-color;

      h3 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.3rem;
      }

      p {
        margin-bottom: 1rem;
        color: @text-light;
      }
    }

    .timeline-tools {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
}

// 工具标签样式
.tool-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

// 功能对比表格
.feature-comparison {
  margin: 2rem 0;

  .comparison-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .table-header, .table-row {
      display: table-row;
    }

    .table-cell {
      display: table-cell;
      padding: 1rem;
      border-bottom: 1px solid @border-color;
      vertical-align: middle;

      &:first-child {
        font-weight: 600;
        background: @sidebar-bg;
      }
    }

    .table-header {
      font-weight: 700;
      background: @primary-color;
      color: white;

      .table-cell {
        border-bottom: none;
      }
    }

    .feature-name {
      width: 180px;
    }

    .supported {
      color: @secondary-color;
      font-weight: 600;
    }

    .partial {
      color: #f39c12;
      font-weight: 600;
    }

    .unsupported {
      color: #e74c3c;
    }
  }
}

// 功能详情网格
.feature-details {
  margin-top: 2.5rem;

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .feature-card {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      border-top: 3px solid @primary-color;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h4 {
        margin-top: 0;
        color: @primary-color;
      }

      p {
        margin-bottom: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }
}

// 性能图表
.performance-charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;

  .chart-container {
    h3 {
      margin-bottom: 1rem;
    }

    .bar-chart {
      background: @sidebar-bg;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .bar {
        height: 40px;
        margin-bottom: 0.75rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &:last-child {
          margin-bottom: 0;
        }

        .bar-label {
          color: white;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1));
        }
      }
    }
  }
}

// 性能优化提示
.performance-tips {
  margin-top: 2rem;
  padding: 1.5rem;
  background: lighten(@secondary-color, 45%);
  border-radius: 8px;
  border-left: 4px solid @secondary-color;

  h3 {
    margin-top: 0;
    color: darken(@secondary-color, 20%);
  }

  ul {
    margin-bottom: 0;

    li {
      color: darken(@secondary-color, 30%);
    }
  }
}

// 兼容性网格
.compatibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  .compat-item {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      text-align: center;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid @border-color;
    }

    .compat-details {
      .compat-tool {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .tool-name {
          width: 100px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .compat-level {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;

          .level-bar {
            height: 10px;
            border-radius: 5px;
            transition: width 0.5s ease;
          }

          .level-text {
            width: 40px;
            text-align: right;
            font-size: 0.9rem;
            font-weight: 600;
            color: @text-light;
          }
        }
      }
    }
  }
}

// 生态系统统计
.ecosystem-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .stat-card {
    padding: 1.5rem;
    background: @card-bg;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid @border-color;

      h3 {
        margin: 0;
        color: @primary-color;
      }

      .stat-logo {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }
    }

    .stat-content {
      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed @border-color;

        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .stat-label {
          color: @text-light;
          font-size: 0.9rem;
        }

        .stat-value {
          font-weight: 600;
          color: @primary-color;
        }
      }
    }
  }
}

// 趋势图表
.trend-charts {
  margin: 2rem 0;

  .trend-container {
    h3 {
      margin-bottom: 1.5rem;
    }

    .trend-chart {
      height: 300px;
      background: @sidebar-bg;
      border-radius: 8px;
      padding: 1.5rem;
      position: relative;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .trend-line {
        margin-bottom: 1.5rem;

        .tool-trend {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;

          .tool-name {
            width: 100px;
            font-weight: 600;
            flex-shrink: 0;
          }

          .trend-points {
            flex: 1;
            height: 40px;
            position: relative;

            .point {
              position: absolute;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              transform: translate(-50%, 50%);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              cursor: pointer;

              &::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.3;
                background: inherit;
              }
            }
          }
        }
      }
    }
  }
}

// 选择指南
.selection-guide {
  margin-top: 2.5rem;

  .guide-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .guide-card {
      padding: 1.5rem;
      background: @card-bg;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-top: 3px solid @primary-color;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h4 {
        margin-top: 0;
        color: @primary-color;
      }

      p {
        margin-bottom: 1.5rem;
        color: @text-light;
      }

      .recommended-tools {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
  }
}

// 页脚
.page-footer {
  text-align: center;
  padding: 2.5rem;
  margin-top: 3rem;
  background: @sidebar-bg;
  color: @text-light;

  p {
    margin: 0.5rem 0;
  }

  .update-time {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    margin-bottom: 1.5rem;
    position: static;

    .nav-list {
      display: flex;
      overflow-x: auto;

      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;

        &.active {
          border-left: none;
          border-bottom-color: @primary-color;
        }
      }
    }
  }

  .feature-comparison {
    overflow-x: auto;

    .comparison-table {
      min-width: 800px;
    }
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem 3rem;

    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .tool-logos {
      gap: 1rem;

      .logo {
        width: 50px;
        height: 50px;
        font-size: 1rem;
      }

      .logo-name {
        font-size: 0.8rem;
      }
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .timeline {
    &::before {
      left: 20px;
    }

    .timeline-item {
      .timeline-year {
        width: 40px;
        font-size: 1rem;
      }

      .timeline-content {
        margin-left: 0.5rem;
        padding: 1.25rem;
      }
    }
  }

  .feature-grid,
  .compatibility-grid,
  .ecosystem-stats,
  .guide-cards {
    grid-template-columns: 1fr;
  }
}
</style>
