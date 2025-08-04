<template>
  <div class="function-params-container">
    <!-- 标题区域 -->
    <header class="header">
      <h1>JavaScript 函数参数详解</h1>
      <p>掌握参数默认值、Rest 参数、Arguments 对象、形参与实参</p>
    </header>

    <!-- 核心概念速查 -->
    <div class="quick-reference">
      <div class="concept-card">
        <div class="concept-icon">🔤</div>
        <h3>形参 (Parameters)</h3>
        <p>函数定义时声明的变量</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">🔢</div>
        <h3>实参 (Arguments)</h3>
        <p>函数调用时传入的值</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">🔄</div>
        <h3>参数默认值</h3>
        <p>未提供参数时的默认值</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">📦</div>
        <h3>Rest 参数</h3>
        <p>收集剩余参数的数组</p>
      </div>
      <div class="concept-card">
        <div class="concept-icon">🧾</div>
        <h3>Arguments 对象</h3>
        <p>包含所有参数的类数组对象</p>
      </div>
    </div>

    <!-- 形参与实参 -->
    <div class="section">
      <div class="section-header">
        <div class="icon">🔤</div>
        <h2>形参与实参</h2>
      </div>

      <div class="content-card">
        <div class="definition">
          <h3>形参 (Parameters)</h3>
          <p>函数定义时声明的变量，作为函数内部的局部变量使用</p>
          <pre><code>function greet(name) { // 'name' 是形参
  console.log(`Hello, ${name}!`);
}</code></pre>
        </div>

        <div class="definition">
          <h3>实参 (Arguments)</h3>
          <p>函数调用时传入的实际值</p>
          <pre><code>greet('Alice'); // 'Alice' 是实参
greet('Bob');   // 'Bob' 是实参</code></pre>
        </div>

        <div class="comparison">
          <div class="comparison-item">
            <h4>形参与实参关系</h4>
            <div class="relation-diagram">
              <div class="function-declaration">
                <span>function</span>
                <span class="func-name">sum</span>
                <span>(</span>
                <span class="param">a</span>
                <span>,</span>
                <span class="param">b</span>
                <span>)</span>
              </div>
              <div class="arrow">↓</div>
              <div class="function-call">
                <span class="func-name">sum</span>
                <span>(</span>
                <span class="arg">5</span>
                <span>,</span>
                <span class="arg">10</span>
                <span>)</span>
              </div>
              <div class="arrow">↓</div>
              <div class="result">
                <span>a = 5, b = 10</span>
              </div>
            </div>
          </div>

          <div class="comparison-item">
            <h4>关键注意事项</h4>
            <ul class="notes">
              <li>实参数量可以少于形参数量（未传递的参数值为 <code>undefined</code>）</li>
              <li>实参数量可以多于形参数量（多余的实参可通过 <code>arguments</code> 访问）</li>
              <li>参数按位置传递，而不是按名称</li>
              <li>JavaScript 中所有参数传递都是按值传递</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 参数默认值 -->
    <div class="section">
      <div class="section-header">
        <div class="icon">🔄</div>
        <h2>参数默认值</h2>
      </div>

      <div class="content-card">
        <div class="method-description">
          <h3>基本用法</h3>
          <p>当参数未传递或值为 <code>undefined</code> 时使用默认值</p>
          <pre><code>function createUser(name, role = 'user') {
  console.log(`Name: ${name}, Role: ${role}`);
}

createUser('Alice');           // Name: Alice, Role: user
createUser('Bob', 'admin');    // Name: Bob, Role: admin
createUser('Charlie', null);   // Name: Charlie, Role: null</code></pre>
        </div>

        <div class="method-description">
          <h3>表达式作为默认值</h3>
          <p>默认值可以是任意表达式，甚至是函数调用</p>
          <pre><code>function getDefaultRole() {
  return 'user';
}

function createAccount(username, role = getDefaultRole(),
                      createdAt = new Date()) {
  console.log(`${username} (${role}) created at ${createdAt}`);
}

