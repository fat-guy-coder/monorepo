<template>
  <div class="learning-path">
    <header class="hero">
      <h1 class="title">🚀 前端 → Python <span class="gradient">极速学习指南</span></h1>
      <p class="subtitle">TypeScript 开发者视角 · 类比映射 · 避坑手册 · 实战路线</p>
      <div class="tags">
        <span>🎯 类比法</span><span>⚡ 差异驱动</span><span>📦 项目实战</span><span>🧠 稳固内化</span>
      </div>
    </header>

    <!-- 核心策略卡片 -->
    <div class="strategy-grid">
      <div class="strategy-card">
        <div class="icon">🔁</div>
        <h3>知识类比映射</h3>
        <p>用你已经掌握的 JS/TS 概念去“翻译” Python 特性，建立快速迁移通道。</p>
        <ul>
          <li>📦 模块 ↔ import/export → <code>import</code>/<code>from ... import</code></li>
          <li>🎭 类与继承 ↔ class/extends → <code>class</code>/<code>super()</code></li>
          <li>🌀 异步 ↔ Promise/async-await → <code>asyncio</code>/<code>await</code></li>
          <li>🔧 装饰器 ↔ 高阶函数/装饰器 → 语法与 TS 装饰器相似</li>
          <li>📐 类型注解 ↔ TypeScript → Python 3.10+ 支持 <code>typing</code> + 静态检查工具</li>
        </ul>
      </div>
      <div class="strategy-card">
        <div class="icon">⚡</div>
        <h3>聚焦关键差异</h3>
        <p>避开“语法糖陷阱”，直击 Python 与 JS/TS 的核心差异点，快速扫清障碍。</p>
        <ul>
          <li>🐍 <strong>缩进即作用域</strong> — 没有大括号，强制代码结构</li>
          <li>📝 <strong>动态类型 + 可选注解</strong> — 运行时不会做类型检查</li>
          <li>🧵 <strong>GIL 与并发模型</strong> — 多线程受限，多进程 / asyncio 为主</li>
          <li>📦 <strong>包管理 ≠ npm</strong> — pip + venv / poetry / conda</li>
          <li>🔍 <strong>变量作用域规则</strong> — LEGB，没有 `var/let/const`，函数内赋值默认局部</li>
        </ul>
      </div>
      <div class="strategy-card">
        <div class="icon">🛠️</div>
        <h3>学习即实践</h3>
        <p>用“构建项目”驱动学习，从工具脚本到 Web 服务，在实践中内化语法。</p>
        <ul>
          <li>📁 编写 CLI 工具 (文件处理 / API 请求)</li>
          <li>🌐 FastAPI / Flask 构建 REST API (类比 Express)</li>
          <li>🕷️ 异步爬虫 (aiohttp + asyncio)</li>
          <li>🤖 自动化脚本 (Pandas / 数据处理)</li>
        </ul>
      </div>
    </div>

    <!-- 快速对比表: JS/TS vs Python -->
    <div class="comparison-panel">
      <h2>📊 核心概念对照表</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>JavaScript / TypeScript</th>
              <th>Python (等价/相似)</th>
              <th>💡 注意点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>let/const</code> 变量声明</td>
              <td>直接赋值 <code>x = 10</code></td>
              <td>没有块级作用域（函数作用域+LEGB）</td>
            </tr>
            <tr>
              <td><code>function fn() {}</code></td>
              <td><code>def fn():</code></td>
              <td>默认返回 None，缩进表示体</td>
            </tr>
            <tr>
              <td>箭头函数 <code>() => {}</code></td>
              <td><code>lambda x: x*2</code></td>
              <td>只能单表达式，用于简单函数</td>
            </tr>
            <tr>
              <td><code>Promise / async-await</code></td>
              <td><code>asyncio.create_task / await</code></td>
              <td>需手动事件循环，支持协程</td>
            </tr>
            <tr>
              <td><code>class / extends / super</code></td>
              <td>完全相同（语法稍异）</td>
              <td><code>super().__init__()</code> 调用父类</td>
            </tr>
            <tr>
              <td>数组 <code>[1,2,3]</code></td>
              <td>列表 <code>[1,2,3]</code></td>
              <td>列表推导式 <code>[x*2 for x in arr]</code></td>
            </tr>
            <tr>
              <td>对象 <code>{ a: 1 }</code></td>
              <td>字典 <code>{'a': 1}</code></td>
              <td>键可为任何不可变类型</td>
            </tr>
            <tr>
              <td>模板字符串 <code>`${var}`</code></td>
              <td>f-string <code>f"{var}"</code></td>
              <td>更简洁高效</td>
            </tr>
            <tr>
              <td>npm / yarn / pnpm</td>
              <td>pip + venv / poetry</td>
              <td>虚拟环境是必须的</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 学习路线图（时间线） -->
    <div class="roadmap">
      <h2>🗺️ 4周稳固学习路线</h2>
      <div class="weeks">
        <div class="week-card">
          <div class="week-num">第1周</div>
          <h4>🐍 基础语法 & 工具链</h4>
          <ul>
            <li>安装 Python + VSCode/PyCharm 插件</li>
            <li>变量、运算符、字符串、列表、元组、字典、集合</li>
            <li>流程控制 (if/for/while) + 缩进法则</li>
            <li>函数定义、参数类型（位置/关键字/默认/*args/**kwargs）</li>
            <li>练习：写一个计算器、文件读写、猜数字游戏</li>
          </ul>
        </div>
        <div class="week-card">
          <div class="week-num">第2周</div>
          <h4>📦 模块化 & 面向对象</h4>
          <ul>
            <li>模块与包 (import / __name__)</li>
            <li>类、实例、继承、多态、<code>@property</code></li>
            <li>异常处理 (<code>try/except/finally</code>)</li>
            <li>虚拟环境 + pip + requirements.txt</li>
            <li>练习：实现一个简单的图书管理系统 (OOP)</li>
          </ul>
        </div>
        <div class="week-card">
          <div class="week-num">第3周</div>
          <h4>🌀 进阶特性 & 异步</h4>
          <ul>
            <li>装饰器、生成器、迭代器</li>
            <li>上下文管理器 (with)</li>
            <li>异步基础：async/await, asyncio.gather, aiohttp</li>
            <li>类型注解 + mypy (类比TS类型检查)</li>
            <li>练习：异步爬取多个网站，并发下载图片</li>
          </ul>
        </div>
        <div class="week-card">
          <div class="week-num">第4周</div>
          <h4>🌐 实战项目 & 生态</h4>
          <ul>
            <li>FastAPI 搭建 REST API（依赖注入、异步支持）</li>
            <li>数据库操作 (SQLAlchemy / asyncpg)</li>
            <li>单元测试 (pytest)</li>
            <li>包发布 (setup.py / pyproject.toml)</li>
            <li>练习：开发一个带 JWT 认证的待办事项 API</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 工具推荐 + 学习资源 -->
    <div class="resources">
      <div class="tools-res">
        <h3>🔧 必备工具链</h3>
        <ul>
          <li><strong>编辑器</strong>：VSCode + Python 插件 (Pylance，类型检查)</li>
          <li><strong>虚拟环境</strong>：<code>python -m venv .venv</code> 或 <code>poetry</code></li>
          <li><strong>静态检查</strong>：mypy, ruff, black, isort</li>
          <li><strong>交互式环境</strong>：IPython, Jupyter Notebook</li>
          <li><strong>调试</strong>：pdb, breakpoint()</li>
        </ul>
      </div>
      <div class="learning-res">
        <h3>📚 推荐资源 (针对前端背景)</h3>
        <ul>
          <li>📖 <strong>Python官方教程</strong> — 边读边敲</li>
          <li>🎥 <strong>Fluent Python (第2版)</strong> — 深入理解 Pythonic</li>
          <li>📘 <strong>Real Python 教程</strong> — 实战文章 & 视频</li>
          <li>⚙️ <strong>mypy 官网</strong> — 类型系统深入</li>
          <li>🎯 <strong>练习平台</strong>：LeetCode (Python), Codewars</li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>💡 核心心法：<strong>类比迁移 + 精读差异 + 项目驱动</strong> — 2周上手，4周熟练，2个月精通</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需额外逻辑
</script>

<style lang="less" scoped>
@bg: #fafcff;
@card-bg: #ffffff;
@primary: #1f2937;
@accent: #3b82f6;
@accent-hover: #2563eb;
@border: #e4e7ec;
@text-muted: #4b5563;
@code-bg: #1e1e2f;
@code-fg: #f1f5f9;

.learning-path {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: @bg;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 2.5rem;
    font-weight: 800;
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
    font-size: 1.1rem;
    color: @text-muted;
    margin-top: 0.5rem;
  }

  .tags {
    margin-top: 1.2rem;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    span {
      background: #eef2ff;
      color: @accent;
      padding: 0.2rem 0.9rem;
      border-radius: 2rem;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;

  .strategy-card {
    background: @card-bg;
    padding: 1.2rem 1.5rem;
    border-radius: 1.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    border: 1px solid @border;
    transition: 0.2s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.1);
      border-color: @accent;
    }

    .icon {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0.5rem 0;
      color: @primary;
    }

    p {
      color: @text-muted;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin: 0.5rem 0;
        font-size: 0.85rem;

        code {
          background: #f3f4f6;
          padding: 0.1rem 0.3rem;
          border-radius: 6px;
          font-family: monospace;
          color: #d97706;
        }
      }
    }
  }
}

.comparison-panel {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: @primary;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 1rem;
    border: 1px solid @border;
    background: @card-bg;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;

    th,
    td {
      text-align: left;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid @border;
    }

    th {
      background: #f8fafc;
      font-weight: 600;
      color: @primary;
    }

    td:first-child,
    th:first-child {
      width: 30%;
    }

    code {
      background: #f1f5f9;
      padding: 0.2rem 0.3rem;
      border-radius: 6px;
      font-size: 0.8rem;
    }
  }
}

.roadmap {
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  .weeks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;

    .week-card {
      background: @card-bg;
      border-radius: 1rem;
      border: 1px solid @border;
      padding: 1rem 1.2rem;

      .week-num {
        display: inline-block;
        background: #e0f2fe;
        color: #0369a1;
        padding: 0.2rem 0.8rem;
        border-radius: 2rem;
        font-size: 0.7rem;
        font-weight: 600;
        margin-bottom: 0.8rem;
      }

      h4 {
        font-size: 1.05rem;
        font-weight: 600;
        margin: 0.2rem 0 0.8rem;
        color: @primary;
      }

      ul {
        padding-left: 1rem;

        li {
          font-size: 0.8rem;
          margin: 0.4rem 0;
          color: @text-muted;
        }
      }
    }
  }
}

.resources {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 2rem;

  >div {
    background: @card-bg;
    border-radius: 1rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid @border;

    h3 {
      font-size: 1.15rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 0.8rem;
      border-left: 4px solid @accent;
      padding-left: 0.7rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin: 0.5rem 0;
        font-size: 0.85rem;
        color: @text-muted;

        strong {
          color: @primary;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid @border;
  color: @text-muted;
  font-size: 0.9rem;

  strong {
    color: @accent;
  }
}

@media (max-width: 720px) {
  .learning-path {
    padding: 1rem;
  }

  .hero .title {
    font-size: 1.8rem;
  }

  .strategy-grid,
  .weeks,
  .resources {
    grid-template-columns: 1fr;
  }
}
</style>
