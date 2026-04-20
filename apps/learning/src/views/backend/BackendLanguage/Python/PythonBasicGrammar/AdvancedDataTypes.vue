<template>
  <div class="advanced-types-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>高级数据类型</h1>
        </div>
        <p class="subtitle">容器类型 · 方法详解 · 场景应用</p>
        <div class="divider"></div>
        <p class="intro-text">
          Python 提供了强大的内置容器类型：列表、元组、字典、集合。
          理解它们的特性、常用方法及适用场景，是编写高效 Python 代码的关键。
        </p>
      </div>
    </header>

    <!-- 数据类型对比概览 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📊</span>
        <h2>容器类型速览</h2>
      </div>
      <div class="overview-table-wrapper">
        <table class="overview-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>可变性</th>
              <th>有序性</th>
              <th>元素重复</th>
              <th>符号表示</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in overviewData" :key="item.type">
              <td><strong>{{ item.type }}</strong></td>
              <td>{{ item.mutable }}</td>
              <td>{{ item.ordered }}</td>
              <td>{{ item.duplicates }}</td>
              <td><code>{{ item.syntax }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 每个数据类型的详细卡片 -->
    <div class="types-detail-grid">
      <section
        v-for="type in advancedTypes"
        :key="type.name"
        class="type-detail-card"
      >
        <div class="card-header">
          <span class="type-icon">{{ type.icon }}</span>
          <h2>{{ type.name }}</h2>
          <span class="mutable-badge" :class="{ mutable: type.mutable }">
            {{ type.mutable ? '可变' : '不可变' }}
          </span>
        </div>
        <p class="type-desc">{{ type.description }}</p>

        <!-- 常用方法表格 -->
        <div class="methods-section">
          <h4>📋 常用方法</h4>
          <table class="methods-table">
            <thead>
              <tr>
                <th>方法</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="method in type.methods" :key="method.name">
                <td><code>{{ method.name }}</code></td>
                <td>{{ method.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 使用场景 -->
        <div class="usecase-section">
          <h4>🎯 典型使用场景</h4>
          <ul class="usecase-list">
            <li v-for="scene in type.useCases" :key="scene">{{ scene }}</li>
          </ul>
        </div>

        <!-- 简短示例代码 -->
        <div class="example-section">
          <h4>💻 示例</h4>
          <pre class="code-block"><code>{{ type.example }}</code></pre>
        </div>
      </section>
    </div>

    <!-- 类型转换专区 -->
    <section class="section-card conversion-section">
      <div class="section-header">
        <span class="section-icon">🔄</span>
        <h2>容器类型转换</h2>
      </div>
      <p class="section-sub">使用内置函数在容器类型之间进行转换。</p>
      <div class="conversion-grid">
        <div v-for="conv in conversions" :key="conv.from + conv.to" class="conversion-item">
          <div class="conv-direction">
            <span class="from-type">{{ conv.from }}</span>
            <span class="arrow">→</span>
            <span class="to-type">{{ conv.to }}</span>
          </div>
          <code class="conv-code">{{ conv.code }}</code>
          <p class="conv-note">{{ conv.note }}</p>
        </div>
      </div>
    </section>

    <!-- 底部提示 -->
    <footer class="guide-footer">
      <p>⚡ 选择合适的容器类型，能让代码更简洁、高效。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 概览数据
interface OverviewItem {
  type: string;
  mutable: string;
  ordered: string;
  duplicates: string;
  syntax: string;
}

const overviewData: OverviewItem[] = [
  { type: '列表 (list)', mutable: '是', ordered: '是', duplicates: '允许', syntax: '[1, 2, 3]' },
  { type: '元组 (tuple)', mutable: '否', ordered: '是', duplicates: '允许', syntax: '(1, 2, 3)' },
  { type: '字典 (dict)', mutable: '是', ordered: '是 (3.7+)', duplicates: '键唯一，值可重复', syntax: "{'a':1, 'b':2}" },
  { type: '集合 (set)', mutable: '是', ordered: '否', duplicates: '不允许', syntax: '{1, 2, 3}' },
  { type: '冻结集合 (frozenset)', mutable: '否', ordered: '否', duplicates: '不允许', syntax: 'frozenset([1,2,3])' },
];

// 方法条目
interface MethodItem {
  name: string;
  desc: string;
}

// 高级类型详细数据
interface AdvancedType {
  name: string;
  icon: string;
  mutable: boolean;
  description: string;
  methods: MethodItem[];
  useCases: string[];
  example: string;
}

const advancedTypes: AdvancedType[] = [
  {
    name: '列表 (list)',
    icon: '📋',
    mutable: true,
    description: '有序的可变序列，元素可重复。是最常用的容器之一，支持索引、切片与丰富的修改操作。',
    methods: [
      { name: 'append(x)', desc: '在末尾添加元素 x' },
      { name: 'extend(iter)', desc: '扩展列表，添加可迭代对象中的所有元素' },
      { name: 'insert(i, x)', desc: '在索引 i 处插入元素 x' },
      { name: 'remove(x)', desc: '删除第一个值为 x 的元素' },
      { name: 'pop([i])', desc: '移除并返回索引 i 处的元素，默认最后一个' },
      { name: 'index(x)', desc: '返回第一个值为 x 的索引' },
      { name: 'count(x)', desc: '返回 x 在列表中出现的次数' },
      { name: 'sort()', desc: '原地排序列表' },
      { name: 'reverse()', desc: '原地反转列表' },
      { name: 'copy()', desc: '返回列表的浅拷贝' },
    ],
    useCases: [
      '存储有序的同类或异类数据集合',
      '需要频繁增删改查的场景',
      '作为栈 (append/pop) 或队列 (结合 collections.deque)',
      '保存临时数据、处理循环结果'
    ],
    example: `fruits = ['apple', 'banana']
fruits.append('cherry')
fruits.insert(1, 'orange')
print(fruits)  # ['apple', 'orange', 'banana', 'cherry']`
  },
  {
    name: '元组 (tuple)',
    icon: '🔗',
    mutable: false,
    description: '有序的不可变序列，一旦创建就不能修改。由于不可变性，可作为字典的键或集合的元素。',
    methods: [
      { name: 'count(x)', desc: '返回 x 在元组中出现的次数' },
      { name: 'index(x)', desc: '返回第一个值为 x 的索引' },
    ],
    useCases: [
      '函数返回多个值时自动打包为元组',
      '作为字典的键（不可变要求）',
      '存储不希望被修改的常量数据',
      '解包赋值 (a, b = (1, 2))'
    ],
    example: `point = (10, 20)
x, y = point   # 解包
print(point.count(10))  # 1`
  },
  {
    name: '字典 (dict)',
    icon: '📖',
    mutable: true,
    description: '键值对映射集合，键必须为不可变类型，通过键快速访问值。Python 3.7+ 保留插入顺序。',
    methods: [
      { name: 'get(key[, default])', desc: '返回键对应的值，不存在则返回默认值' },
      { name: 'keys()', desc: '返回字典所有键的视图' },
      { name: 'values()', desc: '返回字典所有值的视图' },
      { name: 'items()', desc: '返回键值对视图' },
      { name: 'update([other])', desc: '用另一个字典的键值对更新当前字典' },
      { name: 'pop(key[, default])', desc: '删除键并返回其值' },
      { name: 'popitem()', desc: '删除并返回最后插入的键值对 (LIFO)' },
      { name: 'setdefault(key[, default])', desc: '若键不存在则设置默认值并返回' },
    ],
    useCases: [
      '快速查找、映射关系（如用户信息、配置项）',
      '统计频次（键为元素，值为计数）',
      '缓存/记忆化 (memoization)',
      'JSON 数据的 Python 表示'
    ],
    example: `user = {'name': 'Alice', 'age': 30}
user['email'] = 'alice@example.com'
print(user.get('phone', 'N/A'))  # N/A`
  },
  {
    name: '集合 (set)',
    icon: '🧮',
    mutable: true,
    description: '无序、可变的元素集合，元素唯一且必须为不可变类型。支持数学集合运算（交、并、差、对称差）。',
    methods: [
      { name: 'add(x)', desc: '添加元素 x' },
      { name: 'remove(x)', desc: '移除元素 x，不存在则报错' },
      { name: 'discard(x)', desc: '移除元素 x，不存在不报错' },
      { name: 'pop()', desc: '随机移除并返回一个元素' },
      { name: 'union(*others)', desc: '返回并集 (也可用 | )' },
      { name: 'intersection(*others)', desc: '返回交集 (也可用 & )' },
      { name: 'difference(*others)', desc: '返回差集 (也可用 - )' },
      { name: 'symmetric_difference(other)', desc: '返回对称差集 (也可用 ^ )' },
      { name: 'issubset(other)', desc: '判断是否为子集' },
      { name: 'issuperset(other)', desc: '判断是否为超集' },
    ],
    useCases: [
      '去重：快速去除列表中的重复元素',
      '成员关系测试 (比列表更高效)',
      '数学集合运算（共同好友、标签交集等）',
      '排除特定项 (差集)'
    ],
    example: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b)   # {3, 4}
print(a - b)   # {1, 2}`
  },
  {
    name: '冻结集合 (frozenset)',
    icon: '❄️',
    mutable: false,
    description: '不可变的集合，一旦创建不能修改。由于不可变，可以作为字典的键或其他集合的元素。',
    methods: [
      { name: 'copy()', desc: '返回自身的浅拷贝（本身不可变，意义不大）' },
      { name: 'union(*others)', desc: '返回并集' },
      { name: 'intersection(*others)', desc: '返回交集' },
      { name: 'difference(*others)', desc: '返回差集' },
      { name: 'symmetric_difference(other)', desc: '返回对称差集' },
      { name: 'issubset(other)', desc: '判断是否为子集' },
      { name: 'issuperset(other)', desc: '判断是否为超集' },
    ],
    useCases: [
      '需要不可变集合的场景（如多线程环境中的常量集）',
      '作为字典的键（例如缓存键为 frozenset）',
      '作为另一个集合的元素'
    ],
    example: `fs = frozenset([1, 2, 3])
# fs.add(4)  # 报错！不可变
print(fs & {2, 3, 4})  # frozenset({2, 3})`
  }
];

// 类型转换数据
interface ConversionItem {
  from: string;
  to: string;
  code: string;
  note: string;
}

const conversions: ConversionItem[] = [
  { from: 'list', to: 'tuple', code: 'tuple([1,2,3])', note: '返回元组' },
  { from: 'tuple', to: 'list', code: 'list((1,2,3))', note: '返回列表' },
  { from: 'list', to: 'set', code: 'set([1,2,2,3])', note: '去重，返回集合 {1,2,3}' },
  { from: 'set', to: 'list', code: 'list({1,2,3})', note: '返回列表，顺序不定' },
  { from: 'list of tuples', to: 'dict', code: 'dict([("a",1), ("b",2)])', note: '键值对序列转字典' },
  { from: 'dict keys/values', to: 'list', code: 'list(d.keys())', note: '返回键的列表' },
  { from: 'string', to: 'list', code: 'list("abc")', note: "返回 ['a','b','c']" },
  { from: 'set', to: 'frozenset', code: 'frozenset({1,2,3})', note: '返回不可变集合' },
];
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
@shadow-sm: 0 6px 14px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02);
@shadow-hover: 0 12px 24px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* { margin: 0; padding: 0; box-sizing: border-box; }

.advanced-types-guide {
  max-width: 1400px;
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
    .subtitle { font-size: 1.3rem; font-weight: 500; color: @primary-blue; margin-bottom: 1rem; }
    .divider { width: 60px; height: 4px; background: @primary-yellow; border-radius: 4px; margin: 1.2rem 0 1.5rem; }
    .intro-text { font-size: 1.1rem; line-height: 1.6; color: @text-soft; max-width: 85%; }
  }
}

