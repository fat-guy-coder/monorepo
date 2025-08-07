<template>
  <div class="json-guide">
    <header class="header">
      <h1>JSON 技术详解</h1>
      <p>掌握现代 Web 开发的核心数据交换格式</p>
    </header>

    <div class="content-container">
      <!-- JSON 基本概念 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>JSON 基本概念</h2>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>什么是 JSON？</h3>
            <p>JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式。它基于 ECMAScript 的子集，采用完全独立于语言的文本格式，但使用了类似 C 语言家族的习惯。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>核心特性</h3>
            <ul>
              <li>人类可读的文本格式</li>
              <li>轻量级的数据交换格式</li>
              <li>完全独立于语言</li>
              <li>支持嵌套数据结构</li>
              <li>易于机器解析和生成</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔢</div>
            <h3>基本结构</h3>
            <div class="code-sample">
              <pre>{
  "name": "John",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- JSON 使用 -->
      <section class="usage-section">
        <div class="section-header">
          <div class="icon">💡</div>
          <h2>JSON 的使用</h2>
        </div>

        <div class="usage-grid">
          <div class="usage-card">
            <div class="usage-icon">🌐</div>
            <h3>API 数据交换</h3>
            <p>客户端与服务器之间的数据传输标准格式</p>
            <div class="example">
              <pre>fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));</pre>
            </div>
          </div>

          <div class="usage-card">
            <div class="usage-icon">💾</div>
            <h3>本地存储</h3>
            <p>在浏览器中存储结构化数据</p>
            <div class="example">
              <pre>// 存储数据
localStorage.setItem('user', JSON.stringify(user));

// 读取数据
const user = JSON.parse(localStorage.getItem('user'));</pre>
            </div>
          </div>

          <div class="usage-card">
            <div class="usage-icon">📁</div>
            <h3>配置文件</h3>
            <p>应用程序和服务的配置文件格式</p>
            <div class="example">
              <pre>// config.json
{
  "apiUrl": "https://api.example.com",
  "maxRetries": 3,
  "features": {
    "darkMode": true,
    "notifications": false
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- JSON.stringify 详解 -->
      <section class="stringify-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>JSON.stringify 详解</h2>
        </div>

        <div class="method-details">
          <div class="explanation">
            <h3>语法与参数</h3>
            <div class="syntax">
              <code>JSON.stringify(value[, replacer[, space]])</code>
            </div>

            <div class="parameters">
              <div class="param">
                <h4>value (必需)</h4>
                <p>要转换为 JSON 字符串的值</p>
              </div>

              <div class="param">
                <h4>replacer (可选)</h4>
                <p>过滤或转换结果的函数或数组</p>
              </div>

              <div class="param">
                <h4>space (可选)</h4>
                <p>用于美化输出的空格数量或字符串</p>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <h3>使用示例</h3>

            <div class="example-card">
              <h4>基本用法</h4>
              <pre><code>const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);
// 结果: '{"name":"John","age":30}'</code></pre>
            </div>

            <div class="example-card">
              <h4>使用 replacer 函数</h4>
              <pre><code>function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined; // 过滤所有字符串
  }
  return value;
}

const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj, replacer);
// 结果: '{"age":30}'</code></pre>
            </div>

            <div class="example-card">
              <h4>使用 replacer 数组</h4>
              <pre><code>const obj = { name: "John", age: 30, city: "NY" };
const json = JSON.stringify(obj, ['name', 'age']);
// 结果: '{"name":"John","age":30}'</code></pre>
            </div>

            <div class="example-card">
              <h4>美化输出</h4>
              <pre><code>const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj, null, 2);
/* 结果:
{
  "name": "John",
  "age": 30
}
*/</code></pre>
            </div>
          </div>
        </div>

        <div class="special-cases">
          <h3>特殊值处理</h3>
          <div class="cases-grid">
            <div class="case-card">
              <div class="case-icon">🚫</div>
              <h4>undefined</h4>
              <p>对象属性: 被忽略</p>
              <p>数组元素: 转为 null</p>
            </div>

            <div class="case-card">
              <div class="case-icon">🚫</div>
              <h4>Function</h4>
              <p>被忽略（对象属性）</p>
              <p>转为 null（数组元素）</p>
            </div>

            <div class="case-card">
              <div class="case-icon">🚫</div>
              <h4>Symbol</h4>
              <p>被完全忽略</p>
            </div>

            <div class="case-card">
              <div class="case-icon">📅</div>
              <h4>Date</h4>
              <p>转为 ISO 字符串</p>
              <pre><code>new Date() => "2023-05-15T12:00:00.000Z"</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- JSON.parse 详解 -->
      <section class="parse-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>JSON.parse 详解</h2>
        </div>

        <div class="method-details">
          <div class="explanation">
            <h3>语法与参数</h3>
            <div class="syntax">
              <code>JSON.parse(text[, reviver])</code>
            </div>

            <div class="parameters">
              <div class="param">
                <h4>text (必需)</h4>
                <p>要解析的 JSON 字符串</p>
              </div>

              <div class="param">
                <h4>reviver (可选)</h4>
                <p>转换解析值的函数</p>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <h3>使用示例</h3>

            <div class="example-card">
              <h4>基本用法</h4>
              <pre><code>const json = '{"name":"John","age":30}';
