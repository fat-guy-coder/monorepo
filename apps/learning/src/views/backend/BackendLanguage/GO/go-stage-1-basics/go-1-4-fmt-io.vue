<template>
  <div class="go-doc min-h-screen bg-linear-to-brrom-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">fmt 格式化输入输出</h1>
          <p class="text-sm text-slate-500 mt-1">Go 标准库的格式化与 I/O 操作</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-4-fmt-io.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段1 · 基础</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📦</span>
          概述
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt</code> 包是 Go 标准库中最常用的包之一，实现了格式化 I/O 功能，类似于 C
          语言的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">printf</code> 和 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">scanf</code>。它提供了向控制台输出、从控制台读取、格式化字符串以及错误格式化等丰富的功能。
        </p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Print 系列</strong>：直接输出到标准输出（控制台）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Sprint 系列</strong>：格式化为字符串返回，不输出到控制台</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Scan 系列</strong>：从标准输入读取用户输入</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Errorf</strong>：格式化并返回一个 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">error</code> 类型的值</span>
          </li>
        </ul>
      </section>

      <!-- 1. Print 系列 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Print 系列 — 标准输出
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Print</code>、<code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Println</code> 和 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Printf</code>
          是三个最基础的控制台输出函数。它们的核心区别在于<b>分隔符处理、换行行为</b>和<b>是否支持格式化</b>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">函数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">分隔符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">自动换行</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">格式化</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用场景</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Print</td>
                <td class="px-4 py-2 border border-slate-200">仅当操作数都不是字符串时加空格</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
                <td class="px-4 py-2 border border-slate-200">简单连续输出</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Println</td>
                <td class="px-4 py-2 border border-slate-200">操作数之间始终加空格</td>
                <td class="px-4 py-2 border border-slate-200">是</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
                <td class="px-4 py-2 border border-slate-200">调试时快速换行输出</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Printf</td>
                <td class="px-4 py-2 border border-slate-200">无（由格式化字符串控制）</td>
                <td class="px-4 py-2 border border-slate-200">否（需手动加 <code
                    class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">\n</code>）</td>
                <td class="px-4 py-2 border border-slate-200">是</td>
                <td class="px-4 py-2 border border-slate-200">需要精确控制格式时</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 代码示例 -->
        <div class="mb-4">
          <Code language="go" :code="printDemoCode" title="print_demo.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="printDemoOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 💡 Print vs Println 分隔符差异 -->
      <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
        <p class="text-sm text-blue-800">
          <strong>💡 Print 分隔符细节：</strong><code
            class="bg-blue-100 px-1 rounded text-blue-900 text-xs">fmt.Print("a", "b")</code> 输出 <code
            class="bg-blue-100 px-1 rounded text-blue-900 text-xs">ab</code>（无空格，因为都是字符串），而 <code
            class="bg-blue-100 px-1 rounded text-blue-900 text-xs">fmt.Print(1, 2)</code> 输出 <code
            class="bg-blue-100 px-1 rounded text-blue-900 text-xs">1 2</code>（有空格，因为操作数是数值）。<code
            class="bg-blue-100 px-1 rounded text-blue-900 text-xs">Println</code> 则始终在操作数之间加空格，行为完全一致。
        </p>
      </aside>

      <!-- 2. 格式化动词表 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          格式化动词（Verbs）完整参考
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          格式化动词以 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%</code> 开头，用于指定如何格式化对应的参数。掌握常用动词是使用
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Printf</code> / <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Sprintf</code> 的基础。
        </p>

        <!-- 通用动词 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3 mt-4">🔹 通用动词（适用于任意类型）</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动词</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例输出</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%v</td>
                <td class="px-4 py-2 border border-slate-200">默认格式（value）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">{Alice 25}</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%+v</td>
                <td class="px-4 py-2 border border-slate-200">默认格式 + 结构体字段名</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">{Name:Alice Age:25}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%#v</td>
                <td class="px-4 py-2 border border-slate-200">Go 语法格式输出</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">main.Person{Name:"Alice", Age:25}</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%T</td>
                <td class="px-4 py-2 border border-slate-200">值的 Go 类型</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">main.Person</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%%</td>
                <td class="px-4 py-2 border border-slate-200">百分号字面量</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 布尔与数值 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3 mt-4">🔹 布尔与数值动词</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动词</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例（输入 → 输出）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%t</td>
                <td class="px-4 py-2 border border-slate-200">布尔值 true/false</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">true → true</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%d</td>
                <td class="px-4 py-2 border border-slate-200">十进制整数</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">255 → 255</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%b</td>
                <td class="px-4 py-2 border border-slate-200">二进制</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">5 → 101</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%o</td>
                <td class="px-4 py-2 border border-slate-200">八进制</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">9 → 11</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%x</td>
                <td class="px-4 py-2 border border-slate-200">十六进制（小写）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">255 → ff</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%X</td>
                <td class="px-4 py-2 border border-slate-200">十六进制（大写）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">255 → FF</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%f</td>
                <td class="px-4 py-2 border border-slate-200">浮点数（小数形式）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">3.1415 → 3.141500</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%e</td>
                <td class="px-4 py-2 border border-slate-200">科学计数法（小写 e）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">3141.5 → 3.141500e+03</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%E</td>
                <td class="px-4 py-2 border border-slate-200">科学计数法（大写 E）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">3141.5 → 3.141500E+03</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 字符串与指针 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3 mt-4">🔹 字符串与指针动词</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动词</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例（输入 → 输出）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%s</td>
                <td class="px-4 py-2 border border-slate-200">字符串（不解码字节）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">"hello" → hello</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%q</td>
                <td class="px-4 py-2 border border-slate-200">带引号的字符串（转义不可见字符）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">"hello" → "hello"</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%p</td>
                <td class="px-4 py-2 border border-slate-200">指针的十六进制地址表示</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">&v → 0xc000018030</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 完整动词演示 -->
        <div class="mb-4">
          <Code language="go" :code="verbsCode" title="verbs.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="verbsOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 3. Sprint 系列 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Sprint 系列 — 格式化为字符串
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Sprint</code>、<code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Sprintf</code> 和 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Sprintln</code> 与 Print
          系列行为完全一致，区别在于它们<b>不输出到控制台</b>，而是将结果作为 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">string</code> 返回。这在构建日志消息、错误信息、API 响应时非常有用。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">函数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对应输出版本</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">返回值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型用途</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Sprint</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Print</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">string</td>
                <td class="px-4 py-2 border border-slate-200">拼接多个值</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Sprintf</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Printf</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">string</td>
                <td class="px-4 py-2 border border-slate-200">格式化后赋值 / 拼接</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Sprintln</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Println</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">string</td>
                <td class="px-4 py-2 border border-slate-200">带换行的拼接</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="sprintCode" title="sprint.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="sprintOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 4. Scan 系列 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Scan 系列 — 读取用户输入
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Scan</code>、<code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Scanf</code> 和 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Scanln</code> 用于从标准输入读取数据，并将值存入传入的指针参数中。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">函数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">分隔符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">换行终止</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">格式化</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Scan</td>
                <td class="px-4 py-2 border border-slate-200">空格 / 换行</td>
                <td class="px-4 py-2 border border-slate-200">否（跨行读取）</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Scanf</td>
                <td class="px-4 py-2 border border-slate-200">按格式字符串解析</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
                <td class="px-4 py-2 border border-slate-200">是</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">Scanln</td>
                <td class="px-4 py-2 border border-slate-200">空格</td>
                <td class="px-4 py-2 border border-slate-200">是（遇到换行停止）</td>
                <td class="px-4 py-2 border border-slate-200">否</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="scanCode" title="scan.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="scanOutput" title="📟 Terminal（用户输入用 ← 标记）" />
        </div>
      </section>

      <!-- ⚠️ Scan 注意事项 -->
      <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
        <p class="text-sm text-amber-800">
          <strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">Scan</code>
          系列必须传入<b>指针</b>（<code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">&var</code>），因为需要修改传入的变量值。如果忘记
          <code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">&</code>，编译器会报错，因为类型不匹配。
        </p>
      </aside>

      <!-- 5. Error 格式化 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Error 格式化 — fmt.Errorf 与 %w 包装
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Errorf</code> 用法与 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Sprintf</code> 类似，但它返回 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">error</code> 类型而非 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">string</code>。Go 1.13 引入了 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%w</code> 动词，用于<b>包装（wrap）</b>另一个 error，使 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">errors.Is</code> 和 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">errors.As</code> 可以穿越错误链进行匹配。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动词</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">行为</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">errors.Is 可穿透</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%v</td>
                <td class="px-4 py-2 border border-slate-200">将 error 的消息直接嵌入</td>
                <td class="px-4 py-2 border border-slate-200 text-center text-red-500">否</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">%w</td>
                <td class="px-4 py-2 border border-slate-200">包装 error，保留原始错误链</td>
                <td class="px-4 py-2 border border-slate-200 text-center text-emerald-500">是</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="errorfCode" title="errorf.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="errorfOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- ✅ %w 最佳实践 -->
      <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
        <p class="text-sm text-emerald-800">
          <strong>✅ 最佳实践：</strong>每个 <code
            class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">fmt.Errorf</code> 调用中最多使用<b>一个</b> <code
            class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">%w</code>，且用它包装最底层/最相关的错误。如果需要包装多个错误，使用 <code
            class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">errors.Join</code>（Go 1.20+）。
        </p>
      </aside>

      <!-- 6. 宽度与精度 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          宽度与精度控制
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Printf</code> / <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Sprintf</code> 中，可以在 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%</code> 和动词之间插入宽度和精度来控制对齐方式和显示格式。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">格式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">输出</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%5d</td>
                <td class="px-4 py-2 border border-slate-200">整数最小宽度 5，右对齐</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%5d", 42)</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">&nbsp;&nbsp;&nbsp;42</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%-5d</td>
                <td class="px-4 py-2 border border-slate-200">宽度 5，左对齐（用 - 标志）</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%-5d", 42)</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">42&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%05d</td>
                <td class="px-4 py-2 border border-slate-200">宽度 5，前导零填充</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%05d", 42)</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">00042</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%.2f</td>
                <td class="px-4 py-2 border border-slate-200">浮点数保留 2 位小数</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%.2f", 3.14159)</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">3.14</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%8.2f</td>
                <td class="px-4 py-2 border border-slate-200">总宽度 8，保留 2 位小数</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%8.2f", 3.14)</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">&nbsp;&nbsp;&nbsp;&nbsp;3.14</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%10s</td>
                <td class="px-4 py-2 border border-slate-200">字符串最小宽度 10，右对齐</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%10s", "Go")</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Go</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%-10s</td>
                <td class="px-4 py-2 border border-slate-200">字符串宽度 10，左对齐</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%-10s", "Go")</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">
                  Go&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr class="bg-slate-50">
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-xs">%.5s</td>
                <td class="px-4 py-2 border border-slate-200">字符串截断，最多 5 个字符</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">fmt.Printf("%.5s", "Hello世界")</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Hello</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="formattingCode" title="formatting.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="formattingOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 7. 实际用例 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          实际用例
        </h2>

        <!-- 7.1 表格输出 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3 mt-4">🔹 表格格式化</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          利用宽度控制可以轻松实现对齐整齐的表格输出，这是 CLI 工具常用的技巧。
        </p>
        <div class="mb-4">
          <Code language="go" :code="tableCode" title="table.go" />
        </div>
        <div class="mb-6">
          <Code language="bash" :code="tableOutput" title="📟 Terminal" />
        </div>

        <!-- 7.2 调试输出 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3">🔹 调试利器 %+v 与 %#v</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在调试时，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%+v</code> 可以打印结构体字段名，<code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%#v</code> 输出完整 Go 语法格式，是快速排查问题的利器。
        </p>
        <div class="mb-4">
          <Code language="go" :code="debugCode" title="debug.go" />
        </div>
        <div class="mb-6">
          <Code language="bash" :code="debugOutput" title="📟 Terminal" />
        </div>

        <!-- 7.3 日志模式 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-3">🔹 结构化日志模式</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Printf</code> 或 <code
            class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Sprintf</code> 构建带时间戳和级别的日志消息是 Go 中常见的简单日志实践。
        </p>
        <div class="mb-4">
          <Code language="go" :code="loggerCode" title="logger.go" />
        </div>
        <div class="mb-4">
          <Code language="bash" :code="loggerOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见错误与排坑指南
        </h2>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">1. 动词与参数类型不匹配</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%d</code> 格式化字符串会输出 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%!d(string=hello)</code> 而非 panic。Go
              不会崩溃，但会输出乱码提示。编译时使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go vet</code> 可以检测此类问题。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">2. Printf 忘记加 \n</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Printf</code> 不会自动换行，如果多行 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Printf</code> 输出会挤在同一行。使用 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Println</code> 或手动在格式字符串末尾添加 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">\n</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">3. Scan 忘记传指针</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Scan(x)</code> 传入值而非 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&x</code> 会导致编译错误：<code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">cannot use x (variable of type int) as type any</code>
              在有具体类型时无法通过。但如果 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">x</code> 本身已经是指针类型则可直接传入。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">4. Scanf 格式字符串中多余的换行</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Scanf("%d\n", &n)</code> 会等待两个换行符（格式中的
              <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">\n</code> 匹配任意空白）。推荐用 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Scanf("%d", &n)</code> 或改用 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Scan</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">5. %w 与 %v 在 Errorf 中混淆</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%v</code> 格式化 error
              时，错误信息被嵌入为字符串，切断了错误链。<code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">errors.Is(err, targetErr)</code> 将返回 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">false</code>。需要保留错误链时务必使用 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%w</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">6. 格式化参数数量不匹配</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              参数少于占位符时输出 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">%!s(MISSING)</code>；参数多于占位符时多余参数被丢弃且静默。使用 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go vet</code> 或 IDE 的静态检查来提前发现。
            </p>
          </div>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Print</strong> 直接输出，<strong>Println</strong> 加空格换行，<strong>Printf</strong>
              格式化输出——三者适用于不同场景</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Sprint 系列</strong> 返回字符串而非输出，是构建日志/错误/API 响应的核心工具</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Scan 系列</strong> 读取用户输入，牢记传入指针 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&var</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>fmt.Errorf + %w</strong> 是错误包装的标准方式，保留错误链供 <code
                class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">errors.Is</code> 穿透</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>宽度与精度</strong> 控制对齐和显示格式，是表格输出和 CLI 工具的基础</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>养成使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go vet</code>
              检查格式化参数匹配的习惯，避免运行时意外</span>
          </li>
        </ul>
      </section>

    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-3-operators"
          class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">
          ← 上一节：运算符与表达式
        </RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-5-control-flow"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">
          下一节：控制结构 (if/for/switch/goto) →
        </RouterLink>
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
    { id: "sec-1", name: "概述" },
    { id: "sec-2", name: "Print 系列 — 标准输出" },
    { id: "sec-3", name: "格式化动词（Verbs）完整参考" },
    { id: "sec-4", name: "Sprint 系列 — 格式化为字符串" },
    { id: "sec-5", name: "Scan 系列 — 读取用户输入" },
    { id: "sec-6", name: "Error 格式化 — fmt.Errorf 与 %w 包装" },
    { id: "sec-7", name: "宽度与精度控制" },
    { id: "sec-8", name: "实际用例" },
    { id: "sec-9", name: "常见错误与排坑指南" },
    { id: "sec-10", name: "小结" }
  ]
