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
import { ref, reactive, onMounted } from 'vue';
// 硬币找零动画相关状态
var coins = reactive([
    { value: 25, left: 50, top: 100, scale: 1.2, zIndex: 5, active: false },
    { value: 10, left: 120, top: 80, scale: 1.0, zIndex: 4, active: false },
    { value: 5, left: 180, top: 110, scale: 0.9, zIndex: 3, active: false },
    { value: 1, left: 250, top: 70, scale: 0.7, zIndex: 1, active: false },
    { value: 1, left: 280, top: 130, scale: 0.7, zIndex: 1, active: false },
    { value: 5, left: 320, top: 90, scale: 0.9, zIndex: 3, active: false },
    { value: 10, left: 370, top: 120, scale: 1.0, zIndex: 4, active: false },
    { value: 25, left: 430, top: 80, scale: 1.2, zIndex: 5, active: false },
]);
var selectedCoins = ref([]);
var total = ref(0);
var selectCoin = function (index) {
    coins[index].active = !coins[index].active;
    if (coins[index].active) {
        selectedCoins.value.push(coins[index].value);
        total.value += coins[index].value;
    }
    else {
        var coinIndex = selectedCoins.value.indexOf(coins[index].value);
        if (coinIndex !== -1) {
            selectedCoins.value.splice(coinIndex, 1);
            total.value -= coins[index].value;
        }
    }
};
var reset = function () {
    coins.forEach(function (coin) { return coin.active = false; });
    selectedCoins.value = [];
    total.value = 0;
};
var solveGreedy = function () {
    reset();
    var target = 41; // 找一个合适的金额展示贪心解法
    var remaining = target;
    // 按面额从大到小排序
    var sortedCoins = __spreadArray([], coins, true).sort(function (a, b) { return b.value - a.value; });
    sortedCoins.forEach(function (coin) {
        while (remaining >= coin.value) {
            var coinIndex = coins.findIndex(function (c) {
                return c.value === coin.value && !c.active &&
                    !selectedCoins.value.includes(coin.value);
            });
            if (coinIndex !== -1) {
                coins[coinIndex].active = true;
                selectedCoins.value.push(coin.value);
                remaining -= coin.value;
                total.value += coin.value;
            }
            else {
                break;
            }
        }
    });
};
// 贪心算法步骤
var greedySteps = ref([
    {
        title: '问题分解',
        description: '将问题分解为一系列子问题，每个子问题都需要做出选择',
        example: '找零问题分解为每次选择最大面额的硬币'
    },
    {
        title: '贪心选择',
        description: '每一步选择当前状态下的最优解（局部最优解）',
        example: '每次选择不大于剩余金额的最大面额硬币'
    },
    {
        title: '迭代更新',
        description: '基于当前选择更新问题状态，继续下一步选择',
        example: '更新剩余金额，重复直到问题解决'
    }
]);
// 经典贪心问题
var greedyProblems = ref([
    {
        icon: '💰',
        title: '硬币找零问题',
        description: '用最少数量的硬币凑成指定金额（使用标准面额体系）',
        strategy: '每次选择不超过剩余金额的最大面额硬币',
        code: "function coinChange(coins: number[], amount: number): number[] {\n  // \u6309\u9762\u989D\u964D\u5E8F\u6392\u5E8F\n  coins.sort((a, b) => b - a);\n\n  const result = [];\n  let remaining = amount;\n\n  for (const coin of coins) {\n    while (remaining >= coin) {\n      result.push(coin);\n      remaining -= coin;\n    }\n  }\n\n  return remaining === 0 ? result : [];\n}"
    },
    {
        icon: '⏰',
        title: '区间调度问题',
        description: '选择最多数量的互不重叠的时间区间',
        strategy: '每次选择结束时间最早的区间',
        code: "function intervalScheduling(intervals: [number, number][]): number {\n  // \u6309\u7ED3\u675F\u65F6\u95F4\u5347\u5E8F\u6392\u5E8F\n  intervals.sort((a, b) => a[1] - b[1]);\n\n  let count = 0;\n  let lastEnd = -Infinity;\n\n  for (const [start, end] of intervals) {\n    if (start >= lastEnd) {\n      count++;\n      lastEnd = end;\n    }\n  }\n\n  return count;\n}"
    },
    {
        icon: '📦',
        title: '背包问题（分数）',
        description: '在容量限制下选择物品，最大化总价值（物品可分）',
        strategy: '优先选择单位价值最高的物品',
        code: "function fractionalKnapsack(items: {value: number, weight: number}[], capacity: number): number {\n  // \u6309\u5355\u4F4D\u4EF7\u503C\u964D\u5E8F\u6392\u5E8F\n  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));\n\n  let totalValue = 0;\n  let remaining = capacity;\n\n  for (const item of items) {\n    if (remaining >= item.weight) {\n      // \u53D6\u5168\u90E8\u7269\u54C1\n      totalValue += item.value;\n      remaining -= item.weight;\n    } else {\n      // \u53D6\u90E8\u5206\u7269\u54C1\n      totalValue += item.value * (remaining / item.weight);\n      break;\n    }\n  }\n\n  return totalValue;\n}"
    }
]);
// 使用场景
var useCases = ref([
    {
        icon: '🛒',
        title: '购物优惠',
        description: '满减活动中选择最优组合最大化优惠'
    },
    {
        icon: '🚗',
        title: '路径规划',
        description: 'Dijkstra算法寻找单源最短路径'
    },
    {
        icon: '📶',
        title: '网络传输',
        description: '哈夫曼编码实现数据压缩'
    },
    {
        icon: '🏠',
        title: '任务调度',
        description: '操作系统中的CPU调度算法'
    },
    {
        icon: '🔄',
        title: '内存分配',
        description: '操作系统中的内存管理策略'
    },
    {
        icon: '🗺️',
        title: '近似算法',
        description: 'NP难问题的近似解法'
    }
]);
// 优缺点
var advantages = ref([
    '实现简单，易于理解',
    '运行效率高，时间复杂度低',
    '空间复杂度通常为O(1)',
    '在特定问题上可得到最优解',
    '算法直观，易于调试'
]);
var disadvantages = ref([
    '不能保证全局最优解',
    '应用范围有限',
    '需要证明贪心策略的有效性',
    '对问题分析要求高',
    '局部最优可能偏离全局最优'
]);
// 初始化
onMounted(function () {
    // 初始选择一些硬币
    setTimeout(function () {
        coins[0].active = true;
        coins[3].active = true;
        coins[5].active = true;
        selectedCoins.value = [coins[0].value, coins[3].value, coins[5].value];
        total.value = coins[0].value + coins[3].value + coins[5].value;
    }, 1000);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['greedy-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['animation-area']} */ ;
/** @type {__VLS_StyleScopedClasses['coins']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "greedy-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "animation-area" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "coins" }));
var _loop_1 = function (coin, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.selectCoin(index);
        } }, { key: (index) }), { class: "coin" }), { style: ({
            left: "".concat(coin.left, "px"),
            top: "".concat(coin.top, "px"),
            transform: "scale(".concat(coin.scale, ")"),
            zIndex: coin.zIndex,
            opacity: coin.active ? 1 : 0.6
        }) }));
    (coin.value);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.coins)); _i < _a.length; _i++) {
    var _b = _a[_i], coin = _b[0], index = _b[1];
    _loop_1(coin, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "selection" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "selected-coins" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.selectedCoins)); _c < _d.length; _c++) {
    var _e = _d[_c], coin = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "selected-coin" }));
    (coin);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "total" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "total-value" }));
(__VLS_ctx.total);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.reset) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.solveGreedy) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section concept" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-cards" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.greedySteps)); _f < _g.length; _f++) {
    var _h = _g[_f], step = _h[0], index = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (step.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step.description);
    if (step.example) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        (step.example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section problems" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-cards" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.greedyProblems)); _j < _k.length; _j++) {
    var _l = _k[_j], problem = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "problem-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-icon" }));
    (problem.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (problem.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (problem.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "solution" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (problem.strategy);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-block" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    (problem.code);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section use-cases" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-list" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.useCases)); _m < _o.length; _m++) {
    var _p = _o[_m], caseItem = _p[0], index = _p[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "use-case-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-icon" }));
    (caseItem.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (caseItem.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (caseItem.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section pros-cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.advantages)); _q < _r.length; _q++) {
    var _s = _r[_q], pro = _s[0], index = _s[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "check-icon" }));
    (pro);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _t = 0, _u = __VLS_getVForSourceType((__VLS_ctx.disadvantages)); _t < _u.length; _t++) {
    var _v = _u[_t], con = _v[0], index = _v[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cross-icon" }));
    (con);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section summary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['greedy-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['animation-area']} */ ;
/** @type {__VLS_StyleScopedClasses['coins']} */ ;
/** @type {__VLS_StyleScopedClasses['coin']} */ ;
/** @type {__VLS_StyleScopedClasses['selection']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-coins']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-coin']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['total-value']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['concept']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step-example']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['problems']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-card']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-header']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['problem-description']} */ ;
/** @type {__VLS_StyleScopedClasses['solution']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-list']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-item']} */ ;
/** @type {__VLS_StyleScopedClasses['case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['case-content']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['check-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['cross-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['summary']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            coins: coins,
            selectedCoins: selectedCoins,
            total: total,
            selectCoin: selectCoin,
            reset: reset,
            solveGreedy: solveGreedy,
            greedySteps: greedySteps,
            greedyProblems: greedyProblems,
            useCases: useCases,
            advantages: advantages,
            disadvantages: disadvantages,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
