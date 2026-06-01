<template>
  <div class="go-doc min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">函数基础 (声明/参数/多返回值)</h1>
          <p class="text-sm text-slate-500 mt-1">Go 语言函数的核心概念</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-6</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 1. 函数声明 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          函数声明（Function Declaration）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">func</code> 关键字声明函数。函数是 Go 程序的基本组织单元，也是实现代码复用的核心机制。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">基本语法结构</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个完整的函数声明包含：关键字 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">func</code>、函数名、参数列表、返回值列表和函数体。
        </p>
        <div class="mb-4">
          <Code language="go" :code="declarationCode" title="function_declaration.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">命名规范</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>导出函数：</strong>首字母大写，包外可访问。例如 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Println()</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">strings.Contains()</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>内部函数：</strong>首字母小写，仅包内可访问。例如 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">helper()</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">validate()</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>使用<strong>驼峰命名法</strong>（camelCase / PascalCase），不使用下划线连接</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>函数名应当简短且具备描述性，通常以<strong>动词</strong>开头：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ProcessData</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">getUser</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">closeFile</code></span>
          </li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>Go 的函数可以返回多个值，这是它与 C/Java 等语言最显著的差异之一。多返回值使得错误处理模式变得非常自然。</p>
        </aside>
      </section>

      <!-- 2. 参数 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          函数参数（Function Parameters）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          参数是函数接收外部数据的入口。Go 的参数声明方式简洁灵活，支持同类型简写和可变参数。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">单个参数</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          参数名在前，类型在后——这与其他 C 系语言不同，但读起来更自然。
        </p>
        <div class="mb-4">
          <Code language="go" :code="paramsSingleCode" title="params_single.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">多个参数与类型简写</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当多个连续参数类型相同时，可以省略前面参数的类型，只写最后一个。这种简写方式让代码更加紧凑。
        </p>
        <div class="mb-4">
          <Code language="go" :code="paramsShortCode" title="params_shorthand.go" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">写法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">等价形式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">a, b int</td>
                <td class="px-4 py-2 border border-slate-200 font-mono">a int, b int</td>
                <td class="px-4 py-2 border border-slate-200">两个同类型参数的简写</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">x, y, z float64</td>
                <td class="px-4 py-2 border border-slate-200 font-mono">x float64, y float64, z float64</td>
                <td class="px-4 py-2 border border-slate-200">三个同类型参数的简写</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>类型简写只适用于<strong>连续</strong>的同类型参数。<code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">a, b int, c string</code> 中，<code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">c</code> 必须单独声明类型。</p>
        </aside>
      </section>

      <!-- 3. 返回值 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          返回值（Return Values）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的返回值机制非常灵活：支持单个返回值、多个返回值、命名返回值，甚至"裸返回"。但灵活的同时也需要遵循一定规范。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">单个返回值</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最常见的模式。返回类型写在参数列表之后、函数体之前。
        </p>
        <div class="mb-4">
          <Code language="go" :code="returnSingleCode" title="return_single.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">多个返回值</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的函数可以返回<strong>任意数量</strong>的值。这是 Go 最强大的特性之一，尤其适合返回计算结果和错误状态。
        </p>
        <div class="mb-4">
          <Code language="go" :code="returnMultipleCode" title="return_multiple.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">命名返回值（Named Return Values）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          可以在函数签名中为返回值命名，它们会被自动初始化为零值。命名返回值在配合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer</code> 使用时特别有用（defer 可以访问并修改这些返回值）。
        </p>
        <div class="mb-4">
          <Code language="go" :code="returnNamedCode" title="return_named.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">裸返回（Naked Return）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当使用命名返回值时，可以只写 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">return</code> 而不指定返回的变量，Go 会自动返回当前命名返回值的值。<strong>只推荐在非常短的函数中使用</strong>，长函数中裸返回会严重降低可读性。
        </p>
        <div class="mb-4">
          <Code language="go" :code="returnNakedCode" title="return_naked.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 谨慎使用裸返回：</strong>当函数超过 5-10 行时，裸返回会使读者难以追踪"到底 return 了什么"。Go 官方也建议仅在非常短的函数中使用裸返回。长函数中<strong>显式返回</strong>更清晰。</p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>命名返回值的最佳使用场景是配合 <code class="bg-emerald-100 text-emerald-800 px-1 rounded text-xs font-mono">defer</code> 在函数退出前修改返回值。如果不需要在 defer 中访问返回值，普通的非命名返回值更清晰。</p>
        </aside>
      </section>

      <!-- 4. 多返回值与错误处理 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          多返回值与错误处理模式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有异常机制（try/catch），而是使用<strong>多返回值 + error 接口</strong>来处理错误。这种显式的错误处理方式让代码的控制流更加清晰，不会有"惊喜异常"。
        </p>

        <div class="mb-4">
          <Code language="go" :code="errorPatternCode" title="error_pattern.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">用 _ 忽略不需要的返回值</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果某个返回值不需要，可以用空白标识符 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">_</code> 来显式忽略它。Go 编译器不允许声明了但未使用的局部变量（或返回值），所以 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">_</code> 是必要的。
        </p>
        <div class="mb-4">
          <Code language="go" :code="blankIdCode" title="blank_identifier.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>忽略错误（用 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">_</code> 丢弃 error）在生产代码中通常是<strong>坏习惯</strong>。除非你确定错误不可能发生，否则应该始终检查 error。</p>
        </aside>
      </section>

      <!-- 5. 可变参数 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          可变参数（Variadic Parameters）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">...</code> 语法可以让函数接受<strong>任意数量</strong>的同类型参数。在函数内部，可变参数被当作一个<strong>切片</strong>（slice）来使用。
        </p>

        <div class="mb-4">
          <Code language="go" :code="variadicBasicCode" title="variadic_basic.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">将切片传递给可变参数</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果已经有一个切片，想要把它作为可变参数传入，需要使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">slice...</code> 语法来展开它。
        </p>
        <div class="mb-4">
          <Code language="go" :code="variadicSliceCode" title="variadic_slice.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>一个函数只能有一个可变参数，且它必须是参数列表中的<strong>最后一个</strong>参数。例如 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">func f(a int, b string, nums ...int)</code> 是合法的，但 <code class="bg-blue-100 text-blue-800 px-1 rounded text-xs font-mono">func f(nums ...int, a int)</code> 不合法。</p>
        </aside>
      </section>

      <!-- 6. 值传递 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          值传递（Pass by Value）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 中<strong>所有参数都是按值传递的</strong>——函数接收到的是实参的一个<strong>副本</strong>。这意味着函数内部对参数的修改不会影响原始变量。对于切片、map 和 channel 等引用类型，理解它们的"值"是什么尤为关键。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">基本类型：修改无效</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          对于 int、string、bool、float、struct 等值类型，函数内修改副本完全不影响外部变量。
        </p>
        <div class="mb-4">
          <Code language="go" :code="passByValueCode" title="pass_by_value.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">切片与 Map：特殊的"值"</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          切片和 map 虽然也是按值传递，但它们的"值"是一个<strong>头部结构</strong>（包含指向底层数组的指针、长度、容量）。复制头部后，底层数组仍然是共享的——这就是为什么"看起来像引用传递"。
        </p>
        <div class="mb-4">
          <Code language="go" :code="sliceHeaderCode" title="slice_header.go" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">传递的"值"是什么</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">函数内修改是否影响外部</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">int / float / bool / string</td>
                <td class="px-4 py-2 border border-slate-200">值的完整副本</td>
                <td class="px-4 py-2 border border-slate-200 text-amber-600">不影响</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">struct</td>
                <td class="px-4 py-2 border border-slate-200">整个结构体的副本</td>
                <td class="px-4 py-2 border border-slate-200 text-amber-600">不影响</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">切片 (slice)</td>
                <td class="px-4 py-2 border border-slate-200">头部结构（ptr + len + cap）的副本</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600">修改元素：影响</span><br /><span class="text-amber-600">追加元素：不影响（除非触发扩容或返回值重新赋值）</span></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">map</td>
                <td class="px-4 py-2 border border-slate-200">底层哈希表指针的副本</td>
                <td class="px-4 py-2 border border-slate-200 text-emerald-600">影响（共享同一哈希表）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-cyan-700">指针 (*T)</td>
                <td class="px-4 py-2 border border-slate-200">地址的副本</td>
                <td class="px-4 py-2 border border-slate-200 text-emerald-600">影响（通过地址修改原值）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong>在函数内使用 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">append</code> 修改切片时，<strong>必须将新的切片返回</strong>给调用者，或者传切片的指针。因为 append 可能创建新的底层数组，而调用者的切片头部仍然指向旧数组。</p>
        </aside>
      </section>

      <!-- 7. 函数签名 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          函数类型与签名（Function Type）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 Go 中，函数是<strong>一等公民</strong>（first-class citizen）。函数有类型，可以赋值给变量、作为参数传递、作为返回值。函数的"签名"由参数列表和返回值列表的类型共同决定。
        </p>

        <div class="mb-4">
          <Code language="go" :code="functionTypeCode" title="function_type.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">函数作为参数</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          将函数作为参数传递是 Go 中实现回调、中间件、高阶函数等模式的基础。使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">type</code> 关键字定义函数类型可以提高可读性。
        </p>
        <div class="mb-4">
          <Code language="go" :code="funcAsParamCode" title="func_as_param.go" />
        </div>
      </section>

      <!-- 8. init 函数 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          init 函数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">init()</code> 是 Go 中的特殊函数，在程序启动时<strong>自动执行</strong>，不能手动调用。每个包可以有多个 init 函数，它们按声明顺序执行。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">init 的特性</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>自动执行：</strong>程序启动时自动运行，不需要（也不能）手动调用</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>无参数无返回值：</strong>init 不能接收参数，也不能返回值</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>多个 init：</strong>一个包中可以有多个 init 函数（甚至一个文件中有多个），按声明顺序执行</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>执行时机：</strong>所有全局变量初始化 → init 函数 → main 函数</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>跨包顺序：</strong>按 import 依赖关系，被依赖的包的 init 先执行</span>
          </li>
        </ul>

        <div class="mb-4">
          <Code language="go" :code="initExampleCode" title="init_example.go" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">包初始化顺序</h3>
        <div class="mb-4">
          <Code language="bash" :code="initOrderOutput" title="📟 Terminal" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>init 函数的执行顺序在复杂项目中可能难以追踪。如果初始化逻辑有依赖关系，建议使用显式的初始化函数（如 <code class="bg-amber-100 text-amber-800 px-1 rounded text-xs font-mono">NewService(...)</code>）代替 init，以获得更清晰的控制流。</p>
        </aside>
      </section>

      <!-- 9. 常见错误 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误（Common Mistakes）
        </h2>

        <!-- 错误1：未使用的返回值 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">未使用的返回值</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 不允许存在未使用的局部变量——这包括未使用的函数返回值。如果某个返回值确实不需要，必须用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">_</code> 显式忽略。
        </p>
        <div class="mb-4">
          <Code language="go" :code="unusedReturnCode" title="unused_return.go" />
        </div>

        <!-- 错误2：返回值遮蔽 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">返回值遮蔽（Return Value Shadowing）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在函数内部使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code> 声明与命名返回值同名的变量时，会创建一个<strong>新的局部变量</strong>遮蔽命名返回值，导致 return 时返回的是零值而非预期值。
        </p>
        <div class="mb-4">
          <Code language="go" :code="shadowingReturnCode" title="shadowing_return.go" />
        </div>

        <!-- 错误3：混淆切片头部和底层数组 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">混淆切片头部与底层数组</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在函数内对切片执行 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">append</code> 后，如果未将新切片返回给调用者，调用者持有的切片可能不会反映出变化。
        </p>
        <div class="mb-4">
          <Code language="go" :code="appendTrapCode" title="append_trap.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>如果函数需要修改切片的长度或容量，应该<strong>返回修改后的切片</strong>，而不是依赖"引用传递"的假象。标准库中的 <code class="bg-emerald-100 text-emerald-800 px-1 rounded text-xs font-mono">append</code> 正是这样设计的。</p>
        </aside>
      </section>

      <!-- 底部导航 -->
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200">
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-5-control-flow"
          class="text-slate-500 hover:text-cyan-600 transition-colors text-sm flex items-center gap-1"
        >
          ← 上一节：控制结构
        </RouterLink>
        <RouterLink
          to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-7-functions-advanced"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors text-sm flex items-center gap-1"
        >
          下一节：函数进阶 →
        </RouterLink>
      </nav>

    </main>
  </div>
