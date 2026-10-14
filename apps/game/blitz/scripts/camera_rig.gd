extends Camera2D
class_name CameraRig
## 等距视角相机 — 跟随玩家 + 按地面范围限制 + 震屏接口
##
## 📚 涉及学习文档:
##   godot-2-9-camera2d       — Camera2D: position_smoothing / limit_* 边界限制
##   godot-5-8-tween          — 位移插值思路 (本项目震屏用 trauma 衰减而非 Tween)
##   godot-7-6-rng-noise      — RandomNumberGenerator: 每帧随机偏移做抖动
##   godot-1-14-builtin-math-types — clampf / lerp / 二次衰减
##
## 🎮 设计:
##   本节点是玩家的**子节点**, 所以「跟随」是自动的 —— 不需要在 _process 里手写
##   position = player.position, 那样反而会和平滑插值打架。
##   子节点只负责「怎么跟」(平滑) 和「跟到哪为止」(limits)。
##
## 🏗️ 相机边界必须**从地面推导**, 不能写死常量:
##   旧横版关卡的 limit_left=-50 / limit_right=3250 是给 3200px 宽的横版关卡用的,
##   套在几百像素的等距地图上会让相机大段飘到空地外面。
##   正确做法是拿 IsoFloor.bounds_global() 算 —— 见 fit_to_floor()。
##
## 🏗️ 震屏为什么不用 Tween:
##   打击感需要「高频无规律抖动」, Tween 是两点之间的平滑插值, 做出来是「晃」不是「震」。
##   用 trauma(创伤值) 模型: shake() 累加创伤 → 每帧随机偏移 → 按二次曲线衰减,
##   幅度大时抖得猛, 快结束时自然收住, 是业界标准做法 (Squirrel Eiserloh 的 GDC 分享)。


## 震屏幅度上限 (px)。shake() 传入的幅度会按这个值归一化成 trauma。
const SHAKE_MAX_OFFSET: float = 10.0

var _rng: RandomNumberGenerator = RandomNumberGenerator.new()

# ── 震屏状态 ──
var _shake_trauma: float = 0.0    ## 0~1, 当前创伤值
var _shake_time: float = 0.0      ## 剩余震动时间
var _shake_total: float = 0.0     ## 本次震动的总时长 (用于算衰减比例)


func _ready() -> void:
	# 平滑跟随 —— 让相机略微滞后于玩家, 走位才有「重量感」
	position_smoothing_enabled = true
	position_smoothing_speed = 10.0
	_rng.randomize()


func _process(delta: float) -> void:
	if _shake_time <= 0.0:
		if offset != Vector2.ZERO:
			offset = Vector2.ZERO
		return

	_shake_time -= delta
	# 二次衰减: 幅度随剩余时间平方下降, 收尾自然不突兀
	var k: float = maxf(0.0, _shake_time / maxf(0.001, _shake_total))
	var mag: float = _shake_trauma * SHAKE_MAX_OFFSET * k * k
	offset = Vector2(_rng.randf_range(-1.0, 1.0), _rng.randf_range(-1.0, 1.0)) * mag


# ============================================================
# 对外接口
# ============================================================

## 触发震屏。amount_px 大致就是「最大偏移多少像素」(轻击 2~3, 重击 6~8)。
func shake(amount_px: float = 4.0, duration: float = 0.2) -> void:
	_shake_trauma = clampf(amount_px / SHAKE_MAX_OFFSET, 0.0, 1.0)
	_shake_time = duration
	_shake_total = duration


## 按地面范围设置相机边界, 让镜头永远不会拍到地面之外的虚空。
##
## 两种情况的处理:
##   ① 地图比视口大 → limits 就是地图边界 (常规情况)
##   ② 地图比视口小 → limits 会互相矛盾 (left > right) 导致相机卡在奇怪位置,
##      此时改为把相机**锁死在地图中心**, 左右/上下 limit 各留半个视口。
func fit_to_floor(floor: IsoFloor, viewport_size: Vector2) -> void:
	if floor == null:
		return
	var b: Rect2 = floor.bounds_global()
	if b.size == Vector2.ZERO:
		return
	_fit_axis(true, b.position.x, b.size.x, viewport_size.x)
	_fit_axis(false, b.position.y, b.size.y, viewport_size.y)


func _fit_axis(horizontal: bool, start: float, length: float, view_size: float) -> void:
	var half: float = view_size * 0.5
	if length <= view_size:
		# 地图比视口小: 锁死中心
		var center: float = start + length * 0.5
		_set_limits(horizontal, center - half, center + half)
	else:
		_set_limits(horizontal, start, start + length)


func _set_limits(horizontal: bool, lo: float, hi: float) -> void:
	if horizontal:
		limit_left = int(round(lo))
		limit_right = int(round(hi))
	else:
		limit_top = int(round(lo))
		limit_bottom = int(round(hi))
