extends Area2D
class_name RespawnPoint
## 复活点 (蒲团/阵眼) — 低惩罚死亡循环的锚点
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep      — Area2D: 触发区域 + body_entered 信号
##   godot-6-4-collision-layers — bit5 = 交互物
##   godot-2-3-node2d-basics    — _draw() 画地面法阵
##   godot-1-8-signals-basics   — 信号自定义 + 外部连接
##
## 🎮 设计 (对应 DESIGN.md「致死惩罚低 + 复活点复活」):
##   玩家踩上去 → 点亮该点 → 死亡后在**最近一次点亮**的复活点复活。
##   永久装备/资源保留, 只损失一点资源 —— 不重开关卡。
##
## 🏗️ 原点约定: position = 法阵**中心**在地面上的位置 (与 BeltFloor.center_of 对齐)。
##   本节点只是「地面上的一个标记」, 视觉全部压在原点附近, 不向上堆高,
##   所以 Y-sort 用原点当排序键就够准。
##
## 🏗️ 法阵画成**椭圆** (2:1), 不是菱形也不是正圆:
##   XZ 平面上的圆投到屏幕上就是 2:1 椭圆 (纵深被压扁一半, 见 belt_space.gd)。
##   画成正圆是最常见的错 —— 它在这一版里读起来像「贴在镜头玻璃上的一枚硬币」,
##   而不是「铺在地上的一圈光」, 因为脚下的地砖是 2:1 的, 两者对不上。
##   (旧等距版画菱形是另一个理由: 地面本身是菱形网格, 圆摆中间很突兀。
##    那个理由随等距一起消失了, 但「必须和无投影的正圆区分开」这件事一直都在。)


## 玩家进入范围时发出, 由 main.gd 接收并记为当前复活点
signal activated(point: RespawnPoint)

## 是否已被点亮 (点亮后视觉变亮)
var is_active: bool = false

@export var ring_color: Color = Color(0.35, 0.95, 0.75)   ## 法阵主色 (青玉)
## 未点亮时的暗度系数
@export var dim_factor: float = 0.42
## 呼吸动画速度
@export var pulse_speed: float = 2.0

## 法阵半径 —— **世界单位** (屏幕上自动成 2:1 椭圆, 所以一个数就够)。
##
## 🏗️ 为什么是 48 而不是「屏幕 32」(压扁前那个数会顺手写成 CELL_W_F * 0.5):
##   压扁前画的是屏幕半径 32 的**正圆**, 纵横都是 ±32px; 现在同样的屏幕半径
##   换到世界空间纵深要 ×2 = 64, 于是判定带在纵深方向只剩一半宽度。
##   48 世界单位 = 屏幕上 48×24 —— 横向比原来宽一圈, 纵深方向仍然是原来的一半,
##   但绝对宽度够用 (纵深整条 576px 里的 ±24px), 不需要玩家对着格子瞄。
##   判定区**故意和画出来的圈同尺寸**: 复活点这种「踩到就该生效」的东西,
##   让玩家看得见自己踩在哪, 比省半个身位重要。要更宽容就一起调大这个数。
const RADIUS_WORLD: float = 48.0

var _pulse: float = 0.0


func _ready() -> void:
	# bit5 = 交互物/复活点
	collision_layer = 1 << 5
	collision_mask = 1 << 0        # 只检测玩家身体
	monitoring = true

	add_to_group("respawn_points")

	# 检测区: **压扁的圆**, 和画出来的椭圆同尺寸 —— 站在法阵边缘就该点亮。
	# ⚠️ 不能用 CircleShape2D: 它在屏幕上是正圆, 换回世界就是个纵深长一倍的椭圆,
	#    于是「看着还差半个身位, 却已经点亮了」—— 玩家会怀疑判定是坏的。
	var cs: CollisionShape2D = CollisionShape2D.new()
	cs.shape = BeltSpace.ground_circle_shape(RADIUS_WORLD, 20)
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

	# 🏗️ 整段用 draw_set_transform 压扁, 于是所有 draw_circle / draw_arc / draw_line
	#    都自动变成「铺在地上」的样子 (纵向减半, 连线宽一起)。
	#    逐个换成 ground_circle() 也能做, 但这里五六个图形, 压扁一遍比换五处更不容易漏。
	#    ⚠️ 法阵**整体**贴在地面上 —— 连中心核也是躺着的, 不是立在空中的球。
	draw_set_transform(Vector2.ZERO, 0.0, BeltSpace.ground_scale())

	# 地面上的法阵: 外圈 + 内圈, 用明暗两层表达「发光」
	draw_circle(Vector2.ZERO, RADIUS_WORLD, Color(c.r, c.g, c.b, 0.16 * glow))
	draw_arc(Vector2.ZERO, RADIUS_WORLD, 0.0, TAU, 48, Color(c.r, c.g, c.b, 0.85 * glow), 2.0)
	draw_arc(Vector2.ZERO, RADIUS_WORLD * 0.62, 0.0, TAU, 32, Color(c.r, c.g, c.b, 0.45 * glow), 1.5)

	# 四个方位的短刻线 —— 只有一点, 但能让法阵「有朝向」而不是一坨光晕
	for i: int in range(4):
		var a: float = float(i) * TAU * 0.25
		var d: Vector2 = Vector2(cos(a), sin(a))
		draw_line(d * RADIUS_WORLD, d * (RADIUS_WORLD - 7.0), Color(c.r, c.g, c.b, 0.7 * glow), 1.5)

	# 中心核
	draw_circle(Vector2.ZERO, 4.0 + glow * 2.5, Color(c.r, c.g, c.b, 0.9))
	draw_circle(Vector2.ZERO, 9.0, Color(c.r, c.g, c.b, 0.18 * glow))

	# ⚠️ 复位: draw_set_transform 会一直生效到本次 _draw() 结束。本函数之后画的
	#    任何东西 (将来加的高度指示、文字) 都会被这层压扁吃掉。
	draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE)
