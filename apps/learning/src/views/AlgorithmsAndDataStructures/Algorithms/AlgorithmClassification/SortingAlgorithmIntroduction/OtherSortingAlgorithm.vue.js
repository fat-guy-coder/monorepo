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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
// 算法数据
var algorithms = [
    {
        name: '地精排序 (Gnome Sort)',
        description: '地精排序类似于插入排序，但使用更简单的逻辑。它通过比较相邻元素，如果顺序错误就交换它们，然后后退一步重新检查。',
        complexity: {
            time: 'O(n²)',
            worstTime: 'O(n²)',
            space: 'O(1)',
            stable: true
        },
        advantages: [
            '实现极其简单，代码量少',
            '对于小型或基本有序的数据集效率较高',
            '不需要嵌套循环，逻辑直观'
        ],
        disadvantages: [
            '在大数据集上性能很差',
            '平均时间复杂度较高',
            '不如其他O(n²)算法优化'
        ],
        applications: '适用于教学场景，用于展示简单的排序思想，或在嵌入式系统等资源受限环境中处理小型数据集。',
        applicationsShort: '教学、小型数据集',
        code: "function gnomeSort(arr: number[]): number[] {\n  let pos = 0;\n\n  while (pos < arr.length) {\n    if (pos === 0 || arr[pos] >= arr[pos-1]) {\n      pos++;\n    } else {\n      // \u4EA4\u6362\u5143\u7D20\n      [arr[pos], arr[pos-1]] = [arr[pos-1], arr[pos]];\n      pos--;\n    }\n  }\n\n  return arr;\n}"
    },
    {
        name: '鸡尾酒排序 (Cocktail Shaker Sort)',
        description: '鸡尾酒排序是冒泡排序的变体，它双向进行排序。先从左到右移动最大的元素，然后从右到左移动最小的元素，如此往复。',
        complexity: {
            time: 'O(n²)',
            worstTime: 'O(n²)',
            space: 'O(1)',
            stable: true
        },
        advantages: [
            '比传统冒泡排序稍快',
            '对于基本有序的数据集效率较高',
            '减少某些情况下的比较次数'
        ],
        disadvantages: [
            '仍然有O(n²)的时间复杂度',
            '在大型数据集上效率低下',
            '实际应用中优化有限'
        ],
        applications: '适用于教学目的，展示冒泡排序的优化思路，或处理小型、部分有序的数据集。',
        applicationsShort: '教学、部分有序数据',
        code: "function cocktailShakerSort(arr: number[]): number[] {\n  let swapped = true;\n  let start = 0;\n  let end = arr.length - 1;\n\n  while (swapped) {\n    swapped = false;\n\n    // \u4ECE\u5DE6\u5411\u53F3\u904D\u5386\n    for (let i = start; i < end; i++) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        swapped = true;\n      }\n    }\n\n    if (!swapped) break;\n\n    swapped = false;\n    end--;\n\n    // \u4ECE\u53F3\u5411\u5DE6\u904D\u5386\n    for (let i = end - 1; i >= start; i--) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        swapped = true;\n      }\n    }\n\n    start++;\n  }\n\n  return arr;\n}"
    },
    {
        name: '奇偶排序 (Odd-Even Sort)',
        description: '奇偶排序基于冒泡排序，但通过并行化优化。它分两个阶段：奇数阶段比较所有奇数索引对，偶数阶段比较所有偶数索引对，交替进行直到排序完成。',
        complexity: {
            time: 'O(n²)',
            worstTime: 'O(n²)',
            space: 'O(1)',
            stable: true
        },
        advantages: [
            '易于并行化实现',
            '在某些硬件架构上效率较高',
            '对于部分有序数据表现良好'
        ],
        disadvantages: [
            '在单线程环境中效率不高',
            '对于随机数据性能较差',
            '不如现代排序算法高效'
        ],
        applications: '主要用于并行计算环境，或在需要利用SIMD指令集的特定硬件上实现。',
        applicationsShort: '并行计算环境',
        code: "function oddEvenSort(arr: number[]): number[] {\n  const n = arr.length;\n  let sorted = false;\n\n  while (!sorted) {\n    sorted = true;\n\n    // \u5947\u6570\u7D22\u5F15\u6BD4\u8F83 (i=1,3,5,...)\n    for (let i = 1; i < n - 1; i += 2) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        sorted = false;\n      }\n    }\n\n    // \u5076\u6570\u7D22\u5F15\u6BD4\u8F83 (i=0,2,4,...)\n    for (let i = 0; i < n - 1; i += 2) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        sorted = false;\n      }\n    }\n  }\n\n  return arr;\n}"
    },
    {
        name: '梳排序 (Comb Sort)',
        description: '梳排序是冒泡排序的改进版本，通过使用大于1的间隔来消除小的值。它从较大的间隔开始，逐渐减小到1，最后使用冒泡排序完成。',
        complexity: {
            time: 'O(n log n)',
            worstTime: 'O(n²)',
            space: 'O(1)',
            stable: false
        },
        advantages: [
            '比冒泡排序快得多',
            '实现相对简单',
            '不需要额外内存空间',
            '比希尔排序更容易理解'
        ],
        disadvantages: [
            '最坏情况下性能较差',
            '不稳定排序',
            '不如快速排序或归并排序高效'
        ],
        applications: '适用于中等规模数据集，或作为简单排序算法的优化版本。',
        applicationsShort: '中等规模数据集',
        code: "function combSort(arr: number[]): number[] {\n  const n = arr.length;\n  let gap = n;\n  let swapped = true;\n  const shrink = 1.3;  // \u6536\u7F29\u56E0\u5B50\n\n  while (gap > 1 || swapped) {\n    // \u8BA1\u7B97\u65B0\u95F4\u9694\n    gap = Math.floor(gap / shrink);\n    if (gap < 1) gap = 1;\n\n    swapped = false;\n\n    // \u4F7F\u7528\u5F53\u524D\u95F4\u9694\u8FDB\u884C\u5192\u6CE1\u6392\u5E8F\n    for (let i = 0; i < n - gap; i++) {\n      if (arr[i] > arr[i + gap]) {\n        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];\n        swapped = true;\n      }\n    }\n  }\n\n  return arr;\n}"
    },
    {
        name: '侏儒排序 (Stooge Sort)',
        description: '侏儒排序是一种递归排序算法，效率极低但概念有趣。它通过递归地将列表分成三部分，排序前2/3，再排序后2/3，然后再排序前2/3。',
        complexity: {
            time: 'O(n^(log 3 / log 1.5)) ≈ O(n^2.7095)',
            worstTime: 'O(n^(log 3 / log 1.5))',
            space: 'O(n)',
            stable: false
        },
        advantages: [
            '概念简单，易于理解递归思想',
            '教学用途展示低效算法',
            '算法思路独特有趣'
        ],
        disadvantages: [
            '效率极低，不适合实际应用',
            '递归深度大，可能栈溢出',
            '空间复杂度高'
        ],
        applications: '仅用于教学目的，展示低效算法的概念或递归思想。',
        applicationsShort: '教学目的',
        code: "function stoogeSort(arr: number[], l = 0, r = arr.length - 1): number[] {\n  if (l >= r) return arr;\n\n  // \u5982\u679C\u7B2C\u4E00\u4E2A\u5143\u7D20\u5927\u4E8E\u6700\u540E\u4E00\u4E2A\u5143\u7D20\uFF0C\u4EA4\u6362\u5B83\u4EEC\n  if (arr[l] > arr[r]) {\n    [arr[l], arr[r]] = [arr[r], arr[l]];\n  }\n\n  // \u5982\u679C\u5217\u8868\u5143\u7D20\u8D85\u8FC72\u4E2A\n  if (r - l + 1 > 2) {\n    const t = Math.floor((r - l + 1) / 3);\n\n    // \u9012\u5F52\u6392\u5E8F\u524D2/3\n    stoogeSort(arr, l, r - t);\n    // \u9012\u5F52\u6392\u5E8F\u540E2/3\n    stoogeSort(arr, l + t, r);\n    // \u518D\u6B21\u9012\u5F52\u6392\u5E8F\u524D2/3\n    stoogeSort(arr, l, r - t);\n  }\n\n  return arr;\n}"
    }
];
// 响应式状态
var activeAlgorithm = ref(0);
var visualizationArray = ref([]);
var autoVisualization = ref(false);
var visualizationStep = ref(0);
var visualizationInterval = ref(null);
// 当前算法
var currentAlgorithm = computed(function () {
    return algorithms[activeAlgorithm.value];
});
// 生成随机数组用于可视化
var generateVisualizationArray = function () {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 90) + 10);
    }
    visualizationArray.value = arr;
};
// 获取元素颜色
var getElementColor = function (index) {
    var colors = ['#4e79c7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ac'];
    return colors[index % colors.length];
};
// 重置可视化
var resetVisualization = function () {
    visualizationStep.value = 0;
    generateVisualizationArray();
};
// 单步执行可视化
var stepVisualization = function () {
    var _a;
    if (visualizationStep.value >= 20) {
        resetVisualization();
        return;
    }
    // 模拟排序过程
    var arr = __spreadArray([], visualizationArray.value, true);
    var n = arr.length;
    var step = visualizationStep.value % 5;
    // 模拟排序步骤（非实际算法）
    for (var i = 0; i < n - 1 - step; i++) {
        if (i % (step + 1) === 0 && arr[i] > arr[i + 1]) {
            _a = [arr[i + 1], arr[i]], arr[i] = _a[0], arr[i + 1] = _a[1];
        }
    }
    visualizationArray.value = arr;
    visualizationStep.value++;
};
// 监听自动执行状态
watch(autoVisualization, function (newVal) {
    if (newVal) {
        visualizationInterval.value = setInterval(function () {
            stepVisualization();
        }, 800);
    }
    else {
        clearInterval(visualizationInterval.value);
    }
});
// 生命周期钩子
onMounted(function () {
    generateVisualizationArray();
});
onUnmounted(function () {
    clearInterval(visualizationInterval.value);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-area']} */ ;
/** @type {__VLS_StyleScopedClasses['array-element']} */ ;
/** @type {__VLS_StyleScopedClasses['element-value']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "uncommon-sorts-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-nav" }));
var _loop_1 = function (algorithm, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = index;
        } }, { key: (index) }), { class: ({ active: __VLS_ctx.activeAlgorithm === index }) }));
    (algorithm.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var _b = _a[_i], algorithm = _b[0], index = _b[1];
    _loop_1(algorithm, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.currentAlgorithm.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge time" }));
(__VLS_ctx.currentAlgorithm.complexity.time);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge space" }));
(__VLS_ctx.currentAlgorithm.complexity.space);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge stability" }));
(__VLS_ctx.currentAlgorithm.complexity.stable ? '稳定' : '不稳定');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-body" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.currentAlgorithm.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-sample" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.currentAlgorithm.code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "features-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card advantage" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.currentAlgorithm.advantages)); _c < _d.length; _c++) {
    var _e = _d[_c], advantage = _e[0], idx = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: ('a' + idx),
    });
    (advantage);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card disadvantage" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.currentAlgorithm.disadvantages)); _f < _g.length; _f++) {
    var _h = _g[_f], disadvantage = _h[0], idx = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: ('d' + idx),
    });
    (disadvantage);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card application" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.currentAlgorithm.applications);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization-area" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.visualizationArray)); _j < _k.length; _j++) {
    var _l = _k[_j], value = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "array-element" }), { style: ({
            height: "".concat(value * 3, "px"),
            backgroundColor: __VLS_ctx.getElementColor(index)
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "element-value" }));
    (value);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetVisualization) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.stepVisualization) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.autoVisualization = !__VLS_ctx.autoVisualization;
    } }));
(__VLS_ctx.autoVisualization ? '暂停' : '自动执行');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _m < _o.length; _m++) {
    var _p = _o[_m], algorithm = _p[0], index = _p[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algorithm.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algorithm.complexity.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algorithm.complexity.worstTime || algorithm.complexity.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algorithm.complexity.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: ({ stable: algorithm.complexity.stable, unstable: !algorithm.complexity.stable }) }));
    (algorithm.complexity.stable ? '稳定' : '不稳定');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algorithm.applicationsShort);
}
/** @type {__VLS_StyleScopedClasses['uncommon-sorts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['space']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['stability']} */ ;
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-description']} */ ;
/** @type {__VLS_StyleScopedClasses['code-sample']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-features']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['advantage']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['disadvantage']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['application']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-area']} */ ;
/** @type {__VLS_StyleScopedClasses['array-element']} */ ;
/** @type {__VLS_StyleScopedClasses['element-value']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            algorithms: algorithms,
            activeAlgorithm: activeAlgorithm,
            visualizationArray: visualizationArray,
            autoVisualization: autoVisualization,
            currentAlgorithm: currentAlgorithm,
            getElementColor: getElementColor,
            resetVisualization: resetVisualization,
            stepVisualization: stepVisualization,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
