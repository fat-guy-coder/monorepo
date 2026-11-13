extends CharacterBody2D
class_name BlitzEnemy
## 敌人 —— 等距八向版 + **主动出招** (v0.3)
##
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d     — CharacterBody2D: move_and_slide / velocity
##   godot-6-2-area2d-deep         — EnemyAttack 用 Area2D 做「只在命中帧存在」的判定区
##   godot-6-4-collision-layers    — 为什么攻击判定区和身体在不同层
##   godot-7-8-state-machines      — 出招三相位 (起手/命中/收招) 的状态机
##   godot-2-3-node2d-basics       — _draw() 画身体、血条、**起手预警**
##   godot-1-8-signals-basics      — died 信号取代 current_scene 鸭子类型调用
##   godot-1-7-classes-oop         — enum / 类内常量
##
## ⚠️ v0.2 的四条骨, 前三条一个字都不能改回去:
##   ① 删掉重力与 `is_on_floor()`。残留的 `velocity.y = -80` 式击退在无重力世界里
##      会让敌人**一路飘出地图**, 而且看起来像「AI 抽风跑到地图外面」。
##   ② motion_mode 必须 FLOATING。
##   ③ 原点在**脚底**, _draw() 一律负 Y 往上。
##   ④ ~~朝向是 Vector2~~ → **朝向是 ±1 的整数**, 而且**和移动方向解耦** (见下面 v0.4 段)。
##      横版只有左右两个朝向。敌人仍然按世界平面走位 (追击是斜的), 但
##      「往哪走」不再决定「朝哪看」—— 旧代码里这两件事是同一个变量, 那是八向时代的遗产。
##
## 🎮 v0.4: 视角转 2.5D 横版, 敌人的攻击跟着变成**有形状的范围**。
##   旧版是「`dir8 * attack_reach` 处一个 34×34 的方框」—— 八向里它勉强够用,
##   但横版的地面是**平面**, 方框表达不了「身前一片扇形」这件事。
##   现在和玩家共用 `AttackShape` (combat/attack_shape.gd):
##     · `_enter_strike()` 建判定区 和 `_draw_windup_ground()` 画预警**读同一个对象**;
##     · 于是「地上画的那片红」和「真的会打到你的那片」在结构上不可能漂移 ——
##       这是 v0.3「预警必须画在判定框将会出现的那个确切位置」那条不变量的推广:
##       旧版靠**两份代码写同样的公式**维持同步, 新版靠**只有一个来源**。
##     · 预警由 `_tg` (GroundTelegraph) 画在**贴地层** (z = -5), 不在敌人的 `_draw()` 里。
##       「形状对」和「看得见形状」是两回事: 画在 self 上会跟着 y-sort, 敌人站得靠前
##       一点就整个盖住玩家的脚 —— 而玩家要判断的恰恰是自己的脚在不在里面。
##       见 scripts/fx/ground_telegraph.gd 文件头。
##
## ⚠️ 有一件事**故意没跟着改**: 击退 (knockback_speed / parry_recoil) 仍是**屏幕**单位。
##    移动改成了世界单位 (见 _world_velocity), 因为 move_speed 要和攻击距离同一个尺子;
##    而击退是一次性的推力, 它的数值全靠手感调, 换算它只会让一组调好的数字全部失效。
##    「屏幕方向上被推开」在观感上也正是想要的 (被砍飞是画面上的事)。
##
## 🎮 v0.3 新增: 敌人会**自己出招**了。
##   v0.2 的敌人只有「贴身就掉血」—— 那种伤害玩家躲不开也挡不住, 只能拉开距离,
##   于是战斗里没有「读招」这一层。本轮删掉接触伤害 (见 scenes/enemy.tscn),
##   改成三段式出招: **起手 (可看见) → 命中 (有判定) → 收招 (有破绽)**。
##   没有这个三段式, 精准格挡就无从谈起 —— 你没法格挡一个看不见的东西。
##
## 🏗️ 打断来源的**优先级是写死的**, 见 _physics_process 开头:
##
##       _stagger_timer  >  attack_phase  >  _stun_timer  >  AI
##
##   `_stagger_timer` 是精准格挡 / 被满蓄重击破霸体打出的**长硬直** (0.9~1.2s);
##   `_stun_timer` 是平时挨打的**短硬直** (0.15s)。
##   两者不是同一个东西: 长硬直必须能**中断正在进行的出招**, 短硬直不能。
##   ⚠️ 千万别把这个链改成 if/elif 串 —— 少写一层 return 的后果是
##   「敌人被冻住不动」或「敌人在硬直里照样出招」, 两者都不报任何错。
##
## 🏗️ 霸体 (super armor) 的全部含义只有一句话:
##   **正在起手/出招的敌人, 只有满蓄重击 (breaks_armor) 打得断。**
##   普通轻重击照样掉血, 但不硬直、不击退、不断招。
##   见 take_damage() 里那段看似「什么都没做」的分支 —— 那不是漏写。


## 死亡时发出, 携带击杀得分 (main.gd 订阅它加分)
signal died(score_value: int)
## 被精准格挡时发出 (main.gd 订阅它做特效/震屏, 普通格挡不发)
signal parried(at: Vector2)
## 满蓄重击破霸体时发出
signal armor_broken(at: Vector2)

## AI 行为类型
enum Type {
	PATROL = 0,     ## 巡逻 — 沿 patrol_axis 在起点两侧来回, 玩家靠近就出招
	STATIONARY = 1, ## 固定 — 不动, 当靶子/炮台
	CHASER = 2,     ## 追踪 — 朝玩家八向直线逼近
}

## 出招相位。NONE 之外的三相各自独占一帧 (AI 停摆), 见 _update_attack()
enum AttackPhase {
	NONE = 0,      ## 没在出招
	WINDUP = 1,    ## 起手 —— 有预警, 是玩家读招 + 按格挡的窗口
	STRIKE = 2,    ## 命中帧 —— 判定框存在, 真正会打伤人的那一小段
	RECOVER = 3,   ## 收招 —— 破绽, 玩家的主要输出时机
}

# ============================================================
# 可调参数 — 移动 / AI
# ============================================================
@export var enemy_type: Type = Type.PATROL
## 会不会出招。关掉就是纯肉桩 (main.gd 拿它配固定靶, 专门用来试重击伤害和破霸体)
@export var can_attack: bool = true
## 移动速度, **世界单位/s** (和玩家的 move_speed 同一把尺子)。
## ⚠️ 因为是世界速度, 屏幕上纵深方向的位移只有横向的一半 —— 这正是 2.5D 地面该有的样子。
##    (旧版是屏幕单位, 于是「沿纵深追」在世界尺子里快一倍, 攻击距离一改成世界单位就会对不上。)
@export var move_speed: float = 80.0
@export var chase_speed_scale: float = 1.35   ## 追踪时的速度倍率
## 追到离玩家多近就停 (**世界单位**)。默认 30 ≈ 两人身体半径之和 (12 + 11 = 23) 再留 7。
##
## 🏗️ 这个数是修「敌人糊在玩家身上疯狂抖动」的**关键**, 而不是可调手感:
##    v0.4 之前追到 `dist <= 1.0` 才停 —— 也就是几乎追到中心点。可两个人没有互相碰撞,
##    于是敌人穿过玩家 → 方向瞬间反过来 → 又穿回去, 每帧翻一次, 画面上就是狂抖。
##    现在: 追击在 stop 距离就刹车, 真叠上了还有 body_separation.gd 兜底。
##    要调的话必须 **> 身体半径之和**, 否则等于没停。
@export var chase_stop_distance: float = 30.0
## 从 stop 距离再往外多少开始全速 —— 最后一段是**线性减速**, 不是硬阈值。
##
## ⚠️ 用一个阈值 (到 30 就置零) 会让速度在阈值两侧来回切: 刹停 → 下一帧判定又加速,
##    表现为原地的轻微抽动。斜坡让「接近」本身就是连续的。
@export var chase_slowdown_range: float = 26.0
## 进入 stop 距离后的刹车减速度 (世界单位/s²)
@export var chase_stop_decel: float = 900.0
## 巡逻轴 —— **世界平面**上的方向。默认 +x (屏幕向右)。
## 改成 Vector2.DOWN = 世界 +z = 屏幕向下 (朝镜头走)。
@export var patrol_axis: Vector2 = Vector2.RIGHT
@export var patrol_range: float = 150.0       ## 距起点的最大偏移 (px)
@export var max_health: int = 4
@export var score_value: int = 100
@export var knockback_speed: float = 260.0
@export var knockback_decel: float = 1500.0
@export var hit_stun_duration: float = 0.15   ## 平时挨打的短硬直

# ============================================================
# 可调参数 — 出招
#
# 🎮 这几个数字决定了整个战斗的节奏, 也是本轮最需要你 F5 之后亲手调的一组。
#    尤其 windup_duration: 它是「玩家能不能看清」的唯一变量。
#    低于 0.4s 就从「读招判断」退化成「反应测试」, 那时候格挡会显得很挫败。
# ============================================================
@export var attack_damage: int = 1
@export var windup_duration: float = 0.55     ## 起手时长 (预警要看得清, 别低于 0.4)
@export var strike_duration: float = 0.14     ## 判定框存在时长
@export var recover_duration: float = 0.65    ## 收招破绽 —— 玩家的主要输出时机
@export var attack_cooldown: float = 1.6      ## 两次出招之间的冷却
## 敌人的一刀 —— **扇形 (横劈)**。半径和张角都是**世界单位**, 见 attack_shape()。
##
## 🏗️ 为什么是扇形而不是旧版那个 34×34 的方框:
##   用户对这一招的要求是「在它的攻击范围内, 离他几根横向轴上都会收到攻击」——
##   要的就是**纵深上差一两格照样砍得到**。扇形的纵深容差是
##     |Δz| ≤ min(Δx·tan(半角), √(R²−Δx²))
##   也就是「贴着只扫正面, 拉开一点反而铺开」, 正是挥砍该有的样子。
##
## ⚠️ 半径 54 < 玩家横劈的 66, 张角 60° < 玩家的 75°: 玩家的家伙更长更开。
##    这个不对称是**有意**的 —— 玩家手短是打不过远程的, 手长都是保命的。
@export var sweep_radius: float = 54.0
@export var sweep_half_angle_deg: float = 60.0
## 这一刀扫得到的**离地高度上限** (px)。低于/等于它才挨打 —— **跳过去就躲得开**。
##
## 🏗️ 这是 v0.4 加跳跃的**主要收益** (V04_PLAN 步骤 5): 没有高度带的话, 跳跃
##    在地面战斗里只是一个好看的位移, 躲不开任何东西。
##
## 🎮 40 是相对于满跳高度 ≈96.6 (jump_speed² / 2×gravity = 520² / 2800) 定的:
##    起跳后很快就能越过 40, 于是「看到起手 → 跳」是一个**真操作**,
##    而不是只有踩到最高点才勉强躲开。调低会变成「随便跳一下就无敌」,
##    调高则要求卡时机 —— 数值手感仍然要 F5 再微调。
##
## ⚠️ 高度带**不在物理体里** (Area2D 活在 2D 平面, 表达不了离地高度),
##    真正的判定点在 `player.gd _on_hurtbox_area_entered`。这里只定义数据,
##    由受击方查 —— 和玩家攻击的 `AttackHitbox._try_hit` 是同一条纪律。
@export var sweep_height_max: float = 40.0
## 敌人身体的**世界**半径 —— 它占哪块地 (屏幕上 11×5.5 的椭圆)。
##
## ⚠️ 11 不是新调的: enemy.tscn 原本是 22×12 的屏幕矩形, 横向半宽就是 11。
##    换算成贴地圆之后横向一字未改, 只有纵深从 ±24 收到 ±11, 以及不再整体上浮 4px。
const BODY_RADIUS: float = 11.0
## 步频: 每走 1 个世界单位, 步态相位推进多少弧度。
## 0.055 → 巡逻 80 世界单位/s ≈ 4.4 rad/s ≈ 1.43 秒一个完整步态周期。
## ⚠️ 只影响「腿倒腾得多快」, 不影响任何判定 —— 调它不会有战斗后果。
const GAIT_RATE: float = 0.055
## 绕剑阵: **切向**权重 (「绕过去」) / **径向逃出**权重 (只在已经踩进阵里时用)。
##
## ⚠️ 在外面绕的时候径向权重是 0, 这是有意的:
##    留一点「往外推」的话, 敌人会被推过「直线路径不再穿过阵」的那条线, 于是下一帧
##    不绕了 → 又开始直线追 → 再次穿过 → 再次绕。表现是**在阵边一顿一顿地抽搐**,
##    而且只在「玩家正好在阵的另一侧」时出现。纯切向就不会跨过那条线, 绕到让路的位置
##    自然就恢复直线追击。
const SWORD_ORBIT_WEIGHT: float = 1.0
const SWORD_ESCAPE_WEIGHT: float = 1.4
## 目标在阵里时, 敌人**不躲**, 直接冲进去换血 —— 见 _sword_avoid() 的 🏗️。
## 绕阵的旋转方向 (+1 / -1)。用状态记住而不是每帧重算, 见 _sword_avoid()。
var _sword_orbit_sign: float = 1.0
@export var attack_knockback: float = 300.0   ## 打中玩家时的击退初速 (屏幕单位, 见文件头)
## ⚠️ `attack_trigger_range` 和 `attack_reach` (v0.3) 已删 —— 换成了
##    「我这一刀**够不够得着**」直接问 shape (见 _try_start_attack)。
##    留着那个距离常量的话, 它和扇形的半径就是两个各自独立的门槛:
##    调了半径忘了调距离, 表现是敌人站在射程外起手、砍一片空气,
##    而画面上看起来像是「AI 抽风」。一个门槛, 一个来源。

# ============================================================
# 可调参数 — 硬直
# ============================================================
@export var armor_break_stagger: float = 0.9  ## 被满蓄重击破霸体的硬直
@export var parry_stagger: float = 1.2        ## 被精准格挡的硬直 (= 玩家的反击窗口)
@export var parry_recoil: float = 220.0       ## 被精准格挡时的后退初速

# ============================================================
# 运行时
# ============================================================
var health: int = 0
var is_dead: bool = false
var start_position: Vector2 = Vector2.ZERO
## 朝向: **四向单位向量** (Facing.RIGHT / LEFT / UP / DOWN), 和玩家同一个约定。
## ⚠️ 它和移动方向**解耦**: 追击时走斜线, 朝向吸附到主轴 (见 _face_toward)。
var facing: Vector2 = Facing.RIGHT
var attack_phase: AttackPhase = AttackPhase.NONE

var _phase_timer: float = 0.0
var _attack_cooldown_timer: float = 0.0
var _stun_timer: float = 0.0          ## 平时挨打的短硬直
var _stagger_timer: float = 0.0       ## 精准格挡 / 破霸体的长硬直 (最高优先级)
var _flash_timer: float = 0.0
var _patrol_sign: float = 1.0
## 当前在场上的攻击判定区 (STRIKE 期间非 null)。破霸体/死亡时必须收回它。
var _attack_area: EnemyAttack = null
## 贴地预警层 (起手时那片扇形)。**必须是独立节点** —— 见 ground_telegraph.gd § 为什么。
var _tg: GroundTelegraph = null

# ── 骨架 / 动画 (v0.8) ──
## 程序化骨架实例。复用同一个, 不必每帧 new。
var _rig: EnemyRig = EnemyRig.new()
## 站桩/长硬直这类**循环**动作用的呼吸时钟 (只驱动尾巴和呼吸, 不驱动判定)。
var _anim_clock: float = 0.0
## 步态相位 (弧度, 0~TAU 循环)。按**世界**速度累加 —— 见 _physics_process。
var _gait_phase: float = 0.0
## 本次长硬直的总时长。只为了给 anim_phase() 算「趴到几分」——
## 没有它的话, 动画只能拿到剩余时间, 不知道满格是多少。
var _stagger_total: float = 0.0


