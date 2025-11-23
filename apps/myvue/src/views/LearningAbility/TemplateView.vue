<template>
  <div class="view-container">
    <!-- 头部：标题区 -->
    <header class="page-header">
      <div class="header-inner">
        <h1 class="page-title">核心技能模板页</h1>
        <p class="page-subtitle">以主题变量驱动的卡片式信息布局</p>
        <p class="page-note">
          建议：本模板用于承载知识点/功能模块的分区展示。通过主题变量实现深浅/冷暖主题的无缝切换；布局优先采用栅格，在移动端保持优秀可读性与触达性。
        </p>
      </div>
    </header>
    <section>
      <!-- 内容区：栅格 + 卡片组合 -->
      <div class="grid layout">
        <!-- 大卡片：概览/引导 -->
        <Card class="card-large" :hoverable="true" :bordered="true">
          <template #title>
            <div class="card-title">概览 · 今日学习计划</div>
          </template>
          <template #body>
            <div class="plan-list">
              <div v-for="(item, idx) in planList" :key="idx" class="plan-item">
                <span class="plan-time">{{ item.time }}</span>
                <div class="plan-content">
                  <div class="plan-name">{{ item.name }}</div>
                  <div class="plan-desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- 小卡片：分块内容 -->
        <Card v-for="(card, idx) in smallCards" :key="idx" class="card-small" :hoverable="true">
          <template #title>
            <div class="card-title">{{ card.title }}</div>
          </template>
          <template #body>
            <ul class="bullet-list">
              <li v-for="(line, i) in card.items" :key="i">{{ line }}</li>
            </ul>
          </template>
        </Card>

        <!-- 大卡片：示例代码/知识点 -->
        <Card class="card-large" :hoverable="true">
          <template #title>
            <div class="card-title">示例 · 类型系统要点</div>
          </template>
          <template #body>
            <div class="code-block">
              <pre><code>// TypeScript 基础类型
let age: number = 18
let username: string = 'cascade'
let isOk: boolean = true

// 接口与类型别名
interface User { id: number; name: string }
type ID = User['id']

// 内置工具类型
type ReadonlyUser = Readonly&lt;User&gt;
            </code></pre>
            </div>
          </template>
        </Card>

        <!-- 小卡片：清单/待办 -->
        <Card class="card-small" :hoverable="true">
          <template #title>
            <div class="card-title">清单 · 待复习</div>
          </template>
          <template #body>
            <div class="todo-list">
              <label v-for="(todo, i) in todos" :key="i" class="todo-item">
                <input type="checkbox" v-model="todo.done" />
                <span :class="{ done: todo.done }">{{ todo.text }}</span>
              </label>
            </div>
          </template>
        </Card>

        <!-- 小卡片：链接/导航 -->
        <Card class="card-small" :hoverable="true">
          <template #title>
            <div class="card-title">导航 · 相关阅读</div>
          </template>
          <template #body>
            <nav class="link-list">
              <a v-for="(link, i) in links" :key="i" :href="link.href" target="_blank">{{ link.label }}</a>
            </nav>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card/index.vue'

// 伪造数据
const planList = ref([
  { time: '09:00', name: 'TypeScript · 基础类型', desc: 'number/string/boolean/array/tuple 等' },
  { time: '10:30', name: 'TypeScript · 接口与类型', desc: 'interface vs type, 交叉/联合、索引类型' },
  { time: '14:00', name: 'TS · 内置工具类型', desc: 'Partial/Required/Pick/Record/Readonly 等' },
  { time: '16:00', name: 'JavaScript · 基础', desc: '变量、作用域、闭包、原型' }
])

const smallCards = ref([
  {
    title: '要点 · BasicType',
    items: ['基本类型与字面量类型', '数组与元组', '枚举/联合/交叉', '类型断言与类型守卫']
  },
  {
    title: '要点 · Interface & Type',
    items: ['接口扩展与合并', '类型别名与泛型', '索引签名', '可选/只读属性']
  },
  {
    title: '要点 · Built-in Tools',
    items: ['Partial / Required', 'Pick / Omit / Record', 'Readonly / Mutable', 'ReturnType / Parameters']
  }
])

const todos = ref([
  { text: '复习：interface 与 type 区别', done: false },
  { text: '巩固：泛型约束 extends 的使用', done: true },
  { text: '掌握：Record 与映射类型', done: false }
])

const links = ref([
  { label: 'TS 基础类型', href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  { label: '接口 vs 类型别名', href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html' },
  { label: '内置工具类型', href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html' },
  { label: 'JS 是什么', href: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript' }
])
</script>

<style lang="less" scoped>
.view-container {
  color: var(--color-text);
  max-width: 1200px;
  margin: 0 auto;
}

/* 页头区域 */
.page-header {
  background: linear-gradient(135deg,
      color-mix(in oklab, var(--color-primary) 15%, transparent),
      transparent 60%);
  border-bottom: 1px solid var(--element-border);
}

.header-inner {
  width: 100%;
  padding: clamp(16px, 4vw, 32px);
}

.page-title {
  color: var(--color-heading);
  font-size: clamp(22px, 3.6vw, 32px);
  font-weight: 700;
  line-height: 1.25;
}

.page-subtitle {
  margin-top: 6px;
  color: var(--color-text);
  font-size: clamp(14px, 2.6vw, 16px);
}

.page-note {
  margin-top: 10px;
  color: var(--color-text-soft);
  font-size: 13px;
}

/* 布局栅格 */
.layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(12px, 3.5vw, 24px);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(8px, 2.5vw, 16px);
}

/* 大卡片跨列：移动端 12 列，平板 8~12 列，桌面 8 列 */
.card-large {
  grid-column: 1 / -1;
}

/* 小卡片：移动端 12 列，平板 6 列，桌面 4 列 */
.card-small {
  grid-column: span 12;
}

@media (min-width: 640px) {

  /* sm */
  .card-large {
    grid-column: 1 / -1;
  }

  .card-small {
    grid-column: span 6;
  }
}

@media (min-width: 960px) {

  /* md */
  .card-large {
    grid-column: span 8;
  }

  .card-small {
    grid-column: span 4;
  }
}

/* 内容元素样式 */
.card-title {
  color: var(--color-heading);
  font-weight: 600;
  font-size: 16px;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: start;
  gap: 12px;
  padding: 10px 12px;
  border: 1px dashed var(--element-border);
  border-radius: calc(var(--element-border-radius) / 1);
  background: var(--element-background-soft);
}

.plan-time {
  color: var(--color-primary);
  font-weight: 600;
}

.plan-name {
  color: var(--color-heading);
  font-weight: 600;
}

.plan-desc {
  color: var(--color-text);
  font-size: 13px;
}

.bullet-list {
  margin: 0;
  padding-left: 16px;
  display: grid;
  row-gap: 6px;
  list-style: disc;
}

.todo-list {
  display: grid;
  row-gap: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo-item input[type='checkbox'] {
  width: 14px;
  height: 14px;
}

.todo-item .done {
  text-decoration: line-through;
  color: var(--color-text-soft);
}

.link-list {
  display: grid;
  row-gap: 8px;
}

.link-list a {
  color: var(--color-link, var(--color-primary));
}

.link-list a:hover {
  color: var(--color-link-hover, var(--color-secondary));
}

/* 代码块适配主题 */
.code-block pre {
  margin: 0;
  padding: 12px;
  border-radius: var(--element-border-radius);
  border: 1px solid var(--element-border);
  background: var(--element-background-mute);
  color: var(--color-text);
  overflow-x: auto;
}
</style>
