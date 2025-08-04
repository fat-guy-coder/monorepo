<template>
  <div class="eval-with-container">
    <div class="header">
      <h1><i class="icon icon-js"></i> JavaScript eval() 与 with 语句基本介绍</h1>
      <p>探索这两个强大但存在争议的语言特性</p>
    </div>

    <div class="content-grid">
      <!-- 概述部分 -->
      <div class="section-card overview-card">
        <div class="card-header">
          <i class="icon icon-overview"></i>
          <h2>概述</h2>
        </div>
        <div class="card-content">
          <div class="definition">
            <div class="eval-def">
              <h3><i class="icon icon-eval"></i> eval() 函数</h3>
              <p>eval() 是一个全局函数，用于执行字符串形式的 JavaScript 代码</p>
            </div>
            <div class="with-def">
              <h3><i class="icon icon-with"></i> with 语句</h3>
              <p>with 语句用于扩展语句的作用域链，将指定对象添加到作用域链的顶部</p>
            </div>
          </div>

          <div class="historical-context">
            <h3>历史背景</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="year">1995</div>
                <div class="content">eval() 随 JavaScript 1.0 引入</div>
              </div>
              <div class="timeline-item">
                <div class="year">1996</div>
                <div class="content">with 语句在 JavaScript 1.2 中添加</div>
              </div>
              <div class="timeline-item">
                <div class="year">2009</div>
                <div class="content">ES5 严格模式中禁用 with 语句</div>
              </div>
              <div class="timeline-item">
                <div class="year">2015</div>
                <div class="content">现代框架开始弃用这些特性</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- eval() 基本介绍 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-eval"></i>
          <h2>eval() 函数基本介绍</h2>
        </div>
        <div class="card-content">
          <div class="function-details">
            <h3>基本语法</h3>
            <div class="syntax-box">
              <code>eval(string)</code>
            </div>

            <h3>作用原理</h3>
            <ul class="principle-list">
              <li>接受一个字符串参数</li>
              <li>将字符串解析为 JavaScript 代码</li>
              <li>在调用位置的当前作用域中执行代码</li>
              <li>返回最后一个表达式的值</li>
            </ul>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <div class="case-grid">
              <div class="case">
                <i class="icon icon-json"></i>
                <h4>JSON 解析</h4>
                <p>早期解析 JSON 字符串（已被 JSON.parse() 取代）</p>
              </div>
              <div class="case">
                <i class="icon icon-dynamic"></i>
                <h4>动态代码执行</h4>
                <p>执行动态生成的代码</p>
              </div>
              <div class="case">
                <i class="icon icon-template"></i>
                <h4>模板引擎</h4>
                <p>在简单模板系统中解析表达式</p>
              </div>
              <div class="case">
                <i class="icon icon-repl"></i>
                <h4>REPL 环境</h4>
                <p>构建浏览器内代码执行环境</p>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-tabs">
              <div class="tab-header">
                <div :class="['tab-item', { active: activeEvalTab === 'basic' }]" @click="activeEvalTab = 'basic'">
                  基础用法
                </div>
                <div :class="['tab-item', { active: activeEvalTab === 'json' }]" @click="activeEvalTab = 'json'">
                  JSON 解析
                </div>
                <div :class="['tab-item', { active: activeEvalTab === 'dynamic' }]" @click="activeEvalTab = 'dynamic'">
                  动态函数
                </div>
              </div>
              <div class="tab-content">
                <pre v-if="activeEvalTab === 'basic'"><code>// 基本计算
const result = eval('2 + 3 * 4');
console.log(result); // 输出: 14

// 变量访问
const x = 10;
eval('console.log(x * 2)'); // 输出: 20

// 创建变量
eval('let y = 5;');
console.log(y); // 输出: 5 (在当前作用域创建了变量y)</code></pre>

                <pre v-if="activeEvalTab === 'json'"><code>// 使用 eval 解析 JSON (不推荐)
const jsonStr = '{"name": "John", "age": 30}';
const user = eval('(' + jsonStr + ')');
console.log(user.name); // 输出: John

// 现代替代方案 - JSON.parse()
const safeUser = JSON.parse(jsonStr);
console.log(safeUser.age); // 输出: 30</code></pre>

                <pre v-if="activeEvalTab === 'dynamic'"><code>// 动态生成函数
function createMultiplier(factor) {
  return eval(`(function(x) {
    return x * ${factor};
  })`);
}

const double = createMultiplier(2);
console.log(double(5)); // 输出: 10

