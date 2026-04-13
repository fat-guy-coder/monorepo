<template>
  <div class="setup-principle-container">
    <div class="header">
      <h1>Vue3 setup 函数原理剖析</h1>
      <p class="subtitle">深入理解 Composition API 的核心机制</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">🔍</span> setup 函数概述</h2>
        <div class="intro-content">
          <p>
            setup 函数是 Vue3 Composition API 的核心，它在组件创建之前执行，用于替代 Vue2 的
            data、methods、computed 等选项。
          </p>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>设计目标</h3>
              <ul>
                <li>更好的逻辑复用与组织</li>
                <li>更灵活的代码组织方式</li>
                <li>更好的 TypeScript 支持</li>
                <li>更小的运行时体积</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h3>核心特性</h3>
              <ul>
                <li>在 beforeCreate 之前执行</li>
                <li>接收 props 和 context 参数</li>
                <li>返回对象将暴露给模板</li>
                <li>可返回渲染函数</li>
                <li>支持 async/await</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="execution-section">
        <h2><span class="icon">⏱️</span> setup 执行时机</h2>
        <div class="lifecycle-grid">
          <div class="lifecycle-card">
            <h3>组件生命周期时序</h3>
            <div class="lifecycle-chart">
              <div class="phase">初始化 props</div>
              <div class="arrow">↓</div>
              <div class="phase highlight">setup() 执行</div>
              <div class="arrow">↓</div>
              <div class="phase">beforeCreate 钩子</div>
              <div class="arrow">↓</div>
              <div class="phase">响应式系统初始化</div>
              <div class="arrow">↓</div>
              <div class="phase">created 钩子</div>
            </div>
          </div>

          <div class="lifecycle-card">
            <h3>关键特点</h3>
            <ul>
              <li><strong>在 beforeCreate 之前执行</strong> - 此时组件实例尚未创建</li>
              <li><strong>无法访问 this</strong> - 因为组件实例还未创建</li>
              <li><strong>只执行一次</strong> - 在组件初始化时执行</li>
              <li><strong>同步或异步</strong> - 可以返回 Promise 实现异步组件</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2><span class="icon">🧠</span> setup 实现原理</h2>

        <div class="principle-grid">
          <div class="principle-card">
            <h3>核心实现思路</h3>
            <ol>
              <li>在组件初始化阶段调用 setup 函数</li>
              <li>将 setup 返回的对象转换为响应式</li>
              <li>将响应式对象挂载到组件实例上</li>
              <li>处理 setup 返回的函数（作为方法）</li>
              <li>处理 setup 返回的渲染函数</li>
            </ol>
          </div>

          <div class="principle-card">
            <h3>简化实现流程</h3>
            <pre class="inline-code">
function createComponentInstance(vnode) {
  const instance = {
    vnode,
    type: vnode.type,
    setupState: {}, // setup 返回的状态
    props: {},
    attrs: {},
    slots: {},
    ctx: {},
    // ...其他属性
  }
  return instance
}

function setupComponent(instance) {
  // 初始化 props 和 slots
  initProps(instance)
  initSlots(instance)

  // 执行 setup 函数
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const Component = instance.type
  const { setup } = Component

  if (setup) {
    // 创建 setup 上下文
    const setupContext = createSetupContext(instance)

    // 执行 setup 函数
    const setupResult = setup(instance.props, setupContext)

    // 处理 setup 返回结果
    handleSetupResult(instance, setupResult)
  }
}</pre
            >
          </div>
        </div>
      </section>

      <section class="code-section">
        <h2><span class="icon">💻</span> 核心实现代码</h2>

        <div class="code-container">
          <div class="code-header">
            <div class="code-title">runtime-core/component.ts - 简化实现</div>
          </div>
          <pre class="code-block">
// 创建组件实例
function createComponentInstance(vnode) {
  const instance = {
    vnode,
    type: vnode.type,
    setupState: {},   // setup 返回的状态对象
    render: null,     // 渲染函数
    props: {},        // 组件 props
    attrs: {},        // 属性
    slots: {},        // 插槽
    emit: () => {},   // 事件触发器
    exposed: {},      // 暴露给 ref 的对象
    isMounted: false,
    // ...其他实例属性
  }
  return instance
}

