<template>
  <div class="js-execution-container">
    <!-- 标题区域 -->
    <section class="header-section">
      <h1 class="title">JavaScript 执行字符串代码</h1>
      <div class="subtitle">动态执行JS代码字符串的方法与最佳实践</div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">5+</div>
          <div class="stat-label">执行方法</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-value">高</div>
          <div class="stat-label">安全风险</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔄</div>
          <div class="stat-value">动态</div>
          <div class="stat-label">执行特性</div>
        </div>
      </div>
    </section>

    <!-- 方法概览 -->
    <section class="methods-overview">
      <h2 class="section-title">📋 方法概览</h2>
      <div class="methods-grid">
        <div
          v-for="(method, index) in executionMethods"
          :key="index"
          :class="['method-card', { active: activeMethod === method.id }]"
          @click="activeMethod = method.id"
        >
          <div class="method-icon">{{ method.icon }}</div>
          <div class="method-name">{{ method.name }}</div>
        </div>
      </div>
    </section>

    <!-- 方法详情 -->
    <section class="method-details">
      <div v-if="currentMethod" class="detail-content">
        <div class="method-header">
          <div class="method-title">
            <div class="title-icon">{{ currentMethod.icon }}</div>
            <h2>{{ currentMethod.name }}</h2>
          </div>
          <div class="method-safety" :class="currentMethod.safetyLevel">
            安全等级: {{ currentMethod.safetyText }}
          </div>
        </div>

        <div class="method-description">
          <p>{{ currentMethod.description }}</p>
        </div>

        <div class="method-demo">
          <h3>代码示例</h3>
          <div class="demo-container">
            <div class="code-example">
              <pre><code>{{ currentMethod.codeExample }}</code></pre>
            </div>
            <div class="execution-controls">
              <button @click="executeDemo(currentMethod)" class="execute-btn">
                {{ isExecuting ? '执行中...' : '执行示例' }}
              </button>
              <div v-if="executionResult" class="execution-result">
                <div class="result-label">执行结果:</div>
                <div class="result-value">{{ executionResult }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="method-pros-cons">
          <div class="pros-section">
            <h3>👍 优点</h3>
            <ul>
              <li v-for="(pro, idx) in currentMethod.pros" :key="'pro'+idx">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons-section">
            <h3>👎 缺点</h3>
            <ul>
              <li v-for="(con, idx) in currentMethod.cons" :key="'con'+idx">{{ con }}</li>
            </ul>
          </div>
        </div>

        <div class="method-use-cases">
          <h3>🏆 适用场景</h3>
          <div class="use-cases-grid">
            <div
              v-for="(useCase, idx) in currentMethod.useCases"
              :key="'use'+idx"
              class="use-case-card"
            >
              <div class="case-icon">{{ useCase.icon }}</div>
              <div class="case-text">{{ useCase.text }}</div>
            </div>
          </div>
        </div>

        <div class="method-alternatives" v-if="currentMethod.alternatives">
          <h3>🔄 替代方案</h3>
          <p>{{ currentMethod.alternatives }}</p>
        </div>

        <div class="method-warning" v-if="currentMethod.warning">
          <div class="warning-icon">⚠️</div>
          <div class="warning-text">{{ currentMethod.warning }}</div>
        </div>
      </div>
    </section>

    <!-- 安全实践 -->
    <section class="safety-practices">
      <h2 class="section-title">🔒 安全实践</h2>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">🛡️</div>
          <div class="practice-content">
            <h3>输入验证</h3>
            <p>始终验证要执行的代码内容，确保不包含恶意脚本</p>
            <pre><code>function validateCode(code) {
  // 检查是否包含危险关键词
  const blacklist = ['eval', 'Function', 'document.cookie'];
  return !blacklist.some(keyword => code.includes(keyword));
}</code></pre>
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🌐</div>
          <div class="practice-content">
            <h3>沙箱环境</h3>
            <p>在隔离的沙箱环境中执行不受信任的代码</p>
            <pre><code>// 使用Web Worker创建隔离环境
const worker = new Worker('data:text/javascript,' +
  encodeURIComponent('postMessage(eval("' + code + '"));'));
worker.onmessage = e => console.log('Result:', e.data);</code></pre>
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">📦</div>
          <div class="practice-content">
            <h3>内容安全策略</h3>
            <p>使用CSP限制eval和动态代码执行</p>
            <pre><code>// HTTP响应头
Content-Security-Policy: script-src 'self';
// 或meta标签
&lt;meta http-equiv="Content-Security-Policy"
  content="script-src 'self'"&gt;</code></pre>
          </div>
        </div>
        <div class="practice-card">
          <div class="practice-icon">🔍</div>
          <div class="practice-content">
            <h3>代码分析</h3>
            <p>使用AST分析代码结构，确保安全性</p>
            <pre><code>const acorn = require('acorn');
const codeAST = acorn.parse(code, { ecmaVersion: 2020 });

// 检查AST中是否有危险节点
function isSafe(ast) {
  // 实现安全检查逻辑
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能比较 -->
    <section class="performance-comparison">
      <h2 class="section-title">⚡ 性能比较</h2>
      <div class="comparison-table">
        <div class="table-header">
          <div class="header-cell">方法</div>
          <div class="header-cell">执行速度</div>
          <div class="header-cell">内存使用</div>
          <div class="header-cell">作用域污染</div>
          <div class="header-cell">安全性</div>
        </div>
        <div
          v-for="(method, index) in executionMethods"
          :key="'comp'+index"
          class="table-row"
        >
          <div class="row-cell method-name">{{ method.name }}</div>
          <div class="row-cell">
            <div class="speed-bar" :style="{ width: method.performance.speed + '%' }"></div>
            <span>{{ method.performance.speedText }}</span>
          </div>
          <div class="row-cell">
            <div class="memory-bar" :style="{ width: method.performance.memory + '%' }"></div>
            <span>{{ method.performance.memoryText }}</span>
          </div>
          <div class="row-cell">
            <div class="scope-pollution" :class="method.performance.scopeClass">
              {{ method.performance.scopeText }}
            </div>
          </div>
          <div class="row-cell">
            <div class="safety-level" :class="method.safetyLevel">
              {{ method.safetyText }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practices">
      <h2 class="section-title">🏆 最佳实践</h2>
      <div class="practices-list">
        <div class="practice-item">
          <div class="practice-number">1</div>
          <div class="practice-content">
            <h3>避免执行用户输入</h3>
            <p>尽可能避免直接执行用户提供的代码字符串，考虑使用其他替代方案如JSON配置或有限的操作指令</p>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-number">2</div>
          <div class="practice-content">
            <h3>优先使用Function构造函数</h3>
            <p>当必须执行动态代码时，优先使用<code>new Function()</code>而非<code>eval()</code>，因为它有更可控的作用域</p>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-number">3</div>
          <div class="practice-content">
            <h3>使用严格模式</h3>
            <p>在动态执行的代码中使用严格模式(<code>'use strict'</code>)可以避免一些安全问题</p>
            <pre><code>const code = '"use strict"; ' + userCode;
new Function(code)();</code></pre>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-number">4</div>
          <div class="practice-content">
            <h3>考虑WebAssembly</h3>
            <p>对于高性能需求，考虑使用WebAssembly代替动态JS执行，它提供了更好的性能和安全性</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="summary-section">
      <h2 class="section-title">🎯 总结</h2>
      <div class="summary-content">
        <div class="key-point">
          <div class="point-icon">⚠️</div>
          <div class="point-text">
            <strong>动态代码执行</strong>虽然强大，但存在严重<strong>安全风险</strong>，应谨慎使用
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">⚖️</div>
          <div class="point-text">
            在<code>eval</code>和<code>new Function</code>之间，优先选择<code>new Function</code>，它有更可控的作用域
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">🛡️</div>
          <div class="point-text">
            必须执行动态代码时，确保实现<strong>输入验证</strong>、<strong>沙箱隔离</strong>和<strong>错误处理</strong>
          </div>
        </div>
        <div class="key-point">
          <div class="point-icon">🔍</div>
          <div class="point-text">
            考虑是否有更安全的替代方案，如JSON配置、有限指令集或WebAssembly
          </div>
        </div>
      </div>
      <div class="quote-box">
        <div class="quote-icon">💬</div>
        <div class="quote-content">
          "eval是魔鬼，但有时魔鬼是你唯一的选择。当你必须与魔鬼共舞时，确保你穿着防护服。"
          <div class="quote-author">- JavaScript安全专家</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 执行方法数据
const executionMethods = ref([
  {
    id: 'eval',
    name: 'eval()',
    icon: '🧨',
    description: 'eval()函数执行表示为字符串的JavaScript代码，并返回完成值。它在调用它的作用域中执行代码。',
    safetyLevel: 'danger',
    safetyText: '高风险',
    codeExample: `// 基本用法
const result = eval('2 + 2'); // 4

// 访问当前作用域
let x = 10;
eval('x = 20'); // 修改了当前作用域中的x

// 多行代码
eval(\`
  let y = 5;
  y * x  // 返回100
\`);`,
    pros: [
      '可以直接访问和修改调用它的作用域中的变量',
      '支持多行代码执行',
      '可以返回表达式的结果值',
      '浏览器原生支持，无需额外依赖'
    ],
    cons: [
      '严重的安全风险 - 可以执行任意代码',
      '性能较差 - 无法被JavaScript引擎优化',
      '调试困难 - 错误堆栈难以追踪',
      '在严格模式下有更多限制'
    ],
    useCases: [
      { icon: '🔧', text: '快速原型开发（仅限开发环境）' },
      { icon: '🧪', text: '需要访问当前作用域的测试代码' },
      { icon: '📝', text: '简单的数学表达式计算（需严格验证输入）' }
    ],
    alternatives: '对于大多数用例，考虑使用JSON.parse()解析数据或new Function()执行代码',
    warning: '警告: 永远不要用eval()执行不受信任的用户输入代码，这会导致XSS攻击和其他安全问题。',
    performance: {
      speed: 40,
      speedText: '较慢',
      memory: 60,
      memoryText: '中等',
      scopeClass: 'high',
      scopeText: '高'
    }
  },
  {
    id: 'function',
    name: 'new Function()',
    icon: '🏗️',
    description: 'Function构造函数创建一个新的Function对象。与eval不同，它在全局作用域中执行代码，而不是局部作用域。',
    safetyLevel: 'warning',
    safetyText: '中等风险',
    codeExample: `// 基本用法
const sum = new Function('a', 'b', 'return a + b;');
sum(2, 3); // 5

// 动态代码执行
const operation = 'multiply';
const func = new Function('x', 'y', \`
  if ("\${operation}" === "multiply") {
    return x * y;
  }
  return x + y;
\`);
func(3, 4); // 12

// 无参函数
const sayHello = new Function('console.log("Hello World!");');
sayHello();`,
    pros: [
      '比eval更安全 - 在全局作用域而非局部作用域执行',
      '可以预编译函数 - 重复调用时性能更好',
      '参数可以明确定义 - 更清晰的接口',
      '更容易调试 - 有明确的函数名'
    ],
    cons: [
      '仍然存在安全风险 - 可以执行任意代码',
      '无法访问局部变量 - 只能通过参数传递',
      '创建的函数无法序列化 - 不能用于持久化',
      '在严格模式下行为有所不同'
    ],
    useCases: [
      { icon: '📊', text: '模板化计算逻辑' },
      { icon: '🔄', text: '需要重复执行的动态逻辑' },
      { icon: '🌐', text: '隔离的作用域中执行代码' },
      { icon: '⚙️', text: '插件系统或规则引擎' }
    ],
    alternatives: '对于更安全的替代方案，考虑使用有限指令集或解释器模式',
    performance: {
      speed: 70,
      speedText: '较快',
      memory: 50,
      memoryText: '中等',
      scopeClass: 'low',
      scopeText: '低'
    }
  },
  {
    id: 'setTimeout',
    name: 'setTimeout()',
    icon: '⏱️',
    description: '虽然主要用于延迟执行，setTimeout()也可以接受字符串代码，在全局作用域中执行。',
    safetyLevel: 'danger',
    safetyText: '高风险',
    codeExample: `// 字符串代码执行
setTimeout('console.log("Delayed message")', 1000);

// 带参数的字符串代码
const message = "Hello";
setTimeout(\`console.log("\${message}")\`, 500);

// 注意: 不推荐使用字符串参数
// 应该使用函数参数:
setTimeout(() => {
  console.log(message);
}, 500);`,
    pros: [
      '可以延迟执行代码',
      '浏览器原生支持',
      '简单的API'
    ],
    cons: [
      '与eval相同的安全风险',
      '调试困难',
      '现代浏览器已不推荐使用字符串参数',
      '无法获取返回值'
    ],
    useCases: [
      { icon: '⌛', text: '遗留代码维护' },
      { icon: '🔄', text: '简单的延迟执行（不推荐）' }
    ],
    alternatives: '总是使用函数参数而非字符串参数',
    warning: '现代浏览器已弃用字符串参数，应始终使用函数参数',
    performance: {
      speed: 30,
      speedText: '慢',
      memory: 40,
      memoryText: '中等',
      scopeClass: 'high',
      scopeText: '高'
    }
  },
  {
    id: 'setInterval',
    name: 'setInterval()',
    icon: '🔄',
    description: '与setTimeout类似，setInterval()也可以接受字符串代码，重复在全局作用域中执行。',
    safetyLevel: 'danger',
    safetyText: '高风险',
    codeExample: `// 字符串代码执行 (不推荐)
let counter = 0;
setInterval('console.log("Tick", ' + counter + '); counter++;', 1000);

// 应该使用函数参数
setInterval(() => {
  console.log("Tick", counter);
  counter++;
}, 1000);`,
    pros: [
      '可以定期执行代码',
      '浏览器原生支持',
      '简单的API'
    ],
    cons: [
      '与eval相同的安全风险',
      '调试困难',
      '现代浏览器已不推荐使用字符串参数',
      '无法获取返回值',
      '如果不清理可能导致内存泄漏'
    ],
    useCases: [
      { icon: '🕒', text: '遗留代码维护' },
      { icon: '📈', text: '简单的轮询逻辑（不推荐）' }
    ],
    alternatives: '总是使用函数参数而非字符串参数',
    warning: '现代浏览器已弃用字符串参数，应始终使用函数参数',
    performance: {
      speed: 30,
      speedText: '慢',
      memory: 60,
      memoryText: '中等偏高',
      scopeClass: 'high',
      scopeText: '高'
    }
  },
  {
    id: 'scriptElement',
    name: '动态script标签',
    icon: '📜',
    description: '通过创建script标签并设置其textContent来执行代码字符串，在全局作用域中执行。',
    safetyLevel: 'warning',
    safetyText: '中等风险',
    codeExample: `// 创建script元素执行代码
function executeCode(code) {
  const script = document.createElement('script');
  script.textContent = code;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

// 使用示例
executeCode('console.log("动态执行代码");');

// 带返回值的复杂示例
let result;
executeCode(\`
  function calculate() {
    return 2 + 2 * 2;
  }
  result = calculate();
\`);
console.log(result); // 6`,
    pros: [
      '在全局作用域执行 - 不污染局部作用域',
      '可以执行较大的代码块',
      '浏览器原生支持',
      '可以加载外部脚本'
    ],
    cons: [
      '仍然存在安全风险',
      '无法直接获取返回值',
      '需要DOM操作',
      '可能触发多次全局解析'
    ],
    useCases: [
      { icon: '🌐', text: '需要全局环境执行的代码' },
      { icon: '📦', text: '动态加载库或插件' },
      { icon: '🧩', text: '模块化代码执行' }
    ],
    alternatives: '考虑使用模块加载器如SystemJS或ES模块',
    performance: {
      speed: 50,
      speedText: '中等',
      memory: 70,
      memoryText: '较高',
      scopeClass: 'low',
      scopeText: '低'
    }
  }
]);

const activeMethod = ref('eval');
const isExecuting = ref(false);
const executionResult = ref('');

// 当前选中的方法
const currentMethod = computed(() => {
  return executionMethods.value.find(m => m.id === activeMethod.value);
});

// 执行演示代码
const executeDemo = (method: any) => {
  isExecuting.value = true;
  executionResult.value = '';

  try {
    let result: any;

    switch(method.id) {
      case 'eval':
        result = eval('2 + 2 * 2');
        break;
      case 'function':
        const func = new Function('return 2 + 2 * 2;');
        result = func();
        break;
      case 'setTimeout':
        // 现代浏览器已不支持字符串参数，仅作演示
        window.setTimeout('console.log("Executed setTimeout");', 100);
        result = '查看控制台输出';
        break;
      case 'setInterval':
        // 现代浏览器已不支持字符串参数，仅作演示
        const intervalId = window.setInterval('console.log("Executed setInterval");', 100);
        window.setTimeout(() => window.clearInterval(intervalId), 300);
        result = '查看控制台输出(3次)';
        break;
      case 'scriptElement':
        const script = document.createElement('script');
        script.textContent = 'window.__demoResult = 2 + 2 * 2;';
        document.body.appendChild(script);
        document.body.removeChild(script);
        result = (window as any).__demoResult;
        delete (window as any).__demoResult;
        break;
    }

    executionResult.value = typeof result === 'object'
      ? JSON.stringify(result)
      : String(result);
  } catch (error) {
    executionResult.value = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  } finally {
    isExecuting.value = false;
  }
};
</script>

<style lang="less" scoped>
@primary-color: #4a6cf7;
@secondary-color: #6e45e2;
@accent-color: #42b983;
@danger-color: #e45649;
@warning-color: #d19a66;
@success-color: #50a14f;
@light-bg: #f8f9ff;
@border-color: #e0e7ff;
@text-color: #2c3e50;
@text-light: #7e8a9a;
@card-shadow: 0 4px 12px rgba(110, 69, 226, 0.08);
@code-bg: #f6f8ff;

.js-execution-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background-color: white;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @light-bg, transparent);
  border-radius: 16px;

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-light;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  .stat-card {
    background: white;
    padding: 1.25rem 1rem;
    border-radius: 12px;
    box-shadow: @card-shadow;
    min-width: 120px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.section-title {
  font-size: 1.7rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid @primary-color;
  color: darken(@primary-color, 10%);
}

.methods-overview {
  margin-bottom: 2rem;

  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;

    .method-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 1rem;
      border-radius: 12px;
      background: @light-bg;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid @border-color;

      &:hover {
        background: rgba(74, 108, 247, 0.1);
        border-color: @primary-color;
      }

      &.active {
        background: @primary-color;
        border-color: @primary-color;
        color: white;

        .method-icon, .method-name {
          color: white;
        }
      }

      .method-icon {
        font-size: 2rem;
        margin-bottom: 0.75rem;
      }

      .method-name {
        font-weight: 600;
        font-size: 1.05rem;
      }
    }
  }
}

.method-details {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;

  .method-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid @border-color;

    .method-title {
      display: flex;
      align-items: center;
      gap: 1rem;

      .title-icon {
        font-size: 2.5rem;
      }

      h2 {
        margin: 0;
        font-size: 1.8rem;
      }
    }

    .method-safety {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;

      &.danger {
        background: lighten(@danger-color, 40%);
        color: darken(@danger-color, 15%);
        border: 1px solid lighten(@danger-color, 30%);
      }

      &.warning {
        background: lighten(@warning-color, 40%);
        color: darken(@warning-color, 15%);
        border: 1px solid lighten(@warning-color, 30%);
      }

      &.safe {
        background: lighten(@success-color, 40%);
        color: darken(@success-color, 15%);
        border: 1px solid lighten(@success-color, 30%);
      }
    }
  }

  .method-description {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .method-demo {
    margin-bottom: 2rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .demo-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .code-example {
      pre {
        background: @code-bg;
        border-radius: 8px;
        padding: 1.25rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          color: @text-color;
        }
      }
    }

    .execution-controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .execute-btn {
        background: @primary-color;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.2s;
        align-self: flex-start;

        &:hover {
          background: darken(@primary-color, 8%);
        }

        &:disabled {
          background: @text-light;
          cursor: not-allowed;
        }
      }

      .execution-result {
        background: lighten(@accent-color, 45%);
        border-radius: 8px;
        padding: 1rem;
        font-family: 'Fira Code', monospace;

        .result-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: darken(@accent-color, 15%);
        }

        .result-value {
          font-size: 1.1rem;
        }
      }
    }
  }

  .method-pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros-section, .cons-section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.25rem;

          &::before {
            content: "•";
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: 0;
          }
        }
      }
    }

    .pros-section {
      border-left: 4px solid @accent-color;

      h3::before {
        content: "👍 ";
      }

      ul li::before {
        color: @accent-color;
      }
    }

    .cons-section {
      border-left: 4px solid @danger-color;

      h3::before {
        content: "👎 ";
      }

      ul li::before {
        color: @danger-color;
      }
    }
  }

  .method-use-cases {
    margin-bottom: 2rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .use-cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      .use-case-card {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        background: @light-bg;
        padding: 1rem;
        border-radius: 8px;
        border-left: 3px solid @primary-color;

        .case-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
      }
    }
  }

  .method-alternatives {
    background: lighten(@warning-color, 40%);
    border-left: 4px solid @warning-color;
    padding: 1.25rem;
    border-radius: 0 8px 8px 0;
    margin-bottom: 2rem;

    h3 {
      margin-top: 0;
    }

    p {
      margin-bottom: 0;
    }
  }

  .method-warning {
    display: flex;
    gap: 1rem;
    background: lighten(@danger-color, 40%);
    border-left: 4px solid @danger-color;
    padding: 1.25rem;
    border-radius: 0 8px 8px 0;

    .warning-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .warning-text {
      font-weight: 500;
    }
  }
}

