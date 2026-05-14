<template>
  <div class="oo-advanced-container">
    <header class="hero">
      <h1 class="title">🐍 Python 面向对象 <span class="gradient">进阶指南</span></h1>
      <p class="subtitle">抽象基类 · MRO · 混入 · 描述符 · 元类 · slots · 数据类 · 枚举</p>
      <div class="badge-group">
        <span class="badge">⚡ 高级技巧</span>
        <span class="badge">🧩 设计模式基石</span>
        <span class="badge">✨ 写出优雅框架</span>
      </div>
    </header>

    <!-- 进阶知识卡片网格 -->
    <div class="cards-grid">
      <article v-for="item in advancedTopics" :key="item.id" class="topic-card">
        <div class="card-head">
          <span class="card-icon">{{ item.icon }}</span>
          <h2 class="card-title">{{ item.title }}</h2>
        </div>
        <p class="card-desc">{{ item.description }}</p>
        <div class="code-area">
          <pre><code>{{ item.code }}</code></pre>
        </div>
        <div class="card-footer">
          <span class="tag">{{ item.tag }}</span>
        </div>
      </article>
    </div>

    <!-- 进阶思维导引 -->
    <div class="insight-section">
      <div class="insight-card">
        <h3>📌 为何需要这些进阶特性？</h3>
        <p>在实际的大型项目或框架设计中，基础面向对象已经无法满足 <strong>代码复用、类型安全、动态控制</strong> 的需求。抽象基类规范接口，元类掌控类创建，描述符实现属性拦截，混入优雅地组合行为……
          掌握这些技术，你将真正理解 Python 的强大设计哲学。</p>
      </div>
      <div class="insight-card">
        <h3>🎯 最佳实践提示</h3>
        <ul>
          <li>使用 <code>abc.ABC</code> 明确接口契约</li>
          <li>用 <code>@dataclass</code> 代替繁琐的 __init__</li>
          <li>合理使用 <code>__slots__</code> 优化内存与访问速度</li>
          <li>通过 <code>Enum</code> 避免魔数，提高可读性</li>
          <li>理解 MRO 以安全使用多继承与 Mixin</li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>✨ 深入 Python 类的内核，编写更专业、更 Pythonic 的代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义进阶主题数据结构
interface AdvancedTopic {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tag: string;
}

const advancedTopics: AdvancedTopic[] = [
  {
    id: 'abc',
    icon: '📐',
    title: '抽象基类 (ABC)',
    description: '通过 abc 模块定义抽象方法，强制子类实现特定接口，用于设计规范的类层次结构。',
    code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

# Shape()  # 无法实例化
c = Circle(5)
print(c.area())  # 78.53975`,
    tag: '@abstractmethod | 接口规范'
  },
  {
    id: 'mro-mixin',
    icon: '🧬',
    title: '多继承 MRO 与 Mixin',
    description: '方法解析顺序 (C3线性化) 保证深度优先、从左至右；Mixin 类提供可插拔的功能复用。',
    code: `class LogMixin:
    def log(self, msg):
        print(f"[LOG] {msg}")

class SaveMixin:
    def save(self):
        print("保存数据...")

class User(LogMixin, SaveMixin):
    def __init__(self, name):
        self.name = name
        self.log(f"创建用户 {name}")

u = User("Alice")
u.save()
print(User.__mro__)  # 显示继承顺序`,
    tag: 'class Mixin | C3 线性化'
  },
  {
    id: 'descriptor',
    icon: '🔍',
    title: '描述符 (Descriptor)',
    description: '实现 __get__ / __set__ / __delete__ 协议，对属性访问进行精细控制（验证、转换、惰性加载）。',
    code: `class PositiveNumber:
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        return obj.__dict__.get(self.name)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.name} 必须为正数")
        obj.__dict__[self.name] = value

class Order:
    quantity = PositiveNumber()
    price = PositiveNumber()

order = Order()
order.quantity = 10   # OK
# order.price = -5    # 抛出 ValueError`,
    tag: '__get__ / __set__ | 属性拦截'
  },
  {
    id: 'metaclass',
    icon: '🧠',
    title: '元类 (Metaclass)',
    description: '类的类，用于在类创建时动态修改或增强类行为，广泛应用于 ORM、单例模式、注册表等。',
    code: `class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self):
        print("初始化数据库连接")

db1 = Database()  # 输出: 初始化数据库连接
db2 = Database()  # 无输出，直接返回已有实例
print(db1 is db2)  # True`,
    tag: 'type | 类创建拦截'
  },
  {
    id: 'slots',
    icon: '⚡',
    title: '__slots__ 优化',
    description: '限制实例属性，并大幅减少内存占用，提升属性访问速度，适用于大量简单对象。',
    code: `class Point:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(10, 20)
p.x = 15
# p.z = 30   # AttributeError: 'Point' object has no attribute 'z'

# 内存对比：普通类每个实例有 __dict__，__slots__ 消除字典开销
import sys
class NormalPoint: pass
np = NormalPoint()
print(sys.getsizeof(np))   # 56 (字典开销)
print(sys.getsizeof(p))    # 48 (仅两个属性指针)`,
    tag: '__slots__ | 内存优化'
  },
  {
    id: 'dataclass',
    icon: '📦',
    title: '数据类 (dataclass)',
    description: '自动生成 __init__、__repr__、__eq__ 等方法，减少样板代码，支持默认值和不可变性。',
    code: `from dataclasses import dataclass, field

@dataclass
class Person:
    name: str
    age: int = 0
    tags: list = field(default_factory=list)

    def greet(self):
        return f"Hello, I'm {self.name}"

p1 = Person("Alice", 28)
p2 = Person("Bob")
print(p1)            # Person(name='Alice', age=28, tags=[])
print(p1 == Person("Alice", 28))  # True (自动 eq)
p2.tags.append("new")`,
    tag: '@dataclass | 样板消除'
  },
  {
    id: 'enum',
    icon: '🎨',
    title: '枚举 (Enum)',
    description: '定义符号常量，提高代码可读性，避免使用魔数，支持成员名称和值的迭代与比较。',
    code: `from enum import Enum, auto

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

class Status(Enum):
    PENDING = auto()
    RUNNING = auto()
    FINISHED = auto()

def paint(color: Color):
    print(f"使用颜色: {color.name} ({color.value})")

paint(Color.RED)          # 使用颜色: RED (1)
print(list(Status))       # 遍历所有成员
# 支持别名与值比较`,
    tag: 'Enum | 常量集合'
  },
  {
    id: 'weakref',
    icon: '🔗',
    title: '弱引用 (weakref)',
    description: '避免循环引用导致的内存泄漏，允许在不延长对象生命周期的情况下引用对象。缓存、监听器常见。',
    code: `import weakref

class Node:
    def __init__(self, value):
        self.value = value
        self.parent = None
        self.children = []

parent = Node("parent")
child = Node("child")
child.parent = weakref.ref(parent)  # 弱引用父节点
parent.children.append(child)

# 删除 parent 后，弱引用返回 None
del parent
print(child.parent())  # None (原 parent 对象已被回收)`,
    tag: 'weakref.ref | 内存管理'
  }
];
</script>

