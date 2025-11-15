<template>
  <div class="reactivity-guide">
    <header>
      <h1>Vue3 响应式原理深度解析</h1>
      <p>探索 Vue3 的核心数据驱动机制</p>
    </header>

    <main>
      <!-- 响应式基础 -->
      <section class="fundamentals">
        <h2>响应式基础</h2>
        <div class="content">
          <div class="reactive-demo">
            <div class="demo-container">
              <div class="code-block">
                <pre><code>// 创建响应式对象
const state = reactive({
  count: 0
});

// 创建响应式引用
const message = ref('Hello Vue3');

// 计算属性
const doubled = computed(() => state.count * 2);</code></pre>
              </div>
              <div class="visualization">
                <div class="reactive-object">
                  <div class="obj-header">响应式对象</div>
                  <div class="obj-props">
                    <div class="prop">count: {{ demoState.count }}</div>
                    <div class="prop">message: {{ demoMessage }}</div>
                    <div class="prop">doubled: {{ doubledValue }}</div>
                  </div>
                </div>
                <div class="actions">
                  <button @click="incrementCount">增加 count</button>
                  <button @click="updateMessage">更新 message</button>
                </div>
              </div>
            </div>
          </div>

          <div class="key-concepts">
            <div class="concept">
              <div class="icon">🔗</div>
              <h3>数据驱动视图</h3>
              <p>数据变化自动更新 DOM</p>
            </div>
            <div class="concept">
              <div class="icon">🔄</div>
              <h3>自动依赖追踪</h3>
              <p>自动追踪数据依赖关系</p>
            </div>
            <div class="concept">
              <div class="icon">⚡</div>
              <h3>高效更新</h3>
              <p>精准更新受影响组件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心原理 -->
      <section class="core-principle">
        <h2>核心原理：Proxy 与依赖追踪</h2>
        <div class="principle-diagram">
          <div class="data-layer">
            <div class="layer-title">数据层 (Data)</div>
            <div class="reactive-object">
              <div class="obj-header">响应式对象</div>
              <div class="obj-props">
                <div class="prop">count: 0</div>
                <div class="prop">message: "Hello"</div>
              </div>
            </div>
          </div>

          <div class="proxy-layer">
            <div class="layer-title">代理层 (Proxy)</div>
            <div class="proxy-box">
              <div class="handler">get/set 陷阱</div>
              <div class="arrows">
                <div class="arrow">↑</div>
                <div class="arrow">↓</div>
              </div>
            </div>
          </div>

          <div class="dep-layer">
            <div class="layer-title">依赖层 (Dependencies)</div>
            <div class="deps">
              <div class="dep">Dep: count</div>
              <div class="dep">Dep: message</div>
            </div>
          </div>

          <div class="effect-layer">
            <div class="layer-title">副作用层 (Effects)</div>
            <div class="effects">
              <div class="effect">Effect 1 (渲染)</div>
              <div class="effect">Effect 2 (计算)</div>
            </div>
          </div>
        </div>

        <div class="process-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>创建响应式对象</h3>
            <p>使用 Proxy 包装原始对象</p>
            <pre><code>function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key); // 依赖收集
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key); // 触发更新
      return true;
    }
  });
}</code></pre>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>依赖收集</h3>
            <p>访问数据时收集当前副作用</p>
            <pre><code>let activeEffect = null;

function track(target, key) {
  if (activeEffect) {
    // 建立 target.key → effect 的映射
    depsMap.get(target).get(key).add(activeEffect);
  }
}</code></pre>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>触发更新</h3>
            <p>数据变化时执行相关副作用</p>
            <pre><code>function trigger(target, key) {
  const effects = depsMap.get(target)?.get(key);
  effects && effects.forEach(effect => effect());
}</code></pre>
          </div>
        </div>
      </section>

      <!-- Reactivity API -->
      <section class="reactivity-api">
        <h2>响应式 API 基础介绍</h2>
        <div class="api-grid">
          <div class="api-card">
            <h3>reactive()</h3>
            <p>创建深度响应式对象</p>
            <pre><code>const state = reactive({
  user: {
    name: 'Alice',
    age: 30
  },
  scores: [95, 89, 78]
});</code></pre>
            <div class="features">
              <div class="feature">✅ reactive主要利用的Proxy</div>
              <div class="feature">✅ 嵌套对象自动响应</div>
              <div class="feature">✅ 数组变更检测</div>
              <div class="feature">⚠️ 仅适用于对象类型</div>
            </div>
          </div>

          <div class="api-card">
            <h3>ref()</h3>
            <p>创建响应式引用</p>
            <pre><code>const count = ref(0);

