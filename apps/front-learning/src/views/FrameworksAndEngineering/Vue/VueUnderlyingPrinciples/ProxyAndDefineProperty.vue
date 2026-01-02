<template>
  <div class="proxy-container">
    <header class="header">
      <div class="header-content">
        <h1>Proxy vs defineProperty</h1>
        <p>深入理解 Vue3 响应式系统的核心变革</p>
      </div>
      <div class="header-graphic">
        <div class="proxy-graphic"></div>
        <div class="defineproperty-graphic"></div>
      </div>
    </header>

    <div class="content">
      <!-- 基础概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">🧠</div>
          <h2>核心概念解析</h2>
        </div>

        <div class="concept-cards">
          <div class="concept-card defineproperty">
            <div class="card-header">
              <div class="card-icon">🔄</div>
              <h3>Object.defineProperty</h3>
            </div>
            <div class="card-content">
              <p>Vue2 使用的响应式基础，通过定义对象属性的 getter/setter 来实现数据监听。</p>
              <ul>
                <li>ES5 标准（2009年）</li>
                <li>只能劫持对象的<strong>已有属性</strong></li>
                <li>需要递归遍历对象所有属性</li>
                <li>数组方法需要特殊处理</li>
              </ul>
            </div>
          </div>

          <div class="concept-card proxy">
            <div class="card-header">
              <div class="card-icon">⚡</div>
              <h3>Proxy</h3>
            </div>
            <div class="card-content">
              <p>Vue3 采用的响应式基础，创建一个对象的代理，拦截对象的基本操作。</p>
              <ul>
                <li>ES6 标准（2015年）</li>
                <li>劫持<strong>整个对象</strong>，而非单个属性</li>
                <li>支持数组索引和长度变化</li>
                <li>支持 Map、Set 等新数据结构</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术对比部分 -->
      <section class="comparison-section">
        <div class="section-header">
          <div class="section-icon">⚖️</div>
          <h2>技术实现对比</h2>
        </div>

        <div class="comparison-grid">
          <div class="comparison-header">
            <h3>对比维度</h3>
            <div class="tech defineproperty">defineProperty</div>
            <div class="tech proxy">Proxy</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">劫持范围</div>
            <div class="value defineproperty">仅能劫持对象属性</div>
            <div class="value proxy">劫持整个对象</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">数组支持</div>
            <div class="value defineproperty">需要重写数组方法</div>
            <div class="value proxy">原生支持数组操作</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">新增属性</div>
            <div class="value defineproperty">需要 Vue.set</div>
            <div class="value proxy">自动检测新属性</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">数据结构</div>
            <div class="value defineproperty">仅支持对象</div>
            <div class="value proxy">支持 Map、Set 等</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">性能</div>
            <div class="value defineproperty">初始化时递归遍历慢</div>
            <div class="value proxy">按需劫持，初始化快</div>
          </div>

          <div class="comparison-row">
            <div class="dimension">删除属性</div>
            <div class="value defineproperty">需要 Vue.delete</div>
            <div class="value proxy">自动检测删除操作</div>
          </div>
        </div>
      </section>

      <!-- 代码示例部分 -->
      <section class="code-section">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>代码实现对比</h2>
        </div>

        <div class="code-comparison">
          <div class="code-block defineproperty">
            <div class="code-header">
              <h3>defineProperty 实现</h3>
              <div class="tag">Vue2 响应式核心</div>
            </div>
            <pre><code>function defineReactive(obj, key) {
  let value = obj[key];

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`读取 ${key}: ${value}`);
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      console.log(`设置 ${key}: ${newVal}`);
      value = newVal;
    }
  });
}

// 只能监听已有属性
const data = { count: 0 };
defineReactive(data, 'count');

