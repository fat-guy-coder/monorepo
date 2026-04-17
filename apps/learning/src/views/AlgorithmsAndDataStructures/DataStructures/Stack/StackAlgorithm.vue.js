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
import { ref, reactive } from 'vue';
// 栈可视化数据
var stackElements = ref(['A', 'B', 'C', 'D', 'E']);
var pushElement = function () {
    var chars = 'FGHIJKLMNOPQRSTUVWXYZ';
    var randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    stackElements.value.push(randomChar);
};
var popElement = function () {
    if (stackElements.value.length > 0) {
        stackElements.value.pop();
    }
};
// 当前激活的算法
var activeAlgorithm = ref(0);
// 算法数据
var algorithms = reactive([
    {
        name: '有效的括号',
        description: '检查字符串中的括号是否有效闭合，使用栈来跟踪开括号',
        complexity: {
            time: 'O(n)',
            space: 'O(n)',
        },
        code: "function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n\n  for (const char of s) {\n    if (['(', '{', '['].includes(char)) {\n      stack.push(char);\n    } else {\n      if (stack.length === 0 || stack.pop() !== map[char]) {\n        return false;\n      }\n    }\n  }\n\n  return stack.length === 0;\n}",
        useCases: ['代码编辑器中的语法检查', '表达式解析前的验证', 'HTML/XML标签闭合检查'],
        visual: {
            steps: [
                "遇到开括号 '('、'{' 或 '[' 时入栈",
                "遇到闭括号 ')'、'}' 或 ']' 时检查栈顶元素是否匹配",
                '如果匹配则出栈，否则返回无效',
                '遍历结束后栈应为空',
            ],
        },
    },
    {
        name: '逆波兰表达式求值',
        description: '计算后缀表达式（逆波兰表示法）的值，使用栈存储操作数',
        complexity: {
            time: 'O(n)',
            space: 'O(n)',
        },
        code: "function evalRPN(tokens: string[]): number {\n  const stack: number[] = [];\n\n  for (const token of tokens) {\n    if (['+', '-', '*', '/'].includes(token)) {\n      const b = stack.pop()!;\n      const a = stack.pop()!;\n      let result: number;\n\n      switch (token) {\n        case '+': result = a + b; break;\n        case '-': result = a - b; break;\n        case '*': result = a * b; break;\n        case '/': result = Math.trunc(a / b); break;\n        default: result = 0;\n      }\n\n      stack.push(result);\n    } else {\n      stack.push(parseInt(token, 10));\n    }\n  }\n\n  return stack.pop()!;\n}",
        useCases: ['计算器实现', '编译器中的表达式求值', '数学公式解析'],
        visual: {
            steps: [
                '遍历表达式中的每个token',
                '遇到操作数时入栈',
                '遇到运算符时弹出栈顶两个操作数',
                '执行运算并将结果入栈',
                '最后栈中剩余的元素即为结果',
            ],
        },
    },
    {
        name: '最小栈',
        description: '设计一个栈，支持push、pop、top操作，并能在常数时间内检索到最小元素',
        complexity: {
            time: 'O(1) 所有操作',
            space: 'O(n)',
        },
        code: "class MinStack {\n  private stack: number[];\n  private minStack: number[];\n\n  constructor() {\n    this.stack = [];\n    this.minStack = [];\n  }\n\n  push(val: number): void {\n    this.stack.push(val);\n    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {\n      this.minStack.push(val);\n    }\n  }\n\n  pop(): void {\n    const val = this.stack.pop();\n    if (val === this.minStack[this.minStack.length - 1]) {\n      this.minStack.pop();\n    }\n  }\n\n  top(): number {\n    return this.stack[this.stack.length - 1];\n  }\n\n  getMin(): number {\n    return this.minStack[this.minStack.length - 1];\n  }\n}",
        useCases: [
            '需要快速访问最小元素的场景',
            '实时数据流中的最小值跟踪',
            '算法优化中的辅助数据结构',
        ],
        visual: {
            steps: [
                '使用两个栈：主栈和最小栈',
                '每次push操作时，如果值小于等于最小栈顶元素，则同时压入最小栈',
                'pop操作时，如果弹出的值等于最小栈顶元素，则同时弹出最小栈顶',
                'getMin操作直接返回最小栈顶元素',
            ],
        },
    },
    {
        name: '下一个更大元素',
        description: '对于数组中每个元素，找到下一个比它大的元素，使用单调栈优化',
        complexity: {
            time: 'O(n)',
            space: 'O(n)',
        },
        code: "function nextGreaterElements(nums: number[]): number[] {\n  const n = nums.length;\n  const result: number[] = new Array(n).fill(-1);\n  const stack: number[] = [];\n\n  for (let i = 0; i < 2 * n; i++) {\n    const idx = i % n;\n    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[idx]) {\n      const top = stack.pop()!;\n      result[top] = nums[idx];\n    }\n\n    if (i < n) {\n      stack.push(idx);\n    }\n  }\n\n  return result;\n}",
        useCases: ['股票分析中的价格趋势预测', '数组模式识别', '数据处理管道中的元素关系分析'],
        visual: {
            steps: [
                '初始化结果数组为-1，创建空栈',
                '遍历数组（可循环处理环形数组）',
                '当栈不为空且当前元素大于栈顶元素时，更新结果并出栈',
                '将当前索引入栈',
                '处理完成后返回结果数组',
            ],
        },
    },
    {
        name: '柱状图中最大矩形',
        description: '在柱状图中找到最大的矩形面积，使用栈优化计算过程',
        complexity: {
            time: 'O(n)',
            space: 'O(n)',
        },
        code: "function largestRectangleArea(heights: number[]): number {\n  const stack: number[] = [];\n  let maxArea = 0;\n  let i = 0;\n\n  while (i <= heights.length) {\n    const current = i < heights.length ? heights[i] : 0;\n\n    if (stack.length === 0 || current >= heights[stack[stack.length - 1]]) {\n      stack.push(i++);\n    } else {\n      const top = stack.pop()!;\n      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;\n      maxArea = Math.max(maxArea, heights[top] * width);\n    }\n  }\n\n  return maxArea;\n}",
        useCases: ['图表分析中的最大面积计算', '图像处理中的区域检测', '地理信息系统中的地形分析'],
        visual: {
            steps: [
                '遍历每个柱体，索引为i',
                '当栈为空或当前柱体高度大于等于栈顶柱体高度时，索引入栈',
                '否则计算栈顶柱体形成的矩形面积',
                '高度为柱体高度，宽度为当前i与栈顶前一个索引的差减一',
                '更新最大面积并继续处理',
            ],
        },
    },
    {
        name: '用栈实现队列',
        description: '使用两个栈实现先入先出(FIFO)的队列操作',
        complexity: {
            time: '摊还 O(1)',
            space: 'O(n)',
        },
        code: "class MyQueue {\n  private inStack: number[];\n  private outStack: number[];\n\n  constructor() {\n    this.inStack = [];\n    this.outStack = [];\n  }\n\n  push(x: number): void {\n    this.inStack.push(x);\n  }\n\n  pop(): number {\n    if (this.outStack.length === 0) {\n      while (this.inStack.length > 0) {\n        this.outStack.push(this.inStack.pop()!);\n      }\n    }\n    return this.outStack.pop()!;\n  }\n\n  peek(): number {\n    if (this.outStack.length === 0) {\n      while (this.inStack.length > 0) {\n        this.outStack.push(this.inStack.pop()!);\n      }\n    }\n    return this.outStack[this.outStack.length - 1];\n  }\n\n  empty(): boolean {\n    return this.inStack.length === 0 && this.outStack.length === 0;\n  }\n}",
        useCases: ['需要队列功能但只提供栈API的环境', '多栈环境中的数据处理', '算法设计中数据结构转换'],
        visual: {
            steps: [
                '使用两个栈：输入栈和输出栈',
                'push操作直接压入输入栈',
                'pop/peek操作时，如果输出栈为空，则将输入栈元素全部弹出压入输出栈',
                '然后从输出栈弹出元素',
                'empty操作检查两个栈是否都为空',
            ],
        },
    },
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-container']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-operations']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stack-algorithms-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stack-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stack-container" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.stackElements)); _i < _a.length; _i++) {
    var _b = _a[_i], item = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ key: (index) }, { class: "stack-element" }), { style: ({ '--delay': index * 0.1 + 's' }) }));
    (item);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stack-base" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stack-operations" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.pushElement) }, { class: "operation push" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.popElement) }, { class: "operation pop" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithms-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-tabs" }));
var _loop_1 = function (algorithm, index) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeAlgorithm = index;
        } }, { key: (index) }), { class: "tab" }), { class: ({ active: __VLS_ctx.activeAlgorithm === index }) }));
    (algorithm.name);
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _c < _d.length; _c++) {
    var _e = _d[_c], algorithm = _e[0], index = _e[1];
    _loop_1(algorithm, index);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-content" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _f < _g.length; _f++) {
    var _h = _g[_f], algorithm = _h[0], index = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.activeAlgorithm === index) }), null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (algorithm.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "algorithm-description" }));
    (algorithm.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
    (algorithm.complexity.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "value" }));
    (algorithm.complexity.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (algorithm.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "use-cases" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _j = 0, _k = __VLS_getVForSourceType((algorithm.useCases)); _j < _k.length; _j++) {
        var _l = _k[_j], useCase = _l[0], idx = _l[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (useCase);
    }
    if (algorithm.visual) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-example" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "visual-content" }));
        for (var _m = 0, _o = __VLS_getVForSourceType((algorithm.visual.steps)); _m < _o.length; _m++) {
            var _p = _o[_m], step = _p[0], stepIdx = _p[1];
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (stepIdx) }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-label" }));
            (stepIdx + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
            (step);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "applications-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "complexity-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _q < _r.length; _q++) {
    var _s = _r[_q], algo = _s[0], index = _s[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algo.complexity.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algo.complexity.space);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (algo.useCases[0]);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['stack-algorithms-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-container']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-element']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-base']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-operations']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['push']} */ ;
/** @type {__VLS_StyleScopedClasses['operation']} */ ;
/** @type {__VLS_StyleScopedClasses['pop']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithms-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-content']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-description']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['code-section']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-example']} */ ;
/** @type {__VLS_StyleScopedClasses['visual-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-label']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['application-card']} */ ;
/** @type {__VLS_StyleScopedClasses['app-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['complexity-table']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            stackElements: stackElements,
            pushElement: pushElement,
            popElement: popElement,
            activeAlgorithm: activeAlgorithm,
            algorithms: algorithms,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
