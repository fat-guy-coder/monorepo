<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📍 指针（Pointers）</h1>
          <p class="text-sm text-slate-500 mt-1">内存地址操作 · 值传递 · 零值 nil · 为什么 Go 没有指针运算</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-10-pointers.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-10</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是指针 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是指针？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          指针是一个变量，它<strong>存储的是另一个变量的内存地址</strong>，而不是值本身。通过指针，你可以在不复制数据的情况下访问和修改原始数据。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 JS/TS 类比：</strong><br/>
          Go 的指针和 JS/TS 中的"引用"不同。JS 中你拿不到真实的内存地址——对象赋值是隐式共享引用。<br/>
          <strong>Go 指针</strong> = 显式的、可控的"引用"——你能看到 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">&amp;</code> 取地址和 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">*</code> 解引用，
          不像 JS 中一切都隐式发生。<br/>
          <strong>一个关键区别：</strong>JS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">const obj = {"{"}a:1{"}"}</code> 传进函数后可以改属性；
          Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">func foo(p Person)</code> 传进去是<strong>副本</strong>，改不了——除非用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">*Person</code>。
          </p>
        </aside>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📥 &amp; — 取地址</h4>
            <p class="text-sm text-slate-600 mb-2">放在变量前面，获取该变量的<strong>内存地址</strong>。</p>
            <Code language="go" :code="codeAddrDemo" title="取地址" />
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📤 * — 解引用</h4>
            <p class="text-sm text-slate-600 mb-2">放在指针前面，<strong>访问指针指向的值</strong>。可读可写。</p>
            <Code language="go" :code="codeDerefDemo" title="解引用" />
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆技巧：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">&amp;x</code> = "address of x"（取 x 的地址），
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">*p</code> = "value at p"（p 指向的值）。</p>
        </div>
      </section>

      <!-- 2. 基本用法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          基本用法
        </h2>
        <div class="mb-4">
          <Code language="go" :code="basicCode" title="pointer_basic.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">new() — 分配零值指针</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">new(T)</code> 分配 T 的零值并返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*T</code>。等价于 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">var x T; return &amp;x</code>。实际开发中 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&amp;T{"{"}{"}"}</code> 更常用（可以顺便设初始值）。
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeNew" title="new_vs_ampersand.go" />
        </div>
      </section>

      <!-- 3. 值传递 vs 指针传递 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          值传递 vs 指针传递 — Go 的"一切皆值传递"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Go 中所有函数参数都是值传递（pass by value）</strong>——永远复制一份传给函数。
          传指针时，复制的是<strong>指针本身</strong>（8 字节），但它指向的原始数据可以被修改。
        </p>

        <div class="mb-4">
          <Code language="go" :code="passByCode" title="pass_by.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 重要澄清：</strong>Go 的函数参数 <strong>"看起来"像 JS/TS 的对象引用传递，但本质是值传递。</strong>
          传指针时，你可以在函数内修改指针指向的数据——但这<strong>不代表 Go 有引用传递</strong>。
          你可以验证：在函数内把指针指向别的东西（<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">p = &amp;other</code>），外部不受影响（因为改的是副本指针本身）。</p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">为什么 slice/map/chan 传参能修改？</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          这不是魔法。slice、map、channel 的变量本身就是一个<strong>包含内部指针的结构体</strong>。传参时复制了这个结构体，但它内部的指针仍然指向同一块底层数据。
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeSliceWhy" title="why_slice_mutable.go" />
        </div>
      </section>

      <!-- 4. 指针与结构体 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          指针与结构体
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          指针最常用的场景是对结构体的操作。Go 提供了<strong>自动解引用</strong>的语法糖，让你用指针访问字段时和用值一样自然。
        </p>

        <div class="mb-4">
          <Code language="go" :code="codeStructPtr" title="struct_pointer.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 Go 的自动解引用：</strong><br/>
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">p.Field</code> 自动等价于 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">(*p).Field</code>。<br/>
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">p.Method()</code> 自动等价于 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">(*p).Method()</code>。<br/>
          这与 C/C++ 的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">p->field</code> 效果相同，但 Go 不引入额外的操作符。</p>
        </aside>
      </section>

      <!-- 5. nil 指针 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          nil 指针 — Go 的"十亿美元错误"处理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          指针的零值是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nil</code>。对 nil 指针解引用会导致 <strong>panic（运行时崩溃）</strong>。
          Go 没有异常处理，所以必须在解引用前检查 nil。
        </p>

        <div class="mb-4">
          <Code language="go" :code="nilCode" title="nil_pointer.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">nil 的妙用：可选语义</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          指针可以表达 <strong>"这个值可能存在，也可能不存在"</strong> 的语义。这类似于 TypeScript 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T | undefined</code> 或 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T | null</code>，且零开销。
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeNilOptional" title="nil_as_optional.go" />
        </div>
      </section>

      <!-- 6. 指针 vs 值选择指南 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          指针 vs 值 — 什么时候用什么？
        </h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用指针</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">原因</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">需要修改原值</td>
                <td class="px-4 py-2 border border-slate-200">❌</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">值接收者改的是副本</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">struct 很大</td>
                <td class="px-4 py-2 border border-slate-200">❌</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">避免拷贝几十个字段</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">需要 nil 语义</td>
                <td class="px-4 py-2 border border-slate-200">❌</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">值类型不能为 nil</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">基本类型 (int/string/bool)</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">⚠️ 除非需要 nil</td>
                <td class="px-4 py-2 border border-slate-200">指针徒增分配和 GC 压力</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">slice / map / chan</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">❌ 通常不需要</td>
                <td class="px-4 py-2 border border-slate-200">它们本身已经是引用语义</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">并发安全</td>
                <td class="px-4 py-2 border border-slate-200">✅ 天然安全</td>
                <td class="px-4 py-2 border border-slate-200">⚠️ 需要加锁</td>
                <td class="px-4 py-2 border border-slate-200">多 goroutine 共享指针 = 数据竞争</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">方法接收者</td>
                <td class="px-4 py-2 border border-slate-200">不可变、小 struct</td>
                <td class="px-4 py-2 border border-slate-200">需要修改、大 struct</td>
                <td class="px-4 py-2 border border-slate-200">同一类型的方法接收者应统一</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          1. <strong>默认用值</strong>——除非有明确理由用指针。<br/>
          2. 结构体方法<strong>统一用指针接收者</strong>（混用值/指针接收者容易引入 bug）。<br/>
          3. 小类型（int、string、bool）传值就够了——指针反而增加 GC 开销。<br/>
          4. <strong>不要为"性能优化"盲目用指针</strong>——先测量，再优化。Go 编译器在逃逸分析和栈分配上很聪明。
          </p>
        </aside>
      </section>

      <!-- 7. 常见陷阱 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          常见陷阱
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：循环中取地址（Go &lt; 1.22）</strong><br/>
            for-range 的循环变量在迭代间<strong>复用同一块内存</strong>。如果你取 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&amp;v</code> 存入 slice，所有元素都会指向同一个地址（最后一次迭代的值）。Go 1.22+ 修复了这个问题。<br/>
            修复：在循环内加 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">v := v</code> 创建副本，再取 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&amp;v</code>。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：map 元素不可取地址</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&amp;m["key"]</code> 编译错误！因为 map 扩容时元素的内存地址会改变。Go 编译器直接禁止这个操作以确保安全。<br/>
            解决方案：取出来赋给临时变量，再取临时变量的地址。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：返回局部变量的指针是安全的</strong><br/>
            和 C 语言不同！Go 编译器检测到指针逃逸后，会<strong>自动把变量分配到堆上</strong>而非栈上。所以你可以放心地从函数返回局部变量的指针。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：nil map 读安全，写会 panic</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">var m map[string]int</code> 是 nil map。读 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">m["k"]</code> 返回零值（0），不 panic。
            但<strong>写</strong> <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">m["k"] = 1</code> 会 panic。用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make(map[string]int)</code> 初始化。
            </p>
          </aside>
        </div>

        <div class="mb-4 mt-4">
          <Code language="go" :code="loopCode" title="pitfalls_demo.go" />
        </div>
      </section>

      <!-- 8. 为什么 Go 没有指针运算 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          为什么 Go 没有指针运算？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 C/C++ 中，你可以 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">p++</code> 让指针移动到下一个内存地址。
          Go <strong>明确禁用了指针运算</strong>（除非引入 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">unsafe</code> 包）。原因：
        </p>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>内存安全：</strong>指针运算很容易越界访问或破坏内存，是安全漏洞的主要来源。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GC 友好：</strong>Go 有垃圾回收，GC 需要追踪指针。随意移动指针会让 GC 无从下手。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>设计哲学：</strong>Go 的目标是简洁、安全。slice 已经提供了安全的"动态数组"抽象，不需要你手动操作内存。</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 对比：</strong><br/>
          C/C++：<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">*(p + i)</code> 访问第 i 个元素（指针运算）<br/>
          Go：<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">slice[i]</code> 访问第 i 个元素（会自动做<strong>边界检查</strong>，越界会 panic 而不是无声破坏内存）<br/>
          如果你真的需要操作裸内存，Go 提供了 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">unsafe.Pointer</code> —— 但名字本身就警告你"这很危险"。
          </p>
        </aside>
      </section>

      <!-- 9. 总结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&amp;T</code> 取地址返回 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*T</code>，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*p</code> 解引用。零值是 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">nil</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>所有参数都是值传递。</strong>传指针时复制指针本身（8 字节），但可通过它修改原值。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结构体指针访问字段和调用方法时 Go <strong>自动解引用</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">p.Field</code> 而非 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">(*p).Field</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无指针运算</strong>（除非 unsafe 包），这是为了内存安全和 GC 兼容。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>slice / map / chan 内部就是指针包装——传参时复制 header 但共享底层数据。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>返回局部变量的指针是安全的——Go 编译器会自动做<strong>逃逸分析</strong>分配到堆上。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>普通场景<strong>默认用值</strong>，需要修改/大型结构体/可选语义时用指针。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-9-maps" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Map</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-11-structs" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：结构体 →</RouterLink>
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
  { id: "sec-1", name: "什么是指针" },
  { id: "sec-2", name: "基本用法" },
  { id: "sec-3", name: "值传递 vs 指针传递" },
  { id: "sec-4", name: "指针与结构体" },
  { id: "sec-5", name: "nil 指针" },
  { id: "sec-6", name: "指针 vs 值选择" },
  { id: "sec-7", name: "常见陷阱" },
  { id: "sec-8", name: "为什么没有指针运算" },
  { id: "sec-9", name: "关键点总结" },
]

