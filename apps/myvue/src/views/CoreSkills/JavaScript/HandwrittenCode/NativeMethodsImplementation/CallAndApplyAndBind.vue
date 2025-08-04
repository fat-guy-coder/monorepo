<template>
  <div class="function-container">
    <!-- 标题 -->
    <header class="header">
      <h1 class="title">JS核心方法实现原理</h1>
      <p class="subtitle">call/apply/bind 三兄弟实现解析</p>
    </header>

    <!-- 实现思路介绍 -->
    <section class="method-grid">
      <h2 class="section-title">实现思路解析</h2>

      <div class="concept-cards">
        <div class="concept-card">
          <h3>核心原理</h3>
          <p><b>利用对象的方法调用会将this指向该对象的特性,通过在目标对象上临时添加方法并调用来改变this指向。</b></p>
        </div>

        <div class="concept-card">
          <h3>基本步骤</h3>
          <ul>
            <li>将函数作为目标对象的临时属性</li>
            <li>执行该临时方法并传入参数</li>
            <li>删除临时属性</li>
            <li>返回执行结果</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>三者区别</h3>
          <ul>
            <li>call: 参数列表形式传入</li>
            <li>apply: 数组形式传入参数</li>
            <li>bind: 返回绑定this的新函数</li>
          </ul>
        </div>
      </div>

      <div class="implementation-notes">
        <h3>📝 实现要点</h3>
        <ul>
          <li>使用Symbol作为临时属性键,避免属性名冲突</li>
          <li>处理context为null/undefined的情况,默认绑定到全局对象</li>
          <li>bind需要考虑new调用的情况,保留原型链</li>
        </ul>
      </div>
    </section>

    <!-- 方法对比表格 -->
    <div class="method-grid">
      <!-- call 实现 -->
      <div class="method-card">
        <h2 class="method-title">call 方法实现</h2>
        <div class="comparison">
          <div class="native">
            <h3>原生用法</h3>
            <pre class="code">fn.call(context, arg1, arg2)</pre>
          </div>
          <div class="custom">
            <h3>自定义实现</h3>
            <pre class="code">function myCall(context, ...args) {
  context = context || globalThis
  const key = Symbol('tempKey')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}</pre>
          </div>
        </div>
      </div>

      <!-- apply 实现 -->
      <div class="method-card">
        <h2 class="method-title">apply 方法实现</h2>
        <div class="comparison">
          <div class="native">
            <h3>原生用法</h3>
            <pre class="code">fn.apply(context, [arg1, arg2])</pre>
          </div>
          <div class="custom">
            <h3>自定义实现</h3>
            <pre class="code">function myApply(context, argsArray) {
  context = context || globalThis
  const key = Symbol('tempKey')
  context[key] = this
  const result = context[key](...argsArray)
  delete context[key]
  return result
}</pre>
          </div>
        </div>
      </div>

      <!-- bind 实现 -->
      <div class="method-card">
        <h2 class="method-title">bind 方法实现</h2>
        <div class="comparison">
          <div class="native">
            <h3>原生用法</h3>
            <pre class="code">const boundFn = fn.bind(context, arg1)</pre>
          </div>
          <div class="custom">
            <h3>自定义实现</h3>
            <pre class="code">function myBind(context, ...bindArgs) {
  const self = this
  return function(...args) {
    return self.apply(context, bindArgs.concat(args))
  }
}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 实现原理说明 -->
    <div class="principle-section">
      <h2 class="section-title">核心实现原理</h2>
      <div class="principle-grid">
        <div class="principle-card" v-for="(item, index) in principles" :key="index">
          <div class="step">{{ index + 1 }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- 代码注释说明 -->
    <div class="annotation-section">
      <h2 class="section-title">关键代码注释</h2>
      <pre class="annotated-code">function myCall(context, ...args) {
  // 1. 处理上下文边界情况
  context = context || globalThis

  // 2. 创建唯一临时属性避免污染
  const key = Symbol('tempKey')

  // 3. 将当前函数绑定到上下文
  context[key] = this

  // 4. 执行函数并保存结果
  const result = context[key](...args)

  // 5. 清理临时属性
  delete context[key]

  // 6. 返回执行结果
  return result
}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const principles = [
  {
    title: "上下文绑定",
    description: "通过将函数赋值给上下文对象的临时属性来实现this绑定"
  },
  {
    title: "参数处理",
    description: "使用剩余参数和展开运算符处理不同传参方式"
  },
  {
    title: "内存管理",
    description: "使用Symbol作为属性键名避免命名冲突，执行后立即删除"
  },
  {
    title: "函数柯里化",
    description: "bind通过闭包保存绑定参数实现柯里化效果"
  }
] as const;
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #3498db;
@accent-color: #e74c3c;
@bg-color: #f8f9fa;

.function-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Fira Code', monospace;

  .header {
    text-align: center;
    margin-bottom: 3rem;

    .title {
      font-size: 2.5rem;
      color: @primary-color;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      color: lighten(@primary-color, 20%);
      font-size: 1.2rem;
    }
  }

  .method-grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 3rem;

    .method-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .method-title {
        color: @secondary-color;
        border-left: 4px solid @secondary-color;
        padding-left: 1rem;
        margin-bottom: 1.5rem;
      }

      .comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;

        .native,
        .custom {
          pre.code {
            background: lighten(@primary-color, 70%);
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
          }
        }

        .custom pre {
          position: relative;

          &::before {
            content: '⭐ 实现要点';
            position: absolute;
            top: -12px;
            left: 10px;
            background: white;
            padding: 0 5px;
            color: @accent-color;
            font-size: 0.8em;
          }
        }
      }
    }
  }

  .principle-section {
    background: @bg-color;
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;

    .principle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .principle-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        position: relative;

        .step {
          position: absolute;
          top: -15px;
          left: -15px;
          width: 30px;
          height: 30px;
          background: @secondary-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      }
    }
  }

  .annotation-section {
    pre.annotated-code {
      background: #282c34;
      color: #abb2bf;
      padding: 1.5rem;
      border-radius: 8px;
      position: relative;
      counter-reset: line;

      &::before {
        content: '// 注释解析';
        position: absolute;
        top: -18px;
        left: 10px;
        background: #282c34;
        padding: 0 5px;
        color: #e06c75;
      }

      // 模拟代码行号
      span {
        display: block;

        &::before {
          content: counter(line);
          counter-increment: line;
          margin-right: 1em;
          color: #5c6370;
        }
      }
    }
  }
}
</style>
