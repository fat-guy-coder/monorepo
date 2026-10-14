extends CharacterBody2D
class_name BlitzPlayer
## 武侠角色控制器 — 等距八向走位 + 格挡/精准格挡 + 蓄力重击 (v0.3)
##
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d    — CharacterBody2D: move_and_slide / velocity
##   godot-2-8-tilemap            — 等距投影: 2:1 菱形 + Y-sort 深度
##   godot-7-8-state-machines     — 状态机: 8 个状态, 每个状态独占一帧
##   godot-5-1-input-map          — InputMap: project.godot 里的按键映射
##   godot-5-2-input-handling     — Input.get_vector / is_action_pressed / just_released
##   godot-5-3-mouse-touch        — get_global_mouse_position: 格挡时用鼠标瞄准
##   godot-6-2-area2d-deep        — Area2D: 攻击判定框 / 受击判定区
##   godot-6-4-collision-layers   — 位掩码: layer vs mask
##   godot-2-3-node2d-basics      — _draw() 画角色外观 / 蓄力气场 / 扇形边界
##   godot-1-8-signals-basics     — 自定义信号: health_changed / parried / blocked
##   godot-1-1-gdscript-basics    — 强类型标注: `var x: Vector2`
##
## ⚠️⚠️ 从横版(v0.1)改成等距(v0.2)时定下的四条骨, 一个字都别改回去:
##
##   ① **没有重力, 没有跳跃**。横版是「X 轴移动 + Y 轴重力」, 等距是
##      「XY 平面自由移动」。任何残留的 `velocity.y -= 280` 式击退**永远不会落回来** ——
##      实体会一路飘出屏幕外, 而且看起来像「相机坏了」, 排查方向完全错。
##
##   ② **必须 MOTION_MODE_FLOATING**。默认的 GROUNDED 会把南边的墙当成地面,
##      `is_on_floor()` 一阵乱跳。而 FLOATING 模式下 `is_on_floor()` **永远返回 false**
##      (所有碰撞都报 on_wall) —— 所以受击退出**只看计时器, 不看地面**。见 _process_hit()。
##
##   ③ **原点在脚底**, `_draw()` 一律用负 Y 往上。Y-sort 的排序键是
##      global_position.y —— 原点在脚底, 「谁在前面」才等于「谁的 y 更大」。
##
##   ④ **朝向是 Vector2, 不是 bool**。二维平面里「左右翻面」表达不了八个方向。
##
## 🏗️ 碰撞层 (必须与 enemy.gd / attack_hitbox.gd / obstacle.gd 一致):
##   bit0 = 玩家身体   ↑本文件 collision_layer
##   bit1 = 敌人身体
##   bit2 = 玩家攻击
##   bit3 = 敌人攻击   ↓本文件 Hurtbox mask (**只监听这一个** —— 见 _ready())
##   bit4 = 墙壁/障碍  ↑本文件 collision_mask (只跟墙碰撞)
##   bit5 = 交互物/复活点
##
## 🎮 v0.3 新增的三件事, 以及它们**为什么必须一起做**:
##
##   **格挡** —— 免伤, 但扣精力, 而且是**正面 ±90° 扇形**, 背后挨打照常掉血。
##   **精准格挡** —— 按下格挡的**那一瞬间**有个 0.16s 窗口, 窗口内挨打则零伤害、
##     零消耗、还把攻击者打出 1.2s 硬直 (反击窗口)。
##   **蓄力重击** —— 按住 K/右键蓄力, 松开挥出; 满蓄**破霸体**。
##
##   这三件事缺一不可: 没有敌人出招, 格挡无从谈起; 没有精力成本,
##   举着盾就是无敌; 没有满蓄重击, 敌人起手时你除了躲没有别的解法。
##   (敌人出招见 enemy.gd 的 AttackPhase 三相位)
##
## 🏗️ 格挡时朝向改成**跟随鼠标** —— 这是本轮唯一一处破坏「朝向 = 移动方向」的地方。
##
##   为什么非改不可: 原来的朝向**只在走位时更新**。一旦格挡分了朝向, 就会出现
##   「站着举盾 → 敌人绕到背后 → 你既打不着它也转不了身 → 只能干挨打」。
##   这不是手感问题, 是这个设计在原来的输入规则下**根本无法成立**。
##
##   ⚠️ NORMAL 状态下的朝向仍然 = 移动方向 (没变)。只有 BLOCKING 例外。
##      改的时候别顺手把这条规则也搬到别的状态去 —— 蓄力/攻击的朝向都应该是
##      「你往哪走就朝哪」, 否则走位会变得很难预测。

# ============================================================
# 信号 — 让 HUD / main.gd 被动接收, 而不是每帧轮询
# ============================================================

## 血量变化 (HUD 订阅它刷新血格)
signal health_changed(current: int, maximum: int)
## 精力变化 (HUD 订阅它刷新精力条)
signal stamina_changed(current: float, maximum: float)
## 死亡 (main.gd 订阅它安排复活)
signal died()
## 闪避开始
signal dashed(direction: Vector2)
## 攻击命中 (main.gd 订阅它震屏 —— 命中反馈的一半来自镜头)
signal hit_landed(at: Vector2)
## 精准格挡成功 (零伤害零消耗 + 攻击者硬直)
signal parried(at: Vector2)
## 普通格挡成功 (免伤, 扣了精力)
signal blocked(at: Vector2)
## 精力耗尽被打崩
signal guard_broken()

# ============================================================
# 节点引用 (player.tscn 里预创建)
# ============================================================
@onready var hurtbox: Area2D = $Hurtbox

# ============================================================
# 移动参数
# ============================================================
@export var move_speed: float = 320.0        ## 最大移动速度 px/s
@export var move_accel: float = 2000.0       ## 加速度 px/s² (按键时)
@export var move_decel: float = 1600.0       ## 减速度 px/s² (松键时)

# ============================================================
# 闪避参数
# ============================================================
@export var dash_speed: float = 900.0
@export var dash_duration: float = 0.15
@export var dash_cooldown: float = 0.5

# ============================================================
# 轻击参数
# ============================================================
@export var attack_light_damage: int = 1
@export var attack_light_duration: float = 0.15   ## 判定框存在时长 / 出刀硬直
@export var attack_light_cooldown: float = 0.25
@export var attack_reach: float = 34.0            ## 判定框中心离角色多远 (沿 facing8)

