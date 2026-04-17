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
// 链表节点定义
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
    return ListNode;
}());
// 算法数据
var algorithms = ref([
    {
        id: 'reverse',
        name: '反转链表',
        icon: '🔄',
        description: '将链表中的节点顺序完全反转，头节点变为尾节点，尾节点变为头节点。',
        steps: [
            '初始化三个指针：prev（前一节点，初始null）、curr（当前节点，初始头节点）、next（下一节点）',
            '遍历链表，每次迭代：保存curr.next到next、将curr.next指向prev、prev移动到curr、curr移动到next',
            '当curr为null时，prev即为新链表的头节点',
        ],
        scenarios: ['需要从后向前处理链表元素时', '解决回文链表问题', '某些特定场景需要逆序访问链表'],
        complexity: {
            time: 'O(n)',
            space: 'O(1)',
        },
        code: "// \u8FED\u4EE3\u6CD5\u53CD\u8F6C\u94FE\u8868\nfunction reverseList(head: ListNode | null): ListNode | null {\n  let prev: ListNode | null = null;\n  let curr = head;\n\n  while (curr !== null) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n\n  return prev;\n}\n\n// \u9012\u5F52\u6CD5\u53CD\u8F6C\u94FE\u8868\n// \u94FE\u8868\u53CD\u8F6C\u51FD\u6570\uFF08\u9012\u5F52\u5B9E\u73B0\uFF09\nfunction reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {\n  // \u9012\u5F52\u7EC8\u6B62\u6761\u4EF6\uFF1A\u7A7A\u94FE\u8868\u6216\u5355\u4E2A\u8282\u70B9\n  if (head === null || head.next === null) {\n    return head;\n  }\n\n  // \u9012\u5F52\u53CD\u8F6C\u5269\u4F59\u90E8\u5206\n  const reversedRest = reverseList(head.next);\n\n  // \u5C06\u5F53\u524D\u8282\u70B9\u6DFB\u52A0\u5230\u53CD\u8F6C\u540E\u94FE\u8868\u7684\u5C3E\u90E8\n  head.next.next = head;\n  head.next = null;\n\n  return reversedRest;\n}\n",
    },
    {
        id: 'cycle',
        name: '检测环形链表',
        icon: '⭕',
        description: '检测链表中是否存在环，即链表的某个节点可以通过连续 next 指针再次到达。',
        steps: [
            '使用两个指针：slow（每次移动一步）和fast（每次移动两步）',
            '从链表头开始同时移动两个指针',
            '如果链表有环，快指针最终会追上慢指针（两者相遇）',
            '如果快指针到达链表尾部（null），则链表无环',
        ],
        scenarios: ['检测链表是否循环引用', '内存泄漏检测', '解决环形链表相关问题'],
        complexity: {
            time: 'O(n)',
            space: 'O(1)',
        },
        code: "function hasCycle(head: ListNode | null): boolean {\n  if (head === null || head.next === null) {\n    return false;\n  }\n\n  let slow: ListNode | null = head;\n  let fast: ListNode | null = head.next;\n\n  while (slow !== fast) {\n    if (fast === null || fast.next === null) {\n      return false;\n    }\n\n    slow = slow!.next;\n    fast = fast.next.next;\n  }\n\n  return true;\n}",
    },
    {
        id: 'merge',
        name: '合并有序链表',
        icon: '🤝',
        description: '将两个升序排列的链表合并为一个新的升序链表并返回。',
        steps: [
            '创建一个哨兵节点(dummy)作为新链表的起始点',
            '使用指针current指向哨兵节点',
            '比较两个链表的当前节点值，将较小值的节点连接到current后',
            '移动较小值链表和current指针',
            '重复直到其中一个链表为空',
            '将剩余链表连接到current后',
        ],
        scenarios: ['合并多个有序数据流', '归并排序的链表实现', '合并多个排序结果'],
        complexity: {
            time: 'O(n+m)',
            space: 'O(1)',
        },
        code: "function mergeTwoLists(\n  l1: ListNode | null,\n  l2: ListNode | null\n): ListNode | null {\n  const dummy = new ListNode(0);\n  let current = dummy;\n\n  while (l1 !== null && l2 !== null) {\n    if (l1.val < l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n\n  // \u8FDE\u63A5\u5269\u4F59\u90E8\u5206\n  current.next = l1 === null ? l2 : l1;\n\n  return dummy.next;\n}",
    },
    {
        id: 'nth',
        name: '删除倒数第N节点',
        icon: '🗑️',
        description: '删除链表的倒数第n个节点，并返回链表的头节点。',
        steps: [
            '创建哨兵节点(dummy)指向头节点，处理头节点被删除的情况',
            '初始化两个指针：first和second，都指向dummy',
            '将first指针向前移动n+1步（创建n+1的间隔）',
            '同时移动first和second，直到first到达链表尾部',
            '此时second指向倒数第n+1个节点，修改其next指针跳过倒数第n个节点',
            '返回dummy.next',
        ],
        scenarios: ['需要从链表末尾删除节点', '实现特定位置的链表操作', '解决链表删除相关问题'],
        complexity: {
            time: 'O(n)',
            space: 'O(1)',
        },
        code: "function removeNthFromEnd(\n  head: ListNode | null,\n  n: number\n): ListNode | null {\n  const dummy = new ListNode(0);\n  dummy.next = head;\n\n  let first: ListNode | null = dummy;\n  let second: ListNode | null = dummy;\n\n  // \u5148\u79FB\u52A8first\u6307\u9488\uFF0C\u521B\u5EFAn+1\u7684\u95F4\u9694\n  for (let i = 0; i <= n; i++) {\n    first = first!.next;\n  }\n\n  // \u540C\u65F6\u79FB\u52A8\u4E24\u4E2A\u6307\u9488\n  while (first !== null) {\n    first = first.next;\n    second = second!.next;\n  }\n\n  // \u5220\u9664\u76EE\u6807\u8282\u70B9\n  second!.next = second!.next!.next;\n\n  return dummy.next;\n}",
    },
    {
        id: 'intersection',
        name: '链表相交点',
        icon: '🔀',
        description: '找到两个单链表相交的起始节点。如果两个链表没有交点，返回 null。其他的算法复杂度太高，这个算法复杂度最低',
        steps: [
            '初始化两个指针pA和pB分别指向headA和headB',
            '同时向前移动两个指针',
            '当pA到达链表尾部时，将其重定位到headB',
            '当pB到达链表尾部时，将其重定位到headA',
            '当pA和pB相遇时，即为相交节点（若不相交，最终会同时为null）',
        ],
        scenarios: ['寻找两个链表的公共部分', '解决链表交叉问题', '内存共享检测'],
        complexity: {
            time: 'O(m+n)',
            space: 'O(1)',
        },
        code: "function getIntersectionNode(\n  headA: ListNode | null,\n  headB: ListNode | null\n): ListNode | null {\n  if (headA === null || headB === null) return null;\n\n  let pA: ListNode | null = headA;\n  let pB: ListNode | null = headB;\n\n  while (pA !== pB) {\n    pA = pA === null ? headB : pA.next;\n    pB = pB === null ? headA : pB.next;\n  }\n\n  return pA;\n}",
    },
]);
var activeAlgorithm = ref('reverse');
var activeAlgorithmData = computed(function () {
    return algorithms.value.find(function (a) { return a.id === activeAlgorithm.value; }) || algorithms.value[0];
});
// 可视化数据
var listData = ref([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]);
var visualization = ref({
    stepIndex: 0,
    totalSteps: 5,
    activeIndex: 0,
    steps: [
        '初始化：prev = null, curr = 头节点',
        '第一步：保存next节点，将curr.next指向prev',
        '第二步：prev移动到curr位置，curr移动到next位置',
        '第三步：重复上述过程直到curr为null',
        '完成：prev成为新的头节点',
    ],
});
function nextStep() {
    if (visualization.value.stepIndex < visualization.value.totalSteps - 1) {
        visualization.value.stepIndex++;
        visualization.value.activeIndex =
            visualization.value.stepIndex < listData.value.length
                ? visualization.value.stepIndex
                : listData.value.length - 1;
    }
}
function prevStep() {
    if (visualization.value.stepIndex > 0) {
        visualization.value.stepIndex--;
        visualization.value.activeIndex = visualization.value.stepIndex;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['node-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-line']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-badges" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "badge" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "badge" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-selector" }));
