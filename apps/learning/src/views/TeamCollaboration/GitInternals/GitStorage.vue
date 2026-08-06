<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 Git 存储与传输：packfile / GC / 协议</h1>
          <p class="text-sm text-slate-500 mt-1">松散对象如何被打包、增量压缩的算法原理、垃圾回收策略、以及 fetch/push 的底层传输协议</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/learning/src/views/TeamCollaboration/GitInternals/GitStorage.vue" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Git 底层</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 松散对象 vs 打包文件 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          松散对象 vs 打包文件
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Git 有两种对象存储方式：<strong>松散对象（loose objects）</strong>和<strong>打包文件（packfiles）</strong>。新建的对象先以松散格式存储（每个对象一个文件），当对象太多时 Git 自动（或手动 gc）把它们打包成一个 .pack 文件。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">松散对象</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">打包文件</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">存储位置</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.git/objects/XX/YYYY...</code></td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.git/objects/pack/pack-xxx.pack</code> + <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.idx</code></td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">存储方式</td><td class="px-4 py-2 border border-slate-200">每个对象一个文件，zlib 压缩</td><td class="px-4 py-2 border border-slate-200">多个对象打成一个文件，delta 增量压缩</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">压缩率</td><td class="px-4 py-2 border border-slate-200">低（仅 zlib）</td><td class="px-4 py-2 border border-slate-200">高（zlib + delta）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">读取速度</td><td class="px-4 py-2 border border-slate-200">快（直接读文件）</td><td class="px-4 py-2 border border-slate-200">需要解析 .idx 索引定位</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">产生时机</td><td class="px-4 py-2 border border-slate-200">每次 add/commit 新对象</td><td class="px-4 py-2 border border-slate-200">git gc / git repack / push 时自动打包</td></tr>
            </tbody>
          </table>
        </div>

        <Code language="bash" :code="looseVsPack" title="查看对象存储" />
      </section>

      <!-- 2. Delta 压缩 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Delta 增量压缩原理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Git 打包时会对相似的对象做<strong>delta 压缩</strong>——不存完整内容，只存与"基准对象"的差异。这类似视频编码中的关键帧（I-frame）和差异帧（P-frame）。
        </p>

        <Code language="text" :code="deltaPrinciple" title="Delta 压缩示意" />

        <h3 class="text-sm font-semibold text-slate-700 mt-4 mb-2">Git 的 Delta 选择策略</h3>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>按名称排序后找相邻文件</strong>——名字相似的文件往往内容也相似（如 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">App.vue</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">App.test.js</code>）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>按大小分组</strong>——大小相近的文件更可能相似</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>只对同类型对象做 delta</strong>——blob 对 blob，tree 对 tree。commit 通常很小，不做 delta</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>深度限制</strong>——delta 链最大深度 50，防止解压时递归过深</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>最近的版本作为 base</strong>——最新提交的完整对象优先保留为 base，旧版本存 delta。因为最新版本最常被访问。</span>
          </li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Delta 压缩就像 Docker 镜像的 <strong>layer 机制</strong>——基础镜像（base）存完整文件，后续层只存 diff。或者像 <strong>Webpack 的 code splitting</strong>——把变化的代码（delta）和不变的代码（vendor）分开打包，最大化缓存利用率。</p>
        </aside>
      </section>

      <!-- 3. packfile 结构 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          packfile 内部结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个 packfile 包含两个文件：<strong>.pack</strong>（数据文件）和 <strong>.idx</strong>（索引文件）。
        </p>

        <Code language="text" :code="packStructure" title="packfile 结构" />

        <Code language="bash" :code="packOps" title="查看 pack 内容" />
      </section>

      <!-- 4. GC 垃圾回收 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          git gc — 垃圾回收与自动优化
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">git gc</code> 会执行一系列优化操作，整理仓库存储：
        </p>

        <Code language="bash" :code="gcOps" title="GC 详解" />

        <div class="mt-4">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">GC 自动触发条件</h3>
          <ul class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-cyan-500 mt-1">▸</span>
              <span>松散对象超过 <strong>6700 个</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gc.auto</code>）</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-500 mt-1">▸</span>
              <span>pack 文件超过 <strong>50 个</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gc.autopacklimit</code>）</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-500 mt-1">▸</span>
              <span>某些命令（如 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git merge</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git pull</code>）后自动触发</span>
            </li>
          </ul>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>自动 GC 不会立即删除不可达对象——它们会保留至少 2 周（<code class="bg-amber-100 px-1 rounded text-xs font-mono">gc.pruneExpire</code>），reflog 记录保留 90 天。只有<strong>手动</strong>执行 <code class="bg-amber-100 px-1 rounded text-xs font-mono">git gc --prune=now</code> 才会立即清除。</p>
        </aside>
      </section>

      <!-- 5. 传输协议 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          传输协议：fetch/push 底层发生了什么
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Git 有两种传输协议：<strong>Smart HTTP</strong>（最常用）和 <strong>Dumb HTTP</strong>（静态文件服务）。SSH 协议底层也用类似的协商过程。
        </p>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">Smart HTTP 协议：fetch 全过程</h3>
        <Code language="text" :code="fetchProtocol" title="Git Fetch 协议交互" />

        <h3 class="text-sm font-semibold text-slate-700 mt-4 mb-2">push 的协商过程</h3>
        <Code language="text" :code="pushProtocol" title="Git Push 协议交互" />

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 "智能"在哪？</strong>Smart HTTP 协议的关键在于<strong>协商</strong>——客户端告诉服务端自己有哪些对象（have），服务端只需要发送客户端没有的对象（want）。这避免了传输整个仓库，只传增量数据。</p>
        </aside>
      </section>

      <!-- 6. 对象压缩策略 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Git 存储优化的完整清单
        </h2>

        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优化手段</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">触发方式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">效果</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">zlib 压缩</td><td class="px-4 py-2 border border-slate-200">每个对象存储时自动</td><td class="px-4 py-2 border border-slate-200">单个文件压缩率约 2-4x</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Delta 压缩</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git gc</code> / <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git repack</code></td><td class="px-4 py-2 border border-slate-200">相似文件间只存差异，压缩率可达 10-50x</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">打包（pack）</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git gc</code></td><td class="px-4 py-2 border border-slate-200">减少 inode 使用，降低文件系统开销</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Bitmap 索引</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git repack -adb</code></td><td class="px-4 py-2 border border-slate-200">加速服务器端 push/fetch 的对象可达性计算</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Commit Graph</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git commit-graph write</code></td><td class="px-4 py-2 border border-slate-200">加速 git log / merge-base 等遍历操作</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Shallow Clone</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git clone --depth 1</code></td><td class="px-4 py-2 border border-slate-200">只下载最新 commit，减少克隆时间</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">Partial Clone</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">git clone --filter=blob:none</code></td><td class="px-4 py-2 border border-slate-200">不下载 blob，按需从远程获取</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. 实战 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          实战：优化大型仓库
        </h2>
        <Code language="bash" :code="optimizeRepo" title="仓库优化实战" />

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 总结：</strong>Git 的存储系统设计精巧——从松散对象到 packfile 的自动演进、从 delta 压缩到 commit-graph 的多层优化，让 Git 在存储效率和访问速度之间取得了极佳的平衡。理解这些底层机制，就能在遇到"仓库太大""clone 太慢"等问题时知道如何诊断和优化。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-slate-200 mt-8">
      <RouterLink to="/TeamCollaboration/GitInternals/GitIndex" class="text-slate-500 hover:text-cyan-600 transition-colors">← 暂存区：.git/index 文件揭秘</RouterLink>
      <span class="text-slate-400">已是最后一篇 🎉</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "松散对象 vs 打包" },
  { id: "sec-2", name: "Delta 压缩原理" },
  { id: "sec-3", name: "packfile 结构" },
  { id: "sec-4", name: "GC 垃圾回收" },
  { id: "sec-5", name: "传输协议" },
  { id: "sec-6", name: "优化清单" },
  { id: "sec-7", name: "仓库优化实战" },
]

