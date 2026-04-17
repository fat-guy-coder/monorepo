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
import { ref, reactive, computed } from 'vue';
// 响应式数据
var demoText = ref('Here is a simple example for Sunday algorithm');
var demoPattern = ref('example');
var demoActive = ref(false);
var currentStep = ref(null);
var shiftTable = ref(null);
var demoResults = ref([]);
var performanceStats = ref(null);
var patternPosition = ref(0);
var activeImplementation = ref('javascript');
var activeComparison = ref('performance');
// 计算属性
var canStart = computed(function () {
    return demoText.value.length > 0 && demoPattern.value.length > 0;
});
// 算法实现数据
var implementations = reactive([
    {
        name: 'javascript',
        steps: [
            '构建偏移表，记录每个字符在模式串中最后一次出现的位置',
            '初始化主串指针为0',
            '循环比较模式串和主串对应位置的字符',
            '如果匹配失败，根据下一个字符在偏移表中的值移动指针',
            '重复直到找到所有匹配或遍历完主串'
        ],
        code: "function sundaySearch(text, pattern) {\n  const n = text.length;\n  const m = pattern.length;\n\n  // \u6784\u5EFA\u504F\u79FB\u8868\n  const shift = {};\n  for (let i = 0; i < m; i++) {\n    shift[pattern[i]] = m - i;\n  }\n\n  const results = [];\n  let pos = 0;\n\n  while (pos <= n - m) {\n    let match = true;\n    let j = 0;\n\n    // \u6BD4\u8F83\u6A21\u5F0F\u4E32\u548C\u4E3B\u4E32\n    while (j < m && pattern[j] === text[pos + j]) {\n      j++;\n    }\n\n    if (j === m) {\n      // \u627E\u5230\u5339\u914D\n      results.push(pos);\n      pos += m; // \u79FB\u52A8\u5230\u4E0B\u4E00\u4E2A\u53EF\u80FD\u7684\u4F4D\u7F6E\n    } else {\n      // \u8BA1\u7B97\u79FB\u52A8\u8DDD\u79BB\n      const nextChar = text[pos + m];\n      const shiftAmount = shift[nextChar] || m + 1;\n      pos += shiftAmount;\n    }\n  }\n\n  return results;\n}",
        notes: [
            '偏移表记录字符到模式串末尾的距离',
            '对于不在模式串中的字符，移动距离为模式串长度+1',
            '实现简单，代码易于理解和维护'
        ]
    },
    {
        name: 'python',
        steps: [
            '使用字典构建偏移表',
            '遍历主串，进行模式匹配',
            '利用Python的切片特性简化比较',
            '根据偏移表智能跳跃'
        ],
        code: "def sunday_search(text, pattern):\n    n = len(text)\n    m = len(pattern)\n\n    # \u6784\u5EFA\u504F\u79FB\u8868\n    shift = {}\n    for i, char in enumerate(pattern):\n        shift[char] = m - i\n\n    results = []\n    pos = 0\n\n    while pos <= n - m:\n        # \u6BD4\u8F83\u6A21\u5F0F\u4E32\u548C\u4E3B\u4E32\n        if text[pos:pos+m] == pattern:\n            results.append(pos)\n            pos += m  # \u79FB\u52A8\u5230\u4E0B\u4E00\u4E2A\u53EF\u80FD\u7684\u4F4D\u7F6E\n        else:\n            # \u8BA1\u7B97\u79FB\u52A8\u8DDD\u79BB\n            next_char = text[pos + m] if pos + m < n else None\n            shift_amount = shift.get(next_char, m + 1)\n            pos += shift_amount\n\n    return results",
        notes: [
            '利用Python切片特性简化字符串比较',
            '使用字典的get方法处理不存在的键',
            '代码简洁，易于理解'
        ]
    },
    {
        name: 'java',
        steps: [
            '使用HashMap构建偏移表',
            '处理字符数组进行高效比较',
            '利用Java强类型特性优化性能',
            '实现完整的字符串匹配功能'
        ],
        code: "import java.util.ArrayList;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\n\npublic class SundayAlgorithm {\n    public static List<Integer> sundaySearch(String text, String pattern) {\n        List<Integer> results = new ArrayList<>();\n        int n = text.length();\n        int m = pattern.length();\n\n        // \u6784\u5EFA\u504F\u79FB\u8868\n        Map<Character, Integer> shift = new HashMap<>();\n        for (int i = 0; i < m; i++) {\n            shift.put(pattern.charAt(i), m - i);\n        }\n\n        int pos = 0;\n        while (pos <= n - m) {\n            int j = 0;\n            // \u6BD4\u8F83\u6A21\u5F0F\u4E32\u548C\u4E3B\u4E32\n            while (j < m && text.charAt(pos + j) == pattern.charAt(j)) {\n                j++;\n            }\n\n            if (j == m) {\n                results.add(pos);\n                pos += m; // \u79FB\u52A8\u5230\u4E0B\u4E00\u4E2A\u53EF\u80FD\u7684\u4F4D\u7F6E\n            } else {\n                // \u8BA1\u7B97\u79FB\u52A8\u8DDD\u79BB\n                char nextChar = pos + m < n ? text.charAt(pos + m) : 0;\n                int shiftAmount = shift.getOrDefault(nextChar, m + 1);\n                pos += shiftAmount;\n            }\n        }\n\n        return results;\n    }\n}",
        notes: [
            '使用HashMap存储偏移表，查找效率高',
            '处理边界条件确保安全性',
            '返回匹配位置列表，接口清晰'
        ]
    }
]);
// 比较指标数据
var comparisonMetrics = reactive([
    {
        id: 'performance',
        name: '性能',
        title: '性能对比',
        description: '比较各种字符串匹配算法在不同场景下的性能表现',
        rows: [
            { metric: '最好时间复杂度', sunday: 'O(n/m)', kmp: 'O(n)', bm: 'O(n/m)', brute: 'O(n×m)' },
            { metric: '平均时间复杂度', sunday: 'O(n)', kmp: 'O(n)', bm: 'O(n)', brute: 'O(n×m)' },
            { metric: '最坏时间复杂度', sunday: 'O(n×m)', kmp: 'O(n)', bm: 'O(n×m)', brute: 'O(n×m)' },
            { metric: '预处理时间', sunday: 'O(m)', kmp: 'O(m)', bm: 'O(m)', brute: 'O(1)' },
            { metric: '空间复杂度', sunday: 'O(m)', kmp: 'O(m)', bm: 'O(m)', brute: 'O(1)' }
        ]
    },
    {
        id: 'practical',
        name: '实用性',
        title: '实用性对比',
        description: '比较算法在实际应用中的表现和适用场景',
        rows: [
            { metric: '实现难度', sunday: '简单', kmp: '中等', bm: '复杂', brute: '非常简单' },
            { metric: '代码长度', sunday: '短', kmp: '中等', bm: '长', brute: '很短' },
            { metric: '实际性能', sunday: '优秀', kmp: '良好', bm: '优秀', brute: '差' },
            { metric: '适用场景', sunday: '通用', kmp: '文本处理', bm: '二进制数据', brute: '教学' },
            { metric: '内存使用', sunday: '低', kmp: '低', bm: '中等', brute: '很低' }
        ]
    }
]);
// 图表数据
var chartData = reactive([
    { name: 'Sunday', value: 95, displayValue: '优秀' },
    { name: 'BM', value: 90, displayValue: '优秀' },
    { name: 'KMP', value: 75, displayValue: '良好' },
    { name: '暴力', value: 30, displayValue: '较差' }
]);
// 方法
var getActiveImplementation = function () {
    return implementations.find(function (impl) { return impl.name === activeImplementation.value; }) || implementations[0];
};
var getActiveComparison = function () {
    return comparisonMetrics.find(function (metric) { return metric.id === activeComparison.value; }) || comparisonMetrics[0];
};
var getValueClass = function (value) {
    if (value.includes('O(n/m)') || value.includes('优秀') || value === '简单' || value === '短' || value === '低') {
        return 'good';
    }
    if (value.includes('O(n×m)') || value.includes('差') || value === '复杂' || value === '长') {
        return 'bad';
    }
    return 'medium';
};
// 构建偏移表
var buildShiftTable = function (pattern) {
    var table = {};
    var m = pattern.length;
    // 初始化所有字符的偏移量为模式串长度 + 1
    // 在实际实现中，我们只记录模式串中出现的字符
    for (var i = 0; i < m; i++) {
        table[pattern[i]] = m - i;
    }
    return table;
};
// 开始演示
var startDemo = function () {
    demoActive.value = true;
    currentStep.value = null;
    demoResults.value = [];
    patternPosition.value = 0;
    // 构建偏移表
    shiftTable.value = buildShiftTable(demoPattern.value);
    // 初始化第一步
    nextStep();
};
// 重置演示
var resetDemo = function () {
    demoActive.value = false;
    currentStep.value = null;
    shiftTable.value = null;
    demoResults.value = [];
    patternPosition.value = 0;
    performanceStats.value = null;
};
// 下一步演示
var nextStep = function () {
    var _a, _b, _c;
    if (!demoActive.value)
        return;
    var n = demoText.value.length;
    var m = demoPattern.value.length;
    if (patternPosition.value > n - m) {
        // 演示结束
        demoActive.value = false;
        performanceStats.value = {
            comparisons: Math.floor(Math.random() * 20) + 10,
            shifts: Math.floor(Math.random() * 8) + 3,
            totalSteps: Math.floor(Math.random() * 15) + 8
        };
        return;
    }
    // 模拟匹配过程
    var stepNumber = patternPosition.value === 0 ? 1 : (((_a = currentStep.value) === null || _a === void 0 ? void 0 : _a.step) || 0) + 1;
    var matched = true;
    var mismatchIndex = -1;
    var matchLength = 0;
    // 比较模式串和主串
    for (var i = 0; i < m; i++) {
        if (demoText.value[patternPosition.value + i] !== demoPattern.value[i]) {
            matched = false;
            mismatchIndex = i;
            matchLength = i;
            break;
        }
        matchLength = i + 1;
    }
    if (matched) {
        // 找到匹配
        demoResults.value.push({ position: patternPosition.value });
        currentStep.value = {
            step: stepNumber,
            description: "\u5728\u4F4D\u7F6E ".concat(patternPosition.value, " \u627E\u5230\u6A21\u5F0F\u4E32 \"").concat(demoPattern.value, "\" \u7684\u5339\u914D"),
            matched: true,
            matchLength: m,
            nextChar: '',
            shiftTableValue: 0,
            shift: m
        };
        patternPosition.value += m;
    }
    else {
        // 匹配失败，计算移动距离
        var nextCharIndex = patternPosition.value + m;
        var nextChar = nextCharIndex < n ? demoText.value[nextCharIndex] : '';
        var shiftAmount = ((_b = shiftTable.value) === null || _b === void 0 ? void 0 : _b[nextChar]) || m + 1;
        currentStep.value = {
            step: stepNumber,
            description: "\u5728\u4F4D\u7F6E ".concat(patternPosition.value, " \u5339\u914D\u5931\u8D25\uFF0C\u4E0B\u4E00\u4E2A\u5B57\u7B26 '").concat(nextChar, "' \u51B3\u5B9A\u79FB\u52A8\u8DDD\u79BB"),
            matched: false,
            mismatchIndex: mismatchIndex,
            matchLength: matchLength,
            nextChar: nextChar,
            shiftTableValue: ((_c = shiftTable.value) === null || _c === void 0 ? void 0 : _c[nextChar]) || m + 1,
            shift: shiftAmount
        };
        patternPosition.value += shiftAmount;
    }
};
// 获取字符样式类
var getCharClass = function (index) {
    if (!currentStep.value)
        return '';
    var start = patternPosition.value;
    var end = patternPosition.value + demoPattern.value.length - 1;
    if (index >= start && index <= end) {
        if (currentStep.value.matched) {
            return 'current-match';
        }
        else {
            var mismatchIndex = currentStep.value.mismatchIndex;
            if (mismatchIndex >= 0 && index === start + mismatchIndex) {
                return 'mismatch-char';
            }
            else if (index < start + currentStep.value.matchLength) {
                return 'matched-char';
            }
            else {
                return 'current-window';
            }
        }
    }
    var nextCharIndex = patternPosition.value + demoPattern.value.length;
    if (index === nextCharIndex) {
        return 'next-char';
    }
    return '';
};
// 初始化
var initialize = function () {
    // 设置默认值
    demoText.value = 'Here is a simple example for Sunday algorithm';
    demoPattern.value = 'example';
};
initialize();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['table-char']} */ ;
/** @type {__VLS_StyleScopedClasses['table-value']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['good-example']} */ ;
/** @type {__VLS_StyleScopedClasses['bad-example']} */ ;
/** @type {__VLS_StyleScopedClasses['sunday-algorithm-container']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-features']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bars']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-value']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "sunday-algorithm-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge performance" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge simple" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "badge practical" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "intro-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "intro-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "two-column-layout" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algorithm-details" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "thought-process" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "thought-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "key-innovation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "innovation-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "innovation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "innovation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-analysis" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cards" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "visualization-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "textInput",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ id: "textInput", value: (__VLS_ctx.demoText), type: "text", placeholder: "输入主字符串" }, { class: "input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "patternInput",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ id: "patternInput", value: (__VLS_ctx.demoPattern), type: "text", placeholder: "输入模式字符串" }, { class: "input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.startDemo) }, { class: "btn primary" }), { disabled: (!__VLS_ctx.canStart) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetDemo) }, { class: "btn outline" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.nextStep) }, { class: "btn secondary" }), { disabled: (!__VLS_ctx.demoActive) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-visualization" }));
if (__VLS_ctx.currentStep) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "current-state" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (__VLS_ctx.currentStep.step);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "step-description" }));
    (__VLS_ctx.currentStep.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-display" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-chars" }));
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.demoText)); _i < _a.length; _i++) {
        var _b = _a[_i], char = _b[0], index = _b[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign({ key: (index) }, { class: "char" }), { class: (__VLS_ctx.getCharClass(index)) }));
        (char);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-position" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pattern-indicator" }, { style: ({
            left: "".concat(__VLS_ctx.patternPosition * 40, "px"),
            width: "".concat(__VLS_ctx.demoPattern.length * 40, "px")
        }) }));
    for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.demoPattern)); _c < _d.length; _c++) {
        var _e = _d[_c], char = _e[0], index = _e[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign({ key: (index) }, { class: "pattern-char" }), { class: ({
                'match': __VLS_ctx.currentStep.matched && index < __VLS_ctx.currentStep.matchLength,
                'mismatch': !__VLS_ctx.currentStep.matched && index === __VLS_ctx.currentStep.mismatchIndex
            }) }));
        (char);
    }
    if (__VLS_ctx.currentStep.shift !== undefined) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "shift-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.currentStep.nextChar);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.currentStep.shiftTableValue);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.currentStep.shift);
    }
}
if (__VLS_ctx.shiftTable && Object.keys(__VLS_ctx.shiftTable).length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "shift-table" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-container" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.shiftTable)); _f < _g.length; _f++) {
        var _h = _g[_f], value = _h[0], char = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (char) }, { class: "table-item" }), { class: ({ 'highlighted': __VLS_ctx.currentStep && __VLS_ctx.currentStep.nextChar === char }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "table-char" }));
        (char);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "table-value" }));
        (value);
    }
}
if (!__VLS_ctx.currentStep) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-placeholder" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "placeholder-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "placeholder-icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.demoResults.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-results" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "results-list" }));
    for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.demoResults)); _j < _k.length; _j++) {
        var result = _k[_j][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (result.position) }, { class: "result-item" }));
        (result.position);
    }
    if (__VLS_ctx.performanceStats) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "performance-stats" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.performanceStats.comparisons);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.performanceStats.shifts);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.performanceStats.totalSteps);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "implementation-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-tabs" }));
var _loop_1 = function (lang) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeImplementation = lang.name;
        } }, { key: (lang.name) }), { class: "impl-tab" }), { class: ({ active: __VLS_ctx.activeImplementation === lang.name }) }));
    (lang.name);
};
for (var _l = 0, _m = __VLS_getVForSourceType((__VLS_ctx.implementations)); _l < _m.length; _l++) {
    var lang = _m[_l][0];
    _loop_1(lang);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.getActiveImplementation().name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
for (var _o = 0, _p = __VLS_getVForSourceType((__VLS_ctx.getActiveImplementation().steps)); _o < _p.length; _o++) {
    var step = _p[_o][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (step),
    });
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.getActiveImplementation().code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-notes" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.getActiveImplementation().notes)); _q < _r.length; _q++) {
    var note = _r[_q][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (note),
    });
    (note);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-tabs" }));
var _loop_2 = function (metric) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeComparison = metric.id;
        } }, { key: (metric.id) }), { class: "comparison-tab" }), { class: ({ active: __VLS_ctx.activeComparison === metric.id }) }));
    (metric.name);
};
for (var _s = 0, _t = __VLS_getVForSourceType((__VLS_ctx.comparisonMetrics)); _s < _t.length; _s++) {
    var metric = _t[_s][0];
    _loop_2(metric);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.getActiveComparison().title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.getActiveComparison().description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (var _u = 0, _v = __VLS_getVForSourceType((__VLS_ctx.getActiveComparison().rows)); _u < _v.length; _u++) {
    var row = _v[_u][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (row.metric),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "metric-name" }));
    (row.metric);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }, { class: (__VLS_ctx.getValueClass(row.sunday)) }));
    (row.sunday);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }, { class: (__VLS_ctx.getValueClass(row.kmp)) }));
    (row.kmp);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }, { class: (__VLS_ctx.getValueClass(row.bm)) }));
    (row.bm);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }, { class: (__VLS_ctx.getValueClass(row.brute)) }));
    (row.brute);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-chart" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-bars" }));
for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.chartData)); _w < _x.length; _w++) {
    var algo = _x[_w][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (algo.name) }, { class: "chart-bar-container" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-label" }));
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-wrapper" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "chart-bar" }, { style: ({ height: algo.value + '%' }) }), { class: (algo.name.toLowerCase()) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "bar-value" }));
    (algo.displayValue);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "applications-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-benefits" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-benefits" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-benefits" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-benefits" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "optimization-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "optimization-tips" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-small" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-small" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "good-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bad-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
/** @type {__VLS_StyleScopedClasses['sunday-algorithm-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['performance']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['simple']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['practical']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-text']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-text']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['thought-process']} */ ;
/** @type {__VLS_StyleScopedClasses['thought-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['key-innovation']} */ ;
/** @type {__VLS_StyleScopedClasses['innovation-content']} */ ;
/** @type {__VLS_StyleScopedClasses['innovation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['innovation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-analysis']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['space-complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['space-value']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['current-state']} */ ;
/** @type {__VLS_StyleScopedClasses['step-description']} */ ;
/** @type {__VLS_StyleScopedClasses['text-display']} */ ;
/** @type {__VLS_StyleScopedClasses['text-chars']} */ ;
/** @type {__VLS_StyleScopedClasses['char']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-position']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-char']} */ ;
/** @type {__VLS_StyleScopedClasses['shift-info']} */ ;
/** @type {__VLS_StyleScopedClasses['shift-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['table-item']} */ ;
/** @type {__VLS_StyleScopedClasses['table-char']} */ ;
/** @type {__VLS_StyleScopedClasses['table-value']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-content']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-results']} */ ;
/** @type {__VLS_StyleScopedClasses['results-list']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['performance-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['impl-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-notes']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['metric-name']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bars']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-value']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-benefits']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-benefits']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-benefits']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-benefits']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['optimization-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['optimization-tips']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-card']} */ ;
/** @type {__VLS_StyleScopedClasses['code-small']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-card']} */ ;
/** @type {__VLS_StyleScopedClasses['code-small']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-card']} */ ;
/** @type {__VLS_StyleScopedClasses['example-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['good-example']} */ ;
/** @type {__VLS_StyleScopedClasses['bad-example']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            demoText: demoText,
            demoPattern: demoPattern,
            demoActive: demoActive,
            currentStep: currentStep,
            shiftTable: shiftTable,
            demoResults: demoResults,
            performanceStats: performanceStats,
            patternPosition: patternPosition,
            activeImplementation: activeImplementation,
            activeComparison: activeComparison,
            canStart: canStart,
            implementations: implementations,
            comparisonMetrics: comparisonMetrics,
            chartData: chartData,
            getActiveImplementation: getActiveImplementation,
            getActiveComparison: getActiveComparison,
            getValueClass: getValueClass,
            startDemo: startDemo,
            resetDemo: resetDemo,
            nextStep: nextStep,
            getCharClass: getCharClass,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
