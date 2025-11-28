<template>
  <div class="svg-demo-container">
    <h1 class="title">SVG基础图形交互演示</h1>

    <!-- 矩形 -->
    <div class="demo-card" v-for="(shape, index) in shapes" :key="shape.type">
      <div class="demo-content">
        <!-- 图形展示区 -->
        <div class="svg-wrapper">
          <svg class="svg-box" :viewBox="shape.viewBox">
            <component
              :is="shape.type"
              v-bind="shape.attrs"
              :points="shape.pointList?.map((i) => i.join(' '))?.join(',')"
            />
          </svg>
        </div>

        <!-- 参数控制区 -->
        <div class="controls">
          <h3 class="shape-title">{{ shape.title }}</h3>
          <template v-if="!['polygon', 'polyline'].includes(shape.type)">
            <div class="slider-group" v-for="(param, key) in shape.params" :key="key">
              <label class="param-label">
                {{ param.label }}:
                <span class="param-value">{{ shape.attrs[key] }}{{ param.unit }}</span>
              </label>
              <input
                type="range"
                v-model.number="shape.attrs[key]"
                :min="param.min"
                :max="param.max"
                :step="param.step || 1"
                class="slider"
              />
            </div>
          </template>
          <template v-else>
            <div class="slider-group" v-for="(point, key) in shape.pointList" :key="key">
              <div class="poly-slider-group">
                <label class="param-label">
                  x:<span class="param-value">{{ (point as any)[0] }}</span>
                </label>
                <input
                  type="range"
                  v-model.number="(point as any)[0]"
                  min="0"
                  max="100"
                  :step="1"
                  class="slider"
                />
                <Button @click="deletePoint(index, key)">删除</Button>
              </div>
              <div class="poly-slider-group">
                <label class="param-label">
                  y:<span class="param-value">{{ (point as any)[1] }}</span>
                </label>
                <input
                  type="range"
                  v-model.number="(point as any)[1]"
                  min="0"
                  max="100"
                  :step="1"
                  class="slider"
                />
              </div>
            </div>
            <Button @click="addPoint(index)">添加点</Button>
          </template>
        </div>

        <!-- 代码展示区 -->
        <div class="code-box">
          <pre><code class="language-html">{{ generateCode(shape) }}</code></pre>
        </div>
      </div>
    </div>
    <Modal v-model:open="open" title="添加x与y" @ok="handleOk">
      <Form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="X坐标" name="x" :rules="[{ required: true, message: '输入x' }]">
          <a-input-number v-model:value="formState.x" max="100" />
        </a-form-item>
        <a-form-item label="Y坐标" name="y" :rules="[{ required: true, message: '输入y' }]">
          <a-input-number v-model:value="formState.y" max="100" />
        </a-form-item>
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components'
import { Modal, Form } from 'ant-design-vue'

type ControlUnit = {
  label?: string
  min?: number
  max?: number
  step?: number
  unit?: string
}

type ShapeConfig = {
  type: string
  title: string
  viewBox: string
  attrs: { [key: string]: number | string }
  params: {
    [key: string]: ControlUnit
  }
  pointList?: number[][]
}

const open = ref(false)

const formRef = ref()

const formState = ref({
  x: 0,
  y: 0,
})

const currentShapeIndex = ref<number>(0)

const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(formState.value)
      const currentShape = shapes.value[currentShapeIndex.value]
      currentShape.pointList?.push([formState.value.x, formState.value.y])
      currentShape.attrs.points = `"${currentShape.pointList?.map((i) => i.join(' '))?.join(',')}"`
      open.value = false
    })
    .catch((error: Error) => {
      console.log('error', error)
    })
}

const addPoint = (index: number) => {
  open.value = true
  currentShapeIndex.value = index
}

const deletePoint = (index: number, pointListIndex: number) => {
  shapes.value[index].pointList?.splice(pointListIndex, 1)
}

