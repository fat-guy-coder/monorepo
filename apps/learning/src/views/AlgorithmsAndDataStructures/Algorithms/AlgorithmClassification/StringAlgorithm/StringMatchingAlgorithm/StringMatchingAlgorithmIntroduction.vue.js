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
var activeAlgorithm = ref(0);
var algorithms = [
    {
        id: 'bf',
        name: '暴力匹配 (Brute-Force)',
        icon: '👊',
        year: '1960s',
        formWho: 'none',
        description: '最简单直观的字符串匹配算法，通过逐个比较字符来查找模式串在文本中的位置。',
        idea: '从文本的第一个字符开始，逐个比较文本和模式串的字符。如果匹配失败，则将模式串向右移动一位，重新开始比较。',
        steps: [
            '从文本的第一个字符开始',
            '将模式串与文本当前位置对齐',
            '逐个比较模式串和文本对应位置的字符',
            '如果所有字符匹配，则匹配成功',
            '如果出现不匹配，则将模式串向右移动一位',
            '重复上述过程直到找到匹配或遍历完整个文本'
        ],
        implementation: "function bruteForce(text: string, pattern: string): number {\n  const n = text.length;\n  const m = pattern.length;\n\n  for (let i = 0; i <= n - m; i++) {\n    let j;\n    for (j = 0; j < m; j++) {\n      if (text[i + j] !== pattern[j]) {\n        break;\n      }\n    }\n    if (j === m) {\n      return i; // \u5339\u914D\u6210\u529F\n    }\n  }\n  return -1; // \u672A\u627E\u5230\u5339\u914D\n}",
        complexity: {
            time: 'O(mn)',
            space: 'O(1)',
            worst: 'O(mn)',
            average: 'O(mn)',
            chart: 100
        },
        comparison: [
            { title: '优点', content: '实现简单，不需要预处理' },
            { title: '缺点', content: '效率低，特别是当模式串较长且文本较大时' },
            { title: '适用场景', content: '短模式串或小规模文本匹配' }
        ]
    },
    {
        id: 'rk',
        name: 'Rabin-Karp 算法',
        icon: '🔢',
        year: '1987',
        formWho: 'Michael O. Rabin和Richard M. Karp',
        description: '基于哈希函数的字符串匹配算法，通过比较哈希值来减少不必要的字符比较。',
        idea: '利用哈希函数计算模式串的哈希值和文本中每个可能子串的哈希值。如果哈希值匹配，则进一步验证字符是否完全匹配。',
        steps: [
            '计算模式串的哈希值',
            '计算文本中第一个与模式串等长子串的哈希值',
            '逐个比较哈希值',
            '如果哈希值匹配，则进行字符级验证',
            '使用滚动哈希更新下一个子串的哈希值',
            '重复直到找到匹配或遍历完整个文本'
        ],
        implementation: "function rabinKarp(text: string, pattern: string): number {\n  const n = text.length;\n  const m = pattern.length;\n  const base = 256; // \u5B57\u7B26\u96C6\u5927\u5C0F\n  const prime = 101; // \u5927\u8D28\u6570\n\n  // \u8BA1\u7B97\u54C8\u5E0C\u503C\n  let patternHash = 0;\n  let textHash = 0;\n  let h = 1;\n\n  for (let i = 0; i < m - 1; i++) {\n    h = (h * base) % prime;\n  }\n\n  for (let i = 0; i < m; i++) {\n    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;\n    textHash = (base * textHash + text.charCodeAt(i)) % prime;\n  }\n\n  for (let i = 0; i <= n - m; i++) {\n    if (patternHash === textHash) {\n      // \u9A8C\u8BC1\u5B57\u7B26\u7EA7\u5339\u914D\n      let match = true;\n      for (let j = 0; j < m; j++) {\n        if (text[i + j] !== pattern[j]) {\n          match = false;\n          break;\n        }\n      }\n      if (match) return i;\n    }\n\n    // \u66F4\u65B0\u6EDA\u52A8\u54C8\u5E0C\n    if (i < n - m) {\n      textHash = (base * (textHash - text.charCodeAt(i) * h) +\n                 text.charCodeAt(i + m)) % prime;\n      if (textHash < 0) textHash += prime;\n    }\n  }\n  return -1;\n}",
        complexity: {
            time: 'O(m+n)',
            space: 'O(1)',
            worst: 'O(mn)',
            average: 'O(m+n)',
            chart: 70
        },
        comparison: [
            { title: '优点', content: '平均效率高，适用于多模式匹配' },
            { title: '缺点', content: '哈希冲突可能导致性能下降' },
            { title: '适用场景', content: '多模式匹配、大文本搜索' }
        ]
    },
    {
        id: 'kmp',
        name: 'KMP 算法',
        icon: '🔍',
        year: '1977',
        formWho: 'D.E.Knuth, J.H.Morris, V.R.Pratt',
        description: '高效的字符串匹配算法，利用部分匹配表避免不必要的比较。',
        idea: '当匹配失败时，利用已匹配部分的信息，避免文本指针回溯，通过部分匹配表确定模式串下一次比较的位置。',
        steps: [
            '预处理模式串，构建部分匹配表（next数组）',
            '初始化文本指针和模式指针',
            '逐个比较字符',
            '当字符匹配时，两个指针都前进',
            '当字符不匹配时，根据next数组调整模式指针位置',
            '重复直到找到匹配或遍历完整个文本'
        ],
        implementation: "function kmpSearch(text: string, pattern: string): number {\n  const n = text.length;\n  const m = pattern.length;\n  const next = buildNext(pattern);\n\n  let i = 0; // \u6587\u672C\u6307\u9488\n  let j = 0; // \u6A21\u5F0F\u6307\u9488\n\n  while (i < n) {\n    if (text[i] === pattern[j]) {\n      i++;\n      j++;\n      if (j === m) return i - j; // \u5339\u914D\u6210\u529F\n    } else if (j > 0) {\n      j = next[j - 1]; // \u6839\u636Enext\u6570\u7EC4\u8DF3\u8F6C\n    } else {\n      i++;\n    }\n  }\n  return -1;\n}\n\nfunction buildNext(pattern: string): number[] {\n  const m = pattern.length;\n  const next = new Array(m).fill(0);\n  let len = 0;\n  let i = 1;\n\n  while (i < m) {\n    if (pattern[i] === pattern[len]) {\n      len++;\n      next[i] = len;\n      i++;\n    } else {\n      if (len > 0) {\n        len = next[len - 1];\n      } else {\n        next[i] = 0;\n        i++;\n      }\n    }\n  }\n  return next;\n}",
        complexity: {
            time: 'O(m+n)',
            space: 'O(m)',
            worst: 'O(m+n)',
            average: 'O(m+n)',
            chart: 40
        },
        comparison: [
            { title: '优点', content: '保证线性时间复杂度，无回溯' },
            { title: '缺点', content: '需要额外的空间存储next数组' },
            { title: '适用场景', content: '长模式串、重复性高的文本' }
        ]
    },
    {
        id: 'bm',
        name: 'Boyer-Moore 算法',
        icon: '🚀',
        year: '1977',
        formWho: 'Boyer and Moore',
        description: '高效的字符串匹配算法，从模式串尾部开始比较，利用坏字符和好后缀规则跳过大量字符。',
        idea: '从模式串的末尾开始比较字符，当发生不匹配时，使用坏字符规则和好后缀规则计算模式串的移动距离，从而跳过大量不必要的比较。',
        steps: [
            '预处理模式串，构建坏字符表和好后缀表',
            '将模式串与文本对齐，从右向左比较字符',
            '当字符匹配时，继续向左比较',
            '当字符不匹配时，计算移动距离（取坏字符规则和好后缀规则的最大值）',
            '移动模式串并重复比较过程',
            '重复直到找到匹配或模式串移出文本'
        ],
        implementation: "function boyerMoore(text: string, pattern: string): number {\n  const n = text.length;\n  const m = pattern.length;\n\n  // \u6784\u5EFA\u574F\u5B57\u7B26\u8868\n  const badChar = buildBadCharTable(pattern);\n\n  let s = 0; // \u6A21\u5F0F\u4E32\u76F8\u5BF9\u4E8E\u6587\u672C\u7684\u504F\u79FB\n\n  while (s <= n - m) {\n    let j = m - 1;\n\n    // \u4ECE\u53F3\u5411\u5DE6\u6BD4\u8F83\n    while (j >= 0 && pattern[j] === text[s + j]) {\n      j--;\n    }\n\n    if (j < 0) {\n      return s; // \u5339\u914D\u6210\u529F\n    } else {\n      // \u8BA1\u7B97\u574F\u5B57\u7B26\u89C4\u5219\u7684\u79FB\u52A8\u8DDD\u79BB\n      const badShift = j - (badChar[text.charCodeAt(s + j)] || -1);\n      s += Math.max(1, badShift);\n    }\n  }\n  return -1;\n}\n\nfunction buildBadCharTable(pattern: string): number[] {\n  const table = new Array(256).fill(-1);\n  for (let i = 0; i < pattern.length; i++) {\n    table[pattern.charCodeAt(i)] = i;\n  }\n  return table;\n}",
        complexity: {
            time: 'O(mn)',
            space: 'O(m)',
            worst: 'O(mn)',
            average: 'O(n/m)',
            chart: 30
        },
        comparison: [
            { title: '优点', content: '实际应用中非常高效，特别是长模式串' },
            { title: '缺点', content: '预处理较复杂，实现难度大' },
            { title: '适用场景', content: '文本编辑器、IDE搜索功能' }
        ]
    },
    {
        id: 'sunday',
        name: 'Sunday 算法',
        icon: '⏩',
        year: '1990',
        formWho: 'Daniel M. Sunday',
        description: '高效的字符串匹配算法，利用文本中模式串后一位字符的信息进行跳跃。',
        idea: '在匹配失败时，查看文本中模式串后一位的字符，根据该字符在模式串中的位置进行跳跃，从而跳过大量不必要的比较。',
        steps: [
            '预处理模式串，构建字符偏移表',
            '将模式串与文本对齐',
            '从前往后比较字符',
            '当字符不匹配时，查看文本中模式串后一位字符',
            '根据该字符在模式串中的位置计算偏移量',
            '移动模式串并重复比较过程'
        ],
        implementation: "function sundaySearch(text: string, pattern: string): number {\n  const n = text.length;\n  const m = pattern.length;\n\n  // \u6784\u5EFA\u504F\u79FB\u8868\n  const shift = buildShiftTable(pattern);\n\n  let i = 0; // \u6587\u672C\u6307\u9488\n\n  while (i <= n - m) {\n    let j;\n    for (j = 0; j < m; j++) {\n      if (text[i + j] !== pattern[j]) break;\n    }\n\n    if (j === m) return i; // \u5339\u914D\u6210\u529F\n\n    // \u68C0\u67E5\u6587\u672C\u4E2D\u6A21\u5F0F\u4E32\u540E\u4E00\u4F4D\u5B57\u7B26\n    const nextChar = text[i + m];\n    const offset = shift[nextChar] !== undefined ?\n                  m - shift[nextChar] :\n                  m + 1;\n\n    i += offset;\n  }\n  return -1;\n}\n\nfunction buildShiftTable(pattern: string): { [key: string]: number } {\n  const table: { [key: string]: number } = {};\n  for (let i = 0; i < pattern.length; i++) {\n    table[pattern[i]] = i;\n  }\n  return table;\n}",
        complexity: {
            time: 'O(mn)',
            space: 'O(m)',
            worst: 'O(mn)',
            average: 'O(n)',
            chart: 35
        },
        comparison: [
            { title: '优点', content: '实现简单，跳跃效率高' },
            { title: '缺点', content: '最坏情况下性能不佳' },
            { title: '适用场景', content: '通用字符串匹配，特别是英文字符' }
        ]
    }
];
var currentAlgorithm = computed(function () {
    return algorithms[activeAlgorithm.value];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-name']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-table']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-value']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "string-matching-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-nav" }));
var _loop_1 = function (algo, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = index;
        } }, { key: (index) }), { class: (['nav-item', { active: __VLS_ctx.activeAlgorithm === index }]) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-icon" }));
    (algo.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-name" }));
    (algo.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var _b = _a[_i], algo = _b[0], index = _b[1];
    _loop_1(algo, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-details" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-intro" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-icon" }));
(__VLS_ctx.currentAlgorithm.icon);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.currentAlgorithm.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-year" }));
(__VLS_ctx.currentAlgorithm.year);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-formWho" }));
(__VLS_ctx.currentAlgorithm.formWho);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-description" }));
(__VLS_ctx.currentAlgorithm.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.currentAlgorithm.idea);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "algo-steps" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.currentAlgorithm.steps)); _c < _d.length; _c++) {
    var _e = _d[_c], step = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
(__VLS_ctx.currentAlgorithm.implementation);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell" }));
(__VLS_ctx.currentAlgorithm.complexity.time);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell" }));
(__VLS_ctx.currentAlgorithm.complexity.space);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell" }));
(__VLS_ctx.currentAlgorithm.complexity.worst);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-cell" }));
(__VLS_ctx.currentAlgorithm.complexity.average);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.currentAlgorithm.comparison)); _f < _g.length; _f++) {
    var _h = _g[_f], item = _h[0], index = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-item" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-title" }));
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-content" }));
    (item.content);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "comparison-chart" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-container" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _j < _k.length; _j++) {
    var _l = _k[_j], algo = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-bar" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-label" }));
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-bar-bg" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "chart-bar-fill" }, { style: ({ width: algo.complexity.chart + '%' }) }), { class: ('bar-' + index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-value" }));
    (algo.complexity.time);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-legend" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['string-matching-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-name']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-card']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-year']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-formWho']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-table']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-title']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-content']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-label']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-value']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeAlgorithm: activeAlgorithm,
            algorithms: algorithms,
            currentAlgorithm: currentAlgorithm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
