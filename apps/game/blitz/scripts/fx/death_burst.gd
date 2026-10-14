extends Node2D
class_name DeathBurst
## 敌人死亡爆散 — 从 enemy.gd 的内联运行时脚本提取为正式 class_name
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() 绘制 + 每帧 queue_redraw
##   godot-7-6-rng-noise      — RandomNumberGenerator: 每片碎屑的速度/大小随机
##   godot-1-12-static-typing — static 工厂方法
##
## 🎮 原版的两个问题 (这次一并修掉):
##   ① 它只有一个 _draw() 没有 _process(), 所以是**静止**的一张图 ——
##      「爆散」看起来像一坨贴纸, 没有动感。
##   ② 位置在 _draw 里用 randf_range() 现算 —— 因为 _draw 只跑一次所以碰巧没暴露,
##      但一旦引擎因窗口缩放/裁剪重绘, 碎屑会**整个重新随机**, 看起来像抽搐。
##   现在改为: 生命开始时一次性生成带速度的碎屑 (固定随机), 之后只做积分 + 淡出。


const FRAGMENT_COUNT: int = 10

@export var duration: float = 0.5
## 碎屑初速度区间 (px/s)
@export var speed_min: float = 60.0
@export var speed_max: float = 190.0
## 阻尼: 每秒衰减到原来的多少倍 (越小越「黏」)
@export var damping: float = 0.06
@export var core_color: Color = Color(1.0, 0.55, 0.1)    ## 外圈 (橙)
@export var inner_color: Color = Color(1.0, 0.9, 0.3)    ## 内芯 (黄)

## 预生成的碎屑: { pos, vel, radius }
var _frags: Array[Dictionary] = []
var _t: float = 0.0


static func spawn(tree: SceneTree, at: Vector2, p_core: Color = Color(1.0, 0.55, 0.1)) -> DeathBurst:
	if tree == null:
		return null
	var host: Node = tree.get_first_node_in_group("fx_layer")
	if host == null:
		host = tree.current_scene
	if host == null:
		return null

	var fx: DeathBurst = DeathBurst.new()
	fx.position = at
	fx.core_color = p_core
	fx.z_index = 20
	host.add_child(fx)
	return fx


func _ready() -> void:
	_build_fragments()
	var t: SceneTreeTimer = get_tree().create_timer(duration)
	t.timeout.connect(queue_free)


func _build_fragments() -> void:
	_frags.clear()
	for i: int in range(FRAGMENT_COUNT):
		# 均匀撒一圈角度, 再加一点抖动 —— 纯随机会出现「挤成一堆」的空洞
		var angle: float = float(i) / float(FRAGMENT_COUNT) * TAU
		angle += randf_range(-0.25, 0.25)
		var speed: float = randf_range(speed_min, speed_max)
		_frags.append({
			vel = Vector2(cos(angle), sin(angle)) * speed,
			# 等距视角下把纵向速度压一点, 碎屑才像「落在地上」而不是飘在空中
			pos = Vector2.ZERO,
			radius = randf_range(2.0, 5.0),
		})


func _process(delta: float) -> void:
	_t += delta
	for f: Dictionary in _frags:
		f.pos += f.vel * delta
		f.vel *= pow(damping, delta)   # 与帧率无关的指数阻尼
		# 等距压缩: 纵向位移按 2:1 投影, 视觉上更贴地
		f.pos = Vector2(f.pos.x, f.pos.y * Iso.TILE_H_F / Iso.TILE_W_F)
	queue_redraw()


func _draw() -> void:
	var r: float = clampf(_t / maxf(0.001, duration), 0.0, 1.0)
	var alpha: float = 1.0 - r
	for f: Dictionary in _frags:
		draw_circle(f.pos, f.radius, Color(core_color.r, core_color.g, core_color.b, alpha))
		draw_circle(f.pos * 0.5, f.radius * 0.55, Color(inner_color.r, inner_color.g, inner_color.b, alpha))
