# Python 类与面向对象

# ========== 类的定义与实例化 ==========

print("=== 类的定义与实例化 ===")

class Person:
    """一个人类"""
    # 类属性（所有实例共享）
    species = "人类"

    # 初始化方法（构造器）
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age

    # 实例方法
    def say_hello(self):
        return f"你好，我是{self.name}"

    # 字符串表示
    def __str__(self):
        return f"Person({self.name}, {self.age})"

    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age})"


# 创建实例
p1 = Person("小明", 20)
p2 = Person("小红", 18)

print(p1)
print(p2)
print(p1.say_hello())
print(f"p1 的物种: {p1.species}")
print(f"p2 的物种: {p2.species}")

# 类属性可以被所有实例修改（但不要这样做）
Person.species = "智人"
print(f"修改后 p1 的物种: {p1.species}")


# ========== 访问限制（封装） ==========

print("\n=== 访问限制 ===")

class Student:
    def __init__(self, name, score):
        self.name = name          # 公开属性
        self._score = score       # 受保护属性（约定用下划线开头）
        self.__grade = "A"        # 私有属性（名字重整为 _Student__grade）

    def get_score(self):
        """获取分数"""
        return self._score

    def set_score(self, score):
        """设置分数"""
        if 0 <= score <= 100:
            self._score = score
        else:
            raise ValueError("分数必须在0-100之间")

    @property
    def grade(self):
        """属性装饰器 - 获取等级"""
        if self._score >= 90:
            return "A"
        elif self._score >= 80:
            return "B"
        elif self._score >= 60:
            return "C"
        else:
            return "D"


s = Student("张三", 85)
print(f"学生: {s.name}, 分数: {s.get_score()}")
print(f"等级: {s.grade}")

s.set_score(92)
print(f"修改后分数: {s.get_score()}, 等级: {s.grade}")

# 访问私有属性（不推荐）
print(f"私有属性(名字重整后): {s._Student__grade}")

# property 装饰器用法
s._score = 55
print(f"通过 property 获取等级: {s.grade}")


# ========== 继承 ==========

print("\n=== 继承 ===")

class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."


class Dog(Animal):
    """Dog 继承自 Animal"""
    def speak(self):
        return "汪汪汪"


class Cat(Animal):
    """Cat 继承自 Animal"""
    def speak(self):
        return "喵喵喵"


class BullDog(Dog):
    """斗牛犬 - 多层继承"""
    def speak(self):
        return "哼哼哼"


dog = Dog("旺财")
cat = Cat("咪咪")
bull = BullDog("小斗")

print(f"{dog.name}: {dog.speak()}")
print(f"{cat.name}: {cat.speak()}")
print(f"{bull.name}: {bull.speak()}")


# ========== 多继承 ==========

print("\n=== 多继承 ===")

class Flyable:
    def fly(self):
        return "我可以飞"


class Swimmable:
    def swim(self):
        return "我可以游泳"


class Duck(Animal, Flyable, Swimmable):
    """鸭子继承自动物，同时会飞和游泳"""
    def speak(self):
        return "嘎嘎嘎"


duck = Duck("唐老鸭")
print(f"{duck.name}: {duck.speak()}")
print(duck.fly())
print(duck.swim())


# ========== super() 调用父类方法 ==========

print("\n=== super() 调用父类 ===")

class Teacher(Animal):
    def __init__(self, name, subject):
        super().__init__(name)  # 调用父类的 __init__
        self.subject = subject

    def teach(self):
        return f"教{self.subject}"

    def speak(self):
        return f"我是教{self.subject}的老师"


t = Teacher("李老师", "数学")
print(f"{t.name}, {t.teach()}")
print(t.speak())


# ========== 类方法与静态方法 ==========

print("\n=== 类方法与静态方法 ===")

