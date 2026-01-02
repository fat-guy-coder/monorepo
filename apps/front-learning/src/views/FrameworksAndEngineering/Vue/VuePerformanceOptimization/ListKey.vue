<template>
  <div class="list-key-guide">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <h1>Vue 列表中的 Key</h1>
      <p class="subtitle">提升列表渲染性能与正确性的关键</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 基本概念 -->
      <section class="concept-section">
        <h2 class="section-title">
          <span class="section-icon">🔑</span>
          <span>Key 的作用</span>
        </h2>

        <div class="concept-content">
          <div class="definition-card">
            <p>
              在 Vue 的 <code>v-for</code> 列表中，<strong>key</strong>
              是一个特殊的属性，用于给每个节点提供唯一标识。
            </p>
            <p>它是 Vue 虚拟 DOM 算法识别节点的关键依据。</p>
          </div>

          <div class="code-example">
            <pre><code>&lt;!-- 正确用法 --&gt;
&lt;div v-for="item in items" :key="item.id"&gt;
   item.text
&lt;/div&gt;

&lt;!-- 错误用法 --&gt;
&lt;div v-for="item in items"&gt;
   item.text
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- 为什么需要 Key -->
      <section class="why-section">
        <h2 class="section-title">
          <span class="section-icon">🤔</span>
          <span>为什么需要 Key</span>
        </h2>

        <div class="reason-cards">
          <div class="reason-card">
            <div class="reason-icon">⚡</div>
            <h3>性能优化</h3>
            <p>Vue 通过 key 可以精确识别哪些节点可以复用，避免不必要的 DOM 操作，提升渲染效率。</p>
          </div>

          <div class="reason-card">
            <div class="reason-icon">✅</div>
            <h3>状态保持</h3>
            <p>确保组件状态在重新渲染时不会丢失，特别是在有表单元素或过渡动画的列表中。</p>
          </div>

          <div class="reason-card">
            <div class="reason-icon">🔄</div>
            <h3>正确更新</h3>
            <p>当列表顺序改变时，key 帮助 Vue 正确识别元素位置变化，而不是误判为元素内容变化。</p>
          </div>
        </div>
      </section>

      <!-- 就地更新 -->
      <section class="update-section">
        <h2 class="section-title">
          <span class="section-icon">🔄</span>
          <span>就地更新策略</span>
        </h2>

        <div class="concept-content">
          <div class="definition-card">
            <p>
              Vue 在没有
              <code>key</code> 的情况下会采用"就地更新"策略。这意味着如果数据项的顺序被改变，Vue
              将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素。
            </p>
          </div>

          <div class="reason-cards">
            <div class="reason-card">
              <div class="reason-icon">⚠️</div>
              <h3>潜在问题</h3>
              <p>
                就地更新可能导致渲染结果不可预测，特别是当列表中包含临时状态（如用户输入、复选框选中状态）时。
              </p>
            </div>

            <div class="reason-card">
              <div class="reason-icon">📝</div>
              <h3>使用场景</h3>
              <p>
                仅适用于列表渲染输出的 DOM 内容非常简单，或者有意依赖默认行为以获取性能上的提升。
              </p>
            </div>

            <div class="reason-card">
              <div class="reason-icon">💡</div>
              <h3>最佳实践</h3>
              <p>
                建议始终为 <code>v-for</code> 提供 <code>key</code> 属性，除非遍历的 DOM
                内容非常简单或刻意依赖默认行为。
              </p>
            </div>
          </div>

          <div class="code-example">
            <pre><code>// 就地更新示例
&lt;div v-for="item in items"&gt;
  { item.text }
&lt;/div&gt;

// 使用key的更新示例
&lt;div v-for="item in items" :key="item.id"&gt;
  { item.text }
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- 工作原理 -->
      <section class="work-section">
        <h2 class="section-title">
          <span class="section-icon">⚙️</span>
          <span>工作原理</span>
        </h2>

        <div class="work-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>虚拟 DOM 对比</h3>
              <p>Vue 通过比较新旧虚拟 DOM 树来确定需要更新的部分</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Key 匹配</h3>
              <p>使用 key 作为唯一标识来匹配新旧树中的相同节点</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>最小化更新</h3>
              <p>只更新真正变化的部分，而不是重新渲染整个列表</p>
            </div>
          </div>
        </div>

        <div class="comparison">
          <div class="comparison-item">
            <h4>有 Key 的情况</h4>
            <div class="comparison-visual good">
              <div class="node" v-for="i in 3" :key="i">节点 {{ i }}</div>
            </div>
            <p>节点正确匹配，高效更新</p>
          </div>

          <div class="comparison-item">
            <h4>无 Key 的情况</h4>
            <pre><code>
              &lt;div v-for="item in items"&gt;
                { item.text }
              &lt;/div&gt;
            </code></pre>
            <p>可能导致错误匹配和性能下降</p>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practice-section">
        <h2 class="section-title">
          <span class="section-icon">🌟</span>
          <span>最佳实践</span>
        </h2>

        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">👍</div>
            <div class="practice-content">
              <h3>使用唯一标识</h3>
              <p>优先使用数据中的唯一 ID 作为 key，而不是数组索引</p>
              <pre><code>&lt;div v-for="user in users" :key="user.id"&gt;</code></pre>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">👎</div>
            <div class="practice-content">
              <h3>避免使用索引</h3>
              <p>当列表顺序可能变化时，使用索引作为 key 会导致问题</p>
              <pre><code>&lt;!-- 不推荐 --&gt;
