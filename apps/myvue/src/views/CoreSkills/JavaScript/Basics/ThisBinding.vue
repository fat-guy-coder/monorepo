<template>
  <div class="this-guide">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">this</div>
        </div>
        <div class="title-container">
          <h1>JavaScript this指向</h1>
          <p class="subtitle">深入理解上下文绑定的核心机制</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">5</div>
          <div class="stat-label">绑定规则</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">修改方法</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">90%</div>
          <div class="stat-label">开发者痛点</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本介绍 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🔍</span> this是什么？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="definition">
            <div class="quote">
              "this是JavaScript中一个特殊的对象，它指向当前执行代码的上下文环境。"
            </div>
          </div>

          <div class="reason">
            <h3>为什么需要this？</h3>
            <p>this提供了一种优雅的方式来引用函数执行的上下文对象，使我们可以：</p>

            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">🔄</div>
                <h4>复用函数</h4>
                <p>同一函数可在不同上下文中使用</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🧩</div>
                <h4>面向对象</h4>
                <p>在对象方法中访问对象属性</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📐</div>
                <h4>明确上下文</h4>
                <p>明确函数执行的上下文环境</p>
              </div>
              <div class="feature">
                <div class="feature-icon">🚀</div>
                <h4>动态绑定</h4>
                <p>运行时动态改变函数执行上下文</p>
              </div>
            </div>
          </div>

          <div class="key-concepts">
            <h3>核心概念</h3>
            <div class="concepts">
              <div class="concept-card">
                <h4>绑定规则</h4>
                <p>this的值由函数调用方式决定</p>
              </div>
              <div class="concept-card">
                <h4>执行上下文</h4>
                <p>函数执行时的环境决定了this</p>
              </div>
              <div class="concept-card">
                <h4>动态绑定</h4>
                <p>this在运行时绑定，而非定义时</p>
              </div>
              <div class="concept-card">
                <h4>严格模式</h4>
                <p>严格模式影响默认绑定行为</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- this指向类型 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📍</span> this指向规则</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="binding-rules">
            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">1</div>
                <h3>默认绑定</h3>
                <div class="rule-tag"><span class="tag global">全局对象</span></div>
              </div>
              <div class="rule-content">
                <p>独立函数调用：this指向全局对象（浏览器中为window，Node.js中为global）</p>
                <div class="code-snippet">
                  <pre>function showThis() {
  console.log(this);
}

showThis(); // 浏览器中输出: Window {...}</pre>
                </div>
                <div class="note warning">
                  <strong>注意：</strong> 在严格模式(<code>'use strict'</code>)下，this为undefined
                </div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">2</div>
                <h3>隐式绑定</h3>
                <div class="rule-tag"><span class="tag object">调用对象</span></div>
              </div>
              <div class="rule-content">
                <p>方法调用：this指向调用该方法的对象</p>
                <div class="code-snippet">
                  <pre>const user = {
  name: '张三',
  greet() {
    console.log(`你好，我是${this.name}`);
  }
};

user.greet(); // 输出: 你好，我是张三</pre>
                </div>
                <h4>隐式丢失问题</h4>
                <p>方法赋值给变量时丢失this绑定：</p>
                <div class="code-snippet">
                  <pre>const greet = user.greet;
greet(); // 输出: 你好，我是undefined</pre>
                </div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">3</div>
                <h3>显式绑定</h3>
                <div class="rule-tag"><span class="tag manual">手动指定</span></div>
              </div>
              <div class="rule-content">
                <p>使用call/apply/bind方法显式设置this</p>
                <div class="code-snippet">
                  <pre>function introduce(lang) {
  console.log(`我是${this.name}，使用${lang}编程`);
}

const dev = { name: '李四' };

// call方法
introduce.call(dev, 'JavaScript');

// apply方法
introduce.apply(dev, ['TypeScript']);

// bind方法创建新函数
const boundIntroduce = introduce.bind(dev);
boundIntroduce('Python');</pre>
                </div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">4</div>
                <h3>new绑定</h3>
                <div class="rule-tag"><span class="tag instance">新实例</span></div>
              </div>
              <div class="rule-content">
                <p>构造函数调用：this指向新创建的实例对象</p>
                <div class="code-snippet">
                  <pre>function Person(name) {
  this.name = name;
}