createAccount('Alice');
// Alice (user) created at [当前时间]</code></pre>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h4>适用场景</h4>
            <ul>
              <li>可选参数配置</li>
              <li>减少函数内部的条件判断</li>
              <li>提高代码可读性</li>
              <li>API 设计中提供合理的默认行为</li>
            </ul>
          </div>

          <div class="cons">
            <h4>注意事项</h4>
            <ul>
              <li>默认值只对 <code>undefined</code> 有效，对 <code>null</code> 无效</li>
              <li>默认值在每次函数调用时重新计算</li>
              <li>默认参数会形成自己的作用域</li>
              <li>默认参数后不能再有无默认值的参数</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest 参数 -->
    <div class="section">
      <div class="section-header">
        <div class="icon">📦</div>
        <h2>Rest 参数</h2>
      </div>

      <div class="content-card">
        <div class="method-description">
          <h3>基本用法</h3>
          <p>使用 <code>...</code> 语法将剩余参数收集到数组中</p>
          <pre><code>function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));     // 6
console.log(sum(4, 5, 6, 7));  // 22</code></pre>
        </div>

        <div class="method-description">
          <h3>结合常规参数</h3>
          <p>Rest 参数必须是最后一个形参</p>
          <pre><code>function join(separator, ...items) {
  return items.join(separator);
}

