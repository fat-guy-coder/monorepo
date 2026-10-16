extends RefCounted
class_name BeltSpace
## 横版世界空间 ↔ 屏幕空间 —— 全项目**唯一**的压扁换算入口
##
## 📚 涉及学习文档 (按阅读顺序):
##   godot-1-14-builtin-math-types — Vector2 / 线性映射
##   godot-1-11-static-typing      — static 函数 (工具类不需要实例化)
##   godot-1-9-enums-constants     — const 常量的作用域
##
## 🏗️ 两套空间 (读之前先看这条, 否则一定写错):
##
##   世界空间 Vector2(x, z) —— **玩法数学**活在这里
##     x = 左右, z = 纵深 (z 越大越**远**, 离镜头越远 = 画面越靠上)
##     两个轴**同一个单位**: 世界空间走 64 就是 64, 在哪个轴上都是 64。
##     用世界空间的例子: 移动方向与速度、攻击射程、AoE 半径、闪避距离。
##
##   屏幕空间 Vector2(x, y) —— **引擎**活在这里 (= Node2D.global_position)
##     = Vector2(x, -z * DEPTH_SCALE)
##     Godot 的 2D 物理 / Y-sort / Camera2D / 碰撞形状 全都只认这一套。
##     用屏幕空间的例子: global_position、velocity、Area2D 的碰撞形状。
##
## 🏗️ 为什么要分两层, 而不是让世界 = 屏幕 (等距版就是这样, 那正是它出问题的地方):
##
##   因为纵深要**压扁成一半**。压扁之后「世界里的一个圆」在屏幕上自然就是 2:1 椭圆
##   —— 这正是 2.5D 横版的观感 (DNF 那一档)。但压扁**不能只体现在画面上**:
##   如果位置和速度仍按屏幕 1:1 算, 往纵深走就会比往左右走**快一倍**
##   (屏幕 32px 就等于一格纵深, 而左右要 64px 才一格), 斜着走的角度也是歪的,
##   圆形的 AoE 更是会变成一根竖着的香肠。
##
##   所以规则只有一条: **玩法用世界空间算, 只在写进节点 / 画到屏幕时换算一次。**
##
## ⚠️ 和旧 iso.gd 的区别 (那份已经删了, 但混起来最容易出事):
##   等距的斜轴是**旋转 45°** 的, 所以它必须有一整套投影公式, 而且公式极易和
##   TileSet 的 layout 漂移 (旧版为此专门留了一份独立的纯数学实现来对账)。
##   横版的两个轴是**轴对齐**的, 只有一根缩放常数 —— 公式短到不可能漂移。
##   这也是为什么本文件可以做到「一眼看懂」, 而 iso.gd 137 行里有一半是注释警告。


## 纵深压扁比: 1 世界单位的纵深 = 0.5 屏幕像素。
##
## 🏗️ 为什么是 0.5 (2:1):
##   · 2:1 是这一档视角的经典比例 (DNF / 三国战纪 / 大多数 2.5D 清版)。
##     再平一点 (>2:1) 纵深就「贴在地上」走不动了; 再陡一点 (<1.5:1) 又像俯视。
##   · 它同时决定了地砖的尺寸: 世界 64×64 的一格 → 屏幕 64×32。
##     见 BeltFloor.CELL_D —— 那边有一条自检断言两颗常量没漂开。
##   · 顺带一提, 这正好是 v0.2 等距版用过的那个 2:1 —— 视角从斜角转正了,
##     但「纵深看起来该有多深」的答案没变。
const DEPTH_SCALE: float = 0.5


# ============================================================
# 点 —— 带位移的换算
# ============================================================

## 世界坐标 (x, z) → 屏幕坐标。
##
## ⚠️ 反过来读也成立: 想知道一个 global_position 在世界的哪一格, 走 to_world()。
##    直接拿 global_position.y 当纵深用, 会**差一个 2 倍** —— 那是本文件存在的原因。
static func to_screen(world: Vector2) -> Vector2:
	return Vector2(world.x, -world.y * DEPTH_SCALE)


## 屏幕坐标 → 世界坐标 (x, z)。
static func to_world(screen: Vector2) -> Vector2:
	return Vector2(screen.x, -screen.y / DEPTH_SCALE)


# ============================================================
# 方向与速度 —— 不带位移的换算
# ============================================================

## 世界**方向** → 屏幕上的位移方向。
##
## ⚠️ 故意**不归一化**。方向不是位移: 世界里的「正前方 45°」投到屏幕上本来就该
##    比「正右方」短一截 —— 那一截正是纵深感的来源。归一化掉它,
##    屏幕上就变成「上 = 右」, 压扁白做了。
##
## 用途: 把归一化过的输入方向转成速度目标 (见 BlitzPlayer._input_screen_dir)。
static func dir_to_screen(world_dir: Vector2) -> Vector2:
	return Vector2(world_dir.x, -world_dir.y * DEPTH_SCALE)


## 屏幕速度的大小 → 世界速度的大小。
##
## 用途: _walk_phase 这类「按实际移动量推进」的动画相位。
## 用屏幕速度算的话, 往纵深走时腿摆得比往左右走**慢一半** ——
## 表现是「上下走像在滑冰」。这个 bug 不报错, 只是看着怪。
static func screen_speed_to_world(screen_vel: Vector2) -> float:
	return to_world(screen_vel).length()


