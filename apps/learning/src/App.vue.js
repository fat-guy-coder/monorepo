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
import { Menu, RouteTab, ThemeChange, Navigation, Input, Button, message, Spin } from 'components';
import { computed, ref, watch, onMounted, onUnmounted, nextTick, provide } from 'vue';
import { //菜单项类型
findFatherKeysListByKey, //查找父级菜单key列表
findMenuItemByName, //查找菜单项 通过name
 } from '@/menu';
import { getApiMenus, getApiMenusSearch } from '@/api/menu';
import { useTabStore } from '@/stores/tab'; //标签列表store
import { useDeviceStore } from '@/stores/device'; //设备信息store
import { useUIConfigStore } from '@/stores/uiconfig'; //UI配置store
import { useRouter } from 'vue-router';
import { debounce, scrollIntoViewById } from '@/function/common'; //常用函数
import { useGradientAnimation } from '@/hooks/useGradientAnimation'; //渐变色动画
import { useDetectDevice } from '@/hooks/useDetectDevice'; //设备信息hook
import { loadViewByPath, viewExists } from '@/views/views-loader'; //动态视图加载器
// import { request } from '@/request'
//获取用户信息store
// const userStore = useUserStore()
var deviceStore = useDeviceStore();
var uiConfigStore = useUIConfigStore();
//是否是手机端
var isMobile = computed(function () { return deviceStore.isMobile; });
//主题
var theme = computed(function () { return uiConfigStore.theme; });
var themes = computed(function () { return uiConfigStore.themes; });
var navItems = computed(function () { return uiConfigStore.navItems; });
//当前主题图标
var currentThemeIcon = computed(function () {
    var _a;
    return ((_a = uiConfigStore.themes.find(function (i) { return i.value === uiConfigStore.theme; })) === null || _a === void 0 ? void 0 : _a.icon) || '☀️';
});
//主题菜单显示状态
var themeMenuShow = ref(false);
//铆钉导航
var handleNavClick = function (item) {
    switch (item.value) {
        case 'home':
            goToByName('home');
            break;
        case 'theme':
            themeMenuShow.value = !themeMenuShow.value;
            break;
        default:
            break;
    }
};
//主题切换
var themeChange = function (theme1) {
    if (theme1 === 'more') {
        goToByName('MyTheme');
        return;
    }
    //设置用户主题
    uiConfigStore.setTheme(theme1);
    document.documentElement.setAttribute('data-theme', theme1);
};
//全局渐变色动画
useGradientAnimation({
    gradientTypes: ['linear'],
    triggerTimes: ['hover'],
});
//路由
var router = useRouter();
//菜单列表
var menus = ref([]);
//容器
var container = ref(null);
//右键菜单node
var contextMenu = null;
function closeContextMenu(e) {
    if (contextMenu && !contextMenu.contains(e.target)) {
        store.toggleShowMenu(false);
    }
}
function cancelContextMenu() {
    var _a;
    if (contextMenu) {
        (_a = container.value) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', function (e) {
            if (contextMenu && !contextMenu.contains(e.target)) {
                store.toggleShowMenu(false);
            }
        });
        contextMenu = null;
    }
}
onUnmounted(function () {
    cancelContextMenu();
});
//是初始加载菜单吗？
// const initMenu = ref(true)
//菜单折叠状态
var Menucollapsed = ref(isMobile.value);
//切换菜单折叠状态
var toggleCollapsed = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //切换菜单后，初始加载菜单为false
                loading.value = true;
                Menucollapsed.value = !Menucollapsed.value;
                return [4 /*yield*/, nextTick()];
            case 1:
                _a.sent();
                loading.value = false;
                return [2 /*return*/];
        }
    });
}); };
var loading = ref(false);
var mainViewLoading = ref(false);
useDetectDevice(function (device) {
    deviceStore.setDevice(device);
});
onMounted(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //设置主题
                themeChange(theme.value);
                //右键菜单
                contextMenu = document.getElementById('context-menu');
                if (container.value) {
                    container.value.addEventListener('click', closeContextMenu);
                }
                //获取菜单（先获取菜单再跳转激活的tab，确保路由已注册）
                return [4 /*yield*/, getMenus()
                    //跳转激活的tab
                ];
            case 1:
                //获取菜单（先获取菜单再跳转激活的tab，确保路由已注册）
                _a.sent();
                //跳转激活的tab
                router.push(activeKey.value);
                return [2 /*return*/];
        }
    });
}); });
//卸载时清空菜单列表
onUnmounted(function () {
    menus.value.length = 0;
});
//获取菜单（只加载根菜单，按需加载子菜单）
var getMenus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loading.value = true;
                mainViewLoading.value = true;
                return [4 /*yield*/, getApiMenus({ root: 'true', project: 'learning' })];
            case 1:
                data = (_a.sent()).data;
                menus.value = data.map(function (item) { return (__assign(__assign({}, item), { loading: false })); });
                loading.value = false;
                mainViewLoading.value = false;
                // 注册所有叶子路由（包括 tabList 中已存在的标签对应的路由）
                registerLeafRoutes(menus.value);
                // 遍历 tabList 注册可能存在的叶子路由
                store.tabList.forEach(function (tab) {
                    if (!router.hasRoute(tab.name)) {
                        registerRouteByPath(tab.path, tab.name);
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
// 根据 path 和 name 注册路由
function registerRouteByPath(path, name) {
    var viewPath = path.startsWith('/') ? path : "/".concat(path);
    if (!router.hasRoute(name) && viewExists(viewPath)) {
        var component = loadViewByPath(viewPath);
        router.addRoute({
            path: viewPath,
            name: name,
            component: component,
        });
    }
}
// 递归注册所有叶子菜单的路由
function registerLeafRoutes(menuItems) {
    var _a;
    for (var _i = 0, menuItems_1 = menuItems; _i < menuItems_1.length; _i++) {
        var item = menuItems_1[_i];
        if (item.isLeaf) {
            registerRouteByPath(item.path, item.name);
        }
        if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
            registerLeafRoutes(item.children);
        }
    }
}
// 动态加载子菜单
var loadChildren = function (parentItem) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (parentItem.isLeaf)
                    return [2 /*return*/];
                if (((_a = parentItem.children) === null || _a === void 0 ? void 0 : _a.length) > 0)
                    return [2 /*return*/]; // 已有子菜单
                parentItem.loading = true;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, getApiMenus({ parentId: parentItem.id })];
            case 2:
                data = (_b.sent()).data;
                parentItem.children = data;
                return [3 /*break*/, 5];
            case 3:
                e_1 = _b.sent();
                message.error('加载子菜单失败');
                return [3 /*break*/, 5];
            case 4:
                parentItem.loading = false;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
//标签列表store
var store = useTabStore();
//当前激活的标签
var activeKey = computed(function () { return store.activeKey; });
//标签列表
var tabList = computed(function () { return store.tabList; });
//是否显示右键菜单
var showContextMenu = computed(function () { return store.showContextMenu; });
//切换右键菜单显示状态
var toggleShowMenu = function (value) {
    store.toggleShowMenu(value);
};
//当前选中的标签key列表
var selectedKeys = computed(function () {
    if (activeKey.value !== '/') {
        return [activeKey.value];
    }
    return [];
});
//当前展开的菜单key列表
var openKeys = ref([]);
//搜索值
var searchValue = ref('');
//显示菜单
var showMenu = debounce(function (value) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!value) return [3 /*break*/, 2];
                openKeys.value = [];
                // 清空搜索时恢复加载根菜单
                return [4 /*yield*/, getMenus()];
            case 1:
                // 清空搜索时恢复加载根菜单
                _a.sent();
                return [2 /*return*/];
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, getApiMenusSearch({ project: 'learning', search: value })];
            case 3:
                data = (_a.sent()).data;
                if (!(data && data.matched)) return [3 /*break*/, 5];
                // 更新 openKeys（父级菜单路径）
                openKeys.value = data.openKeys;
                // 用搜索结果替换菜单树
                menus.value = data.matched;
                return [4 /*yield*/, nextTick()];
            case 4:
                _a.sent();
                scrollTo(data.selectedKeys[0]);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_2 = _a.sent();
                console.error('搜索失败:', e_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); }, 500);
