<template>
  <div class="page-container" :class="[`page-container--${currentMode}`]" :style="styleVars">
    <!-- 头部：标题区 -->
    <PageHeader title="核心技能模板页" subtitle="以主题变量驱动的卡片式信息布局"
      description="建议：本模板用于承载知识点/功能模块的分区展示。通过主题变量实现深浅/冷暖主题的无缝切换；布局优先采用栅格，在移动端保持优秀可读性与触达性。" />
    <!-- 列表模式和混合模式：导航 -->
    <Nav v-if="currentMode === 'list'" show-back-to-top :list="categoryList" show-child />
    <Nav v-if="currentMode === 'mixed'" show-back-to-top :list="mixedNavList" show-child />
    <!-- 模式切换 Tabs -->
    <Row :gutter="currentConfig.grid?.gutter || 0">
      <Col span="24">
        <NavCard :items="modeTabs.map((t) => ({ id: t.value, title: t.label }))" size="medium" variant="gradient"
          rounded="md" :direction="(templateConfig.components.navTagCard?.direction as any) || 'horizontal'"
          :animation="['slide-left']" v-model:active-id="currentMode">
          <!-- 普通模式 -->
          <template #normal>
            <Row :gutter="currentConfig.grid?.gutter || 0">
              <Col v-bind="currentConfig.grid?.layout?.row1?.planOverview">
                <Card class="card-large" :hoverable="true" :bordered="true" title="概览 · 今日学习计划" id="planOverview">
                  <List type="plan" :items="planList" :show-underline="false" />
                </Card>
              </Col>

              <Col v-bind="currentConfig.grid?.layout?.row1?.keyPoints1">
                <Card class="card-small" :hoverable="true" :h3="smallCards[0]?.title" id="keyPoints1">
                  <List type="bullet" :items="smallCards[0]?.items || []" />
                </Card>
              </Col>
            </Row>

            <Row :gutter="currentConfig.grid?.gutter || 0">
              <Col v-bind="currentConfig.grid?.layout?.row2?.keyPoints2">
                <Card class="card-small" :hoverable="true" :h3="smallCards[1]?.title" id="keyPoints2">
                  <List type="bullet" :items="smallCards[1]?.items || []" />
                </Card>
              </Col>

              <Col v-bind="currentConfig.grid?.layout?.row2?.keyPoints3">
                <Card class="card-small" :hoverable="true" :h3="smallCards[2]?.title" id="keyPoints3">
                  <List type="bullet" :items="smallCards[2]?.items || []" />
                </Card>
              </Col>
            </Row>

            <Row :gutter="currentConfig.grid?.gutter || 0">
              <Col v-bind="currentConfig.grid?.layout?.row3?.codeExample">
                <Card class="card-large" :hoverable="true" title="示例 · 类型系统要点" id="codeExample">
                  <Code :code="codeSnippet" language="ts" title="类型系统示例" />
                </Card>
              </Col>

              <Col v-bind="currentConfig.grid?.layout?.row3?.todoList">
                <Card class="card-small" :hoverable="true" h3="清单 · 待复习" id="todoList">
                  <List type="todo" :items="todos" :show-underline="false" />
                </Card>
              </Col>
            </Row>
            <Row :gutter="currentConfig.grid?.gutter || 0">
              <Col v-bind="currentConfig.grid?.layout?.row4?.relatedLinks">
                <Card class="card-small" :hoverable="true" h3="导航 · 相关阅读" id="relatedLinks">
                  <List type="link" :items="links" :show-underline="false" />
                </Card>
              </Col>
            </Row>
          </template>
          <!-- 列表模式 -->
          <template #list>
            <Row :gutter="currentConfig.grid?.gutter || 0" v-for="category in categoryList" :key="category.id">
              <Col v-bind="currentConfig.grid?.layout?.item">
                <Card as="section" :hoverable="true" :key="category.id" :id="category.id" class="category-section"
                  :title="category.name">
                  <Row :gutter="currentConfig.grid?.gutter || 0" v-for="(item, index) in category.children"
                    :key="item.id">
                    <Col v-if="category.id !== 'key-points'" v-bind="currentConfig.grid?.layout?.item">
                      <Card :id="item.id" :bordered="false" :title="item.name">
                        <List v-if="item.type === 'plan'" type="plan" :items="item.data as IPlan[]"
                          :show-underline="false" />
                        <List v-else-if="item.type === 'list'" type="bullet" :items="item.data as string[]" />
                        <Code v-else-if="item.type === 'code'" :code="item.data as string" language="ts"
                          :hidden-toolbar="false" />
                        <List v-else-if="item.type === 'todo'" type="todo" :items="item.data as ITodo[]"
                          :show-underline="false" />
                        <List v-else-if="item.type === 'links'" type="link" :items="item.data as ILink[]"
                          :show-underline="false" />
                        <div v-else-if="item.type === 'tags'" class="chip-list">
                          <Link v-for="tag in item.data as ITag[]" :key="tag.id" :id="tag.id" :href="tag.href"
                            :text="tag.label" size="small" />
                        </div>
                        <List v-else-if="item.type === 'progress'" :items="item.data as IProgress[]"
                          :show-underline="false">
                        </List>
                        <List v-else-if="item.type === 'tips'" :items="(item.data as ITip[]).map((i) => i.text)" />
                      </Card>
                    </Col>
                    <Col v-else span="24">
                      <Row :gutter="currentConfig.grid?.gutter || 0" :key="item.id">
                        <Col v-bind="currentConfig?.grid?.layout?.keyPoints">
                          <Card :id="item.id" :title="item.name">
                            <List v-if="item.type === 'plan'" type="plan" :items="item.data as IPlan[]"
                              :show-underline="false" />
                            <List v-else-if="item.type === 'list'" type="bullet" :items="item.data as string[]" />
                            <Code v-else-if="item.type === 'code'" :code="item.data as string" language="ts"
                              :hidden-toolbar="false" />
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </template>
          <!-- 瀑布模式 -->
          <template #waterfall>
            <Card as="section" v-for="chapter in waterfallChapters" :key="chapter.id" :id="chapter.id"
              class="waterfall-column-section" :title="chapter.title">
              <List v-if="chapter.type === 'plan'" type="plan" :items="chapter.data as IPlan[]"
                :show-underline="false" />
              <List v-else-if="chapter.type === 'points'" :items="chapter.data as ISmallCard[]" :show-underline="false">
                <template #item="{ item: point }">
                  <Card :title="(point as ISmallCard).title">
                    <List type="bullet" :items="(point as ISmallCard).items" />
                  </Card>
                </template>
              </List>
              <Code v-else-if="chapter.type === 'code'" :code="chapter.data as string" language="ts"
                :hidden-toolbar="false" />
              <List v-else-if="chapter.type === 'todo'" type="todo" :items="chapter.data as ITodo[]"
                :show-underline="false" />
              <List v-else-if="chapter.type === 'links'" type="link" :items="chapter.data as ILink[]"
                :show-underline="false" />
              <div v-else-if="chapter.type === 'tags'" class="waterfall-tags-container">
                <Link v-for="tag in chapter.data as ITag[]" :key="tag.id" :id="tag.id" :href="tag.href"
                  :text="tag.label" size="medium" variant="gradient" :gradient-colors="['#1677ff', '#69b1ff']"
                  rounded="pill" animation="glow" target="_blank" />
              </div>
              <List v-else-if="chapter.type === 'progress'" :items="chapter.data as IProgress[]"
                :show-underline="false">
              </List>
              <List v-else-if="chapter.type === 'tips'" :items="(chapter.data as ITip[]).map((i) => i.text)" />
            </Card>
          </template>
          <!-- 混合模式 -->
          <template #mixed>
            <div class="mixed-content">
              <Row :gutter="currentConfig.grid?.gutter || 0">
                <Col v-bind="currentConfig.grid?.layout?.row1?.planOverview">
                  <Card class="card-large" :hoverable="true" :bordered="true" title="📅 概览 · 今日学习计划">
                    <List type="plan" :items="planList" :show-underline="false" />
                  </Card>
                </Col>
                <Col v-bind="currentConfig.grid?.layout?.row1?.keyPoints1">
                  <Card class="card-small" :hoverable="true" :h3="smallCards[0]?.title">
                    <List type="bullet" :items="smallCards[0]?.items || []" />
                  </Card>
                </Col>
              </Row>
              <Row :gutter="currentConfig.grid?.gutter || 0">
                <Col v-bind="currentConfig.grid?.layout?.row2?.keyPoints2">
                  <Card class="card-small" :hoverable="true" :h3="smallCards[1]?.title">
                    <List type="bullet" :items="smallCards[1]?.items || []" />
                  </Card>
                </Col>
                <Col v-bind="currentConfig.grid?.layout?.row2?.keyPoints3">
                  <Card class="card-small" :hoverable="true" :h3="smallCards[2]?.title">
                    <List type="bullet" :items="smallCards[2]?.items || []" />
                  </Card>
                </Col>
              </Row>
              <!-- Other mixed sections can be refactored similarly -->
            </div>
          </template>
        </NavCard>
      </Col>
    </Row>
    <!-- Standalone Sections -->
    <Row :gutter="currentConfig.grid?.gutter || 0">
      <Col v-bind="templateConfig.common?.grid?.layout?.row1?.quickNav">
        <Card as="section" class="page-section" variant="section-card" :hoverable="true" title="专题 · 快速导航"
          id="quickNav">
          <NavCard :items="tags.map((t) => ({ id: t.id, title: t.label }))" size="medium" variant="gradient"
            rounded="md" :direction="(templateConfig.components.navTagCard?.direction as any) || 'horizontal'"
            :enable-scroll="templateConfig.components.navTagCard?.mode === 'scroll'">
            <template #[i.id] v-for="i in tags">
              <Card :hoverable="true" :h3="i.label">
                <List :items="tips.map((tip) => tip.text)" />
              </Card>
            </template>
          </NavCard>
        </Card>
      </Col>
    </Row>

    <Row :gutter="currentConfig.grid?.gutter || 0">
      <Col v-bind="templateConfig.common?.grid?.layout?.row2?.progress">
        <Card as="section" class="page-section" variant="section-card" :hoverable="true" title="进度 · 可视化" id="progress">
          <List :items="progresses" type="progress" :show-underline="false"> </List>
        </Card>
      </Col>
    </Row>
    <Row :gutter="currentConfig.grid?.gutter || 0">
      <Col v-bind="templateConfig.common?.grid?.layout?.row3?.tips">
        <Card as="section" class="page-section" variant="section-card" :hoverable="true" title="Tips · 温馨提示" id="tips">
          <List :items="tips as ITip[]" type="tips" />
        </Card>
      </Col>
    </Row>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  List,
  Card,
  Nav,
  Link,
  NavCard,
  Code,
  Row,
  Col,
  PageHeader,
  PageFooter,
} from '@/components'
import templateConfig from './Template.json'
import type {
  IPlan,
  ISmallCard,
  ITodo,
  ILink,
  ITag,
  IProgress,
  ITip,
} from '@/components/List/index.d'

