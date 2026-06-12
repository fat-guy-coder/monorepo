<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">运算符与表达式</h1><p class="text-sm text-slate-500 mt-1">算术、比较、逻辑、位运算——三语对照速查</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🧮</span>运算符速查表</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 GDScript 的运算符 ≈ Python 的运算符。</strong>如果你会 Python 或 JS，除了 <code class="bg-purple-100 px-1 rounded text-xs font-mono">**</code>（幂）和 <code class="bg-purple-100 px-1 rounded text-xs font-mono">and/or/not</code>（英文而非 &&），其他几乎一样。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类别</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TS</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Python</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700 text-blue-700">GDScript</th></tr></thead><tbody class="text-slate-600 font-mono text-xs">
          <tr><td class="px-4 py-2 border border-slate-200">加法</td><td class="px-4 py-2 border border-slate-200">a + b</td><td class="px-4 py-2 border border-slate-200">a + b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a + b</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">减法</td><td class="px-4 py-2 border border-slate-200">a - b</td><td class="px-4 py-2 border border-slate-200">a - b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a - b</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">乘法</td><td class="px-4 py-2 border border-slate-200">a * b</td><td class="px-4 py-2 border border-slate-200">a * b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a * b</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">除法（浮点）</td><td class="px-4 py-2 border border-slate-200">a / b</td><td class="px-4 py-2 border border-slate-200">a / b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a / b（总是 float！）</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">整除</td><td class="px-4 py-2 border border-slate-200">Math.floor(a/b)</td><td class="px-4 py-2 border border-slate-200">a // b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a / b（int/int 得 int 截断）</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">取模</td><td class="px-4 py-2 border border-slate-200">a % b</td><td class="px-4 py-2 border border-slate-200">a % b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a % b</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">幂运算</td><td class="px-4 py-2 border border-slate-200">a ** b</td><td class="px-4 py-2 border border-slate-200">a ** b</td><td class="px-4 py-2 border border-slate-200 text-blue-700">a ** b</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">等于</td><td class="px-4 py-2 border border-slate-200">===</td><td class="px-4 py-2 border border-slate-200">==</td><td class="px-4 py-2 border border-slate-200 text-blue-700">==</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">不等</td><td class="px-4 py-2 border border-slate-200">!==</td><td class="px-4 py-2 border border-slate-200">!=</td><td class="px-4 py-2 border border-slate-200 text-blue-700">!=</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">逻辑与</td><td class="px-4 py-2 border border-slate-200">&&</td><td class="px-4 py-2 border border-slate-200">and</td><td class="px-4 py-2 border border-slate-200 text-blue-700">and</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">逻辑或</td><td class="px-4 py-2 border border-slate-200">||</td><td class="px-4 py-2 border border-slate-200">or</td><td class="px-4 py-2 border border-slate-200 text-blue-700">or</td></tr>
          <tr><td class="px-4 py-2 border border-slate-200">逻辑非</td><td class="px-4 py-2 border border-slate-200">!</td><td class="px-4 py-2 border border-slate-200">not</td><td class="px-4 py-2 border border-slate-200 text-blue-700">not</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>关键差异：除法！</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>这是最容易踩坑的点。</strong>GDScript 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">/</code> 行为取决于操作数类型：</p>
        <div class="mb-4"><Code language="gdscript" :code="divisionCode" title="division.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 和 Python 的 Key 差异：</strong>Python 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">3 / 2</code> 得到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">1.5</code>（总是浮点）。GDScript 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">3 / 2</code>（两个 int）得到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">1</code>（截断！）。想得到浮点结果，至少一个操作数是 float。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>赋值运算符与自增/自减</h2>
        <div class="mb-4"><Code language="gdscript" :code="assignCode" title="assignment.gd" /></div>
        <p class="text-slate-600 text-sm mb-3"><strong>GDScript <span class="text-red-600">没有</span> <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">++</code> 和 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">--</code> 运算符！</strong>这是设计决策——认为自增运算符容易导致可读性问题。用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">x += 1</code> 代替。和 Python 一样。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>运算符优先级</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">从高到低：<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">**</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">-x</code>（一元负）→ <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">* / %</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">+ -</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">&lt; &gt; == !=</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">not</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">and</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">or</code> → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">=</code>。有疑问就加括号。</p>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>三元运算符与 null 合并</h2>
        <div class="mb-4"><Code language="gdscript" :code="ternaryCode" title="ternary.gd" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>除法坑：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">int / int → int（截断）</code>，想要 float 结果就让一个操作数是 float</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>和 Python 几乎一样的运算符，<strong>没有 ++/--</strong></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">and/or/not</code> 小写英文（习惯 TS 的 && || ! 需要适应一天）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>三元：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">a if cond else b</code>（和 Python 一样）</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-2-variables-types" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：变量、常量与数据类型</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-4-arrays-dicts" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：数组与字典 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"速查表"},{id:"sec-2",name:"除法差异"},{id:"sec-3",name:"赋值运算符"},{id:"sec-4",name:"优先级"},{id:"sec-5",name:"三元运算符"},{id:"sec-6",name:"小结"}]
const divisionCode = `# int / int → int（截断！）
var a: int = 3 / 2      # a = 1（不是 1.5！）

# float 参与 → float 结果
var b: float = 3.0 / 2  # b = 1.5
var c: float = 3 / 2.0  # c = 1.5

# 取余
var rem: int = 10 % 3   # rem = 1`
const assignCode = `var x: int = 5
x += 1   # x = 6（没有 x++）
x -= 2   # x = 4
x *= 3   # x = 12
x /= 2   # x = 6（int/int，截断）
# x++   # ❌ 语法错误！GDScript 没有自增运算符`
const ternaryCode = `# 三元：a if cond else b（和 Python 一样）
var msg: String = "alive" if health > 0 else "dead"

# TS: health > 0 ? "alive" : "dead"
# Python: "alive" if health > 0 else "dead"

# null 合并：如果 x 不是 null 则返回 x，否则返回默认值
var name: String = player_name if player_name != null else "Unknown"`
</script>
