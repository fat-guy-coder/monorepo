<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧬 Go 泛型 Generics</h1>
          <p class="text-sm text-slate-500 mt-1">Go 1.18 核心特性 —— 类型参数 · 约束 · 类型集</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-20-generics.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-20</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要泛型 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要泛型：消灭重复代码
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.18 之前，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int</code>、
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">float64</code>、
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">string</code> 是<strong>三个不同的类型</strong>。
          想写一个「返回较大值」的函数，就得写三个几乎一模一样的版本——只有签名和声明类型不同，逻辑完全一样。这就是<strong>模板代码（boilerplate）</strong>：
        </p>
        <div class="mb-4"><Code language="go" :code="boilerplateCode" title="duplicated_max.go — 反模式" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>泛型让「类型」本身成为参数。</strong>你把「具体是什么类型」留给调用者决定，一份代码吃遍所有满足约束的类型。
          上面的三个函数，用泛型写只需要一个——而且<strong>不牺牲类型安全</strong>（比 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">interface{}</code> 强得多）。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么不用 interface{} 解决？</strong>接口参数可以接收任意类型，但一进函数就「丢了类型」——得靠类型断言拿回来，还容易在运行时 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">panic</code>。泛型把类型检查提前到<strong>编译期</strong>，签名自文档、调用点一目了然。</p>
        </aside>
      </section>

      <!-- 2. 泛型函数基础 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          泛型函数基础
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          泛型函数的语法：函数名后跟<strong>方括号类型参数列表</strong>
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[T 约束]</code>，参数和返回值里就能用
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">T</code>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">constraints.Ordered</code> 表示「可排序类型」——int/float64/string 都支持 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&gt;</code> 比较。
        </p>
        <div class="mb-4"><Code language="go" :code="genericFuncCode" title="generic_max.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>调用时类型参数可以省略——编译器从实参自动推断 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">T</code>。只有推断不出（如只想传 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">any</code> 时）才显式写 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Max[int](...)</code>。</p>
        </aside>
      </section>

      <!-- 3. 约束 constraints -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          约束 constraints：类型集的开关
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>约束限制 T 能是什么类型</strong>，同时决定 T 能参与哪些运算。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">any</code> 最宽松，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">comparable</code> 要求可比较，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">constraints.Ordered</code> 要求可排序。你还可以用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">interface{ ... }</code> 自定义约束。
        </p>
        <div class="mb-4"><Code language="go" :code="constraintsCode" title="constraints.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">约束</th><th class="px-4 py-2 border border-slate-200 font-semibold">允许的类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">能用什么运算</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">any</td><td class="px-4 py-2 border">任意类型（interface{} 别名）</td><td class="px-4 py-2 border">几乎什么都干不了（不能比较、不能算数）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">comparable</td><td class="px-4 py-2 border">可 == / != 的类型（基本类型、指针、可比较 struct）</td><td class="px-4 py-2 border">== !=；可做 map 键</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">constraints.Ordered</td><td class="px-4 py-2 border">整数、浮点、字符串（及其底层类型家族）</td><td class="px-4 py-2 border">&lt; &gt; &lt;= &gt;=（排序比较）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">interface{ ~int | ~string }</td><td class="px-4 py-2 border">底层类型是 int 或 string 的所有类型</td><td class="px-4 py-2 border">约束声明的运算符</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：约束 = 准入名单。</strong>约束定义了「T 必须属于哪个类型集合」。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">~int</code> 是「底层类型为 int 的所有类型」——自定义类型 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">type Age int</code> 也能进；只写 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">int</code> 则必须精确是 int。</p>
        </aside>
      </section>

      <!-- 4. 泛型类型与方法 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          泛型类型与方法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          泛型不只是函数——<strong>结构体、切片、map 别名都能带类型参数</strong>。定义一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Stack[T]</code>，就能同时拿到 int 栈和 string 栈，各不相干。
        </p>
        <div class="mb-4"><Code language="go" :code="stackCode" title="generic_stack.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键限制：方法不能再声明额外类型参数。</strong>Go 语言设计时只允许泛型「类型」声明类型参数，方法本身不能再加新的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">[R any]</code>——这是新手最常撞的编译错误，后面第 8 节会详细讲。</p>
        </aside>
      </section>

      <!-- 5. 标准库泛型实战 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          标准库泛型实战：slices 与 maps
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 1.21 把 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">slices</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">maps</code> 两个泛型包加入标准库——从此排序、查找、拷贝容器都<strong>不用再手写</strong>，且对所有类型通用。
        </p>
        <div class="mb-4"><Code language="go" :code="slicesMapsCode" title="slices_maps.go — Go 1.21+" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 版本说明：</strong>泛型本身从 <strong>Go 1.18</strong> 开始可用；<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">slices</code> / <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">maps</code> 是 <strong>Go 1.21+</strong> 的标准库。<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">constraints.Ordered</code> 目前仍在 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">golang.org/x/exp/constraints</code> 实验包中，生产项目常自建等价约束。</p>
        </aside>
      </section>

      <!-- 6. 执行流程拆解 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          执行流程拆解：编译期实例化 (monomorphization)
        </h2>
        <p class="text-slate-600 mb-2 leading-relaxed">
          Go 的泛型<strong>不是运行时魔法，而是编译期展开</strong>。一个泛型函数 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Max[T]</code> 在编译时会被「按需复制」成多个具体版本：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>编译器读到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">func Max[T constraints.Ordered](a, b T) T</code>，先把参数、返回值里的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">T</code> 全部当作「占位符」</li>
          <li>遇到调用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max(3, 5)</code> → 从实参推断 <code class="bg-slate-100 px-1 rounded font-mono text-xs">T = int</code>，编译器生成一个 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max_int</code> 实例（函数体原样、T 全部替换成 int）</li>
          <li>遇到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max(3.14, 2.71)</code> → 再生成 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max_float64</code>；遇到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max("apple","banana")</code> → 再生成 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Max_string</code></li>
          <li>每个实例展开前都会<strong>先按约束校验</strong>——编译期就确认 T 支持 <code class="bg-slate-100 px-1 rounded font-mono text-xs">&gt;</code> 运算，非法类型根本过不了编译</li>
          <li>运行时直接调用展开后的具体函数——<strong>没有类型断言、没有装箱、没有动态分派，和手写三个 Max 性能一模一样</strong></li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">Go 泛型</th><th class="px-4 py-2 border border-slate-200 font-semibold">TS 泛型</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">编译策略</td><td class="px-4 py-2 border">编译期实例化（monomorphization）</td><td class="px-4 py-2 border">类型擦除（erasure），T 变 any</td></tr>
              <tr><td class="px-4 py-2 border">运行时形态</td><td class="px-4 py-2 border">为每个具体类型展开出独立函数</td><td class="px-4 py-2 border">一份 JS 代码，无类型信息</td></tr>
              <tr><td class="px-4 py-2 border">运行时代价</td><td class="px-4 py-2 border">零开销（与手写版本等价）</td><td class="px-4 py-2 border">零运行时代价，但也没有运行时类型保障</td></tr>
              <tr><td class="px-4 py-2 border">类型校验时机</td><td class="px-4 py-2 border">编译期按类型集严格校验</td><td class="px-4 py-2 border">编译期类型校验，运行时靠 JS 动态类型</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个明显的副作用：每种具体类型都会<strong>新增一份函数拷贝</strong>，二进制体积会略增。但换来的是「抽象不付费」——这在性能敏感的后端/系统代码里非常值。
        </p>
      </section>

      <!-- 7. 前端类比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          🔗 前端类比
        </h2>
        <div class="mb-4"><Code language="ts" :code="tsGenericCode" title="max.ts — TS 泛型" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Go 泛型 ≈ TS 泛型。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">function max&lt;T extends Comparable&gt;(a: T, b: T): T</code> 里的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">T extends Comparable</code> 约束，就是 Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">constraints.Ordered</code>。<br/>
          最大区别：<strong>TS 运行时擦除</strong>——编译后 T 变成 any，类型只在写代码时生效；<strong>Go 编译期实例化</strong>——编译器按具体类型展开成多个函数，运行时零开销。<br/>
          Go 的约束（类型集）≈ TS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">extends</code> 约束，都是「限制类型参数必须满足某组能力」。
          </p>
        </aside>
      </section>

      <!-- 8. 常见错误与陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与陷阱
        </h2>
        <div class="mb-4"><Code language="go" :code="pitfallsCode" title="pitfalls.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ④：把 any 当约束滥用。</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">[T any]</code> 表面上「什么都能传」，但函数体里 T 什么运算都干不了——得靠类型断言，结果泛型形同虚设。泛型的价值正在于<strong>用约束精确表达能力</strong>，约束越具体，代码越安全。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ⑤：版本差异别踩空。</strong>泛型要 <strong>Go 1.18+</strong>（<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go.mod</code> 里 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go 1.18</code>）；<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">slices</code>/<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">maps</code> 要 <strong>Go 1.21+</strong>。版本太低，要么语法报错，要么 import 不到。升级后记得跑 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go mod tidy</code> 重新同步依赖。</p>
        </aside>
      </section>

      <!-- 9. 反模式与经验法则 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          反模式与经验法则
        </h2>
        <div class="mb-4"><Code language="go" :code="antipatternCode" title="antipattern.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>当「同一份逻辑 + 不同类型」出现 <strong>3 次以上</strong>，就值得泛型化。通用容器（栈/缓存/队列）、通用算法（排序/去重/映射）、跨项目工具函数是泛型的<strong>最佳舞台</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>❌ 别硬上泛型：</strong>① 业务类型（User、Order…）语义明确，用具体类型<strong>更清晰、更好读</strong>；② 反射能动态处理的未知结构，泛型反而编译期定死类型，两者场景不同；③ 类型断言 + 泛型混用是反面典型——要么靠约束，要么靠具体类型。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>泛型 = 让「类型」成为参数</strong>，一份代码通吃多种类型，消灭模板代码</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>语法</strong>：函数/类型名后写 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">[T 约束]</code>，调用时通常可省略（类型推断）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>约束即接口</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">any</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">comparable</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">constraints.Ordered</code> / 自定义类型集；<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">~int</code> 是底层类型，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">|</code> 是联合</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>泛型容器/方法</strong>很好用，但方法不能再声明额外类型参数（写独立泛型函数代替）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Go 1.21+</strong> 直接可用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">slices</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">maps</code> 泛型包，排序/查找/拷贝不再手写</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>编译期实例化</strong>：运行时零开销，与手写具体版本等价——这是 Go 泛型区别于 TS 泛型的本质</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>该用</strong>：通用容器/算法/工具函数；<strong>别用</strong>：业务类型、反射场景</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-19-testing" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：单元测试与基准测试</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-21-json-serialization" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：JSON 序列化 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要泛型" },
  { id: "sec-2", name: "泛型函数基础" },
  { id: "sec-3", name: "约束 constraints" },
  { id: "sec-4", name: "泛型类型与方法" },
  { id: "sec-5", name: "标准库泛型实战" },
  { id: "sec-6", name: "执行流程拆解" },
  { id: "sec-7", name: "前端类比" },
  { id: "sec-8", name: "常见错误与陷阱" },
  { id: "sec-9", name: "反模式与经验法则" },
  { id: "sec-10", name: "小结" },
]

