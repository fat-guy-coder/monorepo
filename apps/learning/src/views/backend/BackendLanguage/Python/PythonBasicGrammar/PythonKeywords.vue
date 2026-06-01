<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- 头部 -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          🐍 Python 关键字完全指南
        </h1>
        <p class="text-slate-500">33个保留字 · 分类解析 · 示例代码</p>
        <div class="mt-3 flex flex-wrap justify-center gap-2">
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">False</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">None</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">True</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">and</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">or</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">not</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">is</span>
          <span class="px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 rounded">in</span>
        </div>
      </div>

      <!-- 关键字卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="kw in keywords" :key="kw.word"
          class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="border-b border-slate-100 px-4 py-2 flex justify-between items-center">
            <span class="font-mono font-bold text-indigo-600 text-lg">{{ kw.word }}</span>
            <span class="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{{ kw.category }}</span>
          </div>
          <div class="p-4 space-y-2">
            <p class="text-slate-600 text-sm leading-relaxed">{{ kw.description }}</p>
            <div class="bg-slate-800 rounded-md p-2 overflow-x-auto">
              <pre class="text-slate-200 text-xs font-mono"><code>{{ kw.example }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 脚注说明 -->
      <div class="mt-10 p-4 bg-white rounded-xl border border-slate-200 text-center text-sm text-slate-500">
        <p>💡 Python 3.10+ 共有35个关键字（含 async/await 等）。以上列举了最常用的33个，<code
            class="bg-slate-100 px-1 py-0.5 rounded">await</code> 和 <code
            class="bg-slate-100 px-1 py-0.5 rounded">async</code> 已包含。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Keyword {
  word: string;
  category: string;
  description: string;
  example: string;
}

const keywords: Keyword[] = [
  // 值常量
  { word: 'True', category: '常量', description: '布尔真值，整数1的别名', example: 'flag = True\nif flag: print("yes")' },
  { word: 'False', category: '常量', description: '布尔假值，整数0的别名', example: 'flag = False\nif not flag: print("no")' },
  { word: 'None', category: '常量', description: '空值对象，表示“无”', example: 'result = None\nif result is None: print("无结果")' },
  // 逻辑运算
  { word: 'and', category: '逻辑运算', description: '逻辑与，短路运算', example: 'a = 5\nb = 10\nif a > 0 and b < 20: print("ok")' },
  { word: 'or', category: '逻辑运算', description: '逻辑或，短路运算', example: 'x = None\ny = "hello"\nvalue = x or y  # "hello"' },
  { word: 'not', category: '逻辑运算', description: '逻辑非，取反', example: 'flag = False\nif not flag: print("flase")' },
  // 身份/成员
  { word: 'is', category: '比较', description: '判断两个对象是否是同一个', example: 'a = []\nb = []\nprint(a is b)  # False' },
  { word: 'in', category: '比较', description: '判断元素是否在容器中', example: 'if "a" in "abc": print("存在")' },
  // 条件循环
  { word: 'if', category: '控制流', description: '条件判断', example: 'score = 85\nif score >= 60: print("及格")' },
  { word: 'elif', category: '控制流', description: 'else if 分支', example: 'if x > 0: print("正")\nelif x < 0: print("负")\nelse: print("零")' },
  { word: 'else', category: '控制流', description: '否则分支，也用于循环正常结束', example: 'for i in range(3): print(i)\nelse: print("循环结束")' },
  { word: 'for', category: '控制流', description: '迭代循环', example: 'for item in [1,2,3]:\n    print(item)' },
  { word: 'while', category: '控制流', description: '条件循环', example: 'n = 0\nwhile n < 3:\n    print(n); n+=1' },
  { word: 'break', category: '控制流', description: '跳出循环', example: 'for i in range(10):\n    if i==5: break' },
  { word: 'continue', category: '控制流', description: '跳过本次循环剩余代码', example: 'for i in range(5):\n    if i==2: continue\n    print(i)' },
  { word: 'pass', category: '占位', description: '空语句，保持结构完整', example: 'def todo():\n    pass  # 稍后实现' },
  // 函数定义
  { word: 'def', category: '函数', description: '定义函数', example: 'def greet(name):\n    return f"Hi {name}"' },
  { word: 'return', category: '函数', description: '从函数返回值', example: 'def add(a,b):\n    return a + b' },
  { word: 'lambda', category: '函数', description: '匿名函数', example: 'square = lambda x: x**2\nprint(square(5))' },
  { word: 'yield', category: '函数', description: '生成器函数中返回值，暂停状态', example: 'def gen():\n    yield 1\n    yield 2\nlist(gen())  # [1,2]' },
  // 类/对象
  { word: 'class', category: '面向对象', description: '定义类', example: 'class Dog:\n    def bark(self):\n        print("woof")' },
  { word: 'self', category: '面向对象', description: '实例方法的第一个参数（不是关键字，但约定俗成）', example: 'def __init__(self, name): self.name=name', note: 'self 不是关键字，但属于惯例，此处列出便于查阅' },
  // 异常处理
  { word: 'try', category: '异常', description: '尝试执行代码块', example: 'try:\n    x = 1/0\nexcept ZeroDivisionError:\n    print("除数不能为0")' },
  { word: 'except', category: '异常', description: '捕获指定异常', example: 'except Exception as e:\n    print(e)' },
  { word: 'finally', category: '异常', description: '无论是否异常都执行', example: 'finally:\n    print("清理资源")' },
  { word: 'raise', category: '异常', description: '手动抛出异常', example: 'raise ValueError("参数错误")' },
  { word: 'assert', category: '调试', description: '断言条件为真，否则触发AssertionError', example: 'assert 2+2 == 4, "数学错误"' },
  // 导入/上下文
  { word: 'import', category: '模块', description: '导入模块', example: 'import math\nprint(math.pi)' },
  { word: 'from', category: '模块', description: '从模块导入特定成员', example: 'from datetime import datetime' },
  { word: 'as', category: '模块', description: '起别名', example: 'import pandas as pd' },
  { word: 'with', category: '上下文', description: '上下文管理器，自动释放资源', example: 'with open("file.txt") as f:\n    data = f.read()' },
  // 变量作用域
  { word: 'global', category: '作用域', description: '声明全局变量', example: 'x = 0\ndef set_x():\n    global x\n    x = 5' },
  { word: 'nonlocal', category: '作用域', description: '声明嵌套函数中的外层变量', example: 'def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x = 2' },
  // 异步
  { word: 'async', category: '异步', description: '定义协程函数', example: 'async def fetch():\n    await asyncio.sleep(1)\n    return "data"' },
  { word: 'await', category: '异步', description: '等待协程完成', example: 'result = await fetch()' },
  // 删除
  { word: 'del', category: '语句', description: '删除变量或容器中的元素', example: 'a = 10\ndel a\n# 再访问 a 会报错' }
];
</script>

<style scoped>
/* 可选：微调代码块滚动条 */
pre {
  white-space: pre-wrap;
  word-break: break-word;
}

code {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
}
</style>
