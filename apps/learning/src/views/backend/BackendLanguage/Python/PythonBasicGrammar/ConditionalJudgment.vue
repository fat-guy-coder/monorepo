<template>
  <div class="conditionals-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>条件判断</h1>
        </div>
        <p class="subtitle">控制程序流向 · 分支决策逻辑</p>
        <div class="divider"></div>
        <p class="intro-text">
          条件判断让程序能够根据不同的条件执行不同的代码块。
          Python 提供了清晰的 <code>if-elif-else</code> 结构、简洁的三元表达式以及强大的模式匹配。
        </p>
      </div>
    </header>

    <!-- 真值测试速览 -->
    <section class="section-card truthy-card">
      <div class="section-header">
        <span class="section-icon">✅</span>
        <h2>真值测试</h2>
      </div>
      <p class="section-desc">在条件判断中，以下值被视为 <code>False</code>，其余均为 <code>True</code>。</p>
      <div class="falsy-grid">
        <div v-for="item in falsyValues" :key="item.value" class="falsy-item">
          <code>{{ item.value }}</code>
          <span>{{ item.desc }}</span>
        </div>
      </div>
    </section>

    <!-- if-elif-else 语句 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🔀</span>
        <h2>if - elif - else 语句</h2>
      </div>
      <p class="section-desc">最基础的分支结构，根据条件依次判断，执行第一个为真的代码块。</p>
      <div class="syntax-block">
        <pre class="code-block"><code>if condition1:
    # 当 condition1 为 True 时执行
    statement1
elif condition2:
    # 当 condition1 为 False 且 condition2 为 True 时执行
    statement2
else:
    # 当以上所有条件都为 False 时执行
    statement3</code></pre>
      </div>
      <div class="example-box">
        <h4>📋 示例</h4>
        <pre class="code-block"><code>score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"成绩等级: {grade}")  # 成绩等级: B</code></pre>
      </div>
      <div class="note-box">
        <span>💡 注意：Python 使用缩进（通常 4 个空格）表示代码块，<code>elif</code> 是 <code>else if</code> 的缩写。</span>
      </div>
    </section>

    <!-- 条件表达式（三元运算符） -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">⚡</span>
        <h2>条件表达式（三元运算符）</h2>
      </div>
      <p class="section-desc">在一行内完成简单的条件赋值，使代码更简洁。</p>
      <div class="syntax-block">
        <pre class="code-block"><code>value_if_true if condition else value_if_false</code></pre>
      </div>
      <div class="example-box">
        <h4>📋 示例</h4>
        <pre class="code-block"><code>age = 20
status = "成年" if age >= 18 else "未成年"
print(status)  # 成年

# 嵌套使用（可读性下降，慎用）
x = 10
result = "正数" if x > 0 else ("零" if x == 0 else "负数")</code></pre>
      </div>
    </section>

    <!-- match-case 模式匹配 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🧩</span>
        <h2>match - case 模式匹配</h2>
        <span class="version-badge">Python 3.10+</span>
      </div>
      <p class="section-desc">类似于其他语言中的 switch-case，但功能更强大，支持解构和守卫条件。</p>
      <div class="example-box">
        <h4>📋 示例 1：基本匹配</h4>
        <pre class="code-block"><code>def http_status(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:
            return "Unknown"

print(http_status(404))  # Not Found</code></pre>
      </div>
      <div class="example-box">
        <h4>📋 示例 2：结构匹配与守卫</h4>
        <pre class="code-block"><code>def process_point(point):
    match point:
        case (0, 0):
            return "原点"
        case (x, 0):
            return f"X 轴上的点: {x}"
        case (0, y):
            return f"Y 轴上的点: {y}"
        case (x, y) if x == y:
            return f"对角线上: {x}, {y}"
        case (x, y):
            return f"普通点: {x}, {y}"

print(process_point((5, 5)))  # 对角线上: 5, 5</code></pre>
      </div>
      <div class="note-box">
        <span>💡 <code>_</code> 是通配符，匹配任何值。守卫条件 <code>if</code> 可进一步约束匹配。</span>
      </div>
    </section>

    <!-- 常用技巧与注意事项 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">💡</span>
        <h2>技巧与注意事项</h2>
      </div>
      <div class="tips-grid">
        <div class="tip-card">
          <h4>🔗 链式比较</h4>
          <pre class="code-block"><code># 等价于 x > 0 and x < 10
if 0 < x < 10:
    print("x 在 0 到 10 之间")</code></pre>
        </div>
        <div class="tip-card">
          <h4>📦 成员测试简化条件</h4>
          <pre class="code-block"><code># 不推荐
if fruit == "apple" or fruit == "banana" or fruit == "cherry":
    ...

# 推荐
if fruit in ("apple", "banana", "cherry"):
    ...</code></pre>
        </div>
        <div class="tip-card">
          <h4>⚠️ 避免常见错误</h4>
          <pre class="code-block"><code># 错误：赋值 (=) 误用为比较 (==)
if x = 5:   # SyntaxError

# 正确
if x == 5:
    ...</code></pre>
        </div>
        <div class="tip-card">
          <h4>🧹 空值检查</h4>
          <pre class="code-block"><code># 判断列表非空
if my_list:
    process(my_list)

# 而非 if len(my_list) > 0:</code></pre>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="guide-footer">
      <p>🎯 清晰的缩进与合理的分支结构是写出可读 Python 代码的关键。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 假值列表
interface FalsyItem {
  value: string
  desc: string
}

const falsyValues: FalsyItem[] = [
  { value: 'False', desc: '布尔假值' },
  { value: 'None', desc: '空值' },
  { value: '0', desc: '整数零' },
  { value: '0.0', desc: '浮点数零' },
  { value: "''", desc: '空字符串' },
  { value: '[]', desc: '空列表' },
  { value: '()', desc: '空元组' },
  { value: '{}', desc: '空字典' },
  { value: 'set()', desc: '空集合' },
  { value: 'range(0)', desc: '空范围' }
]
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

.conditionals-guide {
  max-width: 1200px;
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
    flex-wrap: wrap;

    .section-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
    }

    .version-badge {
      background: #e8f0fe;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
      color: @primary-blue;
      margin-left: auto;
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

// 代码块样式
.code-block {
  background: @code-bg;
  color: @code-text;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  line-height: 1.6;

  code {
    background: transparent;
    color: inherit;
  }
}

.syntax-block {
  margin-bottom: 1.5rem;
}

.example-box {
  margin-bottom: 1.2rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
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

// 真值网格
.falsy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.8rem;

  .falsy-item {
    background: #f9f9fc;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    border: 1px solid @border-light;
    display: flex;
    align-items: center;
    gap: 8px;

    code {
      background: @code-bg;
      color: #facc15;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-family: monospace;
    }

    span {
      color: @text-soft;
      font-size: 0.9rem;
    }
  }
}

// 技巧网格
.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  .tip-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.4rem;
    border: 1px solid @border-light;

    h4 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 0.8rem;
      color: @text-dark;
    }

    .code-block {
      padding: 0.8rem 1rem;
      font-size: 0.85rem;
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
  .conditionals-guide {
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

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .falsy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
