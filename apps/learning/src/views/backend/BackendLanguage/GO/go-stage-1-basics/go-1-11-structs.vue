<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">结构体</h1><p class="text-sm text-slate-500 mt-1">自定义类型 · 嵌入 · 标签 · 空结构体</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-11-structs.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-11</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>定义与初始化</h2>
        <div class="mb-4"><Code language="go" :code="defineCode" title="struct_define.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>嵌入（Composition）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 没有继承。通过<strong>匿名字段嵌入</strong>实现组合——外层自动获得被嵌入类型的字段和方法（提升）。</p>
        <div class="mb-4"><Code language="go" :code="embedCode" title="struct_embed.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 组合优于继承：</strong>嵌入不是子类型关系，不能把 Employee 当 Address 传给函数。这是一种语法糖，使 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">emp.Street</code> 等价于 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">emp.Address.Street</code>。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>结构体标签（Tags）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">反射读取的元数据，最常用于 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json</code> 序列化。格式：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">key:"value"</code>，多个标签空格分隔。</p>
        <div class="mb-4"><Code language="go" :code="tagCode" title="struct_tag.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>空结构体 struct{} — 0 字节</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">不占内存，用作信号传递和集合实现。</p>
        <div class="mb-4"><Code language="go" :code="emptyCode" title="empty_struct.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结构体是<strong>值类型</strong>——赋值和传参会复制整个结构体</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>大结构体传参用指针避免拷贝</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>嵌入 = 语法糖，不是继承</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">struct{}</code> 零内存——channel 信号、map 集合的理想选择</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-10-pointers" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：指针</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-12-new-make" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：new 与 make →</RouterLink>
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
    { id: "sec-1", name: "定义与初始化" },
    { id: "sec-2", name: "嵌入（Composition）" },
    { id: "sec-3", name: "结构体标签（Tags）" },
    { id: "sec-4", name: "空结构体 struct{} — 0 字节" },
    { id: "sec-5", name: "关键点" }
  ]
const defineCode = `type Person struct {
    Name string
    Age  int
}
// 命名字段（推荐）
p1 := Person{Name: "张三", Age: 28}
// 位置初始化（不推荐）
p2 := Person{"李四", 32}
// 指针
p3 := &Person{Name: "王五"}     // 常用：构造返回指针
// 匿名结构体
anon := struct{ X, Y int }{10, 20}`

const embedCode = `type Address struct { Street, City string }
type Employee struct {
    Name    string
    Address            // 嵌入（匿名字段）
}
emp := Employee{Name: "A", Address: Address{Street: "1号"}}
fmt.Println(emp.Street)  // 提升字段，等价 emp.Address.Street
// 注意：JSON 序列化时嵌入字段会平铺展开`

const tagCode = 'type User struct {\n' +
'    ID       int    `json:"id"`\n' +
'    Name     string `json:"name" validate:"required"`\n' +
'    Password string `json:"-"`\n' +
'}\n' +
'// json.Marshal(user) -> {"id":1,"name":"testuser"}'

const emptyCode = `// 信号通知（0 字节）
done := make(chan struct{})
go func() { /* work */; done <- struct{}{} }()
<-done

// 集合 Set
set := make(map[string]struct{})
set["Go"] = struct{}{}
if _, ok := set["Go"]; ok { /* ... */ }`
</script>