## 把一个**屏幕方向**归一化成「世界长度 = 1」, 返回的还是屏幕方向。
##
## 🏗️ 为什么不能直接 screen_dir.normalized():
##    屏幕上的单位向量, 世界长度是**超过 1** 的 —— 斜向 (右+上) 的屏幕单位向量
##    (0.894, −0.448) 换回世界是 (0.894, 0.896), 长度 1.27。
##    拿它去乘一个世界速度上限 (闪避距离 / 击退距离), 斜着闪就会比正着闪
##    **多冲 27%** —— 而且只有斜着闪才会发现, 极难归因。
##
##    正确顺序是「先换回世界空间归一化, 再压扁回屏幕」, 也就是本函数。
##    直觉: 世界里的圆是屏幕上的椭圆, 归一化必须在**世界**里做,
##    否则就是拿椭圆的半径当圆的半径。
static func normalize_world(screen_dir: Vector2) -> Vector2:
	if screen_dir.length_squared() < 0.000001:
		return Vector2.ZERO
	return dir_to_screen(to_world(screen_dir).normalized())


## 把一个屏幕速度按**世界**上限截断。
##
## 🏗️ 为什么不能用 velocity.limit_length(max):
##    limit_length 比的是屏幕长度。同一个世界速度在屏幕上「越深越短」——
##    于是「限到 320」在横向真的是世界 320, 在纵深却只限到世界 160。
##    表现: 冲刺末尾横向收得住、往纵深收不住 (或者反过来, 看谁先撞到上限),
##    而两边的上限本来是同一个数。截断必须一直在世界空间里做。
static func limit_world_speed(screen_vel: Vector2, max_world: float) -> Vector2:
	var w: float = to_world(screen_vel).length()
	if w <= max_world or w < 0.000001:
		return screen_vel
	return screen_vel * (max_world / w)


## 输入向量 → 屏幕速度方向 (即 _apply_move 的目标方向)。
##
## 🏗️ 为什么输入轴可以直接当世界轴:
##   Input.get_vector("move_left","move_right","move_up","move_down") 返回的是
##   **玩家的意图**: +x = 想往右, +y = 想往画面下方 (= 世界 +z)。这两件事
##   在世界空间里的含义和玩家按的键**一一对应**, 中间不需要任何旋转 ——
##   这正是切横版时省下来的那一整套投影数学。
##
## ⚠️ 但输入轴和**屏幕轴**不是一回事: 输入的 y 是「世界纵深」, 屏幕的 y 也是,
##    只是压扁了一半。所以出给 _apply_move 之前必须过一次 dir_to_screen。
##    少这一次换算的后果很具体: 按一下上, 角色在屏幕上走的距离是左右的两倍,
##    而速度上限本该按世界空间统一 —— 表现是「上下走得飞快」。
static func input_to_screen(iv: Vector2) -> Vector2:
	return Vector2(iv.x, iv.y * DEPTH_SCALE)


# ============================================================
# 地面图形 —— 世界空间的圆, 屏幕上就是 2:1 椭圆
# ============================================================

## 画一个**世界空间的正圆**所需的屏幕顶点。中心在原点 (局部坐标)。
##
## 半径是世界单位: 传 40 就是要一个「世界半径 40」的圈, 屏幕上它会自动变成
## 40×20 的椭圆。想看正圆请传画在竖直平面上的东西 (角色、刀光), 不要用本函数。
static func ground_circle(radius_world: float, steps: int = 24) -> PackedVector2Array:
	var pts: PackedVector2Array = PackedVector2Array()
	for i: int in range(maxi(3, steps)):
		var a: float = TAU * float(i) / float(maxi(3, steps))
		pts.append(to_screen(Vector2(cos(a), sin(a)) * radius_world))
	return pts


## 世界空间圆的**碰撞形状** —— 给 Area2D 用。
##
## 🏗️ 为什么不用 CircleShape2D: CircleShape2D 在屏幕空间里是正圆, 于是它的世界
##    形状是一个「纵深方向长一倍」的椭圆 —— 判定面积比看到的大一大圈,
##    玩家会觉得自己站在圈外却也中了招。压扁必须一路贯穿到碰撞体。
static func ground_circle_shape(radius_world: float, steps: int = 24) -> ConvexPolygonShape2D:
	var shape: ConvexPolygonShape2D = ConvexPolygonShape2D.new()
	shape.points = ground_circle(radius_world, steps)
	return shape


## 地面绘制用的变换缩放 —— 配 CanvasItem.draw_set_transform() 用。
##
## 🏗️ 用法: 需要画一串地面装饰 (法阵/光环/预警圈) 时, 与其把每个 draw_circle 换成
##    多边形, 不如先 draw_set_transform(Vector2.ZERO, 0.0, ground_scale()),
##    之后的 draw_circle / draw_arc 就**全部**自动压扁了。
##    ⚠️ 它会一直生效到本次 _draw() 结束, 画完地面一定要
##       draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE) 复位。
##    ⚠️ 线宽也会一起被压 —— 地面上的描边本来就该是扁的, 这是**对的**,
##       但别拿它去画竖直的弧。
static func ground_scale() -> Vector2:
	return Vector2(1.0, DEPTH_SCALE)
