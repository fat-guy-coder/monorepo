<template>
  <div class="strict-mode-container">
    <h1 class="main-title">JavaScript "use strict" 严格模式基本介绍</h1>

    <!-- 核心概念 -->
    <section class="intro-section">
      <div class="definition-card">
        <h2 class="section-title">🎯 严格模式概述</h2>
        <p class="content-text">
          "use strict" 是ECMAScript 5引入的严格运行模式，通过更严格的语法限制帮助开发者编写更安全、更优化的JavaScript代码。
        </p>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="icon">🔒</div>
            <h3>消除静默错误</h3>
            <p>将隐式错误转为显式抛出</p>
          </div>
          <div class="feature-card">
            <div class="icon">⚡</div>
            <h3>优化性能</h3>
            <p>帮助JavaScript引擎优化执行</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 启用方式 -->
    <section class="usage-section">
      <h2 class="section-title">🔌 启用方式</h2>
      <div class="method-grid">
        <div class="method-card">
          <h3>全局启用</h3>
          <pre class="code-sample">'use strict';
// 整个文件代码将使用严格模式</pre>
        </div>
        <div class="method-card">
          <h3>函数级启用</h3>
          <pre class="code-sample">function strictFunc() {
  'use strict';
  // 函数内使用严格模式
}</pre>
        </div>
      </div>
    </section>

    <!-- 主要限制 -->
    <section class="rules-section">
      <h2 class="section-title">🚫 严格模式限制规则</h2>
      <div class="rule-list">
        <div v-for="(rule, index) in strictRules" :key="index" class="rule-item">
          <div class="rule-index">{{ index + 1 }}</div>
          <div class="rule-content">
            <h3>{{ rule.title }}</h3>
            <p>{{ rule.description }}</p>
            <pre class="code-sample">{{ rule.example }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="notice-section">
      <h2 class="section-title">⚠️ 注意事项</h2>
      <div class="notice-card warning">
        <div class="notice-icon">❗</div>
        <div class="notice-content">
          <h3>不可逆性</h3>
          <p>严格模式一旦启用无法取消，代码合并时需注意作用域</p>
        </div>
      </div>
      <div class="notice-card tip">
        <div class="notice-icon">💡</div>
        <div class="notice-content">
          <h3>浏览器兼容</h3>
          <p>现代浏览器均支持，但旧版IE10+才完全支持</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const strictRules = [
  {
    title: "变量必须声明",
    description: "禁止意外创建全局变量",
    example: `// 非严格模式
x = 10; // 自动创建全局变量

// 严格模式
'use strict';
x = 10; // ReferenceError`
  },
  {
    title: "禁止删除不可删除属性",
    description: "删除操作符限制增强",
    example: `'use strict';
delete Object.prototype; // TypeError`
  },
  {
    title: "参数名唯一性",
    description: "禁止重复的函数参数名",
    example: `'use strict';
function sum(a, a) { // SyntaxError
  // ...
}`
  },
  {
    title: "禁止八进制字面量",
    description: "必须使用0o前缀表示八进制",
    example: `'use strict';
const num = 071; // SyntaxError
const correct = 0o71; // 正确`
  },
  {
    title: "只读属性赋值限制",
    description: "禁止对只读属性重新赋值",
    example: `'use strict';
const obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
obj.x = 9; // TypeError`
  },
  {
    title: "禁止with语句",
    description: "禁止使用with语句",
    example: `'use strict';
with (obj) { // SyntaxError`
  },
  {
    title: "禁止eval函数",
    description: "禁止使用eval函数",
    example: `'use strict';
eval('var x = 10;'); // SyntaxError`
  },
  {
    title: "禁止arguments.callee",
    description: "禁止使用arguments.callee",
    example: `'use strict';
function foo() {
  arguments.callee; // SyntaxError
}
`
  }
];
</script>

<style lang="less" scoped>
.strict-mode-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Segoe UI', system-ui;

  .main-title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2.4rem;
  }

  .section-title {
    color: #34495e;
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 3rem 0 2rem;
    font-size: 1.6rem;
  }

  .definition-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 2rem;

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;

      .feature-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
      }
    }
  }

  .method-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .method-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .rule-list {
    .rule-item {
      display: flex;
      gap: 1.5rem;
      background: white;
      padding: 1.5rem;
      margin: 1rem 0;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .rule-index {
        width: 40px;
        height: 40px;
        background: #42b983;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }
  }

  .notice-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1rem 0;

    &.warning {
      background: #fdecea;
      border-left: 4px solid #e74c3c;
    }

    &.tip {
      background: #e8f4fc;
      border-left: 4px solid #3498db;
    }

    .notice-icon {
      font-size: 1.8rem;
    }
  }

  .code-sample {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }
}
</style>
