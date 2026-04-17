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
import { ref, shallowRef, onScopeDispose, unref } from 'vue';
import message from 'components/Message';
// --- `createFetch` 工厂函数 ---
/**
 * 创建一个可配置的 useFetch 实例
 * @param globalOptions - 全局配置
 */
export function createFetch(globalOptions) {
    if (globalOptions === void 0) { globalOptions = {}; }
    return function useFetch(initialUrl, initialOptions) {
        var _this = this;
        if (initialOptions === void 0) { initialOptions = {}; }
        var data = shallowRef(null);
        var error = shallowRef(null);
        var isLoading = ref(false);
        var isFinished = ref(false);
        var isAborted = ref(false);
        var controller;
        var abort = function () {
            if (controller) {
                controller.abort();
                isAborted.value = true;
                isLoading.value = false;
            }
        };
        var execute = function (url, options) { return __awaiter(_this, void 0, void 0, function () {
            var finalUrl, fullUrl, finalOptions, token, signal, timeoutId, response, responseData, e_1, processedError;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        abort(); // 如果有正在进行的请求，先中止它
                        isLoading.value = true;
                        isFinished.value = false;
                        isAborted.value = false;
                        error.value = null;
                        finalUrl = unref(url) || unref(initialUrl);
                        fullUrl = (globalOptions.baseUrl || '') + finalUrl;
                        finalOptions = __assign(__assign(__assign({}, globalOptions.fetchOptions), initialOptions), options);
                        if (!((_a = globalOptions.interceptors) === null || _a === void 0 ? void 0 : _a.request)) return [3 /*break*/, 2];
                        return [4 /*yield*/, globalOptions.interceptors.request(finalOptions)];
                    case 1:
                        finalOptions = _d.sent();
                        _d.label = 2;
                    case 2:
                        if (!finalOptions.beforeFetch) return [3 /*break*/, 4];
                        return [4 /*yield*/, finalOptions.beforeFetch(finalOptions)];
                    case 3:
                        finalOptions = _d.sent();
                        _d.label = 4;
                    case 4:
                        // 处理 Token
                        if (globalOptions.getToken) {
                            token = globalOptions.getToken();
                            if (token) {
                                finalOptions.headers = __assign(__assign({}, finalOptions.headers), { Authorization: "Bearer ".concat(token) });
                            }
                        }
                        controller = new AbortController();
                        signal = controller.signal;
                        if (finalOptions.timeout) {
                            timeoutId = setTimeout(function () {
                                abort();
                                var timeoutError = new Error('请求超时');
                                error.value = timeoutError;
                                // 触发错误处理流程
                            }, finalOptions.timeout);
                        }
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 12, 17, 18]);
                        return [4 /*yield*/, fetch(fullUrl, __assign(__assign({}, finalOptions), { signal: signal }))];
                    case 6:
                        response = _d.sent();
                        if (timeoutId)
                            clearTimeout(timeoutId);
                        if (!response.ok) {
                            throw new Error("HTTP \u9519\u8BEF! \u72B6\u6001\u7801: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 7:
                        responseData = _d.sent();
                        if (!((_b = globalOptions.interceptors) === null || _b === void 0 ? void 0 : _b.response)) return [3 /*break*/, 9];
                        return [4 /*yield*/, globalOptions.interceptors.response(responseData)];
                    case 8:
                        responseData = _d.sent();
                        _d.label = 9;
                    case 9:
                        if (!finalOptions.afterFetch) return [3 /*break*/, 11];
                        return [4 /*yield*/, finalOptions.afterFetch(responseData)];
                    case 10:
                        responseData = _d.sent();
                        _d.label = 11;
                    case 11:
                        data.value = responseData;
                        return [3 /*break*/, 18];
                    case 12:
                        e_1 = _d.sent();
                        if (signal.aborted) {
                            // 如果是用户主动中止，则不视为错误
                            return [2 /*return*/];
                        }
                        processedError = e_1;
                        if (!((_c = globalOptions.interceptors) === null || _c === void 0 ? void 0 : _c.error)) return [3 /*break*/, 14];
                        return [4 /*yield*/, globalOptions.interceptors.error(processedError)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14:
                        if (!finalOptions.onError) return [3 /*break*/, 16];
                        return [4 /*yield*/, finalOptions.onError(processedError)];
                    case 15:
                        _d.sent();
                        _d.label = 16;
                    case 16:
                        error.value = processedError;
                        // 弹出错误消息
                        if (finalOptions.showErrorMessage !== false) {
                            message.error(processedError.message || '请求失败');
                        }
                        return [3 /*break*/, 18];
                    case 17:
                        isLoading.value = false;
                        isFinished.value = true;
                        controller = undefined;
                        return [7 /*endfinally*/];
                    case 18: return [2 /*return*/];
                }
            });
        }); };
        if (initialOptions.immediate !== false) {
            execute();
        }
        onScopeDispose(function () {
            abort(); // 组件卸载时自动中止请求
        });
        return {
            data: data,
            error: error,
            isLoading: isLoading,
            isFinished: isFinished,
            isAborted: isAborted,
            abort: abort,
            execute: execute,
        };
    };
}
// --- 默认实例 ---
// 创建一个默认的 useFetch 实例，方便直接使用
// 你可以在这里进行全局配置，例如设置 baseUrl
export var useFetch = createFetch({
// baseUrl: 'https://api.example.com',
// getToken: () => localStorage.getItem('token'),
});
