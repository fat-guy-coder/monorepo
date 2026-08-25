<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔍 反射 reflect</h1>
          <p class="text-sm text-slate-500 mt-1">运行时类型自省 —— 不知道类型也能读写字段/方法</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-22-reflection.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-22</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要反射 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要反射
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 是<strong>静态类型</strong>语言——编译期就知道每个变量的类型。但真实世界里经常出现「<strong>拿到一个对象却不知道它的类型</strong>」的情况，这时候静态类型就派不上用场了：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>ORM</strong>：把任意 struct 映射成 SQL INSERT/UPDATE，逐字段取值拼 SQL</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>encoding/json</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.Marshal</code> 拿到任意结构体，读出字段名 + tag + 值拼成 JSON</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>通用校验器</strong>：读 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">validate</code> tag，对任意结构体做必填/长度校验</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>日志 / 埋点序列化</strong>：把任意请求对象拍平成一串 key=value</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>依赖注入</strong>：按类型把「容器里注册好的实例」塞进任意结构体的字段</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="whyReflectCode" title="dump.go — 一个不知道类型也能遍历字段的函数" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话：</strong>JSON 序列化、ORM、校验库的底层就是反射。你写的每一行 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">json.Marshal(u)</code>，底层都在偷偷用 reflect 把 u 的字段一个个取出来。</p>
        </aside>
      </section>

      <!-- 2. reflect.Type 与 reflect.Value 基础 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          reflect.Type 与 reflect.Value 基础
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect</code> 包的两个核心入口：
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect.TypeOf(x)</code> 返回 <strong>Type（类型信息）</strong>——名字、所属包、有哪些字段、tag、方法列表；
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect.ValueOf(x)</code> 返回 <strong>Value（运行时值）</strong>——真正的值，还能读/写它。
          一个是「类型说明书」，一个是「装值的盒子」。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>最容易混淆的：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.Type()</code> 返回<strong>具体类型</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">main.User</code>），
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.Kind()</code> 返回<strong>底层种类</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">struct</code> / <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int</code> / <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">slice</code> / <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ptr</code>）。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Kind()</code> 是所有类型共用的「大类枚举」，判断分支时用 Kind，要字段名、tag 时用 Type。
        </p>
        <div class="mb-4"><Code language="go" :code="typeOfValueOfCode" title="typeof.go — Type vs Kind" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">示例</th><th class="px-4 py-2 border border-slate-200 font-semibold">Type</th><th class="px-4 py-2 border border-slate-200 font-semibold">Kind</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">reflect.TypeOf(42)</td><td class="px-4 py-2 border font-mono text-xs">int</td><td class="px-4 py-2 border font-mono text-xs">int</td><td class="px-4 py-2 border">基本类型 Type == Kind</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">reflect.TypeOf(User{})</td><td class="px-4 py-2 border font-mono text-xs">main.User</td><td class="px-4 py-2 border font-mono text-xs">struct</td><td class="px-4 py-2 border">Type 带名字，Kind 只是大类</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">reflect.TypeOf(&u)</td><td class="px-4 py-2 border font-mono text-xs">*main.User</td><td class="px-4 py-2 border font-mono text-xs">ptr</td><td class="px-4 py-2 border">指针的 Kind 是 ptr，需 .Elem() 解引用</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 判断类型用 Kind 别用 Type：</strong>两个不同的 struct（<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">User</code> 和 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Order</code>）Type 完全不同，但 Kind 都是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">struct</code>。通用代码里你基本都跟 Kind 打交道。</p>
        </aside>
      </section>

      <!-- 3. 读取字段与方法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          读取字段与方法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          对 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect.Type</code> 调 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">NumField()</code> 拿到字段数量，再 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Field(i)</code> 逐个取字段；<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">FieldByName("XXX")</code> 按名字取。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Field(i).Tag.Get("json")</code> 读 struct tag——呼应上一篇 JSON 序列化文档，tag 就是靠反射读出来的。方法也能动态调：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">MethodByName("XXX").Call(...)</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="readFieldsCode" title="readfields.go — 遍历字段 + 读 tag + 调方法" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 未导出字段的坑：</strong>小写字段（如 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">email</code>）反射<strong>能看到名字和类型</strong>，但 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Interface()</code> 取不出值（会 panic）。想读未导出字段值，得用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">v.Field(i).CanInterface()</code> 先检查。</p>
        </aside>
      </section>

      <!-- 4. 修改值（可寻址） -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          修改值：必须可寻址
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          反射写值的铁律：<strong>必须 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ValueOf(&x).Elem()</code> 拿到可寻址值</strong>。原因：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ValueOf(x)</code> 是<strong>传值拷贝</strong>——你拿到的只是 x 的一个副本，改它改不到原变量；而 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&x</code> 是地址，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Elem()</code> 解引用后指向的就是原内存。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">CanSet()</code> 用来在动手前检查。
        </p>
        <div class="mb-4"><Code language="go" :code="setValueCode" title="setvalue.go — 写值 vs 不可写的 panic" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最常见的反射崩溃：</strong>忘了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Elem()</code>，或对非指针值 Set，直接 panic <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">reflect: reflect.Value.Set using unaddressable value</code>。牢记口诀：<strong>「要写值，先取址」</strong>——<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&x</code> 再 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Elem()</code>。</p>
        </aside>
      </section>

      <!-- 5. 生产实战 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          生产实战：三个贴近实际的例子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          ① <strong>通用 struct → map</strong>：把任意结构体拍平成 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map[string]any</code>，日志/导出/统一入参都用得上——<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">encoding/json</code> 内部就是类似思路：
        </p>
        <div class="mb-4"><Code language="go" :code="structToMapCode" title="struct_to_map.go — 通用转换" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed">② <strong>迷你校验器</strong>：读 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">validate</code> tag 做必填/最小值检查——<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go-playground/validator</code> 的核心机制就是它：</p>
        <div class="mb-4"><Code language="go" :code="validatorCode" title="validator.go — 读 validate tag 校验" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed">③ <strong>反射调方法</strong>：简易 RPC / 路由分发——前端传过来一个「方法名 + 参数」，后端查表反射调用，不用写一长串 switch：</p>
        <div class="mb-4"><Code language="go" :code="callMethodCode" title="dispatch.go — 简易 RPC" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 三个例子共同点：</strong>它们都只发生在<strong>框架/通用库层</strong>，一次写好，对上层无数具体类型生效。这正是反射最划算的用法——把「跨类型的通用逻辑」抽出来写一次。</p>
        </aside>
      </section>

      <!-- 6. 执行流程拆解 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          执行流程拆解：反射「读」和「写」在跑什么
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>读取所有字段值的一次完整流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">ValueOf(x)</code>：把 x 装箱成 <code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect.Value</code>（同时带上类型信息）</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">v.Kind()</code>：判断底层种类，这里是 <code class="bg-slate-100 px-1 rounded font-mono text-xs">struct</code>（不匹配就直接 panic）</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">v.NumField()</code>：拿到字段个数</li>
          <li>循环 <code class="bg-slate-100 px-1 rounded font-mono text-xs">v.Field(i)</code>：逐个取出字段对应的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect.Value</code></li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">v.Field(i).Interface()</code>：把反射值转回 <code class="bg-slate-100 px-1 rounded font-mono text-xs">any</code>（即原来的值）</li>
          <li>要 tag 就用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Type.Field(i).Tag.Get("json")</code>——注意 tag 挂在<strong>类型</strong>上，不是值上</li>
        </ol>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>写值的一次完整流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">ValueOf(&x)</code>：传<strong>指针</strong>，拿到可寻址的地址值</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">.Elem()</code>：解引用，得到指向 x 本身的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect.Value</code></li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">.CanSet()</code>：检查可写（false 就 panic）</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">.SetInt() / .SetString() / .Set(v2)</code>：把新值写回<strong>原内存</strong>，原变量立刻生效</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Interface()</code> 就像把反射值「还给 JS 世界」——类似 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Object.values(obj)</code> 把对象摊开成普通值。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Elem()</code> 解引用 ≈ 你手动点开一个 JS 对象引用去改它内部，而不改拷贝。这条「先取址再写」的规则，本质和 JS 里「想改数组必须改引用不能改拷贝」是同一个心智。</p>
        </aside>
      </section>

      <!-- 7. 前端类比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          🔗 前端类比：Go 反射 vs TS/JS 的动态能力
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">Go 反射</th><th class="px-4 py-2 border border-slate-200 font-semibold">JS/TS 对应</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">枚举一个对象的属性/字段</td><td class="px-4 py-2 border font-mono text-xs">reflect.Type.NumField/Field</td><td class="px-4 py-2 border font-mono text-xs">Object.keys / Reflect.ownKeys</td></tr>
              <tr><td class="px-4 py-2 border">按名字读属性</td><td class="px-4 py-2 border font-mono text-xs">FieldByName / Field(i)</td><td class="px-4 py-2 border font-mono text-xs">obj[key]</td></tr>
              <tr><td class="px-4 py-2 border">附加元数据</td><td class="px-4 py-2 border font-mono text-xs">struct tag</td><td class="px-4 py-2 border font-mono text-xs">TS 装饰器 metadata / Vue 的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">defineProps</code> 类型</td></tr>
              <tr><td class="px-4 py-2 border">动态调用方法</td><td class="px-4 py-2 border font-mono text-xs">MethodByName(...).Call</td><td class="px-4 py-2 border font-mono text-xs">obj[method](...)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 关键差异：</strong>JS/TS 对象天然就是运行时键值包，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Object.keys</code> 零成本——<strong>JS 本来就没有编译期类型</strong>。Go 反射「额外」看到了 JS 里不存在的东西：<strong>编译期类型信息</strong>——字段名、struct tag、方法签名、是否导出。TS 要拿类型信息得靠装饰器手动把 metadata 写到 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Reflect.metadata</code>，而 Go 是<strong>语言原生自带</strong>。<strong>共同点：</strong>两者都比直接写死的访问慢，属于「牺牲性能换通用性」。</p>
        </aside>
      </section>

      <!-- 8. 常见错误与陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与陷阱
        </h2>
        <div class="mb-4"><Code language="go" :code="trapCode" title="traps.go — 三个必踩的坑" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>对不可寻址值 Set → panic</strong>：<code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect: reflect.Value.Set using unaddressable value</code>。传指针 + <code class="bg-slate-100 px-1 rounded font-mono text-xs">Elem()</code> 解决</li>
          <li><strong>Kind 不匹配时调 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Value.Int()</code> → panic</strong>：对 string 调 Int()、对 struct 调 String() 都崩。操作前先 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Kind()</code> 判断</li>
          <li><strong>性能开销</strong>：反射比静态调用慢 <strong>10~100 倍</strong>（见下方性能实测）。热循环里别反射，反射结果要缓存</li>
          <li><strong>空接口 vs 具体类型</strong>：<code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect.TypeOf(nil)</code> 是 nil；但「<strong>nil 指针 ≠ nil 接口</strong>」——<code class="bg-slate-100 px-1 rounded font-mono text-xs">var p *User = nil; reflect.TypeOf(p)</code> 得到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">*main.User</code>，不是 nil，判空要用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">IsNil()</code></li>
          <li><strong>无法内联优化</strong>：反射调用是动态分发，编译器没法内联、没法逃逸分析，<strong>牺牲了 Go 最大的静态优化优势</strong></li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 性能实测（直觉参考）：</strong>直接 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">u.Name</code> 约 1ns；<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">v.Field(0).String()</code> 约 10~50ns；再叠加字段查找、<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Interface()</code> 装箱、方法调用，一次「反射整套」能到百 ns 级。单次无所谓，但塞进每秒几十万次的循环里就是灾难。</p>
        </aside>
      </section>

      <!-- 9. 反模式 + 经验法则 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          反模式 + 经验法则
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>✅ 该用反射：</strong><br/>框架 / 通用库 / 跨类型工具——JSON、ORM、校验、DI、事件总线、mock 库。它们要服务的类型是「无限的」，反射是唯一写一次生效的办法。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>❌ 别用反射：</strong><br/>业务热点路径、能用接口抽象的场景。能定义接口就用接口——<strong>接口 > 反射</strong>。接口在编译期检查、零反射开销，只是「延迟到调用点决定实现」，而反射是「运行时才看类型」。</p>
          </aside>
        </div>
        <p class="text-slate-600 mb-2 leading-relaxed"><strong>经验法则：</strong>① 反射结果（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect.Type</code>、字段元数据）<strong>缓存起来</strong>，同一类型别每次重新反射——典型做法是把「字段名 + tag + 索引」的元数据用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync.Map</code> 按 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">reflect.Type</code> 缓存，首次反射一次，之后全走缓存；② 把反射收敛到「类型信息读取一次 + 结果缓存」的模式；③ 能靠接口解决就别碰反射。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 判断口诀：</strong>「我要处理的类型集合是不是<strong>无限</strong>的？」——是（任意 struct）就考虑反射；不是（就三五个已知类型）就老老实实写死或上接口，编译期就能搞定的事别拖到运行时。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>反射 = 运行时类型自省</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">reflect.TypeOf</code> 看类型、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">reflect.ValueOf</code> 拿值——JSON/ORM 底层就是它</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Type vs Kind</strong>：Type 是具体类型（main.User），Kind 是底层大类（struct）；判断分支用 Kind</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>读字段</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NumField/Field(i)/FieldByName</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Field(i).Tag.Get</code> 读 tag</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>写字段</strong>：必须 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ValueOf(&x).Elem()</code> 取可寻址值，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">CanSet</code> 先检查</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两大崩溃源</strong>：不可寻址 Set → panic；Kind 不匹配调 Int/String → panic</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性能</strong>：比静态调用慢 10~100 倍、无法内联；反射结果务必缓存，别进热循环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>取舍</strong>：框架/通用库用反射，业务代码能上接口就上接口——<strong>接口 > 反射</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-21-json-serialization" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：JSON 序列化</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Goroutine 与 GMP →</RouterLink>
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
  { id: "sec-1", name: "为什么需要反射" },
  { id: "sec-2", name: "Type 与 Value 基础" },
  { id: "sec-3", name: "读取字段与方法" },
  { id: "sec-4", name: "修改值（可寻址）" },
  { id: "sec-5", name: "生产实战" },
  { id: "sec-6", name: "执行流程拆解" },
  { id: "sec-7", name: "前端类比" },
  { id: "sec-8", name: "常见错误与陷阱" },
  { id: "sec-9", name: "反模式 + 经验法则" },
  { id: "sec-10", name: "小结" },
]

