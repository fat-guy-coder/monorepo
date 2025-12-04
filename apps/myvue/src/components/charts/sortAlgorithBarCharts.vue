<template>
  <div class="sorting-visualizer">
    <div class="controls">
      <div class="control-group">
        <label for="arraySize">数组大小:</label>
        <Input
          id="arraySize"
          type="range"
          min="5"
          max="100"
          v-model:value="arraySize"
          @change="generateRandomArray"
        />
        <span>5-100</span>
        <span>当前数值:{{ arraySize }}</span>
      </div>

      <div class="control-group">
        <label for="valueRange">数值范围:</label>
        <Input
          id="valueRange"
          type="range"
          min="50"
          max="2000"
          v-model:value="valueRange"
          @change="generateRandomArray"
        />
        <span>50-2000</span>
        <span>当前数值:{{ valueRange }}</span>
      </div>

      <div class="control-group">
        <label for="valueRange">速度:</label>
        <Input id="delay" type="range" min="50" max="2000" v-model:value="delay" />
        <span>50-2000ms</span>
        <span>当前数值:{{ delay }}</span>
      </div>

      <div class="control-group">
        <label for="algorithm">排序算法:</label>
        <Select
          id="algorithm"
          style="width: 100px"
          v-model:value="selectedAlgorithm"
          :options="algorithms.map((item) => ({ label: item, value: item }))"
          :default-value="selectedAlgorithm"
        >
        </Select>
      </div>

      <button @click="generateRandomArray" :disabled="!stopSortingStatus && isSorting">
        重新生成
      </button>
      <button @click="start" :disabled="isSorting">开始排序</button>
      <button @click="stopOrContinueSorting" :disabled="!isSorting">
        {{ stopSortingStatus ? '继续' : '停止' }}
      </button>
    </div>

    <div class="canvas-container">
      <canvas ref="canvas"></canvas>
    </div>

    <div class="stats">
      <span>比较次数: {{ stats.comparisons }}</span>
      <span>交换次数: {{ stats.swaps }}</span>
      <span>耗时: {{ stats.time }}ms</span>
    </div>
    <div class="log">
      <div class="log-title">
        <div>排序日志</div>
        <div>
          <Select
            style="width: 100px"
            v-model="logCount"
            :options="logCountOptions"
            :default-value="10"
          />
          <Button type="primary" @click="clearLog">清空日志</Button>
        </div>
      </div>
      <div class="log-header">
        <div>排序算法</div>
        <div>排序时间</div>
        <div>交换次数</div>
        <div>比较次数</div>
      </div>
      <div v-for="(item, index) in log" :key="index" class="log-item">
        <div>{{ item.sortAlgorithm }}</div>
        <div>{{ item.sortTime }}ms</div>
        <div>{{ item.swap }}</div>
        <div>{{ item.compare }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input, Select, Button } from '@/components'
import { ref, onMounted, watch, onUnmounted } from 'vue'
// import { debounce } from '@/Function/CommonFun'

// 定义类型
type SortingAlgorithm = (array: number[], updateFn: UpdateFunction) => Promise<void>
type UpdateFunction = (arr: number[], comparisons: number, swaps: number) => void

// 组件状态
const arraySize = ref(15)
const valueRange = ref(100)

const selectedAlgorithm = defineModel('selectedAlgorithm', {
  type: String,
  default: '冒泡排序',
})

const isSorting = ref(false)
const animationId = ref(0)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const delay = ref(200)

const logCount = ref(10)

const logCountOptions = ref([
  { label: '10条', value: 10 },
  { label: '20条', value: 20 },
  { label: '30条', value: 30 },
  { label: '40条', value: 40 },
  { label: '50条', value: 50 },
  { label: '60条', value: 60 },
  { label: '70条', value: 70 },
  { label: '80条', value: 80 },
  { label: '90条', value: 90 },
  { label: '100条', value: 100 },
])

const clearLog = () => {
  log.value = []
}

export interface LogItem {
  swap: number
  compare: number
  sortAlgorithm: string
  sortTime: number
}

const log = defineModel('log', {
  type: Array<LogItem>,
  default: () => [],
})

// 统计数据
const stats = ref({
  comparisons: 0,
  swaps: 0,
  time: 0,
})

// 当前数组和显示数组
const originalArray = ref<number[]>([])
const displayArray = ref<number[]>([])

