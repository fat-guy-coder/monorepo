<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">♻️ sync.Pool 对象复用</h1>
          <p class="text-sm text-slate-500 mt-1">临时对象池 — Get/Put 复用 · 无锁设计 · victim 缓存 · 适用场景与优缺点</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/concurrency/go-2-11-sync-pool.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Pool 的 Get / Put 循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Pool 复用以分配的对象：<strong>Get</strong> 取一个（池空则 New），用完 <strong>Reset 后 Put 归还</strong>。
          每个 <strong>Processor</strong>（GMP 调度模型的 P）有私有对象（无锁取），跨 Processor 走共享链表偷。GC 来时会<strong>先把主池转入 victim「缓刑一代」，再下一次 GC 才清空</strong>——所以对象不会瞬间消失。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 对象池 -->
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">sync.Pool（对象池）</text>
            <rect x="30" y="36" width="220" height="100" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="140" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">池（缓存的对象）</text>
            <!-- 池里的对象 -->
            <rect x="52" y="78" width="44" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="74" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">buf</text>
            <rect x="108" y="78" width="44" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="130" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">buf</text>
            <rect x="164" y="78" width="44" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="186" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">buf</text>

            <!-- Get 箭头 -->
            <line x1="250" y1="66" x2="360" y2="66" stroke="#4ade80" stroke-width="2.5" marker-end="url(#pl-arr)" />
            <text x="305" y="54" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">Get()</text>

            <!-- 使用对象 -->
            <rect x="365" y="40" width="160" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="445" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">使用对象</text>
            <text x="445" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">buf.WriteString(...)</text>

            <!-- Put 箭头（带回） -->
            <line x1="445" y1="100" x2="445" y2="130" stroke="#94a3b8" stroke-width="2.5" marker-end="url(#pl-arr)" />
            <text x="460" y="118" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">Reset + Put()</text>

            <!-- New 路径（池空时） -->
            <line x1="140" y1="136" x2="140" y2="175" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#pl-arr)" />
            <text x="160" y="160" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">池空 → New()</text>
            <rect x="60" y="180" width="160" height="24" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="140" y="192" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">New: func() any</text>

            <text x="360" y="150" font-size="12" font-family="monospace" fill="#0891b2">GC 来 → 主池转 victim（缓刑一代）→ 下轮 GC 才清</text>
            <text x="360" y="172" font-size="11" font-family="monospace" fill="#64748b">每 Processor 一个私有对象 · 跨 Processor 偷 · 全程无互斥锁</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Pool 的 Get→用→Reset→Put 循环，池空时走 New。GC 将主池移入 victim 缓刑一代，再下一次 GC 才真正清空——避免「池刚清空 → 瞬间大量 New」的分配尖峰</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么需要 Pool -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 Pool？— GC 是你付不起的账单
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Go 的 GC 很高效——但 GC 还是 GC。每次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">new(bytes.Buffer)</code> 都在堆上分配内存。用完丢弃→GC 扫描→发现没引用了→回收。如果一秒做 10 万次这个操作，GC 就得频繁跑——CPU 飙高、STW（Stop-The-World）也变多。<strong>Pool 让你把对象"还回去"而不是"扔掉"——下次直接复用，跳过 new + GC。</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>不 Pool 的生命周期：<code class="bg-slate-100 px-1 rounded font-mono text-xs">new</code> → 用 → 丢弃 → GC 扫描 → 回收 → 下次又 <code class="bg-slate-100 px-1 rounded font-mono text-xs">new</code>（无限循环）</li>
          <li>Pool 的生命周期：<code class="bg-slate-100 px-1 rounded font-mono text-xs">Get</code> → 用 → <code class="bg-slate-100 px-1 rounded font-mono text-xs">Reset + Put</code> → 下次 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Get</code> 复用同一个对象</li>
          <li>对象被<strong>重用</strong>的次数越多，堆分配和 GC 扫描的次数越少——这是 Pool 的全部意义</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：</strong>Pool ≈ <strong>共享单车</strong>——骑完还到桩上，下个人直接骑，不用造新车。≈ <strong>数据库连接池</strong>——拿连接→用→还，不新建不销毁。<strong>关键区别：</strong>某天 GC 来了（城管清场），池里的车<strong>不会立刻消失</strong>——先进「缓刑停车场」（victim）待一程，下轮 GC 才清走。Pool 不保证对象长期存活。</p>
        </aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="pool_basic.go" /></div>
      </section>

      <!-- 2. 怎么用 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          怎么用：New + Get + Put 的标准姿势
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          三步：<strong>① 声明 Pool（给 New 兜底）→ ② Get 取对象 → ③ 用完 Reset + Put 归还</strong>。
          Get 拿到的对象是<strong>「借」</strong>的——用完必须还，且还前要 Reset 清干净，否则下一位拿到脏数据。
        </p>
        <div class="mb-4"><Code language="go" :code="usageCode" title="pool_usage.go — 标准姿势" /></div>
        <div class="mb-4"><Code language="go" :code="dirtyCode" title="pool_dirty.go — 不 Reset 的后果" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>每次 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Get()</code> 后立刻 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">defer Put()</code>；Put 前一律 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Reset()</code>。把「取→还」做成一对，别拆开。</p>
        </aside>
      </section>

      <!-- 3. 底层原理 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          底层原理：全程无锁 + victim 两代缓存
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个冷知识：<strong>sync.Pool 里没有一把互斥锁</strong>——全靠「每 Processor 私有化 + 无锁双端队列 + 原子操作」实现高并发下的近似无锁。
        </p>
        <aside class="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-indigo-800"><strong>🧐 为什么叫 Pool，内部却按 Processor 分？</strong></p>
          <p class="text-sm text-indigo-800 leading-relaxed mt-1"><code class="bg-indigo-100 px-1 rounded text-xs font-mono">sync.Pool</code> 名字里的 P 是 <strong>Pool（池）</strong>——这是<strong>类型名</strong>；实现里则给<strong>每个 Processor（GMP 调度模型的 P，对应每个 CPU 核的运行单元）</strong>维护一个私有池来提速（见 <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-indigo-600 underline decoration-dotted underline-offset-2">go-2-1</RouterLink>）。</p>
          <p class="text-sm text-indigo-800 leading-relaxed mt-1">名字的 P 和实现的 P 是<strong>两个不同含义</strong>——本文正文一律写全名 <strong>Processor</strong>，避免混淆。</p>
        </aside>
        <div class="mb-4"><Code language="go" :code="internalsCode" title="pool_internals.go — 数据结构" /></div>
        <div class="mb-4"><Code language="go" :code="getFlowCode" title="Get 的完整优先级链" /></div>
        <div class="mb-4"><Code language="go" :code="victimCode" title="victim 缓存：GC 后的缓刑一代" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">设计</th><th class="px-4 py-2 border border-slate-200 font-semibold">解决什么问题</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">每 Processor 一个 poolLocal</td><td class="px-4 py-2 border">对象「就地取材」——本 Processor 自己 Get/Put 不碰任何共享状态</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">private 私有槽</td><td class="px-4 py-2 border">每个 Processor 一个专属对象位，命中即无锁返回，最快路径</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">shared poolChain 双端队列</td><td class="px-4 py-2 border">跨 Processor 可偷（work stealing）：借多还少时从别的 Processor 匀</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">pad [128]byte 防伪共享</td><td class="px-4 py-2 border">两个 Processor 的 poolLocal 若共享同一 CPU 缓存行，改一个会互相拖慢（false sharing）——用 pad 隔开</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">victim 缓刑一代</td><td class="px-4 py-2 border">GC 清池后瞬间的 New 尖峰：给对象多留一轮存活期</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么是「近似无锁」而不是真的零开销：</strong>private 命中 = 纯本地、零原子；走 shared 也只是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">atomic</code> 操作（CAS/指针交换），比互斥锁便宜一个数量级。极端并发下，锁是最大的性能杀手——Pool 的整个架构都在绕开它。</p>
        </aside>
      </section>

      <!-- 4. 适用场景 + 优缺点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          适用场景 + 优缺点
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <h4 class="font-semibold text-emerald-700 mb-1">✅ 适合 Pool</h4>
            <ul class="space-y-1 text-emerald-600">
              <li>· bytes.Buffer（fmt 内部就用 Pool）</li>
              <li>· JSON encoder/decoder</li>
              <li>· 网络读写缓冲区</li>
              <li>· 高频临时切片（make([]T,0,cap)）</li>
              <li>· protobuf 编解码、regexp 匹配缓冲区</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-3 border border-red-200">
            <h4 class="font-semibold text-red-700 mb-1">❌ 不适合 Pool</h4>
            <ul class="space-y-1 text-red-600">
              <li>· 数据库连接 / socket（有状态，GC 清池会丢连接——用连接池）</li>
              <li>· 长生命期对象（没必要复用）</li>
              <li>· 创建本身极便宜（过度优化）</li>
              <li>· 需要保证对象数量（GC 会清空）</li>
            </ul>
          </div>
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">优点</th><th class="px-4 py-2 border border-slate-200 font-semibold">缺点 / 代价</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">减少 GC 压力：复用代替 new，堆分配大幅下降</td><td class="px-4 py-2 border">对象随时可能被 GC 清走，<strong>不保证命中</strong>，不能当持久缓存</td></tr>
              <tr><td class="px-4 py-2 border">高并发几乎无锁（per-Processor 私有 + 原子操作）</td><td class="px-4 py-2 border">只适合<strong>无状态或可快速 Reset</strong> 的对象，否则脏数据</td></tr>
              <tr><td class="px-4 py-2 border">池空自动 New 兜底，调用方无感</td><td class="px-4 py-2 border">无法设置容量上限、无淘汰策略，行为有不确定性</td></tr>
              <tr><td class="px-4 py-2 border">标准库内置，零依赖</td><td class="px-4 py-2 border">难以测试池内状态；用错（漏 Reset）会藏 bug</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 什么时候值得加 Pool？</strong>① 对象分配是热点（pprof 里 allocation 排名靠前）② 对象创建成本不低（大 buffer、编解码器）③ 请求/任务短生命期。三条全中才值得；否则纯属过度优化，反而把代码搞复杂。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见错误与陷阱
        </h2>
        <ul class="space-y-2 text-sm text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>① Put 前必须 Reset</strong>——否则下次 Get 拿到脏数据（buffer 里有旧内容）。这是 Pool 最经典的 bug。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>② 不要把 Get 的对象存到别处长期持有</strong>——它是「借」的，别的 goroutine 可能随后 Put 后再 Get 到同一个对象并改写它。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>③ 不要在 New 里做昂贵操作</strong>——GC 清池后大量 goroutine 同时 Get，会同时触发多次 New，突然 CPU 飙升。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>④ 别用 Pool 存有状态资源</strong>（连接、文件句柄）——GC 一清，资源静默丢失，比不用的 bug 更隐蔽。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>⑤ 先 profile 再 Pool</strong>——跑个 pprof，确认 GC/分配确实是瓶颈了再加 Pool。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>sync.Pool ≈ 游戏里的<strong>粒子对象池</strong>（canvas 里频繁创建销毁粒子，池化复用避免 GC 停顿）。「漏 Reset」≈ 复用了带旧属性的粒子没清字段——画面里残留上一条轨迹。GC 压力这概念在 JS 也一样：大 canvas 应用减少分配 = 减少浏览器 GC 卡顿。</p>
        </aside>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Get→用→Reset→Put</strong>——标准四步，Put 前必须 Reset，否则脏数据</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>全程无互斥锁</strong>——每 Processor 私有槽 + 无锁双端队列 + 原子操作；跨 Processor 靠「偷」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>victim 两代缓存</strong>——GC 把主池移入 victim 缓刑一代，避免清池后的 New 尖峰</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>适用前提</strong>——无状态或可快速 Reset、高分配热点、短生命期；只适合缓存「已分配但暂闲」的对象</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>先 profile 再 Pool</strong>——不是所有场景都适合，别过早优化</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：竞态检测</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：errgroup →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么需要 Pool" },
  { id: "sec-2", name: "怎么用：标准姿势" },
  { id: "sec-3", name: "底层原理：无锁 + victim" },
  { id: "sec-4", name: "适用场景 + 优缺点" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "小结" },
]

