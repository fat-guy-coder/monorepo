<template>
  <div class="arrow-function-container">
    <header class="guide-header">
      <h1>JavaScript 箭头函数实现指南</h1>
      <p>深入理解箭头函数的原理与实现方式</p>
    </header>

    <div class="content-wrapper">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 介绍部分 -->
        <section id="introduction" class="guide-section">
          <h2>什么是箭头函数？</h2>
          <div class="intro-content">
            <div class="intro-card">
              <div class="intro-icon">➡️</div>
              <h3>ES6 新特性</h3>
              <p>箭头函数是 ES6 引入的一种更简洁的函数语法</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🔗</div>
              <h3>词法作用域</h3>
              <p>继承外层作用域的 this 值</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🚫</div>
              <h3>无自身绑定</h3>
              <p>没有自己的 this、arguments、super 或 new.target</p>
            </div>
          </div>
        </section>

        <!-- 核心特性 -->
        <section id="features" class="guide-section">
          <h2>箭头函数的核心特性</h2>

          <div class="features-grid">
            <div class="feature-card">
              <h3>1. 绑定外层作用域的 this</h3>
              <p>箭头函数不创建自己的 this 上下文，而是继承定义时的外层作用域</p>
              <div class="comparison">
                <div class="comparison-item">
                  <h4>普通函数</h4>
                  <pre class="code-block">
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};</pre
                  >
                </div>
                <div class="comparison-item">
                  <h4>箭头函数</h4>
                  <pre class="code-block">
const obj = {
  value: 42,
  getValue: () => this.value;
};</pre
                  >
                </div>
              </div>
            </div>

            <div class="feature-card">
              <h3>2. 简洁的语法</h3>
              <p>箭头函数提供更简洁的语法形式，尤其在处理简单操作时</p>
              <div class="comparison">
                <div class="comparison-item">
                  <h4>普通函数</h4>
                  <pre class="code-block">
const add = function(a, b) {
  return a + b;
};</pre
                  >
                </div>
                <div class="comparison-item">
                  <h4>箭头函数</h4>
                  <pre class="code-block">const add = (a, b) => a + b;</pre>
                </div>
              </div>
            </div>

            <div class="feature-card">
              <h3>3. 隐式返回值</h3>
              <p>当函数体为单表达式时，可省略大括号并自动返回结果</p>
              <div class="comparison">
                <div class="comparison-item">
                  <h4>普通函数</h4>
                  <pre class="code-block">
const double = function(n) {
  return n * 2;
};</pre
                  >
                </div>
                <div class="comparison-item">
                  <h4>箭头函数</h4>
                  <pre class="code-block">const double = n => n * 2;</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 实现原理 -->
        <section id="implementation" class="guide-section">
          <h2>箭头函数的实现原理</h2>

          <div class="implementation-content">
            <div class="implementation-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>绑定外层作用域的 this</h3>
                <p>
                  箭头函数的核心特性是继承定义时的外层作用域的
                  this。我们可以通过闭包来模拟这一行为：
                </p>
                <pre class="code-block">
function createArrowFunction(fn, context) {
  // 使用闭包保存定义时的 this 值
  return function(...args) {
    // 使用保存的 context 作为 this
    return fn.apply(context, args);
  };
}</pre
                >
              </div>
            </div>

            <div class="implementation-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>处理隐式返回值</h3>
                <p>当函数体为单表达式时，箭头函数会自动返回结果：</p>
                <pre class="code-block">
function createArrowFunction(fn, context) {
  return function(...args) {
    // 检查函数体是否是单表达式
    const result = fn.apply(context, args);

    // 如果是单表达式函数，自动返回结果
    return result;
  };
}</pre
                >
              </div>
            </div>

            <div class="implementation-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>完整实现代码</h3>
                <p>结合上述两个核心特性，下面是箭头函数的完整实现：</p>
                <pre class="code-block">
function createArrowFunction(fn, context) {
  // 保存定义时的 this 值
  const outerThis = context || this;

  // 返回模拟的箭头函数
  return function(...args) {
    // 保存当前作用域的 this
    const currentThis = this;

    // 临时更改 this 为外层作用域的 this
    try {
      // 使用闭包中保存的 outerThis 作为 this
      return fn.apply(outerThis, args);
    } finally {
      // 恢复当前作用域的 this
      this = currentThis;
    }
  };
}

// 使用示例
const obj = {
  value: 42,
  getValue: createArrowFunction(function() {
    return this.value;
  })
};

console.log(obj.getValue()); // 输出 42</pre
                >
              </div>
            </div>
          </div>
        </section>

        <!-- 使用场景 -->
        <section id="use-cases" class="guide-section">
          <h2>箭头函数的适用场景</h2>

          <div class="scenario-grid">
            <div class="scenario-card">
              <div class="scenario-icon">🔄</div>
              <h3>回调函数</h3>
              <p>在回调函数中保持外层 this 的引用</p>
              <pre class="code-block">
// 传统方式
const self = this;
button.addEventListener('click', function() {
  self.handleClick();
});

// 箭头函数
button.addEventListener('click', () => {
  this.handleClick();
});</pre
              >
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>数组方法</h3>
              <p>简化 map、filter、reduce 等数组方法</p>
              <pre class="code-block">
