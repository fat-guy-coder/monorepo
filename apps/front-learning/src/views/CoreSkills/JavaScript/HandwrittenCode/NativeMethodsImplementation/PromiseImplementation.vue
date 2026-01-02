<template>
  <div class="promise-implementation-container">
    <div class="header">
      <h1>Promise 实现基础介绍</h1>
      <p class="subtitle">深入理解 Promise/A+ 规范并实现完整 Promise</p>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">📜</span> Promise/A+ 规范概述</h2>
        <div class="specification-content">
          <div class="spec-card">
            <h3>核心规范要点</h3>
            <ul>
              <li>
                <strong>状态机制</strong>：Promise 必须处于 pending、fulfilled 或 rejected
                三种状态之一
              </li>
              <li>
                <strong>不可变性</strong>：状态一旦改变（从 pending 到 fulfilled/rejected）不可逆转
              </li>
              <li>
                <strong>值传递</strong>：必须有一个 value（fulfillment 值）或 reason（rejection
                原因）
              </li>
              <li><strong>链式调用</strong>：then 方法必须返回一个新的 Promise</li>
              <li><strong>异步执行</strong>：then 方法的回调必须异步执行</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3>Promise 状态转换图</h3>
            <div class="state-diagram">
              <div class="state pending">
                <div class="state-label">Pending</div>
                <div class="state-arrows">
                  <div class="arrow fulfill">fulfill →</div>
                  <div class="arrow reject">reject →</div>
                </div>
              </div>
              <div class="state-group">
                <div class="state fulfilled">
                  <div class="state-label">Fulfilled</div>
                  <div class="state-value">value: any</div>
                </div>
                <div class="state rejected">
                  <div class="state-label">Rejected</div>
                  <div class="state-value">reason: any</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <h2><span class="icon">🧠</span> 实现思路</h2>
        <div class="approach-grid">
          <div class="approach-card">
            <div class="approach-icon">🔄</div>
            <h3>状态管理</h3>
            <ul>
              <li>使用内部状态变量：<code>state</code>（pending/fulfilled/rejected）</li>
              <li>存储结果值：<code>value</code> 或 <code>reason</code></li>
              <li>状态转换后不可更改</li>
            </ul>
          </div>

          <div class="approach-card">
            <div class="approach-icon">🔄</div>
            <h3>观察者模式</h3>
            <ul>
              <li>一个实例注册多个then</li>
              <li>观察者模式</li>
              <li>使用队列存储回调函数then或者catch</li>
              <li>状态改变时，执行队列中的回调函数</li>
            </ul>
          </div>

          <div class="approach-card">
            <div class="approach-icon">⛓️</div>
            <h3>链式调用</h3>
            <ul>
              <li><code>then</code> 方法返回新 Promise</li>
              <li>处理回调函数返回值（值或新 Promise）</li>
              <li>把新 Promise的resolve和reject挂到then回调中返回的promise的resolve和reject中</li>
              <li>如果是普通值，则新 Promise的直接resolve(穿透给下一个then)</li>
              <li>实现值穿透功能</li>
            </ul>
          </div>

          <div class="approach-card">
            <div class="approach-icon">⏱️</div>
            <h3>异步处理</h3>
            <ul>
              <li>使用队列存储回调函数</li>
              <li>通过 <code>setTimeout</code> 或 <code>queueMicrotask</code> 实现异步</li>
              <li>确保执行顺序符合规范</li>
            </ul>
          </div>

          <div class="approach-card">
            <div class="approach-icon">🚨</div>
            <h3>错误处理</h3>
            <ul>
              <li>捕获执行器（executor）中的错误</li>
              <li>处理 then 回调中的异常</li>
              <li>实现错误冒泡机制</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="code-section">
        <h2><span class="icon">💻</span> Promise 完整实现</h2>

        <div class="code-container">
          <div class="code-header">
            <div class="code-title">MyPromise.ts - 符合 Promise/A+ 规范的实现</div>
          </div>
          <code-block :code="codeText" language="ts" />
        </div>
      </section>

      <section class="features-section">
        <h2><span class="icon">✨</span> 实现功能特性</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>核心功能</h3>
            <ul>
              <li>状态管理（pending/fulfilled/rejected）</li>
              <li>异步执行（使用微任务）</li>
              <li>链式调用（then 返回新 Promise）</li>
              <li>错误冒泡和捕获</li>
              <li>值穿透功能</li>
            </ul>
          </div>

          <div class="feature-card">
            <h3>静态方法</h3>
            <ul>
              <li>MyPromise.resolve()</li>
              <li>MyPromise.reject()</li>
              <li>MyPromise.allSettled()</li>
              <li>MyPromise.all()</li>
              <li>MyPromise.any()</li>
              <li>MyPromise.race()</li>
            </ul>
          </div>

          <div class="feature-card">
            <h3>实例方法</h3>
            <ul>
              <li>then()</li>
              <li>catch()</li>
              <li>finally()</li>
            </ul>
          </div>

          <div class="feature-card">
            <h3>高级特性</h3>
            <ul>
              <li>处理 thenable 对象</li>
              <li>防止循环引用</li>
              <li>空数组处理（all/race）</li>
              <li>错误边界处理</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> 实现关键点</h2>
        <div class="points-grid">
          <div class="point-card">
            <h3>异步执行</h3>
            <p>使用 <code>queueMicrotask</code> 实现微任务，确保执行顺序符合 Promise/A+ 规范</p>
          </div>

          <div class="point-card">
            <h3>链式调用</h3>
            <p>每次调用 <code>then</code> 都返回新 Promise，实现真正的链式调用</p>
          </div>

          <div class="point-card">
            <h3>值穿透</h3>
            <p>当 <code>then</code> 的参数不是函数时，创建默认函数传递值</p>
          </div>

          <div class="point-card">
            <h3>错误处理</h3>
            <p>使用 try/catch 包裹所有回调执行，确保错误能被捕获</p>
          </div>

          <div class="point-card">
            <h3>循环引用检测</h3>
            <p>在 <code>resolvePromise</code> 中检查 promise2 是否等于 x</p>
          </div>

          <div class="point-card">
            <h3>thenable 处理</h3>
            <p>递归解析 thenable 对象，兼容其他 Promise 实现</p>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Promise/A+ 规范实现 | 深入理解 JavaScript 异步编程</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeBlock from '@/components/Code/index.vue'
