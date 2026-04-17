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
import { useRouter } from 'vue-router';
var emit = defineEmits(['goToByRouteName']);
var router = useRouter();
// const route = useRoute()
var goHome = function () {
    emit('goToByRouteName', 'home');
};
var contactSupport = function () {
    router.back();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['home-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-button']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['error-code']} */ ;
/** @type {__VLS_StyleScopedClasses['digit']} */ ;
/** @type {__VLS_StyleScopedClasses['planet-container']} */ ;
/** @type {__VLS_StyleScopedClasses['planet']} */ ;
/** @type {__VLS_StyleScopedClasses['ring']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['error-code']} */ ;
/** @type {__VLS_StyleScopedClasses['digit']} */ ;
/** @type {__VLS_StyleScopedClasses['planet-container']} */ ;
/** @type {__VLS_StyleScopedClasses['planet']} */ ;
/** @type {__VLS_StyleScopedClasses['ring']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "not-found-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "background-elements" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bubble bubble-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bubble bubble-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bubble bubble-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bubble bubble-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "floating-element floating-element-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "floating-element floating-element-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "floating-element floating-element-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "error-code" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "digit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "planet-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "planet" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "crater crater-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "crater crater-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "crater crater-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ring" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "digit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "description" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.goHome) }, { class: "home-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ class: "arrow-icon" }, { viewBox: "0 0 24 24", width: "20", height: "20" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M16.01 11H4v2h12.01v3L20 12l-3.99-4z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.contactSupport) }, { class: "contact-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bottom-decoration" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "wave" }));
/** @type {__VLS_StyleScopedClasses['not-found-container']} */ ;
/** @type {__VLS_StyleScopedClasses['background-elements']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['bubble-4']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element-1']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element-2']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-element-3']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['error-code']} */ ;
/** @type {__VLS_StyleScopedClasses['digit']} */ ;
/** @type {__VLS_StyleScopedClasses['planet-container']} */ ;
/** @type {__VLS_StyleScopedClasses['planet']} */ ;
/** @type {__VLS_StyleScopedClasses['crater']} */ ;
/** @type {__VLS_StyleScopedClasses['crater-1']} */ ;
/** @type {__VLS_StyleScopedClasses['crater']} */ ;
/** @type {__VLS_StyleScopedClasses['crater-2']} */ ;
/** @type {__VLS_StyleScopedClasses['crater']} */ ;
/** @type {__VLS_StyleScopedClasses['crater-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ring']} */ ;
/** @type {__VLS_StyleScopedClasses['digit']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['home-button']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-button']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['wave']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            goHome: goHome,
            contactSupport: contactSupport,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */
