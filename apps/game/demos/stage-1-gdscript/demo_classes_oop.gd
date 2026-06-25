extends Node
## 类与面向对象 Demo —— class / extends / inner class
## TS: class A extends B {} / Python: class A(B):

func _ready() -> void:
	print("========== 类与 OOP Demo ==========")

	# === 一个 .gd 文件 = 一个类 ===
	# 当前文件 extends Node，这就是一个类
	# class_name 让它全局可用

	# === 内部类 ===
	var sword := Weapon.new("Sword", 10, 30)
	var bow := Weapon.new("Bow", 7, 50)
	print("武器: %s, atk=%d, range=%d" % [sword.name, sword.attack, sword.attack_range])
	print("武器: %s, atk=%d, range=%d" % [bow.name, bow.attack, bow.attack_range])
	# 输出: 武器: Sword, atk=10, range=30
	#       武器: Bow, atk=7, range=50

	# === 继承 ===
	var goblin := Enemy.new("Goblin", 80, sword)
	print("\n敌人: %s, hp=%d, 武器=%s" % [goblin.name, goblin.health, goblin.weapon.name])
	goblin.take_damage(30)
	print("受伤后 hp=%d" % goblin.health)
	goblin.take_damage(60)
	# 输出: 敌人: Goblin, hp=80, 武器=Sword
	#       受伤后 hp=50
	#       Goblin 被击败！

	print("\n✅ 类与 OOP Demo 完成。")

# === 内部类（和 Python 内部类一样） ===
class Weapon:
	var name: String
	var attack: int
	var attack_range: int
	func _init(n: String, atk: int, rng: int) -> void:
		name = n; attack = atk; attack_range = rng

class Enemy:
	var name: String
	var health: int
	var weapon: Weapon
	func _init(n: String, hp: int, wp: Weapon) -> void:
		name = n; health = hp; weapon = wp
	func take_damage(amount: int) -> void:
		health -= amount
		if health <= 0:
			die()
	func die() -> void:
		print(name, " 被击败！")
