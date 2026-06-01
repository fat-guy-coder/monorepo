<template>
  <div class="go-doc min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">运算符与表达式</h1>
          <p class="text-sm text-slate-500 mt-1">Go 语言的运算操作</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段1 · 基础</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 概述 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          概述
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          运算符是用于执行程序代码运算的符号。Go 语言内置了丰富的运算符，包括算术、关系、逻辑、位运算和赋值运算符。
          与许多其他语言不同，Go 的运算符设计更加简洁和严格，减少了歧义和常见错误。
        </p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>Go 没有前置自增/自减（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">++i</code>），只有后置形式且作为<b>语句</b>而非表达式</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>Go 没有三元运算符（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">? :</code>），需使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">if-else</code> 替代</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>类型比较严格：只能比较相同类型的值，编译期即可发现类型不匹配</span>
          </li>
        </ul>
      </section>

      <!-- 1. 算术运算符 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          算术运算符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          算术运算符用于执行基本的数学运算。Go 支持加、减、乘、除、取余，以及后置的自增和自减操作。
        </p>

        <!-- 算术运算符表格 -->
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">结果</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">+</td><td class="px-4 py-2 border border-slate-200">加法</td><td class="px-4 py-2 border border-slate-200 font-mono">5 + 3</td><td class="px-4 py-2 border border-slate-200 font-mono">8</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">-</td><td class="px-4 py-2 border border-slate-200">减法</td><td class="px-4 py-2 border border-slate-200 font-mono">5 - 3</td><td class="px-4 py-2 border border-slate-200 font-mono">2</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">*</td><td class="px-4 py-2 border border-slate-200">乘法</td><td class="px-4 py-2 border border-slate-200 font-mono">5 * 3</td><td class="px-4 py-2 border border-slate-200 font-mono">15</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">/</td><td class="px-4 py-2 border border-slate-200">除法</td><td class="px-4 py-2 border border-slate-200 font-mono">5 / 2</td><td class="px-4 py-2 border border-slate-200 font-mono">2</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">%</td><td class="px-4 py-2 border border-slate-200">取余</td><td class="px-4 py-2 border border-slate-200 font-mono">5 % 2</td><td class="px-4 py-2 border border-slate-200 font-mono">1</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">++</td><td class="px-4 py-2 border border-slate-200">自增（后置）</td><td class="px-4 py-2 border border-slate-200 font-mono">a++</td><td class="px-4 py-2 border border-slate-200">a 的值增加 1</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">--</td><td class="px-4 py-2 border border-slate-200">自减（后置）</td><td class="px-4 py-2 border border-slate-200 font-mono">a--</td><td class="px-4 py-2 border border-slate-200">a 的值减少 1</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 代码示例 -->
        <div class="mb-4">
          <Code language="go" :code="arithmeticCode" title="arithmetic.go" />
        </div>

        <!-- 输出 -->
        <div class="mb-4">
          <Code language="bash" :code="arithmeticOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- ⚠️ 整数除法警告 -->
      <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
        <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>Go 中整数除法会<b>截断</b>小数部分，不会四舍五入。<code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">5 / 2</code> 结果是 <code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">2</code> 而非 <code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">2.5</code>。如需浮点结果，至少有一个操作数必须是浮点类型：<code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">5.0 / 2</code> 或 <code class="bg-amber-100 px-1 rounded text-amber-900 text-xs">float64(5) / 2</code>。</p>
      </aside>

      <!-- 💡 ++/-- 是语句不是表达式 -->
      <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
        <p class="text-sm text-blue-800"><strong>💡 Go 特色：</strong><code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">++</code> 和 <code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">--</code> 在 Go 中是<b>语句（statement）</b>而非表达式（expression），这意味着它们不能嵌套在其他表达式中使用。例如 <code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">x = a++</code> 或 <code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">arr[i++]</code> 在 Go 中都是<b>编译错误</b>。这消除了 "i++ + ++i" 这种未定义行为的歧义。</p>
      </aside>

      <!-- 2. 比较运算符 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          比较运算符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          比较运算符用于比较两个值，结果为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">bool</code> 类型（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">true</code> 或 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">false</code>）。Go 要求比较的两个操作数<b>类型必须相同</b>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">结果</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">==</td><td class="px-4 py-2 border border-slate-200">等于</td><td class="px-4 py-2 border border-slate-200 font-mono">5 == 5</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">!=</td><td class="px-4 py-2 border border-slate-200">不等于</td><td class="px-4 py-2 border border-slate-200 font-mono">5 != 3</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&gt;</td><td class="px-4 py-2 border border-slate-200">大于</td><td class="px-4 py-2 border border-slate-200 font-mono">5 &gt; 3</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&lt;</td><td class="px-4 py-2 border border-slate-200">小于</td><td class="px-4 py-2 border border-slate-200 font-mono">3 &lt; 5</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&gt;=</td><td class="px-4 py-2 border border-slate-200">大于等于</td><td class="px-4 py-2 border border-slate-200 font-mono">5 &gt;= 5</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&lt;=</td><td class="px-4 py-2 border border-slate-200">小于等于</td><td class="px-4 py-2 border border-slate-200 font-mono">3 &lt;= 5</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 比较运算代码 -->
        <div class="mb-4">
          <Code language="go" :code="comparisonCode" title="comparison.go" />
        </div>
      </section>

      <!-- 💡 类型比较规则 -->
      <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
        <p class="text-sm text-blue-800"><strong>💡 类型比较规则：</strong>Go 只能比较<b>相同类型</b>的值。以下类型可以使用 <code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">==</code> 比较：布尔型、数值型、字符串、指针、通道、接口（值均为 nil 或动态类型相同且值相等）。<b>结构体</b>若所有字段可比较则结构体也可比较。<b>切片、map、函数</b>只能与 <code class="bg-blue-100 px-1 rounded text-blue-900 text-xs">nil</code> 比较，不可相互比较。</p>
      </aside>

      <!-- 3. 逻辑运算符 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          逻辑运算符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          逻辑运算符用于组合或取反布尔表达式，常用于条件判断。Go 的逻辑运算符采用<b>短路求值</b>（short-circuit evaluation），即一旦结果可以确定，不再计算后续表达式。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">结果</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&amp;&amp;</td><td class="px-4 py-2 border border-slate-200">逻辑与</td><td class="px-4 py-2 border border-slate-200 font-mono">true &amp;&amp; false</td><td class="px-4 py-2 border border-slate-200 font-mono">false</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">||</td><td class="px-4 py-2 border border-slate-200">逻辑或</td><td class="px-4 py-2 border border-slate-200 font-mono">true || false</td><td class="px-4 py-2 border border-slate-200 font-mono">true</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">!</td><td class="px-4 py-2 border border-slate-200">逻辑非</td><td class="px-4 py-2 border border-slate-200 font-mono">!true</td><td class="px-4 py-2 border border-slate-200 font-mono">false</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 短路求值说明 -->
        <div class="mb-4">
          <Code language="go" :code="logicalCode" title="logical.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="logicalOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- ✅ 短路求值最佳实践 -->
      <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
        <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>利用短路特性可以写出更安全的代码。例如先检查指针是否为 <code class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">nil</code> 再访问其字段：<code class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">if p != nil && p.Name == "hello"</code>，当 <code class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">p</code> 为 <code class="bg-emerald-100 px-1 rounded text-emerald-900 text-xs">nil</code> 时不会触发空指针异常。</p>
      </aside>

      <!-- 4. 位运算符 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          位运算符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          位运算符对整数的二进制位进行操作。在系统编程、权限管理、网络协议解析等场景非常实用。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&amp;</td><td class="px-4 py-2 border border-slate-200">按位与</td><td class="px-4 py-2 border border-slate-200 font-mono">5 &amp; 3</td><td class="px-4 py-2 border border-slate-200">对应位都为 1 则结果为 1</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">|</td><td class="px-4 py-2 border border-slate-200">按位或</td><td class="px-4 py-2 border border-slate-200 font-mono">5 | 3</td><td class="px-4 py-2 border border-slate-200">对应位有一个为 1 则结果为 1</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">^</td><td class="px-4 py-2 border border-slate-200">按位异或</td><td class="px-4 py-2 border border-slate-200 font-mono">5 ^ 3</td><td class="px-4 py-2 border border-slate-200">对应位不同则结果为 1</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&amp;^</td><td class="px-4 py-2 border border-slate-200">位清空</td><td class="px-4 py-2 border border-slate-200 font-mono">5 &amp;^ 3</td><td class="px-4 py-2 border border-slate-200">将右边为 1 的位在左边清 0</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&lt;&lt;</td><td class="px-4 py-2 border border-slate-200">左移</td><td class="px-4 py-2 border border-slate-200 font-mono">1 &lt;&lt; 3</td><td class="px-4 py-2 border border-slate-200">左移 3 位，相当于乘以 2³ = 8</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&gt;&gt;</td><td class="px-4 py-2 border border-slate-200">右移</td><td class="px-4 py-2 border border-slate-200 font-mono">8 &gt;&gt; 2</td><td class="px-4 py-2 border border-slate-200">右移 2 位，相当于除以 2² = 2</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 位运算演示代码 -->
        <div class="mb-4">
          <Code language="go" :code="bitwiseCode" title="bitwise.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="bitwiseOutput" title="📟 Terminal" />
        </div>

        <p class="text-slate-600 leading-relaxed">
          <strong>实际应用：</strong>位运算常用于权限标志位管理。例如用一个整数表示多种权限，每位代表一种权限的开关状态。
        </p>
      </section>

      <!-- 5. 赋值运算符 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          赋值运算符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          赋值运算符用于给变量赋值。Go 支持基本的赋值和复合赋值（先运算再赋值），可以简化代码书写。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">等价于</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">=</td><td class="px-4 py-2 border border-slate-200">基本赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a = 10</td><td class="px-4 py-2 border border-slate-200">—</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">+=</td><td class="px-4 py-2 border border-slate-200">加后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a += 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a + 3</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">-=</td><td class="px-4 py-2 border border-slate-200">减后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a -= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a - 3</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">*=</td><td class="px-4 py-2 border border-slate-200">乘后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a *= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a * 3</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">/=</td><td class="px-4 py-2 border border-slate-200">除后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a /= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a / 3</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">%=</td><td class="px-4 py-2 border border-slate-200">取余后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a %= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a % 3</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&amp;=</td><td class="px-4 py-2 border border-slate-200">位与后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a &amp;= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a &amp; 3</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">|=</td><td class="px-4 py-2 border border-slate-200">位或后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a |= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a | 3</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">^=</td><td class="px-4 py-2 border border-slate-200">异或后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a ^= 3</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a ^ 3</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&lt;&lt;=</td><td class="px-4 py-2 border border-slate-200">左移后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a &lt;&lt;= 2</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a &lt;&lt; 2</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">&gt;&gt;=</td><td class="px-4 py-2 border border-slate-200">右移后赋值</td><td class="px-4 py-2 border border-slate-200 font-mono">a &gt;&gt;= 2</td><td class="px-4 py-2 border border-slate-200 font-mono">a = a &gt;&gt; 2</td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="assignmentCode" title="assignment.go" />
        </div>
      </section>

      <!-- 6. 运算符优先级 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          运算符优先级
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当表达式中出现多个运算符时，优先级决定了运算的先后顺序。Go 的优先级层级较少，容易记忆。
          建议在复杂表达式中使用<b>括号</b>显式指定优先级，增强代码可读性。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优先级</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运算符</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">结合性</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">1（最高）</td><td class="px-4 py-2 border border-slate-200 font-mono">()  []  .</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">2</td><td class="px-4 py-2 border border-slate-200 font-mono">!  ^（一元）  -（负号）  +（正号）  &amp;（取地址）  *（解引用）</td><td class="px-4 py-2 border border-slate-200">右到左</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">3</td><td class="px-4 py-2 border border-slate-200 font-mono">*  /  %  &lt;&lt;  &gt;&gt;  &amp;  &amp;^</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">4</td><td class="px-4 py-2 border border-slate-200 font-mono">+  -  |  ^（二元）</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">5</td><td class="px-4 py-2 border border-slate-200 font-mono">==  !=  &lt;  &lt;=  &gt;  &gt;=</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">6</td><td class="px-4 py-2 border border-slate-200 font-mono">&lt;-（通道发送/接收）</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">7</td><td class="px-4 py-2 border border-slate-200 font-mono">&amp;&amp;</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700 text-center">8（最低）</td><td class="px-4 py-2 border border-slate-200 font-mono">||</td><td class="px-4 py-2 border border-slate-200">左到右</td></tr>
            </tbody>
          </table>
        </div>

        <!-- 优先级演示 -->
        <div class="mb-4">
          <Code language="go" :code="precedenceCode" title="precedence.go" />
        </div>

        <div class="mb-4">
          <Code language="bash" :code="precedenceOutput" title="📟 Terminal" />
        </div>
      </section>

      <!-- 7. Go 特殊行为 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          Go 特殊行为详解
        </h2>

        <!-- ++/-- 是语句不是表达式 -->
        <h3 class="text-md font-semibold text-slate-700 mb-3">① ++ 和 -- 是语句，不是表达式</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          这是 Go 与其他语言（C/C++/Java/JavaScript）最显著的区别之一。Go 中 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">++</code> 和 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">--</code> 只能作为独立的<b>语句</b>使用，不能嵌套在表达式中。
        </p>

        <div class="mb-4">
          <Code language="go" :code="incDecCode" title="incdec.go" />
        </div>

        <!-- 没有三元运算符 -->
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-5">② 没有三元运算符，使用 if-else 替代</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Go 语言设计者认为三元运算符会让代码难以阅读，因此刻意没有加入。需要用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">if-else</code> 来实现等价逻辑。
        </p>

        <div class="mb-4">
          <Code language="go" :code="ternaryCode" title="ternary.go" />
        </div>
      </section>

      <!-- 8. 类型比较规则 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          类型比较规则详解
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 对类型比较有严格的规则，了解这些规则可以避免编译错误和运行时意外。
        </p>

        <ul class="space-y-3 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>数值类型：</strong>只能同类型比较（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">int</code> 和 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">int64</code> 不能直接比较），需要显式类型转换</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>字符串：</strong>按字节逐位比较（字典序），支持 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">==</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">!=</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&lt;</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&gt;</code> 等所有比较运算符</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>结构体：</strong>如果所有字段都是可比较类型，则结构体可比较（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">==</code> 逐字段比较）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>切片、map、函数：</strong>只能与 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">nil</code> 比较，<b>不能</b>使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">==</code> 比较两个切片/map</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>接口：</strong>两个接口值相等当且仅当两者都为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">nil</code> 或动态类型相同且动态值相等</span>
          </li>
        </ul>

        <div class="mb-4">
          <Code language="go" :code="typeCompareCode" title="type_compare.go" />
        </div>
      </section>

      <!-- 9. 常见陷阱 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见陷阱与注意事项
        </h2>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">1. 整数除法截断</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">3 / 2</code> 结果为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">1</code> 而非 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">1.5</code>。需要浮点运算时，使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">float64(3) / 2</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">2. 整数溢出</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Go 的整数有固定范围，溢出会静默回绕（wrap around）。例如 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">int8(127) + 1</code> 结果为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-128</code>。Go 1.22+ 没有内置溢出检测，需自行注意。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">3. 字符串比较的时间攻击风险</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">==</code> 比较敏感字符串（如密码哈希）可能受到计时攻击。应使用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">subtle.ConstantTimeCompare</code> 进行常量时间比较。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">4. 浮点数比较</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              不要用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">==</code> 直接比较浮点数。由于精度问题，应比较差值是否在极小范围内：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">math.Abs(a - b) &lt; 1e-9</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">5. 取余运算符的符号</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Go 中取余结果的符号<b>与被除数相同</b>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-5 % 3</code> 结果为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-2</code>，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">5 % -3</code> 结果为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">2</code>。
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-700 mb-1">6. 位运算符优先级陷阱</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              位运算符 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&lt;&lt;</code> 和 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&gt;&gt;</code> 的优先级<b>低于</b> <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">+</code> 和 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-</code>。例如 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">1 &lt;&lt; 2 + 3</code> 等同于 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">1 &lt;&lt; 5</code> 而非 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">(1 &lt;&lt; 2) + 3</code>。建议始终加括号。
            </p>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>Go 的运算符设计简洁严格，没有前置 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">++</code>/<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">--</code>，没有三元运算符</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>类型比较严格，编译期防止类型不匹配的错误</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>逻辑运算符支持短路求值，可用来编写更安全的代码</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>位运算符是权限管理和高效计算的利器</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>复杂表达式中使用括号显式指定优先级，既安全又清晰</span>
          </li>
        </ul>
      </section>

    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-2-variables-types"
          class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1"
        >
          ← 上一节：变量、常量与数据类型
        </RouterLink>
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-4-fmt-io"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1"
        >
          下一节：fmt 格式化输入输出 →
        </RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code } from 'components'
