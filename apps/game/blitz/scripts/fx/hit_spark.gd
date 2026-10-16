extends Node2D
class_name HitSpark
## 命中火花 — 从 attack_hitbox.gd 的内联运行时脚本提取为正式 class_name
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics   — _draw() 每帧重绘 + queue_redraw 的驱动方式
##   godot-1-12-static-typing  — static func: 不需要实例就能调用的工厂方法
##   godot-1-6-classes-objects — 类内常量 / 参数默认值
##
## 🎮 为什么从 GDScript.new() 改成 class_name:
##   原版在 attack_hitbox.gd 里用 `GDScript.new() + source_code` 运行时编译 —
##   那是为了「只在这个关卡用」而省一个文件。代价是:
##     ① 编辑器不给补全、不给报错, 写错了只能等运行时;
##     ② 每次命中都重新编译一遍源码 (编译器不缓存 source_code 字符串);
##     ③ 特效的寿命/半径散落在字符串里, 想调数值得先找到那个字符串。
##   现在有了 class_name, 「省一个文件」的理由就不存在了。
##
## 🏗️ 为什么用 static 工厂而不是让调用方自己 new + add_child + 起定时器:
##   调用方 (attack_hitbox / 将来的技能) 只需要表达「这儿炸一下」.
##   把「挂到哪个节点下」「几秒后自毁」收进工厂, 调用方就是一行,
##   也保证了所有特效的父节点约定一致 (见下).
##
## 🏗️ 父节点约定: 优先挂到 "fx_layer" 组里的节点 (由 main.gd 提供的 FX 层),
##   找不到才退回 current_scene. 这样特效集中在一层, 且 z_index 统一管理,
##   不会因为挂到 y-sort 的 World 下而被角色挡住。


## 默认色 — 金色, 对应「刀光火星」
const DEFAULT_COLOR: Color = Color(1.0, 0.85, 0.1)

## 火花颗粒数
const SPARK_COUNT: int = 8

@export var duration: float = 0.3        ## 存活时长 (秒)
@export var radius: float = 22.0         ## 扩散最大半径 (px)
@export var color: Color = DEFAULT_COLOR
@export var spin: float = 2.0            ## 旋转速度 (弧度/秒), 让每次命中不重样

var _t: float = 0.0


## 在 at 处炸一发火花。parent 一般传 get_tree() —— 工厂自己找 FX 层。
static func spawn(tree: SceneTree, at: Vector2, p_color: Color = DEFAULT_COLOR, p_radius: float = 22.0) -> HitSpark:
	if tree == null:
		return null
	var host: Node = tree.get_first_node_in_group("fx_layer")
	if host == null:
		host = tree.current_scene
	if host == null:
		return null

	var fx: HitSpark = HitSpark.new()
	fx.position = at
	fx.color = p_color
	fx.radius = p_radius
	# z_index > 0: 特效永远盖在世界之上, 不进 y-sort 的排序 (它本来就该「浮」在上面)
	fx.z_index = 20
	host.add_child(fx)
	return fx


func _ready() -> void:
	# 自毁交给 SceneTreeTimer, 而不是在 _process 里 queue_free():
	# 定时器挂在场景树上, 即使本节点被 set_process(false) 也照样到点回收。
	var t: SceneTreeTimer = get_tree().create_timer(duration)
	t.timeout.connect(queue_free)


func _process(delta: float) -> void:
	_t += delta
	queue_redraw()


func _draw() -> void:
	# r: 0 → 1 的生命进度, 所有插值都用它当参数
	var r: float = clampf(_t / maxf(0.001, duration), 0.0, 1.0)
	# 二次缓出: 一开始窜得快, 后半段收住 —— 比线性更像「炸开」
	var ease_r: float = 1.0 - (1.0 - r) * (1.0 - r)

	# ① 放射状火星
	for i: int in range(SPARK_COUNT):
		var angle: float = float(i) / float(SPARK_COUNT) * TAU + _t * spin
		var dist: float = ease_r * radius
		var pos: Vector2 = Vector2(cos(angle), sin(angle)) * dist
		draw_circle(pos, lerpf(4.0, 1.0, r), Color(color.r, color.g, color.b, 1.0 - r))

	# ② 中心闪光: 快速收缩的暖色核
	draw_circle(Vector2.ZERO, lerpf(6.0, 0.0, r), Color(1.0, 0.6, 0.1, (0.5 - r * 0.5) * 0.9))
