<template>
  <div class="git-docs">
    <header>
      <h1>📚 Git 命令大全</h1>
      <p class="subtitle">工作区 · 暂存区 · 本地仓库 · 远程仓库 —— 完整命令参考</p>
    </header>

    <!-- 概念区域 -->
    <section class="concepts">
      <h2>🗂️ 核心概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <h3>工作区 (Working Directory)</h3>
          <p>你电脑文件系统中可见、可编辑的目录。所有代码修改最先发生在这里。</p>
        </div>
        <div class="concept-card">
          <h3>暂存区 (Staging Area / Index)</h3>
          <p>一个临时区域，用于保存即将提交的文件快照。通过 <code>git add</code> 将工作区的改动加入暂存区。</p>
        </div>
        <div class="concept-card">
          <h3>本地仓库 (Local Repository)</h3>
          <p>位于本地 <code>.git</code> 目录中，保存了所有提交的历史记录。通过 <code>git commit</code> 将暂存区内容永久保存到本地仓库。</p>
        </div>
        <div class="concept-card">
          <h3>远程仓库 (Remote Repository)</h3>
          <p>托管在服务器（如 GitHub、GitLab）上的共享仓库。通过 <code>git push/pull</code> 同步本地与远程的提交。</p>
        </div>
      </div>
    </section>

    <!-- 命令列表区域 -->
    <section class="commands">
      <h2>⚙️ Git 命令分类详解</h2>

      <div v-for="category in categories" :key="category.name" class="command-category">
        <h3>{{ category.name }}</h3>
        <div class="command-table">
          <div class="table-header">
            <span class="cmd">命令</span>
            <span class="desc">作用</span>
            <span class="params">主要参数</span>
          </div>
          <div v-for="cmd in category.commands" :key="cmd.name" class="table-row">
            <span class="cmd"><code>{{ cmd.name }}</code></span>
            <span class="desc">{{ cmd.description }}</span>
            <span class="params">
              <code v-for="(param, idx) in cmd.params" :key="idx">{{ param }}</code>
            </span>
          </div>
        </div>
      </div>

      <!-- 高级命令特别说明 -->
      <div class="special-notes">
        <h3>🔧 高级命令深度说明</h3>
        <div class="note-item">
          <strong><code>git rebase</code></strong>
          <p>
            将当前分支的提交“变基”到另一个分支的顶端，形成线性历史。常用参数：<code>--interactive/-i</code>（交互式编辑提交）、<code>--onto</code>（指定新基底）、<code>--continue</code>/<code>--abort</code>。⚠️
            不要对已推送的公共分支执行 rebase。</p>
        </div>
        <div class="note-item">
          <strong><code>git cherry-pick</code></strong>
          <p>将一个或多个已存在的提交复制到当前分支。常用参数：<code>-n/--no-commit</code>（只更新工作区和暂存区，不自动生成提交）、<code>-x</code>（在提交信息中记录来源）。</p>
        </div>
        <div class="note-item">
          <strong><code>git reflog</code></strong>
          <p>记录所有分支、HEAD 的移动历史。用于恢复误删的提交或回滚错误操作。常配合 <code>git reset --hard</code> 使用。</p>
        </div>
        <div class="note-item">
          <strong><code>git bisect</code></strong>
          <p>二分查找引入 bug 的提交。通过 <code>git bisect start</code>、<code>git bisect bad/good</code> 标记，快速定位问题。</p>
        </div>
      </div>
    </section>

    <footer>
      <p>💡 提示：命令参数众多，表格仅列出最常用部分。更多细节请使用 <code>git &lt;command&gt; --help</code> 查阅。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface GitCommand {
  name: string
  description: string
  params: string[]
}

interface Category {
  name: string
  commands: GitCommand[]
}

