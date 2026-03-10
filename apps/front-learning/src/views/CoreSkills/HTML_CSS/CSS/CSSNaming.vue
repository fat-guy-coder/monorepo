<template>
  <div class="css-naming-docs">
    <h1>CSS 命名规范基本指南</h1>

    <div class="naming-system">
      <div v-for="system in namingSystems" :key="system.name" class="system-card">
        <div class="system-header" :class="system.type">
          <h2>{{ system.name }}</h2>
          <span class="type-tag">{{ system.type }}</span>
        </div>

        <div class="system-body">
          <div class="principle">
            <h3>核心原则</h3>
            <ul>
              <li v-for="(item, index) in system.principles" :key="index">{{ item }}</li>
            </ul>
          </div>

          <div class="example-box">
            <h3>命名示例</h3>
            <pre class="example-code"><code>{{ system.example }}</code></pre>
            <div class="syntax-diagram" v-html="system.diagram"></div>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>✅ 优点</h4>
              <ul>
                <li v-for="(pro, index) in system.pros" :key="'pro' + index">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4>❌ 缺点</h4>
              <ul>
                <li v-for="(con, index) in system.cons" :key="'con' + index">{{ con }}</li>
              </ul>
            </div>
          </div>

          <div v-if="system.notes" class="notes">
            <span class="icon">💡</span>
            <p>{{ system.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface NamingSystem {
  name: string
  type: 'methodology' | 'convention' | 'architecture'
  principles: string[]
  example: string
  diagram: string
  pros: string[]
  cons: string[]
  notes?: string
}

const namingSystems = reactive<NamingSystem[]>([
  {
    name: 'BEM',
    type: 'methodology',
    principles: [
      'Block__Element--Modifier 结构',
      '严格的三层命名结构',
      '使用双下划线和双连字符',
      '全小写命名',
    ],
    example: `.search-form {}
.search-form__input {}
.search-form__submit--disabled {}`,
    diagram: `
      <div class="bem-diagram">
        <span class="block">Block</span>
        <span class="arrow">→</span>
        <span class="element">__Element</span>
        <span class="arrow">→</span>
        <span class="modifier">--Modifier</span>
      </div>
    `,
    pros: ['结构清晰易维护', '避免样式冲突', '自解释性强'],
    cons: ['命名较长', '视觉冗余', '学习成本较高'],
    notes: '推荐在中大型项目中使用',
  },
  {
    name: 'OOCSS',
    type: 'architecture',
    principles: ['分离结构与皮肤', '分离容器与内容', '高复用性组件', '避免位置依赖'],
    example: `.btn {}
.btn-primary {}
.media {}
.media-image {}`,
    diagram: `
      <div class="oocss-diagram">
        <div class="structure">结构</div>
        <div class="skin">皮肤</div>
      </div>
    `,
    pros: ['代码复用率高', '减少CSS体积', '组件化程度高'],
    cons: ['需要抽象设计', '可能产生多class组合', '需要严格规范'],
  },
  {
    name: '通用约定',
    type: 'convention',
    principles: [
      '使用小写字母',
      '连字符分隔(kebab-case)',
      '语义化命名',
      '避免缩写',
      '状态前缀(is-/has-)',
    ],
    example: `.nav-menu {}
.card-title {}
.is-active {}
.has-dropdown {}`,
    diagram: `
      <div class="common-diagram">
        <span>prefix-</span>
        <span>组件</span>
        <span>-子元素</span>
        <span>-状态</span>
      </div>
    `,
    pros: ['简单易用', '团队易统一', '灵活性强'],
    cons: ['缺乏强制约束', '可能产生命名冲突', '需要文档支持'],
    notes: '适合小型项目或配合CSS Modules使用',
  },
])
</script>

<style lang="less" scoped>
.css-naming-docs {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background: #f9fafb;
  color: #111827;
}

h1 {
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
}

h1::after {
  display: none;
}

.naming-system {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}

.system-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  transition: none;
}

.system-card:hover {
  transform: none;
  box-shadow: none;
}

.system-header {
  padding: 1rem 1.5rem;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-bottom: 1px solid #e5e7eb;
}

.system-header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #111827;
}

.system-header.methodology {
  background: #eff6ff;
}

.system-header.architecture {
  background: #f0fdf4;
}

.system-header.convention {
  background: #fffbeb;
}

.type-tag {
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #4b5563;
}

.system-body {
  padding: 1rem 1.5rem 1.5rem;
}

.system-body h3 {
  color: #374151;
  font-size: 1.1rem;
  margin: 0.8rem 0;
  font-weight: 600;
  padding-left: 0;
}

.system-body h3::before {
  display: none;
}

.principle ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principle li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.principle li::before {
  content: '•';
  color: #9ca3af;
  margin-right: 0.8rem;
}

.example-box {
  margin: 1rem 0;
  background: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.example-code {
  background: #1f2937;
  color: #e5e7eb;
  padding: 0.8rem 1rem;
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.syntax-diagram {
  padding: 0.8rem;
  text-align: center;
  font-family: 'Fira Code', monospace;
  color: #6b7280;
  background: white;
}

.syntax-diagram span {
  margin: 0 0.2rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.syntax-diagram .block {
  background: #dbeafe;
}

.syntax-diagram .element {
  background: #dcfce7;
}

.syntax-diagram .modifier {
  background: #fef3c7;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0 1rem;
}

.pros-cons h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.pros-cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.pros-cons li {
  padding: 0.3rem 0;
  display: flex;
  align-items: center;
}

.pros-cons li::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 0.6rem;
}

.pros li::before {
  background: #22c55e;
}

.cons li::before {
  background: #ef4444;
}

.notes {
  background: #eff6ff;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.notes .icon {
  font-size: 1.2rem;
}
</style>
