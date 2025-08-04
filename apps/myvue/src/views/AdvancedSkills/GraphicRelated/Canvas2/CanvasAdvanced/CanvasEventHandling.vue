<template>
  <div class="canvas-events-container">
    <header class="header">
      <h1>Canvas <span class="highlight">事件处理</span> 基本指南</h1>
      <p class="subtitle">掌握高效处理Canvas交互的技术方案</p>
    </header>

    <div class="content">
      <div class="intro">
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <h3>为什么Canvas事件处理特殊？</h3>
          <p>
            Canvas是一个位图绘制区域，不同于DOM元素，它没有内置的子元素事件系统。整个Canvas只有一个事件监听器，需要手动计算交互位置。
          </p>
        </div>
        <div class="intro-card">
          <div class="icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <h3>核心挑战</h3>
          <p>如何高效检测用户交互的具体位置？如何处理动态变化的图形？如何实现复杂交互场景？</p>
        </div>
      </div>

      <section class="methods">
        <h2 class="section-title"><i class="fas fa-code"></i> Canvas事件处理方案</h2>

        <div class="method-cards">
          <div class="method-card" v-for="(method, index) in methods" :key="index">
            <div class="method-header">
              <h3>{{ method.title }}</h3>
              <span class="method-type" :class="method.type">{{ method.type }}</span>
            </div>
            <div class="method-content">
              <p>{{ method.description }}</p>

              <div class="use-cases">
                <h4><i class="fas fa-check-circle"></i> 适用场景</h4>
                <ul>
                  <li v-for="(caseItem, caseIndex) in method.useCases" :key="caseIndex">
                    {{ caseItem }}
                  </li>
                </ul>
              </div>

              <div class="code-sample">
                <pre><code>{{ method.code }}</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h4><i class="fas fa-thumbs-up"></i> 优点</h4>
                  <ul>
                    <li v-for="(pro, proIndex) in method.pros" :key="proIndex">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4><i class="fas fa-thumbs-down"></i> 缺点</h4>
                  <ul>
                    <li v-for="(con, conIndex) in method.cons" :key="conIndex">{{ con }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="section-title"><i class="fas fa-laptop-code"></i> Canvas事件处理演示</h2>

        <div class="demo-container">
          <div class="canvas-controls">
            <div class="controls-group">
              <h3>交互模式</h3>
              <div class="buttons">
                <button
                  v-for="(mode, index) in interactionModes"
                  :key="index"
                  @click="activeMode = mode.id"
                  :class="{ active: activeMode === mode.id }"
                >
                  {{ mode.label }}
                </button>
              </div>
            </div>

            <div class="controls-group">
              <h3>图形状态</h3>
              <div class="status">
                <div v-for="(shape, index) in shapes" :key="index" class="shape-status">
                  <span class="shape-name">{{ shape.name }}</span>
                  <span
                    class="shape-state"
                    :class="shape.hovered ? 'hovered' : shape.selected ? 'selected' : 'idle'"
                  >
                    {{ shape.hovered ? '悬停中' : shape.selected ? '已选中' : '空闲' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="canvas-area">
            <canvas
              ref="canvas"
              width="600"
              height="400"
              @mousemove="handleMouseMove"
              @mousedown="handleMouseDown"
              @mouseup="handleMouseUp"
              @click="handleClick"
            ></canvas>
            <div class="demo-info">
              <p>当前鼠标位置: ({{ mousePosition.x }}, {{ mousePosition.y }})</p>
              <p>当前状态: {{ activeModeInfo }}</p>
              <p>选中图形: {{ selectedShape || '无' }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title"><i class="fas fa-check-circle"></i> 最佳实践与优化建议</h2>

        <div class="practices">
          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3>性能优化</h3>
            <ul>
              <li>使用空间分区数据结构（如四叉树）优化碰撞检测</li>
              <li>对静态图形进行预计算和缓存</li>
              <li>使用requestAnimationFrame进行高效重绘</li>
              <li>避免在事件处理中进行复杂计算</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <h3>复杂场景处理</h3>
            <ul>
              <li>分层Canvas：交互层与渲染层分离</li>
              <li>使用对象池管理事件监听</li>
              <li>实现事件委托模式减少监听器数量</li>
              <li>添加事件节流防止过度渲染</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>移动端适配</h3>
            <ul>
              <li>同时处理touch和mouse事件</li>
              <li>添加触摸反馈效果</li>
              <li>考虑高DPI屏幕适配</li>
              <li>实现手势识别（缩放、旋转等）</li>
            </ul>
          </div>
        </div>

        <div class="summary">
          <h3><i class="fas fa-lightbulb"></i> 方案选择建议</h3>
          <div class="recommendation-table">
            <table>
              <thead>
                <tr>
                  <th>场景类型</th>
                  <th>推荐方案</th>
                  <th>原因</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>简单静态图形</td>
                  <td>坐标检测法</td>
                  <td>实现简单，性能开销小</td>
                </tr>
                <tr>
                  <td>复杂动态场景</td>
                  <td>对象绑定法</td>
                  <td>维护性好，扩展性强</td>
                </tr>
                <tr>
                  <td>游戏开发</td>
                  <td>分层处理法</td>
                  <td>性能优化，交互分离</td>
                </tr>
                <tr>
                  <td>数据可视化</td>
                  <td>混合方案</td>
                  <td>灵活应对不同需求</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 Canvas事件处理指南 | 使用Vue 3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

// Canvas引用
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

// 交互模式
const interactionModes = [
  { id: 'hover', label: '悬停检测' },
  { id: 'click', label: '点击选择' },
  { id: 'drag', label: '拖拽移动' },
]
const activeMode = ref('hover')

// 鼠标位置
const mousePosition = ref({ x: 0, y: 0 })

// 图形数据
const shapes = ref([
  {
    id: 1,
    name: '圆形',
    x: 100,
    y: 100,
    radius: 50,
    hovered: false,
    selected: false,
    dragging: false,
  },
  {
    id: 2,
    name: '矩形',
    x: 300,
    y: 150,
    width: 100,
    height: 80,
    hovered: false,
    selected: false,
    dragging: false,
  },
  {
    id: 3,
    name: '三角形',
    x: 200,
    y: 300,
    size: 70,
    hovered: false,
    selected: false,
    dragging: false,
  },
])

// 选中的图形
const selectedShape = ref<string | null>(null)

// 当前模式信息
const activeModeInfo = computed(() => {
  const mode = interactionModes.find((m) => m.id === activeMode.value)
  return mode ? mode.label : ''
})

// 初始化Canvas
onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawCanvas()
  }
})

// 绘制Canvas内容
const drawCanvas = () => {
  if (!ctx.value) return

  const canvasEl = canvas.value!
  ctx.value.clearRect(0, 0, canvasEl.width, canvasEl.height)

  // 绘制网格背景
  ctx.value.strokeStyle = '#f0f0f0'
  ctx.value.lineWidth = 1

  for (let x = 0; x <= canvasEl.width; x += 20) {
    ctx.value.beginPath()
    ctx.value.moveTo(x, 0)
    ctx.value.lineTo(x, canvasEl.height)
    ctx.value.stroke()
  }

  for (let y = 0; y <= canvasEl.height; y += 20) {
    ctx.value.beginPath()
    ctx.value.moveTo(0, y)
    ctx.value.lineTo(canvasEl.width, y)
    ctx.value.stroke()
  }

  // 绘制图形
  shapes.value.forEach((shape) => {
    if (shape.id === 1) {
      // 圆形
      ctx.value!.beginPath()
      ctx.value!.arc(shape.x, shape.y, shape.radius!, 0, Math.PI * 2)
      ctx.value!.fillStyle = shape.selected ? '#3498db' : shape.hovered ? '#2ecc71' : '#e74c3c'
      ctx.value!.fill()
      ctx.value!.strokeStyle = '#2c3e50'
      ctx.value!.lineWidth = 2
      ctx.value!.stroke()
    } else if (shape.id === 2) {
      // 矩形
      ctx.value!.fillStyle = shape.selected ? '#3498db' : shape.hovered ? '#2ecc71' : '#9b59b6'
      ctx.value!.fillRect(
        shape.x - shape.width! / 2,
        shape.y - shape.height! / 2,
        shape.width!,
        shape.height!,
      )
      ctx.value!.strokeStyle = '#2c3e50'
      ctx.value!.lineWidth = 2
      ctx.value!.strokeRect(
        shape.x - shape.width! / 2,
        shape.y - shape.height! / 2,
        shape.width!,
        shape.height!,
      )
    } else if (shape.id === 3) {
      // 三角形
      ctx.value!.beginPath()
      ctx.value!.moveTo(shape.x, shape.y - shape.size! / 2)
      ctx.value!.lineTo(shape.x - shape.size! / 2, shape.y + shape.size! / 2)
      ctx.value!.lineTo(shape.x + shape.size! / 2, shape.y + shape.size! / 2)
      ctx.value!.closePath()
      ctx.value!.fillStyle = shape.selected ? '#3498db' : shape.hovered ? '#2ecc71' : '#f39c12'
      ctx.value!.fill()
      ctx.value!.strokeStyle = '#2c3e50'
      ctx.value!.lineWidth = 2
      ctx.value!.stroke()
    }
  })
}

// 检测点是否在圆形内
const isPointInCircle = (x: number, y: number, circle: any) => {
  const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)
  return distance <= circle.radius
}

