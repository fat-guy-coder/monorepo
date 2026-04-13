<template>
  <div class="object-fit-guide">
    <h1 class="main-title">🎯 CSS object-fit & object-position</h1>

    <section>
      <h2>
        object-fit CSS 属性指定可替换元素（例如：&lt;img&gt; 或 &lt;video&gt;）的内容应该如何适应到其使用高度和宽度确定的框。
      </h2>
      <h2>
        object-position CSS 属性指定可替换元素（例如：&lt;img&gt; 或 &lt;video&gt;）的内容在对象容器中的对齐方式。
      </h2>
    </section>

    <!-- 核心概念 -->
    <section class="concept-section">
      <div class="container-section">
        <div class="container" :style="containerStyle">
          <img :src="imageSrc" @click="reload"
            :style="{ objectFit: activeType as any, objectPosition: `${objectPositionX} ${objectPositionY}` }"
            class="demo-image" />
        </div>
        <pre><code>.container{
  width: {{ containerWidth }}px;
  height: {{ containerHeight }}px;
}
img{
  object-fit: {{ activeType }};
  object-position: {{ objectPositionX }} {{ objectPositionY }};
}
</code></pre>
      </div>
      <div class="concept-card">
        <div class="visual-example">
          <h3>object-fit</h3>
          <div class="controls">
            <Select v-model="activeType" class="type-select">
              <option v-for="type in objectFitTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
            <div class="size-control">
              <label>容器尺寸width：</label>
              <a-input type="range" v-model:value="containerWidth" min="100" max="600" />
            </div>
            <div class="size-control">
              <label>容器尺寸height：</label>
              <a-input type="range" v-model:value="containerHeight" min="100" max="600" />
            </div>
          </div>
        </div>
        <div class="visual-example">
          <h3>object-position</h3>
          <div class="position-control">
            <label>X轴：</label>
            <a-input v-model:value="objectPositionX" />
          </div>
          <div class="position-control">
            <label>Y轴：</label>
            <a-input v-model:value="objectPositionY" />
          </div>
        </div>
      </div>
    </section>

    <!-- 属性基础介绍 -->
    <section class="property-section">
      <h2 class="section-title">🔧 属性值基础介绍</h2>
      <div class="property-grid">
        <div v-for="type in objectFitTypes" :key="type.value" class="property-card">
          <div class="card-header">
            <span class="type-tag">{{ type.label }}</span>
            <div class="example-container" :style="{ width: '200px', height: '150px' }">
              <img :src="imageSrc" :style="getStyle(type.value)" class="example-image" />
            </div>
          </div>
          <div class="card-content">
            <pre><code>object-fit: {{ type.value }};</code></pre>
            <div class="usage-section">
              <h4>使用场景</h4>
              <p>{{ type.usage }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用技巧 -->
    <section class="tips-section">
      <h2 class="section-title">💡 使用技巧与注意事项</h2>
      <div class="tip-grid">
        <div class="tip-card">
          <div class="icon">🎯</div>
          <h3>配合 object-position</h3>
          <pre><code>img {
  object-fit: cover;
  object-position: top center;
}</code></pre>
        </div>
        <div class="tip-card">
          <div class="icon">⚠️</div>
          <h3>容器尺寸限制</h3>
          <p>必须为容器元素设置明确的 width 和 height</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const imageSrc = ref('https://picsum.photos/400/300') // 随机示例图片

const containerWidth = ref(200)
const containerHeight = ref(150)
const activeType = ref('cover')

const getStyle = (fit: any) => ({
  objectFit: fit,
})

const reload = () => {
  const timestamp = new Date().getTime()
  imageSrc.value = 'https://picsum.photos/400/300?' + 't=' + timestamp
}

const objectFitTypes = [
  {
    value: 'fill',
    label: 'fill',
    usage: '拉伸填充容器（默认值）',
  },
  {
    value: 'contain',
    label: 'contain',
    usage: '保持比例完整显示，可能留白',
  },
  {
    value: 'cover',
    label: 'cover',
    usage: '保持比例填充容器，可能裁剪',
  },
  {
    value: 'none',
    label: 'none',
    usage: '保持原始尺寸，不进行缩放',
  },
  {
    value: 'scale-down',
    label: 'scale-down',
    usage: '在none和contain中选择较小尺寸',
  },
]

const objectPositionX = ref('50%')
const objectPositionY = ref('50%')

const containerStyle = computed(() => ({
  width: `${containerWidth.value}px`,
  height: `${containerHeight.value}px`,
}))
</script>

<style scoped>
h2,
h4,
p,
span,
select,
label,
li {
  color: #000;
}

.object-fit-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.section-title {
  color: #fff;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.concept-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.visual-example {
  border: 1px solid #667eea;
  padding: 1rem;
  border-radius: 5px;
  flex: 1;
}

.position-control {
  display: grid;
  grid-template-columns: 3rem 1fr;
}

.container-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.container {
  border: 2px dashed #667eea;
  margin: 1rem 0;
  overflow: hidden;
}

.demo-image {
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.type-select {
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-family: inherit;
}

.size-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input[type='range'] {
  flex: 1;
  height: 4px;
  background: #f0f0f0;
  -webkit-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.property-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  background: #f8f9fa;
}

.example-container {
  border: 2px solid #eee;
  margin: 1rem auto;
}

.example-image {
  width: 100%;
  height: 100%;
  object-fit: var(--object-fit);
}

.type-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
}

.tip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tip-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
}
</style>