const obj = JSON.parse(json);
// 结果: { name: "John", age: 30 }</code></pre>
            </div>

            <div class="example-card">
              <h4>使用 reviver 函数</h4>
              <pre><code>const json = '{"name":"John","birthDate":"1990-05-15T00:00:00.000Z"}';

const obj = JSON.parse(json, (key, value) => {
  if (key === 'birthDate') return new Date(value);
  return value;
});

// birthDate 被转换为 Date 对象</code></pre>
            </div>

            <div class="example-card">
              <h4>解析数组</h4>
              <pre><code>const json = '["apple", "banana", "cherry"]';
const arr = JSON.parse(json);
// 结果: ["apple", "banana", "cherry"]</code></pre>
            </div>

            <div class="example-card">
              <h4>解析嵌套对象</h4>
              <pre><code>const json = `{
  "name": "John",
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}`;

const obj = JSON.parse(json);
// obj.address.city => "New York"</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>JSON 适用场景</h2>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">🌐</div>
            <h3>Web API</h3>
            <p>RESTful API 的标准数据格式</p>
            <ul>
              <li>请求/响应数据交换</li>
              <li>前后端分离架构</li>
              <li>微服务通信</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <h3>移动应用</h3>
            <p>App 与服务器通信</p>
            <ul>
              <li>原生应用数据交换</li>
              <li>混合应用数据存储</li>
              <li>推送通知数据格式</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">💾</div>
            <h3>数据存储</h3>
            <p>结构化数据持久化</p>
            <ul>
              <li>浏览器 localStorage</li>
              <li>NoSQL 数据库文档</li>
              <li>配置文件存储</li>
            </ul>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🤖</div>
            <h3>自动化脚本</h3>
            <p>系统间数据交换</p>
            <ul>
              <li>CI/CD 配置</li>
              <li>命令行工具数据交换</li>
              <li>系统监控数据格式</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="cautions-section">
        <div class="section-header">
          <div class="icon">⚠️</div>
          <h2>注意事项</h2>
        </div>

        <div class="cautions-grid">
          <div class="caution-card">
            <div class="caution-icon">🚫</div>
            <h3>键名限制</h3>
            <p>必须是双引号包裹的字符串</p>
            <div class="example">
              <pre>{ "name": "John" }  // ✅</pre>
              <pre>{ name: "John" }    // ❌</pre>
            </div>
          </div>

          <div class="caution-card">
            <div class="caution-icon">🚫</div>
            <h3>值类型限制</h3>
            <ul>
              <li>不支持函数、undefined、Symbol</li>
              <li>NaN 和 Infinity 转为 null</li>
              <li>日期对象转为字符串</li>
            </ul>
          </div>

          <div class="caution-card">
            <div class="caution-icon">🔄</div>
            <h3>循环引用</h3>
            <p>JSON.stringify 无法处理循环引用</p>
            <div class="example">
              <pre>const obj = {};
