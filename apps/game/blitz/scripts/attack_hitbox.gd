extends Area2D
class_name AttackHitbox
## 攻击判定框 — 短命的 Area2D, 存在 0.1~0.4 秒
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep     — Area2D 深入: monitoring / body_entered / overlapping
##   godot-6-4-collision-layers — bit 位精确控制碰撞关系
##   godot-1-8-signals-basics   — 自定义信号: 把「打中了」广播给玩家/相机
##   godot-2-5-collision2d      — 碰撞形状: RectangleShape2D / ConvexPolygonShape2D
##   godot-2-3-node2d-basics    — _draw() 画调试用的判定范围
##
## ⚠️⚠️ 本文件原本有一个**致命 bug**, 是更早一次重写修掉的:
##   旧代码第 97 行调用了 `shape_owner_get_shapes(shape_owner)` —— 那是 **Godot 3** 的 API,
##   Godot 4 里根本不存在。后果不是「画不出调试框」那么轻: 脚本**解析期**就报错,
##   整个 attack_hitbox.gd 加载失败, 于是**轻攻击完全失效** —— 按 J 什么都不发生,
##   而控制台只刷一行看不懂的报错。这就是「跨大版本升级时残留的隐式 API」,
##   它不会告诉你哪里错, 只会让一个功能凭空消失。
##   Godot 4 的替代: `shape_owner_get_shape_count(owner)` + `shape_owner_get_shape(owner, idx)`,
##   或者 —— 更简单也更稳 —— 直接读子节点 CollisionShape2D 的 shape。本文件用后者。
##
## 🎮 设计:
##   判定框在玩家面前生成, 持续极短时间后自毁, 模拟「刀光一闪」。
##   命中谁 → 把伤害 + 「我从哪来」告诉对方, **由对方自己算击退**。
##
## 🏗️ 为什么击退方向由受击方算, 而不是攻击方直接改 velocity:
##   攻击方算的话得知道对方的「前方」是哪儿 (旧版就是 `body.position.x > position.x` 这种
##   一维判断 —— 八个方向下会退错方向: 从正上方砍下来会被往左/右弹)。
##   改成把攻击点坐标传给受击方, 受击方用 `(自己 - 攻击点)` 求方向 —— 所有方向全对,
##   而且「受击怎么表现」这件事集中在一个地方 (player.take_damage / enemy.take_damage)。
##
## 🏗️ 碰撞层: layer = bit2 (玩家攻击), mask = bit1 (敌人身体)。
##   mask 里**没有** bit4(墙) —— 攻击不该被墙挡住。刀气穿墙是这个阶段的合理简化。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 形状从哪来 (第二轮重构)
## ────────────────────────────────────────────────────────────
##   判定范围不再存在 **独立变量** 里 —— 它整份来自一个 `AttackShape`
##   (combat/attack_shape.gd)。调用方 new 一个 shape、同时把它交给判定框和预警绘制,
##   于是「画出来的范围」和「真的会打到的范围」是**同一个对象**, 结构上不可能漂移。
##   本文件因此从「一个认尺寸的框」变成「一个执行 shape 的东西」——
##   它不再关心自己是什么形状。
##
## ⚠️ 本节点的 position 必须是**攻击者脚下原点**, 不要再沿朝向偏移。
##   偏多少已经写在 shape 里 (见 AttackShape.collision_offset)。两处都偏 = 偏两次。

## 命中时发出。main.gd 用它震屏, 玩家用它转发 (命中反馈的一半来自镜头)
signal hit_landed(at: Vector2, direction: Vector2)

@export var damage: int = 1
## 判定框存在时长 (秒)。由 player.gd 按 attack_duration 传入。
## ⚠️ 必须在 add_child **之前**设好 —— `_ready()` 会读它做倒计时初值。
@export var lifetime: float = 0.15
## 命中几个目标后就自毁 (0 = 不限)。轻击打单个目标, 免得一刀扫穿一排敌人。
@export var max_targets: int = 1
## 画出判定范围。默认关 —— 玩家已经画了刀光弧线, 这个只用于调判定。
@export var show_debug_rect: bool = false

## 是否是**破霸体**的招 (满蓄重击)。原样透传给受击方的 take_damage,
## 由**受击方**决定「这一下打不断我的出招」—— 判定权留在受伤方 (见文件头 🏗️)。
@export var breaks_armor: bool = false

