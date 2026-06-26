extends CharacterBody2D
class_name CupheadPlayer
## 茶杯头风格玩家控制器 — 状态机 + 物理 + 输入 综合实战
##
## 📚 涉及学习文档 (按阅读顺序):
##   godot-2-6-characterbody2d  — CharacterBody2D 基础: move_and_slide/velocity/重力
##   godot-6-5-characterbody-deep — 深入: is_on_floor/coyote time/jump buffer
##   godot-6-6-platformer-physics  — 平台跳跃物理: 可变跳跃高度/冲刺
##   godot-7-8-state-machines      — 状态机模式: NORMAL/DASHING/HIT/DEAD
##   godot-5-2-input-handling      — Input 单例: get_axis/is_action_just_pressed
##   godot-5-1-input-map           — InputMap: 在代码中注册按键动作
##   godot-2-5-collision2d         — 碰撞形状: CircleShape2D/碰撞层位掩码
##   godot-6-4-collision-layers    — 位掩码详解: layer vs mask 的区别
##   godot-2-3-node2d-basics       — _draw() 绘制圆形外观
##   godot-1-8-signals-basics      — 信号连接: body_entered/area_entered
##   godot-1-13-string-formatting  — 字符串格式化(日志/调试)
##
## 🎮 核心机制一览 (茶杯头风格):
##   - 移动: A/D 或 ←→  水平加减速,有惯性
##   - 跳跃: Space/W/↑  可变高度(松键削减) + coyote time + jump buffer
##   - 冲刺: Shift/K    短暂无敌 + 水平爆发速度
##   - 射击: J/Z/鼠标左键  按住连发,子弹直线飞行
##   - 格挡: 空中靠近粉色物体按跳 → 高弹跳 + 150分 + 无敌
##
## 🏗️ 碰撞层设计 (必须与 enemy.gd / bullet.gd / main.gd 一致):
##   Bit 0 = 玩家身体     Bit 3 = (预留)
##   Bit 1 = 敌人身体     Bit 4 = 墙壁/平台
##   Bit 2 = 玩家子弹     Bit 5 = 格挡对象
##                        Bit 6 = 终点

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
# 冲刺参数
# ============================================================
@export var dash_speed: float = 900.0       ## 冲刺速度 px/s
@export var dash_duration: float = 0.15     ## 冲刺持续时间(秒)
@export var dash_cooldown: float = 0.5      ## 冲刺冷却时间(秒)

# ============================================================
# 射击参数
# ============================================================
@export var fire_rate: float = 0.13         ## 射击间隔(秒),≈7.7发/秒
@export var bullet_speed: float = 700.0     ## 子弹速度 px/s
var bullet_scene: PackedScene = null        ## 子弹场景(由 main.gd 注入)

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
enum State { NORMAL, DASHING, HIT, DEAD }
var state: State = State.NORMAL
var facing_right: bool = true   ## 朝向: true=右,false=左

# ── 内部计时器 ──
var _coyote_timer: float = 0.0
var _jump_buffer_timer: float = 0.0
var _dash_timer: float = 0.0
var _dash_cooldown_timer: float = 0.0
var _fire_timer: float = 0.0
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
	# CharacterBody2D 用 collision_mask 筛选"我能站在什么上面"
	# 这里只跟墙壁/平台碰撞(layer bit4)
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
	# → godot-7-8-state-machines: enum State + match 四状态机
	match state:
		State.NORMAL:
			_process_normal(delta)
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
	# → godot-6-5-characterbody-deep: 之后 is_on_floor/wall/ceiling 才更新
	move_and_slide()

	# 5. 重绘 (闪白/朝向变化需要)
	queue_redraw()


func _update_timers(delta: float) -> void:
	_coyote_timer        = max(0.0, _coyote_timer - delta)
	_jump_buffer_timer   = max(0.0, _jump_buffer_timer - delta)
	_dash_cooldown_timer = max(0.0, _dash_cooldown_timer - delta)
	_fire_timer          = max(0.0, _fire_timer - delta)
	invincible_timer     = max(0.0, invincible_timer - delta)
	_hit_stun_timer      = max(0.0, _hit_stun_timer - delta)


