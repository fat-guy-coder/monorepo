<template>
  <div class="sorting-container">
    <h1>数组排序算法基本介绍</h1>
    <div class="intro">
      <p>
        排序是计算机科学中最基础的算法之一。本组件详细介绍了10种常见的排序算法，包括每种算法的基本思想、代码实现、使用场景、复杂度分析和优缺点。
      </p>
      <p><a @click="goToDetail">跳转详细</a></p>
    </div>

    <div class="algorithm-grid">
      <div
        v-for="(algorithm, index) in algorithms"
        :key="algorithm.name"
        class="algorithm-card"
        :class="{ active: activeAlgorithm === index }"
        @click="activeAlgorithm = index"
      >
        <div class="card-header">
          <div class="algorithm-icon" :style="{ backgroundColor: algorithm.color }">
            {{ algorithm.name.charAt(0) }}
          </div>
          <h3>{{ algorithm.name }}</h3>
          <div class="time-complexity">
            <span>时间复杂度:</span>
            <div class="complexity-value">{{ algorithm.complexity.time }}</div>
          </div>
        </div>
        <div class="card-body">
          <p>{{ algorithm.shortDesc }}</p>
          <div class="algorithm-tags">
            <span v-for="tag in algorithm.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeAlgorithm !== null" class="algorithm-detail">
      <div class="detail-header">
        <h2>{{ currentAlgorithm.name }} 排序</h2>
        <div class="complexity-details">
          <div class="complexity-item">
            <span>时间复杂度(最佳):</span>
            <span class="complexity-value best">{{ currentAlgorithm.complexity.best }}</span>
          </div>
          <div class="complexity-item">
            <span>时间复杂度(平均):</span>
            <span class="complexity-value avg">{{ currentAlgorithm.complexity.avg }}</span>
          </div>
          <div class="complexity-item">
            <span>时间复杂度(最差):</span>
            <span class="complexity-value worst">{{ currentAlgorithm.complexity.worst }}</span>
          </div>
          <div class="complexity-item">
            <span>空间复杂度:</span>
            <span class="complexity-value space">{{ currentAlgorithm.complexity.space }}</span>
          </div>
          <div class="complexity-item">
            <span>稳定性:</span>
            <span
              class="complexity-value"
              :class="{ stable: currentAlgorithm.stable, unstable: !currentAlgorithm.stable }"
            >
              {{ currentAlgorithm.stable ? '稳定' : '不稳定' }}
            </span>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <div class="section">
          <h3>基本思想</h3>
          <p>{{ currentAlgorithm.idea }}</p>
        </div>

        <div class="section">
          <h3>代码实现 (TypeScript)</h3>
          <pre><code>{{ currentAlgorithm.code }}</code></pre>
        </div>

        <div class="section">
          <h3>使用场景</h3>
          <p>{{ currentAlgorithm.scenario }}</p>
        </div>

        <div class="section">
          <h3>性能表现</h3>
          <p>{{ currentAlgorithm.performance }}</p>
        </div>

        <div class="section">
          <h3>优缺点</h3>
          <div class="pros-cons">
            <div class="pros">
              <h4>优点:</h4>
              <ul>
                <li v-for="(pro, idx) in currentAlgorithm.pros" :key="idx">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点:</h4>
              <ul>
                <li v-for="(con, idx) in currentAlgorithm.cons" :key="idx">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>提示: 点击上方的算法卡片查看详细内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['goToByRouteName'])

function goToDetail() {
  emit('goToByRouteName', 'SortingAlgorithm')
}

interface Algorithm {
  name: string
  shortDesc: string
  color: string
  tags: string[]
  complexity: {
    time: string
    best: string
    avg: string
    worst: string
    space: string
  }
  stable: boolean
  idea: string
  code: string
  scenario: string
  performance: string
  pros: string[]
  cons: string[]
}

