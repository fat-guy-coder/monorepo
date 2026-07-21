<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🧩 WaitGroup / Once / Cond</h1><p class="text-sm text-slate-500 mt-1">goroutine 同步三件套 — 等待组 · 单次执行 · 条件变量</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-6-sync-wg-once.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>sync.WaitGroup — 等待一组 goroutine</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">WaitGroup 内部是一个<strong>计数信号量</strong>——一个 int64 计数器 + sema 信号量。Add 增加计数，Done 减少计数（Add(-1)），Wait 阻塞直到计数归零。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>WaitGroup ≈ <strong>Promise.all()</strong>——等所有任务完成再继续。Add 在 goroutine 外，Done 在 goroutine 内（defer 保证执行）。</p></aside>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Add 必须在 goroutine 外调用</strong>——否则可能 Wait 在 Add 之前返回（计数已归零）。<strong>WaitGroup 不可复制</strong>——传参用指针。Done = Add(-1)。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>sync.Once — 并发安全的单次执行</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Once 保证某个函数<strong>全局只执行一次</strong>，即使被多个 goroutine 同时调用。内部用<strong>Mutex + atomic 标志位</strong>实现——第一个调用者执行函数，其余阻塞等待。典型用途：单例初始化（DB 连接、配置加载）。</p>
        <div class="mb-4"><Code language="go" :code="onceCode" title="once.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>sync.Cond — 条件变量</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">让 goroutine<strong>等待某个条件满足</strong>。Wait 自动释放锁并阻塞，Signal/Broadcast 唤醒等待者。<strong>大多数场景用 channel 更简洁</strong>，Cond 用于需要锁保护的复杂条件。</p>
        <div class="mb-4"><Code language="go" :code="condCode" title="cond.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 Wait 必须用 for 而非 if！</strong>被唤醒时条件可能又不满足了（虚假唤醒），所以必须用 for 重新检查。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WaitGroup</strong> = 计数信号量。Add 在外面，Done 在 defer。不可复制</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Once</strong> = 并发安全单例（Mutex+atomic）。Do 中的函数 panic 不会重试——Once 认为已完成</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Cond</strong> = 条件变量。Wait 必须 for 循环。多数场景用 channel 替代更简洁</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Mutex</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Atomic →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"WaitGroup"},{id:"sec-2",name:"sync.Once"},{id:"sec-3",name:"sync.Cond"},{id:"sec-4",name:"小结"}]
const wgCode = `var wg sync.WaitGroup
for i := 1; i <= 5; i++ {
    wg.Add(1)  // ⚠️ 必须在 goroutine 外 Add
    go func(id int) {
        defer wg.Done()  // defer 保证一定执行（等价 Add(-1)）
        fmt.Printf("worker %d done\\n", id)
    }(i)  // 传参——避免闭包陷阱
}
wg.Wait()  // 阻塞直到计数器归零
fmt.Println("all done")
// 输出: worker N done (x5, 顺序随机), all done`
const onceCode = `var once sync.Once
var instance *DB

func GetDB() *DB {
    once.Do(func() {     // 并发安全——多 goroutine 同时调用也只执行一次
        instance = connectDB(dsn)
        fmt.Println("DB 连接已建立（只打印一次）")
    })
    return instance
}
// ⚠️ 如果 Do 中的函数 panic，Once 认为已完成——不会重试！
// 需要重试的场景：在 Do 内部 recover 并重试`
const condCode = `var mu sync.Mutex
cond := sync.NewCond(&mu)
ready := false

// 消费者——等待条件满足
go func() {
    mu.Lock()
    for !ready { cond.Wait() }  // ⚠️ 必须用 for 而非 if！防虚假唤醒
    fmt.Println("consumer: ready!")
    mu.Unlock()
}()

// 生产者——改变条件并通知
time.Sleep(time.Second)
mu.Lock(); ready = true; mu.Unlock()
cond.Signal()  // 唤醒一个等待者
// cond.Broadcast()  // 唤醒所有等待者
// 输出: consumer: ready!`
</script>
