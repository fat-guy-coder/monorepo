<template>
  <div class="python-js-compare">
    <!-- 头部 -->
    <header class="compare-header">
      <div class="header-content">
        <div class="title-row">
          <span class="icon python">🐍</span>
          <h1>Python <span class="vs">vs</span> JavaScript</h1>
          <span class="icon js">🟨</span>
        </div>
        <p class="subtitle">两大主流解释型语言的深度对比</p>
        <div class="divider"></div>
        <p class="intro-text">
          Python 和 JavaScript 都是当今最流行的编程语言，广泛应用于 Web、数据科学、自动化等领域。
          它们在设计哲学、运行环境、类型系统和生态上既有相似之处，也存在显著差异。
        </p>
      </div>
    </header>

    <!-- 快速概览卡片 -->
    <div class="overview-grid">
      <div class="overview-card python-card">
        <div class="card-header">
          <span>🐍</span>
          <h2>Python</h2>
        </div>
        <ul>
          <li><strong>诞生：</strong>1991 年，Guido van Rossum</li>
          <li><strong>类型：</strong>解释型、动态类型、强类型</li>
          <li><strong>范式：</strong>面向对象、函数式、过程式</li>
          <li><strong>运行环境：</strong>CPython 解释器（跨平台）</li>
          <li><strong>主要用途：</strong>数据科学、AI、后端、自动化</li>
        </ul>
      </div>
      <div class="overview-card js-card">
        <div class="card-header">
          <span>🟨</span>
          <h2>JavaScript</h2>
        </div>
        <ul>
          <li><strong>诞生：</strong>1995 年，Brendan Eich</li>
          <li><strong>类型：</strong>解释型/JIT、动态类型、弱类型</li>
          <li><strong>范式：</strong>原型面向对象、函数式、事件驱动</li>
          <li><strong>运行环境：</strong>浏览器、Node.js、Deno、Bun</li>
          <li><strong>主要用途：</strong>Web 前端、全栈、移动端、桌面</li>
        </ul>
      </div>
    </div>

    <!-- 核心差异对比表 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📊</span>
        <h2>核心差异速览</h2>
      </div>
      <div class="table-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th>维度</th>
              <th>Python</th>
              <th>JavaScript</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in coreDifferences" :key="row.dimension">
              <td class="dimension">{{ row.dimension }}</td>
              <td>{{ row.python }}</td>
              <td>{{ row.js }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 相同点区块 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🤝</span>
        <h2>相同点</h2>
      </div>
      <div class="similarity-grid">
        <div v-for="item in similarities" :key="item.title" class="similarity-item">
          <div class="item-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 详细对比：底层实现 + 语法差异 -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⚙️</span>
          <h2>底层实现对比</h2>
        </div>
        <div class="compare-detail">
          <div class="detail-block">
            <h3>🐍 Python</h3>
            <ul>
              <li><strong>解释器：</strong>CPython (C语言实现)，还有Jython、PyPy等。</li>
              <li><strong>执行模型：</strong>编译为字节码，由PVM解释执行，非JIT（PyPy除外）。</li>
              <li><strong>内存管理：</strong>引用计数 + 分代垃圾回收，有GIL限制多线程。</li>
              <li><strong>对象模型：</strong>一切皆对象，类型严格绑定在对象上。</li>
            </ul>
          </div>
          <div class="detail-block">
            <h3>🟨 JavaScript</h3>
            <ul>
              <li><strong>引擎：</strong>V8 (Chrome)、SpiderMonkey、JavaScriptCore等，多为C++实现。</li>
              <li><strong>执行模型：</strong>JIT 即时编译，性能优化激进。</li>
              <li><strong>内存管理：</strong>标记-清除垃圾回收，无GIL，基于事件循环的并发模型。</li>
              <li><strong>对象模型：</strong>基于原型继承，除基本类型外皆为对象。</li>
            </ul>
          </div>
        </div>
        <div class="note-box">
          <span>💡 Python 的 GIL 限制了 CPU 密集型多线程，但 JS 的单线程事件循环则天然适合 I/O 密集场景。</span>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">📝</span>
          <h2>语法差异示例</h2>
        </div>
        <div class="code-compare">
          <div class="code-block python">
            <div class="code-label">Python</div>
            <pre><code># 代码块使用缩进
def greet(name):
    if name:
        print(f"Hello, {name}")
    else:
        print("Hello, World")

# 列表推导式
squares = [x**2 for x in range(10)]

# 多行字符串
text = """多行
文本"""</code></pre>
          </div>
          <div class="code-block js">
            <div class="code-label">JavaScript</div>
            <pre v-pre><code>// 代码块使用花括号 {}
function greet(name) {
    if (name) {
      console.log(`Hello, ${name}`);
    } else {
      console.log("Hello, World");
    }
}

// 数组 map
const squares = [...Array(10).keys()].map(x => x**2);

// 模板字符串
const text = `多行
文本`;</code></pre>
          </div>
        </div>
      </section>
    </div>

    <!-- 类型系统与函数对比 -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">🔢</span>
          <h2>类型系统</h2>
        </div>
        <div class="compare-list">
          <div class="compare-item">
            <span class="label">类型强度</span>
            <span class="python-val">强类型 (1 + "2" 报错)</span>
            <span class="js-val">弱类型 (1 + "2" → "12")</span>
          </div>
          <div class="compare-item">
            <span class="label">类型检查</span>
            <span class="python-val">动态类型，运行时确定</span>
            <span class="js-val">动态类型，运行时确定</span>
          </div>
          <div class="compare-item">
            <span class="label">基本类型</span>
            <span class="python-val">int, float, str, bool, None ...</span>
            <span class="js-val">number, string, boolean, null, undefined, symbol, bigint</span>
          </div>
          <div class="compare-item">
            <span class="label">空值</span>
            <span class="python-val">None (唯一)</span>
            <span class="js-val">null 和 undefined 两种</span>
          </div>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">λ</span>
          <h2>函数与闭包</h2>
        </div>
        <div class="compare-list">
          <div class="compare-item">
            <span class="label">函数定义</span>
            <span class="python-val">def / lambda (单行)</span>
            <span class="js-val">function / 箭头函数 ()=></span>
          </div>
          <div class="compare-item">
            <span class="label">闭包</span>
            <span class="python-val">支持，修改外层变量需 nonlocal</span>
            <span class="js-val">支持，直接修改外层变量</span>
          </div>
          <div class="compare-item">
            <span class="label">this 绑定</span>
            <span class="python-val">显式 self 参数</span>
            <span class="js-val">动态 this，需注意绑定</span>
          </div>
          <div class="compare-item">
            <span class="label">默认参数</span>
            <span class="python-val">支持，注意可变对象陷阱</span>
            <span class="js-val">支持，ES6 引入</span>
          </div>
        </div>
      </section>
    </div>

    <!-- 优缺点对比 -->
    <div class="two-column">
      <section class="section-card pros-card">
        <div class="section-header">
          <span class="section-icon">👍</span>
          <h2>Python 优缺点</h2>
        </div>
        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>语法简洁优雅，可读性极强</li>
              <li>丰富的科学计算与 AI 生态 (NumPy, Pandas, PyTorch)</li>
              <li>强大的标准库，开箱即用</li>
              <li>多范式，适合快速原型开发</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>执行速度相对较慢</li>
              <li>GIL 限制多核 CPU 并行</li>
              <li>移动端和前端开发能力弱</li>
              <li>动态类型大型项目维护成本高</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section-card pros-card">
        <div class="section-header">
          <span class="section-icon">👍</span>
          <h2>JavaScript 优缺点</h2>
        </div>
        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>浏览器原生支持，前端唯一选择</li>
              <li>JIT 带来高性能，适合高并发 I/O</li>
              <li>庞大的 npm 生态，全栈统一语言</li>
              <li>事件驱动、非阻塞异步模型</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>弱类型导致隐式转换陷阱</li>
              <li>历史遗留设计缺陷 (var, this 等)</li>
              <li>原型继承不如类继承直观</li>
              <li>node_modules 体积膨胀问题</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- 使用场景对比 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🎯</span>
        <h2>使用场景对比</h2>
      </div>
      <div class="scenarios-grid">
        <div class="scenario-item both">
          <h3>🤝 两者均适用</h3>
          <p>Web 后端开发、命令行工具、自动化脚本、Serverless 函数</p>
        </div>
        <div class="scenario-item python">
          <h3>🐍 Python 优势领域</h3>
          <p>数据科学、机器学习、科学计算、量化交易、教育、传统企业应用</p>
        </div>
        <div class="scenario-item js">
          <h3>🟨 JavaScript 优势领域</h3>
          <p>Web 前端、跨平台移动应用 (React Native)、桌面应用 (Electron)、实时通信</p>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="compare-footer">
      <p>🔍 选择哪门语言取决于你的应用场景。两者学习曲线都较平缓，且全栈开发者通常同时掌握它们。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 核心差异表格数据
interface DiffRow {
  dimension: string;
  python: string;
  js: string;
}

const coreDifferences: DiffRow[] = [
  { dimension: '设计哲学', python: '优雅、明确、简单，一种事最好只有一种做法', js: '灵活、实用，支持多种风格，允许快速迭代' },
  { dimension: '代码块', python: '缩进 (4空格)', js: '花括号 {}' },
  { dimension: '变量声明', python: '直接赋值，无需关键字', js: 'var / let / const' },
  { dimension: '语句结束', python: '换行 (可加分号但不推荐)', js: '分号 (可省略但推荐)' },
  { dimension: '相等比较', python: '== (值相等)，is (同一对象)', js: '== (带类型转换)，=== (严格相等)' },
  { dimension: '布尔值', python: 'True / False，假值：False, None, 0, 空容器等', js: 'true / false，假值：false, null, undefined, 0, NaN, ""' },
  { dimension: '数组/列表', python: 'list: [1,2,3]，方法丰富', js: 'Array: [1,2,3]，原型方法' },
  { dimension: '对象/字典', python: 'dict: {"key": "value"}', js: 'Object: {key: "value"}，键可以是 Symbol' },
  { dimension: '注释', python: '# 单行，""" 多行 """', js: '// 单行，/* 多行 */' },
];

// 相同点
interface Similarity {
  icon: string;
  title: string;
  desc: string;
}

const similarities: Similarity[] = [
  { icon: '🧠', title: '动态类型', desc: '两者都是动态类型语言，变量类型在运行时确定，灵活度高。' },
  { icon: '🧩', title: '解释型/脚本语言', desc: '无需编译，可直接运行源代码，适合快速开发和调试。' },
  { icon: '🔧', title: '函数一等公民', desc: '函数可以作为参数传递、作为返回值，支持高阶函数和闭包。' },
  { icon: '📦', title: '自动内存管理', desc: '均具备垃圾回收机制，开发者无需手动管理内存。' },
  { icon: '🌐', title: '庞大的生态系统', desc: '拥有丰富的第三方库和活跃的社区，几乎任何需求都能找到现成方案。' },
  { icon: '⚡', title: '异步编程支持', desc: 'Python 有 asyncio，JavaScript 有 Promise/async-await，均支持非阻塞 I/O。' },
];
</script>

<style lang="less" scoped>
// ========== 简约现代变量 ==========
@python-blue: #306998;
@python-yellow: #FFD43B;
@js-yellow: #f7df1e;
@js-dark: #323330;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@code-bg: #1e293b;
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

.python-js-compare {
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
.compare-header {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;

      .icon {
        font-size: 3rem;
      }

      h1 {
        font-size: 3rem;
        font-weight: 700;

        .vs {
          font-size: 2rem;
          font-weight: 400;
          color: @text-light;
          margin: 0 10px;
        }

        background: linear-gradient(135deg, @python-blue 0%, @js-dark 80%);
        -webkit-background-clip:text;
        background-clip:text;
        color:transparent;
      }
    }

    .subtitle {
      text-align: center;
      font-size: 1.3rem;
      color: @text-soft;
    }

    .divider {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, @python-yellow, @js-yellow);
      border-radius: 4px;
      margin: 1.2rem auto 1.5rem;
    }

    .intro-text {
      text-align: center;
      font-size: 1.1rem;
      color: @text-soft;
      max-width: 800px;
      margin: 0 auto;
    }
  }
}

