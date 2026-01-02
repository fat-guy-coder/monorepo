<template>
  <div class="js-with-eval">
    <header class="page-header">
      <div class="header-content">
        <h1>JavaScript with 和 eval 函数</h1>
        <p class="subtitle">强大但危险的特性 - 深入理解其机制与最佳实践</p>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-number">⚠️</span>
            <span class="stat-label">谨慎使用</span>
          </div>
          <div class="stat">
            <span class="stat-number">🚫</span>
            <span class="stat-label">严格模式禁用</span>
          </div>
          <div class="stat">
            <span class="stat-number">🔍</span>
            <span class="stat-label">理解原理</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="warning-banner">
        <div class="warning-content">
          <div class="warning-icon">⚠️</div>
          <div class="warning-text">
            <h3>安全警告</h3>
            <p><code>with</code> 和 <code>eval</code> 是 JavaScript 中强大但危险的特性。在现代开发中应尽量避免使用，除非在非常特定的场景下且完全了解其风险。</p>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">特性对比</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell">特性</div>
            <div class="header-cell">with 语句</div>
            <div class="header-cell">eval 函数</div>
          </div>
          <div class="table-row" v-for="row in comparisonData" :key="row.feature">
            <div class="row-cell feature-cell">{{ row.feature }}</div>
