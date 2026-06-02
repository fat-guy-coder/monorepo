<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">单元测试</h1><p class="text-sm text-slate-500 mt-1">表格驱动测试 · t.Run/t.Helper · t.Parallel · 覆盖率</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-19-testing.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-19</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>表格驱动测试 — Go 测试核心模式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 没有断言库和测试框架，标准库 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">testing</code> 就是全部。<strong>表格驱动测试</strong>用一个结构体切片定义多组输入/期望，循环驱动统一逻辑——这正是 Go 社区最推崇的模式。</p>
        <div class="mb-4"><Code language="go" :code="tableTestCode" title="math_test.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么表格驱动：</strong>新增用例只需加一行数据；每个用例有 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">name</code> 字段自我描述；失败时通过子测试名精确定位。这是 Go 测试设计的核心哲学。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>t.Run — 子测试分组</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">t.Run(name, func)</code> 创建具名子测试。每个子测试独立运行、独立报告、可单独筛选：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go test -run TestXxx/name</code>。</p>
        <div class="mb-4"><Code language="go" :code="subtestCode" title="subtest.go" /></div>
        <div class="mb-4"><Code language="bash" :code="subtestOutput" title="📟 Terminal" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>t.Helper — 测试辅助函数</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">t.Helper()</code> 标记当前函数为测试辅助函数，失败时框架跳过该函数，直接报告<strong>调用者</strong>的位置和栈信息。无此标记则报错指向 helper 内部——毫无意义。</p>
        <div class="mb-4"><Code language="go" :code="helperCode" title="helper.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">t.Helper()</code> 必须是辅助函数内的<strong>第一条语句</strong>。忘记加会导致测试失败时报告混乱的栈信息，排查效率直线下降。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>t.Parallel — 并行执行</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">t.Parallel()</code> 标记子测试可并行运行。父测试函数返回后，所有标记的子测试同时调度执行。粒度由 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">-parallel N</code> 控制（默认 GOMAXPROCS）。</p>
        <div class="mb-4"><Code language="go" :code="parallelCode" title="parallel_test.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>测试覆盖率</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">命令</th><th class="px-4 py-2 border border-slate-200 font-semibold">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">go test -cover</td><td class="px-4 py-2 border text-xs">控制台输出覆盖率百分比</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs">go test -coverprofile=c.out ./...</td><td class="px-4 py-2 border text-xs">生成覆盖率数据文件</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go tool cover -html=c.out</td><td class="px-4 py-2 border text-xs">浏览器查看逐行覆盖状态</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs">go tool cover -func=c.out</td><td class="px-4 py-2 border text-xs">终端按函数统计覆盖率</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go test -coverpkg ./...</td><td class="px-4 py-2 border text-xs">跨包计算覆盖率（非仅当前包）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 覆盖率 != 测试质量：</strong>100% 代码覆盖不等于没有 bug——未覆盖的是分支逻辑和边界条件。覆盖率的真正价值是<strong>发现未测试的代码路径</strong>，作为补充用例的参考。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>测试文件与命名规范</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">命名</th><th class="px-4 py-2 border border-slate-200 font-semibold">运行方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">TestXxx</td><td class="px-4 py-2 border font-mono text-xs">func TestAdd(t *testing.T)</td><td class="px-4 py-2 border font-mono text-xs">go test</td><td class="px-4 py-2 border text-xs">单元/集成测试</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-cyan-700">BenchmarkXxx</td><td class="px-4 py-2 border font-mono text-xs">func BenchmarkAdd(b *testing.B)</td><td class="px-4 py-2 border font-mono text-xs">go test -bench=.</td><td class="px-4 py-2 border text-xs">性能基准</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">ExampleXxx</td><td class="px-4 py-2 border font-mono text-xs">func ExampleAdd() { // Output: }</td><td class="px-4 py-2 border font-mono text-xs">go test</td><td class="px-4 py-2 border text-xs">既是测试也是文档</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-xs text-cyan-700">FuzzXxx</td><td class="px-4 py-2 border font-mono text-xs">func FuzzAdd(f *testing.F)</td><td class="px-4 py-2 border font-mono text-xs">go test -fuzz=.</td><td class="px-4 py-2 border text-xs">模糊测试 (Go 1.18+)</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 leading-relaxed">测试文件必须以 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">_test.go</code> 结尾，与源码同目录。测试函数名必须以 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Test</code> 开头。</p>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>表格驱动 = 一条逻辑 + N 组数据</strong>，新增用例只需加一行，是 Go 测试的惯用法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">t.Run</code> 让每个用例独立运行，可单独筛选、并行执行</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>任何辅助函数第一行写</strong> <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">t.Helper()</code>，否则测试框架报错位置错误</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">t.Parallel()</code> 放在子测试闭包内，与循环变量捕获配合使用（Go 1.22+ 已自动修复）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>覆盖率是发现盲区的工具，不是质量目标——关注未覆盖的分支而非百分比</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-18-file-io" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：文件 I/O</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Goroutine 与 GMP →</RouterLink>
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
    { id: "sec-1", name: "表格驱动测试 — Go 测试核心模式" },
    { id: "sec-2", name: "t.Run — 子测试分组" },
    { id: "sec-3", name: "t.Helper — 测试辅助函数" },
    { id: "sec-4", name: "t.Parallel — 并行执行" },
    { id: "sec-5", name: "测试覆盖率" },
    { id: "sec-6", name: "测试文件与命名规范" },
    { id: "sec-7", name: "关键点" }
  ]
