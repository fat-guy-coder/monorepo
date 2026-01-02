<template>
  <div class="closure-container">
    <header class="header">
      <h1>JavaScript闭包介绍</h1>
      <p class="subtitle">理解闭包的概念、原理、应用场景及注意事项</p>
    </header>

    <div class="content-wrapper">
      <section class="definition">
        <h2><span class="icon">📚</span> 闭包定义</h2>
        <div class="card">
          <p>
            闭包(Closure)是指那些能够访问自由变量的函数。自由变量是指在函数中使用的，既不是函数参数也不是函数局部变量的变量。
          </p>
          <p>
            简单来说：闭包是由函数以及创建该函数的词法环境组合而成，这个环境包含了这个闭包创建时所能访问的所有局部变量。
          </p>
          <div class="code-block">
            <pre><code>function outer() {
  let outerVar = '外部变量';

  function inner() {
    console.log(outerVar); // 访问外部函数的变量
  }

  return inner;
}

const closureFunc = outer();
closureFunc(); // 输出: "外部变量"</code></pre>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="principle">
          <h2><span class="icon">🔬</span> 闭包原理</h2>
          <div class="card">
            <h3>作用域链</h3>
            <p>JavaScript采用词法作用域（静态作用域），函数的作用域在函数定义时就确定了。</p>

            <h3>内存管理</h3>
            <p>
              当函数执行完毕后，其执行上下文会被销毁，但如果函数内部定义了内部函数，且内部函数引用了外部函数的变量，这些变量不会被销毁，形成闭包。
            </p>

            <div class="illustration">
              <div class="scope-chain">
                <div class="global-scope">
                  <div class="scope-label">全局作用域</div>
                  <div class="variable">outerFunc</div>
                </div>
                <div class="arrow">↓</div>
                <div class="outer-scope">
                  <div class="scope-label">outer函数作用域</div>
                  <div class="variable">outerVar</div>
                  <div class="variable">innerFunc</div>
                </div>
                <div class="arrow">↓</div>
                <div class="inner-scope">
                  <div class="scope-label">inner函数作用域</div>
                </div>
              </div>
              <div class="closure-note">inner函数通过作用域链访问outerVar</div>
            </div>
          </div>
        </section>

        <section class="usage">
          <h2><span class="icon">🛠️</span> 创建闭包的方式</h2>
          <div class="card">
            <div class="method">
              <h3>1. 函数返回函数</h3>
              <div class="code-block">
                <pre><code>function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
              </div>
            </div>

            <div class="method">
              <h3>2. 立即执行函数(IIFE)</h3>
              <div class="code-block">
                <pre><code>const uniqueId = (function() {
  let id = 0;
  return function() {
    return id++;
  };
})();

console.log(uniqueId()); // 0
console.log(uniqueId()); // 1</code></pre>
              </div>
            </div>

            <div class="method">
              <h3>3. 事件处理函数</h3>
              <div class="code-block">
                <pre><code>function setupButtons() {
  const buttons = document.querySelectorAll('button');

  for (var i = 0; i < buttons.length; i++) {
    (function(index) {
      buttons[index].addEventListener('click', function() {
        console.log('按钮 ' + index + ' 被点击');
      });
    })(i);
  }
}</code></pre>
              </div>
            </div>

            <div class="method">
              <h3>4. 推入数组中</h3>
              <div class="code-block">
                <pre><code>const arr = [];
 function createCounter() {
  let count = 0;
   arr.push(function() {
    count++;
    console.log(count)
  })
}
createCounter();
arr[0](); // 1
arr[0](); // 2
arr[0](); // 3

</code></pre>
              </div>
            </div>
            <div class="method">
              <h3>5. 放进对象中</h3>
              <div class="code-block">
                <pre><code>const obj = {};
 function createCounter() {
  let count = 0;
   obj.count = function() {
    count++;
    console.log(count)
  }
}
createCounter();
obj.count(); // 1
obj.count(); // 2
obj.count(); // 3

</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="scenarios">
        <h2><span class="icon">💼</span> 闭包的使用场景</h2>
        <div class="card-grid">
          <div class="scenario-card">
            <h3>1. 数据封装与私有变量</h3>
            <p>实现类似私有成员的功能，隐藏实现细节</p>
            <div class="code-block">
              <pre><code>function createPerson(name) {
  let _name = name;

  return {
    getName: () => _name,
    setName: (newName) => { _name = newName; }
  };
}

