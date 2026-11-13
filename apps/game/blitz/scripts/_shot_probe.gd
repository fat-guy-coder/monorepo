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
	if _main.floor_layer == null or _main.player == null:
		print("❌ 关卡没搭好, 探针退出")
		get_tree().quit(1)
		return

	DirAccess.make_dir_recursive_absolute(OUT_DIR)

	var p: BlitzPlayer = _main.player
	_main.debug_overlay.set_shown(true)
	# 冻结物理: 否则重力每帧都在改 height, 截到的姿态不可复现
	p.set_physics_process(false)
	p.velocity = Vector2.ZERO
	p.facing = Facing.RIGHT
	p.state = BlitzPlayer.State.NORMAL

	# ⚠️ 先搬到一个**没有复活法阵的空地**。出生点正下方压着复活点的同心圆法阵,
	#    而跳跃读不读得出来全靠「影子留在原地」, 法阵那几圈绿色同心圆会把影子糊掉,
	#    让人误判成「影子没画」。
	p.global_position = _main.floor_layer.center_of(Vector2i(20, 9))

	# 摆到一个格子的**正中心**, 这样高亮格和脚底十字准星应当完全重合
	var cell: Vector2i = _main.floor_layer.cell_of(p.global_position)
	var center: Vector2 = _main.floor_layer.center_of(cell)
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
	#
	# ⚠️ v0.8 之后光改 _walk_phase 不够了: 动画状态由 anim_state() 判定, 而它靠
	#    **速度**认「在不在跑」。探针把物理关了, 速度是 0 → 会一直停在 IDLE,
	#    于是这张图会显示「站着不动」, 让人误判成「跑步动画没接上」。
	#    这里塞一个速度进去, 只是为了让状态判定走 RUN 分支 (物理已关, 人不会真动)。
	p.velocity = Vector2(120.0, 0.0)
	p._walk_phase = PI * 0.5
	await _shot(p, 0.0, "1b_迈步_最大跨幅")
	p._walk_phase = 0.0
	p.velocity = Vector2.ZERO
	p.facing = Facing.LEFT
	await _shot(p, 0.0, "2_站立_朝左")
	# v0.5 四向: 背面 / 正面。
	# ⚠️ 这两张**只能靠看** —— 自检能证明判定朝哪边, 证明不了「背面真的画成了背面」
	#    (没有眼睛、有发髻)。画反了的话, 上下走位时角色会像在倒着滑。
	p.facing = Facing.UP
	await _shot(p, 0.0, "2b_站立_朝上_背面")
	p.facing = Facing.DOWN
	await _shot(p, 0.0, "2c_站立_朝下_正面")
	p.facing = Facing.RIGHT
	# 520²/(2×1400) ≈ 96.6px —— 满跳顶点。三个高度覆盖 起跳/滞空/接近落地
	await _shot(p, 24.0, "3_起跳_height24")
	await _shot(p, 70.0, "4_滞空_height70")
	await _shot(p, 96.0, "5_顶点_height96")

	# 举盾 + 背对: 半平面边界线该出现在朝向侧
	p.height = 0.0
	p.state = BlitzPlayer.State.BLOCKING
	await _shot(p, 0.0, "6_举盾_正面有边界线")
	# 四向: 格挡的半平面边界要跟着转 —— 面朝上时那条线该横在**画面上方**。
	p.facing = Facing.UP
	await _shot(p, 0.0, "6b_举盾_朝上_边界线在上方")
	p.facing = Facing.RIGHT

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
	p.global_position = _main.floor_layer.center_of(Vector2i(14, 8))
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
	p.facing = Facing.RIGHT
	p.global_position = _main.floor_layer.center_of(Vector2i(20, 9))
	for i: int in range(40):
		await get_tree().process_frame

	_pose_attack(p, BlitzPlayer.AttackKind.LIGHT, 0.55)
	await _shot(p, 0.0, "10_横劈_扇形范围画在地上")

	_free_loose_hitboxes(p)
	_pose_attack(p, BlitzPlayer.AttackKind.HEAVY, 0.5)
	await _shot(p, 0.0, "11_重劈_矩形范围 (窄而远)")

	# 11b/11c: 四向的判定形状 —— 纵向重劈的矩形该**竖着**铺到画面里侧/外侧,
	# 而不是还横在身前。这一对是 v0.5 那次 90° 错位 bug 的肉眼闸门
	# (自检抓得住, 但看一眼确认更快, 也顺手验了「朝向箭头和形状同向」)。
	_free_loose_hitboxes(p)
	p.state = BlitzPlayer.State.NORMAL
	p.facing = Facing.UP
	_pose_attack(p, BlitzPlayer.AttackKind.HEAVY, 0.5)
	await _shot(p, 0.0, "11b_重劈_朝上_矩形铺向画面里侧")

	_free_loose_hitboxes(p)
	p.state = BlitzPlayer.State.NORMAL
	p.facing = Facing.DOWN
	_pose_attack(p, BlitzPlayer.AttackKind.HEAVY, 0.5)
	await _shot(p, 0.0, "11c_重劈_朝下_矩形铺向镜头这侧")
	p.facing = Facing.RIGHT

	_free_loose_hitboxes(p)
	p.state = BlitzPlayer.State.NORMAL
	p._active_shape = null
	p.queue_redraw()

	# ── 12~13: 落雷 (圆 + 延迟) 的验收 ──
	# ⚠️ 落雷的特效活 0.6 秒, 而且**圈要在落地前一直是同一条弧** —— 靠手按 U 再抢帧
	#    截不到稳定的一帧。这里手动 spawn 一个, 关掉它的 _process, 把 _t 直接摆到
	#    想看的那一刻。验的是「画出来的东西对不对」, 不是「技能流程对不对」(那归 smoke_test)。
	var sh: AttackShape = p.skill_shape()
	# v0.9: 数值从 SkillDef 读 —— 探针看到的就是游戏里真正用的那一份
	var ld: SkillDef = p.lightning_def()
	# ⚠️ 传**脚下**坐标, 不是落点 —— 落点由 shape 自己算 (见 lightning_bolt.gd 文件头)
	var bolt: LightningBolt = LightningBolt.spawn(
		get_tree(), p.global_position, sh, p.facing, ld.arm_delay)
	if bolt != null:
		bolt.set_process(false)
		# 快落地: 圈该最亮, 雷柱该快接地
		bolt._t = ld.arm_delay * 0.82
		bolt.queue_redraw()
	await _shot(p, 0.0, "12_落雷_预警圈在身前且在变亮")

	if bolt != null and is_instance_valid(bolt):
		# 刚落地: 冲击波沿**地面**扩散 (椭圆) + 白闪
		bolt._t = ld.arm_delay + 0.04
		bolt.queue_redraw()
	await _shot(p, 0.0, "13_落雷_落地冲击波应是贴地椭圆")

	if bolt != null and is_instance_valid(bolt):
		bolt.queue_free()

	# ── 14~15: 敌人起手的验收 ──
	# ⚠️ 敌人起手由 AI 驱动, 靠手按等不到稳定的一帧 (起手只有 0.55 秒, 而且要先走到位)。
	#    这里手动把一只敌人搬到玩家前方、摆到 WINDUP 末刻, 再关掉它的 _physics_process
	#    冻住相位 —— 验的是「画在地上的那片扇形对不对」, 不是 AI 会不会出招。
	# ⚠️ 先把所有敌人的出招关掉: 探针把玩家冻在原地, 场上的追兵却还在打 ——
	#    玩家挨一下就进 HIT 姿态 + 白闪, 而播放白闪的那个计时器在冻结的物理里
	#    不一定退得干净, 于是「敌人在起手」这张图里站着的是一个纯白的人。
	#    (实测截到过: 预警扇形是对的, 但玩家整个变成白色剪影。)
	#    本探针后面所有敌人的出招姿态都是手动摆的, 关掉 AI 出招不影响任何一张图。
	for f: Node in get_tree().get_nodes_in_group("enemies"):
		if f is BlitzEnemy:
			(f as BlitzEnemy).can_attack = false
	p._hit_flash_timer = 0.0
	p._block_flash_timer = 0.0
	p._parry_flash_timer = 0.0
	p._aura_flash_timer = 0.0
	p._hit_stun_timer = 0.0
	p.state = BlitzPlayer.State.NORMAL
	p.invincible_timer = 0.0

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
		foe.facing = Facing.LEFT
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

		# 14b: 同一只敌人、同一个相位, 只把「不可格挡」打开 —— 这一张要回答的是
		# **橙红和紫红分不分得开**。分不开的话, 玩家挨了不可格挡的一下只会以为格挡坏了。
		foe.attack_unblockable = true
		foe.queue_redraw()
		foe._tg.queue_redraw()
		for i: int in range(4):
			await get_tree().process_frame
		await _shot(p, 0.0, "14b_敌人起手_紫红表示挡不住")
		foe.attack_unblockable = false
		foe.queue_redraw()
		foe._tg.queue_redraw()

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

	# ── 16~18: 剑阵 (v0.7) 的验收 ──
	# 三个只能靠看的问题, 自检一个都答不了:
	#   ① 圈是不是**贴地椭圆**、和地砖同比例 (画成屏幕正圆的话, 玩家站在圈外也以为自己圈里)
	#   ② 阵有没有盖在角色身上 —— 这是 z_index = -5 那一条的肉眼闸门 (自检只锁常量, 锁不住观感)
	#   ③ 一圈剑读不读得出「插在地上」, 而不是「一圈围栏」
	_main.debug_overlay.set_shown(false)
	p.height = 0.0
	p.state = BlitzPlayer.State.NORMAL
	p.facing = Facing.RIGHT
	# 和 10/11 同一个落脚格: 脚下没有复活法阵的绿色同心圆来混淆边线
	p.global_position = _main.floor_layer.center_of(Vector2i(20, 9))
	# 把 14/15 摆到身前的敌人挪走 —— 它此刻正站在玩家右边 52px, 会挡住阵的右半边
	if foe != null and is_instance_valid(foe):
		foe.global_position = p.global_position + BeltSpace.to_screen(Vector2(0.0, -150.0))
	for i: int in range(30):
		await get_tree().process_frame

	var sd: SkillDef = p.sword_array_def()
	var arr: SwordArray = SwordArray.spawn(
		p.get_parent(), BeltSpace.to_world(p.global_position),
		sd.place_radius, sd.duration, sd.tick_interval, sd.tick_damage)
	if arr == null:
		print("⚠️ 剑阵没落下来, 跳过 16~18")
	else:
		# ⚠️ 立刻冻住: 否则它的 _physics_process 每帧累加 _t 并**真的对场上敌人跳伤**
		#    (探针只冻了玩家, 没冻敌人)。冻住之后 _t 由我们摆, 姿态才能复现。
		arr.set_physics_process(false)
		# 阵心必须正好压在脚底 —— 偏了的话「圈画在哪」和「脚站哪」是两回事
		print("剑阵: 阵心屏幕=%s  玩家脚底=%s  偏差=%.2fpx" % [
			str(arr.global_position), str(p.global_position),
			arr.global_position.distance_to(p.global_position)])

		# 16: 落阵瞬间 —— 从 0.25r 扩到 1.1r 的那圈扩散闪, 读作「阵法啪地铺开」
		arr._t = 0.12
		arr._pulse = 0.0
		arr.queue_redraw()
		await _shot(p, 0.0, "16_剑阵_落阵瞬间_扩散闪")

		# 17: 稳定态, **玩家站在阵里** —— 这一张回答 z 序: 脚和腿必须在阵圈之上,
		#     阵不能像一张贴纸盖住角色。同时能看「一圈剑是不是插在地上的」。
		arr._t = 1.0
		arr._rot = 0.35
		arr.queue_redraw()
		await _shot(p, 0.0, "17_剑阵_稳定态_玩家站阵里_验z序")

		# 18: 到期前 0.5 秒开始淡出 + 方波闪 —— 「还剩多久」必须看得见,
		#     否则玩家会把「阵没了」读成「阵没用」。_t=2.8 → 只剩 0.2s, 应明显变暗。
		arr._t = 2.8
		arr.queue_redraw()
		await _shot(p, 0.0, "18_剑阵_到期前闪烁")

		arr.queue_free()

	# ── 19~30: v0.8 骨架姿态逐招验收 ──
	# 这一组是「角色做精细点」**唯一**的验收方式。自检能锁骨长、锁脚踩地、锁相位连续,
	# 但锁不住「这一招看起来是不是这一招」—— 那是纯视觉判断, 只能一张一张看。
	#
	# ⚠️ F1 面板全程关着: 它的青色判定框正好糊在腿和脚上, 而腿脚恰恰是这一版
	#    新增的全部内容 (第一版就是这么把腿看丢的, 还以为是骨架没生效)。
	for i: int in range(4):
		await get_tree().process_frame

	# ⚠️ 把敌人全部冻住并挪走。它们此刻正围着玩家起手, 地上的扇形预警是**大块棕色**,
	#    正好糊在玩家脚下 —— 而这一组要看的恰恰是腿和脚。探针只冻了玩家, 敌人一直在跑。
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		var e: BlitzEnemy = n as BlitzEnemy
		if e == null or e.is_dead:
			continue
		e.set_physics_process(false)
		e.global_position = p.global_position + Vector2(0.0, -420.0)
		e.queue_redraw()
	for i: int in range(4):
		await get_tree().process_frame

	_reset_pose(p)
	p.velocity = Vector2(140.0, 0.0)
	p._walk_phase = 0.0
	await _shot(p, 0.0, "19_跑_前脚刚落_后脚在后")
	p._walk_phase = TAU * 0.75
	await _shot(p, 0.0, "20_跑_支撑脚在身下_摆动脚抬起")

	_reset_pose(p)
	p._grounded = false
	p._height_vel = 380.0
	await _shot(p, 26.0, "21_跳_上升_收腿")

	_reset_pose(p)
	p._grounded = false
	p._height_vel = -320.0
	await _shot(p, 60.0, "22_跳_下落_伸腿准备落地")

	_reset_pose(p)
	p._landing_timer = p.landing_lag_time
	await _shot(p, 0.0, "23_落地_蹲得最深那一帧")

	_reset_pose(p)
	_pose_attack(p, BlitzPlayer.AttackKind.LIGHT, 0.45)
	await _shot(p, 0.0, "24_轻击_横劈过半")
	_free_loose_hitboxes(p)

	_reset_pose(p)
	p.state = BlitzPlayer.State.CHARGING
	p._charge_timer = p.heavy_charge_max
	await _shot(p, 0.0, "25_重击_蓄满_双手把刀拉到身后")

	_reset_pose(p)
	_pose_attack(p, BlitzPlayer.AttackKind.HEAVY, 0.45)
	await _shot(p, 0.0, "26_重击_劈到身前")
	_free_loose_hitboxes(p)

	_reset_pose(p)
	_pose_attack(p, BlitzPlayer.AttackKind.SKILL, 0.5)
	await _shot(p, 0.0, "27_落雷_举剑引雷")
	_free_loose_hitboxes(p)

	_reset_pose(p)
	# ⚠️ 姿势由 SkillDef 决定, 所以 id 和锁定时长要一起摆 —— 只摆计时器的话
	#    anim_state() 读不到技能名, 会退回 IDLE (截图静默变成站立帧)。
	p._cast_skill_id = SkillBook.SWORD_ARRAY
	p._cast_lock_timer = p.sword_array_def().recovery * 0.5
	await _shot(p, 0.0, "28_剑阵_刀插进地里")

	_reset_pose(p)
	p.state = BlitzPlayer.State.BLOCKING
	await _shot(p, 0.0, "29_格挡_盾挡在身前")

	_reset_pose(p)
	p.state = BlitzPlayer.State.HIT
	p._hit_stun_timer = p.hit_stun_duration
	await _shot(p, 0.0, "30_受击_整个人往后折")

	# 背/正面跑动: 专治「手臂被压进躯干 / 腿被袍子吞掉」这类只在纵深朝向才出现的错误。
	# 朝向决定 anim 视图, 速度决定 anim_state() 判成 RUN —— 两个都得给。
	_reset_pose(p)
	p.facing = Facing.UP
	p.velocity = Vector2(0.0, -120.0)
	p._walk_phase = 0.0
	await _shot(p, 0.0, "31_跑_朝上_背面_两臂应在身体两侧")

	_reset_pose(p)
	p.facing = Facing.DOWN
	p.velocity = Vector2(0.0, 120.0)
	p._walk_phase = 0.0
	await _shot(p, 0.0, "32_跑_朝下_正面_两臂应在身体两侧")
	_free_loose_hitboxes(p)

	_reset_pose(p)

	# ══════════════════════════════════════════════════════════
	# 敌人骨架 (v0.8) —— 和玩家同一套验收方式: 每种姿态一张, 一张一张看
	# ══════════════════════════════════════════════════════════
	# 🏗️ 需要看的四件事:
	#   ① 逆关节腿真的朝后弯 (静止和走动**都要**看, 两边不一致会弹一下);
	#   ② 起手 → 命中 的爪位移足够大 (读招的全部依据);
	#   ③ 长硬直和短硬直**长得不一样** (不然玩家分不清「挨了一下」和「反击窗口」);
	#   ④ 背/正面两条爪在身体两侧, 不是塌进躯干。
	# ⚠️ 敌人的 _physics_process 在前面已经被关掉了, 所以下面的计时器不会自己走,
	#    每个姿态都是稳定的 —— 这正是能用它截图的前提。
	var efoe: BlitzEnemy = null
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		var cand: BlitzEnemy = n as BlitzEnemy
		if cand != null and not cand.is_dead:
			efoe = cand
			break
	if efoe == null:
		print("⚠️ 场上没有活着的敌人, 跳过敌人骨架截图")
	else:
		efoe.global_position = p.global_position + Vector2(150.0, 0.0)
		efoe.can_attack = false
		efoe.velocity = Vector2.ZERO
		efoe.facing = Facing.RIGHT
		_foe_reset(efoe)
		await _capture(efoe, 0.0, "33_敌人_站立_朝右_逆关节腿")

		# 走动态: 速度只是为了让 anim_state() 判成 MOVE (物理已关, 它不会真动)
		efoe.velocity = Vector2(120.0, 0.0)
		efoe._gait_phase = 0.0
		await _capture(efoe, 0.0, "34_敌人_步态_支撑脚在身后")

		efoe._gait_phase = TAU * 0.75
		await _capture(efoe, 0.0, "35_敌人_步态_摆动脚抬起")

		efoe.velocity = Vector2.ZERO
		efoe.attack_phase = BlitzEnemy.AttackPhase.WINDUP
		efoe._phase_timer = efoe.windup_duration * 0.15
		await _capture(efoe, 0.0, "36_敌人_起手_爪拉到身后_张嘴")

		efoe.attack_phase = BlitzEnemy.AttackPhase.STRIKE
		efoe._phase_timer = efoe.strike_duration * 0.1
		await _capture(efoe, 0.0, "37_敌人_命中_爪甩到身前")

		efoe.attack_phase = BlitzEnemy.AttackPhase.RECOVER
		efoe._phase_timer = efoe.recover_duration * 0.5
		await _capture(efoe, 0.0, "38_敌人_收招_压低压暗")

		_foe_reset(efoe)
		efoe._stun_timer = efoe.hit_stun_duration
		await _capture(efoe, 0.0, "39_敌人_短硬直_往后一震")

		efoe._stun_timer = 0.0
		efoe._stagger_timer = efoe.parry_stagger
		efoe._stagger_total = efoe.parry_stagger
		await _capture(efoe, 0.0, "40_敌人_长硬直_趴下去_反击窗口")

		_foe_reset(efoe)
		efoe.facing = Facing.UP
		await _capture(efoe, 0.0, "41_敌人_朝上_背面_两爪在身体两侧")

		efoe.facing = Facing.DOWN
		await _capture(efoe, 0.0, "42_敌人_朝下_正面_两爪在身体两侧")
		efoe.facing = Facing.RIGHT

	_main.debug_overlay.set_shown(true)
	print("截图目录: %s" % ProjectSettings.globalize_path(OUT_DIR))
	get_tree().quit(0)


