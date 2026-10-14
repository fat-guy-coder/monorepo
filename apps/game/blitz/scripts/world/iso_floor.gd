extends TileMapLayer
class_name IsoFloor
## 等距地面 — 运行时程序化生成 TileSet, 0 美术素材
##
## 📚 涉及学习文档:
##   godot-2-8-tilemap        — 等距投影 + 菱形瓦片 + Y-sort 深度排序
##   godot-4-6-resource-system — 运行时 new() 构造 Resource (TileSet / TileSetAtlasSource)
##   godot-2-3-node2d-basics  — Image → ImageTexture → 贴图数据流
##   godot-1-14-builtin-math-types — absf / round / 整数位运算
##
## 🎮 为什么要「运行时生成」而不是拖一张素材:
##   当前阶段 0 美术素材 (见 DESIGN.md「纯代码先行」原则)。等距地砖是 2:1 菱形,
##   用 Image.set_pixel 逐像素雕出来只要十几行, 而且改配色/尺寸就是改常量,
##   比来回切编辑器画图快得多。将来接了真素材, 只需把 _build_atlas_image()
##   换成 load() 一张图, 其余代码一行不用动。
##
## 🏗️ 踩坑记录 (这两条会「静默失败」, 不看注释一定踩):
##   ① tile_shape 必须**先于** tile_layout 赋值 ——
##      TileSet.set_tile_layout() 在校验不通过时只 WARN_PRINT 然后**直接返回不赋值**,
##      你拿到的是上一个值, 没有任何异常。看起来「差不多对」, 最难查。
##   ② TileSetAtlasSource 必须先赋 texture 再 create_tile() ——
##      create_tile() 内部按 texture_region_size 算出矩形再跟贴图边界校验,
##      texture 为空时边界未定义, 会报 !room_for_tile。
##
## 🏗️ 碰撞层设计: 地面**纯视觉, 不加物理碰撞**。理由见 §「等距瓦片不要给碰撞」:
##   无重力下地面本就不需要碰撞; 真正要的是四道边界墙 (跟瓦片无关)。
##   而且 TileData 的菱形碰撞多边形在 MOTION_MODE_FLOATING 下沿 45° 边滑动会抖动
##   (floating 模式不生效 floor_constant_speed, 引擎层面无解)。
##   解耦的真正好处: 本文件是本次重构风险最大的一块, 纯视觉意味着它出问题只要
##   floor.hide() 关卡照样可玩可测。


# ============================================================
# 常量
# ============================================================

## 图集里有几种地砖外观 (5 种石地 + 1 种苔藓)
const VARIANT_COUNT: int = 6
## 苔藓变体在图集里的下标
const MOSS_VARIANT: int = 5
## 苔藓出现概率 (百分比)
const MOSS_CHANCE: int = 10

## 石地基础色 (偏冷的青灰, 衬 DESIGN.md 的仙侠夜景)
const STONE_BASE: Color = Color(0.16, 0.17, 0.23)
## 苔藓基础色
const MOSS_BASE: Color = Color(0.13, 0.20, 0.15)


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

## 构造等距 TileSet 并挂到自己身上。幂等 —— 重复调用直接返回。
func _ensure_tile_set() -> void:
	if tile_set != null:
		return

	# ── ① TileSet: tile_shape 必须最先, 否则 tile_layout 会被静默丢弃 ──
	var ts: TileSet = TileSet.new()
	ts.tile_shape = TileSet.TILE_SHAPE_ISOMETRIC
	# DIAMOND_RIGHT: 经典等距交错 —— +x 往屏幕右下走, +y 往左下走, 相邻菱形正好咬合。
	# (STACKED 是给「贴图自带重叠区」的瓦片用的, 会把菱形摆成规则网格 → 地面出现空洞)
	ts.tile_layout = TileSet.TILE_LAYOUT_DIAMOND_RIGHT
	ts.tile_offset_axis = TileSet.TILE_OFFSET_AXIS_HORIZONTAL
	ts.tile_size = Iso.TILE_SIZE

	# ── ② 图集贴图: 先建好 Image, 再转成 ImageTexture ──
	var atlas_img: Image = _build_atlas_image()
	var atlas_tex: ImageTexture = ImageTexture.create_from_image(atlas_img)

	# ── ③ AtlasSource: texture_region_size → texture → create_tile ──
	var src: TileSetAtlasSource = TileSetAtlasSource.new()
	src.texture_region_size = Iso.TILE_SIZE
	src.use_texture_padding = false
	src.texture = atlas_tex
	# 列数从**图宽推导**, 不要写 VARIANT_COUNT —— 差一格就越界报 !room_for_tile
	var cols: int = atlas_img.get_width() / Iso.TILE_W
	for x: int in range(cols):
		src.create_tile(Vector2i(x, 0))
	ts.add_source(src)  # 返回的 source_id 恒为 0 (第一个 source)

	# ── ④ 必须先挂 tile_set, 再 set_cell ──
	#     set_cell 时若 source_id 不在 tile_set 里, 该格会被静默丢弃
	tile_set = ts

	# 图集各项在内存里左右相邻, 菱形左右尖角处会被双线性采样到邻居 → 出现竖向细缝。
	# NEAREST 过滤 + 无 mipmap 是唯一干净的解法。
	texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	texture_repeat = CanvasItem.TEXTURE_REPEAT_DISABLED