# ============================================================
# 重击参数 (蓄力)
# ============================================================
@export var heavy_charge_max: float = 0.75        ## 蓄满所需时间 (秒)
## 蓄到这个比例就算「满蓄」, 可以破霸体。
## 留 10% 宽容度是有意的: 差一点点没蓄满就完全不算, 玩家会觉得「明明满了却不破」,
## 而那个瞬间的困惑比这点宽容带来的收益大得多。
@export var heavy_armor_break_ratio: float = 0.9
@export var heavy_damage_min: int = 2             ## 点一下就松 (几乎没蓄) 的伤害
@export var heavy_damage_max: int = 4             ## 满蓄伤害
@export var heavy_duration: float = 0.34          ## 出刀硬直 (轻击的两倍多, 挥空就是挨打)
@export var heavy_cooldown: float = 0.5
@export var heavy_reach: float = 40.0
@export var heavy_box_size: Vector2 = Vector2(62.0, 46.0)   ## 重击判定框 (比轻击 46×34 大)
@export var heavy_max_targets: int = 3            ## 重击可以扫到多个目标
@export var charge_move_scale: float = 0.5        ## 蓄力时可以慢走 (用户选定的手感)

# ============================================================
# 格挡参数
# ============================================================
## 精准格挡窗口 (秒)。按下的**那一瞬间**开始算, 过了就只是普通格挡。
## 0.16s @60Hz ≈ 9.6 物理帧 —— 既在魂系的 0.13~0.2 区间内,
## 又足够让 headless 自检确定性地命中它 (见 smoke_test.gd)。
@export var parry_window: float = 0.16
## 精准窗口的冷却。**必须有** —— 否则最优解是疯狂连点 Shift,
## 每一下都重开窗口, 于是「精准格挡」变成一个没有代价的按键宏,
## 本轮要验的「高频决策」直接退化成「高频无脑按」。
@export var parry_cooldown: float = 0.45
## 格挡时的移动速度倍率
@export var block_move_scale: float = 0.4
## 扇形边界: 与 facing_dir 的点积 >= 这个值才算「挡在正面」。
## 0.0 = ±90° (半个平面)。调成 0.7 就收窄成 ±45°。
@export var block_cone_cos: float = 0.0
@export var guard_break_duration: float = 0.9     ## 破防硬直
@export var guard_break_knockback: float = 300.0

# ============================================================
# 精力参数 (见 scripts/combat/stat_pool.gd)
# ============================================================
@export var stamina_max: float = 100.0
@export var stamina_regen: float = 45.0
@export var stamina_regen_delay: float = 0.7
@export var dash_cost: float = 25.0
@export var heavy_cost: float = 30.0
@export var block_drain_per_sec: float = 12.0     ## 举着盾时的持续消耗
@export var block_hit_cost: float = 20.0          ## 硬吃一下的消耗 (会乘伤害值)
@export var guard_break_regen_lock: float = 1.1   ## 破防后锁住回复的秒数

# ============================================================
# 受击参数
# ============================================================
@export var max_health: int = 3
@export var invincible_duration: float = 1.2
@export var hit_stun_duration: float = 0.28
@export var knockback_speed: float = 380.0
@export var knockback_decel: float = 1800.0

# ============================================================
# 状态机
# ============================================================
enum State { NORMAL, BLOCKING, CHARGING, ATTACKING, DASHING, HIT, GUARD_BROKEN, DEAD }
## 攻击种类 —— ATTACKING 一段代码要同时伺候轻击和重击, 靠它分流时长/挥刀弧度
enum AttackKind { LIGHT, HEAVY }

var state: State = State.NORMAL
var _attack_kind: AttackKind = AttackKind.LIGHT
## 当前这一刀的**总时长** (判定框 lifetime 和挥刀插值都用它)
var _attack_total: float = 0.15

## 朝向 (连续值, 单位向量)。不要改回 bool —— 见文件头 ⚠️④
var facing_dir: Vector2 = Vector2.DOWN

## 格挡瞄准的**覆写出口**。Vector2.ZERO = 读鼠标 (正常玩法)。
##
## 🏗️ 留这个出口的三个真实消费者:
##   ① 手柄右摇杆瞄准 (以后要做)
##   ② 未来的自动锁定 / 软锁定
##   ③ **headless 自检** —— headless 下鼠标恒为屏幕原点, 扇形判定根本测不准,
##      有了它自检才能直接指定「我现在面朝哪」。
var block_aim_override: Vector2 = Vector2.ZERO

var health: int = 0
var invincible_timer: float = 0.0

## 精力池 (自己进树/出树都不需要它, 所以是 RefCounted 而不是 Node)
var stamina: StatPool = null

# ── 内部计时器 ──
var _dash_timer: float = 0.0
var _dash_cooldown_timer: float = 0.0
var _attack_timer: float = 0.0
var _attack_cooldown_timer: float = 0.0
var _hit_stun_timer: float = 0.0
var _hit_flash_timer: float = 0.0
var _charge_timer: float = 0.0
var _parry_window_timer: float = 0.0
var _parry_cooldown_timer: float = 0.0
var _parry_flash_timer: float = 0.0
var _block_flash_timer: float = 0.0
var _guard_break_timer: float = 0.0

## 攻击判定框场景。用 preload 常量而非 main.gd 注入 —— 依赖写死在这里,
## 少了「忘了注入 → 攻击静默失效」这一整类 bug。
const ATTACK_HITBOX_SCENE: PackedScene = preload("res://scenes/attack_hitbox.tscn")


