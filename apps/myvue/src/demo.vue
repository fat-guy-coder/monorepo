<template>
  <div class="tree-container">
    <div class="controls">
      <select v-model="selectedTreeType" @change="generateTree">
        <option v-for="type in treeTypes" :key="type" :value="type">{{ type }}</option>
      </select>

      <div class="buttons">
        <button @click="generateTree">重新生成</button>
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="resetView">重置视图</button>
      </div>
    </div>

    <div class="canvas-wrapper">
      <canvas
        ref="treeCanvas"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @wheel="onZoom"
        @click="handleNodeClick"
      ></canvas>
    </div>

    <div class="tree-info">
      <h3>{{ selectedTreeType }} 结构信息</h3>
      <div v-if="selectedNode" class="node-details">
        <p><strong>节点值:</strong> {{ selectedNode.value }}</p>
        <template v-if="selectedTreeType === '红黑树'">
          <p>
            <strong>颜色:</strong>
            <span :class="['color', selectedNode.color]">{{ selectedNode.color }}</span>
          </p>
        </template>
        <template v-else-if="selectedTreeType === 'B树' || selectedTreeType === 'B+树'">
          <p><strong>键数量:</strong> {{ selectedNode.keys?.length }}</p>
          <p>
            <strong>子节点数量:</strong>
            {{ selectedNode.children ? selectedNode.children.length : 0 }}
          </p>
        </template>
        <template v-else-if="selectedTreeType === '字典树'">
          <p><strong>单词结束:</strong> {{ selectedNode?.isEnd ? '是' : '否' }}</p>
        </template>
      </div>
      <p v-else>点击节点查看详细信息</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 定义树类型
type TreeType =
  | '二叉树'
  | '二叉搜索树'
  | '自平衡二叉搜索树'
  | '红黑树'
  | 'B树'
  | 'B+树'
  | '字典树'
  | '有序树'
  | '无序树'

// 定义基础树节点接口
interface TreeNode {
  id: number
  value: number | string
  x?: number
  y?: number
  width?: number
  height?: number
  isEnd?: boolean
  keys?: number[]
  color?: 'red' | 'black'
  length?: number
  children?: TreeNode[] | { [key: string]: TreeNode }
}

// 当前选中的树类型
const selectedTreeType = ref<TreeType>('二叉树')
const treeTypes: TreeType[] = [
  '二叉树',
  '二叉搜索树',
  '自平衡二叉搜索树',
  '红黑树',
  'B树',
  'B+树',
  '字典树',
  '有序树',
  '无序树',
]

// Canvas 引用和上下文
const treeCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

// 树数据
const treeData = ref<TreeNode | null>(null)
const selectedNode = ref<TreeNode | null>(null)

// 视图参数
const zoomLevel = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)

// 生成树数据
const generateTree = () => {
  selectedNode.value = null

  switch (selectedTreeType.value) {
    case '二叉树':
      treeData.value = generateBinaryTree()
      break
    case '二叉搜索树':
      treeData.value = generateBST()
      break
    case '自平衡二叉搜索树':
      treeData.value = generateBalancedBST()
      break
    case '红黑树':
      treeData.value = generateRedBlackTree()
      break
    case 'B树':
      treeData.value = generateBTree()
      break
    case 'B+树':
      treeData.value = generateBPlusTree()
      break
    case '字典树':
      treeData.value = generateTrie()
      break
    case '有序树':
      treeData.value = generateOrderedTree()
      break
    case '无序树':
      treeData.value = generateUnorderedTree()
      break
    default:
      treeData.value = generateBinaryTree()
  }

  calculateLayout(treeData.value)
  drawTree()
}

// 生成二叉树
const generateBinaryTree = (): TreeNode => {
  return {
    id: 1,
    value: 50,
    children: [
      {
        id: 2,
        value: 30,
        children: [
          { id: 4, value: 20 },
          { id: 5, value: 40 },
        ],
      },
      {
        id: 3,
        value: 70,
        children: [
          { id: 6, value: 60 },
          { id: 7, value: 80 },
        ],
      },
    ],
  }
}

// 生成二叉搜索树
const generateBST = (): TreeNode => {
  return {
    id: 1,
    value: 50,
    children: [
      {
        id: 2,
        value: 30,
        children: [
          { id: 4, value: 20 },
          { id: 5, value: 40 },
        ],
      },
      {
        id: 3,
        value: 70,
        children: [
          { id: 6, value: 60 },
          { id: 7, value: 80 },
        ],
      },
    ],
  }
}