// 支持的排序算法
const algorithms = ref([
  '冒泡排序',
  '选择排序',
  '插入排序',
  '希尔排序',
  '快速排序',
  '归并排序',
  '堆排序',
  '计数排序',
  '基数排序',
  '桶排序',
  'tim排序',
  '锦标赛排序',
])

// 动画状态
const animationState = ref({
  active: false,
  fromIndex: -1,
  toIndex: -1,
  startTime: 0,
  progress: 0,
  values: [] as number[],
})

// 初始化画布
const initCanvas = () => {
  if (!canvas.value) return

  // 设置画布尺寸

  // if (width) {
  //   canvas.value.width = width
  //   canvas.value.height = (width * 9) / 16
  // } else {
  //   canvas.value.width = 1000
  //   canvas.value.height = 562.5
  // }
  canvas.value.width = 1000
  canvas.value.height = 562.5
  // 获取上下文
  ctx.value = canvas.value.getContext('2d')
  // 绘制初始状态
  drawBars()
}

const isReset = ref<boolean>(false)

// 生成随机数组
const generateRandomArray = () => {
  isReset.value = true
  // 重置状态
  isSorting.value = false
  haveBeenBreak.value = false
  stopSortingStatus.value = false
  animationState.value.active = false
  const arr: number[] = []
  for (let i = 0; i < arraySize.value; i++) {
    arr.push(Math.floor(Math.random() * valueRange.value) + 1)
  }
  originalArray.value = [...arr]
  displayArray.value = [...arr]
  stats.value = { comparisons: 0, swaps: 0, time: 0 }

  if (canvas.value) {
    drawBars()
  }
}

// 绘制柱状图
// 绘制柱状图
const drawBars = () => {
  if (!ctx.value || !canvas.value) return

  const { width, height } = canvas.value
  const barCount = displayArray.value.length
  const maxValue = Math.max(...displayArray.value)
  if (maxValue === 0) return // 避免除以零错误

  // 计算柱状图参数
  const barWidth = width / barCount
  const spacing = barWidth * 0.1
  const actualBarWidth = barWidth - spacing

  // 清除画布
  ctx.value.clearRect(0, 0, width, height)

  // 如果有动画正在进行，特殊处理
  if (animationState.value.active) {
    const { fromIndex, toIndex, progress, values } = animationState.value

    for (let i = 0; i < barCount; i++) {
      // 跳过正在动画的元素
      if (i === fromIndex || i === toIndex) continue

      const barHeight = (displayArray.value[i] / maxValue) * (height - 40)
      const x = i * barWidth + spacing / 2
      const y = height - barHeight

      drawBar(x, y, actualBarWidth, barHeight, displayArray.value[i])
    }

    // 绘制动画中的柱子
    const fromValue = values[0]
    const toValue = values[1]

    // 计算动画柱子的位置
    const fromX = fromIndex * barWidth + spacing / 2
    const toX = toIndex * barWidth + spacing / 2
    const currentX = fromX + (toX - fromX) * progress

    const targetX = toX + (fromX - toX) * progress

    // 绘制移动中的柱子
    const fromBarHeight = (fromValue / maxValue) * (height - 40)
    const toBarHeight = (toValue / maxValue) * (height - 40)

    // 第一个柱子
    drawBar(currentX, height - fromBarHeight, actualBarWidth, fromBarHeight, fromValue)

    // 第二个柱子
    drawBar(targetX, height - toBarHeight, actualBarWidth, toBarHeight, toValue)
  } else {
    // 绘制所有柱子
    for (let i = 0; i < barCount; i++) {
      const barHeight = (displayArray.value[i] / maxValue) * (height - 40)
      const x = i * barWidth + spacing / 2
      const y = height - barHeight

      drawBar(x, y, actualBarWidth, barHeight, displayArray.value[i])
    }
  }

  // 添加排序算法名称
  ctx.value.fillStyle = '#333'
  ctx.value.font = '16px Arial'
  ctx.value.textAlign = 'left'
  ctx.value.fillText(`算法: ${selectedAlgorithm.value}`, 10, 20)

  // 添加统计数据
  ctx.value.fillText(`比较次数: ${stats.value.comparisons}`, 10, 40)
  ctx.value.fillText(`交换次数: ${stats.value.swaps}`, 10, 60)
  // ctx.value.fillText(`耗时: ${stats.value.time}ms`, 10, 80)
  const time = isSorting.value === false ? 0 : performance.now() - animationStartTime.value
  ctx.value.fillText(`耗时: ${time}ms`, 10, 100)
}

