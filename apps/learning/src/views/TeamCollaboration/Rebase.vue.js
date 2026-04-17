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
var showRebase = ref(false);
var masterCommits = ref([
    { hash: 'c1a2b3', message: '初始化项目' },
    { hash: 'd4e5f6', message: '添加核心功能' },
    { hash: 'e7f8a9', message: '修复登录问题' },
]);
var featureCommits = ref([
    { hash: 'a1b2c3', message: '开始开发新功能' },
    { hash: 'b4c5d6', message: '实现功能A' },
    { hash: 'c7d8e9', message: '实现功能B' },
]);
var comparisonData = ref([
    { criteria: '提交历史', rebase: '线性整洁', merge: '保留分支结构' },
    { criteria: '历史记录', rebase: '重写提交历史', merge: '保留原始提交' },
    { criteria: '使用场景', rebase: '个人分支整理', merge: '公共分支整合' },
    { criteria: '复杂性', rebase: '较高（需要解决冲突）', merge: '较低（自动处理）' },
    { criteria: '安全性', rebase: '谨慎使用（重写历史）', merge: '安全（不修改历史）' },
    { criteria: '可视化', rebase: '单一直线', merge: '分支合并点' },
]);
var workflowSteps = ref([
    {
        title: '检出功能分支',
        description: '切换到需要变基的分支',
        code: "git checkout feature-branch",
    },
    {
        title: '执行变基操作',
        description: '将当前分支变基到目标分支',
        code: "git rebase main",
    },
    {
        title: '解决冲突',
        description: '处理变基过程中出现的代码冲突',
        code: "# \u7F16\u8F91\u51B2\u7A81\u6587\u4EF6\ngit add <\u51B2\u7A81\u6587\u4EF6>\ngit rebase --continue",
    },
    {
        title: '完成变基',
        description: '所有冲突解决后完成变基过程',
        code: "# \u53D8\u57FA\u6210\u529F\ngit rebase --continue",
    },
    {
        title: '更新主分支',
        description: '将变基后的分支合并回主分支',
        code: "git checkout main\ngit merge feature-branch",
    },
]);
var useCases = ref([
    {
        icon: '🧹',
        title: '整理提交历史',
        description: '在合并分支前整理本地提交，创建更清晰、更有逻辑的提交历史',
        example: "# \u4EA4\u4E92\u5F0F\u53D8\u57FA\uFF08\u6574\u7406\u6700\u8FD13\u6B21\u63D0\u4EA4\uFF09\ngit rebase -i HEAD~3",
    },
    {
        icon: '📦',
        title: '同步上游变更',
        description: '将功能分支更新到主分支的最新状态，避免合并冲突',
        example: "# \u5728\u529F\u80FD\u5206\u652F\u4E0A\u540C\u6B65\u4E3B\u5206\u652F\u53D8\u66F4\ngit checkout feature\ngit rebase main",
    },
    {
        icon: '🔀',
        title: '合并多个提交',
        description: '将多个小提交合并为更有意义的单个提交',
        example: "# \u4EA4\u4E92\u5F0F\u53D8\u57FA\u5408\u5E76\u63D0\u4EA4\ngit rebase -i HEAD~5\n# \u5C06pick\u6539\u4E3Asquash\u6216fixup",
    },
    {
        icon: '🔄',
        title: '修改历史提交',
        description: '修改过去的提交信息或内容（仅限于尚未推送的提交）',
        example: "# \u4FEE\u6539\u6700\u8FD1\u4E00\u6B21\u63D0\u4EA4\ngit commit --amend\n\n# \u4FEE\u6539\u66F4\u65E9\u7684\u63D0\u4EA4\ngit rebase -i HEAD~3\n# \u5C06pick\u6539\u4E3Aedit",
    },
]);
var bestPractices = ref([
    {
        title: '不要变基公共分支',
        description: '永远不要对已经推送到远程仓库的分支执行变基，这会破坏其他协作者的工作',
    },
    {
        title: '频繁同步主分支',
        description: '定期将功能分支变基到主分支，减少最终合并时的冲突',
    },
    {
        title: '使用交互式变基',
        description: '交互式变基（-i）可以整理、修改和合并提交，创建更清晰的历史',
    },
    {
        title: '小步提交，定期整理',
        description: '开发时小步提交，然后使用变基整理提交历史',
    },
    {
        title: '理解冲突解决',
        description: '变基时可能需要多次解决冲突，准备好处理冲突',
    },
    {
        title: '备份重要分支',
        description: '在执行重要变基操作前，创建备份分支以防万一',
    },
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-card']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['cases-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rebase-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subtitle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "demo-area" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rebase-visualization" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-diagram" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch master" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commits" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.masterCommits)); _i < _a.length; _i++) {
    var _b = _a[_i], commit = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "commit" }, { key: ('m' + index) }), { style: ({ '--order': index }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-node" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-hash" }));
    (commit.hash);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-message" }));
    (commit.message);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch feature" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commits" }));
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.featureCommits)); _c < _d.length; _c++) {
    var _e = _d[_c], commit = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "commit" }, { key: ('f' + index) }), { style: ({ '--order': index }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-node" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-hash" }));
    (commit.hash);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-message" }));
    (commit.message);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-connection" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rebase-controls" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.showRebase = true;
    } }, { class: "rebase-button" }));
