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
// 分支数据
var branches = ref([
    {
        name: 'main',
        type: 'main',
        commits: Array(5).fill(null),
        active: true
    },
    {
        name: 'develop',
        type: 'develop',
        commits: Array(8).fill(null),
        active: false
    },
    {
        name: 'feature/login',
        type: 'feature',
        commits: Array(3).fill(null),
        active: true
    },
    {
        name: 'release/v1.2',
        type: 'release',
        commits: Array(2).fill(null),
        active: false
    },
    {
        name: 'hotfix/security-patch',
        type: 'hotfix',
        commits: Array(1).fill(null),
        active: true
    }
]);
// 分支位置计算
var branchStyle = function (index) {
    var positions = [
        { top: '10%', left: '50%' },
        { top: '30%', left: '30%' },
        { top: '30%', left: '70%' },
        { top: '50%', left: '50%' },
        { top: '70%', left: '50%' }
    ];
    return {
        top: positions[index].top,
        left: positions[index].left,
        animationDelay: "".concat(index * 0.2, "s")
    };
};
// 分支类名
var branchClasses = function (branch) {
    return {
        'main-branch': branch.type === 'main',
        'develop-branch': branch.type === 'develop',
        'feature-branch': branch.type === 'feature',
        'release-branch': branch.type === 'release',
        'hotfix-branch': branch.type === 'hotfix',
        'active-branch': branch.active
    };
};
// 分支模型数据
var activeModel = ref('gitflow');
var models = ref([
    {
        id: 'gitflow',
        name: 'Git Flow',
        description: '严格的模型，为发布、功能开发、热修复等定义特定的分支类型，适合有固定发布周期的项目。',
        teamSize: '中大型团队',
        releaseFrequency: '定期发布（每2-4周）',
        complexity: '高',
        featureBranches: [
            { name: 'user-auth' },
            { name: 'payment' },
            { name: 'notifications' }
        ],
        mergeArrows: [
            { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
            { style: { top: '40%', left: '30%', width: '100px', transform: 'rotate(20deg)' } }
        ],
        pros: [
            '明确的发布管理流程',
            '支持并行开发多个功能',
            '热修复独立于新功能开发',
            '适合有严格发布周期的项目'
        ],
        cons: [
            '学习曲线陡峭',
            '分支结构复杂',
            '合并冲突可能较多',
            '不适合持续部署'
        ]
    },
    {
        id: 'githubflow',
        name: 'GitHub Flow',
        description: '简化模型，只有主分支和功能分支，适合持续部署和快速迭代的项目。',
        teamSize: '小型敏捷团队',
        releaseFrequency: '持续部署（每天多次）',
        complexity: '低',
        featureBranches: [
            { name: 'dark-mode' },
            { name: 'search' },
            { name: 'profile' }
        ],
        mergeArrows: [
            { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
            { style: { top: '40%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
            { style: { top: '55%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } }
        ],
        pros: [
            '简单易学',
            '支持持续部署',
            '减少合并冲突',
            '适合SaaS和Web应用'
        ],
        cons: [
            '缺乏发布分支',
            '紧急修复可能复杂',
            '不适合有预发布周期的项目',
            '主分支需要高度稳定'
        ]
    },
    {
        id: 'gitlabflow',
        name: 'GitLab Flow',
        description: '结合Git Flow和GitHub Flow的优点，引入环境分支和上游优先原则。',
        teamSize: '各种规模团队',
        releaseFrequency: '灵活（持续交付或定期发布）',
        complexity: '中',
        featureBranches: [
            { name: 'analytics' },
            { name: 'settings' }
        ],
        mergeArrows: [
            { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
            { style: { top: '40%', left: '30%', width: '100px', transform: 'rotate(20deg)' } },
            { style: { top: '60%', left: '50%', width: '80px', transform: 'rotate(0deg)' } }
        ],
        pros: [
            '支持环境分支（production, staging）',
            '上游优先原则减少冲突',
            '结合CI/CD自动化',
            '适合有多个环境的项目'
        ],
        cons: [
            '比GitHub Flow复杂',
            '需要理解上游优先原则',
            '环境分支可能增加复杂性'
        ]
    }
]);
// 工作流程步骤
var workflowSteps = ref([
    {
        title: '从主分支创建功能分支',
        description: '基于最新的主分支代码创建新分支进行功能开发',
        commands: [
            'git checkout main',
            'git pull',
            'git checkout -b feature/new-feature'
        ]
    },
    {
        title: '开发并定期提交',
        description: '在功能分支上进行开发，定期提交小粒度的变更',
        commands: [
            'git add .',
            'git commit -m "添加新功能X的初始实现"',
            'git push origin feature/new-feature'
        ]
    },
    {
        title: '同步主分支变更',
        description: '定期将主分支的更新合并到功能分支，减少冲突',
        commands: [
            'git checkout main',
            'git pull',
            'git checkout feature/new-feature',
            'git rebase main'
        ]
    },
    {
        title: '创建Pull Request',
        description: '功能完成后创建PR，触发CI/CD流程',
        commands: [
            '# 在GitHub/GitLab上创建Pull Request',
            '# 关联Issue，添加描述'
        ]
    },
    {
        title: '代码审查与讨论',
        description: '团队成员审查代码，提出改进建议',
        commands: []
    },
    {
        title: '解决反馈并更新',
        description: '根据反馈修改代码，推送到功能分支',
        commands: [
            'git add .',
            'git commit -m "根据反馈优化实现"',
            'git push origin feature/new-feature'
        ]
    },
    {
        title: '合并到主分支',
        description: '通过CI/CD后，将功能分支合并到主分支',
        commands: [
            'git checkout main',
            'git merge --no-ff feature/new-feature',
            'git push origin main'
        ]
    },
    {
        title: '部署到生产环境',
        description: '自动或手动将主分支部署到生产环境',
        commands: [
            '# CI/CD系统自动部署',
            '# 或手动触发部署流程'
        ]
    },
    {
        title: '清理功能分支',
        description: '合并后删除功能分支，保持仓库整洁',
        commands: [
            'git branch -d feature/new-feature',
            'git push origin --delete feature/new-feature'
        ]
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['release-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['hotfix-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-management-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['model-detail']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-management-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "logo-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "git-logo" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.branches)); _i < _a.length; _i++) {
    var _b = _a[_i], branch = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ class: "branch" }, { key: (index) }), { style: (__VLS_ctx.branchStyle(index)) }), { class: (__VLS_ctx.branchClasses(branch)) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-name" }));
    (branch.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-commits" }));
    for (var _c = 0, _d = __VLS_getVForSourceType((branch.commits)); _c < _d.length; _c++) {
        var _e = _d[_c], c = _e[0], i = _e[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit" }, { key: (i) }));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-section importance" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "importance-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-section models" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-tabs" }));
var _loop_1 = function (model) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.activeModel = model.id;
        } }, { key: (model.id) }), { class: (['model-tab', { active: __VLS_ctx.activeModel === model.id }]) }));
    (model.name);
};
for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.models)); _f < _g.length; _f++) {
    var model = _g[_f][0];
    _loop_1(model);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-content" }));
for (var _h = 0, _j = __VLS_getVForSourceType((__VLS_ctx.models)); _h < _j.length; _h++) {
    var model = _j[_h][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (model.id) }, { class: "model-detail" }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.activeModel === model.id) }), null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-description" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (model.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (model.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-stats" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
    (model.teamSize);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
    (model.releaseFrequency);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "stat-value" }));
    (model.complexity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-diagram" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-line main" }));
    if (model.id === 'gitflow') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-line development" }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-branches" }));
    for (var _k = 0, _l = __VLS_getVForSourceType((model.featureBranches)); _k < _l.length; _k++) {
        var _m = _l[_k], fb = _m[0], idx = _m[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "feature-branch" }, { key: (idx) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
        (fb.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-line" }));
    }
    if (model.id === 'gitflow') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "release-branch" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-line" }));
    }
    if (model.id === 'gitflow') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hotfix-branch" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-line" }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "merge-arrows" }));
    for (var _o = 0, _p = __VLS_getVForSourceType((model.mergeArrows)); _o < _p.length; _o++) {
        var _q = _p[_o], arrow = _q[0], idx = _q[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "arrow" }, { key: (idx) }), { style: (arrow.style) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "arrow-head" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "arrow-line" }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "model-pros-cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "pros" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _r = 0, _s = __VLS_getVForSourceType((model.pros)); _r < _s.length; _r++) {
        var _t = _s[_r], pro = _t[0], idx = _t[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (pro);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cons" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (var _u = 0, _v = __VLS_getVForSourceType((model.cons)); _u < _v.length; _u++) {
        var _w = _v[_u], con = _w[0], idx = _w[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (idx),
        });
        (con);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-section workflow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "workflow-steps" }));