data.count++; // 触发 set
data.newProp = 'test'; // 无法监听</code></pre>
          </div>

          <div class="code-block proxy">
            <div class="code-header">
              <h3>Proxy 实现</h3>
              <div class="tag">Vue3 响应式核心</div>
            </div>
            <pre><code>function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`读取 ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`设置 ${key}: ${value}`);
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      console.log(`删除 ${key}`);
      return Reflect.deleteProperty(target, key);
    }
  });
}

// 监听整个对象
const data = reactive({ count: 0 });

data.count++; // 触发 set
data.newProp = 'test'; // 触发 set
delete data.count; // 触发 delete</code></pre>
          </div>
        </div>
      </section>

      <!-- 性能对比部分 -->
      <section class="performance-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>性能对比分析</h2>
        </div>

        <div class="performance-chart">
          <div class="chart-bar defineproperty" style="height: 60%">
            <div class="bar-label">初始化时间</div>
            <div class="bar-value">100%</div>
          </div>
          <div class="chart-bar proxy" style="height: 20%">
            <div class="bar-label">初始化时间</div>
            <div class="bar-value">20%</div>
          </div>

          <div class="chart-bar defineproperty" style="height: 80%">
            <div class="bar-label">内存占用</div>
            <div class="bar-value">100%</div>
          </div>
          <div class="chart-bar proxy" style="height: 60%">
            <div class="bar-label">内存占用</div>
            <div class="bar-value">60%</div>
          </div>

          <div class="chart-bar defineproperty" style="height: 70%">
            <div class="bar-label">读取速度</div>
            <div class="bar-value">100%</div>
          </div>
          <div class="chart-bar proxy" style="height: 90%">
            <div class="bar-label">读取速度</div>
            <div class="bar-value">130%</div>
          </div>
        </div>

        <div class="performance-notes">
          <div class="note">
            <h4>初始化性能</h4>
            <p>Proxy 在初始化大型对象时优势明显，因为不需要递归遍历所有属性</p>
          </div>
          <div class="note">
            <h4>内存占用</h4>
            <p>Proxy 不需要为每个属性创建闭包，内存占用更低</p>
          </div>
          <div class="note">
            <h4>读取速度</h4>
            <p>Proxy 的 get 拦截器性能优于 defineProperty 的 getter</p>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="section-icon">🔍</div>
          <h2>适用场景分析</h2>
        </div>

        <div class="scenarios-cards">
          <div class="scenario-card defineproperty">
            <h3>defineProperty 适用场景</h3>
            <ul>
              <li>需要支持 IE11 的 Vue2 项目</li>
              <li>对象属性固定的简单应用</li>
              <li>不需要动态增删属性的场景</li>
              <li>不需要处理 Map/Set 等数据结构</li>
            </ul>
          </div>

          <div class="scenario-card proxy">
            <h3>Proxy 适用场景</h3>
            <ul>
              <li>现代浏览器环境下的 Vue3 项目</li>
              <li>需要处理动态数据结构的应用</li>
              <li>大型复杂对象和数组操作</li>
              <li>需要高性能响应的应用</li>
              <li>使用 Map/Set/WeakMap 等数据结构</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 总结部分 -->
      <section class="summary-section">
        <div class="section-header">
          <div class="section-icon">🎯</div>
          <h2>技术总结</h2>
        </div>

        <div class="summary-content">
          <div class="upgrade-path">
            <div class="step">Vue2 defineProperty</div>
            <div class="arrow">→</div>
            <div class="step">初始化递归遍历</div>
            <div class="arrow">→</div>
            <div class="step">数组方法重写</div>
            <div class="arrow">→</div>
            <div class="step">Vue.set/delete</div>
          </div>

          <div class="upgrade-path">
            <div class="step">Vue3 Proxy</div>
            <div class="arrow">→</div>
            <div class="step">按需劫持</div>
            <div class="arrow">→</div>
            <div class="step">原生数组支持</div>
            <div class="arrow">→</div>
            <div class="step">自动检测变化</div>
          </div>

          <div class="conclusion">
            <p>Vue3 使用 Proxy 重构响应式系统带来了显著的性能提升和更强大的功能：</p>
            <ul>
              <li>初始化速度提升 <strong>40%</strong></li>
              <li>内存占用减少 <strong>50%</strong></li>
              <li>支持动态属性增删</li>
              <li>更好的 TypeScript 集成</li>
              <li>更简洁的 API 设计</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p> Vue响应式系统研究 | Proxy与defineProperty对比分析</p>
      <p>理解底层原理，编写更高效的Vue应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 这里可以添加交互逻辑
const activeSection = ref('concept');
</script>

<style lang="less" scoped>


:root {
  --defineproperty-color: #5c6bc0;
  --proxy-color: #42b883;
  --background-dark: #1a1c23;
  --background-light: #252833;
  --text-primary: #e6e9f0;
  --text-secondary: #a0a8c3;
  --card-bg: #2d3039;
  --card-border: #3a3e4a;
  --header-height: 280px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-dark);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.proxy-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--background-dark);
  min-height: 100vh;
}

.header {
  height: var(--header-height);
  background: linear-gradient(135deg, #16181d, #1f2229);
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2f3340;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--defineproperty-color), var(--proxy-color));
    z-index: 1;
  }

  .header-content {
    z-index: 2;
    max-width: 50%;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--text-primary), #a0a8c3);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      color: var(--text-secondary);
      max-width: 80%;
    }
  }

  .header-graphic {
    position: relative;
    width: 45%;
    height: 200px;
    display: flex;
    gap: 2rem;

    .proxy-graphic,
    .defineproperty-graphic {
      flex: 1;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .proxy-graphic {
      background: linear-gradient(45deg, #1a3b2d, #42b883);
      border: 2px solid rgba(66, 184, 131, 0.3);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(circle at 30% 30%, rgba(66, 184, 131, 0.2) 0%, transparent 60%),
          radial-gradient(circle at 70% 70%, rgba(66, 184, 131, 0.2) 0%, transparent 60%);
      }

      &::after {
        content: 'Proxy';
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
      }
    }

    .defineproperty-graphic {
      background: linear-gradient(45deg, #2c2b5a, #5c6bc0);
      border: 2px solid rgba(92, 107, 192, 0.3);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          linear-gradient(135deg, transparent 49%, rgba(92, 107, 192, 0.2) 50%, transparent 51%),
          linear-gradient(45deg, transparent 49%, rgba(92, 107, 192, 0.2) 50%, transparent 51%);
        background-size: 20px 20px;
      }

      &::after {
        content: 'defineProperty';
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
      }
    }
  }
}

.content {
  padding: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--card-border);

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  .section-icon {
    font-size: 2rem;
    background: var(--card-bg);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 概念卡片样式 */
.concept-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.concept-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &.defineproperty {
    border-top: 4px solid var(--defineproperty-color);
  }

  &.proxy {
    border-top: 4px solid var(--proxy-color);
  }

  .card-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--card-border);

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .card-icon {
      font-size: 1.8rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .defineproperty .card-header .card-icon {
    background: rgba(92, 107, 192, 0.2);
    color: var(--defineproperty-color);
  }

  .proxy .card-header .card-icon {
    background: rgba(66, 184, 131, 0.2);
    color: var(--proxy-color);
  }

  .card-content {
    padding: 1.5rem;

    p {
      margin-bottom: 1rem;
      color: var(--text-secondary);
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        position: relative;

        &::before {
          content: "•";
          color: var(--proxy-color);
          position: absolute;
          left: -1rem;
        }
      }
    }
  }

  .defineproperty .card-content ul li::before {
    color: var(--defineproperty-color);
  }
}

/* 对比表格样式 */
.comparison-grid {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--card-border);
  margin-bottom: 3rem;

  .comparison-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid var(--card-border);

    h3 {
      font-weight: 600;
    }

    .tech {
      text-align: center;
      font-weight: 600;
      padding: 0.5rem;
      border-radius: 6px;

      &.defineproperty {
        background: rgba(92, 107, 192, 0.1);
        color: var(--defineproperty-color);
      }

      &.proxy {
        background: rgba(66, 184, 131, 0.1);
        color: var(--proxy-color);
      }
    }
  }

  .comparison-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1.5rem;
    border-bottom: 1px solid var(--card-border);

    &:last-child {
      border-bottom: none;
    }

    .dimension {
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    .value {
      padding: 0.8rem;
      border-radius: 6px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &.defineproperty {
        background: rgba(92, 107, 192, 0.1);
        color: var(--defineproperty-color);
      }

      &.proxy {
        background: rgba(66, 184, 131, 0.1);
        color: var(--proxy-color);
      }
    }
  }
}

/* 代码对比样式 */
.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.code-block {
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  border: 1px solid var(--card-border);

  &.defineproperty {
    .code-header {
      background: rgba(92, 107, 192, 0.1);
      border-bottom: 1px solid rgba(92, 107, 192, 0.3);
    }
  }

  &.proxy {
    .code-header {
      background: rgba(66, 184, 131, 0.1);
      border-bottom: 1px solid rgba(66, 184, 131, 0.3);
    }
  }

  .code-header {
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .tag {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
  }

  pre {
    padding: 1.5rem;
    margin: 0;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;

    code {
      display: block;
      color: #c5c8d4;

      .token.keyword {
        color: #c678dd;
      }

      .token.function {
        color: #61afef;
      }

      .token.string {
        color: #98c379;
      }

      .token.comment {
        color: #5c6370;
      }

      .token.operator {
        color: #56b6c2;
      }

      .token.punctuation {
        color: #abb2bf;
      }

      .token.number {
        color: #d19a66;
      }
    }
  }
}

/* 性能图表样式 */
.performance-section {
  margin-bottom: 3rem;
}

.performance-chart {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  height: 300px;
  margin-bottom: 2rem;

  .chart-bar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 8px 8px 0 0;
    overflow: hidden;

    .bar-label,
    .bar-value {
      text-align: center;
      padding: 0.5rem;
      font-weight: 500;
    }

    .bar-label {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .defineproperty {
    background: linear-gradient(to top, var(--defineproperty-color), #7986cb);

    .bar-value {
      background: rgba(92, 107, 192, 0.3);
    }
  }

  .proxy {
    background: linear-gradient(to top, var(--proxy-color), #66d9a0);

    .bar-value {
      background: rgba(66, 184, 131, 0.3);
    }
  }
}

.performance-notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .note {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid var(--card-border);

    h4 {
      color: var(--proxy-color);
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
    }
  }
}

/* 场景卡片样式 */
.scenarios-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.scenario-card {
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--card-border);

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }

  &.defineproperty {
    background: linear-gradient(45deg, rgba(92, 107, 192, 0.1), transparent);
    border-top: 4px solid var(--defineproperty-color);

    ul li::before {
      background: var(--defineproperty-color);
    }
  }

  &.proxy {
    background: linear-gradient(45deg, rgba(66, 184, 131, 0.1), transparent);
    border-top: 4px solid var(--proxy-color);

    ul li::before {
      background: var(--proxy-color);
    }
  }
}

/* 总结部分样式 */
.summary-section {
  margin-bottom: 3rem;
}

.summary-content {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--card-border);
}

.upgrade-path {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;

  .step {
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    text-align: center;
    flex: 1;
  }

  .arrow {
    padding: 0 1rem;
    color: var(--text-secondary);
    font-size: 1.5rem;
  }

  &:first-child .step {
    background: rgba(92, 107, 192, 0.1);
    color: var(--defineproperty-color);
  }

  &:last-child .step {
    background: rgba(66, 184, 131, 0.1);
    color: var(--proxy-color);
  }
}

.conclusion {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--card-border);

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      position: relative;
      padding-left: 2rem;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        top: 0;
        color: var(--proxy-color);
        font-weight: bold;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--card-border);
  margin-top: 2rem;

  p {
    color: var(--text-secondary);

    &:first-child {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
  }
}

/* 响应式设计 */
@media (max-width: 900px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
    text-align: center;

    .header-content {
      max-width: 100%;
      margin-bottom: 2rem;

      p {
        max-width: 100%;
      }
    }

    .header-graphic {
      width: 100%;
    }
  }

  .concept-cards,
  .code-comparison,
  .scenarios-cards,
  .performance-notes {
    grid-template-columns: 1fr;
  }

  .comparison-grid {

    .comparison-header,
    .comparison-row {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .performance-chart {
    grid-template-columns: 1fr;
    height: auto;

    .chart-bar {
      height: 100px;
    }
  }

  .upgrade-path {
    flex-wrap: wrap;

    .step,
    .arrow {
      flex: none;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .arrow {
      text-align: center;
      transform: rotate(90deg);
      padding: 0.5rem 0;
    }
  }
}
</style>