import { RouterLink } from 'vue-router'

// ── 算术运算符 ──
const arithmeticCode = `package main

import "fmt"

func main() {
    a, b := 10, 3

    fmt.Println("加法:", a+b)   // 13
    fmt.Println("减法:", a-b)   // 7
    fmt.Println("乘法:", a*b)   // 30
    fmt.Println("除法:", a/b)   // 3 (整数截断)
    fmt.Println("取余:", a%b)   // 1

    // 浮点除法
    fmt.Println("浮点除:", float64(a)/float64(b)) // 3.333...

    // 自增自减 (只能后置)
    x := 5
    x++  // x 变为 6
    fmt.Println("自增后:", x)
    x--  // x 变为 5
    fmt.Println("自减后:", x)
}`

const arithmeticOutput = `$ go run arithmetic.go
加法: 13
减法: 7
乘法: 30
除法: 3
取余: 1
浮点除: 3.3333333333333335
自增后: 6
自减后: 5`

// ── 比较运算符 ──
const comparisonCode = `package main

import "fmt"

func main() {
    a, b := 10, 3

    fmt.Println("a == b:", a == b)  // false
    fmt.Println("a != b:", a != b)  // true
    fmt.Println("a > b: ", a > b)   // true
    fmt.Println("a < b: ", a < b)   // false
    fmt.Println("a >= b:", a >= b)  // true
    fmt.Println("a <= b:", a <= b)  // false

    // 字符串比较 (字典序)
    fmt.Println("\\"abc\\" == \\"abc\\":", "abc" == "abc") // true
    fmt.Println("\\"abc\\" < \\"abd\\":", "abc" < "abd")   // true

    // 同类型才能比较，下面代码编译报错:
    // var i int = 5
    // var f float64 = 5.0
    // fmt.Println(i == f) // ❌ 编译错误: 类型不匹配
}`

