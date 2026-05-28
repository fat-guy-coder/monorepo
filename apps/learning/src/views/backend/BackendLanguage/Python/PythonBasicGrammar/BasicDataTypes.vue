<template>
  <div class="datatypes-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>基本数据类型</h1>
        </div>
        <p class="subtitle">Python 中的数据基石 · 类型与转换</p>
        <div class="divider"></div>
        <p class="intro-text">
          Python 中一切皆对象。理解核心数据类型及其特性，是高效编程的第一步。
          本节涵盖不可变的基本类型、可变集合类型以及常用的类型转换方法。
        </p>
      </div>
    </header>

    <!-- 基本类型：数字、字符串、布尔/None -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔢</span>
        <h2>核心基本类型</h2>
        <span class="badge">不可变</span>
      </div>
      <div class="basic-types-grid">
        <div v-for="type in basicTypes" :key="type.name" class="type-card">
          <div class="type-icon">{{ type.icon }}</div>
          <h3>{{ type.name }}</h3>
          <p class="type-desc">{{ type.description }}</p>
          <pre class="type-example"><code>{{ type.example }}</code></pre>
          <div class="type-note" v-if="type.note">{{ type.note }}</div>
        </div>
      </div>
    </section>

    <!-- 集合类型概览 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📚</span>
        <h2>集合数据类型</h2>
      </div>
      <div class="collection-table-wrapper">
        <table class="collection-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>可变性</th>
              <th>有序性</th>
              <th>元素唯一</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="col in collectionTypes" :key="col.name">
              <td><strong>{{ col.name }}</strong></td>
              <td>{{ col.mutable }}</td>
              <td>{{ col.ordered }}</td>
              <td>{{ col.unique }}</td>
              <td><code>{{ col.example }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="collection-detail">
        <div v-for="col in collectionTypes" :key="col.name" class="col-item">
          <h4>{{ col.name }} <span class="mutable-tag" :class="{ mutable: col.mutable === '是' }">{{ col.mutable === '是' ? '可变' : '不可变' }}</span></h4>
          <p>{{ col.detail }}</p>
        </div>
      </div>
    </section>

    <!-- 类型转换专区 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔄</span>
        <h2>数据类型转换</h2>
      </div>
      <p class="section-sub">Python 提供了内置函数在不同类型间进行转换。以下为常用转换函数及示例。</p>
      <div class="conversion-grid">
        <div v-for="conv in conversionFuncs" :key="conv.func" class="conversion-card">
          <div class="conv-header">
            <code class="conv-func">{{ conv.func }}</code>
            <span class="conv-arrow">→</span>
            <span class="conv-target">{{ conv.target }}</span>
          </div>
          <p class="conv-desc">{{ conv.description }}</p>
          <pre class="conv-example"><code>{{ conv.example }}</code></pre>
        </div>
      </div>
      <div class="conversion-note">
        <p>💡 注意：转换可能失败（如 <code>int('abc')</code>），需确保内容合法。布尔转换中，空值、0、空容器视为 <code>False</code>，其余为 <code>True</code>。</p>
      </div>
    </section>

    <!-- 底部提示 -->
    <footer class="guide-footer">
      <p>🧪 尝试在交互环境中使用 <code>type()</code> 查看类型，<code>isinstance()</code> 进行类型检查。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 基本类型数据
interface BasicType {
  name: string;
  icon: string;
  description: string;
  example: string;
  note?: string;
}

const basicTypes: BasicType[] = [
  {
    name: '整数 (int)',
    icon: '🔹',
    description: '任意精度的整数，支持二进制、八进制、十六进制表示。',
    example: `# 创建方式\nage = 25\nhex_num = 0xFF        # 255\noct_num = 0o77       # 63\nbin_num = 0b1010     # 10\nbig = 10**100        # 10的100次方\n\n# 常用方法\n(255).bit_length()     # 8 二进制位数\n(-5).abs()             # 5 绝对值\n(10).bit_count()       # 2 二进制中1的个数\n(255).to_bytes(2, 'big')   # b'\\x01\\xff'\nint.from_bytes(b'\\xff', 'big')  # 255\n(3).numerator           # 3\n(3).denominator        # 1\nformat(42, '08b')      # '00101010' 格式化二进制`,
    note: 'Python 3 中整数无上限'
  },
  {
    name: '浮点数 (float)',
    icon: '🔸',
    description: '双精度浮点数，遵循 IEEE 754 标准。',
    example: `# 创建方式\npi = 3.14159\nsci = 1.2e-5          # 0.000012\ninf_val = float('inf') # 正无穷\nnan_val = float('nan') # NaN\n\n# 常用方法\n(3.14).as_integer_ratio()  # (157, 50) 转分数\n(2.5).is_integer()         # False 是否整数\n(-3.14).is_integer()       # False\n(3.14).hex()               # '0x1.91eb851eb852p+1'\nfloat.fromhex('0x1.92p+1') # 3.140625\n(10.5).imag                # 0.0\n(10.5).real                # 10.5\nformat(3.14159, '.2f')     # '3.14' 格式化`,
    note: '可能存在精度误差'
  },
  {
    name: '复数 (complex)',
    icon: '🔹🔸',
    description: '实部 + 虚部，虚部用 j 或 J 表示。',
    example: `# 创建方式\nc = 3 + 4j\nc2 = complex(3, 4)    # 3+4j\nc3 = 5j               # 0+5j\n\n# 常用属性\nc.real          # 3.0 实部\nc.imag          # 4.0 虚部\nc.conjugate()   # 3-4j 共轭复数\nabs(c)          # 5.0 模长\n\n# 运算\nc + (1+2j)      # (4+6j)\nc * 2           # (6+8j)\nc ** 2          # (-7+24j)`,
    note: '科学计算常用'
  },
  {
    name: '字符串 (str)',
    icon: '📝',
    description: 'Unicode 字符序列，单引号或双引号定义。',
    example: `# 创建方式\ns1 = "hello"\ns2 = 'world'\ns3 = """多行\\n文本"""\ns4 = "Python"\n\n# 大小写转换\ns4.upper()           # 'PYTHON'\ns4.lower()           # 'python'\ns4.capitalize()     # 'Python'\ns4.title()           # 'Python'\ns4.swapcase()       # 'python'\n\n# 查找替换\ns4.find("th")        # 2 返回索引\ns4.count("o")        # 1 计数\ns4.replace("Py", "Py") # 'Python'\n\n# 分割合并\n"a,b,c".split(",")   # ['a','b','c']\n",".join(['a','b'])  # 'a,b'\n\n# 去除空白\n"  hi  ".strip()     # 'hi'\n"  hi  ".lstrip()    # 'hi  '\n"  hi  ".rstrip()    # '  hi'\n\n# 格式化和编码\ns4.encode()          # b'Python'\n"{} {}".format("Hi", 123)  # 'Hi 123'\ns4.startswith("Py") # True\ns4.endswith("on")    # True\ns4.isdigit()         # False\ns4.isalpha()         # True\ns4.center(10, '*')   # '**Python**'`,
    note: '不可变序列'
  },
  {
    name: '布尔 (bool)',
    icon: '✅',
    description: 'True 或 False，继承自 int (True==1, False==0)。',
    example: `# 创建方式\nflag = True\nflag2 = bool(1)       # True\nflag3 = bool("")      # False\n\n# 常用方法\nTrue.to_bytes(1, 'big')     # b'\\x01'\nFalse.to_bytes(1, 'big')    # b'\\x00'\nbool.from_bytes(b'\\x01')   # True\n\n# 与 int 的关系\nTrue + 1          # 2\nFalse + 1          # 1\nbool(0), bool([]), bool(()), bool({})  # 均为 False\n\n# 特殊用法\nis_valid = bool(10)   # True\nis_empty = not []     # True\nresult = "yes" if True else "no"  # 'yes'`,
    note: '用于条件判断'
  },
  {
    name: '空值 (None)',
    icon: '⭕',
    description: '表示空或无值，是 NoneType 的唯一实例。',
    example: `# 创建方式\nresult = None\nx = None\n\n# 判断方法（首选 is）\nresult is None           # True\nresult is not None       # False\n\n# 与其他空值区分\nbool(None)              # False\nNone == 0               # False\nNone == ""              # False\nNone == False           # False\n\n# 常用场景\ndef func(x=None):       # 默认参数\n    if x is None:\n        x = []\n\nd = {"a": 1, "b": 2}.get("c")  # None 键不存在时\n\n# 类型信息\ntype(None)              # <class 'NoneType'>\ntype(None).__repr__()   # 'NoneType'`,
    note: '常用于默认参数'
  }
];

// 集合类型数据
interface CollectionType {
  name: string;
  mutable: string;
  ordered: string;
  unique: string;
  example: string;
  detail: string;
}

const collectionTypes: CollectionType[] = [
  {
    name: '列表 (list)',
    mutable: '是',
    ordered: '是',
    unique: '否',
    example: '[1, 2, 3]',
    detail: '可变有序序列，元素可重复，支持索引、切片、增删改操作。'
  },
  {
    name: '元组 (tuple)',
    mutable: '否',
    ordered: '是',
    unique: '否',
    example: '(1, 2, 3)',
    detail: '不可变有序序列，一旦创建不能修改，常用于固定数据、函数多返回值。'
  },
  {
    name: '字典 (dict)',
    mutable: '是',
    ordered: '是 (3.7+)',
    unique: '键唯一',
    example: "{'a': 1, 'b': 2}",
    detail: '键值对映射，键必须为不可变类型，通过键快速访问值。'
  },
  {
    name: '集合 (set)',
    mutable: '是',
    ordered: '否',
    unique: '是',
    example: '{1, 2, 3}',
    detail: '无序、可变、元素唯一，支持集合运算（交、并、差）。'
  },
  {
    name: '冻结集合 (frozenset)',
    mutable: '否',
    ordered: '否',
    unique: '是',
    example: 'frozenset([1,2,3])',
    detail: '不可变版本的集合，可作为字典的键。'
  }
];

// 类型转换函数
interface ConversionFunc {
  func: string;
  target: string;
  description: string;
  example: string;
}

const conversionFuncs: ConversionFunc[] = [
  {
    func: 'int(x)',
    target: '整数',
    description: '将字符串或数字转为整数，可指定进制。',
    example: 'int("42")      # 42\nint(3.9)      # 3\nint("1f", 16) # 31'
  },
  {
    func: 'float(x)',
    target: '浮点数',
    description: '将字符串或整数转为浮点数。',
    example: 'float("3.14")  # 3.14\nfloat(10)     # 10.0'
  },
  {
    func: 'str(x)',
    target: '字符串',
    description: '将任意对象转为字符串表示。',
    example: 'str(100)       # "100"\nstr([1,2])    # "[1, 2]"'
  },
  {
    func: 'bool(x)',
    target: '布尔值',
    description: '根据真值测试返回 True 或 False。',
    example: 'bool(0)        # False\nbool("hello") # True\nbool([])      # False'
  },
  {
    func: 'list(iterable)',
    target: '列表',
    description: '将可迭代对象转换为列表。',
    example: 'list("abc")    # ["a","b","c"]\nlist((1,2))   # [1,2]'
  },
  {
    func: 'tuple(iterable)',
    target: '元组',
    description: '将可迭代对象转换为元组。',
    example: 'tuple([1,2,3]) # (1,2,3)'
  },
  {
    func: 'set(iterable)',
    target: '集合',
    description: '将可迭代对象转换为集合（去重）。',
    example: 'set([1,2,2,3]) # {1,2,3}'
  },
  {
    func: 'dict(mapping)',
    target: '字典',
    description: '从键值对序列创建字典。',
    example: 'dict([("a",1)]) # {"a":1}\ndict(a=1,b=2) # 关键字参数'
  }
];
</script>

<style lang="less" scoped>
// ========== 变量定义 ==========
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
@shadow-sm: 0 6px 14px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02);
@shadow-hover: 0 12px 24px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* { margin:0; padding:0; box-sizing:border-box; }