for (var _x = 0, _y = __VLS_getVForSourceType((__VLS_ctx.workflowSteps)); _x < _y.length; _x++) {
    var _z = _y[_x], step = _z[0], index = _z[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (step.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step.description);
    if (step.commands) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-commands" }));
        for (var _0 = 0, _1 = __VLS_getVForSourceType((step.commands)); _0 < _1.length; _0++) {
            var _2 = _1[_0], cmd = _2[0], cmdIdx = _2[1];
            __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({
                key: (cmdIdx),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
            (cmd);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-section best-practices" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practices-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-section tools" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tools-grid" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-command" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-command" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-command" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "tool-command" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "resources" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://nvie.com/posts/a-successful-git-branching-model/",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://guides.github.com/introduction/flow/",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://docs.gitlab.com/ee/topics/gitlab_flow.html",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://www.atlassian.com/git/tutorials/comparing-workflows",
    target: "_blank",
});
/** @type {__VLS_StyleScopedClasses['branch-management-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['git-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-name']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-commits']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['importance']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['importance-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['models']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['model-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['model-content']} */ ;
/** @type {__VLS_StyleScopedClasses['model-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['model-description']} */ ;
/** @type {__VLS_StyleScopedClasses['model-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stat']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['model-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['main']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['development']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-branches']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['release-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['hotfix-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-line']} */ ;
/** @type {__VLS_StyleScopedClasses['merge-arrows']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-head']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow-line']} */ ;
/** @type {__VLS_StyleScopedClasses['model-pros-cons']} */ ;
/** @type {__VLS_StyleScopedClasses['pros']} */ ;
/** @type {__VLS_StyleScopedClasses['cons']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step-commands']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['best-practices']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['practices-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['content-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tools']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tools-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-command']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-command']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-command']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-card']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-command']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['resources']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            branches: branches,
            branchStyle: branchStyle,
            branchClasses: branchClasses,
            activeModel: activeModel,
            models: models,
            workflowSteps: workflowSteps,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
