<template>
  <div class="function-composition-guide">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <h1>函数组合 (Function Composition)</h1>
      <p class="subtitle">构建复杂逻辑的简单方式</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <h2 class="section-title">
          <span class="section-icon">🧩</span>
          <span>什么是函数组合？</span>
        </h2>

        <div class="concept-content">
          <div class="definition-card">
            <p>函数组合是将多个简单函数组合成一个更复杂函数的技术，数学上表示为：</p>
            <p class="math-formula">(f ∘ g)(x) = f(g(x))</p>
            <p>即一个函数的输出作为另一个函数的输入。</p>
          </div>

          <div class="analogy-card">
            <h3>类比理解</h3>
            <p>就像工厂的流水线，每个工人(函数)完成一项特定工作，然后将产品传递给下一个工人。</p>
            <div class="assembly-line">
              <div class="worker">拆箱</div>
              <div class="arrow">→</div>
              <div class="worker">检查</div>
              <div class="arrow">→</div>
              <div class="worker">组装</div>
              <div class="arrow">→</div>
              <div class="worker">包装</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 实现方式 -->
      <section class="implementation-section">
        <h2 class="section-title">
          <span class="section-icon">⚙️</span>
          <span>实现方式</span>
        </h2>

        <div class="implementation-methods">
          <div class="method-card">
            <h3>1. 手动组合</h3>
            <pre><code>const add5 = x => x + 5;
const square = x => x * x;
const shout = x => `${x}!`;

// 手动组合
const processNumber = x => shout(square(add5(x)));

console.log(processNumber(2)); // "49!"</code></pre>
          </div>

          <div class="method-card">
            <h3>2. 使用组合函数</h3>
            <pre><code>// 组合工具函数
const compose = (...fns) =>
  x => fns.reduceRight((acc, fn) => fn(acc), x);

// 使用组合
const processNumber = compose(
  shout,
  square,
  add5
);

console.log(processNumber(2)); // "49!"</code></pre>
          </div>

          <div class="method-card">
            <h3>3. 管道式组合</h3>
            <pre><code>// 管道工具函数 (从左到右)
const pipe = (...fns) =>
  x => fns.reduce((acc, fn) => fn(acc), x);

// 使用管道
const processNumber = pipe(
  add5,
  square,
  shout
);

console.log(processNumber(2)); // "49!"</code></pre>
            <p class="note">管道与组合相同，只是执行顺序相反</p>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-case-section">
        <h2 class="section-title">
          <span class="section-icon">🎯</span>
          <span>使用场景</span>
        </h2>

        <div class="use-case-cards">
          <div class="use-case-card">
            <div class="icon">📊</div>
            <h3>数据处理流水线</h3>
            <pre><code>// 数据转换流水线
const processUserData = pipe(
  fetchUserData,
  normalizeData,
  filterInactiveUsers,
  sortByRegistrationDate,
  formatForDisplay
);</code></pre>
          </div>

          <div class="use-case-card">
            <div class="icon">🛡️</div>
            <h3>验证链</h3>
            <pre><code>// 表单验证组合
const validateForm = pipe(
  validateEmail,
  validatePassword,
  validateAge,
  validateTerms
);

const errors = validateForm(formData);</code></pre>
          </div>

          <div class="use-case-card">
            <div class="icon">🔧</div>
            <h3>中间件组合</h3>
            <pre><code>// Express/Koa 中间件组合
const middleware = compose(
  logger,
  authenticate,
  parseBody,
  handleRequest
);</code></pre>
          </div>
        </div>
      </section>

      <!-- 优点与缺点 -->
      <section class="pros-cons-section">
        <h2 class="section-title">
          <span class="section-icon">⚖️</span>
          <span>优点与缺点</span>
        </h2>

        <div class="pros-cons-grid">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>
                <strong>代码简洁</strong>
                <p>将复杂逻辑分解为小函数，提高可读性</p>
              </li>
              <li>
                <strong>可重用性</strong>
                <p>小函数可以在不同组合中重复使用</p>
              </li>
              <li>
                <strong>易于测试</strong>
                <p>每个小函数可以单独测试，组合后也容易测试</p>
              </li>
              <li>
                <strong>声明式编程</strong>
                <p>关注"做什么"而非"怎么做"，代码更直观</p>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>
                <strong>调试困难</strong>
                <p>错误发生时调用栈较深，难以追踪</p>
              </li>
              <li>
                <strong>性能开销</strong>
                <p>多个函数调用可能带来轻微性能损失</p>
              </li>
              <li>
                <strong>学习曲线</strong>
                <p>需要适应函数式编程思维模式</p>
              </li>
              <li>
                <strong>过度分解</strong>
                <p>可能将简单问题过度分解为太多小函数</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practice-section">
        <h2 class="section-title">
          <span class="section-icon">🌟</span>
          <span>最佳实践</span>
        </h2>

        <div class="practice-tips">
          <div class="tip-card">
            <div class="tip-number">1</div>
            <div class="tip-content">
              <h3>保持函数纯净</h3>
              <p>确保组合中的每个函数都是纯函数，避免副作用</p>
            </div>
          </div>

          <div class="tip-card">
            <div class="tip-number">2</div>
            <div class="tip-content">
              <h3>合理命名</h3>
              <p>为组合函数和中间函数起描述性名称</p>
            </div>
          </div>

          <div class="tip-card">
            <div class="tip-number">3</div>
            <div class="tip-content">
              <h3>控制组合长度</h3>
              <p>避免过长的组合链，适当拆分</p>
            </div>
          </div>

          <div class="tip-card">
            <div class="tip-number">4</div>
            <div class="tip-content">
              <h3>添加调试信息</h3>
              <p>可以添加日志函数辅助调试</p>
              <pre><code>const log = msg => x => {
  console.log(msg, x);
  return x;
};

