<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">null 安全与 ? 操作符</h1><p class="text-sm text-slate-500 mt-1">处理空值——GDScript 的 null 安全模式</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-12</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>null 在 GDScript 中</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">null / undefined</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">None</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">null</code>（小写！）<br/>GDScript 只有 null，没有 undefined。和 JS 一样用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">== null</code> 判断。</p></aside></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>代码中的 null 安全</h2><div class="mb-4"><Code language="gdscript" :code="nullCode" title="null_safety.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">null</code>（小写）= JS null / Python None</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">if node: </code> ≈ TS 的 truthy check</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有 ?. / ?? 运算符</strong>（Godot 4.x 暂无），用 if 判断或 .get() 方法</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-11-static-typing" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：静态类型注解</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-13-string-formatting" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：字符串格式化 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"null 概念"},{id:"sec-2",name:"null 安全代码"},{id:"sec-3",name:"小结"}]
const nullCode = `# null ——小写，只有 null 没有 undefined
var target: Node = null
# 检查 null：直接 if 判断（truthy/falsy）
if target:   # null → falsy
    target.queue_free()
# 显式检查
if target == null:
    print("没有目标")
# 安全调用：先检查再调用（Godot 4.x 没有 ?. ）
if is_instance_valid(target):
    target.queue_free()
# Dictionary 安全取值
var hp: int = data.get("health", 0)  # 不存在返回默认值 0
# 不写类型注解时变量初始化为 null
var something  # 此时是 null（Variant 类型）`
</script>
