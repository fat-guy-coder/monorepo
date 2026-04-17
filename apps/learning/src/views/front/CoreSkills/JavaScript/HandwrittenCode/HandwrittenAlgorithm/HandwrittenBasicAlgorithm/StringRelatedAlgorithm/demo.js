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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EncodeAndDecode = /** @class */ (function () {
    function EncodeAndDecode(article, useBinaryCode) {
        if (useBinaryCode === void 0) { useBinaryCode = false; }
        //单词映射map 单词:编码  这个字典一般存在数据库中或者请求外部的数据，这里进行模拟
        this.wordMap = new Map();
        //编码表
        this.codeList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        //二进制编码表
        this.binaryCodeList = [0, 1];
        //是否使用二进制编码
        this.useBinaryCode = false;
        //标点符号
        this.dotReg = /[.,;:!()+?$%&]/g;
        //原文
        this.article = '';
        //计数map
        this.map = new Map();
        //带编码的列表
        this.encodeList = [];
        //编码
        this.encodedCode = '';
        //压缩率
        this.compressRate = '';
        this.article = article;
        this.useBinaryCode = useBinaryCode;
        this.encode();
    }
    EncodeAndDecode.prototype.toLowerCase = function (word) {
        return word.match(/^[A-Z]+$/) ? word : word.charAt(0).toLowerCase() + word.slice(1);
    };
    EncodeAndDecode.prototype.encode = function () {
        var _this = this;
        //获取编码
        var words = this.article.split(' ');
        //处理逗号和句号
        words = words.reduce(function (acc, i) {
            var match = i.match(_this.dotReg);
            if (match) {
                var wordIndex_1 = 0;
                var words_1 = i.split(_this.dotReg).filter(Boolean);
                var len_1 = words_1.length;
                i.replace(_this.dotReg, function (m, index) {
                    if (index === 0) {
                        acc.push(m);
                    }
                    if (index > 0) {
                        acc.push(m);
                    }
                    if (wordIndex_1 < len_1) {
                        acc.push(_this.toLowerCase(words_1[wordIndex_1]));
                        wordIndex_1++;
                    }
                    return m;
                });
            }
            else {
                acc.push(_this.toLowerCase(i));
            }
            return acc;
        }, []);
        var len = words.length;
        //获得统计数据
        for (var i = 0; i < len; i++) {
            var word = words[i];
            var value = this.map.get(word);
            if (value) {
                this.map.set(word, { count: value.count + 1, indexs: __spreadArray(__spreadArray([], value.indexs, true), [i], false) });
            }
            else {
                this.map.set(word, { count: 1, indexs: [i] });
            }
        }
        //获取倒叙列表
        var list = this.getList(this.map);
        //获取编码数组
        var charList = this.getCodeListByLength(list.length, this.codeList);
        //获取带编码的列表同时映射单词
        this.encodeList = this.getEncodeList(list, charList);
        this.encodedCode = this.encodeList.map(function (_a) {
            var code = _a.code, index = _a.index;
            return (code || '') + index;
        }).join('');
        this.compressRate = ((this.encodedCode.length / this.article.length) * 100).toFixed(2) + '%';
    };
    //获取编码列表同时映射单词
    EncodeAndDecode.prototype.getEncodeList = function (list, codeList) {
        var _this = this;
        return list.map(function (i, index) {
            var code = '';
            if (_this.wordMap.has(i.word)) {
                code = _this.wordMap.get(i.word) || '';
            }
            else {
                _this.wordMap.set(i.word, codeList[index]);
                code = _this.wordMap.get(i.word) || '';
            }
            return { code: code, index: i.indexs.join(',') };
        });
    };
    //获取倒叙列表
    EncodeAndDecode.prototype.getList = function (map) {
        var arr = [];
        for (var _i = 0, _a = map.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], i = _b[0], j = _b[1];
            arr.push(__assign({ word: i }, j));
        }
        return arr.sort(function (a, b) { return b.count - a.count; });
    };
    //根据位数获取编码表
    EncodeAndDecode.prototype.getCodeListByLength = function (totalIndex, codeList) {
        if (totalIndex <= 26)
            return codeList;
        var indexCount = 26;
        var getCodeList = function (count) {
            if (count === 1)
                return codeList;
            var arr = [];
            for (var i = 1; i < count; i++) {
                var newArr = getCodeList(i);
                arr.push.apply(arr, newArr);
                var _loop_1 = function (j) {
                    var char = newArr[j];
                    var charList = newArr.filter(function (k) { return k !== char; });
                    var len = charList.length;
                    for (var k = 0; k < len; k++) {
                        if (indexCount > totalIndex)
                            return { value: arr };
                        indexCount++;
                        arr.push(char + charList[k]);
                    }
                };
                for (var j = 0; i < 26; i++) {
                    var state_1 = _loop_1(j);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            return arr;
        };
        return getCodeList(2);
    };
    EncodeAndDecode.prototype.clear = function (force) {
        if (force === void 0) { force = false; }
        if (force) {
            this.wordMap.clear();
        }
        this.codeList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        this.article = '';
        this.map.clear();
        this.encodeList = [];
        this.encodedCode = '';
        this.compressRate = '';
    };
    return EncodeAndDecode;
}());
export { EncodeAndDecode };
