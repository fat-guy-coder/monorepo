<template>
  <div class="frontend-learning-path">
    <main class="content">
      <p>
        ⭐⭐⭐代表基础知识务必掌握，⭐⭐代表中阶知识熟练掌握，⭐代表高阶知识要掌握，🌟代表进阶知识可掌握
      </p>
      <section class="stage-details-section">
        <h2 class="section-title">学习路线</h2>
        <div class="stage-tabs">
          <button v-for="stage in learningStages" :key="stage.id" class="stage-tab"
            :class="{ active: activeStage === stage.id }" @click="setActiveStage(stage.id)">
            <span class="tab-number">{{ stage.order }}</span>
            {{ stage.shortTitle }}
          </button>
        </div>

        <div class="stage-content-container">
          <div v-for="stage in learningStages" :key="stage.id" v-show="activeStage === stage.id"
            class="stage-detail-content">
            <div class="stage-header">
              <h3>{{ stage.title }}</h3>
              <div class="stage-meta">
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ stage.duration }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">🎯</span>
                  {{ stage.level }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">📊</span>
                  完成度: {{ stage.progress }}
                </span>
              </div>
            </div>

            <div class="learning-modules">
              <div v-for="module in stage.modules" :key="module.id" class="learning-module"
                :class="{ completed: module.completed }">
                <div class="module-header">
                  <div class="module-icon">{{ module.icon }}</div>
                  <div class="module-info">
                    <h4>
                      <Link :route="module.route">{{ module.title }}</Link>
                    </h4>
                    <p class="module-desc">{{ module.description }}</p>
                  </div>
                  <div class="module-status">
                    <span class="status-badge" :class="module.difficulty">
                      {{ module.difficulty }}
                    </span>
                    <span class="time-estimate">⏱️ {{ module.time }}</span>
                  </div>
                </div>

                <div class="module-content">
                  <div class="topics-section">
                    <h5>学习要点</h5>
                    <div class="topics-grid">
                      <div v-for="topic in module.topics" :key="topic.route">
                        <Link :route="topic.route" class="topic-check">✓</Link>
                        {{ topic.title }}
                      </div>
                    </div>
                  </div>

                  <div class="resources-section">
                    <h5>其他学习资源</h5>
                    <div class="resources-list">
                      <a v-for="resource in module.resources" :key="resource.name" :href="resource.url" target="_blank"
                        class="resource-link">
                        <span class="resource-icon">{{ resource.icon }}</span>
                        <span class="resource-name">{{ resource.name }}</span>
                        <span class="resource-type">{{ resource.type }}</span>
                      </a>
                    </div>
                  </div>

                  <div class="projects-section" v-if="module.projects">
                    <h5>实践项目</h5>
                    <div class="projects-list">
                      <div v-for="project in module.projects" :key="project.name" class="project-item">
                        <div class="project-icon">{{ project.icon }}</div>
                        <div class="project-info">
                          <strong>{{ project.name }}</strong>
                          <p>{{ project.description }}</p>
                        </div>
                        <div class="project-difficulty" :class="project.difficulty">
                          {{ project.difficulty }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-section">
        <h2 class="section-title">开发工具推荐</h2>
        <div class="tools-categories">
          <div v-for="category in toolCategories" :key="category.id" class="tool-category">
            <h3>{{ category.name }}</h3>
            <div class="tools-grid">
              <div v-for="tool in category.tools" :key="tool.name" class="tool-card"
                :class="{ essential: tool.essential }">
                <div class="tool-header">
                  <div class="tool-icon">{{ tool.icon }}</div>
                  <div class="tool-info">
                    <h4>{{ tool.name }}</h4>
                    <span class="tool-type">{{ tool.type }}</span>
                  </div>
                </div>
                <p class="tool-desc">{{ tool.description }}</p>
                <div class="tool-links">
                  <a :href="tool.url" target="_blank" class="tool-link">官网</a>
                  <a v-if="tool.docs" :href="tool.docs" target="_blank" class="tool-link">文档</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="career-section">
        <h2 class="section-title">职业发展路径</h2>
        <div class="career-path">
          <div v-for="level in careerLevels" :key="level.id" class="career-level" :class="level.id">
            <div class="level-header">
              <h3>{{ level.title }}</h3>
              <span class="level-salary">{{ level.salary }}</span>
            </div>
            <div class="level-skills">
              <h4>核心技能</h4>
              <div class="skills-list">
                <span v-for="skill in level.skills" :key="skill" class="skill-tag">{{
                  skill
                }}</span>
              </div>
            </div>
            <div class="level-responsibilities">
              <h4>主要职责</h4>
              <ul>
                <li v-for="resp in level.responsibilities" :key="resp">{{ resp }}</li>
              </ul>
            </div>
            <div class="level-duration">
              <span class="duration">⏱️ {{ level.experience }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-tips-section">
        <h2 class="section-title">学习建议与技巧</h2>
        <div class="tips-container">
          <div class="tips-grid">
            <div v-for="tip in learningTips" :key="tip.id" class="tip-card">
              <div class="tip-icon">{{ tip.icon }}</div>
              <h3>{{ tip.title }}</h3>
              <p>{{ tip.description }}</p>
              <div class="tip-actions">
                <span v-for="action in tip.actions" :key="action" class="action-tag">{{
                  action
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="author-section">
        <div class="author-item"><span>作者</span>:老邓</div>
        <div class="author-item"><span>邮箱</span>:dldl0830@foxmail.com</div>
        <div class="author-item"><span>QQ</span>:583486505</div>
        <div class="author-item"><span>微信</span>:15680690572</div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Link from 'components/Link/index.vue'

const emit = defineEmits(['goToByRouteName'])

const gotoTopic = (route: string) => {
  emit('goToByRouteName', route)
}

// 响应式数据
const activeStage = ref('foundation')

// 学习阶段数据
const learningStages = ref([
  {
    id: 'foundation',
    order: 1,
    title: '基础入门阶段',
    shortTitle: '基础入门',
    description: '掌握前端开发的基础知识，建立完整的开发环境',
    duration: '1-2个月',
    level: '初学者',
    progress: '15%',
    modules: [
      {
        id: 'html-basics',
        title: 'HTML 基础',
        icon: '🌐',
        description: '学习网页结构标记语言，构建网页骨架',
        difficulty: '简单',
        time: '2周',
        completed: true,
        route: 'WhatIsHtml',
        topics: [
          {
            title: 'HTML5 文档结构',
            route: 'WhatIsHtml'
          },
          {
            title: '常用标签和属性',
            route: 'CommonUseTags'
          },
          {
            title: '表单和输入控件',
            route: 'FormElements'
          },
          {
            title: '语义化标签',
            route: 'SemanticTags'
          },
          {
            title: 'SEO 基础优化',
            route: 'SEO'
          },
          {
            title: '可访问性基础',
            route: 'AccessibilityBasics'
          },
        ],
        resources: [
          {
            name: 'MDN HTML 指南',
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
            type: '文档',
            icon: '📚',
          },
          { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: '教程', icon: '🎓' },
          { name: 'W3Schools', url: 'https://www.w3schools.com/html/', type: '参考', icon: '🔍' },
        ],
        projects: [
          {
            name: '个人简历页面',
            description: '使用纯HTML创建个人简历',
            icon: '📄',
            difficulty: '简单',
          },
          { name: '产品展示页', description: '构建产品介绍页面', icon: '🛒', difficulty: '简单' },
        ],
      },
      {
        id: 'css-basics',
        title: 'CSS 基础',
        icon: '🎨',
        description: '掌握样式设计，让网页变得美观',
        difficulty: '简单',
        time: '3周',
        completed: true,
        route: 'CSSProfile',
        topics: [
          {
            title: '选择器和优先级',
            route: 'CSSSelectors'
          },
          {
            title: '布局',
            route: 'BFC_IFC'
          },
          {
            title: '盒模型',
            route: 'BFC_IFC'
          },
          {
            title: 'Flexbox 布局',
            route: 'Flexbox'
          },
          {
            title: 'Grid 布局',
            route: 'Grid'
          },
          {
            title: '响应式设计',
            route: 'MediaQueries'
          },
          {
            title: 'CSS3 新特性',
            route: 'CSS3Overview'
          },
          {
            title: '动画',
            route: 'Animation'
          },
          {
            title: '过渡',
            route: 'Transition'
          },
        ],
        resources: [
          {
            name: 'MDN CSS 指南',
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS',
            type: '文档',
            icon: '📚',
          },
          { name: 'CSS-Tricks', url: 'https://css-tricks.com/', type: '教程', icon: '🎨' },
          { name: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', type: '游戏', icon: '🐸' },
        ],
        projects: [
          {
            name: '个人博客样式',
            description: '为博客添加完整样式',
            icon: '📝',
            difficulty: '中等',
          },
          {
            name: '响应式导航栏',
            description: '创建自适应导航菜单',
            icon: '🧭',
            difficulty: '中等',
          },
        ],
      },
      {
        id: 'js-basics',
        title: 'JavaScript 基础',
        icon: '⚡',
        description: '学习编程逻辑，实现网页交互功能',
        difficulty: '中等',
        time: '1个月',
        completed: false,
        route: 'WhatIsJS',
        topics: [
          {
            title: '变量',
            route: 'Variables'
          },
          {
            title: '数据类型',
            route: 'PrimitiveTypes'
          },
          {
            title: '运算符',
            route: 'Operators'
          },
          {
            title: '流程控制',
            route: 'FlowControl'
          },
          {
            title: '迭代和循环(iteration)',
            route: 'Iteration'
          },
          {
            title: 'DOM 操作',
            route: 'DOMAddDeleteModifyQuery'
          },
          {
            title: '函数',
            route: 'FunctionProgrammingIntroduce'
          },
          {
            title: '作用域',
            route: 'Scope'
          },
          {
            title: '数组',
            route: 'Array1'
          },
          {
            title: '对象',
            route: 'Object1'
          },
          {
            title: 'DOM',
            route: 'Dom'
          },
          {
            title: '事件处理',
            route: 'EventsIntroduce'
          },
          {
            title: 'ES6+ 新特性',
            route: 'ES+Overview'
          },
        ],
        resources: [
          {
            name: 'MDN JavaScript',
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
            type: '文档',
            icon: '📚',
          },
          { name: 'JavaScript.info', url: 'https://javascript.info/', type: '教程', icon: '🎓' },
          {
            name: 'Eloquent JavaScript',
            url: 'https://eloquentjavascript.net/',
            type: '书籍',
            icon: '📖',
          },
        ],
        projects: [
          { name: '待办事项应用', description: '实现增删改查功能', icon: '✅', difficulty: '中等' },
          { name: '计算器', description: '实现科学计算器功能', icon: '🧮', difficulty: '中等' },
          { name: '图片轮播', description: '创建自动轮播组件', icon: '🖼️', difficulty: '中等' },
        ],
      },
    ],
    route: 'FrontendIsWhat'
  },
  {
    id: 'advanced',
    order: 2,
    title: '进阶开发阶段',
    shortTitle: '进阶开发',
    description: '深入学习现代前端开发工具和框架',
    duration: '2-3个月',
    level: '初级开发者',
    progress: '35%',
    modules: [
      {
        id: 'css-advanced',
        title: 'CSS 进阶',
        icon: '🎭',
        description: '掌握高级CSS技术和预处理器',
        difficulty: '中等',
        time: '3周',
        completed: false,
        route: 'CSS3Overview',
        topics: [
          {
            title: 'CSS 预处理器 (Sass/Less)',
            route: 'CSSPreprocessors'
          },
          {
            title: 'BEM 命名规范',
            route: 'CSSNaming'
          },
          {
            title: 'CSS 架构模式',
            route: 'CssArchitectureMode'
          },
          {
            title: '现代布局技术',
            route: 'TwoColumnAndThreeColumnLayout'
          },
          {
            title: 'CSS 性能优化',
            route: 'CssSelectorOptimization'
          },
          {
            title: 'CSS-in-JS',
            route: 'ReactCss'
          },
        ],
        resources: [
          { name: 'Sass 官方文档', url: 'https://sass-lang.com/', type: '文档', icon: '📚' },
          { name: 'BEM 方法论', url: 'http://getbem.com/', type: '指南', icon: '📐' },
          {
            name: 'CSS Grid 指南',
            url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
            type: '教程',
            icon: '🎨',
          },
        ],
        projects: [
          {
            name: '组件库设计',
            description: '使用Sass构建CSS组件库',
            icon: '📦',
            difficulty: '中等',
          },
          {
            name: '复杂布局实现',
            description: '实现杂志式复杂布局',
            icon: '📰',
            difficulty: '困难',
          },
        ],
      },
      {
        id: 'js-advanced',
        title: 'JavaScript 进阶',
        icon: '🚀',
        description: '深入理解JavaScript高级概念',
        difficulty: '困难',
        time: '1个月',
        completed: false,
        route: 'ES+Overview',
        topics: [
          {
            title: '异步编程 (Promise/async/await)',
            route: 'AsyncProgrammingIntroduce'
          },
          {
            title: '闭包',
            route: 'Closure'
          },
          {
            title: '原型链',
            route: 'Prototype1'
          },
          {
            title: '模块化开发',
            route: 'ModularizationOverview'
          },
          {
            title: '面向对象编程',
            route: 'FaceObjectProgramming'
          },
          {
            title: '函数式编程',
            route: 'FunctionProgrammingIntroduce'
          },
          {
            title: '设计模式',
            route: 'DesignPatternsOverview'
          },
          {
            title: '性能优化',
            route: 'PerformanceOverview'
          },
        ],
        resources: [
          {
            name: 'You Dont Know JS',
            url: 'https://github.com/getify/You-Dont-Know-JS',
            type: '书籍',
            icon: '📖',
          },
          {
            name: 'JavaScript 设计模式',
            url: 'https://www.patterns.dev/',
            type: '教程',
            icon: '🎨',
          },
          { name: 'ES6 新特性', url: 'https://es6.ruanyifeng.com/', type: '文档', icon: '📚' },
        ],
        projects: [
          {
            name: 'Promise 库实现',
            description: '手写Promise polyfill',
            icon: '🤝',
            difficulty: '困难',
          },
          { name: '模块打包器', description: '实现简易版Webpack', icon: '📦', difficulty: '困难' },
        ],
      },
    ],
  },
  {
    id: 'framework',
    order: 3,
    title: '框架学习阶段',
    shortTitle: '框架学习',
    description: '掌握主流前端框架，构建复杂应用',
    duration: '3-4个月',
    level: '中级开发者',
    progress: '60%',
    modules: [
      {
        id: 'vue-learning',
        title: 'Vue.js 框架',
        icon: '🟢',
        description: '学习渐进式JavaScript框架',
        difficulty: '中等',
        time: '2个月',
        completed: false,
        route: 'VueProfile',
        topics: [
          {
            title: 'Vue 3 核心概念',
            route: 'Vue3Overview'
          },
          {
            title: '组合式 API',
            route: 'CompositionApiVsOptionsApi'
          },
          {
            title: '组件化开发',
            route: 'ComponentCommunication'
          },
          {
            title: 'Vue Router',
            route: 'VueRouteUse'
          },
          {
            title: '状态管理 (Pinia)',
            route: 'Pinia'
          },
          {
            title: 'Vue 生态工具',
            route: 'VueEcosystemTools'
          },
        ],
        resources: [
          { name: 'Vue 官方文档', url: 'https://cn.vuejs.org/', type: '文档', icon: '📚' },
          { name: 'Vue Mastery', url: 'https://www.vuemastery.com/', type: '课程', icon: '🎓' },
          { name: 'Vue School', url: 'https://vueschool.io/', type: '教程', icon: '🏫' },
        ],
        projects: [
          { name: '电商平台', description: '完整的电商前端应用', icon: '🛒', difficulty: '中等' },
          {
            name: '后台管理系统',
            description: '数据可视化管理后台',
            icon: '📊',
            difficulty: '困难',
          },
        ],
      },
      {
        id: 'react-learning',
        title: 'React 框架',
        icon: '🔵',
        description: '掌握声明式UI开发',
        difficulty: '中等',
        time: '2个月',
        completed: false,
        route: 'ReactProfile',
        topics: [
          {
            title: 'React 核心概念',
            route: 'ReactProfile'
          },
          {
            title: 'Hooks 系统',
            route: 'HooksIntroduction'
          },
          {
            title: '组件设计模式',
            route: 'AtomicDesign'
          },
          {
            title: 'React Router',
            route: 'ReactComponentCommunication'
          },
          {
            title: '状态管理 (Redux)',
            route: 'ReactStateManagementOverview'
          },
          {
            title: 'Next.js 框架',
            route: 'Nextjs'
          },
        ],
        resources: [
          { name: 'React 官方文档', url: 'https://react.dev/', type: '文档', icon: '📚' },
          { name: 'React 模式', url: 'https://reactpatterns.com/', type: '教程', icon: '🎨' },
          { name: 'Epic React', url: 'https://epicreact.dev/', type: '课程', icon: '🎓' },
        ],
        projects: [
          {
            name: '社交网络应用',
            description: '仿Twitter社交平台',
            icon: '🐦',
            difficulty: '困难',
          },
          { name: '项目管理系统', description: '团队协作项目管理', icon: '📋', difficulty: '困难' },
        ],
      },
    ],
  },
  {
    id: 'engineering',
    order: 4,
    title: '工程化阶段',
    shortTitle: '工程化',
    description: '学习现代前端工程化实践',
    duration: '2-3个月',
    level: '高级开发者',
    progress: '80%',
    modules: [
      {
        id: 'build-tools',
        title: '构建工具',
        icon: '🔧',
        description: '掌握现代前端构建流程',
        difficulty: '中等',
        time: '1个月',
        completed: false,
        route: 'BuildToolsIntroduction',
        topics: [
          {
            title: 'Webpack 配置优化',
            route: 'WebpackBasicKnowledge'
          },
          {
            title: 'Vite 构建工具',
            route: 'ViteBasicKnowledge'
          },
          {
            title: '代码分割和懒加载',
            route: 'CodeSplittingAndLazyLoading'
          },
          {
            title: 'Tree Shaking',
            route: 'TreeShaking'
          },
          {
            title: '热更新原理',
            route: 'HotUpdate'
          },
          {
            title: '自定义Loader/Plugin',
            route: 'HowToImplementALoader'
          },
        ],
        resources: [
          { name: 'Webpack 官方文档', url: 'https://webpack.js.org/', type: '文档', icon: '📚' },
          { name: 'Vite 官方文档', url: 'https://vitejs.dev/', type: '文档', icon: '⚡' },
          {
            name: '构建工具原理',
            url: 'https://github.com/ronami/minipack',
            type: '源码',
            icon: '🔍',
          },
        ],
        projects: [
          {
            name: '自定义构建配置',
            description: '从零配置Webpack构建',
            icon: '⚙️',
            difficulty: '中等',
          },
          { name: '脚手架工具', description: '开发项目脚手架', icon: '🛠️', difficulty: '困难' },
        ],
      },
      {
        id: 'testing',
        title: '测试开发',
        icon: '🧪',
        description: '保证代码质量的测试实践',
        difficulty: '中等',
        time: '1个月',
        completed: false,
        route: 'FrontendTestingOverview',
        topics: [
          {
            title: '单元测试 (Jest/Vitest)',
            route: 'UnitTesting'
          },
          {
            title: '组件测试 (Testing Library)',
            route: 'ComponentTesting'
          },
          {
            title: 'E2E 测试 (Cypress)',
            route: 'EndToEndTesting'
          },
          {
            title: '测试驱动开发',
            route: 'TestDrivenDevelopment'
          },
          {
            title: '测试覆盖率',
            route: 'TestCoverage'
          },
          {
            title: 'Mock 和 Stub',
            route: 'MockAndStub'
          },
        ],
        resources: [
          { name: 'Jest 官方文档', url: 'https://jestjs.io/', type: '文档', icon: '📚' },
          {
            name: 'Testing Library',
            url: 'https://testing-library.com/',
            type: '教程',
            icon: '🎓',
          },
          { name: 'Cypress 指南', url: 'https://docs.cypress.io/', type: '文档', icon: '🔍' },
        ],
        projects: [
          {
            name: '测试套件编写',
            description: '为现有项目添加完整测试',
            icon: '📋',
            difficulty: '中等',
          },
          {
            name: 'CI/CD 集成',
            description: '配置自动化测试流水线',
            icon: '🔄',
            difficulty: '困难',
          },
        ],
      },
    ],
  },
  {
    id: 'performance',
    order: 5,
    title: '性能优化阶段',
    shortTitle: '性能优化',
    description: '深入理解前端性能优化技术',
    duration: '1-2个月',
    level: '资深开发者',
    progress: '90%',
    modules: [
      {
        id: 'web-performance',
        title: 'Web 性能优化',
        icon: '⚡',
        description: '全方位性能优化策略',
        difficulty: '困难',
        time: '1个月',
        completed: false,
        route: 'PerformanceOverview',
        topics: [
          {
            title: '浏览器渲染原理',
            route: 'BrowserRenderProcess'
          },
          {
            title: '关键渲染路径优化',
            route: 'CriticalRenderingPathOptimization'
          },
          {
            title: '代码分割',
            route: 'CodeSplit'
          },
          {
            title: '懒加载',
            route: 'LazyLoadAndpreLoad'
          },
          {
            title: '图片和资源优化',
            route: 'ImageLoadOptimization'
          },
          {
            title: '缓存策略',
            route: 'FrontCache'
          },
          {
            title: '性能监控和分析',
            route: 'PerformanceApi'
          },
        ],
        resources: [
          { name: 'Web.dev 性能', url: 'https://web.dev/performance/', type: '教程', icon: '🎓' },
          {
            name: 'Lighthouse',
            url: 'https://developers.google.com/web/tools/lighthouse',
            type: '工具',
            icon: '🔍',
          },
          {
            name: 'Performance API',
            url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Performance',
            type: '文档',
            icon: '📚',
          },
        ],
        projects: [
          {
            name: '性能审计报告',
            description: '对网站进行完整性能分析',
            icon: '📊',
            difficulty: '中等',
          },
          {
            name: '性能监控系统',
            description: '实现前端性能监控SDK',
            icon: '👁️',
            difficulty: '困难',
          },
        ],
      },
    ],
  },
])

// 开发工具分类
const toolCategories = ref([
  {
    id: 'editor',
    name: '代码编辑器',
    tools: [
      {
        name: 'Cursor',
        icon: '🔵',
        type: '编辑器',
        description: '微软开发的轻量级强大代码编辑器，拥有丰富的插件生态',
        url: 'https://cursor.com/',
        docs: 'https://cursor.com/docs',
        essential: true,
      },
      {
        name: 'claude',
        icon: '🔵',
        type: 'AI',
        description: 'AI',
        url: 'https://anthropic.com/',
        docs: 'https://anthropic.com/docs',
        essential: true,
      },
      {
        name: 'Visual Studio Code',
        icon: '🔵',
        type: '编辑器',
        description: '微软开发的轻量级强大代码编辑器，拥有丰富的插件生态',
        url: 'https://code.visualstudio.com/',
        docs: 'https://code.visualstudio.com/docs',
        essential: true,
      },
      {
        name: 'WebStorm',
        icon: '🟡',
        type: 'IDE',
        description: 'JetBrains出品的功能完整的JavaScript IDE',
        url: 'https://www.jetbrains.com/webstorm/',
        docs: 'https://www.jetbrains.com/help/webstorm/',
        essential: false,
      },
    ],
  },
  {
    id: 'version-control',
    name: '版本控制',
    tools: [
      {
        name: 'Git',
        icon: '📝',
        type: '版本控制',
        description: '分布式版本控制系统，团队协作必备',
        url: 'https://git-scm.com/',
        docs: 'https://git-scm.com/doc',
        essential: true,
      },
      {
        name: 'GitHub',
        icon: '🐙',
        type: '代码托管',
        description: '全球最大的代码托管平台，开源项目聚集地',
        url: 'https://github.com/',
        docs: 'https://docs.github.com/',
        essential: true,
      },
    ],
  },
  {
    id: 'build-tools',
    name: '构建工具',
    tools: [
      {
        name: 'Vite',
        icon: '⚡',
        type: '构建工具',
        description: '下一代前端构建工具，极速的开发服务器',
        url: 'https://vitejs.dev/',
        docs: 'https://vitejs.dev/guide/',
        essential: true,
      },
      {
        name: 'Webpack',
        icon: '📦',
        type: '打包工具',
        description: '功能强大的模块打包器，生态成熟',
        url: 'https://webpack.js.org/',
        docs: 'https://webpack.js.org/concepts/',
        essential: true,
      },
    ],
  },
])

// 职业发展路径
const careerLevels = ref([
  {
    id: 'junior',
    title: '初级前端工程师',
    salary: '8-15K',
    experience: '0-1年',
    skills: ['HTML/CSS', 'JavaScript基础', 'Vue/React基础', 'Git基础'],
    responsibilities: [
      '实现页面布局和样式',
      '基础交互功能开发',
      'Bug修复和功能维护',
      '配合设计师实现视觉稿',
    ],
  },
  {
    id: 'middle',
    title: '中级前端工程师',
    salary: '15-25K',
    experience: '2-3年',
    skills: ['框架深入理解', '工程化工具', '性能优化', 'TypeScript'],
    responsibilities: ['复杂业务模块开发', '技术方案设计', '代码审查和指导', '性能优化实践'],
  },
  {
    id: 'senior',
    title: '高级前端工程师',
    salary: '25-40K',
    experience: '3-5年',
    skills: ['架构设计', '团队管理', '跨端开发', '工程效能'],
    responsibilities: ['技术架构设计', '团队技术规划', '复杂问题攻关', '新人培养和指导'],
  },
  {
    id: 'expert',
    title: '前端专家',
    salary: '40K+',
    experience: '5年+',
    skills: ['技术战略', '创新研究', '行业影响', '跨领域整合'],
    responsibilities: ['技术方向规划', '前沿技术研究', '技术品牌建设', '跨团队协作推进'],
  },
])

// 学习建议
const learningTips = ref([
  {
    id: 'practice',
    title: '刻意练习',
    description: '通过重复练习和项目实践巩固知识点，避免只看不练',
    icon: '💪',
    actions: ['每日编码', '项目驱动', '代码重构'],
  },
  {
    id: 'community',
    title: '社区参与',
    description: '积极参与技术社区，学习他人经验，分享自己的见解',
    icon: '👥',
    actions: ['开源贡献', '技术分享', '参加Meetup'],
  },
  {
    id: 'documentation',
    title: '文档阅读',
    description: '养成阅读官方文档的习惯，这是最准确的学习资料',
    icon: '📖',
    actions: ['官方文档', '技术规范', '源码阅读'],
  },
  {
    id: 'projects',
    title: '项目实践',
    description: '通过实际项目将知识点串联，建立完整的知识体系',
    icon: '🚀',
    actions: ['个人项目', '开源项目', '企业项目'],
  },
])

// 方法
const setActiveStage = (stageId: string) => {
  activeStage.value = stageId
}
</script>

<style lang="less" scoped>
.frontend-learning-path {
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
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
    background: linear-gradient(135deg, #fff 0%, #d1fae5 100%);
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
    background: linear-gradient(135deg, #10b981, #059669);
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

  .learning-principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .principle-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .principle-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: #2d3748;
    }

    p {
      color: #6b7280;
      margin: 0;
      font-size: 0.9rem;
    }
  }
}

// 学习路线时间轴样式
.roadmap-section {
  .timeline-container {
    position: relative;
    padding: 2rem 0;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #10b981, #059669);
      z-index: 1;
    }
  }

  .timeline-stage {
    display: flex;
    gap: 1.5rem;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 1rem;
    border-radius: 12px;

    &:hover {
      background: #f8fafc;
    }

    &.active {
      background: #ecfdf5;
      border-left: 4px solid #10b981;
    }

    .stage-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .stage-number {
        width: 40px;
        height: 40px;
        background: #10b981;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.1rem;
        box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
      }

      .stage-dot {
        width: 12px;
        height: 12px;
        background: #10b981;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
    }

    .stage-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin-bottom: 0.5rem;
      }

      .stage-duration {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #ecfdf5;
        color: #065f46;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;

        .duration-icon {
          font-size: 1rem;
        }
      }
    }
  }
}

// 阶段详情样式
.stage-details-section {
  .stage-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .stage-tab {
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
      border-color: #10b981;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-color: #10b981;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }

    .tab-number {
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
    }
  }

  .stage-content-container {
    min-height: 600px;
  }

  .stage-detail-content {
    animation: fadeIn 0.3s ease;
  }

  .stage-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    h3 {
      font-size: 1.8rem;
      color: #2d3748;
      margin: 0;
    }

    .stage-meta {
      display: flex;
      gap: 1.5rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f8fafc;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #4a5568;

        .meta-icon {
          font-size: 1rem;
        }
      }
    }
  }

  .learning-modules {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .learning-module {
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border-left: 4px solid #e2e8f0;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.completed {
      border-left-color: #10b981;
      background: #ecfdf5;
    }

    .module-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-bottom: 1px solid #e2e8f0;

      .module-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      .module-info {
        flex: 1;

        h4 {
          font-size: 1.3rem;
          margin: 0 0 0.5rem 0;
          color: #2d3748;
        }

        .module-desc {
          color: #4a5568;
          margin: 0;
          line-height: 1.5;
        }
      }

      .module-status {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-end;

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;

          &.简单 {
            background: #d1fae5;
            color: #065f46;
          }

          &.中等 {
            background: #fef3c7;
            color: #92400e;
          }

          &.困难 {
            background: #fee2e2;
            color: #991b1b;
          }
        }

        .time-estimate {
          font-size: 0.9rem;
          color: #6b7280;
        }
      }
    }

    .module-content {
      padding: 1.5rem;

      h5 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #2d3748;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 0.5rem;
      }
    }

    .topics-section {
      margin-bottom: 1.5rem;

      .topics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
      }

      .topic-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 0.5rem;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        border-left: 3px solid #10b981;

        &:hover {
          background: #f0fdf4;
          border-color: #10b981;
          transform: translateX(5px);
        }

        .topic-check {
          color: #10b981;
          font-weight: bold;
        }
      }
    }

    .resources-section {
      margin-bottom: 1.5rem;

      .resources-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .resource-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
        border: 1px solid #e2e8f0;

        &:hover {
          background: #f0fdf4;
          border-color: #10b981;
          transform: translateX(5px);
        }

        .resource-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .resource-name {
          flex: 1;
          font-weight: 500;
          color: #2d3748;
        }

        .resource-type {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      }
    }

    .projects-section {
      .projects-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .project-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e2e8f0;

        .project-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .project-info {
          flex: 1;

          strong {
            display: block;
            margin-bottom: 0.25rem;
            color: #2d3748;
          }

          p {
            margin: 0;
            color: #4a5568;
            font-size: 0.9rem;
          }
        }

        .project-difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;

          &.简单 {
            background: #d1fae5;
            color: #065f46;
          }

          &.中等 {
            background: #fef3c7;
            color: #92400e;
          }

          &.困难 {
            background: #fee2e2;
            color: #991b1b;
          }
        }
      }
    }
  }
}

// 工具推荐样式
.tools-section {
  .tools-categories {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tool-category {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      color: #2d3748;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  }

  .tool-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.essential {
      border-color: #10b981;
      background: #ecfdf5;
    }

    .tool-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .tool-icon {
        font-size: 2rem;
      }

      .tool-info {
        flex: 1;

        h4 {
          margin: 0 0 0.25rem 0;
          color: #2d3748;
          font-size: 1.2rem;
        }

        .tool-type {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      }
    }

    .tool-desc {
      color: #4a5568;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .tool-links {
      display: flex;
      gap: 0.75rem;

      .tool-link {
        background: #10b981;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover {
          background: #059669;
          transform: translateY(-1px);
        }
      }
    }
  }
}

// 职业发展样式
.career-section {
  .career-path {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .career-level {
    background: #f8fafc;
    border-radius: 12px;
    padding: 2rem;
    border-left: 4px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    &.junior {
      border-left-color: #10b981;
    }

    &.middle {
      border-left-color: #3b82f6;
    }

    &.senior {
      border-left-color: #8b5cf6;
    }

    &.expert {
      border-left-color: #f59e0b;
    }

    .level-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;

      h3 {
        margin: 0;
        color: #2d3748;
        font-size: 1.3rem;
      }

      .level-salary {
        background: #10b981;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.9rem;
      }
    }

    .level-skills {
      margin-bottom: 1.5rem;

      h4 {
        margin: 0 0 0.75rem 0;
        color: #2d3748;
        font-size: 1rem;
      }

      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .skill-tag {
        background: white;
        color: #4a5568;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid #e2e8f0;
      }
    }

    .level-responsibilities {
      margin-bottom: 1.5rem;

      h4 {
        margin: 0 0 0.75rem 0;
        color: #2d3748;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
        color: #4a5568;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
      }
    }

    .level-duration {
      .duration {
        background: #e2e8f0;
        color: #4a5568;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }
}

// 学习建议样式
.learning-tips-section {
  .tips-container {
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .tip-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-color: #10b981;
      }

      .tip-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: #2d3748;
      }

      p {
        color: #4a5568;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .tip-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
      }

      .action-tag {
        background: #10b981;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }
}

// 页脚样式

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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

  .stage-header {
    flex-direction: column;
    gap: 1rem;
  }

  .stage-meta {
    flex-wrap: wrap;
  }

  .module-header {
    flex-direction: column;
    text-align: center;
  }

  .module-status {
    flex-direction: row !important;
    justify-content: center;
  }

  .timeline-stage {
    flex-direction: column;
    text-align: center;
  }

  .timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
}

.author-section {
  display: flex;
  justify-content: space-around;

  .author-item {
    margin-bottom: 10px;
  }
}
</style>
