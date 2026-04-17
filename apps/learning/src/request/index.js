/**
 * Fetch API 客户端工具
 *
 * 基于原生 Fetch API 实现的 HTTP 客户端，提供与 Axios 类似的 API 接口。
 * 支持请求/响应拦截器、自动 token 注入、统一错误处理等功能。
 *
 * @module utils/fetch
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Message from 'components/Message';
import router from '@/router';
/**
 * 自定义请求错误类
 */
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, code, data, response) {
        if (code === void 0) { code = -1; }
        if (data === void 0) { data = null; }
        var _this = _super.call(this, message) || this;
        _this.name = 'RequestError';
        _this.code = code;
        _this.data = data;
        _this.response = response;
        return _this;
    }
    return RequestError;
}(Error));
// ============================================
// Fetch 客户端实现
// ============================================
/**
 * Fetch 客户端类
 * 提供请求/响应拦截、错误处理、超时控制等功能
 */
var FetchClient = /** @class */ (function () {
    /**
     * 创建 Fetch 客户端实例
     * @param options - 客户端配置选项
     * @param options.baseURL - 基础 URL，默认为空字符串
     * @param options.timeout - 默认超时时间（毫秒），默认 30000
     */
    function FetchClient(options) {
        if (options === void 0) { options = {}; }
        this.baseURL = options.baseURL || '';
        this.timeout = options.timeout || 6000000;
        this.interceptors = {
            request: [],
            response: [],
            error: [],
        };
    }
    /**
     * 添加请求拦截器
     * @param interceptor - 请求拦截器函数
     */
    FetchClient.prototype.addRequestInterceptor = function (interceptor) {
        this.interceptors.request.push(interceptor);
    };
    /**
     * 添加响应拦截器
     * @param interceptor - 响应成功拦截器函数
     * @param errorInterceptor - 响应错误拦截器函数（可选）
     */
    FetchClient.prototype.addResponseInterceptor = function (interceptor, errorInterceptor) {
        this.interceptors.response.push(interceptor);
        if (errorInterceptor) {
            this.interceptors.error.push(errorInterceptor);
        }
    };
    /**
     * 将对象转换为 URLSearchParams 格式（用于 application/x-www-form-urlencoded）
     * @param data - 要转换的数据对象
     * @returns URLSearchParams 实例
     */
    FetchClient.prototype.objectToFormData = function (data) {
        var formData = new URLSearchParams();
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });
        return formData;
    };
    /**
     * 构建完整的请求 URL
     * @param url - 相对或绝对 URL
     * @param baseURL - 基础 URL
     * @param params - 查询参数
     * @returns 完整的 URL 字符串
     */
    FetchClient.prototype.buildURL = function (url, baseURL, params) {
        var base = baseURL || this.baseURL;
        var finalURL;
        // 处理 baseURL 和 url 的拼接
        if (!base || url.startsWith('http://') || url.startsWith('https://')) {
            // 如果 baseURL 为空，或 url 是绝对路径，直接使用 url
            finalURL = url;
        }
        else {
            // 确保 baseURL 以 / 结尾，url 不以 / 开头（或都处理）
            var baseEndsWithSlash = base.endsWith('/');
            var urlStartsWithSlash = url.startsWith('/');
            if (baseEndsWithSlash && urlStartsWithSlash) {
                finalURL = "".concat(base).concat(url.slice(1));
            }
            else if (!baseEndsWithSlash && !urlStartsWithSlash) {
                finalURL = "".concat(base, "/").concat(url);
            }
            else {
                finalURL = "".concat(base).concat(url);
            }
        }
        // 添加查询参数
        if (params && Object.keys(params).length > 0) {
            var urlObj_1 = new URL(finalURL, window.location.origin);
            Object.keys(params).forEach(function (key) {
                var value = params[key];
                if (value !== undefined && value !== null) {
                    urlObj_1.searchParams.append(key, String(value));
                }
            });
            finalURL = urlObj_1.toString();
        }
        return finalURL;
    };
    /**
     * 执行 HTTP 请求
     * @param config - 请求配置
     * @returns Promise，解析为 ApiResponse<T>
     */
    FetchClient.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var processedConfig, _i, _a, interceptor, url, _b, method, params, data, headers, timeout, baseURL, silent, rest, upperCaseMethod, finalURL, finalTimeout, controller, timeoutId, defaultHeaders, mergedHeaders, body, contentType, fetchOptions, response, errorData, contentType_1, _c, presetHttpMessages, error, processedError, _d, _e, interceptor, responseData, responseContentType, raw, _f, _g, interceptor, error_1, timeoutError, processedError_1, _h, _j, interceptor, processedError, _k, _l, interceptor;
            var _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        processedConfig = __assign({}, config);
                        _i = 0, _a = this.interceptors.request;
                        _o.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        interceptor = _a[_i];
                        return [4 /*yield*/, interceptor(processedConfig)];
                    case 2:
                        processedConfig = _o.sent();
                        _o.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        url = processedConfig.url, _b = processedConfig.method, method = _b === void 0 ? 'GET' : _b, params = processedConfig.params, data = processedConfig.data, headers = processedConfig.headers, timeout = processedConfig.timeout, baseURL = processedConfig.baseURL, silent = processedConfig.silent, rest = __rest(processedConfig, ["url", "method", "params", "data", "headers", "timeout", "baseURL", "silent"]);
                        upperCaseMethod = method.toUpperCase();
                        finalURL = this.buildURL(url, baseURL || processedConfig.baseURL, params);
                        finalTimeout = timeout || this.timeout;
                        controller = new AbortController();
                        timeoutId = setTimeout(function () { return controller.abort(); }, finalTimeout);
                        defaultHeaders = {
                            'Content-Type': 'application/json',
                        };
                        mergedHeaders = __assign(__assign({}, defaultHeaders), headers);
                        contentType = mergedHeaders['Content-Type'] || mergedHeaders['content-type'] || 'application/json';
                        if (data && !['GET', 'HEAD'].includes(upperCaseMethod)) {
                            if (contentType === 'application/x-www-form-urlencoded') {
                                // 表单编码格式
                                body = this.objectToFormData(data);
                                // 删除 Content-Type，让浏览器自动设置（包含 boundary）
                                delete mergedHeaders['Content-Type'];
                                delete mergedHeaders['content-type'];
                            }
                            else {
                                // JSON 格式
                                body = JSON.stringify(data);
                            }
                        }
                        fetchOptions = __assign(__assign({}, rest), { method: upperCaseMethod, headers: mergedHeaders, body: body, signal: controller.signal });
                        _o.label = 5;
                    case 5:
                        _o.trys.push([5, 27, , 37]);
                        return [4 /*yield*/, fetch(finalURL, fetchOptions)];
                    case 6:
                        response = _o.sent();
                        clearTimeout(timeoutId);
                        if (!!response.ok) return [3 /*break*/, 18];
                        errorData = null;
                        _o.label = 7;
                    case 7:
                        _o.trys.push([7, 12, , 13]);
                        contentType_1 = response.headers.get('content-type');
                        if (!(contentType_1 && contentType_1.includes('application/json'))) return [3 /*break*/, 9];
                        return [4 /*yield*/, response.json()];
                    case 8:
                        errorData = _o.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        _m = {};
                        return [4 /*yield*/, response.text()];
                    case 10:
                        errorData = (_m.message = _o.sent(), _m);
                        _o.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        _c = _o.sent();
                        return [3 /*break*/, 13];
                    case 13:
                        presetHttpMessages = {
                            500: '服务器内部错误，请稍后再试',
                            504: '网关超时，请稍后重试',
                        };
                        error = new RequestError(presetHttpMessages[response.status] ||
                            (errorData === null || errorData === void 0 ? void 0 : errorData.message) ||
                            "HTTP error! Status: ".concat(response.status), response.status, errorData, response);
                        ;
                        error.config = processedConfig;
                        processedError = error;
                        _d = 0, _e = this.interceptors.error;
                        _o.label = 14;
                    case 14:
                        if (!(_d < _e.length)) return [3 /*break*/, 17];
                        interceptor = _e[_d];
                        return [4 /*yield*/, interceptor(processedError)];
                    case 15:
                        processedError = _o.sent();
                        _o.label = 16;
                    case 16:
                        _d++;
                        return [3 /*break*/, 14];
                    case 17: return [2 /*return*/, Promise.reject(processedError)];
                    case 18:
                        responseData = void 0;
                        responseContentType = response.headers.get('content-type');
                        if (!(responseContentType && responseContentType.includes('application/json'))) return [3 /*break*/, 20];
                        return [4 /*yield*/, response.text()];
                    case 19:
                        raw = _o.sent();
                        // 兼容部分后端在 2xx 下返回空 body 的场景（例如仅依赖 SSE 回流）
                        responseData = raw.trim().length > 0 ? JSON.parse(raw) : { code: 0, message: 'Success', data: null };
                        return [3 /*break*/, 22];
                    case 20: return [4 /*yield*/, response.text()];
                    case 21:
                        responseData = _o.sent();
                        _o.label = 22;
                    case 22:
                        // Special handling for non-standard APIs (e.g. dify)
                        if (typeof url === 'string' &&
                            responseData &&
                            typeof responseData === 'object' &&
                            !('code' in responseData)) {
                            responseData = { code: 0, message: 'success', data: responseData };
                        }
                        // Non-JSON text fallback
                        if (typeof responseData === 'string') {
                            responseData = { code: 0, message: 'Success', data: responseData };
                        }
                        _f = 0, _g = this.interceptors.response;
                        _o.label = 23;
                    case 23:
                        if (!(_f < _g.length)) return [3 /*break*/, 26];
                        interceptor = _g[_f];
                        return [4 /*yield*/, interceptor(responseData)];
                    case 24:
                        responseData = _o.sent();
                        _o.label = 25;
                    case 25:
                        _f++;
                        return [3 /*break*/, 23];
                    case 26: return [2 /*return*/, responseData];
                    case 27:
                        error_1 = _o.sent();
                        clearTimeout(timeoutId);
                        if (!(error_1 instanceof Error && error_1.name === 'AbortError')) return [3 /*break*/, 32];
                        timeoutError = new RequestError('Request timed out', -2, null);
                        ;
                        timeoutError.config = processedConfig;
                        processedError_1 = timeoutError;
                        _h = 0, _j = this.interceptors.error;
                        _o.label = 28;
                    case 28:
                        if (!(_h < _j.length)) return [3 /*break*/, 31];
                        interceptor = _j[_h];
                        return [4 /*yield*/, interceptor(processedError_1)];
                    case 29:
                        processedError_1 = _o.sent();
                        _o.label = 30;
                    case 30:
                        _h++;
                        return [3 /*break*/, 28];
                    case 31: return [2 /*return*/, Promise.reject(processedError_1)];
                    case 32:
                        processedError = error_1;
                        if (!(processedError instanceof RequestError)) {
                            processedError = new RequestError(processedError instanceof Error ? processedError.message : 'Network error', -3, { originalError: processedError });
                        }
                        ;
                        processedError.config = processedConfig;
                        _k = 0, _l = this.interceptors.error;
                        _o.label = 33;
                    case 33:
                        if (!(_k < _l.length)) return [3 /*break*/, 36];
                        interceptor = _l[_k];
                        return [4 /*yield*/, interceptor(processedError)];
                    case 34:
                        processedError = _o.sent();
                        _o.label = 35;
                    case 35:
                        _k++;
                        return [3 /*break*/, 33];
                    case 36: return [2 /*return*/, Promise.reject(processedError)];
                    case 37: return [2 /*return*/];
                }
            });
        });
    };
    return FetchClient;
}());
// ============================================
// 创建并配置单例实例
// ============================================
/**
 * Fetch 客户端单例实例
 * 已配置基础 URL、超时时间和拦截器
 */
