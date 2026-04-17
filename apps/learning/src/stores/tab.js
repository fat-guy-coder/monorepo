var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { onMounted, ref, } from 'vue';
import { defineStore } from 'pinia';
export var useTabStore = defineStore('tab', function () {
    var storage = localStorage.getItem('tab');
    var _a = storage ? JSON.parse(storage) : {
        list: [{
                name: 'home',
                path: '/',
                label: '🏡 主页',
            },],
        key: '/',
    }, list = _a.list, key = _a.key;
    //激活标签列表
    var tabList = ref(list);
    //激活标签的path
    var activeKey = ref(key);
    //移除标签
    function removeTab(path, callback) {
        var currentKey = tabList.value.findIndex(function (i) { return i.path === path; }) - 1;
        if (activeKey.value === path) {
            activeKey.value = tabList.value[currentKey].path;
            if (callback)
                callback(activeKey.value);
        }
        tabList.value = tabList.value.filter(function (i) { return i.path !== path; });
    }
    //移除其他标签
    function removeOther(path, callback) {
        activeKey.value = path;
        tabList.value = tabList.value.filter(function (i) { return i.path === path || i.path === '/'; });
        if (callback)
            callback(path);
    }
    //移除侧边标签
    function removeSide(index, side, targetKey, callback) {
        if (side === 'left') {
            tabList.value = tabList.value.filter(function (i, iIndex) { return iIndex >= index || iIndex === 0; });
        }
        else {
            tabList.value = tabList.value.filter(function (i, iIndex) { return iIndex <= index; });
        }
        activeKey.value = targetKey;
        if (callback)
            callback(targetKey);
    }
    //激活标签
    function activateTab(_a, callback) {
        var path = _a.path, name = _a.name, label = _a.label;
        if (activeKey.value === path) {
            return;
        }
        activeKey.value = path;
        if (!tabList.value.some(function (i) { return i.path === path; })) {
            tabList.value.push({ path: path, name: name, label: label });
        }
        if (callback)
            callback(path);
    }
    //激活标签(只通过path激活)
    function activateTabOnlyKey(path, callback) {
        if (activeKey.value === path) {
            return;
        }
        activeKey.value = path;
        if (callback)
            callback(path);
    }
    // @ params scrollTop: number 滚动位置
    // @ params currentKey: string 当前标签页的path
    // @ return void 设置激活标签页的滚动位置
    //设置激活标签页的滚动位置
    function setScrollTop(scrollTop, currentKey) {
        var tab = tabList.value.find(function (i) { return i.path === currentKey; });
        if (tab) {
            tab.scrollTop = scrollTop;
        }
    }
    //标签页小菜单的显示状态
    var showContextMenu = ref(false);
    //切换标签页小菜单的显示状态
    function toggleShowMenu(value) {
        showContextMenu.value = value;
    }
    //当前拖拽的标签页索引
    var currentDragIndex = ref(0);
    //当前拖拽的标签页
    function setCurrentDragIndex(index) {
        currentDragIndex.value = index;
    }
    //排序标签页
    function sortTab(index) {
        if (currentDragIndex.value !== index) {
            var items = __spreadArray([], tabList.value, true);
            var dragged = items.splice(currentDragIndex.value, 1)[0];
            items.splice(index, 0, dragged);
            tabList.value = items;
            currentDragIndex.value = index;
        }
    }
    onMounted(function () {
        useTabStore().$subscribe(function () {
            localStorage.setItem('tab', JSON.stringify({ list: tabList.value, key: activeKey.value }));
        }, { flush: 'sync' });
    });
    return { tabList: tabList, activeKey: activeKey, activateTab: activateTab, activateTabOnlyKey: activateTabOnlyKey, removeTab: removeTab, removeOther: removeOther, removeSide: removeSide, setScrollTop: setScrollTop, showContextMenu: showContextMenu, toggleShowMenu: toggleShowMenu, setCurrentDragIndex: setCurrentDragIndex, currentDragIndex: currentDragIndex, sortTab: sortTab };
});
