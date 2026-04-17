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
import { ref, onMounted, watch } from 'vue';
// 组件状态
var str1 = ref('kitten');
var str2 = ref('sitting');
var isAnimating = ref(false);
var speed = ref(5);
var statusText = ref('等待开始');
var editDistance = ref(0);
var showFormula = ref(false);
var statusClass = ref('status-waiting');
var operations = ref([]);
// Canvas引用
var matrixCanvas = ref(null);
// 动画控制变量
var animationFrame = null;
var dpMatrix = [];
var animationQueue = [];
var currentStep = 0;
var animationStartTime = 0;
var isBacktracking = false;
// 操作类型常量
var OP_MATCH = 0;
var OP_REPLACE = 1;
var OP_INSERT = 2;
var OP_DELETE = 3;
// 初始化DP矩阵
var initMatrix = function () {
    var m = str1.value.length;
    var n = str2.value.length;
    dpMatrix = Array.from({ length: m + 1 }, function () { return new Array(n + 1).fill(0); });
    // 初始化边界
    for (var i = 0; i <= m; i++) {
        dpMatrix[i][0] = i;
        animationQueue.push({ i: i, j: 0 });
    }
    for (var j = 0; j <= n; j++) {
        dpMatrix[0][j] = j;
        animationQueue.push({ i: 0, j: j });
    }
    // 添加内部单元格
    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            animationQueue.push({ i: i, j: j });
        }
    }
};
// 回溯操作路径
var backtrackOperations = function () {
    var ops = [];
    var i = str1.value.length;
    var j = str2.value.length;
    while (i > 0 || j > 0) {
        var current = dpMatrix[i][j];
        var cost = (i > 0 && j > 0 && str1.value[i - 1] !== str2.value[j - 1]) ? 1 : 0;
        // 检查是否匹配或替换
        if (i > 0 && j > 0 && dpMatrix[i][j] === dpMatrix[i - 1][j - 1] + cost) {
            if (cost === 0) {
                ops.unshift({ type: OP_MATCH, char1: str1.value[i - 1], char2: str2.value[j - 1], i: i, j: j });
            }
            else {
                ops.unshift({ type: OP_REPLACE, char1: str1.value[i - 1], char2: str2.value[j - 1], i: i, j: j });
            }
            i--;
            j--;
        }
        // 检查删除操作
        else if (i > 0 && dpMatrix[i][j] === dpMatrix[i - 1][j] + 1) {
            ops.unshift({ type: OP_DELETE, char1: str1.value[i - 1], i: i, j: j });
            i--;
        }
        // 检查插入操作
        else if (j > 0 && dpMatrix[i][j] === dpMatrix[i][j - 1] + 1) {
            ops.unshift({ type: OP_INSERT, char2: str2.value[j - 1], i: i, j: j });
            j--;
        }
    }
    operations.value = ops;
};
// 重置动画
var resetAnimation = function () {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    isAnimating.value = false;
    currentStep = 0;
    animationQueue = [];
    dpMatrix = [];
    operations.value = [];
    editDistance.value = 0;
    statusText.value = '等待开始';
    statusClass.value = 'status-waiting';
    isBacktracking = false;
    initMatrix();
    drawMatrix();
};
// 开始动画
var startAnimation = function () {
    if (isAnimating.value)
        return;
    resetAnimation();
    isAnimating.value = true;
    statusText.value = '构建矩阵...';
    statusClass.value = 'status-running';
    animationStartTime = performance.now();
    animateStep();
};
// 暂停动画
var pauseAnimation = function () {
    if (!isAnimating.value)
        return;
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    isAnimating.value = false;
    statusText.value = '已暂停';
    statusClass.value = 'status-paused';
};
// 动画步骤
var animateStep = function () {
    if (!isAnimating.value)
        return;
    var now = performance.now();
    var elapsed = now - animationStartTime;
    var interval = 1100 - (speed.value * 100); // 速度控制
    if (elapsed < interval) {
        animationFrame = requestAnimationFrame(animateStep);
        return;
    }
    animationStartTime = now;
    if (currentStep < animationQueue.length) {
        var _a = animationQueue[currentStep], i = _a.i, j = _a.j;
        if (i === 0 || j === 0) {
            // 边界已经初始化
        }
        else {
            var cost = str1.value[i - 1] === str2.value[j - 1] ? 0 : 1;
            dpMatrix[i][j] = Math.min(dpMatrix[i - 1][j] + 1, // 删除
            dpMatrix[i][j - 1] + 1, // 插入
            dpMatrix[i - 1][j - 1] + cost // 替换
            );
        }
        currentStep++;
        drawMatrix(i, j);
        // 完成矩阵构建
        if (currentStep === animationQueue.length) {
            editDistance.value = dpMatrix[str1.value.length][str2.value.length];
            isBacktracking = true;
            statusText.value = '回溯操作路径...';
            backtrackOperations();
            statusText.value = '演示完成';
            statusClass.value = 'status-success';
            isAnimating.value = false;
        }
    }
    if (isAnimating.value) {
        animationFrame = requestAnimationFrame(animateStep);
    }
};
// 绘制DP矩阵
var drawMatrix = function (highlightI, highlightJ) {
    var _a;
    if (highlightI === void 0) { highlightI = -1; }
    if (highlightJ === void 0) { highlightJ = -1; }
    if (!matrixCanvas.value)
        return;
    var ctx = matrixCanvas.value.getContext('2d');
    if (!ctx)
        return;
    var m = str1.value.length;
    var n = str2.value.length;
    var cellSize = 40;
    var padding = 60;
    var headerSize = 30;
    // 清除画布
    ctx.clearRect(0, 0, matrixCanvas.value.width, matrixCanvas.value.height);
    // 设置样式
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 绘制字符串1（行）
    for (var i = 0; i <= m; i++) {
        var y = padding + i * cellSize + cellSize / 2;
        if (i > 0) {
            ctx.fillStyle = '#333';
            ctx.fillText(str1.value[i - 1], headerSize / 2, y);
        }
        // 行号
        ctx.fillStyle = '#666';
        ctx.fillText(i.toString(), headerSize / 2, padding - headerSize / 2);
    }
    // 绘制字符串2（列）
    for (var j = 0; j <= n; j++) {
        var x = padding + j * cellSize + cellSize / 2;
        if (j > 0) {
            ctx.fillStyle = '#333';
            ctx.fillText(str2.value[j - 1], x, padding - headerSize / 2);
        }
        // 列号
        ctx.fillStyle = '#666';
        ctx.fillText(j.toString(), padding - headerSize / 2, padding - headerSize / 2);
    }
    // 绘制矩阵单元格
    for (var i = 0; i <= m; i++) {
        for (var j = 0; j <= n; j++) {
            var x = padding + j * cellSize;
            var y = padding + i * cellSize;
            // 确定单元格背景色
            if (i === 0 && j === 0) {
                ctx.fillStyle = '#e0f7fa'; // 初始单元格
            }
            else if (i === 0 || j === 0) {
                ctx.fillStyle = '#f5f5f5'; // 边界单元格
            }
            else if (i === highlightI && j === highlightJ) {
                ctx.fillStyle = '#fff9c4'; // 当前单元格
            }
            else if (dpMatrix[i][j] !== undefined) {
                // 根据操作类型着色
                var cost = (str1.value[i - 1] === str2.value[j - 1]) ? 0 : 1;
                var fromTop = dpMatrix[i][j] === dpMatrix[i - 1][j] + 1;
                var fromLeft = dpMatrix[i][j] === dpMatrix[i][j - 1] + 1;
                var fromDiag = dpMatrix[i][j] === dpMatrix[i - 1][j - 1] + cost;
                if (fromDiag && cost === 0) {
                    ctx.fillStyle = '#c8e6c9'; // 匹配
                }
                else if (fromDiag) {
                    ctx.fillStyle = '#ffccbc'; // 替换
                }
                else if (fromLeft) {
                    ctx.fillStyle = '#bbdefb'; // 插入
                }
                else if (fromTop) {
                    ctx.fillStyle = '#ffcdd2'; // 删除
                }
                else {
                    ctx.fillStyle = '#f5f5f5'; // 默认
                }
            }
            else {
                ctx.fillStyle = '#f5f5f5'; // 未计算
            }
            // 绘制单元格背景
            ctx.fillRect(x, y, cellSize, cellSize);
            // 绘制单元格边框
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellSize, cellSize);
            // 绘制单元格值
            if (((_a = dpMatrix[i]) === null || _a === void 0 ? void 0 : _a[j]) !== undefined) {
                ctx.fillStyle = '#333';
                ctx.fillText(dpMatrix[i][j].toString(), x + cellSize / 2, y + cellSize / 2);
            }
        }
    }
    // 绘制网格标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('字符串1', headerSize / 2, padding - headerSize * 1.5);
    ctx.fillText('字符串2', padding - headerSize / 2, padding - headerSize * 1.5);
};
// 操作类型文本
var opTypeText = function (type) {
    switch (type) {
        case OP_MATCH: return '匹配';
        case OP_REPLACE: return '替换';
        case OP_INSERT: return '插入';
        case OP_DELETE: return '删除';
        default: return '操作';
    }
};
// 操作类名
var opClass = function (type) {
    switch (type) {
        case OP_MATCH: return 'op-match';
        case OP_REPLACE: return 'op-replace';
        case OP_INSERT: return 'op-insert';
        case OP_DELETE: return 'op-delete';
        default: return '';
    }
};
// 操作详情
var opDetails = function (op) {
    switch (op.type) {
        case OP_MATCH:
            return "\u5B57\u7B26 '".concat(op.char1, "' \u5339\u914D");
        case OP_REPLACE:
            return "\u5C06 '".concat(op.char1, "' \u66FF\u6362\u4E3A '").concat(op.char2, "'");
        case OP_INSERT:
            return "\u63D2\u5165\u5B57\u7B26 '".concat(op.char2, "'");
        case OP_DELETE:
            return "\u5220\u9664\u5B57\u7B26 '".concat(op.char1, "'");
        default:
            return '';
    }
};
// 初始化
onMounted(function () {
    initMatrix();
    drawMatrix();
});
// 监听输入变化
watch([str1, str2], resetAnimation);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['op-replace']} */ ;
/** @type {__VLS_StyleScopedClasses['op-insert']} */ ;
/** @type {__VLS_StyleScopedClasses['op-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['insert']} */ ;
/** @type {__VLS_StyleScopedClasses['delete']} */ ;
/** @type {__VLS_StyleScopedClasses['replace']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-items']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "edit-distance-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "main-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-icon insert" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-icon delete" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-icon replace" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operation-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "complexity-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)(__assign({ class: "idea-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
if (__VLS_ctx.showFormula) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-delete" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-insert" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "op-replace" }));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.showFormula = !__VLS_ctx.showFormula;
    } }, { class: "toggle-formula" }));
(__VLS_ctx.showFormula ? '隐藏公式' : '显示公式');
if (__VLS_ctx.showFormula) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "formula-desc" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "formula-highlight" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-right" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.str1),
    type: "text",
    maxlength: "12",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.str2),
    type: "text",
    maxlength: "12",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "control-buttons" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.startAnimation) }, { disabled: (__VLS_ctx.isAnimating) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.pauseAnimation) }, { disabled: (!__VLS_ctx.isAnimating) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.resetAnimation) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "speed-control" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "range",
    min: "1",
    max: "10",
});
(__VLS_ctx.speed);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "matrix-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "matrixCanvas",
    width: "600",
    height: "380",
});
/** @type {typeof __VLS_ctx.matrixCanvas} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations-display" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "operations-sequence" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.operations)); _i < _a.length; _i++) {
    var _b = _a[_i], op = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "operation-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-index" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: (['op-type', __VLS_ctx.opClass(op.type)]) }));
    (__VLS_ctx.opTypeText(op.type));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "op-details" }));
    (__VLS_ctx.opDetails(op));
}
if (__VLS_ctx.operations.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-ops" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "distance-value" }));
(__VLS_ctx.editDistance);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (__VLS_ctx.statusClass) }));
(__VLS_ctx.statusText);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-items" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box init" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box insert" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box delete" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box replace" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box match" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box current" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['edit-distance-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['content-left']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['operations']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['insert']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-info']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['delete']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-info']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['replace']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-info']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-label']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-label']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['idea-list']} */ ;
/** @type {__VLS_StyleScopedClasses['formula']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-box']} */ ;
/** @type {__VLS_StyleScopedClasses['op-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['op-insert']} */ ;
/** @type {__VLS_StyleScopedClasses['op-replace']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-formula']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['formula-highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['content-right']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-card']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-control']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-container']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-display']} */ ;
/** @type {__VLS_StyleScopedClasses['operations-sequence']} */ ;
/** @type {__VLS_StyleScopedClasses['operation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['op-index']} */ ;
/** @type {__VLS_StyleScopedClasses['op-details']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-ops']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['distance-value']} */ ;
/** @type {__VLS_StyleScopedClasses['legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-items']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['init']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['insert']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['delete']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['replace']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['match']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['current']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['app-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            str1: str1,
            str2: str2,
            isAnimating: isAnimating,
            speed: speed,
            statusText: statusText,
            editDistance: editDistance,
            showFormula: showFormula,
            statusClass: statusClass,
            operations: operations,
            matrixCanvas: matrixCanvas,
            resetAnimation: resetAnimation,
            startAnimation: startAnimation,
            pauseAnimation: pauseAnimation,
            opTypeText: opTypeText,
            opClass: opClass,
            opDetails: opDetails,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