func _ready() -> void:
	# ⚠️ 无重力 —— 见文件头 ⚠️①
	motion_mode = CharacterBody2D.MOTION_MODE_FLOATING

	# bit1: "我是敌人身体"   bit4: "我只跟墙碰"
	collision_layer = 1 << 1
	collision_mask = 1 << 4

	# ── 身体框换成**贴地椭圆** ──
	#
	# 🏗️ 和玩家受击框是同一条理由 (见 player.gd 的 _ready), 这边是镜像方向:
	#    玩家的攻击范围活在地面平面上, 而 enemy.tscn 里原本是「离地 4px 的 22×12 屏幕矩形」。
	#    屏幕矩形在地面平面里是一个**纵深 ±24、还整体朝镜头歪了 8** 的方块 ——
	#    于是「站在这片扇形外面」的敌人照样会被砍到。
	#    (这个形状的数值本来就接近世界半径 11 的圆: 22×11 对 22×12, 偏移只差 4px。
	#     所以改成贴地圆几乎不动手感, 动的只是「它到底占哪块地」这件事对不对得上。)
	var body_col: CollisionShape2D = $CollisionShape2D
	body_col.position = Vector2.ZERO
	body_col.shape = BeltSpace.ground_circle_shape(BODY_RADIUS)

	health = max_health
	start_position = position
	add_to_group("enemies")

	# ⚠️ v0.2 这里还有一个常驻的接触伤害 Hitbox, v0.3 删掉了 (见文件头 🎮)。
	#    如果它还在, 玩家贴脸站着就会持续掉血, 「看清出招再挡」这件事
	#    会被一个躲不掉的伤害源盖住, 本轮要验的格挡手感就完全测不出来。

	# 贴地预警的**图层** —— 起手时那片扇形由它画, 而不是由敌人的 _draw() 画。
	# ⚠️ 必须挂在自己身上 (位置自动跟随), 但它会把自己 z 到角色**下面** ——
	#    第一版画在 self 上, 敌人站得靠前一点就整个盖住玩家的脚。见 ground_telegraph.gd。
	_tg = GroundTelegraph.new()
	_tg.name = "GroundTelegraph"
	_tg.set_painter(_draw_windup_ground)
	add_child(_tg)


## 贴地预警层的开关与重绘。**只在起手阶段亮** —— 出招那一瞬由 EnemyAttack 自己闪,
## 收招/硬直/死亡期间必须灭掉。
##
## 🏗️ 为什么不挂在「进出起手」的各个转换点上 (WINDUP/STRIKE/RECOVER/NONE 有五处赋值):
##    那样每加一条退出路径就得想起来灭一次灯, 漏一个的后果是**一片永远不消失的假范围**
##    —— 而它长得和真的一模一样, 只能靠撞上去才发现。按当前相位每帧结算,
##    判据就只剩一个: 「现在是不是在起手, 而且还没死」。
func _sync_ground_telegraph() -> void:
	var winding: bool = attack_phase == AttackPhase.WINDUP and not is_dead
	# ⚠️ 只动**开关**, 不要在这里碰 painter —— 第一版就是在这里把 painter 也清掉了,
	#    于是敌人第一次收招之后那片扇形永久消失 (见 ground_telegraph.gd 的 enabled)。
	_tg.set_active(winding)
	if winding:
		# 起手进度每帧都在变 (t 驱动张角), 所以每帧都要重绘
		_tg.queue_redraw()


func _physics_process(delta: float) -> void:
	# ⚠️ 放在 is_dead 提前 return **之前**: 落在这个 return 之后的话, 一个在起手
	#    途中被打死的敌人会把那片扇形**永远**留在场地上 (它长得和真的一模一样)。
	_sync_ground_telegraph()

	if is_dead:
		return

	_flash_timer = maxf(0.0, _flash_timer - delta)
	_attack_cooldown_timer = maxf(0.0, _attack_cooldown_timer - delta)

	# 动画时钟。⚠️ 步态相位按**世界**速度累加 —— 用屏幕速度的话,
	#    沿纵深移动（屏幕上只有一半位移）会让步频慢一半, 读起来像「腿在原地蹭」。
	var world_speed: float = BeltSpace.screen_speed_to_world(velocity)
	_anim_clock += delta
	_gait_phase = fposmod(_gait_phase + world_speed * delta * GAIT_RATE, TAU)

	# ⚠️⚠️ 打断优先级写死在这里, 每一层**独占本帧** (见文件头 🏗️)。
	#      长硬直 > 出招 > 短硬直 > AI。不要改成 if/elif 串。
	if _update_stagger(delta):
		_decay_knockback(delta)
	elif _update_attack(delta):
		_decay_knockback(delta)
	elif _update_stun(delta):
		_decay_knockback(delta)
	else:
		_update_ai(delta)

	move_and_slide()
	queue_redraw()


## 无重力世界里的**唯一**刹车。
## ⚠️ 这里没有 `velocity.y -= gravity`: 加了它敌人会一路飘出地图 (见文件头 ⚠️①)。
func _decay_knockback(delta: float) -> void:
	velocity = velocity.move_toward(Vector2.ZERO, knockback_decel * delta)


# ============================================================
# 打断层 ① — 长硬直 (精准格挡 / 破霸体)
# ============================================================
## 返回 true = 本帧被长硬直占用。
func _update_stagger(delta: float) -> bool:
	if _stagger_timer <= 0.0:
		return false
	_stagger_timer = maxf(0.0, _stagger_timer - delta)
	if _stagger_timer <= 0.0:
		_stagger_total = 0.0
	return true


# ============================================================
# 打断层 ② — 出招三相位
# ============================================================
## 返回 true = 本帧被出招占用 (AI 不跑)。
##
## 🏗️ 三个相位**每一个都必须有退出条件**, 而且都写在这一个函数里。
##   漏掉任何一个的 exit, 敌人会永久卡在那个相位 —— 症状是「敌人不动了」,
##   不报任何错, 而且从画面看不出是状态机的问题 (像是 AI 挂了)。
func _update_attack(delta: float) -> bool:
	match attack_phase:
		AttackPhase.NONE:
			return false

		AttackPhase.WINDUP:
			_phase_timer -= delta
			if _phase_timer <= 0.0:
				_enter_strike()
			return true

		AttackPhase.STRIKE:
			_phase_timer -= delta
			if _phase_timer <= 0.0:
				_end_strike()
				attack_phase = AttackPhase.RECOVER
				_phase_timer = recover_duration
			return true

		AttackPhase.RECOVER:
			_phase_timer -= delta
			if _phase_timer <= 0.0:
				attack_phase = AttackPhase.NONE
				_phase_timer = 0.0
				_attack_cooldown_timer = attack_cooldown
			return true

	return false


## 敌人这一刀的形状 —— **横劈, 一个扇形**。
##
## 🏗️ 做成函数 (而不是存一份常量/`@export` 的 shape 对象), 和玩家的
##    `light_shape()` 同一个理由: AttackShape 是 Resource, 共享一份实例的话
##    任何一处「临时改半径试试手感」都会波及所有敌人和所有招式。
##    每次 new 一份, 便宜且不可能出事。
##
## ⚠️ 和 `_draw_windup_ground()` 是**同一个来源** —— 那边画预警也调这个函数。
##    在这里另写一套极坐标、或者把半径抄成两个常量, 改一处就会出现
##    「地上画的红色范围」和「真的会打到你的范围」对不上, 而且是双向的。
func attack_shape() -> AttackShape:
	# 低空扇形: 贴地的人会被扫到, 跳起来的人躲得开 (见 sweep_height_max)。
	# 预警 / 判定 / 自检仍然读这同一个对象 —— 高度带只是多了一条数据。
	return AttackShape.make_arc(sweep_radius, sweep_half_angle_deg).band(0.0, sweep_height_max)


## 起手 → 命中。生成判定区。
##
## ⚠️ 判定区挂在**自己脚下** (position 不偏移), 范围整份来自 shape ——
##    它自己知道圆心在哪 (AttackShape.collision_offset)。两处都偏移就是偏两次。
func _enter_strike() -> void:
	attack_phase = AttackPhase.STRIKE
	_phase_timer = strike_duration

	var atk: EnemyAttack = EnemyAttack.new()
	atk.damage = attack_damage
	atk.knockback = attack_knockback
	atk.source = self          # 精准格挡靠它反打 (见 enemy_attack.gd 文件头 🏗️)
	atk.lifetime = strike_duration
	atk.attack_shape = attack_shape()
	atk.facing = facing
	# ⚠️ 必须在 add_child 之前设 —— 和 lifetime 同一个道理: _ready() 之后
	#    这个判定区就可能已经碰进玩家受击框了 (它活 0.14 秒)。
	atk.unblockable = attack_unblockable
	add_child(atk)
	_attack_area = atk


## 把判定区从场上收掉。**破霸体和死亡都必须调它** ——
## 否则敌人已经爆散了, 那一刀还在场上继续打人 (看起来像「死亡判定延迟」)。
func _end_strike() -> void:
	if _attack_area != null and is_instance_valid(_attack_area):
		_attack_area.queue_free()
	_attack_area = null


## 打断当前出招。被精准格挡 / 破霸体 / 死亡时调。
func _cancel_attack() -> void:
	_end_strike()
	attack_phase = AttackPhase.NONE
	_phase_timer = 0.0


