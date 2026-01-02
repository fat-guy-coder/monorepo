<template>
  <div class="box-model-container">
    <h1 class="gradient-title">CSS 盒模型</h1>

    <div class="model-selector">
      <button v-for="model in boxModels" :key="model" @click="selectedModel = model"
        :class="{ active: selectedModel === model }">
        {{ model }}
      </button>
    </div>

    <h3>当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS
      决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）（摘自mdn）</h3>

    <pre><code>box-sizing: {{ selectedModel.toLowerCase() }}-box;</code></pre>

    <div class="content-section">
      <div class="model-visualization">
        <div class="box-demo" :class="[selectedModel.toLowerCase()]" :style="demoStyles">
          <div class="content-box">
            <span class="size-display">{{ contentSize }}</span>
            Content
          </div>
        </div>
      </div>

      <div class="model-details">
        <h2>{{ selectedModel }} 模型</h2>
        <div class="detail-card">
          <!-- <prism language="css">{{ cssCodeSample }}</prism> -->
          <div class="properties-list">
            <div v-for="prop in currentProperties" :key="prop.name" class="property-item">
              <span class="prop-name">{{ prop.name }}</span>
              <span class="prop-desc">{{ prop.description }}</span>
            </div>
          </div>
          <div class="calculation-formula">
            <h3>尺寸计算公式</h3>
            <p v-html="currentFormula"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="comparison-card">
        <h3>标准盒模型 (content-box)</h3>
        <ul>
          <li>元素宽度 = content width</li>
          <li>总宽度 = width + padding + border</li>
          <li>默认的盒模型模式</li>
        </ul>
      </div>

      <div class="comparison-card">
        <h3>替代盒模型 (border-box)</h3>
        <ul>
          <li>元素宽度 = content + padding + border</li>
          <li>总宽度 = 设定的width值</li>
          <li>更直观的尺寸控制</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import Prism from 'vue-prism-component'
// import 'prismjs/themes/prism-tomorrow.css'

type BoxModel = 'Content' | 'Border'

const boxModels: BoxModel[] = ['Content', 'Border']
const selectedModel = ref<BoxModel>('Content')

const demoStyles = computed(() => ({
  width: selectedModel.value === 'Content' ? '300px' : '300px',
  padding: '20px',
  border: '15px solid #e74c3c',
}))

const contentSize = computed(() =>
  selectedModel.value === 'Content' ? '300px' : '230px\n(300 - 20*2 - 15*2)',
)

const currentProperties = computed(() =>
  selectedModel.value === 'Content'
    ? [
      { name: 'width', description: '仅定义内容区域宽度' },
      { name: 'padding', description: '增加元素总宽度' },
      { name: 'border', description: '增加元素总宽度' },
    ]
    : [
      { name: 'width', description: '包含内容+内边距+边框' },
      { name: 'padding', description: '不改变总元素宽度' },
      { name: 'border', description: '不改变总元素宽度' },
    ],
)

const currentFormula = computed(() =>
  selectedModel.value === 'Content'
    ? '总宽度 = <span>width</span> + padding-left/right + border-left/right'
    : '总宽度 = <span>width</span> (包含内容 + padding + border)',
)

const cssCodeSample = computed(
  () =>
    `.element {
  box-sizing: ${selectedModel.value.toLowerCase()}-box;
  width: 300px;
  padding: 20px;
  border: 15px solid;
}`,
)
</script>

<style scoped>
h2,
h3,
li,
p,
button {
  color: #000;
}

.box-model-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui;
}

.calculation-formula {
  background-color: #fff;
}

/* .calculation-formula h3,
span,
p {
  color: #fff;
} */

.gradient-title {
  background: linear-gradient(135deg, #3498db, #8e44ad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.model-selector {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.model-selector button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.model-selector button.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.model-visualization {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.box-demo {
  position: relative;
  background: #fff;
  margin: 1rem auto;
  transition: all 0.3s ease;
}

.box-demo.content-box {
  box-sizing: content-box;
}

.box-demo.border-box {
  box-sizing: border-box;
}

.content-box {
  height: 150px;
  background: #3498db22;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  color: #2c3e50;
  border: 2px dashed #3498db;
}

.size-display {
  font-size: 0.9em;
  color: #e74c3c;
  white-space: pre;
}

.model-details {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.detail-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.properties-list {
  margin: 1.5rem 0;
}

.property-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.prop-name {
  color: #3498db;
  font-weight: 600;
}

.calculation-formula {

  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.hl {
  color: #f1c40f;
  font-weight: bold;
}

.comparison-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.comparison-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-5px);
}

.comparison-card h3 {
  color: #3498db;
  margin-bottom: 1rem;
}

.comparison-card ul {
  list-style: none;
  padding-left: 1rem;
}

.comparison-card li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
}

.comparison-card li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: #e74c3c;
}
</style>
