<template>
  <div class="tapable-container">
    <div class="header">
      <h1>Tapable 核心机制基础介绍</h1>
      <p class="subtitle">Webpack 插件系统的底层事件流控制库</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">🔌</span> 什么是 Tapable</h2>
        <div class="intro-content">
          <div class="definition-card">
            <p>Tapable 是一个小型 JavaScript 库，用于创建和管理事件驱动的钩子系统。它是 Webpack 插件架构的核心基础，提供了一套强大的事件发布/订阅机制。</p>
            <div class="key-points">
              <div class="point">
                <div class="point-icon">⚙️</div>
                <div class="point-content">
                  <h3>核心功能</h3>
                  <p>事件钩子的创建、管理和触发</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">🔗</div>
                <div class="point-content">
                  <h3>主要应用</h3>
                  <p>Webpack 插件系统的基础架构</p>
                </div>
              </div>
              <div class="point">
                <div class="point-icon">📦</div>
                <div class="point-content">
                  <h3>设计理念</h3>
                  <p>提供灵活的事件流控制机制</p>
                </div>
              </div>
            </div>
          </div>

          <div class="architecture">
            <h3>Tapable 在 Webpack 中的位置</h3>
            <div class="architecture-diagram">
              <div class="layer">
                <div class="layer-label">Webpack 核心</div>
                <div class="layer-items">
                  <div class="item">Compiler</div>
                  <div class="item">Compilation</div>
                  <div class="item">Module Factory</div>
                </div>
              </div>
              <div class="connector">↓</div>
              <div class="layer highlight">
                <div class="layer-label">Tapable 钩子系统</div>
                <div class="layer-items">
                  <div class="item">SyncHook</div>
                  <div class="item">AsyncParallelHook</div>
                  <div class="item">AsyncSeriesHook</div>
                </div>
              </div>
              <div class="connector">↓</div>
              <div class="layer">
                <div class="layer-label">插件系统</div>
                <div class="layer-items">
                  <div class="item">自定义插件</div>
                  <div class="item">第三方插件</div>
                  <div class="item">生命周期钩子</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hook-types-section">
        <h2><span class="icon">🧩</span> Tapable 钩子类型</h2>
        <div class="hook-types-grid">
          <div class="hook-card sync">
            <div class="hook-header">
              <h3>同步钩子</h3>
              <div class="hook-icon">⏱️</div>
            </div>
            <ul>
              <li><strong>SyncHook</strong> - 基本同步钩子</li>
              <li><strong>SyncBailHook</strong> - 熔断机制钩子</li>
              <li><strong>SyncWaterfallHook</strong> - 瀑布流钩子</li>
              <li><strong>SyncLoopHook</strong> - 循环执行钩子</li>
            </ul>
          </div>

          <div class="hook-card async">
            <div class="hook-header">
              <h3>异步钩子</h3>
              <div class="hook-icon">🌀</div>
            </div>
            <ul>
              <li><strong>AsyncParallelHook</strong> - 并行执行钩子</li>
              <li><strong>AsyncParallelBailHook</strong> - 并行熔断钩子</li>
              <li><strong>AsyncSeriesHook</strong> - 串行执行钩子</li>
              <li><strong>AsyncSeriesBailHook</strong> - 串行熔断钩子</li>
              <li><strong>AsyncSeriesWaterfallHook</strong> - 串行瀑布流钩子</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="api-section">
        <h2><span class="icon">🔧</span> 核心 API 与使用方法</h2>

        <div class="api-grid">
          <div class="api-card">
            <h3>创建钩子</h3>
            <pre class="code">const { SyncHook, AsyncSeriesHook } = require('tapable');

// 创建同步钩子
const hook = new SyncHook(['arg1', 'arg2']);

// 创建异步串行钩子
const asyncHook = new AsyncSeriesHook(['data']);</pre>
          </div>

          <div class="api-card">
            <h3>注册事件</h3>
            <pre class="code">// 同步注册
hook.tap('PluginName', (arg1, arg2) => {
  console.log('同步事件触发', arg1, arg2);
});

// 异步注册 (Promise)
asyncHook.tapPromise('PluginName', (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('异步事件完成', data);
      resolve();
    }, 1000);
  });
});

// 异步注册 (Callback)
asyncHook.tapAsync('PluginName', (data, callback) => {
  setTimeout(() => {
    console.log('回调式异步事件', data);
    callback();
  }, 500);
});</pre>
          </div>

          <div class="api-card">
            <h3>触发事件</h3>
            <pre class="code">// 触发同步钩子
hook.call('参数1', '参数2');

// 触发异步钩子 (Promise)
asyncHook.promise({ id: 1 }).then(() => {
  console.log('所有异步任务完成');
});

