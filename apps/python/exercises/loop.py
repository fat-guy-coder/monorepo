# Python 循环语法示例

# ========== for 循环 ==========
# 基本用法
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 遍历字符串
for char in "Python":
    print(char)

# 使用 enumerate 获取索引
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# ========== while 循环 ==========
count = 0
while count < 5:
    print(count)
    count += 1

# while + break
i = 0
while True:
    print(i)
    i += 1
    if i >= 3:
        break

# while + continue
i = 0
while i < 5:
    i += 1
    if i == 3:
        continue  # 跳过 3
    print(i)

# =========== 循环 else 子句 ===========
# for 循环正常结束时会执行 else
for i in range(3):
    print(i)
else:
    print("循环正常结束")

# break 会跳过 else
for i in range(3):
    if i == 1:
        break
    print(i)
else:
    print("不会执行")

# =========== 列表推导式 ===========
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# 带条件过滤
even_squares = [x**2 for x in range(5) if x % 2 == 0]
print(even_squares)  # [0, 4, 16]

# 嵌套循环
pairs = [(x, y) for x in range(3) for y in range(3)]
print(pairs)  # [(0,0), (0,1), (0,2), (1,0), ...]

# =========== 字典推导式 ===========
words = ["apple", "banana", "cherry"]
word_lengths = {word: len(word) for word in words}
print(word_lengths)  # {'apple': 5, 'banana': 6, 'cherry': 6}

# =========== 集合推导式 ==========
nums = [1, 2, 2, 3, 3, 3]
unique_squares = {x**2 for x in nums}
print(unique_squares)  # {1, 4, 9}

# =========== zip 遍历 ==========
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name}: {age}")

# =========== 生成器表达式 ==========
# 类似列表推导式，但惰性求值
gen = (x**2 for x in range(5))
for val in gen:
    print(val)
