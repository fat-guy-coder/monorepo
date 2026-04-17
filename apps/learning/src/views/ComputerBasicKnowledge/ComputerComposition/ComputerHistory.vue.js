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
// 计算机发展时代数据
var computerEras = ref([
    {
        period: "机械计算时代",
        years: "1600s-1930s",
        techTags: ["齿轮系统", "差分机", "分析机"],
        milestones: [
            {
                year: "1642",
                title: "帕斯卡计算器",
                description: "布莱兹·帕斯卡发明了第一台机械计算器，可进行加减运算",
                people: "布莱兹·帕斯卡",
                impact: "奠定了机械计算的基础"
            },
            {
                year: "1822",
                title: "差分机设计",
                description: "查尔斯·巴贝奇设计差分机，可计算多项式函数",
                people: "查尔斯·巴贝奇",
                impact: "开创了可编程计算机的概念"
            },
            {
                year: "1890",
                title: "霍尔瑞斯制表机",
                description: "使用穿孔卡片处理1890年美国人口普查数据",
                people: "赫尔曼·霍尔瑞斯",
                impact: "开启了自动数据处理时代"
            }
        ]
    },
    {
        period: "电子管时代",
        years: "1940s-1950s",
        techTags: ["真空管", "机器语言", "穿孔卡片"],
        milestones: [
            {
                year: "1943",
                title: "巨人计算机",
                description: "英国用于破解德国密码的第一台可编程电子计算机",
                impact: "加速二战结束进程"
            },
            {
                year: "1946",
                title: "ENIAC诞生",
                description: "第一台通用电子计算机，重30吨，占地167平方米",
                people: "莫奇利和埃克特",
                impact: "每秒5000次运算，比人工计算快1000倍"
            },
            {
                year: "1949",
                title: "EDSAC",
                description: "第一台存储程序式计算机",
                people: "莫里斯·威尔克斯",
                impact: "确立了现代计算机体系结构"
            }
        ]
    },
    {
        period: "晶体管时代",
        years: "1950s-1960s",
        techTags: ["晶体管", "高级语言", "磁芯内存"],
        milestones: [
            {
                year: "1954",
                title: "TRADIC",
                description: "第一台全晶体管计算机",
                impact: "体积和功耗大幅降低"
            },
            {
                year: "1957",
                title: "FORTRAN语言",
                description: "第一种高级编程语言",
                people: "约翰·巴克斯",
                impact: "编程效率提高10倍"
            },
            {
                year: "1964",
                title: "IBM System/360",
                description: "第一款兼容的计算机系统家族",
                impact: "确立了计算机兼容性标准"
            }
        ]
    },
    {
        period: "集成电路时代",
        years: "1960s-1970s",
        techTags: ["集成电路", "操作系统", "分时系统"],
        milestones: [
            {
                year: "1965",
                title: "摩尔定律提出",
                description: "集成电路上的晶体管数量每18-24个月翻一番",
                people: "戈登·摩尔",
                impact: "预测了计算能力指数级增长"
            },
            {
                year: "1969",
                title: "UNIX操作系统",
                description: "第一个现代操作系统",
                people: "肯·汤普森和丹尼斯·里奇",
                impact: "影响至今的操作系统设计"
            },
            {
                year: "1971",
                title: "微处理器诞生",
                description: "Intel 4004 - 第一个商用微处理器",
                people: "泰德·霍夫",
                impact: "开启个人计算机时代"
            }
        ]
    },
    {
        period: "个人计算机时代",
        years: "1970s-1990s",
        techTags: ["微处理器", "GUI", "个人电脑"],
        milestones: [
            {
                year: "1976",
                title: "Apple I",
                description: "史蒂夫·沃兹尼亚克设计的首批个人计算机之一",
                people: "史蒂夫·沃兹尼亚克",
                impact: "开创了家用计算机市场"
            },
            {
                year: "1981",
                title: "IBM PC",
                description: "定义了个人计算机标准",
                impact: "一年内售出20万台"
            },
            {
                year: "1984",
                title: "Macintosh",
                description: "首款成功商业化的图形界面计算机",
                people: "苹果公司",
                impact: "改变了人机交互方式"
            }
        ]
    },
    {
        period: "互联网时代",
        years: "1990s-2000s",
        techTags: ["互联网", "万维网", "搜索引擎"],
        milestones: [
            {
                year: "1991",
                title: "万维网诞生",
                description: "蒂姆·伯纳斯-李发明了WWW和第一个网页浏览器",
                people: "蒂姆·伯纳斯-李",
                impact: "连接全球信息"
            },
            {
                year: "1998",
                title: "Google成立",
                description: "革命性的PageRank搜索算法",
                impact: "信息检索方式的根本变革"
            },
            {
                year: "2007",
                title: "iPhone发布",
                description: "重新定义移动计算",
                people: "苹果公司",
                impact: "开启移动互联网时代"
            }
        ]
    },
    {
        period: "人工智能时代",
        years: "2010s-至今",
        techTags: ["深度学习", "云计算", "量子计算"],
        milestones: [
            {
                year: "2012",
                title: "深度学习突破",
                description: "AlexNet在ImageNet竞赛中大幅降低错误率",
                impact: "开启现代AI浪潮"
            },
            {
                year: "2016",
                title: "AlphaGo战胜李世石",
                description: "AI首次在围棋上击败人类世界冠军",
                people: "DeepMind",
                impact: "展示AI在复杂决策中的能力"
            },
            {
                year: "2020",
                title: "GPT-3发布",
                description: "1750亿参数的自然语言处理模型",
                people: "OpenAI",
                impact: "展示大规模语言模型的潜力"
            },
            {
                year: "2025",
                title: "DeepSeek发布",
                description: "1750亿参数的自然语言处理模型，",
                people: "DeepSeek",
                impact: "展示大规模语言模型的潜力，开启AI新时代"
            },
            {
                year: "2025",
                title: "Claude 4发布",
                description: "拥有高级推理、视觉分析、代码生成、多语言处理、多模态等能力",
                people: "Anthropic",
                impact: "再次冲击AI领域"
            },
            {
                year: "2025",
                title: "抓住AI浪潮",
                description: "你能看到这句话，你我都有机会，成为受益者",
                people: "你和我",
                impact: "成为风口上的猪，飞一点点也可以，不要错过"
            }
        ]
    }
]);
// 技术演进数据
var hardwareEvolution = ref([
    { period: "1940s", description: "真空管 - 房间大小的计算机" },
    { period: "1950s", description: "晶体管 - 冰箱大小的计算机" },
    { period: "1960s", description: "集成电路 - 书桌大小的计算机" },
    { period: "1970s", description: "微处理器 - 个人电脑诞生" },
    { period: "1980s", description: "超大规模集成电路 - 便携式计算机" },
    { period: "2000s", description: "多核处理器 - 并行计算普及" },
    { period: "2010s", description: "GPU加速计算 - 深度学习革命" },
    { period: "2020s", description: "专用AI芯片 - TPU/NPU" }
]);
var softwareEvolution = ref([
    { period: "1940s", description: "机器语言 - 二进制编程" },
    { period: "1950s", description: "汇编语言 - 符号化编程" },
    { period: "1957", description: "FORTRAN - 首个高级语言" },
    { period: "1960s", description: "操作系统 - 管理硬件资源" },
    { period: "1970s", description: "C语言 - 系统编程标准" },
    { period: "1980s", description: "面向对象编程 - C++/Smalltalk" },
    { period: "1990s", description: "互联网技术 - HTML/JavaScript" },
    { period: "2000s", description: "开源运动 - Linux/Android" },
    { period: "2010s", description: "容器化 - Docker/Kubernetes" }
]);
var theoryEvolution = ref([
    { year: "1936", description: "图灵机模型", scientist: "艾伦·图灵" },
    { year: "1945", description: "冯·诺依曼架构", scientist: "约翰·冯·诺依曼" },
    { year: "1948", description: "信息论", scientist: "克劳德·香农" },
    { year: "1965", description: "摩尔定律", scientist: "戈登·摩尔" },
    { year: "1976", description: "RSA加密算法", scientist: "Rivest, Shamir, Adleman" },
    { year: "1994", description: "Shor量子算法", scientist: "彼得·秀尔" }
]);
// 计算速度比较数据
var computingSpeed = ref([
    { era: "1946 ENIAC", speed: "500 FLOPS", width: "5%", example: "每秒500次加法运算" },
    { era: "1954 IBM 704", speed: "12,000 FLOPS", width: "10%", example: "第一个浮点运算计算机" },
    { era: "1964 CDC 6600", speed: "3 MFLOPS", width: "15%", example: "当时最快的超级计算机" },
    { era: "1976 Cray-1", speed: "160 MFLOPS", width: "25%", example: "向量处理架构" },
    { era: "1996 ASCI Red", speed: "1 TFLOPS", width: "40%", example: "首个teraFLOPS计算机" },
    { era: "2008 Roadrunner", speed: "1 PFLOPS", width: "60%", example: "首个petaFLOPS计算机" },
    { era: "2022 Frontier", speed: "1.1 EFLOPS", width: "95%", example: "首个exaFLOPS超级计算机" }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['era-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone']} */ ;
/** @type {__VLS_StyleScopedClasses['year']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "computer-history" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "timeline" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.computerEras)); _i < _a.length; _i++) {
    var _b = _a[_i], era = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "era" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "era-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (era.period);
    (era.years);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tech-tags" }));
    for (var _c = 0, _d = __VLS_getVForSourceType((era.techTags)); _c < _d.length; _c++) {
        var _e = _d[_c], tag = _e[0], tagIndex = _e[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (tagIndex) }, { class: "tag" }));
        (tag);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "milestones" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((era.milestones)); _f < _g.length; _f++) {
        var _h = _g[_f], milestone = _h[0], mIndex = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (mIndex) }, { class: "milestone" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "year" }));
        (milestone.year);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (milestone.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (milestone.description);
        if (milestone.impact) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "impact" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (milestone.impact);
        }
        if (milestone.people) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "people" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (milestone.people);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "evolution-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "evolution-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "evolution-category" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.hardwareEvolution)); _j < _k.length; _j++) {
    var _l = _k[_j], item = _l[0], idx = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (idx),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (item.period);
    (item.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "evolution-category" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.softwareEvolution)); _m < _o.length; _m++) {
    var _p = _o[_m], item = _p[0], idx = _p[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (idx),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (item.period);
    (item.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "evolution-category" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.theoryEvolution)); _q < _r.length; _q++) {
    var _s = _r[_q], item = _s[0], idx = _s[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (idx),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (item.year);
    (item.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
    (item.scientist);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-chart" }));
for (var _t = 0, _u = __VLS_getVForSourceType((__VLS_ctx.computingSpeed)); _t < _u.length; _t++) {
    var _v = _u[_t], item = _v[0], idx = _v[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (idx) }, { class: "speed-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-label" }));
    (item.era);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-bar" }, { style: ({ width: item.width }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "speed-value" }));
    (item.speed);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-example" }));
    (item.example);
}
/** @type {__VLS_StyleScopedClasses['computer-history']} */ ;
/** @type {__VLS_StyleScopedClasses['timeline']} */ ;
/** @type {__VLS_StyleScopedClasses['era']} */ ;
/** @type {__VLS_StyleScopedClasses['era-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['milestones']} */ ;
/** @type {__VLS_StyleScopedClasses['milestone']} */ ;
/** @type {__VLS_StyleScopedClasses['year']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['impact']} */ ;
/** @type {__VLS_StyleScopedClasses['people']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-section']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-category']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-category']} */ ;
/** @type {__VLS_StyleScopedClasses['evolution-category']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-item']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-label']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-value']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-example']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            computerEras: computerEras,
            hardwareEvolution: hardwareEvolution,
            softwareEvolution: softwareEvolution,
            theoryEvolution: theoryEvolution,
            computingSpeed: computingSpeed,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
