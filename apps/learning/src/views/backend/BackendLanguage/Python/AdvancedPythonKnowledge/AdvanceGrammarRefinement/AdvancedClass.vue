<template>
  <div class="advanced-classes">
    <header class="hero">
      <h1>🐍 Python 类进阶特性完全指南</h1>
      <p>数据类 · 魔术方法 · 描述符 · 元类 · 抽象基类 · 插槽 · 属性协议</p>
    </header>

    <div class="cards-grid">
      <div v-for="feature in features" :key="feature.name" class="card">
        <div class="card-header">
          <span class="icon">{{ feature.icon }}</span>
          <h3>{{ feature.name }}</h3>
          <span class="tag">{{ feature.method || feature.deco || '特性' }}</span>
        </div>
        <p class="desc">{{ feature.desc }}</p>
        <pre class="code-snip"><code>{{ feature.code }}</code></pre>
      </div>
    </div>

    <footer class="footer">
      <p>💡 掌握这些进阶特性，写出更优雅、高效的 Python 类</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  name: string;
  icon: string;
  method?: string;
  deco?: string;
  desc: string;
  code: string;
}

const features: Feature[] = [
  {
    name: '数据类 (dataclass)',
    icon: '📦',
    deco: '@dataclass',
    desc: '自动生成 __init__, __repr__, __eq__ 等，减少样板代码。支持 frozen, order, slots 参数。',
    code: `from dataclasses import dataclass\n\n@dataclass(frozen=True, order=True, slots=True)\nclass Point:\n    x: int\n    y: int\n\np = Point(1, 2)\nprint(p)  # Point(x=1, y=2)`
  },
  {
    name: '__post_init__',
    icon: '🔧',
    method: '__post_init__',
    desc: '在 dataclass 中 __init__ 后执行，用于额外初始化或验证。',
    code: `@dataclass\nclass Person:\n    name: str\n    age: int\n    def __post_init__(self):\n        if self.age < 0:\n            raise ValueError("age must be positive")`
  },
  {
    name: '构造函数 & 分配器',
    icon: '🏗️',
    method: '__new__ / __init__',
    desc: '__new__ 控制实例创建（单例模式），__init__ 初始化实例。',
    code: `class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance`
  },
  {
    name: '字符串表示',
    icon: '🔤',
    method: '__str__ / __repr__',
    desc: '__str__ 面向用户，__repr__ 面向开发者（repr() 调用）。',
    code: `class Book:\n    def __init__(self, title): self.title = title\n    def __repr__(self): return f"Book('{self.title}')"\n    def __str__(self): return self.title`
  },
  {
    name: '容器协议',
    icon: '📚',
    method: '__len__ / __getitem__',
    desc: '使对象支持 len()、索引和切片。',
    code: `class Deck:\n    def __init__(self, cards): self.cards = cards\n    def __len__(self): return len(self.cards)\n    def __getitem__(self, pos): return self.cards[pos]`
  },
  {
    name: '可调用对象',
    icon: '📞',
    method: '__call__',
    desc: '实例可以像函数一样被调用，适合有状态的函数对象。',
    code: `class Multiplier:\n    def __init__(self, factor): self.factor = factor\n    def __call__(self, x): return x * self.factor\n\ndouble = Multiplier(2)\nprint(double(5))  # 10`
  },
  {
    name: '上下文管理器',
    icon: '📂',
    method: '__enter__ / __exit__',
    desc: '支持 with 语句，自动管理资源。',
    code: `class File:\n    def __enter__(self): return open('a.txt', 'w')\n    def __exit__(self, *args): self.file.close()`
  },
  {
    name: '比较运算符',
    icon: '⚖️',
    method: '__eq__ / __lt__ / __le__',
    desc: '重载 ==, <, <= 等。functools.total_ordering 可补全缺失的比较。',
    code: `class Vector:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __eq__(self, other): return self.x == other.x and self.y == other.y`
  },
  {
    name: '算术运算符',
    icon: '➕',
    method: '__add__ / __sub__ / __mul__',
    desc: '重载 +, -, * 等，支持对象间的数学运算。',
    code: `def __add__(self, other):\n    return Vector(self.x + other.x, self.y + other.y)`
  },
  {
    name: '属性访问拦截',
    icon: '🔒',
    method: '__getattr__ / __setattr__',
    desc: '__getattr__ 在属性缺失时调用，__setattr__ 拦截所有属性赋值。',
    code: `class Proxy:\n    def __getattr__(self, name): return f"Missing {name}"\n    def __setattr__(self, name, value): print(f"Set {name}={value}")`
  },
  {
    name: '属性细粒度控制',
    icon: '🔍',
    method: '__getattribute__',
    desc: '拦截所有属性访问（包括存在的），需谨慎使用避免无限递归。',
    code: `def __getattribute__(self, name):\n    print(f"Access {name}")\n    return super().__getattribute__(name)`
  },
  {
    name: '属性删除',
    icon: '🗑️',
    method: '__delattr__',
    desc: '拦截 del obj.attr 操作。',
    code: `def __delattr__(self, name):\n    print(f"Deleting {name}")\n    super().__delattr__(name)`
  },
  {
    name: '描述符协议',
    icon: '📐',
    method: '__get__ / __set__ / __delete__',
    desc: '复用属性逻辑，ORM 字段、数据验证的基础。',
    code: `class Positive:\n    def __set_name__(self, owner, name): self.name = name\n    def __get__(self, obj, type=None): return obj.__dict__[self.name]\n    def __set__(self, obj, val):\n        if val <= 0: raise ValueError\n        obj.__dict__[self.name] = val`
  },
  {
    name: '描述符名称绑定',
    icon: '🏷️',
    method: '__set_name__',
    desc: 'Python 3.6+，描述符自动获取属性名。',
    code: `def __set_name__(self, owner, name):\n    self.private_name = f"_{name}"`
  },
  {
    name: '属性装饰器',
    icon: '🏷️',
    deco: '@property / @setter',
    desc: '将方法转为属性调用，支持计算属性和校验。',
    code: `@property\ndef radius(self): return self._radius\n@radius.setter\ndef radius(self, val):\n    if val <= 0: raise ValueError\n    self._radius = val`
  },
  {
    name: '类方法 & 静态方法',
    icon: '🏛️',
    deco: '@classmethod / @staticmethod',
    desc: '类方法操作类状态，静态方法是命名空间内的普通函数。',
    code: `@classmethod\ndef from_string(cls, str): return cls(*str.split(','))\n@staticmethod\ndef util(): return 42`
  },
  {
    name: '迭代器协议',
    icon: '🔄',
    method: '__iter__ / __next__',
    desc: '使对象可迭代，支持 for 循环。',
    code: `def __iter__(self): return self\ndef __next__(self):\n    if self.n > self.max: raise StopIteration\n    self.n += 1; return self.n`
  },
  {
    name: '可哈希对象',
    icon: '🔑',
    method: '__hash__',
    desc: '定义对象哈希值，与 __eq__ 一同决定是否可放入集合或作为 dict 键。',
    code: `def __hash__(self): return hash((self.x, self.y))`
  },
  {
    name: '弱引用支持',
    icon: '🔗',
    method: '__weakref__',
    desc: '启用 __slots__ 后需手动添加 __weakref__ 才能被弱引用。',
    code: `class C:\n    __slots__ = ('x', '__weakref__')`
  },
  {
    name: '内存优化 __slots__',
    icon: '⚡',
    method: '__slots__',
    desc: '限制实例属性，消除 __dict__，大幅减少内存。',
    code: `class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y): self.x, self.y = x, y`
  },
  {
    name: '元类基础',
    icon: '🧬',
    method: '__new__ / __init__',
    desc: '元类的 __new__ 控制类创建，__init__ 初始化类。',
    code: `class Meta(type):\n    def __new__(cls, name, bases, dct):\n        dct['version'] = 1.0\n        return super().__new__(cls, name, bases, dct)`
  },
  {
    name: '元类调用钩子',
    icon: '🎯',
    method: '__call__',
    desc: '控制类的实例化过程，实现单例或缓存。',
    code: `def __call__(cls, *args, **kwargs):\n    if cls not in cls._instances:\n        cls._instances[cls] = super().__call__(*args, **kwargs)\n    return cls._instances[cls]`
  },
  {
    name: '抽象基类 (ABC)',
    icon: '📐',
    deco: '@abstractmethod',
    desc: '强制子类实现抽象方法，用于定义接口。',
    code: `from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass`
  },
  {
    name: '子类初始化钩子',
    icon: '🔌',
    method: '__init_subclass__',
    desc: '在子类被定义时调用，用于注册或收集子类。',
    code: `class PluginBase:\n    plugins = []\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        cls.plugins.append(cls)`
  },
  {
    name: '泛型支持 (__class_getitem__)',
    icon: '🧩',
    method: '__class_getitem__',
    desc: '使类支持 [] 语法，用于类型提示（如 List[int]）。',
    code: `class MyList:\n    def __class_getitem__(cls, item): return f"MyList[{item}]"\nprint(MyList[int])  # MyList[int]`
  },
  {
    name: '模式匹配参数',
    icon: '🎭',
    method: '__match_args__',
    desc: '配合 match-case 定义位置匹配的属性名。',
    code: `class Point:\n    __match_args__ = ('x', 'y')\n    def __init__(self, x, y): ...\n# match p: case Point(0,0): ...`
  },
  {
    name: '类型检查钩子',
    icon: '🛡️',
    method: '__instancecheck__ / __subclasscheck__',
    desc: '自定义 isinstance 和 issubclass 的行为。',
    code: `class Meta(type):\n    def __instancecheck__(cls, inst): return hasattr(inst, '__iter__')`
  },
  {
    name: '协程协议',
    icon: '🌀',
    method: '__await__',
    desc: '使对象可在 await 中使用，自定义可等待对象。',
    code: `def __await__(self):\n    yield from self._coro()  # 委托给协程`
  },
  {
    name: '格式化支持',
    icon: '🎨',
    method: '__format__',
    desc: '控制 format() 和 f-string 的格式化行为。',
    code: `def __format__(self, spec):\n    return f"{self.value:{spec}}"`
  }
];
</script>

<style lang="less" scoped>
.advanced-classes {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, monospace;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, #3b82f6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  p {
    color: #475569;
    margin-top: 0.25rem;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.2rem;
}

.card {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    border-color: #b9d0f0;
  }
}

.card-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;

  .icon {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #0f172a;
  }

  .tag {
    font-size: 0.65rem;
    background: #eef2ff;
    color: #1e40af;
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
    font-family: monospace;
  }
}

.desc {
  font-size: 0.8rem;
  color: #334155;
  margin: 0.5rem 0;
  line-height: 1.4;
}

.code-snip {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 0.6rem;
  padding: 0.5rem;
  font-size: 0.7rem;
  overflow-x: auto;
  margin: 0.5rem 0 0;

  code {
    font-family: 'Fira Code', monospace;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.8rem;
}

@media (max-width: 720px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
