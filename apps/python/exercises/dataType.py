"""
Python 数据类型完整指南
"""

# ==================== 基础数据类型 ====================

# ---------- 1. 整数 (int) ----------
# Python3 整数没有大小限制（理论上），支持任意精度
age = 18
negative_num = -10
hex_num = 0xFF        # 十六进制（0x 开头）
oct_num = 0o77         # 八进制（0o 开头）
bin_num = 0b1010       # 二进制（0b 开头）

# 注意：整数运算结果是整数，除法 / 返回浮点数，整除用 //
print(f"10 / 3 = {10 / 3}")      # 3.333... 浮点数
print(f"10 // 3 = {10 // 3}")    # 3  整数除法

# ---------- 2. 浮点数 (float) ----------
# 浮点数精度有限，避免用 == 比较两个浮点数
price = 19.9
scientific = 1.5e-3   # 科学计数法 = 0.0015

# 注意：浮点数精度问题
result = 0.1 + 0.2
print(f"0.1 + 0.2 = {result}")  # 可能是 0.30000000000000004
print(f"abs(0.1+0.2 - 0.3) < 0.0001")  # 用 abs() 比较

# ---------- 3. 布尔值 (bool) ----------
# True 和 False，本质是 int 的子类，True=1，False=0
is_active = True
is_empty = False

# 布尔值转换：bool() 可将任意值转为布尔值
print(f"bool(1) = {bool(1)}")      # True
print(f"bool(0) = {bool(0)}")      # False
print(f"bool('') = {bool('')}")    # False（空字符串）
print(f"bool(' ') = {bool(' ')}")  # True（非空字符串）
print(f"bool([]) = {bool([])}")    # False（空列表）
print(f"bool(None) = {bool(None)}")  # False

# ---------- 4. 复数 (complex) ----------
# 复数由实部和虚部组成，虚部后缀 j 或 J
complex_num = 3 + 4j
print(f"复数: {complex_num}, 实部: {complex_num.real}, 虚部: {complex_num.imag}")

# ---------- 5. 字符串 (str) ----------
name = "Alice"
greeting = 'Hello'
# 三引号：多行字符串
multi_line = """第一行
第二行
第三行"""
# 转义字符
path = "C:\\Users\\name"   # \\ 表示一个反斜杠
new_line = "第一行\n第二行"  # \n 换行
tab_str = "列1\t列2"       # \t 制表符

# 字符串常用操作
s = "Hello World"
print(f"长度: {len(s)}")           # 11
print(f"大写: {s.upper()}")         # HELLO WORLD
print(f"小写: {s.lower()}")         # hello world
print(f"替换: {s.replace('World', 'Python')}")  # Hello Python
print(f"分割: {s.split(' ')}")      # ['Hello', 'World']
print(f"连接: {'-'.join(['a', 'b', 'c'])}")    # a-b-c
print(f"去首尾空格: {'  abc  '.strip()}")
print(f"开头: {s.startswith('Hello')}")  # True
print(f"结尾: {s.endswith('World')}")    # True
print(f"索引: {s[0]}")              # H
print(f"切片: {s[0:5]}")             # Hello
print(f"逆序: {s[::-1]}")            # dlroW olleH

# 注意：字符串是不可变类型，不能直接修改
# s[0] = 'h'  # 这会报错

# f-string 格式化（推荐）
age = 25
print(f"我叫{name}，今年{age}岁")  # 我叫Alice，今年25岁

# ---------- 6. 空值 (None) ----------
# None 表示空或无，常用于函数默认参数、占位
result = None
# 判断 None 要用 is None，不能用 ==
print(f"result is None: {result is None}")


# ==================== 高级（容器）数据类型 ====================

# ---------- 7. 列表 (list) ----------
# 可变序列，可存储任意类型
fruits = ["苹果", "香蕉", "橙子"]
mixed = [1, "你好", True, 3.14, None]

# 列表操作
fruits.append("葡萄")       # 末尾添加
fruits.insert(1, "梨")      # 指定位置插入
fruits.remove("香蕉")       # 删除第一个匹配项
popped = fruits.pop()       # 弹出末尾元素
print(f"列表: {fruits}, 弹出: {popped}")

# 列表切片
nums = [0, 1, 2, 3, 4, 5]
print(f"切片 [1:3]: {nums[1:3]}")   # [1, 2]
print(f"切片 [::2]: {nums[::2]}")   # [0, 2, 4] 步长2
print(f"逆序: {nums[::-1]}")        # [5, 4, 3, 2, 1, 0]

# 列表推导式
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
print(f"平方列表: {squares}")

# 注意：列表是引用类型，赋值是共享引用
a = [1, 2, 3]
b = a        # b 和 a 指向同一列表
b.append(4)
print(f"a={a}, b={b}")  # a=[1,2,3,4], b=[1,2,3,4]

# 正确复制方式
import copy
c = [1, 2, [3, 4]]
d = copy.deepcopy(c)    # 深拷贝
e = c.copy()            # 浅拷贝
f = c[:]                # 切片复制（浅拷贝）

# ---------- 8. 元组 (tuple) ----------
# 不可变序列，比列表更轻量，可用作字典键
point = (10, 20)
single = (42,)          # 单元素元组必须加逗号
mixed_tuple = (1, "a", True)

# 元组解包
x, y = point
print(f"解包: x={x}, y={y}")

# 命名元组
from collections import namedtuple
Person = namedtuple('Person', ['name', 'age'])
p = Person("小明", 20)
print(f"命名元组: {p.name}, {p.age}")

# 注意：元组不可修改
# point[0] = 100  # 这会报错

# ---------- 9. 字典 (dict) ----------
# 键值对，键必须可哈希（不可变类型）
person = {
    "name": "小明",
    "age": 20,
    "city": "北京"
}

# 字典操作
person["gender"] = "男"    # 添加/修改
print(f"获取 name: {person['name']}")
print(f"获取 get: {person.get('height', 170)}")  # 安全获取，不存在返回默认值
del person["city"]         # 删除键值对
popped = person.pop("age")  # 弹出并删除
print(f"弹出值: {popped}")

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
print(f"字典推导式: {squares_dict}")

# 注意：键必须是不可变类型
# {[1,2]: "value"}  # 报错！列表不可哈希

# ---------- 10. 集合 (set) ----------
# 无序、不重复、可变
colors = {"红", "绿", "蓝"}
numbers = {1, 2, 3, 3, 3}  # 自动去重

# 集合操作
colors.add("黄")           # 添加
colors.remove("绿")        # 删除（不存在会报错）
colors.discard("紫")       # 删除（不存在不报错）
popped = colors.pop()      # 随机弹出一个
print(f"集合: {colors}, 弹出: {popped}")

# 集合运算
a = {1, 2, 3}
b = {2, 3, 4}
print(f"交集: {a & b}")       # {2, 3}
print(f"并集: {a | b}")       # {1, 2, 3, 4}
print(f"差集: {a - b}")       # {1}
print(f"对称差: {a ^ b}")     # {1, 4}

# 注意：集合元素必须是可哈希的（不可变类型）
# 集合本身是可变的，不能作为另一个集合的元素


# ==================== 类型转换 ====================

# ---------- int() ----------
print("\n=== int() 转换 ===")
print(f"int('123') = {int('123')}")           # 字符串转整数
print(f"int(3.14) = {int(3.14)}")             # 浮点数转整数（直接截断）
print(f"int(True) = {int(True)}")             # 布尔转整数
print(f"int('1010', 2) = {int('1010', 2)}")   # 二进制字符串转整数

# ---------- float() ----------
print("\n=== float() 转换 ===")
print(f"float('3.14') = {float('3.14')}")     # 字符串转浮点数
print(f"float(10) = {float(10)}")             # 整数转浮点数
print(f"float('inf') = {float('inf')}")       # 无穷大

# ---------- str() ----------
print("\n=== str() 转换 ===")
print(f"str(123) = '{str(123)}'")
print(f"str(3.14) = '{str(3.14)}'")
print(f"str([1,2,3]) = '{str([1,2,3])}'")

# ---------- bool() ----------
print("\n=== bool() 转换 ===")
print(f"bool(0) = {bool(0)}")                 # False
print(f"bool(1) = {bool(1)}")                 # True
print(f"bool('') = {bool('')}")               # False
print(f"bool('hello') = {bool('hello')}")     # True
print(f"bool([]) = {bool([])}")               # False
print(f"bool({{}}) = {bool({})}")             # False
print(f"bool(None) = {bool(None)}")           # False

# ---------- list() ----------
print("\n=== list() 转换 ===")
print(f"list('abc') = {list('abc')}")         # 字符串转列表
print(f"list((1,2,3)) = {list((1,2,3))}")     # 元组转列表
print(f"list({{1,2,3}}) = {list({1,2,3})}")   # 集合转列表

# ---------- tuple() ----------
print("\n=== tuple() 转换 ===")
print(f"tuple('abc') = {tuple('abc')}")       # 字符串转元组
print(f"tuple([1,2,3]) = {tuple([1,2,3])}")   # 列表转元组

# ---------- set() ----------
print("\n=== set() 转换 ===")
print(f"set('abca') = {set('abca')}")         # 字符串转集合（去重）
print(f"set([1,2,2,3]) = {set([1,2,2,3])}")   # 列表转集合（去重）
print(f"set({{'a','b'}}) = {set({'a','b'})}")  # 集合转集合

# ---------- dict() ----------
print("\n=== dict() 转换 ===")
# 二元组列表转字典
print(f"dict([['a',1],['b',2]]) = {dict([['a',1],['b',2]])}")
# 关键字参数
print(f"dict(name='Tom', age=20) = {dict(name='Tom', age=20)}")

# ---------- chr() 和 ord() ----------
print("\n=== chr() 和 ord() 转换 ===")
print(f"chr(65) = '{chr(65)}'")               # 整数转字符
print(f"ord('A') = {ord('A')}")               # 字符转整数

# ---------- bytes() ----------
print("\n=== bytes() 转换 ===")
print(f"bytes('abc', 'utf-8') = {bytes('abc', 'utf-8')}")


# ==================== 类型查询 ====================

print("\n=== 类型查询 ===")
x = 42
print(f"type(42) = {type(x)}")                    # <class 'int'>
print(f"isinstance(42, int) = {isinstance(42, int)}")  # True
print(f"isinstance(42, (int, float)) = {isinstance(42, (int, float))}")  # True（联合类型）

# 注意：type() 不考虑继承关系，isinstance() 考虑
class Animal:
    pass
class Dog(Animal):
    pass
d = Dog()
print(f"type(d) == Animal: {type(d) == Animal}")         # False
print(f"isinstance(d, Animal): {isinstance(d, Animal)}")  # True


# ==================== 常用内置函数 ====================

print("\n=== 常用内置函数 ===")
nums = [4, 2, 7, 1, 9, 3]

print(f"len(nums) = {len(nums)}")          # 长度
print(f"min(nums) = {min(nums)}")          # 最小值
print(f"max(nums) = {max(nums)}")           # 最大值
print(f"sum(nums) = {sum(nums)}")           # 求和
print(f"sorted(nums) = {sorted(nums)}")     # 排序（返回新列表）
print(f"reversed(nums) = {list(reversed(nums))}")  # 逆序
print(f"enumerate(nums) = {list(enumerate(nums))}")  # 索引-值对
print(f"zip([1,2], ['a','b']) = {list(zip([1,2], ['a','b']))}")  # 组合
