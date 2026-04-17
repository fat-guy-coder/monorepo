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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { ref, computed, onMounted } from 'vue';
import ScrollNav from 'components/Nav/ScrollNav.vue';
var searchTerm = ref('');
var typeList = ref([
    '快慢指针',
    '双(三)指针',
    '转换',
    '反转',
    '环',
    '遍历',
    '归并',
    '分治',
    '哈希表',
    '检测',
    '删除',
    '插入',
    '分割',
    '拷贝',
    '查找',
    '去重',
    '数学运算',
    '重排',
    '合并',
    '区间操作',
    '递归',
]);
var algorithms = ref([]);
var list = computed(function () {
    return algorithms.value.map(function (algo) {
        return {
            name: algo.title,
            id: algo.id,
        };
    });
});
onMounted(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, import('../JSON/LinkedListAlgorithmList.json')];
            case 1:
                res = _a.sent();
                algorithms.value = res.default;
                return [2 /*return*/];
        }
    });
}); });
var filteredAlgorithms = computed(function () {
    if (!searchTerm.value && activeType.value.includes('all'))
        return algorithms.value;
    var term = searchTerm.value.toLowerCase();
    return algorithms.value.filter(function (algo) {
        return (algo.title.toLowerCase().includes(term) ||
            algo.description.toLowerCase().includes(term) ||
            algo.type.some(function (tag) { return tag.toLowerCase().includes(term); })) &&
            activeType.value.some(function (t) { return algo.type.includes(t); });
    });
});
var activeType = ref(['all']);
var filterAlgorithms = function (type) {
    if (type === 'all') {
        activeType.value = ['all'];
    }
    else {
        if (activeType.value.includes(type)) {
            activeType.value = activeType.value.filter(function (t) { return t !== type; });
            if (activeType.value.length === 0) {
                activeType.value = ['all'];
            }
        }
        else {
            activeType.value = __spreadArray(__spreadArray([], activeType.value, true), [type], false).filter(function (t) { return t !== 'all'; });
        }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "linked-list-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
/** @type {[typeof ScrollNav, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(ScrollNav, new ScrollNav({
    list: (__VLS_ctx.list),
    showBackToTop: true,
}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
        list: (__VLS_ctx.list),
        showBackToTop: true,
    }], __VLS_functionalComponentArgsRest(__VLS_0), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ type: "text", value: (__VLS_ctx.searchTerm), placeholder: "搜索链表算法..." }, { class: "search-input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "search-btn" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "icon-search" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stats-bar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.filterAlgorithms('all');
    } }, { class: "stat-value" }), { class: ({ active: __VLS_ctx.activeType.includes('all') }) }));
var _loop_1 = function (type) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.filterAlgorithms(type);
        } }, { class: "stat-value" }), { class: ({ active: __VLS_ctx.activeType.includes(type) }) }), { key: (type) }));
    (type);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.typeList)); _i < _a.length; _i++) {
    var type = _a[_i][0];
    _loop_1(type);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-list" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredAlgorithms)); _b < _c.length; _b++) {
    var _d = _c[_b], algo = _d[0], index = _d[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (algo.id), id: (algo.id) }, { class: "algorithm-card" }), { class: ({ featured: index < 3 }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-rank" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "algorithm-title" }));
    (algo.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "difficulty" }, { class: (algo.difficulty) }));
    (algo.difficulty);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (algo.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tags" }));
    for (var _e = 0, _f = __VLS_getVForSourceType((algo.type)); _e < _f.length; _e++) {
        var type = _f[_e][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (type) }, { class: "tag" }));
        (type);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-details" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-value" }));
    (algo.timeComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "detail-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-value" }));
    (algo.spaceComplexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-idea" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "detail-value" }));
    (algo.coreIdea);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    (algo.codeSnippet);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['linked-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-search']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-list']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-title']} */ ;
/** @type {__VLS_StyleScopedClasses['difficulty']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-details']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-idea']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-code']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            ScrollNav: ScrollNav,
            searchTerm: searchTerm,
            typeList: typeList,
            list: list,
            filteredAlgorithms: filteredAlgorithms,
            activeType: activeType,
            filterAlgorithms: filterAlgorithms,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
