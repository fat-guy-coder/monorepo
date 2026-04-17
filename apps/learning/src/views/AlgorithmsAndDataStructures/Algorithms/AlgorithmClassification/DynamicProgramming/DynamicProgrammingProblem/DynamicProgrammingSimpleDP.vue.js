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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
import { ref, computed } from 'vue';
// 搜索查询
var searchQuery = ref('');
// 当前激活的问题索引
var activeProblem = ref(0);
// 所有动态规划问题
var problems = ref([
    {
        id: 1,
        title: '斐波那契数列',
        desc: '计算第n个斐波那契数',
        problem: '斐波那契数列由0和1开始，之后的斐波那契数就是由之前的两数相加而得出。给定n，计算F(n)。',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['基础DP', '递归'],
        dpApproach: '使用动态规划存储中间结果，避免递归中的重复计算。',
        steps: [
            '定义dp数组，dp[i]表示第i个斐波那契数',
            '初始化dp[0] = 0, dp[1] = 1',
            '从2到n遍历，dp[i] = dp[i-1] + dp[i-2]',
            '返回dp[n]',
        ],
        stateEquation: 'dp[i] = dp[i-1] + dp[i-2]',
        code: "function fib(n: number): number {\n  if (n < 2) return n;\n\n  // \u4F7F\u7528\u4E24\u4E2A\u53D8\u91CF\u4EE3\u66FF\u6570\u7EC4\uFF0C\u4F18\u5316\u7A7A\u95F4\u590D\u6742\u5EA6\n  let prev = 0, curr = 1;\n\n  for (let i = 2; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n\n  return curr;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(fib(10)); // 55",
        example: {
            input: 'n = 10',
            output: '55',
            explanation: '斐波那契数列：0,1,1,2,3,5,8,13,21,34,55',
        },
        applications: '数学计算、算法教学、金融模型',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 2,
        title: '爬楼梯',
        desc: '每次爬1或2阶，到顶的方法数',
        problem: '假设你正在爬楼梯。需要n阶你才能到达楼顶。每次你可以爬1或2个台阶。你有多少种不同的方法可以爬到楼顶？',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['基础DP', '斐波那契'],
        dpApproach: '到达第i阶的方法数 = 到达第i-1阶的方法数 + 到达第i-2阶的方法数。',
        steps: [
            '定义dp数组，dp[i]表示到达第i阶的方法数',
            '初始化dp[0] = 1, dp[1] = 1',
            '从2到n遍历，dp[i] = dp[i-1] + dp[i-2]',
            '返回dp[n]',
        ],
        stateEquation: 'dp[i] = dp[i-1] + dp[i-2]',
        code: "function climbStairs(n: number): number {\n  if (n <= 2) return n;\n\n  let prev = 1, curr = 2;\n\n  for (let i = 3; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n\n  return curr;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(climbStairs(5)); // 8",
        example: {
            input: 'n = 5',
            output: '8',
            explanation: '有8种方法爬5阶楼梯：1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1',
        },
        applications: '路径规划、游戏算法、概率计算',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 3,
        title: '最大子序和',
        desc: '和最大的连续子数组',
        problem: '给定一个整数数组nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['数组', '子序列'],
        dpApproach: '使用dp[i]表示以第i个元素结尾的最大子序和，全局最大值在遍历过程中更新。',
        steps: [
            '初始化dp[0] = nums[0]，maxSum = nums[0]',
            '从1开始遍历数组',
            'dp[i] = max(nums[i], dp[i-1] + nums[i])',
            '更新maxSum = max(maxSum, dp[i])',
            '返回maxSum',
        ],
        stateEquation: 'dp[i] = max(nums[i], dp[i-1] + nums[i])',
        code: "function maxSubArray(nums: number[]): number {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    // \u5F53\u524D\u5143\u7D20\u662F\u5426\u5F00\u59CB\u65B0\u7684\u5B50\u6570\u7EC4\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n\n  return maxSum;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6",
        example: {
            input: '[-2,1,-3,4,-1,2,1,-5,4]',
            output: '6',
            explanation: '连续子数组 [4,-1,2,1] 的和最大为6',
        },
        applications: '金融分析、信号处理、数据挖掘',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 4,
        title: '打家劫舍',
        desc: '不能偷相邻房屋的最大收益',
        problem: '给定一个代表每个房屋存放金额的非负整数数组，计算在不触动警报装置的情况下（即不能偷相邻的房屋），能够偷窃到的最高金额。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['序列DP', '状态机'],
        dpApproach: '每个房屋有两种状态：偷或不偷。dp[i]表示前i个房屋能偷到的最大金额。',
        steps: [
            '定义dp数组，dp[i]表示前i个房屋的最大收益',
            '初始化dp[0] = nums[0], dp[1] = max(nums[0], nums[1])',
            '从i=2开始遍历：dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
            '返回dp[n-1]',
        ],
        stateEquation: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
        code: "function rob(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  if (nums.length === 1) return nums[0];\n\n  let prev = nums[0];\n  let curr = Math.max(nums[0], nums[1]);\n\n  for (let i = 2; i < nums.length; i++) {\n    const next = Math.max(curr, prev + nums[i]);\n    prev = curr;\n    curr = next;\n  }\n\n  return curr;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(rob([2,7,9,3,1])); // 12 (2+9+1)",
        example: {
            input: '[2,7,9,3,1]',
            output: '12',
            explanation: '偷第1间(2)、第3间(9)和第5间(1)，总金额12',
        },
        applications: '资源分配、投资决策、网络安全',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 5,
        title: '零钱兑换',
        desc: '凑成金额的最少硬币数',
        problem: '给定不同面额的硬币coins和一个总金额amount，计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回-1。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['背包问题', '最优化'],
        dpApproach: '使用dp[i]表示凑成金额i所需的最少硬币数，遍历所有硬币面额进行状态转移。',
        steps: [
            '创建长度为amount+1的dp数组，初始化为Infinity',
            'dp[0] = 0（金额0需要0个硬币）',
            '从1到amount遍历每个金额',
            '对于每个硬币，如果金额>=硬币面额，更新dp[i] = min(dp[i], dp[i-coin] + 1)',
            '返回dp[amount]（如果是Infinity则返回-1）',
        ],
        stateEquation: 'dp[i] = min(dp[i], dp[i - coin] + 1) 对所有coin',
        code: "function coinChange(coins: number[], amount: number): number {\n  // \u521D\u59CB\u5316dp\u6570\u7EC4\uFF0Camount+1\u4F5C\u4E3A\u7279\u6B8A\u503C\n  const dp: number[] = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i >= coin) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)",
        example: {
            input: 'coins = [1,2,5], amount = 11',
            output: '3',
            explanation: '5 + 5 + 1 = 11，最少需要3枚硬币',
        },
        applications: '自动售货机、收银系统、金融计算',
        timeComplexity: 'O(amount * n) n为硬币种类数',
        spaceComplexity: 'O(amount)',
    },
    {
        id: 6,
        title: '最长递增子序列',
        desc: '找到最长严格递增子序列',
        problem: '给定一个整数数组nums，找到其中最长严格递增子序列的长度。子序列不要求连续。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['子序列', '二分查找'],
        dpApproach: '使用dp[i]表示以nums[i]结尾的最长递增子序列长度，两层循环遍历所有元素对。',
        steps: [
            '创建dp数组，初始化为1（每个元素自身构成长度为1的子序列）',
            '从i=0到n-1遍历',
            '对于每个i，从j=0到i-1遍历',
            '如果nums[i] > nums[j]，更新dp[i] = max(dp[i], dp[j] + 1)',
            '返回dp数组中的最大值',
        ],
        stateEquation: 'dp[i] = max(dp[i], dp[j] + 1) 当 nums[i] > nums[j] 且 j < i',
        code: "function lengthOfLIS(nums: number[]): number {\n  const n = nums.length;\n  const dp = new Array(n).fill(1);\n  let maxLen = 1;\n\n  for (let i = 1; i < n; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n    maxLen = Math.max(maxLen, dp[i]);\n  }\n\n  return maxLen;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4 (2,5,7,101)",
        example: {
            input: '[10,9,2,5,3,7,101,18]',
            output: '4',
            explanation: '最长递增子序列是 [2,5,7,101] 或 [2,5,7,18]，长度4',
        },
        applications: '生物信息学、股票分析、数据序列分析',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
    },
    {
        id: 7,
        title: '最小路径和',
        desc: '网格中从左上到右下的最小路径',
        problem: '给定一个包含非负整数的m x n网格grid，找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。每次只能向下或者向右移动一步。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['矩阵DP', '路径规划'],
        dpApproach: '使用二维dp数组，每个位置的最小路径和由其上方和左方的最小值加上当前值决定。',
        steps: [
            '创建二维dp数组，大小与grid相同',
            '初始化左上角：dp[0][0] = grid[0][0]',
            '初始化第一行：dp[0][j] = dp[0][j-1] + grid[0][j]',
            '初始化第一列：dp[i][0] = dp[i-1][0] + grid[i][0]',
            '遍历剩余网格：dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
            '返回dp[m-1][n-1]',
        ],
        stateEquation: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
        code: "function minPathSum(grid: number[][]): number {\n  const m = grid.length;\n  const n = grid[0].length;\n\n  // \u521B\u5EFAdp\u6570\u7EC4\n  const dp = Array.from({length: m}, () => new Array(n).fill(0));\n\n  // \u521D\u59CB\u5316\u8D77\u70B9\n  dp[0][0] = grid[0][0];\n\n  // \u521D\u59CB\u5316\u7B2C\u4E00\u884C\n  for (let j = 1; j < n; j++) {\n    dp[0][j] = dp[0][j-1] + grid[0][j];\n  }\n\n  // \u521D\u59CB\u5316\u7B2C\u4E00\u5217\n  for (let i = 1; i < m; i++) {\n    dp[i][0] = dp[i-1][0] + grid[i][0];\n  }\n\n  // \u586B\u5145\u5269\u4F59\u7F51\u683C\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];\n    }\n  }\n\n  return dp[m-1][n-1];\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst grid = [\n  [1,3,1],\n  [1,5,1],\n  [4,2,1]\n];\nconsole.log(minPathSum(grid)); // 7 (1\u21923\u21921\u21921\u21921)",
        example: {
            input: '[[1,3,1],[1,5,1],[4,2,1]]',
            output: '7',
            explanation: '路径 1→3→1→1→1 的总和最小为7',
        },
        applications: '机器人导航、游戏路径规划、资源优化',
        timeComplexity: 'O(m×n)',
        spaceComplexity: 'O(m×n) 可优化到O(n)',
    },
    {
        id: 8,
        title: '不同路径',
        desc: '网格中从左上到右下的路径数',
        problem: '一个机器人位于一个m x n网格的左上角。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。问总共有多少条不同的路径？',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['组合数学', '矩阵DP'],
        dpApproach: '使用二维dp数组，每个位置的路径数等于上方和左方路径数之和。',
        steps: [
            '创建二维dp数组，初始化为0',
            '初始化第一行和第一列为1（只有一条直线路径）',
            '遍历剩余网格：dp[i][j] = dp[i-1][j] + dp[i][j-1]',
            '返回dp[m-1][n-1]',
        ],
        stateEquation: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
        code: "function uniquePaths(m: number, n: number): number {\n  // \u521B\u5EFAdp\u6570\u7EC4\n  const dp = Array.from({length: m}, () => new Array(n).fill(0));\n\n  // \u521D\u59CB\u5316\u7B2C\u4E00\u5217\n  for (let i = 0; i < m; i++) {\n    dp[i][0] = 1;\n  }\n\n  // \u521D\u59CB\u5316\u7B2C\u4E00\u884C\n  for (let j = 0; j < n; j++) {\n    dp[0][j] = 1;\n  }\n\n  // \u586B\u5145\u5269\u4F59\u7F51\u683C\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    }\n  }\n\n  return dp[m-1][n-1];\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(uniquePaths(3, 7)); // 28",
        example: {
            input: 'm=3, n=7',
            output: '28',
            explanation: '从左上角到右下角共有28条不同路径',
        },
        applications: '机器人导航、概率计算、组合数学',
        timeComplexity: 'O(m×n)',
        spaceComplexity: 'O(m×n) 可优化到O(n)',
    },
]);
// 当前选中的问题
var currentProblem = computed(function () {
    return activeProblem.value !== null ? problems.value[activeProblem.value] : null;
});
// 过滤问题列表
var filteredProblems = computed(function () {
    if (!searchQuery.value)
        return problems.value;
    var query = searchQuery.value.toLowerCase();
    return problems.value.filter(function (problem) {
        return problem.title.toLowerCase().includes(query) ||
            problem.desc.toLowerCase().includes(query) ||
            problem.tags.some(function (tag) { return tag.toLowerCase().includes(query); });
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "dp-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ type: "text", value: (__VLS_ctx.searchQuery), placeholder: "搜索动态规划题目..." }, { class: "search-input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "search-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-search" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
(__VLS_ctx.problems.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problems-list" }));
var _loop_1 = function (problem, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeProblem = index;
        } }, { key: (problem.id) }), { class: "problem-card" }), { class: ({ active: __VLS_ctx.activeProblem === index }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "problem-id" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "problem-title" }));
    (problem.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "problem-difficulty" }, { class: (problem.difficulty) }));
    (problem.diffText);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "problem-desc" }));
    (problem.desc);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-tags" }));
    for (var _u = 0, _v = __VLS_getVForSourceType((problem.tags)); _u < _v.length; _u++) {
        var tag = _v[_u][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (tag) }, { class: "tag" }));
        (tag);
    }
};
for (var _i = 0, _p = __VLS_getVForSourceType((__VLS_ctx.filteredProblems)); _i < _p.length; _i++) {
    var _q = _p[_i], problem = _q[0], index = _q[1];
    _loop_1(problem, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-detail" }));
if (__VLS_ctx.activeProblem !== null) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    ((_a = __VLS_ctx.currentProblem) === null || _a === void 0 ? void 0 : _a.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-meta" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-difficulty" }));
    ((_b = __VLS_ctx.currentProblem) === null || _b === void 0 ? void 0 : _b.diffText);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-time" }));
    ((_c = __VLS_ctx.currentProblem) === null || _c === void 0 ? void 0 : _c.timeComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "meta-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-space" }));
    ((_d = __VLS_ctx.currentProblem) === null || _d === void 0 ? void 0 : _d.spaceComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-problem" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    ((_e = __VLS_ctx.currentProblem) === null || _e === void 0 ? void 0 : _e.problem);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-idea" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    ((_f = __VLS_ctx.currentProblem) === null || _f === void 0 ? void 0 : _f.dpApproach);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-steps" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "steps" }));
    for (var _r = 0, _s = __VLS_getVForSourceType(((_g = __VLS_ctx.currentProblem) === null || _g === void 0 ? void 0 : _g.steps)); _r < _s.length; _r++) {
        var _t = _s[_r], step = _t[0], idx = _t[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (step);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-formula" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-box" }));
    ((_h = __VLS_ctx.currentProblem) === null || _h === void 0 ? void 0 : _h.stateEquation);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    ((_j = __VLS_ctx.currentProblem) === null || _j === void 0 ? void 0 : _j.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_k = __VLS_ctx.currentProblem) === null || _k === void 0 ? void 0 : _k.example.input);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_l = __VLS_ctx.currentProblem) === null || _l === void 0 ? void 0 : _l.example.output);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_m = __VLS_ctx.currentProblem) === null || _m === void 0 ? void 0 : _m.example.explanation);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-app" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    ((_o = __VLS_ctx.currentProblem) === null || _o === void 0 ? void 0 : _o.applications);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-state" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-select" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "dp-patterns" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "patterns-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['dp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-search']} */ ;
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
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['problems-list']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-card']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-header']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-id']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-title']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-content']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-header']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-time']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-space']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-problem']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-idea']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-formula']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-box']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-code']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-app']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-select']} */ ;
/** @type {__VLS_StyleScopedClasses['dp-patterns']} */ ;
/** @type {__VLS_StyleScopedClasses['patterns-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-example']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-example']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-example']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-example']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            searchQuery: searchQuery,
            activeProblem: activeProblem,
            problems: problems,
            currentProblem: currentProblem,
            filteredProblems: filteredProblems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
