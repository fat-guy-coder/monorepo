<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🤖 状态机模式</h1><p class="text-sm text-slate-500 mt-1">enum + match — 用 GDScript 原生的方式做状态管理，不需要状态机框架</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 7-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>为什么要状态机</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">角色有三个动作——移动、冲刺、受击。如果用一堆 bool 标志：</p>
        <div class="mb-4"><Code language="gdscript" :code="badCode" title="❌ 布尔地狱 (不要这样做)" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">2 个 bool = 4 种组合，3 个 bool = 8 种，4 个 bool = 16 种。而且 "dashing 期间不能 jump，但 hit 期间不能 dash" 这类规则散落在 if 里，修改一个影响其他。</p>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>状态机 = 把"角色在什么状态"作为唯一真相。</strong>同一时间只在一个状态里，每个状态的逻辑独立，状态间转换规则明确。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>≈ React 的 useReducer / Redux。当前状态(state) + 事件(input) → 新状态。≈ 有限状态自动机 (FSM)。其实比前端的状态管理<strong>更简单</strong>——不需要 dispatch、不需要 middleware，只需要 enum + match。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>GDScript 原生实现</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">enum</code> 定义状态名，<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">match</code> 做分支。这是 GDScript 最自然的状态机写法——无需任何框架或设计模式。</p>
        <div class="mb-4"><Code language="gdscript" :code="basicCode" title="基础状态机骨架" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Blitz 玩家四状态机</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">player.gd</code> 实现了 4 个状态 + 清晰的转换规则。打开源码对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd — 四状态机 (精简)" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>状态转换图</h2>
        <div class="mb-4 bg-slate-800 rounded-xl p-6 font-mono text-sm text-green-400 leading-relaxed">
           NORMAL ──按Shift(CD=0)──→ DASHING<br/>
           NORMAL ──受击(hp>0)───→ HIT<br/>
           NORMAL ──hp&lt;=0────────→ DEAD<br/>
           DASHING ──timer到期────→ NORMAL<br/>
           HIT ──落地+硬直结束───→ NORMAL<br/>
           HIT ──hp&lt;=0──────────→ DEAD<br/>
        </div>
        <p class="text-slate-600 text-sm"><strong>关键原则：每个箭头 = 一次固定的赋值。</strong>比如 NORMAL→DASHING 设置了 invincible_timer + dash_timer + dash_cooldown_timer。这些设置在 _start_dash() 中一次性完成，不会散落在 match 分支各处。</p>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>enum + match 就够用了</strong>，不需要抽象状态机框架。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>每个状态有独立的 _process_xxx() 函数，互不干扰。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>状态转换是<strong>显式的</strong>（state = State.XXX），不是隐式的（改三个 bool）。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>别在 match 分支里改另一个状态的数据——用独立函数封装转换逻辑。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-7-gdscript-advanced/godot-7-7-object-pooling" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：对象池</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-7-gdscript-advanced/godot-7-9-event-bus" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：事件总线 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"为什么要状态机"},{id:"sec-2",name:"enum+match实现"},{id:"sec-3",name:"Blitz四状态"},{id:"sec-4",name:"状态转换图"},{id:"sec-5",name:"小结"}]

const badCode = `# ❌ 不要这样写 —— 布尔地狱
var is_dashing: bool = false
var is_hit: bool = false
var is_dead: bool = false

func _physics_process(delta: float) -> void:
    if not is_dead:
        if not is_dashing:
            if not is_hit:
                _handle_move(delta)     # 正常移动
            else:
                _handle_hit(delta)      # 受击硬直
        else:
            _handle_dash(delta)         # 冲刺
    # 问题: 加第五个状态(比如"冰冻")要嵌套第五层 if`

const basicCode = `# ✅ 状态机 —— enum + match
enum State { NORMAL, DASHING, HIT, DEAD }
var state: State = State.NORMAL

func _physics_process(delta: float) -> void:
    match state:
        State.NORMAL:   _process_normal(delta)
        State.DASHING:  _process_dash(delta)
        State.HIT:      _process_hit(delta)
        State.DEAD:     return

func _start_dash() -> void:
    state = State.DASHING
    _dash_timer = dash_duration

func take_damage(amount: int) -> void:
    if state == State.DEAD: return       # 已死,忽略
    health -= amount
    state = State.HIT if health > 0 else State.DEAD
    if state == State.HIT:
        _hit_stun_timer = 0.3
        invincible_timer = invincible_duration`

const blitzCode = `# player.gd — Blitz 玩家四状态机 (完整版见源码)
enum State { NORMAL, DASHING, HIT, DEAD }
var state: State = State.NORMAL

func _physics_process(delta: float) -> void:
    if state == State.DEAD: return
    _update_timers(delta)
    match state:
        State.NORMAL:  _process_normal(delta)
        State.DASHING: _process_dash(delta)
        State.HIT:     _process_hit(delta)
    move_and_slide()

# NORMAL: 移动 + 跳跃 + 冲刺 + 射击 + 格挡,一切正常操作
func _process_normal(delta: float) -> void:
    # 移动 (Input.get_axis)
    # 重力 (velocity.y += gravity * delta)
    # 跳跃 (coyote time + jump buffer)
    # 可变跳跃高度 (松键削减)
    # 冲刺触发 → state = State.DASHING
    # 射击 (按住连发)
    # 格挡 (空中靠近粉色物体)

# DASHING: 短暂无敌 + 水平爆发,忽略重力和输入
func _start_dash() -> void:
    state = State.DASHING
    _dash_timer = dash_duration
    invincible_timer = dash_duration + 0.05
    velocity = Vector2(d * dash_speed, 0.0)

# HIT: 受击硬直,不可操作
func take_damage(amount: int) -> void:
    if invincible_timer > 0.0 or state == State.DEAD: return
    health -= amount
    if health <= 0:
        state = State.DEAD          # 直接死
    else:
        state = State.HIT           # 进入硬直
        invincible_timer = invincible_duration
        velocity = Vector2(-250 * facing_dir, -280)  # 击退`
</script>
