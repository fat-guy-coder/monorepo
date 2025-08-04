<template>
  <div class="filter-container">
    <h1 class="main-title">CSS Filter 视觉魔法</h1>


    <h3>CSS Filter 是一种强大的图像处理工具，可以通过调整图像的视觉效果来增强用户体验。它允许开发者应用模糊、亮度、对比度、饱和度等多种效果，甚至可以实现复杂的视觉效果组合。使用 CSS
      Filter，您可以轻松创建动态和吸引人的用户界面。</h3>

    <div class="code-section">
      <pre class="code-block"><code>.filtered-image {
  filter: {{ currentFilter }};
}</code></pre>
    </div>

    <div class="controls-section">
      <div class="control-group">
        <h2 class="control-title">基础滤镜</h2>
        <div class="sliders-grid">
          <div v-for="filter in filters" :key="filter.name" class="slider-item">
            <label>{{ filter.label }}</label>
            <input type="range" :min="filter.min" :max="filter.max" :step="filter.step"
              v-model="filterValues[filter.name]" class="styled-slider" :style="{ '--track-color': filter.color }" />
            <span>{{ filterValues[filter.name] }}{{ filter.unit }}</span>
          </div>
        </div>
      </div>

      <div class="control-group">
        <h2 class="control-title">预设效果</h2>
        <div class="preset-buttons">
          <button v-for="preset in filterPresets" :key="preset.name" @click="applyPreset(preset)">
            {{ preset.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <div class="image-container" :style="filterStyle">
        <img src="https://picsum.photos/600/400" alt="Demo Image" />
        <div class="filter-overlay"></div>
      </div>
    </div>

    <div class="instruction-section">
      <div class="instruction-card">
        <h3>✨ 核心特性</h3>
        <ul>
          <li>实时像素处理</li>
          <li>支持多重滤镜叠加</li>
          <li><b>硬件加速优化</b></li>
          <li><b>支持动画过渡</b></li>
        </ul>
      </div>

      <div class="instruction-card">
        <h3>📝 使用注意</h3>
        <ul>
          <li><b>影响渲染性能</b></li>
          <li>部分浏览器支持有限</li>
          <li>叠加顺序影响效果</li>
          <li>与blend-mode配合使用</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

type Filter = {
  name: string
  label: string
  unit: string
  min: number
  max: number
  step: number
  color: string
}

const filters: Filter[] = [
  { name: 'blur', label: '模糊(blur)', unit: 'px', min: 0, max: 20, step: 1, color: '#3498db' },
  { name: 'brightness', label: '亮度(brightness)', unit: '%', min: 0, max: 200, step: 1, color: '#f1c40f' },
  { name: 'contrast', label: '对比度(contrast)', unit: '%', min: 0, max: 200, step: 1, color: '#2ecc71' },
  { name: 'saturate', label: '饱和度(saturate)', unit: '%', min: 0, max: 200, step: 1, color: '#e74c3c' },
  { name: 'hue', label: '色相旋转(hue-rotate)', unit: 'deg', min: 0, max: 360, step: 1, color: '#9b59b6' },
  { name: 'grayscale', label: '灰度(grayscale)', unit: '%', min: 0, max: 100, step: 1, color: '#95a5a6' },
]

const filterPresets = [
  {
    name: '复古',
    values: {
      blur: 2,
      brightness: 90,
      contrast: 110,
      saturate: 80,
      hue: 30,
      grayscale: 20,
    },
  },
  {
    name: '深褐',
    values: {
      blur: 0,
      brightness: 85,
      contrast: 120,
      saturate: 120,
      hue: 180,
      grayscale: 50,
    },
  },
  {
    name: '冷色调',
    values: {
      blur: 1,
      brightness: 95,
      contrast: 105,
      saturate: 150,
      hue: 200,
      grayscale: 0,
    },
  },
]

const filterValues = reactive<Record<string, number>>({
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hue: 0,
  grayscale: 0,
})

const filterStyle = computed(() => ({
  filter: `
    blur(${filterValues.blur}px)
    brightness(${filterValues.brightness}%)
    contrast(${filterValues.contrast}%)
    saturate(${filterValues.saturate}%)
    hue-rotate(${filterValues.hue}deg)
    grayscale(${filterValues.grayscale}%)
  `.replace(/\s+/g, ' '),
}))

const currentFilter = computed(() => filterStyle.value.filter.replace(/;/g, ';\n  '))

const applyPreset = (preset: { values: Record<string, number> }) => {
  Object.assign(filterValues, preset.values)
}
</script>

<style scoped>
h2,
h3,
li,
p,
div,
label,
code,
span {
  color: #000;
}

.filter-container {
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
  background: linear-gradient(90deg, #3498db, #f1c40f);
  margin: 1rem auto;
}

.controls-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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
  font-size: 1.2em;
}

.sliders-grid {
  display: grid;
  gap: 1.2rem;
}

.slider-item {
  display: grid;
  grid-template-columns: 1fr 2fr 60px;
  align-items: center;
  gap: 1rem;
}

.styled-slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
}

.styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--track-color);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.styled-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.preset-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.8rem;
}

button {
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.demo-section {
  margin: 2rem 0;
}

.image-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: auto;
  display: block;
}

.filter-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  mix-blend-mode: multiply;
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.1), rgba(241, 196, 15, 0.1));
}

.code-section {
  background: #2c3e50;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.code-block code {
  color: white;
  font-family: Monaco, monospace;
  white-space: pre-wrap;
}

.instruction-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.instruction-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.instruction-card h3 {
  color: #3498db;
  margin-top: 0;
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
  content: '•';
  position: absolute;
  left: 0;
  color: #f1c40f;
}
</style>
