<template>
  <div class="deep-clone-docs">
    <header class="header-section">
      <h1>深拷贝实现手册</h1>
    </header>

    <div class="content-container">
      <!-- 实现代码 -->
      <section class="code-section">
        <h2><span class="icon">🔧</span> 手动实现代码</h2>
        <div class="code-container">
          <pre class="code-block"><code class="typescript">/**
 * 深拷贝函数（支持对象/数组/日期/正则等）
 * @param target 需要拷贝的目标
 * @param map WeakMap用于存储已拷贝对象（解决循环引用）
 * @returns 深拷贝后的新对象
 */
function deepClone&lt;T extends unknown&gt;(
  target: T,
  map = new WeakMap&lt;object, unknown&gt;()
): T {
  // 1. 处理基本类型和函数
  if (typeof target !== 'object' || target === null) {
    return target
  }

  // 2. 处理循环引用
  if (map.has(target)) {
    return map.get(target) as T
  }

  // 3. 处理特殊对象类型
  // 日期对象
  if (target instanceof Date) {
    return new Date(target) as T
  }
  // 正则对象
  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags) as T
  }

  // 4. 初始化克隆对象
  const cloneTarget: any = Array.isArray(target) ? [] : {}

  // 5. 存储当前对象防止循环引用
  map.set(target, cloneTarget)

  // 6. 递归拷贝所有属性
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }

  // 7. 处理Symbol类型属性
  const symbolKeys = Object.getOwnPropertySymbols(target)
  for (const symKey of symbolKeys) {
    cloneTarget[symKey] = deepClone(target[symKey], map)
  }

  return cloneTarget
}</code></pre>

        </div>
      </section>

      <!-- 功能特性 -->
      <section class="feature-section">
        <h2><span class="icon">✨</span> 功能特性</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>支持类型</h3>
            <ul>
              <li>普通对象</li>
              <li>数组</li>
              <li>Date/RegExp</li>
              <li>循环引用</li>
            </ul>
          </div>
          <div class="feature-card">
            <h3>特殊处理</h3>
            <ul>
              <li>Symbol属性</li>
              <li>原型链继承</li>
              <li>不可枚举属性</li>
              <li>保持对象特性</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <h2><span class="icon">🎯</span> 使用场景</h2>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>数据隔离</h3>
            <ul>
              <li>表单对象拷贝</li>
              <li>状态管理快照</li>
              <li>配置项复用</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>特殊需求</h3>
            <ul>
              <li>不可变数据操作</li>
              <li>复杂对象存储</li>
              <li>数据比较/差异检测</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.deep-clone-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.header-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 1rem;
  color: white;
  margin-bottom: 2rem;
}

.visual-guide {
  margin: 2rem 0;
}

.data-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.original-box,
.cloned-box {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  min-height: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.arrow {
  font-size: 2rem;
  color: white;
}

.code-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin: 1rem 0;
}

.code-block {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

.demo-box {
  margin-top: 1rem;
}

button {
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0 0.5rem;
}

button:hover {
  background: #2980b9;
}

.result-box {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.result-item {
  flex: 1;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .data-flow {
    flex-direction: column;
  }

  .result-box {
    flex-direction: column;
  }
}
</style>