// 访问值
console.log(count.value); // 0

// 修改值
count.value = 1;</code></pre>
            <div class="features">
              <div class="feature">✅ ref主要利用的class的get和set(get value(){}, set value(newVal){})</div>
              <div class="feature">✅ 适用于基本类型</div>
              <div class="feature">✅ 模板中自动解包</div>
              <div class="feature">🔀 .value 访问实际值</div>
            </div>
          </div>

          <div class="api-card">
            <h3>computed()</h3>
            <p>创建计算属性</p>
            <pre><code>const double = computed(() => count.value * 2);

// 自动更新
console.log(double.value); // 2 (当 count=1)</code></pre>
            <div class="features">
              <div class="feature">📊 基于依赖自动计算</div>
              <div class="feature">⚡ 计算结果缓存</div>
              <div class="feature">🔄 依赖变更时重新计算</div>
            </div>
          </div>

          <div class="api-card">
            <h3>watch() & watchEffect()</h3>
            <p>响应式数据监听</p>
            <pre><code>// 监听特定数据
watch(count, (newVal) => {
  console.log(`Count changed: ${newVal}`);
});

// 自动追踪依赖
watchEffect(() => {
  console.log(`Count: ${count.value}`);
});</code></pre>
            <div class="features">
              <div class="feature">👁️ 精确监听数据变化</div>
              <div class="feature">🔄 自动清理副作用</div>
              <div class="feature">⏱️ 控制触发时机</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 响应式系统流程 -->
      <section class="reactivity-flow">
        <h2>响应式系统工作流程</h2>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>组件初始化</h3>
              <p>创建组件实例，解析模板</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建响应式数据</h3>
              <p>reactive() / ref() 创建响应式状态</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>渲染过程</h3>
              <p>执行渲染函数，访问响应式数据</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>依赖收集</h3>
              <p>Proxy getter 追踪当前渲染函数</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>数据变更</h3>
              <p>用户交互或异步操作修改数据</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>触发更新</h3>
              <p>Proxy setter 通知依赖更新</p>
            </div>
          </div>
          <div class="arrow">→</div>

          <div class="flow-step">
            <div class="step-number">7</div>
            <div class="step-content">
              <h3>重新渲染</h3>
              <p>调度更新，执行渲染函数</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 响应式进阶 -->
      <section class="advanced">
        <h2>响应式进阶知识</h2>
        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>响应式原理 vs Vue2</h3>
            <div class="comparison">
              <div class="vue2">
                <h4>Vue2 (Object.defineProperty)</h4>
                <ul>
                  <li>递归转换对象属性</li>
                  <li>无法检测新增/删除属性</li>
                  <li>数组方法需要拦截</li>
                  <li>性能开销较大</li>
                </ul>
              </div>
              <div class="vue3">
                <h4>Vue3 (Proxy)</h4>
                <ul>
                  <li>按需代理，惰性转换</li>
                  <li>完整支持对象/数组操作</li>
                  <li>更好的性能表现</li>
                  <li>支持Map/Set等新类型</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="advanced-card">
            <h3>响应式最佳实践</h3>
            <ol>
              <li>合理使用 ref 和 reactive</li>
              <li>避免在响应式对象中使用大型数据结构</li>
              <li>使用 shallowRef/shallowReactive 优化性能</li>
              <li>及时清理 watch 和 watchEffect</li>
              <li>使用 markRaw 跳过不必要的响应式转换</li>
            </ol>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p> Vue3响应式原理基础介绍 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

// 响应式演示数据
const demoState = reactive({
  count: 0
});

const demoMessage = ref('Hello Vue3');
const doubledValue = computed(() => demoState.count * 2);

// 演示方法
const incrementCount = () => {
  demoState.count++;
};

const updateMessage = () => {
  demoMessage.value = demoMessage.value === 'Hello Vue3'
    ? '响应式原理'
    : 'Hello Vue3';
};

// 初始化时显示效果
onMounted(() => {
  setTimeout(incrementCount, 1000);
  setTimeout(updateMessage, 2000);
});
</script>

<style lang="less" scoped>
@primary: #42b983;
@secondary: #34495e;
@accent: #3498db;
@reactive: #e74c3c;
@vue2: #f1c40f;
@vue3: #9b59b6;
@light: #f8f9fa;
@dark: #2c3e50;

