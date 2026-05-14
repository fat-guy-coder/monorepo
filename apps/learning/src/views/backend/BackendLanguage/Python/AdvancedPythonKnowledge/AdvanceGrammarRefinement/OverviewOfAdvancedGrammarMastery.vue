<template>
  <div class="python-advanced-container">
    <header class="hero">
      <h1 class="title">🐍 Python 进阶语法精讲</h1>
      <p class="subtitle">深入理解装饰器 · 生成器 · 上下文管理器 · 描述符 · 元类 · 运算符重载</p>
    </header>

    <div class="features-grid">
      <article v-for="feature in features" :key="feature.key" class="feature-card">
        <div class="card-header">
          <span class="feature-icon">{{ feature.icon }}</span>
          <h2 class="feature-title">{{ feature.title }}</h2>
        </div>
        <p class="feature-description">{{ feature.description }}</p>
        <div class="code-block">
          <pre><code>{{ feature.code }}</code></pre>
        </div>
        <div class="feature-footer">
          <span class="accent-tag">{{ feature.tag }}</span>
        </div>
      </article>
    </div>

    <footer class="footer">
      <p>✨ 掌握这些进阶特性，写出更优雅高效的 Python 代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义特性数据接口
interface Feature {
  key: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tag: string;
}

// 核心进阶特性数据 (包含装饰器、生成器、上下文管理器、描述符、元类、运算符重载)
const features: Feature[] = [
  {
    key: 'decorator',
    icon: '🎨',
    title: '装饰器 (Decorator)',
    description: '在不修改原函数代码的情况下，动态地为函数添加额外功能。常用于日志、计时、缓存、权限校验等场景。',
    code: `import functools
import time

# 定义一个计时装饰器
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} 耗时: {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.5)
    return "完成"

slow_function()  # 输出: slow_function 耗时: 0.5002s`,
    tag: '@decorator | 语法糖'
  },
  {
    key: 'generator',
    icon: '⚙️',
    title: '生成器 (Generator)',
    description: '使用 yield 关键字定义惰性求值的迭代器，能够按需生成数据，节省内存，适合处理大规模数据流。',
    code: `# 斐波那契数列生成器 (惰性求值)
def fibonacci(limit):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

# 使用生成器
for num in fibonacci(10):
    print(num, end=" ")
# 输出: 0 1 1 2 3 5 8 13 21 34

# 生成器表达式 (类似列表推导式但使用圆括号)
squares = (x * x for x in range(5))
print(list(squares))  # [0, 1, 4, 9, 16]`,
    tag: 'yield | 惰性求值'
  },
  {
    key: 'context-manager',
    icon: '📂',
    title: '上下文管理器 (Context Manager)',
    description: '使用 with 语句管理资源，自动处理资源的获取与释放（如文件、锁、数据库连接）。可基于类或 contextlib 实现。',
    code: `# 基于类的上下文管理器
class ManagedFile:
    def __init__(self, filename, mode='r'):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # 返回 True 可抑制异常传播
        return False

# 使用自定义上下文管理器
with ManagedFile('example.txt', 'w') as f:
    f.write('Hello, Context Manager!')

# 使用 contextlib 简化实现
from contextlib import contextmanager

@contextmanager
def temp_scope():
    print("进入上下文")
    yield
    print("退出上下文")

with temp_scope():
    print("执行核心逻辑")`,
    tag: 'with | 资源管理'
  },
  {
    key: 'descriptor',
    icon: '🔍',
    title: '描述符 (Descriptor)',
    description: '通过实现 __get__、__set__、__delete__ 协议，控制属性的访问行为。常用于数据验证、类型检查、惰性属性。',
    code: `# 描述符：验证年龄范围
class AgeDescriptor:
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val
        self.data = {}

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return self.data.get(instance, self.min_val)

    def __set__(self, instance, value):
        if not (self.min_val <= value <= self.max_val):
            raise ValueError(f"年龄必须在 {self.min_val}-{self.max_val} 之间")
        self.data[instance] = value

class Person:
    age = AgeDescriptor(0, 120)

p = Person()
p.age = 25   # 正常
print(p.age) # 25
# p.age = 200  # 触发 ValueError`,
    tag: '__get__ / __set__ | 属性协议'
  },
  {
    key: 'metaclass',
    icon: '🧬',
    title: '元类 (Metaclass)',
    description: '元类是创建类的类，type 是内置元类。通过自定义元类可以拦截类创建过程，实现 ORM、单例、自动注册等高级功能。',
    code: `# 元类示例: 自动为类添加版本属性
class VersionMeta(type):
    def __new__(cls, name, bases, namespace):
        # 在类创建时追加一个 __version__ 属性
        namespace['__version__'] = '1.0.0'
        # 将所有方法名转为小写 (演示元类干预)
        new_namespace = {}
        for key, value in namespace.items():
            if callable(value) and not key.startswith('__'):
                new_namespace[key.lower()] = value
            else:
                new_namespace[key] = value
        return super().__new__(cls, name, bases, new_namespace)

class Service(metaclass=VersionMeta):
    def ProcessData(self):
        return "处理中"

print(Service.__version__)   # 1.0.0
obj = Service()
print(obj.processdata())     # 方法名被转为小写: 输出 "处理中"`,
    tag: 'type | 类创建拦截'
  },
  {
    key: 'operator-overload',
    icon: '🧮',
    title: '运算符重载 (Operator Overloading)',
    description: '通过特殊方法（如 __add__、__eq__、__len__）让自定义对象支持内置运算符，实现数学和逻辑上的自然行为。',
    code: `# 二维向量类，重载加法、比较和字符串表示
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2   # 使用 __add__
print(v3)       # Vector(6, 8)
print(v1 == Vector(2, 3))  # True

# 重载 __len__ 与 __getitem__ 让对象支持序列协议
class Deck:
    def __init__(self, cards):
        self.cards = cards
    def __len__(self):
        return len(self.cards)
    def __getitem__(self, pos):
        return self.cards[pos]`,
    tag: '__add__ / __eq__ | 运算符协议'
  }
];
</script>

