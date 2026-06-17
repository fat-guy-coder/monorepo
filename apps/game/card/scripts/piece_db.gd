extends Node
## 棋子数据库——所有棋子定义

static func all_pieces() -> Array[PieceData]:
    var list: Array[PieceData] = []
    # ====== 1 费棋子 ======
    list.append(make("warrior_basic", "步兵", 1, 600, 55, 0.8, 1, "warrior", "tank", Color.DARK_GREEN))
    list.append(make("archer_basic", "弓箭手", 1, 400, 65, 1.2, 3, "elf", "ranger", Color.GREEN))
    list.append(make("mage_basic", "法师学徒", 1, 350, 70, 0.7, 3, "human", "mage", Color.SKY_BLUE))
    list.append(make("assassin_basic", "刺客", 1, 350, 80, 1.5, 1, "shadow", "assassin", Color.PURPLE))
    list.append(make("knight_basic", "骑士", 1, 700, 40, 0.7, 1, "human", "knight", Color.GRAY))
    # ====== 2 费棋子 ======
    list.append(make("berserker", "狂战士", 2, 700, 75, 1.0, 1, "orc", "warrior", Color.RED))
    list.append(make("priest", "牧师", 2, 450, 40, 0.8, 3, "human", "support", Color.GOLD))
    list.append(make("hunter", "猎手", 2, 450, 80, 1.3, 4, "elf", "ranger", Color.FOREST_GREEN))
    list.append(make("golem", "石魔像", 2, 1000, 30, 0.5, 1, "elemental", "tank", Color.SADDLE_BROWN))
    return list

static func make(pn: String, dn: String, c: int, hp: int, atk: int, aspd: float, rng: int, tribe: String, job: String, clr: Color) -> PieceData:
    var p := PieceData.new()
    p.piece_name = pn; p.display_name = dn; p.cost = c
    p.max_health = hp; p.attack = atk; p.attack_speed = aspd
    p.attack_range = rng; p.tribe = tribe; p.job = job; p.icon_color = clr
    return p

## 按费用返回棋子池（用于商店刷新）
static func pool_by_cost(cost: int) -> Array[PieceData]:
    var result: Array[PieceData] = []
    for p: PieceData in all_pieces():
        if p.cost == cost:
            result.append(p)
    return result