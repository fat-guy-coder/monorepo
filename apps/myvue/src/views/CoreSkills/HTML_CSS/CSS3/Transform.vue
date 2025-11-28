<template>
  <div class="transform-container">
    <h1 class="main-title">CSS Transform 变换魔法</h1>

    <h3>
      CSS Transform 是一种强大的工具，可以对元素进行各种变换，如平移、旋转、缩放和倾斜。通过使用
      transform 属性，开发者可以创建动态和交互式的用户界面，提升用户体验。
    </h3>
    <h4>
      CSS Transform 的主要优势包括:
      <ul class="basic-list">
        <li>性能优化 - Transform 使用GPU加速,渲染更流畅</li>
        <li>不影响文档流 - 变换不会改变元素原有的布局位置</li>
        <li>动画友好 - 可以配合transition/animation制作流畅动画</li>
        <li>代码简洁 - 一行代码实现复杂的变换效果</li>
        <li>支持3D变换 - 可以实现丰富的3D效果</li>
      </ul>
    </h4>
    <div>
      <div class="demo-header-control">
        <div class="control-group">
          <h2 class="control-title">变换原点transform-origin</h2>
          <h3>
            transform-origin 属性定义了元素的变换原点。默认情况下，元素的变换原点是元素的中心点。
          </h3>
          <div class="origin-controls">
            <div class="origin-control">
              <label>X轴原点: {{ transformOrigin.x }}%</label>
              <input type="range" v-model="transformOrigin.x" min="0" max="100" step="1" />
            </div>
            <div class="origin-control">
              <label>Y轴原点: {{ transformOrigin.y }}%</label>
              <input type="range" v-model="transformOrigin.y" min="0" max="100" step="1" />
            </div>
            <div class="origin-control">
              <label>Z轴原点: {{ transformOrigin.z }}px</label>
              <input type="range" v-model="transformOrigin.z" min="0" max="100" step="1" />
            </div>
          </div>
        </div>
        <div class="control-group">
          <h2 class="control-title">transform-style</h2>
          <h3>transform-style 属性定义了元素的子元素是否保留其3D变换。</h3>
          <div class="origin-controls">
            <div class="origin-control">
              <select
                style="width: 120px"
                v-model:value="currentTransform.transformStyle"
                :options="transformStyle"
              />
            </div>
          </div>
        </div>
        <div class="control-group">
          <h2 class="control-title">规定3D元素的透视效果perspective</h2>
          <h3>
            perspective
            属性定义了3D元素的透视效果。值越小，3D效果越明显；值越大，3D效果越微弱。这个值表示观察者与z=0平面的距离。
          </h3>
          <div class="origin-controls">
            <div class="origin-control">
              <label>透视: {{ perspective }}px</label>
              <input type="range" v-model="perspective" min="0" max="300" step="1" />
            </div>
          </div>
        </div>
        <div class="control-group">
          <h2 class="control-title">规定3D元素的底部位置perspective-origin</h2>
          <h3>perspective-origin 属性定义 3D 元素所基于的 X 轴和 Y 轴</h3>
          <div class="origin-controls">
            <div class="origin-control">
              <label>X轴原点: {{ perspectiveOrigin.x }}%</label>
              <input type="range" v-model="perspectiveOrigin.x" min="0" max="100" step="1" />
            </div>
            <div class="origin-control">
              <label>Y轴原点: {{ perspectiveOrigin.y }}%</label>
              <input type="range" v-model="perspectiveOrigin.y" min="0" max="100" step="1" />
            </div>
          </div>
        </div>
        <div class="control-group">
          <h2 class="control-title">backface-visibility</h2>
          <h3>backface-visibility 属性定义了元素的背面是否可见。</h3>
          <div class="origin-controls">
            <div class="origin-control">
              <select
                style="width: 120px"
                v-model:value="backfaceVisibility"
                :options="backfaceVisibilityOptions"
              />
            </div>
          </div>
        </div>

        <div class="control-group">
          <h2 class="control-title">当前属性值控制</h2>
          <div
            class="origin-controls"
            v-for="(option, index) in currentTransform?.values"
            :key="index"
          >
            <div class="origin-control">
              <label
                >{{ option.label }} <span>{{ option.value }}{{ option.unit }}</span></label
              >
              <input
                type="range"
                v-model="option.value"
                :min="option.min"
                :max="option.max"
                :step="option.step"
              />
            </div>
          </div>
        </div>

        <div class="control-group">
          <h2 class="control-title">{{ currentTransform?.description }}</h2>
        </div>
      </div>
      <div class="demo-container">
        <div class="demo-area" :style="{ perspective: perspective + 'px' }">
          <div
            class="transform-box"
            :style="{
              transform: currentTransformValue,
              transformOrigin: `${transformOrigin.x}% ${transformOrigin.y}% ${transformOrigin.z}px`,
            }"
          >
            <div
              class="origin-point"
              :style="{
                left: `${transformOrigin.x}%`,
                top: `${transformOrigin.y}%`,
                transform: `translateZ(${transformOrigin.z}px)`,
              }"
            ></div>
            <div class="element-front">
              <div class="coordinate-label">X</div>
              <div class="coordinate-label">Y</div>
            </div>
            <div class="element-back"></div>
          </div>
        </div>
        <div class="controls-section">
          <div class="control-group transform-options">
            <h2 class="control-title">变换</h2>
            <div class="button-grid">
              <button
                v-for="option in transformOptions"
                :key="option.type"
                @click="applyTransform(option)"
                :class="{ active: currentTransform?.type === option.type }"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="code-section">
        <div class="code-description">{{ currentTransform?.description }}</div>
        <CodeBlock :code="code" />
      </div>
    </div>
    <div class="instruction-section">
      <div class="instruction-card">
        <h3>✨ 核心特性</h3>
        <ul>
          <li>不改变文档流布局</li>
          <li>支持3D变换</li>
          <li><b>高性能硬件加速</b></li>
          <li>支持过渡动画</li>
        </ul>
      </div>

      <div class="instruction-card">
        <h3>📝 使用注意</h3>
        <ul>
          <li>变换顺序影响最终效果</li>
          <li>百分比基于元素自身尺寸</li>
          <li>会创建新的层叠上下文</li>
          <li>可能影响子元素定位</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Select as ASelect } from 'ant-design-vue'
