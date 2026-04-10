<template>
  <div class="vif-vfor-container">
    <h1 class="header">v-if 与 v-for 使用规范</h1>

    <div class="content">
      <section class="explanation-section">
        <h2>为什么不建议在同一元素上同时使用 v-if 和 v-for？</h2>
        <div class="reason-card">
          <h3><span class="icon">1</span> 优先级问题（Vue3 中的变化）</h3>
          <div class="detail">
            <p>在 Vue <strong class="vue2">2.x</strong> 中，<code>v-for</code> 优先级高于 <code>v-if</code>，这意味着：</p>
            <ul>
              <li>每次渲染都会先执行循环再判断条件</li>
              <li>即使只有少量元素需要渲染，也会遍历整个数组</li>
              <li>造成不必要的性能损耗</li>
            </ul>
            <p>在 Vue <strong class="vue3">3.x</strong> 中，<code>v-if</code> 优先级高于 <code>v-for</code>，会导致：</p>
            <ul>
              <li>尝试在 <code>v-if</code> 中访问 <code>v-for</code> 变量时会报错</li>
              <li>因为此时变量尚未定义</li>
              <li>需要在模板中避免这种用法</li>
            </ul>
          </div>
        </div>

        <div class="reason-card">
          <h3><span class="icon">2</span> 渲染性能问题</h3>
          <div class="detail">
            <p>同时使用会导致不必要的计算和 DOM 操作：</p>
            <ul>
              <li>每次更新都需要重新计算整个列表</li>
              <li>即使只有条件发生变化，也需要重新渲染整个列表</li>
              <li>增加不必要的虚拟 DOM 比对开销</li>
            </ul>
            <div class="performance-chart">
              <div class="chart-bar bad" style="width: 90%">同时使用 v-if 和 v-for</div>
              <div class="chart-bar good" style="width: 30%">优化方案</div>
              <div class="chart-labels">
                <span>高开销</span>
                <span>低开销</span>
              </div>
            </div>
          </div>
        </div>

        <div class="reason-card">
          <h3><span class="icon">3</span> 可读性与维护性</h3>
          <div class="detail">
            <p>混用指令会使代码：</p>
            <ul>
              <li>难以理解真实意图</li>
              <li>增加维护复杂度</li>
              <li>可能引入潜在错误</li>
            </ul>
            <p class="code-comment">&lt;!-- 不良实践：混合使用导致逻辑不清 --&gt;</p>
            <pre class="bad-code"><code>&lt;div
  v-for="item in items"
  v-if="item.isActive"
&gt;
&#123;&#123; item.name &#125;&#125;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </section>

      <section class="solution-section">
        <h2>优化方案</h2>

        <div class="solution-card">
          <div class="solution-header">
            <div class="solution-icon best">★</div>
            <h3>最佳实践：使用计算属性</h3>
          </div>
          <div class="solution-detail">
            <p>在脚本中预先过滤数据，避免在模板中进行条件判断：</p>
            <pre><code>// 脚本部分
const items = ref([...]);

const activeItems = computed(() => {
  return items.value.filter(item => item.isActive);
});

// 模板部分
&lt;div v-for="item in activeItems" :key="item.id"&gt;
&#123;&#123; item.name &#125;&#125;
&lt;/div&gt;</code></pre>
            <div class="benefits">
              <span>✅ 只遍历需要的数据</span>
              <span>✅ 清晰的关注点分离</span>
              <span>✅ 高性能</span>
            </div>
          </div>
        </div>

        <div class="solution-card">
          <div class="solution-header">
            <div class="solution-icon">2</div>
            <h3>使用 &lt;template&gt; 标签（条件在循环外）</h3>
          </div>
          <div class="solution-detail">
            <p>当条件与整个列表相关时：</p>
            <pre><code>&lt;template v-if="shouldShowList"&gt;
  &lt;div v-for="item in items" :key="item.id"&gt;
&#123;&#123; item.name &#125;&#125;
  &lt;/div&gt;
&lt;/template&gt;
&lt;div v-else&gt;
  列表为空
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <div class="solution-card">
          <div class="solution-header">
            <div class="solution-icon">3</div>
            <h3>在嵌套元素上分开使用（条件在循环内）</h3>
          </div>
          <div class="solution-detail">
            <p>当每个项需要单独条件判断时：</p>
            <pre><code>&lt;div v-for="item in items" :key="item.id"&gt;
  &lt;div v-if="item.isActive" class="item-content"&gt;