// 绘制单个柱子
// 绘制单个柱子
const drawBar = (x: number, y: number, width: number, height: number, value: number) => {
  if (!ctx.value) return

  // 确保宽度至少为1像素
  const barWidth = Math.max(1, width)

  // 绘制柱子
  ctx.value.fillStyle = getBarColor(value)
  ctx.value.fillRect(x, y, barWidth, height)

  // 绘制边框
  ctx.value.strokeStyle = '#333'
  ctx.value.lineWidth = 1
  ctx.value.strokeRect(x, y, barWidth, height)

  // 绘制数值（只在柱子足够高时绘制）
  if (height > 20 && barWidth > 10) {
    ctx.value.fillStyle = '#000' // 白色文本更易读
    ctx.value.font = `${Math.min(12, barWidth * 0.8)}px Arial`
    ctx.value.textAlign = 'center'
    ctx.value.textBaseline = 'bottom'

    // 创建文本阴影增强可读性
    ctx.value.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.value.shadowBlur = 2
    ctx.value.shadowOffsetX = 1
    ctx.value.shadowOffsetY = 1

    // 确保文本不会超出柱子顶部
    const textY = Math.max(y - 5, 15)
    ctx.value.fillText(value.toString(), x + barWidth / 2, textY)

    // 重置阴影
    ctx.value.shadowColor = 'transparent'
    ctx.value.shadowBlur = 0
    ctx.value.shadowOffsetX = 0
    ctx.value.shadowOffsetY = 0
  }
}

// 获取柱子颜色 (基于值)
const getBarColor = (value: number) => {
  const hue = (value / valueRange.value) * 240 // 从蓝色到红色
  return `hsl(${hue}, 70%, 60%)`
}

// 更新数组显示
const updateDisplay = (arr: number[], comparisons: number, swaps: number) => {
  displayArray.value = [...arr]
  stats.value.comparisons = comparisons
  stats.value.swaps = swaps

  // 使用动画帧平滑过渡
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }

  const animate = () => {
    drawBars()
    animationId.value = requestAnimationFrame(animate)
  }

  animationId.value = requestAnimationFrame(animate)
}

// 执行动画
const animateSwap = (fromIndex: number, toIndex: number, duration: number): Promise<void> => {
  return new Promise((resolve) => {
    animationState.value = {
      active: true,
      fromIndex,
      toIndex,
      startTime: performance.now(),
      progress: 0,
      values: [displayArray.value[fromIndex], displayArray.value[toIndex]],
    }

    const animate = () => {
      const elapsed = performance.now() - animationState.value.startTime
      animationState.value.progress = Math.min(elapsed / duration, 1)

      drawBars()

      if (animationState.value.progress < 1) {
        requestAnimationFrame(animate)
      } else {
        animationState.value.active = false
        resolve()
      }
    }

    requestAnimationFrame(animate)
  })
}

