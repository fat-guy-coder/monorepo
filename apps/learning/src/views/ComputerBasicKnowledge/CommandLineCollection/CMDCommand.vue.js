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
import { ref, computed, onMounted } from 'vue';
// 命令分类
var categories = ref([
    { id: 'file', name: '文件操作', icon: '📁' },
    { id: 'system', name: '系统管理', icon: '💻' },
    { id: 'network', name: '网络操作', icon: '🌐' },
    { id: 'disk', name: '磁盘管理', icon: '💾' },
    { id: 'process', name: '进程管理', icon: '⚙️' },
    { id: 'info', name: '系统信息', icon: 'ℹ️' },
    { id: 'batch', name: '批处理', icon: '📜' },
    { id: 'other', name: '其他命令', icon: '🔍' },
]);
// 当前激活的分类
var activeCategory = ref('file');
// 搜索关键词
var searchQuery = ref('');
// CMD命令数据
var commands = ref([]);
onMounted(function () { return __awaiter(void 0, void 0, void 0, function () {
    var commandsData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, import('./CMDCommands.json')];
            case 1:
                commandsData = (_a.sent()).default;
                commands.value = commandsData;
                return [2 /*return*/];
        }
    });
}); });
// 计算过滤后的命令列表
var filteredCommands = computed(function () {
    var result = commands.value;
    // 按分类过滤
    if (activeCategory.value) {
        result = result.filter(function (cmd) { return cmd.category === activeCategory.value; });
    }
    // 按搜索关键词过滤
    if (searchQuery.value) {
        var query_1 = searchQuery.value.toLowerCase();
        result = result.filter(function (cmd) {
            // 检查命令名
            if (cmd.name.toLowerCase().includes(query_1))
                return true;
            // 检查描述
            if (cmd.description.toLowerCase().includes(query_1))
                return true;
            // 检查参数
            if (cmd.options.some(function (opt) {
                return opt.flag.toLowerCase().includes(query_1) ||
                    opt.description.toLowerCase().includes(query_1);
            }))
                return true;
            // 检查示例
            if (cmd.examples.some(function (ex) {
                return ex.command.toLowerCase().includes(query_1) ||
                    ex.description.toLowerCase().includes(query_1);
            }))
                return true;
            return false;
        });
    }
    return result;
});
// 获取当前分类的命令数量
var getCommandCount = function (categoryId) {
    return commands.value.filter(function (cmd) { return cmd.category === categoryId; }).length;
};
// 获取当前激活分类的名称
var getActiveCategoryName = function () {
    var category = categories.value.find(function (c) { return c.id === activeCategory.value; });
    return category ? category.name : '所有命令';
};
// 获取当前激活分类的图标
var getActiveCategoryIcon = function () {
    var category = categories.value.find(function (c) { return c.id === activeCategory.value; });
    return category ? category.icon : '📋';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['category-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commands-header']} */ ;
/** @type {__VLS_StyleScopedClasses['cmd-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-nav']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cmd-commands-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "commands-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cmd-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-box" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "text", value: (__VLS_ctx.searchQuery), placeholder: "搜索命令 (如 dir, ipconfig, ping...)" }, { class: "search-input" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search-tips" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-nav" }));
var _loop_1 = function (category) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeCategory = category.id;
        } }, { key: (category.id) }), { class: "category-item" }), { class: ({ active: __VLS_ctx.activeCategory === category.id }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-icon" }));
    (category.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-name" }));
    (category.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-count" }));
    (__VLS_ctx.getCommandCount(category.id));
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.categories)); _i < _a.length; _i++) {
    var category = _a[_i][0];
    _loop_1(category);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commands-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title-icon" }));
(__VLS_ctx.getActiveCategoryIcon());
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.getActiveCategoryName());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commands-count" }));
(__VLS_ctx.filteredCommands.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-list" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredCommands)); _b < _c.length; _b++) {
    var _d = _c[_b], command = _d[0], index = _d[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (index) }, { class: "command-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-name" }));
    (command.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-description" }));
    (command.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-usage" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "usage-example" }));
    (command.usage);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-options" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "options-grid" }));
    for (var _e = 0, _f = __VLS_getVForSourceType((command.options)); _e < _f.length; _e++) {
        var _g = _f[_e], option = _g[0], optIndex = _g[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (optIndex) }, { class: "option-item" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "option-flag" }));
        (option.flag);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "option-description" }));
        (option.description);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "command-examples" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "examples" }));
    for (var _h = 0, _j = __VLS_getVForSourceType((command.examples)); _h < _j.length; _h++) {
        var _k = _j[_h], example = _k[0], exIndex = _k[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (exIndex) }, { class: "example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "example-command" }));
        (example.command);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "example-description" }));
        (example.description);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "commands-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-links" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
});
/** @type {__VLS_StyleScopedClasses['cmd-commands-container']} */ ;
/** @type {__VLS_StyleScopedClasses['commands-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['cmd-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-section']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-tips']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
/** @type {__VLS_StyleScopedClasses['category-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['category-item']} */ ;
/** @type {__VLS_StyleScopedClasses['category-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['command-count']} */ ;
/** @type {__VLS_StyleScopedClasses['commands-section']} */ ;
/** @type {__VLS_StyleScopedClasses['category-header']} */ ;
/** @type {__VLS_StyleScopedClasses['category-title']} */ ;
/** @type {__VLS_StyleScopedClasses['title-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['commands-count']} */ ;
/** @type {__VLS_StyleScopedClasses['command-list']} */ ;
/** @type {__VLS_StyleScopedClasses['command-card']} */ ;
/** @type {__VLS_StyleScopedClasses['command-header']} */ ;
/** @type {__VLS_StyleScopedClasses['command-name']} */ ;
/** @type {__VLS_StyleScopedClasses['command-description']} */ ;
/** @type {__VLS_StyleScopedClasses['command-usage']} */ ;
/** @type {__VLS_StyleScopedClasses['usage-example']} */ ;
/** @type {__VLS_StyleScopedClasses['command-options']} */ ;
/** @type {__VLS_StyleScopedClasses['options-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['option-item']} */ ;
/** @type {__VLS_StyleScopedClasses['option-flag']} */ ;
/** @type {__VLS_StyleScopedClasses['option-description']} */ ;
/** @type {__VLS_StyleScopedClasses['command-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['examples']} */ ;
/** @type {__VLS_StyleScopedClasses['example']} */ ;
/** @type {__VLS_StyleScopedClasses['example-command']} */ ;
/** @type {__VLS_StyleScopedClasses['example-description']} */ ;
/** @type {__VLS_StyleScopedClasses['commands-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            categories: categories,
            activeCategory: activeCategory,
            searchQuery: searchQuery,
            filteredCommands: filteredCommands,
            getCommandCount: getCommandCount,
            getActiveCategoryName: getActiveCategoryName,
            getActiveCategoryIcon: getActiveCategoryIcon,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
