extends Node2D
class_name LightningBolt
## 落雷 —— 纯视觉, 但**和伤害判定读同一个 shape**
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() 每帧重绘
##   godot-1-12-static-typing — static 工厂
##   godot-2-5-collision2d    — 为什么视觉和判定必须同源
##
## 🎮 这一招的设计 (用户原话: 「闪电从空中落下然后在区域内造成伤害」):
##   面朝方向一定距离处**先出现一个圈**, 过 0.38 秒雷才落下来。
##   延迟不是拖沓, 是这一招**唯一的代价** —— 伤害高、范围内全中、还能隔着一个身位打,
##   如果瞬发就没有理由不用它。有了延迟, 敌人有 0.38 秒可以走出圈,
##   于是「什么时候放」变成一个真的决策 (预判敌人的走位, 或者趁它出招硬直)。
##
## 🏗️ 为什么这个 FX 要拿到整个 AttackShape 而不是一个半径:
##   它画的预警圈必须**和判定圈一模一样** —— 包括那个「圆心在身前 132 处」的偏移。
##   传半径的话, 调用方得自己算圆心、自己压扁, 于是同一个圆被算了两遍;
##   两遍就会漂移, 而漂移的表现是「站在圈边上没被劈到」。
##   拿 shape 的话, 圆心和半径都只有一份来源 (见 attack_shape.gd 文件头)。
##
## 🏗️ 为什么挂在 FX 层 (z_index 40) 而不是 y-sort 的世界层:
##   这是**预警**, 不是场景物件。被角色挡住一小块就失去了预警的意义。
##   代价是它会盖在角色身上 —— 所以沉降期的填充色压得很淡, 只有描边是亮的。
##
## ⚠️ 它**不造成任何伤害**。伤害由 player.gd 生成的那个 AttackHitbox 负责
##    (带 arm_delay, 到点才开张)。两者由同一次出招同时创建、同一个 shape,
##    生命周期也一致 —— 但职责是分开的: 这个只管「看起来像雷」, 那个只管「谁掉血」。
##
## 🏗️ 摆放规则 (和 AttackHitbox 完全一致, 所以两个消费者不可能各偏各的):
##    **节点挂在攻击者脚下**, 形状在身前哪儿由 `shape.collision_offset()` 说了算。
##    `draw_telegraph` / `telegraph_points` 的 origin 合同就是「攻击者脚下」,
##    所以这里传的是 Vector2.ZERO —— 一个偏移都不自己算。
##    (第一版反过来: 节点摆在落点上、再传 Vector2.ZERO, 于是圆心偏移被算了**两遍**,
##     预警圈落在离真实伤害 132px 的地方。两个消费者读同一份数据 ≠ 两个消费者
##     按同一条规则摆放 —— 后者才是真正要守的那条。)

## 雷电折线的段数 —— 越多越细碎。9 段在屏幕上刚好「看得出来是折的」又不至于像噪声。
const SEGMENTS: int = 9
## 从画面上方多高的地方劈下来
const SKY_HEIGHT: float = 620.0
## 折线的横向抖动幅度
const JITTER: float = 26.0

## 落点范围内那个圈。**和伤害判定是同一个对象** (见文件头 🏗️)。
@export var shape: AttackShape = null
## 圈的朝向 —— 圆本身不吃朝向, 但圆心偏移吃 (「面朝方向一定距离处」)。
@export var facing: int = 1
## 落地前的预警时长 (秒)。必须和 AttackHitbox.arm_delay **一致**,
## 否则会出现「圈还没亮就劈下来了」或者「雷劈完了圈还在」——
## 而后者会让人以为那一圈还有伤害。
@export var arm_delay: float = 0.38
## 落地后的闪光时长
@export var flash_time: float = 0.22

var _t: float = 0.0
var _total: float = 0.0


## 在 `at` 处劈一道雷。⚠️ `at` 是**攻击者脚下**的坐标, **不是**落点 ——
## 落点由 shape 自己算 (`collision_offset`), 见文件头那条摆放规则。
static func spawn(
	tree: SceneTree, at: Vector2, p_shape: AttackShape, p_facing: int,
	p_arm: float, p_flash: float = 0.22
) -> LightningBolt:
	if tree == null:
		return null
	var host: Node = tree.get_first_node_in_group("fx_layer")
	if host == null:
		host = tree.current_scene
	if host == null:
		return null

	var fx: LightningBolt = LightningBolt.new()
	fx.position = at
	fx.shape = p_shape
	fx.facing = p_facing
	fx.arm_delay = p_arm
	fx.flash_time = p_flash
	# z_index 高于 HitSpark(20) 和 Fx 层(40) 默认 —— 雷光该盖住一切
	fx.z_index = 30
	host.add_child(fx)
	return fx


func _ready() -> void:
	_total = arm_delay + flash_time
	# ⚠️ 用 SceneTreeTimer 而不是自己数秒到点销毁, 和 HitSpark 同一套约定。
	#    这里多一层理由: 玩家被冰冻/暂停时, 预警圈**不能**跟着停下来 ——
	#    它是一份「到点就发生」的承诺, 停下来就是在骗人。
	#    (伤害那边由 AttackHitbox 自己数秒, 它同样不受暂停影响。)
	var t: SceneTreeTimer = get_tree().create_timer(_total)
	t.timeout.connect(queue_free)


