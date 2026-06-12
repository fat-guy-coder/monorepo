<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">变量、常量与数据类型</h1><p class="text-sm text-slate-500 mt-1">GDScript 的基础类型系统——var/const、int/float/String/bool</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 三语对照：</strong><table class="w-full text-xs mt-2"><thead><tr class="text-left"><th class="pr-4 py-1">TS</th><th class="pr-4 py-1">Python</th><th class="pr-4 py-1 text-blue-700">GDScript</th></tr></thead><tbody><tr><td class="pr-4 py-1 font-mono">let x: number = 1</td><td class="pr-4 py-1 font-mono">x: int = 1</td><td class="pr-4 py-1 font-mono text-blue-700">var x: int = 1</td></tr><tr><td class="pr-4 py-1 font-mono">const PI: number = 3.14</td><td class="pr-4 py-1 font-mono">PI: Final[float] = 3.14</td><td class="pr-4 py-1 font-mono text-blue-700">const PI: float = 3.14</td></tr><tr><td class="pr-4 py-1 font-mono">let n: string = "hi"</td><td class="pr-4 py-1 font-mono">n: str = "hi"</td><td class="pr-4 py-1 font-mono text-blue-700">var n: String = "hi"</td></tr><tr><td class="pr-4 py-1 font-mono">let f: boolean = true</td><td class="pr-4 py-1 font-mono">f: bool = True</td><td class="pr-4 py-1 font-mono text-blue-700">var f: bool = true</td></tr></tbody></table></p></aside>
        <p class="text-slate-600 leading-relaxed">GDScript 有 4 种基础类型和 3 种声明关键字。<strong>所有代码示例使用强类型写法。</strong></p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>三种声明关键字</h2>
        <div class="mb-4"><Code language="gdscript" :code="declarationCode" title="declarations.gd" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">关键字</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TS 对应</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">何时用</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">var</td><td class="px-4 py-2 border border-slate-200">可变变量</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">let</td><td class="px-4 py-2 border border-slate-200">运行时可变的值</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">const</td><td class="px-4 py-2 border border-slate-200">编译时常量</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">const</td><td class="px-4 py-2 border border-slate-200">永不改变的值（速度/尺寸常量）</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@export var</td><td class="px-4 py-2 border border-slate-200">导出到编辑器</td><td class="px-4 py-2 border border-slate-200">Vue defineProps</td><td class="px-4 py-2 border border-slate-200">Inspector 中可调的配置值</td></tr></tbody></table></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ GDScript 没有 <code class="bg-amber-100 px-1 rounded text-xs font-mono">let</code> vs <code class="bg-amber-100 px-1 rounded text-xs font-mono">const</code> 的"不可变绑定"概念。</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">const</code> 是<strong>编译时常量</strong>——值在编译时就确定了，不能是函数返回值。运行时的"不可变"用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">var</code> 或不重新赋值来保证。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>四大基础类型</h2>
        <div class="mb-4"><Code language="gdscript" :code="basicTypesCode" title="basic_types.gd" /></div>
        <div class="space-y-4 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><h3 class="font-semibold text-slate-700 mb-1">int — 64 位有符号整数</h3><p>范围：-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807（≈ ±9.2 × 10¹⁸）。<strong>没有单独的 int8/int16/int32——只有一个 int 类型。</strong>和 Python 3 一样是<strong>无限精度</strong>不对——GDScript 的 int 是 64 位，不会自动升级为 bigint（和 Python 不同！）。</p><p class="mt-1 text-xs text-slate-400">TS: <code class="bg-slate-200 px-1 rounded">let n: number = 42</code> | Python: <code class="bg-slate-200 px-1 rounded">n: int = 42</code></p></div>
          <div class="bg-slate-50 rounded-lg p-3"><h3 class="font-semibold text-slate-700 mb-1">float — 64 位浮点数</h3><p>IEEE 754 双精度。所有带小数点的数字都是 float。<strong>没有 float32。</strong></p><p class="mt-1 text-xs text-slate-400">TS: <code class="bg-slate-200 px-1 rounded">let f: number = 3.14</code> | Python: <code class="bg-slate-200 px-1 rounded">f: float = 3.14</code></p></div>
          <div class="bg-slate-50 rounded-lg p-3"><h3 class="font-semibold text-slate-700 mb-1">String — UTF-8 字符串</h3><p>单引号 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">'...'</code> 和双引号 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"..."</code> 等价。多行用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"""..."""</code>。<strong>注意大写 S！</strong>这是故意的——Godot 的所有内置类型都是大写开头（和 C# 一致）。</p><p class="mt-1 text-xs text-slate-400">TS: <code class="bg-slate-200 px-1 rounded">let s: string = "hi"</code> | Python: <code class="bg-slate-200 px-1 rounded">s: str = "hi"</code></p></div>
          <div class="bg-slate-50 rounded-lg p-3"><h3 class="font-semibold text-slate-700 mb-1">bool — 布尔值</h3><p>只有 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">true</code> 和 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">false</code>（<strong>小写！</strong>和 Python 的 True/False 不同）。任何非零数字转 bool 为 true，0 为 false。空字符串为 false。</p><p class="mt-1 text-xs text-slate-400">TS: <code class="bg-slate-200 px-1 rounded">let b: boolean = true</code> | Python: <code class="bg-slate-200 px-1 rounded">b: bool = True</code></p></div>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>类型转换（Casting）</h2>
        <div class="mb-4"><Code language="gdscript" :code="castingCode" title="casting.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ GDScript 的类型转换和 Python 不同：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">int("12.3")</code> <strong>不会工作！</strong>必须先 <code class="bg-amber-100 px-1 rounded text-xs font-mono">float("12.3")</code> 再 <code class="bg-amber-100 px-1 rounded text-xs font-mono">int(12.3)</code>。这和 Python 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">int("12.3")</code> 行为不同——Python 会报错，GDScript 也报错但原因一样。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>变量作用域</h2>
        <div class="mb-4"><Code language="gdscript" :code="scopeCode" title="scope.gd" /></div>
        <ul class="space-y-1 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>函数作用域：</strong>和 JS 的 var 一样（函数级作用域），没有块级作用域（<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">if</code> 里的 var 外部可见）。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>文件作用域：</strong>脚本顶层的 var/const 对整个脚本可见，但<strong>不会泄漏到其他脚本</strong>。</span></li></ul>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>Variant — 万能类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">不写类型标注的变量默认是 <strong>Variant 类型</strong>——可以存任何值。≈ TS 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">any</code> 或 Python 的动态类型。JSON 解析、API 返回值等动态数据场景使用。但<strong>业务逻辑代码应该避免</strong>。</p>
        <div class="mb-4"><Code language="gdscript" :code="variantCode" title="variant.gd" /></div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">var</code> = let（变量），<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">const</code> = 编译时常量，<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@export var</code> = defineProps</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>四大基础类型：<strong>int（64位）、float（64位）、String（UTF-8）、bool（小写 true/false）</strong></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>类型转换用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">int()/float()/str()</code>，和 Python 类似但注意 String → int 不能直接转含小数的字符串</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>始终写类型标注</strong>（<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">: int</code>）——IDE 补全 + 编译检查 + 性能提升</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-1-gdscript-intro" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：GDScript 简介</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-3-operators" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：运算符与表达式 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"声明关键字"},{id:"sec-3",name:"四大基础类型"},{id:"sec-4",name:"类型转换"},{id:"sec-5",name:"作用域"},{id:"sec-6",name:"Variant"},{id:"sec-7",name:"小结"}]
const declarationCode = `# var ——可变变量（默认）
var health: int = 100
var player_name: String = "Godot"
var is_alive: bool = true

# const ——编译时常量（值必须在编译时已知）
const MAX_HEALTH: int = 200
const GRAVITY: float = 980.0
const GAME_TITLE: String = "My Game"
# const now = Time.get_time()  # ❌ 编译错误！必须是编译时常量

# @export var ——导出到编辑器 Inspector
@export var speed: float = 300.0
@export var max_jumps: int = 2
@export var can_fly: bool = false`
const basicTypesCode = `# === int：64 位有符号整数 ===
var score: int = 0
var level: int = 1
var hex_value: int = 0xFF   # 255（十六进制字面量）
var big_num: int = 1_000_000  # 1000000（下划线分隔，增加可读性）

# === float：64 位 IEEE 754 浮点数 ===
var pi: float = 3.14159
var speed: float = 300.0
var tiny: float = 1.5e-10  # 科学计数法

# === String：UTF-8 字符串（注意大写 S！）===
var name: String = "Player"
var msg: String = 'Hello'        # 单引号和双引号等价
var multiline: String = """line1
line2
line3"""                           # 三引号多行字符串

# === bool：true / false（小写！）===
var alive: bool = true
var paused: bool = false
var has_weapon: bool = true`
const castingCode = `# 数字 → 字符串
var s: String = str(42)          # "42"
var s2: String = str(3.14)       # "3.14"

# 字符串 → 数字
var n: int = int("42")           # 42
var f: float = float("3.14")     # 3.14
# int("3.14")  # ❌ 错误！不能直接转含小数的字符串

# 浮点 → 整数（截断，不四舍五入）
var i: int = int(3.9)            # 3（截断！和 Python int() 一样）

# 整数 → 浮点
var fl: float = float(42)        # 42.0

# bool 转换
var b: bool = bool(1)            # true（非零为 true）
var b2: bool = bool("")          # false（空字符串为 false）`
const scopeCode = `extends Node

var global_var: int = 1       # 文件作用域——整个脚本可见

func _ready() -> void:
    var local: int = 2         # 函数作用域——仅此函数内可见
    if true:
        var block_var: int = 3 # ⚠️ 块内 var 在块外也可见！（函数级作用域）
        print(block_var)       # 3
    print(block_var)           # 3 ← 仍然可见！和 Python/JS 的 let 不同

func other_func() -> void:
    print(global_var)          # 1 ← 文件作用域，跨函数可见
    # print(local)             # ❌ 错误：local 在另一个函数里`
const variantCode = `# Variant ——不写类型标注时的默认类型
var anything = 42           # 此时是 int
anything = "now a string"    # OK——因为 anything 是 Variant
anything = Vector2(1, 2)     # OK

# Variant 的代价：无 IDE 补全，运行时类型检查，性能较慢
# 业务逻辑中应避免——用强类型标注
var typed_value: int = 42   # ✅ 明确类型
# typed_value = "string"    # ❌ 编译器报错`
</script>
