<template>
  <div class="comprehensions-guide">
    <header class="hero">
      <h1>🐍 Python 推导式完全指南</h1>
      <p>列表 · 字典 · 集合 · 生成器表达式 — 简洁、高效、Pythonic</p>
    </header>

    <div class="cards-grid">
      <!-- 列表推导式 -->
      <div class="card">
        <div class="card-header">
          <span class="icon">📋</span>
          <h2>列表推导式</h2>
          <span class="badge">List Comprehension</span>
        </div>
        <div class="syntax">
          <code>[表达式 for 变量 in 可迭代对象 if 条件]</code>
        </div>
        <div class="example">
          <p><strong>基础示例</strong></p>
          <pre><code># 生成 0~9 的平方
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件筛选：过滤偶数平方
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]</code></pre>
        </div>
        <div class="note">
          <span class="label">📌 场景</span> 快速生成列表、映射+过滤、替代 map/filter + lambda
        </div>
        <div class="advanced">
          <p><strong>进阶：嵌套循环</strong></p>
          <pre><code># 生成坐标对
pairs = [(x, y) for x in range(3) for y in range(3)]
# [(0,0),(0,1),(0,2),(1,0)...]

# 条件嵌套
matrix = [[1,2,3],[4,5,6]]
flatten = [num for row in matrix for num in row if num % 2 == 0]
# [2,4,6]</code></pre>
        </div>
      </div>

      <!-- 字典推导式 -->
      <div class="card">
        <div class="card-header">
          <span class="icon">📘</span>
          <h2>字典推导式</h2>
          <span class="badge">Dict Comprehension</span>
        </div>
        <div class="syntax">
          <code>{键表达式: 值表达式 for 变量 in 可迭代对象 if 条件}</code>
        </div>
        <div class="example">
          <p><strong>基础示例</strong></p>
          <pre><code># 创建数字到平方的映射
square_dict = {x: x**2 for x in range(5)}
# {0:0, 1:1, 2:4, 3:9, 4:16}

# 过滤奇数键
even_dict = {x: x**2 for x in range(5) if x % 2 == 0}
# {0:0, 2:4, 4:16}</code></pre>
        </div>
        <div class="example">
          <p><strong>交换键值</strong></p>
          <pre><code>original = {'a':1, 'b':2}
swapped = {v: k for k, v in original.items()}
# {1:'a', 2:'b'}</code></pre>
        </div>
        <div class="note">
          <span class="label">📌 场景</span> 数据转换、过滤字典、反转键值对
        </div>
      </div>

      <!-- 集合推导式 -->
      <div class="card">
        <div class="card-header">
          <span class="icon">⚙️</span>
          <h2>集合推导式</h2>
          <span class="badge">Set Comprehension</span>
        </div>
        <div class="syntax">
          <code>{表达式 for 变量 in 可迭代对象 if 条件}</code>
        </div>
        <div class="example">
          <p><strong>基础示例</strong></p>
          <pre><code># 生成平方集合（自动去重）
squares_set = {x**2 for x in [-2,-1,0,1,2]}
# {0,1,4}

# 筛选字母
words = ['hello', 'world', 'python']
unique_chars = {char for word in words for char in word if char not in 'aeiou'}
# {'h','l','w','r','d','p','y','t','n'}</code></pre>
        </div>
        <div class="note">
          <span class="label">📌 场景</span> 去重、元素集合运算、快速生成唯一值
        </div>
      </div>

      <!-- 生成器表达式 -->
      <div class="card">
        <div class="card-header">
          <span class="icon">🌀</span>
          <h2>生成器表达式</h2>
          <span class="badge">Generator Expression</span>
        </div>
        <div class="syntax">
          <code>(表达式 for 变量 in 可迭代对象 if 条件)</code>
        </div>
        <div class="example">
          <p><strong>基础示例</strong></p>
          <pre><code># 惰性求值，节省内存
gen = (x**2 for x in range(10**6))
print(next(gen))  # 0
print(next(gen))  # 1

# 用于函数参数（可省略括号）
total = sum(x**2 for x in range(100))</code></pre>
        </div>
        <div class="advanced">
          <p><strong>对比列表推导式内存</strong></p>
          <pre><code>import sys
