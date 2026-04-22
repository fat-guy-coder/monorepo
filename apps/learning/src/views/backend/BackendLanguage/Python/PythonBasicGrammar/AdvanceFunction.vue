<template>
  <div class="advanced-functions-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>函数高阶指南</h1>
        </div>
        <p class="subtitle">闭包 · 装饰器 · 生成器 · 函数式编程</p>
        <div class="divider"></div>
        <p class="intro-text">
          深入 Python 函数的高级特性：从闭包与作用域到强大的装饰器，从生成器与协程到函数式编程范式。
          掌握这些技巧，写出更优雅、高效、可维护的 Python 代码。
        </p>
      </div>
    </header>

    <!-- 闭包与作用域深入 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔒</span>
        <h2>闭包与作用域深入</h2>
      </div>
      <p class="section-desc">闭包是指内部函数引用了外部函数的变量，且外部函数已返回后，该变量仍然存活。</p>
      <div class="example-box">
        <h4>📋 闭包典型应用</h4>
        <pre class="code-block"><code>def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c1 = make_counter()
print(c1())  # 1
print(c1())  # 2</code></pre>
      </div>
      <div class="example-box">
        <h4>📋 使用闭包实现简单的配置化函数</h4>
        <pre class="code-block"><code>def make_multiplier(factor):
    return lambda x: x * factor

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15</code></pre>
      </div>
      <div class="note-box">
        <span>💡 使用 <code>nonlocal</code> 可以在闭包中修改外层非全局变量。</span>
      </div>
    </section>

    <!-- 装饰器进阶 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🎭</span>
        <h2>装饰器进阶</h2>
      </div>

      <div class="decorator-subsection">
        <h3>带参数的装饰器</h3>
        <p>装饰器本身需要接受参数时，需要三层嵌套。</p>
        <pre class="code-block"><code>def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # 打印三次</code></pre>
      </div>

      <div class="decorator-subsection">
        <h3>使用 functools.wraps 保留元数据</h3>
        <pre class="code-block"><code>from functools import wraps

def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logger
def add(a, b):
    """Add two numbers"""
    return a + b

print(add.__name__)  # 'add' (而非 'wrapper')
print(add.__doc__)   # 'Add two numbers'</code></pre>
      </div>

      <div class="decorator-subsection">
        <h3>类装饰器</h3>
        <pre class="code-block"><code>class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count} of {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")</code></pre>
      </div>

      <div class="decorator-subsection">
        <h3>常用内置装饰器</h3>
        <ul class="decorator-list">
          <li><code>@staticmethod</code> — 静态方法，不需要实例或类引用</li>
          <li><code>@classmethod</code> — 类方法，第一个参数为类本身</li>
          <li><code>@property</code> — 将方法变为属性访问</li>
          <li><code>@functools.lru_cache</code> — 缓存函数结果</li>
          <li><code>@functools.singledispatch</code> — 单分派泛型函数</li>
        </ul>
      </div>
    </section>

    <!-- 内置高阶函数与函数式工具 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">⚡</span>
        <h2>内置高阶函数与函数式工具</h2>
      </div>

      <div class="hof-grid">
        <div class="hof-card">
          <h4>map</h4>
          <p>对可迭代对象的每个元素应用函数，返回迭代器。</p>
          <pre class="code-block small"><code>nums = [1, 2, 3, 4]
squared = map(lambda x: x**2, nums)
print(list(squared))  # [1, 4, 9, 16]</code></pre>
        </div>
        <div class="hof-card">
          <h4>filter</h4>
          <p>过滤出使函数返回 True 的元素。</p>
          <pre class="code-block small"><code>nums = [1, 2, 3, 4, 5, 6]
evens = filter(lambda x: x % 2 == 0, nums)
print(list(evens))  # [2, 4, 6]</code></pre>
        </div>
        <div class="hof-card">
          <h4>reduce</h4>
          <p>累积地将函数应用于序列，需从 functools 导入。</p>
          <pre class="code-block small"><code>from functools import reduce
nums = [1, 2, 3, 4]
product = reduce(lambda x, y: x * y, nums)
print(product)  # 24</code></pre>
        </div>
        <div class="hof-card">
          <h4>partial (偏函数)</h4>
          <p>固定函数的部分参数，返回新函数。</p>
          <pre class="code-block small"><code>from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))  # 25
print(cube(5))    # 125</code></pre>
        </div>
      </div>

      <div class="operator-section">
        <h3>operator 模块 — 常用操作符的函数形式</h3>
        <pre class="code-block"><code>from operator import itemgetter, attrgetter, methodcaller

# 用于排序、分组等场景
data = [('Alice', 25), ('Bob', 20), ('Charlie', 30)]
data.sort(key=itemgetter(1))  # 按年龄排序

# methodcaller 调用对象方法
upper = methodcaller('upper')
print(upper('hello'))  # HELLO</code></pre>
      </div>
    </section>

    <!-- 生成器与 yield -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">🌀</span>
          <h2>生成器 (Generator)</h2>
        </div>
        <p>使用 <code>yield</code> 关键字的函数成为生成器，惰性产生值，节省内存。</p>
        <pre class="code-block"><code>def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

for num in fibonacci(100):
    print(num, end=' ')  # 0 1 1 2 3 5 8 13 ...</code></pre>

        <h4 class="subheading">生成器表达式</h4>
        <pre class="code-block"><code># 类似列表推导式，但使用圆括号
