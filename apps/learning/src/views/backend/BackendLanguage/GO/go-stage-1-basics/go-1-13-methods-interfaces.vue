<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔌 方法与接口</h1>
          <p class="text-sm text-slate-500 mt-1">值/指针接收者 · 隐式接口 · 类型断言 · 多态</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-13-methods-interfaces.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-13</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 方法 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          方法：把函数绑定到类型上
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的方法就是带 <strong>receiver（接收者）</strong>的函数。这让 struct 拥有了类似 class 的"成员方法"——但函数定义在类型外部，数据和操作是分离的。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 JS/TS 类比：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">func (u User) Greet()</code> ≈ TS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">class User {"{"} greet() {"{}"} {"}"}</code>——但 Go 的方法写在 struct 外面，可以是任何同包内的类型（不限于 struct）。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">值接收者 vs 指针接收者</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">值接收者 (T)</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">指针接收者 (*T)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">修改接收者</td><td class="px-4 py-2 border">❌ 改的是副本</td><td class="px-4 py-2 border">✅ 改的是原值</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">拷贝成本</td><td class="px-4 py-2 border">整个 struct</td><td class="px-4 py-2 border">仅 8 字节指针</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">并发安全</td><td class="px-4 py-2 border">天然安全（副本）</td><td class="px-4 py-2 border">需加锁</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">接口实现</td><td class="px-4 py-2 border">T 和 *T 都满足</td><td class="px-4 py-2 border">只有 *T 满足</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="methodsCode" title="methods.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键规则：</strong>同一类型的所有方法应该<strong>统一使用同一种接收者</strong>。混用值/指针接收者会使代码难以理解和维护。默认用指针接收者，只在确知不需要修改且 struct 很小时用值接收者。</p>
        </aside>
      </section>

      <!-- 2. 接口 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          接口：Go 最优雅的设计
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的接口是<strong>隐式满足</strong>的——类型无需声明 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">implements</code>，只要实现了接口的所有方法即自动满足。这让代码<strong>高度解耦</strong>且易于测试。
        </p>
        <div class="mb-4"><Code language="go" :code="interfaceCode" title="interface.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">接口底层： (type, value) 二元组</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          接口值在运行时是一个 <strong>(动态类型指针, 动态值指针)</strong> 的二元组。nil 接口（type=nil, value=nil）与值为 nil 但类型非 nil 的接口<strong>有本质区别</strong>——这是最常见的 Go 陷阱之一。
        </p>
        <div class="mb-4"><Code language="go" :code="nilInterfaceCode" title="nil_interface.go" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>接口应由<strong>消费方</strong>定义，而非实现方。保持接口小而精（1-3 个方法），需要时再组合。常用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">io.Reader</code>（1个方法）、<code class="bg-emerald-100 px-1 rounded text-xs font-mono">io.Writer</code>（1个方法）都是经典单方法接口。</p>
        </aside>
      </section>

      <!-- 3. 空接口与类型断言 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          空接口、类型断言与类型 Switch
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">interface{}</code>（Go 1.18+ 别名 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">any</code>）可持有任意类型的值——因为所有类型都实现了 0 个方法。
        </p>
        <div class="mb-4"><Code language="go" :code="emptyInterfaceCode" title="empty_interface.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">语法</th><th class="px-4 py-2 border border-slate-200 font-semibold">失败行为</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">逗号 ok</td><td class="px-4 py-2 border font-mono text-xs">v, ok := x.(T)</td><td class="px-4 py-2 border">ok=false，不 panic</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">直接断言</td><td class="px-4 py-2 border font-mono text-xs">v := x.(T)</td><td class="px-4 py-2 border text-red-600">panic</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">类型 switch</td><td class="px-4 py-2 border font-mono text-xs">switch v := x.(type)</td><td class="px-4 py-2 border">default 分支兜底</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. 多态实战 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          多态实战：用接口写出灵活代码
        </h2>
        <div class="mb-4"><Code language="go" :code="polymorphismCode" title="polymorphism.go" /></div>
      </section>

      <!-- 5. 常用标准接口 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常用标准接口速查
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">接口</th><th class="px-4 py-2 border border-slate-200 font-semibold">签名</th><th class="px-4 py-2 border border-slate-200 font-semibold">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">error</td><td class="px-4 py-2 border font-mono text-xs">Error() string</td><td class="px-4 py-2 border">一切错误的抽象，最常用的接口</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">fmt.Stringer</td><td class="px-4 py-2 border font-mono text-xs">String() string</td><td class="px-4 py-2 border">自定义打印格式（≈ JS toString()）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">io.Reader</td><td class="px-4 py-2 border font-mono text-xs">Read([]byte) (int, error)</td><td class="px-4 py-2 border">一切输入源（文件/网络/内存）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">io.Writer</td><td class="px-4 py-2 border font-mono text-xs">Write([]byte) (int, error)</td><td class="px-4 py-2 border">一切输出目标</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">io.Closer</td><td class="px-4 py-2 border font-mono text-xs">Close() error</td><td class="px-4 py-2 border">可关闭资源（文件/连接）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">sort.Interface</td><td class="px-4 py-2 border font-mono text-xs">Len() int / Less(i,j) bool / Swap(i,j)</td><td class="px-4 py-2 border">自定义排序</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">http.Handler</td><td class="px-4 py-2 border font-mono text-xs">ServeHTTP(ResponseWriter, *Request)</td><td class="px-4 py-2 border">HTTP 请求处理</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>方法 = receiver + func</strong>，同一类型统一用指针接收者</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>接口隐式满足</strong>——无需 implements 声明，有方法即满足</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>接口要小</strong>（1-3 个方法），消费方定义，需要时组合</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>nil 接口陷阱：</strong>有类型的 nil 指针 ≠ nil 接口</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>类型断言用 comma ok：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">v, ok := x.(T)</code>，不要直接断言</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-12-new-make" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：new 与 make</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-14-packages-modules" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：包与模块管理 →</RouterLink>
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
  { id: "sec-1", name: "方法：值/指针接收者" },
  { id: "sec-2", name: "接口：隐式满足" },
  { id: "sec-3", name: "空接口与类型断言" },
  { id: "sec-4", name: "多态实战" },
  { id: "sec-5", name: "常用标准接口" },
  { id: "sec-6", name: "关键点" },
]

