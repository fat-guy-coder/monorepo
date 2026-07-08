<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗺️ Map 映射</h1>
          <p class="text-sm text-slate-500 mt-1">键值对容器 · 并发安全 · Set 模式 · 底层哈希表</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-9-maps.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-9</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Map 是什么？底层是如何工作的？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Map 是 Go 内置的<strong>无序键值对集合</strong>，基于<strong>哈希表</strong>实现，查找/插入/删除都是 O(1)。
          它是<strong>引用类型</strong>——赋值和传参共享同一份底层数据。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 JS/TS 类比：</strong><br/>
          Go <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">map[K]V</code> ≈ JS <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Map&lt;K, V&gt;</code>（不像 JS object——key 可以是任何可比较类型，不只是 string）<br/>
          Go 没有 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">.has()</code>、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">.keys()</code>——用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">v, ok := m[k]</code> 和 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">for k := range m</code> 代替。<br/>
          <strong>关键差异：</strong>Go map <strong>并发不安全</strong>——多 goroutine 同时读写会 <strong>fatal error</strong>（不是 panic，不可 recover）。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">底层结构（hmap）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          Map 内部是一个指向 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">hmap</code> 结构体的指针。包含 count（元素数）、B（桶数量对数，桶=2^B）、buckets（桶数组指针）。
          每个桶存 8 个键值对。溢出桶通过指针链连接。当负载因子过高时会触发<strong>渐进式 rehash</strong>（扩容时分批迁移，不阻塞）。
        </p>
      </section>

      <!-- 2. 基本操作 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          基本操作
        </h2>
        <div class="mb-4"><Code language="go" :code="basicCode" title="map_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ nil map 不能写入：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">var m map[K]V</code> 后直接 <code class="bg-amber-100 px-1 rounded text-xs font-mono">m[k]=v</code> 会 panic。总是用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">make(map[K]V)</code> 或字面量初始化。</p>
        </aside>
      </section>

      <!-- 3. comma ok -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          comma ok 惯用法 — Go 的"has()"替代
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map.containsKey()</code>。访问 map 始终可以返回两个值：value 和一个表示"key 是否存在"的 bool。<strong>这是 Go 中最核心的 map 惯用法。</strong>
        </p>
        <div class="mb-4"><Code language="go" :code="commaOkCode" title="comma_ok.go" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么这样设计？</strong>因为不存在和值为零值在语义上是两回事。<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">m["nobody"]</code> 返回 0，但 0 也可能是某个人的分数（考了 0 分）。comma ok 用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">ok=false</code> 明确告诉你"key 不在 map 里"。</p>
        </aside>
      </section>

      <!-- 4. 实战模式 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          实战模式：Set / 计数 / 分组 / 嵌套 Map
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Go 没有内置 Set。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map[T]struct{}</code> 代替（struct{} 占 0 字节内存）。
        </p>
        <div class="mb-4"><Code language="go" :code="patternsCode" title="map_patterns.go" /></div>
      </section>

      <!-- 5. 引用特性、遍历、并发 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          引用特性 · 遍历 · 并发安全
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Map 是引用类型</h3>
        <div class="mb-4"><Code language="go" :code="refCode" title="map_ref.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">遍历（顺序是故意的随机！）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          Go 的 map 遍历顺序是<strong>故意随机的</strong>——每次运行结果可能不同。<strong>这不是 bug，是安全特性。</strong>
          随机化的起始 bucket 索引 + 随机的 bucket 内起始偏移，防止攻击者构造恶意数据利用哈希碰撞搞崩你的服务。
        </p>
        <div class="mb-4"><Code language="go" :code="rangeCode" title="map_range.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">并发安全（sync.Map）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          普通 map <strong>并发读写会直接 fatal error</strong>（不是 panic，无法 recover）。有两种保护方案：
        </p>
        <div class="mb-4"><Code language="go" :code="concurrentCode" title="concurrent_map.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 选型原则：</strong><strong>普通 map + sync.Mutex</strong> 覆盖 95% 场景（类型安全、编译器保护）。<br/>
          <strong>sync.Map</strong> 仅适合：(1) key 只写一次但读很多次（缓存模式），(2) 多个 goroutine 操作不同的 key 集合。如果只是简单的并发读写，不要用 sync.Map——它更慢且失去类型安全。</p>
        </aside>
      </section>

      <!-- 6. 常见陷阱 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱
        </h2>
        <div class="space-y-3">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：nil map 写 panic</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">var m map[string]int</code> → nil map，读返回零值但<strong>写即 panic</strong>。最常发生在 struct 包含 map 字段但没在构造函数里 make 的场景。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：并发读写 fatal error</strong><br/>
            多 goroutine 同时读写同一个 map 会触发 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">fatal error: concurrent map writes</code>——这不是 panic，不能 recover，程序直接崩溃。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：遍历中删除是安全的</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">for k := range m { delete(m, k) }</code> 是合法的，Go 官方保证遍历中安全删除（包括刚被遍历到的 key）。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：map 元素不可取地址</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&amp;m["key"]</code> 编译错误。因为 map 扩容时元素会移动地址。需要取地址的话，赋给临时变量。</p>
          </aside>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>nil map 不可写</strong>——总是 make 或字面量初始化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>comma ok 防零值歧义：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">v, ok := m[k]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>遍历顺序随机</strong>（安全特性）——需要有序时先 sort keys</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>delete 对不存在的 key 安全</strong>，不会 panic</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并发不安全</strong>——普通 map + mutex (95%) 或 sync.Map (缓存/读多写少)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>用 struct{} 做 Set value</strong>——零内存，语义清晰</span></li>
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
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "概述与底层原理" },
  { id: "sec-2", name: "基本操作" },
  { id: "sec-3", name: "comma ok 惯用法" },
  { id: "sec-4", name: "Set / 计数 / 分组" },
  { id: "sec-5", name: "引用 / 遍历 / 并发" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-7", name: "小结" },
]

