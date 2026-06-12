extends Node
## GameController — 游戏主控制器 (Autoload)
## 管理德州扑克完整游戏流程: 发牌 → 下注轮 → 摊牌

# 游戏阶段
enum Phase {
	WAITING,
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	ROUND_OVER,
}

enum PlayerStatus {
	ACTIVE,
	FOLDED,
	ALL_IN,
	OUT,
}

# 玩家数据
class Player:
	var id: int = 0
	var name: String = ""
	var is_human: bool = false
	var chips: int = 1000
	var hole_cards: Array[int] = []
	var status: int = PlayerStatus.ACTIVE
	var current_bet: int = 0
	var total_bet: int = 0
	var best_hand: String = ""

	func reset_round() -> void:
		hole_cards.clear()
		status = PlayerStatus.ACTIVE if chips > 0 else PlayerStatus.OUT
		current_bet = 0
		total_bet = 0
		best_hand = ""


# 信号
signal game_started()
signal phase_changed(phase: int)
signal cards_dealt()
signal community_updated()
signal betting_round_started()
signal player_acted(player_id: int, action: String, amount: int)
signal pot_updated(pot: int)
signal showdown_complete(winners: Array)
signal game_message(msg: String)


# 游戏配置
var bot_count: int = 4
var small_blind: int = 10
var big_blind: int = 20
var starting_chips: int = 1000

# 游戏状态
var players: Array = []  # Array[Player]
var community_cards: Array[int] = []
var pot: int = 0
var current_phase: int = Phase.WAITING
var dealer_index: int = 0
var current_player_index: int = 0
var current_bet_amount: int = 0
var min_raise: int = 20
var active_players_count: int = 0


func _ready() -> void:
	pass


func start_game(bots: int = 4) -> void:
	bot_count = bots
	players.clear()
	community_cards.clear()
	pot = 0
	current_phase = Phase.WAITING
	dealer_index = 0
	current_bet_amount = 0
	min_raise = big_blind

	var human: Player = Player.new()
	human.id = 0
	human.name = "你"
	human.is_human = true
	human.chips = starting_chips
	players.append(human)

	for i in range(bot_count):
		var bot: Player = Player.new()
		bot.id = i + 1
		bot.name = _get_bot_name(i)
		bot.is_human = false
		bot.chips = starting_chips
		players.append(bot)

	dealer_index = randi() % players.size()
	game_started.emit()
	_begin_round()


func _begin_round() -> void:
	community_cards.clear()
	pot = 0
	current_bet_amount = big_blind
	min_raise = big_blind

	dealer_index = (dealer_index + 1) % players.size()

	for p: Player in players:
		p.reset_round()

	for p: Player in players:
		if p.chips > 0:
			p.status = PlayerStatus.ACTIVE
	active_players_count = _count_active()

	CardDeck.shuffle()

	for p: Player in players:
		if p.status != PlayerStatus.OUT:
			p.hole_cards = [CardDeck.deal_one(), CardDeck.deal_one()]

	_take_blinds()

	game_message.emit("新一局开始!")
	cards_dealt.emit()
	current_phase = Phase.PRE_FLOP
	phase_changed.emit(current_phase)

	var bb_index: int = (dealer_index + 2) % players.size()
	current_player_index = _find_next_active((bb_index + 1) % players.size())

	if active_players_count <= 1:
		_go_showdown()
		return

	betting_round_started.emit()

	var p: Player = players[current_player_index]
	if not p.is_human:
		_do_bot_action(current_player_index)


func _take_blinds() -> void:
	var sb_index: int = (dealer_index + 1) % players.size()
	var bb_index: int = (dealer_index + 2) % players.size()

	var sb_player: Player = players[sb_index]
	var sb_amount: int = int(min(small_blind, sb_player.chips))
	sb_player.chips -= sb_amount
	sb_player.current_bet = sb_amount
	sb_player.total_bet = sb_amount
	pot += sb_amount

	var bb_player: Player = players[bb_index]
	var bb_amount: int = int(min(big_blind, bb_player.chips))
	bb_player.chips -= bb_amount
	bb_player.current_bet = bb_amount
	bb_player.total_bet = bb_amount
	pot += bb_amount

	current_bet_amount = bb_amount


