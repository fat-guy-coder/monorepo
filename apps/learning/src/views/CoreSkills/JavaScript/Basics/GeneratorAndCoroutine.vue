<template>
  <div class="generator-guide">
    <h1 class="title">JavaScript 生成器与协程</h1>
    <h4>这为进阶知识铺垫，可先了解，后续再深入。<a @click="handleClick">ES6 生成器</a></h4>

    <!-- 概念介绍 -->
    <section class="card concept-section">
      <h2>🎯 核心概念</h2>

      <div class="concept-item">
        <h3>1. 生成器 (Generator)</h3>
        <p>生成器是 ES6 引入的特殊函数：</p>
        <ul>
          <li>通过 <code>function*</code> 语法定义</li>
          <li>使用 <code>yield</code> 暂停执行</li>
          <li>通过 <code>next()</code> 恢复执行</li>
          <li>实现迭代器协议</li>
        </ul>
      </div>

      <div class="concept-item">
        <h3>2. 协程 (Coroutine)</h3>
        <p>协程的更高级抽象：</p>
        <ul>
          <li>协作式多任务处理</li>
          <li>可暂停和恢复的执行上下文</li>
          <li>生成器是协程的轻量级实现</li>
          <li>适用于状态管理和异步流程控制</li>
        </ul>
      </div>
    </section>

    <!-- 生成器基础介绍 -->
    <section class="card generator-section">
      <h2>🛠 生成器用法示例</h2>

      <div class="code-group">
        <div class="code-item">
          <h3>基本结构</h3>
          <pre><code>{{ codeBasic }}</code></pre>
        </div>

        <div class="code-item">
          <h3>控制流程</h3>
          <pre><code>{{ codeFlow }}</code></pre>
        </div>

        <div class="code-item">
          <h3>无限序列</h3>
          <pre><code>{{ codeInfinite }}</code></pre>
        </div>

        <div class="code-item">
          <h3>协程实现</h3>
          <pre><code>{{ codeCoroutine }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="card usage-section">
      <h2>💡 应用场景</h2>

      <div class="usage-grid">
        <div class="usage-card">
          <h3>🔄 惰性计算</h3>
          <p>按需生成数据序列，节省内存</p>
        </div>

        <div class="usage-card">
          <h3>⏳ 状态管理</h3>
          <p>封装复杂的状态转换逻辑</p>
        </div>

        <div class="usage-card">
          <h3>🌀 异步流程</h3>
          <p>配合Promise实现类async/await效果</p>
        </div>

        <div class="usage-card">
          <h3>🎮 游戏循环</h3>
          <p>管理游戏实体状态机</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 示例代码
const codeBasic = `function* simpleGenerator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = simpleGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: true }`;

const codeFlow = `function* flowControl() {
  const user = yield getUser();
  const posts = yield getPosts(user.id);
  return processData(posts);
}

const runner = flowControl();
runner.next().value.then(user =>
  runner.next(user).value.then(posts =>
    runner.next(posts)
  )
)`;

const codeInfinite = `function* idGenerator() {
  let id = 1;
  while(true) {
    yield id++;
  }
}

const idMaker = idGenerator();
idMaker.next().value; // 1
idMaker.next().value; // 2`;

const codeCoroutine = `function* coroutine() {
  let result = yield;
  while(true) {
    result = yield process(result);
  }
}

const co = coroutine();
co.next(); // 启动
co.next(42); // 传递值
co.next(100); // 继续处理`;

const emit = defineEmits(['goToByRouteName'])

const handleClick = () => {
  emit('goToByRouteName', 'Generator')
}
</script>

<style lang="less">
@primary-color: #2c3e50;
@accent-color: #3498db;
@code-bg: #f8f9fa;

.generator-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .title {
    color: @primary-color;
    text-align: center;
    margin-bottom: 2rem;
  }

  .card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    h2 {
      color: @accent-color;
      border-bottom: 2px solid #eee;
      padding-bottom: 0.8rem;
      margin-bottom: 1.5rem;
    }
  }

  .concept-item {
    margin: 1.5rem 0;
    padding: 1rem;
    background: lighten(@code-bg, 3%);
    border-radius: 6px;

    h3 {
      color: darken(@primary-color, 10%);
      margin-bottom: 0.8rem;
    }

    ul {
      padding-left: 1.5rem;
      line-height: 1.6;

      li {
        margin: 0.5rem 0;

        &::marker {
          color: @accent-color;
        }
      }
    }
  }

  .code-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .code-item {
      background: @code-bg;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;

      h3 {
        color: darken(@accent-color, 10%);
        margin-bottom: 0.5rem;
      }

      pre {
        margin: 0;

        code {
          font-family: 'SFMono-Regular', Consolas, monospace;
          font-size: 0.9em;
        }
      }
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .usage-card {
      padding: 1.2rem;
      background: lighten(@accent-color, 35%);
      border-radius: 8px;
      transition: transform 0.2s;

      h3 {
        color: darken(@accent-color, 15%);
        margin-bottom: 0.5rem;
      }

      &:hover {
        transform: translateY(-3px);
      }
    }
  }
}
</style>
