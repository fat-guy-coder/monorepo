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
// 搜索和筛选相关
var searchQuery = ref('');
var activeTag = ref('全部');
var filterTags = ['全部', '有向图', '无向图', '加权图', '特殊图', '网络图'];
// 图分类数据
var graphTypes = ref([
    {
        id: 1,
        name: "无向图",
        icon: "⇄",
        color: "#4CAF50",
        tags: ["基础图", "对称关系"],
        features: [
            "边没有方向性",
            "边连接的两个顶点是对称的",
            "邻接矩阵是对称矩阵",
            "度数 = 入度 = 出度"
        ],
        scenarios: [
            "社交网络（朋友关系）",
            "交通网络（双向道路）",
            "分子结构（化学键）",
            "计算机网络（对等连接）"
        ],
        algorithms: [
            {
                name: "深度优先搜索(DFS)",
                description: "用于遍历或搜索图，沿着分支深入探索"
            },
            {
                name: "广度优先搜索(BFS)",
                description: "按层次遍历图，常用于最短路径问题"
            },
            {
                name: "Prim算法",
                description: "用于寻找最小生成树"
            },
            {
                name: "Kruskal算法",
                description: "另一种最小生成树算法，基于边的选择"
            }
        ]
    },
    {
        id: 2,
        name: "有向图",
        icon: "→",
        color: "#2196F3",
        tags: ["方向性", "非对称"],
        features: [
            "边具有方向性（起点→终点）",
            "邻接矩阵通常不对称",
            "顶点有入度和出度之分",
            "可以表示因果关系"
        ],
        scenarios: [
            "网页链接（超链接）",
            "任务依赖关系",
            "有限状态机",
            "交通单行道系统"
        ],
        algorithms: [
            {
                name: "拓扑排序",
                description: "对有向无环图(DAG)进行线性排序"
            },
            {
                name: "Kosaraju算法",
                description: "寻找强连通分量"
            },
            {
                name: "Bellman-Ford算法",
                description: "单源最短路径（可处理负权重）"
            },
            {
                name: "关键路径法(CPM)",
                description: "项目管理中的进度规划算法"
            }
        ]
    },
    {
        id: 3,
        name: "加权图",
        icon: "⚖️",
        color: "#FF9800",
        tags: ["带权重", "度量"],
        features: [
            "每条边关联一个权重值",
            "权重可表示距离、成本、容量等",
            "权重可以是正数、负数或零",
            "通常用于优化问题"
        ],
        scenarios: [
            "地图导航（距离/时间）",
            "网络路由（带宽/延迟）",
            "物流配送（运输成本）",
            "电路设计（电阻/电容）"
        ],
        algorithms: [
            {
                name: "Dijkstra算法",
                description: "单源最短路径（非负权重）"
            },
            {
                name: "Floyd-Warshall算法",
                description: "所有顶点对的最短路径"
            },
            {
                name: "最大流算法",
                description: "如Ford-Fulkerson，解决网络流问题"
            },
            {
                name: "旅行商问题(TSP)",
                description: "寻找最短的遍历所有城市的路径"
            }
        ]
    },
    {
        id: 4,
        name: "二分图",
        icon: "⇆",
        color: "#9C27B0",
        tags: ["二部图", "匹配"],
        features: [
            "顶点分为两个不相交集合",
            "所有边连接两个不同集合的顶点",
            "不存在奇数长度的环",
            "可以用两种颜色着色"
        ],
        scenarios: [
            "匹配问题（求职者与职位）",
            "广告投放（广告与展示位）",
            "婚姻稳定问题",
            "时间表安排（课程与教室）"
        ],
        algorithms: [
            {
                name: "匈牙利算法",
                description: "寻找最大匹配"
            },
            {
                name: "Hopcroft-Karp算法",
                description: "更高效的最大匹配算法"
            },
            {
                name: "二分图检测",
                description: "使用BFS/DFS检查图是否为二分图"
            },
            {
                name: "最小顶点覆盖",
                description: "Konig定理将问题转化为最大匹配"
            }
        ]
    },
    {
        id: 5,
        name: "树",
        icon: "🌲",
        color: "#795548",
        tags: ["无环", "层次结构"],
        features: [
            "连通无环图",
            "任意两顶点间有唯一路径",
            "n个顶点有n-1条边",
            "没有回路"
        ],
        scenarios: [
            "组织结构图",
            "文件系统结构",
            "决策树（机器学习）",
            "语法分析树（编译器）"
        ],
        algorithms: [
            {
                name: "前/中/后序遍历",
                description: "深度优先的树遍历方法"
            },
            {
                name: "层次遍历",
                description: "广度优先的树遍历方法"
            },
            {
                name: "最近公共祖先(LCA)",
                description: "寻找两个节点的最近公共祖先"
            },
            {
                name: "树的重心",
                description: "优化树的分割问题"
            }
        ]
    },
    {
        id: 6,
        name: "有向无环图(DAG)",
        icon: "↘️",
        color: "#E91E63",
        tags: ["无环", "拓扑"],
        features: [
            "有向图中不存在环",
            "可以拓扑排序",
            "表示偏序关系",
            "高效处理依赖关系"
        ],
        scenarios: [
            "任务调度与依赖管理",
            "版本控制系统（如Git）",
            "数据流编程",
            "编译器的中间表示"
        ],
        algorithms: [
            {
                name: "拓扑排序",
                description: "Kahn算法或基于DFS的排序"
            },
            {
                name: "关键路径分析",
                description: "确定项目的最短完成时间"
            },
            {
                name: "最长路径问题",
                description: "在DAG中可高效求解"
            },
            {
                name: "动态规划",
                description: "许多DP问题可建模为DAG"
            }
        ]
    }
]);
// 过滤图分类
var filteredGraphs = computed(function () {
    var query = searchQuery.value.toLowerCase();
    var result = graphTypes.value;
    if (query) {
        result = result.filter(function (graph) {
            return graph.name.toLowerCase().includes(query) ||
                graph.tags.some(function (tag) { return tag.toLowerCase().includes(query); }) ||
                graph.algorithms.some(function (algo) {
                    return algo.name.toLowerCase().includes(query) ||
                        algo.description.toLowerCase().includes(query);
                });
        });
    }
    if (activeTag.value !== '全部') {
        result = result.filter(function (graph) {
            return graph.tags.includes(activeTag.value) ||
                graph.name.includes(activeTag.value);
        });
    }
    return result;
});
// 切换标签
var toggleTag = function (tag) {
    activeTag.value = activeTag.value === tag ? '全部' : tag;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['graph-types']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-classification-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-classification-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ value: (__VLS_ctx.searchQuery), placeholder: "搜索图分类或算法...", type: "text" }, { class: "search-input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "filter-tags" }));
var _loop_1 = function (tag) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.toggleTag(tag);
        } }, { key: (tag) }), { class: ({ active: __VLS_ctx.activeTag === tag }) }));
    (tag);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.filterTags)); _i < _a.length; _i++) {
    var tag = _a[_i][0];
    _loop_1(tag);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-types" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredGraphs)); _b < _c.length; _b++) {
    var graph = _c[_b][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (graph.id) }, { class: "graph-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-icon" }, { style: ({ backgroundColor: graph.color }) }));
    (graph.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (graph.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-tags" }));
    for (var _d = 0, _e = __VLS_getVForSourceType((graph.tags)); _d < _e.length; _d++) {
        var tag = _e[_d][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (tag),
        });
        (tag);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _f = 0, _g = __VLS_getVForSourceType((graph.features)); _f < _g.length; _f++) {
        var _h = _g[_f], feature = _h[0], index = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (index),
        });
        (feature);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _j = 0, _k = __VLS_getVForSourceType((graph.scenarios)); _j < _k.length; _j++) {
        var _l = _k[_j], scenario = _l[0], index = _l[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (index),
        });
        (scenario);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms" }));
    for (var _m = 0, _o = __VLS_getVForSourceType((graph.algorithms)); _m < _o.length; _m++) {
        var _p = _o[_m], algorithm = _p[0], index = _p[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "algorithm" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "algo-icon" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (algorithm.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (algorithm.description);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['graph-classification-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-types']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            searchQuery: searchQuery,
            activeTag: activeTag,
            filterTags: filterTags,
            filteredGraphs: filteredGraphs,
            toggleTag: toggleTag,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