// ----- 通用卡片样式 -----
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
  }
}

// ----- 概览表格 -----
.overview-table-wrapper {
  overflow-x: auto;
  .overview-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    th, td {
      padding: 0.9rem 1.2rem;
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
}

// ----- 类型详细卡片网格 -----
.types-detail-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.type-detail-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;
  &:hover { box-shadow: @shadow-hover; }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    .type-icon { font-size: 2.2rem; }
    h2 { font-size: 1.8rem; font-weight: 650; color: @text-dark; }
    .mutable-badge {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      background: #f1f5f9;
      color: @text-soft;
      &.mutable {
        background: #e6f7e6;
        color: #2e7d32;
      }
    }
  }

  .type-desc {
    font-size: 1rem;
    line-height: 1.6;
    color: @text-soft;
    margin-bottom: 1.8rem;
  }

  .methods-section, .usecase-section, .example-section {
    margin-bottom: 1.8rem;
    h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: @text-dark;
    }
  }

  .methods-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    th, td {
      padding: 0.6rem 0.8rem;
      text-align: left;
      border-bottom: 1px solid @border-light;
    }
    th {
      font-weight: 600;
      color: @primary-blue;
    }
    td:first-child {
      font-family: 'JetBrains Mono', monospace;
      color: #0f5c3e;
    }
  }

  .usecase-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    li {
      padding: 0.3rem 0;
      color: @text-soft;
      display: flex;
      align-items: baseline;
      &::before {
        content: "▹";
        color: @primary-blue;
        margin-right: 8px;
        font-weight: bold;
      }
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
    code { background: transparent; }
  }
}

// ----- 转换区域 -----
.conversion-section {
  .section-sub {
    margin-bottom: 1.8rem;
    color: @text-soft;
  }
  .conversion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
  }
  .conversion-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem;
    border: 1px solid @border-light;
    .conv-direction {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.6rem;
      .from-type, .to-type {
        font-weight: 600;
        color: @text-dark;
      }
      .arrow {
        color: @primary-blue;
        font-weight: bold;
      }
    }
    .conv-code {
      display: block;
      background: @code-bg;
      color: #facc15;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-family: monospace;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    .conv-note {
      font-size: 0.85rem;
      color: @text-light;
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
  }
}

// ----- 响应式 -----
@media (max-width: 768px) {
  .advanced-types-guide { padding: 1.2rem 1rem; gap: 1.5rem; }
  .guide-header { padding: 1.8rem 1.5rem; .header-content .title-row h1 { font-size: 2.2rem; } }
  .type-detail-card { padding: 1.5rem 1.2rem; }
  .usecase-list { grid-template-columns: 1fr !important; }
  .conversion-grid { grid-template-columns: 1fr; }
}
</style>