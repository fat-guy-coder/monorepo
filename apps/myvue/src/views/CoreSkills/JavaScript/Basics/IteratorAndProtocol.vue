<template>
  <div class="iterator-container">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1><span class="iter-text">迭代器</span>与<span class="proto-text">迭代协议</span></h1>
        <p class="subtitle">理解JavaScript遍历机制的核心原理</p>
        <p class="subtitle">这为进阶知识铺垫，可先了解，后续再深入</p>
        <div class="language-tag">
          <span class="tag">ECMAScript 2015</span>
          <span class="tag">Symbol.iterator</span>
          <span class="tag">for...of</span>
        </div>
        <p class="subtitle">跳转进阶<router-link :to="{ name: 'Iterator' }">ES6 迭代器</router-link></p>
      </div>
      <div class="header-animation">
        <div class="iterator-flow">
          <div v-for="i in 12" :key="i" class="item">{{ sampleData[(i - 1) % 5] }}</div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- 核心概念卡片 -->
      <div class="concept-cards">
        <div class="card iterable-object">
          <div class="card-icon">📦</div>
          <h3>可迭代对象</h3>
          <p>实现了<span class="highlight">@@iterator</span>方法的对象</p>
          <ul>
            <li>包含返回迭代器的方法</li>
            <li>可以通过Symbol.iterator访问</li>
            <li>如Array、Map、Set等</li>
          </ul>
        </div>
        <div class="card iterator">
          <div class="card-icon">🔄</div>
          <h3>迭代器</h3>
          <p>实现了<span class="highlight">next()</span>方法的对象</p>
          <ul>
            <li>返回{ value, done }对象</li>
            <li>维护当前的迭代状态</li>
            <li>按需计算下一个值</li>
          </ul>
        </div>
        <div class="card protocol">
          <div class="card-icon">📜</div>
          <h3>迭代协议</h3>
          <p>定义标准<span class="highlight">迭代约定</span></p>
          <ul>
            <li>可迭代协议</li>
            <li>迭代器协议</li>
            <li>使对象可被for...of消费</li>
          </ul>
        </div>
      </div>

      <!-- 代码实现部分 -->
      <div class="code-section">
        <h2 class="section-title">代码实现</h2>

        <div class="code-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <!-- 基本迭代器实现 -->
            <div v-if="activeTab === 0" class="tab-pane">
              <pre><code>// 创建自定义迭代器
class RangeIterator {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.current = start;
  }

  // 实现迭代器协议
  next() {
    if (this.current <= this.end) {
      const value = this.current;
      this.current += this.step;
      return { value, done: false };
    } else {
      return { done: true };
    }
  }
}

// 创建可迭代对象
const myRange = {
  from: 1,
  to: 5,

  // 实现可迭代协议
  [Symbol.iterator]() {
    return new RangeIterator(this.from, this.to);
  }
};

// 使用迭代器
const iterator = myRange[Symbol.iterator]();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5
console.log(iterator.next().done);  // true

// 使用for...of循环
for (const num of myRange) {
  console.log(num); // 1, 2, 3, 4, 5
}</code></pre>
            </div>

            <!-- 生成器实现 -->
            <div v-if="activeTab === 1" class="tab-pane">
              <pre><code>// 使用生成器函数创建迭代器
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// 创建可迭代对象
const numberGenerator = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }
};

// 使用迭代器
const genIterator = numberGenerator[Symbol.iterator]();
console.log(genIterator.next()); // { value: 1, done: false }

// 使用for...of循环
for (const num of numberGenerator) {
  console.log(num); // 1, 2, 3, 4, 5
}

// 创建无限迭代器
function* infiniteCounter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
// 可以无限调用...</code></pre>
            </div>

            <!-- 内置可迭代对象 -->
            <div v-if="activeTab === 2" class="tab-pane">
              <pre><code>// 1. Array
const fruits = ['🍎', '🍌', '🍊'];
for (const fruit of fruits) {
  console.log(fruit);
}

// 2. String
const message = 'Hello';
for (const char of message) {
  console.log(char); // H, e, l, l, o
}