var service = new FetchClient({
    baseURL: import.meta.env.VITE_BASE_API || '',
    timeout: 6000000,
});
// 请求拦截器：自动添加 token
service.addRequestInterceptor(function (config) {
    var token = localStorage.getItem('token');
    if (token) {
        var headers = (config.headers || {});
        headers['Authorization'] = "Bearer ".concat(token);
        config.headers = headers;
    }
    return config;
});
// 响应拦截器：处理业务逻辑
service.addResponseInterceptor(
// 成功响应拦截器
function (response) {
    // 成功的响应（code === 0 或 code === 200）
    if (response.code === 0 || response.code === 200) {
        return response;
    }
    // 业务错误：抛出错误，由错误拦截器处理
    throw new RequestError(response.message || 'Request failed', response.code, response.data);
}, 
// 错误拦截器
function (error) {
    var _a;
    console.error('Response error:', error);
    var silent = Boolean((_a = error === null || error === void 0 ? void 0 : error.config) === null || _a === void 0 ? void 0 : _a.silent);
    // 处理 401 未授权错误
    if (error instanceof RequestError && error.code === 401) {
        localStorage.removeItem('token');
        // 防止 401 风暴/循环跳转：检查当前路由
        try {
            if (router.currentRoute.value.path !== '/login') {
                router.push({
                    path: '/login',
                    query: { redirect: router.currentRoute.value.fullPath },
                });
            }
        }
        catch (routerError) {
            console.error('Router error:', routerError);
            // 如果路由跳转失败，使用 window.location 作为后备方案
            window.location.href = '/login';
        }
        if (!silent)
            Message.error('登录已过期，请重新登录');
        return Promise.reject(error);
    }
    // 处理 500 服务器错误
    if (error instanceof RequestError && error.code === 500) {
        if (!silent)
            Message.error('服务器内部错误，请稍后再试');
        return Promise.reject(error);
    }
    // 处理 504 网关超时：不弹出提示，交给调用方/上层逻辑处理
    if (error instanceof RequestError && error.code === 504) {
        return Promise.reject(error);
    }
    // 处理 code === -1 的业务错误：给出提示（避免上层出现未处理异常时“静默”）
    // 仍然保持 reject，让调用方可以继续按需捕获/中断流程
    if (error instanceof RequestError && error.code === -1) {
        if (!silent)
            Message.error(error.message || '操作失败');
        return Promise.reject(error);
    }
    // 处理超时错误（code === -2）：不弹出提示，让调用方自行处理
    if (error instanceof RequestError && error.code === -2) {
        return Promise.reject(error);
    }
    // 处理其他错误
    var message = 'Network error';
    if (error instanceof RequestError) {
        message = error.message;
    }
    else if (error instanceof Error) {
        message = error.message;
    }
    // 业务错误（code !== 0 && code !== 200）已经在响应拦截器中处理并显示消息
    // 这里只处理网络错误和 HTTP 错误
    if (!(error instanceof RequestError && error.code > 0 && error.code < 500)) {
        if (!silent)
            Message.error(message);
    }
    return Promise.reject(error);
});
// ============================================
// 导出函数和类型
// ============================================
/**
 * 通用请求函数
 *
 * @example
 * ```typescript
 * // GET 请求
 * const data = await request<User[]>({
 *   url: '/api/users',
 *   method: 'get',
 *   params: { page: 1, size: 10 }
 * });
 *
 * // POST 请求
 * const result = await request<CreateUserResponse>({
 *   url: '/api/users',
 *   method: 'post',
 *   data: { name: 'John', email: 'john@example.com' }
 * });
 *
 * // 表单编码请求
 * const loginResult = await request<LoginResponse>({
 *   url: '/api/login',
 *   method: 'post',
 *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 *   data: { username: 'user', password: 'pass' }
 * });
 * ```
 *
 * @param config - 请求配置
 * @returns Promise，解析为 ApiResponse<T>
 */
export function request(config) {
    return service.request(config);
}
/**
 * 导出类型定义
 * 注意：RequestConfig 和 ApiResult 已在定义时导出，无需重复导出
 * ApiResponse 从 @/types 重新导出，方便 API 文件统一使用
 */
/**
 * 导出 FetchClient 类（用于高级用法）
 */
export { FetchClient, RequestError };
/**
 * 导出默认实例（用于高级用法）
 */
export default service;