# ============================================================
# 打断层 ③ — 短硬直 (平时挨打)
# ============================================================
func _update_stun(delta: float) -> bool:
	if _stun_timer <= 0.0:
		return false
	_stun_timer = maxf(0.0, _stun_timer - delta)
	return true


# ============================================================
# AI
# ============================================================
func _update_ai(delta: float) -> void:
	match enemy_type:
		Type.PATROL:
			_process_patrol()
		Type.STATIONARY:
			# ⚠️ 乘 delta: 旧版这里是一个裸的 600.0, 帧率一变减速就变快慢
			velocity = velocity.move_toward(Vector2.ZERO, 600.0 * delta)
		Type.CHASER:
			_process_chase(delta)
	_try_start_attack()


func _process_patrol() -> void:
	var axis: Vector2 = patrol_axis.normalized() if patrol_axis != Vector2.ZERO else Vector2.RIGHT
	# ⚠️ 巡逻的「走了多远」必须在**世界**尺子上量 —— `position` 是屏幕坐标,
	#    沿纵深巡逻时它每帧只动一半, 拿它比 patrol_range 会让纵深方向的巡逻范围翻倍。
	var offset: float = (_world_pos() - BeltSpace.to_world(start_position)).dot(axis)
	if absf(offset) > patrol_range:
		_patrol_sign = -signf(offset)
	velocity = _world_velocity(axis * _patrol_sign, move_speed)
	# 朝向跟着**行进方向** —— 四向之后纵深巡逻也有朝向可言了 (朝上 = 背面)。
	# 归一化交给 Facing.choose: 巡逻轴本来就是世界方向, 直接喂。
	facing = Facing.choose(facing, axis * _patrol_sign)


func _process_chase(delta: float) -> void:
	var target: Node2D = _get_player()
	if target == null:
		velocity = velocity.move_toward(Vector2.ZERO, 400.0)
		return
	var to_player: Vector2 = _to_world_pt(target.global_position) - _world_pos()
	var dist: float = to_player.length()

	# 朝向照样跟到最后一刻 —— 停在你身边也要看着你 (不然站定的敌人会侧着身子出招)
	if dist > 1.0:
		_face_toward(target.global_position)

	# 逼近到「身体贴着」就刹车, **不要往玩家身上挤**。
	# 挤进去也不会有物理响应 (两个人不互撞, 见 body_separation.gd), 只会让
	# 追击方向每帧翻转 —— 那就是「重合后疯狂抖动」的根因。
	var ramp: float = clampf((dist - chase_stop_distance) / chase_slowdown_range, 0.0, 1.0)

	# 剑阵回避 (v0.7) —— 只有追击型会绕, 巡逻/站桩型照旧 (它们本来就不追人)。
	var avoid: Vector2 = _sword_avoid(target, to_player)
	if avoid != Vector2.ZERO:
		# 躲阵期间**不许因为「已经贴到玩家」就停下** —— 否则它会在阵边站定挨跳伤,
		# 看起来像「AI 躲到一半放弃了」。但也不用全速: 0.45 的底线让它保持可读的绕行速度。
		velocity = _world_velocity(avoid, move_speed * chase_speed_scale * maxf(ramp, 0.45))
		return

	if ramp <= 0.0:
		velocity = velocity.move_toward(Vector2.ZERO, chase_stop_decel * delta)
		return

	# 世界平面上直线逼近 —— 归一化后再乘速度, 否则斜向会快 √2 倍
	velocity = _world_velocity(to_player, move_speed * chase_speed_scale * ramp)


## 剑阵回避: 返回**世界**方向 (已归一化), 或者 ZERO = 不用躲。
##
## 🏗️ 为什么是「切向绕行」而不是「把阵当成一堵墙推开」:
##    单纯往外推只能让敌人停在阵边, 它永远到不了玩家那儿, 于是「绕开」这个动作
##    就退化成了「站住」。真正的绕行必须**同时**有切向 (绕过这段弧) 和径向 (别贴边),
##    而且切向要选「绕过去之后离玩家更近」的那一边 —— 否则敌人会绕着绕着越绕越远。
##
## 🏗️ 为什么目标在阵里时不躲 (这条是整个机制的关键):
##    如果无脑避开, 玩家**站进自己的阵里**就变成零代价安全区: 敌人在外围绕圈,
##    玩家什么都不用做。那恰好把这一格填反了 —— 剑阵要的是「逼敌人走位」,
##    不是「玩家获得无敌圈」。
##    现在的规则让「站在自己的阵里」成为一个**要付代价**的选择: 敌人照样冲进来,
##    而你自己被钉在一块固定的地上。所以正确的用法是「插阵然后退出去」,
##    让敌人替你在阵和你之间做选择。
##
## ⚠️ 阵只打 enemies 组 (SwordArray._tick), 玩家站在里面**不掉血**。
##    别改成双向伤害 —— 那会让上面这条变成「谁站谁傻」, 玩家永远不插阵。
func _sword_avoid(target: Node2D, to_player: Vector2) -> Vector2:
	var me: Vector2 = _world_pos()
	var path: Vector2 = _to_world_pt(target.global_position) - me
	var path_len_sq: float = maxf(0.001, path.length_squared())

	# 判据不是「离阵多近」, 而是「**直线走过去会不会踩进去**」——
	# 这一条把「要不要绕」变成了一个几何问题, 于是没有需要调的感知半径,
	# 也不会有「站在阵边明明能绕过去却一直转圈」的情况:
	# 一旦切向绕行让直线路径擦不到阵了, 下一帧自然就恢复直线追击。
	var block: SwordArray = null
	var block_miss: float = INF
	var block_dist: float = INF
	for n: Node in get_tree().get_nodes_in_group("sword_arrays"):
		if not (n is SwordArray):
			continue
		var sa: SwordArray = n
		if sa.is_queued_for_deletion():
			continue
		# 目标自己在阵里 → 这一座不躲 (见函数头的 🏗️)
		if sa.contains_world(_to_world_pt(target.global_position)):
			continue
		# 线段 (我 → 玩家) 到阵心的最近距离
		var to_c: Vector2 = sa.world_center - me
		var t: float = clampf(to_c.dot(path) / path_len_sq, 0.0, 1.0)
		var miss: float = (me + path * t).distance_to(sa.world_center)
		if miss > sa.radius + BODY_RADIUS:
			continue                       # 直线过去从阵边擦过, 不用绕
		if miss < block_miss:
			block = sa
			block_miss = miss
			block_dist = me.distance_to(sa.world_center)
	if block == null:
		return Vector2.ZERO

	var radial: Vector2 = me - block.world_center
	radial = radial.normalized() if radial.length() > 0.01 else -path.normalized()
	var tangent: Vector2 = Vector2(-radial.y, radial.x)

	# ⚠️ 用 |dot| 阈值保留上一次的绕行方向: 玩家正好在阵的正对面时
	#    两个切向几乎打平, 逐帧重算会来回翻 → 敌人在阵边抽搐。
	var dot: float = tangent.dot(to_player)
	if absf(dot) > 0.2:
		_sword_orbit_sign = signf(dot)
	tangent *= _sword_orbit_sign

	# 已经在阵里 → 必须往外走 (纯切向会让它在圈里永远转下去, 一直吃跳伤);
	# 在外面 → 只走切向 (见 SWORD_ORBIT_WEIGHT 的 ⚠️)。
	var escape_w: float = SWORD_ESCAPE_WEIGHT if block_dist <= block.radius else 0.0
	var dir: Vector2 = tangent * SWORD_ORBIT_WEIGHT + radial * escape_w
	return dir.normalized() if dir.length() > 0.01 else Vector2.ZERO


## 朝玩家所在的方向, 吸附到四向主轴。
##
## 🏗️ 「朝向和移动方向解耦」仍然成立, 但解耦的对象变了:
##   追击可以走任意斜线, 朝向只能是四个方向之一。玩家从正上方走下来时,
##   敌人现在会**转过身 (背面)** 再出招, 而不是一直侧着身子砍。
##
## ⚠️ 用 Facing.choose 而不是 snap: 玩家在斜 45° 上时, 逐帧的浮点抖动
##    会让朝向在「右」和「上」之间来回翻, 预警扇形跟着抖 —— 看起来像显示 bug。
func _face_toward(p_target: Vector2) -> void:
	var to_target: Vector2 = _to_world_pt(p_target) - _world_pos()
	facing = Facing.choose(facing, to_target)


