<template>
  <div class="repeating-gradient-explorer">
    <header class="header">
      <h1>CSS3 重复渐变属性基础介绍</h1>
      <p class="subtitle">探索重复线性、重复径向与重复锥形渐变的强大功能</p>
    </header>

    <div class="content-wrapper">
      <!-- 渐变类型选择器 -->
      <div class="gradient-type-selector">
        <button v-for="type in gradientTypes" :key="type.value" :class="{ active: selectedType === type.value }"
          @click="selectedType = type.value as GradientType">
          {{ type.label }}
        </button>
      </div>

      <!-- 渐变预览区域 -->
      <div class="gradient-preview" :style="gradientStyle">
        <div class="preview-info">
          <p>当前渐变代码:</p>
          <code>{{ gradientCode }}</code>
        </div>
      </div>

      <!-- 渐变参数控制 -->
      <div class="gradient-controls">
        <!-- 通用参数 -->
        <div class="control-group">
          <h3>颜色控制</h3>
          <div class="color-stops">
            <div v-for="(stop, index) in gradientStops" :key="index" class="color-stop">
              <div class="color-picker-wrapper">
                <input type="color" v-model="stop.color" class="color-picker">
                <span>{{ stop.color }}</span>
              </div>
              <div class="position-control">
                <label>位置:</label>
                <input type="range" v-model="stop.position" min="0" max="100" class="slider">
                <span>{{ stop.position }}%</span>
              </div>
              <button v-if="gradientStops.length > 2" @click="removeStop(index)" class="remove-btn">
                ×
              </button>
            </div>
          </div>
          <button @click="addStop" :disabled="gradientStops.length >= 5" class="add-stop-btn">
            + 添加颜色节点
          </button>
        </div>

        <!-- 重复控制参数 -->
        <div class="control-group">
          <h3>重复控制</h3>
          <div class="control-row">
            <label>重复尺寸:</label>
            <input type="range" v-model="repeatSize" min="10" max="200" class="slider">
            <span>{{ repeatSize }}px</span>
          </div>
          <div class="control-row">
            <label>重复方式:</label>
            <select v-model="repeatType">
              <option value="fixed">固定尺寸</option>
              <option value="stretch">拉伸填充</option>
            </select>
          </div>
          <div class="control-row">
            <label>重复次数:</label>
            <input type="range" v-model="repeatCount" min="2" max="20" class="slider">
            <span>{{ repeatCount }}次</span>
          </div>
        </div>

        <!-- 线性渐变参数 -->
        <div v-if="selectedType === 'linear'" class="control-group">
          <h3>线性渐变参数</h3>
          <div class="control-row">
            <label>角度:</label>
            <input type="range" v-model="linearParams.angle" min="0" max="360" class="slider">
            <span>{{ linearParams.angle }}°</span>
          </div>
        </div>

        <!-- 径向渐变参数 -->
        <div v-if="selectedType === 'radial'" class="control-group">
          <h3>径向渐变参数</h3>
          <div class="control-row">
            <label>形状:</label>
            <select v-model="radialParams.shape">
              <option value="circle">圆形 (circle)</option>
              <option value="ellipse">椭圆 (ellipse)</option>
            </select>
          </div>
          <div class="control-row">
            <label>大小:</label>
            <select v-model="radialParams.size">
              <option value="closest-side">closest-side</option>
              <option value="farthest-side">farthest-side</option>
              <option value="closest-corner">closest-corner</option>
              <option value="farthest-corner">farthest-corner</option>
            </select>
          </div>
        </div>

        <!-- 锥形渐变参数 -->
        <div v-if="selectedType === 'conic'" class="control-group">
          <h3>锥形渐变参数</h3>
          <div class="control-row">
            <label>起始角度:</label>
            <input type="range" v-model="conicParams.startAngle" min="0" max="360" class="slider">
            <span>{{ conicParams.startAngle }}°</span>
          </div>
        </div>
      </div>

      <!-- 渐变类型说明 -->
      <div class="gradient-info">
        <h2>{{gradientTypes.find(t => t.value === selectedType)?.label}} 渐变</h2>
        <p>{{gradientTypes.find(t => t.value === selectedType)?.description}}</p>

        <div class="info-cards">
          <div class="info-card">
            <h3>语法解析</h3>
            <pre class="syntax">{{gradientTypes.find(t => t.value === selectedType)?.syntax}}</pre>
          </div>
          <div class="info-card">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(useCase, idx) in gradientTypes.find(t => t.value === selectedType)?.useCases" :key="idx">
                {{ useCase }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 应用示例 -->
      <div class="examples-section">
        <h2 class="section-title">重复渐变应用示例</h2>
        <div class="examples-grid">
          <div class="example-card">
            <div class="example-preview" :style="example1Style"></div>
            <div class="example-info">
              <h3>条纹背景</h3>
              <p>使用重复线性渐变创建条纹效果</p>
            </div>
          </div>
          <div class="example-card">
            <div class="example-preview" :style="example2Style"></div>
            <div class="example-info">
              <h3>同心圆</h3>
              <p>重复径向渐变创建同心圆效果</p>
            </div>
          </div>
          <div class="example-card">
            <div class="example-preview" :style="example3Style"></div>
            <div class="example-info">
              <h3>彩色表盘</h3>
              <p>重复锥形渐变创建表盘效果</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 渐变类型定义
type GradientType = 'linear' | 'radial' | 'conic'

// 颜色停止点接口
interface ColorStop {
  color: string
  position: number
}

// 渐变类型信息
const gradientTypes = ref([
  {
    value: 'linear',
    label: '重复线性渐变',
    description: '重复线性渐变沿着一条直线在多个颜色之间创建重复的平滑过渡，特别适合创建条纹、斑马线等效果。',
    syntax: `background: repeating-linear-gradient(
  [角度],
  color1 位置1,
  color2 位置2,
  ...
);`,
    useCases: [
      '创建条纹背景',
      '表格斑马线效果',
      '进度条设计',
      '边框和分隔线'
    ]
  },
  {
    value: 'radial',
    label: '重复径向渐变',
    description: '重复径向渐变从中心点向外创建重复的圆形或椭圆形颜色过渡，适合创建同心圆、靶心等效果。',
    syntax: `background: repeating-radial-gradient(
  [形状] [大小],
  color1 位置1,
  color2 位置2,
  ...
);`,
    useCases: [
      '创建同心圆效果',
      '设计雷达扫描图',
      '制作靶心图案',
      '创建波点背景'
    ]
  },
  {
    value: 'conic',
    label: '重复锥形渐变',
    description: '重复锥形渐变围绕中心点创建重复的旋转颜色过渡，非常适合创建彩色表盘、角度指示器等效果。',
    syntax: `background: repeating-conic-gradient(
  [起始角度],
  color1 位置1,
  color2 位置2,
  ...
);`,
    useCases: [
      '创建彩色表盘',
      '角度指示器设计',
      '色轮效果',
      '进度环动画'
    ]
  }
])

// 当前选中的渐变类型
const selectedType = ref<GradientType>('linear')

// 颜色停止点
const gradientStops = ref<ColorStop[]>([
  { color: '#ff9a9e', position: 0 },
  { color: '#fad0c4', position: 10 },
  { color: '#a1c4fd', position: 20 }
])

// 重复控制参数
const repeatSize = ref(50)
const repeatCount = ref(5)
const repeatType = ref('fixed')

// 线性渐变参数
const linearParams = ref({
  angle: 45
})

// 径向渐变参数
const radialParams = ref({
  shape: 'circle',
  size: 'closest-side'
})

// 锥形渐变参数
const conicParams = ref({
  startAngle: 0
})

// 添加颜色停止点
const addStop = () => {
  if (gradientStops.value.length < 5) {
    // 在现有停止点之间插入新点
    const lastPosition = gradientStops.value[gradientStops.value.length - 1].position
    const newPosition = Math.min(lastPosition + 10, 100)

    gradientStops.value.splice(gradientStops.value.length - 1, 0, {
      color: '#ffffff',
      position: newPosition
    })
  }
}

// 移除颜色停止点
const removeStop = (index: number) => {
  if (gradientStops.value.length > 2) {
    gradientStops.value.splice(index, 1)
  }
}

// 计算渐变样式
const gradientStyle = computed(() => {
  const stops = gradientStops.value
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ')

  // 根据重复确定背景尺寸
  const backgroundSize = repeatType.value === 'fixed'
    ? `${repeatSize.value}px ${repeatSize.value}px`
    : 'auto'

  switch (selectedType.value) {
    case 'linear':
      return {
        background: `repeating-linear-gradient(${linearParams.value.angle}deg, ${stops})`,
        backgroundSize: backgroundSize
      }
    case 'radial':
      return {
        background: `repeating-radial-gradient(${radialParams.value.shape} ${radialParams.value.size}, ${stops})`,
        backgroundSize: backgroundSize
      }
    case 'conic':
      return {
        background: `repeating-conic-gradient(from ${conicParams.value.startAngle}deg, ${stops})`,
        backgroundSize: backgroundSize
      }
    default:
      return {
        background: `repeating-linear-gradient(45deg, ${stops})`,
        backgroundSize: backgroundSize
      }
  }
})

// 获取当前渐变代码
const gradientCode = computed(() => {
  return gradientStyle.value.background + ';\nbackground-size: ' + gradientStyle.value.backgroundSize
})

// 示例样式
const example1Style = computed(() => ({
  background: `repeating-linear-gradient(
    45deg,
    #ff9a9e 0px,
    #ff9a9e 10px,
    #fad0c4 10px,
    #fad0c4 20px
  )`
}))

const example2Style = computed(() => ({
  background: `repeating-radial-gradient(
    circle,
    #a1c4fd 0px,
    #a1c4fd 10px,
    #c2e9fb 10px,
    #c2e9fb 20px
  )`
}))

const example3Style = computed(() => ({
  background: `repeating-conic-gradient(
    #ff9a9e 0deg 30deg,
    #fad0c4 30deg 60deg,
    #a1c4fd 60deg 90deg,
    #c2e9fb 90deg 120deg
  )`,
  borderRadius: '50%'
}))
</script>

<style lang="less" scoped>


.repeating-gradient-explorer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  background-color: #f8fafc;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.gradient-type-selector {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;

  button {
    padding: 0.8rem 1.5rem;
    margin: 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #e2e8f0;
      transform: translateY(-2px);
    }

    &.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }
  }
}

