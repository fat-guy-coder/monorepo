<template>
  <div class="util-container">
    <header class="header">
      <h1>Node.js util 模块参考手册</h1>
      <p class="subtitle">实用工具函数集合，用于简化常见编程任务</p>
    </header>

    <div class="content-wrapper">
      <div class="sidebar">
        <h2>API 导航</h2>
        <ul class="api-nav">
          <li v-for="api in apiList" :key="api.name">
            <a :href="`#${api.name}`" @click.prevent="scrollTo(api.name)" :class="{ active: activeApi === api.name }">
              {{ api.name }}
            </a>
          </li>
        </ul>

        <div class="module-info">
          <h3>模块信息</h3>
          <p><strong>引入方式：</strong> <code>const util = require('node:util');</code></p>
          <p><strong>版本支持：</strong> Node.js 0.1.0+</p>
          <p><strong>类型支持：</strong> 包含完整的TypeScript类型定义</p>
        </div>
      </div>

      <div class="main-content">
        <div class="module-description">
          <h2>util 模块概述</h2>
          <p>
            <code>util</code> 模块提供了一系列实用函数，用于解决 JavaScript 中常见的编程问题。
            该模块最初是为 Node.js 内部 API 设计的，但现在许多函数已广泛应用于日常开发中。
          </p>
          <p>
            该模块提供了多种功能，包括类型检查、格式化输出、回调函数与 Promise 的转换、
            异步函数工具、调试工具等。
          </p>
        </div>

        <div v-for="api in apiList" :key="api.name" :id="api.name" class="api-section">
          <div class="api-header">
            <h2>{{ api.name }}</h2>
            <span class="api-type">{{ api.type }}</span>
          </div>

          <p class="api-description">{{ api.description }}</p>

          <div v-if="api.syntax" class="code-block">
            <pre><code>{{ api.syntax }}</code></pre>
          </div>

          <div v-if="api.params && api.params.length" class="params-table">
            <h3>参数</h3>
            <table>
              <thead>
                <tr>
                  <th>参数</th>
                  <th>类型</th>
                  <th>描述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="param in api.params" :key="param.name">
                  <td>{{ param.name }}</td>
                  <td><code>{{ param.type }}</code></td>
                  <td>{{ param.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="api.return" class="return-value">
            <h3>返回值</h3>
            <p><code>{{ api.return.type }}</code> - {{ api.return.description }}</p>
          </div>

          <div v-if="api.example" class="example-section">
            <h3>示例</h3>
            <div class="code-block">
              <pre><code>{{ api.example }}</code></pre>
            </div>
          </div>

          <div v-if="api.note" class="note">
            <strong>注意：</strong> {{ api.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface ApiParam {
  name: string;
  type: string;
  description: string;
}

interface ApiReturn {
  type: string;
  description: string;
}

interface ApiItem {
  name: string;
  type: string;
  description: string;
  syntax: string;
  params: ApiParam[];
  return: ApiReturn;
  example: string;
  note?: string;
}

// API数据
const apiList = ref<ApiItem[]>([
  {
    name: 'util.promisify',
    type: 'Function',
    description: '将遵循常见的错误优先的回调风格的函数（即形如 (err, value) => ... 的回调作为最后一个参数）转换为返回 promise 的函数。',
    syntax: 'const promisify = util.promisify(original);',
    params: [
      { name: 'original', type: 'Function', description: '遵循错误优先回调风格的函数' }
    ],
    return: {
      type: 'Function',
      description: '返回一个返回Promise的函数'
    },
    example: `const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function main() {
  const data = await readFile('file.txt');
  console.log(data.toString());
}

main().catch(console.error);`
  },
  {
    name: 'util.callbackify',
    type: 'Function',
    description: '将 async 函数（或返回 Promise 的函数）转换为遵循错误优先回调风格的函数。',
    syntax: 'const callbackFunc = util.callbackify(asyncFunc);',
    params: [
      { name: 'asyncFunc', type: 'Function', description: 'async 函数或返回 Promise 的函数' }
    ],
    return: {
      type: 'Function',
      description: '遵循错误优先回调风格的函数'
    },
    example: `async function asyncFunction() {
  return 'success';
}

const callbackFunction = util.callbackify(asyncFunction);

callbackFunction((err, result) => {
  if (err) throw err;
  console.log(result); // 输出: 'success'
});`,
    note: '在回调函数中，第一个参数是错误对象（可能为 null），第二个参数是原始函数返回的值。'
  },
  {
    name: 'util.format',
    type: 'Function',
    description: '返回一个格式化后的字符串，使用第一个参数作为类似 printf 的格式字符串。',
    syntax: 'util.format(format[, ...args])',
    params: [
      { name: 'format', type: 'string', description: '包含零个或多个占位符的格式字符串' },
      { name: '...args', type: 'any', description: '替换占位符的值' }
    ],
    return: {
      type: 'string',
      description: '格式化后的字符串'
    },
    example: `const name = 'John';
const age = 30;

console.log(util.format('Hello, %s! You are %d years old.', name, age));
// 输出: 'Hello, John! You are 30 years old.'`,
    note: '支持的占位符: %s (字符串), %d (数字), %i (整数), %f (浮点数), %j (JSON), %o (对象), %O (对象, 显示完整属性)'
  },
  {
    name: 'util.inspect',
    type: 'Function',
    description: '返回对象的字符串表示，主要用于调试。与 console.log() 使用的内部方法相同。',
    syntax: 'util.inspect(object[, options])',
    params: [
      { name: 'object', type: 'any', description: '要检查的 JavaScript 对象' },
      { name: 'options', type: 'Object', description: '控制格式化行为的选项（可选）' }
    ],
    return: {
      type: 'string',
      description: '对象的字符串表示'
    },
    example: `const obj = {
  name: 'Alice',
  age: 28,
  address: {
    city: 'New York',
    zip: '10001'
  }
};

console.log(util.inspect(obj, { colors: true, depth: 2 }));
// 输出带颜色和缩进的格式化对象`,
    note: '常用选项: colors (布尔值, 是否使用ANSI颜色), depth (数字, 递归深度), showHidden (布尔值, 是否显示不可枚举属性)'
  },
  {
    name: 'util.types',
    type: 'Namespace',
    description: '提供用于识别不同类型的 JavaScript 值的工具函数集合。',
    syntax: 'util.types.isAnyArrayBuffer(value)',
    params: [
      { name: 'value', type: 'any', description: '要检查的值' }
    ],
    return: {
      type: 'boolean',
      description: '如果值是给定类型则返回 true，否则返回 false'
    },
    example: `const { types } = require('util');

console.log(types.isDate(new Date())); // true
console.log(types.isRegExp(/abc/));    // true
console.log(types.isArrayBuffer(new ArrayBuffer(16))); // true`,
    note: '包含超过40种类型检查方法，如 isArrayBuffer、isAsyncFunction、isMap、isSet、isPromise 等'
  },
  {
    name: 'util.TextDecoder',
    type: 'Class',
    description: 'WHATWG 编码标准 TextDecoder API 的实现。用于将字节序列解码为字符串。',
    syntax: 'const decoder = new util.TextDecoder([encoding[, options]]);',
    params: [
      { name: 'encoding', type: 'string', description: '解码器的字符编码（默认为"utf-8"）' },
      { name: 'options', type: 'Object', description: '配置选项（可选）' }
    ],
    return: {
      type: 'TextDecoder',
      description: 'TextDecoder 实例'
    },
    example: `const decoder = new util.TextDecoder('utf-8');
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
console.log(decoder.decode(uint8Array)); // 输出: 'Hello'`,
    note: '支持的编码: utf-8, ibm866, iso-8859-2, iso-8859-3, iso-8859-4, iso-8859-5, ...'
  },
  {
    name: 'util.TextEncoder',
    type: 'Class',
    description: 'WHATWG 编码标准 TextEncoder API 的实现。用于将字符串编码为字节序列。',
    syntax: 'const encoder = new util.TextEncoder();',
    params: [],
    return: {
      type: 'TextEncoder',
      description: 'TextEncoder 实例'
    },
    example: `const encoder = new util.TextEncoder();
const uint8Array = encoder.encode('Hello');
console.log(uint8Array); // 输出: Uint8Array(5) [72, 101, 108, 108, 111]`,
    note: 'TextEncoder 只支持 UTF-8 编码'
  },
  {
    name: 'util.inherits',
    type: 'Function',
    description: '将原型方法从一个构造函数继承到另一个构造函数。这是 ES6 之前实现继承的遗留方法。',
    syntax: 'util.inherits(constructor, superConstructor);',
    params: [
      { name: 'constructor', type: 'Function', description: '子类构造函数' },
      { name: 'superConstructor', type: 'Function', description: '父类构造函数' }
    ],
    return: {
      type: 'void',
      description: '无返回值'
    },
    example: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a noise.\`);
};

function Dog(name) {
  Animal.call(this, name);
}

util.inherits(Dog, Animal);

Dog.prototype.speak = function() {
  console.log(\`\${this.name} barks.\`);
};

const dog = new Dog('Rex');
dog.speak(); // 输出: 'Rex barks.'`,
    note: '在 ES6 中，建议使用 class 和 extends 关键字而不是 util.inherits()'
  }
]);

const activeApi = ref('util.promisify');

// 滚动到指定API
const scrollTo = (apiName: string) => {
  const element = document.getElementById(apiName);
  if (element) {
    activeApi.value = apiName;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 监听滚动以更新活动API
const handleScroll = () => {
  const sections = apiList.value.map(api =>
    document.getElementById(api.name)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
      activeApi.value = section.id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>


.util-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Source Sans Pro', sans-serif;
  background: linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%);
  min-height: 100vh;
  color: #2c3e50;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(120deg, #1a2980, #26d0ce);
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  h1 {
    margin: 0;
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.4rem;
    font-weight: 300;
    margin-top: 15px;
    opacity: 0.9;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
}

.content-wrapper {
  display: flex;
  gap: 30px;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.sidebar {
  flex: 0 0 300px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 20px;

  @media (max-width: 900px) {
    position: relative;
    top: 0;
    flex: 0 0 auto;
  }

  h2 {
    color: #1a2980;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 2px solid #eef2f7;
  }

  .api-nav {
    list-style: none;
    padding: 0;
    margin: 0 0 30px 0;

    li {
      margin-bottom: 8px;
    }

    a {
      display: block;
      padding: 12px 15px;
      text-decoration: none;
      color: #2c3e50;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;

      &:hover {
        background: #f0f8ff;
        color: #1a2980;
      }

      &.active {
        background: linear-gradient(90deg, rgba(26, 41, 128, 0.1) 0%, rgba(38, 208, 206, 0.1) 100%);
        color: #1a2980;
        font-weight: 600;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(180deg, #1a2980, #26d0ce);
        }
      }
    }
  }

  .module-info {
    background: #f9fbfd;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #e6f0fa;

    h3 {
      color: #1a2980;
      margin-top: 0;
      font-size: 1.2rem;
    }

    p {
      margin: 12px 0;
      line-height: 1.5;
    }

    code {
      background: #eef7ff;
      color: #1a2980;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.95rem;
    }
  }
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.module-description {
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f5fd;

  h2 {
    color: #1a2980;
    margin-top: 0;
  }

  p {
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
}

.api-section {
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 12px;
  background: #f9fbfd;
  border: 1px solid #eef2f7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  }

  .api-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;

    h2 {
      margin: 0;
      color: #1a2980;
      font-size: 1.8rem;
    }

    .api-type {
      background: linear-gradient(90deg, #1a2980, #26d0ce);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-left: 15px;
      font-weight: 600;
    }
  }

  .api-description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 25px;
    color: #3a506b;
  }

  .code-block {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    overflow-x: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    pre {
      margin: 0;
    }

    code {
      font-family: 'Source Code Pro', monospace;
      font-size: 1rem;
      line-height: 1.5;
      color: #d4d4d4;
    }
  }

  .params-table {
    margin: 25px 0;

    h3 {
      color: #1a2980;
      margin-top: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    th {
      background: linear-gradient(90deg, #1a2980, #26d0ce);
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 15px;
      border-bottom: 1px solid #eef2f7;
      background: white;
    }

    tr:nth-child(even) td {
      background: #f9fbfd;
    }
  }

  .return-value {
    background: #e6f7ff;
    padding: 15px 20px;
    border-radius: 8px;
    margin: 25px 0;
    border-left: 4px solid #1a2980;

    h3 {
      margin-top: 0;
      color: #1a2980;
    }

    p {
      margin: 10px 0 0;
      font-size: 1.05rem;
    }
  }

  .example-section {
    margin: 30px 0;

    h3 {
      color: #1a2980;
      margin-top: 0;
    }
  }

  .note {
    background: #fff8e6;
    padding: 15px 20px;
    border-radius: 8px;
    margin-top: 25px;
    border-left: 4px solid #ffcc00;
    font-size: 0.95rem;
    color: #5c3c00;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content-wrapper {
    gap: 20px;
  }

  .main-content {
    padding: 20px;
  }

  .api-section {
    padding: 20px;
  }

  .api-header {
    flex-direction: column;
    align-items: flex-start !important;

    .api-type {
      margin-left: 0 !important;
      margin-top: 10px;
    }
  }
}
</style>
