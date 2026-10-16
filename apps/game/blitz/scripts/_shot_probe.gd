extends Node
## 🚦 临时验收探针 —— 把「必须肉眼确认」的两问变成可以离线看的 PNG。
##
## 用法: godot --path <项目> -- --shots        (⚠️ **不能** --headless, 无头没有渲染器)
##
## 为什么需要它:
##   步骤 2 的闸门有两条只能靠看的断言 ——
##     ① 横向走位跟脚下地砖对得上吗
##     ② 跳跃读得出来吗 (影子留在原地当参照)
##   自检能断言「height 归零」「position.y 不变」, 但断不出「画出来的身体有没有跟着抬」。
##   与其让人肉眼看窗口 (还要手动按到正确状态), 不如固定几个姿态截图留档、逐张对比。
##
## ⚠️ 探针把 player.set_physics_process(false), 所以截图里的 height 是**硬塞的**,
##    不是跳上去的。它验的是「渲染有没有接上 height」, 不是「物理对不对」——
##    后者归 smoke_test 的 _check_jump 管。

const OUT_DIR: String = "user://shots"

## 放大倍数。1 倍看「地砖跟人一起动」(要看得到好几格), 3~6 倍看「侧视角色长什么样」。
## 两条闸门要的东西不同, 所以倍数是命令行参数而不是常量。
##
## ⚠️ 放大是**截图后裁剪再放大**, 不是设 camera.zoom。
##    第一版用 camera.zoom, 结果画面整体跑到角色以外 —— 因为 CameraRig 的边界是在
##    **1 倍**下按地平面算死的 (纵深 576 < 视口高 720 → 纵向被锁在正中),
##    放大后相机仍然解不开纵向锁, 角色就直接飞出画面。
##    裁图法不动相机, 边界行为完全和玩家实际操作一致, 也就顺带保住了「所见即所得」。
var _zoom: float = 1.0

## 裁剪中心相对**脚底**的偏移。默认 (0,0) = 以角色为中。
##
## 🏗️ 为什么需要它: 落雷的落点在身前 132px 处, 而裁剪框以角色为中心 ——
##    放大到 6 倍时半宽只剩 106px, 落点正好被切在画面外。
##    想看什么就把镜头挪过去, 比为了截图去改技能距离靠谱 (后者会顺手改掉被测对象)。
var _focus: Vector2 = Vector2.ZERO

var _main: Node = null


func setup(main: Node) -> void:
	_main = main
	for a: String in OS.get_cmdline_user_args():
		if a.begins_with("--zoom="):
			_zoom = maxf(1.0, float(a.substr(7)))
		elif a.begins_with("--focus="):
			var xy: PackedStringArray = a.substr(8).split(",")
			if xy.size() == 2:
				_focus = Vector2(float(xy[0]), float(xy[1]))
	_run()