</template>

<script setup lang="ts">
import { Code } from 'components'
import { RouterLink } from 'vue-router'

const declarationCode = `package main

import "fmt"

// 基本函数声明
// func 函数名(参数列表) 返回值类型 { 函数体 }

// 无参数，无返回值
func sayHello() {
    fmt.Println("Hello, Go!")
}

// 有参数，无返回值
func greet(name string) {
    fmt.Printf("你好, %s!\\n", name)
}

// 有参数，有返回值
func add(a int, b int) int {
    return a + b
}

func main() {
    sayHello()                    // 输出: Hello, Go!
    greet("世界")                 // 输出: 你好, 世界!
    result := add(3, 5)
    fmt.Println("3 + 5 =", result) // 输出: 3 + 5 = 8
}`

const paramsSingleCode = `package main

import "fmt"

// 单个参数：参数名在前，类型在后
func square(x int) int {
    return x * x
}

// 多个不同类型的参数
func describe(name string, age int, height float64) {
    fmt.Printf("%s 今年 %d 岁，身高 %.1f 厘米\\n", name, age, height)
}

func main() {
    fmt.Println("平方:", square(4))            // 输出: 平方: 16
    describe("小明", 20, 175.5)               // 输出: 小明 今年 20 岁，身高 175.5 厘米
}`

