<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📄 .tscn 场景文件格式</h1><p class="text-sm text-slate-500 mt-1">Godot 场景的文本表示——可读、可 diff、可手写</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scenes/player.tscn" label="📝 player.tscn" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>.tscn = Godot 的 HTML</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每次你在 Godot 编辑器里 Ctrl+S 保存场景，Godot 把整个节点树 + 属性 + 脚本引用 + 资源 <strong>序列化成一个文本文件</strong>——这就是 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">.tscn</code>。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>.tscn ≈ .html 文件（描述 DOM 树结构）。场景里的每个 <code class="bg-purple-100 px-1 rounded text-xs font-mono">[node]</code> ≈ 一个 HTML 标签。<code class="bg-purple-100 px-1 rounded text-xs font-mono">[ext_resource]</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;script src="..."&gt;</code>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">[sub_resource]</code> ≈ 内联的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;style&gt;</code>。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">特性</th><th class="px-4 py-2 border font-semibold text-slate-700">.tscn</th><th class="px-4 py-2 border font-semibold text-slate-700">HTML</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border">描述内容</td><td class="px-4 py-2 border">节点树结构</td><td class="px-4 py-2 border">DOM 树结构</td></tr>
          <tr><td class="px-4 py-2 border">层级表示</td><td class="px-4 py-2 border"><code>parent="."</code> 链</td><td class="px-4 py-2 border">标签嵌套</td></tr>
          <tr><td class="px-4 py-2 border">引用外部资源</td><td class="px-4 py-2 border"><code>[ext_resource]</code> + id</td><td class="px-4 py-2 border"><code>&lt;link&gt;</code> / <code>&lt;script src&gt;</code></td></tr>
          <tr><td class="px-4 py-2 border">可读性</td><td class="px-4 py-2 border">✅ 纯文本，git diff 友好</td><td class="px-4 py-2 border">✅ 纯文本</td></tr>
          <tr><td class="px-4 py-2 border">可手写</td><td class="px-4 py-2 border">✅ 可以（Blitz 的 .tscn 都是手写的）</td><td class="px-4 py-2 border">✅ 可以</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>四段式结构</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每个 .tscn 文件由 4 种 section 组成：</p>
        <div class="mb-4"><Code language="text" :code="structureCode" title=".tscn 文件的四段结构" /></div>
        <ol class="space-y-3 mb-4"><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>[gd_scene]</strong> — 文件头。声明格式版本(load_steps=需要加载多少资源, format=3)和唯一 ID(uid)。</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>[ext_resource]</strong> — 外部引用。指向脚本(.gd)、贴图(.png)、其他场景(.tscn)等。<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">id="1_player"</code> 是文件内的别名，后面用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">ExtResource("1_player")</code> 引用。</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>[sub_resource]</strong> — 内联资源。不单独保存文件的资源——如碰撞形状(CircleShape2D)、样式(StyleBoxFlat)。在此定义，在 [node] 中用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">SubResource("id")</code> 引用。</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>[node]</strong> — 节点定义。类型、名称、父节点、属性值全在一行。用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">parent="."</code> 表示属于上一个声明的节点。</div></li></ol>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>实战：读 Blitz 的 player.tscn</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">用任意文本编辑器打开 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">apps/game/blitz/scenes/player.tscn</code>：</p>
        <div class="mb-4"><Code language="text" :code="playerTscn" title="player.tscn — 逐行解析" /></div>
        <p class="text-slate-600 leading-relaxed">这 20 行文件 = 编辑器里看到的完整 Player 场景树。理解这个格式后，你可以<strong>不打开 Godot 就能看懂场景结构</strong>——甚至在 git diff 里快速判断改了什么。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Blitz 的四份 .tscn</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">文件</th><th class="px-4 py-2 border">根节点类型</th><th class="px-4 py-2 border">子节点</th><th class="px-4 py-2 border">引用脚本</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">player.tscn</td><td class="px-4 py-2 border">CharacterBody2D</td><td class="px-4 py-2 border">CollisionShape2D + ParryDetector(Area2D) + Hurtbox(Area2D)</td><td class="px-4 py-2 border">player.gd</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">enemy.tscn</td><td class="px-4 py-2 border">CharacterBody2D</td><td class="px-4 py-2 border">CollisionShape2D + Hitbox(Area2D)</td><td class="px-4 py-2 border">enemy.gd</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">bullet.tscn</td><td class="px-4 py-2 border">Area2D</td><td class="px-4 py-2 border">CollisionShape2D(半径5的圆)</td><td class="px-4 py-2 border">bullet.gd</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">main.tscn</td><td class="px-4 py-2 border">Node2D</td><td class="px-4 py-2 border">(无——关卡在 main.gd 代码中搭建)</td><td class="px-4 py-2 border">main.gd</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>.uid 文件是什么</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每个 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">.gd</code> 脚本旁边都有一个同名的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">.uid</code> 文件。它只包含一个 UUID——Godot 用它在 .tscn 中定位脚本，而不是依赖文件路径。<strong>uid 让脚本可以重命名而不破坏场景引用。</strong></p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ .uid 文件必须提交到 git。</strong>丢了会导致 .tscn 中的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">uid://...</code> 无法解析，Godot 会重新生成新 uid——然后所有引用断裂。</p></aside></section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>.tscn ≈ Godot 的 HTML — 纯文本、可读、可手写、可 diff</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>4 种 section: [gd_scene] 头 / [ext_resource] 外部引用 / [sub_resource] 内联定义 / [node] 节点</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">parent="."</code> 表示父节点=上一个声明的节点（不是嵌套，是链式）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>.uid 文件存 UUID，让脚本重命名后场景引用不丢失——必须提交 git</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-8-project-settings" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：项目设置</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-1-gdscript-intro" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：GDScript 入门 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"四段式结构"},{id:"sec-3",name:"读 player.tscn"},{id:"sec-4",name:"Blitz 的 tscn"},{id:"sec-5",name:".uid 文件"},{id:"sec-6",name:"小结"}]

