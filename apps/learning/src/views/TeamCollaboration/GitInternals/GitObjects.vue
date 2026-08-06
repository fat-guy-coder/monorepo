<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧱 Git 对象模型：blob / tree / commit / tag</h1>
          <p class="text-sm text-slate-500 mt-1">每种对象的存储格式、创建方式和相互引用关系——Git 数据模型完全拆解</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/TeamCollaboration/GitInternals/GitObjects.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Git 底层</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. blob -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>
          blob — 文件内容的存储单元
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          blob（Binary Large Object）是四种对象中最简单的——<strong>只存文件内容</strong>，不存文件名、不存路径、不存权限。Git 在存储前对"对象头 + 内容"做 zlib 压缩。
        </p>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">blob 的存储格式</h3>
          <Code language="text" :code="blobFormat" title="blob 二进制格式" />
        </div>

        <Code language="bash" :code="blobOps" title="动手验证 blob" />

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>如果两个文件内容完全相同（比如复制了一份），它们共享<strong>同一个 blob 对象</strong>。Git 自动去重，无论文件名是否相同。这就是为什么 Git 仓库不会因为文件复制而膨胀。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          blob 就像文件内容的 <strong>content hash</strong>——不关心文件叫什么名字、放在哪里，只关心内容本身。就像 Webpack 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">file.[hash].js</code>，内容不变 hash 就不变。</p>
        </aside>
      </section>

      <!-- 2. tree -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm">2</span>
          tree — 目录结构的快照
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          tree 对象存储一个目录的<strong>完整结构信息</strong>。每条记录包含：文件模式（权限）、对象类型、SHA-1 哈希、文件名。这就像一个目录的"清单"。
        </p>

        <div class="mb-4">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">tree 的存储格式</h3>
          <Code language="text" :code="treeFormat" title="tree 二进制格式" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">模式 (mode)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Git 对象类型</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">100644</code></td><td class="px-4 py-2 border border-slate-200">普通文件</td><td class="px-4 py-2 border border-slate-200">blob</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">100755</code></td><td class="px-4 py-2 border border-slate-200">可执行文件</td><td class="px-4 py-2 border border-slate-200">blob</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">040000</code></td><td class="px-4 py-2 border border-slate-200">子目录</td><td class="px-4 py-2 border border-slate-200">tree</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">120000</code></td><td class="px-4 py-2 border border-slate-200">符号链接</td><td class="px-4 py-2 border border-slate-200">blob（内容是链接目标路径）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">160000</code></td><td class="px-4 py-2 border border-slate-200">子模块（gitlink）</td><td class="px-4 py-2 border border-slate-200">commit（子仓库的 commit hash）</td></tr>
            </tbody>
          </table>
        </div>

        <Code language="bash" :code="treeOps" title="动手验证 tree" />

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Git 不跟踪空目录：</strong>tree 中的每条记录都指向一个 blob 或 subtree。如果目录下没有任何文件，Git 不会为此目录创建 tree 对象——这就是 Git "不跟踪空目录"的根本原因。常见的 workaround 是在空目录里放一个 <code class="bg-amber-100 px-1 rounded text-xs font-mono">.gitkeep</code> 文件。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          tree 就像文件系统的 <strong>目录索引（inode table）</strong>——它不存文件内容，只存"文件名→inode/blob"的映射关系。类似 React/Vue 的 Virtual DOM tree，每个节点记录自己的属性和子节点引用。</p>
        </aside>
      </section>

      <!-- 3. commit -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-red-100 text-red-700 rounded-lg flex items-center justify-center text-sm">3</span>
          commit — 提交的元数据容器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          commit 对象包含一次提交的<strong>全部元数据</strong>。它是 Git 历史的节点——通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">parent</code> 字段串成一条链（DAG：有向无环图）。
        </p>

        <Code language="text" :code="commitFormat" title="commit 的存储格式" />

        <Code language="bash" :code="commitOps" title="动手验证 commit" />

        <div class="overflow-x-auto mt-4 mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">字段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">何时不同</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">author</code></td><td class="px-4 py-2 border border-slate-200">最初写代码的人</td><td class="px-4 py-2 border border-slate-200">cherry-pick 保留原作者；rebase/amend 保留 author</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">committer</code></td><td class="px-4 py-2 border border-slate-200">把 commit 放入仓库的人</td><td class="px-4 py-2 border border-slate-200">cherry-pick 时 committer 是执行者；rebase/amend 更新 committer</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 Merge Commit 有多个 parent：</strong>普通 commit 只有一个 parent，而 merge commit 有两个（或更多，octopus merge）。Root commit（第一个 commit）没有 parent 字段。</p>
        </aside>
      </section>

      <!-- 4. tag -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-sm">4</span>
          tag — 两种标签的本质区别
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-slate-200 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">Lightweight Tag（轻量标签）</h3>
            <p class="text-sm text-slate-600 mb-3"><strong>不是 Git 对象。</strong>只是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.git/refs/tags/v1.0</code> 里存了一个 commit SHA-1。像一个不会移动的分支。</p>
            <Code language="bash" :code="lightTag" title="Lightweight Tag" />
          </div>
          <div class="border border-slate-200 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">Annotated Tag（附注标签）</h3>
            <p class="text-sm text-slate-600 mb-3"><strong>是 Git 对象。</strong>存在 objects 中，有自己的 hash。包含标签消息、打标签者、时间戳、GPG 签名。</p>
            <Code language="bash" :code="annotatedTag" title="Annotated Tag" />
          </div>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>发布版本始终用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">git tag -a</code> 创建 annotated tag。它记录了谁、何时、为什么打标签，还可以附加 GPG 签名验证发布者身份。</p>
        </aside>
      </section>

      <!-- 5. 完整链条 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          一次 commit 的完整流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git add</code> 到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git commit</code>，底层究竟发生了什么：
        </p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>修改文件 → hash-object 创建新 blob</strong><br/><span class="text-sm">Git 对文件内容计算 SHA-1，zlib 压缩后写入 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.git/objects/XX/XXXX...</code>。内容没变则 hash 不变，不产生新对象。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>git add → update-index 更新暂存区</strong><br/><span class="text-sm">把文件名、权限、blob hash 写入 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.git/index</code>（二进制文件）。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>git commit → write-tree 创建新 tree</strong><br/><span class="text-sm">根据 index 中的文件列表构建 tree 对象，写入 objects。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>git commit → commit-tree 创建 commit 对象</strong><br/><span class="text-sm">创建包含 tree hash、parent hash、作者/提交者、消息的 commit 对象。</span></div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>更新 refs/heads/main</strong><br/><span class="text-sm">把当前分支引用文件的内容更新为新 commit 的 SHA-1。此时 git log 就能看到新提交了。</span></div>
          </li>
        </ol>
      </section>

      <!-- 6. 悬空对象与 GC -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          悬空对象与垃圾回收
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当你 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git reset --hard</code> 或 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git commit --amend</code> 时，旧的 commit/tree/blob 变得"不可达"——没有任何 ref 指向它们。这些就是<strong>悬空对象（dangling objects）</strong>。
        </p>

        <Code language="bash" :code="gcOps" title="查看和清理悬空对象" />

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-amber-800"><strong>⏰ 后悔期：</strong>Git 不会立即删除"丢失"的对象。reflog 默认保留 90 天，不可达对象在 gc 前也至少保留 2 周——你有充足的时间恢复"误删"的数据。如果刚误操作，<code class="bg-amber-100 px-1 rounded text-xs font-mono">git reflog</code> 是你的救命稻草。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-slate-200 mt-8">
      <RouterLink to="/TeamCollaboration/GitInternals/GitInternalsOverview" class="text-slate-500 hover:text-cyan-600 transition-colors">← 底层概览：.git 目录与设计哲学</RouterLink>
      <RouterLink to="/TeamCollaboration/GitInternals/GitRefs" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">引用系统：HEAD / 分支 / 标签 →</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "blob 文件内容" },
  { id: "sec-2", name: "tree 目录结构" },
  { id: "sec-3", name: "commit 提交容器" },
  { id: "sec-4", name: "tag 两种标签" },
  { id: "sec-5", name: "完整提交流程" },
  { id: "sec-6", name: "悬空对象与GC" },
]

