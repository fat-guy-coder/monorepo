<template>
  <div class="go-doc min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">变量、常量与数据类型</h1>
          <p class="text-sm text-slate-500 mt-1">Go 语言的基本数据表示</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-2</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 1. 变量声明 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          变量声明（Variable Declaration）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 提供了两种声明变量的方式：使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">var</code> 关键字和短变量声明 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code>。两种方式各有适用场景。
        </p>

        <!-- var 关键字 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">var 关键字</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">var</code> 可以显式指定类型，也可以省略类型让编译器自动推断。未初始化的变量会被赋予零值（见后文）。
        </p>
        <div class="mb-4">
          <Code language="go" :code="varDeclarationCode" title="var_declaration.go" />
        </div>

        <!-- := 短声明 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">短变量声明 :=</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code> 只能在<strong>函数内部</strong>使用，编译器根据右侧的值自动推断类型。这是 Go 中最常用的声明方式。
        </p>
        <div class="mb-4">
          <Code language="go" :code="shortDeclCode" title="short_declaration.go" />
        </div>

        <!-- var vs := 对比表 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">var vs := 对比</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">var</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">:=</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">可用范围</td>
                <td class="px-4 py-2 border border-slate-200">包级别 + 函数内部</td>
                <td class="px-4 py-2 border border-slate-200">仅函数内部</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">类型指定</td>
                <td class="px-4 py-2 border border-slate-200">可显式指定类型</td>
                <td class="px-4 py-2 border border-slate-200">自动推断</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">零值初始化</td>
                <td class="px-4 py-2 border border-slate-200">支持（不赋值时为零值）</td>
                <td class="px-4 py-2 border border-slate-200">不支持（必须赋值）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">重复声明</td>
                <td class="px-4 py-2 border border-slate-200">可重复声明<br /><span class="text-xs text-slate-400">var x int; var x int（错误）</span></td>
                <td class="px-4 py-2 border border-slate-200">至少一个变量是新的即可<br /><span class="text-xs text-slate-400">x := 1; x, y := 2, 3（合法）</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 基本数据类型 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          基本数据类型（Basic Data Types）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 是一种<strong>静态强类型</strong>语言，每个变量在编译时都有确定的类型且不可隐式改变。以下为 Go 的所有基本数据类型。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">分类</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">大小</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">取值范围 / 说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium" rowspan="5">整数</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">int</td>
                <td class="px-4 py-2 border border-slate-200">32/64 位<br /><span class="text-xs text-slate-400">取决于平台</span></td>
                <td class="px-4 py-2 border border-slate-200">与平台字长一致</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">int8 ~ int64</td>
                <td class="px-4 py-2 border border-slate-200">8/16/32/64 位</td>
                <td class="px-4 py-2 border border-slate-200">有符号整数，明确大小</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">uint</td>
                <td class="px-4 py-2 border border-slate-200">32/64 位</td>
                <td class="px-4 py-2 border border-slate-200">无符号，与平台字长一致</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">uint8 ~ uint64</td>
                <td class="px-4 py-2 border border-slate-200">8/16/32/64 位</td>
                <td class="px-4 py-2 border border-slate-200">无符号整数，明确大小</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">uintptr</td>
                <td class="px-4 py-2 border border-slate-200">平台相关</td>
                <td class="px-4 py-2 border border-slate-200">足以存放指针的无符号整数</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium" rowspan="3">浮点数</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">float32</td>
                <td class="px-4 py-2 border border-slate-200">32 位</td>
                <td class="px-4 py-2 border border-slate-200">IEEE-754 单精度</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">float64</td>
                <td class="px-4 py-2 border border-slate-200">64 位</td>
                <td class="px-4 py-2 border border-slate-200">IEEE-754 双精度（默认浮点类型）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">complex64 / complex128</td>
                <td class="px-4 py-2 border border-slate-200">64/128 位</td>
                <td class="px-4 py-2 border border-slate-200">复数，由两个 float32/64 组成</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">布尔</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">bool</td>
                <td class="px-4 py-2 border border-slate-200">1 字节</td>
                <td class="px-4 py-2 border border-slate-200">true / false</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium" rowspan="3">字符串与别名</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">string</td>
                <td class="px-4 py-2 border border-slate-200">可变</td>
                <td class="px-4 py-2 border border-slate-200">UTF-8 编码的不可变字节序列</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">byte</td>
                <td class="px-4 py-2 border border-slate-200">1 字节</td>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-50 text-cyan-700 px-1 rounded text-xs font-mono">uint8</code> 的别名，代表单个 ASCII 字符</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">rune</td>
                <td class="px-4 py-2 border border-slate-200">4 字节</td>
                <td class="px-4 py-2 border border-slate-200"><code class="bg-slate-50 text-cyan-700 px-1 rounded text-xs font-mono">int32</code> 的别名，代表单个 Unicode 码点</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>日常开发中推荐优先使用 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">int</code> 和 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">float64</code>。只有在需要精确控制内存布局或与特定协议交互时，才选择固定大小的类型。</p>
        </aside>

        <!-- 类型声明示例 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">类型声明示例</h3>
        <div class="mb-4">
          <Code language="go" :code="dataTypesCode" title="data_types.go" />
        </div>
      </section>

      <!-- 3. 零值 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          零值（Zero Values）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 Go 中，声明变量时如果不赋初始值，变量会被自动赋予该类型的<strong>零值</strong>。这一特性避免了其他语言中"未初始化变量"带来的不确定行为。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">零值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">int, int8~64</td><td class="px-4 py-2 border border-slate-200 font-mono">0</td><td class="px-4 py-2 border border-slate-200">所有整数类型</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">uint, uint8~64</td><td class="px-4 py-2 border border-slate-200 font-mono">0</td><td class="px-4 py-2 border border-slate-200">所有无符号整数类型</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">float32, float64</td><td class="px-4 py-2 border border-slate-200 font-mono">0.0</td><td class="px-4 py-2 border border-slate-200">浮点数</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">complex64, complex128</td><td class="px-4 py-2 border border-slate-200 font-mono">0+0i</td><td class="px-4 py-2 border border-slate-200">复数</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">bool</td><td class="px-4 py-2 border border-slate-200 font-mono">false</td><td class="px-4 py-2 border border-slate-200">布尔值</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">string</td><td class="px-4 py-2 border border-slate-200 font-mono">""</td><td class="px-4 py-2 border border-slate-200">空字符串（不是 nil）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">指针, slice, map, chan, func, interface</td><td class="px-4 py-2 border border-slate-200 font-mono">nil</td><td class="px-4 py-2 border border-slate-200">引用类型</td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="zeroValuesCode" title="zero_values.go" />
        </div>
      </section>

      <!-- 4. 类型转换 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          类型转换（Type Conversion）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 中的类型转换是<strong>显式的</strong>——不存在隐式类型转换。不同类型的数值之间运算也必须先转换，这从语言层面杜绝了许多隐蔽的 bug。
        </p>

        <div class="mb-4">
          <Code language="go" :code="typeConversionCode" title="type_conversion.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>类型转换可能造成数据丢失！例如将 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">int64</code> 转为 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">int8</code> 时，高位会被截断。转换前请确保值在目标类型的取值范围内。</p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>Go 不允许隐式转换虽然会增加代码量，但保证了类型安全。如果某个值需要多种类型，建议在源头就用正确的类型声明，或者封装转换函数统一管理。</p>
        </aside>
      </section>

      <!-- 5. 常量 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常量（Constants）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">const</code> 关键字声明常量。常量在编译时确定值，不能使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code> 声明，也不能被重新赋值。
        </p>

        <!-- 有类型 vs 无类型常量 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">有类型常量 vs 无类型常量</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          无类型常量（untyped constant）没有固定的类型，在与不同类型的变量运算时会自动适配。有类型常量则遵循严格的类型规则。
        </p>
        <div class="mb-4">
          <Code language="go" :code="constantsCode" title="constants.go" />
        </div>

        <!-- iota -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">iota 枚举器</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">iota</code> 是 Go 的常量计数器，在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">const</code> 块中从 0 开始自增，非常适合定义枚举值。
        </p>
        <div class="mb-4">
          <Code language="go" :code="iotaCode" title="iota_enum.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">iota</code> 在每个 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">const</code> 块中都会重置为 0。如果需要跨块连续计数，需要在块外使用变量。</p>
        </aside>
      </section>

      <!-- 6. 变量作用域 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          变量作用域（Variable Scope）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的作用域由代码块 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">{ }</code> 界定。变量从声明处开始可见，到所在代码块结束时失效。
        </p>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>包级作用域：</strong>在函数外部（所有 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">func</code> 之外）使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">var</code> 声明的变量，整个包内可见。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>函数级作用域：</strong>在函数内部声明的变量，仅该函数内可见。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>块级作用域：</strong>在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">if</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">switch</code> 等语句块内声明的变量，仅该块内可见。</span>
          </li>
        </ul>

        <div class="mb-4">
          <Code language="go" :code="scopeCode" title="scope.go" />
        </div>
      </section>

      <!-- 7. 命名规范 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          命名规范（Naming Conventions）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的命名规范简洁而严格，核心规则只有一条：<strong>首字母大小写决定可见性</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">规则</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">可见性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200">大写字母开头</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600 font-medium">导出（Exported）</span><br /><span class="text-xs text-slate-400">包外可访问</span></td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">UserName</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">小写字母开头</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-amber-600 font-medium">未导出（Unexported）</span><br /><span class="text-xs text-slate-400">仅包内可访问</span></td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">userName</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>使用 <strong>驼峰命名法</strong>（camelCase），不使用下划线 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">user_name</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>缩写词<strong>全部大写</strong>或全部小写：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">HTTPServer</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">urlParser</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>包名使用<strong>小写单数</strong>单词，简短且有意义：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">http</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>单字母变量名在短作用域中可接受：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for i := 0; ...</code></span>
          </li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>Go 没有 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">public</code> / <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">private</code> 关键字，首字母大小写就是唯一的可见性控制机制。这种设计简洁而优雅。</p>
        </aside>
      </section>

      <!-- 8. 多变量声明 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          多变量声明（Multiple Declaration）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 支持在一个语句中同时声明或赋值多个变量，这在错误处理和多返回值场景中尤为常见。
        </p>

        <div class="mb-4">
          <Code language="go" :code="multipleDeclCode" title="multiple_decl.go" />
        </div>
      </section>

      <!-- 9. 常见错误 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误（Common Mistakes）
        </h2>

        <!-- 错误1：未使用的变量 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">未使用的变量</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 编译器要求所有声明的<strong>局部变量</strong>必须被使用，否则编译报错。包级变量不受此限制。
        </p>
        <div class="mb-4">
          <Code language="go" :code="unusedErrorCode" title="unused_error.go" />
        </div>

        <!-- 错误2：变量遮蔽 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">变量遮蔽（Variable Shadowing）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在内层作用域中使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code> 会创建一个<strong>新的同名变量</strong>，遮蔽外层变量而非修改它。这是 Go 新手最容易踩的坑之一。
        </p>
        <div class="mb-4">
          <Code language="go" :code="shadowingCode" title="shadowing.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 警告：</strong>变量遮蔽不会引起编译错误，编译器只会给一个温和的警告（需启用 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">go vet</code>）。这可能导致逻辑 bug 且难以排查。在内层作用域中如果要修改外层变量，请使用普通赋值 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">=</code> 而非 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">:=</code>。</p>
        </aside>
      </section>

      <!-- 底部导航 -->
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-1-env-tools"
          class="text-slate-500 hover:text-cyan-600 transition-colors text-sm flex items-center gap-1"
        >
          ← 上一节：环境搭建与工具链
        </RouterLink>
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-3-operators"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors text-sm flex items-center gap-1"
        >
          下一节：运算符与表达式 →
        </RouterLink>
      </nav>

    </main>
  </div>
