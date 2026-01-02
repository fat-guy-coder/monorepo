<template>
  <div class="monorepo-container">
    <header class="header">
      <h1>Monorepo工具对比</h1>
      <p class="subtitle">选择最适合您项目的代码仓库管理方案</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <div class="card">
          <h2><span class="icon">📦</span> 什么是Monorepo?</h2>
          <p>
            Monorepo（单一代码仓库）是一种软件开发策略，它将多个项目的代码存储在同一个版本控制仓库中。
          </p>

          <div class="benefits">
            <div class="benefit-card">
              <div class="icon">🚀</div>
              <h3>代码共享</h3>
              <p>轻松共享组件和工具库</p>
            </div>
            <div class="benefit-card">
              <div class="icon">🧩</div>
              <h3>依赖管理</h3>
              <p>统一管理所有依赖项</p>
            </div>
            <div class="benefit-card">
              <div class="icon">🔁</div>
              <h3>原子提交</h3>
              <p>跨项目变更保持一致性</p>
            </div>
            <div class="benefit-card">
              <div class="icon">🧪</div>
              <h3>统一CI/CD</h3>
              <p>简化构建和部署流程</p>
            </div>
          </div>

          <div class="adoption">
            <h3>采用Monorepo的知名项目</h3>
            <div class="logos">
              <div class="logo-item">
                <div class="logo google">Google</div>
                <div class="desc">整个代码库在单一仓库</div>
              </div>
              <div class="logo-item">
                <div class="logo facebook">Facebook</div>
                <div class="desc">包含Web、Android、iOS项目</div>
              </div>
              <div class="logo-item">
                <div class="logo microsoft">Microsoft</div>
                <div class="desc">VS Code和TypeScript</div>
              </div>
              <div class="logo-item">
                <div class="logo babel">Babel</div>
                <div class="desc">所有插件在同一仓库</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-comparison">
        <h2><span class="icon">⚖️</span> 工具对比</h2>
        <div class="card">
          <div class="comparison-filters">
            <div class="filter">
              <label>排序方式：</label>
              <Select v-model="sortBy">
                <option value="default">默认</option>
                <option value="performance">性能</option>
                <option value="popularity">流行度</option>
                <option value="config">配置难度</option>
              </select>
            </div>
            <div class="filter">
              <label>筛选：</label>
              <div class="checkboxes">
                <label v-for="tool in tools" :key="tool.id">
                  <input type="checkbox" v-model="selectedTools" :value="tool.id" />
                  {{ tool.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>工具</th>
                  <th>
                    配置难易度
                    <span class="hint">(★越多越简单)</span>
                  </th>
                  <th>
                    性能
                    <span class="hint">(构建速度)</span>
                  </th>
                  <th>
                    流行度
                    <span class="hint">(GitHub Stars)</span>
                  </th>
                  <th>适用场景</th>
                  <th>学习曲线</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tool in filteredTools" :key="tool.id">
                  <td class="tool-name">
                    <div class="logo" :class="tool.id">{{ tool.name }}</div>
                    <div class="version">v{{ tool.version }}</div>
                  </td>
                  <td>
                    <div class="rating">
                      <span v-for="n in 5" :key="n" :class="{ active: n <= tool.easeOfConfig }"
                        >★</span
                      >
                      <div class="rating-text">
                        {{ configRatingText[tool.easeOfConfig - 1] }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="performance-bar">
                      <div class="bar" :style="{ width: tool.performance + '%' }">
                        <span class="value">{{ tool.performance }}%</span>
                      </div>
                    </div>
                    <div class="performance-desc">{{ tool.performanceDesc }}</div>
                  </td>
                  <td>
                    <div class="popularity">
                      <div class="stars"><span class="icon">⭐</span> {{ tool.stars }}</div>
                      <div
                        class="trend"
                        :class="{ up: tool.trend === 'up', down: tool.trend === 'down' }"
                      >
                        {{ tool.trend === 'up' ? '↑' : '↓' }} {{ tool.trendValue }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul class="scenarios">
                      <li v-for="(scenario, index) in tool.useCases" :key="index">
                        {{ scenario }}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <div class="curve">
                      <div
                        class="curve-bar"
                        :style="{ height: tool.learningCurve * 20 + '%' }"
                      ></div>
                      <div class="curve-label">
                        {{ learningCurveText[tool.learningCurve - 1] }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="detailed-analysis">
        <h2><span class="icon">🔍</span> 详细分析</h2>
        <div class="tools-cards">
          <div class="tool-card" v-for="tool in tools" :key="tool.id">
            <div class="card-header" :class="tool.id">
              <div class="logo">{{ tool.name }}</div>
              <div class="badges">
                <span class="badge" v-if="tool.recommended">推荐选择</span>
                <span class="badge performance" v-if="tool.topPerformer">性能最佳</span>
              </div>
            </div>
            <div class="card-body">
              <div class="description">{{ tool.description }}</div>

              <div class="pros-cons">
                <div class="pros">
                  <h3>优点</h3>
                  <ul>
                    <li v-for="(pro, index) in tool.pros" :key="index">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h3>缺点</h3>
                  <ul>
                    <li v-for="(con, index) in tool.cons" :key="index">{{ con }}</li>
                  </ul>
                </div>
              </div>

              <div class="code-snippet">
                <h3>配置示例</h3>
                <pre><code>{{ tool.configExample }}</code></pre>
              </div>

              <div class="case-study">
                <h3>典型用户</h3>
                <div class="users">
                  <span v-for="(user, index) in tool.users" :key="index" class="user">{{
                    user
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="selection-guide">
        <h2><span class="icon">🧭</span> 选择指南</h2>
        <div class="card">
          <div class="guide-cards">
            <div class="guide-card" v-for="guide in guides" :key="guide.id">
              <h3>{{ guide.title }}</h3>
              <div class="tools-list">
                <div class="tool-rec" v-for="tool in guide.tools" :key="tool">
                  <div class="tool-logo" :class="tool.toLowerCase()"></div>
                  <span>{{ tool }}</span>
                </div>
              </div>
              <p>{{ guide.description }}</p>
              <ul>
                <li v-for="(tip, index) in guide.tips" :key="index">{{ tip }}</li>
              </ul>
            </div>
          </div>

          <div class="decision-tree">
            <h3>决策树</h3>
            <div class="tree">
              <div class="node start">
                <div class="question">选择Monorepo工具？</div>
                <div class="branch">
                  <div class="condition">需要最佳性能</div>
                  <div class="result">
                    <div class="tool-logo turborepo"></div>
                    Turborepo
                  </div>
                </div>
                <div class="branch">
                  <div class="condition">企业级项目</div>
                  <div class="result">
                    <div class="tool-logo nx"></div>
                    Nx
                  </div>
                </div>
                <div class="branch">
                  <div class="condition">使用PNPM包管理器</div>
                  <div class="result">
                    <div class="tool-logo pnpm"></div>
                    PNPM Workspaces
                  </div>
                </div>
                <div class="branch">
                  <div class="condition">简单项目/迁移现有项目</div>
                  <div class="result">
                    <div class="tool-logo lerna"></div>
                    Lerna
                  </div>
                </div>
                <div class="branch">
                  <div class="condition">大型企业项目</div>
                  <div class="result">
                    <div class="tool-logo rush"></div>
                    Rush
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>选择正确的Monorepo工具可以显著提升团队生产力和代码质量</p>
      <p>根据项目规模、团队经验和技术栈选择最适合的工具</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 工具数据
const tools = ref([
  {
    id: 'turborepo',
    name: 'Turborepo',
    version: '1.10.8',
    description: '由Vercel开发的高性能构建系统，专注于速度和开发者体验',
    easeOfConfig: 5,
    performance: 95,
    performanceDesc: '增量构建快如闪电，分布式缓存',
    stars: '12.5k',
    trend: 'up',
    trendValue: '+35%',
    useCases: ['需要极快构建速度的项目', 'JavaScript/TypeScript项目', '云原生应用', '中小型团队'],
    learningCurve: 2,
    pros: [
      '极快的增量构建',
      '零配置启动',
      '优秀的远程缓存',
      '与Vercel完美集成',
      '支持所有包管理器',
    ],
    cons: ['生态系统相对较新', '企业级功能较少', '插件系统有限'],
    configExample: `// turbo.json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**"],
      "dependsOn": ["^build"]
    },
    "test": {
      "outputs": [],
      "dependsOn": ["build"]
    }
  }
}`,
    users: ['Vercel', 'Linear', 'Ping.gg', 'Cal.com', 'Stripe'],
    recommended: true,
    topPerformer: true,
  },
  {
    id: 'nx',
    name: 'Nx',
    version: '16.0.0',
    description: '功能强大的全功能Monorepo工具，支持多种技术栈',
    easeOfConfig: 3,
    performance: 85,
    performanceDesc: '智能重建系统，分布式任务执行',
    stars: '18.9k',
    trend: 'up',
    trendValue: '+20%',
    useCases: ['企业级应用程序', '全栈项目（前端+后端）', '大型团队', '需要丰富功能的项目'],
    learningCurve: 4,
    pros: [
      '功能丰富，插件生态系统强大',
      '优秀的代码生成器',
      '支持多种技术栈（React, Angular, Node等）',
      '可视化依赖图',
      '分布式缓存和任务执行',
    ],
    cons: ['学习曲线较陡峭', '配置较复杂', '对小型项目可能过于重量级'],
    configExample: `// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}`,
    users: ['Google', 'Microsoft', 'Cisco', 'American Airlines', 'SAP'],
    recommended: true,
  },
  {
    id: 'pnpm',
    name: 'PNPM Workspaces',
    version: '8.6.0',
    description: 'PNPM包管理器内置的Monorepo解决方案，轻量高效',
    easeOfConfig: 4,
    performance: 90,
    performanceDesc: '高效的磁盘空间利用，快速安装',
    stars: '24.3k',
    trend: 'up',
    trendValue: '+40%',
    useCases: ['已经使用PNPM的项目', '磁盘空间有限的环境', '需要轻量级解决方案', '中小型项目'],
    learningCurve: 2,
    pros: [
      '内置在PNPM中，无需额外工具',
      '极快的依赖安装速度',
      '节省磁盘空间',
      '简单易用',
      '支持所有Node.js项目',
    ],
    cons: ['缺乏高级构建功能', '需要自行设置任务运行', '生态系统不如专门工具丰富'],
    configExample: `// pnpm-workspace.yaml
packages:
  - 'packages/**'
  - 'apps/*'

// package.json
{
  "scripts": {
    "build": "pnpm -r run build"
  }
}`,
    users: ['Microsoft', 'Vue.js', 'Prisma', 'Svelte', 'Vite'],
    recommended: true,
  },
  {
    id: 'lerna',
    name: 'Lerna',
    version: '6.0.0',
    description: '传统的Monorepo工具，曾是行业标准，现在被更现代的工具超越',
    easeOfConfig: 4,
    performance: 60,
    performanceDesc: '基本功能，无增量构建',
    stars: '34.5k',
    trend: 'down',
    trendValue: '-15%',
    useCases: ['维护现有Lerna项目', '简单的包发布工作流', '不需要复杂构建的项目', '小型项目'],
    learningCurve: 3,
    pros: ['历史悠久，社区支持好', '简单的版本管理和发布', '配置相对简单', '与现有工具集成容易'],
    cons: [
      '性能较差',
      '缺乏现代构建功能',
      '维护模式（不再积极开发新功能）',
      '需要配合其他工具使用',
    ],
    configExample: `// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "pnpm",
  "command": {
    "publish": {
      "ignoreChanges": ["*.md"]
    }
  }
}`,
    users: ['Babel', 'Jest', 'React Native', 'Create React App', 'Apollo GraphQL'],
  },
  {
    id: 'rush',
    name: 'Rush',
    version: '5.93.0',
    description: '微软开发的面向大型企业的Monorepo工具，功能全面但复杂',
    easeOfConfig: 2,
    performance: 80,
    performanceDesc: '增量构建优秀，安装优化',
    stars: '5.2k',
    trend: 'steady',
    trendValue: '+5%',
    useCases: [
      '超大型企业项目',
      '需要严格依赖管理的项目',
      '多技术栈混合环境',
      '需要高度定制化的团队',
    ],
    learningCurve: 5,
    pros: [
      '强大的依赖管理',
      '优秀的大型团队支持',
      '严格的版本控制',
      '支持多包管理器',
      '企业级功能',
    ],
    cons: ['配置极其复杂', '陡峭的学习曲线', '对小型项目过于重量级', '文档不够友好'],
    configExample: `// rush.json
{
  "$schema": "https://developer.microsoft.com/json-schemas/rush/v5/rush.schema.json",
  "rushVersion": "5.93.0",
  "npmVersion": "8.19.2",
  "projectFolderMinDepth": 2,
  "projectFolderMaxDepth": 3,
  "projects": [
    {
      "packageName": "app",
      "projectFolder": "apps/app"
    },
    {
      "packageName": "ui-kit",
      "projectFolder": "libraries/ui-kit"
    }
  ]
}`,
    users: ['Microsoft', 'Adobe', 'Salesforce', 'IBM', 'Oracle'],
  },
])

// 配置难度评级文本
const configRatingText = ref(['非常困难', '困难', '中等', '简单', '非常简单'])

// 学习曲线文本
const learningCurveText = ref(['平缓', '较平缓', '中等', '较陡峭', '陡峭'])

// 选择指南
const guides = ref([
  {
    id: 'startup',
    title: '初创公司/小团队',
    tools: ['Turborepo', 'PNPM Workspaces'],
    description: '需要快速启动和简单配置',
    tips: [
      '优先考虑开发速度和易用性',
      '避免复杂的企业级功能',
      '选择轻量级解决方案',
      '利用云缓存提高构建速度',
    ],
  },
  {
    id: 'enterprise',
    title: '企业级应用',
    tools: ['Nx', 'Rush'],
    description: '需要强大功能和扩展性',
    tips: [
      '考虑长期可维护性',
      '需要强大的代码生成和依赖管理',
      '支持多团队协作',
      '优先选择有企业支持的工具',
    ],
  },
  {
    id: 'open-source',
    title: '开源项目',
    tools: ['PNPM Workspaces', 'Turborepo'],
    description: '需要简单依赖管理和发布流程',
    tips: ['选择开发者熟悉的工具', '考虑贡献者体验', '轻量级配置', '良好的文档支持'],
  },
])

// 排序和筛选
const sortBy = ref('default')
const selectedTools = ref(['turborepo', 'nx', 'pnpm', 'lerna', 'rush'])

// 过滤和排序后的工具
const filteredTools = computed(() => {
  const result = tools.value.filter((tool) => selectedTools.value.includes(tool.id))

  if (sortBy.value === 'performance') {
    result.sort((a, b) => b.performance - a.performance)
  } else if (sortBy.value === 'popularity') {
    result.sort((a, b) => {
      const aStars = parseFloat(a.stars.replace('k', '')) * 1000
      const bStars = parseFloat(b.stars.replace('k', '')) * 1000
      return bStars - aStars
    })
  } else if (sortBy.value === 'config') {
    result.sort((a, b) => b.easeOfConfig - a.easeOfConfig)
  }

  return result
})
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #5e35b1;
@secondary-color: #3949ab;
@accent-color: #7e57c2;
@light-bg: #f5f7fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@success-color: #43a047;
@warning-color: #ffb300;
@danger-color: #e53935;
@info-color: #1e88e5;

// 工具颜色
@turborepo-color: #7c3aed;
@nx-color: #0f172a;
@pnpm-color: #f69220;
@lerna-color: #3eaf7c;
@rush-color: #0078d7;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.monorepo-container {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, #4527a0);
  color: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

.card {
  background-color: @card-bg;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @border-color;
}

// 介绍部分
.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .benefit-card {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background: #f0f4ff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 10px 0;
      color: @primary-color;
    }
  }
}

.adoption {
  margin-top: 30px;

  .logos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .logo-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: white;

        &.google {
          background: linear-gradient(135deg, #4285f4, #34a853);
        }
        &.facebook {
          background: linear-gradient(135deg, #1877f2, #42b72a);
        }
        &.microsoft {
          background: linear-gradient(135deg, #7cba00, #00a4ef);
        }
        &.babel {
          background: linear-gradient(135deg, #f9dc3e, #323330);
          color: #333;
        }
      }

      .desc {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
}

// 对比表格
.comparison-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9ff;
  border-radius: 10px;

  .filter {
    display: flex;
    align-items: center;

    label {
      font-weight: 500;
      margin-right: 10px;
    }

    select {
      padding: 8px 15px;
      border-radius: 8px;
      border: 1px solid @border-color;
      background: white;
    }

    .checkboxes {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      label {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;

        .hint {
          font-weight: normal;
          font-size: 0.85rem;
          opacity: 0.8;
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background-color: #f8f9ff;
        }
      }
    }
  }
}

.tool-name {
  .logo {
    font-weight: 700;
    font-size: 1.1rem;

    &.turborepo {
      color: @turborepo-color;
    }
    &.nx {
      color: @nx-color;
    }
    &.pnpm {
      color: @pnpm-color;
    }
    &.lerna {
      color: @lerna-color;
    }
    &.rush {
      color: @rush-color;
    }
  }

  .version {
    font-size: 0.9rem;
    color: #666;
  }
}

.rating {
  span {
    color: #ddd;
    font-size: 1.2rem;

    &.active {
      color: #ffb400;
    }
  }

  .rating-text {
    font-size: 0.9rem;
    color: #666;
    margin-top: 5px;
  }
}

.performance-bar {
  height: 24px;
  background: #e0e7ff;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  .bar {
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    position: relative;

    .value {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
}

.performance-desc {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

.popularity {
  display: flex;
  flex-direction: column;

  .stars {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
  }

  .trend {
    font-size: 0.9rem;
    margin-top: 5px;
    font-weight: bold;

    &.up {
      color: @success-color;
    }
    &.down {
      color: @danger-color;
    }
  }
}

.scenarios {
  padding-left: 20px;

  li {
    margin-bottom: 8px;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: -15px;
      color: @primary-color;
      font-weight: bold;
    }
  }
}

.curve {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .curve-bar {
    width: 30px;
    background: linear-gradient(to top, @primary-color, @accent-color);
    border-radius: 4px 4px 0 0;
  }

  .curve-label {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 5px;
  }
}

// 详细分析
.tools-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.tool-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    padding: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.turborepo {
      background: @turborepo-color;
    }
    &.nx {
      background: @nx-color;
    }
    &.pnpm {
      background: @pnpm-color;
    }
    &.lerna {
      background: @lerna-color;
    }
    &.rush {
      background: @rush-color;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .badges {
      display: flex;
      gap: 8px;

      .badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;

        &.performance {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .card-body {
    padding: 20px;
    background: white;

    .description {
      margin-bottom: 20px;
      color: #555;
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;

      .pros,
      .cons {
        ul {
          padding-left: 20px;
          margin-top: 10px;

          li {
            margin-bottom: 8px;
          }
        }
      }

      .pros {
        h3 {
          color: @success-color;
        }
        li::before {
          color: @success-color;
        }
      }

      .cons {
        h3 {
          color: @danger-color;
        }
        li::before {
          color: @danger-color;
        }
      }
    }

    .code-snippet {
      margin: 20px 0;

      pre {
        background: #f8f9ff;
        border-radius: 8px;
        padding: 15px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
      }
    }

    .case-study {
      .users {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;

        .user {
          background: #f0f4ff;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 选择指南
.guide-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  .guide-card {
    border: 1px solid @border-color;
    border-radius: 12px;
    padding: 20px;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    .tools-list {
      display: flex;
      gap: 15px;
      margin: 15px 0;

      .tool-rec {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;

        .tool-logo {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          font-weight: bold;

          &.turborepo {
            background: @turborepo-color;
          }
          &.nx {
            background: @nx-color;
          }
          &.pnpm {
            background: @pnpm-color;
          }
          &.lerna {
            background: @lerna-color;
          }
          &.rush {
            background: @rush-color;
          }
        }
      }
    }

    ul {
      padding-left: 20px;
      margin-top: 10px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.decision-tree {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 25px;

  .tree {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .node {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      position: relative;

      &.start {
        background: @primary-color;
        color: white;
        font-weight: 500;
      }
    }

    .branch {
      margin-top: 30px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 50%;
        width: 2px;
        height: 15px;
        background: @border-color;
      }

      .condition {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 10px;
      }

      .result {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

        .tool-logo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.8rem;

          &.turborepo {
            background: @turborepo-color;
          }
          &.nx {
            background: @nx-color;
          }
          &.pnpm {
            background: @pnpm-color;
          }
          &.lerna {
            background: @lerna-color;
          }
          &.rush {
            background: @rush-color;
          }
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .comparison-table {
    table {
      display: block;

      thead {
        display: none;
      }

      tbody,
      tr,
      td {
        display: block;
        width: 100%;
      }

      tr {
        margin-bottom: 20px;
        border: 1px solid @border-color;
        border-radius: 10px;
        overflow: hidden;
      }

      td {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &::before {
          content: attr(data-label);
          font-weight: bold;
          margin-right: 15px;
        }
      }
    }
  }

  .tools-cards {
    grid-template-columns: 1fr;
  }
}
</style>