// 排序算法实现
const sortingAlgorithms: Record<string, SortingAlgorithm> = {
  // 冒泡排序
  async 冒泡排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++

        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        // 高亮比较的元素
        if (array[j] > array[j + 1]) {
          // 执行动画
          await animateSwap(j, j + 1, delay.value)

          // 交换元素
          ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
          swaps++

          //停止排序
          if (stopSortingStatus.value || !isSorting.value) {
            return
          }

          // 更新显示
          updateFn([...array], comparisons, swaps)
        }
      }
    }
  },

  // 选择排序
  async 选择排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i

      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

      for (let j = i + 1; j < n; j++) {
        comparisons++

        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        if (array[j] < array[minIndex]) {
          minIndex = j
        }
      }

      if (minIndex !== i) {
        // 执行动画
        await animateSwap(i, minIndex, delay.value)

        // 交换元素
        ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
        swaps++

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        // 更新显示
        updateFn([...array], comparisons, swaps)
      }
    }
  },

  // 插入排序
  async 插入排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    for (let i = 1; i < n; i++) {
      let j = i
      const current = array[i]

      while (j > 0 && array[j - 1] > current) {
        comparisons++

        // 执行动画
        await animateSwap(j, j - 1, delay.value)

        array[j] = array[j - 1]
        swaps++
        j--

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        // 更新显示
        updateFn([...array], comparisons, swaps)
      }

      array[j] = current
      swaps++

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

      // 更新显示
      updateFn([...array], comparisons, swaps)
    }
  },

  // 希尔排序
  async 希尔排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = array[i]
        let j = i

        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          await animateSwap(j, j - gap, delay.value)
          array[j] = array[j - gap]
          swaps++
        }
        array[j] = temp
        comparisons++
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }
        updateFn([...array], comparisons, swaps)
      }
    }

    updateFn([...array], comparisons, swaps)
  },

  // 快速排序
  async 快速排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0

    async function quickSort(arr: number[], left: number, right: number) {
      if (left >= right) return

      const pivotIndex = await partition(arr, left, right)
      await quickSort(arr, left, pivotIndex! - 1)
      await quickSort(arr, pivotIndex! + 1, right)
    }

    async function partition(arr: number[], left: number, right: number) {
      const pivot = arr[right]
      let i = left

      for (let j = left; j < right; j++) {
        comparisons++
        if (arr[j] < pivot) {
          // 执行动画
          await animateSwap(i, j, delay.value)
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          swaps++
          i++

          //停止排序
          if (stopSortingStatus.value || !isSorting.value) {
            return
          }

          // 更新显示
          updateFn([...arr], comparisons, swaps)
        }
      }

      // 执行动画
      await animateSwap(i, right, delay.value)
      ;[arr[i], arr[right]] = [arr[right], arr[i]]
      swaps++

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, 50))
      updateFn([...arr], comparisons, swaps)

      return i
    }

    await quickSort(array, 0, array.length - 1)
  },

  // 归并排序
  async 归并排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0

    async function mergeSort(arr: number[]): Promise<number[]> {
      if (arr.length <= 1) return arr

      const mid = Math.floor(arr.length / 2)
      const left = await mergeSort(arr.slice(0, mid))
      const right = await mergeSort(arr.slice(mid))

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return []
      }

      return merge(left, right) as unknown as number[]
    }

    async function merge(left: number[], right: number[]) {
      const result: number[] = []
      let i = 0,
        j = 0

      while (i < left.length && j < right.length) {
        comparisons++
        if (left[i] < right[j]) {
          result.push(left[i])
          i++
        } else {
          result.push(right[j])
          j++
        }

        swaps++

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        // 归并排序的动画处理不同，这里简化处理
        await new Promise((resolve) => setTimeout(resolve, delay.value))

        // 更新显示 (合并当前结果和剩余部分)
        const tempArray = [...result, ...left.slice(i), ...right.slice(j)]
        updateFn(tempArray, comparisons, swaps)
      }

      return [...result, ...left.slice(i), ...right.slice(j)]
    }

    const sorted = await mergeSort(array)
    array.splice(0, array.length, ...sorted)
    updateFn([...array], comparisons, swaps)
  },

  // 堆排序
  async 堆排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    // 构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i)
    }

    // 一个个提取元素
    for (let i = n - 1; i > 0; i--) {
      // 移动当前根到末尾
      // 执行动画
      await animateSwap(0, i, delay.value)
      ;[array[0], array[i]] = [array[i], array[0]]
      swaps++

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value))
      updateFn([...array], comparisons, swaps)

      // 对缩小后的堆调用 heapify
      await heapify(array, i, 0)
    }

    async function heapify(arr: number[], n: number, i: number) {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      comparisons++
      if (left < n && arr[left] > arr[largest]) {
        largest = left
      }

      comparisons++
      if (right < n && arr[right] > arr[largest]) {
        largest = right
      }

      if (largest !== i) {
        // 执行动画
        await animateSwap(i, largest, delay.value)
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        swaps++

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        // 更新显示
        await new Promise((resolve) => setTimeout(resolve, 100))
        updateFn([...arr], comparisons, swaps)

        await heapify(arr, n, largest)
      }
    }
  },
  // 计数排序
  async 计数排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length
    const max = Math.max(...array)

    // 创建计数数组
    const count = new Array(max + 1).fill(0)

    // 统计每个元素出现的次数
    for (let i = 0; i < n; i++) {
      count[array[i]]++
      comparisons++

      if (stopSortingStatus.value || !isSorting.value) return

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...array], comparisons, swaps)
    }

    // 计算元素最终位置
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1]

      if (stopSortingStatus.value || !isSorting.value) return
    }

    // 创建输出数组
    const output = new Array(n)

    // 构建输出数组
    for (let i = n - 1; i >= 0; i--) {
      const value = array[i]
      const position = count[value] - 1

      // 执行动画
      await animateSwap(i, position, delay.value)

      output[position] = value
      count[value]--
      swaps++

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...output, ...array.slice(output.length)], comparisons, swaps)

      if (stopSortingStatus.value || !isSorting.value) return
    }

    // 复制回原数组
    for (let i = 0; i < n; i++) {
      array[i] = output[i]

      if (stopSortingStatus.value || !isSorting.value) return

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...array], comparisons, swaps)
    }
  },

  // 基数排序
  async 基数排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const max = Math.max(...array)

    // 获取最大数字的位数
    const maxDigits = Math.floor(Math.log10(max)) + 1 || 1

    for (let digit = 0; digit < maxDigits; digit++) {
      // 创建10个桶 (0-9)
      const buckets = Array.from({ length: 10 }, () => [])

      // 将数字分配到桶中
      for (let i = 0; i < array.length; i++) {
        const num = array[i]
        const digitValue = Math.floor(num / Math.pow(10, digit)) % 10
        buckets[digitValue].push(num as never)
        comparisons++

        if (stopSortingStatus.value || !isSorting.value) return
      }

      // 从桶中收集数字
      let index = 0
      for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          // 执行动画
          const originalIndex = array.indexOf(buckets[i][j])
          if (originalIndex !== -1 && originalIndex !== index) {
            await animateSwap(originalIndex, index, delay.value)
          }

          array[index] = buckets[i][j]
          index++
          swaps++

          // 更新显示
          await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
          updateFn([...array], comparisons, swaps)

          if (stopSortingStatus.value || !isSorting.value) return
        }
      }
    }
  },

  // 桶排序
  async 桶排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length
    const max = Math.max(...array)
    const min = Math.min(...array)
    const bucketSize = 5 // 每个桶的大小

    // 计算桶的数量
    const bucketCount = Math.floor((max - min) / bucketSize) + 1
    const buckets = Array.from({ length: bucketCount }, () => [])

    // 将元素分配到桶中
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((array[i] - min) / bucketSize)
      buckets[bucketIndex].push(array[i] as never)
      comparisons++

      if (stopSortingStatus.value || !isSorting.value) return

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...array], comparisons, swaps)
    }

    // 对每个桶进行排序（使用插入排序）
    let index = 0
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i]

      // 对当前桶进行插入排序
      for (let j = 1; j < bucket.length; j++) {
        let k = j
        const current = bucket[j]

        while (k > 0 && bucket[k - 1] > current) {
          // 桶内动画
          await animateSwap(index + k - 1, index + k, delay.value)

          bucket[k] = bucket[k - 1]
          k--
          swaps++

          if (stopSortingStatus.value || !isSorting.value) return
        }

        bucket[k] = current
        swaps++

        // 更新整个数组显示
        const flatArray = buckets.flat()
        // await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...flatArray], comparisons, swaps)
      }

      // 收集桶中的元素
      for (let j = 0; j < bucket.length; j++) {
        array[index] = bucket[j]
        index++

        if (stopSortingStatus.value || !isSorting.value) return

        // 更新显示
        // await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...array], comparisons, swaps)
      }
    }
  },

  // Tim排序（简化版，使用插入排序和归并排序）
  async tim排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const MIN_MERGE = 32 // TimSort的最小合并大小

    // 计算最小运行大小
    function calcMinRun(n: number) {
      let r = 0
      while (n >= MIN_MERGE) {
        r |= n & 1
        n >>= 1
      }
      return n + r
    }

    // 插入排序（用于小数组）
    async function insertionSort(arr: number[], left: number, right: number) {
      for (let i = left + 1; i <= right; i++) {
        let j = i
        const temp = arr[j]

        while (j > left && arr[j - 1] > temp) {
          comparisons++
          // 执行动画
          await animateSwap(j, j - 1, delay.value)

          arr[j] = arr[j - 1]
          j--
          swaps++

          if (stopSortingStatus.value || !isSorting.value) return
        }

        arr[j] = temp
        swaps++

        // 更新显示
        // await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...arr], comparisons, swaps)
      }
    }

    // 合并两个有序数组
    async function merge(arr: number[], l: number, m: number, r: number) {
      const len1 = m - l + 1
      const len2 = r - m
      const left = arr.slice(l, l + len1)
      const right = arr.slice(m + 1, m + 1 + len2)

      let i = 0,
        j = 0,
        k = l

      while (i < len1 && j < len2) {
        comparisons++
        if (left[i] <= right[j]) {
          // 执行动画
          await animateSwap(l + i, k, delay.value)

          arr[k] = left[i]
          i++
        } else {
          // 执行动画
          await animateSwap(m + 1 + j, k, delay.value)

          arr[k] = right[j]
          j++
        }
        k++
        swaps++

        // 更新显示
        await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...arr], comparisons, swaps)

        if (stopSortingStatus.value || !isSorting.value) return
      }

      // 复制剩余元素
      while (i < len1) {
        // 执行动画
        await animateSwap(l + i, k, delay.value)

        arr[k] = left[i]
        i++
        k++
        swaps++

        // 更新显示
        // await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...arr], comparisons, swaps)

        if (stopSortingStatus.value || !isSorting.value) return
      }

      while (j < len2) {
        // 执行动画
        await animateSwap(m + 1 + j, k, delay.value)

        arr[k] = right[j]
        j++
        k++
        swaps++

        // 更新显示
        // await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
        updateFn([...arr], comparisons, swaps)

        if (stopSortingStatus.value || !isSorting.value) return
      }
    }

    const n = array.length
    const minRun = calcMinRun(n)

    // 对小片段进行插入排序
    for (let i = 0; i < n; i += minRun) {
      const end = Math.min(i + minRun - 1, n - 1)
      await insertionSort(array, i, end)
      if (stopSortingStatus.value || !isSorting.value) return
    }

    // 合并排序后的片段
    for (let size = minRun; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = left + size - 1
        const right = Math.min(left + 2 * size - 1, n - 1)

        if (mid < right) {
          await merge(array, left, mid, right)
          if (stopSortingStatus.value || !isSorting.value) return
        }
      }
    }
  },

  // 锦标赛排序（树形选择排序）
  async 锦标赛排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0
    const n = array.length

    // 创建锦标赛树
    function buildTournamentTree(arr: number[]) {
      const tree = [...arr] // 叶子节点
      let size = arr.length

      // 构建比赛树
      while (size > 1) {
        for (let i = 0; i < size; i += 2) {
          if (i + 1 < size) {
            comparisons++
            const winner = arr[i] < arr[i + 1] ? arr[i] : arr[i + 1]
            tree.push(winner)
          } else {
            tree.push(arr[i])
          }
        }
        arr = tree.slice(tree.length - Math.ceil(size / 2))
        size = arr.length
      }

      return tree
    }

    // 重建树（替换胜者后）
    function rebuildTree(tree: number[], winnerIndex: number, value: number) {
      // 找到胜者在树中的位置
      let index = winnerIndex
      tree[index] = value

      // 向上调整树
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2)
        const sibling = index % 2 === 0 ? index - 1 : index + 1

        // 确保兄弟节点存在
        if (sibling < tree.length) {
          comparisons++
          tree[parent] = Math.min(tree[index], tree[sibling])
          index = parent
        } else {
          break
        }
      }
    }

    // 构建初始锦标赛树
    const tree = buildTournamentTree([...array])
    const sorted = []

    // 选择最小元素
    for (let i = 0; i < n; i++) {
      // 根节点是当前最小值
      const minValue = tree[0]
      sorted.push(minValue)

      // 找到这个值在原始数组中的位置
      let minIndex = -1
      for (let j = 0; j < array.length; j++) {
        if (
          (array[j] === minValue && !sorted.includes(array[j])) ||
          sorted.filter((x) => x === minValue).length <= array.filter((x) => x === minValue).length
        ) {
          minIndex = j
          break
        }
      }

      if (minIndex === -1) break

      // 执行动画 - 将最小值移动到正确位置
      await animateSwap(minIndex, i, delay.value)

      // 在树中用最大值替换最小值并重建树
      rebuildTree(tree, minIndex, Infinity)

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...array], comparisons, swaps)

      if (stopSortingStatus.value || !isSorting.value) return
    }

    // 将排序结果复制回原数组
    for (let i = 0; i < n; i++) {
      array[i] = sorted[i]

      // 更新显示
      await new Promise((resolve) => setTimeout(resolve, delay.value / 2))
      updateFn([...array], comparisons, swaps)

      if (stopSortingStatus.value || !isSorting.value) return
    }
  },
}