</template>

<script setup lang="ts">
import { Code } from 'components'
import { RouterLink } from 'vue-router'

const varDeclarationCode = `package main

import "fmt"

func main() {
    // 显式指定类型
    var name string = "Go"
    var age int = 15

    // 类型推断（省略类型）
    var version = 1.23
    var isFun = true

    // 声明但不赋值 → 零值
    var counter int      // counter = 0
    var message string   // message = ""

    fmt.Println(name, age, version, isFun, counter, message)
}`

const shortDeclCode = `package main

import "fmt"

func main() {
    // := 短声明，类型自动推断
    name := "Go"
    age := 15
    version := 1.23
    isFun := true

    // 批量短声明
    x, y, z := 1, 2, 3

    // 函数返回值接收（常见用法）
    // result, err := someFunction()

    fmt.Println(name, age, version, isFun, x, y, z)
}

// ❌ 不能在包级别使用 :=
// global := "error"  // 编译错误！
`

const dataTypesCode = `package main

import "fmt"

func main() {
    // 整数
    var i int = 42
    var i8 int8 = 127          // -128 ~ 127
    var u uint = 100
    var u8 uint8 = 255         // 0 ~ 255

    // 浮点数
    var f32 float32 = 3.14
    var f64 float64 = 2.718281828459045

    // 复数
    var c64 complex64 = 1 + 2i
    var c128 complex128 = complex(3, 4)

    // 布尔
    var ok bool = true
    var fail bool = false

    // 字符串
    var s string = "Hello, 世界"

    // byte（uint8 别名，用于 ASCII）
    var b byte = 'A'           // byte = 65

    // rune（int32 别名，用于 Unicode）
    var r rune = '中'          // rune = 20013

    fmt.Println(i, i8, u, u8)
    fmt.Println(f32, f64)
    fmt.Println(c64, c128)
    fmt.Println(ok, fail)
    fmt.Println(s, string(b), string(r))
}`

