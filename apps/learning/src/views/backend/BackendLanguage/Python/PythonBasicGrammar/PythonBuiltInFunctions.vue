<template>
  <div class="builtins-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>Python 内置函数</h1>
        </div>
        <p class="subtitle">开箱即用的工具箱 · 提升效率的基石</p>
        <div class="divider"></div>
        <p class="intro-text">
          Python 提供了约 68 个内置函数，无需导入即可直接使用。
          它们覆盖了类型转换、数学运算、迭代处理、I/O、反射等常见场景，
          熟练掌握这些函数能显著提升编码效率与代码简洁度。
        </p>
      </div>
    </header>

    <!-- 内置函数分类展示 -->
    <div class="categories-grid">
      <section v-for="category in categories" :key="category.name" class="category-card">
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <h2>{{ category.name }}</h2>
        </div>
        <p class="category-desc">{{ category.description }}</p>
        <div class="functions-list">
          <div v-for="func in category.functions" :key="func.name" class="function-item">
            <div class="func-header">
              <code class="func-name">{{ func.name }}</code>
              <span class="func-arrow">→</span>
            </div>
            <p class="func-desc">{{ func.desc }}</p>
            <div v-if="func.example" class="func-example">
              <code>{{ func.example }}</code>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部提示 -->
    <footer class="guide-footer">
      <p>📚 完整内置函数列表请查阅 Python 官方文档 <code>builtins</code> 或使用 <code>dir(__builtins__)</code> 查看。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 内置函数条目
interface BuiltinFunction {
  name: string
  desc: string
  example?: string
}

// 分类
interface FunctionCategory {
  name: string
  icon: string
  description: string
  functions: BuiltinFunction[]
}

