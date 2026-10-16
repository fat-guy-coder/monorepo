extends CanvasLayer
class_name Hud
## 战斗 HUD — 从 main.gd 的 _create_ui() 提取精简
##
## 📚 涉及学习文档:
##   godot-4-2-control-nodes   — Control / CanvasLayer: UI 不走世界坐标系
##   godot-4-5-anchors-layout  — 锚点定位 (血格贴左上角)
##   godot-2-3-node2d-basics   — Control._draw() 自定义绘制
##   godot-1-8-signals-basics  — 由玩家信号驱动刷新, 而不是每帧轮询
##
## 🎮 相对旧版的删减 (见本次范围):
##   删掉 → 冲刺冷却条 / Boss 血条跟随 / 游戏结束面板 / 胜利面板。
##   理由: 走位地基阶段这些都没有消费者 (冲刺冷却本轮不做; 死亡改为即时复活,
##   「游戏结束」这个概念在低惩罚死亡设计里不存在)。
##   保留 → 血量 + 分数 + 一行操作提示。
##
## 🎮 v0.3 新增**精力条** —— 它是本轮唯一新增的 UI, 而且它不是「顺便显示一下状态」:
##   精力系统要逼出取舍, 前提是玩家**能实时看到它还够不够**。
##   看不见的代价等于没有代价 —— 那样玩家只会觉得「闪避有时候不灵」。
##   所以这一条和 player.gd 的精力消耗是**同一个机制的两半**, 不能只做一半。
##
## 🏗️ ⚠️ 最容易踩的坑: Control 的 mouse_filter 默认是 STOP
##   (Control 基类默认 STOP; 只有 Label 覆写成 IGNORE)。
##   血格如果用 ColorRect 铺在屏幕左上, 那么鼠标划过那片区域时,
##   **点击会被 UI 吃掉**, 玩家的左键轻击在那块区域直接静默失效 ——
##   而且看起来像「攻击有时不灵」, 极难查。
##   所以本文件里**每一个** Control 子节点都显式设 MOUSE_FILTER_IGNORE。
##
##   ⚠️ v0.3 尤其要小心这条: 本轮加了**鼠标瞄准格挡**。HUD 在左上角占了
##      约 190×70 的一块, 如果它吃鼠标事件, 那么玩家在屏幕左上区域
##      **既格挡不了 (鼠标被吞) 又轻击不了 (点击被吞)** ——
##      而这个区域恰恰是敌人常出现的地方之一。
##
## 🏗️ 刷新方式: **数值**走信号驱动 (health_changed / stamina_changed),
##   不在 _process 里轮询 —— 轮询是「每帧做 60 次什么也没变的比较」。
##
##   ⚠️ 但有两个状态**没有信号可连**: 「回复延迟是否锁着」和「是否破防中」。
##      它们不是离散事件, 是**连续展示状态**, 定义在 StatPool / State 里而不是信号里。
##      所以 HUD 破例在 _process 里读它们 —— 但读取之后走的是 set_locked()/
##      set_broken(), 内部**只在值真的变了才 queue_redraw()**。
##      也就是说: 轮询的是两个 bool, 重绘仍然只在变化时发生。
##      (为这两个加信号也行, 但那是为了「优雅」给一个既有事件的系统加事件,
##       反而多出两条永远不会被别的消费者用到的信号。)


@export var full_color: Color = Color(0.95, 0.25, 0.35)     ## 满血格
@export var empty_color: Color = Color(0.18, 0.18, 0.22)    ## 空格 (未损失时不可见)
@export var empty_edge: Color = Color(0.35, 0.36, 0.44)     ## 空格外框

var _player: BlitzPlayer = null
var _score: int = 0

var _hearts: HeartBar = null
var _stamina: StaminaBar = null
var _score_label: Label = null
var _hint_label: Label = null