# ============================================================
# 初始化
# ============================================================
func _ready() -> void:
	# ⚠️ 俯视角必须 FLOATING —— 见文件头 ⚠️②
	motion_mode = CharacterBody2D.MOTION_MODE_FLOATING

	health = max_health

	# bit0: "我是玩家"
	collision_layer = 1 << 0
	# bit4: "我只跟墙壁/障碍碰撞" —— 地面是纯视觉的 (见 iso_floor.gd)
	collision_mask = 1 << 4

	# 受击判定区: **只监听敌人的攻击判定区 (bit3)**
	# ⚠️ v0.2 这里还有 bit1 (敌人身体), 因为那时敌人靠「贴身碰撞」造成伤害。
	#    v0.3 删掉了接触伤害 → bit1 也一并去掉。留着的话敌人走过来仍会触发
	#    body_entered, 只是没人接 —— 属于安静的误导 (下一个人会以为接触伤害还在)。
	hurtbox.collision_layer = 0
	hurtbox.collision_mask = 1 << 3
	hurtbox.area_entered.connect(_on_hurtbox_area_entered)

	# 敌人靠这个组找玩家 (BlitzEnemy._get_player)。
	add_to_group("player")

	stamina = StatPool.new(stamina_max, stamina_regen, stamina_regen_delay)
	stamina.changed.connect(_on_stamina_changed)

	health_changed.emit(health, max_health)
	stamina_changed.emit(stamina.current, stamina.max_value)


# ============================================================
# 主物理循环
# ============================================================
func _physics_process(delta: float) -> void:
	if state == State.DEAD:
		return

	_update_timers(delta)
	stamina.tick(delta)

	match state:
		State.NORMAL:
			_process_normal(delta)
		State.BLOCKING:
			_process_blocking(delta)
		State.CHARGING:
			_process_charging(delta)
		State.ATTACKING:
			_process_attacking(delta)
		State.DASHING:
			_process_dash(delta)
		State.HIT:
			_process_hit(delta)
		State.GUARD_BROKEN:
			_process_guard_broken(delta)

	move_and_slide()
	queue_redraw()


func _update_timers(delta: float) -> void:
	_dash_cooldown_timer = maxf(0.0, _dash_cooldown_timer - delta)
	_attack_cooldown_timer = maxf(0.0, _attack_cooldown_timer - delta)
	invincible_timer = maxf(0.0, invincible_timer - delta)
	_hit_stun_timer = maxf(0.0, _hit_stun_timer - delta)
	_hit_flash_timer = maxf(0.0, _hit_flash_timer - delta)
	# ⚠️ 精准窗口在这里递减 —— 它在 _process_normal 里被**开启**, 而 _update_timers
	#    跑在状态处理**之前**。所以开启的那一帧不会被立刻扣掉, 窗口的帧数是准的。
	_parry_window_timer = maxf(0.0, _parry_window_timer - delta)
	_parry_cooldown_timer = maxf(0.0, _parry_cooldown_timer - delta)
	_parry_flash_timer = maxf(0.0, _parry_flash_timer - delta)
	_block_flash_timer = maxf(0.0, _block_flash_timer - delta)
	_guard_break_timer = maxf(0.0, _guard_break_timer - delta)


# ============================================================
# NORMAL — 走位 + 起手所有动作
# ============================================================
func _process_normal(delta: float) -> void:
	# ⚠️ 必须用 Input.get_vector 而不是 get_axis 拼两个分量:
	#    get_vector 返回**已归一化**的向量, 所以对角线同时按住时长度仍是 1,
	#    速度是 320 而不是 320×√2=452。验收第 6 条查的就是这个数字。
	var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	_apply_move(input_dir, move_accel, move_decel, delta)
	if input_dir != Vector2.ZERO:
		facing_dir = input_dir.normalized()

	# 格挡优先于一切 —— 它是「防御姿态」, 按下就该立刻生效
	if Input.is_action_pressed("block"):
		_enter_blocking()
		return

	if Input.is_action_just_pressed("dash") and _can_dash():
		_start_dash(input_dir)
		return

	if Input.is_action_just_pressed("attack_heavy") and _can_start_heavy():
		_enter_charging()
		return

	if Input.is_action_just_pressed("attack_light") and _attack_cooldown_timer <= 0.0:
		_state_enter_attack()


## 逐轴 move_toward 是关键: **向量版** move_toward 会按向量长度一次性逼近,
## 手感会从「先加速直线冲」变成「先拐弯再加速」, 原来的惯性感就没了。
##
## speed_scale: 上限倍率 (格挡 40% / 蓄力 50% / 出刀 55%)。
## ⚠️ 只缩放 accel 是**不够**的 —— 那只会让你更慢地到达同一个上限速度,
##    看起来像「手感变重」而不是「移动变慢」, 是两回事。
func _apply_move(input_dir: Vector2, accel: float, decel: float, delta: float, speed_scale: float = 1.0) -> void:
	var top: float = move_speed * speed_scale
	if input_dir.x != 0.0:
		velocity.x = move_toward(velocity.x, input_dir.x * top, accel * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, decel * delta)

	if input_dir.y != 0.0:
		velocity.y = move_toward(velocity.y, input_dir.y * top, accel * delta)
	else:
		velocity.y = move_toward(velocity.y, 0.0, decel * delta)


# ============================================================
# BLOCKING — 举盾。免伤 + 扣精力 + **朝向跟随鼠标**
# ============================================================
func _process_blocking(delta: float) -> void:
	var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	_apply_move(input_dir, move_accel * 0.7, move_decel, delta, block_move_scale)

	# 🏗️ 朝向 = 鼠标 (见文件头)。这一行是扇形格挡能成立的全部前提:
	#    没有它, 站着不动就永远转不了身, 背后来的攻击一定躲不掉也挡不住。
	facing_dir = _aim_direction()

	# 闪避是**万能取消**: 举着盾也能翻滚出去。
	# 没有它的话, 被围住时玩家只剩「举盾硬扛」和「放盾跑」两个选项,
	# 而「举盾时想跑」这个最自然的反应会变成一次白挨打。
	if Input.is_action_just_pressed("dash") and _can_dash():
		_start_dash(input_dir)
		return

	# 持续消耗精力 —— 举盾不是免费的姿态
	stamina.drain(block_drain_per_sec * delta)
	if stamina.is_empty():
		_enter_guard_broken(Vector2.INF)
		return

	if not Input.is_action_pressed("block"):
		state = State.NORMAL