// 3. Map
const countryMap = new Map([
  ['CN', '中国'],
  ['US', '美国'],
  ['JP', '日本']
]);

for (const [code, name] of countryMap) {
  console.log(`${code}: ${name}`);
}

// 4. Set
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
for (const num of uniqueNumbers) {
  console.log(num); // 1, 2, 3
}

// 5. NodeList
document.querySelectorAll('div').forEach(div => {
  console.log(div);
});

// 6. Arguments对象
function listArguments() {
  for (const arg of arguments) {
    console.log(arg);
  }
}
listArguments('a', 'b', 'c');

// 7. TypedArray
const intArray = new Int8Array([10, 20, 30]);
for (const value of intArray) {
  console.log(value);
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="use-cases-section">
        <h2 class="section-title">使用场景</h2>

        <div class="use-cases">
          <div class="case-card">
            <div class="case-icon">🔄</div>
            <h3>自定义数据结构遍历</h3>
            <p>为链表、树、图等自定义数据结构提供统一遍历接口</p>
            <div class="example">
              <pre>class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  *[Symbol.iterator]() {
    yield this.value;
    for (const child of this.children) {
      yield* child;
    }
  }
}</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">📶</div>
            <h3>惰性计算</h3>
            <p>按需生成值，节省内存和处理时间</p>
            <div class="example">
              <pre>function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">📡</div>
            <h3>异步数据流</h3>
            <p>使用异步迭代器处理数据流</p>
            <div class="example">
              <pre>async function* asyncGenerator() {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ];

  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}

// 使用for await...of
(async () => {
  for await (const data of asyncGenerator()) {
    console.log(data);
  }
})();</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🧩</div>
            <h3>组合迭代器</h3>
            <p>创建复杂的数据处理管道</p>
            <div class="example">
              <pre>function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

function* map(iterable, mapper) {
  for (const item of iterable) {
    yield mapper(item);
  }
}

const numbers = [1, 2, 3, 4, 5];
const result = map(
  filter(numbers, n => n % 2 === 0),
  n => n * 2
);

console.log([...result]); // [4, 8]</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 协议细节 -->
      <div class="protocol-details">
        <h2 class="section-title">迭代协议细节</h2>

        <div class="detail-grid">
          <div class="detail-card">
            <h3>可迭代协议</h3>
            <div class="detail-content">
              <p>要求对象必须实现 <span class="code-highlight">@@iterator</span> 方法</p>
              <pre>interface Iterable {
  [Symbol.iterator](): Iterator
}</pre>
              <ul>
                <li>通过Symbol.iterator键访问</li>
                <li>返回符合迭代器协议的对象</li>
                <li>可被for...of、展开运算符等消费</li>
              </ul>
            </div>
          </div>

          <div class="detail-card">
            <h3>迭代器协议</h3>
            <div class="detail-content">
              <p>定义产生值的序列的方式</p>
              <pre>interface Iterator {
  next(): IteratorResult
  return?(value?: any): IteratorResult
  throw?(e?: any): IteratorResult
}</pre>
              <ul>
                <li><strong>next()</strong> - 返回{ value, done }对象</li>
                <li><strong>return()</strong> - 可选的清理方法</li>
                <li><strong>throw()</strong> - 处理迭代器中错误</li>
              </ul>
            </div>
          </div>

          <div class="detail-card">
            <h3>迭代器结果</h3>
            <div class="detail-content">
              <p>next()方法返回的对象格式</p>
              <pre>interface IteratorResult {
  value: any
  done: boolean
}</pre>
              <ul>
                <li><strong>value</strong> - 当前迭代值</li>
                <li><strong>done</strong> - 是否迭代完成</li>
                <li>当done为true时，可省略value</li>
                <li>当省略value时，value为undefined</li>
              </ul>
            </div>
          </div>

          <div class="detail-card">
            <h3>迭代器消费</h3>
            <div class="detail-content">
              <p>JavaScript中消费可迭代对象的语法</p>
              <ul>
                <li><span class="code-highlight">for...of</span> 循环</li>
                <li><span class="code-highlight">...iterable</span> 展开语法</li>
                <li><span class="code-highlight">Array.from(iterable)</span></li>
                <li><span class="code-highlight">new Map(iterable)</span> 等构造函数</li>
                <li><span class="code-highlight">yield*</span> 表达式</li>
                <li>解构赋值：<span class="code-highlight">const [a, b] = iterable</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结部分 -->
    <footer class="summary">
      <div class="summary-content">
        <h2>总结</h2>
        <div class="key-points">
          <div class="point">
            <div class="point-number">1</div>
            <p>迭代协议包括<span class="highlight">可迭代协议</span>和<span class="highlight">迭代器协议</span></p>
          </div>
          <div class="point">
            <div class="point-number">2</div>
            <p>JavaScript内置数据结构默认实现了迭代协议</p>
          </div>
          <div class="point">
            <div class="point-number">3</div>
            <p>通过实现<span class="highlight">Symbol.iterator</span>方法使对象可迭代</p>
          </div>
          <div class="point">
            <div class="point-number">4</div>
            <p>生成器(generator)是创建迭代器的强大工具</p>
          </div>
          <div class="point">
            <div class="point-number">5</div>
            <p>迭代协议为JavaScript提供了统一的遍历抽象</p>
          </div>
        </div>
        <div class="best-practice">
          <h3>最佳实践：</h3>
          <ul>
            <li>优先使用for...of而非传统for循环</li>
            <li>使用生成器简化迭代器创建</li>
            <li>为自定义集合实现Symbol.iterator</li>
            <li>在需要惰性求值时使用迭代器</li>
            <li>了解何时使用迭代器而非数组方法</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sampleData = ['🍎', '📊', '🔄', '📦', '🧩'];
