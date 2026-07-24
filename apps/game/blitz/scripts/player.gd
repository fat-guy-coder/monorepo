extends CharacterBody2D
class_name BlitzPlayer
## 武侠角色控制器 — 状态机 + 物理 + 近战战斗
##
## 📚 涉及学习文档 (按阅读顺序):
##   godot-2-6-characterbody2d   — CharacterBody2D 基础: move_and_slide/velocity/重力
##   godot-6-5-characterbody-deep — 深入: is_on_floor/coyote time/jump buffer
##   godot-6-6-platformer-physics  — 平台跳跃物理: 可变跳跃高度/冲刺
##   godot-7-8-state-machines      — 状态机模式: NORMAL/ATTACKING/DASHING/HIT/DEAD
##   godot-5-2-input-handling      — Input 单例: get_axis/is_action_just_pressed
##   godot-5-1-input-map           — InputMap: 在代码中注册按键动作
##   godot-6-2-area2d-deep         — Area2D: 攻击判定框碰撞检测
##   godot-2-5-collision2d         — 碰撞形状: CircleShape2D/碰撞层位掩码
##   godot-6-4-collision-layers    — 位掩码详解: layer vs mask 的区别
##   godot-2-3-node2d-basics       — _draw() 绘制圆形外观
##   godot-1-8-signals-basics      — 信号连接: body_entered/area_entered
##   godot-4-2-scene-instantiation — PackedScene.instantiate() 场景实例化
##
## 🎮 核心机制 (武侠动作):
##   - 移动: A/D 或 ←→  水平加减速,有惯性
##   - 跳跃: Space/W/↑  可变高度(松键削减) + coyote time + jump buffer
##   - 闪避: Shift/K    短暂无敌 + 水平爆发速度
##   - 轻击: J          近战攻击,前方生成攻击判定框
##   - 格挡: 空中靠近粉色物体按跳 → 高弹跳 + 150分 + 无敌
##
## 🏗️ 碰撞层设计 (必须与 attack_hitbox.gd / enemy.gd / main.gd 一致):
##   Bit 0 = 玩家身体     Bit 3 = 敌人攻击 (预留)
##   Bit 1 = 敌人身体     Bit 4 = 墙壁/平台
##   Bit 2 = 玩家攻击     Bit 5 = 格挡对象
##                        Bit 6 = 终点
##                        Bit 7 = (预留)

# ============================================================
# 节点引用 — @onready 在 _ready() 之前初始化,保证节点存在
# 这些节点在 player.tscn 中已预创建,Godot 编辑器可见
# ============================================================
@onready var parry_detector: Area2D = $ParryDetector
## 格挡检测区 — 半径 42px,检测粉色格挡对象

@onready var hurtbox: Area2D = $Hurtbox
## 受击判定区 — 半径 17px,检测敌人身体


# ============================================================
# 移动参数 (可在编辑器中调整手感)
# ============================================================
@export var move_speed: float = 320.0       ## 最大移动速度 px/s
@export var move_accel: float = 2000.0      ## 加速度 px/s² (AD 按下时)
@export var move_decel: float = 1600.0      ## 减速度 px/s² (松键时)

# ============================================================
# 跳跃参数
# ============================================================
@export var jump_velocity: float = -520.0   ## 跳跃初速度 (负=向上,Y轴向下)
@export var jump_cut_multiplier: float = 0.45  ## 松键时保留的速度比例(越小越"飘")
@export var gravity: float = 1400.0         ## 重力加速度 px/s²
@export var max_fall_speed: float = 700.0   ## 最大下落速度(终端速度)
@export var coyote_time: float = 0.08       ## 离地后仍可跳的时间(秒)
@export var jump_buffer_time: float = 0.08  ## 落地前提前按跳的缓冲(秒)

# ============================================================
# 闪避(冲刺)参数
# ============================================================
@export var dash_speed: float = 900.0       ## 闪避速度 px/s
@export var dash_duration: float = 0.15     ## 闪避持续时间(秒)
@export var dash_cooldown: float = 0.5      ## 闪避冷却时间(秒)

