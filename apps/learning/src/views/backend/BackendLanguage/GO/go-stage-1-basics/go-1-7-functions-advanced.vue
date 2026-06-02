<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">函数进阶 (defer / 闭包 / panic)</h1>
          <p class="text-sm text-slate-500 mt-1">Go 函数高级特性</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-7-functions-advanced.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-7</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔧</span>
          概述
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          掌握了函数的基本声明和调用后，本节深入 Go 函数的三个高级特性：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer</code>（延迟执行）、<strong>闭包</strong>（函数式编程）和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic/recover</code>（异常处理）。
        </p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer：</strong>资源管理的基石，保证清理代码一定被执行</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>闭包：</strong>让函数携带状态，实现工厂模式、迭代器等设计</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>panic/recover：</strong>Go 的异常机制，处理不可恢复的运行时错误</span></li>
        </ul>
      </section>

      <!-- 1. defer 基础 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          defer 延迟执行
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer</code> 将函数调用推迟到<strong>外层函数返回之前</strong>执行。无论函数是正常返回还是触发 panic，defer 都会执行——这是 Go 资源管理的核心机制。
        </p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本用法</h3>
        <div class="mb-4"><Code language="go" :code="deferBasicCode" title="defer_basic.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">参数求值时机</h3>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>关键细节：</strong>defer 语句的参数在 defer <strong>声明时立即求值</strong>，而非在实际执行时。</p>
        <div class="mb-4"><Code language="go" :code="deferEvalCode" title="defer_eval.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">LIFO 执行顺序</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">多个 defer 按<strong>后进先出（LIFO）</strong>顺序执行——最后声明的 defer 最先执行。</p>
        <div class="mb-4"><Code language="go" :code="deferLIFOCode" title="defer_lifo.go" /></div>
      </section>

      <!-- 2. defer 常用模式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          defer 常用模式
        </h2>
        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">🔒 互斥锁解锁</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">加锁后立即 defer 解锁，确保任何分支都不会忘记。</p>
            <div class="mb-4"><Code language="go" :code="deferLockCode" title="defer_lock.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">📁 文件资源关闭</h3>
            <div class="mb-4"><Code language="go" :code="deferFileCode" title="defer_file.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">⏱️ 函数计时</h3>
            <div class="mb-4"><Code language="go" :code="deferTimerCode" title="defer_timer.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">↩️ 修改命名返回值</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">defer 可以在 return 之后修改命名返回值——这是少数几个合理使用命名返回值的场景。</p>
            <div class="mb-4"><Code language="go" :code="deferReturnCode" title="defer_return.go" /></div>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>获取资源后<strong>立即</strong>写 defer 释放，不要等到函数末尾。</p>
        </aside>
      </section>

      <!-- 3. 闭包 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          闭包（Closures）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          闭包 = 函数 + 其引用的外部变量。匿名函数可以<strong>捕获并持有</strong>外层作用域的变量，即使外层函数已经返回。
        </p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本闭包</h3>
        <div class="mb-4"><Code language="go" :code="closureBasicCode" title="closure_basic.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">闭包工厂（独立计数器）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">每次调用工厂函数创建独立的闭包实例，互不影响。</p>
        <div class="mb-4"><Code language="go" :code="closureFactoryCode" title="closure_factory.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">Fibonacci 闭包</h3>
        <div class="mb-4"><Code language="go" :code="fibonacciCode" title="fibonacci_closure.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>闭包通过<strong>引用</strong>捕获变量。在循环中创建闭包时注意循环变量捕获问题（见 go-1-5 常见错误）。</p>
        </aside>
      </section>

      <!-- 4. panic / recover -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          panic 与 recover
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 try-catch。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">panic</code> 用于<strong>不可恢复</strong>的运行时错误；在 defer 中使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">recover</code> 可以捕获 panic 让程序免于崩溃。
        </p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本用法</h3>
        <div class="mb-4"><Code language="go" :code="panicRecoverCode" title="panic_recover.go" /></div>
        <div class="space-y-3">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 重要：</strong>recover <strong>只能在 defer 函数中生效</strong>。直接调用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">recover()</code> 永远返回 nil。</p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>💡 原则：</strong>panic 用于程序无法继续的严重错误。可预期的错误（文件不存在、网络超时）用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">error</code> 返回值处理。</p>
          </aside>
        </div>
      </section>

      <!-- 5. 函数式选项模式 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          函数式选项模式（Functional Options）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当构造函数有大量可选参数时，不传一长串参数，而是传入<strong>函数选项</strong>，每个选项修改一个配置项。这是 Go 中最优雅的配置模式。
        </p>
        <div class="mb-4"><Code language="go" :code="funcOptCode" title="functional_options.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>gRPC、Uber Zap、Docker SDK 等知名项目都采用此模式。3 个以上可选参数时优先考虑。</p>
        </aside>
      </section>

      <!-- 6. 常见错误 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见错误
        </h2>
        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">1. 循环中使用 defer 导致资源泄漏</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">defer 在外层函数返回前才执行，循环中直接用 defer 会累积资源。</p>
            <div class="mb-4"><Code language="go" :code="deferLoopCode" title="defer_loop.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">2. defer 中忽略 error</h3>
            <div class="mb-4"><Code language="go" :code="deferErrorCode" title="defer_error.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">3. 滥用 panic 替代 error</h3>
            <p class="text-slate-600 leading-relaxed">可预期的错误用 error 返回值，真正不可恢复的才用 panic。把业务校验失败变成 panic 是反模式。</p>
          </div>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer 是资源管理利器：</strong>打开→defer关闭，加锁→defer解锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer 参数立即求值，LIFO 执行</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>闭包捕获引用：</strong>每个闭包实例有独立状态</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>panic 用于不可恢复错误，recover 只在 defer 中有效</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>函数式选项模式：</strong>3+ 可选参数时的推荐方案</span></li>
        </ul>
      </section>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-6-functions-basic"
          class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">
          ← 上一节：函数基础
        </RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-8-arrays-slices"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">
          下一节：数组与切片 →
        </RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
    { id: "sec-1", name: "概述" },
    { id: "sec-2", name: "defer 延迟执行" },
    { id: "sec-3", name: "defer 常用模式" },
    { id: "sec-4", name: "闭包（Closures）" },
    { id: "sec-5", name: "panic 与 recover" },
    { id: "sec-6", name: "函数式选项模式（Functional Options）" },
    { id: "sec-7", name: "常见错误" },
    { id: "sec-8", name: "小结" }
  ]