squares = (x**2 for x in range(10))
print(sum(squares))  # 285</code></pre>

        <h4 class="subheading">yield from — 委托给子生成器</h4>
        <pre class="code-block"><code>def chain_generators(*iterables):
    for it in iterables:
        yield from it

for item in chain_generators([1,2], (3,4)):
    print(item)  # 1 2 3 4</code></pre>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⏳</span>
          <h2>异步函数 (async/await)</h2>
        </div>
        <p>Python 3.5+ 引入的异步编程语法，基于事件循环，适合 I/O 密集型任务。</p>
        <pre class="code-block"><code>import asyncio

async def fetch_data(delay, data):
    await asyncio.sleep(delay)
    return data

async def main():
    task1 = asyncio.create_task(fetch_data(1, "A"))
    task2 = asyncio.create_task(fetch_data(2, "B"))
    results = await asyncio.gather(task1, task2)
    print(results)  # ['A', 'B']

asyncio.run(main())</code></pre>

        <h4 class="subheading">异步生成器 (async for)</h4>
        <pre class="code-block"><code>async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for num in async_range(3):
        print(num)</code></pre>
      </section>
    </div>

    <!-- 函数自省与属性 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔍</span>
        <h2>函数自省与属性</h2>
      </div>
      <p>Python 函数是一等对象，拥有丰富的元数据属性。</p>
      <div class="introspection-grid">
        <div class="attr-item">
          <code>__name__</code> — 函数名称
        </div>
        <div class="attr-item">
          <code>__doc__</code> — 文档字符串
        </div>
        <div class="attr-item">
          <code>__defaults__</code> — 默认参数元组
        </div>
        <div class="attr-item">
          <code>__kwdefaults__</code> — 仅关键字默认参数字典
        </div>
        <div class="attr-item">
          <code>__code__</code> — 代码对象（包含字节码、变量名等）
        </div>
        <div class="attr-item">
          <code>__annotations__</code> — 类型注解字典
        </div>
        <div class="attr-item">
          <code>__closure__</code> — 闭包变量元组
        </div>
      </div>
      <pre class="code-block"><code>def example(a, b=10, *, c=20) -> int:
    """Example function"""
    return a + b + c

print(example.__name__)        # 'example'
print(example.__defaults__)    # (10,)
print(example.__kwdefaults__)  # {'c': 20}
print(example.__annotations__) # {'return': int}</code></pre>
      <div class="note-box">
        <span>💡 使用 <code>inspect</code> 模块可以获得更丰富的函数签名信息。</span>
      </div>
    </section>

    <!-- 函数式编程模块补充 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🧬</span>
        <h2>functools 模块更多功能</h2>
      </div>
      <div class="functools-grid">
        <div class="ft-item">
          <h4>lru_cache</h4>
          <p>缓存函数调用结果，加速递归或重复计算。</p>
          <pre class="code-block small"><code>from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)</code></pre>
        </div>
        <div class="ft-item">
          <h4>singledispatch</h4>
          <p>根据第一个参数类型执行不同逻辑（泛型函数）。</p>
          <pre class="code-block small"><code>from functools import singledispatch

@singledispatch
def process(arg):
    print("default", arg)

@process.register(int)
def _(arg):
    print("integer", arg)

@process.register(str)
def _(arg):
    print("string", arg)</code></pre>
        </div>
        <div class="ft-item">
          <h4>total_ordering</h4>
          <p>类装饰器，补全比较运算符。</p>
          <pre class="code-block small"><code>from functools import total_ordering

@total_ordering
class Person:
    def __init__(self, age):
        self.age = age
    def __eq__(self, other):
        return self.age == other.age
    def __lt__(self, other):
        return self.age < other.age</code></pre>
        </div>
        <div class="ft-item">
          <h4>wraps / update_wrapper</h4>
          <p>已在装饰器部分介绍，用于保留元数据。</p>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="guide-footer">
      <p>🧠 高阶函数特性赋予 Python 强大的表达能力。结合函数式编程思想，让代码更简洁、更易测试。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无额外逻辑
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

.advanced-functions-guide {
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
    line-height: 1.6;
  }
}

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
}

.example-box {
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 650;
    margin-bottom: 0.6rem;
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

    code {
      background: #fef3c7;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
    }
  }
}

// 装饰器小节
.decorator-subsection {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 650;
    margin-bottom: 0.8rem;
    color: @text-dark;
  }

  p {
    color: @text-soft;
    margin-bottom: 0.8rem;
  }

  .decorator-list {
    list-style: none;

    li {
      padding: 0.3rem 0;
      color: @text-soft;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
      }
    }
  }
}

// HOF网格
.hof-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  .hof-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;

    h4 {
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

.operator-section {
  h3 {
    font-size: 1.3rem;
    font-weight: 650;
    margin: 1.5rem 0 1rem;
    color: @text-dark;
  }
}

// 两列布局
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .subheading {
    font-size: 1.2rem;
    font-weight: 650;
    margin: 1.2rem 0 0.8rem;
    color: @text-dark;
  }
}

// 自省网格
.introspection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.8rem;
  margin: 1.2rem 0;

  .attr-item {
    background: #f1f5f9;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 0.9rem;

    code {
      background: #e2e8f0;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      margin-right: 6px;
    }
  }
}

// functools网格
.functools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .ft-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;

    h4 {
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
  .advanced-functions-guide {
    padding: 1.2rem 1rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .hof-grid {
    grid-template-columns: 1fr;
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .functools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