const paramsShortCode = `package main

import "fmt"

// 同类型参数简写：a, b int 等价于 a int, b int
func multiply(a, b int) int {
    return a * b
}

// 多个同类型参数简写
func sum(a, b, c int) int {
    return a + b + c
}

// 混合参数（只有连续同类型才能简写）
func calculate(a, b int, op string) int {
    switch op {
    case "+":
        return a + b
    case "*":
        return a * b
    default:
        return 0
    }
}

func main() {
    fmt.Println(multiply(6, 7))       // 输出: 42
    fmt.Println(sum(1, 2, 3))         // 输出: 6
    fmt.Println(calculate(5, 3, "+")) // 输出: 8
    fmt.Println(calculate(5, 3, "*")) // 输出: 15
}`

const returnSingleCode = `package main

import (
    "fmt"
    "math"
)

// 单返回值：类型写在参数列表之后
func max(a, b int) int {
    if a > b {
        return a
    }
    return b  // 可以有多个 return 语句
}

// 返回计算结果
func circleArea(radius float64) float64 {
    return math.Pi * radius * radius
}

// 直接返回表达式
func isEven(n int) bool {
    return n%2 == 0
}

func main() {
    fmt.Println("max(10, 20):", max(10, 20))        // 20
    fmt.Printf("圆面积(r=5): %.2f\\n", circleArea(5)) // 78.54
    fmt.Println("isEven(7):", isEven(7))             // false
    fmt.Println("isEven(8):", isEven(8))             // true
}`

