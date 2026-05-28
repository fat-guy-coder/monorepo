<template>
  <div class="type-check-container">
    <header class="hero">
      <h1>🔍 Python 数据类型判断完全指南</h1>
      <p>type · isinstance · issubclass · 鸭子类型 · ABC · 协议检测</p>
    </header>

    <div class="cards-grid">
      <div v-for="method in methods" :key="method.name" class="card">
        <div class="card-header">
          <span class="icon">{{ method.icon }}</span>
          <h3>{{ method.name }}</h3>
          <span class="badge">{{ method.type }}</span>
        </div>
        <div class="usage">
          <span class="label">用法</span>
          <pre><code>{{ method.usage }}</code></pre>
        </div>
        <div class="section">
          <div class="label">底层原理 / 机制</div>
          <p>{{ method.principle }}</p>
        </div>
        <div class="section two-cols">
          <div>
            <div class="label">👍 优点</div>
            <ul>
              <li v-for="a in method.pros" :key="a">{{ a }}</li>
            </ul>
          </div>
          <div>
            <div class="label">👎 缺点</div>
            <ul>
              <li v-for="b in method.cons" :key="b">{{ b }}</li>
            </ul>
          </div>
        </div>
        <div class="section">
          <div class="label">🎯 最佳场景</div>
          <p>{{ method.scene }}</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>💡 核心原则：EAFP (Easier to Ask for Forgiveness than Permission) 优于 LBYL (Look Before You Leap)</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface MethodItem {
  name: string;
  icon: string;
  type: '函数' | '协议' | '设计模式';
  usage: string;
  principle: string;
  pros: string[];
  cons: string[];
  scene: string;
}

