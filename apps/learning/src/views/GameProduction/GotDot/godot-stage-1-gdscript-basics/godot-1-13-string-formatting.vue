<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">字符串格式化与正则</h1><p class="text-sm text-slate-500 mt-1">String 操作——格式化、拼接、正则匹配</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-13</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>格式化对照</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">\`Hello ${"{"}name{"}"}\`</code>（模板字符串）| <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">f"Hello {"{"}name{"}"}"</code>（f-string）| <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">"Hello %s" % name</code>（% 格式化）或 <code class="bg-purple-100 px-1 rounded text-xs font-mono">"Hello {"{"}name{"}"}".format({"{"}name{"}"})</code></p></aside>
<p class="text-slate-600 mb-3 leading-relaxed">GDScript <strong>没有模板字符串</strong>（没有 f-string 或 `` 插值）。用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">%</code> 或 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">.format()</code>。</p></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>代码示例</h2><div class="mb-4"><Code language="gdscript" :code="strCode" title="string_formatting.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>常用 String 方法</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">to_int() / to_float()</td><td class="px-4 py-2 border">转数字</td></tr><tr><td class="px-4 py-2 border">to_lower() / to_upper()</td><td class="px-4 py-2 border">大小写转换</td></tr><tr><td class="px-4 py-2 border">contains(s) / begins_with(s) / ends_with(s)</td><td class="px-4 py-2 border">包含/开头/结尾判断</td></tr><tr><td class="px-4 py-2 border">replace(a, b) / replacen(a, b)</td><td class="px-4 py-2 border">替换（区分/不区分大小写）</td></tr><tr><td class="px-4 py-2 border">split(delim) / join(arr)</td><td class="px-4 py-2 border">分割/连接</td></tr><tr><td class="px-4 py-2 border">strip_edges() / lstrip() / rstrip()</td><td class="px-4 py-2 border">去除空白</td></tr><tr><td class="px-4 py-2 border">substr(start, len)</td><td class="px-4 py-2 border">截取子串</td></tr></tbody></table></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>RegEx——正则表达式</h2><p class="text-slate-600 mb-3 leading-relaxed">GDScript 内置 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">RegEx</code> 类。创建→编译→搜索→提取。</p><div class="mb-4"><Code language="gdscript" :code="regexCode" title="regex.gd" /></div></section>
<section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>% 格式化</strong>（轻量）和 <strong>.format()</strong>（可读性更好）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有模板字符串/f-string</strong></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>字符串方法丰富（split/join/replace/strip等），和 JS/Python 接近</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>RegEx 类 = <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">new→compile→search→get_string</code></span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-12-null-safety" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：null 安全</RouterLink><span class="text-slate-300">阶段 1 完成！下一阶段：节点系统详解 →</span></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"格式化对照"},{id:"sec-2",name:"代码示例"},{id:"sec-3",name:"String 方法"},{id:"sec-4",name:"RegEx"},{id:"sec-5",name:"小结"}]
const strCode = `# % 格式化（最常用，类似 Python 的 %）
var msg: String = "Hello %s, score: %d" % ["Player", 100]
# "Hello Player, score: 100"

# 常用占位符: %s=字符串, %d=整数, %f=浮点, %.2f=两位浮点
var pi_str: String = "Pi = %.2f" % 3.14159  # "Pi = 3.14"

# .format() 方法（可读性更好）
var msg2: String = "Hello {name}, score: {score}".format({"name": "Player", "score": 100})

# 字符串拼接
var s: String = "Hello " + "World"  # "Hello World"
# 多行字符串
var poem: String = """第一行
第二行
第三行"""  # 保留换行`
const regexCode = `# RegEx ——创建→编译→搜索
var regex: RegEx = RegEx.new()
regex.compile("\\\\d+")  # \\\\d = 正则的 \d（匹配数字）
var result: RegExMatch = regex.search("score: 100")
if result:
    print(result.get_string())  # "100"
# 全局搜索
var matches: Array[RegExMatch] = regex.search_all("a1 b22 c333")
for m: RegExMatch in matches: print(m.get_string())  # 1, 22, 333`
</script>
