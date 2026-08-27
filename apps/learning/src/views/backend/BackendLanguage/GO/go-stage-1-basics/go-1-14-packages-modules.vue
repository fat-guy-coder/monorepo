<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 包与模块管理</h1>
          <p class="text-sm text-slate-500 mt-1">包是什么 · 导出规则 · 导入模式 · init · internal · go.mod · 构建标签 · 实战分层</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-14-packages-modules.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 包是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          包是什么：一个目录 = 一个包
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.go</code> 文件的第一行必须是
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">package xxx</code>，
          声明这个文件属于哪个包。<strong>一个目录下的所有 .go 文件必须属于同一个包</strong>——它们合体成一个编译单元，互相可以直接调用，不需要 import。
        </p>
        <div class="mb-4"><Code language="go" :code="pkgBasicsCode" title="greet/hello.go + greet/bye.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">规则</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">包名 = 目录最后一段</td><td class="px-4 py-2 border">不是强制的，但<span class="text-cyan-700 font-medium">约定俗成</span>：目录 <code class="bg-slate-100 px-1 rounded font-mono text-xs">internal/model/</code> 里的文件就叫 <code class="bg-slate-100 px-1 rounded font-mono text-xs">package model</code></td></tr>
              <tr><td class="px-4 py-2 border">package main</td><td class="px-4 py-2 border">特殊包——<strong>可执行程序的入口</strong>，必须含 <code class="bg-slate-100 px-1 rounded font-mono text-xs">func main()</code>。其余都是「库包」，只能被 import</td></tr>
              <tr><td class="px-4 py-2 border">包级作用域</td><td class="px-4 py-2 border">同一个包内所有文件共享顶层标识符，跨文件直接用，<span class="text-cyan-700 font-medium">不需要也不用 import 自己人</span></td></tr>
              <tr><td class="px-4 py-2 border">命名约定</td><td class="px-4 py-2 border">全小写、简短、单数、无下划线：<code class="bg-slate-100 px-1 rounded font-mono text-xs">model</code> 而非 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Model</code> 或 <code class="bg-slate-100 px-1 rounded font-mono text-xs">models</code></td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4"><Code language="go" :code="pkgMainCode" title="cmd/server/main.go — package main 入口" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS 类比：</strong>TS/ESM 是<strong>文件级</strong>模块——一个文件就是一个模块，想共享得 export/import。Go 是<strong>目录级</strong>包——一个目录的所有文件「合体」成一个包，目录内天然互相可见，只有跨目录才需要 import。所以 Go 的项目里少了很多文件间的 import 噪音。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最常见的坑：</strong>在同一个目录里写两个不同包名，编译直接报错 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">found packages greet (hello.go) and admin (admin.go) in greet/</code>。新文件拷过来时最容易触发。</p>
        </aside>
      </section>

      <!-- 2. 导出规则 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
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

      <!-- 3. 导入模式 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          导入的 5 种模式
        </h2>
        <div class="mb-4"><Code language="go" :code="importCode" title="imports.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Go 的大杀器：未使用的导入 = 编译错误。</strong>这看起来很严格，但避免了死代码累积。用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">goimports</code> 工具自动管理导入（IDE 通常已集成）。</p>
        </aside>
      </section>

      <!-- 4. init 函数 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
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

      <!-- 5. internal 包 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          internal 包 — Go 编译器的"禁止访问"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/internal/</code> 目录下的包，<strong>只能被其父级目录树内的代码导入</strong>。外部项目导入 internal 包会<strong>编译报错</strong>。这是 Go 编译器级别的强制约束，比文档约定可靠得多。
        </p>
        <div class="mb-4"><Code language="text" :code="internalStructure" title="internal 目录结构" /></div>

        <div class="mb-4"><Code language="go" :code="internalBoundaryCode" title="真实项目：internal 边界" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 使用场景：</strong>将不想暴露给外部使用的实现细节放在 internal 下。例如 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">myapp/internal/auth</code>——你的 cmd 可以用，但第三方 import 不了。这和 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">pkg/</code> 目录（公开 API）形成鲜明对比。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS 类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">internal/</code> ≈ Node 包里的「私有子包」——类似 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">package.json</code> 用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">exports</code> 字段限制哪些路径能被外部 import。区别：Go 是<strong>编译器强制</strong>，Node 是约定 + 运行时校验。</p>
        </aside>
      </section>

      <!-- 6. go.mod -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          go.mod 与模块管理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.mod</code> 定义了模块的<strong>导入路径（module path）</strong>和依赖版本。Go 1.11 引入 modules，Go 1.16 起成为默认模式。
        </p>
        <div class="mb-4"><Code language="go" :code="gomodCode" title="真实 go.mod + 路径推算规则" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>导入路径 = module 路径 + 相对目录</strong>。以本项目的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">github.com/monorepo/go</code> 为例：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">目录（相对 module 根）</th><th class="px-4 py-2 border border-slate-200 font-semibold">导入路径</th><th class="px-4 py-2 border border-slate-200 font-semibold">package 名</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">backend/cmd/server</td><td class="px-4 py-2 border font-mono text-xs">github.com/monorepo/go/backend/cmd/server</td><td class="px-4 py-2 border font-mono text-xs">main</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">backend/internal/handler</td><td class="px-4 py-2 border font-mono text-xs">github.com/monorepo/go/backend/internal/handler</td><td class="px-4 py-2 border font-mono text-xs">handler</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">backend/internal/model</td><td class="px-4 py-2 border font-mono text-xs">github.com/monorepo/go/backend/internal/model</td><td class="px-4 py-2 border font-mono text-xs">model</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>Go 解析一个 import 语句的流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>读 go.mod，拿到 module 路径（如 <code class="bg-slate-100 px-1 rounded font-mono text-xs">github.com/monorepo/go</code>）</li>
          <li>拿 import 路径减去 module 路径 → 得到相对目录（如 <code class="bg-slate-100 px-1 rounded font-mono text-xs">backend/internal/model</code>）</li>
          <li>去该目录找 .go 文件，确认包名</li>
          <li>编译该包，检查导出可见性与循环依赖</li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 会不会真去 GitHub 下载？—— 不会！</strong><br/>
          <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">github.com/monorepo/go/backend/internal/service</code> 看起来像 GitHub 地址，但它<strong>以当前模块路径开头</strong>，Go 直接去本地目录找，<strong>零网络请求</strong>。「github.com/...」只是<strong>命名空间</strong>（全局唯一的包身份证），<strong>不是真的要从 GitHub 拉代码</strong>。<br/>
          判断规则：<strong>以本模块路径开头 → 本地解析；否则 → 第三方依赖，走 GOPROXY 下载</strong>（如 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">github.com/gin-gonic/gin</code> 这种才是真的要去拉）。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么 Go 没有「相对路径」import？</strong><br/>
          你永远不会在 Go 里看到 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">import "../service"</code>——Go 故意不支持。相对路径「相对于当前文件位置」，代码一搬就全断，且无法 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">go get</code> 下载、无法保证可复现构建。Go 的解法是<strong>所有包都有全名（绝对路径）</strong>：本地用「模块路径 + 目录」定位，远程用完整 import 路径直接下载，一套规则通吃。这 ≈ Node 把 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">import _ from 'lodash'</code>（包名）和 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">import './utils'</code>（相对路径）统一成了一种写法。</p>
        </aside>

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

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS 类比：</strong>go.mod ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">package.json</code>（声明模块身份 + 直接依赖），go.sum ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">package-lock.json</code>（锁定校验和）。区别：Go 的「导入路径」自带唯一地址语义（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">github.com/...</code>），而 npm 靠 registry 反查。</p>
        </aside>
      </section>

      <!-- 7. 构建标签 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
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

      <!-- 8. 实战：你的 Go 后端项目 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          实战：你的 Go 后端项目（apps/go/backend）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把上面的概念落到你正在写的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">apps/go/backend</code> 上——它就是一个标准的
          <strong>cmd + internal 分层</strong> Go 工程。
        </p>
        <div class="mb-4"><Code language="text" :code="realTreeCode" title="apps/go 真实目录树" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed">
          依赖是<strong>单向、分层</strong>的——<span class="text-cyan-700 font-medium">main → handler → service → repository → model</span>，任何一层不反向依赖，这正是避免循环导入的工程解法：
        </p>
        <div class="mb-4"><Code language="go" :code="realImportsCode" title="各层 import 链（真实代码）" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">层</th><th class="px-4 py-2 border border-slate-200 font-semibold">目录</th><th class="px-4 py-2 border border-slate-200 font-semibold">职责</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">入口</td><td class="px-4 py-2 border font-mono text-xs">cmd/server/main.go</td><td class="px-4 py-2 border">package main：启动 HTTP 服务、注册路由</td></tr>
              <tr><td class="px-4 py-2 border">HTTP</td><td class="px-4 py-2 border font-mono text-xs">internal/handler</td><td class="px-4 py-2 border">解析请求、调用 service、写 JSON 响应</td></tr>
              <tr><td class="px-4 py-2 border">业务</td><td class="px-4 py-2 border font-mono text-xs">internal/service</td><td class="px-4 py-2 border">业务规则、参数校验、将来加权限/事务</td></tr>
              <tr><td class="px-4 py-2 border">数据</td><td class="px-4 py-2 border font-mono text-xs">internal/repository</td><td class="px-4 py-2 border">读写数据（现在内存 map，将来换 PostgreSQL）</td></tr>
              <tr><td class="px-4 py-2 border">模型</td><td class="px-4 py-2 border font-mono text-xs">internal/model</td><td class="px-4 py-2 border">数据结构定义，不依赖任何 internal 包</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么 internal 在这里如此合适：</strong><code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">backend/internal/</code> 只能被 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">github.com/monorepo/go/backend/</code> 目录树内的代码导入——所以 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">basics/</code>、<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">advanced/</code> 等学习代码<strong>根本无法 import 后端实现</strong>。编译器替你守住了「学习代码 ≠ 生产依赖」这条边界。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 cmd/ 目录的意义：</strong>一个 module 可以有<strong>多个可执行程序</strong>，每个占 cmd/ 下一个子目录（都是 package main）。将来想加一个 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">cmd/migrate</code> 做数据库迁移、<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">cmd/cli</code> 做命令行，直接新增子目录即可，互不干扰。</p>
        </aside>
      </section>

      <!-- 9. 常见错误 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误与反模式
        </h2>
        <div class="mb-4"><Code language="go" :code="errCode" title="三个经典编译错误" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>循环导入</strong>：a 依赖 b、b 依赖 a → <code class="bg-slate-100 px-1 rounded font-mono text-xs">import cycle not allowed</code>。解法：把公共部分抽到更底层的新包，保证依赖方向单向（参考第 8 节的分层）</li>
          <li><strong>目录里混包名</strong>：同一目录两个 package → 编译报错。解法：每个目录只留一个包</li>
          <li><strong>模块路径对不上</strong>：go.mod 的 module 与 import 路径前缀不符 → 编译报错。解法：先确认 go.mod，再写 import</li>
        </ol>

        <div class="mb-4"><Code language="go" :code="cycleFixCode" title="✅ 循环导入的正确修法" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS 类比：</strong>TS/ESM 里循环 import 有时候「能跑」（拿到的是 undefined 的坑，运行时才炸）；Go 直接<strong>编译期拒绝</strong>——更早暴露、更好修。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别忘了：</strong>① 改依赖后跑 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go mod tidy</code>，并把 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go.sum</code> 提交进 git（锁版本、防篡改）。② 库包别叫 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">package main</code>，会被当成可执行程序。③ 包名用<strong>全小写单数</strong>，别用大写或下划线。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一个目录 = 一个包</strong>，目录内跨文件直接用；package main 才是可执行入口</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>大写 = 导出，小写 = 私有</strong>——没有 public/private/protected</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>未使用的导入 → 编译错误</strong>，用 goimports 自动处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空白导入</strong> <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">import _ "pkg"</code> 只执行 init，常用于注册驱动</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>internal 包</strong>是编译器的强制访问控制，外部项目无法导入</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go.mod</strong> 管理模块依赖，<strong>导入路径 = module 路径 + 相对目录</strong>，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go mod tidy</code> 保持整洁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程分层</strong>：cmd + internal（handler → service → repository → model）单向依赖，天然避免循环导入</span></li>
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
  { id: "sec-1", name: "包是什么" },
  { id: "sec-2", name: "导出规则" },
  { id: "sec-3", name: "导入的 5 种模式" },
  { id: "sec-4", name: "init() 函数" },
  { id: "sec-5", name: "internal 包" },
  { id: "sec-6", name: "go.mod 与模块管理" },
  { id: "sec-7", name: "构建标签" },
  { id: "sec-8", name: "实战：Go 后端项目" },
  { id: "sec-9", name: "常见错误" },
  { id: "sec-10", name: "小结" },
]

