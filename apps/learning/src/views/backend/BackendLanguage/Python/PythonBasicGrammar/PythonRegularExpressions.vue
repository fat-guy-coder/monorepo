<template>
  <div class="regex-guide">
    <header class="hero">
      <h1>📐 Python 正则表达式完全指南</h1>
      <p>re 模块 · 元字符 · 分组 · 断言 · 贪婪与非贪婪 · 实战示例</p>
      <div class="badge-group">
        <span>🔍 模式匹配</span><span>⚡ 文本处理</span><span>🧩 分组提取</span>
      </div>
    </header>

    <!-- 核心函数卡片 -->
    <div class="section">
      <h2>📦 re 模块核心函数</h2>
      <div class="cards-grid">
        <div class="func-card" v-for="fn in functions" :key="fn.name">
          <div class="func-name">{{ fn.name }}</div>
          <div class="func-sig">{{ fn.signature }}</div>
          <p class="func-desc">{{ fn.desc }}</p>
          <pre class="code-snip"><code>{{ fn.example }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 元字符速查表 -->
    <div class="section">
      <h2>🔠 元字符与语法速查</h2>
      <div class="table-wrapper">
        <table class="meta-table">
          <thead><tr><th>元字符</th><th>说明</th><th>示例</th></tr></thead>
          <tbody>
            <tr v-for="m in metacharacters" :key="m.char">
              <td class="char"><code>{{ m.char }}</code></td>
              <td>{{ m.desc }}</td>
              <td><code>{{ m.example }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 量词与分组 -->
    <div class="section">
      <h2>📊 量词、分组与断言</h2>
      <div class="two-columns">
        <div class="card">
          <h3>量词 (Quantifiers)</h3>
          <ul><li v-for="q in quantifiers" :key="q.symbol"><code>{{ q.symbol }}</code> – {{ q.desc }}</li></ul>
        </div>
        <div class="card">
          <h3>分组与捕获</h3>
          <ul><li v-for="g in groups" :key="g.syntax"><code>{{ g.syntax }}</code> – {{ g.desc }}</li></ul>
        </div>
        <div class="card">
          <h3>断言 (Assertions)</h3>
          <ul><li v-for="a in assertions" :key="a.syntax"><code>{{ a.syntax }}</code> – {{ a.desc }}</li></ul>
        </div>
        <div class="card">
          <h3>标志位 (Flags)</h3>
          <ul><li v-for="f in flags" :key="f.flag"><code>{{ f.flag }}</code> – {{ f.desc }}</li></ul>
        </div>
      </div>
    </div>

    <!-- 实际使用示例 -->
    <div class="section">
      <h2>💡 实战示例</h2>
      <div class="examples-grid">
        <div class="example-card" v-for="ex in examples" :key="ex.title">
          <h3>{{ ex.title }}</h3>
          <p>{{ ex.desc }}</p>
          <pre class="code-snip"><code>{{ ex.code }}</code></pre>
          <div class="output">输出: {{ ex.output }}</div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>💡 推荐使用原始字符串 <code>r"pattern"</code> 避免转义反斜杠</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface FunctionItem {
  name: string;
  signature: string;
  desc: string;
  example: string;
}
const functions: FunctionItem[] = [
  { name: 're.match', signature: 're.match(pattern, string, flags=0)', desc: '从字符串开头匹配，返回 Match 对象或 None。', example: "m = re.match(r'\\d+', '123abc')\nprint(m.group())  # '123'" },
  { name: 're.search', signature: 're.search(pattern, string, flags=0)', desc: '扫描整个字符串，返回第一个匹配。', example: "m = re.search(r'\\d+', 'abc123def')\nprint(m.group())  # '123'" },
  { name: 're.findall', signature: 're.findall(pattern, string, flags=0)', desc: '返回所有非重叠匹配的列表。', example: "res = re.findall(r'\\d+', 'a1b22c333')\nprint(res)  # ['1','22','333']" },
  { name: 're.finditer', signature: 're.finditer(pattern, string, flags=0)', desc: '返回迭代器，每个元素是 Match 对象。', example: "for m in re.finditer(r'\\d+', 'a1b22'):\n    print(m.group())" },
  { name: 're.sub', signature: 're.sub(pattern, repl, string, count=0)', desc: '替换匹配项，支持函数替换。', example: "s = re.sub(r'\\d+', 'NUM', 'abc123def')\nprint(s)  # 'abcNUMdef'" },
  { name: 're.split', signature: 're.split(pattern, string, maxsplit=0)', desc: '按正则分割字符串。', example: "parts = re.split(r'[,;]+', 'a,b;c,d')\nprint(parts)  # ['a','b','c','d']" },
  { name: 're.compile', signature: 're.compile(pattern, flags=0)', desc: '预编译正则，提高重复使用效率。', example: "pat = re.compile(r'\\w+')\npat.findall('hello world')" }
];

interface MetaChar {
  char: string;
  desc: string;
  example: string;
}
const metacharacters: MetaChar[] = [
  { char: '.', desc: '匹配任意单个字符（除换行符）', example: "'.' → 'a', '中'" },
  { char: '^', desc: '匹配字符串开头', example: "'^abc' 匹配 'abc...'" },
  { char: '$', desc: '匹配字符串结尾', example: "'abc$' 匹配 '...abc'" },
  { char: '*', desc: '匹配前一个字符 0 次或多次', example: "'ab*' → 'a', 'ab', 'abb'" },
  { char: '+', desc: '匹配前一个字符 1 次或多次', example: "'ab+' → 'ab', 'abb' 不匹配 'a'" },
  { char: '?', desc: '匹配前一个字符 0 次或 1 次', example: "'ab?' → 'a', 'ab'" },
  { char: '{n}', desc: '匹配恰好 n 次', example: "'a{3}' → 'aaa'" },
  { char: '{n,}', desc: '匹配至少 n 次', example: "'a{2,}' → 'aa', 'aaa'..." },
  { char: '{n,m}', desc: '匹配 n 到 m 次', example: "'a{2,4}' → 'aa','aaa','aaaa'" },
  { char: '\\d', desc: '数字 [0-9]', example: "'\\d+' → '123'" },
  { char: '\\D', desc: '非数字', example: "'\\D+' → 'abc'" },
  { char: '\\w', desc: '字母数字下划线 [a-zA-Z0-9_]', example: "'\\w+' → 'hello_123'" },
  { char: '\\W', desc: '非单词字符', example: "'\\W+' → '@#$'" },
  { char: '\\s', desc: '空白字符（空格、制表、换行）', example: "'\\s+' → ' \\t\\n'" },
  { char: '\\S', desc: '非空白字符', example: "'\\S+' → 'abc123'" },
  { char: '[abc]', desc: '字符集，匹配其中任意一个', example: "'[aeiou]' → 'a','e'" },
  { char: '[^abc]', desc: '否定字符集', example: "'[^0-9]' → 非数字" },
  { char: 'a|b', desc: '或分支', example: "'cat|dog' → 'cat' 或 'dog'" },
  { char: '(...)', desc: '捕获分组', example: "r'(\\d+)' → 提取数字" },
  { char: '(?:...)', desc: '非捕获分组', example: "r'(?:\\d+)' 不捕获但参与匹配" },
  { char: '(?P<name>...)', desc: '命名捕获分组', example: "r'(?P<year>\\d{4})'" },
  { char: '\\b', desc: '单词边界', example: "r'\\bcat\\b' 匹配单词 cat" },
  { char: '\\B', desc: '非单词边界', example: "r'\\Bcat\\B' 匹配 scatss 内部" }
];

const quantifiers = [
  { symbol: '*?', desc: '非贪婪匹配 0 次或多次（尽可能少）' },
  { symbol: '+?', desc: '非贪婪匹配 1 次或多次' },
  { symbol: '??', desc: '非贪婪匹配 0 或 1 次' },
  { symbol: '{n,m}?', desc: '非贪婪匹配 n 到 m 次' }
];
const groups = [
  { syntax: '(pattern)', desc: '普通捕获组，通过 group(1) 访问' },
  { syntax: '(?:pattern)', desc: '非捕获组，不保存匹配内容' },
  { syntax: '(?P<name>pattern)', desc: '命名组，通过 group("name") 访问' },
  { syntax: '(?P=name)', desc: '引用命名组匹配的内容' },
  { syntax: '\\1, \\2...', desc: '反向引用，匹配第 n 个捕获组相同内容' }
];
const assertions = [
  { syntax: '(?=...)', desc: '正向先行断言，后跟 pattern' },
  { syntax: '(?!...)', desc: '负向先行断言，后不跟 pattern' },
  { syntax: '(?<=...)', desc: '正向后行断言，前面是 pattern' },
  { syntax: '(?<!...)', desc: '负向后行断言，前面不是 pattern' }
];
const flags = [
  { flag: 're.I', desc: '忽略大小写' },
  { flag: 're.M', desc: '多行模式，^$ 匹配每行首尾' },
  { flag: 're.S', desc: '点号匹配所有字符（含换行）' },
  { flag: 're.U', desc: 'Unicode 匹配（默认）' },
  { flag: 're.X', desc: '冗长模式，忽略空格和注释' },
  { flag: 're.A', desc: 'ASCII 模式，\\w 等仅匹配 ASCII' }
];

interface ExampleItem {
  title: string;
  desc: string;
  code: string;
  output: string;
}
const examples: ExampleItem[] = [
  { title: '提取邮箱', desc: '从文本中提取所有邮箱地址', code: "import re\ntext = '联系: admin@example.com, user@test.org'\npattern = r'\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b'\nprint(re.findall(pattern, text))", output: "['admin@example.com', 'user@test.org']" },
  { title: '验证手机号', desc: '中国大陆手机号格式', code: "pattern = r'^1[3-9]\\d{9}$'\nprint(bool(re.match(pattern, '13812345678')))", output: "True" },
  { title: 'URL 提取', desc: '匹配 http/https URL', code: "text = '访问 https://python.org 和 http://example.com'\npattern = r'https?://[\\w./-]+'\nprint(re.findall(pattern, text))", output: "['https://python.org', 'http://example.com']" },
  { title: '替换敏感词', desc: '将数字替换为 *', code: "s = '密码是 123456'\nresult = re.sub(r'\\d+', '******', s)\nprint(result)", output: "'密码是 ******'" },
  { title: '使用命名组', desc: '提取日期年/月/日', code: "pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'\nm = re.search(pattern, '2024-12-25')\nprint(m.group('year'))", output: "'2024'" }
];
</script>

<style lang="less" scoped>
.regex-guide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, monospace;
}
.hero {
  text-align: center;
  margin-bottom: 2rem;
  h1 { font-size: 2rem; font-weight: 700; background: linear-gradient(135deg, #1e293b, #3b82f6); background-clip: text; -webkit-background-clip: text; color: transparent; }
  p { color: #475569; margin-top: 0.25rem; }
  .badge-group { margin-top: 0.8rem; display: flex; justify-content: center; gap: 0.8rem; span { background: #eef2ff; color: #1e40af; padding: 0.2rem 1rem; border-radius: 2rem; font-size: 0.7rem; } }
}
.section { margin-bottom: 2rem; h2 { font-size: 1.4rem; font-weight: 600; margin-bottom: 1rem; border-left: 5px solid #3b82f6; padding-left: 0.8rem; } }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
.func-card { background: white; border-radius: 1rem; border: 1px solid #e4e7ec; padding: 0.9rem; .func-name { font-weight: 700; font-size: 1rem; font-family: monospace; } .func-sig { font-size: 0.7rem; color: #3b82f6; background: #eef2ff; display: inline-block; padding: 0.1rem 0.3rem; border-radius: 8px; margin: 0.3rem 0; } .func-desc { font-size: 0.75rem; margin: 0.4rem 0; } }
.code-snip { background: #1e293b; border-radius: 0.6rem; padding: 0.4rem; overflow-x: auto; font-size: 0.7rem; code { color: #e2e8f0; font-family: 'Fira Code', monospace; white-space: pre-wrap; } }
.table-wrapper { overflow-x: auto; background: white; border-radius: 1rem; border: 1px solid #e4e7ec; }
.meta-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; th, td { padding: 0.5rem 0.6rem; text-align: left; border-bottom: 1px solid #eef2f6; } th { background: #f8fafc; } .char { font-family: monospace; width: 100px; } }
.two-columns { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; .card { background: white; border-radius: 1rem; padding: 0.8rem; border: 1px solid #e4e7ec; h3 { font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem; } ul { margin: 0; padding-left: 1.2rem; li { font-size: 0.75rem; margin: 0.25rem 0; } } } }
.examples-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; .example-card { background: white; border-radius: 1rem; padding: 0.9rem; border: 1px solid #e4e7ec; h3 { font-size: 1rem; margin: 0 0 0.3rem; } p { font-size: 0.75rem; color: #475569; } .output { background: #eef2ff; padding: 0.2rem 0.5rem; border-radius: 8px; font-size: 0.7rem; margin-top: 0.5rem; font-family: monospace; } } }
.footer { text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #5b6e8c; }
@media (max-width: 720px) { .regex-guide { padding: 1rem; } }
</style>