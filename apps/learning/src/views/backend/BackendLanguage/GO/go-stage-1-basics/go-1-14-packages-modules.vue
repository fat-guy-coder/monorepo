<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 包与模块管理</h1>
          <p class="text-sm text-slate-500 mt-1">导出规则 · 导入模式 · init · internal · go.mod · 构建标签</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-14-packages-modules.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 导出规则 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          导出规则：首字母就是访问控制
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">public</code>/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">private</code>/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">protected</code>。
          <strong>首字母大写 = 导出（跨包可见），首字母小写 = 包内私有。</strong>这适用于类型、函数、方法、变量、常量、结构体字段——所有标识符。
        </p>
        <div class="mb-4"><Code language="go" :code="exportCode" title="export.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS 类比：</strong>Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Name</code> (大写) ≈ TS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">export</code>。Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">name</code> (小写) ≈ TS 的不带 export 的声明。没有 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">protected</code> 等价物——Go 认为包已经足够小，不需要这种中间可见性。</p>
        </aside>
      </section>

      <!-- 2. 导入模式 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          导入的 5 种模式
        </h2>
        <div class="mb-4"><Code language="go" :code="importCode" title="imports.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Go 的大杀器：未使用的导入 = 编译错误。</strong>这看起来很严格，但避免了死代码累积。用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">goimports</code> 工具自动管理导入（IDE 通常已集成）。</p>
        </aside>
      </section>

      <!-- 3. init 函数 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          init() — 自动执行的初始化函数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code> 在包被导入时<strong>自动执行</strong>（在 main() 之前），用于初始化全局状态、注册驱动、校验配置。不能手动调用，不能有参数和返回值。
        </p>
        <div class="mb-4"><Code language="go" :code="initCode" title="init.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-3 text-sm leading-relaxed">
          <li>每个文件可有多个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code>，按声明顺序执行</li>
          <li>执行链：被导入包的 init → 当前包的 init → main()</li>
          <li>同一包被多个包导入时，init 只执行一次</li>
          <li>典型用途：数据库驱动注册 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">import _ "github.com/lib/pq"</code></li>
        </ol>
      </section>

      <!-- 4. internal 包 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          internal 包 — Go 编译器的"禁止访问"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/internal/</code> 目录下的包，<strong>只能被其父级目录树内的代码导入</strong>。外部项目导入 internal 包会<strong>编译报错</strong>。这是 Go 编译器级别的强制约束，比文档约定可靠得多。
        </p>
        <div class="mb-4"><Code language="text" :code="internalStructure" title="internal 目录结构" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 使用场景：</strong>将不想暴露给外部使用的实现细节放在 internal 下。例如 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">myapp/internal/auth</code>——你的 cmd 可以用，但第三方 import 不了。这和 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">pkg/</code> 目录（公开 API）形成鲜明对比。</p>
        </aside>
      </section>

      <!-- 5. go.mod -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          go.mod 与模块管理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.mod</code> 定义了模块的<strong>导入路径（module path）</strong>和依赖版本。Go 1.11 引入 modules，Go 1.16 起成为默认模式。
        </p>
        <div class="mb-4"><Code language="go" :code="gomodCode" title="go.mod 详解" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">命令</th><th class="px-4 py-2 border border-slate-200 font-semibold">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">go mod init &lt;path&gt;</td><td class="px-4 py-2 border">初始化模块，创建 go.mod</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go mod tidy</td><td class="px-4 py-2 border">清理无用依赖、添加缺失的</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go get &lt;pkg&gt;@&lt;version&gt;</td><td class="px-4 py-2 border">添加/升级依赖</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go mod vendor</td><td class="px-4 py-2 border">将依赖复制到 vendor/ 目录</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">go mod download</td><td class="px-4 py-2 border">下载依赖到本地缓存</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 构建标签 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          构建标签 (Build Tags)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          通过文件名后缀或 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">//go:build</code> 指令控制文件的<strong>条件编译</strong>。常用于平台特定代码。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">语法</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">文件后缀</td><td class="px-4 py-2 border font-mono text-xs">file_linux.go</td><td class="px-4 py-2 border">仅 Linux 编译</td></tr>
              <tr><td class="px-4 py-2 border">组合后缀</td><td class="px-4 py-2 border font-mono text-xs">file_linux_amd64.go</td><td class="px-4 py-2 border">Linux + amd64</td></tr>
              <tr><td class="px-4 py-2 border">//go:build</td><td class="px-4 py-2 border font-mono text-xs">//go:build linux && amd64</td><td class="px-4 py-2 border">推荐（Go 1.17+）</td></tr>
              <tr><td class="px-4 py-2 border">否定</td><td class="px-4 py-2 border font-mono text-xs">//go:build !windows</td><td class="px-4 py-2 border">排除 Windows</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">//go:build</code> 后必须空一行，否则被当普通注释。旧 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">// +build</code> 在 Go 1.17+ 废弃。</p>
        </aside>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>大写 = 导出，小写 = 私有</strong>——没有 public/private/protected</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>未使用的导入 → 编译错误</strong>，用 goimports 自动处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空白导入</strong> <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">import _ "pkg"</code> 只执行 init，常用于注册驱动</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>internal 包</strong>是编译器的强制访问控制，外部项目无法导入</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go.mod</strong> 管理模块依赖，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go mod tidy</code> 保持整洁</span></li>
        </ul>
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
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "导出规则" },
  { id: "sec-2", name: "导入的 5 种模式" },
  { id: "sec-3", name: "init() 函数" },
  { id: "sec-4", name: "internal 包" },
  { id: "sec-5", name: "go.mod 与模块管理" },
  { id: "sec-6", name: "构建标签" },
  { id: "sec-7", name: "小结" },
]