.gradient-preview {
  height: 300px;
  position: relative;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.3s ease;

  .preview-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    font-size: 0.9rem;

    p {
      margin: 0 0 0.5rem 0;
      font-weight: 500;
    }

    code {
      display: block;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      overflow-x: auto;
      white-space: pre-wrap;
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }
}

.gradient-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.control-group {
  margin-bottom: 1.5rem;

  h3 {
    color: #1d4ed8;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed #cbd5e1;
  }
}

.color-stops {
  margin-bottom: 1rem;
}

.color-stop {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  background: #f8fafc;
  border-radius: 8px;

  .color-picker-wrapper {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    input[type="color"] {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 6px;
      margin-right: 0.5rem;
      cursor: pointer;
    }

    span {
      font-size: 0.9rem;
      font-family: monospace;
      width: 80px;
    }
  }

  .position-control {
    display: flex;
    align-items: center;
    flex-grow: 1;

    label {
      margin-right: 0.5rem;
      font-size: 0.9rem;
    }

    input[type="range"] {
      flex-grow: 1;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      width: 50px;
    }
  }

  .remove-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fecaca;
    color: #b91c1c;
    border: none;
    font-weight: bold;
    margin-left: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f87171;
      color: white;
      transform: scale(1.1);
    }
  }
}

.add-stop-btn {
  background: #dbeafe;
  color: #1d4ed8;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3b82f6;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.control-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    width: 100px;
    font-size: 0.95rem;
    font-weight: 500;
  }

  input[type="range"] {
    flex-grow: 1;
    margin: 0 1rem;
  }

  select {
    flex-grow: 1;
    padding: 0.6rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: white;
  }

  span {
    width: 70px;
    font-size: 0.95rem;
    text-align: right;
  }
}

.slider {
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #cbd5e1;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
      background: #2563eb;
    }
  }
}

.gradient-info {
  padding: 2rem;
  background-color: #f1f5f9;
  border-top: 1px solid #e2e8f0;

  h2 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.info-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .syntax {
    background: #1e293b;
    color: #f1f5f9;
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #3b82f6;
        font-weight: bold;
      }
    }
  }
}

.examples-section {
  padding: 2rem;
  background-color: white;

  .section-title {
    font-size: 1.8rem;
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #dbeafe;
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.example-preview {
  height: 200px;
  border-bottom: 1px solid #e2e8f0;
}

.example-info {
  padding: 1.2rem;

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    margin: 0;
  }
}
</style>
