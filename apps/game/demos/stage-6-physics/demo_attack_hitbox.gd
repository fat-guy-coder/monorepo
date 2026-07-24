extends Node
## 近战攻击判定框 Demo — Area2D + 碰撞层实战
## 📚 godot-6-2-area2d-deep / godot-6-4-collision-layers
##
## TS 类比: 攻击 hitbox ≈ 在角色前方短暂创建一个碰撞体 0.15s 后销毁
##          碰撞层 ≈ 用 bitmask 控制"谁能检测到谁"
##
## 核心模式: spawn → detect → damage → self_destruct

func _ready() -> void:
	print("========== 攻击判定框 Demo ==========")
	print("(此 Demo 演示攻击判定框的碰撞层和生命周期设计)")
	print("(实际运行见 Blitz 项目: attack_hitbox.gd)")
	print("")

	# === 1. 碰撞层分配 (8 bit 掩码) ===
	# 攻击判定框的碰撞设置:
	var attack_layer: int = 1 << 2   # bit2 = 玩家攻击 "我是谁"
	var attack_mask: int  = 1 << 1   # bit1 = 敌人身体 "我检测谁"

	print("攻击判定框 collision_layer = %d (bit 2, 0b%s)" % [attack_layer, _to_bin(attack_layer)])
	# 输出: 攻击判定框 collision_layer = 4 (bit 2, 0b100)
	print("攻击判定框 collision_mask  = %d (bit 1, 0b%s)" % [attack_mask, _to_bin(attack_mask)])
	# 输出: 攻击判定框 collision_mask  = 2 (bit 1, 0b010)

	# === 2. 完整的 8 bit 布局 ===
	var layers: Dictionary = {
		"Bit 0": "玩家身体",
		"Bit 1": "敌人身体",
		"Bit 2": "玩家攻击",   # ← 攻击判定框在这里
		"Bit 3": "敌人攻击",
		"Bit 4": "墙壁/平台",
		"Bit 5": "格挡对象",
		"Bit 6": "终点",
		"Bit 7": "预留",
	}
	print("\n碰撞层 8 bit 分配:")
	for bit_name: String in layers:
		print("  %s = %s" % [bit_name, layers[bit_name]])
	# 输出: 各 bit 对应的实体类型

	# === 3. 攻击判定框生命周期 ===
	print("\n攻击判定框生命周期 (≈ game loop):")
	print("  1. 玩家按 J → _start_attack_light()")
	print("  2. instantiate() 创建 Area2D 在玩家面前")
	print("  3. 设置 collision_layer=bit2, collision_mask=bit1")
	print("  4. body_entered/area_entered 信号触发 → take_damage() + 击退")
	print("  5. create_timer(0.15s).timeout → queue_free() 自毁")
	# 输出: 5 步生命周期

	# === 4. 对比: 子弹 vs 近战攻击 ===
	print("\n┌─────────────────┬──────────────┬──────────────┐")
	print("│ 特性             │ 子弹 (旧)    │ 近战 (新)    │")
	print("├─────────────────┼──────────────┼──────────────┤")
	print("│ 节点类型         │ Area2D       │ Area2D       │")
	print("│ 移动             │ direction*speed │ 静止在玩家前 │")
	print("│ 碰撞层           │ bit2         │ bit2         │")
	print("│ 生命周期         │ 3s           │ 0.15s        │")
	print("│ 击退             │ 无           │ 有 (kb_dir)  │")
	print("│ 连击             │ 按频率连发   │ 独立冷却     │")
	print("│ 视觉             │ 黄色光点     │ 白色刀光     │")
	print("└─────────────────┴──────────────┴──────────────┘")

	# === 5. 关键代码片段 ===
	var code_snippet: String = """# 在 player.gd 中生成攻击判定框的代码 (精简版):
func _spawn_attack_hitbox() -> void:
    var hitbox: Area2D = attack_hitbox_scene.instantiate()
    var d: float = 1.0 if facing_right else -1.0
    hitbox.position = position + Vector2(28.0 * d, -6.0)
    hitbox.damage = attack_light_damage
    get_tree().current_scene.add_child(hitbox)
    # 0.15s 后自动销毁 (attack_hitbox.gd 的 _ready 里有 timer)
"""
	print("\n核心代码:")
	print(code_snippet)

	print("✅ 攻击判定框 Demo 完成。")
	print("   实际效果: cd apps/game/blitz && 打开 Godot, 按 J 键出刀")


# ── 辅助: int → 3位二进制字符串 ──
func _to_bin(n: int) -> String:
	var bits: String = ""
	for i in range(2, -1, -1):
		bits += "1" if (n >> i) & 1 else "0"
	return bits