<div class="row-cell" :class="{ 'highlight-warning': row.with.warning }">
              <span class="cell-content">{{ row.with.value }}</span>
              <span class="cell-tag" :class="row.with.tagType" v-if="row.with.tag">{{ row.with.tag }}</span>
            </div>
            <div class="row-cell" :class="{ 'highlight-warning': row.eval.warning }">
              <span class="cell-content">{{ row.eval.value }}</span>
              <span class="cell-tag" :class="row.eval.tagType" v-if="row.eval.tag">{{ row.eval.tag }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="content-grid">
        <section class="with-section">
          <div class="section-header">
            <h2>with 语句</h2>
            <div class="danger-level level-high">高风险</div>
          </div>

          <div class="definition-card">
            <h3>作用与定义</h3>
            <p><code>with</code> 语句用于扩展一个语句的作用域链，将指定的对象添加到作用域链的头部。</p>
            <div class="code-block">
              <pre><code>with (expression)
  statement</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>代码示例</h3>
            <div class="example-tabs">
              <button
                v-for="example in withExamples"
                :key="example.id"
                class="example-tab"
                :class="{ active: activeWithExample === example.id }"
                @click="activeWithExample = example.id"
              >
                {{ example.title }}
              </button>
            </div>
            <div class="example-content">
              <div v-for="example in withExamples" :key="example.id" v-show="activeWithExample === example.id">
                <div class="code-block">
                  <pre><code>{{ example.code }}</code></pre>
                </div>
                <p class="example-description">{{ example.description }}</p>
              </div>
            </div>
          </div>

          <div class="pros-cons-grid">
            <div class="pros-card">
              <h3>优点</h3>
              <ul>
                <li v-for="pro in withPros" :key="pro">
                  <span class="check-icon">✅</span>
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons-card">
              <h3>缺点</h3>
              <ul>
                <li v-for="con in withCons" :key="con">
                  <span class="warning-icon">❌</span>
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div class="usage-card">
            <h3>适用场景</h3>
            <div class="scenarios">
              <div
                v-for="scenario in withScenarios"
                :key="scenario.id"
                class="scenario-item"
                :class="{ 'discouraged': scenario.discouraged }"
              >
                <div class="scenario-icon">{{ scenario.icon }}</div>
                <div class="scenario-content">
                  <h4>{{ scenario.title }}</h4>
                  <p>{{ scenario.description }}</p>
                </div>
                <div class="scenario-tag" :class="scenario.tagType">{{ scenario.tag }}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="eval-section">
          <div class="section-header">
            <h2>eval 函数</h2>
            <div class="danger-level level-critical">极高风险</div>
          </div>

          <div class="definition-card">
            <h3>作用与定义</h3>
            <p><code>eval()</code> 函数会将传入的字符串当做 JavaScript 代码进行执行。</p>
            <div class="code-block">
              <pre><code>eval(string)</code></pre>
            </div>
          </div>

          <div class="example-card">
            <h3>代码示例</h3>
            <div class="example-tabs">
              <button
                v-for="example in evalExamples"
                :key="example.id"
                class="example-tab"
                :class="{ active: activeEvalExample === example.id }"
                @click="activeEvalExample = example.id"
              >
                {{ example.title }}
              </button>
            </div>
            <div class="example-content">
              <div v-for="example in evalExamples" :key="example.id" v-show="activeEvalExample === example.id">
                <div class="code-block">
                  <pre><code>{{ example.code }}</code></pre>
                </div>
                <p class="example-description">{{ example.description }}</p>
              </div>
            </div>
          </div>

          <div class="pros-cons-grid">
            <div class="pros-card">
              <h3>优点</h3>
              <ul>
                <li v-for="pro in evalPros" :key="pro">
                  <span class="check-icon">✅</span>
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div class="cons-card">
              <h3>缺点</h3>
              <ul>
                <li v-for="con in evalCons" :key="con">
                  <span class="warning-icon">❌</span>
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div class="security-card">
            <h3>安全注意事项</h3>
            <div class="security-tips">
              <div
                v-for="tip in securityTips"
                :key="tip.id"
                class="security-tip"
                :class="tip.level"
              >
                <div class="tip-header">
                  <span class="tip-icon">{{ tip.icon }}</span>
                  <h4>{{ tip.title }}</h4>
                </div>
                <p>{{ tip.description }}</p>
                <div class="tip-code" v-if="tip.code">
                  <pre><code>{{ tip.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="alternatives-section">
        <h2 class="section-title">替代方案</h2>
        <div class="alternatives-grid">
          <div
            v-for="alternative in alternatives"
            :key="alternative.id"
            class="alternative-card"
          >
            <div class="alt-header">
              <h3>{{ alternative.title }}</h3>
              <span class="alt-type">{{ alternative.type }}</span>
            </div>
            <p class="alt-description">{{ alternative.description }}</p>
            <div class="alt-example">
              <h4>示例：</h4>
              <div class="code-block">
                <pre><code>{{ alternative.example }}</code></pre>
              </div>
            </div>
            <div class="alt-benefits">
              <span
                v-for="benefit in alternative.benefits"
                :key="benefit"
                class="benefit-tag"
              >{{ benefit }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <h2 class="section-title">最佳实践总结</h2>
        <div class="practices-list">
          <div
            v-for="practice in bestPractices"
            :key="practice.id"
            class="practice-item"
          >
            <div class="practice-icon">{{ practice.icon }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>JavaScript with 和 eval</h3>
          <p>理解其原理，谨慎使用，优先选择更安全的替代方案</p>
        </div>
        <div class="footer-links">
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with" target="_blank">MDN with 文档</a>
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval" target="_blank">MDN eval 文档</a>
          <a href="https://eslint.org/docs/rules/no-eval" target="_blank">ESLint 规则</a>
          <a href="https://262.ecma-international.org/" target="_blank">ECMAScript 规范</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeWithExample = ref('basic')
const activeEvalExample = ref('basic')

// 对比表格数据
const comparisonData = ref([
  {
    feature: '主要作用',
    with: { value: '扩展作用域链', tag: '作用域操作', tagType: 'info' },
    eval: { value: '执行字符串代码', tag: '代码执行', tagType: 'info' }
  },
  {
    feature: '严格模式',
    with: { value: '禁止使用', tag: '语法错误', tagType: 'error', warning: true },
    eval: { value: '受限使用', tag: '限制作用域', tagType: 'warning', warning: true }
  },
  {
    feature: '性能影响',
    with: { value: '严重', tag: '优化困难', tagType: 'error', warning: true },
    eval: { value: '严重', tag: '无优化', tagType: 'error', warning: true }
  },
  {
    feature: '安全性',
    with: { value: '中等风险', tag: '可能被利用', tagType: 'warning', warning: true },
    eval: { value: '极高风险', tag: '代码注入', tagType: 'error', warning: true }
  },
  {
    feature: '可读性',
    with: { value: '差', tag: '混淆来源', tagType: 'warning', warning: true },
    eval: { value: '极差', tag: '难以追踪', tagType: 'error', warning: true }
  },
  {
    feature: '使用频率',
    with: { value: '极少', tag: '不推荐', tagType: 'error', warning: true },
    eval: { value: '谨慎', tag: '特殊情况', tagType: 'warning', warning: true }
  }
])

// with 语句示例
const withExamples = ref([
  {
    id: 'basic',
    title: '基础用法',
    code: `const obj = {
  a: 1,
  b: 2,
  c: 3
};

// 不使用 with
console.log(obj.a);
console.log(obj.b);
console.log(obj.c);

// 使用 with
with (obj) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3
}`,
    description: 'with 语句将 obj 的属性添加到当前作用域链，可以直接访问属性而无需前缀。'
  },
  {
    id: 'scope',
    title: '作用域链问题',
    code: `const x = 10;
const obj = { y: 20 };

with (obj) {
  console.log(y); // 20 - 来自 obj
  console.log(x); // 10 - 来自外部作用域
  z = 30; // 在严格模式下会报错，非严格模式下会创建全局变量
}`,
    description: 'with 会改变标识符解析顺序，可能导致意外的变量访问和创建。'
  },
  {
    id: 'performance',
    title: '性能问题演示',
    code: `function withoutWith(obj) {
  return obj.a + obj.b + obj.c;
}

function withWith(obj) {
  with (obj) {
    return a + b + c;
  }
}

// withWith 函数无法被 JavaScript 引擎优化
// 因为引擎无法在编译时确定 a、b、c 的来源`,
    description: 'with 语句阻止了 JavaScript 引擎的优化，因为作用域在运行时才能确定。'
  }
])

// eval 函数示例
const evalExamples = ref([
  {
    id: 'basic',
    title: '基础用法',
    code: `// 执行简单表达式
const result = eval('2 + 2');
console.log(result); // 4

// 执行函数
eval('function sayHello() { console.log("Hello"); }');
sayHello(); // "Hello"

// 访问和修改变量
let x = 10;
eval('x = 20');
console.log(x); // 20`,
    description: 'eval 可以执行任何有效的 JavaScript 代码字符串，包括表达式、函数声明和变量操作。'
  },
  {
    id: 'security',
    title: '安全问题演示',
    code: `// 危险的 eval 使用
const userInput = "console.log('恶意代码执行'); process.exit(0)";

// 直接执行用户输入 - 极其危险!
eval(userInput);

// 稍微安全的使用方式（仍然不推荐）
function safeEval(code) {
  // 使用间接调用，限制作用域
  const indirectEval = eval;
  return indirectEval(code);
}

// 但仍然存在风险，应该完全避免`,
    description: '直接执行用户输入或不可信源的字符串可能导致代码注入攻击。'
  },
  {
    id: 'strict',
    title: '严格模式下的行为',
    code: `'use strict';

// 在严格模式下，eval 有自己的作用域
var x = 10;

function test() {
  var x = 20;
  eval('var x = 30; console.log(x);'); // 30
  console.log(x); // 20 - eval 的变量不会泄漏
}

test();
console.log(x); // 10

// 尝试使用 eval 创建变量会报错
eval('y = 40;'); // ReferenceError: y is not defined`,
    description: '严格模式下，eval 创建的作用域不会影响外部作用域，提供了一定的安全性改进。'
  }
])

// with 语句优缺点
const withPros = ref([
  '减少重复的对象引用，使代码更简洁',
  '在某些模板或DSL场景下可以提供更自然的语法',
  '可以模拟其他语言的作用域特性'
])

const withCons = ref([
  '严重性能问题 - 阻止JavaScript引擎优化',
  '代码可读性差 - 难以确定变量来源',
  '严格模式下被禁用，导致兼容性问题',
  '可能意外创建全局变量',
  '调试困难 - 堆栈跟踪不清晰',
  '已被现代JavaScript开发弃用'
])

// eval 函数优缺点
const evalPros = ref([
  '动态执行代码，提供极大灵活性',
  '可以用于实现REPL（读取-求值-输出循环）',
  '在某些元编程场景下有用',
  '可以动态生成和执行函数'
])

const evalCons = ref([
  '严重安全风险 - 代码注入攻击',
  '性能极差 - 无法被编译优化',
  '代码难以维护和调试',
  '工具链支持差（TypeScript、ESLint等）',
  '严格模式限制其行为',
  '大多数情况下有更好的替代方案'
])

// with 适用场景
const withScenarios = ref([
  {
    id: 'template',
    title: '模板引擎',
    description: '在某些简单的模板系统中，with 可以提供更简洁的变量访问方式',
    icon: '📝',
    tag: '历史用途',
    tagType: 'historical',
    discouraged: true
  },
  {
    id: 'debugging',
    title: '调试工具',
    description: '在开发工具中临时检查对象属性',
    icon: '🐛',
    tag: '特殊情况',
    tagType: 'special',
    discouraged: false
  },
  {
    id: 'dsl',
    title: '领域特定语言',
    description: '实现简单的DSL时提供自然的语法',
    icon: '🔤',
    tag: '专家场景',
    tagType: 'expert',
    discouraged: true
  },
  {
    id: 'legacy',
    title: '遗留代码维护',
    description: '维护包含 with 的老代码库',
    icon: '🏛️',
    tag: '不得已',
    tagType: 'legacy',
    discouraged: false
  }
])

// 安全提示
const securityTips = ref([
  {
    id: 'input',
    title: '永远不要执行用户输入',
    description: '绝对不要将用户提供的数据直接传递给 eval，这会导致严重的代码注入漏洞。',
    icon: '🚫',
    level: 'critical',
    code: `// 极其危险!
const userInput = getUserInput();
eval(userInput); // 可能导致系统被完全控制`
  },
  {
    id: 'sandbox',
    title: '使用沙箱环境',
    description: '如果必须执行动态代码，使用 Web Workers 或 iframe 沙箱来隔离执行环境。',
    icon: '🏖️',
    level: 'advanced',
    code: `// 在 Web Worker 中执行
const worker = new Worker('data:text/javascript,' +
  encodeURIComponent(code));`
  },
  {
    id: 'validation',
    title: '严格的输入验证',
    description: '对要执行的代码进行严格的语法验证和白名单过滤。',
    icon: '🔒',
    level: 'intermediate',
    code: `function safeEval(code) {
  // 只允许简单的数学表达式
  if (!/^[0-9+\\-*/().\\s]+$/.test(code)) {
    throw new Error('Invalid code');
  }
  return eval(code);
}`
  },
  {
    id: 'alternatives',
    title: '优先使用替代方案',
    description: '在大多数情况下，Function 构造函数或 JSON.parse 是更安全的选择。',
    icon: '🔄',
    level: 'recommended',
    code: `// 使用 Function 而不是 eval
const add = new Function('a', 'b', 'return a + b');
add(1, 2); // 3`
  }
])

// 替代方案
const alternatives = ref([
  {
    id: 'function',
    title: 'Function 构造函数',
    type: 'eval 替代',
    description: '创建新函数而不是直接执行代码，提供更好的隔离性',
    example: `// 而不是 eval('function add(a, b) { return a + b }')
const add = new Function('a', 'b', 'return a + b;');
console.log(add(1, 2)); // 3`,
    benefits: ['作用域隔离', '稍好的性能', '更清晰的语义']
  },
  {
    id: 'json',
    title: 'JSON.parse',
    type: 'eval 替代',
    description: '用于解析JSON数据，比 eval 更安全且性能更好',
    example: `// 而不是 eval('(' + jsonString + ')')
const data = JSON.parse('{"name": "John", "age": 30}');
console.log(data.name); // "John"`,
    benefits: ['完全安全', '高性能', '标准方法']
  },
  {
    id: 'destructuring',
    title: '解构赋值',
    type: 'with 替代',
    description: '使用对象解构来简化对象属性的访问',
    example: `// 而不是 with(obj) { console.log(a, b, c) }
const { a, b, c } = obj;
console.log(a, b, c);`,
    benefits: ['语法清晰', '可优化', '无副作用']
  },
  {
    id: 'proxy',
    title: 'Proxy 对象',
    type: 'with 替代',
    description: '创建代理对象来控制属性访问行为',
    example: `const obj = { a: 1, b: 2 };
const handler = {
  get(target, prop) {
    console.log(\`访问属性: \${prop}\`);
    return target[prop];
  }
};
const proxy = new Proxy(obj, handler);
console.log(proxy.a); // 记录访问并返回 1`,
    benefits: ['完全控制', '无副作用', '现代API']
  }
])

// 最佳实践
const bestPractices = ref([
  {
    id: 'avoid',
    title: '尽量避免使用',
    description: '在99%的情况下，都有更好、更安全、性能更高的替代方案。只有在完全理解风险且没有其他选择时才考虑使用。',
    icon: '🚫'
  },
  {
    id: 'strict',
    title: '启用严格模式',
    description: '严格模式对 eval 和 with 有额外限制，可以减少一些安全隐患。',
    icon: '📏'
  },
  {
    id: 'lint',
    title: '使用代码检查工具',
    description: '配置 ESLint 的 no-eval 和 no-with 规则，在代码审查中捕获这些危险用法。',
    icon: '🔍'
  },
  {
    id: 'review',
    title: '代码审查',
    description: '在团队中建立代码审查流程，特别关注任何动态代码执行的使用。',
    icon: '👥'
  },
  {
    id: 'education',
    title: '团队教育',
    description: '确保团队成员理解这些特性的风险和替代方案。',
    icon: '📚'
  },
  {
    id: 'refactor',
    title: '重构遗留代码',
    description: '有计划地重构包含 with 或危险 eval 用法的遗留代码。',
    icon: '🔧'
  }
])
</script>

<style lang="less" scoped>
.js-with-eval {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: 'SF Pro Text', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

.page-header {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2rem;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        font-weight: 500;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.warning-banner {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  margin-bottom: 3rem;
  padding: 1.5rem;

  .warning-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .warning-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .warning-text {
      flex: 1;

      h3 {
        color: #92400e;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }

      p {
        color: #92400e;
        margin: 0;
        line-height: 1.5;

        code {
          background: rgba(139, 69, 19, 0.1);
          color: #92400e;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-weight: 600;
        }
      }
    }
  }
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #374151;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(135deg, #6b7280, #4b5563);
    border-radius: 2px;
  }
}

// 对比表格样式
.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #4b5563;
    color: white;
    font-weight: 600;

    .header-cell {
      padding: 1rem;
      text-align: center;
      font-size: 1.1rem;

      &:first-child {
        text-align: left;
      }
    }
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
      border-bottom: none;
    }

    .row-cell {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.feature-cell {
        font-weight: 600;
        color: #374151;
        background: #f9fafb;
      }

      &.highlight-warning {
        background: #fef2f2;
      }

      .cell-content {
        flex: 1;
      }

      .cell-tag {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 0.5rem;

        &.info {
          background: #dbeafe;
          color: #1e40af;
        }

        &.warning {
          background: #fef3c7;
          color: #92400e;
        }

        &.error {
          background: #fee2e2;
          color: #dc2626;
        }
      }
    }
  }
}

// 内容网格布局
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
}

.with-section, .eval-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;

    h2 {
      font-size: 1.5rem;
      color: #374151;
      margin: 0;
    }

    .danger-level {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      color: white;

      &.level-high {
        background: #dc2626;
      }

      &.level-critical {
        background: #7f1d1d;
      }
    }
  }
}

