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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
import { ref, computed } from 'vue';
// 搜索查询
var searchQuery = ref('');
// 当前激活的问题索引
var activeProblem = ref(null);
// 所有贪心算法问题
var problems = ref([
    {
        id: 1,
        title: '找零钱问题',
        desc: '用最少的硬币数量找零',
        problem: '给定不同面额的硬币 coins 和一个总金额 amount，计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['动态规划', '贪心算法'],
        greedyStrategy: '每次优先选择最大面额的硬币（注意：这种方法只在特定面额下有效，如标准币值系统）',
        steps: [
            '将硬币按面额从大到小排序',
            '从最大面额的硬币开始，尽可能多地选择该面额硬币',
            '用剩余金额重复上述过程，使用次大面额硬币',
            '直到金额变为0，或无法继续找零',
        ],
        code: "function coinChange(coins: number[], amount: number): number {\n  coins.sort((a, b) => b - a); // \u964D\u5E8F\u6392\u5E8F\n  let count = 0;\n  let remaining = amount;\n\n  for (const coin of coins) {\n    if (remaining === 0) break;\n    if (coin <= remaining) {\n      const num = Math.floor(remaining / coin);\n      count += num;\n      remaining -= num * coin;\n    }\n  }\n\n  return remaining === 0 ? count : -1;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst coins = [1, 5, 10, 25];\nconsole.log(coinChange(coins, 36)); // \u8F93\u51FA: 3 (25+10+1)",
        example: {
            input: 'coins = [1, 5, 10, 25], amount = 36',
            output: '3',
            explanation: '25 + 10 + 1 = 36，共使用3枚硬币',
        },
        applications: '自动售货机找零、收银系统、金融计算',
        timeComplexity: 'O(n log n) 主要来自排序',
        spaceComplexity: 'O(1)',
    },
    {
        id: 2,
        title: '背包问题（分数）',
        desc: '最大化背包价值，物品可分割',
        problem: '给定背包容量 W 和一系列物品，每个物品有重量和价值。你可以取物品的一部分，求背包能装的最大价值。',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['贪心算法', '优化问题'],
        greedyStrategy: '优先选择价值/重量比最高的物品',
        steps: [
            '计算每个物品的单位价值（价值/重量）',
            '按单位价值降序排序',
            '依次选择物品，尽可能多地取单位价值高的物品',
            '当背包容量不足时，取部分物品填满背包',
        ],
        code: "interface Item {\n  value: number;\n  weight: number;\n}\n\nfunction fractionalKnapsack(W: number, items: Item[]): number {\n  // \u8BA1\u7B97\u5355\u4F4D\u4EF7\u503C\u5E76\u6392\u5E8F\n  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));\n\n  let totalValue = 0;\n  let remaining = W;\n\n  for (const item of items) {\n    if (remaining <= 0) break;\n\n    // \u53D6\u5C3D\u53EF\u80FD\u591A\u7684\u5F53\u524D\u7269\u54C1\n    const amount = Math.min(item.weight, remaining);\n    totalValue += (item.value / item.weight) * amount;\n    remaining -= amount;\n  }\n\n  return totalValue;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst items = [\n  { value: 60, weight: 10 },\n  { value: 100, weight: 20 },\n  { value: 120, weight: 30 }\n];\nconsole.log(fractionalKnapsack(50, items)); // \u8F93\u51FA: 240",
        example: {
            input: 'W=50, items = [[60,10], [100,20], [120,30]]',
            output: '240',
            explanation: '取全部第一件物品(60)、全部第二件物品(100)和2/3的第三件物品(80)',
        },
        applications: '资源分配、投资组合优化、装载问题',
        timeComplexity: 'O(n log n) 主要来自排序',
        spaceComplexity: 'O(1)',
    },
    {
        id: 3,
        title: '活动选择问题',
        desc: '选择最多数量的互不重叠活动',
        problem: '给定一组活动，每个活动有开始时间和结束时间。选择最大数量的活动，使它们互不重叠。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['区间调度', '贪心算法'],
        greedyStrategy: '优先选择结束时间最早的活动',
        steps: [
            '按结束时间对所有活动进行升序排序',
            '选择第一个活动',
            '遍历剩余活动，选择开始时间晚于或等于上一个活动结束时间的活动',
            '重复直到所有活动都被考虑',
        ],
        code: "interface Activity {\n  start: number;\n  end: number;\n}\n\nfunction activitySelection(activities: Activity[]): Activity[] {\n  // \u6309\u7ED3\u675F\u65F6\u95F4\u5347\u5E8F\u6392\u5E8F\n  activities.sort((a, b) => a.end - b.end);\n\n  const selected: Activity[] = [];\n  let lastEnd = -1;\n\n  for (const act of activities) {\n    if (act.start >= lastEnd) {\n      selected.push(act);\n      lastEnd = act.end;\n    }\n  }\n\n  return selected;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconst activities = [\n  { start: 1, end: 4 },\n  { start: 3, end: 5 },\n  { start: 0, end: 6 },\n  { start: 5, end: 7 },\n  { start: 8, end: 9 }\n];\nconsole.log(activitySelection(activities));\n// \u8F93\u51FA: [{start:1,end:4}, {start:5,end:7}, {start:8,end:9}]",
        example: {
            input: 'activities = [[1,4], [3,5], [0,6], [5,7], [8,9]]',
            output: '3个活动',
            explanation: '可以选择活动 [1,4]、[5,7] 和 [8,9]',
        },
        applications: '会议室安排、课程表安排、任务调度',
        timeComplexity: 'O(n log n) 主要来自排序',
        spaceComplexity: 'O(1) 如果不考虑结果存储',
    },
    {
        id: 4,
        title: '跳跃游戏',
        desc: '判断能否到达数组末尾',
        problem: '给定一个非负整数数组 nums，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个下标。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['数组', '贪心算法'],
        greedyStrategy: '维护当前能到达的最远位置，并不断更新',
        steps: [
            '初始化最远位置为0',
            '遍历数组中的每个位置',
            '如果当前位置可达（位置索引 <= 当前最远位置），更新最远位置为 max(当前最远位置, 当前位置 + 跳跃长度)',
            '如果最远位置 >= 最后一个位置索引，返回true',
            '如果遍历结束仍未到达末尾，返回false',
        ],
        code: "function canJump(nums: number[]): boolean {\n  let maxReach = 0;\n\n  for (let i = 0; i < nums.length; i++) {\n    // \u5982\u679C\u5F53\u524D\u4F4D\u7F6E\u5DF2\u7ECF\u8D85\u8FC7\u80FD\u5230\u8FBE\u7684\u6700\u8FDC\u4F4D\u7F6E\n    if (i > maxReach) return false;\n\n    // \u66F4\u65B0\u80FD\u5230\u8FBE\u7684\u6700\u8FDC\u4F4D\u7F6E\n    maxReach = Math.max(maxReach, i + nums[i]);\n\n    // \u5982\u679C\u5DF2\u7ECF\u53EF\u4EE5\u5230\u8FBE\u672B\u5C3E\n    if (maxReach >= nums.length - 1) return true;\n  }\n\n  return false;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(canJump([2, 3, 1, 1, 4])); // true\nconsole.log(canJump([3, 2, 1, 0, 4])); // false",
        example: {
            input: '[2, 3, 1, 1, 4]',
            output: 'true',
            explanation: '从索引0跳1步到索引1，然后跳3步到索引4',
        },
        applications: '游戏AI路径规划、机器人移动、网络路由',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 5,
        title: '买卖股票的最佳时机 II',
        desc: '多次买卖股票获取最大利润',
        problem: '给定一个数组 prices，其中 prices[i] 表示某支股票第 i 天的价格。你可以在任何时候买入或卖出股票，但最多只能持有一股股票。计算你能获得的最大利润。',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['数组', '贪心算法'],
        greedyStrategy: '所有上升区间的利润之和就是最大利润',
        steps: [
            '初始化利润为0',
            '从第2天开始遍历',
            '如果当天价格高于前一天价格，将差价加入利润',
            '遍历结束后返回总利润',
        ],
        code: "function maxProfit(prices: number[]): number {\n  let profit = 0;\n\n  for (let i = 1; i < prices.length; i++) {\n    if (prices[i] > prices[i - 1]) {\n      profit += prices[i] - prices[i - 1];\n    }\n  }\n\n  return profit;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(maxProfit([7, 1, 5, 3, 6, 4])); // \u8F93\u51FA: 7\nconsole.log(maxProfit([1, 2, 3, 4, 5]));    // \u8F93\u51FA: 4",
        example: {
            input: '[7,1,5,3,6,4]',
            output: '7',
            explanation: '第2天买入(1)，第3天卖出(5) -> 利润4；第4天买入(3)，第5天卖出(6) -> 利润3；总利润7',
        },
        applications: '股票交易策略、金融分析、投资决策',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
    },
    {
        id: 6,
        title: '分发饼干',
        desc: '满足尽可能多的孩子',
        problem: '有一群孩子和一堆饼干，每个孩子有一个胃口值，每个饼干有一个大小。每个孩子最多只能分到一块饼干，且饼干的大小必须大于等于孩子的胃口值。求最多可以满足多少孩子。',
        difficulty: 'easy',
        diffText: '简单',
        tags: ['贪心算法', '双指针'],
        greedyStrategy: '优先满足胃口小的孩子',
        steps: [
            '将孩子胃口数组和饼干大小数组排序',
            '初始化两个指针分别指向孩子和饼干数组的开头',
            '遍历饼干数组，尝试满足当前孩子',
            '如果当前饼干能满足当前孩子，两个指针都前进',
            '如果不能满足，只前进饼干指针',
            '返回满足的孩子数量',
        ],
        code: "function findContentChildren(g: number[], s: number[]): number {\n  g.sort((a, b) => a - b);\n  s.sort((a, b) => a - b);\n\n  let child = 0;\n  let cookie = 0;\n\n  while (child < g.length && cookie < s.length) {\n    if (s[cookie] >= g[child]) {\n      child++;\n    }\n    cookie++;\n  }\n\n  return child;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(findContentChildren([1,2,3], [1,1])); // 1\nconsole.log(findContentChildren([1,2], [1,2,3])); // 2",
        example: {
            input: 'g=[1,2,3], s=[1,1]',
            output: '1',
            explanation: '只能满足胃口为1的孩子',
        },
        applications: '资源分配、任务调度、需求匹配',
        timeComplexity: 'O(n log n) 主要来自排序',
        spaceComplexity: 'O(1)',
    },
    {
        id: 7,
        title: '无重叠区间',
        desc: '移除最小区间使所有区间不重叠',
        problem: '给定一个区间集合 intervals，其中 intervals[i] = [start_i, end_i]。找到需要移除区间的最小数量，使剩余区间互不重叠。',
        difficulty: 'medium',
        diffText: '中等',
        tags: ['区间调度', '贪心算法'],
        greedyStrategy: '优先保留结束早的区间',
        steps: [
            '按结束时间对所有区间进行升序排序',
            '初始化计数器和上一个保留区间的结束时间',
            '遍历排序后的区间',
            '如果当前区间与上一个保留区间不重叠，保留该区间并更新结束时间',
            '否则移除该区间',
            '返回移除的区间数量',
        ],
        code: "function eraseOverlapIntervals(intervals: number[][]): number {\n  if (intervals.length === 0) return 0;\n\n  // \u6309\u7ED3\u675F\u65F6\u95F4\u5347\u5E8F\u6392\u5E8F\n  intervals.sort((a, b) => a[1] - b[1]);\n\n  let count = 0;\n  let lastEnd = intervals[0][1];\n\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < lastEnd) {\n      // \u6709\u91CD\u53E0\uFF0C\u9700\u8981\u79FB\u9664\n      count++;\n    } else {\n      // \u6CA1\u6709\u91CD\u53E0\uFF0C\u66F4\u65B0\u7ED3\u675F\u65F6\u95F4\n      lastEnd = intervals[i][1];\n    }\n  }\n\n  return count;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1\nconsole.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));      // 2",
        example: {
            input: '[[1,2],[2,3],[3,4],[1,3]]',
            output: '1',
            explanation: '移除[1,3]可以使其他区间不重叠',
        },
        applications: '日程安排、资源分配、时间线管理',
        timeComplexity: 'O(n log n) 主要来自排序',
        spaceComplexity: 'O(1)',
    },
    {
        id: 8,
        title: '任务调度器',
        desc: '安排任务并计算最短时间',
        problem: '给定一个用字符数组表示的CPU需要执行的任务列表。任务用大写字母A-Z表示。任务可以以任意顺序执行，并且每个任务都可以在1个单位时间内执行完。两个相同种类的任务之间必须有长度为n的冷却时间，求完成所有任务所需要的最短时间。',
        difficulty: 'hard',
        diffText: '困难',
        tags: ['贪心算法', '数组'],
        greedyStrategy: '优先安排数量最多的任务',
        steps: [
            '统计每个任务出现的次数',
            '找到出现次数最多的任务，假设次数为max',
            '计算空闲槽的数量：idleSlots = (max - 1) * n',
            '遍历其他任务，用它们填充空闲槽',
            '总时间 = 任务总数 + 剩余的空闲槽数量',
        ],
        code: "function leastInterval(tasks: string[], n: number): number {\n  const freq = new Array(26).fill(0);\n  for (const task of tasks) {\n    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;\n  }\n\n  freq.sort((a, b) => b - a); // \u964D\u5E8F\u6392\u5E8F\n\n  const maxFreq = freq[0];\n  let idleSlots = (maxFreq - 1) * n;\n\n  for (let i = 1; i < freq.length && idleSlots > 0; i++) {\n    idleSlots -= Math.min(maxFreq - 1, freq[i]);\n  }\n\n  idleSlots = Math.max(0, idleSlots);\n\n  return tasks.length + idleSlots;\n}\n\n// \u793A\u4F8B\u4F7F\u7528\nconsole.log(leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2)); // 8\nconsole.log(leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 0)); // 6",
        example: {
            input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
            output: '8',
            explanation: '一种可能的执行顺序: A -> B -> 待命 -> A -> B -> 待命 -> A -> B',
        },
        applications: 'CPU任务调度、工作流优化、生产排程',
        timeComplexity: 'O(n) 统计频率 + O(1) 排序（26个字母）',
        spaceComplexity: 'O(1) 固定大小数组',
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
function coinChange(coins, amount) {
    coins.sort(function (a, b) { return b - a; }); // 降序排序
    var count = 0;
    var remaining = amount;
    for (var _i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
        var coin = coins_1[_i];
        if (remaining === 0)
            break;
        if (coin <= remaining) {
            var num = Math.floor(remaining / coin);
            count += num;
            remaining -= num * coin;
        }
    }
    return remaining === 0 ? count : -1;
}
console.log(coinChange([5], 7));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "greedy-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ type: "text", value: (__VLS_ctx.searchQuery), placeholder: "搜索贪心算法题目..." }, { class: "search-input" }));
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
    for (var _t = 0, _u = __VLS_getVForSourceType((problem.tags)); _t < _u.length; _t++) {
        var tag = _u[_t][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (tag) }, { class: "tag" }));
        (tag);
    }
};
for (var _i = 0, _o = __VLS_getVForSourceType((__VLS_ctx.filteredProblems)); _i < _o.length; _i++) {
    var _p = _o[_i], problem = _p[0], index = _p[1];
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
    ((_f = __VLS_ctx.currentProblem) === null || _f === void 0 ? void 0 : _f.greedyStrategy);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-steps" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "steps" }));
    for (var _q = 0, _r = __VLS_getVForSourceType(((_g = __VLS_ctx.currentProblem) === null || _g === void 0 ? void 0 : _g.steps)); _q < _r.length; _q++) {
        var _s = _r[_q], step = _s[0], idx = _s[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (step);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    ((_h = __VLS_ctx.currentProblem) === null || _h === void 0 ? void 0 : _h.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_j = __VLS_ctx.currentProblem) === null || _j === void 0 ? void 0 : _j.example.input);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_k = __VLS_ctx.currentProblem) === null || _k === void 0 ? void 0 : _k.example.output);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    ((_l = __VLS_ctx.currentProblem) === null || _l === void 0 ? void 0 : _l.example.explanation);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-app" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    ((_m = __VLS_ctx.currentProblem) === null || _m === void 0 ? void 0 : _m.applications);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-state" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-select" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['greedy-container']} */ ;
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
/** @type {__VLS_StyleScopedClasses['icon-code']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-app']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-select']} */ ;
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
