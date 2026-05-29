<template>
  <div class="magic-methods">
    <header class="hero">
      <h1>✨ Python 魔术方法完全清单</h1>
      <p>双下划线方法 · 定制类行为 · 协议实现</p>
    </header>

    <div class="cards-grid">
      <div v-for="item in magicList" :key="item.name" class="card">
        <div class="card-header">
          <span class="method">__{{ item.name }}__</span>
          <span class="trigger">{{ item.trigger }}</span>
        </div>
        <p class="desc">{{ item.desc }}</p>
        <pre class="code-snip"><code>{{ item.example }}</code></pre>
      </div>
    </div>

    <footer class="footer">
      <p>💡 魔术方法赋予 Python 对象丰富的协议支持，是构建 DSL 和框架的基石</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface MagicItem {
  name: string;
  trigger: string;
  desc: string;
  example: string;
}

const magicList: MagicItem[] = [
  // 对象生命周期
  { name: 'new', trigger: '实例创建前调用（类方法）', desc: '控制实例的创建过程，常用于单例或不可变类型子类化。', example: "class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance" },
  { name: 'init', trigger: '实例创建后初始化', desc: '设置实例的初始状态，最常用的构造方法。', example: "def __init__(self, name):\n    self.name = name" },
  { name: 'del', trigger: '实例被垃圾回收前', desc: '用于释放外部资源（如文件、网络连接），不保证调用时机。', example: "def __del__(self):\n    self.file.close()" },
  // 字符串表示
  { name: 'str', trigger: 'str(obj) / print(obj)', desc: '返回用户友好的字符串表示。', example: "def __str__(self):\n    return f'Person({self.name})'" },
  { name: 'repr', trigger: 'repr(obj) / 交互式环境直接显示', desc: '返回开发者友好的字符串表示，通常可用于重新构造对象。', example: "def __repr__(self):\n    return f'Person({self.name!r})'" },
  { name: 'format', trigger: 'format(obj, spec) / f-string 格式说明符', desc: '自定义格式化字符串的行为。', example: "def __format__(self, spec):\n    return f'{self.value:{spec}}'" },
  // 容器与序列协议
  { name: 'len', trigger: 'len(obj)', desc: '返回容器的长度。', example: "def __len__(self):\n    return len(self.items)" },
  { name: 'getitem', trigger: 'obj[key]', desc: '通过索引或键获取元素，支持切片。', example: "def __getitem__(self, idx):\n    return self.data[idx]" },
  { name: 'setitem', trigger: 'obj[key] = value', desc: '设置元素的值。', example: "def __setitem__(self, idx, val):\n    self.data[idx] = val" },
  { name: 'delitem', trigger: 'del obj[key]', desc: '删除元素。', example: "def __delitem__(self, idx):\n    del self.data[idx]" },
  { name: 'contains', trigger: 'value in obj', desc: '判断元素是否在容器中。', example: "def __contains__(self, item):\n    return item in self.data" },
  { name: 'iter', trigger: 'iter(obj) / for 循环开始', desc: '返回迭代器对象，使容器可迭代。', example: "def __iter__(self):\n    return iter(self.data)" },
  { name: 'next', trigger: 'next(iterator)', desc: '迭代器的下一个值，需配合 __iter__ 使用。', example: "def __next__(self):\n    if self.n >= len(self): raise StopIteration\n    val = self.data[self.n]; self.n+=1; return val" },
  { name: 'reversed', trigger: 'reversed(obj)', desc: '返回反向迭代器。', example: "def __reversed__(self):\n    return reversed(self.data)" },
  // 属性访问
  { name: 'getattr', trigger: 'obj.name 且正常属性未找到', desc: '访问不存在的属性时被调用。', example: "def __getattr__(self, name):\n    return f'Missing {name}'" },
  { name: 'setattr', trigger: 'obj.name = value', desc: '拦截任何属性赋值，需小心递归。', example: "def __setattr__(self, name, val):\n    self.__dict__[name] = val" },
  { name: 'delattr', trigger: 'del obj.name', desc: '拦截属性删除。', example: "def __delattr__(self, name):\n    del self.__dict__[name]" },
  { name: 'getattribute', trigger: '任何属性访问（无论是否存在）', desc: '完全拦截属性读取，极容易导致无限递归，谨慎使用。', example: "def __getattribute__(self, name):\n    return super().__getattribute__(name)" },
  // 比较运算符
  { name: 'lt', trigger: 'obj < other', desc: '小于比较。', example: "def __lt__(self, other):\n    return self.value < other.value" },
  { name: 'le', trigger: 'obj <= other', desc: '小于等于比较。', example: "def __le__(self, other):\n    return self.value <= other.value" },
  { name: 'eq', trigger: 'obj == other', desc: '相等比较。', example: "def __eq__(self, other):\n    return self.id == other.id" },
  { name: 'ne', trigger: 'obj != other', desc: '不等比较，默认行为是 not __eq__。', example: "def __ne__(self, other):\n    return not self == other" },
  { name: 'gt', trigger: 'obj > other', desc: '大于比较。', example: "def __gt__(self, other):\n    return self.value > other.value" },
  { name: 'ge', trigger: 'obj >= other', desc: '大于等于比较。', example: "def __ge__(self, other):\n    return self.value >= other.value" },
  // 数值运算符
  { name: 'add', trigger: 'obj + other', desc: '加法。', example: "def __add__(self, other):\n    return self.value + other.value" },
  { name: 'sub', trigger: 'obj - other', desc: '减法。', example: "def __sub__(self, other):\n    return self.value - other.value" },
  { name: 'mul', trigger: 'obj * other', desc: '乘法。', example: "def __mul__(self, other):\n    return self.value * other.value" },
  { name: 'truediv', trigger: 'obj / other', desc: '真除法。', example: "def __truediv__(self, other):\n    return self.value / other.value" },
  { name: 'floordiv', trigger: 'obj // other', desc: '整数除法。', example: "def __floordiv__(self, other):\n    return self.value // other.value" },
  { name: 'mod', trigger: 'obj % other', desc: '取模。', example: "def __mod__(self, other):\n    return self.value % other.value" },
  { name: 'pow', trigger: 'obj ** other 或 pow(obj, other)', desc: '幂运算。', example: "def __pow__(self, other):\n    return self.value ** other.value" },
  { name: 'neg', trigger: '-obj', desc: '一元负号。', example: "def __neg__(self):\n    return -self.value" },
  { name: 'pos', trigger: '+obj', desc: '一元正号。', example: "def __pos__(self):\n    return +self.value" },
  { name: 'abs', trigger: 'abs(obj)', desc: '绝对值。', example: "def __abs__(self):\n    return abs(self.value)" },
  // 反射算术运算符（右操作数）
  { name: 'radd', trigger: 'other + obj 当 other 不支持加法时', desc: '反射加法。', example: "def __radd__(self, other):\n    return other + self.value" },
  { name: 'iadd', trigger: 'obj += other', desc: '增量加法（就地）。', example: "def __iadd__(self, other):\n    self.value += other; return self" },
  // 类型转换
  { name: 'int', trigger: 'int(obj)', desc: '转换为整数。', example: "def __int__(self):\n    return int(self.value)" },
  { name: 'float', trigger: 'float(obj)', desc: '转换为浮点数。', example: "def __float__(self):\n    return float(self.value)" },
  { name: 'bool', trigger: 'bool(obj) / if obj 条件', desc: '返回布尔值，若未定义则调用 __len__。', example: "def __bool__(self):\n    return self.value != 0" },
  { name: 'index', trigger: '用于切片索引等需要整数的地方', desc: '返回整数索引。', example: "def __index__(self):\n    return self.value" },
  // 可调用对象与上下文
  { name: 'call', trigger: 'obj()', desc: '使实例可以像函数一样被调用。', example: "def __call__(self, *args):\n    return sum(args)" },
  { name: 'enter', trigger: 'with obj as var', desc: '进入上下文管理器，返回绑定变量。', example: "def __enter__(self):\n    return self" },
  { name: 'exit', trigger: '退出 with 代码块', desc: '释放资源，可处理异常。', example: "def __exit__(self, exc_type, exc_val, tb):\n    self.close()" },
  // 哈希与比较辅助
  { name: 'hash', trigger: 'hash(obj)', desc: '返回对象的哈希值，若定义则对象变为不可变。', example: "def __hash__(self):\n    return hash((self.x, self.y))" },
  // 描述符协议
  { name: 'get', trigger: '描述符属性读取', desc: '实现描述符的获取逻辑。', example: "def __get__(self, obj, type=None):\n    return obj.__dict__.get(self.name)" },
  { name: 'set', trigger: '描述符属性赋值', desc: '实现描述符的设置逻辑。', example: "def __set__(self, obj, val):\n    obj.__dict__[self.name] = val" },
  { name: 'delete', trigger: 'del 描述符属性', desc: '实现描述符的删除逻辑。', example: "def __delete__(self, obj):\n    del obj.__dict__[self.name]" },
  { name: 'set_name', trigger: '描述符被赋值给类属性时', desc: '描述符获得自身在类中的属性名，Python 3.6+。', example: "def __set_name__(self, owner, name):\n    self.private_name = f'_{name}'" },
  // 元类相关
  { name: 'init_subclass', trigger: '子类被定义时调用', desc: '类装饰器替代方案，用于注册子类。', example: "def __init_subclass__(cls, **kwargs):\n    super().__init_subclass__(**kwargs)\n    registry.append(cls)" },
  { name: 'prepare', trigger: '元类中，在类体执行前', desc: '返回类命名空间字典。', example: "@classmethod\ndef __prepare__(metacls, name, bases):\n    return collections.OrderedDict()" },
  { name: 'instancecheck', trigger: 'isinstance(obj, cls)', desc: '自定义 isinstance 行为（元类方法）。', example: "def __instancecheck__(self, inst):\n    return hasattr(inst, '__iter__')" },
  { name: 'subclasscheck', trigger: 'issubclass(sub, cls)', desc: '自定义 issubclass 行为（元类方法）。', example: "def __subclasscheck__(self, sub):\n    return hasattr(sub, 'required_method')" },
  // 其他
  { name: 'await', trigger: 'await obj', desc: '使对象可在 async 函数中被 await，返回生成器迭代器。', example: "def __await__(self):\n    return self._coro().__await__()" },
  { name: 'aenter', trigger: 'async with obj', desc: '异步上下文管理器进入。', example: "async def __aenter__(self):\n    return self" },
  { name: 'aexit', trigger: 'async with 退出', desc: '异步上下文管理器退出。', example: "async def __aexit__(self, *args):\n    await self.close()" },
  { name: 'anext', trigger: 'anext(ait) 或 async for', desc: '异步迭代器的下一个值。', example: "async def __anext__(self):\n    val = await self._get_next(); return val" },
  { name: 'aiter', trigger: 'async for 开始', desc: '返回异步迭代器对象。', example: "def __aiter__(self): return self" }
];
</script>