&#123;&#123; item.name &#125;&#125;
  &lt;/div&gt;
  &lt;div v-else class="item-inactive"&gt;
    未激活
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
            <div class="note">
              ⚠️ 注意：当列表非常大时，这种方法可能有性能问题，优先考虑计算属性方案
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Vue 3 最佳实践 | 模板指令优化 | 性能优先</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface ListItem {
  id: number;
  name: string;
  isActive: boolean;
}

export default defineComponent({
  name: 'VifVforDemo',
  setup() {
    // 示例数据
    const items = ref<ListItem[]>([
      { id: 1, name: '项目 A', isActive: true },
      { id: 2, name: '项目 B', isActive: false },
      { id: 3, name: '项目 C', isActive: true },
      { id: 4, name: '项目 D', isActive: false },
      { id: 5, name: '项目 E', isActive: true },
    ]);

    // 计算属性示例
    const activeItems = computed(() => {
      return items.value.filter(item => item.isActive);
    });

    const shouldShowList = ref(true);

    return {
      items,
      activeItems,
      shouldShowList
    };
  }
});
</script>

<style lang="less" scoped>


.vif-vfor-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #eaeaea;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  section {
    background: white;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);

    h2 {
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      position: relative;
      padding-bottom: 0.8rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 3px;
        background: #42b983;
        border-radius: 3px;
      }
    }

    &.solution-section {
      h2::after {
        background: #3498db;
      }
    }
  }

  .reason-card {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 1.8rem;
    border-left: 4px solid #ff6b6b;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    h3 {
      background: rgba(255, 107, 107, 0.08);
      margin: 0;
      padding: 1rem 1.2rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      color: #2c3e50;

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        background: #ff6b6b;
        color: white;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 0.9rem;
        font-weight: bold;
      }
    }

    .detail {
      padding: 1.2rem 1.5rem;
      font-size: 0.95rem;

      ul {
        padding-left: 1.2rem;
        margin: 1rem 0;

        li {
          margin-bottom: 0.6rem;
          position: relative;

          &::before {
            content: '•';
            color: #ff6b6b;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .vue2 {
        color: #4fc08d;
        font-weight: 600;
      }

      .vue3 {
        color: #3498db;
        font-weight: 600;
      }

      .code-comment {
        color: #7f8c8d;
        font-style: italic;
        font-size: 0.9rem;
        margin: 1rem 0 0.5rem;
      }
    }

    .performance-chart {
      margin: 1.5rem 0 1rem;
      background: #f9f9f9;
      padding: 1rem;
      border-radius: 6px;

      .chart-bar {
        height: 22px;
        margin-bottom: 8px;
        border-radius: 4px;
        transition: width 0.8s ease;

        &.bad {
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
        }

        &.good {
          background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
        }
      }

      .chart-labels {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        color: #7f8c8d;
      }
    }
  }

  .solution-card {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 1.8rem;
    border-left: 4px solid #3498db;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .solution-header {
      display: flex;
      align-items: center;
      background: rgba(52, 152, 219, 0.08);
      padding: 1rem 1.2rem;

      h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #2c3e50;
      }

      .solution-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: #3498db;
        color: white;
        border-radius: 6px;
        margin-right: 12px;
        font-weight: bold;

        &.best {
          background: #f39c12;
        }
      }
    }

    .solution-detail {
      padding: 1.2rem 1.5rem;
      font-size: 0.95rem;

      pre {
        background: #2c3e50;
        color: #f8f8f2;
        border-radius: 6px;
        padding: 1.2rem;
        overflow-x: auto;
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 1rem 0;
        font-family: 'Fira Code', monospace;

        code {
          font-family: inherit;
        }
      }

      .benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 1rem;

        span {
          background: rgba(76, 175, 80, 0.15);
          color: #2e7d32;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }

      .note {
        background: rgba(255, 152, 0, 0.1);
        border-left: 3px solid #ff9800;
        padding: 0.8rem;
        border-radius: 0 4px 4px 0;
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #e65100;
      }
    }
  }

  .bad-code {
    background: #ffebee;
    border-left: 4px solid #f44336;
    padding: 0.8rem 1rem;
    border-radius: 0 4px 4px 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
}
</style>
