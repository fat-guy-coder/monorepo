<template>
  <div class="sorting-container">
    <header class="header">
      <h1>排序算法实现基本介绍</h1>
      <p>探索常见排序算法的原理与实现</p>
    </header>

    <div class="content">
      <div class="intro">
        <div class="intro-card">
          <h2>排序算法概述</h2>
          <p>排序算法是计算机科学中最基础的算法之一，用于将一组数据按特定顺序重新排列。选择合适的排序算法对程序性能至关重要。</p>
          <div class="algorithm-stats">
            <div class="stat">
              <div class="stat-value">O(n²)</div>
              <div class="stat-label">基础排序算法</div>
            </div>
            <div class="stat">
              <div class="stat-value">O(n log n)</div>
              <div class="stat-label">高效排序算法</div>
            </div>
            <div class="stat">
              <div class="stat-value">O(n)</div>
              <div class="stat-label">特殊排序算法</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs">
        <button v-for="(algorithm, index) in algorithms" :key="index" @click="activeAlgorithm = algorithm"
          :class="{ active: activeAlgorithm === algorithm }">
          {{ algorithm.name }}
        </button>
      </div>

      <div class="algorithm-details">
        <div class="algorithm-info">
          <h2>{{ activeAlgorithm.name }}</h2>
          <p class="algorithm-description">{{ activeAlgorithm.description }}</p>

          <div class="complexity-analysis">
            <h3>复杂度分析</h3>
            <div class="complexity-grid">
              <div class="complexity-card">
                <div class="complexity-type">时间复杂度</div>
                <div class="complexity-values">
                  <div>最差: {{ activeAlgorithm.complexity.worst }}</div>
                  <div>平均: {{ activeAlgorithm.complexity.average }}</div>
                  <div>最佳: {{ activeAlgorithm.complexity.best }}</div>
                </div>
              </div>
              <div class="complexity-card">
                <div class="complexity-type">空间复杂度</div>
                <div class="complexity-value">{{ activeAlgorithm.complexity.space }}</div>
              </div>
              <div class="complexity-card">
                <div class="complexity-type">稳定性</div>
                <div class="complexity-value">{{ activeAlgorithm.complexity.stable ? '稳定' : '不稳定' }}</div>
              </div>
            </div>
          </div>

          <div class="implementation">
            <h3>实现思路</h3>
            <ol class="implementation-steps">
              <li v-for="(step, index) in activeAlgorithm.steps" :key="index">{{ step }}</li>
            </ol>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <ul>
              <li v-for="(useCase, index) in activeAlgorithm.useCases" :key="index">{{ useCase }}</li>
            </ul>
          </div>
        </div>

        <div class="algorithm-code">
          <h3>实现代码 (TypeScript)</h3>
          <pre><code>{{ activeAlgorithm.code }}</code></pre>
        </div>
      </div>

      <div class="visualization">
        <h2>排序算法可视化</h2>
        <div class="visual-controls">
          <div class="control-group">
            <label>数组大小:</label>
            <input type="range" min="5" max="30" v-model="arraySize">
            <span>{{ arraySize }} 个元素</span>
          </div>
          <div class="control-group">
            <label>排序速度:</label>
            <input type="range" min="10" max="500" v-model="sortSpeed">
            <span>{{ 510 - sortSpeed }}ms/步</span>
          </div>
          <div class="control-group">
            <button @click="generateArray">生成新数组</button>
            <button @click="startSorting" :disabled="isSorting">开始排序</button>
            <button @click="resetSorting">重置</button>
          </div>
        </div>

        <div class="array-visualization">
          <div v-for="(value, index) in array" :key="index" class="array-element"
            :style="{ height: `${value * 5}px`, backgroundColor: getElementColor(index) }">
            <span class="element-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

