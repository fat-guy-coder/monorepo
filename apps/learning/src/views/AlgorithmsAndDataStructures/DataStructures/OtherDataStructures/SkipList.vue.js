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
import { ref, reactive, onMounted } from 'vue';
// 响应式数据
var skipList = reactive({
    levels: []
});
var searchValue = ref(null);
var searchedValue = ref(null);
var searchResult = ref(null);
var activeAlgorithm = ref(0);
// 初始化跳表
var initializeSkipList = function () {
    skipList.levels = [
        [
            { value: 3, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
            { value: 6, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
            { value: 7, level: 3, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }, { level: 3, active: true }] },
            { value: 9, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
            { value: 12, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
            { value: 17, level: 2, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }] },
            { value: 19, level: 1, pointers: [{ level: 0, active: true }, { level: 1, active: true }] },
            { value: 21, level: 3, pointers: [{ level: 0, active: true }, { level: 1, active: true }, { level: 2, active: true }, { level: 3, active: true }] },
        ]
    ];
    // 构建多层结构
    buildLevels();
};
// 构建多层结构
var buildLevels = function () {
    var baseLevel = skipList.levels[0];
    var maxLevel = Math.max.apply(Math, baseLevel.map(function (node) { return node.level; }));
    // 清空现有层级
    skipList.levels = [baseLevel];
    var _loop_2 = function (i) {
        var levelNodes = baseLevel.filter(function (node) { return node.level >= i; });
        skipList.levels.push(levelNodes);
    };
    // 构建更高层级
    for (var i = 1; i <= maxLevel; i++) {
        _loop_2(i);
    }
};
// 插入随机节点
var insertRandomNode = function () {
    var baseLevel = skipList.levels[0];
    var newValue = Math.floor(Math.random() * 30) + 1;
    // 确保值不重复
    if (baseLevel.some(function (node) { return node.value === newValue; })) {
        insertRandomNode();
        return;
    }
    // 随机确定层数（1-4层）
    var newLevel = Math.min(Math.floor(Math.log2(baseLevel.length + 1)) + 1, 4);
    // 创建新节点
    var newNode = {
        value: newValue,
        level: newLevel,
        pointers: Array.from({ length: newLevel + 1 }, function (_, i) { return ({
            level: i,
            active: true
        }); }),
        isNew: true
    };
    // 找到插入位置
    var insertIndex = 0;
    while (insertIndex < baseLevel.length && baseLevel[insertIndex].value < newValue) {
        insertIndex++;
    }
    // 插入节点
    baseLevel.splice(insertIndex, 0, newNode);
    // 重新构建层级
    buildLevels();
    // 1秒后移除新节点标记
    setTimeout(function () {
        newNode.isNew = false;
    }, 1000);
};
// 搜索节点
var searchNode = function () {
    if (searchValue.value === null)
        return;
    var target = searchValue.value;
    searchedValue.value = target;
    searchResult.value = null;
    // 模拟搜索过程
    var baseLevel = skipList.levels[0];
    var found = baseLevel.some(function (node) { return node.value === target; });
    if (found) {
        searchResult.value = "\u627E\u5230\u503C\u4E3A ".concat(target, " \u7684\u8282\u70B9");
    }
    else {
        searchResult.value = "\u672A\u627E\u5230\u503C\u4E3A ".concat(target, " \u7684\u8282\u70B9");
    }
    // 3秒后清除搜索状态
    setTimeout(function () {
        searchedValue.value = null;
    }, 3000);
};
// 重置跳表
var resetSkipList = function () {
    initializeSkipList();
    searchedValue.value = null;
    searchResult.value = null;
};
// 算法定义
var algorithms = [
    {
        name: '查找算法',
        description: '从最高层开始查找，如果当前节点的下一个节点值小于目标值，则向右移动；否则向下移动到下一层继续查找。',
        code: "function search(skipList, target) {\n  let current = skipList.head;\n  for (let level = skipList.maxLevel - 1; level >= 0; level--) {\n    while (current.forward[level] && current.forward[level].value < target) {\n      current = current.forward[level];\n    }\n  }\n  current = current.forward[0];\n  return current && current.value === target ? current : null;\n}"
    },
    {
        name: '插入算法',
        description: '首先查找插入位置，然后随机生成新节点的层数，最后更新相关指针将新节点插入到跳表中。',
        code: "function insert(skipList, value) {\n  const update = new Array(skipList.maxLevel);\n  let current = skipList.head;\n\n  // \u67E5\u627E\u63D2\u5165\u4F4D\u7F6E\n  for (let level = skipList.maxLevel - 1; level >= 0; level--) {\n    while (current.forward[level] && current.forward[level].value < value) {\n      current = current.forward[level];\n    }\n    update[level] = current;\n  }\n\n  // \u968F\u673A\u786E\u5B9A\u5C42\u6570\n  let newLevel = randomLevel();\n  if (newLevel > skipList.maxLevel) {\n    // \u8C03\u6574\u8DF3\u8868\u6700\u5927\u5C42\u6570\n    for (let i = skipList.maxLevel; i < newLevel; i++) {\n      update[i] = skipList.head;\n    }\n    skipList.maxLevel = newLevel;\n  }\n\n  // \u521B\u5EFA\u65B0\u8282\u70B9\u5E76\u66F4\u65B0\u6307\u9488\n  const newNode = new SkipListNode(value, newLevel);\n  for (let level = 0; level < newLevel; level++) {\n    newNode.forward[level] = update[level].forward[level];\n    update[level].forward[level] = newNode;\n  }\n}"
    },
    {
        name: '删除算法',
        description: '首先查找要删除的节点，然后更新所有指向该节点的指针，使其跳过该节点。',
        code: "function delete(skipList, value) {\n  const update = new Array(skipList.maxLevel);\n  let current = skipList.head;\n\n  // \u67E5\u627E\u8981\u5220\u9664\u7684\u8282\u70B9\n  for (let level = skipList.maxLevel - 1; level >= 0; level--) {\n    while (current.forward[level] && current.forward[level].value < value) {\n      current = current.forward[level];\n    }\n    update[level] = current;\n  }\n\n  current = current.forward[0];\n  if (current && current.value === value) {\n    // \u66F4\u65B0\u6307\u9488\u8DF3\u8FC7\u8BE5\u8282\u70B9\n    for (let level = 0; level < skipList.maxLevel; level++) {\n      if (update[level].forward[level] !== current) break;\n      update[level].forward[level] = current.forward[level];\n    }\n\n    // \u5982\u679C\u5220\u9664\u4E86\u6700\u9AD8\u5C42\u7684\u8282\u70B9\uFF0C\u8C03\u6574\u8DF3\u8868\u6700\u5927\u5C42\u6570\n    while (skipList.maxLevel > 1 &&\n           skipList.head.forward[skipList.maxLevel - 1] === null) {\n      skipList.maxLevel--;\n    }\n  }\n}"
    }
];
// 组件挂载时初始化跳表
onMounted(function () {
    initializeSkipList();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['level-label']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "skip-list-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "intro-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "two-column-layout" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "structure-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(__assign({ class: "feature-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros-cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "visualization-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.insertRandomNode) }, { class: "btn primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetSkipList) }, { class: "btn secondary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-control" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ onKeyup: (__VLS_ctx.searchNode) }, { type: "number", placeholder: "输入搜索值" }));
