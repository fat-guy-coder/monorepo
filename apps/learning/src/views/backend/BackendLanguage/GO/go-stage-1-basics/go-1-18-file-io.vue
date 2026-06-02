<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">文件 I/O</h1><p class="text-sm text-slate-500 mt-1">os.ReadFile/WriteFile · bufio.Scanner · filepath · embed · ioutil 迁移</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-18-file-io.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-18</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>读写整个文件</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 1.16 起，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">os.ReadFile</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">os.WriteFile</code> 是最简单的读写方式，一次性加载或写入全部内容，适合中小文件。</p>
        <div class="mb-4"><Code language="go" :code="readWriteCode" title="read_write.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">os.ReadFile</code> 将整个文件加载到内存，大文件（数百MB+）应使用流式读取。文件不存在时返回 <code class="bg-amber-100 px-1 rounded text-xs font-mono">*os.PathError</code>，可用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">os.IsNotExist(err)</code> 判断。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>os.Open / os.Create / 文件模式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">精细控制打开模式时使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">os.OpenFile</code>。内存管理和及时关闭是关键。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">函数</th><th class="px-4 py-2 border border-slate-200 font-semibold">等价</th><th class="px-4 py-2 border border-slate-200 font-semibold">权限</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">os.Open(name)</td><td class="px-4 py-2 border font-mono text-xs">OpenFile(name, O_RDONLY, 0)</td><td class="px-4 py-2 border text-xs">只读，文件必须存在</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">os.Create(name)</td><td class="px-4 py-2 border font-mono text-xs">OpenFile(name, O_RDWR|O_CREATE|O_TRUNC, 0666)</td><td class="px-4 py-2 border text-xs">创建或清空，读写</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="openCode" title="file_open.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>bufio.Scanner — 逐行/逐词读取</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">bufio.Scanner</code> 默认按行扫描，也可通过 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Split()</code> 切换为按词、按字节等。它内部使用缓冲区，对大文件友好。</p>
        <div class="mb-4"><Code language="go" :code="scannerCode" title="bufio_scanner.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>大文件逐行处理首选 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">bufio.Scanner</code>。它默认缓冲 64KB，可通过 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">scanner.Buffer(buf, maxSize)</code> 调大。注意 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">scanner.Err()</code> 检查错误，否则可能静默丢失数据。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>filepath — 跨平台路径操作</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">path/filepath</code> 处理操作系统路径——自动适配 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">\</code> 分隔符。与 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">path</code> 包的区别：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">path</code> 处理 URL/Unix 路径，不应用于文件路径。</p>
        <div class="mb-4"><Code language="go" :code="filepathCode" title="filepath.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>embed — 编译时嵌入文件 (Go 1.16+)</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">//go:embed</code> 指令在编译时将文件/目录嵌入二进制，运行时无需磁盘 I/O。支持三种目标类型：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">string</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[]byte</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">embed.FS</code>。</p>
        <div class="mb-4"><Code language="go" :code="embedCode" title="embed.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>ioutil 迁移指南 (Go 1.16+)</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 1.16 废弃 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">io/ioutil</code>，功能已分散到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">os</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">io</code> 包。迁移就是去前缀。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">旧 (ioutil)</th><th class="px-4 py-2 border border-slate-200 font-semibold">新</th><th class="px-4 py-2 border border-slate-200 font-semibold">注意</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.ReadFile</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">os.ReadFile</td><td class="px-4 py-2 border text-xs">直接替换</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.WriteFile</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">os.WriteFile</td><td class="px-4 py-2 border text-xs">直接替换</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.ReadAll</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">io.ReadAll</td><td class="px-4 py-2 border text-xs">直接替换</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.ReadDir</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">os.ReadDir</td><td class="px-4 py-2 border text-xs">返回 []os.DirEntry 而非 []os.FileInfo</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.TempFile</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">os.CreateTemp</td><td class="px-4 py-2 border text-xs">参数顺序不同</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.TempDir</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">os.MkdirTemp</td><td class="px-4 py-2 border text-xs">参数顺序不同</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.NopCloser</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">io.NopCloser</td><td class="px-4 py-2 border text-xs">直接替换</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-red-600 line-through">ioutil.Discard</td><td class="px-4 py-2 border font-mono text-emerald-700 text-xs">io.Discard</td><td class="px-4 py-2 border text-xs">直接替换</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>小文件用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">os.ReadFile/WriteFile</code>，大文件用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">bufio.Scanner</code> 流式处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">defer f.Close()</code> 写在 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">os.Open</code> 之后立即 defer，避免遗忘</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">path/filepath</code> 适配 OS 分隔符；<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">path</code> 仅用于 URL</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">//go:embed</code> 路径相对于源文件目录，不能使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">..</code> 向上引用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 1.16+ 新代码禁止使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">io/ioutil</code>，IDE 的 quick fix 可一键迁移</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-17-time" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：时间处理</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-19-testing" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：单元测试 →</RouterLink>
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
    { id: "sec-1", name: "读写整个文件" },
    { id: "sec-2", name: "os.Open / os.Create / 文件模式" },
    { id: "sec-3", name: "bufio.Scanner — 逐行/逐词读取" },
    { id: "sec-4", name: "filepath — 跨平台路径操作" },
    { id: "sec-5", name: "embed — 编译时嵌入文件 (Go 1.16+)" },
    { id: "sec-6", name: "ioutil 迁移指南 (Go 1.16+)" },
    { id: "sec-7", name: "关键点" }
  ]