// 排序算法数据
const algorithms = ref([
  {
    name: '冒泡排序',
    description: '重复遍历数组，比较相邻元素，如果顺序错误就交换它们。',
    complexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n)',
      space: 'O(1)',
      stable: true
    },
    steps: [
      '从数组的第一个元素开始',
      '比较当前元素和下一个元素',
      '如果当前元素大于下一个元素，交换它们',
      '对每一对相邻元素重复上述步骤',
      '重复整个过程，直到没有需要交换的元素'
    ],
    useCases: [
      '教学目的，理解排序基本原理',
      '小规模数据排序',
      '几乎已经排序好的数据'
    ],
    code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    // 如果没有交换，数组已经排序完成
    if (!swapped) break;
  }
  return arr;
}`
  },
  {
    name: '选择排序',
    description: '每次从未排序部分选择最小（或最大）元素，放到已排序部分的末尾。',
    complexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n²)',
      space: 'O(1)',
      stable: false
    },
    steps: [
      '将数组分为已排序和未排序两部分',
      '初始时已排序部分为空',
      '在未排序部分中找到最小元素',
      '将找到的最小元素与未排序部分的第一个元素交换',
      '将交换后的元素纳入已排序部分',
      '重复直到所有元素排序完成'
    ],
    useCases: [
      '当内存空间有限时',
      '需要最小化交换次数的场景',
      '小规模数据排序'
    ],
    code: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // 在未排序部分中寻找最小元素
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 将找到的最小元素与第一个未排序元素交换
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}`
  },
  {
    name: '插入排序',
    description: '构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
    complexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n)',
      space: 'O(1)',
      stable: true
    },
    steps: [
      '从第一个元素开始，该元素可以认为已经被排序',
      '取出下一个元素，在已排序序列中从后向前扫描',
      '如果已排序元素大于新元素，将该元素移到下一位置',
      '重复步骤3，直到找到已排序元素小于或等于新元素的位置',
      '将新元素插入到该位置后',
      '重复步骤2~5'
    ],
    useCases: [
      '小规模数据排序',
      '几乎已经排序好的数据',
      '作为更高级算法（如快速排序）的子过程'
    ],
    code: `function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const current = arr[i];
    let j = i - 1;

    // 将大于current的元素向后移动
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 插入current到正确位置
    arr[j + 1] = current;
  }

  return arr;
}`
  },
  {
    name: '归并排序',
    description: '采用分治法，将数组分成两半分别排序，然后合并结果。',
    complexity: {
      worst: 'O(n log n)',
      average: 'O(n log n)',
      best: 'O(n log n)',
      space: 'O(n)',
      stable: true
    },
    steps: [
      '将数组分成两个大致相等的子数组',
      '递归地对两个子数组进行归并排序',
      '合并两个已排序的子数组',
      '合并过程：比较两个子数组的前端元素，取较小者放入结果数组',
      '重复直到所有元素都放入结果数组'
    ],
    useCases: [
      '大规模数据排序',
      '需要稳定排序的场景',
      '外部排序（数据量大于内存容量）',
      '链表排序'
    ],
    code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  // 分割数组
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 递归排序
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // 合并两个有序数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // 添加剩余元素
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`
  },
  {
    name: '快速排序',
    description: '采用分治法，选择一个基准元素，将数组分为两部分，小于基准的放左边，大于基准的放右边，然后递归排序子数组。',
    complexity: {
      worst: 'O(n²)',
      average: 'O(n log n)',
      best: 'O(n log n)',
      space: 'O(log n)',
      stable: false
    },
    steps: [
      '选择一个基准元素（pivot）',
      '分区操作：重新排列数组，所有小于基准的元素放在基准前面，所有大于基准的元素放在基准后面',
      '递归地将小于基准的子数组和大于基准的子数组排序',
      '基准选择策略：通常选择第一个、最后一个或中间元素',
      '当子数组长度小于某个阈值时，可切换到插入排序'
    ],
    useCases: [
      '大规模数据排序',
      '需要原地排序的场景',
      '通用目的排序',
      '编程语言内置排序函数的实现'
    ],
    code: `function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    // 分区操作
    const pivotIndex = partition(arr, low, high);

    // 递归排序子数组
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  // 选择最后一个元素作为基准
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 将基准放到正确位置
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
  },
  {
    name: '计数排序',
    description: '计数排序是一种非比较排序算法，通过统计每个元素出现的次数来实现排序。',
    complexity: {
      worst: 'O(n+k)',
      average: 'O(n+k)',
      best: 'O(n+k)',
    },
    steps: [
      '统计每个元素出现的次数',
      '根据统计结果构建新的有序数组'
    ],
    useCases: [
      '需要O(1)空间复杂度的场景',
    ],
    code: `function countingSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // 统计每个元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  // 构建新的有序数组
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      output.push(i + min);
      count[i]--;
    }
  }

  return output;
}`
  },
  {
    name: '希尔排序',
    description: '希尔排序是插入排序的一种改进版本，通过将数组分成多个子数组，对每个子数组进行插入排序，最后对整个数组进行插入排序。',
    complexity: {
      worst: 'O(n²)',
      average: 'O(n log n)',
      best: 'O(n log n)',
    },
    steps: [
      '将数组分成多个子数组，每个子数组间隔为h',
      '对每个子数组进行插入排序',
      '缩小h的值，重复上述步骤',
      '最后对整个数组进行插入排序'
    ],
    useCases: [
      '需要O(1)空间复杂度的场景',
      '需要稳定O(n log n)时间复杂度的场景',
      '优先级队列实现',
      '大规模数据排序'
    ],
    code: `function shellSort(arr: number[]): number[] {
      const n = arr.length;
      let gap = Math.floor(n / 2);
      while (gap > 0) {
        for (let i = gap; i < n; i++) {
          const temp = arr[i];
          let j = i;
          while (j >= gap && arr[j - gap] > temp) {
            arr[j] = arr[j - gap];
            j -= gap;
          }
          arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
      }
      return arr;
    }`
  },
  {
    name: '堆排序',
    description: '利用堆这种数据结构设计的一种排序算法，通过构建最大堆或最小堆来实现排序。',
    complexity: {
      worst: 'O(n log n)',
      average: 'O(n log n)',
      best: 'O(n log n)',
      space: 'O(1)',
      stable: false
    },
    steps: [
      '构建最大堆：从最后一个非叶子节点开始调整堆',
      '将堆顶元素（最大值）与堆尾元素交换',
      '减少堆的大小（排除已排序元素）',
      '从堆顶开始调整堆，使其重新成为最大堆',
      '重复交换和调整步骤，直到堆的大小为1'
    ],
    useCases: [
      '需要O(1)空间复杂度的场景',
      '需要稳定O(n log n)时间复杂度的场景',
      '优先级队列实现',
      '大规模数据排序'
    ],
    code: `function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 一个个从堆顶取出元素
  for (let i = n - 1; i > 0; i--) {
    // 将当前堆顶（最大值）移到数组末尾
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // 调整剩余元素组成的堆
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i; // 初始化最大值为根节点
  const left = 2 * i + 1; // 左子节点
  const right = 2 * i + 2; // 右子节点

  // 如果左子节点大于根节点
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // 如果右子节点大于当前最大值
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大值不是根节点
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // 递归调整受影响的子树
    heapify(arr, n, largest);
  }
}`
  }
]);