<style lang="less" scoped>
// 颜色变量 (简约清新风格)
@primary-color: #2c3e50;
@accent-color: #3b82f6;
@code-bg: #1e1e2f;
@code-color: #f8f8f2;
@card-bg: #ffffff;
@body-bg: #f8fafc;
@border-radius: 1rem;
@shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.1);

.python-advanced-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @body-bg;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem 0;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: -0.01em;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #4b5563;
    font-weight: 400;
    border-top: 2px solid #e2e8f0;
    display: inline-block;
    padding-top: 0.75rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: @card-bg;
  border-radius: @border-radius;
  box-shadow: @shadow-sm;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: @shadow-hover;
    border-color: rgba(59, 130, 246, 0.2);
  }
}

.card-header {
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 2px solid #f1f5f9;

  .feature-icon {
    font-size: 2rem;
    line-height: 1;
  }

  .feature-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: @primary-color;
    margin: 0;
    letter-spacing: -0.3px;
  }
}

.feature-description {
  padding: 1rem 1.5rem 0.8rem 1.5rem;
  color: #334155;
  line-height: 1.5;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.code-block {
  background: @code-bg;
  margin: 0 1.2rem 1rem 1.2rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1);

  pre {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    color: @code-color;
    font-family: inherit;
    font-weight: 400;
  }
}

.feature-footer {
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
  margin-top: auto;

  .accent-tag {
    display: inline-block;
    background: #eef2ff;
    color: @accent-color;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    letter-spacing: 0.3px;
    font-family: monospace;
  }
}

.footer {
  text-align: center;
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.9rem;
  font-weight: 500;
}

// 响应式微调
@media (max-width: 768px) {
  .python-advanced-container {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.8rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .card-header .feature-title {
    font-size: 1.3rem;
  }

  .code-block {
    font-size: 0.7rem;
  }
}

// 自定义滚动条 (代码区域)
.code-block::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.code-block::-webkit-scrollbar-track {
  background: #2d2d3a;
  border-radius: 8px;
}

.code-block::-webkit-scrollbar-thumb {
  background: #57577a;
  border-radius: 8px;
}
</style>