func player_action(action: String, amount: int = 0) -> void:
	var player: Player = players[current_player_index]
	match action:
		"fold":
			player.status = PlayerStatus.FOLDED
			active_players_count = _count_active()
			player_acted.emit(player.id, "fold", 0)
			game_message.emit(player.name + " 弃牌")
		"check":
			player_acted.emit(player.id, "check", 0)
			game_message.emit(player.name + " 看牌")
		"call":
			var call_amount: int = current_bet_amount - player.current_bet
			call_amount = int(min(call_amount, player.chips))
			player.chips -= call_amount
			player.current_bet += call_amount
			player.total_bet += call_amount
			pot += call_amount
			if player.chips == 0:
				player.status = PlayerStatus.ALL_IN
			player_acted.emit(player.id, "call", call_amount)
			game_message.emit(player.name + " 跟注 " + str(call_amount))
		"raise":
			var needed: int = amount - player.current_bet
			needed = int(min(needed, player.chips))
			player.chips -= needed
			player.current_bet += needed
			player.total_bet += needed
			pot += needed
			current_bet_amount = player.current_bet
			min_raise = amount - current_bet_amount
			if player.chips == 0:
				player.status = PlayerStatus.ALL_IN
			player_acted.emit(player.id, "raise", needed)
			game_message.emit(player.name + " 加注到 " + str(amount))
		"all_in":
			var all_in_amount: int = player.chips
			player.chips = 0
			player.current_bet += all_in_amount
			player.total_bet += all_in_amount
			pot += all_in_amount
			player.status = PlayerStatus.ALL_IN
			if player.current_bet > current_bet_amount:
				current_bet_amount = player.current_bet
			player_acted.emit(player.id, "all_in", all_in_amount)
			game_message.emit(player.name + " 全押 " + str(all_in_amount) + "!")

	pot_updated.emit(pot)

	active_players_count = _count_active()
	if active_players_count <= 1:
		_go_showdown()
		return

	if _is_round_complete():
		_advance_phase()
	else:
		_advance_player()


func _advance_player() -> void:
	current_player_index = _find_next_active((current_player_index + 1) % players.size())

	while players[current_player_index].status == PlayerStatus.OUT:
		current_player_index = (current_player_index + 1) % players.size()

	var p: Player = players[current_player_index]
	if not p.is_human:
		await get_tree().create_timer(0.8).timeout
		_do_bot_action(current_player_index)


func _advance_phase() -> void:
	match current_phase:
		Phase.PRE_FLOP:
			current_phase = Phase.FLOP
			CardDeck.deal_one()
			community_cards.append_array([CardDeck.deal_one(), CardDeck.deal_one(), CardDeck.deal_one()])
		Phase.FLOP:
			current_phase = Phase.TURN
			CardDeck.deal_one()
			community_cards.append(CardDeck.deal_one())
		Phase.TURN:
			current_phase = Phase.RIVER
			CardDeck.deal_one()
			community_cards.append(CardDeck.deal_one())
		Phase.RIVER:
			_go_showdown()
			return

	community_updated.emit()
	phase_changed.emit(current_phase)
	game_message.emit(_phase_name(current_phase) + " — 新一轮下注")

	for p: Player in players:
		p.current_bet = 0
	current_bet_amount = 0

	current_player_index = _find_next_active((dealer_index + 1) % players.size())
	betting_round_started.emit()

	if active_players_count <= 1:
		_go_showdown()
		return

	var p: Player = players[current_player_index]
	if not p.is_human:
		await get_tree().create_timer(0.6).timeout
		_do_bot_action(current_player_index)


func _go_showdown() -> void:
	current_phase = Phase.SHOWDOWN
	phase_changed.emit(current_phase)
	_evaluate_showdown()


