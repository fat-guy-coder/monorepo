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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref, computed } from 'vue';
// 进制系统基础
var baseSystems = ref([
    {
        name: "二进制",
        icon: "🔢",
        description: "基数为2，使用0和1表示",
        example: "1011₂ = 11₁₀"
    },
    {
        name: "十进制",
        icon: "🔟",
        description: "基数为10，日常使用数字系统",
        example: "123₁₀ = 123"
    },
    {
        name: "八进制",
        icon: "🔄",
        description: "基数为8，使用0-7表示",
        example: "17₈ = 15₁₀"
    },
    {
        name: "十六进制",
        icon: "#️⃣",
        description: "基数为16，使用0-9和A-F表示",
        example: "1F₁₆ = 31₁₀"
    }
]);
// 十进制转二进制步骤
var decToBinSteps = ref([
    "将十进制数除以2，记录商和余数",
    "用上一步的商继续除以2，记录新的余数",
    "重复此过程，直到商为0",
    "将余数从下往上排列，得到二进制数"
]);
// 十进制转二进制示例
var decToBinExample = ref([
    { division: "29 ÷ 2 = 14", remainder: "1 (LSB)" },
    { division: "14 ÷ 2 = 7", remainder: "0" },
    { division: "7 ÷ 2 = 3", remainder: "1" },
    { division: "3 ÷ 2 = 1", remainder: "1" },
    { division: "1 ÷ 2 = 0", remainder: "1 (MSB)" }
]);
var decToBinResult = computed(function () {
    return decToBinExample.value.map(function (s) { return s.remainder.charAt(0); }).reverse().join('');
});
// 二进制转十进制步骤
var binToDecSteps = ref([
    "写出二进制数的每一位数字",
    "从右向左，给每位分配2的幂次（从0开始）",
    "将每位数字乘以其对应的2的幂次",
    "将所有乘积相加，得到十进制数"
]);
// 十进制小数转二进制步骤
var decFractionToBinSteps = ref([
    "将小数部分乘以2",
    "记录结果的整数部分（0或1）",
    "取结果的小数部分继续乘以2",
    "重复此过程，直到小数部分为0或达到所需精度",
    "将整数部分从上往下排列，得到二进制小数"
]);
// 十进制小数转二进制示例
var decFractionToBinExample = ref([
    { multiplication: "0.625 × 2 = 1.25", integer: "1 (MSB)" },
    { multiplication: "0.25 × 2 = 0.5", integer: "0" },
    { multiplication: "0.5 × 2 = 1.0", integer: "1 (LSB)" }
]);
var decFractionToBinResult = computed(function () {
    return decFractionToBinExample.value.map(function (s) { return s.integer.charAt(0); }).join('');
});
// 二进制小数转十进制步骤
var binFractionToDecSteps = ref([
    "写出二进制小数的每一位数字",
    "从左向右，给每位分配2的负幂次（从-1开始）",
    "将每位数字乘以其对应的2的负幂次",
    "将所有乘积相加，得到十进制小数"
]);
// 进制转换工具
var bases = ref([
    { label: "二进制", value: 2 },
    { label: "八进制", value: 8 },
    { label: "十进制", value: 10 },
    { label: "十六进制", value: 16 }
]);
var inputValue = ref("");
var fromBase = ref(10);
var toBase = ref(2);
var result = ref("");
// 转换函数
var convert = function () {
    if (inputValue.value === "") {
        result.value = "请输入数字";
        return;
    }
    try {
        // 检查输入是否包含小数点
        if (inputValue.value.includes('.')) {
            var _a = inputValue.value.split('.'), integerPart = _a[0], fractionalPart = _a[1];
            // 转换整数部分
            var integerResult = parseInt(integerPart, fromBase.value).toString(toBase.value);
            // 转换小数部分
            var fractionalResult = "";
            var fractional = parseFloat("0.".concat(fractionalPart));
            var precision = 8; // 最大精度
            for (var i = 0; i < precision; i++) {
                fractional *= toBase.value;
                var digit = Math.floor(fractional);
                fractional -= digit;
                fractionalResult += digit.toString(toBase.value);
                if (fractional === 0)
                    break;
            }
            result.value = "".concat(integerResult, ".").concat(fractionalResult);
        }
        else {
            // 纯整数转换
            var num = parseInt(inputValue.value, fromBase.value);
            if (isNaN(num))
                throw new Error("输入无效");
            result.value = num.toString(toBase.value);
        }
    }
    catch (e) {
        result.value = "转换错误: 输入无效";
    }
};
// 应用场景
var applications = ref([
    {
        icon: "💻",
        title: "计算机体系结构",
        description: "CPU指令处理、内存寻址使用二进制"
    },
    {
        icon: "📡",
        title: "网络通信",
        description: "IP地址使用点分十进制表示（实际是二进制）"
    },
    {
        icon: "🎨",
        title: "图形编程",
        description: "颜色值常用十六进制表示（如#FFFFFF）"
    },
    {
        icon: "🔐",
        title: "加密算法",
        description: "密钥处理需要二进制操作"
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['base-systems']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['converter-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-guide" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "base-systems" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.baseSystems)); _i < _a.length; _i++) {
    var _b = _a[_i], system = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "system" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "system-icon" }));
    (system.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (system.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (system.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "system-example" }));
    (system.example);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-method" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-steps" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.decToBinSteps)); _c < _d.length; _c++) {
    var _e = _d[_c], step = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculation" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.decToBinExample)); _f < _g.length; _f++) {
    var _h = _g[_f], calc = _h[0], i = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (i) }, { class: "calc-step" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (calc.division);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (calc.remainder);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result" }));
(__VLS_ctx.decToBinResult);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-method" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-steps" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.binToDecSteps)); _j < _k.length; _j++) {
    var _l = _k[_j], step = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calc-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calc-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-method" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-steps" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.decFractionToBinSteps)); _m < _o.length; _m++) {
    var _p = _o[_m], step = _p[0], index = _p[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculation" }));
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.decFractionToBinExample)); _q < _r.length; _q++) {
    var _s = _r[_q], calc = _s[0], i = _s[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (i) }, { class: "calc-step" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (calc.multiplication);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (calc.integer);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result" }));
(__VLS_ctx.decFractionToBinResult);
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-method" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-steps" }));
for (var _t = 0, _u = __VLS_getVForSourceType((__VLS_ctx.binFractionToDecSteps)); _t < _u.length; _t++) {
    var _v = _u[_t], step = _v[0], index = _v[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calculation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calc-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.sup, __VLS_intrinsicElements.sup)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "calc-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.sub, __VLS_intrinsicElements.sub)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "converter" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "converter-input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.inputValue),
    placeholder: "输入数字",
});
var __VLS_0 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.fromBase),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.fromBase),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_3.slots.default;
for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.bases)); _w < _x.length; _w++) {
    var base = _x[_w][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (base.value),
        value: (base.value),
    });
    (base.label);
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_4 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.toBase),
}));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.toBase),
    }], __VLS_functionalComponentArgsRest(__VLS_5), false));
