<template>
  <div class="python-class-container">
    <header class="hero">
      <h1 class="title">📘 Python 类 <span class="accent">深度指南</span></h1>
      <p class="subtitle">面向对象编程 · 封装 · 继承 · 多态 · 魔法方法</p>
      <div class="hero-badge">
        <span>🐍 class</span><span>✨ OOP</span><span>⚙️ __init__</span>
      </div>
    </header>

    <!-- 概述卡片 -->
    <div class="overview-card">
      <p class="overview-text">
        Python 中的类通过 <strong>面向对象编程</strong> 将数据与行为封装在一起。相比函数式编程，类让代码结构更清晰、更易复用。
        掌握类的核心特性，可以写出更优雅、健壮的 Python 代码。
      </p>
    </div>

    <!-- 核心知识网格 -->
    <div class="features-grid">
      <article v-for="topic in classTopics" :key="topic.key" class="feature-card">
        <div class="card-header">
          <span class="topic-icon">{{ topic.icon }}</span>
          <h2 class="topic-title">{{ topic.title }}</h2>
        </div>
        <p class="topic-description">{{ topic.description }}</p>
        <div class="code-block">
          <pre><code>{{ topic.code }}</code></pre>
        </div>
        <div class="topic-footer">
          <span class="insight-tag">{{ topic.tag }}</span>
        </div>
      </article>
    </div>

    <!-- 使用场景与注意事项 -->
    <div class="extras-grid">
      <div class="scenarios card">
        <h3>💡 典型使用场景</h3>
        <ul>
          <li>数据结构封装（例如栈、队列、链表）</li>
          <li>大型业务逻辑模块（用户、订单、支付系统）</li>
          <li>框架组件开发（Django 模型、Flask 视图类）</li>
          <li>游戏开发（角色、武器、地图）</li>
          <li>设计模式实现（单例、工厂、观察者等）</li>
        </ul>
      </div>
      <div class="caution card">
        <h3>⚠️ 核心注意事项</h3>
        <ul>
          <li><strong>self 必须显式</strong> —— 实例方法的第一个参数是 self，类方法使用 cls</li>
          <li><strong>命名约定</strong> —— 单下划线 _protected，双下划线 __private 实现名称修饰</li>
          <li><strong>MRO (方法解析顺序)</strong> —— 多继承时 super() 遵循 C3 线性化算法</li>
          <li><strong>避免可变默认参数</strong> —— def __init__(self, items=[]) 会产生共享陷阱</li>
          <li><strong>类属性 vs 实例属性</strong> —— 修改类属性会影响所有未覆盖的实例</li>
          <li><strong>使用 @property 代替直接暴露属性</strong> —— 保持接口兼容性</li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>✨ Python 类 — 将现实世界的抽象化为优雅的代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义一个Python类知识卡片的数据结构
interface ClassTopic {
  key: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  tag: string;
}

