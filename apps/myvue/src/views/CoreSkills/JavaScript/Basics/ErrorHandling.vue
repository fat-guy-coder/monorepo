<template>
  <div class="error-handling-container">
    <header class="header">
      <h1 class="title">JavaScript 错误处理详解</h1>
      <p class="subtitle">全面掌握错误类型、捕获机制与自定义错误处理</p>
    </header>

    <div class="content-grid">
      <!-- 错误类型 -->
      <section class="card error-types">
        <h2 class="section-title">错误类型</h2>
        <div class="error-grid">
          <div v-for="error in errorTypes" :key="error.name" class="error-card">
            <div class="error-icon" :class="error.name.toLowerCase()">
              <span class="icon">!</span>
            </div>
            <div class="error-info">
              <h3 class="error-name">{{ error.name }}</h3>
              <p class="error-desc">{{ error.description }}</p>
              <div class="error-example">
                <pre><code>{{ error.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 错误信息 -->
      <section class="card error-info">
        <h2 class="section-title">错误信息</h2>
        <div class="error-props">
          <div class="prop-card">
            <div class="prop-name">name</div>
            <div class="prop-desc">错误类型的名称</div>
            <pre class="prop-example"><code>console.error(err.name); // "TypeError"</code></pre>
          </div>
          <div class="prop-card">
            <div class="prop-name">message</div>
            <div class="prop-desc">人类可读的错误描述</div>
            <pre class="prop-example"><code>console.error(err.message); // "Cannot read property 'x' of undefined"</code></pre>
          </div>
          <div class="prop-card">
            <div class="prop-name">stack</div>
            <div class="prop-desc">错误发生时的调用栈</div>
            <pre class="prop-example"><code>console.error(err.stack);
// "TypeError: Cannot read property 'x' of undefined\n
//    at myFunction (script.js:10:5)\n
//    at anotherFunction (script.js:15:3)"</code></pre>
          </div>
          <div class="prop-card">
            <div class="prop-name">cause</div>
            <div class="prop-desc">原始错误对象（ES2022）</div>
            <pre class="prop-example"><code>try {
  // ...
} catch (err) {
  throw new Error('Processing failed', { cause: err });
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 错误捕获 -->
      <section class="card error-catching">
        <h2 class="section-title">错误捕获方式</h2>
        <div class="catching-methods">
          <div class="method-card">
            <div class="method-icon">{} try/catch</div>
            <h3 class="method-name">块级捕获</h3>
            <pre class="method-code"><code>try {
  // 可能出错的代码
  riskyOperation();
} catch (err) {
  // 处理错误
  console.error('操作失败:', err.message);
} finally {
  // 清理操作
  cleanup();
}</code></pre>
          </div>

          <div class="method-card">
            <div class="method-icon">🌐 全局捕获</div>
            <h3 class="method-name">全局错误处理</h3>
            <pre class="method-code"><code>// 同步错误捕获
window.onerror = (msg, url, line, col, error) => {
  console.error(`全局错误: ${msg} at ${line}:${col}`);
  return true; // 阻止默认错误提示
};

// 未处理Promise错误
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的Promise拒绝:', event.reason);
  event.preventDefault(); // 阻止默认错误提示
});</code></pre>
          </div>

          <div class="method-card">
            <div class="method-icon">⏳ Promise.catch</div>
            <h3 class="method-name">Promise错误处理</h3>
            <pre class="method-code"><code>fetch('/api/data')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(err => {
    console.error('API请求失败:', err);
  });

// async/await方式
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('数据加载失败:', err);
    throw err; // 可选：重新抛出错误
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 自定义错误 -->
      <section class="card custom-errors">
        <h2 class="section-title">自定义错误</h2>
        <div class="custom-error-content">
          <div class="custom-example">
            <h3>创建自定义错误类</h3>
            <pre><code>class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.timestamp = new Date();
  }

  toString() {
    return `${this.name}: ${this.message} (${this.field})`;
  }
}

// 使用自定义错误
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("用户名不能为空", "name");
  }
  if (user.age < 18) {
    throw new ValidationError("用户年龄不足18岁", "age");
  }
}</code></pre>
          </div>

          <div class="custom-benefits">
            <h3>自定义错误的优势</h3>
            <ul>
              <li>创建特定领域的错误类型</li>
              <li>携带额外的上下文信息</li>
              <li>实现统一的错误处理</li>
              <li>增强错误信息的可读性</li>
              <li>支持错误分类和统计</li>
            </ul>

            <div class="usage-tips">
              <h3>使用建议</h3>
              <ol>
                <li>为特定错误场景创建子类</li>
                <li>添加有意义的错误信息</li>
                <li>包含必要的上下文数据</li>
                <li>考虑实现toJSON()方法用于序列化</li>
                <li>在错误边界处统一处理自定义错误</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>JavaScript错误处理最佳实践 | 提供清晰的错误信息 | 确保应用稳定性</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 错误类型数据
