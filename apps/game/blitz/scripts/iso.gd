extends RefCounted
class_name Iso
## 等距 3/4 视角的数学工具 — 常量 + 八向方向 + 视觉投影
##
## 📚 涉及学习文档 (按阅读顺序):
##   godot-2-8-tilemap        — 等距投影公式 sx=(x-y)*W/2, sy=(x+y)*H/2 + Y-sort 深度排序
##   godot-1-14-builtin-math-types — Vector2 / angle() / TAU / round() / Vector2i
##   godot-1-11-static-typing — 静态类型 + static 函数 (不需要实例化工具类)
##   godot-1-9-enums-constants — const 常量的用法与作用域
##
## 🎮 用途:
##   - 全项目唯一一份等距常量 (TILE_W/TILE_H/TILE_SIZE), 其他文件**不准**重复定义
##   - dir8() 八向吸附 —— 供战斗方向生成判定框 (v0.3)
##   - ground() 地面平面压扁 —— ⚠️ 仅视觉, 见下方警告
##
## 🏗️ 坐标系约定 (读之前先看这条, 否则一定写错):
##   本游戏是「**普通 XY 物理 + 菱形贴图**」, 不存在第二套投影坐标系。
##   节点的 position 就是屏幕坐标, 物理运动/碰撞/判定框全在**未投影**的 XY 平面里算。
##
##   投影只允许出现在两处:
##     ① 菱形贴图本身 (iso_floor.gd 程序化生成)
##     ② _draw() 里的 ground() 视觉压扁 (纯美术效果)
##
##   ❌ 禁止把 ground() 用在 position / velocity / 判定框偏移 / 碰撞体尺寸上 —
##      那样上下的攻击距离会只剩左右的一半。


# ============================================================
# 等距常量
# ============================================================

## 单块地砖的宽 (菱形对角线横长)
const TILE_W: int = 64
## 单块地砖的高 (菱形对角线竖长) — 与 TILE_W 成 2:1, 这是等距 3/4 视角的标准比例
const TILE_H: int = 32
## 地砖尺寸的 Vector2i 组合形式 (TileSet 的 tile_size / texture_region_size 都要它)
const TILE_SIZE: Vector2i = Vector2i(TILE_W, TILE_H)

## 地砖宽的浮点形式, 省得到处写 float(TILE_W)
const TILE_W_F: float = 64.0
## 地砖高的浮点形式
const TILE_H_F: float = 32.0

## 一个完整的圆周角, 用于八向吸附 (TAU / 8 = 每 45° 一份)
const DIR8_STEP: float = TAU / 8.0


# ============================================================
# 八向方向
# ============================================================

## 把任意方向吸附到最近的八向之一, 返回单位向量。
##
## 用 angle() 取整而不是查表: cos(45°) == sin(45°) == 1/√2 是精确的浮点值,
## 所以返回的对角线**本身就是单位向量**, 不需要也不该再 normalized()。
## 查表法会多一份需要手工维护、且可能与常量漂移的数据。
static func dir8(v: Vector2) -> Vector2:
	if v == Vector2.ZERO:
		return Vector2.DOWN
	var a: float = round(v.angle() / DIR8_STEP) * DIR8_STEP
	return Vector2(cos(a), sin(a))


## 方向的八向索引, 0..7。
##
## 索引顺序 (屏幕坐标, y 轴向下, 顺时针):
##   0=右  1=右下  2=下  3=左下  4=左  5=左上  6=上  7=右上
## 供未来动画命名用 (如 "walk_%d" % Iso.dir8_index(dir))。
static func dir8_index(v: Vector2) -> int:
	if v == Vector2.ZERO:
		return 2  # Vector2.DOWN 的索引
	var i: int = int(round(v.angle() / DIR8_STEP))
	return (i + 8) % 8


# ============================================================
# 视觉投影 (⚠️ 只准用在 _draw() 里)
# ============================================================

