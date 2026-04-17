var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { onMounted, onUnmounted } from 'vue';
import { THEME_MAIN_GRADIENT_COLOR, THEME_HIGH_CONTRAST_NEON_COLORS, THEME_SECONDARY_GRADIENT_COLORS, THEME_FONT_GRADIENT_COLORS, THEME__MAIN_TEXT_COLOR, } from 'utils/theme';
import { lightMinifyCode } from '@/function/code';
import { random, randPick } from '@/function/math';
var LINEAR_DIRECTION_CANDIDATES = [
    '0deg',
    '90deg',
    '180deg',
    '270deg',
    '45deg',
    '135deg',
    '225deg',
    '315deg',
    '360deg',
];
var RADIAL_DIRECTION_CANDIDATES = [
    'at center',
    'at left',
    'at right',
    'at top',
    'at bottom',
];
/** 方向集合 */
var DIRECTION_CANDIDATES = __spreadArray(__spreadArray(__spreadArray([], LINEAR_DIRECTION_CANDIDATES, true), RADIAL_DIRECTION_CANDIDATES, true), [
    'random',
], false);
//随机方向池，用于随机选择方向
var getDirCandidates = function (type) {
    return type === 'linear'
        ? LINEAR_DIRECTION_CANDIDATES
        : RADIAL_DIRECTION_CANDIDATES;
};
var STATIC_CSS_CODE = "position:relative;overflow:hidden;z-index:1;&::before{transition:opacity 0.2s ease;content:'';position:absolute;z-index:-1;transform-origin:center;}";
// 将解构参数抽离为一个专门的函数
function getGradientAnimationParams(options) {
    if (options === void 0) { options = {}; }
    var _a = options.items, items = _a === void 0 ? [] : _a, //子项配置 子项配置会递归调用 useGradientAnimation
    _b = options.className, //子项配置 子项配置会递归调用 useGradientAnimation
    className = _b === void 0 ? 'gradient-animation' : _b, //全局默认的 CSS 类名
    _c = options.colors, //全局默认的 CSS 类名
    colors = _c === void 0 ? THEME_SECONDARY_GRADIENT_COLORS : _c, //渐变颜色组
    _d = options.textGradientColors, //渐变颜色组
    textGradientColors = _d === void 0 ? THEME_FONT_GRADIENT_COLORS : _d, //字体渐变颜色组
    _e = options.boxShadowColors, //字体渐变颜色组
    boxShadowColors = _e === void 0 ? THEME_HIGH_CONTRAST_NEON_COLORS : _e, //荧光阴影渐变颜色组
    _f = options.boxShadowConfig, //荧光阴影渐变颜色组
    boxShadowConfig = _f === void 0 ? {
        //盒阴影渐变配置
        x: '0', //x轴偏移量
        y: '0', //y轴偏移量
        blur: 0, //模糊半径
        spread: 0.1, //光晕的 spread，单位 rem，控制收窄
        brightness: 1, //亮度
    } : _f, _g = options.opacity, opacity = _g === void 0 ? 1 : _g, //全局透明度
    _h = options.colorsCount, //全局透明度
    colorsCount = _h === void 0 ? 3 : _h, //渐变颜色段数
    _j = options.speed, //渐变颜色段数
    speed = _j === void 0 ? 15 : _j, //背景渐变动画速度
    _k = options.timeUnit, //背景渐变动画速度
    timeUnit = _k === void 0 ? 's' : _k, //时间单位
    _l = options.direction, //时间单位
    direction = _l === void 0 ? '0deg' : _l, //方向
    _m = options.aspectRatio, //方向
    aspectRatio = _m === void 0 ? 1 : _m, //宽高比
    _o = options.gradientTypes, //宽高比
    gradientTypes = _o === void 0 ? ['linear'] : _o, //渐变类型
    _p = options.triggerTimes, //渐变类型
    triggerTimes = _p === void 0 ? ['mounted', 'hover', 'active'] : _p, //背景渐变动画触发时机
    _q = options.prefixName, //背景渐变动画触发时机
    prefixName = _q === void 0 ? 'gradient-anim-' : _q, //前缀名称,防止
    _r = options.animation, //前缀名称,防止
    animation = _r === void 0 ? {
        name: '', //动画名称
        iterationCount: 'infinite', //动画迭代次数
        direction: 'normal', //背景渐变动画方向
        duration: null, //背景渐变动画持续时间
        timingFunction: 'linear', //背景渐变动画缓动函数
        delay: '0s', //背景渐变动画延迟
        playState: 'running', //背景渐变动画状态
    } : _r, keyframe = options.keyframe;
    return {
        items: items,
        className: className,
        colors: colors,
        textGradientColors: textGradientColors,
        boxShadowColors: boxShadowColors,
        boxShadowConfig: boxShadowConfig,
        opacity: opacity,
        colorsCount: colorsCount,
        speed: speed,
        timeUnit: timeUnit,
        keyframe: keyframe,
        gradientTypes: gradientTypes,
        triggerTimes: triggerTimes,
        prefixName: prefixName,
        animation: animation,
        direction: direction,
        aspectRatio: aspectRatio,
    };
}
/** 应用渐变动画
 * @description 一个 Vue composable，用于给元素应用动态背景渐变动画。
 * @param options 应用渐变动画的配置选项
 * @returns 应用渐变动画的配置选项
 */