func _run() -> void:
	if _main.floor == null or _main.player == null:
		print("❌ 关卡没搭好, 探针退出")
		get_tree().quit(1)
		return

	DirAccess.make_dir_recursive_absolute(OUT_DIR)

	var p: BlitzPlayer = _main.player
	_main.debug_overlay.set_shown(true)
	# 冻结物理: 否则重力每帧都在改 height, 截到的姿态不可复现
	p.set_physics_process(false)
	p.velocity = Vector2.ZERO
	p.facing = 1
	p.state = BlitzPlayer.State.NORMAL

	# ⚠️ 先搬到一个**没有复活法阵的空地**。出生点正下方压着复活点的同心圆法阵,
	#    而跳跃读不读得出来全靠「影子留在原地」, 法阵那几圈绿色同心圆会把影子糊掉,
	#    让人误判成「影子没画」。
	p.global_position = _main.floor.center_of(Vector2i(20, 9))

	# 摆到一个格子的**正中心**, 这样高亮格和脚底十字准星应当完全重合
	var cell: Vector2i = _main.floor.cell_of(p.global_position)
	var center: Vector2 = _main.floor.center_of(cell)
	print("玩家落点 cell=%s  脚底=%s  格中心=%s  偏差=%.2fpx" % [
		str(cell), str(p.global_position), str(center),
		p.global_position.distance_to(center)])

	# ⚠️ 相机是**插值**跟随的 (camera_rig._process), 刚瞬移完它还停在旧位置。
	#    不等它走完就截图, 角色会偏离画面中心一百多像素 ——
	#    而这一组的用途恰恰是「十字准星和脚下格子对不对得上」, 偏移会让判断失效。
	#    (裁剪放大那一版是按**角色屏幕坐标**裁的, 所以就算相机没到位也不会跑偏,
	#     但 1 倍那几张是全屏原图, 必须等。)
	for i: int in range(40):
		await get_tree().process_frame

	await _shot(p, 0.0, "1_站立_朝右")
	# 迈步拉到最大跨幅 (sin 相位 = 1) —— 腿脚如果被袍摆盖住, 这一张会「和站立一样」
	p._walk_phase = PI * 0.5
	await _shot(p, 0.0, "1b_迈步_最大跨幅")
	p._walk_phase = 0.0
	p.facing = -1
	await _shot(p, 0.0, "2_站立_朝左")
	p.facing = 1
	# 520²/(2×1400) ≈ 96.6px —— 满跳顶点。三个高度覆盖 起跳/滞空/接近落地
	await _shot(p, 24.0, "3_起跳_height24")
	await _shot(p, 70.0, "4_滞空_height70")
	await _shot(p, 96.0, "5_顶点_height96")

	# 举盾 + 背对: 半平面边界线该出现在朝向侧
	p.height = 0.0
	p.state = BlitzPlayer.State.BLOCKING
	await _shot(p, 0.0, "6_举盾_正面有边界线")

	# ── 压扁 (2:1) 的两条验收 ──
	# 7~8: 贴地的圆必须是**椭圆**, 而且不能因为压扁而看不见了。
	#
	# ⚠️ 这两张**关掉 F1 面板**: 它会在角色脚下画一个红色十字准星和一支黄色箭头,
	#    正好压住影子中心。肉眼看还行, 但用脚本量「这块方框有多暗」时会量到准星的颜色
	#    而不是影子 —— 第一版的读数就是这么被骗过去的 (它显示「影子几乎没变暗」,
	#    而画面上影子明明在那儿)。要么关面板, 要么把测量框挪开, 这里选前者。
	_main.debug_overlay.set_shown(false)
	for i: int in range(4):
		await get_tree().process_frame
	p.state = BlitzPlayer.State.NORMAL
	await _shot(p, 0.0, "7_贴地影子_应是2比1椭圆")
	# 8: 同一张画面里同时有影子和地砖 —— 两者的长宽比必须**一致**。
	#    不一致的话眼睛会说「圈是扁的、格子是方的」, 而人只会觉得「哪里怪」。
	await _shot(p, 60.0, "8_滞空_影子与地砖同比例")
	# 8b: 顶点。这一张是「影子有没有淡到看不见」的判据 —— 影子是滞空唯一的
	#     地面参照, 它一没, 跳跃就退化成「角色在屏幕上平移了一下」。
	await _shot(p, 96.0, "8b_顶点_影子还看得见吗")
	_main.debug_overlay.set_shown(true)
	for i: int in range(4):
		await get_tree().process_frame

	# 9: 复活法阵 —— 第二个贴地的大圆, 而且它是**绿色带描边**的, 比影子更容易量宽高比。
	#    顺带验「法阵不随跳跃抬高」(它贴地, 是人相对地面的参照)。
	p.height = 0.0
	p.global_position = _main.floor.center_of(Vector2i(14, 8))
	for i: int in range(40):
		await get_tree().process_frame
	await _shot(p, 0.0, "9_复活法阵_应是贴地椭圆")

	# ── 攻击形状 (扇形 / 矩形) 的验收 ──
	# 10~11: 判定范围必须**在地面上看得见**, 而且和 F1 面板画的预览对得上。
	#
	# ⚠️ 形状只在 ATTACKING 那一瞬存在 (0.15 秒), 靠手按截不到。
	#    这里直接调 _begin_attack 把状态摆出来, 再把 _attack_timer 冻在挥到一半的位置 ——
	#    探针已经把 set_physics_process(false) 了, 所以冻住就是真的冻住。
	#    (验的是「渲染有没有接上 shape」, 不是「出招逻辑对不对」—— 后者归 smoke_test。)
	p.height = 0.0
	p.state = BlitzPlayer.State.NORMAL
	p.facing = 1
	p.global_position = _main.floor.center_of(Vector2i(20, 9))
	for i: int in range(40):
		await get_tree().process_frame

	_pose_attack(p, BlitzPlayer.AttackKind.LIGHT, 0.55)
	await _shot(p, 0.0, "10_横劈_扇形范围画在地上")

	_free_loose_hitboxes(p)
	_pose_attack(p, BlitzPlayer.AttackKind.HEAVY, 0.5)
	await _shot(p, 0.0, "11_重劈_矩形范围 (窄而远)")

	_free_loose_hitboxes(p)
	p.state = BlitzPlayer.State.NORMAL
	p._active_shape = null
	p.queue_redraw()

	# ── 12~13: 落雷 (圆 + 延迟) 的验收 ──
	# ⚠️ 落雷的特效活 0.6 秒, 而且**圈要在落地前一直是同一条弧** —— 靠手按 U 再抢帧
	#    截不到稳定的一帧。这里手动 spawn 一个, 关掉它的 _process, 把 _t 直接摆到
	#    想看的那一刻。验的是「画出来的东西对不对」, 不是「技能流程对不对」(那归 smoke_test)。
	var sh: AttackShape = p.skill_shape()
	# ⚠️ 传**脚下**坐标, 不是落点 —— 落点由 shape 自己算 (见 lightning_bolt.gd 文件头)
	var bolt: LightningBolt = LightningBolt.spawn(
		get_tree(), p.global_position, sh, p.facing, p.skill_arm_delay)
	if bolt != null:
		bolt.set_process(false)
		# 快落地: 圈该最亮, 雷柱该快接地
		bolt._t = p.skill_arm_delay * 0.82
		bolt.queue_redraw()
	await _shot(p, 0.0, "12_落雷_预警圈在身前且在变亮")

	if bolt != null and is_instance_valid(bolt):
		# 刚落地: 冲击波沿**地面**扩散 (椭圆) + 白闪
		bolt._t = p.skill_arm_delay + 0.04
		bolt.queue_redraw()
	await _shot(p, 0.0, "13_落雷_落地冲击波应是贴地椭圆")

	if bolt != null and is_instance_valid(bolt):
		bolt.queue_free()

	# ── 14~15: 敌人起手的验收 ──
	# ⚠️ 敌人起手由 AI 驱动, 靠手按等不到稳定的一帧 (起手只有 0.55 秒, 而且要先走到位)。
	#    这里手动把一只敌人搬到玩家前方、摆到 WINDUP 末刻, 再关掉它的 _physics_process
	#    冻住相位 —— 验的是「画在地上的那片扇形对不对」, 不是 AI 会不会出招。
	var foe: BlitzEnemy = null
	for f: Node in get_tree().get_nodes_in_group("enemies"):
		if is_instance_valid(f) and not (f as BlitzEnemy).is_dead:
			foe = f
			break
	if foe == null:
		print("⚠️ 场景里没有活着的敌人, 跳过 14/15")
	else:
		p.health = p.max_health
		p.invincible_timer = 0.0
		# ⚠️ 关面板再拍: F1 会在玩家脚下画红色准星 + 黄色朝向箭头, 还会把**玩家自己的**
		#    轻击扇形预览铺在同一个平面上 —— 三样东西叠在一起时, 「敌人的扇形是从
		#    谁的脚底发出来的」根本看不出来。这两张只回答这一个问题。
		_main.debug_overlay.set_shown(false)
		for i: int in range(4):
			await get_tree().process_frame
		# 站在玩家**身前** (世界 +x), 朝向玩家 —— 和真打起来时的相对位置一致
		foe.global_position = p.global_position + BeltSpace.to_screen(Vector2(52.0, 6.0))
		foe.facing = -1
		foe.set_physics_process(false)
		foe.attack_phase = BlitzEnemy.AttackPhase.WINDUP
		foe._phase_timer = 0.002          # t → 1.0: 扇形张到最大, 扫过痕铺满
		foe.queue_redraw()
		# ⚠️ 预警画在**贴地层那个子节点**上, 而它的每帧重绘挂在 _sync_ground_telegraph
		#    (在 _physics_process 里) —— 上面刚把物理关掉, 所以这里必须手动再叫一次,
		#    否则截到的是「敌人已经在起手、地上却什么都没有」。
		foe._tg.set_active(true)
		foe._tg.queue_redraw()
		for i: int in range(30):
			await get_tree().process_frame
		await _shot(p, 0.0, "14_敌人起手_扇形预警在地上")

		# 命中帧: 手动挂一个判定区, 摆到生命进度 0 (最亮)
		var atk: EnemyAttack = EnemyAttack.new()
		atk.attack_shape = foe.attack_shape()
		atk.facing = foe.facing
		atk.lifetime = 30.0               # 大寿命 + 关掉自毁 → 冻在那一帧
		foe.add_child(atk)
		# ⚠️ 关 monitorable: 否则玩家的 Hurtbox (mask 含 bit3) 会真的挨这一下,
		#    角色被打进 HIT 姿态 —— 而探针已经 set_physics_process(false) 了,
		#    那一姿态会一直挂着, 把这张图想看的「扇形」盖掉。
		atk.monitorable = false
		atk.set_physics_process(false)
		atk.queue_redraw()
		for i: int in range(4):
			await get_tree().process_frame
		await _shot(p, 0.0, "15_敌人命中帧_同一片扇形亮起")
		atk.queue_free()

	print("截图目录: %s" % ProjectSettings.globalize_path(OUT_DIR))
	get_tree().quit(0)