// 触发异步钩子 (Callback)
asyncHook.callAsync({ id: 2 }, (err) => {
  if (err) console.error(err);
  else console.log('回调式任务完成');
});</pre>
          </div>

          <div class="api-card">
            <h3>拦截器 API</h3>
            <pre class="code">// 注册拦截器
hook.intercept({
  // 每次注册事件时触发
  register: (tapInfo) => {
    console.log(`注册事件: ${tapInfo.name}`);
    return tapInfo;
  },

  // 事件触发前
  call: (...args) => {
    console.log('事件即将触发', args);
  },

  // 每个事件执行前
  tap: (tap) => {
    console.log(`即将执行事件: ${tap.name}`);
  }
});</pre>
          </div>
        </div>
      </section>

      <section class="hook-behavior-section">
        <h2><span class="icon">📊</span> 钩子行为模式</h2>
        <div class="behavior-grid">
          <div class="behavior-card">
            <h3>SyncBailHook 行为</h3>
            <div class="behavior-diagram">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">调用 call() 方法</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">顺序执行注册函数</div>
              </div>
              <div class="arrow">→</div>
              <div class="step condition">
                <div class="step-number">?</div>
                <div class="step-content">函数返回非 undefined</div>
              </div>
              <div class="arrow yes">是 →</div>
              <div class="step stop">
                <div class="step-number">✋</div>
                <div class="step-content">停止后续执行</div>
              </div>
              <div class="arrow no">↓ 否</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">继续执行下一个函数</div>
              </div>
            </div>
          </div>

          <div class="behavior-card">
            <h3>AsyncSeriesHook 行为</h3>
            <div class="behavior-diagram">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">调用 promise() 方法</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">执行第一个异步函数</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">等待完成/解析</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">执行下一个异步函数</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">...</div>
                <div class="step-content">直到所有函数完成</div>
              </div>
            </div>
          </div>

          <div class="behavior-card">
            <h3>SyncWaterfallHook 行为</h3>
            <div class="behavior-diagram">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">初始参数: value</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">函数1处理 value</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">返回新值 value1</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">函数2处理 value1</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-content">返回新值 value2</div>
              </div>
              <div class="arrow">→</div>
              <div class="step">
                <div class="step-number">...</div>
                <div class="step-content">传递到最后函数</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <h2><span class="icon">🚀</span> 使用场景</h2>
        <div class="use-case-grid">
          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🛠️</div>
              <h3>Webpack 插件系统</h3>
            </div>
            <div class="case-content">
              <p>Webpack 的核心对象（Compiler, Compilation）都扩展自 Tapable，提供了大量的生命周期钩子：</p>
              <ul>
                <li><code>compiler.hooks.compile</code> - 编译开始前</li>
                <li><code>compiler.hooks.emit</code> - 生成资源到 output 前</li>
                <li><code>compilation.hooks.optimizeChunks</code> - 优化 chunks 时</li>
              </ul>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🧩</div>
              <h3>自定义插件开发</h3>
            </div>
            <div class="case-content">
              <p>使用 Tapable 创建自定义插件系统：</p>
              <pre class="inline-code">class MyPluginSystem {
  constructor() {
    this.hooks = {
      beforeProcess: new AsyncSeriesHook(['data']),
      process: new SyncHook(['data']),
      afterProcess: new AsyncParallelHook(['result'])
    };
  }

  process(data) {
    this.hooks.beforeProcess.promise(data)
      .then(() => {
        this.hooks.process.call(data);
        return this.hooks.afterProcess.promise(data);
      });
  }
}</pre>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🔌</div>
              <h3>中间件架构</h3>
            </div>
            <div class="case-content">
              <p>构建类似 Koa/Express 的中间件系统：</p>
              <pre class="inline-code">class MiddlewareRunner {
  constructor() {
    this.hooks = new AsyncSeriesWaterfallHook(['ctx']);
  }

  use(fn) {
    this.hooks.tapPromise('middleware', async (ctx) => {
      await fn(ctx);
      return ctx;
    });
  }

  async run(ctx) {
    return this.hooks.promise(ctx);
  }
}</pre>
            </div>
          </div>

          <div class="use-case-card">
            <div class="case-header">
              <div class="case-icon">🔄</div>
              <h3>工作流引擎</h3>
            </div>
            <div class="case-content">
              <p>创建复杂的异步工作流程：</p>
              <pre class="inline-code">class Workflow {
  constructor() {
    this.hooks = {
      validate: new AsyncSeriesBailHook(['data']),
      process: new AsyncParallelHook(['data']),
      notify: new AsyncSeriesHook(['result'])
    };
  }

  async execute(data) {
    const valid = await this.hooks.validate.promise(data);
    if (!valid) throw new Error('验证失败');

    await this.hooks.process.promise(data);
    await this.hooks.notify.promise({ success: true });
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <h3>钩子命名规范</h3>
            <ul>
              <li>使用 camelCase 命名钩子</li>
              <li>前缀表示时机：beforeXxx, afterXxx</li>
              <li>后缀表示类型：XxxHook</li>
              <li>明确参数：new SyncHook(['module', 'source'])</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>性能优化</h3>
            <ul>
              <li>避免在热路径中使用同步钩子</li>
              <li>合理使用熔断钩子提前终止流程</li>
              <li>对于独立任务使用并行钩子</li>
              <li>减少不必要的拦截器使用</li>
            </ul>
          </div>

          <div class="practice-card">
            <h3>错误处理</h3>
            <ul>
              <li>异步钩子中使用 reject 传递错误</li>
              <li>SyncBailHook 中返回 Error 对象熔断</li>
              <li>使用 try/catch 包裹同步钩子调用</li>
              <li>提供全局错误处理拦截器</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Tapable 官方仓库: <a href="https://github.com/webpack/tapable"
          target="_blank">https://github.com/webpack/tapable</a></p>
      <p>版本: 2.2.1 | Webpack 核心事件流库</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑代码
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.tapable-container {
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

  .intro-section {
    .intro-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .definition-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }

        .key-points {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.2rem;

          .point {
            display: flex;
            background: white;
            border-radius: 8px;
            padding: 1rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            .point-icon {
              font-size: 1.8rem;
              margin-right: 1rem;
              color: #3498db;
            }

            .point-content {
              h3 {
                font-size: 1.1rem;
                margin: 0 0 0.3rem 0;
                color: #2c3e50;
              }

              p {
                font-size: 0.9rem;
                margin: 0;
                color: #718096;
              }
            }
          }
        }
      }

      .architecture {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .architecture-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;

          .layer {
            width: 80%;
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 1.2rem;
            margin-bottom: 1rem;
            text-align: center;
            background: white;

            &.highlight {
              background: #e3f2fd;
              border-color: #3498db;
              border-width: 2px;
            }

            .layer-label {
              font-weight: 600;
              margin-bottom: 0.8rem;
              font-size: 1.1rem;
            }

            .layer-items {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 0.8rem;

              .item {
                background: #edf2f7;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.9rem;
              }
            }
          }

          .connector {
            padding: 0.5rem;
            font-size: 1.5rem;
            color: #a0aec0;
          }
        }
      }
    }
  }

  .hook-types-section {
    .hook-types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.8rem;

      .hook-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        &.sync {
          border-top: 4px solid #3498db;
        }

        &.async {
          border-top: 4px solid #9b59b6;
        }

        .hook-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;

          h3 {
            font-size: 1.3rem;
            margin: 0;
            color: #2c3e50;
          }

          .hook-icon {
            font-size: 2rem;
          }
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
            color: #4a5568;
            font-size: 1rem;
            line-height: 1.5;

            strong {
              color: #3498db;
            }
          }
        }
      }
    }
  }

  .api-section {
    .api-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;

      .api-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 1.2rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          line-height: 1.6;
        }
      }
    }
  }

  .hook-behavior-section {
    .behavior-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .behavior-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.2rem;
          text-align: center;
        }

        .behavior-diagram {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;

          .step {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 8px;
            padding: 1rem;
            min-width: 100px;
            text-align: center;
            margin: 0.5rem;

            .step-number {
              font-weight: bold;
              font-size: 1.2rem;
              margin-bottom: 0.5rem;
            }

            .step-content {
              font-size: 0.85rem;
            }

            &.condition {
              background: #fff8e1;
              border-color: #ffecb3;
            }

            &.stop {
              background: #ffebee;
              border-color: #ffcdd2;
            }
          }

          .arrow {
            font-size: 1.5rem;
            color: #a0aec0;
            padding: 0 0.5rem;

            &.yes {
              color: #4caf50;
            }

            &.no {
              color: #f44336;
            }
          }
        }
      }
    }
  }

  .use-cases-section {
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.8rem;

      .use-case-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        .case-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .case-icon {
            font-size: 2rem;
            margin-right: 1rem;
            color: #3498db;
          }

          h3 {
            font-size: 1.3rem;
            margin: 0;
            color: #2c3e50;
          }
        }

        .case-content {
          p {
            color: #4a5568;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;

              code {
                background: #edf2f7;
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 0.85rem;
              }
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
  }

  .best-practices {
    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .practice-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
          }
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

    a {
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
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

    .api-grid,
    .hook-types-grid,
    .behavior-grid,
    .use-case-grid,
    .practices-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
