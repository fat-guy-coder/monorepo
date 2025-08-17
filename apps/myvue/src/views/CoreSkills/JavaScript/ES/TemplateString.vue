<template>
  <div class="template-strings-container">
    <div class="header">
      <h1>ES6 模板字符串介绍</h1>
      <p class="subtitle">现代 JavaScript 的字符串处理利器</p>
      <div class="features-badge">
        <span class="feature">多行字符串</span>
        <span class="feature">表达式嵌入</span>
        <span class="feature">标签模板</span>
        <span class="feature">HTML 模板</span>
      </div>
    </div>

    <div class="content-grid">
      <!-- 概念解释 -->
      <div class="card concept-card">
        <div class="card-header">
          <div class="icon">📚</div>
          <h2>模板字符串概念</h2>
        </div>
        <div class="card-content">
          <p>模板字符串是 ES6 引入的一种新的字符串字面量语法，使用反引号（``）来定义字符串。</p>

          <div class="comparison">
            <h3>与传统字符串对比</h3>
            <div class="comparison-row">
              <div class="traditional">
                <h4>传统字符串</h4>
                <pre><code>// 单行字符串
const name = 'John';
const greeting = 'Hello, ' + name + '!';

// 多行字符串
const html = '&lt;div&gt;' +
  '&lt;h1&gt;Title&lt;/h1&gt;' +
  '&lt;p&gt;Content&lt;/p&gt;' +
'&lt;/div&gt;';</code></pre>
              </div>
              <div class="template">
                <h4>模板字符串</h4>
                <pre><code>// 单行字符串
const name = 'John';
const greeting = `Hello, ${name}!`;

// 多行字符串
const html = `
  &lt;div&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
    &lt;p&gt;Content&lt;/p&gt;
  &lt;/div&gt;
`;</code></pre>
              </div>
            </div>
          </div>

          <div class="key-features">
            <h3>核心特性</h3>
            <div class="features">
              <div class="feature">
                <div class="icon">🚀</div>
                <div>
                  <h4>表达式嵌入</h4>
                  <p>使用 ${expression} 嵌入任意 JavaScript 表达式</p>
                </div>
              </div>
              <div class="feature">
                <div class="icon">📝</div>
                <div>
                  <h4>多行支持</h4>
                  <p>保留所有换行和缩进，无需拼接</p>
                </div>
              </div>
              <div class="feature">
                <div class="icon">🏷️</div>
                <div>
                  <h4>标签模板</h4>
                  <p>自定义字符串处理函数</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 基本使用 -->
      <div class="card usage-card">
        <div class="card-header">
          <div class="icon">💻</div>
          <h2>基本使用</h2>
        </div>
        <div class="card-content">
          <div class="usage-section">
            <h3>变量嵌入</h3>
            <pre><code>const name = 'Alice';
const age = 28;

// 传统方式
const info1 = name + ' is ' + age + ' years old';

// 模板字符串
const info2 = `${name} is ${age} years old`;

console.log(info2); // "Alice is 28 years old"</code></pre>
          </div>

          <div class="usage-section">
            <h3>表达式计算</h3>
            <pre><code>const a = 5;
const b = 10;

console.log(`The sum is ${a + b}`); // "The sum is 15"
console.log(`Is a greater? ${a > b ? 'Yes' : 'No'}`); // "Is a greater? No"</code></pre>
          </div>

          <div class="usage-section">
            <h3>多行字符串</h3>
            <pre><code>const poem = `
Roses are red,
Violets are blue,
Sugar is sweet,
And so are you.
`;

console.log(poem);
// 输出:
// Roses are red,
// Violets are blue,
// Sugar is sweet,
// And so are you.</code></pre>
          </div>

          <div class="usage-section">
            <h3>函数调用简写</h3>
            <pre><code>function greet(strings) {
  return strings;
}