import CodeBlock from '@/components/Code/index.vue'

type TransformType =
  | 'translate'
  | 'rotate'
  | 'scale'
  | 'scale2'
  | 'skew'
  | 'matrix'
  | 'none'
  | 'custom'
  | 'translate3d'
  | 'rotate3d'
  | 'scale3d'
  | 'perspective'
  | 'matrix3d'
type TransformOption = {
  type: TransformType
  label: string
  transformStyle: 'preserve-3d' | 'flat'
  description: string
  values: {
    label: string
    value: number
    unit: string
    min: number
    max: number
    step: number
  }[]
  unit?: string[]
}

type TransformOrigin = {
  x: number
  y: number
  z: number
}

type PerspectiveOrigin = {
  x: number
  y: number
}

const transformOrigin = ref<TransformOrigin>({
  x: 50,
  y: 50,
  z: 0,
})

const perspectiveOrigin = ref<PerspectiveOrigin>({
  x: 50,
  y: 50,
})

const perspective = ref(1000)

const transformStyle = ref<
  {
    label: string
    value: string
  }[]
>([
  { label: 'preserve-3d', value: 'preserve-3d' },
  { label: 'flat', value: 'flat' },
])

const transformOptions = ref<TransformOption[]>([])

const currentTransform = ref<TransformOption>({
  type: 'translate',
  label: '平移',
  transformStyle: 'flat',
  description: '将元素沿X轴和Y轴进行平移',
  values: [
    { label: 'X轴', value: 0, unit: 'px', min: -100, max: 100, step: 1 },
    { label: 'Y轴', value: 0, unit: 'px', min: -100, max: 100, step: 1 },
  ],
})

onMounted(async () => {
  const list = await import('@/views/CoreSkills/HTML_CSS/JSON/Transfrom.json')
  transformOptions.value = list.default as TransformOption[]
})

const backfaceVisibility = ref('hidden')

const backfaceVisibilityOptions = ref<{ label: string; value: string }[]>([
  { label: 'hidden(隐藏)', value: 'hidden' },
  { label: 'visible(显示)', value: 'visible' },
])

const code = computed(() => {
  return `.transform-box {
perspective: ${perspective.value}px;
perspective-origin: ${perspectiveOrigin.value.x}% ${perspectiveOrigin.value.y}%
.transformed-element {
  transform: ${currentTransformValue.value};
  transform-origin: ${transformOrigin.value.x}% ${transformOrigin.value.y}% ${transformOrigin.value.z}px;
  transform-style: ${currentTransform.value.transformStyle};
  backface-visibility: ${backfaceVisibility.value};
}
}
  `
})

const currentTransformValue = computed(() => {
  return currentTransform.value?.type === 'none'
    ? 'none'
    : `${currentTransform.value?.type}(${currentTransform?.value?.values.map((item) => `${item.value}${item.unit}`).join(',')})`
})

const applyTransform = (option: TransformOption) => {
  currentTransform.value = option
  if (option.type === 'none') {
    perspective.value = 0
    perspectiveOrigin.value = { x: 50, y: 50 }
    currentTransform.value.values = []
  }
}
</script>

<style scoped>
.basic-list {
  li {
    font-weight: 900;
  }
}

.origin-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #3498db;
  border-radius: 50%;
  z-index: 100;
}

.code-description {
  color: #fff;
}

li {
  color: #000;
}

.transform-container {
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
  background: linear-gradient(90deg, #3498db, #e67e22);
  margin: 1rem auto;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 1rem;
  height: 30rem;
}

.demo-header-control {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.transform-options {
  height: 100%;
  overflow-y: auto;
}

.controls-section {
  height: 100%;
  overflow-y: auto;
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
  margin-bottom: 1rem;
  font-size: 1.2em;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
}

button {
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  background: white;
  color: #3498db;
  border: 2px solid #3498db;
  cursor: pointer;
  transition: all 0.3s ease;
}

button.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

button:hover {
  transform: translateY(-2px);
}

.demo-area {
  position: relative;
  height: 100%;
  perspective: 1000px;
}

.transform-box {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.element-front,
.element-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.element-front {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  transform-style: preserve-3d;
}

.element-back {
  background: linear-gradient(45deg, #e67e22, #e74c3c);
  transform: rotateY(180deg);
}

.coordinate-label {
  position: absolute;
  font-size: 0.8em;
  opacity: 0.8;
}

.coordinate-label:nth-child(1) {
  top: 10px;
  left: 10px;
}

.coordinate-label:nth-child(2) {
  bottom: 10px;
  right: 10px;
}

.code-section {
  background: #2c3e50;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.code-block {
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
  color: #e67e22;
}
</style>
