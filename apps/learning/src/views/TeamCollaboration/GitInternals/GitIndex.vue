<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📋 Git 暂存区：.git/index 文件揭秘</h1>
          <p class="text-sm text-slate-500 mt-1">暂存区是什么、为什么要有它、底层数据结构是怎样的——理解 add/commit/checkout 的完整过程</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/TeamCollaboration/GitInternals/GitIndex.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Git 底层</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 暂存区是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          暂存区（Staging Area）是什么
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          暂存区是 Git 独有的一个概念（SVN、Mercurial 都没有）。它是介乎<strong>工作目录</strong>和<strong>版本库</strong>之间的一个"预备区"——你可以选择性地把工作目录中的改动用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git add</code> 加入暂存区，然后一次性 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git commit</code> 提交。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 mb-4">
          <h3 class="font-semibold text-slate-700 text-sm mb-2">Git 的"三棵树"模型</h3>
          <Code language="text" :code="threeTrees" title="三个区域" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          暂存区就像 React 的 <strong>Virtual DOM diff 后的 pending 状态</strong>——你收集了一批变更，确认无误后一次性 commit（类似 React 的一次 commit/render）。或者像购物车的"结算前确认"页面——你可以反复添加/移除商品（git add/reset），最后一次性下单（git commit）。</p>
        </aside>
      </section>

      <!-- 2. 暂存区的价值 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么要设计暂存区？
        </h2>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>精细控制提交粒度</strong><br/><span class="text-sm">改了一堆文件，但只想提交其中几个相关的。暂存区让你"挑选"要提交的内容，不相关的改动留在工作目录下次再提交。这在 SVN 里做不到——SVN 只能全量提交。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>部分文件暂存（Partial Staging）</strong><br/><span class="text-sm">同一个文件改了 5 处，只想提交其中 2 处？<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git add -p</code> 可以让你逐个 hunk（代码块）选择是否暂存。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>冲突解决的中转站</strong><br/><span class="text-sm">merge/rebase 时，已成功合并的文件进入暂存区，有冲突的文件留在工作目录。你可以逐个解决冲突然后 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git add</code> 标记为已解决，最后一次性 commit。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>commit 的"蓝本"</strong><br/><span class="text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git diff --cached</code> 可以预览将要提交的内容，避免把调试代码、临时文件误提交进去。</span></div>
          </li>
        </ol>
      </section>

      <!-- 3. index 文件结构 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          .git/index 二进制文件结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git/index</code> 是一个<strong>二进制文件</strong>，包含暂存区所有文件的元数据。它的内部结构如下：
        </p>

        <Code language="text" :code="indexFormat" title=".git/index 文件格式" />

        <div class="overflow-x-auto mt-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">区域</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">大小</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">签名</td><td class="px-4 py-2 border border-slate-200">4 bytes</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">DIRC</code> = "DirCache"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">版本号</td><td class="px-4 py-2 border border-slate-200">4 bytes</td><td class="px-4 py-2 border border-slate-200">当前 2/3/4（不同 Git 版本）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">条目数</td><td class="px-4 py-2 border border-slate-200">4 bytes</td><td class="px-4 py-2 border border-slate-200">暂存区有多少个文件</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">条目列表</td><td class="px-4 py-2 border border-slate-200">变长</td><td class="px-4 py-2 border border-slate-200">每个文件一条记录</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">扩展数据</td><td class="px-4 py-2 border border-slate-200">变长</td><td class="px-4 py-2 border border-slate-200">缓存树、未合并条目等</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">校验和</td><td class="px-4 py-2 border border-slate-200">20 bytes</td><td class="px-4 py-2 border border-slate-200">整个文件的 SHA-1</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. 查看暂存区 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          查看和操作暂存区
        </h2>

        <Code language="bash" :code="indexOps" title="暂存区操作" />

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 暂存区存的不是文件本身：</strong>暂存区条目中只存文件的<strong>元数据+blob hash</strong>，不存文件内容。文件内容已经作为 blob 存在 objects 中了。暂存区就是"下一个 commit 该包含哪些 blob"的清单。</p>
        </aside>
      </section>

      <!-- 5. add/commit/checkout -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          add / commit / checkout 底层全过程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理解三个核心命令在"三棵树"之间的数据流动，是理解 Git 的关键。
        </p>

        <Code language="text" :code="dataFlow" title="三棵树间的数据流" />

        <h3 class="text-sm font-semibold text-slate-700 mt-4 mb-3">逐个命令拆解</h3>

        <div class="space-y-4">
          <div class="border border-blue-200 bg-blue-50/50 rounded-xl p-4">
            <h4 class="font-semibold text-blue-800 text-sm mb-1">git add — 工作目录 → 暂存区</h4>
            <ol class="list-decimal list-inside space-y-1 text-blue-800 text-sm leading-relaxed">
              <li>对文件内容计算 SHA-1，创建（或复用）blob 对象写入 .git/objects/</li>
              <li>更新 .git/index 中的条目：ctime、mtime、size、blob hash</li>
              <li>如果文件之前已在暂存区，替换旧条目；否则新增条目</li>
            </ol>
          </div>

          <div class="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4">
            <h4 class="font-semibold text-emerald-800 text-sm mb-1">git commit — 暂存区 → 版本库</h4>
            <ol class="list-decimal list-inside space-y-1 text-emerald-800 text-sm leading-relaxed">
              <li>根据 .git/index 中的条目构建 tree 对象（可能需要多层 tree 表示子目录）</li>
              <li>创建 commit 对象：tree + parent + author/committer + message</li>
              <li>更新 HEAD 指向的分支引用为新 commit 的 SHA-1</li>
              <li><strong>注意：暂存区内容不变！</strong>commit 后暂存区仍然保持原样</li>
            </ol>
          </div>

          <div class="border border-amber-200 bg-amber-50/50 rounded-xl p-4">
            <h4 class="font-semibold text-amber-800 text-sm mb-1">git checkout — 版本库 → 暂存区 + 工作目录</h4>
            <ol class="list-decimal list-inside space-y-1 text-amber-800 text-sm leading-relaxed">
              <li>解析目标（分支名或 commit hash），找到对应的 tree 对象</li>
              <li>把 tree 中每个文件对应的 blob 解压到工作目录</li>
              <li>用 tree 的内容更新 .git/index（暂存区 = HEAD 的 tree 内容）</li>
              <li>更新 HEAD 指向目标引用</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 6. 暂存区缓存树 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          缓存树（Cache Tree）— 加速 status
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          index 文件末尾有一个<strong>缓存树扩展</strong>，存储了目录级别的 tree hash。这让 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git status</code> 能快速判断哪些目录没有变化——如果目录的 tree hash 没变，就不需要逐文件检查。
        </p>

        <Code language="bash" :code="cacheTree" title="查看缓存树" />

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 性能意义：</strong>缓存树让 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">git status</code> 在大型仓库中仍然很快——Git 不需要对每个文件重新计算 SHA-1 来判断是否变化，只需比较目录级别的 tree hash。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-slate-200 mt-8">
      <RouterLink to="/TeamCollaboration/GitInternals/GitRefs" class="text-slate-500 hover:text-cyan-600 transition-colors">← 引用系统：HEAD / 分支 / 标签 / reflog</RouterLink>
      <RouterLink to="/TeamCollaboration/GitInternals/GitStorage" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">存储与传输：packfile / GC / 协议 →</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "暂存区是什么" },
  { id: "sec-2", name: "为什么设计暂存区" },
  { id: "sec-3", name: "index 文件结构" },
  { id: "sec-4", name: "查看和操作" },
  { id: "sec-5", name: "add/commit/checkout流程" },
  { id: "sec-6", name: "缓存树加速" },
]

