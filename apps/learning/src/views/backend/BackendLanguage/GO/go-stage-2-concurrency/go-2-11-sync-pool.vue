<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">♻️ sync.Pool 对象复用</h1><p class="text-sm text-slate-500 mt-1">临时对象池 — 减轻 GC 压力，复用以分配的对象</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-11-sync-pool.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>sync.Pool — 复用对象，减轻 GC</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">高频创建和销毁对象会产生大量<strong>GC 压力</strong>——每次分配→GC 扫描→回收。Pool 缓存已分配的对象：<strong>Get</strong> 取一个（没有则 New），用完 <strong>Put</strong> 归还。对象在<strong>两次 GC 之间</strong>存活——每次 GC 会清空 Pool 中未被引用的对象。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 类比：</strong>Pool ≈ <strong>对象池/连接池</strong>——复用而非每次 new。≈ JS <strong>ArrayBuffer pool</strong>——预分配一块内存反复用。<strong>关键区别：</strong>Pool 中的对象随时会被 GC 清空——不能当持久缓存。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="pool_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Pool 的内部机制：每个 P 都有自己的私有池</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Pool 内部为<strong>每个 P 维护一个私有对象 + 共享链表</strong>。Get 时先取 P 的私有对象（无锁），没有则从共享链表偷（类似 GMP 工作窃取），再没有才调用 New。Put 时优先放回私有槽位。这个设计保证了<strong>高并发下几乎无锁</strong>。</p>
        <div class="mb-4"><Code language="go" :code="internalsCode" title="pool_internals.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>典型场景与陷阱</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200"><h4 class="font-semibold text-emerald-700 mb-1">✅ 适合用 Pool</h4><ul class="space-y-1 text-emerald-600"><li>· 高频创建/销毁的临时对象（bytes.Buffer）</li><li>· JSON encoder/decoder 复用</li><li>· 网络缓冲区</li><li>· <code class="bg-emerald-100 px-1 rounded text-xs">fmt.Printf</code> 内部就用 Pool</li></ul></div>
          <div class="bg-red-50 rounded-xl p-3 border border-red-200"><h4 class="font-semibold text-red-700 mb-1">❌ 不适合 Pool</h4><ul class="space-y-1 text-red-600"><li>· 需要持久缓存（GC 会清空）</li><li>· 有状态对象→Put 前必须<strong>重置</strong></li><li>· 生命周期长的对象（没必要）</li><li>· 对象创建本身很便宜（过度优化）</li></ul></div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 核心陷阱：</strong>① Put 前必须 Reset——否则下次 Get 拿到<strong>脏数据</strong>。② Pool 不保证对象存活——GC 时会被清空。③ 不要在 New 里做昂贵的操作——它可能被频繁调用。④ <strong>先 profile，再 Pool</strong>——不是所有场景 Pool 都有益。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Get→用→Reset→Put</strong>——标准四步流程，Put 前必须重置</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每 P 私有缓存</strong>——无锁取私有对象，空时从共享偷</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GC 会清空 Pool</strong>——不保证对象存活，不能做持久缓存</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>先 profile 再 Pool</strong>——不要过早优化</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：竞态检测</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：errgroup →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Pool 基础"},{id:"sec-2",name:"内部机制"},{id:"sec-3",name:"场景与陷阱"},{id:"sec-4",name:"小结"}]
const basicCode = `var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },  // 池空时调用
}

// Get — 从池中取（无则 New）
buf := bufPool.Get().(*bytes.Buffer)
buf.WriteString("hello")
fmt.Println(buf.String())  // 输出: hello

// Put — 归还前必须 Reset！
buf.Reset()
bufPool.Put(buf)

// 实战：JSON encoder 复用（标准库也这样做）
var encoderPool = sync.Pool{
    New: func() any { return json.NewEncoder(nil) },
}
enc := encoderPool.Get().(*json.Encoder)
// ... 使用 ...
encoderPool.Put(enc)`
const internalsCode = `// Pool 内部结构（简化版）
type Pool struct {
    noCopy   noCopy         // go vet 检测不可复制
    local    unsafe.Pointer // 指向 [P]poolLocal 数组，每个 P 一个
    localSize uintptr       // local 数组大小（等于 GOMAXPROCS）
    New      func() any     // 用户提供的构造函数
}
type poolLocal struct {
    private any        // P 私有的单个对象（无锁取）
    shared  poolChain  // 共享双向链表——其他 P 可以偷
}

// Get 过程:
// ① 取 private（当前 P 私有，无锁）→ 有则返回
// ② 从 shared 链表头取（无锁）→ 有则返回
// ③ 从其他 P 的 shared 链表尾偷（工作窃取）
// ④ 都没有 → 调用 New()
// ⑤ ②③④ 获取的对象先存 private（下次 Get 不用再偷）
`
</script>