// ==================== 代码示例 ====================

const codeAddrDemo = `x := 42
p := &x    // p 的类型是 *int
// x 的值是 42，p 的值是 x 的地址（如 0xc00001a0b0）`

const codeDerefDemo = `*p = 99   // 通过指针修改 x（x 变成了 99）
fmt.Println(*p)  // 读取指针指向的值 → 99
// * 在类型声明中是另一回事：var p *int（"指向 int 的指针"）`

const basicCode = `x := 42
p := &x           // p 的类型是 *int（指向 int 的指针）
fmt.Println(p)    // 输出: 0xc00001a0b0（内存地址）
fmt.Println(*p)   // 输出: 42（解引用，读取值）

*p = 99           // 通过指针修改
fmt.Println(x)    // 输出: 99 ← x 被改了！

// 指针零值是 nil
var np *int
fmt.Println(np == nil)  // 输出: true

// 指针与结构体（自动解引用）
type Person struct { Name string; Age int }
pp := &Person{Name: "Alice", Age: 30}
pp.Age = 31       // Go 自动解引用：等价 (*pp).Age = 31
fmt.Println(pp)   // 输出: &{Alice 31}`

const codeNew = `// new(T) — 分配零值，返回 *T
p1 := new(int)       // *int, 指向 0
fmt.Println(*p1)     // 输出: 0

// &T{} — 分配+初始化，返回 *T（更常用）
p2 := &Person{Name: "Bob", Age: 25}

// 两者对比
p3 := new(Person)           // &Person{Name:"", Age:0} — 零值
p4 := &Person{}             // 同上，但更简洁
p5 := &Person{Name: "Eve"}  // 可以直接设初始值 ← 推荐

// 实际开发中，&T{} 比 new(T) 更常用
// 因为可以顺便设初始值，而 new(T) 只能拿零值`

