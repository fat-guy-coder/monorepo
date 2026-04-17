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
import { ref, onMounted, onUnmounted } from 'vue';
// 响应式数据
var activeSection = ref('basic');
var activeTab = ref('typescript');
var queueItems = ref([]);
var circularQueue = ref(Array(8).fill(null));
var circularHead = ref(0);
var circularTail = ref(0);
var circularSize = ref(0);
var maxPriorityQueue = ref([
    { value: '紧急任务', priority: 10 },
    { value: '高优先级', priority: 8 },
    { value: '普通任务', priority: 5 },
    { value: '低优先级', priority: 2 }
]);
var minPriorityQueue = ref([
    { value: '任务A', priority: 1 },
    { value: '任务B', priority: 2 },
    { value: '任务C', priority: 3 },
    { value: '任务D', priority: 5 }
]);
var graphNodes = ref([
    { id: 0, label: 'A', x: 20, y: 20, visited: false, current: false, queued: false },
    { id: 1, label: 'B', x: 40, y: 40, visited: false, current: false, queued: false },
    { id: 2, label: 'C', x: 60, y: 20, visited: false, current: false, queued: false },
    { id: 3, label: 'D', x: 20, y: 60, visited: false, current: false, queued: false },
    { id: 4, label: 'E', x: 40, y: 80, visited: false, current: false, queued: false },
    { id: 5, label: 'F', x: 60, y: 60, visited: false, current: false, queued: false },
    { id: 6, label: 'G', x: 80, y: 40, visited: false, current: false, queued: false }
]);
var graphEdges = ref([
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
    { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 4 }, { from: 5, to: 6 }
]);
var bfsQueue = ref([]);
var bfsStep = ref(0);
var bankCustomers = ref([
    { id: 1, name: '顾客1', serving: true },
    { id: 2, name: '顾客2', serving: false },
    { id: 3, name: '顾客3', serving: false },
    { id: 4, name: '顾客4', serving: false }
]);
var messages = ref([
    { id: 1, content: '消息1' },
    { id: 2, content: '消息2' },
    { id: 3, content: '消息3' }
]);
// 颜色生成器
var colors = ['#4a6fa5', '#50a3a4', '#ff6b6b', '#ffa726', '#66bb6a', '#ab47bc', '#26c6da'];
// 导航章节
var sections = [
    { id: 'basic', title: '队列基础', icon: '📚' },
    { id: 'circular', title: '循环队列', icon: '🔄' },
    { id: 'priority', title: '优先队列', icon: '⭐' },
    { id: 'deque', title: '双端队列', icon: '↔️' },
    { id: 'bfs', title: '广度优先搜索', icon: '🔍' },
    { id: 'applications', title: '实际应用', icon: '💼' }
];
// 代码示例
var basicQueueTS = "\nclass Queue<T> {\n  private items: T[] = [];\n\n  // \u5165\u961F\n  enqueue(element: T): void {\n    this.items.push(element);\n  }\n\n  // \u51FA\u961F\n  dequeue(): T | undefined {\n    return this.items.shift();\n  }\n\n  // \u67E5\u770B\u961F\u9996\u5143\u7D20\n  front(): T | undefined {\n    return this.items[0];\n  }\n\n  // \u68C0\u67E5\u961F\u5217\u662F\u5426\u4E3A\u7A7A\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n\n  // \u83B7\u53D6\u961F\u5217\u5927\u5C0F\n  size(): number {\n    return this.items.length;\n  }\n\n  // \u6E05\u7A7A\u961F\u5217\n  clear(): void {\n    this.items = [];\n  }\n}\n".trim();
var basicQueueJS = "\nclass Queue {\n  constructor() {\n    this.items = [];\n  }\n\n  // \u5165\u961F\n  enqueue(element) {\n    this.items.push(element);\n  }\n\n  // \u51FA\u961F\n  dequeue() {\n    return this.items.shift();\n  }\n\n  // \u67E5\u770B\u961F\u9996\u5143\u7D20\n  front() {\n    return this.items[0];\n  }\n\n  // \u68C0\u67E5\u961F\u5217\u662F\u5426\u4E3A\u7A7A\n  isEmpty() {\n    return this.items.length === 0;\n  }\n\n  // \u83B7\u53D6\u961F\u5217\u5927\u5C0F\n  size() {\n    return this.items.length;\n  }\n\n  // \u6E05\u7A7A\u961F\u5217\n  clear() {\n    this.items = [];\n  }\n}\n".trim();
var circularQueueCode = "\nclass CircularQueue<T> {\n  private items: (T | null)[];\n  private front: number = 0;\n  private rear: number = 0;\n  private count: number = 0;\n\n  constructor(capacity: number) {\n    this.items = new Array(capacity).fill(null);\n  }\n\n  // \u5165\u961F\n  enqueue(element: T): boolean {\n    if (this.isFull()) return false;\n\n    this.items[this.rear] = element;\n    this.rear = (this.rear + 1) % this.items.length;\n    this.count++;\n    return true;\n  }\n\n  // \u51FA\u961F\n  dequeue(): T | null {\n    if (this.isEmpty()) return null;\n\n    const element = this.items[this.front];\n    this.items[this.front] = null;\n    this.front = (this.front + 1) % this.items.length;\n    this.count--;\n    return element;\n  }\n\n  // \u68C0\u67E5\u961F\u5217\u662F\u5426\u4E3A\u7A7A\n  isEmpty(): boolean {\n    return this.count === 0;\n  }\n\n  // \u68C0\u67E5\u961F\u5217\u662F\u5426\u5DF2\u6EE1\n  isFull(): boolean {\n    return this.count === this.items.length;\n  }\n\n  // \u67E5\u770B\u961F\u9996\u5143\u7D20\n  peek(): T | null {\n    if (this.isEmpty()) return null;\n    return this.items[this.front];\n  }\n\n  // \u83B7\u53D6\u961F\u5217\u5927\u5C0F\n  size(): number {\n    return this.count;\n  }\n}\n".trim();
var priorityQueueCode = "\nclass PriorityQueue<T> {\n  private heap: { element: T, priority: number }[] = [];\n\n  // \u5165\u961F\n  enqueue(element: T, priority: number): void {\n    this.heap.push({ element, priority });\n    this.heapifyUp(this.heap.length - 1);\n  }\n\n  // \u51FA\u961F\uFF08\u6700\u9AD8\u4F18\u5148\u7EA7\uFF09\n  dequeue(): T | null {\n    if (this.isEmpty()) return null;\n\n    const max = this.heap[0];\n    const last = this.heap.pop();\n\n    if (this.heap.length > 0 && last) {\n      this.heap[0] = last;\n      this.heapifyDown(0);\n    }\n\n    return max.element;\n  }\n\n  // \u5806\u5316\u5411\u4E0A\n  private heapifyUp(index: number): void {\n    while (index > 0) {\n      const parent = Math.floor((index - 1) / 2);\n      if (this.heap[parent].priority >= this.heap[index].priority) break;\n\n      [this.heap[parent], this.heap[index]] =\n        [this.heap[index], this.heap[parent]];\n      index = parent;\n    }\n  }\n\n  // \u5806\u5316\u5411\u4E0B\n  private heapifyDown(index: number): void {\n    const length = this.heap.length;\n    while (true) {\n      let left = 2 * index + 1;\n      let right = 2 * index + 2;\n      let largest = index;\n\n      if (left < length &&\n          this.heap[left].priority > this.heap[largest].priority) {\n        largest = left;\n      }\n\n      if (right < length &&\n          this.heap[right].priority > this.heap[largest].priority) {\n        largest = right;\n      }\n\n      if (largest === index) break;\n\n      [this.heap[index], this.heap[largest]] =\n        [this.heap[largest], this.heap[index]];\n      index = largest;\n    }\n  }\n\n  // \u68C0\u67E5\u961F\u5217\u662F\u5426\u4E3A\u7A7A\n  isEmpty(): boolean {\n    return this.heap.length === 0;\n  }\n\n  // \u67E5\u770B\u6700\u9AD8\u4F18\u5148\u7EA7\u5143\u7D20\n  peek(): T | null {\n    return this.isEmpty() ? null : this.heap[0].element;\n  }\n\n  // \u83B7\u53D6\u961F\u5217\u5927\u5C0F\n  size(): number {\n    return this.heap.length;\n  }\n}\n".trim();
var dequeCode = "\nclass Deque<T> {\n  private items: T[] = [];\n\n  // \u5728\u524D\u7AEF\u6DFB\u52A0\u5143\u7D20\n  addFront(element: T): void {\n    this.items.unshift(element);\n  }\n\n  // \u5728\u540E\u7AEF\u6DFB\u52A0\u5143\u7D20\n  addBack(element: T): void {\n    this.items.push(element);\n  }\n\n  // \u4ECE\u524D\u7AEF\u79FB\u9664\u5143\u7D20\n  removeFront(): T | undefined {\n    return this.items.shift();\n  }\n\n  // \u4ECE\u540E\u7AEF\u79FB\u9664\u5143\u7D20\n  removeBack(): T | undefined {\n    return this.items.pop();\n  }\n\n  // \u67E5\u770B\u524D\u7AEF\u5143\u7D20\n  peekFront(): T | undefined {\n    return this.items[0];\n  }\n\n  // \u67E5\u770B\u540E\u7AEF\u5143\u7D20\n  peekBack(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  // \u68C0\u67E5\u53CC\u7AEF\u961F\u5217\u662F\u5426\u4E3A\u7A7A\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n\n  // \u83B7\u53D6\u53CC\u7AEF\u961F\u5217\u5927\u5C0F\n  size(): number {\n    return this.items.length;\n  }\n\n  // \u6E05\u7A7A\u53CC\u7AEF\u961F\u5217\n  clear(): void {\n    this.items = [];\n  }\n}\n".trim();
var bfsCode = "\nfunction bfs(graph: number[][], start: number): number[] {\n  const visited: boolean[] = new Array(graph.length).fill(false);\n  const queue: number[] = [start];\n  const result: number[] = [];\n\n  visited[start] = true;\n\n  while (queue.length > 0) {\n    const node = queue.shift()!;\n    result.push(node);\n\n    for (const neighbor of graph[node]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        queue.push(neighbor);\n      }\n    }\n  }\n\n  return result;\n}\n\n// \u4F7F\u7528\u793A\u4F8B\nconst graph = [\n  [1, 2],    // \u8282\u70B90\u7684\u90BB\u5C45\n  [0, 3, 4], // \u8282\u70B91\u7684\u90BB\u5C45\n  [0, 5],    // \u8282\u70B92\u7684\u90BB\u5C45\n  [1],       // \u8282\u70B93\u7684\u90BB\u5C45\n  [1, 5],    // \u8282\u70B94\u7684\u90BB\u5C45\n  [2, 4]     // \u8282\u70B95\u7684\u90BB\u5C45\n];\n\nconsole.log(bfs(graph, 0)); // [0, 1, 2, 3, 4, 5]\n".trim();
// 队列操作
var itemCounter = 1;
var enqueueItem = function () {
    var color = colors[Math.floor(Math.random() * colors.length)];
    var newItem = {
        value: itemCounter++,
        color: color,
        animating: 'enqueue'
    };
    queueItems.value.push(newItem);
    setTimeout(function () {
        newItem.animating = undefined;
    }, 500);
};
var dequeueItem = function () {
    if (queueItems.value.length === 0)
        return;
    var item = queueItems.value[0];
    item.animating = 'dequeue';
    setTimeout(function () {
        queueItems.value.shift();
    }, 500);
};
// 循环队列操作
var circularEnqueue = function () {
    if (circularSize.value >= circularQueue.value.length)
        return;
    var value = Math.floor(Math.random() * 100) + 1;
    circularQueue.value[circularTail.value] = value;
    circularTail.value = (circularTail.value + 1) % circularQueue.value.length;
    circularSize.value++;
};
var circularDequeue = function () {
    if (circularSize.value === 0)
        return;
    circularQueue.value[circularHead.value] = null;
    circularHead.value = (circularHead.value + 1) % circularQueue.value.length;
    circularSize.value--;
};
// BFS相关函数
var getNodeX = function (nodeId) {
    var node = graphNodes.value.find(function (n) { return n.id === nodeId; });
    return node ? node.x * 0.8 + 10 : 0;
};
var getNodeY = function (nodeId) {
    var node = graphNodes.value.find(function (n) { return n.id === nodeId; });
    return node ? node.y * 0.8 + 10 : 0;
};
var getNodeLabel = function (nodeId) {
    var node = graphNodes.value.find(function (n) { return n.id === nodeId; });
    return node ? node.label : '';
};
var nextBfsStep = function () {
    if (bfsStep.value === 0) {
        // 初始化BFS
        graphNodes.value[0].current = true;
        graphNodes.value[0].queued = true;
        bfsQueue.value.push(0);
        bfsStep.value++;
    }
    else if (bfsQueue.value.length > 0) {
        // 处理下一个节点
        var currentNodeId_1 = bfsQueue.value.shift();
        var currentNode = graphNodes.value.find(function (n) { return n.id === currentNodeId_1; });
        currentNode.current = false;
        currentNode.visited = true;
        // 添加邻居节点到队列
        var neighbors = graphEdges.value
            .filter(function (edge) { return edge.from === currentNodeId_1; })
            .map(function (edge) { return edge.to; });
        neighbors.forEach(function (neighborId) {
            var neighbor = graphNodes.value.find(function (n) { return n.id === neighborId; });
            if (!neighbor.visited && !neighbor.queued) {
                neighbor.queued = true;
                bfsQueue.value.push(neighborId);
            }
        });
        // 设置新的当前节点
        if (bfsQueue.value.length > 0) {
            var nextNodeId_1 = bfsQueue.value[0];
            var nextNode = graphNodes.value.find(function (n) { return n.id === nextNodeId_1; });
            nextNode.current = true;
        }
        bfsStep.value++;
    }
};
// 滚动到指定章节
var scrollToSection = function (sectionId) {
    var element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeSection.value = sectionId;
    }
};
// 监听滚动以更新活动章节
var handleScroll = function () {
    var scrollPosition = window.scrollY + 100;
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var section = sections_1[_i];
        var element = document.getElementById(section.id);
        if (element) {
            var offsetTop = element.offsetTop;
            var offsetHeight = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection.value = section.id;
                break;
            }
        }
    }
};
// 初始化
onMounted(function () {
    // 初始化队列演示
    for (var i = 0; i < 3; i++) {
        enqueueItem();
    }
    // 初始化BFS
    graphNodes.value[0].queued = true;
    bfsQueue.value.push(0);
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(function () {
    window.removeEventListener('scroll', handleScroll);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-item']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['basic-concepts']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-types']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['example-scenarios']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['application-categories']} */ ;
/** @type {__VLS_StyleScopedClasses['method-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "queue-algorithms-intro" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "queue-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "queue-container" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.queueItems)); _i < _a.length; _i++) {
    var _b = _a[_i], item = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ key: (index) }, { class: "queue-item" }), { class: ({
            'enqueue-animation': item.animating === 'enqueue',
            'dequeue-animation': item.animating === 'dequeue'
        }) }), { style: ({
            '--item-color': item.color,
            'animation-delay': "".concat(index * 0.1, "s")
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-value" }));
    (item.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-index" }));
    (index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "queue-operations" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.enqueueItem) }, { class: "operation-btn enqueue-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "btn-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.dequeueItem) }, { class: "operation-btn dequeue-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "btn-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(__assign({ class: "nav-sidebar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(__assign({ class: "nav-list" }));
var _loop_1 = function (section) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.scrollToSection(section.id);
        } }, { key: (section.id) }), { class: ({ active: __VLS_ctx.activeSection === section.id }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "nav-icon" }));
    (section.icon);
    (section.title);
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.sections)); _c < _d.length; _c++) {
    var section = _d[_c][0];
    _loop_1(section);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "basic" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "basic-concepts" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-implementation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-tabs" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'typescript';
    } }, { class: "code-tab" }), { class: ({ active: __VLS_ctx.activeTab === 'typescript' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'javascript';
    } }, { class: "code-tab" }), { class: ({ active: __VLS_ctx.activeTab === 'javascript' }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-content" }));
if (__VLS_ctx.activeTab === 'typescript') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (__VLS_ctx.basicQueueTS);
}
if (__VLS_ctx.activeTab === 'javascript') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (__VLS_ctx.basicQueueJS);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "circular" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-demo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "circular-queue-demo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "circular-container" }));
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.circularQueue)); _e < _f.length; _e++) {
    var _g = _f[_e], cell = _g[0], index = _g[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "circular-cell" }), { class: ({
            'head': index === __VLS_ctx.circularHead,
            'tail': index === __VLS_ctx.circularTail,
            'occupied': cell !== null,
            'empty': cell === null
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "cell-value" }));
    (cell !== null ? cell : '');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "cell-index" }));
    (index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "circular-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.circularEnqueue) }, { class: "demo-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.circularDequeue) }, { class: "demo-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "circular-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.circularHead);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.circularTail);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.circularSize);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.circularQueueCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "priority" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-types" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-visual max-priority" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.maxPriorityQueue)); _h < _j.length; _h++) {
    var item = _j[_h][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-item" }, { key: (item.value) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-value" }));
    (item.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-priority" }));
    (item.priority);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-visual min-priority" }));
for (var _k = 0, _l = __VLS_getVForSourceType((__VLS_ctx.minPriorityQueue)); _k < _l.length; _k++) {
    var item = _l[_k][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "priority-item" }, { key: (item.value) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-value" }));
    (item.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "item-priority" }));
    (item.priority);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-methods" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-cards" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.priorityQueueCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "deque" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "deque-operations" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-card front-ops" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-card back-ops" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "deque-applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.dequeCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "bfs" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bfs-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-nodes" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.graphNodes)); _m < _o.length; _m++) {
    var node = _o[_m][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ key: (node.id) }, { class: "graph-node" }), { class: ({
            'visited': node.visited,
            'current': node.current,
            'queued': node.queued
        }) }), { style: ({ left: "".concat(node.x, "%"), top: "".concat(node.y, "%") }) }));
    (node.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "graph-edges" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ class: "edges-svg" }));
for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.graphEdges)); _p < _q.length; _p++) {
    var edge = _q[_p][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.line)(__assign({ key: ("".concat(edge.from, "-").concat(edge.to)), x1: (__VLS_ctx.getNodeX(edge.from)), y1: (__VLS_ctx.getNodeY(edge.from)), x2: (__VLS_ctx.getNodeX(edge.to)), y2: (__VLS_ctx.getNodeY(edge.to)) }, { class: "graph-edge" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bfs-queue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "queue-visual" }));
for (var _r = 0, _s = __VLS_getVForSourceType((__VLS_ctx.bfsQueue)); _r < _s.length; _r++) {
    var _t = _s[_r], nodeId = _t[0], index = _t[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "bfs-queue-item" }));
    (__VLS_ctx.getNodeLabel(nodeId));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.nextBfsStep) }, { class: "bfs-control" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bfs-algorithm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "algorithm-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.bfsCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "applications" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-categories" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "real-world-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-scenarios" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bank-queue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "teller-counter" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "customer-line" }));
for (var _u = 0, _v = __VLS_getVForSourceType((__VLS_ctx.bankCustomers)); _u < _v.length; _u++) {
    var customer = _v[_u][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (customer.id) }, { class: "customer" }), { class: ({ serving: customer.serving }) }));
    (customer.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scenario-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "message-queue-system" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "producer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "message-queue" }));
for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.messages)); _w < _x.length; _w++) {
    var msg = _x[_w][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (msg.id) }, { class: "message" }));
    (msg.content);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "consumer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "page-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "footer-note" }));
/** @type {__VLS_StyleScopedClasses['queue-algorithms-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['queue-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['queue-container']} */ ;
/** @type {__VLS_StyleScopedClasses['queue-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['item-index']} */ ;
/** @type {__VLS_StyleScopedClasses['queue-operations']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['enqueue-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['dequeue-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['basic-concepts']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-list']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-table']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-op']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-op']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-op']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-op']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['code-implementation']} */ ;
/** @type {__VLS_StyleScopedClasses['code-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['code-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['code-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['code-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-queue-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-container']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-value']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-index']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['circular-info']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-types']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-type']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['max-priority']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['item-priority']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-type']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['min-priority']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['item-priority']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-methods']} */ ;
/** @type {__VLS_StyleScopedClasses['method-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['method-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['method-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['method-card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['deque-operations']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['op-card']} */ ;
/** @type {__VLS_StyleScopedClasses['front-ops']} */ ;
/** @type {__VLS_StyleScopedClasses['op-list']} */ ;
/** @type {__VLS_StyleScopedClasses['op-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['op-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['op-card']} */ ;
/** @type {__VLS_StyleScopedClasses['back-ops']} */ ;
/** @type {__VLS_StyleScopedClasses['op-list']} */ ;
/** @type {__VLS_StyleScopedClasses['op-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['op-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-name']} */ ;
/** @type {__VLS_StyleScopedClasses['op-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['deque-applications']} */ ;
/** @type {__VLS_StyleScopedClasses['application-list']} */ ;
/** @type {__VLS_StyleScopedClasses['app-item']} */ ;
/** @type {__VLS_StyleScopedClasses['app-item']} */ ;
/** @type {__VLS_StyleScopedClasses['app-item']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['bfs-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-container']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-node']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-edges']} */ ;
/** @type {__VLS_StyleScopedClasses['edges-svg']} */ ;
/** @type {__VLS_StyleScopedClasses['graph-edge']} */ ;
/** @type {__VLS_StyleScopedClasses['bfs-queue']} */ ;
/** @type {__VLS_StyleScopedClasses['queue-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['bfs-queue-item']} */ ;
/** @type {__VLS_StyleScopedClasses['bfs-control']} */ ;
/** @type {__VLS_StyleScopedClasses['bfs-algorithm']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['application-categories']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['real-world-example']} */ ;
/** @type {__VLS_StyleScopedClasses['example-scenarios']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['bank-queue']} */ ;
/** @type {__VLS_StyleScopedClasses['teller-counter']} */ ;
/** @type {__VLS_StyleScopedClasses['customer-line']} */ ;
/** @type {__VLS_StyleScopedClasses['customer']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['message-queue-system']} */ ;
/** @type {__VLS_StyleScopedClasses['producer']} */ ;
/** @type {__VLS_StyleScopedClasses['message-queue']} */ ;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['consumer']} */ ;
/** @type {__VLS_StyleScopedClasses['page-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeSection: activeSection,
            activeTab: activeTab,
            queueItems: queueItems,
            circularQueue: circularQueue,
            circularHead: circularHead,
            circularTail: circularTail,
            circularSize: circularSize,
            maxPriorityQueue: maxPriorityQueue,
            minPriorityQueue: minPriorityQueue,
            graphNodes: graphNodes,
            graphEdges: graphEdges,
            bfsQueue: bfsQueue,
            bankCustomers: bankCustomers,
            messages: messages,
            sections: sections,
            basicQueueTS: basicQueueTS,
            basicQueueJS: basicQueueJS,
            circularQueueCode: circularQueueCode,
            priorityQueueCode: priorityQueueCode,
            dequeCode: dequeCode,
            bfsCode: bfsCode,
            enqueueItem: enqueueItem,
            dequeueItem: dequeueItem,
            circularEnqueue: circularEnqueue,
            circularDequeue: circularDequeue,
            getNodeX: getNodeX,
            getNodeY: getNodeY,
            getNodeLabel: getNodeLabel,
            nextBfsStep: nextBfsStep,
            scrollToSection: scrollToSection,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