const basicCode = `var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },  // 池空时才调用
}
// Get — 有则取，无则 New
buf := bufPool.Get().(*bytes.Buffer)
buf.WriteString("hello")
fmt.Println(buf.String())  // 输出: hello
// Put — 归还前必须 Reset！
buf.Reset()
bufPool.Put(buf)  // 下次 Get 复用这个 buffer，不 new

// 实战：标准库 fmt.Printf 内部
// 每次 fmt.Sprintf 从 Pool 取 buffer→写→Reset→Put。一亿次调用只 new 了几百个 buffer`

const usageCode = `// 标准姿势：取 → defer 还 → 用 → 还前 Reset
var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

func formatLog(level, msg string) string {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()          // ① 先清空残留内容
        bufPool.Put(buf)     // ② 再归还（defer：任何 return 都会还）
    }()

    buf.WriteString("[" + level + "] ")
    buf.WriteString(msg)
    return buf.String()      // ← String() 已拷贝出值，之后可以放心 Reset
}

// 多次 Get 不 Put 会怎样？——不会内存泄漏，只是少一次复用。
// Pool 也不保证你 Put 的对象还在：GC 随时可能清空池子。`

const dirtyCode = `// ❌ 不 Reset 的后果：拿到上次残留的脏数据
func bad() string {
    b := bufPool.Get().(*bytes.Buffer)
    b.WriteString("AAAA")    // 第一次用，写了 AAAA
    bufPool.Put(b)           // 没 Reset 就归还 ← 错误！

    b2 := bufPool.Get().(*bytes.Buffer) // 可能复用同一个对象
    b2.WriteString("BB")     // → 实际内容变成 "AAAABB"！
    return b2.String()       // 输出: AAAABB  ← 数据污染
}`