// 传统方式
const doubled = numbers.map(function(n) {
  return n * 2;
});

// 箭头函数
const doubled = numbers.map(n => n * 2);</pre
              >
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">⏱️</div>
              <h3>定时器</h3>
              <p>在 setTimeout 和 setInterval 中保持 this 绑定</p>
              <pre class="code-block">
// 传统方式
const self = this;
setTimeout(function() {
  self.update();
}, 1000);

// 箭头函数
setTimeout(() => {
  this.update();
}, 1000);</pre
              >
            </div>
          </div>
        </section>

        <!-- 限制与注意事项 -->
        <section id="limitations" class="guide-section">
          <h2>箭头函数的限制与注意事项</h2>

          <div class="limitation-grid">
            <div class="limitation-card">
              <h3>🚫 不能用作构造函数</h3>
              <p>箭头函数没有 prototype 属性，不能使用 new 关键字调用</p>
              <pre class="code-block">
const Foo = () => {};
const bar = new Foo(); // 报错: Foo is not a constructor</pre
              >
            </div>

            <div class="limitation-card">
              <h3>🚫 没有 arguments 对象</h3>
              <p>箭头函数内部无法访问 arguments 对象</p>
              <pre class="code-block">
const sum = () => {
  console.log(arguments); // 报错: arguments is not defined
};</pre
              >
            </div>

            <div class="limitation-card">
              <h3>🚫 不能改变 this 绑定</h3>
              <p>call、apply 和 bind 方法无法改变箭头函数的 this 绑定</p>
              <pre class="code-block">
const obj = { value: 42 };
const getValue = () => this.value;

console.log(getValue.call(obj)); // 输出 undefined
console.log(getValue.apply(obj)); // 输出 undefined
console.log(getValue.bind(obj)()); // 输出 undefined</pre
              >
            </div>

            <div class="limitation-card">
              <h3>🚫 不适合对象方法</h3>
              <p>在对象方法中使用箭头函数会导致 this 指向问题</p>
              <pre class="code-block">
const obj = {
  value: 42,
  getValue: () => this.value
};

console.log(obj.getValue()); // 输出 undefined (期望42)</pre
              >
            </div>
          </div>
        </section>

        <!-- 总结 -->
        <section id="conclusion" class="guide-section">
          <h2>总结</h2>

          <div class="conclusion-content">
            <div class="pros-cons">
              <div class="pros">
                <h3>✅ 箭头函数的优点</h3>
                <ul>
                  <li>更简洁的语法，减少样板代码</li>
                  <li>自动绑定外层作用域的 this</li>
                  <li>隐式返回简化单表达式函数</li>
                  <li>避免传统函数中的 this 绑定问题</li>
                </ul>
              </div>

              <div class="cons">
                <h3>⚠️ 箭头函数的缺点</h3>
                <ul>
                  <li>不能用作构造函数</li>
                  <li>没有自己的 arguments 对象</li>
                  <li>无法通过 call/apply/bind 改变 this</li>
                  <li>不适合作为对象方法</li>
                </ul>
              </div>
            </div>

            <div class="final-recommendation">
              <h3>最佳实践建议</h3>
              <p>
                箭头函数最适合用于需要保持 this 绑定的场景，如回调函数、数组方法和定时器处理。
                对于需要动态 this 绑定或作为构造函数的情况，应使用传统函数。
                理解箭头函数的实现原理有助于避免常见的 this 绑定问题。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'introduction', title: '介绍' },
  { id: 'features', title: '核心特性' },
  { id: 'implementation', title: '实现原理' },
  { id: 'use-cases', title: '使用场景' },
  { id: 'limitations', title: '限制与注意' },
  { id: 'conclusion', title: '总结' },
])

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@code-bg: #f5f7fa;
@code-border: #e0e0e0;
@pros-color: #2ecc71;
@cons-color: #e74c3c;

.arrow-function-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 200px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: @light-bg;
  border-radius: 8px;
  box-shadow: @card-shadow;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }
}

.intro-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.intro-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .intro-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0 1rem;
    color: @primary-color;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    color: @primary-color;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  .comparison-item {
    background: @code-bg;
    border-radius: 6px;
    padding: 1rem;

    h4 {
      margin-top: 0;
      font-size: 1rem;
      color: #666;
    }
  }
}

.code-block {
  display: block;
  background: @code-bg;
  color: @text-color;
  border-radius: 6px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 1rem 0 0;
  line-height: 1.5;
  border: 1px solid @code-border;
  border-left: 3px solid @primary-color;
}

.implementation-content {
  margin-top: 1.5rem;
}

.implementation-step {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .step-number {
    flex: 0 0 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.scenario-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    color: @primary-color;
  }
}

.limitation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.limitation-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  border-top: 3px solid @cons-color;

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.conclusion-content {
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .pros,
    .cons {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
    }

    .pros {
      border-top: 3px solid @pros-color;
    }

    .cons {
      border-top: 3px solid @cons-color;
    }

    h3 {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
      }
    }
  }

  .final-recommendation {
    background: lighten(@primary-color, 48%);
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
    }

    p {
      line-height: 1.6;
    }
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .comparison {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr !important;
  }
}
</style>
