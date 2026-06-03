<template>
  <LearningPath
    title="算法与数据结构学习路线图"
    description="编程内功的核心 · 从入门到竞赛"
    :tags="[{ label: '📐 复杂度', color: 'blue' },{ label: '📏 线性结构', color: 'green' },{ label: '🌳 树', color: 'purple' },{ label: '🕸️ 图', color: 'orange' },{ label: '🧩 DP', color: 'red' },{ label: '🏗️ 高级', color: 'teal' }]"
    :phases="phases"
    footerText="预计需 16-24 周 · 复杂度优先 · 多刷题 · 理解本质而非背诵"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '📐', title: '复杂度分析基础', period: '1 周',
    desc: '开始之前先学会"度量"——理解算法效率的数学语言，能分析任意代码的时空复杂度。这是算法世界的地图和指南针。',
    color: 'bg-blue-500',
    modules: [
      { name: '1', label: '渐近分析', topics: [
        { name: 'dsa-1-1-1-big-o', label: '大O记号定义与直观理解' },
        { name: 'dsa-1-1-2-omega-theta', label: '大Ω与大Θ记号' },
        { name: 'dsa-1-1-3-rules', label: '复杂度计算规则' },
        { name: 'dsa-1-1-4-common', label: '常见复杂度速查' },
      ]},
      { name: '2', label: '分析实战', topics: [
        { name: 'dsa-1-2-1-loop', label: '循环嵌套分析' },
        { name: 'dsa-1-2-2-recursive', label: '递推式与主定理' },
        { name: 'dsa-1-2-3-amortized', label: '均摊分析' },
        { name: 'dsa-1-2-4-space', label: '空间复杂度与原地算法' },
      ]},
    ]
  },
  {
    id: 2, icon: '📏', title: '线性数据结构', period: '2-3 周',
    desc: '数组、链表、栈、队列——最基础也最重要。80% 的算法题都在考察这些结构及其变体。重点：双指针、单调栈、滑动窗口。',
    color: 'bg-green-500',
    modules: [
      { name: '1', label: '数组', topics: [
        { name: 'dsa-2-1-1-static', label: '静态数组与缓存友好性' },
        { name: 'dsa-2-1-2-dynamic', label: '动态数组与扩容均摊分析' },
        { name: 'dsa-2-1-3-two-pointer', label: '双指针：快慢/对撞/滑动窗口' },
        { name: 'dsa-2-1-4-prefix-sum', label: '前缀和与差分数组' },
      ]},
      { name: '2', label: '链表', topics: [
        { name: 'dsa-2-2-1-singly', label: '单向链表：插入/删除/反转/环检测' },
        { name: 'dsa-2-2-2-doubly', label: '双向链表与哨兵节点' },
        { name: 'dsa-2-2-3-dummy', label: '哑节点技巧' },
        { name: 'dsa-2-2-4-lru', label: 'LRU Cache 实现' },
      ]},
      { name: '3', label: '栈与队列', topics: [
        { name: 'dsa-2-3-1-mono-stack', label: '单调栈经典问题' },
        { name: 'dsa-2-3-2-expression', label: '表达式求值' },
        { name: 'dsa-2-4-1-deque', label: '双端队列' },
        { name: 'dsa-2-4-2-mono-queue', label: '单调队列' },
      ]},
      { name: '4', label: '跳表', topics: [
        { name: 'dsa-2-5-1-principle', label: '跳表原理与概率平衡' },
        { name: 'dsa-2-5-3-redis-zset', label: 'Redis ZSet 中的跳表' },
      ]},
    ]
  },
  {
    id: 3, icon: '🔑', title: '哈希表', period: '1-2 周',
    desc: 'O(1) 查找的神器。理解哈希函数设计、冲突解决策略，以及布隆过滤器等衍生结构。',
    color: 'bg-amber-500',
    modules: [
      { name: '1', label: '哈希函数', topics: [
        { name: 'dsa-3-1-1-principle', label: '确定性/均匀性/高效性' },
        { name: 'dsa-3-1-2-methods', label: '取模/乘法/加密哈希' },
        { name: 'dsa-3-1-3-string-hash', label: '字符串哈希与 Rabin 指纹' },
      ]},
      { name: '2', label: '冲突解决', topics: [
        { name: 'dsa-3-2-1-chaining', label: '链地址法' },
        { name: 'dsa-3-2-2-open', label: '开放寻址：线性/二次/双重' },
        { name: 'dsa-3-2-3-robin-hood', label: 'Robin Hood 与 Swiss Table' },
      ]},
      { name: '3', label: '应用', topics: [
        { name: 'dsa-3-3-3-consistent', label: '一致性哈希与虚拟节点' },
        { name: 'dsa-3-3-4-bloom', label: '布隆过滤器实战' },
      ]},
    ]
  },
  {
    id: 4, icon: '🌳', title: '树结构', period: '3-4 周',
    desc: '树是面试和实际开发中最重要的非线性结构。从二叉树遍历到平衡树、B+树、Trie、线段树。',
    color: 'bg-emerald-500',
    modules: [
      { name: '1', label: '二叉树基础', topics: [
        { name: 'dsa-4-1-1-traversal', label: '4种遍历：递归+迭代实现' },
        { name: 'dsa-4-1-3-construct', label: '从遍历序列构造二叉树' },
        { name: 'dsa-4-1-4-lca', label: '最近公共祖先 LCA' },
      ]},
      { name: '2', label: '二叉搜索树', topics: [
        { name: 'dsa-4-2-1-basic', label: 'BST：查找/插入/删除/验证' },
        { name: 'dsa-4-2-3-kth', label: '第K大/小的元素' },
      ]},
      { name: '3', label: '平衡树', topics: [
        { name: 'dsa-4-3-1-avl', label: 'AVL树与四种旋转' },
        { name: 'dsa-4-3-2-rb-tree', label: '红黑树：5条性质与修复' },
        { name: 'dsa-4-3-3-treap', label: 'Treap随机化平衡' },
      ]},
      { name: '4', label: 'B树家族', topics: [
        { name: 'dsa-4-4-1-b-tree', label: 'B树：分裂/合并/删除' },
        { name: 'dsa-4-4-2-b-plus', label: 'B+树与数据库索引核心' },
        { name: 'dsa-4-4-3-lsm', label: 'LSM-Tree 写优化引擎' },
      ]},
      { name: '5', label: '高级树结构', topics: [
        { name: 'dsa-4-5-1-trie', label: 'Trie前缀树' },
        { name: 'dsa-4-5-2-segment', label: '线段树：区间查询/懒标记' },
        { name: 'dsa-4-5-3-fenwick', label: '树状数组 BIT' },
        { name: 'dsa-4-5-4-union-find', label: '并查集：路径压缩/按秩合并' },
      ]},
    ]
  },
  {
    id: 5, icon: '⛰️', title: '堆与优先队列', period: '1 周',
    desc: '从二叉堆的数组实现到优先队列的灵活应用——Top-K、多路归并、Dijkstra 优化。',
    color: 'bg-orange-500',
    modules: [
      { name: '1', label: '二叉堆', topics: [
        { name: 'dsa-5-1-1-structure', label: '完全二叉树与数组表示' },
        { name: 'dsa-5-1-2-sift', label: 'siftUp/siftDown 操作' },
        { name: 'dsa-5-1-3-heapify', label: 'O(n)建堆与堆排序' },
      ]},
      { name: '2', label: '优先队列应用', topics: [
        { name: 'dsa-5-2-1-topk', label: 'Top-K：堆 vs 快速选择' },
        { name: 'dsa-5-2-2-kth-stream', label: '数据流中第K大' },
        { name: 'dsa-5-2-3-merge-k', label: '合并K个有序链表' },
      ]},
    ]
  },
  {
    id: 6, icon: '🕸️', title: '图算法', period: '3-4 周',
    desc: '图的表示 → 遍历 → 最短路径 → 最小生成树 → 网络流。图算法的本质是在"关系"中寻找最优路径。',
    color: 'bg-violet-500',
    modules: [
      { name: '1', label: '基础与遍历', topics: [
        { name: 'dsa-6-1-1-repr', label: '邻接表/邻接矩阵/边列表' },
        { name: 'dsa-6-2-1-dfs', label: 'DFS：环检测/连通分量' },
        { name: 'dsa-6-2-2-bfs', label: 'BFS：无权最短路径' },
        { name: 'dsa-6-2-3-bipartite', label: '二分图判定与最大匹配' },
        { name: 'dsa-6-2-4-topo-sort', label: '拓扑排序：Kahn/DFS后序' },
      ]},
      { name: '2', label: '最短路径', topics: [
        { name: 'dsa-6-3-1-dijkstra', label: 'Dijkstra：O(ElogV)贪心' },
        { name: 'dsa-6-3-2-bellman-ford', label: 'Bellman-Ford：负权边' },
        { name: 'dsa-6-3-3-floyd', label: 'Floyd-Warshall：全源DP' },
        { name: 'dsa-6-3-5-a-star', label: 'A*搜索与启发式函数' },
      ]},
      { name: '3', label: 'MST与网络流', topics: [
        { name: 'dsa-6-4-1-prim', label: 'Prim算法' },
        { name: 'dsa-6-4-2-kruskal', label: 'Kruskal+并查集' },
        { name: 'dsa-6-5-1-max-flow', label: '最大流：FF/EK/Dinic' },
      ]},
    ]
  },
  {
    id: 7, icon: '📊', title: '排序算法', period: '2 周',
    desc: '从快排的 pivot 玄学到线性排序的计数/基数——排序是很多算法的子过程，必须精通。',
    color: 'bg-cyan-500',
    modules: [
      { name: '1', label: '比较排序 O(nlogn)', topics: [
        { name: 'dsa-7-1-1-quick', label: '快排：分区/随机化/三路快排' },
        { name: 'dsa-7-1-2-merge', label: '归并排序与外排序' },
        { name: 'dsa-7-1-3-heap-sort', label: '堆排序' },
        { name: 'dsa-7-1-4-insert-shell', label: '插入排序与希尔排序' },
      ]},
      { name: '2', label: '线性排序 O(n)', topics: [
        { name: 'dsa-7-2-1-counting', label: '计数排序' },
        { name: 'dsa-7-2-2-radix', label: '基数排序' },
        { name: 'dsa-7-2-3-bucket', label: '桶排序' },
      ]},
      { name: '3', label: '选择算法', topics: [
        { name: 'dsa-7-3-1-quick-select', label: '快速选择 O(n)' },
      ]},
    ]
  },
  {
    id: 8, icon: '🔍', title: '搜索与回溯', period: '2 周',
    desc: '二分搜索变体 + 回溯算法模板。回溯 = 穷举 + 剪枝——掌握排列/组合/子集三大模板，能解 80% 的搜索题。',
    color: 'bg-rose-500',
    modules: [
      { name: '1', label: '二分搜索', topics: [
        { name: 'dsa-8-1-1-classic', label: '精确查找/左边界/右边界' },
        { name: 'dsa-8-1-2-answer', label: '二分答案：可行解验证' },
        { name: 'dsa-8-1-3-rotated', label: '旋转数组搜索' },
      ]},
      { name: '2', label: '回溯算法', topics: [
        { name: 'dsa-8-2-1-template', label: '回溯模板：选择/递归/撤销' },
        { name: 'dsa-8-2-2-permutation', label: '排列组合：全排列/子集/组合总和' },
        { name: 'dsa-8-2-3-n-queens', label: 'N皇后/数独/括号生成' },
        { name: 'dsa-8-2-4-pruning', label: '剪枝策略：可行/最优/对称' },
      ]},
    ]
  },
  {
    id: 9, icon: '🧩', title: '动态规划', period: '3-4 周',
    desc: 'DP 是算法能力的试金石。从记忆化搜索到状态设计到优化——把大问题分解成重叠的子问题。',
    color: 'bg-red-500',
    modules: [
      { name: '1', label: 'DP基础', topics: [
        { name: 'dsa-9-1-1-principle', label: '最优子结构/无后效性/重叠子问题' },
        { name: 'dsa-9-1-2-memo', label: '记忆化 vs 递推' },
        { name: 'dsa-9-1-3-state', label: '状态定义与转移方程设计' },
      ]},
      { name: '2', label: '经典DP', topics: [
        { name: 'dsa-9-2-1-knapsack', label: '背包九讲：01/完全/多重/分组' },
        { name: 'dsa-9-2-2-lcs-lis', label: 'LCS与LIS' },
        { name: 'dsa-9-2-3-edit-dist', label: '编辑距离' },
      ]},
      { name: '3', label: '进阶DP', topics: [
        { name: 'dsa-9-3-1-house-robber', label: '打家劫舍到股票买卖' },
        { name: 'dsa-9-3-2-interval-dp', label: '区间DP：石子合并/回文串' },
        { name: 'dsa-9-3-3-bit-dp', label: '状态压缩DP' },
        { name: 'dsa-9-4-1-tree-dp', label: '树形DP' },
      ]},
      { name: '4', label: 'DP优化', topics: [
        { name: 'dsa-9-5-1-mono-queue', label: '单调队列优化DP' },
        { name: 'dsa-9-5-2-slope', label: '斜率优化' },
      ]},
    ]
  },
  {
    id: 10, icon: '🎯', title: '贪心算法', period: '1 周',
    desc: '贪心是"眼前最优 = 全局最优"的艺术。学会证明贪心选择的正确性是关键。',
    color: 'bg-lime-500',
    modules: [
      { name: '1', label: '贪心原理', topics: [
        { name: 'dsa-10-1-1-strategy', label: '贪心选择性质与最优子结构' },
        { name: 'dsa-10-1-2-vs-dp', label: '贪心 vs DP 何时有效' },
        { name: 'dsa-10-1-3-proof', label: '正确性证明：交换论证/归纳' },
      ]},
      { name: '2', label: '经典问题', topics: [
        { name: 'dsa-10-2-1-activity', label: '活动选择与区间调度' },
        { name: 'dsa-10-2-2-huffman', label: 'Huffman 最优前缀编码' },
      ]},
    ]
  },
  {
    id: 11, icon: '📝', title: '字符串算法', period: '2 周',
    desc: '从暴力匹配到 KMP，从 Trie 到 AC 自动机——字符串处理的效率直接决定搜索引擎和编辑器的体验。',
    color: 'bg-pink-500',
    modules: [
      { name: '1', label: '字符串匹配', topics: [
        { name: 'dsa-11-1-1-bf', label: '暴力匹配与 Rabin-Karp' },
        { name: 'dsa-11-1-2-kmp', label: 'KMP：前缀函数与next数组' },
        { name: 'dsa-11-1-3-boyer-moore', label: 'Boyer-Moore算法' },
        { name: 'dsa-11-1-4-z-algo', label: 'Z算法与扩展KMP' },
      ]},
      { name: '2', label: 'AC自动机', topics: [
        { name: 'dsa-11-2-2-aho', label: 'AC自动机：fail指针与输出链' },
        { name: 'dsa-11-2-3-application', label: '敏感词过滤/搜索提示' },
      ]},
      { name: '3', label: '后缀结构', topics: [
        { name: 'dsa-11-3-1-suffix-array', label: '后缀数组：倍增算法' },
        { name: 'dsa-11-3-2-lcp', label: 'LCP与RMQ' },
      ]},
      { name: '4', label: '回文', topics: [
        { name: 'dsa-11-4-1-manacher', label: 'Manacher：O(n)最长回文子串' },
      ]},
    ]
  },
  {
    id: 12, icon: '🏗️', title: '高级数据结构', period: '2-3 周',
    desc: '持久化、无锁、概率结构——这些是区分普通程序员和优秀工程师的分水岭。面试加分项。',
    color: 'bg-indigo-500',
    modules: [
      { name: '1', label: '高级树结构', topics: [
        { name: 'dsa-12-1-1-splay', label: 'Splay伸展树与LCT入门' },
      ]},
      { name: '2', label: '持久化', topics: [
        { name: 'dsa-12-2-1-persistent-seg', label: '主席树：区间第K小' },
        { name: 'dsa-12-2-2-persistent-trie', label: '持久化Trie与最大异或' },
      ]},
      { name: '3', label: '概率结构', topics: [
        { name: 'dsa-12-3-1-cuckoo', label: '布谷鸟哈希：最坏O(1)' },
        { name: 'dsa-12-3-2-hyperloglog', label: 'HyperLogLog 基数估计' },
        { name: 'dsa-12-3-3-count-min', label: 'Count-Min Sketch' },
      ]},
      { name: '4', label: '并发数据结构', topics: [
        { name: 'dsa-12-4-1-lock-free', label: '无锁编程：CAS/ABA' },
        { name: 'dsa-12-4-2-concurrent-map', label: '并发哈希表方案' },
        { name: 'dsa-12-4-3-ring-buffer', label: '无锁环形缓冲区' },
      ]},
    ]
  },
  {
    id: 13, icon: '🧠', title: '算法设计方法论', period: '1-2 周',
    desc: '站在更高维度审视算法——掌握通用范式、解题模式、面试策略。从"会做题"到"会设计"。',
    color: 'bg-teal-500',
    modules: [
      { name: '1', label: '算法范式', topics: [
        { name: 'dsa-13-1-1-brute-force', label: '暴力枚举与搜索空间' },
        { name: 'dsa-13-1-2-divide-conquer', label: '分治法：归并/快速幂/Strassen' },
        { name: 'dsa-13-1-3-randomized', label: '随机化算法与期望分析' },
        { name: 'dsa-13-1-4-approx', label: '近似算法：TSP/顶点覆盖' },
      ]},
      { name: '2', label: '解题模式', topics: [
        { name: 'dsa-13-2-1-sliding-window', label: '滑动窗口模式总结' },
        { name: 'dsa-13-2-2-two-heap', label: '双堆模式' },
        { name: 'dsa-13-2-3-cycle-sort', label: '循环排序与原地哈希' },
        { name: 'dsa-13-2-4-meet-in-middle', label: '折半搜索' },
      ]},
      { name: '3', label: '面试策略', topics: [
        { name: 'dsa-13-3-1-leetcode', label: '刷题路线：专题→混合→限时' },
        { name: 'dsa-13-3-2-system-design', label: '系统设计中的数据结构选型' },
        { name: 'dsa-13-3-3-interview', label: '面试5步法' },
      ]},
    ]
  },
]
</script>
