<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔀 Select 多路复用</h1><p class="text-sm text-slate-500 mt-1">同时等待多个 channel 操作 — Go 的 I/O 多路复用器，一切并发控制的基石</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-3-select.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>select 到底是什么？用来干嘛？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">select 是 Go 的<strong>多路复用（multiplexing）</strong>语句——一个 goroutine 可以同时等待多个 channel 操作，<strong>哪个先就绪就先执行哪个</strong>。它类似于 Unix 的 <strong>select/epoll</strong> 系统调用——同时监听多个文件描述符。在 Go 里，"文件描述符"变成了 channel。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>select ≈ <strong>Promise.race()</strong>——哪个先完成用哪个。≈ Unix <strong>select/epoll</strong> 系统调用。≈ Node.js 的 <strong>await</strong> 同时等多个 Promise。<br/><strong>default 分支</strong> ≈ <strong>非阻塞 I/O</strong>——有数据就处理，没有就干别的。</p></aside>

        <div class="mb-4"><Code language="go" :code="basicCode" title="select_basic.go" /></div>
      </section>

      <!-- 2. 底层原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>底层原理：runtime.selectgo() 做了什么？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">每个 select 语句在编译时被转换为对 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">runtime.selectgo()</code> 的调用。这个函数是理解 select 行为的关键。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>锁定所有 channel</strong> — selectgo 用一个<strong>统一的加锁顺序</strong>（按 channel 地址排序）锁住所有涉及的 channel，防止死锁。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>遍历所有 case</strong> — 检查每个 channel 是否可以立即操作（发送/接收）。如果有就绪的 → <strong>伪随机选一个</strong>（用 fastrand()），执行操作。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>全部阻塞 + 无 default</strong> — 把当前 goroutine 加入<strong>所有 case channel 的等待队列</strong>（sendq 或 recvq），然后调用 gopark() 挂起 G。当任意一个 channel 就绪→G 被唤醒→从其他 channel 的等待队列中移除。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>有 default</strong> — 所有 case 都阻塞时<strong>立即执行 default</strong>，不挂起 G。这就是非阻塞操作的本质。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>解锁所有 channel</strong> — 操作完成，释放锁。</div></li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 为什么多个 case 就绪时随机选？</strong>如果总是优先选第一个 case，就可能出现<strong>饥饿</strong>——某个 case 的条件一直满足，其他 case 永远轮不到。伪随机保证了公平性。</p></aside>
      </section>

      <!-- 3. 七大实战模式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>七大实战模式</h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">① 超时控制（最常用）</h3>
        <div class="mb-4"><Code language="go" :code="timeoutCode" title="select_timeout.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">② 非阻塞操作（default）</h3>
        <div class="mb-4"><Code language="go" :code="defaultCode" title="select_default.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">③ 退出信号（done channel）</h3>
        <div class="mb-4"><Code language="go" :code="doneCode" title="select_done.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">④ for-select 循环（持续监听）</h3>
        <div class="mb-4"><Code language="go" :code="forSelectCode" title="for_select.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑤ Ticker 定时任务</h3>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="select_ticker.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑥ send 和 recv 混合（双向 select）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">select 的 case 不仅可以是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-ch</code>（接收），也可以是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ch <- v</code>（发送）。在同一个 select 中混合收发。</p>
        <div class="mb-4"><Code language="go" :code="sendRecvCode" title="select_send_recv.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">⑦ nil chan 动态禁用 case</h3>
        <div class="mb-4"><Code language="go" :code="nilChanCode" title="select_nil.go" /></div>
      </section>

      <!-- 4. 执行规则 + 陷阱 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>执行规则速记 + 常见陷阱</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="font-semibold text-blue-700 mb-2">📐 五大执行规则</h4>
            <ol class="space-y-1 text-sm text-blue-700">
              <li>1. 所有 channel 表达式<strong>先求值一次</strong></li>
              <li>2. 多个 case 就绪 → <strong>伪随机选一个</strong></li>
              <li>3. 全阻塞 + 无 default → select <strong>阻塞</strong></li>
              <li>4. 有 default → 全阻塞时<strong>走 default</strong></li>
              <li>5. nil chan → 对应 case <strong>永不选中</strong></li>
            </ol>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-2">⚠️ 常见陷阱</h4>
            <ul class="space-y-1 text-sm text-amber-700">
              <li>· <strong>for-select 里没有退出条件</strong> → goroutine 泄漏</li>
              <li>· select {} (空 select) → <strong>永久阻塞</strong>整个 goroutine</li>
              <li>· <strong>time.After 在循环中泄漏</strong>（每次创建新 Timer 不释放）</li>
              <li>· break 只跳出 select，不跳出外层 for → 用 <strong>标签 break</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>select 底层调用 runtime.selectgo()——<strong>统一加锁→遍历→阻塞或执行→解锁</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>七大模式：</strong>超时/default/退出/for-select/ticker/收发混合/nil chan 禁用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>for + select 是 Go 中<strong>最核心的并发循环模式</strong>——几乎所有 server 都在用</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Channel</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Timer/Ticker →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"是什么"},{id:"sec-2",name:"底层原理 selectgo"},{id:"sec-3",name:"七大实战模式"},{id:"sec-4",name:"规则 + 陷阱"},{id:"sec-5",name:"小结"}]