## 满足条件就起手。由 _update_ai 每帧调。
##
## 🏗️ 朝向在**起手瞬间锁定**, 起手期间不再追踪玩家。
##   这是有意的, 而且对「格挡」这个机制是必须的:
##     · 玩家能靠走位绕开 —— 否则敌人像磁铁一样跟着你转, 走位失去意义;
##     · 更重要的是, 玩家**能预判这一刀从哪个方向来**, 格挡才有得玩。
##
## 🏗️ 起手的条件不是「玩家有多近」, 而是「**我这一刀真的够得着**」——
##   直接拿待会儿要生成的那个 shape 去问 (contains_ground)。
##   用一个独立的距离阈值的话, 那个数和扇形的半径就是两个各自独立的门槛:
##   调了一边忘另一边, 表现是敌人在射程外起手、砍一片空气, 看起来像「AI 抽风」。
##   现在「能不能打到」只有一个来源, 和判定、预警读的是同一个对象。
##
## ⚠️ 这也顺手消掉了「对着空气挥」这个观感问题: 玩家站在扇形那条够不到的缝里时,
##    敌人**根本不会起手**, 而是继续走位把它套进来 (追击是斜的, 会自动修正纵深)。
func _try_start_attack() -> void:
	if not can_attack or attack_phase != AttackPhase.NONE:
		return
	if _attack_cooldown_timer > 0.0:
		return
	var target: Node2D = _get_player()
	if target == null:
		return

	_face_toward(target.global_position)
	# ⚠️ 先定朝向再问形状 —— 扇形的判定吃朝向, 反过来问会用上一次的朝向,
	#    于是玩家从右边绕到左边时会多挥空一刀。
	if not attack_shape().contains_ground(
			_world_pos(), facing, _to_world_pt(target.global_position)):
		return

	velocity = Vector2.ZERO
	attack_phase = AttackPhase.WINDUP
	_phase_timer = windup_duration


# ============================================================
# 世界空间 —— 攻击范围是**世界单位**, 所以「够不够得着」必须在世界尺子上量
# ============================================================
#
# 🏗️ 为什么这几个小换算要单独拎出来:
#   双空间模型 (见 belt_space.gd) 里, `position / velocity` 活在**屏幕**空间,
#   而攻击形状活在**世界**平面。任何「两边一起算」的地方都是 bug 的温床 ——
#   而它的表现只是「凑近了打不到 / 站在远处反而挨打」, 看不出是哪一行错了。
#   把换算收在这三个函数里, 调用点读起来就是「世界位置 / 世界速度」, 一眼能对上尺子。

## 自己的世界坐标 (x, z)。
func _world_pos() -> Vector2:
	return BeltSpace.to_world(global_position)


## 任意屏幕坐标 → 世界坐标。
func _to_world_pt(screen_pos: Vector2) -> Vector2:
	return BeltSpace.to_world(screen_pos)


## 世界速度向量 → 交给 CharacterBody2D 的**屏幕**速度。
##
## ⚠️ 这里用 to_screen 而不是先归一化再乘 —— 传进来的 world_dir 已经带了速度大小,
##    再归一化会把 move_speed 吃掉。压扁正好发生在这一步: 世界速度恒定的前提下,
##    屏幕上纵深方向的位移自然只有横向的一半 (这就是 2.5D 地面该有的样子)。
func _world_velocity(world_dir: Vector2, speed: float) -> Vector2:
	return BeltSpace.to_screen(world_dir.normalized() * speed)


# ============================================================
# 对外查询 —— 身体体积 (BodySeparation 的契约)
# ============================================================
## 身体的世界半径。玩家的 12 + 这里的 11 = 23 世界单位 ≈ 1/3 格,
## 就是「两个人贴住」该有的距离。见 body_separation.gd。
func body_radius() -> float:
	return BODY_RADIUS


## 死亡后不参与体积分离 —— 尸体不该挡住玩家, 而且会被死亡特效的击退推来推去。
func is_separable() -> bool:
	return not is_dead


# ============================================================
# 伤害 / 硬直 / 死亡
# ============================================================

## amount: 伤害值。from_position: 攻击点坐标, 用来算击退方向。
## breaks_armor: 是不是**满蓄重击**这类破霸体的招 (见文件头 🏗️ 霸体那段)。
func take_damage(amount: int = 1, from_position: Vector2 = Vector2.INF, breaks_armor: bool = false) -> void:
	if is_dead:
		return
	health -= amount
	_flash_timer = 0.1

	# 击退方向 = 从攻击点指向自己 (几何算法, 和 player.gd 是同一套)
	#
	# ⚠️ 这里**故意在屏幕空间算** (不换成世界坐标): 击退是一次性的推力, 它的观感
	#    就是「在画面上被推开」。换成世界空间的话, 纵深方向的击退会变成一半,
	#    等于把一组调好的手感数字全部改掉 —— 而那跟本轮要做的「攻击形状」无关。
	var away: Vector2 = BeltSpace.dir_to_screen(-facing)   # 兜底: 往身后推
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		if d.length() > 0.01:
			away = d.normalized()

	if breaks_armor:
		# 破霸体: 打断当前出招 + 长硬直。**最高优先级**, 直接覆盖任何相位。
		_cancel_attack()
		_stagger_timer = armor_break_stagger
		_stagger_total = armor_break_stagger
		_stun_timer = 0.0
		velocity = away * knockback_speed
		armor_broken.emit(global_position + Vector2(0.0, -20.0))
	elif attack_phase == AttackPhase.NONE:
		# 平时: 常规短硬直 + 击退
		_stun_timer = hit_stun_duration
		velocity = away * knockback_speed
	# ⚠️ else = 霸体中 (WINDUP / STRIKE): 掉血了, 但**不硬直、不击退、不断招**。
	#    这里的「什么都不做」是**有意的**, 不是漏写。
	#    删掉它 (哪怕只是「顺手也加个击退」), 满蓄重击就退化成「伤害高一点的轻击」,
	#    整个蓄力机制失去存在意义 —— 而且不会有任何报错来提醒你。

	if health <= 0:
		die()


## 持续伤害 (剑阵的每一跳)。**和 take_damage 是两条路, 不是同一个函数带参数。**
##
## 🏗️ 为什么必须分开:
##    剑阵每 0.5 秒打一次。如果走 take_damage, 那么每一跳都会:
##      · `_stun_timer = hit_stun_duration` → 敌人被永久硬直;
##      · `velocity = away * knockback_speed` → 敌人被永久推出圈外 ——
##        于是剑阵自己把敌人赶出去了, 「敌人要不要绕开」这个选择直接被抹掉;
##      · 霸体中也一样, 因为 DoT 根本不该被霸体影响。
##    合起来的效果是「剑阵 = 全场无限硬直」, 比任何单发技能都强,
##    而且它**读招机制会被彻底架空** —— 敌人永远在硬直里, 没有招可读。
##
##    所以持续伤害只做三件事: 掉血、闪白、死。
##    不硬直、不击退、不断招、不看霸体。这就是「持续伤害」在这个博弈里该有的重量:
##    它逼迫位, 不逼失误。
func take_dot(amount: int) -> void:
	if is_dead:
		return
	health -= amount
	_flash_timer = 0.08
	# ⚠️ 这里**故意不碰** attack_phase / _stun_timer / velocity。
	#    删掉上面这条注释之前, 先想清楚「敌人站在剑阵里还能不能出招」——
	#    答案是必须能, 否则剑阵就不是布置技, 是控制技。
	if health <= 0:
		die()


## 被玩家**精准格挡**。由 player.gd 在判定成功时调用 (`area.source.on_parried()`)。
##
## 效果 = 破霸体同级的硬直, 但**不掉血** —— 精准格挡本身不造成伤害,
## 它给的是一个反击窗口 (DESIGN.md: 「不耗精力 + 敌人硬直 + 反击窗口」)。
func on_parried() -> void:
	if is_dead:
		return
	_cancel_attack()
	_stagger_timer = parry_stagger
	_stagger_total = parry_stagger
	_stun_timer = 0.0
	_flash_timer = 0.15

	# 往后弹一下 —— 让「被挡下来」在**动作上**也看得出来, 而不只是数字上的硬直
	var target: Node2D = _get_player()
	if target != null:
		var away: Vector2 = global_position - target.global_position
		if away.length() > 0.01:
			velocity = away.normalized() * parry_recoil
			# 转向**面对攻击者** —— 直接复用追击那套主轴吸附,
			# 而不是再写一遍 `sign(away.x)` (纵向时那个符号是 0, 会静默朝右)。
			_face_toward(target.global_position)
	parried.emit(global_position + Vector2(0.0, -20.0))


func die() -> void:
	if is_dead:
		return
	is_dead = true
	# ⚠️ 死在出招中途必须收回判定框 —— 见 _end_strike() 的注释
	_cancel_attack()
	DeathBurst.spawn(get_tree(), global_position + Vector2(0.0, -16.0))
	died.emit(score_value)
	queue_free()


# ============================================================
# 动画状态 —— **将来接美术资源的接口** (和 player.gd 的同一套契约)
# ============================================================
#
# 🏗️ anim_state() 说「现在该播哪一段」, anim_phase() 说「播到几成」。
#    绘制层拿它们去摆骨架; 将来换成 SpriteFrames, 这两个函数直接变成
#    动画名和帧进度 —— 调用方一行都不用改。
#
# ⚠️ 相位一律从**判定那套计时器**算, 不另开时钟:
#    另开一个时钟的话, 动画和判定会各自漂移, 表现是「爪早就收回来了,
#    伤害却还在结算」, 而且只在某些帧率下出现。

## 现在该播哪一段。优先级 = 下面的判断顺序 (**先写的赢**)。
func anim_state() -> int:
	# 长硬直最高 —— 它连正在进行的出招都能打断 (见 _physics_process 的优先级链)
	if _stagger_timer > 0.0:
		return EnemyRig.Anim.STAGGER
	# 出招三相位。⚠️ 排在短硬直之前: 霸体期间挨打不进 STUN (见 take_damage)
	match attack_phase:
		AttackPhase.WINDUP:
			return EnemyRig.Anim.WINDUP
		AttackPhase.STRIKE:
			return EnemyRig.Anim.STRIKE
		AttackPhase.RECOVER:
			return EnemyRig.Anim.RECOVER
	if _stun_timer > 0.0:
		return EnemyRig.Anim.STUN
	# ⚠️ 用**世界**速度判断「在不在走」—— 用屏幕速度的话, 沿纵深移动
	#    (屏幕位移一半) 会慢半拍才切到步态。
	if BeltSpace.screen_speed_to_world(velocity) > 8.0:
		return EnemyRig.Anim.MOVE
	return EnemyRig.Anim.IDLE


## 当前动作播到几成 (0~1)。循环动作是循环进度, 一次性动作是进度, 硬直是**已过去**的比例。
func anim_phase() -> float:
	match anim_state():
		EnemyRig.Anim.MOVE:
			return fposmod(_gait_phase / TAU, 1.0)
		EnemyRig.Anim.IDLE:
			return fposmod(_anim_clock * 0.8, 1.0)
		EnemyRig.Anim.WINDUP:
			return windup_t()
		EnemyRig.Anim.STRIKE:
			return 1.0 - clampf(_phase_timer / maxf(0.001, strike_duration), 0.0, 1.0)
		EnemyRig.Anim.RECOVER:
			return 1.0 - clampf(_phase_timer / maxf(0.001, recover_duration), 0.0, 1.0)
		EnemyRig.Anim.STUN:
			return 1.0 - clampf(_stun_timer / maxf(0.001, hit_stun_duration), 0.0, 1.0)
		EnemyRig.Anim.STAGGER:
			# ⚠️ 没有 _stagger_total 时 (比如测试直接塞 _stagger_timer) 退回 0,
			#    这样至少画的是「刚被打趴」那一端, 而不是 1 - 1 = 0 之外的怪值。
			var total: float = _stagger_total if _stagger_total > 0.0 else _stagger_timer
			return 1.0 - clampf(_stagger_timer / maxf(0.001, total), 0.0, 1.0)
	return 0.0


## facing → 骨架视角 (和 player.gd::_rig_view 同一个映射)。
func _rig_view() -> int:
	if facing.y > 0.5:      # Facing.UP = 走向纵深 = 看到背面
		return EnemyRig.View.BACK
	if facing.y < -0.5:     # Facing.DOWN = 走向镜头 = 看到正面
		return EnemyRig.View.FRONT
	return EnemyRig.View.SIDE


# ============================================================
# 外观 —— 原点在脚底
# ============================================================
const HP_BAR_W: float = 34.0
## ⚠️ 从 -50 提到 -62: 骨架把妖兽的头/角抬高了 (头顶 ≈ -57), 血条留在 -50 会插进角里。
const HP_BAR_Y: float = -62.0
## 这一招**格挡挡不住** —— 预警会换成紫红 (见 EnemyAttack.UNBLOCKABLE_COLOR)。
##
## 🎮 谁设为 true: main.gd 摆怪时逐个指定 (将来是怪物模板/招式表的数据)。
##    做成逐只敌人的字段而不是「所有怪都这样」: 紫红必须是**少数**, 否则它就不是
##    一个需要读的信号 —— 满屏都是紫红的时候, 玩家的最优解又退化成同一个动作。
@export var attack_unblockable: bool = false


## 起手阶段的警示色 —— 身体/爪/眼/贴地扇形共用这一个来源 (见 EnemyAttack 的配色段)。
func _warn_color() -> Color:
	return EnemyAttack.warn_color_for(attack_unblockable)


func _draw() -> void:
	if is_dead:
		return

	# ⚠️ 起手预警**不在这里画** —— 它由 _tg (GroundTelegraph) 画在贴地层, 见文件头。
	#    画在这儿的话它会跟着敌人进 y-sort, 站得靠前一点就盖住玩家的脚。

	var base: Color = _type_color()
	var body: Color = Color.WHITE if _flash_timer > 0.0 else base
	# 起手时全身泛起警告色 —— 只靠地面那块范围还不够, 远处也要一眼看见
	if attack_phase == AttackPhase.WINDUP:
		body = body.lerp(_warn_color(), 0.25 + windup_t() * 0.5)
	# 收招期间整体压暗 —— 让「现在有破绽」这件事在视觉上是**可读的**
	elif attack_phase == AttackPhase.RECOVER:
		body = body.darkened(0.35)

	# 脚下阴影 —— 世界半径 14 的**圆**, 屏幕上自动成 2:1 椭圆。
	# 🏗️ 这一处**从等距时代活了下来**: 那时用 Iso.ground() 把正圆压成 2:1,
	#    而横版的 DEPTH_SCALE 恰好也是 0.5 —— 数值一样, 所以换视角时它不用改就对了。
	#    (整份 iso.gd 里只有这一个函数是「概念上仍然成立」的, 其余都是等距专属。)
	#    ⚠️ 但仍然改成走 BeltSpace: 同一个 0.5 有两份实现的话, 调其中一个就会漂。
	var shadow: PackedVector2Array = BeltSpace.ground_circle(14.0, 14)
	draw_colored_polygon(shadow, Color(0.0, 0.0, 0.0, 0.32))

	# 🔑 骨架: **先**按状态摆姿态, **再**解算。之后画的全是解出来的关节点。
	var view: int = _rig_view()
	_rig.apply(anim_state(), anim_phase())
	_rig.solve(view)

	# 🏗️ 骨架永远只产出「朝右」的坐标, 朝左在这里整体镜像 (和 player.gd 同一套)。
	#    各个 _draw_xxx 里出现任何 f 都是双重镜像的 bug。
	var f: float = facing.x if absf(facing.x) > 0.5 else 1.0
	draw_set_transform(Vector2.ZERO, 0.0, Vector2(f, 1.0))

	var far_c: Color = base.darkened(0.42)
	var near_c: Color = base.darkened(0.18)
	var claw_c: Color = base.darkened(0.28)
	# 出招爪的强调色: 起手越来越红, 命中帧亮成白热 —— 和地面预警是同一套语言
	var strike_c: Color = claw_c
	if attack_phase == AttackPhase.WINDUP:
		strike_c = claw_c.lerp(_warn_color(), 0.35 + windup_t() * 0.55)
	elif attack_phase == AttackPhase.STRIKE:
		strike_c = Color(1.0, 0.95, 0.85)
	elif attack_phase == AttackPhase.RECOVER:
		strike_c = claw_c.darkened(0.45)

	# 绘制顺序 = 遮挡关系。和 player.gd 同一条纪律:
	#   侧视:   尾 → 远爪 → 远腿 → 近腿 → 躯干 → 头 → 近爪
	#   背/正面: 尾 → 远腿 → 近腿 → 躯干 → 远爪 → 头 → 近爪
	# 出招爪 (近侧) 永远最后画 —— 玩家判断「它要往哪挥」全靠它。
	_draw_tail(base.darkened(0.30))
	if view == EnemyRig.View.SIDE:
		_draw_claw_arm(_rig.shoulder_far, _rig.elbow_far, _rig.hand_far, far_c)
		_draw_leg(_rig.hip_far, _rig.knee_far, _rig.ankle_far, far_c, view)
		_draw_leg(_rig.hip_near, _rig.knee_near, _rig.ankle_near, near_c, view)
		_draw_body(body, base)
		_draw_head(view, body, base)
		_draw_claw_arm(_rig.shoulder_near, _rig.elbow_near, _rig.hand_near, strike_c)
	else:
		_draw_leg(_rig.hip_far, _rig.knee_far, _rig.ankle_far, far_c, view)
		_draw_leg(_rig.hip_near, _rig.knee_near, _rig.ankle_near, near_c, view)
		_draw_body(body, base)
		_draw_claw_arm(_rig.shoulder_far, _rig.elbow_far, _rig.hand_far, far_c)
		_draw_head(view, body, base)
		_draw_claw_arm(_rig.shoulder_near, _rig.elbow_near, _rig.hand_near, strike_c)

	draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE)
	_draw_hp_bar()


