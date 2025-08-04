<template>
  <div class="lerna-guide">
    <header class="guide-header">
      <div class="header-content">
        <h1>Lerna 基本指南</h1>
        <p>高效管理 JavaScript 多包仓库的终极工具</p>
      </div>
      <div class="header-icon">
        <div class="lerna-logo"></div>
      </div>
    </header>

    <div class="content-container">
      <section class="intro-section">
        <h2>什么是 Lerna？</h2>
        <div class="card">
          <p>Lerna 是一个用于管理包含多个包的 JavaScript 项目的工具。它优化了使用 Git 和 npm 管理多包仓库的工作流程，让开发大型项目更加高效。</p>
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">🚀</div>
              <h3>自动化工作流</h3>
              <p>自动链接依赖并运行批量命令</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🧩</div>
              <h3>依赖管理</h3>
              <p>智能处理包之间的依赖关系</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📦</div>
              <h3>版本控制</h3>
              <p>统一或独立管理包版本号</p>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="core-section">
          <h2>核心配置基础介绍</h2>
          <div class="config-card">
            <div class="config-item" v-for="(item, index) in coreConfigs" :key="index">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="config-details">
                <div v-if="item.params" class="param-item" v-for="(param, pIndex) in item.params" :key="pIndex">
                  <strong>{{ param.name }}</strong>:
                  <span>{{ param.description }}</span>
                  <div class="param-values" v-if="param.values">
                    <div v-for="(value, vIndex) in param.values" :key="vIndex" class="value-item">
                      <code>{{ value.value }}</code> - {{ value.description }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="code-example">
                <pre><code>{{ item.example }}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section class="workflow-section">
          <h2>Lerna 工作流程</h2>
          <div class="workflow-card">
            <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>

          <h2 class="benefits-title">Lerna 核心优势</h2>
          <div class="benefits-grid">
            <div class="benefit-item" v-for="(benefit, index) in benefits" :key="index">
              <div class="benefit-icon" :class="`benefit-${index + 1}`"></div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </section>
      </div>

      <section class="use-cases-section">
        <h2>使用场景</h2>
        <div class="use-cases">
          <div class="use-case" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-header">
              <div class="case-icon">{{ useCase.icon }}</div>
              <h3>{{ useCase.title }}</h3>
            </div>
            <p>{{ useCase.description }}</p>
            <div class="case-example">
              <pre><code>{{ useCase.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="command-section">
        <h2>常用命令</h2>
        <div class="command-grid">
          <div class="command-card" v-for="(command, index) in commands" :key="index">
            <div class="command-header">
              <div class="command-icon">$</div>
              <h3>{{ command.name }}</h3>
            </div>
            <p>{{ command.description }}</p>
            <div class="command-example">
              <pre><code>{{ command.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>Lerna vs 其他工具</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell">特性</div>
            <div class="header-cell">Lerna</div>
            <div class="header-cell">Yarn Workspaces</div>
            <div class="header-cell">NPM Workspaces</div>
          </div>
          <div class="table-row">
            <div class="row-cell">多包管理</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
          </div>
          <div class="table-row">
            <div class="row-cell">依赖提升</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
          </div>
          <div class="table-row">
            <div class="row-cell">版本管理</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell warning">部分</div>
            <div class="row-cell warning">部分</div>
          </div>
          <div class="table-row">
            <div class="row-cell">变更发布</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell error">✗</div>
            <div class="row-cell error">✗</div>
          </div>
          <div class="table-row">
            <div class="row-cell">跨包脚本</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell success">✓</div>
          </div>
          <div class="table-row">
            <div class="row-cell">复杂工作流</div>
            <div class="row-cell success">✓</div>
            <div class="row-cell warning">有限</div>
            <div class="row-cell warning">有限</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="guide-footer">
      <p>Lerna 是管理大型 JavaScript 项目和多包仓库的强大工具。它通过自动化工作流程和智能依赖管理，显著提高了开发效率。</p>
      <div class="footer-links">
        <a href="https://lerna.js.org/" target="_blank">官方文档</a>
        <a href="https://github.com/lerna/lerna" target="_blank">GitHub 仓库</a>
        <a href="https://github.com/lerna/lerna/blob/main/commands/version/README.md" target="_blank">版本管理指南</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const coreConfigs = [
  {
    title: "版本管理 (version)",
    description: "管理包的版本号和发布流程",
    params: [
      {
        name: "conventionalCommits",
        description: "使用约定式提交规范自动生成变更日志",
        values: [
          { value: "true", description: "启用" },
          { value: "false", description: "禁用" }
        ]
      },
      {
        name: "message",
        description: "自定义版本提交信息"
      },
      {
        name: "independent",
        description: "独立模式：每个包有自己的版本号"
      }
    ],
    example: `// lerna.json
{
  "version": "independent",
  "command": {
    "version": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    }
  }
}`
  },
  {
    title: "包管理 (packages)",
    description: "定义项目中包含的包的位置",
    params: [
      {
        name: "Glob 模式",
        description: "使用 glob 模式匹配包目录"
      }
    ],
    example: `// lerna.json
{
  "packages": [
    "packages/*",
    "modules/*",
    "tools/*"
  ]
}`
  },
  {
    title: "依赖管理",
    description: "处理包之间的依赖关系",
    params: [
      {
        name: "npmClient",
        description: "指定使用的包管理器",
        values: [
          { value: "npm", description: "使用 npm" },
          { value: "yarn", description: "使用 Yarn" },
          { value: "pnpm", description: "使用 pnpm" }
        ]
      },
      {
        name: "useWorkspaces",
        description: "与 Yarn Workspaces 集成"
      },
      {
        name: "hoist",
        description: "将公共依赖提升到根目录"
      }
    ],
    example: `// lerna.json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "bootstrap": {
      "hoist": true
    }
  }
}`
  },
  {
    title: "发布配置 (publish)",
    description: "控制包的发布流程",
    params: [
      {
        name: "registry",
        description: "指定发布到的 npm 仓库地址"
      },
      {
        name: "access",
        description: "设置包的访问权限",
        values: [
          { value: "public", description: "公开发布" },
          { value: "restricted", description: "限制访问" }
        ]
      },
      {
        name: "ignoreChanges",
        description: "忽略指定文件的变更"
      }
    ],
    example: `// lerna.json
{
  "command": {
    "publish": {
      "registry": "https://registry.npmjs.org/",
      "access": "public",
      "ignoreChanges": ["**/*.md", "**/*.test.js"]
    }
  }
}`
  },
  {
    title: "运行命令 (run)",
    description: "在多个包中并行或串行执行脚本",
    params: [
      {
        name: "stream",
        description: "流式输出子进程的结果"
      },
      {
        name: "parallel",
        description: "并行执行命令"
      },
      {
        name: "sort",
        description: "按拓扑顺序执行命令"
      }
    ],
    example: `// 在根目录执行
lerna run build --parallel

// 在包含 test 脚本的所有包中并行运行测试
lerna run test --stream`
  }
];

const workflowSteps = [
  {
    title: "初始化项目",
    description: "创建 Lerna 项目结构，设置基础配置"
  },
  {
    title: "创建包",
    description: "使用 lerna create 创建新的包"
  },
  {
    title: "安装依赖",
    description: "使用 lerna bootstrap 安装所有依赖并链接包"
  },
  {
    title: "开发迭代",
    description: "在各个包中进行开发工作"
  },
  {
    title: "版本管理",
    description: "使用 lerna version 管理包版本"
  },
  {
    title: "发布更新",
    description: "使用 lerna publish 发布包到 npm"
  }
];

const benefits = [
  {
    title: "代码复用",
    description: "轻松在多个项目间共享代码"
  },
  {
    title: "原子提交",
    description: "跨多个包的变更可以原子提交"
  },
  {
    title: "依赖管理",
    description: "智能处理包之间的依赖关系"
  },
  {
    title: "统一版本",
    description: "协调多个包的版本发布"
  },
  {
    title: "独立开发",
    description: "各个包可以独立开发和测试"
  },
  {
    title: "高效构建",
    description: "只构建已更改的包及其依赖"
  }
];

const useCases = [
  {
    icon: "📚",
    title: "UI 组件库",
    description: "管理包含多个独立组件的库，每个组件作为单独的包发布。",
    example: `packages/
├── button/
│   ├── package.json
│   └── src/
├── input/
│   ├── package.json
│   └── src/
└── modal/
    ├── package.json
    └── src/`
  },
  {
    icon: "🔌",
    title: "插件系统",
    description: "开发核心应用和多个插件，每个插件作为独立包管理。",
    example: `packages/
├── core-app/
│   ├── package.json
│   └── src/
├── plugin-analytics/
│   ├── package.json
│   └── src/
└── plugin-auth/
    ├── package.json
    └── src/`
  },
  {
    icon: "🧩",
    title: "微前端架构",
    description: "管理多个独立的前端应用，共享公共依赖和组件。",
    example: `packages/
├── app-header/
│   ├── package.json
│   └── src/
├── app-dashboard/
│   ├── package.json
│   └── src/
├── app-admin/
│   ├── package.json
│   └── src/
└── shared-components/
    ├── package.json
    └── src/`
  },
  {
    icon: "🛠️",
    title: "全栈项目",
    description: "管理包含前端、后端、共享代码的全栈应用。",
    example: `packages/
├── frontend/
│   ├── package.json
│   └── src/
├── backend/
│   ├── package.json
│   └── src/
└── shared/
    ├── package.json
    └── src/`
  }
];

const commands = [
  {
    name: "lerna init",
    description: "初始化一个新的 Lerna 仓库",
    example: "# 创建新项目\nlerna init"
  },
  {
    name: "lerna create",
    description: "创建一个新的包",
    example: "# 创建名为 my-package 的新包\nlerna create my-package"
  },
  {
    name: "lerna bootstrap",
    description: "安装所有依赖并链接包",
    example: "# 安装依赖并链接包\nlerna bootstrap"
  },
  {
    name: "lerna add",
    description: "向包添加依赖",
    example: "# 向 package-a 添加 lodash\nlerna add lodash --scope=package-a"
  },
  {
    name: "lerna run",
    description: "在所有包中运行 npm 脚本",
    example: "# 在所有包中运行 build 脚本\nlerna run build"
  },
  {
    name: "lerna exec",
    description: "在所有包中执行任意命令",
    example: "# 在所有包中运行测试\nlerna exec -- npm test"
  },
  {
    name: "lerna version",
    description: "管理包版本",
    example: "# 交互式更新包版本\nlerna version"
  },
  {
    name: "lerna publish",
    description: "发布包到 npm",
    example: "# 发布更新到 npm\nlerna publish"
  },
  {
    name: "lerna changed",
    description: "列出已更改的包",
    example: "# 显示自上次发布以来更改的包\nlerna changed"
  }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 基础变量
@primary-color: #5a67d8;
@secondary-color: #4c51bf;
@accent-color: #7e9af5;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2d3748;
@light-text: #718096;
@border-color: #e2e8f0;
@success-color: #48bb78;
@warning-color: #ed8936;
@error-color: #e53e3e;
@card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.lerna-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @background;
  color: @text-color;
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.guide-header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .header-content {
    max-width: 800px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.25rem;
      font-weight: 300;
      opacity: 0.9;
    }
  }

  .header-icon {
    .lerna-logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, @accent-color, @primary-color);
      border-radius: 50%;
      position: relative;
      overflow: hidden;

      &::before {
        content: "L";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: 800;
        color: white;
      }
    }
  }
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h2 {
  font-size: 1.75rem;
  color: @primary-color;
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid @border-color;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100px;
    height: 2px;
    background: @primary-color;
  }
}

.card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  margin-bottom: 1.5rem;

  p {
    margin-bottom: 1.5rem;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: lighten(@primary-color, 40%);

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  p {
    margin-bottom: 0;
    color: @light-text;
  }
}

.columns {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.core-section,
.workflow-section {
  flex: 1;
}

.config-card {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
}

.config-item {
  padding: 1.5rem;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.35rem;
    color: @secondary-color;
    margin-bottom: 0.75rem;
  }

  p {
    color: @light-text;
    margin-bottom: 1rem;
  }
}

.config-details {
  background: lighten(@background, 2%);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid @border-color;
}

.param-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed @border-color;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  strong {
    color: @primary-color;
  }
}

.param-values {
  margin-top: 0.5rem;
  padding-left: 1rem;

  .value-item {
    margin-bottom: 0.3rem;

    code {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
      color: #e53e3e;
    }
  }
}

.code-example {
  margin-top: 1rem;

  pre {
    background: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      display: block;
    }
  }
}

