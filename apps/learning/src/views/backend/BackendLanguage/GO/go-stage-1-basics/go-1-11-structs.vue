<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏗️ 结构体与自定义类型</h1>
          <p class="text-sm text-slate-500 mt-1">Go 没有 class — struct 就是 Go 的"类"</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-11-structs.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. Go 没有 class -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Go 没有 class，只有 struct
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Go 没有 class 关键字，没有继承，没有构造函数。</strong>在 Go 中，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">struct</code>（结构体）
          承担了"自定义类型"的角色。Go 的设计哲学是：<strong>数据和操作数据的方法分离定义，通过组合而非继承来复用代码。</strong>
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 JS/TS 类比：</strong><br/>
          Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">struct</code> = <strong>数据部分</strong>（类似 interface/type 定义的字段）<br/>
          Go 的 <strong>方法</strong>（带 receiver 的 func）= <strong>行为部分</strong>（类似 class 里的 method）<br/>
          Go 把它们<strong>分开写</strong>了：先定义 struct 放数据，再定义 func (s *Struct) 放方法。<br/>
          <br/>
          <strong>对比对照表：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">TS: class User {"{"} name: string; greet() {"{}"} {"}"}</code><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Go: type User struct {"{"} Name string {"}"}  +  func (u User) Greet() string</code>
          </p>
        </aside>

        <div class="mb-4">
          <Code language="go" :code="codeNoClass" title="对比：Go struct vs TS class" />
        </div>
      </section>

      <!-- 2. 定义与初始化 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          定义与初始化（6 种方式）
        </h2>

        <div class="mb-4">
          <Code language="go" :code="defineCode" title="struct_define.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">导出规则：大写公开，小写私有</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          结构体名和字段名的首字母大小写决定<strong>包外可见性</strong>。这是 Go 唯一的访问控制机制（没有 public/private/protected 关键字）：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeExport" title="export_rules.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>结构体是<strong>值类型</strong>。赋值 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">p2 := p1</code> 会<strong>复制整个结构体</strong>（包括所有字段），修改 p2 不影响 p1。
          大结构体传参建议用指针避免拷贝开销。</p>
        </aside>
      </section>

      <!-- 3. 方法：让 struct 变成"类" -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          方法（Methods）— struct 的"成员函数"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 通过<strong>接收者（receiver）</strong>将函数绑定到 struct 上，这就是 Go 的"方法"。
          这让 struct 拥有了和 class 类似的行为——但没有把数据和函数锁在一起。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">值接收者 vs 指针接收者</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          这是 Go 初学者最容易困惑的地方。选择哪个取决于<strong>是否需要修改原值</strong>和<strong>struct 的大小</strong>：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeMethods" title="methods.go" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用值接收者 (u User)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用指针接收者 (u *User)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">需要修改原值</td><td class="px-4 py-2 border border-slate-200">❌ 操作的是副本</td><td class="px-4 py-2 border border-slate-200">✅ 操作的是原值</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">struct 很大</td><td class="px-4 py-2 border border-slate-200">❌ 拷贝开销大</td><td class="px-4 py-2 border border-slate-200">✅ 只传 8 字节指针</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">只读操作</td><td class="px-4 py-2 border border-slate-200">✅ 安全，不会意外修改</td><td class="px-4 py-2 border border-slate-200">⚠️ 可以用，但值接收者更安全</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">实现接口</td><td class="px-4 py-2 border border-slate-200">T 和 *T 都满足</td><td class="px-4 py-2 border border-slate-200">只有 *T 满足</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>同一类型的所有方法应该统一使用同一种接收者类型。<strong>混用值接收者和指针接收者</strong>会让人困惑，也容易引发 bug。<br/>
          默认用<strong>指针接收者</strong>，只在确知不需要修改且 struct 很小时才用值接收者。</p>
        </aside>
      </section>

      <!-- 4. 构造函数模式 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          构造函数 — Go 用工厂函数替代
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go <strong>没有构造函数语法</strong>。约定是写一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">NewXxx()</code> 工厂函数，返回指针或值。
          这样可以做验证、设默认值、隐藏初始化逻辑。
        </p>

        <div class="mb-4">
          <Code language="go" :code="codeConstructor" title="constructor.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么返回指针？</strong>构造函数的返回值通常在后续被调用方法修改。返回 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">*T</code> 而非 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">T</code> 可以<strong>避免拷贝</strong>，且指针类型自动满足那些用指针接收者的接口。</p>
        </aside>
      </section>

      <!-- 5. 嵌入（Composition） -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          嵌入（Embedding）— Go 的"继承"替代方案
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 没有 extends，没有父类子类。通过<strong>匿名字段嵌入</strong>实现代码复用。
          外层类型自动获得被嵌入类型的<strong>所有字段和方法</strong>（这叫"提升" promotion），但<strong>不是子类型关系</strong>。
        </p>

        <div class="mb-4">
          <Code language="go" :code="embedCode" title="embedding.go" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 与 OOP 继承的关键区别：</strong><br/>
          <strong>OOP 继承：</strong>子类 is-a 父类 → 可以把子类对象传给接受父类参数的函数<br/>
          <strong>Go 嵌入：</strong>Employee has-a Address → <strong>不能</strong>把 Employee 传给接受 Address 的函数<br/>
          嵌入只是一种<strong>语法糖</strong>——让你少敲几个字（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">emp.Street</code> 等价于 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">emp.Address.Street</code>）。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">嵌入 + 接口 = 隐式满足（Go 最强大的设计）</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          嵌入一个有方法的类型后，外层<strong>自动实现</strong>了这些方法对应的接口——不需要写任何额外代码：
        </p>
        <div class="mb-4">
          <Code language="go" :code="embedInterfaceCode" title="embed_interface.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 这就是 Go 的"多态"：</strong>不需要写 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">implements</code>，不需要显式声明。
          嵌入一个实现了某接口的类型 → 外层自动也实现了该接口 → 可以传给任何接受该接口的函数。</p>
        </aside>
      </section>

      <!-- 6. 结构体标签 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          结构体标签（Tags）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          标签是附加在字段上的<strong>字符串元数据</strong>，通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">reflect</code> 包在运行时读取。
          最常用于序列化、验证、ORM 映射。格式：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">`key:"value" key2:"value2"`</code>，用反引号括起来，空格分隔多个标签。
        </p>

        <div class="mb-4">
          <Code language="go" :code="tagCode" title="struct_tags.go" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">标签 key</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">json</td><td class="px-4 py-2 border border-slate-200">JSON 序列化/反序列化</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">json:"name,omitempty"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">validate</td><td class="px-4 py-2 border border-slate-200">字段校验（go-playground/validator）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">validate:"required,min=2"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">db / gorm</td><td class="px-4 py-2 border border-slate-200">数据库 ORM 映射</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">gorm:"primaryKey;column:user_id"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">form</td><td class="px-4 py-2 border border-slate-200">HTTP 表单绑定</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">form:"username"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">yaml</td><td class="px-4 py-2 border border-slate-200">YAML 序列化</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">yaml:"server_port"</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. 空结构体 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          空结构体 struct{} — 0 字节的妙用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">struct{}{}</code> 不占任何内存（0 字节）。
          它只表示"存在"，不表示"值"。在不需要值的场景下非常优雅。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">📡 Channel 信号</h4>
            <Code language="go" :code="codeEmptyChan" title="channel_signal.go" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">📦 集合 Set</h4>
            <Code language="go" :code="codeEmptySet" title="set.go" />
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么不用 bool 做 map value？</strong><br/>
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">map[string]bool</code> 每个 value 占 1 字节；
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">map[string]struct{}{}</code> 每个 value 占 0 字节。
          十万个 key 就能省 100KB。更重要的是语义上 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">struct{}{}</code> 明确表达了"我不关心值，只关心 key 在不在"。</p>
        </aside>
      </section>

      <!-- 8. 结构体相等性与内存 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          结构体比较与内存布局
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">相等性比较</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          如果 struct <strong>所有字段都是可比较类型</strong>（数字、字符串、bool、指针、channel 等），那么 struct 可以用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">==</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">!=</code> 比较。
          但如果有 <strong>slice / map / function</strong> 字段，就不能直接比较：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeComparable" title="comparable.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">字段顺序影响内存大小</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          由于<strong>内存对齐</strong>，字段的排列顺序会影响 struct 实际占用的字节数。<strong>把大的字段放前面可以省内存</strong>：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeMemory" title="memory_layout.go" />
        </div>
      </section>

      <!-- 9. 常见陷阱 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见陷阱与注意事项
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：值接收者方法不会修改原值</strong><br/>
            这是最常见的错误。如果方法签名是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">func (u User) SetName(name string)</code>，
            修改的是<strong>副本</strong>，调用者的 User 不变。应该用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">func (u *User) SetName(name string)</code>。
            </p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：嵌入不是继承</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">type Dog struct {"{"} Animal {"}"}</code> 不能把 Dog 传给接受 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Animal</code> 的函数。
            嵌入只是语法糖，不是类型层级关系。
            </p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：空 struct 的零值不是 nil</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">var u User</code> 得到的是零值 struct（所有字段都是各自类型的零值），不是 nil。
            但 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">var p *User</code> 是 nil 指针。
            </p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：JSON 反序列化时嵌入字段不展开</strong><br/>
            如果 Address 嵌入了但给了 json tag，它仍然会<strong>平铺在父级 JSON</strong>中，而不是嵌套对象。
            想要嵌套 JSON 对象？用<strong>命名字段</strong>而不是匿名嵌入。
            </p>
          </aside>
        </div>
      </section>

      <!-- 10. 总结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Go 没有 class</strong>——struct 定义数据，方法（带 receiver 的 func）定义行为，两者分离</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结构体是<strong>值类型</strong>——赋值和传参会复制整个结构体，大结构体用指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>没有继承，只有组合</strong>——匿名字段嵌入实现代码复用，但不是子类型关系</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>导出用大写首字母，私有用小写——没有 public/private 关键字</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>构造函数约定为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NewXxx() *Xxx</code> 工厂函数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">struct{}{}</code> 零内存——channel 信号、map 集合的理想选择</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>嵌入 + 接口 = 隐式多态——Go 最优雅的设计之一</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-10-pointers" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：指针</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-12-new-make" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：new 与 make →</RouterLink>
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
  { id: "sec-1", name: "Go 没有 class" },
  { id: "sec-2", name: "定义与初始化" },
  { id: "sec-3", name: "方法（Methods）" },
  { id: "sec-4", name: "构造函数" },
  { id: "sec-5", name: "嵌入（组合）" },
  { id: "sec-6", name: "标签（Tags）" },
  { id: "sec-7", name: "空结构体" },
  { id: "sec-8", name: "比较与内存布局" },
  { id: "sec-9", name: "常见陷阱" },
  { id: "sec-10", name: "关键点总结" },
]

