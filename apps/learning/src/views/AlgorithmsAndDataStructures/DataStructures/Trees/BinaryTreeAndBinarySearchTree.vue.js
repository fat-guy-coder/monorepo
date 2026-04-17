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
import { ref, reactive, onMounted, nextTick } from 'vue';
// 响应式数据
var treeNodes = reactive([]);
var connectors = reactive([]);
var selectedNode = ref(null);
var customValue = ref(null);
var activeAlgorithm = ref(0);
var treeContainer = ref(null);
var svgWidth = ref(800);
var svgHeight = ref(400);
// 树统计信息
var treeStats = reactive({
    height: 0,
    nodeCount: 0,
    blackCount: 0,
    redCount: 0
});
// 初始化树
var initializeTree = function () {
    treeNodes.length = 0;
    connectors.length = 0;
    // 创建初始红黑树
    var nodes = [
        { id: 1, value: 13, color: 'black', x: 400, y: 50 },
        { id: 2, value: 8, color: 'red', x: 250, y: 150 },
        { id: 3, value: 17, color: 'red', x: 550, y: 150 },
        { id: 4, value: 1, color: 'black', x: 175, y: 250 },
        { id: 5, value: 11, color: 'black', x: 325, y: 250 },
        { id: 6, value: 15, color: 'black', x: 475, y: 250 },
        { id: 7, value: 25, color: 'black', x: 625, y: 250 },
        { id: 8, value: 6, color: 'red', x: 150, y: 350 }
    ];
    treeNodes.push.apply(treeNodes, nodes);
    // 创建连接线
    var newConnectors = [
        { path: 'M400,70 L275,130', type: 'left' },
        { path: 'M400,70 L525,130', type: 'right' },
        { path: 'M250,170 L190,230', type: 'left' },
        { path: 'M250,170 L310,230', type: 'right' },
        { path: 'M550,170 L490,230', type: 'left' },
        { path: 'M550,170 L610,230', type: 'right' },
        { path: 'M175,270 L160,330', type: 'left' }
    ];
    connectors.push.apply(connectors, newConnectors);
    updateTreeStats();
};
// 更新树统计信息
var updateTreeStats = function () {
    treeStats.nodeCount = treeNodes.length;
    treeStats.blackCount = treeNodes.filter(function (node) { return node.color === 'black'; }).length;
    treeStats.redCount = treeNodes.filter(function (node) { return node.color === 'red'; }).length;
    treeStats.height = 4; // 简化计算
};
// 插入随机节点
var insertRandomNode = function () {
    var newValue = Math.floor(Math.random() * 50) + 1;
    // 确保值不重复
    if (treeNodes.some(function (node) { return node.value === newValue; })) {
        insertRandomNode();
        return;
    }
    // 创建新节点
    var newNode = {
        id: Date.now(),
        value: newValue,
        color: Math.random() > 0.5 ? 'red' : 'black',
        x: 300 + Math.random() * 200,
        y: 100 + Math.random() * 300,
        isNew: true
    };
    treeNodes.push(newNode);
    // 更新连接线（简化实现）
    updateConnectors();
    updateTreeStats();
    // 1秒后移除新节点标记
    setTimeout(function () {
        var node = treeNodes.find(function (n) { return n.id === newNode.id; });
        if (node) {
            node.isNew = false;
        }
    }, 1000);
};
// 插入自定义节点
var insertCustomNode = function () {
    if (customValue.value === null)
        return;
    var newValue = customValue.value;
    // 确保值不重复
    if (treeNodes.some(function (node) { return node.value === newValue; })) {
        alert('该值已存在！');
        return;
    }
    // 创建新节点
    var newNode = {
        id: Date.now(),
        value: newValue,
        color: Math.random() > 0.5 ? 'red' : 'black',
        x: 300 + Math.random() * 200,
        y: 100 + Math.random() * 300,
        isNew: true
    };
    treeNodes.push(newNode);
    customValue.value = null;
    // 更新连接线
    updateConnectors();
    updateTreeStats();
    // 1秒后移除新节点标记
    setTimeout(function () {
        var node = treeNodes.find(function (n) { return n.id === newNode.id; });
        if (node) {
            node.isNew = false;
        }
    }, 1000);
};
// 搜索节点
var searchNode = function () {
    if (customValue.value === null)
        return;
    var target = customValue.value;
    var node = treeNodes.find(function (n) { return n.value === target; });
    if (node) {
        // 清除之前的搜索标记
        treeNodes.forEach(function (n) { n.isSearched = false; });
        // 标记搜索到的节点
        node.isSearched = true;
        // 3秒后清除搜索标记
        setTimeout(function () {
            node.isSearched = false;
        }, 3000);
    }
    else {
        alert("\u672A\u627E\u5230\u503C\u4E3A ".concat(target, " \u7684\u8282\u70B9"));
    }
};
// 选择节点
var selectNode = function (nodeId) {
    selectedNode.value = nodeId;
};
// 删除选中节点
var deleteSelectedNode = function () {
    if (selectedNode.value === null)
        return;
    var index = treeNodes.findIndex(function (node) { return node.id === selectedNode.value; });
    if (index !== -1) {
        treeNodes.splice(index, 1);
        selectedNode.value = null;
        // 更新连接线
        updateConnectors();
        updateTreeStats();
    }
};
// 更新连接线（简化实现）
var updateConnectors = function () {
    connectors.length = 0;
    // 这里应该根据树的实际结构计算连接线
    // 简化实现：随机生成一些连接线
    if (treeNodes.length > 1) {
        for (var i = 1; i < Math.min(treeNodes.length, 8); i++) {
            var parentIndex = Math.floor((i - 1) / 2);
            var parent_1 = treeNodes[parentIndex];
            var child = treeNodes[i];
            if (parent_1 && child) {
                connectors.push({
                    path: "M".concat(parent_1.x + 25, ",").concat(parent_1.y + 25, " L").concat(child.x + 25, ",").concat(child.y + 25),
                    type: i % 2 === 0 ? 'right' : 'left'
                });
            }
        }
    }
};
// 重置树
var resetTree = function () {
    initializeTree();
    selectedNode.value = null;
    customValue.value = null;
};
// 算法定义
var algorithms = [
    {
        name: '插入操作',
        description: '红黑树的插入操作首先像普通二叉搜索树一样插入节点，并将新节点着色为红色，然后通过旋转和重新着色来恢复红黑树的性质。',
        steps: [
            '像普通BST一样插入新节点',
            '将新节点着色为红色',
            '如果违反红黑树性质，进行修复',
            '修复可能涉及颜色翻转和旋转操作'
        ],
        code: "function insert(root, value) {\n  // \u666E\u901ABST\u63D2\u5165\n  let node = new Node(value);\n  node.color = RED;\n\n  // \u63D2\u5165\u8282\u70B9\n  // ... BST\u63D2\u5165\u903B\u8F91\n\n  // \u4FEE\u590D\u7EA2\u9ED1\u6811\u6027\u8D28\n  return insertFixup(root, node);\n}\n\nfunction insertFixup(root, node) {\n  while (node.parent && node.parent.color === RED) {\n    if (node.parent === node.parent.parent.left) {\n      let uncle = node.parent.parent.right;\n      if (uncle && uncle.color === RED) {\n        // \u60C5\u51B51: \u53D4\u53D4\u8282\u70B9\u662F\u7EA2\u8272\n        node.parent.color = BLACK;\n        uncle.color = BLACK;\n        node.parent.parent.color = RED;\n        node = node.parent.parent;\n      } else {\n        if (node === node.parent.right) {\n          // \u60C5\u51B52: \u8282\u70B9\u662F\u53F3\u5B69\u5B50\n          node = node.parent;\n          root = leftRotate(root, node);\n        }\n        // \u60C5\u51B53: \u8282\u70B9\u662F\u5DE6\u5B69\u5B50\n        node.parent.color = BLACK;\n        node.parent.parent.color = RED;\n        root = rightRotate(root, node.parent.parent);\n      }\n    } else {\n      // \u5BF9\u79F0\u60C5\u51B5\n      // ... \u7C7B\u4F3C\u903B\u8F91\u5904\u7406\u53F3\u5B50\u6811\u60C5\u51B5\n    }\n  }\n  root.color = BLACK;\n  return root;\n}"
    },
    {
        name: '删除操作',
        description: '红黑树的删除操作比插入更复杂，需要处理多种情况以确保删除后树仍然保持平衡。',
        steps: [
            '像普通BST一样删除节点',
            '如果删除的节点是黑色，需要进行修复',
            '修复过程涉及兄弟节点的颜色和旋转',
            '可能需要多次旋转和重新着色'
        ],
        code: "function deleteNode(root, value) {\n  // \u67E5\u627E\u8981\u5220\u9664\u7684\u8282\u70B9\n  let node = findNode(root, value);\n  if (!node) return root;\n\n  let originalColor = node.color;\n  let replacement;\n\n  if (!node.left) {\n    replacement = node.right;\n    transplant(root, node, node.right);\n  } else if (!node.right) {\n    replacement = node.left;\n    transplant(root, node, node.left);\n  } else {\n    let successor = minimum(node.right);\n    originalColor = successor.color;\n    replacement = successor.right;\n\n    if (successor.parent === node) {\n      if (replacement) replacement.parent = successor;\n    } else {\n      transplant(root, successor, successor.right);\n      successor.right = node.right;\n      successor.right.parent = successor;\n    }\n\n    transplant(root, node, successor);\n    successor.left = node.left;\n    successor.left.parent = successor;\n    successor.color = node.color;\n  }\n\n  if (originalColor === BLACK) {\n    root = deleteFixup(root, replacement);\n  }\n\n  return root;\n}"
    },
    {
        name: '左旋转',
        description: '左旋转操作用于调整树的结构，保持树的平衡。',
        steps: [
            '将节点P的右孩子Q设置为新的父节点',
            '将Q的左子树设置为P的右子树',
            '将P设置为Q的左子树',
            '更新父节点指针'
        ],
        code: "function leftRotate(root, node) {\n  let rightChild = node.right;\n  node.right = rightChild.left;\n\n  if (rightChild.left) {\n    rightChild.left.parent = node;\n  }\n\n  rightChild.parent = node.parent;\n\n  if (!node.parent) {\n    root = rightChild;\n  } else if (node === node.parent.left) {\n    node.parent.left = rightChild;\n  } else {\n    node.parent.right = rightChild;\n  }\n\n  rightChild.left = node;\n  node.parent = rightChild;\n\n  return root;\n}"
    },
    {
        name: '右旋转',
        description: '右旋转是左旋转的对称操作，也用于调整树的结构。',
        steps: [
            '将节点Q的左孩子P设置为新的父节点',
            '将P的右子树设置为Q的左子树',
            '将Q设置为P的右子树',
            '更新父节点指针'
        ],
        code: "function rightRotate(root, node) {\n  let leftChild = node.left;\n  node.left = leftChild.right;\n\n  if (leftChild.right) {\n    leftChild.right.parent = node;\n  }\n\n  leftChild.parent = node.parent;\n\n  if (!node.parent) {\n    root = leftChild;\n  } else if (node === node.parent.right) {\n    node.parent.right = leftChild;\n  } else {\n    node.parent.left = leftChild;\n  }\n\n  leftChild.right = node;\n  node.parent = leftChild;\n\n  return root;\n}"
    }
];
// 组件挂载时初始化树
onMounted(function () {
    initializeTree();
    // 设置SVG尺寸
    nextTick(function () {
        if (treeContainer.value) {
            svgWidth.value = treeContainer.value.offsetWidth;
            svgHeight.value = treeContainer.value.offsetHeight;
        }
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['color-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['root-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['red-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['path-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['red']} */ ;
/** @type {__VLS_StyleScopedClasses['black']} */ ;
/** @type {__VLS_StyleScopedClasses['left-child']} */ ;
/** @type {__VLS_StyleScopedClasses['right-child']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "red-black-tree-container" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon color-rule" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon root-rule" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon red-rule" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ class: "property-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "property-icon path-rule" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "visualization-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.insertRandomNode) }, { class: "btn primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.deleteSelectedNode) }, { class: "btn secondary" }), { disabled: (!__VLS_ctx.selectedNode) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetTree) }, { class: "btn outline" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "number", placeholder: "输入节点值" }, { class: "input" }));
(__VLS_ctx.customValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.insertCustomNode) }, { class: "btn primary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.searchNode) }, { class: "btn secondary" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-visual" }, { ref: "treeContainer" }));
/** @type {typeof __VLS_ctx.treeContainer} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-lines" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ class: "connectors" }, { width: (__VLS_ctx.svgWidth), height: (__VLS_ctx.svgHeight) }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.connectors)); _i < _a.length; _i++) {
    var _b = _a[_i], connector = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)(__assign(__assign({ key: (index), d: (connector.path) }, { class: "tree-connector" }), { class: (connector.type) }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-nodes" }));
var _loop_1 = function (node) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.selectNode(node.id);
        } }, { key: (node.id) }), { class: "tree-node" }), { class: ({
            'red': node.color === 'red',
            'black': node.color === 'black',
            'selected': __VLS_ctx.selectedNode === node.id,
            'new': node.isNew,
            'searched': node.isSearched
        }) }), { style: ({
            left: "".concat(node.x, "px"),
            top: "".concat(node.y, "px")
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "node-value" }));
    (node.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "node-color" }, { class: (node.color) }));
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.treeNodes)); _c < _d.length; _c++) {
    var node = _d[_c][0];
    _loop_1(node);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tree-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.treeStats.height);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.treeStats.nodeCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.treeStats.blackCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.treeStats.redCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "operations-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rotation-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "before-rotation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-connections" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "left-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "right-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "child-nodes" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rotation-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "after-rotation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-connections" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "left-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "child-nodes" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "right-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rotation-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "before-rotation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-connections" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "left-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "child-nodes" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "right-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rotation-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "after-rotation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram root" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-connections" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "left-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "right-child" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "child-nodes" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "algorithms-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tabs" }));
var _loop_2 = function (algo, index) {
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
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _e < _f.length; _e++) {
    var _g = _f[_e], algo = _g[0], index = _g[1];
    _loop_2(algo, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].steps)); _h < _j.length; _h++) {
    var _k = _j[_h], step = _k[0], index = _k[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.algorithms[__VLS_ctx.activeAlgorithm].code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "use-cases-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-cases-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-case-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
/** @type {__VLS_StyleScopedClasses['red-black-tree-container']} */ ;
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
/** @type {__VLS_StyleScopedClasses['color-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['root-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['red-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['property-item']} */ ;
/** @type {__VLS_StyleScopedClasses['property-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['path-rule']} */ ;
/** @type {__VLS_StyleScopedClasses['property-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['outline']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['connectors']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-connector']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-color']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['rotation-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['before-rotation']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['node-connections']} */ ;
/** @type {__VLS_StyleScopedClasses['left-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['right-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['child-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['rotation-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['after-rotation']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['node-connections']} */ ;
/** @type {__VLS_StyleScopedClasses['left-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['child-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['right-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['rotation-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['before-rotation']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['node-connections']} */ ;
/** @type {__VLS_StyleScopedClasses['left-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['child-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['right-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['rotation-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['after-rotation']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['root']} */ ;
/** @type {__VLS_StyleScopedClasses['node-connections']} */ ;
/** @type {__VLS_StyleScopedClasses['left-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['right-child']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['child-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['node-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case']} */ ;
/** @type {__VLS_StyleScopedClasses['use-case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            treeNodes: treeNodes,
            connectors: connectors,
            selectedNode: selectedNode,
            customValue: customValue,
            activeAlgorithm: activeAlgorithm,
            treeContainer: treeContainer,
            svgWidth: svgWidth,
            svgHeight: svgHeight,
            treeStats: treeStats,
            insertRandomNode: insertRandomNode,
            insertCustomNode: insertCustomNode,
            searchNode: searchNode,
            selectNode: selectNode,
            deleteSelectedNode: deleteSelectedNode,
            resetTree: resetTree,
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