const p = new Person('王五');
console.log(p.name); // 输出: 王五</pre>
                </div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">5</div>
                <h3>箭头函数</h3>
                <div class="rule-tag"><span class="tag lexical">词法作用域</span></div>
              </div>
              <div class="rule-content">
                <p>箭头函数没有自己的this，它继承自外层作用域</p>
                <div class="code-snippet">
                  <pre>const counter = {
  count: 0,

  // 传统函数方法
  increment: function() {
    setTimeout(function() {
      // 这里this指向window (默认绑定)
      console.log(this.count); // undefined
    }, 1000);
  },

  // 箭头函数方法
  incrementArrow: function() {
    setTimeout(() => {
      // 这里this继承自incrementArrow函数
      console.log(this.count); // 输出: 0
    }, 1000);
  }
};

counter.increment();
counter.incrementArrow();</pre>
                </div>
              </div>
            </div>

            <div class="rule">
              <div class="rule-header">
                <div class="rule-number">6</div>
                <h3>事件源</h3>
                <div class="rule-tag"><span class="tag event">事件源</span></div>
              </div>
              <div class="rule-content">
                <p>事件源：this指向事件源对象</p>
                <div class="code-snippet">
                  <pre>document.getElementById('myBtn').addEventListener('click', function(event) {
                    console.log(this);  // 指向事件源对象
                    console.log(event.target); // 指向事件源对象
                  });</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 执行上下文 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🌐</span> 执行上下文</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="execution-context">
            <div class="context-explanation">
              <h3>执行上下文与this的关系</h3>
              <p>执行上下文是JavaScript代码执行时的环境，包含了变量、函数、作用域链等信息。this是执行上下文的一个属性。</p>

              <div class="context-types">
                <div class="context-type">
                  <h4>全局执行上下文</h4>
                  <p>在全局作用域中执行代码时创建，this指向全局对象</p>
                </div>
                <div class="context-type">
                  <h4>函数执行上下文</h4>
                  <p>当函数被调用时创建，this的值取决于函数的调用方式</p>
                </div>
                <div class="context-type">
                  <h4>eval执行上下文</h4>
                  <p>当eval函数执行时创建，this指向eval函数所在的上下文</p>
                  <p>介绍下eval函数</p>
                  <p>eval函数可以接收一个字符串作为参数，并执行该字符串中的JavaScript代码。</p>
                  <p>eval(code, context)</p>
                  <p>code: 要执行的JavaScript代码</p>
                  <p>context: 要执行的JavaScript代码的上下文</p>
                  <p>缺点：eval函数会修改当前作用域的变量，可能会导致变量污染。</p>
                </div>
              </div>
            </div>

            <div class="context-stack">
              <h3>执行上下文栈</h3>
              <p>JavaScript使用执行上下文栈（调用栈）管理多个执行上下文：</p>
              <div class="stack-diagram">
                <div class="stack-item">全局执行上下文<br><small>(this: window)</small></div>
                <div class="stack-arrow">↓</div>
                <div class="stack-item">func1()上下文<br><small>(this: obj)</small></div>
                <div class="stack-arrow">↓</div>
                <div class="stack-item">func2()上下文<br><small>(this: window)</small></div>
              </div>
              <div class="code-snippet">
                <pre>function func1() {
  console.log(this); // { name: '示例' }

  function func2() {
    console.log(this); // window
  }

  func2();
}

