<template>
  <div class="callback-container">
    <header class="header">
      <h1>JavaScript 回调函数介绍</h1>
      <p>深入理解回调机制的核心概念与应用实践</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <h2>回调函数概念</h2>
        <div class="definition">
          <p>回调函数是作为参数传递给另一个函数的函数，在特定条件满足或操作完成后被调用执行。</p>
          <div class="analogy">
            <div class="analogy-item">
              <div class="analogy-icon">📞</div>
              <div class="analogy-content">
                <h3>函数式编程基础</h3>
                <p>JavaScript 中函数是一等公民，可以作为参数传递</p>
              </div>
            </div>
            <div class="analogy-item">
              <div class="analogy-icon">🔄</div>
              <div class="analogy-content">
                <h3>控制反转</h3>
                <p>调用方决定何时执行函数，而不是定义方</p>
              </div>
            </div>
          </div>
        </div>
        <div class="basic-example">
          <h3>基本语法</h3>
          <pre><code>// 定义回调函数
function greeting(name) {
  console.log(`Hello, ${name}!`);
}

// 接收回调作为参数
function processUser(callback) {
  const name = 'Alice';
  callback(name); // 调用回调
}

// 使用回调
processUser(greeting); // 输出: Hello, Alice!</code></pre>
        </div>
      </section>

      <!-- 作用部分 -->
      <section class="card roles">
        <h2>回调函数的作用</h2>
        <div class="roles-grid">
          <div class="role-card">
            <div class="role-icon">⏳</div>
            <h3>异步操作</h3>
            <p>处理非阻塞操作的结果</p>
          </div>
          <div class="role-card">
            <div class="role-icon">🎛️</div>
            <h3>事件处理</h3>
            <p>响应用户交互或系统事件</p>
          </div>
          <div class="role-card">
            <div class="role-icon">🔄</div>
            <h3>迭代控制</h3>
            <p>在数组方法中处理每个元素</p>
          </div>
          <div class="role-card">
            <div class="role-icon">🧩</div>
            <h3>代码复用</h3>
            <p>通用逻辑注入特定行为</p>
          </div>
        </div>
      </section>

      <!-- 使用方法 -->
      <section class="card usage">
        <h2>回调函数的使用方法</h2>
        <div class="usage-types">
          <div class="usage-type">
            <h3>同步回调</h3>
            <p>立即执行的回调函数</p>
            <pre><code>const numbers = [1, 2, 3];

// Array.map 使用同步回调
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]</code></pre>
          </div>
          <div class="usage-type">
            <h3>异步回调</h3>
            <p>延迟执行的回调函数</p>
            <pre><code>// setTimeout 使用异步回调
setTimeout(() => {
  console.log('2秒后执行');
}, 2000);

// 文件读取的异步回调
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});</code></pre>
          </div>
        </div>
        <div class="error-handling">
          <h3>错误处理模式</h3>
          <pre><code>// Node.js 错误优先回调模式
function asyncOperation(callback) {
  try {
    // 执行操作...
    const result = doSomething();
    callback(null, result); // 成功
  } catch (error) {
    callback(error); // 错误
  }
}