## 把地面平面上的方向压扁, 得到 3/4 视角的观感 (y 分量减半)。
##
## ⚠️⚠️ 这个函数是**纯美术**的, 唯一的合法用途是在 _draw() 里画朝向箭头/攻击弧线。
##      绝对不要用在 position / velocity / 判定框偏移 / 碰撞体尺寸上 —
##      物理世界是未投影的 XY 平面 (见文件头的坐标系约定)。
##
## 例: 朝上 (0,-1) 压扁后是 (0,-0.5), 在等距视角里才是「朝屏幕里侧走」的观感。
static func ground(v: Vector2) -> Vector2:
	return Vector2(v.x, v.y * TILE_H_F / TILE_W_F)


# ============================================================
# 地格 → 世界坐标 (纯数学版)
# ============================================================

## !!! 这是**独立实现的**地格→世界换算, 只用来和 IsoFloor 的引擎换算互相对照 !!!
##
## 真正的坐标桥是 IsoFloor.cell_of() / center_of() (它走引擎的 map_to_local/local_to_map,
## 与渲染出来的菱形天然一致)。本函数存在的唯一目的是给 debug_overlay 一个**独立的**
## 参照物: 如果两者算出来不一致, 说明贴图几何和 TileSet 的 layout 配置漂移了。
##
## ⚠️ 这里的轴约定是**实测**出来的, 不是推导的。TileSet.TILE_LAYOUT_DIAMOND_RIGHT 下
##    Godot 的实际映射 (见 IsoFloor.debug_print_orientation() 的输出) 是:
##      local = (TILE_W/2, TILE_H/2) + cell.x * (TILE_W/2, -TILE_H/2)
##                                   + cell.y * (TILE_W/2,  TILE_H/2)
##    即 **+x 往屏幕右上走, +y 往屏幕右下走**。
##    这与「教科书上的等距公式 sx=(x-y)*W/2」是同一个菱形、不同的索引方向 ——
##    别照抄教科书公式, 否则网格索引会整体转 45°。
##
## 返回的是**菱形中心**的坐标 (不含 IsoFloor 节点自身的 position 偏移)。
## map_to_local 返回的是瓦片包围盒中心, 而菱形的中心恰是包围盒中心, 两者等价。
static func cell_to_world(cell: Vector2i) -> Vector2:
	return cell_to_world_f(float(cell.x), float(cell.y))


## 同上, 但接受**小数**格坐标 —— 用来求「一片多格区域的中心」。
##
## 🏗️ 为什么需要它: 一块占 2×1 格的地砖区域, 它的重心**不在任何一格的格心上**,
##   而在起点格心偏移半格的位置。用整数格里求中心 (center_of) 会让多格方块整体偏半格,
##   而偏半格在等距视角里看起来「差不多对」—— 是最容易被放过去的那种错。
##   等距映射是**线性**的, 所以对小数格坐标直接套同一个公式就是正确答案, 无需插值。
static func cell_to_world_f(ci: float, cj: float) -> Vector2:
	var s: float = ci + cj    # 沿 (TILE_W/2, TILE_H/2) 方向, 即屏幕右下
	var d: float = cj - ci    # 沿 (TILE_W/2, -TILE_H/2) 方向, 即屏幕右上
	return Vector2(
		TILE_W_F * 0.5 + s * TILE_W_F * 0.5,
		TILE_H_F * 0.5 + d * TILE_H_F * 0.5
	)


## 上式的逆运算: 世界坐标 → 地格 (纯数学版, 同样只用于对照)。
static func world_to_cell(world: Vector2) -> Vector2i:
	var s: float = world.x / (TILE_W_F * 0.5) - 1.0   # = cell.x + cell.y
	var d: float = world.y / (TILE_H_F * 0.5) - 1.0   # = cell.y - cell.x
	return Vector2i(
		int(round((s - d) * 0.5)),
		int(round((s + d) * 0.5))
	)
