<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🔍</span>
          JavaScript 正则表达式完全指南
        </h1>
        <p class="page-subtitle">
          正则表达式(Regular Expression)是用于匹配字符串中字符组合的强大工具，可用于搜索、替换和验证文本。本指南涵盖从基础到高级的所有核心概念，包括修饰符、方法、断言、分组引用以及性能优化技巧。
        </p>
      </header>

      <!-- 基础语法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">📚</span>
            基础语法
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="syntax-card" v-for="item in syntaxList" :key="item.title">
              <div class="syntax-icon">{{ item.icon }}</div>
              <h3 class="text-lg font-semibold mb-md">{{ item.title }}</h3>
              <div class="code-block">
                <pre><code>{{ item.example }}</code></pre>
              </div>
              <p class="text-secondary">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 正则修饰符 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔧</span>
            正则修饰符 (Flags)
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="syntax-card">
              <div class="syntax-icon">🌍</div>
              <h3 class="text-lg font-semibold mb-md">g (全局)</h3>
              <div class="code-block">
                <pre><code>'abab'.match(/ab/g); // ['ab', 'ab']</code></pre>
              </div>
              <p class="text-secondary">全局匹配，查找所有匹配项而非找到第一个后停止。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔠</div>
              <h3 class="text-lg font-semibold mb-md">i (忽略大小写)</h3>
              <div class="code-block">
                <pre><code>/hello/i.test('HELLO'); // true</code></pre>
              </div>
              <p class="text-secondary">不区分大小写进行匹配。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔄</div>
              <h3 class="text-lg font-semibold mb-md">m (多行)</h3>
              <div class="code-block">
                <pre><code>/^abc/m.test('abc\nabc'); // true</code></pre>
              </div>
              <p class="text-secondary">多行匹配，使 ^ 和 $ 匹配每行的开头/结尾。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🌐</div>
              <h3 class="text-lg font-semibold mb-md">s (dotAll)</h3>
              <div class="code-block">
                <pre><code>/a.b/s.test('a\nb'); // true</code></pre>
              </div>
              <p class="text-secondary">允许 '.' 匹配换行符在内的所有字符。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">📜</div>
              <h3 class="text-lg font-semibold mb-md">u (Unicode)</h3>
              <div class="code-block">
                <pre><code>/\u{1F600}/u.test('😀'); // true</code></pre>
              </div>
              <p class="text-secondary">完整Unicode支持，能够处理四字节字符和扩展模式。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🎯</div>
              <h3 class="text-lg font-semibold mb-md">y (粘性)</h3>
              <div class="code-block">
                <pre><code>const re = /ab/y; re.lastIndex = 2; re.test('cab'); // false</code></pre>
              </div>
              <p class="text-secondary">
                从上一次匹配位置的下一个字符开始匹配，必须连续匹配成功。
              </p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">📌</div>
              <h3 class="text-lg font-semibold mb-md">d (hasIndices)</h3>
              <div class="code-block">
                <pre><code>const re = /(a+)(b+)/d;
