<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">静态类型注解</h1><p class="text-sm text-slate-500 mt-1">Type Hints——GDScript 的 TypeScript 模式</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-11</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么写类型？</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">let x: number = 1</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">x: int = 1</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">var x: int = 1</code><br/>GDScript 的类型系统和 Python 的类型注解理念一致——<strong>可选、渐进、编译时检查</strong>。和 TS 的 strict mode 一样，类型越多越好。</p></aside>
<p class="text-slate-600 mb-3 leading-relaxed">类型注解的收益：<strong>IDE 自动补全（最重要的）、编译时错误捕获（保存时标红）、运行性能提升（省去类型推断开销）。</strong></p></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>类型注解速查</h2><div class="mb-4"><Code language="gdscript" :code="typingCode" title="type_hints.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>类型推断</h2><p class="text-slate-600 mb-3 leading-relaxed">GDScript 支持类型推断——如果变量声明时直接赋值了明确类型的值，可以省略类型标注。但<strong>推荐仍然写标注</strong>——显式优于隐式。</p><div class="mb-4"><Code language="gdscript" :code="inferenceCode" title="type_inference.gd" /></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>类型注解 = <strong>IDE 补全 + 编译检查 + 性能提升</strong></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>支持推断，但<strong>显式标注更安全</strong>（和 TS strict 一样）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>内置类型用大写（int/float/String），数组用 Array[T]</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-10-setget-properties" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：属性 getter/setter</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-12-null-safety" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：null 安全 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"为什么写类型"},{id:"sec-2",name:"类型速查"},{id:"sec-3",name:"类型推断"},{id:"sec-4",name:"小结"}]
const typingCode = `# 变量类型
var score: int = 0
var name: String = "Hero"
var speed: float = 300.0
var alive: bool = true
var dir: Vector2 = Vector2.ZERO
var col: Color = Color.WHITE

# 集合类型
var scores: Array[int] = [1, 2, 3]
var map: Dictionary = {"key": "value"}

# 函数签名
func add(a: int, b: int) -> int:
    return a + b
func log(msg: String) -> void:
    print(msg)

# 节点引用（类型标注后 IDE 自动补全！）
@onready var sprite: Sprite2D = $Sprite2D
sprite.position.x += 10  # ← IDE 知道 position 是 Vector2`
const inferenceCode = `# 类型推断——可以省略，但不推荐
var x := 10            # 推断为 int
var name := "Hero"     # 推断为 String
# 推荐写法（显式）
var x: int = 10
var name: String = "Hero"`
</script>
