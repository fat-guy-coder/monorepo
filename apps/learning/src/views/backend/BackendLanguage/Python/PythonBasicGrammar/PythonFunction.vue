<template>
  <div class="functions-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>Python 函数</h1>
        </div>
        <p class="subtitle">封装复用 · 模块化编程 · 抽象与组织</p>
        <div class="divider"></div>
        <p class="intro-text">
          函数是组织好的、可重复使用的代码块，用于执行单一或相关联的动作。
          它能提高应用的模块性、代码复用率和可读性。Python 提供了灵活的函数定义方式和丰富的参数传递机制。
        </p>
      </div>
    </header>

    <!-- 函数基础定义 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📦</span>
        <h2>函数定义与调用</h2>
      </div>
      <p class="section-desc">使用 <code>def</code> 关键字定义函数，函数名后跟圆括号和冒号，函数体必须缩进。</p>
      <div class="syntax-block">
        <pre class="code-block"><code>def function_name(parameters):
    """文档字符串（可选）"""
    # 函数体
    return value  # 可选</code></pre>
      </div>
      <div class="example-box">
        <h4>📋 基本示例</h4>
        <pre class="code-block"><code>def greet(name):
    """向用户打招呼"""
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!
print(greet.__doc__)   # 向用户打招呼</code></pre>
      </div>
    </section>

    <!-- 参数类型详解 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔧</span>
        <h2>参数类型</h2>
      </div>
      <div class="params-grid">
        <div class="param-card">
          <h3>📍 位置参数</h3>
          <p>按定义顺序传递，数量必须匹配。</p>
          <pre class="code-block small"><code>def power(base, exp):
    return base ** exp

power(2, 3)  # 8</code></pre>
        </div>
        <div class="param-card">
          <h3>🔖 关键字参数</h3>
          <p>通过参数名指定，顺序可任意。</p>
          <pre class="code-block small"><code>def describe(name, age):
    print(name, age)

describe(age=30, name="Bob")</code></pre>
        </div>
        <div class="param-card">
          <h3>⚙️ 默认参数</h3>
          <p>未传递时使用默认值。注意：默认参数在函数定义时计算，且应为不可变对象。</p>
          <pre class="code-block small"><code>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}"

greet("Eve")           # Hello, Eve
greet("Eve", "Hi")     # Hi, Eve</code></pre>
        </div>
        <div class="param-card">
          <h3>📦 可变参数 (*args)</h3>
          <p>接收任意数量的位置参数，打包为元组。</p>
          <pre class="code-block small"><code>def sum_all(*numbers):
    return sum(numbers)

sum_all(1, 2, 3, 4)  # 10</code></pre>
        </div>
        <div class="param-card">
          <h3>📖 关键字可变参数 (**kwargs)</h3>
          <p>接收任意数量的关键字参数，打包为字典。</p>
          <pre class="code-block small"><code>def print_info(**info):
    for k, v in info.items():
        print(f"{k}: {v}")

print_info(name="Alice", age=25)</code></pre>
        </div>
        <div class="param-card">
          <h3>🔒 仅限关键字参数</h3>
          <p><code>*</code> 之后的参数必须通过关键字传递。</p>
          <pre class="code-block small"><code>def config(host, *, port, debug=False):
    pass

config("localhost", port=8080)  # 正确
# config("localhost", 8080)     # 错误</code></pre>
        </div>
      </div>
      <div class="note-box">
        <span>💡 参数顺序规则：位置参数 → *args → 仅限关键字参数 → **kwargs。遵循此顺序可避免歧义。</span>
      </div>
    </section>

    <!-- 类型注解与返回值 -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">📝</span>
          <h2>类型注解 (Type Hints)</h2>
        </div>
        <p class="section-desc">Python 3.5+ 支持类型提示，提高代码可读性，便于静态检查工具使用。</p>
        <pre class="code-block"><code>def add(x: int, y: int) -> int:
    return x + y

def process(data: list[str]) -> dict[str, int]:
    return {item: len(item) for item in data}

# 类型别名
Vector = list[float]
def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * x for x in vector]</code></pre>
        <div class="note-box">
          <span>💡 类型注解不会在运行时强制检查，需借助 mypy、pyright 等工具进行静态分析。</span>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">↩️</span>
          <h2>返回值</h2>
        </div>
        <p class="section-desc">使用 <code>return</code> 语句返回结果，可返回单个值、多个值或 <code>None</code>。</p>
        <pre class="code-block"><code># 返回单个值
