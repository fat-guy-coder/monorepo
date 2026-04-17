export var random = function (size, floor) {
    if (floor === void 0) { floor = 'floor'; }
    return Math[floor](Math.random() * size);
};
/**
 * 生成一个随机数字数组
 * @param n 数组的长度
 * @param options.unique 是否唯一，默认为 false
 * @param options.max 随机数的最大值（不包含），默认为 n
 */
export var size = function (n, options) {
    if (options === void 0) { options = {}; }
    var _a = options.unique, unique = _a === void 0 ? false : _a, _b = options.max, max = _b === void 0 ? n : _b;
    if (unique && n > max) {
        throw new Error('当需要唯一值时，数组长度 n 不能大于随机数最大值 max');
    }
    if (!unique) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr.push(Math.floor(Math.random() * max));
        }
        return arr;
    }
    else {
        var set = new Set();
        while (set.size < n) {
            set.add(Math.floor(Math.random() * max));
        }
        return Array.from(set);
    }
};
/**
 * 随机选择一个元素
 * @param arr 数组
 * @param exclude 排除的元素
 * @param toKey 将元素转换为字符串
 * @returns 随机选择的元素
 */
export var randPick = function (arr, exclude, toKey) {
    var filtered = arr.filter(function (v) { return !exclude.has(toKey(v)); });
    var result = filtered.length > 0 ? filtered[random(filtered.length)] : arr[0];
    exclude.add(toKey(result));
    return result;
};