__VLS_7.slots.default;
for (var _y = 0, _z = __VLS_getVForSourceType((__VLS_ctx.bases)); _y < _z.length; _y++) {
    var base = _z[_y][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (base.value),
        value: (base.value),
    });
    (base.label);
}
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.convert) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "converter-result" }));
if (__VLS_ctx.result !== '') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.result);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications" }));
for (var _0 = 0, _1 = __VLS_getVForSourceType((__VLS_ctx.applications)); _0 < _1.length; _0++) {
    var _2 = _1[_0], app = _2[0], index = _2[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
    (app.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (app.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (app.description);
}
/** @type {__VLS_StyleScopedClasses['conversion-guide']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['base-systems']} */ ;
/** @type {__VLS_StyleScopedClasses['system']} */ ;
/** @type {__VLS_StyleScopedClasses['system-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['system-example']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['calculation']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['calculation']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['calculation']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['calculation']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-step']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['converter']} */ ;
/** @type {__VLS_StyleScopedClasses['converter-input']} */ ;
/** @type {__VLS_StyleScopedClasses['converter-result']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['applications']} */ ;
/** @type {__VLS_StyleScopedClasses['app-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            baseSystems: baseSystems,
            decToBinSteps: decToBinSteps,
            decToBinExample: decToBinExample,
            decToBinResult: decToBinResult,
            binToDecSteps: binToDecSteps,
            decFractionToBinSteps: decFractionToBinSteps,
            decFractionToBinExample: decFractionToBinExample,
            decFractionToBinResult: decFractionToBinResult,
            binFractionToDecSteps: binFractionToDecSteps,
            bases: bases,
            inputValue: inputValue,
            fromBase: fromBase,
            toBase: toBase,
            result: result,
            convert: convert,
            applications: applications,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
