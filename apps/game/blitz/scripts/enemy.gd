extends CharacterBody2D
## 敌人 AI — CharacterBody2D + Area2D Hitbox 协作
##
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d — move_and_slide() 重力/平台检测
##   godot-6-5-characterbody-deep — 深入 CharacterBody2D
##   godot-6-2-area2d-deep — Hitbox 用 Area2D 检测子弹
##   godot-6-4-collision-layers — 为什么敌人身体和 Hitbox 在不同层
##   godot-2-5-collision2d — CollisionShape2D 的矩形形状
##   godot-1-7-classes-oop — enum 枚举定义 AI 类型
##
## 核心设计:
##   敌人 = CharacterBody2D(身体,重力/移动) + Area2D(Hitbox,检测子弹)
##   为什么需要 Hitbox? CharacterBody2D 的碰撞形状通常较小(精准碰撞),
##   加一个稍大的 Hitbox(Area2D)可以提高子弹命中判定,手感和"茶杯头"类似。

# ============================================================
# 节点引用 (由 enemy.tscn 预创建,用 @onready 保证在 _ready 后可用)
# ============================================================
@onready var hitbox: Area2D = $Hitbox
## Hitbox — 比身体稍大的受击判定区,检测玩家子弹


# ============================================================
# 枚举: AI 行为类型
# ============================================================
enum Type {
	PATROL = 0,     ## 巡逻 — 在起始点左右来回移动
	STATIONARY = 1, ## 固定 — 不移动,充当"炮台"
	CHASER = 2,     ## 追踪 — 朝玩家方向移动
}


# ============================================================
# 导出属性 (可在编辑器中调整)
# ============================================================
@export var enemy_type: Type = Type.PATROL
@export var move_speed: float = 80.0        ## 移动速度 px/s
@export var patrol_range: float = 150.0     ## 巡逻兵移动范围(距起点)
@export var max_health: int = 3             ## 最大生命值
@export var score_value: int = 100          ## 击杀得分

# ============================================================
# 运行时状态
# ============================================================
var health: int
var start_position: Vector2          ## 巡逻起点(生成位置)
var facing_right: bool = true
var is_dead: bool = false
var gravity: float = 1200.0          ## 重力加速度,与玩家一致

# 视觉/受击反馈计时器
var _flash_timer: float = 0.0        ## 白色闪烁计时 (hit flash)
var _stun_timer: float = 0.0         ## 受击硬直计时


func _ready() -> void:
	# ── 碰撞层配置 ──
	# 与玩家/bullet/main.gd 中的注释对照看,必须保持一致!
	# Bit 布局: 0=玩家 1=敌人 2=玩家攻击 3=敌人攻击 4=墙壁 5=格挡 6=终点
	collision_layer = 1 << 1   # bit1: "我是敌人身体"
	collision_mask  = 1 << 4   # bit4: "我只跟墙壁碰撞"(不跟玩家物理碰撞)

	# ── Hitbox 碰撞层 ──
	# Hitbox 的 layer 也设为 bit1,这样子弹的 mask(含 bit1)能检测到它
	# Hitbox 的 mask  设为 bit2,这样它能检测到玩家攻击
	hitbox.collision_layer = 1 << 1    # bit1: 让子弹能检测到
	hitbox.collision_mask  = 1 << 2    # bit2: 检测玩家子弹
	# 注意: hitbox 的 area_entered 回调只做日志,实际伤害由 bullet.gd 处理

	health = max_health
	start_position = position


# ============================================================
# 物理循环 (每物理帧调用一次)
# ============================================================
func _physics_process(delta: float) -> void:
	if is_dead:
		return

	_flash_timer = max(0.0, _flash_timer - delta)
	_stun_timer  = max(0.0, _stun_timer - delta)

	# ── 重力 ──
	# 只有在地上的时候才不受重力影响 (move_and_slide 会自动处理)
	if not is_on_floor():
		velocity.y += gravity * delta

	# ── AI 行为 ──
	# 受击硬直期间不移动
	if _stun_timer > 0.0:
		velocity.x = move_toward(velocity.x, 0.0, 400.0 * delta)
	else:
		match enemy_type:
			Type.PATROL:
				_process_patrol(delta)
			Type.STATIONARY:
				velocity.x = move_toward(velocity.x, 0.0, 400.0 * delta)
			Type.CHASER:
				_process_chase(delta)

	# ── 移动并处理碰撞 ──
	# move_and_slide() 是 CharacterBody2D 的核心方法:
	# 1. 按 velocity 移动
	# 2. 碰到 collision_mask 中的物体时停止
	# 3. 更新 is_on_floor() / is_on_wall() 等状态
	move_and_slide()

	# 触发重绘 (闪烁效果需要每帧更新外观)
	queue_redraw()


