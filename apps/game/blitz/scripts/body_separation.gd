extends RefCounted
class_name BodySeparation
## 角色之间的物理体积 —— 世界平面上的圆形分离
##
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d     — CharacterBody2D / move_and_slide 之后位置才是本帧最终值
##   godot-1-14-builtin-math-types — Vector2 点积 / 归一化 / 零向量兜底
##   godot-2-5-collision2d         — 碰撞体与碰撞层 (以及**为什么这里不用**它们)
##
## 🏗️ 为什么不让两个身体直接互撞 (layer/mask 明明能做到, 却故意不做):
##
##   CollisionShape2D 活在**屏幕**空间 —— 引擎只认这一套。而「两个人有没有占同一块地」
##   是个**世界**问题: 屏幕 y 走 1 格, 世界里是 2 格纵深 (见 belt_space.gd)。
##   直接开 layer/mask 让两个身体互撞, 纵深方向就会按**压扁后**的像素算:
##   敌人会停在「画面上贴着、世界里差一格」的位置 —— 和攻击范围踩的是同一个坑。
##   (改形状也不行: 玩家身体那个屏幕圆还被边界墙的摆位依赖着, 见 player.gd _ready 的警告。)
##
##   所以体积和判定范围走同一条纪律: **世界空间里算, 写回位置时换算一次**。
##
## 🏗️ 为什么由 main 每物理帧统一调一次, 而不是各自在自己的 _physics_process 里推:
##
##   ① 每对只该结算**一次**。两边各推一次 = 推开两倍, 看起来像被弹开。
##   ② 谁让路必须由**速度**决定: 正在往里挤的那个退出去, 站着不动的那个不受影响。
##      只按半径对半分的话, 敌人走过来就能把玩家一路顶穿地图 —— 比重合更难解释。
##
## ⚠️ 调用时机在 move_and_slide **之后** (main 的 process_physics_priority 更大),
##    所以这里改的已经是本帧最终位置, 不会被同帧的 move_and_slide 覆盖。
##    它**不管墙**: 被推到墙里是极端情况, 下一帧的 move_and_slide 会重新贴合。


## 玩家 vs 所有敌人 + 敌人之间。main 每物理帧调一次。
##
## ⚠️ 参数故意**不静态类型化**: 这里要的是鸭子类型 —— 玩家和敌人是两棵不同的类树,
##    共同契约只有 `body_radius()` / `is_separable()` 两个方法。写成 CharacterBody2D
##    的话, 这两个方法在基类上不存在, 编译期就过不去。
static func resolve_all(player, enemies: Array) -> void:
	if not _usable(player):
		return
	var live: Array = []
	for n in enemies:
		if _usable(n):
			live.append(n)
	for e in live:
		resolve_pair(player, e)
	for i: int in range(live.size()):
		for j: int in range(i + 1, live.size()):
			resolve_pair(live[i], live[j])


## 把一对重叠的角色沿世界连线推开。
##
## ⚠️ **一对只调一次**。别在两个人的 _physics_process 里各调一遍 —— 那样会推开两倍。
static func resolve_pair(a, b) -> void:
	if not _usable(a) or not _usable(b) or a == b:
		return
	var min_d: float = a.body_radius() + b.body_radius()
	if min_d <= 0.0:
		return

	var wa: Vector2 = BeltSpace.to_world(a.global_position)
	var wb: Vector2 = BeltSpace.to_world(b.global_position)
	var d: Vector2 = wa - wb
	var dist: float = d.length()
	if dist >= min_d:
		return

	# 法线: 从 b 指向 a。
	# 完全重合时没有方向可用 —— 用 instance_id 定一个方向: 至少要**确定**
	# (同一份输入必须得到同一份输出, 否则自检和调试都没法复现)。
	var n: Vector2
	if dist > 0.001:
		n = d / dist
	else:
		n = Vector2(1.0 if a.get_instance_id() > b.get_instance_id() else -1.0, 0.0)

	var overlap: float = min_d - dist

	# 谁在往里挤 —— 速度在法线上的**朝里**分量。
	# n 从 b 指向 a, 所以「a 朝 b 走」是 dot < 0, 「b 朝 a 走」是 dot > 0。
	#
	# ⚠️ velocity 是屏幕向量, 必须换到世界再点乘: 不换的话纵深方向的挤压力
	#    只有横向的一半, 于是「从侧面顶」和「从上下顶」会让路让得不一样多。
	var inward_a: float = maxf(0.0, -BeltSpace.to_world(a.velocity).dot(n))
	var inward_b: float = maxf(0.0, BeltSpace.to_world(b.velocity).dot(n))
	var total: float = inward_a + inward_b

	# 都没在动 (瞬移/出生时叠在一起) → 对半分。有速度就按「谁挤得更凶」分。
	var share_a: float = 0.5
	if total > 0.001:
		share_a = inward_a / total

	a.global_position += BeltSpace.to_screen(n * (overlap * share_a))
	b.global_position -= BeltSpace.to_screen(n * (overlap * (1.0 - share_a)))


## 能参与体积分离吗 —— 死了的不算 (尸体不该把活人顶开)。
static func _usable(n) -> bool:
	if n == null or not is_instance_valid(n):
		return false
	if not n.has_method("body_radius") or not n.has_method("is_separable"):
		return false
	return n.is_separable()
