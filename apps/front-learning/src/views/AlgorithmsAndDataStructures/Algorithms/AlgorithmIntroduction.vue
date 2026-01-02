<template>
  <div class="algorithms-container">
    <header>
      <h1>算法分类与实现指南</h1>
      <p>掌握核心算法原理与应用场景</p>
    </header>

    <div class="algorithm-types">
      <div class="type-card" v-for="(type, index) in algorithmTypes" :key="index" @click="activeType = type.id">
        <div class="type-icon">{{ type.icon }}</div>
        <div class="type-name">{{ type.name }}</div>
        <div class="type-count">{{ getAlgorithmCount(type.id) }} 种算法</div>
      </div>
    </div>

    <div class="algorithms-grid">
      <div class="algorithm-card" v-for="(algo, index) in filteredAlgorithms" :key="index">
        <div class="algorithm-header">
          <div class="algo-icon">{{ algo.icon }}</div>
          <h3>{{ algo.name }}</h3>
          <div class="algo-tag">{{ algo.category }}</div>
        </div>

        <div class="algorithm-content">
          <div class="algo-description">
            <p>{{ algo.description }}</p>
          </div>

          <div class="algo-code">
            <pre><code>{{ algo.code }}</code></pre>
          </div>

          <div class="algo-scenarios">
            <div class="scenario-header">应用场景</div>
            <ul>
              <li v-for="(scenario, sIndex) in algo.scenarios" :key="sIndex">{{ scenario }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeType = ref(0); // 0 表示所有类型

const algorithmTypes = [
  { id: 0, name: '所有算法', icon: '📚' },
  { id: 1, name: '排序算法', icon: '🔄' },
  { id: 2, name: '搜索算法', icon: '🔍' },
  { id: 3, name: '图论算法', icon: '📊' },
  { id: 4, name: '动态规划', icon: '🧩' },
  { id: 5, name: '贪心算法', icon: '🎯' },
  { id: 6, name: '分治算法', icon: '✂️' },
  { id: 7, name: '字符串算法', icon: '🔤' },
];

const algorithms = [
  {
    id: 1,
    name: "快速排序",
    icon: "⚡",
    category: "排序算法",
    description: "基于分治思想的高效排序算法，平均时间复杂度为 O(n log n)",
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    scenarios: [
      "大规模数据排序",
      "需要原地排序的场景",
      "对排序稳定性要求不高的场景"
    ]
  },
  {
    id: 2,
    name: "二分搜索",
    icon: "🔍",
    category: "搜索算法",
    description: "在有序数组中高效查找元素的算法，时间复杂度为 O(log n)",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
    scenarios: [
      "有序数据查找",
      "大型数据库查询",
      "数值范围搜索"
    ]
  },
  {
    id: 3,
    name: "Dijkstra算法",
    icon: "📍",
    category: "图论算法",
    description: "用于在加权图中寻找单源最短路径的经典算法",
    code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();

  // 初始化距离
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let minVertex = null;
    for (const vertex in distances) {
      if (!visited.has(vertex) &&
          (minVertex === null || distances[vertex] < distances[minVertex])) {
        minVertex = vertex;
      }
    }

    if (minVertex === null) break;
    visited.add(minVertex);

    for (const neighbor in graph[minVertex]) {
      const distance = distances[minVertex] + graph[minVertex][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
      }
    }
  }

  return distances;
}`,
    scenarios: [
      "网络路由路径选择",
      "地图导航系统",
      "交通网络优化"
    ]
  },
  {
    id: 4,
    name: "斐波那契数列",
    icon: "📈",
    category: "动态规划",
    description: "使用动态规划高效计算斐波那契数列，避免递归的重复计算",
    code: `function fibonacci(n) {
  if (n <= 1) return n;

  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// 优化空间复杂度版本
function fibOptimized(n) {
  if (n <= 1) return n;

  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}`,
    scenarios: [
      "算法教学基础案例",
      "理解动态规划思想",
      "数值序列计算"
    ]
  },
  {
    id: 5,
    name: "背包问题(分数)",
    icon: "🎒",
    category: "贪心算法",
    description: "使用贪心策略解决分数背包问题，实现价值最大化",
    code: `function fractionalKnapsack(capacity, items) {
  // 计算价值密度
  items.forEach(item => {
    item.ratio = item.value / item.weight;
  });

  // 按价值密度降序排序
  items.sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remaining = capacity;

  for (const item of items) {
    if (remaining >= item.weight) {
      // 全部装入
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // 部分装入
      totalValue += item.ratio * remaining;
      break;
    }
  }

  return totalValue;
}`,
    scenarios: [
      "资源优化分配问题",
      "货物装载优化",
      "投资组合管理"
    ]
  },
  {
    id: 6,
    name: "归并排序",
    icon: "🔄",
    category: "分治算法",
    description: "基于分治思想的稳定排序算法，时间复杂度为 O(n log n)",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    scenarios: [
      "大数据集外部排序",
      "链表排序",
      "需要稳定排序的场景"
    ]
  },
  {
    id: 7,
    name: "KMP算法",
    icon: "🔤",
    category: "字符串算法",
    description: "高效的字符串匹配算法，时间复杂度为 O(n+m)",
    code: `function kmpSearch(text, pattern) {
  const lps = computeLPSArray(pattern);
  let i = 0, j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      return i - j; // 匹配位置
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }

  return -1;
}

function computeLPSArray(pattern) {
  const lps = [0];
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}`,
    scenarios: [
      "文本编辑器中的查找功能",
      "DNA序列匹配",
      "搜索引擎关键词匹配"
    ]
  },
  {
    id: 8,
    name: "BFS广度优先搜索",
    icon: "🕸️",
    category: "图论算法",
    description: "用于图的遍历或查找最短路径（无权重图）",
    code: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];

  while (queue.length) {
    const vertex = queue.shift();
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}`,
    scenarios: [
      "社交网络好友关系遍历",
      "最短路径查找（无权重图）",
      "网络爬虫页面抓取"
    ]
  },
  {
    id: 9,
    name: "DFS深度优先搜索",
    icon: "🕸️",
    category: "图论算法",
    description: "用于图的遍历、拓扑排序、路径查找等",
    code: `function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();
  const result = [];

  while (stack.length) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of graph[vertex]) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

// 递归实现
function dfsRecursive(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);

  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }

  return result;
}`,
    scenarios: [
      "迷宫求解",
      "拓扑排序",
      "连通分量检测"
    ]
  },
  {
    id: 10,
    name: "堆排序",
    icon: "📊",
    category: "排序算法",
    description: "基于二叉堆的排序算法，时间复杂度为 O(n log n)",
    code: `function heapSort(arr) {
  // 构建最大堆
  buildMaxHeap(arr);

  // 从后向前排序
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }

  return arr;
}

function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n);
  }
}

function heapify(arr, i, heapSize) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, heapSize);
  }
}`,
    scenarios: [
      "需要原地排序的大数据集",
      "优先队列实现",
      "实时数据流排序"
    ]
  },
  {
    id: 11,
    name: "LRU缓存",
    icon: "🗃️",
    category: "设计算法",
    description: "最近最少使用缓存淘汰策略",
    code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的元素
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, value);
  }
}`,
    scenarios: [
      "浏览器缓存管理",
      "数据库查询缓存",
      "API响应缓存"
    ]
  },
  {
    id: 12,
    name: "布隆过滤器",
    icon: "✅",
    category: "概率算法",
    description: "高效的概率型数据结构，用于检查元素是否在集合中",
    code: `class BloomFilter {
  constructor(size, hashFunctions) {
    this.size = size;
    this.hashFunctions = hashFunctions;
    this.bitArray = new Array(size).fill(false);
  }

  add(item) {
    for (const hashFn of this.hashFunctions) {
      const index = hashFn(item) % this.size;
      this.bitArray[index] = true;
    }
  }

  contains(item) {
    for (const hashFn of this.hashFunctions) {
      const index = hashFn(item) % this.size;
      if (!this.bitArray[index]) {
        return false;
      }
    }
    return true;
  }
}