const internalsCode = `// Pool 内部（Go 1.13+）——全程无互斥锁，纯原子操作
type Pool struct {
    local     unsafe.Pointer // [GOMAXPROCS]poolLocal —— 每个 Processor 一份
    victim    unsafe.Pointer // 上一代池（GC 后的缓刑区）
    New       func() any     // 池空兜底，只在 Get 时调用
}
type poolLocal struct {
    private any        // P 专属槽：本 P Get/Put 无锁
    shared  poolChain  // 无锁双端队列：其他 Processor 可"偷"
    pad [128]byte      // 防 CPU 伪共享（false sharing）`

const getFlowCode = `// Get 的完整优先级链（无锁设计的关键）
func (p *Pool) Get() any {
    l := p.pin()                 // ① 拿到当前 Processor 的 poolLocal
    x := l.private               // ② 私有槽有 → 直接拿走（最快，纯本地）
    if x != nil { l.private = nil; return x }
    x, _ = l.shared.popHead()    // ③ 自己队列头（无锁原子）
    if x != nil { return x }
    return p.getSlow()           // ④ 见下：偷 + victim + New
}

// ④ getSlow 顺序：
//    a. 从其他 Processor 的 shared.popTail() —— 工作窃取（无锁原子）
//    b. 全偷不到 → 查上一代 victim：先自己 private，再 shared，再偷
//    c. 连 victim 也没有 → p.New() —— 此时才真正分配新内存

// Put 的顺序（对称）：
//   ① private 空 → 放入 private（下次自己 Get 直接命中）
//   ② 否则 pushHead 到自己的 shared（让别人也能偷）`

const victimCode = `// GC 到来时（STW 阶段），runtime 调用 poolCleanup：
//   ① 当前 local（主池）→ 整体移入 victim（缓刑一代）
//   ② victim（上一代）→ 彻底清空丢弃
// 所以 GC 一次，对象不会立刻消失，还能在 victim 里被复用一次。
// 下次 Get 先找主池、找不到再找 victim —— 避免 GC 后瞬间 New 的分配尖峰。

// 生命周期示意：
//   主池 ──GC 1──► victim ──GC 2──► 丢弃
//   （这两代之间，对象都还能被 Get 到）`
</script>
