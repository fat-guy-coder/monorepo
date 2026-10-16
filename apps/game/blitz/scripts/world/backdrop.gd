extends Node2D
class_name Backdrop
## 远景背景 — 程序化星空 (取代旧 main.gd 里的 _starfield_script 内联脚本)
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() 绘制: draw_circle
##   godot-7-6-rng-noise      — RandomNumberGenerator: 可控种子的随机星点
##   godot-2-10-parallax2d    — 视差滚动的思路 (当前是静态版; 加视差见下)
##
## 🎮 设计: 星星固定不随相机移动 (因为它是**相机空间**的装饰), 所以本节点
##   挂在场景根下、**不放进 y-sort 的 World**, 并用 z_index = -20 压到最底。
##
## 📌 后续: 想加视差时, 在 _process 里按 (camera.global_position * 系数) 反推
##   本节点的 position 即可 —— 系数越小越「远」, 0.1~0.3 是常用区间。

## 星星数量
@export var star_count: int = 140
## 星星分布范围 (世界坐标矩形)
@export var area: Rect2 = Rect2(-1200.0, -800.0, 3200.0, 2600.0)
## 随机种子 —— 固定值保证每次启动星空一致, 便于对比截图
@export var rng_seed: int = 20260924

## 预生成的点: { pos: Vector2, radius: float, alpha: float }
var _stars: Array[Dictionary] = []


func _ready() -> void:
	_generate()
	z_index = -20


func _generate() -> void:
	var rng: RandomNumberGenerator = RandomNumberGenerator.new()
	rng.seed = rng_seed
	_stars.clear()
	for i: int in range(star_count):
		_stars.append({
			pos = Vector2(
				rng.randf_range(area.position.x, area.position.x + area.size.x),
				rng.randf_range(area.position.y, area.position.y + area.size.y)
			),
			# 半径分布偏小: randf()² 让大星星稀有, 比均匀分布自然
			radius = 0.8 + rng.randf() * rng.randf() * 2.2,
			alpha = 0.25 + rng.randf() * 0.55,
		})
	queue_redraw()


func _draw() -> void:
	for star: Dictionary in _stars:
		var pos: Vector2 = star.pos
		var r: float = star.radius
		var a: float = star.alpha
		# 外圈淡光晕 + 内芯, 两笔就有「发光」的观感
		draw_circle(pos, r * 2.2, Color(0.75, 0.85, 1.0, a * 0.18))
		draw_circle(pos, r, Color(0.92, 0.96, 1.0, a))