.datatypes-guide {
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
      .python-icon { font-size: 3.2rem; }
      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
    .subtitle { font-size: 1.3rem; font-weight: 500; color: @primary-blue; margin-bottom:1rem; }
    .divider { width:60px; height:4px; background: @primary-yellow; border-radius:4px; margin:1.2rem 0 1.5rem; }
    .intro-text { font-size:1.1rem; line-height:1.6; color: @text-soft; max-width:85%; }
  }
}

// ----- 通用区块卡片 -----
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;
  &:hover { box-shadow: @shadow-hover; }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.8rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;
    .section-icon { font-size: 2rem; }
    h2 { font-size: 1.8rem; font-weight: 650; color: @text-dark; }
    .badge {
      margin-left: auto;
      background: #ecf3fa;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
      color: @primary-blue;
    }
  }
}

// ----- 基本类型网格 -----
.basic-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  .type-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.5rem 1.5rem;
    border: 1px solid @border-light;
    transition: @transition;
    &:hover { border-color: #bdd3e8; }

    .type-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    h3 { font-size: 1.4rem; font-weight: 650; margin-bottom: 0.5rem; color: @text-dark; }
    .type-desc { font-size: 0.95rem; color: @text-soft; margin-bottom: 1rem; line-height:1.5; }
    .type-example {
      background: @code-bg;
      color: @code-text;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      margin-bottom: 0.8rem;
      code { background: transparent; }
    }
    .type-note {
      font-size: 0.9rem;
      color: @text-light;
      background: #f1f5f9;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      display: inline-block;
    }
  }
}

