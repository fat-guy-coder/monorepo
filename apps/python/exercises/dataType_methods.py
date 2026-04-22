"""
Python 各数据类型内置方法详解
"""

# ==================== 字符串 (str) 方法 ====================

s = "  Hello World!  "
s2 = "hello"
s3 = "Hello"

print("=== 字符串方法 ===\n")

# 大小写转换
print("【大小写转换】")
print(f"'hello'.upper() = '{s2.upper()}'")           # 全部大写
print(f"'HELLO'.lower() = '{s3.lower()}'")           # 全部小写
print(f"'hello'.capitalize() = '{s2.capitalize()}'")  # 首字母大写
print(f"'hello world'.title() = 'hello world'.title()")  # 每个单词首字母大写
print(f"'HELLO'.swapcase() = '{s3.swapcase()}'")     # 大小写互换

# 查找和替换
print("\n【查找和替换】")
print(f"'hello'.find('l') = {s2.find('l')}")         # 查找位置，不存在返回-1
print(f"'hello'.find('l', 3) = {s2.find('l', 3)}")  # 从索引3开始查找
print(f"'hello'.index('l') = {s2.index('l')}")      # 同 find，但不存在报 ValueError
print(f"'hello'.rfind('l') = {s2.rfind('l')}")      # 从右向左查找
print(f"'hello'.count('l') = {s2.count('l')}")      # 计数
print(f"'hello'.replace('l', 'L') = '{s2.replace('l', 'L')}'")  # 替换

# 判断方法（返回 bool）
print("\n【判断方法】")
print(f"'hello'.isalpha() = {s2.isalpha()}")        # 是否全是字母
print(f"'hello123'.isalnum() = {'hello123'.isalnum()}")  # 是否字母或数字
print(f"'123'.isdigit() = {'123'.isdigit()}")       # 是否全是数字
print(f"'123'.isnumeric() = {'123'.isnumeric()}")    # 是否是数字（支持中文数字）
print(f"'  '.isspace() = {'  '.isspace()}")         # 是否全是空白
print(f"'hello'.islower() = {s2.islower()}")         # 是否小写
print(f"'HELLO'.isupper() = {'HELLO'.isupper()}")     # 是否大写
print(f"'Hello'.istitle() = {s3.istitle()}")          # 是否是标题化
print(f"'hello'.startswith('hel') = {s2.startswith('hel')}")  # 是否以...开头
print(f"'hello'.endswith('llo') = {s2.endswith('llo')}")      # 是否以...结尾
print(f"'hello'.isascii() = {s2.isascii()}")          # 是否是 ASCII 字符

# 格式化
print("\n【格式化】")
print("'{{}} {{}}'.format('hello', 'world') =", "{{}} {{}}".format('hello', 'world'))  # format格式化
print("'{'age':{10}}'.format('age') =", "{:10}".format("age"))  # 左对齐，占10位
print("'{'age':>{10}}'.format('age') =", "{:>10}".format("age"))  # 右对齐
print(f"'hello'.center(10, '*') = '{s2.center(10, '*')}'")  # 居中填充
print(f"'hello'.ljust(10, '-') = '{s2.ljust(10, '-')}'")   # 左对齐填充
print(f"'hello'.rjust(10, '-') = '{s2.rjust(10, '-')}'")   # 右对齐填充
print(f"'HELLO'.zfill(10) = '{'HELLO'.zfill(10)}'")        # 零填充

# 去除空白
print("\n【去除空白】")
print(f"'  hello  '.strip() = '{'  hello  '.strip()}'")   # 去除首尾空白
print(f"'  hello  '.lstrip() = '{'  hello  '.lstrip()}'")  # 去除左侧空白
print(f"'  hello  '.rstrip() = '{'  hello  '.rstrip()}'")  # 去除右侧空白
print(f"'***hello***'.strip('*') = '{'***hello***'.strip('*')}'")  # 去除指定字符