const triple = createMultiplier(3);
console.log(triple(5)); // 输出: 15</code></pre>
              </div>
            </div>
          </div>

          <div class="pros-cons">
            <h3>优点与缺点</h3>
            <div class="pros-cons-grid">
              <div class="pros">
                <h4><i class="icon icon-check"></i> 优点</h4>
                <ul>
                  <li>提供最大的代码灵活性</li>
                  <li>可以执行动态生成的代码</li>
                  <li>在特殊场景下简化复杂问题</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon icon-warning"></i> 缺点</h4>
                <ul>
                  <li>严重的安全风险（XSS攻击）</li>
                  <li>性能差（无法被JavaScript引擎优化）</li>
                  <li>调试困难（错误堆栈不清晰）</li>
                  <li>导致代码可读性降低</li>
                  <li>在严格模式下有额外限制</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- with 语句基本介绍 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-with"></i>
          <h2>with 语句基本介绍</h2>
        </div>
        <div class="card-content">
          <div class="function-details">
            <h3>基本语法</h3>
            <div class="syntax-box">
              <code>with (expression) statement</code>
            </div>

            <h3>作用原理</h3>
            <ul class="principle-list">
              <li>将给定对象添加到作用域链顶部</li>
              <li>在语句块中访问对象属性时省略对象引用</li>
              <li>不影响变量声明（let/const/var）</li>
              <li>在严格模式下被禁用</li>
            </ul>
          </div>

          <div class="use-cases">
            <h3>使用场景</h3>
            <div class="case-grid">
              <div class="case">
                <i class="icon icon-dom"></i>
                <h4>DOM 操作简化</h4>
                <p>简化深度嵌套的DOM操作</p>
              </div>
              <div class="case">
                <i class="icon icon-namespace"></i>
                <h4>命名空间简化</h4>
                <p>简化长命名空间下的代码</p>
              </div>
              <div class="case">
                <i class="icon icon-config"></i>
                <h4>配置对象</h4>
                <p>简化配置对象的属性访问</p>
              </div>
              <div class="case">
                <i class="icon icon-legacy"></i>
                <h4>遗留代码</h4>
                <p>维护旧版JavaScript代码</p>
              </div>
            </div>
          </div>

          <div class="code-examples">
            <h3>代码示例</h3>
            <div class="example-tabs">
              <div class="tab-header">
                <div :class="['tab-item', { active: activeWithTab === 'basic' }]" @click="activeWithTab = 'basic'">
                  基础用法
                </div>
                <div :class="['tab-item', { active: activeWithTab === 'dom' }]" @click="activeWithTab = 'dom'">
                  DOM 操作
                </div>
                <div :class="['tab-item', { active: activeWithTab === 'namespace' }]"
                  @click="activeWithTab = 'namespace'">
                  命名空间
                </div>
              </div>
              <div class="tab-content">
                <pre v-if="activeWithTab === 'basic'"><code>// 基本用法
const obj = { a: 1, b: 2, c: 3 };

with (obj) {
  console.log(a + b + c); // 输出: 6
  const sum = a + b + c;  // 变量声明在外部作用域
}

console.log(sum); // 输出: 6

// 注意：属性访问优先级
const a = 10;
with (obj) {
  console.log(a); // 输出: 1 (obj.a)，而不是外部变量a
}</code></pre>

                <pre v-if="activeWithTab === 'dom'"><code>// 简化 DOM 操作
const form = document.getElementById('myForm');

with (form) {
  firstName.value = 'John';
  lastName.value = 'Doe';
  email.value = 'john.doe@example.com';

  // 等同于:
  // form.firstName.value = 'John';
  // form.lastName.value = 'Doe';
  // form.email.value = 'john.doe@example.com';
}

// 现代替代方案 - 解构赋值
const { firstName, lastName, email } = form;
firstName.value = 'John';
lastName.value = 'Doe';
email.value = 'john.doe@example.com';</code></pre>

                <pre v-if="activeWithTab === 'namespace'"><code>// 简化命名空间访问
