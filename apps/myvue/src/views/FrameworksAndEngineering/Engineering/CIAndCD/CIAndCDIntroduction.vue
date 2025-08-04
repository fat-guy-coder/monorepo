<template>
  <div class="ci-cd-container">
    <!-- 头部 -->
    <header class="header">
      <h1 class="title">前端CI/CD实践指南</h1>
      <p class="subtitle">自动化构建、测试与部署的最佳实践</p>
      <div class="toolbar">
        <button class="btn" @click="toggleTheme">
          {{ darkMode ? '浅色模式' : '深色模式' }}
        </button>
        <button class="btn" @click="printGuide">打印指南</button>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="content">
      <!-- 导航 -->
      <nav class="nav">
        <ul>
          <li v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === item.id }"
            @click="scrollToSection(item.id)">
            {{ item.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="sections">
        <!-- 什么是CI/CD -->
        <section id="what-is" ref="whatIs" class="section">
          <h2 class="section-title">什么是CI/CD?</h2>
          <div class="section-content">
            <div class="definition">
              <div class="ci">
                <h3>持续集成 (CI)</h3>
                <p>开发人员频繁地将代码变更合并到共享仓库中，每次变更都会触发自动构建和测试流程，以便尽早发现问题。</p>
              </div>
              <div class="cd">
                <h3>持续交付/部署 (CD)</h3>
                <p>持续交付：每次代码变更都会自动构建、测试并准备发布到生产环境。</p>
                <p>持续部署：在持续交付的基础上，自动将变更部署到生产环境。</p>
              </div>
            </div>
            <div class="benefits">
              <h3>前端CI/CD的优势</h3>
              <ul>
                <li><span class="icon">🚀</span> 加快开发迭代速度</li>
                <li><span class="icon">🔍</span> 及早发现并修复问题</li>
                <li><span class="icon">🛡️</span> 减少人工操作错误</li>
                <li><span class="icon">🧪</span> 提高测试覆盖率</li>
                <li><span class="icon">⚖️</span> 确保一致的构建环境</li>
                <li><span class="icon">📦</span> 自动化部署流程</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- CI/CD方案 -->
        <section id="solutions" ref="solutions" class="section">
          <h2 class="section-title">主流CI/CD解决方案</h2>
          <div class="solution-cards">
            <template v-if="solutionsData && solutionsData.length > 0">
              <div v-for="solution in solutionsData" :key="solution.name" class="card">
                <div class="card-header">
                  <img :src="solution.logo" :alt="solution.name" class="logo" />
                  <h3>{{ solution.name }}</h3>
                </div>
                <div class="card-body">
                  <p class="description">{{ solution.description }}</p>
                  <div class="features">
                    <h4>主要特点：</h4>
                    <ul>
                      <li v-for="(feature, idx) in solution.features" :key="idx">{{ feature }}</li>
                    </ul>
                  </div>
                  <div class="pricing">
                    <span :class="solution.pricing.type">{{ solution.pricing.text }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </section>

        <section>
          <h2>gitlab CI/CD</h2>
          <img style="width: 100%;" :src="gitlabCiCd" alt="gitlab CI/CD">
        </section>

        <section>
          <h2>github CI/CD details</h2>
          <img style="width: 100%;" :src="githubCiCdWorkflow" alt="github CI/CD">
        </section>

        <!-- 配置指南 -->
        <section id="configuration" ref="configuration" class="section">
          <h2 class="section-title">CI/CD配置指南</h2>
          <div class="config-guide">
            <div class="steps">
              <div v-for="step in configurationSteps" :key="step.title" class="step">
                <div class="step-header">
                  <div class="step-number">{{ step.number }}</div>
                  <h3>{{ step.title }}</h3>
                </div>
                <div class="step-content">
                  <p>{{ step.description }}</p>
                  <div v-if="step.code" class="code-block">
                    <pre><code>{{ step.code }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            <div class="visual">
              <div class="pipeline">
                <div class="pipeline-step" v-for="(step, idx) in pipelineStepsData" :key="idx">
                  <div class="step-icon">{{ step.icon }}</div>
                  <div class="step-name">{{ step.name }}</div>
                </div>
                <div class="pipeline-line"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section id="use-cases" ref="useCases" class="section">
          <h2 class="section-title">CI/CD使用场景</h2>
          <div class="use-cases">
            <div v-for="(useCase, idx) in useCasesData" :key="idx" class="case">
              <div class="case-header">
                <div class="case-icon">{{ useCase.icon }}</div>
                <h3>{{ useCase.title }}</h3>
              </div>
              <div class="case-content">
                <p>{{ useCase.description }}</p>
                <ul>
                  <li v-for="(item, i) in useCase.details" :key="i">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2023 前端工程化实践 | 使用Vue3 + TypeScript构建</p>
      <p>持续集成，持续部署，持续进步！</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gitlabCiCd from '@/assets/gitlab.png';
import githubCiCdWorkflow from '@/assets/gitlab_workflow.png';

// 响应式数据
const darkMode = ref(false);
const activeSection = ref('what-is');
const whatIs = ref<HTMLElement | null>(null);
const solutions = ref<HTMLElement | null>(null);
const configuration = ref<HTMLElement | null>(null);
const useCases = ref<HTMLElement | null>(null);

// 导航项
const navItems = ref([
  { id: 'what-is', title: '什么是CI/CD' },
  { id: 'solutions', title: '解决方案' },
  { id: 'configuration', title: '配置指南' },
  { id: 'use-cases', title: '使用场景' }
]);

// CI/CD解决方案数据
const solutionsData = ref([
  {
    name: 'GitHub Actions',
    logo: 'github-logo',
    description: 'GitHub原生CI/CD解决方案，与GitHub仓库无缝集成',
    features: [
      '免费提供2000分钟/月的构建时间',
      '丰富的预定义Actions市场',
      '支持矩阵构建',
      '易于版本控制的工作流文件'
    ],
    pricing: { type: 'free', text: '免费方案可用' }
  },
  {
    name: 'GitLab CI',
    logo: 'gitlab-logo',
    description: 'GitLab内置的CI/CD系统，提供完整的DevOps解决方案',
    features: [
      '与GitLab仓库深度集成',
      '强大的流水线可视化',
      '支持多项目流水线',
      '内置容器注册表'
    ],
    pricing: { type: 'free', text: '免费方案可用' }
  },
  {
    name: 'Jenkins',
    logo: 'jenkins-logo',
    description: '开源的自动化服务器，高度可定制且插件丰富',
    features: [
      '数百种可用插件',
      '支持分布式构建',
      '强大的流水线DSL',
      '社区支持强大'
    ],
    pricing: { type: 'free', text: '完全免费' }
  },
  {
    name: 'CircleCI',
    logo: 'circleci-logo',
    description: '云原生的CI/CD平台，专注于速度和可靠性',
    features: [
      '快速的Docker化构建',
      '灵活的配置选项',
      '支持本地调试',
      '丰富的Orbs生态系统'
    ],
    pricing: { type: 'paid', text: '免费方案有限' }
  }
]);

// 配置步骤
const configurationSteps = ref([
  {
    number: 1,
    title: '创建配置文件',
    description: '在项目根目录创建CI/CD配置文件，如.github/workflows/main.yml',
    code: `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]`
  },
  {
    number: 2,
    title: '设置构建环境',
    description: '定义运行环境，通常使用最新LTS版本的Node.js',
    code: `jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'`
  },
  {
    number: 3,
    title: '安装依赖',
    description: '安装项目依赖，可使用缓存加速后续构建',
    code: `- name: Install dependencies
  run: npm ci

- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}`
  },
  {
    number: 4,
    title: '运行测试',
    description: '执行自动化测试，确保代码质量',
    code: `- name: Run tests
  run: npm test`
  },
  {
    number: 5,
    title: '构建项目',
    description: '构建生产环境优化的项目',
    code: `- name: Build project
  run: npm run build`
  },
  {
    number: 6,
    title: '部署应用',
    description: '将构建产物部署到目标环境',
    code: `- name: Deploy to production
  uses: JamesIves/github-pages-deploy-action@v4
  with:
    branch: gh-pages
    folder: dist`
  }
]);

// 流水线步骤可视化
const pipelineStepsData = ref([
  { icon: '📥', name: '代码提交' },
  { icon: '🧪', name: '代码检查' },
  { icon: '🔧', name: '安装依赖' },
  { icon: '✅', name: '运行测试' },
  { icon: '🏗️', name: '构建项目' },
  { icon: '🚀', name: '部署上线' }
]);

// 使用场景
const useCasesData = ref([
  {
    icon: '🔄',
    title: '自动化构建与部署',
    description: '每次代码变更时自动构建和部署应用',
    details: [
      '减少手动操作错误',
      '确保环境一致性',
      '加快发布流程',
      '支持多环境部署（开发、测试、生产）'
    ]
  },
  {
    icon: '🧪',
    title: '自动化测试',
    description: '在每次代码提交时自动运行测试套件',
    details: [
      '及早发现代码缺陷',
      '确保新功能不破坏现有逻辑',
      '提高代码质量',
      '生成测试覆盖率报告'
    ]
  },
  {
    icon: '📐',
    title: '代码质量检查',
    description: '自动化执行代码规范检查和静态分析',
    details: [
      '强制执行编码规范',
      '检测潜在代码问题',
      '保持代码风格一致',
      '集成ESLint、Stylelint等工具'
    ]
  },
  {
    icon: '📦',
    title: '依赖管理',
    description: '自动化管理项目依赖和安全性',
    details: [
      '自动更新依赖版本',
      '检测安全漏洞',
      '生成软件物料清单（SBOM）',
      '防止引入恶意依赖'
    ]
  }
]);

// 切换主题
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle('dark-mode', darkMode.value);
};

// 打印指南
const printGuide = () => {
  window.print();
};

// 滚动到指定区域
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
  }
};

// 监听滚动事件以更新活动导航项
const handleScroll = () => {
  const sections = [
    whatIs.value,
    solutions.value,
    configuration.value,
    useCases.value
  ];

  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navItems.value[i].id;
      break;
    }
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@danger-color: #e74c3c;
@dark-bg: #1a1a2e;
@dark-text: #f0f0f0;
@dark-card: #16213e;
@light-bg: #f8f9fa;
@light-text: #333;
@light-card: #fff;
@border-radius: 8px;
@box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
@transition: all 0.3s ease;

.ci-cd-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: @light-bg;
  color: @light-text;
  transition: @transition;

  &.dark-mode {
    background-color: @dark-bg;
    color: @dark-text;
  }
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: @border-radius;
  background: linear-gradient(135deg, @primary-color, darken(@primary-color, 15%));
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
    background-size: cover;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .toolbar {
    display: flex;
    justify-content: center;
    gap: 15px;
    position: relative;
    z-index: 1;
  }

  .btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: @transition;
    backdrop-filter: blur(5px);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
}

