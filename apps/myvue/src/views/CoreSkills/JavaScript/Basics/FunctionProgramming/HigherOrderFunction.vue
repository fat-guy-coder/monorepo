<template>
  <div class="high-order-container">
    <header class="header">
      <h1 class="title">JavaScript 高阶函数</h1>
      <div class="subtitle">函数式编程的核心概念</div>
    </header>

    <div class="content">
      <div class="card concept">
        <div class="card-header">
          <div class="icon">ƒ</div>
          <h2>高阶函数概念</h2>
        </div>
        <div class="card-content">
          <p>高阶函数（Higher-order function）是函数式编程的核心概念之一，满足以下任一条件：</p>
          <ul>
            <li>接受一个或多个函数作为输入参数</li>
            <li>返回一个新的函数作为输出</li>
          </ul>
          <div class="code-example">
            <pre><code>// 1. 接收函数作为参数
function operateOnArray(arr, operation) {
  return arr.map(operation);
}

// 2. 返回函数
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}</code></pre>
          </div>
        </div>
      </div>

      <div class="card use-cases">
        <div class="card-header">
          <div class="icon">💡</div>
          <h2>常见使用场景</h2>
        </div>
        <div class="card-content">
          <div class="scenario">
            <h3>数组操作</h3>
            <p>map, filter, reduce 是典型的高阶函数</p>
            <div class="code-example">
              <pre><code>const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x * x); // [1, 4, 9, 16, 25]
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15</code></pre>
            </div>
          </div>

          <div class="scenario">
            <h3>函数组合</h3>
            <p>创建更复杂的行为组合</p>
            <div class="code-example">
              <pre><code>const compose = (...fns) =>
  x => fns.reduceRight((v, f) => f(v), x);

const toUpperCase = str => str.toUpperCase();
const exclaim = str => str + '!';

const shout = compose(exclaim, toUpperCase);
shout('hello'); // "HELLO!"</code></pre>
            </div>
          </div>

          <div class="scenario">
            <h3>事件处理</h3>
            <p>创建可配置的事件处理器</p>
            <div class="code-example">
              <pre><code>function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const infoLogger = createLogger('INFO');
infoLogger('Application started'); // [INFO] Application started</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="card pros-cons">
        <div class="card-header">
          <div class="icon">⚖️</div>
          <h2>优点与缺点</h2>
        </div>
        <div class="card-content">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li><strong>代码复用</strong> - 避免重复代码，提高开发效率</li>
              <li><strong>抽象能力</strong> - 隐藏实现细节，专注业务逻辑</li>
              <li><strong>可组合性</strong> - 像乐高积木一样组合功能</li>
              <li><strong>声明式编程</strong> - 代码更易读，更接近自然语言</li>
              <li><strong>易于测试</strong> - 纯函数更易于单元测试</li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li><strong>学习曲线</strong> - 对初学者理解较困难</li>
              <li><strong>调试难度</strong> - 多层函数调用增加调试复杂度</li>
              <li><strong>性能开销</strong> - 额外的函数调用可能带来轻微性能损失</li>
              <li><strong>过度抽象</strong> - 可能导致代码可读性下降</li>
              <li><strong>内存使用</strong> - 闭包可能导致内存占用增加</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card best-practices">
        <div class="card-header">
          <div class="icon">🌟</div>
          <h2>最佳实践</h2>
        </div>
        <div class="card-content">
          <ul>
            <li>为高阶函数和返回的函数提供清晰的命名</li>
            <li>保持函数职责单一，避免过度嵌套</li>
            <li>优先使用纯函数，减少副作用</li>
            <li>合理使用箭头函数简化代码</li>
            <li>适当添加类型注解（TypeScript）提高可维护性</li>
            <li>使用函数组合替代深度嵌套的回调</li>
          </ul>
          <div class="code-example">
            <pre><code>// TypeScript 中的高阶函数类型
type StringModifier = (s: string) => string;

function createPrefixer(prefix: string): StringModifier {
  return (str: string) => `${prefix}${str}`;
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>高阶函数是函数式编程的基石，合理使用可以显著提高代码质量和开发效率</p>
      <p>在Vue3中，组合式API的设计也受到了高阶函数思想的启发</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这个组件是纯展示型的，不需要业务逻辑
// 实际项目中可以在这里添加交互功能

</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap');

:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --danger: #e74c3c;
  --warning: #f39c12;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --gray: #95a5a6;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.high-order-container {
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  color: var(--dark);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

  .title {
    font-size: 3.5rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    color: var(--gray);
    font-weight: 300;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  &-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(to right, var(--primary), #3a7bd5);
    color: white;

    .icon {
      font-size: 2rem;
      margin-right: 1rem;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  &-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.4rem;
      margin: 1.5rem 0 1rem;
      color: var(--primary);
      position: relative;
      padding-bottom: 0.5rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 3px;
        background: var(--secondary);
      }
    }

    p,
    li {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }

    li {
      margin-bottom: 0.8rem;
      position: relative;

      &::before {
        content: '•';
        color: var(--secondary);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }
}

// 卡片类型特定样式
.concept .card-header {
  background: linear-gradient(to right, #3498db, #3a7bd5);
}

.use-cases .card-header {
  background: linear-gradient(to right, #2ecc71, #27ae60);
}

.pros-cons .card-header {
  background: linear-gradient(to right, #f39c12, #e67e22);
}

.best-practices .card-header {
  background: linear-gradient(to right, #9b59b6, #8e44ad);
}

.code-example {
  background: #2c3e50;
  color: var(--light);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    white-space: pre-wrap;
  }

  code {
    color: #f8f8f2;
  }
}

.pros-cons {
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    >div {
      flex: 1;
      min-width: 250px;
    }
  }

  .pros li::before {
    color: var(--secondary);
  }

  .cons li::before {
    color: var(--danger);
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  font-size: 1.1rem;
  color: var(--gray);

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      font-style: italic;
      color: var(--dark);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    .title {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .content {
    grid-template-columns: 1fr;
  }
}
</style>