const methodsCode = `type Point struct{ X, Y float64 }

// 值接收者 — 操作副本，不修改原值
func (p Point) Distance() float64 {
    return math.Sqrt(p.X*p.X + p.Y*p.Y)
}

// 指针接收者 — 修改原值
func (p *Point) Scale(f float64) {
    p.X *= f
    p.Y *= f
}

// ⚠️ nil 接收者也可以调用方法！（Go 允许）
func (p *Point) String() string {
    if p == nil { return "<nil>" }
    return fmt.Sprintf("(%v, %v)", p.X, p.Y)
}

func main() {
    p := Point{3, 4}
    fmt.Println(p.Distance())      // 5
    p.Scale(2)                     // p 变为 (6, 8)
    // Go 自动取地址：p.Scale(2) 等价 (&p).Scale(2)

    var np *Point                  // np == nil
    fmt.Println(np.String())       // <nil> — 不会 panic！
}`

const interfaceCode = `// 定义接口 — 小而精
type Speaker interface {
    Speak() string
}

// Dog 和 Cat 隐式实现 Speaker（无需声明 implements）
type Dog struct{ Name string }
type Cat struct{ Name string }

func (d Dog) Speak() string { return d.Name + ": Woof!" }
func (c Cat) Speak() string { return c.Name + ": Meow!" }

// 多态 — 接口变量可持有任意实现
func Announce(s Speaker) { fmt.Println(s.Speak()) }

func main() {
    Announce(Dog{Name: "Rex"})   // Rex: Woof!
    Announce(Cat{Name: "Luna"})  // Luna: Meow!

    // 接口组合 — 嵌入已有接口
    type ReadWriteCloser interface {
        io.Reader
        io.Writer
        io.Closer
    } // 3 个接口组合成一个，无需重复声明方法
}`

const nilInterfaceCode = `// ⚠️ nil 接口陷阱 — Go 面试高频考点
type MyError struct{ msg string }
func (e *MyError) Error() string { return e.msg }

func getError() error {
    var err *MyError = nil   // err 的类型是 *MyError，值是 nil
    return err               // 返回的 error 接口 != nil！
    // 因为接口 = (type, value)，这里 type=*MyError, value=nil
    // 虽然 value 是 nil，但 type 不是 nil — 所以接口本身 != nil
}

func main() {
    err := getError()
    fmt.Println(err == nil)  // false！这个陷阱坑了无数 Go 新手
    // ✅ 正确做法：return nil（不加类型）
}`

const emptyInterfaceCode = `// 空接口接受任意类型（Go 1.18+ 可用 any 代替 interface{}）
var x any
x = 42
x = "hello"
x = []int{1, 2, 3}

// ✅ 安全断言 — comma-ok 惯用法
if v, ok := x.(string); ok {
    fmt.Println("string:", v)
}

// ✅ 类型 switch — 按具体类型分发逻辑
func describe(v any) string {
    switch val := v.(type) {
    case int:    return fmt.Sprintf("整数: %d", val)
    case string: return fmt.Sprintf("字符串: %s", val)
    case bool:   return fmt.Sprintf("布尔: %t", val)
    case nil:    return "nil"
    default:     return fmt.Sprintf("未知类型: %T", val)
    }
}`

const polymorphismCode = `// 🎯 实战：用接口实现可替换的支付方式
type PaymentMethod interface {
    Pay(amount float64) error
    Name() string
}

type CreditCard struct{ Number string }
func (c CreditCard) Pay(amount float64) error {
    fmt.Printf("信用卡 %s 支付 ¥%.2f\\n", c.Number, amount)
    return nil
}
func (c CreditCard) Name() string { return "信用卡" }

type WeChatPay struct{ OpenID string }
func (w WeChatPay) Pay(amount float64) error {
    fmt.Printf("微信支付(OpenID=%s) ¥%.2f\\n", w.OpenID, amount)
    return nil
}
func (w WeChatPay) Name() string { return "微信支付" }

// 核心逻辑 — 只依赖接口，不关心具体实现
func Checkout(method PaymentMethod, amount float64) {
    fmt.Printf("使用 %s...\\n", method.Name())
    if err := method.Pay(amount); err != nil {
        fmt.Println("支付失败:", err)
        return
    }
    fmt.Println("支付成功！")
}

func main() {
    Checkout(CreditCard{Number: "1234-5678"}, 99.99)
    Checkout(WeChatPay{OpenID: "wx_abc123"}, 49.50)
    // 加新的支付方式？只需实现 PaymentMethod 接口，Checkout 不用改！
}`
</script>
