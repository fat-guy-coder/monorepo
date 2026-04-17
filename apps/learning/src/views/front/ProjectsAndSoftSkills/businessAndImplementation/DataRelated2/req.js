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
/**
 * 并发控制类
 */
var RequestConcurrencyController = /** @class */ (function () {
    /**
     * 构造函数
     * @param maxConcurrency 最大并发数，默认为5
     */
    function RequestConcurrencyController(maxConcurrency) {
        if (maxConcurrency === void 0) { maxConcurrency = 2; }
        // 当前正在运行的请求数
        this.runningRequests = 0;
        // 请求队列
        this.queue = [];
        // 请求统计
        this.stats = {
            totalRequests: 0,
            completedRequests: 0,
            failedRequests: 0,
            queueSize: 0
        };
        if (maxConcurrency <= 0) {
            throw new Error("maxConcurrency must be greater than 0");
        }
        this.maxConcurrency = maxConcurrency;
    }
    /**
     * 添加请求到队列
     * @param requestFn 返回Promise的请求函数
     * @returns 返回请求结果的Promise
     */
    RequestConcurrencyController.prototype.add = function (requestFn) {
        var _this = this;
        this.stats.totalRequests++;
        this.stats.queueSize = this.queue.length + 1;
        return new Promise(function (resolve, reject) {
            // 将请求任务添加到队列
            _this.queue.push({ requestFn: requestFn, resolve: resolve, reject: reject });
            // 尝试执行下一个请求
            _this.next();
        });
    };
    /**
     * 执行队列中的下一个请求
     */
    RequestConcurrencyController.prototype.next = function () {
        var _this = this;
        // 如果达到最大并发数或者队列为空，则停止
        if (this.runningRequests >= this.maxConcurrency || this.queue.length === 0) {
            return;
        }
        // 从队列中取出下一个请求
        var task = this.queue.shift();
        console.log(this.queue.length);
        this.runningRequests++;
        this.stats.queueSize = this.queue.length; // 执行请求
        task.requestFn()
            .then(function (result) {
            task.resolve(result);
            _this.stats.completedRequests++;
        })
            .catch(function (error) {
            task.reject(error);
            _this.stats.failedRequests++;
        })
            .finally(function () {
            _this.runningRequests--;
            _this.stats.queueSize = _this.queue.length;
            // 请求完成后继续执行下一个
            _this.next();
        });
    };
    /**
     * 获取当前统计信息
     * @returns 请求统计对象
     */
    RequestConcurrencyController.prototype.getStats = function () {
        return __assign(__assign({}, this.stats), { runningRequests: this.runningRequests, maxConcurrency: this.maxConcurrency });
    };
    /**
     * 清空队列
     */
    RequestConcurrencyController.prototype.clearQueue = function () {
        this.queue = [];
        this.stats.queueSize = 0;
    };
    return RequestConcurrencyController;
}());
// 使用示例
export function main() {
    return __awaiter(this, void 0, void 0, function () {
        var controller, createRequest, requests, i, delay, logStats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    controller = new RequestConcurrencyController(3);
                    createRequest = function (id, delay) {
                        return function () { return new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve("Request ".concat(id, " completed after ").concat(delay, "ms"));
                            }, delay);
                        }); };
                    };
                    requests = [];
                    for (i = 1; i <= 10; i++) {
                        delay = Math.floor(Math.random() * 2500) + 500;
                        requests.push(controller.add(createRequest(i, delay)));
                    }
                    logStats = function () {
                        var stats = controller.getStats();
                        console.log("[".concat(new Date().toLocaleTimeString(), "] Running: ").concat(stats.runningRequests, ", ") +
                            "Completed: ".concat(stats.completedRequests, ", ") +
                            "Failed: ".concat(stats.failedRequests, ", ") +
                            "Queued: ".concat(stats.queueSize));
                    };
                    // 每1秒打印一次统计信息
                    // const intervalId = setInterval(logStats, 1000);
                    // 等待所有请求完成
                    return [4 /*yield*/, Promise.all(requests)];
                case 1:
                    // 每1秒打印一次统计信息
                    // const intervalId = setInterval(logStats, 1000);
                    // 等待所有请求完成
                    _a.sent();
                    // clearInterval(intervalId);
                    // 最终统计
                    logStats();
                    console.log("All requests completed!");
                    return [2 /*return*/];
            }
        });
    });
}