const process = compose(
  step1,
  log('After step1'),
  step2,
  log('After step2')
);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2>总结</h2>
        <div class="summary-content">
          <p>函数组合是函数式编程的核心技术，通过将小函数组合成复杂逻辑，可以创建更清晰、更模块化的代码。</p>
          <div class="key-points">
            <div class="point">
              <div class="point-icon">🧩</div>
              <p>从右到左执行 (compose) 或从左到右执行 (pipe)</p>
            </div>
            <div class="point">
              <div class="point-icon">📦</div>
              <p>每个函数应只做一件事，并做好</p>
            </div>
            <div class="point">
              <div class="point-icon">🔄</div>
              <p>组合纯函数可以获得最佳效果</p>
            </div>
          </div>
          <div class="final-tip">
            <p>在适当的场景使用函数组合，可以显著提高代码的可读性和可维护性！</p>
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

.function-composition-guide {
  max-width: 1000px;
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
    }

    .math-formula {
      font-family: 'Fira Code', monospace;
      font-size: 1.2rem;
      text-align: center;
      margin: 15px 0;
      color: @secondary-color;
      font-weight: 500;
    }
  }

  .analogy-card {
    background: white;
    border-radius: @radius;
    box-shadow: @shadow;
    padding: 20px;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    .assembly-line {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px 0;

      .worker {
        background: @light-bg;
        padding: 8px 15px;
        border-radius: @radius;
        font-weight: 500;
      }

      .arrow {
        margin: 0 10px;
        color: #64748b;
      }
    }
  }
}

.implementation-section {
  .implementation-methods {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .method-card {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;

      h3 {
        margin-top: 0;
        color: @secondary-color;
      }

      pre {
        background: #1e293b;
        border-radius: 4px;
        padding: 12px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #e2e8f0;
        }
      }

      .note {
        font-size: 0.85rem;
        color: #64748b;
        margin: 10px 0 0;
      }
    }
  }
}

.use-case-section {
  .use-case-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .use-case-card {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;

      .icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      h3 {
        margin: 10px 0;
        color: @secondary-color;
      }

      pre {
        background: #1e293b;
        border-radius: 4px;
        padding: 12px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          color: #e2e8f0;
        }
      }
    }
  }
}

.pros-cons-section {
  .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;

      h3 {
        margin-top: 0;
        color: @secondary-color;
        text-align: center;
      }

      ul {
        padding-left: 0;
        list-style: none;

        li {
          margin-bottom: 20px;
          padding-left: 30px;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 5px;
            width: 20px;
            height: 20px;
            background-size: contain;
          }

          strong {
            display: block;
            margin-bottom: 5px;
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

    .pros ul li::before {
      content: '✓';
      color: #10b981;
    }

    .cons ul li::before {
      content: '✗';
      color: #ef4444;
    }
  }
}

.best-practice-section {
  .practice-tips {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .tip-card {
      background: white;
      border-radius: @radius;
      box-shadow: @shadow;
      padding: 20px;
      display: flex;
      gap: 15px;

      .tip-number {
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

      .tip-content {
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
          margin: 10px 0 0;

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
    p {
      margin: 15px 0;
      text-align: center;
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;

      .point {
        background: white;
        border-radius: @radius;
        box-shadow: @shadow;
        padding: 20px;
        text-align: center;

        .point-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
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
  .function-composition-guide {
    padding: 15px;
  }

  .hero-section {
    h1 {
      font-size: 2rem;
    }
  }
}
</style>