const app = {
  utils: {
    math: {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b
    },
    string: {
      capitalize: str => str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
};

// 使用 with 简化
with (app.utils.math) {
  console.log(add(5, 3));       // 输出: 8
  console.log(subtract(10, 4)); // 输出: 6
}

// 现代替代方案 - 解构赋值
const { add, subtract } = app.utils.math;
console.log(add(5, 3));       // 输出: 8
console.log(subtract(10, 4)); // 输出: 6</code></pre>
              </div>
            </div>
          </div>

          <div class="pros-cons">
            <h3>优点与缺点</h3>
            <div class="pros-cons-grid">
              <div class="pros">
                <h4><i class="icon icon-check"></i> 优点</h4>
                <ul>
                  <li>简化深度嵌套对象的访问</li>
                  <li>减少重复代码（省略对象引用）</li>
                  <li>使某些代码更简洁</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon icon-warning"></i> 缺点</h4>
                <ul>
                  <li>导致性能下降（作用域链变长）</li>
                  <li>使代码难以预测和维护</li>
                  <li>在严格模式下不可用</li>
                  <li>可能导致变量解析歧义</li>
                  <li>现代工具无法优化</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 现代替代方案 -->
      <div class="section-card">
        <div class="card-header">
          <i class="icon icon-alternative"></i>
          <h2>现代替代方案</h2>
        </div>
        <div class="card-content">
          <div class="alternatives">
            <h3>eval() 的替代方案</h3>
            <div class="alt-grid">
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-json"></i>
                </div>
                <div>
                  <h4>JSON.parse()</h4>
                  <p>用于安全解析JSON字符串</p>
                </div>
              </div>
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-function"></i>
                </div>
                <div>
                  <h4>Function 构造函数</h4>
                  <p>创建新函数作用域执行代码</p>
                </div>
              </div>
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-worker"></i>
                </div>
                <div>
                  <h4>Web Workers</h4>
                  <p>在独立线程中执行代码</p>
                </div>
              </div>
            </div>

            <h3>with 的替代方案</h3>
            <div class="alt-grid">
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-destruct"></i>
                </div>
                <div>
                  <h4>解构赋值</h4>
                  <p>从对象中提取属性到变量</p>
                </div>
              </div>
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-module"></i>
                </div>
                <div>
                  <h4>模块导入</h4>
                  <p>使用ES6模块导入功能</p>
                </div>
              </div>
              <div class="alt">
                <div class="alt-icon">
                  <i class="icon icon-alias"></i>
                </div>
                <div>
                  <h4>变量别名</h4>
                  <p>创建对象引用的短别名</p>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>
                <i class="icon icon-avoid"></i>
                <div>
                  <strong>避免使用 eval()</strong>
                  <p>除非在受控环境（如代码沙箱）</p>
                </div>
              </li>
              <li>
                <i class="icon icon-strict"></i>
                <div>
                  <strong>启用严格模式</strong>
                  <p>禁用 with 和限制 eval()</p>
                </div>
              </li>
              <li>
                <i class="icon icon-scan"></i>
                <div>
                  <strong>代码扫描</strong>
                  <p>使用ESLint检测这些特性</p>
                </div>
              </li>
              <li>
                <i class="icon icon-alternative"></i>
                <div>
                  <strong>使用替代方案</strong>
                  <p>优先使用现代语言特性</p>
                </div>
              </li>
              <li>
                <i class="icon icon-security"></i>
                <div>
                  <strong>安全审计</strong>
                  <p>检查所有动态代码执行点</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>eval() 和 with 是 JavaScript 的历史特性 | 现代开发中应避免使用 | 使用 ESLint 规则: <code>no-eval</code> 和 <code>no-with</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeEvalTab = ref('basic');
const activeWithTab = ref('basic');
</script>

<style lang="less" scoped>
@primary-color: #4a6baf;
@secondary-color: #3a5a9f;
@text-color: #2d3748;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@success-color: #4caf50;
@warning-color: #ff9800;
@error-color: #f44336;
@muted-color: #718096;

.eval-with-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: @text-color;
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, @primary-color 0%, @secondary-color 100%);
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

    h1 {
      font-size: 2.4rem;
      color: white;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1.8rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .section-card {
    background: @card-bg;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.overview-card {
      grid-column: 1 / -1;
    }
  }

  .card-header {
    background: linear-gradient(135deg, @primary-color 0%, lighten(@primary-color, 5%) 100%);
    padding: 1.2rem 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .card-content {
    padding: 1.8rem;

    h3 {
      font-size: 1.3rem;
      color: darken(@primary-color, 10%);
      margin-top: 0;
      margin-bottom: 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid @border-color;
    }
  }

  .definition {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .eval-def,
  .with-def {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border: none;
      padding: 0;
      margin-top: 0;
    }

    p {
      line-height: 1.6;
      margin-bottom: 0;
    }
  }

  .historical-context {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .timeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-top: 1rem;
  }

  .timeline-item {
    background: @card-bg;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .year {
    font-weight: bold;
    color: @primary-color;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .content {
    color: @muted-color;
    font-size: 0.95rem;
  }

  .function-details {
    margin-bottom: 1.5rem;
  }

  .syntax-box {
    background: lighten(@primary-color, 50%);
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Fira Code', 'Consolas', monospace;
    margin: 1rem 0;
    text-align: center;
    font-weight: bold;
    color: darken(@primary-color, 15%);
  }

  .principle-list {
    background: lighten(@primary-color, 55%);
    border-radius: 12px;
    padding: 1.5rem 1.5rem 1.5rem 2.5rem;
    margin: 1.5rem 0;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .use-cases {
    margin-bottom: 2rem;
  }

  .case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }

  .case {
    background: @light-bg;
    border-radius: 8px;
    padding: 1.2rem;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      background: lighten(@primary-color, 55%);
    }

    i {
      font-size: 2rem;
      color: @primary-color;
      margin-bottom: 0.5rem;
    }

    h4 {
      margin: 0 0 0.5rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.9rem;
    }
  }

  .code-examples {
    margin-bottom: 2rem;
  }

  .example-tabs {
    border: 1px solid @border-color;
    border-radius: 12px;
    overflow: hidden;
  }

  .tab-header {
    display: flex;
    background: lighten(@primary-color, 45%);
    border-bottom: 1px solid @border-color;
  }

  .tab-item {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    color: @muted-color;
    transition: all 0.2s ease;

    &.active {
      background: @card-bg;
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
    }

    &:hover:not(.active) {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .tab-content {
    background: @card-bg;
    padding: 1.5rem;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: darken(@primary-color, 15%);
    }

    code {
      display: block;
      white-space: pre-wrap;
    }
  }

  .pros-cons {
    margin-top: 2rem;
  }

  .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.2rem;
    border: 1px solid @border-color;

    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.8rem;
    }
  }

  .pros {
    border-top: 4px solid @success-color;
  }

  .cons {
    border-top: 4px solid @warning-color;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }

  .alternatives {
    margin-bottom: 2rem;
  }

  .alt-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .alt {
    display: flex;
    gap: 1rem;
    align-items: center;
    background: @light-bg;
    border-radius: 12px;
    padding: 1rem;

    .alt-icon {
      width: 50px;
      height: 50px;
      background: lighten(@primary-color, 45%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: @primary-color;
      flex-shrink: 0;
    }

    h4 {
      margin: 0 0 0.3rem;
      color: darken(@primary-color, 10%);
    }

    p {
      margin: 0;
      color: @muted-color;
      font-size: 0.9rem;
    }
  }

  .best-practices {
    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.2rem;
        align-items: flex-start;
        background: @light-bg;
        border-radius: 12px;
        padding: 1rem;

        i {
          color: @primary-color;
          font-size: 1.8rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        strong {
          display: block;
          margin-bottom: 0.3rem;
        }

        p {
          margin: 0;
          color: @muted-color;
        }
      }
    }
  }

  .footer {
    text-align: center;
    color: @muted-color;
    font-size: 0.9rem;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid @border-color;

    code {
      background: @light-bg;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Fira Code', 'Consolas', monospace;
    }
  }

  // 图标样式
  .icon {
    font-size: 1.6rem;

    &-js:before {
      content: "📜";
    }

    &-overview:before {
      content: "🔍";
    }

    &-eval:before {
      content: "⚡";
    }

    &-with:before {
      content: "🔗";
    }

    &-json:before {
      content: "{}";
    }

    &-dynamic:before {
      content: "🔄";
    }

    &-template:before {
      content: "📝";
    }

    &-repl:before {
      content: "💻";
    }

    &-dom:before {
      content: "🌐";
    }

    &-namespace:before {
      content: "📁";
    }

    &-config:before {
      content: "⚙️";
    }

    &-legacy:before {
      content: "🕰️";
    }

    &-alternative:before {
      content: "🆕";
    }

    &-check:before {
      content: "✅";
    }

    &-warning:before {
      content: "⚠️";
    }

    &-function:before {
      content: "ƒ";
    }

    &-worker:before {
      content: "🧵";
    }

    &-destruct:before {
      content: "🧩";
    }

    &-module:before {
      content: "📦";
    }

    &-alias:before {
      content: "🏷️";
    }

    &-avoid:before {
      content: "🚫";
    }

    &-strict:before {
      content: "🔒";
    }

    &-scan:before {
      content: "🔎";
    }

    &-security:before {
      content: "🛡️";
    }
  }
}
</style>
