extends Node2D
## 可视化矩形 — _draw() + @export 实战
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics — _draw() 虚函数绘制自定义图形
##   godot-3-12-ninepatchrect — 对比: 这个是自己画的,不是 NinePatchRect 控件
##
## 用途: 平台/地面的视觉外观 (碰撞由父节点 StaticBody2D 处理)
## 为什么不用 Sprite2D? 不需要贴图素材就能做,纯代码绘制
##
## @export 让属性在 Godot 编辑器的 Inspector 面板中可调

@export var rect_color: Color = Color(0.4, 0.3, 0.2, 1.0)       ## 填充色
@export var rect_size: Vector2 = Vector2(200, 20)                 ## 矩形大小
@export var border_color: Color = Color(0.5, 0.4, 0.25, 1.0)     ## 边框色
@export var border_width: float = 2.0                             ## 边框宽度

func _draw() -> void:
	# Rect2 — Godot 的矩形类型: Rect2(左上角坐标, 大小)
	# 这里以节点原点为中心 (-size/2 到 +size/2)
	var r: Rect2 = Rect2(-rect_size / 2.0, rect_size)

	# draw_rect(矩形, 颜色, 是否填充=true, 边框宽度=1.0)
	draw_rect(r, rect_color)                         # 填充矩形

	# 如果有边框,再画一层线框 (filled=false 只画边框)
	if border_width > 0:
		draw_rect(r, border_color, false, border_width)
