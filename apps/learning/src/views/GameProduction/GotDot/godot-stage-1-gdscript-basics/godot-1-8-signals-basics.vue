<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">信号（Signal）基础</h1><p class="text-sm text-slate-500 mt-1">声明 / 连接 / 发射——Godot 的观察者模式</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-8</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📡</span>信号 = 观察者模式</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">emitter.on('event', handler)</code>（Node.js EventEmitter）| <strong>Vue:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">$emit('event', data)</code> | <strong>DOM:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">element.addEventListener('click', handler)</code><br/><strong>GDScript Signal:</strong> 声明→连接→发射 三步走。信号是 Godot 中<strong>节点间松耦合通信</strong>的核心机制。</p></aside></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>三步走：声明→连接→发射</h2><div class="mb-4"><Code language="gdscript" :code="signalCode" title="signal.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>带参数的信号</h2><div class="mb-4"><Code language="gdscript" :code="signalArgsCode" title="signal_args.gd" /></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>编辑器连接（无代码）</h2><p class="text-slate-600 mb-3 leading-relaxed">选中节点 → Node 面板（Inspector 旁边）→ 双击信号名 → 选择目标节点和方法 → 自动生成 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_on_xxx</code> 回调函数。编辑器连接适合简单场景，代码连接适合动态实例化的节点。</p></section>

<section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>实战：完整生命值系统</h2>
<p class="text-slate-600 mb-3 leading-relaxed">信号最大的价值在于<strong>解耦</strong>——Player 只负责扣血和发信号，UI 只负责监听和更新。双方互不知道对方的存在。</p>
<div class="mb-4"><Code language="gdscript" :code="healthSystemCode" title="health_system.gd" /></div>
<aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-emerald-800"><strong>✅ 这才是信号的正确用法：</strong>Player <strong>不引用</strong> UI 节点。UI <strong>不引用</strong> Player。<strong>它们只通过信号耦合。</strong>以后替换 UI（比如从 Label 改为 ProgressBar），Player 代码一行不改。</p></aside>
</section>

<section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>信号总线模式（Signal Bus）</h2>
<p class="text-slate-600 mb-3 leading-relaxed">当多个不相关的节点需要通信时（如"玩家死亡→游戏结束→显示分数→停止音乐"），用 <strong>Autoload 单例做全局事件总线</strong>。≈ 前端的 EventBus / Redux middleware。</p>
<div class="mb-4"><Code language="gdscript" :code="signalBusCode" title="global_events.gd" /></div>
<p class="text-slate-600 text-sm">然后在 project.godot 中将此脚本设为 Autoload（名称 GlobalEvents），任何节点都能 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">GlobalEvents.player_died.connect(...)</code> 和 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">GlobalEvents.player_died.emit(data)</code>。</p>
</section>

<section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">6</span>信号作为 Callable 传递</h2>
<p class="text-slate-600 mb-3 leading-relaxed">GDScript 中信号本身是 Callable 对象——可以当参数传递、存储。≈ JS 的回调函数 / Python 的 callable。</p>
<div class="mb-4"><Code language="gdscript" :code="signalAsCallableCode" title="signal_as_callable.gd" /></div>
</section>