const boilerplateCode = `// ❌ 反模式：同一逻辑写 3 遍，只因为类型不同
func MaxInt(a, b int) int {
    if a > b { return a }
    return b
}

func MaxFloat(a, b float64) float64 {
    if a > b { return a }
    return b
}

func MaxString(a, b string) string {
    if a > b { return a }
    return b
}

// ✅ 泛型：一份代码，所有「可排序类型」通吃
func Max[T constraints.Ordered](a, b T) T {
    if a > b { return a }
    return b
}`

const genericFuncCode = `// 泛型函数：类型参数 [T constraints.Ordered] 放在函数名后
func Max[T constraints.Ordered](a, b T) T {
    if a > b { return a }
    return b
}

func main() {
    // ① 显式写类型参数（繁琐，很少用）
    fmt.Println(Max[int](3, 5))            // 输出: 5

    // ② 类型推断：编译器从实参推导 T，调用处省略 [T]
    fmt.Println(Max(3.14, 2.71))           // 输出: 3.14（推导出 T=float64）
    fmt.Println(Max("apple", "banana"))    // 输出: banana（字符串按字典序比较）

    // ③ 多个类型参数：依次写在方括号里，逗号分隔
    k, v := Pair("user", 42)
    fmt.Println(k, v)                      // 输出: user 42
}

// 多个类型参数：K 与 V 可以是不同类型
func Pair[K any, V any](key K, val V) (K, V) {
    return key, val
}`

