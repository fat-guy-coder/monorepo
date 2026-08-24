<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🐛 调试基础</h1>
          <p class="text-sm text-slate-500 mt-1">print() / 断点 / Output 面板 / Remote Scene — Godot 调试三板斧</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-7</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>三板斧</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">print()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">console.log()</code>；<strong>断点</strong> ≈ DevTools Sources 里的 breakpoint + Step；<strong>Remote Scene</strong> ≈ React DevTools 的组件树（实时看每个节点的属性值）。Godot 的调试心智模型和前端完全一致——只是面板位置不同。</p>
        </aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border">方法</th>
                <th class="px-4 py-2 border">用途</th>
                <th class="px-4 py-2 border">快捷键</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">print(x)</td><td class="px-4 py-2 border">最常用的调试方式。打印到 Output 面板。</td><td class="px-4 py-2 border">—</td></tr>
              <tr><td class="px-4 py-2 border">断点 (Breakpoint)</td><td class="px-4 py-2 border">代码行号左边点一下，运行到这就暂停。</td><td class="px-4 py-2 border">F9 设断点，F5 运行</td></tr>
              <tr><td class="px-4 py-2 border">Remote Scene</td><td class="px-4 py-2 border">运行时查看场景树+实时属性值。</td><td class="px-4 py-2 border">运行时切到 Scene 面板</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>print() — 最常用的调试方式</h2>
        <div class="mb-4"><Code language="gdscript" :code="printCode" title="常用 print 模式" /></div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><strong>print() 的三个进阶用法：</strong></p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">push_warning()</code> / <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">push_error()</code> — 在 Output 里以黄/红色显示，错误排查一目了然。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">print_rich()</code> — 支持 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">[b][color]</code> BBCode 着色，刷屏时高亮关键行。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">print_tree()</code> / <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">get_path()</code> — 打印节点树或节点路径，排查"节点在哪"。</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 Blitz 调试技巧：</strong>在 player.gd 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">take_damage()</code> 里加 <code class="bg-blue-100 px-1 rounded text-xs font-mono">print("HP:", health, " state:", state)</code>，然后故意撞敌人——Output 面板会实时显示血量变化和状态切换。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>断点（Breakpoint）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">点击代码行号左侧 → 出现红色圆点 = 断点。按 <strong>F5</strong> 运行，执行到该行就<strong>暂停游戏</strong>。此时可以：</p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Step Over (F6)</strong> — 执行当前行，跳到下一行。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Step Into (F7)</strong> — 进入函数内部。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Step Out (F8)</strong> — 跳出当前函数。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Debugger 面板的 Variables/Stack</strong> — 看当前所有变量值和调用栈。</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="breakpointCode" title="断点调试目标示例" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：</strong>断点暂停 ≈ 在 React DevTools 里给组件 set 一个 <code class="bg-purple-100 px-1 rounded text-xs font-mono">debugger</code> 语句。game loop 每次执行都会经过 <code class="bg-purple-100 px-1 rounded text-xs font-mono">_physics_process</code>，所以断点常设在<strong>状态切换的那一行</strong>（比如 <code class="bg-purple-100 px-1 rounded text-xs font-mono">state = State.DASHING</code>），看它到底有没有被触发。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Remote Scene — 运行时看场景树</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">游戏运行时，Scene 面板切换为 <strong>Remote</strong> 模式，显示<strong>运行中真实的场景树</strong>。选中任意节点 → Inspector 显示<strong>实时属性值</strong>。适合排查：</p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>"节点是不是多了/少了？" — 看运行时树 vs 编辑器树。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>"这个节点的 position 到底在哪？" — 直接看 Inspector 里的实时数值。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>"碰撞体为什么没生效？" — 勾选 Debug → Visible Collision Shapes，运行时直接画出所有碰撞体。</span></li>
        </ul>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 快查：</strong>菜单 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Debug → Visible Collision Shapes</code>（碰撞体可视化）和 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Visible Navigation</code>，是排查物理问题的两个开关。</p>
        </aside>
      </section>

      <!-- 实战：Blitz -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：调试 Blitz 的受击系统</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">场景："玩家撞敌人不掉血，也不闪烁"。打开 <strong>player.gd</strong> 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">take_damage()</code>——真实代码长这样，它有两个"提前 return"的隐藏分支：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzTakeDamageCode" title="blitz/scripts/player.gd — take_damage（真实代码）" /></div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">调试三步走（每一步都对应一个真 bug 的典型原因）：</p>
        <div class="space-y-3 mb-4">
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>1️⃣ 打印第一行是否被调用。</strong>在函数第一行加 <code class="bg-blue-100 px-1 rounded text-xs font-mono">print("take_damage called, invincible=", invincible_timer)</code>。如果没打印 → 根本没触发（信号没连上 / 碰撞层没匹配）。如果打印了 → 进入第 2 步。</p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>2️⃣ 检查是不是"无敌中"被拦下。</strong>第一行 <code class="bg-blue-100 px-1 rounded text-xs font-mono">if invincible_timer &gt; 0.0 ... return</code> ——受击后有 1.5s 无敌，撞太快会被这里拦掉。<strong>这不是 bug，是设计</strong>，但经常被误报。</p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>3️⃣ 用断点看 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_on_hurtbox_body_entered</code>。</strong>在 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_on_hurtbox_body_entered(body)</code> 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">take_damage(1)</code> 行打断点，看 <code class="bg-blue-100 px-1 rounded text-xs font-mono">body</code> 是不是敌人——不是敌人（比如撞上了墙）就说明 hurtbox 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">collision_mask</code> 配错了。</p>
          </aside>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 反哺：</strong>这套"先确认被调用 → 再查被拦条件 → 再断点看参数"的排查顺序，和前端查"点击事件没触发 / 被 preventDefault 拦了 / 参数不对"完全同构。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 1：在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_process</code> 里每帧 print。</strong><br/>60fps = 每秒刷 60 行，根本看不清。要么用计时器每 1 秒打一次，要么只在状态切换时打（<code class="bg-amber-100 px-1 rounded text-xs font-mono">if new_state != state: print(...)</code>）。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 2：断点设在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_physics_process</code> 第一行。</strong><br/>每帧都会停，几乎没法继续。把断点设在<strong>你要确认的那一行</strong>（如状态切换、信号回调内部），并善用<strong>条件断点</strong>（右键断点 → Condition，如 <code class="bg-amber-100 px-1 rounded text-xs font-mono">health == 1</code>）。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 3：F5 运行后改代码，忘了重新运行。</strong><br/>游戏运行时改动<strong>不会热更新</strong>到正在跑的游戏实例。按 F5 或 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Ctrl+Shift+F5</code> 重启游戏，改的代码才会生效。</p>
          </aside>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>90% 的 bug 用 print() 就够了——打印变量值看是不是你期望的。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>断点适合"我就想看这一帧发生了什么"——卡住后单步执行。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Remote Scene 适合"怎么多了/少了一个节点"——看场景树结构。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>排查顺序：先确认被调用 → 再查被拦条件 → 再断点看参数。</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-6-vs-unity-unreal" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Godot vs Unity vs Unreal</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-8-project-settings" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：项目设置 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [
  { id: "sec-1", name: "三板斧" },
  { id: "sec-2", name: "print()" },
  { id: "sec-3", name: "断点" },
  { id: "sec-4", name: "Remote Scene" },
  { id: "sec-5", name: "🕹️ 实战：Blitz" },
  { id: "sec-6", name: "⚠️ 常见错误" },
  { id: "sec-7", name: "📋 小结" },
]
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