# 分割和连接
print("\n【分割和连接】")
print(f"'a,b,c'.split(',') = {'a,b,c'.split(',')}")     # 分割成列表
print(f"'a,b,c'.rsplit(',', 1) = {'a,b,c'.rsplit(',', 1)}")  # 从右分割
print(f"'a\\nb\\nc'.splitlines() = {repr('a\nb\nc'.splitlines())}")  # 按行分割
print(f"'\\n'.join(['a','b']) = '{'\\n'.join(['a','b'])}'")  # 用换行连接
print(f"'-'.join(['a','b','c']) = '{'-'.join(['a','b','c'])}'")  # 用指定字符连接

# 编码
print("\n【编码】")
print(f"'中文'.encode('utf-8') = {'中文'.encode('utf-8')}")
print(f"'hello'.encode('ascii') = {'hello'.encode('ascii')}")

# 扩展
print("\n【扩展】")
print(f"'ab\\ncd'.expandtabs() = {repr('ab\tcd'.expandtabs())}")  # 制表符转空格
print(f"'hello'.isidentifier() = {'hello'.isidentifier()}")  # 是否是合法标识符
print(f"'def'.iskeyword() = {'def'.iskeyword()}")              # 是否是关键字
print(f"'abc'.casefold() = {'abc'.casefold()}")                  # 案例折叠（更激进的小写）


# ==================== 列表 (list) 方法 ====================

lst = [1, 2, 3, 4, 5]
lst2 = [1, 2, 3, 2, 2, 4]
lst3 = ["apple", "banana", "Cherry"]

print("\n\n=== 列表方法 ===\n")

# 添加元素
print("【添加元素】")
lst_copy = lst.copy()
lst_copy.append(6)                       # 末尾添加
print(f"[1,2,3].append(6) = {lst_copy}")
lst_copy = lst.copy()
lst_copy.insert(2, 99)                   # 指定位置插入
print(f"[1,2,3].insert(2, 99) = {lst_copy}")
lst_copy = lst.copy()
lst_copy.extend([7, 8])                   # 末尾批量添加
print(f"[1,2,3].extend([7,8]) = {lst_copy}")

# 删除元素
print("\n【删除元素】")
lst2_copy = lst2.copy()
lst2_copy.remove(2)                       # 删除第一个匹配项
print(f"[1,2,3,2].remove(2) = {lst2_copy}")
lst2_copy = lst2.copy()
popped = lst2_copy.pop()                 # 弹出末尾元素
print(f"[1,2,3].pop() = {popped}, 剩余: {lst2_copy}")
lst2_copy = lst2.copy()
popped = lst2_copy.pop(1)                # 弹出指定位置元素
print(f"[1,2,3].pop(1) = {popped}, 剩余: {lst2_copy}")
lst2_copy = lst2.copy()
lst2_copy.clear()                         # 清空列表
print(f"[1,2,3].clear() = {lst2_copy}")

# 查询和计数
print("\n【查询和计数】")
print(f"[1,2,3,2].count(2) = {lst2.count(2)}")  # 计数
print(f"[1,2,3].index(2) = {lst2.index(2)}")    # 查找位置，不存在报错

# 排序和反转
print("\n【排序和反转】")
lst_copy = [3, 1, 4, 1, 5, 9, 2, 6]
lst_copy.sort()                          # 原地排序
print(f"[3,1,4].sort() = {lst_copy}")
lst_copy = [3, 1, 4]
sorted_lst = sorted(lst_copy, reverse=True)  # 返回排序后的新列表
print(f"sorted([3,1,4], reverse=True) = {sorted_lst}")
lst_copy = [1, 2, 3].copy()
lst_copy.reverse()                       # 原地反转
print(f"[1,2,3].reverse() = {lst_copy}")
print(f"[1,2,3][::-1] = {[1, 2, 3][::-1]}")  # 切片反转

# 复制
print("\n【复制】")
original = [1, 2, [3, 4]]
shallow = original.copy()               # 浅拷贝
deep = original[:]                       # 切片浅拷贝
import copy
deep2 = copy.deepcopy(original)          # 深拷贝
print(f"original = {original}")

# 其他
print("\n【其他】")
print(f"[1,2,3].copy() = {[1, 2, 3].copy()}")  # 浅拷贝
print(f"[1,2,3].clear() = {[1, 2, 3].clear()}")  # 清空


# ==================== 元组 (tuple) 方法 ====================

t = (1, 2, 3, 2, 4, 2)

