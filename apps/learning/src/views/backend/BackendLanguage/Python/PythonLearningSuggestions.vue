<template>
  <div class="learning-advice">
    <header class="hero">
      <h1>📘 Python 学习建议·避坑·精进</h1>
      <p>来自实践经验：快速上手 + 牢固内化的系统方法论</p>
    </header>

    <div class="advice-grid">
      <div v-for="(item, idx) in adviceList" :key="idx" class="advice-card">
        <div class="num">{{ idx + 1 }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <div class="tags" v-if="item.tags">
          <span v-for="t in item.tags" :key="t">{{ t }}</span>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>💡 持续编码 + 反思 + 输出 = 真正的精通</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface AdviceItem {
  title: string;
  content: string;
  tags?: string[];
}

const adviceList: AdviceItem[] = [
  {
    title: "先掌握「最小必要」语法，立即上手项目",
    content: "不必通读大部头，先学变量、数据类型、条件循环、函数、列表/字典、文件读写。之后立刻写一个CLI小工具（如批量重命名、日志分析），在实践中巩固。",
    tags: ["20/80法则", "项目驱动"]
  },
  {
    title: "刻意练习「无鼠标编码」与调试技巧",
    content: "熟悉 VSCode/PyCharm 的快捷键、断点调试、pdb、交互式环境。熟练使用 print 调试 + logging，学会用 assert 和异常捕获快速定位问题。",
    tags: ["调试", "效率"]
  },
  {
    title: "建立「前端→Python」类比本",
    content: "将 JS 概念与 Python 一一映射（如 Promise ↔ asyncio，箭头函数 ↔ lambda，对象字面量 ↔ dict，数组 ↔ list），刻意对比差异。推荐维护一个 Markdown 对比表。",
    tags: ["类比学习", "迁移"]
  },
  {
    title: "每天写 20 行代码，坚持 30 天",
    content: "哪怕只是解决一个小问题、实现一个算法（斐波那契、素数筛、二叉树遍历）。碎片化节奏比突击更有效，保持手感。",
    tags: ["习惯", "肌肉记忆"]
  },
  {
    title: "深入理解「缩进即作用域」",
    content: "忘掉花括号，强制用缩进。注意 if/for/while/def/class 后面必须跟冒号和缩进块。用 black 自动格式化，杜绝风格争议。",
    tags: ["语法核心", "避坑"]
  },
  {
    title: "熟练使用「类型注解 + mypy」",
    content: "TypeScript 开发者的优势：写 def foo(x: int) -> str:，然后用 mypy 做静态检查。在大型项目或库中极大减少运行时错误。",
    tags: ["类型系统", "工程化"]
  },
  {
    title: "一周学会「列表推导式、生成器、字典合并」",
    content: "Python 独有的简洁：`[x*2 for x in range(10) if x%2]`，`(x*2 for x in huge)` 生成器节省内存，`{**a, **b}` 合并字典。这些是 Pythonic 的标志。",
    tags: ["语法糖", "高效"]
  },
  {
    title: "掌握「虚拟环境 + pip-tools / poetry」",
    content: "永远不要全局安装包。为每个项目创建 venv，使用 `pip freeze > requirements.txt`，进阶用 poetry 管理依赖和锁版本。",
    tags: ["工程化", "依赖管理"]
  },
  {
    title: "攻克「面向对象」设计模式",
    content: "练习写一个简单的游戏角色系统（继承、多态）、一个插件式架构（抽象基类+注册）、一个数据验证器（描述符）。理解 @property、__slots__、dataclass 的使用场景。",
    tags: ["OOP", "设计模式"]
  },
  {
    title: "异步编程：从协程到实战",
    content: "学习 async/await，用 asyncio 写并发爬虫或 WebSocket 客户端。注意：异步不能混合阻塞代码，使用 asyncio.to_thread 逃逸。对比 JS 的事件循环差异。",
    tags: ["异步", "高性能"]
  },
  {
    title: "阅读优秀源码",
    content: "Flask 源码（轻量）、requests 源码（优雅）、pydantic 或 attrs（数据类）。关注它们的命名、装饰器应用、异常设计、类型注解。",
    tags: ["源码阅读", "提升眼界"]
  },
  {
    title: "常备「Python 最佳实践」手册",
    content: "学习 PEP8 命名规范，使用 pylint/ruff 做 lint。写 doctest 和 pytest 单元测试。理解「鸭子类型」和「EAFP 优于 LBYL」。",
    tags: ["规范", "测试"]
  },
  {
    title: "避开常见「陷阱」",
    content: "1) 默认参数可变对象陷阱；2) 循环中修改列表；3) 浅拷贝 vs 深拷贝；4) GIL 限制多线程 CPU 密集型任务；5) 浮点数相等比较；6) 类属性与实例属性混淆。",
    tags: ["避坑", "经验"]
  },
  {
    title: "每周完成一个 LeetCode 中等题（Python）",
    content: "不仅能巩固语法，还能锻炼算法思维，且看到 Python 的简洁性。同时也能让你更熟悉内置函数如 zip、map、filter、itertools 等。",
    tags: ["算法", "刷题"]
  },
  {
    title: "输出倒逼输入：写技术文章或录视频",
    content: "把你学到的「装饰器」、「上下文管理器」、「元类」用通俗语言讲给别人听。教会别人才是真正的理解。",
    tags: ["费曼学习法", "分享"]
  },
  {
    title: "不要跳过「底层模型」",
    content: "理解 Python 对象模型：可变与不可变、引用传递、垃圾回收（引用计数+分代回收）、小整数池、字符串驻留。这些知识能帮你避开很多隐蔽 bug。",
    tags: ["原理", "进阶"]
  },
  {
    title: "参与开源或维护一个自己的工具库",
    content: "把自己常用的脚本整理成包，发布到 PyPI（测试版即可）。经历文档、打包、CI、版本管理完整流程。",
    tags: ["实战", "生态"]
  },
  {
    title: "坚持『每日 Python 技巧』",
    content: "订阅 Real Python、PyCoder's Weekly，或每天学习一个标准库模块（collections, itertools, functools, pathlib 等）。积少成多。",
    tags: ["持续学习", "标准库"]
  }
];
</script>

<style lang="less" scoped>
.learning-advice {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fafcff;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 2.5rem;

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
    font-size: 0.95rem;
  }
}

.advice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.2rem;
}

.advice-card {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.2rem;
  border: 1px solid #e4e7ec;
  transition: all 0.15s;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.03);
    border-color: #b9d0f0;
  }

  .num {
    position: absolute;
    top: 0.5rem;
    right: 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #cbd5e1;
    font-family: monospace;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.4rem 0;
    color: #0f172a;
    padding-right: 1.5rem;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.45;
    color: #334155;
    margin: 0 0 0.5rem 0;
  }

  .tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;

    span {
      background: #eef2ff;
      color: #1e40af;
      font-size: 0.6rem;
      padding: 0.15rem 0.5rem;
      border-radius: 20px;
      font-weight: 500;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.8rem;
}

@media (max-width: 700px) {
  .learning-advice {
    padding: 1rem;
  }

  .advice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