// 检测点是否在矩形内
const isPointInRect = (x: number, y: number, rect: any) => {
  return (
    x >= rect.x - rect.width / 2 &&
    x <= rect.x + rect.width / 2 &&
    y >= rect.y - rect.height / 2 &&
    y <= rect.y + rect.height / 2
  )
}

// 检测点是否在三角形内
const isPointInTriangle = (x: number, y: number, tri: any) => {
  // 简化的点是否在三角形内检测
  // 实际项目中应使用重心坐标法或射线法
  return isPointInRect(x, y, {
    x: tri.x,
    y: tri.y + tri.size / 4,
    width: tri.size,
    height: tri.size / 2,
  })
}

// 鼠标移动处理
const handleMouseMove = (event: MouseEvent) => {
  if (!canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }

  // 重置所有悬停状态
  shapes.value.forEach((shape) => {
    shape.hovered = false
  })

  let hoveredShape = null

  // 检测鼠标位置下的图形（从后向前检测，处理重叠）
  for (let i = shapes.value.length - 1; i >= 0; i--) {
    const shape = shapes.value[i]

    if (shape.id === 1 && isPointInCircle(mousePosition.value.x, mousePosition.value.y, shape)) {
      shape.hovered = true
      hoveredShape = shape
      break
    } else if (
      shape.id === 2 &&
      isPointInRect(mousePosition.value.x, mousePosition.value.y, shape)
    ) {
      shape.hovered = true
      hoveredShape = shape
      break
    } else if (
      shape.id === 3 &&
      isPointInTriangle(mousePosition.value.x, mousePosition.value.y, shape)
    ) {
      shape.hovered = true
      hoveredShape = shape
      break
    }
  }

  // 拖拽处理
  if (activeMode.value === 'drag') {
    const draggingShape = shapes.value.find((shape) => shape.dragging)
    if (draggingShape) {
      draggingShape.x = mousePosition.value.x
      draggingShape.y = mousePosition.value.y
    }
  }

  drawCanvas()
}