// ── Print 系列演示 ──
const printDemoCode = `package main

import "fmt"

func main() {
    name := "Gopher"
    age := 13
    pi := 3.14

    // Print — 无自动空格（纯字符串时）、无换行
    fmt.Print("Hello")
    fmt.Print("World")
    fmt.Print("\\n") // 手动换行

    // Print — 数值之间自动加空格
    fmt.Print("Age:", age, "Pi:", pi, "\\n")

    // Println — 操作数间始终加空格，自动换行
    fmt.Println("Name:", name, "Age:", age, "Pi:", pi)

    // Printf — 格式化输出（注意：不自动换行!）
    fmt.Printf("Name: %s, Age: %d, Pi: %.2f\\n", name, age, pi)
    fmt.Printf("Type of pi: %T, Value: %v\\n", pi, pi)

    // 多个 Printf 需要各自加 \\n
    fmt.Printf("Line 1\\n")
    fmt.Printf("Line 2\\n")
}`

const printDemoOutput = `$ go run print_demo.go
HelloWorld
Age:13Pi:3.14
Name: Gopher Age: 13 Pi: 3.14
Name: Gopher, Age: 13, Pi: 3.14
Type of pi: float64, Value: 3.14
Line 1
Line 2`

// ── 格式化动词演示 ──
const verbsCode = `package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alice", Age: 25}
    num := 255

    fmt.Println("=== 通用动词 ===")
    fmt.Printf("%%v  = %v\\n", p)   // {Alice 25}
    fmt.Printf("%%+v = %+v\\n", p)  // {Name:Alice Age:25}
    fmt.Printf("%%#v = %#v\\n", p)  // main.Person{Name:"Alice", Age:25}
    fmt.Printf("%%T  = %T\\n", p)   // main.Person
    fmt.Printf("%%%% = 100%%%%\\n")  // 100%

    fmt.Println("\\n=== 布尔与数值 ===")
    fmt.Printf("%%t = %t\\n", true)
    fmt.Printf("%%d = %d\\n", num)
    fmt.Printf("%%b = %b\\n", 5)
    fmt.Printf("%%o = %o\\n", 9)
    fmt.Printf("%%x = %x\\n", num)
    fmt.Printf("%%X = %X\\n", num)

    fmt.Println("\\n=== 浮点数 ===")
    fmt.Printf("%%f = %f\\n", 3.1415)
    fmt.Printf("%%e = %e\\n", 3141.5)
    fmt.Printf("%%E = %E\\n", 3141.5)

    fmt.Println("\\n=== 字符串与指针 ===")
    fmt.Printf("%%s = %s\\n", "hello")
    fmt.Printf("%%q = %q\\n", "hello\\tworld")
    fmt.Printf("%%p = %p\\n", &num)
}`