## 这一招的范围。null = 用场景里那个兜底的 46×34 矩形 (只有手工摆的判定框才会走到)。
@export var attack_shape: AttackShape = null

## 判定框沿 x 的朝向 (+1 / -1)。**必须在 add_child 之前设** —— `_ready()` 要拿它建形状。
##
## ⚠️ 为什么要显式传, 而不是读父节点的 facing:
##   父节点是玩家的 Node2D, 结构随时可能变 (加一层容器就静默失效)。
##   判定框只活 0.15 秒, 出招那一瞬间的朝向就是唯一的真相 —— 存下来最诚实。
@export var facing: int = 1

## 蓄势时间 (秒)。大过 0 的话, 前 `arm_delay` 秒内**打不到任何人**。
##
## 🏗️ 存在的理由是「落雷」这类**延迟生效**的招: 圈先画在地上, 过一会儿才炸。
##   没有它的话, 延迟就只能靠调用方自己挂定时器再补一个判定框 ——
##   那会把「范围」和「预警」重新拆成两处 (正是 attack_shape.gd 要消灭的东西)。
@export var arm_delay: float = 0.0

## 已命中的目标。防同一帧内 body_entered 重复触发 + 防同一刀重复打同一个敌人。
var _has_hit: Array[Node] = []
var _life: float = 0.0
var _arm: float = 0.0
var _armed: bool = true


func _ready() -> void:
	collision_layer = 1 << 2   # bit2: 我是玩家攻击
	collision_mask = 1 << 1    # bit1: 我只找敌人身体

	# ⚠️ 形状必须是**本实例私有的副本**。
	#
	#    attack_hitbox.tscn 里的 `rect_hitbox` 是 sub_resource ——
	#    PackedScene.instantiate() 出来的多个实例**共享同一个 shape 对象**。
	#    谁直接 `cs.shape.size = ...` 改到的是场景资源本身 (甚至可能写回 .tscn),
	#    于是**之后所有的攻击都跟着变大** —— 一刀扫穿一整排敌人,
	#    而且**不报任何错**, 症状看起来只是「判定突然不准了」。
	#
	#    现在有两条路, 两条都安全:
	#      · 有 attack_shape → build_collision_shape() 每次新建一个对象, 天然私有;
	#      · 没有 → 走兜底, 但先 duplicate() 再改。
	#    兜底那条留着是为了「手工在编辑器里摆一个 AttackHitbox 试手感」也能跑。
	var cs: CollisionShape2D = _find_shape_node()
	if cs == null:
		cs = CollisionShape2D.new()
		add_child(cs)

	if attack_shape != null:
		cs.shape = attack_shape.build_collision_shape(facing)
		cs.position = attack_shape.collision_offset(facing)
	elif cs.shape != null:
		cs.shape = cs.shape.duplicate()

	body_entered.connect(_on_body_entered)
	_life = lifetime

	# ⚠️ **不靠开关 `monitoring` 来实现蓄势**。
	#    Godot 里关掉再打开 monitoring, 重叠检测要等下一个物理帧才刷新 ——
	#    于是「圈亮起来那一瞬间就站在里面」的目标可能整段都收不到 body_entered。
	#    改成 monitoring 一直开着, 用 `_armed` 这个纯逻辑开关拦伤害,
	#    并在蓄势结束的那一帧**主动扫一遍当前重叠** (见 _physics_process) ——
	#    这样「一开始就站在圈里」和「后来才走进来」走的是同一条路, 没有特例。
	_armed = arm_delay <= 0.0
	_arm = arm_delay


## 找自己的碰撞形状节点。
## ⚠️ 用遍历子节点而不是 `shape_owner_get_shape(0)`: 后者是 Godot 3 的 API,
##    在 Godot 4 里根本不存在 —— 本文件曾经因为它而在**解析期**就整个加载失败,
##    导致轻攻击完全失效 (见文件头那段)。遍历子节点是 Godot 4 里最稳的写法。
func _find_shape_node() -> CollisionShape2D:
	for child: Node in get_children():
		if child is CollisionShape2D:
			return child
	return null


