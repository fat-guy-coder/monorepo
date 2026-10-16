extends TileMapLayer
class_name BeltFloor
## 横版 (2.5D) 地面 — 运行时程序化生成方形 TileSet, 0 美术素材
##
## 📚 涉及学习文档:
##   godot-2-8-tilemap          — TileMapLayer + 运行时生成 TileSet
##   godot-4-6-resource-system  — 运行时 new() 构造 Resource (TileSet / TileSetAtlasSource)
##   godot-2-3-node2d-basics    — Image → ImageTexture → 贴图数据流
##
## 🏗️ 坐标系约定 (读之前先看这条, 否则一定写错):
##   地面平面是 **X(左右) × Z(纵深)**, 引擎里存成
##   `global_position = Vector2(x, -z × DEPTH_SCALE)` (换算全在 belt_space.gd)。
##   于是「屏幕 Y 往下」= 「Z 变小」= 离镜头更近。这正是横版清关的观感 ——
##   画面**上方**的敌人更远, 画面**下方**的离你更近。
##   纵深被**压扁一半**, 所以屏幕上的 1 格是 64×**32** —— 见下面「为什么是 64×32」。
##
##   本文件的地格 (i, j):
##     i 沿 X 增大 (往右)
##     j 沿**屏幕 Y** 增大 (往下) ⇒ 也就是 Z **变小** ⇒ j 越大越靠近镜头
##   所以 j = 0 那一行是**最远**的一行。
##
## 🏗️ 为什么瓦片是 64×32, 不是 64×64 也不是菱形:
##
##   地格在**世界空间**里是 64×64 的**正方形** —— 玩家在地上走, 一步就是一格,
##   往右和往纵深走的距离是同一个单位。
##
##   屏幕上只有 32 高, 是因为纵深被压扁了 (BeltSpace.DEPTH_SCALE = 0.5)。
##   这一条必须**看得到**: 屏幕上画出来的格子长宽比就是 2:1。
##   如果地砖保持 64×64 而只有圆形的 AoE 被压扁, 玩家会拿方格当尺子去量,
##   然后发现「圈是扁的、格子是方的」—— 两个说法互相矛盾, 谁也不知道该信哪个。
##   让格子跟着一起扁, 屏幕上就只剩一个统一的比例, 这件事才自洽。
##
##   为什么**不是菱形**: 菱形 (2:1) 存在的唯一意义是**模拟 3/4 透视** ——
##   把一块正方形地面画成斜的, 让眼睛以为在看一个有深度的平面。横版不需要模拟:
##   深度是**直接画出来**的, 屏幕上下本来就是纵深。于是 `iso.gd` 那一整套
##   投影数学 (ground/dir8/cell_to_world) **整体消失**, 不是被替换 ——
##   没有投影, 就没有投影公式需要维护和对账。
##
##   ⚠️ 别把这里的 2:1 和等距的 2:1 混为一谈: 等距是**旋转 45° 再压扁**,
##      两根轴都变成了斜线, 所以玩家怎么走都跟网格错开半格 (v0.2 的实测痛点)。
##      这里是**轴对齐再压扁**, 走位和格子永远 1:1 —— 同样的比例, 完全不同的东西。
##
## 🏗️ 深度明暗: 变体不是随机撒的, 而是**按行**决定底色深浅 (远处暗、近处亮)。
##   这不是装饰 —— 横版最容易出的错觉就是「我看不出谁站得更远」。
##   一行一个色调比任何 UI 都直观, 而且 0 成本。
##   hash 只用来撒 ±1 档的抖动, 免得出现完美的渐变条纹 (看着像程序生成的)。
##
## 🏗️ 碰撞层设计: 地面**纯视觉, 不加物理碰撞** (沿用旧等距地面的决定)。
##   横版要挡住玩家的是**四面边界墙**, 跟地砖无关。解耦的真正好处是容错:
##   本文件是这次重构风险最大的一块, 纯视觉意味着它出问题只要 floor.hide()
##   关卡照样可玩可测。


# ============================================================
# 常量
# ============================================================

## 一个地格在**世界空间**里的边长。格子在世界里是**正方形** ——
## 屏幕上看到的 2:1 是被视角压扁出来的, 不是格子本身扁。
const CELL_WORLD: int = 64