const algorithms: Algorithm[] = [
  {
    name: '冒泡排序',
    shortDesc: '通过重复比较相邻元素并交换顺序错误的元素',
    color: '#FF6B6B',
    tags: ['简单', '稳定', '教学'],
    complexity: {
      time: 'O(n²)',
      best: 'O(n)',
      avg: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    stable: true,
    idea: "重复遍历数组，比较相邻元素，如果顺序错误就交换它们。每一轮遍历都会将最大的元素'冒泡'到正确的位置。",
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
    // 如果本轮没有交换，说明数组已有序
    if (!swapped) break;
  }
  return arr;
}`,
    scenario: '教学场景、小型数组排序、已经基本有序的数组',
    performance: '对于小型或基本有序的数组表现良好，但对于大型数组性能很差。',
    pros: ['实现简单，易于理解', '空间复杂度低 (O(1))', '对于已经基本有序的数组效率较高'],
    cons: ['时间复杂度高，平均为O(n²)', '对于大型数据集效率低下', '交换操作频繁'],
  },
  {
    name: '选择排序',
    shortDesc: '每次从未排序部分选择最小元素放到已排序部分末尾',
    color: '#4ECDC4',
    tags: ['简单', '原地', '教学'],
    complexity: {
      time: 'O(n²)',
      best: 'O(n²)',
      avg: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    stable: false,
    idea: '将数组分为已排序和未排序两部分，每次从未排序部分找到最小元素，将其放到已排序部分的末尾。',
    code: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // 在未排序部分找到最小元素
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 将最小元素交换到已排序部分的末尾
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}`,
    scenario: '教学场景、小型数组排序、交换成本较高的场景',
    performance: '时间复杂度始终为O(n²)，无论输入数据的初始状态如何。',
    pros: ['实现简单', '空间复杂度低 (O(1))', '交换次数较少，最多进行n-1次交换'],
    cons: ['时间复杂度高，始终为O(n²)', '不稳定排序', '对于大型数据集效率低下'],
  },
  {
    name: '插入排序',
    shortDesc: '构建有序序列，逐个插入未排序元素到正确位置',
    color: '#FFD166',
    tags: ['简单', '稳定', '小规模'],
    complexity: {
      time: 'O(n²)',
      best: 'O(n)',
      avg: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
    stable: true,
    idea: '将数组分为已排序和未排序两部分，每次取一个未排序元素，在已排序部分中找到合适的位置插入。',
    code: `function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const current = arr[i];
    let j = i - 1;

    // 将比current大的元素向后移动
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 插入current到正确位置
    arr[j + 1] = current;
  }

  return arr;
}`,
    scenario: '小型数组排序、基本有序的数组、作为高级排序算法的小数组优化',
    performance: '对于小型或基本有序的数组非常高效，最坏情况为O(n²)。',
    pros: ['实现简单', '对于小型数据集效率高', '对于基本有序的数组效率高', '稳定排序'],
    cons: ['平均和最坏时间复杂度为O(n²)', '对于大型无序数组效率低下', '需要大量移动元素'],
  },
  {
    name: '快速排序',
    shortDesc: '分治策略，选取基准分区并递归排序',
    color: '#06D6A0',
    tags: ['高效', '分治', '常用'],
    complexity: {
      time: 'O(n log n)',
      best: 'O(n log n)',
      avg: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
    },
    stable: false,
    idea: '选择一个基准元素，将数组分为两部分：小于基准的部分和大于基准的部分，然后递归地对这两部分进行排序。',
    code: `function quickSort(arr: number[], low: number = 0, high: number = arr.length - 1): number[] {
  if (low < high) {
    // 分区操作，返回基准索引
    const pivotIndex = partition(arr, low, high);

    // 递归排序左子数组和右子数组
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  // 选择最右边的元素作为基准
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 将基准元素放到正确位置
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    scenario: '通用排序、大型数据集、需要原地排序的场景',
    performance: '平均情况下非常高效，是最快的通用排序算法之一，但最坏情况下会退化为O(n²)。',
    pros: [
      '平均时间复杂度为O(n log n)，性能优异',
      '原地排序，空间复杂度低',
      '在实践中通常比其他O(n log n)算法更快',
    ],
    cons: ['最坏情况时间复杂度为O(n²)', '不稳定排序', '递归实现可能导致堆栈溢出'],
  },
  {
    name: '归并排序',
    shortDesc: '分治策略，递归分割数组合并有序序列',
    color: '#118AB2',
    tags: ['稳定', '高效', '分治'],
    complexity: {
      time: 'O(n log n)',
      best: 'O(n log n)',
      avg: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
    },
    stable: true,
    idea: '将数组递归地分成两半，直到每个子数组只有一个元素，然后合并这些有序子数组来构建完整的有序数组。',
    code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // 添加剩余元素
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    scenario: '大型数据集、需要稳定排序的场景、链表排序、外部排序',
    performance: '时间复杂度始终为O(n log n)，性能稳定，但需要额外空间。',
    pros: ['时间复杂度稳定为O(n log n)', '稳定排序', '适用于大型数据集', '适合并行化处理'],
    cons: ['需要O(n)的额外空间', '递归实现可能导致堆栈溢出', '对于小型数组可能不如插入排序高效'],
  },
  {
    name: '堆排序',
    shortDesc: '利用堆数据结构排序，构建最大堆/最小堆',
    color: '#073B4C',
    tags: ['原地', '高效', '堆结构'],
    complexity: {
      time: 'O(n log n)',
      best: 'O(n log n)',
      avg: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
    },
    stable: false,
    idea: '将数组视为完全二叉树，构建最大堆（或最小堆），然后重复提取堆顶元素（最大值或最小值）并重新调整堆结构。',
    code: `function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 逐个提取元素
  for (let i = n - 1; i > 0; i--) {
    // 将当前根节点（最大值）移到数组末尾
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // 在减少的堆上重新堆化
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i; // 初始化最大值为根节点
  const left = 2 * i + 1;
  const right = 2 * i + 2;

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

    // 递归堆化受影响的子树
    heapify(arr, n, largest);
  }
}`,
    scenario: '需要原地排序的大型数据集、实时系统（时间复杂度稳定）',
    performance: '时间复杂度始终为O(n log n)，不需要额外空间，但缓存不友好。',
    pros: [
      '时间复杂度稳定为O(n log n)',
      '原地排序，空间复杂度为O(1)',
      '不受输入数据影响，性能稳定',
    ],
    cons: ['不稳定排序', '缓存不友好', '实现相对复杂', '对于小型数组效率不高'],
  },
  {
    name: '计数排序',
    shortDesc: '非比较排序，统计元素出现次数',
    color: '#EF476F',
    tags: ['非比较', '整数', '高效'],
    complexity: {
      time: 'O(n + k)',
      best: 'O(n + k)',
      avg: 'O(n + k)',
      worst: 'O(n + k)',
      space: 'O(n + k)',
    },
    stable: true,
    idea: '统计数组中每个元素出现的次数，然后根据计数重建有序数组。适用于整数排序且范围不大的场景。',
    code: `function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;

  // 找到最大值和最小值
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  // 创建计数数组并初始化
  const count = new Array(range).fill(0);

  // 统计每个元素的出现次数
  for (const num of arr) {
    count[num - min]++;
  }

  // 计算累加计数
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 创建输出数组
  const output = new Array(arr.length);

  // 构建输出数组
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const pos = count[num - min] - 1;
    output[pos] = num;
    count[num - min]--;
  }

  return output;
}`,
    scenario: '整数排序、元素范围不大的数据集、作为基数排序的子程序',
    performance: '当元素范围k不是很大时，性能优异，时间复杂度为O(n + k)。',
    pros: ['线性时间复杂度O(n + k)', '稳定排序', '对于整数排序非常高效'],
    cons: ['仅适用于整数排序', '需要知道输入数据的范围', '当范围k很大时，空间开销大'],
  },
  {
    name: '桶排序',
    shortDesc: '将元素分到有限数量的桶里，各桶分别排序',
    color: '#FF9E00',
    tags: ['分布', '高效', '浮点数'],
    complexity: {
      time: 'O(n + k)',
      best: 'O(n)',
      avg: 'O(n + k)',
      worst: 'O(n²)',
      space: 'O(n + k)',
    },
    stable: true,
    idea: '将数组分到有限数量的桶中，每个桶再分别排序（可以使用其他排序算法或递归桶排序），最后合并结果。',
    code: `function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    // 找到数组中的最小值和最大值
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        else if (arr[i] > max) max = arr[i];
    }

    // 计算桶的数量
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    // 将元素分配到各个桶中
    for (let i = 0; i < arr.length; i++) {
        // 计算元素应该放入哪个桶
        const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        // 将元素放入对应的桶中
        buckets[bucketIndex].push(arr[i]);
    }

    // 对每个桶进行排序（这里使用插入排序）
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]) {
            insertionSort(buckets[i]); // 调用插入排序辅助函数
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}