class MathUtils:
    PI = 3.14159

    def __init__(self):
        pass

    # 实例方法
    def double(self, x):
        return x * 2

    # 类方法 - 通过类或实例调用，第一个参数是类本身
    @classmethod
    def circle_area(cls, radius):
        """计算圆面积"""
        return cls.PI * radius * radius

    # 静态方法 - 不依赖类或实例的方法
    @staticmethod
    def add(a, b):
        """加法"""
        return a + b


m = MathUtils()
print(f"实例方法 double(5): {m.double(5)}")
print(f"类方法 circle_area(2): {MathUtils.circle_area(2):.2f}")
print(f"静态方法 add(3, 4): {MathUtils.add(3, 4)}")
print(f"类属性 PI: {MathUtils.PI}")


# ========== 特殊方法（魔术方法）==========

print("\n=== 特殊方法 ===")

class Vector:
    """二维向量"""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    # + 运算符
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    # - 运算符
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    # * 运算符（数乘）
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    # == 运算符
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    # < 运算符（用于排序）
    def __lt__(self, other):
        return (self.x ** 2 + self.y ** 2) < (other.x ** 2 + other.y ** 2)

    # 负向量
    def __neg__(self):
        return Vector(-self.x, -self.y)

    # 绝对值（向量的模）
    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    # 长度（与 abs 相同）
    def __len__(self):
        return int(self.__abs__())

    # 字符串表示
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    # 官方表示
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    # 索引访问 v[0], v[1]
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        else:
            raise IndexError("索引超出范围")

    # 设置属性 v[0] = 10
    def __setitem__(self, index, value):
        if index == 0:
            self.x = value
        elif index == 1:
            self.y = value
        else:
            raise IndexError("索引超出范围")

    # 可迭代
    def __iter__(self):
        return iter([self.x, self.y])

    # 布尔判断
    def __bool__(self):
        return self.x != 0 or self.y != 0


v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(f"v1: {v1}")
print(f"v2: {v2}")
print(f"v1 + v2: {v1 + v2}")
print(f"v1 - v2: {v1 - v2}")
print(f"v1 * 2: {v1 * 2}")
print(f"v1 == v2: {v1 == v2}")
print(f"v1 < v2: {v1 < v2}")
print(f"-v1: {-v1}")
print(f"|v1|: {abs(v1)}")
print(f"len(v1): {len(v1)}")
print(f"v1[0]: {v1[0]}, v1[1]: {v1[1]}")
print(f"bool(v1): {bool(v1)}")
print(f"list(v1): {list(v1)}")


# ========== 抽象类 ==========

print("\n=== 抽象类 ===")

from abc import ABC, abstractmethod

class Shape(ABC):
    """抽象形状类"""

    @abstractmethod
    def area(self):
        """计算面积"""
        pass

    @abstractmethod
    def perimeter(self):
        """计算周长"""
        pass

    def info(self):
        """普通方法（可以有自己的实现）"""
        return f"面积: {self.area()}, 周长: {self.perimeter()}"


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius


r = Rectangle(4, 5)
c = Circle(3)
print(f"矩形: {r.info()}")
print(f"圆形: {c.info()}")

# 抽象类不能直接实例化
# s = Shape()  # 报错


# ========== 数据类（dataclass）==========

print("\n=== 数据类 dataclass ===")

from dataclasses import dataclass, field

@dataclass
class Point:
    x: int
    y: int
    name: str = "原点"  # 带默认值的字段

    def distance_to_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5


@dataclass
class Circle2:
    center: Point
    radius: int

    def area(self):
        return 3.14159 * self.radius ** 2


p1 = Point(3, 4)
p2 = Point(0, 0, "原点")

c = Circle2(p1, 5)

print(f"点: {p1}")
print(f"到原点距离: {p1.distance_to_origin():.2f}")
print(f"圆中心: {c.center}, 半径: {c.radius}")
print(f"圆面积: {c.area():.2f}")

# 数据类自动生成 __eq__, __repr__, __init__ 等


# ========== 槽类（__slots__）==========

print("\n=== __slots__ 限制属性 ===")