# ============================================================
# CHARGING — 蓄力重击 (按住 K/右键)
# ============================================================
func _process_charging(delta: float) -> void:
	_charge_timer = minf(_charge_timer + delta, heavy_charge_max)

	var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	# 蓄力时可以慢走 (用户选定的手感) —— 但朝向仍按移动方向, 和 NORMAL 一致
	_apply_move(input_dir, move_accel * 0.6, move_decel, delta, charge_move_scale)
	if input_dir != Vector2.ZERO:
		facing_dir = input_dir.normalized()

	# 闪避取消 —— 蓄力的泄压阀。
	# 它同时也是「卡在 CHARGING」这条死路的兜底 (见文件头 ⚠️ 与 _apply_damage 里的清零)
	if Input.is_action_just_pressed("dash") and _can_dash():
		_charge_timer = 0.0
		_start_dash(input_dir)
		return

	if Input.is_action_just_released("attack_heavy"):
		_release_heavy()


# ============================================================
# ATTACKING — 出刀硬直 (可以走, 但明显变钝)
# ============================================================
func _process_attacking(delta: float) -> void:
	_attack_timer -= delta
	if _attack_timer <= 0.0:
		state = State.NORMAL
		return

	var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	# 出刀期间能走但明显变钝: 加速度砍到 35%, 减速度只砍 20% (收招时还得刹得住)
	# 重击比轻击更钝 —— 「挥空就是挨打」是重击唯一的代价, 必须给足
	var is_heavy: bool = _attack_kind == AttackKind.HEAVY
	var accel_scale: float = 0.18 if is_heavy else 0.35
	var speed_scale: float = 0.40 if is_heavy else 0.55
	_apply_move(input_dir, move_accel * accel_scale, move_decel * 0.8, delta, speed_scale)

	# ⚠️ 出刀期间**不改朝向**。刀往哪扫是在挥出的那一瞬间定死的,
	#    中途改朝向会让挥刀弧线突然跳一下, 而且判定框留在原地、刀却转了, 看着像脱手。


# ============================================================
# DASHING — 无敌位移
# ============================================================
func _process_dash(delta: float) -> void:
	_dash_timer -= delta
	if _dash_timer <= 0.0:
		state = State.NORMAL
		# 收尾时把速度砍到正常上限 —— 否则闪避结束会「弹射」一段,
		# 看起来像多冲了一下 (旧版就有这个毛病)
		velocity = velocity.limit_length(move_speed)


# ============================================================
# HIT — 受击硬直
# ============================================================
func _process_hit(delta: float) -> void:
	# ⚠️ 退出条件**只有**计时器。不要加 is_on_floor() —— 见文件头 ⚠️②
	velocity = velocity.move_toward(Vector2.ZERO, knockback_decel * delta)
	if _hit_stun_timer <= 0.0:
		state = State.NORMAL


# ============================================================
# GUARD_BROKEN — 精力耗尽被打崩
# ============================================================
func _process_guard_broken(delta: float) -> void:
	velocity = velocity.move_toward(Vector2.ZERO, knockback_decel * delta)
	if _guard_break_timer <= 0.0:
		state = State.NORMAL


# ============================================================
# 格挡 / 精准格挡
# ============================================================

## 进入格挡。
##
## 🏗️ 精准窗口在**按下的那一瞬间**开 —— 这就是「精准格挡」和「举着盾」的全部区别。
##    之后一直按着就只是普通格挡 (免伤但扣精力), 而且**不会**再开窗口。
func _enter_blocking() -> void:
	state = State.BLOCKING
	_charge_timer = 0.0
	# 立刻定朝向, 否则进入格挡的第一帧还是旧朝向 —— 那正好是最需要挡的一帧
	facing_dir = _aim_direction()

	if _parry_cooldown_timer <= 0.0:
		_parry_window_timer = parry_window
		_parry_cooldown_timer = parry_cooldown


## 格挡时的瞄准方向。默认鼠标, 可被 block_aim_override 覆写 (见那个变量的注释)。
func _aim_direction() -> Vector2:
	if block_aim_override != Vector2.ZERO:
		return block_aim_override.normalized()
	var m: Vector2 = get_global_mouse_position() - global_position
	# 鼠标压在角色身上时方向会剧烈抖动, 此时保持原朝向
	if m.length() <= 6.0:
		return facing_dir
	return m.normalized()


## 攻击是不是从**面朝的那半边**来的。
##
## ⚠️ 用的是「玩家 → 攻击者」这个向量, 不是「攻击者 → 玩家」。
##    写成反的会让扇形整个翻转 180° —— 表现是「正面的挡不住、背后的反而挡住了」,
##    而这两件事在屏幕上看起来都只是「格挡有时候不灵」。
func _is_in_guard_cone(from_position: Vector2) -> bool:
	if not from_position.is_finite():
		# 没有来源信息时按「挡得住」处理: 宁可对玩家有利, 也不要静默变成背刺
		return true
	var to_attacker: Vector2 = from_position - global_position
	if to_attacker.length() <= 0.01:
		return true
	return to_attacker.normalized().dot(facing_dir) >= block_cone_cos


## 精准格挡 / 破防时要把**攻击者**打硬直。判定区自己背着 source (见 enemy_attack.gd)。
func _stagger_attacker(source: Node2D) -> void:
	if source == null or not is_instance_valid(source):
		return
	# 用 has_method 而不是强类型: 将来树/机关/别的玩家也会攻击, 不该只认 BlitzEnemy
	if source.has_method("on_parried"):
		source.on_parried()


func _enter_guard_broken(from_position: Vector2) -> void:
	state = State.GUARD_BROKEN
	_parry_window_timer = 0.0
	_guard_break_timer = guard_break_duration
	# 破防后**锁住回复**: 「被打崩」必须比「主动收手」更痛, 否则玩家没有动机去管精力
	stamina.hold_regen(guard_break_regen_lock)

	var away: Vector2 = -facing_dir
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		away = d.normalized() if d.length() > 0.01 else -facing_dir
	velocity = away * guard_break_knockback
	guard_broken.emit()


# ============================================================
# 攻击
# ============================================================

## 轻击入口 (自检也在用它, 名字别改)
func _state_enter_attack() -> void:
	_begin_attack(AttackKind.LIGHT, 1.0)


func _enter_charging() -> void:
	state = State.CHARGING
	_charge_timer = 0.0


