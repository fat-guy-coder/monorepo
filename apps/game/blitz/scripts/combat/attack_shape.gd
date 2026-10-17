extends Resource
class_name AttackShape
## 一个招式的**打击范围** —— 在「世界平面 (x, z)」上画出来的一个区域。
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep      — Area2D / CollisionShape2D
##   godot-2-5-collision2d      — ConvexPolygonShape2D 与凸性
##   godot-2-3-node2d-basics    — _draw() 画预警
##
## ────────────────────────────────────────────────────────────
## 🏗️ 为什么要有这个类 —— 它解决的是一个**结构性**问题
## ────────────────────────────────────────────────────────────
## v0.3 里「敌人起手预警」和「真的会打到你的判定框」是**两份数据**:
##   · enemy.gd `_draw_windup()` 按 `attack_reach` + `EnemyAttack.BOX_SIZE` 画一个矩形;
##   · enemy.gd `_enter_strike()` 按同样的两个量 new 一个 EnemyAttack。
## 靠「两个地方写同一组常量」维持一致 —— 这是**约定**, 不是**保证**。
## 只要有人改了其中一处, 就会出现「看着躲开了却被打中」。
## 而这类 bug 的可怕之处在于: 它不报错、不改玩法数值、只是**手感悄悄变坏**,
## 玩家只会说「判定不准」, 你盯着代码看一小时也看不出哪里不对。
##
## 现在改成: 一个招式 = **一个 AttackShape 实例**。预警画它、判定框建它、
## 自检断言它 —— 三方读的是**同一个对象**。漂移从「需要人守住」变成「写不出来」。
##
## ────────────────────────────────────────────────────────────
## 三种形状
## ────────────────────────────────────────────────────────────
##   RECT   —— 身前 `reach` 长 × `depth` 纵深宽。直刺/重劈。窄而远。
##   ARC    —— 半径 `reach` + 以朝向为轴 ±`half_angle_deg` 的扇形。横扫。
##   CIRCLE —— 半径 `reach` 的圆 (可偏移到身前)。践踏/落雷。等距视角下画成椭圆。
##
## ⚠️ 所有尺寸都是**世界单位** (见 belt_space.gd)。x 和 z 同一套单位,
##    所以「半径 60」在横向上是 60px, 在纵深上是 60 世界单位 = 屏幕上 30px。
##    在这里写屏幕单位, 纵深方向就会**看似**只有一半 —— 那是本文件存在的一半理由。
##
## ────────────────────────────────────────────────────────────
## ⚠️ 本类是纯数据 + 纯函数, 不持有任何节点
## ────────────────────────────────────────────────────────────
## 它不知道自己是挂在玩家还是敌人身上, 也不知道谁受伤 —— 那些是调用方的事。
## 保持无状态是为了让**同一个实例**能安全地被三方同时读 (见上面的 🏗️)。

enum Kind {
	RECT,    ## 矩形: 身前 reach × 纵深 depth
	ARC,     ## 扇形: 半径 reach, 朝向两侧各张开 half_angle_deg
	CIRCLE,  ## 圆: 半径 reach, 圆心可沿朝向偏移
}

## 形状类型。改它之后只有对应的那几个字段有意义 (见各自的注释)。
@export var kind: Kind = Kind.RECT

## 主尺寸 (世界单位), 按 kind 解释:
##   RECT   → 身前的长度 (从脚底算起)
##   ARC    → 半径
##   CIRCLE → 半径
@export var reach: float = 46.0

## **仅 RECT**: 纵深方向的总宽度 (世界单位)。站在同一个 x 上、纵深差在 ±depth/2 内算命中。
##
## 🏗️ 这个值决定「横向对位」有多宽容, 是横版手感的核心旋钮:
##   小了 → 必须站成一条线, 玩家觉得「明明打到了却没伤害」;
##   大了 → 一条线站撸通吃, 走位失去意义。
## 46 ≈ 世界 0.7 格 (格宽 64)。用户要的「离他几格纵深都能打到」在这里调。
@export var depth: float = 46.0

## **仅 ARC**: 以朝向为轴的半张角 (度)。
##
## ⚠️ 上限 90° —— 超过 90° 的扇形**不是凸多边形**, 而 ConvexPolygonShape2D 只吃凸的。
##    90° 就是「身前整个半圆」, 已经是横扫的极限; 想覆盖背后得开两个 shape 或换 RECT。
##    超了不会崩, 但物理体会静默退化成它的凸包 (凹进去的部分不判定) —— 又是一个
##    「预警画得对、判定悄悄少一块」的静默失败, 所以这里显式夹住。
@export var half_angle_deg: float = 80.0