// --- 组件 Props ---
const { mode = 'normal' } = defineProps<{ mode?: 'normal' | 'list' | 'waterfall' | 'mixed' }>()

// --- 辅助函数 ---
const generateId = () => `id-${Math.random().toString(36).slice(2, 9)}`

// --- 响应式状态 ---
type ModeType = 'normal' | 'list' | 'waterfall' | 'mixed'
const currentMode = ref<ModeType>(mode)
const modeTabs: Array<{ label: string; value: ModeType }> = [
  { label: '普通模式', value: 'normal' },
  { label: '列表模式', value: 'list' },
  { label: '瀑布模式', value: 'waterfall' },
  { label: '混合模式', value: 'mixed' },
]

// --- 配置 ---

const currentConfig = computed(() => {
  const config = (templateConfig as any)[currentMode.value] || templateConfig.normal || {}
  return config
})

const styleVars = computed(() => {
  const modeConfig = currentConfig.value
  return {
    '--waterfall-grid-columns': modeConfig.grid?.columns || '1fr 1fr',
    '--waterfall-grid-gap': modeConfig.grid?.gap || 'var(--gap-2xl)',
  }
})

// --- 数据 ---
const codeSnippet = `// TypeScript 基础类型
let age: number = 18
let username: string = 'cascade'
let isOk: boolean = true

// 接口与类型别名
interface User { id: number; name: string }
type ID = User['id']

// 内置工具类型
type ReadonlyUser = Readonly<User>`