def square(x):
    return x * x

# 返回多个值（打包为元组）
def min_max(numbers):
    return min(numbers), max(numbers)

mn, mx = min_max([3, 1, 4, 1, 5])  # 解包

# 无 return 或 return None
def log(message):
    print(f"[LOG] {message}")
    # 隐式返回 None</code></pre>
      </section>
    </div>

    <!-- 作用域与闭包 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🌐</span>
        <h2>作用域与闭包</h2>
      </div>
      <div class="scope-grid">
        <div class="scope-item">
          <h4>局部作用域 (Local)</h4>
          <p>函数内部定义的变量，仅函数内可见。</p>
          <pre class="code-block small"><code>def foo():
    x = 10  # 局部变量
    print(x)</code></pre>
        </div>
        <div class="scope-item">
          <h4>全局作用域 (Global)</h4>
          <p>模块级别定义的变量。函数内修改需用 <code>global</code> 声明。</p>
          <pre class="code-block small"><code>count = 0
def increment():
    global count
    count += 1</code></pre>
        </div>
        <div class="scope-item">
          <h4>闭包 (Closure)</h4>
          <p>内部函数引用外部函数的变量，即使外部函数已返回。</p>
          <pre class="code-block small"><code>def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

times3 = make_multiplier(3)
times3(5)  # 15</code></pre>
        </div>
        <div class="scope-item">
          <h4>nonlocal 声明</h4>
          <p>在内层函数中修改外层（非全局）变量。</p>
          <pre class="code-block small"><code>def outer():
    x = 0
    def inner():
        nonlocal x
        x += 1
        return x
    return inner</code></pre>
        </div>
      </div>
    </section>

    <!-- Lambda 表达式与高阶函数 -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">λ</span>
          <h2>Lambda 匿名函数</h2>
        </div>
        <p class="section-desc">一行简单的函数，无需 <code>def</code> 定义，常用于短期使用的场景。</p>
        <pre class="code-block"><code># 语法: lambda arguments: expression
square = lambda x: x ** 2
print(square(5))  # 25

# 常用作排序 key
pairs = [(1, 'one'), (2, 'two'), (3, 'three')]
pairs.sort(key=lambda pair: pair[1])

# 与 map/filter 结合
nums = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))</code></pre>
        <div class="note-box">
          <span>⚠️ Lambda 只能包含单个表达式，不能包含语句或复杂逻辑。</span>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⚡</span>
          <h2>常用内置高阶函数</h2>
        </div>
        <div class="builtin-list">
          <div class="builtin-item">
            <code>map(func, iterable)</code>
            <p>对每个元素应用函数，返回迭代器。</p>
          </div>
          <div class="builtin-item">
            <code>filter(func, iterable)</code>
            <p>过滤出函数返回 True 的元素。</p>
          </div>
          <div class="builtin-item">
            <code>reduce(func, iterable)</code>
            <p>累积运算（需从 functools 导入）。</p>
          </div>
          <div class="builtin-item">
            <code>sorted(iterable, key=func)</code>
            <p>自定义排序规则。</p>
          </div>
        </div>
        <pre class="code-block"><code>from functools import reduce
