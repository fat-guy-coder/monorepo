<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">WaitGroup / Once / Cond</h1><p class="text-sm text-slate-500 mt-1">等待组 · 单次执行 · 条件变量——goroutine 协调三件套</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-6-sync-wg-once.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⏳</span>WaitGroup——等待一组 goroutine</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>WaitGroup ≈ <strong>Promise.all()</strong>——等所有 goroutine 完成后再继续。≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">await Promise.all([task1(), task2(), task3()])</code>。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">WaitGroup 是一个<strong>计数信号量</strong>：Add(n) 计数 +n，Done() 计数 -1，Wait() 阻塞直到计数归零。</p>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>1) Add 放在 goroutine 内部——可能 Wait 先于 Add 执行（计数为 0 直接通过）。<strong>Add 必须在 goroutine 启动前调用。</strong>2) 传 WaitGroup 必须用<strong>指针</strong>——值拷贝会导致计数不同步。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>实战：并发 HTTP 请求</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">WaitGroup 最经典的场景——并发请求多个 API，汇总结果：</p>
        <div class="mb-4"><Code language="go" :code="httpCode" title="concurrent_http.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>sync.Once——只执行一次</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">保证函数<strong>在整个程序生命周期中只执行一次</strong>——即使多个 goroutine 同时调用。≈ <strong>JS 的单例模式 + 线程安全版</strong>。最常用于<strong>懒加载单例</strong>。</p>
        <div class="mb-4"><Code language="go" :code="onceCode" title="sync_once.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 Once 和 init() 的区别：</strong>init() 在包加载时执行（程序启动前），Once 在第一次调用时执行（懒加载）。如果需要按需初始化，用 Once；如果启动时必须初始化，用 init。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>sync.Cond——条件变量</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">让 goroutine <strong>等待某个条件满足后再继续</strong>。≈ <strong>JS 的 Event 等待</strong>（但 goroutine 会休眠而不是轮询）。生产者-消费者、资源池等场景使用。</p>
        <div class="mb-4"><Code language="go" :code="condCode" title="sync_cond.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WaitGroup ≈ Promise.all()</strong>——等所有 goroutine 完成。Add 必须在 goroutine 外调用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Once = 线程安全的单次执行</strong>——常用于懒加载单例。和 init() 互补</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Cond = goroutine 等待条件满足——生产者-消费者场景</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Mutex</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：原子操作 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"WaitGroup"},{id:"sec-2",name:"并发HTTP"},{id:"sec-3",name:"sync.Once"},{id:"sec-4",name:"sync.Cond"},{id:"sec-5",name:"小结"}]
const wgCode = `var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)              // ⚠️ 必须在 goroutine 外 Add！
    go func(n int) {
        defer wg.Done()    // defer 确保 Done 一定执行
        fmt.Println(n)
    }(i)                    // 传参复制——避免闭包陷阱
}
wg.Wait()                  // 阻塞直到所有 goroutine Done
fmt.Println("all done")`
const httpCode = `func fetchAll(urls []string) ([]string, error) {
    var wg sync.WaitGroup
    results := make([]string, len(urls))
    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()
            resp, err := http.Get(u)
            if err != nil { return }
            defer resp.Body.Close()
            body, _ := io.ReadAll(resp.Body)
            results[idx] = string(body)
        }(i, url)
    }
    wg.Wait()
    return results, nil
}`
const onceCode = `var (
    once    sync.Once
    instance *Database
)
func GetDB() *Database {
    once.Do(func() {         // 只执行一次——线程安全
        instance = &Database{conn: connect()}
    })
    return instance
}
// 多个 goroutine 同时调 GetDB——Do 只执行一次`
const condCode = `var mu sync.Mutex
cond := sync.NewCond(&mu)
ready := false
// 等待者
go func() {
    mu.Lock()
    for !ready { cond.Wait() }  // Wait 自动释放锁，被唤醒后重新获取
    mu.Unlock()
}()
// 通知者
mu.Lock(); ready = true; mu.Unlock()
cond.Broadcast()  // 唤醒所有等待者（Signal 只唤醒一个）`
</script>