// 生成自平衡二叉搜索树
const generateBalancedBST = (): TreeNode => {
  return {
    id: 1,
    value: 50,
    children: [
      {
        id: 2,
        value: 30,
        children: [
          { id: 4, value: 20 },
          { id: 5, value: 40 },
        ],
      },
      {
        id: 3,
        value: 70,
        children: [
          { id: 6, value: 60 },
          { id: 7, value: 80 },
        ],
      },
    ],
  }
}

// 生成红黑树
const generateRedBlackTree = (): TreeNode => {
  return {
    id: 1,
    value: 50,
    color: 'black',
    children: [
      {
        id: 2,
        value: 30,
        color: 'red',
        children: [
          { id: 4, value: 20, color: 'black' },
          { id: 5, value: 40, color: 'black' },
        ],
      },
      {
        id: 3,
        value: 70,
        color: 'red',
        children: [
          { id: 6, value: 60, color: 'black' },
          { id: 7, value: 80, color: 'black' },
        ],
      },
    ],
  }
}

// 生成B树
const generateBTree = (): TreeNode => {
  return {
    id: 1,
    value: 'Node 1',
    keys: [20, 40],
    children: [
      {
        id: 2,
        value: 'Node 2',
        keys: [10, 15],
        children: [
          { id: 5, value: 'Node 5', keys: [5, 8] },
          { id: 6, value: 'Node 6', keys: [12, 14] },
          { id: 7, value: 'Node 7', keys: [16, 18] },
        ],
      },
      {
        id: 3,
        value: 'Node 3',
        keys: [25, 30],
        children: [
          { id: 8, value: 'Node 8', keys: [22, 24] },
          { id: 9, value: 'Node 9', keys: [27, 29] },
          { id: 10, value: 'Node 10', keys: [32, 35] },
        ],
      },
      {
        id: 4,
        value: 'Node 4',
        keys: [50, 60],
        children: [
          { id: 11, value: 'Node 11', keys: [45, 48] },
          { id: 12, value: 'Node 12', keys: [55, 58] },
          { id: 13, value: 'Node 13', keys: [65, 70] },
        ],
      },
    ],
  }
}

// 生成B+树
const generateBPlusTree = (): TreeNode => {
  return {
    id: 1,
    value: 'Node 1',
    keys: [20, 40],
    children: [
      {
        id: 2,
        value: 'Node 2',
        keys: [10, 15],
        children: [
          { id: 5, value: 'Node 5', keys: [5, 8] },
          { id: 6, value: 'Node 6', keys: [12, 14] },
          { id: 7, value: 'Node 7', keys: [16, 18] },
        ],
      },
      {
        id: 3,
        value: 'Node 3',
        keys: [25, 30],
        children: [
          { id: 8, value: 'Node 8', keys: [22, 24] },
          { id: 9, value: 'Node 9', keys: [27, 29] },
          { id: 10, value: 'Node 10', keys: [32, 35] },
        ],
      },
      {
        id: 4,
        value: 'Node 4',
        keys: [50, 60],
        children: [
          { id: 11, value: 'Node 11', keys: [45, 48] },
          { id: 12, value: 'Node 12', keys: [55, 58] },
          { id: 13, value: 'Node 13', keys: [65, 70] },
        ],
      },
    ],
  }
}

// 生成字典树
const generateTrie = (): TreeNode => {
  return {
    id: 1,
    value: '',
    isEnd: false,
    children: {
      c: {
        id: 2,
        value: 'c',
        isEnd: false,
        children: {
          a: {
            id: 3,
            value: 'a',
            isEnd: false,
            children: {
              t: {
                id: 4,
                value: 't',
                isEnd: true,
                children: {},
              },
            },
          },
          o: {
            id: 5,
            value: 'o',
            isEnd: false,
            children: {
              d: {
                id: 6,
                value: 'd',
                isEnd: true,
                children: {
                  e: {
                    id: 7,
                    value: 'e',
                    isEnd: true,
                    children: {},
                  },
                },
              },
            },
          },
        },
      },
      d: {
        id: 8,
        value: 'd',
        isEnd: false,
        children: {
          o: {
            id: 9,
            value: 'o',
            isEnd: false,
            children: {
              g: {
                id: 10,
                value: 'g',
                isEnd: true,
                children: {},
              },
            },
          },
        },
      },
    },
  }
}

// 生成有序树
const generateOrderedTree = (): TreeNode => {
  return {
    id: 1,
    value: 'A',
    children: [
      {
        id: 2,
        value: 'B',
        children: [
          { id: 4, value: 'D' },
          { id: 5, value: 'E' },
        ],
      },
      {
        id: 3,
        value: 'C',
        children: [
          { id: 6, value: 'F' },
          { id: 7, value: 'G' },
        ],
      },
    ],
  }
}

