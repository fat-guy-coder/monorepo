<template>
  <div class="unit-container">
    <!-- 导航目录 -->
    <nav class="sidebar">
      <h2>📏 目录</h2>
      <ul>
        <li v-for="(category, index) in categories" :key="index" @click="scrollTo(category.id)" class="nav-item">
          {{ category.title }}
        </li>
      </ul>
    </nav>

    <!-- 内容区域 -->
    <main class="content">
      <!-- 绝对单位 -->
      <section id="absolute" class="section-card">
        <h2>1. 绝对单位</h2>
        <div class="unit-grid">
          <div v-for="unit in absoluteUnits" :key="unit.name" class="unit-card">
            <div class="unit-header">
              <span class="unit-name">{{ unit.name }}</span>
              <span class="unit-type">{{ unit.type }}</span>
            </div>
            <div class="unit-example" :style="unit.style">
              {{ unit.example }}
            </div>
            <p class="unit-desc">{{ unit.description }}</p>
            <p class="unit-usage">{{ unit.usage }}</p>
            <p class="unit-pros">{{ unit.pros }}</p>
            <p class="unit-cons">{{ unit.cons }}</p>
          </div>
        </div>
      </section>

      <!-- 相对单位 -->
      <section id="relative" class="section-card">
        <h2>2. 相对单位</h2>
        <div class="controls">
          <div class="control-group">
            <label>基准字体大小： <input type="number" v-model.number="baseFontSize" />px </label>
            <button @click="resetBaseSize" class="reset-btn">重置</button>
          </div>
        </div>
        <div class="unit-grid">
          <div v-for="unit in relativeUnits" :key="unit.name" class="unit-card">
            <div class="unit-header">
              <span class="unit-name">{{ unit.name }}</span>
              <span class="unit-type">{{ unit.type }}</span>
            </div>
            <div class="unit-example" :style="{
              fontSize: baseFontSize + 'px',
              width: unit.width,
            }">
              <div class="inner-box" :style="unit.style">
                {{ unit.example }}
              </div>
            </div>
            <p class="unit-desc">{{ unit.description }}</p>
            <p class="unit-usage">{{ unit.usage }}</p>
            <p class="unit-pros">{{ unit.pros }}</p>
            <p class="unit-cons">{{ unit.cons }}</p>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section id="notice" class="section-card">
        <h2>⚠️ 注意事项</h2>
        <ul class="notice-list">
          <li>em单位会继承父级字体大小</li>
          <li>rem基于根元素(html)字体大小</li>
          <li>视口单位在移动端可能有意外表现</li>
          <li>ch单位基于当前字体0字符宽度</li>
          <li>百分比单位需要明确父级尺寸</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 基准字体控制
const baseFontSize = ref(16)
const resetBaseSize = () => (baseFontSize.value = 16)

// 单位数据
const absoluteUnits = reactive([
  {
    name: 'px',
    type: '像素',
    description: '1px = 1/96英寸',
    style: { width: '100px' },
    example: '100px',
    usage: '常用于精确控制元素尺寸。',
    pros: '简单直观，兼容性好。',
    cons: '在响应式设计中不灵活。',
  },
  {
    name: 'cm',
    type: '厘米',
    description: '1cm = 37.8px',
    style: { width: '1cm' },
    example: '1cm',
    usage: '常用于打印样式。',
    pros: '适合打印，单位直观。',
    cons: '在屏幕上使用不常见。',
  },
  {
    name: 'mm',
    type: '毫米',
    description: '1mm = 1/10cm',
    style: { width: '10mm' },
    example: '10mm',
    usage: '常用于打印样式。',
    pros: '适合打印，单位直观。',
    cons: '在屏幕上使用不常见。',
  },
  {
    name: 'in',
    type: '英寸',
    description: '1in = 96px',
    style: { width: '1in' },
    example: '1in',
    usage: '常用于打印样式。',
    pros: '适合打印，单位直观。',
    cons: '在屏幕上使用不常见。',
  },
  {
    name: 'pt',
    type: '点',
    description: '1pt = 1/72in',
    style: { width: '72pt' },
    example: '72pt',
    usage: '常用于字体大小。',
    pros: '适合打印，单位直观。',
    cons: '在屏幕上使用不常见。',
  },
  {
    name: 'pc',
    type: '派卡',
    description: '1pc = 12pt',
    style: { width: '6pc' },
    example: '6pc',
    usage: '常用于字体大小。',
    pros: '适合打印，单位直观。',
    cons: '在屏幕上使用不常见。',
  },
])

