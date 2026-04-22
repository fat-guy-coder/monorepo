# Python 变量定义方式

# 1. 基本赋值
name = "Alice"
age = 20
height = 1.68
is_student = True

# 2. 多个变量同时赋值
a, b, c = 1, 2, 3

# 3. 相同值同时赋值
x = y = z = 0

# 4. 字符串定义
city = '北京'          # 单引号
country = "中国"        # 双引号
sentence = """这是
一个多行
字符串"""              # 三引号

# 5. 数字类型
int_num = 42           # 整数
float_num = 3.14      # 浮点数
complex_num = 1 + 2j  # 复数

# 6. 布尔值
is_active = True
is_deleted = False

# 7. 空值
result = None

# 8. 列表（可修改）
fruits = ["苹果", "香蕉", "橙子"]
mixed_list = [1, "你好", True, 3.14]

# 9. 元组（不可修改）
coordinates = (10, 20)
point = (1, 2, 3)

# 10. 字典（键值对）
person = {
    "name": "小明",
    "age": 18,
    "city": "上海"
}

# 11. 集合（无序、不重复）
colors = {"红色", "绿色", "蓝色"}
unique_nums = {1, 2, 3, 3, 3}  # 自动去重

# 12. 类型转换
num_str = "123"
num_int = int(num_str)        # 字符串转整数
num_float = float(num_str)     # 字符串转浮点数
str_from_int = str(456)        # 整数转字符串

# 打印输出
print("=== 基本变量 ===")
print(f"姓名: {name}, 年龄: {age}, 身高: {height}m")
print(f"是否学生: {is_student}")

print("\n=== 多变量赋值 ===")
print(f"a={a}, b={b}, c={c}")

print("\n=== 字符串 ===")
print(f"城市: {city}")
print(f"国家: {country}")
print(f"多行字符串: {sentence}")

print("\n=== 数字类型 ===")
print(f"整数: {int_num}, 浮点数: {float_num}, 复数: {complex_num}")

print("\n=== 布尔值 ===")
print(f"活跃: {is_active}, 已删除: {is_deleted}")

print("\n=== 空值 ===")
print(f"结果: {result}")

print("\n=== 列表 ===")
print(f"水果: {fruits}")
print(f"混合列表: {mixed_list}")

print("\n=== 元组 ===")
print(f"坐标: {coordinates}")

print("\n=== 字典 ===")
print(f"人员信息: {person}")
print(f"姓名: {person['name']}")

print("\n=== 集合 ===")
print(f"颜色: {colors}")
print(f"去重集合: {unique_nums}")

print("\n=== 类型转换 ===")
print(f"字符串转整数: {num_int} (类型: {type(num_int).__name__})")
print(f"字符串转浮点数: {num_float} (类型: {type(num_float).__name__})")
print(f"整数转字符串: {str_from_int} (类型: {type(str_from_int).__name__})")

# 查看变量类型
print("\n=== 变量类型查看 ===")
print(f"age 类型: {type(age)}")
print(f"height 类型: {type(height)}")
print(f"name 类型: {type(name)}")
print(f"fruits 类型: {type(fruits)}")