const whyReflectCode = `package main

import (
    "fmt"
    "reflect"
)

// 需求：来一个不知道具体类型的对象，把它的字段名 + 值都打出来
// 静态类型做不到——编译期不知道 x 是什么
func dump(x any) {
    v := reflect.ValueOf(x)
    t := v.Type()
    fmt.Println("类型:", t.Name(), "种类:", t.Kind())
    if t.Kind() == reflect.Struct {
        for i := 0; i < v.NumField(); i++ {
            fmt.Printf("  %s = %v\\n", t.Field(i).Name, v.Field(i).Interface())
        }
    }
}

type Player struct {
    Name string
    HP   int
}

func main() {
    dump(Player{Name: "阿强", HP: 100})
    // 输出:
    // 类型: Player 种类: struct
    //   Name = 阿强
    //   HP = 100
}`

const typeOfValueOfCode = `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name string
    Age  int
}

func main() {
    // ① 基本类型：Type 和 Kind 一样
    num := 42
    tNum := reflect.TypeOf(num)
    fmt.Println("Type:", tNum)        // int
    fmt.Println("Kind:", tNum.Kind()) // int

    // ② 结构体：Type 是 main.User，Kind 是 struct
    u := User{Name: "Tom", Age: 20}
    t := reflect.TypeOf(u)
    fmt.Println("Type:", t)             // main.User
    fmt.Println("Kind:", t.Kind())      // struct
    fmt.Println("Name:", t.Name())      // User
    fmt.Println("PkgPath:", t.PkgPath()) // main

    // ③ 指针：Kind 是 ptr（不是 struct！）
    pt := reflect.TypeOf(&u)
    fmt.Println("Ptr Type:", pt)        // *main.User
    fmt.Println("Ptr Kind:", pt.Kind()) // ptr
    fmt.Println("Elem:", pt.Elem())     // main.User（解引用）
}`

