a = "b"
b = "b"


def ha(name):
    """文档字符串（可选）"""
    g = a + b + name
    return g


def fun(**arg):
    for k, v in arg.items():
        print(f"{k},{v}")
        # print(type(v))


fun({"ccc": {"haha": "aaa"}, "num": 1, "bol": True, "float": 3.25, "set": {1, 3, 4, 5}})


# ============================================================
# 函数基础
# ============================================================

# 1. 默认参数
def greet(name, greeting="Hello"):
    """带默认参数的函数"""
    return f"{greeting}, {name}!"


print(greet("Alice"))
print(greet("Bob", "Hi"))


# 2. 多返回值
def stats(numbers):
    """返回多个值（实际返回元组）"""
    return min(numbers), max(numbers), sum(numbers)


mini, maxi, total = stats([1, 2, 3, 4, 5])
print(f"min={mini}, max={maxi}, sum={total}")


# 3. 位置参数 *args
def sum_all(*args):
    """可变数量的位置参数"""
    total = 0
    for num in args:
        total += num
    return total


print(sum_all(1, 2, 3, 4, 5))
print(sum_all(10, 20))


# 4. 关键字参数 **kwargs
def print_info(**kwargs):
    """可变数量的关键字参数"""
    for key, value in kwargs.items():
        print(f"{key} = {value}")


print_info(name="Alice", age=25, city="Beijing")


# 5. 混合使用 *args 和 **kwargs
def mixed_args(*args, **kwargs):
    """位置参数和关键字参数混合"""
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")


mixed_args(1, 2, 3, name="Bob", age=30)


# 6. 参数顺序: 位置 -> *args -> 默认 -> **kwargs
def formal_func(pos, *args, default="默认", **kwargs):
    print(f"pos={pos}, args={args}, default={default}, kwargs={kwargs}")


formal_func("位置", "可变1", "可变2", default="新值", extra="额外参数")


# ============================================================
# Lambda 匿名函数
# ============================================================

# 7. 基本 lambda
square = lambda x: x ** 2
print(f"lambda square: {square(5)}")

# 8. 多参数 lambda
add = lambda x, y: x + y
print(f"lambda add: {add(3, 4)}")

# 9. lambda 结合内置函数
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers, key=lambda x: -x)  # 降序排列
print(f"降序排序: {sorted_nums}")

# 10. lambda 用于 map filter
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))
print(f"平方: {squared}")
print(f"偶数: {evens}")


# ============================================================
# 函数的特殊用法
# ============================================================

# 11. 嵌套函数（闭包）
def outer(x):
    def inner(y):
        return x + y
    return inner


closure = outer(10)
print(f"闭包调用: {closure(5)}")  # 15


# 12. 函数作为参数
def apply_twice(func, x):
    """接收函数作为参数"""
    return func(func(x))


def double(x):
    return x * 2


print(f"apply_twice: {apply_twice(double, 3)}")  # 12


# 13. 函数作为返回值
def make_multiplier(factor):
    def multiplier(x):
        return x * factor
    return multiplier


times3 = make_multiplier(3)
print(f"乘以3: {times3(7)}")


# 14. 装饰器（Decorator）
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("调用前...")
        result = func(*args, **kwargs)
        print("调用后")
        return result
    return wrapper


@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")


say_hello("Alice")


# 15. * 解包参数
def connect(host, port, timeout):
    return f"连接 {host}:{port}, 超时={timeout}s"


args = ("localhost", 8080)
kwargs = {"timeout": 30}
print(connect(*args, **kwargs))


# ============================================================
# 作用域
# ============================================================

# 16. global 和 nonlocal
counter = 0


def increment():
    global counter
    counter += 1
    return counter


print(f"计数器: {increment()}, {increment()}, {increment()}")


def outer_scope():
    count = 0

    def inner_scope():
        nonlocal count
        count += 1
        return count
    return inner_scope


inner = outer_scope()
print(f"nonlocal: {inner()}, {inner()}, {inner()}")


# 17. enumerate 在函数中的应用
def process_items(items):
    for index, item in enumerate(items, start=1):
        print(f"{index}. {item}")


process_items(["苹果", "香蕉", "橙子"])


# 18. 生成器函数
def count_up_to(n):
    """yield 生成器"""
    count = 1
    while count <= n:
        yield count
        count += 1


for num in count_up_to(5):
    print(f"生成器: {num}", end=" ")
print()


# 19. 递归函数
def fibonacci(n):
    """斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print(f"斐波那契第10项: {fibonacci(10)}")


# 20. 类型注解
def typed_func(name: str, age: int) -> str:
    """带类型注解的函数"""
    return f"{name} is {age} years old"


print(typed_func("Alice", 25))


# 21. 可变默认参数的陷阱（慎用！）
def append_to(item, target=[]):  # 不要这样写！
    target.append(item)
    return target


def append_to_fixed(item, target=None):  # 正确做法
    if target is None:
        target = []
    target.append(item)
    return target


print(append_to_fixed(1))
print(append_to_fixed(2))


# 22. partial 函数（偏函数）
from functools import partial


def power(base, exponent):
    return base ** exponent


square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(f"平方: {square(5)}")
print(f"立方: {cube(3)}")