const returnMultipleCode = `package main

import (
    "fmt"
    "math"
)

// 多返回值：用括号包裹返回值类型列表
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("除数不能为零")
    }
    return a / b, nil
}

// 除法带余数
func divmod(a, b int) (int, int) {
    return a / b, a % b
}

// 交换两个值（多返回值的优雅应用）
func swap(a, b string) (string, string) {
    return b, a
}

// 统计信息：返回多个计算结果
func stats(nums []float64) (min, max, avg float64) {
    min = nums[0]
    max = nums[0]
    sum := 0.0
    for _, v := range nums {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
        sum += v
    }
    avg = sum / float64(len(nums))
    return
}

func main() {
    // 接收多个返回值
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("错误:", err)
    } else {
        fmt.Println("10 / 2 =", result) // 5
    }

    q, r := divmod(17, 5)
    fmt.Printf("17 / 5 = %d 余 %d\\n", q, r)  // 3 余 2

    a, b := swap("你好", "世界")
    fmt.Println(a, b)  // 世界 你好

    nums := []float64{3, 7, 2, 9, 4}
    min, max, avg := stats(nums)
    fmt.Printf("最小值: %.0f, 最大值: %.0f, 平均值: %.2f\\n", min, max, avg)
}`

const returnNamedCode = `package main

import "fmt"

// 命名返回值：在签名中声明返回的变量名
// 它们自动初始化为零值，可以在函数体中使用
func split(sum int) (x, y int) {
    // x=0, y=0（零值初始化）
    x = sum * 4 / 9
    y = sum - x
    return  // 返回 x 和 y 的当前值
}

// 命名返回值 + defer 的经典配合
// defer 可以修改命名返回值！
func withDefer() (result string) {
    defer func() {
        // 在函数返回前，修改命名返回值
        result = "由 defer 修改: " + result
    }()
    result = "初始值"
    return  // 返回时 defer 会先执行
}

func main() {
    a, b := split(17)
    fmt.Println("split(17):", a, b)     // 7, 10

    fmt.Println(withDefer())            // 由 defer 修改: 初始值
}`