# ============================================================
# NORMAL 状态 — 移动 + 跳跃 + 冲刺 + 射击 + 格挡
# ============================================================
func _process_normal(delta: float) -> void:
	# ── 水平移动 ──
	# → godot-5-2-input-handling: Input.get_axis 返回 -1(左)~0~1(右)
	var input_dir: float = Input.get_axis("move_left", "move_right")
	if input_dir != 0.0:
		facing_right = input_dir > 0.0
		# move_toward: 从当前速度平滑过渡到目标速度,帧率无关
		velocity.x = move_toward(velocity.x, input_dir * move_speed, move_accel * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, move_decel * delta)

	# ── 重力 (只有空中才加速下落) ──
	if not is_on_floor():
		velocity.y += gravity * delta
		velocity.y = min(velocity.y, max_fall_speed)  # 限制最大下落速度

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

	# ── 冲刺 ──
	if Input.is_action_just_pressed("dash") and _dash_cooldown_timer <= 0.0:
		_start_dash()

	# ── 射击 (按住连发,fire_rate 控制频率) ──
	if Input.is_action_pressed("shoot") and _fire_timer <= 0.0:
		_shoot()
		_fire_timer = fire_rate


# ── DASHING 状态 ──
func _process_dash(delta: float) -> void:
	_dash_timer -= delta
	if _dash_timer <= 0.0:
		_end_dash()
	velocity.y = 0.0  # 冲刺期间不受重力


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


func _start_dash() -> void:
	state = State.DASHING
	_dash_timer = dash_duration
	_dash_cooldown_timer = dash_cooldown
	invincible_timer = dash_duration + 0.05   # 冲刺无敌帧略长于冲刺本身
	var d: float = 1.0 if facing_right else -1.0
	velocity = Vector2(d * dash_speed, 0.0)


func _end_dash() -> void:
	state = State.NORMAL
	# 冲刺结束后恢复速度(y=0 不容易卡在空中)


func _shoot() -> void:
	if bullet_scene == null:
		return

	# 从 .tscn 实例化子弹 (而不是 script.new())
	# 这样子弹就有预建的 CollisionShape2D,Godot 编辑器可见
	# 详见 godot-4-2-scene-instantiation
	var bullet: Area2D = bullet_scene.instantiate()
	var d: float = 1.0 if facing_right else -1.0
	bullet.position = position + Vector2(20.0 * d, -4.0)
	bullet.direction = Vector2(d, 0.0)
	bullet.speed = bullet_speed
	get_tree().current_scene.add_child(bullet)


# ── 格挡 ──
func _perform_parry() -> void:
	# 格挡 = 高弹跳 + 短暂无敌
	velocity.y = jump_velocity * 1.35
	invincible_timer = 0.6
	# 通知主场景: 销毁格挡对象 + 加分
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
		return  # 无敌或已死亡,忽略伤害

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
	collision_layer = 0   # 死后不参与碰撞
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
# 外观 (_draw 绘制圆形角色)
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
		State.DASHING: body_color = Color.CYAN          # 青色冲刺
		State.HIT:     body_color = Color.RED           # 红色受伤
		_:             body_color = Color(0.2, 0.55, 0.95)  # 蓝色正常

	# 绘制主体 (圆形,半径 15)
	if invincible_timer > 0.0:
		draw_circle(Vector2.ZERO, 17, Color.WHITE)  # 无敌白边
		draw_circle(Vector2.ZERO, 15, body_color)
	else:
		draw_circle(Vector2.ZERO, 15, body_color)
		draw_arc(Vector2.ZERO, 15, 0, TAU, 32, body_color.darkened(0.3), 1.5)

	# 眼睛 (只画白+瞳,方向指示)
	var ed: float = 1.0 if facing_right else -1.0
	draw_circle(Vector2(5.0 * ed, -5.0), 3.5, Color.WHITE)
	draw_circle(Vector2(7.0 * ed, -5.0), 2.0, Color.BLACK)

	# 冲刺拖尾效果
	if state == State.DASHING:
		for i in range(3):
			var tx: float = -i * 10.0 * ed
			var a: float = 0.35 - i * 0.1
			draw_circle(Vector2(tx, 0), 12.0 - i * 2.0, Color(0.3, 0.7, 1.0, a))
