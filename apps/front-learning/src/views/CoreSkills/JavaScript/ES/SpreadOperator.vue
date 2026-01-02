<template>
  <div class="spread-operator-container">
    <h1 class="main-title">ES6展开运算符（...）介绍</h1>

    <div class="card concept">
      <h2>概念与定义</h2>
      <p>
        展开运算符（Spread
        Operator）是ES6引入的一种语法，使用三个连续的点（<code>...</code>）表示。它允许在需要多个元素的地方展开可迭代对象（如数组、字符串、Map、Set等）或对象字面量。
      </p>
      <div class="highlight-box">
        <pre><code>// 基本语法
const newArray = [...iterable];
const newObj = { ...object };</code></pre>
      </div>
    </div>

    <div class="usage-grid">
      <div class="card">
        <h2>数组操作</h2>
        <div class="code-block">
          <h3>复制数组</h3>
          <pre><code>const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3]</code></pre>
        </div>

        <div class="code-block">
          <h3>合并数组</h3>
          <pre><code>const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]</code></pre>
        </div>

        <div class="code-block">
          <h3>添加元素</h3>
          <pre><code>const newArr = [0, ...arr1, 3]; // [0, 1, 2, 3]</code></pre>
        </div>

        <div class="code-block">
          <h3>字符串转数组</h3>
          <pre><code>const str = "hello";
const chars = [...str]; // ['h','e','l','l','o']</code></pre>
        </div>
      </div>

      <div class="card">
        <h2>对象操作</h2>
        <div class="code-block">
          <h3>复制对象</h3>
          <pre><code>const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 }; // { a: 1, b: 2 }</code></pre>
        </div>

        <div class="code-block">
          <h3>合并对象</h3>
          <pre><code>const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2 }</code></pre>
        </div>

        <div class="code-block">
          <h3>属性覆盖</h3>
          <pre><code>const obj = { a: 1, b: 2 };
const updated = { ...obj, b: 3 }; // { a: 1, b: 3 }</code></pre>
        </div>

        <div class="code-block">
          <h3>添加新属性</h3>
          <pre><code>const newObj = { ...obj, c: 3 }; // { a:1, b:2, c:3 }</code></pre>
        </div>
      </div>

      <div class="card">
        <h2>函数参数</h2>
        <div class="code-block">
          <h3>替代apply</h3>
          <pre><code>// ES5
Math.max.apply(null, [1, 2, 3]);

// ES6
Math.max(...[1, 2, 3]); // 3</code></pre>
        </div>

        <div class="code-block">
          <h3>可变参数</h3>
          <pre><code>function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
sum(1, 2, 3); // 6</code></pre>
        </div>

        <div class="code-block">
          <h3>组合使用</h3>
          <pre><code>const numbers = [1, 2, 3];