//监听搜索值
watch(searchValue, function (value) {
    showMenu(value);
});
//标签列表store
var sortTab = store.sortTab, setCurrentDragIndex = store.setCurrentDragIndex;
//当前拖拽的标签索引
var currentDragIndex = computed(function () { return store.currentDragIndex; });
//标签点击
function tabClick(path) {
    if (path === store.activeKey) {
        return;
    }
    mainViewLoading.value = true;
    router.push({ path: path }).then(function () {
        mainViewLoading.value = false;
    });
    store.activateTabOnlyKey(path, function () {
        if (path !== '/') {
            if (!Menucollapsed.value) {
                openKeys.value = findFatherKeysListByKey(path);
            }
            else {
                openKeys.value = [];
            }
        }
        nextTick(function () {
            scrollTo(path);
        });
    });
}
//展开菜单
function expandMenu(path) {
    if (!Menucollapsed.value) {
        openKeys.value = findFatherKeysListByKey(path);
    }
    else {
        openKeys.value = [];
    }
    nextTick(function () {
        scrollTo(path);
    });
}
//删除标签
function removeTab(path) {
    store.removeTab(path, function (p) {
        router.push({ path: p });
        //手机端不展开菜单
        if (isMobile)
            return;
        openKeys.value = findFatherKeysListByKey(p);
        nextTick(function () {
            scrollTo(p);
        });
    });
}
//删除其他标签
function removeOther(path) {
    router.push({ path: path });
    store.removeOther(path, function (path) {
        //手机端不展开菜单
        if (isMobile)
            return;
        openKeys.value = findFatherKeysListByKey(path);
        nextTick(function () {
            scrollTo(path);
        });
    });
}
//删除侧边标签
function removeSide(index, side, key) {
    router.push({ path: key });
    store.removeSide(index, side, key, function (path) {
        //手机端不展开菜单
        if (isMobile)
            return;
        openKeys.value = findFatherKeysListByKey(path);
        nextTick(function () {
            scrollTo(path);
        });
    });
}
//跳转菜单
function goto(_a) {
    var path = _a.path, name = _a.name, label = _a.label, redirect = _a.redirect, isLeaf = _a.isLeaf;
    if (path === store.activeKey) {
        return;
    }
    //手机端并且折叠状态下点击菜单后折叠菜单 这里重复赋值 主要处理弹出来的菜单后收拢
    if (isMobile && Menucollapsed.value)
        Menucollapsed.value = true;
    if (redirect) {
        goToByName(redirect.name, true);
        return;
    }
    // 动态注册路由（仅对叶子菜单生效）
    if (isLeaf) {
        var routeName = name;
        // 检查路由是否已注册
        if (!router.hasRoute(routeName)) {
            // 使用 views-loader 动态加载组件
            var viewPath = path.startsWith('/') ? path : "/".concat(path);
            var component = loadViewByPath(viewPath);
            router.addRoute({
                path: viewPath,
                name: routeName,
                component: component,
            });
        }
    }
    mainViewLoading.value = true;
    router.push({ path: path }).then(function () {
        mainViewLoading.value = false;
    });
    store.activateTab({
        path: path,
        name: name,
        label: label,
    }, function (path) {
        openKeys.value = findFatherKeysListByKey(path);
    });
}
//通过菜单名称跳转
function goToByName(name, isRedirect) {
    if (isRedirect === void 0) { isRedirect = false; }
    var item = findMenuItemByName(menus.value, name);
    if (name === 'home') {
        item = {
            id: 'home',
            icon: '🏠',
            label: '首页',
            name: 'home',
            path: '/',
        };
    }
    if (!item) {
        message.error('菜单不存在');
        return;
    }
    var label = item.label, path = item.path;
    mainViewLoading.value = true;
    router.push({ path: path }).then(function () {
        mainViewLoading.value = false;
    });
    store.activateTab({
        path: path,
        name: name,
        label: label,
    }, function (path) {
        //手机端不展开菜单
        if (isMobile)
            return;
        if (isRedirect) {
            var keys = findFatherKeysListByKey(path);
            openKeys.value = __spreadArray(__spreadArray([], keys, true), openKeys.value, true);
        }
        else {
            openKeys.value = findFatherKeysListByKey(path);
        }
        nextTick(function () {
            scrollTo(path);
        });
    });
}
//提供跳转菜单名称方法
provide('goToByName', goToByName);
//滚动事件
var handleScroll = debounce(function (e) {
    var scrollTop = e.target.scrollTop;
    store.setScrollTop(scrollTop, store.activeKey);
}, 100);
//滚进视口 延时是为了防止滚动条抖动
var scrollTo = function (id) {
    var timer = setTimeout(function () {
        scrollIntoViewById(id);
        clearTimeout(timer);
    }, 300);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ ref: "container" }, { class: "main-view-container" }));
