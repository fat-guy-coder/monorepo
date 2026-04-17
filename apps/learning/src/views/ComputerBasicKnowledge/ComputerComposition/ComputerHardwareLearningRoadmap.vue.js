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
var hardwareList = [
    {
        name: 'CPU',
        icon: '🧠',
        subtitle: '中央处理器 · 计算机的大脑',
        principle: '从内存读取指令 → 译码 → 执行（算术逻辑运算）→ 写回结果。依靠控制单元、ALU 和寄存器协同，时钟周期驱动流水线。现代 CPU 含多核、多级缓存与分支预测，提升并行与效率。',
        history: [
            '1971: Intel 4004 (4位)',
            '1978: x86 架构诞生 (8086)',
            '2005: 多核时代 (Pentium D)',
            '2010s: 移动/ARM 崛起，制程竞赛',
            '2020s: 异构计算 (大小核)、AI 加速'
        ]
    },
    {
        name: 'GPU',
        icon: '🎮',
        subtitle: '图形处理器 · 并行计算引擎',
        principle: '专为大规模并行计算设计，包含数千个流处理器核心。通过 SIMT 架构同时处理大量像素/顶点数据。现代 GPU 通过 CUDA/OpenCL 拓展至通用计算（GPGPU），用于 AI 训练、科学模拟。',
        history: [
            '1999: GeForce 256 首称 GPU',
            '2006: CUDA 开启通用计算',
            '2018: 实时光线追踪 (RTX)',
            '2020s: AI 加速核心 (Tensor Core)'
        ]
    },
    {
        name: '内存',
        icon: '🧮',
        subtitle: 'RAM · 临时数据中转站',
        principle: '基于电容存储电荷（DRAM）或触发器（SRAM）。CPU 通过地址总线定位，读写数据。DRAM 需定期刷新，速度远慢于 CPU 缓存，但容量大。内存控制器协调时序与访问。',
        history: [
            '1968: DRAM 发明',
            '1996: SDRAM 同步化',
            '2000s: DDR 系列 (DDR→DDR5)',
            '2010s: 3D 堆叠 (HBM) 突破带宽'
        ]
    },
    {
        name: '主板',
        icon: '🔌',
        subtitle: '电路基板 · 组件互联中枢',
        principle: '提供 CPU 插座、内存插槽、PCIe 扩展槽、芯片组和各类接口。芯片组（南桥/北桥）管理数据流。总线（如 PCIe、DMI）负责高速通信，电源模块稳压供电。',
        history: [
            '1980s: ISA 总线时代',
            '1990s: PCI 取代 ISA',
            '2004: PCIe 诞生，持续翻倍带宽',
            '2010s: M.2、USB-C 普及'
        ]
    },
    {
        name: '存储设备',
        icon: '💾',
        subtitle: 'HDD / SSD · 永久数据仓库',
        principle: 'HDD：磁头读写旋转盘片上的磁畴。SSD：基于 NAND 闪存，通过电荷存储数据，控制器管理磨损均衡与垃圾回收。NVMe 协议释放 PCIe 低延迟潜力。',
        history: [
            '1956: IBM 350 首款硬盘 (5MB)',
            '1980s: IDE/SATA 接口标准化',
            '2007: 首款民用 SSD 问世',
            '2010s: NVMe 成主流，QLC 闪存'
        ]
    },
    {
        name: '电源',
        icon: '⚡',
        subtitle: 'PSU · 能量转换中心',
        principle: '将交流电转换为稳定的直流输出（+12V、+5V、+3.3V）。通过开关电源技术（PWM）提高效率，80 PLUS 认证衡量转换效率。模组化设计便于线材管理。',
        history: [
            '1980s: AT 电源标准',
            '1995: ATX 规范确立',
            '2004: 80 PLUS 能效认证推出',
            '2020s: ATX 3.0/PCIe 5.0 供电'
        ]
    },
    {
        name: '散热系统',
        icon: '❄️',
        subtitle: '风冷/水冷 · 热量搬运工',
        principle: '风冷：导热膏传递热量至鳍片，风扇强制对流。水冷：液体吸收热量，经冷排散热。热管利用相变原理高效传热。均热板与石墨烯等新材料降低热阻。',
        history: [
            '1990s: 被动散热为主',
            '2000s: 热管普及，塔式风冷兴起',
            '2010s: 一体式水冷平民化',
            '2020s: 液金导热、相变材料'
        ]
    },
    {
        name: '网络接口卡',
        icon: '🌐',
        subtitle: 'NIC · 数据出入关口',
        principle: '将数字信号调制为网络介质（铜缆/光纤）可传输的信号。MAC 层处理帧封装与介质访问，PHY 层负责物理信号。现代 NIC 支持 TCP 卸载、RDMA 加速。',
        history: [
            '1973: 以太网诞生',
            '1990s: 10/100M 快速以太网',
            '2000s: 千兆普及，万兆企业化',
            '2020s: 2.5G/5G 家用，Wi-Fi 7'
        ]
    }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['principle']} */ ;
/** @type {__VLS_StyleScopedClasses['history']} */ ;
/** @type {__VLS_StyleScopedClasses['more-link']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hardware-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hardware-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "header-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "hint" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hardware-grid" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.hardwareList)); _i < _a.length; _i++) {
    var item = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (item.name) }, { class: "hw-item" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hw-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "hw-icon" }));
    (item.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hw-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (item.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "hw-sub" }));
    (item.subtitle);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hw-body" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "principle" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (item.principle);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "history" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _b = 0, _c = __VLS_getVForSourceType((item.history)); _b < _c.length; _b++) {
        var ev = _c[_b][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (ev),
        });
        (ev);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hw-footer" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "more-link" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "footer-note" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
/** @type {__VLS_StyleScopedClasses['hardware-container']} */ ;
/** @type {__VLS_StyleScopedClasses['hardware-card']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['hint']} */ ;
/** @type {__VLS_StyleScopedClasses['hardware-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-header']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-body']} */ ;
/** @type {__VLS_StyleScopedClasses['principle']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['history']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['hw-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['more-link']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-note']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            hardwareList: hardwareList,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