const looseVsPack = `# 查看各种对象数量
git count-objects -vH
# count: 123        ← 松散对象数量
# size: 456.00 KiB  ← 松散对象总大小
# in-pack: 2048     ← 打包文件中的对象数量
# packs: 3          ← 打包文件个数
# size-pack: 8.50 MiB

# 查看 pack 文件
ls -lh .git/objects/pack/
# pack-abc123.pack   ← 数据文件
# pack-abc123.idx    ← 索引文件（对象hash→pack内偏移）
# pack-abc123.rev    ← 反向索引

# 查看 pack 索引中的对象列表
git verify-pack -v .git/objects/pack/pack-*.idx | head -10
# a1b2c3... commit  234 56 1234
# （hash 类型 压缩后大小 压缩前大小 在pack中的偏移）`

const deltaPrinciple = `# Delta 压缩示意

# 文件 v1:
const greet = (name) => {
  console.log("Hello, " + name)
}

# 文件 v2（只增加了一行）:
const greet = (name) => {
  console.log("Hello, " + name)
  console.log("How are you?")
}

# Delta v1→v2 存储的可能是：
# COPY 0-60          （复制 v1 的 0-60 字节）
# INSERT "  console.log(\\"How are you?\\")\\n"
# （只存差异，大幅节省空间）`