const structureCode = `; ╔══════════════════════════════════════════╗
; ║  1. [gd_scene] — 文件头                 ║
; ╚══════════════════════════════════════════╝
[gd_scene load_steps=5 format=3 uid="uid://abc123"]

; ╔══════════════════════════════════════════╗
; ║  2. [ext_resource] — 外部引用            ║
; ╚══════════════════════════════════════════╝
[ext_resource type="Script" path="res://scripts/player.gd" id="1_player"]

; ╔══════════════════════════════════════════╗
; ║  3. [sub_resource] — 内联资源            ║
; ╚══════════════════════════════════════════╝
[sub_resource type="CircleShape2D" id="circle1"]
radius = 15.0

; ╔══════════════════════════════════════════╗
; ║  4. [node] — 节点树（用 parent 链层级）   ║
; ╚══════════════════════════════════════════╝
[node name="Player" type="CharacterBody2D"]
script = ExtResource("1_player")          ; 引用上面的脚本

[node name="CollisionShape2D" type="CollisionShape2D" parent="."]
shape = SubResource("circle1")            ; 引用上面的形状`

const playerTscn = `[gd_scene load_steps=5 format=3 uid="uid://cuphead_player"]
; ↑ load_steps=5: 需要加载 5 个资源
;   = 1个 ext_resource(脚本) + 3个 sub_resource(形状) + 场景本身

[ext_resource type="Script" path="res://scripts/player.gd" id="1_player"]
; ↑ 告诉 Godot "等会用到 player.gd，给它编号 1_player"

[sub_resource type="CircleShape2D" id="player_col"]
radius = 15.0
; ↑ 定义一个圆形碰撞形状(半径15)，编号 player_col
;   （不会创建独立文件，只是 tscn 内部引用）

[sub_resource type="CircleShape2D" id="parry_col"]
radius = 42.0
; ↑ 格挡检测区，大很多(r=42) —— 所以更容易触发格挡

[sub_resource type="CircleShape2D" id="hurtbox_col"]
radius = 17.0
; ↑ 受击判定区，比身体(r=15)稍大 —— 给玩家一点容错

; === 节点树开始 ===

[node name="Player" type="CharacterBody2D"]
z_index = 10                                ; 渲染层级
script = ExtResource("1_player")            ; 关联 player.gd

[node name="CollisionShape2D" type="CollisionShape2D" parent="."]
;  ↑ parent="." = 父节点是上一个 [node](即 Player)
shape = SubResource("player_col")           ; 使用上面定义的圆形

[node name="ParryDetector" type="Area2D" parent="."]
;  ↑ 父节点仍然是 Player (因为没声明新的顶级 node)
;  这个 Area2D 负责检测粉色格挡对象

[node name="CollisionShape2D" type="CollisionShape2D" parent="ParryDetector"]
;  ↑ parent="ParryDetector": 父节点变为 ParryDetector
shape = SubResource("parry_col")

[node name="Hurtbox" type="Area2D" parent="."]
;  ↑ parent=".": 父节点回到 Player (上一个平级节点是 ParryDetector)
;  看似 parent="." 的父级是 Player，因为 [node ParryDetector] 和这个是平级

[node name="CollisionShape2D" type="CollisionShape2D" parent="Hurtbox"]
shape = SubResource("hurtbox_col")
; ↑ 编辑器里看到的:
;   Player
;   ├── CollisionShape2D (r=15)
;   ├── ParryDetector (Area2D)
;   │   └── CollisionShape2D (r=42)
;   └── Hurtbox (Area2D)
;       └── CollisionShape2D (r=17)`
</script>
