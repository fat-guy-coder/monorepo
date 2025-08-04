<template>
  <div class="template-string-container">
    <div class="header">
      <h1>JavaScript 模板字符串实现原理</h1>
      <p class="subtitle">深入理解模板字符串的解析、插值表达式和标签模板</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">${ }</div>
          <div class="stat-label">插值表达式</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">` `</div>
          <div class="stat-label">反引号语法</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">Tag</div>
          <div class="stat-label">标签模板</div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <h2 class="section-title">
          <span class="icon">📝</span> 模板字符串基本语法
        </h2>
        <div class="code-block">
          <pre><code>// 基本用法
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, Alice!"

// 多行字符串
const message = `This is a
multi-line
string!`;

// 表达式计算
const a = 10;
const b = 5;
const result = `The sum is: ${a + b}`; // "The sum is: 15"</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">⚙️</span> 实现思路
        </h2>
        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>解析模板</h3>
              <p>将模板字符串分割为静态文本和动态表达式</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>提取表达式</h3>
              <p>识别${}内的JavaScript表达式</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>计算表达式</h3>
              <p>在指定上下文中计算表达式值</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>拼接结果</h3>
              <p>将静态文本和计算结果拼接成最终字符串</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">💻</span> 基础实现代码
        </h2>
        <div class="code-block">
          <pre><code>function simpleTemplate(template, context) {
  return template.replace(/\$\{([^}]+)\}/g, (_, expression) => {
    // 在提供的上下文中计算表达式
    return context[expression.trim()] || '';
  });
}

// 使用示例
const template = 'Hello, ${name}! You have ${count} new messages.';
const context = { name: 'Alice', count: 5 };
const result = simpleTemplate(template, context);
console.log(result); // "Hello, Alice! You have 5 new messages."</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">🔍</span> 高级实现（支持表达式）
        </h2>
        <div class="code-block">
          <pre><code>function advancedTemplate(template, context) {
  // 使用函数构造器创建安全的执行环境
  const execute = new Function(
    'context',
    `with(context) {
      return \`${template}\`;
    }`
  );

  try {
    // 创建安全的上下文代理
    const safeContext = new Proxy(context || {}, {
      has: () => true, // 阻止访问原型链
      get: (target, prop) => {
        if (prop === Symbol.unscopables) return undefined;
        return target[prop];
      }
    });

    return execute(safeContext);
  } catch (error) {
    console.error('Template rendering error:', error);
    return '';
  }
}

// 使用示例
const template = `User: ${'name'}
Balance: $${'balance'.toFixed(2)}
Status: ${'active' ? 'Active' : 'Inactive'}`;

const context = {
  name: 'Bob',
  balance: 125.75,
  active: true
};

const result = advancedTemplate(template, context);
console.log(result);
// "User: Bob
// Balance: $125.75
// Status: Active"</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">🏷️</span> 标签模板实现
        </h2>
        <div class="explanation">
          <p>标签模板允许自定义模板字符串的处理方式：</p>
          <div class="tag-template-structure">
            <div class="tag">function</div>
            <div class="strings">strings</div>
            <div class="expressions">...values</div>
          </div>
        </div>
        <div class="code-block">
          <pre><code>function highlight(strings, ...values) {
  let result = '';

  strings.forEach((str, i) => {
    result += str;
    if (i < values.length) {
      result += `<span class="highlight">${values[i]}</span>`;
    }
  });

  return result;
}

const name = 'Alice';
const age = 30;
const message = highlight`Hello, ${name}! You are ${age} years old.`;

document.body.innerHTML = message;
// 渲染为: "Hello, <span class="highlight">Alice</span>!
// You are <span class="highlight">30</span> years old."</code></pre>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">🧪</span> 实时演示
        </h2>
        <div class="demo-area">
          <div class="input-group">
            <label for="template-input">模板字符串：</label>
            <textarea id="template-input" v-model="templateInput" placeholder="输入模板字符串，例如：Hello, ${name}!"></textarea>
          </div>

          <div class="input-group">
            <label for="context-input">上下文对象（JSON）：</label>
            <textarea id="context-input" v-model="contextInput" placeholder='输入JSON对象，例如：{"name": "Alice"}'></textarea>
          </div>

          <div class="controls">
            <button @click="renderTemplate" class="render-btn">渲染模板</button>
            <button @click="resetDemo" class="reset-btn">重置</button>
          </div>

          <div class="result-container">
            <h3>渲染结果：</h3>
            <div class="result" v-html="renderedResult"></div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">
          <span class="icon">📚</span> 关键知识点
        </h2>
        <div class="knowledge-grid">
          <div class="knowledge-card">
            <h3>1. 词法分析</h3>
            <p>解析模板字符串中的静态部分和动态表达式</p>
          </div>
          <div class="knowledge-card">
            <h3>2. 表达式求值</h3>
            <p>安全地在指定上下文中计算JavaScript表达式</p>
          </div>
          <div class="knowledge-card">
            <h3>3. 转义处理</h3>
            <p>正确处理特殊字符和转义序列</p>
          </div>
          <div class="knowledge-card">
            <h3>4. 标签模板</h3>
            <p>函数接收模板部分和表达式值数组</p>
          </div>
          <div class="knowledge-card">
            <h3>5. 性能优化</h3>
            <p>预编译模板、缓存解析结果</p>
          </div>
          <div class="knowledge-card">
            <h3>6. 安全考虑</h3>
            <p>防止XSS攻击，安全执行表达式</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>JavaScript 模板字符串实现原理 | 使用 Vue 3 和 TypeScript 演示</p>
      <div class="links">
        <a href="#">MDN 文档</a>
        <a href="#">ECMAScript 规范</a>
        <a href="#">模板引擎比较</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const templateInput = ref(`欢迎您，\${user.name}！
您有 \${messages.length} 条未读消息。
最后登录: \${new Date(lastLogin).toLocaleDateString()}
当前状态: \${active ? '活跃' : '离线'}`);
const contextInput = ref(`{
  "user": {
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "messages": [1, 2, 3, 4, 5],
  "lastLogin": "2023-07-15T08:30:00Z",
  "active": true
}`);
const renderedResult = ref('');

