# Python 面向对象编程 - 设计模式与高阶技巧

# ========== 单例模式 ==========

print("=== 单例模式 ===")

class Singleton:
    """单例模式 - 只有一个实例"""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.value = None
        return cls._instance


s1 = Singleton()
s2 = Singleton()
s1.value = "Hello"
print(f"s1 is s2: {s1 is s2}")  # True
print(f"s1.value: {s1.value}, s2.value: {s2.value}")


class SingletonWithInit:
    """带初始化参数的更安全的单例"""
    _instance = None

    def __new__(cls, name):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._name = None
        return cls._instance

    def __init__(self, name):
        if self._name is None:
            self._name = name

    def greet(self):
        return f"你好，我是{self._name}"


s3 = SingletonWithInit("小明")
s4 = SingletonWithInit("小红")
print(f"s3.greet(): {s3.greet()}")  # 仍是"小明"，因为第二次没生效


# ========== 工厂模式 ==========

print("\n=== 工厂模式 ===")

class Animal:
    def speak(self):
        raise NotImplementedError


class Dog(Animal):
    def speak(self):
        return "汪汪汪"


class Cat(Animal):
    def speak(self):
        return "喵喵喵"


class Bird(Animal):
    def speak(self):
        return "唧唧唧"


class AnimalFactory:
    """简单工厂"""
    _registry = {}

    @classmethod
    def register(cls, animal_type, animal_class):
        cls._registry[animal_type] = animal_class

    @classmethod
    def create(cls, animal_type, *args, **kwargs):
        if animal_type not in cls._registry:
            raise ValueError(f"未知动物类型: {animal_type}")
        return cls._registry[animal_type](*args, **kwargs)


AnimalFactory.register("dog", Dog)
AnimalFactory.register("cat", Cat)
AnimalFactory.register("bird", Bird)

for animal_type in ["dog", "cat", "bird"]:
    animal = AnimalFactory.create(animal_type)
    print(f"{animal_type}: {animal.speak()}")


# ========== 策略模式 ==========

print("\n=== 策略模式 ===")

class SortStrategy:
    """排序策略接口"""
    def sort(self, data):
        raise NotImplementedError


class AscSort(SortStrategy):
    def sort(self, data):
        return sorted(data)


class DescSort(SortStrategy):
    def sort(self, data):
        return sorted(data, reverse=True)


class SortContext:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy):
        self._strategy = strategy

    def execute(self, data):
        return self._strategy.sort(data)


data = [3, 1, 4, 1, 5, 9, 2, 6]

ctx = SortContext(AscSort())
print(f"升序: {ctx.execute(data)}")

ctx.set_strategy(DescSort())
print(f"降序: {ctx.execute(data)}")


# ========== 观察者模式 ==========

print("\n=== 观察者模式 ===")

class Observer:
    def update(self, message):
        raise NotImplementedError


class Subject:
    def __init__(self):
        self._observers = []

    def add_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(message)


class NewsAgency(Subject):
    def __init__(self, name):
        super().__init__()
        self.name = name
        self._news = ""

    def set_news(self, news):
        self._news = news
        self.notify(f"[{self.name}] {news}")


class NewsChannel(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, message):
        print(f"[{self.name}] 收到通知: {message}")


agency = NewsAgency("新闻频道")
ch1 = NewsChannel("CCTV")
ch2 = NewsChannel("BBC")

agency.add_observer(ch1)
agency.add_observer(ch2)
agency.set_news("今天天气不错！")

agency.remove_observer(ch1)
agency.set_news("明天有雨")


# ========== 装饰器模式 ==========

print("\n=== 装饰器模式 ===")

class Coffee:
    def cost(self):
        return 5

    def description(self):
        return "原味咖啡"


class CoffeeDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost()

    def description(self):
        return self._coffee.description()


class MilkDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 2

    def description(self):
        return self._coffee.description() + " + 牛奶"


class SugarDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 1

    def description(self):
        return self._coffee.description() + " + 糖"


coffee = Coffee()
print(f"{coffee.description()}, 价格: {coffee.cost()}")

coffee_with_milk = MilkDecorator(coffee)
print(f"{coffee_with_milk.description()}, 价格: {coffee_with_milk.cost()}")

coffee_milk_sugar = SugarDecorator(MilkDecorator(coffee))
print(f"{coffee_milk_sugar.description()}, 价格: {coffee_milk_sugar.cost()}")


# ========== 上下文管理器（with 语句）==========

print("\n=== 上下文管理器 ===")

class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False  # 不压制异常


# 使用 with 自动关闭文件
# with FileManager("test.txt", "w") as f:
#     f.write("Hello, World!")


