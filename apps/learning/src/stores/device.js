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
import { onMounted, reactive } from 'vue';
import { defineStore } from 'pinia';
export var useDeviceStore = defineStore('device', function () {
    var device = reactive({
        isMobile: window.innerWidth < 768,
        platform: navigator.platform,
        os: { name: '', version: '' },
        cpu: { architecture: '', logicalCores: 0, deviceMemoryGB: null },
        browser: { name: '', version: '' },
        screen: { width: 0, height: 0, availWidth: 0, availHeight: 0, pixelRatio: 0, resolution: '', colorDepth: 0 },
        viewport: { width: 0, height: 0 },
        refreshRateHz: null,
    });
    var setDevice = function (newDevice) {
        Object.assign(device, newDevice);
    };
    onMounted(function () {
        useDeviceStore().$subscribe(function () {
            localStorage.setItem('device', JSON.stringify(device));
        }, { flush: 'sync' });
    });
    return __assign(__assign({}, device), { setDevice: setDevice });
});