const relativeUnits = reactive([
  {
    name: 'em',
    type: '相对字体',
    description: '基于当前元素字体大小',
    width: '200px',
    style: { width: '10em' },
    example: '10em',
    usage: '常用于字体大小和间距。',
    pros: '相对单位，适应性强。',
    cons: '容易受到父元素影响。',
  },
  {
    name: 'rem',
    type: '根字体',
    description: '基于根元素字体大小',
    width: '200px',
    style: { width: '10rem' },
    example: '10rem',
    usage: '常用于字体大小和间距。',
    pros: '相对单位，适应性强。',
    cons: '依赖根元素字体大小。',
  },
  {
    name: '%',
    type: '百分比',
    description: '相对于父元素尺寸',
    width: '200px',
    style: { width: '50%' },
    example: '50%',
    usage: '常用于宽度和高度。',
    pros: '相对单位，适应性强。',
    cons: '依赖父元素尺寸。',
  },
  {
    name: 'vw',
    type: '视口宽度',
    description: '1vw = 1%视口宽度',
    width: '50vw',
    style: { width: '50vw' },
    example: '50vw',
    usage: '常用于响应式设计。',
    pros: '相对单位，适应性强。',
    cons: '在移动端可能有意外表现。',
  },
  {
    name: 'vh',
    type: '视口高度',
    description: '1vh = 1%视口高度',
    width: '30vh',
    style: { height: '30vh' },
    example: '30vh',
    usage: '常用于响应式设计。',
    pros: '相对单位，适应性强。',
    cons: '在移动端可能有意外表现。',
  },
  {
    name: 'vmin',
    type: '视口最小值',
    description: '1vmin = 视口宽度和高度的最小值',
    width: '20vmin',
    style: { width: '20vmin', height: '20vmin' },
    example: '20vmin',
    usage: '常用于响应式设计。',
    pros: '相对单位，适应性强。',
    cons: '在移动端可能有意外表现。',
  },
  {
    name: 'vmax',
    type: '视口最大值',
    description: '1vmax = 视口宽度和高度的最大值',
    width: '20vmax',
    style: { width: '20vmax', height: '20vmax' },
    example: '20vmax',
    usage: '常用于响应式设计。',
    pros: '相对单位，适应性强。',
    cons: '在移动端可能有意外表现。',
  },
  {
    name: 'ch',
    type: '字符单位',
    description: '基于当前字体0字符宽度',
    width: '20ch',
    style: { width: '20ch' },
    example: '20ch',
    usage: '常用于设置输入框宽度。',
    pros: '相对单位，适应性强。',
    cons: '依赖字体。',
  },
  {
    name: 'ex',
    type: 'x高度',
    description: '基于当前字体x字符高度',
    width: '10ex',
    style: { height: '10ex' },
    example: '10ex',
    usage: '常用于设置元素高度。',
    pros: '相对单位，适应性强。',
    cons: '依赖字体。',
  },
])

// 导航配置
const categories = [
  { id: 'absolute', title: '绝对单位' },
  { id: 'relative', title: '相对单位' },
  { id: 'viewport', title: '视口单位' },
  { id: 'notice', title: '注意事项' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.unit-container {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.sidebar {
  position: sticky;
  top: 2rem;
  align-self: start;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.sidebar h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-item {
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.content {
  padding: 0;
}

.section-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.section-card h2 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.unit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.unit-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
}

.unit-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.unit-name {
  font-weight: bold;
  color: #2563eb;
}

.unit-type {
  font-size: 0.9em;
  color: #64748b;
}

.unit-desc,
.unit-usage,
.unit-pros,
.unit-cons {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0.4rem 0;
}

.unit-example {
  height: 50px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
  border-radius: 4px;
}

.inner-box {
  background: rgba(59, 130, 246, 0.1);
  border: 1px dashed rgba(59, 130, 246, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.controls {
  margin: 1.5rem 0 1rem;
}

.control-group {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

input[type='number'] {
  width: 70px;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.reset-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-btn:hover {
  background: #dc2626;
}

.notice-list {
  list-style: none;
  padding-left: 0;
}

.notice-list li {
  padding: 0.5rem 0 0.5rem 1.2rem;
  position: relative;
}

.notice-list li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
  top: 0.5rem;
}

@media (max-width: 768px) {
  .unit-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>
