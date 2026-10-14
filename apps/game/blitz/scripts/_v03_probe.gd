extends Node
## 🚧 临时探针 —— 只用来给 v0.3 的**起手预警**拍图, 验收完 (步骤 7) 就删。
##
## 为什么必须拍图而不能只靠自检:
##   本轮的核心是「敌人起手**看得清**吗」。这件事 headless 断言完全测不到 ——
##   断言能验「相位会推进」「能打到人」, 但验不了「玩家一眼看得出它要打了」。
##   而这一条不成立的话, 精准格挡的整套设计就是空中楼阁。
##
## 用法 (⚠️ 不能加 --headless, 那样是 dummy 渲染器, 截出来是空的):
##   godot --path <项目> --quit-after 400 -- --v03probe

const OUT_DIR: String = "res://"


func run(game: Node) -> void:
	await get_tree().process_frame
	await get_tree().process_frame

	var player: BlitzPlayer = game.player
	var camera: CameraRig = game.camera
	# 关掉平滑跟随, 否则截图时相机还在飘, 取景会偏
	camera.position_smoothing_enabled = false

	var enemy: BlitzEnemy = null
	for n: Node in get_tree().get_nodes_in_group("enemies"):
		if n is BlitzEnemy and (n as BlitzEnemy).can_attack:
			enemy = n
			break
	if enemy == null:
		print("❌ 没找到会出招的敌人")
		get_tree().quit(1)
		return

	# 玩家站到敌人正下方 (判定框正好落在玩家身上), 面朝上
	enemy.facing_dir = Vector2.DOWN
	player.global_position = enemy.global_position + Vector2(0.0, 46.0)
	player.facing_dir = Vector2.UP
	player.velocity = Vector2.ZERO

	print("=== v0.3 起手预警拍图 ===")
	await _shoot_windup(enemy, 0.20, "windup_early")
	await _shoot_windup(enemy, 0.90, "windup_late")
	await _shoot_strike(enemy)
	await _shoot_recover(enemy)
	print("=== 拍图结束 ===")
	get_tree().quit(0)


## 把敌人冻在起手相位的指定进度上, 拍一张全屏 + 一张放大裁切。
func _shoot_windup(enemy: BlitzEnemy, t: float, tag: String) -> void:
	enemy.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	enemy._phase_timer = enemy.windup_duration * (1.0 - t)
	await get_tree().process_frame
	await RenderingServer.frame_post_draw
	_capture(enemy, tag)


func _shoot_strike(enemy: BlitzEnemy) -> void:
	enemy.attack_phase = BlitzEnemy.AttackPhase.STRIKE
	enemy._phase_timer = enemy.strike_duration
	await get_tree().process_frame
	await RenderingServer.frame_post_draw
	_capture(enemy, "strike")


func _shoot_recover(enemy: BlitzEnemy) -> void:
	enemy.attack_phase = BlitzEnemy.AttackPhase.RECOVER
	enemy._phase_timer = enemy.recover_duration
	await get_tree().process_frame
	await RenderingServer.frame_post_draw
	_capture(enemy, "recover")


func _capture(enemy: BlitzEnemy, tag: String) -> void:
	var img: Image = get_viewport().get_texture().get_image()
	img.save_png("%s_v03_%s.png" % [OUT_DIR, tag])

	# 以敌人为中心的放大裁切 —— 预警的细节在全屏图上太小, 看不清
	var at: Vector2 = enemy.get_global_transform_with_canvas().origin
	var half: Vector2 = Vector2(190.0, 150.0)
	var rect: Rect2i = Rect2i(
		clampi(int(at.x - half.x), 0, maxi(0, img.get_width() - int(half.x * 2.0))),
		clampi(int(at.y - half.y), 0, maxi(0, img.get_height() - int(half.y * 2.0))),
		int(half.x * 2.0), int(half.y * 2.0)
	)
	var crop: Image = img.get_region(rect)
	crop.resize(crop.get_width() * 2, crop.get_height() * 2, Image.INTERPOLATE_NEAREST)
	crop.save_png("%s_v03_%s_zoom.png" % [OUT_DIR, tag])
	print("  📸 ", tag, "  phase=", enemy.attack_phase)
