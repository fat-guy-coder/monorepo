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
import { ref, onMounted, computed, defineExpose } from 'vue';
defineOptions({
    name: 'Message',
});
var _a = defineProps(), id = _a.id, _b = _a.type, type = _b === void 0 ? 'info' : _b, _c = _a.content, content = _c === void 0 ? '' : _c, _d = _a.duration, duration = _d === void 0 ? 3 : _d, top = _a.top, onClose = _a.onClose, onDestroy = _a.onDestroy;
var visible = ref(false);
var timer;
var customStyle = computed(function () { return ({
    top: "".concat(top, "px"),
}); });
var close = function () {
    visible.value = false;
};
var startTimer = function () {
    if (duration > 0) {
        timer = window.setTimeout(function () {
            close();
        }, duration * 1000);
    }
};
onMounted(function () {
    visible.value = true;
    startTimer();
});
// Expose the close method to be called from the service
var __VLS_exposed = {
    close: close,
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['message-notice-content']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['message-notice-content']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['message-notice-content']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['message-notice-content']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onAfterLeave': {} }, { name: "message", persisted: true })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onAfterLeave': {} }, { name: "message", persisted: true })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6;
var __VLS_7 = {
    onAfterLeave: (onDestroy)
};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "message-notice" }, { style: (__VLS_ctx.customStyle) }));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.visible) }), null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: (['message-notice-content', "message--".concat(type)]) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "icon" }));
if (type === 'info') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (type === 'success') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (type === 'warning') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
if (type === 'error') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(content);
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['message-notice']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            visible: visible,
            customStyle: customStyle,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return __assign({}, __VLS_exposed);
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
