<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔤 字符串与字符编码</h1>
          <p class="text-sm text-slate-500 mt-1">strings 包 · byte vs rune · UTF-8 原理 · strconv · bytes 包</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-15-strings-rune.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-15</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 字符串本质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Go 字符串的本质：只读的 byte 切片
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 string 在底层是一个<strong>只读的 []byte</strong>，存储的是 <strong>UTF-8 编码</strong>的字节序列。
          字符串<strong>不可变</strong>——修改会生成新字符串。所有 strings 包函数都返回新字符串。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 与其他语言对比：</strong><br/>
          Go string ≈ JS string（都是不可变的 UTF-8）≈ Python str（不可变）≈ Rust &str<br/>
          <strong>关键差异：</strong>Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">len(s)</code> 返回<strong>字节数</strong>（不是字符数！）<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">s[i]</code> 返回第 i 个<strong>字节</strong>（不是第 i 个字符！）
          </p>
        </aside>
      </section>

      <!-- 2. strings 包 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          strings 包常用函数
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">函数</th><th class="px-4 py-2 border border-slate-200 font-semibold">签名</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Contains</td><td class="px-4 py-2 border font-mono text-xs">Contains(s, sub) bool</td><td class="px-4 py-2 border">是否包含子串</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">HasPrefix / HasSuffix</td><td class="px-4 py-2 border font-mono text-xs">HasPrefix(s, pre) bool</td><td class="px-4 py-2 border">前缀/后缀判断</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Index / LastIndex</td><td class="px-4 py-2 border font-mono text-xs">Index(s, sub) int</td><td class="px-4 py-2 border">子串位置（-1 表示不存在）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Split / SplitN</td><td class="px-4 py-2 border font-mono text-xs">Split(s, sep) []string</td><td class="px-4 py-2 border">分割字符串</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Join</td><td class="px-4 py-2 border font-mono text-xs">Join([]string, sep) string</td><td class="px-4 py-2 border">拼接字符串数组</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Replace / ReplaceAll</td><td class="px-4 py-2 border font-mono text-xs">Replace(s, old, new, n)</td><td class="px-4 py-2 border">替换（n&lt;0=全替换）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Trim / TrimSpace / TrimPrefix</td><td class="px-4 py-2 border font-mono text-xs">Trim(s, cutset) string</td><td class="px-4 py-2 border">去除首尾字符/空白/前缀</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">ToUpper / ToLower</td><td class="px-4 py-2 border font-mono text-xs">ToUpper(s) string</td><td class="px-4 py-2 border">大小写转换</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Repeat</td><td class="px-4 py-2 border font-mono text-xs">Repeat(s, count) string</td><td class="px-4 py-2 border">重复 N 次</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">Fields</td><td class="px-4 py-2 border font-mono text-xs">Fields(s) []string</td><td class="px-4 py-2 border">按空白分割（比 Split 智能）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="stringsCode" title="strings.go" /></div>
      </section>

      <!-- 3. strings.Builder -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          strings.Builder — 高性能字符串拼接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          字符串不可变，每次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">+=</code> 都会分配新内存并拷贝。循环中拼接 N 个字符串会产生 O(N²) 的拷贝量。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">strings.Builder</code> 内部用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code> 动态扩容，避免反复分配。
        </p>
        <div class="mb-4"><Code language="go" :code="builderCode" title="builder.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>循环中拼接 → Builder。少量固定拼接（已知编译时就能确定的）→ <code class="bg-emerald-100 px-1 rounded text-xs font-mono">+</code> 和 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">fmt.Sprintf</code> 更简洁。</p>
        </aside>
      </section>

      <!-- 4. byte vs rune -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          byte vs rune — 理解 UTF-8 的关键
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>byte = uint8（1 字节）= ASCII 字符</strong>。一个英文字母占 1 byte。<br/>
          <strong>rune = int32（4 字节）= Unicode 码点</strong>。一个中文字符占 1 rune（但底层编码为 3~4 byte）。<br/>
          Go 源码和字符串都是 UTF-8 编码——ASCII 字符 1 字节，中文 3 字节，Emoji 4 字节。
        </p>
        <div class="mb-4"><Code language="go" :code="runeCode" title="rune_vs_byte.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 核心陷阱：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">len("你好")</code> = <strong>6</strong>（字节数），不是 2（字符数）。用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">utf8.RuneCountInString(s)</code> 或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">len([]rune(s))</code> 获取字符数。</p>
        </aside>
      </section>

      <!-- 5. range 遍历与修改 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          range 遍历与修改不可变字符串
        </h2>
        <div class="mb-4"><Code language="go" :code="rangeCode" title="range.go" /></div>
        <ul class="space-y-2 text-slate-600 mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for i, r := range s</code> — 按 <strong>rune</strong> 遍历，索引按<strong>字节位置</strong>递增（非字符索引）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for i := 0; i &lt; len(s); i++</code> — 按 <strong>byte</strong> 遍历，索引是字节位置</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>修改字符串 → 转为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]rune</code>（Unicode）或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code>（ASCII/二进制）再转回</span></li>
        </ul>
      </section>

      <!-- 6. strconv 与 bytes 包 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          strconv：字符串与数字互转 / bytes：[]byte 版 strings
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">strconv 包</h4>
            <Code language="go" :code="strconvCode" title="strconv.go" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">bytes 包</h4>
            <Code language="go" :code="bytesCode" title="bytes.go" />
          </div>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 bytes 与 strings 的关系：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">bytes</code> 包是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">strings</code> 的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">[]byte</code> 版本，函数签名几乎一一对应。处理二进制数据或需要频繁修改的内容时用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">[]byte</code>，只读文本用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">string</code>。</p>
        </aside>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>len(s) = 字节数</strong>（不是字符数）——中文/Emoji 占多字节</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>strings 包</strong>覆盖日常操作；循环拼接用 <strong>Builder</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>byte = uint8 (1B ASCII)</strong>，<strong>rune = int32 (4B Unicode)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>for range s</strong> 自动按 rune 遍历，索引按字节递增</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>strconv</strong> 做数字/字符串互转，<strong>bytes</strong> 包是 []byte 版的 strings</span></li>
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
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "字符串本质" },
  { id: "sec-2", name: "strings 包" },
  { id: "sec-3", name: "strings.Builder" },
  { id: "sec-4", name: "byte vs rune" },
  { id: "sec-5", name: "range 与修改" },
  { id: "sec-6", name: "strconv / bytes" },
  { id: "sec-7", name: "小结" },
]

