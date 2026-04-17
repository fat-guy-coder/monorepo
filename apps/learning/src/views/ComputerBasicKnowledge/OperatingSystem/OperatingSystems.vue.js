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
import { ref, computed } from 'vue';
// 当前日期
var currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
// 操作系统分类
var categories = [
    { id: 'desktop', name: '桌面系统', icon: '💻' },
    { id: 'server', name: '服务器系统', icon: '📡' },
    { id: 'mobile', name: '移动系统', icon: '📱' },
    { id: 'embedded', name: '嵌入式系统', icon: '🔌' },
    { id: 'real-time', name: '实时系统', icon: '⏱️' },
    { id: 'other', name: '其他系统', icon: '🔀' }
];
// 当前激活的分类
var activeCategory = ref('desktop');
// 操作系统数据
var operatingSystems = [
    // 桌面系统
    {
        id: 'windows',
        category: 'desktop',
        name: 'Microsoft Windows',
        type: '专有软件',
        icon: '🪟',
        description: '微软开发的图形化操作系统，全球最流行的个人电脑操作系统',
        useCases: ['家庭和办公室电脑', '游戏平台', '教育机构', '中小企业'],
        pros: ['广泛的软件兼容性', '用户友好的界面', '强大的游戏支持', '广泛的硬件支持'],
        cons: ['资源消耗较大', '安全性问题较多', '许可证费用', '隐私问题']
    },
    {
        id: 'macos',
        category: 'desktop',
        name: 'macOS',
        type: '专有软件',
        icon: '🍎',
        description: '苹果公司为其Mac系列电脑开发的专有操作系统',
        useCases: ['创意专业人士', '开发人员', '设计师', '高端用户'],
        pros: ['优秀的用户体验', '强大的安全性能', '硬件软件深度整合', 'Unix基础'],
        cons: ['硬件限制', '价格昂贵', '游戏支持有限', '兼容性问题']
    },
    {
        id: 'linux',
        category: 'desktop',
        name: 'Linux发行版',
        type: '开源',
        icon: '🐧',
        description: '基于Linux内核的开源操作系统集合，有各种发行版',
        useCases: ['开发人员', '服务器管理', '教育领域', '旧硬件再利用'],
        pros: ['完全免费和开源', '高度可定制', '安全性强', '资源占用少'],
        cons: ['学习曲线陡峭', '专业软件支持有限', '硬件兼容性问题', '碎片化严重']
    },
    {
        id: 'chromeos',
        category: 'desktop',
        name: 'Chrome OS',
        type: '专有软件',
        icon: '🌐',
        description: 'Google开发的基于Linux的操作系统，以Chrome浏览器为核心',
        useCases: ['教育市场', '轻量级计算需求', '云计算用户', '网络应用为主的工作'],
        pros: ['快速启动', '高度安全', '自动更新', '成本低廉'],
        cons: ['离线功能有限', '专业软件支持不足', '存储空间小', '依赖网络连接']
    },
    // 服务器系统
    {
        id: 'windows-server',
        category: 'server',
        name: 'Windows Server',
        type: '专有软件',
        icon: '🖥️',
        description: '微软开发的服务器操作系统，提供企业级服务和管理功能',
        useCases: ['企业IT基础设施', 'Active Directory服务', 'SQL Server数据库', '.NET应用'],
        pros: ['熟悉的Windows界面', '强大的GUI管理工具', '优秀的Active Directory支持', '与Windows生态紧密集成'],
        cons: ['许可成本高', '资源消耗大', '安全性挑战', '需要定期重启']
    },
    {
        id: 'linux-server',
        category: 'server',
        name: 'Linux服务器',
        type: '开源',
        icon: '🐧',
        description: '基于Linux内核的服务器操作系统，如Ubuntu Server, CentOS等',
        useCases: ['Web服务器', '数据库服务器', '云计算平台', '容器化环境'],
        pros: ['免费且开源', '高度稳定可靠', '强大的命令行工具', '资源效率高'],
        cons: ['学习曲线陡峭', '技术支持依赖社区', 'GUI工具有限', '企业级支持需要付费']
    },
    {
        id: 'unix',
        category: 'server',
        name: 'UNIX系统',
        type: '专有软件',
        icon: '🧩',
        description: '类Unix操作系统如AIX、HP-UX、Solaris等，主要用于企业级服务器',
        useCases: ['大型企业服务器', '金融交易系统', '电信基础设施', '高可靠性环境'],
        pros: ['极高的稳定性', '强大的安全功能', '优秀的垂直扩展能力', '成熟的生态系统'],
        cons: ['专有硬件需求', '许可成本高昂', '学习曲线陡峭', '应用生态系统有限']
    },
    {
        id: 'freebsd',
        category: 'server',
        name: 'FreeBSD',
        type: '开源',
        icon: '😈',
        description: '类Unix的开源操作系统，以高性能和稳定性著称',
        useCases: ['网络设备', '存储服务器', '网络基础设施', '高流量网站'],
        pros: ['优秀的网络性能', 'ZFS文件系统支持', '许可限制较少', '高度稳定'],
        cons: ['硬件兼容性有限', '桌面支持较弱', '学习曲线陡峭', '社区规模较小']
    },
    // 移动系统
    {
        id: 'android',
        category: 'mobile',
        name: 'Android',
        type: '开源',
        icon: '🤖',
        description: 'Google开发的基于Linux的移动操作系统，全球市场份额最高',
        useCases: ['智能手机', '平板电脑', '智能电视', '车载系统'],
        pros: ['高度可定制', '广泛的设备选择', '丰富的应用生态', '与Google服务深度集成'],
        cons: ['碎片化问题严重', '安全更新不及时', '性能差异大', '隐私问题']
    },
    {
        id: 'ios',
        category: 'mobile',
        name: 'iOS',
        type: '专有软件',
        icon: '📱',
        description: '苹果公司为其移动设备开发的专有操作系统',
        useCases: ['iPhone手机', 'iPad平板', 'iPod touch', 'Apple生态系统'],
        pros: ['优秀的用户体验', '强大的安全性能', '及时的系统更新', '应用质量高'],
        cons: ['封闭生态系统', '设备选择有限', '高度依赖Apple服务', '自定义选项少']
    },
    {
        id: 'harmonyos',
        category: 'mobile',
        name: 'HarmonyOS',
        type: '专有软件',
        icon: '🌸',
        description: '华为开发的分布式操作系统，支持多种设备类型',
        useCases: ['智能手机', '物联网设备', '智能家居', '车机系统'],
        pros: ['分布式架构', '跨设备协同', '低延迟', '资源高效利用'],
        cons: ['生态系统尚未成熟', '国际应用支持有限', '地缘政治影响', '发展时间较短']
    },
    // 嵌入式系统
    {
        id: 'vxworks',
        category: 'embedded',
        name: 'VxWorks',
        type: '专有软件',
        icon: '⚙️',
        description: 'Wind River Systems开发的实时操作系统，广泛应用于嵌入式系统',
        useCases: ['航空航天系统', '工业自动化', '医疗设备', '网络设备'],
        pros: ['硬实时性能', '高可靠性', '小型内存占用', '强大的开发工具'],
        cons: ['许可成本高', '学习曲线陡峭', '资源要求高', '社区支持有限']
    },
    {
        id: 'qnx',
        category: 'embedded',
        name: 'QNX',
        type: '专有软件',
        icon: '🚗',
        description: '黑莓公司开发的实时操作系统，特别适用于汽车和关键任务系统',
        useCases: ['汽车信息娱乐系统', '工业控制系统', '医疗设备', '网络路由器'],
        pros: ['微内核架构', '高可靠性和容错', '实时性能优秀', '安全认证支持'],
        cons: ['专有许可费用', '开发工具成本高', '学习资源有限', '生态系统较小']
    },
    {
        id: 'rtos',
        category: 'embedded',
        name: 'FreeRTOS',
        type: '开源',
        icon: '⏱️',
        description: '开源的实时操作系统内核，专为微控制器设计',
        useCases: ['物联网设备', '微控制器应用', '传感器网络', '小型嵌入式系统'],
        pros: ['完全免费开源', '轻量级设计', '广泛的硬件支持', '活跃的开发者社区'],
        cons: ['功能相对基础', '缺乏高级特性', '商业支持有限', '文档不够完善']
    },
    // 实时系统
    {
        id: 'rtlinux',
        category: 'real-time',
        name: 'RTLinux',
        type: '开源',
        icon: '⚡',
        description: '实时Linux扩展，提供硬实时能力',
        useCases: ['工业自动化', '机器人控制', '数据采集', '实时处理系统'],
        pros: ['结合Linux的丰富功能', '硬实时能力', '开源免费', '广泛的硬件支持'],
        cons: ['配置复杂', '实时性能不如专用RTOS', '学习曲线陡峭', '社区支持有限']
    },
    {
        id: 'zephyr',
        category: 'real-time',
        name: 'Zephyr OS',
        type: '开源',
        icon: '🌬️',
        description: 'Linux基金会支持的开源实时操作系统，专为物联网设备设计',
        useCases: ['可穿戴设备', '智能家居设备', '工业传感器', '低功耗设备'],
        pros: ['高度模块化', '跨平台支持', '强大的安全功能', '活跃的开发社区'],
        cons: ['相对年轻', '文档不够完善', '商业案例较少', '高级功能有限']
    },
    // 其他系统
    {
        id: 'haiku',
        category: 'other',
        name: 'Haiku OS',
        type: '开源',
        icon: '🎨',
        description: '受BeOS启发的开源操作系统，注重性能和响应能力',
        useCases: ['多媒体工作站', '怀旧计算', '轻量级桌面', '开发平台'],
        pros: ['优秀的响应能力', '简洁优雅的API', '轻量级设计', '独特的用户体验'],
        cons: ['硬件兼容性有限', '应用生态小', '开发进展缓慢', '社区规模小']
    },
    {
        id: 'fuchsia',
        category: 'other',
        name: 'Google Fuchsia',
        type: '专有软件',
        icon: '🌈',
        description: 'Google开发的基于Zircon内核的操作系统，面向多种设备类型',
        useCases: ['物联网设备', '智能家居', '移动设备', '嵌入式系统'],
        pros: ['微内核设计', '跨设备扩展性', '现代架构', 'Google支持'],
        cons: ['尚未成熟', '应用生态缺乏', '路线图不明确', '社区参与有限']
    }
];
// 过滤出当前类别的操作系统
var filteredSystems = computed(function () {
    return operatingSystems.filter(function (system) { return system.category === activeCategory.value; });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['os-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['os-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['os-categories']} */ ;
/** @type {__VLS_StyleScopedClasses['os-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stats" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-categories" }));
var _loop_1 = function (category) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeCategory = category.id;
        } }, { key: (category.id) }), { class: (['category-card', { active: __VLS_ctx.activeCategory === category.id }]) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-icon" }));
    (category.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "category-name" }));
    (category.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.categories)); _i < _a.length; _i++) {
    var category = _a[_i][0];
    _loop_1(category);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-grid" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredSystems)); _b < _c.length; _b++) {
    var system = _c[_b][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (system.id) }, { class: "os-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-icon" }));
    (system.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-name" }));
    (system.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-type" }));
    (system.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "os-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
    (system.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "info-section" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _d = 0, _e = __VLS_getVForSourceType((system.useCases)); _d < _e.length; _d++) {
        var _f = _e[_d], scene = _f[0], index = _f[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (index),
        });
        (scene);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _g = 0, _h = __VLS_getVForSourceType((system.pros)); _g < _h.length; _g++) {
        var _j = _h[_g], pro = _j[0], index = _j[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (index),
        });
        (pro);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _k = 0, _l = __VLS_getVForSourceType((system.cons)); _k < _l.length; _k++) {
        var _m = _l[_k], con = _m[0], index = _m[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (index),
        });
        (con);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.currentDate);
/** @type {__VLS_StyleScopedClasses['os-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-container']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['os-categories']} */ ;
/** @type {__VLS_StyleScopedClasses['category-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['category-name']} */ ;
/** @type {__VLS_StyleScopedClasses['os-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['os-card']} */ ;
/** @type {__VLS_StyleScopedClasses['os-header']} */ ;
/** @type {__VLS_StyleScopedClasses['os-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['os-name']} */ ;
/** @type {__VLS_StyleScopedClasses['os-type']} */ ;
/** @type {__VLS_StyleScopedClasses['os-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            currentDate: currentDate,
            categories: categories,
            activeCategory: activeCategory,
            filteredSystems: filteredSystems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