const planList: IPlan[] = [
  {
    id: generateId(),
    time: '09:00',
    name: 'TypeScript · 基础类型',
    desc: 'number/string/boolean/array/tuple 等',
  },
  {
    id: generateId(),
    time: '10:30',
    name: 'TypeScript · 接口与类型',
    desc: 'interface vs type, 交叉/联合、索引类型',
  },
  {
    id: generateId(),
    time: '14:00',
    name: 'TS · 内置工具类型',
    desc: 'Partial/Required/Pick/Record/Readonly 等',
  },
  { id: generateId(), time: '16:00', name: 'JavaScript · 基础', desc: '变量、作用域、闭包、原型' },
]

const smallCards: ISmallCard[] = [
  {
    id: generateId(),
    title: '要点 · BasicType',
    items: ['基本类型与字面量类型', '数组与元组', '枚举/联合/交叉', '类型断言与类型守卫'],
  },
  {
    id: generateId(),
    title: '要点 · Interface & Type',
    items: ['接口扩展与合并', '类型别名与泛型', '索引签名', '可选/只读属性'],
  },
  {
    id: generateId(),
    title: '要点 · Built-in Tools',
    items: [
      'Partial / Required',
      'Pick / Omit / Record',
      'Readonly / Mutable',
      'ReturnType / Parameters',
    ],
  },
]