## **仅 CIRCLE**: 圆心相对攻击者的偏移, 写在**攻击者的局部朝向系**里:
##   x = 沿朝向往前, y = 世界纵深 z。
## 这样「身前三格放一个圈」随朝向自动翻转, 不需要调用方每次自己乘 facing。
@export var offset: Vector2 = Vector2.ZERO

# ============================================================
# 高度带 —— 让跳跃变成一次真正的闪避
# ============================================================
## 能打到的**离地高度**区间 (世界单位)。目标的高度落在区间外 = 打不到。
##
## 🏗️ 这是「加跳跃」的主要收益: 敌人扫腿 (height 0~20) 可以被跳过去,
##    而防空技 (height 40~200) 专门打跳起来的人。
## 默认 -INF ~ +INF = 不限制 —— 也就是说**不设置就完全没有行为变化**,
##    已有的招式一条都不用改。第 5 步才逐个接上。
##
## ⚠️ 高度带**不在物理体里**判 —— Area2D 活在 2D 平面, 表达不了离地高度。
##    真正的判定点只有两个, 都属于**受击方**:
##      · 玩家打敌人 → AttackHitbox._try_hit 读 body 的 height;
##      · 敌人打玩家 → player._on_hurtbox_area_entered 读自己的 height。
##    所以「跳过去」永远由受伤的一方拿**自己的实际高度**去问 shape,
##    而不是靠几何自动成立。改受击判定时别忘了这两个出口是成对的。
@export var height_min: float = -INF
@export var height_max: float = INF


# ============================================================
# 工厂 —— 招式定义处用这三行把意图写清楚
# ============================================================

## 身前一块矩形。depth 是纵深总宽。
static func make_rect(p_reach: float, p_depth: float) -> AttackShape:
	var s: AttackShape = AttackShape.new()
	s.kind = Kind.RECT
	s.reach = p_reach
	s.depth = p_depth
	return s


## 朝向两侧各张开 half_angle 的扇形 (横扫)。
static func make_arc(p_radius: float, p_half_angle_deg: float) -> AttackShape:
	var s: AttackShape = AttackShape.new()
	s.kind = Kind.ARC
	s.reach = p_radius
	s.half_angle_deg = clampf(p_half_angle_deg, 0.0, 90.0)
	return s


## 一个圆。p_offset 写在局部朝向系里 (x 向前, y 为世界纵深), 见 `offset`。
static func make_circle(p_radius: float, p_offset: Vector2 = Vector2.ZERO) -> AttackShape:
	var s: AttackShape = AttackShape.new()
	s.kind = Kind.CIRCLE
	s.reach = p_radius
	s.offset = p_offset
	return s


## 链式设置高度带。返回 self 方便一行写完:
##   AttackShape.make_arc(60, 80).band(0.0, 24.0)
func band(lo: float, hi: float) -> AttackShape:
	height_min = lo
	height_max = hi
	return self


# ============================================================
# 判定 —— 纯地面数学, 和画出来的东西**同源**
# ============================================================

## 目标高度是否落在高度带内。默认带是 ±INF, 所以不设置就恒为 true。
func hits_height(target_height: float) -> bool:
	return target_height >= height_min and target_height <= height_max


## 把世界空间的「相对攻击者的偏移」化到局部朝向系 (x 向前, y 纵深)。
##
## 🏗️ 全部判定都先过这一步, 于是左右朝向只影响这一个乘法 ——
##    形状本身永远按「朝右」定义, 不用为朝向写两套分支。
func _to_local(facing: int, world_delta: Vector2) -> Vector2:
	var f: float = -1.0 if facing < 0 else 1.0
	return Vector2(world_delta.x * f, world_delta.y)


## 目标是否在范围内。**纯地面判定, 不管高度**。
##
## `attacker_world` / `target_world` 是 (x, z) 世界坐标;
## `facing` 只取符号 (+1 / -1)。
##
## ⚠️ 用 `acos` 而不是 `dot > cos(half)` 直判, 是因为前者能顺带算出角度给人看
##    (自检失败时要打印「差了多少度」, 只有余弦值根本读不出来)。
func contains_ground(attacker_world: Vector2, facing: int, target_world: Vector2) -> bool:
	var d: Vector2 = _to_local(facing, target_world - attacker_world)

	match kind:
		Kind.RECT:
			# 只算身前: 背后不算。身前的边界用 >= 0 (脚踩在线上算命中)。
			return d.x >= 0.0 and d.x <= reach and absf(d.y) <= depth * 0.5
		Kind.ARC:
			var r: float = d.length()
			if r > reach:
				return false
			if r < 0.0001:
				return true          # 和攻击者原点重合 —— 在扇形里
			var ang: float = rad_to_deg(acos(clampf(d.x / r, -1.0, 1.0)))
			return ang <= half_angle_deg
		Kind.CIRCLE:
			return (d - offset).length() <= reach
	return false