const passByCode = `type Point struct{ X, Y int }

// ❌ 值传递：改的是副本
func modifyVal(p Point) {
    p.X = 999  // 只改了副本
}

// ✅ 指针传递：改的是原值
func modifyPtr(p *Point) {
    p.X = 999  // 改的是 p 指向的原始数据
}

func main() {
    pt := Point{X: 1, Y: 2}

    modifyVal(pt)
    fmt.Println(pt.X)   // 输出: 1 ← 没变！

    modifyPtr(&pt)
    fmt.Println(pt.X)   // 输出: 999 ← 变了！
}

// ⚠️ 验证"指针本身也是值传递"
func tryChangePtr(p *Point) {
    other := Point{X: 9999}
    p = &other  // 把 p 指向别的东西
}
// pt 在外面不受影响——因为 p 本身是一个副本指针
// 改副本指针的指向不会影响外部的指针变量`

const codeSliceWhy = `// slice 的底层结构（简化版）：
// type slice struct {
//     ptr   unsafe.Pointer  // 指向底层数组的指针
//     len   int
//     cap   int
// }

func modifySlice(s []int) {
    s[0] = 999  // ✅ 会修改原 slice 的元素
    // 因为复制的是 slice header，但 ptr 指向同一块数组
}

func appendSlice(s []int) {
    s = append(s, 100)
    // ⚠️ 外部 slice 长度不变！
    // 因为 append 可能扩容（新数组），修改的是副本 header
}

func main() {
    nums := []int{1, 2, 3}

    modifySlice(nums)
    fmt.Println(nums)       // 输出: [999 2 3] ← 改了

    appendSlice(nums)
    fmt.Println(nums)       // 输出: [999 2 3] ← 没变（len 仍是 3）
    fmt.Println(len(nums))  // 输出: 3
    // append 要生效，必须返回并重新赋值：nums = appendSlice(nums)
}`