## 把敌人恢复成「站着、没在出招、没有硬直」的干净状态。
## ⚠️ 和 _reset_pose 同一个理由: 上一个姿态的计时器不会自己归零 (物理被关了),
##    忘清一个就会「想拍起手, 截到的是收招」。
func _foe_reset(e: BlitzEnemy) -> void:
	e.attack_phase = BlitzEnemy.AttackPhase.NONE
	e._phase_timer = 0.0
	e._stun_timer = 0.0
	e._stagger_timer = 0.0
	e._stagger_total = 0.0
	e._flash_timer = 0.0
	e.velocity = Vector2.ZERO
	e.facing = Facing.RIGHT
	# 起手预警扇形**不冻结也关掉** —— 它画在地面层, 会把腿和脚糊掉。
	# 扇形本身已经由 14/15 号图验过, 这一组看的是身体。
	e._tg.set_active(false)
	e.queue_redraw()


## 把玩家恢复成「站着、贴地、什么都没在做」的干净状态。
##
## ⚠️ 每个姿态截图前都必须调它。上一个姿态留下的 _landing_timer / _cast_lock_timer /
##    _grounded 都会让 anim_state() 判成别的状态 —— 表现是「想拍重击, 截到的是落地」,
##    而且因为探针冻了物理, 那些计时器**永远不会自己归零**, 错一次就一直错。
func _reset_pose(p: BlitzPlayer) -> void:
	p.state = BlitzPlayer.State.NORMAL
	p.height = 0.0
	p._height_vel = 0.0
	p._grounded = true
	p.velocity = Vector2.ZERO
	p._landing_timer = 0.0
	p._cast_lock_timer = 0.0
	p._hit_stun_timer = 0.0
	p._charge_timer = 0.0
	p._walk_phase = 0.0
	p._active_shape = null
	# ⚠️ 受击闪白和无敌闪烁也必须清: 它们在 _update_timers 里递减, 而探针把物理关了,
	#    一旦被敌人打过一次就**永远**是白的/永远在闪 —— 后面每一张姿态图都废了。
	p._hit_flash_timer = 0.0
	p._block_flash_timer = 0.0
	p._parry_flash_timer = 0.0
	p.invincible_timer = 0.0
	p.health = p.max_health
	p.facing = Facing.RIGHT
	p.queue_redraw()


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
	await _capture(p, h, label)


