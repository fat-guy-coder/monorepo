<template>
  <div class="coroutine-container">
    <header>
      <h1><i class="fas fa-sync-alt"></i> JavaScript协程与让权机制介绍</h1>
      <p class="subtitle">轻量级并发编程模型的核心概念与应用</p>
    </header>

    <div class="content-grid">
      <!-- 概述部分 -->
      <section class="card overview">
        <div class="section-header">
          <h2><i class="fas fa-info-circle"></i> 协程概述</h2>
          <div class="tag">Coroutines</div>
        </div>

        <div class="definition">
          <h3><i class="fas fa-book"></i> 概念定义</h3>
          <p>
            协程（Coroutine）是一种比线程更轻量级的并发编程模型，允许函数在执行过程中<strong>主动让出</strong>控制权，稍后从中断点恢复执行。
          </p>
        </div>

        <div class="feature-list">
          <div class="feature">
            <i class="fas fa-exchange-alt"></i>
            <h3>让权机制</h3>
            <p>协程的核心是让权(yield)，允许暂停执行并将控制权交还给调用者</p>
          </div>
          <div class="feature">
            <i class="fas fa-bolt"></i>
            <h3>协作式多任务</h3>
            <p>协程之间协作调度，而非抢占式</p>
          </div>
          <div class="feature">
            <i class="fas fa-memory"></i>
            <h3>轻量级</h3>
            <p>不依赖操作系统线程，开销极小</p>
          </div>
        </div>

        <div class="comparison">
          <h3><i class="fas fa-balance-scale"></i> 与传统线程对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>协程</th>
                  <th>线程</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>调度方式</td>
                  <td>协作式</td>
                  <td>抢占式</td>
                </tr>
                <tr>
                  <td>上下文切换开销</td>
                  <td>极小（用户态）</td>
                  <td>较大（内核态）</td>
                </tr>
                <tr>
                  <td>并发数量</td>
                  <td>数十万级</td>
                  <td>数千级</td>
                </tr>
                <tr>
                  <td>内存占用</td>
                  <td>KB级别</td>
                  <td>MB级别</td>
                </tr>
                <tr>
                  <td>同步机制</td>
                  <td>通常不需要锁</td>
                  <td>需要锁机制</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 让权机制 -->
      <section class="card yielding">
        <div class="section-header">
          <h2><i class="fas fa-handshake"></i> 让权机制</h2>
          <div class="tag">Yielding</div>
        </div>

        <div class="content-columns">
          <div class="column">
            <h3><i class="fas fa-cogs"></i> 工作原理</h3>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <p>协程开始执行</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">2</div>
                <p>执行到yield点</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">3</div>
                <p>保存当前状态</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">4</div>
                <p>让出控制权</p>
              </div>
            </div>

            <h3><i class="fas fa-redo"></i> 恢复执行</h3>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <p>调度器选择协程</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">2</div>
                <p>恢复保存的状态</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">3</div>
                <p>从yield点继续执行</p>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="step">
                <div class="step-number">4</div>
                <p>执行到下一个yield或结束</p>
              </div>
            </div>
          </div>

          <div class="column">
            <h3><i class="fas fa-key"></i> 关键特性</h3>
            <ul class="features">
              <li><i class="fas fa-check"></i> 执行状态保存与恢复</li>
              <li><i class="fas fa-check"></i> 主动让出控制权</li>
              <li><i class="fas fa-check"></i> 不阻塞主线程</li>
              <li><i class="fas fa-check"></i> 可传递数据给调用者</li>
              <li><i class="fas fa-check"></i> 可接收恢复时传入的数据</li>
            </ul>

            <h3><i class="fas fa-project-diagram"></i> 协程生命周期</h3>
            <div class="lifecycle">
              <div class="state created">
                <i class="fas fa-plus-circle"></i>
                <span>创建</span>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="state running">
                <i class="fas fa-play-circle"></i>
                <span>运行</span>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="state suspended">
                <i class="fas fa-pause-circle"></i>
                <span>挂起</span>
              </div>
              <div class="arrow"><i class="fas fa-arrow-right"></i></div>
              <div class="state terminated">
                <i class="fas fa-stop-circle"></i>
                <span>终止</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- JavaScript实现 -->
      <section class="card implementation">
        <div class="section-header">
          <h2><i class="fas fa-code"></i> JavaScript实现</h2>
          <div class="tag">Generators & Async/Await</div>
        </div>

        <div class="tabs">
          <div class="tab-buttons">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ active: activeTab === index }"
              @click="activeTab = index"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <!-- Generator函数 -->
            <div v-if="activeTab === 0" class="generator">
              <h3><i class="fas fa-cog"></i> Generator函数</h3>
              <div class="code-block">
                <pre><code>function* idGenerator() {
  let id = 1;
  while (true) {
    // yield让出控制权并返回值
    const increment = yield id;
    id += increment || 1;
  }
}

