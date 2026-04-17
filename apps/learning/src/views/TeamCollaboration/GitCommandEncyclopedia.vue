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
            <span class="params cursor-pointer">
              <code v-for="(param, idx) in cmd.params" :key="idx" :title="param.description">{{ param.name }}</code>
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
            将当前分支的提交"变基"到另一个分支的顶端，形成线性历史。常用参数：<code>--interactive/-i</code>（交互式编辑提交）、<code>--onto &lt;newbase&gt;</code>（指定新的基底分支）、<code>--continue</code>（继续变基过程）、<code>--abort</code>（取消变基，恢复原状态）、<code>--skip</code>（跳过当前冲突的提交）。⚠️
            <strong>警告：</strong>不要对已推送的公共分支执行 rebase，这会破坏他人的提交历史。
          </p>
        </div>
        <div class="note-item">
          <strong><code>git cherry-pick</code></strong>
          <p>将一个或多个已存在的提交复制到当前分支。常用参数：<code>-n/--no-commit</code>（只更新工作区和暂存区，不自动生成提交）、<code>-x</code>（在提交信息末尾添加原始提交的
            SHA-1 哈希）、<code>-m &lt;parent-number&gt;</code>（对于合并提交，选择保留哪一侧的更改）。常用于从其他分支"摘取"特定修复。</p>
        </div>
        <div class="note-item">
          <strong><code>git reflog</code></strong>
          <p>记录所有分支、HEAD 的移动历史。默认保留约 90 天内的操作记录。用于恢复误删的提交、回滚错误操作、或找回丢失的分支。常配合 <code>git reset --hard</code>
            使用来安全地恢复状态。<code>git reflog show &lt;branch&gt;</code> 可以查看特定分支的引用日志。</p>
        </div>
        <div class="note-item">
          <strong><code>git bisect</code></strong>
          <p>二分查找定位引入 bug 的提交。通过
            <code>git bisect start</code>、<code>git bisect bad</code>（标记当前版本）、<code>git bisect good &lt;commit&gt;</code>（标记最后一个正常版本），Git
            会自动跳转中间版本供测试。找到后用 <code>git bisect reset</code> 退出。可以用 <code>git bisect run &lt;script&gt;</code> 自动运行测试脚本。
          </p>
        </div>
        <div class="note-item">
          <strong><code>git stash</code></strong>
          <p>
            临时保存工作目录和暂存区的未提交更改。常用子命令：<code>push -m "message"</code>（保存并添加说明）、<code>pop</code>（恢复最近一次并删除）、<code>apply &lt;stash&gt;</code>（恢复但不删除）、<code>list</code>（查看所有暂存）、<code>drop &lt;stash&gt;</code>（删除某条）、<code>branch &lt;name&gt;</code>（从
            stash 创建新分支）。<code>-u</code> 包含未跟踪文件，<code>-a</code> 包含忽略的文件。</p>
        </div>
        <div class="note-item">
          <strong><code>git submodule</code></strong>
          <p>管理仓库中的子模块。子模块是指将另一个 Git 仓库作为子目录嵌入主仓库。<code>add &lt;url&gt; &lt;path&gt;</code>
            添加子模块、<code>update --init</code> 初始化并更新子模块、<code>sync</code> 同步子模块 URL 变更、<code>foreach &lt;cmd&gt;</code>
            对所有子模块执行命令。克隆带子模块的仓库需要 <code>git clone --recurse-submodules</code>。</p>
        </div>
        <div class="note-item">
          <strong><code>git worktree</code></strong>
          <p>允许在同一仓库中同时检出多个分支。每个 worktree 都有独立的工作目录和暂存区，但共享同一个对象数据库。<code>add &lt;path&gt; &lt;branch&gt;</code> 创建新的
            worktree、<code>list</code> 列出所有 worktree、<code>remove &lt;path&gt;</code> 删除 worktree。注意：一个分支只能被一个 worktree
            检出。</p>
        </div>
        <div class="note-item">
          <strong><code>git bundle</code></strong>
          <p>将整个仓库或特定分支打包成单个二进制文件，便于通过 U 盘、邮件或其他方式共享。<code>create &lt;file&gt; &lt;repo&gt;</code>
            创建打包文件、<code>verify &lt;file&gt;</code> 验证完整性、<code>list-heads &lt;file&gt;</code>
            查看包含的分支、<code>pull &lt;file&gt; &lt;branch&gt;</code> 从包中拉取内容。</p>
        </div>
        <div class="note-item">
          <strong><code>git format-patch &amp; send-email</code></strong>
          <p>这两个命令配合使用可以提交补丁到邮件列表。<code>format-patch</code> 将提交转换为 mbox 格式的补丁文件（<code>-n</code>
            编号命名、<code>-o &lt;dir&gt;</code> 指定输出目录），<code>send-email</code> 发送这些补丁（<code>--to=&lt;addr&gt;</code>
            指定收件人、<code>--smtp-server</code> 配置 SMTP 服务器）。这是开源项目常用的协作方式。</p>
        </div>
        <div class="note-item">
          <strong><code>git gc &amp; git prune</code></strong>
          <p>垃圾回收命令。<code>git gc</code> 清理不再需要的松散对象并将引用打包成 pack 文件，大幅减少仓库体积。<code>git prune</code>
            删除无法访问的悬空对象。<code>--aggressive</code> 强制进行更彻底但更慢的优化。<code>--prune=&lt;date&gt;</code> 指定清理日期。Git
            会自动定期执行这些操作。</p>
        </div>
      </div>
    </section>

    <footer>
      <p>💡 提示：命令参数众多，表格仅列出最常用部分。更多细节请使用 <code>git &lt;command&gt; --help</code> 查阅。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface GitParam {
  name: string
  description: string
}

