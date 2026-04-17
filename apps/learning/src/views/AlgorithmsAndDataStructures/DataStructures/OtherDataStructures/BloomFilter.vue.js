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
import { ref, computed, onMounted, onUnmounted } from 'vue';
// 响应式数据
var activeSection = ref('overview');
var demoInput = ref('');
var demoBitArray = ref(Array(20).fill(0));
var checkedBits = ref([]);
var isFalsePositive = ref(false);
var resultMessage = ref('输入元素进行检查');
var expectedElements = ref(10000);
var acceptableError = ref(0.01);
// 位数组动画
var bitArray = ref(Array(12).fill(0));
onMounted(function () {
    // 初始化一些激活的位
    setTimeout(function () {
        [2, 5, 7, 10].forEach(function (i) {
            bitArray.value[i] = 1;
        });
    }, 500);
});
// 误判率数据
var falsePositiveData = [
    { name: '10%填充', value: 0.008 },
    { name: '25%填充', value: 0.03 },
    { name: '50%填充', value: 0.11 },
    { name: '75%填充', value: 0.28 },
    { name: '90%填充', value: 0.48 }
];
// 导航章节
var sections = [
    { id: 'overview', title: '概述', icon: '🔍' },
    { id: 'features', title: '核心特点', icon: '⭐' },
    { id: 'workflow', title: '工作原理', icon: '⚙️' },
    { id: 'applications', title: '适用场景', icon: '💡' },
    { id: 'implementation', title: '算法实现', icon: '🔧' }
];
// 应用场景
var applications = [
    {
        icon: '🌐',
        title: '网络爬虫',
        description: '避免重复爬取已访问的URL',
        example: 'Google爬虫使用布隆过滤器记录已爬取的URL'
    },
    {
        icon: '💾',
        title: '数据库系统',
        description: '减少不必要的磁盘查询',
        example: 'Cassandra、HBase使用布隆过滤器判断键是否存在'
    },
    {
        icon: '🛡️',
        title: '安全防护',
        description: '检测恶意URL或垃圾邮件',
        example: 'Chrome浏览器使用布隆过滤器检测恶意网站'
    },
    {
        icon: '🔍',
        title: '缓存系统',
        description: '避免缓存穿透问题',
        example: 'Redis布隆过滤器插件用于缓存校验'
    },
    {
        icon: '📱',
        title: '推荐系统',
        description: '快速过滤已展示内容',
        example: '新闻APP过滤已读新闻'
    },
    {
        icon: '🔢',
        title: '分布式系统',
        description: '减少节点间通信',
        example: 'BitTorrent使用布隆过滤器同步peer信息'
    }
];
// 数据结构对比
var comparisonData = [
    { property: '空间效率', bloom: '极高', hash: '中等', tree: '较低' },
    { property: '查询时间', bloom: 'O(k)', hash: 'O(1)', tree: 'O(log n)' },
    { property: '插入时间', bloom: 'O(k)', hash: 'O(1)', tree: 'O(log n)' },
    { property: '删除支持', bloom: '否', hash: '是', tree: '是' },
    { property: '内存占用', bloom: '极小', hash: '中等', tree: '较大' },
    { property: '误判可能', bloom: '是', hash: '否', tree: '否' }
];
// 布隆过滤器变种
var bloomVariants = [
    {
        name: '计数布隆过滤器',
        description: '支持删除操作的改进版本',
        pros: '支持删除操作，功能更完整',
        cons: '空间占用增加，实现更复杂'
    },
    {
        name: '阻塞布隆过滤器',
        description: '减少误判率的变种',
        pros: '误判率更低，性能更好',
        cons: '实现复杂，适用场景有限'
    },
    {
        name: '可扩展布隆过滤器',
        description: '动态调整大小的版本',
        pros: '自动扩容，适应数据量变化',
        cons: '实现复杂，性能有损耗'
    }
];
// 布隆过滤器代码示例
var bloomFilterCode = "\nclass BloomFilter {\n  private size: number;\n  private hashCount: number;\n  private bitArray: number[];\n\n  constructor(expectedItems: number, falsePositiveRate: number) {\n    this.size = Math.ceil(\n      - (expectedItems * Math.log(falsePositiveRate)) /\n      (Math.log(2) ** 2)\n    );\n    this.hashCount = Math.ceil(\n      (this.size / expectedItems) * Math.log(2)\n    );\n    this.bitArray = new Array(this.size).fill(0);\n  }\n\n  // \u6DFB\u52A0\u5143\u7D20\n  add(item: string): void {\n    for (let i = 0; i < this.hashCount; i++) {\n      const position = this.hash(item, i) % this.size;\n      this.bitArray[position] = 1;\n    }\n  }\n\n  // \u68C0\u67E5\u5143\u7D20\n  mightContain(item: string): boolean {\n    for (let i = 0; i < this.hashCount; i++) {\n      const position = this.hash(item, i) % this.size;\n      if (this.bitArray[position] === 0) {\n        return false; // \u80AF\u5B9A\u4E0D\u5B58\u5728\n      }\n    }\n    return true; // \u53EF\u80FD\u5B58\u5728\n  }\n\n  // \u7B80\u5355\u7684\u54C8\u5E0C\u51FD\u6570\n  private hash(item: string, seed: number): number {\n    let hash = 0;\n    for (let i = 0; i < item.length; i++) {\n      hash = (hash << 5) - hash + item.charCodeAt(i) + seed;\n      hash |= 0; // \u8F6C\u6362\u4E3A32\u4F4D\u6574\u6570\n    }\n    return Math.abs(hash);\n  }\n}\n".trim();
// 计算参数
var calculatedM = computed(function () {
    var n = expectedElements.value;
    var p = acceptableError.value;
    return Math.ceil(-(n * Math.log(p)) / (Math.pow(Math.log(2), 2)));
});
var calculatedK = computed(function () {
    var n = expectedElements.value;
    var m = calculatedM.value;
    return Math.ceil((m / n) * Math.log(2));
});
// 演示功能
var checkElement = function () {
    if (!demoInput.value.trim())
        return;
    // 简单哈希函数模拟
    var hashPositions = [
        (demoInput.value.charCodeAt(0) || 0) % 20,
        (demoInput.value.length * 7) % 20,
        (demoInput.value.split('').reduce(function (a, b) { return a + b.charCodeAt(0); }, 0) * 13) % 20
    ];
    checkedBits.value = hashPositions;
    // 检查是否所有位都是1（模拟存在情况）
    var allBitsSet = hashPositions.every(function (pos) { return demoBitArray.value[pos] === 1; });
    // 模拟误判：如果输入包含"test"且不是我们预先设置的，就模拟误判
    if (demoInput.value.includes('test') && !['test1', 'test2', 'test3'].includes(demoInput.value)) {
        isFalsePositive.value = true;
        resultMessage.value = '元素可能存在（误判）';
    }
    else if (allBitsSet) {
        isFalsePositive.value = false;
        resultMessage.value = '元素可能存在';
    }
    else {
        isFalsePositive.value = false;
        resultMessage.value = '元素肯定不存在';
    }
};
// 比较表格的样式类
var getComparisonClass = function (value, type) {
    if (value === '极高' || value === 'O(k)' || value === '极小')
        return 'best';
    if (value === '是')
        return 'warning';
    return '';
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
// 初始化演示位数组
onMounted(function () {
    // 设置一些初始数据
    ['apple', 'banana', 'cherry'].forEach(function (item) {
        var positions = [
            (item.charCodeAt(0)) % 20,
            (item.length * 7) % 20,
            (item.split('').reduce(function (a, b) { return a + b.charCodeAt(0); }, 0) * 13) % 20
        ];
        positions.forEach(function (pos) {
            demoBitArray.value[pos] = 1;
        });
    });
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
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['false-positive']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristics']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-options']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['application-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['calculator-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bloom-filter-intro" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "page-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-demo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bit-array" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.bitArray)); _i < _a.length; _i++) {
    var _b = _a[_i], bit = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ key: (index) }, { class: "bit" }), { class: ({ active: bit }) }), { style: ({ animationDelay: "".concat(index * 0.1, "s") }) }));
    (bit ? '1' : '0');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-functions" }));
