<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">new 与 make</h1><p class="text-sm text-slate-500 mt-1">Go 的两种分配原语</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-12-new-make.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-12</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔢</span>核心区别</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">new(T)</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">make(T, ...)</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">适用类型</td><td class="px-4 py-2 border"><strong>所有类型</strong></td><td class="px-4 py-2 border">仅 <strong>slice / map / chan</strong></td></tr><tr><td class="px-4 py-2 border">返回值</td><td class="px-4 py-2 border font-mono">*T（指针）</td><td class="px-4 py-2 border font-mono">T（非指针）</td></tr><tr><td class="px-4 py-2 border">初始化</td><td class="px-4 py-2 border">填零值，不分配底层结构</td><td class="px-4 py-2 border">初始化内部数据结构，可直接使用</td></tr></tbody></table>
        </div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>示例与常见错误</h2>
        <div class="mb-4"><Code language="go" :code="code" title="new_vs_make.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最高频错误：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">new(map[...])</code> 返回 <code class="bg-amber-100 px-1 rounded text-xs font-mono">*map[...]</code> 指向 nil map，写入直接 panic。map 只能用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">make</code> 或字面量。</p>
        </aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-11-structs" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：结构体</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-13-methods-interfaces" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：方法与接口 →</RouterLink>
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
    { id: "sec-1", name: "核心区别" },
    { id: "sec-2", name: "示例与常见错误" }
  ]
const code = `// new — 零值指针
p1 := new(int)       // *int，*p1 = 0
p2 := new(string)    // *string，*p2 = ""
p3 := new([3]int)    // *[3]int

// ❌ new(map) — nil map，不可写！
m1 := new(map[string]int)
// (*m1)["k"] = 1    // panic!

// make — 仅 slice/map/chan，返回已初始化的 T
s := make([]int, 3, 5)        // len=3, cap=5
m := make(map[string]int)     // 可写空 map
ch := make(chan int, 10)      // 缓冲 channel

// 实践中 new 极少使用，更常用:
//   &T{}     替代 new(T) — 可以同时赋初值
//   make     仅用于 slice/map/chan`
</script>
