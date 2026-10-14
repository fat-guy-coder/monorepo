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
## ⚠️ v0.2 的四条骨, 一个字都不能改回去:
##   ① 删掉重力与 `is_on_floor()`。残留的 `velocity.y = -80` 式击退在无重力世界里
##      会让敌人**一路飘出地图**, 而且看起来像「AI 抽风跑到地图外面」。
##   ② motion_mode 必须 FLOATING。
##   ③ 原点在**脚底**, _draw() 一律负 Y 往上。
##   ④ 朝向是 Vector2, 不是 bool。
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
@export var move_speed: float = 80.0
@export var chase_speed_scale: float = 1.35   ## 追踪时的速度倍率
## 巡逻轴: 默认沿地格 +x (屏幕右上↘)。改成 Vector2.DOWN 就是沿 +y 巡逻。
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
@export var attack_trigger_range: float = 58.0  ## 进这个距离才起手 (略大于 reach)
## 判定框中心离身体多远。
## ⚠️ 别随手调大 —— 它和 EnemyAttack.BOX_SIZE 一起决定「贴身死区」的宽度,
##    调大会让玩家可以贴着敌人免疫挥砍 (完整推导写在 enemy_attack.gd 的 BOX_SIZE 上方)。
@export var attack_reach: float = 22.0
@export var attack_knockback: float = 300.0   ## 打中玩家时的击退初速

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
var facing_dir: Vector2 = Vector2.DOWN
var attack_phase: AttackPhase = AttackPhase.NONE

var _phase_timer: float = 0.0
var _attack_cooldown_timer: float = 0.0
var _stun_timer: float = 0.0          ## 平时挨打的短硬直
var _stagger_timer: float = 0.0       ## 精准格挡 / 破霸体的长硬直 (最高优先级)
var _flash_timer: float = 0.0
var _patrol_sign: float = 1.0
## 当前在场上的攻击判定区 (STRIKE 期间非 null)。破霸体/死亡时必须收回它。
var _attack_area: EnemyAttack = null


func _ready() -> void:
	# ⚠️ 无重力 —— 见文件头 ⚠️①
	motion_mode = CharacterBody2D.MOTION_MODE_FLOATING

	# bit1: "我是敌人身体"   bit4: "我只跟墙碰"
	collision_layer = 1 << 1
	collision_mask = 1 << 4

	health = max_health
	start_position = position
	add_to_group("enemies")

	# ⚠️ v0.2 这里还有一个常驻的接触伤害 Hitbox, v0.3 删掉了 (见文件头 🎮)。
	#    如果它还在, 玩家贴脸站着就会持续掉血, 「看清出招再挡」这件事
	#    会被一个躲不掉的伤害源盖住, 本轮要验的格挡手感就完全测不出来。


func _physics_process(delta: float) -> void:
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


## 起手 → 命中。生成判定区。
##
## ⚠️ 判定框位置**不做任何等距投影**: 物理世界就是屏幕 XY (见 iso.gd 文件头)。
func _enter_strike() -> void:
	attack_phase = AttackPhase.STRIKE
	_phase_timer = strike_duration

	var atk: EnemyAttack = EnemyAttack.new()
	atk.damage = attack_damage
	atk.knockback = attack_knockback
	atk.source = self          # 精准格挡靠它反打 (见 enemy_attack.gd 文件头 🏗️)
	atk.lifetime = strike_duration
	atk.position = Iso.dir8(facing_dir) * attack_reach
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
			_process_chase()
	_try_start_attack()


func _process_patrol() -> void:
	var axis: Vector2 = patrol_axis.normalized() if patrol_axis != Vector2.ZERO else Vector2.RIGHT
	var offset: float = (position - start_position).dot(axis)
	if absf(offset) > patrol_range:
		_patrol_sign = -signf(offset)
	facing_dir = axis * _patrol_sign
	velocity = facing_dir * move_speed


func _process_chase() -> void:
	var target: Node2D = _get_player()
	if target == null:
		velocity = velocity.move_toward(Vector2.ZERO, 400.0)
		return
	var to_player: Vector2 = target.global_position - global_position
	if to_player.length() > 1.0:
		# 八向直线逼近 —— 归一化后再乘速度, 否则斜向会快 √2 倍
		facing_dir = to_player.normalized()
		velocity = facing_dir * move_speed * chase_speed_scale