const threeTrees = `┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   工作目录       │     │   暂存区         │     │   版本库          │
│  (Working Dir)  │     │  (Staging Area)  │     │  (Repository)    │
│                 │     │                 │     │                 │
│  你正在编辑的    │git add│  下次 commit    │commit│  历史提交记录    │
│  实际文件        │─────→│  的快照         │─────→│  (objects/)     │
│                 │     │  (.git/index)   │     │                 │
│  ls ./          │     │  git ls-files   │     │  git log        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ↑                        ↑                       │
        │         git checkout / git restore            │
        └────────────────────────────────────────────────┘`

const indexFormat = `.git/index 二进制结构：

┌──────────────────────────────────────┐
│ Header (12 bytes)                    │
│  ├─ Signature: "DIRC" (4 bytes)      │
│  ├─ Version: 2/3/4 (4 bytes)         │
│  └─ Entry count (4 bytes)            │
├──────────────────────────────────────┤
│ Entry 1                              │
│  ├─ ctime (8+8 bytes)               │  ← 文件元数据变更时间
│  ├─ mtime (8+8 bytes)               │  ← 文件内容变更时间
│  ├─ dev/inode (4+4 bytes)           │  ← 文件系统信息
│  ├─ mode (4 bytes)                  │  ← 100644/100755/...
│  ├─ uid/gid (4+4 bytes)            │
│  ├─ size (4 bytes)                  │  ← 文件大小
│  ├─ SHA-1 (20 bytes)               │  ← blob hash（核心！）
│  ├─ flags (2 bytes)                 │  ← 文件名长度 + 标志位
│  └─ path (变长，以 \\0 结尾)         │  ← 相对路径（如 src/main.go）
├──────────────────────────────────────┤
│ Entry 2, Entry 3, ...               │
├──────────────────────────────────────┤
│ Extensions (可选，变长)              │
│  ├─ TREE: 缓存树（加速 status）      │
│  ├─ REUC: 未解决的合并冲突           │
│  └─ ...                             │
├──────────────────────────────────────┤
│ SHA-1 checksum (20 bytes)           │  ← 整个 index 文件的校验和
└──────────────────────────────────────┘`

