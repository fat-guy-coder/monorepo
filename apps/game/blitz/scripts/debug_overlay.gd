extends Node2D
class_name DebugOverlay
## 横版走位验收面板 — 本次里程碑的**验收工具**, 不是装饰
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() + CanvasLayer 的层级混用
##   godot-2-8-tilemap        — 方形网格: 用中心点画出「脚在哪个格」
##   godot-3-4-input-handling — _unhandled_input: 面板开关不该被 UI 吃掉
##   godot-1-12-static-typing — 强类型 + 参数类型标注
##
## 🎮 为什么值得单独写一个文件:
##   走位映射的错误**肉眼极难分辨**。「格子映射偏了半格」和「角色美术没对齐」
##   在屏幕上看起来一模一样, 靠盯屏幕猜会浪费一整天。
##   这个面板把「引擎认为你在哪个格」「高亮格在哪」「你的精确坐标在哪」
##   三件事同时画出来 —— 对不上就是对不上, 一眼可见。
##
## 🏗️ 为什么是 Node2D 而不是 CanvasLayer:
##   CanvasLayer **没有** _draw() —— 它不属于 2D 世界坐标系, 只是给子节点换图层。
##   而我们需要在世界坐标里画格子。所以本节点是 Node2D (挂场景根下, 不参与 y-sort),
##   内部再自建一个 CanvasLayer(200) 装文字 —— CanvasLayer 作为 Node2D 的子节点完全合法,
##   它不会继承父节点的 transform, 这正是我们要的 (文字固定屏幕位置)。
##
## 🏗️ 四个标记各自证明什么:
##   ① 高亮矩形 (跟随脚底格子) —— 证明 BeltFloor.cell_of() 与引擎的 map_to_local 一致
##   ② 纵深泳道 (横贯全图的整行高亮) —— 证明**纵深这一维读得出来**。
##      这是横版特有的验收项: 画面上下就是纵深, 但一眼看不出「我在第几行」。
##      把整行铺一条淡带, 纵深位置从「猜」变成「看」。
##   ③ 十字准星 (玩家精确坐标) —— 和矩形中心对比, 证明角色原点在脚底且居中
##   ④ 朝向箭头 —— 横版朝向只有左右, 箭头应当**只有水平**两个方向
##
## 🎮 v0.3 新增 ④ **格挡范围可视化** —— 这是本轮最重要的一块面板功能。
##   格挡的失败模式是**「我觉得我挡住了」**: 玩家正面挨打时掉血,
##   分不清是「我朝向错了 (背对)」「判定框位置不对」还是「窗口过期了」。
##   三者在屏幕上长得一模一样, 靠猜会浪费一整天。
##   把判定边界画出来, 「我在不在正面」就变成一个**看得见**的几何问题。
##
##   v0.4 视角转横版后, 这里从「扇形」变成「一条沿纵深无限长的竖线 + 前侧淡带」
##   (见 _draw_guard_plane) —— 形状变了, 但这条面板存在的理由一个字没变。


## 面板开关按键 (在 project.godot 的 [input] 里定义)
const TOGGLE_ACTION: String = "debug_toggle"

## 面板文字所在图层 (200 高于 HUD, 保证不被盖住)
const TEXT_LAYER: int = 200

@export var cell_color: Color = Color(0.25, 0.95, 1.0, 0.9)      ## 高亮格 (脚下那一格)
@export var lane_color: Color = Color(0.25, 0.95, 1.0, 1.0)      ## 纵深泳道 (整行)
@export var cross_color: Color = Color(1.0, 0.35, 0.35, 1.0)     ## 玩家精确坐标
@export var arrow_color: Color = Color(1.0, 0.85, 0.2, 1.0)      ## 朝向箭头
@export var cone_color: Color = Color(0.4, 1.0, 0.55, 1.0)       ## 格挡范围边界
@export var parry_color: Color = Color(1.0, 0.9, 0.35, 1.0)      ## 精准窗口开着的范围
@export var attack_color: Color = Color(0.55, 0.85, 1.0, 1.0)    ## 攻击范围 (轻击预览)

