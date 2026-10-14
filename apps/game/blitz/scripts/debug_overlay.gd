extends Node2D
class_name DebugOverlay
## 等距走位验收面板 — 本次里程碑的**验收工具**, 不是装饰
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() + CanvasLayer 的层级混用
##   godot-2-8-tilemap        — 等距菱形: 用中心点画出「脚在哪个格」
##   godot-3-4-input-handling — _unhandled_input: 面板开关不该被 UI 吃掉
##   godot-1-12-static-typing — 强类型 + 参数类型标注
##
## 🎮 为什么值得单独写一个文件:
##   等距视角的错误**肉眼极难分辨**。「格子映射偏了半格」和「角色美术没对齐」
##   在屏幕上看起来一模一样, 靠盯屏幕猜会浪费一整天。
##   这个面板把「引擎认为你在哪个格」「高亮菱形在哪」「你的精确坐标在哪」
##   三件事同时画出来 —— 对不上就是对不上, 一眼可见。
##
## 🏗️ 为什么是 Node2D 而不是 CanvasLayer:
##   CanvasLayer **没有** _draw() —— 它不属于 2D 世界坐标系, 只是给子节点换图层。
##   而我们需要在世界坐标里画菱形。所以本节点是 Node2D (挂场景根下, 不参与 y-sort),
##   内部再自建一个 CanvasLayer(200) 装文字 —— CanvasLayer 作为 Node2D 的子节点完全合法,
##   它不会继承父节点的 transform, 这正是我们要的 (文字固定屏幕位置)。
##
## 🏗️ 三个标记各自证明什么:
##   ① 高亮菱形 (跟随脚底格子) —— 证明 IsoFloor.cell_of() 与引擎的 map_to_local 一致
##   ② 十字准星 (玩家精确坐标) —— 和菱形中心对比, 证明角色原点在脚底且居中
##   ③ 朝向箭头 —— 证明 facing 是连续向量, 不是「左右翻面」的布尔值
##
## 🎮 v0.3 新增 ④ **格挡扇形可视化** —— 这是本轮最重要的一块面板功能。
##   扇形格挡的失败模式是**「我觉得我挡住了」**: 玩家正面挨打时掉血,
##   分不清是「我朝向错了 (背对)」「判定框位置不对」还是「窗口过期了」。
##   三者在屏幕上长得一模一样, 靠猜会浪费一整天。
##   把扇形的两条边界线画出来, 「我在不在正面」就变成一个**看得见**的几何问题。
##   (朝向箭头也一并变长变亮, 免得让人以为扇形是"自动朝向"的)


## 面板开关按键 (在 project.godot 的 [input] 里定义)
const TOGGLE_ACTION: String = "debug_toggle"

## 面板文字所在图层 (200 高于 HUD, 保证不被盖住)
const TEXT_LAYER: int = 200

@export var diamond_color: Color = Color(0.25, 0.95, 1.0, 0.9)   ## 高亮菱形
@export var cross_color: Color = Color(1.0, 0.35, 0.35, 1.0)     ## 玩家精确坐标
@export var arrow_color: Color = Color(1.0, 0.85, 0.2, 1.0)      ## 朝向箭头
@export var cone_color: Color = Color(0.4, 1.0, 0.55, 1.0)       ## 格挡扇形边界
@export var parry_color: Color = Color(1.0, 0.9, 0.35, 1.0)      ## 精准窗口开着的扇形

var _floor: IsoFloor = null
var _player: BlitzPlayer = null
var _label: Label = null
var _text_layer: CanvasLayer = null
var _hw: float = 0.0
var _hh: float = 0.0


func _ready() -> void:
	_hw = Iso.TILE_W_F * 0.5
	_hh = Iso.TILE_H_F * 0.5

	_text_layer = CanvasLayer.new()
	_text_layer.layer = TEXT_LAYER
	add_child(_text_layer)

	_label = Label.new()
	# 让开 HUD: 血格 (14~30) + 精力条 (38~49) + 分数 (58~82) → 从 90 起
	_label.position = Vector2(12.0, 90.0)
	_label.add_theme_font_size_override("font_size", 13)
	_label.add_theme_color_override("font_color", Color(0.80, 0.95, 1.0))
	# 半透明底衬: 星空背景上纯文字会看不清
	_label.add_theme_color_override("font_outline_color", Color(0.0, 0.0, 0.0, 0.85))
	_label.add_theme_constant_override("outline_size", 4)
	# ⚠️ Label 默认就是 IGNORE, 但显式写出来 —— 见 HUD 里那条 mouse_filter 的坑
	_label.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_text_layer.add_child(_label)