print("\n\n=== 元组方法 ===\n")

# 元组只有 count 和 index 两个方法
print("【查询方法】")
print(f"(1,2,3,2).count(2) = {t.count(2)}")  # 计数
print(f"(1,2,3,2).index(2) = {t.index(2)}")  # 第一个匹配位置
print(f"(1,2,3,2).index(2, 3) = {t.index(2, 3)}")  # 从索引3开始查找


# ==================== 字典 (dict) 方法 ====================

d = {"name": "小明", "age": 20, "city": "北京"}
d2 = {"a": 1, "b": 2}

print("\n\n=== 字典方法 ===\n")

# 查询
print("【查询】")
print(f"dict.get('name') = {d.get('name')}")           # 安全获取
print(f"dict.get('height', 170) = {d.get('height', 170)}")  # 不存在返回默认值
print(f"dict.keys() = {list(d.keys())}")              # 所有键
print(f"dict.values() = {list(d.values())}")          # 所有值
print(f"dict.items() = {list(d.items())}")             # 所有键值对
print(f"dict | d2 = {dict(**d, **d2)}")                # 合并字典（Python 3.9+）

# 添加/修改
print("\n【添加/修改】")
d_copy = d.copy()
d_copy["gender"] = "男"                     # 添加新键值对
print(f"添加后: {d_copy}")
d_copy = d.copy()
d_copy.update({"age": 21, "height": 180})   # 批量更新
print(f"update后: {d_copy}")
d_copy = d.copy()
d_copy.setdefault("school", "北大")         # 不存在则添加
print(f"setdefault后: {d_copy}")

# 删除
print("\n【删除】")
d_copy = d.copy()
popped = d_copy.pop("age")                  # 弹出并删除
print(f"pop('age') = {popped}, 剩余: {d_copy}")
d_copy = d.copy()
popped = d_copy.popitem()                  # 弹出最后一个键值对
print(f"popitem() = {popped}, 剩余: {d_copy}")
d_copy = d.copy()
del d_copy["city"]                          # 删除指定键
print(f"del后: {d_copy}")
d_copy = d.copy()
d_copy.clear()                             # 清空
print(f"clear后: {d_copy}")

# 复制
print("\n【复制】")
print(f"dict.copy() = {d.copy()}")

# 字典视图
print("\n【字典视图】")
keys = d.keys()
print(f"keys类型: {type(keys)}")
print(f"'name' in keys = {'name' in keys}")


# ==================== 集合 (set) 方法 ====================

s = {1, 2, 3, 4, 5}
s2 = {4, 5, 6, 7}

print("\n\n=== 集合方法 ===\n")

# 添加/删除
print("【添加/删除】")
s_copy = s.copy()
s_copy.add(6)                               # 添加元素
print(f"add(6)后: {s_copy}")
s_copy = s.copy()
s_copy.discard(3)                          # 删除（不存在不报错）
print(f"discard(3)后: {s_copy}")
s_copy = s.copy()
s_copy.remove(3)                           # 删除（不存在报 KeyError）
print(f"remove(3)后: {s_copy}")
s_copy = s.copy()
popped = s_copy.pop()                      # 随机弹出一个
print(f"pop() = {popped}, 剩余: {s_copy}")
s_copy = s.copy()
s_copy.clear()                             # 清空
print(f"clear后: {s_copy}")

# 集合运算
print("\n【集合运算】")
print(f"s = {s}, s2 = {s2}")
print(f"交集: s & s2 = {s & s2}")
print(f"交集方法: s.intersection(s2) = {s.intersection(s2)}")
print(f"并集: s | s2 = {s | s2}")
print(f"并集方法: s.union(s2) = {s.union(s2)}")
print(f"差集: s - s2 = {s - s2}")
print(f"差集方法: s.difference(s2) = {s.difference(s2)}")
print(f"对称差: s ^ s2 = {s ^ s2}")
print(f"对称差方法: s.symmetric_difference(s2) = {s.symmetric_difference(s2)}")

# 判断关系
print("\n【判断关系】")
print(f"s.isdisjoint(s2) = {s.isdisjoint(s2)}")  # 是否无交集
print(f"s.issubset({{1,2,3,4,5,6}}) = {s.issubset({1,2,3,4,5,6})}")  # 是否是子集
print(f"s.issuperset({{1,2,3}}) = {s.issuperset({1,2,3})}")  # 是否是父集

