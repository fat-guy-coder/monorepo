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
          <p>
            排序算法是计算机科学中最基础的算法之一，用于将一组数据按特定顺序重新排列。选择合适的排序算法对程序性能至关重要。
          </p>
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
        <Button
          v-for="(algorithm, index) in algorithms"
          :key="index"
          type="primary"
          @click="activeAlgorithm = algorithm"
          :class="{ active: activeAlgorithm.name === algorithm.name }"
        >
          {{ algorithm.name }}
        </Button>
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
                <div class="complexity-value">
                  {{ activeAlgorithm.complexity.stable ? '稳定' : '不稳定' }}
                </div>
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
              <li v-for="(useCase, index) in activeAlgorithm.useCases" :key="index">
                {{ useCase }}
              </li>
            </ul>
          </div>
        </div>

        <div class="algorithm-code">
          <h3>实现代码 (TypeScript)</h3>
          <pre><code>{{ activeAlgorithm.code }}</code></pre>
        </div>
      </div>

      <SortAlgorithBarCharts v-model:selectedAlgorithm="activeAlgorithm.name" v-model:log="log" />
      <!-- <div class="options">
        <Button type="primary" @click="sortBy('sortTime')">排序时间</Button>
        <Button type="primary" @click="sortBy('compare')">比较次数</Button>
        <Button type="primary" @click="sortBy('swap')">交换次数</Button>
      </div> -->
      <!-- <div class="statistics">
        <Pie :data="statistics" />
      </div> -->
      <!-- INSERT_YOUR_CODE -->
      <div class="sorting-comparison-table" style="margin-top: 2rem">
        <h3>常见12种排序算法性能对比表</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.98rem">
          <thead>
            <tr style="background: #f0f4fa">
              <th style="border: 1px solid #dbeafe; padding: 8px">排序算法</th>
              <th style="border: 1px solid #dbeafe; padding: 8px">时间复杂度(最坏/平均/最好)</th>
              <th style="border: 1px solid #dbeafe; padding: 8px">空间复杂度</th>
              <th style="border: 1px solid #dbeafe; padding: 8px">稳定性</th>
              <th style="border: 1px solid #dbeafe; padding: 8px">适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">冒泡排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n²) / O(n²) / O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(1)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">小数据量，数据基本有序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">选择排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n²) / O(n²) / O(n²)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(1)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">不稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">小数据量，对稳定性无要求</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">插入排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n²) / O(n²) / O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(1)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">小数据量，数据基本有序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">希尔排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n²) / O(n^1.3) / O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(1)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">不稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">中等数据量，数据较无序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">归并排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">
                O(n log n) / O(n log n) / O(n log n)
              </td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">大数据量，要求稳定排序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">快速排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">
                O(n²) / O(n log n) / O(n log n)
              </td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(log n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">不稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">大数据量，数据较无序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">堆排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">
                O(n log n) / O(n log n) / O(n log n)
              </td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(1)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">不稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">大数据量，对稳定性无要求</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">计数排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n+k) / O(n+k) / O(n+k)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(k)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">数据范围小且集中，整数排序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">桶排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n+k) / O(n+k) / O(n+k)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n+k)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">数据分布均匀，数据量大</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">基数排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(nk) / O(nk) / O(nk)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n+k)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">数据位数不大，整数/字符串排序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">Tim排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">
                O(n log n) / O(n log n) / O(n)
              </td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">大多数实际场景，数据部分有序</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px">锦标赛排序</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">
                O(n log n) / O(n log n) / O(n log n)
              </td>
              <td style="border: 1px solid #dbeafe; padding: 8px">O(n)</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">稳定</td>
              <td style="border: 1px solid #dbeafe; padding: 8px">需要频繁找最大/最小值的场景</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 1rem; font-size: 0.95rem; color: #666">
          <strong>说明：</strong>
          <ul style="margin: 0.5rem 0 0 1.2rem; padding: 0">
            <li>大数据量推荐：归并、快速、堆、Tim、桶、基数、锦标赛排序</li>
            <li>小数据量推荐：插入、冒泡、选择、希尔排序</li>
            <li>数据基本有序推荐：插入、冒泡、Tim排序</li>
            <li>数据分布均匀或范围小：计数、桶、基数排序</li>
            <li>对稳定性有要求：插入、冒泡、归并、计数、桶、基数、Tim、锦标赛排序</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { Button } from '@/components'
import SortAlgorithBarCharts, { type LogItem } from '@/components/Charts/SortAlgorithBarCharts.vue'
// import Pie from '@/components/Charts/pie.vue'

const log = ref<LogItem[]>([])

type Key = 'sortTime' | 'compare' | 'swap'

const currentSortBy = ref<Key>('sortTime')

const sortBy = (type: Key) => {
  currentSortBy.value = type
}

// const statistics: Record<Key, any> = {
//   sortTime: {
//     '一千次': {
//       bubbleSort: 1000,
//       selectionSort: 1000,
//       insertionSort: 1000,
//       shellSort: 1000,
//       mergeSort: 1000,
//     },
//     '一万次': {
//       bubbleSort: 10000,
//       selectionSort: 10000,
//       insertionSort: 10000,
//       shellSort: 10000,
//       mergeSort: 10000,
//     },
//     '十万次': {
//       bubbleSort: 100000,
//       selectionSort: 100000,
//       insertionSort: 100000,
//       shellSort: 100000,
//       mergeSort: 100000,
//     },
//   },
//   compare: {
//     '一千次': {
//       bubbleSort: 1000,
//       selectionSort: 1000,
//       insertionSort: 1000,
//       shellSort: 1000,
//       mergeSort: 1000,
//     },
//     '一万次': {
//       bubbleSort: 10000,
//       selectionSort: 10000,
//       insertionSort: 10000,
//       shellSort: 10000,
//       mergeSort: 10000,
//     },
//   },
//   swap: {
//     '一千次': {
//       bubbleSort: 1000,
//       selectionSort: 1000,
//       insertionSort: 1000,
//       shellSort: 1000,
//       mergeSort: 1000,
//     },
//   },
// }

interface Algorithm {
  name: string
  description: string
  complexity: {
    worst: string
    average: string
    best: string
    space: string
    stable: boolean
  }
  steps: string[]
  useCases: string[]
  code: string
}

// 排序算法数据
const algorithms = ref<Algorithm[]>([])

onBeforeMount(async () => {
  const data = await import('../../JSON/SortingAlgorithm.json')
  algorithms.value = data.default as Algorithm[]
  algorithms.value[algorithms.value.length - 2].code = `function timSort(arr) {
    const MIN_MERGE = 32;

    // 计算最小run长度
    function calcMinRun(n) {
        let r = 0;
        while (n >= MIN_MERGE) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }

    // 插入排序（用于小数组或run）
    function insertionSort(arr, left, right) {
        for (let i = left + 1; i <= right; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    // 合并两个相邻的run
    function merge(arr, left, mid, right) {
        const len1 = mid - left + 1;
        const len2 = right - mid;
        const leftArr = new Array(len1);
        const rightArr = new Array(len2);

        for (let i = 0; i < len1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (let i = 0; i < len2; i++) {
            rightArr[i] = arr[mid + 1 + i];
        }

        let i = 0, j = 0, k = left;
        while (i < len1 && j < len2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        while (i < len1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < len2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    // 主排序函数
    const n = arr.length;
    if (n < 2) return arr;

    const minRun = calcMinRun(n);
    const runs = [];

    // 分割数组为多个run并排序
    for (let i = 0; i < n; i += minRun) {
        const end = Math.min(i + minRun - 1, n - 1);
        insertionSort(arr, i, end);
        runs.push({ start: i, length: end - i + 1 });
    }

    // 合并所有run
    while (runs.length > 1) {
        const run1 = runs.pop();
        const run2 = runs.pop();
        const start1 = run1.start;
        const start2 = run2.start;
        const len1 = run1.length;
        const len2 = run2.length;
        const end1 = start1 + len1 - 1;
        const end2 = start2 + len2 - 1;

        // 确保run1在run2之前
        if (end1 + 1 !== start2) {
            runs.push(run2);
            runs.push(run1);
            continue;
        }

        merge(arr, start1, end1, end2);
        runs.push({ start: start1, length: len1 + len2 });
    }

    return arr;
}

// 示例用法
const array = [5, 2, 9, 1, 5, 6, 3, 8, 7, 4];
console.log("排序前:", array);
timSort(array);
console.log("排序后:", array);`
})

// 当前活动算法
const activeAlgorithm = ref<Algorithm>({
  name: '冒泡排序',
  description: '重复遍历数组，比较相邻元素，如果顺序错误就交换它们。',
  complexity: {
    worst: 'O(n²)',
    average: 'O(n²)',
    best: 'O(n)',
    space: 'O(1)',
    stable: true,
  },
  steps: [
    '从数组的第一个元素开始',
    '比较当前元素和下一个元素',
    '如果当前元素大于下一个元素，交换它们',
    '对每一对相邻元素重复上述步骤',
    '重复整个过程，直到没有需要交换的元素',
  ],
  useCases: ['教学目的，理解排序基本原理', '小规模数据排序', '几乎已经排序好的数据'],
  code: 'function bubbleSort(arr: number[]): number[] {\n const n = arr.length;\n for (let i = 0; i < n - 1; i++) {\n let swapped = false;\n for (let j = 0; j < n - i - 1; j++) {\n if (arr[j] > arr[j + 1]) {\n [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n swapped = true;\n }\n }\n if (!swapped) break;\n }\n return arr;\n}',
})
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

.options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  text-align: center;
  color: #fff;
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
    transition: all 0.2s;
    color: #fff;

    &:hover {
      background: #cbd5e1;
    }

    &.active {
      background: #e2e8f0;
      color: black;
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

  input[type='range'] {
    width: 150px;
  }

  span {
    min-width: 100px;
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
