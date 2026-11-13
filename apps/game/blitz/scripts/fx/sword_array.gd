extends Node2D
class_name SwordArray
## 剑阵 —— 本项目第一个**真正的「布置」技** (v0.7)
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() / queue_redraw / 节点生命周期
##   godot-6-6-ysort          — 为什么地面法阵必须用**绝对 z_index** 退出 y-sort
##   godot-1-12-static-typing — static 工厂
##
## ────────────────────────────────────────────────────────────
## 🎮 它在博弈里填的是哪个空格子
## ────────────────────────────────────────────────────────────
## COMBAT_MATRIX.md §3 ③ 说得很直接: 玩家原来的七个应对**全是即时反应**,
## 没有一个能改变「未来两秒的战场状态」。护体罡气是兜底, 不是布置。
## 剑阵要填的就是这一格:
##
##   **在脚下插一圈剑, 持续 3 秒; 敌人要么踩进来吃持续伤害, 要么绕开。**
##   敌人绕开 = 你把一块地「删掉」了 = 你的走位第一次有了**空间收益**。
##
## 于是它的价值不在伤害数字, 而在**它逼敌人做的那个选择**。这也是为什么
## 它必须让敌人「看得见、躲得开」, 而不是一个隐形的 DoT 池子。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 为什么是一个独立的世界物件, 而不是挂在玩家身上的状态
## ────────────────────────────────────────────────────────────
## 罡气挂在玩家身上是对的 (它跟着人走), 剑阵相反: **它必须留在原地**。
## 留在原地, 玩家走出去之后那块地才仍然有约束力 —— 这就是「布置」和「增益」
## 的区别。所以它是一个 Node2D, 位置在施放瞬间的世界坐标, 之后**不再跟随玩家**。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 为什么伤害走 tick 查询, 而不是一个常驻 Area2D
## ────────────────────────────────────────────────────────────
## AttackHitbox 的模型是「短命的 Area2D + body_entered」, 它天然只打一次。
## 持续伤害要的是「每 0.5 秒扫一遍**当前还在圈里**的人」, 而 Area2D 的
## body_entered 只在**进入**时发 —— 站在里面不动的人不会收到第二次事件。
## 想用 Area2D 就得自己维护一份「谁还在里面」的名单, 再和物理帧的进出事件对账;
## 那份名单一旦和真实重叠漂移, 症状是「站在圈里却不掉血」, 而且只在特定时序出现。
##
## 现在: 每个 tick 直接问 `get_nodes_in_group("enemies")`, 用
## `AttackShape.contains()` 做**同一个纯函数判定** —— 和预警绘制同源,
## 也和 smoke_test 能断言的纯数学生活在同一个世界。
## 每 0.5 秒扫一次 5~10 个敌人, 开销可以忽略。
##
## ⚠️ DoT 走敌人的 `take_dot()`, **不是** `take_damage()` ——
##    详见 enemy.gd 那个函数上的注释: 持续伤害不能每 0.5 秒硬直/击退一次,
##    否则剑阵会变成「全场永久打断」, 比任何单发技能都强。
##
## ────────────────────────────────────────────────────────────
## ⚠️ 判定用**脚底中心点**, 不是身体体积
## ────────────────────────────────────────────────────────────
## AttackHitbox 是「物理体 vs 物理体」, 所以贴边站的人会因身体半径而被算进去。
## 本文件用的是 `contains_ground(敌人的世界坐标)` —— 只看脚踩在哪。
## 两条规则不同, 但对一个**地面法阵**来说, 「脚在圈里」才是玩家读得懂的那条:
## 地上画的圈就是边界, 脚出去就安全。这个差异是有意的, 别改成身体半径,
## 否则圈外半步的人也会掉血, 而画面上完全看不出来。

## 贴地层的 z —— **不写死数字**, 在 _ready 里直接取 GroundTelegraph 的常量。
## 两个地面层各写一个 -5 的话, 调其中一个就会漂 (和 DEPTH_SCALE 同一条纪律)。
## 本节点因此**退出 y-sort**: 法阵永远画在角色下面, 不会被角色身体盖住一圈边。
## ⚠️ z_as_relative 必须关掉, 否则 -5 会相对父节点结算, 等于没改。

## 法阵的世界半径 (x, z 同一把尺子)。屏幕上自动是 2:1 椭圆。
@export var radius: float = 76.0
## 持续时长 (秒)
@export var duration: float = 3.0
## 每跳的间隔 (秒)。第一跳在**落阵的同一帧**发生 (见 _tick_timer 的初值)。
@export var tick_interval: float = 0.5
## 每跳伤害
@export var tick_damage: int = 1
## 一圈插几把剑 (纯视觉)
@export var blade_count: int = 6