var _floor: BeltFloor = null
var _player: BlitzPlayer = null
var _label: Label = null
var _text_layer: CanvasLayer = null
## 半格尺寸 (正方形地格, 但两个轴各留一个变量 —— 以后改成长方形地砖不用回来改这里)
var _hw: float = 0.0
var _hd: float = 0.0


func _ready() -> void:
	_hw = BeltFloor.CELL_W_F * 0.5
	_hd = BeltFloor.CELL_D_F * 0.5

	_text_layer = CanvasLayer.new()
	_text_layer.layer = TEXT_LAYER
	add_child(_text_layer)

	_label = Label.new()
	# 让开 HUD: 血格 (14~30) + 精力条 (38~49) + 分数 (58~82) → 从 90 起
	_label.position = Vector2(12.0, 90.0)
	_label.add_theme_font_size_override("font_size", 13)
	_label.add_theme_color_override("font_color", Color(0.80, 0.95, 1.0))
	# 半透明底衬: 星空背景上纯文字会看不清
	_label.add_theme_color_override("font_outline_color", Color(0.0, 0.0, 0.0, 0.85))
	_label.add_theme_constant_override("outline_size", 4)
	# ⚠️ Label 默认就是 IGNORE, 但显式写出来 —— 见 HUD 里那条 mouse_filter 的坑
	_label.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_text_layer.add_child(_label)


## 显示/隐藏面板。
##
## ⚠️ 必须**两处都切**: 世界空间的菱形走本节点 (Node2D) 的 visible,
##    而文字在 CanvasLayer 里 —— CanvasLayer 不是 CanvasItem, **不继承**父节点的
##    visible。只切本节点的话, 菱形消失了但文字还挂在屏幕上, 看起来像「面板关不掉」。
func set_shown(on: bool) -> void:
	visible = on
	if _text_layer != null:
		_text_layer.visible = on


## 由 main.gd 在关卡搭好后调用
func setup(floor: BeltFloor, player: BlitzPlayer) -> void:
	_floor = floor
	_player = player


func _unhandled_input(event: InputEvent) -> void:
	# 用 _unhandled_input 而不是 _input: 如果有 UI 正在吃按键, 面板不该跟着响应
	if event.is_action_pressed(TOGGLE_ACTION):
		set_shown(not visible)
		get_viewport().set_input_as_handled()


func _process(_delta: float) -> void:
	if not visible:
		return
	queue_redraw()
	_update_text()


func _update_text() -> void:
	if _label == null or _player == null or not is_instance_valid(_player):
		return
	var pos: Vector2 = _player.global_position
	# ── 速度: 验收第 6 条的关键数字 ──
	# 对角线同时按住时, 若这里显示 452 (=320×√2) 说明输入没用 Input.get_vector 归一化
	var vel: Vector2 = _player.velocity

	var cell: Vector2i = _floor.cell_of(pos) if _floor != null else Vector2i.ZERO
	var w: Vector2 = BeltSpace.to_world(pos)
	var lines: Array[String] = []
	lines.append_array(_key_guide())
	lines.append_array([
		# 🏗️ 世界坐标拆开显示, 不要只印 pos —— pos.y 是「负的纵深 × 压扁比」,
		#    直接看 pos 会把「z 变大」读成「y 变小」。而且压扁之后两者**差两倍**,
		#    拿 pos.y 当纵深去调关卡会一路调错 (这段第一版就漏了那个 ÷ DEPTH_SCALE)。
		"",
		"轴: x 左右 · z 纵深 · height 离地   ← 重力只动 height",
		"屏幕 pos = (%.1f, %.1f) 是**压扁后**的, 纵深 y 上只占一半 (DEPTH_SCALE = %.2f)"
			% [pos.x, pos.y, BeltSpace.DEPTH_SCALE],
		"世界 x = %.1f   世界纵深 z = %.1f   (换算见 belt_space.gd)" % [w.x, w.y],
		"所在格 = %s   列(i) = %d   行(j) = %d  ← 行越大越靠近镜头" % [str(cell), cell.x, cell.y],
		# |v| 报的是**世界**速度 —— 这才是「八个方向一致」的那个数。
		# 报屏幕速度的话, 按上时它会显示 160, 看起来像「纵向走得慢」, 每次都要重新解释一遍。
		"vel = (%.1f, %.1f)   世界 |v| = %.1f  (期望 %.0f)" % [
			vel.x, vel.y, BeltSpace.screen_speed_to_world(vel), _player.move_speed],
		"朝向 = %s   离地 height = %.1f px   %s" % [
			"右 →" if _player.facing > 0 else "← 左", _player.height,
			"地面" if _player.is_grounded() else "★空中"],
		"状态 = %s" % BlitzPlayer.State.keys()[_player.state],
		_attack_line(),
		_stamina_line(),
		_combat_line(),
		"按下中: " + _live_input(),
	])
	_label.text = "\n".join(lines)


