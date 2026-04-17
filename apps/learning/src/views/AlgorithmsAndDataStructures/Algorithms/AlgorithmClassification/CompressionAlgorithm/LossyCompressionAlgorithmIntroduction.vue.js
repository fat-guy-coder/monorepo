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
// 算法数据
var algorithms = ref([
    {
        name: "JPEG",
        year: "1992",
        icon: "🖼️",
        description: "最广泛使用的图像压缩标准，特别适合照片和逼真图像",
        compressionRatio: 85,
        speed: 90,
        quality: 75,
        speedLabel: "非常快",
        qualityLabel: "良好（存在块效应）",
        techniques: [
            "离散余弦变换(DCT)",
            "色彩空间转换(YCbCr)",
            "量化表控制压缩级别",
            "之字形扫描",
            "霍夫曼编码"
        ],
        applications: ["数码摄影", "网页图像", "电子邮件附件", "社交分享"]
    },
    {
        name: "MP3",
        year: "1993",
        icon: "🎵",
        description: "音频压缩的革命性技术，使数字音乐成为主流",
        compressionRatio: 90,
        speed: 85,
        quality: 80,
        speedLabel: "快速",
        qualityLabel: "良好（高频衰减）",
        techniques: [
            "心理声学模型",
            "掩蔽效应利用",
            "改进离散余弦变换(MDCT)",
            "比特池技术",
            "哈夫曼编码"
        ],
        applications: ["音乐流媒体", "播客", "数字电台", "音频存储"]
    },
    {
        name: "H.264/AVC",
        year: "2003",
        icon: "📹",
        description: "最流行的视频压缩标准，广泛用于流媒体和广播",
        compressionRatio: 75,
        speed: 70,
        quality: 85,
        speedLabel: "中等",
        qualityLabel: "优秀",
        techniques: [
            "帧间预测",
            "运动估计与补偿",
            "4×4整数变换",
            "熵编码(CAVLC/CABAC)",
            "去块效应滤波器"
        ],
        applications: ["蓝光光盘", "YouTube", "视频会议", "电视广播"]
    },
    {
        name: "HEVC/H.265",
        year: "2013",
        icon: "🎞️",
        description: "H.264的继任者，提供两倍的压缩效率",
        compressionRatio: 50,
        speed: 50,
        quality: 90,
        speedLabel: "较慢",
        qualityLabel: "卓越",
        techniques: [
            "更大的编码单元(64×64)",
            "35种预测方向",
            "采样点自适应偏移",
            "并行处理结构",
            "更高效的熵编码"
        ],
        applications: ["4K/8K视频", "HEIF图像", "VR内容", "移动流媒体"]
    },
    {
        name: "AV1",
        year: "2018",
        icon: "🆕",
        description: "开源免版税视频编码，Netflix和YouTube的新选择",
        compressionRatio: 45,
        speed: 45,
        quality: 92,
        speedLabel: "慢（编码）",
        qualityLabel: "卓越",
        techniques: [
            "递归分区",
            "帧内方向预测",
            "运动补偿时序滤波",
            "约束方向增强",
            "多符号算术编码"
        ],
        applications: ["WebRTC", "浏览器视频", "开源平台", "低带宽场景"]
    }
]);
var activeTab = ref(0);
var activeAlgorithm = computed(function () {
    return algorithms.value[activeTab.value];
});
// 压缩率-质量曲线数据
var qualityCurve = computed(function () {
    return [
        { compression: 5, quality: 95, position: 5 },
        { compression: 10, quality: 85, position: 15 },
        { compression: 20, quality: 75, position: 30 },
        { compression: 50, quality: 40, position: 60 },
        { compression: 100, quality: 15, position: 90 }
    ];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy-compression-container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['header-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principles-container']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-compression']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs-header']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "lossy-compression-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "header-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "concept-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "highlight-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "highlight-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "highlight-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "data-representation original" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "data-representation filtered" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "data-representation compressed" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principles-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossless" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossless" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossless" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossless" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossy" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row-item lossless" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tabs" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs-header" }));
var _loop_1 = function (algo, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeTab = index;
        } }, { key: (index) }), { class: (['tab-item', { active: __VLS_ctx.activeTab === index }]) }));
    (algo.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var _b = _a[_i], algo = _b[0], index = _b[1];
    _loop_1(algo, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tab-content" }));
if (__VLS_ctx.activeAlgorithm) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-detail" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-icon" }));
    (__VLS_ctx.activeAlgorithm.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.activeAlgorithm.name);
    (__VLS_ctx.activeAlgorithm.year);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-description" }));
    (__VLS_ctx.activeAlgorithm.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-stats" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-bar" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill" }, { style: ({ width: __VLS_ctx.activeAlgorithm.compressionRatio + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-label" }));
    (__VLS_ctx.activeAlgorithm.compressionRatio);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-bar" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill" }, { style: ({ width: __VLS_ctx.activeAlgorithm.speed + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-label" }));
    (__VLS_ctx.activeAlgorithm.speedLabel);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-bar" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill" }, { style: ({ width: __VLS_ctx.activeAlgorithm.quality + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-label" }));
    (__VLS_ctx.activeAlgorithm.qualityLabel);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-techniques" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithm.techniques)); _c < _d.length; _c++) {
        var _e = _d[_c], tech = _e[0], idx = _e[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (tech);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-applications" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-tags" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.activeAlgorithm.applications)); _f < _g.length; _f++) {
        var _h = _g[_f], app = _h[0], idx = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (idx) }, { class: "app-tag" }));
        (app);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quality-compression" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rate-quality-chart" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-y-axis" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-grid" }));
