<template>
  <div class="uncommon-sorts-container">
    <!-- 头部区域 -->
    <div class="header">
      <h1>非常见排序算法探索</h1>
      <p>超越经典：探索计算机科学中独特而有趣的排序算法</p>
    </div>

    <!-- 算法导航 -->
    <div class="algorithm-nav">
      <button
        v-for="(algorithm, index) in algorithms"
        :key="index"
        :class="{ active: activeAlgorithm === index }"
        @click="activeAlgorithm = index"
      >
        {{ algorithm.name }}
      </button>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 算法详情卡片 -->
      <div class="algorithm-card">
        <div class="card-header">
          <h2>{{ currentAlgorithm.name }}</h2>
          <div class="complexity">
            <span class="badge time">时间复杂度: {{ currentAlgorithm.complexity.time }}</span>
            <span class="badge space">空间复杂度: {{ currentAlgorithm.complexity.space }}</span>
            <span class="badge stability">稳定性: {{ currentAlgorithm.complexity.stable ? '稳定' : '不稳定' }}</span>
          </div>
        </div>

        <div class="card-body">
          <!-- 算法描述 -->
          <div class="algorithm-description">
            <h3>算法思路</h3>
            <p>{{ currentAlgorithm.description }}</p>
          </div>

          <!-- 代码示例 -->
          <div class="code-sample">
            <h3>TypeScript 实现</h3>
            <pre><code>{{ currentAlgorithm.code }}</code></pre>
          </div>

          <!-- 算法特点 -->
          <div class="algorithm-features">
            <h3>特点与应用场景</h3>
            <div class="features-grid">
              <div class="feature-card advantage">
                <div class="feature-icon">✅</div>
                <h4>优点</h4>
                <ul>
                  <li v-for="(advantage, idx) in currentAlgorithm.advantages" :key="'a'+idx">
                    {{ advantage }}
                  </li>
                </ul>
              </div>
              <div class="feature-card disadvantage">
                <div class="feature-icon">⚠️</div>
                <h4>缺点</h4>
                <ul>
                  <li v-for="(disadvantage, idx) in currentAlgorithm.disadvantages" :key="'d'+idx">
                    {{ disadvantage }}
                  </li>
                </ul>
              </div>
              <div class="feature-card application">
                <div class="feature-icon">💡</div>
                <h4>应用场景</h4>
                <p>{{ currentAlgorithm.applications }}</p>
              </div>
            </div>
          </div>


          <!-- 算法可视化 -->
          <div class="algorithm-visualization">
            <h3>排序过程可视化</h3>
            <div class="visualization-area">
              <div
                v-for="(value, index) in visualizationArray"
                :key="index"
                class="array-element"
                :style="{
                  height: `${value * 3}px`,
                  backgroundColor: getElementColor(index)
                }"
              >
                <span class="element-value">{{ value }}</span>
              </div>
            </div>
            <div class="controls">
              <button @click="resetVisualization">重置</button>
              <button @click="stepVisualization">单步执行</button>
              <button @click="autoVisualization = !autoVisualization">
                {{ autoVisualization ? '暂停' : '自动执行' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 算法对比 -->
      <div class="comparison-section">
        <h2>非常见排序算法对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>算法名称</th>
                <th>时间复杂度 (平均)</th>
                <th>时间复杂度 (最差)</th>
                <th>空间复杂度</th>
                <th>稳定性</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(algorithm, index) in algorithms" :key="index">
                <td>{{ algorithm.name }}</td>
                <td>{{ algorithm.complexity.time }}</td>
                <td>{{ algorithm.complexity.worstTime || algorithm.complexity.time }}</td>
                <td>{{ algorithm.complexity.space }}</td>
                <td :class="{ stable: algorithm.complexity.stable, unstable: !algorithm.complexity.stable }">
                  {{ algorithm.complexity.stable ? '稳定' : '不稳定' }}
                </td>
                <td>{{ algorithm.applicationsShort }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 算法数据
const algorithms = [
  {
    name: '地精排序 (Gnome Sort)',
    description: '地精排序类似于插入排序，但使用更简单的逻辑。它通过比较相邻元素，如果顺序错误就交换它们，然后后退一步重新检查。',
    complexity: {
      time: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    advantages: [
      '实现极其简单，代码量少',
      '对于小型或基本有序的数据集效率较高',
      '不需要嵌套循环，逻辑直观'
    ],
    disadvantages: [
      '在大数据集上性能很差',
      '平均时间复杂度较高',
      '不如其他O(n²)算法优化'
    ],
    applications: '适用于教学场景，用于展示简单的排序思想，或在嵌入式系统等资源受限环境中处理小型数据集。',
    applicationsShort: '教学、小型数据集',
    code: `function gnomeSort(arr: number[]): number[] {
  let pos = 0;

  while (pos < arr.length) {
    if (pos === 0 || arr[pos] >= arr[pos-1]) {
      pos++;
    } else {
      // 交换元素
      [arr[pos], arr[pos-1]] = [arr[pos-1], arr[pos]];
      pos--;
    }
  }

  return arr;
}`
  },
  {
    name: '鸡尾酒排序 (Cocktail Shaker Sort)',
    description: '鸡尾酒排序是冒泡排序的变体，它双向进行排序。先从左到右移动最大的元素，然后从右到左移动最小的元素，如此往复。',
    complexity: {
      time: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    advantages: [
      '比传统冒泡排序稍快',
      '对于基本有序的数据集效率较高',
      '减少某些情况下的比较次数'
    ],
    disadvantages: [
      '仍然有O(n²)的时间复杂度',
      '在大型数据集上效率低下',
      '实际应用中优化有限'
    ],
    applications: '适用于教学目的，展示冒泡排序的优化思路，或处理小型、部分有序的数据集。',
    applicationsShort: '教学、部分有序数据',
    code: `function cocktailShakerSort(arr: number[]): number[] {
  let swapped = true;
  let start = 0;
  let end = arr.length - 1;

  while (swapped) {
    swapped = false;

    // 从左向右遍历
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--;

    // 从右向左遍历
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }

    start++;
  }

  return arr;
}`
  },
  {
    name: '奇偶排序 (Odd-Even Sort)',
    description: '奇偶排序基于冒泡排序，但通过并行化优化。它分两个阶段：奇数阶段比较所有奇数索引对，偶数阶段比较所有偶数索引对，交替进行直到排序完成。',
    complexity: {
      time: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    advantages: [
      '易于并行化实现',
      '在某些硬件架构上效率较高',
      '对于部分有序数据表现良好'
    ],
    disadvantages: [
      '在单线程环境中效率不高',
      '对于随机数据性能较差',
      '不如现代排序算法高效'
    ],
    applications: '主要用于并行计算环境，或在需要利用SIMD指令集的特定硬件上实现。',
    applicationsShort: '并行计算环境',
    code: `function oddEvenSort(arr: number[]): number[] {
  const n = arr.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    // 奇数索引比较 (i=1,3,5,...)
    for (let i = 1; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }

    // 偶数索引比较 (i=0,2,4,...)
    for (let i = 0; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }

  return arr;
}`
  },
  {
    name: '梳排序 (Comb Sort)',
    description: '梳排序是冒泡排序的改进版本，通过使用大于1的间隔来消除小的值。它从较大的间隔开始，逐渐减小到1，最后使用冒泡排序完成。',
    complexity: {
      time: 'O(n log n)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: false
    },
    advantages: [
      '比冒泡排序快得多',
      '实现相对简单',
      '不需要额外内存空间',
      '比希尔排序更容易理解'
    ],
    disadvantages: [
      '最坏情况下性能较差',
      '不稳定排序',
      '不如快速排序或归并排序高效'
    ],
    applications: '适用于中等规模数据集，或作为简单排序算法的优化版本。',
    applicationsShort: '中等规模数据集',
    code: `function combSort(arr: number[]): number[] {
  const n = arr.length;
  let gap = n;
  let swapped = true;
  const shrink = 1.3;  // 收缩因子

  while (gap > 1 || swapped) {
    // 计算新间隔
    gap = Math.floor(gap / shrink);
    if (gap < 1) gap = 1;

    swapped = false;

    // 使用当前间隔进行冒泡排序
    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
}`
  },
  {
    name: '侏儒排序 (Stooge Sort)',
    description: '侏儒排序是一种递归排序算法，效率极低但概念有趣。它通过递归地将列表分成三部分，排序前2/3，再排序后2/3，然后再排序前2/3。',
    complexity: {
      time: 'O(n^(log 3 / log 1.5)) ≈ O(n^2.7095)',
      worstTime: 'O(n^(log 3 / log 1.5))',
      space: 'O(n)',
      stable: false
    },
    advantages: [
      '概念简单，易于理解递归思想',
      '教学用途展示低效算法',
      '算法思路独特有趣'
    ],
    disadvantages: [
      '效率极低，不适合实际应用',
      '递归深度大，可能栈溢出',
      '空间复杂度高'
    ],
    applications: '仅用于教学目的，展示低效算法的概念或递归思想。',
    applicationsShort: '教学目的',
    code: `function stoogeSort(arr: number[], l = 0, r = arr.length - 1): number[] {
  if (l >= r) return arr;

  // 如果第一个元素大于最后一个元素，交换它们
  if (arr[l] > arr[r]) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }

  // 如果列表元素超过2个
  if (r - l + 1 > 2) {
    const t = Math.floor((r - l + 1) / 3);

    // 递归排序前2/3
    stoogeSort(arr, l, r - t);
    // 递归排序后2/3
    stoogeSort(arr, l + t, r);
    // 再次递归排序前2/3
    stoogeSort(arr, l, r - t);
  }

  return arr;
}`
  }
]

// 响应式状态
const activeAlgorithm = ref(0)
const visualizationArray = ref<number[]>([])
const autoVisualization = ref(false)
const visualizationStep = ref(0)
const visualizationInterval = ref<any>(null)

// 当前算法
const currentAlgorithm = computed(() => {
  return algorithms[activeAlgorithm.value]
})

// 生成随机数组用于可视化
const generateVisualizationArray = () => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10)
  }
  visualizationArray.value = arr
}

// 获取元素颜色
const getElementColor = (index: number) => {
  const colors = ['#4e79c7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ac']
  return colors[index % colors.length]
}

// 重置可视化
const resetVisualization = () => {
  visualizationStep.value = 0
  generateVisualizationArray()
}

// 单步执行可视化
const stepVisualization = () => {
  if (visualizationStep.value >= 20) {
    resetVisualization()
    return
  }

  // 模拟排序过程
  const arr = [...visualizationArray.value]
  const n = arr.length
  const step = visualizationStep.value % 5

  // 模拟排序步骤（非实际算法）
  for (let i = 0; i < n - 1 - step; i++) {
    if (i % (step + 1) === 0 && arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
    }
  }

  visualizationArray.value = arr
  visualizationStep.value++
}

// 监听自动执行状态
watch(autoVisualization, (newVal) => {
  if (newVal) {
    visualizationInterval.value = setInterval(() => {
      stepVisualization()
    }, 800)
  } else {
    clearInterval(visualizationInterval.value)
  }
})

// 生命周期钩子
onMounted(() => {
  generateVisualizationArray()
})

onUnmounted(() => {
  clearInterval(visualizationInterval.value)
})
</script>

<style lang="less" scoped>

.uncommon-sorts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.8rem;
    background: linear-gradient(135deg, #4a6cf7, #6c63ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    color: #718096;
    max-width: 600px;
    margin: 0 auto;
  }
}

.algorithm-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2rem;

  button {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 50px;
    background: #ffffff;
    color: #4a6cf7;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    &.active {
      background: #4a6cf7;
      color: white;
      border-color: #4a6cf7;
      box-shadow: 0 4px 12px rgba(74, 108, 247, 0.25);
    }
  }
}

