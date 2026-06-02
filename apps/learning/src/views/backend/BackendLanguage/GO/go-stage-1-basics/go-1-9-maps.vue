<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">Map 映射</h1><p class="text-sm text-slate-500 mt-1">键值对容器 · 并发安全</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-9-maps.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-9</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>
        <p class="text-slate-600 leading-relaxed">
          Map 是 Go 内置的 <strong>无序键值对集合</strong>，基于哈希表实现。O(1) 查找/插入/删除。底层是 <strong>引用类型</strong>——赋值和传参共享同一份数据。并发不安全，需要 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">sync.Mutex</code> 保护或使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">sync.Map</code>。
        </p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>基本操作</h2>
        <div class="mb-4"><Code language="go" :code="basicCode" title="map_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ nil map 不能写入：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">var m map[K]V</code> 后直接 <code class="bg-amber-100 px-1 rounded text-xs font-mono">m[k]=v</code> 会 panic。总是用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">make(map[K]V)</code> 或字面量初始化。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>comma ok 惯用法</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 没有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map.containsKey()</code>。访问 map 始终返回两个值：value 和一个表示是否存在的 bool。</p>
        <div class="mb-4"><Code language="go" :code="commaOkCode" title="comma_ok.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>引用特性 · 遍历 · sync.Map</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">Map 是引用类型</h3>
        <div class="mb-4"><Code language="go" :code="refCode" title="map_ref.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">遍历（顺序随机！）</h3>
        <div class="mb-4"><Code language="go" :code="rangeCode" title="map_range.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">sync.Map（并发安全）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">适合 <strong>读多写少</strong> 的并发场景。Store/Load/LoadOrStore/Delete/Range 方法无需额外加锁。</p>
        <div class="mb-4"><Code language="go" :code="syncMapCode" title="sync_map.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 选型原则：</strong>绝大多数场景用普通 map + mutex（类型安全、编译器保护）。<code class="bg-blue-100 px-1 rounded text-xs font-mono">sync.Map</code> 仅在 profiling 确认 map 成为锁瓶颈且读>>写时考虑。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>nil map 不可写</strong>——总是 make 或字面量初始化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>comma ok 防零值歧义：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">v, ok := m[k]</code>，ok=false 表示 key 不存在</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>遍历顺序随机</strong>——需要有序输出时先 sort keys</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>delete 对不存在的 key 是安全的</strong>，不会 panic</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并发不安全</strong>——用 mutex 保护或 sync.Map</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-8-arrays-slices" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：数组与切片</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-10-pointers" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：指针 →</RouterLink>
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
    { id: "sec-2", name: "基本操作" },
    { id: "sec-3", name: "comma ok 惯用法" },
    { id: "sec-4", name: "引用特性 · 遍历 · sync.Map" },
    { id: "sec-5", name: "小结" }
  ]
const basicCode = `// 声明（nil map，不可写！）
var m1 map[string]int  // m1 == nil

// make 创建
m2 := make(map[string]int)
m2["a"] = 1

// 字面量
m3 := map[string]string{"red": "#F00", "blue": "#00F"}

// 增/改
m3["green"] = "#0F0"  // 插入
m3["red"] = "#C00"    // 更新

// 删（对不存在的 key 安全）
delete(m3, "blue")

// 长度
fmt.Println(len(m3))  // 2`

const commaOkCode = `scores := map[string]int{"Alice": 95, "Bob": 87}

// 检测 key 是否存在
if v, ok := scores["Alice"]; ok {
    fmt.Println(v)  // 95
}
if _, ok := scores["Eve"]; !ok {
    fmt.Println("Eve 不在成绩单中")
}

// 不检测直接访问——key 不存在时返回零值
fmt.Println(scores["Nobody"])  // 0（不是 nil！）`

const refCode = `m1 := map[string]int{"a": 1}
m2 := m1          // 引用！非拷贝
m2["a"] = 999
fmt.Println(m1)   // map[a:999]——m1 也被改了

// 函数传参同理
func modifyMap(m map[string]int) { m["x"] = 42 }
// 调用后原 map 也被修改`

const rangeCode = `// 遍历顺序随机（故意的！防止依赖迭代顺序）
for k, v := range m { fmt.Println(k, v) }
// 每次运行输出顺序可能不同

// 需要固定顺序：先提取并排序 keys
keys := make([]string, 0, len(m))
for k := range m { keys = append(keys, k) }
sort.Strings(keys)
for _, k := range keys { fmt.Println(k, m[k]) }`

const syncMapCode = `var sm sync.Map

sm.Store("key1", "val1")           // 存
if v, ok := sm.Load("key1"); ok {  // 取
    fmt.Println(v)
}
v, loaded := sm.LoadOrStore("key2", "default")  // 有则取，无则存
sm.Delete("key1")                  // 删

// 遍历
sm.Range(func(k, v any) bool {
    fmt.Println(k, v)
    return true  // 返回 false 停止遍历
})`
</script>
