<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔘 Button 家族</h1><p class="text-sm text-slate-500 mt-1">Button / StyleBoxFlat / 动态创建——游戏 UI 的点击交互</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd (死亡UI)" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>Button 核心</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Godot 的 Button 继承自 BaseButton → Control。核心就三样：文字、点击信号、样式。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">text</td><td class="px-4 py-2 border">按钮文字</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">pressed</td><td class="px-4 py-2 border"><strong>Signal</strong> — 点击时发射</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">custom_minimum_size</td><td class="px-4 py-2 border">最小尺寸 (Vector2)，控制按钮大小</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">disabled</td><td class="px-4 py-2 border">灰掉按钮，不可点击</td></tr>
        </tbody></table></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Button ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;button onclick="..."&gt;</code>。pressed 信号 ≈ click 事件。StyleBoxFlat ≈ CSS border/background/border-radius 的合并。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>StyleBoxFlat — 按钮的 CSS</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Godot 没有 CSS，用 <strong>StyleBoxFlat</strong> 控制控件外观。一个按钮至少需要 normal 和 hover 两种样式：</p>
        <div class="mb-4"><Code language="gdscript" :code="styleCode" title="StyleBoxFlat — 圆角 + 背景色 + 边框" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>实战：Blitz 死亡 UI 的 RESTART 按钮</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的死亡画面在代码中动态创建——不依赖 .tscn 文件。这是游戏 UI 中最常见的模式：<strong>运行时构建 UI</strong>。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="main.gd — RESTART 按钮 (完整代码)" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 为什么用代码创建而不用 .tscn？</strong>游戏 UI 经常随状态变化（死亡面板/胜利面板/暂停面板）。代码创建可以复用一个 CanvasLayer，根据状态 show/hide 不同面板。而且不需要在编辑器中来回切换场景。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>完整游戏 UI 示例</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的死亡面板 = 遮罩(半透明黑) + 卡片(圆角+红色边框) + 文字 + 按钮。这是游戏 UI 中标准的 <strong>"覆盖层"模式</strong>。</p>
        <div class="mb-4"><Code language="gdscript" :code="layoutCode" title="覆盖层布局模式" /></div></section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>pressed 信号</strong> 是最重要的 Button API——用它连接游戏逻辑。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>StyleBoxFlat</strong> = 游戏 UI 的 CSS。至少设 normal + hover 两个 stylebox。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>游戏 UI 通常用代码动态创建（不依赖 .tscn），放到 CanvasLayer 上。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>覆盖层 = ColorRect(遮罩) + Panel(卡片) + VBoxContainer(布局) + Button(交互)。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-4-label-richtext" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Label 与 RichText</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-6-lineedit-textedit" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：LineEdit →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Button核心"},{id:"sec-2",name:"StyleBoxFlat"},{id:"sec-3",name:"Blitz实战"},{id:"sec-4",name:"覆盖层布局"},{id:"sec-5",name:"小结"}]

const styleCode = `# StyleBoxFlat — Godot 控件的外观系统
# 约等于 CSS 的 background + border + border-radius

# Normal 状态
var normal: StyleBoxFlat = StyleBoxFlat.new()
normal.bg_color = Color(0.85, 0.15, 0.15, 1.0)  # 红底
normal.corner_radius_top_left     = 8             # 圆角
normal.corner_radius_top_right    = 8
normal.corner_radius_bottom_left  = 8
normal.corner_radius_bottom_right = 8
normal.border_width_left   = 2                    # 边框
normal.border_color = Color.BLACK

# Hover 状态 (鼠标悬停)
var hover: StyleBoxFlat = StyleBoxFlat.new()
hover.bg_color = Color(1.0, 0.25, 0.25, 1.0)     # 稍亮的红色
hover.corner_radius_top_left     = 8
# ... (圆角同 normal)

# 应用到按钮
btn.add_theme_stylebox_override("normal", normal)
btn.add_theme_stylebox_override("hover", hover)

# 常用 StyleBoxFlat 属性:
#   bg_color       — 背景色
#   border_color   — 边框色
#   border_width_* — 四边边框宽度 (left/right/top/bottom)
#   corner_radius_* — 四角圆角
#   content_margin_* — 内边距 (padding)`