const categories: Category[] = [
  {
    name: '📁 基础配置与初始化',
    commands: [
      { name: 'git init', description: '在当前目录初始化一个新的 Git 仓库', params: ['--bare', '--template'] },
      { name: 'git clone', description: '克隆远程仓库到本地', params: ['<url>', '<directory>', '--depth', '--branch'] },
      { name: 'git config', description: '配置 Git 参数（用户信息、别名等）', params: ['--global', '--local', '--list', 'user.name', 'user.email'] }
    ]
  },
  {
    name: '📝 基本快照操作',
    commands: [
      { name: 'git add', description: '将工作区的改动添加到暂存区', params: ['.', '<file>', '-A', '--patch', '-u'] },
      { name: 'git commit', description: '将暂存区内容提交到本地仓库', params: ['-m', '-a', '--amend', '--no-edit'] },
      { name: 'git status', description: '查看工作区和暂存区的状态', params: ['-s', '--short', '--ignored'] },
      { name: 'git rm', description: '删除工作区文件并移除出暂存区', params: ['--cached', '-r', '-f'] },
      { name: 'git mv', description: '移动或重命名文件', params: ['<source>', '<target>'] }
    ]
  },
  {
    name: '🌿 分支与合并',
    commands: [
      { name: 'git branch', description: '列出、创建或删除分支', params: ['-a', '-d', '-D', '-m', '-vv'] },
      { name: 'git checkout', description: '切换分支或恢复工作区文件', params: ['-b', '<branch>', '--', '<file>'] },
      { name: 'git switch', description: '切换分支（新版命令）', params: ['-c', '<branch>'] },
      { name: 'git merge', description: '将其他分支合并到当前分支', params: ['--no-ff', '--squash', '--abort'] },
      { name: 'git merge --abort', description: '取消合并并恢复到合并前状态', params: [] },
      { name: 'git log', description: '查看提交历史', params: ['--oneline', '--graph', '--all', '--author', '--since'] }
    ]
  },
  {
    name: '🔄 远程协作',
    commands: [
      { name: 'git remote', description: '管理远程仓库', params: ['-v', 'add', 'remove', 'rename'] },
      { name: 'git fetch', description: '从远程仓库下载最新提交（不合并）', params: ['--all', '--prune', '<remote>'] },
      { name: 'git pull', description: '拉取远程提交并合并到当前分支', params: ['--rebase', '--ff-only', '<remote> <branch>'] },
      { name: 'git push', description: '将本地提交推送到远程仓库', params: ['--force', '--force-with-lease', '--tags', '-u', '<remote> <branch>'] }
    ]
  },
  {
    name: '⏪ 撤销与恢复',
    commands: [
      { name: 'git reset', description: '重置 HEAD 到指定提交，可选影响暂存区/工作区', params: ['--soft', '--mixed', '--hard', 'HEAD~n'] },
      { name: 'git restore', description: '恢复工作区或暂存区文件', params: ['--staged', '--source', '<file>'] },
      { name: 'git revert', description: '创建一个新提交来撤销某次历史提交', params: ['-n', '--no-commit', '<commit>...'] },
      { name: 'git clean', description: '删除未跟踪的文件', params: ['-n', '-f', '-d', '-x'] }
    ]
  },
  {
    name: '🔍 历史与差异',
    commands: [
      { name: 'git diff', description: '显示工作区、暂存区或提交之间的差异', params: ['--staged', '--cached', '<commit1>..<commit2>'] },
      { name: 'git show', description: '显示某个提交的详细信息', params: ['<commit>', '--stat', '--name-only'] },
      { name: 'git blame', description: '查看文件每一行的最后修改者', params: ['-L', '<start>,<end>', '<file>'] },
      { name: 'git reflog', description: '显示所有分支引用的操作日志', params: ['--all', '--relative-date'] }
    ]
  },
  {
    name: '📦 暂存与标签',
    commands: [
      { name: 'git stash', description: '临时保存工作区和暂存区的修改', params: ['push', 'pop', 'apply', 'list', 'drop', 'clear'] },
      { name: 'git tag', description: '创建、列出或删除标签（版本标记）', params: ['-a', '-m', '-d', '-l'] }
    ]
  },
  {
    name: '✨ 高级操作',
    commands: [
      { name: 'git rebase', description: '变基操作，使提交历史更线性', params: ['-i', '--onto', '--continue', '--abort', '--skip'] },
      { name: 'git cherry-pick', description: '将其他分支的特定提交应用到当前分支', params: ['-n', '-x', '<commit>...'] },
      { name: 'git bisect', description: '二分查找定位引入 bug 的提交', params: ['start', 'bad', 'good', 'reset'] },
      { name: 'git submodule', description: '管理仓库中的子模块', params: ['add', 'update', 'init', 'foreach'] },
      { name: 'git archive', description: '将仓库打包成归档文件', params: ['--format=zip', '--output', 'HEAD'] }
    ]
  }
]
</script>