const pkgBasicsCode = `// greet/hello.go — 包的第一条语句：package 声明
package greet

// Hello 大写 = 导出，包外可见
func Hello() string { return "你好，Go" }`

const pkgMainCode = `// cmd/server/main.go — package main = 可执行程序入口
package main

import (
    "fmt"

    "github.com/monorepo/go/backend/internal/handler" // 普通库包
)

func main() { // ← package main 必须有的入口函数
    fmt.Println(handler.Welcome())
}`

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

const internalBoundaryCode = `// ⚠️ internal 的规则：只能被「internal 所在目录」目录树内的代码导入
// 真实项目：module = github.com/monorepo/go
//   backend/internal/...  ← 仅 backend/ 目录树内可导入

// ✅ 允许：backend/cmd/server/main.go
import "github.com/monorepo/go/backend/internal/handler"

// ❌ 编译报错：basics/ 学习代码（在 backend/ 目录树之外）
import "github.com/monorepo/go/backend/internal/model"
// → use of internal package github.com/monorepo/go/backend/internal/model is not allowed`

const gomodCode = `// apps/go/go.mod — 本模块定义
module github.com/monorepo/go   // ← 模块导入路径

go 1.22

// 导入路径的推算规则：
//   import "github.com/monorepo/go/backend/internal/model"
//          └────── module 路径 ──────┘ └─ 相对目录 ─┘
//   → 去 backend/internal/model/ 目录找 .go 文件`