.content {
  display: flex;
  gap: 30px;
}

.nav {
  flex: 0 0 250px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  background: @light-card;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;

  .dark-mode & {
    background: @dark-card;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 12px 15px;
    margin-bottom: 8px;
    border-radius: @border-radius;
    cursor: pointer;
    transition: @transition;
    font-weight: 500;

    &:hover {
      background: fade(@primary-color, 10%);
      color: @primary-color;
    }

    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.sections {
  flex: 1;
}

.section {
  background: @light-card;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 30px;
  margin-bottom: 30px;

  .dark-mode & {
    background: @dark-card;
  }
}

.section-title {
  color: @primary-color;
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid fade(@primary-color, 20%);
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.definition {
  background: fade(@primary-color, 5%);
  padding: 20px;
  border-radius: @border-radius;

  .ci,
  .cd {
    margin-bottom: 25px;

    h3 {
      color: @primary-color;
      margin-top: 0;
    }
  }
}

.benefits {
  h3 {
    color: @secondary-color;
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      border-bottom: 1px solid fade(@primary-color, 10%);
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.2rem;
      }
    }
  }
}

.solution-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.card {
  background: @light-card;
  border-radius: @border-radius;
  overflow: hidden;
  box-shadow: @box-shadow;
  transition: @transition;

  .dark-mode & {
    background: darken(@dark-card, 3%);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
    padding: 20px;
    color: white;
    display: flex;
    align-items: center;

    .logo {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: @primary-color;
    }

    h3 {
      margin: 0;
    }
  }

  .card-body {
    padding: 20px;

    .description {
      color: fade(@light-text, 80%);
      min-height: 60px;

      .dark-mode & {
        color: fade(@dark-text, 70%);
      }
    }

    .features {
      margin: 20px 0;

      h4 {
        margin: 0 0 10px 0;
        color: @primary-color;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          line-height: 1.5;
        }
      }
    }

    .pricing {
      text-align: right;

      span {
        padding: 5px 15px;
        border-radius: 20px;
        font-weight: 600;

        &.free {
          background: fade(@secondary-color, 15%);
          color: darken(@secondary-color, 15%);
        }

        &.paid {
          background: fade(@danger-color, 15%);
          color: darken(@danger-color, 10%);
        }
      }
    }
  }
}

