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
var dep = new Map();
var activeMap = new Map();
console.log('aa');
//收集依赖
var track = function (ref, isActiveMap) {
    if (isActiveMap === void 0) { isActiveMap = false; }
    if (!dep.has(ref)) {
        //如果是ref
        if (ref instanceof Ref) {
            dep.set(ref, ref);
        }
        else { //如果是reactive
            dep.set(ref, {
                value: ref,
                oldValue: ref,
                watchers: [],
                patchCalled: false,
                isReactive: true
            });
        }
    }
    // 设置当前激活的ref
    isActiveMap && activeMap.set(ref, ref);
};
//ref实现
var Ref = /** @class */ (function () {
    function Ref(value) {
        this.patchCalled = false;
        this.watchers = [];
        this._value = value;
        this.oldValue = this._value;
        track(this);
    }
    Object.defineProperty(Ref.prototype, "value", {
        get: function () {
            track(this, true);
            return this._value;
        },
        set: function (newVal) {
            var _this = this;
            if (this.watchers.length === 0)
                return;
            executeWatcher(this, function () {
                _this.patchCalled = false;
                _this.oldValue = _this.value;
            });
            this._value = newVal;
        },
        enumerable: false,
        configurable: true
    });
    return Ref;
}());
//执行watchers中的回调
var executeWatcher = function (currntInstance, cb) {
    //执行同步执行的回调,这里需要下面patchCb一样的逻辑,但这里不在扩展
    currntInstance.watchers.forEach(function (i) { return i.syncCb && i.syncCb(cleanUp); });
    //currntInstance.watchers = currntInstance.watchers.filter((i: Watcher) => !i.once)
    //这里做批量更新,即异步更新
    queueMicrotask(function () {
        // //如果执行过了，则不再执行
        if (currntInstance.patchCalled)
            return;
        currntInstance.patchCalled = true;
        currntInstance.watchers.forEach(function (i) {
            var params = getParams(currntInstance, false, i);
            i.patchCb.apply(i, params);
        });
        //执行后,过滤掉有once的回调
        currntInstance.watchers = currntInstance.watchers.filter(function (i) { return !i.once; });
        //执行完了watcher，异步更新patchCalled和oldValue
        if (cb) {
            queueMicrotask(function () {
                cb();
            });
        }
    });
};
//获取watcher的参数的函数
var getParams = function (currntInstance, immediate, i) {
    if (immediate === void 0) { immediate = false; }
    //是否是watch注册的watcher或者立即执行的watcher，注入不同的参数 ，剩下就是effect注册的watcher
    var params = ((i === null || i === void 0 ? void 0 : i.isWatch) || immediate) ? [currntInstance === null || currntInstance === void 0 ? void 0 : currntInstance.value, currntInstance === null || currntInstance === void 0 ? void 0 : currntInstance.oldValue] : [cleanUp];
    //watch第一个参数如果是传入的数组
    if (i === null || i === void 0 ? void 0 : i.deps) {
        //新值数组
        var values_1 = [];
        //旧值数组
        var oldValues_1 = [];
        //获取当前最新值的下标
        var index = i.deps.indexOf(currntInstance);
        i.deps.forEach(function (i) {
            values_1.push(i.value);
            oldValues_1.push(i.oldValue);
        });
        //替换
        values_1[index] = currntInstance === null || currntInstance === void 0 ? void 0 : currntInstance.value;
        //赋值
        params = [values_1, oldValues_1];
    }
    // console.log('params', params)
    return params;
};
var ref = function (value) {
    return new Ref(value);
};
//清理函数
var cleanUp = function (cb) { cb(); };
//获取活跃的ref对象并且将回调推入ref对象的watchers
var getActiveMapAndPushCb = function (cb, options) {
    var _a;
    //如果传了依赖，则使用传入依赖，否则使用当前激活的ref
    var hasDeps = (options === null || options === void 0 ? void 0 : options.deps) && (options === null || options === void 0 ? void 0 : options.deps.length) > 0;
    var activeMapKeys = hasDeps ? options === null || options === void 0 ? void 0 : options.deps : activeMap.keys();
    var watcher = { patchCb: cb };
    //如果需要值更新后立即执行即sync为true,则赋值syncCb
    if (options === null || options === void 0 ? void 0 : options.id)
        watcher.id = options.id;
    //如果需要值更新后立即执行即sync为true,则赋值syncCb
    if (options === null || options === void 0 ? void 0 : options.sync)
        watcher.syncCb = cb;
    //是否只执行一次
    if (options === null || options === void 0 ? void 0 : options.once)
        watcher.once = options === null || options === void 0 ? void 0 : options.once;
    //是否是watch注册的watcher
    if (hasDeps)
        watcher.isWatch = true;
    //如果传入的是数组并且不止一个
    if (hasDeps && (options === null || options === void 0 ? void 0 : options.deps.length) > 1) {
        watcher.deps = options === null || options === void 0 ? void 0 : options.deps;
    }
    //获取活跃的ref对象并且将回调推入watchers
    for (var _i = 0, activeMapKeys_1 = activeMapKeys; _i < activeMapKeys_1.length; _i++) {
        var i = activeMapKeys_1[_i];
        //如果是reactive实例，特殊处理，直接推入watcher
        if (i.isReactive) {
            i.watchers.push(watcher);
        }
        else {
            dep.get(i) && ((_a = dep.get(i)) === null || _a === void 0 ? void 0 : _a.watchers.push(watcher));
        }
    }
    //注册watcher后清空activeMap
    activeMap.clear();
};
//实现副作用函数
var effect = function (cb, optons) {
    //依赖项
    var deps = (optons === null || optons === void 0 ? void 0 : optons.deps) ? Array.isArray(optons === null || optons === void 0 ? void 0 : optons.deps) ? optons === null || optons === void 0 ? void 0 : optons.deps : [optons === null || optons === void 0 ? void 0 : optons.deps] : [];
    deps = deps.map(function (i) {
        //处理特殊类型reactive,获取实例
        if (!(i instanceof Ref || i instanceof Computed)) {
            return dep.get(i);
        }
        return i;
    });
    //是否延迟执行
    var lazy = optons === null || optons === void 0 ? void 0 : optons.lazy;
    //是否同步执行
    var sync = (optons === null || optons === void 0 ? void 0 : optons.flush) === 'sync'; //post需要获得dom更新后的时机，这里就不实现了
    //根据实例获取参数传进回调函数里(立即执行)
    var params = deps.length > 0 ? deps.map(function (i) { return getParams(i, true); }).flat() : [cleanUp];
    //立即执行
    if (!lazy)
        cb.apply(void 0, params);
    getActiveMapAndPushCb(cb, { deps: deps, sync: sync, once: optons === null || optons === void 0 ? void 0 : optons.once, id: optons === null || optons === void 0 ? void 0 : optons.id });
};
var count = ref(1);
var count2 = ref(2);
//实现Computed  惰性求值 在依赖未更新之前使用缓存值，以来更新后返回最新值
var Computed = /** @class */ (function () {
    function Computed(getter) {
        var _this = this;
        this.dirty = false;
        this.patchCalled = false;
        this.watchers = [];
        this.getter = typeof getter === 'function' ? getter : getter.get;
        this.setter = typeof getter === 'function' ? null : getter.set;
        this._value = this.getter(null);
        this.oldValue = this._value;
        //注册watcher，依赖更新后dirty改为true并重新获取值 并执行watcher回调
        getActiveMapAndPushCb(function () {
            _this.dirty = true;
            _this.watchers.forEach(function (i) { return i.patchCb(); });
        });
    }
    Object.defineProperty(Computed.prototype, "value", {
        get: function () {
            //依赖收集
            track(this);
            //如果依赖未更新则返回缓存值
            if (!this.dirty)
                return this._value;
            //如果依赖未更新则返回最新值
            this.dirty = false;
            this.oldValue = this._value;
            this._value = this.getter(this._value);
            return this._value;
        },
        set: function (val) {
            this.setter && this.setter(val);
        },
        enumerable: false,
        configurable: true
    });
    return Computed;
}());
var computed = function (value) { return new Computed(value); };
// const computedCount = computed((perious) => {
//   // console.log(perious) //前一个值
//   return count.value + 10
// })
// effect(() => {
//   console.log('computedCount.value', computedCount.value)
// })
//实现 watch
var watch = function (deps, cb, watchOptions) {
    if (watchOptions === void 0) { watchOptions = {
        once: false,
        immediate: false,
        lazy: true,
        deep: false,
        flush: 'pre'
    }; }
    if (Array.isArray(deps)) {
        //处理函数类型computed
        deps = deps.map(function (i) {
            if (typeof i === 'function') {
                return computed(i);
            }
            return i;
        });
    }
    //watcher的id
    var id = Symbol();
    effect(cb, __assign(__assign({ deps: deps }, watchOptions), { lazy: !watchOptions.immediate, id: id }));
    //返回stop 从watchers里面删除当前watcher就行了
    return function () {
        var arr = Array.isArray(deps) ? deps : [deps];
        arr.forEach(function (i) {
            //根据id删除当前watcher
            i.watchers = i.watchers.filter(function (j) { return j.id !== id; });
        });
        id = null;
    };
};
//使用stop和watch
var stop = watch(count, function (val, old) {
    console.log('watch', val, old);
}, {
    immediate: true
});
//实现reactive
var reactive = function (obj) {
    var proxy = new Proxy(obj, {
        get: function (target, key) {
            if (typeof target[key] === 'object') {
                target[key] = recursiveRreactive(target[key]);
            }
            target[key] && track(target[key]);
            return target[key];
        },
        set: function (target, key, value) {
            // track(target)
            target[key] = value;
            trigger(proxy);
            return true;
        }
    });
    track(proxy);
    return proxy;
};
//递归处理
var recursiveRreactive = function (obj) {
    var recursive = function (item) {
        for (var i in item) {
            if (typeof item[i] === 'object') {
                item[i] = recursive(item[i]);
            }
        }
        return item;
    };
    return recursive(reactive(obj));
};
var trigger = function (p) {
    var instance = dep.get(p);
    //执行watchers中的回调
    executeWatcher(instance, function () {
        instance.patchCalled = false;
        instance.oldValue = instance === null || instance === void 0 ? void 0 : instance.value;
    });
};
var family = reactive({ son: 'ccc' });
// watch(family, (val, old) => {
//   console.log(val, old)
// }, {
//   immediate: true
// })
// effect(() => {
//   console.log(family)
// })
// setTimeout(() => {
//   family.son = 'aaa'
// }, 1000)
// setTimeout(() => {
//   family.son = 'bbb'
// }, 2000)