interface GitCommand {
  name: string
  description: string
  params: GitParam[]
}

interface Category {
  name: string
  commands: GitCommand[]
}

const categories: Category[] = [
  {
    name: '📁 基础配置与初始化',
    commands: [
      {
        name: 'git init', description: '在当前目录初始化一个新的 Git 仓库。执行后会创建一个 .git 子目录，包含所有仓库需要的文件。', params: [
          { name: '--bare', description: '创建裸仓库（无工作目录）' },
          { name: '--template=<dir>', description: '指定模板目录' },
          { name: '-b <name>', description: '初始分支名称' },
          { name: '--initial-branch=<branch>', description: '同 -b' }
        ]
      },
      {
        name: 'git clone', description: '克隆远程仓库到本地。默认会在当前目录创建一个与远程同名的文件夹。', params: [
          { name: '<url>', description: '远程仓库地址' },
          { name: '<directory>', description: '本地目录名' },
          { name: '--depth <n>', description: '浅克隆，限制历史深度' },
          { name: '--branch <branch>', description: '克隆指定分支' },
          { name: '--single-branch', description: '只克隆单个分支' },
          { name: '--recurse-submodules', description: '递归克隆子模块' },
          { name: '-o <name>', description: '远程名称（默认 origin）' }
        ]
      },
      {
        name: 'git config', description: '配置 Git 参数。配置级别：--local（默认，当前仓库）、--global（当前用户）、--system（系统所有用户）。', params: [
          { name: '--local', description: '仓库级配置' },
          { name: '--global', description: '用户级配置' },
          { name: '--system', description: '系统级配置' },
          { name: '--list', description: '列出所有配置' },
          { name: '--get <key>', description: '获取单个配置值' },
          { name: 'user.name', description: '用户名' },
          { name: 'user.email', description: '用户邮箱' },
          { name: 'alias.<name>', description: '定义命令别名' }
        ]
      },
      {
        name: 'git help', description: '显示 Git 帮助信息。可以查看特定命令的详细文档。', params: [
          { name: '<command>', description: '查看命令帮助' },
          { name: '--all', description: '列出所有命令' },
          { name: '-g', description: '显示概念指南' }
        ]
      }
    ]
  },
  {
    name: '📝 基本快照操作',
    commands: [
      {
        name: 'git add', description: '将工作区的改动添加到暂存区。是开始跟踪新文件或暂存已修改文件的标准操作。', params: [
          { name: '.', description: '添加所有变化' },
          { name: '<file>', description: '添加指定文件' },
          { name: '-A', description: '添加所有变化（含删除）' },
          { name: '--patch', description: '交互式选择块' },
          { name: '-u', description: '只添加已跟踪文件' }
        ]
      },
      {
        name: 'git commit', description: '将暂存区内容提交到本地仓库。每次提交都会生成一个唯一的 SHA-1 哈希值作为提交对象的标识。', params: [
          { name: '-m <msg>', description: '提交信息' },
          { name: '-a', description: '自动暂存已跟踪文件' },
          { name: '--amend', description: '修改最后一次提交' },
          { name: '--no-edit', description: '不改提交信息' },
          { name: '-c <commit>', description: '复用指定提交信息' }
        ]
      },
      {
        name: 'git status', description: '查看工作区和暂存区的状态。显示哪些文件被修改、暂存或未跟踪。', params: [
          { name: '-s', description: '简洁输出' },
          { name: '--short', description: '同 -s' },
          { name: '--ignored', description: '显示忽略文件' },
          { name: '-b', description: '显示分支信息' }
        ]
      },
      {
        name: 'git rm', description: '删除工作区文件并将该删除操作记录到暂存区。与直接在文件系统中删除不同，git rm 会记录删除操作。', params: [
          { name: '--cached', description: '只从暂存区删除' },
          { name: '-r', description: '递归删除目录' },
          { name: '-f', description: '强制删除' },
          { name: '<file>', description: '要删除的文件' }
        ]
      },
      {
        name: 'git mv', description: '移动或重命名文件。Git 会自动追踪这个操作，等同于 mv + git add + git rm。', params: [
          { name: '<source>', description: '源文件/目录' },
          { name: '<target>', description: '目标文件/目录' },
          { name: '-f', description: '强制覆盖' }
        ]
      },
      {
        name: 'git restore', description: '恢复工作区或暂存区文件（Git 2.23+ 引入）。是 checkout 的更安全的替代品。', params: [
          { name: '--staged', description: '恢复暂存区' },
          { name: '--source=<tree>', description: '指定来源树' },
          { name: '<file>', description: '要恢复的文件' }
        ]
      }
    ]
  },
  {
    name: '🌿 分支与合并',
    commands: [
      {
        name: 'git branch', description: '列出、创建、重命名或删除分支。不会自动切换到新分支。', params: [
          { name: '-a', description: '列出所有分支' },
          { name: '-d <branch>', description: '安全删除分支' },
          { name: '-D <branch>', description: '强制删除分支' },
          { name: '-m <old> <new>', description: '重命名分支' },
          { name: '-vv', description: '详细输出' },
          { name: '-c <old> <new>', description: '复制分支' }
        ]
      },
      {
        name: 'git checkout', description: '切换分支或恢复工作区文件。注意：在 Git 2.23+ 中建议使用 git switch 和 git restore。', params: [
          { name: '-b <branch>', description: '创建并切换' },
          { name: '-B <branch>', description: '强制创建并切换' },
          { name: '<branch>', description: '切换到分支' },
          { name: '--', description: '分隔符' }
        ]
      },
      {
        name: 'git switch', description: '切换分支（Git 2.23+ 引入的新命令）。比 checkout 更直观、安全。', params: [
          { name: '-c <branch>', description: '创建并切换' },
          { name: '-C <branch>', description: '强制创建并切换' },
          { name: '--detach', description: '分离 HEAD' },
          { name: '<branch>', description: '目标分支' }
        ]
      },
      {
        name: 'git merge', description: '将其他分支合并到当前分支。Git 会自动选择最合适的合并策略。', params: [
          { name: '--no-ff', description: '禁用快进合并' },
          { name: '--ff-only', description: '只允许快进合并' },
          { name: '--squash', description: '压缩提交' },
          { name: '--abort', description: '取消合并' },
          { name: '-m <msg>', description: '合并提交信息' },
          { name: '<branch>', description: '源分支' }
        ]
      },
      { name: 'git merge --abort', description: '取消当前正在进行的合并操作，将仓库状态恢复到合并之前。', params: [] },
      {
        name: 'git log', description: '查看提交历史。默认显示从最新提交到最早提交的记录。', params: [
          { name: '--oneline', description: '单行格式' },
          { name: '--graph', description: '显示图形' },
          { name: '--all', description: '显示所有分支' },
          { name: '-n <num>', description: '限制数量' },
          { name: '--author=<pattern>', description: '按作者筛选' },
          { name: '--since=<time>', description: '时间筛选' }
        ]
      },
      {
        name: 'git stash', description: '临时保存工作区和暂存区的修改，以便切换分支或进行其他操作。', params: [
          { name: 'push', description: '保存修改' },
          { name: 'pop', description: '恢复并删除' },
          { name: 'apply', description: '恢复不删除' },
          { name: 'list', description: '列出暂存' },
          { name: 'drop', description: '删除暂存' },
          { name: '-m <msg>', description: '添加说明' }
        ]
      },
      {
        name: 'git worktree', description: '管理工作树，允许在同一个仓库中同时检出多个分支。', params: [
          { name: 'add', description: '创建工作树' },
          { name: 'list', description: '列出工作树' },
          { name: 'remove', description: '删除工作树' },
          { name: 'prune', description: '清理工作树' }
        ]
      }
    ]
  },
  {
    name: '🔄 远程协作',
    commands: [
      {
        name: 'git remote', description: '管理远程仓库连接。查看、添加、重命名或删除远程仓库别名。', params: [
          { name: '-v', description: '显示详细信息' },
          { name: 'add <name> <url>', description: '添加远程' },
          { name: 'remove <name>', description: '删除远程' },
          { name: 'rename <old> <new>', description: '重命名远程' },
          { name: 'show <name>', description: '查看远程信息' }
        ]
      },
      {
        name: 'git fetch', description: '从远程仓库下载最新提交和分支信息，但不自动合并或修改工作区。', params: [
          { name: '--all', description: '获取所有远程' },
          { name: '--prune', description: '清理已删除的远程分支' },
          { name: '<remote>', description: '指定远程' },
          { name: '--tags', description: '获取标签' },
          { name: '--depth <n>', description: '浅克隆' }
        ]
      },
      {
        name: 'git pull', description: '拉取远程提交并自动合并到当前分支。相当于 fetch + merge 的组合操作。', params: [
          { name: '--rebase', description: '变基而非合并' },
          { name: '--ff-only', description: '只允许快进' },
          { name: '--no-ff', description: '禁用快进' },
          { name: '<remote> <branch>', description: '远程和分支' }
        ]
      },
      {
        name: 'git push', description: '将本地提交推送到远程仓库。必须拥有远程仓库的写权限。', params: [
          { name: '--force', description: '强制推送' },
          { name: '--force-with-lease', description: '安全的强制推送' },
          { name: '--tags', description: '推送标签' },
          { name: '-u', description: '设置上游分支' },
          { name: '--delete', description: '删除远程分支' }
        ]
      },
      {
        name: 'git ls-remote', description: '显示远程仓库的引用（分支和标签）。用于查看远程仓库的最新状态。', params: [
          { name: '--heads', description: '只显示分支' },
          { name: '--tags', description: '只显示标签' },
          { name: '<remote>', description: '远程仓库' }
        ]
      }
    ]
  },
  {
    name: '⏪ 撤销与恢复',
    commands: [
      {
        name: 'git reset', description: '重置 HEAD 到指定提交。可选择性地修改暂存区和工作区。是撤销提交的常用方式。', params: [
          { name: '--soft <commit>', description: '只移动 HEAD' },
          { name: '--mixed <commit>', description: '重置暂存区（默认）' },
          { name: '--hard <commit>', description: '重置工作区' },
          { name: 'HEAD~n', description: '回退 n 个提交' },
          { name: '--merge', description: '重置合并状态' }
        ]
      },
      {
        name: 'git restore', description: '恢复工作区或暂存区文件到某个状态。是 git checkout 的现代替代品。', params: [
          { name: '--staged', description: '恢复暂存区' },
          { name: '--source=<tree>', description: '指定来源' },
          { name: '<file>', description: '文件路径' }
        ]
      },
      {
        name: 'git revert', description: '创建一个新的提交来撤销指定提交的所有更改。不会修改历史记录，是安全的撤销方式。', params: [
          { name: '-n', description: '不自动提交' },
          { name: '-m <n>', description: '选择父提交' },
          { name: '<commit>', description: '要撤销的提交' }
        ]
      },
      {
        name: 'git clean', description: '删除未跟踪的文件和目录。注意：此操作不可逆，删除的文件不会进入回收站。', params: [
          { name: '-n', description: '预览模式' },
          { name: '-f', description: '强制删除' },
          { name: '-d', description: '包含目录' },
          { name: '-x', description: '包含忽略文件' },
          { name: '<path>', description: '指定路径' }
        ]
      }
    ]
  },
  {
    name: '🔍 历史与差异',
    commands: [
      {
        name: 'git diff', description: '显示工作区、暂存区或提交之间的差异。可以比较任意两个树之间的变化。', params: [
          { name: '--staged', description: '暂存区 vs HEAD' },
          { name: '<commit1> <commit2>', description: '两提交对比' },
          { name: '--stat', description: '显示统计' },
          { name: '--name-only', description: '只显示文件名' },
          { name: '-w', description: '忽略空白' },
          { name: '<path>', description: '指定文件' }
        ]
      },
      {
        name: 'git show', description: '显示某个提交、标签或 tree 对象的详细信息。默认显示提交的内容。', params: [
          { name: '<commit>', description: '提交对象' },
          { name: '--stat', description: '显示统计' },
          { name: '--name-only', description: '只显示文件名' },
          { name: '--format', description: '格式化输出' }
        ]
      },
      {
        name: 'git blame', description: '逐行显示文件内容，每行标注最后修改的提交和作者。用于追踪代码变更历史。', params: [
          { name: '-L <start>,<end>', description: '指定行范围' },
          { name: '-e', description: '显示邮箱' },
          { name: '-w', description: '忽略空白' },
          { name: '<file>', description: '文件路径' }
        ]
      },
      {
        name: 'git reflog', description: '显示所有分支和 HEAD 的操作日志。记录了本地仓库的每一次 HEAD 移动。', params: [
          { name: '--all', description: '显示所有引用' },
          { name: '--relative-date', description: '相对时间' },
          { name: '<ref>', description: '指定引用' }
        ]
      },
      {
        name: 'git shortlog', description: '汇总提交信息，按作者分组显示。常用作发布说明或贡献统计。', params: [
          { name: '-n', description: '按提交数排序' },
          { name: '-s', description: '只显示统计' },
          { name: '-e', description: '显示邮箱' },
          { name: '--all', description: '所有分支' }
        ]
      }
    ]
  },
  {
    name: '📦 暂存与标签',
    commands: [
      {
        name: 'git stash', description: '临时保存工作目录和暂存区的未提交更改，以便稍后恢复继续工作。', params: [
          { name: 'push', description: '保存修改' },
          { name: 'pop', description: '恢复并删除' },
          { name: 'apply', description: '恢复不删除' },
          { name: 'list', description: '列出暂存' },
          { name: 'show', description: '查看暂存内容' },
          { name: '-u', description: '包含未跟踪文件' },
          { name: '-m <msg>', description: '添加说明' }
        ]
      },
      {
        name: 'git tag', description: '创建、列出、删除或验证标签。标签通常用于标记发布版本（v1.0.0 等）。', params: [
          { name: '-a <tag>', description: '创建附注标签' },
          { name: '-m <msg>', description: '标签信息' },
          { name: '-d <tag>', description: '删除标签' },
          { name: '-l <pattern>', description: '列出标签' },
          { name: '-v <tag>', description: '验证标签' }
        ]
      },
      {
        name: 'git describe', description: '基于最新标签生成一个人类可读的描述。常用作版本号。', params: [
          { name: '--always', description: '无标签时显示 commit' },
          { name: '--tags', description: '使用标签' },
          { name: '--abbrev=<n>', description: 'commit 缩写长度' },
          { name: '--dirty', description: '有修改时标记' }
        ]
      }
    ]
  },
  {
    name: '✨ 高级操作',
    commands: [
      {
        name: 'git rebase', description: '将当前分支的提交"变基"到另一个分支的顶端，形成线性历史。注意：不要对已推送的公共分支执行 rebase。', params: [
          { name: '-i', description: '交互式变基' },
          { name: '--onto <newbase>', description: '指定新基底' },
          { name: '--continue', description: '继续变基' },
          { name: '--abort', description: '取消变基' },
          { name: '--skip', description: '跳过冲突提交' },
          { name: '<upstream>', description: '目标分支' }
        ]
      },
      {
        name: 'git cherry-pick', description: '选择一个或多个提交，将其应用到当前分支。会产生新的提交哈希。', params: [
          { name: '-n', description: '不自动提交' },
          { name: '-x', description: '记录来源 commit' },
          { name: '-m <n>', description: '选择父提交' },
          { name: '<commit>', description: '源提交' }
        ]
      },
      {
        name: 'git bisect', description: '二分查找定位引入 bug 的提交。通过标记好的和坏的提交，Git 自动缩小范围。', params: [
          { name: 'start', description: '开始二分查找' },
          { name: 'bad', description: '标记当前版本' },
          { name: 'good <commit>', description: '标记正常版本' },
          { name: 'reset', description: '结束查找' },
          { name: 'run <script>', description: '自动查找' }
        ]
      },
      {
        name: 'git submodule', description: '管理仓库中的子模块。子模块是指将另一个仓库作为子目录加入主仓库。', params: [
          { name: 'add <url> <path>', description: '添加子模块' },
          { name: 'update', description: '更新子模块' },
          { name: 'init', description: '初始化子模块' },
          { name: 'sync', description: '同步 URL' },
          { name: 'foreach <cmd>', description: '执行命令' }
        ]
      },
      {
        name: 'git archive', description: '将仓库打包成归档文件（zip、tar 等格式）。可以指定特定目录或版本。', params: [
          { name: '--format=<fmt>', description: '指定格式' },
          { name: '--output=<file>', description: '输出文件' },
          { name: '--prefix=<prefix>', description: '路径前缀' },
          { name: 'HEAD', description: '当前版本' }
        ]
      },
      {
        name: 'git bundle', description: '将仓库内容打包成单个文件，便于通过 U 盘或邮件共享。', params: [
          { name: 'create <file>', description: '创建包' },
          { name: 'verify <file>', description: '验证包' },
          { name: 'list-heads <file>', description: '列出分支' },
          { name: 'pull <file>', description: '解包' }
        ]
      },
      {
        name: 'git gc', description: '垃圾回收，清理仓库中不再需要的松散对象和冗余数据。Git 会自动执行。', params: [
          { name: '--aggressive', description: '深度优化' },
          { name: '--prune=<date>', description: '清理日期' },
          { name: '--quiet', description: '静默模式' }
        ]
      },
      {
        name: 'git fsck', description: '检查 Git 对象数据库的完整性和连接性。用于诊断仓库问题。', params: [
          { name: '--unreachable', description: '显示不可达对象' },
          { name: '--dangling', description: '显示悬空对象' },
          { name: '--root', description: '显示根提交' }
        ]
      }
    ]
  },
  {
    name: '🛠️ 调试与诊断',
    commands: [
      {
        name: 'git debug', description: '用于调试 Git 本身的命令（高级功能）。', params: [
          { name: '--debug=<area>', description: '调试区域' }
        ]
      },
      {
        name: 'git daemon', description: '启动 Git 守护进程，允许通过 git:// 协议访问仓库。', params: [
          { name: '--base-path=<path>', description: '基础路径' },
          { name: '--export-all', description: '导出所有仓库' },
          { name: '<repo-path>', description: '仓库路径' }
        ]
      },
      {
        name: 'git instaweb', description: '在 web 浏览器中启动 GitWeb 来查看仓库。', params: [
          { name: '--start', description: '启动服务' },
          { name: '--stop', description: '停止服务' },
          { name: '--httpd=<server>', description: '指定服务器' }
        ]
      },
      {
        name: 'git verify-pack', description: '验证压缩的 Git 包文件的完整性。', params: [
          { name: '-v', description: '详细输出' },
          { name: '<pack-file>', description: '包文件' }
        ]
      },
      {
        name: 'git verify-commit', description: '验证提交的 GPG 签名。', params: [
          { name: '<commit>', description: '提交对象' }
        ]
      }
    ]
  },
  {
    name: '⚡ 性能与优化',
    commands: [
      {
        name: 'git pack-refs', description: '将引用（分支和标签）打包成单个文件中，加快仓库操作速度。', params: [
          { name: '--all', description: '打包所有' },
          { name: '--no-reflog', description: '不含引用日志' }
        ]
      },
      {
        name: 'git prune', description: '删除所有无法访问的对象。不推荐手动执行，git gc 会自动处理。', params: [
          { name: '--progress', description: '显示进度' },
          { name: '--expire=<time>', description: '过期时间' }
        ]
      },
      {
        name: 'git count-objects', description: '统计仓库中的对象数量和磁盘使用情况。', params: [
          { name: '-v', description: '详细输出' },
          { name: '-H', description: '人类可读' }
        ]
      }
    ]
  },
  {
    name: '🔐 安全与权限',
    commands: [
      {
        name: 'git credential', description: '凭据管理。帮助存储和获取远程仓库的身份验证信息。', params: [
          { name: 'fill', description: '获取凭据' },
          { name: 'approve', description: '确认凭据' },
          { name: 'reject', description: '拒绝凭据' }
        ]
      },
      {
        name: 'git credential-cache', description: '将凭据暂存在内存中一段时间，避免重复输入密码。', params: [
          { name: '--timeout <sec>', description: '过期时间' },
          { name: '--socket <path>', description: ' socket 路径' }
        ]
      },
      {
        name: 'git credential-store', description: '将凭据永久存储在磁盘上（加密）。', params: [
          { name: '--file <path>', description: '凭据文件' }
        ]
      },
      {
        name: 'git verify-tag', description: '验证标签的 GPG 签名。', params: [
          { name: '<tag>', description: '标签名' }
        ]
      }
    ]
  },
  {
    name: '🌐 传输协议',
    commands: [
      { name: 'git protocol-capabilities', description: '列出 Git 协议支持的特性。', params: [] },
      {
        name: 'git upload-pack', description: '服务器端命令，用于 clone 和 fetch 操作。', params: [
          { name: '--stateless-rpc', description: '无状态 RPC' },
          { name: '--advertise-refs', description: '通告引用' }
        ]
      },
      {
        name: 'git receive-pack', description: '服务器端命令，用于 push 操作。', params: [
          { name: '--stateless-rpc', description: '无状态 RPC' },
          { name: '--advertise-refs', description: '通告引用' }
        ]
      }
    ]
  },
  {
    name: '📊 导出演入',
    commands: [
      {
        name: 'git fast-export', description: '将仓库导出为可移植的流格式，可用于迁移或备份。', params: [
          { name: '--all', description: '导出所有' },
          { name: '--date-format=<fmt>', description: '日期格式' },
          { name: '<branch>', description: '分支名' }
        ]
      },
      {
        name: 'git fast-import', description: '从 fast-export 格式导入仓库。用于恢复或迁移仓库。', params: [
          { name: '--import-marks=<file>', description: '导入标记' },
          { name: '--export-marks=<file>', description: '导出标记' },
          { name: '--force', description: '强制覆盖' }
        ]
      },
      {
        name: 'git cvsexport', description: '将 Git 提交导出为 CVS 格式。', params: [
          { name: '-d <cvsroot>', description: 'CVS 根目录' },
          { name: '-w <dir>', description: '工作目录' },
          { name: '<commit>', description: '提交' }
        ]
      },
      {
        name: 'git cvsimport', description: '从 CVS 仓库导入到 Git。', params: [
          { name: '-d <cvsroot>', description: 'CVS 根目录' },
          { name: '-A <file>', description: '作者映射' },
          { name: '-v', description: '详细输出' }
        ]
      }
    ]
  },
  {
    name: '📨 邮件操作',
    commands: [
      {
        name: 'git format-patch', description: '将提交导出为 mbox 格式的补丁文件，方便通过邮件发送。', params: [
          { name: '-n', description: '编号命名' },
          { name: '-o <dir>', description: '输出目录' },
          { name: '--stdout', description: '输出到标准输出' },
          { name: '<since>..<until>', description: '提交范围' }
        ]
      },
      {
        name: 'git send-email', description: '发送格式化的补丁到邮件列表。', params: [
          { name: '--to=<addr>', description: '收件人' },
          { name: '--cc=<addr>', description: '抄送' },
          { name: '--smtp-server', description: 'SMTP 服务器' },
          { name: '<file>', description: '补丁文件' }
        ]
      },
      {
        name: 'git request-pull', description: '生成一个用于发送给维护者的拉取请求摘要。', params: [
          { name: '<start>', description: '起始提交' },
          { name: '<url>', description: '仓库 URL' },
          { name: '<end>', description: '结束提交' }
        ]
      },
      {
        name: 'git imap-send', description: '将补丁发送到 IMAP 服务器。', params: [
          { name: '--folder=<folder>', description: 'IMAP 文件夹' },
          { name: '--batch', description: '批量模式' }
        ]
      }
    ]
  },
  {
    name: '🧪 测试与实验',
    commands: [
      {
        name: 'git test', description: 'Git 内部测试命令。', params: [
          { name: '--chainlint', description: '链式lint' }
        ]
      },
      { name: 'git tty', description: '检查 Git 是否连接了 TTY 终端。', params: [] }
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