## 起手预警 —— **本轮的 go/no-go 验收项**。
##
## 🎮 画的是判定区**将会出现的那个确切范围**: 直接调 `attack_shape()` ——
##    和 `_enter_strike()` 生成判定区时**是同一个函数、同一个几何来源**。
##    所以「你看到的范围」和「真的会打到你的范围」在结构上不可能对不上。
##
## 🏗️ 这一点比 v0.3 更强。v0.3 是靠「两处写同样的公式」维持同步
##    (`dir8 * attack_reach` 在 _draw_windup 和 _enter_strike 各写一遍) ——
##    那种同步只要有一处改动就会被破坏, 而且是静默的。现在只剩一个来源。
##
## ⚠️ 这段的可读性直接决定本轮成败: 如果玩家看不出「它要打了」,
##    那精准格挡就退化成背时间表, 整个设计作废。所以这里用了三重提示
##    (地面范围 + 全身变色 + 眼睛变红), 任何一条单独失效都还看得见。
##
## 🏗️ 注意参数是 **canvas** 而不是画在 self 上 —— 本函数由 `_tg` (GroundTelegraph)
##    回调执行, 画布是那个贴地层节点。几何一个字没变, 只是落到了角色**下面**。
##    见 ground_telegraph.gd 文件头 (第一版画在 self 上, 敌人站得靠前就盖住玩家的脚)。
## 起手进度 0 → 1 (0 = 刚抬手, 1 = 刀要落下了)。
##
## 🏗️ 提成一个函数, 因为**三个**地方要靠它同步: 地面扇形的张角/亮度、身体泛红、
##    眼睛变红。原来 `1.0 - _phase_timer / windup_duration` 在 _draw 和 _draw_windup
##    里各写了一遍 —— 那种重复不会报错, 只会让「身体还白着、地上已经血红」这种
##    半拍错位悄悄出现, 而且只有盯着看才发现。
func windup_t() -> float:
	return 1.0 - clampf(_phase_timer / maxf(0.001, windup_duration), 0.0, 1.0)


func _draw_windup_ground(canvas: CanvasItem) -> void:
	var t: float = windup_t()
	var sh: AttackShape = attack_shape()

	# ① 底衬: 随起手进度越来越实。快满时几乎不透明, 想忽略都难。
	#    ⚠️ origin 传 Vector2.ZERO = **自己脚下**, 这是 draw_telegraph 的合同
	#    (形状的圆心偏移烘焙在多边形里, 这里再加一次就是偏两次)。
	# ⚠️ 下面**三处**颜色全部从 c 派生, 不再各自写死橙红 —— 只改底衬的话,
	#    贴地上真正抢眼的扫过痕和前缘仍然是橙的, 紫红预警在远处根本读不出区别。
	var c: Color = _warn_color()
	var trail_c: Color = c.lightened(0.22)
	var edge_c: Color = c.lightened(0.40)
	var tip_c: Color = c.lightened(0.62)
	sh.draw_telegraph(
		canvas, Vector2.ZERO, facing,
		Color(c.r, c.g, c.b, 0.14 + t * 0.26),
		Color(c.lightened(0.2), 0.45 + t * 0.50))

	# ② 扫过的扇环: 从一侧扫到另一侧, 扫到哪儿就说明"刀到哪儿了"。
	#    🏗️ 用的是玩家刀光那**同一个** sweep_trail_points —— 于是「挥砍的进度感」
	#    在敌我两边是同一种视觉语言, 而它的半径也不可能和判定漂移。
	#    ⚠️ 起手阶段刀还没挥出去, 所以只画到 t 对应的角度, 最后一段才收满。
	var half: float = sh.half_angle_deg
	var to_deg: float = lerpf(-half, half, t)
	var pts: PackedVector2Array = sh.sweep_trail_points(
		Vector2.ZERO, facing, -half, to_deg, 0.30)
	if pts.size() >= 6:
		canvas.draw_colored_polygon(pts, Color(trail_c.r, trail_c.g, trail_c.b, 0.16 + t * 0.22))
		var edge: PackedVector2Array = PackedVector2Array()
		var edge_n: int = int(pts.size() / 2.0)   # 前半段 = 外缘
		for i: int in range(edge_n):
			edge.append(pts[i])
		canvas.draw_polyline(edge, Color(edge_c.r, edge_c.g, edge_c.b, 0.55 + t * 0.35), 2.0, true)

	# ③ 前缘: 一条从脚下射向「刀现在扫到哪儿」的亮线。
	#    和 ② 共用同一个 to_deg, 所以两者永远指向同一个角度。
	#    ⚠️ 用 shape 自己的 polar_to_screen 求那个点 —— 朝向翻转和压扁都在里面,
	#       在这里手写一遍 cos/sin 就是抄第二份几何, 而抄错的表现是
	#       「刀刃指着一个判定够不到的方向」, 画面上完全看不出来。
	canvas.draw_line(
		Vector2.ZERO, sh.polar_to_screen(to_deg, sh.reach, facing),
		Color(tip_c.r, tip_c.g, tip_c.b, 0.5 + t * 0.45), 2.5)


## 一截**有粗细变化**的肢体: 四点梯形 + 两端的关节圆 —— 和 player.gd::_segment 同款。
## 不用 draw_line 的理由见那边: 恒定粗细画出来是「棍子」而不是「肢体」。
func _seg(a: Vector2, b: Vector2, w0: float, w1: float, c: Color) -> void:
	var d: Vector2 = b - a
	var l: float = d.length()
	if l < 0.01:
		return
	var n: Vector2 = Vector2(-d.y, d.x) / l
	draw_colored_polygon(PackedVector2Array([
		a + n * w0 * 0.5, b + n * w1 * 0.5, b - n * w1 * 0.5, a - n * w0 * 0.5,
	]), c)
	draw_circle(a, w0 * 0.5, c)
	draw_circle(b, w1 * 0.5, c)


## 一条逆关节腿: 大腿 → 小腿 → 脚掌。
##
## ⚠️ 脚掌画成**水平**矩形、不跟着小腿转 (理由同 player.gd): 抬腿时脚竖起来
##    会读成「踮脚尖跳舞」, 水平脚 + 脚踝离地已经是清楚的抬腿信号。
func _draw_leg(hip: Vector2, knee: Vector2, ankle: Vector2, c: Color, view: int) -> void:
	_seg(hip, knee, 5.0, 4.0, c)
	_seg(knee, ankle, 4.0, 2.8, c)
	var boot: Color = c.darkened(0.35)
	if view == EnemyRig.View.SIDE:
		draw_rect(Rect2(ankle.x - 1.6, ankle.y, EnemyRig.FOOT_LEN + 2.0, EnemyRig.FOOT_H), boot, true)
	else:
		draw_rect(Rect2(ankle.x - 2.6, ankle.y, 5.2, EnemyRig.FOOT_H), boot, true)


## 一只爪: 上臂 → 前臂 → 手 → 三根爪尖。
##
## 🏗️ 爪尖方向 = **前臂方向**, 不是另存一个角度 —— 见 enemy_rig.gd::solve 的 ⚠️。
##    这样爪永远长在手上, 手臂怎么甩它都跟着, 不可能脱节。
func _draw_claw_arm(shoulder: Vector2, elbow: Vector2, hand: Vector2, c: Color) -> void:
	_seg(shoulder, elbow, 4.4, 3.4, c)
	_seg(elbow, hand, 3.4, 2.4, c)
	draw_circle(hand, 2.5, c.lightened(0.10))

	var d: Vector2 = hand - elbow
	if d.length() < 0.01:
		return
	var dir: Vector2 = d.normalized()
	var tip: Vector2 = hand + dir * EnemyRig.CLAW_LEN
	var perp: Vector2 = Vector2(-dir.y, dir.x)
	draw_line(hand, tip, c, 2.2)
	draw_line(tip, tip + dir * 3.0 + perp * 3.0, c, 1.8)
	draw_line(tip, tip + dir * 3.0 - perp * 3.0, c, 1.8)