.config-guide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.steps {
  .step {
    margin-bottom: 25px;
    padding: 20px;
    border-radius: @border-radius;
    background: fade(@primary-color, 5%);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: @primary-color;
    }

    .step-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
        flex-shrink: 0;
      }

      h3 {
        margin: 0;
        color: @primary-color;
      }
    }

    .step-content {
      p {
        margin-top: 0;
      }
    }

    .code-block {
      background: #2c3e50;
      color: #ecf0f1;
      border-radius: @border-radius;
      padding: 15px;
      margin-top: 15px;
      overflow-x: auto;

      pre {
        margin: 0;

        code {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.visual {
  display: flex;
  align-items: center;
  justify-content: center;

  .pipeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;

    .pipeline-step {
      background: @light-card;
      border: 2px solid @primary-color;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 60px;
      position: relative;
      z-index: 1;
      transition: @transition;

      .dark-mode & {
        background: @dark-card;
      }

      &:hover {
        transform: scale(1.1);
        background: fade(@primary-color, 10%);
      }

      .step-icon {
        font-size: 1.8rem;
        margin-bottom: 5px;
      }

      .step-name {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
      }
    }

    .pipeline-line {
      position: absolute;
      top: 0;
      height: calc(100% - 80px);
      width: 4px;
      background: @primary-color;
      z-index: 0;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.case {
  background: @light-card;
  border-radius: @border-radius;
  overflow: hidden;
  box-shadow: @box-shadow;
  transition: @transition;

  .dark-mode & {
    background: @dark-card;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .case-header {
    background: linear-gradient(135deg, @secondary-color, darken(@secondary-color, 10%));
    padding: 20px;
    display: flex;
    align-items: center;

    .case-icon {
      font-size: 1.8rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      color: white;
    }
  }

  .case-content {
    padding: 20px;

    p {
      margin-top: 0;
      color: fade(@light-text, 80%);

      .dark-mode & {
        color: fade(@dark-text, 70%);
      }
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px;
  margin-top: 40px;
  border-top: 1px solid fade(@primary-color, 20%);
  color: fade(@light-text, 70%);
  font-size: 0.9rem;

  .dark-mode & {
    color: fade(@dark-text, 60%);
  }

  p {
    margin: 5px 0;
  }
}

@media print {

  .toolbar,
  .nav {
    display: none;
  }

  .content {
    display: block;
  }

  .header {
    background: none;
    color: @light-text;
    padding: 0;

    .title {
      color: @primary-color;
    }
  }

  .section {
    box-shadow: none;
    border: 1px solid #eee;
    page-break-inside: avoid;
  }
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .nav {
    position: static;
    margin-bottom: 20px;
  }
}
</style>