const readFieldsCode = `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name  string ` + "`json:\"name\"`" + `
    Age   int    ` + "`json:\"age\"`" + `
    email string  // 未导出字段
}

func (u User) Greet() string { return "Hi, " + u.Name }

func main() {
    t := reflect.TypeOf(User{})

    // ① NumField + Field(i)：遍历所有字段
    fmt.Println("字段总数:", t.NumField())
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        fmt.Printf("字段 %d: %s 类型=%s json tag=%q\\n", i, f.Name, f.Type, f.Tag.Get("json"))
    }

    // ② FieldByName：按名字取字段
    ageField, ok := t.FieldByName("Age")
    fmt.Println("FieldByName Age →", ok, ageField.Name) // true Age

    // ③ MethodByName(...).Call(...)：动态调用方法
    v := reflect.ValueOf(User{Name: "Tom"})
    result := v.MethodByName("Greet").Call(nil)
    fmt.Println(result[0].String()) // Hi, Tom

    // 输出:
    // 字段总数: 3
    // 字段 0: Name 类型=string json tag="name"
    // 字段 1: Age 类型=int json tag="age"
    // 字段 2: email 类型=string json tag=""
    // FieldByName Age → true Age
    // Hi, Tom
}`

const setValueCode = `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name string
    Age  int
}

func main() {
    u := User{Name: "Tom", Age: 20}

    // ✅ 正确姿势：ValueOf(指针).Elem() 拿到「可寻址」的值
    v := reflect.ValueOf(&u).Elem()
    fmt.Println("CanSet:", v.CanSet()) // true

    v.FieldByName("Name").SetString("Jerry")
    v.FieldByName("Age").SetInt(30)
    fmt.Println(u) // {Jerry 30}

    // ❌ 反例：直接 ValueOf(u) 是值拷贝，不可写
    w := reflect.ValueOf(u)
    fmt.Println("CanSet:", w.CanSet()) // false
    // w.Field(0).SetString("X")
    // → panic: reflect: reflect.Value.SetString using unaddressable value

    // 还能用 Set 整体覆盖（用另一个同类型 reflect.Value）
    v2 := reflect.ValueOf(User{Name: "Anna", Age: 40})
    v.Set(v2)
    fmt.Println(u) // {Anna 40}
}`