## 屏幕上地格的宽 (= 世界宽, X 轴不压扁)。
const CELL_W: int = 64
## 屏幕上地格的纵深 = 世界纵深 × BeltSpace.DEPTH_SCALE。
##
## ⚠️ 这个数**不是**随手定的, 它必须等于 CELL_WORLD × DEPTH_SCALE,
##    否则「世界里的圆 → 屏幕上的椭圆」和「地砖的长宽比」会各说各话:
##    圆心在地砖上滚一圈会走出一个方向和格子对不上的椭圆。
##    debug_print_grid() 里有断言盯着这对常量 (改一个忘另一个会立刻 ❌)。
const CELL_D: int = 32
## 地格尺寸的 Vector2i 组合形式 (TileSet 的 tile_size / texture_region_size 都要它)
const TILE_SIZE: Vector2i = Vector2i(CELL_W, CELL_D)

## 地格宽的浮点形式, 省得到处写 float(CELL_W)
const CELL_W_F: float = 64.0
## 地格纵深的浮点形式
const CELL_D_F: float = 32.0

## 深度明暗分几档。档数越多渐变越细腻, 但图集也越大。
## 6 档覆盖「最远最暗 → 最近最亮」, 实测肉眼已经连续。
const SHADE_STEPS: int = 6

## 图集里有几种地砖外观 (SHADE_STEPS 种明暗 + 1 种苔藓)
const VARIANT_COUNT: int = SHADE_STEPS + 1
## 苔藓变体在图集里的下标 (排在所有明暗档之后)
const MOSS_VARIANT: int = SHADE_STEPS
## 苔藓出现概率 (百分比)
const MOSS_CHANCE: int = 8

## 石地基础色 (偏冷的青灰, 衬 DESIGN.md 的仙侠夜景)
const STONE_BASE: Color = Color(0.17, 0.18, 0.24)
## 苔藓基础色
const MOSS_BASE: Color = Color(0.14, 0.21, 0.16)

## 最远处的地砖亮度倍率
const SHADE_FAR: float = 0.60
## 最近处的地砖亮度倍率
const SHADE_NEAR: float = 1.26


# ============================================================
# 状态
# ============================================================

## 已铺的地格范围, 供 bounds_global() 算相机边界
var _filled: Rect2i = Rect2i()
## 是否已经铺过砖 (fill_rect 的幂等标记)
var _has_cells: bool = false
## 各地砖变体的使用次数, 供自检确认苔藓比例符合预期
var _variant_counts: Dictionary = {}


# ============================================================
# 生命周期
# ============================================================

func _ready() -> void:
	_ensure_tile_set()


# ============================================================
# TileSet 构造 (本文件的核心)
# ============================================================

## 构造方形 TileSet 并挂到自己身上。幂等 —— 重复调用直接返回。
func _ensure_tile_set() -> void:
	if tile_set != null:
		return

	# ── ① TileSet ──
	var ts: TileSet = TileSet.new()
	# ⚠️ tile_shape 必须**先于** tile_size 赋值:
	#    TileSet 在 shape 变化时会重算格尺寸, 反过来写会拿到上一套 shape 算出来的值。
	ts.tile_shape = TileSet.TILE_SHAPE_SQUARE
	ts.tile_size = TILE_SIZE
	# 不设 tile_layout —— 那是**等距专属**属性 (DIAMOND_RIGHT / STACKED),
	# 对正方形网格没有意义, 设了只会让人误以为这里也有投影方向要维护。

	# ── ② 图集贴图: 先建好 Image, 再转成 ImageTexture ──
	var atlas_img: Image = _build_atlas_image()
	var atlas_tex: ImageTexture = ImageTexture.create_from_image(atlas_img)

	# ── ③ AtlasSource: texture_region_size → texture → create_tile ──
	var src: TileSetAtlasSource = TileSetAtlasSource.new()
	src.texture_region_size = TILE_SIZE
	src.use_texture_padding = false
	# ⚠️ 必须先赋 texture 再 create_tile(): create_tile() 内部按 texture_region_size
	#    算出矩形再跟贴图边界校验, texture 为空时边界未定义, 会报 !room_for_tile。
	src.texture = atlas_tex
	# 列数从**图宽推导**, 不要写 VARIANT_COUNT —— 差一格就越界报 !room_for_tile
	var cols: int = atlas_img.get_width() / CELL_W
	for x: int in range(cols):
		src.create_tile(Vector2i(x, 0))
	ts.add_source(src)  # 返回的 source_id 恒为 0 (第一个 source)

	# ── ④ 必须先挂 tile_set, 再 set_cell ──
	#     set_cell 时若 source_id 不在 tile_set 里, 该格会被静默丢弃
	tile_set = ts

	# 图集各项在内存里左右相邻, 方形边缘会被双线性采样到邻居 → 出现竖向细缝。
	# NEAREST 过滤 + 无 mipmap 是唯一干净的解法。
	texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	texture_repeat = CanvasItem.TEXTURE_REPEAT_DISABLED


