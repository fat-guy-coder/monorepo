extends Area2D
## 玩家子弹 — Area2D 碰撞检测实战
##
## 📚 涉及学习文档:
##   godot-2-5-collision2d  — 碰撞体 vs 检测区的区别
##   godot-6-2-area2d-deep   — Area2D 深入: signal/层/掩码/overlap
##   godot-6-4-collision-layers — 为什么 bit 位精确控制碰撞关系
##   godot-1-8-signals-basics — body_entered / area_entered 信号
##
## 核心概念:
##   Area2D 本身没有物理碰撞(不会反弹),只是"感应区"。
##   当另一个有 collision_layer 的物体进入 Area2D 的 collision_mask 范围,
##   Godot 自动触发 body_entered(物理体) 或 area_entered(另一个 Area) 信号。
##
##   collision_layer = "我是谁" (让别人检测我)
##   collision_mask  = "我关心谁" (我要检测谁)

# ============================================================
# 运行时属性 (由生成者设置)
# ============================================================
var direction: Vector2 = Vector2.RIGHT   ## 飞行方向(归一化向量)
var speed: float = 700.0                ## 飞行速度 px/s
var damage: int = 1                     ## 伤害值
var lifetime: float = 3.0               ## 最大存活时间(秒)

var _has_hit: bool = false              ## 防止同一帧 body+area 双重触发

# 碰撞形状已在 bullet.tscn 中预创建,这里不需要再 new


func _ready() -> void:
	# ── 碰撞层配置 ──
	# bit2(值4): "我是玩家子弹"
	# bit1(值2): "我检测敌人身体/受击框"
	# bit4(值16): "我检测墙壁"
	# → godot-6-4-collision-layers: layer="我是谁", mask="我检测谁"
	collision_layer = 1 << 2   # bit 2: player bullets
	collision_mask  = (1 << 1) | (1 << 4)  # bit1(敌人) | bit4(墙壁)

	# ── 连接信号 ──
	# 当子弹的碰撞形状与敌人 CharacterBody2D 重叠时触发 body_entered
	# → godot-1-8-signals-basics: body_entered检测物理体, area_entered检测Area
	# → godot-6-2-area2d-deep: 同一帧可能都触发, _has_hit防重复
	# 当子弹的碰撞形状与敌人 Hitbox(Area2D) 重叠时触发 area_entered
	body_entered.connect(_on_body_entered)
	area_entered.connect(_on_area_entered)

	# → godot-7-5-timers-delays: SceneTreeTimer 一次性延迟
	# ── 超时自毁 ──
	# SceneTreeTimer: 一次性定时器,3秒后 queue_free()
	# 详见 godot-7-5-timers-delays
	var timer: SceneTreeTimer = get_tree().create_timer(lifetime)
	timer.timeout.connect(queue_free)


func _physics_process(delta: float) -> void:
	# Area2D 的位置更新会触发物理引擎重新检测重叠
	position += direction * speed * delta
	queue_redraw()


# ── body_entered: 命中 CharacterBody2D / StaticBody2D ──
# 这是主要命中路径: 敌人身体是 CharacterBody2D, 碰撞层 bit1
func _on_body_entered(body: Node2D) -> void:
	if _has_hit:
		return
	_has_hit = true

	# 利用鸭子类型: 只要目标有 take_damage 方法就造成伤害
	# (不用判断具体类型,方便扩展)
	if body.has_method("take_damage"):
		body.take_damage(damage)
	_hit_and_die()


# ── area_entered: 命中另一个 Area2D ──
# 这是备用命中路径: 敌人身上有个更大的 Hitbox(Area2D),
# Hitbox 的 collision_layer 也设为 bit1,所以子弹也能检测到它
func _on_area_entered(area: Area2D) -> void:
	if _has_hit:
		return
	_has_hit = true

	# Area2D(Hitbox)本身没有 take_damage,往上找父节点(敌人 CharacterBody2D)
	if area.has_method("take_damage"):
		area.take_damage(damage)
	elif area.get_parent() and area.get_parent().has_method("take_damage"):
		area.get_parent().take_damage(damage)
	_hit_and_die()


func _hit_and_die() -> void:
	_spawn_hit_effect()
	collision_mask = 0   # 防止已命中的子弹再触发碰撞
	queue_free()          # 标记删除,实际在帧末释放


# ── 命中特效: 黄色爆炸粒子 ──
func _spawn_hit_effect() -> void:
	var fx: Node2D = Node2D.new()
	fx.position = position
	fx.set_script(_hit_fx_script())
	get_tree().current_scene.add_child(fx)
	var t: SceneTreeTimer = get_tree().create_timer(0.3)
	t.timeout.connect(fx.queue_free)


# ── 子弹外观: 黄色小光点 ──
# _draw() 是 CanvasItem 的虚函数,每次 queue_redraw() 时调用
# 详见 godot-2-3-node2d-basics
func _draw() -> void:
	draw_circle(Vector2.ZERO, 4.5, Color(1.0, 0.9, 0.1))
	draw_circle(Vector2.ZERO, 2.5, Color(1.0, 1.0, 0.6))
	draw_circle(Vector2(1.5, -1.5), 1.5, Color(1.0, 1.0, 1.0, 0.8))


# ── 动态生成命中特效脚本 (运行时编译) ──
func _hit_fx_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D

func _draw():
	var colors: Array = [Color.YELLOW, Color.ORANGE, Color(1, 0.8, 0)]
	for i in range(5):
		var angle: float = float(i) / 5.0 * TAU
		var dist: float = randf_range(4.0, 10.0)
		var pos: Vector2 = Vector2(cos(angle), sin(angle)) * dist
		draw_circle(pos, randf_range(1.5, 3.0), colors[i % colors.size()])
"""
	s.reload()
	return s
