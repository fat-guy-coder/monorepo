<template>
  <div class="eslint-guide">
    <header class="guide-header">
      <div class="header-content">
        <h1>ESLint 基本指南</h1>
        <p>提升代码质量，统一团队规范，减少错误</p>
      </div>
      <div class="header-icon">
        <div class="eslint-logo"></div>
      </div>
    </header>

    <div class="content-container">
      <section class="intro-section">
        <h2>什么是 ESLint？</h2>
        <div class="card">
          <p>ESLint 是一个开源的 JavaScript/TypeScript 代码检查工具，用于识别和报告代码中的问题模式。它帮助开发者：</p>
          <ul>
            <li>发现潜在错误和问题代码</li>
            <li>强制执行一致的编码风格</li>
            <li>提高代码可读性和可维护性</li>
            <li>在代码提交前自动修复问题</li>
          </ul>
        </div>
      </section>

      <div class="columns">
        <section class="core-section">
          <h2>核心配置项基础介绍</h2>
          <div class="config-card">
            <div class="config-item" v-for="(item, index) in coreConfigs" :key="index">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="config-details">
                <div v-for="(param, pIndex) in item.params" :key="pIndex" class="param-item">
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
          <h2>ESLint 工作流程</h2>
          <div class="workflow-card">
            <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>

          <h2 class="benefits-title">ESLint 核心优势</h2>
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
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.label }}
            </button>
          </div>

          <div class="tab-content">
            <pre v-show="activeTab === 0"><code class="javascript">// .eslintrc.js 示例
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never']
  }
}</code></pre>

            <pre v-show="activeTab === 1"><code class="json">// .eslintrc.json 示例
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "parser": "@typescript-eslint/parser"
  },
  "plugins": ["vue", "@typescript-eslint"],
  "rules": {
    "no-console": "off",
    "no-debugger": "warn",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
}</code></pre>

            <pre v-show="activeTab === 2"><code class="javascript">// package.json 中的 ESLint 配置
{
  "name": "my-project",
  "version": "1.0.0",
  "eslintConfig": {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:vue/vue3-essential"],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "rules": {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "never"]
    }
  }
}</code></pre>
          </div>
        </div>
      </section>
    </div>

    <footer class="guide-footer">
      <p>ESLint 是一个强大的工具，能够显著提高代码质量和团队协作效率。定期更新规则集并根据项目需求调整配置是保持其有效性的关键。</p>
      <div class="footer-links">
        <a href="https://eslint.org/" target="_blank">官方网站</a>
        <a href="https://github.com/eslint/eslint" target="_blank">GitHub 仓库</a>
        <a href="https://eslint.org/docs/rules/" target="_blank">规则文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { label: '.eslintrc.js' },
  { label: '.eslintrc.json' },
  { label: 'package.json' }
];