<style lang="less" scoped>
.magic-methods {
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
    background: linear-gradient(135deg, #1e293b, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  p { color: #475569; margin-top: 0.25rem; }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e4e7ec;
  padding: 0.9rem;
  transition: 0.08s;
  &:hover { border-color: #b9d0f0; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
}

.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  .method {
    font-family: 'Fira Code', monospace;
    font-weight: 700;
    font-size: 0.85rem;
    background: #eef2ff;
    padding: 0.1rem 0.4rem;
    border-radius: 12px;
    color: #1e40af;
  }
  .trigger {
    font-size: 0.65rem;
    background: #f1f5f9;
    padding: 0.1rem 0.5rem;
    border-radius: 16px;
    color: #334155;
  }
}

.desc {
  font-size: 0.75rem;
  color: #334155;
  margin: 0.4rem 0;
  line-height: 1.4;
}

.code-snip {
  background: #1e293b;
  border-radius: 0.6rem;
  padding: 0.4rem;
  margin: 0.3rem 0 0;
  overflow-x: auto;
  font-size: 0.65rem;
  code {
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.7rem;
  color: #5b6e8c;
}

@media (max-width: 720px) {
  .magic-methods { padding: 1rem; }
  .cards-grid { grid-template-columns: 1fr; }
}
</style>