## 松开重击 —— 挥出。
func _release_heavy() -> void:
	var ratio: float = charge_ratio()
	# 精力在**挥出的那一刻**扣, 不在蓄力期间扣 ——
	# 蓄力中扣的话, 玩家会在蓄到一半时突然被踢出状态, 而且不知道原因。
	if not stamina.spend(heavy_cost):
		# 兜底: 理论上蓄力中只能慢走, 花不掉精力; 但万一真的不够,
		# 宁可取消这一刀, 也不要让玩家白嫖一次满蓄破霸体。
		state = State.NORMAL
		_charge_timer = 0.0
		return
	_begin_attack(AttackKind.HEAVY, ratio)


## charge: 0~1 的蓄力比例, 决定伤害和是否破霸体。
func _begin_attack(kind: AttackKind, charge: float) -> void:
	_attack_kind = kind
	state = State.ATTACKING
	_charge_timer = 0.0

	if kind == AttackKind.LIGHT:
		_attack_total = attack_light_duration
		_attack_timer = attack_light_duration
		_attack_cooldown_timer = attack_light_cooldown
		_spawn_attack_hitbox(attack_light_damage, attack_reach, Vector2.ZERO, false, 1)
	else:
		_attack_total = heavy_duration
		_attack_timer = heavy_duration
		_attack_cooldown_timer = heavy_cooldown
		var dmg: int = int(round(lerpf(float(heavy_damage_min), float(heavy_damage_max), clampf(charge, 0.0, 1.0))))
		var breaks: bool = charge >= heavy_armor_break_ratio
		_spawn_attack_hitbox(dmg, heavy_reach, heavy_box_size, breaks, heavy_max_targets)


## 生成攻击判定框 —— 挂在**玩家自己**身上 (而不是 current_scene)。
##
## 🏗️ 为什么挂自己身上:
##   判定框的 position 是纯局部坐标, 父节点 (y-sort 的 World) 怎么摆都不影响,
##   也不会漏删。挂 current_scene 则要求两套坐标系一致, 一旦玩家被放进有偏移的
##   父节点里, 判定框就会凭空错位。
##
## box_size = Vector2.ZERO 表示用场景里的默认尺寸 (轻击)。
## ⚠️ 重击传的是更大的尺寸 —— attack_hitbox.gd 里必须 duplicate() 形状才能改,
##    否则会污染场景资源, 之后所有轻击都变成大框 (那边有详细注释)。
func _spawn_attack_hitbox(
	damage: int, reach: float, box_size: Vector2, breaks_armor: bool, max_targets: int
) -> void:
	var hb: AttackHitbox = ATTACK_HITBOX_SCENE.instantiate()
	hb.damage = damage
	hb.lifetime = _attack_total          # ⚠️ 必须在 add_child 之前设 (见 attack_hitbox.gd)
	hb.box_size = box_size
	hb.breaks_armor = breaks_armor
	hb.max_targets = max_targets
	# ⚠️ 判定框位置**不做任何等距投影** (不调 Iso.ground): 物理世界就是屏幕 XY,
	#    菱形只是贴图。见 iso.gd 里 Iso.ground() 的警告。
	hb.position = facing8() * reach
	hb.hit_landed.connect(_on_hitbox_landed)
	add_child(hb)


func _on_hitbox_landed(at: Vector2, _direction: Vector2) -> void:
	hit_landed.emit(at)


func charge_ratio() -> float:
	return clampf(_charge_timer / maxf(0.001, heavy_charge_max), 0.0, 1.0)


func _can_dash() -> bool:
	return _dash_cooldown_timer <= 0.0 and stamina.can_spend(dash_cost)


func _can_start_heavy() -> bool:
	return _attack_cooldown_timer <= 0.0 and stamina.can_spend(heavy_cost)


## 闪避方向: 有输入就按输入方向 (八向自由闪避), 没输入就按朝向。
func _start_dash(input_dir: Vector2) -> void:
	if not stamina.spend(dash_cost):
		return
	var dir: Vector2 = input_dir.normalized() if input_dir != Vector2.ZERO else facing8()
	facing_dir = dir
	state = State.DASHING
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	_dash_timer = dash_duration
	_dash_cooldown_timer = dash_cooldown
	invincible_timer = dash_duration + 0.05
	velocity = dir * dash_speed
	dashed.emit(dir)


# ============================================================
# 受伤 / 死亡 / 复活
# ============================================================

## amount: 伤害值。from_position: 伤害来源坐标 (用来算击退方向 **和扇形格挡判定**)。
## source: 攻击者节点。只有敌人的攻击判定区会传 —— 精准格挡要靠它把对方打硬直。
##
## ⚠️ 第三个参数和 BlitzEnemy.take_damage 的同位参数含义**不同**
##    (那边是 breaks_armor: bool)。两者靠鸭子类型调用, 编译器不会提醒。
##    之所以现在没问题: 玩家的攻击判定框 mask 只够得着敌人, 永远打不到玩家自己。
func take_damage(amount: int = 1, from_position: Vector2 = Vector2.INF, source: Node2D = null) -> void:
	if state == State.DEAD or invincible_timer > 0.0:
		return

	# 举着盾 → 走格挡结算 (见下方决策表)。这是本轮唯一新增的受击分支。
	if state == State.BLOCKING:
		_resolve_guard(amount, from_position, source)
		return

	_apply_damage(amount, from_position)


## 格挡状态下的受击结算 —— **本轮决策表 (A) 的唯一落点**。
##
##   | 来自 | 精准窗口内 | 精力够 | 结果
##   |------|-----------|--------|------------------------------------------
##   | 正面 | 是        | 不计   | 精准格挡: 零伤零耗 + 攻击者长硬直
##   | 正面 | 否        | 是     | 格挡: 零伤, 扣精力
##   | 正面 | 否        | 否     | 破防: 零伤但进 GUARD_BROKEN + 击退
##   | 背后 | 无所谓    | 无所谓 | **照常掉血**
func _resolve_guard(amount: int, from_position: Vector2, source: Node2D) -> void:
	# ① 背后的攻击挡不住 —— 这是扇形格挡的**核心**。
	#    写成全方位的话玩家永远不会知道自己站错了位置, 只会觉得格挡时灵时不灵。
	if not _is_in_guard_cone(from_position):
		_apply_damage(amount, from_position)
		return

	# ② 精准窗口内 → 精准格挡
	if _parry_window_timer > 0.0:
		_parry_window_timer = 0.0
		_parry_flash_timer = PARRY_FLASH_TIME
		# 给一点点无敌, 免得同一帧里第二个判定区又把这次精准格挡打穿
		invincible_timer = maxf(invincible_timer, 0.2)
		_stagger_attacker(source)
		parried.emit(global_position + Vector2(0.0, -22.0))
		return

	# ③ 普通格挡 —— 免伤, 但要付精力
	var cost: float = block_hit_cost * float(maxi(1, amount))
	if stamina.spend(cost):
		_block_flash_timer = 0.14
		invincible_timer = maxf(invincible_timer, 0.1)
		blocked.emit(global_position + Vector2(0.0, -22.0))
	else:
		_enter_guard_broken(from_position)


