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
## 朝向: **只有左右两个值** (+1 朝右 / -1 朝左), 和玩家同一个约定。
## ⚠️ 它和移动方向**解耦**: 追击时往斜线走, 但只朝左/右看 (见 _face_toward)。
var facing: int = 1
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
	# 朝向跟着**行进方向** —— 但只有沿 x 巡逻时它才有意义。
	# ⚠️ 沿纵深巡逻 (patrol_axis = Vector2.DOWN) 时**不动朝向**: 那个轴在横版里没有
	#    左右可言, `sign(axis.x)` 会得到 0 —— 而 facing = 0 在所有绘制和判定里
	#    都表现为「朝右」, 是一个不报错的错误朝向。
	if absf(axis.x) > 0.01:
		facing = -1 if axis.x * _patrol_sign < 0.0 else 1


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
	if ramp <= 0.0:
		velocity = velocity.move_toward(Vector2.ZERO, chase_stop_decel * delta)
		return

	# 世界平面上直线逼近 —— 归一化后再乘速度, 否则斜向会快 √2 倍
	velocity = _world_velocity(to_player, move_speed * chase_speed_scale * ramp)


## 朝向只由「玩家在左边还是右边」决定 —— 横版里**纵深不参与朝向**。
##
## 🏗️ 这就是「朝向和移动方向解耦」那件事的落点。
##   旧代码是 `facing_dir = to_player.normalized()`: 追击方向**就是**朝向,
##   于是敌人在斜着追的时候「朝向是右下方」, 而它的攻击是一个只往右下伸的方框。
##   横版里没有「右下」这个朝向 (美术只有左右两张), 一旦攻击改成吃朝向的扇形,
##   旧写法就会让敌人**朝右下看、却往右侧砍** —— 预警和判定都跟着错。
##
## ⚠️ dx 恰好为 0 (同一列, 只差纵深) 时**保持原朝向**。
##    写成 `facing = signi(dx)` 的话 dx=0 → facing=0, 而 0 在绘制和判定里
##    都表现为「朝右」—— 一个静默的错误朝向, 不会有任何报错。
func _face_toward(p_target: Vector2) -> void:
	var dx: float = _to_world_pt(p_target).x - _world_pos().x
	if absf(dx) > 0.01:
		facing = -1 if dx < 0.0 else 1


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
	var away: Vector2 = Vector2(float(-facing), 0.0)   # 兜底: 往身后推
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		if d.length() > 0.01:
			away = d.normalized()

	if breaks_armor:
		# 破霸体: 打断当前出招 + 长硬直。**最高优先级**, 直接覆盖任何相位。
		_cancel_attack()
		_stagger_timer = armor_break_stagger
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


## 被玩家**精准格挡**。由 player.gd 在判定成功时调用 (`area.source.on_parried()`)。
##
## 效果 = 破霸体同级的硬直, 但**不掉血** —— 精准格挡本身不造成伤害,
## 它给的是一个反击窗口 (DESIGN.md: 「不耗精力 + 敌人硬直 + 反击窗口」)。
func on_parried() -> void:
	if is_dead:
		return
	_cancel_attack()
	_stagger_timer = parry_stagger
	_stun_timer = 0.0
	_flash_timer = 0.15

	# 往后弹一下 —— 让「被挡下来」在**动作上**也看得出来, 而不只是数字上的硬直
	var target: Node2D = _get_player()
	if target != null:
		var away: Vector2 = global_position - target.global_position
		if away.length() > 0.01:
			velocity = away.normalized() * parry_recoil
			# 转向**面对攻击者** —— 和原来的 `facing_dir = -away.normalized()` 同一个含义
			# (away 是「从玩家指向自己」, 取反就是朝向玩家), 只是只取左右分量。
			# ⚠️ 不能照抄 `-away` 整条向量: 从正上方被挡下来时 away ≈ (0, ±1),
			#    取反得到 (0, ∓1) —— 那在横版里不是一个朝向 (表现为静默地朝右)。
			if absf(away.x) > 0.01:
				facing = 1 if away.x < 0.0 else -1
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
# 外观 —— 原点在脚底
# ============================================================
const HP_BAR_W: float = 34.0
const HP_BAR_Y: float = -50.0
## 起手预警色 (血红)
const WARN_COLOR: Color = Color(1.0, 0.22, 0.18)