const stringsCode = `s := "Hello, Go 语言！"

// 查找
strings.Contains(s, "Go")        // true
strings.HasPrefix(s, "Hello")    // true
strings.Index(s, "Go")           // 7
strings.LastIndex(s, "o")        // 8

// 分割与拼接
strings.Split("a,b,c", ",")      // ["a" "b" "c"]
strings.Fields(" a  b\tc ")      // ["a" "b" "c"] — 按空白分割，忽略连续空白
strings.Join([]string{"a","b"}, "|") // "a|b"

// 替换
strings.Replace(s, "o", "0", 1)  // "Hell0, Go 语言！" (只替换第1个)
strings.ReplaceAll(s, "o", "0")  // "Hell0, G0 语言！"
strings.TrimSpace("  hi  ")      // "hi"
strings.TrimPrefix(s, "Hello")   // ", Go 语言！"`

const builderCode = `// ❌ 低效：循环中 +=（每次都分配新字符串）
func concatSlow(items []string) string {
    var s string
    for _, item := range items {
        s += item  // O(N²) 拷贝！
    }
    return s
}

// ✅ 高效：strings.Builder（预分配容量更佳）
func concatFast(items []string) string {
    var sb strings.Builder
    sb.Grow(1024)            // 预分配容量，避免扩容
    for _, item := range items {
        sb.WriteString(item)
    }
    return sb.String()
}

sb := &strings.Builder{}
sb.WriteString("Hello")
sb.WriteByte(',')
sb.WriteRune('世')          // 写入单个 Unicode 字符
fmt.Println(sb.String())    // "Hello,世"
sb.Reset()                  // 重置复用，避免重新分配`