const coreConfigs = [
  {
    title: "环境配置 (env)",
    description: "定义代码运行的全局环境",
    params: [
      {
        name: "browser",
        description: "浏览器全局变量，如 window 和 document"
      },
      {
        name: "node",
        description: "Node.js 全局变量和作用域"
      },
      {
        name: "es6",
        description: "启用除模块外的所有 ECMAScript 6 特性"
      },
      {
        name: "es2021",
        description: "启用所有 ECMAScript 2021 特性"
      }
    ],
    example: `env: {
  browser: true,
  node: true,
  es2021: true
}`
  },
  {
    title: "扩展配置 (extends)",
    description: "继承共享配置集，减少手动配置",
    params: [
      {
        name: "eslint:recommended",
        description: "ESLint 官方推荐规则集"
      },
      {
        name: "eslint:all",
        description: "包含所有 ESLint 核心规则"
      },
      {
        name: "plugin:vue/recommended",
        description: "Vue.js 官方推荐规则集"
      },
      {
        name: "plugin:@typescript-eslint/recommended",
        description: "TypeScript 官方推荐规则集"
      },
      {
        name: "airbnb",
        description: "流行的 Airbnb JavaScript 风格指南"
      }
    ],
    example: `extends: [
  'eslint:recommended',
  'plugin:vue/vue3-recommended',
  'plugin:@typescript-eslint/recommended'
]`
  },
  {
    title: "规则配置 (rules)",
    description: "自定义或覆盖特定规则",
    params: [
      {
        name: "规则名称",
        description: "如 'no-console' 或 'indent'",
        values: [
          { value: "off/0", description: "禁用规则" },
          { value: "warn/1", description: "警告级别" },
          { value: "error/2", description: "错误级别" }
        ]
      },
      {
        name: "选项",
        description: "规则的可配置选项"
      }
    ],
    example: `rules: {
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'indent': ['error', 2],
  'quotes': ['error', 'single'],
  'semi': ['error', 'never']
}`
  },
  {
    title: "解析器选项 (parserOptions)",
    description: "指定 JavaScript 语言选项",
    params: [
      {
        name: "ecmaVersion",
        description: "指定使用的 ECMAScript 版本",
        values: [
          { value: "3-12", description: "指定版本 (3, 5, 6...)" },
          { value: "latest", description: "使用最新支持版本" }
        ]
      },
      {
        name: "sourceType",
        description: "指定代码类型",
        values: [
          { value: "script", description: "传统脚本" },
          { value: "module", description: "ECMAScript 模块" }
        ]
      },
      {
        name: "ecmaFeatures",
        description: "指定要使用的额外语言特性"
      }
    ],
    example: `parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
}`
  },
  {
    title: "插件 (plugins)",
    description: "扩展 ESLint 功能，添加额外规则",
    params: [
      {
        name: "vue",
        description: "支持 Vue.js 单文件组件"
      },
      {
        name: "@typescript-eslint",
        description: "支持 TypeScript"
      },
      {
        name: "react",
        description: "支持 React"
      },
      {
        name: "jest",
        description: "支持 Jest 测试框架"
      }
    ],
    example: `plugins: [
  'vue',
  '@typescript-eslint',
  'react'
]`
  }
];

const workflowSteps = [
  {
    title: "初始化配置",
    description: "创建 .eslintrc 配置文件或使用 package.json 中的 eslintConfig 字段"
  },
  {
    title: "定义规则集",
    description: "选择基础规则集并自定义特定规则以满足项目需求"
  },
  {
    title: "集成开发环境",
    description: "安装 ESLint 插件到 VS Code 或其他编辑器，实时显示错误"
  },
  {
    title: "运行检查",
    description: "通过命令行执行 eslint 或设置开发环境实时检查"
  },
  {
    title: "自动修复",
    description: "使用 eslint --fix 自动修复可修复的问题"
  },
  {
    title: "持续集成",
    description: "在 CI/CD 流程中添加 ESLint 检查，确保代码质量"
  }
];

const benefits = [
  {
    title: "错误预防",
    description: "在开发早期捕获常见错误，减少运行时错误"
  },
  {
    title: "代码一致性",
    description: "统一团队代码风格，提高可读性和可维护性"
  },
  {
    title: "最佳实践",
    description: "强制执行最佳实践，提高代码质量"
  },
  {
    title: "可扩展性",
    description: "通过插件支持各种框架和技术栈"
  },
  {
    title: "自动修复",
    description: "自动修复大量常见问题，节省开发时间"
  },
  {
    title: "团队协作",
    description: "减少代码审查时间，提高团队协作效率"
  }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 基础变量
@primary-color: #4b5ef0;
@secondary-color: #6d5ef7;
@accent-color: #4cc9f0;
@background: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2d3748;
@light-text: #718096;
@border-color: #e2e8f0;
@success-color: #48bb78;
@warning-color: #ecc94b;
@error-color: #f56565;
@card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

// 重置与基础样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.eslint-guide {
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
    .eslint-logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #8080ff, #4b5ef0);
      border-radius: 50%;
      position: relative;

      &::before {
        content: "E";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5rem;
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
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;

    li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;

      &::before {
        content: "•";
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
      content: "";
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'/%3E%3C/svg%3E");
  }

  .benefit-4::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E");
  }

  .benefit-5::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'/%3E%3C/svg%3E");
  }

  .benefit-6::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E");
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
        content: "";
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
