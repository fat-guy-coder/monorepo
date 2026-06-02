<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">错误处理</h1>
          <p class="text-sm text-slate-500 mt-1">error 接口、错误包装、errors.Is/As/Join</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-16-error-handling.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-16</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- error 接口与基础用法 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          error 接口
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 用 <strong>error 值</strong> 而非异常处理错误。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">error</code> 是内置接口，只有一个方法 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Error() string</code>。约定 error 是函数的<strong>最后一个返回值</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="errorBasics" title="error_basics.go" /></div>
      </section>

      <!-- 哨兵错误 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          哨兵错误 (Sentinel Errors)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          包级别预定义的错误值，调用方用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">==</code> 或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errors.Is</code> 比较。
        </p>
        <div class="mb-4"><Code language="go" :code="sentinelCode" title="sentinel.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>哨兵错误一旦公开就属于 API，修改其语义会破坏下游。变体信息（如 ID、字段名）应通过<strong>自定义错误类型</strong>传递，而非哨兵错误。</p>
        </aside>
      </section>

      <!-- 错误包装与 errors.Is -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          错误包装：%w 与 errors.Is
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Errorf("...: %w", err)</code> 包装一个错误，保留原始错误链。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errors.Is</code> 沿链向上查找匹配。
        </p>
        <div class="mb-4"><Code language="go" :code="wrapCode" title="error_wrapping.go" /></div>
      </section>

      <!-- errors.As -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          errors.As：提取具体错误类型
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errors.As</code> 沿错误链查找第一个匹配类型，并将值赋给目标指针。
        </p>
        <div class="mb-4"><Code language="go" :code="asCode" title="errors_as.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">匹配方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">errors.Is</td><td class="px-4 py-2 border border-slate-200">值相等（或实现了 Is 方法）</td><td class="px-4 py-2 border border-slate-200">判断是否是某个哨兵错误</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">errors.As</td><td class="px-4 py-2 border border-slate-200">类型匹配</td><td class="px-4 py-2 border border-slate-200">提取自定义错误的字段信息</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- errors.Join 与自定义错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          errors.Join 与自定义错误类型
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.20 引入 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errors.Join</code> 可合并多个错误，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errors.Is</code> 匹配任一即可。
        </p>
        <div class="mb-4"><Code language="go" :code="joinCustomCode" title="errors_join_custom.go" /></div>
      </section>

      <!-- 最佳实践 -->
      <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
        <p class="text-sm text-emerald-800"><strong>✅ 错误处理最佳实践：</strong></p>
        <ul class="space-y-1 text-sm text-emerald-800 mt-2">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>返回 error，不要 panic</strong>，除非程序无法继续（如配置文件不可读）</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>使用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">%w</code> 包装错误，保留错误链，不要用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">%v</code></span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>调用方用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">errors.Is</code> / <code class="bg-emerald-100 px-1 rounded text-xs font-mono">errors.As</code>，不要 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">==</code> 比较包装过的错误</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>错误消息小写开头，不含句号 — 调用方会拼接上下文</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span>每个错误只处理一次：要么记录日志，要么向上传递，不要两样都做</span></li>
        </ul>
      </aside>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-15-strings-rune" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：字符串与字符编码</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-17-time" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：time 包 →</RouterLink>
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
    { id: "sec-1", name: "error 接口" },
    { id: "sec-2", name: "哨兵错误 (Sentinel Errors)" },
    { id: "sec-3", name: "错误包装：%w 与 errors.Is" },
    { id: "sec-4", name: "errors.As：提取具体错误类型" },
    { id: "sec-5", name: "errors.Join 与自定义错误类型" }
  ]
const errorBasics = `// error 是内置接口
type error interface {
    Error() string
}

// 创建错误
err1 := errors.New("something went wrong")
err2 := fmt.Errorf("failed to read %s", filename)

// 惯用检查
if f, err := os.Open("file.txt"); err != nil {
    return fmt.Errorf("open: %w", err)  // 包装后向上传递
}`

const sentinelCode = `// 包级别哨兵错误
var (
    ErrNotFound   = errors.New("not found")
    ErrPermission = errors.New("permission denied")
)

// 使用哨兵
func FindUser(id int) (*User, error) {
    if id <= 0 {
        return nil, ErrNotFound
    }
    // ...
}

// 调用方检查（推荐 errors.Is）
if errors.Is(err, ErrNotFound) {
    // 处理未找到
}`

const wrapCode = `// 错误包装 — 使用 %w
func readConfig(path string) error {
    data, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("read config %s: %w", path, err)
    }
    // ...
}

// 调用方检查
err := readConfig("config.yaml")
if err != nil {
    // errors.Is 沿链查找
    if errors.Is(err, fs.ErrNotExist) {
        log.Println("配置文件不存在，使用默认值")
        return
    }
    log.Fatal(err)
}`

const asCode = `// 自定义错误类型
type PathError struct {
    Op   string
    Path string
    Err  error
}
func (e *PathError) Error() string {
    return fmt.Sprintf("%s %s: %v", e.Op, e.Path, e.Err)
}

// errors.As 提取具体类型
if err := doSomething(); err != nil {
    var pathErr *PathError
    if errors.As(err, &pathErr) {
        // 获取 PathError 的字段
        fmt.Printf("操作: %s, 路径: %s\n", pathErr.Op, pathErr.Path)
    }
}`

const joinCustomCode = `// errors.Join — 合并多个错误 (Go 1.20+)
err := errors.Join(err1, err2, err3)
// errors.Is(err, err1) == true
// errors.Is(err, err2) == true

// 自定义错误类型（富错误信息）
type ValidationError struct {
    Field string
    Value any
}
func (e *ValidationError) Error() string {
    return fmt.Sprintf("invalid %s: %v", e.Field, e.Value)
}

// 调用方提取
var valErr *ValidationError
if errors.As(err, &valErr) {
    fmt.Printf("字段 %s 不合法\n", valErr.Field)
}`
</script>
