<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">📝</span>
          ES6+ 字符串新增方法基本指南
        </h1>
        <p class="page-subtitle">ES2015 ~ ES2023</p>
      </header>

      <Nav :list="methods" class="nav"></Nav>

      <!-- 模板字符串 -->
      <div class="card mb-xl highlight">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🌟</span>
            模板字符串（Template Literals）
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="example-box">
              <h3 class="text-lg font-semibold mb-md">模板字符串示例</h3>
              <div class="code-block">
                <pre><code>// 多行字符串
const poem = `昔人已乘黄鹤去，
此地空余黄鹤楼。
黄鹤一去不复返，
白云千载空悠悠。`

// 表达式嵌入
const user = { name: '张三', age: 25 }
console.log(`用户名：${user.name}，年龄：${user.age}`)

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    `${result}${str}<span class="highlight">${values[i] || ''}</span>`, '')
}
const message = highlight`今天是${new Date().toLocaleDateString()}`</code></pre>
              </div>
            </div>
            <div class="detail-box">
              <h3 class="text-lg font-semibold mb-md">🌟 核心功能</h3>
              <ul class="feature-list">
                <li>多行字符串支持</li>
                <li>表达式嵌入（${expression}）</li>
                <li>标签模板功能</li>
              </ul>

              <div class="best-practice">
                <h4 class="text-lg font-semibold mb-md">最佳实践</h4>
                <p class="text-secondary mb-md">优先使用模板字符串代替字符串拼接</p>
                <div class="code-block">
                  <pre><code>// 不推荐
const str = 'Hello ' + name + ', your score is ' + score

