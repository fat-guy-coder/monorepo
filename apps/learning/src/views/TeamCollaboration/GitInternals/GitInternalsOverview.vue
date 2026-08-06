<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔬 Git 底层概览：.git 目录与设计哲学</h1>
          <p class="text-sm text-slate-500 mt-1">深入理解 Git 的内容寻址文件系统——它不只是一个 VCS，更是一个文件系统上的数据库</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/TeamCollaboration/GitInternals/GitInternalsOverview.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Git 底层</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. .git 目录结构 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          .git 目录完整结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当你执行 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git init</code> 时，Git 在当前目录创建一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git</code> 文件夹——这就是整个仓库的核心。下面是一个典型仓库的完整目录结构：
        </p>

        <Code language="text" :code="dirTreeCode" title="📂 .git 目录结构" />

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-amber-800"><strong>💡 核心理念：</strong>Git 的 .git 目录本质上是一个<strong>内容寻址（content-addressable）文件系统</strong>——每个对象的文件名就是其内容的 SHA-1 哈希。相同内容 = 相同哈希 = 自动去重，只存一份。</p>
        </aside>
      </section>

      <!-- 2. 四种核心对象 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          四种核心对象
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Git 的所有数据以<strong>对象（object）</strong>的形式存储在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git/objects/</code> 中。Git 只有四种对象类型，理解这四种对象就理解了 Git 的全部存储结构。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- blob -->
          <div class="border border-slate-200 rounded-xl p-4 border-t-4 border-t-blue-500">
            <h3 class="font-semibold text-slate-800 mb-1">📄 blob — 文件内容</h3>
            <p class="text-sm text-slate-500 mb-2">Binary Large Object</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-2">存储<strong>文件内容</strong>（不含文件名、不含路径）。同一文件内容只存一份。</p>
            <Code language="bash" :code="blobDemo" title="查看 blob" />
          </div>

          <!-- tree -->
          <div class="border border-slate-200 rounded-xl p-4 border-t-4 border-t-emerald-500">
            <h3 class="font-semibold text-slate-800 mb-1">🌳 tree — 目录结构</h3>
            <p class="text-sm text-slate-500 mb-2">目录树的快照</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-2">存储<strong>目录结构</strong>——文件名、权限、指向 blob 和 subtree 的引用。</p>
            <Code language="bash" :code="treeDemo" title="查看 tree" />
          </div>

          <!-- commit -->
          <div class="border border-slate-200 rounded-xl p-4 border-t-4 border-t-red-500">
            <h3 class="font-semibold text-slate-800 mb-1">📦 commit — 提交快照</h3>
            <p class="text-sm text-slate-500 mb-2">提交的元数据容器</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-2">存储 tree 指针、作者、提交者、时间戳、消息、parent commit（形成历史链）。</p>
            <Code language="bash" :code="commitDemo" title="查看 commit" />
          </div>

          <!-- tag -->
          <div class="border border-slate-200 rounded-xl p-4 border-t-4 border-t-purple-500">
            <h3 class="font-semibold text-slate-800 mb-1">🏷️ tag — 标签对象</h3>
            <p class="text-sm text-slate-500 mb-2">Annotated Tag 是独立对象</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-2"><strong>Annotated tag</strong> 存在 objects 中，含标签消息和签名。Lightweight tag 仅是 refs 下的引用，不是对象。</p>
            <Code language="bash" :code="tagDemo" title="创建与查看 tag" />
          </div>
        </div>
      </section>

      <!-- 3. 对象引用关系 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          对象引用关系全景图
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个 commit 指向一棵 tree，tree 里包含 blob（文件）和其他 tree（子目录）。所有对象通过 SHA-1 哈希互相引用，形成一条不可变的单向链。
        </p>
        <Code language="text" :code="refChain" title="引用链条" />
      </section>

      <!-- 4. 内容寻址 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          内容寻址：Git 最核心的设计
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">🔑 相同内容 = 相同 Hash</h3>
            <p class="text-sm text-slate-600 leading-relaxed">Git 对"对象头+内容"计算 SHA-1，作为文件名和寻址键。同一文件内容只存一份 blob，无论出现在多少个 commit 中。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">🔗 不可变、单向链接</h3>
            <p class="text-sm text-slate-600 leading-relaxed">对象一旦创建就不可变。修改文件 = 创建新 blob = 创建新 tree = 创建新 commit。旧对象保留，历史不可篡改。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">✅ 完整性自验证</h3>
            <p class="text-sm text-slate-600 leading-relaxed">对象文件名就是内容的哈希——读取时立即验证内容是否被篡改。这是 Git 安全模型的基石。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4">
            <h3 class="font-semibold text-slate-800 text-sm mb-2">🗜️ 自动去重</h3>
            <p class="text-sm text-slate-600 leading-relaxed">相同内容产生相同 hash，自然去重。gc 时还会做 delta 压缩，将相似文件存储为差异，进一步节省空间。</p>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Git 的内容寻址就像 Webpack/Vite 的 content hash 命名——<code class="bg-purple-100 px-1 rounded">app.a1b2c3.js</code>。文件内容不变，hash 不变，浏览器就能永久缓存。Git 也是同样原理：内容不变 = 对象复用。
          </p>
        </aside>
      </section>

      <!-- 5. Git 的设计哲学 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Git 的设计哲学
        </h2>

        <ol class="space-y-5">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <strong class="text-slate-800">快照而非差异（Snapshots, Not Diffs）</strong>
              <p class="text-sm text-slate-600 mt-1 leading-relaxed">SVN 存储文件之间的差异（delta），要拿到最新版本必须从 v1 开始应用所有 diff。Git 每次 commit 存储整个项目的完整快照——未修改的文件复用已有 blob 引用，不产生新对象。读取任意版本都是 O(1)。</p>
              <div class="grid grid-cols-2 gap-3 mt-2 text-xs">
                <div class="bg-red-50 border border-red-200 rounded-lg p-2 text-red-800">
                  <strong>❌ SVN（delta-based）：</strong>v1 → diff → v2 → diff → v3
                </div>
                <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-emerald-800">
                  <strong>✅ Git（snapshot-based）：</strong>v1 → 完整快照。v2 → 新文件新 blob，旧文件复用旧 blob。
                </div>
              </div>
            </div>
          </li>

          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <strong class="text-slate-800">本地优先（Local First）</strong>
              <p class="text-sm text-slate-600 mt-1 leading-relaxed">几乎所有操作无需网络——查看历史、创建分支、提交更改。每个人本地都有完整的仓库副本（不像 SVN 只检出当前版本）。这也是 Git 快的原因。</p>
            </div>
          </li>

          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <strong class="text-slate-800">完整性至上（Integrity）</strong>
              <p class="text-sm text-slate-600 mt-1 leading-relaxed">所有数据在存储前经过 SHA-1 校验和计算，以校验和来引用。不可能在 Git 不知情的情况下更改任何文件或目录内容——对象 hash 变了就不匹配了。</p>
            </div>
          </li>

          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div>
              <strong class="text-slate-800">只追加数据（Append Only）</strong>
              <p class="text-sm text-slate-600 mt-1 leading-relaxed">Git 几乎所有操作只<strong>添加</strong>数据。即使 reset --hard，旧对象仍在 objects 里（直到 gc 清理）。reflog 给了你 90 天的后悔期。</p>
            </div>
          </li>

          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div>
              <strong class="text-slate-800">管道命令与瓷面命令分离（Plumbing & Porcelain）</strong>
              <p class="text-sm text-slate-600 mt-1 leading-relaxed"><strong>Plumbing（管道）</strong>是底层核心命令（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git hash-object</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git cat-file</code>），适合脚本和深度理解。<strong>Porcelain（瓷面）</strong>是用户友好的高层命令（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git add</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git commit</code>），底层调用 plumbing 命令。</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- 6. 动手实验 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          动手实验：手工构建一个 Commit
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用 Git 底层（plumbing）命令，不通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git add</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git commit</code>，手工创建完整的 commit。这个实验能让你彻底理解 Git 的工作流程。
        </p>

        <Code language="bash" :code="diyCommit" title="🧪 手工构建 commit" />

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>🎯 总结：</strong>这个实验揭示了 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">git add</code> 和 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">git commit</code> 的底层过程——<strong>add = hash-object + update-index</strong>，<strong>commit = write-tree + commit-tree + 更新 ref</strong>。理解了这个流程，就真正理解了 Git。</p>
        </aside>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-slate-200 mt-8">
      <RouterLink to="/TeamCollaboration/GitInternals" class="text-slate-400 hover:text-cyan-600 transition-colors cursor-default">← 已是第一篇</RouterLink>
      <RouterLink to="/TeamCollaboration/GitInternals/GitObjects" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">对象模型：blob / tree / commit / tag →</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: ".git 目录结构" },
  { id: "sec-2", name: "四种核心对象" },
  { id: "sec-3", name: "对象引用关系" },
  { id: "sec-4", name: "内容寻址" },
  { id: "sec-5", name: "设计哲学" },
  { id: "sec-6", name: "动手实验" },
]