## 满足条件就起手。由 _update_ai 每帧调。
##
## 🏗️ 朝向在**起手瞬间锁定**, 起手期间不再追踪玩家。
##   这是有意的, 而且对「格挡」这个机制是必须的:
##     · 玩家能靠走位绕开 —— 否则敌人像磁铁一样跟着你转, 走位失去意义;
##     · 更重要的是, 玩家**能预判这一刀从哪个方向来**, 扇形格挡才有得玩。
##   如果实测发现太容易绕, 再改成「起手前 60% 缓慢追踪」也不迟。
func _try_start_attack() -> void:
	if not can_attack or attack_phase != AttackPhase.NONE:
		return
	if _attack_cooldown_timer > 0.0:
		return
	var target: Node2D = _get_player()
	if target == null:
		return
	var to_target: Vector2 = target.global_position - global_position
	if to_target.length() > attack_trigger_range:
		return

	if to_target.length() > 1.0:
		facing_dir = to_target.normalized()
	velocity = Vector2.ZERO
	attack_phase = AttackPhase.WINDUP
	_phase_timer = windup_duration


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
	var away: Vector2 = -facing_dir
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		away = d.normalized() if d.length() > 0.01 else -facing_dir

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
			facing_dir = -away.normalized()
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

	# 起手预警画在**最底层** —— 它是地面上的范围提示, 不该盖住敌人本体
	if attack_phase == AttackPhase.WINDUP:
		_draw_windup()

	var base: Color = _type_color()
	var body: Color = Color.WHITE if _flash_timer > 0.0 else base
	# 起手时全身泛起警告色 —— 只靠地面那块范围还不够, 远处也要一眼看见
	if attack_phase == AttackPhase.WINDUP:
		var t: float = 1.0 - clampf(_phase_timer / maxf(0.001, windup_duration), 0.0, 1.0)
		body = body.lerp(WARN_COLOR, 0.25 + t * 0.5)
	# 收招期间整体压暗 —— 让「现在有破绽」这件事在视觉上是**可读的**
	elif attack_phase == AttackPhase.RECOVER:
		body = body.darkened(0.35)

	# 脚下阴影 (等距: 正圆压成 2:1 椭圆)
	var shadow: Array[Vector2] = []
	for i: int in range(14):
		var a: float = float(i) / 14.0 * TAU
		shadow.append(Iso.ground(Vector2(cos(a), sin(a)) * 14.0))
	draw_colored_polygon(PackedVector2Array(shadow), Color(0.0, 0.0, 0.0, 0.32))

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

	# 眼睛: 朝向来指示当前方向 (追踪时会跟着玩家转); 起手时变红 + 变大
	var ex: Vector2 = Iso.dir8(facing_dir)
	var eye_off: Vector2 = Vector2(ex.x * 4.0, ex.y * 2.5)
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
## 🎮 画的是判定框**将会出现的那个确切位置**, 用的是 EnemyAttack.BOX_SIZE 和
##    与 _enter_strike() 完全相同的坐标算法 (`dir8 * attack_reach`)。
##    所以「你看到的范围」和「真的会打到你的范围」是同一个东西 ——
##    预警不可能骗人, 也不会因为改了参数而悄悄对不上。
##
## ⚠️ 这段的可读性直接决定本轮成败: 如果玩家看不出「它要打了」,
##    那精准格挡就退化成背时间表, 整个设计作废。所以这里用了三重提示
##    (地面范围 + 全身变色 + 眼睛变红), 任何一条单独失效都还看得见。
func _draw_windup() -> void:
	var t: float = 1.0 - clampf(_phase_timer / maxf(0.001, windup_duration), 0.0, 1.0)
	var center: Vector2 = Iso.dir8(facing_dir) * attack_reach
	var half: Vector2 = EnemyAttack.BOX_SIZE * 0.5
	var rect: Rect2 = Rect2(center - half, EnemyAttack.BOX_SIZE)

	# ① 底衬: 随起手进度越来越实。快满时几乎不透明, 想忽略都难。
	draw_rect(rect, Color(WARN_COLOR.r, WARN_COLOR.g, WARN_COLOR.b, 0.10 + t * 0.30))
	# ② 外框: 从细到粗, 给出「快到了」的进度感
	draw_rect(rect, Color(1.0, 0.45, 0.3, 0.40 + t * 0.55), false, 1.5 + t * 2.0)
	# ③ 收束的四角: 从判定框的四角往中心收, 收拢到多半时就是命中帧
	var k: float = 1.0 - t * 0.45
	draw_line(rect.position, rect.position + half * 0.7 * k, Color(1.0, 0.6, 0.4, 0.85), 2.0)
	draw_line(rect.position + Vector2(rect.size.x, 0.0), rect.position + Vector2(rect.size.x, 0.0) + Vector2(-half.x * 0.7 * k, half.y * 0.7 * k), Color(1.0, 0.6, 0.4, 0.85), 2.0)
	draw_line(rect.position + rect.size, rect.position + rect.size - half * 0.7 * k, Color(1.0, 0.6, 0.4, 0.85), 2.0)
	draw_line(rect.position + Vector2(0.0, rect.size.y), rect.position + Vector2(0.0, rect.size.y) + Vector2(half.x * 0.7 * k, -half.y * 0.7 * k), Color(1.0, 0.6, 0.4, 0.85), 2.0)


## 前爪 —— 出招的**肢体语言**。地面预警告诉你「打哪儿」, 这个告诉你「它正在挥」。
##
## 起手时往身后拉 (蓄势), 命中帧甩到身前, 收招时垂下来。
## 少了它, 起手预警就只剩一块地面色块, 读起来像「地上有个 UI」而不是「它要砍我了」。
func _draw_claw(base: Color) -> void:
	var d: Vector2 = Iso.dir8(facing_dir)
	var shoulder: Vector2 = Vector2(0.0, -24.0) + d * 4.0
	var claw_dir: Vector2 = d
	var length: float = 16.0
	var claw_color: Color = base.darkened(0.35)

	match attack_phase:
		AttackPhase.WINDUP:
			var t: float = 1.0 - clampf(_phase_timer / maxf(0.001, windup_duration), 0.0, 1.0)
			# 往身后拉: 从 -0.5 rad 拉到 -1.5 rad, 越接近命中拉得越狠
			claw_dir = d.rotated(lerpf(-0.5, -1.5, t))
			length = lerpf(16.0, 24.0, t)
			claw_color = base.lerp(WARN_COLOR, 0.4 + t * 0.5)
		AttackPhase.STRIKE:
			claw_dir = d
			length = 30.0
			claw_color = Color(1.0, 0.95, 0.85)
		AttackPhase.RECOVER:
			claw_dir = d.rotated(0.9)
			length = 14.0
			claw_color = base.darkened(0.55)
		_:
			claw_dir = d.rotated(0.6)
			length = 15.0

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
