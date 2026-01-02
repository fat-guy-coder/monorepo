<template>
  <div class="mobile-adaptation-container">
    <header class="guide-header">
      <h1>移动端适配方案指南</h1>
      <p>构建完美响应式移动端体验</p>
    </header>

    <!-- 视口设置 -->
    <section class="adaptation-section">
      <h2 class="section-title">1. 视口元标签</h2>
      <div class="example-card">
        <div class="meta-preview">
          <span class="tag">&lt;meta</span>
          name="viewport" content="{{ viewportContent }}"
          <span class="tag">/&gt;</span>
        </div>
        <div class="viewport-controls">
          <label v-for="option in viewportOptions" :key="option.value">
            <input type="radio" v-model="viewportContent" :value="option.value" />
            {{ option.label }}
          </label>
        </div>
        <div class="notice">
          <span>✅ 推荐配置：</span>
          <code
            >width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,
            user-scalable=no</code
          >
        </div>
      </div>
    </section>

    <!-- 响应式布局方案 -->
    <section class="adaptation-section">
      <h2 class="section-title">2. 响应式布局方案</h2>
      <div class="layout-examples">
        <!-- REM 示例 -->
        <div class="example-card">
          <h3>REM 布局</h3>
          <div class="code-preview">
            <pre>
html { font-size: {{ remBase }}px; }
.box { 
  width: {{ remValue }}rem; 
  height: {{ remValue }}rem;
}</pre
            >
          </div>
          <div
            class="interactive-box"
            :style="{
              width: remValue + 'rem',
              height: remValue + 'rem',
              fontSize: remBase + 'px',
            }"
          >
            REM Box ({{ remValue }}rem)
          </div>
          <div class="controls">
            <input type="range" v-model="remBase" min="10" max="20" />
            <span>基准值：{{ remBase }}px</span>
          </div>
        </div>

        <!-- 媒体查询示例 -->
        <div class="example-card">
          <h3>媒体查询</h3>
          <div class="media-query-demo" :class="currentBreakpoint">
            <div class="mq-box" v-for="n in 3" :key="n"></div>
          </div>
          <div class="breakpoint-selector">
            <button
              v-for="bp in breakpoints"
              :key="bp"
              @click="currentBreakpoint = bp"
              :class="{ active: currentBreakpoint === bp }"
            >
              {{ bp }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 弹性布局方案 -->
    <section class="adaptation-section">
      <h2 class="section-title">3. 弹性布局方案</h2>
      <div class="layout-examples">
        <!-- Flexbox 示例 -->
        <div class="example-card">
          <h3>Flexbox 布局</h3>
          <div class="flex-container" :style="{ gap: flexGap + 'px' }">
            <div class="flex-item" v-for="n in flexCount" :key="n"></div>
          </div>
          <div class="controls">
            <input type="range" v-model="flexCount" min="3" max="8" />
            <span>项目数量：{{ flexCount }}</span>
          </div>
        </div>

        <!-- Grid 示例 -->
        <div class="example-card">
          <h3>CSS Grid 布局</h3>
          <div class="grid-container" :style="{ gridTemplateColumns: gridColumns }">
            <div class="grid-item" v-for="n in gridItems" :key="n"></div>
          </div>
          <div class="controls">
            <input
              type="range"
              v-model="gridColumns"
              :min="1"
              :max="4"
              :step="0.1"
              list="grid-presets"
            />
            <span>列宽：{{ gridColumns }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 其他适配方案 -->
    <section class="adaptation-section">
      <h2 class="section-title">4. 其他适配方案</h2>
      <div class="other-adaptations">
        <div class="adaptation-card">
          <h3>Viewport Units (vw/vh)</h3>
          <div class="viewport-box" :style="{ width: vwValue + 'vw' }">{{ vwValue }}vw 宽度</div>
          <input type="range" v-model="vwValue" min="10" max="100" />
        </div>

        <div class="adaptation-card">
          <h3>图片适配</h3>
          <div class="image-example">
            <img
              src="https://via.placeholder.com/300"
              srcset="https://via.placeholder.com/600 2x, https://via.placeholder.com/900 3x"
              sizes="(max-width: 480px) 100vw, 50vw"
            />
          </div>
          <pre>
&lt;img src="image.jpg"
  srcset="image-2x.jpg 2x,
          image-3x.jpg 3x"
  sizes="(max-width: 480px) 100vw, 50vw"&gt;</pre
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MobileAdaptationGuide',
  setup() {
    const viewportContent = ref('width=device-width, initial-scale=1.0')
    const viewportOptions = ref([
      { value: 'width=980', label: '固定宽度' },
      { value: 'width=device-width', label: '设备宽度' },
      { value: 'width=device-width, initial-scale=1.0', label: '推荐配置' },
    ])

    const remBase = ref(16)
    const remValue = ref(10)
    const currentBreakpoint = ref('mobile')
    const breakpoints = ref(['mobile', 'tablet', 'desktop'])

    const flexCount = ref(5)
    const flexGap = ref(10)
    const gridColumns = ref('repeat(3, 1fr)')
    const gridItems = ref(6)
    const vwValue = ref(50)

    return {
      viewportContent,
      viewportOptions,
      remBase,
      remValue,
      currentBreakpoint,
      breakpoints,
      flexCount,
      flexGap,
      gridColumns,
      gridItems,
      vwValue,
    }
  },
})
</script>

<style scoped>
h2 {
  color: #fff;
}
.mobile-adaptation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  border-radius: 12px;
}

.adaptation-section {
  margin: 3rem 0;
}

.example-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 1.5rem 0;
}

.meta-preview {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  color: #2c3e50;
}

.viewport-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.layout-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.interactive-box {
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  transition: all 0.3s ease;
}

.media-query-demo {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  transition: all 0.3s ease;

  &.mobile {
    grid-template-columns: 1fr;
  }
  &.tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  &.desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.mq-box {
  background: #42b983;
  height: 100px;
  border-radius: 8px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.flex-item {
  background: #e74c3c;
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.grid-container {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.grid-item {
  background: #9b59b6;
  height: 60px;
  border-radius: 4px;
}

.viewport-box {
  background: #f1c40f;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
  border-radius: 8px;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

input[type='range'] {
  flex: 1;
}

pre {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .mobile-adaptation-container {
    padding: 1rem;
  }

  .layout-examples {
    grid-template-columns: 1fr;
  }
}
</style>
