extends Node
## CardDeck — 牌堆管理
## 负责创建一副标准 52 张扑克牌、洗牌、发牌

# 花色: 0=♠黑桃 1=♥红心 2=♣梅花 3=♦方块
enum Suit { SPADE = 0, HEART = 1, CLUB = 2, DIAMOND = 3 }

const SUIT_NAMES: Array[String] = ["♠", "♥", "♣", "♦"]
const SUIT_COLORS: Array[Color] = [Color.BLACK, Color.RED, Color.BLACK, Color.RED]
const RANK_NAMES: Array[String] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const RANK_VALUES: Array[int] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]  # A=14 最大

# 牌用 int 表示: suit * 13 + rank
# 0-12: ♠2-A, 13-25: ♥2-A, 26-38: ♣2-A, 39-51: ♦2-A

var deck: Array[int] = []
var discard_pile: Array[int] = []


func _ready() -> void:
	_create_deck()


func _create_deck() -> void:
	deck.clear()
	for i in range(52):
		deck.append(i)


func shuffle() -> void:
	_create_deck()
	var n: int = deck.size()
	for i in range(n - 1, 0, -1):
		var j: int = randi() % (i + 1)
		var tmp: int = deck[i]
		deck[i] = deck[j]
		deck[j] = tmp


func deal_one() -> int:
	if deck.is_empty():
		return -1
	return deck.pop_back()


func deal_many(count: int) -> Array[int]:
	var cards: Array[int] = []
	for _i in range(count):
		if deck.is_empty():
			break
		cards.append(deck.pop_back())
	return cards


static func get_suit(card_id: int) -> int:
	return card_id / 13


static func get_rank_index(card_id: int) -> int:
	return card_id % 13


static func get_rank_value(card_id: int) -> int:
	return RANK_VALUES[card_id % 13]


static func get_card_name(card_id: int) -> String:
	var idx: int = get_rank_index(card_id)
	var rank: String = RANK_NAMES[idx]
	var suit: String = SUIT_NAMES[get_suit(card_id)]
	return rank + suit


static func is_red(card_id: int) -> bool:
	return get_suit(card_id) in [Suit.HEART, Suit.DIAMOND]


static func get_suit_color(card_id: int) -> Color:
	return SUIT_COLORS[get_suit(card_id)]
