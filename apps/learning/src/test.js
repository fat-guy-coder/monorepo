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
//轮询？
var StoreWithExpire = /** @class */ (function () {
    function StoreWithExpire(item, data, expireTime) {
        // map: Map<StoreData, StoreData> = new Map()
        this.timeMap = new Map();
        this.data = data;
        this.item = item;
        this.expireTime = expireTime;
        // this.map.set(data, data)
    }
    //检测特殊类型
    StoreWithExpire.prototype.valiDateType = function (data) {
        //自我引用
        // if (this.map.has(data)) {
        // }
        for (var i in data) {
            if (typeof data[i] === 'function') {
                throw new Error("".concat(i, "\u4E3A\u51FD\u6570\uFF0C\u4E0D\u80FD\u5B58\u50A8"));
            }
            if (typeof data[i] === 'undefined') {
                throw new Error("".concat(i, "\u4E3Aundefined\uFF0C\u4E0D\u80FD\u5B58\u50A8"));
            }
            if (data[i] instanceof Date) {
                throw new Error("".concat(i, "\u4E3A\u65F6\u95F4\uFF0C\u8BF7\u8F6C\u5316\u4E3A\u5B57\u7B26\u4E32"));
            }
            if (data[i] instanceof RegExp) {
                throw new Error("".concat(i, "\u4E3A\u6B63\u5219\uFF0C\u8BF7\u8F6C\u5316\u4E3A\u5B57\u7B26\u4E32"));
            }
            if (typeof data[i] === 'object') {
                this.valiDateType(data[i]);
            }
        }
    };
    StoreWithExpire.prototype.store = function (item, data, expireTime) {
        try {
            var time = expireTime || this.expireTime;
            var timeNow = Date.now();
            var data_1 = this.data;
            var dataStringify = JSON.stringify(__assign(__assign({}, data_1), { expireTime: time, timeNow: timeNow }));
            this.valiDateType(data_1);
            var key = item || this.item;
            localStorage.setItem(key, dataStringify);
        }
        catch (error) {
            console.log(error);
        }
    };
    StoreWithExpire.prototype.removeItem = function (item) {
        return localStorage.removeItem(item);
    };
    StoreWithExpire.prototype.clear = function () {
        return localStorage.clear();
    };
    StoreWithExpire.prototype.updateItem = function (item, data, expireTime) {
        this.store(item, data, expireTime);
    };
    return StoreWithExpire;
}());
//节流
var throttle = function (fn, delay) {
    //开关
    var open = true;
    return function () {
        if (open) {
            open = false;
        }
        else
            return;
        setTimeout(function () {
            fn();
            open = true;
        }, delay);
    };
};