## 法阵中心的世界坐标 (x, z)。**不随玩家移动。**
var world_center: Vector2 = Vector2.ZERO
## 判定范围。和绘制读的是**同一个对象** —— 这是本项目的核心不变量。
## ⚠️ 每次 spawn 都 new 一份, 不共享: AttackShape 是 Resource, 共享实例的话
##    任何一处「临时改半径试试」都会波及所有法阵 (和 player.light_shape 同一个理由)。
var shape: AttackShape = null

var _t: float = 0.0
## 距离下一跳的时间。**初值 0** = 落阵当帧先炸一次:
## 把阵丢在敌人脚下就应该立刻有反馈, 否则前 0.5 秒看起来像「放了没生效」。
var _tick_timer: float = 0.0
## 跳击闪光的剩余时间 (纯视觉)
var _pulse: float = 0.0
## 剑圈旋转角 / 跳击时的额外转速
var _rot: float = 0.0
var _rot_boost: float = 0.0


## 在 `at_world` 处落一座剑阵。`host` 是**世界层** (y-sort 根), 不是 FX 层 ——
## 法阵是场景物件, 不是一次性特效, 见文件头。
static func spawn(
	host: Node, at_world: Vector2, p_radius: float, p_duration: float,
	p_tick_interval: float, p_tick_damage: int
) -> SwordArray:
	if host == null or not host.is_inside_tree():
		return null

	var sa: SwordArray = SwordArray.new()
	sa.world_center = at_world
	sa.radius = p_radius
	sa.duration = p_duration
	sa.tick_interval = p_tick_interval
	sa.tick_damage = p_tick_damage
	host.add_child(sa)
	# ⚠️ 入树**之后**才设 global_position: 世界层本身有偏移时, 直接写 position 会跟着偏。
	#    这也是为什么 spawn 收的是「世界坐标」而不是「屏幕坐标」—— 换算只发生这一次。
	sa.global_position = BeltSpace.to_screen(at_world)
	return sa


func _ready() -> void:
	# ⚠️ 绝对 z —— 见文件头。开着 z_as_relative 的话这一条会静默失效。
	z_as_relative = false
	z_index = GroundTelegraph.GROUND_Z

	shape = AttackShape.make_circle(radius)
	add_to_group("sword_arrays")


func _physics_process(delta: float) -> void:
	_t += delta
	_pulse = maxf(0.0, _pulse - delta)
	_rot_boost = maxf(0.0, _rot_boost - delta * 3.0)
	_rot += (0.35 + _rot_boost * 10.0) * delta

	_tick_timer -= delta
	while _tick_timer <= 0.0:
		_tick()
		# ⚠️ 用 `+=` 而不是 `=` —— 掉帧时前者会补跳, 后者会把节奏整体拉长。
		_tick_timer += maxf(0.01, tick_interval)

	if _t >= duration:
		queue_free()
		return

	queue_redraw()


## 一跳: 对**当前**在圈里的所有敌人造成一次持续伤害。
##
## ⚠️ 这里**不检查高度带以外的东西** —— shape.contains 已经同时管了地面和高度。
##   敌人目前不会跳 (没有 height), 但用 contains 而不是 contains_ground 是为了
##   以后有飞行敌人时「跳/飞过法阵」自动成立, 不用回来改这里。
func _tick() -> void:
	_pulse = 0.3
	_rot_boost = 1.0
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		if not is_instance_valid(n) or n.is_queued_for_deletion():
			continue
		# ⚠️ 「谁能吃剑阵伤害」按**能力**认 (有没有 take_dot), 不按类认 ——
		#    这样以后加的召唤物/可破坏物只要实现 take_dot 就自动被覆盖。
		# ⚠️ 必须用 call(): n 的静态类型是 Node, 直接写 n.take_dot(...) 编译器会拒掉。
		if not n.has_method("take_dot"):
			continue
		var body: Node2D = n as Node2D
		if body == null:
			continue
		# 高度走和 AttackHitbox 一样的鸭子类型契约: 有 `height` 就读, 没有就是 0。
		# 所以以后加的飞行敌人只要暴露 height, 「飞过剑阵不吃伤害」自动成立 ——
		# 不要改成 contains_ground, 那样等于把这条能力永久写死。
		var h: Variant = body.get("height")
		var target_h: float = float(h) if h != null else 0.0
		if shape.contains(world_center, Facing.RIGHT, BeltSpace.to_world(body.global_position), target_h):
			n.call("take_dot", tick_damage)


# ============================================================
# 对外查询 —— 自检 / 敌人回避读这些, 不要自己再算一遍圆
# ============================================================

## 某个世界坐标是否在法阵里 (脚底判定, 见文件头)。
func contains_world(world_pt: Vector2) -> bool:
	if shape == null:
		return false
	return shape.contains_ground(world_center, Facing.RIGHT, world_pt)


## 还剩几秒。
func remaining() -> float:
	return maxf(0.0, duration - _t)