func _ready() -> void:
	# 100 高于世界/特效 (40), 低于 DebugOverlay 的 200
	layer = 100

	_hearts = HeartBar.new()
	_hearts.position = Vector2(16.0, 14.0)
	_hearts.full_color = full_color
	_hearts.empty_color = empty_color
	_hearts.empty_edge = empty_edge
	_hearts.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(_hearts)

	# 精力条压在血格正下方 (血格高 16, 所以 14+16+8 = 38)
	_stamina = StaminaBar.new()
	_stamina.position = Vector2(16.0, 38.0)
	add_child(_stamina)

	_score_label = _make_label(Vector2(16.0, 58.0), 18, Color(0.98, 0.85, 0.35))
	add_child(_score_label)

	_hint_label = _make_label(Vector2(16.0, 0.0), 13, Color(0.72, 0.78, 0.9))
	add_child(_hint_label)
	# 提示行贴屏幕**底部** —— 用锚点而非硬编码 y, 换分辨率不会跑偏
	_hint_label.set_anchors_preset(Control.PRESET_BOTTOM_LEFT)
	_hint_label.position = Vector2(16.0, -30.0)
	_hint_label.text = "WASD/方向键 走位   Space 闪避   J/左键 轻击   K/右键 重击   Shift/L 格挡   F1 调试   R 重开"

	set_score(0)
	# 绑定玩家之前不跑 _process —— 没玩家可读的时候不该每帧空转
	set_process(false)


func _make_label(at: Vector2, size: int, color: Color) -> Label:
	var l: Label = Label.new()
	l.position = at
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", color)
	# 深色描边: HUD 浮在星空/地面上, 没有描边的浅色文字会看不清
	l.add_theme_color_override("font_outline_color", Color(0.0, 0.0, 0.0, 0.9))
	l.add_theme_constant_override("outline_size", 4)
	l.mouse_filter = Control.MOUSE_FILTER_IGNORE
	return l


## 绑定玩家 —— 连上 health_changed / stamina_changed, 立刻同步一次当前值
func bind_player(p: BlitzPlayer) -> void:
	_player = p
	if p == null:
		return
	# 直接连信号 (而不是 has_signal 反射): player.gd 若改了信号名, 这里就该编译报错
	p.health_changed.connect(_on_health_changed)
	p.stamina_changed.connect(_on_stamina_changed)
	_hearts.set_max(p.max_health)
	_hearts.set_current(p.health)
	# ⚠️ 必须在这里**再同步一次精力**: 绑定可能发生在第一帧之后,
	#    而 stamina_changed 只在**变化时**发 —— 如果精力此刻是满的, 那个信号
	#    永远等不到, 精力条会停在 _init 的默认值上 (看起来像「HUD 坏了」)。
	if p.stamina != null:
		_stamina.set_values(p.stamina.current, p.stamina.max_value)
		set_process(true)


## 只有绑定了玩家才需要跑 _process (读那两个没有信号的展示状态)
func _process(_delta: float) -> void:
	if _player == null or _player.stamina == null:
		return
	_stamina.set_locked(_player.stamina.is_regen_locked())
	_stamina.set_broken(_player.is_guard_broken())


func set_score(v: int) -> void:
	_score = v
	if _score_label != null:
		_score_label.text = "分数 %d" % _score


func _on_health_changed(current: int, maximum: int) -> void:
	_hearts.set_max(maximum)
	_hearts.set_current(current)


func _on_stamina_changed(current: float, maximum: float) -> void:
	_stamina.set_values(current, maximum)