export function useGradientAnimation(options) {
    if (options === void 0) { options = {}; }
    //style元素
    var styleElement = null;
    onMounted(function () {
        // 使用抽离的函数获得所有参数
        var _a = getGradientAnimationParams(options), items = _a.items, className = _a.className, colors = _a.colors, textGradientColors = _a.textGradientColors, boxShadowColors = _a.boxShadowColors, boxShadowConfig = _a.boxShadowConfig, opacity = _a.opacity, colorsCount = _a.colorsCount, speed = _a.speed, timeUnit = _a.timeUnit, gradientTypes = _a.gradientTypes, triggerTimes = _a.triggerTimes, prefixName = _a.prefixName, animation = _a.animation, direction = _a.direction;
        if (typeof document === 'undefined')
            return;
        //自定义渐变色数组配置子项
        if (items.length > 0) {
            items.forEach(function (item) {
                useGradientAnimation(item);
            });
            return;
        }
        var aspectRatio = getGradientAnimationParams(options).aspectRatio;
        //获取clasName上的宽高比 以便对角线方向的线性渐变做适配  没传就用options里的
        // 用正则把w和h的值取出来转化为数字（支持如w100或h50）
        // const widthMatch = className.match(/w(\d+(\.\d+)?)/i)
        // const heightMatch = className.match(/h(\d+(\.\d+)?)/i)
        // const width = widthMatch ? parseFloat(widthMatch[1]) : undefined
        // const height = heightMatch ? parseFloat(heightMatch[1]) : undefined
        // console.log(width, height)
        // if (width && height) {
        //   aspectRatio = width / height
        // }
        //方向集合，用于随机选择方向
        var dirSet = new Set();
        //往大括号里加css代码 大括号是class的{}
        var getAllDynamicCssCode = function (code, className) {
            return ".".concat(className, "{").concat(STATIC_CSS_CODE, "opacity:").concat(opacity, ";") + code + '}';
        };
        //动画代码 动画代码在大括号外面
        var keyframesCode = '';
        //大括号里面的动画代码
        var KeyCode = '';
        //每个状态下渐变动画的配置信息
        triggerTimes.forEach(function (trigger) {
            //渐变色段
            var baseColors = [];
            //生成动画声明 kfn动画名
            var animDecl = function (kfn) {
                return typeof animation === 'string'
                    ? "".concat(kfn, " ").concat(animation)
                    : "".concat(kfn, " ").concat(animation.duration || 60 / speed + timeUnit, " ").concat(animation.timingFunction, " ").concat(animation.delay, " ").concat(animation.iterationCount, "  ").concat(animation.direction, " ").concat(animation.playState);
            };
            //核心背景样式css code
            var itemKeyCode = '';
            //临时方向
            var temDirection = direction;
            var isRandomDirection = direction === 'random' ||
                colorsCount.randomDirection ||
                colorsCount.allRandom;
            //所有触发时机下生成对应的不同渐变类型动画样式配置
            gradientTypes.map(function (i) {
                var _a, _b, _c;
                //获得每个渐变类型动画的配置信息
                var item = {
                    backgroundSize: '',
                    keyframes: '',
                    direction: '0deg',
                    type: i,
                    animation: '',
                    insertCode: '',
                };
                if (isRandomDirection) {
                    temDirection = randPick(getDirCandidates(i), dirSet, function (v) { return v; });
                }
                switch (i) {
                    case 'linear':
                        item = handleLinearAnimation({ direction: temDirection, type: i, aspectRatio: aspectRatio });
                        //渐变色组颜色并填充主题背景色
                        baseColors = __spreadArray(__spreadArray([
                            "".concat(THEME_MAIN_GRADIENT_COLOR, " 0%")
                        ], handleRandomColors(colors, colorsCount), true), [
                            "".concat(THEME_MAIN_GRADIENT_COLOR, " 100%"),
                        ], false);
                        item.isInsertPseudoElement = true;
                        itemKeyCode = "".concat((_a = item.insertCode) !== null && _a !== void 0 ? _a : '', "background-image:").concat(item.type, "-gradient(").concat(item.direction || direction, ",").concat(baseColors.join(','), ");background-size:").concat(item.backgroundSize, ";");
                        break;
                    case 'radial':
                        item = handleRadialAnimation({ direction: temDirection, type: i });
                        item.isInsertPseudoElement = true;
                        itemKeyCode = "background-image:".concat(item.type, "-gradient(").concat(item.direction || direction, ",").concat(baseColors.join(','), ");background-size:").concat(item.backgroundSize, ";");
                        break;
                    case 'text':
                        item = handleTextAnimation({ direction: temDirection, type: i, aspectRatio: aspectRatio });
                        baseColors = __spreadArray(__spreadArray([
                            "".concat(THEME__MAIN_TEXT_COLOR, " 0%")
                        ], handleRandomColors(textGradientColors, colorsCount), true), [
                            "".concat(THEME__MAIN_TEXT_COLOR, " 100%"),
                        ], false);
                        itemKeyCode = "".concat((_b = item.insertCode) !== null && _b !== void 0 ? _b : '', "background-image:linear-gradient(").concat(item.direction || direction, ",").concat(baseColors.join(','), ");background-size:").concat(item.backgroundSize, ";");
                        break;
                    case 'box-shadow':
                        item = handleBoxShadowAnimation({
                            type: i,
                            boxShadowConfig: boxShadowConfig,
                            boxShadowColors: boxShadowColors,
                        });
                        item.type = item.type;
                        break;
                }
                //随机动画帧名
                item.keyframesName = "".concat(prefixName + Math.random().toString(36).slice(2, 8));
                //动态添加动画关键帧代码
                keyframesCode += "@keyframes ".concat(item.keyframesName, "{").concat(item.keyframes, "}");
                var itemCode = ((_c = item.prefixCode) !== null && _c !== void 0 ? _c : '') +
                    getPseudoClassAndPseudoElementWrapByTrigger(trigger, "".concat(itemKeyCode, "animation:").concat(animDecl(item.keyframesName), ";"), item.isInsertPseudoElement);
                //动态添加动画样式代码
                var clearMonutedClassName = trigger === 'mounted' ? '' : '-' + trigger;
                KeyCode += getAllDynamicCssCode(itemCode, "".concat(className, "-").concat(item.type).concat(clearMonutedClassName));
                return item;
            });
        });
        //初始化css代码
        var css = '';
        css += KeyCode;
        css += keyframesCode;
        styleElement = document.createElement('style');
        styleElement.textContent = lightMinifyCode(css, 'css');
        document.head.appendChild(styleElement);
    });
    onUnmounted(function () {
        if (styleElement && document.head.contains(styleElement)) {
            document.head.removeChild(styleElement);
            styleElement = null;
        }
    });
}
//根据方向获得背景位置的开始和结束位置和背景大小
var getBackgroundPositionAndSize = function (xOrY, degree) {
    var posMap = {
        x: {
            90: { start: '-200% 0', end: '200% 0' },
            270: { start: '200% 0', end: '-200% 0' },
            backgroundSize: '200% 100%',
        },
        y: {
            0: { start: '0 -200%', end: '0 200%' },
            180: { start: '0 200%', end: '0 -200%' },
            backgroundSize: '100% 200%',
        },
        diagonal: {
            start: '0 -200%',
            end: '0 200%',
            backgroundSize: '100% 200%',
        },
    };
    var backgroundSize = posMap[xOrY].backgroundSize;
    //起始位置
    var start = xOrY === 'diagonal' ? posMap[xOrY].start : posMap[xOrY][degree !== null && degree !== void 0 ? degree : '0'].start;
    //结束位置
    var end = xOrY === 'diagonal' ? posMap[xOrY].end : posMap[xOrY][degree !== null && degree !== void 0 ? degree : '0'].end;
    return {
        backgroundSize: backgroundSize,
        keyframes: "0%{background-position:".concat(start, "}  100%{background-position:").concat(end, "}"),
    };
};
/** 处理线性/对角线渐变动画 */
function handleLinearAnimation(_a) {
    var _b, _c;
    var direction = _a.direction, type = _a.type, isText = _a.isText, //文本渐变不需要处理对角线
    aspectRatio = _a.aspectRatio;
    var numberAngle = parseInt(((_b = direction.match(/(-?\d+)/)) === null || _b === void 0 ? void 0 : _b[0]) || '180', 10);
    var backgroundSize = '200% 100%', keyframes = '0%{background-position:200% 0}100%{background-position:-200% 0}', isDiagonal = false, //是否是对角线动画
    transform = '', //伪元素变换 旋转用于线性渐变对角线方向动画
    inset = '0', //伪元素缩放比列
    gradientDirection; //渐变方向(对角线会旋转)
    var angleMap = {
        'to top': 0,
        'to right': 90,
        'to bottom': 180,
        'to left': 270,
    };
    //计算角度 根据传入方向计算角度(因为渐变方向和动画方向不一致)
    var angle = (_c = angleMap[direction]) !== null && _c !== void 0 ? _c : numberAngle - 90;
    if (angle < 0)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    gradientDirection = (angle + 'deg');
    transform = 'rotate(0deg)';
    if (angle % 180 === 0) {
        //这个是Y轴方向的动画
        angle = angle % 360 === 0 ? 0 : 180;
        backgroundSize = getBackgroundPositionAndSize('y', angle.toString()).backgroundSize;
        keyframes = getBackgroundPositionAndSize('y', angle.toString()).keyframes;
    }
    else if (angle % 90 === 0) {
        //这个是X轴方向的动画
        angle = angle === 90 ? 90 : 270;
        backgroundSize = getBackgroundPositionAndSize('x', angle.toString()).backgroundSize;
        keyframes = getBackgroundPositionAndSize('x', angle.toString()).keyframes;
    }
    else {
        //如果是文本不处理对角线，因为对角线需要伪元素旋转，而文字是写在元素里的，伪元素的背景不起作用
        if (!isText) {
            //其他方向就为斜线动画，渐变方向不动,旋转相应角度就可以了
            isDiagonal = true;
            transform = "rotate(".concat(numberAngle, "deg)");
            backgroundSize = getBackgroundPositionAndSize('diagonal').backgroundSize;
            keyframes = getBackgroundPositionAndSize('diagonal').keyframes;
            gradientDirection = '0deg';
            //对角线方向下计算伪元素缩放比列
            var ratio = aspectRatio || 1; //宽高比
            var degree = Math.atan(1 / ratio); //角度
            var line1 = ratio / Math.cos(degree); //线1
            var degree2 = degree + 0.7854; //角度2
            var line2 = line1 * Math.sin(degree2); //线2
            inset = '-' + ((line2 - 1) / 2) * 100 + '%'; //伪元素缩放比列
        }
    }
    return {
        backgroundSize: backgroundSize, //渐变背景大小
        keyframes: keyframes, //动画关键帧
        direction: gradientDirection, //动画方向
        transform: transform, //伪元素变换 旋转用于线性渐变斜线动画
        type: type, //渐变类型
        insertCode: isDiagonal
            ? "inset:".concat(inset, ";transform:").concat(transform, ";")
            : "inset:0;transform:".concat(transform, ";"), //插入代码 如果是对角线动画，则需要旋转伪元素和扩大伪元素的尺寸
    };
}
/** 处理径向渐变动画 */
function handleRadialAnimation(_a) {
    var direction = _a.direction, type = _a.type;
    return {
        backgroundSize: '200% 200%',
        keyframes: '0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}',
        direction: /at\s+/.test(direction)
            ? "circle ".concat(direction)
            : 'circle at center',
        type: type,
    };
}
/** 处理文本渐变动画
 *  0deg, to right: 渐变动画向右走（动画由左到右）
 *  90deg, to top: 渐变动画向上走（动画由下到上）
 *  180deg, to left: 渐变动画向左走（动画由右到左）
 *  270deg, to bottom: 渐变动画向下走（动画由上到下）
 */