const person = createPerson('Alice');
console.log(person.getName()); // Alice
person.setName('Bob');
console.log(person.getName()); // Bob</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <h3>2. 函数柯里化</h3>
            <p>将多参数函数转换为一系列单参数函数</p>
            <div class="code-block">
              <pre><code>function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <h3>3. 模块模式</h3>
            <p>创建独立的作用域，避免全局污染</p>
            <div class="code-block">
              <pre><code>const Calculator = (function() {
  let memory = 0;

  function add(x) { memory += x; }
  function subtract(x) { memory -= x; }
  function getResult() { return memory; }
  function clear() { memory = 0; }

  return { add, subtract, getResult, clear };
})();

Calculator.add(5);
Calculator.subtract(2);
console.log(Calculator.getResult()); // 3</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <h3>4. 缓存结果</h3>
            <p>存储计算结果避免重复计算</p>
            <div class="code-block">
              <pre><code>function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

const factorial = memoize(n => {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

console.log(factorial(5)); // 120 (计算)
console.log(factorial(5)); // 120 (从缓存读取)</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="pros-cons">
        <h2><span class="icon">⚖️</span> 闭包的优缺点</h2>
        <div class="comparison">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li><strong>数据封装：</strong>创建私有变量，避免全局污染</li>
              <li><strong>状态保持：</strong>函数执行后仍能保持内部状态</li>
              <li><strong>模块化开发：</strong>实现模块模式，组织代码结构</li>
              <li><strong>函数工厂：</strong>动态生成具有特定行为的函数</li>
              <li><strong>实现高阶函数：</strong>如柯里化、函数组合等</li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点与注意事项</h3>
            <ul>
              <li><strong>内存消耗：</strong>闭包会保持外部函数变量的引用，导致内存无法释放</li>
              <li><strong>内存泄漏：</strong>不当使用可能导致内存泄漏，尤其是在DOM环境中</li>
              <li><strong>性能问题：</strong>过度使用闭包可能影响性能（作用域链查找）</li>
              <li><strong>调试困难：</strong>闭包中的变量值可能不如预期，增加调试难度</li>
              <li><strong>循环引用：</strong>在旧版IE中可能导致内存泄漏问题</li>
            </ul>
          </div>
        </div>

        <div class="optimization">
          <h3>优化建议</h3>
          <ul>
            <li>避免在闭包中引用大对象或不必要的变量</li>
            <li>在不需要时手动解除引用（如将闭包赋值为null）</li>
            <li>使用事件委托减少事件处理函数的数量</li>
            <li>谨慎在循环中创建闭包，使用块级作用域变量(let)</li>
            <li>使用开发者工具监控内存使用情况</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>
        闭包是JavaScript中强大且常用的特性，理解其原理和正确使用方式对于编写高质量代码至关重要。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件不需要额外的逻辑，仅用于展示闭包相关信息
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.closure-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, @primary-color, #1a5276);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @secondary-color;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid @primary-color;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 10px;
  }
}

h3 {
  font-size: 1.4rem;
  color: @primary-color;
  margin: 15px 0 10px;
}

.card {
  background-color: @card-bg;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @primary-color;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;

  pre {
    margin: 0;
  }

  code {
    color: #2c3e50;
    line-height: 1.4;
  }
}

// 作用域链图示
.illustration {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  border: 1px dashed @primary-color;

  .scope-chain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px 0;

    .global-scope,
    .outer-scope,
    .inner-scope {
      background-color: #e3f2fd;
      border: 2px solid @primary-color;
      border-radius: 8px;
      padding: 15px;
      min-width: 180px;
      position: relative;
    }

    .outer-scope {
      background-color: #bbdefb;
    }

    .inner-scope {
      background-color: #90caf9;
    }

    .scope-label {
      font-weight: bold;
      margin-bottom: 10px;
      color: @secondary-color;
    }

    .variable {
      background-color: #fff;
      padding: 5px 10px;
      margin: 5px 0;
      border-radius: 4px;
      font-family: 'Source Code Pro', monospace;
      font-size: 0.9rem;
      border: 1px solid #ddd;
    }

    .arrow {
      margin: 0 20px;
      font-size: 1.5rem;
      color: @primary-color;
      font-weight: bold;
    }
  }

  .closure-note {
    font-style: italic;
    color: @secondary-color;
    margin-top: 10px;
  }
}

// 使用场景网格
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .scenario-card {
    background-color: @card-bg;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }

    h3 {
      color: @secondary-color;
      margin-top: 0;
    }
  }
}

// 优缺点比较
.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      background-color: @card-bg;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .pros {
      border-left: 4px solid @success-color;
    }

    .cons {
      border-left: 4px solid @warning-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: -15px;
          color: @primary-color;
          font-weight: bold;
        }
      }
    }
  }

  .optimization {
    background-color: #e8f5e9;
    border-left: 4px solid @success-color;
    border-radius: 8px;
    padding: 20px;

    h3 {
      color: @success-color;
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 15px;
  }
}
</style>