const obj = { name: '示例' };
func1.call(obj);</pre>
              </div>
            </div>

            <div class="binding-precedence">
              <h3>this绑定优先级</h3>
              <p>多种规则适用时，优先级从高到低：</p>
              <div class="precedence-list">
                <div class="precedence-item">
                  <div class="level">1</div>
                  <div class="method">new绑定</div>
                  <div class="example"><code>new Foo()</code></div>
                </div>
                <div class="precedence-item">
                  <div class="level">2</div>
                  <div class="method">显式绑定</div>
                  <div class="example"><code>call/apply/bind</code></div>
                </div>
                <div class="precedence-item">
                  <div class="level">3</div>
                  <div class="method">隐式绑定</div>
                  <div class="example"><code>obj.foo()</code></div>
                </div>
                <div class="precedence-item">
                  <div class="level">4</div>
                  <div class="method">默认绑定</div>
                  <div class="example"><code>foo()</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 修改this的方法 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🔧</span> 修改this的方法</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="modification-methods">
            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">📞</span> call()</h3>
                <div class="method-syntax">func.call(thisArg, arg1, arg2, ...)</div>
              </div>
              <div class="method-content">
                <p>立即调用函数，并设置函数的this值，参数逐个传递</p>
                <div class="code-snippet">
                  <pre>function greet(greeting, punctuation) {
  console.log(`${greeting}, 我是${this.name}${punctuation}`);
}

const person = { name: '赵六' };

greet.call(person, '你好', '!');
// 输出: 你好, 我是赵六!</pre>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">📝</span> apply()</h3>
                <div class="method-syntax">func.apply(thisArg, [arg1, arg2, ...])</div>
              </div>
              <div class="method-content">
                <p>立即调用函数，并设置函数的this值，参数作为数组传递</p>
                <div class="code-snippet">
                  <pre>function introduce(lang1, lang2) {
  console.log(`我是${this.name}，精通${lang1}和${lang2}`);
}

const developer = { name: '钱七' };

introduce.apply(developer, ['JavaScript', 'TypeScript']);
// 输出: 我是钱七，精通JavaScript和TypeScript</pre>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">🔗</span> bind()</h3>
                <div class="method-syntax">func.bind(thisArg, arg1, arg2, ...)</div>
              </div>
              <div class="method-content">
                <p>创建一个新函数，永久绑定this值，并可预设部分参数</p>
                <div class="code-snippet">
                  <pre>const car = {
  brand: 'Tesla',
  getInfo: function(year) {
    console.log(`${year}年款 ${this.brand}`);
  }
};

const boundGetInfo = car.getInfo.bind(car);
setTimeout(boundGetInfo, 1000, 2023);
// 1秒后输出: 2023年款 Tesla

// 部分应用
const getTeslaInfo = car.getInfo.bind(car, 2023);
getTeslaInfo(); // 输出: 2023年款 Tesla</pre>
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">🏹</span> 箭头函数</h3>
                <div class="method-syntax">() => { ... }</div>
              </div>
              <div class="method-content">
                <p>箭头函数不绑定自己的this，而是继承自外层作用域</p>
                <div class="code-snippet">
                  <pre>class Timer {
  constructor() {
    this.seconds = 0;

    // 传统方法 - this丢失
    setInterval(function() {
      console.log(this.seconds++); // NaN (this指向window)
    }, 1000);

    // 箭头函数 - 保留this
    setInterval(() => {
      console.log(this.seconds++); // 正确递增
    }, 1000);
  }
}

new Timer();</pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">⚠️</span> 注意事项</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="cautions">
            <div class="caution">
              <div class="caution-icon">🚫</div>
              <h3>严格模式的影响</h3>
              <p>在严格模式下，默认绑定的this为undefined而不是全局对象，避免意外污染全局命名空间</p>
            </div>

            <div class="caution">
              <div class="caution-icon">🔍</div>
              <h3>回调函数中的this</h3>
              <p>事件处理函数和回调函数中的this可能不是期望的值，需要使用bind或箭头函数</p>
              <div class="code-snippet small">
                <pre>class Button {
  constructor() {
    this.text = '点击我';
    // 错误：this指向DOM元素
    document.getElementById('myBtn').addEventListener('click', this.handleClick);

    // 正确：绑定this
    document.getElementById('myBtn').addEventListener('click', this.handleClick.bind(this));

    // 正确：使用箭头函数
    document.getElementById('myBtn').addEventListener('click', () => this.handleClick());
  }

  handleClick() {
    console.log(this.text);
  }
}</pre>
              </div>
            </div>

            <div class="caution">
              <div class="caution-icon">🔄</div>
              <h3>方法赋值问题</h3>
              <p>将对象方法赋值给变量时会丢失this绑定</p>
              <div class="code-snippet small">
                <pre>const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

