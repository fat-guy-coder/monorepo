<template>
  <div class="es-object-container">
    <header class="header">
      <h1>JavaScript Object 特性介绍</h1>
      <p class="subtitle">ES6+ 中的对象增强特性</p>
    </header>

    <div class="intro-section">
      <p>
        JavaScript 中的 Object 是语言中最基础的数据结构之一。ES6
        及后续版本为对象字面量添加了许多便利特性，使代码更简洁、更具表现力。
      </p>
    </div>

    <section class="feature-section">
      <h2 class="section-title">
        <span class="icon">✨</span>
        对象字面量增强
      </h2>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>属性简写</h3>
          <pre><code class="language-javascript">// ES5
const name = 'Alice';
const user = {
  name: name,
  age: 25
};

// ES6+
const user = {
  name,  // 同名属性可简写
  age: 25
};</code></pre>
          <div class="feature-desc">
            <p>当属性名和变量名相同时，可以省略重复的值，使代码更简洁。</p>
            <p class="advantage">优势：减少冗余代码，提高可读性</p>
          </div>
        </div>

        <div class="feature-card">
          <h3>方法简写</h3>
          <pre><code class="language-javascript">// ES5
const obj = {
  sayHello: function() {
    console.log('Hello');
  }
};

// ES6+
const obj = {
  sayHello() {  // 省略 function 关键字
    console.log('Hello');
  }
};</code></pre>
          <div class="feature-desc">
            <p>对象方法的定义可以省略 <code>function</code> 关键字，语法更简洁。</p>
            <p class="advantage">优势：更接近类方法的语法，一致性更好</p>
          </div>
        </div>

        <div class="feature-card">
          <h3>计算属性名</h3>
          <pre><code class="language-javascript">// ES5
var prop = 'name';
var obj = {};
obj[prop] = 'Alice';

// ES6+
const prop = 'name';
const obj = {
  [prop]: 'Alice',  // 动态计算属性名
  ['user_' + prop]: 'Alice'  // 支持表达式
};</code></pre>
          <div class="feature-desc">
            <p>允许在对象字面量中使用 <code>[]</code> 计算属性名，支持动态属性名。</p>
            <p class="advantage">优势：更灵活的属性定义方式</p>
          </div>
        </div>
      </div>
    </section>

    <section class="feature-section">
      <h2 class="section-title">
        <span class="icon">🔍</span>
        动态属性访问
      </h2>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>属性访问方式</h3>
          <pre><code class="language-javascript">const obj = { name: 'Alice', age: 25 };

// 点表示法
console.log(obj.name); // 'Alice'

// 方括号表示法
const prop = 'name';
console.log(obj[prop]); // 'Alice' (动态访问)</code></pre>
          <div class="feature-desc">
            <p>ES 提供了两种属性访问方式：</p>
            <ul>
              <li><strong>点表示法</strong> - 适用于已知属性名</li>
              <li><strong>方括号表示法</strong> - 支持动态属性名访问</li>
            </ul>
          </div>
        </div>

        <div class="feature-card">
          <h3>可选链操作符 (?.)</h3>
          <pre><code class="language-javascript">const user = {
  profile: {
    name: 'Alice'
  }
};

// 传统方式
const name = user && user.profile && user.profile.name;

// ES2020 可选链
const name = user?.profile?.name; // 'Alice'
const missing = user?.missingProp?.name; // undefined</code></pre>
          <div class="feature-desc">
            <p>可选链操作符 <code>?.</code> 可以安全地访问嵌套属性，避免因中间属性不存在而报错。</p>
            <p class="advantage">优势：简化深层属性访问，避免冗长的防御性代码</p>
          </div>
        </div>
      </div>
    </section>

    <section class="feature-section">
      <h2 class="section-title">
        <span class="icon">⚡</span>
        性能与最佳实践
      </h2>

      <div class="performance-grid">
        <div class="perf-card">
          <h3>对象字面量 vs 构造函数</h3>
          <div class="perf-comparison">
            <div class="perf-method">
              <h4>字面量方式</h4>
              <pre><code class="language-javascript">const obj = {
  prop1: 'value1',
  prop2: 'value2'
};</code></pre>
              <p class="perf-advantage">✅ 创建更快</p>
              <p class="perf-advantage">✅ 解析更快</p>
            </div>
            <div class="perf-method">
              <h4>构造函数方式</h4>
              <pre><code class="language-javascript">const obj = new Object();
