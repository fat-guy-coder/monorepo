extends Area2D
class_name EnemyAttack
## 敌人的攻击判定区 — 短命 Area2D, 只在出招的「命中帧」存在
##
## 📚 涉及学习文档:
##   godot-6-2-area2d-deep      — Area2D: monitorable 与 monitoring 的分工
##   godot-6-4-collision-layers — bit3 = 敌人攻击
##   godot-2-5-collision2d      — CollisionShape2D / RectangleShape2D
##   godot-2-3-node2d-basics    — _draw() 画刀光
##   godot-7-5-timers-delays    — 为什么自己数秒而不是用 SceneTreeTimer
##
## 🏗️ 和 AttackHitbox (玩家那个) 是**镜像关系**, 但检测方向正好相反:
##   · AttackHitbox 自己 monitoring, 主动 `body_entered` 去找敌人;
##   · EnemyAttack  是**被动的伤害标记** (monitoring = false, monitorable = true),
##     自己不检测任何东西 —— 是**玩家的 Hurtbox** (mask 含 bit3) 主动检测到它。
##   这和 v0.2 里敌人那个「接触伤害 Hitbox」是同一条约定:
##   **「谁受伤」的判定权永远捏在受伤方手里**, 攻击方不需要知道对方的存在。
##   (v0.3 删掉了接触伤害, 但这条约定原样保留 —— 只是判定区从「常驻」变成「只在命中帧出现」)
##
## 🏗️ 为什么它自己背一个 source (挥出这一下的敌人):
##   精准格挡要把**攻击者**打硬直。玩家的 Hurtbox 只能拿到「有个 Area2D 碰到我了」,
##   拿不到「是谁挥的」。让判定区自己带一个 source 指针, 玩家就能
##   `area.source.on_parried()` —— 比在场景树里反查父节点稳得多 (父节点结构会变,
##   而 enemy 一旦被改成「敌人容器 > 敌人本体」这种结构, 反查就静默失效了)。
##
## ⚠️ 物理世界是**未投影的 XY 平面** (见 iso.gd 文件头): 本节点的 position
##    由 enemy.gd 直接给 `dir8 * reach`, **不做任何等距压扁**。
##    在这里调 Iso.ground() 会让上下方向的攻击距离只剩左右的一半。


## 判定框尺寸。
##
## 🏗️ 这个常量是 enemy.gd 画**起手预警**时用的**同一个**: 预警画出来的范围
##   和真的会打到你的范围, 在结构上不可能漂移。分成两个常量写的话,
##   改了其中一个就会出现「看着躲开了却被打中」——玩家只会认为是判定不准,
##   而这类抱怨几乎无法通过看代码定位。
## ⚠️ 这个尺寸是**实测**调出来的, 不是随手填的。它和 enemy.gd 的 attack_reach 一起
##    决定了一个「贴身就打不到」的死区 —— 推导如下 (以敌人面朝 +Y 为例):
##
##      敌人脚在原点, 玩家脚在距离 d 处; 玩家受击圆在**脚上方** (0,-16) 半径 15,
##      也就是占据 y ∈ [d-31, d-1];
##      判定框中心在 y = reach, 半高 17, 占据 y ∈ [reach-17, reach+17]。
##
##      两者重叠  ⇔  d >= reach - 16  且  d <= reach + 48
##      代入 reach = 22  →  d ∈ [6, 70]
##
##    旧值 (reach=32 / BOX 32×32) 得到的是 d ∈ [17, 79] —— 也就是说
##    **玩家只要贴到 17px 以内, 敌人的挥砍就永远打不到他**。
##    那是一个「抱着敌人就不掉血」的无敌漏洞, 而且它不报任何错, 只会让
##    玩家发现「有时候敌人砍了个寂寞」, 然后整场战斗变成贴着对方走。
##    reach 减到 22 + 框放大到 34 之后, 死区收缩到 6px (几乎等于两个原点重合), 可以忽略。
const BOX_SIZE: Vector2 = Vector2(34.0, 34.0)


## 伤害值
@export var damage: int = 1
## 击退初速 (px/s)。0 = 用受击方的默认击退。
@export var knockback: float = 0.0
## 存在时长 (秒)。⚠️ 必须在 `add_child` **之前**设好 —— `_ready()` 会读它做倒计时初值。
@export var lifetime: float = 0.14
## 挥出这一下的敌人。精准格挡靠它把攻击者打硬直 (见文件头 🏗️)。
@export var source: Node2D = null
## 能不能被精准格挡。将来会有「红光不可格挡」的招式, 先留出口。
@export var parryable: bool = true

## 剩余寿命
var _life: float = 0.0


func _ready() -> void:
	# bit3: "我是敌人攻击"   mask = 0: 我不找任何人 (见文件头 🏗️)
	collision_layer = 1 << 3
	collision_mask = 0
	monitoring = false
	monitorable = true

	# 形状在代码里建 (而不是做成 .tscn): 这样 enemy.gd 能一行 new 出来,
	# 不用为「敌人攻击」单开一个场景文件。约定和 world/respawn_point.gd 一致。
	var cs: CollisionShape2D = CollisionShape2D.new()
	var rect: RectangleShape2D = RectangleShape2D.new()
	rect.size = BOX_SIZE
	cs.shape = rect
	add_child(cs)

	_life = lifetime


func _physics_process(delta: float) -> void:
	# 自己数秒而不是用 SceneTreeTimer: 敌人被破霸体时要能**立刻**把它收掉
	# (见 enemy.gd 的 _cancel_attack)。挂着定时器的节点被 queue_free 后
	# 定时器仍会对着一个失效对象触发, 那是另一类要防的 bug。
	_life -= delta
	if _life <= 0.0:
		queue_free()


func _draw() -> void:
	# r: 0 → 1 的生命进度
	var r: float = clampf(1.0 - _life / maxf(0.001, lifetime), 0.0, 1.0)
	var fade: float = 1.0 - r * r      # 前段亮、后段快速消失
	var half: Vector2 = BOX_SIZE * 0.5

	# ① 半透明底衬: 让「这一块现在有伤害」这件事是**一块面积**而不是一条线
	draw_rect(Rect2(-half, BOX_SIZE), Color(1.0, 0.72, 0.55, 0.20 * fade))

	# ② 三道斜向刀光: 用等距斜线画出「挥过去」的方向感
	for i: int in range(3):
		var o: float = float(i - 1) * 7.0
		draw_line(
			Vector2(-half.x, o - 6.0), Vector2(half.x, o + 6.0),
			Color(1.0, 0.95, 0.85, (0.85 - float(i) * 0.22) * fade), 2.5
		)

	# ③ 外框: 判定范围的硬边界
	draw_rect(Rect2(-half, BOX_SIZE), Color(1.0, 0.5, 0.35, 0.75 * fade), false, 1.5)