const blobFormat = `# blob 的存储格式（存储前会 zlib 压缩）
blob <内容字节数>\\0<文件原始内容>

# 例如文件内容是 "hello\\n"（6字节）
blob 6\\0hello\\n
# 对这个字符串计算 SHA-1，就是对象文件名`

const blobOps = `# 1. 创建一个 blob 对象
echo -n 'hello git' | git hash-object -w --stdin
# → a1b2c3d4e5f6...

# 2. 查看对象类型
git cat-file -t a1b2c3d
# → blob

# 3. 查看对象内容
git cat-file -p a1b2c3d
# → hello git

# 4. 查看对象大小（字节）
git cat-file -s a1b2c3d
# → 9

# 5. 看看实际存储的文件
ls .git/objects/a1/
# → b2c3d4e5f6...`

const treeFormat = `# tree 的存储格式（每条记录 20 字节 SHA-1 是二进制的）
tree <内容字节数>\\0
<模式> <文件名>\\0<20字节二进制SHA-1>
<模式> <文件名>\\0<20字节二进制SHA-1>
...

# 模式含义：
# 100644 — 普通文件
# 100755 — 可执行文件
# 040000 — 子目录（tree）
# 120000 — 符号链接
# 160000 — gitlink（子模块）`

const treeOps = `# 查看 HEAD 指向的 tree 对象
git cat-file -p HEAD^{tree}
# 输出：
# 100644 blob a1b2c3...  README.md
# 100644 blob e4f5a6...  package.json
# 040000 tree 7b3a1c...  src/

# 递归列出整个 tree
git ls-tree -r HEAD

# 只看第一层
git ls-tree HEAD

# 列出 tree 对象的大小
git ls-tree -l HEAD`