# ============================================================
# 攻击参数 (近战武侠战斗)
# ============================================================
@export var attack_light_damage: int = 1         ## 轻击伤害
@export var attack_light_duration: float = 0.15  ## 攻击判定持续(秒)
@export var attack_light_cooldown: float = 0.25  ## 轻击冷却(秒)
var attack_hitbox_scene: PackedScene = null       ## 攻击判定场景(由 main.gd 注入)

# ============================================================
# 生命值
# ============================================================
@export var max_health: int = 3
var health: int
var invincible_timer: float = 0.0
@export var invincible_duration: float = 1.5  ## 受击后无敌时间(秒)

# ============================================================
# 状态机 — 游戏开发中最基础也最重要的模式
# enum 定义了所有合法状态,state 变量跟踪当前状态
# 每个状态的逻辑在对应的 _process_xxx 函数中
# 详见 godot-7-8-state-machines
# ============================================================
enum State { NORMAL, ATTACKING, DASHING, HIT, DEAD }
var state: State = State.NORMAL
var facing_right: bool = true   ## 朝向: true=右,false=左

# ── 内部计时器 ──
var _coyote_timer: float = 0.0
var _jump_buffer_timer: float = 0.0
var _dash_timer: float = 0.0
var _dash_cooldown_timer: float = 0.0
var _attack_timer: float = 0.0
var _attack_cooldown_timer: float = 0.0
var _hit_stun_timer: float = 0.0

# ── 格挡状态 ──
var near_parry_object: bool = false
var _parry_target: Area2D = null

# ── 地面追踪 (coyote time 辅助) ──
var _was_on_floor: bool = false


# ============================================================
# 初始化
# ============================================================
func _ready() -> void:
	health = max_health

	# ── 碰撞层配置 ──
	collision_layer = 1 << 0   # bit0: "我是玩家"
	collision_mask  = 1 << 4   # bit4: "我只跟墙壁碰撞"

	# ── 格挡检测区: 检测粉色格挡对象(bit5) ──
	parry_detector.collision_layer = 0
	parry_detector.collision_mask  = 1 << 5
	parry_detector.area_entered.connect(_on_parry_zone_entered)
	parry_detector.area_exited.connect(_on_parry_zone_exited)

	# ── 受击判定区: 检测敌人身体(bit1) ──
	hurtbox.collision_layer = 0
	hurtbox.collision_mask  = 1 << 1
	hurtbox.body_entered.connect(_on_hurtbox_body_entered)


# ============================================================
# 主物理循环
# ============================================================
func _physics_process(delta: float) -> void:
	if state == State.DEAD:
		return

	# 1. 更新所有计时器
	_update_timers(delta)

	# 2. 根据状态执行不同逻辑
	# → godot-7-8-state-machines: enum State + match 五状态机
	match state:
		State.NORMAL:
			_process_normal(delta)
		State.ATTACKING:
			_process_attacking(delta)
		State.DASHING:
			_process_dash(delta)
		State.HIT:
			_process_hit(delta)

	# 3. 平台检测 — 着地时刷新 coyote time
	# → godot-6-6-platformer-physics: coyote time 在 move_and_slide 前设
	var on_floor: bool = is_on_floor()
	if on_floor:
		_coyote_timer = coyote_time
	_was_on_floor = on_floor

	# 4. 执行物理移动
	# → godot-2-6-characterbody2d: CharacterBody2D 的核心方法
	move_and_slide()

	# 5. 重绘 (闪白/朝向变化需要)
	queue_redraw()


func _update_timers(delta: float) -> void:
	_coyote_timer         = max(0.0, _coyote_timer - delta)
	_jump_buffer_timer    = max(0.0, _jump_buffer_timer - delta)
	_dash_cooldown_timer  = max(0.0, _dash_cooldown_timer - delta)
	_attack_timer         = max(0.0, _attack_timer - delta)
	_attack_cooldown_timer = max(0.0, _attack_cooldown_timer - delta)
	invincible_timer      = max(0.0, invincible_timer - delta)
	_hit_stun_timer       = max(0.0, _hit_stun_timer - delta)


