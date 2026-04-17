<template>
  <div class="variables-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-wrapper">
          <span class="python-icon">🐍</span>
          <h1>变量与赋值</h1>
        </div>
        <p class="subtitle">Python 中的数据容器 · 从基础到细节</p>
        <div class="divider"></div>
        <p class="intro">
          变量是存储数据的命名标签。Python 中的变量无需声明类型，通过赋值创建，
          理解其背后的引用机制是避免常见错误的关键。
        </p>
      </div>
    </header>

    <!-- 核心概念区域 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📌</span>
        <h2>核心概念</h2>
      </div>
      <div class="concept-grid">
        <div class="concept-item">
          <h3>🔖 变量即标签</h3>
          <p>变量名只是指向内存中对象的引用（标签），而非存储值的盒子。</p>
        </div>
        <div class="concept-item">
          <h3>🧷 动态类型</h3>
          <p>变量可以随时指向不同类型的对象，无需事先声明类型。</p>
        </div>
        <div class="concept-item">
          <h3>🗑️ 垃圾回收</h3>
          <p>当对象没有任何变量引用时，Python 会自动回收内存。</p>
        </div>
      </div>
    </section>

    <!-- 赋值方式与示例 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">✏️</span>
        <h2>赋值方式</h2>
      </div>
      <div class="examples-block">
        <div class="example-item">
          <div class="example-title">基础赋值</div>
          <pre class="code-block"><code>x = 10
name = "Python"
is_valid = True</code></pre>
          <p class="example-desc">使用等号 <code>=</code> 将右侧对象绑定到左侧变量名。</p>
        </div>
        <div class="example-item">
          <div class="example-title">多重赋值</div>
          <pre class="code-block"><code>a, b, c = 1, 2, 3
x = y = z = 0      # 链式赋值</code></pre>
          <p class="example-desc">同时为多个变量赋值，右侧可以是任意可迭代对象。</p>
        </div>
        <div class="example-item">
          <div class="example-title">交换变量</div>
          <pre class="code-block"><code>a, b = b, a</code></pre>
          <p class="example-desc">Python 中交换值无需临时变量，简洁优雅。</p>
        </div>
      </div>
    </section>

    <!-- 命名规则与注意事项 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">⚠️</span>
        <h2>命名规则与注意事项</h2>
      </div>
      <div class="rules-grid">
        <div class="rule-card valid">
          <h4>✅ 允许的命名</h4>
          <ul>
            <li>字母、数字、下划线组成</li>
            <li>不能以数字开头</li>
            <li>区分大小写 (age ≠ Age)</li>
            <li>不能使用 Python 关键字</li>
          </ul>
          <div class="good-example">my_var, _private, name2</div>
        </div>
        <div class="rule-card invalid">
          <h4>❌ 不允许的命名</h4>
          <ul>
            <li>2things (数字开头)</li>
            <li>my-var (含连字符)</li>
            <li>class, if, for (关键字)</li>
          </ul>
        </div>
        <div class="rule-card convention">
          <h4>📏 命名惯例</h4>
          <ul>
            <li>变量/函数：snake_case</li>
            <li>常量：UPPER_CASE</li>
            <li>类名：PascalCase</li>
            <li>私有：_leading_underscore</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 特殊情况与陷阱 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🧪</span>
        <h2>特殊情况 & 常见陷阱</h2>
      </div>
      <div class="pitfalls-container">
        <div class="pitfall-card">
          <h3>🔄 可变对象与引用</h3>
          <pre class="code-block"><code>list_a = [1, 2, 3]
list_b = list_a       # 引用同一个列表
list_b.append(4)
print(list_a)  # [1, 2, 3, 4]   # 都变了！</code></pre>
          <p class="warning-text">对于列表、字典等可变对象，赋值传递的是引用，修改会相互影响。</p>
        </div>
        <div class="pitfall-card">
          <h3>📋 浅拷贝与深拷贝</h3>
          <pre class="code-block"><code>import copy
a = [[1, 2], [3, 4]]
b = a.copy()          # 浅拷贝
b = copy.deepcopy(a)  # 深拷贝</code></pre>
          <p>需要独立副本时，使用 <code>copy()</code> 或 <code>deepcopy()</code>。</p>
        </div>
        <div class="pitfall-card">
          <h3>🧊 小整数与字符串驻留</h3>
          <pre class="code-block"><code>a = 256
