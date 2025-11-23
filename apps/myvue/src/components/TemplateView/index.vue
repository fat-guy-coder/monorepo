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
  
      <!-- Section：彩色标签 / 快速导航 -->
      <section class="section-wrap">
        <Card class="section-card" :hoverable="true">
          <template #title>
            <div class="section-title">专题 · 快速导航</div>
          </template>
          <template #body>
            <div class="chip-list">
              <a v-for="(t, i) in tags" :key="i" class="chip" :href="t.href" target="_blank">{{ t.label }}</a>
            </div>
          </template>
        </Card>
      </section>
  
      <!-- Section：学习进度 / 可视化条 -->
      <section class="section-wrap">
        <Card class="section-card" :hoverable="true">
          <template #title>
            <div class="section-title">进度 · 可视化</div>
          </template>
          <template #body>
            <div class="progress-list">
              <div v-for="(p, i) in progresses" :key="i" class="progress-item">
                <div class="progress-meta">
                  <span class="name">{{ p.label }}</span>
                  <span class="val">{{ p.value }}%</span>
                </div>
                <div class="progress">
                  <div class="bar" :style="{ '--val': p.value + '%' }"></div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </section>
  
      <!-- Section：Tips / 温馨提示 -->
      <section class="section-wrap">
        <Card class="section-card" :hoverable="true">
          <template #title>
            <div class="section-title">Tips · 温馨提示</div>
          </template>
          <template #body>
            <ul class="tip-list">
              <li v-for="(tip, i) in tips" :key="i">{{ tip }}</li>
            </ul>
          </template>
        </Card>
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
  
  // 新增：彩色标签（快速导航）
  const tags = ref([
    { label: '基础类型', href: '#' },
    { label: '接口与类型', href: '#' },
    { label: '工具类型', href: '#' },
    { label: '泛型', href: '#' },
    { label: '类型守卫', href: '#' },
    { label: 'JS 基础', href: '#' }
  ])
  
  // 新增：学习进度（可视化）
  const progresses = ref([
    { label: 'TypeScript 基础', value: 70 },
    { label: '接口与类型', value: 55 },
    { label: '内置工具类型', value: 40 },
    { label: 'JavaScript 基础', value: 80 }
  ])
  
  // 新增：温馨提示
  const tips = ref([
    '分段学习，每段 25-40 分钟高效专注',
    '在实际项目中寻找类型系统的落点',
    '注意与 antd token/主题变量保持一致',
    '记录问题与知识点，形成个人索引'
  ])
  </script>
  
  <style lang="less"></style>
  