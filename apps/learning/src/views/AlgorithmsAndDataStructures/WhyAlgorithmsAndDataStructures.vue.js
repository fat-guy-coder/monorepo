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
// 算法可视化节点
var visualNodes = ref([
    { top: 40, left: 150, size: 80, color: 'rgba(79, 70, 229, 0.8)', label: '数组' },
    { top: 160, left: 50, size: 70, color: 'rgba(139, 92, 246, 0.8)', label: '链表' },
    { top: 160, left: 250, size: 70, color: 'rgba(99, 102, 241, 0.8)', label: '栈' },
    { top: 280, left: 150, size: 90, color: 'rgba(59, 130, 246, 0.8)', label: '树' },
    { top: 220, left: 300, size: 60, color: 'rgba(14, 165, 233, 0.8)', label: '图' },
    { top: 100, left: 320, size: 65, color: 'rgba(16, 185, 129, 0.8)', label: '哈希' },
]);
var emit = defineEmits(['goToByRouteName']);
function goToByName() {
    emit('goToByRouteName', 'DataStructuresIntroduction');
}
// 算法分类标签
var algoTabs = ref([
    { id: 'all', label: '全部' },
    { id: 'sort', label: '排序算法' },
    { id: 'search', label: '搜索算法' },
    { id: 'graph', label: '图算法' },
    { id: 'dynamic', label: '动态规划' },
]);
var activeAlgoTab = ref('all');
// 线性数据结构
var linearStructures = ref([
    {
        name: "数组",
        icon: "📊",
        color: "#a5b4fc",
        description: "连续内存空间存储相同类型元素",
        properties: ["随机访问 O(1)", "插入删除 O(n)", "大小固定"]
    },
    {
        name: "链表",
        icon: "⛓️",
        color: "#c7d2fe",
        description: "通过指针连接的节点序列，节点存储数据和指向下一个节点的指针",
        properties: ["动态大小", "插入删除 O(1)", "顺序访问"]
    },
    {
        name: "栈",
        icon: "📚",
        color: "#ddd6fe",
        description: "后进先出(LIFO)的数据结构，仅在一端(栈顶)进行操作",
        properties: ["push/pop O(1)", "函数调用", "括号匹配"]
    },
    {
        name: "队列",
        icon: "🚶‍♂️🚶‍♀️",
        color: "#fbcfe8",
        description: "先进先出(FIFO)的数据结构，在一端(rear)添加，另一端(front)删除",
        properties: ["enqueue/dequeue O(1)", "任务调度", "BFS"]
    }
]);
// 非线性数据结构
var nonLinearStructures = ref([
    {
        name: "树",
        icon: "🌳",
        color: "#bbf7d0",
        description: "分层数据结构，具有根节点和子节点，用于表示层次关系",
        properties: ["层级结构", "搜索高效", "多种变体"]
    },
    {
        name: "二叉树",
        icon: "🔢",
        color: "#86efac",
        description: "每个节点最多有两个子节点的树结构",
        properties: ["O(log n) 操作", "BST/AVL", "遍历算法"]
    },
    {
        name: "图",
        icon: "📈",
        color: "#a5f3fc",
        description: "由顶点和边组成的网络结构，表示实体间关系",
        properties: ["复杂关系", "多种表示法", "路径搜索"]
    },
    {
        name: "哈希表",
        icon: "🔑",
        color: "#fde68a",
        description: "通过哈希函数将键映射到存储位置的数据结构",
        properties: ["平均 O(1) 访问", "键值对存储", "冲突处理"]
    }
]);
// 算法数据
var algorithms = ref([
    {
        name: "快速排序",
        category: "sort",
        complexity: "O(n log n)",
        description: "分治策略，选择一个基准元素将数组分成左右两部分",
        useCases: ["大规模数据排序", "内存受限场景", "通用排序"]
    },
    {
        name: "二分查找",
        category: "search",
        complexity: "O(log n)",
        description: "在有序数组中高效查找目标元素，每次比较将搜索范围减半",
        useCases: ["有序数据查找", "数据库索引", "数值计算"]
    },
    {
        name: "广度优先搜索(BFS)",
        category: "graph",
        complexity: "O(V+E)",
        description: "从根节点开始逐层遍历图结构，使用队列辅助实现",
        useCases: ["最短路径(未加权)", "社交网络", "网络爬虫"]
    },
    {
        name: "深度优先搜索(DFS)",
        category: "graph",
        complexity: "O(V+E)",
        description: "沿着树的深度遍历节点，尽可能深地搜索分支",
        useCases: ["拓扑排序", "连通分量", "迷宫求解"]
    },
    {
        name: "Dijkstra算法",
        category: "graph",
        complexity: "O(V^2)",
        description: "求解单源最短路径，适用于带权有向图和无向图",
        useCases: ["路由算法", "地图导航", "网络优化"]
    },
    {
        name: "动态规划",
        category: "dynamic",
        complexity: "问题相关",
        description: "将复杂问题分解为重叠子问题，存储子问题解避免重复计算",
        useCases: ["背包问题", "最长公共子序列", "编辑距离"]
    },
    {
        name: "归并排序",
        category: "sort",
        complexity: "O(n log n)",
        description: "分治算法，将数组分成两半排序后合并结果",
        useCases: ["外部排序", "链表排序", "稳定排序"]
    },
    {
        name: "二叉树遍历",
        category: "graph",
        complexity: "O(n)",
        description: "前序、中序、后序遍历二叉树节点的方法",
        useCases: ["表达式树", "文件系统", "数据库索引"]
    }
]);
// 过滤算法
var filteredAlgorithms = computed(function () {
    if (activeAlgoTab.value === 'all')
        return algorithms.value;
    return algorithms.value.filter(function (algo) { return algo.category === activeAlgoTab.value; });
});
// 雷达图数据
var radarAxes = ref([
    { text: "问题分析", x: 50, y: 10 },
    { text: "抽象思维", x: 85, y: 25 },
    { text: "编码能力", x: 85, y: 75 },
    { text: "性能优化", x: 50, y: 90 },
    { text: "调试能力", x: 15, y: 75 },
    { text: "系统设计", x: 15, y: 25 }
]);
// 学习好处
var benefits = ref([
    {
        title: "编写高效代码",
        description: "理解不同算法的时间、空间复杂度，选择最优解决方案"
    },
    {
        title: "提升问题解决能力",
        description: "学会抽象问题、设计算法和优化解决方案"
    },
    {
        title: "理解系统设计",
        description: "数据库、操作系统等系统软件都基于核心数据结构"
    },
    {
        title: "增强技术洞察力",
        description: "理解新技术背后的原理，更快学习和掌握"
    },
    {
        title: "提升职业竞争力",
        description: "通过顶尖科技公司的技术面试必备技能"
    },
    {
        title: "编写可维护代码",
        description: "构建清晰、结构良好的软件系统"
    }
]);
// 雷达图数据
var radarLabels = ref([
    { text: "问题分析", x: 50, y: 10 },
    { text: "抽象思维", x: 85, y: 25 },
    { text: "编码能力", x: 85, y: 75 },
    { text: "性能优化", x: 50, y: 90 },
    { text: "调试能力", x: 15, y: 75 },
    { text: "系统设计", x: 15, y: 25 }
]);
// 雷达图路径
var radarPath = "polygon(50% 10%, 85% 25%, 85% 75%, 50% 90%, 15% 75%, 15% 25%)";
// 学习路径
var learningPath = ref([
    {
        title: "掌握基础知识",
        description: "理解时间复杂度和空间复杂度的概念，掌握基础数据结构",
        tips: ["Big O表示法", "数组和链表", "栈和队列"]
    },
    {
        title: "学习核心算法",
        description: "掌握排序、搜索等基础算法，理解递归和分治思想",
        tips: ["快速排序", "二分查找", "递归原理"]
    },
    {
        title: "探索高级结构",
        description: "学习树、图等非线性结构及相关算法",
        tips: ["二叉树遍历", "图搜索算法", "哈希表原理"]
    },
    {
        title: "解决实际问题",
        description: "在LeetCode等平台练习，将知识应用于实际问题",
        tips: ["每日一题", "参与竞赛", "复盘解法"]
    },
    {
        title: "深入算法思想",
        description: "学习动态规划、贪心算法等高级算法范式",
        tips: ["状态转移方程", "最优子结构", "记忆化搜索"]
    },
    {
        title: "系统设计应用",
        description: "理解数据结构在系统设计中的应用和实践",
        tips: ["数据库索引", "缓存策略", "分布式算法"]
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-visual']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "dsa-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "hero-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hero-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hero-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hero-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-visual" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.visualNodes)); _i < _a.length; _i++) {
    var _b = _a[_i], node = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "algo-node" }, { key: (index) }), { style: ({
            top: node.top + 'px',
            left: node.left + 'px',
            width: node.size + 'px',
            height: node.size + 'px',
            background: node.color,
            animationDelay: (index * 0.1) + 's'
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (node.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "why-learn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reasons-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "reason-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "data-structures" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-category" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-grid" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.linearStructures)); _c < _d.length; _c++) {
    var ds = _d[_c][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-card" }, { key: (ds.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-icon" }, { style: ({ background: ds.color }) }));
    (ds.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (ds.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (ds.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-props" }));
    for (var _e = 0, _f = __VLS_getVForSourceType((ds.properties)); _e < _f.length; _e++) {
        var _g = _f[_e], prop = _g[0], idx = _g[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (prop);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-category" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-grid" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.nonLinearStructures)); _h < _j.length; _h++) {
    var ds = _j[_h][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-card" }, { key: (ds.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-icon" }, { style: ({ background: ds.color }) }));
    (ds.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (ds.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (ds.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-props" }));
    for (var _k = 0, _l = __VLS_getVForSourceType((ds.properties)); _k < _l.length; _k++) {
        var _m = _l[_k], prop = _m[0], idx = _m[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (prop);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-tabs" }));
var _loop_1 = function (tab) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgoTab = tab.id;
        } }, { key: (tab.id) }), { class: ({ active: __VLS_ctx.activeAlgoTab === tab.id }) }));
    (tab.label);
};
for (var _o = 0, _p = __VLS_getVForSourceType((__VLS_ctx.algoTabs)); _o < _p.length; _o++) {
    var tab = _p[_o][0];
    _loop_1(tab);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-grid" }));
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.filteredAlgorithms)); _q < _r.length; _q++) {
    var algo = _r[_q][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-card" }, { key: (algo.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-complexity" }));
    (algo.complexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algo.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-use-cases" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    for (var _s = 0, _t = __VLS_getVForSourceType((algo.useCases)); _s < _t.length; _s++) {
        var _u = _t[_s], useCase = _u[0], idx = _u[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (useCase);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefits" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefits-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefits-list" }));
