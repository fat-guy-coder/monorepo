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
## ────────────────────────────────────────────────────────────
## 🏗️ 形状从哪来 (v0.4: 视角转横版)
## ────────────────────────────────────────────────────────────
##   判定范围不再由本文件拍板 —— 它整份来自一个 `AttackShape`, 由 enemy.gd 的
##   `attack_shape()` 生成, 和它画起手预警时用的是**同一个来源**。
##   于是「地上那片红」和「真的会打到你的那片」在结构上不可能漂移。
##   (旧版是「两份代码写同一个公式」: 一个 BOX_SIZE 常量 + `dir8 * attack_reach`
##    在 enemy.gd 的 _draw_windup 和 _enter_strike 各写一遍 —— 只要有一处改动,
##    同步就被破坏, 而且是静默的。)
##
## ⚠️ 本节点的 position 必须是**敌人脚下原点**, 不要再沿朝向偏移。
##    偏多少已经写在 shape 里 (见 AttackShape.collision_offset)。两处都偏 = 偏两次。

## 判定框尺寸 —— **只在没有 attack_shape 时兜底** (手工摆一个 EnemyAttack 试手感)。
##
## ⚠️ 这个尺寸是实测调出来的, 和旧版的 attack_reach 一起决定过「贴身就打不到」的死区:
##    敌人脚在原点、玩家受击圆在脚上方 16、半径 15 时, 死区 d ∈ [0, 6]。
##    v0.4 换成扇形之后**死区彻底消失** —— 扇形的半径从 0 开始, 贴到脸上也在范围内。
##    兜底这条留着是因为「手工在编辑器里摆一个」这条路还得能跑。
const BOX_SIZE: Vector2 = Vector2(34.0, 34.0)

# ── 预警配色 ──
#
# 🎮 **颜色是玩法信息, 不是美术选择**:
#     橙红 = 挡得住 (格挡 / 精准格挡都行)
#     紫红 = **挡不住** (必须闪避 / 跳跃 / 拉开距离)
# 所以这两个常量是**唯一来源** —— 贴地扇形 (enemy.gd)、敌人身体和眼睛的起手着色、
# 命中帧闪过的这一下, 全部读这里。任何一处自己写死一个红, 玩家就会在两套配色之间
# 学到矛盾的信息 (而那正是「格挡时灵时不灵」这种抱怨的来源)。
const WARN_COLOR: Color = Color(1.0, 0.22, 0.18)
const UNBLOCKABLE_COLOR: Color = Color(0.82, 0.26, 1.0)


## 起手/命中该用哪个警示色。**静态** —— 敌人自己也要在还没有 EnemyAttack 的时候
## (起手阶段) 用同一个判断上色, 所以不能做成实例方法。
static func warn_color_for(pierces_guard: bool) -> Color:
	return UNBLOCKABLE_COLOR if pierces_guard else WARN_COLOR


## 伤害值
@export var damage: int = 1
## 击退初速 (px/s)。0 = 用受击方的默认击退。
@export var knockback: float = 0.0
## 存在时长 (秒)。⚠️ 必须在 `add_child` **之前**设好 —— `_ready()` 会读它做倒计时初值。
@export var lifetime: float = 0.14
## 挥出这一下的敌人。精准格挡靠它把攻击者打硬直 (见文件头 🏗️)。
@export var source: Node2D = null
## **格挡挡不住** (闪避/跳跃照常有效)。
##
## 🎮 COMBAT_MATRIX §3 ② —— 「不可格挡」是读招博弈的第三个答案:
##    如果格挡对所有招式都有效, 最优解就永远是「看到起手就按格挡」,
##    招式之间的差别被抹平了。这一招逼玩家在 0.55 秒里换一个应对方式。
##
## ⚠️ 只影响**格挡**。背后的攻击不用这个字段也照样挡不住 —— 那是朝向问题, 不是招式属性。
@export var unblockable: bool = false

## 这一招的范围。由 enemy.gd 的 `attack_shape()` 生成 —— 和它画预警时**同一个来源**。
## null = 用兜底的 BOX_SIZE 矩形 (只有手工摆的判定区才会走到)。
@export var attack_shape: AttackShape = null

## 世界空间的朝向 (四向, 见 Facing)。**必须在 add_child 之前设** —— `_ready()` 要拿它建形状。
## ⚠️ 显式存下来, 而不是读父节点的 facing: 判定区只活 0.14 秒,
##    出招那一瞬间的朝向就是唯一的真相 (和 AttackHitbox 同一条理由)。
@export var facing: Vector2 = Vector2(1.0, 0.0)

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
	if attack_shape != null:
		# build_collision_shape 每次新建一个对象 —— 天然私有, 不会污染别人
		cs.shape = attack_shape.build_collision_shape(facing)
		cs.position = attack_shape.collision_offset(facing)
	else:
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


## 命中帧的那一瞬 —— 把**判定范围本身**亮一下。
##
## 🏗️ 和起手预警用同一个 `draw_telegraph`。命中帧只有 0.14 秒, 这一下主要是给
##    「我挨的这一下是从哪来的」一个事后可读的交代 —— 起手时看到的那片红,
##    和现在闪过的这条弧是同一个形状。
##
## ⚠️ 和**起手**预警不一样, 这一下**故意画在攻击者这一层** (而不是走 GroundTelegraph
##    那条贴地层)。两者要看的东西不同:
##      · 起手 → 玩家得看清「**我的脚**站哪才安全」, 所以必须垫在角色下面;
##      · 命中帧 → 玩家得知道「刚才是谁从哪边打的我」, 一闪而过的冲击感压住角色是对的。
##    形状仍然同源, 所以这两层的衔接不会看出接缝。
func _draw() -> void:
	# r: 0 → 1 的生命进度
	var r: float = clampf(1.0 - _life / maxf(0.001, lifetime), 0.0, 1.0)
	var fade: float = 1.0 - r * r      # 前段亮、后段快速消失

	var c: Color = warn_color_for(unblockable)
	if attack_shape != null:
		# ⚠️ origin = 自己脚下 (本节点挂在敌人身上, 不沿朝向偏移) —— 见文件头
		attack_shape.draw_telegraph(
			self, Vector2.ZERO, facing,
			Color(c.r, c.g, c.b, 0.26 * fade),
			Color(c.lightened(0.25), 0.85 * fade))
		return

	# 兜底: 没有 shape 时画那个老矩形 (手工摆的判定区)
	var half: Vector2 = BOX_SIZE * 0.5
	draw_rect(Rect2(-half, BOX_SIZE), Color(c.r, c.g, c.b, 0.20 * fade))
	for i: int in range(3):
		var o: float = float(i - 1) * 7.0
		draw_line(
			Vector2(-half.x, o - 6.0), Vector2(half.x, o + 6.0),
			Color(c.lightened(0.55), (0.85 - float(i) * 0.22) * fade), 2.5
		)
	draw_rect(Rect2(-half, BOX_SIZE), Color(c.lightened(0.15), 0.75 * fade), false, 1.5)
