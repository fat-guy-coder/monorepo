<template>
  <div class="vue-reactivity">
    <h1>Vue响应式API核心区别</h1>
    <div class="subtitle">watch vs watchEffect vs computed</div>

    <!-- 概览卡片 -->
    <div class="overview-cards">
      <div class="card computed">
        <div class="card-header">
          <div class="card-icon">🧮</div>
          <h2>computed</h2>
        </div>
        <div class="card-content">
          <div class="card-property">类型: <span>计算属性</span></div>
          <div class="card-property">返回值: <span>Ref对象</span></div>
          <div class="card-property">缓存: <span>是</span></div>
          <div class="card-property">立即执行: <span>是</span></div>
        </div>
      </div>

      <div class="card watch">
        <div class="card-header">
          <div class="card-icon">👀</div>
          <h2>watch</h2>
        </div>
        <div class="card-content">
          <div class="card-property">类型: <span>侦听器</span></div>
          <div class="card-property">返回值: <span>停止函数</span></div>
          <div class="card-property">缓存: <span>否</span></div>
          <div class="card-property">立即执行: <span>可选</span></div>
        </div>
      </div>

      <div class="card watch-effect">
        <div class="card-header">
          <div class="card-icon">⚡</div>
          <h2>watchEffect</h2>
        </div>
        <div class="card-content">
          <div class="card-property">类型: <span>副作用</span></div>
          <div class="card-property">返回值: <span>停止函数</span></div>
          <div class="card-property">缓存: <span>否</span></div>
          <div class="card-property">立即执行: <span>是</span></div>
        </div>
      </div>
    </div>

    <!-- 核心区别 -->
    <div class="section">
      <h2>核心区别对比</h2>
      <div class="comparison">
        <div class="comparison-row header">
          <div>特性</div>
          <div>computed</div>
          <div>watch</div>
          <div>watchEffect</div>
        </div>
        <div class="comparison-row" v-for="(row, index) in comparisonData" :key="index">
          <div>{{ row.property }}</div>
          <div :class="{ highlight: row.highlight === 'computed' }">{{ row.computed }}</div>
          <div :class="{ highlight: row.highlight === 'watch' }">{{ row.watch }}</div>
          <div :class="{ highlight: row.highlight === 'watchEffect' }">{{ row.watchEffect }}</div>
        </div>
      </div>
    </div>

    <!-- 使用示例 -->
    <div class="section">
      <h2>使用代码示例</h2>
      <div class="code-examples">
        <div class="code-section">
          <h3>computed 示例</h3>
          <pre class="code-block">// 计算全名
const firstName = ref('张');
const lastName = ref('三');

const fullName = computed(() => {
  return `${firstName.value}${lastName.value}`;
});

// 模板中使用
// &lt;div&gt;{ fullName }&lt;/div&gt; // 显示 "张三"

// 当firstName或lastName变化时
firstName.value = '李'; // fullName自动更新为"李三"</pre>
        </div>

        <div class="code-section">
          <h3>watch 示例</h3>
          <pre class="code-block">// 监听特定数据的变化
const count = ref(0);
const double = ref(0);

// 监听count的变化，计算double
watch(count, (newVal, oldVal) => {
  double.value = newVal * 2;

  // 可以执行异步操作
  // fetch(`/api?count=${newVal}`);
}, { immediate: true }); // 立即执行一次

count.value = 5; // 触发watch，double变为10</pre>
        </div>

        <div class="code-section">
          <h3>watchEffect 示例</h3>
          <pre class="code-block">// 自动追踪依赖的响应式数据
const count = ref(0);
const triple = ref(0);

// 自动收集依赖，立即执行
watchEffect(() => {
  triple.value = count.value * 3;

  // 自动追踪所有使用的响应式数据
  console.log(`Count: ${count.value}, Triple: ${triple.value}`);
});