const basicCode = `ch1 := make(chan string); ch2 := make(chan string)
go func() { time.Sleep(10*time.Millisecond); ch1 <- "one" }()
go func() { time.Sleep(20*time.Millisecond); ch2 <- "two" }()
select {
case msg := <-ch1: fmt.Println(msg)  // 输出: one
case msg := <-ch2: fmt.Println(msg)
}

// 多个就绪时随机选
a := make(chan string, 1); a <- "A"
b := make(chan string, 1); b <- "B"
for i := 0; i < 3; i++ {
    select {
    case m := <-a: fmt.Println("picked:", m)  // A/B/A（随机）
    case m := <-b: fmt.Println("picked:", m)
    }
}`
const timeoutCode = `// 超时控制——每个 HTTP 请求、DB 查询都会用
select {
case res := <-doWork():
    fmt.Println("结果:", res)
case <-time.After(3 * time.Second):
    fmt.Println("请求超时！")
    return fmt.Errorf("timeout")
}

// ⚠️ 循环中不要直接用 time.After——每次都分配新 Timer
// 应该用 time.NewTimer + Reset 复用`
const defaultCode = `// 非阻塞读取——有数据就读，没有就干别的
select {
case v := <-ch:
    fmt.Println("received", v)
default:
    fmt.Println("channel empty, do other work")
}

// 非阻塞发送
select {
case ch <- 42:
    fmt.Println("sent")
default:
    fmt.Println("channel full, drop")
}`
const doneCode = `// ③ 退出信号模式——所有长时间运行的 goroutine 必备
func worker(ctx context.Context, jobs <-chan Job) {
    for {
        select {
        case job, ok := <-jobs:
            if !ok { return }
            process(job)
        case <-ctx.Done():
            fmt.Println("收到取消信号，退出")
            return
        }
    }
}`
const forSelectCode = `// ④ for-select 循环——Go 服务端程序的标准骨架
func server(requests <-chan Request, shutdown <-chan struct{}) {
    for {
        select {
        case req := <-requests:
            handle(req)           // 处理请求
        case <-shutdown:
            fmt.Println("优雅关闭中...")
            return
        }
    }
}`
const tickerCode = `// ⑤ select + Ticker——定时任务
ticker := time.NewTicker(5 * time.Second)
defer ticker.Stop()
for {
    select {
    case <-ticker.C:
        cleanupExpiredSessions()  // 每 5 秒清理过期会话
    case <-done:
        return
    }
}`
const sendRecvCode = `// ⑥ send 和 recv 混合——限流 + 背压
// 生产者：有消费者在等就生产，否则跳过
func produce(ch chan<- int, value int) bool {
    select {
    case ch <- value:  // send case
        return true
    default:
        return false    // channel 满了，丢弃
    }
}

// 消费者：优先处理控制消息
select {
case data := <-dataCh:          // recv case
    handleData(data)
case ch <- result:              // send case
    // 成功发送结果
case <-ctx.Done():              // recv case
    return
}`
const nilChanCode = `// ⑦ nil chan——动态禁用 case
// 场景：轮询两个数据源，但某个时间段内不想接收来自 B 的数据
var sourceB <-chan Data = nil  // 初始禁用
// 条件满足时启用
if enableSourceB {
    sourceB = dataChannelB
}
for {
    select {
    case data := <-sourceA:
        handle(data)
    case data := <-sourceB:  // sourceB 为 nil 时永远不会被选中
        handle(data)
    }
}`
</script>
