<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ Goroutine 与 GMP 调度模型</h1>
          <p class="text-sm text-slate-500 mt-1">Go 的轻量级并发 — 2KB 栈、百万并发、M:N 调度</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/concurrency/go-2-1-goroutine-gmp.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. goroutine 基础 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          goroutine = 用户态轻量线程，不是 OS 线程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          goroutine 是 Go 运行时管理的<strong>用户态协程</strong>。一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go</code> 关键字就是启动一个并发的 goroutine。
          它<strong>不是操作系统线程</strong>——一个 OS 线程上可以运行成百上千个 goroutine，Go runtime 负责调度。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端/跨语言类比：</strong><br/>
          JS: <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">await Promise.all([fetch1(), fetch2()])</code> — 两个请求并发<br/>
          Go: <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">go fetch1(); go fetch2()</code> — 更简洁，写起来像同步代码却是并发的<br/>
          <strong>关键差异：</strong>Node.js Worker Thread ~几 MB 内存；Go goroutine 初始栈仅 <strong>2KB</strong>，可轻松启动<strong>百万个</strong>。<br/>
          Python asyncio ≈ Go goroutine 的并发模型（协程+事件循环），但 Go 还能利用多核<strong>并行</strong>。
          </p>
        </aside>

        <div class="mb-4"><Code language="go" :code="basicCode" title="goroutine_basic.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>main 函数退出时，<strong>所有 goroutine 都会被强制终止</strong>。示例中用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">time.Sleep</code> 只是演示，实际项目用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sync.WaitGroup</code> 或 channel 来等待。</p>
        </aside>
      </section>

      <!-- 2. GMP 模型 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          GMP 调度模型 — goroutine 如何被执行
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go runtime 使用 <strong>GMP 模型</strong>将 N 个 goroutine 映射到 M 个 OS 线程上，由 P 个逻辑处理器调度。
          这是 Go 并发模型的<strong>核心</strong>，面试必问。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">组件</th><th class="px-4 py-2 border border-slate-200 font-semibold">全称</th><th class="px-4 py-2 border border-slate-200 font-semibold">职责</th><th class="px-4 py-2 border border-slate-200 font-semibold">类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">G</td><td class="px-4 py-2 border">Goroutine</td><td class="px-4 py-2 border">用户态执行单元 — 包含栈、PC、状态</td><td class="px-4 py-2 border">JS 的 Task/Callback</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">M</td><td class="px-4 py-2 border">Machine (OS Thread)</td><td class="px-4 py-2 border">操作系统线程 — 真正执行代码</td><td class="px-4 py-2 border">Worker Thread</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">P</td><td class="px-4 py-2 border">Processor</td><td class="px-4 py-2 border"><strong>逻辑处理器</strong> — 持有 G 本地队列。数量 = GOMAXPROCS（默认 CPU 核数）</td><td class="px-4 py-2 border">Event Loop 实例</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">调度流程（4 步核心）</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>本地队列取 G</strong> — 每个 P 有一个本地 goroutine 队列（容量 256），P 从队头取 G 交给 M 执行。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>阻塞时分离 M-P</strong> — G 执行系统调用阻塞时，M 和 P 分离。P 找新 M（或新建 M）继续执行其他 G。原 M 等系统调用返回后，G 被放回队列。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>工作窃取（Work Stealing）</strong> — P 的本地队列空了 → 从<strong>全局队列</strong>取，或从<strong>其他 P 的队尾偷一半</strong> G。这实现了动态负载均衡。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>抢占式调度（Go 1.14+）</strong> — 基于信号的异步抢占。goroutine 运行超过 10ms → 被抢占，避免一个死循环卡死整个 P。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="go" :code="gmpCode" title="gmp_demo.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ GMP 核心优势：</strong>M:N 调度 — goroutine 切换仅在<strong>用户态</strong>（~几十 ns），不需内核态上下文切换（~几 μs，约 100 倍差距）。goroutine 阻塞时<strong>P 自动接管其他 G</strong>——I/O 等待期间 CPU 不闲着。</p>
        </aside>
      </section>

      <!-- 3. goroutine 栈 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          goroutine 的可增长栈 — 为什么能百万并发
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个 goroutine 初始只有 <strong>2KB 栈</strong>。栈不够时 runtime 自动分配一个更大的栈（2x），把旧栈数据<strong>复制过去</strong>，
          指针自动更新。OS 线程的栈是<strong>固定的 1~8MB</strong>——这就是为什么 OS 线程最多几千个，而 goroutine 可以百万个。
        </p>
        <div class="mb-4"><Code language="go" :code="stackCode" title="stack_demo.go" /></div>
      </section>

      <!-- 4. 闭包陷阱与 WaitGroup -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          闭包陷阱 & WaitGroup
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">循环变量闭包陷阱（Go &lt; 1.22 经典 bug）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          for 循环中，循环变量在迭代间<strong>复用同一地址</strong>。如果 goroutine 里用了闭包捕获循环变量，
          所有 goroutine 读到的都是循环结束后的值。Go 1.22+ 已自动修复——但面试还会考。
        </p>
        <div class="mb-4"><Code language="go" :code="closureCode" title="closure_trap.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">sync.WaitGroup — 等待一组 goroutine</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          用 WaitGroup 而不是 time.Sleep。三个方法：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Add(n)</code> 加计数、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Done()</code> 减计数（等价 Add(-1)）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Wait()</code> 阻塞到计数归零。
        </p>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
      </section>

      <!-- 5. goroutine 泄漏 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          goroutine 泄漏 —— 隐形的内存泄漏
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          goroutine 不会自动结束——函数执行完才退出。如果 goroutine 在等待一个<strong>永远不会到来的 channel 消息</strong>，
          它就<strong>永远阻塞</strong>，占着栈内存不会被 GC——这就是 goroutine 泄漏。10 万个泄漏的 goroutine = ~200MB 内存浪费。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">❌ 泄漏</h4>
            <Code language="go" :code="leakBadCode" title="leak.go" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">✅ 正确：给退出路径</h4>
            <Code language="go" :code="leakGoodCode" title="no_leak.go" />
          </div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-4">检测泄漏</h3>
        <p class="text-slate-600 text-sm mb-2">
          用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">runtime.NumGoroutine()</code> 在测试前后对比 goroutine 数量。
          或使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.uber.org/goleak</code> 自动检测。
        </p>
        <div class="mb-4"><Code language="go" :code="leakDetectCode" title="leak_detect_test.go" /></div>
      </section>

      <!-- 6. 常见问题 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💬</span>
          面试常见问题
        </h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: goroutine 和 OS 线程的区别？</strong>
            <p class="mt-1">goroutine 是<strong>用户态</strong>，Go runtime 调度，2KB 可增长栈。线程是<strong>内核态</strong>，OS 调度，1-8MB 固定栈。goroutine 切换 ~几十 ns，线程切换 ~几 μs（~100x 差距）。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: GOMAXPROCS 设多少合适？</strong>
            <p class="mt-1">默认 = CPU 核数。I/O 密集场景可以设大（阻塞的 P 被替换用新线程），但不要超过核数的 2-4 倍。CPU 密集不需要改。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: main goroutine 退出了，其他 goroutine 会怎样？</strong>
            <p class="mt-1"><strong>全部强制终止</strong>。main 函数 return → 整个进程退出。所以需要 WaitGroup/channel/context 等主 goroutine。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <strong class="text-slate-700">Q: GMP 为什么能支持百万级 goroutine？</strong>
            <p class="mt-1">三个关键：① 2KB 初始栈（可增长），② 用户态调度（无内核开销），③ 工作窃取（负载均衡）。一个 OS 线程（~1MB 栈）能跑成千上万个 goroutine（~2KB 栈）。</p>
          </div>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go f()</code> 启动一个 goroutine — 初始 2KB 栈</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GMP = G（goroutine）+ M（OS 线程）+ P（逻辑处理器）</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>M:N 调度：N 个 goroutine → M 个 OS 线程，用户态切换极快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工作窃取：</strong>空 P 从忙 P 偷 G，动态负载均衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>用 <strong>WaitGroup</strong> 等待 goroutine 完成，不要用 time.Sleep</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>goroutine 泄漏 = goroutine 永远阻塞 → 用 context/close(ch) 给退出信号</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-19-testing" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：单元测试</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Channel 通道 →</RouterLink>
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
  { id: "sec-1", name: "goroutine 基础" },
  { id: "sec-2", name: "GMP 调度模型" },
  { id: "sec-3", name: "可增长栈" },
  { id: "sec-4", name: "闭包陷阱 & WaitGroup" },
  { id: "sec-5", name: "goroutine 泄漏" },
  { id: "sec-6", name: "面试常见问题" },
  { id: "sec-7", name: "小结" },
]