// ── 逻辑运算符 ──
const logicalCode = `package main

import "fmt"

func main() {
    t, f := true, false

    fmt.Println("t && f:", t && f)  // false
    fmt.Println("t || f:", t || f)  // true
    fmt.Println("!t:    ", !t)      // false

    // 短路求值演示
    fmt.Println("--- 短路求值 ---")
    // || 左边为 true，右边不执行
    if true || expensiveCall() {
        fmt.Println("短路: expensiveCall 未调用")
    }
    // && 左边为 false，右边不执行
    if false && expensiveCall() {
        fmt.Println("这行不会执行")
    }
}

func expensiveCall() bool {
    fmt.Println("expensiveCall 被调用了!")
    return true
}`

const logicalOutput = `$ go run logical.go
t && f: false
t || f: true
!t:     false
--- 短路求值 ---
短路: expensiveCall 未调用`

// ── 位运算符 ──
const bitwiseCode = `package main

import "fmt"

func main() {
    a, b := 5, 3 // 二进制: 5=0101, 3=0011

    fmt.Printf("a & b  = %d (按位与: 0101 & 0011 = 0001)\\n", a&b)
    fmt.Printf("a | b  = %d (按位或: 0101 | 0011 = 0111)\\n", a|b)
    fmt.Printf("a ^ b  = %d (异或:   0101 ^ 0011 = 0110)\\n", a^b)
    fmt.Printf("a &^ b = %d (位清空: 0101 &^ 0011 = 0100)\\n", a&^b)
    fmt.Printf("a << 2 = %d (左移2位)\\n", a<<2)
    fmt.Printf("b >> 1 = %d (右移1位)\\n", b>>1)

    // 一元 ^ 是取反 (不同于二元 ^ 异或)
    var c uint8 = 0b00001111
    fmt.Printf("^c = %08b (按位取反)\\n", ^c)

    // 实际应用: 权限标志位
    fmt.Println("\\n--- 权限标志位示例 ---")
    const (
        Read    = 1 << 0 // 001 = 1
        Write   = 1 << 1 // 010 = 2
        Execute = 1 << 2 // 100 = 4
    )
    perm := Read | Write           // 011 = 3
    fmt.Printf("权限: %03b\\n", perm)
    fmt.Printf("可读? %v\\n", perm&Read != 0)    // true
    fmt.Printf("可执行? %v\\n", perm&Execute != 0) // false
}`