const zeroValuesCode = `package main

import "fmt"

func main() {
    var i int           // 0
    var f float64       // 0.0
    var c complex128    // (0+0i)
    var b bool          // false
    var s string        // "" (空字符串，不是 nil)
    var by byte         // 0

    fmt.Println("int:", i)
    fmt.Println("float64:", f)
    fmt.Println("complex128:", c)
    fmt.Println("bool:", b)
    fmt.Println("string:", s, "| 长度:", len(s))
    fmt.Println("byte:", by)

    // 引用类型零值为 nil
    var p *int          // nil 指针
    var sl []int        // nil 切片
    var m map[string]int // nil map
    // var ch chan int  // nil channel
    // var fn func()    // nil function

    fmt.Println("指针:", p)
    fmt.Println("切片:", sl, "| is nil?", sl == nil)
    fmt.Println("map:", m, "| is nil?", m == nil)
}`

const typeConversionCode = `package main

import "fmt"

func main() {
    var i int = 42
    var f float64 = float64(i)   // int → float64
    var u uint = uint(f)          // float64 → uint

    fmt.Println(i, f, u)

    // 不同整数类型之间也必须显式转换
    var a int64 = 100
    var b int32 = int32(a)        // int64 → int32
    fmt.Println(b)

    // 整数与浮点数运算需要转换
    x := 10
    y := 3.5
    result := float64(x) + y      // int → float64
    fmt.Println(result)

    // 数字转字符串：用 strconv 包
    // import "strconv"
    // s := strconv.Itoa(42)       // "42"
    // s := strconv.FormatFloat(3.14, 'f', 2, 64)

    // ❌ 隐式转换不存在
    // var z float64 = i           // 编译错误！
    // var sum = x + y             // 编译错误！类型不匹配
    // var s string = string(65)   // 注意：这不是 "65"，而是 "A"！
}`