const verbsOutput = `$ go run verbs.go
=== 通用动词 ===
%v  = {Alice 25}
%+v = {Name:Alice Age:25}
%#v = main.Person{Name:"Alice", Age:25}
%T  = main.Person
%% = 100%

=== 布尔与数值 ===
%t = true
%d = 255
%b = 101
%o = 11
%x = ff
%X = FF

=== 浮点数 ===
%f = 3.141500
%e = 3.141500e+03
%E = 3.141500E+03

=== 字符串与指针 ===
%s = hello
%q = "hello\\tworld"
%p = 0xc000018030`

// ── Sprint 系列 ──
const sprintCode = `package main

import "fmt"

func main() {
    name := "Go"
    version := 1.23

    // Sprintf — 最常用：格式化后返回字符串
    msg := fmt.Sprintf("Language: %s v%.1f", name, version)
    fmt.Println("Sprintf:", msg)

    // Sprint — 拼接多个值
    joined := fmt.Sprint("Hello", " ", name, "!")
    fmt.Println("Sprint: ", joined)

    // Sprintln — 带空格和换行的拼接
    line := fmt.Sprintln("Line1", "Line2", "Line3")
    fmt.Print("Sprintln: ", line)

    // 实用：构建带上下文的错误消息或日志
    userID := 42
    action := "login"
    logMsg := fmt.Sprintf("[user:%d] action=%s status=ok", userID, action)
    fmt.Println(logMsg)

    // 实用：构建 SQL 参数 (仅示例，生产环境用参数化查询)
    table := "users"
    id := 100
    query := fmt.Sprintf("SELECT * FROM %s WHERE id = %d", table, id)
    fmt.Println("Generated query:", query)
}`

