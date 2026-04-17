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
import { ref, reactive, onMounted, nextTick, computed } from 'vue';
// 响应式数据
var originalArray = ref([]);
var treeLevels = reactive([]);
var connectors = reactive([]);
var arraySize = ref(8);
var currentOperation = ref('query');
var rangeStart = ref(0);
var rangeEnd = ref(3);
var updateValue = ref(10);
var operationResult = ref('');
var activeAlgorithm = ref(0);
var treeContainer = ref(null);
var treeWidth = ref(800);
var treeHeight = ref(400);
// 计算属性
var isValidRange = computed(function () {
    return rangeStart.value >= 0 &&
        rangeEnd.value < arraySize.value &&
        rangeStart.value <= rangeEnd.value;
});
// 初始化数组
var initializeArray = function () {
    originalArray.value = Array.from({ length: arraySize.value }, function (_, i) { return Math.floor(Math.random() * 20) + 1; });
    operationResult.value = '';
    clearTreeVisualization();
};
// 随机化数组
var randomizeArray = function () {
    initializeArray();
};
// 构建线段树
var buildTree = function () {
    if (originalArray.value.length === 0) {
        initializeArray();
    }
    // 清空之前的树
    treeLevels.length = 0;
    connectors.length = 0;
    // 构建线段树数据
    var buildSegmentTree = function (start, end, level) {
        if (level === void 0) { level = 0; }
        var nodeId = Date.now() + Math.random();
        var node = {
            id: nodeId,
            start: start,
            end: end,
            value: 0,
            x: 0,
            y: level * 80 + 50,
            isLeaf: start === end
        };
        if (start === end) {
            // 叶子节点
            node.value = originalArray.value[start];
        }
        else {
            // 内部节点
            var mid = Math.floor((start + end) / 2);
            var leftChild = buildSegmentTree(start, mid, level + 1);
            var rightChild = buildSegmentTree(mid + 1, end, level + 1);
            node.value = leftChild.value + rightChild.value;
            // 添加连接线
            connectors.push({
                id: "".concat(nodeId, "-left"),
                path: "M".concat(node.x + 25, ",").concat(node.y + 25, " L").concat(leftChild.x + 25, ",").concat(leftChild.y + 25)
            });
            connectors.push({
                id: "".concat(nodeId, "-right"),
                path: "M".concat(node.x + 25, ",").concat(node.y + 25, " L").concat(rightChild.x + 25, ",").concat(rightChild.y + 25)
            });
        }
        // 确保当前层级存在
        if (!treeLevels[level]) {
            treeLevels[level] = [];
        }
        treeLevels[level].push(node);
        return node;
    };
    // 构建树
    buildSegmentTree(0, originalArray.value.length - 1);
    // 计算节点位置
    calculateNodePositions();
    operationResult.value = '线段树构建完成';
};
// 计算节点位置
var calculateNodePositions = function () {
    treeLevels.forEach(function (level, levelIndex) {
        var levelWidth = 100 / (level.length + 1);
        level.forEach(function (node, nodeIndex) {
            node.x = (nodeIndex + 1) * levelWidth;
        });
    });
};
// 清除树可视化状态
var clearTreeVisualization = function () {
    treeLevels.forEach(function (level) {
        level.forEach(function (node) {
            node.isQueried = false;
            node.isUpdated = false;
        });
    });
    connectors.forEach(function (connector) {
        connector.queried = false;
        connector.updated = false;
    });
};
// 检查索引是否在查询范围内
var isInQueryRange = function (index) {
    return index >= rangeStart.value && index <= rangeEnd.value;
};
// 检查索引是否被更新
var isUpdated = function (index) {
    // 简化实现，实际应该根据更新操作来标记
    return false;
};
// 执行操作
var executeOperation = function () {
    if (!isValidRange.value)
        return;
    clearTreeVisualization();
    if (currentOperation.value === 'query') {
        // 执行区间查询
        var result = simulateRangeQuery(rangeStart.value, rangeEnd.value);
        operationResult.value = "\u533A\u95F4 [".concat(rangeStart.value, ", ").concat(rangeEnd.value, "] \u7684\u548C\u4E3A: ").concat(result);
    }
    else {
        // 执行区间更新
        simulateRangeUpdate(rangeStart.value, rangeEnd.value, updateValue.value);
        operationResult.value = "\u533A\u95F4 [".concat(rangeStart.value, ", ").concat(rangeEnd.value, "] \u66F4\u65B0\u4E3A: ").concat(updateValue.value);
    }
};
// 模拟区间查询
var simulateRangeQuery = function (start, end) {
    var sum = 0;
    var query = function (nodeIndex, nodeStart, nodeEnd) {
        if (nodeStart >= start && nodeEnd <= end) {
            // 当前节点区间完全在查询范围内
            markNodeAsQueried(nodeIndex, nodeStart, nodeEnd);
            return getNodeValue(nodeIndex, nodeStart, nodeEnd);
        }
        if (nodeEnd < start || nodeStart > end) {
            // 当前节点区间与查询区间无重叠
            return 0;
        }
        // 部分重叠，递归查询左右子树
        var mid = Math.floor((nodeStart + nodeEnd) / 2);
        var leftSum = query(nodeIndex * 2 + 1, nodeStart, mid);
        var rightSum = query(nodeIndex * 2 + 2, mid + 1, nodeEnd);
        return leftSum + rightSum;
    };
    sum = query(0, 0, originalArray.value.length - 1);
    return sum;
};
// 模拟区间更新
var simulateRangeUpdate = function (start, end, value) {
    var update = function (nodeIndex, nodeStart, nodeEnd) {
        if (nodeStart >= start && nodeEnd <= end) {
            // 当前节点区间完全在更新范围内
            markNodeAsUpdated(nodeIndex, nodeStart, nodeEnd);
            return;
        }
        if (nodeEnd < start || nodeStart > end) {
            // 当前节点区间与更新区间无重叠
            return;
        }
        // 部分重叠，递归更新左右子树
        var mid = Math.floor((nodeStart + nodeEnd) / 2);
        update(nodeIndex * 2 + 1, nodeStart, mid);
        update(nodeIndex * 2 + 2, mid + 1, nodeEnd);
        markNodeAsUpdated(nodeIndex, nodeStart, nodeEnd);
    };
    update(0, 0, originalArray.value.length - 1);
};
// 标记节点为已查询
var markNodeAsQueried = function (nodeIndex, start, end) {
    // 在实际实现中，这里应该找到对应的可视化节点并标记
    // 简化实现：标记所有层级的对应节点
    treeLevels.forEach(function (level) {
        level.forEach(function (node) {
            if (node.start === start && node.end === end) {
                node.isQueried = true;
            }
        });
    });
};
// 标记节点为已更新
var markNodeAsUpdated = function (nodeIndex, start, end) {
    // 简化实现
    treeLevels.forEach(function (level) {
        level.forEach(function (node) {
            if (node.start === start && node.end === end) {
                node.isUpdated = true;
            }
        });
    });
};
// 获取节点值（简化实现）
var getNodeValue = function (nodeIndex, start, end) {
    if (start === end) {
        return originalArray.value[start];
    }
    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += originalArray.value[i];
    }
    return sum;
};
// 算法定义
var algorithms = [
    {
        name: '构建算法',
        description: '线段树的构建过程采用分治策略，递归地将区间分成两半，直到区间长度为1。',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: "function buildTree(arr, tree, node, start, end) {\n  if (start === end) {\n    // \u53F6\u5B50\u8282\u70B9\n    tree[node] = arr[start];\n  } else {\n    const mid = Math.floor((start + end) / 2);\n    const leftNode = 2 * node + 1;\n    const rightNode = 2 * node + 2;\n\n    // \u9012\u5F52\u6784\u5EFA\u5DE6\u53F3\u5B50\u6811\n    buildTree(arr, tree, leftNode, start, mid);\n    buildTree(arr, tree, rightNode, mid + 1, end);\n\n    // \u5408\u5E76\u5DE6\u53F3\u5B50\u6811\u7ED3\u679C\n    tree[node] = tree[leftNode] + tree[rightNode];\n  }\n}\n\n// \u4F7F\u7528\u793A\u4F8B\nconst arr = [1, 3, 5, 7, 9, 11];\nconst tree = new Array(4 * arr.length);\nbuildTree(arr, tree, 0, 0, arr.length - 1);"
    },
    {
        name: '区间查询',
        description: '查询区间信息时，从根节点开始，如果当前节点区间完全包含在查询区间内，则直接返回；否则递归查询左右子树。',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(log n)',
        code: "function queryTree(tree, node, start, end, queryStart, queryEnd) {\n  if (queryStart > end || queryEnd < start) {\n    // \u67E5\u8BE2\u533A\u95F4\u4E0E\u5F53\u524D\u8282\u70B9\u533A\u95F4\u65E0\u91CD\u53E0\n    return 0;\n  }\n\n  if (queryStart <= start && queryEnd >= end) {\n    // \u5F53\u524D\u8282\u70B9\u533A\u95F4\u5B8C\u5168\u5305\u542B\u5728\u67E5\u8BE2\u533A\u95F4\u5185\n    return tree[node];\n  }\n\n  // \u90E8\u5206\u91CD\u53E0\uFF0C\u9012\u5F52\u67E5\u8BE2\u5DE6\u53F3\u5B50\u6811\n  const mid = Math.floor((start + end) / 2);\n  const leftNode = 2 * node + 1;\n  const rightNode = 2 * node + 2;\n\n  const leftSum = queryTree(tree, leftNode, start, mid, queryStart, queryEnd);\n  const rightSum = queryTree(tree, rightNode, mid + 1, end, queryStart, queryEnd);\n\n  return leftSum + rightSum;\n}\n\n// \u4F7F\u7528\u793A\u4F8B\nconst sum = queryTree(tree, 0, 0, arr.length - 1, 1, 4);\n// \u67E5\u8BE2\u533A\u95F4[1,4]\u7684\u548C"
    },
    {
        name: '单点更新',
        description: '更新单个元素时，从根节点开始，递归找到对应的叶子节点进行更新，然后回溯更新所有祖先节点。',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(log n)',
        code: "function updateTree(tree, node, start, end, index, value) {\n  if (start === end) {\n    // \u627E\u5230\u76EE\u6807\u53F6\u5B50\u8282\u70B9\n    tree[node] = value;\n  } else {\n    const mid = Math.floor((start + end) / 2);\n    const leftNode = 2 * node + 1;\n    const rightNode = 2 * node + 2;\n\n    if (index >= start && index <= mid) {\n      // \u76EE\u6807\u5728\u5DE6\u5B50\u6811\n      updateTree(tree, leftNode, start, mid, index, value);\n    } else {\n      // \u76EE\u6807\u5728\u53F3\u5B50\u6811\n      updateTree(tree, rightNode, mid + 1, end, index, value);\n    }\n\n    // \u66F4\u65B0\u5F53\u524D\u8282\u70B9\n    tree[node] = tree[leftNode] + tree[rightNode];\n  }\n}\n\n// \u4F7F\u7528\u793A\u4F8B\nupdateTree(tree, 0, 0, arr.length - 1, 2, 10);\n// \u5C06\u7D22\u5F152\u7684\u5143\u7D20\u66F4\u65B0\u4E3A10"
    },
    {
        name: '懒惰传播',
        description: '懒惰传播技术允许延迟区间更新操作，只有在需要时才进行实际更新，大大提高区间更新的效率。',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(n)',
        code: "class LazySegmentTree {\n  constructor(data) {\n    this.n = data.length;\n    this.tree = new Array(4 * this.n);\n    this.lazy = new Array(4 * this.n).fill(0);\n    this.build(data, 0, 0, this.n - 1);\n  }\n\n  // \u533A\u95F4\u66F4\u65B0\n  updateRange(node, start, end, l, r, value) {\n    // \u68C0\u67E5\u662F\u5426\u6709\u5EF6\u8FDF\u66F4\u65B0\n    if (this.lazy[node] !== 0) {\n      this.tree[node] += (end - start + 1) * this.lazy[node];\n\n      if (start !== end) {\n        // \u975E\u53F6\u5B50\u8282\u70B9\uFF0C\u6807\u8BB0\u5B50\u8282\u70B9\u9700\u8981\u5EF6\u8FDF\u66F4\u65B0\n        this.lazy[2*node+1] += this.lazy[node];\n        this.lazy[2*node+2] += this.lazy[node];\n      }\n\n      this.lazy[node] = 0;\n    }\n\n    if (start > end || start > r || end < l) {\n      return;\n    }\n\n    if (start >= l && end <= r) {\n      // \u5F53\u524D\u533A\u95F4\u5B8C\u5168\u5728\u66F4\u65B0\u8303\u56F4\u5185\n      this.tree[node] += (end - start + 1) * value;\n\n      if (start !== end) {\n        this.lazy[2*node+1] += value;\n        this.lazy[2*node+2] += value;\n      }\n      return;\n    }\n\n    // \u90E8\u5206\u91CD\u53E0\uFF0C\u9012\u5F52\u66F4\u65B0\n    const mid = Math.floor((start + end) / 2);\n    this.updateRange(2*node+1, start, mid, l, r, value);\n    this.updateRange(2*node+2, mid+1, end, l, r, value);\n\n    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];\n  }\n}"
    }
];
// 组件挂载时初始化
onMounted(function () {
    initializeArray();
    // 设置树容器尺寸
    nextTick(function () {
        if (treeContainer.value) {
            treeWidth.value = treeContainer.value.offsetWidth;
            treeHeight.value = treeContainer.value.offsetHeight;
        }
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['updated']} */ ;
/** @type {__VLS_StyleScopedClasses['queried']} */ ;
/** @type {__VLS_StyleScopedClasses['updated']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['segment-tree-container']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['array-elements']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "segment-tree-container" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(__assign({ class: "properties-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon structure" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon storage" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon query" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon update" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-cases-mini" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "visualization-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
var __VLS_0 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.arraySize) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.arraySize) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6;
var __VLS_7 = {
    onChange: (__VLS_ctx.initializeArray)
};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "4",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "8",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "16",
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.randomizeArray) }, { class: "btn primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.buildTree) }, { class: "btn secondary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "array-display" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "array-elements" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.originalArray)); _i < _a.length; _i++) {
    var _b = _a[_i], value = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "array-element" }), { class: ({
            'in-query-range': __VLS_ctx.isInQueryRange(index),
            'updated': __VLS_ctx.isUpdated(index)
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "index" }));
    (index);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
    (value);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.currentOperation = 'query';
    } }, { class: ({ active: __VLS_ctx.currentOperation === 'query' }) }), { class: "op-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.currentOperation = 'update';
    } }, { class: ({ active: __VLS_ctx.currentOperation === 'update' }) }), { class: "op-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-params" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "param-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "number", min: "0", max: (__VLS_ctx.arraySize - 1) }, { class: "param-input" }));
(__VLS_ctx.rangeStart);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "param-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "number", min: (__VLS_ctx.rangeStart), max: (__VLS_ctx.arraySize - 1) }, { class: "param-input" }));
(__VLS_ctx.rangeEnd);
if (__VLS_ctx.currentOperation === 'update') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "param-group" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "number" }, { class: "param-input" }));
    (__VLS_ctx.updateValue);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.executeOperation) }, { class: "btn primary execute-btn" }), { disabled: (!__VLS_ctx.isValidRange) }));
(__VLS_ctx.currentOperation === 'query' ? '执行查询' : '执行更新');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "segment-tree-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-container" }, { ref: "treeContainer" }));
/** @type {typeof __VLS_ctx.treeContainer} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-levels" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.treeLevels)); _c < _d.length; _c++) {
    var _e = _d[_c], level = _e[0], levelIndex = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (levelIndex) }, { class: "tree-level" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((level)); _f < _g.length; _f++) {
        var node = _g[_f][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ key: (node.id) }, { class: "tree-node" }), { class: ({
                'queried': node.isQueried,
                'updated': node.isUpdated,
                'leaf': node.isLeaf
            }) }), { style: ({
                left: "".concat(node.x, "%"),
                top: "".concat(node.y, "px")
            }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-interval" }));
        (node.start);
        (node.end);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-value" }));
        (node.value);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ class: "tree-connectors" }, { width: (__VLS_ctx.treeWidth), height: (__VLS_ctx.treeHeight) }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.connectors)); _h < _j.length; _h++) {
    var connector = _j[_h][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)(__assign(__assign({ key: (connector.id), d: (connector.path) }, { class: "connector" }), { class: ({
            'queried': connector.queried,
            'updated': connector.updated
        }) }));
}
if (__VLS_ctx.operationResult) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-result" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.operationResult);
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
for (var _k = 0, _l = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _k < _l.length; _k++) {
    var _m = _l[_k], algo = _m[0], index = _m[1];
    _loop_1(algo, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].timeComplexity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].spaceComplexity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "implementation-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-small" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-small" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "variants-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variants-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "feature-tag" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
/** @type {__VLS_StyleScopedClasses['segment-tree-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['two-column-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['structure-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['properties-list']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['structure']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['storage']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['query']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['update']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases-mini']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-item']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-item']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-item']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-item']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['array-display']} */ ;
/** @type {__VLS_StyleScopedClasses['array-elements']} */ ;
/** @type {__VLS_StyleScopedClasses['array-element']} */ ;
/** @type {__VLS_StyleScopedClasses['index']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-type']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['op-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['op-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-params']} */ ;
/** @type {__VLS_StyleScopedClasses['param-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-input']} */ ;
/** @type {__VLS_StyleScopedClasses['param-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-input']} */ ;
/** @type {__VLS_StyleScopedClasses['param-group']} */ ;
/** @type {__VLS_StyleScopedClasses['param-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['execute-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['segment-tree-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-levels']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-level']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-interval']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-connectors']} */ ;
/** @type {__VLS_StyleScopedClasses['connector']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-result']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['code-small']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['code-small']} */ ;
/** @type {__VLS_StyleScopedClasses['variants-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['variants-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['variant']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            originalArray: originalArray,
            treeLevels: treeLevels,
            connectors: connectors,
            arraySize: arraySize,
            currentOperation: currentOperation,
            rangeStart: rangeStart,
            rangeEnd: rangeEnd,
            updateValue: updateValue,
            operationResult: operationResult,
            activeAlgorithm: activeAlgorithm,
            treeContainer: treeContainer,
            treeWidth: treeWidth,
            treeHeight: treeHeight,
            isValidRange: isValidRange,
            initializeArray: initializeArray,
            randomizeArray: randomizeArray,
            buildTree: buildTree,
            isInQueryRange: isInQueryRange,
            isUpdated: isUpdated,
            executeOperation: executeOperation,
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