const classTopics: ClassTopic[] = [
  {
    key: 'definition',
    icon: '🏗️',
    title: '类定义与 __init__',
    description: '使用 class 关键字定义类，__init__ 是构造函数，用于初始化实例属性。self 指向实例本身。',
    code: `class Dog:
    """狗类示例"""
    species = "Canis familiaris"  # 类属性

    def __init__(self, name, age):
        self.name = name          # 实例属性
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

# 使用类
my_dog = Dog("Buddy", 3)
print(my_dog.bark())   # Buddy says Woof!
print(my_dog.species)  # Canis familiaris`,
    tag: '__init__ | self | 实例化'
  },
  {
    key: 'methods',
    icon: '⚡',
    title: '实例方法 · 类方法 · 静态方法',
    description: '@classmethod 操作类状态，@staticmethod 纯粹工具函数，实例方法操作实例数据。',
    code: `class MyClass:
    class_var = 0

    def instance_method(self):
        return f"实例方法，访问: {self.class_var}"

    @classmethod
    def class_method(cls):
        cls.class_var += 1
        return f"类方法，修改类变量: {cls.class_var}"

    @staticmethod
    def static_method():
        return "静态方法，独立工具函数"

# 调用方式
obj = MyClass()
print(obj.instance_method())
print(MyClass.class_method())   # 类方法
print(MyClass.static_method())  # 静态方法`,
    tag: '@classmethod | @staticmethod'
  },
  {
    key: 'inheritance',
    icon: '🧬',
    title: '继承与 super()',
    description: '子类可扩展或重写父类方法，通过 super() 安全调用父类逻辑。支持多继承与 MRO。',
    code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} 发出了声音"

class Cat(Animal):
    def speak(self):          # 方法重写
        return f"{self.name} 喵喵叫 ~"

class Dog(Animal):
    def speak(self):
        return f"{self.name} 汪汪!"

# super() 示例
class DisplayMixin:
    def show(self):
        print(f"显示: {self}")

class AdvancedCat(Cat, DisplayMixin):
    pass

tom = AdvancedCat("Tom")
print(tom.speak())   # Tom 喵喵叫 ~
tom.show()           # 混合正常`,
    tag: '继承 | 多态 | super()'
  },
  {
    key: 'property',
    icon: '🔖',
    title: '@property 属性装饰器',
    description: '将方法变成属性调用，实现计算属性、验证控制，保持接口简洁。',
    code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("低于绝对零度!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

# 使用
temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0
temp.celsius = 30        # setter 生效`,
    tag: '@property | getter/setter'
  },
  {
    key: 'magic-methods',
    icon: '✨',
    title: '魔术方法 (Magic Methods)',
    description: '双下划线方法让类支持 Python 内置行为，如长度、比较、迭代、上下文管理等。',
    code: `class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __len__(self):
        return self.pages

    def __eq__(self, other):
        return self.title == other.title

    def __repr__(self):
        return f"Book('{self.title}', {self.pages})"

    def __str__(self):
        return self.title

book = Book("Python进阶", 350)
print(len(book))         # 350 (__len__)
print(book)              # Python进阶 (__str__)
print(repr(book))        # Book('Python进阶', 350)`,
    tag: '__len__ | __eq__ | __repr__'
  },
  {
    key: 'encapsulation',
    icon: '🔒',
    title: '封装与私有成员',
    description: '单下划线表示“保护”，双下划线触发名称修饰（_ClassName__var），约定优于强制。',
    code: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner          # 公共属性
        self._password = "1234"     # 保护 (约定)
        self.__balance = balance    # 私有 (名称修饰)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

account = BankAccount("Alice", 1000)
print(account.owner)       # Alice
# print(account.__balance) # 报错 AttributeError
print(account._BankAccount__balance) # 但仍可访问 (名称修饰)
account.deposit(500)
print(account.get_balance())   # 1500`,
    tag: '命名约定 | 名称修饰'
  }
];
</script>

<style lang="less" scoped>
// 颜色系统 (干净柔和)
@bg-light: #f9fafb;
@card-white: #ffffff;
@primary-text: #1e293b;
@secondary-text: #475569;
@code-dark: #0f172a;
@code-fg: #e2e8f0;
@accent-blue: #3b82f6;
@border-light: #eef2f6;

.python-class-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg-light;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

// Hero 区域
.hero {
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @primary-text;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;

    .accent {
      background: linear-gradient(135deg, @accent-blue, #6366f1);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    color: @secondary-text;
    font-weight: 500;
  }

  .hero-badge {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 0.8rem;

    span {
      background: #eef2ff;
      padding: 0.25rem 0.9rem;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
      color: @accent-blue;
      font-family: monospace;
    }
  }
}

// 概述卡片
.overview-card {
  background: @card-white;
  border-radius: 1.5rem;
  padding: 1.2rem 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03);
  border: 1px solid @border-light;
  text-align: center;

  .overview-text {
    font-size: 1rem;
    line-height: 1.6;
    color: @secondary-text;

    strong {
      color: @accent-blue;
    }
  }
}

// 网格卡片
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.feature-card {
  background: @card-white;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  border: 1px solid @border-light;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

.card-header {
  padding: 1.2rem 1.5rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 2px solid #f1f5f9;

  .topic-icon {
    font-size: 1.9rem;
  }

  .topic-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: @primary-text;
    margin: 0;
  }
}

.topic-description {
  padding: 0.8rem 1.5rem 0.5rem;
  color: @secondary-text;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block {
  background: @code-dark;
  margin: 0 1rem 1rem 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  pre {
    margin: 0;
    padding: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  code {
    color: @code-fg;
    font-weight: 400;
  }
}

.topic-footer {
  padding: 0.6rem 1.5rem 1.2rem;
  margin-top: auto;

  .insight-tag {
    background: #eef2ff;
    padding: 0.2rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: @accent-blue;
    font-family: monospace;
  }
}

// 使用场景和注意事项双栏
.extras-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2rem;

  .card {
    background: @card-white;
    border-radius: 1.25rem;
    padding: 1.2rem 1.8rem;
    border: 1px solid @border-light;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: @primary-text;
      border-left: 4px solid @accent-blue;
      padding-left: 0.75rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
        color: @secondary-text;

        strong {
          color: @accent-blue;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  color: #5b6e8c;
  font-size: 0.85rem;
  font-weight: 500;
}

// 响应式
@media (max-width: 720px) {
  .python-class-container {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.8rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .extras-grid {
    grid-template-columns: 1fr;
  }

  .code-block {
    font-size: 0.7rem;
  }
}
</style>
