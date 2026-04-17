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
// 当前激活的分类
var activeCategory = ref('linear');
// 金字塔层次
var pyramidLayers = [
    { label: '状态压缩DP' },
    { label: '树形DP' },
    { label: '区间DP' },
    { label: '背包DP' },
    { label: '线性DP' }
];
// 动态规划分类数据
var categories = ref([
    {
        id: 'linear',
        name: '线性动态规划',
        icon: 'fas fa-arrows-alt-h',
        description: '沿着线性结构（如数组、字符串）进行状态转移的动态规划，状态定义通常为一维或二维数组，状态转移沿着线性方向推进。',
        features: [
            '状态定义通常为 dp[i] 表示前 i 个元素的最优解',
            '状态转移方程沿着索引 i 的线性方向',
            '通常需要初始化边界条件',
            '遍历顺序通常为从左到右'
        ],
        applications: [
            '最长递增子序列',
            '最大子数组和',
            '编辑距离',
            '斐波那契数列',
            '爬楼梯问题'
        ],
        exampleTitle: '最长递增子序列 (LIS)',
        code: "// \u6700\u957F\u9012\u589E\u5B50\u5E8F\u5217 - \u7EBF\u6027\u52A8\u6001\u89C4\u5212\nfunction lengthOfLIS(nums: number[]): number {\n  // \u8FB9\u754C\u60C5\u51B5\u5904\u7406\n  if (nums.length === 0) return 0;\n\n  // 1. \u5B9A\u4E49DP\u6570\u7EC4\uFF1Adp[i]\u8868\u793A\u4EE5nums[i]\u7ED3\u5C3E\u7684\u6700\u957F\u9012\u589E\u5B50\u5E8F\u5217\u957F\u5EA6\n  const dp: number[] = new Array(nums.length).fill(1);\n\n  // 2. \u521D\u59CB\u5316\uFF1A\u6BCF\u4E2A\u5143\u7D20\u672C\u8EAB\u81F3\u5C11\u6784\u6210\u4E00\u4E2A\u957F\u5EA6\u4E3A1\u7684\u5B50\u5E8F\u5217\n  let maxLength = 1;\n\n  // 3. \u72B6\u6001\u8F6C\u79FB\uFF1A\u904D\u5386\u6BCF\u4E2A\u5143\u7D20\uFF0C\u4E0E\u4E4B\u524D\u7684\u5143\u7D20\u6BD4\u8F83\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      // \u5982\u679C\u5F53\u524D\u5143\u7D20\u5927\u4E8E\u4E4B\u524D\u7684\u5143\u7D20\uFF0C\u53EF\u4EE5\u5F62\u6210\u66F4\u957F\u7684\u5B50\u5E8F\u5217\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n    // \u66F4\u65B0\u6700\u5927\u957F\u5EA6\n    maxLength = Math.max(maxLength, dp[i]);\n  }\n\n  return maxLength;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst nums = [10, 9, 2, 5, 3, 7, 101, 18];\nconsole.log(lengthOfLIS(nums)); // \u8F93\u51FA\uFF1A4 (\u5E8F\u5217 [2, 5, 7, 101])",
        explanations: [
            'dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度',
            '初始化每个 dp[i] = 1，因为每个元素本身就是一个子序列',
            '对于每个元素 nums[i]，遍历它之前的所有元素 nums[j] (j < i)',
            '如果 nums[i] > nums[j]，则更新 dp[i] = max(dp[i], dp[j] + 1)',
            '最终结果是 dp 数组中的最大值'
        ],
        comparison: {
            time: 'O(n²)',
            space: 'O(n)',
            problem: 'LIS, LCS',
            difficulty: 2
        }
    },
    {
        id: 'knapsack',
        name: '背包动态规划',
        icon: 'fas fa-suitcase',
        description: '解决资源分配问题，在有限容量下选择物品以达到最优值。主要分为01背包、完全背包、多重背包等变体。',
        features: [
            '状态定义通常为 dp[i][w] 表示前i个物品在容量w下的最优解',
            '状态转移方程包含放入或不放入当前物品的决策',
            '需要处理物品重量和价值',
            '遍历顺序取决于背包类型'
        ],
        applications: [
            '01背包问题',
            '完全背包问题',
            '多重背包问题',
            '分组背包问题',
            '硬币找零问题'
        ],
        exampleTitle: '01背包问题',
        code: "// 01\u80CC\u5305\u95EE\u9898 - \u52A8\u6001\u89C4\u5212\u89E3\u6CD5\nfunction knapSack(capacity: number, weights: number[], values: number[]): number {\n  const n = weights.length;\n\n  // 1. \u521B\u5EFADP\u6570\u7EC4\uFF1Adp[i][w] \u8868\u793A\u524Di\u4E2A\u7269\u54C1\u5728\u5BB9\u91CFw\u4E0B\u7684\u6700\u5927\u4EF7\u503C\n  const dp: number[][] = Array.from({ length: n + 1 }, () =>\n    new Array(capacity + 1).fill(0)\n  );\n\n  // 2. \u586B\u5145DP\u6570\u7EC4\n  for (let i = 1; i <= n; i++) {\n    for (let w = 1; w <= capacity; w++) {\n      // \u5F53\u524D\u7269\u54C1\u91CD\u91CF\u5C0F\u4E8E\u7B49\u4E8E\u5F53\u524D\u5BB9\u91CF\n      if (weights[i-1] <= w) {\n        // \u9009\u62E9\u653E\u5165\u6216\u4E0D\u653E\u5165\u5F53\u524D\u7269\u54C1\u7684\u6700\u5927\u503C\n        dp[i][w] = Math.max(\n          values[i-1] + dp[i-1][w - weights[i-1]],\n          dp[i-1][w]\n        );\n      } else {\n        // \u5F53\u524D\u7269\u54C1\u91CD\u91CF\u5927\u4E8E\u5BB9\u91CF\uFF0C\u65E0\u6CD5\u653E\u5165\n        dp[i][w] = dp[i-1][w];\n      }\n    }\n  }\n\n  // 3. \u8FD4\u56DE\u7ED3\u679C\n  return dp[n][capacity];\n}\n\n// \u793A\u4F8B\u6570\u636E\nconst weights = [2, 3, 4, 5]; // \u7269\u54C1\u91CD\u91CF\nconst values = [3, 4, 5, 6];  // \u7269\u54C1\u4EF7\u503C\nconst capacity = 8;            // \u80CC\u5305\u5BB9\u91CF\n\nconsole.log(knapSack(capacity, weights, values)); // \u8F93\u51FA\uFF1A10 (\u9009\u62E9\u91CD\u91CF3\u548C5\u7684\u7269\u54C1)",
        explanations: [
            'dp[i][w] 表示前i个物品在背包容量为w时能获得的最大价值',
            '初始化：dp[0][w] = 0（没有物品时价值为0）',
            '遍历每个物品和每种背包容量',
            '如果当前物品重量 ≤ 当前背包容量，可以选择放入或不放入：',
            '  放入：价值 = 当前物品价值 + dp[i-1][w-当前物品重量]',
            '  不放入：价值 = dp[i-1][w]',
            '取两者中的最大值作为dp[i][w]的值',
            '最终结果存储在dp[n][capacity]中'
        ],
        comparison: {
            time: 'O(n×W)',
            space: 'O(n×W)',
            problem: '背包问题',
            difficulty: 3
        }
    },
    {
        id: 'interval',
        name: '区间动态规划',
        icon: 'fas fa-expand-alt',
        description: '处理区间或序列上的问题，通常涉及合并、分割或处理子区间的最优解。状态定义通常为dp[i][j]表示区间[i, j]上的最优解。',
        features: [
            '状态定义通常为 dp[i][j] 表示区间 [i, j] 的最优解',
            '状态转移通常涉及区间分割点k',
            '遍历顺序通常为区间长度从小到大',
            '需要处理区间边界情况'
        ],
        applications: [
            '矩阵链乘法',
            '石子合并问题',
            '最长回文子序列',
            '布尔括号化问题',
            '最优二叉搜索树'
        ],
        exampleTitle: '最长回文子序列',
        code: "// \u6700\u957F\u56DE\u6587\u5B50\u5E8F\u5217 - \u533A\u95F4\u52A8\u6001\u89C4\u5212\nfunction longestPalindromeSubseq(s: string): number {\n  const n = s.length;\n\n  // 1. \u521B\u5EFADP\u6570\u7EC4\uFF1Adp[i][j]\u8868\u793As[i..j]\u7684\u6700\u957F\u56DE\u6587\u5B50\u5E8F\u5217\u957F\u5EA6\n  const dp: number[][] = Array.from({ length: n }, () =>\n    new Array(n).fill(0)\n  );\n\n  // 2. \u521D\u59CB\u5316\uFF1A\u5355\u4E2A\u5B57\u7B26\u662F\u957F\u5EA6\u4E3A1\u7684\u56DE\u6587\n  for (let i = 0; i < n; i++) {\n    dp[i][i] = 1;\n  }\n\n  // 3. \u6309\u533A\u95F4\u957F\u5EA6\u4ECE\u5C0F\u5230\u5927\u904D\u5386\n  for (let len = 2; len <= n; len++) {\n    for (let i = 0; i <= n - len; i++) {\n      const j = i + len - 1;\n\n      // \u60C5\u51B51\uFF1A\u9996\u5C3E\u5B57\u7B26\u76F8\u540C\n      if (s[i] === s[j]) {\n        dp[i][j] = dp[i+1][j-1] + 2;\n      } else {\n        // \u60C5\u51B52\uFF1A\u9996\u5C3E\u5B57\u7B26\u4E0D\u540C\uFF0C\u53D6\u8F83\u5927\u503C\n        dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);\n      }\n    }\n  }\n\n  // 4. \u8FD4\u56DE\u6574\u4E2A\u5B57\u7B26\u4E32\u7684\u6700\u957F\u56DE\u6587\u5B50\u5E8F\u5217\u957F\u5EA6\n  return dp[0][n-1];\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst str = \"bbbab\";\nconsole.log(longestPalindromeSubseq(str)); // \u8F93\u51FA\uFF1A4 (bbbb)",
        explanations: [
            'dp[i][j] 表示字符串 s 在区间 [i, j] 内的最长回文子序列长度',
            '初始化：所有长度为1的子串，dp[i][i] = 1',
            '遍历顺序：按区间长度从小到大（从2到n）',
            '如果 s[i] === s[j]，则 dp[i][j] = dp[i+1][j-1] + 2',
            '如果 s[i] !== s[j]，则 dp[i][j] = max(dp[i+1][j], dp[i][j-1])',
            '最终结果为 dp[0][n-1]'
        ],
        comparison: {
            time: 'O(n²)',
            space: 'O(n²)',
            problem: '矩阵链乘法',
            difficulty: 4
        }
    },
    {
        id: 'tree',
        name: '树形动态规划',
        icon: 'fas fa-tree',
        description: '在树形数据结构上应用动态规划，通常需要后序遍历或DFS来收集子树信息。状态转移依赖于子节点的状态。',
        features: [
            '在树结构上定义状态',
            '通常使用DFS后序遍历',
            '状态转移基于子节点的状态',
            '需要处理节点间的父子关系'
        ],
        applications: [
            '二叉树直径',
            '二叉树最大路径和',
            '树的最大独立集',
            '树的最小顶点覆盖',
            '树的最小支配集'
        ],
        exampleTitle: '二叉树最大路径和',
        code: "// \u4E8C\u53C9\u6811\u8282\u70B9\u5B9A\u4E49\nclass TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\n// \u4E8C\u53C9\u6811\u6700\u5927\u8DEF\u5F84\u548C - \u6811\u5F62\u52A8\u6001\u89C4\u5212\nfunction maxPathSum(root: TreeNode | null): number {\n  let maxSum = -Infinity;\n\n  // \u9012\u5F52\u51FD\u6570\uFF1A\u8BA1\u7B97\u4EE5\u5F53\u524D\u8282\u70B9\u4E3A\u8D77\u70B9\u7684\u6700\u5927\u8DEF\u5F84\u548C\n  function dfs(node: TreeNode | null): number {\n    if (!node) return 0;\n\n    // \u9012\u5F52\u8BA1\u7B97\u5DE6\u53F3\u5B50\u6811\u7684\u6700\u5927\u8D21\u732E\u503C\n    const leftGain = Math.max(dfs(node.left), 0);\n    const rightGain = Math.max(dfs(node.right), 0);\n\n    // \u5F53\u524D\u8282\u70B9\u7684\u6700\u5927\u8DEF\u5F84\u548C\uFF08\u5F53\u524D\u8282\u70B9+\u5DE6\u53F3\u5B50\u6811\uFF09\n    const priceNewPath = node.val + leftGain + rightGain;\n\n    // \u66F4\u65B0\u5168\u5C40\u6700\u5927\u8DEF\u5F84\u548C\n    maxSum = Math.max(maxSum, priceNewPath);\n\n    // \u8FD4\u56DE\u5F53\u524D\u8282\u70B9\u7684\u6700\u5927\u8D21\u732E\u503C\uFF08\u53EA\u80FD\u9009\u62E9\u4E00\u6761\u5B50\u6811\u8DEF\u5F84\uFF09\n    return node.val + Math.max(leftGain, rightGain);\n  }\n\n  dfs(root);\n  return maxSum;\n}\n\n/* \u793A\u4F8B\u6811\u7ED3\u6784\uFF1A\n     -10\n     / \\\n    9  20\n      /  \\\n     15   7\n*/\nconst root = new TreeNode(-10);\nroot.left = new TreeNode(9);\nroot.right = new TreeNode(20);\nroot.right.left = new TreeNode(15);\nroot.right.right = new TreeNode(7);\n\nconsole.log(maxPathSum(root)); // \u8F93\u51FA\uFF1A42 (15 -> 20 -> 7)",
        explanations: [
            '使用DFS后序遍历二叉树',
            '对每个节点，计算其左右子树的最大贡献值（非负）',
            '当前节点的最大路径和 = 节点值 + 左子树贡献 + 右子树贡献',
            '更新全局最大路径和 maxSum',
            '当前节点的贡献值 = 节点值 + max(左子树贡献, 右子树贡献)',
            '注意：贡献值只能选择一条子树路径（左或右）'
        ],
        comparison: {
            time: 'O(n)',
            space: 'O(h)',
            problem: '树路径问题',
            difficulty: 4
        }
    },
    {
        id: 'state',
        name: '状态压缩动态规划',
        icon: 'fas fa-microchip',
        description: '使用位运算等技巧压缩状态空间，解决状态空间较大的问题（如旅行商问题）。通常用于处理状态集合的问题。',
        features: [
            '使用位掩码表示状态集合',
            '状态转移涉及位运算操作',
            '适用于状态数量有限但组合较多的情况',
            '需要处理状态压缩和展开'
        ],
        applications: [
            '旅行商问题(TSP)',
            '哈密顿路径',
            '数独求解',
            '棋盘覆盖问题',
            '任务分配问题'
        ],
        exampleTitle: '旅行商问题 (TSP)',
        code: "// \u65C5\u884C\u5546\u95EE\u9898 - \u72B6\u6001\u538B\u7F29\u52A8\u6001\u89C4\u5212\nfunction tsp(graph: number[][]): number {\n  const n = graph.length;\n  // 1. \u521B\u5EFADP\u6570\u7EC4\uFF1Adp[mask][i]\u8868\u793A\u8BBF\u95EE\u8FC7mask\u4E2D\u7684\u57CE\u5E02\uFF0C\u6700\u540E\u5728i\u7684\u6700\u5C0F\u82B1\u8D39\n  const dp: number[][] = Array.from({ length: 1 << n }, () =>\n    new Array(n).fill(Infinity)\n  );\n\n  // 2. \u521D\u59CB\u5316\uFF1A\u4ECE0\u53F7\u57CE\u5E02\u5F00\u59CB\n  dp[1][0] = 0; // \u53EA\u8BBF\u95EE\u8FC70\u53F7\u57CE\u5E02\uFF0C\u6700\u540E\u57280\u53F7\u57CE\u5E02\u7684\u82B1\u8D39\u4E3A0\n\n  // 3. \u904D\u5386\u6240\u6709\u72B6\u6001\n  for (let mask = 1; mask < (1 << n); mask++) {\n    for (let i = 0; i < n; i++) {\n      // \u5982\u679C\u5F53\u524D\u72B6\u6001\u4E0D\u5305\u542B\u57CE\u5E02i\uFF0C\u8DF3\u8FC7\n      if ((mask & (1 << i)) === 0) continue;\n\n      // \u5C1D\u8BD5\u4ECE\u57CE\u5E02j\u8F6C\u79FB\u5230\u57CE\u5E02i\n      for (let j = 0; j < n; j++) {\n        // \u5982\u679C\u5F53\u524D\u72B6\u6001\u5305\u542B\u57CE\u5E02j\uFF0C\u4E14j\u4E0D\u7B49\u4E8Ei\n        if ((mask & (1 << j)) && j !== i) {\n          // \u66F4\u65B0\u72B6\u6001\uFF1A\u4ECEmask\u4E2D\u9664\u53BBi\u7684\u72B6\u6001 + j\u5230i\u7684\u8DEF\u5F84\n          dp[mask][i] = Math.min(\n            dp[mask][i],\n            dp[mask ^ (1 << i)][j] + graph[j][i]\n          );\n        }\n      }\n    }\n  }\n\n  // 4. \u8FD4\u56DE\u8BBF\u95EE\u6240\u6709\u57CE\u5E02\u540E\u56DE\u5230\u8D77\u70B9\u7684\u6700\u5C0F\u82B1\u8D39\n  let minCost = Infinity;\n  for (let i = 1; i < n; i++) {\n    minCost = Math.min(minCost, dp[(1 << n) - 1][i] + graph[i][0]);\n  }\n\n  return minCost;\n}\n\n// \u793A\u4F8B\u56FE\uFF08\u90BB\u63A5\u77E9\u9635\uFF09\nconst graph = [\n  [0, 10, 15, 20],\n  [10, 0, 35, 25],\n  [15, 35, 0, 30],\n  [20, 25, 30, 0]\n];\n\nconsole.log(tsp(graph)); // \u8F93\u51FA\uFF1A80 (0->1->3->2->0)",
        explanations: [
            'dp[mask][i] 表示访问过mask中的城市，最后在i的最小花费',
            'mask 是位掩码，表示访问过的城市集合',
            '初始化：只访问过0号城市，最后在0号城市的花费为0',
            '遍历所有状态和所有城市',
            '状态转移：dp[mask][i] = min(dp[mask][i], dp[mask^(1<<i)][j] + graph[j][i])',
            '最终结果：访问所有城市后回到起点的最小花费'
        ],
        comparison: {
            time: 'O(n²×2ⁿ)',
            space: 'O(n×2ⁿ)',
            problem: '旅行商问题',
            difficulty: 5
        }
    }
]);
// 当前分类信息
var currentCategory = computed(function () {
    return categories.value.find(function (cat) { return cat.id === activeCategory.value; }) || categories.value[0];
});
// 复制代码到剪贴板
var copyCode = function (code) {
    navigator.clipboard.writeText(code)
        .then(function () {
        alert('代码已复制到剪贴板！');
    })
        .catch(function (err) {
        console.error('复制失败:', err);
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "dp-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon fas fa-layer-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "dp-pyramid" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.pyramidLayers)); _i < _a.length; _i++) {
    var _b = _a[_i], layer = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "pyramid-layer" }, { key: (index) }), { class: ("layer-".concat(index + 1)) }));
    (layer.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-nav" }));
var _loop_1 = function (category) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeCategory = category.id;
        } }, { key: (category.id) }), { class: (['nav-btn', { active: __VLS_ctx.activeCategory === category.id }]) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: (category.icon) }));
    (category.name);
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.categories)); _c < _d.length; _c++) {
    var category = _d[_c][0];
    _loop_1(category);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: (__VLS_ctx.currentCategory.icon) }));