const exportCode = `package user

// 导出（大写）— 外部可用 user.New / user.Name
type User struct {
    Name     string  // 导出：外部可读写
    password string  // 私有：仅在 user 包内可见
}

func New(name, pwd string) *User {  // 导出
    return &User{Name: name, password: pwd}
}

func (u *User) SetPassword(pwd string) {  // 导出——通过方法控制私有字段
    if len(pwd) < 6 { return }
    u.password = pwd
}

func (u *User) validate() error {  // 私有——内部辅助方法
    if u.Name == "" { return errors.New("name required") }
    return nil
}`

const importCode = `// ① 标准导入
import "fmt"

// ② 分组导入（推荐——goimports 自动分组：标准库、第三方、本项目）
import (
    "fmt"
    "strings"

    "github.com/gin-gonic/gin"

    "myproject/internal/config"
)

// ③ 别名导入
import f "fmt"              // f.Println()
import str "strings"        // str.Contains()

// ④ 空白导入 — 仅执行包的 init()（如注册数据库驱动）
import _ "github.com/lib/pq"   // 不直接调用，只靠 init 注册
import _ "image/png"            // 注册 PNG 解码器

// ⑤ 点导入（不推荐——污染命名空间）
import . "math"             // 直接用 Sin 而非 math.Sin`

const initCode = `// init 在包导入时自动执行，无参数无返回值
var globalConfig *Config

func init() {
    globalConfig = loadConfig()
    fmt.Println("包初始化完成")
}

// 可以在一个文件里写多个 init（按顺序执行）
func init() {
    if globalConfig == nil {
        panic("配置加载失败")
    }
}

// 常见模式：数据库驱动注册
// import _ "github.com/go-sql-driver/mysql"
// 该包的 init() 会调用 sql.Register("mysql", &MySQLDriver{})
// 你的代码不需要直接引用这个包`

const internalStructure = `myapp/
├── cmd/
│   └── server/
│       └── main.go            // ✅ import "myapp/internal/config"
├── internal/
│   ├── config/config.go       // ✅ cmd/... 导入 ✅ internal/... 互导
│   ├── auth/auth.go           // ❌ 外部项目无法导入！
│   └── db/postgres.go
├── pkg/
│   └── api/                   // 公开 API，任何人可导入
│       └── handler.go         // ❌ pkg/api 也不能 import internal
└── go.mod                     // module myapp`

const gomodCode = `// go.mod — 模块定义文件
module github.com/yourname/myapp  // ← 模块导入路径

go 1.22  // 最低 Go 版本

require (
    github.com/gin-gonic/gin v1.9.1      // 直接依赖
    golang.org/x/text v0.14.0
)

require (
    github.com/bytedance/sonic v1.9.1 // indirect — 间接依赖（自动管理）
)

// ⚠️ 模块路径 = 别人导入你的包的路径
// module github.com/yourname/myapp → import "github.com/yourname/myapp/pkg/api"
// 本地包直接按 go.mod 的 module 路径来 import`
</script>