sum(...numbers); // 6</code></pre>
        </div>
      </div>
    </div>

    <div class="card scenarios">
      <h2>适用场景</h2>
      <div class="scenario-grid">
        <div class="scenario-item">
          <div class="icon">📋</div>
          <h3>不可变数据操作</h3>
          <p>在React/Vue中创建新状态而不修改原状态</p>
        </div>

        <div class="scenario-item">
          <div class="icon">🔀</div>
          <h3>数组/对象组合</h3>
          <p>轻松合并多个数组或对象</p>
        </div>

        <div class="scenario-item">
          <div class="icon">🎯</div>
          <h3>函数参数处理</h3>
          <p>将数组元素作为独立参数传递</p>
        </div>

        <div class="scenario-item">
          <div class="icon">🔄</div>
          <h3>状态更新</h3>
          <p>在Redux/Vuex中创建新状态</p>
        </div>

        <div class="scenario-item">
          <div class="icon">🧩</div>
          <h3>解构赋值</h3>
          <p>提取部分元素，保留剩余元素</p>
        </div>

        <div class="scenario-item">
          <div class="icon">📤</div>
          <h3>API数据处理</h3>
          <p>将API响应合并到现有数据</p>
        </div>
      </div>
    </div>

    <div class="pros-cons">
      <div class="card pros">
        <h2>优点</h2>
        <ul>
          <li><span class="highlight">简洁语法</span>：简化数组/对象操作</li>
          <li><span class="highlight">不可变性</span>：支持函数式编程模式</li>
          <li><span class="highlight">代码可读性</span>：比concat/Object.assign更直观</li>
          <li><span class="highlight">灵活性</span>：可在任意位置使用</li>
          <li><span class="highlight">性能优化</span>：现代JS引擎高度优化</li>
          <li><span class="highlight">通用性</span>：支持所有可迭代对象</li>
        </ul>
      </div>

      <div class="card cons">
        <h2>缺点</h2>
        <ul>
          <li><span class="highlight">浅拷贝</span>：只复制第一层，嵌套对象仍是引用</li>
          <li><span class="highlight">兼容性</span>：旧浏览器需要polyfill（如IE）</li>
          <li><span class="highlight">性能问题</span>：大数组/对象可能影响性能</li>
          <li><span class="highlight">属性覆盖</span>：对象合并时同名属性会被覆盖</li>
          <li><span class="highlight">可读性陷阱</span>：过度使用可能降低可读性</li>
        </ul>
      </div>
    </div>

    <div class="card summary">
      <h2>最佳实践总结</h2>
      <div class="tips">
        <div class="tip">
          <div class="tip-icon">✅</div>
          <p>优先使用展开运算符代替concat/slice/Object.assign</p>
        </div>
        <div class="tip">
          <div class="tip-icon">✅</div>
          <p>处理嵌套对象时结合JSON方法或深拷贝库</p>
        </div>
        <div class="tip">
          <div class="tip-icon">✅</div>
          <p>在React/Vue状态更新中创建新引用</p>
        </div>
        <div class="tip">
          <div class="tip-icon">✅</div>
          <p>注意对象合并时的属性顺序</p>
        </div>
        <div class="tip">
          <div class="tip-icon">⛔</div>
          <p>避免在循环中使用大数组展开操作</p>
        </div>
        <div class="tip">
          <div class="tip-icon">⛔</div>
          <p>不要用于不可迭代对象</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑
</script>

<style lang="less" scoped>
.spread-operator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background: #f8fafc;
  line-height: 1.6;

  .main-title {
    text-align: center;
    color: #2563eb;
    margin-bottom: 32px;
    font-weight: 600;
    font-size: 2.2rem;
    border-bottom: 2px solid #dbeafe;
    padding-bottom: 16px;
  }

  .card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    margin-bottom: 24px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    h2 {
      color: #1e40af;
      font-size: 1.6rem;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #dbeafe;
    }
  }

  .concept {
    p {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }

  .highlight-box {
    background: #eff6ff;
    border-left: 4px solid #3b82f6;
    padding: 16px;
    border-radius: 0 4px 4px 0;
    margin-top: 16px;
    overflow-x: auto;

    pre {
      margin: 0;
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 24px;

    .card {
      margin-bottom: 0;
    }

    .code-block {
      margin-bottom: 20px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 1.1rem;
        color: #1e3a8a;
      }

      pre {
        background: #e0e7ff;
        padding: 12px;
        border-radius: 6px;
        overflow-x: auto;
        font-size: 0.95rem;
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          color: #1e40af;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .scenarios {
    .scenario-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .scenario-item {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-3px);
        background: #e0f2fe;
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 12px;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 8px;
        color: #0369a1;
      }

      p {
        margin: 0;
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 12px;
          padding-left: 8px;
        }
      }
    }

    .pros {
      .highlight {
        color: #065f46;
        background: #d1fae5;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 500;
      }
    }

    .cons {
      .highlight {
        color: #b91c1c;
        background: #fee2e2;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 500;
      }
    }
  }

  .summary {
    .tips {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .tip {
      display: flex;
      align-items: flex-start;
      background: #f0fdf4;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #10b981;

      &-icon {
        font-size: 1.4rem;
        margin-right: 12px;
      }

      p {
        margin: 0;
        flex: 1;
      }
    }
  }
}
</style>