## 程序化雕出正方形地砖图集 (VARIANT_COUNT 种变体横向排成一行)。
##
## 每块砖画三样东西, 顺序就是代码顺序:
##   ① 底色  —— 按档位算明暗 (远处暗/近处亮)
##   ② 描边  —— 1px 深色四边框, 让玩家看得出自己站在哪个格
##   ③ 斑点  —— 稀疏提亮点, 只求「不是一块纯色」
func _build_atlas_image() -> Image:
	var img_w: int = CELL_W * VARIANT_COUNT
	# 无 mipmap: mipmap 会让相邻图集项互相渗透
	var img: Image = Image.create_empty(img_w, CELL_D, false, Image.FORMAT_RGBA8)
	img.fill(Color(0, 0, 0, 0))

	for v: int in range(VARIANT_COUNT):
		var base: Color = MOSS_BASE if v == MOSS_VARIANT else _shade_color(v)
		var edge: Color = base.darkened(0.42)
		# 斑点只求「不是一块纯色」, 提亮太多太密会变成电视雪花噪点
		var speck: Color = base.lightened(0.14)
		# 固定种子 → 每次跑出来的斑点完全一致, 调试时不会「上一次还好好的」
		var rng: RandomNumberGenerator = RandomNumberGenerator.new()
		rng.seed = 2000 + v

		var x0: int = v * CELL_W

		for row: int in range(CELL_D):
			for x: int in range(CELL_W):
				var from_edge: int = mini(mini(x, CELL_W - 1 - x), mini(row, CELL_D - 1 - row))
				var c: Color
				if from_edge < 1:
					c = edge
				else:
					c = speck if (rng.randf() < 0.03 and from_edge > 5) else base
				img.set_pixel(x0 + x, row, c)

	return img


## 第 v 档深度明暗的颜色。v = 0 是最远 (最暗), v = SHADE_STEPS-1 是最近 (最亮)。
func _shade_color(v: int) -> Color:
	var denom: float = maxf(1.0, float(SHADE_STEPS - 1))
	var t: float = float(v) / denom
	var k: float = lerpf(SHADE_FAR, SHADE_NEAR, t)
	return Color(STONE_BASE.r * k, STONE_BASE.g * k, STONE_BASE.b * k, 1.0)


# ============================================================
# 铺砖
# ============================================================

## 把一个矩形范围的地格全部铺上砖。cell_rect 是以 (0,0) 为起点、尺寸为 (宽, 纵深格数) 的区域。
##
## 由 main.gd 显式调用, **_ready() 里不自动铺** —— 这样 main.gd 铺完就能立刻用
## cell_of() / center_of() 摆障碍物和玩家。
func fill_rect(cell_rect: Rect2i) -> void:
	_ensure_tile_set()
	var rows: int = maxi(1, cell_rect.size.y)
	for i: int in range(cell_rect.position.x, cell_rect.position.x + cell_rect.size.x):
		for j: int in range(cell_rect.position.y, cell_rect.position.y + cell_rect.size.y):
			var cell: Vector2i = Vector2i(i, j)
			var variant: int = _variant_at(cell, j - cell_rect.position.y, rows)
			set_cell(cell, 0, Vector2i(variant, 0))
			_variant_counts[variant] = _variant_counts.get(variant, 0) + 1

	_filled = cell_rect
	_has_cells = true


