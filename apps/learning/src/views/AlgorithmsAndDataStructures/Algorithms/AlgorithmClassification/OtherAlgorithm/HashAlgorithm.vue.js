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
// 哈希算法比较数据
var algorithms = ref([
    {
        name: "MD5",
        length: 128,
        security: 20,
        securityText: "不安全",
        risk: 95,
        applications: "文件校验, 非安全场景"
    },
    {
        name: "SHA-1",
        length: 160,
        security: 30,
        securityText: "不安全",
        risk: 85,
        applications: "旧版TLS/SSL, Git"
    },
    {
        name: "SHA-224",
        length: 224,
        security: 70,
        securityText: "基本安全",
        risk: 35,
        applications: "特定安全协议"
    },
    {
        name: "SHA-256",
        length: 256,
        security: 90,
        securityText: "安全",
        risk: 15,
        applications: "区块链, TLS/SSL, 密码存储"
    },
    {
        name: "SHA-384",
        length: 384,
        security: 95,
        securityText: "高安全",
        risk: 5,
        applications: "高安全系统, 数字证书"
    },
    {
        name: "SHA-512",
        length: 512,
        security: 98,
        securityText: "极高安全",
        risk: 2,
        applications: "军事级加密, 敏感数据"
    }
]);
// 算法详细信息
var algorithmDetails = ref([
    {
        name: "MD5 (Message Digest 5)",
        length: 128,
        year: 1991,
        description: "曾广泛使用的哈希算法，已发现大量碰撞漏洞。处理512位分组，产生128位摘要。不再适用于安全场景。",
        example: "5d41402abc4b2a76b9719d911017c592",
        vulnerability: "已证实可生成碰撞，Google在2017年展示了SHA-1碰撞攻击"
    },
    {
        name: "SHA-1 (Secure Hash Algorithm 1)",
        length: 160,
        year: 1995,
        description: "设计用于替代MD5，但已被证明存在弱点。处理512位分组，产生160位摘要。已不再推荐用于安全目的。",
        example: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
        vulnerability: "2017年Google成功实施碰撞攻击（SHAttered）"
    },
    {
        name: "SHA-256",
        length: 256,
        year: 2001,
        description: "SHA-2系列成员，使用Merkle-Damgård结构。处理512位分组，产生256位摘要。目前广泛用于安全应用。",
        example: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
        vulnerability: "目前未发现有效碰撞攻击"
    },
    {
        name: "SHA-512",
        length: 512,
        year: 2001,
        description: "SHA-2系列最长摘要版本，处理1024位分组，产生512位摘要。提供极高安全性，但计算资源消耗更大。",
        example: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
        vulnerability: "目前未发现有效攻击方法"
    }
]);
// 安全实践
var securityPractices = ref([
    {
        icon: "🔑",
        title: "使用强哈希算法",
        description: "选择SHA-256或更高版本，避免MD5和SHA-1"
    },
    {
        icon: "🧂",
        title: "始终加盐",
        description: "每个用户使用唯一盐值，长度至少16字节"
    },
    {
        icon: "⏱️",
        title: "增加计算成本",
        description: "使用bcrypt、PBKDF2或Argon2增加哈希计算时间"
    },
    {
        icon: "🛡️",
        title: "定期更新算法",
        description: "随着计算能力提升，及时迁移到更安全的算法"
    }
]);
// 密码哈希方法演进
var hashingMethods = ref([
    {
        name: "纯哈希",
        security: 30,
        securityLabel: "不安全",
        description: "直接存储哈希值（如MD5、SHA-1），易受彩虹表攻击"
    },
    {
        name: "加盐哈希",
        security: 60,
        securityLabel: "基本安全",
        description: "为每个密码添加唯一盐值后再哈希，防御彩虹表攻击"
    },
    {
        name: "自适应哈希",
        security: 90,
        securityLabel: "安全",
        description: "bcrypt/PBKDF2/Scrypt，可调节计算成本，增加暴力破解难度"
    },
    {
        name: "内存硬函数",
        security: 95,
        securityLabel: "高安全",
        description: "Argon2/Scrypt，同时消耗大量内存和CPU，防御ASIC攻击"
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['without-salt']} */ ;
/** @type {__VLS_StyleScopedClasses['with-salt']} */ ;
/** @type {__VLS_StyleScopedClasses['overview']} */ ;
/** @type {__VLS_StyleScopedClasses['security-practices']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-table']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['salt-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['code-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hash-algorithms" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "overview-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.algorithms)); _i < _a.length; _i++) {
    var algo = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "row" }, { key: (algo.name) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-name" }));
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (algo.length);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "security" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "security-bar" }, { style: ({ width: algo.security + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (algo.securityText);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ({ 'risk-high': algo.risk > 70, 'risk-medium': algo.risk > 40 && algo.risk <= 70, 'risk-low': algo.risk <= 40 }) }));
    (algo.risk);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (algo.applications);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algorithm-cards" }));
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.algorithmDetails)); _b < _c.length; _b++) {
    var _d = _c[_b], algo = _d[0], index = _d[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (algo.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-meta" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (algo.length);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (algo.year);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-description" }));
    (algo.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "input" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "output" }));
    (algo.example);
    if (algo.vulnerability) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "algo-security" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "warning" }));
        (algo.vulnerability);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "salt-explanation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "salt-concept" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "salt-visual" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "without-salt" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "problem" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "with-salt" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "process" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "benefit" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "salt-implementation" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "implementation-steps" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "security-practices" }));
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.securityPractices)); _e < _f.length; _e++) {
    var _g = _f[_e], practice = _g[0], index = _g[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
    (practice.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (practice.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (practice.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "password-hashing" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hashing-evolution" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.hashingMethods)); _h < _j.length; _h++) {
    var _k = _j[_h], method = _k[0], index = _k[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-name" }));
    (method.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-security" }, { style: ({ width: method.security + '%' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (method.securityLabel);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "method-description" }));
    (method.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-examples" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "code-example" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)(__assign({ class: "code-block" }));
/** @type {__VLS_StyleScopedClasses['hash-algorithms']} */ ;
/** @type {__VLS_StyleScopedClasses['overview']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-card']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-card']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-card']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-table']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-name']} */ ;
/** @type {__VLS_StyleScopedClasses['security']} */ ;
/** @type {__VLS_StyleScopedClasses['security-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['algorithm-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-card']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-description']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-example']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['output']} */ ;
/** @type {__VLS_StyleScopedClasses['algo-security']} */ ;
/** @type {__VLS_StyleScopedClasses['warning']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['salt-explanation']} */ ;
/** @type {__VLS_StyleScopedClasses['salt-concept']} */ ;
/** @type {__VLS_StyleScopedClasses['salt-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['without-salt']} */ ;
/** @type {__VLS_StyleScopedClasses['process']} */ ;
/** @type {__VLS_StyleScopedClasses['problem']} */ ;
/** @type {__VLS_StyleScopedClasses['with-salt']} */ ;
/** @type {__VLS_StyleScopedClasses['process']} */ ;
/** @type {__VLS_StyleScopedClasses['benefit']} */ ;
/** @type {__VLS_StyleScopedClasses['salt-implementation']} */ ;
/** @type {__VLS_StyleScopedClasses['implementation-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['security-practices']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['password-hashing']} */ ;
/** @type {__VLS_StyleScopedClasses['hashing-evolution']} */ ;
/** @type {__VLS_StyleScopedClasses['method']} */ ;
/** @type {__VLS_StyleScopedClasses['method-name']} */ ;
/** @type {__VLS_StyleScopedClasses['method-security']} */ ;
/** @type {__VLS_StyleScopedClasses['method-description']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['code-examples']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['code-example']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            algorithms: algorithms,
            algorithmDetails: algorithmDetails,
            securityPractices: securityPractices,
            hashingMethods: hashingMethods,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