const constantsCode = `package main

import "fmt"

func main() {
    // 无类型常量（推荐）— 可以灵活参与不同精度运算
    const pi = 3.14159
    const greeting = "Hello"

    // 有类型常量
    const maxConnections int = 100
    const appName string = "MyApp"

    // 常量表达式（编译时求值）
    const secondsPerDay = 60 * 60 * 24

    // 无类型常量的灵活性
    var f32 float32 = pi       // pi 自动适配 float32
    var f64 float64 = pi       // pi 自动适配 float64
    // var i int = pi           // 编译错误：pi (float) 不能赋给 int

    fmt.Println(pi, greeting, maxConnections, appName)
    fmt.Println(secondsPerDay, f32, f64)
}`

const iotaCode = `package main

import "fmt"

func main() {
    // 基本用法：从 0 开始自增
    const (
        Sunday = iota    // 0
        Monday           // 1（继承 iota 表达式）
        Tuesday          // 2
        Wednesday        // 3
        Thursday         // 4
        Friday           // 5
        Saturday         // 6
    )
    fmt.Println(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)

    // iota 高级用法：位掩码
    const (
        Read    = 1 << iota  // 1 << 0 = 1
        Write                 // 1 << 1 = 2
        Execute               // 1 << 2 = 4
    )
    fmt.Println(Read, Write, Execute)

    // iota 重置：新的 const 块中从 0 重新开始
    const (
        A = iota   // 0
        B          // 1
    )
    const (
        C = iota   // 0（重新开始）
        D          // 1
    )
    fmt.Println(A, B, C, D)
}`