## 攻击范围 —— 把两个形状的**参数**印出来, 和地上画的那两块对上。
##
## 🎮 为什么参数也要印, 而不只是画:
##   画出来的是「这个形状长什么样」, 数字是「它是多少」。
##   调纵深容差时要知道的是后者 —— 而地面上的椭圆在 2:1 压扁下,
##   「±63」和「±70」肉眼几乎分不出来, 数字能。
##   ⚠️ 两个数都直接读 shape 自己 (而不是抄一遍 light_sweep_radius),
##      抄的话改了参数忘了改这里, 面板就开始安静地撒谎 —— 而这是本面板的大忌。
func _attack_line() -> String:
	var l: AttackShape = _player.light_shape()
	var h: AttackShape = _player.heavy_shape()
	var live: String = "出招中: %s" % (_player.active_shape().describe() if _player.active_shape() != null else "-")
	return "轻击 %s   重击 %s   %s" % [l.describe(), h.describe(), live]


## 精力 —— 三个数字缺一不可:
##   current/max 看余量; `锁` 看回复延迟是否还在 (玩家最常问的就是「为什么还不回」);
##   破防则是「当前处境」而不是数值。
func _stamina_line() -> String:
	if _player.stamina == null:
		return "精力 = (未初始化)"
	var sp: StatPool = _player.stamina
	return "精力 = %.0f / %.0f  (%.0f%%)  %s%s" % [
		sp.current, sp.max_value, sp.ratio() * 100.0,
		"回复中" if not sp.is_regen_locked() else "锁 %.2fs" % sp._hold,
		"   ⚠️破防" if _player.is_guard_broken() else "",
	]


## 战斗状态 —— 精准窗口和蓄力进度是**两个看不见的计时器**,
## 不显示出来的话, 调参时只能靠手感猜「窗口到底是不是 0.16 秒」。
func _combat_line() -> String:
	var guard: String = "开" if _player.is_parry_window_open() else "关"
	var charge: String = "-"
	if _player.is_charging():
		var t: float = _player.charge_ratio()
		charge = "%.0f%%%s" % [t * 100.0, "  ★可破霸体" if t >= _player.heavy_armor_break_ratio else ""]
	return "精准窗口 = %s    蓄力 = %s    %s" % [guard, charge, _enemy_phase()]


## 最近的敌人的出招相位 —— 验敌人状态机时, 「它到底在哪一相」必须能直接读到。
## 靠看动画猜相位是行不通的: WINDUP 末尾和 STRIKE 的画面几乎一样。
func _enemy_phase() -> String:
	var best: BlitzEnemy = null
	var best_d: float = INF
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		if not (n is BlitzEnemy):
			continue
		var e: BlitzEnemy = n
		if e.is_dead:
			continue
		var d: float = e.global_position.distance_to(_player.global_position)
		if d < best_d:
			best_d = d
			best = e
	if best == null:
		return "最近敌人 = 无"
	return "最近敌人 = %s @%.0fpx  hp=%d" % [
		BlitzEnemy.AttackPhase.keys()[best.attack_phase], best_d, best.health]


