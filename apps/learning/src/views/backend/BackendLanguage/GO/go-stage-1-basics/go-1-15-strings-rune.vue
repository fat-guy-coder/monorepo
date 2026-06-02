<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">字符串与字符编码</h1>
          <p class="text-sm text-slate-500 mt-1">strings 包操作、rune vs byte、UTF-8 处理</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-15-strings-rune.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-15</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- strings 常用函数 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          strings 包常用函数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">strings</code> 包提供了丰富的字符串操作函数，均返回新字符串（字符串不可变）。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">函数</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">签名</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">Contains</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Contains(s, sub) bool</td><td class="px-4 py-2 border border-slate-200">是否包含子串</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">HasPrefix / HasSuffix</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">HasPrefix(s, prefix) bool</td><td class="px-4 py-2 border border-slate-200">前缀/后缀判断</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">Split / Join</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Split(s, sep) []string / Join([]string, sep) string</td><td class="px-4 py-2 border border-slate-200">分割与拼接</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">Replace</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Replace(s, old, new, n) string</td><td class="px-4 py-2 border border-slate-200">替换（n &lt; 0 全替换）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">Trim / TrimSpace</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Trim(s, cutset) string / TrimSpace(s) string</td><td class="px-4 py-2 border border-slate-200">去除前后字符/空白</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">ToUpper / ToLower</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">ToUpper(s) string / ToLower(s) string</td><td class="px-4 py-2 border border-slate-200">大小写转换</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">Repeat</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Repeat(s, count) string</td><td class="px-4 py-2 border border-slate-200">重复 N 次</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="stringsCode" title="strings.go" /></div>
      </section>

      <!-- strings.Builder -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          strings.Builder：高效字符串拼接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          字符串不可变，每次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">+=</code> 都会分配新内存。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">strings.Builder</code> 内部使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code>，预分配缓冲区，避免反复拷贝。
        </p>
        <div class="mb-4"><Code language="go" :code="builderCode" title="builder.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>循环中拼接字符串始终用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">strings.Builder</code>。通过 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Grow(n)</code> 预分配容量可进一步提升性能。</p>
        </aside>
      </section>

      <!-- rune vs byte -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          byte vs rune
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 源码和字符串都使用 UTF-8 编码。一个 "字符" 可能占 1~4 个字节。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">byte</code> 是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">uint8</code> 的别名（ASCII 安全），<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rune</code> 是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int32</code> 的别名（Unicode 码点）。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">底层</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">大小</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">byte</td><td class="px-4 py-2 border border-slate-200">uint8</td><td class="px-4 py-2 border border-slate-200">1 字节</td><td class="px-4 py-2 border border-slate-200">单字节（ASCII）、二进制数据</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">rune</td><td class="px-4 py-2 border border-slate-200">int32</td><td class="px-4 py-2 border border-slate-200">1~4 字节</td><td class="px-4 py-2 border border-slate-200">Unicode 码点、中文/Emoji</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="runeCode" title="rune_vs_byte.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 核心陷阱：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">len("你好")</code> 返回 <strong>6</strong>（字节数），不是 2（字符数）。使用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">utf8.RuneCountInString(s)</code> 获取字符数。<code class="bg-amber-100 px-1 rounded text-xs font-mono">s[i]</code> 返回第 i 个<strong>字节</strong>，不是第 i 个字符。</p>
        </aside>
      </section>

      <!-- range 遍历与不可变性 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          range 遍历与字符串不可变性
        </h2>
        <div class="mb-4"><Code language="go" :code="rangeCode" title="range.go" /></div>
        <ul class="space-y-2 text-slate-600 mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for range s</code> 自动按 <strong>rune</strong> 遍历，索引按字节位置递增</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>字符串不可变：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">s[0] = 'H'</code> 编译报错。需转为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]rune</code> 修改后再转回</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code> 适用于 ASCII/二进制，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]rune</code> 适用于 Unicode 文本</span></li>
        </ul>
      </section>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-14-packages-modules" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：包与模块管理</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-16-error-handling" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：错误处理 →</RouterLink>
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
    { id: "sec-1", name: "strings 包常用函数" },
    { id: "sec-2", name: "strings.Builder：高效字符串拼接" },
    { id: "sec-3", name: "byte vs rune" },
    { id: "sec-4", name: "range 遍历与字符串不可变性" }
  ]
const stringsCode = `s := "Hello, Go Gopher!"

// 查找
strings.Contains(s, "Go")       // true
strings.HasPrefix(s, "Hello")   // true
strings.HasSuffix(s, "!")       // true

// 分割与拼接
parts := strings.Split("a,b,c", ",")  // ["a" "b" "c"]
strings.Join(parts, " | ")            // "a | b | c"

// 替换
strings.Replace(s, "o", "0", 2)       // "Hell0, G0 Gopher!"
strings.Replace(s, "o", "0", -1)      // "Hell0, G0 G0pher!"`

const builderCode = `var sb strings.Builder

// 链式写入
sb.WriteString("Hello")
sb.WriteString(", ")
sb.WriteByte('G')
sb.WriteRune('o')

result := sb.String()   // "Hello, Go"
fmt.Println(sb.Len())   // 9  — 已写入字节数
fmt.Println(sb.Cap())   // 16 — 内部缓冲区容量

sb.Reset()              // 重置复用，避免重新分配
sb.Grow(1024)           // 预分配容量，减少扩容`

const runeCode = `s := "Go语言"
// len(s) == 8  （Go=2字节 + 语言=6字节）
// utf8.RuneCountInString(s) == 4

// byte 视角 — 原始 UTF-8 字节
for i := 0; i < len(s); i++ {
    fmt.Printf("%x ", s[i])
}
// 47 6f e8 af ad e8 a8 80

// rune 视角 — Unicode 码点
for _, r := range s {
    fmt.Printf("%c(%U) ", r, r)
}
// G(U+0047) o(U+006F) 语(U+8BED) 言(U+8A00)`

const rangeCode = `text := "Go语言"

// 按字节遍历 — 不推荐用于文本
for i := 0; i < len(text); i++ {
    fmt.Printf("[%d]=%c ", i, text[i])
}
// [0]=G [1]=o [2]=è [3]=¯ [4]=­ [5]=è [6]=¨ [7]=80 （乱码！）

// 按 rune 遍历 — 推荐
for i, r := range text {
    fmt.Printf("[%d]=%c ", i, r)
}
// [0]=G [1]=o [2]=语 [5]=言 （索引跳跃，字节[2-4]编码"语"）

// 修改字符串 — 必须转为可写切片
b := []rune("你好世界")
b[2] = '新'
fmt.Println(string(b))  // "你好新世界"`
</script>
