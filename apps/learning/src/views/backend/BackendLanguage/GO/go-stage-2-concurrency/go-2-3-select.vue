<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Select 多路复用</h1><p class="text-sm text-slate-500 mt-1">同时等待多个 channel 操作——Go 的并发多路选择器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-3-select.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔀</span>select = 同时监听多个 channel</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>select ≈ <strong>Promise.race()</strong>——哪个 channel 先就绪就处理哪个。≈ JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">await Promise.race([req1, timeout])</code>。<br/><strong>关键区别：</strong>多个 case 同时就绪时，<strong>随机选一个</strong>（防止饥饿）。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="select_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>超时控制（最常用模式）</h2>
        <div class="mb-4"><Code language="go" :code="timeoutCode" title="select_timeout.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>default 非阻塞 + nil chan 技巧</h2>
        <div class="mb-4"><Code language="go" :code="defaultCode" title="select_default.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>select 同时等待多个 channel——哪个先就绪执行哪个，同时就绪<strong>随机选</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>time.After = 超时控制</strong>——HTTP 请求、数据库查询都用这个</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>default 使 select 非阻塞——尝试读/写，不成则走 default</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>nil channel 在 select 中<strong>永久阻塞</strong>——用于<strong>动态禁用</strong>某个 case</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Channel</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Timer/Ticker →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"select基础"},{id:"sec-2",name:"超时控制"},{id:"sec-3",name:"default/nil技巧"},{id:"sec-4",name:"小结"}]
const basicCode = `ch1 := make(chan string); ch2 := make(chan string)
go func() { time.Sleep(1*time.Second); ch1 <- "one" }()
go func() { time.Sleep(2*time.Second); ch2 <- "two" }()
select {
case msg := <-ch1: fmt.Println(msg)
case msg := <-ch2: fmt.Println(msg)
}
// 输出: "one"（ch1 先就绪）`

const timeoutCode = `select {
case res := <-ch: fmt.Println(res)
case <-time.After(3 * time.Second): fmt.Println("timeout!")
}
// ≈ JS: await Promise.race([fetch(), timeout(3000)])`

const defaultCode = `// default 使 select 非阻塞
select {
case v := <-ch: fmt.Println("received", v)
default: fmt.Println("channel empty, do other work")
}
// nil chan 技巧：动态禁用某个 case
var done chan struct{} = nil
select {
case <-done: fmt.Println("won't happen")
default: fmt.Println("done is nil, skipped")
}`
</script>
