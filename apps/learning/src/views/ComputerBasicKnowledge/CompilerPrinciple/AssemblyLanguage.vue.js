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
import { ref } from 'vue';
var features = ref([
    { icon: '🔍', title: '硬件直接控制', description: '直接操作CPU寄存器、内存地址和I/O端口', color: '#e3f2fd' },
    { icon: '⚡', title: '执行效率高', description: '编译后代码精简，执行速度快，资源消耗少', color: '#e8f5e9' },
    { icon: '🧩', title: '一对一映射', description: '每条汇编指令对应一条机器语言指令', color: '#f3e5f5' },
    { icon: '📏', title: '平台相关性', description: '不同CPU架构有不同的汇编指令集', color: '#fff8e1' },
    { icon: '🎯', title: '精细优化', description: '允许对代码进行极致的空间和时间优化', color: '#e0f7fa' },
    { icon: '🛠️', title: '系统编程', description: '操作系统内核、驱动程序和固件开发的基础', color: '#ffecb3' },
]);
var instructions = ref([
    { name: 'MOV', example: 'MOV AX, BX', description: '将数据从源操作数传输到目标操作数' },
    { name: 'ADD', example: 'ADD AX, 5', description: '加法运算' },
    { name: 'SUB', example: 'SUB CX, DX', description: '减法运算' },
    { name: 'MUL', example: 'MUL BL', description: '无符号乘法' },
    { name: 'DIV', example: 'DIV CL', description: '无符号除法' },
    { name: 'INC', example: 'INC SI', description: '操作数加1' },
    { name: 'DEC', example: 'DEC DI', description: '操作数减1' },
    { name: 'JMP', example: 'JMP LABEL', description: '无条件跳转' },
    { name: 'CMP', example: 'CMP AX, BX', description: '比较两个操作数' },
    { name: 'CALL', example: 'CALL SUBROUTINE', description: '调用子程序' },
    { name: 'RET', example: 'RET', description: '从子程序返回' },
    { name: 'PUSH', example: 'PUSH AX', description: '将操作数压入堆栈' },
    { name: 'POP', example: 'POP BX', description: '从堆栈弹出数据到操作数' },
    { name: 'INT', example: 'INT 21H', description: '调用中断服务程序' },
]);
var applications = ref([
    {
        title: '操作系统内核',
        description: '编写操作系统核心部分，如任务调度、内存管理和中断处理程序'
    },
    {
        title: '设备驱动程序',
        description: '开发需要直接与硬件交互的设备驱动，如显卡、网卡驱动'
    },
    {
        title: '嵌入式系统',
        description: '资源受限的嵌入式设备开发，要求极高的执行效率和紧凑的代码'
    },
    {
        title: '性能关键代码',
        description: '游戏引擎、科学计算等需要极致优化的关键代码段'
    },
    {
        title: '逆向工程',
        description: '分析恶意软件、破解程序或研究闭源软件的工作原理'
    },
    {
        title: '编译器开发',
        description: '编译器后端生成目标机器代码的关键环节'
    },
]);
var comparisons = ref([
    { criteria: '可读性', assembly: '低（需要专业训练）', highLevel: '高（接近自然语言）' },
    { criteria: '开发效率', assembly: '低（代码量大）', highLevel: '高（抽象程度高）' },
    { criteria: '执行效率', assembly: '高（直接操作硬件）', highLevel: '中等（需要编译优化）' },
    { criteria: '可移植性', assembly: '低（与硬件紧密相关）', highLevel: '高（跨平台支持）' },
    { criteria: '控制粒度', assembly: '细（直接控制硬件）', highLevel: '粗（依赖运行时环境）' },
    { criteria: '学习曲线', assembly: '陡峭（需理解计算机体系结构）', highLevel: '平缓（抽象层次高）' },
]);
var assemblyCode = ref("; \u7B80\u5355\u6C47\u7F16\u7A0B\u5E8F\uFF1A\u8BA1\u7B97\u4E24\u6570\u4E4B\u548C\n.MODEL SMALL\n.STACK 100H\n\n.DATA\n    NUM1 DB 5     ; \u5B9A\u4E49\u7B2C\u4E00\u4E2A\u6570\n    NUM2 DB 7     ; \u5B9A\u4E49\u7B2C\u4E8C\u4E2A\u6570\n    SUM  DB ?     ; \u5B58\u50A8\u7ED3\u679C\n\n.CODE\nSTART:\n    MOV AX, @DATA ; \u521D\u59CB\u5316\u6570\u636E\u6BB5\n    MOV DS, AX\n\n    MOV AL, NUM1  ; \u5C06NUM1\u52A0\u8F7D\u5230AL\u5BC4\u5B58\u5668\n    ADD AL, NUM2  ; \u5C06NUM2\u52A0\u5230AL\n    MOV SUM, AL   ; \u5C06\u7ED3\u679C\u5B58\u50A8\u5230SUM\n\n    ; \u663E\u793A\u7ED3\u679C\uFF08\u7B80\u5316\u7248\uFF09\n    MOV DL, SUM\n    ADD DL, '0'   ; \u8F6C\u6362\u4E3AASCII\n    MOV AH, 02H   ; DOS\u663E\u793A\u5B57\u7B26\u529F\u80FD\n    INT 21H\n\n    ; \u9000\u51FA\u7A0B\u5E8F\n    MOV AH, 4CH   ; DOS\u9000\u51FA\u529F\u80FD\n    INT 21H\n\nEND START");
var copyCode = function () {
    navigator.clipboard.writeText(assemblyCode.value)
        .then(function () { return alert('代码已复制到剪贴板！'); })
        .catch(function (err) { return console.error('复制失败:', err); });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['col-instruction']} */ ;