const packStructure = `pack-xxx.pack（数据文件）
┌──────────────────────────┐
│ Pack Header              │
│  ├─ Signature: "PACK"    │
│  ├─ Version: 2/3         │
│  └─ Object count         │
├──────────────────────────┤
│ Object 1 (undeltified)   │  ← 完整对象（base）
│  ├─ Type + Size (变长)    │
│  └─ zlib 压缩的数据       │
├──────────────────────────┤
│ Object 2 (deltified)     │  ← 增量对象（delta）
│  ├─ Type: OBJ_REF_DELTA  │
│  ├─ Base object SHA-1    │  ← 基准对象
│  └─ zlib 压缩的 delta 指令│
├──────────────────────────┤
│ Object 3, 4, ...         │
├──────────────────────────┤
│ Pack Checksum (SHA-1)    │
└──────────────────────────┘

pack-xxx.idx（索引文件）
┌──────────────────────────┐
│ Fanout Table (256×4B)    │  ← 按 hash 首字节分桶
├──────────────────────────┤
│ Object List (sorted)     │  ← 按 hash 排序的对象列表
├──────────────────────────┤
│ CRC32 Table              │  ← 每个对象的 CRC32 校验
├──────────────────────────┤
│ Offset Table             │  ← 每个对象在 pack 中的偏移
└──────────────────────────┘`

const packOps = `# 查看 pack 文件详情
git verify-pack -v .git/objects/pack/pack-*.idx | sort -k3 -n | tail -10
# 各列含义：hash type size_in_pack size_unpacked offset
# 如果 type 后面有链式引用（如 abc123），说明它是 delta 对象

# 查看 .idx 索引文件内容
git show-index < .git/objects/pack/pack-*.idx | head

# 从 pack 中提取一个对象
git cat-file -p a1b2c3d   # Git 会自动在 loose 和 pack 中查找

# 强制重新打包（把所有松散对象打入 pack）
git repack -ad

# 打包时生成 bitmap 索引（服务端优化）
git repack -adb

# 查看 pack 文件统计
git count-objects -vH`

const gcOps = `# git gc 执行的操作（按顺序）：

# 1. 收集垃圾（git prune）
#    删除所有不可达且超过保留期的松散对象

# 2. 打包松散对象（git repack）
#    把 .git/objects/XX/ 下的松散对象打包进 .pack 文件

# 3. 合并 pack 文件
#    把多个小的 .pack 文件合并成一个大 pack

# 4. 清理 reflog 过期条目
git reflog expire --expire=90.days.ago --all

# 5. 生成 commit-graph（加速 log/blame/merge-base）
git commit-graph write --reachable

# ---- 手动 GC 命令 ----

# 标准 GC（安全，只清理过期对象）
git gc

# 激进 GC（更努力地压缩）
git gc --aggressive

# 立即清理（危险——会删除所有不可达对象，包括 reflog 里的）
git gc --prune=now

# 预估 GC 能节省多少空间
git gc --auto --dry-run

# 查看 GC 配置
git config --get gc.auto              # 松散对象阈值（默认 6700）
git config --get gc.autopacklimit     # pack 文件数阈值（默认 50）
git config --get gc.pruneExpire       # 不可达对象保留时间（默认 2.weeks.ago）
git config --get gc.reflogExpire      # reflog 保留时间（默认 90.days.ago）`

