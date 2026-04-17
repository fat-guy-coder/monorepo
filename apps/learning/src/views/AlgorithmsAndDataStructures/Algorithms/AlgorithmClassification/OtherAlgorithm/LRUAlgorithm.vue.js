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
import { ref, computed, reactive } from 'vue';
// LRU节点类
var LRUNode = /** @class */ (function () {
    function LRUNode(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    return LRUNode;
}());
// LRU缓存类
var LRUCache = /** @class */ (function () {
    function LRUCache(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.accessCount = 0;
        this.hitCount = 0;
        // 使用虚拟头尾节点
        this.head = new LRUNode(null, null);
        this.tail = new LRUNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    // 将节点移到链表头部
    LRUCache.prototype.moveToHead = function (node) {
        this.removeNode(node);
        this.addToHead(node);
    };
    // 从链表中移除节点
    LRUCache.prototype.removeNode = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    };
    // 添加节点到头部
    LRUCache.prototype.addToHead = function (node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    };
    // 移除尾部节点
    LRUCache.prototype.removeTail = function () {
        var node = this.tail.prev;
        this.removeNode(node);
        return node;
    };
    // 获取数据
    LRUCache.prototype.get = function (key) {
        this.accessCount++;
        if (!this.cache.has(key))
            return null;
        this.hitCount++;
        var node = this.cache.get(key);
        this.moveToHead(node);
        return node.value;
    };
    // 插入数据
    LRUCache.prototype.put = function (key, value) {
        if (this.cache.has(key)) {
            var node = this.cache.get(key);
            node.value = value;
            this.moveToHead(node);
        }
        else {
            var node = new LRUNode(key, value);
            this.cache.set(key, node);
            this.addToHead(node);
            if (this.cache.size > this.capacity) {
                var tail = this.removeTail();
                this.cache.delete(tail.key);
                return tail; // 返回被移除的节点
            }
        }
        return null;
    };
    Object.defineProperty(LRUCache.prototype, "size", {
        // 获取缓存大小
        get: function () {
            return this.cache.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LRUCache.prototype, "hitRate", {
        // 获取命中率
        get: function () {
            return this.accessCount > 0
                ? Math.round((this.hitCount / this.accessCount) * 100)
                : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LRUCache.prototype, "nodes", {
        // 获取所有节点（按链表顺序）
        get: function () {
            var nodes = [];
            var current = this.head.next;
            while (current && current !== this.tail) {
                nodes.push(current);
                current = current.next;
            }
            return nodes;
        },
        enumerable: false,
        configurable: true
    });
    return LRUCache;
}());
// 演示数据
var capacity = ref(5);
var newKey = ref('');
var newValue = ref('');
var accessKey = ref('');
var operationLogs = ref([]);
var lruCache = reactive(new LRUCache(capacity.value));
// 缓存节点（用于显示）
var cacheNodes = computed(function () {
    return lruCache.nodes.map(function (node) { return ({
        key: node.key,
        value: node.value,
        isNew: false,
        accessed: false
    }); });
});
// 命中率
var hitRate = computed(function () { return lruCache.hitRate; });
// 添加数据
function addItem() {
    if (!newKey.value || !newValue.value)
        return;
    var removedNode = lruCache.put(newKey.value, newValue.value);
    // 标记新添加的节点
    var newNode = cacheNodes.value.find(function (node) { return node.key === newKey.value; });
    if (newNode) {
        newNode.isNew = true;
        setTimeout(function () { return newNode.isNew = false; }, 1000);
    }
    // 记录操作日志
    var log = "\u6DFB\u52A0\u6570\u636E: ".concat(newKey.value, " = ").concat(newValue.value);
    operationLogs.value.unshift(log);
    if (removedNode) {
        var removeLog = "\u7F13\u5B58\u5DF2\u6EE1\uFF0C\u79FB\u9664\u6570\u636E: ".concat(removedNode.key);
        operationLogs.value.unshift(removeLog);
    }
    // 重置输入
    newKey.value = '';
    newValue.value = '';
}
// 访问数据
function accessItem(key) {
    var accessKeyValue = key || accessKey.value;
    if (!accessKeyValue)
        return;
    var value = lruCache.get(accessKeyValue);
    if (value === null) {
        var log = "\u8BBF\u95EE\u5931\u8D25: \u952E ".concat(accessKeyValue, " \u4E0D\u5B58\u5728");
        operationLogs.value.unshift(log);
    }
    else {
        // 标记访问的节点
        var accessedNode_1 = cacheNodes.value.find(function (node) { return node.key === accessKeyValue; });
        if (accessedNode_1) {
            accessedNode_1.accessed = true;
            setTimeout(function () { return accessedNode_1.accessed = false; }, 1000);
        }
        var log = "\u8BBF\u95EE\u6570\u636E: ".concat(accessKeyValue, " = ").concat(value);
        operationLogs.value.unshift(log);
    }
    // 重置输入
    accessKey.value = '';
}
// 重置缓存
function resetCache() {
    lruCache.cache.clear();
    lruCache.head.next = lruCache.tail;
    lruCache.tail.prev = lruCache.head;
    operationLogs.value.unshift('缓存已重置');
}
// 初始添加一些数据
var initialData = [
    { key: 'A', value: 'Apple' },
    { key: 'B', value: 'Banana' },
    { key: 'C', value: 'Cherry' },
    { key: 'D', value: 'Date' }
];
initialData.forEach(function (item) {
    lruCache.put(item.key, item.value);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "lru-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "columns" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "data-structure" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ds-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "usage-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "usage-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "usage-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "usage-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "usage-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "section demo-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.capacity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "range",
    min: "3",
    max: "10",
});
(__VLS_ctx.capacity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ onKeyup: (__VLS_ctx.addItem) }, { placeholder: "输入键" }));
(__VLS_ctx.newKey);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ onKeyup: (__VLS_ctx.addItem) }, { placeholder: "输入值" }));
(__VLS_ctx.newValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.addItem) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ onKeyup: (__VLS_ctx.accessItem) }, { placeholder: "输入要访问的键" }));
(__VLS_ctx.accessKey);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.accessItem) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetCache) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-display" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-label" }));
(__VLS_ctx.capacity);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-stats" }));
(__VLS_ctx.hitRate);
(__VLS_ctx.lruCache.size);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-body" }));
var _loop_1 = function (node, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.accessItem(node.key);
        } }, { key: (node.key) }), { class: "cache-item" }), { class: ({
            'new-item': node.isNew,
            'accessed': node.accessed
        }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-key" }));
    (node.key);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-value" }));
    (node.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cache-status" }));
    if (index === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else if (index === __VLS_ctx.cacheNodes.length - 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.cacheNodes)); _i < _a.length; _i++) {
    var _b = _a[_i], node = _b[0], index = _b[1];
    _loop_1(node, index);
}
if (__VLS_ctx.cacheNodes.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-cache" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-log" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "log-container" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.operationLogs)); _c < _d.length; _c++) {
    var _e = _d[_c], log = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "log-entry" }));
    (log);
}
if (__VLS_ctx.operationLogs.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-log" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "lru-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['lru-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['columns']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['data-structure']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ds-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['operations']} */ ;
/** @type {__VLS_StyleScopedClasses['op']} */ ;
/** @type {__VLS_StyleScopedClasses['op-title']} */ ;
/** @type {__VLS_StyleScopedClasses['op']} */ ;
/** @type {__VLS_StyleScopedClasses['op-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['code-group']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-group']} */ ;
/** @type {__VLS_StyleScopedClasses['visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-display']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-header']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-label']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-body']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-item']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-key']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-value']} */ ;
/** @type {__VLS_StyleScopedClasses['cache-status']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-cache']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-log']} */ ;
/** @type {__VLS_StyleScopedClasses['log-container']} */ ;
/** @type {__VLS_StyleScopedClasses['log-entry']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-log']} */ ;
/** @type {__VLS_StyleScopedClasses['lru-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            capacity: capacity,
            newKey: newKey,
            newValue: newValue,
            accessKey: accessKey,
            operationLogs: operationLogs,
            lruCache: lruCache,
            cacheNodes: cacheNodes,
            hitRate: hitRate,
            addItem: addItem,
            accessItem: accessItem,
            resetCache: resetCache,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
