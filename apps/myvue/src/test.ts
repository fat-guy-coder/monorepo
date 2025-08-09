
import { ref, onMounted, watch, onUnmounted } from 'vue'

// 定义类型
type SortingAlgorithm = (array: number[], updateFn: UpdateFunction) => Promise<void>
type UpdateFunction = (arr: number[], comparisons: number, swaps: number) => void

// 组件状态
const arraySize = ref(15)
const valueRange = ref(100)
const selectedAlgorithm = ref('冒泡排序')
const isSorting = ref(false)
const animationId = ref(0)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const delay = ref(200)

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
const algorithms = ref(['冒泡排序', '选择排序', '插入排序', '快速排序', '归并排序', '堆排序'])

// 初始化画布
const initCanvas = () => {
  if (!canvas.value) return

  const container = canvas.value.parentElement
  if (!container) return

  // 设置画布尺寸
  const width = container.clientWidth
  const height = container.clientHeight

  canvas.value.width = width
  canvas.value.height = height

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
const drawBars = () => {
  if (!ctx.value || !canvas.value) return

  const { width, height } = canvas.value
  const barCount = displayArray.value.length
  const maxValue = Math.max(...displayArray.value)

  // 计算柱状图参数
  const barWidth = width / barCount
  const spacing = barWidth * 0.1
  const actualBarWidth = barWidth - spacing

  // 清除画布
  ctx.value.clearRect(0, 0, width, height)

  //交换动画

  // 绘制柱子和数值
  for (let i = 0; i < barCount; i++) {
    const barHeight = (displayArray.value[i] / maxValue) * (height - 40)
    const x = i * barWidth + spacing / 2
    const y = height - barHeight

    // 绘制柱子
    ctx.value.fillStyle = getBarColor(i, barCount)
    ctx.value.fillRect(x, y, actualBarWidth, barHeight)

    // 绘制边框
    ctx.value.strokeStyle = '#333'
    ctx.value.lineWidth = 1
    ctx.value.strokeRect(x, y, actualBarWidth, barHeight)

    // 绘制数值
    ctx.value.fillStyle = '#333'
    ctx.value.font = `${Math.min(12, actualBarWidth * 0.8)}px Arial`
    ctx.value.textAlign = 'center'
    ctx.value.fillText(displayArray.value[i].toString(), x + actualBarWidth / 2, y - 5)
  }
}

// 获取柱子颜色 (渐变色)
const getBarColor = (index: number, total: number) => {
  const hue = (index / total) * 240 // 从蓝色到红色
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
          // 交换元素
          ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
          swaps++

          //停止排序
          if (stopSortingStatus.value || !isSorting.value) {
            return
          }

          // 更新显示
          await new Promise((resolve) => setTimeout(resolve, delay.value))
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
        ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
        swaps++
        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        await new Promise((resolve) => setTimeout(resolve, delay.value))
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
        array[j] = array[j - 1]
        swaps++
        j--

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        await new Promise((resolve) => setTimeout(resolve, delay.value))
        updateFn([...array], comparisons, swaps)
      }

      array[j] = current
      swaps++
      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

      await new Promise((resolve) => setTimeout(resolve, delay.value))
      updateFn([...array], comparisons, swaps)
    }
  },

  // 快速排序
  async 快速排序(array: number[], updateFn: UpdateFunction) {
    let comparisons = 0
    let swaps = 0

    async function quickSort(arr: number[], left: number, right: number) {
      if (left >= right) return

      const pivotIndex = await partition(arr, left, right)
      await quickSort(arr, left, pivotIndex - 1)
      await quickSort(arr, pivotIndex + 1, right)
    }

    async function partition(arr: number[], left: number, right: number) {
      const pivot = arr[right]
      let i = left

      for (let j = left; j < right; j++) {
        comparisons++
        if (arr[j] < pivot) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          swaps++
          i++

          //停止排序
          if (stopSortingStatus.value || !isSorting.value) {
            return
          }

          await new Promise((resolve) => setTimeout(resolve, delay.value))
          updateFn([...arr], comparisons, swaps)
        }
      }

      ;[arr[i], arr[right]] = [arr[right], arr[i]]
      swaps++

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

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
        return
      }

      return merge(left, right)
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
      ;[array[0], array[i]] = [array[i], array[0]]
      swaps++

      //停止排序
      if (stopSortingStatus.value || !isSorting.value) {
        return
      }

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
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        swaps++

        //停止排序
        if (stopSortingStatus.value || !isSorting.value) {
          return
        }

        await new Promise((resolve) => setTimeout(resolve, 100))
        updateFn([...arr], comparisons, swaps)

        await heapify(arr, n, largest)
      }
    }
  },
}

const stopSortingStatus = ref<boolean>(false)

//是否被中断过
const haveBeenBreak = ref<boolean>(false)

const start = () => {
  if (!isReset.value) {
    generateRandomArray()
  }
  isSorting.value = true
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
    drawBars()
    // 记录耗时
    stats.value.time = Math.round(performance.now() - startTime)
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
      }
    } else {
      isSorting.value = false
      isReset.value = false
      cancelAnimationFrame(animationId.value)
      animationId.value = 0
      stopSortingStatus.value = false
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
  } else {
    startSorting()
  }
  // 恢复原始数组
  // displayArray.value = [...originalArray.value]
  drawBars()
}

// 监听窗口大小变化
onMounted(() => {
  initCanvas()
  generateRandomArray()

  window.addEventListener('resize', initCanvas)
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
  window.removeEventListener('resize', initCanvas)
  cancelAnimationFrame(animationId.value)
})