// 使用回调
asyncOperation((err, data) => {
  if (err) {
    console.error('操作失败:', err);
    return;
  }
  console.log('操作成功:', data);
});</code></pre>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card scenarios">
        <h2>常见使用场景</h2>
        <div class="scenario-list">
          <div class="scenario-item">
            <div class="scenario-icon">🌐</div>
            <div class="scenario-content">
              <h3>AJAX请求</h3>
              <p>处理API响应数据</p>
            </div>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">⏱️</div>
            <div class="scenario-content">
              <h3>定时操作</h3>
              <p>setTimeout/setInterval</p>
            </div>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">📁</div>
            <div class="scenario-content">
              <h3>文件操作</h3>
              <p>读写文件完成处理</p>
            </div>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🎮</div>
            <div class="scenario-content">
              <h3>事件监听</h3>
              <p>DOM事件处理</p>
            </div>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🔄</div>
            <div class="scenario-content">
              <h3>数组迭代</h3>
              <p>forEach, map, filter等</p>
            </div>
          </div>
          <div class="scenario-item">
            <div class="scenario-icon">🔧</div>
            <div class="scenario-content">
              <h3>插件/库扩展</h3>
              <p>自定义库行为</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="card pros-cons">
        <div class="pros">
          <h2>优点</h2>
          <ul>
            <li>实现异步编程的基础模式</li>
            <li>代码简单直观，易于理解</li>
            <li>浏览器兼容性好</li>
            <li>适用于事件驱动编程</li>
            <li>支持高阶函数和函数组合</li>
          </ul>
        </div>
        <div class="cons">
          <h2>缺点</h2>
          <ul>
            <li>回调地狱（嵌套回调难以维护）</li>
            <li>错误处理复杂（需手动传播错误）</li>
            <li>控制流难以追踪</li>
            <li>代码可读性随嵌套增加而降低</li>
            <li>缺乏内置的取消机制</li>
          </ul>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practices">
        <h2>回调函数最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="practice-number">1</div>
            <h3>命名回调函数</h3>
            <p>使用命名函数而非匿名函数提高可读性</p>
          </div>
          <div class="practice">
            <div class="practice-number">2</div>
            <h3>错误优先模式</h3>
            <p>遵循Node.js错误优先回调约定</p>
          </div>
          <div class="practice">
            <div class="practice-number">3</div>
            <h3>模块化处理</h3>
            <p>将复杂回调拆分为独立函数</p>
          </div>
          <div class="practice">
            <div class="practice-number">4</div>
            <h3>避免深度嵌套</h3>
            <p>使用async库或Promise处理多层回调</p>
          </div>
          <div class="practice">
            <div class="practice-number">5</div>
            <h3>保持简洁</h3>
            <p>单一职责原则，每个回调只做一件事</p>
          </div>
          <div class="practice">
            <div class="practice-number">6</div>
            <h3>Promise替代</h3>
            <p>在复杂场景中使用Promise/async-await</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>回调函数是JavaScript异步编程的基石，合理使用可提高代码灵活性，但需警惕回调地狱问题</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.callback-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.2rem;
    margin: 0 0 10px;
    color: #2b6cb0;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 22px;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #2b6cb0;
    padding-bottom: 12px;
    border-bottom: 2px solid #ebf4ff;
  }
}

/* 概念部分样式 */
.concept {
  .definition {
    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
      line-height: 1.7;
    }
  }

  .analogy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;

    .analogy-item {
      display: flex;
      align-items: flex-start;
      background: #f0f9ff;
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid #63b3ed;
    }

    .analogy-icon {
      font-size: 1.8rem;
      margin-right: 12px;
      min-width: 40px;
    }

    h3 {
      margin: 0 0 8px;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: #4a5568;
    }
  }

  .basic-example {
    h3 {
      font-size: 1.1rem;
      margin: 0 0 12px;
      color: #4a5568;
      font-weight: 500;
    }

    pre {
      background: #edf2f7;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin: 0;
      font-size: 0.95rem;

      code {
        color: #2d3748;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      }
    }
  }
}

/* 作用部分样式 */
.roles {
  .roles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 15px;
  }

  .role-card {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 18px 12px;
    text-align: center;
    transition: all 0.2s ease;

    &:hover {
      background: #ebf8ff;
      border-color: #bee3f8;
    }

    .role-icon {
      font-size: 2rem;
      margin-bottom: 12px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.1rem;
      margin: 0 0 8px;
      color: #2b6cb0;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      color: #4a5568;
    }
  }
}

/* 使用方法样式 */
.usage {
  .usage-types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .usage-type {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 8px;
      color: #2b6cb0;
    }

    p {
      font-size: 0.95rem;
      color: #4a5568;
      margin: 0 0 12px;
    }

    pre {
      background: #edf2f7;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin: 0;
      font-size: 0.9rem;
    }
  }

  .error-handling {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #2b6cb0;
    }

    pre {
      background: #fffaf0;
      border-left: 3px solid #ecc94b;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin: 0;
      font-size: 0.9rem;
    }
  }
}

/* 使用场景样式 */
.scenarios {
  .scenario-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  .scenario-item {
    display: flex;
    align-items: center;
    background: #f7fafc;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #e2e8f0;

    .scenario-icon {
      font-size: 1.5rem;
      margin-right: 15px;
      min-width: 40px;
      text-align: center;
    }

    h3 {
      font-size: 1.1rem;
      margin: 0 0 5px;
      color: #2b6cb0;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      color: #4a5568;
    }
  }
}

/* 优缺点样式 */
.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    h2 {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }

    ul {
      padding-left: 22px;
      margin: 0;
    }

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 10px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #2b6cb0;
      }
    }
  }

  .pros {
    li::before {
      color: #38a169;
    }
  }

  .cons {
    li::before {
      color: #e53e3e;
    }
  }
}

/* 最佳实践样式 */
.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .practice {
    background: #f0fff4;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    border: 1px solid #c6f6d5;

    .practice-number {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 30px;
      height: 30px;
      background: #38a169;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.15rem;
      margin: 0 0 8px;
      color: #2f855a;
    }

    p {
      font-size: 0.95rem;
      margin: 0;
      color: #4a5568;
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  color: #4a5568;
  margin-top: 20px;
}
</style>
