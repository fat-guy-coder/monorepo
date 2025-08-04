<template>
  <div class="husky-guide">
    <header class="guide-header">
      <div class="header-content">
        <h1>Husky 基本指南</h1>
        <p>自动化 Git 钩子，提升代码质量与团队协作</p>
      </div>
      <div class="header-icon">
        <div class="husky-logo"></div>
      </div>
    </header>

    <div class="content-container">
      <section class="intro-section">
        <h2>什么是 Husky？</h2>
        <div class="card">
          <p>
            Husky 是一个强大的 Git
            钩子管理工具，帮助开发团队在代码提交和推送前自动执行脚本。它能够：
          </p>
          <ul>
            <li>在提交代码前自动运行代码检查</li>
            <li>在推送代码前运行测试用例</li>
            <li>确保提交信息符合规范</li>
            <li>防止不符合规范的代码进入仓库</li>
          </ul>
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
                <div class="param-item" v-for="(param, pIndex) in item.params" :key="pIndex">
                  <strong>{{ param.name }}</strong
                  >:
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
          <h2>Husky 工作流程</h2>
          <div class="workflow-card">
            <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>

          <h2 class="benefits-title">Husky 核心优势</h2>
          <div class="benefits-grid">
            <div class="benefit-item" v-for="(benefit, index) in benefits" :key="index">
              <div class="benefit-icon" :class="`benefit-${index + 1}`"></div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </section>
      </div>

      <section class="example-section">
        <h2>配置示例</h2>
        <div class="example-card">
          <div class="tabs">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ active: activeTab === index }"
              @click="activeTab = index"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <pre v-show="activeTab === 0"><code class="json">// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 运行代码检查..."
npm run lint

echo "🧪 运行单元测试..."
npm run test:unit</code></pre>

            <pre v-show="activeTab === 1"><code class="bash">// .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 使用 commitlint 检查提交信息格式
npx --no -- commitlint --edit "$1"</code></pre>

            <pre v-show="activeTab === 2"><code class="json">// .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 运行完整测试套件..."
npm run test

