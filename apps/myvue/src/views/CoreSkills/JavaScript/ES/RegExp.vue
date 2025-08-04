<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">🔍</span>
          JavaScript 正则表达式基本指南
        </h1>
        <p class="page-subtitle">
          正则表达式(regular-expression)是一种用于匹配字符串中字符组合的工具。它们可以用于搜索、替换和验证字符串内容。正则表达式由模式组成，可以使用不同的修饰符来改变匹配行为，例如全局匹配、忽略大小写等。通过正则表达式，开发者可以高效地处理文本数据。
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
            正则修饰符
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-3">
            <div class="syntax-card">
              <div class="syntax-icon">🌍</div>
              <h3 class="text-lg font-semibold mb-md">g (全局)</h3>
              <div class="code-block">
                <pre><code>/\d/g.test('123123'); // true</code></pre>
              </div>
              <p class="text-secondary">全局匹配，会继续查找字符串中的所有匹配项。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔠</div>
              <h3 class="text-lg font-semibold mb-md">i (忽略大小写)</h3>
              <div class="code-block">
                <pre><code>/a/i.test('A'); // true</code></pre>
              </div>
              <p class="text-secondary">忽略大小写进行匹配。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔄</div>
              <h3 class="text-lg font-semibold mb-md">m (多行)</h3>
              <div class="code-block">
                <pre><code>/^abc/m.test('abc\nabc'); // true</code></pre>
              </div>
              <p class="text-secondary">多行匹配，使得 ^ 和 $ 可以匹配到每一行的开始和结束。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🌐</div>
              <h3 class="text-lg font-semibold mb-md">s (dotAll)</h3>
              <div class="code-block">
                <pre><code>/a.b/s.test('a\nb'); // true</code></pre>
              </div>
              <p class="text-secondary">允许 '.' 匹配换行符。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">📜</div>
              <h3 class="text-lg font-semibold mb-md">u (Unicode)</h3>
              <div class="code-block">
                <pre><code>/\u{1F600}/u.test('😀'); // true</code></pre>
              </div>
              <p class="text-secondary">启用 Unicode 模式，用于处理 Unicode 字符。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">💡</div>
              <h3 class="text-lg font-semibold mb-md">y (粘性) (ES10)</h3>
              <div class="code-block">
                <pre><code>/\d/y.test('123'); // true</code></pre>
              </div>
              <p class="text-secondary">与 g 类似，但匹配位置是固定的，必须从正则表达式的当前索引开始匹配。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🔍</div>
              <h3 class="text-lg font-semibold mb-md">d (双字节) (ES10)</h3>
              <div class="code-block">
                <pre><code>/\d/d.test('123'); // true</code></pre>
              </div>
              <p class="text-secondary">用于匹配双字节字符，适用于处理某些特定的字符集。</p>
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
              <h3 class="text-lg font-semibold mb-md">RegExp方法</h3>
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
              <h3 class="text-lg font-semibold mb-md">String方法</h3>
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
              <h3 class="text-lg font-semibold mb-md">邮箱验证</h3>
              <div class="code-block">
                <pre><code>const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}</code></pre>
              </div>
            </div>

            <div class="example-card">
              <h3 class="text-lg font-semibold mb-md">模板替换</h3>
              <div class="code-block">
                <pre><code>const markdownRegex = /\*\*(.*?)\*\*/g;