## 程序化雕出 2:1 菱形地砖图集 (VARIANT_COUNT 种变体横向排成一行)。
##
## 菱形裁切公式: 逐行算这行的「半宽」, 行越靠中间越宽。
##   half_w(row) = (1 - |行中心到图高的偏移| / 半高) * 半宽
## 行 0 和行 31 半宽趋近于 0 (菱形的上下尖角), 行 15.5 处半宽满格 (左右尖角)。
func _build_atlas_image() -> Image:
	var img_w: int = Iso.TILE_W * VARIANT_COUNT
	# 无 mipmap: mipmap 会让相邻图集项互相渗透
	var img: Image = Image.create_empty(img_w, Iso.TILE_H, false, Image.FORMAT_RGBA8)
	img.fill(Color(0, 0, 0, 0))

	var half_h: float = Iso.TILE_H_F * 0.5
	var half_w: float = Iso.TILE_W_F * 0.5

	for v: int in range(VARIANT_COUNT):
		var base: Color = MOSS_BASE if v == MOSS_VARIANT else _stone_shade(v)
		var edge: Color = base.darkened(0.45)
		# 斑点只求「不是一块纯色」, 提亮太多太密会变成电视雪花噪点 (实测 0.30/6% 就是雪花)
		var speck: Color = base.lightened(0.12)
		# 固定种子 → 每次跑出来的斑点完全一致, 调试时不会「上一次还好好的」
		var rng: RandomNumberGenerator = RandomNumberGenerator.new()
		rng.seed = 1000 + v

		var x0: int = v * Iso.TILE_W

		for row: int in range(Iso.TILE_H):
			# 这行的菱形半宽
			var d: float = absf((float(row) + 0.5) - half_h) / half_h
			var hw: float = (1.0 - d) * half_w
			if hw <= 0.0:
				continue
			var lo: int = int(round(half_w - hw))
			var hi: int = int(round(half_w + hw))

			for x: int in range(lo, hi):
				var from_edge: float = hw - absf((float(x) + 0.5) - half_w)
				var c: Color
				if from_edge < 1.5:
					c = edge  # 描边: 让格子边界可见, 走位时才看得出自己在哪个格
				else:
					# 石地斑点: 只撒在内侧, 免得糊掉描边
					c = speck if (rng.randf() < 0.025 and from_edge > 4.0) else base
				img.set_pixel(x0 + x, row, c)

	return img


## 5 种石地变体的深浅微差 —— 让大片地面不至于像一块纯色
func _stone_shade(v: int) -> Color:
	var k: float = 1.0 + (float(v) - 2.0) * 0.035
	return Color(STONE_BASE.r * k, STONE_BASE.g * k, STONE_BASE.b * k, 1.0)


# ============================================================
# 铺砖
# ============================================================

## 把一个矩形范围的地格全部铺上砖。cell_rect 是以 (0,0) 为起点、尺寸为 (宽, 高) 的地格区域。
##
## 由 main.gd 显式调用, **_ready() 里不自动铺** —— 这样 main.gd 铺完就能立刻用
## cell_of() / center_of() 摆障碍物和玩家。
func fill_rect(cell_rect: Rect2i) -> void:
	_ensure_tile_set()
	for i: int in range(cell_rect.position.x, cell_rect.position.x + cell_rect.size.x):
		for j: int in range(cell_rect.position.y, cell_rect.position.y + cell_rect.size.y):
			var cell: Vector2i = Vector2i(i, j)
			# 用格坐标哈希而非 randf(), 保证同一格每次跑都是同一张脸 (幂等, 重铺结果一致)。
			# ⚠️ 必须用 Godot 内建 hash(): 手写 (i*A) ^ (j*B) 这种 XOR 组合低位有结构偏斜,
			#    实测会变成「苔藓成串成块」, 一眼就看得出是程序生成的。
			var h: int = absi(hash(cell))
			var variant: int = MOSS_VARIANT if (h % 100) < MOSS_CHANCE else (h / 100) % (VARIANT_COUNT - 1)
			set_cell(cell, 0, Vector2i(variant, 0))
			_variant_counts[variant] = _variant_counts.get(variant, 0) + 1

	_filled = cell_rect
	_has_cells = true


# ============================================================
# 坐标桥 — 全项目唯一的地格 ↔ 世界换算入口
# ============================================================

## 世界坐标 → 地格。其他地方**不准**自己重新实现投影公式, 一律走这里。
func cell_of(global_pos: Vector2) -> Vector2i:
	return local_to_map(to_local(global_pos))