const fetchProtocol = `# git fetch 的 Smart HTTP 协议交互过程：

1. 客户端发起 GET /info/refs?service=git-upload-pack
   → 服务端返回所有引用的列表（refs + SHA-1 + capabilities）
   → 同时声明自己的 capabilities（支持哪些功能）

2. 客户端对比本地引用和远程引用
   → 确定自己缺少哪些对象（want）
   → 确定自己已有的公共对象（have）

3. 客户端 POST /git-upload-pack
   Body 包含协商数据：
     want <sha1> <capabilities>
     have <sha1>
     have <sha1>
     ...
     done

4. 服务端：
   → 解析 want/have 列表
   → 计算 want 对象与 have 对象的差异
   → 找出需要发送的最小对象集合 + delta 依赖
   → 构建一个 "thin pack"（可能包含对已有对象的 delta 引用）
   → 返回给客户端

5. 客户端接收 pack 数据
   → 解压对象
   → 解决 thin pack 中的外部引用
   → 更新 .git/refs/remotes/origin/*

# 这是为什么 fetch 比 clone 快很多——只传增量`

const pushProtocol = `# git push 的 Smart HTTP 协议交互过程：

1. 客户端发起 GET /info/refs?service=git-receive-pack
   → 服务端返回所有引用的列表
   → 声明 capabilities（report-status, delete-refs 等）

2. 客户端分析需要推送什么：
   → 找出远程没有的 commit 和对象
   → 构建 packfile

3. 客户端 POST /git-receive-pack
   Body: packfile + 更新指令列表：
     <old-oid> <new-oid> <ref-name>
     （如：0000... abc123 refs/heads/feature）
     （old-oid 为 0000... 表示新建分支）
     （new-oid 为 0000... 表示删除分支）

4. 服务端：
   → 接收 packfile
   → 验证每个 ref 更新是否允许（检查 fast-forward、hooks 等）
   → 更新 refs → 返回结果

5. 服务端返回 report-status：
     ok refs/heads/main
     ng refs/heads/main non-fast-forward

# 服务端 Hook 在步骤 4 中执行：pre-receive → update → post-receive`

const optimizeRepo = `# 诊断仓库大小问题
du -sh .git/            # 仓库总大小
git count-objects -vH   # 对象统计
du -sh .git/objects/pack/  # pack 大小

# 找出最大的对象（可能是误提交的大文件）
git rev-list --objects --all | \\
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \\
  awk '$1 == "blob" {print $3, $4}' | \\
  sort -rn | head -20

# 完整优化流程
git reflog expire --expire=now --all   # 清除过期 reflog
git gc --aggressive --prune=now         # 激进 GC
git repack -adb                         # 重新打包 + bitmap 索引
git commit-graph write --reachable     # 生成 commit-graph
git prune-packed                        # 删除已被打包的松散对象

# 再看一下效果
du -sh .git/
git count-objects -vH

# ---- 对于超大仓库的更多优化 ----

# Shallow clone（只克隆最近 N 个 commit）
git clone --depth 1 <url>

# Partial clone（不下载 blob，按需获取）
git clone --filter=blob:none <url>

# 之后可以按需 fetch 完整历史
git fetch --unshallow    # 恢复完整仓库

# 清理大文件（如果已经提交了不该提交的大文件）
git filter-branch --force --index-filter \\
  'git rm --cached --ignore-unmatch bigfile.zip' \\
  --prune-empty --tag-name-filter cat -- --all`
</script>