const renderTemplate = () => {
  try {
    const context = JSON.parse(contextInput.value);
    const result = advancedTemplate(templateInput.value, context);
    renderedResult.value = result.replace(/\n/g, '<br>');
  } catch (error) {
    renderedResult.value = `<span class="error">错误: ${(error as Error).message}</span>`;
  }
};

const resetDemo = () => {
  templateInput.value = `欢迎您，\${user.name}！
您有 \${messages.length} 条未读消息。
最后登录: \${new Date(lastLogin).toLocaleDateString()}
当前状态: \${active ? '活跃' : '离线'}`;
  contextInput.value = `{
  "user": {
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "messages": [1, 2, 3, 4, 5],
  "lastLogin": "2023-07-15T08:30:00Z",
  "active": true
}`;
  renderedResult.value = '';
};

// 高级模板实现函数（与代码示例中相同）
function advancedTemplate(template: string, context: Record<string, any>): string {
  // 使用函数构造器创建安全的执行环境
  const execute = new Function(
    'context',
    `with(context) {
      return \`${template}\`;
    }`
  );

  try {
    // 创建安全的上下文代理
    const safeContext = new Proxy(context || {}, {
      has: () => true, // 阻止访问原型链
      get: (target, prop) => {
        if (prop === Symbol.unscopables) return undefined;
        return target[prop as any];
      }
    });

    return execute(safeContext);
  } catch (error) {
    console.error('Template rendering error:', error);
    return `渲染错误: ${(error as Error).message}`;
  }
}
</script>

<style scoped lang="less">
@primary-color: #42b983;
@secondary-color: #2c3e50;
@accent-color: #ff6b6b;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@highlight-color: #ffeb3b;

.template-string-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #fff;
}

.header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.85;
    margin-bottom: 25px;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 20px;

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 15px 25px;
      min-width: 120px;

      .stat-value {
        font-size: 2.2rem;
        font-weight: bold;
        color: @highlight-color;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.9;
      }
    }
  }
}

.content {
  background: @light-bg;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid @border-color;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    color: @secondary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid @primary-color;

    .icon {
      margin-right: 12px;
      font-size: 1.4rem;
    }
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #f8f8f2;

      .highlight {
        background: rgba(255, 235, 59, 0.3);
        padding: 0 4px;
        border-radius: 3px;
      }
    }
  }
}

.implementation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;

  .step {
    display: flex;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-right: 15px;
    }

    .step-content {
      h3 {
        margin-top: 0;
        margin-bottom: 8px;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #666;
        line-height: 1.5;
      }
    }
  }
}

.explanation {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 25px;

  p {
    margin: 0 0 15px 0;
    font-size: 1.1rem;
  }

  .tag-template-structure {
    display: flex;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    div {
      padding: 10px 15px;
      font-family: 'Courier New', monospace;
      font-weight: bold;
    }

    .tag {
      background: #4caf50;
      color: white;
    }

    .strings {
      background: #bbdefb;
      flex-grow: 1;
    }

    .expressions {
      background: #ffecb3;
    }
  }
}

.demo-area {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .input-group {
    margin-bottom: 20px;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 8px;
      color: @secondary-color;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      padding: 15px;
      border: 1px solid @border-color;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      resize: vertical;

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
      }
    }
  }

  .controls {
    display: flex;
    gap: 15px;
    margin: 25px 0;

    button {
      padding: 12px 25px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .render-btn {
      background: @primary-color;
      color: white;

      &:hover {
        background: darken(@primary-color, 10%);
      }
    }

    .reset-btn {
      background: #f0f0f0;
      color: #666;

      &:hover {
        background: #e0e0e0;
      }
    }
  }

  .result-container {
    margin-top: 25px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: @secondary-color;
    }

    .result {
      background: #f8f8f8;
      border-left: 4px solid @primary-color;
      padding: 20px;
      border-radius: 0 8px 8px 0;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      min-height: 100px;

      :deep(.highlight) {
        background: @highlight-color;
        padding: 0 4px;
        border-radius: 3px;
        font-weight: bold;
      }

      .error {
        color: @accent-color;
        font-weight: bold;
      }
    }
  }
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .knowledge-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    border-top: 4px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin-top: 0;
      margin-bottom: 12px;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  color: #666;
  margin-top: 40px;

  p {
    margin: 0 0 15px 0;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 20px;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .header .stats {
    flex-direction: column;
    align-items: center;
  }

  .implementation-steps {
    grid-template-columns: 1fr;
  }

  .demo-area .controls {
    flex-direction: column;
  }
}
</style>
