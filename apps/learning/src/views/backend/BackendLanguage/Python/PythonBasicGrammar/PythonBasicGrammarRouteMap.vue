<template>
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-sans bg-slate-50 min-h-screen flex flex-col gap-8">
    <!-- 页头 -->
    <header class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-5xl">🐍</span>
        <h1
          class="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#306998] to-[#1e4a6b] bg-clip-text text-transparent">
          Python 基础语法
        </h1>
      </div>
      <p class="text-xl font-medium text-[#306998] mb-3">从变量到循环 · 构建编程基石</p>
      <div class="w-20 h-1 bg-yellow-400 rounded-full my-4"></div>
      <p class="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
        掌握这些核心语法元素，你将能够编写简单的 Python 程序。
        每一个概念都是后续深入学习的基础。
      </p>
    </header>

    <!-- 语法知识点网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="topic in syntaxTopics" :key="topic.id"
        class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
        :style="{ '--accent-color': topic.color }">
        <div class="text-4xl mb-3">{{ topic.icon }}</div>
        <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ topic.title }}</h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-3">{{ topic.description }}</p>

        <!-- 代码示例 -->
        <div
          class="bg-slate-50 rounded-lg p-2 mb-3 font-mono text-xs text-slate-600 border border-slate-100 overflow-x-auto">
          <code>{{ topic.example }}</code>
        </div>

        <!-- 关键词 -->
        <div class="flex flex-wrap gap-2 mt-1">
          <span v-for="kw in topic.keywords" :key="kw"
            class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 transition-colors duration-200 hover:bg-(--accent-color) hover:text-white hover:border-transparent">
            {{ kw }}
          </span>
        </div>

        <!-- 底部装饰线（悬停时显示） -->
        <div
          class="mt-4 h-0.5 w-full rounded-full bg-transparent transition-all duration-300 group-hover:bg-(--accent-color)"
          :class="{ 'bg-(--accent-color) opacity-0 hover:opacity-100': true }"
          style="opacity: 0; transition: opacity 0.2s ease;">
        </div>
      </div>
    </div>

    <!-- 底部鼓励语 -->
    <footer class="text-center mt-6">
      <p
        class="inline-block bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 text-slate-500 font-medium">
        💡 每学完一个模块，试着写几行代码，动手是最好的老师。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface SyntaxTopic {
  id: number;
  title: string;
  icon: string;
  description: string;
  example: string;        // 新增：简短代码示例
  keywords: string[];
  color: string;
}

