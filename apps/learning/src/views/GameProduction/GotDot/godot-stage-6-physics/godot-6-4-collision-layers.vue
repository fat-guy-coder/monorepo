<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🎭 碰撞层与遮罩</h1><p class="text-sm text-slate-500 mt-1">collision_layer / collision_mask — 用 bit 位精确控制"谁能碰到谁"</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 6-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>layer = "我是谁", mask = "我关心谁"</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Godot 用 <strong>20 个 bit 位</strong> 控制碰撞关系。每个节点有 layer（我属于哪些层）和 mask（我检测哪些层）。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 记忆技巧：</strong>layer 像身份证——"我是谁"。mask 像关注列表——"我关心谁"。A 检测到 B 的条件：<strong>A.mask 包含 B 的某一位 AND B.layer 包含那一位。</strong></p></aside>
        <div class="mb-4"><Code language="gdscript" :code="basicCode" title="基本用法" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Blitz 的 6 层系统</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 项目用 6 个 bit 位划分了整个游戏的碰撞关系。这是设计碰撞层时<strong>最重要的步骤——先画表，再写代码</strong>：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">Bit</th><th class="px-4 py-2 border font-semibold text-slate-700">值</th><th class="px-4 py-2 border font-semibold text-slate-700">名称</th><th class="px-4 py-2 border font-semibold text-slate-700">哪些节点用</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono">0</td><td class="px-4 py-2 border font-mono">1</td><td class="px-4 py-2 border">玩家身体</td><td class="px-4 py-2 border">Player (CharacterBody2D)</td></tr>
          <tr><td class="px-4 py-2 border font-mono">1</td><td class="px-4 py-2 border font-mono">2</td><td class="px-4 py-2 border">敌人身体</td><td class="px-4 py-2 border">Enemy (CharacterBody2D), Hitbox (Area2D)</td></tr>
          <tr><td class="px-4 py-2 border font-mono">2</td><td class="px-4 py-2 border font-mono">4</td><td class="px-4 py-2 border">玩家子弹</td><td class="px-4 py-2 border">Bullet (Area2D)</td></tr>
          <tr><td class="px-4 py-2 border font-mono">3</td><td class="px-4 py-2 border font-mono">8</td><td class="px-4 py-2 border">(预留)</td><td class="px-4 py-2 border">敌弹/道具/...</td></tr>
          <tr><td class="px-4 py-2 border font-mono">4</td><td class="px-4 py-2 border font-mono">16</td><td class="px-4 py-2 border">墙壁/平台</td><td class="px-4 py-2 border">Ground, Platform (StaticBody2D)</td></tr>
          <tr><td class="px-4 py-2 border font-mono">5</td><td class="px-4 py-2 border font-mono">32</td><td class="px-4 py-2 border">格挡对象</td><td class="px-4 py-2 border">ParryObject (Area2D)</td></tr>
          <tr><td class="px-4 py-2 border font-mono">6</td><td class="px-4 py-2 border font-mono">64</td><td class="px-4 py-2 border">终点</td><td class="px-4 py-2 border">Goal (Area2D)</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>交互矩阵 — 谁检测谁</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">节点</th><th class="px-4 py-2 border font-semibold text-slate-700">layer (我是谁)</th><th class="px-4 py-2 border font-semibold text-slate-700">mask (我关心谁)</th><th class="px-4 py-2 border font-semibold text-slate-700">结果</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-medium">Player</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;0 = 1</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;4 = 16</td><td class="px-4 py-2 border">只跟墙壁碰撞(站在平台上)</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Player→Hurtbox</td><td class="px-4 py-2 border font-mono text-xs">0</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;1 = 2</td><td class="px-4 py-2 border">检测敌人身体(受击)</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Player→ParryDetector</td><td class="px-4 py-2 border font-mono text-xs">0</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;5 = 32</td><td class="px-4 py-2 border">检测格挡对象</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Enemy</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;1 = 2</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;4 = 16</td><td class="px-4 py-2 border">只跟墙壁碰撞(站在平台上)</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Enemy→Hitbox</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;1 = 2</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;2 = 4</td><td class="px-4 py-2 border">检测玩家子弹(被击中)</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Bullet</td><td class="px-4 py-2 border font-mono text-xs">1&lt;&lt;2 = 4</td><td class="px-4 py-2 border font-mono text-xs">(1&lt;&lt;1)|(1&lt;&lt;4)=18</td><td class="px-4 py-2 border">检测敌人+墙壁(命中/撞墙消失)</td></tr>
        </tbody></table></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 关键洞察：</strong>Player 的 mask 只有墙壁(bit4),<strong>没有</strong>敌人(bit1)。所以玩家和敌人不会物理碰撞——它们可以重叠穿过去。受击检测由 Hurtbox(Area2D 子节点)单独处理。这就是 "用 Area2D 解耦物理碰撞和受击判定" 的核心思想。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>为什么 Enemy→Hitbox 的 layer=bit1 而不是 bit0</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这是 Blitz 的碰撞设计中最关键的一个决策。看子弹的 mask：</p>
        <div class="mb-4"><Code language="gdscript" :code="whyCode" title="子弹 mask = bit1(敌人)+bit4(墙壁)" /></div></section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>设计步骤 (做新游戏时照这个来)</h2>
        <ol class="space-y-3 mb-4"><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>列出所有需要碰撞交互的东西：</strong>玩家、敌人、玩家子弹、敌弹、墙壁、道具、感应区……</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>分组：</strong>把"对碰撞行为有不同需求"的分为不同 bit。比如玩家和敌人不能共用 bit（因为它们的 mask 不同）。</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>画矩阵：</strong>做一张"谁检测谁"的表格（跟上面一样），确保每个交叉点都有合理的理由。</div></li><li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>写成一个 const 注释块</strong>放在主脚本顶部，所有子脚本引用它。Blitz 把这个注释写在 main.gd 顶部。</div></li></ol>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>layer = 我是谁，mask = 我关心谁。用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">1 &lt;&lt; N</code> 设置。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>先设计再写代码。</strong>bit 分配写在脚本顶部注释里，所有文件保持一致。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Area2D 的 layer 可以跟父节点不同（如 Hitbox 设为 bit1，和敌人身体同层）。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>CharacterBody2D 的 mask 只放 platform/wall，受击检测交 Area2D 子节点。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-3-raycast2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：RayCast2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-5-characterbody-deep" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：CharacterBody 深入 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"layer vs mask"},{id:"sec-2",name:"Blitz 6层系统"},{id:"sec-3",name:"交互矩阵"},{id:"sec-4",name:"Hitbox layer设计"},{id:"sec-5",name:"设计步骤"},{id:"sec-6",name:"小结"}]