# ============================================================
# 血格 — 用等距菱形画, 和地面的菱形母题一致
# ============================================================
class HeartBar extends Control:
	## ⚠️ 内部类**看不到**外层脚本的常量 —— GDScript 的内部类不是「嵌套作用域」,
	## 而是各自独立的类。所以 HEART_SIZE 必须定义在这里, 外层要用就写 HeartBar.HEART_SIZE。
	## 单个血格的边长 (px)
	const HEART_SIZE: float = 16.0
	## 血格之间的间距
	const HEART_GAP: float = 5.0

	var full_color: Color = Color(0.95, 0.25, 0.35)
	var empty_color: Color = Color(0.18, 0.18, 0.22)
	var empty_edge: Color = Color(0.35, 0.36, 0.44)

	var _max: int = 3
	var _current: int = 3

	func _init() -> void:
		# 自绘控件必须自己报尺寸, 否则 Control 默认 0×0 什么都不显示
		custom_minimum_size = Vector2(0.0, HEART_SIZE)
		mouse_filter = Control.MOUSE_FILTER_IGNORE

	func set_max(v: int) -> void:
		_max = maxi(0, v)
		_update_size()
		queue_redraw()

	func set_current(v: int) -> void:
		_current = clampi(v, 0, _max)
		queue_redraw()

	func _update_size() -> void:
		if _max <= 0:
			custom_minimum_size = Vector2.ZERO
		else:
			custom_minimum_size = Vector2(
				float(_max) * HEART_SIZE + float(_max - 1) * HEART_GAP, HEART_SIZE)
		size = custom_minimum_size

	func _draw() -> void:
		for i: int in range(_max):
			var x: float = float(i) * (HEART_SIZE + HEART_GAP)
			# 菱形血格: 中心 (x + 半宽, 半高), 半宽=半高=HEART_SIZE/2
			var h: float = HEART_SIZE * 0.5
			var cx: float = x + h
			var pts: PackedVector2Array = PackedVector2Array([
				Vector2(cx, 0.0), Vector2(x + HEART_SIZE, h),
				Vector2(cx, HEART_SIZE), Vector2(x, h),
			])
			if i < _current:
				draw_colored_polygon(pts, full_color)
			else:
				draw_colored_polygon(pts, empty_color)
				draw_polyline(PackedVector2Array([pts[0], pts[1], pts[2], pts[3], pts[0]]), empty_edge, 1.0)


