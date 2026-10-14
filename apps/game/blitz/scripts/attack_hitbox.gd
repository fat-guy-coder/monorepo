extends Area2D
class_name AttackHitbox
## 近战攻击判定框 — 短命的 Area2D, 存在 0.1~0.2 秒
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep     — Area2D 深入: monitoring / body_entered / overlap
##   godot-6-4-collision-layers — bit 位精确控制碰撞关系
##   godot-1-8-signals-basics   — 自定义信号: 把「打中了」广播给玩家/相机
##   godot-2-5-collision2d      — 碰撞形状: RectangleShape2D
##   godot-2-3-node2d-basics    — _draw() 画调试用的判定范围
##
## ⚠️⚠️ 本文件原本有一个**致命 bug**, 是这次重写修掉的:
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
##   一维判断 —— 等距八向下会退错方向: 从正上方砍下来会被往左/右弹)。
##   改成把攻击点坐标传给受击方, 受击方用 `(自己 - 攻击点)` 求方向 —— 八个方向全对,
##   而且「受击怎么表现」这件事集中在一个地方 (player.take_damage / enemy.take_damage)。
##
## 🏗️ 碰撞层: layer = bit2 (玩家攻击), mask = bit1 (敌人身体)。
##   mask 里**没有** bit4(墙) —— 攻击不该被墙挡住。刀气穿墙是这个阶段的合理简化。


## 命中时发出。main.gd 用它震屏, 玩家用它转发 (命中反馈的一半来自镜头)
signal hit_landed(at: Vector2, direction: Vector2)

@export var damage: int = 1
## 判定框存在时长 (秒)。由 player.gd 按 attack_light_duration 传入。
@export var lifetime: float = 0.15
## 命中几个目标后就自毁 (0 = 不限)。轻击打单个目标, 免得一刀扫穿一排敌人。
@export var max_targets: int = 1
## 画出判定范围 (金色半透明框)。默认关 —— 玩家已经画了刀光弧线, 这个只用于调判定。
@export var show_debug_rect: bool = false

## 是否是**破霸体**的招 (满蓄重击)。原样透传给受击方的 take_damage,
## 由**受击方**决定「这一下打不断我的出招」—— 判定权留在受伤方 (见文件头 🏗️)。
@export var breaks_armor: bool = false

## 判定框尺寸。Vector2.ZERO = 用场景里的默认尺寸 (46×34)。
## 重击会设成更大的值 —— 见 _ready() 里那条**共享资源**的警告。
@export var box_size: Vector2 = Vector2.ZERO

## 已命中的目标。防同一帧内 body_entered 重复触发 + 防同一刀重复打同一个敌人。
var _has_hit: Array[Node] = []
var _life: float = 0.0


func _ready() -> void:
	collision_layer = 1 << 2   # bit2: 我是玩家攻击
	collision_mask = 1 << 1    # bit1: 我只找敌人身体

	# ⚠️⚠️ RectangleShape2D 是**共享资源**, 这里必须先 duplicate()。
	#
	#    attack_hitbox.tscn 里的 `rect_hitbox` 是 sub_resource ——
	#    PackedScene.instantiate() 出来的多个实例**共享同一个 shape 对象**。
	#    重击要把判定框改大, 若直接 `cs.shape.size = ...`:
	#      · 改到的是场景资源本身 (甚至可能写回 .tscn);
	#      · 于是**之后所有的轻击也跟着变大** —— 一刀扫穿一整排敌人;
	#      · 而且**不报任何错**, 症状看起来像「判定突然不准了」,
	#        而判定不准这件事几乎无法靠读代码定位。
	#    先 duplicate 成实例私有副本, 再改就完全安全。
	var cs: CollisionShape2D = _find_shape_node()
	if cs != null and cs.shape != null:
		cs.shape = cs.shape.duplicate()
		if box_size != Vector2.ZERO and cs.shape is RectangleShape2D:
			(cs.shape as RectangleShape2D).size = box_size

	body_entered.connect(_on_body_entered)
	_life = lifetime


## 找自己的碰撞形状节点。
## ⚠️ 用遍历子节点而不是 `shape_owner_get_shape(0)`: 后者是 Godot 3 的 API,
##    在 Godot 4 里根本不存在 —— 本文件曾经因为它而在**解析期**就整个加载失败,
##    导致轻击完全失效 (见文件头那段)。遍历子节点是 Godot 4 里最稳的写法。
func _find_shape_node() -> CollisionShape2D:
	for child: Node in get_children():
		if child is CollisionShape2D:
			return child
	return null


func _physics_process(delta: float) -> void:
	# 自己数秒而不是用 SceneTreeTimer: 这样调用方在 add_child **之后**再改 lifetime 也生效,
	# 且判定框的生死完全由自己掌握, 不依赖场景树的定时器。
	_life -= delta
	if _life <= 0.0:
		queue_free()


func _on_body_entered(body: Node2D) -> void:
	if body in _has_hit:
		return
	if not body.has_method("take_damage"):
		return

	_has_hit.append(body)

	# 「你被打中了, 攻击来自我这个坐标」—— 击退方向交给对方算 (见文件头 🏗️)
	#
	# ⚠️ 这里传三个参数 (第三个是 breaks_armor), 而 BlitzPlayer.take_damage 只收两个。
	#    之所以安全, 是因为 mask = bit1 只够得着**敌人身体** ——
	#    玩家的 Hurtbox 在 bit0/bit3 上, 本判定框永远碰不到它。
	#    这一条依赖碰撞层配置, 所以改层之前先回来看这行。
	body.take_damage(damage, global_position, breaks_armor)

	var d: Vector2 = Vector2.ZERO
	if body is Node2D:
		var away: Vector2 = body.global_position - global_position
		d = away.normalized() if away.length() > 0.01 else Vector2.DOWN
	hit_landed.emit(body.global_position, d)

	# 命中反馈: 金色火花 (挂到 FX 层, 位置用受击方而不是判定框)
	HitSpark.spawn(get_tree(), body.global_position + Vector2(0.0, -18.0))

	if max_targets > 0 and _has_hit.size() >= max_targets:
		queue_free()


## 调试用判定范围绘制。形状从**子节点的 CollisionShape2D** 读 ——
## 不用 shape_owner_* 系列 API (见文件头 ⚠️ 那段血泪)。
func _draw() -> void:
	if not show_debug_rect:
		return
	var cs: CollisionShape2D = _find_shape_node()
	if cs == null or not (cs.shape is RectangleShape2D):
		return
	var size: Vector2 = (cs.shape as RectangleShape2D).size
	var rect: Rect2 = Rect2(cs.position - size * 0.5, size)
	draw_rect(rect, Color(1.0, 0.8, 0.1, 0.22))
	draw_rect(rect, Color(1.0, 0.9, 0.2, 0.65), false, 1.5)
