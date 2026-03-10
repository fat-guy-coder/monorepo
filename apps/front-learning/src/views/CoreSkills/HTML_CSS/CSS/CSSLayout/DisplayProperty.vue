<template>
  <div class="display-container">
    <h1 class="main-title">CSS Display属性基础介绍</h1>

    <h2>什么是 Display 属性？</h2>
    <p>
      Display 属性是 CSS 中的一个重要属性，用于控制元素的显示方式。它决定了元素在页面中的布局方式，包括块级、行内、行内块级等。
    </p>

    <h2>Display 属性的值</h2>


    <div class="type-selector">
      <button v-for="type in displayTypes" :key="type.name" @click="selectedType = type.name"
        :class="{ active: selectedType === type.name }" :style="{ '--type-color': type.color }">
        {{ type.name }}
      </button>
    </div>

    <div class="content-wrapper">
      <!-- 示例展示区域 -->
      <div class="demo-area">
        <div class="demo-container" :style="currentType.demoStyle">
          <div v-for="n in itemCount" :key="n" class="demo-item" :style="currentType.itemStyle">
            Item {{ n }}
          </div>
        </div>
      </div>

      <!-- 详细信息区域 -->
      <div class="info-section">
        <div class="info-card">
          <h2 :style="{ color: currentType.color }">{{ currentType.name }}</h2>
          <p class="type-description">{{ currentType.description }}</p>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h3>📝 典型用法</h3>
            <pre><code>{{ currentType.exampleCode }}</code></pre>
          </div>

          <div class="info-card">
            <h3>✨ 主要特性</h3>
            <ul>
              <li v-for="(feature, idx) in currentType.features" :key="idx">
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="info-card">
            <h3>🎯 使用场景</h3>
            <ul>
              <li v-for="(scene, idx) in currentType.useCases" :key="idx">
                {{ scene }}
              </li>
            </ul>
          </div>
          <div class="info-card">
            <h3>⚠️ 注意事项</h3>
            <ul>
              <li v-for="(note, idx) in currentType.notes" :key="idx">
                {{ note }}
              </li>
              <li>
                <strong>display: none</strong>
                隐藏元素且不占据文档流空间，元素完全从页面上消失，常用于条件隐藏元素或动态显示内容。注意：会影响SEO和可访问性。
              </li>
              <li>
                <strong>visibility: hidden</strong>
                隐藏元素但仍占据文档流空间，元素不可见但仍保留其位置和大小，常用于需要保留布局的隐藏元素。注意：不会影响SEO和可访问性。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DisplayType {
  name: string
  description: string
  color: string
  exampleCode: string
  features: string[]
  useCases: string[]
  notes: string[]
  demoStyle: Record<string, string>
  itemStyle?: Record<string, string>
}

const displayTypes: DisplayType[] = [
  {
    name: 'block',
    color: '#3498db',
    description: '块级元素，占据全部可用宽度，默认换行显示',
    exampleCode: '.element {\n  display: block;\n}',
    features: ['独占一行', '可设置宽高', '默认宽度100%', '垂直方向排列'],
    useCases: ['页面主要结构容器', '需要独占一行的元素', '控制元素宽高'],
    notes: ['margin/padding会正常生效', '默认宽度为父元素宽度'],
    demoStyle: { display: 'block' },
    itemStyle: { display: 'block', margin: '10px 0' },
  },
  {
    name: 'inline',
    color: '#2ecc71',
    description: '行内元素，不独占一行，尺寸由内容决定',
    exampleCode: '.element {\n  display: inline;\n}',
    features: ['水平方向排列', '不可设置宽高', '只接受水平方向的padding/margin', '默认内容宽度'],
    useCases: ['文本内元素', '装饰性元素', '不需要换行的内容'],
    notes: ['设置宽高无效', '垂直margin无效'],
    demoStyle: { display: 'inline' },
    itemStyle: { display: 'inline', padding: '0 5px' },
  },
  {
    name: 'inline-block',
    color: '#e67e22',
    description: '行内块元素，兼具行内和块级元素特性',
    exampleCode: '.element {\n  display: inline-block;\n}',
    features: ['水平方向排列', '可设置宽高', '保留行内特性', '不会强制换行'],
    useCases: ['需要水平排列的可控元素', '导航菜单项', '图标与文字混排'],
    notes: ['元素间默认有间隙', 'vertical-align属性有效'],
    demoStyle: { display: 'inline-block' },
    itemStyle: {
      display: 'inline-block',
      width: '100px',
      margin: '0 5px',
      verticalAlign: 'middle',
    },
  },
  {
    name: 'flex',
    color: '#9b59b6',
    description: '弹性布局容器，提供高效的一维布局方案',
    exampleCode: `.container {
  display: flex;
  justify-content: space-between;
}`,
    features: ['弹性子元素排列', '主轴/交叉轴控制', '响应式布局', '对齐方式灵活'],
    useCases: ['复杂页面布局', '居中排列元素', '自适应空间分配'],
    notes: ['会创建新的格式化上下文', '子元素的float/clear失效'],
    demoStyle: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      minHeight: '150px',
    },
    itemStyle: { flex: 'none' },
  },
  {
    name: 'grid',
    color: '#e74c3c',
    description: '网格布局容器，强大的二维布局系统',
    exampleCode: `.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}`,
    features: ['二维布局能力', '精确行列控制', '响应式网格', '项目自由定位'],
    useCases: ['复杂网格布局', '卡片式布局', '精确对齐需求'],
    notes: ['需要现代浏览器支持', '创建新的格式化上下文'],
    demoStyle: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
    },
  },
  {
    name: 'none',
    color: '#95a5a6',
    description: '隐藏元素，不占据文档流空间',
    exampleCode: '.element {\n  display: none;\n}',
    features: ['完全隐藏元素', '不占据布局空间', '不可访问性', '影响渲染性能'],
    useCases: ['条件隐藏元素', '动态显示内容', '替代visibility属性'],
    notes: ['与visibility: hidden不同', '影响SEO和可访问性'],
    demoStyle: { display: 'none' },
  },
]

const selectedType = ref(displayTypes[0].name)
const itemCount = ref(4)

const currentType = computed(() => displayTypes.find((t) => t.name === selectedType.value)!)
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

.display-container {
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
  background: linear-gradient(90deg, #3498db, #2ecc71, #e67e22, #9b59b6);
  margin: 1rem auto;
}

.type-selector {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.type-selector button {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--type-color);
  border-radius: 8px;
  background: white;
  color: var(--type-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-selector button.active {
  background: var(--type-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px var(--type-color) 40;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.demo-area {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  min-height: 400px;
}

.demo-container {
  background: white;
  padding: 1.5rem;
  border: 2px dashed currentColor;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.demo-item {
  background: rgba(52, 152, 219, 0.1);
  border: 2px solid #3498db;
  padding: 1rem;
  text-align: center;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.demo-item:hover {
  transform: scale(1.05);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

pre {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: Monaco, monospace;
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

.type-description {
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1.1em;
}

.show-card {
  background: white;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
