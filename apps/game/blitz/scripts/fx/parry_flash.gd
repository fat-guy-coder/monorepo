extends Node2D
class_name ParryFlash
## 格挡爆闪 — 精准格挡的金色扩散环 / 普通格挡的青色盾击环
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics   — _draw() + queue_redraw 的每帧重绘
##   godot-1-12-static-typing  — static func 工厂方法
##   godot-1-6-classes-objects — 类内常量 / 默认参数
##   godot-1-8-signals-basics  — 用 SceneTreeTimer 定时自毁
##
## 🎮 为什么需要**独立的**一个特效类, 而不是复用 HitSpark:
##
##   HitSpark 是**放射状火星** —— 它的语义是「有东西被切开了」。
##   格挡的语义完全不同: 「有个东西撞在盾上, 被弹开了, 而且我毫发无伤」。
##   火星表达不了「弹开」, 只会让玩家以为自己挨了这一下。
##
##   形状上也不一样: 火星从中心向外**散**(有旋转), 格挡环从中心向外**扩**(无旋转)。
##   「扩散的同心环」是这一类反馈的通用视觉语言 (弹反、护盾、能量爆发都用它),
##   玩家不需要学就看得懂。
##
## 🏗️ 一个类伺候两种事件 (精准格挡 / 普通格挡), 靠 color 分流:
##   金色 PARRY_COLOR  — 精准格挡。**必须和普通格挡明显不同**, 否则玩家分不清
##                       「我按对了」和「我按早了」, 而这两者的后续操作完全相反
##                       (精准 → 冲上去反打; 普通 → 精力掉了, 该撤)。
##   青色 BLOCK_COLOR  — 普通格挡。
##   两套颜色和 player.gd 的护盾弧配色 (PARRY_READY_COLOR / SHIELD_COLOR) 是同一组值 ——
##   保持同步, 否则玩家学到的「黄色=精准」到了挨打那一刻就对不上了。
##
## 🏗️ 父节点约定: 走 "fx_layer" 组 (main.gd 提供的 FX 层), 同 HitSpark。
##    ⚠️ 这一条是必须的: 如果挂在玩家身上, 玩家一被击退 (普通格挡会吃一点),
##       特效会跟着滑走 —— 而格挡发生的位置是**世界的一部分**, 不该跟着角色跑。

const PARRY_COLOR: Color = Color(1.0, 0.92, 0.45)   ## 精准格挡 (金)
const BLOCK_COLOR: Color = Color(0.5, 0.95, 1.0)    ## 普通格挡 (青)

## 扩散环的圈数
const RING_COUNT: int = 3

@export var duration: float = 0.34
@export var radius: float = 44.0
@export var color: Color = PARRY_COLOR
## 是否画「盾碎线」—— 从中心向外射出的短直线, 强化「被弹开」的冲击方向感。
## 精准格挡开, 普通格挡也开 (它俩都是一次撞击), 留着当参数是为了以后别的用途。
@export var spark_lines: int = 8

var _t: float = 0.0


## 在 at 处炸一发格挡环。
## is_parry 决定颜色 —— 让调用方只表达「这是精准格挡吗」, 不自己挑颜色,
## 免得以后改配色时漏掉某一处 (两处硬编码颜色 = 迟早对不上)。
static func spawn(tree: SceneTree, at: Vector2, is_parry: bool) -> ParryFlash:
	if tree == null:
		return null
	var host: Node = tree.get_first_node_in_group("fx_layer")
	if host == null:
		host = tree.current_scene
	if host == null:
		return null

	var fx: ParryFlash = ParryFlash.new()
	fx.position = at
	fx.color = PARRY_COLOR if is_parry else BLOCK_COLOR
	fx.radius = 52.0 if is_parry else 36.0
	fx.duration = 0.34 if is_parry else 0.22
	# z_index > 0: 特效永远盖在世界之上, 不进 y-sort (同 HitSpark)
	fx.z_index = 21
	host.add_child(fx)
	return fx


func _ready() -> void:
	var t: SceneTreeTimer = get_tree().create_timer(duration)
	t.timeout.connect(queue_free)


func _process(delta: float) -> void:
	_t += delta
	queue_redraw()


func _draw() -> void:
	var r: float = clampf(_t / maxf(0.001, duration), 0.0, 1.0)
	# 三次缓出: 比二次更「猛地弹开, 然后停住」——格挡要的就是这股顿挫
	var ease_r: float = 1.0 - pow(1.0 - r, 3.0)

	# ① 同心扩散环 (错开相位, 看起来像一波波推出去)
	for i: int in range(RING_COUNT):
		var phase: float = float(i) / float(RING_COUNT)
		var rr: float = clampf(ease_r * 1.2 - phase * 0.35, 0.0, 1.0)
		if rr <= 0.0:
			continue
		var alpha: float = (1.0 - rr) * (1.0 - r) * 0.9
		if alpha <= 0.01:
			continue
		draw_arc(Vector2.ZERO, rr * radius, 0.0, TAU, 32,
			Color(color.r, color.g, color.b, alpha), lerpf(3.4, 1.0, rr))

	# ② 盾碎线: 从中心朝外射的短直线, 快速拉长后淡出
	if spark_lines > 0:
		for i: int in range(spark_lines):
			var a: float = float(i) / float(spark_lines) * TAU + PI * 0.25
			var dir: Vector2 = Vector2(cos(a), sin(a))
			var inner: float = lerpf(6.0, radius * 0.42, ease_r)
			var outer: float = lerpf(10.0, radius * 0.95, ease_r)
			draw_line(dir * inner, dir * outer,
				Color(1.0, 1.0, 1.0, (1.0 - r) * 0.65), lerpf(2.6, 0.8, r))

	# ③ 中心核: 一瞬间的白光, 很快收掉 —— 撞击点必须是最亮的地方
	var core: float = maxf(0.0, 1.0 - r * 3.2)
	if core > 0.0:
		draw_circle(Vector2.ZERO, lerpf(14.0, 2.0, r * 3.0), Color(1.0, 1.0, 1.0, core * 0.85))