obj.prop1 = 'value1';
obj.prop2 = 'value2';</code></pre>
              <p class="perf-disadvantage">❌ 创建较慢</p>
              <p class="perf-disadvantage">❌ 解析较慢</p>
            </div>
          </div>
          <div class="perf-conclusion">
            <p>
              在大多数 JavaScript 引擎中，对象字面量的创建和访问性能优于使用
              <code>new Object()</code> 构造函数。
            </p>
          </div>
        </div>

        <div class="perf-card">
          <h3>属性访问优化</h3>
          <div class="perf-tips">
            <div class="tip">
              <h4>隐藏类优化</h4>
              <p>始终以相同顺序初始化对象属性，帮助 JavaScript 引擎优化属性访问。</p>
              <pre><code class="language-javascript">// 好 - 属性顺序一致
function createUser(name, age) {
  return { name, age };
}

// 不好 - 属性顺序不一致
function createUser(name, age) {
  return Math.random() > 0.5 ?
    { name, age } :
    { age, name };
}</code></pre>
            </div>
            <div class="tip">
              <h4>避免删除属性</h4>
              <p>
                使用 <code>delete</code> 操作符会破坏隐藏类优化，考虑设置为 <code>null</code> 或
                <code>undefined</code> 代替。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="feature-section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        其他实用特性
      </h2>

      <div class="other-features">
        <div class="feature-card">
          <h3>对象展开运算符</h3>
          <pre><code class="language-javascript">const defaults = { mode: 'light', fontSize: 16 };
const userSettings = { fontSize: 18 };

// ES2018 对象展开
const settings = {
  ...defaults,
  ...userSettings
};
// { mode: 'light', fontSize: 18 }</code></pre>
          <div class="feature-desc">
            <p>
              对象展开运算符 <code>...</code> 可以浅拷贝对象属性，非常适合合并对象或创建新对象。
            </p>
          </div>
        </div>

        <div class="feature-card">
          <h3>属性简写与解构</h3>
          <pre><code class="language-javascript">const name = 'Alice';
const age = 25;

// 属性简写创建对象
const user = { name, age };

// 对象解构提取值
const { name: userName, age: userAge } = user;
console.log(userName); // 'Alice'</code></pre>
          <div class="feature-desc">
            <p>结合属性简写和对象解构，可以优雅地在对象和数据之间转换。</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>ES6+ 的对象增强特性使 JavaScript 代码更简洁、更具表现力，同时保持良好的性能。</p>
      <div class="links">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer"
          target="_blank"
          class="link-button"
          >MDN 文档</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
.es-object-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
  color: #1a1a1a;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro-section {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-size: 1.1rem;
  }

  .feature-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;

      .icon {
        margin-right: 0.75rem;
        font-size: 1.5rem;
      }
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    pre {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 0 0 1rem 0;
      color: #334155;
      border: 1px solid #e2e8f0;

      code {
        font-family: inherit;
      }
    }

    .feature-desc {
      p {
        margin: 0.5rem 0;
        color: #4a5568;
      }

      .advantage {
        color: #2b6cb0;
        font-weight: 500;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0.75rem 0;

        li {
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  .performance-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    .perf-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #2c3e50;
      }

      .perf-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .perf-method {
          h4 {
            font-size: 1.1rem;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 1rem;
            color: #4a5568;
          }

          pre {
            background-color: #f8fafc;
            padding: 1rem;
            border-radius: 6px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            margin: 0 0 1rem 0;
            color: #334155;
            border: 1px solid #e2e8f0;
          }

          .perf-advantage {
            color: #38a169;
            font-weight: 500;
            margin: 0.5rem 0;
          }

          .perf-disadvantage {
            color: #e53e3e;
            font-weight: 500;
            margin: 0.5rem 0;
          }
        }
      }

      .perf-conclusion {
        p {
          margin: 0;
          color: #4a5568;
          font-style: italic;
        }
      }

      .perf-tips {
        .tip {
          margin-bottom: 1.5rem;

          h4 {
            font-size: 1.1rem;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 0.75rem;
            color: #4a5568;
          }

          p {
            margin: 0.5rem 0;
            color: #4a5568;
          }

          pre {
            background-color: #f8fafc;
            padding: 1rem;
            border-radius: 6px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            margin: 1rem 0 0 0;
            color: #334155;
            border: 1px solid #e2e8f0;
          }
        }
      }
    }
  }

  .other-features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;

    p {
      color: #4a5568;
      margin-bottom: 1.5rem;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .link-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #4299e1;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background-color: #2b6cb0;
      }
    }
  }
}
</style>