const scopeCode = `package main

import "fmt"

// 包级变量（整个包内可见）
var packageVar = "我是包级变量"

func main() {
    // 函数级变量（仅 main 内可见）
    funcVar := "我是函数级变量"
    fmt.Println(packageVar, funcVar)

    // if 语句块级作用域
    if x := 10; x > 5 {
        y := "在 if 内部"
        fmt.Println(y, x)       // 可以访问 x 和 y
    }
    // fmt.Println(x, y)        // 编译错误！x 和 y 在此不可见

    // for 循环块级作用域
    for i := 0; i < 3; i++ {
        fmt.Println("循环内:", i) // i 只在 for 块内可见
    }
    // fmt.Println(i)           // 编译错误！i 不可见
}

func anotherFunc() {
    // 可以访问 packageVar，但不能访问 funcVar
    fmt.Println(packageVar)
    // fmt.Println(funcVar)     // 编译错误！funcVar 不可见
}`

const multipleDeclCode = `package main

import "fmt"

func main() {
    // var 块批量声明（包级别常用）
    var (
        name    string = "Go"
        version        = 1.23
        count   int    // 零值 0
    )

    // 平行赋值（交换值非常方便）
    a, b := 10, 20
    a, b = b, a               // 交换：a=20, b=10

    // 函数多返回值接收
    // file, err := os.Open("data.txt")

    // 至少一个变量是新的即可使用 :=
    x := 1
    x, y := 2, 3              // 合法：y 是新变量
    x, y = y, x               // 使用 = 而非 :=
    // x, y := 4, 5           // 编译错误：没有新变量！

    fmt.Println(name, version, count)
    fmt.Println(a, b, x, y)
}`

const unusedErrorCode = `package main

func main() {
    message := "Hello"
    counter := 42

    fmt.Println(message)
    // counter declared but not used → 编译错误！
    // 修复：使用它，或用 _ 显式忽略
    // _ = counter
}`

const shadowingCode = `package main

import "fmt"

var count = 100 // 包级变量

func main() {
    count := 200 // ⚠️ 创建了新的局部变量，遮蔽了包级 count
    fmt.Println("内部 count:", count) // 输出 200

    // 包级 count 仍然是 100
    // 要修改包级变量，应该用 = 而非 :=
    // count = 200

    // 更隐蔽的陷阱
    x := 10
    if true {
        x := 20    // ⚠️ 新变量，遮蔽外层 x
        fmt.Println("内层 x:", x) // 20
    }
    fmt.Println("外层 x:", x)     // 10（未被修改！）
    // 修复：内层用 x = 20（普通赋值）而非 x := 20
}`
</script>
