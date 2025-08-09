<template>
  <div class="pie-chart-container">
    <div class="chart-header">
      <h2>{{ title }}</h2>
      <div class="legend">
        <div
          v-for="(item, index) in segments"
          :key="index"
          class="legend-item"
          :class="{ 'inactive': !item.active }"
          @click="toggleSegment(index)"
        >
          <div class="color-box" :style="{ backgroundColor: item.color }"></div>
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ item.value }} ({{ item.percentage }}%)</span>
        </div>
      </div>
    </div>

    <div class="chart-wrapper" ref="chartContainer">
      <canvas ref="canvas" @mousemove="handleMouseMove" @click="handleClick"></canvas>
      <div
        v-if="activeSegment"
        class="tooltip"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <div class="tooltip-header">{{ activeSegment.label }}</div>
        <div class="tooltip-content">
          值: {{ activeSegment.value }}<br>
          占比: {{ activeSegment.percentage }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '@/Function/CommonFun'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 定义类型
interface Segment {
  label: string
  value: number
  color: string
  percentage: number
  startAngle: number
  endAngle: number
  active: boolean
  animProgress: number
}

// 组件属性
const props = defineProps({
  data: {
    type: Array as () => Array<{ label: string; value: number }>,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: '数据分布'
  }
})

// 引用DOM元素
const canvas = ref<HTMLCanvasElement | null>(null)
const chartContainer = ref<HTMLDivElement | null>(null)

// 图表状态
const segments = ref<Segment[]>([])
const activeSegment = ref<Segment | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const animationFrame = ref<number | null>(null)
const devicePixelRatio = window.devicePixelRatio || 1

// 颜色集合
const colors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#F15BB5',
  '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5', '#00F5D4'
]

// 计算总数值
const totalValue = computed(() => {
  return segments.value.reduce((sum, segment) => {
    return segment.active ? sum + segment.value : sum
  }, 0)
})

// 初始化图表
const initChart = () => {
  if (!canvas.value || !chartContainer.value) return

  // 设置画布尺寸
  const container = chartContainer.value
  const size = Math.min(container.clientWidth, container.clientHeight - 40)

  // 高清处理
  canvas.value.width = size * devicePixelRatio
  canvas.value.height = size * devicePixelRatio
  canvas.value.style.width = size + 'px'
  canvas.value.style.height = size + 'px'
}

// 更新饼图数据
const updateChartData = () => {
  // 过滤掉值为0的数据项
  const validData = props.data.filter(item => item.value > 0)

  segments.value = validData.map((item, index) => {
    // 查找现有段中是否已有此项
    const existingSegment = segments.value.find(s => s.label === item.label)

    return {
      label: item.label,
      value: item.value,
      color: existingSegment?.color || colors[index % colors.length],
      percentage: 0,
      startAngle: 0,
      endAngle: 0,
      active: existingSegment?.active ?? true,
      animProgress: 0
    }
  })

  // 开始动画
  startAnimation()
}

// 动画处理
const startAnimation = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }

  // 重置动画进度
  segments.value.forEach(segment => {
    segment.animProgress = 0
  })

  const animate = () => {
    let allCompleted = true

    // 更新动画进度
    segments.value.forEach(segment => {
      if (segment.active && segment.animProgress < 1) {
        segment.animProgress = Math.min(segment.animProgress + 0.03, 1)
        allCompleted = false
      } else if (!segment.active && segment.animProgress > 0) {
        segment.animProgress = Math.max(segment.animProgress - 0.03, 0)
        allCompleted = false
      }
    })

    // 重新绘制
    drawChart()

    if (!allCompleted) {
      animationFrame.value = requestAnimationFrame(animate)
    } else {
      animationFrame.value = null
    }
  }

  animationFrame.value = requestAnimationFrame(animate)
}