.algorithm-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
}

.card-header {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #6c63ff, #4a6cf7);
  color: white;

  h2 {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }

  .complexity {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    .badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;

      &.time {
        background: rgba(255, 255, 255, 0.15);
      }

      &.space {
        background: rgba(255, 255, 255, 0.2);
      }

      &.stability {
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }
}

.card-body {
  padding: 2rem;

  h3 {
    font-size: 1.4rem;
    color: #2d3748;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
}

.algorithm-description {
  margin-bottom: 2rem;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
  }
}

.algorithm-visualization {
  margin-bottom: 2rem;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;

  .visualization-area {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 300px;
    padding: 1rem;
    gap: 10px;

    .array-element {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      border-radius: 8px 8px 0 0;
      transition: height 0.5s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      .element-value {
        margin-bottom: 5px;
        font-weight: 600;
        color: #2d3748;
      }
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
      padding: 0.7rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: #4a6cf7;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #3a5be0;
        transform: translateY(-2px);
      }
    }
  }
}

.code-sample {
  margin-bottom: 2rem;

  pre {
    background: #1e293b;
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #cbd5e1;
    }
  }
}

.algorithm-features {
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .feature-icon {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    h4 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 1rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #4a6cf7;
          font-weight: bold;
        }
      }
    }

    p {
      color: #4a5568;
      line-height: 1.6;
    }

    &.advantage {
      border-top: 4px solid #48bb78;
    }

    &.disadvantage {
      border-top: 4px solid #e53e3e;
    }

    &.application {
      border-top: 4px solid #4299e1;
    }
  }
}

.comparison-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #4a6cf7;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    tr:hover {
      background: #edf2f7;
    }

    .stable {
      color: #48bb78;
      font-weight: 600;
    }

    .unstable {
      color: #e53e3e;
      font-weight: 600;
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .algorithm-nav {
    flex-direction: column;
    align-items: center;

    button {
      width: 100%;
    }
  }

  .visualization-area {
    .array-element {
      width: 30px !important;

      .element-value {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
