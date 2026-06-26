<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🐛 调试基础</h1><p class="text-sm text-slate-500 mt-1">print() / 断点 / Output 面板 / Remote Scene — Godot 调试三板斧</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>三板斧</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">方法</th><th class="px-4 py-2 border">用途</th><th class="px-4 py-2 border">快捷键</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">print(x)</td><td class="px-4 py-2 border">最常用的调试方式。打印到 Output 面板。</td><td class="px-4 py-2 border">—</td></tr>
          <tr><td class="px-4 py-2 border">断点 (Breakpoint)</td><td class="px-4 py-2 border">代码行号左边点一下,运行到这就暂停。</td><td class="px-4 py-2 border">F9 设断点, F5 运行</td></tr>
          <tr><td class="px-4 py-2 border">Remote Scene</td><td class="px-4 py-2 border">运行时查看场景树+实时属性值。</td><td class="px-4 py-2 border">运行时切到 Scene 面板</td></tr>
        </tbody></table></div></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>print() — 最常用的调试方式</h2>
        <div class="mb-4"><Code language="gdscript" :code="printCode" title="常用 print 模式" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 Blitz 的调试技巧：</strong>在 player.gd 的 take_damage() 里加 <code class="bg-blue-100 px-1 rounded text-xs font-mono">print("HP:", health, " state:", state)</code>，然后故意撞敌人——Output 面板会实时显示血量变化和状态切换。</p></aside></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>90% 的 bug 用 print() 就够了——打印变量值看是不是你期望的。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>断点适合"我就想看这一帧发生了什么"——卡住后单步执行。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Remote Scene 适合"怎么多了/少了一个节点"——看场景树结构。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-6-vs-unity-unreal" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Godot vs Unity vs Unreal</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-8-project-settings" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：项目设置 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"三板斧"},{id:"sec-2",name:"print()"},{id:"sec-3",name:"小结"}]
const printCode = `# 1. 基础打印
print("玩家位置:", position)

# 2. 调试碰撞信号 (贴到 _on_body_entered 里)
func _on_body_entered(body: Node2D) -> void:
    print("子弹命中: ", body.name)  # 输出 "子弹命中: Enemy"

# 3. 每秒打印一次 (降低刷屏)
var _print_timer: float = 0.0
func _process(delta: float) -> void:
    _print_timer -= delta
    if _print_timer <= 0:
        _print_timer = 1.0
        print("FPS:", Engine.get_frames_per_second())

# 4. 打印状态切换 (Blitz 调试技巧)
func _start_dash() -> void:
    state = State.DASHING
    print("→ DASHING (timer=%.2f, cd=%.2f)" % [_dash_timer, _dash_cooldown_timer])`
</script>