## 把玩家摆到「某一招挥到一半」的姿态。
##
## ⚠️ 必须**立刻**把 _attack_timer 改成想要的值 —— _begin_attack 会把它设成满时长,
##    而 _shot 之间会等几帧; 虽然探针已经关掉了玩家自己的 _physics_process,
##    但依赖「没人会去动它」是不必要的假设, 显式写死更稳。
func _pose_attack(p: BlitzPlayer, kind: BlitzPlayer.AttackKind, progress: float) -> void:
	p._attack_cooldown_timer = 0.0
	p.stamina.refill()
	p._begin_attack(kind, 1.0)
	p._attack_timer = p._attack_total * (1.0 - progress)
	p.queue_redraw()


## 判定框自己会数秒自毁 (_physics_process), 但玩家被 set_physics_process(false) 之后
## 它的父节点照样在跑 —— 所以上一个姿态的判定框可能还挂着, 会污染下一张截图
## (画面上多出一块上一招的范围)。显式清干净。
func _free_loose_hitboxes(p: BlitzPlayer) -> void:
	for c: Node in p.get_children():
		if c is AttackHitbox:
			p.remove_child(c)
			c.queue_free()


func _shot(p: BlitzPlayer, h: float, label: String) -> void:
	p.height = h
	p.queue_redraw()
	# 两帧: 第一帧 _draw 重画, 第二帧保证画完的帧进了渲染目标
	await RenderingServer.frame_post_draw
	await RenderingServer.frame_post_draw
	var img: Image = get_viewport().get_texture().get_image()
	img = _magnify(img, p)
	# ⚠️ GDScript 的 % 格式化**不支持 %g** —— 写成 %g 不会报错, 而是整条格式串原样留着,
	#    结果就是「路径里带 %s」→ save_png 返回 7 (文件打不开)。用 %d 并显式取整。
	var path: String = "%s/z%d_%s.png" % [OUT_DIR, int(_zoom), label]
	var err: int = img.save_png(path)
	if err != OK:
		print("❌ 存图失败 %s (err=%d)" % [path, err])
	else:
		print("✅ %s  height=%.0f  -> %s" % [label, h, ProjectSettings.globalize_path(path)])


