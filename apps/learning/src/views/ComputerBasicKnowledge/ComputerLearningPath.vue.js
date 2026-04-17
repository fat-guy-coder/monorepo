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
var roadmapItems = [
    {
        id: 1,
        icon: '🖥️',
        title: '硬件基础与计算机组成',
        description: '理解计算机底层硬件工作原理，从晶体管到 CPU，建立“软硬结合”的认知基础。',
        topics: [
            '数字逻辑与布尔代数',
            '冯·诺依曼结构',
            'CPU 与指令集',
            '存储器层次结构',
            '总线与 I/O 系统',
            '汇编语言初步'
        ]
    },
    {
        id: 2,
        icon: '⚙️',
        title: '操作系统',
        description: '学习操作系统如何管理硬件资源，并为应用提供抽象、安全、高效的运行环境。',
        topics: [
            '进程与线程管理',
            '同步与死锁',
            '内存管理（虚拟内存）',
            '文件系统',
            'I/O 与设备驱动',
            '操作系统设计与实现'
        ]
    },
    {
        id: 3,
        icon: '🌐',
        title: '计算机网络',
        description: '掌握数据如何在网络中传输，理解互联网核心协议与网络编程模型。',
        topics: [
            'OSI / TCP-IP 模型',
            'HTTP / HTTPS 协议',
            'TCP 与 UDP',
            'IP 与路由',
            'DNS 与 CDN',
            '网络安全基础'
        ]
    },
    {
        id: 4,
        icon: '📊',
        title: '数据结构与算法',
        description: '培养计算思维，学习高效组织数据与解决问题的方法，是编程内功的核心。',
        topics: [
            '数组、链表、栈、队列',
            '树、图、堆、散列表',
            '排序与搜索算法',
            '递归与动态规划',
            '算法复杂度分析',
            '常用算法范式'
        ]
    },
    {
        id: 5,
        icon: '🗄️',
        title: '数据库系统',
        description: '理解数据存储、查询与事务处理，掌握关系型及非关系型数据库的使用与原理。',
        topics: [
            '关系模型与 SQL',
            '索引与查询优化',
            '事务与并发控制',
            '数据库设计范式',
            'NoSQL 与 NewSQL',
            '数据仓库与大数据基础'
        ]
    },
    {
        id: 6,
        icon: '📝',
        title: '编程语言与编译原理',
        description: '深入至少一门系统级语言，理解程序从源码到可执行文件的全过程。',
        topics: [
            'C / C++ / Rust 核心特性',
            '面向对象与函数式编程',
            '内存管理与指针',
            '编译与链接过程',
            '词法、语法分析',
            '虚拟机与运行时'
        ]
    },
    {
        id: 7,
        icon: '🏛️',
        title: '系统设计与架构',
        description: '学习如何构建可扩展、高可用、易维护的大型软件系统。',
        topics: [
            '设计模式与原则',
            '分布式系统理论',
            '微服务与容器化',
            '缓存、消息队列',
            '负载均衡与高可用',
            'CAP 与 BASE 理论'
        ]
    },
    {
        id: 8,
        icon: '🚀',
        title: '工程实践与软技能',
        description: '将理论转化为生产力，掌握现代软件开发流程与团队协作方法。',
        topics: [
            'Git 与版本控制',
            '自动化测试与 CI/CD',
            '代码可读性与重构',
            '文档与沟通',
            '调试与性能分析',
            '项目规划与管理'
        ]
    }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['connector']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone-left']} */ ;
/** @type {__VLS_StyleScopedClasses['step-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "roadmap-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "roadmap-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "header-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "timeline" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.roadmapItems)); _i < _a.length; _i++) {
    var _b = _a[_i], item = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (item.id) }, { class: "milestone" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "milestone-left" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-indicator" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "step-icon" }));
    (item.icon);
    if (index < __VLS_ctx.roadmapItems.length - 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "connector" }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "milestone-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "card-description" }));
    (item.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "topics" }));
    for (var _c = 0, _d = __VLS_getVForSourceType((item.topics)); _c < _d.length; _c++) {
        var topic = _d[_c][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (topic) }, { class: "topic-tag" }));
        (topic);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-note" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
/** @type {__VLS_StyleScopedClasses['roadmap-container']} */ ;
/** @type {__VLS_StyleScopedClasses['roadmap-card']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone-left']} */ ;
/** @type {__VLS_StyleScopedClasses['step-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['connector']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-description']} */ ;
/** @type {__VLS_StyleScopedClasses['topics']} */ ;
/** @type {__VLS_StyleScopedClasses['topic-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            roadmapItems: roadmapItems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
