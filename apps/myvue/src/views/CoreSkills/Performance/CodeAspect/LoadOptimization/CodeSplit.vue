<template>
  <div class="code-splitting-container">
    <!-- 头部区域 -->
    <header class="splitting-header">
      <div class="header-content">
        <h1>代码分割优化加载性能指南</h1>
        <p class="subtitle">拆分大型应用，实现按需加载，加速页面渲染</p>
      </div>
      <div class="performance-stats">
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">60%+</div>
          <div class="stat-label">首屏加载加速</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-value">70%+</div>
          <div class="stat-label">初始包体积减少</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">50%+</div>
          <div class="stat-label">交互响应提升</div>
        </div>
      </div>
    </header>

    <!-- 核心概念 -->
    <section class="core-concepts">
      <div class="concept-card">
        <div class="concept-icon">⚙️</div>
        <h2>什么是代码分割？</h2>
        <p>代码分割是一种将应用代码拆分为多个较小模块的技术，允许按需或并行加载这些模块，从而显著减少初始加载时间。</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">🎯</div>
        <h2>为什么需要代码分割？</h2>
        <p>现代Web应用越来越复杂，单个JS文件可达数MB，导致加载时间长、交互延迟高。代码分割解决了这一问题，优化用户体验。</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">📊</div>
        <h2>核心优势</h2>
        <ul>
          <li>减少初始加载资源大小</li>
          <li>提高首屏渲染速度</li>
          <li>优化资源利用率</li>
          <li>提升用户交互响应速度</li>
          <li>改善核心网页指标评分</li>
        </ul>
      </div>
    </section>

    <!-- 分割方法 -->
    <section class="splitting-methods">
      <h2 class="section-title"><span class="icon">🔧</span> 代码分割方法</h2>

      <div class="method-grid">
        <div class="method-card" v-for="(method, index) in splittingMethods" :key="index">
          <div class="method-header">
            <div class="method-icon">{{ method.icon }}</div>
            <h3>{{ method.name }}</h3>
          </div>
          <p class="method-desc">{{ method.description }}</p>

          <div class="implementation-box">
            <div class="impl-title">实现方式:</div>
            <pre><code class="language-javascript">{{ method.implementation }}</code></pre>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <div class="pc-title">✅ 优点</div>
              <ul>
                <li v-for="(pro, i) in method.pros" :key="'pro' + i">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <div class="pc-title">⚠️ 缺点</div>
              <ul>
                <li v-for="(con, i) in method.cons" :key="'con' + i">{{ con }}</li>
              </ul>
            </div>
          </div>

          <div class="use-cases">
            <div class="uc-title">适用场景</div>
            <div class="tag-list">
              <span v-for="(scene, i) in method.useCases" :key="'scene' + i" class="scene-tag">{{ scene }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优化技巧 -->
    <section class="optimization-tips">
      <h2 class="section-title"><span class="icon">🚀</span> 高级优化技巧</h2>

      <div class="tips-grid">
        <div class="tip-card" v-for="(tip, index) in optimizationTips" :key="index">
          <div class="tip-number">{{ index + 1 }}</div>
          <div class="tip-content">
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
            <div v-if="tip.code" class="tip-code">
              <pre><code>{{ tip.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能对比 -->
    <section class="performance-comparison">
      <h2 class="section-title"><span class="icon">📈</span> 性能对比效果</h2>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comp-header no-split">
            <h3>未使用代码分割</h3>
          </div>
          <div class="comp-sizes">
            <div class="size-bar main" style="width: 100%">
              <div class="size-label">主包: 2.8MB</div>
            </div>
          </div>
          <div class="comp-metrics">
            <div class="metric">
              <div class="metric-value">5.2s</div>
              <div class="metric-label">加载时间</div>
            </div>
            <div class="metric">
              <div class="metric-value">82</div>
              <div class="metric-label">LCP分数</div>
            </div>
            <div class="metric">
              <div class="metric-value">380ms</div>
              <div class="metric-label">交互延迟</div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="comp-header with-split">
            <h3>使用代码分割</h3>
          </div>
          <div class="comp-sizes">
            <div class="size-bar main" style="width: 35%">
              <div class="size-label">主包: 0.9MB</div>
            </div>
            <div class="size-bar vendor" style="width: 25%">
              <div class="size-label">vendor: 0.7MB</div>
            </div>
            <div class="size-bar async" style="width: 18%">
              <div class="size-label">路由模块</div>
            </div>
            <div class="size-bar async" style="width: 12%">
              <div class="size-label">组件模块</div>
            </div>
          </div>
          <div class="comp-metrics">
            <div class="metric">
              <div class="metric-value">1.8s</div>
              <div class="metric-label">加载时间</div>
            </div>
            <div class="metric">
              <div class="metric-value">96</div>
              <div class="metric-label">LCP分数</div>
            </div>
            <div class="metric">
              <div class="metric-value">120ms</div>
              <div class="metric-label">交互延迟</div>
            </div>
          </div>
        </div>
      </div>

      <div class="performance-chart">
        <div class="chart-bar" v-for="(item, index) in performanceData" :key="index">
          <div class="bar-label">{{ item.label }}</div>
          <div class="bar-container">
            <div class="bar before" :style="{ width: item.before + '%' }">
              <div class="bar-value">{{ item.beforeValue }}</div>
            </div>
            <div class="bar after" :style="{ width: item.after + '%' }">
              <div class="bar-value">{{ item.afterValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工具推荐 -->
    <section class="tool-recommendations">
      <h2 class="section-title"><span class="icon">🛠️</span> 工具与库推荐</h2>

      <div class="tools-grid">
        <div class="tool-card" v-for="(tool, index) in recommendedTools" :key="index">
          <div class="tool-icon">{{ tool.icon }}</div>
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
          <div class="tool-category">类别: {{ tool.category }}</div>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practices">
      <h2 class="section-title"><span class="icon">🏆</span> 代码分割最佳实践</h2>

      <div class="practices-list">
        <div class="practice-item" v-for="(practice, index) in bestPractices" :key="index">
          <div class="practice-number">{{ index + 1 }}</div>
          <div class="practice-content">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="splitting-footer">
      <p>© 2023 前端性能优化指南 | 代码分割是现代Web应用性能优化的核心技术</p>
      <p>合理使用代码分割可以将初始加载时间减少50%-70%</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 分割方法数据
const splittingMethods = ref([
  {
    icon: '🧩',
    name: '路由级分割',
    description: '根据应用路由自动拆分代码，每个路由对应一个独立chunk',
    implementation: `// Vue Router 配置
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue') // 动态导入
  },
  {
    path: '/settings',
    component: () => import('./views/Settings.vue')
  }
];`,
    pros: [
      '按用户访问路径加载资源',
      '减少初始包体积',
      '实现简单，配置直观',
      '与路由结构高度匹配'
    ],
    cons: [
      '首屏路由可能仍包含大量代码',
      '深层路由可能需要额外优化',
      '需配合路由守卫处理加载状态'
    ],
    useCases: [
      '多页面应用',
      'SPA应用',
      '企业后台系统',
      '内容管理系统'
    ]
  },
  {
    icon: '🔄',
    name: '组件级分割',
    description: '拆分大型组件为独立模块，按需加载',
    implementation: `// 使用Vue defineAsyncComponent
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
);

export default {
  components: {
    HeavyComponent
  }
};`,
    pros: [
      '精细控制代码拆分粒度',
      '显著减少核心包体积',
      '优化非关键组件加载',
      '提升初始渲染速度'
    ],
    cons: [
      '增加网络请求数量',
      '需要处理加载状态',
      '可能影响组件交互体验',
      '增加代码复杂度'
    ],
    useCases: [
      '大型复杂组件',
      '弹窗/模态框',
      '非首屏内容',
      '可视化图表组件'
    ]
  },
  {
    icon: '📚',
    name: '第三方库分割',
    description: '将node_modules中的依赖拆分为独立包',
    implementation: `// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分第三方库
          vendor: ['vue', 'vue-router', 'axios'],
          // 按功能拆分
          charts: ['echarts', 'd3'],
          utils: ['lodash', 'moment']
        }
      }
    }
  }
};`,
    pros: [
      '充分利用浏览器缓存',
      '避免重复打包相同依赖',
      '并行加载优化',
      '更新时只需重新加载变更部分'
    ],
    cons: [
      '配置复杂',
      '可能增加初始请求数',
      '需要平衡chunk数量和大小',
      '依赖分析工具需求'
    ],
    useCases: [
      '大型第三方库',
      '不常更新的依赖',
      '共享依赖',
      '需要长期缓存的资源'
    ]
  },
  {
    icon: '⏱️',
    name: '动态导入',
    description: '在代码中按需导入模块，运行时动态加载',
    implementation: `// 基于用户交互加载模块
button.addEventListener('click', async () => {
  // 点击时加载模块
  const module = await import('./analyticsModule.js');
  module.initAnalytics();

  // Vue中使用
  const { showAdvancedFeatures } = await import('./features.js');
  showAdvancedFeatures();
});`,
    pros: [
      '极致按需加载',
      '大幅减少初始加载体积',
      '优化非核心功能加载',
      '提高用户交互响应'
    ],
    cons: [
      '交互延迟（加载时间）',
      '需要处理加载状态和错误',
      '代码拆分点需谨慎选择',
      '可能过度碎片化'
    ],
    useCases: [
      '用户触发的功能',
      '复杂工具和功能',
      '分析和报告模块',
      '不常用功能'
    ]
  }
]);

// 优化技巧
const optimizationTips = ref([
  {
    title: '预加载关键资源',
    description: '使用<link rel="preload">提前加载关键路由或组件，减少用户导航等待时间',
    code: `<!-- 预加载关键资源 -->
<link rel="preload" href="/src/views/Dashboard.vue" as="script">`
  },
  {
    title: '魔法注释命名',
    description: '使用webpackChunkName注释为分割模块命名，提高可读性和调试体验',
    code: `// 使用魔法注释命名chunk
const Dashboard = () => import(
  /* webpackChunkName: "dashboard-view" */
  './views/Dashboard.vue'
);`
  },
  {
    title: '分割阈值控制',
    description: '设置最小chunk大小，避免过度分割导致过多小文件请求',
    code: `// vite.config.js 配置分割阈值
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 合并小于20kb的模块
          vendor: ['vue', 'vue-router', ...]
        },
        minChunkSize: 20000 // 20kb
      }
    }
  }
};`
  },
  {
    title: '共享依赖提取',
    description: '提取多个模块共享的公共依赖，避免重复打包',
    code: `// webpack配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};`
  },
  {
    title: '骨架屏加载状态',
    description: '在动态加载期间显示骨架屏，提升用户体验',
    code: `// 带加载状态的异步组件
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: SkeletonComponent,
  delay: 200, // 延迟显示加载状态
  errorComponent: ErrorComponent,
  timeout: 3000 // 超时时间
});`
  },
  {
    title: '基于网络条件加载',
    description: '根据用户网络状况调整加载策略（如慢速网络加载轻量版）',
    code: `// 检测网络状况加载不同资源
const connection = navigator.connection || navigator.mozConnection;
const saveData = connection?.saveData;

if (saveData || connection?.effectiveType === 'slow-2g') {
  loadLiteVersion();
} else {
  loadFullVersion();
}`
  }
]);

// 性能数据
const performanceData = ref([
  {
    label: '初始加载体积',
    before: 100,
    beforeValue: '2.8MB',
    after: 35,
    afterValue: '0.9MB'
  },
  {
    label: '首次内容绘制 (FCP)',
    before: 100,
    beforeValue: '4.2s',
    after: 55,
    afterValue: '1.9s'
  },
  {
    label: '最大内容绘制 (LCP)',
    before: 100,
    beforeValue: '5.1s',
    after: 42,
    afterValue: '2.1s'
  },
  {
    label: '首次输入延迟 (FID)',
    before: 100,
    beforeValue: '380ms',
    after: 32,
    afterValue: '120ms'
  },
  {
    label: 'JS执行时间',
    before: 100,
    beforeValue: '2.1s',
    after: 45,
    afterValue: '0.9s'
  }
]);

// 推荐工具
const recommendedTools = ref([
  {
    icon: '📦',
    name: 'Webpack Bundle Analyzer',
    description: '可视化分析打包结果，识别优化机会',
    category: '打包分析工具'
  },
  {
    icon: '⚡',
    name: 'Vite',
    description: '下一代前端构建工具，原生支持ES模块和高效代码分割',
    category: '构建工具'
  },
  {
    icon: '🔍',
    name: 'Chrome DevTools Coverage',
    description: '识别未使用代码，指导分割决策',
    category: '性能分析'
  },
  {
    icon: '📊',
    name: 'Rollup',
    description: '高效的ES模块打包器，支持高级代码分割',
    category: '打包工具'
  },
  {
    icon: '🚦',
    name: 'Loadable Components',
    description: 'React代码分割库，Vue有类似方案',
    category: '代码分割库'
  },
  {
    icon: '📈',
    name: 'Lighthouse',
    description: '自动化性能检测工具，提供代码分割建议',
    category: '性能审计'
  }
]);

// 最佳实践
const bestPractices = ref([
  {
    title: '按路由分割作为基础',
    description: '从路由级分割开始，作为代码分割的基础策略'
  },
  {
    title: '优先分割大型第三方库',
    description: '将超过50kb的第三方库拆分为独立chunk'
  },
  {
    title: '使用动态导入延迟加载非关键资源',
    description: '对非首屏组件和功能使用动态导入'
  },
  {
    title: '监控chunk数量和大小',
    description: '保持chunk数量合理(10-30个)，避免过度分割'
  },
  {
    title: '为异步组件添加加载状态',
    description: '改善加载过程中的用户体验'
  },
  {
    title: '预加载关键导航路径资源',
    description: '提前加载用户可能访问的下一路由资源'
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@success-color: #4cc9f0;
@warning-color: #f72585;
@dark-color: #2b2d42;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
@border-color: #e9ecef;
@text-color: #343a40;

.code-splitting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.splitting-header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: @card-shadow;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, @success-color, @warning-color, #7209b7);
  }

  .header-content {
    max-width: 900px;
    margin: 0 auto 1.8rem;

    h1 {
      font-size: 2.8rem;
      margin-bottom: 0.8rem;
      font-weight: 800;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .subtitle {
      font-size: 1.4rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
      font-weight: 400;
    }
  }

  .performance-stats {
    display: flex;
    justify-content: center;
    gap: 1.8rem;
    flex-wrap: wrap;

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(6px);
      border-radius: 12px;
      padding: 1.3rem 1.8rem;
      min-width: 160px;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-8px);
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .stat-icon {
        font-size: 2.3rem;
        margin-bottom: 0.7rem;
      }

      .stat-value {
        font-size: 2.1rem;
        font-weight: 800;
        margin-bottom: 0.2rem;
        letter-spacing: -0.5px;
      }

      .stat-label {
        font-size: 1rem;
        opacity: 0.85;
        font-weight: 500;
      }
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 2rem;
  color: @dark-color;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
  }
}

.core-concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;

  .concept-card {
    background: @light-bg;
    border-radius: 14px;
    padding: 2rem;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;
    border-top: 4px solid @primary-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 1.2rem;
    }

    h2 {
      font-size: 1.6rem;
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: @dark-color;
    }

    p {
      color: #495057;
      line-height: 1.7;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.7rem;
        position: relative;
        padding-left: 1.2rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @primary-color;
          font-weight: bold;
        }
      }
    }
  }
}

.splitting-methods {
  margin-bottom: 3.5rem;

  .method-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .method-card {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-7px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .method-header {
      padding: 1.8rem 1.8rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: linear-gradient(120deg, @light-bg, white);
      border-bottom: 1px solid @border-color;

      .method-icon {
        font-size: 1.8rem;
        background: @primary-color;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        margin: 0;
        font-size: 1.5rem;
        color: @dark-color;
      }
    }

    .method-desc {
      padding: 1.2rem 1.8rem 0;
      color: #495057;
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .implementation-box {
      padding: 1.2rem 1.8rem 0;

      .impl-title {
        font-weight: 600;
        margin-bottom: 0.8rem;
        color: #495057;
      }

      pre {
        background: #2b2d42;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;
        margin: 0;

        code {
          color: #f5f5f5;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      padding: 1.5rem 1.8rem 0;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        background: @light-bg;
        border-radius: 8px;
        padding: 1.2rem;
      }

      .pros {
        border-left: 3px solid @success-color;
      }

      .cons {
        border-left: 3px solid @warning-color;
      }

      .pc-title {
        font-weight: 700;
        margin-bottom: 0.8rem;
        font-size: 1.05rem;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
      }
    }

    .use-cases {
      padding: 1.5rem 1.8rem;
      background: rgba(@primary-color, 0.03);
      border-top: 1px solid @border-color;

      .uc-title {
        font-weight: 600;
        margin-bottom: 0.8rem;
        color: #495057;
      }

      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .scene-tag {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        font-size: 0.85rem;
        padding: 0.4rem 0.9rem;
        border-radius: 100px;
        font-weight: 500;
        border: 1px solid rgba(@primary-color, 0.2);
      }
    }
  }
}

.optimization-tips {
  margin-bottom: 3.5rem;

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;

    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }

  .tip-card {
    background: white;
    border-radius: 14px;
    padding: 1.8rem;
    box-shadow: @card-shadow;
    display: flex;
    gap: 1.5rem;
    border-left: 4px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .tip-number {
      background: @primary-color;
      color: white;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .tip-content {
      flex: 1;

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.3rem;
        color: @dark-color;
      }

      p {
        color: #495057;
        line-height: 1.7;
        margin-bottom: 1.2rem;
      }

      .tip-code {
        background: #2d3748;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        pre {
          margin: 0;
          white-space: pre-wrap;

          code {
            color: #e2e8f0;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.performance-comparison {
  margin-bottom: 3.5rem;

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2.5rem;
    margin-bottom: 2.5rem;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }

    .comparison-card {
      background: white;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: @card-shadow;

      .comp-header {
        padding: 1.5rem;
        text-align: center;
        font-weight: 600;
        color: white;

        &.no-split {
          background: linear-gradient(135deg, #e76f51, #e63946);
        }

        &.with-split {
          background: linear-gradient(135deg, #2a9d8f, #1d3557);
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
        }
      }

      .comp-sizes {
        padding: 1.8rem 1.5rem 1rem;
        display: flex;
        gap: 4px;
        align-items: flex-end;
        height: 100px;
        background: #f8f9fa;

        .size-bar {
          border-radius: 8px 8px 0 0;
          position: relative;
          transition: height 0.5s ease;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

          .size-label {
            position: absolute;
            bottom: -30px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.85rem;
            font-weight: 500;
          }

          &.main {
            background: linear-gradient(to top, #4361ee, #3a0ca3);
          }

          &.vendor {
            background: linear-gradient(to top, #4cc9f0, #4895ef);
          }

          &.async {
            background: linear-gradient(to top, #f72585, #b5179e);
          }
        }
      }

      .comp-metrics {
        display: flex;
        padding: 1.5rem;
        border-top: 1px solid @border-color;

        .metric {
          flex: 1;
          text-align: center;
          padding: 0 0.5rem;

          .metric-value {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .metric-label {
            font-size: 0.9rem;
            color: #6c757d;
          }
        }
      }
    }
  }

  .performance-chart {
    background: white;
    border-radius: 14px;
    padding: 2rem;
    box-shadow: @card-shadow;

    .chart-bar {
      margin-bottom: 1.8rem;

      .bar-label {
        font-weight: 600;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
      }

      .bar-container {
        display: flex;
        height: 40px;
        background: @light-bg;
        border-radius: 8px;
        overflow: hidden;
        position: relative;

        .bar {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          font-weight: 600;
          color: white;
          transition: width 1s ease;
          position: relative;

          &.before {
            background: linear-gradient(90deg, #e76f51, #e63946);
            justify-content: flex-end;
          }

          &.after {
            background: linear-gradient(90deg, #2a9d8f, #1d3557);
          }

          .bar-value {
            position: absolute;
            right: 12px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
}

.tool-recommendations {
  margin-bottom: 3.5rem;

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.8rem;
  }

  .tool-card {
    background: white;
    border-radius: 14px;
    padding: 2rem 1.8rem;
    text-align: center;
    box-shadow: @card-shadow;
    transition: all 0.3s ease;
    border: 1px solid @border-color;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);

      .tool-icon {
        transform: scale(1.15) rotate(5deg);
      }
    }

    .tool-icon {
      font-size: 2.8rem;
      margin-bottom: 1.3rem;
      transition: all 0.3s ease;
      display: inline-block;
    }

    h3 {
      margin: 0 0 0.8rem;
      font-size: 1.4rem;
      color: @dark-color;
    }

    p {
      color: #495057;
      line-height: 1.7;
      min-height: 70px;
    }

    .tool-category {
      background: rgba(@primary-color, 0.08);
      color: @primary-color;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 100px;
      display: inline-block;
      margin-top: 1.2rem;
    }
  }
}

.best-practices {
  margin-bottom: 3.5rem;

  .practices-list {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: @card-shadow;
  }

  .practice-item {
    display: flex;
    padding: 1.8rem;
    border-bottom: 1px solid @border-color;
    position: relative;
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: rgba(@primary-color, 0.03);

      .practice-number {
        background: @secondary-color;
        transform: scale(1.05);
      }
    }

    .practice-number {
      background: @primary-color;
      color: white;
      width: 46px;
      height: 46px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
      margin-right: 1.5rem;
      transition: all 0.3s ease;
      position: relative;
      top: 5px;
    }

    .practice-content {
      flex: 1;

      h3 {
        margin: 0 0 0.8rem;
        font-size: 1.4rem;
        color: @dark-color;
        display: flex;
        align-items: center;

        &::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, @border-color, transparent);
          margin-left: 1rem;
        }
      }

      p {
        color: #495057;
        line-height: 1.7;
        margin: 0;
      }
    }
  }
}

.splitting-footer {
  background: @dark-color;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2.5rem 1.5rem;
  border-radius: 14px;
  margin-top: 3rem;
  font-size: 1.05rem;

  p {
    margin: 0.5rem 0;

    &:first-child {
      font-weight: 500;
      font-size: 1.1rem;
      color: white;
    }
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .splitting-header {
    padding: 1.8rem 1.2rem;

    .header-content {
      h1 {
        font-size: 2.2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .performance-stats {
      gap: 1rem;

      .stat-card {
        padding: 1rem 1.2rem;
        min-width: 130px;

        .stat-icon {
          font-size: 1.8rem;
        }

        .stat-value {
          font-size: 1.8rem;
        }
      }
    }
  }

  .section-title {
    font-size: 1.6rem;

    .icon {
      width: 38px;
      height: 38px;
      font-size: 1.3rem;
    }
  }

  .core-concepts {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .splitting-methods {
    .method-grid {
      grid-template-columns: 1fr;
    }

    .method-card {
      .pros-cons {
        grid-template-columns: 1fr;
      }
    }
  }

  .optimization-tips {
    .tips-grid {
      grid-template-columns: 1fr;
    }
  }

  .performance-comparison {
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 480px) {
  .splitting-header {
    .performance-stats {
      flex-direction: column;
      align-items: center;

      .stat-card {
        width: 80%;
      }
    }
  }

  .practice-item {
    flex-direction: column;

    .practice-number {
      margin-right: 0;
      margin-bottom: 1.2rem;
    }

    .practice-content {
      h3::after {
        display: none;
      }
    }
  }
}

/* 添加动画效果 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.method-card .method-icon {
  animation: float 4s ease-in-out infinite;
}

.tool-card .tool-icon {
  animation: float 5s ease-in-out infinite;
}
</style>