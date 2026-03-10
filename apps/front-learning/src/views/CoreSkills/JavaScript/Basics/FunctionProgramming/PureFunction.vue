<template>
  <div class="function-guide">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <h1>纯函数与偏函数</h1>
      <p class="subtitle">JavaScript 函数式编程的核心概念</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 纯函数部分 -->
      <section class="pure-function-section">
        <h2 class="section-title">
          <span class="section-icon">🧼</span>
          <span>纯函数 (Pure Function)</span>
        </h2>

        <div class="definition-card">
          <h3>概念</h3>
          <p>纯函数是指满足以下两个条件的函数：</p>
          <ol>
            <li><strong>相同输入总是返回相同输出</strong> - 不依赖外部状态</li>
            <li><strong>无副作用</strong> - 不修改外部状态</li>
          </ol>
        </div>

        <div class="code-comparison">
          <div class="code-example good">
            <h4>纯函数示例</h4>
            <pre><code>// 纯函数
function add(a, b) {
  return a + b;
}

// 纯函数
function squareAll(numbers) {
  return numbers.map(n => n * n);
}</code></pre>
            <div class="advantages">
              <h5>优点</h5>
              <ul>
                <li>可预测性强</li>
                <li>易于测试</li>
                <li>可缓存结果</li>
                <li>便于并发执行</li>
              </ul>
            </div>
          </div>

          <div class="code-example bad">
            <h4>非纯函数示例</h4>
            <pre><code>// 非纯函数 - 依赖外部变量
let base = 10;
function addToBase(num) {
  return base + num;
}

// 非纯函数 - 有副作用
function addToArray(item, array) {
  array.push(item);
  return array;
}</code></pre>
            <div class="disadvantages">
              <h5>问题</h5>
              <ul>
                <li>结果不可预测</li>
                <li>难以测试</li>
                <li>可能产生隐藏的bug</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="use-case-card">
          <h3>使用场景</h3>
          <ul>
            <li>Redux reducer 函数</li>
            <li>数据处理和转换</li>
            <li>数学计算</li>
            <li>React 函数组件</li>
          </ul>
        </div>
      </section>

      <!-- 偏函数部分 -->
      <section class="partial-function-section">
        <h2 class="section-title">
          <span class="section-icon">🎯</span>
          <span>偏函数 (Partial Function)</span>
        </h2>

        <div class="definition-card">
          <h3>概念</h3>
          <p>偏函数是指固定一个函数的部分参数，产生一个参数更少的新函数的技术。</p>
          <p>它是函数柯里化的一种简单形式。</p>
        </div>

        <div class="implementation">
          <div class="implementation-example">
            <h4>手动实现偏函数</h4>
            <pre><code>// 原始函数
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

// 偏函数应用
function greetWithHello(name) {
  return greet('Hello', name);
}

console.log(greetWithHello('Alice')); // "Hello, Alice!"</code></pre>
          </div>

          <div class="implementation-example">
            <h4>通用偏函数工具</h4>
            <pre><code>// 偏函数工具函数
function partial(fn, ...fixedArgs) {
  return (...remainingArgs) =>
    fn(...fixedArgs, ...remainingArgs);
}

// 使用示例
const greetWithHi = partial(greet, 'Hi');
console.log(greetWithHi('Bob')); // "Hi, Bob!"</code></pre>
          </div>
        </div>

        <div class="advantages-card">
          <h3>优点</h3>
          <ul>
            <li><strong>参数复用</strong> - 减少重复参数传递</li>
            <li><strong>函数特化</strong> - 创建更专用的函数</li>
            <li><strong>提高可读性</strong> - 函数名可以表达固定参数</li>
            <li><strong>组合性</strong> - 便于函数组合</li>
          </ul>
        </div>

        <div class="use-case-card">
          <h3>使用场景</h3>
          <ul>
            <li>事件处理函数预设参数</li>
            <li>API请求配置预设</li>
            <li>日志函数预设级别</li>
            <li>配置预设的工具函数</li>
          </ul>
        </div>
      </section>

      <!-- 结合使用 -->
      <section class="combination-section">
        <h2 class="section-title">
          <span class="section-icon">✨</span>
          <span>纯函数 + 偏函数</span>
        </h2>

        <div class="combination-example">
          <h3>最佳实践示例</h3>
          <pre><code>// 纯函数