for (var _v = 0, _w = __VLS_getVForSourceType((__VLS_ctx.benefits)); _v < _w.length; _v++) {
    var _x = _w[_v], benefit = _x[0], index = _x[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefit-item" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefit-index" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (benefit.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (benefit.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefits-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "skills-radar" }));
for (var _y = 0, _z = __VLS_getVForSourceType((__VLS_ctx.radarAxes)); _y < _z.length; _y++) {
    var _0 = _z[_y], axis = _0[0], idx = _0[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "radar-axis" }, { key: (idx) }), { style: ({ transform: "rotate(".concat(idx * 60, "deg)") }) }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "radar-labels" }));
for (var _1 = 0, _2 = __VLS_getVForSourceType((__VLS_ctx.radarLabels)); _1 < _2.length; _1++) {
    var _3 = _2[_1], label = _3[0], idx = _3[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (idx) }, { style: ({ transform: "translate(-50%, -50%) rotate(".concat(-idx * 60, "deg)"), left: label.x + '%', top: label.y + '%' }) }));
    (label.text);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "radar-fill" }, { style: ({ clipPath: __VLS_ctx.radarPath }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "learning-path" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "path-steps" }));
for (var _4 = 0, _5 = __VLS_getVForSourceType((__VLS_ctx.learningPath)); _4 < _5.length; _4++) {
    var _6 = _5[_4], step = _6[0], index = _6[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "path-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (step.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-tips" }));
    for (var _7 = 0, _8 = __VLS_getVForSourceType((step.tips)); _7 < _8.length; _7++) {
        var _9 = _8[_7], tip = _9[0], idx = _9[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (tip);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "dsa-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "inspiration-quote" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "action-call" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.goToByName) }, { class: "start-learning-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-note" }));
/** @type {__VLS_StyleScopedClasses['dsa-container']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-node']} */ ;
/** @type {__VLS_StyleScopedClasses['why-learn']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['reasons-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-card']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-card']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-card']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-card']} */ ;
/** @type {__VLS_StyleScopedClasses['reason-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['data-structures']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-category']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-props']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-category']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-info']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-props']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-card']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-use-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['benefits']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['benefits-content']} */ ;
/** @type {__VLS_StyleScopedClasses['benefits-list']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit-item']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit-index']} */ ;
/** @type {__VLS_StyleScopedClasses['benefits-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['skills-radar']} */ ;
/** @type {__VLS_StyleScopedClasses['radar-axis']} */ ;
/** @type {__VLS_StyleScopedClasses['radar-labels']} */ ;
/** @type {__VLS_StyleScopedClasses['radar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['learning-path']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['path-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['path-card']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step-tips']} */ ;
/** @type {__VLS_StyleScopedClasses['dsa-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['inspiration-quote']} */ ;
/** @type {__VLS_StyleScopedClasses['action-call']} */ ;
/** @type {__VLS_StyleScopedClasses['start-learning-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            visualNodes: visualNodes,
            goToByName: goToByName,
            algoTabs: algoTabs,
            activeAlgoTab: activeAlgoTab,
            linearStructures: linearStructures,
            nonLinearStructures: nonLinearStructures,
            filteredAlgorithms: filteredAlgorithms,
            radarAxes: radarAxes,
            benefits: benefits,
            radarLabels: radarLabels,
            radarPath: radarPath,
            learningPath: learningPath,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */
