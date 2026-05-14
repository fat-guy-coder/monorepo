# Python 运算符详解

# ========== 算术运算符 ==========

print("=== 算术运算符 ===")

a, b = 10, 3

# 加减乘除
print(f"{a} + {b} = {a + b}")   # 13
print(f"{a} - {b} = {a - b}")   # 7
print(f"{a} * {b} = {a * b}")   # 30
print(f"{a} / {b} = {a / b}")   # 3.333... (总是浮点数)

# 整除（向下取整）
print(f"{a} // {b} = {a // b}")  # 3

# 取余（模运算）
print(f"{a} % {b} = {a % b}")    # 1

# 幂运算
print(f"{a} ** {b} = {a ** b}")  # 1000 (10的3次方)

# 负数除法
print(f"-7 // 3 = {-7 // 3}")    # -3 (向下取整)
print(f"-7 % 3 = {-7 % 3}")      # 2  (始终与除数同号)

# 复数运算
c1 = 2 + 3j
c2 = 1 - 1j
print(f"复数: {c1} + {c2} = {c1 + c2}")
print(f"复数: {c1} * {c2} = {c1 * c2}")


# ========== 比较运算符 ==========

print("\n=== 比较运算符 ===")

x, y = 5, 10

print(f"{x} == {y}: {x == y}")   # False (等于)
print(f"{x} != {y}: {x != y}")   # True  (不等于)
print(f"{x} < {y}: {x < y}")    # True  (小于)
print(f"{x} > {y}: {x > y}")    # False (大于)
print(f"{x} <= {y}: {x <= y}")  # True  (小于等于)
print(f"{x} >= {y}: {x >= y}")  # False (大于等于)

# 链式比较
age = 25
print(f"18 <= {age} <= 60: {18 <= age <= 60}")  # True

# 字符串比较（按字典序）
print(f"'apple' < 'banana': {'apple' < 'banana'}")
print(f"'apple' == 'apple': {'apple' == 'apple'}")

# 列表比较
print(f"[1, 2, 3] < [1, 2, 4]: {[1, 2, 3] < [1, 2, 4]}")


# ========== 赋值运算符 ==========

print("\n=== 赋值运算符 ===")

n = 10
print(f"初始值: n = {n}")

n += 5
print(f"n += 5  -> n = {n}")   # 15

n -= 3
print(f"n -= 3  -> n = {n}")   # 12

n *= 2
print(f"n *= 2  -> n = {n}")   # 24

n /= 4
print(f"n /= 4  -> n = {n}")   # 6.0

n //= 2
print(f"n //= 2 -> n = {n}")   # 3.0

n %= 2
print(f"n %= 2  -> n = {n}")   # 1.0

n **= 3
print(f"n **= 3 -> n = {n}")   # 1.0


# ========== 逻辑运算符 ==========

print("\n=== 逻辑运算符 ===")

# and: 两者都为 True 才为 True
print(f"True and True: {True and True}")    # True
print(f"True and False: {True and False}")  # False

# or: 两者有一个为 True 就为 True
print(f"True or False: {True or False}")     # True
print(f"False or False: {False or False}")  # False

# not: 取反
print(f"not True: {not True}")              # False
print(f"not False: {not False}")            # True

# 短路运算
a = 5
print(f"a > 0 and a < 10: {a > 0 and a < 10}")  # True

# 0 是 False，非零是 True
print(f"0 and 5: {0 and 5}")        # 0
print(f"5 and 0: {5 and 0}")        # 0
print(f"5 and 3: {5 and 3}")        # 3 (返回最后一个真值)

# None 和空字符串是 False
print(f"None or 'default': {None or 'default'}")  # 'default'
print(f"'' or 'default': {'' or 'default'}")        # 'default'


# ========== 位运算符 ==========

print("\n=== 位运算符 ===")

x, y = 5, 3  # 二进制: 101 & 011

# 按位与 &: 两位都为1才为1
print(f"{x} & {y} = {x & y}")   # 1 (001)

# 按位或 |: 任一位为1就为1
print(f"{x} | {y} = {x | y}")   # 7 (111)

# 按位异或 ^: 两位不同为1
print(f"{x} ^ {y} = {x ^ y}")   # 6 (110)

# 按位取反 ~: 0变1, 1变0
print(f"~{x} = {~x}")           # -6

# 左移 <<: 相当于乘以2的n次方
print(f"{x} << 1 = {x << 1}")  # 10 (1010)
print(f"{x} << 2 = {x << 2}")  # 20 (10100)

# 右移 >>: 相当于除以2的n次方（向下取整）
print(f"{x} >> 1 = {x >> 1}")  # 2 (10)
print(f"{x} >> 2 = {x >> 2}")  # 1 (1)

# 常用技巧
# 判断奇偶
num = 7
print(f"{num} 是奇数: {num & 1 == 1}")
print(f"{num} 是偶数: {num & 1 == 0}")

# 快速乘除2
print(f"{num} * 2 = {num << 1}")
print(f"{num} // 2 = {num >> 1}")


# ========== 成员运算符 ==========

print("\n=== 成员运算符 ===")

# in: 检查值是否在序列中
fruits = ["苹果", "香蕉", "橙子"]
print(f"'香蕉' in {fruits}: {'香蕉' in fruits}")     # True
print(f"'葡萄' in {fruits}: {'葡萄' in fruits}")     # False

# 字符串
print(f"'ell' in 'hello': {'ell' in 'hello'}")       # True
print(f"'world' in 'hello': {'world' in 'hello'}")   # False

# 字典：检查的是键
person = {"name": "小明", "age": 20}
print(f"'name' in person: {'name' in person}")       # True
print(f"'小明' in person: {'小明' in person}")       # False (检查键，不是值)

# not in
print(f"'葡萄' not in fruits: {'葡萄' not in fruits}")  # True


# ========== 身份运算符 ==========

print("\n=== 身份运算符 ===")

# is: 检查两个对象是否是同一个对象（内存地址相同）
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(f"a is b: {a is b}")     # False (不同对象，内容相同)
print(f"a is c: {a is c}")     # True  (同一个对象)

# is not
print(f"a is not b: {a is not b}")  # True

# 常用场景：判断是否为 None
x = None
y = []
print(f"x is None: {x is None}")      # True
print(f"y is not None: {y is not None}")  # True (空列表不是 None)

# 小整数池（-5 到 256）
n1 = 257
n2 = 257
print(f"n1 is n2 (257): {n1 is n2}")  # False (超出池范围)

n1 = 256
n2 = 256
print(f"n1 is n2 (256): {n1 is n2}")  # True (在池范围内)


# ========== 条件表达式（三元运算符）==========

print("\n=== 条件表达式 ===")

age = 20

# 基本语法: 值1 if 条件 else 值2
status = "成年" if age >= 18 else "未成年"
print(f"{age}岁: {status}")

# 嵌套三元
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 60 else "D"
print(f"{score}分: 等级{grade}")

# 简化赋值
haha = 1 if age >= 18 else 0
print(f"haha = {haha}")

# 短表达式
is_valid = True
value = is_valid and "有效" or "无效"
print(f"value = {value}")  # "有效"


# ========== 运算符优先级（从高到低）==========

print("\n=== 运算符优先级 ===")

# 1. ** (幂运算，最高)
print(f"2 ** 3 ** 2 = {2 ** 3 ** 2}")   # 2 ** 9 = 512 (右结合)
print(f"(2 ** 3) ** 2 = {(2 ** 3) ** 2}")  # 8 ** 2 = 64

# 2. ~ + - (取反、一元加减)
print(f"-2 ** 2 = {-2 ** 2}")  # -(2**2) = -4
print(f"(-2) ** 2 = {(-2) ** 2}")  # 4

# 3. * / // %
print(f"10 - 2 * 3 = {10 - 2 * 3}")   # 10 - 6 = 4

# 4. + -
print(f"10 - 2 + 3 = {10 - 2 + 3}")   # 11

# 5. << >>
# 6. & (位与)
# 7. ^ | (异或、或)
# 8. <= < > >=
# 9. == !=
# 10. = += -= 等赋值运算
# 11. is, is not
# 12. in, not in
# 13. not, and, or (逻辑，最低)

# 实际建议：不确定时加括号
result = (10 + 2) * 3 ** 2 / 6 - 1
print(f"(10 + 2) * 3 ** 2 / 6 - 1 = {result}")