const stopSortingStatus = ref<boolean>(false)

//是否被中断过
const haveBeenBreak = ref<boolean>(false)

const animationStartTime = ref<number>(0)

const start = () => {
  if (!isReset.value) {
    generateRandomArray()
  }
  isSorting.value = true
  animationStartTime.value = performance.now()
  startSorting()
}

// 开始排序
const startSorting = async () => {
  if (stopSortingStatus.value) {
    return
  }
  stats.value = { comparisons: 0, swaps: 0, time: 0 }

  const startTime = performance.now()
  const arrayToSort = haveBeenBreak.value ? [...displayArray.value] : [...originalArray.value]
  try {
    await sortingAlgorithms[selectedAlgorithm.value](arrayToSort, updateDisplay)

    // 排序完成后更新最终状态
    displayArray.value = [...arrayToSort]
    // 记录耗时
    stats.value.time = Math.round(performance.now() - startTime)
    drawBars()
  } catch (error) {
    console.error('排序出错:', error)
  } finally {
    if (haveBeenBreak.value) {
      if (!stopSortingStatus.value) {
        isSorting.value = false
        haveBeenBreak.value = false
        isReset.value = false
        console.log('结束了')
        cancelAnimationFrame(animationId.value)
        animationId.value = 0
        stopSortingStatus.value = false
        if (log.value.length > logCount.value) {
          log.value.shift()
        }
        log.value.push({
          sortAlgorithm: selectedAlgorithm.value,
          sortTime: stats.value.time,
          swap: stats.value.swaps,
          compare: stats.value.comparisons,
        })
      }
    } else {
      isSorting.value = false
      isReset.value = false
      cancelAnimationFrame(animationId.value)
      animationId.value = 0
      stopSortingStatus.value = false
      if (log.value.length > logCount.value) {
        log.value.shift()
      }
      log.value.push({
        sortAlgorithm: selectedAlgorithm.value,
        sortTime: stats.value.time,
        swap: stats.value.swaps,
        compare: stats.value.comparisons,
      })
    }
  }
}