(__VLS_ctx.currentCategory.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.currentCategory.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.currentCategory.features)); _e < _f.length; _e++) {
    var _g = _f[_e], feature = _g[0], index = _g[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-check-circle" }));
    (feature);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-tags" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.currentCategory.applications)); _h < _j.length; _h++) {
    var _k = _j[_h], app = _k[0], index = _k[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (index) }, { class: "tag" }));
    (app);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.currentCategory.exampleTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.copyCode(__VLS_ctx.currentCategory.code);
    } }, { class: "copy-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-copy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.currentCategory.code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _l = 0, _m = __VLS_getVForSourceType((__VLS_ctx.currentCategory.explanations)); _l < _m.length; _l++) {
    var _o = _m[_l], explanation = _o[0], index = _o[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-caret-right" }));
    (explanation);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.categories)); _p < _q.length; _p++) {
    var category = _q[_p][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (category.id) }, { class: "table-row" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: (category.icon) }));
    (category.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (category.comparison.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (category.comparison.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (category.comparison.problem);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "difficulty" }));
    for (var _r = 0, _s = __VLS_getVForSourceType((5)); _r < _s.length; _r++) {
        var star = _s[_r][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ key: (star) }, { class: (['fas fa-star', { active: star <= category.comparison.difficulty }]) }));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "action-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-download" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "action-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-share-alt" }));
/** @type {__VLS_StyleScopedClasses['dp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-layer-group']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['header-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['dp-pyramid']} */ ;
/** @type {__VLS_StyleScopedClasses['pyramid-layer']} */ ;
/** @type {__VLS_StyleScopedClasses['category-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['category-content']} */ ;
/** @type {__VLS_StyleScopedClasses['category-info']} */ ;
/** @type {__VLS_StyleScopedClasses['category-description']} */ ;
/** @type {__VLS_StyleScopedClasses['features']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-check-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['application-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['code-section']} */ ;
/** @type {__VLS_StyleScopedClasses['code-header']} */ ;
/** @type {__VLS_StyleScopedClasses['copy-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['code-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-caret-right']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-table']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-download']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-share-alt']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeCategory: activeCategory,
            pyramidLayers: pyramidLayers,
            categories: categories,
            currentCategory: currentCategory,
            copyCode: copyCode,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