const returnNakedCode = `package main

import "fmt"

// 短函数中的裸返回——可以接受
func location(name string) (lat, lng float64) {
    lat = 31.23
    lng = 121.47
    return  // 返回 lat 和 lng
}

// ❌ 长函数中的裸返回——不推荐！
// 因为你必须回溯所有赋值才能知道 return 了什么
func badExample(data []int) (sum, count int) {
    count = len(data)
    for _, v := range data {
        sum += v
        // ... 50 行其他逻辑 ...
    }
    return  // 到底返回了哪些值？很难一眼看出
}

// ✅ 推荐：即使有命名返回值，也显式写出来
func goodExample(data []int) (sum, count int) {
    count = len(data)
    for _, v := range data {
        sum += v
    }
    return sum, count  // 一眼就能看清返回了什么
}

func main() {
    lat, lng := location("上海")
    fmt.Printf("位置: (%.2f, %.2f)\\n", lat, lng)
}`

const errorPatternCode = `package main

import (
    "errors"
    "fmt"
    "strconv"
)

// 标准错误处理模式：返回值 (T, error)
// 惯例：error 始终是最后一个返回值
func parseAndDouble(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        // 包装错误，提供更多上下文
        return 0, fmt.Errorf("解析 '%s' 失败: %w", s, err)
    }
    return n * 2, nil
}

// 自定义错误哨兵值
var ErrNotFound = errors.New("未找到")

func findUser(id int) (string, error) {
    users := map[int]string{
        1: "张三",
        2: "李四",
    }
    name, ok := users[id]
    if !ok {
        return "", ErrNotFound
    }
    return name, nil
}

func main() {
    // 典型的 if err != nil 模式
    result, err := parseAndDouble("42")
    if err != nil {
        fmt.Println("处理失败:", err)
    } else {
        fmt.Println("结果:", result)  // 84
    }

    // 错误包装和链式检查
    _, err = parseAndDouble("abc")
    if err != nil {
        fmt.Println("错误:", err)  // 错误: 解析 'abc' 失败: strconv.Atoi: ...
    }

    // 使用 errors.Is 判断特定错误
    _, err = findUser(99)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("用户不存在")
    }
}`