## 真正扣血的那条路。格挡/精准格挡都不走这里 —— 所以「有没有掉血」和
## 「有没有挡到」在代码上是**两个不同的分支**, 不可能出现「挡住了但还是掉血」。
func _apply_damage(amount: int, from_position: Vector2) -> void:
	health -= amount
	health_changed.emit(maxi(health, 0), max_health)

	if health <= 0:
		_die()
		return

	state = State.HIT
	invincible_timer = invincible_duration
	_hit_stun_timer = hit_stun_duration
	_hit_flash_timer = 0.12
	# ⚠️ 受击必须把所有「按住型」状态清干净。尤其 _charge_timer:
	#    蓄力靠 is_action_just_released 退出, 一旦被打进 HIT, 那个释放事件
	#    可能永远不会来 —— 玩家会**永久卡在蓄力态** (不能动不能打, 像死机)。
	#    这里是那条死路的唯一出口, 别删。
	_charge_timer = 0.0
	_parry_window_timer = 0.0

	# 击退方向 = 从伤害来源指向自己 (几何算法, 不依赖朝向)
	var away: Vector2 = -facing_dir
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		away = d.normalized() if d.length() > 0.01 else -facing_dir
	velocity = away * knockback_speed


func _die() -> void:
	state = State.DEAD
	velocity = Vector2.ZERO
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	# 层清 0: 死后不再挡路、不再被判定框找到 (隐身但仍在场景里, 等 main.gd 安排复活)
	collision_layer = 0
	hurtbox.collision_mask = 0
	hide()
	died.emit()


## 由 main.gd 在复活点调用 —— 低惩罚死亡循环的落点
func respawn(at: Vector2) -> void:
	global_position = at
	velocity = Vector2.ZERO
	health = max_health
	state = State.NORMAL
	_dash_timer = 0.0
	_attack_timer = 0.0
	_hit_stun_timer = 0.0
	_hit_flash_timer = 0.0
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	_parry_flash_timer = 0.0
	_guard_break_timer = 0.0
	# 精力回满 —— 复活后还带着上一次的精力亏空, 会让「重生」这件事没有感觉
	stamina.refill()
	# 复活后给一段无敌: 否则在敌人旁边复活会被立刻连打死, 变成死亡循环
	invincible_timer = invincible_duration
	collision_layer = 1 << 0
	hurtbox.collision_mask = 1 << 3
	show()
	health_changed.emit(health, max_health)


# ============================================================
# 信号回调
# ============================================================
## 被敌人的攻击判定区扫到。
##
## ⚠️ 这里同时读 damage / source 三个字段 —— 说明玩家和敌人之间的伤害契约
##    是「判定区自己背着数据」。v0.2 的写法是 `area.has_method("take_damage")`
##    然后硬编码伤害 1, 那种写法下「敌人的伤害值」这个概念根本无处安放。
func _on_hurtbox_area_entered(area: Area2D) -> void:
	if area is EnemyAttack:
		var atk: EnemyAttack = area
		take_damage(atk.damage, atk.global_position, atk.source)


func _on_stamina_changed(current: float, maximum: float) -> void:
	stamina_changed.emit(current, maximum)


# ============================================================
# 对外查询
# ============================================================

## 朝向吸附到 8 个方向之一。战斗/判定框用这个 —— 连续值会让判定框一直微微偏。
func facing8() -> Vector2:
	return Iso.dir8(facing_dir)


## 是否举着盾。**从 state 派生**而不是维护一个平行的 is_blocking 变量 ——
## 两份「我在不在格挡」迟早会有一份忘了同步, 而那种 bug 表现为
## 「挡住了却掉血」或者「没挡却免伤」, 极难定位。
func is_guard_up() -> bool:
	return state == State.BLOCKING


## 精准窗口是否还开着。给 debug 面板和自检看。
func is_parry_window_open() -> bool:
	return _parry_window_timer > 0.0


## 是否在蓄力中。
##
## 🏗️ UI **不要**直接写 `player.state == BlitzPlayer.State.CHARGING`, 改成问这个方法。
##    区别在于依赖什么:
##      · 直接比枚举成员 → UI 依赖了 State 的**成员名单**。于是「给玩家加一个新状态」
##        会连带改到 HUD 和调试面板, 而且崩在一个跟新状态毫无关系的地方。
##      · 问这个方法   → UI 只依赖「玩家能回答这个问题」。
##
##    ⚠️ 这不是理论洁癖, 是一个真的踩过的坑: v0.3 加完 CHARGING/GUARD_BROKEN 之后,
##       HUD 和调试面板曾因为类缓存里还留着上一版的 State 名字表而**整个脚本加载失败**
##       (Cannot find member "CHARGING" in base "BlitzPlayer.State")。
##       把成员名集中到 player.gd 这一处之后, 就算缓存再过期,
##       受影响的也只有 player.gd 一个文件, 而不是所有引用过 State 的地方。
func is_charging() -> bool:
	return state == State.CHARGING


## 是否处于被破防的硬直中 (精力见底被打崩)
func is_guard_broken() -> bool:
	return state == State.GUARD_BROKEN