// 插入排序（用于桶内排序）
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}`,
    scenario: '均匀分布的数据、浮点数排序、外部排序',
    performance: '当输入数据均匀分布时性能优异，最坏情况为O(n²)。',
    pros: ['当数据分布均匀时效率高', '适用于浮点数排序', '可以并行处理各桶'],
    cons: ['最坏情况时间复杂度为O(n²)', '需要额外空间', '性能依赖于数据分布和桶的数量'],
  },
  {
    name: '基数排序',
    shortDesc: '按位排序，从最低有效位到最高有效位',
    color: '#9B5DE5',
    tags: ['非比较', '整数', '字符串'],
    complexity: {
      time: 'O(nk)',
      best: 'O(nk)',
      avg: 'O(nk)',
      worst: 'O(nk)',
      space: 'O(n + k)',
    },
    stable: true,
    idea: '将整数按位数切割成不同的数字，然后按每个位数分别比较排序（通常使用计数排序作为子程序）。',
    code: `function radixSort(arr: number[]): number[] {
  // 获取最大数的位数
  const max = Math.max(...arr);
  const maxDigits = String(max).length;

  // 从最低位到最高位进行排序
  for (let digit = 0; digit < maxDigits; digit++) {
    // 创建10个桶（0-9）
    const buckets = Array.from({ length: 10 }, () => []);

    // 将元素分配到桶中
    for (const num of arr) {
      const digitValue = getDigit(num, digit);
      buckets[digitValue].push(num);
    }

    // 合并桶
    arr = buckets.flat();
  }

  return arr;
}