const tabs = [
  { title: '基本迭代器实现' },
  { title: '生成器实现' },
  { title: '内置可迭代对象' }
];
const activeTab = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #9b59b6;
@accent-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@dark-bg: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #282c34;

.iterator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    .header-content {
      flex: 1;
      min-width: 300px;
      padding: 40px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;

      h1 {
        font-size: 2.8rem;
        margin-bottom: 15px;
        line-height: 1.2;

        .iter-text {
          color: lighten(@accent-color, 10%);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .proto-text {
          color: #ffde7d;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      }

      .subtitle {
        font-size: 1.3rem;
        opacity: 0.9;
        margin-bottom: 30px;
      }

      .language-tag {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .tag {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(5px);
        }
      }
    }

    .header-animation {
      flex: 1;
      min-width: 300px;
      background: @dark-bg;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;

      .iterator-flow {
        display: flex;
        animation: flow 20s linear infinite;
        width: 180%;
        overflow: hidden;

        .item {
          flex-shrink: 0;
          background: #1a1d23;
          color: @accent-color;
          padding: 15px 25px;
          margin: 10px;
          border-radius: 50px;
          font-size: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 70px;
        }
      }
    }
  }

  .main-content {
    margin-bottom: 40px;

    .concept-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 40px;

      .card {
        flex: 1;
        min-width: 300px;
        background: white;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: @secondary-color;
          position: relative;
          padding-bottom: 10px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: @primary-color;
            border-radius: 3px;
          }
        }

        p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 15px;

          .highlight {
            background: rgba(@accent-color, 0.15);
            padding: 0 5px;
            border-radius: 4px;
            font-weight: 600;
            color: darken(@accent-color, 15%);
          }
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 10px;
            padding-left: 5px;
            position: relative;

            &::before {
              content: '•';
              color: @primary-color;
              font-weight: bold;
              position: absolute;
              left: -15px;
              top: 0;
            }
          }
        }
      }

      .iterable-object {
        border-top: 5px solid @primary-color;
      }

      .iterator {
        border-top: 5px solid @accent-color;
      }

      .protocol {
        border-top: 5px solid @secondary-color;
      }
    }

    .section-title {
      font-size: 2rem;
      color: @secondary-color;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 3px solid rgba(@primary-color, 0.3);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100px;
        height: 3px;
        background: @primary-color;
        border-radius: 3px;
      }
    }

    .code-section {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      margin-bottom: 40px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .code-tabs {
        .tabs {
          display: flex;
          background: @dark-bg;
          padding: 0 20px;

          button {
            padding: 15px 25px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;

            &.active {
              color: white;
              font-weight: 600;

              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 70%;
                height: 3px;
                background: @accent-color;
                border-radius: 3px 3px 0 0;
              }
            }

            &:hover:not(.active) {
              color: white;
              background: rgba(255, 255, 255, 0.1);
            }
          }
        }

        .tab-content {
          .tab-pane {
            pre {
              margin: 0;
              padding: 25px;
              overflow-x: auto;
              background: @code-bg;
              color: #abb2bf;

              code {
                font-family: 'Fira Code', 'Consolas', monospace;
                line-height: 1.6;
                font-size: 0.95rem;
              }
            }
          }
        }
      }
    }

    .use-cases-section {
      margin-bottom: 40px;

      .use-cases {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;

        .case-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          .case-icon {
            background: linear-gradient(135deg, @primary-color, @secondary-color);
            color: white;
            font-size: 2.5rem;
            padding: 25px;
            display: flex;
            justify-content: center;
          }

          .case-content {
            padding: 25px;

            h3 {
              color: @secondary-color;
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 1.4rem;
            }

            p {
              color: #555;
              line-height: 1.6;
              margin-bottom: 20px;
            }

            .example {
              background: @light-bg;
              border-radius: 10px;
              padding: 15px;
              overflow-x: auto;

              pre {
                margin: 0;
                font-family: 'Fira Code', 'Consolas', monospace;
                font-size: 0.85rem;
                line-height: 1.5;
                color: #444;
              }
            }
          }
        }
      }
    }

    .protocol-details {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 40px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;

        .detail-card {
          background: @light-bg;
          border-radius: 15px;
          padding: 25px;
          border-left: 4px solid @primary-color;

          h3 {
            margin-top: 0;
            color: @secondary-color;
            font-size: 1.4rem;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(@primary-color, 0.2);
          }

          .detail-content {
            p {
              line-height: 1.7;
              margin-bottom: 15px;
            }

            .code-highlight {
              background: rgba(@accent-color, 0.15);
              padding: 2px 8px;
              border-radius: 4px;
              font-family: monospace;
              color: darken(@accent-color, 20%);
              font-weight: 500;
            }

            pre {
              background: rgba(0, 0, 0, 0.05);
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
              margin: 15px 0;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
            }

            ul {
              padding-left: 20px;

              li {
                margin-bottom: 10px;
                position: relative;
                padding-left: 15px;

                &::before {
                  content: '→';
                  position: absolute;
                  left: 0;
                  color: @primary-color;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }

  .summary {
    background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 5%));
    color: white;
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);

    .summary-content {
      max-width: 800px;
      margin: 0 auto;

      h2 {
        text-align: center;
        font-size: 2.2rem;
        margin-bottom: 40px;
        color: #ffde7d;
        position: relative;
        padding-bottom: 20px;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: @accent-color;
          border-radius: 4px;
        }
      }

      .key-points {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        justify-content: center;
        margin-bottom: 40px;

        .point {
          flex: 1;
          min-width: 300px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.12);
          }

          .point-number {
            background: @accent-color;
            color: @dark-bg;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            font-weight: bold;
            flex-shrink: 0;
          }

          p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 0;

            .highlight {
              color: @accent-color;
              font-weight: 500;
            }
          }
        }
      }

      .best-practice {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 25px;

        h3 {
          color: #ffde7d;
          margin-top: 0;
          font-size: 1.4rem;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 15px;
            padding-left: 15px;
            position: relative;
            line-height: 1.6;

            &::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: @accent-color;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

@keyframes flow {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
  }

  .concept-cards,
  .use-cases,
  .detail-grid {
    flex-direction: column;
  }

  .iterator-flow {
    width: 300% !important;
  }
}
</style>
