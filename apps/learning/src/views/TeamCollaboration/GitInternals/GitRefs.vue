<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📌 Git 引用系统：HEAD / 分支 / 标签 / reflog</h1>
          <p class="text-sm text-slate-500 mt-1">理解 Git 的"指针"机制——引用是 Git 导航历史的核心，分支本质上只是可移动的指针</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/TeamCollaboration/GitInternals/GitRefs.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Git 底层</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是引用 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是引用（Ref）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          引用（reference）就是<strong>一个存了 SHA-1 哈希值的文本文件</strong>。它不存储数据，只是指向某个 Git 对象的"指针"。Git 中的分支、标签、HEAD 本质上都是引用。
        </p>

        <Code language="bash" :code="refBasics" title="引用的本质" />

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Git 的引用就像 <strong>JavaScript 的变量</strong>——变量本身不存数据，只存一个指向内存中对象的引用（指针）。<code class="bg-purple-100 px-1 rounded text-xs font-mono">const main = "abc123"</code>，修改分支就是修改变量的值。</p>
        </aside>
      </section>

      <!-- 2. HEAD -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          HEAD — 你"现在"在哪
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          HEAD 是一个<strong>符号引用（symbolic ref）</strong>——它不直接指向 commit，而是指向<strong>另一个引用</strong>（通常是当前分支）。Git 通过 HEAD 知道你现在在哪个分支上。
        </p>

        <Code language="bash" :code="headOps" title="HEAD 的操作" />

        <div class="overflow-x-auto mt-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">状态</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">HEAD 的内容</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">在分支上</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ref: refs/heads/main</code></td><td class="px-4 py-2 border border-slate-200">正常情况，HEAD 指向分支引用</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Detached HEAD</td><td class="px-4 py-2 border border-slate-200">直接是一个 commit SHA-1</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git checkout abc1234</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git checkout v1.0</code>（tag）后</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Detached HEAD 的陷阱：</strong>在 detached HEAD 状态下做的 commit，没有分支引用指向它们。如果你切换回分支，这些 commit 会变成"悬空对象"，若干天后被 gc 清理。解决：<code class="bg-amber-100 px-1 rounded text-xs font-mono">git checkout -b new-branch</code> 给它们一个名字。</p>
        </aside>
      </section>

      <!-- 3. 分支 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          分支 — 可移动的指针
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Git 的分支<strong>极其轻量</strong>——它只是一个指向某个 commit 的引用文件。创建分支就是写一个 40 字节的文件，删除分支就是删掉这个文件。这就是为什么 Git 鼓励频繁创建和合并分支。
        </p>

        <Code language="bash" :code="branchOps" title="分支的本质" />

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 分支名可以包含路径：</strong>你可以创建 <code class="bg-blue-100 px-1 rounded text-xs font-mono">feature/login</code> 这样的分支，Git 会创建 <code class="bg-blue-100 px-1 rounded text-xs font-mono">.git/refs/heads/feature/login</code> 文件。这也是为什么不能同时有分支叫 <code class="bg-blue-100 px-1 rounded text-xs font-mono">feature</code> 和 <code class="bg-blue-100 px-1 rounded text-xs font-mono">feature/login</code>——文件系统冲突。</p>
        </aside>
      </section>

      <!-- 4. 标签引用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          标签引用 — 不会移动的指针
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          标签（tag）引用存放在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git/refs/tags/</code> 下。与分支不同，标签<strong>不会在提交时自动移动</strong>——它永远是创建时的那个 commit，用于标记重要版本。
        </p>

        <Code language="bash" :code="tagRefs" title="标签引用解析" />

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          分支（branch）像 <strong>let 变量</strong>——可以重新赋值指向新的 commit。标签（tag）像 <strong>const 变量</strong>——创建后就不再改变。Annotated tag 像带 JSDoc 注释的 const，记录了元数据。</p>
        </aside>
      </section>

      <!-- 5. 远程引用 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          远程引用 — 远程仓库的"书签"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          远程引用存储在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git/refs/remotes/origin/</code> 下，它们是<strong>上次与远程通信时</strong>远程分支状态的快照。Git 通过对比本地引用和远程引用来判断 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ahead/behind</code>。
        </p>

        <Code language="bash" :code="remoteRefs" title="远程引用详解" />
      </section>

      <!-- 6. packed-refs -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          packed-refs — 引用太多怎么办
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当仓库有大量引用（比如几千个 tag），每个引用一个文件效率很低。Git 会把这些引用打包到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.git/packed-refs</code> 这一个文件中。
        </p>

        <Code language="bash" :code="packedRefs" title="packed-refs" />

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 查找优先级：</strong>Git 先查 <code class="bg-blue-100 px-1 rounded text-xs font-mono">.git/refs/</code> 下的松散引用，找不到再查 <code class="bg-blue-100 px-1 rounded text-xs font-mono">.git/packed-refs</code>。松散引用优先级更高——这允许你"覆盖"打包引用。</p>
        </aside>
      </section>

      <!-- 7. reflog -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          reflog — 引用的"操作日志"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          reflog（reference log）记录了一个引用<strong>每次变化的完整历史</strong>——谁、什么时候、把它从哪个 commit 移到了哪个 commit。它是 Git 的"后悔药"，让你在误操作后找回"丢失"的提交。
        </p>

        <Code language="bash" :code="reflogOps" title="reflog 详解" />

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>只要 commit 过，reflog 里就有记录。即使你 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">reset --hard</code>、<code class="bg-emerald-100 px-1 rounded text-xs font-mono">rebase</code> 失败、甚至删了分支，reflog 都能帮你找回来——前提是没超过 90 天。</p>
        </aside>
      </section>

      <!-- 8. 引用规格 refspec -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          refspec — 引用映射规则
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          refspec 定义了本地引用和远程引用之间的<strong>映射关系</strong>。每次 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git push/pull</code> 都在使用 refspec。
        </p>

        <Code language="bash" :code="refspecOps" title="refspec 格式" />
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-slate-200 mt-8">
      <RouterLink to="/TeamCollaboration/GitInternals/GitObjects" class="text-slate-500 hover:text-cyan-600 transition-colors">← 对象模型：blob / tree / commit / tag</RouterLink>
      <RouterLink to="/TeamCollaboration/GitInternals/GitIndex" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">暂存区：.git/index 文件揭秘 →</RouterLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "什么是引用" },
  { id: "sec-2", name: "HEAD" },
  { id: "sec-3", name: "分支" },
  { id: "sec-4", name: "标签引用" },
  { id: "sec-5", name: "远程引用" },
  { id: "sec-6", name: "packed-refs" },
  { id: "sec-7", name: "reflog" },
  { id: "sec-8", name: "refspec" },
]

