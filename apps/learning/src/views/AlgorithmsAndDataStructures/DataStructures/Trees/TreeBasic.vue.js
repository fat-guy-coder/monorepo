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
import { ref } from 'vue';
// 树结构分类数据
var treeCategories = ref([
    {
        name: "二叉树",
        icon: "🌳",
        description: "每个节点最多有两个子节点",
        examples: ["二叉搜索树", "AVL树", "红黑树"]
    },
    {
        name: "平衡树",
        icon: "⚖️",
        description: "保持左右子树高度平衡的树结构",
        examples: ["AVL树", "红黑树", "B树"]
    },
    {
        name: "B树家族",
        icon: "🌲",
        description: "用于磁盘存储优化的平衡树",
        examples: ["B树", "B+树", "B*树"]
    },
    {
        name: "堆",
        icon: "📚",
        description: "基于堆属性组织的完全二叉树",
        examples: ["最大堆", "最小堆", "优先队列"]
    },
    {
        name: "前缀树",
        icon: "🔤",
        description: "用于高效字符串检索的树结构",
        examples: ["字典树", "后缀树", "基数树"]
    },
    {
        name: "空间划分树",
        icon: "🗺️",
        description: "用于空间数据组织和查询",
        examples: ["四叉树", "八叉树", "KD树"]
    },
    {
        name: "融合树",
        icon: "🧬",
        description: "结合多种树结构优势的复合树",
        examples: ["树堆", "Treap", "AVL树与红黑树组合"]
    },
    {
        name: "其他树结构",
        icon: "🌿",
        description: "特殊场景应用的树结构",
        examples: ["区间树", "线段树", "斐波那契堆"]
    }
]);
// 应用场景数据
var applications = ref([
    {
        title: "文件系统",
        icon: "📁",
        color: "#93c5fd",
        description: "树结构自然表示文件和目录的层级关系",
        examples: ["NTFS", "ext4", "HFS+", "ZFS"]
    },
    {
        title: "数据库索引",
        icon: "💾",
        color: "#a7f3d0",
        description: "B树家族优化磁盘数据访问效率",
        examples: ["MySQL索引", "PostgreSQL索引", "MongoDB索引"]
    },
    {
        title: "路由算法",
        icon: "📡",
        color: "#fde68a",
        description: "前缀树实现高效的路由表查找",
        examples: ["IP路由", "域名路由", "网络包转发"]
    },
    {
        title: "DOM结构",
        icon: "🌐",
        color: "#fbcfe8",
        description: "浏览器使用树结构表示HTML文档",
        examples: ["HTML解析", "DOM操作", "虚拟DOM"]
    },
    {
        title: "决策算法",
        icon: "🤖",
        color: "#c7d2fe",
        description: "决策树用于机器学习和数据分析",
        examples: ["分类模型", "回归分析", "AI决策系统"]
    },
    {
        title: "游戏开发",
        icon: "🎮",
        color: "#ddd6fe",
        description: "空间划分树优化游戏碰撞检测",
        examples: ["场景管理", "碰撞检测", "物理引擎"]
    }
]);
// 树结构优点
var advantages = ref([
    "高效的分层数据组织和管理",
    "快速搜索和检索（对数时间复杂度）",
    "递归结构简化算法实现",
    "自然表示层次关系和依赖",
    "灵活扩展节点和子树",
    "平衡树确保最佳性能",
    "多种变体适应不同应用场景"
]);
// 树结构缺点
var disadvantages = ref([
    "实现复杂度高于线性结构",
    "平衡操作增加额外开销",
    "内存开销较大（存储指针）",
    "不适合存储线性数据",
    "复杂的删除和旋转操作",
    "递归深度过大可能导致栈溢出",
    "学习和理解曲线较陡峭"
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tree-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "children" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "children" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node leaf" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node leaf" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "children" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node leaf" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-legend" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-node root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-node internal" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-node leaf" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card characteristics" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.circle, __VLS_intrinsicElements.circle)({
    cx: "12",
    cy: "12",
    r: "10",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.line, __VLS_intrinsicElements.line)({
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "char-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "char-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "char-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "char-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "char-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card categories" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-category-grid" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.treeCategories)); _i < _a.length; _i++) {
    var category = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-card" }, { key: (category.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-icon" }));
    (category.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (category.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (category.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-examples" }));
    for (var _b = 0, _c = __VLS_getVForSourceType((category.examples)); _b < _c.length; _b++) {
        var _d = _c[_b], example = _d[0], idx = _d[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M9 18h6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M10 22h4",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-list" }));
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.applications)); _e < _f.length; _e++) {
    var _g = _f[_e], app = _g[0], index = _g[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-item" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon-bg" }, { style: ({ 'background': app.color }) }));
    (app.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (app.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (app.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-examples" }));
    for (var _h = 0, _j = __VLS_getVForSourceType((app.examples)); _h < _j.length; _h++) {
        var _k = _j[_h], example = _k[0], idx = _k[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (idx),
        });
        (example);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card pros-cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "m16 18 6-6-6-6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "m8 6-6 6 6 6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _l = 0, _m = __VLS_getVForSourceType((__VLS_ctx.advantages)); _l < _m.length; _l++) {
    var _o = _m[_l], pro = _o[0], index = _o[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: ('pro' + index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "check-icon" }));
    (pro);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "divider" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.disadvantages)); _p < _q.length; _p++) {
    var _r = _q[_p], con = _r[0], index = _r[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: ('con' + index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "cross-icon" }));
    (con);
}
/** @type {__VLS_StyleScopedClasses['tree-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-node']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-node']} */ ;
/** @type {__VLS_StyleScopedClasses['internal']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-node']} */ ;
/** @type {__VLS_StyleScopedClasses['leaf']} */ ;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristics']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic-item']} */ ;
/** @type {__VLS_StyleScopedClasses['char-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic-item']} */ ;
/** @type {__VLS_StyleScopedClasses['char-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic-item']} */ ;
/** @type {__VLS_StyleScopedClasses['char-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic-item']} */ ;
/** @type {__VLS_StyleScopedClasses['char-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic-item']} */ ;
/** @type {__VLS_StyleScopedClasses['char-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['categories']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-category-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['category-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-list']} */ ;
/** @type {__VLS_StyleScopedClasses['app-item']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['app-content']} */ ;
/** @type {__VLS_StyleScopedClasses['app-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['check-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['divider']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['cross-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            treeCategories: treeCategories,
            applications: applications,
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