# 4. 错误与警告分级显示 (Output 面板里颜色区分)
push_warning("这个分支不该走到")  # 黄色警告
push_error("这里出错了!")         # 红色错误`
const breakpointCode = `# 断点首选目标：状态切换处
func _start_dash() -> void:
    state = State.DASHING          # ← 在这里点行号设断点 (F9)
    _dash_timer = dash_duration
    _dash_cooldown_timer = dash_cooldown
    invincible_timer = dash_duration + 0.05
    var d: float = 1.0 if facing_right else -1.0
    velocity = Vector2(d * dash_speed, 0.0)

# 条件断点示例：health == 1 时才暂停
func take_damage(amount: int = 1) -> void:
    if invincible_timer > 0.0 or state == State.DEAD:
        return
    health -= amount               # ← 右键设条件断点 health == 1`
const blitzTakeDamageCode = `# blitz/scripts/player.gd — take_damage（真实代码）
# 第 1 行就有"提前 return"，是调试点
func take_damage(amount: int = 1) -> void:
	if invincible_timer > 0.0 or state == State.DEAD:
		return            # ← 无敌中/已死亡: 直接忽略

	health -= amount
	if health <= 0:
		_die()
	else:
		state = State.HIT
		invincible_timer = invincible_duration
		_hit_stun_timer = 0.3
		# 击退 (向面朝的反方向弹开)
		var kb_dir: float = -1.0 if facing_right else 1.0
		velocity = Vector2(kb_dir * 250.0, -280.0)`
</script>
