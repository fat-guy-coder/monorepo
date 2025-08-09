<template>
  <div class="recursion-container">
    <header class="header">
      <h1 class="title">JavaScript 函数递归</h1>
      <p class="subtitle">深入理解递归的概念与应用</p>
    </header>

    <div class="content-section">
      <h2 class="section-title">📚 递归基本概念</h2>
      <div class="concept-card">
        <p>递归是指<strong>函数直接或间接调用自身</strong>的编程技巧。一个递归函数通常包含两部分：</p>
        <div class="recursion-parts">
          <div class="part">
            <div class="part-icon">⏹️</div>
            <h3>基线条件 (Base Case)</h3>
            <p>递归终止的条件，防止无限递归</p>
          </div>
          <div class="part">
            <div class="part-icon">🔁</div>
            <h3>递归条件 (Recursive Case)</h3>
            <p>函数调用自身的条件，向基线条件推进</p>
          </div>
        </div>
        <div class="simple-example">
          <h4>简单示例：计算阶乘</h4>
          <pre><code>function factorial(n) {
  if (n <= 1) return 1; // 基线条件
  return n * factorial(n - 1); // 递归条件
}</code></pre>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">💡 递归的作用与价值</h2>
      <div class="value-grid">
        <div class="value-card">
          <div class="value-icon">✨</div>
          <h3>简化代码</h3>
          <p>用简洁的代码表达复杂的算法逻辑</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌳</div>
          <h3>处理嵌套结构</h3>
          <p>天然适合处理树形、嵌套等递归数据结构</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🧩</div>
          <h3>分治策略</h3>
          <p>将大问题分解为相同的小问题解决</p>
        </div>
        <div class="value-card">
          <div class="value-icon">♾️</div>
          <h3>数学建模</h3>
          <p>直接实现数学中的递归定义和公式</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🛠️ 递归的使用方法</h2>
      <div class="usage-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>定义基线条件</h3>
            <p>确定递归何时应该停止，避免无限递归</p>
            <pre><code>if (n === 0) return 1;</code></pre>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>定义递归条件</h3>
            <p>将问题分解为更小的相同问题</p>
            <pre><code>return n * factorial(n - 1);</code></pre>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>确保向基线推进</h3>
            <p>每次递归调用都更接近基线条件</p>
            <pre><code>// n-1 确保最终会达到 n === 0</code></pre>
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>处理返回值</h3>
            <p>组合或传递递归调用的结果</p>
            <pre><code>return current + recursiveCall(rest);</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🌐 递归的常见应用场景</h2>
      <div class="scenario-grid">
        <div class="scenario-card">
          <h3>数据结构处理</h3>
          <ul>
            <li>树形结构的遍历（DOM树、文件系统）</li>
            <li>链表操作</li>
            <li>图算法（深度优先搜索）</li>
          </ul>
          <pre><code>function traverse(node) {
  // 处理当前节点
  node.children.forEach(child => {
    traverse(child); // 递归处理子节点
  });
}</code></pre>
        </div>
        <div class="scenario-card">
          <h3>数学计算</h3>
          <ul>
            <li>阶乘、斐波那契数列</li>
            <li>组合数学问题</li>
            <li>分形图形生成</li>
          </ul>
          <pre><code>function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}</code></pre>
        </div>
        <div class="scenario-card">
          <h3>算法实现</h3>
          <ul>
            <li>分治算法（快速排序、归并排序）</li>
            <li>回溯算法（八皇后、数独）</li>
            <li>动态规划问题</li>
          </ul>
          <pre><code>function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [], right = [];
  // 分区逻辑...
  return [...quickSort(left), pivot, ...quickSort(right)];
}</code></pre>
        </div>
        <div class="scenario-card">
          <h3>业务逻辑</h3>
          <ul>
            <li>多级菜单渲染</li>
            <li>无限评论嵌套</li>
            <li>权限路由生成</li>
          </ul>
          <pre><code>function renderMenu(items) {
  return items.map(item => (
    &lt;div key={item.id}>
      {item.name}
      {item.children && renderMenu(item.children)}
    &lt;/div>
  ));
}</code></pre>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">⚖️ 递归的优缺点</h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>优点</h3>
          <ul>
            <li><strong>代码简洁</strong> - 用少量代码表达复杂逻辑</li>
            <li><strong>可读性强</strong> - 直接反映问题的递归性质</li>
            <li><strong>分治策略</strong> - 自然分解复杂问题</li>
            <li><strong>函数式友好</strong> - 无副作用，纯函数实现</li>
          </ul>
        </div>
        <div class="cons">
          <h3>缺点</h3>
          <ul>
            <li><strong>性能开销</strong> - 函数调用栈消耗内存</li>
            <li><strong>栈溢出风险</strong> - 深度递归可能导致调用栈溢出</li>
            <li><strong>调试困难</strong> - 多层调用栈难以跟踪</li>
            <li><strong>可能重复计算</strong> - 如斐波那契的朴素递归实现</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">🛡️ 递归优化技巧</h2>
      <div class="optimization-grid">
        <div class="optimization-card">
          <h3>尾调用优化</h3>
          <p>确保递归调用是函数的最后操作</p>
          <pre><code>// 非尾递归
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // 最后操作是乘法
}