.definition-card, .example-card, .usage-card, .security-card {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    color: #374151;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.example-card {
  .example-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .example-tab {
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e5e7eb;
    }

    &.active {
      background: #4b5563;
      color: white;
      border-color: #4b5563;
    }
  }

  .example-description {
    font-size: 0.9rem;
    color: #6b7280;
    margin-top: 1rem;
    line-height: 1.5;
  }
}

.code-block {
  background: #1f2937;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;
  }

  code {
    color: #e5e7eb;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros-card, .cons-card {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .pros-card {
    border-left-color: #10b981;

    h3 {
      color: #065f46;
    }
  }

  .cons-card {
    border-left-color: #ef4444;

    h3 {
      color: #7f1d1d;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 0;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      .check-icon, .warning-icon {
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
    }
  }
}

.usage-card {
  .scenarios {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .scenario-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid #d1d5db;
    transition: all 0.2s ease;

    &.discouraged {
      background: #fef2f2;
      border-left-color: #fca5a5;
    }

    .scenario-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .scenario-content {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #374151;
        font-size: 1rem;
      }

      p {
        margin: 0;
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }

    .scenario-tag {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      flex-shrink: 0;

      &.historical {
        background: #f3f4f6;
        color: #6b7280;
      }

      &.special {
        background: #dbeafe;
        color: #1e40af;
      }

      &.expert {
        background: #fef3c7;
        color: #92400e;
      }

      &.legacy {
        background: #e5e7eb;
        color: #374151;
      }
    }
  }
}