<style lang="less" scoped>
// 颜色变量 (简约现代)
@bg-page: #f8fafc;
@card-bg: #ffffff;
@primary-dark: #0f172a;
@accent: #3b82f6;
@text-secondary: #475569;
@border-light: #eef2f6;
@code-bg: #1e293b;
@code-fg: #e2e8f0;

.oo-advanced-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg-page;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

// 头部样式
.hero {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-dark;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;

    .gradient {
      background: linear-gradient(135deg, @accent, #6366f1);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  .badge-group {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    .badge {
      background: #eef2ff;
      color: @accent;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 1rem;
      border-radius: 2rem;
      font-family: monospace;
    }
  }
}

// 卡片网格
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.topic-card {
  background: @card-bg;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid @border-light;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
    border-color: rgba(59, 130, 246, 0.2);
  }
}

.card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 1.5rem 0.2rem 1.5rem;
  border-bottom: 2px solid #f1f5f9;

  .card-icon {
    font-size: 1.8rem;
  }

  .card-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: @primary-dark;
    margin: 0;
  }
}

.card-desc {
  padding: 0.8rem 1.5rem 0.2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: @text-secondary;
}

.code-area {
  background: @code-bg;
  margin: 0.8rem 1rem 1rem 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;

  pre {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    color: @code-fg;
  }
}

.card-footer {
  padding: 0.5rem 1.5rem 1.2rem;
  margin-top: auto;

  .tag {
    background: #f1f5f9;
    padding: 0.2rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: #334155;
    font-family: monospace;
  }
}

// 洞察区域双栏
.insight-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2rem;

  .insight-card {
    background: @card-bg;
    border-radius: 1.25rem;
    padding: 1.2rem 1.8rem;
    border: 1px solid @border-light;

    h3 {
      margin-top: 0;
      font-weight: 600;
      font-size: 1.1rem;
      color: @primary-dark;
      border-left: 4px solid @accent;
      padding-left: 0.75rem;
    }

    p {
      color: @text-secondary;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
        color: @text-secondary;
        font-size: 0.9rem;

        code {
          background: #eef2ff;
          padding: 0.1rem 0.3rem;
          border-radius: 6px;
          font-size: 0.8rem;
          color: @accent;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.85rem;
}

@media (max-width: 760px) {
  .oo-advanced-container {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.9rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .insight-section {
    grid-template-columns: 1fr;
  }

  .code-area {
    font-size: 0.7rem;
  }
}
</style>