// ==================== 代码示例 ====================

const codeNoClass = `// ======== TypeScript class ========
// class User {
//   name: string
//   age: number
//   constructor(name: string, age: number) {
//     this.name = name; this.age = age
//   }
//   greet(): string { return "Hello " + this.name }
// }

// ======== Go struct (对等实现) ========
type User struct {
    Name string
    Age  int
}

// 方法写在 struct 外面
func (u User) Greet() string {
    return "Hello " + u.Name
}

func main() {
    u := User{Name: "张三", Age: 28}
    fmt.Println(u.Greet()) // 输出: Hello 张三
}
// ⚠️ 关键差异：
//   Go 没有 constructor → 用 NewUser() 工厂函数
//   Go 没有 this/self   → 用 receiver 参数名（习惯用类型首字母小写）
//   Go 没有 extends     → 用匿名字段嵌入
//   Go 没有 public      → 首字母大写 = 公开，小写 = 私有`

const defineCode = `type Person struct {
    Name string
    Age  int
    City string
}

// --- 6 种初始化方式 ---

// ① 命名字段（推荐——清晰、不受字段顺序影响）
p1 := Person{Name: "张三", Age: 28, City: "北京"}

// ② 位置初始化（不推荐——依赖顺序，重构容易出错）
p2 := Person{"李四", 32, "上海"}

// ③ 部分初始化（未指定的为零值）
p3 := Person{Name: "王五"}  // Age=0, City=""

// ④ 零值初始化
var p4 Person              // Name="", Age=0, City=""
fmt.Printf("%+v\\n", p4)   // 输出: {Name: Age:0 City:}

// ⑤ &取地址（常用——构造后需要修改或用指针接收者方法）
p5 := &Person{Name: "赵六", Age: 25}

// ⑥ 匿名结构体（临时用一次，不需要定义 type）
anon := struct{ X, Y int; Label string }{10, 20, "坐标点"}`