const syntaxTopics: SyntaxTopic[] = [
  {
    id: 1,
    title: '变量与赋值',
    icon: '📦',
    description: '存储数据的容器，无需声明类型，直接赋值即可使用。',
    example: 'name = "Python"\nage = 30\nx, y = 1, 2',
    keywords: ['变量名', '赋值 =', '动态类型', 'id()', '多重赋值'],
    color: '#306998'
  },
  {
    id: 2,
    title: '基本数据类型',
    icon: '🔢',
    description: '数字、字符串、布尔值，构成程序的基础数据单元。',
    example: 'age = 25          # int\npi = 3.14          # float\nname = "Alice"     # str\nis_ok = True       # bool',
    keywords: ['int', 'float', 'str', 'bool', 'type()'],
    color: '#3a7ca5'
  },
  {
    id: 3,
    title: '运算符',
    icon: '⚙️',
    description: '算术、比较、逻辑、赋值运算符，用于数据的运算与判断。',
    example: 'a, b = 10, 3\nprint(a + b, a % b)   # 13, 1\nprint(a > b and a != 0) # True',
    keywords: ['+ - * /', '// % **', '== !=', 'and or not', '+= -= '],
    color: '#4a6fa5'
  },
  {
    id: 4,
    title: '字符串操作',
    icon: '📝',
    description: '文本处理的核心，格式化、切片、常用方法。',
    example: 's = "Hello, Python"\nprint(s[0:5])       # Hello\nprint(f"Hello {name}")',
    keywords: ['索引', '切片 [::]', 'f-string', '.format()', 'len()', 'strip()'],
    color: '#2b5f7a'
  },
  {
    id: 5,
    title: '列表与元组',
    icon: '📋',
    description: '有序集合，列表可变，元组不可变。',
    example: 'fruits = ["apple", "banana"]\nfruits.append("cherry")\ntuple1 = (1, 2, 3)',
    keywords: ['list', 'tuple', 'append', '切片', '解包', '推导式'],
    color: '#1e5f6e'
  },
  {
    id: 6,
    title: '字典与集合',
    icon: '📖',
    description: '键值对映射与唯一元素集合，高效查找。',
    example: 'person = {"name": "Tom", "age": 22}\nunique = {1, 2, 3, 3}  # {1,2,3}',
    keywords: ['dict', 'set', '键值对', '去重', 'get()', 'items()'],
    color: '#2e6b5e'
  },
  {
    id: 7,
    title: '条件判断',
    icon: '🔀',
    description: '使用 if-elif-else 控制程序分支流向。',
    example: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")',
    keywords: ['if', 'elif', 'else', '缩进', '条件表达式', 'match-case'],
    color: '#8f6b2e'
  },
  {
    id: 8,
    title: '循环结构',
    icon: '🔄',
    description: 'for 循环与 while 循环，让重复任务自动化。',
    example: 'for i in range(3):\n    print(i)\nn = 0\nwhile n < 3:\n    print(n); n+=1',
    keywords: ['for in', 'range()', 'while', 'break', 'continue', 'else'],
    color: '#7a4b5c'
  },
  {
    id: 9,
    title: '函数定义',
    icon: '🧩',
    description: '封装可复用的代码块，提高代码组织性。',
    example: 'def greet(name, msg="Hello"):\n    return f"{msg}, {name}!"\nprint(greet("Tom"))',
    keywords: ['def', '参数', 'return', '默认参数', '作用域', 'lambda'],
    color: '#5e4b7a'
  },
  {
    id: 10,
    title: '输入与输出',
    icon: '⌨️',
    description: '与用户交互，从控制台读取输入，打印输出。',
    example: 'name = input("你的名字: ")\nprint(f"你好, {name}")',
    keywords: ['input()', 'print()', '文件读写', '格式化输出', 'sep/end'],
    color: '#3f6e5e'
  },
  {
    id: 11,
    title: '异常处理',
    icon: '⚠️',
    description: '捕获程序运行时错误，使程序更健壮。',
    example: 'try:\n    x = int(input("数字: "))\nexcept ValueError:\n    print("输入无效")',
    keywords: ['try/except', 'else/finally', 'ValueError', '异常类型', 'raise'],
    color: '#b43b3b'
  },
  {
    id: 12,
    title: '列表推导式',
    icon: '✨',
    description: '简洁地创建列表，替代循环与条件筛选。',
    example: 'squares = [x**2 for x in range(5)]\nevens = [x for x in range(10) if x%2==0]',
    keywords: ['[expr for item in iterable]', 'if过滤', '嵌套', '性能', '可读性'],
    color: '#3b9f6b'
  },
  {
    id: 13,
    title: '模块与包',
    icon: '📦',
    description: '组织和复用代码，使用标准库与第三方库。',
    example: 'import math\nprint(math.sqrt(16))\nfrom datetime import date',
    keywords: ['import', 'from ... import', 'as别名', '__name__', 'pip'],
    color: '#6c4e9e'
  },
  {
    id: 14,
    title: '文件操作',
    icon: '📁',
    description: '读写文本文件与二进制文件，持久化存储数据。',
    example: 'with open("data.txt", "w") as f:\n    f.write("Hello")\nwith open("data.txt") as f:\n    print(f.read())',
    keywords: ['open()', '读写模式 r/w/a', 'with语句', 'read/write', '路径'],
    color: '#da8e2e'
  },
  {
    id: 15,
    title: '类型注解',
    icon: '🏷️',
    description: '为变量、函数参数添加类型提示，提高代码可读性。',
    example: 'def greet(name: str, age: int) -> str:\n    return f"{name} is {age}"',
    keywords: [':类型', '->返回类型', 'typing模块', 'List', 'Optional'],
    color: '#2573a6'
  }
];
</script>