# ============================================================
# 外观 —— 原点在**脚底**, 一律负 Y 往上
# ============================================================
const ROBE_TOP: Color = Color(0.22, 0.34, 0.62)     ## 道袍主色 (青蓝)
const ROBE_BOTTOM: Color = Color(0.13, 0.19, 0.38)  ## 袍角 (暗)
const SKIN: Color = Color(0.94, 0.80, 0.66)
const HAIR: Color = Color(0.10, 0.09, 0.14)
const BLADE: Color = Color(0.88, 0.94, 1.0)
const SASH: Color = Color(0.85, 0.30, 0.32)         ## 腰带 (朱红)
const SHIELD_COLOR: Color = Color(0.5, 0.95, 1.0)   ## 护盾弧
const PARRY_READY_COLOR: Color = Color(1.0, 0.9, 0.4)  ## 精准窗口开着时的护盾弧
const CHARGE_COLOR: Color = Color(0.65, 0.85, 1.0)     ## 蓄力 (还没满)
const CHARGE_READY_COLOR: Color = Color(1.0, 0.8, 0.25) ## 蓄满 (可破霸体)
const GUARD_BREAK_COLOR: Color = Color(0.9, 0.3, 0.35)  ## 破防
## 精准格挡爆闪的时长 (秒)
const PARRY_FLASH_TIME: float = 0.32


func _draw() -> void:
	if state == State.DEAD:
		return

	# 无敌闪烁。⚠️ 闪避时不闪 (会把拖影闪断成几截),
	#    格挡/破防时也不闪 —— 否则护盾弧会跟着一起消失, 看起来像「盾没了」。
	if invincible_timer > 0.0 \
			and state != State.DASHING and state != State.BLOCKING and state != State.GUARD_BROKEN:
		if fmod(invincible_timer * 12.0, 2.0) >= 1.0:
			return

	_draw_shadow()
	_draw_dash_trail()
	if state == State.CHARGING:
		_draw_charge_aura()

	var flash: bool = _hit_flash_timer > 0.0
	var body_color: Color = ROBE_TOP
	if state == State.GUARD_BROKEN:
		body_color = GUARD_BREAK_COLOR
	elif state == State.CHARGING:
		# 蓄力时袍色往冷光偏 —— 和地面的金色蓄力环形成对比, 更醒目
		body_color = ROBE_TOP.lerp(CHARGE_COLOR, 0.25 * charge_ratio())

	if state == State.DASHING:
		_draw_body(Color(0.35, 0.95, 1.0), flash)
		return
	_draw_body(Color.WHITE if flash else body_color, flash)
	_draw_sword()
	if state == State.BLOCKING:
		_draw_shield()
	_draw_contact_flash()


## 脚下阴影 —— 无重力世界里它是玩家判断「我站在格子哪里」的**唯一**线索, 不是装饰
func _draw_shadow() -> void:
	var pts: Array[Vector2] = []
	for i: int in range(16):
		var a: float = float(i) / 16.0 * TAU
		# Iso.ground 把正圆压成 2:1 椭圆 —— 合法的用法: 这是**视觉投影**。
		# ⚠️ 它绝不能用在 position / velocity / 判定框偏移上 (见 iso.gd)
		pts.append(Iso.ground(Vector2(cos(a), sin(a)) * 12.0))
	var poly: PackedVector2Array = PackedVector2Array(pts)
	draw_colored_polygon(poly, Color(0.0, 0.0, 0.0, 0.35))


func _draw_body(body_color: Color, flash: bool) -> void:
	# 袍身: 上窄下宽的梯形 (原点在脚底, 所以袍角正好落在 y=0)
	var robe: PackedVector2Array = PackedVector2Array([
		Vector2(-7.0, -34.0), Vector2(7.0, -34.0),
		Vector2(13.0, -2.0), Vector2(-13.0, -2.0),
	])
	draw_colored_polygon(robe, body_color)
	# 袍角渐变: 用一块暗色梯形叠在下半身, 做出「下摆更暗」的体积感
	if not flash:
		draw_colored_polygon(PackedVector2Array([
			Vector2(-10.0, -18.0), Vector2(10.0, -18.0),
			Vector2(13.0, -2.0), Vector2(-13.0, -2.0),
		]), Color(ROBE_BOTTOM.r, ROBE_BOTTOM.g, ROBE_BOTTOM.b, 0.85))

	# 腰带
	draw_line(Vector2(-8.0, -30.0), Vector2(8.0, -30.0), SASH, 3.0)
	draw_circle(Vector2(0.0, -30.0), 2.4, SASH.lightened(0.3))

	# 头 + 发髻
	draw_circle(Vector2(0.0, -44.0), 8.5, SKIN)
	draw_circle(Vector2(0.0, -50.5), 8.0, HAIR)
	draw_circle(Vector2(0.0, -56.0), 3.4, HAIR)

	# 眼睛: 用朝向的 x 分量决定往哪边偏 —— 让「面朝哪」在静止时也看得出来
	var ex: float = facing8().x
	if absf(ex) < 0.35:
		# 纯上/下朝向时眼睛对称画, 否则会像斜眼
		draw_circle(Vector2(-3.2, -44.0), 1.6, HAIR)
		draw_circle(Vector2(3.2, -44.0), 1.6, HAIR)
	else:
		draw_circle(Vector2(2.0 * ex, -44.6), 1.7, HAIR)
		draw_circle(Vector2(-4.4 * ex, -44.6), 1.4, HAIR)


## 手里的刀 —— 静止时斜垂在身侧, 出刀时沿 facing8 扫过一段弧。
## 蓄力时往身后拉, 越满拉得越靠后 (和 enemy 的起手爪是同一套肢体语言)。
func _draw_sword() -> void:
	var d: Vector2 = facing8()
	var pivot: Vector2 = Vector2(0.0, -30.0) + d * 6.0
	var swing: float = 0.0
	var reach: float = 26.0

	if state == State.ATTACKING:
		var total: float = maxf(0.001, _attack_total)
		var t: float = 1.0 - clampf(_attack_timer / total, 0.0, 1.0)
		if _attack_kind == AttackKind.HEAVY:
			# 重击: 扫得更开、刀更长 —— 让「这一下很重」在动作上就看得出来
			swing = lerpf(-1.75, 1.75, t)
			reach = 34.0
		else:
			swing = lerpf(-1.15, 1.15, t)
	elif state == State.CHARGING:
		var t: float = charge_ratio()
		swing = lerpf(-0.9, -1.9, t)
		reach = lerpf(26.0, 32.0, t)

	var blade_dir: Vector2 = d.rotated(swing)
	var tip: Vector2 = pivot + blade_dir * reach

	# 出刀时的残留刀光: 沿扫描方向拖出三条渐隐的弧
	if state == State.ATTACKING:
		for i: int in range(3):
			var a: float = swing - float(i + 1) * 0.22
			var t2: Vector2 = pivot + d.rotated(a) * reach
			draw_line(pivot, t2, Color(1.0, 1.0, 1.0, 0.45 - float(i) * 0.13), 3.0)

	# 刀身 + 刀柄。蓄满时刀身发金光 —— 「可以破霸体了」的第二个提示
	var blade_color: Color = BLADE
	if state == State.CHARGING and charge_ratio() >= heavy_armor_break_ratio:
		blade_color = CHARGE_READY_COLOR
	draw_line(pivot, tip, blade_color, 2.6)
	draw_line(pivot, pivot - blade_dir * 5.0, Color(0.25, 0.18, 0.12), 3.4)