// 基础样式
.reactivity-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @secondary;
      background: linear-gradient(135deg, @secondary, @primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: lighten(@dark, 20%);
      font-size: 1.1rem;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid @primary;
      color: @secondary;
    }
  }
}

// 响应式基础部分
.fundamentals {
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .reactive-demo {
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .code-block {
      flex: 1;
      background: #2d3748;
      border-radius: 8px;
      padding: 1.5rem;
      overflow: auto;

      pre {
        margin: 0;

        code {
          font-family: 'Fira Code', monospace;
          color: #cbd5e0;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }

    .visualization {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .reactive-object {
    border: 2px solid @primary;
    border-radius: 8px;
    overflow: hidden;

    .obj-header {
      background: @primary;
      color: white;
      padding: 0.8rem;
      font-weight: 600;
      text-align: center;
    }

    .obj-props {
      padding: 1.5rem;
      background: lighten(@primary, 45%);

      .prop {
        padding: 0.8rem;
        background: white;
        border-radius: 6px;
        margin-bottom: 0.8rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;

    button {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 6px;
      background: @accent;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: darken(@accent, 10%);
        transform: translateY(-2px);
      }
    }
  }

  .key-concepts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;

    .concept {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid @primary;

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0.5rem 0;
        color: @secondary;
      }

      p {
        color: lighten(@dark, 20%);
        margin: 0;
      }
    }
  }
}

// 核心原理部分
.core-principle {
  .principle-diagram {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .data-layer,
  .proxy-layer,
  .dep-layer,
  .effect-layer {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
  }

  .layer-title {
    font-weight: bold;
    margin-bottom: 1rem;
    color: @primary;
  }

  .reactive-object {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    overflow: hidden;

    .obj-header {
      background: #e9ecef;
      padding: 0.5rem;
      font-weight: 500;
    }

    .obj-props {
      padding: 1rem;

      .prop {
        padding: 0.5rem;
        text-align: left;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
      }
    }
  }

  .proxy-box {
    background: lighten(@accent, 30%);
    border: 1px solid @accent;
    border-radius: 6px;
    padding: 1.5rem;

    .handler {
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .arrows {
      display: flex;
      justify-content: center;
      gap: 2rem;
      font-size: 1.5rem;
      color: @reactive;
    }
  }

  .deps,
  .effects {

    .dep,
    .effect {
      padding: 0.8rem;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .process-steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .step {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    position: relative;

    .step-number {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 40px;
      height: 40px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: bold;
    }

    h3 {
      margin-top: 0.5rem;
      color: @secondary;
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin-top: 1rem;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }
}

// 响应式API部分
.reactivity-api {
  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .api-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border-top: 4px solid @primary;

    h3 {
      margin-top: 0;
      color: @secondary;
    }

    pre {
      background: #2d3748;
      border-radius: 6px;
      padding: 1rem;
      overflow: auto;
      margin: 1rem 0;

      code {
        font-family: 'Fira Code', monospace;
        color: #cbd5e0;
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }

  .features {
    .feature {
      padding: 0.5rem;
      background: white;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 响应式流程部分
.reactivity-flow {
  .flow-diagram {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    .flow-step,
    .arrow {
      flex: 1;
      min-width: 150px;
      text-align: center;
    }

    .flow-step {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      position: relative;
      border: 1px solid #e9ecef;

      .step-number {
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      h3 {
        margin: 0.5rem 0;
        color: @secondary;
        font-size: 1.1rem;
      }

      p {
        font-size: 0.9rem;
        margin: 0;
        color: lighten(@dark, 20%);
      }
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: @primary;
      font-weight: bold;

      @media (max-width: 767px) {
        transform: rotate(90deg);
        min-width: 30px;
      }
    }
  }
}

// 进阶部分
.advanced {
  .advanced-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 992px) {
      grid-template-columns: 2fr 1fr;
    }
  }

  .advanced-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      color: @secondary;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .vue2,
    .vue3 {
      padding: 1rem;
      border-radius: 8px;
    }

    .vue2 {
      background: lighten(@vue2, 40%);
      border: 1px solid @vue2;
    }

    .vue3 {
      background: lighten(@vue3, 50%);
      border: 1px solid @vue3;
    }

    h4 {
      margin-top: 0;
      text-align: center;
    }

    ul {
      padding-left: 1.2rem;
      margin: 1rem 0 0;

      li {
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
          line-height: 1;
        }
      }
    }
  }

  ol {
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 1rem;
      position: relative;
      padding-left: 1.8rem;

      &::before {
        content: counter(item);
        counter-increment: item;
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: lighten(@dark, 30%);
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>