echo "🔍 检查构建结果..."
npm run build</code></pre>

            <pre v-show="activeTab === 3"><code class="json">// package.json 配置示例
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "test": "jest",
    "test:unit": "jest --coverage"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  }
}</code></pre>
          </div>
        </div>
      </section>

      <section class="integration-section">
        <h2>与流行工具集成</h2>
        <div class="integration-grid">
          <div class="tool-card" v-for="(tool, index) in tools" :key="index">
            <div class="tool-icon" :class="`tool-${index + 1}`"></div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <div class="example-code">
              <pre><code>{{ tool.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="guide-footer">
      <p>
        Husky 是现代化前端工作流中不可或缺的工具，通过自动化 Git
        钩子确保代码质量和规范一致性。正确配置 Husky 可以显著提高团队开发效率和代码库健康度。
      </p>
      <div class="footer-links">
        <a href="https://typicode.github.io/husky/" target="_blank">官方文档</a>
        <a href="https://github.com/typicode/husky" target="_blank">GitHub 仓库</a>
        <a href="https://commitlint.js.org/" target="_blank">Commitlint</a>
        <a href="https://github.com/okonet/lint-staged" target="_blank">Lint-staged</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [
  { label: 'pre-commit' },
  { label: 'commit-msg' },
  { label: 'pre-push' },
  { label: 'package.json' },
]

interface Param {
  name: string
  description: string
  values?: { value: string; description: string }[]
}

const coreConfigs: {
  title: string
  description: string
  params: Param[]
  example: string
}[] = [
  {
    title: '安装与初始化',
    description: '设置 Husky 并准备 Git 钩子',
    params: [
      {
        name: 'npm install husky --save-dev',
        description: '将 Husky 安装为开发依赖',
      },
      {
        name: 'npx husky install',
        description: '初始化 Husky 并设置 Git 钩子目录',
      },
      {
        name: 'npm pkg set scripts.prepare="husky install"',
        description: '添加 prepare 脚本确保新克隆仓库时自动安装钩子',
      },
    ],
    example: `# 安装 Husky
npm install husky --save-dev

# 初始化 Husky
npx husky install

# 添加 prepare 脚本
npm pkg set scripts.prepare="husky install"`,
  },
  {
    title: 'pre-commit 钩子',
    description: '在提交代码前运行的脚本',
    params: [
      {
        name: 'npx husky add .husky/pre-commit',
        description: '创建 pre-commit 钩子文件',
      },
      {
        name: 'npm run lint',
        description: '运行代码检查',
      },
      {
        name: 'npx lint-staged',
        description: '仅检查暂存区的文件',
      },
      {
        name: 'npm test',
        description: '运行测试用例',
      },
    ],
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 运行代码检查
npm run lint

# 运行 lint-staged
npx lint-staged

# 运行单元测试
npm run test:unit`,
  },
  {
    title: 'commit-msg 钩子',
    description: '在提交信息创建后运行的脚本，用于验证提交信息格式',
    params: [
      {
        name: 'npx husky add .husky/commit-msg',
        description: '创建 commit-msg 钩子文件',
      },
      {
        name: 'npx --no -- commitlint --edit $1',
        description: '使用 commitlint 验证提交信息',
      },
      {
        name: '常规提交规范',
        description: '常用格式: type(scope?): subject',
      },
      {
        name: '提交类型',
        description: 'feat, fix, docs, style, refactor, test, chore 等',
      },
    ],
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 使用 commitlint 检查提交信息
npx --no -- commitlint --edit "$1"`,
  },
  {
    title: 'pre-push 钩子',
    description: '在代码推送到远程仓库前运行的脚本',
    params: [
      {
        name: 'npx husky add .husky/pre-push',
        description: '创建 pre-push 钩子文件',
      },
      {
        name: 'npm test',
        description: '运行完整的测试套件',
      },
      {
        name: 'npm run build',
        description: '验证项目能否成功构建',
      },
      {
        name: 'npm run security-check',
        description: '运行安全漏洞检查',
      },
    ],
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 运行完整测试
npm run test

# 验证项目构建
npm run build

# 运行安全检查
npm run security-check`,
  },
  {
    title: '高级配置选项',
    description: 'Husky 的高级用法和配置',
    params: [
      {
        name: 'HUSKY_DEBUG',
        description: '启用调试模式，输出详细日志',
      },
      {
        name: 'HUSKY_SKIP_HOOKS',
        description: '跳过所有钩子执行',
      },
      {
        name: 'HUSKY_GIT_PARAMS',
        description: '访问 Git 传递给钩子的参数',
      },
      {
        name: '跨平台支持',
        description: '使用 sh 而不是 bash 确保跨平台兼容性',
      },
    ],
    example: `# 跳过所有钩子
HUSKY_SKIP_HOOKS=1 git commit -m "紧急提交"

# 调试模式
HUSKY_DEBUG=1 git commit -m "测试提交"`,
  },
]

const workflowSteps = [
  {
    title: '安装 Husky',
    description: '将 Husky 添加为项目开发依赖',
  },
  {
    title: '初始化配置',
    description: '运行 husky install 创建 .husky 目录',
  },
  {
    title: '创建钩子脚本',
    description: '添加 pre-commit, commit-msg 等钩子文件',
  },
  {
    title: '定义执行脚本',
    description: '在钩子文件中添加需要运行的命令',
  },
  {
    title: '提交代码',
    description: '执行 git commit 触发 pre-commit 钩子',
  },
  {
    title: '推送代码',
    description: '执行 git push 触发 pre-push 钩子',
  },
]

const benefits = [
  {
    title: '代码质量保障',
    description: '确保每次提交的代码都经过检查',
  },
  {
    title: '规范提交信息',
    description: '统一团队提交信息格式',
  },
  {
    title: '自动化流程',
    description: '减少手动检查步骤，提高效率',
  },
  {
    title: '错误预防',
    description: '防止破坏性代码进入仓库',
  },
  {
    title: '团队协作',
    description: '统一团队工作流程和标准',
  },
  {
    title: '无缝集成',
    description: '与现有工具链完美配合',
  },
]

const tools = [
  {
    name: 'Lint-staged',
    description: '仅对 Git 暂存区的文件运行检查，提高效率',
    example: `// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ]
  }
}`,
  },
  {
    name: 'Commitlint',
    description: '验证提交信息是否符合约定式提交规范',
    example: `// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style',
      'refactor', 'test', 'chore'
    ]],
    'subject-case': [2, 'always', 'sentence-case']
  }
};`,
  },
  {
    name: 'ESLint',
    description: 'JavaScript/TypeScript 代码检查工具',
    example: `// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run lint`,
  },
  {
    name: 'Jest',
    description: 'JavaScript 测试框架，确保代码正确性',
    example: `// .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test`,
  },
]
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 基础变量
@primary-color: #6b46c1;
@secondary-color: #805ad5;
@accent-color: #9f7aea;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2d3748;
@light-text: #718096;
@border-color: #e2e8f0;
@success-color: #48bb78;
@warning-color: #ecc94b;
@error-color: #f56565;
@card-shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.husky-guide {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
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
    .husky-logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #9f7aea, #6b46c1);
      border-radius: 50%;
      position: relative;
      overflow: hidden;

      &::before {
        content: '🐶';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
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
    content: '';
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
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;

    li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;

      &::before {
        content: '•';
        color: @primary-color;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
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
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  // 为每个图标创建不同的样式
  .benefit-1::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
  }

  .benefit-2::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'/%3E%3C/svg%3E");
  }

  .benefit-3::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  }

  .benefit-4::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'/%3E%3C/svg%3E");
  }

  .benefit-5::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E");
  }

  .benefit-6::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'/%3E%3C/svg%3E");
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

.example-section {
  margin-top: 2rem;

  .example-card {
    background: @card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: @card-shadow;
  }
}

.tabs {
  display: flex;
  background: linear-gradient(135deg, @primary-color, @secondary-color);

  button {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      color: white;
      background: rgba(255, 255, 255, 0.15);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: white;
      }
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.tab-content {
  pre {
    margin: 0;
    border-radius: 0;
    max-height: 500px;
    overflow: auto;
  }
}

.integration-section {
  margin-top: 3rem;

  .integration-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
}

.tool-card {
  background: @card-bg;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .tool-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    border-radius: 12px;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    position: relative;

    &::before {
      content: '';
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

  .tool-1::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z'/%3E%3C/svg%3E");
  }

  .tool-2::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'/%3E%3C/svg%3E");
  }

  .tool-3::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z'/%3E%3C/svg%3E");
  }

  .tool-4::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'/%3E%3C/svg%3E");
  }

  h3 {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0.75rem;
    color: @secondary-color;
  }

  p {
    color: @light-text;
    text-align: center;
    margin-bottom: 1rem;
    min-height: 60px;
  }

  .example-code {
    pre {
      background: lighten(@background, 2%);
      border-radius: 8px;
      padding: 0.75rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      border: 1px solid @border-color;

      code {
        color: #2d3748;
      }
    }
  }
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

  .tabs {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