const sprintOutput = `$ go run sprint.go
Sprintf: Language: Go v1.2
Sprint:  HelloGo!
Sprintln: Line1 Line2 Line3
[user:42] action=login status=ok
Generated query: SELECT * FROM users WHERE id = 100`

// ── Scan 系列 ──
const scanCode = `package main

import "fmt"

func main() {
    // Scan — 按空格/换行分隔读取
    var name string
    var age int
    fmt.Print("Enter name and age: ")
    fmt.Scan(&name, &age) // 用户输入: Alice 25
    fmt.Printf("Hello %s, you are %d years old\\n", name, age)

    // Scanf — 按格式字符串解析
    var day, month, year int
    fmt.Print("Enter date (dd/mm/yyyy): ")
    fmt.Scanf("%d/%d/%d", &day, &month, &year) // 用户输入: 15/08/2024
    fmt.Printf("Year: %d, Month: %d, Day: %d\\n", year, month, day)

    // Scanln — 读取一行（换行即停止）
    var word1, word2 string
    fmt.Print("Enter two words: ")
    fmt.Scanln(&word1, &word2) // 用户输入: hello world
    fmt.Printf("Word1: %s, Word2: %s\\n", word1, word2)
}`

const scanOutput = `$ go run scan.go
Enter name and age: ← Alice 25
Hello Alice, you are 25 years old
Enter date (dd/mm/yyyy): ← 15/08/2024
Year: 2024, Month: 8, Day: 15
Enter two words: ← hello world
Word1: hello, Word2: world`

