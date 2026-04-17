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
import { onMounted, onUnmounted, reactive } from 'vue';
import { debounce } from '@/function/common';
function parseOS(ua) {
    var _a, _b;
    ua = ua || '';
    if (/windows nt/i.test(ua)) {
        var map = {
            '10.0': '10',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': '7',
            '6.0': 'Vista',
            '5.1': 'XP',
        };
        var m = ua.match(/Windows NT ([0-9.]+)/i);
        var ver = m === null || m === void 0 ? void 0 : m[1];
        return { name: 'Windows', version: ver ? map[ver] || ver : undefined };
    }
    if (/android/i.test(ua)) {
        var m = ua.match(/Android\s([0-9.]+)/i);
        return { name: 'Android', version: m === null || m === void 0 ? void 0 : m[1] };
    }
    if (/iphone|ipad|ipod/i.test(ua)) {
        var m = ua.match(/OS\s([0-9_]+)/i);
        return { name: 'iOS', version: (_a = m === null || m === void 0 ? void 0 : m[1]) === null || _a === void 0 ? void 0 : _a.replace(/_/g, '.') };
    }
    if (/mac os x/i.test(ua)) {
        var m = ua.match(/Mac OS X\s([0-9_]+)/i);
        return { name: 'macOS', version: (_b = m === null || m === void 0 ? void 0 : m[1]) === null || _b === void 0 ? void 0 : _b.replace(/_/g, '.') };
    }
    if (/linux/i.test(ua))
        return { name: 'Linux' };
    return { name: 'Unknown' };
}
function parseBrowser(ua) {
    ua = ua || '';
    // Edge (Chromium)
    var m = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+|\d+\.\d+)/);
    if (m)
        return { name: 'Edge', version: m[1] };
    // Chrome (ignore Edge/Opera)
    m = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+|\d+\.\d+)/);
    if (m && !/OPR\//.test(ua) && !/Edg\//.test(ua))
        return { name: 'Chrome', version: m[1] };
    // Firefox
    m = ua.match(/Firefox\/(\d+\.\d+)/);
    if (m)
        return { name: 'Firefox', version: m[1] };
    // Safari (Version/x.y Safari)
    m = ua.match(/Version\/(\d+\.\d+(?:\.\d+)?)\s+Safari\//);
    if (m && /Safari\//.test(ua) && !/Chrome\//.test(ua))
        return { name: 'Safari', version: m[1] };
    // Opera
    m = ua.match(/OPR\/(\d+\.\d+)/);
    if (m)
        return { name: 'Opera', version: m[1] };
    return { name: 'Unknown', version: '' };
}
function detectArchitecture(ua) {
    var _a;
    if ((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.architecture)
        return navigator.userAgentData.architecture;
    if (/arm64|aarch64/i.test(ua))
        return 'arm64';
    if (/arm/i.test(ua))
        return 'arm';
    if (/wow64|win64|x64|amd64/i.test(ua))
        return 'x64';
    if (/i686|x86/i.test(ua))
        return 'x86';
    return undefined;
}
function estimateRefreshRate() {
    return __awaiter(this, arguments, void 0, function (durationMs) {
        if (durationMs === void 0) { durationMs = 800; }
        return __generator(this, function (_a) {
            if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined')
                return [2 /*return*/, null];
            return [2 /*return*/, new Promise(function (resolve) {
                    var stamps = [];
                    var start = performance.now();
                    var last = start;
                    function step(ts) {
                        stamps.push(ts - last);
                        last = ts;
                        if (ts - start >= durationMs) {
                            var valid = stamps.filter(function (d) { return d > 0; });
                            if (!valid.length)
                                return resolve(null);
                            var avg = valid.reduce(function (a, b) { return a + b; }, 0) / valid.length;
                            var hz = Math.round(1000 / avg);
                            // Snap to common refresh rates
                            var candidates = [60, 75, 90, 100, 120, 144, 165, 240];
                            var closest = hz;
                            var minDiff = Infinity;
                            for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
                                var c = candidates_1[_i];
                                var diff = Math.abs(c - hz);
                                if (diff < minDiff) {
                                    minDiff = diff;
                                    closest = c;
                                }
                            }
                            resolve(closest);
                        }
                        else {
                            requestAnimationFrame(step);
                        }
                    }
                    requestAnimationFrame(step);
                })];
        });
    });
}
export function useDetectDevice(callback, options) {
    var _this = this;
    var _a;
    if (options === void 0) { options = {}; }
    var _b = options.debounceTime, debounceTime = _b === void 0 ? 200 : _b;
    var device = reactive({
        isMobile: false,
        platform: typeof navigator !== 'undefined' ? ((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || navigator.platform || '' : '',
        os: { name: 'Unknown' },
        cpu: { architecture: undefined, logicalCores: undefined, deviceMemoryGB: null },
        browser: { name: 'Unknown', version: '' },
        screen: {
            width: 0,
            height: 0,
            availWidth: 0,
            availHeight: 0,
            pixelRatio: 1,
            resolution: '0x0',
            colorDepth: 24,
        },
        viewport: { width: 0, height: 0 },
        refreshRateHz: null,
    });
    var resizeHandler = debounce(function () {
        device.viewport.width = window.innerWidth;
        device.viewport.height = window.innerHeight;
        device.isMobile = device.viewport.width < 768;
        // screen info (won't change often but update on resize for safety)
        device.screen.width = window.screen.width;
        device.screen.height = window.screen.height;
        device.screen.availWidth = window.screen.availWidth;
        device.screen.availHeight = window.screen.availHeight;
        device.screen.pixelRatio = window.devicePixelRatio || 1;
        device.screen.resolution = "".concat(window.screen.width, "x").concat(window.screen.height);
        device.screen.colorDepth = window.screen.colorDepth || 24;
        callback(device);
    }, debounceTime);
    var visibilityHandler = debounce(function () {
        // 当页面从后台回到前台时，可能刷新率会改变（外接显示器/系统设置变更）
        if (document.visibilityState === 'visible') {
            estimateRefreshRate().then(function (hz) { return (device.refreshRateHz = hz); });
        }
    }, debounceTime);
    var initStaticInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        var ua, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
                    device.os = parseOS(ua);
                    device.browser = parseBrowser(ua);
                    device.cpu.architecture = detectArchitecture(ua);
                    device.cpu.logicalCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined;
                    device.cpu.deviceMemoryGB = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : null;
                    resizeHandler();
                    _a = device;
                    return [4 /*yield*/, estimateRefreshRate()];
                case 1:
                    _a.refreshRateHz = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    onMounted(function () {
        initStaticInfo();
        window.addEventListener('resize', resizeHandler, { passive: true });
        document.addEventListener('visibilitychange', visibilityHandler);
    });
    onUnmounted(function () {
        window.removeEventListener('resize', resizeHandler);
        document.removeEventListener('visibilitychange', visibilityHandler);
    });
    var refresh = function () { return initStaticInfo(); };
    return { device: device, refresh: refresh };
}