func _draw() -> void:
	if is_dead:
		return

	# ⚠️ 起手预警**不在这里画** —— 它由 _tg (GroundTelegraph) 画在贴地层, 见文件头。
	#    画在这儿的话它会跟着敌人进 y-sort, 站得靠前一点就盖住玩家的脚。

	var base: Color = _type_color()
	var body: Color = Color.WHITE if _flash_timer > 0.0 else base
	# 起手时全身泛起警告色 —— 只靠地面那块范围还不够, 远处也要一眼看见
	if attack_phase == AttackPhase.WINDUP:
		body = body.lerp(WARN_COLOR, 0.25 + windup_t() * 0.5)
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

	# 身体: 低矮的梯形 (妖兽的蹲伏姿态), 原点在脚底
	draw_colored_polygon(PackedVector2Array([
		Vector2(-10.0, -30.0), Vector2(10.0, -30.0),
		Vector2(16.0, -2.0), Vector2(-16.0, -2.0),
	]), body)
	draw_polyline(PackedVector2Array([
		Vector2(-10.0, -30.0), Vector2(10.0, -30.0),
		Vector2(16.0, -2.0), Vector2(-16.0, -2.0), Vector2(-10.0, -30.0),
	]), base.darkened(0.45), 1.5)

	_draw_claw(base)

	# 头 + 双角
	draw_circle(Vector2(0.0, -34.0), 10.0, body)
	draw_line(Vector2(-6.0, -42.0), Vector2(-10.0, -50.0), base.darkened(0.5), 2.5)
	draw_line(Vector2(6.0, -42.0), Vector2(10.0, -50.0), base.darkened(0.5), 2.5)

	# 眼睛: 朝向来指示当前方向 (只有左右 —— 追击走斜线, 但朝向只有两个值);
	# 起手时变红 + 变大
	var eye_off: Vector2 = Vector2(float(facing) * 4.0, 1.2)
	var eye_c: Color = Color(1.0, 0.95, 0.4)
	var eye_r: float = 2.6
	if attack_phase == AttackPhase.WINDUP:
		eye_c = WARN_COLOR
		eye_r = 3.6
	draw_circle(Vector2(-3.5, -36.0) + eye_off, eye_r, eye_c)
	draw_circle(Vector2(3.5, -36.0) + eye_off, eye_r, eye_c)

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
	sh.draw_telegraph(
		canvas, Vector2.ZERO, facing,
		Color(WARN_COLOR.r, WARN_COLOR.g, WARN_COLOR.b, 0.14 + t * 0.26),
		Color(1.0, 0.45, 0.3, 0.45 + t * 0.50))

	# ② 扫过的扇环: 从一侧扫到另一侧, 扫到哪儿就说明"刀到哪儿了"。
	#    🏗️ 用的是玩家刀光那**同一个** sweep_trail_points —— 于是「挥砍的进度感」
	#    在敌我两边是同一种视觉语言, 而它的半径也不可能和判定漂移。
	#    ⚠️ 起手阶段刀还没挥出去, 所以只画到 t 对应的角度, 最后一段才收满。
	var half: float = sh.half_angle_deg
	var to_deg: float = lerpf(-half, half, t)
	var pts: PackedVector2Array = sh.sweep_trail_points(
		Vector2.ZERO, facing, -half, to_deg, 0.30)
	if pts.size() >= 6:
		canvas.draw_colored_polygon(pts, Color(1.0, 0.62, 0.35, 0.16 + t * 0.22))
		var edge: PackedVector2Array = PackedVector2Array()
		for i: int in range(pts.size() / 2):
			edge.append(pts[i])
		canvas.draw_polyline(edge, Color(1.0, 0.72, 0.45, 0.55 + t * 0.35), 2.0, true)

	# ③ 前缘: 一条从脚下射向「刀现在扫到哪儿」的亮线。
	#    和 ② 共用同一个 to_deg, 所以两者永远指向同一个角度。
	#    ⚠️ 用 shape 自己的 polar_to_screen 求那个点 —— 朝向翻转和压扁都在里面,
	#       在这里手写一遍 cos/sin 就是抄第二份几何, 而抄错的表现是
	#       「刀刃指着一个判定够不到的方向」, 画面上完全看不出来。
	canvas.draw_line(
		Vector2.ZERO, sh.polar_to_screen(to_deg, sh.reach, facing),
		Color(1.0, 0.85, 0.6, 0.5 + t * 0.45), 2.5)


## 前爪 —— 出招的**肢体语言**。地面预警告诉你「打哪儿」, 这个告诉你「它正在挥」。
##
## 起手时往身后拉 (蓄势), 命中帧甩到身前, 收招时垂下来。
## 少了它, 起手预警就只剩一块地面色块, 读起来像「地上有个 UI」而不是「它要砍我了」。
func _draw_claw(base: Color) -> void:
	var f: float = float(facing)
	# 🏗️ 角度一律在「朝右」的坐标系里算 (swing), 最后把 x 分量按朝向镜像。
	#    ⚠️ 不能直接对 `d = (f, 0)` 调 rotated(): 旋转是绕圈的, 不认镜面 ——
	#       于是朝左时「往身后拉」会变成「往身前伸」, 蓄势和挥砍正好反过来。
	#       这个 bug 只在朝左时出现, 而朝右时一切正常。
	var swing: float = 0.6        # 待机: 爪尖略垂
	var length: float = 15.0
	var claw_color: Color = base.darkened(0.35)

	match attack_phase:
		AttackPhase.WINDUP:
			var t: float = 1.0 - clampf(_phase_timer / maxf(0.001, windup_duration), 0.0, 1.0)
			# 往身后拉: 从 -0.5 rad 拉到 -1.5 rad, 越接近命中拉得越狠
			swing = lerpf(-0.5, -1.5, t)
			length = lerpf(16.0, 24.0, t)
			claw_color = base.lerp(WARN_COLOR, 0.4 + t * 0.5)
		AttackPhase.STRIKE:
			swing = 0.0
			length = 30.0
			claw_color = Color(1.0, 0.95, 0.85)
		AttackPhase.RECOVER:
			swing = 0.9
			length = 14.0
			claw_color = base.darkened(0.55)

	var dir_r: Vector2 = Vector2.RIGHT.rotated(swing)
	var claw_dir: Vector2 = Vector2(dir_r.x * f, dir_r.y)
	var shoulder: Vector2 = Vector2(0.0, -24.0) + Vector2(f * 4.0, 0.0)
	var tip: Vector2 = shoulder + claw_dir * length
	draw_line(shoulder, tip, claw_color, 4.0)
	# 爪尖分叉
	var perp: Vector2 = Vector2(-claw_dir.y, claw_dir.x)
	draw_line(tip, tip + claw_dir * 5.0 + perp * 3.5, claw_color, 2.0)
	draw_line(tip, tip + claw_dir * 5.0 - perp * 3.5, claw_color, 2.0)


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