const methods: MethodItem[] = [
  {
    name: 'type()',
    icon: '📌',
    type: '函数',
    usage: 'type(obj) is int\n# 或 if type(obj) == str',
    principle: '返回对象的精确类型（即 __class__ 属性）。直接比较类型对象，不考虑继承关系。',
    pros: ['简单直观', '速度最快 (直接比较指针)', '适合精确匹配内置类型'],
    cons: ['对子类返回父类？实际返回真实类，因此无法识别子类', '无法判断是否符合协议 (鸭子类型)', 'Python 中不推荐用于类型分支'],
    scene: '调试、断言需要绝对类型相同的情况 (例如序列化时区分 bytes 与 str)'
  },
  {
    name: 'isinstance()',
    icon: '🎯',
    type: '函数',
    usage: 'isinstance(obj, (int, float))\nisinstance(obj, MyClass)',
    principle: '遍历 MRO (方法解析顺序)，检查 obj 的类或其父类是否与给定类型匹配。',
    pros: ['支持继承关系 (子类实例也返回 True)', '可传入类型元组', '处理抽象基类 (collections.abc) 的鸭子类型', 'Python 官方推荐'],
    cons: ['比 type() 稍慢 (需要遍历 MRO)', '过度使用可能导致设计僵化'],
    scene: '绝大多数类型检查场景，尤其是接受多态参数时 (例如判断是否为序列、可迭代对象)'
  },
  {
    name: 'issubclass()',
    icon: '🧬',
    type: '函数',
    usage: 'issubclass(MyClass, BaseClass)\nissubclass(bool, int)  # True',
    principle: '检查第一个类的 MRO 中是否包含第二个类 (或元组中的任一)。',
    pros: ['用于设计框架中的插件检测', '支持抽象基类注册的虚拟子类 (register)'],
    cons: ['仅对类生效，不适用于实例'],
    scene: '框架注册机制、检查某个类是否符合规范接口 (如是否继承 ABC)'
  },
  {
    name: '鸭子类型 (EAFP)',
    icon: '🦆',
    type: '设计模式',
    usage: 'try:\n    obj.iter()\nexcept AttributeError:\n    ...',
    principle: '“如果它走起来像鸭子，叫起来像鸭子，那它就是鸭子”。不检查类型，直接调用方法，捕获异常。',
    pros: ['最 Pythonic', '高度灵活', '不限制传入类型，只要实现协议即可', '零性能损耗 (正常路径)'],
    cons: ['需要 try/except，对新手不直观', '隐藏真实类型信息，调试稍难', '捕获 AttributeError 可能掩盖其他 bug'],
    scene: '动态协议判断 (例如判断是否可迭代、是否支持 len、是否上下文管理器)'
  },
  {
    name: 'hasattr() + callable()',
    icon: '🔎',
    type: '协议检测',
    usage: 'if hasattr(obj, "__iter__"):\n    ...\nif callable(getattr(obj, "run", None)):',
    principle: '通过反射检查对象是否包含特定属性，并用 callable 判断属性是否为方法。',
    pros: ['无需捕获异常', '可以检查任意属性/方法', '常用于判断可选接口'],
    cons: ['易忽略__特殊方法__', '误判属性存在但不可用', '不如直接调用简洁'],
    scene: '判断对象是否支持某个协议 (例如 hasattr(f, "__call__") 检查可调用)'
  },
  {
    name: 'collections.abc (抽象基类)',
    icon: '📚',
    type: '协议检测',
    usage: 'from collections.abc import Iterable\nisinstance(obj, Iterable)',
    principle: '抽象基类通过 __subclasshook__ 或注册虚拟子类，只需对象实现 __iter__ 就会被识别为 Iterable 实例。',
    pros: ['兼顾鸭子类型与类型提示', '无需手动继承，只要实现协议就能通过检查', '标准库提供丰富基类 (Sequence, Mapping, Sized)'],
    cons: ['需要了解各个 ABC', '性能比 hasattr 稍低 (但可接受)'],
    scene: '判断对象是否符合集合协议 (是否可迭代/可变序列/映射), 适合库开发者'
  },
  {
    name: 'typing 类型标注 + isinstance',
    icon: '✍️',
    type: '类型检查',
    usage: 'from typing import Union, List\nisinstance(obj, (int, str))',
    principle: 'typing 模块提供类型别名，但运行时 isinstance 需要配合原始类型或使用 isinstance(obj, list) (因为 List[int] 运行时不可用)。Python 3.10+ 可用 types.UnionType。',
    pros: ['结合静态检查 (mypy) 与运行时检查', '代码可读性强'],
    cons: ['运行时无法直接检查泛型参数 (如 List[int])', '需要额外工具'],
    scene: '大型项目中同时保证静态类型安全和运行时防御'
  },
  {
    name: 'type() 与 __class__ 比较',
    icon: '⚙️',
    type: '底层',
    usage: 'obj.__class__ is int  # 等价于 type(obj) is int',
    principle: '访问对象的 __class__ 属性，它指向创建该对象的类。',
    pros: ['极快', '可用于元编程 (动态修改类)'],
    cons: ['绕过了实例方法，不推荐一般业务代码'],
    scene: '框架底层、动态类替换、调试钩子'
  },
  {
    name: '自定义类型谓词 (TypeGuard)',
    icon: '🛡️',
    type: '类型收窄',
    usage: 'def is_str_list(val: List[object]) -> TypeGuard[List[str]]:\n    return all(isinstance(x, str) for x in val)',
    principle: 'Python 3.10+ typing.TypeGuard 用于类型收窄，辅助静态类型检查器。',
    pros: ['提升静态分析准确性', '结合 isinstance 使用'],
    cons: ['运行时无特殊效果', '仅改善类型推断'],
    scene: '需要精细类型收窄的库函数，配合 mypy 使用'
  }
];
</script>

<style lang="less" scoped>
.type-check-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.8rem;
  background: #f9fafb;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, #3b82f6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  p {
    color: #475569;
    margin-top: 0.25rem;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.2rem;
}

.card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e4e7ec;
  padding: 1rem 1rem 1.2rem;
  transition: 0.1s;

  &:hover {
    border-color: #b9d0f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  }
}

.card-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.8rem;

  .icon {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: #0f172a;
  }

  .badge {
    font-size: 0.6rem;
    background: #eef2ff;
    padding: 0.1rem 0.5rem;
    border-radius: 20px;
    color: #1e40af;
    font-weight: 500;
  }
}

.usage {
  background: #1e293b;
  border-radius: 0.6rem;
  padding: 0.3rem 0.6rem;
  margin-bottom: 0.8rem;

  pre {
    margin: 0;
    color: #e2e8f0;
    font-size: 0.7rem;
    font-family: 'Fira Code', monospace;
  }
}

.label {
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #3b82f6;
  margin-bottom: 0.2rem;
}

.section {
  margin-top: 0.7rem;
  font-size: 0.75rem;

  p,
  ul {
    margin: 0.2rem 0 0 0;
    color: #334155;
  }

  ul {
    padding-left: 1rem;
    list-style-type: disc;
  }
}

.two-cols {
  display: flex;
  gap: 1rem;

  >div {
    flex: 1;
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.75rem;
  color: #5b6e8c;
}

@media (max-width: 750px) {
  .type-check-container {
    padding: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .two-cols {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