const categories: FunctionCategory[] = [
  {
    name: '类型转换',
    icon: '🔄',
    description: '在基础数据类型之间进行转换。',
    functions: [
      { name: 'int(x)', desc: '转换为整数', example: 'int("42") → 42' },
      { name: 'float(x)', desc: '转换为浮点数', example: 'float("3.14") → 3.14' },
      { name: 'str(x)', desc: '转换为字符串', example: 'str(100) → "100"' },
      { name: 'bool(x)', desc: '转换为布尔值', example: 'bool(0) → False' },
      { name: 'list(iter)', desc: '转换为列表', example: 'list("abc") → ["a","b","c"]' },
      { name: 'tuple(iter)', desc: '转换为元组', example: 'tuple([1,2]) → (1,2)' },
      { name: 'set(iter)', desc: '转换为集合（去重）', example: 'set([1,2,2]) → {1,2}' },
      { name: 'dict(**kw)', desc: '创建字典', example: 'dict(a=1,b=2) → {"a":1,"b":2}' },
      { name: 'bin(x)', desc: '转二进制字符串', example: 'bin(10) → "0b1010"' },
      { name: 'hex(x)', desc: '转十六进制字符串', example: 'hex(255) → "0xff"' }
    ]
  },
  {
    name: '数学运算',
    icon: '🔢',
    description: '数值计算与数学相关功能。',
    functions: [
      { name: 'abs(x)', desc: '返回绝对值', example: 'abs(-5) → 5' },
      { name: 'round(x[, n])', desc: '四舍五入到 n 位小数', example: 'round(3.14159, 2) → 3.14' },
      { name: 'pow(x, y)', desc: '幂运算，同 x**y', example: 'pow(2, 3) → 8' },
      { name: 'divmod(a, b)', desc: '返回商和余数元组', example: 'divmod(7, 3) → (2, 1)' },
      { name: 'max(iter)', desc: '返回最大值', example: 'max([1,5,3]) → 5' },
      { name: 'min(iter)', desc: '返回最小值', example: 'min([1,5,3]) → 1' },
      { name: 'sum(iter)', desc: '求和', example: 'sum([1,2,3]) → 6' }
    ]
  },
  {
    name: '序列操作',
    icon: '📋',
    description: '处理可迭代对象、序列与集合。',
    functions: [
      { name: 'len(s)', desc: '返回对象长度（元素个数）', example: 'len("abc") → 3' },
      { name: 'range(stop)', desc: '生成整数序列', example: 'list(range(3)) → [0,1,2]' },
      { name: 'enumerate(iter)', desc: '带索引的迭代', example: 'list(enumerate("ab")) → [(0,"a"),(1,"b")]' },
      { name: 'zip(*iters)', desc: '并行迭代多个序列', example: 'list(zip("ab","12")) → [("a","1"),("b","2")]' },
      { name: 'sorted(iter)', desc: '返回排序后的新列表', example: 'sorted([3,1,2]) → [1,2,3]' },
      { name: 'reversed(seq)', desc: '返回反向迭代器', example: 'list(reversed([1,2,3])) → [3,2,1]' },
      { name: 'filter(func, iter)', desc: '过滤序列元素', example: 'list(filter(bool, [0,1,2])) → [1,2]' },
      { name: 'map(func, iter)', desc: '对每个元素应用函数', example: 'list(map(str, [1,2])) → ["1","2"]' },
      { name: 'slice(stop)', desc: '创建切片对象，用于索引', example: 's = slice(1,3); [0,1,2,3][s] → [1,2]' }
    ]
  },
  {
    name: '类型检查与身份',
    icon: '🔍',
    description: '检查对象类型、身份与属性。',
    functions: [
      { name: 'type(x)', desc: '返回对象的类型', example: 'type(10) → <class "int">' },
      { name: 'isinstance(obj, cls)', desc: '检查对象是否为某类型或某元组中的类型', example: 'isinstance(10, int) → True' },
      { name: 'issubclass(cls, cls)', desc: '检查类继承关系', example: 'issubclass(bool, int) → True' },
      { name: 'id(obj)', desc: '返回对象唯一标识（内存地址）', example: 'id(a)' },
      { name: 'hash(obj)', desc: '返回对象的哈希值（对不可变对象）', example: 'hash("abc")' },
      { name: 'callable(obj)', desc: '检查对象是否可调用', example: 'callable(print) → True' }
    ]
  },
  {
    name: '输入输出与文件',
    icon: '📄',
    description: '控制台交互与文件操作。',
    functions: [
      { name: 'print(*args)', desc: '打印输出到控制台', example: 'print("Hello", end=" ") → Hello ' },
      { name: 'input(prompt)', desc: '从标准输入读取一行文本', example: 'name = input("Name: ")' },
      { name: 'open(file, mode)', desc: '打开文件并返回文件对象', example: 'with open("f.txt", "r") as f: ...' },
      { name: 'format(val, spec)', desc: '格式化值', example: 'format(1/3, ".2f") → "0.33"' }
    ]
  },
  {
    name: '反射与对象管理',
    icon: '🪞',
    description: '动态获取/设置对象属性与类信息。',
    functions: [
      { name: 'dir(obj)', desc: '返回对象属性名称列表', example: 'dir([])' },
      { name: 'getattr(obj, name)', desc: '获取对象属性值', example: 'getattr(obj, "attr")' },
      { name: 'setattr(obj, name, val)', desc: '设置对象属性值', example: 'setattr(obj, "attr", 42)' },
      { name: 'hasattr(obj, name)', desc: '检查对象是否有某属性', example: 'hasattr(obj, "attr")' },
      { name: 'vars(obj)', desc: '返回对象的 __dict__ 字典', example: 'vars(my_obj)' }
    ]
  },
  {
    name: '迭代与高级函数',
    icon: '⚡',
    description: '迭代器、生成器及函数式编程辅助。',
    functions: [
      { name: 'iter(iterable)', desc: '返回迭代器对象', example: 'i = iter([1,2])' },
      { name: 'next(iterator, default)', desc: '获取下一个元素', example: 'next(i) → 1' },
      { name: 'any(iterable)', desc: '任一元素为真则返回 True', example: 'any([0,0,1]) → True' },
      { name: 'all(iterable)', desc: '所有元素为真返回 True', example: 'all([1,2,0]) → False' },
      { name: 'eval(expr)', desc: '执行字符串表达式并返回结果', example: 'eval("2+3") → 5 (谨慎使用)' },
      { name: 'exec(code)', desc: '执行字符串代码块', example: 'exec("x=1") (谨慎使用)' },
      { name: 'compile(src, ...)', desc: '编译源代码为代码对象' }
    ]
  },
  {
    name: '其他常用函数',
    icon: '🧰',
    description: '其他实用工具函数。',
    functions: [
      { name: 'help(obj)', desc: '显示帮助文档', example: 'help(print)' },
      { name: 'repr(obj)', desc: '返回对象的“官方”字符串表示', example: 'repr("abc") → "\'abc\'"' },
      { name: 'ord(ch)', desc: '返回字符的 Unicode 码位', example: 'ord("A") → 65' },
      { name: 'chr(i)', desc: '根据码位返回字符', example: 'chr(65) → "A"' },
      { name: 'bytearray()', desc: '返回可变字节数组' },
      { name: 'bytes()', desc: '返回不可变字节串' },
      { name: 'memoryview(obj)', desc: '返回内存视图对象' },
      { name: 'ascii(obj)', desc: '返回仅包含 ASCII 字符的表示' },
      { name: 'classmethod(f)', desc: '定义类方法装饰器', example: '@classmethod' },
      { name: 'staticmethod(f)', desc: '定义静态方法装饰器', example: '@staticmethod' },
      { name: 'property(fget)', desc: '定义属性访问器', example: '@property' },
      { name: 'super()', desc: '调用父类方法', example: 'super().__init__()' }
    ]
  }
]
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

.builtins-guide {
  max-width: 1600px;
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

// ----- 分类网格 -----
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.8rem;
}

.category-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: @shadow-hover;
    transform: translateY(-2px);
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.8rem;

    .category-icon {
      font-size: 2rem;
      line-height: 1;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 650;
      color: @text-dark;
    }
  }

  .category-desc {
    color: @text-soft;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed @border-light;
  }

  .functions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .function-item {
    border-radius: @border-radius-md;
    padding: 0.8rem 1rem;
    background: #fbfdff;
    border: 1px solid @border-light;
    transition: @transition;

    &:hover {
      background: #f0f7fd;
      border-color: @primary-blue;
    }

    .func-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.3rem;

      .func-name {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-weight: 600;
        color: @primary-blue;
        background: #e8f0fe;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-size: 0.9rem;
      }

      .func-arrow {
        color: @text-light;
      }
    }

    .func-desc {
      color: @text-soft;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 0.4rem;
    }

    .func-example {
      background: @code-bg;
      color: @code-text;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        background: transparent;
        color: inherit;
      }
    }
  }
}

// ----- 底部 -----
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
    font-size: 1rem;

    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      color: #0f5c3e;
    }
  }
}

// ----- 响应式 -----
@media (max-width: 768px) {
  .builtins-guide {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .category-card {
    padding: 1.5rem 1.2rem;
  }
}
</style>
