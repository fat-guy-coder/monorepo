<template>
  <div class="data-function-principle">
    <header class="header">
      <h1>为什么Vue的data必须是函数而不是对象？</h1>
      <p class="subtitle">深入理解Vue组件数据隔离机制</p>
    </header>

    <div class="content-wrapper">
      <!-- 核心原理展示区 -->
      <section class="principle-section">
        <div class="principle-card">
          <div class="principle-visualization">
            <div class="object-vs-function">
              <div class="data-function-reason">
                <p>其实就是组件的原型上的data属性，每个组件实例都有自己的data属性，但是如果data是对象，那么所有组件实例都会共享同一个data对象，导致一个组件的数据变化会影响到其他组件，产生“状态污染”。
                </p>
                <p>而如果data是函数，那么每个组件实例都会调用这个函数，返回一个全新的数据对象，这样每个组件实例都有自己的data属性，互不干扰。</p>
              </div>
            </div>
          </div>

          <div class="principle-explanation">
            <h2>核心原理：数据隔离</h2>
            <p>Vue组件设计需要确保每个组件实例拥有<strong>独立的数据副本</strong>，避免多个组件实例共享同一个数据对象导致的状态污染。</p>

            <div class="explanation-points">
              <div class="point">
                <div class="icon">🔁</div>
                <div>
                  <h3>对象是引用类型</h3>
                  <p>JavaScript中对象是引用类型，如果直接使用对象，所有组件实例将共享同一个数据对象</p>
                </div>
              </div>
              <div class="point">
                <div class="icon">🏭</div>
                <div>
                  <h3>工厂函数模式</h3>
                  <p>通过函数返回数据对象，相当于为每个组件创建新的数据实例</p>
                </div>
              </div>
              <div class="point">
                <div class="icon">🛡️</div>
                <div>
                  <h3>避免状态污染</h3>
                  <p>确保组件之间的数据完全隔离，一个组件的状态变化不会影响其他组件</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底层实现机制 -->
      <section class="implementation-section">
        <h2 class="section-title">底层实现机制</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>组件初始化</h3>
              <p>当Vue创建组件实例时，会调用data函数</p>
              <pre>const componentData = typeof data === 'function'
  ? data.call(vm)
  : data || {};</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>响应式处理</h3>
              <p>Vue遍历data返回的对象属性，将其转换为响应式数据</p>
              <pre>function observe(data) {
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>数据代理</h3>
              <p>将data对象上的属性代理到组件实例上，可以直接通过this访问</p>
              <pre>function proxy(vm, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() { return data[key]; },
      set(val) { data[key] = val; }
    });
  });
}</pre>
            </div>
          </div>
        </div>

        <div class="lifecycle-diagram">
          <div class="diagram-title">Vue组件数据初始化流程</div>
          <div class="lifecycle-steps">
            <div class="lifecycle-step">
              <div class="step-icon">🚀</div>
              <div class="step-label">创建组件实例</div>
            </div>
            <div class="arrow">→</div>
            <div class="lifecycle-step">
              <div class="step-icon">📦</div>
              <div class="step-label">调用data函数</div>
            </div>
            <div class="arrow">→</div>
            <div class="lifecycle-step">
              <div class="step-icon">🔄</div>
              <div class="step-label">创建响应式数据</div>
            </div>
            <div class="arrow">→</div>
            <div class="lifecycle-step">
              <div class="step-icon">🔗</div>
              <div class="step-label">数据代理到实例</div>
            </div>
            <div class="arrow">→</div>
            <div class="lifecycle-step">
              <div class="step-icon">✅</div>
              <div class="step-label">组件初始化完成</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue 3中的变化 -->
      <section class="vue3-section">
        <h2 class="section-title">Vue 3中的变化</h2>

        <div class="vue3-changes">
          <div class="change-card">
            <div class="change-icon">🆕</div>
            <h3>Composition API</h3>
            <p>Vue 3引入了Composition API，使用ref和reactive定义响应式数据：</p>
            <pre>setup() {
  const count = ref(0);
  return { count };
}</pre>
            <p>这种方式本质上也是为每个组件实例创建独立的数据</p>
          </div>

          <div class="change-card">
            <div class="change-icon">⚠️</div>
            <h3>Options API兼容</h3>
            <p>Vue 3仍然支持Options API，data必须为函数：</p>
            <pre>export default {
  data() {
    return { count: 0 }
  }
}</pre>
            <p>与Vue 2的行为完全一致</p>
          </div>

          <div class="change-card">
            <div class="change-icon">🚫</div>
            <h3>根实例例外</h3>
            <p>根实例可以使用对象形式的data：</p>
            <pre>new Vue({
  data: { count: 0 }
})</pre>
            <p>因为根实例只有一个，不存在共享问题</p>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">最佳实践</h2>

        <div class="practices-grid">
          <div class="practice-card good">
            <div class="icon">✅</div>
            <h3>始终使用函数形式</h3>
            <p>即使当前组件不会被复用，也使用函数形式定义data</p>
          </div>

          <div class="practice-card good">
            <div class="icon">📝</div>
            <h3>返回全新对象</h3>
            <p>在data函数中返回一个全新的对象，而不是修改外部对象</p>
          </div>

          <div class="practice-card bad">
            <div class="icon">❌</div>
            <h3>避免外部数据</h3>
            <p>不要直接使用外部定义的对象作为data的值</p>
          </div>

          <div class="practice-card bad">
            <div class="icon">🔄</div>
            <h3>避免共享引用</h3>
            <p>不要在多个组件中共享同一个对象引用</p>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2 class="section-title">总结</h2>

        <div class="summary-content">
          <div class="key-point">
            <div class="point-icon">💡</div>
            <p>Vue组件需要多个实例，每个实例需要独立的数据副本</p>
          </div>

          <div class="key-point">
            <div class="point-icon">⚙️</div>
            <p>JavaScript中对象是引用类型，直接使用会导致状态共享</p>
          </div>

          <div class="key-point">
            <div class="point-icon">🛡️</div>
            <p>函数形式通过工厂模式为每个组件创建独立数据对象</p>
          </div>

          <div class="key-point">
            <div class="point-icon">🆕</div>
            <p>Vue 3的Composition API延续了相同的数据隔离理念</p>
          </div>

          <div class="conclusion">
            <h3>核心结论：</h3>
            <p>data必须是函数，这是为了确保<strong>每个组件实例维护独立的数据副本</strong>，避免状态意外共享</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 用于演示使用对象形式的问题
