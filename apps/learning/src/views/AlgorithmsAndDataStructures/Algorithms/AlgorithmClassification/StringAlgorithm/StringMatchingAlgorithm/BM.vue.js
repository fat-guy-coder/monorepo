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
var _a, _b;
import { ref, onMounted, watch } from 'vue';
// 组件状态
var text = ref('HERE IS A SIMPLE EXAMPLE');
var pattern = ref('EXAMPLE');
var isAnimating = ref(false);
var speed = ref(5);
var statusText = ref('等待开始');
var shiftCount = ref(0);
var compareCount = ref(0);
var statusClass = ref('status-waiting');
var lastRule = ref('无');
var currentRule = ref('');
var currentBadChar = ref('');
var currentPatternPos = ref(0);
var currentShift = ref(0);
var currentGoodSuffix = ref('');
var goodSuffixPos = ref(0);
var activeTab = ref('bm');
// Canvas引用
var canvas = ref(null);
// 算法变量
var animationFrame = null;
var shift = 0;
var patternPos = 0;
var badCharTable = {};
var animationStartTime = 0;
// 构建坏字符表
var buildBadCharTable = function (patternStr) {
    var table = {};
    var m = patternStr.length;
    for (var i = 0; i < m - 1; i++) {
        table[patternStr[i]] = i;
    }
    return table;
};
// 重置动画
var resetAnimation = function () {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    isAnimating.value = false;
    shift = 0;
    patternPos = 0;
    shiftCount.value = 0;
    compareCount.value = 0;
    statusText.value = '等待开始';
    statusClass.value = 'status-waiting';
    lastRule.value = '无';
    currentRule.value = '';
    badCharTable = buildBadCharTable(pattern.value);
    drawCanvas();
};
// 开始动画
var startAnimation = function () {
    if (isAnimating.value)
        return;
    resetAnimation();
    isAnimating.value = true;
    statusText.value = '匹配中...';
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
    var _a;
    if (!isAnimating.value)
        return;
    var now = performance.now();
    var elapsed = now - animationStartTime;
    var interval = 1100 - speed.value * 100; // 速度控制
    if (elapsed < interval) {
        animationFrame = requestAnimationFrame(animateStep);
        return;
    }
    animationStartTime = now;
    var n = text.value.length;
    var m = pattern.value.length;
    // 检查边界
    if (shift > n - m) {
        statusText.value = '未找到匹配';
        statusClass.value = 'status-failed';
        isAnimating.value = false;
        drawCanvas();
        return;
    }
    // 从右向左比较
    patternPos = m - 1;
    while (patternPos >= 0 && pattern.value[patternPos] === text.value[shift + patternPos]) {
        patternPos--;
        compareCount.value++;
    }
    // 找到匹配
    if (patternPos < 0) {
        statusText.value = "\u5339\u914D\u6210\u529F! \u4F4D\u7F6E: ".concat(shift);
        statusClass.value = 'status-success';
        isAnimating.value = false;
        drawCanvas();
        return;
    }
    // 应用坏字符规则
    var badChar = text.value[shift + patternPos];
    var badCharPos = (_a = badCharTable[badChar]) !== null && _a !== void 0 ? _a : -1;
    var shiftAmount = Math.max(1, patternPos - badCharPos);
    currentRule.value = 'bad';
    currentBadChar.value = badChar;
    currentPatternPos.value = patternPos;
    currentShift.value = shiftAmount;
    lastRule.value = '坏字符规则';
    shift += shiftAmount;
    shiftCount.value++;
    compareCount.value++;
    drawCanvas();
    if (isAnimating.value) {
        animationFrame = requestAnimationFrame(animateStep);
    }
};
// 绘制Canvas
var drawCanvas = function () {
    if (!canvas.value)
        return;
    var ctx = canvas.value.getContext('2d');
    if (!ctx)
        return;
    var width = canvas.value.width;
    var height = canvas.value.height;
    var cellSize = 35;
    var paddingX = 50;
    var paddingY = 80;
    var textY = paddingY;
    var patternY = paddingY + 100;
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    // 绘制标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('文本串:', 20, textY - 30);
    ctx.fillText('模式串:', 20, patternY - 30);
    // 设置文本样式
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 绘制文本串
    for (var i = 0; i < text.value.length; i++) {
        var x = paddingX + i * cellSize + cellSize / 2;
        // 绘制单元格背景
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
        // 绘制单元格边框
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
        // 绘制字符
        ctx.fillStyle = '#333';
        ctx.fillText(text.value[i], x, textY);
        // 高亮当前比较位置
        if (i >= shift && i < shift + pattern.value.length) {
            if (i === shift + patternPos) {
                // 当前比较字符（坏字符）
                ctx.fillStyle = 'rgba(244, 67, 54, 0.3)';
                ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
                // 绘制指针
                ctx.fillStyle = '#f44336';
                ctx.beginPath();
                ctx.arc(x, textY + 30, 8, 0, Math.PI * 2);
                ctx.fill();
            }
            else if (i > shift + patternPos) {
                // 已匹配字符
                ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
                ctx.fillRect(paddingX + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
            }
        }
    }
    // 绘制模式串
    for (var j = 0; j < pattern.value.length; j++) {
        var x = paddingX + (shift + j) * cellSize + cellSize / 2;
        // 绘制单元格背景
        ctx.fillStyle = '#e3f2fd';
        ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        // 绘制单元格边框
        ctx.strokeStyle = '#bbdefb';
        ctx.lineWidth = 1;
        ctx.strokeRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        // 绘制字符
        ctx.fillStyle = '#1976d2';
        ctx.fillText(pattern.value[j], x, patternY);
        // 高亮当前比较位置
        if (j === patternPos) {
            // 当前比较字符
            ctx.fillStyle = 'rgba(255, 152, 0, 0.3)';
            ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
            // 绘制指针
            ctx.fillStyle = '#ff9800';
            ctx.beginPath();
            ctx.arc(x, patternY - 30, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        else if (j > patternPos) {
            // 已匹配字符
            ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
            ctx.fillRect(paddingX + (shift + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        }
    }
    // 绘制连接线
    if (patternPos >= 0) {
        var textX = paddingX + (shift + patternPos) * cellSize + cellSize / 2;
        var patternX = paddingX + (shift + patternPos) * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.moveTo(textX, textY + 20);
        ctx.lineTo(patternX, patternY - 20);
        ctx.strokeStyle = '#f44336';
        ctx.lineWidth = 2;
        ctx.stroke();
        // 绘制比较结果
        ctx.fillStyle = '#f44336';
        ctx.font = '14px Arial';
        ctx.fillText('不匹配', textX, (textY + patternY) / 2);
    }
    // 绘制移位指示器
    if (shift > 0) {
        var startX = paddingX + shift * cellSize;
        ctx.beginPath();
        ctx.moveTo(startX, patternY + 40);
        ctx.lineTo(startX, patternY + 60);
        ctx.lineTo(startX - 15, patternY + 50);
        ctx.closePath();
        ctx.fillStyle = '#3f51b5';
        ctx.fill();
        ctx.font = '14px Arial';
        ctx.fillStyle = '#3f51b5';
        ctx.fillText("\u79FB\u4F4D: ".concat(shift), startX - 10, patternY + 80);
    }
};
// 监听输入变化
watch([text, pattern], resetAnimation);
// 初始化
onMounted(function () {
    badCharTable = buildBadCharTable(pattern.value);
    drawCanvas();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-info']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bm-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)(__assign({ class: "highlight" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)(__assign({ class: "highlight" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "features" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rules" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-formula" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ol, __VLS_intrinsicElements.ol)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-formula" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-right" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.text),
    type: "text",
    maxlength: "40",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.pattern),
    type: "text",
    maxlength: "15",
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "canvas-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "canvas",
    width: "700",
    height: "350",
});
/** @type {typeof __VLS_ctx.canvas} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (['status-value', __VLS_ctx.statusClass]) }));
(__VLS_ctx.statusText);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-value" }));
(__VLS_ctx.shiftCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-value" }));
(__VLS_ctx.compareCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "status-value" }));
(__VLS_ctx.lastRule);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rules-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
if (__VLS_ctx.currentRule === 'bad') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-detail" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "char-highlight" }));
    (__VLS_ctx.currentBadChar);
    (__VLS_ctx.currentPatternPos);
    ((_a = __VLS_ctx.badCharTable[__VLS_ctx.currentBadChar]) !== null && _a !== void 0 ? _a : -1);
    (__VLS_ctx.currentPatternPos);
    ((_b = __VLS_ctx.badCharTable[__VLS_ctx.currentBadChar]) !== null && _b !== void 0 ? _b : -1);
    (__VLS_ctx.currentShift);
}
else if (__VLS_ctx.currentRule === 'good') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-detail" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "char-highlight" }));
    (__VLS_ctx.currentGoodSuffix);
    (__VLS_ctx.goodSuffixPos);
    (__VLS_ctx.pattern.length);
    (__VLS_ctx.goodSuffixPos);
    (__VLS_ctx.currentShift);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-detail" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rule-description" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "card-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'bm';
    } }, { class: (['tab', { active: __VLS_ctx.activeTab === 'bm' }]) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'bad';
    } }, { class: (['tab', { active: __VLS_ctx.activeTab === 'bad' }]) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'good';
    } }, { class: (['tab', { active: __VLS_ctx.activeTab === 'good' }]) }));
if (__VLS_ctx.activeTab === 'bm') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
}
if (__VLS_ctx.activeTab === 'bad') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
}
if (__VLS_ctx.activeTab === 'good') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['bm-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['content-left']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['features']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-content']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-content']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['rules']} */ ;
/** @type {__VLS_StyleScopedClasses['rule']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-content']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-formula']} */ ;
/** @type {__VLS_StyleScopedClasses['rule']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-content']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-formula']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
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
/** @type {__VLS_StyleScopedClasses['content-right']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-control']} */ ;
/** @type {__VLS_StyleScopedClasses['canvas-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-item']} */ ;
/** @type {__VLS_StyleScopedClasses['status-label']} */ ;
/** @type {__VLS_StyleScopedClasses['status-value']} */ ;
/** @type {__VLS_StyleScopedClasses['rules-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-title']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-description']} */ ;
/** @type {__VLS_StyleScopedClasses['char-highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-title']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-description']} */ ;
/** @type {__VLS_StyleScopedClasses['char-highlight']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-title']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-description']} */ ;
/** @type {__VLS_StyleScopedClasses['code-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['app-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            text: text,
            pattern: pattern,
            isAnimating: isAnimating,
            speed: speed,
            statusText: statusText,
            shiftCount: shiftCount,
            compareCount: compareCount,
            statusClass: statusClass,
            lastRule: lastRule,
            currentRule: currentRule,
            currentBadChar: currentBadChar,
            currentPatternPos: currentPatternPos,
            currentShift: currentShift,
            currentGoodSuffix: currentGoodSuffix,
            goodSuffixPos: goodSuffixPos,
            activeTab: activeTab,
            canvas: canvas,
            badCharTable: badCharTable,
            resetAnimation: resetAnimation,
            startAnimation: startAnimation,
            pauseAnimation: pauseAnimation,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