const blankIdCode = `package main

import (
    "fmt"
    "strconv"
)

func getInfo() (string, int, bool) {
    return "Go", 15, true
}

func main() {
    // 只需要 name，不需要 age 和 ok
    name, _, _ := getInfo()
    fmt.Println("语言:", name)  // 语言: Go

    // 只需要 ok 状态
    _, ok, _ := getInfo()
    fmt.Println("状态:", ok)    // 状态: true

    // 常见场景：只关心转换是否成功
    _, err := strconv.Atoi("123")
    if err != nil {
        fmt.Println("转换失败")
    } else {
        fmt.Println("转换成功")
    }

    // ⚠️ 错误：未使用返回值会导致编译错误
    // result := getInfo()  // 编译错误：getInfo() 返回 3 个值，但只用了 1 个
    result, _, _ := getInfo()  // ✅ 用 _ 忽略不需要的
    fmt.Println(result)
}`

const variadicBasicCode = `package main

import "fmt"

// 可变参数：nums ...int 表示可以接受任意数量的 int
// 在函数内部，nums 是 []int 类型
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// 可变参数 + 普通参数混合
// 注意：可变参数必须是最后一个
func max(first int, rest ...int) int {
    result := first
    for _, n := range rest {
        if n > result {
            result = n
        }
    }
    return result
}

// 格式化输出任意数量的参数
func join(sep string, parts ...string) string {
    result := ""
    for i, p := range parts {
        if i > 0 {
            result += sep
        }
        result += p
    }
    return result
}

func main() {
    fmt.Println("sum():", sum())           // 0    (可以不传任何参数)
    fmt.Println("sum(1,2):", sum(1, 2))    // 3
    fmt.Println("sum(1,2,3):", sum(1, 2, 3)) // 6

    fmt.Println("max(5):", max(5))               // 5
    fmt.Println("max(5,3,9,1):", max(5, 3, 9, 1)) // 9

    fmt.Println(join(", ", "Go", "Rust", "C"))  // Go, Rust, C
}`

const variadicSliceCode = `package main

import "fmt"

func printAll(nums ...int) {
    for i, n := range nums {
        fmt.Printf("[%d]=%d ", i, n)
    }
    fmt.Println()
}

func main() {
    // 直接传入多个值
    printAll(1, 2, 3)  // [0]=1 [1]=2 [2]=3

    // 将切片展开传入可变参数（使用 slice...）
    numbers := []int{10, 20, 30, 40}
    printAll(numbers...)  // [0]=10 [1]=20 [2]=30 [3]=40

    // 也可以传入切片的子集
    printAll(numbers[1:3]...)  // [0]=20 [1]=30

    // ⚠️ 注意：slice... 会创建一个新的底层数组的 view
    // 在函数内部修改元素会影响原始切片（共享底层数组）
}`

const passByValueCode = `package main

import "fmt"

// Go 中所有参数都是值传递
// 函数内修改的是参数的副本，不影响原变量
func modify(x int, s string, flag bool) {
    x = 999
    s = "modified"
    flag = true
    fmt.Println("函数内部:", x, s, flag) // 999 modified true
}

// 结构体也是值传递——整个结构体被复制！
type Person struct {
    Name string
    Age  int
}

func modifyStruct(p Person) {
    p.Name = "被修改的名字"
    p.Age = 99
    fmt.Println("函数内部:", p) // {被修改的名字 99}
}

func main() {
    // 基本类型
    a, b, c := 42, "hello", false
    modify(a, b, c)
    fmt.Println("函数外部:", a, b, c) // 42 hello false（未修改！）

    // 结构体
    person := Person{Name: "张三", Age: 20}
    modifyStruct(person)
    fmt.Println("函数外部:", person) // {张三 20}（未修改！）

    // 要用指针才能真正修改外部变量（下一节详述）
}`