// 推荐
const str = `Hello ${name}, your score is ${score}`</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 字符串方法 -->
      <div class="card mb-xl" v-for="(item, index) in methods" :key="index" :id="item.id">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔧</span>
            {{ item.title }}
          </h2>
        </div>
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-md">{{ item.description }}</h3>
          <div class="grid grid-2">
            <div class="example-col">
              <h4 class="text-md font-semibold mb-sm">传统方式</h4>
              <div class="code-block">
                <pre><code>{{ item.LegacyExample }}</code></pre>
              </div>
            </div>
            <div class="example-col modern">
              <h4 class="text-md font-semibold mb-sm">现代方式</h4>
              <div class="code-block">
                <pre><code>{{ item.ModernExample }}</code></pre>
              </div>
            </div>
          </div>

          <div class="grid grid-2 mt-lg">
            <div class="meta-item success">
              <h4 class="text-md font-semibold mb-sm">✅ 优点</h4>
              <ul class="feature-list">
                <li v-for="(i, index) in item.advantage" :key="index">{{ i }}</li>
              </ul>
            </div>
            <div class="meta-item warning">
              <h4 class="text-md font-semibold mb-sm">⚠️ 注意</h4>
              <p class="text-secondary">{{ item.attention }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 方法对比表 -->
      <div class="card mb-xl contrast">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔍</span>
            方法对比表
          </h2>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>方法</th>
                  <th>返回值</th>
                  <th>大小写敏感</th>
                  <th>支持正则</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>includes()</td>
                  <td>Boolean</td>
                  <td>是</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>startsWith()</td>
                  <td>Boolean</td>
                  <td>是</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>endsWith()</td>
                  <td>Boolean</td>
                  <td>是</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>padStart()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>padEnd()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>trimStart()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>trimEnd()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>repeat()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>at()</td>
                  <td>String</td>
                  <td>-</td>
                  <td>否</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/main.less';
import Nav from 'components/Nav/ScrollNav.vue';

const methods = [
  {
    id: 'includes',
    name: 'includes',
    title: 'includes() 方法',
    description: '检查字符串是否包含指定的子字符串。',
    LegacyExample: `// ES5方式
var str = 'hello world'
var hasHello = str.indexOf('hello') !== -1`,
    ModernExample: `// ES6+方式
const str = 'hello world'
const hasHello = str.includes('hello')`,
    advantage: ['语义更清晰', '支持第二个参数（起始位置）'],
    attention: '区分大小写，可用toLowerCase()统一大小写',
  },
  {
    id: 'padStart',
    name: 'padStart',
    title: 'padStart() 方法',
    description: '在当前字符串的开头填充指定的字符，直到达到指定的长度。',
    LegacyExample: `// ES5方式
var str = '5'
var padded = (new Array(3).join('0') + str).slice(-3)`,
    ModernExample: `// ES6+方式
const str = '5'
const padded = str.padStart(3, '0')`,
    advantage: ['可以轻松填充字符串'],
    attention: '注意填充字符的长度',
  },
  {
    id: 'padEnd',
    name: 'padEnd',
    title: 'padEnd() 方法',
    description: '在当前字符串的结尾填充指定的字符，直到达到指定的长度。',
    LegacyExample: `// ES5方式
var str = '5'
var padded = str + (new Array(3).join('0')).slice(0, 3 - str.length)`,
    ModernExample: `// ES6+方式
const str = '5'
const padded = str.padEnd(3, '0')`,
    advantage: ['可以轻松填充字符串'],
    attention: '注意填充字符的长度',
  },
  {
    id: 'trimStart',
    name: 'trimStart',
    title: 'trimStart() 方法',
    description: '去除字符串开头的空格。',
    LegacyExample: `// ES5方式
var str = '   hello'
var trimmed = str.replace(/^[\\s]+/, '')`,
    ModernExample: `// ES6+方式
const str = '   hello'
const trimmed = str.trimStart()`,
    advantage: ['去除字符串开头的空格'],
    attention: '注意只去除开头的空格',
  },
  {
    id: 'trimEnd',
    name: 'trimEnd',
    title: 'trimEnd() 方法',
    description: '去除字符串结尾的空格。',
    LegacyExample: `// ES5方式
var str = 'hello   '
var trimmed = str.replace(/[\\s]+$/, '')`,
    ModernExample: `// ES6+方式
const str = 'hello   '
const trimmed = str.trimEnd()`,
    advantage: ['去除字符串结尾的空格'],
    attention: '注意只去除结尾的空格',
  },
  {
    id: 'matchAll',
    name: 'matchAll',
    title: 'matchAll() 方法',
    description: '返回一个类似数组的迭代器，包含所有匹配的项。',
    LegacyExample: `// ES5方式
var str = 'hello hello'
var matches = str.match(/hello/g)`,
    ModernExample: `// ES6+方式
const str = 'hello hello'
const matches = [...str.matchAll(/hello/g)]`,
    advantage: ['返回所有匹配项'],
    attention: '注意正则表达式的使用',
  },
  {
    id: 'at',
    name: 'at',
    title: 'at() 方法',
    description: '返回指定位置的字符。',
    LegacyExample: `// ES5方式
var str = 'hello'
var char = str.charAt(1)`,
    ModernExample: `// ES6+方式
const str = 'hello'
const char = str.at(1)`,
    advantage: ['可以使用负数索引'],
    attention: '注意负数索引的使用',
  },
  {
    id: 'repeat',
    name: 'repeat',
    title: 'repeat() 方法',
    description: '返回一个新字符串，该字符串包含当前字符串重复指定次数的副本。',
    LegacyExample: `// ES5方式
var str = 'hello'
var repeated = (new Array(3).join(str + ' ') + str).trim()`,
    ModernExample: `// ES6+方式
const str = 'hello'
const repeated = str.repeat(3)`,
    advantage: ['可以轻松重复字符串'],
    attention: '注意重复次数的限制',
  },
  {
    id: 'startsWith',
    name: 'startsWith',
    title: 'startsWith() 方法',
    description: '判断字符串是否以指定的子字符串开头。',
    LegacyExample: `// ES5方式
var str = 'hello'
var starts = str.indexOf('he') === 0`,
    ModernExample: `// ES6+方式
const str = 'hello'
const starts = str.startsWith('he')`,
    advantage: ['判断字符串开头'],
    attention: '注意大小写',
  },
  {
    id: 'endsWith',
    name: 'endsWith',
    title: 'endsWith() 方法',
    description: '判断字符串是否以指定的子字符串结尾。',
    LegacyExample: `// ES5方式
var str = 'hello'
var ends = str.lastIndexOf('lo') === str.length - 2`,
    ModernExample: `// ES6+方式
const str = 'hello'
const ends = str.endsWith('lo')`,
    advantage: ['判断字符串结尾'],
    attention: '注意大小写',
  },
];
</script>

<style scoped>
/* 组件特定样式 */
.nav {
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: 300px;
  z-index: 2;
}

.highlight {
  border: 2px solid var(--success-color);
  background: var(--bg-secondary);
}

.contrast {
  background: var(--bg-secondary);
}

.example-box,
.detail-box {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.example-col {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.modern {
  border: 2px solid var(--success-color);
}

.meta-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.success {
  border-left: 4px solid var(--success-color);
}

.warning {
  border-left: 4px solid var(--warning-color);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

.best-practice {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
  margin-top: var(--spacing-lg);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