/** @type {typeof __VLS_ctx.container} */ ;
var __VLS_0 = {}.Navigation;
/** @type {[typeof __VLS_components.Navigation, typeof __VLS_components.Navigation, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onItemClick': {} }, { position: "bottom-right", offset: ({ bottom: '2rem', right: '0.5rem' }), isMobile: (__VLS_ctx.isMobile), items: (__VLS_ctx.navItems) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onItemClick': {} }, { position: "bottom-right", offset: ({ bottom: '2rem', right: '0.5rem' }), isMobile: (__VLS_ctx.isMobile), items: (__VLS_ctx.navItems) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6;
var __VLS_7 = {
    onItemClick: (__VLS_ctx.handleNavClick)
};
__VLS_3.slots.default;
{
    var __VLS_thisSlot = __VLS_3.slots.theme;
    var item = __VLS_getSlotParams(__VLS_thisSlot)[0].item;
    var __VLS_8 = {}.ThemeChange;
    /** @type {[typeof __VLS_components.ThemeChange, ]} */ ;
    // @ts-ignore
    var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ 'onThemeChange': {} }, { show: (__VLS_ctx.themeMenuShow), theme: (__VLS_ctx.theme), themes: (__VLS_ctx.themes), direction: (__VLS_ctx.isMobile ? 'vertical' : 'horizontal') })));
    var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ 'onThemeChange': {} }, { show: (__VLS_ctx.themeMenuShow), theme: (__VLS_ctx.theme), themes: (__VLS_ctx.themes), direction: (__VLS_ctx.isMobile ? 'vertical' : 'horizontal') })], __VLS_functionalComponentArgsRest(__VLS_9), false));
    var __VLS_12 = void 0;
    var __VLS_13 = void 0;
    var __VLS_14 = void 0;
    var __VLS_15 = {
        onThemeChange: (__VLS_ctx.themeChange)
    };
    var __VLS_11;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "nav-icon" }));
    (__VLS_ctx.currentThemeIcon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "nav-text" }));
    (item.label);
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "menu-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "search" }));
if (!__VLS_ctx.Menucollapsed) {
    var __VLS_16 = {}.Input;
    /** @type {[typeof __VLS_components.Input, typeof __VLS_components.Input, ]} */ ;
    // @ts-ignore
    var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        modelValue: (__VLS_ctx.searchValue),
        placeholder: "目前暂支持菜单搜索",
        allowClear: true,
    }));
    var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.searchValue),
            placeholder: "目前暂支持菜单搜索",
            allowClear: true,
        }], __VLS_functionalComponentArgsRest(__VLS_17), false));
}
var __VLS_20 = {}.Button;
/** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(__assign({ 'onClick': {} })));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_24;
var __VLS_25;
var __VLS_26;
var __VLS_27 = {
    onClick: (__VLS_ctx.toggleCollapsed)
};
__VLS_23.slots.default;
(__VLS_ctx.Menucollapsed ? '➡️' : '⬅️');
var __VLS_23;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: (__VLS_ctx.Menucollapsed ? 'menu-collapsed' : 'menu') }));
var __VLS_28 = {}.Spin;
/** @type {[typeof __VLS_components.Spin, ]} */ ;
// @ts-ignore
var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(__assign({ spinning: (__VLS_ctx.loading) }, { class: "loading" })));
var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([__assign({ spinning: (__VLS_ctx.loading) }, { class: "loading" })], __VLS_functionalComponentArgsRest(__VLS_29), false));
var __VLS_32 = {}.Menu;
/** @type {[typeof __VLS_components.Menu, typeof __VLS_components.Menu, ]} */ ;
// @ts-ignore
var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(__assign({ 'onSelect': {} }, { isMobile: (__VLS_ctx.isMobile), collapsed: (__VLS_ctx.Menucollapsed), mode: (__VLS_ctx.Menucollapsed ? 'vertical' : 'inline'), items: __VLS_ctx.menus, selectedKeys: (__VLS_ctx.selectedKeys), openKeys: (__VLS_ctx.openKeys), onLoadData: (__VLS_ctx.loadChildren) })));
var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([__assign({ 'onSelect': {} }, { isMobile: (__VLS_ctx.isMobile), collapsed: (__VLS_ctx.Menucollapsed), mode: (__VLS_ctx.Menucollapsed ? 'vertical' : 'inline'), items: __VLS_ctx.menus, selectedKeys: (__VLS_ctx.selectedKeys), openKeys: (__VLS_ctx.openKeys), onLoadData: (__VLS_ctx.loadChildren) })], __VLS_functionalComponentArgsRest(__VLS_33), false));
var __VLS_36;
var __VLS_37;
var __VLS_38;
var __VLS_39 = {
    onSelect: (__VLS_ctx.goto)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (!__VLS_ctx.loading) }), null, null);
