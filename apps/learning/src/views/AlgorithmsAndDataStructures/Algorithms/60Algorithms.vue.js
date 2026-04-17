var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref, computed } from 'vue';
// 筛选条件
var filterDifficulty = ref('all');
var filterCategory = ref('all');
// 算法数据
var algorithms = ref([
    {
        id: 1,
        name: '冒泡排序',
        category: 'sorting',
        difficulty: 'beginner',
        description: '通过重复比较相邻元素并交换位置来排序',
        idea: '每次遍历将最大元素移动到末尾，重复n-1次',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        code: "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
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
        code: "function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIndex = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIndex]) minIndex = j;\n    }\n    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];\n  }\n  return arr;\n}",
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
        code: "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}",
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
        code: "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = [], right = [];\n  for (let i = 0; i < arr.length - 1; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}",
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
        code: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}",
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
        code: "function heapSort(arr) {\n  buildMaxHeap(arr);\n  for (let i = arr.length - 1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]];\n    heapify(arr, i, 0);\n  }\n  return arr;\n}",
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
        code: "function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? left = mid + 1 : right = mid - 1;\n  }\n  return -1;\n}",
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
        code: "function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}",
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
        code: "class UnionFind {\n  constructor(size) {\n    this.parent = Array(size).fill().map((_, i) => i);\n    this.rank = Array(size).fill(0);\n  }\n  find(x) {\n    if (this.parent[x] !== x) {\n      this.parent[x] = this.find(this.parent[x]);\n    }\n    return this.parent[x];\n  }\n  union(x, y) {\n    const rootX = this.find(x), rootY = this.find(y);\n    if (rootX === rootY) return;\n    if (this.rank[rootX] < this.rank[rootY]) {\n      this.parent[rootX] = rootY;\n    } else {\n      this.parent[rootY] = rootX;\n      if (this.rank[rootX] === this.rank[rootY]) this.rank[rootX]++;\n    }\n  }\n}",
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
        code: "function shuffle(arr) {\n  for (let i = arr.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n  return arr;\n}",
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
var filteredAlgorithms = computed(function () {
    var result = algorithms.value;
    if (filterDifficulty.value !== 'all') {
        result = result.filter(function (algo) { return algo.difficulty === filterDifficulty.value; });
    }
    if (filterCategory.value !== 'all') {
        result = result.filter(function (algo) { return algo.category === filterCategory.value; });
    }
    return result;
});
var filterAlgorithms = function () {
    // 筛选逻辑已在computed属性中处理
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['algorithms-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "intro-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "filter-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "filter-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
var __VLS_0 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ 'onChange': {} }, { value: (__VLS_ctx.filterDifficulty) }), { style: {} })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { value: (__VLS_ctx.filterDifficulty) }), { style: {} })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6;
var __VLS_7 = {
    onChange: (__VLS_ctx.filterAlgorithms)
};
__VLS_3.slots.default;
var __VLS_8 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    value: ('all'),
}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{
        value: ('all'),
    }], __VLS_functionalComponentArgsRest(__VLS_9), false));
__VLS_11.slots.default;
var __VLS_11;
var __VLS_12 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    value: ('beginner'),
}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
        value: ('beginner'),
    }], __VLS_functionalComponentArgsRest(__VLS_13), false));
__VLS_15.slots.default;
var __VLS_15;
var __VLS_16 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    value: ('intermediate'),
}));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
        value: ('intermediate'),
    }], __VLS_functionalComponentArgsRest(__VLS_17), false));
__VLS_19.slots.default;
var __VLS_19;
var __VLS_20 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    value: ('advanced'),
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        value: ('advanced'),
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
__VLS_23.slots.default;
var __VLS_23;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "filter-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
var __VLS_24 = {}.Select;
/** @type {[typeof __VLS_components.Select, typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(__assign(__assign({ 'onChange': {} }, { value: (__VLS_ctx.filterCategory) }), { style: {} })));
var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { value: (__VLS_ctx.filterCategory) }), { style: {} })], __VLS_functionalComponentArgsRest(__VLS_25), false));
var __VLS_28;
var __VLS_29;
var __VLS_30;
var __VLS_31 = {
    onChange: (__VLS_ctx.filterAlgorithms)
};
__VLS_27.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "all",
});
var __VLS_32 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    value: ('sorting'),
}));
var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
        value: ('sorting'),
    }], __VLS_functionalComponentArgsRest(__VLS_33), false));
__VLS_35.slots.default;
var __VLS_35;
var __VLS_36 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    value: ('searching'),
}));
var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
        value: ('searching'),
    }], __VLS_functionalComponentArgsRest(__VLS_37), false));
__VLS_39.slots.default;
var __VLS_39;
var __VLS_40 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    value: ('graph'),
}));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
        value: ('graph'),
    }], __VLS_functionalComponentArgsRest(__VLS_41), false));
__VLS_43.slots.default;
var __VLS_43;
var __VLS_44 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    value: ('dp'),
}));
var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
        value: ('dp'),
    }], __VLS_functionalComponentArgsRest(__VLS_45), false));
__VLS_47.slots.default;
var __VLS_47;
var __VLS_48 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    value: ('math'),
}));
var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([{
        value: ('math'),
    }], __VLS_functionalComponentArgsRest(__VLS_49), false));
__VLS_51.slots.default;
var __VLS_51;
var __VLS_52 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    value: ('string'),
}));
var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
        value: ('string'),
    }], __VLS_functionalComponentArgsRest(__VLS_53), false));
__VLS_55.slots.default;
var __VLS_55;
var __VLS_56 = {}.SelectOption;
/** @type {[typeof __VLS_components.SelectOption, ]} */ ;
// @ts-ignore
var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    value: ('other'),
}));
var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
        value: ('other'),
    }], __VLS_functionalComponentArgsRest(__VLS_57), false));
__VLS_59.slots.default;
var __VLS_59;
var __VLS_27;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms-grid" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.filteredAlgorithms)); _i < _a.length; _i++) {
    var algorithm = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (algorithm.id) }, { class: (['algorithm-card', "difficulty-".concat(algorithm.difficulty)]) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (algorithm.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tags" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "tag category" }));
    (algorithm.category);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "tag difficulty" }));
    (algorithm.difficulty);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "description" }));
    (algorithm.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-details" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (algorithm.idea);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (algorithm.timeComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (algorithm.spaceComplexity);
    if (algorithm.code) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-preview" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
        (algorithm.code);
    }
    if (algorithm.applications) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (algorithm.applications);
    }
}
/** @type {__VLS_StyleScopedClasses['algorithms-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['category']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['code-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            filterDifficulty: filterDifficulty,
            filterCategory: filterCategory,
            filteredAlgorithms: filteredAlgorithms,
            filterAlgorithms: filterAlgorithms,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
