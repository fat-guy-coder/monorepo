<template>
  <div class="loops-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>循环结构</h1>
        </div>
        <p class="subtitle">重复执行 · 遍历迭代 · 控制流程</p>
        <div class="divider"></div>
        <p class="intro-text">
          循环让计算机能够重复执行代码块，高效处理批量数据与自动化任务。
          Python 提供了 <code>for</code> 和 <code>while</code> 两种循环，配合控制语句灵活应对各种场景。
        </p>
      </div>
    </header>

    <!-- for 循环 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔄</span>
        <h2>for 循环</h2>
      </div>
      <p class="section-desc">用于遍历任何可迭代对象（如列表、字符串、字典、range 对象等）。</p>
      <div class="syntax-block">
        <pre class="code-block"><code>for variable in iterable:
    # 循环体
    statement(s)</code></pre>
      </div>
      <div class="example-grid">
        <div class="example-item">
          <h4>📋 遍历列表</h4>
          <pre class="code-block"><code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</code></pre>
        </div>
        <div class="example-item">
          <h4>📋 使用 range()</h4>
          <pre class="code-block"><code># range(start, stop, step)
for i in range(5):        # 0~4
    print(i)
for i in range(2, 10, 2): # 2,4,6,8
    print(i)</code></pre>
        </div>
        <div class="example-item">
          <h4>📋 遍历字典</h4>
          <pre class="code-block"><code>user = {"name": "Alice", "age": 30}
for key in user:
    print(key, user[key])
for key, value in user.items():
    print(key, value)</code></pre>
        </div>
        <div class="example-item">
          <h4>📋 带索引遍历：enumerate()</h4>
          <pre class="code-block"><code>colors = ["red", "green", "blue"]
for idx, color in enumerate(colors):
    print(f"{idx}: {color}")</code></pre>
        </div>
      </div>
    </section>

    <!-- while 循环 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">⏳</span>
        <h2>while 循环</h2>
      </div>
      <p class="section-desc">当条件为真时重复执行，适用于不确定循环次数的场景。</p>
      <div class="syntax-block">
        <pre class="code-block"><code>while condition:
    # 循环体
    statement(s)</code></pre>
      </div>
      <div class="example-grid">
        <div class="example-item">
          <h4>📋 基本用法</h4>
          <pre class="code-block"><code>count = 0
while count < 5:
    print(count)
    count += 1</code></pre>
        </div>
        <div class="example-item">
          <h4>📋 无限循环（需手动中断）</h4>
          <pre class="code-block"><code>while True:
    user_input = input("输入 'quit' 退出: ")
    if user_input == "quit":
        break</code></pre>
        </div>
        <div class="example-item">
          <h4>📋 循环中的 else 子句</h4>
          <pre class="code-block"><code>n = 0
while n < 3:
    print(n)
    n += 1
else:
    print("循环正常结束")</code></pre>
        </div>
      </div>
      <div class="note-box">
        <span>💡 小心无限循环！确保循环条件最终会变为 <code>False</code>，或使用 <code>break</code> 退出。</span>
      </div>
    </section>

    <!-- 循环控制语句 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🎮</span>
        <h2>循环控制语句</h2>
      </div>
      <div class="control-grid">
        <div class="control-card">
          <h3><code>break</code></h3>
          <p>立即终止当前循环，跳出循环体。</p>
          <pre class="code-block"><code>for i in range(10):
    if i == 5:
        break
    print(i)  # 输出 0~4</code></pre>
        </div>
        <div class="control-card">
          <h3><code>continue</code></h3>
          <p>跳过本次循环剩余代码，进入下一次迭代。</p>
          <pre class="code-block"><code>for i in range(5):
    if i == 2:
        continue
    print(i)  # 输出 0,1,3,4</code></pre>
        </div>
        <div class="control-card">
          <h3><code>else</code> 子句</h3>
          <p>当循环正常结束（未被 <code>break</code> 中断）时执行。</p>
          <pre class="code-block"><code>for i in range(3):
    print(i)
else:
    print("完成")  # 会执行

for i in range(5):
    if i == 3:
        break
else:
    print("不会执行")</code></pre>
        </div>
        <div class="control-card">
          <h3><code>pass</code></h3>
          <p>空语句，占位符，什么都不做。</p>
          <pre class="code-block"><code>for i in range(3):
    if i == 1:
        pass  # 占位，等待后续实现
    else:
        print(i)</code></pre>
        </div>
      </div>
    </section>

    <!-- 嵌套循环与列表推导式 -->
    <div class="two-column">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">🕸️</span>
          <h2>嵌套循环</h2>
        </div>
        <p class="section-desc">一个循环内部包含另一个循环，常用于处理多维数据。</p>
        <pre class="code-block"><code>for i in range(3):
    for j in range(2):
        print(f"({i}, {j})")