const bitwiseOutput = `$ go run bitwise.go
a & b  = 1 (按位与: 0101 & 0011 = 0001)
a | b  = 7 (按位或: 0101 | 0011 = 0111)
a ^ b  = 6 (异或:   0101 ^ 0011 = 0110)
a &^ b = 4 (位清空: 0101 &^ 0011 = 0100)
a << 2 = 20 (左移2位)
b >> 1 = 1 (右移1位)
^c = 11110000 (按位取反)

--- 权限标志位示例 ---
权限: 011
可读? true
可执行? false`

// ── 赋值运算符 ──
const assignmentCode = `package main

import "fmt"

func main() {
    x := 10
    fmt.Println("初始:", x)  // 10

    x += 5
    fmt.Println("x += 5:", x) // 15

    x -= 3
    fmt.Println("x -= 3:", x) // 12

    x *= 2
    fmt.Println("x *= 2:", x) // 24

    x /= 4
    fmt.Println("x /= 4:", x) // 6

    x %= 4
    fmt.Println("x %= 4:", x) // 2

    x <<= 3
    fmt.Println("x <<= 3:", x) // 16

    x >>= 2
    fmt.Println("x >>= 2:", x) // 4
}`

// ── 运算符优先级 ──
const precedenceCode = `package main

import "fmt"

func main() {
    // 演示优先级差异

    // * 优先级高于 +，等价于 (3*4) + 5
    fmt.Println("3 + 4*5 =", 3+4*5) // 23

    // << 优先级低于 +，等价于 1 << (2+3)
    fmt.Println("1 << 2 + 3 =", 1<<2+3) // 32

    // 用括号明确意图 (推荐)
    fmt.Println("(1 << 2) + 3 =", (1<<2)+3) // 7

    // && 优先级高于 ||，等价于 true || (false && false)
    fmt.Println("true || false && false =", true || false && false) // true

    // 复杂表达式建议用括号
    result := (5+3)*2 - (10>>1)&3
    fmt.Println("(5+3)*2 - (10>>1)&3 =", result)
}`