// ── Errorf ──
const errorfCode = `package main

import (
    "errors"
    "fmt"
    "os"
)

// 定义哨兵错误
var ErrNotFound = errors.New("not found")

func openFile(name string) error {
    _, err := os.Open(name)
    if err != nil {
        // %w 包装底层错误，保留错误链
        return fmt.Errorf("openFile(%q): %w", name, err)
    }
    return nil
}

func loadConfig(path string) error {
    if err := openFile(path); err != nil {
        // 再次包装，形成错误链:
        // loadConfig → openFile → os.Open
        return fmt.Errorf("loadConfig: %w", err)
    }
    return nil
}

func main() {
    err := loadConfig("/tmp/nonexistent.json")
    if err != nil {
        fmt.Println("Error:", err)

        // errors.Is 可以穿透 %w 包装链
        if errors.Is(err, os.ErrNotExist) {
            fmt.Println("→ 根本原因: 文件不存在")
        }
        if errors.Is(err, ErrNotFound) {
            fmt.Println("→ 这是 not found 错误")
        }
    }

    // 对比: %v 不保留错误链
    err2 := fmt.Errorf("wrapped with %%v: %v", err)
    fmt.Println("\\nerrors.Is(err2, os.ErrNotExist):", errors.Is(err2, os.ErrNotExist))
}`

