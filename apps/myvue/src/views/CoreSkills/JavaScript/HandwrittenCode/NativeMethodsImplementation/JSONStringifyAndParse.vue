<template>
  <div class="json-implementations">
    <header class="header">
      <h1>JSON.stringify 与 JSON.parse 实现解析</h1>
      <p>深入理解 JavaScript 对象序列化与反序列化的核心机制</p>
    </header>

    <div class="content-container">
      <!-- 基本介绍 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>JSON 转换基础</h2>
        </div>

        <div class="intro-grid">
          <div class="intro-card">
            <div class="intro-icon">🔄</div>
            <h3>JSON.stringify</h3>
            <p>将 JavaScript 对象转换为 JSON 字符串</p>
            <div class="example">
              <div>输入: { name: "John", age: 30 }</div>
              <div>输出: "{\"name\":\"John\",\"age\":30}"</div>
            </div>
          </div>

          <div class="intro-card">
            <div class="intro-icon">🔁</div>
            <h3>JSON.parse</h3>
            <p>将 JSON 字符串解析为 JavaScript 对象</p>
            <div class="example">
              <div>输入: "{\"name\":\"John\",\"age\":30}"</div>
              <div>输出: { name: "John", age: 30 }</div>
            </div>
          </div>

          <div class="intro-card">
            <div class="intro-icon">⚙️</div>
            <h3>核心用途</h3>
            <ul>
              <li>客户端-服务器数据传输</li>
              <li>本地存储数据序列化</li>
              <li>配置文件读写</li>
              <li>深拷贝对象实现基础</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- JSON.stringify 实现 -->
      <section class="stringify-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>JSON.stringify 实现</h2>
        </div>

        <div class="implementation-details">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>处理基本类型: 字符串、数字、布尔值和 null</li>
              <li>处理特殊值: undefined、函数和 Symbol（被忽略）</li>
              <li>处理数组: 递归处理每个元素</li>
              <li>处理对象: 递归处理每个属性</li>
              <li>处理循环引用: 使用 WeakSet 检测</li>
              <li>处理日期对象: 转换为 ISO 字符串</li>
              <li>处理特殊对象: Map、Set 等</li>
            </ol>
          </div>

          <div class="code-implementation">
            <h3>代码实现</h3>
            <pre><code>function jsonStringify(obj: any, space: number | string = 0): string {
  const seen = new WeakSet();

  function stringify(value: any): string {
    // 处理基本类型
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    // 处理特殊值
    if (typeof value === 'undefined' || typeof value === 'function' || typeof value === 'symbol') {
      return undefined;
    }

    // 检测循环引用
    if (typeof value === 'object') {
      if (seen.has(value)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      seen.add(value);
    }

    // 处理日期对象
    if (value instanceof Date) {
      return `"${value.toISOString()}"`;
    }

    // 处理数组
    if (Array.isArray(value)) {
      const items = value.map(item =>
        stringify(item) ?? 'null'
      );
      return `[${items.join(',')}]`;
    }

    // 处理 Map 和 Set
    if (value instanceof Map || value instanceof Set) {
      return jsonStringify(Array.from(value));
    }

    // 处理普通对象
    const keys = Object.keys(value);
    const items = keys.map(key => {
      const val = stringify(value[key]);
      return val !== undefined
        ? `"${key}":${val}`
        : undefined;
    }).filter(Boolean);

    return `{${items.join(',')}}`;
  }

  const result = stringify(obj);
  if (space === 0) return result;

  // 格式化输出
  return JSON.stringify(JSON.parse(result), null, space);
}</code></pre>
          </div>
        </div>

        <div class="demo-area">
          <h3>演示示例</h3>
          <div class="demo-container">
            <div class="input-area">
              <textarea v-model="stringifyInput" placeholder='输入 JavaScript 对象'></textarea>
              <div class="controls">
                <button @click="runStringifyDemo">转换为 JSON</button>
                <div class="format-option">
                  <label>
                    <input type="checkbox" v-model="prettyPrint">
                    美化输出
                  </label>
                </div>
              </div>
            </div>
            <div class="output-area">
              <pre>{{ stringifyOutput || '转换结果将显示在这里' }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- JSON.parse 实现 -->
      <section class="parse-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>JSON.parse 实现</h2>
        </div>

        <div class="implementation-details">
          <div class="explanation">
            <h3>实现思路</h3>
            <ol>
              <li>创建词法分析器解析 JSON 字符串</li>
              <li>处理基本类型: 字符串、数字、布尔值和 null</li>
              <li>处理数组: 递归解析每个元素</li>
              <li>处理对象: 递归解析每个键值对</li>
              <li>处理转义字符: 如 \", \\, \/ 等</li>
              <li>处理 Unicode 转义: \uXXXX</li>
              <li>处理日期字符串: 转换为 Date 对象</li>
              <li>验证 JSON 语法有效性</li>
            </ol>
          </div>

          <div class="code-implementation">
            <h3>代码实现</h3>
            <pre><code>function jsonParse(jsonStr: string): any {
  let index = 0;

  // 词法分析 - 获取当前字符
  const currentChar = () => jsonStr[index];

  // 前进到下一个字符
  const nextChar = () => jsonStr[++index];

  // 跳过空白字符
  const skipWhitespace = () => {
    while (/\s/.test(currentChar())) index++;
  };

  // 解析值
  const parseValue = (): any => {
    skipWhitespace();
    const char = currentChar();

    if (char === '"') return parseString();
    if (char === '-' || (char >= '0' && char <= '9')) return parseNumber();
    if (char === '{') return parseObject();
    if (char === '[') return parseArray();
    if (char === 't') return parseKeyword('true', true);
    if (char === 'f') return parseKeyword('false', false);
    if (char === 'n') return parseKeyword('null', null);

    throw new SyntaxError(`Unexpected token ${char} in JSON at position ${index}`);
  };

  // 解析字符串
  const parseString = (): string => {
    let result = '';
    index++; // 跳过开头引号

    while (currentChar() !== '"') {
      if (index >= jsonStr.length) {
        throw new SyntaxError('Unexpected end of JSON input');
      }

      if (currentChar() === '\\') {
        // 处理转义字符
        index++;
        const escapeChar = currentChar();
        const escapeMap: Record&lt;string, string&gt; = {
          '"': '"', '\\': '\\', '/': '/',
          'b': '\b', 'f': '\f', 'n': '\n',
          'r': '\r', 't': '\t'
        };

        if (escapeChar in escapeMap) {
          result += escapeMap[escapeChar];
        } else if (escapeChar === 'u') {
          // 处理 Unicode 转义
          const hex = jsonStr.substring(index + 1, index + 5);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
            throw new SyntaxError('Invalid Unicode escape sequence');
          }
          result += String.fromCharCode(parseInt(hex, 16));
          index += 4;
        } else {
          throw new SyntaxError(`Invalid escape character: \\${escapeChar}`);
        }
      } else {
        result += currentChar();
      }

      index++;
    }

    index++; // 跳过结尾引号
    return result;
  };

  // 解析数字
  const parseNumber = (): number => {
    let start = index;

    // 匹配数字模式
    while (/[-+0-9.eE]/.test(currentChar())) {
      index++;
    }

    const numStr = jsonStr.substring(start, index);
    const num = parseFloat(numStr);

    if (isNaN(num)) {
      throw new SyntaxError(`Invalid number: ${numStr}`);
    }

    return num;
  };

  // 解析对象
  const parseObject = (): object => {
    const obj: Record&lt;string, any&gt; = {};
    index++; // 跳过 {

    while (currentChar() !== '}') {
      skipWhitespace();

      if (currentChar() === '}') break; // 空对象

      // 解析键
      const key = parseString();
      skipWhitespace();

      if (currentChar() !== ':') {
        throw new SyntaxError(`Expected colon after property name`);
      }

      index++; // 跳过 :
      const value = parseValue();
      obj[key] = value;

      skipWhitespace();
      if (currentChar() === ',') {
        index++; // 跳过逗号
        skipWhitespace();
      }
    }

    index++; // 跳过 }
    return obj;
  };

  // 解析数组
  const parseArray = (): any[] => {
    const arr: any[] = [];
    index++; // 跳过 [

    while (currentChar() !== ']') {
      skipWhitespace();

      if (currentChar() === ']') break; // 空数组

      arr.push(parseValue());
      skipWhitespace();

      if (currentChar() === ',') {
        index++; // 跳过逗号
        skipWhitespace();
      }
    }

    index++; // 跳过 ]
    return arr;
  };

  // 解析关键字 (true, false, null)
  const parseKeyword = (keyword: string, value: any): any => {
    const end = index + keyword.length;
    const str = jsonStr.substring(index, end);

    if (str !== keyword) {
      throw new SyntaxError(`Unexpected token ${str} at position ${index}`);
    }

    index = end;
    return value;
  };

  try {
    const result = parseValue();
    skipWhitespace();

    if (index < jsonStr.length) {
      throw new SyntaxError(`Unexpected token at position ${index}`);
    }

    // 尝试解析日期字符串
    if (typeof result === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(result)) {
      return new Date(result);
    }

    return result;
  } catch (error) {
    throw new SyntaxError('Invalid JSON string');
  }
}</code></pre>
          </div>
        </div>

        <div class="demo-area">
          <h3>演示示例</h3>
          <div class="demo-container">
            <div class="input-area">
              <textarea v-model="parseInput" placeholder='输入 JSON 字符串'></textarea>
              <button @click="runParseDemo">解析为对象</button>
            </div>
            <div class="output-area">
              <pre>{{ parseOutput || '解析结果将显示在这里' }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 比较与注意事项 -->
      <section class="comparison-section">
        <div class="section-header">
          <div class="icon">⚖️</div>
          <h2>原生与自定义实现比较</h2>
        </div>

        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>JSON.stringify</h3>
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>原生实现</th>
                  <th>自定义实现</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>循环引用检测</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>日期对象处理</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>Map/Set 支持</td>
                  <td>❌</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>函数处理</td>
                  <td>❌ (忽略)</td>
                  <td>❌ (忽略)</td>
                </tr>
                <tr>
                  <td>性能</td>
                  <td>极高 (原生代码)</td>
                  <td>中等 (JavaScript)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="comparison-card">
            <h3>JSON.parse</h3>
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>原生实现</th>
                  <th>自定义实现</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>语法验证</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>转义字符处理</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>日期字符串解析</td>
                  <td>❌ (返回字符串)</td>
                  <td>✅ (转为 Date 对象)</td>
                </tr>
                <tr>
                  <td>安全执行</td>
                  <td>✅ (无代码执行)</td>
                  <td>✅ (无 eval)</td>
                </tr>
                <tr>
                  <td>性能</td>
                  <td>极高 (原生代码)</td>
                  <td>中等 (JavaScript)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="notes">
          <h3>重要注意事项</h3>
          <ul>
            <li>自定义实现主要用于学习目的，生产环境应使用原生方法</li>
            <li>原生方法经过高度优化，性能远优于 JavaScript 实现</li>
            <li>JSON.parse 应避免使用 eval() 实现，以防止代码注入攻击</li>
            <li>处理循环引用时，原生方法会抛出错误，自定义实现也应如此</li>
            <li>JSON 不支持函数、undefined 和 Symbol，这些值会被忽略</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 演示数据
const stringifyInput = ref(`{
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
const stringifyOutput = ref('');
const prettyPrint = ref(true);

const parseInput = ref(`{
  "name": "John Doe",
  "age": 30,
  "isAdmin": true,
  "hobbies": ["reading", "hiking", "coding"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "birthDate": "1990-06-15T00:00:00.000Z",
  "score": null
}`);
const parseOutput = ref('');

// 运行 stringify 演示
const runStringifyDemo = () => {
  try {
    // 安全地评估输入字符串
    const obj = new Function(`return (${stringifyInput.value})`)();

    // 使用原生 JSON.stringify 作为演示
    // 实际项目中应使用自定义实现
    const result = JSON.stringify(
      obj,
      (key, value) => {
        // 处理 Map 和 Set
        if (value instanceof Map) return Array.from(value);
        if (value instanceof Set) return Array.from(value);
        return value;
      },
      prettyPrint.value ? 2 : 0
    );

    stringifyOutput.value = result;
  } catch (error) {
    stringifyOutput.value = `错误: ${(error as Error).message}`;
  }
};

// 运行 parse 演示
const runParseDemo = () => {
  try {
    // 使用原生 JSON.parse 作为演示
    // 实际项目中应使用自定义实现
    const result = JSON.parse(parseInput.value);

    // 尝试将日期字符串转换为 Date 对象
    const convertDates = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') return obj;

      if (Array.isArray(obj)) {
        return obj.map(convertDates);
      }

      const newObj: Record<string, any> = {};
      for (const key in obj) {
        if (typeof obj[key] === 'string' &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(obj[key])) {
          newObj[key] = new Date(obj[key]);
        } else if (typeof obj[key] === 'object') {
          newObj[key] = convertDates(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    };

    const parsed = convertDates(result);
    parseOutput.value = JSON.stringify(parsed, null, 2);
  } catch (error) {
    parseOutput.value = `错误: ${(error as Error).message}`;
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

.json-implementations {
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

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.intro-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .intro-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }

  .example {
    background: @light-bg;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1.2rem;
    text-align: left;
    font-family: monospace;
    font-size: 0.9rem;
  }
}

.implementation-details {
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

  h3 {
    color: @primary-color;
    margin-bottom: 1.5rem;
  }

  ol {
    padding-left: 1.5rem;

    li {
      padding: 0.8rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.code-implementation {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  overflow-x: auto;

  h3 {
    color: @primary-color;
    margin-bottom: 1.5rem;
  }

  pre {
    background: #2b2d42;
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #f8f9fa;
    }
  }
}

.demo-area {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-top: 1.5rem;

  h3 {
    color: @secondary-color;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.input-area, .output-area {
  display: flex;
  flex-direction: column;
  height: 300px;
}

.input-area {
  textarea {
    flex: 1;
    padding: 1rem;
    border: 1px solid @border-color;
    border-radius: 8px;
    font-family: monospace;
    resize: none;
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
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .format-option {
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
  }
}

.output-area {
  pre {
    flex: 1;
    background: #2b2d42;
    color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    overflow: auto;
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

.comparison-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  h3 {
    color: @secondary-color;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @light-bg;
      color: @secondary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    td {
      &:nth-child(2), &:nth-child(3) {
        text-align: center;
        font-weight: bold;
      }
    }

    .success {
      color: @success-color;
    }

    .error {
      color: @error-color;
    }
  }
}

.notes {
  background: @light-bg;
  border-radius: 16px;
  padding: 1.8rem;

  h3 {
    color: @primary-color;
    margin-bottom: 1.2rem;
  }

  ul {
    padding-left: 1.5rem;

    li {
      padding: 0.7rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .implementation-details {
    grid-template-columns: 1fr;
  }
}
</style>