// 处理 setup 函数
function setupStatefulComponent(instance) {
  const Component = instance.type

  // 创建代理上下文
  instance.proxy = new Proxy(instance.ctx, handler)

  const { setup } = Component
  if (setup) {
    // 创建 setup 函数参数
    const setupContext = createSetupContext(instance)

    // 设置当前实例
    setCurrentInstance(instance)

    // 执行 setup 函数
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      [instance.props, setupContext]
    )

    // 重置当前实例
    setCurrentInstance(null)

    // 处理 setup 结果
    handleSetupResult(instance, setupResult)
  } else {
    // 没有 setup 时的处理
    finishComponentSetup(instance)
  }
}

// 处理 setup 返回结果
function handleSetupResult(instance, setupResult) {
  if (typeof setupResult === 'function') {
    // setup 返回渲染函数
    instance.render = setupResult
  } else if (isObject(setupResult)) {
    // setup 返回对象
    instance.setupState = proxyRefs(setupResult)

    // 将 setupState 暴露给模板
    exposeToRender(instance)
  }

  // 确保有渲染函数
  finishComponentSetup(instance)
}

// 创建 setup 上下文
function createSetupContext(instance) {
  return {
    attrs: instance.attrs,
    slots: instance.slots,
    emit: instance.emit,
    expose: (exposed) => {
      instance.exposed = exposed || {}
    }
  }
}

// 将 setupState 暴露给模板
function exposeToRender(instance) {
  const { setupState } = instance
  Object.keys(setupState).forEach(key => {
    // 将 setupState 的属性代理到实例上
    Object.defineProperty(instance.ctx, key, {
      enumerable: true,
      configurable: true,
      get: () => setupState[key],
      set: NOOP
    })
  })
}</pre
          >
        </div>
      </section>

      <section class="key-points">
        <h2><span class="icon">❓</span> setup 为什么可以不用返回值？</h2>
        <h3>因为官网和论坛并无相关说明，所以这里只是猜测</h3>
        <div class="points-grid">
          <div class="point-card">
            <h3>1.通过通过acorn(或者babel)解析器解析的</h3>
            <p>acorn解析器解析后，获取到的AST树中的变量和方法挂载到组件实例上</p>
            <pre class="inline-code">
&lt;script setup&gt;
  const count = ref(0)
&lt;/script&gt;
转换成AST树
==>
{
  type: 'FunctionDeclaration',
  id: {
    type: 'Identifier',
    name: 'setup'
  },
  params: [],
}
==>将获得到变量和函数挂载到组件实例上，在模板中使用时，会自动解包ref值
</pre
            >
          </div>
        </div>
      </section>

      <section class="key-points">
        <h2><span class="icon">🔑</span> 关键实现细节</h2>
        <div class="points-grid">
          <div class="point-card">
            <h3>响应式处理</h3>
            <p>setup 返回的对象通过 proxyRefs 处理，自动解包 ref</p>
            <pre class="inline-code">instance.setupState = proxyRefs(setupResult)</pre>
          </div>

          <div class="point-card">
            <h3>上下文创建</h3>
            <p>创建包含 attrs、slots、emit 的 setupContext</p>
            <pre class="inline-code">
const setupContext = {
  attrs: instance.attrs,
  slots: instance.slots,
  emit: instance.emit
}</pre
            >
          </div>

          <div class="point-card">
            <h3>错误处理</h3>
            <p>使用 callWithErrorHandling 包裹 setup 执行</p>
            <pre class="inline-code">callWithErrorHandling(setup, instance, [props, context])</pre>
          </div>

          <div class="point-card">
            <h3>渲染函数处理</h3>
            <p>当 setup 返回函数时，作为组件的渲染函数</p>
            <pre class="inline-code">
