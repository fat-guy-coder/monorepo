<template>
  <div class="computed-principle-container">
    <div class="header">
      <h1>Vue3 Computed 属性原理剖析</h1>
      <p class="subtitle">深入理解响应式计算属性的工作机制与实现</p>
    </div>

    <div class="content">
      <section class="design-section">
        <h2><span class="icon">💡</span> 设计思路</h2>
        <div class="design-grid">
          <div class="design-card">
            <div class="design-icon">🛋️</div>
            <h3>惰性求值</h3>
            <p>计算属性不会立即执行，只有在实际被访问时才会进行计算</p>
          </div>

          <div class="design-card">
            <div class="design-icon">🔍</div>
            <h3>依赖追踪</h3>
            <p>通过 Proxy 自动追踪依赖的响应式数据，建立依赖关系图</p>
          </div>

          <div class="design-card">
            <div class="design-icon">📦</div>
            <h3>结果缓存</h3>
            <p>依赖项未变化时直接返回缓存结果，避免重复计算</p>
          </div>

          <div class="design-card">
            <div class="design-icon">🔄</div>
            <h3>自动更新</h3>
            <p>当依赖项变化时自动标记为"脏数据"，下次访问重新计算</p>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2><span class="icon">💻</span> 核心实现</h2>
        <div class="code-container">
          <div class="code-header">
            <div class="code-title">computed.ts - Computed 实现源码</div>
            <div class="code-tabs">
              <span class="active">TypeScript</span>
            </div>
          </div>
          <pre class="code-block">class ComputedRefImpl&lt;T&gt; {
  private _value!: T
  private _dirty = true
  public readonly effect: ReactiveEffect&lt;T&gt;
  public readonly __v_isRef = true

  constructor(
    getter: ComputedGetter&lt;T&gt;,
    private readonly _setter: ComputedSetter&lt;T&gt;
  ) {
    // 创建响应式 effect
    this.effect = new ReactiveEffect(
      getter,
      () =&gt; {
        // 依赖变化时的调度函数
        if (!this._dirty) {
          this._dirty = true
          // 触发依赖更新
          trigger(toRaw(this), TriggerOpTypes.SET, 'value')
        }
      }
    )

    // 设置 effect 计算属性标志
    this.effect.computed = this
  }

  get value() {
    // 如果数据已过期，重新计算
    if (this._dirty) {
      this._value = this.effect.run()
      this._dirty = false
    }
    // 收集当前依赖
    track(toRaw(this), TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}

export function computed&lt;T&gt;(
  getterOrOptions: ComputedGetter&lt;T&gt; | WritableComputedOptions&lt;T&gt;
) {
  let getter: ComputedGetter&lt;T&gt;
  let setter: ComputedSetter&lt;T&gt;

  // 处理不同参数形式
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = () =&gt; {
      console.warn('Write operation failed: computed value is readonly')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedRefImpl(
    getter,
    setter
  ) as any
}</pre>
        </div>
      </section>

      <section class="workflow-section">
        <h2><span class="icon">🔧</span> 工作流程</h2>
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>创建阶段</h3>
              <ul>
                <li>接收 getter 函数和可选的 setter</li>
                <li>创建 ReactiveEffect 实例</li>
                <li>设置 computed 标志</li>
                <li>初始化 _dirty 为 true</li>
              </ul>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>首次访问</h3>
              <ul>
                <li>检查 _dirty 标志为 true</li>
                <li>执行 effect.run() 获取值</li>
                <li>追踪所有依赖的响应式属性</li>
                <li>将 _dirty 设为 false</li>
                <li>返回计算结果</li>
              </ul>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>依赖变更</h3>
              <ul>
                <li>依赖项触发 set 操作</li>
                <li>执行调度函数 (scheduler)</li>
                <li>标记 _dirty 为 true</li>
                <li>触发 computed 的更新通知</li>
              </ul>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>再次访问</h3>
              <ul>
                <li>检查到 _dirty 为 true</li>
                <li>重新执行计算函数</li>
                <li>更新缓存值</li>
                <li>重置 _dirty 为 false</li>
                <li>返回新计算结果</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="key-points">
        <h2><span class="icon">🔑</span> 关键实现细节</h2>
        <div class="points-grid">
          <div class="point-card">
            <h3>ReactiveEffect 的作用</h3>
            <p>包装 getter 函数，提供依赖追踪和重新执行能力</p>
            <pre class="inline-code">new ReactiveEffect(getter, scheduler)</pre>
          </div>

          <div class="point-card">
            <h3>调度器 (scheduler)</h3>
            <p>在依赖变更时标记脏状态而不立即重新计算</p>
            <pre class="inline-code">() => { this._dirty = true }</pre>
          </div>

          <div class="point-card">
            <h3>惰性求值实现</h3>
            <p>通过 _dirty 标志控制计算函数的执行时机</p>
            <pre class="inline-code">if (this._dirty) {
  // 重新计算
}</pre>
          </div>

          <div class="point-card">
            <h3>依赖追踪机制</h3>
            <p>在 getter 执行时自动收集依赖关系</p>
            <pre class="inline-code">track(toRaw(this), TrackOpTypes.GET, 'value')</pre>
          </div>

          <div class="point-card">
            <h3>缓存机制</h3>
            <p>将计算结果存储在 _value 属性中</p>
            <pre class="inline-code">this._value = this.effect.run()</pre>
          </div>

          <div class="point-card">
            <h3>更新通知</h3>
            <p>在数据变脏时通知所有依赖项</p>
            <pre class="inline-code">trigger(toRaw(this), TriggerOpTypes.SET, 'value')</pre>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Vue3 响应式系统核心 | Computed 属性实现原理</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示原理，无逻辑代码
</script>

<style lang="less" scoped>


.computed-principle-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #3498db;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e0f7fa;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .design-section {
    .design-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;
      margin-top: 1.2rem;

      .design-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        text-align: center;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(52, 152, 219, 0.12);
          border-color: #3498db;
        }

        .design-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
        }

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-bottom: 0.8rem;
        }

        p {
          color: #4a5568;
          font-size: 0.97rem;
          line-height: 1.6;
          margin: 0;
        }
      }
    }
  }

  .implementation-section {
    .code-container {
      background: #2d3748;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);

      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.9rem 1.5rem;
        background: #1a202c;
        border-bottom: 1px solid #2d3748;

        .code-title {
          color: #cbd5e0;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .code-tabs {
          span {
            background: #3498db;
            color: white;
            padding: 0.4rem 0.9rem;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 500;

            &.active {
              background: #2c5282;
            }
          }
        }
      }

      .code-block {
        margin: 0;
        padding: 1.8rem;
        color: #e2e8f0;
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        line-height: 1.7;
        overflow-x: auto;
        background: #2d3748;
        counter-reset: line;

        &::before {
          content: "// ComputedRefImpl 实现";
          display: block;
          color: #81e6d9;
          margin-bottom: 1.2rem;
          font-style: italic;
        }
      }
    }
  }

  .workflow-section {
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .step {
        display: flex;
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .step-number {
          width: 42px;
          height: 42px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.3rem;
          margin-right: 1.2rem;
          flex-shrink: 0;
        }

        .step-content {
          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0 0 0.8rem 0;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .key-points {
    .points-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .point-card {
        background: #f8fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          border-color: #3498db;
          background: #edf7ff;
        }

        h3 {
          font-size: 1.15rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
        }

        .inline-code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 6px;
          padding: 0.8rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .design-grid,
    .workflow-steps,
    .points-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .code-container {
      .code-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
      }
    }
  }
}
</style>
