extends Area2D
class_name RespawnPoint
## 复活点 (蒲团/阵眼) — 低惩罚死亡循环的锚点
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep      — Area2D: 触发区域 + body_entered 信号
##   godot-6-4-collision-layers — bit5 = 交互物
##   godot-2-3-node2d-basics    — _draw() 画等距菱形法阵
##   godot-1-8-signals-basics   — 信号自定义 + 外部连接
##
## 🎮 设计 (对应 DESIGN.md「致死惩罚低 + 复活点复活」):
##   玩家踩上去 → 点亮该点 → 死亡后在**最近一次点亮**的复活点复活。
##   永久装备/资源保留, 只损失一点资源 —— 不重开关卡。
##
## 🏗️ 原点约定: position = 法阵**中心**在地面上的位置 (与 IsoFloor.center_of 对齐)。
##   本节点只是「地面上的一个标记」, 视觉全部压在原点附近, 不向上堆高,
##   所以 Y-sort 用原点当排序键就够准。


## 玩家进入范围时发出, 由 main.gd 接收并记为当前复活点
signal activated(point: RespawnPoint)

## 是否已被点亮 (点亮后视觉变亮)
var is_active: bool = false

@export var ring_color: Color = Color(0.35, 0.95, 0.75)   ## 法阵主色 (青玉)
## 未点亮时的暗度系数
@export var dim_factor: float = 0.42
## 呼吸动画速度
@export var pulse_speed: float = 2.0

var _pulse: float = 0.0
var _hw: float = 0.0
var _hh: float = 0.0


func _ready() -> void:
	# bit5 = 交互物/复活点
	collision_layer = 1 << 5
	collision_mask = 1 << 0        # 只检测玩家身体
	monitoring = true

	add_to_group("respawn_points")

	_hw = Iso.TILE_W_F * 0.5
	_hh = Iso.TILE_H_F * 0.5

	# 圆形检测区 (判定用圆形而非菱形 —— 物理形状尽量用简单图形, 菱形留给视觉)
	var cs: CollisionShape2D = CollisionShape2D.new()
	var circle: CircleShape2D = CircleShape2D.new()
	circle.radius = 26.0
	cs.shape = circle
	add_child(cs)

	body_entered.connect(_on_body_entered)


func _process(delta: float) -> void:
	_pulse = fmod(_pulse + delta * pulse_speed, TAU)
	queue_redraw()


func _on_body_entered(body: Node2D) -> void:
	# ⚠️ 用组判断「谁是玩家」, 不要用 has_method("take_damage") ——
	#    敌人也有 take_damage! 那样敌人路过就会把复活点替你点亮,
	#    你死一次就会复活在一个从没去过的角落, 而且看起来像「复活点乱跳」。
	if not body.is_in_group("player"):
		return
	if is_active:
		return
	is_active = true
	queue_redraw()
	activated.emit(self)


## 复活位置 = 本点中心稍微往前一点, 免得复活时卡在法阵边缘
func spawn_position() -> Vector2:
	return global_position


func _draw() -> void:
	var glow: float = (sin(_pulse) * 0.5 + 0.5) * 0.35 + 0.65
	var c: Color = ring_color
	if not is_active:
		c = c.darkened(1.0 - dim_factor)

	# 地面上的菱形法阵: 外圈 + 内圈, 用明暗两层表达「发光」
	draw_colored_polygon(
		PackedVector2Array([
			Vector2(0, -_hh), Vector2(_hw, 0), Vector2(0, _hh), Vector2(-_hw, 0)
		]), Color(c.r, c.g, c.b, 0.16 * glow))
	draw_polyline(
		PackedVector2Array([
			Vector2(0, -_hh), Vector2(_hw, 0), Vector2(0, _hh), Vector2(-_hw, 0), Vector2(0, -_hh)
		]), Color(c.r, c.g, c.b, 0.85 * glow), 2.0)

	# 中心核
	draw_circle(Vector2.ZERO, 4.0 + glow * 2.5, Color(c.r, c.g, c.b, 0.9))
	draw_circle(Vector2.ZERO, 9.0, Color(c.r, c.g, c.b, 0.18 * glow))