const todos: ITodo[] = [
  { id: generateId(), label: '复习：interface 与 type 区别', completed: false },
  { id: generateId(), label: '巩固：泛型约束 extends 的使用', completed: true },
  { id: generateId(), label: '掌握：Record 与映射类型', completed: false },
]

const links: ILink[] = [
  {
    id: generateId(),
    label: 'TS 基础类型',
    href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
    target: '_blank',
  },
  {
    id: generateId(),
    label: '接口 vs 类型别名',
    href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
    target: '_blank',
  },
  {
    id: generateId(),
    label: '内置工具类型',
    href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
    target: '_blank',
  },
  {
    id: generateId(),
    label: 'JS 是什么',
    href: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
    target: '_blank',
  },
]

const tags: ITag[] = [
  { id: generateId(), label: '基础类型', href: '#' },
  { id: generateId(), label: '接口与类型', href: '#' },
  { id: generateId(), label: '工具类型', href: '#' },
  { id: generateId(), label: '泛型', href: '#' },
  { id: generateId(), label: '类型守卫', href: '#' },
  { id: generateId(), label: 'JS 基础', href: '#' },
]

const progresses: IProgress[] = [
  { id: generateId(), label: 'TypeScript 基础', value: 70 },
  { id: generateId(), label: '接口与类型', value: 55 },
  { id: generateId(), label: '内置工具类型', value: 40 },
  { id: generateId(), label: 'JavaScript 基础', value: 80 },
]

const tips: ITip[] = [
  { id: generateId(), text: '分段学习，每段 25-40 分钟高效专注' },
  { id: generateId(), text: '在实际项目中寻找类型系统的落点' },
  { id: generateId(), text: '注意与 antd token/主题变量保持一致' },
  { id: generateId(), text: '记录问题与知识点，形成个人索引' },
]

const waterfallChapters = [
  { id: 'learning-plan', title: '📅今日学习计划', type: 'plan', data: planList },
  { id: 'key-points', title: '📚 要点总结', type: 'points', data: smallCards },
  { id: 'code-examples', title: '💻代码示例', type: 'code', data: codeSnippet },
  { id: 'todo-list', title: '✅ 待办清单', type: 'todo', data: todos },
  { id: 'related-links', title: '🔗 相关阅读', type: 'links', data: links },
  { id: 'quick-nav', title: '🚀 快速导航', type: 'tags', data: tags },
  { id: 'progress', title: '📊 学习进度', type: 'progress', data: progresses },
  { id: 'tips', title: '💡 温馨提示', type: 'tips', data: tips },
]

const categoryList = [
  {
    id: 'learning-plan',
    name: '今日学习计划',
    children: [{ id: 'plan-overview', name: '概览 · 今日学习计划', type: 'plan', data: planList }],
  },
  {
    id: 'key-points',
    name: '要点总结',
    children: smallCards.map((card) => ({
      id: card.id,
      name: card.title,
      type: 'list',
      data: card.items,
    })),
  },
  {
    id: 'code-examples',
    name: '代码示例',
    children: [
      { id: 'example-types', name: '示例 · 类型系统要点', type: 'code', data: codeSnippet },
    ],
  },
  {
    id: 'todo-list',
    name: '待办清单',
    children: [{ id: 'todo-review', name: '清单 · 待复习', type: 'todo', data: todos }],
  },
  {
    id: 'related-links',
    name: '相关阅读',
    children: [{ id: 'links-nav', name: '导航 · 相关阅读', type: 'links', data: links }],
  },
  {
    id: 'quick-nav',
    name: '快速导航',
    children: [{ id: 'tags-nav', name: '专题 · 快速导航', type: 'tags', data: tags }],
  },
  {
    id: 'progress',
    name: '学习进度',
    children: [
      { id: 'progress-visual', name: '进度 · 可视化', type: 'progress', data: progresses },
    ],
  },
  {
    id: 'tips',
    name: '温馨提示',
    children: [{ id: 'tips-notice', name: 'Tips · 温馨提示', type: 'tips', data: tips }],
  },
]

const mixedNavList = [
  { id: 'mixed-learning-plan', name: '学习计划' },
  { id: 'mixed-code-examples', name: '代码示例' },
  { id: 'mixed-todo-list', name: '待办清单' },
  { id: 'mixed-links-nav', name: '链接导航' },
  { id: 'mixed-progress-tips', name: '进度提示' },
  { id: 'mixed-key-points', name: '要点总结' },
]
</script>

<style lang="less">
.page-container {
  color: var(--color-text);
  /* Increased max-width for better alignment */

  max-width: 80rem;
  margin: 0 auto;
}
</style>