// 获取数字在指定位上的值
function getDigit(num: number, place: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}`,
    scenario: '整数排序、字符串排序、固定长度的键排序',
    performance: '当键的长度k较小且固定时，性能优异，时间复杂度为O(nk)。',
    pros: ['对于固定长度的键效率高', '稳定排序', '适用于整数和字符串排序'],
    cons: ['仅适用于整数或可分割为键的元素', '需要额外的存储空间', '当键的长度很大时效率降低'],
  },
  {
    name: 'Tim排序',
    shortDesc: '混合排序，结合归并排序和插入排序',
    color: '#00BBF9',
    tags: ['混合', '高效', 'Python内置'],
    complexity: {
      time: 'O(n log n)',
      best: 'O(n)',
      avg: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
    },
    stable: true,
    idea: 'TimSort是插入排序和归并排序的混合算法。它查找数据中的有序片段（run），使用插入排序扩展这些片段，然后使用归并排序合并这些片段。',
    code: `// TimSort实现较为复杂，以下是简化版
function timSort(arr: number[]): number[] {
  const MIN_MERGE = 32;
  const n = arr.length;

  // 对小数组使用插入排序
  if (n <= MIN_MERGE) {
    return insertionSort(arr);
  }

  // 计算最小run长度
  let minRun = minRunLength(n);

  // 遍历数组，识别并排序run
  for (let start = 0; start < n; start += minRun) {
    const end = Math.min(start + minRun - 1, n - 1);
    insertionSort(arr, start, end);
  }

  // 合并run
  for (let size = minRun; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(arr, left, mid, right);
      }
    }
  }

  return arr;
}