// 概览卡片
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .overview-card {
    background: @card-bg;
    border-radius: @border-radius-lg;
    padding: 1.8rem 2rem;
    box-shadow: @shadow-sm;
    border-top: 6px solid;

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 1.5rem;

      span {
        font-size: 2.5rem;
      }

      h2 {
        font-size: 2rem;
        font-weight: 650;
      }
    }

    ul {
      list-style: none;

      li {
        padding: 0.5rem 0;
        border-bottom: 1px dashed @border-light;
        color: @text-soft;

        strong {
          color: @text-dark;
          min-width: 80px;
          display: inline-block;
        }
      }
    }
  }

  .python-card {
    border-color: @python-blue;

    .card-header h2 {
      color: @python-blue;
    }
  }

  .js-card {
    border-color: @js-yellow;

    .card-header h2 {
      color: darken(@js-yellow, 20%);
    }
  }
}

// 通用卡片
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.8rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
    }
  }
}

// 表格
.table-wrapper {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.9rem 1.2rem;
    text-align: left;
    border-bottom: 1px solid @border-light;
  }

  th {
    font-weight: 600;
    color: @python-blue;
    background: #f9fbfd;
  }

  .dimension {
    font-weight: 600;
    color: @text-dark;
  }
}

// 相同点网格
.similarity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .similarity-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.5rem 1.5rem;
    border: 1px solid @border-light;
    text-align: center;

    .item-icon {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin-bottom: 0.5rem;
    }

    p {
      color: @text-soft;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

// 两列布局
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

// 详细对比块
.compare-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .detail-block {
    h3 {
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;

      li {
        padding: 0.4rem 0;
        color: @text-soft;
      }
    }
  }
}