count.value = 5;
// 控制台输出: "Count: 5, Triple: 15"
// triple自动更新为15</pre>
        </div>
      </div>
    </div>

    <!-- 底层原理 -->
    <div class="section">
      <h2>底层原理</h2>
      <div class="principles">
        <div class="principle">
          <h3>computed 原理</h3>
          <div class="principle-content">
            <p>基于Vue的响应式系统和依赖追踪：</p>
            <ul>
              <li>创建一个计算属性ref</li>
              <li>在getter中收集依赖</li>
              <li>依赖变化时标记为"dirty"</li>
              <li>下次访问时重新计算并缓存结果</li>
              <li>使用LRU策略管理缓存</li>
            </ul>
          </div>
        </div>

        <div class="principle">
          <h3>watch/watchEffect 原理</h3>
          <div class="principle-content">
            <p>基于Reactive Effect系统：</p>
            <ul>
              <li>创建副作用函数(effect)</li>
              <li>执行时自动追踪响应式依赖</li>
              <li>依赖变化时重新执行副作用</li>
              <li>使用调度器管理执行时机</li>
              <li>提供清理机制(cleanup)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="reactive-flow">
        <div class="flow-step">
          <div class="step-number">1</div>
          <div class="step-content">响应式数据变化</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-number">2</div>
          <div class="step-content">触发依赖通知</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-number">3</div>
          <div class="step-content">调度器决定执行时机</div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">
          <div class="step-number">4</div>
          <div class="step-content">执行副作用/重新计算</div>
        </div>
      </div>
    </div>

    <!-- 使用场景 -->
    <div class="section">
      <h2>使用场景指南</h2>
      <div class="use-cases">
        <div class="use-case computed">
          <h3>使用 computed 当：</h3>
          <ul>
            <li>需要派生状态（基于其他状态计算）</li>
            <li>需要模板中使用的计算值</li>
            <li>计算开销较大需要缓存结果</li>
            <li>需要响应式地转换数据格式</li>
            <li>多个地方使用同一个计算逻辑</li>
          </ul>
        </div>

        <div class="use-case watch">
          <h3>使用 watch 当：</h3>
          <ul>
            <li>需要监听特定数据的变化</li>
            <li>需要访问变化前后的值</li>
            <li>需要执行异步操作或副作用</li>
            <li>需要控制监听时机（立即执行/深度监听）</li>
            <li>需要手动管理依赖关系</li>
          </ul>
        </div>

        <div class="use-case watch-effect">
          <h3>使用 watchEffect 当：</h3>
          <ul>
            <li>依赖多个响应式数据</li>
            <li>需要立即执行副作用</li>
            <li>依赖关系动态变化</li>
            <li>执行不依赖新旧值的操作</li>
            <li>需要更简洁的语法</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="section">
      <h2>最佳实践与常见陷阱</h2>
      <div class="best-practices">
        <div class="practice">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>优先使用computed</h3>
            <p>对于派生状态，优先使用computed而不是watch，更高效且声明式</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">⚠️</div>
          <div class="practice-content">
            <h3>避免watchEffect中的无限循环</h3>
            <p>注意不要在watchEffect中修改它依赖的数据，可能导致无限循环</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">🔧</div>
          <div class="practice-content">
            <h3>使用{ immediate: true }替代watchEffect</h3>
            <p>当需要旧值时，使用watch + immediate: true而不是watchEffect</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-icon">🧹</div>
          <div class="practice-content">
            <h3>清理副作用</h3>
            <p>在watch/watchEffect中执行异步操作时，使用onInvalidate清理</p>
            <pre class="code-block">watchEffect((onInvalidate) => {
  const timer = setTimeout(() => {
    /* ... */
  }, 1000);

  onInvalidate(() => {
    clearTimeout(timer);
  });
});</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 核心区别对比数据
const comparisonData = ref([
  {
    property: "目的",
    computed: "派生状态",
    watch: "响应变化执行副作用",
    watchEffect: "自动执行副作用",
    highlight: "computed"
  },
  {
    property: "返回值",
    computed: "Ref (可读或可写)",
    watch: "停止监听函数",
    watchEffect: "停止监听函数",
    highlight: "computed"
  },
  {
    property: "执行时机",
    computed: "惰性求值 (访问时执行)",
    watch: "依赖变化后执行",
    watchEffect: "立即执行 + 依赖变化后",
    highlight: "watchEffect"
  },
  {
    property: "依赖收集",
    computed: "显式定义 (在getter中)",
    watch: "显式指定监听源",
    watchEffect: "自动收集回调中所有依赖",
    highlight: "watchEffect"
  },
  {
    property: "新旧值访问",
    computed: "无",
    watch: "可访问新旧值",
    watchEffect: "无法访问旧值",
    highlight: "watch"
  },
  {
    property: "异步支持",
    computed: "不适合 (应保持同步)",
    watch: "适合 (回调可异步)",
    watchEffect: "适合 (可包含异步)",
    highlight: "watch"
  },
  {
    property: "性能优化",
    computed: "结果缓存",
    watch: "可配置flush时机",
    watchEffect: "自动依赖跟踪",
    highlight: "computed"
  },
  {
    property: "典型用例",
    computed: "计算全名、过滤列表",
    watch: "数据变化时请求API",
    watchEffect: "自动追踪表单字段",
    highlight: ""
  }
]);
</script>