const errorTypes = [
  {
    name: "Error",
    description: "所有错误对象的基类，用于通用错误",
    example: "throw new Error('发生错误');"
  },
  {
    name: "SyntaxError",
    description: "语法错误，通常由代码解析问题引起",
    example: "JSON.parse('{invalid json}');"
  },
  {
    name: "TypeError",
    description: "类型错误，当值不是预期类型时发生",
    example: "null.someProperty;"
  },
  {
    name: "ReferenceError",
    description: "引用错误，当引用未声明的变量时发生",
    example: "console.log(undeclaredVar);"
  },
  {
    name: "RangeError",
    description: "范围错误，当值超出有效范围时发生",
    example: "new Array(-1);"
  },
  {
    name: "URIError",
    description: "URI错误，当URI处理函数使用不当时发生",
    example: "decodeURIComponent('%');"
  },
  {
    name: "AggregateError",
    description: "聚合错误，包含多个错误（ES2021）",
    example: "Promise.any([rejectedPromise]);"
  },
  {
    name: "EvalError",
    description: "eval()函数相关错误（现代JS中较少使用）",
    example: "eval = 42; // 严格模式下"
  }
];
</script>

<style lang="less" scoped>

:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --success: #4cc9f0;
  --danger: #f72585;
  --warning: #fca311;
  --info: #2ec4b6;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.error-handling-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f4 100%);
  min-height: 100vh;
  color: #333;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: white;
  color: #212529;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--primary);
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;

  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    font-weight: 400;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.8rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--light-gray);
  color: var(--secondary);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--primary);
    border-radius: 3px;
  }
}

// 错误类型样式
.error-types {
  grid-column: span 2;

  .error-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;
  }

  .error-card {
    display: flex;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      border-color: var(--primary-light);
    }
  }

  .error-icon {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;

    &.error { background: var(--danger); }
    &.syntaxerror { background: var(--warning); }
    &.typeerror { background: #9d4edd; }
    &.referenceerror { background: #ff6b6b; }
    &.rangeerror { background: #ff9e00; }
    &.urierror { background: #06d6a0; }
    &.aggregateerror { background: #3a86ff; }
    &.evalerror { background: #8338ec; }
  }

  .error-info {
    flex: 1;
    padding: 1rem;

    .error-name {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark);
    }

    .error-desc {
      margin: 0 0 0.8rem;
      color: var(--gray);
      font-size: 0.95rem;
    }

    .error-example {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 0.6rem;
      overflow-x: auto;

      pre {
        margin: 0;
        font-size: 0.85rem;
      }

      code {
        color: var(--secondary);
      }
    }
  }
}

// 错误信息样式
.error-info {
  .error-props {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
  }

  .prop-card {
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 1.2rem;
    transition: var(--transition);

    &:hover {
      border-color: var(--info);
      background: #f8fdff;
    }

    .prop-name {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: var(--primary);
    }

    .prop-desc {
      color: var(--gray);
      font-size: 0.95rem;
      margin-bottom: 1rem;
      min-height: 40px;
    }

    .prop-example {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 0.8rem;
      font-size: 0.85rem;
      overflow-x: auto;

      code {
        color: #d63384;
      }
    }
  }
}

// 错误捕获样式
.error-catching {
  grid-column: span 2;

  .catching-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .method-card {
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 1.5rem;
    transition: var(--transition);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    .method-icon {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }

    .method-name {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 1rem;
      color: var(--dark);
    }

    .method-code {
      background: #2d3748;
      color: #e2e8f0;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      font-size: 0.9rem;

      code {
        color: #a0aec0;
      }
    }
  }
}

// 自定义错误样式
.custom-errors {
  grid-column: span 2;

  .custom-error-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .custom-example {
    pre {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;
      border-left: 4px solid var(--primary);

      code {
        color: #2b2d42;
      }
    }
  }

  .custom-benefits {
    background: #f0f7ff;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      color: var(--primary);
    }

    ul, ol {
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    .usage-tips {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px dashed #c5d5f0;

      ol {
        counter-reset: tip-counter;
        list-style: none;
        padding-left: 0;

        li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.8rem;

          &::before {
            counter-increment: tip-counter;
            content: counter(tip-counter);
            position: absolute;
            left: 0;
            top: 0;
            background: var(--primary);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  font-weight: 500;
  color: var(--gray);
  margin-top: 2rem;
}
</style>