nums = [1, 2, 3, 4]
product = reduce(lambda x, y: x * y, nums)  # 24</code></pre>
      </section>
    </div>

    <!-- 装饰器 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🎭</span>
        <h2>装饰器 (Decorator)</h2>
      </div>
      <p class="section-desc">在不修改原函数代码的情况下，为函数增加额外功能。本质是一个接受函数作为参数并返回新函数的高阶函数。</p>
      <div class="decorator-examples">
        <div class="decorator-item">
          <h4>基本装饰器</h4>
          <pre class="code-block"><code>def logger(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logger
def add(a, b):
    return a + b

add(2, 3)  # 打印: 调用 add</code></pre>
        </div>
        <div class="decorator-item">
          <h4>带参数的装饰器</h4>
          <pre class="code-block"><code>def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello!")</code></pre>
        </div>
        <div class="decorator-item">
          <h4>内置常用装饰器</h4>
          <pre class="code-block"><code>class MyClass:
    @staticmethod
    def static_method():
        pass

    @classmethod
    def class_method(cls):
        pass

    @property
    def value(self):
        return self._value</code></pre>
        </div>
      </div>
    </section>

    <!-- 最佳实践与注意事项 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">💡</span>
        <h2>最佳实践与注意事项</h2>
      </div>
      <div class="tips-container">
        <div class="tip-row">
          <span class="tip-marker">✅</span>
          <div>
            <strong>函数名使用小写加下划线</strong> — 遵循 PEP 8 风格指南。
          </div>
        </div>
        <div class="tip-row">
          <span class="tip-marker">✅</span>
          <div>
            <strong>添加文档字符串</strong> — 使用三重引号描述函数用途、参数和返回值。
          </div>
        </div>
        <div class="tip-row">
          <span class="tip-marker">⚠️</span>
          <div>
            <strong>避免可变默认参数</strong> — 默认参数在函数定义时只计算一次，可能导致意外行为。
            <pre class="code-block tiny"><code># 错误
def append_to(item, target=[]):
    target.append(item)
    return target

# 正确
def append_to(item, target=None):
    if target is None:
        target = []
    target.append(item)
    return target</code></pre>
          </div>
        </div>
        <div class="tip-row">
          <span class="tip-marker">✅</span>
          <div>
            <strong>保持函数短小、单一职责</strong> — 一个函数只做一件事，便于测试和维护。
          </div>
        </div>
        <div class="tip-row">
          <span class="tip-marker">🔧</span>
          <div>
            <strong>使用类型注解提升可读性</strong> — 配合 mypy 等工具进行静态检查。
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="guide-footer">
      <p>🧩 函数是构建 Python 程序的基石。掌握其灵活的参数机制与高阶特性，能极大提升编码效率与代码质量。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件仅为展示内容，无需额外逻辑
</script>

<style lang="less" scoped>
// ========== 简约现代变量 ==========
@primary-blue: #306998;
@primary-yellow: #FFD43B;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@code-bg: #1e293b;
@code-text: #e2e8f0;
@shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.functions-guide {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ----- 头部 -----
.guide-header {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .divider {
      width: 60px;
      height: 4px;
      background: @primary-yellow;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        color: #0f5c3e;
      }
    }
  }
}

// ----- 通用卡片 -----
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
    }
  }

  .section-desc {
    margin-bottom: 1.5rem;
    color: @text-soft;
    font-size: 1rem;
    line-height: 1.6;

    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      color: #0f5c3e;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  color: @code-text;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  line-height: 1.5;

  code {
    background: transparent;
    color: inherit;
  }

  &.small {
    font-size: 0.85rem;
    padding: 0.8rem 1rem;
  }

  &.tiny {
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
  }
}

.syntax-block {
  margin-bottom: 1.5rem;
}

.example-box {
  h4 {
    font-size: 1.1rem;
    font-weight: 650;
    margin: 1.2rem 0 0.6rem;
    color: @text-dark;
  }
}

.note-box {
  background: #fef3e7;
  border-left: 4px solid @primary-yellow;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  margin-top: 1rem;

  span {
    color: #7a4e1a;
    font-size: 0.95rem;

    code {
      background: #fef3c7;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
    }
  }
}

// 参数网格
.params-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .param-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.2rem;
    border: 1px solid @border-light;

    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin-bottom: 0.5rem;
      color: @text-dark;
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }
}

// 两列布局
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

// 作用域网格
.scope-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .scope-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;

    h4 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 0.5rem;
      color: @text-dark;
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }
}

// 内置函数列表
.builtin-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;

  .builtin-item {
    code {
      background: #ecfdf3;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      color: #0f5c3e;
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;
      margin-top: 0.2rem;
      margin-left: 1.2rem;
    }
  }
}

// 装饰器示例
.decorator-examples {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .decorator-item {
    h4 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 0.6rem;
      color: @text-dark;
    }
  }
}

// 最佳实践
.tips-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .tip-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;

    .tip-marker {
      font-size: 1.2rem;
      min-width: 28px;
    }

    div {
      color: @text-soft;
      line-height: 1.6;

      strong {
        color: @text-dark;
      }
    }

    .code-block {
      margin-top: 0.5rem;
    }
  }
}

// 底部
.guide-footer {
  text-align: center;
  margin-top: 0.5rem;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    color: @text-light;
  }
}

// 响应式
@media (max-width: 768px) {
  .functions-guide {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }

  .params-grid {
    grid-template-columns: 1fr;
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .scope-grid {
    grid-template-columns: 1fr;
  }
}
</style>