const shapes = ref<ShapeConfig[]>([
  {
    type: 'rect',
    title: '矩形 (rect)',
    viewBox: '0 0 200 100',
    attrs: { x: 20, y: 20, width: 160, height: 60, rx: 0, fill: '#4CAF50' },
    params: {
      x: { label: 'X坐标', min: 0, max: 180, unit: 'px' },
      y: { label: 'Y坐标', min: 0, max: 80, unit: 'px' },
      width: { label: '宽度', min: 10, max: 200, unit: 'px' },
      height: { label: '高度', min: 10, max: 100, unit: 'px' },
      rx: { label: '圆角', min: 0, max: 30, unit: 'px' },
    },
  },
  {
    type: 'circle',
    title: '圆形 (circle)',
    viewBox: '0 0 200 100',
    attrs: { cx: 100, cy: 50, r: 40, fill: '#2196F3' },
    params: {
      cx: { label: '中心X', min: 0, max: 200, unit: 'px' },
      cy: { label: '中心Y', min: 0, max: 100, unit: 'px' },
      r: { label: '半径', min: 10, max: 60, unit: 'px' },
    },
  },
  {
    type: 'ellipse',
    title: '椭圆 (ellipse)',
    viewBox: '0 0 200 100',
    attrs: { cx: 100, cy: 50, rx: 80, ry: 40, fill: '#FF9800' },
    params: {
      cx: { label: '中心X', min: 0, max: 200, unit: 'px' },
      cy: { label: '中心Y', min: 0, max: 100, unit: 'px' },
      rx: { label: '水平半径', min: 10, max: 100, unit: 'px' },
      ry: { label: '垂直半径', min: 10, max: 50, unit: 'px' },
    },
  },
  {
    type: 'line',
    title: '直线 (line)',
    viewBox: '0 0 200 100',
    attrs: { x1: 20, y1: 20, x2: 180, y2: 80, stroke: '#F44336', 'stroke-width': 2 },
    params: {
      x1: { label: '起点X', min: 0, max: 200, unit: 'px' },
      y1: { label: '起点Y', min: 0, max: 100, unit: 'px' },
      x2: { label: '终点X', min: 0, max: 200, unit: 'px' },
      y2: { label: '终点Y', min: 0, max: 100, unit: 'px' },
    },
  },
  {
    type: 'polyline',
    title: '折线 (polyline)',
    viewBox: '0 0 200 100',
    attrs: { stroke: '#F44336', 'stroke-width': 4, fill: 'none' },
    params: {},
    pointList: [
      [0, 50],
      [15, 100],
      [100, 0],
      [0, 100],
    ],
  },
  {
    type: 'polygon',
    title: '多边形 (polygon)',
    viewBox: '0 0 200 100',
    attrs: { fill: '#9C27B0' },
    params: {},
    pointList: [
      [0, 50],
      [15, 100],
      [100, 0],
      [0, 100],
    ],
  },
  // 可继续添加其他图形...
])

const generateCode = (shape: ShapeConfig) => {
  if (['polygon', 'path'].includes(shape.type)) {
    return `<${shape.type} points="${shape.pointList?.map((i) => i.join(' '))?.join(',')}" fill="#9C27B0" />`
  }
  return `<${shape.type}\n  ${Object.entries(shape.attrs)
    .map(([key, val]) => `${key}="${val}${shape.params[key]?.unit || ''}"`)
    .join('\n  ')}\n/>`
}
</script>

<style scoped>
.svg-demo-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.2em;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.demo-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.demo-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.svg-box {
  width: 100%;
  height: 200px;
}

.controls {
  padding: 1rem;
}

.shape-title {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.3em;
}

.slider-group {
  margin-bottom: 1.2rem;
}

.param-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9em;
}

.param-value {
  color: #2196f3;
  font-weight: bold;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #eee;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2196f3;
  cursor: pointer;
  transition: background 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  background: #1976d2;
}

.code-box {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  overflow: hidden;
}

pre {
  margin: 0;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  font-size: 0.85em;
  line-height: 1.6;
}

code {
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .demo-content {
    grid-template-columns: 1fr;
  }

  .svg-box {
    height: 150px;
  }
}

.poly-slider-group {
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  gap: 0.5rem;
  justify-content: space-around;
  align-items: center;
}
</style>