<section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎮</span>实战：Blitz 项目中的信号</h2>
<p class="text-slate-600 mb-3 leading-relaxed">Blitz (<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">apps/game/blitz/</code>) 大量使用 <strong>Godot 内置信号</strong> 而非自定义 signal——这是实战中最常见的信号使用方式。打开 bullet.gd / player.gd 对照看：</p>
<div class="mb-4"><Code language="gdscript" :code="blitzSignalsCode" title="Blitz 中的 4 种信号模式" /></div>
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4"><p class="text-sm text-purple-800"><strong>🔗 对比自定义 signal vs 内置信号：</strong>自定义 signal 适合"系统间通信"（如 health_changed → UI 更新）。内置信号（body_entered / area_entered / timeout / pressed）适合"引擎与脚本通信"——这占了游戏代码的 80%。<strong>学会读 Godot 文档里每个节点类型的 Signals 列表，比背 API 更重要。</strong></p></aside>
</section>

<section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">7</span>常见错误</h2>
<div class="space-y-3 text-slate-600 text-sm"><div class="bg-slate-50 rounded-lg p-3"><strong>1. 忘记 disconnect 导致内存泄漏：</strong>动态创建又销毁的节点，如果连接了信号忘记断开，原节点不会被 GC。用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">node.tree_exiting.connect(func(): signal.disconnect(callback))</code> 或直接用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">CONNECT_ONE_SHOT</code> 标志。</div><div class="bg-slate-50 rounded-lg p-3"><strong>2. 发射信号时接收者已被销毁：</strong>connect 时加 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">CONNECT_DEFERRED</code> 标志延迟到空闲帧执行。</div><div class="bg-slate-50 rounded-lg p-3"><strong>3. 循环信号：</strong>A 的信号触发 B，B 的回调又触发 A 的信号 → 无限循环。解决：加 guard 变量。</div></div></section>

<section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>信号三要素：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">signal xxx</code>（声明）→ <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">xxx.connect(callback)</code>（连接）→ <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">xxx.emit(data)</code>（发射）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>≈ EventEmitter.emit / addEventListener / Vue $emit</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>信号可以带参数，类型安全</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>编辑器连接（无代码）vs 代码连接（灵活）</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-7-classes-oop" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：类与面向对象</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-9-enums-constants" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：枚举与常量 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"声明→连接→发射"},{id:"sec-3",name:"带参数信号"},{id:"sec-4",name:"编辑器连接"},{id:"sec-5",name:"实战：生命值系统"},{id:"sec-6",name:"信号总线"},{id:"sec-7",name:"信号作为Callable"},{id:"sec-blitz",name:"🎮 Blitz实战"},{id:"sec-8",name:"常见错误"},{id:"sec-9",name:"小结"}]
const signalCode = `extends Node
# 1. 声明信号（可以带参数类型）
signal health_changed(new_health: int)
signal player_died()

# 2. 连接信号（通常在 _ready 中）
func _ready() -> void:
    health_changed.connect(_on_health_changed)
    player_died.connect(_on_player_died)

# 3. 发射信号
func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health)  # 发射信号，传递数据
    if health <= 0:
        player_died.emit()

# 回调函数
func _on_health_changed(new_health: int) -> void:
    print("血量变为: ", new_health)
func _on_player_died() -> void:
    print("玩家死亡")`
const healthSystemCode = `# === player.gd ===（只负责数据+发信号，不碰 UI）
extends CharacterBody2D
signal health_changed(new_health: int, max_health: int)
signal player_died()
var health: int = 100
var max_health: int = 100
func take_damage(amount: int) -> void:
    health = max(0, health - amount)
    health_changed.emit(health, max_health)
    if health <= 0: player_died.emit()

# === ui.gd ===（只负责显示，不碰 Player 逻辑）
extends Control
func _ready() -> void:
    var player: Player = get_node("/root/Main/Player")
    player.health_changed.connect(_on_health_changed)
    player.player_died.connect(func(): $GameOverLabel.visible = true)
func _on_health_changed(hp: int, max_hp: int) -> void:
    $HpBar.value = float(hp) / max_hp * 100
    $HpLabel.text = "%d / %d" % [hp, max_hp]`

const signalBusCode = `# global_events.gd（设为 Autoload: GlobalEvents）
extends Node
signal player_died(final_score: int)
signal coin_collected(amount: int)
signal level_complete(level_name: String)

# === player.gd ===
func die() -> void:
    GlobalEvents.player_died.emit(score)  # 不知道谁会收到

# === game_over_ui.gd ===
func _ready() -> void:
    GlobalEvents.player_died.connect(_show_game_over)
func _show_game_over(final_score: int) -> void:
    $ScoreLabel.text = "最终分数: %d" % final_score

# === bgm_manager.gd ===
func _ready() -> void:
    GlobalEvents.player_died.connect(_stop_bgm)
func _stop_bgm(_score: int) -> void:  # _score 未使用，加 _ 前缀
    $BGM.stop()`

const signalAsCallableCode = `# 信号是 Callable ——可以存数组、当参数传
var callbacks: Array[Callable] = []
func register_on_death(cb: Callable) -> void:
    callbacks.append(cb)
func die() -> void:
    for cb: Callable in callbacks: cb.call()

# 内置信号的 Callable 引用
var on_click: Signal = $Button.pressed  # Signal 类型
on_click.connect(func(): print("clicked"))`

const blitzSignalsCode = `# === 1. body_entered / area_entered: 碰撞检测信号 ===
# bullet.gd — Area2D 的 body_entered 检测敌人身体 (CharacterBody2D)
#              area_entered 检测敌人 Hitbox (Area2D)

func _ready() -> void:
    # Godot 内置信号,不需要用 signal 关键字声明
    body_entered.connect(_on_body_entered)
    area_entered.connect(_on_area_entered)

func _on_body_entered(body: Node2D) -> void:
    if _has_hit: return        # 防重复触发 guard
    _has_hit = true
    if body.has_method("take_damage"):  # 鸭子类型
        body.take_damage(damage)
    queue_free()

# === 2. area_entered / area_exited: 区域检测信号 ===
# player.gd — ParryDetector(Area2D) 检测粉色格挡对象

func _ready() -> void:
    parry_detector.area_entered.connect(_on_parry_zone_entered)
    parry_detector.area_exited.connect(_on_parry_zone_exited)

func _on_parry_zone_entered(area: Area2D) -> void:
    near_parry_object = true       # 标记"可以格挡"
    _parry_target = area           # 记住格挡对象(后面销毁用)

func _on_parry_zone_exited(_area: Area2D) -> void:
    near_parry_object = false      # 离开范围,清除标记

# === 3. timeout: 定时器信号 ===
# bullet.gd — 3 秒后自动销毁

var timer: SceneTreeTimer = get_tree().create_timer(3.0)
timer.timeout.connect(queue_free)   # 3 秒后调用 queue_free

# === 4. pressed: 按钮点击信号 ===
# main.gd — 死亡 UI 的 RESTART 按钮

var btn: Button = Button.new()
btn.pressed.connect(_on_restart_pressed)  # 点击时调用

func _on_restart_pressed() -> void:
    get_tree().reload_current_scene()`

const signalArgsCode = `# 带多个参数的信号
signal item_picked(item_name: String, quantity: int)
# 连接
item_picked.connect(func(name: String, qty: int) -> void:
    print("拾取了 ", qty, " 个 ", name))
# 发射
item_picked.emit("Sword", 1)

# 断开连接
health_changed.disconnect(_on_health_changed)`
</script>