/** @type {__VLS_StyleScopedClasses['col-example']} */ ;
/** @type {__VLS_StyleScopedClasses['col-description']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['col-assembly']} */ ;
/** @type {__VLS_StyleScopedClasses['col-high-level']} */ ;
/** @type {__VLS_StyleScopedClasses['assembly-language-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-flow']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "assembly-language-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chip-group" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "chip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "chip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "chip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "chip" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "overview" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "definition-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "conversion-flow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "features-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "features-grid" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.features)); _i < _a.length; _i++) {
    var _b = _a[_i], feature = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-icon" }, { style: ({ backgroundColor: feature.color }) }));
    (feature.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (feature.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (feature.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "columns" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "instructions-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "instruction-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-instruction" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-description" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.instructions)); _c < _d.length; _c++) {
    var _e = _d[_c], instruction = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-instruction" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "instruction-name" }));
    (instruction.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (instruction.example);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-description" }));
    (instruction.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "applications-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-list" }));
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.applications)); _f < _g.length; _f++) {
    var _h = _g[_f], app = _h[0], index = _h[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "application-item" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-index" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (app.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (app.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-criteria" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-assembly" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-high-level" }));
for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.comparisons)); _j < _k.length; _j++) {
    var _l = _k[_j], item = _l[0], index = _l[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-criteria" }));
    (item.criteria);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-assembly" }));
    (item.assembly);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-high-level" }));
    (item.highLevel);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "example-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.copyCode) }, { class: "copy-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
(__VLS_ctx.assemblyCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['assembly-language-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['chip-group']} */ ;
/** @type {__VLS_StyleScopedClasses['chip']} */ ;
/** @type {__VLS_StyleScopedClasses['chip']} */ ;
/** @type {__VLS_StyleScopedClasses['chip']} */ ;
/** @type {__VLS_StyleScopedClasses['chip']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['overview']} */ ;
/** @type {__VLS_StyleScopedClasses['definition-card']} */ ;
/** @type {__VLS_StyleScopedClasses['conversion-flow']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['features-section']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['columns']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions-section']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['col-instruction']} */ ;
/** @type {__VLS_StyleScopedClasses['col-example']} */ ;
/** @type {__VLS_StyleScopedClasses['col-description']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-instruction']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-name']} */ ;
/** @type {__VLS_StyleScopedClasses['col-example']} */ ;
/** @type {__VLS_StyleScopedClasses['col-description']} */ ;
/** @type {__VLS_StyleScopedClasses['applications-section']} */ ;
/** @type {__VLS_StyleScopedClasses['application-list']} */ ;
/** @type {__VLS_StyleScopedClasses['application-item']} */ ;
/** @type {__VLS_StyleScopedClasses['app-index']} */ ;
/** @type {__VLS_StyleScopedClasses['app-content']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['col-assembly']} */ ;
/** @type {__VLS_StyleScopedClasses['col-high-level']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['col-assembly']} */ ;
/** @type {__VLS_StyleScopedClasses['col-high-level']} */ ;
/** @type {__VLS_StyleScopedClasses['example-section']} */ ;
/** @type {__VLS_StyleScopedClasses['code-container']} */ ;
/** @type {__VLS_StyleScopedClasses['code-header']} */ ;
/** @type {__VLS_StyleScopedClasses['copy-button']} */ ;
/** @type {__VLS_StyleScopedClasses['explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            features: features,
            instructions: instructions,
            applications: applications,
            comparisons: comparisons,
            assemblyCode: assemblyCode,
            copyCode: copyCode,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