const precedenceOutput = `$ go run precedence.go
3 + 4*5 = 23
1 << 2 + 3 = 32
(1 << 2) + 3 = 7
true || false && false = true
(5+3)*2 - (10>>1)&3 = 15`

// ── ++/-- 是语句不是表达式 ──
const incDecCode = `package main

import "fmt"

func main() {
    x := 0

    // ✅ 正确: 作为独立语句
    x++
    fmt.Println("x++ 后:", x) // 1
    x--
    fmt.Println("x-- 后:", x) // 0

    // ❌ 错误: 不能作为表达式使用
    // y := x++          // 编译错误: syntax error
    // fmt.Println(x++)  // 编译错误: syntax error
    // arr[x++] = 1      // 编译错误: syntax error
    // if x++ > 0 {}     // 编译错误: syntax error

    // ✅ 正确: 需要结果时这样写
    y := x
    x++
    fmt.Println("y:", y, "x:", x) // y:0, x:1

    // ✅ 正确: for 循环中的惯用写法
    for i := 0; i < 3; i++ {
        fmt.Println("i:", i)
    }
}`

// ── if-else 替代三元运算符 ──
const ternaryCode = `package main

import "fmt"

func main() {
    score := 85

    // ❌ Go 没有: result := score > 60 ? "及格" : "不及格"

    // ✅ 方式1: 直接 if-else
    var result string
    if score >= 60 {
        result = "及格"
    } else {
        result = "不及格"
    }
    fmt.Println("结果:", result)

    // ✅ 方式2: 立即执行的匿名函数 (适合初始化)
    grade := func() string {
        if score >= 90 {
            return "优秀"
        } else if score >= 60 {
            return "及格"
        }
        return "不及格"
    }()
    fmt.Println("等级:", grade)

    // ✅ 方式3: 在变量声明中 (简单条件)
    max := 0
    a, b := 10, 20
    if a > b {
        max = a
    } else {
        max = b
    }
    fmt.Println("最大值:", max)
}`

