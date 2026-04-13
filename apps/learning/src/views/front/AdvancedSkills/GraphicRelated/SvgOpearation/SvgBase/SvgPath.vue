<!-- SvgPathExplanation.vue -->
<template>
  <div class="path-container">
    <h1>SVG Path 基础介绍</h1>

    <h2>SVG Path 是什么？</h2>
    <p>SVG Path 是 SVG 中用于定义路径的命令集合。通过这些命令，可以绘制各种形状和曲线。</p>

    <h2>SVG Path 命令速查表</h2>

    <!-- 命令速查表 -->
    <section class="command-reference">
      <h2>路径命令速查表</h2>
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>名称</th>
            <th>参数</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cmd in pathCommands" :key="cmd.command">
            <td>
              <code>{{ cmd.command }}</code>
            </td>
            <td>{{ cmd.name }}</td>
            <td>{{ cmd.parameters }}</td>
            <td>
              <code>{{ cmd.example }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 动态示例演示 -->
    <section class="live-demo">
      <h2>路径绘制演示</h2>
      <div class="demo-wrapper">
        <div class="code-panel">
          <pre class="path-code"><code>&lt;path d="{{ currentPath }}" /&gt;</code></pre>
          <div>
            <span>&lt;path d="</span
            ><a-textarea v-model:value="currentPath" style="width: 100%"></a-textarea
            ><span>" /&gt;</span>
          </div>
        </div>
        <div class="svg-panel">
          <svg :viewBox="viewBox" width="300" height="300">
            <path :d="currentPath" fill="none" stroke="#2196F3" stroke-width="2" />
            <circle
              v-for="(point, index) in controlPoints"
              :key="index"
              :cx="point.x"
              :cy="point.y"
              r="3"
              fill="#FF5722"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- 详细参数说明 -->
    <section class="parameter-details">
      <h2>详细参数说明</h2>
      <div v-for="cmd in detailedCommands" :key="cmd.command" class="command-detail">
        <h3>{{ cmd.command }} - {{ cmd.name }}</h3>
        <p>{{ cmd.description }}</p>
        <div class="example-box">
          <code>示例：{{ cmd.example }}</code>
          <svg width="120" height="120">
            <path :d="cmd.example" fill="none" stroke="#4CAF50" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface PathCommand {
  command: string
  name: string
  parameters: string
  example: string
  description?: string
}

// 路径命令数据
const pathCommands = ref<PathCommand[]>([
  { command: 'M', name: '移动至', parameters: 'x,y', example: 'M 10 10' },
  { command: 'L', name: '直线', parameters: 'x,y', example: 'L 100 100' },
  { command: 'H', name: '水平线', parameters: 'x', example: 'H 90' },
  { command: 'V', name: '垂直线', parameters: 'y', example: 'V 50' },
  {
    command: 'C',
    name: '三次贝塞尔',
    parameters: 'x1,y1 x2,y2 x,y',
    example: 'C 20 100 180 100 200 50',
  },
  { command: 'S', name: '连续三次贝塞尔', parameters: 'x2,y2 x,y', example: 'S 180 150 200 100' },
  { command: 'Q', name: '二次贝塞尔', parameters: 'x1,y1 x,y', example: 'Q 150 200 200 50' },
  { command: 'T', name: '连续二次贝塞尔', parameters: 'x,y', example: 'T 200 100' },
  {
    command: 'A',
    name: '椭圆弧',
    parameters: 'rx ry x-axis-rotation large-arc-flag sweep-flag x,y',
    example: 'A 50 30 0 0 1 150 150',
  },
  { command: 'Z', name: '闭合路径', parameters: '无', example: 'Z' },
])

// 动态演示路径
const viewBox = ref('0 0 300 300')
const currentPath = ref('M 20 20 L 180 20 Q 190 100 180 180 A 80 80 180 0 0 20 180 Z')
const controlPoints = ref([
  { x: 20, y: 20 },
  { x: 180, y: 20 },
  { x: 180, y: 180 },
  { x: 20, y: 180 },
])

// 详细命令说明
const detailedCommands = ref<PathCommand[]>([
  {
    command: 'M',
    name: 'Move To',
    parameters: '绝对坐标：M x,y\n相对坐标：m dx,dy',
    example: 'M 0 50 L 150 50',
    description: '将画笔移动到指定坐标，开始新路径或创建子路径',
  },
  {
    command: 'C',
    name: 'Cubic Bezier',
    parameters: 'C x1,y1 x2,y2 x,y\nc dx1,dy1 dx2,dy2 dx,dy',
    example: 'M 0 60 C 30 40 170 40 120 60',
    description:
      '三次贝塞尔曲线：需要两个控制点和一个终点\n控制点1定义起始切线方向，控制点2定义结束切线方向',
  },
  {
    command: 'S',
    name: '连续三次贝塞尔',
    parameters: 'S x2,y2 x,y\ns dx2,dy2 dx,dy',
    example: 'M 30 140 S 30 40 170 140',
    description:
      '连续三次贝塞尔曲线：需要两个控制点和一个终点, 控制点1定义起始切线方向，控制点2定义结束切线方向, 控制点1和控制点2的坐标是相对于当前点的相对坐标',
  },
  {
    command: 'A',
    name: 'Elliptical Arc',
    parameters: 'A rx ry xRotate largeArc sweep x,y',
    example: 'M 0 60 A 60 60 360 0 1 120 60',
    description:
      '椭圆弧参数基础介绍：\n' +
      '- rx/ry: 椭圆半径\n' +
      '- xRotate: 椭圆旋转角度\n' +
      '- largeArc: 0-小弧/1-大弧\n' +
      '- sweep: 0-逆时针/1-顺时针\n' +
      '- x,y: 终点坐标',
  },
])
</script>

<style scoped>
.path-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui;
}

.command-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }

  code {
    font-family: 'Fira Code', monospace;
    color: #c7254e;
  }
}

.live-demo {
  margin: 2rem 0;
  border: 1px solid #eee;
  padding: 1rem;
}

.demo-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.path-code {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.svg-panel {
  border: 1px solid #ddd;
  padding: 1rem;
}

.example-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 4px;

  code {
    flex: 1;
  }

  svg {
    border: 1px solid #ddd;
  }
}

.command-detail {
  margin: 2rem 0;
  padding: 1rem;
  border-left: 4px solid #2196f3;
  background: #f8faff;
}
</style>