// 鼠标点击处理
const handleClick = () => {
  if (activeMode.value !== 'click') return

  // 查找当前悬停的图形
  const hoveredShape = shapes.value.find((shape) => shape.hovered)

  // 取消所有选中状态
  shapes.value.forEach((shape) => {
    shape.selected = false
  })

  // 设置选中状态
  if (hoveredShape) {
    hoveredShape.selected = true
    selectedShape.value = hoveredShape.name
  } else {
    selectedShape.value = null
  }

  drawCanvas()
}

// 鼠标按下处理
const handleMouseDown = () => {
  if (activeMode.value !== 'drag') return

  const hoveredShape = shapes.value.find((shape) => shape.hovered)
  if (hoveredShape) {
    hoveredShape.dragging = true
  }
}

// 鼠标释放处理
const handleMouseUp = () => {
  if (activeMode.value !== 'drag') return

  shapes.value.forEach((shape) => {
    shape.dragging = false
  })
}

// 事件处理方法
const methods = [
  {
    title: '坐标检测法',
    type: '基础方案',
    description: '通过计算鼠标位置与图形坐标的几何关系，判断交互是否发生在特定图形上。',
    useCases: ['简单静态场景', '图形数量较少的情况', '几何形状规则且易计算', '原型开发阶段'],
    code: `// 检测点是否在圆形内
function isPointInCircle(x, y, circle) {
  const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
  return distance <= circle.radius;
}

// 检测点是否在矩形内
function isPointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.width &&
         y >= rect.y && y <= rect.y + rect.height;
}

// Canvas点击事件处理
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 检测点击了哪个图形
  for (const shape of shapes) {
    if (shape.type === 'circle' && isPointInCircle(x, y, shape)) {
      handleCircleClick(shape);
      break;
    } else if (shape.type === 'rect' && isPointInRect(x, y, shape)) {
      handleRectClick(shape);
      break;
    }
  }
});`,
    pros: ['实现简单直观', '无需额外库或复杂架构', '性能开销小（小型场景）', '适合简单几何图形'],
    cons: [
      '难以处理复杂不规则图形',
      '性能随图形数量增加而下降',
      '难以处理图形重叠情况',
      '代码可维护性差（大型项目）',
    ],
  },
  {
    title: '对象绑定法',
    type: '进阶方案',
    description: '为每个图形对象创建虚拟表示，并绑定事件处理器。使用图形ID或引用关联事件与对象。',
    useCases: [
      '动态变化的图形场景',
      '需要复杂交互逻辑的应用',
      '图形数量较多但可管理',
      '需要维护图形状态的应用',
    ],
    code: `class CanvasShape {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.selected = false;
  }

  containsPoint(x, y) {
    // 根据类型实现检测逻辑
  }

  onClick() {
    this.selected = !this.selected;
    // 其他点击处理逻辑
  }

  onHover() {
    // 悬停处理逻辑
  }
}

// 创建图形对象
const shapes = [
  new Circle(100, 100, 50),
  new Rectangle(300, 150, 100, 80)
];

// 事件委托处理
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 从后向前检测（处理重叠）
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].containsPoint(x, y)) {
      shapes[i].onClick();
      break; // 只触发最上层的图形
    }
  }
});`,
    pros: [
      '面向对象设计，代码结构清晰',
      '易于扩展和维护',
      '支持复杂交互逻辑',
      '可以轻松添加新图形类型',
    ],
    cons: [
      '需要预先设计对象模型',
      '性能开销大于基础方案',
      '对于非常大量图形仍有性能问题',
      '需要手动处理事件委托',
    ],
  },
  {
    title: '分层处理法',
    type: '高级方案',
    description: '使用多个Canvas层分离交互和渲染，或使用专门的交互层库（如Konva.js、Fabric.js）。',
    useCases: [
      '高性能要求的应用（如游戏）',
      '复杂交互场景（如绘图工具）',
      '需要高级事件处理功能',
      '大型项目开发',
    ],
    code: `// 使用Fabric.js的示例
const canvas = new fabric.Canvas('canvas');

// 创建图形对象
const circle = new fabric.Circle({
  radius: 50,
  fill: 'red',
  left: 100,
  top: 100
});

const rect = new fabric.Rect({
  width: 100,
  height: 80,
  fill: 'blue',
  left: 300,
  top: 150
});

// 添加到画布
canvas.add(circle, rect);

// 绑定事件处理
circle.on('mousedown', () => {
  console.log('Circle clicked!');
});

rect.on('mouseover', () => {
  rect.set('fill', 'green');
  canvas.renderAll();
});

rect.on('mouseout', () => {
  rect.set('fill', 'blue');
  canvas.renderAll();
});`,
    pros: [
      '专业的事件处理系统',
      '内置高性能碰撞检测',
      '支持复杂事件（拖拽、缩放、旋转）',
      '简化开发流程，提高生产力',
    ],
    cons: ['需要引入额外库', '增加项目体积', '学习曲线较陡峭', '灵活性受库的限制'],
  },
  {
    title: '混合方案',
    type: '综合方案',
    description: '结合多种技术，如使用四叉树优化碰撞检测，结合对象绑定和分层处理。',
    useCases: ['超大规模图形场景', '高性能要求的专业应用', '游戏开发', '复杂数据可视化'],
    code: `// 使用四叉树优化碰撞检测
const quadtree = new Quadtree({
  width: canvas.width,
  height: canvas.height
});

// 将图形对象插入四叉树
shapes.forEach(shape => {
  quadtree.insert(shape);
});

// 事件处理
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 使用四叉树查询可能的目标
  const candidates = quadtree.retrieve({
    x, y, width: 1, height: 1
  });

  // 在候选对象中精确检测
  for (const shape of candidates) {
    if (shape.containsPoint(x, y)) {
      // 处理悬停逻辑
      break;
    }
  }
});

// 使用对象绑定处理交互
class InteractiveShape {
  // 图形实现...
}`,
    pros: ['处理超大规模场景', '优化性能，减少计算量', '结合多种方案优势', '可扩展性强'],
    cons: ['实现复杂度高', '需要深入理解多种技术', '维护成本较高', '开发时间较长'],
  },
]
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.canvas-events-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        width: 60px;
        height: 60px;
        background: #3498db;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;
        flex-shrink: 0;

        i {
          font-size: 1.8rem;
          color: white;
        }
      }

      h3 {
        font-size: 1.4rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .methods {
    .method-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .method-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .method-header {
        padding: 1.2rem 1.5rem;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 1.4rem;
          margin: 0;
        }

        .method-type {
          background: white;
          color: #3498db;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
      }

      .method-content {
        padding: 1.5rem;

        p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .use-cases {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid #3498db;

          h4 {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;

            i {
              margin-right: 0.5rem;
              color: #27ae60;
            }
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
              line-height: 1.5;
            }
          }
        }

        .code-sample {
          background: #2c3e50;
          border-radius: 8px;
          padding: 1.2rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;

          pre {
            margin: 0;

            code {
              font-family: 'Fira Code', monospace;
              color: #e0e0e0;
              font-size: 0.9rem;
              line-height: 1.5;

              .hljs-keyword {
                color: #ff9a76;
              }

              .hljs-function {
                color: #82aaff;
              }

              .hljs-title {
                color: #82aaff;
              }

              .hljs-params {
                color: #e0e0e0;
              }
            }
          }
        }

        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;

          .pros,
          .cons {
            border-radius: 8px;
            padding: 1rem;
          }

          .pros {
            background: rgba(46, 204, 113, 0.1);
            border: 1px solid rgba(46, 204, 113, 0.3);

            h4 {
              display: flex;
              align-items: center;
              color: #27ae60;
              margin-top: 0;
              margin-bottom: 0.8rem;

              i {
                margin-right: 0.5rem;
              }
            }
          }

          .cons {
            background: rgba(231, 76, 60, 0.1);
            border: 1px solid rgba(231, 76, 60, 0.3);

            h4 {
              display: flex;
              align-items: center;
              color: #e74c3c;
              margin-top: 0;
              margin-bottom: 0.8rem;

              i {
                margin-right: 0.5rem;
              }
            }
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .demo-section {
    margin-bottom: 3rem;

    .demo-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 1.5rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .canvas-controls {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      .controls-group {
        margin-bottom: 2rem;

        &:last-child {
          margin-bottom: 0;
        }

        h3 {
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .buttons {
          display: grid;
          gap: 0.8rem;

          button {
            padding: 0.8rem;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;

            &.active {
              background: #3498db;
              color: white;
              border-color: #3498db;
            }

            &:hover:not(.active) {
              background: #edf2f7;
            }
          }
        }

        .status {
          .shape-status {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 0;
            border-bottom: 1px solid #f1f5f9;

            &:last-child {
              border-bottom: none;
            }

            .shape-name {
              font-weight: 500;
            }

            .shape-state {
              padding: 0.2rem 0.6rem;
              border-radius: 4px;
              font-size: 0.9rem;

              &.idle {
                background: #f1f5f9;
              }

              &.hovered {
                background: #d1fae5;
                color: #047857;
              }

              &.selected {
                background: #dbeafe;
                color: #1d4ed8;
              }
            }
          }
        }
      }
    }

    .canvas-area {
      canvas {
        display: block;
        width: 100%;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .demo-info {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        p {
          margin: 0.5rem 0;
          color: #4a5568;

          &:first-child {
            margin-top: 0;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .icon {
          width: 50px;
          height: 50px;
          background: #3498db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          i {
            font-size: 1.5rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            line-height: 1.5;
          }
        }
      }
    }

    .summary {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      .recommendation-table {
        overflow-x: auto;

        table {
          width: 100%;
          border-collapse: collapse;

          th,
          td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          th {
            background: #f8fafc;
            font-weight: 600;
            color: #2c3e50;
          }

          tbody tr:hover {
            background: #f8fafc;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .canvas-events-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
