# Python 内置函数详解

# ========== 数值类函数 ==========

# abs() - 返回绝对值
print("=== abs() 绝对值 ===")
print(abs(-10))      # 10
print(abs(-3.14))    # 3.14

# pow() - 幂运算，等同于 **
print("\n=== pow() 幂运算 ===")
print(pow(2, 3))     # 8 (2的3次方)
print(pow(2, 3, 3))  # 2 (2的3次方再对3取余)

# round() - 四舍五入
print("\n=== round() 四舍五入 ===")
print(round(3.14159, 2))   # 3.14 (保留2位小数)
print(round(2.5))          # 2 (银行家舍入)

# min() / max() - 求最小/最大值
print("\n=== min() / max() ===")
nums = [1, 5, 2, 8, 3]
print(f"最小值: {min(nums)}")
print(f"最大值: {max(nums)}")
print(f"字符串比较: {min('apple', 'banana')}")  # 按字典序

# sum() - 求和
print("\n=== sum() 求和 ===")
print(sum([1, 2, 3, 4, 5]))        # 15
print(sum([1, 2, 3], start=10))    # 16 (从10开始加)


# ========== 类型转换函数 ==========

# int() - 转换为整数
print("\n=== int() 转换为整数 ===")
print(int(3.14))       # 3
print(int("123"))      # 123
print(int("1010", 2))  # 10 (二进制转十进制)

# float() - 转换为浮点数
print("\n=== float() 转换为浮点数 ===")
print(float(10))       # 10.0
print(float("3.14"))   # 3.14

# str() - 转换为字符串
print("\n=== str() 转换为字符串 ===")
print(str(123))        # "123"
print(str([1, 2, 3]))  # "[1, 2, 3]"

# bool() - 转换为布尔值
print("\n=== bool() 转换为布尔值 ===")
print(bool(0))         # False
print(bool(1))         # True
print(bool(""))        # False (空字符串)
print(bool("hello"))   # True
print(bool([]))        # False (空列表)
print(bool([1, 2]))    # True

# list() / tuple() / set() - 转换为列表/元组/集合
print("\n=== 容器转换 ===")
print(list((1, 2, 3)))        # [1, 2, 3]
print(tuple([1, 2, 3]))      # (1, 2, 3)
print(set([1, 2, 2, 3]))     # {1, 2, 3}
print(dict([["a", 1], ["b", 2]]))  # {'a': 1, 'b': 2}


# ========== 可迭代对象函数 ==========

# len() - 返回长度
print("\n=== len() 长度 ===")
print(len("hello"))        # 5
print(len([1, 2, 3]))      # 3
print(len({"a": 1}))       # 1

# sorted() - 排序（返回新列表）
print("\n=== sorted() 排序 ===")
print(sorted([3, 1, 4, 1, 5]))              # [1, 1, 3, 4, 5]
print(sorted("cab"))                         # ['a', 'b', 'c']
print(sorted([-3, 1, -1], key=abs))          # [1, -1, -3] (按绝对值排序)
print(sorted([3, 1, 4], reverse=True))      # [4, 3, 1] (降序)

# reversed() - 反转（返回迭代器）
print("\n=== reversed() 反转 ===")
print(list(reversed([1, 2, 3, 4])))  # [4, 3, 2, 1]
print(list(reversed("hello")))      # ['o', 'l', 'l', 'e', 'h']

# enumerate() - 带索引的迭代
print("\n=== enumerate() 枚举 ===")
for i, fruit in enumerate(["苹果", "香蕉", "橙子"]):
    print(f"{i}: {fruit}")

# zip() - 打包成元组列表
print("\n=== zip() 打包 ===")
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 88]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
print(dict(zip(names, scores)))  # {'Alice': 85, 'Bob': 92, 'Charlie': 88}

# map() - 对每个元素执行函数
print("\n=== map() 映射 ===")
nums = [1, 2, 3, 4]
print(list(map(lambda x: x * 2, nums)))      # [2, 4, 6, 8]
print(list(map(str, [1, 2, 3])))            # ['1', '2', '3']

# filter() - 过滤元素
print("\n=== filter() 过滤 ===")
nums = [1, 2, 3, 4, 5, 6]
print(list(filter(lambda x: x % 2 == 0, nums)))  # [2, 4, 6] (偶数)
print(list(filter(None, [0, 1, "", "hello", None])))  # [1, 'hello'] (真值)

# any() / all() - 短路求值
print("\n=== any() / all() ===")
print(any([False, 0, "", None]))  # False (全为假)
print(any([False, 1, ""]))        # True (有真值)
print(all([1, 2, 3, 4]))          # True (全为真)
print(all([1, 0, 3]))              # False (有假值)


# ========== 查找/判断函数 ==========

# isinstance() - 判断类型
print("\n=== isinstance() 类型判断 ===")
print(isinstance(123, int))           # True
print(isinstance(3.14, (int, float))) # True (int或float之一)
print(isinstance("hello", str))        # True
print(isinstance([1, 2], list))        # True

# type() - 获取类型
print("\n=== type() 获取类型 ===")
print(type(123))          # <class 'int'>
print(type("hello"))       # <class 'str'>
print(type([1, 2]) == list)  # True

# issubclass() - 判断继承关系
print("\n=== issubclass() 继承判断 ===")
print(issubclass(bool, int))    # True (bool是int的子类)

# in / not in - 成员判断
print("\n=== 成员判断 ===")
print(3 in [1, 2, 3, 4, 5])        # True
print("a" not in "hello")          # True
print("key" in {"key": "value"})   # True (判断键)


# ========== 字符串相关函数 ==========

# chr() / ord() - 字符与ASCII码互转
print("\n=== chr() / ord() ===")
print(chr(65))       # 'A' (ASCII码转字符)
print(chr(97))       # 'a'
print(ord('A'))      # 65 (字符转ASCII码)
print(ord('中'))     # 20013 (Unicode)

# format() - 格式化字符串
print("\n=== format() 格式化 ===")
print(format(3.14159, ".2f"))    # 3.14
print(format(1000000, ","))      # 1,000,000
print(format(42, "05d"))         # 00042

# hex() / oct() / bin() - 进制转换
print("\n=== 进制转换 ===")
print(hex(255))      # '0xff'
print(oct(8))        # '0o10'
print(bin(10))       # '0b1010'

# ascii() / repr() - 转义表示
print("\n=== ascii() / repr() ===")
print(ascii("hello"))          # "'hello'"
print(ascii("中文"))           # "'\\u4e2d\\u6587'"


# ========== 输入输出 ==========

# print() - 输出（见上方示例）
# input() - 获取用户输入（交互时使用）
# print("请输入您的名字：")
# name = input()
# print(f"您好，{name}！")


# ========== 其他常用函数 ==========

# range() - 生成整数序列
print("\n=== range() 整数序列 ===")
print(list(range(5)))           # [0, 1, 2, 3, 4]
print(list(range(2, 8)))         # [2, 3, 4, 5, 6, 7]
print(list(range(0, 10, 3)))     # [0, 3, 6, 9] (步长3)
print(list(range(10, 0, -1)))    # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# slice() - 切片对象
print("\n=== slice() 切片 ===")
s = slice(1, 4)
print([1, 2, 3, 4, 5][s])  # [2, 3, 4]

# id() / hash() - 对象标识
print("\n=== id() / hash() ===")
a = [1, 2, 3]
b = [1, 2, 3]
print(id(a))              # 内存地址（十进制）
print(id(b))              # 不同的内存地址
print(hash("hello"))      # 字符串的哈希值

# dir() - 查看对象的属性和方法
print("\n=== dir() 属性查看 ===")
print(dir("hello"))
# print(dir([]))  # 列表的所有可用方法

# help() - 查看帮助文档
# help(print)  # 打印print函数的帮助信息

# vars() - 返回对象的属性字典
print("\n=== vars() ===")
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 20)
print(vars(p))  # {'name': 'Alice', 'age': 20}

# getattr() / setattr() / hasattr() - 动态属性操作
print("\n=== 属性操作 ===")
print(hasattr(p, "name"))       # True
print(getattr(p, "name"))       # 'Alice'
setattr(p, "name", "Bob")
print(p.name)                   # 'Bob'

# callable() - 判断是否可调用
print("\n=== callable() ===")
print(callable(len))            # True (函数可调用)
print(callable("hello"))        # False

# divmod() - 返回商和余数
print("\n=== divmod() ===")
print(divmod(17, 5))           # (3, 2) (17//5=3, 17%5=2)

# pow() 复习
print("\n=== pow() 复习 ===")
print(pow(2, 10))              # 1024
print(pow(2, 10, 1000))        # 24 (1024 % 1000)


# ========== 高级函数 ==========

# eval() - 执行字符串表达式（慎用）
print("\n=== eval() 表达式求值 ===")
print(eval("1 + 2 + 3"))       # 6
print(eval("2 ** 10"))          # 1024

# exec() - 执行字符串代码块（慎用）
# exec("a = 1 + 2")

# compile() - 编译代码字符串
print("\n=== compile() ===")
code = compile("x + 1", "<string>", "eval")
print(eval(code, {"x": 10}))   # 11

# locals() / globals() - 查看局部/全局变量
print("\n=== locals() / globals() ===")
g = globals()
print(f"globals函数ID: {id(g)}")
print(f"当前文件: {__name__}")


# ========== 迭代器相关 ==========

# iter() / next() - 迭代器操作
print("\n=== iter() / next() ===")
it = iter([1, 2, 3])
print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3

# iter() 带 sentinel 参数
def count_up():
    n = 0
    while n < 5:
        n += 1
        yield n

counter = iter(count_up(), 4)  # 迭代到4就停止
for c in counter:
    print(c)


# ========== 内存视图与字节 ==========

# bytes() / bytearray() - 字节序列
print("\n=== bytes() / bytearray() ===")
b = bytes([72, 101, 108, 108, 111])  # ASCII for "Hello"
print(b)                      # b'Hello'
print(b.decode())            # "Hello"

ba = bytearray([65, 66, 67])
ba[0] = 97  # 改为 'a'
print(ba)   # bytearray(b'abC')

# memoryview() - 内存视图
print("\n=== memoryview() ===")
mv = memoryview(b"Helloworld")
print(mv[0:5].tobytes())  # b'Hello'


# ========== 演示 __xx__ 形式的内置函数/常量 ==========

print("\n=== 内置常量 ===")
print(True)          # True
print(False)         # False
print(None)          # None
print(NotImplemented) # NotImplemented
print(Ellipsis)       # ...

print("\n=== 特殊值 ===")
print(f"__name__: {__name__}")  # 当前模块名