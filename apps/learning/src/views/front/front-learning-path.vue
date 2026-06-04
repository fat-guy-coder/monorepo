<template>
  <LearningPath
    title="前端开发学习路线图"
    description="从 HTML 到全栈 · 现代前端工程师的必修之路"
    :tags="[{ label: '🌐 HTML/CSS', color: 'blue' },{ label: '📜 JavaScript', color: 'amber' },{ label: '🔷 TypeScript', color: 'indigo' },{ label: '⚡ Vue/React', color: 'green' },{ label: '🛠️ 工程化', color: 'purple' }]"
    :phases="phases"
    footerText="预计全部完成需 8-12 个月 · 项目驱动 · 持续实践"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '🌐', title: 'HTML & CSS 基础', period: '3-4 周',
    desc: '构建网页的骨架与皮肤。掌握语义化 HTML 与现代 CSS 布局，能独立还原设计稿。',
    color: 'bg-blue-500',
    practice: '📌 实战：还原一个设计师提供的 Landing Page 设计稿（Figma/PSD → HTML/CSS）',
    modules: [
      { name: 'front-1-a', label: 'HTML 语义化', topics: [
        { name: 'front-1-a-1-elements', label: '常用标签与语义化' },
        { name: 'front-1-a-2-forms', label: '表单与验证' },
        { name: 'front-1-a-3-accessibility', label: '可访问性基础' },
      ]},
      { name: 'front-1-b', label: 'CSS 核心', topics: [
        { name: 'front-1-b-1-selectors', label: '选择器与优先级' },
        { name: 'front-1-b-2-box-model', label: '盒模型与定位' },
        { name: 'front-1-b-3-flexbox', label: 'Flexbox 弹性布局' },
        { name: 'front-1-b-4-grid', label: 'Grid 网格布局' },
      ]},
      { name: 'front-1-c', label: '响应式设计', topics: [
        { name: 'front-1-c-1-media-query', label: '媒体查询与断点' },
        { name: 'front-1-c-2-mobile-first', label: 'Mobile First 策略' },
        { name: 'front-1-c-3-tailwind', label: 'Tailwind CSS 入门' },
      ]},
    ]
  },
  {
    id: 2, icon: '📜', title: 'JavaScript 核心', period: '6-8 周',
    desc: '前端开发的灵魂语言。深入理解 JS 运行机制、异步编程和 DOM 操作。这是最重要的基础阶段。',
    color: 'bg-amber-500',
    practice: '📌 实战：纯 JS 实现一个 Todo 应用（含拖拽排序、本地存储、标签筛选）',
    modules: [
      { name: 'front-2-a', label: '语法与类型', topics: [
        { name: 'front-2-a-1-vars', label: '变量、作用域与提升' },
        { name: 'front-2-a-2-types', label: '数据类型与类型转换' },
        { name: 'front-2-a-3-functions', label: '函数：箭头/闭包/高阶' },
      ]},
      { name: 'front-2-b', label: '面向对象与 this', topics: [
        { name: 'front-2-b-1-prototype', label: '原型链与继承' },
        { name: 'front-2-b-2-class', label: 'Class 语法糖' },
        { name: 'front-2-b-3-this', label: 'this 绑定规则' },
      ]},
      { name: 'front-2-c', label: '异步编程', topics: [
        { name: 'front-2-c-1-callback', label: '回调与事件循环' },
        { name: 'front-2-c-2-promise', label: 'Promise 深入' },
        { name: 'front-2-c-3-async', label: 'async/await 实战' },
      ]},
      { name: 'front-2-d', label: 'DOM 与 BOM', topics: [
        { name: 'front-2-d-1-dom-api', label: 'DOM 操作与事件委托' },
        { name: 'front-2-d-2-storage', label: '本地存储方案' },
        { name: 'front-2-d-3-websocket', label: 'WebSocket 通信' },
      ]},
    ]
  },
  {
    id: 3, icon: '🔷', title: 'TypeScript 工程化', period: '3-4 周',
    desc: '给 JS 装上类型系统。掌握 TS 核心类型体操，能在项目中落地类型安全实践。',
    color: 'bg-indigo-500',
    practice: '📌 实战：将一个 JS 小项目迁移到 TS，配置严格模式 tsconfig',
    modules: [
      { name: 'front-3-a', label: '类型基础', topics: [
        { name: 'front-3-a-1-basic', label: '基本类型与接口' },
        { name: 'front-3-a-2-generics', label: '泛型与类型推断' },
        { name: 'front-3-a-3-union', label: '联合/交叉/字面量类型' },
      ]},
      { name: 'front-3-b', label: '高级类型', topics: [
        { name: 'front-3-b-1-conditional', label: '条件类型与 infer' },
        { name: 'front-3-b-2-mapped', label: '映射类型与工具类型' },
        { name: 'front-3-b-3-declare', label: '声明文件(.d.ts)编写' },
      ]},
    ]
  },
  {
    id: 4, icon: '⚡', title: 'Vue 3 深入', period: '6-8 周',
    desc: '渐进式框架的全家桶。掌握 Composition API、状态管理、路由和组件设计模式。',
    color: 'bg-green-500',
    practice: '📌 实战：Vue 3 + Pinia + Vue Router 构建一个后台管理系统',
    modules: [
      { name: 'front-4-a', label: 'Vue 3 核心', topics: [
        { name: 'front-4-a-1-reactive', label: '响应式原理：ref/reactive' },
        { name: 'front-4-a-2-composition', label: 'Composition API 模式' },
        { name: 'front-4-a-3-component', label: '组件通信与设计' },
      ]},
      { name: 'front-4-b', label: '生态工具', topics: [
        { name: 'front-4-b-1-pinia', label: 'Pinia 状态管理' },
        { name: 'front-4-b-2-router', label: 'Vue Router 路由守卫' },
        { name: 'front-4-b-3-slots', label: '插槽与动态组件' },
      ]},
      { name: 'front-4-c', label: '进阶技巧', topics: [
        { name: 'front-4-c-1-composables', label: 'Composables 设计模式' },
        { name: 'front-4-c-2-teleport', label: 'Teleport/Suspense' },
        { name: 'front-4-c-3-ssr', label: 'SSR 与 Nuxt 入门' },
      ]},
    ]
  },
  {
    id: 5, icon: '⚛️', title: 'React 生态', period: '4-6 周',
    desc: '函数式 UI 范式。对比 Vue 理解 React 设计哲学，掌握 Hooks + Next.js 全栈方案。',
    color: 'bg-cyan-500',
    practice: '📌 实战：React + Zustand + React Router 复刻阶段 4 的后台管理系统',
    modules: [
      { name: 'front-5-a', label: 'React 核心', topics: [
        { name: 'front-5-a-1-jsx', label: 'JSX 与渲染机制' },
        { name: 'front-5-a-2-hooks', label: 'Hooks：useState/useEffect' },
        { name: 'front-5-a-3-context', label: 'Context 与状态提升' },
      ]},
      { name: 'front-5-b', label: 'React 进阶', topics: [
        { name: 'front-5-b-1-performance', label: '性能：memo/useMemo/useCallback' },
        { name: 'front-5-b-2-state-mgmt', label: '状态管理：Zustand/Redux' },
        { name: 'front-5-b-3-next', label: 'Next.js App Router 入门' },
      ]},
    ]
  },
  {
    id: 6, icon: '🛠️', title: '前端工程化', period: '4-6 周',
    desc: '从写代码到交付产品。掌握构建工具、代码规范、CI/CD 和质量保障体系。',
    color: 'bg-purple-500',
    practice: '📌 实战：搭建企业级脚手架（Vite + ESLint + Prettier + Husky + GitHub Actions）',
    modules: [
      { name: 'front-6-a', label: '构建工具', topics: [
        { name: 'front-6-a-1-vite', label: 'Vite 原理与配置' },
        { name: 'front-6-a-2-webpack', label: 'Webpack 核心概念' },
        { name: 'front-6-a-3-babel', label: 'Babel/SWC 转译' },
      ]},
      { name: 'front-6-b', label: '代码质量', topics: [
        { name: 'front-6-b-1-eslint', label: 'ESLint 规则配置' },
        { name: 'front-6-b-2-prettier', label: 'Prettier 格式化' },
        { name: 'front-6-b-3-testing', label: 'Vitest + Testing Library' },
      ]},
      { name: 'front-6-c', label: 'CI/CD', topics: [
        { name: 'front-6-c-1-github-actions', label: 'GitHub Actions 流水线' },
        { name: 'front-6-c-2-deploy', label: 'Vercel/Netlify 部署' },
        { name: 'front-6-c-3-docker', label: 'Docker 容器化部署' },
      ]},
    ]
  },
  {
    id: 7, icon: '🚀', title: '性能优化与监控', period: '3-4 周',
    desc: '让应用快如闪电。掌握 Core Web Vitals 优化、Bundle 分析和错误监控。',
    color: 'bg-orange-500',
    practice: '📌 实战：对一个线上项目做性能审计，输出优化报告并落地改进',
    modules: [
      { name: 'front-7-a', label: '性能指标', topics: [
        { name: 'front-7-a-1-web-vitals', label: 'LCP/FID/CLS 指标解读' },
        { name: 'front-7-a-2-lighthouse', label: 'Lighthouse 审计实战' },
      ]},
      { name: 'front-7-b', label: '优化策略', topics: [
        { name: 'front-7-b-1-lazy', label: '懒加载与代码分割' },
        { name: 'front-7-b-2-cache', label: '缓存策略与 CDN' },
        { name: 'front-7-b-3-images', label: '图片优化与响应式' },
      ]},
      { name: 'front-7-c', label: '监控', topics: [
        { name: 'front-7-c-1-sentry', label: 'Sentry 错误监控' },
        { name: 'front-7-c-2-analytics', label: '性能监控与分析' },
      ]},
    ]
  },
  {
    id: 8, icon: '🌍', title: '全栈与部署运维', period: '4-6 周',
    desc: '打通前后端。能独立完成从前端到数据库的完整应用开发与部署。',
    color: 'bg-teal-500',
    practice: '📌 实战：独立完成一个全栈项目（前端 + API + 数据库 + 部署），作为面试作品',
    modules: [
      { name: 'front-8-a', label: '全栈基础', topics: [
        { name: 'front-8-a-1-api-design', label: 'RESTful API 设计' },
        { name: 'front-8-a-2-auth', label: 'JWT 鉴权与 OAuth' },
        { name: 'front-8-a-3-ssr-nuxt', label: 'Nuxt.js 全栈方案' },
      ]},
      { name: 'front-8-b', label: '部署运维', topics: [
        { name: 'front-8-b-1-nginx', label: 'Nginx 反向代理' },
        { name: 'front-8-b-2-https', label: 'HTTPS 与域名配置' },
        { name: 'front-8-b-3-monorepo', label: 'Monorepo 项目结构' },
      ]},
    ]
  },
]
</script>