# ============================================================
# NORMAL 状态 — 移动 + 跳跃 + 闪避 + 轻击 + 格挡
# ============================================================
func _process_normal(delta: float) -> void:
	# ── 水平移动 ──
	# → godot-5-2-input-handling: Input.get_axis 返回 -1(左)~0~1(右)
	var input_dir: float = Input.get_axis("move_left", "move_right")
	if input_dir != 0.0:
		facing_right = input_dir > 0.0
		velocity.x = move_toward(velocity.x, input_dir * move_speed, move_accel * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, move_decel * delta)

	# ── 重力 (只有空中才加速下落) ──
	if not is_on_floor():
		velocity.y += gravity * delta
		velocity.y = min(velocity.y, max_fall_speed)

	# ── 跳跃缓冲 (在按跳时记录,稍后检查是否可以跳) ──
	if Input.is_action_just_pressed("jump"):
		_jump_buffer_timer = jump_buffer_time

	# ── 执行跳跃 ──
	if _jump_buffer_timer > 0.0 and _coyote_timer > 0.0:
		_perform_jump()
		_jump_buffer_timer = 0.0
		_coyote_timer = 0.0
	# ── 格挡 (空中靠近粉色物体时按跳) ──
	elif Input.is_action_just_pressed("jump") and near_parry_object:
		_perform_parry()

	# ── 可变跳跃高度 ──
	# → godot-6-6-platformer-physics: 松键时削减上升速度,轻按=小跳长按=大跳
	if not Input.is_action_pressed("jump"):
		if velocity.y < 0.0:
			velocity.y *= 1.0 - (1.0 - jump_cut_multiplier) * delta * 10.0

	# ── 闪避 ──
	if Input.is_action_just_pressed("dash") and _dash_cooldown_timer <= 0.0:
		_start_dash()

	# ── 轻击 (J键, 近战攻击) ──
	if Input.is_action_just_pressed("attack_light") and _attack_cooldown_timer <= 0.0:
		_start_attack_light()


# ── ATTACKING 状态 (出刀硬直) ──
func _process_attacking(delta: float) -> void:
	_attack_timer -= delta
	if _attack_timer <= 0.0:
		_end_attack()
	# 攻击期间允许移动但减速, 空中重力减弱
	if not is_on_floor():
		velocity.y += gravity * delta * 0.25
		velocity.y = min(velocity.y, max_fall_speed)
	velocity.x = move_toward(velocity.x, 0.0, 1200.0 * delta)


# ── DASHING 状态 (闪避无敌) ──
func _process_dash(delta: float) -> void:
	_dash_timer -= delta
	if _dash_timer <= 0.0:
		_end_dash()
	velocity.y = 0.0  # 闪避期间不受重力


# ── HIT 状态 (受击硬直) ──
func _process_hit(delta: float) -> void:
	velocity.x = move_toward(velocity.x, 0.0, 800.0 * delta)
	velocity.y += gravity * delta
	# 落地且硬直结束后恢复正常
	if is_on_floor() and _hit_stun_timer <= 0.0:
		state = State.NORMAL


# ============================================================
# 动作实现
# ============================================================

func _perform_jump() -> void:
	velocity.y = jump_velocity


# ── 闪避 ──
func _start_dash() -> void:
	state = State.DASHING
	_dash_timer = dash_duration
	_dash_cooldown_timer = dash_cooldown
	invincible_timer = dash_duration + 0.05
	var d: float = 1.0 if facing_right else -1.0
	velocity = Vector2(d * dash_speed, 0.0)


func _end_dash() -> void:
	state = State.NORMAL


# ── 轻击 (近战) ──
func _start_attack_light() -> void:
	if attack_hitbox_scene == null:
		return
	state = State.ATTACKING
	_attack_timer = attack_light_duration
	_attack_cooldown_timer = attack_light_cooldown
	_spawn_attack_hitbox()


func _end_attack() -> void:
	state = State.NORMAL


func _spawn_attack_hitbox() -> void:
	# 从 attack_hitbox.tscn 实例化近战判定框
	# 在玩家面前生成一个 Area2D, 持续 ~0.15s 后自动消失
	# 详见 godot-4-2-scene-instantiation
	var hitbox: Area2D = attack_hitbox_scene.instantiate()
	var d: float = 1.0 if facing_right else -1.0
	hitbox.position = position + Vector2(28.0 * d, -6.0)
	hitbox.damage = attack_light_damage
	get_tree().current_scene.add_child(hitbox)