const dirTreeCode = `.git/
├── HEAD                 → ref: refs/heads/main    （指向当前分支，是一个文本文件）
├── config               → 仓库级配置（git config 写入这里）
├── description          → 仓库描述（GitWeb 用，一般不用管）
│
├── objects/             → 🏛️ 对象数据库（Git 的核心存储）
│   ├── info/
│   ├── pack/            → 打包后的对象文件（.pack 数据 + .idx 索引）
│   ├── 00/ ~ ff/        → 松散对象（loose objects，按 hash 前两位分 256 个子目录）
│   │   └── a1b2c3d4...  → 每个文件 = 一个 zlib 压缩的 Git 对象
│
├── refs/                → 📌 引用（指针，内容是 commit hash）
│   ├── heads/           → 本地分支（main、feature/xxx 等）
│   │   └── main         → 内容是当前分支最新 commit 的 SHA-1
│   ├── tags/            → 标签引用（lightweight tag 就是这里的一个文件）
│   └── remotes/         → 远程分支引用（origin/main 等）
│       └── origin/
│           └── main     → 记录上次 fetch/push 时远程的 commit
│
├── index                → 📋 暂存区（二进制文件，git ls-files --stage 查看）
├── logs/                → 📝 reflog（记录 HEAD 和分支的移动历史，90天保留期）
│   ├── HEAD             → 记录 HEAD 的每一次移动（切换分支、reset 等）
│   └── refs/heads/main  → 记录 main 分支的每一次变动
│
├── hooks/               → 🪝 客户端钩子脚本（pre-commit、post-commit 等）
├── info/exclude         → 类似 .gitignore 但只在本仓库生效（不提交到版本库）
└── COMMIT_EDITMSG       → 上一次提交消息的草稿`