const indexOps = `# 查看暂存区内容（底层命令，显示 blob hash + 模式 + 路径）
git ls-files --stage
# 100644 a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0 0       README.md
# 100644 b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a 0       src/main.go
# 模式    blob hash                                    合并阶段  文件名

# 合并阶段（第三列）：
# 0 — 正常文件（无冲突）
# 1 — 共同祖先版本
# 2 — "ours"（当前分支）版本
# 3 — "theirs"（合并进来的分支）版本

# 查看暂存区的调试信息（含缓存树）
git ls-files --debug

# 查看 index 文件的原始二进制（前 256 字节）
xxd .git/index | head -20

# 查看暂存区文件数量
git ls-files | wc -l

# 仅暂存区有、工作目录没有的文件
git ls-files --others --exclude-standard

# 用 git update-index 直接操作 index（底层命令）
git update-index --add --cacheinfo 100644 \\
  a1b2c3d4... newfile.txt

# 从暂存区移除（但保留工作目录文件）
git rm --cached file.txt

# 清空暂存区（危险！相当于取消所有 add）
git rm -r --cached .`

const dataFlow = `git add          git commit         git checkout
   ──────→           ───────→            ───────→
┌──────────┐    ┌──────────┐     ┌──────────┐    ┌──────────┐
│ 工作目录  │ → │ 暂存区    │  →  │ 版本库    │ ← │ 版本库    │
│ (files)  │    │ (index)  │     │(objects) │    │(objects) │
└──────────┘    └──────────┘     └──────────┘    └──────────┘
                     ↑                                │
                     │        git checkout            │
                     └────────────────────────────────┘
                            git restore --staged
                     ←──────────────────────────
                           git restore (不加 --staged)
                     ←──────────────────────────
                                                      │
                                             工作目录 + 暂存区
                                             同时被更新`

const cacheTree = `# 查看 index 文件的缓存树扩展
git ls-files --debug | head -30
# 输出中会包含：
#   ctime: ...
#   mtime: ...
#   ...
# 最后有一个 "cache-tree" 部分

# 强制重建缓存树（如果怀疑缓存损坏）
git update-index --really-refresh

# 写入 tree 对象并更新缓存树
git write-tree
# 这个命令也会更新 index 中的缓存树扩展

# 查看当前 index 对应的 tree hash（如果有缓存树）
git write-tree 2>/dev/null || echo "暂存区有变化，需要先 add 或 reset"`

const gitStatus = `# git status 的执行过程（利用缓存树优化）

# 1. 读取 HEAD 的 tree hash
# 2. 读取 index 中的缓存树
# 3. 比较目录级别的 tree hash：
#    - 如果相同 → 整个目录未变，跳过
#    - 如果不同 → 进入该目录逐文件比较：
#      a. 比较 mtime/size（快速判断文件是否被修改）
#      b. 如果 mtime 变了，重新计算文件 SHA-1 与 index 中的 blob hash 比较
#      c. 如果不同 → 显示为 "modified"
# 4. 比较 index 与 HEAD 的 tree → "Changes to be committed"
# 5. 比较工作目录与 index → "Changes not staged for commit"
# 6. 检查未跟踪文件（不在 index 中也不在 .gitignore 中）→ "Untracked files"`
</script>