// 创建生成器实例
const gen = idGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next(3)); // { value: 4, done: false }
console.log(gen.next(5)); // { value: 9, done: false }</code></pre>
              </div>

              <div class="generator-features">
                <div class="feature">
                  <i class="fas fa-star"></i>
                  <h4>function* 语法</h4>
                  <p>使用星号定义生成器函数</p>
                </div>
                <div class="feature">
                  <i class="fas fa-arrow-circle-down"></i>
                  <h4>yield 关键字</h4>
                  <p>暂停执行并返回值</p>
                </div>
                <div class="feature">
                  <i class="fas fa-arrow-circle-up"></i>
                  <h4>next() 方法</h4>
                  <p>恢复执行并传入值</p>
                </div>
              </div>
            </div>

            <!-- Async/Await -->
            <div v-if="activeTab === 1" class="async-await">
              <h3><i class="fas fa-bolt"></i> Async/Await 模式</h3>
              <div class="code-block">
                <pre><code>async function fetchUserData(userId) {
  try {
    // await让出控制权直到Promise解决
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}

// 使用async函数
fetchUserData(123)
  .then(data => console.log('用户数据:', data))
  .catch(error => console.error('错误:', error));</code></pre>
              </div>

              <div class="async-features">
                <div class="feature">
                  <i class="fas fa-sync-alt"></i>
                  <h4>语法糖</h4>
                  <p>基于Generator和Promise的封装</p>
                </div>
                <div class="feature">
                  <i class="fas fa-pause"></i>
                  <h4>隐式让权</h4>
                  <p>await自动让出控制权</p>
                </div>
                <div class="feature">
                  <i class="fas fa-hand-point-up"></i>
                  <h4>错误处理</h4>
                  <p>使用try/catch捕获异常</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="card use-cases">
        <div class="section-header">
          <h2><i class="fas fa-lightbulb"></i> 适用场景</h2>
          <div class="tag">Use Cases</div>
        </div>

        <div class="use-case-list">
          <div class="use-case">
            <div class="icon">
              <i class="fas fa-spinner"></i>
            </div>
            <div class="content">
              <h3>异步操作序列化</h3>
              <p>将多个异步操作按顺序执行，避免回调地狱</p>
              <div class="code-block small">
                <pre><code>async function processTasks() {
  await task1();
  await task2();
  await task3();
}</code></pre>
              </div>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">
              <i class="fas fa-gamepad"></i>
            </div>
            <div class="content">
              <h3>游戏开发</h3>
              <p>管理游戏状态机、AI行为树和动画序列</p>
              <div class="code-block small">
                <pre><code>function* enemyAI() {
  yield* patrolArea();
  yield* detectPlayer();
  yield* attackPlayer();
  yield* retreat();
}</code></pre>
              </div>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">
              <i class="fas fa-stream"></i>
            </div>
            <div class="content">
              <h3>数据流处理</h3>
              <p>处理大型数据集或无限数据流</p>
              <div class="code-block small">
                <pre><code>async function* streamData(source) {
  for await (const chunk of source) {
    yield processChunk(chunk);
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">
              <i class="fas fa-user-clock"></i>
            </div>
            <div class="content">
              <h3>用户交互管理</h3>
              <p>管理复杂的用户交互流程</p>
              <div class="code-block small">
                <pre><code>async function checkoutProcess() {
  await selectProducts();
  await enterShippingInfo();
  await selectPaymentMethod();
  await confirmOrder();
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card best-practices">
        <div class="section-header">
          <h2><i class="fas fa-clipboard-check"></i> 最佳实践</h2>
          <div class="tag">Best Practices</div>
        </div>

        <div class="practice-list">
          <div class="practice">
            <div class="number">1</div>
            <div class="content">
              <h3>合理使用让权点</h3>
              <p>在I/O操作、长时间计算或等待用户输入时让出控制权</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>避免阻塞操作</h3>
              <p>不要在协程中执行阻塞主线程的操作</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>错误处理</h3>
              <p>使用try/catch或.catch()正确处理异步错误</p>
            </div>
          </div>

          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>并行优化</h3>
              <p>使用Promise.all()并行处理独立任务</p>
              <div class="code-block small">
                <pre><code>async function loadData() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="performance">
          <h3><i class="fas fa-tachometer-alt"></i> 性能注意事项</h3>
          <ul>
            <li>协程创建和切换开销虽小，但大量使用时仍需注意</li>
            <li>避免在热代码路径中频繁让权</li>
            <li>使用性能分析工具监控协程使用情况</li>
            <li>考虑使用Web Workers处理CPU密集型任务</li>
          </ul>
        </div>
      </section>
    </div>

    <footer>
      <p>JavaScript并发编程 &copy; 2023 - 协程与让权机制介绍</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [{ title: 'Generator函数' }, { title: 'Async/Await模式' }]
</script>

<style lang="less" scoped>
.coroutine-container {
  font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #343a40;
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 12px 12px 0 0;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 600;

    i {
      font-size: 2.2rem;
      animation: spin 2s linear infinite;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 300;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.content-grid {
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  padding: 25px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;

  h2 {
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 0;
    border: none;
    font-size: 1.6rem;
  }

  .tag {
    background: #e0e7ff;
    color: #4e54c8;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.definition {
  background: #f0f7ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #4e54c8;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: #2d3748;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;

    strong {
      color: #4e54c8;
    }
  }
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;

  .feature {
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      border-color: #c7d2fe;
      background: #f0f7ff;
    }

    i {
      font-size: 2rem;
      margin-bottom: 15px;
      color: #4e54c8;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      font-size: 0.95rem;
    }
  }
}

.comparison {
  margin-top: 30px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2d3748;
  }
}

.comparison-table {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    min-width: 500px;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f7fafc;
      color: #4a5568;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    tr:hover {
      background: #f0f7ff;
    }
  }
}

.content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.workflow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  .step {
    background: #f0f7ff;
    border: 1px solid #d0e0f0;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    flex: 1;
    max-width: 150px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }

    .step-number {
      width: 30px;
      height: 30px;
      background: #4e54c8;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 0 auto 10px;
    }

    p {
      font-size: 0.9rem;
      color: #4a5568;
    }
  }

  .arrow {
    color: #4e54c8;
    font-size: 1.2rem;
    padding: 0 5px;
  }
}