.note-box {
  background: #fef3e7;
  border-left: 4px solid @python-yellow;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;

  span {
    color: #7a4e1a;
  }
}

// 代码对比
.code-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .code-block {
    background: @code-bg;
    border-radius: 12px;
    overflow: hidden;

    .code-label {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.4rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: white;
    }

    pre {
      padding: 1rem;
      margin: 0;

      code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: #e2e8f0;
        line-height: 1.5;
      }
    }
  }
}

// 列表对比
.compare-list {
  .compare-item {
    display: flex;
    align-items: flex-start;
    padding: 0.8rem 0;
    border-bottom: 1px dotted @border-light;

    .label {
      width: 100px;
      font-weight: 600;
      color: @text-dark;
    }

    .python-val,
    .js-val {
      flex: 1;
      color: @text-soft;
    }

    .python-val::before {
      content: "🐍 ";
    }

    .js-val::before {
      content: "🟨 ";
    }
  }
}

// 优缺点
.pros-cons {
  display: flex;
  gap: 2rem;

  .pros,
  .cons {
    flex: 1;

    h3 {
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;

      li {
        padding: 0.3rem 0;

        &::before {
          margin-right: 8px;
        }
      }
    }
  }

  .pros li::before {
    content: "✅";
    color: #2e7d32;
  }

  .cons li::before {
    content: "❌";
    color: #b45353;
  }
}

// 场景网格
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .scenario-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.5rem;
    border: 1px solid @border-light;

    h3 {
      margin-bottom: 0.8rem;
    }

    p {
      color: @text-soft;
    }
  }
}

// 底部
.compare-footer {
  text-align: center;

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

// 响应式
@media (max-width:768px) {
  .python-js-compare {
    padding: 1.2rem 1rem;
  }

  .overview-grid,
  .two-column,
  .similarity-grid,
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .code-compare {
    grid-template-columns: 1fr;
  }

  .compare-item {
    flex-wrap: wrap;

    .label {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}
</style>