(__VLS_ctx.searchValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.searchNode) }, { class: "btn primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "skip-list-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "levels" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.skipList.levels)); _i < _a.length; _i++) {
    var _b = _a[_i], level = _b[0], levelIndex = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (levelIndex) }, { class: "level" }), { class: ({ 'top-level': levelIndex === __VLS_ctx.skipList.levels.length - 1 }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "level-label" }));
    (levelIndex);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "nodes" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "head-node" }));
    for (var _c = 0, _d = __VLS_getVForSourceType((level)); _c < _d.length; _c++) {
        var _e = _d[_c], node = _e[0], nodeIndex = _e[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ key: (nodeIndex) }, { class: "node" }), { class: ({
                'searched': node.value === __VLS_ctx.searchedValue,
                'new-node': node.isNew
            }) }), { style: ({ '--node-value': node.value }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-value" }));
        (node.value);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-pointers" }));
        for (var _f = 0, _g = __VLS_getVForSourceType((node.pointers)); _f < _g.length; _f++) {
            var pointer = _g[_f][0];
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (pointer.level) }, { class: "pointer" }), { class: ({
                    'active': pointer.active,
                    'search-path': pointer.searchPath
                }) }));
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization-info" }));
if (__VLS_ctx.searchResult !== null) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.searchResult);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algorithms-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tabs" }));
var _loop_1 = function (algo, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = index;
        } }, { key: (index) }), { class: "tab-btn" }), { class: ({ active: __VLS_ctx.activeAlgorithm === index }) }));
    (algo.name);
};
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _h < _j.length; _h++) {
    var _k = _j[_h], algo = _k[0], index = _k[1];
    _loop_1(algo, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "use-cases-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-cases-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['skip-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['structure-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-list']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['search-control']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['skip-list-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['levels']} */ ;
/** @type {__VLS_StyleScopedClasses['level']} */ ;
/** @type {__VLS_StyleScopedClasses['level-label']} */ ;
/** @type {__VLS_StyleScopedClasses['nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['head-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-pointers']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-info']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            skipList: skipList,
            searchValue: searchValue,
            searchedValue: searchedValue,
            searchResult: searchResult,
            activeAlgorithm: activeAlgorithm,
            insertRandomNode: insertRandomNode,
            searchNode: searchNode,
            resetSkipList: resetSkipList,
            algorithms: algorithms,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
