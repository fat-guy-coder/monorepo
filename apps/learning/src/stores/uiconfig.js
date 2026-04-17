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
import { onMounted, reactive, toRefs } from 'vue';
import { defineStore } from 'pinia';
export var useUIConfigStore = defineStore('uiconfig', function () {
    var storeage = localStorage.getItem('uiConfig');
    var uiConfig = reactive(storeage ? JSON.parse(storeage) : {
        theme: 'light',
        themes: [
            { value: 'light', label: '亮色', icon: '☀️' },
            { value: 'dark', label: '暗色', icon: '🌙' },
            { value: 'warm', label: '暖色', icon: '🔥' },
            { value: 'cool', label: '冷色', icon: '❄️' },
            { value: 'eye-friendly', label: '护眼', icon: '👀' },
            { value: 'more', label: '更多', icon: '🎨' },
        ],
        navItems: [
            {
                icon: '⚙️',
                label: '设置',
                value: 'setting',
            },
            {
                icon: '👤',
                label: '用户',
                value: 'user',
            },
            {
                icon: '☀☽',
                label: '主题',
                value: 'theme',
            },
            {
                icon: '🏠',
                label: '首页',
                value: 'home',
            },
        ],
    });
    function setTheme(newTheme) {
        uiConfig.theme = newTheme;
    }
    // Set initial theme on load
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', uiConfig.theme);
    }
    var setNavItems = function (newNavItems) {
        uiConfig.navItems = newNavItems;
    };
    onMounted(function () {
        useUIConfigStore().$subscribe(function () { localStorage.setItem('uiConfig', JSON.stringify(uiConfig)); }, { flush: 'sync' });
    });
    return __assign(__assign({}, toRefs(uiConfig)), { setTheme: setTheme, setNavItems: setNavItems });
});
