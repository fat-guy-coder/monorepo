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
import { ref, computed, onMounted } from 'vue';
// 生成唯一ID
var nodeIdCounter = 0;
var generateNodeId = function () { return ++nodeIdCounter; };
// 链表数据
var linkedList = ref([]);
var selectedNodeId = ref(null);
var newNodeValue = ref(Math.floor(Math.random() * 90) + 10);
var insertPosition = ref(0);
// 操作示例数据
var traversalResult = ref('');
var insertExamplePos = ref(2);
var deleteExamplePos = ref(1);
var searchValue = ref(25);
var searchResult = ref(null);
// 链表大小
var listSize = computed(function () { return linkedList.value.length; });
// 选中的节点值
var selectedNodeValue = computed(function () {
    if (selectedNodeId.value === null)
        return '无';
    var node = linkedList.value.find(function (n) { return n.id === selectedNodeId.value; });
    return node ? node.value : '无';
});
// 初始化链表
var initializeList = function () {
    linkedList.value = [
        { id: generateNodeId(), value: 10, next: null },
        { id: generateNodeId(), value: 20, next: null },
        { id: generateNodeId(), value: 30, next: null },
        { id: generateNodeId(), value: 40, next: null }
    ];
};
// 重置链表
var resetList = function () {
    linkedList.value = [];
    selectedNodeId.value = null;
};
// 插入节点
var insertNode = function () {
    if (!newNodeValue.value)
        return;
    var newNode = {
        id: generateNodeId(),
        value: newNodeValue.value,
        next: null,
        isNew: true
    };
    var pos = insertPosition.value;
    // 位置无效时插入到末尾
    if (pos < 0 || pos > linkedList.value.length) {
        linkedList.value.push(newNode);
    }
    // 插入到指定位置
    else {
        linkedList.value.splice(pos, 0, newNode);
    }
    // 重置输入
    newNodeValue.value = Math.floor(Math.random() * 90) + 10;
    insertPosition.value = Math.min(linkedList.value.length, Math.max(0, pos));
    // 移除新节点标记
    setTimeout(function () {
        var index = linkedList.value.findIndex(function (n) { return n.id === newNode.id; });
        if (index !== -1) {
            linkedList.value[index] = __assign(__assign({}, linkedList.value[index]), { isNew: false });
        }
    }, 2000);
};
// 删除节点
var deleteNode = function (index) {
    var _a;
    if (index >= 0 && index < linkedList.value.length) {
        linkedList.value.splice(index, 1);
        if (selectedNodeId.value === ((_a = linkedList.value[index]) === null || _a === void 0 ? void 0 : _a.id)) {
            selectedNodeId.value = null;
        }
    }
};
// 选择节点
var selectNode = function (id) {
    selectedNodeId.value = id;
};
// 操作数据
var operations = ref([
    {
        title: "1. 创建链表",
        description: "初始化一个链表结构，创建头节点并设置初始值。链表由节点组成，每个节点包含数据和指向下一个节点的指针。",
        timeComplexity: "O(1)",
        code: "class ListNode {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\n// \u521B\u5EFA\u94FE\u8868\nfunction createLinkedList(values) {\n  if (!values.length) return null;\n\n  const head = new ListNode(values[0]);\n  let current = head;\n\n  for (let i = 1; i < values.length; i++) {\n    current.next = new ListNode(values[i]);\n    current = current.next;\n  }\n\n  return head;\n}"
    },
    {
        title: "2. 遍历链表",
        description: "访问链表中的每个节点，从头节点开始，沿着next指针依次访问每个节点，直到到达链表末尾。",
        timeComplexity: "O(n)",
        code: "function traverseLinkedList(head) {\n  let current = head;\n  const values = [];\n\n  while (current !== null) {\n    values.push(current.value);\n    current = current.next;\n  }\n\n  return values;\n}"
    },
    {
        title: "3. 在指定位置插入",
        description: "在链表的特定位置插入新节点。需要找到插入位置的前一个节点，调整指针将新节点插入链表中。",
        timeComplexity: "O(n)",
        code: "function insertAtPosition(head, value, position) {\n  const newNode = new ListNode(value);\n\n  // \u5728\u5934\u90E8\u63D2\u5165\n  if (position === 0) {\n    newNode.next = head;\n    return newNode;\n  }\n\n  let current = head;\n  let count = 0;\n\n  // \u627E\u5230\u63D2\u5165\u4F4D\u7F6E\u7684\u524D\u4E00\u4E2A\u8282\u70B9\n  while (current && count < position - 1) {\n    current = current.next;\n    count++;\n  }\n\n  if (current) {\n    newNode.next = current.next;\n    current.next = newNode;\n  }\n\n  return head;\n}"
    },
    {
        title: "4. 在头部插入",
        description: "在链表的开头添加新节点。新节点成为新的头节点，指向原来的头节点。",
        timeComplexity: "O(1)",
        code: "function insertAtHead(head, value) {\n  const newNode = new ListNode(value);\n  newNode.next = head;\n  return newNode;\n}"
    },
    {
        title: "5. 在尾部插入",
        description: "在链表的末尾添加新节点。需要遍历链表找到最后一个节点，将其next指针指向新节点。",
        timeComplexity: "O(n)",
        code: "function insertAtTail(head, value) {\n  const newNode = new ListNode(value);\n\n  if (!head) {\n    return newNode;\n  }\n\n  let current = head;\n  while (current.next) {\n    current = current.next;\n  }\n\n  current.next = newNode;\n  return head;\n}"
    },
    {
        title: "6. 删除指定位置节点",
        description: "删除链表中特定位置的节点。需要找到待删除节点的前一个节点，调整指针跳过待删除节点。",
        timeComplexity: "O(n)",
        code: "function deleteAtPosition(head, position) {\n  if (!head) return null;\n\n  // \u5220\u9664\u5934\u8282\u70B9\n  if (position === 0) {\n    return head.next;\n  }\n\n  let current = head;\n  let count = 0;\n\n  // \u627E\u5230\u5220\u9664\u4F4D\u7F6E\u7684\u524D\u4E00\u4E2A\u8282\u70B9\n  while (current && count < position - 1) {\n    current = current.next;\n    count++;\n  }\n\n  if (current && current.next) {\n    current.next = current.next.next;\n  }\n\n  return head;\n}"
    },
    {
        title: "7. 删除头部节点",
        description: "删除链表的头节点。原头节点的下一个节点成为新的头节点。",
        timeComplexity: "O(1)",
        code: "function deleteHead(head) {\n  if (!head) return null;\n  return head.next;\n}"
    },
    {
        title: "8. 删除尾部节点",
        description: "删除链表的最后一个节点。需要遍历链表找到倒数第二个节点，将其next指针置为null。",
        timeComplexity: "O(n)",
        code: "function deleteTail(head) {\n  if (!head || !head.next) return null;\n\n  let current = head;\n  while (current.next && current.next.next) {\n    current = current.next;\n  }\n\n  current.next = null;\n  return head;\n}"
    },
    {
        title: "9. 查找节点",
        description: "在链表中查找特定值的节点。遍历链表，比较每个节点的值，找到匹配的节点或到达链表末尾。",
        timeComplexity: "O(n)",
        code: "function findNode(head, target) {\n  let current = head;\n  let position = 0;\n\n  while (current) {\n    if (current.value === target) {\n      return position;\n    }\n    current = current.next;\n    position++;\n  }\n\n  return -1; // \u672A\u627E\u5230\n}"
    }
]);
// 当前激活的操作
var activeOperation = ref(0);
var activeOperationData = computed(function () { return operations.value[activeOperation.value]; });
// 操作示例节点
var operationExampleNodes = computed(function () {
    return [
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
        { value: 50 }
    ];
});
// 初始化
onMounted(function () {
    initializeList();
    // 设置遍历结果
    traversalResult.value = linkedList.value.map(function (node) { return node.value; }).join(' → ');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-header']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-details']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example-content']} */ ;
/** @type {__VLS_StyleScopedClasses['list-display']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['list-info']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "number",
    placeholder: "节点值",
    min: "1",
    max: "99",
});
(__VLS_ctx.newNodeValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "number",
    placeholder: "插入位置",
    min: "0",
    max: (__VLS_ctx.listSize),
});
(__VLS_ctx.insertPosition);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.insertNode) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetList) }, { class: "reset-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "list-display" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node head-node" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pointer" }));
var _loop_1 = function (node, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (node.id) }, { class: "node" }), { class: ({
            'new-node': node.isNew,
            'selected-node': __VLS_ctx.selectedNodeId === node.id
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-value" }));
    (node.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-pointer" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.deleteNode(index);
        } }, { class: "node-btn delete-btn" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.selectNode(node.id);
        } }, { class: "node-btn select-btn" }));
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.linkedList)); _i < _a.length; _i++) {
    var _b = _a[_i], node = _b[0], index = _b[1];
    _loop_1(node, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node tail-node" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "list-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.listSize);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.selectedNodeValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.listSize > 0 ? '已初始化' : '空链表');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs" }));
var _loop_2 = function (op, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeOperation = index;
        } }, { key: (index) }), { class: (['tab-button', { active: __VLS_ctx.activeOperation === index }]) }));
    (op.title);
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.operations)); _c < _d.length; _c++) {
    var _e = _d[_c], op = _e[0], index = _e[1];
    _loop_2(op, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-details" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.activeOperationData.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.activeOperationData.timeComplexity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "description" }));
(__VLS_ctx.activeOperationData.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
(__VLS_ctx.activeOperationData.code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-example" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.operationExampleNodes)); _f < _g.length; _f++) {
    var _h = _g[_f], node = _h[0], idx = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-node" }, { key: (idx) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-value" }));
    (node.value);
    if (idx < __VLS_ctx.operationExampleNodes.length - 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-pointer" }));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-result" }));
if (__VLS_ctx.activeOperation === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.operationExampleNodes.length);
}
if (__VLS_ctx.activeOperation === 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.traversalResult);
}
if (__VLS_ctx.activeOperation === 2) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.insertExamplePos);
}
if (__VLS_ctx.activeOperation === 3) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.activeOperation === 4) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.activeOperation === 5) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.deleteExamplePos);
}
if (__VLS_ctx.activeOperation === 6) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.activeOperation === 7) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.activeOperation === 8) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.searchValue);
    if (__VLS_ctx.searchResult !== null) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.searchResult);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-links" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
/** @type {__VLS_StyleScopedClasses['linked-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-header']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['list-display']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['head-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['node-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['node-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['node-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['select-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['tail-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-label']} */ ;
/** @type {__VLS_StyleScopedClasses['list-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-container']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-details']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-info']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['code-section']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example-content']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example-node']} */ ;
/** @type {__VLS_StyleScopedClasses['example-value']} */ ;
/** @type {__VLS_StyleScopedClasses['example-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-result']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            linkedList: linkedList,
            selectedNodeId: selectedNodeId,
            newNodeValue: newNodeValue,
            insertPosition: insertPosition,
            traversalResult: traversalResult,
            insertExamplePos: insertExamplePos,
            deleteExamplePos: deleteExamplePos,
            searchValue: searchValue,
            searchResult: searchResult,
            listSize: listSize,
            selectedNodeValue: selectedNodeValue,
            resetList: resetList,
            insertNode: insertNode,
            deleteNode: deleteNode,
            selectNode: selectNode,
            operations: operations,
            activeOperation: activeOperation,
            activeOperationData: activeOperationData,
            operationExampleNodes: operationExampleNodes,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
