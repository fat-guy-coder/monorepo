<template>
  <div class="husky-container">
    <header class="header">
      <div class="logo-container">
        <div class="husky-logo">
          <div class="dog-icon">🐶</div>
        </div>
        <h1>Husky 详细配置指南</h1>
      </div>
      <p class="subtitle">Git 钩子管理工具的高级配置与最佳实践</p>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <!-- 基本配置部分 -->
      <section v-show="activeTab === 'basic'" class="section">
        <div class="config-table">
          <div class="table-header">
            <div class="col-name">配置项</div>
            <div class="col-desc">作用</div>
            <div class="col-example">配置示例</div>
          </div>

          <div v-for="item in basicConfig" :key="item.name" class="table-row">
            <div class="col-name">{{ item.name }}</div>
            <div class="col-desc">{{ item.description }}</div>
            <div class="col-example">
              <pre>{{ item.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 钩子配置部分 -->
      <section v-show="activeTab === 'hooks'" class="section">
        <div class="config-table">
          <div class="table-header">
            <div class="col-name">钩子类型</div>
            <div class="col-desc">执行时机</div>
            <div class="col-example">典型配置</div>
          </div>

          <div v-for="hook in gitHooks" :key="hook.name" class="table-row">
            <div class="col-name">{{ hook.name }}</div>
            <div class="col-desc">{{ hook.description }}</div>
            <div class="col-example">
              <pre>{{ hook.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级配置部分 -->
      <section v-show="activeTab === 'advanced'" class="section">
        <div class="config-table">
          <div class="table-header">
            <div class="col-name">高级配置</div>
            <div class="col-desc">功能说明</div>
            <div class="col-example">配置示例</div>
          </div>

          <div v-for="item in advancedConfig" :key="item.name" class="table-row">
            <div class="col-name">{{ item.name }}</div>
            <div class="col-desc">{{ item.description }}</div>
            <div class="col-example">
              <pre>{{ item.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践部分 -->
      <section v-show="activeTab === 'best-practices'" class="section">
        <div class="practices-grid">
          <div v-for="practice in bestPractices" :key="practice.title" class="practice-card">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
            <div class="code-block">
              <pre>{{ practice.example }}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Husky 配置指南 © 2023 | 提升代码质量与团队协作</p>
      <div class="footer-links">
        <a href="https://typicode.github.io/husky/" target="_blank">官方文档</a>
        <a href="https://github.com/typicode/husky" target="_blank">GitHub 仓库</a>
        <a href="https://git-scm.com/docs/githooks" target="_blank">Git Hooks 文档</a>
      </div>
      <p class="version">Husky 版本: 8.x | 最后更新: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// 标签页
const tabs = ref([
  { id: 'basic', label: '基本配置' },
  { id: 'hooks', label: '钩子配置' },
  { id: 'advanced', label: '高级配置' },
  { id: 'best-practices', label: '最佳实践' }
]);
const activeTab = ref('basic');

// 基本配置
const basicConfig = ref([
  {
    name: '安装 Husky',
    description: '将 Husky 添加到项目开发依赖',
    example: 'npm install husky --save-dev'
  },
  {
    name: '初始化 Husky',
    description: '创建 .husky 目录并设置 Git 钩子路径',
    example: 'npx husky install'
  },
  {
    name: '自动安装钩子',
    description: '在 package.json 中添加 prepare 脚本',
    example: `{
  "scripts": {
    "prepare": "husky install"
  }
}`
  },
  {
    name: '添加预提交钩子',
    description: '创建 pre-commit 钩子并添加命令',
    example: 'npx husky add .husky/pre-commit "npm test"'
  },
  {
    name: '添加提交消息钩子',
    description: '创建 commit-msg 钩子并添加消息验证',
    example: 'npx husky add .husky/commit-msg \'npx --no -- commitlint --edit "$1"\''
  },
  {
    name: '跳过钩子',
    description: '临时跳过所有 Git 钩子执行',
    example: 'git commit --no-verify -m "紧急提交"'
  },
  {
    name: '自定义钩子目录',
    description: '指定自定义的钩子存储目录',
    example: 'husky install ./config/husky'
  }
]);

// Git 钩子配置
const gitHooks = ref([
  {
    name: 'pre-commit',
    description: '在提交消息输入前运行，用于代码检查',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run test`
  },
  {
    name: 'pre-push',
    description: '在推送前运行，用于运行完整测试套件',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:ci
npm run build`
  },
  {
    name: 'commit-msg',
    description: '在提交消息保存前运行，用于验证消息格式',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1`
  },
  {
    name: 'pre-rebase',
    description: '在变基操作前运行，防止对某些分支进行变基',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 禁止对 main 分支进行变基
if [ "$(git rev-parse --abbrev-ref HEAD)" = "main" ]; then
  echo "不能在 main 分支上执行 rebase 操作"
  exit 1
fi`
  },
  {
    name: 'post-merge',
    description: '在合并操作后运行，用于安装新依赖',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm install`
  },
  {
    name: 'pre-receive',
    description: '在远程仓库接收推送前运行（服务器端钩子）',
    example: `#!/usr/bin/env sh
# 服务器端钩子示例
while read oldrev newrev refname; do
  # 验证分支命名规范
  if [[ $refname =~ refs/heads/ ]]; then
    branch=\${refname#refs/heads/}
    if ! [[ $branch =~ ^(feature|fix|hotfix)/[A-Z]+-[0-9]+-.+$ ]]; then
      echo "分支名称不符合规范: $branch"
      exit 1
    fi
  fi
done`
  }
]);

// 高级配置
const advancedConfig = ref([
  {
    name: '多包管理器支持',
    description: '自动检测包管理器 (npm/yarn/pnpm)',
    example: `// .huskyrc.js
module.exports = {
  hooks: {
    'pre-commit': 'lint-staged'
  }
};`
  },
  {
    name: '条件执行',
    description: '根据条件跳过某些钩子执行',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 仅在特定分支上运行测试
if [ "$(git branch --show-current)" = "main" ]; then
  npm test
fi`
  },
  {
    name: '多命令执行',
    description: '在单个钩子中运行多个命令',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:js &&
npm run lint:css &&
npm run test:unit`
  },
  {
    name: '跨平台支持',
    description: '处理 Windows 和 Unix 系统的兼容性',
    example: `#!/bin/sh
# 使用 sh 而不是 bash 确保跨平台兼容性
. "$(dirname "$0")/_/husky.sh"

# 使用 node 命令执行脚本
node ./scripts/pre-commit.js`
  },
  {
    name: '自定义脚本',
    description: '在钩子中调用自定义脚本',
    example: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 调用自定义 Node.js 脚本
node ./scripts/pre-commit-check.js`
  },
  {
    name: '禁用自动安装',
    description: '防止 Husky 自动设置钩子',
    example: `// package.json
{
  "husky": {
    "skipInstall": true
  }
}`
  },
  {
    name: '仅验证暂存文件',
    description: '使用 lint-staged 只检查即将提交的文件',
    example: `// package.json
{
  "lint-staged": {
    "*.{js,jsx}": "eslint --fix",
    "*.{css,scss}": "stylelint --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}`
  },
  {
    name: '调试钩子',
    description: '启用调试模式查看钩子执行详情',
    example: 'HUSKY_DEBUG=1 git commit -m "test"'
  }
]);

// 最佳实践
const bestPractices = ref([
  {
    title: '与 lint-staged 集成',
    description: '只对 Git 暂存区的文件进行检查，提高效率',
    example: `// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.{css,scss}": "stylelint --fix",
    "*.{json,md}": "prettier --write"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}`
  },
  {
    title: '提交消息规范',
    description: '使用 commitlint 强制规范的提交消息格式',
    example: `// .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1`
  },
  {
    title: '复杂检查分离',
    description: '将复杂的检查逻辑分离到单独的脚本文件',
    example: `// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 运行自定义检查脚本
node ./scripts/pre-commit-checks.js`
  },
  {
    title: '团队协作配置',
    description: '确保团队成员使用相同的 Git 钩子配置',
    example: `// package.json
{
  "scripts": {
    "postinstall": "husky install"
  }
}`
  },
  {
    title: '性能优化',
    description: '并行运行任务以加速钩子执行',
    example: `// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 使用 npm-run-all 并行运行任务
npx npm-run-all --parallel lint test`
  },
  {
    title: '错误处理',
    description: '提供友好的错误信息和解决建议',
    example: `// ./scripts/pre-commit-checks.js
try {
  // 执行检查...
} catch (error) {
  console.error('❌ 提交前检查失败:');
  console.error(error.message);
  console.log('💡 请修复上述问题后再提交');
  console.log('🚫 若要跳过检查使用: git commit --no-verify');
  process.exit(1);
}`
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.husky-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .husky-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .dog-icon {
      font-size: 2.5rem;
    }
  }

  h1 {
    margin: 0;
    font-size: 2.2rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
    margin-top: 10px;
    opacity: 0.9;
    font-weight: 300;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
  flex-wrap: wrap;

  .tab-btn {
    padding: 10px 20px;
    background: @card-bg;
    border: none;
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

    &:hover {
      background: darken(@card-bg, 2%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 2px 8px fade(@primary-color, 30%);
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 25px;
}

.config-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: flex;
  background: fade(@primary-color, 8%);
  font-weight: 600;
  color: @primary-color;
  border-bottom: 1px solid #f0f0f0;

  .col-name {
    flex: 1.5;
    padding: 12px 15px;
    border-right: 1px solid #f0f0f0;
  }

  .col-desc {
    flex: 2.5;
    padding: 12px 15px;
    border-right: 1px solid #f0f0f0;
  }

  .col-example {
    flex: 2;
    padding: 12px 15px;
  }
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: #fafbff;
  }

  .col-name {
    flex: 1.5;
    padding: 12px 15px;
    border-right: 1px solid #f0f0f0;
    font-weight: 500;
  }

  .col-desc {
    flex: 2.5;
    padding: 12px 15px;
    border-right: 1px solid #f0f0f0;
    font-size: 0.95rem;
    color: @text-light;
  }

  .col-example {
    flex: 2;
    padding: 12px 15px;

    pre {
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.4;
      white-space: pre-wrap;
      font-family: 'Fira Code', monospace;
      color: @text-light;
      background: #f9f9ff;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #f0f0f0;
      overflow-x: auto;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.practice-card {
  background: #f9f9ff;
  border-radius: 8px;
  padding: 20px;
  border-left: 3px solid @accent-color;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @primary-color;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 15px;
    color: @text-light;
    font-size: 0.95rem;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 6px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.4;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 25px 0;
  color: @text-lighter;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 12px 0;

    a {
      color: @primary-color;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .version {
    margin-top: 5px;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .tabs {
    gap: 5px;

    .tab-btn {
      padding: 8px 15px;
      font-size: 0.9rem;
    }
  }

  .table-header,
  .table-row {
    flex-direction: column;
  }

  .col-name,
  .col-desc,
  .col-example {
    flex: none !important;
    width: 100%;
    border-right: none !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 12px !important;
  }

  .table-row .col-example {
    border-bottom: none;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