## 完整判定 (地面 + 高度带)。这是给「预判/自检」用的**纯函数**版本 ——
## 真正结算伤害走的是 AttackHitbox 的物理体, 两者必须给出同样的答案
## (smoke_test 的 `_check_attack_shape` 会逐点比对, 见那份自检的注释)。
func contains(
	attacker_world: Vector2, facing: int, target_world: Vector2, target_height: float = 0.0
) -> bool:
	return hits_height(target_height) and contains_ground(attacker_world, facing, target_world)


# ============================================================
# 物理体 —— 给 Area2D 用
# ============================================================

## 建出能塞进 CollisionShape2D 的形状。坐标系是**攻击者的局部屏幕系**
## (攻击者原点 = 节点原点), 所以调用方应当把 Area2D 直接挂在攻击者位置,
## 不要再沿朝向偏移 —— 偏移已经包含在形状/偏移量里了。
##
## ⚠️ 必须传 facing, **不能**靠给 Area2D 设 `scale.x = -1` 来翻转:
##    2D 物理对**非均匀/负缩放**的碰撞体支持是有坑的 (Godot 只保证均匀正缩放可靠),
##    而且那种失败是「某些角度不判定」, 属于最难查的一类。
##    朝左就重算一份顶点 —— 反正判定框只活 0.15 秒, 这点开销不存在。
##
## ⚠️ 圆的物理体必须走 `BeltSpace.ground_circle_shape()` 而**不能**用 CircleShape2D:
##    CircleShape2D 是屏幕空间的真圆, 画出来却是压扁的椭圆 ——
##    「看着躲开了却被打中」会在纵深方向上出现整整一倍。这是第一阶段定下的规则。
func build_collision_shape(facing: int = 1) -> Shape2D:
	match kind:
		Kind.RECT:
			var rect: RectangleShape2D = RectangleShape2D.new()
			# 纵深在屏幕上只占 DEPTH_SCALE 倍 —— 物理体活在屏幕空间, 必须在这里压。
			rect.size = Vector2(reach, depth * BeltSpace.DEPTH_SCALE)
			return rect
		Kind.ARC:
			var poly: ConvexPolygonShape2D = ConvexPolygonShape2D.new()
			poly.points = _world_deltas_to_screen(_arc_vertices(), facing)
			return poly
		Kind.CIRCLE:
			# 48 段而不是 ground_circle 的默认 24: 同一个内接折线问题 (见 _arc_steps),
			# 24 段在 R=40 时误差 0.34px、R=200 的落雷就是 1.7px。判定用的这个圆
			# 值得多给一倍点数 —— 它一场战斗可能只建十几次。
			return BeltSpace.ground_circle_shape(reach, 48)
	return RectangleShape2D.new()


## 形状的**中心**相对攻击者原点(脚下)的偏移 (屏幕空间)。
##
## RECT 的 RectangleShape2D 是**以自身中心**为原点的, 所以要往身前推 reach/2;
## CIRCLE 推到它的圆心; ARC 的多边形顶点就在攻击者身上, 不偏移。
##
## ⚠️ 这是**物理体摆放**用的量, 不是「把整块形状挪一挪」的量。
##    `telegraph_points()` 已经把它烘焙进多边形了 (CIRCLE 那支直接调本函数),
##    所以调用方要是拿它去挪预警绘制, 偏移就会被算**两遍** ——
##    表现是预警圈落在离真实伤害 132px 的地方, 而画面上看起来一切正常。
##    两条消费者 (AttackHitbox 的 CollisionShape2D、LightningBolt 的落点)
##    都只把它当「中心在哪」用, 谁都不自己加第二次。
func collision_offset(facing: int = 1) -> Vector2:
	match kind:
		Kind.RECT:
			# ⚠️ 只有 x 偏移, 纵深方向不偏。写成 `to_screen(...)` 会把这一半也算进去,
			#    于是朝左时矩形纵向错位 —— 因为纵深分量根本不该被朝向翻转。
			return Vector2(reach * 0.5 * (-1.0 if facing < 0 else 1.0), 0.0)
		Kind.CIRCLE:
			return BeltSpace.to_screen(_to_local(facing, offset))
	return Vector2.ZERO