if (typeof setupResult === 'function') {
  instance.render = setupResult
}</pre
            >
          </div>

          <div class="point-card">
            <h3>暴露实例</h3>
            <p>通过 expose 方法暴露特定属性</p>
            <pre class="inline-code">
setup(props, { expose }) {
  expose({ publicMethod })
}</pre
            >
          </div>

          <div class="point-card">
            <h3>异步组件支持</h3>
            <p>setup 可以返回 Promise 实现异步组件</p>
            <pre class="inline-code">
setup() {
  const data = await fetchData()
  return { data }
}</pre
            >
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2><span class="icon">🆚</span> setup 与 Options API 对比</h2>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>Options API</h3>
            <ul>
              <li>基于选项组织代码</li>
              <li>data、methods、computed 分离</li>
              <li>逻辑关注点分散</li>
              <li>this 上下文访问</li>
              <li>生命周期钩子函数</li>
            </ul>
          </div>

          <div class="comparison-card">
            <h3>Composition API (setup)</h3>
            <ul>
              <li>基于逻辑功能组织代码</li>
              <li>逻辑可组合复用</li>
              <li>逻辑关注点集中</li>
              <li>无 this 上下文</li>
              <li>生命周期钩子函数</li>
            </ul>
          </div>

          <div class="comparison-card">
            <h3>实现差异</h3>
            <ul>
              <li>setup 在组件创建前执行</li>
              <li>Options API 在组件创建后处理</li>
              <li>setup 返回对象被代理到实例</li>
              <li>Options API 直接挂载到实例</li>
              <li>setup 提供更细粒度的响应式控制</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Vue3 Composition API 核心原理 | setup 函数实现机制</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示原理，无逻辑代码
</script>

<style lang="less" scoped>


.setup-principle-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
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
      background: linear-gradient(90deg, #3498db, #9b59b6);
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
      color: #9b59b6;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #f5eef8;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .intro-section {
    .intro-content {
      p {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #4a5568;
        margin-bottom: 1.5rem;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.8rem;

        .feature-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.8rem 1.5rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(155, 89, 182, 0.12);
            border-color: #9b59b6;
          }

          .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1.2rem;
            color: #9b59b6;
          }

          h3 {
            font-size: 1.25rem;
            color: #2c3e50;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.97rem;
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

  .execution-section {
    .lifecycle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;

      .lifecycle-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .lifecycle-chart {
          background: #f0f4f8;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;

          .phase {
            padding: 1rem;
            background: white;
            border-radius: 6px;
            margin-bottom: 0.5rem;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            &.highlight {
              background: #e8d6f0;
              border-left: 4px solid #9b59b6;
              color: #8e44ad;
              font-weight: 600;
            }
          }

          .arrow {
            padding: 0.5rem;
            color: #a0aec0;
            font-size: 1.2rem;
          }
        }

        ul {
          padding-left: 1.2rem;

          li {
            margin-bottom: 1rem;
            line-height: 1.6;

            strong {
              color: #9b59b6;
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .principle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;

      .principle-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.2rem;
        }

        ol {
          padding-left: 1.5rem;

          li {
            margin-bottom: 1rem;
            line-height: 1.6;
            padding-left: 0.5rem;
          }
        }

        .inline-code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          line-height: 1.6;
        }
      }
    }
  }

  .code-section {
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

        &::before {
          content: '// Vue3 setup 函数核心实现 (简化版)';
          display: block;
          color: #81e6d9;
          margin-bottom: 1.2rem;
          font-style: italic;
        }
      }
    }
  }

  .key-points,
  .comparison-section {
    .points-grid,
    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .point-card,
      .comparison-card {
        background: #f8fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
          border-color: #9b59b6;
        }

        h3 {
          font-size: 1.15rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        ul {
          padding-left: 1.2rem;
          margin-bottom: 1rem;

          li {
            margin-bottom: 0.7rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }

        .inline-code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          display: block;
          margin-top: 0.8rem;
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

    .feature-grid,
    .lifecycle-grid,
    .principle-grid,
    .points-grid,
    .comparison-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