for (var _j = 0, _k = __VLS_getVForSourceType((5)); _j < _k.length; _j++) {
    var i = _k[_j][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid-line" }, { key: (i) }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quality-curve" }, { style: ({ height: '220px', background: 'linear-gradient(to top, #4a6cf7, #42b983)' }) }));
for (var _l = 0, _m = __VLS_getVForSourceType((__VLS_ctx.qualityCurve)); _l < _m.length; _l++) {
    var _o = _m[_l], point = _o[0], idx = _o[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (idx) }, { class: "curve-point" }), { style: ({ left: point.position + '%', top: 100 - point.quality + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-value" }));
    (point.compression);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-x-axis" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-legend" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quality-factors" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "qp-example" }));
for (var _p = 0, _q = __VLS_getVForSourceType(([10, 25, 40, 60])); _p < _q.length; _p++) {
    var qp = _q[_p][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "qp-item" }, { key: (qp) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "qp-label" }));
    (qp);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "qp-bar" }, { style: ({ width: (100 - qp) + '%' }) }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-comparison" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-bar constant" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bitrate-bar variable" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "compression-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "future-trends" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill ai" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill vr" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill edge" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "trend-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bar-fill adaptive" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "content-section summary-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "key-point" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "key-point" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "key-point" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "key-point" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "point-text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quote-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quote-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quote-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "quote-author" }));
/** @type {__VLS_StyleScopedClasses['lossy-compression-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header-section']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['header-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-card']} */ ;
/** @type {__VLS_StyleScopedClasses['concept-text']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight-box']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight-content']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-title']} */ ;
/** @type {__VLS_StyleScopedClasses['process-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-representation']} */ ;
/** @type {__VLS_StyleScopedClasses['original']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-representation']} */ ;
/** @type {__VLS_StyleScopedClasses['filtered']} */ ;
/** @type {__VLS_StyleScopedClasses['process-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['process-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['data-representation']} */ ;
/** @type {__VLS_StyleScopedClasses['compressed']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['principles-container']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-content']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-content']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-content']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-content']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle-content']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-header']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-item']} */ ;
/** @type {__VLS_StyleScopedClasses['header-item']} */ ;
/** @type {__VLS_StyleScopedClasses['header-item']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossless']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossless']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossless']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossless']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossy']} */ ;
/** @type {__VLS_StyleScopedClasses['row-item']} */ ;
/** @type {__VLS_StyleScopedClasses['lossless']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-info']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-label']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-techniques']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-applications']} */ ;
/** @type {__VLS_StyleScopedClasses['app-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['app-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-compression']} */ ;
/** @type {__VLS_StyleScopedClasses['rate-quality-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-y-axis']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-line']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-curve']} */ ;
/** @type {__VLS_StyleScopedClasses['curve-point']} */ ;
/** @type {__VLS_StyleScopedClasses['point-value']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-x-axis']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['quality-factors']} */ ;
/** @type {__VLS_StyleScopedClasses['qp-example']} */ ;
/** @type {__VLS_StyleScopedClasses['qp-item']} */ ;
/** @type {__VLS_StyleScopedClasses['qp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['qp-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-comparison']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-type']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-label']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['constant']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-type']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-label']} */ ;
/** @type {__VLS_StyleScopedClasses['bitrate-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['variable']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['compression-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['future-trends']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-card']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['ai']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-card']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['vr']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-card']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['edge']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-card']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['adaptive']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-content']} */ ;
/** @type {__VLS_StyleScopedClasses['key-point']} */ ;
/** @type {__VLS_StyleScopedClasses['point-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['point-text']} */ ;
/** @type {__VLS_StyleScopedClasses['key-point']} */ ;
/** @type {__VLS_StyleScopedClasses['point-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['point-text']} */ ;
/** @type {__VLS_StyleScopedClasses['key-point']} */ ;
/** @type {__VLS_StyleScopedClasses['point-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['point-text']} */ ;
/** @type {__VLS_StyleScopedClasses['key-point']} */ ;
/** @type {__VLS_StyleScopedClasses['point-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['point-text']} */ ;
/** @type {__VLS_StyleScopedClasses['quote-box']} */ ;
/** @type {__VLS_StyleScopedClasses['quote-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['quote-content']} */ ;
/** @type {__VLS_StyleScopedClasses['quote-author']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            algorithms: algorithms,
            activeTab: activeTab,
            activeAlgorithm: activeAlgorithm,
            qualityCurve: qualityCurve,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
