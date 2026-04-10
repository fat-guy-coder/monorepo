<template>
  <div class="debounce-throttle">
    <header class="dt-header">
      <h1>防抖与节流性能优化</h1>
      <p class="subtitle">控制高频事件调用的核心技术</p>
      <div class="dt-stats">
        <div class="stat">
          <div class="stat-value">70-90%</div>
          <div class="stat-label">减少不必要计算</div>
        </div>
        <div class="stat">
          <div class="stat-value">5-10x</div>
          <div class="stat-label">性能提升倍数</div>
        </div>
      </div>
    </header>

    <div class="dt-content">
      <section class="concept-section">
        <h2>核心概念</h2>
        <div class="concept-cards">
          <div class="concept-card debounce">
            <h3>防抖 (Debounce)</h3>
            <p>事件触发后延迟执行，若在延迟时间内再次触发则重新计时</p>
            <div class="visual">
              <div class="event">触发</div>
              <div class="timeline">
                <div class="delay"></div>
                <div class="execution">执行</div>
              </div>
              <div class="event">重新触发</div>
              <div class="timeline">
                <div class="delay"></div>
                <div class="execution">执行</div>
              </div>
            </div>
            <p class="use-case">适用场景：输入框搜索、窗口大小调整</p>
          </div>

          <div class="concept-card throttle">
            <h3>节流 (Throttle)</h3>
            <p>固定时间间隔内只执行一次，稀释事件执行频率</p>
            <div class="visual">
              <div class="event">触发</div>
              <div class="timeline">
                <div class="execution">执行</div>
                <div class="delay"></div>
              </div>
              <div class="event">触发</div>
              <div class="timeline">
                <div class="ignored">忽略</div>
                <div class="delay"></div>
              </div>
              <div class="event">触发</div>
              <div class="timeline">
                <div class="execution">执行</div>
                <div class="delay"></div>
              </div>
            </div>
            <p class="use-case">适用场景：滚动事件、鼠标移动</p>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2>实现原理与代码</h2>
        <div class="implementation-cards">
          <div class="code-card">
            <h3>防抖实现</h3>
            <pre><code>function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    // 清除之前的定时器
    clearTimeout(timer);
    // 设置新的定时器
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用示例
const searchInput = document.getElementById('search');
searchInput.addEventListener('input',
  debounce(function() {
    console.log('发送搜索请求');
  }, 500)
);</code></pre>
          </div>

          <div class="code-card">
            <h3>节流实现</h3>
            <pre><code>function throttle(func, interval) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();
    // 判断是否达到执行时间间隔
    if (now - lastTime >= interval) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

// 使用示例
window.addEventListener('scroll',
  throttle(function() {
    console.log('处理滚动事件');
  }, 200)
);</code></pre>
          </div>
        </div>
      </section>

      <section class="vue-section">
        <h2>在Vue中的使用</h2>
        <div class="vue-examples">
          <div class="example-card">
            <h3>组合式API (Composition API)</h3>
            <pre><code>import { ref, onMounted, onUnmounted } from 'vue';

export function useDebounce(fn, delay) {
  let timeout = null;

  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 在组件中使用
const searchText = ref('');
const debouncedSearch = useDebounce(() => {
  console.log('搜索:', searchText.value);
}, 500);</code></pre>
          </div>

          <div class="example-card">
            <h3>模板中使用</h3>
            <pre><code>&lt;template&gt;
  &lt;input
    v-model="searchText"
    @input="debouncedSearch"
    placeholder="输入搜索内容..."
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { useDebounce } from './useDebounce';

const searchText = ref('');
const debouncedSearch = useDebounce(() => {
  console.log('搜索:', searchText.value);
}, 500);
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>防抖与节流对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>防抖 (Debounce)</th>
                <th>节流 (Throttle)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>执行时机</td>
                <td>停止触发后延迟执行</td>
                <td>固定间隔执行一次</td>
              </tr>
              <tr>
                <td>适用场景</td>
                <td>输入验证、搜索建议</td>
                <td>滚动事件、鼠标移动</td>
              </tr>
              <tr>
                <td>实现方式</td>
                <td>setTimeout + clearTimeout</td>
                <td>时间戳比较</td>
              </tr>
              <tr>
                <td>执行次数</td>
                <td>最后一次触发有效</td>
                <td>间隔内至少执行一次</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="best-practice-section">
        <h2>最佳实践</h2>
        <div class="practice-tips">
          <div class="tip">
            <div class="tip-icon">⏱️</div>
            <h3>合理设置延迟时间</h3>
            <ul>
              <li>防抖：200-500ms (搜索场景)</li>
              <li>节流：16-100ms (动画场景)</li>
            </ul>
          </div>

          <div class="tip">
            <div class="tip-icon">🔧</div>
            <h3>取消机制</h3>
            <ul>
              <li>防抖：提供cancel方法取消延迟执行</li>
              <li>节流：提供flush方法立即执行</li>
            </ul>
          </div>

          <div class="tip">
            <div class="tip-icon">⚡</div>
            <h3>性能优化</h3>
            <ul>
              <li>避免在频繁触发的事件中使用复杂逻辑</li>
              <li>结合requestAnimationFrame优化动画</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="dt-footer">
      <p> 前端性能优化指南 | 防抖与节流</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const delayTimes = ref({
  debounce: 500,
  throttle: 200
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@debounce-color: #e74c3c;
@throttle-color: #9b59b6;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;

.debounce-throttle {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.dt-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
}

.dt-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .stat {
    background: rgba(255, 255, 255, 0.15);
    padding: 1rem 1.8rem;
    border-radius: 8px;
    backdrop-filter: blur(5px);

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }

  p {
    margin: 0.8rem 0;
  }

  &.debounce {
    border-top: 4px solid @debounce-color;
  }

  &.throttle {
    border-top: 4px solid @throttle-color;
  }
}

.visual {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.event {
  background: @background-light;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.timeline {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

.delay {
  width: 40px;
  height: 2px;
  background: @accent-color;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent @accent-color;
  }
}

.execution {
  background: @accent-color;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.ignored {
  background: lighten(@text-color, 60%);
  color: @text-color;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.use-case {
  font-size: 0.9rem;
  color: lighten(@text-color, 20%);
  font-style: italic;
}

.implementation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.code-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

pre {
  margin: 1rem 0 0;
  background: @code-bg;
  color: @code-color;
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;

  code {
    display: block;
    line-height: 1.5;

    .comment {
      color: #75715e;
    }

    .keyword {
      color: #f92672;
    }

    .string {
      color: #a6e22e;
    }

    .function {
      color: #66d9ef;
    }
  }
}

.vue-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

.comparison-table {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @background-light;
      font-weight: 600;
      color: @secondary-color;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background: lighten(@background-light, 1%);
    }
  }
}

.practice-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tip {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .tip-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: @primary-color;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.dt-footer {
  text-align: center;
  padding: 2rem 0;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .dt-header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .concept-cards,
  .implementation-cards,
  .vue-examples {
    grid-template-columns: 1fr;
  }
}
</style>
