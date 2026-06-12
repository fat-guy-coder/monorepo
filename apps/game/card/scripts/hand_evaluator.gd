extends Node
## HandEvaluator — 手牌评估器
## 评估德州扑克 7 张牌中的最佳 5 张组合，返回牌型等级和分数

# 牌型等级 (越大越强)
enum HandRank {
	HIGH_CARD = 0,
	ONE_PAIR = 1,
	TWO_PAIR = 2,
	THREE_OF_A_KIND = 3,
	STRAIGHT = 4,
	FLUSH = 5,
	FULL_HOUSE = 6,
	FOUR_OF_A_KIND = 7,
	STRAIGHT_FLUSH = 8,
	ROYAL_FLUSH = 9,
}

const HAND_NAMES: Array[String] = [
	"高牌", "一对", "两对", "三条", "顺子",
	"同花", "葫芦", "四条", "同花顺", "皇家同花顺"
]

class EvalResult:
	var rank: int = HandRank.HIGH_CARD
	var score: int = 0
	var best_five: Array[int] = []
	var name: String = "高牌"


func evaluate(hole_cards: Array[int], community_cards: Array[int]) -> EvalResult:
	var all_cards: Array[int] = []
	all_cards.append_array(hole_cards)
	all_cards.append_array(community_cards)

	var combos: Array[Array] = _get_combinations(all_cards, 5)
	var best: EvalResult = EvalResult.new()

	for combo: Array in combos:
		var r: EvalResult = _eval_five(combo)
		if r.score > best.score:
			best = r
		elif r.score == best.score and _compare_kickers(r.best_five, best.best_five) > 0:
			best = r

	return best


func _eval_five(cards: Array) -> EvalResult:
	var result: EvalResult = EvalResult.new()
	result.best_five = cards.duplicate()

	var ranks: Array[int] = []
	for c: int in cards:
		ranks.append(CardDeck.get_rank_value(c))
	ranks.sort()
	ranks.reverse()

	var suits: Array[int] = []
	for c: int in cards:
		suits.append(CardDeck.get_suit(c))

	var rank_counts: Dictionary = {}
	for r: int in ranks:
		rank_counts[r] = rank_counts.get(r, 0) + 1

	var counts: Array[Dictionary] = []
	for r: int in rank_counts:
		counts.append({"rank": r, "count": rank_counts[r]})
	counts.sort_custom(func(a: Dictionary, b: Dictionary): return a["count"] > b["count"] or (a["count"] == b["count"] and a["rank"] > b["rank"]))

	var is_flush: bool = _is_flush(suits)
	var straight_arr: Array = _is_straight(ranks)
	var is_straight_hand: bool = straight_arr[0]
	var straight_high: int = straight_arr[1]

	# 皇家同花顺
	if is_flush and is_straight_hand and straight_high == 14:
		result.rank = HandRank.ROYAL_FLUSH
		result.score = _make_score(HandRank.ROYAL_FLUSH, [14])
		result.name = "皇家同花顺"
		return result

	# 同花顺
	if is_flush and is_straight_hand:
		result.rank = HandRank.STRAIGHT_FLUSH
		result.score = _make_score(HandRank.STRAIGHT_FLUSH, [straight_high])
		result.name = "同花顺"
		return result

	# 四条
	if counts[0]["count"] == 4:
		var quad_rank: int = counts[0]["rank"]
		var kicker: int = counts[1]["rank"]
		result.rank = HandRank.FOUR_OF_A_KIND
		result.score = _make_score(HandRank.FOUR_OF_A_KIND, [quad_rank, kicker])
		result.name = "四条"
		return result

	# 葫芦
	if counts[0]["count"] == 3 and counts[1]["count"] == 2:
		var trips: int = counts[0]["rank"]
		var pair: int = counts[1]["rank"]
		result.rank = HandRank.FULL_HOUSE
		result.score = _make_score(HandRank.FULL_HOUSE, [trips, pair])
		result.name = "葫芦"
		return result

	# 同花
	if is_flush:
		result.rank = HandRank.FLUSH
		result.score = _make_score(HandRank.FLUSH, ranks)
		result.name = "同花"
		return result

	# 顺子
	if is_straight_hand:
		result.rank = HandRank.STRAIGHT
		result.score = _make_score(HandRank.STRAIGHT, [straight_high])
		result.name = "顺子"
		return result

	# 三条
	if counts[0]["count"] == 3:
		var trips: int = counts[0]["rank"]
		var kickers: Array = []
		for c: Dictionary in counts:
			if c["count"] == 1:
				kickers.append(c["rank"])
		kickers.sort()
		kickers.reverse()
		result.rank = HandRank.THREE_OF_A_KIND
		result.score = _make_score(HandRank.THREE_OF_A_KIND, [trips] + kickers)
		result.name = "三条"
		return result

	# 两对
	if counts[0]["count"] == 2 and counts[1]["count"] == 2:
		var r0: int = counts[0]["rank"]
		var r1: int = counts[1]["rank"]
		var high_pair: int = int(max(r0, r1))
		var low_pair: int = int(min(r0, r1))
		var kicker: int = counts[2]["rank"]
		result.rank = HandRank.TWO_PAIR
		result.score = _make_score(HandRank.TWO_PAIR, [high_pair, low_pair, kicker])
		result.name = "两对"
		return result

	# 一对
	if counts[0]["count"] == 2:
		var pair: int = counts[0]["rank"]
		var kickers: Array = []
		for c: Dictionary in counts:
			if c["count"] == 1:
				kickers.append(c["rank"])
		kickers.sort()
		kickers.reverse()
		result.rank = HandRank.ONE_PAIR
		result.score = _make_score(HandRank.ONE_PAIR, [pair] + kickers)
		result.name = "一对"
		return result

	# 高牌
	result.rank = HandRank.HIGH_CARD
	result.score = _make_score(HandRank.HIGH_CARD, ranks)
	result.name = "高牌"
	return result