const realTreeCode = `apps/go/                     ← module github.com/monorepo/go
├── go.mod                   ← 模块定义
├── main.go                  ← 学习示例入口（也是 package main）
├── basics/                  ← 阶段 1-3 学习代码（库包，非可执行）
├── backend/                 ← 实战项目
│   ├── cmd/
│   │   └── server/main.go        ← package main：程序入口
│   └── internal/
│       ├── handler/menu_handler.go   ← HTTP 层：解析请求/响应
│       ├── service/menu_service.go   ← 业务逻辑层
│       ├── repository/menu_repo.go   ← 数据访问层（内存 map）
│       └── model/menu.go             ← 数据结构（最底层）`

const realImportsCode = `// 依赖方向（单向，不反向 → 才不会循环导入）
//
//   main ──► handler ──► service ──► repository ──► model
//  cmd/server    handler      service        repo

// cmd/server/main.go
import "github.com/monorepo/go/backend/internal/handler"

// internal/handler/menu_handler.go
import (
    "github.com/monorepo/go/backend/internal/model"
    "github.com/monorepo/go/backend/internal/service"
)

// internal/service/menu_service.go
import (
    "github.com/monorepo/go/backend/internal/model"
    "github.com/monorepo/go/backend/internal/repository"
)

// internal/repository/menu_repo.go
import "github.com/monorepo/go/backend/internal/model"

// internal/model/menu.go — 不依赖任何 internal 包（最底层）`

const errCode = `// ❌ 错误 1：循环导入
// pkg/a/a.go  import "github.com/monorepo/go/pkg/b"
// pkg/b/b.go  import "github.com/monorepo/go/pkg/a"
// → import cycle not allowed

// ❌ 错误 2：同一目录混了两个包名
// greet/hello.go:  package greet
// greet/admin.go:  package admin
// → found packages greet (hello.go) and admin (admin.go) in greet/

// ❌ 错误 3：导入路径与 module 不符
// go.mod: module github.com/monorepo/go
// import "github.com/wrong/other"
// → module declares its path as github.com/monorepo/go
//   but was required as github.com/wrong/other`

const cycleFixCode = `// ✅ 正确做法：把公共部分抽到最底层，依赖保持单向
//
//   a ──► c    b ──► c    （c 是公共底层包，谁都不依赖 a/b）
//
// 项目里就是这种解法：
//   main ──► handler ──► service ──► repository ──► model
// model 是公共最底层，谁都不反向依赖 → 永远不会循环导入`
</script>