# ============================================================
# 绘制 —— 全部几何占位, 不引入任何美术资源
# ============================================================
const RING_COLOR: Color = Color(0.48, 0.84, 1.0)     ## 阵圈 (冷青)
const BLADE_COLOR: Color = Color(0.78, 0.92, 1.0)    ## 剑身 (偏白)


func _draw() -> void:
	if shape == null:
		return

	# 快到期时开始闪 —— 和罡气同一条理由: 「还剩多久」必须看得见,
	# 不然玩家会把「阵没了」读成「阵没用」。
	var left: float = duration - _t
	var fade: float = 1.0
	if left < 0.5:
		fade = clampf(left / 0.5, 0.0, 1.0)
		if fmod(left * 16.0, 2.0) >= 1.0:
			fade *= 0.45

	_draw_ground(fade)
	_draw_blades(fade)
	_draw_center_sigil(fade)


## 地面圈 —— 和判定**同一个半径**。
func _draw_ground(fade: float) -> void:
	var outer: PackedVector2Array = BeltSpace.ground_circle(radius, 48)
	draw_colored_polygon(outer, Color(RING_COLOR.r, RING_COLOR.g, RING_COLOR.b, 0.055 * fade))
	outer.append(outer[0])
	draw_polyline(outer, Color(RING_COLOR.r, RING_COLOR.g, RING_COLOR.b, 0.42 * fade), 1.6, true)

	# 内圈: 让「这是一块被圈住的地」更明确, 也给中心留出呼吸感
	var inner: PackedVector2Array = BeltSpace.ground_circle(radius * 0.62, 36)
	inner.append(inner[0])
	draw_polyline(inner, Color(RING_COLOR.r, RING_COLOR.g, RING_COLOR.b, 0.16 * fade), 1.0, true)

	# 落阵的扩散闪 (前 0.25 秒)
	if _t < 0.25:
		var p: float = _t / 0.25
		var flash: PackedVector2Array = BeltSpace.ground_circle(radius * (0.25 + 0.85 * p), 40)
		flash.append(flash[0])
		draw_polyline(flash, Color(0.85, 0.98, 1.0, (1.0 - p) * 0.75), 2.5, true)

	# 跳击的冲击环: 从内向外推出去, 读作「剑阵又斩了一圈」
	if _pulse > 0.0:
		var p2: float = 1.0 - clampf(_pulse / 0.3, 0.0, 1.0)
		var wave: PackedVector2Array = BeltSpace.ground_circle(radius * (0.5 + 0.5 * p2), 40)
		wave.append(wave[0])
		draw_polyline(wave, Color(0.75, 0.95, 1.0, (1.0 - p2) * 0.55 * fade), 2.0, true)


## 一圈插在地上的剑。剑身是**竖直**的, 所以不走 ground_circle 的压扁;
## 只有**落点**用 BeltSpace.to_screen 换算 (那才是地面上的位置)。
func _draw_blades(fade: float) -> void:
	var hot: float = clampf(_pulse / 0.3, 0.0, 1.0)
	var c: Color = BLADE_COLOR.lerp(Color(1.0, 1.0, 1.0), hot)
	var a: float = (0.62 + 0.35 * hot) * fade
	var n: int = maxi(3, blade_count)

	for i: int in range(n):
		var ang: float = TAU * float(i) / float(n) + _rot
		var dir: Vector2 = Vector2(cos(ang), sin(ang))
		# 落点 (屏幕偏移) —— 地面位置必须过压扁
		var base: Vector2 = BeltSpace.to_screen(dir * radius)
		# 剑尖朝**内**倒一点, 读作「阵」而不是「一圈围栏」
		var inward: Vector2 = -BeltSpace.to_screen(dir).normalized()
		var tip: Vector2 = base + inward * 5.0 + Vector2(0.0, -18.0)
		var side: Vector2 = Vector2(-inward.y, inward.x) * 2.2
		draw_colored_polygon(
			PackedVector2Array([base + side, tip, base - side]),
			Color(c.r, c.g, c.b, a))
		# 剑根一小段, 让「插在地上」这件事有一点点体积
		draw_line(base + Vector2(0.0, 2.0), base + Vector2(0.0, -3.0),
			Color(c.r, c.g, c.b, a * 0.55), 2.0)


## 中心的小法印 —— 旋转的菱形。纯装饰, 但它让阵有一个「核心」。
func _draw_center_sigil(fade: float) -> void:
	var s: float = 7.0 + _pulse * 10.0
	var pts: PackedVector2Array = PackedVector2Array([
		Vector2(0.0, -s), Vector2(s * 0.55, 0.0),
		Vector2(0.0, s), Vector2(-s * 0.55, 0.0),
	])
	pts.append(pts[0])
	var a: float = (0.30 + 0.45 * clampf(_pulse / 0.3, 0.0, 1.0)) * fade
	draw_polyline(pts, Color(RING_COLOR.r, RING_COLOR.g, RING_COLOR.b, a), 1.5, true)
