<template>
  <div class="at-rule-guide">
    <h1>CSS @规则基本介绍</h1>

    <section class="intro-section">
      <p>@规则（At-rules）是CSS中的特殊语句，用于指导CSS如何执行特定操作。它们以@符号开头，后跟标识符和语法块，是控制CSS全局行为的重要机制。</p>
    </section>

    <!-- 常用@规则列表 -->
    <SectionTitle title="常用@规则" />
    <div class="at-rule-grid">
      <AtRuleCard v-for="(rule, index) in commonAtRules" :key="index" :title="rule.title" :syntax="rule.syntax"
        :example="rule.example" :desc="rule.desc" :scenario="rule.scenario" :type="rule.type" :notice="rule.notice" />
    </div>

    <!-- 其他@规则 -->
    <SectionTitle title="其他@规则" />
    <div class="other-rules">
      <div v-for="(rule, index) in otherAtRules" :key="'other-' + index" class="rule-item">
        <h3 class="rule-title">
          <code>{{ rule.syntax }}</code>
          <span class="tag" :class="rule.type">{{ rule.type }}</span>
        </h3>
        <p class="rule-desc">{{ rule.desc }}</p>
      </div>
    </div>

    <!-- 使用提示 -->
    <SectionTitle title="使用注意事项" />
    <div class="tips-section">
      <ul>
        <li v-for="(tip, index) in usageTips" :key="'tip-' + index">
          {{ tip }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionTitle from '../Components/SectionTitle.vue'
import AtRuleCard from '../Components/AtRuleCard.vue'

interface AtRule {
  title: string
  syntax: string
  example: string
  desc: string
  scenario: string
  type: 'common' | 'experimental' | 'deprecated'
  notice?: string
}

const commonAtRules = ref<AtRule[]>([
  {
    title: '@media',
    syntax: '@media <media-query> { ... }',
    example: `@media (min-width: 768px) {
  .container { padding: 2rem; }
}`,
    desc: '媒体查询，响应式设计的核心',
    scenario: '设备适配、黑暗模式、打印样式',
    type: 'common',
    notice: '注意：@media 规则可以嵌套使用，以实现更复杂的媒体查询条件。'
  },
  {
    title: '@keyframes',
    syntax: '@keyframes <name> { <keyframes> }',
    example: `@keyframes slidein {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`,
    desc: '定义动画关键帧',
    scenario: '复杂动画效果实现',
    type: 'common',
  },
  {
    title: '@font-face',
    syntax: '@font-face { font-family: <name>; src: <url>; }',
    example: `@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
}`,
    desc: '自定义字体引入',
    scenario: '品牌字体、图标字体加载',
    type: 'common'
  },
  {
    title: '@import',
    syntax: '@import <url>;',
    example: '@import "styles.css";',
    desc: '导入其他样式表',
    scenario: '模块化、组件化开发',
    type: 'common',
    notice: '注意：@import 规则在性能敏感场景建议改用<link>标签。'
  },
  {
    title: '@charset',
    syntax: '@charset "UTF-8";',
    example: '@charset "UTF-8";',
    desc: '定义样式表编码',
    scenario: '确保样式表正确编码',
    type: 'common',
    notice: '注意：@charset 规则必须放在样式表的第一行。'
  },
  {
    title: '@supports',
    syntax: '@supports (property: value) { ... }',
    example: '@supports (display: grid) { ... }',
    desc: '特性检测，根据浏览器支持加载样式',
    scenario: '浏览器兼容性处理',
    type: 'common'
  },
  {
    title: '@namespace',
    syntax: '@namespace <prefix> "URI";',
    example: '@namespace svg "http://www.w3.org/2000/svg";',
    desc: '命名空间声明',
    scenario: 'SVG命名空间处理',
    type: 'common',
    notice: '注意：@namespace 规则在现代浏览器中已不再需要，因为CSS模块化已经足够强大。'
  },
  {
    title: '@document',
    syntax: '@document <url-selector> { ... }',
    example: '@document url(https://example.com) { ... }',
    desc: '文档选择器',
    scenario: '特定文档样式控制',
    type: 'common',
  }
])

const otherAtRules = ref([
  {
    title: '@page',
    syntax: '@page <page-selector> { ... }',
    example: '@page :first { margin: 10px; }',
    desc: '页面选择器',
    scenario: '页面样式控制',
    type: 'common',
  },
  {
    title: '@counter-style',
    syntax: '@counter-style <name> { <counter-style> }',
    example: '@counter-style custom-counter { system: cyclic; symbols: "🔴" "🔵" "🔻"; }',
    desc: '自定义计数器样式',
    scenario: '列表样式、计数器样式',
    type: 'common',
  },
  {
    title: '@font-feature-values',
    syntax: '@font-feature-values <font-family> { <feature-name> <value>; ... }',
    example: '@font-feature-values "Open Sans" { @styleset "Bold" 700; }',
    desc: '字体特性值',
    scenario: '字体特性值控制',
    type: 'common',
  },

])

const usageTips = ref([
  '媒体查询建议使用移动优先原则（min-width）',
  '@font-face需要处理跨域和字体格式兼容',
  '@keyframes动画注意性能，优先使用opacity/transform',
  '@import在性能敏感场景建议改用<link>标签'
])
</script>

<style lang="less" scoped>
.at-rule-guide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background: #f9fafb;
}

h1 {
  color: #111827;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  border-bottom: none;
  padding-bottom: 0.5rem;
}

.intro-section {
  background: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  line-height: 1.6;
  border: 1px solid #e5e7eb;
}

.at-rule-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.other-rules {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  background: #fff;
}

.rule-item {
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.rule-item:last-child {
  border-bottom: none;
}

.rule-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-size: 1.1rem;
}

.tag {
  font-size: 0.8em;
  padding: 0.1em 0.5em;
  border-radius: 4px;
  background: #e5e7eb;
  color: #2563eb;

  &.common {
    background: #3b82f6;
    color: #fff;
  }

  &.experimental {
    background: #fde68a;
    color: #b45309;
  }

  &.deprecated {
    background: #fca5a5;
    color: #b91c1c;
  }
}

.tips-section {
  background: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-top: 1.5rem;
}

.tips-section ul {
  list-style-type: square;
  padding-left: 1.5rem;
}

.tips-section li {
  margin: 0.3rem 0;
  line-height: 1.5;
}

// AtRuleCard组件样式
.at-rule-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  transition: none;
  margin-bottom: 0;
}

.at-rule-card pre {
  background: #f3f4f6;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95em;
  margin: 0.5rem 0 0 0;
}

.at-rule-card .scenario {
  color: #64748b;
  font-size: 0.95em;
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px solid #f3f4f6;
}
</style>