const sliceHeaderCode = `package main

import "fmt"

// 切片"看起来像引用传递"，因为头部包含底层数组指针
func modifySlice(s []int) {
    // 修改元素——会影响外部（共享底层数组）
    if len(s) > 0 {
        s[0] = 999
    }

    // append——不会影响外部的切片！append 可能创建新数组
    s = append(s, 888)
    fmt.Println("函数内部 append 后:", s) // [999 2 3 888]
}

// map 也是共享底层数据的
func modifyMap(m map[string]int) {
    m["new"] = 100
    delete(m, "old")
}

func main() {
    // 切片示例
    nums := []int{1, 2, 3}
    modifySlice(nums)
    fmt.Println("函数外部:", nums) // [999 2 3]（元素被修改了，但 888 没有追加进去）

    // map 示例
    scores := map[string]int{"old": 50, "keep": 75}
    modifyMap(scores)
    fmt.Println("函数外部:", scores) // map[keep:75 new:100]（被修改了！）
}`

const functionTypeCode = `package main

import "fmt"

// 定义函数类型别名：让复杂签名更易读
type Transformer func(int) int

// 函数赋值给变量——函数是一等公民
func double(x int) int {
    return x * 2
}

func square(x int) int {
    return x * x
}

// 返回函数的函数（闭包工厂）
func makeMultiplier(factor int) func(int) int {
    return func(x int) int {
        return x * factor
    }
}

func main() {
    // 函数赋值给变量
    var fn func(int) int
    fn = double
    fmt.Println("double(5):", fn(5)) // 10

    fn = square
    fmt.Println("square(5):", fn(5)) // 25

    // 使用函数类型别名
    var transform Transformer = double
    fmt.Println("transform(10):", transform(10)) // 20

    // 匿名函数（立即执行）
    result := func(a, b int) int {
        return a + b
    }(3, 4)
    fmt.Println("匿名函数:", result) // 7

    // 返回函数的函数
    triple := makeMultiplier(3)
    fmt.Println("triple(7):", triple(7)) // 21
}`

const funcAsParamCode = `package main

import (
    "fmt"
    "strings"
)

// 定义函数类型：接受 string 返回 string
type StringProcessor func(string) string

// 高阶函数：接收函数作为参数
func processStrings(items []string, fn StringProcessor) []string {
    result := make([]string, len(items))
    for i, item := range items {
        result[i] = fn(item)
    }
    return result
}

// 一些处理器
func toUpper(s string) string {
    return strings.ToUpper(s)
}

func addPrefix(s string) string {
    return "[GO] " + s
}

func main() {
    words := []string{"hello", "world", "golang"}

    // 传入命名函数
    upper := processStrings(words, toUpper)
    fmt.Println("大写:", upper) // [HELLO WORLD GOLANG]

    // 传入匿名函数
    reversed := processStrings(words, func(s string) string {
        runes := []rune(s)
        for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
            runes[i], runes[j] = runes[j], runes[i]
        }
        return string(runes)
    })
    fmt.Println("反转:", reversed) // [olleh dlrow gnalog]

    // 传入前缀处理器
    prefixed := processStrings(words, addPrefix)
    fmt.Println("前缀:", prefixed) // [[GO] hello [GO] world [GO] golang]
}`

const initExampleCode = `package main

import "fmt"

// 1. 全局变量先初始化
var globalVar = initGlobal()

func initGlobal() string {
    fmt.Println("1. 全局变量初始化")
    return "全局值"
}

// 2. init 函数按声明顺序执行
func init() {
    fmt.Println("2. 第一个 init()")
}

func init() {
    fmt.Println("3. 第二个 init()")
}

// 3. main 函数最后执行
func main() {
    fmt.Println("4. main() 函数")
    // 输出顺序: 1 → 2 → 3 → 4
}

// ======== 实用场景：数据库驱动注册 ========
// 这是 init 最常见的用途之一

// import _ "github.com/lib/pq"
// pq 包的 init 函数会自动注册 PostgreSQL 驱动
// import 时不需要直接使用包中的函数，只需要其 init 副作用

// 也可以在自己的包中使用 init 做初始化配置
// var db *sql.DB
// func init() {
//     var err error
//     db, err = sql.Open("postgres", "...")
//     if err != nil {
//         log.Fatal(err)
//     }
// }`