.security-card {
  .security-tips {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .security-tip {
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid;

    &.critical {
      background: #fef2f2;
      border-left-color: #dc2626;
    }

    &.advanced {
      background: #eff6ff;
      border-left-color: #2563eb;
    }

    &.intermediate {
      background: #f0fdf4;
      border-left-color: #16a34a;
    }

    &.recommended {
      background: #fffbeb;
      border-left-color: #d97706;
    }

    .tip-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;

      .tip-icon {
        font-size: 1.2rem;
      }

      h4 {
        margin: 0;
        color: #374151;
        font-size: 1rem;
      }
    }

    p {
      margin: 0 0 1rem 0;
      color: #6b7280;
      line-height: 1.5;
    }

    .tip-code {
      background: #1f2937;
      border-radius: 6px;
      overflow: hidden;

      pre {
        margin: 0;
        padding: 1rem;
      }

      code {
        color: #e5e7eb;
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
      }
    }
  }
}

.alternatives-section {
  .alternatives-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .alternative-card {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .alt-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      h3 {
        margin: 0;
        color: #374151;
        font-size: 1.1rem;
      }

      .alt-type {
        background: #e5e7eb;
        color: #6b7280;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    .alt-description {
      color: #6b7280;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .alt-example {
      h4 {
        margin: 0 0 0.5rem 0;
        color: #374151;
        font-size: 0.9rem;
      }
    }

    .alt-benefits {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .benefit-tag {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }
}

.best-practices-section {
  .practices-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid #4b5563;

    .practice-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .practice-content {
      flex: 1;

      h3 {
        margin: 0 0 0.5rem 0;
        color: #374151;
        font-size: 1rem;
      }

      p {
        margin: 0;
        color: #6b7280;
        line-height: 1.5;
        font-size: 0.9rem;
      }
    }
  }
}

.page-footer {
  background: #374151;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #d1d5db;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.2rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.5rem !important;
    }
  }

  .comparison-table {
    .table-header, .table-row {
      grid-template-columns: 1fr;

      .header-cell, .row-cell {
        padding: 0.75rem;
      }
    }
  }
}
</style>