## 按键指南 —— **每个键从 InputMap 反查出来, 一个都不硬编码**。
##
## 🎮 为什么值得占面板最上面四行:
##   玩家 (包括三天后的自己) 打开面板第一件事就是问「我能按什么」。
##   没有这张表, 唯一的办法是去翻 project.godot 或者试 ——
##   而试的成本极高: 「按了没反应」和「按了有反应但没生效」长得一模一样。
##
## 🏗️ 为什么不直接写死 "J/K/Space/L":
##   映射改一次, 面板就开始**安静地撒谎** —— 上面写着 J, 按 J 却没反应,
##   于是人会先去怀疑攻击逻辑坏了, 而不是怀疑这张表过期了。
##   从 InputMap 读的话, 表和实际映射在结构上不可能漂移。
##   (和格挡那条「画出来的边界必须和实际判定用同一个数」是同一条纪律。)
func _key_guide() -> Array[String]:
	# 两列的宽度 (单位 = 半角位), 见 _pad 的注释
	const NAME_W: int = 6
	const KEYS_W: int = 18
	var lines: Array[String] = ["── 按键 ─────────────────────────────────────────────"]
	var rows: Array = [
		["移动", _move_keys(), "轻击", "%s  (横劈: 扇形, 扫一片)" % _keys_of("attack_light")],
		["跳", _keys_of("jump"), "重击", "%s  (按住蓄力, 满蓄破霸体)" % _keys_of("attack_heavy")],
		["闪避", _keys_of("dash"), "技能", "%s  (落雷: 身前一格半, 延迟 0.4 秒)" % _keys_of("attack_skill")],
		["格挡", _keys_of("block"), "面板", _keys_of(TOGGLE_ACTION)],
		["重开", _keys_of("restart"), "", ""],
	]
	for r: Array in rows:
		lines.append("  %s %s   %s %s" % [
			_pad(str(r[0]), NAME_W), _pad(str(r[1]), KEYS_W),
			_pad(str(r[2]), NAME_W), str(r[3])])
	return lines


## 把一列文本按**半角位**补齐 —— 中日韩字符占 2 个半角位。
##
## ⚠️ 「数空格个数」是行不通的: "闪避" 占 4 个半角位、"跳" 只占 2,
##    后面补同样多的空格, 右边的列就会歪。歪掉的表看起来像面板坏了 ——
##    而一个看起来坏了的面板, 就没人会再信它上面的数字 (这正是本面板的大忌:
##    它是验收工具, 可信度就是它的全部价值)。
func _pad(s: String, cells: int) -> String:
	var w: int = 0
	for i: int in range(s.length()):
		w += 2 if _is_wide(s.unicode_at(i)) else 1
	return s + " ".repeat(maxi(0, cells - w))


## 这个码点是不是「全角」(在中文等宽字体里占两格)。
## 覆盖区间取自 Unicode East Asian Width 的 W/F 类里实际会用到的那些。
func _is_wide(c: int) -> bool:
	return (c >= 0x1100 and c <= 0x115F) \
		or (c >= 0x2E80 and c <= 0x303E) \
		or (c >= 0x3041 and c <= 0x33FF) \
		or (c >= 0x3400 and c <= 0x4DBF) \
		or (c >= 0x4E00 and c <= 0x9FFF) \
		or (c >= 0xA000 and c <= 0xA4CF) \
		or (c >= 0xAC00 and c <= 0xD7A3) \
		or (c >= 0xF900 and c <= 0xFAFF) \
		or (c >= 0xFE30 and c <= 0xFE6F) \
		or (c >= 0xFF00 and c <= 0xFF60) \
		or (c >= 0xFFE0 and c <= 0xFFE6)