class PointWithSlots:
    """使用 __slots__ 可以限制实例属性，节省内存"""
    __slots__ = ['x', 'y']

    def __init__(self, x, y):
        self.x = x
        self.y = y


ps = PointWithSlots(1, 2)
print(f"ps: x={ps.x}, y={ps.y}")
# ps.z = 3  # 报错！不能添加新属性


# ========== 描述符（Descriptor）==========

print("\n=== 描述符 ===")

class Positive:
    """确保属性值为正数的描述符"""

    def __init__(self):
        self.values = {}

    def __get__(self, instance, owner):
        return self.values.get(instance, 0)

    def __set__(self, instance, value):
        if value < 0:
            raise ValueError("值必须为正数")
        self.values[instance] = value


class Account:
    balance = Positive()

    def __init__(self, initial_balance):
        self.balance = initial_balance


a = Account(100)
print(f"账户余额: {a.balance}")
a.balance = 50
print(f"修改后余额: {a.balance}")

# 负数会报错
try:
    a.balance = -10
except ValueError as e:
    print(f"错误: {e}")


# ========== 元类（Metaclass）简介 ==========

print("\n=== 元类 ===")

class Meta(type):
    """自定义元类"""

    def __new__(mcs, name, bases, attrs):
        # 在类创建前添加一个类属性
        attrs['created_by'] = 'Meta'
        return super().__new__(mcs, name, bases, attrs)


class MyClass(metaclass=Meta):
    """使用元类创建"""
    pass


print(f"MyClass.created_by: {MyClass.created_by}")


# ========== 混入（Mixin）模式 ==========

print("\n=== Mixin 混入 ===")

class LogMixin:
    """日志混入类"""

    def log(self, msg):
        print(f"[LOG] {msg}")


class SerializableMixin:
    """序列化混入类"""

    def to_dict(self):
        result = {}
        for k, v in self.__dict__.items():
            if not k.startswith('_'):
                result[k] = v
        return result


class User(LogMixin, SerializableMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email


u = User("Alice", "alice@example.com")
u.log("用户已创建")
print(f"用户数据: {u.to_dict()}")


# ========== 组合 vs 继承 ==========

print("\n=== 组合（优先使用组合）===")

class Engine:
    def start(self):
        return "引擎启动"


class Wheel:
    def roll(self):
        return "轮子滚动"


class Car:
    """使用组合而不是继承"""
    def __init__(self):
        self.engine = Engine()
        self.wheels = [Wheel() for _ in range(4)]

    def drive(self):
        parts = [self.engine.start()] + [w.roll() for w in self.wheels]
        return ", ".join(parts)


car = Car()
print(car.drive())


# ========== 类之间的关系判断 ==========

print("\n=== 类关系判断 ===")

print(f"Dog 是 Animal 的子类: {issubclass(Dog, Animal)}")
print(f"Dog 是 object 的子类: {issubclass(Dog, object)}")

d = Dog("旺财")
print(f"d 是 Dog 的实例: {isinstance(d, Dog)}")
print(f"d 是 Animal 的实例: {isinstance(d, Animal)}")
print(f"d 的类型: {type(d)}")
print(f"d 的类名: {type(d).__name__}")
print(f"d 的类属性: {type(d).__bases__}")


# ========== 动态添加属性和方法 ==========

print("\n=== 动态添加属性和方法 ===")

class Person2:
    def __init__(self, name):
        self.name = name


p = Person2("小明")

# 动态添加属性
p.age = 20
print(f"动态添加 age: {p.age}")

# 动态添加方法
def say_goodbye(self):
    return f"{self.name} 说再见"


from types import MethodType
p.say_goodbye = MethodType(say_goodbye, p)
print(p.say_goodbye())

# 动态添加类方法
@classmethod
def from_birth_year(cls, name, year):
    age = 2024 - year
    return cls(name, age)


Person2.from_birth_year = from_birth_year
p2 = Person2.from_birth_year("小红", 2000)
print(f"通过类方法创建: {p2.name}, {p2.age}")