## 决定某一格用哪号变体。
##
## 🏗️ 明暗由**行**决定而不是随机撒 —— 见文件头的「深度明暗」。
##    j_rel 是这一格在已铺区域里的**相对行号** (0 = 最远那一行)。
func _variant_at(cell: Vector2i, j_rel: int, rows: int) -> int:
	# ⚠️ 必须用 Godot 内建 hash(): 手写 (i*A) ^ (j*B) 这种 XOR 组合低位有结构偏斜,
	#    实测会变成「苔藓成串成块」, 一眼就看得出是程序生成的。
	var h: int = absi(hash(cell))
	if (h % 100) < MOSS_CHANCE:
		return MOSS_VARIANT
	var t: float = float(j_rel) / float(maxi(1, rows - 1))
	var base: int = int(round(t * float(SHADE_STEPS - 1)))
	# ±1 档抖动, 打散完美渐变
	return clampi(base + (h % 3) - 1, 0, SHADE_STEPS - 1)


# ============================================================
# 坐标桥 — 全项目唯一的地格 ↔ 世界换算入口
# ============================================================

## 世界坐标 → 地格。其他地方**不准**自己重新实现换算, 一律走这里。
func cell_of(global_pos: Vector2) -> Vector2i:
	return local_to_map(to_local(global_pos))


## 地格 → 该砖**中心**的世界坐标。
##
## 正方形网格下 map_to_local() 返回的就是格中心 (Godot 文档: "the centered position
## of a cell"), 不像等距那样还与 layout 有关。但**仍然只解释这一处** ——
## 想知道到底对不对, 跑 debug_print_grid()。
func center_of(cell: Vector2i) -> Vector2:
	return to_global(map_to_local(cell))


## 一片矩形地格区域的**重心**的世界坐标。
##
## 🏗️ 与 center_of 的区别: center_of 返回**起点那一格**的中心, 本函数返回整片区域的
##   几何中心。占地 2×1 的方块必须用本函数 —— 用 center_of 会整体偏半格,
##   而偏半格在任何视角下看起来都「差不多对」, 是最容易被放过去的那类错。
##
## 🏗️ 为什么这里可以插值, 而等距版本不行:
##   等距映射虽然也是线性的, 但轴是斜的, 手写公式极易与 TileSet layout 漂移
##   (旧版为此专门留了一个独立的纯数学实现来对账)。
##   正方形网格是**轴对齐的规则格**, 拿相邻两格中心做 lerp 是精确的,
##   而且两个端点都来自引擎本身 —— 不存在「公式跟引擎不一致」的可能。
func center_of_span(origin: Vector2i, cells: Vector2i) -> Vector2:
	var ci: float = float(origin.x) + (float(cells.x) - 1.0) * 0.5
	var cj: float = float(origin.y) + (float(cells.y) - 1.0) * 0.5
	var i0: int = floori(ci)
	var j0: int = floori(cj)
	var p00: Vector2 = map_to_local(Vector2i(i0, j0))
	var p11: Vector2 = map_to_local(Vector2i(i0 + 1, j0 + 1))
	# ⚠️ 两个轴各差一次, 必须**逐轴 lerpf**。
	#    不能写 p00.lerp(p11, Vector2(di, dj)) —— Vector2.lerp() 的第二个参数是
	#    **float** (整段位移共用一个权重), 传 Vector2 会直接解析报错。
	#    也不能写 p00.lerp(p11, di): 那会把 X 的插值比例套到 Y 上。
	#    这里之所以能逐轴拆开, 是因为网格是**轴对齐**的 (见函数上方注释)。
	return to_global(Vector2(
		lerpf(p00.x, p11.x, ci - float(i0)),
		lerpf(p00.y, p11.y, cj - float(j0))))


## 已铺地格覆盖的世界范围, 供 CameraRig 算边界、Backdrop 定尺寸、边界墙定位。
##
## 这是**唯一的几何来源** —— 上面四个调用方全指望它。改了坐标约定别忘了这里。
func bounds_global() -> Rect2:
	if not _has_cells:
		return Rect2()

	var last: Vector2i = _filled.position + _filled.size - Vector2i.ONE
	var a: Vector2 = center_of(_filled.position)   # 左上角格 (X 最小, 屏幕 Y 最小 = 最远)
	var b: Vector2 = center_of(last)               # 右下角格 (X 最大, 屏幕 Y 最大 = 最近)
	# 外扩半格: 格中心之外还有半块砖的实体
	var half: Vector2 = Vector2(CELL_W_F, CELL_D_F) * 0.5
	var mn: Vector2 = Vector2(minf(a.x, b.x), minf(a.y, b.y)) - half
	var mx: Vector2 = Vector2(maxf(a.x, b.x), maxf(a.y, b.y)) + half
	return Rect2(mn, mx - mn)