const refBasics = `# 引用的本质——每个引用就是一个存了 SHA-1 的文本文件
cat .git/refs/heads/main
# → a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0（40 字符的 SHA-1）

# 用 git 命令查看引用指向的对象
git rev-parse main
# → a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0

# 引用是间接的——ref → commit → tree → blob
git rev-parse main^{commit}    # commit 指向的 commit（如果 main 是 tag 就解析 tag）
git rev-parse main^{tree}      # commit 指向的 tree
git rev-parse main^{}           # 递归解引用到非 tag 对象`

const headOps = `# HEAD 文件的内容
cat .git/HEAD
# → ref: refs/heads/main    （在 main 分支上）

# 切换分支后
git checkout feature
cat .git/HEAD
# → ref: refs/heads/feature

# Detached HEAD（直接 checkout 一个 commit）
git checkout abc1234
cat .git/HEAD
# → abc1234...    （直接是 commit hash，不再指向分支）

# 查看 HEAD 最终指向的 commit
git rev-parse HEAD

# 查看 HEAD 指向的引用名（如果是 symbolic ref）
git symbolic-ref HEAD
# → refs/heads/main

# 修改 HEAD（等同于切换分支）
git symbolic-ref HEAD refs/heads/feature`

const branchOps = `# 创建分支 = 写一个 40 字节的文件
git branch feature
# 等价于：
echo "abc123..." > .git/refs/heads/feature

# 删除分支 = 删掉那个文件
git branch -d feature
# 等价于：
rm .git/refs/heads/feature

# 分支在 commit 时自动"移动"
# 每次 git commit，Git 会：
# 1. 创建新 commit 对象（parent = HEAD 指向的 commit）
# 2. 把 HEAD 指向的分支引用更新为新 commit 的 SHA-1

# 查看分支指向哪个 commit
git rev-parse main

# 查看所有本地分支的引用
ls .git/refs/heads/

# 有路径的分支
git branch feature/login
ls .git/refs/heads/feature/
# → login  （一个文件，内容是 commit SHA-1）`

