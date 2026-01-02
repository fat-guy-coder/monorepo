/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timer: any = null // 初始化为 null
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param func 要执行的函数
 * @param limit 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle(func: (...args: any[]) => void, limit: number): (...args: any[]) => void {
  let lastFunc: any = null // 初始化为 null
  let lastRan: number | null = null // 初始化为 null
  return function (this: unknown, ...args: any[]) {
    const context = this
    if (lastRan === null) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc!)
      lastFunc = setTimeout(
        function () {
          if (Date.now() - (lastRan as number) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - (lastRan as number)),
      )
    }
  }
}

/**
 * 智能排序算法，根据抽样自动选择最优排序方式
 * 用法与 Array.prototype.sort 一致
 * @param array 要排序的数组
 * @param compareFn 比较函数
 * @returns 排序后的新数组
 */
export function smartSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (array.length <= 32) {
    // 小数组优先插入排序
    return insertionSort([...array], compareFn)
  }

  // 抽样，取16个等间隔样本
  const sampleSize = Math.min(16, array.length)
  const sample: T[] = []
  const step = Math.floor(array.length / sampleSize)
  for (let i = 0; i < sampleSize; i++) {
    sample.push(array[i * step])
  }

  // 检查是否基本有序（升/降）
  let asc = true,
    desc = true
  for (let i = 1; i < sample.length; i++) {
    if (
      (compareFn
        ? compareFn(sample[i - 1], sample[i])
        : sample[i - 1] > sample[i]
          ? 1
          : sample[i - 1] < sample[i]
            ? -1
            : 0) > 0
    )
      asc = false
    if (
      (compareFn
        ? compareFn(sample[i - 1], sample[i])
        : sample[i - 1] > sample[i]
          ? 1
          : sample[i - 1] < sample[i]
            ? -1
            : 0) < 0
    )
      desc = false
  }

  // 如果大致有序，优先插入排序更快
  if (asc || desc) {
    return insertionSort([...array], compareFn)
  }

  // 检查是否数据分布均匀、重复值多
  const valueSet = new Set<T>(sample)
  const uniqueRatio = valueSet.size / sample.length

  // 大量重复时用归并排序比较好
  if (uniqueRatio < 0.5) {
    return mergeSort([...array], compareFn)
  }

  // 可选：如果元素层叠度更高，考虑timSort
  // 如果数据类型复杂，倾向采用归并

  // 默认用快排
  return quickSort([...array], compareFn)
}

// 插入排序
function insertionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]
    let j = i - 1
    while (
      j >= 0 &&
      (compareFn ? compareFn(arr[j], key) : arr[j] > key ? 1 : arr[j] < key ? -1 : 0) > 0
    ) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
  return arr
}

// 快排
function quickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (arr.length <= 16) {
    return insertionSort(arr, compareFn)
  }
  const pivot = arr[Math.floor(arr.length / 2)]
  const left: T[] = []
  const right: T[] = []
  const mid: T[] = []
  for (let v of arr) {
    const cmp = compareFn ? compareFn(v, pivot) : v > pivot ? 1 : v < pivot ? -1 : 0
    if (cmp < 0) left.push(v)
    else if (cmp > 0) right.push(v)
    else mid.push(v)
  }
  return quickSort(left, compareFn).concat(mid, quickSort(right, compareFn))
}

// 归并排序
function mergeSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (arr.length <= 16) {
    return insertionSort(arr, compareFn)
  }
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid), compareFn)
  const right = mergeSort(arr.slice(mid), compareFn)
  return merge(left, right, compareFn)
}

function merge<T>(left: T[], right: T[], compareFn?: (a: T, b: T) => number): T[] {
  const result: T[] = []
  let i = 0,
    j = 0
  while (i < left.length && j < right.length) {
    if (
      (compareFn
        ? compareFn(left[i], right[j])
        : left[i] > right[j]
          ? 1
          : left[i] < right[j]
            ? -1
            : 0) <= 0
    ) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  while (i < left.length) result.push(left[i++])
  while (j < right.length) result.push(right[j++])
  return result
}

export function scrollIntoViewById(elementId: string, behavior: 'smooth' | 'instant' = 'smooth') {
  const element = document.getElementById(elementId)
  if (element) {
    console.log(element.scrollIntoView)
    if (element.scrollIntoView) {
      element.scrollIntoView({ behavior, block: 'center' })
    } else {
      element.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
    }
  }
}

//
