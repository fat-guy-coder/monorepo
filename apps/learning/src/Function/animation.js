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
export var getAnimationClassName = function (animation, stage) {
    return Array.isArray(animation)
        ? animation.map(function (i) { return "".concat(i, "-").concat(stage); }).join(' ')
        : "".concat(animation, "-").concat(stage);
};
export var getAnimationAllClassNames = function (animation) {
    return ['enter-from', 'enter-active', 'enter-to', 'leave-from', 'leave-active', 'leave-to'];
};
//生成节点的动画生成(宽高)
/**
 * 切换动画
 * @param element 元素
 * @param isOpening 是否展开
 * @param duration 动画时间
 * @param properties 动画属性: 'width' | 'height'
 * @returns
 */
export function animateHeight(element_1, isOpening_1) {
    return __awaiter(this, arguments, void 0, function (element, isOpening, duration, properties, timeFunction) {
        var startValues, endValues, animation;
        if (duration === void 0) { duration = 100; }
        if (properties === void 0) { properties = ['height']; }
        if (timeFunction === void 0) { timeFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'; }
        return __generator(this, function (_a) {
            if (duration <= 0) {
                properties.forEach(function (property) {
                    element.style[property] = isOpening ? 'auto' : '0px';
                });
                element.style.opacity = isOpening ? '1' : '0';
                element.style.display = isOpening ? '' : 'none';
                return [2 /*return*/];
            }
            startValues = {};
            endValues = {};
            properties.forEach(function (property) {
                if (isOpening) {
                    element.style.display = '';
                    element.style[property] = 'auto';
                }
                var _a = element.getBoundingClientRect(), height = _a.height, width = _a.width;
                element.style[property] = isOpening ? '0px' : "".concat(property === 'height' ? height : width, "px");
                startValues[property] = isOpening ? '0px' : "".concat(property === 'height' ? height : width, "px");
                endValues[property] = isOpening ? "".concat(property === 'height' ? height : width, "px") : '0px';
            });
            animation = element.animate([startValues, endValues], {
                duration: duration,
                easing: timeFunction,
            });
            return [2 /*return*/, new Promise(function (resolve) {
                    animation.onfinish = function () {
                        if (!isOpening) {
                            element.style.display = 'none';
                        }
                        properties.forEach(function (property) {
                            element.style[property] = isOpening ? 'auto' : '0px';
                        });
                        resolve(true);
                    };
                })];
        });
    });
}
//根据列表数量获取动画时间
/**
 * 根据列表项数量计算动画时间
 * @param itemCount 列表项数量
 * @param baseDuration 基础动画时间 (ms)
 * @param durationPerItem 每个列表项增加的动画时间 (ms)
 * @param maxDuration 最大动画时间 (ms)
 * @returns 计算后的动画时间 (ms)
 */
export function calculateAnimationDuration(_a) {
    var itemCount = _a.itemCount, _b = _a.baseDuration, baseDuration = _b === void 0 ? 150 : _b, _c = _a.durationPerItem, durationPerItem = _c === void 0 ? 25 : _c, _d = _a.maxDuration, maxDuration = _d === void 0 ? 800 : _d;
    var duration = baseDuration + itemCount * durationPerItem;
    return Math.min(duration, maxDuration);
}