// 绘制高清饼图
const drawChart = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // 高清处理
  ctx.scale(devicePixelRatio, devicePixelRatio)

  const visualSize = canvas.value.clientWidth
  const centerX = visualSize / 2
  const centerY = visualSize / 2
  const radius = Math.min(centerX, centerY) * 0.8
  const activeTotal = totalValue.value

  // 清除画布
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 绘制背景圆
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = '#f5f7fa'
  ctx.fill()
  ctx.strokeStyle = '#e4e7ed'
  ctx.lineWidth = 1
  ctx.stroke()

  // 绘制扇形
  let startAngle = -Math.PI / 2 // 从12点钟位置开始

  segments.value.forEach(segment => {
    if (segment.active && segment.animProgress > 0) {
      // 计算扇形的角度（使用动画进度）
      const segmentAngle = (segment.value / activeTotal) * Math.PI * 2 * segment.animProgress
      const endAngle = startAngle + segmentAngle

      // 保存当前角度供tooltip使用
      segment.startAngle = startAngle
      segment.endAngle = endAngle

      // 绘制扇形
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // 填充颜色
      ctx.fillStyle = segment.color
      ctx.fill()

      // 绘制边框
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // 计算百分比
      segment.percentage = activeTotal > 0
        ? Math.round((segment.value / activeTotal) * 100)
        : 0

      // 绘制标签
      if (segmentAngle > 0.1) {
        const midAngle = startAngle + segmentAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        // 绘制文字背景增强可读性
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
        ctx.beginPath()
        ctx.arc(labelX, labelY, 20, 0, Math.PI * 2)
        ctx.fill()

        // 绘制百分比文本
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 14px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`${segment.percentage}%`, labelX, labelY)
      }

      startAngle = endAngle
    }
  })

  // 绘制中心圆
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2)
  ctx.fillStyle = '#fff'
  ctx.fill()

  // 绘制中心文本
  ctx.fillStyle = '#606266'
  ctx.font = 'bold 18px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('总计', centerX, centerY - 10)

  ctx.fillStyle = '#409eff'
  ctx.font = 'bold 24px Arial'
  ctx.fillText(activeTotal.toLocaleString(), centerX, centerY + 15)

  // 重置缩放
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// 鼠标移动处理
const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  const mouseX = (e.clientX - rect.left) * devicePixelRatio
  const mouseY = (e.clientY - rect.top) * devicePixelRatio

  tooltipX.value = e.clientX
  tooltipY.value = e.clientY - 50

  const visualSize = canvas.value.clientWidth
  const centerX = visualSize / 2
  const centerY = visualSize / 2
  const radius = Math.min(centerX, centerY) * 0.8

  // 计算鼠标位置与中心的距离
  const dx = mouseX - centerX
  const dy = mouseY - centerY
  const distance = Math.sqrt(dx * dx + dy * dy)

  // 如果鼠标在饼图范围内
  if (distance <= radius * devicePixelRatio) {
    // 计算鼠标角度
    let angle = Math.atan2(dy, dx)
    if (angle < 0) angle += Math.PI * 2

    // 查找鼠标所在的扇形
    activeSegment.value = segments.value.find(segment => {
      if (!segment.active || segment.animProgress < 1) return false

      // 调整角度以匹配饼图起点（从12点钟位置开始）
      const adjustedAngle = (angle + Math.PI / 2) % (Math.PI * 2)

      // 检查角度是否在扇形范围内
      if (segment.startAngle <= segment.endAngle) {
        return adjustedAngle >= segment.startAngle && adjustedAngle <= segment.endAngle
      } else {
        return adjustedAngle >= segment.startAngle || adjustedAngle <= segment.endAngle
      }
    }) || null
  } else {
    activeSegment.value = null
  }
}

// 点击处理
const handleClick = () => {
  if (activeSegment.value) {
    const index = segments.value.findIndex(s => s.label === activeSegment.value?.label)
    if (index !== -1) {
      toggleSegment(index)
    }
  }
}

// 切换扇形状态
const toggleSegment = (index: number) => {
  segments.value[index].active = !segments.value[index].active
  startAnimation()
}

const handleResize = debounce(() => {
  // initChart()
  drawChart()
}, 300)

// 生命周期钩子
onMounted(() => {
  initChart()
  updateChartData()

  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('resize', handleResize)

  // 取消动画帧
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})

// 监听数据变化
watch(() => props.data, updateChartData, { deep: true })
</script>

<style lang="less" scoped>
.pie-chart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .chart-header {
    padding: 20px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;

    h2 {
      margin: 0 0 15px 0;
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;

      .legend-item {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        &.inactive {
          opacity: 0.6;
          text-decoration: line-through;
        }

        .color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          margin-right: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .label {
          font-weight: 500;
          margin-right: 8px;
          font-size: 0.95rem;
        }

        .value {
          font-size: 0.85rem;
          opacity: 0.9;
        }
      }
    }
  }

  .chart-wrapper {
    flex: 1;
    position: relative;
    padding: 20px;

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .tooltip {
      position: fixed;
      z-index: 100;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      pointer-events: none;
      transform: translate(-50%, -100%);
      backdrop-filter: blur(8px);
      min-width: 180px;
      transition: opacity 0.2s;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .tooltip-header {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 6px;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 6px;
      }

      .tooltip-content {
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }
}

@media (max-width: 768px) {
  .pie-chart-container {
    .chart-header {
      .legend {
        flex-direction: column;
        align-items: flex-start;

        .legend-item {
          width: 100%;
        }
      }
    }
  }
}
</style>
