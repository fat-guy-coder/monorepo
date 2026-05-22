<template>
  <div class="analogy-container">
    <header class="hero">
      <h1 class="title">📋 JS/TS ↔ Python <span class="gradient">语法类比速查表</span></h1>
      <p class="subtitle">快速迁移 · 对比学习 · 一表掌握核心差异与相似点</p>
    </header>

    <div class="table-wrapper">
      <table class="analogy-table">
        <thead>
          <tr>
            <th>分类</th>
            <th>JavaScript / TypeScript</th>
            <th>Python</th>
            <th>🔍 说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in analogyList" :key="item.id">
            <td class="category">{{ item.category }}</td>
            <td class="code"><code>{{ item.js }}</code></td>
            <td class="code"><code>{{ item.py }}</code></td>
            <td class="note">{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="footer">
      <p>💡 提示：Python 使用缩进而非大括号，变量无需声明关键字，类型注解仅辅助（需 mypy 检查）</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface AnalogyItem {
  id: number;
  category: string;
  js: string;
  py: string;
  note: string;
}

const analogyList: AnalogyItem[] = [
  // ========== 基础语法 ==========
  { id: 1, category: '变量声明', js: 'let a = 10;\nconst b = 20;', py: 'a = 10\nb = 20  # 无常量概念，约定大写', note: 'Python 动态类型，重新赋值即可改变类型' },
  { id: 2, category: '注释', js: '// 单行\n/* 多行 */', py: '# 单行\n""" 多行 """', note: 'Python 多行字符串常用于文档注释' },
  { id: 3, category: '条件语句', js: 'if (x > 0) { ... } else { ... }', py: 'if x > 0:\n    ...\nelse:\n    ...', note: '注意缩进和冒号，无圆括号' },
  { id: 4, category: '循环 - for', js: 'for (let i = 0; i < arr.length; i++)', py: 'for item in iterable:', note: 'Python for 迭代可迭代对象，配合 range() 生成索引' },
  { id: 5, category: '循环 - while', js: 'while (cond) { ... }', py: 'while cond:\n    ...', note: '语法类似，注意冒号和缩进' },
  { id: 6, category: '循环控制', js: 'break / continue', py: 'break / continue', note: '两者语法相同' },
  { id: 7, category: '三元运算符', js: 'const result = x > 0 ? "positive" : "non-positive"', py: 'result = "positive" if x > 0 else "non-positive"', note: 'Python 用 if...else 表达式' },
  { id: 8, category: '函数定义', js: 'function add(a, b) { return a + b; }', py: 'def add(a, b):\n    return a + b', note: 'def 关键字，无需花括号' },
  { id: 9, category: '箭头函数 / lambda', js: 'const sq = x => x * x;', py: 'sq = lambda x: x * x', note: 'Lambda 只能单表达式，无语句' },
  { id: 10, category: '默认参数', js: 'function f(x = 1) { ... }', py: 'def f(x=1): ...', note: 'Python 默认参数在定义时计算一次（注意可变对象陷阱）' },
  { id: 11, category: '剩余参数 / *args', js: 'function f(...args) { ... }', py: 'def f(*args): ...', note: '*args 收集为元组' },
  { id: 12, category: '关键字参数 / **kwargs', js: 'function f(obj) { ... }', py: 'def f(**kwargs): ...', note: '**kwargs 收集为字典' },
  { id: 13, category: '逻辑运算符', js: '&& / || / !', py: 'and / or / not', note: 'Python 用单词而非符号，注意 and/or 的惰性求值' },
  { id: 14, category: '身份运算符', js: '// JS 无直接对应', py: 'is / is not', note: 'Python 用 is 检查是否是同一对象（引用比较）' },
  { id: 15, category: '空值对比', js: 'null / undefined', py: 'None', note: 'Python 只有 None，没有 undefined' },
  { id: 16, category: '类型检查', js: 'typeof x === "string"', py: 'type(x) is str 或 isinstance(x, str)', note: 'type() 返回类型对象，isinstance() 更推荐（支持继承）' },
  { id: 17, category: '链式比较', js: '// JS 无直接对应', py: 'if 0 < x < 10:', note: 'Python 支持 0 < x < 10 连续比较，JS 需要 && 连接' },
  { id: 18, category: 'pass 语句', js: '// 无直接对应', py: 'pass', note: 'Python 空代码块需要 pass，JS 用空 {} 或注释' },

  // ========== 数据结构 ==========
  { id: 21, category: '数组 / 列表', js: 'const arr = [1, 2, 3];', py: 'lst = [1, 2, 3]', note: '都支持索引、切片、动态增删' },
  { id: 22, category: '列表长度', js: 'arr.length', py: 'len(lst)', note: 'JS 用属性，Python 用函数' },
  { id: 23, category: '末尾添加', js: 'arr.push(4)', py: 'lst.append(4)', note: '方法名不同' },
  { id: 24, category: '列表切片', js: 'arr.slice(1, 3)', py: 'lst[1:3]', note: 'Python 切片含左不含右，支持步长 lst[::2]' },
  { id: 25, category: '对象 / 字典', js: 'const obj = { a: 1 };', py: 'd = {"a": 1} 或 d = dict(a=1)', note: 'Python 键需为不可变类型，但可用字符串、数字、元组' },
  { id: 26, category: '字典访问', js: 'obj.key 或 obj["key"]', py: 'd["key"] 或 d.get("key", default)', note: 'Python get() 更安全，可指定默认值' },
  { id: 27, category: '集合', js: 'const set = new Set([1,2,3]);', py: 's = {1, 2, 3} 或 set([1,2,3])', note: 'Python 集合用花括号，与字典区别是只有值' },
  { id: 28, category: '集合操作', js: 'set.add() / delete() / has()', py: 's.add() / s.remove() / x in s', note: 'remove 不存在会抛异常，discard 不会' },
  { id: 29, category: '元组', js: '// 无直接对应，可借数组', py: 't = (1, 2, 3)', note: 'Python 元组不可变，常用于多返回值、函数参数打包' },
  { id: 30, category: '元组 vs 列表', js: '// 无区别', py: 't = (1,)  # 单元素元组需加逗号', note: '元组不可变，列表可变；元组可作字典键，列表不行' },
  { id: 31, category: '解构赋值', js: 'const [a,b] = [1,2];\nconst {x,y} = obj;', py: 'a, b = [1, 2]\nx, y = obj.values()', note: 'Python 可解构列表、元组、字典等' },
  { id: 32, category: '展开运算符', js: '[...arr, 4]\n{...obj, c:3}', py: '[*lst, 4]\n{**d, "c": 3}', note: '* 和 ** 用于列表、字典展开' },
  { id: 33, category: '列表推导式', js: '// arr.map/filter', py: '[x*2 for x in lst if x>0]', note: 'Python 独有，简洁高效，JS 无直接对应' },
  { id: 34, category: '字典推导式', js: '// 无直接对应', py: '{k: v**2 for k, v in d.items()}', note: 'Python 独有语法' },
  { id: 35, category: '生成器推导式', js: '// 无直接对应', py: '(x**2 for x in range(10))', note: '返回生成器对象，省内存' },
  { id: 36, category: 'enumerate', js: '// arr.forEach((item, i) => {})', py: 'for i, v in enumerate(lst):', note: 'Python 枚举函数，返回 (索引, 值) 元组' },
  { id: 37, category: 'zip', js: '// 无直接对应', py: 'for a, b in zip(list1, list2):', note: '并行迭代多个序列，短的长度对齐' },
  { id: 38, category: 'Map 对象', js: 'const m = new Map()', py: 'm = {} 或 m = dict()', note: 'JS Map 键可以是任意类型，Python 字典键必须可哈希' },

  // ========== 字符串 ==========
  { id: 41, category: '模板字符串', js: '`Hello ${name}`', py: 'f"Hello {name}"', note: 'f-string 效率高，Python 3.6+' },
  { id: 42, category: '多行字符串', js: '`line1\nline2`', py: '"""line1\nline2"""', note: '三引号保留格式' },
  { id: 43, category: '字符串方法', js: "'abc'.toUpperCase()", py: "'abc'.upper()", note: '方法名略有差异' },
  { id: 44, category: '字符串 split', js: "\"a,b\".split(\",\")", py: "'a,b'.split(',')", note: '两者几乎相同' },
  { id: 45, category: '字符串 join', js: "['a','b'].join('-')", py: "'-'.join(['a','b'])", note: 'JS 数组方法在前，Python 字符串方法在前' },
  { id: 46, category: '字符串 strip', js: '// trim()', py: '"  hi  ".strip()', note: 'strip/lstrip/rstrip 是 Python 特有的去空白方法' },
  { id: 47, category: '字符串 replace', js: 'str.replace("a", "b")', py: 's.replace("a", "b")', note: 'Python 还支持正则 replace: re.sub()' },
  { id: 48, category: '字符串 find', js: 'str.indexOf("a")', py: 's.find("a") / s.index("a")', note: 'find 返回 -1，index 抛异常' },
  { id: 49, category: '字符串格式化', js: '"{} {}".format(a, b)', py: '"{}{}".format(a, b)\nf"{a}{b}"', note: 'Python 有多种格式化方式，f-string 最现代' },
  { id: 50, category: '原始字符串', js: '// 无直接对应', py: "r'C:\\path\\file'", note: 'Python r 前缀禁用转义，常用于正则和路径' },

  // ========== 函数进阶 ==========
  { id: 51, category: '高阶函数', js: 'arr.map(x => x*2)', py: 'list(map(lambda x: x*2, lst))', note: 'Python 内置 map/filter/reduce，列表推导更 Pythonic' },
  { id: 52, category: 'filter', js: 'arr.filter(x => x > 0)', py: 'list(filter(lambda x: x > 0, lst))', note: 'Python filter 返回迭代器，需 list() 转换' },
  { id: 53, category: 'reduce', js: 'arr.reduce((acc, x) => acc + x, 0)', py: 'from functools import reduce\nreduce(lambda acc, x: acc + x, lst, 0)', note: 'Python reduce 在 functools，需指定初始值' },
  { id: 54, category: '闭包', js: 'function outer() { let x = 1; return () => x++; }', py: 'def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x+=1\n        return x\n    return inner', note: '需要 nonlocal 声明修改外部变量' },
  { id: 55, category: '生成器函数', js: 'function* gen() { yield 1; }', py: 'def gen():\n    yield 1', note: 'Python yield 返回生成器，JS 用 function* + yield' },
  { id: 56, category: '生成器.next()', js: 'gen.next().value', py: 'next(gen)', note: '两者都是迭代器协议' },
  { id: 57, category: '函数注解', js: '// 无官方支持（TS 可用）', py: 'def f(x: int) -> str:', note: 'Python 类型注解仅提示，运行时无效' },
  { id: 58, category: '偏函数', js: '// 无直接对应', py: 'from functools import partial\nf = partial(func, arg)', note: '固定部分参数返回新函数' },
  { id: 59, category: '柯里化', js: 'const curried = a => b => a + b', py: '# 需手动实现或用 functools', note: 'Python 无原生柯里化支持' },

  // ========== 类与 OOP ==========
  { id: 61, category: '类定义', js: 'class Dog { constructor(name) { this.name = name; } }', py: 'class Dog:\n    def __init__(self, name):\n        self.name = name', note: 'self 显式，__init__ 类似构造函数' },
  { id: 62, category: '实例方法', js: 'bark() { return "woof"; }', py: 'def bark(self):\n    return "woof"', note: '第一个参数 self' },
  { id: 63, category: '类方法', js: 'static method()', py: '@classmethod\ndef method(cls):', note: '装饰器 @classmethod，第一个参数 cls' },
  { id: 64, category: '静态方法', js: 'static util()', py: '@staticmethod\ndef util():', note: '无需 self/cls' },
  { id: 65, category: '继承', js: 'class Cat extends Animal { ... }', py: 'class Cat(Animal):\n    ...', note: '括号内写父类，支持多继承' },
  { id: 66, category: 'super 调用', js: 'super(name)', py: 'super().__init__(name)', note: 'Python 中 super() 无参数也可' },
  { id: 67, category: '属性访问器', js: 'get prop() {} / set prop(v) {}', py: '@property / @prop.setter', note: '装饰器风格，与 TS 类似' },
  { id: 68, category: '私有成员', js: '#privateField 或 _underscore约定', py: '__double_leading 名称修饰', note: '双下划线触发名称修饰 _ClassName__var' },
  { id: 69, category: '类属性', js: 'static count = 0', py: 'count = 0  # 类变量，所有实例共享', note: 'Python 类属性直接定义，JS 用 static 关键字' },
  { id: 70, category: '实例属性', js: 'this.x = 1 在 constructor', py: 'self.x = 1 在 __init__', note: '都在构造方法中初始化' },
  { id: 71, category: '多重继承 MRO', js: '// 无直接对应', py: 'class C(A, B):', note: 'Python 用 C3 线性化确定方法解析顺序' },
  { id: 72, category: '抽象类', js: '// 需用 TypeScript abstract', py: 'from abc import ABC, abstractmethod\nclass Shape(ABC):', note: 'Python abc 模块实现抽象类' },
  { id: 73, category: '运算符重载', js: '// 无直接对应', py: 'def __add__(self, other):', note: 'Python 通过特殊方法实现，JS 无此功能' },
  { id: 74, category: '__slots__', js: '// 无直接对应', py: '__slots__ = ["x", "y"]', note: 'Python 限制实例属性，节省内存' },
  { id: 75, category: '数据类 dataclass', js: '// 无直接对应（TS 可用库）', py: '@dataclass\nclass Point:\n    x: int\n    y: int', note: 'Python 3.7+ 自动生成 __init__/__repr__' },

  // ========== 异步 ==========
  { id: 81, category: 'Promise / Future', js: 'new Promise((resolve, reject) => {})', py: 'asyncio.Future() 或 create_task', note: 'Future 在低层使用，高层用 async/await' },
  { id: 82, category: 'async 函数', js: 'async function fetch() {}', py: 'async def fetch():', note: 'async def 定义协程' },
  { id: 83, category: 'await', js: 'const data = await fetch();', py: 'data = await fetch()', note: '必须在 async 函数内' },
  { id: 84, category: '并发执行', js: 'Promise.all([p1, p2])', py: 'await asyncio.gather(coro1, coro2)', note: 'gather 类似 Promise.all' },
  { id: 85, category: 'Promise.allSettled', js: 'Promise.allSettled([p1, p2])', py: 'asyncio.all_tasks() 或手动处理', note: 'Python 无直接对应，需额外处理' },
  { id: 86, category: 'setTimeout', js: 'setTimeout(() => {}, 1000)', py: 'asyncio.sleep(1) 或 threading', note: 'Python 异步用 asyncio.sleep，线程用 threading' },
  { id: 87, category: 'setInterval', js: 'setInterval(() => {}, 1000)', py: '// 无直接对应，需用 asyncio 或 threading', note: 'Python 需要循环+sleep 或第三方库' },
  { id: 88, category: 'Event Loop', js: '浏览器事件循环', py: 'asyncio 事件循环', note: 'JS 事件循环是单线程异步，Python 有自己的事件循环模型' },
  { id: 89, category: '回调函数', js: 'fetch(url, (err, data) => {})', py: 'async def callback(err, data):', note: 'Python 异步回调较少用，倾向 async/await' },

  // ========== 模块 ==========
  { id: 91, category: '导出', js: 'export const fn = ...', py: '# 无显式导出，定义即导出', note: 'Python 模块所有顶层变量均可被导入' },
  { id: 92, category: '默认导出', js: 'export default class {}', py: '无直接对应，约定主类作为模块接口', note: '可设置 __all__ 控制 from module import *' },
  { id: 93, category: '导入', js: 'import { fn } from "./mod"', py: 'from module import fn', note: '相对导入用 . 和 ..' },
  { id: 94, category: '别名导入', js: 'import * as util from "./util"', py: 'import module as alias', note: 'Python 不支持 * 别名，可 import module 后使用别名' },
  { id: 95, category: '导入别名', js: 'import { foo as bar }', py: 'from m import foo as bar', note: '两者都支持 as 别名' },
  { id: 96, category: '模块 __name__', js: '// 无直接对应', py: 'if __name__ == "__main__":', note: 'Python 判断是否直接运行还是被导入' },
  { id: 97, category: '__all__ 控制', js: '// 无直接对应', py: '__all__ = ["func1", "func2"]', note: '控制 from module import * 的导出内容' },
  { id: 98, category: '相对导入', js: '// 无直接对应', py: 'from . import sibling\nfrom .. import parent', note: 'Python 用 . 和 .. 表示相对路径' },

  // ========== 错误处理 ==========
  { id: 101, category: 'try/catch', js: 'try { ... } catch(e) { ... } finally { ... }', py: 'try:\n    ...\nexcept Exception as e:\n    ...\nfinally:\n    ...', note: 'except 可指定异常类型' },
  { id: 102, category: '抛出异常', js: 'throw new Error("msg")', py: 'raise Exception("msg")', note: '自定义异常继承 Exception' },
  { id: 103, category: '捕获异常类型', js: 'catch (e instanceof TypeError)', py: 'except TypeError as e:', note: 'Python 可以区分不同异常类型' },
  { id: 104, category: '自定义异常', js: 'class MyError extends Error {}', py: 'class MyError(Exception):\n    pass', note: 'Python 异常需继承 Exception 类' },
  { id: 105, category: '异常链', js: 'throw new Error("msg", { cause: e })', py: 'raise Exception("msg") from e', note: 'Python 用 raise ... from e 保留原异常' },
  { id: 106, category: 'assert', js: 'console.assert(condition)', py: 'assert condition, "msg"', note: '两者都用于调试断言' },

  // ========== 装饰器 ==========
  { id: 111, category: '装饰器', js: '@decorator\nclass A {}\n 或函数装饰器', py: '@decorator\ndef func():', note: '语法相似，Python 装饰器更常用' },
  { id: 112, category: '类装饰器', js: '@classDecorator\nclass MyClass {}', py: '@classDecorator\nclass MyClass:', note: 'Python 类装饰器更常见' },
  { id: 113, category: '装饰器工厂', js: '@decoratorFactory(arg)', py: '@decorator_factory(arg)\ndef func():', note: 'Python 装饰器工厂返回装饰器' },
  { id: 114, category: 'wraps 保留元信息', js: '// 无直接对应', py: 'from functools import wraps\n@wraps(fn)', note: 'Python 用 wraps 保留原函数 metadata' },

  // ========== 文件与 IO ==========
  { id: 121, category: '文件读取', js: '// 浏览器/Node 不同', py: 'with open("f.txt") as f:\n    content = f.read()', note: 'Python with 语句自动关闭文件' },
  { id: 122, category: '文件写入', js: 'fs.writeFileSync("f.txt", data)', py: "with open('f.txt', 'w') as f:\n    f.write(data)", note: 'Python 需指定模式 w/a/r+' },
  { id: 123, category: 'JSON 序列化', js: 'JSON.stringify(obj) / JSON.parse(str)', py: 'import json\njson.dumps(obj) / json.loads(str)', note: 'Python 用 json 模块' },
  { id: 124, category: 'console.log', js: 'console.log("msg")', py: 'print("msg")', note: 'Python print 是函数，JS console 是对象方法' },

  // ========== 其他常用 ==========
  { id: 131, category: 'range', js: '// 无直接对应', py: 'range(10) / range(0, 10, 2)', note: '生成整数序列，range(10) = [0,1,2,3,4,5,6,7,8,9]' },
  { id: 132, category: '切片赋值', js: 'arr.splice(1, 2, ...items)', py: 'lst[1:3] = [4, 5]', note: 'Python 切片可直接赋值' },
  { id: 133, category: 'any/all', js: 'arr.some(x => x > 0) / arr.every(x => x > 0)', py: 'any(x > 0 for x in lst) / all(x > 0 for x in lst)', note: 'Python any/all 用生成器表达式' },
  { id: 134, category: 'sorted', js: '[...arr].sort((a,b) => b-a)', py: 'sorted(lst, reverse=True)', note: 'sorted 返回新列表，sort 就地修改' },
  { id: 135, category: 'min/max', js: 'Math.min(...arr) / Math.max(...arr)', py: 'min(lst) / max(lst)', note: 'Python 可指定 key: min(lst, key=lambda x: x.attr)' },
  { id: 136, category: 'sum', js: 'arr.reduce((a,b) => a+b, 0)', py: 'sum(lst) / sum(x for x in lst)', note: 'Python sum 支持生成器' },
  { id: 137, category: 'with 语句', js: '// 无直接对应（TC39 提案中）', py: 'with open("f") as f:\n    ...', note: 'Python 上下文管理器，JS 尚在提案阶段' },
  { id: 138, category: '类型别名', js: 'type Points = { x: number; y: number; }', py: 'Point = tuple[int, int]  # 或用 TypeAlias', note: 'Python 用类型别名或 typing.NamedTuple' },
  { id: 139, category: '可选参数', js: 'function f(x?: number) {}', py: 'def f(x: int | None = None):', note: 'Python 用 | 表示联合类型（3.10+）' },
  { id: 140, category: '枚举', js: 'enum Color { RED, GREEN }', py: 'from enum import Enum\nclass Color(Enum):\n    RED = 1', note: 'Python Enum 类更强大，支持方法' },
  { id: 141, category: 'None 检查', js: 'if (value !== null && value !== undefined)', py: 'if value is not None:', note: 'Python 用 is not None 而非 == None' },
  { id: 142, category: '作用域', js: 'let 块作用域 / var 函数作用域', py: 'Python 无块作用域，缩进决定作用域', note: 'Python 无 let/var，用赋值即定义' },
  { id: 143, category: '列表排序原地', js: 'arr.sort()', py: 'lst.sort()', note: '两者都是原地排序' },
  { id: 144, category: '深拷贝', js: 'structuredClone(obj) / JSON.parse(JSON.stringify(obj))', py: 'import copy\ncopy.deepcopy(obj)', note: 'Python copy 模块提供 deepcopy' },
  { id: 145, category: ' walrus 赋值', js: '// 无直接对应（Python 3.8+）', py: 'if (n := len(arr)) > 10:', note: 'walrus 运算符 := 赋值并返回值' },
  { id: 146, category: 'match 语句', js: '// switch (Python 3.10+)', py: 'match value:\n    case 1: ...\n    case _: ...', note: 'Python match 是更强大的 switch，支持模式匹配' },
  { id: 147, category: '类型Union', js: 'let x: string | number', py: 'x: str | int  # Python 3.10+', note: 'Python 3.10 前用 Optional[int] 或 Union[int, str]' },
  { id: 148, category: '类型检查器', js: 'TypeScript / Flow', py: 'mypy / pyright', note: 'Python 需用外部类型检查器' },
];
</script>

<style lang="less" scoped>
@bg-page: #f9fafb;
@card-bg: #ffffff;
@primary: #1e293b;
@accent: #3b82f6;
@border: #e4e7eb;

.analogy-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: @bg-page;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, monospace;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: @primary;

    .gradient {
      background: linear-gradient(135deg, @accent, #8b5cf6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .subtitle {
    color: #4b5563;
    margin-top: 0.3rem;
    font-size: 0.95rem;
  }
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 1rem;
  background: @card-bg;
  border: 1px solid @border;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.analogy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th,
  td {
    padding: 0.75rem 0.9rem;
    text-align: left;
    border-bottom: 1px solid @border;
    vertical-align: top;
  }

  th {
    background: #f1f5f9;
    font-weight: 600;
    color: @primary;
  }

  .category {
    font-weight: 500;
    color: #0f172a;
    background: #fefce8;
    width: 90px;
  }

  .code {
    font-family: 'Fira Code', 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    background: #f8fafc;
    white-space: pre-wrap;

    code {
      background: none;
      padding: 0;
    }
  }

  .note {
    color: #475569;
    line-height: 1.4;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #5b6e8c;
  border-top: 1px solid @border;
  padding-top: 1rem;
}

@media (max-width: 800px) {
  .analogy-table {
    font-size: 0.75rem;

    th,
    td {
      padding: 0.5rem;
    }
  }
}
</style>