## 通用截图: 以 **node 的原点**为中心裁剪放大。
##
## 🏗️ 和 _shot 分开是因为敌人没有 height (它们不跳), 但裁剪/存图的逻辑完全一样。
##    写两份的话, 「以谁为中心」「等几帧」这些细节迟早会漂成两套 ——
##    而漂了之后不会报错, 只会让两组图不可比。
func _capture(node: Node2D, h: float, label: String) -> void:
	node.queue_redraw()
	# 两帧: 第一帧 _draw 重画, 第二帧保证画完的帧进了渲染目标
	await RenderingServer.frame_post_draw
	await RenderingServer.frame_post_draw
	var img: Image = get_viewport().get_texture().get_image()
	img = _magnify(img, node)
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
func _magnify(src: Image, p: Node2D) -> Image:
	if _zoom <= 1.0:
		return src
	var vp: Vector2 = get_viewport().get_visible_rect().size
	# 角色原点 → 屏幕坐标 (相机、CanvasLayer 的变换都算进去, 不要自己算一遍)
	var at: Vector2 = p.get_global_transform_with_canvas().origin + _focus
	var w: int = int(vp.x / _zoom)
	var h: int = int(vp.y / _zoom)
	var x0: int = clampi(int(at.x - w * 0.5), 0, int(vp.x) - w)
	var y0: int = clampi(int(at.y - h * 0.5), 0, int(vp.y) - h)
	var out: Image = src.get_region(Rect2i(x0, y0, w, h))
	out.resize(int(vp.x), int(vp.y), Image.INTERPOLATE_NEAREST)
	return out