const runeCode = `s := "Go语言"

// len — 返回字节数！
fmt.Println(len(s))                           // 8
// G=1 o=1 语=3 言=3 → 总共 8 字节

// 字符数 — 用 utf8 包或转 []rune
fmt.Println(utf8.RuneCountInString(s))        // 4
fmt.Println(len([]rune(s)))                   // 4

// byte 视角 — 原始字节（遍历会拆开中文！）
for i := 0; i < len(s); i++ {
    fmt.Printf("%c(%x) ", s[i], s[i])
}
// 输出: G(47) o(6f) è(e8) ¯(af) (ad) è(e8) ¨(a8) (80)
// 乱码——中文被拆成了 3 个单字节

// rune 视角 — Unicode 码点（正确处理中文）
for i, r := range s {
    fmt.Printf("[%d]=%c(U+%04X) ", i, r, r)
}
// 输出: [0]=G(U+0047) [1]=o(U+006F) [2]=语(U+8BED) [5]=言(U+8A00)
// 索引从 0→1→2→5（跳跃！"语"占了字节 2,3,4）`

const rangeCode = `text := "Go语言"

// ❌ 按字节遍历 — 中文乱码
for i := 0; i < len(text); i++ {
    fmt.Printf("[%d]=%c ", i, text[i])
}
// [0]=G [1]=o [2]=è [3]=¯ [4]=­ [5]=è [6]=¨ [7]=80

// ✅ 按 rune 遍历 — 正确处理 Unicode
for i, r := range text {
    fmt.Printf("[%d]=%c ", i, r)
}
// [0]=G [1]=o [2]=语 [5]=言

// 截取前 3 个字符（而非前 3 个字节）
runes := []rune(text)
first3 := string(runes[:3])  // "Go语"

// 修改字符串 — 用 []rune 或 []byte 中转
b := []rune("你好世界")
b[2] = '新'
fmt.Println(string(b))  // "你好新界"`

const strconvCode = `// 字符串 → 数字（返回值和 error）
i, err := strconv.Atoi("42")          // 42
f, _  := strconv.ParseFloat("3.14", 64) // 3.14
b, _  := strconv.ParseBool("true")      // true

// 数字 → 字符串
s1 := strconv.Itoa(42)                // "42"
s2 := strconv.FormatFloat(3.14, 'f', 2, 64) // "3.14"
s3 := strconv.FormatBool(true)        // "true"

// 进制转换
hex := strconv.FormatInt(255, 16)     // "ff"
bin := strconv.FormatInt(255, 2)      // "11111111"`

const bytesCode = `// bytes 包 — []byte 版的 strings（API 几乎一样）
b := []byte("Hello, Go!")

bytes.Contains(b, []byte("Go"))       // true
bytes.HasPrefix(b, []byte("Hello"))    // true
bytes.Split(b, []byte(","))            // [[72 101...] [32 71 111 33]]
bytes.ReplaceAll(b, []byte("o"), []byte("0"))
bytes.TrimSpace(b)

// strings 和 bytes 的互转
s := string(b)                         // []byte → string（拷贝）
b2 := []byte(s)                        // string → []byte（拷贝）

// strings.Builder vs bytes.Buffer
var buf bytes.Buffer                  // bytes.Buffer — 类似 strings.Builder
buf.Write([]byte("hello"))
buf.WriteString(" world")             // 也支持 WriteString
fmt.Println(buf.String())             // "hello world"`
</script>