// 示例哈希函数
function hash1(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function hash2(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}`,
    scenarios: [
      "垃圾邮件过滤",
      "缓存穿透防护",
      "URL去重"
    ]
  },
];

const filteredAlgorithms = computed(() => {
  if (activeType.value === 0) return algorithms;
  return algorithms.filter(algo => {
    const type = algorithmTypes.find(t => t.id === activeType.value)?.name || "";
    return algo.category === type;
  });
});

function getAlgorithmCount(typeId: number) {
  if (typeId === 0) return algorithms.length;
  const typeName = algorithmTypes.find(t => t.id === typeId)?.name || "";
  return algorithms.filter(algo => algo.category === typeName).length;
}
</script>

<style lang="less" scoped>


.algorithms-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  color: #1e293b;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);

  header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.3rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1rem;
      color: #64748b;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.algorithm-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  .type-card {
    background: white;
    border-radius: 8px;
    padding: 1rem 0.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;

    &:hover,
    &.active {
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba(99, 102, 241, 0.1);
      border-color: #c7d2fe;
    }

    .type-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .type-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: #1e293b;
      margin-bottom: 0.3rem;
    }

    .type-count {
      font-size: 0.8rem;
      color: #64748b;
    }
  }
}

.algorithms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.2rem;

  .algorithm-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      transform: translateY(-3px);
    }

    .algorithm-header {
      display: flex;
      align-items: center;
      padding: 0.8rem 1rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;

      .algo-icon {
        font-size: 1.5rem;
        margin-right: 0.8rem;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e0e7ff;
        border-radius: 6px;
        color: #6366f1;
      }

      h3 {
        flex: 1;
        margin: 0;
        font-size: 1.1rem;
        color: #1e293b;
      }

      .algo-tag {
        background: #e0e7ff;
        color: #6366f1;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }

    .algorithm-content {
      padding: 1rem;

      .algo-description {
        p {
          margin: 0 0 0.8rem;
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }

      .algo-code {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 0.8rem;
        margin: 0.8rem 0;
        overflow-x: auto;
        max-height: 200px;
        overflow-y: auto;

        pre {
          margin: 0;
          font-size: 0.8rem;
          line-height: 1.4;

          code {
            font-family: 'JetBrains Mono', monospace;
            color: #4338ca;
          }
        }
      }

      .algo-scenarios {
        .scenario-header {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid #e2e8f0;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            font-size: 0.85rem;
            color: #475569;
            margin-bottom: 0.4rem;
            line-height: 1.4;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .algorithms-container {
    padding: 1rem;
  }

  .algorithms-grid {
    grid-template-columns: 1fr;
  }

  .algorithm-types {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }
}
</style>