function handleTextAnimation(_a) {
    var direction = _a.direction, type = _a.type;
    //文本用的其实是线性渐变
    // 270deg => to bottom（动画向下，渐变方向 to top）
    var _b = handleLinearAnimation({ direction: direction, type: type, isText: true }), backgroundSize = _b.backgroundSize, keyframes = _b.keyframes, gradientDirection = _b.direction;
    return {
        backgroundSize: backgroundSize,
        keyframes: keyframes,
        direction: gradientDirection, // 渐变方向应与动画方向相反
        type: type,
        insertCode: '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;display:block;',
    };
}
/**
 * 处理荧光阴影渐变动画（两种模式：普通渐变，或旋转闪烁模式）
 * @param direction 动画方向
 * @param type 渐变类型
 * @param boxShadowConfig 盒阴影参数，包含 colors, x, y, spread, blur, brightness, mode
 */
function handleBoxShadowAnimation(_a) {
    var type = _a.type, boxShadowConfig = _a.boxShadowConfig, boxShadowColors = _a.boxShadowColors;
    var x = boxShadowConfig.x, y = boxShadowConfig.y, spread = boxShadowConfig.spread, blur = boxShadowConfig.blur, brightness = boxShadowConfig.brightness;
    boxShadowColors = boxShadowConfig.boxShadowColors || boxShadowColors;
    // 强制把 x, y, spread, blur 转成 number
    var numX = typeof x === 'number' ? x : parseFloat(x);
    var numY = typeof y === 'number' ? y : parseFloat(y);
    var numSpread = typeof spread === 'number' ? spread : parseFloat(spread);
    var numBlur = typeof blur === 'number' ? blur : parseFloat(blur);
    // 只做色彩切换动画 (不同颜色切换，不是多层渐变叠加)
    var keyframes = '';
    var n = boxShadowColors.length;
    for (var i = 0; i < n; i++) {
        var percent = Math.round((i * 100) / n);
        var color = boxShadowColors[i];
        var colorValue = color.startsWith('var(') ? color : "".concat(color);
        keyframes += "\n      ".concat(percent, "% {\n        box-shadow: ").concat(numX, "rem ").concat(numY, "rem ").concat((0.9 + numBlur * 0.5).toFixed(2), "rem ").concat(numSpread.toFixed(2), "rem ").concat(colorValue, ";\n      }");
    }
    // 闭合为第一个颜色
    var color0 = boxShadowColors[0];
    var color0Value = color0.startsWith('var(') ? color0 : "".concat(color0);
    keyframes += "\n    100% {\n      box-shadow: ".concat(numX, "rem ").concat(numY, "rem ").concat((0.9 + numBlur * 0.5).toFixed(2), "rem ").concat(numSpread.toFixed(2), "rem ").concat(color0Value, ";\n    }");
    keyframes = keyframes.trim();
    return {
        backgroundSize: '100% 100%',
        keyframes: keyframes,
        type: type,
        prefixCode: "border-radius:inherit;filter:brightness(".concat(brightness, ");"),
    };
}
//随机色段处理
function handleRandomColors(colors, colorsCount) {
    var baseColors = [];
    //随机处理
    var _a = colorsCount || {}, _b = _a.allRandom, allRandom = _b === void 0 ? false : _b, //是否全随机
    _c = _a.randomColorsCount, //是否全随机
    randomColorsCount = _c === void 0 ? false : _c, //是否随机色段数
    _d = _a.randomColorsOrder, //是否随机色段数
    randomColorsOrder = _d === void 0 ? false : _d, //是否随机色段次序
    _e = _a.randomDirection, //是否随机色段次序
    randomDirection = _e === void 0 ? false : _e;
    //全随机
    if (allRandom) {
        randomColorsCount = true;
        randomDirection = true;
        randomColorsOrder = true;
    }
    //渐变色组起始位置
    var start = 0;
    //渐变色组结束位置
    var end = (function () {
        if (randomColorsCount) {
            if (typeof randomColorsCount === 'number')
                return randomColorsCount;
            // 如果是 true，则在 1 ~ colors.length 之间随机
            return 1 + random(colors.length, 'floor');
        }
        else if (typeof colorsCount === 'number') {
            return colorsCount;
        }
        else if (Array.isArray(colorsCount)) {
            // 范围取整随机
            var _a = colorsCount, min = _a[0], max = _a[1];
            start = min;
            return max;
        }
        return colors.length;
    })();
    //范围内随机取值
    end = Math.max(1, Math.min(end, colors.length));
    baseColors = colors.slice(start, end);
    //随机排序
    if (randomColorsOrder) {
        baseColors.sort(function () { return Math.random() - 0.5; });
    }
    //颜色填充主题背景色
    baseColors = baseColors.map(function (c, i) {
        return typeof c === 'string'
            ? "".concat(c, " ").concat(((i + 1) / (baseColors.length + 1)) * 100, "%")
            : "".concat(c.color, " ").concat(c.position);
    });
    return baseColors;
}
//每个触发时机下伪元素的css代码包裹，用于包裹伪元素的css代码
var getPseudoElementCSS = function (code) {
    return "&::before{".concat(code, "}");
};
//伪类和伪元素css包裹
var getPseudoClassAndPseudoElementWrapByTrigger = function (trigger, code, needPseudoElementCSS) {
    var prefixCode = '', suffixCode = '';
    switch (trigger) {
        case 'mounted':
            break;
        case 'hover':
            prefixCode = '&:hover{';
            suffixCode = '}';
            break;
        case 'active':
            prefixCode = '&:active{';
            suffixCode = '}';
            break;
        default:
    }
    return "".concat(prefixCode).concat(needPseudoElementCSS ? getPseudoElementCSS(code) : code).concat(suffixCode);
};