class Timer:
    """计时器"""
    import time

    def __enter__(self):
        self.start = self.time.time()
        return self

    def __exit__(self, *args):
        self.end = self.time.time()
        print(f"耗时: {self.end - self.start:.4f} 秒")


with Timer():
    sum(range(1000000))


class Connection:
    """模拟数据库连接"""
    def __init__(self):
        self.connected = False

    def connect(self):
        print("连接数据库...")
        self.connected = True

    def disconnect(self):
        print("断开数据库连接")
        self.connected = False

    def query(self, sql):
        if not self.connected:
            raise ConnectionError("未连接数据库")
        print(f"执行SQL: {sql}")


class DBContextManager:
    def __enter__(self):
        self.conn = Connection()
        self.conn.connect()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.disconnect()
        return False


with DBContextManager() as db:
    db.query("SELECT * FROM users")


# ========== 迭代器协议 ==========

print("\n=== 迭代器协议 ===")

class Counter:
    """自定义迭代器"""
    def __init__(self, max_val):
        self.max = max_val
        self.current = 0

    def __iter__(self):
        self.current = 0
        return self

    def __next__(self):
        if self.current >= self.max:
            raise StopIteration
        self.current += 1
        return self.current - 1


for i in Counter(5):
    print(f"计数: {i}")

counter = Counter(3)
print(f"手动迭代: {next(counter)}, {next(counter)}, {next(counter)}")


class Fibonacci:
    """斐波那契数列迭代器"""
    def __init__(self, count):
        self.count = count
        self.a, self.b = 0, 1
        self.index = 0

    def __iter__(self):
        self.a, self.b = 0, 1
        self.index = 0
        return self

    def __next__(self):
        if self.index >= self.count:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.index += 1
        return result


print(f"斐波那契: {list(Fibonacci(10))}")


# ========== 生成器 ==========

print("\n=== 生成器 ===")

def countdown(n):
    """简单生成器"""
    while n > 0:
        yield n
        n -= 1


for i in countdown(5):
    print(f"倒计时: {i}")

gen = countdown(3)
print(f"next: {next(gen)}, {next(gen)}, {next(gen)}")


def fibonacci_gen(count):
    """斐波那契生成器"""
    a, b = 0, 1
    for _ in range(count):
        yield a
        a, b = b, a + b


print(f"生成器斐波那契: {list(fibonacci_gen(10))}")


def lazy_range(start, end, step=1):
    """懒加载 range"""
    current = start
    while current < end:
        yield current
        current += step


print(f"懒加载: {list(lazy_range(0, 10, 2))}")


# ========== 闭包 ==========

print("\n=== 闭包 ===")

def make_multiplier(factor):
    """创建乘法函数"""
    def multiplier(x):
        return x * factor
    return multiplier


times3 = make_multiplier(3)
times5 = make_multiplier(5)

print(f"times3(10): {times3(10)}")
print(f"times5(10): {times5(10)}")


def make_counter():
    """计数器闭包"""
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count
    return counter


counter1 = make_counter()
counter2 = make_counter()

print(f"counter1: {counter1()}, {counter1()}, {counter1()}")
print(f"counter2: {counter2()}, {counter2()}")


def outer(x):
    def middle(y):
        def inner(z):
            return x + y + z
        return inner
    return middle


print(f"闭包嵌套: {outer(1)(2)(3)}")


# ========== functools 高阶函数 ==========

print("\n=== functools 高阶函数 ===")
import functools


# @functools.lru_cache 缓存
@functools.lru_cache(maxsize=None)
def fib_with_cache(n):
    if n < 2:
        return n
    return fib_with_cache(n - 1) + fib_with_cache(n - 2)


print(f"斐波那契(lru_cache): {[fib_with_cache(i) for i in range(15)]}")


# @functools.singledispatch 泛函分发
@functools.singledispatch
def process(data):
    """默认处理"""
    return f"未知类型: {type(data)}"


@process.register(int)
def _(data):
    return f"整数: {data * 2}"


@process.register(str)
def _(data):
    return f"字符串: {data.upper()}"


@process.register(list)
def _(data):
    return f"列表: {len(data)} 项"


print(process(10))
print(process("hello"))
print(process([1, 2, 3]))
print(process({"a": 1}))


# partial 偏函数
def power(base, exponent):
    return base ** exponent


square = functools.partial(power, exponent=2)
cube = functools.partial(power, exponent=3)

print(f"平方: {square(5)}, 立方: {cube(5)}")


# reduce
result = functools.reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])
print(f"reduce求和: {result}")


# ========== 反射 / 动态操作 ==========

print("\n=== 反射 / 动态操作 ===")

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"你好，我是{self.name}"