const blitzCode = `# main.gd — Blitz 死亡 UI (完整代码节选)
func _make_game_over_panel() -> Control:
    # 1. 全屏半透明遮罩
    var overlay: ColorRect = ColorRect.new()
    overlay.color = Color(0, 0, 0, 0.7)
    overlay.size = Vector2(1280, 720)

    # 2. 居中卡片 (Panel + StyleBoxFlat)
    var card: Panel = Panel.new()
    card.size = Vector2(400, 280)
    card.position = Vector2(440, 180)           # (1280-400)/2

    var card_style: StyleBoxFlat = StyleBoxFlat.new()
    card_style.bg_color = Color(0.08, 0.06, 0.06, 0.97)
    card_style.border_width_left = 3
    card_style.border_width_right = 3
    card_style.border_width_top = 3
    card_style.border_width_bottom = 3
    card_style.border_color = Color(1, 0.15, 0.15, 0.8)
    card_style.corner_radius_top_left = 16
    card_style.corner_radius_top_right = 16
    card_style.corner_radius_bottom_left = 16
    card_style.corner_radius_bottom_right = 16
    card.add_theme_stylebox_override("panel", card_style)

    # 3. VBox 布局
    var vbox: VBoxContainer = VBoxContainer.new()
    vbox.alignment = BoxContainer.ALIGNMENT_CENTER
    card.add_child(vbox)

    # 4. "YOU DIED" 文字
    var title: Label = Label.new()
    title.text = "YOU DIED"
    title.add_theme_font_size_override("font_size", 42)
    title.add_theme_color_override("font_color", Color(1, 0.15, 0.15))
    vbox.add_child(title)

    # 5. RESTART 按钮 (重点是 StyleBoxFlat)
    var btn: Button = Button.new()
    btn.text = "RESTART"
    btn.custom_minimum_size = Vector2(200, 50)
    btn.add_theme_font_size_override("font_size", 20)
    btn.add_theme_color_override("font_color", Color.WHITE)

    var btn_normal: StyleBoxFlat = StyleBoxFlat.new()
    btn_normal.bg_color = Color(0.85, 0.15, 0.15, 1.0)
    btn_normal.corner_radius_top_left = 8
    btn_normal.corner_radius_top_right = 8
    btn_normal.corner_radius_bottom_left = 8
    btn_normal.corner_radius_bottom_right = 8
    btn.add_theme_stylebox_override("normal", btn_normal)

    var btn_hover: StyleBoxFlat = StyleBoxFlat.new()
    btn_hover.bg_color = Color(1.0, 0.25, 0.25, 1.0)
    btn_hover.corner_radius_top_left = 8
    btn_hover.corner_radius_top_right = 8
    btn_hover.corner_radius_bottom_left = 8
    btn_hover.corner_radius_bottom_right = 8
    btn.add_theme_stylebox_override("hover", btn_hover)

    # 6. 连接信号 — 点按钮 = 重新加载场景
    btn.pressed.connect(func(): get_tree().reload_current_scene())
    vbox.add_child(btn)

    overlay.add_child(card)
    return overlay`

const layoutCode = `# 游戏 UI 覆盖层标准布局模式
#
# CanvasLayer (layer=100, 保证在最上层)
# └── ColorRect (全屏半透明遮罩)
#     └── Panel (居中卡片, StyleBoxFlat 圆角+边框)
#         └── VBoxContainer (垂直居中布局)
#             ├── Label ("YOU DIED", font_size=42)
#             ├── Control (spacer, 10px)
#             ├── Label ("Score: 250", font_size=20)
#             ├── Control (spacer, 24px)
#             ├── Button ("RESTART", min_size=200x50)
#             └── Label ("or press R", font_size=13)
#
# 这个模式可用于: 死亡/胜利/暂停/设置 任何覆盖层面板`
</script>