const codeExport = `package model

// User 公开——外部可以用 model.User
type User struct {
    Name     string   // 公开——外部可读写
    password string   // 私有——只在 model 包内可见
}

// 工厂函数：外部通过这个创建 User（因为 password 是私有的）
func NewUser(name, pwd string) *User {
    return &User{Name: name, password: pwd}
}
// 注意：没有 setter/getter！
// Go 惯例：直接暴露字段，需要逻辑时才用方法包装`

const codeMethods = `type Counter struct {
    count int
}

// --- 值接收者：操作副本，不修改原值 ---
func (c Counter) Value() int {
    return c.count  // 只读，不会改
}

func (c Counter) BadIncrement() {
    c.count++  // ⚠️ 修改的是副本！调用者的 Counter 不会变
}

// --- 指针接收者：操作原值 ---
func (c *Counter) Increment() {
    c.count++  // ✅ 修改原值
}

func (c *Counter) Reset() {
    c.count = 0
}

// 使用
func main() {
    c := Counter{count: 0}

    c.BadIncrement()
    fmt.Println(c.Value())  // 输出: 0 ← 没变！因为 BadIncrement 改的是副本

    c.Increment()
    fmt.Println(c.Value())  // 输出: 1 ← 变了！因为 Increment 用指针接收者
}

// ⚠️ Go 的自动解引用：
// 即使 c 是值，也可以直接调用指针接收者的方法
// c.Increment() 等价于 (&c).Increment() —— Go 自动帮你取了地址`