# ============================================================
# 诊断 — 一次性测定 cell ↔ world 的真实映射与轴方向
# ============================================================

## 打印坐标约定的实测结果。这是**回归门**: 改了坐标约定或 TileSet 配置,
## 这里会立刻从「✅」变成「❌」, 而不是等到「玩起来怪怪的」才发现。
##
## 一次跑定四件事:
##   ① 换算可逆 (local_to_map(map_to_local(c)) == c)
##   ② +i 往**右** (Δx > 0)
##   ③ +j 往**下** (Δy > 0) —— 即纵深变浅 / 靠近镜头。这条错了整个横版就是反的
##   ④ 屏幕纵深是格宽的一半 (压扁比自洽) —— 见 CELL_D 上的注释
func debug_print_grid() -> void:
	print("=== BeltFloor 坐标约定自检 ===")
	print("tile_shape=", tile_set.tile_shape, "  tile_size=", tile_set.tile_size,
		"  (正方形 / 无 tile_layout —— 横版没有投影方向)")
	var fails: int = 0
	for c: Vector2i in [Vector2i(0, 0), Vector2i(1, 0), Vector2i(0, 1), Vector2i(1, 1), Vector2i(3, 2)]:
		var ml: Vector2 = map_to_local(c)
		var back: Vector2i = local_to_map(ml)
		var ok: bool = back == c
		if not ok:
			fails += 1
		print("cell=", c, "  map_to_local=", ml, "  round-trip=", back, "  ", ("✅" if ok else "❌"))

	# ② ③ 轴方向: 这两条是横版的全部地基
	var o: Vector2 = map_to_local(Vector2i.ZERO)
	var dx: Vector2 = map_to_local(Vector2i(1, 0)) - o
	var dy: Vector2 = map_to_local(Vector2i(0, 1)) - o
	var axis_ok: bool = dx.x > 0.0 and absf(dx.y) < 0.001 and dy.y > 0.0 and absf(dy.x) < 0.001
	if not axis_ok:
		fails += 1
	print("轴方向: +i = ", dx, " (应为 (+64, 0) 往右)   +j = ", dy,
		" (应为 (0, +32) 往下 = 靠近镜头)  ", ("✅" if axis_ok else "❌"))

	# ④ 压扁比自洽 —— 「世界一格是正方形, 屏幕纵深是它的一半」这件事必须成立。
	#    单独改 CELL_D 而忘了改 BeltSpace.DEPTH_SCALE (或反过来) 时, 这里会立刻 ❌。
	#    不报错的失败模式: 地砖和圆形 AoE 的长宽比不一致, 玩起来「说不上哪不对」。
	var want_d: float = float(CELL_WORLD) * BeltSpace.DEPTH_SCALE
	var squash_ok: bool = absf(float(CELL_D) - want_d) < 0.001
	if not squash_ok:
		fails += 1
	print("压扁比: CELL_D=", CELL_D, "  应为 CELL_WORLD(", CELL_WORLD, ") × DEPTH_SCALE(",
		BeltSpace.DEPTH_SCALE, ") = ", want_d, "  ", ("✅" if squash_ok else "❌"))

	if fails == 0:
		print("=== 自检通过: 坐标约定与横版设计一致 ===")
	else:
		print("=== ❌ 自检失败: ", fails, " 项不符 —— 地面轴向已与设计漂移 ===")

	# 变体分布自检: 苔藓占比应该接近 MOSS_CHANCE%
	var total: int = 0
	for k: int in _variant_counts:
		total += _variant_counts[k]
	var moss: int = _variant_counts.get(MOSS_VARIANT, 0)
	print("变体分布: ", _variant_counts, "  总数=", total,
		"  苔藓=", moss, " (", "%.1f" % (100.0 * float(moss) / maxf(1.0, float(total))), "% , 期望 ", MOSS_CHANCE, "%)")