const errorfOutput = `$ go run errorf.go
Error: loadConfig: openFile("/tmp/nonexistent.json"): open /tmp/nonexistent.json: no such file or directory
→ 根本原因: 文件不存在

errors.Is(err2, os.ErrNotExist): false`

// ── 格式化 ──
const formattingCode = `package main

import "fmt"

func main() {
    fmt.Println("=== 整数宽度 ===")
    fmt.Printf("|%5d|\\n", 42)    // 右对齐，宽度5
    fmt.Printf("|%-5d|\\n", 42)   // 左对齐，宽度5
    fmt.Printf("|%05d|\\n", 42)   // 前导零填充

    fmt.Println("\\n=== 浮点精度 ===")
    fmt.Printf("Pi = %.2f\\n", 3.1415926535)  // 2位小数
    fmt.Printf("Pi = %.4f\\n", 3.1415926535)  // 4位小数
    fmt.Printf("|%8.2f|\\n", 3.14)            // 总宽8，2位小数
    fmt.Printf("|%08.2f|\\n", 3.14)            // 零填充

    fmt.Println("\\n=== 字符串宽度 ===")
    fmt.Printf("|%10s|\\n", "Go")       // 右对齐
    fmt.Printf("|%-10s|\\n", "Go")      // 左对齐
    fmt.Printf("|%-10s|\\n", "Rust")    // 左对齐对比
    fmt.Printf("|%.5s|\\n", "Hello世界") // 截断前5个字节

    fmt.Println("\\n=== 动态宽度（用 * 号） ===")
    for i := 1; i <= 4; i++ {
        // * 从参数列表中取宽度值
        fmt.Printf("%*d\\n", i*2, i)
    }
}`

const formattingOutput = `$ go run formatting.go
=== 整数宽度 ===
|   42|
|42   |
|00042|

=== 浮点精度 ===
Pi = 3.14
Pi = 3.1416
|    3.14|
|00003.14|

=== 字符串宽度 ===
|        Go|
|Go        |
|Rust      |
|Hello|

=== 动态宽度（用 * 号） ===
 1
   2
     3
       4`

// ── 表格用例 ──
const tableCode = `package main

import (
    "fmt"
    "strings"
)

type Row struct {
    Name   string
    Qty    int
    Price  float64
    Total  float64
}

func main() {
    rows := []Row{
        {"Apple", 10, 0.99, 9.90},
        {"Banana", 5, 1.25, 6.25},
        {"Cherry", 20, 0.50, 10.00},
    }

    // 表头
    fmt.Println(strings.Repeat("─", 50))
    fmt.Printf("%-12s %5s %8s %8s\\n", "Item", "Qty", "Price", "Total")
    fmt.Println(strings.Repeat("─", 50))

    // 数据行
    for _, r := range rows {
        fmt.Printf("%-12s %5d %8.2f %8.2f\\n",
            r.Name, r.Qty, r.Price, r.Total)
    }
    fmt.Println(strings.Repeat("─", 50))

    // 汇总
    totalQty := 0
    totalPrice := 0.0
    for _, r := range rows {
        totalQty += r.Qty
        totalPrice += r.Total
    }
    fmt.Printf("%-12s %5d %8s %8.2f\\n", "TOTAL", totalQty, "", totalPrice)
    fmt.Println(strings.Repeat("─", 50))
}`

