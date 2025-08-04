<template>
  <div class="container">
    <header class="header">
      <h1 class="title">JS模块加载引用类型详解</h1>
      <p class="subtitle">深入理解模块间引用类型共享的"坑"与解决方案</p>
    </header>

    <main class="main-content">
      <section class="intro">
        <p>
          在JavaScript模块系统中，当导出和导入引用类型（如对象、数组等）时，会出现一些容易让人困惑的现象。
          理解这些现象背后的原理，对于避免开发中的"坑"至关重要。
        </p>
      </section>

      <section class="core-question">
        <h2>核心问题</h2>
        <div class="question-card">
          <p class="question">1. 导出文件中后续（通过setTimeout异步）改变引用类型中的值，导入文件中的值会变吗？</p>
          <p class="answer highlight">会变！因为模块导出的是引用类型的引用，而非副本</p>
        </div>
        <div class="question-card">
          <p class="question">2. 导入文件中改变（通过setTimeout异步）引用类型中的值，导出文件中的值会变吗？</p>
          <p class="answer highlight">会变！因为双方共享同一个引用地址</p>
        </div>
      </section>

      <section class="principle">
        <h2>原理分析</h2>
        <div class="card">
          <p>JavaScript模块系统中，对于引用类型的处理遵循以下原则：</p>
          <ul class="principle-list">
            <li>
              <span class="keyword">引用传递</span>：模块导出的引用类型（对象、数组等）是按引用传递的，而非值传递
            </li>
            <li>
              <span class="keyword">单一实例</span>：模块在应用中只被加载一次，导出的对象在整个应用中是单一实例
            </li>
            <li>
              <span class="keyword">共享引用</span>：所有导入该模块的地方，获取的都是同一个引用地址
            </li>
            <li>
              <span class="keyword">动态关联</span>：当通过该引用修改对象属性时，所有持有该引用的地方都会感知到变化
            </li>
          </ul>
          <p class="warning">
            这就是所谓的"坑"：开发者常误以为导入的是值的副本，而实际上是共享的引用，导致修改时出现意外的副作用。
          </p>
        </div>
      </section>

      <section class="examples">
        <h2>示例演示</h2>

        <div class="example-card">
          <h3>1. 导出模块修改值，导入模块会同步变化</h3>
          <div class="code-block">
            <pre><code>// 导出模块 (module.js)
export const sharedObject = { value: 10 };

// 2秒后修改值
setTimeout(() => {
  sharedObject.value = 20;
  console.log('导出模块已修改值为', sharedObject.value);
}, 2000);</code></pre>
          </div>
          <div class="code-block">
            <pre><code>// 导入模块 (app.js)
import { sharedObject } from './module.js';

console.log('初始值:', sharedObject.value); // 输出: 10

// 3秒后检查值
setTimeout(() => {
  console.log('3秒后的值:', sharedObject.value); // 输出: 20
}, 3000);</code></pre>
          </div>
          <div class="result">
            <p><strong>输出结果：</strong></p>
            <p>初始值: 10</p>
            <p>导出模块已修改值为 20</p>
            <p>3秒后的值: 20</p>
          </div>
        </div>

        <div class="example-card">
          <h3>2. 导入模块修改值，导出模块会同步变化</h3>
          <div class="code-block">
            <pre><code>// 导出模块 (module.js)
export const sharedObject = { value: 10 };

// 3秒后检查值
setTimeout(() => {
  console.log('导出模块3秒后的值:', sharedObject.value); // 输出: 30
}, 3000);</code></pre>
          </div>
          <div class="code-block">
            <pre><code>// 导入模块 (app.js)
import { sharedObject } from './module.js';

console.log('初始值:', sharedObject.value); // 输出: 10

// 2秒后修改值
setTimeout(() => {
  sharedObject.value = 30;
  console.log('导入模块已修改值为', sharedObject.value);
}, 2000);</code></pre>
          </div>
          <div class="result">
            <p><strong>输出结果：</strong></p>
            <p>初始值: 10</p>
            <p>导入模块已修改值为 30</p>
            <p>导出模块3秒后的值: 30</p>
          </div>
        </div>
      </section>

      <section class="solutions">
        <h2>处理方法</h2>
        <div class="solutions-grid">
          <div class="solution-card">
            <h3>1. 使用不可变数据</h3>
            <p>通过创建新对象而非修改现有对象来避免副作用：</p>
            <pre><code>// 不直接修改
