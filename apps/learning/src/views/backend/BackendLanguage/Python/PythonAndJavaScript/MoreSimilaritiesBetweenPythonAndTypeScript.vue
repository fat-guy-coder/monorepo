<template>
  <div class="analogy-container">
    <header class="hero">
      <h1 class="title">📋 TypeScript ↔ Python <span class="gradient">语法类比速查表</span></h1>
      <p class="subtitle">类型系统对照 · 语法迁移 · 一表掌握核心差异与相似点</p>
    </header>

    <div class="table-wrapper">
      <table class="analogy-table">
        <thead>
          <tr>
            <th>分类</th>
            <th>TypeScript</th>
            <th>Python</th>
            <th>🔍 说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in analogyList" :key="item.id">
            <td class="category">{{ item.category }}</td>
            <td class="code"><code>{{ item.ts }}</code></td>
            <td class="code"><code>{{ item.py }}</code></td>
            <td class="note">{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="footer">
      <p>💡 TypeScript 是结构化类型系统（structural typing），Python 是鸭子类型（duck typing）——两者都强调"形状"而非"名义"。TS 编译时检查，Python 运行时 + 可选 mypy/pyright 静态检查。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface AnalogyItem {
  id: number;
  category: string;
  ts: string;
  py: string;
  note: string;
}

const analogyList: AnalogyItem[] = [
  // ================================================================
  // 基础语法
  // ================================================================
  { id: 1, category: '变量声明', ts: 'let a: number = 10;\nconst b: number = 20;\n// TS 支持类型推断，标注可选', py: 'a: int = 10\nb: int = 20\n# Python 动态类型，标注仅提示', note: 'TS 类型在编译时检查，Python 类型注解需 mypy 检查。两者都支持类型推断' },
  { id: 2, category: '注释', ts: '// 单行\n/* 多行 */\n/** JSDoc 文档 */', py: '# 单行\n""" 多行 """', note: 'TS 继承 JS 注释语法，JSDoc 可生成文档。Python 多行字符串常用于 docstring' },
  { id: 3, category: '条件语句', ts: 'if (x > 0) { ... } else { ... }', py: 'if x > 0:\n    ...\nelse:\n    ...', note: 'Python 用冒号+缩进，TS 用圆括号+花括号' },
  { id: 4, category: '循环 - for', ts: 'for (const item of arr) { ... }\narr.forEach((item: T) => { ... })', py: 'for item in iterable:\n    ...', note: 'TS for...of 迭代可迭代对象；Python for 同样迭代可迭代对象' },
  { id: 5, category: '循环 - while', ts: 'while (cond) { ... }', py: 'while cond:\n    ...', note: '语法类似，Python 注意冒号和缩进' },
  { id: 6, category: '循环控制', ts: 'break / continue', py: 'break / continue', note: '两者语法完全相同' },
  { id: 7, category: '三元运算符', ts: 'const result: string = x > 0\n  ? "positive"\n  : "non-positive";', py: 'result = "positive" if x > 0 \\\n         else "non-positive"', note: 'TS 用 ? : 前缀表达式，Python 用 if...else 中缀表达式' },
  { id: 8, category: '函数定义', ts: 'function add(a: number, b: number): number {\n  return a + b;\n}', py: 'def add(a: int, b: int) -> int:\n    return a + b', note: 'TS 类型标注在参数后和括号后；Python 用 def 和 -> 返回类型' },
  { id: 9, category: '箭头函数 / lambda', ts: 'const sq: (x: number) => number\n  = (x) => x * x;', py: 'sq: Callable[[int], int] = \\\n    lambda x: x * x', note: 'Python lambda 仅单表达式，TS 箭头函数可包含语句块' },
  { id: 10, category: '默认参数', ts: 'function f(x: number = 1): void { ... }', py: 'def f(x: int = 1) -> None: ...', note: '语法类似。Python 注意：默认值在定义时计算一次，勿用可变对象作默认值' },
  { id: 11, category: '剩余参数 / *args', ts: 'function f(...args: string[]): void {}', py: 'def f(*args: str) -> None: ...', note: 'TS 剩余参数收集为数组；Python *args 收集为元组' },
  { id: 12, category: '关键字参数 / **kwargs', ts: 'function f(opts: { a?: number }): void {}', py: 'def f(**kwargs: int) -> None: ...', note: 'TS 通常用对象字面量传参；Python **kwargs 收集为 dict' },
  { id: 13, category: '逻辑运算符', ts: '&& / || / !', py: 'and / or / not', note: 'Python 用单词而非符号，可读性更好。两者都支持惰性求值' },
  { id: 14, category: '身份/引用比较', ts: '// Object.is(a, b) 或 ===', py: 'a is b  # 引用比较\nid(a) == id(b)', note: 'TS === 值比较（引用类型比较引用）；Python is 判断同一对象' },
  { id: 15, category: '空值', ts: 'null / undefined\n// TS strictNullChecks 开启时严格检查', py: 'None', note: 'TS 区分 null 和 undefined；Python 只有 None。TS 编译选项可控制空值严格度' },
  { id: 16, category: '类型检查', ts: 'typeof x === "string"\nx instanceof MyClass', py: 'isinstance(x, str)\ntype(x) is str', note: 'TS typeof 返回 JS 类型字符串；Python isinstance() 支持继承检查，比 type() 更推荐' },
  { id: 17, category: '链式比较', ts: '// x > 0 && x < 10\n// 无原生链式比较', py: 'if 0 < x < 10:', note: 'Python 支持连续比较（0 < x < 10），TS 需用 && 连接' },
  { id: 18, category: '空代码块', ts: '// 空花括号 {} 或注释', py: 'pass  # 或 ...（Ellipsis）', note: 'Python 必须用 pass 或 ... 占位；TS 空花括号即可' },
  { id: 19, category: '类型断言 / 转换', ts: 'const val = x as string;\n// 或 <string>x（JSX 中禁用）', py: 'val: str = x  # 仅标注\n# 运行时用 int(x), str(x)', note: 'TS as 仅编译时断言不影响运行时；Python 类型转换是运行时操作' },
  { id: 20, category: '非空断言', ts: 'const len = value!.length;\n// 告诉编译器 value 非空', py: 'len = value.length\n# 无编译时检查，运行时 AttributeError', note: 'TS ! 后缀断言非空；Python 需手动 if value is not None 检查' },

  // ================================================================
  // 数据结构
  // ================================================================
  { id: 21, category: '数组 / 列表', ts: 'const arr: number[] = [1, 2, 3];\n// 或 Array<number>', py: 'lst: list[int] = [1, 2, 3]', note: 'TS 用 T[] 或 Array<T> 泛型；Python 用 list[T]（3.9+）' },
  { id: 22, category: '列表长度', ts: 'arr.length  // 属性', py: 'len(lst)  # 函数', note: 'TS 用 .length 属性，Python 用 len() 内置函数' },
  { id: 23, category: '末尾添加', ts: 'arr.push(4);', py: 'lst.append(4)', note: '方法名不同：push vs append' },
  { id: 24, category: '列表切片', ts: 'arr.slice(1, 3);\n// 也可用 arr.slice(1)', py: 'lst[1:3]\nlst[::2]  # 带步长', note: 'Python 切片语法更强大，支持 lst[start:stop:step]' },
  { id: 25, category: '对象 / 字典', ts: 'interface User { name: string; age: number }\nconst obj: User = { name: "Alice", age: 30 };', py: 'd: dict[str, int] = {"a": 1}\n# 或 d = dict(a=1)', note: 'TS 用 interface/type 定义结构；Python 字典键需可哈希' },
  { id: 26, category: '字典访问', ts: 'obj.name  // 类型安全\nobj["name"]  // 动态键', py: 'd["key"]\nd.get("key", default)  # 安全', note: 'Python 用 get() 更安全（返回默认值而非抛异常）；TS 可选链 ?. 也常用于安全访问' },
  { id: 27, category: '集合', ts: 'const s: Set<number>\n  = new Set([1, 2, 3]);', py: 's: set[int] = {1, 2, 3}\n# 或 set([1, 2, 3])', note: 'Python 集合用花括号字面量；TS 使用 new Set()' },
  { id: 28, category: '集合操作', ts: 's.add(4); s.delete(2); s.has(3);\n// 交集: new Set([...a].filter(x => b.has(x)))', py: 's.add(4); s.remove(2); 3 in s\n# 交集: a & b\n# 并集: a | b', note: 'Python 集合运算符更丰富：& | - ^ 直接支持集合运算' },
  { id: 29, category: '元组', ts: 'const t: [number, string, boolean]\n  = [1, "hello", true];\n// 固定长度 + 各元素独立类型', py: 't: tuple[int, str, bool]\n  = (1, "hello", True)', note: 'TS 元组是定长数组+各位置独立类型。Python 元组不可变，常用于多返回值' },
  { id: 30, category: '可变元组 / 命名元组', ts: 'type Labels = [string, ...number[]];\n// 可变元组（TS 4.0+）', py: 'from typing import NamedTuple\nclass Point(NamedTuple):\n    x: int\n    y: int', note: 'TS 支持剩余元素元组；Python NamedTuple 给字段命名' },
  { id: 31, category: '解构赋值', ts: 'const [a, b]: [number, number] = [1, 2];\nconst { x, y }: Point = point;', py: 'a, b = 1, 2\nx, y = point', note: '两者都支持解构。TS 可标注解构类型；Python 支持 *rest 收集剩余值' },
  { id: 32, category: '展开运算符', ts: 'const merged = [...arr, 4];\nconst copy = { ...obj, c: 3 };', py: 'merged = [*lst, 4]\ncopy = {**d, "c": 3}', note: '语法高度相似，TS 用 ...，Python 用 *（列表）和 **（字典）' },
  { id: 33, category: '列表推导 / map+filter', ts: 'const result: number[] = arr\n  .map(x => x * 2)\n  .filter(x => x > 0);', py: '[x * 2 for x in lst if x > 0]', note: 'Python 推导式语法更紧凑；TS 用链式方法调用。两者效果相同' },
  { id: 34, category: '字典推导式', ts: 'const mapped: Record<string, number>\n  = Object.fromEntries(\n    Object.entries(obj).map(\n      ([k, v]) => [k, v * 2]\n    )\n  );', py: '{k: v * 2 for k, v in d.items()}', note: 'Python 字典推导式简洁优雅；TS 需要 Object.fromEntries + entries + map 组合' },
  { id: 35, category: '生成器推导式', ts: 'function* gen() {\n  for (let i = 0; i < 10; i++)\n    yield i * i;\n}', py: 'gen = (x * x for x in range(10))', note: 'Python 一行生成器表达式；TS 需显式定义生成器函数' },
  { id: 36, category: '枚举 / enumerate', ts: 'arr.forEach((item, i) => {});\n// 或用 entries()', py: 'for i, item in enumerate(lst):', note: 'Python enumerate 返回 (索引, 值) 元组；TS forEach 回调提供 index 参数' },
  { id: 37, category: '并行迭代 / zip', ts: 'import { zip } from "lodash";\n// 无原生 zip —— 需手动实现', py: 'for a, b in zip(list1, list2):', note: 'Python zip 内置并行迭代，按最短序列对齐；TS 需第三方库或手动实现' },
  { id: 38, category: 'Map 对象', ts: 'const m: Map<string, number>\n  = new Map();\nm.set("key", 1);', py: 'd: dict[str, int] = {}\nd["key"] = 1', note: 'TS Map 键可以是任意类型；Python dict 键必须可哈希（但通常够用）' },

  // ================================================================
  // 字符串
  // ================================================================
  { id: 41, category: '模板字符串 / f-string', ts: 'const msg = `Hello ${name}`;\n// 支持多行', py: 'msg = f"Hello {name}"\n# f-string Python 3.6+', note: 'TS 模板字符串用反引号+${}；Python f-string 用 f 前缀+花括号' },
  { id: 42, category: '多行字符串', ts: 'const text = `line1\nline2`;\n// 保留换行', py: 'text = """line1\nline2"""', note: 'TS 用反引号，Python 用三引号' },
  { id: 43, category: '字符串大小写', ts: '"abc".toUpperCase();\n"ABC".toLowerCase();', py: '"abc".upper()\n"ABC".lower()', note: '方法名不同：TS 驼峰命名 longName，Python 蛇形命名 lower_case' },
  { id: 44, category: '字符串分割', ts: '"a,b".split(",");', py: '"a,b".split(",")', note: '两者几乎相同' },
  { id: 45, category: '字符串连接 join', ts: '["a", "b"].join("-");\n// 数组方法', py: '"-".join(["a", "b"])\n# 字符串方法', note: '关键区别：TS 是数组方法在前，Python 是字符串方法在前' },
  { id: 46, category: '字符串去空白', ts: '" hi ".trim();\n.trimStart() / .trimEnd()', py: '" hi ".strip()\n.lstrip() / .rstrip()', note: '方法名不同：trim vs strip' },
  { id: 47, category: '字符串替换', ts: 'str.replace("a", "b");\n// 仅替换第一个匹配（无 g 标志）\nstr.replaceAll("a", "b");', py: 's.replace("a", "b")\n# 替换所有匹配\nimport re\nre.sub(r"a", "b", s)', note: 'TS replace 不加 g 只替换第一个；Python replace 默认替换全部' },
  { id: 48, category: '字符串查找', ts: 'str.indexOf("a");  // -1\nstr.includes("a"); // boolean', py: 's.find("a")   # 返回 -1\ns.index("a")  # 抛异常\n"a" in s      # 布尔值', note: 'Python find 类似 indexOf，index 更严格抛异常' },
  { id: 49, category: '字符串格式化', ts: '`${name} is ${age}`;\n// 模板字符串是主要方式', py: 'f"{name} is {age}"\n# 也支持 "{}{}".format(a, b)', note: 'TS 模板字符串 vs Python f-string，风格和使用场景非常相似' },
  { id: 50, category: '原始字符串', ts: 'String.raw`C:\\path\\to\\file`;\n// 或用双反斜杠转义', py: 'r"C:\\path\\to\\file"\n# r 前缀禁用转义', note: 'Python r-prefix 简洁优雅；TS 需 String.raw 标签函数或手动转义' },

  // ================================================================
  // 函数进阶
  // ================================================================
  { id: 51, category: '高阶函数 map', ts: 'const doubled: number[]\n  = arr.map((x: number): number => x * 2);', py: 'doubled = list(\n    map(lambda x: x * 2, lst)\n)\n# 或推导式: [x*2 for x in lst]', note: 'Python 列表推导式通常比 map+lambda 更受推荐，更 Pythonic' },
  { id: 52, category: 'filter 过滤', ts: 'const positive: number[]\n  = arr.filter((x: number): x is number => x > 0);', py: 'positive = [x for x in lst if x > 0]\n# 或 list(filter(lambda x: x>0, lst))', note: 'Python filter 返回迭代器需 list() 转换；推导式更直接' },
  { id: 53, category: 'reduce 归约', ts: 'const sum: number = arr.reduce(\n  (acc: number, x: number): number =>\n    acc + x, 0\n);', py: 'from functools import reduce\nsum = reduce(\n    lambda acc, x: acc + x,\n    lst, 0\n)', note: 'Python reduce 在 functools 模块中；简单的归约用 sum(lst) 即可' },
  { id: 54, category: '闭包', ts: 'function outer(): () => number {\n  let x: number = 1;\n  return (): number => x++;\n}', py: 'def outer() -> Callable[[], int]:\n    x = 1\n    def inner() -> int:\n        nonlocal x\n        x += 1\n        return x\n    return inner', note: 'TS 闭包自动捕获外层变量；Python 修改外层变量需 nonlocal 声明' },
  { id: 55, category: '生成器函数', ts: 'function* gen(): Generator<number> {\n  yield 1;\n  yield 2;\n}', py: 'def gen() -> Generator[int, None, None]:\n    yield 1\n    yield 2', note: '两者都是惰性求值。TS 用 function* + yield，Python 用 def + yield' },
  { id: 56, category: '生成器取值', ts: 'const g = gen();\ng.next().value;  // 1', py: 'g = gen()\nnext(g)  # 1', note: 'TS 生成器有 .next() 方法；Python 用 next() 内置函数' },
  { id: 57, category: '函数类型签名', ts: 'type Handler = (\n  x: number\n) => string;', py: '# 用 Callable 或 Protocol\nfrom typing import Callable\nHandler = Callable[[int], str]', note: 'TS 类型别名直接表达函数签名；Python 用 Callable[[参数], 返回] 或 typing.Protocol' },
  { id: 58, category: '偏函数 / 部分应用', ts: 'const add5 = (x: number) => add(5, x);\n// 箭头函数手动实现', py: 'from functools import partial\nadd5 = partial(add, 5)', note: 'Python partial 内置支持；TS 通常用箭头函数手动包装' },
  { id: 59, category: '函数重载', ts: 'function foo(x: number): string;\nfunction foo(x: string): number;\nfunction foo(x: number | string) {\n  // 实现签名\n}', py: 'from typing import overload\n@overload\ndef foo(x: int) -> str: ...\n@overload\ndef foo(x: str) -> int: ...\ndef foo(x):  # 实现\n    ...', note: 'TS 支持函数重载声明；Python 用 @overload 装饰器（typing 模块）' },
  { id: 60, category: '泛型函数', ts: 'function identity<T>(arg: T): T {\n  return arg;\n}', py: 'from typing import TypeVar\nT = TypeVar("T")\ndef identity(arg: T) -> T:\n    return arg', note: 'TS <T> 尖括号泛型更简洁；Python TypeVar 需显式声明。Python 3.12+ 支持更简洁语法' },

  // ================================================================
  // 类与 OOP
  // ================================================================
  { id: 61, category: '类定义', ts: 'class Dog {\n  constructor(\n    public name: string\n  ) {}\n}', py: 'class Dog:\n    def __init__(\n        self,\n        name: str\n    ) -> None:\n        self.name = name', note: 'TS constructor 可同时声明+初始化属性（public 简写）；Python __init__ 显式赋值 self' },
  { id: 62, category: '实例方法', ts: 'class Dog {\n  bark(): string {\n    return "woof";\n  }\n}', py: 'class Dog:\n    def bark(self) -> str:\n        return "woof"', note: 'Python 方法第一个参数必须是 self（显式）；TS this 隐式可用' },
  { id: 63, category: '类方法 / static', ts: 'class Dog {\n  static create(): Dog {\n    return new Dog();\n  }\n}', py: 'class Dog:\n    @classmethod\n    def create(cls) -> Dog:\n        return cls()', note: 'TS static 无需实例即可调用；Python @classmethod 将类作为第一参数 cls' },
  { id: 64, category: '静态方法', ts: 'class Utils {\n  static format(s: string): string {\n    return s.trim();\n  }\n}', py: 'class Utils:\n    @staticmethod\n    def format(s: str) -> str:\n        return s.strip()', note: '语法相似。Python @staticmethod 无需 self/cls 参数' },
  { id: 65, category: '继承', ts: 'class Cat extends Animal {\n  constructor(name: string) {\n    super(name);\n  }\n}', py: 'class Cat(Animal):\n    def __init__(self, name: str):\n        super().__init__(name)', note: 'TS extends 关键字；Python 括号内写父类。Python 支持多继承，TS 只支持单继承' },
  { id: 66, category: 'super 调用', ts: 'super.method();  // 父类方法', py: 'super().method()  # 父类方法', note: 'TS super 直接调用；Python super() 无参（3.0+）自动推断当前类和 self' },
  { id: 67, category: '属性访问器 get/set', ts: 'private _name: string = "";\nget name(): string { return this._name; }\nset name(v: string) { this._name = v; }', py: '@property\ndef name(self) -> str:\n    return self._name\n\n@name.setter\ndef name(self, v: str):\n    self._name = v', note: 'TS 用 get/set 关键字；Python 用 @property 装饰器和 @xxx.setter' },
  { id: 68, category: '访问修饰符', ts: 'public name: string;\nprivate age: number;\nprotected id: number;\nreadonly createdAt: Date;', py: '# 约定：_protected, __private\n_name: str   # 约定保护\n__age: int   # 名称修饰\n\n# Python 无编译时强制', note: 'TS 编译时强制访问控制；Python 靠约定和名称修饰（name mangling）' },
  { id: 69, category: '类属性 / 静态属性', ts: 'class MyClass {\n  static count: number = 0;\n}', py: 'class MyClass:\n    count: int = 0  # 类变量\n    # 所有实例共享', note: 'Python 类属性直接定义在类体中；TS 用 static 关键字' },
  { id: 70, category: '实例属性', ts: 'this.x = 1;  // constructor 中', py: 'self.x = 1  # __init__ 中', note: '都在构造方法中初始化实例属性' },
  { id: 71, category: '多重继承', ts: '// TS 不支持多重继承\n// 用 mixins 或 interface 多实现', py: 'class C(A, B):\n    ...\n# MRO: C3 线性化', note: 'Python 支持真正的多继承+MRO；TS 只能用 mixin 模式模拟' },
  { id: 72, category: '抽象类', ts: 'abstract class Shape {\n  abstract area(): number;\n  // 不能 new Shape()\n}', py: 'from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...', note: 'TS 原生 abstract 关键字；Python 需继承 ABC 并用 @abstractmethod 装饰器' },
  { id: 73, category: '运算符重载', ts: '// TS 无运算符重载', py: 'def __add__(self, other):\n    return Point(\n        self.x + other.x,\n        self.y + other.y\n    )', note: 'Python 通过 __add__/__mul__ 等特殊方法重载运算符；TS/JS 不支持' },
  { id: 74, category: '__slots__ / 内存优化', ts: '// TS 无直接对应\n// 类属性就是类属性', py: '__slots__ = ("x", "y")\n# 限制实例属性，节省内存', note: 'Python __slots__ 是内存优化特性；TS 无对应概念' },
  { id: 75, category: '数据类 / interface', ts: 'interface Point {\n  readonly x: number;\n  readonly y: number;\n}\n// TS interface 编译后消失', py: 'from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int', note: 'Python @dataclass 自动生成 __init__/__repr__/__eq__；TS interface 纯编译时类型' },

  // ================================================================
  // 泛型与类型系统
  // ================================================================
  { id: 76, category: '泛型接口 / Protocol', ts: 'interface Repository<T> {\n  get(id: number): T;\n  save(item: T): void;\n}', py: 'from typing import Protocol, TypeVar\nT = TypeVar("T")\nclass Repository(Protocol[T]):\n    def get(self, id: int) -> T: ...\n    def save(self, item: T) -> None: ...', note: 'TS 泛型用尖括号 <T>，语法更简洁；Python Protocol 是结构化类型的实现方式' },
  { id: 77, category: '泛型约束', ts: 'function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length > b.length ? a : b;\n}', py: 'from typing import TypeVar\nT = TypeVar("T", bound=Sized)\ndef longest(a: T, b: T) -> T:\n    return a if len(a) > len(b) else b', note: 'TS extends 约束 T 必须满足某形状；Python bound 约束 TypeVar 必须是某类型的子类' },
  { id: 78, category: 'Utility Types / (无对应)', ts: 'Partial<T>      // 所有属性可选\nPick<T, K>       // 选取部分属性\nOmit<T, K>       // 排除部分属性\nReadonly<T>      // 所有属性只读\nRecord<K, V>     // 键值映射', py: '# Python 无内置对应\n# 可用 typing.TypedDict 部分实现\n# 或 dataclass + frozen=True', note: 'TS 内置丰富的工具类型进行类型变换；Python 类型系统相对简单，无直接对应' },
  { id: 79, category: '联合类型 / 交叉类型', ts: 'type StringOrNumber = string | number;  // 联合\ntype Named = A & B;  // 交叉（合并）', py: '# Python 3.10+\nStrOrNum = str | int  # 联合\n# 无原生交叉类型', note: '两者联合类型语法高度相似（都是 |）。TS 还有交叉类型 &，Python 无' },
  { id: 80, category: '字面量类型 / Literal', ts: 'type Direction = "left" | "right" | "up" | "down";\ntype Answer = 0 | 1;', py: 'from typing import Literal\nDirection = Literal["left", "right", "up", "down"]\nAnswer = Literal[0, 1]', note: '语法不同但概念相同——限制值为特定字面量集合' },

  // ================================================================
  // 异步
  // ================================================================
  { id: 81, category: 'async 函数', ts: 'async function fetchData(): Promise<Data> {\n  const res = await api.get();\n  return res.data;\n}', py: 'async def fetch_data() -> Data:\n    res = await api.get()\n    return res.data', note: '语法几乎相同。TS 显式返回 Promise<T>；Python 协程返回类型直接标注为 T' },
  { id: 82, category: 'await', ts: 'const data = await fetch();\n// 必须在 async 函数内', py: 'data = await fetch()\n# 必须在 async def 内', note: '用法相同。TS 顶层 await 需在 ES 模块中；Python asyncio.run() 是入口' },
  { id: 83, category: '并发执行', ts: 'const [r1, r2] = await Promise.all([\n  fetch("/api/1"),\n  fetch("/api/2"),\n]);', py: 'r1, r2 = await asyncio.gather(\n    fetch("/api/1"),\n    fetch("/api/2"),\n)', note: 'TS Promise.all 对应 Python asyncio.gather。两者都是等待全部完成' },
  { id: 84, category: 'Promise.allSettled / 异常容错', ts: 'const results = await Promise.allSettled([p1, p2]);\n// 每个结果都有 status + value/reason', py: 'results = await asyncio.gather(\n    coro1, coro2,\n    return_exceptions=True,\n)', note: 'Python gather(return_exceptions=True) 类似 allSettled——异常不中断其他协程' },
  { id: 85, category: 'Promise.race / 竞速', ts: 'const result = await Promise.race([p1, p2]);\n// 返回最先完成的', py: '# 用 asyncio.wait + FIRST_COMPLETED\ndone, pending = await asyncio.wait(\n    [t1, t2],\n    return_when=FIRST_COMPLETED\n)', note: 'TS Promise.race 更简洁；Python 需 asyncio.wait() 配合 return_when 参数' },
  { id: 86, category: '超时控制', ts: 'const result = await Promise.race([\n  fetch("/api"),\n  timeout(5000),\n]);', py: 'result = await asyncio.wait_for(\n    fetch("/api"),\n    timeout=5.0,\n)', note: 'Python asyncio.wait_for 内置超时支持；TS 通常用 Promise.race + 定时器模拟' },
  { id: 87, category: '异步迭代', ts: 'for await (const item of asyncIterable) {\n  console.log(item);\n}', py: 'async for item in async_iterable:\n    print(item)', note: '语法几乎相同：TS for await...of 对应 Python async for...in' },
  { id: 88, category: '顶层 await / 运行入口', ts: '// ES 模块中可直接 await\nconst data = await fetch();', py: '# 必须用 asyncio.run() 入口\nasync def main(): ...\nasyncio.run(main())', note: 'TS(.mjs) 和 Python 3.8+ 都支持顶层 await（Python 需 asyncio.run 包裹）' },
  { id: 89, category: 'AbortController / 取消', ts: 'const ctrl = new AbortController();\nfetch(url, { signal: ctrl.signal });\nctrl.abort();  // 取消请求', py: 'task = asyncio.create_task(fetch(url))\ntask.cancel()  # 发送 CancelledError\n# 协程内需 try/except 处理', note: 'TS AbortController 用于取消 fetch；Python 用 task.cancel() + CancelledError' },

  // ================================================================
  // 模块
  // ================================================================
  { id: 91, category: '导出', ts: 'export const fn = () => {};\nexport type { User };\nexport default class MyClass {}', py: '# 无显式导出关键字\n# 模块所有顶层名称均可被导入\n__all__ = ["fn", "MyClass"]', note: 'TS 显式 export 控制导出；Python 公开所有，可设 __all__ 限制 from x import *' },
  { id: 92, category: '导入', ts: 'import { fn, type User } from "./mod";\nimport MyClass from "./mod";', py: 'from mod import fn, User\nfrom mod import MyClass', note: 'TS 用 import { } from "path"；Python 用 from module import name' },
  { id: 93, category: '命名空间导入', ts: 'import * as util from "./util";\nutil.fn();', py: 'import util\nutil.fn()', note: 'TS 用 import * as alias；Python 直接 import module，模块即命名空间' },
  { id: 94, category: '导入别名', ts: 'import { veryLongName as short } from "./mod";', py: 'from mod import very_long_name as short', note: '两者都支持 as 别名，语法相似' },
  { id: 95, category: '类型导入', ts: 'import type { User, Post } from "./types";\n// 编译后完全移除，零运行时开销', py: 'from typing import TYPE_CHECKING\nif TYPE_CHECKING:\n    from types import User  # 仅类型检查时导入', note: 'TS import type 编译后消失；Python TYPE_CHECKING 条件导入避免循环引用' },
  { id: 96, category: '条件编译 / 平台检测', ts: '// TS 无 __name__ 概念\n// 入口文件直接执行', py: 'if __name__ == "__main__":\n    main()  # 直接运行才执行', note: 'Python 特有模式，区分被导入还是直接运行。TS 无对应概念' },
  { id: 97, category: '__all__ 导出控制', ts: '// export 关键字本身就是控制', py: '__all__ = ["func1", "func2"]\n# 限制 from module import *', note: 'TS 用 export 精确控制；Python 默认全部公开' },
  { id: 98, category: '路径别名 / tsconfig paths', ts: '// tsconfig.json\n"paths": { "@/*": ["./src/*"] }\nimport { foo } from "@/utils";', py: '# 无内置支持\n# 需第三方库或 sys.path 操作\nimport sys\nsys.path.insert(0, "src")', note: 'TS tsconfig paths 原生路径别名支持；Python 需手动修改 sys.path 或使用可编辑安装' },

  // ================================================================
  // 错误处理
  // ================================================================
  { id: 101, category: 'try/catch', ts: 'try {\n  // 可能出错的代码\n} catch (e: unknown) {\n  if (e instanceof Error) {\n    console.error(e.message);\n  }\n} finally {\n  // 清理代码\n}', py: 'try:\n    # 可能出错的代码\nexcept Exception as e:\n    print(e)\nfinally:\n    # 清理代码', note: 'TS catch 中 e 默认 unknown 类型需类型收窄；Python 可直接捕获指定异常类型' },
  { id: 102, category: '抛出异常', ts: 'throw new Error("Something wrong");\nthrow new TypeError("Invalid type");', py: 'raise ValueError("无效值")\nraise TypeError("类型错误")', note: '两者的异常类体系都很丰富。TS throw new；Python raise' },
  { id: 103, category: '多类型异常捕获', ts: 'try { ... }\ncatch (e) {\n  if (e instanceof TypeError) { ... }\n  else if (e instanceof RangeError) { ... }\n}', py: 'try:\n    ...\nexcept TypeError as e:\n    ...\nexcept ValueError as e:\n    ...', note: 'Python 多个 except 分支更清晰；TS 需手动 instanceof 判断' },
  { id: 104, category: '自定义异常', ts: 'class MyError extends Error {\n  constructor(\n    msg: string,\n    public code: number\n  ) {\n    super(msg);\n    this.name = "MyError";\n  }\n}', py: 'class MyError(Exception):\n    def __init__(\n        self, msg: str,\n        code: int\n    ) -> None:\n        super().__init__(msg)\n        self.code = code', note: 'TS 自定义异常继承 Error 并设 name；Python 继承 Exception 即可' },
  { id: 105, category: '异常链 / cause', ts: 'throw new Error("wrap", {\n  cause: originalError\n});', py: 'raise Exception("wrap") from original_error', note: '语法不同但目的相同：保留原始异常作为原因' },
  { id: 106, category: 'assert / 断言', ts: 'console.assert(cond, "message");\n// 或 Node assert 模块', py: 'assert cond, "message"', note: 'Python assert 内置关键字更便捷；TS console.assert 仅浏览器环境有效' },

  // ================================================================
  // 装饰器
  // ================================================================
  { id: 111, category: '装饰器（TS 5.0+）', ts: 'function log(\n  target: Function,\n  context: ClassMethodDecoratorContext\n) {\n  // TS 5.0+ Stage 3 装饰器\n}\n@log\nmethod() {}', py: 'def log(func):\n    @wraps(func)\n    def wrapper(*args, **kw):\n        print(f"调用 {func.__name__}")\n        return func(*args, **kw)\n    return wrapper\n\n@log\ndef method(): ...', note: 'TS 新版装饰器基于 TC39 Stage 3 提案；Python 装饰器本质是高阶函数包装' },
  { id: 112, category: '类装饰器', ts: '@sealed\nclass MyClass {}', py: '@dataclass\nclass MyClass: ...', note: 'Python 类装饰器更常见（如 @dataclass、@total_ordering）；TS 相对少用' },
  { id: 113, category: '装饰器工厂（带参数）', ts: 'function route(path: string) {\n  return function (target: any) {\n    // 用 path 参数\n  };\n}\n@route("/api")', py: 'def route(path: str):\n    def decorator(func):\n        func._path = path\n        return func\n    return decorator\n\n@route("/api")', note: '两者模式相同：外层函数接收参数，返回真正的装饰器函数' },
  { id: 114, category: 'wraps / 保留元信息', ts: '// TS 装饰器无 wraps 概念\n// 需手动复制属性', py: 'from functools import wraps\n@wraps(original_func)\ndef wrapper(*args, **kwargs):\n    ...', note: 'Python @wraps 保留 __name__/__doc__ 等元信息；TS 装饰器无对应机制' },

  // ================================================================
  // 文件与 IO
  // ================================================================
  { id: 121, category: '文件读取（同步）', ts: '// Deno\nconst content = Deno.readTextFileSync("f.txt");\n// Node\nimport { readFileSync } from "fs";\nconst content = readFileSync("f.txt", "utf-8");', py: 'with open("f.txt") as f:\n    content = f.read()', note: 'Python with 语句自动管理文件关闭；TS/Node 需手动 close 或用 fs.promises' },
  { id: 122, category: '文件写入', ts: '// Deno\nDeno.writeTextFileSync("f.txt", data);\n// Node\nwriteFileSync("f.txt", data);', py: 'with open("f.txt", "w") as f:\n    f.write(data)', note: 'Python 需指定模式 r/w/a/r+；TS 同。注意编码：Python 默认 UTF-8（3.x）' },
  { id: 123, category: 'JSON 序列化', ts: 'const str = JSON.stringify(obj);\nconst obj = JSON.parse(str) as MyType;', py: 'import json\ns = json.dumps(obj)\nobj = json.loads(s)', note: 'TS 需手动标注解析后的类型（as MyType）；Python json.loads 返回 Any' },
  { id: 124, category: 'console / print', ts: 'console.log("msg");\nconsole.table(data);  // 表格\nconsole.group("label");', py: 'print("msg")\nprint(f"{key}: {val}")', note: 'TS console 方法丰富（table/group/trace）；Python print 简单但可用 rich 库增强' },

  // ================================================================
  // 其他常用
  // ================================================================
  { id: 131, category: 'range / 序列生成', ts: 'const nums = Array.from(\n  { length: 10 },\n  (_, i) => i\n);  // [0..9]', py: 'list(range(10))\n# [0, 1, 2, ..., 9]\nlist(range(0, 10, 2))', note: 'Python range 简洁直观；TS 需 Array.from 或 [...Array(n).keys()]' },
  { id: 132, category: '切片赋值', ts: 'arr.splice(1, 2, 4, 5);\n// 从索引1开始删除2个，插入4,5', py: 'lst[1:3] = [4, 5]\n# 切片直接赋值，更直观', note: 'Python 切片赋值更直观；TS 用 splice 替换范围' },
  { id: 133, category: 'any / all', ts: 'const hasPositive = arr.some(\n  (x: number) => x > 0\n);\nconst allPositive = arr.every(\n  (x: number) => x > 0\n);', py: 'any(x > 0 for x in lst)\nall(x > 0 for x in lst)', note: 'Python any/all 用生成器表达式更简洁；TS 用 some/every 数组方法' },
  { id: 134, category: '排序 sorted', ts: 'const sorted = [...arr].sort(\n  (a, b) => b - a\n);  // 降序', py: 'sorted(lst, reverse=True)\n# 可选 key=lambda x: x.attr', note: 'sorted 返回新列表；sort 就地修改。Python key 参数非常强大' },
  { id: 135, category: 'min / max', ts: 'Math.min(...arr);\nMath.max(...arr);', py: 'min(lst)\nmax(lst)\n# 支持 key 参数', note: 'Python 可指定 key：min(lst, key=lambda x: x.price)；TS 无内建 key 参数' },
  { id: 136, category: 'sum / 求和', ts: 'const total = arr.reduce(\n  (a, b) => a + b, 0\n);', py: 'total = sum(lst)\n# 支持生成器 sum(x for x in lst)', note: 'Python sum() 内置函数简洁优雅；TS 需用 reduce' },
  { id: 137, category: 'with 语句 / using', ts: '// TS 5.2+ Explicit Resource Management\nusing conn = await getConnection();\n// 离开作用域自动 dispose', py: 'with open("f.txt") as f:\n    content = f.read()\n# 自动调用 __exit__', note: 'TS 5.2 引入 using 关键字（TC39 Stage 3）；Python with 长期以来一直可用' },
  { id: 138, category: '类型别名', ts: 'type Point = {\n  x: number;\n  y: number;\n};\ntype ID = string | number;', py: '# Python 3.12+ 简洁语法\ntype Point = tuple[int, int]\nID = str | int', note: 'TS type 关键字；Python 3.12+ type 语句（之前用 TypeAlias 或直接赋值）' },
  { id: 139, category: '可选 / 联合类型', ts: 'function f(x?: number): void {}\n// x 可选 = number | undefined\nlet val: string | null = null;', py: 'def f(x: int | None = None) -> None:\n    ...\n# Optional[int] 等价于 int | None', note: 'TS ? 是可选缩写；Python int | None 是联合类型（3.10+）。概念完全相同' },
  { id: 140, category: '枚举', ts: 'enum Color {\n  RED = "#ff0000",\n  GREEN = "#00ff00",\n  BLUE = "#0000ff",\n}\n// 编译为 JS 对象', py: 'from enum import Enum\nclass Color(Enum):\n    RED = "#ff0000"\n    GREEN = "#00ff00"\n    BLUE = "#0000ff"', note: 'TS enum 编译为运行时对象；Python Enum 类是真正的运行时类，支持方法' },
  { id: 141, category: 'None 检查 / 空值合并', ts: 'const val = x ?? "default";\n// null/undefined 时用默认值\nconst len = obj?.prop?.length;', py: 'val = x or "default"\n# 注意：0、""、[] 也被视为假值\nlen = obj.prop.length if obj and obj.prop else None', note: 'TS ?? 只对 null/undefined 生效；Python or 对所有假值生效。TS 可选链 ?. 对应 Python getattr 或手动检查' },
  { id: 142, category: '块作用域', ts: '// let/const 块作用域\n{\n  let x = 1;  // 仅此块可见\n}\n// x 不可访问', py: '# Python 无块作用域\n# 变量作用域由函数/类/模块界定\nif True:\n    x = 1  # 外部可访问！', note: 'TS 块级作用域（let/const）；Python 变量在函数/模块级作用，无块级概念' },
  { id: 143, category: 'as const / Final', ts: 'const config = {\n  mode: "strict",\n} as const;\n// 字面量类型，不可修改', py: 'from typing import Final\nMODE: Final = "strict"\n# 或 Python 3.8+ Final', note: 'TS as const 让对象变为深度只读+字面量类型；Python Final 仅标注意图，运行时仍可改' },
  { id: 144, category: 'satisfies / (无对应)', ts: 'const config = { a: 1 } satisfies Record<string, number>;\n// 类型检查但不改变推断类型', py: '# Python 无直接对应\n# 可用 TypeGuard 或 assert 近似', note: 'TS 4.9+ satisfies 检查类型合规但不扩宽类型；Python 无等价语法' },
  { id: 145, category: '海象运算符 / 赋值表达式', ts: '// TS 无直接对应，可在表达式内赋值\nconst match = (m = regex.exec(str))\n  ? m[1] : null;', py: '# Python 3.8+\nif (n := len(lst)) > 10:\n    print(f"列表太长: {n}")', note: 'Python := 在表达式中赋值并返回值；TS 赋值本身也是表达式但可读性较差' },
  { id: 146, category: 'match / switch 模式匹配', ts: '// TS switch 是值匹配\nswitch (x) {\n  case 1: ...; break;\n  default: ...\n}\n// 无结构模式匹配', py: '# Python 3.10+ 结构化模式匹配\nmatch value:\n    case {"type": "user", "name": name}:\n        print(f"用户: {name}")\n    case [first, *rest]:\n        print(f"首元素: {first}")\n    case _:\n        print("未知")', note: 'Python match 支持结构/序列/映射/类模式匹配；TS switch 仅值匹配。能力差距很大' },
  { id: 147, category: '条件类型 / overload', ts: 'type IsString<T> =\n  T extends string ? "yes" : "no";', py: 'from typing import overload\n@overload\ndef process(x: str) -> int: ...\n@overload\ndef process(x: int) -> str: ...', note: 'TS 条件类型是编译时类型体操；Python 用 @overload 处理不同参数类型组合' },
  { id: 148, category: '模板字面量类型', ts: 'type EventName = `on${Capitalize<string>}`;\n// "onClick" | "onHover" | ...', py: '# Python 无模板字面量类型\n# LiteralString (3.11+) 仅表示字符串字面量', note: 'TS 模板字面量类型可拼接/操作字符串类型；Python 类型系统不支持' },
];
</script>

<style lang="less" scoped>
@bg-page: #f8fafc;
@card-bg: #ffffff;
@primary: #1e293b;
@accent: #3178c6;
@border: #e4e7eb;

.analogy-container {
  max-width: 1500px;
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
  font-size: 0.82rem;

  th, td {
    padding: 0.7rem 0.85rem;
    text-align: left;
    border-bottom: 1px solid @border;
    vertical-align: top;
  }

  th {
    background: #f1f5f9;
    font-weight: 600;
    color: @primary;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .category {
    font-weight: 600;
    color: #0f172a;
    background: #eff6ff;
    width: 100px;
    font-size: 0.78rem;
    white-space: nowrap;
  }

  .code {
    font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
    font-size: 0.74rem;
    background: #f8fafc;
    white-space: pre-wrap;
    max-width: 320px;

    code {
      background: none;
      padding: 0;
      color: #1e293b;
    }
  }

  .note {
    color: #475569;
    line-height: 1.5;
    font-size: 0.78rem;
    max-width: 300px;
  }

  tbody tr:hover {
    background: #f8fafc;
    .category { background: #dbeafe; }
    .code { background: #f1f5f9; }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.82rem;
  color: #5b6e8c;
  border-top: 1px solid @border;
  padding-top: 1.2rem;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .analogy-table {
    font-size: 0.72rem;
    th, td { padding: 0.5rem 0.4rem; }
  }
  .code { max-width: 200px; font-size: 0.68rem; }
  .category { width: 70px; font-size: 0.7rem; }
}
</style>
