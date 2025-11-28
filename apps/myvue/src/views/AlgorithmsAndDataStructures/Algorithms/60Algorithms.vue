<template>
  <div class="algorithms-container">
    <header class="page-header">
      <h1>60种常用算法介绍</h1>
      <p class="subtitle">从基础到进阶的算法知识介绍</p>
    </header>

    <div class="intro-section">
      <p>算法是计算机科学的核心，是解决问题的方法和步骤。本页面整理了60种常用算法，从基础排序到高级图论算法，帮助您系统学习算法知识。</p>
    </div>

    <div class="filter-controls">
      <div class="filter-group">
        <label>难度筛选:</label>
        <select v-model:value="filterDifficulty" style="width:200px;" @change="filterAlgorithms">
          <select-option :value="'all'">全部</select-option>
          <select-option :value="'beginner'">初级</select-option>
          <select-option :value="'intermediate'">中级</select-option>
          <select-option :value="'advanced'">高级</select-option>
        </select>
      </div>
      <div class="filter-group">
        <label>分类筛选:</label>
        <select v-model:value="filterCategory" style="width:200px;" @change="filterAlgorithms">
          <option value="all">全部</option>
          <select-option :value="'sorting'">排序算法</select-option>
          <select-option :value="'searching'">搜索算法</select-option>
          <select-option :value="'graph'">图算法</select-option>
          <select-option :value="'dp'">动态规划</select-option>
          <select-option :value="'math'">数学算法</select-option>
          <select-option :value="'string'">字符串算法</select-option>
          <select-option :value="'other'">其他算法</select-option>
        </select>
      </div>
    </div>

    <div class="algorithms-grid">
      <div
        v-for="algorithm in filteredAlgorithms"
        :key="algorithm.id"
        :class="['algorithm-card', `difficulty-${algorithm.difficulty}`]"
      >
        <div class="card-header">
          <h3>{{ algorithm.name }}</h3>
          <div class="algorithm-tags">
            <span class="tag category">{{ algorithm.category }}</span>
            <span class="tag difficulty">{{ algorithm.difficulty }}</span>
          </div>
        </div>

        <div class="card-content">
          <p class="description">{{ algorithm.description }}</p>

          <div class="algorithm-details">
            <div class="detail-item">
              <strong>思路:</strong> {{ algorithm.idea }}
            </div>
            <div class="detail-item">
              <strong>时间复杂度:</strong> {{ algorithm.timeComplexity }}
            </div>
            <div class="detail-item">
              <strong>空间复杂度:</strong> {{ algorithm.spaceComplexity }}
            </div>
          </div>

          <div class="code-preview" v-if="algorithm.code">
            <pre><code>{{ algorithm.code }}</code></pre>
          </div>

          <div class="applications" v-if="algorithm.applications">
            <strong>应用场景:</strong> {{ algorithm.applications }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 筛选条件
const filterDifficulty = ref('all');
const filterCategory = ref('all');

// 算法数据
const algorithms = ref([
  {
    id: 1,
    name: '冒泡排序',
    category: 'sorting',
    difficulty: 'beginner',
    description: '通过重复比较相邻元素并交换位置来排序',
    idea: '每次遍历将最大元素移动到末尾，重复n-1次',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    applications: '教学示例，小规模数据排序'
  },
  {
    id: 2,
    name: '选择排序',
    category: 'sorting',
    difficulty: 'beginner',
    description: '每次选择最小元素放到已排序序列末尾',
    idea: '在未排序序列中找到最小元素，与起始位置交换',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
    applications: '教学示例，小规模数据排序'
  },
  {
    id: 3,
    name: '插入排序',
    category: 'sorting',
    difficulty: 'beginner',
    description: '构建有序序列，对未排序数据在已排序序列中从后向前扫描，找到位置插入',
    idea: '将元素插入到已排序数组的正确位置',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    applications: '小规模数据，基本有序数据'
  },
  {
    id: 4,
    name: '快速排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '分治算法，选择一个基准元素将数组分成两个子数组',
    idea: '选取基准，分区操作，递归排序',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    applications: '大规模数据排序，性能要求高的场景'
  },
  {
    id: 5,
    name: '归并排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '分治算法，将数组分成两半分别排序，然后合并',
    idea: '分割、排序、合并',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
    applications: '大数据排序，外部排序，稳定排序需求'
  },
  {
    id: 6,
    name: '堆排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '利用堆数据结构设计的排序算法',
    idea: '构建最大堆，交换堆顶与末尾元素，调整堆',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    code: `function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    applications: '大数据排序，优先级队列'
  },
  {
    id: 7,
    name: '希尔排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '插入排序的改进版，通过增量序列分组插入排序',
    idea: '按增量分组进行插入排序，逐渐减小增量',
    timeComplexity: 'O(n log n) 到 O(n²)',
    spaceComplexity: 'O(1)',
    applications: '中等规模数据，比插入排序更高效'
  },
  {
    id: 8,
    name: '计数排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '非比较排序算法，适用于整数排序',
    idea: '统计每个元素出现次数，计算位置',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    applications: '整数排序，值范围不大的情况'
  },
  {
    id: 9,
    name: '桶排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '将数据分到有限数量的桶里，每个桶分别排序',
    idea: '分桶、桶内排序、合并',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n + k)',
    applications: '均匀分布的数据，外部排序'
  },
  {
    id: 10,
    name: '基数排序',
    category: 'sorting',
    difficulty: 'intermediate',
    description: '按照低位先排序，然后收集，再按高位排序',
    idea: '从最低位到最高位依次进行稳定排序',
    timeComplexity: 'O(nk)',
    spaceComplexity: 'O(n + k)',
    applications: '整数、字符串排序'
  },
  {
    id: 11,
    name: '线性搜索',
    category: 'searching',
    difficulty: 'beginner',
    description: '逐个检查每个元素直到找到目标',
    idea: '顺序遍历，比较每个元素',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    applications: '无序小数据集搜索'
  },
  {
    id: 12,
    name: '二分搜索',
    category: 'searching',
    difficulty: 'beginner',
    description: '在有序数组中查找特定元素',
    idea: '每次比较中间元素，缩小搜索范围一半',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
}`,
    applications: '有序数组查找，快速定位'
  },
  {
    id: 13,
    name: '深度优先搜索(DFS)',
    category: 'graph',
    difficulty: 'intermediate',
    description: '沿着树的深度遍历节点，尽可能深地搜索分支',
    idea: '使用栈或递归，深入到底再回溯',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: '路径查找，拓扑排序，连通分量'
  },
  {
    id: 14,
    name: '广度优先搜索(BFS)',
    category: 'graph',
    difficulty: 'intermediate',
    description: '从根节点开始，逐层遍历所有节点',
    idea: '使用队列，按层次遍历',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: '最短路径，层级遍历，社交网络'
  },
  {
    id: 15,
    name: 'Dijkstra算法',
    category: 'graph',
    difficulty: 'advanced',
    description: '寻找图中单源最短路径',
    idea: '贪心策略，每次选择距离起点最近的未访问节点',
    timeComplexity: 'O(V²) 或 O(E log V)',
    spaceComplexity: 'O(V)',
    applications: '路由选择，地图导航，网络优化'
  },
  {
    id: 16,
    name: 'Bellman-Ford算法',
    category: 'graph',
    difficulty: 'advanced',
    description: '处理带负权边的单源最短路径',
    idea: '松弛所有边V-1次，检测负权环',
    timeComplexity: 'O(VE)',
    spaceComplexity: 'O(V)',
    applications: '负权图最短路径，金融套利检测'
  },
  {
    id: 17,
    name: 'Floyd-Warshall算法',
    category: 'graph',
    difficulty: 'advanced',
    description: '计算图中所有顶点对之间的最短路径',
    idea: '动态规划，通过中间节点更新最短路径',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    applications: '全局最短路径，网络路由'
  },
  {
    id: 18,
    name: 'Prim算法',
    category: 'graph',
    difficulty: 'intermediate',
    description: '寻找加权无向图的最小生成树',
    idea: '从任意顶点开始，每次添加最小权边连接树与非树节点',
    timeComplexity: 'O(V²) 或 O(E log V)',
    spaceComplexity: 'O(V)',
    applications: '网络设计，电路布线'
  },
  {
    id: 19,
    name: 'Kruskal算法',
    category: 'graph',
    difficulty: 'intermediate',
    description: '寻找加权无向图的最小生成树',
    idea: '按权重排序边，使用并查集避免环',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(E)',
    applications: '网络设计，聚类分析'
  },
  {
    id: 20,
    name: '拓扑排序',
    category: 'graph',
    difficulty: 'intermediate',
    description: '对有向无环图的顶点线性排序',
    idea: '使用DFS或BFS，保证u在v前如果存在u→v边',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: '任务调度，依赖关系解析'
  },
  {
    id: 21,
    name: 'A*搜索算法',
    category: 'searching',
    difficulty: 'advanced',
    description: '启发式搜索，在图形平面上寻找最低成本路径',
    idea: 'f(n) = g(n) + h(n)，g为实际成本，h为启发函数',
    timeComplexity: '取决于启发函数',
    spaceComplexity: 'O(V)',
    applications: '游戏AI，路径规划，机器人导航'
  },
  {
    id: 22,
    name: '0-1背包问题',
    category: 'dp',
    difficulty: 'intermediate',
    description: '在容量限制下选择物品使总价值最大',
    idea: 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1]] + val[i-1])',
    timeComplexity: 'O(nW)',
    spaceComplexity: 'O(nW)',
    applications: '资源分配，投资组合'
  },
  {
    id: 23,
    name: '最长公共子序列(LCS)',
    category: 'dp',
    difficulty: 'intermediate',
    description: '找到两个序列的最长公共子序列',
    idea: 'dp[i][j] = 1 + dp[i-1][j-1] if X[i]=Y[j] else max(dp[i-1][j], dp[i][j-1])',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    applications: '版本控制，生物信息学'
  },
  {
    id: 24,
    name: '最长递增子序列(LIS)',
    category: 'dp',
    difficulty: 'intermediate',
    description: '找到序列中最长的递增子序列',
    idea: 'dp[i] = max(dp[j]) + 1 对于所有 j < i 且 arr[j] < arr[i]',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    applications: '序列分析，数据挖掘'
  },
  {
    id: 25,
    name: '编辑距离',
    category: 'dp',
    difficulty: 'intermediate',
    description: '计算将一个字符串转换为另一个字符串所需的最少操作次数',
    idea: '插入、删除、替换操作，dp[i][j]表示转换所需最小操作',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    applications: '拼写检查，DNA序列比对'
  },
  {
    id: 26,
    name: '矩阵链乘法',
    category: 'dp',
    difficulty: 'advanced',
    description: '找到矩阵相乘的最优顺序以最小化标量乘法次数',
    idea: 'dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    applications: '编译器优化，数值计算'
  },
  {
    id: 27,
    name: '斐波那契数列',
    category: 'dp',
    difficulty: 'beginner',
    description: '每个数字是前两个数字之和的序列',
    idea: 'F(n) = F(n-1) + F(n-2)，使用记忆化或迭代',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
    applications: '数学建模，算法教学'
  },
  {
    id: 28,
    name: '硬币找零问题',
    category: 'dp',
    difficulty: 'intermediate',
    description: '用最少数量的硬币凑出指定金额',
    idea: 'dp[i] = min(dp[i], dp[i-coin] + 1) 对于所有硬币',
    timeComplexity: 'O(nm)',
    spaceComplexity: 'O(n)',
    applications: '自动售货机，支付系统'
  },
  {
    id: 29,
    name: '旅行商问题(TSP)',
    category: 'dp',
    difficulty: 'advanced',
    description: '找到访问所有城市并返回起点的最短路径',
    idea: '动态规划 + 状态压缩，dp[mask][i]表示访问mask中城市并在i结束的最小成本',
    timeComplexity: 'O(n²2ⁿ)',
    spaceComplexity: 'O(n2ⁿ)',
    applications: '物流规划，电路板钻孔'
  },
  {
    id: 30,
    name: '贪心算法-活动选择',
    category: 'other',
    difficulty: 'intermediate',
    description: '选择最大数量的互不重叠的活动',
    idea: '按结束时间排序，每次选择最早结束且不与已选活动冲突的活动',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    applications: '课程安排，资源调度'
  },
  {
    id: 31,
    name: '哈夫曼编码',
    category: 'other',
    difficulty: 'intermediate',
    description: '数据压缩算法，为频繁出现的字符分配较短编码',
    idea: '构建哈夫曼树，从叶子到根分配编码',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    applications: '数据压缩，文件编码'
  },
  {
    id: 32,
    name: 'KMP算法',
    category: 'string',
    difficulty: 'advanced',
    description: '字符串匹配算法，利用失败函数避免重复比较',
    idea: '构建部分匹配表，匹配失败时利用已知信息跳过不必要的比较',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(m)',
    applications: '文本编辑器，DNA序列匹配'
  },
  {
    id: 33,
    name: 'Rabin-Karp算法',
    category: 'string',
    difficulty: 'intermediate',
    description: '使用哈希的字符串匹配算法',
    idea: '计算模式串哈希和文本子串哈希，哈希匹配时验证实际内容',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    applications: '抄袭检测，多模式匹配'
  },
  {
    id: 34,
    name: 'Boyer-Moore算法',
    category: 'string',
    difficulty: 'advanced',
    description: '高效的字符串匹配算法，从右向左比较',
    idea: '坏字符规则和好后缀规则，允许跳过多个字符',
    timeComplexity: 'O(n/m) 最好情况',
    spaceComplexity: 'O(m)',
    applications: '文本搜索，IDE代码搜索'
  },
  {
    id: 35,
    name: '并查集(Union-Find)',
    category: 'other',
    difficulty: 'intermediate',
    description: '处理不相交集合的合并与查询',
    idea: '使用树结构，路径压缩和按秩合并优化',
    timeComplexity: 'O(α(n))',
    spaceComplexity: 'O(n)',
    code: `class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill().map((_, i) => i);
    this.rank = Array(size).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  union(x, y) {
    const rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      if (this.rank[rootX] === this.rank[rootY]) this.rank[rootX]++;
    }
  }
}`,
    applications: '连通分量，Kruskal算法，网络连接'
  },
  {
    id: 36,
    name: '线段树',
    category: 'other',
    difficulty: 'advanced',
    description: '用于区间查询和更新的树结构',
    idea: '将区间分成两半递归构建，支持区间查询和点更新',
    timeComplexity: '构建O(n)，查询/更新O(log n)',
    spaceComplexity: 'O(n)',
    applications: '区间最值，区间求和，范围统计'
  },
  {
    id: 37,
    name: '树状数组(Fenwick Tree)',
    category: 'other',
    difficulty: 'intermediate',
    description: '高效计算前缀和的数据结构',
    idea: '利用二进制索引，每个节点存储部分和',
    timeComplexity: '更新/查询 O(log n)',
    spaceComplexity: 'O(n)',
    applications: '动态前缀和，逆序对计数'
  },
  {
    id: 38,
    name: 'LRU缓存',
    category: 'other',
    difficulty: 'intermediate',
    description: '最近最少使用缓存淘汰算法',
    idea: '哈希表+双向链表，快速访问和移动节点',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    applications: '缓存系统，数据库缓冲'
  },
  {
    id: 39,
    name: 'LFU缓存',
    category: 'other',
    difficulty: 'advanced',
    description: '最不经常使用缓存淘汰算法',
    idea: '维护频率哈希表和频率双向链表',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    applications: '缓存系统，内容分发网络'
  },
  {
    id: 40,
    name: '布隆过滤器',
    category: 'other',
    difficulty: 'intermediate',
    description: '概率型数据结构，判断元素是否在集合中',
    idea: '多个哈希函数，位数组，可能存在误报但不会漏报',
    timeComplexity: 'O(k)',
    spaceComplexity: 'O(m)',
    applications: '缓存击穿保护，爬虫URL去重'
  },
  {
    id: 41,
    name: '跳表(Skip List)',
    category: 'other',
    difficulty: 'intermediate',
    description: '概率性数据结构，有序链表的快速搜索',
    idea: '多层索引，类似电梯快速到达目标楼层',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    applications: 'Redis有序集合，LevelDB'
  },
  {
    id: 42,
    name: '一致性哈希',
    category: 'other',
    difficulty: 'advanced',
    description: '分布式哈希表算法，最小化节点变化的影响',
    idea: '哈希环，虚拟节点，顺时针查找',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    applications: '分布式缓存，负载均衡'
  },
  {
    id: 43,
    name: '最小生成树-Kruskal',
    category: 'graph',
    difficulty: 'intermediate',
    description: '找到连接所有顶点的最小权重边集合',
    idea: '按权重排序边，使用并查集避免环',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    applications: '网络设计，电路连接'
  },
  {
    id: 44,
    name: '最小生成树-Prim',
    category: 'graph',
    difficulty: 'intermediate',
    description: '找到连接所有顶点的最小权重边集合',
    idea: '从任意顶点开始，每次添加最小权边',
    timeComplexity: 'O(V²)',
    spaceComplexity: 'O(V)',
    applications: '网络设计，聚类分析'
  },
  {
    id: 45,
    name: '强连通分量-Kosaraju',
    category: 'graph',
    difficulty: 'advanced',
    description: '找到有向图中的强连通分量',
    idea: 'DFS两次，第一次逆序，第二次在原图上DFS',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: '编译器优化，社交网络分析'
  },
  {
    id: 46,
    name: '强连通分量-Tarjan',
    category: 'graph',
    difficulty: 'advanced',
    description: '找到有向图中的强连通分量',
    idea: '使用栈和low-link值，一次DFS完成',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    applications: '依赖分析，代码优化'
  },
  {
    id: 47,
    name: '欧拉路径/回路',
    category: 'graph',
    difficulty: 'intermediate',
    description: '遍历图中每条边恰好一次的路径',
    idea: '检查度数，使用Hierholzer算法',
    timeComplexity: 'O(E)',
    spaceComplexity: 'O(V + E)',
    applications: 'DNA测序，路线规划'
  },
  {
    id: 48,
    name: '汉密尔顿路径',
    category: 'graph',
    difficulty: 'advanced',
    description: '访问每个顶点恰好一次的路径',
    idea: '回溯法，动态规划',
    timeComplexity: 'O(n!·n) 或 O(n²·2ⁿ)',
    spaceComplexity: 'O(n·2ⁿ)',
    applications: '旅行商问题，路线优化'
  },
  {
    id: 49,
    name: '最大流问题-Ford-Fulkerson',
    category: 'graph',
    difficulty: 'advanced',
    description: '找到网络中从源点到汇点的最大流量',
    idea: '不断寻找增广路径，更新残留网络',
    timeComplexity: 'O(E · max_flow)',
    spaceComplexity: 'O(V + E)',
    applications: '网络流量，匹配问题'
  },
  {
    id: 50,
    name: '最大流问题-Edmonds-Karp',
    category: 'graph',
    difficulty: 'advanced',
    description: 'Ford-Fulkerson的BFS实现',
    idea: '使用BFS寻找最短增广路径',
    timeComplexity: 'O(VE²)',
    spaceComplexity: 'O(V + E)',
    applications: '网络流量， bipartite匹配'
  },
  {
    id: 51,
    name: '二分图匹配',
    category: 'graph',
    difficulty: 'advanced',
    description: '在二分图中找到最大匹配',
    idea: '使用DFS或BFS寻找增广路径',
    timeComplexity: 'O(VE)',
    spaceComplexity: 'O(V + E)',
    applications: '任务分配，婚姻稳定问题'
  },
  {
    id: 52,
    name: '匈牙利算法',
    category: 'graph',
    difficulty: 'advanced',
    description: '解决二分图最大匹配问题',
    idea: '不断寻找增广路径，更新匹配',
    timeComplexity: 'O(VE)',
    spaceComplexity: 'O(V + E)',
    applications: '任务分配，资源调度'
  },
  {
    id: 53,
    name: '最小割问题',
    category: 'graph',
    difficulty: 'advanced',
    description: '将图分成两部分的最小权重边集合',
    idea: '最大流最小割定理',
    timeComplexity: '取决于最大流算法',
    spaceComplexity: 'O(V + E)',
    applications: '图像分割，社区发现'
  },
  {
    id: 54,
    name: '最近点对问题',
    category: 'other',
    difficulty: 'advanced',
    description: '在平面上找到距离最近的两个点',
    idea: '分治法，按x坐标排序，递归求解',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    applications: '计算机图形学，碰撞检测'
  },
  {
    id: 55,
    name: '凸包算法-Graham Scan',
    category: 'other',
    difficulty: 'intermediate',
    description: '找到点集的凸包',
    idea: '按极角排序，使用栈维护凸包',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    applications: '计算机图形学，路径规划'
  },
  {
    id: 56,
    name: '快速选择算法',
    category: 'searching',
    difficulty: 'intermediate',
    description: '在未排序数组中找到第k小的元素',
    idea: '类似快速排序，但只递归处理包含第k元素的子数组',
    timeComplexity: 'O(n) 平均',
    spaceComplexity: 'O(1)',
    applications: '统计学，中位数查找'
  },
  {
    id: 57,
    name: '曼哈顿距离',
    category: 'math',
    difficulty: 'beginner',
    description: '网格系统中两点距离的度量',
    idea: '|x1-x2| + |y1-y2|',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    applications: '路径规划，网格游戏'
  },
  {
    id: 58,
    name: '欧几里得距离',
    category: 'math',
    difficulty: 'beginner',
    description: '平面中两点间的直线距离',
    idea: '√((x1-x2)² + (y1-y2)²)',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    applications: '几何计算，机器学习'
  },
  {
    id: 59,
    name: '洗牌算法-Fisher-Yates',
    category: 'other',
    difficulty: 'beginner',
    description: '生成随机排列的算法',
    idea: '从后向前，每个位置与前面随机位置交换',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}`,
    applications: '随机化，游戏开发'
  },
  {
    id: 60,
    name: '约瑟夫环问题',
    category: 'math',
    difficulty: 'intermediate',
    description: '围成一圈报数，报到特定数字的人出列',
    idea: '数学递推或模拟，f(n,k) = (f(n-1,k) + k) % n',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    applications: '算法教学，游戏理论'
  }
]);

// 筛选算法
const filteredAlgorithms = computed(() => {
  let result = algorithms.value;

  if (filterDifficulty.value !== 'all') {
    result = result.filter(algo => algo.difficulty === filterDifficulty.value);
  }

  if (filterCategory.value !== 'all') {
    result = result.filter(algo => algo.category === filterCategory.value);
  }

  return result;
});

const filterAlgorithms = () => {
  // 筛选逻辑已在computed属性中处理
};
</script>

<style lang="less" scoped>
.algorithms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #64748b;
    font-weight: 400;
  }
}

.intro-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
}

.filter-controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    label {
      font-weight: 500;
      color: #475569;
    }

    select {
      padding: 0.5rem 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: white;
      color: #475569;
    }
  }
}

.algorithms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.algorithm-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.difficulty-beginner {
    border-top: 4px solid #10b981;
  }

  &.difficulty-intermediate {
    border-top: 4px solid #f59e0b;
  }

  &.difficulty-advanced {
    border-top: 4px solid #ef4444;
  }
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
  }
}

.algorithm-tags {
  display: flex;
  gap: 0.5rem;

  .tag {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;

    &.category {
      background: #dbeafe;
      color: #1e40af;
    }

    &.difficulty {
      background: #f3f4f6;
      color: #374151;
    }
  }
}

.card-content {
  padding: 1.5rem;

  .description {
    color: #475569;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.algorithm-details {
  margin-bottom: 1rem;

  .detail-item {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;

    strong {
      color: #374151;
    }
  }
}

.code-preview {
  background: #1e293b;
  border-radius: 6px;
  margin-bottom: 1rem;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.8rem;
      color: #e2e8f0;
      line-height: 1.4;
    }
  }
}

.applications {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;

  strong {
    color: #374151;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .algorithms-container {
    padding: 0.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .filter-controls {
    flex-direction: column;
    gap: 1rem;

    .filter-group {
      width: 100%;
    }
  }

  .algorithms-grid {
    grid-template-columns: 1fr;
  }

  .algorithm-card {
    margin-bottom: 1rem;
  }
}
</style>