## 移动键单独处理 —— 四个方向合起来读才是「WASD 或方向键」,
## 拆成四行 `move_up=W/↑` 既占地方又不像一句人话。
## 这里按「字母键 / 方向键」分成两组显示, 字母组顺序固定 W A S D。
func _move_keys() -> String:
	var letters: Array[String] = []
	var arrows: Array[String] = []
	for a: String in ["move_up", "move_left", "move_down", "move_right"]:
		if not InputMap.has_action(a):
			return "未定义"
		for ev: InputEvent in InputMap.action_get_events(a):
			if not (ev is InputEventKey):
				continue
			var lbl: String = _key_label(ev as InputEventKey)
			if lbl in ["↑", "←", "↓", "→"]:
				arrows.append(lbl)
			else:
				letters.append(lbl)
	if letters.is_empty() and arrows.is_empty():
		return "未绑定"
	if arrows.is_empty():
		return " ".join(letters)
	if letters.is_empty():
		return " ".join(arrows)
	return "%s / %s" % [" ".join(letters), " ".join(arrows)]


## 某个 action 绑了哪些键/鼠标键。
##
## ⚠️ 用 physical_keycode 而不是 keycode: 后者跟**键盘布局**走,
##    在非 QWERTY 布局上会显示成另一个字母, 而实际按下去的物理位置才是 WASD。
func _keys_of(action: String) -> String:
	if not InputMap.has_action(action):
		return "未定义"
	var parts: Array[String] = []
	for ev: InputEvent in InputMap.action_get_events(action):
		if ev is InputEventKey:
			parts.append(_key_label(ev as InputEventKey))
		elif ev is InputEventMouseButton:
			parts.append(_mouse_label((ev as InputEventMouseButton).button_index))
	return "/".join(parts) if not parts.is_empty() else "未绑定"


## 键名换成人看得懂的样子。
## 方向键用箭头字形 (方向键的英文名 Left/Right/Up/Down 混在中文里读起来很割裂),
## 其余交给 OS.get_keycode_string —— 它认所有键, 自己维护一张表必然会漏。
func _key_label(k: InputEventKey) -> String:
	var s: String = OS.get_keycode_string(k.physical_keycode)
	match s:
		"Left": return "←"
		"Right": return "→"
		"Up": return "↑"
		"Down": return "↓"
		"Space": return "空格"
	return s


func _mouse_label(button: int) -> String:
	match button:
		MOUSE_BUTTON_LEFT: return "鼠标左"
		MOUSE_BUTTON_RIGHT: return "鼠标右"
		MOUSE_BUTTON_MIDDLE: return "鼠标中"
	return "鼠标%d" % button


## 实时按下状态 —— **只印按着的那些**, 一个都没按就写「(无)」。
##
## 🎮 和上面那张静态表是**两个问题**, 都要答:
##   表答「我能按什么」, 这一行答「我刚按的那下引擎收到了吗」。
##   后者能立刻排除掉「action 名字拼错 / 映射没通 / UI 把按键吃了」这一整类
##   「按了完全没反应」的 bug —— 而这类 bug 光看游戏画面是零信息。
##
## ⚠️ 第一版把九个 action 全列出来、按下的标「按」其余标「·」, 结果是
##    一长串 `move_left=· move_right=· ...block=·` —— 九成时间九项全是「·」,
##    真正有信息的那一刻 (某个键亮起来) 恰恰淹没在最长的噪声里。
##    「按键名字有没有拼错」这一项已经由上面的表覆盖了 (拼错会显示「未定义」),
##    所以这里可以只管「现在是哪些」。
func _live_input() -> String:
	var out: Array[String] = []
	for n: String in ["move_left", "move_right", "move_up", "move_down",
			"jump", "dash", "attack_light", "attack_heavy", "block"]:
		if InputMap.has_action(n) and Input.is_action_pressed(n):
			out.append(n)
	return " ".join(out) if not out.is_empty() else "(无)"