const structToMapCode = `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name string ` + "`json:\"name\"`" + `
    Age  int    ` + "`json:\"age\"`" + `
    City string ` + "`json:\"city\"`" + `
}

// StructToMap 通用 struct → map：读取所有字段 + json tag，供日志/导出/统一入参
func StructToMap(x any) map[string]any {
    t := reflect.TypeOf(x)
    v := reflect.ValueOf(x)
    if t.Kind() == reflect.Ptr { // 兼容传入指针：先解引用
        t = t.Elem()
        v = v.Elem()
    }
    result := make(map[string]any, t.NumField())
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        key := f.Tag.Get("json")
        if key == "" { // 没有 json tag 就用字段名
            key = f.Name
        }
        if key == "-" { // json:"-" 表示跳过
            continue
        }
        result[key] = v.Field(i).Interface()
    }
    return result
}

func main() {
    m := StructToMap(User{Name: "Tom", Age: 20, City: "北京"})
    fmt.Println(m) // map[age:20 city:北京 name:Tom]  ← fmt 打印 map 按 key 排序
}`

const validatorCode = `package main

import (
    "fmt"
    "reflect"
    "strings"
)

type User struct {
    Name string ` + "`validate:\"required\"`" + `
    Age  int    ` + "`validate:\"min=18\"`" + `
}

// Validate 迷你校验器：读 validate tag 检查必填 / 最小值
func Validate(x any) error {
    v := reflect.ValueOf(x)
    t := v.Type()
    for i := 0; i < v.NumField(); i++ {
        field := v.Field(i)
        tag := t.Field(i).Tag.Get("validate")
        for _, rule := range strings.Split(tag, ",") {
            switch {
            case rule == "required" && field.Kind() == reflect.String && field.String() == "":
                return fmt.Errorf("字段 %s 必填", t.Field(i).Name)
            case strings.HasPrefix(rule, "min="):
                var min int64
                fmt.Sscanf(strings.TrimPrefix(rule, "min="), "%d", &min)
                if field.Int() < min {
                    return fmt.Errorf("字段 %s 不能小于 %d", t.Field(i).Name, min)
                }
            }
        }
    }
    return nil
}

func main() {
    fmt.Println(Validate(User{Name: "", Age: 30}))   // 字段 Name 必填
    fmt.Println(Validate(User{Name: "Tom", Age: 15})) // 字段 Age 不能小于 18
    fmt.Println(Validate(User{Name: "Tom", Age: 20})) // <nil>
}`