const tableOutput = `$ go run table.go
──────────────────────────────────────────────────
Item            Qty    Price    Total
──────────────────────────────────────────────────
Apple            10     0.99     9.90
Banana            5     1.25     6.25
Cherry           20     0.50    10.00
──────────────────────────────────────────────────
TOTAL            35              26.15
──────────────────────────────────────────────────`

// ── 调试输出 ──
const debugCode = `package main

import "fmt"

type Config struct {
    Host     string
    Port     int
    UseTLS   bool
    Timeout  float64
    Tags     []string
    Metadata map[string]string
}

func main() {
    cfg := Config{
        Host:    "localhost",
        Port:    8080,
        UseTLS:  false,
        Timeout: 30.5,
        Tags:    []string{"web", "api"},
        Metadata: map[string]string{
            "env":     "dev",
            "version": "1.0.0",
        },
    }

    fmt.Println("--- %v (默认格式) ---")
    fmt.Printf("%v\\n\\n", cfg)

    fmt.Println("--- %+v (含字段名) ---")
    fmt.Printf("%+v\\n\\n", cfg)

    fmt.Println("--- %#v (Go语法) ---")
    fmt.Printf("%#v\\n\\n", cfg)

    // 快速打印变量名和值
    name := "Gopher"
    age := 13
    fmt.Printf("DEBUG: name=%q, age=%d, cfg.Host=%s\\n", name, age, cfg.Host)
}`

const debugOutput = `$ go run debug.go
--- %v (默认格式) ---
{localhost 8080 false 30.5 [web api] map[env:dev version:1.0.0]}

--- %+v (含字段名) ---
{Host:localhost Port:8080 UseTLS:false Timeout:30.5 Tags:[web api] Metadata:map[env:dev version:1.0.0]}

--- %#v (Go语法) ---
main.Config{Host:"localhost", Port:8080, UseTLS:false, Timeout:30.5, Tags:[]string{"web", "api"}, Metadata:map[string]string{"env":"dev", "version":"1.0.0"}}

DEBUG: name="Gopher", age=13, cfg.Host=localhost`

// ── 日志模式 ──
const loggerCode = `package main

import (
    "fmt"
    "time"
)

// 简单的带级别日志函数
func logInfo(format string, args ...interface{}) {
    timestamp := time.Now().Format("2006-01-02 15:04:05")
    prefix := fmt.Sprintf("[%s] [INFO] ", timestamp)
    fmt.Printf(prefix+format+"\\n", args...)
}

func logError(format string, args ...interface{}) {
    timestamp := time.Now().Format("2006-01-02 15:04:05")
    prefix := fmt.Sprintf("[%s] [ERROR]", timestamp)
    fmt.Printf(prefix+format+"\\n", args...)
}

func main() {
    logInfo("Server starting on port %d", 3000)
    logInfo("Connected to database %s@%s", "mydb", "localhost:5432")
    logError("Failed to fetch user id=%d: %v", 42, "connection timeout")
    logInfo("Server shutting down")

    // 也可以直接用 Sprintf 构建日志消息
    reqID := "abc-123"
    logEntry := fmt.Sprintf(
        "[%s] [INFO] req=%s method=%s path=%s status=%d latency=%dms",
        time.Now().Format("15:04:05"),
        reqID,
        "GET",
        "/api/users",
        200,
        45,
    )
    fmt.Println(logEntry)
}`

const loggerOutput = `$ go run logger.go
[2024-01-15 10:30:00] [INFO] Server starting on port 3000
[2024-01-15 10:30:00] [INFO] Connected to database mydb@localhost:5432
[2024-01-15 10:30:01] [ERROR] Failed to fetch user id=42: connection timeout
[2024-01-15 10:30:02] [INFO] Server shutting down
[10:30:00] [INFO] req=abc-123 method=GET path=/api/users status=200 latency=45ms`
</script>
