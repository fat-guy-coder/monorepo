<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔀 Select 多路复用</h1><p class="text-sm text-slate-500 mt-1">同时等待多个 channel — Go 的并发多路选择器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-3-select.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>select = 同时监听多个 channel</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">select 是 Go 的<strong>多路复用</strong>语句——同时等待多个 channel 操作，哪个先就绪就执行哪个。<strong>所有 case 就绪时随机选一个</strong>（防止饥饿）。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>select ≈ <strong>Promise.race()</strong>——哪个先完成用哪个。≈ Unix 的 <strong>select/epoll</strong> 系统调用——同时监听多个 fd。<br/><strong>default 分支</strong> ≈ <strong>非阻塞 I/O</strong>——有数据就读，没有就走 default。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="select_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三大经典模式</h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">① 超时控制（最常用）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.After(d)</code> 返回一个 channel，d 时间后收到一个值。用 select 同时等结果和超时。</p>
        <div class="mb-4"><Code language="go" :code="timeoutCode" title="select_timeout.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">② default 非阻塞 + nil chan 动态禁用</h3>
        <div class="mb-4"><Code language="go" :code="defaultCode" title="select_default.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">③ for-select 循环（持续监听）</h3>
        <div class="mb-4"><Code language="go" :code="forSelectCode" title="for_select.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>select 的执行规则</h2>
        <ol class="space-y-2 text-slate-600 text-sm mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">1</span><span>对所有 case 的 channel 表达式<strong>求值一次</strong>（lock step）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">2</span><span>多个 case 就绪 → <strong>伪随机选择一个</strong>（防止饥饿）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">3</span><span>所有 case 都阻塞 + 无 default → select <strong>阻塞</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">4</span><span>有 default → 所有 case 阻塞时执行 default（<strong>不阻塞</strong>）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">5</span><span>nil channel 的 case <strong>永远不会被选中</strong>（动态禁用）</span></li>
        </ol>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>select 同时等待多个 channel——就绪<strong>随机选</strong>一个</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>time.After = 超时</strong>，<strong>default = 非阻塞</strong>，<strong>nil chan = 禁用 case</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>for + select 是 Go 中<strong>最核心的并发循环模式</strong></span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Channel</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Timer/Ticker →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"select 基础"},{id:"sec-2",name:"三大经典模式"},{id:"sec-3",name:"执行规则"},{id:"sec-4",name:"小结"}]
const basicCode = `ch1 := make(chan string); ch2 := make(chan string)
go func() { time.Sleep(10*time.Millisecond); ch1 <- "one" }()
go func() { time.Sleep(20*time.Millisecond); ch2 <- "two" }()

select {
case msg := <-ch1: fmt.Println(msg)  // 输出: one（ch1 先就绪）
case msg := <-ch2: fmt.Println(msg)
}

// 二个都就绪时随机选——复现随机性的技巧：
a := make(chan string, 1); a <- "A"
b := make(chan string, 1); b <- "B"
for i := 0; i < 3; i++ {
    select {
    case m := <-a: fmt.Println("picked:", m)  // picked: A / B / A（随机）
    case m := <-b: fmt.Println("picked:", m)
    }
}`
const timeoutCode = `// ① 超时控制——Web 请求、DB 查询必备
select {
case res := <-doAPIRequest():
    fmt.Println("结果:", res)
case <-time.After(3 * time.Second):
    fmt.Println("请求超时！")
    return ErrTimeout
}

// ② 心跳检测——循环检查是否超时
heartbeat := time.NewTicker(5 * time.Second)
for {
    select {
    case <-heartbeat.C:
        conn.Ping()          // 定期心跳
    case <-done:
        heartbeat.Stop()
        return
    }
}`
const defaultCode = `// ③ default 非阻塞——尝试读，不成则走 default
select {
case v := <-ch:
    fmt.Println("received", v)
default:
    fmt.Println("channel empty, do other work")
}

// ④ nil chan 动态禁用 case
var disabled chan struct{} = nil
select {
case <-disabled: fmt.Println("never")  // nil chan 永远不会就绪
default:        fmt.Println("nil chan skipped")
}

// 实战：select 轮询多个 channel，需要暂停某个时设为 nil
var pauseCh chan int = nil // 暂停接收
// 之后恢复：pauseCh = make(chan int)`
const forSelectCode = `// ⑤ for-select 循环——持续监听多个来源（Go 最常用的模式之一）
func worker(jobs <-chan int, done <-chan struct{}) {
    for {
        select {
        case job, ok := <-jobs:
            if !ok { return }     // channel 关闭，退出
            process(job)
        case <-done:
            return               // 收到退出信号
        }
    }
}

// ⑥ for-select + default 非阻塞轮询
for {
    select {
    case msg := <-msgCh:
        handle(msg)
    default:
        // 没有消息时做其他工作（如渲染 UI、检查状态）
        updateProgressBar()
        time.Sleep(16 * time.Millisecond) // ~60fps
    }
}`
</script>