.safety-practices {
  margin-bottom: 2rem;

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .practice-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      border: 1px solid @border-color;

      .practice-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1rem;
      }

      pre {
        background: @code-bg;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.performance-comparison {
  margin-bottom: 2rem;

  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      background: @primary-color;
      color: white;
      font-weight: 600;

      .header-cell {
        padding: 1rem;
        text-align: center;
      }
    }

    .table-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      border-bottom: 1px solid @border-color;

      &:last-child {
        border-bottom: none;
      }

      &:nth-child(odd) {
        background: @light-bg;
      }

      .row-cell {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &.method-name {
          font-weight: 500;
          justify-content: flex-start;
          padding-left: 1.5rem;
        }

        .speed-bar, .memory-bar {
          height: 8px;
          background: @primary-color;
          border-radius: 4px;
          margin-right: 0.75rem;
        }

        .memory-bar {
          background: @secondary-color;
        }

        .scope-pollution {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;

          &.high {
            background: lighten(@danger-color, 40%);
            color: darken(@danger-color, 15%);
          }

          &.medium {
            background: lighten(@warning-color, 40%);
            color: darken(@warning-color, 15%);
          }

          &.low {
            background: lighten(@accent-color, 40%);
            color: darken(@accent-color, 15%);
          }
        }

        .safety-level {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;

          &.danger {
            background: lighten(@danger-color, 40%);
            color: darken(@danger-color, 15%);
          }

          &.warning {
            background: lighten(@warning-color, 40%);
            color: darken(@warning-color, 15%);
          }

          &.safe {
            background: lighten(@success-color, 40%);
            color: darken(@success-color, 15%);
          }
        }
      }
    }
  }
}