&lt;div v-for="(item, index) in items" :key="index"&gt;
例如，当删除列表中某个元素时，其后面的所有元素的下标都会发生改变，导致Vue重新渲染整个列表。
</code></pre>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-icon">⚠️</div>
            <div class="practice-content">
              <h3>复杂数据的情况</h3>
              <p>对于没有唯一 ID 的数据，可以创建复合 key</p>
              <pre><code>&lt;div v-for="item in items"
  :key="`${item.name}-${item.date}`"&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2>关键总结</h2>
        <div class="summary-content">
          <ul>
            <li><strong>Key 是必须的</strong> - 始终为 v-for 列表提供唯一的 key</li>
            <li><strong>性能优化</strong> - key 帮助 Vue 高效更新 DOM</li>
            <li><strong>状态保持</strong> - 确保组件状态在重新渲染时不会混乱</li>
            <li><strong>正确匹配</strong> - 避免在列表顺序变化时出现渲染错误</li>
          </ul>
          <div class="final-tip">
            <p>记住：好的 key 策略是 Vue 高效渲染的基础！</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加一些交互逻辑
</script>

<style scoped lang="less">
@primary-color: #4f46e5;
@secondary-color: #7c3aed;
@text-color: #1e293b;
@light-bg: #f8fafc;
@border-color: #e2e8f0;
@radius: 8px;
@shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

.list-key-guide {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: @primary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  color: @primary-color;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid @border-color;

  .section-icon {
    font-size: 1.3rem;
  }
}

.concept-section {
  .definition-card {
    background: white;
    border-radius: @radius;
    box-shadow: @shadow;
    padding: 20px;
    margin-bottom: 20px;

    p {
      margin: 10px 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    code {
      background: #f1f5f9;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9em;
      color: #334155;
    }
  }
}

.code-example {
  pre {
    background: #1e293b;
    border-radius: @radius;
    padding: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: #e2e8f0;
    }
  }
}

.why-section {
  .reason-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;

    .reason-card {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;
      text-align: center;

      .reason-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      h3 {
        margin: 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #64748b;
        font-size: 0.9rem;
      }
    }
  }
}

.work-section {
  .work-steps {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;

    .step {
      display: flex;
      gap: 15px;
      align-items: center;

      .step-number {
        background: @primary-color;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 5px 0;
          color: @text-color;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.9rem;
        }
      }
    }
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .comparison-item {
      h4 {
        margin: 0 0 10px 0;
        text-align: center;
      }

      p {
        text-align: center;
        margin: 10px 0 0;
        font-size: 0.9rem;
        color: #64748b;
      }
    }

    .comparison-visual {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 15px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      &.good {
        border-top: 4px solid #10b981;
      }

      &.bad {
        border-top: 4px solid #ef4444;
      }

      .node {
        background: #f1f5f9;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }
  }
}

.best-practice-section {
  .practice-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .practice-item {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;
      display: flex;
      gap: 15px;

      .practice-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .practice-content {
        h3 {
          margin: 0 0 10px 0;
          color: @secondary-color;
        }

        p {
          margin: 0 0 10px 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        pre {
          background: #f1f5f9;
          border-radius: 4px;
          padding: 10px;
          overflow-x: auto;
          margin: 0;

          code {
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            color: #334155;
          }
        }
      }
    }
  }
}

.summary-section {
  background: @light-bg;
  border-radius: @radius;
  padding: 25px;

  h2 {
    color: @primary-color;
    margin-top: 0;
    text-align: center;
  }

  .summary-content {
    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        font-weight: 500;

        strong {
          color: @secondary-color;
        }
      }
    }

    .final-tip {
      background: rgba(79, 70, 229, 0.1);
      padding: 15px;
      border-radius: @radius;
      border-left: 4px solid @primary-color;
      margin-top: 20px;
      text-align: center;

      p {
        margin: 0;
        color: @primary-color;
        font-weight: 500;
      }
    }
  }
}

@media (max-width: 768px) {
  .list-key-guide {
    padding: 15px;
  }

  .hero-section {
    h1 {
      font-size: 2rem;
    }
  }
}
</style>