# 更新操作（原地修改）
print("\n【更新操作】")
s_copy = s.copy()
s_copy.update({6, 7})                      # 并集更新
print(f"update后: {s_copy}")
s_copy = s.copy()
s_copy.intersection_update(s2)              # 交集更新
print(f"intersection_update后: {s_copy}")
s_copy = s.copy()
s_copy.difference_update(s2)               # 差集更新
print(f"difference_update后: {s_copy}")
s_copy = s.copy()
s_copy.symmetric_difference_update(s2)      # 对称差更新
print(f"symmetric_difference_update后: {s_copy}")


# ==================== 数字类型 (int/float) 方法 ====================

print("\n\n=== 数字类型方法 ===\n")

# int 方法
num = -42
print("【int 方法】")
print(f"(-42).bit_length() = {num.bit_length()}")   # 二进制位数
print(f"(-42).to_bytes(4, 'big') = {num.to_bytes(4, 'big')}")  # 转字节
print(f"int.from_bytes(b'\\x00\\x00\\x00\\x2a', 'big') = {int.from_bytes(b'\\x00\\x00\\x00\\x2a', 'big')}")  # 字节转int

# float 方法
f = 3.14159
print("\n【float 方法】")
print(f"(3.14159).as_integer_ratio() = {f.as_integer_ratio()}")  # 转分数
print(f"(3.14).is_integer() = {(3.14).is_integer()}")  # 是否是整数
print(f"float.as_integer_ratio() = {f.as_integer_ratio()}")

# 进制转换
print("\n【进制转换】")
print(f"bin(42) = {bin(42)}")                # 转二进制
print(f"oct(42) = {oct(42)}")                # 转八进制
print(f"hex(42) = {hex(42)}")                # 转十六进制
print(f"int('1010', 2) = {int('1010', 2)}")  # 二进制字符串转int


# ==================== 布尔值 (bool) 方法 ====================

print("\n\n=== 布尔值方法 ===\n")

print(f"True.bit_length() = {True.bit_length()}")  # 继承自 int
print(f"int(True) = {int(True)}")  # 转整数
print(f"int(False) = {int(False)}")


# ==================== bytes 方法 ====================

b = b'hello'
b2 = b'\\x00\\x01\\x02'

print("\n\n=== bytes 方法 ===\n")

print(f"b'hello'.decode() = '{b.decode()}'")  # 解码为字符串
print(f"b'hello'.hex() = {b.hex()}")          # 转十六进制字符串
print(f"b'hello'.count(b'l') = {b.count(b'l')}")  # 计数
print(f"b'hello'.find(b'll') = {b.find(b'll')}")  # 查找
print(f"b'hello'.replace(b'l', b'L') = {b.replace(b'l', b'L')}")  # 替换
print(f"b'hello'.split(b'l') = {b.split(b'l')}")  # 分割
print(f"b'hello'.startswith(b'he') = {b.startswith(b'he')}")  # 开头判断
print(f"b'hello'.endswith(b'llo') = {b.endswith(b'llo')}")  # 结尾判断


# ==================== 可用于所有对象的函数/方法 ====================

print("\n\n=== 所有对象通用方法 ===\n")

obj = [1, 2, 3]
print(f"dir([1,2,3]) = {[x for x in dir(obj) if not x.startswith('_')]}")  # 列出所有属性方法
print(f"hash([1,2,3]) 会报错，因为列表不可哈希")

print("\n【类型转换相关】")
print(f"type(42) = {type(42)}")
print(f"isinstance(42, int) = {isinstance(42, int)}")
print(f"isinstance('hello', str) = {isinstance('hello', str)}")
print(f"isinstance([1,2], (list, tuple)) = {isinstance([1,2], (list, tuple))}")  # 联合类型

print("\n【比较相关】")
print(f"cmp 功能已移除，用 > < == 代替")

print("\n【文档和帮助】")
print(f"help(str.upper) 会打印文档")
print(f"'(1,2).__doc__' = {(1,2).__doc__}")  # 文档字符串
