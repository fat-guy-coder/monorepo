<template>
  <div class="debounce-throttle-docs">
    <header class="header-section">
      <h1>防抖与节流实现手册</h1>
      <div class="visual-guide">
        <div class="function-card debounce-card">
          <div class="animation-bar"></div>
          <h3>防抖函数</h3>
          <p>多次触发只执行最后一次</p>
        </div>
        <div class="function-card throttle-card">
          <div class="animation-bar"></div>
          <h3>节流函数</h3>
          <p>固定间隔执行一次</p>
        </div>
      </div>
    </header>

    <h2>防抖与节流实际上是使用了闭包的存储变量的特性</h2>

    <div class="content-container">
      <!-- 防抖实现 -->
      <section class="code-section">
        <h2><span class="icon">🛡️</span> 防抖函数（Debounce）</h2>
        <h3>
          <p>防抖函数的原理是通过延迟执行来减少函数的调用频率。它会在事件触发后等待一定的时间，如果在这段时间内再次触发事件，则重新计时。这样可以确保在高频率的事件触发中，只在最后一次触发后执行函数。</p>
          <h4>使用场景</h4>
          <ul>
            <li>输入框搜索联想</li>
            <li>窗口大小调整</li>
            <li>表单提交</li>
          </ul>
        </h3>
        <div class="code-container">
          <pre class="code-block"><code class="typescript">/**
 * 防抖函数实现
 * @param fn 需要防抖的函数
 * @param delay 延迟时间(毫秒)
 * @param immediate 是否立即执行
 * @returns 包装后的防抖函数
 */
function debounce&lt;T extends (...args: any[]) => any&gt;(
  fn: T,
  delay: number,
  immediate = false
): (...args: Parameters&lt;T&gt;) => void {
  let timer: number | null = null

  return function (this: any, ...args: Parameters&lt;T&gt;) {
    // 清除之前的定时器
    if (timer) clearTimeout(timer)

    // 立即执行模式
    if (immediate && !timer) {
      fn.apply(this, args)
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, args)
      }
      timer = null
    }, delay)
  }
}</code></pre>
          <div class="demo-box">
            <button @click="handleDebounceClick">点击测试防抖</button>
            <div class="counter">触发次数: {{ debounceCount }}</div>
          </div>
        </div>
      </section>

      <!-- 节流实现 -->
      <section class="code-section">
        <h2><span class="icon">⏱️</span> 节流函数（Throttle）</h2>
        <h3>
          节流函数的实现原理是通过限制函数的执行频率来提高性能，尤其是在频繁触发的事件（如滚动、窗口调整大小等）中。其基本思路是：在一定时间内，只允许函数执行一次。
        </h3>
        <h4>
          <ul>
            <li> 时间戳记录：记录上次执行的时间。</li>
            <li>判断时间间隔：每次触发事件时，检查当前时间与上次执行时间的间隔。</li>
            <li>执行函数：如果间隔超过设定的阈值，则执行函数并更新上次执行时间。</li>
          </ul>
        </h4>
        <div class="code-container">
          <pre class="code-block"><code class="typescript">/**
 * 节流函数实现
 * @param fn 需要节流的函数
 * @param interval 执行间隔(毫秒)
 * @returns 包装后的节流函数
 */
function throttle&lt;T extends (...args: any[]) => any&gt;(
  fn: T,
  interval: number
): (...args: Parameters&lt;T&gt;) => void {
  let lastTime = 0
  let timer: number | null = null

  return function (this: any, ...args: Parameters&lt;T&gt;) {
    const now = Date.now()

    // 剩余时间计算
    const remaining = interval - (now - lastTime)

    if (remaining <= 0) {
      // 首次立即执行
      if (timer) clearTimeout(timer)
      fn.apply(this, args)
      lastTime = now
    } else if (!timer) {
      // 设置定时器保证最后一次执行
      timer = setTimeout(() => {
        fn.apply(this, args)
        lastTime = Date.now()
        timer = null
      }, remaining)
    }
  }
}</code></pre>
          <div class="demo-box">
            <div class="scroll-area" @scroll="handleThrottleScroll">
              <div class="scroll-inner">滚动区域（节流演示）</div>
            </div>
            <div class="counter">触发次数: {{ throttleCount }}</div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <h2><span class="icon">🎯</span> 使用场景</h2>
        <div class="scenario-grid">
          <div class="scenario-card">
            <h3>防抖适用场景</h3>
            <ul>
              <li>搜索框输入联想</li>
              <li>窗口大小调整</li>
              <li>文本编辑器保存</li>
            </ul>
          </div>
          <div class="scenario-card">
            <h3>节流适用场景</h3>
            <ul>
              <li>页面滚动加载</li>
              <li>鼠标移动事件</li>
              <li>游戏中的射击频率</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue'
import { debounce, throttle } from '@/Function/CommonFun'

// 防抖演示
const debounceCount = ref(0)
const handleDebounceClick = debounce(() => {
  debounceCount.value++
}, 500)

// 节流演示
const throttleCount = ref(0)
const handleThrottleScroll = throttle(() => {
  throttleCount.value++
}, 1000)




</script>

<style scoped>
.debounce-throttle-docs {
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
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.function-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 300px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.animation-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: #3498db;
  animation: progress 2s infinite linear;
}

.debounce-card .animation-bar {
  animation: debounce-progress 2s infinite;
}

.throttle-card .animation-bar {
  animation: throttle-progress 2s infinite;
}

@keyframes debounce-progress {

  0%,
  80% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

@keyframes throttle-progress {
  0% {
    width: 0%;
  }

  50% {
    width: 100%;
  }

  100% {
    width: 100%;
  }
}

.code-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

button {
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2980b9;
}

.scroll-area {
  height: 150px;
  overflow-y: auto;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  text-align: center;

  .scroll-inner {
    height: 200px;
  }
}

.counter {
  font-weight: bold;
  color: #2c3e50;
}

.usage-section {
  margin-top: 2rem;
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

@media (max-width: 768px) {
  .code-container {
    grid-template-columns: 1fr;
  }

  .visual-guide {
    flex-direction: column;
    align-items: center;
  }
}
</style>