func _evaluate_showdown() -> void:
	while community_cards.size() < 5:
		community_cards.append(CardDeck.deal_one())

	var best_score: int = -1
	var winners: Array = []

	for p: Player in players:
		if p.status == PlayerStatus.FOLDED or p.status == PlayerStatus.OUT:
			continue
		if p.hole_cards.size() < 2:
			continue

		var eval: HandEvaluator.EvalResult = HandEvaluator.evaluate(p.hole_cards, community_cards)
		p.best_hand = eval.name

		if eval.score > best_score:
			best_score = eval.score
			winners.clear()
			winners.append(p)
		elif eval.score == best_score:
			winners.append(p)

	if not winners.is_empty():
		var split: int = pot / winners.size()
		var remainder: int = pot % winners.size()
		for w: Player in winners:
			w.chips += split
		if remainder > 0:
			var first: Player = winners[0]
			first.chips += remainder

		var names: Array[String] = []
		for w: Player in winners:
			names.append(w.name + "(" + w.best_hand + ")")
		game_message.emit("胜者: " + ", ".join(names) + "  赢得 " + str(pot) + " 筹码!")
		showdown_complete.emit(winners)

	pot = 0
	pot_updated.emit(0)

	for p: Player in players:
		if p.chips <= 0:
			p.status = PlayerStatus.OUT

	current_phase = Phase.ROUND_OVER
	phase_changed.emit(current_phase)

	await get_tree().create_timer(2.5).timeout

	var active_bots: int = 0
	for p: Player in players:
		if not p.is_human and p.chips > 0:
			active_bots += 1

	if active_bots == 0:
		game_message.emit("🎉 你赢了! 所有 bot 已淘汰!")
		current_phase = Phase.WAITING
		phase_changed.emit(current_phase)
	else:
		_begin_round()


func _do_bot_action(bot_index: int) -> void:
	var bot: Player = players[bot_index]
	if bot.status != PlayerStatus.ACTIVE:
		_advance_player()
		return

	var decision: Dictionary = BotAI.decide(bot, players, community_cards, pot, current_bet_amount, current_phase)
	player_action(decision["action"], decision["amount"])


func human_fold() -> void: player_action("fold")
func human_check() -> void: player_action("check")
func human_call() -> void: player_action("call")
func human_raise(amount: int) -> void: player_action("raise", amount)
func human_all_in() -> void: player_action("all_in")


func _find_next_active(start_index: int) -> int:
	var idx: int = start_index
	for _i in range(players.size()):
		var p: Player = players[idx]
		if p.status in [PlayerStatus.ACTIVE, PlayerStatus.ALL_IN]:
			return idx
		idx = (idx + 1) % players.size()
	return start_index


func _count_active() -> int:
	var count: int = 0
	for p: Player in players:
		if p.status in [PlayerStatus.ACTIVE, PlayerStatus.ALL_IN]:
			count += 1
	return count


func _is_round_complete() -> bool:
	for p: Player in players:
		if p.status == PlayerStatus.ACTIVE:
			if p.current_bet < current_bet_amount:
				return false
	return true


func _phase_name(phase: int) -> String:
	match phase:
		Phase.PRE_FLOP: return "翻牌前"
		Phase.FLOP: return "翻牌"
		Phase.TURN: return "转牌"
		Phase.RIVER: return "河牌"
		_: return ""


func _get_bot_name(index: int) -> String:
	var names: Array[String] = ["铁皮", "鲨鱼", "老千", "赌神", "黑桃A", "幸运星", "暴脾气", "冷面"]
	if index < names.size():
		return names[index]
	return "Bot" + str(index + 1)


func get_available_actions() -> Dictionary:
	var player: Player = players[current_player_index]
	var to_call: int = current_bet_amount - player.current_bet

	var actions: Dictionary = {
		"can_fold": to_call > 0,
		"can_check": to_call == 0,
		"can_call": to_call > 0 and to_call < player.chips,
		"can_raise": player.chips > to_call + min_raise,
		"can_all_in": player.chips > 0,
		"call_amount": int(min(to_call, player.chips)),
		"min_raise_to": current_bet_amount + min_raise,
	}
	return actions