b = 256
a is b  # True (小整数缓存)

x = "hello"
y = "hello"
x is y  # True (短字符串驻留)</code></pre>
          <p>Python 会缓存小整数 (-5~256) 和某些字符串，<code>is</code> 比较可能出乎意料。</p>
        </div>
        <div class="pitfall-card">
          <h3>📦 常量约定</h3>
          <pre class="code-block"><code>PI = 3.14159
MAX_SIZE = 100</code></pre>
          <p>Python 没有真正的常量，全大写变量名只是一种约定，仍可修改。</p>
        </div>
      </div>
    </section>

    <!-- 底部小结 -->
    <footer class="guide-footer">
      <p>💡 记住：变量只是名字，对象才是实体。理解引用，方能避开深坑。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件专注于展示内容，无需额外逻辑
// TypeScript 确保类型安全（尽管此处无动态数据，但保留 setup 规范）
</script>

<style lang="less" scoped>
// ========== 简约现代配色 ==========
@primary-blue: #306998;
@primary-yellow: #FFD43B;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
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

.variables-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
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
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
        line-height: 1;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        letter-spacing: -0.02em;
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

    .intro {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;
    }
  }
}

// ----- 通用区块卡片样式 -----
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
    margin-bottom: 1.8rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
      line-height: 1;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
      letter-spacing: -0.01em;
    }
  }
}

// ----- 核心概念网格 -----
.concept-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .concept-item {
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
      color: @text-dark;
    }
    p {
      color: @text-soft;
      line-height: 1.6;
      font-size: 0.98rem;
    }
  }
}

// ----- 赋值示例区域 -----
.examples-block {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  .example-item {
    .example-title {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.6rem;
      color: @primary-blue;
    }
    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem 1.2rem;
      border-radius: 12px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.95rem;
      overflow-x: auto;
      margin-bottom: 0.5rem;
      code {
        background: transparent;
        color: inherit;
      }
    }
    .example-desc {
      color: @text-soft;
      font-size: 0.95rem;
      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        color: #0f5c3e;
        font-size: 0.9em;
      }
    }
  }
}

// ----- 命名规则卡片网格 -----
.rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .rule-card {
    background: #f9f9fc;
    padding: 1.5rem 1.5rem;
    border-radius: @border-radius-md;
    border-left: 5px solid;

    &.valid {
      border-left-color: #2e7d32;
    }
    &.invalid {
      border-left-color: #c62828;
    }
    &.convention {
      border-left-color: @primary-blue;
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 1rem;
      color: @text-dark;
    }

    ul {
      list-style: none;
      li {
        padding: 0.25rem 0;
        color: @text-soft;
        display: flex;
        align-items: baseline;
        &::before {
          content: "•";
          color: @primary-blue;
          font-weight: bold;
          margin-right: 8px;
        }
      }
    }

    .good-example {
      margin-top: 1rem;
      background: #e8f0fe;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-family: monospace;
      font-size: 0.9rem;
      color: @primary-blue;
      text-align: center;
    }
  }
}

// ----- 特殊情况卡片区 -----
.pitfalls-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;

  .pitfall-card {
    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin-bottom: 1rem;
      color: @text-dark;
    }
    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 0.9rem 1.2rem;
      border-radius: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin-bottom: 0.8rem;
      code {
        background: transparent;
      }
    }
    p {
      color: @text-soft;
      line-height: 1.6;
      font-size: 0.95rem;
    }
    .warning-text {
      color: #b85c00;
      background: #fff3e0;
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      margin-top: 0.5rem;
      font-weight: 500;
    }
    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      color: #0f5c3e;
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
    font-size: 1rem;
    font-weight: 500;
    color: @text-light;
  }
}

// ----- 响应式设计 -----
@media (max-width: 768px) {
  .variables-guide {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;
    .header-content {
      .title-wrapper h1 {
        font-size: 2.2rem;
      }
      .intro {
        max-width: 100%;
      }
    }
  }

  .concept-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .rules-grid {
    grid-template-columns: 1fr;
  }

  .pitfalls-container {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .concept-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .rules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>