<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">数组与字典</h1><p class="text-sm text-slate-500 mt-1">GDScript 的核心集合类型——Array 与 Dictionary</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 三语对照：</strong> TS: <code class="bg-purple-100 px-1 rounded text-xs font-mono">let a: number[] = [1,2]</code> | Python: <code class="bg-purple-100 px-1 rounded text-xs font-mono">a: list[int] = [1,2]</code> | GDScript: <code class="bg-purple-100 px-1 rounded text-xs font-mono">var a: Array[int] = [1,2]</code><br/>TS: <code class="bg-purple-100 px-1 rounded text-xs font-mono">Record&lt;S,n&gt;</code> | Python: <code class="bg-purple-100 px-1 rounded text-xs font-mono">dict[str,int]</code> | GDScript: <code class="bg-purple-100 px-1 rounded text-xs font-mono">var d: Dictionary = {"{}"}</code></p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Array（数组）</h2>
        <div class="mb-4"><Code language="gdscript" :code="arrayCode" title="array.gd" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TS 对应</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">append(v)</td><td class="px-4 py-2 border">末尾追加</td><td class="px-4 py-2 border">push(v)</td></tr><tr><td class="px-4 py-2 border">pop_back()</td><td class="px-4 py-2 border">移除末尾</td><td class="px-4 py-2 border">pop()</td></tr><tr><td class="px-4 py-2 border">insert(i,v)</td><td class="px-4 py-2 border">索引 i 插入</td><td class="px-4 py-2 border">splice(i,0,v)</td></tr><tr><td class="px-4 py-2 border">remove_at(i)</td><td class="px-4 py-2 border">移除索引 i</td><td class="px-4 py-2 border">splice(i,1)</td></tr><tr><td class="px-4 py-2 border">find(v)</td><td class="px-4 py-2 border">查找索引</td><td class="px-4 py-2 border">indexOf(v)</td></tr><tr><td class="px-4 py-2 border">has(v)</td><td class="px-4 py-2 border">是否包含</td><td class="px-4 py-2 border">includes(v)</td></tr><tr><td class="px-4 py-2 border">size()</td><td class="px-4 py-2 border">长度</td><td class="px-4 py-2 border">length</td></tr><tr><td class="px-4 py-2 border">filter(func)</td><td class="px-4 py-2 border">过滤</td><td class="px-4 py-2 border">filter(func)</td></tr><tr><td class="px-4 py-2 border">map(func)</td><td class="px-4 py-2 border">映射</td><td class="px-4 py-2 border">map(func)</td></tr><tr><td class="px-4 py-2 border">reduce(func,init)</td><td class="px-4 py-2 border">归约</td><td class="px-4 py-2 border">reduce(func,init)</td></tr></tbody></table></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 好消息：</strong>Array 有 filter/map/reduce——和 JS 的函数式编程体验几乎一样。比 Python 的 list comprehension 更接近前端习惯。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Dictionary（字典）</h2>
        <div class="mb-4"><Code language="gdscript" :code="dictCode" title="dictionary.gd" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Packed 数组</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">元素类型固定时用 Packed 数组可大幅降低内存。常用于顶点数据、网络传输。</p>
        <div class="mb-4"><Code language="gdscript" :code="packedCode" title="packed_array.gd" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Array[T]</code>——强类型数组，有 filter/map/reduce</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Dictionary</code>——键值对，用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">.get(key, default)</code> 安全取值</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>遍历：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">for item in array:</code>（和 Python 一样）</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-3-operators" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：运算符与表达式</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-5-control-flow" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：控制流 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"Array"},{id:"sec-3",name:"Dictionary"},{id:"sec-4",name:"Packed数组"},{id:"sec-5",name:"小结"}]
const arrayCode = `# === 强类型数组（推荐）===
var scores: Array[int] = [100, 200, 300]
scores.append(400)                  # [100,200,300,400]
var idx: int = scores.find(200)     # 1（未找到返回 -1）
var has_it: bool = scores.has(100)  # true
var len: int = scores.size()        # 4

# === filter / map / reduce（和 JS 一样！）===
var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 150)
var doubled: Array[int] = scores.map(func(s: int) -> int: return s * 2)
var total: int = scores.reduce(func(acc: int, s: int) -> int: return acc + s, 0)

# === 遍历 ===
for score: int in scores:
    print(score)`
const dictCode = `var player: Dictionary = { "name": "Hero", "health": 100 }
var hp: int = player["health"]             # 100（键不存在会报错！）
var hp_safe: int = player.get("health", 0)  # 安全取值，不存在返回 0
var has_key: bool = player.has("name")      # true
player["weapon"] = "sword"                  # 新键直接赋值即添加
player.erase("weapon")                      # 删除
for key: String in player.keys():
    print(key, ": ", player[key])`
const packedCode = `# Packed 数组——内存紧凑，固定元素类型
var bytes: PackedByteArray = [0x48, 0x65]          # 字节数组
var vecs: PackedVector2Array = [Vector2(0,0)]        # 向量数组
# 比普通 Array 省 2-4x 内存，但元素类型不可变`
</script>
