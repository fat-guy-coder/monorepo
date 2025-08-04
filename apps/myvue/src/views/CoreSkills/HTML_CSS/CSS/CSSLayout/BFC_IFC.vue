<template>
  <div class="formatting-context">
    <h1 class="main-title">CSS格式化上下文</h1>

    <div class="context-nav">
      <button v-for="ctx in contexts" :key="ctx.id" @click="selectedCtx = ctx.id"
        :class="['nav-btn', { active: selectedCtx === ctx.id }]" :style="{ '--theme-color': ctx.color }">
        {{ ctx.name }}
      </button>
    </div>

    <div class="content-container">
      <!-- 可视化演示区域 -->
      <div class="visual-demo" :style="demoStyles">
        <div v-for="(item, index) in currentDemo.items" :key="index" :class="['demo-item', item.class]"
          :style="item.style">
          {{ item.text }}
        </div>
      </div>

      <!-- 详细信息区域 -->
      <div class="info-section">
        <h2 class="context-title" :style="{ color: currentCtx.color }">
          {{ currentCtx.name }}（{{ currentCtx.acronym }}）
        </h2>

        <div class="info-grid">
          <div class="info-card definition">
            <h3>🎯 基本定义</h3>
            <p>{{ currentCtx.definition }}</p>
          </div>

          <div class="info-card creation">
            <h3>🛠️ 创建方式</h3>
            <ul>
              <li v-for="(method, idx) in currentCtx.creationMethods" :key="idx">
                <code>{{ method }}</code>
              </li>
            </ul>
          </div>

          <div class="info-card features">
            <h3>✨ 特性表现</h3>
            <ul>
              <li v-for="(feature, idx) in currentCtx.features" :key="idx">
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="info-card code-sample">
            <h3>💻 代码示例</h3>
            <pre><code>{{ currentCtx.codeSample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type ContextType = 'bfc' | 'ifc' | 'gfc' | 'ffc'

interface ContextConfig {
  id: ContextType
  name: string
  acronym: string
  color: string
  definition: string
  creationMethods: string[]
  features: string[]
  codeSample: string
  demo: {
    items: Array<{
      class?: string
      style?: Record<string, string>
      text: string
    }>
    containerStyle?: Record<string, string>
  }
}

const contexts: ContextConfig[] = [
  {
    id: 'bfc',
    name: '块级格式化上下文',
    acronym: 'BFC',
    color: '#3498db',
    definition: '独立的渲染区域，内部元素的布局不会影响外部元素',
    creationMethods: [
      'float: left/right',
      'position: absolute/fixed',
      'display: flow-root',
      'overflow: hidden/auto/scroll',
    ],
    features: ['垂直方向排列元素', '阻止外边距折叠', '包含内部浮动', '隔离外部浮动'],
    codeSample: `.container {
  overflow: hidden;
  display: flow-root;
}`,
    demo: {
      containerStyle: { display: 'block', overflow: 'hidden' },
      items: [
        { class: 'float-left', text: '浮动元素', style: { float: 'left' } },
        { text: 'BFC内容', style: { backgroundColor: 'rgba(52,152,219,0.2)' } },
      ],
    },
  },
  {
    id: 'ifc',
    name: '行内格式化上下文',
    acronym: 'IFC',
    color: '#2ecc71',
    definition: '行内级盒子参与的上下文，决定行内元素的水平排列方式',
    creationMethods: ['display: inline/inline-block', '包含行内级元素的块容器'],
    features: ['水平方向排列元素', '受vertical-align影响', '可能产生行框盒子', '支持基线对齐'],
    codeSample: `span {
  display: inline-block;
  vertical-align: middle;
}`,
    demo: {
      containerStyle: { fontSize: '0' }, // 消除inline-block间隙
      items: [
        { text: '文本', style: { display: 'inline-block', width: '80px' } },
        {
          text: '元素',
          style: {
            display: 'inline-block',
            verticalAlign: 'text-top',
            width: '100px',
          },
        },
      ],
    },
  },
  {
    id: 'gfc',
    name: '网格格式化上下文',
    acronym: 'GFC',
    color: '#9b59b6',
    definition: '使用网格布局创建的二维布局上下文',
    creationMethods: ['display: grid/inline-grid'],
    features: ['二维布局能力', '精确行列控制', '轨道尺寸定义', '网格线命名'],
    codeSample: `.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}`,
    demo: {
      containerStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
      },
      items: [
        { text: '网格项1', style: { gridColumn: '1/2' } },
        { text: '网格项2', style: { gridColumn: '2/3' } },
      ],
    },
  },
  {
    id: 'ffc',
    name: '弹性格式化上下文',
    acronym: 'FFC',
    color: '#e67e22',
    definition: '使用弹性盒布局创建的一维布局上下文',
    creationMethods: ['display: flex/inline-flex'],
    features: ['单方向布局', '弹性伸缩项目', '对齐控制', '顺序控制'],
    codeSample: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
    demo: {
      containerStyle: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      items: [
        { text: '弹性项1', style: { flex: '1' } },
        { text: '弹性项2', style: { flex: '2' } },
      ],
    },
  },
]

const selectedCtx = ref<ContextType>('bfc')

const currentCtx = computed(() => contexts.find((ctx) => ctx.id === selectedCtx.value)!)

const demoStyles = computed(() => ({
  backgroundColor: `${currentCtx.value.color}10`,
  border: `2px dashed ${currentCtx.value.color}`,
  ...currentCtx.value.demo.containerStyle,
}))

const currentDemo = computed(() => currentCtx.value.demo)
</script>

<style scoped>
h2,
h3,
li,
p,
div,
button {
  color: #000;
}

.formatting-context {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
}

.main-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #9b59b6, #e67e22);
  margin: 1rem auto;
}

.context-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--theme-color);
  border-radius: 8px;
  background: white;
  color: var(--theme-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn.active {
  background: var(--theme-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px var(--theme-color) 40;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.visual-demo {
  min-height: 400px;
  padding: 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.demo-item {
  background: white;
  padding: 1rem;
  margin: 5px;
  color: #000;
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.demo-item:hover {
  transform: scale(1.05);
}

.info-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.context-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.2rem;
  border-radius: 6px;
}

.info-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: currentColor;
}

code,
pre {
  font-family: Monaco, Consolas, monospace;
  background: #2c3e50;
  color: white;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

pre {
  padding: 1rem;
  overflow-x: auto;
  white-space: pre-wrap;
}

ul {
  list-style: none;
  padding-left: 1.2rem;
}

li {
  position: relative;
  margin-bottom: 0.8rem;
  padding-left: 1.5em;
}

li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: currentColor;
}

.float-left {
  float: left;
  width: 30% !important;
  height: 80px;
}
</style>