# ============================================================
# 精力条 — 横条 + 两端菱形端盖 (和血格的菱形母题呼应)
# ============================================================
class StaminaBar extends Control:
	## 条体宽度 (不含两端的菱形)
	const BAR_W: float = 152.0
	const BAR_H: float = 11.0
	## 端盖菱形从条体两端再往外伸出的宽度
	const CAP: float = 6.0
	## 刻度段数: 每段正好等于一次闪避的消耗 (25/100), 所以「还剩几段」=「还能闪几次」
	const TICK_SEGMENTS: int = 4

	var full_color: Color = Color(0.40, 0.93, 0.78)     ## 充足
	var low_color: Color = Color(0.98, 0.68, 0.22)      ## 偏低
	var empty_color: Color = Color(0.88, 0.26, 0.32)    ## 见底 / 破防
	var track_color: Color = Color(0.09, 0.10, 0.15)    ## 空槽
	var edge_color: Color = Color(0.38, 0.44, 0.58)     ## 外框
	var ghost_color: Color = Color(1.0, 0.96, 0.72)     ## 滞后白条 (刚花掉的那一截)

	var _max: float = 100.0
	var _current: float = 100.0
	## 滞后追赶值: 消耗后它慢慢降下来, 于是「刚才这一下花了多少」被显式画出来。
	## 没有它的话, 精力条只是在跳 —— 玩家感觉不到自己刚付出了多少。
	var _ghost: float = 100.0
	var _locked: bool = false     ## 正处于回复延迟中
	var _broken: bool = false     ## 破防中
	var _pulse: float = 0.0

	func _init() -> void:
		# 自绘控件必须自己报尺寸, 否则 Control 默认 0×0 什么都不显示
		custom_minimum_size = Vector2(BAR_W, BAR_H)
		mouse_filter = Control.MOUSE_FILTER_IGNORE

	## 数值更新入口 (信号回调 + 绑定时的手动同步都走这儿)
	func set_values(current: float, maximum: float) -> void:
		_max = maxf(0.001, maximum)
		# ⚠️ 只在**下降**时把 ghost 顶上去。若不分方向地 ghost = max(ghost, current),
		#    回复阶段 ghost 会被一路推着往回涨, 白条看起来像「第二条精力在涨」。
		if current < _current - 0.01:
			_ghost = maxf(_ghost, _current)
		_current = maxf(0.0, current)
		_ghost = maxf(_ghost, _current)
		queue_redraw()

	## 变化才重绘 —— HUD 每帧调它, 但绝大多数帧是空操作
	func set_locked(v: bool) -> void:
		if v == _locked:
			return
		_locked = v
		queue_redraw()

	func set_broken(v: bool) -> void:
		if v == _broken:
			return
		_broken = v
		_pulse = 0.0
		queue_redraw()

	func _process(delta: float) -> void:
		var dirty: bool = false
		if not is_equal_approx(_ghost, _current):
			# 追赶速度: 整条约 0.7 秒追上。再快就看不清「刚才花了多少」,
			# 再慢会被误认成显示滞后 (玩家会以为是 bug)
			_ghost = move_toward(_ghost, _current, _max * 1.45 * delta)
			dirty = true
		if _broken:
			# 破防是「你现在的处境很糟」, 必须持续跳 —— 静态的红色条会被看漏
			_pulse += delta
			dirty = true
		if dirty:
			queue_redraw()

	func _draw() -> void:
		var mid: float = BAR_H * 0.5
		var x0: float = CAP
		var x1: float = BAR_W - CAP
		var body_w: float = x1 - x0
		var r: float = clampf(_current / _max, 0.0, 1.0)

		# ① 槽
		draw_rect(Rect2(x0, 0.0, body_w, BAR_H), track_color)

		# ② 颜色: 充足(青绿) → 偏低(琥珀) → 见底(红), 分段插值
		var fill: Color = full_color.lerp(low_color, clampf((1.0 - r) / 0.45, 0.0, 1.0))
		fill = fill.lerp(empty_color, clampf((0.25 - r) / 0.25, 0.0, 1.0))
		if _broken:
			fill = empty_color

		# ③ 滞后白条 (先画, 会被实际条盖住大半, 只剩下「刚花掉的那一截」)
		var g: float = clampf(_ghost / _max, 0.0, 1.0)
		draw_rect(Rect2(x0, 0.0, body_w * g, BAR_H),
			Color(ghost_color.r, ghost_color.g, ghost_color.b, 0.40))

		# ④ 实际值
		draw_rect(Rect2(x0, 0.0, body_w * r, BAR_H), fill)

		# ⑤ 刻度: 每格 25 点 = 一次闪避。玩家不用读数字就知道「还能闪几次」
		for i: int in range(1, TICK_SEGMENTS):
			var tx: float = x0 + body_w * (float(i) / float(TICK_SEGMENTS))
			draw_line(Vector2(tx, 1.0), Vector2(tx, BAR_H - 1.0), Color(0.0, 0.0, 0.0, 0.5), 1.0)

		# ⑥ 两端菱形端盖 —— 呼应血格的菱形母题, 一眼看出"这是同一套 UI"
		var caps: Array[float] = [x0, x1]
		for cx: float in caps:
			draw_colored_polygon(PackedVector2Array([
				Vector2(cx, mid - BAR_H * 0.5), Vector2(cx + CAP, mid),
				Vector2(cx, mid + BAR_H * 0.5), Vector2(cx - CAP, mid),
			]), edge_color)

		# ⑦ 外框: 破防时脉动闪红, 回复延迟中压暗 —— 这两个状态都没有专用 UI 位置,
		#    靠边框表达, 免得再加第三根条
		var edge: Color = edge_color
		if _broken:
			edge = empty_color.lerp(Color.WHITE, 0.25 + 0.35 * sin(_pulse * 18.0))
		elif _locked:
			edge = edge_color.lerp(Color(0.72, 0.76, 0.9), 0.7)
		draw_rect(Rect2(x0, 0.0, body_w, BAR_H), edge, false, 1.5)
