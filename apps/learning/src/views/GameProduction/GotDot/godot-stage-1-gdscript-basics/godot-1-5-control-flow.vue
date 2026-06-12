<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">控制流</h1><p class="text-sm text-slate-500 mt-1">if / match / for / while——代码分支与循环</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>if / elif / else</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">和 Python 完全一样——<strong>缩进代替花括号，<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">elif</code> 代替 else if，冒号结尾。</strong></p>
        <div class="mb-4"><Code language="gdscript" :code="ifCode" title="if_else.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ GDScript 的 if 不需要括号！</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">if (x > 0):</code> 虽然能运行，但不推荐。Python 和 GDScript 的惯例都是省略括号。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>match — 模式匹配</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">GDScript 的 match ≈ <strong>Python 3.10+ 的 match-case + TS 的 discriminated union pattern</strong>。比 if-elif 更清晰，且支持多种匹配模式。</p>
        <div class="mb-4"><Code language="gdscript" :code="matchCode" title="match.gd" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ match 的好处：</strong>不需要写 break（自动 break，不会 fall-through）。代码更扁平。支持通配符 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">_</code> 和多种匹配模式（值/类型/数组/字典/绑定）。≈ TS 的 discriminated union + switch 的加强版。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>for 循环</h2>
        <div class="mb-4"><Code language="gdscript" :code="forCode" title="for.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 关键差异：</strong>GDScript 的 for 循环 <strong>没有 C 风格的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">for (var i=0; i&lt;n; i++)</code></strong>。你需要用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">for i in range(n):</code>。这和 Python 一致。需要 while 循环实现复杂循环条件。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>while 循环</h2>
        <div class="mb-4"><Code language="gdscript" :code="whileCode" title="while.gd" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>if/elif/else——</strong>和 Python 一样，缩进代替花括号，不用括号括条件</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>match——</strong>模式匹配（≈ TS discriminated union + Python match-case），自动 break</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>for in——</strong>遍历数组/字典/range，<strong>没有 C 风格 for(;;)</strong></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">break</code> / <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">continue</code>——和所有语言一样</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-4-arrays-dicts" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：数组与字典</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-6-functions" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：函数 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"if/elif/else"},{id:"sec-2",name:"match"},{id:"sec-3",name:"for"},{id:"sec-4",name:"while"},{id:"sec-5",name:"小结"}]
const ifCode = `var hp: int = 50
if hp <= 0:
    print("dead")
elif hp < 30:
    print("danger")      # 缩进 4 空格（Tab 也行，但统一用空格）
else:
    print("alive")`
const matchCode = `# match ≈ Python match-case / TS discriminated union
var state: String = "run"
match state:
    "idle":    print("待机")
    "run":     print("跑步")
    "jump":    print("跳跃")
    _:         print("未知状态")  # _ = 通配符（default）

# match 数组
var pos: Array = [0, 100]
match pos:
    [0, 0]:         print("原点")
    [var x, 0]:     print("x轴", x)     # 绑定变量
    [0, var y]:     print("y轴", y)
    [var x, var y]: print("坐标", x, y)`
const forCode = `# for in ——遍历数组
for score: int in [100, 200, 300]:
    print(score)

# for i in range ——计数循环（和 Python 一样）
for i: int in range(5):          # 0,1,2,3,4
    print(i)
for i: int in range(2, 6):       # 2,3,4,5
    print(i)
for i: int in range(0, 10, 2):   # 0,2,4,6,8（步长 2）
    print(i)

# for in dict ——遍历字典
for key: String in dict.keys():
    print(key, ": ", dict[key])

# 没有 C 风格的 for(;;)！用 while 代替`
const whileCode = `var i: int = 0
while i < 5:
    print(i)
    i += 1       # 没有 i++！

# break / continue ——和其他语言一样
while true:
    var x: float = randf()
    if x > 0.9:
        break     # 跳出循环
    if x < 0.1:
        continue  # 跳过本次迭代
    print(x)`
</script>