const getValue = obj.getValue;
console.log(getValue()); // undefined</pre>
              </div>
            </div>

            <div class="caution">
              <div class="caution-icon">🧪</div>
              <h3>API设计陷阱</h3>
              <p>函数参数中的this可能被意外覆盖，应避免在函数参数中使用this</p>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>在对象方法中使用传统函数，确保this正确绑定</li>
              <li>在回调函数和闭包中使用箭头函数保留this</li>
              <li>使用类字段语法绑定方法（实验性）</li>
              <li>避免在函数内部依赖全局this（使用严格模式）</li>
              <li>使用TypeScript等工具检测this错误</li>
              <li>调试时使用console.trace()追踪this变化</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">✅</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="summary">
              <p>this是JavaScript中最重要也最令人困惑的概念之一。理解this的工作原理对于编写健壮的JavaScript代码至关重要。</p>

              <div class="key-points">
                <h3>核心要点：</h3>
                <ol>
                  <li>this的值在函数调用时确定，而非定义时</li>
                  <li>遵循5种绑定规则：默认、隐式、显式、new和箭头函数</li>
                  <li>可使用call/apply/bind显式设置this值</li>
                  <li>箭头函数没有自己的this，继承自外层作用域</li>
                  <li>严格模式影响默认绑定行为</li>
                  <li>注意回调函数和方法赋值时的this丢失问题</li>
                </ol>
              </div>
            </div>

            <div class="resources">
              <h3>学习资源</h3>
              <ul>
                <li>MDN文档：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this"
                    target="_blank">this - JavaScript | MDN</a></li>
                <li>《你不知道的JavaScript》上卷：第2章 this解析</li>
                <li>JavaScript.info：<a href="https://javascript.info/object-methods" target="_blank">对象方法和this</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 JavaScript this指向指南 | 掌握上下文绑定的核心机制</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 演示代码
const callExample = ref(`
const person = { name: '示例用户' };

function greet(greeting) {
  return \`\${greeting}, \${this.name}!\`;
}

// 使用call改变this
const result = greet.call(person, '你好');
console.log(result); // 输出: 你好, 示例用户!`)

const applyExample = ref(`
const numbers = [5, 6, 2, 3, 7];

// 使用apply寻找最大值
const max = Math.max.apply(null, numbers);
console.log(max); // 7`)

const bindExample = ref(`
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

// 绑定this
const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42`)

const arrowFunctionExample = ref(`
const obj = {
  count: 10,
  increment: function() {
    setTimeout(() => {
      // 箭头函数继承了increment的this
      this.count++;
      console.log(this.count); // 11
    }, 100);
  }
};

obj.increment();`)
</script>

<style lang="less" scoped>
@primary: #4a6cf7;
@secondary: #2c3e50;
@accent: #e74c3c;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;
@warning: #e67e22;
@success: #2ecc71;
@info: #3498db;
@rule-color-1: #ff7043;
@rule-color-2: #ab47bc;
@rule-color-3: #42a5f5;
@rule-color-4: #66bb6a;
@rule-color-5: #ffca28;