# ── 巡逻逻辑 ──
func _process_patrol(_delta: float) -> void:
	var dist_from_start: float = position.x - start_position.x
	# 到达巡逻边界时掉头
	if abs(dist_from_start) > patrol_range:
		facing_right = dist_from_start < 0.0
	velocity.x = (1.0 if facing_right else -1.0) * move_speed


# ── 追踪逻辑 ──
func _process_chase(_delta: float) -> void:
	var player_ref: Node2D = _get_player()
	if not is_instance_valid(player_ref):
		return
	var to_player: Vector2 = player_ref.position - position
	facing_right = to_player.x > 0.0
	velocity.x = (1.0 if facing_right else -1.0) * move_speed * 1.5


# ============================================================
# 伤害 / 死亡
# ============================================================
func take_damage(amount: int) -> void:
	if is_dead:
		return
	health -= amount
	_flash_timer = 0.1     # 白色闪烁 0.1 秒
	_stun_timer  = 0.15    # 硬直 0.15 秒
	velocity.y = -80.0     # 轻微击退

	if health <= 0:
		die()


func die() -> void:
	is_dead = true
	# 通知主场景加分 (鸭子类型: 不依赖具体类名)
	if get_tree().current_scene.has_method("add_score"):
		get_tree().current_scene.add_score(score_value)

	_spawn_death_effect()
	queue_free()


# ============================================================
# 外观绘制 (_draw 是 CanvasItem 虚函数)
# ============================================================
func _draw() -> void:
	if is_dead:
		return

	# 受击时白色闪烁
	var base_color: Color = _get_type_color()
	var draw_color: Color = Color.WHITE if _flash_timer > 0.0 else base_color

	# 身体: 圆形
	draw_circle(Vector2(0, -4), 14, draw_color)
	draw_arc(Vector2(0, -4), 14, 0, TAU, 32, base_color.darkened(0.4), 2.0)

	# 眼睛: 朝向来指示巡逻方向
	var eye_dir: float = 1.0 if facing_right else -1.0
	draw_circle(Vector2(5.0 * eye_dir, -8.0), 3.0, Color.WHITE)
	draw_circle(Vector2(7.0 * eye_dir, -8.0), 1.5, Color.BLACK)


func _get_type_color() -> Color:
	match enemy_type:
		Type.PATROL:     return Color(0.9, 0.35, 0.25)  # 橙红 — 巡逻兵
		Type.STATIONARY: return Color(0.8, 0.2, 0.6)     # 粉紫 — 固定炮台
		Type.CHASER:     return Color(0.9, 0.15, 0.15)   # 深红 — 追踪者
	return Color.RED


# ============================================================
# 辅助
# ============================================================

# 获取玩家引用 (通过主场景的 get_player() 方法)
# 这是 Godot 中跨节点的通信模式: 通过场景根节点做中介
# 详见 godot-2-2-node-communication
func _get_player() -> Node2D:
	var root: Node = get_tree().current_scene
	if root and root.has_method("get_player"):
		return root.get_player()
	return null


func _spawn_death_effect() -> void:
	var fx: Node2D = Node2D.new()
	fx.position = position
	fx.set_script(_death_fx_script())
	get_tree().current_scene.add_child(fx)
	var t: SceneTreeTimer = get_tree().create_timer(0.5)
	t.timeout.connect(fx.queue_free)


func _death_fx_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D

func _draw():
	for i in range(8):
		var angle: float = float(i) / 8.0 * TAU
		var dist: float = randf_range(6.0, 18.0)
		var pos: Vector2 = Vector2(cos(angle), sin(angle)) * dist
		draw_circle(pos, randf_range(2.0, 5.0), Color.ORANGE)
		draw_circle(pos * 0.5, randf_range(1.0, 3.0), Color.YELLOW)
"""
	s.reload()
	return s