## 以**角色脚下原点**为中心裁一小块再放大到全屏。
##
## 🏗️ 为什么以「原点」而不是「身体中心」为裁剪中心:
##    这一组图要回答的是「脚底和格子中心对不对得上」, 所以参照点必须是脚底那个**点**。
##    用身体中心裁的话, 跳跃高度每变一次裁框就跟着挪一次, 三张滞空图之间不可比 ——
##    而「影子有没有留在原地」正是靠这三张对比出来的。
func _magnify(src: Image, p: BlitzPlayer) -> Image:
	if _zoom <= 1.0:
		return src
	var vp: Vector2 = get_viewport().get_visible_rect().size
	# 角色原点 → 屏幕坐标 (相机、CanvasLayer 的变换都算进去, 不要自己算一遍)
	var at: Vector2 = p.get_global_transform_with_canvas().origin + _focus
	var w: int = int(vp.x / _zoom)
	var h: int = int(vp.y / _zoom)
	var x0: int = clampi(int(at.x) - w / 2, 0, int(vp.x) - w)
	var y0: int = clampi(int(at.y) - h / 2, 0, int(vp.y) - h)
	var out: Image = src.get_region(Rect2i(x0, y0, w, h))
	out.resize(int(vp.x), int(vp.y), Image.INTERPOLATE_NEAREST)
	return out