const m = re.exec('aaabbb');
console.log(m.indices); // [[0,6],[0,3],[3,6]]</code></pre>
              </div>
              <p class="text-secondary">ES2022引入，在匹配结果中记录每个捕获组的起始和结束索引。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心方法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🛠️</span>
            核心方法
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">RegExp 实例方法</h3>
              <div class="method-list">
                <div v-for="method in regExpMethods" :key="method.name" class="method-item">
                  <code class="method-name">{{ method.name }}</code>
                  <div class="method-desc">{{ method.desc }}</div>
                  <div class="code-block">
                    <pre><code>{{ method.example }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">String 对象方法</h3>
              <div class="method-list">
                <div v-for="method in stringMethods" :key="method.name" class="method-item">
                  <code class="method-name">{{ method.name }}</code>
                  <div class="method-desc">{{ method.desc }}</div>
                  <div class="code-block">
                    <pre><code>{{ method.example }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 捕获分组与 replace 高级用法 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🎯</span>
            捕获分组与 replace 详解
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-1">
            <div class="method-card">
              <h3 class="text-lg font-semibold mb-md">1. replace 第一个参数：字符串或正则</h3>
              <div class="method-list">
                <div class="code-block">
                  <pre><code>// 字符串参数：仅替换第一个匹配
const text = 'Hello world, world!';
text.replace('world', 'JavaScript'); // "Hello JavaScript, world!"

// 正则 + g 修饰符：全局替换
text.replace(/world/g, 'JavaScript'); // "Hello JavaScript, JavaScript!"</code></pre>
                </div>
              </div>

              <h3 class="text-lg font-semibold mb-md mt-lg">2. replace 第二个参数：字符串或函数</h3>
              <div class="method-list">
                <p class="text-secondary mb-sm">字符串参数支持特殊替换模式：<code>$&</code>(匹配项), <code>$`</code>(匹配前),
                  <code>$'</code>(匹配后), <code>$1</code>等捕获组。</p>
                <div class="code-block">
                  <pre><code>'Hello Tom'.replace(/(\w+)$/, 'Mr. $1'); // "Hello Mr. Tom"</code></pre>
                </div>
                <p class="text-secondary mt-md">函数参数：对每个匹配调用，灵活处理替换逻辑。</p>
                <div class="code-block">
                  <pre><code>const price = '100 200 300';
price.replace(/\d+/g, (match) => `$${match}`); // "$100 $200 $300"

// 带捕获组的函数: (match, p1, p2, ..., offset, string)
'2025-03-05'.replace(/(\d{4})-(\d{2})-(\d{2})/, (_, y, m, d) => `${d}/${m}/${y}`);
// "05/03/2025"</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 高级特性：命名分组、反向引用 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">✨</span>
            高级特性
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="syntax-card">
              <div class="syntax-icon">🏷️</div>
              <h3 class="text-lg font-semibold mb-md">命名捕获组</h3>
              <div class="code-block">
                <pre><code>const re = /(?&lt;year>\d{4})-(?&lt;month>\d{2})/;
const { groups: { year, month } } = re.exec('2025-03');
console.log(year, month); // "2025", "03"

// replace 中引用: $&lt;year>
'2025-03'.replace(re, '$&lt;month>/$&lt;year>'); // "03/2025"</code></pre>
              </div>
              <p class="text-secondary">提升可读性，通过名称而非数字索引访问捕获组。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔄</div>
              <h3 class="text-lg font-semibold mb-md">反向引用</h3>
              <div class="code-block">
                <pre><code>// 匹配重复单词
const re = /\b(\w+)\s+\1\b/;
re.test('hello hello'); // true
re.test('hello world'); // false

// 在 replace 中使用 \1 或 $1
'abc abc'.replace(/(\w+) \1/, '$1'); // "abc"</code></pre>
              </div>
              <p class="text-secondary">\1 匹配第一个捕获组相同的内容，用于检测重复模式。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 断言：前瞻后顾 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔍</span>
            断言 (Assertions)
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="syntax-card">
              <div class="syntax-icon">👀</div>
              <h3 class="text-lg font-semibold mb-md">前瞻 (Lookahead)</h3>
              <div class="code-block">
                <pre><code>// 正向前瞻: x(?=y)
'100px'.match(/\d+(?=px)/); // ["100"]
// 负向前瞻: x(?!y)
'100pt'.match(/\d+(?!px)/); // ["100"]</code></pre>
              </div>
              <p class="text-secondary">检查后面是否满足条件，不消费字符。</p>
            </div>
            <div class="syntax-card">
              <div class="syntax-icon">👁️</div>
              <h3 class="text-lg font-semibold mb-md">后顾 (Lookbehind)</h3>
              <div class="code-block">
                <pre><code>// 正向后顾: (?&lt;=y)x
'€100'.match(/(?&lt;=€)\d+/); // ["100"]
// 负向后顾: (?&lt;!y)x
'$100'.match(/(?&lt;!€)\d+/); // ["100"]</code></pre>
              </div>
              <p class="text-secondary">检查前面是否满足条件（ES2018+）。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 实用示例 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🎯</span>
            实用示例
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">邮箱验证（RFC 5322简化版）</h3>
              <div class="code-block">
                <pre><code>const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}</code></pre>
              </div>
            </div>

            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">Markdown 加粗转 HTML</h3>
              <div class="code-block">
                <pre><code>const markdownRegex = /\*\*(.*?)\*\*/g;
const text = "**重要**内容需要**强调**";
const html = text.replace(markdownRegex, '&lt;strong&gt;$1&lt;/strong&gt;');
// 结果: "&lt;strong&gt;重要&lt;/strong&gt;内容需要&lt;strong&gt;强调&lt;/strong&gt;"</code></pre>
              </div>
            </div>

            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">数字千分位格式化</h3>
              <div class="code-block">
                <pre><code>function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
formatNumber(1234567); // "1,234,567"</code></pre>
              </div>
            </div>

            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">驼峰转短横线</h3>
              <div class="code-block">
                <pre><code>const camelToKebab = (str) =>
  str.replace(/([A-Z])/g, '-$1').toLowerCase();
camelToKebab('getElementById'); // "get-element-by-id"</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 贪婪与非贪婪模式 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🐢</span>
            贪婪与非贪婪模式
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="syntax-card">
              <div class="syntax-icon">🐢</div>
              <h3 class="text-lg font-semibold mb-md">贪婪模式 (默认)</h3>
              <div class="code-block">
                <pre><code>'&lt;div>&lt;span>text&lt;/span>&lt;/div>'.match(/&lt;.+>/);
// ["&lt;div>&lt;span>text&lt;/span>&lt;/div>"] (匹配整个字符串)</code></pre>
              </div>
              <p class="text-secondary">尽可能多地匹配字符，直到表达式失败为止。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🐇</div>
              <h3 class="text-lg font-semibold mb-md">非贪婪模式 (量词后加 ?)</h3>
              <div class="code-block">
                <pre><code>'&lt;div>&lt;span>text&lt;/span>&lt;/div>'.match(/&lt;.+?>/);
// ["&lt;div>", "&lt;span>", "&lt;/span>", "&lt;/div>"]</code></pre>
              </div>
              <p class="text-secondary">尽可能少地匹配字符，尽早返回匹配结果。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能与最佳实践 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">⚡</span>
            性能优化与最佳实践
          </h2>
        </div>
        <div class="card-body">
          <ul class="best-practice-list">
            <li><strong>避免灾难性回溯</strong>：嵌套量词如 <code>(a+)+</code> 可能导致指数级计算，尽量使用原子组或明确边界。</li>
            <li><strong>使用非捕获组</strong>：不需要引用时使用 <code>(?:...)</code> 提升性能和内存。</li>
            <li><strong>预编译正则</strong>：频繁使用的正则表达式应创建常量，避免重复构造。</li>
            <li><strong>具体优于通用</strong>：<code>/[0-9]/</code> 比 <code>/\d/</code> 在某些引擎更快，<code>/[a-z]/</code> 同理。</li>
            <li><strong>合理使用 .* 和 .+</strong>：尽量在末尾使用，或配合非贪婪模式，减少回溯。</li>
          </ul>
        </div>
      </div>

      <!-- 速查表 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">📖</span>
            速查表
          </h2>
        </div>
        <div class="card-body">
          <div class="cheatsheet-table">
            <h3 class="text-lg font-semibold mb-md">方括号字符集</h3>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>表达式</th>
                    <th>描述</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in brackets" :key="item.char">
                    <td><code>{{ item.char }}</code></td>
                    <td>{{ item.desc }}</td>
                    <td><code>{{ item.example }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-lg font-semibold mb-md mt-xl">元字符与断言</h3>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>元字符</th>
                    <th>描述</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in metaCharacters" :key="item.char">
                    <td :class="{ 'text-primary': item.important }"><code>{{ item.char }}</code></td>
                    <td :class="{ 'text-primary': item.important }">{{ item.desc }}</td>
                    <td><code>{{ item.example }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="notice-box">
              <h4 class="text-md font-semibold mb-sm">正则元字符记忆口诀：</h4>
              <p>数字<strong>d</strong>、单词<strong>w</strong>、空白<strong>s</strong>(大写相反，斜杠记心间)，点号任意行首尾，边界换行回车制表符全掌握。</p>
            </div>

            <h3 class="text-lg font-semibold mb-md mt-xl">量词</h3>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>量词</th>
                    <th>描述</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in quantifiers" :key="item.char">
                    <td><code>{{ item.char }}</code></td>
                    <td>{{ item.desc }}</td>
                    <td><code>{{ item.example }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- 交互练习 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💪</span>
            挑战练习
          </h2>
        </div>
        <div class="card-body">
          <div class="code-block">
            <pre><code>// 1. 匹配以大写字母开头，中间11位数字，2到6位小写字母结尾
/^[A-Z]\d{11}[a-z]{2,6}$/

// 2. 增强邮箱验证（支持常见顶级域名）
/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

// 3. 日期格式转换 (YYYY-MM-DD -> DD/MM/YYYY)
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/
'2025-03-05'.replace(dateRegex, '$3/$2/$1') // "05/03/2025"

// 4. 命名分组与反向引用实战：提取重复的HTML标签内容
const html = '&lt;h1>Title&lt;/h1>&lt;p>Text&lt;/p>';
const tagRegex = /&lt;(?&lt;tag>\w+)>(.*?)&lt;\/\k&lt;tag>>/g;
console.log([...html.matchAll(tagRegex)]);
// 输出两个匹配，分别捕获标签名和内容

// 5. 密码强度校验（至少8位，含大写、小写、数字、特殊字符）
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const syntaxList = ref([
  {
    icon: '📌',
    title: '字面量创建',
    example: '/pattern/flags',
    desc: '推荐使用字面量语法，简洁高效',
  },
  {
    icon: '⚙️',
    title: '构造函数',
    example: 'new RegExp("pattern", "flags")',
    desc: '动态构建正则（如用户输入）时使用',
  },
  {
    icon: '🚩',
    title: '常用修饰符',
    example: 'g i m s u y d',
    desc: '修改匹配行为，如全局、忽略大小写、多行等',
  },
])

const regExpMethods = ref([
  {
    name: 'test()',
    desc: '检测字符串是否匹配，返回布尔值',
    example: '/\\d+/.test("123"); // true',
  },
  {
    name: 'exec()',
    desc: '执行匹配，返回匹配对象或 null，包含捕获组',
    example: '/(\\d+)/.exec("abc123def"); // ["123", "123", index: 3]',
  },
])

const stringMethods = ref([
  {
    name: 'match()',
    desc: '返回匹配结果数组，无 g 时返回首个详情，有 g 返回所有匹配',
    example: '"123abc".match(/\\d+/); // ["123"]',
  },
  {
    name: 'replace()',
    desc: '替换匹配的子串，支持正则或字符串，可接收函数',
    example: '"hello".replace(/l/g, "L"); // "heLLo"',
  },
  {
    name: 'matchAll()',
    desc: '返回迭代器，包含所有匹配及捕获组信息',
    example: '[...str.matchAll(/\\d+/g)]',
  },
  {
    name: 'replaceAll()',
    desc: '全局替换所有匹配，必须使用全局正则或字符串',
    example: '"hello".replaceAll(/l/g, "L"); // "heLLo"',
  },
  {
    name: 'search()',
    desc: '返回首个匹配的索引，类似 test 但返回位置',
    example: '"hello".search(/l/); // 2',
  },
  {
    name: 'split()',
    desc: '支持正则分隔符，更强大的拆分',
    example: '"a,b,c".split(/,/); // ["a","b","c"]',
  },
])

const brackets = ref([
  { char: '[abc]', desc: '匹配方括号中的任一字符', example: '/[aeiou]/ → "o"' },
  { char: '[^abc]', desc: '匹配不在方括号中的任意字符', example: '/[^aeiou]/ → "b"' },
  { char: '[a-z]', desc: '匹配小写字母范围', example: '/[a-z]/ → "m"' },
  { char: '[A-Z]', desc: '匹配大写字母范围', example: '/[A-Z]/ → "K"' },
  { char: '[A-z]', desc: '匹配 ASCII 字母', example: '/[A-z]+/ → "Hello"' },
  { char: '[0-9]', desc: '匹配数字', example: '/[0-9]/ → "5"' },
  { char: '[\\u4e00-\\u9fa5]', desc: '匹配中文字符', example: '/[\\u4e00-\\u9fa5]/ → "中"' },
])

const metaCharacters = ref([
  { char: '\\', desc: '转义字符', important: true, example: '/\\./ → "."' },
  { char: '\\d', desc: '数字字符', important: true, example: '/\\d+/ → "123"' },
  { char: '\\w', desc: '单词字符 (字母、数字、下划线)', important: true, example: '/\\w+/ → "hello_123"' },
  { char: '\\s', desc: '空白字符 (空格、制表符等)', important: true, example: '/\\s/ → " "' },
  { char: '.', desc: '匹配除换行符外的任意字符 (配合 s 修饰符可匹配换行)', important: true, example: '/a.c/ → "abc"' },
  { char: '(xyz)', desc: '捕获分组', important: true, example: '/(ab)+/ → "abab"' },
  { char: '(?:xyz)', desc: '非捕获分组', example: '/(?:ab)+/ → "abab" 不存储捕获组' },
  { char: 'x(?=y)', desc: '正向前瞻 (匹配 x 后面紧接 y)', important: true, example: '/\\d(?=px)/ → "2" in "2px"' },
  { char: 'x(?!y)', desc: '负向前瞻', example: '/\\d(?!px)/ → "2" in "2em"' },
  { char: '(?<=y)x', desc: '正向后顾 (匹配前面是 y 的 x)', important: true, example: '/(?<=\\$)\\d+/ → "100" in "$100"' },
  { char: '(?<!y)x', desc: '负向后顾', example: '/(?<!\\$)\\d+/ → "50" in "€50"' },
  { char: '\\D', desc: '非数字', example: '/\\D+/ → "abc"' },
  { char: '\\W', desc: '非单词字符', example: '/\\W/ → "@"' },
  { char: '\\S', desc: '非空白字符', example: '/\\S+/ → "abc123"' },
  { char: '\\b', desc: '单词边界', important: true, example: '/\\bword\\b/ → "word"' },
  { char: '\\B', desc: '非单词边界', example: '/\\Bword\\B/ → "swordplay"' },
  { char: '\\n', desc: '换行符', important: true, example: '/\\n/ → 匹配换行' },
  { char: '\\t', desc: '制表符', example: '/\\t/ → 匹配 tab' },
])

const quantifiers = ref([
  { char: '+', desc: '一次或多次', example: '/a+/ → "aa"' },
  { char: '*', desc: '零次或多次', example: '/a*/ → "aaa" 或 ""' },
  { char: '?', desc: '零次或一次 (也可使量词变为非贪婪)', example: '/a?b/ → "b" 或 "ab"' },
  { char: '{n,m}', desc: '至少 n 次，最多 m 次', example: '/a{2,4}/ → "aa" 到 "aaaa"' },
  { char: '{n,}', desc: '至少 n 次', example: '/a{2,}/ → "aa", "aaa"...' },
  { char: '{n}', desc: '恰好 n 次', example: '/a{3}/ → "aaa"' },
  { char: '^', desc: '匹配字符串/行开始', example: '/^Hello/ → 匹配以 Hello 开头的字符串' },
  { char: '$', desc: '匹配字符串/行结束', example: '/world$/ → 匹配以 world 结尾的字符串' },
])
</script>

<style scoped>
/* ----- 全局与变量定义 (简约工整风格) ----- */
:root {
  --bg-page: #f8f9fc;
  --bg-card: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1f2d3d;
  --text-secondary: #5a6874;
  --border-light: #e4e7ed;
  --primary-color: #409eff;
  --primary-light: #ecf5ff;
  --error-color: #f56c6c;
  --success-color: #67c23a;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05);
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-page);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  color: var(--text-primary);
  line-height: 1.5;
}

.page-container {
  min-height: 100vh;
  background: var(--bg-page);
  padding: var(--spacing-xl) 0;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* 头部样式 */
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, #1f2d3d 0%, #3a5a7a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 卡片通用样式 */
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: var(--spacing-lg) var(--spacing-lg) 0 var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: var(--spacing-md);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-icon {
  font-size: 1.6rem;
}

.card-body {
  padding: var(--spacing-lg);
}

/* 布局栅格 */
.grid {
  display: grid;
  gap: var(--spacing-lg);
}

.grid-1 {
  grid-template-columns: 1fr;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* 间距工具 */
.mb-sm {
  margin-bottom: var(--spacing-sm);
}

.mb-md {
  margin-bottom: var(--spacing-md);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}

.mb-xl {
  margin-bottom: var(--spacing-xl);
}

.mt-sm {
  margin-top: var(--spacing-sm);
}

.mt-md {
  margin-top: var(--spacing-md);
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.mt-xl {
  margin-top: var(--spacing-xl);
}

/* 文字工具 */
.text-lg {
  font-size: 1.125rem;
}

.text-md {
  font-size: 0.95rem;
}

.font-semibold {
  font-weight: 600;
}

.text-secondary {
  color: var(--text-secondary);
}

.text-primary {
  color: var(--primary-color);
}

/* 代码块样式 */
.code-block {
  background: #f2f4f8;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  overflow-x: auto;
  margin: var(--spacing-md) 0;
  border: 1px solid #e9ecef;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.85rem;
  text-align: left;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-block code {
  background: transparent;
  padding: 0;
  color: #2c3e50;
}

/* 语法卡片和方法卡片 */
.syntax-card,
.method-card,
.example-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: all 0.2s ease;
  border: 1px solid var(--border-light);
  height: 100%;
}

.syntax-card:hover,
.method-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.syntax-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.method-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.method-item {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--spacing-md);
}

.method-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.method-name {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1rem;
  background: var(--primary-light);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  display: inline-block;
}

.method-desc {
  margin: var(--spacing-sm) 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.table th,
.table td {
  border: 1px solid var(--border-light);
  padding: 0.75rem;
  text-align: left;
  vertical-align: top;
}

.table th {
  background: #f1f5f9;
  font-weight: 600;
  color: var(--text-primary);
}

.table td code {
  background: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.notice-box {
  background: var(--primary-light);
  border-left: 4px solid var(--primary-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  margin: var(--spacing-lg) 0;
}

.best-practice-list {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.best-practice-list li {
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.best-practice-list li::before {
  content: "✓";
  color: var(--success-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.best-practice-list code {
  background: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

/* 响应式设计 */
@media (max-width: 980px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {

  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .content-wrapper {
    padding: 0 var(--spacing-md);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .table th,
  .table td {
    padding: 0.5rem;
  }
}

/* 美观滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