const blobDemo = `# 创建 blob 并查看
echo -n 'hello git' | git hash-object -w --stdin
# → a1b2c3d4e5f6...

git cat-file -t a1b2c3d   # → blob
git cat-file -p a1b2c3d   # → hello git
git cat-file -s a1b2c3d   # → 9（字节数）`

const treeDemo = `# 查看 HEAD 指向的 tree
git cat-file -p HEAD^{tree}
# 输出：
# 100644 blob a1b2c3...  README.md
# 100644 blob e4f5a6...  package.json
# 040000 tree 7b3a1c...  src/

# 递归列出整个目录树
git ls-tree -r HEAD`

const commitDemo = `# 查看 HEAD commit 的完整内容
git cat-file -p HEAD
# 输出：
# tree 4b825dc642cb6eb9a060e54bf91039f5b5b6e9e3
# parent 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
# author Jason <jason@example.com> 1717200000 +0800
# committer Jason <jason@example.com> 1717200000 +0800
#
# feat: add new feature

# 第一次 commit 没有 parent 字段`

const tagDemo = `# 创建 annotated tag（产生 tag 对象）
git tag -a v1.0 -m "正式发布 v1.0"

# 查看 tag 对象内容
git cat-file -p v1.0
# object a1b2c3d4e5...   ← 指向的 commit
# type commit
# tag v1.0
# tagger Jason <...> 1717200000 +0800

# lightweight tag 不是对象，只是 refs/tags/ 下的引用
git tag v1.0-lite        # 不产生新对象`

const refChain = `┌─────────────────────────────────────────────────────────┐
│                     refs/heads/main                      │
│                     (只是一个文本文件)                     │
└─────────────────────┬───────────────────────────────────┘
                      │ 内容是一个 SHA-1 hash
                      ▼
┌─────────────────────────────────────────────────────────┐
│  commit (对象)  SHA-1: abc123...                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ tree: def456...    → 指向根目录的 tree 对象        │   │
│  │ parent: 789012...  → 指向上一个 commit             │   │
│  │ author / committer / timestamp / message          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  tree (对象)  SHA-1: def456...                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 100644 blob  e4f5…  README.md     ← 普通文件     │   │
│  │ 100644 blob  8d0e…  hello.txt                    │   │
│  │ 040000 tree  7b3a…  src/          ← 子目录       │   │
│  └──────────────────────────────────────────────────┘   │
└──────────┬──────────────────────┬───────────────────────┘
           │                      │
           ▼                      ▼
   ┌──────────────┐      ┌──────────────┐
   │ blob (对象)   │      │ blob (对象)   │
   │ "Hello Git"  │      │ "# README"   │
   └──────────────┘      └──────────────┘`

const diyCommit = `# 步骤 1：创建 blob 对象（存储文件内容）
mkdir demo && cd demo && git init
echo 'Hello Git Internals!' | git hash-object -w --stdin
# → 8d0e4127e3b51ef5f2a7a9b6c3d4e5f6a7b8c9d0

# 步骤 2：将 blob 加入暂存区（update-index）
git update-index --add --cacheinfo 100644 \\
  8d0e4127e3b51ef5f2a7a9b6c3d4e5f6a7b8c9d0 hello.txt

# 步骤 3：将暂存区写入 tree 对象
git write-tree
# → 4b825dc642cb6eb9a060e54bf91039f5b5b6e9e3

# 步骤 4：创建 commit 对象
git commit-tree 4b825dc -m "First commit - manually built!"
# → 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b

# 步骤 5：让 refs/heads/main 指向这个 commit
echo "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b" > .git/refs/heads/main

# 完成！git log 就能看到记录了
git log --oneline`
</script>