<style lang="less" scoped>
.vue-reactivity {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  .subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 40px;
    font-weight: 500;
  }

  h2 {
    font-size: 1.7rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 概览卡片
  .overview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;

    .card {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .card-header {
        padding: 20px;
        display: flex;
        align-items: center;

        .card-icon {
          font-size: 2.5rem;
          margin-right: 15px;
        }

        h2 {
          margin: 0;
          font-size: 1.8rem;
          border: none;
          padding: 0;
        }
      }

      .card-content {
        padding: 20px;
        background: #f8f9fa;

        .card-property {
          margin-bottom: 12px;
          font-weight: 500;

          span {
            font-weight: normal;
            float: right;
          }
        }
      }
    }

    .computed {
      .card-header {
        background: linear-gradient(to right, #3498db, #2ecc71);
        color: white;
      }
    }

    .watch {
      .card-header {
        background: linear-gradient(to right, #e74c3c, #e67e22);
        color: white;
      }
    }

    .watch-effect {
      .card-header {
        background: linear-gradient(to right, #9b59b6, #8e44ad);
        color: white;
      }
    }
  }

  // 核心区别对比
  .comparison {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;

    .comparison-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      &.header {
        background: #2c3e50;
        color: white;
        font-weight: bold;

        >div {
          padding: 15px;
          text-align: center;
        }
      }

      &:not(.header) {
        border-bottom: 1px solid #eee;
        background: white;

        &:nth-child(odd) {
          background: #f8f9fa;
        }

        >div {
          padding: 12px 15px;
        }

        >div:first-child {
          font-weight: 500;
        }

        .highlight {
          background: #e3f2fd;
          font-weight: bold;
          position: relative;

          &::before {
            content: '★';
            position: absolute;
            left: 5px;
            color: #e74c3c;
          }
        }
      }
    }
  }

  // 代码示例
  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;

    .code-section {
      background: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e0e0e0;

      h3 {
        background: #2c3e50;
        color: white;
        padding: 12px 20px;
        margin: 0;
      }
    }
  }

  // 代码块样式
  .code-block {
    background: #2c3e50;
    color: #f1f2f6;
    padding: 20px;
    border-radius: 0 0 8px 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    tab-size: 2;
  }

  // 底层原理
  .principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;
    margin-bottom: 30px;

    .principle {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #e0e0e0;

      ul {
        padding-left: 25px;

        li {
          margin-bottom: 10px;
          line-height: 1.5;
        }
      }
    }
  }

  .reactive-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;

    .flow-step {
      background: #3498db;
      color: white;
      border-radius: 10px;
      padding: 15px 25px;
      text-align: center;
      min-width: 150px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      .step-number {
        background: white;
        color: #3498db;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px;
        font-weight: bold;
      }
    }

    .flow-arrow {
      font-size: 1.5rem;
      color: #7f8c8d;
    }
  }

  // 使用场景
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;

    .use-case {
      padding: 25px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 2px solid;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 12px;
          line-height: 1.5;
        }
      }
    }

    .computed {
      background: #e3f2fd;
      border-color: #bbdefb;

      h3 {
        border-color: #3498db;
      }
    }

    .watch {
      background: #ffebee;
      border-color: #ffcdd2;

      h3 {
        border-color: #e74c3c;
      }
    }

    .watch-effect {
      background: #f3e5f5;
      border-color: #e1bee7;

      h3 {
        border-color: #9b59b6;
      }
    }
  }

  // 最佳实践
  .best-practices {
    .practice {
      display: flex;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px dashed #ddd;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .practice-icon {
        font-size: 1.8rem;
        margin-right: 20px;
        min-width: 40px;
      }

      .practice-content {
        flex: 1;

        p {
          color: #555;
          line-height: 1.6;
          margin: 10px 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .overview-cards,
    .code-examples,
    .use-cases {
      grid-template-columns: 1fr;
    }

    .principles {
      grid-template-columns: 1fr;
    }

    .reactive-flow {
      flex-direction: column;

      .flow-arrow {
        transform: rotate(90deg);
      }
    }

    .comparison {
      overflow-x: auto;

      .comparison-row {
        grid-template-columns: 150px 150px 150px 150px;
        width: max-content;
        min-width: 100%;
      }
    }
  }
}
</style>