const tagRefs = `# lightweight tag 就是 refs/tags/ 下的一个文件
git tag v1.0-lite
cat .git/refs/tags/v1.0-lite
# → a1b2c3d4e5...

# annotated tag — 引用指向 tag 对象，tag 对象指向 commit
git tag -a v1.0 -m "release"
cat .git/refs/tags/v1.0
# → b2c3d4e5f6...    （这是 tag 对象的 hash，不是 commit！）

cat .git/refs/tags/v1.0 | git cat-file -t
# → tag

cat .git/refs/tags/v1.0 | git cat-file -p
# object a1b2c3d4...    ← 这才是指向的 commit
# type commit
# tag v1.0`

const remoteRefs = `# 远程引用：记录上次和远程通信时的远程状态
cat .git/refs/remotes/origin/main
# → def456...

# fetch 更新远程引用
git fetch origin
# 更新了 .git/refs/remotes/origin/*

# 查看本地分支与远程的差异
git rev-list --count main..origin/main    # 远程比本地多几个 commit
git rev-list --count origin/main..main    # 本地比远程多几个 commit

# git status 显示的 ahead/behind 就是对比这些引用`

const packedRefs = `# 查看 packed-refs
cat .git/packed-refs
# # pack-refs with: peeled fully-peeled sorted
# a1b2c3d4e5... refs/heads/main
# b2c3d4e5f6... refs/tags/v1.0
# ^c3d4e5f6a7...           ← peeled：tag 最终指向的 commit

# 打包引用
git pack-refs --all

# 此时 .git/refs/ 下的大部分引用被清空，合并到 packed-refs
# 查询时 Git 先查松散引用，再查 packed-refs`

const reflogOps = `# 查看 HEAD 的移动历史（每次 checkout/reset/commit 都有一条记录）
git reflog
# abc1234 HEAD@{0}: commit: feat: add login
# def5678 HEAD@{1}: checkout: moving from feature to main
# 7890abc HEAD@{2}: reset: moving to HEAD~1

# 查看特定分支的 reflog
git reflog show main

# 用 reflog 引用恢复"丢失"的 commit
git reflog                     # 找到想要恢复的 HEAD@{n}
git checkout -b recovered HEAD@{2}

# reflog 有时效性
git reflog expire --expire=90.days.ago --all   # 清除 90 天前的记录
git gc --prune=now                             # 然后 gc 才能真正删除对象

# 查看 reflog 底层存储
cat .git/logs/HEAD
cat .git/logs/refs/heads/main`

const refspecOps = `# refspec 格式：+<src>:<dst>
# + 表示允许非快进推送

# 默认 push 的 refspec
git push origin main
# 实际执行：
# git push origin refs/heads/main:refs/heads/main

# 查看远程的 refspec 配置
git remote show origin

# 自定义 push 映射（本地 feature 推送到远程 feature/jason）
git push origin feature:feature/jason

# 删除远程分支（推送"空"到远程引用）
git push origin :old-branch
# 等同于
git push origin --delete old-branch

# 查看 .git/config 中的 refspec
cat .git/config | grep -A 5 'remote "origin"'`
</script>