console.log(greet`Hello`); // ["Hello"]</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 高级特性 -->
    <div class="card advanced-card">
      <div class="card-header">
        <div class="icon">🚀</div>
        <h2>高级特性：标签模板</h2>
      </div>
      <div class="card-content">
        <div class="explanation">
          <p>标签模板允许你使用函数解析模板字符串，提供强大的自定义处理能力。</p>
          <p>函数签名：<code>function tag(strings, ...values) {}</code></p>
          <ul>
            <li><strong>strings</strong>: 模板中的静态字符串部分数组</li>
            <li><strong>values</strong>: 嵌入表达式的计算结果数组</li>
          </ul>
        </div>

        <div class="examples">
          <div class="example">
            <h3>1. 简单示例</h3>
            <pre><code>function tag(strings, ...values) {
  console.log(strings); // ["Hello ", "! How are you?"]
  console.log(values);  // ["Alice"]

  return strings[0] + values[0].toUpperCase() + strings[1];
}

const name = 'Alice';
const result = tag`Hello ${name}! How are you?`;

console.log(result); // "Hello ALICE! How are you?"</code></pre>
          </div>

          <div class="example">
            <h3>2. HTML 转义</h3>
            <pre><code>function safeHtml(strings, ...values) {
  let result = strings[0];

  values.forEach((value, i) => {
    // 转义特殊字符防止XSS攻击
    const escaped = String(value)
      .replace(/&/g, '&amp;')
      .replace(/&lt;/g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    result += escaped + strings[i + 1];
  });

  return result;
}

const userInput = '&lt; script&gt;alert("XSS")&lt;/script&gt;';
const safeHtml = safeHtml`&lt;div&gt;${userInput}&lt;/div&gt;`;

// 输出: "&lt;div&gt;&lt;script&gt;alert("XSS")&lt;/script&gt;&lt;/div&gt;"</code></pre>
          </div>

          <div class="example">
            <h3>3. 国际化处理</h3>
            <pre><code>function i18n(strings, ...values) {
  // 实际应用中会从语言包获取翻译
  const translations = {
    'Hello': 'Bonjour',
    'Good morning': 'Bonjour',
    'Goodbye': 'Au revoir'
  };

  let result = '';
  strings.forEach((str, i) => {
    // 翻译静态文本部分
    const translated = translations[str.trim()] || str;
    result += translated + (values[i] || '');
  });

  return result;
}

const name = 'Pierre';
const greeting = i18n`Hello ${name}!`; // "Bonjour Pierre!"
const farewell = i18n`Goodbye ${name}!`; // "Au revoir Pierre!"</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="card scenarios-card">
      <div class="card-header">
        <div class="icon">💼</div>
        <h2>使用场景</h2>
      </div>
      <div class="card-content">
        <div class="scenarios-grid">
          <div class="scenario">
            <div class="icon">🖥️</div>
            <h3>HTML 模板</h3>
            <p>生成动态 HTML 内容</p>
            <pre><code>function createCard(title, content) {
  return `
    &lt;div class="card"&gt;
      &lt;h2&gt;${title}&lt;/h2&gt;
      &lt;p&gt;${content}&lt;/p&gt;
    &lt;/div&gt;
  `;
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">📊</div>
            <h3>SQL 查询</h3>
            <p>构建动态 SQL 语句</p>
            <pre><code>function getUserQuery(id, fields = ['*']) {
  return `
    SELECT ${fields.join(', ')}
    FROM users
    WHERE id = ${id}
  `;
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">📧</div>
            <h3>邮件模板</h3>
            <p>创建个性化邮件内容</p>
            <pre><code>function createWelcomeEmail(user) {
  return `
    Dear ${user.name},

    Welcome to our service! Your account details:

    Username: ${user.email}
    Temp password: ${user.tempPassword}

    Regards,
    The Team
  `;
}</code></pre>
          </div>

          <div class="scenario">
            <div class="icon">📝</div>
            <h3>日志消息</h3>
            <p>创建格式化的日志输出</p>
            <pre><code>function logRequest(method, url, status) {
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status}`);
}

// 输出: [2023-08-15T12:30:45.000Z] GET /api/users - 200</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="card best-practices-card">
      <div class="card-header">
        <div class="icon">🏆</div>
        <h2>最佳实践</h2>
      </div>
      <div class="card-content">
        <div class="practices">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>复杂表达式处理</h3>
              <p>避免在模板中放入过于复杂的表达式</p>
              <pre><code>// 不推荐
const message = `Status: ${isLoading ?
  'Loading...' :
  hasError ?
    `Error: ${error.message}` :
    `Data: ${data.length} items`}`;

// 推荐
const status = isLoading
  ? 'Loading...'
  : hasError
    ? `Error: ${error.message}`
    : `Data: ${data.length} items`;

const message = `Status: ${status}`;</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>HTML 安全性</h3>
              <p>用户输入内容必须转义，防止 XSS 攻击</p>
              <pre><code>// 危险！容易导致XSS攻击
const userContent = userInput; // 可能包含恶意脚本
const unsafeHtml = `&lt;div&gt;${userContent}&lt;/div&gt;`;

// 安全做法：使用标签模板转义
const safeHtml = escapeHtml`&lt;div&gt;${userContent}&lt;/div&gt;`;</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>性能优化</h3>
              <p>避免在循环中创建大型模板字符串</p>
              <pre><code>// 不推荐：每次迭代都创建新字符串
const items = [/* 大数组 */];
let html = '';
items.forEach(item => {
  html += `&lt;div&gt;${item.name}&lt;/div&gt;`;
});

// 推荐：使用数组和join()
const itemsHtml = items.map(item =>
  `&lt;div&gt;${item.name}&lt;/div&gt;`
).join('');</code></pre>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>国际化支持</h3>
              <p>使用标签模板实现多语言支持</p>
              <pre><code>// 定义多语言模板
const messages = {
  welcome: {
    en: name => `Welcome, ${name}!`,
    fr: name => `Bienvenue, ${name}!`,
    es: name => `¡Bienvenido, ${name}!`
  }
};

// 根据语言选择模板
function getMessage(lang, key, ...args) {
  const template = messages[key][lang] || messages[key].en;
  return template(...args);
}

// 使用
const greeting = getMessage('fr', 'welcome', 'Pierre');
// "Bienvenue, Pierre!"</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="card support-card">
      <div class="card-header">
        <div class="icon">🌐</div>
        <h2>浏览器支持</h2>
      </div>
      <div class="card-content">
        <div class="support-info">
          <p>模板字符串在现代浏览器中得到了广泛支持：</p>

          <div class="browser-support">
            <div class="browser">
              <div class="name">Chrome</div>
              <div class="version">41+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Firefox</div>
              <div class="version">34+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Safari</div>
              <div class="version">9+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Edge</div>
              <div class="version">12+</div>
              <div class="status supported">✅</div>
            </div>
            <div class="browser">
              <div class="name">Node.js</div>
              <div class="version">4.0.0+</div>
              <div class="status supported">✅</div>
            </div>
          </div>

          <div class="legacy-note">
            <h3>旧浏览器支持</h3>
            <p>
              对于不支持 ES6 的旧浏览器，可以使用 Babel
              等转译工具将模板字符串转换为传统字符串拼接语法。
            </p>
            <pre><code>// 转译前
const greeting = `Hello, ${name}!`;

// 转译后（ES5）
var greeting = "Hello, " + name + "!";</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="conclusion">
      <h2>模板字符串总结</h2>
      <div class="summary">
        <p>ES6 模板字符串彻底改变了 JavaScript 中的字符串处理方式，提供了更简洁、更强大的语法：</p>
        <ul>
          <li>简化了字符串拼接和变量嵌入</li>
          <li>原生支持多行字符串，提高代码可读性</li>
          <li>通过标签模板实现高级字符串处理功能</li>
          <li>广泛应用于 HTML 生成、SQL 查询、国际化等场景</li>
        </ul>
      </div>
      <div class="recommendation">
        <div class="icon">💡</div>
        <p>在现代 JavaScript 开发中，应优先使用模板字符串替代传统字符串拼接</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不需要复杂逻辑，主要是展示内容
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.template-strings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-light;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}

.features-badge {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;

  .feature {
    padding: 0.4rem 1rem;
    background-color: fade(@primary-color, 15%);
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;

  .icon {
    font-size: 1.8rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.card-content {
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
}

.concept-card {
  .comparison {
    background-color: @light-bg;
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;

    .comparison-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .traditional,
      .template {
        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 0.5rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }

      .template {
        pre code {
          color: #4ec9b0; // 模板字符串特殊颜色
        }
      }
    }
  }

  .key-features {
    .features {
      display: grid;
      gap: 1rem;

      .feature {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background-color: fade(@success-color, 10%);
        border-radius: 8px;
        border-left: 3px solid @success-color;

        .icon {
          font-size: 1.5rem;
        }

        h4 {
          margin: 0 0 0.3rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-light;
        }
      }
    }
  }
}

.usage-card {
  .usage-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  }
}

.advanced-card {
  margin-bottom: 2rem;

  .explanation {
    background-color: fade(@accent-color, 10%);
    border-radius: 8px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    border-left: 3px solid @accent-color;

    p {
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    code {
      background-color: fade(@text-dark, 10%);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }

  .examples {
    .example {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      pre {
        background-color: #2d2d2d;
        border-radius: 6px;
        padding: 1rem;
        overflow-x: auto;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.scenarios-card {
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .scenario {
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1.2rem;
      text-align: center;

      .icon {
        font-size: 2rem;
        margin-bottom: 0.8rem;
      }

      h3 {
        margin: 0 0 0.5rem;
      }

      p {
        margin: 0 0 1rem;
        color: @text-light;
      }

      pre {
        background-color: #2d2d2d;
        border-radius: 6px;
        padding: 0.8rem;
        overflow-x: auto;
        text-align: left;
        font-size: 0.8rem;

        code {
          color: #f8f8f2;
          font-family: 'Fira Code', 'Courier New', monospace;
          line-height: 1.4;
        }
      }
    }
  }
}

.best-practices-card {
  .practices {
    .practice {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      .content {
        h3 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: 0;

          &::before {
            content: attr(data-number);
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, @primary-color, @secondary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
        }

        pre {
          background-color: #2d2d2d;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 0.8rem;

          code {
            color: #f8f8f2;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.support-card {
  .support-info {
    p {
      margin-bottom: 1.5rem;
    }
  }

  .browser-support {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .browser {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: @light-bg;
      border-radius: 8px;
      padding: 1rem;

      .name {
        font-weight: 500;
        margin-bottom: 0.3rem;
      }

      .version {
        font-size: 0.9rem;
        color: @text-light;
        margin-bottom: 0.3rem;
      }

      .status {
        font-size: 1.2rem;

        &.supported {
          color: @success-color;
        }
      }
    }
  }

  .legacy-note {
    background-color: fade(@warning-color, 10%);
    border-radius: 8px;
    padding: 1.2rem;
    border-left: 3px solid @warning-color;

    h3 {
      margin-top: 0;
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;

  h2 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .summary {
    max-width: 800px;
    margin: 0 auto 1.5rem;
    text-align: left;

    ul {
      padding-left: 1.5rem;
      text-align: left;
      display: inline-block;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .recommendation {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    background-color: white;
    border-radius: 30px;
    padding: 0.8rem 1.5rem;
    box-shadow: @card-shadow;
    font-weight: 500;

    .icon {
      font-size: 1.5rem;
      color: @accent-color;
    }

    p {
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .template-strings-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
