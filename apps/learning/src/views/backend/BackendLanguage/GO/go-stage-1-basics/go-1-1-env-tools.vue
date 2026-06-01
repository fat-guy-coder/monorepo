<template>
  <div class="go-doc min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">环境搭建与工具链</h1>
          <p class="text-sm text-slate-500 mt-1">Go 开发环境安装与配置</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段一 · 第1节</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 概述 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span class="text-cyan-500 text-xl">🐹</span>
          欢迎来到 Go 语言学习之旅
        </h2>
        <p class="text-slate-600 leading-relaxed mb-3">
          在编写第一行 Go 代码之前，我们需要先把开发环境搭好。本节将带你一步步完成 Go 的安装、配置，
          了解 Go 工具链的核心命令，并用一个经典的 Hello World 程序验证一切就绪。
        </p>
        <p class="text-slate-600 leading-relaxed">
          Go 官方提供了极其简洁的安装包和工具链，无论你使用 Windows、macOS 还是 Linux，
          整个过程通常不超过 10 分钟。
        </p>
      </section>

      <!-- 安装步骤 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          安装 Go
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          访问 <a href="https://go.dev/dl/" target="_blank" class="text-cyan-600 hover:text-cyan-700 underline">go.dev/dl/</a>
          下载适合你操作系统的安装包。Go 支持 Windows、macOS、Linux 三大平台，推荐安装最新的稳定版本（目前为 Go 1.22+）。
        </p>

        <!-- Windows 安装 -->
        <div class="mb-5">
          <h3 class="text-md font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span class="text-blue-500">🪟</span> Windows
          </h3>
          <ol class="space-y-2 mb-3">
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span class="text-slate-600">下载 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.msi</code> 安装程序</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span class="text-slate-600">双击运行，按向导完成安装（默认路径 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">C:\Program Files\Go\</code>）</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span class="text-slate-600">安装程序会自动将 Go 加入系统 PATH，无需手动配置</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span class="text-slate-600">重新打开终端（CMD 或 PowerShell），验证安装</span>
            </li>
          </ol>
        </div>

        <!-- macOS 安装 -->
        <div class="mb-5">
          <h3 class="text-md font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span class="text-slate-500">🍎</span> macOS
          </h3>
          <div class="mb-3">
            <Code language="bash" :code="macOsInstall" title="📟 Terminal" />
          </div>
        </div>

        <!-- Linux 安装 -->
        <div class="mb-3">
          <h3 class="text-md font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span class="text-orange-500">🐧</span> Linux
          </h3>
          <div class="mb-3">
            <Code language="bash" :code="linuxInstall" title="📟 Terminal" />
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>Linux 用户记得将环境变量写入 shell 配置文件（<code class="bg-blue-100 px-1 rounded text-xs font-mono">~/.bashrc</code>、<code class="bg-blue-100 px-1 rounded text-xs font-mono">~/.zshrc</code> 或 <code class="bg-blue-100 px-1 rounded text-xs font-mono">~/.profile</code>），否则每次打开新终端都需要重新 export。</p>
        </aside>
      </section>

      <!-- 验证安装 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          验证安装
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          安装完成后，打开终端运行以下命令，确认 Go 已正确安装。
        </p>

        <!-- 版本检查 -->
        <div class="mb-4">
          <Code language="bash" :code="goVersionOutput" title="📟 Terminal" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go env</code> 查看 Go 的所有环境变量配置，这是排查环境问题的利器。
        </p>

        <div class="mb-4">
          <Code language="bash" :code="goEnvOutput" title="📟 Terminal — go env 关键输出" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>如果 <code class="bg-amber-100 px-1 rounded text-xs font-mono">go version</code> 提示"command not found"，说明 Go 没有被加入系统 PATH。请检查安装是否成功，或手动将 Go 的 bin 目录添加到环境变量中。</p>
        </aside>
      </section>

      <!-- GOROOT / GOPATH -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          GOROOT 与 GOPATH
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          理解 GOROOT 和 GOPATH 的区别是 Go 开发者的必修课，但在 Go Modules 时代它们的角色已经发生了变化。
        </p>

        <!-- 对比表格 -->
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">概念</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型路径</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">现代角色</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold">GOROOT</td>
                <td class="px-4 py-2 border border-slate-200">Go 安装目录，存放标准库源码和编译器</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">/usr/local/go</td>
                <td class="px-4 py-2 border border-slate-200">安装时自动设定，<strong>无需手动修改</strong></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold">GOPATH</td>
                <td class="px-4 py-2 border border-slate-200">工作区目录，存放下载的依赖和源码</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">~/go</td>
                <td class="px-4 py-2 border border-slate-200">模块缓存位置，<strong>项目不再需要放在 GOPATH 下</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-3">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>GOROOT</strong> — Go 语言自身的安装位置。编译器、标准库（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">net/http</code> 等）都在这里。安装程序自动设置，平时不用管它。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>GOPATH</strong> — 在 Go 1.11 之前，所有 Go 代码必须放在 GOPATH 下的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">src/</code> 目录中。Go Modules 出现后，项目可以放在任意位置，GOPATH 主要用于存放模块缓存（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">pkg/mod/</code>）和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go install</code> 安装的二进制文件（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">bin/</code>）。</span>
          </li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>在 Go Modules 时代，你几乎不需要手动配置 GOROOT 和 GOPATH。只需确保 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">$GOPATH/bin</code> 在 PATH 中（以便运行 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go install</code> 安装的工具）。使用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go env GOPATH</code> 查看当前值。</p>
        </aside>
      </section>

      <!-- Go Modules 基础 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Go Modules 基础
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Go Modules 是 Go 1.11 引入的依赖管理方案，从 Go 1.16 起成为默认模式。它让项目可以放在任意目录，不再依赖 GOPATH。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-2">初始化模块</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          在项目根目录执行 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go mod init</code>，创建一个新模块。模块路径通常是仓库地址（如 GitHub 路径）。
        </p>

        <div class="mb-4">
          <Code language="bash" :code="goModInitOutput" title="📟 Terminal" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          生成的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go.mod</code> 文件记录了模块名和 Go 版本：
        </p>

        <div class="mb-4">
          <Code language="text" :code="goModExample" title="go.mod" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-2">管理依赖</h3>
        <ul class="space-y-2 text-slate-600 mb-3">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go mod tidy</code> — 自动添加缺失的依赖，移除未使用的依赖。每次修改 import 后建议运行一次。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.sum</code> — 依赖的校验和文件，记录每个依赖版本的哈希值，确保依赖内容未被篡改。<strong>应提交到版本控制。</strong></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go get &lt;package&gt;</code> — 添加或升级某个依赖包。</span>
          </li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">go.mod</code> 和 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go.sum</code> 都应该提交到 Git。团队成员拉取代码后只需 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go mod download</code> 即可同步依赖。</p>
        </aside>
      </section>

      <!-- Go CLI 命令概览 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Go CLI 命令概览
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 自带一套强大的命令行工具。以下是日常开发中最常用的命令：
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">命令</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go version</td>
                <td class="px-4 py-2 border border-slate-200">查看当前 Go 版本</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go version</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go run</td>
                <td class="px-4 py-2 border border-slate-200">编译并运行 Go 程序（不生成二进制）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go run main.go</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go build</td>
                <td class="px-4 py-2 border border-slate-200">编译生成可执行文件</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go build -o app ./...</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go fmt</td>
                <td class="px-4 py-2 border border-slate-200">自动格式化代码（Go 官方风格）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go fmt ./...</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go vet</td>
                <td class="px-4 py-2 border border-slate-200">静态分析，检测可疑代码</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go vet ./...</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go get</td>
                <td class="px-4 py-2 border border-slate-200">下载并安装依赖包</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go get github.com/gin-gonic/gin</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go install</td>
                <td class="px-4 py-2 border border-slate-200">编译并安装工具到 $GOPATH/bin</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go install golang.org/x/tools/cmd/goimports@latest</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go mod init</td>
                <td class="px-4 py-2 border border-slate-200">初始化 Go Module</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go mod init example/app</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go mod tidy</td>
                <td class="px-4 py-2 border border-slate-200">整理 go.mod，添加缺失/移除多余依赖</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go mod tidy</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go test</td>
                <td class="px-4 py-2 border border-slate-200">运行测试</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go test ./...</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go env</td>
                <td class="px-4 py-2 border border-slate-200">查看 Go 环境变量</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go env GOPATH</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 font-semibold text-xs">go help</td>
                <td class="px-4 py-2 border border-slate-200">查看命令帮助</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">go help build</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>日常开发中牢记 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go fmt</code>（格式化）和 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go vet</code>（静态检查）这两个命令。大多数 Go 编辑器都能在保存时自动运行它们，让你的代码始终保持干净。</p>
        </aside>
      </section>

      <!-- IDE 设置 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          IDE 与编辑器设置
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          好的工具能大幅提升开发效率。以下是 Go 开发的主流选择：
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-2">VS Code（免费，推荐）</h3>
        <ol class="space-y-2 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span class="text-slate-600">安装 <a href="https://code.visualstudio.com/" target="_blank" class="text-cyan-600 hover:text-cyan-700 underline">VS Code</a></span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span class="text-slate-600">在扩展市场搜索并安装 <strong>Go</strong>（由 Go Team at Google 发布）</span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span class="text-slate-600">打开任意 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">.go</code> 文件，扩展会提示安装 gopls（Go 语言服务器）等工具</span>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span class="text-slate-600">点击"Install All"一键安装所有 Go 工具</span>
          </li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-2">GoLand（商业，功能最强）</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>JetBrains 出品的 Go 专用 IDE，开箱即用，无需安装额外插件</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>提供 30 天免费试用，学生可申请免费教育版</span>
          </li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>无论选择哪个编辑器，确保开启了"保存时自动格式化（<code class="bg-emerald-100 px-1 rounded text-xs font-mono">go fmt</code>）"和"保存时自动导入整理（<code class="bg-emerald-100 px-1 rounded text-xs font-mono">goimports</code>）"。这让你不必关心代码格式，专注于逻辑。</p>
        </aside>
      </section>

      <!-- 第一个 Go 程序 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          第一个 Go 程序：Hello World
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          环境搭建完成，让我们写一个经典的 Hello World 程序来验证一切是否正常。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-2">创建项目</h3>
        <div class="mb-4">
          <Code language="bash" :code="helloProjectCreate" title="📟 Terminal" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-2">编写代码</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          创建 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">main.go</code>，输入以下代码：
        </p>

        <div class="mb-4">
          <Code language="go" :code="helloWorldCode" title="main.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-2">逐行解析</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1 font-bold">1.</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">package main</code> — 声明这是一个可执行程序的入口包（main 包是特殊的，必须包含 main() 函数）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1 font-bold">2.</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">import "fmt"</code> — 导入标准库中的格式化 I/O 包，用于打印输出</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1 font-bold">3.</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">func main()</code> — 程序的入口函数，Go 从这里开始执行</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1 font-bold">4.</span>
            <span><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Println("Hello, World!")</code> — 调用 fmt 包的 Println 函数打印一行文字并换行</span>
          </li>
        </ul>

        <h3 class="text-md font-semibold text-slate-700 mb-2">运行程序</h3>
        <div class="mb-4">
          <Code language="bash" :code="helloWorldOutput" title="📟 Terminal" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">go run</code> 适合快速测试，实际部署时使用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go build</code> 生成二进制文件再运行。编译后的程序不依赖 Go 环境，可以直接分发。</p>
        </aside>
      </section>

      <!-- 项目结构 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          典型项目结构概览
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          初学阶段保持简单，但随着项目变大，良好的目录结构能帮助你组织代码。以下是一个典型 Go 项目的布局：
        </p>

        <div class="mb-4">
          <Code language="text" :code="projectLayout" title="项目目录" />
        </div>

        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>简单项目</strong>（如学习阶段）：一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">main.go</code> 就够，所有代码在根目录。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>中等项目</strong>：按功能拆分 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.go</code> 文件（同属 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">package main</code>），或拆分为多个包。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>大型项目</strong>：参考 <a href="https://github.com/golang-standards/project-layout" target="_blank" class="text-cyan-600 hover:text-cyan-700 underline">golang-standards/project-layout</a> 的标准布局。</span>
          </li>
        </ul>
      </section>

      <!-- 新手避坑指南 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          新手常见问题与避坑指南
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 左大括号不能换行：</strong>Go 要求 <code class="bg-amber-100 px-1 rounded text-xs font-mono">{</code> 必须和 <code class="bg-amber-100 px-1 rounded text-xs font-mono">func</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">if</code> 等关键字在同一行。这是 Go 编译器强制要求的，不是风格偏好。<br/><code class="bg-amber-100 px-1 rounded text-xs font-mono">func main() {</code> ✅ &nbsp;&nbsp; <code class="bg-amber-100 px-1 rounded text-xs font-mono">func main()\n{</code> ❌</p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 未使用的变量/导入会报错：</strong>Go 编译器非常严格——声明但未使用的变量或导入但未使用的包都会导致<strong>编译失败</strong>。这不是 bug，是 Go 刻意设计来保持代码整洁的。使用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_</code>（下划线）可以忽略不用的返回值。</p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 大小写决定可见性：</strong>Go 没有 public/private 关键字。标识符首字母<strong>大写</strong>表示公开（exported），首字母<strong>小写</strong>表示私有（unexported）。这个规则贯穿整个 Go 生态系统。</p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ GOPATH 误区：</strong>很多旧教程会要求你把项目放在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">$GOPATH/src</code> 下。在 Go Modules 时代，这是<strong>不需要的</strong>！你的项目可以放在任何目录。</p>
          </aside>

          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>💡 善用 gofmt：</strong>不用纠结代码格式——保存前运行 <code class="bg-blue-100 px-1 rounded text-xs font-mono">gofmt</code> 或配置编辑器自动格式化。整个 Go 社区的代码风格完全统一。</p>
          </aside>
        </div>
      </section>

    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <span class="text-sm text-slate-300">已是第一节</span>
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-2-variables-types"
          class="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
        >
          下一节：变量、常量与数据类型 →
        </RouterLink>
      </nav>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { Code } from 'components'
import { RouterLink } from 'vue-router'

// macOS 安装命令
const macOsInstall = `# 方式一：下载 .pkg 安装包（推荐新手）
# 访问 https://go.dev/dl/ 下载 macOS 安装包，双击安装

# 方式二：使用 Homebrew（推荐开发者）
brew install go`

// Linux 安装命令
const linuxInstall = `# 下载并解压（以 amd64 为例，请根据架构选择）
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz

# 配置环境变量（添加到 ~/.bashrc 或 ~/.zshrc）
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# 使其生效
source ~/.bashrc`

// go version 输出
const goVersionOutput = `$ go version
go version go1.22.0 windows/amd64`

// go env 输出
const goEnvOutput = `$ go env
set GO111MODULE=on
set GOARCH=amd64
set GOBIN=
set GOCACHE=C:\\Users\\xxx\\AppData\\Local\\go-build
set GOEXE=.exe
set GOOS=windows
set GOPATH=C:\\Users\\xxx\\go
set GOROOT=C:\\Program Files\\Go
set GOTOOLCHAIN=auto
set GOVERSION=go1.22.0`

// go mod init 输出
const goModInitOutput = `$ mkdir hello-go && cd hello-go
$ go mod init example/hello
go: creating new go.mod: module example/hello`

// go.mod 示例
const goModExample = `module example/hello

go 1.22.0`

// 创建 hello 项目
const helloProjectCreate = `$ mkdir hello && cd hello
$ go mod init example/hello`

// Hello World 代码
const helloWorldCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`

// Hello World 运行输出
const helloWorldOutput = `$ go run main.go
Hello, World!

# 或者先编译再运行
$ go build -o hello.exe main.go
$ ./hello.exe
Hello, World!`

// 项目结构示例
const projectLayout = `myproject/
├── go.mod              # 模块定义文件
├── go.sum              # 依赖校验和（自动生成）
├── main.go             # 入口文件（package main）
├── handler/            # HTTP 处理器
│   └── user.go
├── model/              # 数据模型
│   └── user.go
├── service/            # 业务逻辑
│   └── user.go
└── config/             # 配置
    └── config.go`
</script>