const objectData = ref({ count: 0 })

// 用于演示函数形式的正确隔离
const functionData = ref([0, 0, 0])
</script>

<style lang="less" scoped>


.data-function-principle {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  background-color: #f8fafc;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 400;
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-title {
  font-size: 1.8rem;
  color: #1e40af;
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dbeafe;
}

.principle-section {
  padding: 2rem;

  .principle-card {
    background: linear-gradient(to bottom, #eff6ff, #f8fafc);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
}

.principle-visualization {
  margin-bottom: 2rem;

  .object-vs-function {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .approach {
      flex: 1;
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: #1e40af;
        text-align: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e2e8f0;
      }
    }

    .divider {
      width: 1px;
      background: #e2e8f0;
      margin: 2rem 0;

      @media (max-width: 768px) {
        width: 100%;
        height: 1px;
        margin: 1rem 0;
      }
    }
  }

  .code-block {
    background: #1e293b;
    color: #f1f5f9;
    border-radius: 8px;
    padding: 1.2rem;
    margin: 1rem 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;

    pre {
      margin: 0;
    }
  }

  .result {
    margin-top: 1.5rem;

    .component {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;

      .component-label {
        font-weight: 500;
        color: #64748b;
        margin-bottom: 0.5rem;
      }

      .counter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
        padding: 0.8rem;
        border-radius: 6px;
        border: 1px solid #e2e8f0;

        span {
          font-weight: 500;
        }

        button {
          background: #dbeafe;
          color: #1d4ed8;
          border: none;
          border-radius: 4px;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: #3b82f6;
            color: white;
          }
        }
      }
    }

    .problem {
      background: #fee2e2;
      color: #b91c1c;
      padding: 0.8rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      margin-top: 1rem;
    }

    .benefit {
      background: #dcfce7;
      color: #15803d;
      padding: 0.8rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      margin-top: 1rem;
    }
  }
}

.principle-explanation {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  h2 {
    color: #1e40af;
    margin-top: 0;
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  p {
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.explanation-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .point {
    display: flex;
    gap: 1rem;
    background: #f8fafc;
    padding: 1.2rem;
    border-radius: 8px;

    .icon {
      font-size: 2rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: #1e40af;
    }

    p {
      text-align: left;
      font-size: 1rem;
      margin: 0;
    }
  }
}

.implementation-section {
  padding: 2rem;
  background-color: #f1f5f9;
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .step {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

    .step-number {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;

      h3 {
        margin-top: 0;
        color: #1e40af;
      }

      pre {
        background: #1e293b;
        color: #f1f5f9;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
    }
  }
}

.lifecycle-diagram {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  .diagram-title {
    font-weight: 500;
    color: #64748b;
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.lifecycle-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  .lifecycle-step {
    background: #dbeafe;
    border-radius: 8px;
    padding: 1rem;
    min-width: 150px;
    text-align: center;

    .step-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .step-label {
      font-weight: 500;
      color: #1e40af;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: #94a3b8;
  }
}

.vue3-section {
  padding: 2rem;

  .vue3-changes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

.change-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  .change-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: #1e40af;
  }

  pre {
    background: #1e293b;
    color: #f1f5f9;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    margin: 1rem 0;
  }
}

.best-practices {
  padding: 2rem;
  background-color: #f1f5f9;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  &.good {
    border-top: 4px solid #10b981;
  }

  &.bad {
    border-top: 4px solid #ef4444;
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: #1e40af;
  }
}

.summary-section {
  padding: 2rem;

  .summary-content {
    background: linear-gradient(to bottom, #eff6ff, #f8fafc);
    border-radius: 12px;
    padding: 2rem;
  }
}

.key-point {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .point-icon {
    font-size: 1.5rem;
    background: #dbeafe;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
  }
}

.conclusion {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  h3 {
    color: #1e40af;
    margin-top: 0;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;

    strong {
      color: #1e40af;
    }
  }
}
</style>
