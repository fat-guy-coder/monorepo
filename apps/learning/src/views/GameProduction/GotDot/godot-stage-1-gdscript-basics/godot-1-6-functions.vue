<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">函数</h1><p class="text-sm text-slate-500 mt-1">声明、参数、返回值、lambda——GDScript 的函数系统</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>函数声明</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">function foo(x: number): void {"{}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">def foo(x: int) -> None:</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">func foo(x: int) -> void:</code><br/>GDScript = Python 的 def → func，类型标注风格像 TS。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="funcCode" title="functions.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>参数详解</h2>
        <div class="mb-4"><Code language="gdscript" :code="paramsCode" title="parameters.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Lambda / 匿名函数</h2>
        <div class="mb-4"><Code language="gdscript" :code="lambdaCode" title="lambda.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">(x) => x * 2</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">lambda x: x * 2</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">func(x): return x * 2</code><br/><strong>GDScript 没有箭头函数</strong>——但匿名 func 的写法也很简洁。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">func name(params) -> ReturnType:</code>——和 Python 的 def 类似，但用 func</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>参数默认值、可变参数（不推荐用无类型可变参数）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有箭头函数</strong>，匿名函数用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">func(x): return x * 2</code></span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-5-control-flow" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：控制流</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-7-classes-oop" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：类与面向对象 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"函数声明"},{id:"sec-2",name:"参数详解"},{id:"sec-3",name:"Lambda"},{id:"sec-4",name:"小结"}]
const funcCode = `# === 基本函数（强类型）===
func add(a: int, b: int) -> int:
    return a + b

# === 无返回值 ===
func log(msg: String) -> void:
    print(msg)

# === 无参数 ===
func get_version() -> String:
    return "1.0.0"

# === 多返回值（实际返回 Tuple）===
func get_position() -> Vector2:
    return Vector2(100, 200)`
const paramsCode = `# === 默认参数值 ===
func greet(name: String = "Player") -> void:
    print("Hello, ", name)

# === 命名参数调用（推荐，提高可读性）===
func create_ui(text: String, size: int = 14, color: Color = Color.WHITE) -> void:
    pass
create_ui("OK", size = 24, color = Color.RED)  # 命名参数

# === 可变参数（不推荐用无类型版本）===
func sum_all(values: Array[int]) -> int:
    var total: int = 0
    for v in values: total += v
    return total`
const lambdaCode = `# Lambda / 匿名函数
var doubler: Callable = func(x: int) -> int: return x * 2
print(doubler.call(5))  # 10

# 直接作为参数传递（filter/map 的回调）
var scores: Array[int] = [1, 2, 3, 4, 5]
var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 2)

# Callable 类型（一等公民）
var action: Callable = func(): print("clicked")
action.call()`
</script>