<style lang="less" scoped>
.git-docs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background: #f8fafc;
  color: #0f172a;

  header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1e293b, #3b82f6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #475569;
      font-size: 1.1rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    border-left: 5px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0 1rem;
  }

  h3 {
    font-weight: 600;
    font-size: 1.3rem;
    margin: 1rem 0 0.8rem;
    color: #1e293b;
  }

  // 概念卡片
  .concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2rem;

    .concept-card {
      background: white;
      border-radius: 1rem;
      padding: 1.2rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      transition: 0.2s;
      border: 1px solid #e2e8f0;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      }

      h3 {
        margin-top: 0;
        color: #0f172a;
        font-size: 1.2rem;
      }

      p {
        margin: 0.5rem 0 0;
        line-height: 1.4;
        color: #334155;
      }

      code {
        background: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        font-size: 0.85rem;
      }
    }
  }

  // 命令表格样式
  .command-category {
    margin-bottom: 2rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    h3 {
      background: #f1f5f9;
      margin: 0;
      padding: 0.8rem 1.2rem;
      font-size: 1.25rem;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .command-table {
    display: flex;
    flex-direction: column;

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 180px 1fr 280px;
      gap: 1rem;
      padding: 0.75rem 1.2rem;
      align-items: start;
      border-bottom: 1px solid #f0f2f5;
    }

    .table-header {
      background: #f8fafc;
      font-weight: 600;
      color: #334155;
      border-bottom: 2px solid #e2e8f0;
      font-size: 0.9rem;
    }

    .table-row {
      transition: background 0.1s;

      &:hover {
        background: #fefce8;
      }

      .cmd code {
        background: #eef2ff;
        padding: 0.2rem 0.5rem;
        border-radius: 8px;
        font-weight: 500;
        font-size: 0.85rem;
        white-space: nowrap;
      }

      .desc {
        font-size: 0.9rem;
        color: #1e293b;
        line-height: 1.4;
      }

      .params {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;

        code {
          background: #f1f5f9;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #0c4a6e;
          white-space: nowrap;
        }
      }
    }
  }

  // 特殊说明区块
  .special-notes {
    background: #eef2ff;
    border-radius: 1rem;
    padding: 1.2rem 1.5rem;
    margin: 2rem 0 1rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .note-item {
      margin-bottom: 1rem;

      strong {
        font-family: monospace;
        background: #d9e6f7;
        padding: 0.2rem 0.5rem;
        border-radius: 8px;
        font-size: 0.9rem;
      }

      p {
        margin: 0.3rem 0 0 1rem;
        color: #1e293b;
        line-height: 1.4;
      }
    }
  }

  footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;

    code {
      background: #e2e8f0;
      padding: 0.2rem 0.3rem;
      border-radius: 6px;
    }
  }

  @media (max-width: 780px) {
    padding: 1rem;

    .command-table .table-header,
    .command-table .table-row {
      grid-template-columns: 1fr;
      gap: 0.4rem;
    }

    .table-header {
      display: none !important;
    }

    .table-row {
      border-bottom: 1px solid #e2e8f0;
      padding: 0.8rem;

      .cmd,
      .desc,
      .params {
        padding-left: 0.5rem;
      }

      .cmd code {
        font-size: 1rem;
      }

      .params {
        justify-content: flex-start;
      }
    }
  }
}
</style>