// ----- 集合类型表格及详情 -----
.collection-table-wrapper {
  overflow-x: auto;
  margin-bottom: 2rem;
}
.collection-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td {
    padding: 0.9rem 1rem;
    text-align: left;
    border-bottom: 1px solid @border-light;
  }
  th {
    font-weight: 600;
    color: @primary-blue;
    background: #f9fbfd;
  }
  td code {
    background: #ecfdf3;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    color: #0f5c3e;
  }
}
.collection-detail {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  gap: 1.2rem;
  .col-item {
    h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      .mutable-tag {
        font-size: 0.7rem;
        background: #f1f5f9;
        padding: 0.2rem 0.6rem;
        border-radius: 30px;
        &.mutable { background: #fee2e2; color:#b91c1c; }
      }
    }
    p { color: @text-soft; font-size:0.9rem; line-height:1.5; }
  }
}

// ----- 类型转换网格 -----
.section-sub {
  margin-bottom: 1.8rem;
  color: @text-soft;
}
.conversion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .conversion-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.4rem;
    border: 1px solid @border-light;
    .conv-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 0.8rem;
      .conv-func {
        background: #1e293b;
        color: #facc15;
        padding: 0.2rem 0.7rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .conv-arrow { color: @primary-blue; font-weight: bold; }
      .conv-target { font-weight: 600; color: @text-dark; }
    }
    .conv-desc { font-size: 0.9rem; color: @text-soft; margin-bottom: 0.8rem; }
    .conv-example {
      background: @code-bg;
      color: @code-text;
      padding: 0.7rem 1rem;
      border-radius: 10px;
      font-family: monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      code { background: transparent; }
    }
  }
}
.conversion-note {
  background: #fefce8;
  border-left: 4px solid @primary-yellow;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  p { color: #6b5e00; code { background: #fef3c7; padding:0.2rem 0.4rem; border-radius:6px; } }
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
    code { background: #eef2ff; padding:0.2rem 0.4rem; border-radius:6px; }
  }
}

// ----- 响应式 -----
@media (max-width: 768px) {
  .datatypes-guide { padding: 1.2rem 1rem; gap:1.5rem; }
  .guide-header { padding: 1.8rem 1.5rem; .header-content .title-row h1 { font-size: 2.2rem; } }
  .basic-types-grid { grid-template-columns: 1fr; }
  .collection-detail { grid-template-columns: 1fr; }
  .conversion-grid { grid-template-columns: 1fr; }
  .section-card { padding: 1.5rem 1.2rem; }
}
</style>