const readWriteCode = `// 写入文件
data := []byte("Hello, Go!\n")
err := os.WriteFile("output.txt", data, 0644)
if err != nil {
    log.Fatal(err)
}

// 读取文件
content, err := os.ReadFile("output.txt")
if err != nil {
    if os.IsNotExist(err) {
        fmt.Println("文件不存在")
        return
    }
    log.Fatal(err)
}
fmt.Print(string(content))  // Hello, Go!`

const openCode = `// 只读打开
f, err := os.Open("input.txt")
if err != nil { log.Fatal(err) }
defer f.Close()

// 创建/清空写入
f, err = os.Create("output.txt")
if err != nil { log.Fatal(err) }
defer f.Close()
f.Write([]byte("hello\n"))
f.WriteString("world\n")

// 自定义模式：追加写入
f, err = os.OpenFile("log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
if err != nil { log.Fatal(err) }
defer f.Close()
f.WriteString("append this line\n")

// 文件信息
info, _ := f.Stat()
fmt.Println(info.Name(), info.Size(), info.Mode(), info.IsDir())`

const scannerCode = `// 默认按行扫描
f, _ := os.Open("data.txt")
defer f.Close()
scanner := bufio.NewScanner(f)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}
if err := scanner.Err(); err != nil {
    log.Fatal(err)  // 务必检查！
}

// 按词扫描
scanner.Split(bufio.ScanWords)
for scanner.Scan() {
    fmt.Println(scanner.Text())  // 每个词
}

// 自定义分割函数
scanner.Split(bufio.ScanLines)   // 默认
scanner.Split(bufio.ScanWords)   // 按空格
scanner.Split(bufio.ScanRunes)   // 按 Unicode 字符
scanner.Split(bufio.ScanBytes)   // 按字节

// 大 buffer（行长超过 64KB 时）
scanner.Buffer(make([]byte, 0, 1024*1024), 10*1024*1024)  // 10MB max`

const filepathCode = `// Join — 跨平台路径拼接
p := filepath.Join("dir", "subdir", "file.txt")
// Unix: "dir/subdir/file.txt", Windows: "dir\\subdir\\file.txt"

// Dir / Base / Ext
filepath.Dir("/a/b/c.txt")   // "/a/b"
filepath.Base("/a/b/c.txt")  // "c.txt"
filepath.Ext("main.go")      // ".go"

// Walk — 递归遍历
filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
    if err != nil { return err }
    if info.IsDir() { return nil }
    fmt.Println(path)
    return nil
})

// Glob — 模式匹配（不支持 ** 递归）
matches, _ := filepath.Glob("*.go")
// → ["main.go", "utils.go"]

// Abs / Rel
abs, _ := filepath.Abs("./data")        // 转为绝对路径
rel, _ := filepath.Rel("/a/b/c", "/a")  // 计算相对路径 "..\\.."`

const embedCode = `import "embed"

// 嵌入单个文件 — string / []byte
//go:embed config.json
var configData string
//go:embed logo.png
var logoBytes []byte

// 嵌入整个目录树 — embed.FS
//go:embed static/* templates/*
var webAssets embed.FS

// 使用时像 os 文件系统一样操作
content, _ := webAssets.ReadFile("static/style.css")
dir, _ := webAssets.ReadDir("templates")
for _, entry := range dir {
    fmt.Println(entry.Name(), entry.IsDir())
}

// 注意：
// 1. 路径相对于源文件所在目录
// 2. 不允许 ../ 向上引用
// 3. 空 import "embed" 是编译错误`
</script>