var _loop_1 = function (algorithm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = algorithm.id;
        } }, { key: (algorithm.id) }), { class: ({ active: __VLS_ctx.activeAlgorithm === algorithm.id }) }));
    (algorithm.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var algorithm = _a[_i][0];
    _loop_1(algorithm);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-details" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
(__VLS_ctx.activeAlgorithmData.icon);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.activeAlgorithmData.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.activeAlgorithmData.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithmData.steps)); _b < _c.length; _b++) {
    var _d = _c[_b], step = _d[0], index = _d[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-scenarios" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithmData.scenarios)); _e < _f.length; _e++) {
    var _g = _f[_e], scenario = _g[0], index = _g[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    (scenario);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-code" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.activeAlgorithmData.code);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-analysis" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "metric" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.activeAlgorithmData.complexity.time);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "metric" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
(__VLS_ctx.activeAlgorithmData.complexity.space);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-visual" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.listData)); _h < _j.length; _h++) {
    var _k = _j[_h], node = _k[0], index = _k[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "list-node" }), { class: ({
            active: __VLS_ctx.visualization.activeIndex === index,
            head: index === 0,
            tail: index === __VLS_ctx.listData.length - 1,
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-value" }));
    (node.value);
    if (index < __VLS_ctx.listData.length - 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "node-pointer" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pointer-line" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pointer-arrow" }));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.prevStep) }, { disabled: (__VLS_ctx.visualization.stepIndex === 0) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.nextStep) }, { disabled: (__VLS_ctx.visualization.stepIndex >= __VLS_ctx.visualization.totalSteps - 1) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.visualization.steps[__VLS_ctx.visualization.stepIndex]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-cards" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-tips" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['linked-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-info']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-scenarios']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-code']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-analysis']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['metric']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['metric']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['linked-list-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['list-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-line']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-description']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['application-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-section']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-tips']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            algorithms: algorithms,
            activeAlgorithm: activeAlgorithm,
            activeAlgorithmData: activeAlgorithmData,
            listData: listData,
            visualization: visualization,
            nextStep: nextStep,
            prevStep: prevStep,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