## 显示/隐藏面板。
##
## ⚠️ 必须**两处都切**: 世界空间的菱形走本节点 (Node2D) 的 visible,
##    而文字在 CanvasLayer 里 —— CanvasLayer 不是 CanvasItem, **不继承**父节点的
##    visible。只切本节点的话, 菱形消失了但文字还挂在屏幕上, 看起来像「面板关不掉」。
func set_shown(on: bool) -> void:
	visible = on
	if _text_layer != null:
		_text_layer.visible = on


## 由 main.gd 在关卡搭好后调用
func setup(floor: IsoFloor, player: BlitzPlayer) -> void:
	_floor = floor
	_player = player


func _unhandled_input(event: InputEvent) -> void:
	# 用 _unhandled_input 而不是 _input: 如果有 UI 正在吃按键, 面板不该跟着响应
	if event.is_action_pressed(TOGGLE_ACTION):
		set_shown(not visible)
		get_viewport().set_input_as_handled()


func _process(_delta: float) -> void:
	if not visible:
		return
	queue_redraw()
	_update_text()


func _update_text() -> void:
	if _label == null or _player == null or not is_instance_valid(_player):
		return
	var pos: Vector2 = _player.global_position
	# ── 速度: 验收第 6 条的关键数字 ──
	# 对角线同时按住时, 若这里显示 452 (=320×√2) 说明输入没用 Input.get_vector 归一化
	var vel: Vector2 = _player.velocity

	var cell: Vector2i = _floor.cell_of(pos) if _floor != null else Vector2i.ZERO
	var lines: Array[String] = [
		"F1 面板  |  R 重开",
		"pos = (%.1f, %.1f)    cell = %s" % [pos.x, pos.y, str(cell)],
		"vel = (%.1f, %.1f)    |v| = %.1f  (期望 %.0f)" % [vel.x, vel.y, vel.length(), _player.move_speed],
		"facing = (%.2f, %.2f)  dir8 = %d" % [_player.facing_dir.x, _player.facing_dir.y, Iso.dir8_index(_player.facing_dir)],
		"状态 = %s" % BlitzPlayer.State.keys()[_player.state],
		_stamina_line(),
		_combat_line(),
		"输入: " + _action_states(),
	]
	_label.text = "\n".join(lines)


## 精力 —— 三个数字缺一不可:
##   current/max 看余量; `锁` 看回复延迟是否还在 (玩家最常问的就是「为什么还不回」);
##   破防则是「当前处境」而不是数值。
func _stamina_line() -> String:
	if _player.stamina == null:
		return "精力 = (未初始化)"
	var sp: StatPool = _player.stamina
	return "精力 = %.0f / %.0f  (%.0f%%)  %s%s" % [
		sp.current, sp.max_value, sp.ratio() * 100.0,
		"回复中" if not sp.is_regen_locked() else "锁 %.2fs" % sp._hold,
		"   ⚠️破防" if _player.is_guard_broken() else "",
	]


## 战斗状态 —— 精准窗口和蓄力进度是**两个看不见的计时器**,
## 不显示出来的话, 调参时只能靠手感猜「窗口到底是不是 0.16 秒」。
func _combat_line() -> String:
	var guard: String = "开" if _player.is_parry_window_open() else "关"
	var charge: String = "-"
	if _player.is_charging():
		var t: float = _player.charge_ratio()
		charge = "%.0f%%%s" % [t * 100.0, "  ★可破霸体" if t >= _player.heavy_armor_break_ratio else ""]
	return "精准窗口 = %s    蓄力 = %s    %s" % [guard, charge, _enemy_phase()]


## 最近的敌人的出招相位 —— 验敌人状态机时, 「它到底在哪一相」必须能直接读到。
## 靠看动画猜相位是行不通的: WINDUP 末尾和 STRIKE 的画面几乎一样。
func _enemy_phase() -> String:
	var best: BlitzEnemy = null
	var best_d: float = INF
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		if not (n is BlitzEnemy):
			continue
		var e: BlitzEnemy = n
		if e.is_dead:
			continue
		var d: float = e.global_position.distance_to(_player.global_position)
		if d < best_d:
			best_d = d
			best = e
	if best == null:
		return "最近敌人 = 无"
	return "最近敌人 = %s @%.0fpx  hp=%d" % [
		BlitzEnemy.AttackPhase.keys()[best.attack_phase], best_d, best.health]