// 停止或者继续排序
const stopOrContinueSorting = () => {
  stopSortingStatus.value = !stopSortingStatus.value

  if (stopSortingStatus.value) {
    haveBeenBreak.value = true
    cancelAnimationFrame(animationId.value)
    animationId.value = 0
    animationState.value.active = false
  } else {
    startSorting()
  }
  // 恢复原始数组
  // displayArray.value = [...originalArray.value]
  drawBars()
}

// const resizeCanvas = debounce(() => {
//   const container = canvas.value?.parentElement
//   const width = container?.getBoundingClientRect().width
//   if (width && width > 1000) {
//     console.log('width', width)
//     return
//   } else {
//     console.log('设置了宽度')
//     initCanvas(width)
//   }
// }, 300)

// 监听窗口大小变化
onMounted(() => {
  initCanvas()
  generateRandomArray()

  // window.addEventListener(
  //   'resize',
  //   resizeCanvas,
  // )
})

// 组件卸载时清理
watch(
  () => isSorting.value,
  (newVal) => {
    if (!newVal && animationId.value) {
      cancelAnimationFrame(animationId.value)
      animationId.value = 0
    }
  },
)

onUnmounted(() => {
  // window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationId.value)
})
</script>

<style lang="less" scoped>
.sorting-visualizer {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #e1e4e8;

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      label {
        font-weight: 500;
        color: #24292e;
      }

      input[type='range'] {
        width: 100px;
      }

      select {
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #d1d5da;
      }
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #2188ff;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0366d6;
      }

      &:disabled {
        background-color: #959da5;
        cursor: not-allowed;
      }
    }
  }

  .canvas-container {
    flex: 1;
    padding: 1rem;
    background-color: #f5f7fa;
    width: 100%;
    aspect-ratio: 16/9;

    canvas {
      width: 100%;
      height: 100%;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    padding: 0.8rem;
    background-color: #fff;
    border-top: 1px solid #e1e4e8;
    font-size: 0.9rem;
    color: #586069;

    span {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background-color: #f6f8fa;
      border-radius: 3px;
    }
  }

  .log {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .log-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #f6f8fa;
    }
    .log-header {
      display: flex;
      justify-content: space-around;
      background-color: #f6f8fa;
      border-radius: 3px;

      div {
        width: 25%;
        text-align: center;
      }
    }
    .log-item {
      display: flex;
      justify-content: space-around;
      background-color: #f6f8fa;
      border-radius: 3px;
      text-align: center;
      div {
        width: 25%;
        text-align: center;
      }
    }
  }
}
</style>
