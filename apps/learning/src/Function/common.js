var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce(func, delay) {
    var timer = null; // 初始化为 null
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            func.apply(_this, args);
        }, delay);
    };
}
/**
 * 节流函数
 * @param func 要执行的函数
 * @param limit 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle(func, limit) {
    var lastFunc = null; // 初始化为 null
    var lastRan = null; // 初始化为 null
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        if (lastRan === null) {
            func.apply(context, args);
            lastRan = Date.now();
        }
        else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
/**
 * 智能排序算法，根据抽样自动选择最优排序方式
 * 用法与 Array.prototype.sort 一致
 * @param array 要排序的数组
 * @param compareFn 比较函数
 * @returns 排序后的新数组
 */
export function smartSort(array, compareFn) {
    if (array.length <= 32) {
        // 小数组优先插入排序
        return insertionSort(__spreadArray([], array, true), compareFn);
    }
    // 抽样，取16个等间隔样本
    var sampleSize = Math.min(16, array.length);
    var sample = [];
    var step = Math.floor(array.length / sampleSize);
    for (var i = 0; i < sampleSize; i++) {
        sample.push(array[i * step]);
    }
    // 检查是否基本有序（升/降）
    var asc = true, desc = true;
    for (var i = 1; i < sample.length; i++) {
        if ((compareFn
            ? compareFn(sample[i - 1], sample[i])
            : sample[i - 1] > sample[i]
                ? 1
                : sample[i - 1] < sample[i]
                    ? -1
                    : 0) > 0)
            asc = false;
        if ((compareFn
            ? compareFn(sample[i - 1], sample[i])
            : sample[i - 1] > sample[i]
                ? 1
                : sample[i - 1] < sample[i]
                    ? -1
                    : 0) < 0)
            desc = false;
    }
    // 如果大致有序，优先插入排序更快
    if (asc || desc) {
        return insertionSort(__spreadArray([], array, true), compareFn);
    }
    // 检查是否数据分布均匀、重复值多
    var valueSet = new Set(sample);
    var uniqueRatio = valueSet.size / sample.length;
    // 大量重复时用归并排序比较好
    if (uniqueRatio < 0.5) {
        return mergeSort(__spreadArray([], array, true), compareFn);
    }
    // 可选：如果元素层叠度更高，考虑timSort
    // 如果数据类型复杂，倾向采用归并
    // 默认用快排
    return quickSort(__spreadArray([], array, true), compareFn);
}
// 插入排序
function insertionSort(arr, compareFn) {
    for (var i = 1; i < arr.length; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 &&
            (compareFn ? compareFn(arr[j], key) : arr[j] > key ? 1 : arr[j] < key ? -1 : 0) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
// 快排
function quickSort(arr, compareFn) {
    if (arr.length <= 16) {
        return insertionSort(arr, compareFn);
    }
    var pivot = arr[Math.floor(arr.length / 2)];
    var left = [];
    var right = [];
    var mid = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var v = arr_1[_i];
        var cmp = compareFn ? compareFn(v, pivot) : v > pivot ? 1 : v < pivot ? -1 : 0;
        if (cmp < 0)
            left.push(v);
        else if (cmp > 0)
            right.push(v);
        else
            mid.push(v);
    }
    return quickSort(left, compareFn).concat(mid, quickSort(right, compareFn));
}
// 归并排序
function mergeSort(arr, compareFn) {
    if (arr.length <= 16) {
        return insertionSort(arr, compareFn);
    }
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid), compareFn);
    var right = mergeSort(arr.slice(mid), compareFn);
    return merge(left, right, compareFn);
}
function merge(left, right, compareFn) {
    var result = [];
    var i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if ((compareFn
            ? compareFn(left[i], right[j])
            : left[i] > right[j]
                ? 1
                : left[i] < right[j]
                    ? -1
                    : 0) <= 0) {
            result.push(left[i++]);
        }
        else {
            result.push(right[j++]);
        }
    }
    while (i < left.length)
        result.push(left[i++]);
    while (j < right.length)
        result.push(right[j++]);
    return result;
}
export function scrollIntoViewById(elementId, behavior) {
    if (behavior === void 0) { behavior = 'smooth'; }
    var element = document.getElementById(elementId);
    if (element) {
        if (element.scrollIntoView) {
            element.scrollIntoView({ behavior: behavior, block: 'center' });
        }
        else {
            element.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
        }
    }
}
//