.workflow-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;
}

.workflow-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .step-number {
    width: 32px;
    height: 32px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: @text-color;
    }

    p {
      color: @light-text;
    }
  }
}

.benefits-title {
  margin-top: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.benefit-item {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background-size: contain;
      background-repeat: no-repeat;
      filter: invert(1);
    }
  }

  // 为每个图标创建不同的样式
  .benefit-1::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E");
  }

  .benefit-2::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
  }

  .benefit-3::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-3-9H15V8h4l1.5 4.5L21 8h4v2h-3.5l-.5 1.5h2.5V22h-6zM7.5 8.5C8.33 8.5 9 9.17 9 10s-.67 1.5-1.5 1.5S6 10.83 6 10s.67-1.5 1.5-1.5zM12 14c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E");
  }

  .benefit-4::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'/%3E%3C/svg%3E");
  }

  .benefit-5::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'/%3E%3C/svg%3E");
  }

  .benefit-6::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z'/%3E%3C/svg%3E");
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: @text-color;
  }

  p {
    color: @light-text;
    font-size: 0.95rem;
  }
}

.use-cases-section {
  margin-top: 3rem;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.use-case {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .case-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .case-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      color: @primary-color;
      margin: 0;
    }
  }

  p {
    margin-bottom: 1rem;
    color: @light-text;
  }
}