const basicCode = `// 声明（nil map，不可写！）
var m1 map[string]int  // m1 == nil

// make 创建（推荐）
m2 := make(map[string]int)
// 预分配容量（知道大概要存多少数据时，避免 rehash）
m2large := make(map[string]int, 10000)

// 字面量
m3 := map[string]string{"red": "#F00", "blue": "#00F"}

// 增 / 改
m3["green"] = "#0F0"  // 插入
m3["red"] = "#C00"    // 更新（覆盖）

// 删（对不存在的 key 安全）
delete(m3, "blue")

// 长度
fmt.Println(len(m3))  // 2`

const commaOkCode = `scores := map[string]int{"Alice": 95, "Bob": 87, "Eve": 0}

// 检测 key 是否存在（最核心的 map 惯用法）
if v, ok := scores["Alice"]; ok {
    fmt.Println("Alice 的成绩:", v)  // 输出: Alice 的成绩: 95
}

// 只想知道存在性，不关心值
if _, ok := scores["Nobody"]; !ok {
    fmt.Println("Nobody 不在成绩单中")
}

// ⚠️ 不检测直接访问 → 不存在时返回零值
fmt.Println(scores["Nobody"])  // 0
// 但这样无法区分"不存在"和"值就是 0"！
// Eve 的成绩也是 0（她考了 0 分），但她是存在的
if v, ok := scores["Eve"]; ok {
    fmt.Println("Eve 存在，成绩:", v)  // Eve 存在，成绩: 0
}`

const patternsCode = `// 1️⃣ Set 实现（struct{} 占 0 字节）
set := make(map[string]struct{})
set["apple"] = struct{}{}
set["banana"] = struct{}{}
delete(set, "apple")
if _, ok := set["banana"]; ok { /* banana 在集合中 */ }

// 2️⃣ 计数（≈ Python collections.Counter）
words := []string{"a", "b", "a", "c", "b", "a"}
counts := make(map[string]int)
for _, w := range words {
    counts[w]++  // 不存在的 key 返回零值 0，+1 后就是 1
}
// counts = map[a:3 b:2 c:1]

// 3️⃣ 分组（≈ JS groupBy / SQL GROUP BY）
type User struct{ Name, Role string }
users := []User{
    {"Alice", "admin"}, {"Bob", "user"},
    {"Carol", "admin"}, {"Dave", "user"},
}
byRole := make(map[string][]string)
for _, u := range users {
    byRole[u.Role] = append(byRole[u.Role], u.Name)
}
// byRole = map[admin:[Alice Carol] user:[Bob Dave]]

// 4️⃣ 嵌套 Map
cache := make(map[string]map[string]int)
// ⚠️ 内层 map 也需要 make！
cache["user1"] = make(map[string]int)
cache["user1"]["score"] = 100`

const refCode = `// Map 是引用类型——赋值和传参共享底层数据
m1 := map[string]int{"a": 1}
m2 := m1          // 引用！不是拷贝
m2["a"] = 999
fmt.Println(m1)   // map[a:999]——m1 也被改了！

// 函数传参同理
func modifyMap(m map[string]int) {
    m["x"] = 42
    // 外面也能看到这个修改！
}
// ⚠️ 但如果函数里 m = make(...)，外面不受影响
// 因为改的是局部变量 m 的指向，不是底层数据`

const rangeCode = `m := map[string]int{"a": 1, "b": 2, "c": 3}

// 遍历（顺序随机！每次运行可能不同）
for k, v := range m {
    fmt.Println(k, v)
}
// 可能输出: c 3, a 1, b 2
// 下次可能: b 2, c 3, a 1

// 只遍历 key
for k := range m { fmt.Println(k) }

// 只遍历 value
for _, v := range m { fmt.Println(v) }

// 需要固定顺序：先提取并排序 keys
keys := make([]string, 0, len(m))
for k := range m { keys = append(keys, k) }
sort.Strings(keys)
for _, k := range keys {
    fmt.Println(k, m[k])  // 按字母顺序输出
}`

const concurrentCode = `// 方案一：普通 map + sync.Mutex（推荐，95% 场景）
var (
    cache   = make(map[string]*Data)
    cacheMu sync.Mutex
)
func Get(key string) *Data {
    cacheMu.Lock()
    defer cacheMu.Unlock()
    return cache[key]
}
func Set(key string, val *Data) {
    cacheMu.Lock()
    defer cacheMu.Unlock()
    cache[key] = val
}

// 方案二：sync.Map（仅适读多写少 / goroutine 操作不同 key 的场景）
var sm sync.Map
sm.Store("key", "val")           // 存
if v, ok := sm.Load("key"); ok { // 取
    fmt.Println(v)
}
v, loaded := sm.LoadOrStore("k2", "default") // 有则取，无则存
sm.Delete("key")                 // 删
sm.Range(func(k, v any) bool {  // 遍历
    fmt.Println(k, v)
    return true  // false 停止
})

// ⚠️ sync.Map 缺点：失去类型安全（k,v 都是 any），通常比普通 map+mutex 慢`
</script>