for (var _c = 0, _d = __VLS_getVForSourceType((3)); _c < _d.length; _c++) {
    var n = _d[_c][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-function" }, { key: (n) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "hash-label" }));
    (n);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-arrow" }));
}
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
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.sections)); _e < _f.length; _e++) {
    var section = _f[_e][0];
    _loop_1(section);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "overview" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-cards" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "features" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristics" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic positive" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "characteristic negative" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "false-positive-demo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "false-positive-chart" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-container" }));
for (var _g = 0, _h = __VLS_getVForSourceType((__VLS_ctx.falsePositiveData)); _g < _h.length; _g++) {
    var item = _h[_g][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ class: "chart-bar" }, { key: (item.name) }), { style: ({ height: "".concat(item.value * 2, "px") }) }), { title: ("".concat(item.name, ": ").concat((item.value * 100).toFixed(2), "%")) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "bar-value" }));
    ((item.value * 100).toFixed(1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "bar-label" }));
    (item.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "chart-note" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "workflow" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "workflow-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-snippet" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-snippet" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-snippet" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ onKeyup: (__VLS_ctx.checkElement) }, { placeholder: "输入要检查的元素" }), { class: "demo-input" }));
(__VLS_ctx.demoInput);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.checkElement) }, { class: "demo-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-result" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bit-array-visual" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.demoBitArray)); _j < _k.length; _j++) {
    var _l = _k[_j], bit = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "visual-bit" }), { class: ({
            active: bit,
            checked: __VLS_ctx.checkedBits.includes(index),
            'false-positive': __VLS_ctx.isFalsePositive && __VLS_ctx.checkedBits.includes(index)
        }) }));
    (index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result-message" }, { class: ({ 'false-positive': __VLS_ctx.isFalsePositive }) }));
(__VLS_ctx.resultMessage);
if (__VLS_ctx.checkedBits.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-positions" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.checkedBits.join(', '));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "applications" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-grid" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.applications)); _m < _o.length; _m++) {
    var app = _o[_m][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }, { key: (app.title) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
    (app.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (app.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (app.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (app.example);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "vs-traditional" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }));
for (var _p = 0, _q = __VLS_getVForSourceType((__VLS_ctx.comparisonData)); _p < _q.length; _p++) {
    var row = _q[_p][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }, { key: (row.property) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell property" }));
    (row.property);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }, { class: (__VLS_ctx.getComparisonClass(row.bloom, 'bloom')) }));
    (row.bloom);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }, { class: (__VLS_ctx.getComparisonClass(row.hash, 'hash')) }));
    (row.hash);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-cell" }, { class: (__VLS_ctx.getComparisonClass(row.tree, 'tree')) }));
    (row.tree);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "implementation" }, { class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-options" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "impl-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "formula-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "formula-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "formula-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "param-calculator" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculator-inputs" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "number",
    min: "100",
    max: "10000000",
});
(__VLS_ctx.expectedElements);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "number",
    min: "0.001",
    max: "0.1",
    step: "0.001",
});
(__VLS_ctx.acceptableError);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculator-results" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.calculatedM.toLocaleString());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.calculatedK);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
((__VLS_ctx.calculatedM / 8 / 1024).toFixed(2));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "impl-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.bloomFilterCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variants" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-cards" }));
for (var _r = 0, _s = __VLS_getVForSourceType((__VLS_ctx.bloomVariants)); _r < _s.length; _r++) {
    var variant = _s[_r][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-card" }, { key: (variant.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (variant.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (variant.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "variant-pros-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (variant.pros);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (variant.cons);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "page-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "footer-note" }));
/** @type {__VLS_StyleScopedClasses['bloom-filter-intro']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['bit-array']} */ ;
/** @type {__VLS_StyleScopedClasses['bit']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-functions']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-function']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-list']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristics']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic']} */ ;
/** @type {__VLS_StyleScopedClasses['positive']} */ ;
/** @type {__VLS_StyleScopedClasses['characteristic']} */ ;
/** @type {__VLS_StyleScopedClasses['negative']} */ ;
/** @type {__VLS_StyleScopedClasses['false-positive-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['false-positive-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-value']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-note']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-snippet']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-snippet']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-snippet']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-container']} */ ;
/** @type {__VLS_StyleScopedClasses['input-section']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-input']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-button']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-result']} */ ;
/** @type {__VLS_StyleScopedClasses['bit-array-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-bit']} */ ;
/** @type {__VLS_StyleScopedClasses['result-message']} */ ;
/** @type {__VLS_StyleScopedClasses['hash-positions']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['application-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-example']} */ ;
/** @type {__VLS_StyleScopedClasses['vs-traditional']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['property']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-options']} */ ;
/** @type {__VLS_StyleScopedClasses['impl-card']} */ ;
/** @type {__VLS_StyleScopedClasses['formula']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-item']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-label']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-item']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-label']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-item']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-label']} */ ;
/** @type {__VLS_StyleScopedClasses['param-calculator']} */ ;
/** @type {__VLS_StyleScopedClasses['calculator-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['calculator-results']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['impl-card']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['variants']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-card']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['page-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            activeSection: activeSection,
            demoInput: demoInput,
            demoBitArray: demoBitArray,
            checkedBits: checkedBits,
            isFalsePositive: isFalsePositive,
            resultMessage: resultMessage,
            expectedElements: expectedElements,
            acceptableError: acceptableError,
            bitArray: bitArray,
            falsePositiveData: falsePositiveData,
            sections: sections,
            applications: applications,
            comparisonData: comparisonData,
            bloomVariants: bloomVariants,
            bloomFilterCode: bloomFilterCode,
            calculatedM: calculatedM,
            calculatedK: calculatedK,
            checkElement: checkElement,
            getComparisonClass: getComparisonClass,
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