// ── 类型比较规则 ──
const typeCompareCode = `package main

import "fmt"

type Point struct {
    X, Y int
}

func main() {
    // ✅ 同类型比较
    fmt.Println("5 == 5:", 5 == 5)                    // true

    // ✅ 字符串比较 (所有比较运算符)
    fmt.Println("\\"go\\" == \\"go\\":", "go" == "go")   // true
    fmt.Println("\\"ab\\" < \\"ac\\":", "ab" < "ac")     // true

    // ✅ 结构体比较 (所有字段可比较)
    p1 := Point{X: 1, Y: 2}
    p2 := Point{X: 1, Y: 2}
    p3 := Point{X: 3, Y: 4}
    fmt.Println("p1 == p2:", p1 == p2) // true
    fmt.Println("p1 == p3:", p1 == p3) // false
    fmt.Println("p1 != p3:", p1 != p3) // true

    // ✅ 指针比较 (比较地址)
    a, b := 10, 10
    fmt.Println("&a == &b:", &a == &b) // false (不同地址)

    // ✅ 切片/map/函数 只能与 nil 比较
    var s []int
    fmt.Println("s == nil:", s == nil) // true
    // s1 := []int{1}
    // s2 := []int{1}
    // fmt.Println(s1 == s2) // ❌ 编译错误
}`
</script>