// 生成无序树
const generateUnorderedTree = (): TreeNode => {
  return {
    id: 1,
    value: 'Root',
    children: [
      {
        id: 2,
        value: 'Child 1',
        children: [
          { id: 4, value: 'Grandchild 1' },
          { id: 5, value: 'Grandchild 2' },
        ],
      },
      {
        id: 3,
        value: 'Child 2',
        children: [{ id: 6, value: 'Grandchild 3' }],
      },
      {
        id: 7,
        value: 'Child 3',
        children: [
          { id: 8, value: 'Grandchild 4' },
          { id: 9, value: 'Grandchild 5' },
          { id: 10, value: 'Grandchild 6' },
        ],
      },
    ],
  }
}

// 计算树布局
const calculateLayout = (node: TreeNode | null, depth = 0, index = 0, parentX = 0, parentY = 0) => {
  if (!node) return

  const canvas = treeCanvas.value
  if (!canvas) return

  // 计算节点位置
  const horizontalSpacing = 120 * zoomLevel.value
  const verticalSpacing = 100 * zoomLevel.value

  if (depth === 0) {
    // 根节点位置
    node.x = canvas.width / 2 + offsetX.value
    node.y = 80 + offsetY.value
  } else {
    // 子节点位置
    const direction = index % 2 === 0 ? -1 : 1
    const levelFactor = Math.pow(2, depth)

    node.x = parentX + direction * horizontalSpacing * (levelFactor / Math.pow(2, index + 1))
    node.y = parentY + verticalSpacing
  }

  // 设置节点大小
  node.width = 60 * zoomLevel.value
  node.height = 40 * zoomLevel.value

  // 递归计算子节点位置
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child, i) => {
      calculateLayout(child, depth + 1, i, node.x, node.y)
    })
  } else if (node.children && typeof node.children === 'object') {
    Object.values(node.children).forEach((child, i) => {
      calculateLayout(child, depth + 1, i, node.x, node.y)
    })
  }
}

// 绘制树
const drawTree = () => {
  const canvas = treeCanvas.value
  if (!canvas || !ctx) return

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制背景
  ctx.fillStyle = '#f8f9fa'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制树
  drawNode(treeData.value)
}

// 绘制节点
const drawNode = (node: TreeNode | null) => {
  if (!node) return

  // 先绘制子节点（连接线需要画在节点下面）
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child) => {
      drawNode(child)

      // 绘制连接线
      if (
        node.x !== undefined &&
        node.y !== undefined &&
        child.x !== undefined &&
        child.y !== undefined
      ) {
        ctx!.beginPath()
        ctx!.moveTo(node.x, node.y + (node.height || 0) / 2)
        ctx!.lineTo(child.x, child.y - (child.height || 0) / 2)
        ctx!.strokeStyle = '#6c757d'
        ctx!.lineWidth = 2
        ctx!.stroke()
      }
    })
  } else if (node.children && typeof node.children === 'object') {
    Object.values(node.children).forEach((child) => {
      drawNode(child)
    })
  }

  // 绘制当前节点
  if (node.x !== undefined && node.y !== undefined) {
    const isSelected = selectedNode.value && selectedNode.value.id === node.id

    // 节点背景
    if (selectedTreeType.value === '红黑树') {
      const rbNode = node as TreeNode
      ctx!.fillStyle = rbNode.color === 'red' ? '#dc3545' : '#343a40'
    } else if (selectedTreeType.value === 'B树' || selectedTreeType.value === 'B+树') {
      ctx!.fillStyle = '#0d6efd'
    } else if (selectedTreeType.value === '字典树') {
      const trieNode = node as TreeNode
      ctx!.fillStyle = trieNode.isEnd ? '#198754' : '#0dcaf0'
    } else {
      ctx!.fillStyle = isSelected ? '#ffc107' : '#0dcaf0'
    }

    // 绘制节点矩形
    ctx!.beginPath()
    ctx!.roundRect(
      node.x - (node.width || 0) / 2,
      node.y - (node.height || 0) / 2,
      node.width || 0,
      node.height || 0,
      8,
    )
    ctx!.fill()

    // 边框
    ctx!.strokeStyle = isSelected ? '#ffc107' : '#6c757d'
    ctx!.lineWidth = isSelected ? 3 : 2
    ctx!.stroke()

    // 节点文本
    ctx!.fillStyle = '#fff'
    ctx!.font = `${14 * zoomLevel.value}px Arial`
    ctx!.textAlign = 'center'
    ctx!.textBaseline = 'middle'

    // 对于B树，显示键值
    if (selectedTreeType.value === 'B树' || selectedTreeType.value === 'B+树') {
      const bNode = node as TreeNode
      ctx!.fillText(bNode?.keys?.join(', ') || '', node.x, node.y)
    } else {
      ctx!.fillText(String(node.value), node.x, node.y)
    }
  }
}

