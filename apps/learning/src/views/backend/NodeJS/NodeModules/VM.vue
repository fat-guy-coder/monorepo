<template>
  <div class="vm-module-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Node.js VM 模块介绍</h1>
        <p class="subtitle">安全执行 JavaScript 代码的沙箱环境</p>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>什么是 VM 模块？</h2>
          <p>
            Node.js 的 <code>vm</code> 模块提供了在 V8 虚拟机上下文中编译和运行代码的 API。
            它允许你创建一个隔离的沙箱环境，在这个环境中执行 JavaScript
            代码，同时可以控制代码的上下文和权限。
          </p>
          <div class="vm-flow">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <h3>创建上下文</h3>
              <p>定义沙箱环境变量</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <h3>编译代码</h3>
              <p>将代码编译为可执行脚本</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <h3>执行脚本</h3>
              <p>在隔离环境中运行代码</p>
            </div>
          </div>
        </div>
      </section>

      <section class="api-section">
        <h2 class="section-title">VM 核心 API</h2>

        <div class="api-tabs">
          <button
            v-for="(api, index) in apis"
            :key="index"
            :class="['tab-button', { active: activeApi === index }]"
            @click="activeApi = index"
          >
            {{ api.name }}
          </button>
        </div>

        <div class="api-details">
          <div v-for="(api, index) in apis" :key="index" v-show="activeApi === index">
            <div class="api-header">
              <h3>{{ api.name }}</h3>
              <div class="api-signature">
                <code>{{ api.signature }}</code>
              </div>
            </div>

            <div class="api-description">
              <p>{{ api.description }}</p>
            </div>

            <div class="api-params">
              <h4>参数说明</h4>
              <div class="params-table">
                <div class="table-header">
                  <div class="col-name">参数名</div>
                  <div class="col-type">类型</div>
                  <div class="col-desc">说明</div>
                </div>
                <div class="table-row" v-for="(param, pIndex) in api.parameters" :key="pIndex">
                  <div class="col-name">{{ param.name }}</div>
                  <div class="col-type">{{ param.type }}</div>
                  <div class="col-desc">{{ param.description }}</div>
                </div>
              </div>
            </div>

            <div class="api-return">
              <h4>返回值</h4>
              <p>{{ api.return }}</p>
            </div>

            <div class="api-example">
              <h4>使用示例</h4>
              <pre><code>{{ api.example }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2 class="section-title">适用场景</h2>
        <div class="cases-grid">
          <div class="case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-icon">{{ useCase.icon }}</div>
            <div class="case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="case-example">
                <pre><code>{{ useCase.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">VM 模块 vs eval()</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">特性</div>
            <div class="col-type">VM 模块</div>
            <div class="col-type">eval()</div>
          </div>
          <div class="table-row" v-for="(row, index) in comparisonData" :key="index">
            <div class="col-criteria">{{ row.criteria }}</div>
            <div class="col-type">{{ row.vm }}</div>
            <div class="col-type">{{ row.eval }}</div>
          </div>
        </div>
      </section>

      <section class="security-section">
        <h2 class="section-title">安全注意事项</h2>
        <div class="security-grid">
          <div class="security-card" v-for="(item, index) in securityItems" :key="index">
            <div class="security-number">{{ index + 1 }}</div>
            <div class="security-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>VM 模块是 Node.js 中强大的沙箱环境工具，合理使用可以在安全性和灵活性之间取得平衡</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li><a href="https://nodejs.org/api/vm.html" target="_blank">Node.js 官方 VM 文档</a></li>
          <li>
            <a href="https://github.com/patriksimek/vm2" target="_blank">VM2 - 增强的 VM 模块</a>
          </li>
          <li>
            <a
              href="https://www.freecodecamp.org/news/sandboxing-nodejs-code-with-vm-5727d5ecb9a9/"
              target="_blank"
              >使用 VM 沙箱化 Node.js 代码</a
            >
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeApi = ref(0)

const apis = ref([
  {
    name: 'vm.createContext',
    signature: 'vm.createContext([sandbox[, options]])',
    description:
      '创建一个新的上下文对象，用于在 vm 模块中执行脚本。该上下文对象将被沙箱化，其中的代码无法访问外部作用域。',
    parameters: [
      {
        name: 'sandbox',
        type: 'Object',
        description: '要沙箱化的对象。如果未提供，将创建一个新的空对象',
      },
      { name: 'options', type: 'Object', description: '配置选项' },
      { name: 'options.name', type: 'String', description: '上下文的可读名称（用于调试）' },
      { name: 'options.origin', type: 'String', description: '上下文的来源（用于调试）' },
      { name: 'options.codeGeneration', type: 'Object', description: '控制代码生成选项' },
      {
        name: 'options.codeGeneration.strings',
        type: 'Boolean',
        description: '是否允许通过 eval 或 new Function 创建字符串',
      },
      {
        name: 'options.codeGeneration.wasm',
        type: 'Boolean',
        description: '是否允许编译 WebAssembly 模块',
      },
    ],
    return: 'Object - 沙箱化的上下文对象',
    example: `const vm = require('vm');

// 创建沙箱上下文
const sandbox = {
  process: 'sandboxed process',
  console,
  setTimeout
};

const context = vm.createContext(sandbox);`,
  },
  {
    name: 'vm.runInContext',
    signature: 'vm.runInContext(code, contextifiedObject[, options])',
    description: '在指定的上下文化对象中编译并执行代码，然后返回结果。代码无法访问本地作用域。',
    parameters: [
      { name: 'code', type: 'String', description: '要编译和执行的 JavaScript 代码' },
      {
        name: 'contextifiedObject',
        type: 'Object',
        description: '通过 vm.createContext() 创建的上下文化对象',
      },
      { name: 'options', type: 'Object', description: '执行选项' },
      { name: 'options.filename', type: 'String', description: '指定脚本文件名（用于堆栈跟踪）' },
      { name: 'options.lineOffset', type: 'Number', description: '指定行号偏移（用于堆栈跟踪）' },
      { name: 'options.columnOffset', type: 'Number', description: '指定列号偏移（用于堆栈跟踪）' },
      {
        name: 'options.displayErrors',
        type: 'Boolean',
        description: '是否在发生错误时在 stderr 上打印错误',
      },
      {
        name: 'options.timeout',
        type: 'Number',
        description: '执行超时时间（毫秒），超过则终止执行',
      },
    ],
    return: 'any - 代码执行的结果',
    example: `const vm = require('vm');

// 创建上下文
const context = vm.createContext({
  animal: 'cat',
  count: 2
});

// 在上下文中执行代码
const result = vm.runInContext(
  'count += 1; animal += "s"; { animal, count }',
  context
);

console.log(result);
// 输出: { animal: 'cats', count: 3 }`,
  },
  {
    name: 'vm.runInNewContext',
    signature: 'vm.runInNewContext(code[, sandbox[, options]])',
    description:
      '创建一个新的沙箱化上下文，在其中编译并执行代码，然后返回结果。代码无法访问本地作用域。',
    parameters: [
      { name: 'code', type: 'String', description: '要编译和执行的 JavaScript 代码' },
      {
        name: 'sandbox',
        type: 'Object',
        description: '将被上下文化的对象。如果未提供，将创建一个新的空对象',
      },
      { name: 'options', type: 'Object', description: '执行选项（同 runInContext）' },
    ],
    return: 'any - 代码执行的结果',
    example: `const vm = require('vm');

// 执行代码并创建新上下文
const result = vm.runInNewContext(\`
  const process = this.process;
  const version = process && process.version || 'unknown';
  { version }
\`);

console.log(result);
// 输出: { version: 'unknown' }`,
  },
  {
    name: 'vm.runInThisContext',
    signature: 'vm.runInThisContext(code[, options])',
    description:
      '在当前全局对象的上下文中编译并执行代码，但不访问本地作用域。代码可以访问全局对象，但无法访问局部变量。',
    parameters: [
      { name: 'code', type: 'String', description: '要编译和执行的 JavaScript 代码' },
      { name: 'options', type: 'Object', description: '执行选项（同 runInContext）' },
    ],
    return: 'any - 代码执行的结果',
    example: `const vm = require('vm');

// 在当前全局上下文中执行代码
let localVar = 'initial value';

vm.runInThisContext('globalVar = "set by vm";');

console.log(globalVar); // 输出: 'set by vm'
console.log(localVar);  // 输出: 'initial value'`,
  },
  {
    name: 'vm.Script',
    signature: 'new vm.Script(code[, options])',
    description: '创建一个新的 Script 实例，表示已编译的代码。这个代码可以在特定上下文中多次执行。',
    parameters: [
      { name: 'code', type: 'String', description: '要编译的 JavaScript 代码' },
      { name: 'options', type: 'Object', description: '编译选项' },
      { name: 'options.filename', type: 'String', description: '指定脚本文件名（用于堆栈跟踪）' },
      { name: 'options.lineOffset', type: 'Number', description: '指定行号偏移（用于堆栈跟踪）' },
      { name: 'options.columnOffset', type: 'Number', description: '指定列号偏移（用于堆栈跟踪）' },
      {
        name: 'options.cachedData',
        type: 'Buffer',
        description: '提供可选的 Buffer，其中包含代码的 V8 缓存数据',
      },
      {
        name: 'options.produceCachedData',
        type: 'Boolean',
        description: '是否在编译时生成缓存数据',
      },
    ],
    return: 'Script - 表示已编译代码的对象',
    example: `const vm = require('vm');

// 编译脚本
const script = new vm.Script(\`
  function add(a, b) {
    return a + b;
  }

  add(x, y);
\`);

// 创建上下文
const context = { x: 40, y: 2 };

// 多次运行编译后的脚本
const result1 = script.runInNewContext(context);
console.log(result1); // 42

context.y = 3;
const result2 = script.runInNewContext(context);
console.log(result2); // 43`,
  },
])

const useCases = ref([
  {
    icon: '🛡️',
    title: '代码沙箱化',
    description: '执行不可信代码时提供安全隔离环境，防止访问敏感系统资源或修改全局状态。',
    example: `const vm = require('vm');

// 创建安全沙箱
const context = vm.createContext({
  // 仅暴露安全的方法
  console: {
    log: console.log
  },
  Math,
  Date
});

// 执行不可信代码
const untrustedCode = \`
  // 尝试访问禁止的资源
  try {
    const fs = require('fs');
    console.log('访问成功:', !!fs);
  } catch (e) {
    console.log('访问失败:', e.message);
  }

  // 使用允许的 API
  const now = new Date();
  const sqrt = Math.sqrt(16);

  { now, sqrt }
\`;

const result = vm.runInContext(untrustedCode, context);
console.log(result);`,
  },
  {
    icon: '📝',
    title: '模板引擎',
    description: '实现自定义模板引擎，在沙箱中安全地执行模板逻辑。',
    example: `const vm = require('vm');

function renderTemplate(template, data) {
  // 创建沙箱上下文
  const context = vm.createContext({ ...data });

  // 将模板转换为可执行代码
  const code = \`
    let output = "";
    with(data) {
      output += "\${template.replace(/<%=([\\s\\S]+?)%>/g, '"+($1)+"')}";
    }
    output;
  \`;

  return vm.runInContext(code, context);
}

// 使用模板
const template = \`
  <div>
    <h1><%= title %></h1>
    <ul>
      <% items.forEach(item => { %>
        <li><%= item %></li>
      <% }); %>
    </ul>
  </div>
\`;

const data = {
  title: "产品列表",
  items: ["产品A", "产品B", "产品C"]
};

const html = renderTemplate(template, data);
console.log(html);`,
  },
  {
    icon: '🧪',
    title: '代码测试环境',
    description: '为在线编程学习平台创建隔离的代码执行环境。',
    example: `const vm = require('vm');

function runUserCode(code, tests) {
  const results = [];

  tests.forEach(test => {
    try {
      // 为每个测试创建新上下文
      const context = vm.createContext({
        console: { log: () => {} },
        ...test.context
      });

      // 执行用户代码
      vm.runInContext(code, context);

      // 执行测试
      const testResult = vm.runInContext(
        \`(\${test.testFunction})(userFunction)\`,
        context
      );

      results.push({
        test: test.name,
        passed: testResult === test.expected,
        result: testResult
      });
    } catch (error) {
      results.push({
        test: test.name,
        passed: false,
        error: error.message
      });
    }
  });

  return results;
}

// 示例测试
const userCode = \`
  function add(a, b) {
    return a + b;
  }
\`;

const tests = [
  {
    name: "整数相加",
    context: {},
    testFunction: \`(fn) => fn(2, 3)\`,
    expected: 5
  },
  {
    name: "浮点数相加",
    context: {},
    testFunction: \`(fn) => fn(0.1, 0.2)\`,
    expected: 0.3
  }
];

const testResults = runUserCode(userCode, tests);
console.log(testResults);`,
  },
  {
    icon: '🔌',
    title: '插件系统',
    description: '在应用程序中实现安全的插件架构，允许第三方扩展功能。',
    example: `const vm = require('vm');
const fs = require('fs');

class PluginSystem {
  constructor() {
    this.plugins = {};
    this.sandbox = {
      // 暴露安全的 API 给插件
      registerPlugin: (name, plugin) => {
        this.plugins[name] = plugin;
      },
      app: {
        on: (event, handler) => {
          console.log(\`插件注册了事件: \${event}\`);
        }
      },
      console
    };
  }

  loadPlugin(path) {
    try {
      const code = fs.readFileSync(path, 'utf8');
      const context = vm.createContext(this.sandbox);
      vm.runInContext(code, context, { filename: path });
    } catch (error) {
      console.error(\`加载插件失败: \${path}\`, error);
    }
  }

  runPluginMethod(name, method, ...args) {
    const plugin = this.plugins[name];
    if (plugin && typeof plugin[method] === 'function') {
      return plugin[method](...args);
    }
  }
}

// 使用插件系统
const pluginSystem = new PluginSystem();
pluginSystem.loadPlugin('./plugins/logger.js');

// 执行插件方法
pluginSystem.runPluginMethod('logger', 'log', 'Hello from plugin!');`,
  },
])

const comparisonData = ref([
  { criteria: '作用域隔离', vm: '完全隔离的沙箱环境', eval: '访问当前作用域' },
  { criteria: '安全性', vm: '高（可控制暴露的API）', eval: '低（完全访问当前环境）' },
  { criteria: '性能', vm: '编译后可多次执行', eval: '每次都需要解析' },
  { criteria: '调试支持', vm: '支持文件名和行号映射', eval: '有限支持' },
  { criteria: '资源控制', vm: '支持超时和内存限制', eval: '无内置控制' },
  { criteria: '适用场景', vm: '执行不可信代码', eval: '开发调试工具' },
])

const securityItems = ref([
  {
    title: '限制访问权限',
    description: '谨慎选择暴露给沙箱的 API，避免暴露 fs、process 等敏感模块。',
  },
  {
    title: '设置执行超时',
    description: '使用 timeout 选项防止恶意代码无限循环导致服务拒绝攻击。',
  },
  {
    title: '避免使用 with',
    description: '在沙箱中避免使用 with 语句，它可能绕过作用域限制。',
  },
  {
    title: '监控内存使用',
    description: '长时间运行的沙箱代码可能消耗大量内存，需要监控和管理。',
  },
  {
    title: '使用增强模块',
    description: '对于高安全需求，考虑使用 vm2 等增强模块提供更强隔离。',
  },
  {
    title: '避免原型污染',
    description: '防止用户代码修改全局原型（如 Object.prototype）。',
  },
])
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.vm-module-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.demo-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .code-editor,
  .result-display {
    background: @light-gray;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
  }

  .editor-header,
  .result-header {
    background: @primary-color;
    color: white;
    padding: 0.8rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
  }

  .run-button {
    background: white;
    color: @primary-color;
    border: none;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: darken(white, 5%);
      transform: translateY(-2px);
    }
  }

  .code-input {
    width: 100%;
    height: 250px;
    padding: 1rem;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    border: none;
    outline: none;
    resize: none;
    background: #2d2d2d;
    color: #f8f8f2;
  }

  .result-content {
    padding: 1rem;
    height: 250px;
    overflow-y: auto;
    background: #1e1e1e;
    color: #d4d4d4;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.95rem;
    line-height: 1.5;

    pre {
      margin: 0;
      white-space: pre-wrap;
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;

      code {
        background: #f0f4f8;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'Source Code Pro', monospace;
      }
    }
  }

  .vm-flow {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;

    .flow-step {
      flex: 1;
      min-width: 200px;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .step-icon {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }

      h3 {
        color: @primary-color;
        margin: 0.5rem 0;
        font-size: 1.3rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #666;
      }
    }

    .flow-arrow {
      display: flex;
      align-items: center;
      color: #777;
      font-weight: 700;
      min-width: 50px;
      text-align: center;
      font-size: 1.5rem;

      @media (max-width: 768px) {
        transform: rotate(90deg);
        margin: 1rem 0;
      }
    }
  }
}

.api-section {
  .api-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 1.5rem;

    .tab-button {
      background: @light-gray;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-light;
        color: @primary-color;
      }

      &.active {
        background: @primary-color;
        color: white;
        box-shadow: 0 4px 10px rgba(@primary-color, 0.3);
      }
    }
  }

  .api-details {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
  }

  .api-header {
    margin-bottom: 1.5rem;

    h3 {
      color: @secondary-color;
      margin: 0 0 0.5rem;
      font-size: 1.6rem;
    }
  }

  .api-signature {
    background: #f8f9fc;
    border-radius: 6px;
    padding: 1rem;
    font-family: 'Source Code Pro', monospace;
    font-size: 1.1rem;
    overflow-x: auto;
  }

  .api-description {
    margin-bottom: 1.8rem;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .api-params {
    margin-bottom: 1.8rem;

    h4 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
  }

  .params-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid @border-color;
    box-shadow: @card-shadow;

    .table-header {
      display: flex;
      background: @primary-light;
      font-weight: 500;
      border-bottom: 1px solid @border-color;

      > div {
        padding: 0.8rem 1rem;
      }

      .col-name {
        flex: 1;
        min-width: 150px;
      }

      .col-type {
        flex: 1;
        min-width: 100px;
      }

      .col-desc {
        flex: 3;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 0.8rem 1rem;
      }

      .col-name {
        flex: 1;
        min-width: 150px;
        font-weight: 500;
      }

      .col-type {
        flex: 1;
        min-width: 100px;
        font-family: 'Source Code Pro', monospace;
        color: #d35400;
      }

      .col-desc {
        flex: 3;
      }
    }
  }

  .api-return {
    margin-bottom: 1.8rem;

    h4 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      background: #f8f9fc;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Source Code Pro', monospace;
    }
  }

  .api-example {
    h4 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    pre {
      margin: 0;
      background: #2d2d2d;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;

      code {
        font-family: 'Source Code Pro', monospace;
        color: #f8f8f2;
        font-size: 0.95rem;
        line-height: 1.6;

        .comment {
          color: #6a9955;
        }
        .keyword {
          color: #c586c0;
        }
        .function {
          color: #dcdcaa;
        }
        .string {
          color: #ce9178;
        }
      }
    }
  }
}

.use-cases {
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 1.5rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .case-card {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    gap: 1.2rem;
    border-top: 3px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: @primary-light;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .case-content {
      flex: 1;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }

    .case-example {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 0.8rem;
      margin-top: 0.5rem;

      pre {
        margin: 0;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: flex;
      background: @primary-color;
      color: white;
      font-weight: 500;

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        text-align: center;
      }

      .col-criteria {
        flex: 1.5;
        text-align: left;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .col-criteria {
        flex: 1.5;
        font-weight: 500;
      }

      .col-type {
        text-align: center;
        justify-content: center;
      }
    }
  }
}

.security-section {
  .security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .security-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .security-number {
      width: 50px;
      min-height: 100%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .security-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .vm-module-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .cases-grid {
    grid-template-columns: 1fr !important;
  }

  .api-details {
    padding: 1.5rem !important;
  }
}
</style>
