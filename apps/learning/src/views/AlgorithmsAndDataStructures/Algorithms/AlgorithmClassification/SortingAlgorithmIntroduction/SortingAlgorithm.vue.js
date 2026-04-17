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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { ref, onBeforeMount } from 'vue';
import { Button } from 'components';
import SortAlgorithBarCharts from 'components/Charts/SortAlgorithBarCharts.vue';
// import Pie from 'components/Charts/pie.vue'
var log = ref([]);
var currentSortBy = ref('sortTime');
var sortBy = function (type) {
    currentSortBy.value = type;
};
// 排序算法数据
var algorithms = ref([]);
onBeforeMount(function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, import('../../JSON/SortingAlgorithm.json')];
            case 1:
                data = _a.sent();
                algorithms.value = data.default;
                algorithms.value[algorithms.value.length - 2].code = "function timSort(arr) {\n    const MIN_MERGE = 32;\n\n    // \u8BA1\u7B97\u6700\u5C0Frun\u957F\u5EA6\n    function calcMinRun(n) {\n        let r = 0;\n        while (n >= MIN_MERGE) {\n            r |= n & 1;\n            n >>= 1;\n        }\n        return n + r;\n    }\n\n    // \u63D2\u5165\u6392\u5E8F\uFF08\u7528\u4E8E\u5C0F\u6570\u7EC4\u6216run\uFF09\n    function insertionSort(arr, left, right) {\n        for (let i = left + 1; i <= right; i++) {\n            const key = arr[i];\n            let j = i - 1;\n            while (j >= left && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n\n    // \u5408\u5E76\u4E24\u4E2A\u76F8\u90BB\u7684run\n    function merge(arr, left, mid, right) {\n        const len1 = mid - left + 1;\n        const len2 = right - mid;\n        const leftArr = new Array(len1);\n        const rightArr = new Array(len2);\n\n        for (let i = 0; i < len1; i++) {\n            leftArr[i] = arr[left + i];\n        }\n        for (let i = 0; i < len2; i++) {\n            rightArr[i] = arr[mid + 1 + i];\n        }\n\n        let i = 0, j = 0, k = left;\n        while (i < len1 && j < len2) {\n            if (leftArr[i] <= rightArr[j]) {\n                arr[k] = leftArr[i];\n                i++;\n            } else {\n                arr[k] = rightArr[j];\n                j++;\n            }\n            k++;\n        }\n\n        while (i < len1) {\n            arr[k] = leftArr[i];\n            i++;\n            k++;\n        }\n\n        while (j < len2) {\n            arr[k] = rightArr[j];\n            j++;\n            k++;\n        }\n    }\n\n    // \u4E3B\u6392\u5E8F\u51FD\u6570\n    const n = arr.length;\n    if (n < 2) return arr;\n\n    const minRun = calcMinRun(n);\n    const runs = [];\n\n    // \u5206\u5272\u6570\u7EC4\u4E3A\u591A\u4E2Arun\u5E76\u6392\u5E8F\n    for (let i = 0; i < n; i += minRun) {\n        const end = Math.min(i + minRun - 1, n - 1);\n        insertionSort(arr, i, end);\n        runs.push({ start: i, length: end - i + 1 });\n    }\n\n    // \u5408\u5E76\u6240\u6709run\n    while (runs.length > 1) {\n        const run1 = runs.pop();\n        const run2 = runs.pop();\n        const start1 = run1.start;\n        const start2 = run2.start;\n        const len1 = run1.length;\n        const len2 = run2.length;\n        const end1 = start1 + len1 - 1;\n        const end2 = start2 + len2 - 1;\n\n        // \u786E\u4FDDrun1\u5728run2\u4E4B\u524D\n        if (end1 + 1 !== start2) {\n            runs.push(run2);\n            runs.push(run1);\n            continue;\n        }\n\n        merge(arr, start1, end1, end2);\n        runs.push({ start: start1, length: len1 + len2 });\n    }\n\n    return arr;\n}\n\n// \u793A\u4F8B\u7528\u6CD5\nconst array = [5, 2, 9, 1, 5, 6, 3, 8, 7, 4];\nconsole.log(\"\u6392\u5E8F\u524D:\", array);\ntimSort(array);\nconsole.log(\"\u6392\u5E8F\u540E:\", array);";
                return [2 /*return*/];
        }
    });
}); });
// 当前活动算法
var activeAlgorithm = ref({
    name: '冒泡排序',
    description: '重复遍历数组，比较相邻元素，如果顺序错误就交换它们。',
    complexity: {
        worst: 'O(n²)',
        average: 'O(n²)',
        best: 'O(n)',
        space: 'O(1)',
        stable: true,
    },
    steps: [
        '从数组的第一个元素开始',
        '比较当前元素和下一个元素',
        '如果当前元素大于下一个元素，交换它们',
        '对每一对相邻元素重复上述步骤',
        '重复整个过程，直到没有需要交换的元素',
    ],
    useCases: ['教学目的，理解排序基本原理', '小规模数据排序', '几乎已经排序好的数据'],
    code: 'function bubbleSort(arr: number[]): number[] {\n const n = arr.length;\n for (let i = 0; i < n - 1; i++) {\n let swapped = false;\n for (let j = 0; j < n - i - 1; j++) {\n if (arr[j] > arr[j + 1]) {\n [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n swapped = true;\n }\n }\n if (!swapped) break;\n }\n return arr;\n}',
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['array-element']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "sorting-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "intro" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "intro-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs" }));
var _loop_1 = function (algorithm, index) {
    var __VLS_0 = {}.Button;
    /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ 'onClick': {} }, { key: (index), type: "primary" }), { class: ({ active: __VLS_ctx.activeAlgorithm.name === algorithm.name }) })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { key: (index), type: "primary" }), { class: ({ active: __VLS_ctx.activeAlgorithm.name === algorithm.name }) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_4 = void 0;
    var __VLS_5 = void 0;
    var __VLS_6 = void 0;
    var __VLS_7 = {
        onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = algorithm;
        }
    };
    __VLS_3.slots.default;
    (algorithm.name);
};
var __VLS_3;
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var _b = _a[_i], algorithm = _b[0], index = _b[1];
    _loop_1(algorithm, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-details" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.activeAlgorithm.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "algorithm-description" }));
(__VLS_ctx.activeAlgorithm.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-analysis" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-values" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.activeAlgorithm.complexity.worst);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.activeAlgorithm.complexity.average);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.activeAlgorithm.complexity.best);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-value" }));
(__VLS_ctx.activeAlgorithm.complexity.space);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-value" }));
(__VLS_ctx.activeAlgorithm.complexity.stable ? '稳定' : '不稳定');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "implementation-steps" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithm.steps)); _c < _d.length; _c++) {
    var _e = _d[_c], step = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-cases" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithm.useCases)); _f < _g.length; _f++) {
    var _h = _g[_f], useCase = _h[0], index = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (useCase);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-code" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.activeAlgorithm.code);
/** @type {[typeof SortAlgorithBarCharts, ]} */ ;
// @ts-ignore
var __VLS_8 = __VLS_asFunctionalComponent(SortAlgorithBarCharts, new SortAlgorithBarCharts({
    selectedAlgorithm: (__VLS_ctx.activeAlgorithm.name),
    log: (__VLS_ctx.log),
}));
var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{
        selectedAlgorithm: (__VLS_ctx.activeAlgorithm.name),
        log: (__VLS_ctx.log),
    }], __VLS_functionalComponentArgsRest(__VLS_8), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "sorting-comparison-table" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
/** @type {__VLS_StyleScopedClasses['sorting-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-card']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-info']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-description']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-analysis']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-type']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-values']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-type']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-type']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-code']} */ ;
/** @type {__VLS_StyleScopedClasses['sorting-comparison-table']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            Button: Button,
            SortAlgorithBarCharts: SortAlgorithBarCharts,
            log: log,
            algorithms: algorithms,
            activeAlgorithm: activeAlgorithm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