## 是否还在「圈亮着、雷没落」的阶段。调用方用它判断能不能把这一发撤销 ——
## 已经劈下来的雷不该被抹掉 (伤害都出去了, 抹掉视觉只会让人以为没打中)。
func is_pending() -> bool:
	return _t < arm_delay


func _process(delta: float) -> void:
	_t += delta
	queue_redraw()


func _draw() -> void:
	if _t < arm_delay:
		_draw_warning(_t / maxf(0.001, arm_delay))
	else:
		_draw_impact(clampf((_t - arm_delay) / maxf(0.001, flash_time), 0.0, 1.0))


## 落点在**本地坐标**里的位置 = shape 相对攻击者(也就是本节点)的圆心偏移。
##
## ⚠️ 本节点自己不算偏移, 只是把 shape 已经写好的那个数取出来用 ——
##    这就是「预警和判定同源」在视觉侧的落实: 落点、圈、伤害三者只有一个来源。
func _zone_center() -> Vector2:
	if shape == null:
		return Vector2.ZERO
	return shape.collision_offset(facing)


## 落地前: 地上的圈 + 从天上劈下来的那条光柱
func _draw_warning(p: float) -> void:
	# ① 地上的圈 —— 直接用 shape 自己画, 和判定同源。
	#    origin 传 Vector2.ZERO 是因为本节点就挂在攻击者脚下 (见文件头摆放规则),
	#    而 CIRCLE 的圆心偏移是**烘焙在多边形里**的, 所以这里一个偏移都不加。
	if shape != null:
		# 越接近落地越亮: 这个「越来越亮」是玩家判断「还剩多久」的唯一线索,
		# 比任何进度条都好用 —— 它就在你要躲的那个东西上。
		var glow: float = 0.10 + p * p * 0.35
		shape.draw_telegraph(
			self, Vector2.ZERO, facing,
			Color(0.55, 0.80, 1.0, glow * 0.55),
			Color(0.75, 0.92, 1.0, 0.35 + p * 0.55))

	# ② 光柱: 从天上劈到**落点**, 尖端随进度下降
	var c: Vector2 = _zone_center()
	var tip_y: float = -SKY_HEIGHT * (1.0 - p * p)   # 二次: 前段慢、后段猛地砸下来
	var pts: PackedVector2Array = PackedVector2Array()
	for i: int in range(SEGMENTS + 1):
		var f: float = float(i) / float(SEGMENTS)
		# 抖动随帧变化 → 折线一直在换形状 = 闪电的闪烁感。
		# ⚠️ 用**帧号**做相位而不是 randf(): 每帧重画都调 randf 会让折线每帧完全换一套,
		#    在 60Hz 下看起来是白噪声而不是牵引的电弧。用帧号当相位, 相邻帧只差一点,
		#    折线呈现「扭动」而不是「闪烁」。
		var wobble: float = sin(float(Engine.get_process_frames()) * 0.9 + float(i) * 2.7)
		# 越靠近落点抖动越小 —— 接地的那一端应该是准的, 不然会引起「到底打哪」的困惑
		var amp: float = JITTER * wobble * (1.0 - f) * (1.0 - f) * (0.4 + 0.6 * (1.0 - p))
		pts.append(Vector2(c.x + amp, c.y + lerpf(tip_y, 0.0, f)))

	# 外层光晕 (粗、淡) + 内层芯 (细、白) —— 两笔叠出「发光」的观感
	var a: float = 0.30 + p * 0.45
	draw_polyline(pts, Color(0.45, 0.70, 1.0, a * 0.45), 9.0, true)
	draw_polyline(pts, Color(0.80, 0.92, 1.0, a), 3.0, true)
	draw_polyline(pts, Color(1.0, 1.0, 1.0, a * 0.9), 1.2, true)

	# ③ 落点高亮: 越接近越亮的一个小核
	if p > 0.55:
		var k: float = (p - 0.55) / 0.45
		draw_circle(c, 6.0 + 8.0 * k, Color(0.9, 0.97, 1.0, k * 0.55))


## 落地的一瞬: 一圈冲击波 + 白闪
func _draw_impact(r: float) -> void:
	# 冲击波沿**地面平面**扩散 —— 用压扁后的椭圆, 而不是屏幕上的正圆。
	# ⚠️ 画成正圆的话, 那一圈看起来像是「浮在空中的球」, 和它实际覆盖的地面
	#    对不上; 而这一招的全部玩法就是「判断这一圈覆盖了哪块地」。
	var c: Vector2 = _zone_center()
	var fade: float = 1.0 - r
	var wave_r: float = 46.0 * (0.35 + r * 0.9)
	var ring: PackedVector2Array = BeltSpace.ground_circle(wave_r, 40)
	for i: int in range(ring.size()):
		ring[i] += c
	draw_colored_polygon(ring, Color(0.85, 0.95, 1.0, 0.30 * fade * fade))
	var loop: PackedVector2Array = ring.duplicate()
	loop.append(ring[0])
	draw_polyline(loop, Color(1.0, 1.0, 1.0, 0.85 * fade), 3.0, true)

	# 核心白闪: 前 30% 收缩得很快 (闪电的「一下」感全在这)
	draw_circle(c, 30.0 * fade * fade, Color(1.0, 1.0, 1.0, 0.75 * fade))
	draw_circle(c, 14.0 * fade, Color(0.75, 0.88, 1.0, 0.55 * fade))