.best-practices {
  margin-bottom: 2rem;

  .practices-list {
    .practice-item {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      border: 1px solid @border-color;

      .practice-number {
        width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .practice-content {
        h3 {
          margin-top: 0;
          margin-bottom: 0.75rem;
        }

        p {
          margin-bottom: 1rem;
        }

        pre {
          background: @code-bg;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          margin: 0;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}

.summary-section {
  background: linear-gradient(135deg, #f0f9ff, #f8f9ff);
  border-radius: 16px;
  padding: 2rem;

  .summary-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .key-point {
      display: flex;
      gap: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      align-items: center;

      .point-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      .point-text {
        strong {
          color: @primary-color;
        }

        code {
          font-family: 'Fira Code', monospace;
          background: @code-bg;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
        }
      }
    }
  }

  .quote-box {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-left: 4px solid @accent-color;
    border-radius: 0 12px 12px 0;
    padding: 1.5rem;

    .quote-icon {
      font-size: 2rem;
      color: @accent-color;
      flex-shrink: 0;
    }

    .quote-content {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.7;

      .quote-author {
        margin-top: 1rem;
        font-weight: 500;
        text-align: right;
        color: @text-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .js-execution-container {
    padding: 1rem;
  }

  .header-section {
    padding: 1.5rem 1rem;

    .title {
      font-size: 2rem !important;
    }
  }

  .stats-grid {
    gap: 1rem;

    .stat-card {
      flex: 1;
      min-width: 100px;
      padding: 1rem 0.5rem;

      .stat-value {
        font-size: 1.3rem;
      }
    }
  }

  .method-demo .demo-container {
    grid-template-columns: 1fr !important;
  }

  .method-pros-cons {
    grid-template-columns: 1fr !important;
  }

  .performance-comparison .table-header,
  .performance-comparison .table-row {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;

    .row-cell {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
  }
}
</style>