console.log(join('-', 'a', 'b', 'c'));  // 'a-b-c'
console.log(join(' ', 'Hello', 'world')); // 'Hello world'</code></pre>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h4>适用场景</h4>
            <ul>
              <li>处理可变数量参数的函数</li>
              <li>替代 arguments 对象</li>
              <li>函数式编程中的参数处理</li>
              <li>简化参数传递</li>
            </ul>
          </div>

          <div class="cons">
            <h4>注意事项</h4>
            <ul>
              <li>每个函数只能有一个 Rest 参数</li>
              <li>Rest 参数必须是最后一个参数</li>
              <li>Rest 参数会收集所有剩余参数</li>
              <li>箭头函数没有 arguments 对象，只能使用 Rest 参数</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Arguments 对象 -->
    <div class="section">
      <div class="section-header">
        <div class="icon">🧾</div>
        <h2>Arguments 对象</h2>
      </div>

      <div class="content-card">
        <div class="method-description">
          <h3>基本用法</h3>
          <p>函数内部可访问的类数组对象，包含所有传入参数</p>
          <pre><code>function logArguments() {
  console.log('Arguments count:', arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argument ${i}:`, arguments[i]);
  }
}

logArguments('a', 'b', 123);
// Arguments count: 3
// Argument 0: a
// Argument 1: b
// Argument 2: 123</code></pre>
        </div>

        <div class="method-description">
          <h3>与 Rest 参数的区别</h3>
          <pre><code>function legacySum() {
  // 使用 arguments 对象
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

function modernSum(...numbers) {
  // 使用 Rest 参数
  return numbers.reduce((total, num) => total + num, 0);
}</code></pre>
        </div>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Arguments 对象</th>
                <th>Rest 参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>类型</td>
                <td>类数组对象</td>
                <td>真正的数组</td>
              </tr>
              <tr>
                <td>包含所有参数</td>
                <td>是</td>
                <td>只包含剩余参数</td>
              </tr>
              <tr>
                <td>箭头函数中可用</td>
                <td>❌ 不可用</td>
                <td>✅ 可用</td>
              </tr>
              <tr>
                <td>数组方法支持</td>
                <td>需要转换</td>
                <td>直接支持</td>
              </tr>
              <tr>
                <td>现代代码推荐</td>
                <td>❌ 不推荐</td>
                <td>✅ 推荐</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pros-cons">
          <div class="cons">
            <h4>注意事项</h4>
            <ul>
              <li>Arguments 对象不是真正的数组，需转换才能使用数组方法</li>
              <li>严格模式中修改 arguments 不会影响实际参数</li>
              <li>箭头函数没有自己的 arguments 对象</li>
              <li>现代 JavaScript 中推荐使用 Rest 参数替代</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 综合示例 -->
    <div class="section">
      <div class="section-header">
        <div class="icon">🚀</div>
        <h2>综合应用示例</h2>
      </div>

      <div class="content-card">
        <div class="example">
          <h3>高级参数处理函数</h3>
          <pre><code>function processData(name,
                   options = { color: 'blue', size: 'medium' },
                   ...data) {

  // 处理参数默认值
  const { color, size } = options;

  console.log(`Processing data for ${name}`);
  console.log(`Options: Color - ${color}, Size - ${size}`);

  // 处理 Rest 参数
  if (data.length > 0) {
    console.log('Additional data:', data);
    const sum = data.reduce((acc, val) => acc + val, 0);
    console.log(`Data sum: ${sum}`);
  }

  // 使用 arguments 对象（仅用于演示，实际不推荐）
  console.log(`Total arguments: ${arguments.length}`);
}

// 函数调用
processData('Alice', { color: 'red' }, 10, 20, 30);

/* 输出:
Processing data for Alice
Options: Color - red, Size - medium
Additional data: [10, 20, 30]
Data sum: 60
Total arguments: 4
*/</code></pre>
        </div>

        <div class="best-practices">
          <h3>最佳实践总结</h3>
          <div class="practices-grid">
            <div class="practice">
              <div class="icon">1️⃣</div>
              <p>优先使用 Rest 参数替代 arguments 对象</p>
            </div>
            <div class="practice">
              <div class="icon">2️⃣</div>
              <p>为可选参数设置合理的默认值</p>
            </div>
            <div class="practice">
              <div class="icon">3️⃣</div>
              <p>避免修改 arguments 对象</p>
            </div>
            <div class="practice">
              <div class="icon">4️⃣</div>
              <p>参数顺序：必需参数 > 默认参数 > Rest 参数</p>
            </div>
            <div class="practice">
              <div class="icon">5️⃣</div>
              <p>在箭头函数中只能使用 Rest 参数</p>
            </div>
            <div class="practice">
              <div class="icon">6️⃣</div>
              <p>使用对象参数处理多个可选参数</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript 函数参数详解 | 掌握参数处理的核心技术</p>
      <p>© 2023 JavaScript 高级编程指南</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@success-color: #27ae60;
@warning-color: #e74c3c;
@header-gradient: linear-gradient(135deg, #6a11cb, #2575fc);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.function-params-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 20px;
  background: @header-gradient;
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
}

.quick-reference {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: @text-color;
  }

  p {
    color: #7f8c8d;
    font-size: 1rem;
  }
}

.section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, @primary-color, #8e44ad);
    color: white;
    border-radius: 50%;
  }

  h2 {
    font-size: 1.9rem;
    color: @text-color;
  }
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.definition {
  margin-bottom: 30px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.comparison {
  display: flex;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .comparison-item {
    flex: 1;
  }
}

.relation-diagram {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  font-family: 'Fira Code', monospace;
  text-align: center;
  font-size: 1.2rem;

  .function-declaration,
  .function-call,
  .result {
    margin: 15px 0;
  }

  .param {
    color: @primary-color;
    font-weight: 700;
  }

  .arg {
    color: @secondary-color;
    font-weight: 700;
  }

  .func-name {
    font-weight: 700;
  }

  .arrow {
    color: #7f8c8d;
    margin: 10px 0;
  }
}

.notes {
  list-style: none;
  padding: 0;

  li {
    padding: 12px 0;
    border-bottom: 1px dashed @border-color;
    padding-left: 30px;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: 15px;
      top: 12px;
      color: @primary-color;
      font-weight: 700;
    }

    &:last-child {
      border-bottom: none;
    }

    code {
      background: #f1f1f1;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.method-description {
  margin-bottom: 30px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  padding: 20px;
  border-radius: 10px;

  h4 {
    margin-bottom: 15px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      padding-left: 25px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 10px;
        top: 10px;
        color: @primary-color;
      }
    }
  }
}

.pros {
  background: rgba(39, 174, 96, 0.08);
  border-left: 4px solid @success-color;

  h4 {
    color: darken(@success-color, 10%);

    &::before {
      background: @success-color;
    }
  }
}

.cons {
  background: rgba(231, 76, 60, 0.08);
  border-left: 4px solid @warning-color;

  h4 {
    color: darken(@warning-color, 10%);

    &::before {
      background: @warning-color;
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 30px 0;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
      color: @text-color;
    }

    tbody tr {
      &:nth-child(odd) {
        background: rgba(240, 244, 248, 0.5);
      }

      &:hover {
        background: rgba(52, 152, 219, 0.08);
      }
    }
  }
}

.example {
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }
}

.best-practices {
  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: @text-color;
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.practice {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 15px;

  .icon {
    font-size: 1.5rem;
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 50%;
  }

  p {
    line-height: 1.6;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: #7f8c8d;
  font-size: 1rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .quick-reference {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