const basicCode = `package main

import (
    "fmt"
    "time"
)

func main() {
    go say("world")  // 启动 goroutine——不阻塞，立即返回
    say("hello")     // 主 goroutine 继续执行

    time.Sleep(100 * time.Millisecond) // 等 goroutine 完成（演示用）
}

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(50 * time.Millisecond)
        fmt.Println(s)
    }
}
// 输出（hello 和 world 交替）:
// hello
// world
// hello
// world
// ...`

const gmpCode = `package main

import (
    "fmt"
    "runtime"
)

func main() {
    // GOMAXPROCS — 控制 P 的数量（即并行度）
    fmt.Println("CPU 核数:", runtime.NumCPU())
    fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0))

    // 查看当前 goroutine 数量
    fmt.Println("当前 goroutine 数:", runtime.NumGoroutine())

    // 演示：大量 goroutine 只占很少内存
    for i := 0; i < 10000; i++ {
        go func(n int) {
            // 每个 goroutine 只需 ~2KB 初始栈
            // 10000 个 ≈ 20MB 内存（vs 10000 线程 ≈ 10GB）
            _ = n
        }(i)
    }
    fmt.Println("10000 个 goroutine 已启动")
    fmt.Println("当前 goroutine 数:", runtime.NumGoroutine())
    // 输出: 10000 个 goroutine 已启动
    // 输出: 当前 goroutine 数: 10001（含 main）
}`