const codeStructPtr = `type User struct {
    Name  string
    Email string
}

// 指针接收者 — 可以修改 User
func (u *User) SetEmail(email string) {
    u.Email = email  // ✅ 修改原值
}

// 值接收者 — 只读
func (u User) DisplayName() string {
    return u.Name    // ✅ 读没问题
}

func main() {
    u := &User{Name: "张三"}     // 构造时就取地址
    u.SetEmail("zhangsan@example.com")
    fmt.Println(u.Email)         // 输出: zhangsan@example.com

    // 即使 u 是值，也可以调用指针接收者的方法
    // Go 会自动取地址：u.SetEmail(...) 等价 (&u).SetEmail(...)
    u2 := User{Name: "李四"}
    u2.SetEmail("lisi@example.com")
}`

const nilCode = `var p *int  // p == nil

// 解引用 nil 指针 → panic!
// *p = 42  // panic: runtime error: invalid memory address...

// ✅ 使用前检查
func safeDeref(p *int) int {
    if p == nil {
        return 0  // 返回默认值
    }
    return *p
}

// nil 指针也可以调用方法（只要方法里不访问字段）
type Logger struct{ enabled bool }
func (l *Logger) Log(msg string) {
    if l == nil {
        return  // nil receiver：静默跳过
    }
    if l.enabled {
        fmt.Println(msg)
    }
}
// 这允许链式调用而不必每一步都检查 nil`

const codeNilOptional = `type Config struct {
    Name    string
    Timeout *int  // nil 表示"使用默认超时"
}

func NewConfig(name string, timeoutMs *int) *Config {
    c := &Config{Name: name}
    if timeoutMs != nil {
        c.Timeout = timeoutMs  // 用户指定了超时
    }
    // 如果 timeoutMs == nil，c.Timeout 就是 nil → 使用默认值
    return c
}

func (c *Config) GetTimeout() int {
    if c.Timeout != nil {
        return *c.Timeout
    }
    return 30  // 默认 30 秒
}

func main() {
    custom := 60
    c1 := NewConfig("server1", &custom)
    c2 := NewConfig("server2", nil)

    fmt.Println(c1.GetTimeout()) // 输出: 60
    fmt.Println(c2.GetTimeout()) // 输出: 30（使用默认值）
}
// ⚠️ 这比用 0 表示"未设置"更清晰——0 是合法的超时值吗？
// *int 可以区分 nil（未设置）和 0（设置为 0 秒）`

const loopCode = `// ⚠️ 陷阱: 循环中取地址（Go < 1.22）

// ❌ 错误写法
var ptrs []*int
for _, v := range []int{1, 2, 3} {
    ptrs = append(ptrs, &v)  // 都指向同一个 v!
}
for _, p := range ptrs { fmt.Print(*p, " ") }
// Go < 1.22 输出: 3 3 3（全是最后一个值！）

// ✅ 修复方式 1：创建局部副本
var ptrs2 []*int
for _, v := range []int{1, 2, 3} {
    v := v                  // 创建新变量（遮蔽外层 v）
    ptrs2 = append(ptrs2, &v)
}
for _, p := range ptrs2 { fmt.Print(*p, " ") }
// 输出: 1 2 3

// ✅ 修复方式 2：用索引（推荐）
var ptrs3 []*int
nums := []int{1, 2, 3}
for i := range nums {
    ptrs3 = append(ptrs3, &nums[i])  // 直接取原始切片的地址
}

// ℹ️ Go 1.22+ 已修复此问题：每次迭代创建新变量`
</script>