func _physics_process(delta: float) -> void:
	if not _armed:
		_arm -= delta
		if _arm <= 0.0:
			_armed = true
			# 蓄势结束: 补扫一次**已经站在圈里**的倒霉蛋。
			# 他们重叠的那一刻 _armed 还是 false, body_entered 被拦掉了,
			# 而信号不会再为同一个 body 补发 —— 不主动查就会「站在圈里反而没事」。
			for b: Node2D in get_overlapping_bodies():
				_try_hit(b)

	# 自己数秒而不是用 SceneTreeTimer: 这样调用方在 add_child **之后**再改 lifetime 也生效,
	# 且判定框的生死完全由自己掌握, 不依赖场景树的定时器。
	_life -= delta
	if _life <= 0.0:
		queue_free()


## 是否还在蓄势 (打不到任何人)。调用方用它判断「这一下能不能取消掉」——
## 已经生效过的攻击不该被收掉, 那样会变成一个「打出去了又收回」的怪状态。
func is_armed() -> bool:
	return _armed


func _on_body_entered(body: Node2D) -> void:
	if not _armed:
		return
	_try_hit(body)


## 唯一的伤害出口 —— body_entered 和蓄势补扫都走这里, 所以两条路径的行为必然一致。
func _try_hit(body: Node2D) -> void:
	if body in _has_hit:
		return
	if not body.has_method("take_damage"):
		return

	# 高度带: 跳得够高就躲得开。判定权在这里 (物理体表达不了高度, 见 attack_shape.gd)。
	#
	# ⚠️ 这一步必须在 `_has_hit.append` **之前** —— 否则一个从头顶跳过去的敌人
	#    会白占一个 max_targets 名额, 于是「跳过去」变成了帮敌人挡刀。
	if attack_shape != null and not attack_shape.hits_height(_body_height(body)):
		return

	_has_hit.append(body)

	# 「你被打中了, 攻击来自我这个坐标」—— 击退方向交给对方算 (见文件头 🏗️)
	#
	# ⚠️ 这里传三个参数 (第三个是 breaks_armor), 而 BlitzPlayer.take_damage 只收两个。
	#    之所以安全, 是因为 mask = bit1 只够得着**敌人身体** ——
	#    玩家的 Hurtbox 在 bit0/bit3 上, 本判定框永远碰不到它。
	#    这一条依赖碰撞层配置, 所以改层之前先回来看这行。
	body.take_damage(damage, global_position, breaks_armor)

	var away: Vector2 = body.global_position - global_position
	var d: Vector2 = away.normalized() if away.length() > 0.01 else Vector2.DOWN
	hit_landed.emit(body.global_position, d)

	# 命中反馈: 金色火花 (挂到 FX 层, 位置用受击方而不是判定框)
	HitSpark.spawn(get_tree(), body.global_position + Vector2(0.0, -18.0))

	if max_targets > 0 and _has_hit.size() >= max_targets:
		queue_free()


## 受击方的离地高度。鸭子类型读 —— 敌人暂时没有 height 属性 (它们不会跳),
## 缺了就当作 0 (贴地), 这样高度带的语义对两边是一致的。
func _body_height(body: Node2D) -> float:
	var v: Variant = body.get("height")
	return float(v) if v != null else 0.0


## 调试用判定范围绘制 —— 直接把 shape 画出来。
##
## 🏗️ 和预警共用 `AttackShape.draw_telegraph()`: 调试框看到的和玩家看到的是同一个形状,
##    也和真正判定的那份几何同源。要调判定就看这一张, 不要另外猜。
func _draw() -> void:
	if not show_debug_rect:
		return
	if attack_shape != null:
		attack_shape.draw_telegraph(
			self, Vector2.ZERO, facing,
			Color(1.0, 0.8, 0.1, 0.22), Color(1.0, 0.9, 0.2, 0.65)
		)
		return
	# 兜底路径: 没有 shape 就还是画那个矩形
	var cs: CollisionShape2D = _find_shape_node()
	if cs == null or not (cs.shape is RectangleShape2D):
		return
	var size: Vector2 = (cs.shape as RectangleShape2D).size
	var rect: Rect2 = Rect2(cs.position - size * 0.5, size)
	draw_rect(rect, Color(1.0, 0.8, 0.1, 0.22))
	draw_rect(rect, Color(1.0, 0.9, 0.2, 0.65), false, 1.5)