func _is_flush(suits: Array[int]) -> bool:
	for s: int in suits:
		if s != suits[0]:
			return false
	return true


func _is_straight(ranks_sorted_desc: Array[int]) -> Array:
	var r: Array[int] = ranks_sorted_desc
	var is_normal: bool = true
	for i: int in range(4):
		if r[i] - r[i + 1] != 1:
			is_normal = false
			break
	if is_normal:
		return [true, r[0]]

	# A-2-3-4-5 (wheel)
	if r[0] == 14 and r[1] == 5 and r[2] == 4 and r[3] == 3 and r[4] == 2:
		return [true, 5]

	return [false, 0]


func _make_score(hand_rank: int, kickers: Array) -> int:
	var score: int = hand_rank << 20
	for i: int in range(min(kickers.size(), 5)):
		var kv: int = kickers[i]; score += kv << (16 - i * 4)
	return score


func _compare_kickers(cards_a: Array[int], cards_b: Array[int]) -> int:
	var ranks_a: Array[int] = []
	var ranks_b: Array[int] = []
	for c: int in cards_a:
		ranks_a.append(CardDeck.get_rank_value(c))
	for c: int in cards_b:
		ranks_b.append(CardDeck.get_rank_value(c))
	ranks_a.sort()
	ranks_a.reverse()
	ranks_b.sort()
	ranks_b.reverse()
	for i: int in range(5):
		if ranks_a[i] > ranks_b[i]:
			return 1
		if ranks_a[i] < ranks_b[i]:
			return -1
	return 0


func _get_combinations(items: Array, k: int) -> Array[Array]:
	var result: Array[Array] = []
	var combo: Array[int] = []
	_combo_backtrack(items, k, 0, combo, result)
	return result


func _combo_backtrack(items: Array, k: int, start: int, current: Array[int], result: Array[Array]) -> void:
	if current.size() == k:
		result.append(current.duplicate())
		return
	for i: int in range(start, items.size()):
		current.append(items[i])
		_combo_backtrack(items, k, i + 1, current, result)
		current.pop_back()
