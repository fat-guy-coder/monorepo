<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">字符串格式化与正则</h1>
          <p class="text-sm text-slate-500 mt-1">String 操作——格式化、拼接、正则匹配</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-13</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>格式化对照</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">\`Hello ${"{"}name{"}"}\`</code>（模板字符串）| <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">f"Hello {"{"}name{"}"}"</code>（f-string）| <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">"Hello %s" % name</code>（% 格式化）或 <code class="bg-purple-100 px-1 rounded text-xs font-mono">"Hello {"{"}name{"}"}".format({"{"}name{"}"})</code></p>
        </aside>
        <p class="text-slate-600 mb-3 leading-relaxed">GDScript <strong>没有模板字符串</strong>（没有 f-string 或 `` 插值）。用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">%</code> 或 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">.format()</code>。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>代码示例</h2>
        <div class="mb-4"><Code language="gdscript" :code="strCode" title="string_formatting.gd" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3 mt-5">占位符与宽度控制</h3>
        <div class="mb-4"><Code language="gdscript" :code="strPadCode" title="format_specifiers.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>常用 String 方法</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr><td class="px-4 py-2 border">to_int() / to_float()</td><td class="px-4 py-2 border">转数字</td></tr>
              <tr><td class="px-4 py-2 border">to_lower() / to_upper()</td><td class="px-4 py-2 border">大小写转换</td></tr>
              <tr><td class="px-4 py-2 border">contains(s) / begins_with(s) / ends_with(s)</td><td class="px-4 py-2 border">包含/开头/结尾判断</td></tr>
              <tr><td class="px-4 py-2 border">replace(a, b) / replacen(a, b)</td><td class="px-4 py-2 border">替换（区分/不区分大小写）</td></tr>
              <tr><td class="px-4 py-2 border">split(delim) / join(arr)</td><td class="px-4 py-2 border">分割/连接</td></tr>
              <tr><td class="px-4 py-2 border">strip_edges() / lstrip() / rstrip()</td><td class="px-4 py-2 border">去除空白</td></tr>
              <tr><td class="px-4 py-2 border">substr(start, len)</td><td class="px-4 py-2 border">截取子串</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这些方法和 JS/Python 一一对应：<code class="bg-purple-100 px-1 rounded text-xs font-mono">split</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">String.prototype.split</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">join</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array.prototype.join</code>，<code class="bg-purple-100 px-1 rounded text-xs font-mono">strip_edges</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">trim()</code>。<strong>名字不同，心智模型一样。</strong></p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>RegEx——正则表达式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">GDScript 内置 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">RegEx</code> 类。创建→编译→搜索→提取。</p>
        <div class="mb-4"><Code language="gdscript" :code="regexCode" title="regex.gd" /></div>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 项目中的 % 格式化</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的 HUD 用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">"%d" % value</code> 拼分数、死亡面板拼最终得分——这是 % 格式化在游戏 UI 里的最典型用法。打开 main.gd 对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzStrCode" title="main.gd 中的 % 格式化（精简）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么游戏 UI 爱用 % 而不是拼接？</strong><code class="bg-emerald-100 px-1 rounded text-xs font-mono">"⭐ " + score</code> 可以工作，但 int 自动转 String 容易埋坑（比如精确度、前缀补零）；<code class="bg-emerald-100 px-1 rounded text-xs font-mono">"%d" % score</code> 明确声明「这是整数」，还要拼接符号（+/-）时也更直观。分数、计时、血量这些 HUD 文本，格式化是首选。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. 占位符数量与参数不匹配 → 报错：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"%s %s" % "Hi"</code> 只给了一个参数会报 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">not enough arguments for format string</code>。多个参数用<strong>数组</strong>：<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"%s %s" % ["Hi", 5]</code>。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. %d 传了 float → 报错：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"%d" % 3.7</code> 会报错（%d 只要 int）。浮点用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">%f</code> / <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">%.2f</code>，或先 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">int(3.7)</code> 转换。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. RegEx 反斜杠双重转义地狱：</strong>GDScript 字符串里 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"\\d"</code> 才是正则的 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">\d</code>（匹配数字）；写单个 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">"\d"</code> 是转义字母 d。正则越复杂越难读——<strong>先单独调试 pattern 再嵌进代码</strong>。</div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>% 格式化</strong>（轻量，多参数用数组）和 <strong>.format()</strong>（可读性更好）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有模板字符串/f-string</strong>，别想着用反引号</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>占位符：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">%s</code>/<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">%d</code>/<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">%f</code>/<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">%.2f</code>，支持宽度与补零 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">%05d</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>字符串方法丰富（split/join/replace/strip等），和 JS/Python 接近</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>RegEx 类 = <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">new→compile→search→get_string</code>，注意反斜杠双重转义</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-12-null-safety" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：null 安全</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-1-node-lifecycle" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：节点生命周期 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "格式化对照" },
  { id: "sec-2", name: "代码示例" },
  { id: "sec-3", name: "String 方法" },
  { id: "sec-4", name: "RegEx" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "小结" },
]

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

const strPadCode = `# 数字补零 / 对齐（% 的宽度控制）
var pad: String = "%05d" % 42            # "00042"（5 位补零）
var align: String = "%8s|" % "hi"        # "      hi|"（右对齐 8 宽）

# 转义百分号：%% 输出一个字面的 %
var pct: String = "进度: %d%%" % 50      # "进度: 50%"

# .format() 的位置索引 / 命名键两种写法
var pos: String = "score: {1} - name: {0}".format(["Alice", 99])
# "score: 99 - name: Alice"
var named: String = "x = {x}, y = {y}".format({"x": 1, "y": 2})
# "x = 1, y = 2"`

const regexCode = `# RegEx ——创建→编译→搜索
var regex: RegEx = RegEx.new()
regex.compile("\\\\d+")  # \\\\d = 正则的 \d（匹配数字）
var result: RegExMatch = regex.search("score: 100")
if result:
    print(result.get_string())  # "100"
# 全局搜索
var matches: Array[RegExMatch] = regex.search_all("a1 b22 c333")
for m: RegExMatch in matches: print(m.get_string())  # 1, 22, 333`

const blitzStrCode = `# === main.gd — HUD 分数、死亡面板的 % 格式化 ===
var score: int = 0

func _process(_delta: float) -> void:
    # "%d" 把 int 格式化进字符串 —— 比拼接更清晰
    _score_label.text = "⭐ %d" % score

func add_score(amount: int) -> void:
    score += amount
    _pop_score_text(amount)

# 分数弹出动画：正号自动保留
func _pop_score_text(amount: int, at_pos: Vector2 = Vector2.ZERO) -> void:
    var label: Label = Label.new()
    label.text = "+%d" % amount      # "+100"
    add_child(label)

# 游戏结束时写最终分数
var sl: Label = _game_over_panel.get_meta("score_label") as Label
if sl:
    sl.text = "Score: %d" % score

# 胜利面板
var sl2: Label = win.get_meta("score_label") as Label
if sl2:
    sl2.text = "最终得分: ⭐ %d" % score`
</script>