p = Person("小明", 20)

# 动态获取属性
print(f"getattr: {getattr(p, 'name')}")

# 动态设置属性
setattr(p, "city", "北京")
print(f"新增属性: {p.city}")

# 检查属性
print(f"hasattr name: {hasattr(p, 'name')}")
print(f"hasattr city: {hasattr(p, 'city')}")

# 动态调用方法
method = getattr(p, "greet")
print(f"动态调用: {method()}")

# 遍历所有属性
print("所有属性:")
for attr in dir(p):
    if not attr.startswith("_"):
        print(f"  {attr}")


# ========== 方法解析顺序 (MRO) ==========

print("\n=== 方法解析顺序 (MRO) ===")

class A:
    def who(self):
        return "A"


class B(A):
    pass


class C(A):
    def who(self):
        return "C"


class D(B, C):
    pass


print(f"D的MRO: {[c.__name__ for c in D.__mro__]}")
d = D()
print(f"d.who(): {d.who()}")


# ========== mixin 混入（补充）==========

print("\n=== mixin 混入（补充）===")

class JSONMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__, ensure_ascii=False)

    @classmethod
    def from_json(cls, json_str):
        import json
        data = json.loads(json_str)
        return cls(**data)


class LogMixin:
    def log(self, msg):
        print(f"[LOG] {msg}")


class User(JSONMixin, LogMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email


u = User("Alice", "alice@example.com")
u.log("用户已创建")
print(f"JSON: {u.to_json()}")

# from_json
u2 = User.from_json('{"name": "Bob", "email": "bob@example.com"}')
print(f"反序列化: {u2.name}, {u2.email}")


# ========== 上下文管理器补充 @contextlib ==========

print("\n=== @contextlib 装饰器 ===")
import contextlib


@contextlib.contextmanager
def managed_resource(*args, **kwargs):
    """上下文管理器生成器"""
    resource = f"资源({args[0]})" if args else "资源"
    print(f"[进入] 获取 {resource}")
    try:
        yield resource
    finally:
        print(f"[退出] 释放 {resource}")


with managed_resource("数据库连接") as res:
    print(f"  使用 {res} 处理数据")


@contextlib.contextmanager
def tag(name):
    """HTML标签生成器"""
    print(f"<{name}>", end="")
    yield
    print(f"</{name}>", end="")


print("生成HTML:", end=" ")
with tag("div"):
    with tag("p"):
        print("Hello", end=" ")
    with tag("p"):
        print("World", end=" ")
print()


# ========== 弱引用 ==========

print("\n=== 弱引用 ===")
import weakref


class Node:
    def __init__(self, value):
        self.value = value
        self.neighbors = []

    def __repr__(self):
        return f"Node({self.value})"


node1 = Node(1)
node2 = Node(2)
node1.neighbors.append(weakref.ref(node2))
node2.neighbors.append(weakref.ref(node1))

print(f"node1 邻居: {node1.neighbors[0]()}")
del node2
import gc
gc.collect()
print(f"node1 邻居(引用已失效): {node1.neighbors[0]()}")


# ========== 类型提示 ==========

print("\n=== 类型提示 ===")
from typing import List, Dict, Optional, Union, Callable


class TypedList:
    """带类型检查的列表"""
    def __init__(self, item_type: type):
        self._item_type = item_type
        self._items: List = []

    def append(self, item) -> None:
        if not isinstance(item, self._item_type):
            raise TypeError(f"期望 {self._item_type.__name__}, 实际 {type(item).__name__}")
        self._items.append(item)

    def __getitem__(self, index) -> object:
        return self._items[index]

    def __len__(self) -> int:
        return len(self._items)


tl = TypedList(int)
tl.append(1)
tl.append(2)
# tl.append("hello")  # 会报错
print(f"TypedList: {[tl[i] for i in range(len(tl))]}")


# ========== 协程与异步 ==========

print("\n=== 协程基础 ===")


def simple_coroutine():
    """简单协程"""
    print("协程开始")
    x = yield "第一个值"
    print(f"收到: {x}")
    y = yield "第二个值"
    print(f"收到: {y}")
    yield "结束"


co = simple_coroutine()
print(f"next: {next(co)}")
print(f"send: {co.send(100)}")
print(f"send: {co.send(200)}")


def counter_coroutine():
    """计数器协程"""
    count = 0
    while True:
        received = yield count
        if received is not None:
            count = received
        else:
            count += 1


cnt = counter_coroutine()
print(f"计数: {next(cnt)}")
print(f"计数: {next(cnt)}")
print(f"重置为5: {cnt.send(5)}")
print(f"计数: {next(cnt)}")
print(f"计数: {next(cnt)}")