const text = "**重要**内容需要**强调**";
const html = text.replace(markdownRegex, '&lt;strong&gt;$1&lt;/strong&gt;');
// 结果: "&lt;strong&gt;重要&lt;/strong&gt;内容需要&lt;strong&gt;强调&lt;/strong&gt;"</code></pre>
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
              <h3 class="text-lg font-semibold mb-md">贪婪模式</h3>
              <div class="code-block">
                <pre><code>/a.+/g.test('aaaaa'); // true</code></pre>
              </div>
              <p class="text-secondary">贪婪模式会尽可能多地匹配字符，直到满足整个表达式。</p>
            </div>

            <div class="syntax-card">
              <div class="syntax-icon">🐇</div>
              <h3 class="text-lg font-semibold mb-md">非贪婪模式</h3>
              <div class="code-block">
                <pre><code>/a.+?/g.test('aaaaa'); // true</code></pre>
              </div>
              <p class="text-secondary">非贪婪模式会尽可能少地匹配字符，尽早满足整个表达式。</p>
            </div>
          </div>
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
            <h3 class="text-lg font-semibold mb-md">方括号查找某个范围</h3>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>方括号查找某个范围</th>
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

            <h3 class="text-lg font-semibold mb-md mt-xl">元字符</h3>
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
                    <td :class="{ red: item.important }"><code>{{ item.char }}</code></td>
                    <td :class="{ red: item.important }">{{ item.desc }}</td>
                    <td :class="{ red: item.important }"><code>{{ item.example }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="notice-box">
              <h4 class="text-md font-semibold mb-sm">正则元字符记忆口诀：</h4>
              <p class="text-secondary">数字d、单词w、空白s(大写表相反,记得加斜杠！), . 表任意，边界换行回车制表符别忘了！</p>
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

      <!-- 练习 -->
      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">💪</span>
            练习
          </h2>
        </div>
        <div class="card-body">
          <div class="code-block">
            <pre><code>// 以大写字母开头,中间11位数字,以2到6位小写字母结尾
/^[A-Z]+\d{11}[a-z]{2,6}/g

// 邮箱验证
/[A-z0-9]+@{1}[A-z0-9]+\.(com){1}/

// 修改顺序
const regExp = /(\d{4})-(\d{2})-(\d{2})/
'2025-03-05'.replace(regExp2, '$3/$2/$1') => 05/03/2025

// 分组练习
const regExp = /(haha){1}(hehe){1}(a){1}/
console.log('hahahehea'.replace(regExp, '$3 $2 $1'))</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@/assets/css/unified-styles.css';

const syntaxList = ref([
  {
    icon: '📌',
    title: '字面量创建',
    example: '/pattern/flags',
    desc: '推荐使用字面量语法进行创建'
  },
  {
    icon: '⚙️',
    title: '构造函数',
    example: 'new RegExp("pattern", "flags")',
    desc: '动态构建正则时使用'
  },
  {
    icon: '🚩',
    title: '常用修饰符',
    example: 'g(全局) i(忽略大小写) m(多行)',
    desc: '修改匹配行为'
  }
]);

const regExpMethods = ref([
  {
    name: 'test()',
    desc: '测试是否匹配',
    example: '/\\d+/.test("123"); // true'
  },
  {
    name: 'exec()',
    desc: '获取匹配详情',
    example: '/\\d+/.exec("abc123def"); // ["123"]'
  }
]);

const stringMethods = ref([
  {
    name: 'match()',
    desc: '查找匹配结果',
    example: '"123abc".match(/\\d+/); // ["123"]'
  },
  {
    name: 'replace()',
    desc: '替换匹配内容',
    example: '"hello".replace(/l/g, "L"); replace(/l/g, "$n") $n,n代表着分组的序号，序号是从1开始的 // "heLLo"'
  },
  {
    name: 'matchAll()',
    desc: '查找所有匹配结果',
    example: '"123abc".matchAll(/\\d+/g); // [Array Iterator]'
  },
  {
    name: 'replaceAll()',
    desc: '替换所有匹配内容',
    example: '"hello".replaceAll(/l/g, "L"); // "heLLo"'
  }
]);

const brackets = ref([
  { char: '[abc]', desc: '查找方括号之间的任何字符', example: '/[abc]/ → "abc"' },
  { char: '[^abc]', desc: '查找不在方括号中的字符', example: '/[^abc]/ → "def"' },
  { char: '[a-z]', desc: '匹配小写字母', example: '/[a-z]/ → "a"' },
  { char: '[A-Z]', desc: '匹配大写字母', example: '/[A-Z]/ → "A"' },
  { char: '[A-z]', desc: '匹配字母', example: '/[A-z]+/ → "Az"' },
  { char: '[0-9]', desc: '匹配数字字符', example: '/[0-9]/ → "123"' },
  { char: '[adgk]', desc: '查找给定集合内的任何字符', example: '/[adgk]/ → "adgk"' },
  { char: '[^adgk]', desc: '查找给定集合外的任何字符', example: '/[adgk]/ → "cji"' },
  { char: '[(red|blue|green)]', desc: '查找任何指定的选项', example: '/[(red|blue|green)]/ → "red"' },
]);

const metaCharacters = ref([
  { char: '\\', desc: '转义字符', important: true, example: '/\\./ → ".' },
  { char: '\\d', desc: '数字字符', important: true, example: '/\\d+/ → "123"' },
  { char: '\\w', desc: '数字、字母及下划线', important: true, example: '/\\w+/ → "hello"' },
  { char: '\\s', desc: '空白字符', important: true, example: '/\\s+/ → " "' },
  { char: '.', desc: '匹配任意字符', important: true, example: '/a.c/ → "abc"' },
  { char: '(xyz)', desc: '()包裹xyz为一个匹配单元，捕获分组', important: true, example: '/^(xyz)d+/ → "xyz23"' },
  { char: '(?:xyz)', desc: '(?:)包裹xyz为一个匹配单元，非捕获分组,$n不会捕获到分组', example: '/^(?:xyz)d+/ → "xyz23"' },
  { char: 'x(?=y)', desc: '匹配后面是y的x', important: true, example: '/x(?=y)/ → "xy"' },
  { char: 'x(!=y)', desc: '匹配后面不是y的x', example: '/x(!=y)/ → "xt"' },
  { char: '(?<=y)x', desc: '匹配前面是y的x', important: true, example: '/(?<=y)x/ → "yx"' },
  { char: '(?!=y)x', desc: '匹配前面不是y的x', example: '/(?!=y)x/ → "tx"' },
  { char: '\\D', desc: '非数字字符', example: '/\\D+/ → "abc"' },
  { char: '\\W', desc: '非单词字符', example: '/\\W+/ → "#!"' },
  { char: '\\S', desc: '非空白字符', example: '/\\S+/ → "abc123"' },
  { char: '\\b', desc: '单词边界', important: true, example: '/\\bword\\b/ → "word"' },
  { char: '\\B', desc: '非单词边界', example: '/\\Bword\\B/ → "word"' },
  { char: '\\n', desc: '换行符', important: true, example: '/\\n/ → "\\n"' },
  { char: '\\r', desc: '回车符', example: '/\\r/ → "\\r"' },
  { char: '\\t', desc: '制表符', example: '/\\t/ → "\\t"' },
  { char: '\\f', desc: '换页符', example: '/\\f/ → "\\f"' },
  { char: '\\v', desc: '垂直制表符', example: '/\\v/ → "\\v"' },
  { char: '\\xxx', desc: '八进制字符', example: '/\\101/ → "A"' },
  { char: '\\xdd', desc: '十六进制字符', example: '/\\x41/ → "A"' },
  { char: '\\uxxxx', desc: 'Unicode 字符', example: '/\\u{1F600}/ → "😀"' }
]);

const quantifiers = ref([
  { char: '+', desc: '匹配前一个字符一次或多次', example: '/a+/ → "aaa"' },
  { char: '*', desc: '匹配前一个字符零次或多次', example: '/a*/ → "aaa"' },
  { char: '?', desc: '匹配前一个字符零次或一次', example: '/a?b/ → "b"' },
  { char: '{n,m}', desc: '匹配前一个字符至少n次，但不超过m次', example: '/a{1,3}/ → "aa"' },
  { char: '{n,}', desc: '匹配前一个字符至少n次', example: '/a{2,}/ → "aaa"' },
  { char: '{n}', desc: '匹配前一个字符恰好n次', example: '/a{2}/ → "aa"' },
  { char: '^n', desc: '匹配任何开头为 n 的字符串', example: '/^a/ → "aa"' },
  { char: 'n$', desc: '匹配任何结尾为 n 的字符串', example: '/a$/ → "aa"' }
]);
</script>

<style scoped>
/* 组件特定样式 */
.syntax-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
  text-align: center;
  transition: transform 0.2s ease;
}

.syntax-card:hover {
  transform: translateY(-2px);
}

.syntax-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.method-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.method-item {
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-light);
}

.method-item:last-child {
  border-bottom: none;
}

.method-name {
  color: var(--primary-color);
  font-weight: bold;
  font-size: var(--text-sm);
}

.method-desc {
  color: var(--text-secondary);
  margin: var(--spacing-sm) 0;
}

.example-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.notice-box {
  background: var(--primary-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--primary-light);
  margin: var(--spacing-lg) 0;
}

.red {
  color: var(--error-color);
}

/* 响应式调整 */
@media (max-width: 768px) {

  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