.case-example {
  pre {
    background: lighten(@background, 2%);
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    border: 1px solid @border-color;

    code {
      color: @text-color;
    }
  }
}

.command-section {
  margin-top: 3rem;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.command-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .command-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .command-icon {
      width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 1rem;
    }

    h3 {
      font-size: 1.25rem;
      color: @secondary-color;
      margin: 0;
    }
  }

  p {
    margin-bottom: 1rem;
    color: @light-text;
    min-height: 60px;
  }
}

.command-example {
  pre {
    background: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    overflow-x: auto;

    code {
      display: block;
    }
  }
}

.comparison-section {
  margin-top: 3rem;
}

.comparison-table {
  background: @card-bg;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: @card-shadow;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr);
  background: @primary-color;
  color: white;
  font-weight: 600;

  .header-cell {
    padding: 1rem;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }
}

.table-row {
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr);
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
  }

  .row-cell {
    padding: 1rem;
    display: flex;
    align-items: center;

    &:first-child {
      font-weight: 500;
    }
  }
}

.success {
  color: @success-color;
  font-weight: bold;
  font-size: 1.25rem;
  justify-content: center;
}

.warning {
  color: @warning-color;
  font-weight: bold;
  justify-content: center;
}

.error {
  color: @error-color;
  font-weight: bold;
  font-size: 1.25rem;
  justify-content: center;
}

.guide-footer {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 2rem 1.5rem;
  text-align: center;
  color: @light-text;
  border-top: 1px solid @border-color;

  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  a {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: @secondary-color;
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .guide-header {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;

    .header-icon {
      margin-top: 1.5rem;
    }
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-size: 0.9rem;
  }
}
</style>