const stackCode = `// 演示 goroutine 栈的动态增长
func recursiveGrow(n int) {
    if n <= 0 { return }
    // 每次递归调用使栈增长
    // Go runtime 自动检测栈溢出 → 分配更大的栈（复制+更新指针）
    var data [1024]byte  // 每次分配 1KB 局部变量
    _ = data
    recursiveGrow(n - 1)
}

// 对比：OS 线程固定栈 ~1-8MB，goroutine 从 2KB 开始按需增长
// 1000 个 OS 线程 × 1MB = 1GB 栈内存
// 1000 个 goroutine × ~10KB 平均 = 10MB 栈内存（100x 差距！）`

const closureCode = `// ⚠️ Go < 1.22 经典 Bug
var wg sync.WaitGroup
for i := 0; i < 3; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Bug版: i =", i)
        // Go < 1.22: 输出 3, 3, 3（全读最后一个值！）
        // Go >= 1.22: 输出 0, 1, 2（已修复）
    }()
}
wg.Wait()

// ✅ 修复方式一：传参（最可靠）
for i := 0; i < 3; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println("传参: i =", n)  // 输出: 0, 1, 2
    }(i)  // ← 把 i 作为参数传入
}
wg.Wait()

// ✅ 修复方式二：局部副本（Go < 1.22 兼容）
for i := 0; i < 3; i++ {
    i := i  // 创建新变量，遮蔽外层 i
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("副本: i =", i)  // 输出: 0, 1, 2
    }()
}
wg.Wait()`

const wgCode = `// sync.WaitGroup — 等待一组 goroutine 完成
func main() {
    var wg sync.WaitGroup
    urls := []string{"url1", "url2", "url3", "url4", "url5"}

    for _, url := range urls {
        wg.Add(1)  // 计数器 +1（必须在 goroutine 外调用！）
        go func(u string) {
            defer wg.Done()  // 完成时 -1（defer 保证一定执行）
            fetch(u)          // 模拟请求
        }(url)
    }

    wg.Wait()  // 阻塞直到计数器归零
    fmt.Println("所有请求完成")
    // 输出:
    // 请求完成: url1
    // 请求完成: url5  (顺序随机)
    // ...
    // 所有请求完成
}`

const leakBadCode = `// ❌ goroutine 泄漏：永远等一个没人发的 channel
func leak() {
    ch := make(chan int)
    go func() {
        val := <-ch  // 永远阻塞——没人往 ch 发数据
        fmt.Println(val)
    }()
    // goroutine 永远不会结束，也不会被 GC 回收
    // 函数返回后，ch 和 goroutine 都泄漏了
}`

const leakGoodCode = `// ✅ 给 goroutine 一个退出路径
func noLeak(ctx context.Context) {
    ch := make(chan int)
    go func() {
        select {
        case val := <-ch:
            fmt.Println("收到:", val)
        case <-ctx.Done():
            fmt.Println("收到取消信号，退出")
            return
        }
    }()
}

// ✅ 或者用 close(ch) 广播退出信号
func noLeakWithClose() {
    ch := make(chan int)
    done := make(chan struct{})

    go func() {
        for {
            select {
            case v, ok := <-ch:
                if !ok {  // channel 已关闭
                    fmt.Println("channel 关闭，退出")
                    return
                }
                fmt.Println(v)
            case <-done:
                return
            }
        }
    }()
}`

const leakDetectCode = `// 用 runtime.NumGoroutine 检测泄漏
func TestNoLeak(t *testing.T) {
    before := runtime.NumGoroutine()
    // 执行业务逻辑...
    after := runtime.NumGoroutine()

    if after > before {
        t.Errorf("goroutine 泄漏: %d → %d", before, after)
    }
}

// 或用 goleak 库（推荐）
// import "go.uber.org/goleak"
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}`
</script>