// 计算最小run长度
function minRunLength(n: number): number {
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

// 归并两个有序片段
function merge(arr: number[], l: number, m: number, r: number): void {
  // 实现类似归并排序中的merge
}`,
    scenario: '通用排序（Python内置排序）、实际应用、混合数据',
    performance: '在多种数据情况下表现优异，特别是对部分有序的数据，是实际应用中高效的排序算法。',
    pros: [
      '在多种情况下表现优异',
      '稳定排序',
      '利用输入数据中的现有顺序',
      'Python和Java等语言的内置排序算法',
    ],
    cons: ['实现复杂', '需要额外空间', '对小数组可能不如纯插入排序高效'],
  },
  {
    name: '竞标赛排序',
    shortDesc:
      '将数组视为一棵完全二叉树，每个节点代表一个元素，每个节点与其左右子节点进行比较，选择较大的元素作为父节点。',
    color: '#00BBF9',
    tags: ['分治', '稳定', '高效'],
    complexity: {
      time: 'O(n log n)',
      best: 'O(n log n)',
      avg: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
    },
    stable: true,
    idea: '将数组视为一棵完全二叉树，每个节点代表一个元素，每个节点与其左右子节点进行比较，选择较大的元素作为父节点。',
    code: `function tournamentSort(arr: number[]): number[] {
      const n = arr.length;
      const tree = new Array(2 * n - 1);
      for (let i = 0; i < n; i++) {
        tree[i + n - 1] = arr[i];
      }
      // 构建树
      for (let i = n - 2; i >= 0; i--) {
        tree[i] = Math.max(tree[2 * i + 1], tree[2 * i + 2]);
      }
    }

    function getMax(tree: number[], i: number): number {
      // 如果i超出树的范围，返回负无穷
      if (i >= tree.length) return -Infinity;
      // 如果左子节点超出树的范围，返回当前节点
      if (2 * i + 1 >= tree.length) return tree[i];
      // 返回当前节点、左子节点和右子节点中的最大值
      return Math.max(tree[i], getMax(tree, 2 * i + 1), getMax(tree, 2 * i + 2));
    }`,
    scenario: '需要稳定排序的场景',
    performance: '时间复杂度为O(n log n)',
    pros: ['稳定排序', '高效', '适用于需要稳定排序的场景'],
    cons: ['需要额外的空间', '不适用于大型数据集'],
  },
]

const activeAlgorithm = ref<number | null>(null)

const currentAlgorithm = computed(() => {
  return activeAlgorithm.value !== null ? algorithms[activeAlgorithm.value] : algorithms[0]
})
</script>

<style scoped lang="less">


.sorting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .intro {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .algorithm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .algorithm-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    &.active {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      border: 2px solid #3498db;
    }

    .card-header {
      padding: 1.2rem;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;

      .algorithm-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 1rem;
      }

      h3 {
        margin: 0;
        flex-grow: 1;
        font-size: 1.2rem;
      }

      .time-complexity {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        span {
          font-size: 0.8rem;
          color: #777;
        }

        .complexity-value {
          font-weight: bold;
          font-size: 1.1rem;
          color: #e74c3c;
        }
      }
    }

    .card-body {
      padding: 1.2rem;

      p {
        margin: 0 0 1rem 0;
        color: #555;
        line-height: 1.5;
      }
    }

    .algorithm-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        background: #e0e7ff;
        color: #4f46e5;
        padding: 0.3rem 0.7rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }

  .algorithm-detail {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    margin-top: 1.5rem;

    .detail-header {
      padding: 1.5rem;
      background: #2c3e50;
      color: white;

      h2 {
        margin: 0 0 1rem 0;
        font-size: 1.8rem;
      }
    }

    .complexity-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 8px;

      .complexity-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

        span:first-child {
          color: #ecf0f1;
        }

        .complexity-value {
          font-weight: bold;

          &.best {
            color: #2ecc71;
          }

          &.avg {
            color: #f39c12;
          }

          &.worst {
            color: #e74c3c;
          }

          &.space {
            color: #3498db;
          }

          &.stable {
            color: #2ecc71;
          }

          &.unstable {
            color: #e74c3c;
          }
        }
      }
    }

    .detail-content {
      padding: 2rem;

      .section {
        margin-bottom: 2rem;

        h3 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1.4rem;
        }

        p {
          line-height: 1.7;
          color: #444;
          margin-bottom: 1.5rem;
        }
      }

      pre {
        background: #2d3748;
        border-radius: 8px;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

        code {
          font-family: 'Source Code Pro', monospace;
          font-size: 0.95rem;
          color: #e2e8f0;
          line-height: 1.5;
        }
      }

      .pros-cons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .pros,
        .cons {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;

          h4 {
            margin-top: 0;
            color: #2c3e50;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid;
          }

          ul {
            padding-left: 1.5rem;
            margin: 1rem 0 0 0;

            li {
              margin-bottom: 0.7rem;
              line-height: 1.5;
            }
          }
        }

        .pros {
          border-top: 4px solid #2ecc71;

          h4 {
            border-color: #2ecc71;
          }
        }

        .cons {
          border-top: 4px solid #e74c3c;

          h4 {
            border-color: #e74c3c;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
}
</style>