# ── 格挡 ──
func _perform_parry() -> void:
	velocity.y = jump_velocity * 1.35
	invincible_timer = 0.6
	var root: Node = get_tree().current_scene
	if root and root.has_method("on_player_parry"):
		root.on_player_parry(_parry_target)
	near_parry_object = false
	_parry_target = null


# ============================================================
# 受伤 / 死亡
# ============================================================
func take_damage(amount: int = 1) -> void:
	if invincible_timer > 0.0 or state == State.DEAD:
		return

	health -= amount
	if health <= 0:
		_die()
	else:
		state = State.HIT
		invincible_timer = invincible_duration
		_hit_stun_timer = 0.3
		# 击退 (向面朝的反方向弹开)
		var kb_dir: float = -1.0 if facing_right else 1.0
		velocity = Vector2(kb_dir * 250.0, -280.0)


func _die() -> void:
	state = State.DEAD
	collision_layer = 0
	var root: Node = get_tree().current_scene
	if root and root.has_method("on_player_died"):
		root.on_player_died()
	hide()


# ============================================================
# 信号回调
# ============================================================
func _on_parry_zone_entered(area: Area2D) -> void:
	near_parry_object = true
	_parry_target = area


func _on_parry_zone_exited(_area: Area2D) -> void:
	near_parry_object = false
	_parry_target = null


func _on_hurtbox_body_entered(body: Node2D) -> void:
	# 被敌人碰到 = 受伤
	if body.has_method("take_damage"):
		take_damage(1)


# ============================================================
# 外观 (_draw 绘制角色)
# ============================================================
func _draw() -> void:
	if state == State.DEAD:
		return

	# 无敌闪烁 (每 0.08 秒切换一次可见,约 12 次/秒)
	var blink_visible: bool = true
	if invincible_timer > 0.0 and state != State.DASHING:
		blink_visible = fmod(invincible_timer * 12.0, 2.0) < 1.0
	if not blink_visible:
		return

	# 身体颜色随状态变化
	var body_color: Color
	match state:
		State.DASHING:   body_color = Color.CYAN              # 青色闪避
		State.ATTACKING: body_color = Color.WHITE             # 白色出刀
		State.HIT:       body_color = Color.RED               # 红色受伤
		_:               body_color = Color(0.2, 0.55, 0.95)  # 蓝色正常

	# 绘制主体 (圆形,半径 15)
	if invincible_timer > 0.0:
		draw_circle(Vector2.ZERO, 17, Color.WHITE)  # 无敌白边
		draw_circle(Vector2.ZERO, 15, body_color)
	else:
		draw_circle(Vector2.ZERO, 15, body_color)
		draw_arc(Vector2.ZERO, 15, 0, TAU, 32, body_color.darkened(0.3), 1.5)

	# 眼睛 (方向指示)
	var ed: float = 1.0 if facing_right else -1.0
	draw_circle(Vector2(5.0 * ed, -5.0), 3.5, Color.WHITE)
	draw_circle(Vector2(7.0 * ed, -5.0), 2.0, Color.BLACK)

	# 攻击刀光 (白色弧线,模拟横扫)
	if state == State.ATTACKING:
		for i in range(3):
			var angle: float = lerp(-PI * 0.35, PI * 0.35, float(i) / 2.0)
			var rx: float = cos(angle) * 28.0 * ed
			var ry: float = sin(angle) * 28.0 - 5.0
			var alpha: float = 0.8 - abs(float(i - 1)) * 0.3
			draw_line(Vector2(3.0 * ed, -5.0), Vector2(rx, ry), Color(1.0, 1.0, 1.0, alpha), 3.0 - i * 0.5)

	# 闪避拖尾效果
	if state == State.DASHING:
		for i in range(3):
			var tx: float = -i * 10.0 * ed
			var a: float = 0.35 - i * 0.1
			draw_circle(Vector2(tx, 0), 12.0 - i * 2.0, Color(0.3, 0.7, 1.0, a))
