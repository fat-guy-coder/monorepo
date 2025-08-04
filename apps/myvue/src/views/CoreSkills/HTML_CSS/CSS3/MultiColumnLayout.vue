<template>
  <div class="multi-column-container">
    <h1 class="main-title">CSS多列布局交互指南</h1>

    <!-- 代码展示 -->
    <div class="code-preview">
      <pre><code>.multi-column {
  column-count: {{ columnOptions.count }};
  column-width: {{ columnOptions.width }};
  column-gap: {{ columnOptions.gap }}px;
  column-rule: {{ columnOptions.ruleWidth }}px {{ columnOptions.ruleStyle }} {{ columnOptions.ruleColor }};
}</code></pre>
    </div>
    <div class="controls-section">
      <div class="control-group">
        <h2 class="control-title">布局属性</h2>

        <div class="control-item">
          <h3>列数 (column-count)</h3>
          <div class="button-group">
            <button
              v-for="n in columnCountOptions"
              :key="n"
              @click="columnOptions.count = n"
              :class="{ active: columnOptions.count === n }"
            >
              {{ n }}列
            </button>
          </div>
        </div>

        <div class="control-item">
          <h3>列宽 (column-width)</h3>
          <div class="button-group">
            <button
              v-for="width in columnWidthOptions"
              :key="width.value"
              @click="columnOptions.width = width.value"
              :class="{ active: columnOptions.width === width.value }"
            >
              {{ width.label }}
            </button>
          </div>
        </div>

        <div class="control-item">
          <h3>间距 (column-gap)</h3>
          <div class="slider-container">
            <input type="range" min="0" max="60" v-model="columnOptions.gap" class="gap-slider" />
            <span>{{ columnOptions.gap }}px</span>
          </div>
        </div>

        <div class="control-item">
          <h3>分隔线 (column-rule)</h3>
          <div class="button-group">
            <button
              v-for="style in ruleStyleOptions"
              :key="style"
              @click="columnOptions.ruleStyle = style"
              :class="{ active: columnOptions.ruleStyle === style }"
            >
              {{ style }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 演示区域 -->
    <div
      class="content-demo"
      :style="{
        columnCount: columnOptions.count,
        columnWidth: columnOptions.width,
        columnGap: `${columnOptions.gap}px`,
        columnRule: `${columnOptions.ruleWidth}px ${columnOptions.ruleStyle} ${columnOptions.ruleColor}`,
      }"
    >
      <p v-for="(para, index) in demoContent" :key="index">{{ para }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const columnOptions = reactive({
  count: 3,
  width: 'auto',
  gap: 20,
  ruleWidth: 2,
  ruleStyle: 'solid',
  ruleColor: '#3498db',
})

const columnCountOptions = [2, 3, 4, 5]
const columnWidthOptions = [
  { label: '自动', value: 'auto' },
  { label: '200px', value: '200px' },
  { label: '300px', value: '300px' },
]
const ruleStyleOptions = ['none', 'solid', 'dotted', 'dashed']

const demoContent = [
  'CSS多列布局（Multi-column Layout）允许开发人员轻松创建类似报纸的多列文本布局。通过简单的CSS属性即可实现复杂的文本流动效果，无需复杂的布局计算。',
  '该布局方式特别适用于长文本内容的展示，可以自动平衡各列的内容高度。浏览器会自动将内容分配到各列中，并根据容器尺寸自动调整列数。',
  '主要属性包括column-count（列数）、column-width（列宽）、column-gap（列间距）和column-rule（列间分隔线）。这些属性可以单独使用，也可以组合使用以实现响应式布局效果。',
  '多列布局与Flexbox和Grid布局形成互补，Flexbox适合一维布局，Grid适合二维布局，而多列布局则专注于文本内容的多列流动展示。合理运用这三种布局方式可以应对各种复杂的网页布局需求。',
]
</script>

<style scoped>
.multi-column-container {
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
  background: linear-gradient(90deg, #3498db, #9b59b6);
  margin: 1rem auto;
}

.controls-section {
  margin-bottom: 2rem;
}

.control-group {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-title {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.3em;
}

.control-item {
  margin-bottom: 1.5rem;
}

.control-item h3 {
  color: #7f8c8d;
  margin: 0 0 0.8rem;
  font-size: 0.95em;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: 2px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.gap-slider {
  width: 200px;
  margin-right: 1rem;
}

.content-demo {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  line-height: 1.8;
  color: #34495e;
  text-align: justify;
}

.content-demo p {
  margin-bottom: 1.2em;
}

.code-preview {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 12px;
  font-family: Monaco, monospace;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>