const constraintsCode = `// constraints 需额外引入：golang.org/x/exp/constraints
import "golang.org/x/exp/constraints"

// ① any：空接口别名（interface{}），任意类型都能进，
//    但函数体里对 T 什么运算都不能做
func PrintAnything[T any](v T) {
    fmt.Println(v)
}

// ② comparable：可比较类型（支持 == / !=），可做 map 键
func ContainsKey[K comparable, V any](m map[K]V, key K) bool {
    _, ok := m[key]
    return ok
}

// ③ constraints.Ordered：可排序类型（整数/浮点/字符串）
func Max[T constraints.Ordered](a, b T) T {
    if a > b { return a }
    return b
}

// ④ 自定义约束：约束就是接口！用 ~ 和 | 声明「类型集」
type Number interface {
    ~int | ~int64 | ~float64 | ~float32
}

// Sum 只接受上述数值类型——+ 运算才合法
func Sum[T Number](nums []T) T {
    var s T // T 的零值，无需知道具体类型
    for _, n := range nums { s += n }
    return s
}

func main() {
    fmt.Println(Sum([]int{1, 2, 3}))        // 输出: 6
    fmt.Println(Sum([]float64{1.5, 2.5}))   // 输出: 4
}`

const stackCode = `// 泛型结构体：字段、方法都能用类型参数 T
type Stack[T any] struct {
    items []T
}

func NewStack[T any]() *Stack[T] {
    return &Stack[T]{items: []T{}}
}

func (s *Stack[T]) Push(v T) { // 方法签名要带上 [T]
    s.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) { // 空栈返回零值时很优雅
    if len(s.items) == 0 {
        var zero T // T 的零值，不需要知道具体类型
        return zero, false
    }
    last := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return last, true
}

func main() {
    intStack := NewStack[int]() // int 栈
    intStack.Push(10)
    intStack.Push(20)
    fmt.Println(intStack.Pop()) // 输出: 20 true

    strStack := NewStack[string]() // string 栈，互不干扰
    strStack.Push("go")
    fmt.Println(strStack.Pop()) // 输出: go true
}

// ❌ 关键限制：方法不能声明「方法自己的」额外类型参数！
// func (s *Stack[T]) Map[R any](fn func(T) R) []R  // ✗ 编译错误
// → method must have no type parameters
// ✅ 解法：把需要第二个类型参数的方法改成独立的泛型函数`

