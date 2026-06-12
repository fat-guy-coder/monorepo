extends Node
## BotAI — Bot 决策系统
## 基于手牌强度评估 + 底池赔率做决策

## 核心决策函数
static func decide(
	player: Object,
	_all_players: Array,
	community_cards: Array[int],
	pot: int,
	current_bet: int,
	phase: int
) -> Dictionary:
	var to_call: int = current_bet - player.current_bet
	var hand_strength: float = _evaluate_hand_strength(player.hole_cards, community_cards, phase)
	var pot_odds: float = 0.0
	if pot + to_call > 0:
		pot_odds = float(to_call) / float(pot + to_call)

	var rng: float = randf_range(0.9, 1.1)
	var adjusted_strength: float = clamp(hand_strength * rng, 0.0, 1.0)

	# 无下注 → check 或 bet
	if to_call == 0:
		if adjusted_strength > 0.7 and player.chips > 20:
			return _make_raise(player, current_bet, adjusted_strength)
		elif adjusted_strength > 0.4 and randf() < 0.3 and player.chips > 20:
			return _make_raise(player, current_bet, adjusted_strength)
		else:
			return {"action": "check", "amount": 0}

	# 需要跟注
	if adjusted_strength > 0.85:
		return _make_raise(player, current_bet, adjusted_strength)

	if adjusted_strength > 0.6:
		if adjusted_strength > 0.75 and randf() < 0.3 and player.chips > to_call * 2:
			return _make_raise(player, current_bet, adjusted_strength)
		return _make_call(player, to_call)

	if adjusted_strength > 0.4:
		if pot_odds < 0.3:
			return _make_call(player, to_call)
		elif randf() < 0.4:
			return _make_call(player, to_call)
		else:
			return _make_fold()

	if adjusted_strength > 0.2 and randf() < 0.15 and to_call < player.chips * 0.3:
		if randf() < 0.5:
			return _make_raise(player, current_bet, 0.5)
		return _make_call(player, to_call)

	return _make_fold()


static func _evaluate_hand_strength(hole: Array[int], community: Array[int], phase: int) -> float:
	if hole.size() < 2:
		return 0.0

	var r1: int = CardDeck.get_rank_value(hole[0])
	var r2: int = CardDeck.get_rank_value(hole[1])
	var suited: bool = CardDeck.get_suit(hole[0]) == CardDeck.get_suit(hole[1])
	var paired: bool = r1 == r2
	var high: int = int(max(r1, r2))
	var low: int = int(min(r1, r2))

	if community.is_empty():
		var strength: float = 0.0
		if paired:
			strength = 0.5 + (float(r1 - 2) / 12.0) * 0.45
		else:
			strength = 0.2 + (float(high - 2) / 12.0) * 0.3 + (float(low - 2) / 12.0) * 0.1
			if suited:
				strength += 0.08
			if abs(r1 - r2) <= 2:
				strength += 0.05
		return clamp(strength, 0.0, 1.0)
	else:
		var eval_result = HandEvaluator.evaluate(hole, community)
		var rank: int = eval_result.rank
		var score: int = eval_result.score

		match rank:
			HandEvaluator.HandRank.ROYAL_FLUSH: return 1.0
			HandEvaluator.HandRank.STRAIGHT_FLUSH: return 0.98
			HandEvaluator.HandRank.FOUR_OF_A_KIND: return 0.95
			HandEvaluator.HandRank.FULL_HOUSE: return 0.9
			HandEvaluator.HandRank.FLUSH: return 0.78 + _kicker_bonus(score) * 0.12
			HandEvaluator.HandRank.STRAIGHT: return 0.72 + _kicker_bonus(score) * 0.1
			HandEvaluator.HandRank.THREE_OF_A_KIND: return 0.6 + _kicker_bonus(score) * 0.1
			HandEvaluator.HandRank.TWO_PAIR: return 0.5 + _kicker_bonus(score) * 0.08
			HandEvaluator.HandRank.ONE_PAIR: return 0.3 + _kicker_bonus(score) * 0.15
			HandEvaluator.HandRank.HIGH_CARD: return _high_card_strength(hole, community, high)
		return 0.0


static func _kicker_bonus(_score: int) -> float:
	return 0.5


static func _high_card_strength(hole: Array[int], community: Array[int], _high: int) -> float:
	var best_rank: int = 0
	for c: int in hole:
		best_rank = int(max(best_rank, CardDeck.get_rank_value(c)))
	var has_flush_draw: bool = _check_flush_draw(hole, community)
	var has_straight_draw: bool = _check_straight_draw(hole, community)

	var strength: float = 0.05 + float(best_rank - 2) / 12.0 * 0.15
	if has_flush_draw:
		strength += 0.1
	if has_straight_draw:
		strength += 0.08
	return clamp(strength, 0.0, 1.0)


static func _check_flush_draw(hole: Array[int], community: Array[int]) -> bool:
	var suits_count: Dictionary = {}
	for c: int in hole + community:
		var s: int = CardDeck.get_suit(c)
		suits_count[s] = suits_count.get(s, 0) + 1
	for s: int in suits_count:
		if suits_count[s] >= 4:
			return true
	return false


static func _check_straight_draw(hole: Array[int], community: Array[int]) -> bool:
	var ranks_dict: Dictionary = {}
	for c: int in hole + community:
		var r: int = CardDeck.get_rank_value(c)
		ranks_dict[r] = true

	var sorted: Array[int] = []
	for r: int in ranks_dict:
		sorted.append(r)
	sorted.sort()

	for i: int in range(sorted.size() - 3):
		if sorted[i + 3] - sorted[i] <= 4:
			return true

	if 14 in ranks_dict and 2 in ranks_dict and 3 in ranks_dict and 4 in ranks_dict:
		return true

	return false


static func _make_fold() -> Dictionary:
	return {"action": "fold", "amount": 0}


static func _make_call(_player: Object, amount: int) -> Dictionary:
	return {"action": "call", "amount": amount}


static func _make_raise(player: Object, current_bet: int, strength: float) -> Dictionary:
	var raise_size: int = 0
	if current_bet == 0:
		raise_size = 20 + int(strength * 80)
	else:
		var multiplier: float = 2.0 + strength * 2.0
		raise_size = int(float(current_bet) * multiplier) - player.current_bet

	raise_size = clamp(raise_size, 10, player.chips)
	if raise_size >= player.chips:
		return {"action": "all_in", "amount": player.chips}

	return {"action": "raise", "amount": current_bet + raise_size}