.this-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #4568dc 0%, #2c3e50 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'this';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.05;
    font-family: monospace;
    font-weight: 800;
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: white;
        color: @primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 800;
        box-shadow: 0 5px 15px rgba(74, 108, 247, 0.5);
      }
    }

    .title-container {
      h1 {
        font-size: 2.8rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.definition {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .quote {
    font-size: 1.3rem;
    font-style: italic;
    text-align: center;
    position: relative;
    padding: 20px 0;

    &::before,
    &::after {
      content: '"';
      font-size: 5rem;
      opacity: 0.1;
      position: absolute;
      color: @primary;
    }

    &::before {
      top: -30px;
      left: -10px;
    }

    &::after {
      bottom: -60px;
      right: -10px;
    }
  }
}

.reason {
  margin-bottom: 30px;

  p {
    margin-bottom: 20px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.feature {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary;
  }

  p {
    margin-bottom: 0;
  }
}

.key-concepts {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary;
  }

  p {
    margin-bottom: 0;
  }
}

.binding-rules .rule {
  background: white;
  border-radius: 12px;
  margin-bottom: 30px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-left: 4px solid @rule-color-1;

  &:nth-child(2) {
    border-left-color: @rule-color-2;
  }

  &:nth-child(3) {
    border-left-color: @rule-color-3;
  }

  &:nth-child(4) {
    border-left-color: @rule-color-4;
  }

  &:nth-child(5) {
    border-left-color: @rule-color-5;
  }
}

.rule-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .rule-number {
    width: 40px;
    height: 40px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    font-size: 1.6rem;
  }

  .rule-tag {
    margin-left: auto;

    .tag {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;

      &.global {
        background: rgba(@rule-color-1, 0.15);
        color: darken(@rule-color-1, 15%);
      }

      &.object {
        background: rgba(@rule-color-2, 0.15);
        color: darken(@rule-color-2, 15%);
      }

      &.manual {
        background: rgba(@rule-color-3, 0.15);
        color: darken(@rule-color-3, 15%);
      }

      &.instance {
        background: rgba(@rule-color-4, 0.15);
        color: darken(@rule-color-4, 15%);
      }

      &.lexical {
        background: rgba(@rule-color-5, 0.15);
        color: darken(@rule-color-5, 25%);
      }
    }
  }
}

.execution-context {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
}

.context-explanation {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: @primary;
  }
}

.context-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.context-type {
  background: rgba(@info, 0.05);
  border-radius: 8px;
  padding: 15px;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 0;
    font-size: 0.95rem;
  }
}

.context-stack {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: @primary;
  }
}

.stack-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .stack-item {
    background: white;
    border: 1px solid @border;
    border-radius: 8px;
    padding: 15px;
    width: 200px;
    text-align: center;
    margin: 10px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    small {
      color: #777;
      font-size: 0.9rem;
    }
  }

  .stack-arrow {
    color: @primary;
    font-size: 1.5rem;
  }
}

.binding-precedence {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: @primary;
    text-align: center;
  }
}

.precedence-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
}

.precedence-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background: rgba(@primary, 0.05);

  .level {
    width: 30px;
    height: 30px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 15px;
  }

  .method {
    flex: 1;
    font-weight: 500;
  }

  .example {
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    color: #777;
  }
}

.modification-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.method {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .method-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid @border;
    padding-bottom: 15px;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;

      .method-icon {
        margin-right: 10px;
      }
    }

    .method-syntax {
      margin-left: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      background: rgba(@primary, 0.05);
      padding: 5px 10px;
      border-radius: 4px;
      color: @primary;
    }
  }
}

.cautions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.caution {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .caution-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @accent;
  }
}

.best-practices {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: @secondary;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 15px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }

  &.small {
    font-size: 0.85rem;
    padding: 10px 15px;
  }
}

.note {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;

  &.warning {
    background: lighten(@warning, 40%);
    border-left: 3px solid @warning;

    strong {
      color: @warning;
    }
  }
}

.conclusion {
  display: flex;
  gap: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .summary {
    flex: 2;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  .resources {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: @secondary;
      padding-bottom: 15px;
      border-bottom: 1px solid @border;
    }

    ul {
      padding-left: 0;

      li {
        margin-bottom: 15px;
        list-style: none;
        padding-left: 30px;
        position: relative;

        &::before {
          content: '🔗';
          position: absolute;
          left: 0;
          top: 0;
        }

        a {
          color: @primary;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

.key-points {
  background: rgba(@primary, 0.05);
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;

  h3 {
    margin-top: 0;
    color: @primary;
  }

  ol {
    padding-left: 25px;

    li {
      margin-bottom: 15px;
      padding-left: 10px;
      position: relative;

      &::marker {
        color: @primary;
        font-weight: bold;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  color: #7f8c8d;
  font-size: 0.95rem;
  border-top: 1px solid @border;
}
</style>