if (__VLS_ctx.showRebase) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rebase-result" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "result-message" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "post-rebase-diagram" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch master" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "branch-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commits" }));
    for (var _f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.masterCommits)); _f < _g.length; _f++) {
        var _h = _g[_f], commit = _h[0], index = _h[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "commit" }, { key: ('m' + index) }), { style: ({ '--order': index }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-node" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-hash" }));
        (commit.hash);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-message" }));
        (commit.message);
    }
    for (var _j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.featureCommits)); _j < _k.length; _j++) {
        var _l = _k[_j], commit = _l[0], index = _l[1];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign({ class: "commit" }, { key: ('fr' + index) }), { style: ({ '--order': __VLS_ctx.masterCommits.length + index }) }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-node feature-node" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-hash" }));
        (commit.hash);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "commit-message" }));
        (commit.message);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "intro-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "intro-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "rebase-flow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-arrow" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flow-step" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-icon" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "comparison-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "comparison-table" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-criteria" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-type" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-type" }));
for (var _m = 0, _o = __VLS_getVForSourceType((__VLS_ctx.comparisonData)); _m < _o.length; _m++) {
    var _p = _o[_m], row = _p[0], index = _p[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-row" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-criteria" }));
    (row.criteria);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-type" }));
    (row.rebase);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "col-type" }));
    (row.merge);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "workflow-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "workflow-steps" }));
for (var _q = 0, _r = __VLS_getVForSourceType((__VLS_ctx.workflowSteps)); _q < _r.length; _q++) {
    var _s = _r[_q], step = _s[0], index = _s[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (step.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (step.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "step-code" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (step.code);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "use-cases" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cases-grid" }));
for (var _t = 0, _u = __VLS_getVForSourceType((__VLS_ctx.useCases)); _t < _u.length; _t++) {
    var _v = _u[_t], useCase = _v[0], index = _v[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-icon" }));
    (useCase.icon);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (useCase.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (useCase.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "case-example" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({});
    (useCase.example);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "best-practices" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practices-grid" }));
for (var _w = 0, _x = __VLS_getVForSourceType((__VLS_ctx.bestPractices)); _w < _x.length; _w++) {
    var _y = _x[_w], practice = _y[0], index = _y[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-card" }, { key: (index) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-number" }));
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "practice-content" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (practice.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (practice.description);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "resources" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://www.atlassian.com/git/tutorials/merging-vs-rebasing",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "https://github.com/git/git",
    target: "_blank",
});
/** @type {__VLS_StyleScopedClasses['rebase-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-area']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-visualization']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['master']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['commits']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-node']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-info']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-hash']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-message']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['feature']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['commits']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-node']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-info']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-hash']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-message']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-connection']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-button']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-result']} */ ;
/** @type {__VLS_StyleScopedClasses['result-message']} */ ;
/** @type {__VLS_StyleScopedClasses['post-rebase-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['branch']} */ ;
/** @type {__VLS_StyleScopedClasses['master']} */ ;
/** @type {__VLS_StyleScopedClasses['branch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['commits']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-node']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-info']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-hash']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-message']} */ ;
/** @type {__VLS_StyleScopedClasses['commit']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-node']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-node']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-info']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-hash']} */ ;
/** @type {__VLS_StyleScopedClasses['commit-message']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-section']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-card']} */ ;
/** @type {__VLS_StyleScopedClasses['rebase-flow']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['flow-step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['col-type']} */ ;
/** @type {__VLS_StyleScopedClasses['col-type']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-criteria']} */ ;
/** @type {__VLS_StyleScopedClasses['col-type']} */ ;
/** @type {__VLS_StyleScopedClasses['col-type']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['workflow-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step-number']} */ ;
/** @type {__VLS_StyleScopedClasses['step-content']} */ ;
/** @type {__VLS_StyleScopedClasses['step-code']} */ ;
/** @type {__VLS_StyleScopedClasses['use-cases']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cases-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['case-card']} */ ;
/** @type {__VLS_StyleScopedClasses['case-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['case-content']} */ ;
/** @type {__VLS_StyleScopedClasses['case-example']} */ ;
/** @type {__VLS_StyleScopedClasses['best-practices']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['practices-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-card']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-number']} */ ;
/** @type {__VLS_StyleScopedClasses['practice-content']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['resources']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            showRebase: showRebase,
            masterCommits: masterCommits,
            featureCommits: featureCommits,
            comparisonData: comparisonData,
            workflowSteps: workflowSteps,
            useCases: useCases,
            bestPractices: bestPractices,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