const deferBasicCode = `package main
import "fmt"
func main() {
    defer fmt.Println("3. 最后执行")
    fmt.Println("1. 第一步")
    fmt.Println("2. 第二步")
}
// 输出: 1, 2, 3`

const deferEvalCode = `func demo() {
    x := 1
    defer fmt.Println("defer x =", x) // 此时 x=1 已求值
    x = 2
    fmt.Println("返回前 x =", x)
}
// 输出: 返回前 x = 2, defer x = 1`

const deferLIFOCode = `func demo() {
    defer fmt.Println("1st") // 最先声明
    defer fmt.Println("2nd")
    defer fmt.Println("3rd") // 最后声明
}
// 输出: 3rd, 2nd, 1st（后进先出）`

const deferLockCode = `var mu sync.Mutex
func critical() {
    mu.Lock()
    defer mu.Unlock() // 保证解锁
    // ... 即使 panic，defer 仍执行 ...
}`

const deferFileCode = `func process(name string) error {
    f, err := os.Open(name)
    if err != nil { return err }
    defer f.Close() // 自动关闭
    // ... 处理 ...
    return nil
}`

const deferTimerCode = `func timedOp() {
    start := time.Now()
    defer func() {
        fmt.Println("耗时:", time.Since(start))
    }()
    // ... 要计时的操作 ...
}`

const deferReturnCode = `func demo() (r int) {
    defer func() { r++ }() // return 后执行
    return 42
}
// demo() 返回 43！`

const closureBasicCode = `func main() {
    base := 100
    add := func(n int) int { return base + n }
    fmt.Println(add(5)) // 105
    base = 200
    fmt.Println(add(5)) // 205（引用！）
}`

const closureFactoryCode = `func newCounter() func() int {
    count := 0
    return func() int { count++; return count }
}
c1, c2 := newCounter(), newCounter()
c1() // 1, c1() // 2, c2() // 1（独立！）`

const fibonacciCode = `func fib() func() int {
    a, b := 0, 1
    return func() int { a, b = b, a+b; return a }
}
// f := fib()
// f()→1, f()→1, f()→2, f()→3, f()→5, f()→8`

const panicRecoverCode = `func safeDiv(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("恢复:", r)
            result = 0
        }
    }()
    if b == 0 { panic("除零") }
    return a / b
}
// safeDiv(10, 0) → 返回 0，不崩溃`

const funcOptCode = `type Config struct { Host string; Port int }
type Option func(*Config)
func WithPort(p int) Option { return func(c *Config) { c.Port = p } }
func WithHost(h string) Option { return func(c *Config) { c.Host = h } }

func New(opts ...Option) *Config {
    c := &Config{Host: "0.0.0.0", Port: 8080}
    for _, o := range opts { o(c) }
    return c
}
// New(WithPort(3000), WithHost("127.0.0.1"))`

const deferLoopCode = `// ❌ 循环中 defer 累积，不释放
for _, name := range files {
    f, _ := os.Open(name)
    defer f.Close() // 直到函数结束才关闭 → 泄漏！
}
// ✅ 提取为函数，每次迭代立即释放
for _, name := range files {
    func() {
        f, _ := os.Open(name)
        defer f.Close()
    }()
}`

const deferErrorCode = `// ❌ 忽略 Close 的错误
defer f.Close()
// ✅ 正确处理
defer func() {
    if err := f.Close(); err != nil {
        log.Println("close err:", err)
    }
}()`
</script>