const commitFormat = `# commit 的存储格式
commit <内容字节数>\\0
tree <tree的SHA-1>
parent <父commit的SHA-1>     ← 可有 0 个（root）或多个（merge）
author <名> <邮箱> <Unix时间戳> <时区>
committer <名> <邮箱> <Unix时间戳> <时区>

<提交消息>
<可以有多行，直到文件结束>`

const commitOps = `# 查看 HEAD commit 的完整原始内容
git cat-file -p HEAD
# 输出：
# tree 4b825dc642cb6eb9a060e54bf91039f5b5b6e9e3
# parent 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
# author Jason <jason@example.com> 1717200000 +0800
# committer Jason <jason@example.com> 1717200000 +0800
#
# feat: add new feature

# 只看 tree hash
git rev-parse HEAD^{tree}

# 查看 commit 的 hash
git rev-parse HEAD

# 查看 git log 原始数据
git log --format=raw -1`

const lightTag = `# 创建 lightweight tag（不产生 tag 对象）
git tag v1.0-lite

# 本质就是写了一个文件
cat .git/refs/tags/v1.0-lite
# → a1b2c3d4e5f6...

# 验证：它只是指向 commit 的引用
git cat-file -t v1.0-lite
# → commit（因为 ref 指向 commit，不是 tag 对象）`

const annotatedTag = `# 创建 annotated tag（产生 tag 对象）
git tag -a v1.0 -m "正式发布 v1.0"

# 查看 tag 对象（是真正的 tag 类型）
git cat-file -t v1.0
# → tag

# 查看 tag 对象内容
git cat-file -p v1.0
# object a1b2c3d4e5...   ← 指向的 commit
# type commit
# tag v1.0
# tagger Jason <...> 1717200000 +0800
#
# 正式发布 v1.0

# 附上 GPG 签名
git tag -s v1.0 -m "signed release"`

const gcOps = `# 查看悬空对象
git fsck --dangling

# 查看所有不可达对象
git fsck --unreachable

# 查看 objects 目录大小
du -sh .git/objects/

# 垃圾回收 + 压缩
git gc --aggressive --prune=now

# 再次查看大小
du -sh .git/objects/

# 如果刚误操作（reset --hard 丢了提交），快来这里找
git reflog

# 恢复"丢失"的 commit（用 reflog 中的 hash）
git checkout -b recovered-branch abc1234`
</script>
