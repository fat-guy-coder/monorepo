<template>
  <div class="css-tools-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🛠️ CSS 工具大全</h1>
    </header>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 颜色工具 -->
      <section class="tool-section">
        <h2 class="section-title"><span class="icon">🎨</span> 颜色工具</h2>
        <div class="tool-grid">
          <ToolCard v-for="tool in colorTools" :key="tool.name" :tool="tool" />
        </div>
      </section>

      <!-- 动画工具 -->
      <section class="tool-section">
        <h2 class="section-title"><span class="icon">🎬</span> 动画工具</h2>
        <div class="tool-grid">
          <ToolCard v-for="tool in animationTools" :key="tool.name" :tool="tool" />
        </div>
      </section>

      <!-- 布局工具 -->
      <section class="tool-section">
        <h2 class="section-title"><span class="icon">📐</span> 布局工具</h2>
        <div class="tool-grid">
          <ToolCard v-for="tool in layoutTools" :key="tool.name" :tool="tool" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolCard from '../Components/ToolCard.vue'

export interface Tool {
  name: string
  category: string
  url: string
  desc: string
  features: string[]
}

const tools = ref<Tool[]>([
  {
    name: 'Coolors',
    category: 'color',
    url: 'https://coolors.co',
    desc: '快速生成配色方案',
    features: ['实时配色预览', '导出多种格式', '社区方案分享'],
  },
  {
    name: 'Animista',
    category: 'animation',
    url: 'https://animista.net',
    desc: 'CSS动画预设库',
    features: ['可视化调整', '一键生成代码', '预设分类'],
  },
  {
    name: 'CSS Grid Generator',
    category: 'layout',
    url: 'https://cssgrid-generator.netlify.app',
    desc: '可视化网格布局生成器',
    features: ['拖拽调整布局', '自动生成代码', '响应式预设'],
  },
  {
    name: 'Gradient Hunt',
    category: 'color',
    url: 'https://gradienthunt.com',
    desc: '免费的渐变色调生成器',
    features: ['丰富的渐变色选项', '一键复制代码', '每日推荐新配色'],
  },
  {
    name: 'Layoutit!',
    category: 'layout',
    url: 'https://layoutit.com',
    desc: '可视化生成Bootstrap布局',
    features: ['拖拽式设计', '导出代码', '支持自定义元素'],
  },
  {
    name: 'CSS3 Generator',
    category: 'layout',
    url: 'https://css3generator.com',
    desc: '生成CSS3动画、阴影等',
    features: ['支持多种CSS3效果', '复制代码', '简单易用'],
  },
  {
    name: 'Hover.css',
    category: 'animation',
    url: 'https://ianlunn.github.io/Hover',
    desc: '为元素添加鼠标悬停动画',
    features: ['支持多种动画效果', '轻松集成到项目', '自定义样式'],
  },
  {
    name: 'CSS Filters',
    category: 'layout',
    url: 'https://cssfilters.co',
    desc: 'CSS滤镜效果生成器',
    features: ['实时预览', '支持多种滤镜效果', '生成CSS代码'],
  },
  // 更多工具...
])

const colorTools = tools.value.filter((t) => t.category === 'color')
const animationTools = tools.value.filter((t) => t.category === 'animation')
const layoutTools = tools.value.filter((t) => t.category === 'layout')
</script>

<style lang="less" scoped>
.css-tools-doc {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
}

.doc-header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  color: #2563eb;
  font-size: 2.2rem;
  margin: 1rem 0;
  font-weight: 700;
  text-shadow: none;
}

.doc-content .tool-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #111827;
  font-size: 1.2rem;
  margin: 1.2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.icon {
  font-size: 1.3rem;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.doc-footer {
  margin-top: 2rem;
  text-align: center;
  padding: 1.2rem;
  background: #fff;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .css-tools-doc {
    padding: 1rem;
    margin: 1rem;
  }

  .tool-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