function createUrl(baseUrl, endpoint, queryParams) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${baseUrl}/${endpoint}?${queryString}`;
}

// 为特定API创建偏函数
const createApiUrl = partial(
  createUrl,
  'https://api.example.com'
);

// 使用
const userUrl = createApiUrl('users', { page: 1, limit: 10 });
// "https://api.example.com/users?page=1&limit=10"

const productUrl = createApiUrl('products', { category: 'books' });
// "https://api.example.com/products?category=books"</code></pre>

          <div class="benefits">
            <h4>结合使用的优势</h4>
            <ul>
              <li>纯函数保证可预测性和无副作用</li>
              <li>偏函数提供便利性和代码复用</li>
              <li>组合后既灵活又可靠</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2>关键总结</h2>
        <div class="summary-content">
          <div class="summary-grid">
            <div class="summary-item">
              <h3>纯函数</h3>
              <ul>
                <li>相同输入 ⇒ 相同输出</li>
                <li>无副作用</li>
                <li>函数式编程基础</li>
                <li>易于测试和推理</li>
              </ul>
            </div>

            <div class="summary-item">
              <h3>偏函数</h3>
              <ul>
                <li>固定部分参数</li>
                <li>创建更专用函数</li>
                <li>参数复用</li>
                <li>提高代码表达力</li>
              </ul>
            </div>
          </div>

          <div class="final-tip">
            <p>在实际开发中，尽量编写纯函数，并使用偏函数技术提高代码复用性和可读性！</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加一些交互逻辑
</script>

<style scoped lang="less">
@primary-color: #4f46e5;
@secondary-color: #7c3aed;
@text-color: #1e293b;
@light-bg: #f8fafc;
@border-color: #e2e8f0;
@radius: 8px;
@shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

.function-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: @primary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  color: @primary-color;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid @border-color;

  .section-icon {
    font-size: 1.3rem;
  }
}

.definition-card {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 20px;
  margin-bottom: 20px;

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  ol,
  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .code-example {
    background: white;
    border-radius: @radius;
    box-shadow: @shadow;
    padding: 15px;

    &.good {
      border-top: 4px solid #10b981;
    }

    &.bad {
      border-top: 4px solid #ef4444;
    }

    h4 {
      margin-top: 0;
      color: @text-color;
    }

    pre {
      background: #1e293b;
      border-radius: 4px;
      padding: 12px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: #e2e8f0;
      }
    }

    .advantages,
    .disadvantages {
      margin-top: 15px;

      h5 {
        margin: 10px 0 5px;
        font-size: 1rem;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }
      }
    }

    .advantages {
      color: #10b981;
    }

    .disadvantages {
      color: #ef4444;
    }
  }
}

.use-case-card {
  background: @light-bg;
  border-radius: @radius;
  padding: 20px;

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
    }
  }
}

.partial-function-section {
  .implementation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .implementation-example {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 15px;

      h4 {
        margin-top: 0;
        color: @text-color;
      }

      pre {
        background: #1e293b;
        border-radius: 4px;
        padding: 12px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #e2e8f0;
        }
      }
    }
  }

  .advantages-card {
    background: rgba(79, 70, 229, 0.1);
    border-radius: @radius;
    padding: 20px;
    margin: 20px 0;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
        font-weight: 500;
      }
    }
  }
}

.combination-section {
  .combination-example {
    background: white;
    border-radius: @radius;
    box-shadow: @shadow;
    padding: 20px;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    pre {
      background: #1e293b;
      border-radius: 4px;
      padding: 12px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        color: #e2e8f0;
      }
    }

    .benefits {
      margin-top: 20px;

      h4 {
        margin: 15px 0 10px;
        color: @text-color;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}

.summary-section {
  background: @light-bg;
  border-radius: @radius;
  padding: 25px;

  h2 {
    color: @primary-color;
    margin-top: 0;
    text-align: center;
  }

  .summary-content {
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 20px 0;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .summary-item {
        background: white;
        border-radius: @radius;
        box-shadow: @shadow;
        padding: 20px;

        h3 {
          margin-top: 0;
          color: @secondary-color;
          text-align: center;
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 8px;
          }
        }
      }
    }

    .final-tip {
      background: rgba(79, 70, 229, 0.1);
      padding: 15px;
      border-radius: @radius;
      border-left: 4px solid @primary-color;
      margin-top: 20px;
      text-align: center;

      p {
        margin: 0;
        color: @primary-color;
        font-weight: 500;
      }
    }
  }
}

@media (max-width: 768px) {
  .function-guide {
    padding: 15px;
  }

  .hero-section {
    h1 {
      font-size: 2rem;
    }
  }
}
</style>