const initOrderOutput = `程序启动时的执行顺序：

main 包的全局变量初始化
    ↓
main 包中 import 的包的全局变量初始化（递归，深度优先）
    ↓
main 包中 import 的包的 init() 函数
    ↓
main 包的 init() 函数
    ↓
main() 函数

示例依赖链：
main → package A → package B
                  → package C

执行顺序：
B 全局变量 → B init() → C 全局变量 → C init()
→ A 全局变量 → A init()
→ main 全局变量 → main init() → main 的 main()`

const unusedReturnCode = `package main

import "fmt"

func getPair() (string, int) {
    return "Go", 42
}

func main() {
    // ❌ 编译错误：只使用了 1 个返回值，但函数返回了 2 个
    // name := getPair()

    // ✅ 用 _ 忽略不需要的返回值
    name, _ := getPair()
    fmt.Println("name:", name)  // name: Go

    // ✅ 只接收需要的那个（另一个用 _）
    _, age := getPair()
    fmt.Println("age:", age)  // age: 42

    // ✅ 全部接收
    fullName, fullAge := getPair()
    fmt.Println("全部:", fullName, fullAge)  // 全部: Go 42
}`

const shadowingReturnCode = `package main

import "fmt"

// ❌ 错误示范：返回值被遮蔽
func badSearch(data []int, target int) (index int, found bool) {
    for i, v := range data {
        if v == target {
            // ⚠️ := 创建了新的局部变量 index 和 found
            // 遮蔽了命名返回值！
            index, found := i, true
            // 新变量只在 if/for 块内有效
            _ = index  // 避免未使用变量的编译错误
            _ = found
        }
    }
    return  // 返回的是命名返回值 index=0, found=false
}

// ✅ 正确示范：使用赋值而非短声明
func goodSearch(data []int, target int) (index int, found bool) {
    for i, v := range data {
        if v == target {
            index = i   // 直接赋值给命名返回值
            found = true
            return
        }
    }
    return  // 未找到，返回零值
}

// ✅ 更好的做法：避免使用命名返回值（除非需要 defer）
func bestSearch(data []int, target int) (int, bool) {
    for i, v := range data {
        if v == target {
            return i, true  // 显式返回，毫无歧义
        }
    }
    return 0, false
}

func main() {
    data := []int{3, 7, 2, 9, 4}

    idx, found := badSearch(data, 9)
    fmt.Println("badSearch:", idx, found)   // 0 false（预期是 3 true！）

    idx, found = goodSearch(data, 9)
    fmt.Println("goodSearch:", idx, found)  // 3 true

    idx, found = bestSearch(data, 9)
    fmt.Println("bestSearch:", idx, found)  // 3 true
}`

const appendTrapCode = `package main

import "fmt"

// ❌ 错误：在函数内 append，但没有返回新切片
func badAppend(s []int) {
    s = append(s, 99)     // 可能创建新数组，但调用者不知道！
    fmt.Println("函数内:", s) // [1 2 3 99]
}

// ✅ 正确：返回 append 后的新切片
func goodAppend(s []int) []int {
    s = append(s, 99)
    fmt.Println("函数内:", s) // [1 2 3 99]
    return s
}

// ✅ 通过指针修改切片
func appendViaPointer(s *[]int) {
    *s = append(*s, 99)
}

func main() {
    // 错误方式
    data1 := []int{1, 2, 3}
    badAppend(data1)
    fmt.Println("badAppend 后:", data1)  // [1 2 3]（未被修改！）

    // 正确方式1：接收返回值
    data2 := []int{1, 2, 3}
    data2 = goodAppend(data2)              // 重新赋值
    fmt.Println("goodAppend 后:", data2)   // [1 2 3 99]

    // 正确方式2：传指针
    data3 := []int{1, 2, 3}
    appendViaPointer(&data3)
    fmt.Println("指针方式后:", data3)      // [1 2 3 99]
}`
</script>
