<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">方法与接口</h1>
          <p class="text-sm text-slate-500 mt-1">值/指针接收者、隐式接口、类型断言</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-13-methods-interfaces.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-13</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 方法：值接收者 vs 指针接收者 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          方法：值接收者 vs 指针接收者
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的类型方法有两种接收者类型。值接收者操作副本，指针接收者操作原值。同一类型的接收者类型应保持统一。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">值接收者 (T)</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">指针接收者 (*T)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">修改接收者</td><td class="px-4 py-2 border border-slate-200">不能</td><td class="px-4 py-2 border border-slate-200"><strong>可以</strong></td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">拷贝成本</td><td class="px-4 py-2 border border-slate-200">整个 struct</td><td class="px-4 py-2 border border-slate-200">仅指针 (8B)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">并发安全</td><td class="px-4 py-2 border border-slate-200">天然安全（副本）</td><td class="px-4 py-2 border border-slate-200">需加锁</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">适用场景</td><td class="px-4 py-2 border border-slate-200">小 struct、数学类型</td><td class="px-4 py-2 border border-slate-200">大 struct、需要修改状态</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="methodsCode" title="methods.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键规则：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">*T</code> 的方法集包含 <code class="bg-amber-100 px-1 rounded text-xs font-mono">T</code> 的方法，反之不成立。如果某个类型需要满足某个 interface，确保接收者类型正确。同一类型不要混用值/指针接收者。</p>
        </aside>
      </section>

      <!-- 接口：隐式实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          接口：隐式实现与嵌入
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的接口是<strong>隐式满足</strong>的——类型无需声明 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">implements</code> 关键字，只要实现了接口的所有方法即自动满足。这使代码解耦且易于测试。
        </p>
        <div class="mb-4"><Code language="go" :code="interfaceCode" title="interface.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>接口应由<strong>消费方</strong>定义，而非实现方。保持接口小而精（1-3 个方法），需要时再组合。常用的 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">io.Reader</code>、<code class="bg-emerald-100 px-1 rounded text-xs font-mono">io.Writer</code> 都是经典单方法接口。</p>
        </aside>
      </section>

      <!-- 空接口与类型断言 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          空接口、类型断言与类型 Switch
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">interface{}</code>（或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">any</code>）可持有任意类型的值。使用<strong>类型断言</strong>取回具体类型。
        </p>
        <div class="mb-4"><Code language="go" :code="emptyInterfaceCode" title="empty_interface.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">失败行为</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">逗号 ok</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">v, ok := x.(T)</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">ok=false</code>，不 panic</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">直接断言</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">v := x.(T)</td><td class="px-4 py-2 border border-slate-200 text-red-600">panic</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">类型 switch</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">switch v := x.(type)</td><td class="px-4 py-2 border border-slate-200">default 分支兜底</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 常用标准接口 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          常用标准接口
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">接口</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">定义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">error</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Error() string</td><td class="px-4 py-2 border border-slate-200">所有错误的抽象</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">fmt.Stringer</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">String() string</td><td class="px-4 py-2 border border-slate-200">自定义打印格式</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">io.Reader</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Read([]byte) (int, error)</td><td class="px-4 py-2 border border-slate-200">一切输入源</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">io.Writer</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Write([]byte) (int, error)</td><td class="px-4 py-2 border border-slate-200">一切输出目标</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">sort.Interface</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Len/Less/Swap</td><td class="px-4 py-2 border border-slate-200">自定义排序</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 接口底层结构：</strong>接口值在运行时是一个 <code class="bg-blue-100 px-1 rounded text-xs font-mono">(type, value)</code> 二元组。动态类型存储实际类型信息，动态值存储实际数据。nil 接口（type=value=nil）与值为 nil 的接口（type != nil, value == nil）有本质区别。</p>
        </aside>
      </section>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-12-new-make" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：new 与 make</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-14-packages-modules" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：包与模块管理 →</RouterLink>
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
    { id: "sec-1", name: "方法：值接收者 vs 指针接收者" },
    { id: "sec-2", name: "接口：隐式实现与嵌入" },
    { id: "sec-3", name: "空接口、类型断言与类型 Switch" },
    { id: "sec-4", name: "常用标准接口" }
  ]
const methodsCode = `// 值接收者 — 操作副本，不修改原值
type Point struct{ X, Y float64 }

func (p Point) Distance() float64 {
    return math.Sqrt(p.X*p.X + p.Y*p.Y)
}

func (p Point) Scale(f float64) Point {
    return Point{p.X * f, p.Y * f}
}

// 指针接收者 — 修改原值
func (p *Point) ScaleInPlace(f float64) {
    p.X *= f
    p.Y *= f
}

p := Point{3, 4}
fmt.Println(p.Distance())      // 5
p.ScaleInPlace(2)              // p 变为 (6, 8)`

const interfaceCode = `// 定义接口
type Speaker interface {
    Speak() string
}

// Dog 和 Cat 隐式实现 Speaker（无需声明 implements）
type Dog struct{ Name string }
type Cat struct{ Name string }

func (d Dog) Speak() string { return d.Name + " says woof!" }
func (c Cat) Speak() string { return c.Name + " says meow!" }

// 接口变量可持有任意实现
var s Speaker
s = Dog{Name: "Rex"}  // ✅
s = Cat{Name: "Luna"} // ✅

// 接口嵌入
type ReadWriter interface {
    Reader  // 嵌入 io.Reader
    Writer  // 嵌入 io.Writer
}`

const emptyInterfaceCode = `// 空接口接受任意类型
var x interface{}
x = 42
x = "hello"
x = []int{1, 2, 3}

// 安全断言 — comma-ok 惯用法
if v, ok := x.(string); ok {
    fmt.Println("string:", v)
}

// 类型 switch — 按类型分发
switch v := x.(type) {
case int:    fmt.Println("int:", v)
case string: fmt.Println("string:", v)
case bool:   fmt.Println("bool:", v)
default:     fmt.Printf("unknown: %T\n", v)
}`
</script>