## 按键按下状态。v0.3 起这四个都有真实玩法了, 这里仍然留着 ——
## 「按了没反应」和「按了有反应但没生效」是两类完全不同的 bug,
## 面板能立刻把前者排除掉 (action 名字拼错 / 映射没通)。
func _action_states() -> String:
	var names: Array[String] = ["attack_light", "attack_heavy", "dash", "block"]
	var out: Array[String] = []
	for n: String in names:
		if not InputMap.has_action(n):
			out.append("%s=未定义" % n)
			continue
		out.append("%s=%s" % [n, "按" if Input.is_action_pressed(n) else "-"])
	return "  ".join(out)


# ============================================================
# 世界空间绘制
# ============================================================
func _draw() -> void:
	if _floor == null or _player == null or not is_instance_valid(_player):
		return
	var pos: Vector2 = _player.global_position
	var center: Vector2 = to_local(_floor.center_of(_floor.cell_of(pos)))

	# ① 高亮菱形: 精确套在脚下那一格
	draw_polyline(
		PackedVector2Array([
			center + Vector2(0, -_hh), center + Vector2(_hw, 0),
			center + Vector2(0, _hh), center + Vector2(-_hw, 0),
			center + Vector2(0, -_hh),
		]), diamond_color, 2.0)
	draw_colored_polygon(
		PackedVector2Array([
			center + Vector2(0, -_hh), center + Vector2(_hw, 0),
			center + Vector2(0, _hh), center + Vector2(-_hw, 0),
		]), Color(diamond_color.r, diamond_color.g, diamond_color.b, 0.12))

	# ② 十字准星: 玩家真实坐标。和菱形中心重合 = 原点在脚底且在格中心
	draw_line(pos + Vector2(-7, 0), pos + Vector2(7, 0), cross_color, 1.5)
	draw_line(pos + Vector2(0, -7), pos + Vector2(0, 7), cross_color, 1.5)

	# ③ 朝向箭头 (8 向吸附后的方向)
	var d: Vector2 = Iso.dir8(_player.facing_dir)
	draw_line(pos, pos + d * 30.0, arrow_color, 2.0)
	# 箭头两侧的翅
	var perp: Vector2 = Vector2(-d.y, d.x)
	var tip: Vector2 = pos + d * 30.0
	draw_line(tip, tip - d * 7.0 + perp * 4.0, arrow_color, 2.0)
	draw_line(tip, tip - d * 7.0 - perp * 4.0, arrow_color, 2.0)

	# ④ 格挡扇形 (只在举盾时画 —— 平时画会糊住整个屏幕)
	_draw_guard_cone(pos)


## 格挡扇形 —— **本面板存在的最大理由**。
##
## ⚠️ 这里必须用_连续的_ facing_dir.angle(), 而不是 Iso.dir8() 吸附后的角度:
##    游戏里的实际判定用的是 player._is_in_guard_cone(), 它拿的是连续 facing_dir。
##    面板若画吸附后的扇形, 就会出现「面板说挡住了、实际判定说没挡住」的
##    半度偏差 —— 一个只会在调试时把自己绕进去的假象。
##    **调试可视化必须和实际判定用同一个数**。
func _draw_guard_cone(pos: Vector2) -> void:
	if not _player.is_guard_up():
		return

	var fa: float = _player.facing_dir.angle()
	var c: Color = parry_color if _player.is_parry_window_open() else cone_color
	var reach: float = 46.0

	# 两条边界 (±90°): 转过这两条线就挡不住了。
	# 线画得比扇形本身**长** —— 它们是「边界」而不是「装饰边」, 越界要看得明显。
	for side: float in [1.0, -1.0]:
		var a: float = fa + side * PI * 0.5
		var edge: Vector2 = Vector2(cos(a), sin(a))
		draw_line(pos, pos + edge * (reach + 14.0), Color(c.r, c.g, c.b, 0.85), 2.0)

	# 扇形弧
	var arc: PackedVector2Array = PackedVector2Array()
	var steps: int = 24
	for i: int in range(steps + 1):
		var a: float = fa + lerpf(-PI * 0.5, PI * 0.5, float(i) / float(steps))
		arc.append(pos + Vector2(cos(a), sin(a)) * reach)
	draw_polyline(arc, Color(c.r, c.g, c.b, 0.55), 1.5)

	# 半透明填充: 让「覆盖到的半圆」一眼可辨
	var fan: PackedVector2Array = arc.duplicate()
	fan.append(pos)
	draw_colored_polygon(fan, Color(c.r, c.g, c.b, 0.09))

	# 中心朝向短线: 标出扇形的「正前方」, 也就是鼠标指着的那个方向
	draw_line(pos, pos + Vector2(cos(fa), sin(fa)) * (reach + 20.0), c, 2.5)