.features {
  list-style-type: none;
  margin: 20px 0;

  li {
    background: #f8fafc;
    padding: 12px 15px;
    margin-bottom: 10px;
    border-radius: 6px;
    border-left: 3px solid #4e54c8;
    display: flex;
    align-items: center;
    gap: 10px;

    i {
      color: #4e54c8;
    }
  }
}

.lifecycle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;

  .state {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f0f7ff;
    padding: 15px;
    border-radius: 8px;
    min-width: 80px;
    border: 1px solid #d0e0f0;

    i {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }

    span {
      font-size: 0.9rem;
    }

    &.created i {
      color: #4e54c8;
    }
    &.running i {
      color: #10b981;
    }
    &.suspended i {
      color: #f59e0b;
    }
    &.terminated i {
      color: #ef4444;
    }
  }

  .arrow {
    color: #4e54c8;
    font-size: 1.2rem;
  }
}

.tabs {
  margin-top: 20px;

  .tab-buttons {
    display: flex;
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 20px;

    button {
      padding: 12px 25px;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        color: #4e54c8;
      }

      &.active {
        color: #4e54c8;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #4e54c8;
          border-radius: 3px 3px 0 0;
        }
      }
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 15px;
  line-height: 1.5;
  overflow-x: auto;
  margin-bottom: 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

  pre {
    margin: 0;
  }

  code {
    font-family: 'Fira Code', monospace;
  }

  &.small {
    font-size: 14px;
    padding: 15px;
  }
}

.generator-features,
.async-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;

  .feature {
    text-align: center;
    padding: 15px;
    background: #f8fafc;
    border-radius: 8px;

    i {
      font-size: 1.8rem;
      color: #4e54c8;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 1.1rem;
      margin-bottom: 5px;
    }

    p {
      font-size: 0.9rem;
      color: #4a5568;
    }
  }
}

.use-case-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.use-case {
  display: flex;
  gap: 15px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c7d2fe;
    transform: translateY(-3px);
  }

  .icon {
    i {
      font-size: 2rem;
      color: #4e54c8;
    }
  }

  .content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #2d3748;
    }

    p {
      margin-bottom: 10px;
      color: #4a5568;
    }
  }
}

.practice-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.practice {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .number {
    width: 36px;
    height: 36px;
    background: #4e54c8;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  .content {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 10px;
    }
  }
}

.performance {
  background: #f0f7ff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2d3748;
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 8px;
      color: #4a5568;
    }
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
}

@media (max-width: 600px) {
  header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .workflow {
    flex-direction: column;
    gap: 15px;

    .step {
      max-width: 100%;
      width: 100%;
    }

    .arrow {
      transform: rotate(90deg);
    }
  }

  .lifecycle {
    flex-wrap: wrap;
    gap: 10px;

    .state {
      flex: 1;
      min-width: 100px;
    }

    .arrow {
      display: none;
    }
  }
}
</style>
