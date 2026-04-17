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
import { Layout, Header, SideBar, Content, Footer } from 'components';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "layout-example" }));
var __VLS_0 = {}.Layout;
/** @type {[typeof __VLS_components.Layout, typeof __VLS_components.Layout, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_3.slots.default;
var __VLS_4 = {}.Header;
/** @type {[typeof __VLS_components.Header, typeof __VLS_components.Header, ]} */ ;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_5), false));
__VLS_7.slots.default;
var __VLS_7;
var __VLS_8 = {}.Content;
/** @type {[typeof __VLS_components.Content, typeof __VLS_components.Content, ]} */ ;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_9), false));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-container" }));
var __VLS_11;
var __VLS_12 = {}.SideBar;
/** @type {[typeof __VLS_components.SideBar, typeof __VLS_components.SideBar, ]} */ ;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_13), false));
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "left-sider-container" }));
var __VLS_15;
var __VLS_16 = {}.SideBar;
/** @type {[typeof __VLS_components.SideBar, typeof __VLS_components.SideBar, ]} */ ;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_17), false));
__VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "right-sider-container" }));
var __VLS_19;
var __VLS_20 = {}.Footer;
/** @type {[typeof __VLS_components.Footer, typeof __VLS_components.Footer, ]} */ ;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_21), false));
__VLS_23.slots.default;
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['layout-example']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
/** @type {__VLS_StyleScopedClasses['left-sider-container']} */ ;
/** @type {__VLS_StyleScopedClasses['right-sider-container']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            Layout: Layout,
            Header: Header,
            SideBar: SideBar,
            Content: Content,
            Footer: Footer,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
