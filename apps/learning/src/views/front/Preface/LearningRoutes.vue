<template>
  <LearningPath
    title="前端开发学习路线"
    description="从零到专家的系统化学习路径，覆盖 HTML/CSS/JS 基础、现代框架、工程化与性能优化"
    :tags="[{ label:'🌐 互联网',color:'blue' },{ label:'🎨 CSS',color:'green' },{ label:'⚡ JS',color:'purple' },{ label:'🟢 Vue',color:'orange' },{ label:'🔧 工程化',color:'red' }]"
    :phases="phases"
    footerText="预计需 24-36 周 · 项目驱动 · 持续实践"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 0, icon: '🌐', title: '互联网基础认知', period: '1-2 周',
    desc: '理解浏览器输入 URL 后发生了什么：DNS、TCP/IP、HTTP、服务器渲染。搭建开发环境，建立大局观。',
    color: 'bg-blue-500',
    practice: '📌 实战：用 Chrome DevTools 观察一次完整的 HTTP 请求-响应过程，画出时序图',
    modules: [
      { name: 'f0-a', label: '互联网基础', topics: [
        { name: 'HowInternetWorks', label: '浏览器与互联网如何工作' },
        { name: 'WhatIsHtml', label: 'DNS 和域名系统' },
        { name: 'HTTPProtocol', label: 'HTTP / HTTPS 协议基础' },
        { name: 'FrontendAndBackend', label: '前端 vs 后端 vs 全栈' },
      ]},
      { name: 'f0-b', label: '开发环境', topics: [
        { name: 'DevTools', label: 'VS Code / Cursor 编辑器配置' },
        { name: 'ChromeDevTools', label: 'Chrome DevTools 基础' },
        { name: 'GitBasics', label: 'Git 和 GitHub 入门' },
        { name: 'NodeAndNpm', label: 'Node.js 与 npm 包管理' },
      ]},
    ],
  },
  {
    id: 1, icon: '🏗️', title: 'HTML5 & CSS3 页面搭建', period: '4-6 周',
    desc: '掌握网页结构标记和样式设计，能用 Flexbox + Grid 实现复杂布局，理解响应式设计。',
    color: 'bg-green-500',
    practice: '📌 实战：手写一个响应式博客首页，适配手机/平板/桌面三端',
    modules: [
      { name: 'f1-a', label: 'HTML5', topics: [
        { name: 'WhatIsHtml', label: 'HTML5 文档结构与语义化标签' },
        { name: 'CommonUseTags', label: '常用标签：a/img/table/list' },
        { name: 'FormElements', label: '表单与输入控件' },
        { name: 'SEO', label: 'SEO 基础优化' },
      ]},
      { name: 'f1-b', label: 'CSS3 核心', topics: [
        { name: 'CSSSelectors', label: '选择器与优先级' },
        { name: 'BFC_IFC', label: '盒模型与 BFC/IFC' },
        { name: 'Flexbox', label: 'Flexbox 弹性布局' },
        { name: 'Grid', label: 'Grid 网格布局' },
        { name: 'MediaQueries', label: '响应式设计与媒体查询' },
        { name: 'Transition', label: '过渡与动画' },
      ]},
    ],
  },
  {
    id: 2, icon: '⚡', title: 'JavaScript 编程', period: '6-8 周',
    desc: '从变量、函数到 DOM 操作和事件处理，打牢编程基本功。进阶理解异步、闭包、原型链。',
    color: 'bg-purple-500',
    practice: '📌 实战：Todo List 应用（增删改查 + 本地存储）+ 天气查询 SPA（异步 API 调用）',
    modules: [
      { name: 'f2-a', label: '语言基础', topics: [
        { name: 'Variables', label: '变量与数据类型' },
        { name: 'Operators', label: '运算符与表达式' },
        { name: 'FlowControl', label: '流程控制 (if/for/while/switch)' },
        { name: 'FunctionProgrammingIntroduce', label: '函数：声明/参数/返回值/箭头函数' },
        { name: 'Scope', label: '作用域与闭包' },
        { name: 'Array1', label: '数组操作 (map/filter/reduce)' },
        { name: 'Object1', label: '对象与 JSON' },
      ]},
      { name: 'f2-b', label: 'DOM 与事件', topics: [
        { name: 'Dom', label: 'DOM 查询与操作' },
        { name: 'EventsIntroduce', label: '事件处理与事件委托' },
      ]},
      { name: 'f2-c', label: 'JavaScript 进阶', topics: [
        { name: 'AsyncProgrammingIntroduce', label: '异步编程：Promise/async/await' },
        { name: 'Prototype1', label: '原型链与继承' },
        { name: 'ES+Overview', label: 'ES6+ 新特性概览' },
        { name: 'ModularizationOverview', label: '模块化 (ESM)' },
      ]},
    ],
  },
  {
    id: 3, icon: '🟢', title: 'Vue 3 框架与工程化', period: '6-8 周',
    desc: '掌握 Composition API、Vue Router、Pinia、Vite，能独立开发中大型 SPA 应用。',
    color: 'bg-orange-500',
    practice: '📌 实战：电商商品列表 + 购物车（路由 + 状态管理 + API） + 后台管理面板',
    modules: [
      { name: 'f3-a', label: 'Vue 3 核心', topics: [
        { name: 'Vue3Overview', label: 'Vue 3 响应式与核心概念' },
        { name: 'CompositionApiVsOptionsApi', label: 'Composition API' },
        { name: 'ComponentCommunication', label: '组件通信（props/emits/provide）' },
        { name: 'VueRouteUse', label: 'Vue Router 路由' },
        { name: 'Pinia', label: 'Pinia 状态管理' },
        { name: 'ViteBasicKnowledge', label: 'Vite 构建工具' },
      ]},
      { name: 'f3-b', label: 'TypeScript', topics: [
        { name: 'TypeScriptOverview', label: '基础类型与接口' },
        { name: 'TypeScriptGenerics', label: '泛型与工具类型' },
      ]},
    ],
  },
  {
    id: 4, icon: '🔧', title: '前端工程化', period: '4-6 周',
    desc: '构建工具、自动化测试、CI/CD、性能优化。从"能写代码"到"能交付产品"。',
    color: 'bg-red-500',
    practice: '📌 实战：为项目配置完整的 CI/CD 流水线（lint → test → build → deploy）',
    modules: [
      { name: 'f4-a', label: '构建与测试', topics: [
        { name: 'WebpackBasicKnowledge', label: 'Webpack 基础配置' },
        { name: 'ViteBasicKnowledge', label: 'Vite 原理与优化' },
        { name: 'CodeSplittingAndLazyLoading', label: '代码分割与懒加载' },
        { name: 'UnitTesting', label: '单元测试 (Vitest)' },
        { name: 'EndToEndTesting', label: 'E2E 测试 (Playwright)' },
      ]},
      { name: 'f4-b', label: '性能与部署', topics: [
        { name: 'PerformanceOverview', label: 'Web 性能优化概览' },
        { name: 'BrowserRenderProcess', label: '浏览器渲染原理' },
        { name: 'FrontCache', label: 'HTTP 缓存策略' },
        { name: 'ImageLoadOptimization', label: '图片与资源优化' },
        { name: 'LazyLoadAndpreLoad', label: '懒加载与预加载' },
      ]},
    ],
  },
  {
    id: 5, icon: '🚀', title: '进阶与全栈拓展', period: '持续学习',
    desc: 'Node.js 服务端、React 第二框架、跨端开发、设计模式、安全。向高级工程师迈进。',
    color: 'bg-teal-500',
    practice: '📌 实战：全栈项目 — Node.js API + Vue3 前端 + PostgreSQL + Docker 部署',
    modules: [
      { name: 'f5-a', label: '服务端', topics: [
        { name: 'NodejsBasics', label: 'Node.js 运行时基础' },
        { name: 'RESTfulAPIDesign', label: 'RESTful API 设计' },
      ]},
      { name: 'f5-b', label: 'React 第二框架', topics: [
        { name: 'ReactProfile', label: 'React 核心概念与 JSX' },
        { name: 'HooksIntroduction', label: 'Hooks 系统' },
        { name: 'Nextjs', label: 'Next.js SSR/SSG' },
        { name: 'ReactStateManagementOverview', label: '状态管理方案对比' },
      ]},
      { name: 'f5-c', label: '架构与安全', topics: [
        { name: 'DesignPatternsOverview', label: '设计模式概览' },
        { name: 'AtomicDesign', label: '原子设计方法论' },
        { name: 'FrontendSecurity', label: '前端安全 (XSS/CSRF/CSP)' },
      ]},
    ],
  },
]
</script>