# ============================================================
# 绘制 —— 预警 / 调试可视化
# ============================================================

## 地面上的多边形顶点 (屏幕空间, **相对 origin**)。预警和调试框都用它。
##
## `origin_screen` 是攻击者在**调用方画布坐标系**里的位置。
## 世界偏移 → 屏幕偏移这一步是线性的, 所以不管画布自身怎么变换都成立 ——
## 挂在攻击者身上画 (传入 Vector2.ZERO) 和挂在世界层画 (传入世界坐标) 结果一致。
func telegraph_points(origin_screen: Vector2, facing: int) -> PackedVector2Array:
	match kind:
		Kind.RECT:
			# 矩形按「朝右」摆好四点, 再统一过 _world_deltas_to_screen (它会翻转 + 压扁)。
			var hd: float = depth * 0.5
			var local: PackedVector2Array = PackedVector2Array([
				Vector2(0.0, -hd), Vector2(reach, -hd),
				Vector2(reach, hd), Vector2(0.0, hd),
			])
			return _shift(_world_deltas_to_screen(local, facing), origin_screen)
		Kind.ARC:
			return _shift(_world_deltas_to_screen(_arc_vertices(), facing), origin_screen)
		Kind.CIRCLE:
			# ground_circle 直接产出**屏幕空间**的椭圆点, 不用再压一次。
			var pts: PackedVector2Array = BeltSpace.ground_circle(reach, 24)
			# 调 collision_offset 而不是把那个式子再写一遍 —— 写法上只差一行,
			# 但它把「圆心只有一个来源」从**约定**变成了**事实**。
			var off: Vector2 = collision_offset(facing)
			for i: int in range(pts.size()):
				pts[i] += off
			return _shift(pts, origin_screen)
	return PackedVector2Array()


## 扇形**扫过的一段扇环** (屏幕空间, 相对 origin)。刀光的拖尾就是它。
##
## `from_deg` / `to_deg` 是相对朝向的角度 (0 = 正前方), 顺序任意;
## `inner_ratio` 是扇环内缘占半径的比例 (0.35 = 从 35% 半径处开始有刀光)。
##
## 🏗️ 为什么拖尾要由 shape 算, 而不是在 player.gd 里另写一套极坐标:
##    刀光画的半径和判定用的半径是同一个数 —— 改了 `light_sweep_radius`,
##    刀光跟着变。分开写的话, 调完手感就会出现「刀光扫到腰那么高, 判定却只到膝盖」,
##    而那看起来像是判定有 bug。
##
## ⚠️ 非 ARC 形状返回空数组 (没有「扫过」这回事)。
func sweep_trail_points(
	origin_screen: Vector2, facing: int, from_deg: float, to_deg: float, inner_ratio: float = 0.35
) -> PackedVector2Array:
	if kind != Kind.ARC:
		return PackedVector2Array()
	var lo: float = minf(from_deg, to_deg)
	var hi: float = maxf(from_deg, to_deg)
	var n: int = maxi(3, int(ceil((hi - lo) / 7.5)) + 1)
	var inner: float = reach * clampf(inner_ratio, 0.0, 0.98)

	var pts: PackedVector2Array = PackedVector2Array()
	# 外缘 正着扫一遍
	for i: int in range(n):
		pts.append(polar_to_screen(lerpf(lo, hi, float(i) / float(n - 1)), reach, facing))
	# 内缘 倒着扫回来, 首尾就自然接成一个闭合的环带
	for i: int in range(n - 1, -1, -1):
		pts.append(polar_to_screen(lerpf(lo, hi, float(i) / float(n - 1)), inner, facing))
	return _shift(pts, origin_screen)


