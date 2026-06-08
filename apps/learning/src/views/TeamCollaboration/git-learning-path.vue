<template>
  <LearningPath
    title="团队协作 GIT 学习路线图"
    description="从本地提交到团队协作 · 版本控制的艺术"
    :tags="[{ label: '📦 基础', color: 'blue' },{ label: '🌿 分支', color: 'green' },{ label: '🕰️ 历史', color: 'amber' },{ label: '🤝 协作', color: 'purple' },{ label: '🛠️ 工具', color: 'orange' }]"
    :phases="phases"
    footerText="预计全部完成需 4-6 个月 · 边学边用 · 工作中的必备技能"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '📦', title: 'Git 基础入门', period: '2-3 周',
    desc: '理解版本控制的核心概念，掌握 Git 最基本的日常操作。这是所有协作的基石。',
    color: 'bg-blue-500',
    practice: '📌 实战：创建一个 Git 仓库，完成 init → add → commit → log 完整流程 10 次以上',
    modules: [
      { name: 'git-1-a', label: '安装与配置', topics: [
        { name: 'git-1-a-1-install', label: 'Git 安装与版本选择' },
        { name: 'git-1-a-2-config', label: 'git config 全局配置' },
        { name: 'git-1-a-3-alias', label: 'Git Alias 别名设置' },
      ]},
      { name: 'git-1-b', label: '核心概念', topics: [
        { name: 'git-1-b-1-three-areas', label: '工作区/暂存区/版本库' },
        { name: 'git-1-b-2-snapshots', label: '快照而非差异' },
        { name: 'git-1-b-3-hash', label: 'SHA-1 哈希与完整性' },
      ]},
      { name: 'git-1-c', label: '基本操作', topics: [
        { name: 'git-1-c-1-init-clone', label: 'init/clone 创建仓库' },
        { name: 'git-1-c-2-add-commit', label: 'add/commit 提交变更' },
        { name: 'git-1-c-3-status-diff', label: 'status/diff 查看差异' },
        { name: 'git-1-c-4-log', label: 'log 查看提交历史' },
      ]},
    ]
  },
  {
    id: 2, icon: '🌿', title: '分支操作', period: '3-4 周',
    desc: 'Git 的灵魂——分支。理解分支本质（只是一个指针），掌握创建、切换、合并和解决冲突。',
    color: 'bg-green-500',
    practice: '📌 实战：模拟 3 人协作场景，创建 feature/bugfix/hotfix 分支，完成合并与冲突解决',
    modules: [
      { name: 'git-2-a', label: '分支基础', topics: [
        { name: 'git-2-a-1-branch', label: 'branch：创建与删除分支' },
        { name: 'git-2-a-2-checkout', label: 'checkout/switch 切换分支' },
        { name: 'git-2-a-3-merge', label: 'merge：快进与三方合并' },
      ]},
      { name: 'git-2-b', label: '冲突解决', topics: [
        { name: 'git-2-b-1-conflict', label: '冲突原因与识别' },
        { name: 'git-2-b-2-resolve', label: '手动解决冲突策略' },
        { name: 'git-2-b-3-tools', label: '冲突解决工具（VS Code/Mergetool）' },
      ]},
      { name: 'git-2-c', label: '分支策略', topics: [
        { name: 'git-2-c-1-git-flow', label: 'Git Flow 经典模型' },
        { name: 'git-2-c-2-github-flow', label: 'GitHub Flow 简化模型' },
        { name: 'git-2-c-3-trunk-based', label: 'Trunk-Based 主干开发' },
      ]},
    ]
  },
  {
    id: 3, icon: '🕰️', title: '历史管理', period: '3-4 周',
    desc: '掌控提交历史。学会改写、整理和追溯代码演变——让 Git 历史成为可读的文档。',
    color: 'bg-amber-500',
    practice: '📌 实战：用 rebase -i 整理一个混乱的提交历史，用 bisect 定位一个引入的 bug',
    modules: [
      { name: 'git-3-a', label: '历史改写', topics: [
        { name: 'git-3-a-1-amend', label: 'commit --amend 修正提交' },
        { name: 'git-3-a-2-reset', label: 'reset：soft/mixed/hard' },
        { name: 'git-3-a-3-rebase', label: 'rebase 交互模式(-i)' },
      ]},
      { name: 'git-3-b', label: '追溯与调试', topics: [
        { name: 'git-3-b-1-reflog', label: 'reflog 操作恢复' },
        { name: 'git-3-b-2-bisect', label: 'bisect 二分查找 bug' },
        { name: 'git-3-b-3-blame', label: 'blame 代码溯源' },
      ]},
      { name: 'git-3-c', label: '高级合并', topics: [
        { name: 'git-3-c-1-cherry-pick', label: 'cherry-pick 精选提交' },
        { name: 'git-3-c-2-revert', label: 'revert 撤销提交' },
        { name: 'git-3-c-3-restore', label: 'restore 文件恢复' },
      ]},
    ]
  },
  {
    id: 4, icon: '🤝', title: '协作工作流', period: '3-4 周',
    desc: '多人协作的核心实践。掌握远程仓库操作、Pull Request 流程和 Code Review 规范。',
    color: 'bg-purple-500',
    practice: '📌 实战：在 GitHub 上发起 PR → Code Review → 修改 → Merge，完成完整协作流程',
    modules: [
      { name: 'git-4-a', label: '远程协作', topics: [
        { name: 'git-4-a-1-remote', label: 'remote 远程仓库管理' },
        { name: 'git-4-a-2-fetch-pull', label: 'fetch vs pull 区别' },
        { name: 'git-4-a-3-push', label: 'push 与 force-push 风险' },
      ]},
      { name: 'git-4-b', label: 'PR 流程', topics: [
        { name: 'git-4-b-1-pr', label: 'Pull Request 完整流程' },
        { name: 'git-4-b-2-review', label: 'Code Review 最佳实践' },
        { name: 'git-4-b-3-protected', label: '保护分支与规则设置' },
      ]},
      { name: 'git-4-c', label: '常见场景', topics: [
        { name: 'git-4-c-1-stash', label: 'stash 暂存工作现场' },
        { name: 'git-4-c-2-submodule', label: 'submodule 子模块管理' },
        { name: 'git-4-c-3-tag', label: 'tag 版本标记与发布' },
      ]},
    ]
  },
  {
    id: 5, icon: '🔧', title: '高级操作', period: '4-6 周',
    desc: '应对复杂场景的高级技巧。从大文件管理到 Git 内部原理，成为团队中的 Git 专家。',
    color: 'bg-orange-500',
    practice: '📌 实战：模拟一个复杂的仓库迁移场景（保留历史 + 清理大文件 + 拆分 monorepo）',
    modules: [
      { name: 'git-5-a', label: '大文件与清理', topics: [
        { name: 'git-5-a-1-gitignore', label: '.gitignore 规则深入' },
        { name: 'git-5-a-2-lfs', label: 'Git LFS 大文件管理' },
        { name: 'git-5-a-3-gc', label: 'gc/prune 垃圾回收' },
      ]},
      { name: 'git-5-b', label: '内部原理', topics: [
        { name: 'git-5-b-1-objects', label: 'Git 对象模型（blob/tree/commit）' },
        { name: 'git-5-b-2-refs', label: 'refs 引用与 HEAD' },
        { name: 'git-5-b-3-pack', label: 'Packfile 压缩机制' },
      ]},
      { name: 'git-5-c', label: '仓库管理', topics: [
        { name: 'git-5-c-1-filter-branch', label: 'filter-repo 历史重写' },
        { name: 'git-5-c-2-worktree', label: 'worktree 多工作目录' },
        { name: 'git-5-c-3-hooks', label: 'Git Hooks 自动化' },
      ]},
    ]
  },
  {
    id: 6, icon: '🛠️', title: '工程化集成', period: '3-4 周',
    desc: '将 Git 融入 CI/CD 流水线。掌握 Husky、Commitlint、Semantic Release 等工程化工具。',
    color: 'bg-cyan-500',
    practice: '📌 实战：搭建完整的 Git 工程化链（Husky + Commitlint + Lint-staged + Semantic Release）',
    modules: [
      { name: 'git-6-a', label: '提交规范', topics: [
        { name: 'git-6-a-1-conventional', label: 'Conventional Commits 规范' },
        { name: 'git-6-a-2-commitlint', label: 'Commitlint 校验配置' },
        { name: 'git-6-a-3-cz', label: 'Commitizen 交互式提交' },
      ]},
      { name: 'git-6-b', label: '自动化工具', topics: [
        { name: 'git-6-b-1-husky', label: 'Husky Git Hooks 管理' },
        { name: 'git-6-b-2-lint-staged', label: 'Lint-staged 增量检查' },
        { name: 'git-6-b-3-semantic', label: 'Semantic Release 自动发版' },
      ]},
      { name: 'git-6-c', label: 'CI 集成', topics: [
        { name: 'git-6-c-1-actions', label: 'GitHub Actions 集成' },
        { name: 'git-6-c-2-changelog', label: '自动生成 CHANGELOG' },
      ]},
    ]
  },
  {
    id: 7, icon: '📚', title: 'SVN 与迁移', period: '2-3 周',
    desc: '了解 SVN 基本操作，掌握从 SVN 到 Git 的迁移方案。企业中仍有许多遗留 SVN 仓库。',
    color: 'bg-slate-500',
    practice: '📌 实战：用 git svn 将一个 SVN 仓库迁移到 Git（保留完整历史和分支映射）',
    modules: [
      { name: 'git-7-a', label: 'SVN 基础', topics: [
        { name: 'git-7-a-1-svn-basic', label: 'SVN 基本命令对比 Git' },
        { name: 'git-7-a-2-svn-branch', label: 'SVN 分支与合并' },
      ]},
      { name: 'git-7-b', label: '迁移方案', topics: [
        { name: 'git-7-b-1-git-svn', label: 'git svn 双向同步' },
        { name: 'git-7-b-2-migration', label: 'SVN → Git 迁移步骤' },
        { name: 'git-7-b-3-pitfalls', label: '常见迁移陷阱与解决' },
      ]},
    ]
  },
]
</script>
