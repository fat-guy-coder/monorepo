<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🧩 WaitGroup / Once / Cond</h1><p class="text-sm text-slate-500 mt-1">goroutine 同步三件套 — 像等所有人到齐再开会、像全局初始化只做一次</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-6-sync-wg-once.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>sync.WaitGroup — "等大家干完活再继续"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你启动 5 个 goroutine 去并发下载文件，主 goroutine 需要<strong>等它们全完成</strong>才能继续。WaitGroup 就是干这个的——内部是一个<strong>计数器</strong>：Add(n) 加计数，Done() 减计数，Wait() 阻塞直到计数归零。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">底层实现：一个 int64 原子计数器 + 一个<strong>信号量</strong>（sema）。Wait 时如果计数 &gt; 0 → goroutine 排队挂在信号量上。最后一个 Done 把计数减到 0 → <strong>同时唤醒所有排队的 goroutine</strong>。所以 WaitGroup 可以<strong>复用</strong>——Wait 返回后可以重新 Add。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>WaitGroup ≈ <strong>Promise.all()</strong>——等所有任务完成再继续。但区别在于 Go 的 goroutine 没有"返回值"——数据通过 channel 或共享变量传递。</p></aside>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 三条铁律：</strong>① <strong>Add 必须在 goroutine 外</strong>——否则可能 Wait 在 Add 前返回。② <strong>Done = Add(-1)</strong>——两种写法等价。③ <strong>不能复制 WaitGroup</strong>——传参用指针。④ WaitGroup 可以<strong>复用</strong>——Wait 返回后可以重新 Add。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>WaitGroup + errgroup — 错误传播版 WaitGroup</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">WaitGroup 只管"等"，不管"有没有出错"。如果 goroutine 里返回了 error，WaitGroup 无法传递。这时候用 <strong>errgroup</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">golang.org/x/sync/errgroup</code>）——它和 WaitGroup 用法一样，但能收集第一个错误并取消其他 goroutine。</p>
        <div class="mb-4"><Code language="go" :code="errgroupCode" title="errgroup.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>sync.Once — "不管来多少人，只做一次"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">数据库连接、配置加载、全局初始化……这些操作<strong>只需要做一次</strong>，即使 100 个 goroutine 同时请求。Once 保证传入的函数<strong>全局只执行一次</strong>——第一个 goroutine 执行函数，其他全部阻塞等待完成。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">内部实现：<strong>Mutex + atomic 标志位</strong>。Do 先 atomic 检查 done 标志——如果已完成，直接返回（快路径，无锁）；如果未完成，拿 Mutex 再检查一次（双重检查锁定 Double-Checked Locking），执行函数，完成后 atomic 设 done=1。</p>
        <div class="mb-4"><Code language="go" :code="onceCode" title="once.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>sync.Cond — "条件满足了通知我"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">生产者-消费者场景中，消费者要等"队列不为空"才能消费。如果用 for+sleep 轮询 → 浪费 CPU。Cond 让 goroutine <strong>睡着等</strong>，条件满足时<strong>被唤醒</strong>。Wait 会自动释放锁并挂起，Signal 唤醒一个等待者，Broadcast 唤醒全部。</p>
        <div class="mb-4"><Code language="go" :code="condCode" title="cond.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 多数场景用 channel 更简洁。</strong>只有当你需要配合 Mutex 保护复杂状态时才需要 Cond。面试中问到 Cond 时记住：Wait 必须用 for（防虚假唤醒），Signal=唤醒一个，Broadcast=唤醒所有。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WaitGroup</strong> = 等所有 goroutine 完成。Add 在 goroutine 外，Done 在 defer</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>errgroup</strong> = WaitGroup + 错误传播 + 自动取消（详见 go-2-12）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Once</strong> = 只做一次（双重检查锁定）。Do 中 panic → Once 认为已完成，不重试</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Cond</strong> = 条件变量。Wait 用 for。多数场景 channel 更简洁</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Mutex</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Atomic →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"WaitGroup"},{id:"sec-2",name:"WaitGroup+errgroup"},{id:"sec-3",name:"sync.Once"},{id:"sec-4",name:"sync.Cond"},{id:"sec-5",name:"小结"}]
const wgCode = `var wg sync.WaitGroup
for i := 1; i <= 5; i++ {
    wg.Add(1)  // ⚠️ 必须在 goroutine 外！
    go func(id int) {
        defer wg.Done()  // 等价 wg.Add(-1)，defer 保证一定执行
        // 模拟工作...
        fmt.Printf("worker %d done\\n", id)
    }(i)  // 传参——避免闭包陷阱
}
wg.Wait()  // 阻塞直到计数器归零
fmt.Println("all workers done")
// 输出（顺序随机）:
// worker 3 done
// worker 1 done
// worker 5 done
// worker 2 done
// worker 4 done
// all workers done

// WaitGroup 可以复用！
wg.Add(2)
go func() { defer wg.Done(); fmt.Println("round 2: A") }()
go func() { defer wg.Done(); fmt.Println("round 2: B") }()
wg.Wait()
// 输出: round 2: A, round 2: B`
const errgroupCode = `// errgroup = WaitGroup + 错误传播（需要 import "golang.org/x/sync/errgroup"）
var g errgroup.Group
urls := []string{"url1", "url2", "url3"}
for _, url := range urls {
    url := url
    g.Go(func() error {  // Go 替代 go func，返回 error
        resp, err := http.Get(url)
        if err != nil { return err }  // 出错→Wait 返回这个 error
        defer resp.Body.Close()
        return process(resp)
    })
}
if err := g.Wait(); err != nil {
    log.Fatal("至少一个 goroutine 失败:", err)
}
fmt.Println("所有请求成功")
// 区别：Wait() 返回第一个错误（不是最后）`
const onceCode = `var once sync.Once
var instance *DB

func GetDB() *DB {
    once.Do(func() {     // 双检锁——只有第一次需要 Lock
        instance = connectDB(dsn)
        fmt.Println("DB 连接建立（全局只打印一次）")
    })
    return instance
}
// 100 个 goroutine 同时调用 GetDB():
// 只有第一个会执行 connectDB，其余 99 个在 Do 内部阻塞等待
// 等第一个完成后，其余 99 个直接拿到 instance（atomic 快路径）
// 输出: "DB 连接建立（全局只打印一次）"（只有一条！）

// ⚠️ 如果 Do 中的函数 panic，Once 不会重试——done 标志已设置
// 需要重试的话：在 Do 内部 recover，或创建新 Once`
const condCode = `var mu sync.Mutex
cond := sync.NewCond(&mu)
queue := make([]int, 0)  // 共享队列

// 消费者——等队列非空
go func() {
    mu.Lock()
    for len(queue) == 0 {  // ⚠️ 必须 for（防虚假唤醒）
        cond.Wait()         // Wait 自动释放锁+挂起，被唤醒后重新拿锁
    }
    item := queue[0]; queue = queue[1:]
    fmt.Println("consumed:", item)
    mu.Unlock()
}()

// 生产者——往队列放数据后通知
time.Sleep(time.Second)
mu.Lock()
queue = append(queue, 42)
mu.Unlock()
cond.Signal()  // 唤醒一个等待者（Broadcast 唤醒所有）
// 输出: consumed: 42`
</script>
