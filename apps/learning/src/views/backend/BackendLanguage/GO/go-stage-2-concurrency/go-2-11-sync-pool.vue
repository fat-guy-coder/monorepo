<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">♻️ sync.Pool 对象复用</h1><p class="text-sm text-slate-500 mt-1">临时对象池 — 高并发下减少 GC 压力的利器，一句话：用完别扔，还给池子下次用</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-11-sync-pool.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Pool 的 Get / Put 循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Pool 复用以分配的对象：<strong>Get</strong> 取一个（池空则 New），用完 <strong>Reset 后 Put 归还</strong>。
          每个 P 有私有对象（无锁取），跨 P 走共享链表偷。GC 来时会清空整个池——所以 Pool 只是 GC 之前的"暂存区"。
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

            <text x="360" y="150" font-size="12" font-family="monospace" fill="#0891b2">GC 来 → 池全清空 → 下次 Get 走 New</text>
            <text x="360" y="172" font-size="11" font-family="monospace" fill="#64748b">每 P 一个私有对象（无锁）→ 共享链表（跨 P 偷）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Pool 的 Get→用→Reset→Put 循环，池空时走 New。GC 清空池，Pool 只是"暂存区"而非持久缓存</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么需要 Pool？— GC 是你付不起的账单</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 的 GC 很高效——但 GC 还是 GC。每次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">new(bytes.Buffer)</code> 都在堆上分配内存。用完丢弃→GC 扫描→发现没引用了→回收。如果一秒做 10 万次这个操作，GC 就得频繁跑——CPU 飙高、STW（Stop-The-World）也变多。<strong>Pool 让你把对象"还回去"而不是"扔掉"——下次直接复用，跳过 new + GC。</strong></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 类比：</strong>Pool ≈ <strong>共享单车</strong>——骑完还到桩上，下个人直接骑，不用造新车。≈ <strong>数据库连接池</strong>——拿连接→用→还，不新建不销毁。<strong>关键区别：</strong>某天 GC 来了（城管清场），池里的车全部清走——下次再 New。Pool 不保证对象存活。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="pool_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Pool 内部机制 — 为什么高并发下几乎无锁？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Pool 为<strong>每个 P 维护一个私有对象 + 共享链表</strong>。Get 时的优先级：①拿 P 的私有对象（无锁！）→ ②从 P 自己的共享链表头取（无锁！）→ ③从<strong>其他 P</strong> 的共享链表尾偷（类似 GMP 工作窃取）→ ④都没有才 New。Put 优先放回私有槽——下次自己 Get 又是无锁的。只有跨 P 窃取才需要一点点锁——绝大多数操作无锁！</p>
        <div class="mb-4"><Code language="go" :code="internalsCode" title="pool_internals.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>典型场景 + 四大陷阱</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200"><h4 class="font-semibold text-emerald-700 mb-1">✅ 适合 Pool</h4><ul class="space-y-1 text-emerald-600"><li>· bytes.Buffer（fmt 内部就用 Pool）</li><li>· JSON encoder/decoder</li><li>· 网络读写缓冲区</li><li>· 高频临时切片（make([]T,0,cap)）</li></ul></div>
          <div class="bg-red-50 rounded-xl p-3 border border-red-200"><h4 class="font-semibold text-red-700 mb-1">❌ 不适合 Pool</h4><ul class="space-y-1 text-red-600"><li>· 数据库连接（有状态——用连接池）</li><li>· 长生命期对象（没必要）</li><li>· 创建本身极便宜（过度优化）</li><li>· 需要保证对象数量（GC 会清空）</li></ul></div>
        </div>
        <h4 class="font-semibold text-slate-700 mb-2">四大陷阱</h4>
        <ul class="space-y-2 text-sm text-slate-600 mb-3"><li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>① Put 前必须 Reset</strong>——否则下次 Get 拿到脏数据（buffer 里有旧内容）。</span></li><li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>② GC 会清空 Pool</strong>——不要把 Pool 当缓存用。Pool 只是 GC 之前的"暂存区"。</span></li><li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>③ 不要在 New 里做昂贵操作</strong>——可能在 GC 后被大量调用，突然 CPU 飙升。</span></li><li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>④ 先 profile 再 Pool</strong>——跑个 pprof，确认 GC 确实是瓶颈了再加 Pool。</span></li></ul>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Get→用→Reset→Put</strong>——标准四步，Put 前必须 Reset</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每 P 私有缓存</strong>——无锁取私有，跨 P 窃取。GC 来全清空</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>先 profile 再 Pool</strong>——不是所有场景都适合，别过早优化</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：竞态检测</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：errgroup →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"为什么需要Pool"},{id:"sec-2",name:"内部机制"},{id:"sec-3",name:"场景+陷阱"},{id:"sec-4",name:"小结"}]
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
const internalsCode = `// Pool 内部分层——每一层尽量无锁
type Pool struct {
    local    unsafe.Pointer // [GOMAXPROCS]poolLocal，每个 P 一个
    New      func() any
}
type poolLocal struct {
    private any        // P 专属（无锁 Get/Put）
    shared  poolChain  // 双向链表——其他 P 可以"偷"
}
// Get 的优先级链：
// ① private → 有：直接返回（无锁！最快！）
// ② shared 头 → 有：返回；无：去偷
// ③ 从其他 P 的 shared 尾偷（工作窃取）
// ④ New()（最后手段——要分配内存了）
// ⑤ ②③④ 获取的先放到 private（下次 Get 直接命中 ①）`
</script>