## 极坐标 (角度相对朝向, 半径是世界单位) → 屏幕偏移。
## ⚠️ 角度只在**世界平面**里转, 压扁发生在最后一步 —— 反过来的话扫出来的
##    就不是椭圆弧而是某种斜的怪形状。
##
## 公开 (而不是 `_`): 它有一个**绘制侧**的用处 —— 「弧上某个角度的那一点」。
## 敌人的起手预览要画一条指向「刀现在扫到哪儿」的前缘线, 而那条线必须落在
## 判定弧的同一个角度上。在调用方手写一遍 cos/sin + 翻转 + 压扁,
## 就等于把这里的几何抄了第二份 —— 而抄错的表现是「预警的刀刃指着一个判定够不到的方向」,
## 画面上看起来完全正常。
func polar_to_screen(angle_deg: float, radius: float, facing: int) -> Vector2:
	var a: float = deg_to_rad(angle_deg)
	return BeltSpace.to_screen(_to_local(facing, Vector2(cos(a), sin(a)) * radius))


## 把形状半透明画在地上 —— 敌人起手的预警、F1 面板的调试框都用这一个函数。
##
## 🏗️ 这就是整件事的落点: 预警和判定**不可能对不上**, 因为画的和判的是同一个对象。
func draw_telegraph(
	canvas: CanvasItem, origin_screen: Vector2, facing: int, fill: Color, line: Color = Color(0, 0, 0, 0)
) -> void:
	var pts: PackedVector2Array = telegraph_points(origin_screen, facing)
	if pts.size() < 3:
		return
	canvas.draw_colored_polygon(pts, fill)
	if line.a > 0.0:
		var loop: PackedVector2Array = pts.duplicate()
		loop.append(pts[0])          # draw_polyline 不自动闭合
		canvas.draw_polyline(loop, line, 1.5, true)


# ------------------------------------------------------------
# 内部几何
# ------------------------------------------------------------

## 世界偏移 (局部朝向系) → 屏幕偏移。压扁只发生在这里, 且只发生一次。
func _world_deltas_to_screen(deltas: PackedVector2Array, facing: int) -> PackedVector2Array:
	var out: PackedVector2Array = PackedVector2Array()
	for d: Vector2 in deltas:
		out.append(BeltSpace.to_screen(_to_local(facing, d)))
	return out


func _shift(pts: PackedVector2Array, origin_screen: Vector2) -> PackedVector2Array:
	if origin_screen == Vector2.ZERO:
		return pts
	var out: PackedVector2Array = pts.duplicate()
	for i: int in range(out.size()):
		out[i] += origin_screen
	return out


## 扇形采样点数 —— **每 5° 一个点**。
##
## ⚠️ 这个密度不是随便定的, 它直接决定「预警画的范围」和「物理体判的范围」差多少。
##    物理体是**内接折线**, 圆弧被一根根弦代替, 而弦永远在弧的内侧 ——
##    于是物理体比 `contains_ground()` 的解析判定**略小**, 差距 = 弓高:
##
##        sagitta = R × (1 − cos(半步长))
##        5° 一档 → R=100 时 0.095px;  15° 一档 → 0.86px
##
##    0.86px 意味着: 站在扇形边缘上, 预警圈会说你被扫到了、判定却说没有。
##    单次无所谓, 但它是「看着躲开了却被打中 / 看着被扫到却没掉血」的**同类**,
##    而且是随 R 增大的。5° 一档把误差压到屏幕上一个像素的十分之一, 彻底退出感知。
##    (smoke_test 里那条逐点比对的一致性断言, 就是靠这个密度才敢开到 0.25 的容差。)
func _arc_steps() -> int:
	return maxi(4, int(ceil(half_angle_deg / 5.0)) + 1)


## 扇形顶点 (世界局部系, 未压扁)。含圆心顶点, 除非张角正好 90°
## (那时圆心落在两端点的连线上, 是个共线冗余点, 留着会让某些凸包实现抱怨)。
func _arc_vertices() -> PackedVector2Array:
	var pts: PackedVector2Array = PackedVector2Array()
	if half_angle_deg < 89.9:
		pts.append(Vector2.ZERO)
	var n: int = _arc_steps()
	for i: int in range(n):
		var a: float = deg_to_rad(lerpf(-half_angle_deg, half_angle_deg, float(i) / float(maxi(1, n - 1))))
		pts.append(Vector2(cos(a), sin(a)) * reach)
	return pts


## 给人读的一行摘要 —— 自检失败和调试面板都要能一眼看出「这是哪个形状」。
func describe() -> String:
	match kind:
		Kind.RECT:
			return "RECT(身前 %.0f × 纵深 %.0f)" % [reach, depth]
		Kind.ARC:
			return "ARC(半径 %.0f, ±%.0f°)" % [reach, half_angle_deg]
		Kind.CIRCLE:
			return "CIRCLE(半径 %.0f, 偏移 %s)" % [reach, str(offset)]
	return "?"