## 地格 → 该地砖的**菱形中心**的世界坐标。
##
## 注意: map_to_local() 返回的是「格原点」, 未必等于菱形中心 (随 tile_layout 变)。
## 本函数是全项目唯一的解释处 —— 想知道到底差多少, 跑 debug_print_orientation()。
func center_of(cell: Vector2i) -> Vector2:
	return to_global(map_to_local(cell))


## 一片矩形地格区域的**重心**的世界坐标。
##
## 🏗️ 与 center_of 的区别: center_of 返回「起点那一格」的菱形中心, 本函数返回
##   整片区域的几何中心。占地 2×1 的方块必须用本函数 —— 用 center_of 会整体偏半格,
##   而等距视角下偏半格看起来「差不多对」, 是最容易被放过去的那类错。
func center_of_span(origin: Vector2i, cells: Vector2i) -> Vector2:
	# 区域在格坐标上的中心: 起点 + (跨度 - 1) / 2
	var ci: float = float(origin.x) + (float(cells.x) - 1.0) * 0.5
	var cj: float = float(origin.y) + (float(cells.y) - 1.0) * 0.5
	return to_global(Iso.cell_to_world_f(ci, cj))


## 已铺地格覆盖的世界范围 (含菱形半宽半高的外扩), 供 CameraRig 算边界。
func bounds_global() -> Rect2:
	if not _has_cells:
		return Rect2()

	var last: Vector2i = _filled.position + _filled.size - Vector2i.ONE
	# 四角格的中心
	var corners: Array[Vector2] = [
		center_of(_filled.position),
		center_of(Vector2i(last.x, _filled.position.y)),
		center_of(Vector2i(_filled.position.x, last.y)),
		center_of(last),
	]
	var mn: Vector2 = corners[0]
	var mx: Vector2 = corners[0]
	for c: Vector2 in corners:
		mn = Vector2(minf(mn.x, c.x), minf(mn.y, c.y))
		mx = Vector2(maxf(mx.x, c.x), maxf(mx.y, c.y))
	# 外扩半块砖, 因为菱形是「斜」的, 角格中心之外还有半个菱形的实体
	var pad: Vector2 = Vector2(Iso.TILE_W_F * 0.5, Iso.TILE_H_F * 0.5)
	return Rect2(mn - pad, (mx - mn) + pad * 2.0)


# ============================================================
# 诊断 — 一次性测定 cell ↔ world 的真实映射
# ============================================================

## 打印引擎换算 vs 纯数学换算的对照表。只在 debug 构建 / 手动调用时执行。
##
## 一次跑定三件事:
##   ① map_to_local 的返回约定 (格原点还是菱形中心) —— 看 Δmath
##   ② 换算是否可逆 (local_to_map(map_to_local(c)) == c)
##   ③ 轴的方向: (1,0) 应该往屏幕右下走, (0,1) 往左下走
func debug_print_orientation() -> void:
	print("=== IsoFloor 朝向自检 ===")
	# ⚠️ tile_shape / tile_layout / tile_size 是 TileSet 的属性, 不在 TileMapLayer 上
	print("tile_shape=", tile_set.tile_shape, "  tile_layout=", tile_set.tile_layout, "  tile_size=", tile_set.tile_size)
	var fails: int = 0
	for c: Vector2i in [Vector2i(0, 0), Vector2i(1, 0), Vector2i(0, 1), Vector2i(1, 1), Vector2i(3, 2)]:
		var ml: Vector2 = map_to_local(c)
		var math_v: Vector2 = Iso.cell_to_world(c)
		# ① 引擎换算必须可逆  ② 纯数学公式必须与引擎一致
		var back: Vector2i = local_to_map(ml)
		var back_math: Vector2i = Iso.world_to_cell(ml)
		var ok: bool = back == c and back_math == c and ml.is_equal_approx(math_v)
		if not ok:
			fails += 1
		print("cell=", c,
			"  map_to_local=", ml,
			"  math=", math_v,
			"  Δ=(", "%.1f" % (ml.x - math_v.x), ", ", "%.1f" % (ml.y - math_v.y), ")",
			"  round-trip=", back, "  纯数学回算=", back_math,
			"  ", ("✅" if ok else "❌"))
	if fails == 0:
		print("=== 自检通过: 引擎换算 ↔ 纯数学公式 完全一致 ===")
	else:
		print("=== ❌ 自检失败: ", fails, " 个格子不一致 —— layout 与 Iso 公式已漂移 ===")

	# 变体分布自检: 苔藓占比应该接近 MOSS_CHANCE%, 且不能成串成块
	var total: int = 0
	for k: int in _variant_counts:
		total += _variant_counts[k]
	var moss: int = _variant_counts.get(MOSS_VARIANT, 0)
	print("变体分布: ", _variant_counts, "  总数=", total,
		"  苔藓=", moss, " (", "%.1f" % (100.0 * float(moss) / maxf(1.0, float(total))), "% , 期望 ", MOSS_CHANCE, "%)")
