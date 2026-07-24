extends Area2D
## 近战攻击判定框 — 武侠战斗核心
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep     — Area2D 深入: signal/层/掩码/overlap
##   godot-6-4-collision-layers — bit 位精确控制碰撞关系
##   godot-1-8-signals-basics   — body_entered / area_entered 信号
##   godot-2-5-collision2d      — 碰撞形状: RectangleShape2D
##
## 🎮 设计思路:
##   攻击判定框是一个短命的 Area2D, 在玩家面前生成, 持续约 0.1-0.2 秒后消失。
##   碰到敌人的 CharacterBody2D (或 Hitbox Area2D) 时造成伤害 + 击退。
##   和子弹不同的是: 它不移动, 只是短暂存在一个矩形判定区。
##
##   碰撞层分配:
##     collision_layer = bit2 (我是"玩家攻击"), 让敌人 Hitbox 能检测到我
##     collision_mask  = bit1 (我检测"敌人身体"), 碰到敌人就伤害+击退

# ============================================================
# 运行时属性 (由生成者 player.gd 设置)
# ============================================================
var damage: int = 1                       ## 伤害值
var knockback_x: float = 300.0            ## 水平击退力 px/s
var knockback_y: float = -180.0           ## 垂直击退力 (负=向上)
var lifetime: float = 0.15                ## 攻击判定持续时间(秒)
var _has_hit: Array[Node2D] = []         ## 已命中的目标 (防止同一帧双触发 + 防止多次命中同一目标)


func _ready() -> void:
	# ── 碰撞层配置 ──
	# bit2: "我是玩家攻击判定"
	# bit1: "我检测敌人身体(=CharacterBody2D 的 layer bit1 + Hitbox Area2D 的 layer bit1)"
	# 为什么 mask 里没有墙壁? 攻击不应该被墙壁挡住, 只检测敌人
	collision_layer = 1 << 2   # bit 2: player attack
	collision_mask  = 1 << 1   # bit 1: detect enemy bodies

	# ── 连接信号 ──
	# → godot-1-8-signals-basics: body_entered检测物理体, area_entered检测Area
	# → godot-6-2-area2d-deep: 同一帧可能都触发, _has_hit防重复
	body_entered.connect(_on_body_entered)
	area_entered.connect(_on_area_entered)

	# ── 超时自毁 ──
	# 攻击判定框只存在极短时间, 模拟"刀光一闪"
	var timer: SceneTreeTimer = get_tree().create_timer(lifetime)
	timer.timeout.connect(queue_free)


# ── body_entered: 命中 CharacterBody2D (敌人身体) ──
func _on_body_entered(body: Node2D) -> void:
	if body in _has_hit:
		return
	_has_hit.append(body)

	if body.has_method("take_damage"):
		body.take_damage(damage)
		# 击退 — 向远离攻击者的方向推
		if body is CharacterBody2D:
			var kb_dir: float = 1.0 if body.position.x > position.x else -1.0
			body.velocity = Vector2(kb_dir * knockback_x, knockback_y)
	_spawn_hit_effect(body.position)


# ── area_entered: 命中 Area2D (敌人 Hitbox) ──
func _on_area_entered(area: Area2D) -> void:
	if area in _has_hit:
		return
	_has_hit.append(area)

	if area.has_method("take_damage"):
		area.take_damage(damage)
	elif area.get_parent() and area.get_parent().has_method("take_damage"):
		var parent: Node = area.get_parent()
		parent.take_damage(damage)
		if parent is CharacterBody2D:
			var kb_dir: float = 1.0 if parent.position.x > position.x else -1.0
			parent.velocity = Vector2(kb_dir * knockback_x, knockback_y)
	_spawn_hit_effect(area.global_position)


# ── 命中特效: 金色火花 ──
func _spawn_hit_effect(at_pos: Vector2) -> void:
	var fx: Node2D = Node2D.new()
	fx.position = at_pos
	fx.z_index = 20
	fx.set_script(_hit_fx_script())
	get_tree().current_scene.add_child(fx)
	var t: SceneTreeTimer = get_tree().create_timer(0.3)
	t.timeout.connect(fx.queue_free)


# ── 攻击判定框外观 (调试用, 实际游戏中可隐藏) ──
func _draw() -> void:
	# 金色半透明框 = 攻击判定范围
	var shape_owner: int = shape_find_owner(0)
	if shape_owner != -1:
		var shapes: Array = shape_owner_get_shapes(shape_owner)
		for shape_data in shapes:
			var shape: Shape2D = shape_data.shape
			if shape is RectangleShape2D:
				draw_rect(Rect2(-shape.size / 2, shape.size), Color(1.0, 0.8, 0.1, 0.3))
				draw_rect(Rect2(-shape.size / 2, shape.size), Color(1.0, 0.9, 0.2, 0.6), false, 1.5)


# ── 动态生成命中特效脚本 ──
func _hit_fx_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
var _t: float = 0.0
func _process(delta):
	_t += delta
	queue_redraw()
	if _t > 0.3: queue_free()
func _draw():
	var r: float = _t / 0.3
	for i in range(8):
		var angle: float = float(i) / 8.0 * TAU + _t * 2.0
		var dist: float = lerp(0.0, 22.0, r)
		var pos: Vector2 = Vector2(cos(angle), sin(angle)) * dist
		draw_circle(pos, lerp(4.0, 1.0, r), Color(1.0, 0.85, 0.1, 1.0 - r))
	draw_circle(Vector2.ZERO, lerp(6.0, 0.0, r), Color(1.0, 0.6, 0.1, 0.5 - r * 0.5))
"""
	s.reload()
	return s