var __VLS_35;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tabs" }));
var __VLS_40 = {}.RouteTab;
/** @type {[typeof __VLS_components.RouteTab, typeof __VLS_components.RouteTab, ]} */ ;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ 'onTabClick': {} }, { 'onRemove': {} }), { 'onRemoveOther': {} }), { 'onRemoveSide': {} }), { 'onSetCurrentDragIndex': {} }), { 'onSortTab': {} }), { 'onToggleShowMenu': {} }), { activeKey: (__VLS_ctx.activeKey), currentDragIndex: (__VLS_ctx.currentDragIndex), tabList: (__VLS_ctx.tabList), showContextMenu: (__VLS_ctx.showContextMenu) })));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([__assign(__assign(__assign(__assign(__assign(__assign(__assign({ 'onTabClick': {} }, { 'onRemove': {} }), { 'onRemoveOther': {} }), { 'onRemoveSide': {} }), { 'onSetCurrentDragIndex': {} }), { 'onSortTab': {} }), { 'onToggleShowMenu': {} }), { activeKey: (__VLS_ctx.activeKey), currentDragIndex: (__VLS_ctx.currentDragIndex), tabList: (__VLS_ctx.tabList), showContextMenu: (__VLS_ctx.showContextMenu) })], __VLS_functionalComponentArgsRest(__VLS_41), false));
var __VLS_44;
var __VLS_45;
var __VLS_46;
var __VLS_47 = {
    onTabClick: (__VLS_ctx.tabClick)
};
var __VLS_48 = {
    onRemove: (__VLS_ctx.removeTab)
};
var __VLS_49 = {
    onRemoveOther: (__VLS_ctx.removeOther)
};
var __VLS_50 = {
    onRemoveSide: (__VLS_ctx.removeSide)
};
var __VLS_51 = {
    onSetCurrentDragIndex: (__VLS_ctx.setCurrentDragIndex)
};
var __VLS_52 = {
    onSortTab: (__VLS_ctx.sortTab)
};
var __VLS_53 = {
    onToggleShowMenu: (__VLS_ctx.toggleShowMenu)
};
var __VLS_43;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onScroll: (__VLS_ctx.handleScroll) }, { class: "mainView" }), { id: "mainView" }));
if (__VLS_ctx.activeKey !== '/') {
    var __VLS_54 = {}.Spin;
    /** @type {[typeof __VLS_components.Spin, typeof __VLS_components.Spin, ]} */ ;
    // @ts-ignore
    var __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54(__assign({ spinning: (__VLS_ctx.mainViewLoading) }, { class: "mainViewLoading" })));
    var __VLS_56 = __VLS_55.apply(void 0, __spreadArray([__assign({ spinning: (__VLS_ctx.mainViewLoading) }, { class: "mainViewLoading" })], __VLS_functionalComponentArgsRest(__VLS_55), false));
}
var __VLS_58 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
var __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_59), false));
{
    var __VLS_thisSlot = __VLS_61.slots.default;
    var Component = __VLS_getSlotParams(__VLS_thisSlot)[0].Component;
    var __VLS_62 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        name: "fade",
        mode: "out-in",
    }));
    var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([{
            name: "fade",
            mode: "out-in",
        }], __VLS_functionalComponentArgsRest(__VLS_63), false));
    __VLS_65.slots.default;
    var __VLS_66 = ((Component));
    // @ts-ignore
    var __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66(__assign({ 'onGoToByRouteName': {} })));
    var __VLS_68 = __VLS_67.apply(void 0, __spreadArray([__assign({ 'onGoToByRouteName': {} })], __VLS_functionalComponentArgsRest(__VLS_67), false));
    var __VLS_70 = void 0;
    var __VLS_71 = void 0;
    var __VLS_72 = void 0;
    var __VLS_73 = {
        onGoToByRouteName: (__VLS_ctx.goToByName)
    };
    var __VLS_69;
    var __VLS_65;
    __VLS_61.slots['' /* empty slot name completion */];
}
var __VLS_61;
/** @type {__VLS_StyleScopedClasses['main-view-container']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-text']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['mainView']} */ ;
/** @type {__VLS_StyleScopedClasses['mainViewLoading']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            Menu: Menu,
            RouteTab: RouteTab,
            ThemeChange: ThemeChange,
            Navigation: Navigation,
            Input: Input,
            Button: Button,
            Spin: Spin,
            isMobile: isMobile,
            theme: theme,
            themes: themes,
            navItems: navItems,
            currentThemeIcon: currentThemeIcon,
            themeMenuShow: themeMenuShow,
            handleNavClick: handleNavClick,
            themeChange: themeChange,
            menus: menus,
            container: container,
            Menucollapsed: Menucollapsed,
            toggleCollapsed: toggleCollapsed,
            loading: loading,
            mainViewLoading: mainViewLoading,
            loadChildren: loadChildren,
            activeKey: activeKey,
            tabList: tabList,
            showContextMenu: showContextMenu,
            toggleShowMenu: toggleShowMenu,
            selectedKeys: selectedKeys,
            openKeys: openKeys,
            searchValue: searchValue,
            sortTab: sortTab,
            setCurrentDragIndex: setCurrentDragIndex,
            currentDragIndex: currentDragIndex,
            tabClick: tabClick,
            removeTab: removeTab,
            removeOther: removeOther,
            removeSide: removeSide,
            goto: goto,
            goToByName: goToByName,
            handleScroll: handleScroll,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
