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
var text = ref('ABABDABACDABABCABAB');
var pattern = ref('ABABCABAB');
var isAnimating = ref(false);
var speed = ref(5);
var statusText = ref('等待开始');
var nextArray = ref([]);
var statusClass = ref('status-waiting');
// Canvas引用
var canvas = ref(null);
// 动画控制变量
var animationFrame = null;
var textPointer = 0;
var patternPointer = 0;
var matched = false;
var stepCounter = 0;
var nextArrayBuilt = false;
var animationStartTime = 0;
// 构建Next数组
var buildNext = function (patternStr) {
    var next = new Array(patternStr.length).fill(0);
    var len = 0;
    var i = 1;
    while (i < patternStr.length) {
        if (patternStr[i] === patternStr[len]) {
            len++;
            next[i] = len;
            i++;
        }
        else {
            if (len > 0) {
                len = next[len - 1];
            }
            else {
                next[i] = 0;
                i++;
            }
        }
    }
    return next;
};
// 重置动画
var resetAnimation = function () {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    isAnimating.value = false;
    textPointer = 0;
    patternPointer = 0;
    matched = false;
    stepCounter = 0;
    nextArrayBuilt = false;
    statusText.value = '等待开始';
    statusClass.value = 'status-waiting';
    nextArray.value = buildNext(pattern.value);
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
    stepCounter++;
    // KMP算法逻辑
    if (textPointer < text.value.length && patternPointer < pattern.value.length) {
        if (text.value[textPointer] === pattern.value[patternPointer]) {
            // 匹配成功
            textPointer++;
            patternPointer++;
            if (patternPointer === pattern.value.length) {
                // 完全匹配
                matched = true;
                isAnimating.value = false;
                statusText.value = "\u5339\u914D\u6210\u529F! \u4F4D\u7F6E: ".concat(textPointer - patternPointer);
                statusClass.value = 'status-success';
            }
        }
        else {
            // 匹配失败
            if (patternPointer > 0) {
                patternPointer = nextArray.value[patternPointer - 1];
            }
            else {
                textPointer++;
            }
        }
    }
    else {
        // 匹配结束
        isAnimating.value = false;
        if (!matched) {
            statusText.value = '未找到匹配';
            statusClass.value = 'status-failed';
        }
    }
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
    var cellSize = 40;
    var padding = 20;
    var patternY = 80;
    var textY = 180;
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    // 绘制文本串
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < text.value.length; i++) {
        var x = padding + i * cellSize + cellSize / 2;
        // 背景
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
        // 边框
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
        // 字符
        ctx.fillStyle = '#333';
        ctx.fillText(text.value[i], x, textY);
        // 指针
        if (i === textPointer) {
            ctx.fillStyle = '#4e6ef2';
            ctx.beginPath();
            ctx.arc(x, textY + 30, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText('i', x, textY + 30);
        }
        // 匹配部分
        if (i >= textPointer - patternPointer && i < textPointer) {
            ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
            ctx.fillRect(padding + i * cellSize, textY - cellSize / 2, cellSize, cellSize);
        }
    }
    // 绘制模式串
    for (var j = 0; j < pattern.value.length; j++) {
        var x = padding + (textPointer - patternPointer + j) * cellSize + cellSize / 2;
        // 背景
        ctx.fillStyle = '#e3f2fd';
        ctx.fillRect(padding + (textPointer - patternPointer + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        // 边框
        ctx.strokeStyle = '#bbdefb';
        ctx.lineWidth = 1;
        ctx.strokeRect(padding + (textPointer - patternPointer + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        // 字符
        ctx.fillStyle = '#1976d2';
        ctx.fillText(pattern.value[j], x, patternY);
        // 指针
        if (j === patternPointer) {
            ctx.fillStyle = '#ff5722';
            ctx.beginPath();
            ctx.arc(x, patternY - 30, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText('j', x, patternY - 30);
        }
        // 当前比较字符
        if (j === patternPointer && textPointer < text.value.length) {
            ctx.fillStyle = 'rgba(255, 152, 0, 0.3)';
            ctx.fillRect(padding + (textPointer - patternPointer + j) * cellSize, patternY - cellSize / 2, cellSize, cellSize);
        }
    }
    // 绘制连接线
    if (textPointer < text.value.length && patternPointer < pattern.value.length) {
        var textX = padding + textPointer * cellSize + cellSize / 2;
        var patternX = padding + (textPointer - patternPointer + patternPointer) * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.moveTo(textX, textY - 25);
        ctx.lineTo(patternX, patternY + 25);
        ctx.strokeStyle = text.value[textPointer] === pattern.value[patternPointer] ? '#4caf50' : '#f44336';
        ctx.lineWidth = 2;
        ctx.stroke();
        // 绘制比较结果
        ctx.fillStyle = text.value[textPointer] === pattern.value[patternPointer] ? '#4caf50' : '#f44336';
        ctx.font = '14px Arial';
        ctx.fillText(text.value[textPointer] === pattern.value[patternPointer] ? '匹配' : '不匹配', (textX + patternX) / 2, (textY + patternY) / 2 - 10);
    }
    // 绘制标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('文本串:', 20, textY - 50);
    ctx.fillText('模式串:', 20, patternY - 50);
    // 绘制步骤计数
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.fillText("\u6B65\u9AA4: ".concat(stepCounter), width - 100, 30);
};
// 监听输入变化
watch([text, pattern], resetAnimation);
// 初始化
onMounted(function () {
    nextArray.value = buildNext(pattern.value);
    drawCanvas();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "kmp-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "main-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "canvas",
    width: "680",
    height: "300",
});
/** @type {typeof __VLS_ctx.canvas} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.text),
    type: "text",
    maxlength: "30",
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "status" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (__VLS_ctx.statusClass) }));
(__VLS_ctx.statusText);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.nextArray.join(', '));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-items" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box matched" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box current" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box pointer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend-item" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "color-box pattern-pointer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['kmp-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['content-left']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-label']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-label']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['idea-list']} */ ;
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
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['control-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['speed-control']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-items']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['matched']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['current']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['color-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pattern-pointer']} */ ;
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
            nextArray: nextArray,
            statusClass: statusClass,
            canvas: canvas,
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