list_comp = [x**2 for x in range(1000)]
gen_exp = (x**2 for x in range(1000))
print(sys.getsizeof(list_comp))  # ~8856 字节
print(sys.getsizeof(gen_exp))    # ~112 字节</code></pre>
        </div>
        <div class="note">
          <span class="label">📌 场景</span> 处理大数据流（不能重复迭代）、函数参数（sum/max/min等）
        </div>
      </div>
    </div>

    <!-- 性能对比与注意事项 -->
    <div class="comparison">
      <h2>📊 推导式 vs 传统循环 (性能测试)</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>操作</th>
              <th>列表推导式</th>
              <th>for + append</th>
              <th>速度提升</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>创建 0~9999 平方列表</td>
              <td><code>[x**2 for x in range(10000)]</code></td>
              <td><code>lst=[]\nfor x in range(10000): lst.append(x**2)</code></td>
              <td>约 30% 更快</td>
            </tr>
            <tr>
              <td>带条件过滤</td>
              <td><code>[x for x in data if x>0]</code></td>
              <td><code>for x in data: if x>0: lst.append(x)</code></td>
              <td>约 20-40% 更快</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tips">
        <h3>⚠️ 注意事项</h3>
        <ul>
          <li>避免过长的推导式（超过 3 个循环/条件）—— 可读性下降，改用普通循环</li>
          <li>生成器表达式只能迭代一次，需要重复使用请转为列表</li>
          <li>字典推导式键必须唯一，重复键会覆盖</li>
          <li>条件过滤写在末尾，不支持 elif，可用条件表达式（三目）在表达式中处理</li>
        </ul>
      </div>
    </div>

    <!-- 综合示例 -->
    <div class="summary-example">
      <h2>🎯 综合实战：数据清洗</h2>
      <pre><code>raw_data = [("a", 1), ("b", 2), ("c", 3), ("a", 4)]
# 1. 列表：提取所有数值
values = [v for _, v in raw_data]                 # [1,2,3,4]
# 2. 字典：键小写，值乘以 2（去重）
result_dict = {k.lower(): v*2 for k, v in raw_data}  # {'a':8, 'b':4, 'c':6}
# 3. 集合：所有不同首字母
first_letters = {k[0] for k, _ in raw_data}      # {'a','b','c'}
# 4. 生成器：对数值求和（惰性）
total = sum(v for _, v in raw_data)               # 10</code></pre>
    </div>

    <footer class="footer">
      <p>✨ 推导式让代码更清晰，但勿滥用 — 保持可读性与性能的平衡</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
</script>

<style lang="less" scoped>
.comprehensions-guide {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fafcff;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, monospace;
}

.hero {
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, #10b981);
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
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  transition: 0.1s;

  &:hover {
    border-color: #10b981;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;

  .icon {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0;
    color: #0f172a;
  }

  .badge {
    background: #eef2ff;
    color: #1e40af;
    font-size: 0.6rem;
    padding: 0.15rem 0.6rem;
    border-radius: 20px;
    margin-left: auto;
  }
}

.syntax {
  background: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.4rem;
  text-align: center;
  font-family: monospace;
  font-size: 0.75rem;
  margin-bottom: 1rem;

  code {
    background: none;
  }
}

.example,
.advanced {
  margin: 1rem 0;

  p {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  pre {
    background: #1e293b;
    color: #e2e8f0;
    border-radius: 0.5rem;
    padding: 0.5rem;
    overflow-x: auto;
    font-size: 0.7rem;
    margin: 0;
  }

  code {
    font-family: 'Fira Code', monospace;
  }
}

.note {
  background: #fefce8;
  border-left: 3px solid #eab308;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  margin-top: 0.8rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.comparison {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  margin: 1.5rem 0;

  h2 {
    font-size: 1.2rem;
    margin: 0 0 0.8rem;
  }

  .table-wrapper {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.75rem;

      th,
      td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #eef2f6;
      }

      th {
        background: #f8fafc;
        font-weight: 600;
      }

      code {
        background: #f1f5f9;
        padding: 0.1rem 0.2rem;
        border-radius: 4px;
      }
    }
  }

  .tips {
    margin-top: 1rem;

    h3 {
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    ul {
      margin: 0;
      padding-left: 1.2rem;

      li {
        font-size: 0.7rem;
        margin: 0.2rem 0;
        color: #334155;
      }
    }
  }
}

.summary-example {
  background: #1e293b;
  border-radius: 1rem;
  padding: 1rem;
  color: #e2e8f0;

  h2 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
    color: white;
  }

  pre {
    margin: 0;
    font-size: 0.7rem;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', monospace;
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
  .comprehensions-guide {
    padding: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