// 尾递归优化版
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // 最后操作是递归调用
}</code></pre>
        </div>
        <div class="optimization-card">
          <h3>记忆化 (Memoization)</h3>
          <p>缓存已计算结果避免重复计算</p>
          <pre><code>const memo = {};
function fibonacci(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
  return memo[n];
}</code></pre>
        </div>
        <div class="optimization-card">
          <h3>迭代替代</h3>
          <p>用循环重写递归算法</p>
          <pre><code>// 递归版
function sum(n) {
  if (n === 0) return 0;
  return n + sum(n - 1);
}

// 迭代版
function sum(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}</code></pre>
        </div>
        <div class="optimization-card">
          <h3>尾递归消除</h3>
          <p>使用"蹦床"函数避免栈溢出</p>
          <pre><code>function trampoline(fn) {
  while (typeof fn === 'function') {
    fn = fn();
  }
  return fn;
}

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factorial(n - 1, n * acc);
}

// 使用
trampoline(factorial(100000));</code></pre>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>递归是强大的编程工具，合理使用可以写出优雅高效的代码</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑，如果有的话
</script>

<style lang="less" scoped>

.recursion-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaecef;

  .title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    background: linear-gradient(90deg, #42b983, #3498db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: #2c3e50;
    border-left: 4px solid #42b983;
    padding-left: 0.8rem;
  }
}

.concept-card {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;

    strong {
      color: #e74c3c;
    }
  }
}

.recursion-parts {
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .part {
    flex: 1;
    background-color: #fff;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;
    text-align: center;

    .part-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      margin: 0.5rem 0;
      color: #3498db;
    }

    p {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  }
}

.simple-example {
  margin-top: 1.5rem;

  h4 {
    margin: 0 0 0.8rem;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  pre {
    background-color: #282c34;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      color: #abb2bf;
      font-size: 0.9rem;
    }
  }
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.value-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .value-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin: 0.5rem 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 0;
  }
}

.usage-steps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.step {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #42b983;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 0 0 0.8rem;
  }

  pre {
    background-color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.8rem;
      color: #333;
    }
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.scenario-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    margin: 0 0 0.8rem;
    color: #3498db;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0 0 1rem;

    li {
      margin-bottom: 0.3rem;
      font-size: 0.9rem;
    }
  }

  pre {
    background-color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.8rem;
      color: #333;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .pros, .cons {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #eaecef;

    h3 {
      margin: 0 0 0.8rem;
      color: #2c3e50;
      font-size: 1.2rem;
      border-bottom: 2px solid;
      padding-bottom: 0.5rem;
    }

    ul {
      padding-left: 1.2rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        strong {
          color: #e74c3c;
        }
      }
    }
  }

  .pros h3 {
    border-color: #42b983;
  }

  .cons h3 {
    border-color: #e74c3c;
  }
}

.optimization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.optimization-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h3 {
    margin: 0 0 0.8rem;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 0 0 0.8rem;
  }

  pre {
    background-color: #f8f9fa;
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;

    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.8rem;
      color: #333;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .recursion-container {
    padding: 1rem;
  }

  .value-grid, .usage-steps, .scenario-grid, .optimization-grid {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.8rem;
  }
}
</style>
