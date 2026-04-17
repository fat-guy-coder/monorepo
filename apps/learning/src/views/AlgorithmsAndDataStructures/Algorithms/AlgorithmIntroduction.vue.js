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
import { ref, computed } from 'vue';
var activeType = ref(0); // 0 表示所有类型
var algorithmTypes = [
    { id: 0, name: '所有算法', icon: '📚' },
    { id: 1, name: '排序算法', icon: '🔄' },
    { id: 2, name: '搜索算法', icon: '🔍' },
    { id: 3, name: '图论算法', icon: '📊' },
    { id: 4, name: '动态规划', icon: '🧩' },
    { id: 5, name: '贪心算法', icon: '🎯' },
    { id: 6, name: '分治算法', icon: '✂️' },
    { id: 7, name: '字符串算法', icon: '🔤' },
];
var algorithms = [
    {
        id: 1,
        name: "快速排序",
        icon: "⚡",
        category: "排序算法",
        description: "基于分治思想的高效排序算法，平均时间复杂度为 O(n log n)",
        code: "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) left.push(arr[i]);\n    else right.push(arr[i]);\n  }\n\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}",
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
        code: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n\n  return -1;\n}",
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
        code: "function dijkstra(graph, start) {\n  const distances = {};\n  const visited = new Set();\n\n  // \u521D\u59CB\u5316\u8DDD\u79BB\n  for (const vertex in graph) {\n    distances[vertex] = Infinity;\n  }\n  distances[start] = 0;\n\n  while (visited.size < Object.keys(graph).length) {\n    let minVertex = null;\n    for (const vertex in distances) {\n      if (!visited.has(vertex) &&\n          (minVertex === null || distances[vertex] < distances[minVertex])) {\n        minVertex = vertex;\n      }\n    }\n\n    if (minVertex === null) break;\n    visited.add(minVertex);\n\n    for (const neighbor in graph[minVertex]) {\n      const distance = distances[minVertex] + graph[minVertex][neighbor];\n      if (distance < distances[neighbor]) {\n        distances[neighbor] = distance;\n      }\n    }\n  }\n\n  return distances;\n}",
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
        code: "function fibonacci(n) {\n  if (n <= 1) return n;\n\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n\n  return dp[n];\n}\n\n// \u4F18\u5316\u7A7A\u95F4\u590D\u6742\u5EA6\u7248\u672C\nfunction fibOptimized(n) {\n  if (n <= 1) return n;\n\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    const temp = a + b;\n    a = b;\n    b = temp;\n  }\n\n  return b;\n}",
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
        code: "function fractionalKnapsack(capacity, items) {\n  // \u8BA1\u7B97\u4EF7\u503C\u5BC6\u5EA6\n  items.forEach(item => {\n    item.ratio = item.value / item.weight;\n  });\n\n  // \u6309\u4EF7\u503C\u5BC6\u5EA6\u964D\u5E8F\u6392\u5E8F\n  items.sort((a, b) => b.ratio - a.ratio);\n\n  let totalValue = 0;\n  let remaining = capacity;\n\n  for (const item of items) {\n    if (remaining >= item.weight) {\n      // \u5168\u90E8\u88C5\u5165\n      totalValue += item.value;\n      remaining -= item.weight;\n    } else {\n      // \u90E8\u5206\u88C5\u5165\n      totalValue += item.ratio * remaining;\n      break;\n    }\n  }\n\n  return totalValue;\n}",
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
        code: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) {\n      result.push(left[i++]);\n    } else {\n      result.push(right[j++]);\n    }\n  }\n\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}",
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
        code: "function kmpSearch(text, pattern) {\n  const lps = computeLPSArray(pattern);\n  let i = 0, j = 0;\n\n  while (i < text.length) {\n    if (pattern[j] === text[i]) {\n      i++;\n      j++;\n    }\n\n    if (j === pattern.length) {\n      return i - j; // \u5339\u914D\u4F4D\u7F6E\n    } else if (i < text.length && pattern[j] !== text[i]) {\n      if (j !== 0) j = lps[j - 1];\n      else i++;\n    }\n  }\n\n  return -1;\n}\n\nfunction computeLPSArray(pattern) {\n  const lps = [0];\n  let len = 0;\n  let i = 1;\n\n  while (i < pattern.length) {\n    if (pattern[i] === pattern[len]) {\n      len++;\n      lps[i] = len;\n      i++;\n    } else {\n      if (len !== 0) {\n        len = lps[len - 1];\n      } else {\n        lps[i] = 0;\n        i++;\n      }\n    }\n  }\n\n  return lps;\n}",
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
        code: "function bfs(graph, start) {\n  const queue = [start];\n  const visited = new Set([start]);\n  const result = [];\n\n  while (queue.length) {\n    const vertex = queue.shift();\n    result.push(vertex);\n\n    for (const neighbor of graph[vertex]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n\n  return result;\n}",
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
        code: "function dfs(graph, start) {\n  const stack = [start];\n  const visited = new Set();\n  const result = [];\n\n  while (stack.length) {\n    const vertex = stack.pop();\n\n    if (!visited.has(vertex)) {\n      visited.add(vertex);\n      result.push(vertex);\n\n      for (const neighbor of graph[vertex]) {\n        stack.push(neighbor);\n      }\n    }\n  }\n\n  return result;\n}\n\n// \u9012\u5F52\u5B9E\u73B0\nfunction dfsRecursive(graph, start, visited = new Set(), result = []) {\n  visited.add(start);\n  result.push(start);\n\n  for (const neighbor of graph[start]) {\n    if (!visited.has(neighbor)) {\n      dfsRecursive(graph, neighbor, visited, result);\n    }\n  }\n\n  return result;\n}",
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
        code: "function heapSort(arr) {\n  // \u6784\u5EFA\u6700\u5927\u5806\n  buildMaxHeap(arr);\n\n  // \u4ECE\u540E\u5411\u524D\u6392\u5E8F\n  for (let i = arr.length - 1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]];\n    heapify(arr, 0, i);\n  }\n\n  return arr;\n}\n\nfunction buildMaxHeap(arr) {\n  const n = arr.length;\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n    heapify(arr, i, n);\n  }\n}\n\nfunction heapify(arr, i, heapSize) {\n  let largest = i;\n  const left = 2 * i + 1;\n  const right = 2 * i + 2;\n\n  if (left < heapSize && arr[left] > arr[largest]) {\n    largest = left;\n  }\n\n  if (right < heapSize && arr[right] > arr[largest]) {\n    largest = right;\n  }\n\n  if (largest !== i) {\n    [arr[i], arr[largest]] = [arr[largest], arr[i]];\n    heapify(arr, largest, heapSize);\n  }\n}",
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
        code: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      // \u5220\u9664\u6700\u4E45\u672A\u4F7F\u7528\u7684\u5143\u7D20\n      const oldestKey = this.cache.keys().next().value;\n      this.cache.delete(oldestKey);\n    }\n\n    this.cache.set(key, value);\n  }\n}",
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
        code: "class BloomFilter {\n  constructor(size, hashFunctions) {\n    this.size = size;\n    this.hashFunctions = hashFunctions;\n    this.bitArray = new Array(size).fill(false);\n  }\n\n  add(item) {\n    for (const hashFn of this.hashFunctions) {\n      const index = hashFn(item) % this.size;\n      this.bitArray[index] = true;\n    }\n  }\n\n  contains(item) {\n    for (const hashFn of this.hashFunctions) {\n      const index = hashFn(item) % this.size;\n      if (!this.bitArray[index]) {\n        return false;\n      }\n    }\n    return true;\n  }\n}\n\n// \u793A\u4F8B\u54C8\u5E0C\u51FD\u6570\nfunction hash1(str) {\n  let hash = 0;\n  for (let i = 0; i < str.length; i++) {\n    hash = (hash << 5) + str.charCodeAt(i);\n  }\n  return Math.abs(hash);\n}\n\nfunction hash2(str) {\n  let hash = 5381;\n  for (let i = 0; i < str.length; i++) {\n    hash = (hash * 33) ^ str.charCodeAt(i);\n  }\n  return Math.abs(hash);\n}",
        scenarios: [
            "垃圾邮件过滤",
            "缓存穿透防护",
            "URL去重"
        ]
    },
];
var filteredAlgorithms = computed(function () {
    if (activeType.value === 0)
        return algorithms;
    return algorithms.filter(function (algo) {
        var _a;
        var type = ((_a = algorithmTypes.find(function (t) { return t.id === activeType.value; })) === null || _a === void 0 ? void 0 : _a.name) || "";
        return algo.category === type;
    });
});
function getAlgorithmCount(typeId) {
    var _a;
    if (typeId === 0)
        return algorithms.length;
    var typeName = ((_a = algorithmTypes.find(function (t) { return t.id === typeId; })) === null || _a === void 0 ? void 0 : _a.name) || "";
    return algorithms.filter(function (algo) { return algo.category === typeName; }).length;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['algorithms-container']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-types']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-types" }));
var _loop_1 = function (type, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeType = type.id;
        } }, { class: "type-card" }), { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "type-icon" }));
    (type.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "type-name" }));
    (type.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "type-count" }));
    (__VLS_ctx.getAlgorithmCount(type.id));
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithmTypes)); _i < _a.length; _i++) {
    var _b = _a[_i], type = _b[0], index = _b[1];
    _loop_1(type, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms-grid" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.filteredAlgorithms)); _c < _d.length; _c++) {
    var _e = _d[_c], algo = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-icon" }));
    (algo.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-tag" }));
    (algo.category);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algo.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (algo.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-scenarios" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _f = 0, _g = __VLS_getVForSourceType((algo.scenarios)); _f < _g.length; _f++) {
        var _h = _g[_f], scenario = _h[0], sIndex = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (sIndex),
        });
        (scenario);
    }
}
/** @type {__VLS_StyleScopedClasses['algorithms-container']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-types']} */ ;
/** @type {__VLS_StyleScopedClasses['type-card']} */ ;
/** @type {__VLS_StyleScopedClasses['type-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['type-name']} */ ;
/** @type {__VLS_StyleScopedClasses['type-count']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-card']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-code']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-scenarios']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-header']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeType: activeType,
            algorithmTypes: algorithmTypes,
            filteredAlgorithms: filteredAlgorithms,
            getAlgorithmCount: getAlgorithmCount,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