// sharedObject.value = 20;

// 而是创建新对象
const newObject = { ...sharedObject, value: 20 };</code></pre>
          </div>

          <div class="solution-card">
            <h3>2. 导出访问器方法</h3>
            <p>封装数据访问和修改，提供明确的接口：</p>
            <pre><code>// 导出模块
let value = 10;
export const getValue = () => value;
export const setValue = (newValue) => {
  value = newValue;
};

// 导入模块
import { getValue, setValue } from './module.js';</code></pre>
          </div>

          <div class="solution-card">
            <h3>3. 使用模块模式</h3>
            <p>通过闭包隐藏内部状态，只暴露必要接口：</p>
            <pre><code>// 导出模块
const createStore = () => {
  let state = { value: 10 };
  return {
    getState: () => ({ ...state }), // 返回副本
    setState: (newState) => {
      state = { ...state, ...newState };
    }
  };
};
export default createStore();</code></pre>
          </div>

          <div class="solution-card">
            <h3>4. 使用状态管理库</h3>
            <p>对于复杂应用，可使用Vuex、Redux等状态管理库，提供可预测的状态管理。</p>
          </div>
        </div>
      </section>

      <section class="summary">
        <h2>总结</h2>
        <div class="card">
          <p>
            JavaScript模块中的引用类型共享是一把双刃剑：它可以方便地实现模块间数据共享，但也可能导致意外的副作用。
            理解其工作原理，采用不可变数据模式或封装访问接口，可以有效避免这类"坑"，写出更可维护的代码。
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>JavaScript模块系统详解 &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加交互逻辑，例如运行示例代码的功能
// 为简化，此处仅展示静态内容
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.7;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;

  .title {
    color: #1e293b;
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }

  .subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
  }
}

.main-content {
  section {
    margin-bottom: 40px;

    h2 {
      color: #1e293b;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    h3 {
      color: #334155;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }
  }

  .intro {
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .core-question {
    .question-card {
      background-color: #fff;
      border-radius: 6px;
      padding: 15px 20px;
      margin-bottom: 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      border-left: 3px solid #3b82f6;

      .question {
        margin: 0 0 8px 0;
        font-weight: 600;
        color: #1e293b;
      }

      .answer {
        margin: 0;
        color: #334155;

        &.highlight {
          color: #0f766e;
          font-weight: 500;
        }
      }
    }
  }

  .principle, .summary {
    .card {
      background-color: #fff;
      border-radius: 6px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .principle-list {
        padding-left: 25px;
        margin: 15px 0;

        li {
          margin-bottom: 10px;

          .keyword {
            font-weight: 600;
            color: #3b82f6;
          }
        }
      }

      .warning {
        color: #b45309;
        background-color: #fff7ed;
        padding: 10px 15px;
        border-radius: 4px;
        margin-top: 15px;
        border-left: 3px solid #f59e0b;
      }
    }
  }

  .examples {
    .example-card {
      background-color: #fff;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 25px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .code-block {
        background-color: #f8fafc;
        border-radius: 4px;
        margin-bottom: 15px;
        border: 1px solid #e2e8f0;
        overflow-x: auto;

        pre {
          margin: 0;
          padding: 12px 15px;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            color: #0f172a;
          }
        }
      }

      .result {
        background-color: #f0fdf4;
        border-radius: 4px;
        padding: 12px 15px;
        border: 1px solid #dcfce7;

        p {
          margin: 5px 0;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #15803d;
        }
      }
    }
  }

  .solutions {
    .solutions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .solution-card {
      background-color: #fff;
      border-radius: 6px;
      padding: 18px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: #1e293b;
        font-size: 1.1rem;
      }

      pre {
        background-color: #f8fafc;
        border-radius: 4px;
        padding: 10px 12px;
        margin: 10px 0 0 0;
        border: 1px solid #e2e8f0;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          color: #0f172a;
        }
      }
    }
  }
}

footer.footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .main-content .solutions .solutions-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.5rem;
  }
}
</style>