const slicesMapsCode = `// Go 1.21+ 标准库泛型包：slices / maps
// （go.mod 需声明 go 1.21 或更高）
import (
    "maps"
    "slices"
)

func main() {
    // —— slices 实战 ——
    names := []string{"bob", "alice", "carol"}
    fmt.Println(slices.Contains(names, "alice"))   // 输出: true
    fmt.Println(slices.Contains(names, "eve"))     // 输出: false

    slices.Sort(names)                             // 原地升序排序
    fmt.Println(names)                             // 输出: [alice bob carol]

    idx, ok := slices.BinarySearch(names, "bob")   // 已排序才能二分
    fmt.Println(idx, ok)                           // 输出: 1 true

    // —— maps 实战 ——
    scores := map[string]int{"go": 95, "rust": 90}
    fmt.Println(maps.Keys(scores))                 // 输出无序: [go rust] 或 [rust go]
    fmt.Println(maps.Values(scores))               // 输出无序

    clone := maps.Clone(scores)                    // 浅拷贝
    clone["go"] = 0                                // 改 clone 不影响原 map
    fmt.Println(scores["go"])                      // 输出: 95
}`

const tsGenericCode = `// TS 泛型：extends 约束 + 类型参数
function max<T extends Comparable>(a: T, b: T): T {
    return a > b ? a : b
}

// 编译后（类型擦除）——T 变成 any，运行时无类型信息
// function max(a, b) { return a > b ? a : b }`

const pitfallsCode = `// ⚠️ 陷阱 ①：方法上声明额外类型参数 → 编译报错
// type Stack[T any] struct { items []T }
// func (s *Stack[T]) Map[R any](fn func(T) R) []R  // ✗ 编译错误！
// → method must have no type parameters
// ✅ 解法：改成独立的泛型函数
func Map[T, R any](s []T, fn func(T) R) []R {
    out := make([]R, 0, len(s))
    for _, v := range s { out = append(out, fn(v)) }
    return out
}

// ⚠️ 陷阱 ②：类型参数参与运算符，约束没声明就报错
// func Double[T any](x T) T { return x * 2 }  // ✗ invalid operation: x * 2
// ✅ 解法：用约束声明支持 * 的类型集
type Number interface {
    ~int | ~int64 | ~float64
}
func Double[T Number](x T) T { return x * 2 }

// ⚠️ 陷阱 ③：~ 的语义是「底层类型」，不是「精确类型」
// type Age int
// func Max[T ~int](a, b T) T { ... }   // ✅ Age 可传入（底层是 int）
// func Max[T int](a, b T) T { ... }    // ❌ Age 传不进去（类型不精确匹配）`

const antipatternCode = `// ✅ 该用泛型：通用容器 / 通用算法 / 工具函数
//   通用容器：Stack[T]、Cache[K, V]、Result[T]
//   通用算法：Max / Sort / Dedup / Map / Filter / Reduce
//   工具函数：与具体类型无关、只关心「能力」的逻辑

// ✅ 好的泛型：约束表达「能力」，签名自文档
func Pick[T comparable](m map[T]int) (T, int) { // 取 map 里值最大的键
    var best T
    max := -1
    for k, v := range m {
        if v > max { best, max = k, v }
    }
    return best, max
}

// ❌ 反模式 ①：业务类型硬套泛型，可读性反而变差
// type User struct { ID int64; Name string }
// func GetUser[T any](id T) *User  // ✗ T 换成 int64 更清晰
// → 业务逻辑用具体类型，泛型是为「复用」服务的

// ❌ 反模式 ②：泛型 + 断言/反射混用，两头不讨好
// func ToMap[T any](v T) map[string]any  // ✗ 又要断言又要反射
// → 反射处理动态未知结构，泛型在编译期就定死类型，场景不同`
</script>