const codeConstructor = `type Server struct {
    host    string
    port    int
    timeout time.Duration
}

// NewServer 是约定构造函数（Go 没有 new 关键字做这个）
func NewServer(host string, port int) *Server {
    // 可以在这里做验证
    if port <= 0 || port > 65535 {
        port = 8080  // 默认端口
    }
    return &Server{
        host:    host,
        port:    port,
        timeout: 30 * time.Second, // 设默认值
    }
}

// 可选参数模式（Functional Options Pattern）
type ServerOption func(*Server)
func WithTimeout(d time.Duration) ServerOption {
    return func(s *Server) { s.timeout = d }
}
func NewServerWithOptions(host string, port int, opts ...ServerOption) *Server {
    s := &Server{host: host, port: port, timeout: 30 * time.Second}
    for _, opt := range opts { opt(s) }
    return s
}

// 使用
func main() {
    s1 := NewServer("localhost", 3000)
    s2 := NewServerWithOptions("0.0.0.0", 443, WithTimeout(60*time.Second))
    fmt.Println(s1.timeout, s2.timeout) // 输出: 30s 60s
}`

const embedCode = `type Address struct {
    Street, City string
}

type Person struct {
    // 命名字段（不会提升）
    Home Address
}

type Employee struct {
    Name    string
    Address            // 匿名字段嵌入 → 字段和方法提升
    Company string
}

func (a Address) FullAddress() string {
    return a.Street + ", " + a.City
}

func main() {
    emp := Employee{
        Name:    "张三",
        Address: Address{Street: "科技园路1号", City: "深圳"},
        Company: "科技公司",
    }

    // ✅ 提升字段：访问 emp.Street 等价 emp.Address.Street
    fmt.Println(emp.Street)       // 输出: 科技园路1号

    // ✅ 提升方法：外层自动获得被嵌入类型的方法
    fmt.Println(emp.FullAddress()) // 输出: 科技园路1号, 深圳

    // ⚠️ 但不能把 Employee 当 Address 传：
    // printAddr(emp)  ← 编译错误！Employee 不是 Address
}

// 对比：如果用命名字段 → 没有提升效果
// p1.Home.Street  ← 必须写完整路径，p1.Street 不存在`