obj.self = obj;
JSON.stringify(obj); // 报错</pre>
            </div>
          </div>

          <div class="caution-card">
            <div class="caution-icon">🔒</div>
            <h3>安全问题</h3>
            <ul>
              <li>避免使用 eval() 解析 JSON</li>
              <li>验证来源不可信的 JSON 数据</li>
              <li>防止 JSON 注入攻击</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="pros-cons-section">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>JSON 的优缺点</h2>
        </div>

        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li>
                <strong>轻量级</strong>
                <p>数据格式简洁，文件体积小</p>
              </li>
              <li>
                <strong>可读性好</strong>
                <p>人类可读的文本格式</p>
              </li>
              <li>
                <strong>语言无关</strong>
                <p>几乎所有编程语言都支持</p>
              </li>
              <li>
                <strong>解析高效</strong>
                <p>现代浏览器原生支持，解析速度快</p>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li>
                <strong>类型有限</strong>
                <p>不支持复杂类型（Date, Map, Set等）</p>
              </li>
              <li>
                <strong>无注释</strong>
                <p>标准 JSON 格式不支持注释</p>
              </li>
              <li>
                <strong>冗余数据</strong>
                <p>键名重复存储，不如二进制格式高效</p>
              </li>
              <li>
                <strong>安全性风险</strong>
                <p>不当使用可能导致安全漏洞</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 实时演示 -->
      <section class="demo-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>JSON 转换演示</h2>
        </div>

        <div class="demo-container">
          <div class="input-area">
            <h3>JavaScript 对象</h3>
            <textarea v-model="jsInput" placeholder="输入 JavaScript 对象"></textarea>
            <button @click="convertToJson">转换为 JSON</button>
          </div>

          <div class="output-area">
            <h3>JSON 字符串</h3>
            <pre>{{ jsonOutput || '转换结果将显示在这里' }}</pre>
            <button @click="convertToJs" :disabled="!jsonOutput">转换为 JS 对象</button>
          </div>

          <div class="result-area">
            <h3>转换结果</h3>
            <pre>{{ jsOutput || '解析结果将显示在这里' }}</pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const jsInput = ref(`{
  name: "John Doe",
  age: 30,
  isAdmin: true,
  hobbies: ["reading", "hiking", "coding"],
  address: {
    street: "123 Main St",
    city: "Anytown"
  },
  birthDate: new Date(1990, 5, 15),
  score: null
}`);

const jsonOutput = ref('');
const jsOutput = ref('');

const convertToJson = () => {
  try {
    // 安全地评估输入字符串
    const obj = new Function(`return (${jsInput.value})`)();

    // 转换日期对象为字符串用于显示
    const convertedObj = JSON.parse(JSON.stringify(obj, (key, value) => {
      if (value instanceof Date) return value.toISOString();
      return value;
    }));

    jsonOutput.value = JSON.stringify(convertedObj, null, 2);
    jsOutput.value = '';
  } catch (error) {
    jsonOutput.value = `错误: ${error.message}`;
  }
};

const convertToJs = () => {
  try {
    const obj = JSON.parse(jsonOutput.value);
    jsOutput.value = JSON.stringify(obj, null, 2);
  } catch (error) {
    jsOutput.value = `错误: ${error.message}`;
  }
};
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4895ef;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;

.json-guide {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(120deg, @primary-color, @secondary-color);
  border-radius: 16px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    font-size: 2rem;
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
  }
}

.concept-grid, .usage-grid, .scenarios-grid, .cautions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.concept-card, .usage-card, .scenario-card, .caution-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.concept-card {
  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  .code-sample {
    background: @light-bg;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1.2rem;

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  }
}

.usage-card {
  .usage-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: @accent-color;
  }

  .example {
    background: @light-bg;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1.2rem;

    pre {
      margin: 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }
}

.method-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.explanation {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  .syntax {
    background: @light-bg;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Code', monospace;
    margin-bottom: 1.5rem;
  }

  .parameters {
    .param {
      padding: 1rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.code-examples {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  .example-card {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    pre {
      background: #2b2d42;
      color: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      overflow-x: auto;
    }
  }
}

.special-cases {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .case-card {
    background: @light-bg;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;

    .case-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    pre {
      background: #2b2d42;
      color: #f8f9fa;
      border-radius: 6px;
      padding: 0.5rem;
      font-size: 0.8rem;
      margin-top: 0.8rem;
    }
  }
}

.scenario-card {
  text-align: center;

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: @success-color;
  }

  ul {
    text-align: left;
    padding-left: 1.2rem;
    margin-top: 1rem;

    li {
      padding: 0.3rem 0;
    }
  }
}

.caution-card {
  .caution-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: @error-color;
  }

  .example {
    background: @light-bg;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    text-align: left;

    pre {
      margin: 0.5rem 0;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros, .cons {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  h3 {
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    margin-bottom: 1.5rem;
  }
}

.pros {
  h3 {
    border-color: @success-color;
    color: @success-color;
  }
}

.cons {
  h3 {
    border-color: @error-color;
    color: @error-color;
  }
}

ul {
  padding-left: 1.5rem;

  li {
    padding: 0.8rem 0;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
    }

    strong {
      display: block;
      margin-bottom: 0.3rem;
      font-size: 1.1rem;
    }
  }
}

.demo-section {
  margin-top: 3rem;
}

.demo-container {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.input-area, .output-area, .result-area {
  h3 {
    color: @primary-color;
    margin-bottom: 1rem;
  }
}

textarea {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid @border-color;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  resize: vertical;
  margin-bottom: 1rem;
}

button {
  background: @primary-color;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: darken(@primary-color, 10%);
    transform: translateY(-2px);
  }

  &:disabled {
    background: @border-color;
    cursor: not-allowed;
    transform: none;
  }
}

pre {
  background: #2b2d42;
  color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 200px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow: auto;
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }
}
</style>