# ============================================================
# 世界空间绘制
# ============================================================
func _draw() -> void:
	if _floor == null or _player == null or not is_instance_valid(_player):
		return
	var pos: Vector2 = _player.global_position
	var cell: Vector2i = _floor.cell_of(pos)
	var center: Vector2 = to_local(_floor.center_of(cell))

	# ② 纵深泳道 (先画, 免得盖住高亮格)
	_draw_depth_lane(cell)

	# ① 高亮格: 精确套在脚下那一格
	var tl: Vector2 = center + Vector2(-_hw, -_hd)
	var tr: Vector2 = center + Vector2(_hw, -_hd)
	var br: Vector2 = center + Vector2(_hw, _hd)
	var bl: Vector2 = center + Vector2(-_hw, _hd)
	draw_polyline(PackedVector2Array([tl, tr, br, bl, tl]), cell_color, 2.0)
	draw_colored_polygon(PackedVector2Array([tl, tr, br, bl]),
		Color(cell_color.r, cell_color.g, cell_color.b, 0.12))

	# ③ 十字准星: 玩家真实坐标。和高亮格中心重合 = 原点在脚底且在格中心
	draw_line(pos + Vector2(-7, 0), pos + Vector2(7, 0), cross_color, 1.5)
	draw_line(pos + Vector2(0, -7), pos + Vector2(0, 7), cross_color, 1.5)

	# ④ 朝向箭头 —— 横版里它**只可能是水平的**, 因为它只有一个整数在背后。
	#    ⚠️ 箭头的 y 要跟着 height 抬起来: 它标的是「角色面朝哪」, 不跟着身体走
	#       就会出现「人跳到空中、箭头留在地上」的错位。
	var d: Vector2 = _player.facing_vec()
	var body_at: Vector2 = pos + Vector2(0.0, -_player.height)
	draw_line(body_at, body_at + d * 30.0, arrow_color, 2.0)
	# 箭头两侧的翅
	var perp: Vector2 = Vector2(-d.y, d.x)
	var tip: Vector2 = body_at + d * 30.0
	draw_line(tip, tip - d * 7.0 + perp * 4.0, arrow_color, 2.0)
	draw_line(tip, tip - d * 7.0 - perp * 4.0, arrow_color, 2.0)

	# ⑤ 格挡范围 (只在举盾时画 —— 平时画会糊住整个屏幕)
	#    ⚠️ 传**脚底**的 pos 而不是抬起来的 body_at: 它是一条地面平面的规则
	#    (只看 X), 跟着跳跃抬起来只会挡住自己的腿, 而且会和攻击范围对不齐。
	_draw_guard_plane(pos)

	# ⑥ 攻击范围 (贴地画, 用**脚底那个点**而不是抬起来的身体) —— 见下面那条 🏗️
	_draw_attack_shapes(pos)


## 攻击范围可视化 —— **调手感时唯一看得见的依据**。
##
## 🏗️ 为什么它比格挡那条线还重要:
##   「这个距离到底打不打得到」是战斗设计里最高频的问题, 而它**只能靠试**——
##   除非把范围画出来。第一版是靠反复挥刀、看敌人掉不掉血来反推边界,
##   一次只能测一个点, 而且要先把敌人摆到那个点上 (改代码 / 重开)。
##   画出来之后, 站在地砖上就能读出「我这一刀覆盖到哪一行」。
##
## 画三样, 各自回答一个问题:
##   ① 横劈预览 (常亮最淡) —— 「按 J 能打到哪」, 走位时就该看到
##   ② 蓄力中的重击形状 —— 「我松开会发生什么」, 蓄力时给一次确认
##   ③ 正在生效的形状 (最亮) —— 「这一下**真的**判到哪」, 和判定框读同一个对象
##
## ⚠️ 用**脚底**的 pos, 不是上半身那个 body_at —— 攻击范围活在地面平面上,
##    跟着跳跃一起抬起来的话, 面板会在你跳起来时谎报范围。
func _draw_attack_shapes(at: Vector2) -> void:
	if not is_instance_valid(_player):
		return
	var f: int = _player.facing

	# ① 横劈 (轻击) 预览
	_player.light_shape().draw_telegraph(
		self, at, f,
		Color(attack_color.r, attack_color.g, attack_color.b, 0.10),
		Color(attack_color.r, attack_color.g, attack_color.b, 0.45))

	# ② 蓄力中 —— 画出**将要**挥出去的重击范围
	if _player.is_charging():
		_player.heavy_shape().draw_telegraph(
			self, at, f, Color(1.0, 0.7, 0.25, 0.12), Color(1.0, 0.75, 0.3, 0.5))

	# ③ 真正生效的那个形状
	var live: AttackShape = _player.active_shape()
	if live != null:
		live.draw_telegraph(
			self, at, f, Color(1.0, 1.0, 1.0, 0.16), Color(0.55, 1.0, 0.7, 0.9))