import { onMounted, ref, onUnmounted } from 'vue'

const codeText = ref('')

onMounted(async () => {
  const { code } = await import('./PromiseCorrelation/promise.ts')
  codeText.value = code
})
onUnmounted(() => {
  codeText.value = ''
})
</script>

<style lang="less" scoped>



.promise-implementation-container {
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
    .specification-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;

      .spec-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.2rem;
        }

        ul {
          padding-left: 1.2rem;

          li {
            margin-bottom: 0.8rem;
            line-height: 1.6;

            strong {
              color: #3498db;
            }
          }
        }

        .state-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1.5rem;

          .state {
            padding: 1.2rem;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 1rem;
            width: 80%;

            &.pending {
              background: #fff8e1;
              border: 2px solid #ffecb3;
            }

            .state-label {
              font-weight: 600;
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
            }

            .state-arrows {
              display: flex;
              justify-content: space-around;
              margin-top: 1rem;

              .arrow {
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-weight: 500;

                &.fulfill {
                  background: #c8e6c9;
                  border: 1px solid #a5d6a7;
                }

                &.reject {
                  background: #ffcdd2;
                  border: 1px solid #ef9a9a;
                }
              }
            }
          }

          .state-group {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .state {
              width: 48%;

              &.fulfilled {
                background: #c8e6c9;
                border: 2px solid #a5d6a7;
              }

              &.rejected {
                background: #ffcdd2;
                border: 2px solid #ef9a9a;
              }

              .state-value {
                font-size: 0.9rem;
                color: #4a5568;
                margin-top: 0.5rem;
                font-style: italic;
              }
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .approach-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .approach-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.8rem 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        text-align: center;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
        }

        .approach-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
        }

        h3 {
          font-size: 1.25rem;
          color: #2c3e50;
          margin-bottom: 0.8rem;
        }

        ul {
          padding-left: 1.2rem;
          text-align: left;
          margin: 0;

          li {
            margin-bottom: 0.6rem;
            color: #4a5568;
            font-size: 0.97rem;
            line-height: 1.5;

            code {
              background: #edf2f7;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
            }
          }
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
          content: '// MyPromise 实现 - 符合 Promise/A+ 规范';
          display: block;
          color: #81e6d9;
          margin-bottom: 1.2rem;
          font-style: italic;
        }
      }
    }
  }

  .features-section {
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.8rem;

      .feature-card {
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

  .testing-section {
    .test-cases {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.8rem;

      .test-case {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1rem;
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

  .best-practices {
    .points-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;

      .point-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
        }

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          margin: 0;
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

    .specification-content,
    .test-cases {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