## 蓄力气场 —— 玩家必须能**一眼判断蓄到几成了**, 否则「满蓄破霸体」就是盲猜。
## 三重提示: 地面光圈 (大小) + 头顶进度环 (角度) + 满蓄时的脉动。
func _draw_charge_aura() -> void:
	var t: float = charge_ratio()
	# ⚠️ 别把这个变量叫 `ready` —— Node 基类自己有一个同名 signal, 会触发
	#    SHADOWED_VARIABLE_BASE_CLASS 警告, 而且真去 emit("ready") 时行为诡异。
	var is_charged: bool = t >= heavy_armor_break_ratio
	var c: Color = CHARGE_READY_COLOR if is_charged else CHARGE_COLOR

	# ① 地面光圈: 随蓄力扩大
	var ring: Array[Vector2] = []
	for i: int in range(20):
		var a: float = float(i) / 20.0 * TAU
		ring.append(Iso.ground(Vector2(cos(a), sin(a)) * (15.0 + t * 15.0)))
	draw_colored_polygon(PackedVector2Array(ring), Color(c.r, c.g, c.b, 0.10 + t * 0.12))

	# ② 头顶进度环: 从正上方顺时针填满
	var pivot: Vector2 = Vector2(0.0, -64.0)
	var steps: int = maxi(2, int(t * 44.0))
	var pts: PackedVector2Array = PackedVector2Array()
	for i: int in range(steps + 1):
		var a: float = -PI * 0.5 + TAU * t * (float(i) / float(steps))
		pts.append(pivot + Vector2(cos(a), sin(a)) * 9.0)
	if pts.size() >= 2:
		draw_polyline(pts, c, 3.0)

	# ③ 满蓄脉动: 最后这一下是「现在松手就能破霸体」的信号
	if is_charged:
		var pulse: float = 0.5 + 0.5 * sin(_charge_timer * 24.0)
		draw_circle(pivot, 11.0 + pulse * 4.0, Color(c.r, c.g, c.b, 0.2 + pulse * 0.35))


## 护盾弧 + **扇形边界线**
##
## ⚠️ 两条边界线不是装饰: 扇形格挡只挡正面 ±90°, 而这件事如果不画出来,
##    玩家的体验就是「有时候挡得住有时候挡不住」—— 一个看起来像 bug 的机制。
##    把边界画出来, 「你得面对着它」才是可学习的。
func _draw_shield() -> void:
	# ⚠️ 用 facing_dir.angle() (连续) 而不是 facing8().angle() (八向吸附):
	#    鼠标瞄准是连续的, 吸附到八向会让盾牌一格一格地跳, 转起来很不跟手。
	var fa: float = facing_dir.angle()
	var parry_ready: bool = is_parry_window_open()
	var c: Color = PARRY_READY_COLOR if parry_ready else SHIELD_COLOR

	var pivot: Vector2 = Vector2(0.0, -22.0)
	var arc: PackedVector2Array = PackedVector2Array()
	var steps: int = 14
	for i: int in range(steps + 1):
		var a: float = fa + lerpf(-1.05, 1.05, float(i) / float(steps))
		arc.append(pivot + Vector2(cos(a), sin(a)) * 26.0)
	draw_polyline(arc, c, 3.2 if parry_ready else 2.4)

	# 内侧淡填充: 补一圈回到枢轴点形成扇形
	var fan: PackedVector2Array = arc.duplicate()
	fan.append(pivot)
	draw_colored_polygon(fan, Color(c.r, c.g, c.b, 0.16))

	# 扇形边界 (±90°): 转过这两条线, 你就挡不住背后的攻击了
	var edge_color: Color = Color(c.r, c.g, c.b, 0.55)
	for side: float in [1.0, -1.0]:
		var edge: Vector2 = Vector2(cos(fa + side * PI * 0.5), sin(fa + side * PI * 0.5))
		draw_line(pivot, pivot + edge * 30.0, edge_color, 1.5)


## 精准格挡 / 普通格挡的即时反馈
func _draw_contact_flash() -> void:
	if _parry_flash_timer > 0.0:
		var r: float = 1.0 - _parry_flash_timer / PARRY_FLASH_TIME
		draw_arc(Vector2(0.0, -22.0), lerpf(12.0, 44.0, r), 0.0, TAU, 26,
			Color(1.0, 0.95, 0.55, (1.0 - r) * 0.9), 3.0)
	if _block_flash_timer > 0.0:
		var br: float = _block_flash_timer / 0.14
		draw_arc(Vector2(0.0, -22.0), 28.0, 0.0, TAU, 20,
			Color(SHIELD_COLOR.r, SHIELD_COLOR.g, SHIELD_COLOR.b, br * 0.8), 2.0)


## 闪避拖影: 沿朝向前反方向留三团渐隐的影子
func _draw_dash_trail() -> void:
	if state != State.DASHING:
		return
	var d: Vector2 = facing8()
	for i: int in range(3):
		var at: Vector2 = -d * float(i + 1) * 11.0
		var a: float = 0.30 - float(i) * 0.09
		draw_circle(at + Vector2(0.0, -20.0), 12.0 - float(i) * 2.5, Color(0.35, 0.85, 1.0, a))