const callMethodCode = `package main

import (
    "fmt"
    "reflect"
)

type Service struct{}

func (Service) Ping() string     { return "pong" }
func (Service) Add(a, b int) int { return a + b }

// Dispatch 简易 RPC / 路由分发：给定方法名 + 参数，反射调用
func Dispatch(s any, method string, args ...any) []reflect.Value {
    v := reflect.ValueOf(s)
    in := make([]reflect.Value, len(args))
    for i, a := range args {
        in[i] = reflect.ValueOf(a)
    }
    return v.MethodByName(method).Call(in) // 方法不存在或签名不匹配会 panic
}

func main() {
    s := Service{}
    fmt.Println(Dispatch(s, "Ping")[0].String())   // pong
    fmt.Println(Dispatch(s, "Add", 3, 4)[0].Int()) // 7

    // 更稳妥：先检查方法是否存在
    m := reflect.ValueOf(s).MethodByName("Nope")
    if !m.IsValid() {
        fmt.Println("方法不存在") // 方法不存在
    }
}`

const trapCode = `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name string
    Age  int
}

func main() {
    // ❌ 坑 1：对不可寻址的值 Set → panic
    v := reflect.ValueOf(User{Name: "Tom"})
    fmt.Println("CanSet:", v.CanSet()) // false
    // v.Field(0).SetString("X")
    // → panic: reflect: reflect.Value.SetString using unaddressable value

    // ❌ 坑 2：Kind 与调用方法不匹配 → panic
    s := reflect.ValueOf("hello")
    // fmt.Println(s.Int())
    // → panic: reflect: call of reflect.Value.Int on string Value

    // ✅ 操作前先用 Kind() 判断
    if s.Kind() == reflect.Int {
        fmt.Println(s.Int())
    }

    // ❌ 坑 3：reflect.TypeOf(nil) 返回 nil
    var x any
    fmt.Println(reflect.TypeOf(x) == nil) // true

    // 但 nil 指针 ≠ nil 接口！
    var p *User = nil
    fmt.Println(reflect.TypeOf(p))            // *main.User（不是 nil！）
    fmt.Println(reflect.ValueOf(p).IsNil())   // true
}`

</script>
