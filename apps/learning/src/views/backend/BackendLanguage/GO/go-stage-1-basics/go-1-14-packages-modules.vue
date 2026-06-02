<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">包与模块管理</h1>
          <p class="text-sm text-slate-500 mt-1">导出规则、导入模式、init、internal、构建标签</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-14-packages-modules.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 导出规则 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          导出规则：首字母决定可见性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">public</code>/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">private</code> 关键字。标识符首字母<strong>大写</strong>即导出，<strong>小写</strong>即包内私有。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">规则</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">可见性</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">大写开头</td><td class="px-4 py-2 border border-slate-200">导出（跨包可访问）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs text-cyan-700">fmt.Println, http.Server</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">小写开头</td><td class="px-4 py-2 border border-slate-200">未导出（仅本包内）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">os.mkdirAll, reflect.unescape</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-slate-500">此规则适用于：类型、函数、方法、变量、常量、结构体字段。</p>
      </section>

      <!-- 导入模式 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          导入模式
        </h2>
        <div class="mb-4"><Code language="go" :code="importCode" title="imports.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>未使用的导入会导致<strong>编译错误</strong>。使用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_</code> 前缀仅执行包的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">init()</code> 而不直接调用。运行 <code class="bg-amber-100 px-1 rounded text-xs font-mono">goimports</code> 可以自动管理导入。</p>
        </aside>
      </section>

      <!-- init 函数 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          init() 函数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code> 在包被导入时自动执行，用于初始化全局状态、注册驱动或校验配置。
        </p>
        <div class="mb-4"><Code language="go" :code="initCode" title="init.go" /></div>
        <ul class="space-y-2 text-slate-600 mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>每个文件可有多个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code>，按声明顺序执行</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>执行链：导入包的 init → 当前包的 init → main()</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>典型用途：数据库驱动注册（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">import _ "github.com/lib/pq"</code>）</span></li>
        </ul>
      </section>

      <!-- internal 包 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          internal 包
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 编译器对 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/internal/</code> 目录有特殊规则：该目录下的包<strong>只能被其父级目录树内的代码导入</strong>，外部导入会编译报错。
        </p>
        <div class="mb-4"><Code language="text" :code="internalStructure" title="internal 目录结构" /></div>
        <p class="text-sm text-slate-600">这是 Go 在语言层面提供的访问控制机制，比文档约定更可靠。</p>
      </section>

      <!-- 构建标签 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          构建标签 (Build Tags)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          通过文件名后缀或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">//go:build</code> 指令控制文件的条件编译。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">文件后缀</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">file_linux.go</td><td class="px-4 py-2 border border-slate-200">仅 Linux 编译</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">文件后缀 (组合)</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">file_linux_amd64.go</td><td class="px-4 py-2 border border-slate-200">Linux + amd64</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">//go:build (1.17+)</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">//go:build linux && amd64</td><td class="px-4 py-2 border border-slate-200">推荐新写法</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">否定条件</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">//go:build !windows</td><td class="px-4 py-2 border border-slate-200">排除 Windows</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">//go:build</code> 后必须跟一个空行，否则会被当作普通注释。旧式 <code class="bg-blue-100 px-1 rounded text-xs font-mono">// +build</code> 注释在 Go 1.17 后废弃。</p>
        </aside>
      </section>

    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-13-methods-interfaces" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：方法与接口</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-15-strings-rune" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：字符串与字符编码 →</RouterLink>
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
    { id: "sec-1", name: "导出规则：首字母决定可见性" },
    { id: "sec-2", name: "导入模式" },
    { id: "sec-3", name: "init() 函数" },
    { id: "sec-4", name: "internal 包" },
    { id: "sec-5", name: "构建标签 (Build Tags)" }
  ]
const importCode = `// 标准导入
import "fmt"

// 分组导入（推荐）
import (
    "fmt"
    "strings"
    "net/http"
)

// 别名导入
import f "fmt"          // f.Println()
import str "strings"    // str.Contains(s, x)

// 空白导入 — 仅执行 init
import _ "image/png"    // 注册 PNG 解码器
import _ "github.com/lib/pq"  // 注册 Postgres 驱动

// 点导入（不推荐）
import . "math"         // 直接用 Sin 而非 math.Sin`

const initCode = `// init 在包导入时自动执行，无参数无返回值
var globalConfig *Config

func init() {
    globalConfig = loadConfig()
}

// 常见模式：注册驱动
// import _ "github.com/go-sql-driver/mysql"
// 该包的 init() 会调用 sql.Register("mysql", &MySQLDriver{})`

const internalStructure = `myproject/
├── cmd/server/main.go       // 可 import "myproject/internal/config"
├── internal/
│   ├── config/config.go     // ✅ cmd/... 导入，✅ internal/... 互导
│   └── auth/auth.go         // ❌ 外部项目无法导入
└── pkg/
    └── api/api.go           // ❌ 无法 import internal 包`
</script>