// 查找节点
const findNode = (x: number, y: number, node: TreeNode | null): TreeNode | null => {
  if (!node) return null

  // 检查当前节点
  if (
    node.x !== undefined &&
    node.y !== undefined &&
    node.width !== undefined &&
    node.height !== undefined
  ) {
    const halfWidth = node.width / 2
    const halfHeight = node.height / 2

    if (
      x >= node.x - halfWidth &&
      x <= node.x + halfWidth &&
      y >= node.y - halfHeight &&
      y <= node.y + halfHeight
    ) {
      return node
    }
  }

  // 检查子节点
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNode(x, y, child)
      if (found) return found
    }
  } else if (node.children && typeof node.children === 'object') {
    for (const child of Object.values(node.children)) {
      const found = findNode(x, y, child)
      if (found) return found
    }
  }

  return null
}

// 处理节点点击
const handleNodeClick = (event: MouseEvent) => {
  if (!treeCanvas.value) return

  const rect = treeCanvas.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / zoomLevel.value - offsetX.value
  const y = (event.clientY - rect.top) / zoomLevel.value - offsetY.value

  selectedNode.value = findNode(x, y, treeData.value)
  drawTree()
}

// 开始拖拽
const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  dragOffsetX.value = offsetX.value
  dragOffsetY.value = offsetY.value
}

// 拖拽中
const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  offsetX.value = dragOffsetX.value + (event.clientX - dragStartX.value)
  offsetY.value = dragOffsetY.value + (event.clientY - dragStartY.value)

  calculateLayout(treeData.value)
  drawTree()
}

// 结束拖拽
const endDrag = () => {
  isDragging.value = false
}

// 缩放处理
const onZoom = (event: WheelEvent) => {
  event.preventDefault()

  const delta = event.deltaY > 0 ? -0.1 : 0.1
  zoomLevel.value = Math.max(0.5, Math.min(2, zoomLevel.value + delta))

  calculateLayout(treeData.value)
  drawTree()
}

// 放大视图
const zoomIn = () => {
  zoomLevel.value = Math.min(2, zoomLevel.value + 0.1)
  calculateLayout(treeData.value)
  drawTree()
}

// 缩小视图
const zoomOut = () => {
  zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.1)
  calculateLayout(treeData.value)
  drawTree()
}

// 重置视图
const resetView = () => {
  zoomLevel.value = 1
  offsetX.value = 0
  offsetY.value = 0
  selectedNode.value = null

  calculateLayout(treeData.value)
  drawTree()
}

// 初始化画布
const initCanvas = () => {
  if (!treeCanvas.value) return

  // 设置画布尺寸
  treeCanvas.value.width = treeCanvas.value.offsetWidth
  treeCanvas.value.height = treeCanvas.value.offsetHeight

  // 获取上下文
  ctx = treeCanvas.value.getContext('2d')

  // 生成初始树
  generateTree()
}

// 组件挂载时初始化
onMounted(() => {
  initCanvas()

  // 窗口大小变化时重新初始化
  window.addEventListener('resize', initCanvas)
})

// 清理事件监听器
watch(
  () => treeCanvas.value,
  () => {
    return () => {
      window.removeEventListener('resize', initCanvas)
    }
  },
)
</script>

<style scoped lang="less">
.tree-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  select {
    padding: 10px 15px;
    border: 2px solid #0dcaf0;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    color: #343a40;
    outline: none;
    transition: all 0.3s;
    width: 250px;

    &:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
    }
  }

  .buttons {
    display: flex;
    gap: 10px;

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      background: #0dcaf0;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #0d6efd;
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

.canvas-wrapper {
  flex: 1;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  canvas {
    width: 100%;
    height: 100%;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

.tree-info {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  h3 {
    margin-top: 0;
    color: #343a40;
    border-bottom: 2px solid #0dcaf0;
    padding-bottom: 10px;
  }

  .node-details {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;

    p {
      margin: 8px 0;
      font-size: 16px;

      strong {
        color: #0d6efd;
      }
    }

    .color {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      color: white;
      font-weight: bold;

      &.red {
        background: #dc3545;
      }

      &.black {
        background: #343a40;
      }
    }
  }
}
</style>