## 纵深泳道 —— 整行横贯全图的淡带。
##
## 🏗️ 这是横版**特有**的验收标记, 等距时代没有对应物:
##   画面上下就是纵深, 但人眼分不清「我在第 3 行还是第 4 行」。
##   把玩家所在的那一整行铺一条带子, 纵深位置就从「猜」变成「看」——
##   而这正是切换视角要解决的原始痛点 (跟野怪对不上位置)。
func _draw_depth_lane(cell: Vector2i) -> void:
	var b: Rect2 = _floor.bounds_global()
	if b.size == Vector2.ZERO:
		return
	var cy: float = _floor.center_of(Vector2i(0, cell.y)).y
	# 泳道横跨整张图, 所以直接拿地面的世界范围当 X 两端
	var a: Vector2 = to_local(Vector2(b.position.x, cy - _hd))
	var c: Vector2 = to_local(Vector2(b.end.x, cy + _hd))
	var edge: Color = Color(lane_color.r, lane_color.g, lane_color.b, 0.30)
	draw_colored_polygon(
		PackedVector2Array([a, Vector2(c.x, a.y), c, Vector2(a.x, c.y)]),
		Color(lane_color.r, lane_color.g, lane_color.b, 0.055))
	# 两条边线画出来 —— 带子本身太淡, 没有边就不知道边界在哪
	draw_line(a, Vector2(c.x, a.y), edge, 1.0)
	draw_line(Vector2(a.x, c.y), c, edge, 1.0)


## 格挡范围 —— **本面板存在的最大理由**。
##
## 🏗️ 横版里判定的实质是「前后半平面」(见 player._is_in_guard_front):
##    只看 X 方向的差, **纵深 (Y) 完全不参与**。
##    所以可视化也从「扇形」变成「一条竖线 + 一侧淡带」—— 而且这一版更有说服力:
##    竖线就是判定边界本身, 它沿纵深方向无限长, 玩家一眼就能看出
##    「站在我上边还是下边都无所谓, 站在我左边就是挡不住」。
##
## ⚠️ 仍然遵守那条不变量: **画出来的边界必须和实际判定用同一个数**。
##    这里的方向直接读 player.facing, 绝不自己另算一份 —— 否则就会出现
##    「面板说挡住了、实际判定说没挡住」, 一个只会在调试时把自己绕进去的假象。
##    (v0.3 的扇形版本是同一条纪律, 只是当时的「那个数」是连续的 facing_dir。)
func _draw_guard_plane(at: Vector2) -> void:
	if not _player.is_guard_up():
		return

	var f: float = float(_player.facing)
	var c: Color = parry_color if _player.is_parry_window_open() else cone_color
	# 纵深方向要铺出去多远。140px ≈ 两个多格子, 够表达「上下都算正面」,
	# 又不至于把半个屏幕都染上色。
	var band: float = 140.0

	# ① 前侧半平面的淡带 —— 「这一侧的攻击都挡得住」
	draw_colored_polygon(PackedVector2Array([
		at,
		at + Vector2(f * band, -band),
		at + Vector2(f * band, band),
	]), Color(c.r, c.g, c.b, 0.10))

	# ② 边界竖线 —— **这一条就是判定线**, 比装饰画得粗、画得亮
	draw_line(at + Vector2(0.0, -band), at + Vector2(0.0, band),
		Color(c.r, c.g, c.b, 0.8), 2.0)
	# ③ 身前朝向短线: 标出「正面」在哪边
	draw_line(at, at + Vector2(f * 34.0, 0.0), c, 2.5)