const embedInterfaceCode = `type Speaker interface {
    Speak() string
}

type Animal struct {
    Name string
}
func (a Animal) Speak() string {
    return a.Name + " 发出声音"
}

// Dog 嵌入 Animal 后，自动实现了 Speaker 接口！
type Dog struct {
    Animal
    Breed string
}

// Dog 也可以覆盖 Animal 的方法
func (d Dog) Speak() string {
    return d.Name + "（" + d.Breed + "）汪汪叫！"
}

func Announce(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    d := Dog{Animal: Animal{Name: "旺财"}, Breed: "金毛"}

    fmt.Println(d.Name)   // 输出: 旺财          — 字段提升
    Announce(d)           // 输出: 旺财（金毛）汪汪叫！ — 自动实现接口

    // ⚠️ 如果 Dog 没写自己的 Speak()，会调用 Animal 的 Speak()
    // 这就是 Go 的"继承"行为——但本质是组合+委托
}`

const tagCode = `type User struct {
    ID        int       \`json:"id" gorm:"primaryKey"\`
    Name      string    \`json:"name" validate:"required,min=2,max=50"\`
    Email     string    \`json:"email,omitempty"\`  // omitempty: 空值时不输出
    Password  string    \`json:"-"\`                 // "-" 表示忽略此字段
    CreatedAt time.Time \`json:"created_at,omitempty"\`
}

func main() {
    u := User{ID: 1, Name: "testuser", Email: ""}

    data, _ := json.MarshalIndent(u, "", "  ")
    fmt.Println(string(data))
    // 输出:
    // {
    //   "id": 1,
    //   "name": "testuser"
    // }
    // ⚠️ Email 被 omitempty 省略（空字符串）
    // ⚠️ Password 被 "-" 忽略
    // ⚠️ CreatedAt 被 omitempty 省略（零时间）
}`

const codeEmptyChan = `// 信号通道——只关心"完成了"这件事，不关心传递什么值
done := make(chan struct{})

go func() {
    // 执行耗时操作...
    time.Sleep(2 * time.Second)
    done <- struct{}{}  // 发送信号
}()

// 主 goroutine 等待信号
<-done  // 阻塞直到收到
fmt.Println("协程完成！")`

const codeEmptySet = `// 集合 Set 实现——Go 没有内置 Set，用 map[string]struct{} 代替
visited := make(map[string]struct{})

visited["Go"] = struct{}{}
visited["Rust"] = struct{}{}
visited["Go"] = struct{}{}     // 重复插入无影响

// 检查是否存在
if _, ok := visited["Go"]; ok {
    fmt.Println("Go 在集合中") // 输出: Go 在集合中
}

// 遍历
for key := range visited {
    fmt.Println(key) // 输出: Go, Rust（无序）
}

// 删除
delete(visited, "Rust")`

const codeComparable = `// ✅ 可比较：所有字段都是可比较类型
type Point struct{ X, Y int }
p1 := Point{1, 2}
p2 := Point{1, 2}
fmt.Println(p1 == p2)  // 输出: true

// ✅ 可作为 map key（因为可比较）
grid := make(map[Point]string)
grid[Point{0, 0}] = "原点"

// ❌ 不可比较：包含 slice 字段
type Container struct {
    Name  string
    Items []string  // slice 不可比较
}
// c1 := Container{Name: "box", Items: []string{"a"}}
// c2 := Container{Name: "box", Items: []string{"a"}}
// fmt.Println(c1 == c2)  // 编译错误！invalid operation
// 替代方案：用 reflect.DeepEqual(c1, c2)`

const codeMemory = `type Bad struct {
    Flag   bool    // 1 字节
    Count  int64   // 8 字节
    Active bool    // 1 字节
}
// 实际占用 24 字节（对齐填充了 14 字节！）

type Good struct {
    Count  int64   // 8 字节（先放大的）
    Flag   bool    // 1 字节
    Active bool    // 1 字节
}
// 实际占用 16 字节（紧凑排列）

func main() {
    fmt.Println(unsafe.Sizeof(Bad{}))   // 输出: 24
    fmt.Println(unsafe.Sizeof(Good{}))  // 输出: 16
    // 省了 33% 内存！
}`
</script>