const basicCode = `# 每个数字 = 一个 bit 位 (2^N)
collision_layer = 0
collision_layer |= (1 << 0)   # bit 0 = 1   = 玩家
collision_layer |= (1 << 2)   # bit 2 = 4   = 玩家子弹

collision_mask = 0
collision_mask  |= (1 << 1)   # bit 1 = 2   = 检测敌人
collision_mask  |= (1 << 4)   # bit 4 = 16  = 检测墙壁

# 等价于:
collision_layer = 1 | 4          # = 5
collision_mask  = 2 | 16         # = 18

# 推荐用 1<<N 写法(可读性更好),不用 5/18 这种魔法数字`

const whyCode = `# 子弹的 collision_mask:
collision_mask |= (1 << 1)   # 检测 bit1(敌人)
collision_mask |= (1 << 4)   # 检测 bit4(墙壁)

# 子弹的 body_entered: 检测 CharacterBody2D 在 bit1 上的物体
# → 敌人身体(layer=bit1) ✅ 被检测到
#
# 子弹的 area_entered: 检测 Area2D 在 bit1 上的物体
# → 敌人 Hitbox 的 layer 如果=0 → ❌ 检测不到!
# → 敌人 Hitbox 的 layer 设为 bit1 → ✅ 被检测到!
#
# 所以: Hitbox.collision_layer = 1<<1 (跟敌人身体同层)
# 这样子弹的 mask(bit1) 在 body_entered 和 area_entered 都能命中`
</script>