## 躯干 —— 从胸口到胯的一个**跟着脊椎一起弯**的带子 + 背脊骨刺。
##
## 🏗️ 必须由骨架的 chest / pelvis 推出来, 不能写死坐标:
##    写死的话, 身体一前扑 (STRIKE) 躯干就留在原地, 看起来像「兽从自己的壳里冲出去了」。
func _draw_body(body: Color, base: Color) -> void:
	var up: Vector2 = EnemyRig.dir_of(_rig.spine)
	var side: Vector2 = Vector2(-up.y, up.x)
	var shoulder_w: float = 8.5
	var hip_w: float = 6.5

	draw_colored_polygon(PackedVector2Array([
		_rig.chest + side * shoulder_w,
		_rig.chest - side * shoulder_w,
		_rig.pelvis - side * hip_w,
		_rig.pelvis + side * hip_w,
	]), body)
	draw_polyline(PackedVector2Array([
		_rig.chest + side * shoulder_w,
		_rig.chest - side * shoulder_w,
		_rig.pelvis - side * hip_w,
		_rig.pelvis + side * hip_w,
		_rig.chest + side * shoulder_w,
	]), base.darkened(0.45), 1.5)

	# 腹侧压暗 + 后臀团块: 少了这两笔, 躯干就是一整片纯色带子, 读不出体积
	draw_colored_polygon(PackedVector2Array([
		_rig.chest + side * shoulder_w,
		_rig.chest + side * (shoulder_w - 2.5),
		_rig.pelvis + side * (hip_w - 2.0),
		_rig.pelvis + side * hip_w,
	]), Color(base.darkened(0.30).r, base.darkened(0.30).g, base.darkened(0.30).b, 0.65))
	draw_circle(_rig.pelvis - side * 1.0, 6.8, body.darkened(0.08))

	# 背脊骨刺: 沿背线三根小三角 —— 这是「妖兽」最强的剪影信号
	var back_a: Vector2 = _rig.pelvis - side * hip_w
	var back_b: Vector2 = _rig.chest - side * shoulder_w
	for i: int in range(1, 4):
		var p: Vector2 = back_a.lerp(back_b, float(i) / 4.0)
		draw_colored_polygon(PackedVector2Array([
			p + side * 1.5,
			p - side * 4.0,
			p - side * 1.0 + up * 2.5,
		]), base.darkened(0.50))


## 头 + 双角 + 眼 + 下颌。
##
## ⚠️ 坐标全部**朝右** (+x = 正前方), 一个 f 都不该出现 —— 镜像由外层统一处理。
## ⚠️ 朝上 (背面) 不画眼睛 (看到的是后脑); 朝下 (正面) 两只眼居中直视。
func _draw_head(view: int, body: Color, base: Color) -> void:
	var h: Vector2 = _rig.head_pt
	var r: float = EnemyRig.HEAD_R

	draw_circle(h, r, body)

	# 双角: 侧视朝后上方扫; 纵深视图左右各一根, 朝上
	var horn: Color = base.darkened(0.50)
	if view == EnemyRig.View.SIDE:
		draw_line(h + Vector2(-1.0, -r * 0.55), h + Vector2(-r * 1.15, -r * 1.55), horn, 2.6)
		draw_line(h + Vector2(r * 0.30, -r * 0.65), h + Vector2(-r * 0.35, -r * 1.80), horn, 2.2)
	else:
		draw_line(h + Vector2(-r * 0.45, -r * 0.55), h + Vector2(-r * 0.95, -r * 1.55), horn, 2.6)
		draw_line(h + Vector2(r * 0.45, -r * 0.55), h + Vector2(r * 0.95, -r * 1.55), horn, 2.6)

	# 眼: 起手时变红变大 (和地面预警同一套提示)
	var eye_c: Color = Color(1.0, 0.95, 0.4)
	var eye_r: float = 2.4
	if attack_phase == AttackPhase.WINDUP:
		eye_c = _warn_color()
		eye_r = 3.4
	if view == EnemyRig.View.FRONT:
		draw_circle(h + Vector2(-3.4, -1.8), eye_r, eye_c)
		draw_circle(h + Vector2(3.4, -1.8), eye_r, eye_c)
		# 正面: 张开的嘴 —— 一个压扁的暗色椭圆
		var maw: float = r * 0.34 * (0.55 + 0.65 * _rig.mouth_open)
		draw_circle(h + Vector2(0.0, r * 0.52), maxf(1.0, maw), Color(0.14, 0.05, 0.07))
	elif view == EnemyRig.View.SIDE:
		draw_circle(h + Vector2(r * 0.48, -r * 0.12), eye_r, eye_c)
		# 侧脸: 楔形的下颌, 张口时张嘴 —— 「要咬了」的身体语言
		var open: float = _rig.mouth_open
		draw_colored_polygon(PackedVector2Array([
			h + Vector2(r * 0.40, r * 0.18),
			h + Vector2(r * 1.02, r * 0.34 + 2.0 * open),
			h + Vector2(r * 0.40, r * 0.58 + 5.0 * open),
		]), Color(0.14, 0.05, 0.07))
		# 獠牙: 张口时从上颌露出来
		if open > 0.15:
			draw_line(h + Vector2(r * 0.72, r * 0.30),
				h + Vector2(r * 0.70, r * 0.42 + 3.0 * open), Color(0.95, 0.92, 0.82), 1.4)


## 尾巴 —— 两节锥形 + 末端一个箭头。它是「妖兽」和「人形」在剪影上最便宜的区别。
func _draw_tail(c: Color) -> void:
	_seg(_rig.tail_base, _rig.tail_mid, 5.0, 3.4, c)
	_seg(_rig.tail_mid, _rig.tail_tip, 3.4, 1.6, c)
	var d: Vector2 = _rig.tail_tip - _rig.tail_mid
	if d.length() < 0.01:
		return
	var dir: Vector2 = d.normalized()
	var perp: Vector2 = Vector2(-dir.y, dir.x)
	draw_colored_polygon(PackedVector2Array([
		_rig.tail_tip + dir * 5.0,
		_rig.tail_tip + perp * 3.2,
		_rig.tail_tip - perp * 3.2,
	]), c.darkened(0.20))


## 头顶血条 —— 只在掉过血之后显示 (满血时满屏血条很吵)
func _draw_hp_bar() -> void:
	if health >= max_health or max_health <= 0:
		return
	var ratio: float = clampf(float(health) / float(max_health), 0.0, 1.0)
	draw_rect(Rect2(-HP_BAR_W * 0.5, HP_BAR_Y, HP_BAR_W, 5.0), Color(0.08, 0.08, 0.10, 0.85))
	var c: Color = Color(0.35, 0.95, 0.45) if ratio > 0.5 else (Color(0.98, 0.7, 0.2) if ratio > 0.25 else Color(0.95, 0.25, 0.25))
	draw_rect(Rect2(-HP_BAR_W * 0.5, HP_BAR_Y, HP_BAR_W * ratio, 5.0), c)


func _type_color() -> Color:
	match enemy_type:
		Type.PATROL:     return Color(0.85, 0.34, 0.24)   # 橙红 — 巡逻兵
		Type.STATIONARY: return Color(0.72, 0.22, 0.58)   # 粉紫 — 固定靶
		Type.CHASER:     return Color(0.88, 0.16, 0.20)   # 深红 — 追踪者
	return Color.RED


# ============================================================
# 辅助
# ============================================================

## 找玩家 —— 走 "player" 组而不是 `current_scene.get_player()`。
## 场景根不该是节点查找的中介: 那样一换根节点类型就断, 而且跨场景复用不了。
func _get_player() -> Node2D:
	if not is_inside_tree():
		return null
	return get_tree().get_first_node_in_group("player") as Node2D


## 当前是否处于霸体 (起手/命中期间打不断)。给 debug 面板和自检看。
func has_armor() -> bool:
	return attack_phase == AttackPhase.WINDUP or attack_phase == AttackPhase.STRIKE


## 是否在长硬直里 (精准格挡 / 破霸体)。给自检看。
func is_staggered() -> bool:
	return _stagger_timer > 0.0