const tableTestCode = `// 文件: math_test.go
package main

import "testing"

func TestAdd(t *testing.T) {
    // 表格：一个结构体切片定义所有测试用例
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"正数相加", 2, 3, 5},
        {"零值",     0, 0, 0},
        {"负数相加", -2, -3, -5},
        {"正负混合", -5, 10, 5},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("Add(%d,%d)=%d, want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}`

const subtestCode = `// 子测试分组 — 层次化组织
func TestMath(t *testing.T) {
    // 顶层分组
    t.Run("Addition", func(t *testing.T) {
        t.Run("positive", func(t *testing.T) {
            if Add(2, 3) != 5 { t.Fatal("2+3 != 5") }
        })
        t.Run("negative", func(t *testing.T) {
            if Add(-2, -3) != -5 { t.Fatal("-2+-3 != -5") }
        })
    })
    t.Run("Subtraction", func(t *testing.T) {
        if Sub(10, 3) != 7 { t.Fatal("10-3 != 7") }
    })
}`

const subtestOutput = `# 运行所有子测试
$ go test -v -run TestMath
=== RUN   TestMath
=== RUN   TestMath/Addition
=== RUN   TestMath/Addition/positive
=== RUN   TestMath/Addition/negative
=== RUN   TestMath/Subtraction
--- PASS: TestMath (0.00s)

# 运行特定子测试
$ go test -run "TestMath/Addition/positive"
ok      example  0.001s`

const helperCode = `// ❌ 无 t.Helper — 失败指向这里（无用！）
func assertEqualBad(t *testing.T, got, want int) {
    if got != want {
        t.Errorf("got %d, want %d", got, want)
        // 栈信息指向此文件的此行为 ← 无法定位调用的测试
    }
}

// ✅ 有 t.Helper — 失败指向调用者（正确！）
func assertEqual(t *testing.T, got, want int) {
    t.Helper()  // ← 必须是第一条语句
    if got != want {
        t.Errorf("got %d, want %d", got, want)
        // 栈信息跳过此行，直接报告调用 assertEqual 的测试
    }
}

func TestAdd(t *testing.T) {
    assertEqual(t, Add(2, 3), 5)      // 失败时报告这行
    assertEqual(t, Add(-1, -2), -3)
}`

const parallelCode = `func TestParallel(t *testing.T) {
    tests := []struct {
        name string
        a, b, want int
    }{
        {"case1", 1, 2, 3},
        {"case2", 3, 4, 7},
        {"case3", 5, 6, 11},
    }
    for _, tt := range tests {
        tt := tt  // Go 1.21-: 闭包必须重新绑定; Go 1.22+: 自动
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()  // 所有子测试并行执行
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("got %d, want %d", got, tt.want)
            }
        })
    }
    // 父测试返回后，所有 t.Parallel 标记的子测试同时开始
}

// 运行: go test -parallel 4   (限制 4 个并发)
// 默认: GOMAXPROCS 个并发`
</script>