# 输出: (0,0) (0,1) (1,0) (1,1) (2,0) (2,1)</code></pre>
        <div class="example-box">
          <h4>📋 乘法表示例</h4>
          <pre class="code-block"><code>for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}*{i}={i*j}", end="\t")
    print()</code></pre>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⚡</span>
          <h2>列表推导式</h2>
        </div>
        <p class="section-desc">简洁的语法创建列表，替代简单的 for 循环。</p>
        <pre class="code-block"><code># 基本语法
[expression for item in iterable if condition]</code></pre>
        <div class="example-box">
          <h4>📋 示例对比</h4>
          <pre class="code-block"><code># 传统循环
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x**2)

# 列表推导式
squares = [x**2 for x in range(10) if x % 2 == 0]</code></pre>
        </div>
        <div class="note-box">
          <span>💡 还有字典推导式、集合推导式，语法类似。但避免过于复杂的推导式，以免降低可读性。</span>
        </div>
      </section>
    </div>

    <!-- 常用技巧 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🧰</span>
        <h2>常用技巧与注意事项</h2>
      </div>
      <div class="tips-grid">
        <div class="tip-item">
          <span class="tip-icon">🔁</span>
          <p><strong>同时遍历多个序列</strong> — 使用 <code>zip()</code></p>
          <pre class="code-block small"><code>names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(name, age)</code></pre>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔄</span>
          <p><strong>反向遍历</strong> — 使用 <code>reversed()</code></p>
          <pre class="code-block small"><code>for i in reversed(range(5)):
    print(i)  # 4,3,2,1,0</code></pre>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔢</span>
          <p><strong>遍历时获取索引</strong> — <code>enumerate()</code> 可指定起始索引</p>
          <pre class="code-block small"><code>for idx, val in enumerate(data, start=1):
    print(idx, val)</code></pre>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⚠️</span>
          <p><strong>不要在遍历时修改列表</strong></p>
          <pre class="code-block small"><code># 错误示范
nums = [1,2,3,4]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)  # 可能跳过元素

# 正确：遍历副本或使用列表推导式</code></pre>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="guide-footer">
      <p>🚀 循环是自动化的基础，结合条件判断与数据结构，可以构建强大的程序逻辑。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件主要为展示内容，无需额外逻辑
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

.loops-guide {
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

      .python-icon {
        font-size: 3.2rem;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .divider {
      width: 60px;
      height: 4px;
      background: @primary-yellow;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        color: #0f5c3e;
      }
    }
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

  &:hover {
    box-shadow: @shadow-hover;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
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

  .section-desc {
    margin-bottom: 1.5rem;
    color: @text-soft;
    font-size: 1rem;
    line-height: 1.6;

    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      color: #0f5c3e;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  color: @code-text;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  line-height: 1.5;

  code {
    background: transparent;
    color: inherit;
  }

  &.small {
    font-size: 0.85rem;
    padding: 0.8rem 1rem;
  }
}

.syntax-block {
  margin-bottom: 1.5rem;
}

// 示例网格
.example-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .example-item {
    h4 {
      font-size: 1rem;
      font-weight: 650;
      margin-bottom: 0.6rem;
      color: @text-dark;
    }
  }
}

// 控制卡片网格
.control-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;

  .control-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.2rem;
    border: 1px solid @border-light;

    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin-bottom: 0.5rem;
      color: @text-dark;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
      }
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }

    .code-block {
      font-size: 0.8rem;
    }
  }
}

// 两列布局
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.example-box {
  margin: 1.2rem 0 0.5rem;

  h4 {
    font-size: 1rem;
    font-weight: 650;
    margin-bottom: 0.6rem;
    color: @text-dark;
  }
}

.note-box {
  background: #fef3e7;
  border-left: 4px solid @primary-yellow;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  margin-top: 1rem;

  span {
    color: #7a4e1a;
    font-size: 0.95rem;

    code {
      background: #fef3c7;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
    }
  }
}

// 技巧网格
.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .tip-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;

    .tip-icon {
      font-size: 1.4rem;
      margin-right: 8px;
    }

    p {
      margin-bottom: 0.8rem;
      color: @text-soft;

      strong {
        color: @text-dark;
      }
    }
  }
}

// 底部
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

// 响应式
@media (max-width: 768px) {
  .loops-guide {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }

  .control-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .control-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