// 当前活动算法
const activeAlgorithm = ref(algorithms.value[0]);

// 可视化数据
const arraySize = ref(15);
const sortSpeed = ref(200);
const array = ref<number[]>([]);
const isSorting = ref(false);
const activeIndices = ref<number[]>([]);

// 生成随机数组
function generateArray() {
  array.value = [];
  for (let i = 0; i < arraySize.value; i++) {
    array.value.push(Math.floor(Math.random() * 60) + 1);
  }
}

// 获取元素颜色
function getElementColor(index: number) {
  if (activeIndices.value.includes(index)) {
    return '#ff6b6b'; // 活动元素 - 红色
  }
  return '#4da6ff'; // 默认颜色 - 蓝色
}

// 开始排序
function startSorting() {
  isSorting.value = true;
  abortSorting.value = false;
  bubbleSortVisualization();
}

const abortSorting = ref(false);

function resetSorting() {
  isSorting.value = false;
  activeIndices.value = [];
  array.value = [];
  abortSorting.value = true;
}

// 冒泡排序可视化
async function bubbleSortVisualization() {
  const arr = [...array.value];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    if (abortSorting.value) {
      break;
    }

    for (let j = 0; j < n - i - 1; j++) {
      // 更新活动索引
      activeIndices.value = [j, j + 1];
      await new Promise(resolve => setTimeout(resolve, 510 - sortSpeed.value));

      if (arr[j] > arr[j + 1]) {
        // 交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // 更新数组显示
        array.value = [...arr];
      }
    }

    // 如果没有交换，提前结束
    if (!swapped) break;
  }

  activeIndices.value = [];
  isSorting.value = false;
}

// 初始化
onMounted(() => {
  generateArray();
});
</script>

<style lang="less" scoped>
.sorting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-top: 0;
  }
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.intro {
  margin-bottom: 2.5rem;

  .intro-card {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;

    h2 {
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #1e40af;
    }

    p {
      max-width: 800px;
      margin: 0 auto 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

.algorithm-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;

  .stat {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    padding: 1.2rem;
    min-width: 150px;

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4f46e5;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.95rem;
      color: #4b5563;
    }
  }
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.75rem 1.5rem;
    background: #e2e8f0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
      background: #cbd5e1;
    }

    &.active {
      background: #4f46e5;
      color: white;
    }
  }
}

.algorithm-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.algorithm-info {
  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #34495e;
  }

  .algorithm-description {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #4b5563;
  }
}

.complexity-analysis {
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
  }
}

.complexity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.complexity-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);

  .complexity-type {
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: #4b5563;
  }

  .complexity-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4f46e5;
  }

  .complexity-values {
    font-size: 0.95rem;

    div {
      margin: 0.3rem 0;
    }
  }
}

.implementation {
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
  }
}

.implementation-steps {
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
}

.use-cases {
  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4f46e5;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
}

.algorithm-code {
  background: #2d2d2d;
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;

  h3 {
    margin-top: 0;
    color: #e2e8f0;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #f8f8f2;
  }
}

.visualization {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;

  h2 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #34495e;
    text-align: center;
  }
}

.visual-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  background: #e0f2fe;
  padding: 1.5rem;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;

  label {
    font-weight: 500;
  }

  input[type="range"] {
    width: 150px;
  }

  span {
    min-width: 100px;
  }
}

button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #4338ca;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
}

.array-visualization {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
  gap: 10px;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.array-element {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.3s ease;
  border-radius: 6px 6px 0 0;
  background: #4da6ff;

  .element-value {
    margin-top: 5px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e40af;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }

  .visual-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .array-element {
    width: 30px;
  }
}
</style>
