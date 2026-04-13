<template>
  <div class="currying-container">
    <header class="header">
      <div class="title-group">
        <h1>JavaScript 柯里化实现</h1>
        <p class="subtitle">函数式编程的核心技术</p>
      </div>
      <div class="pattern-meta">
        <span class="meta-item"> <i class="icon icon-function"></i> 高阶函数 </span>
        <span class="meta-item"> <i class="icon icon-partial"></i> 部分应用 </span>
        <span class="meta-item"> <i class="icon icon-compose"></i> 函数组合 </span>
      </div>
    </header>

    <div class="content-grid">
      <!-- 概念介绍 -->
      <div class="concept-section card">
        <h2 class="section-title"><i class="icon icon-info"></i> 什么是柯里化？</h2>
        <div class="concept-content">
          <div class="definition">
            <p>
              柯里化(Currying)是一种将多参数函数转换为一系列单参数函数的技术。通过柯里化，你可以逐步传递参数，直到所有参数都被提供，然后执行原函数。
            </p>
          </div>

          <div class="example">
            <h3>转换示例</h3>
            <div class="function-comparison">
              <div class="original">
                <pre><code>function add(a, b, c) {
  return a + b + c;
}

add(1, 2, 3); // 6</code></pre>
              </div>
              <div class="arrow">
                <i class="icon icon-arrow"></i>
              </div>
              <div class="curried">
                <pre><code>curriedAdd(1)(2)(3); // 6</code></pre>
                <pre><code>curriedAdd(1)(2, 3); // 6</code></pre>
                <pre><code>const addTwo = curriedAdd(1)(2);
addTwo(3); // 6</code></pre>
              </div>
            </div>
          </div>

          <div class="benefits">
            <h3>柯里化的优势</h3>
            <div class="benefits-grid">
              <div class="benefit">
                <div class="benefit-icon">
                  <i class="icon icon-reuse"></i>
                </div>
                <h4>代码复用</h4>
                <p>创建可复用的函数片段</p>
              </div>

              <div class="benefit">
                <div class="benefit-icon">
                  <i class="icon icon-composition"></i>
                </div>
                <h4>函数组合</h4>
                <p>便于函数组合和管道操作</p>
              </div>

              <div class="benefit">
                <div class="benefit-icon">
                  <i class="icon icon-lazy"></i>
                </div>
                <h4>延迟执行</h4>
                <p>参数不全时不执行函数</p>
              </div>

              <div class="benefit">
                <div class="benefit-icon">
                  <i class="icon icon-specialize"></i>
                </div>
                <h4>函数特化</h4>
                <p>基于通用函数创建专用函数</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现思路 -->
      <div class="implementation-section card">
        <h2 class="section-title"><i class="icon icon-lightbulb"></i> 实现思路</h2>
        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>返回新函数</h3>
              <p>柯里化函数返回一个新函数，该函数接收部分参数</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>参数累积</h3>
              <p>累积接收的参数，直到参数数量满足原函数要求</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>参数检查</h3>
              <p>当参数数量足够时，执行原函数并返回结果</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>递归调用</h3>
              <p>参数不足时，返回新函数继续收集参数</p>
            </div>
          </div>
        </div>

        <div class="visual-example">
          <div class="visual-title">柯里化过程可视化</div>
          <div class="visual-content">
            <div class="function-call"><span class="func-name">curry</span>(add)</div>
            <div class="arrow-down"></div>
            <div class="function-call"><span class="func-name">function</span>(a)</div>
            <div class="arrow-down"></div>
            <div class="function-call"><span class="func-name">function</span>(b)</div>
            <div class="arrow-down"></div>
            <div class="function-call"><span class="func-name">function</span>(c)</div>
            <div class="arrow-down"></div>
            <div class="function-result">a + b + c</div>
          </div>
        </div>
      </div>

      <!-- 基础实现 -->
      <div class="basic-implementation card">
        <h2 class="section-title"><i class="icon icon-code"></i> 基础实现</h2>

        <div class="code-section">
          <h3>基本柯里化函数</h3>
          <div class="code-description">
            <p>支持固定参数数量的简单柯里化</p>
          </div>
          <pre><code>function curry(fn) {
  return function curried(...args) {
    // 参数数量足够时执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // 参数不足时返回新函数继续收集参数
    else {
      return function(...nextArgs) {//利用了闭包的特性，curried函数被返回后，仍然可以访问外层函数的变量args
        return curried.apply(this, args.concat(nextArgs));
      }
    }
  };
}</code></pre>
        </div>

        <div class="usage-example">
          <h3>使用示例</h3>
          <div class="example-code">
            <pre><code>// 原始函数
function sum(a, b, c) {
  return a + b + c;
}

// 柯里化
const curriedSum = curry(sum);

// 使用方式
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// 创建部分应用函数
const addTwo = curriedSum(1)(2);
console.log(addTwo(5)); // 8</code></pre>
          </div>
        </div>
      </div>

      <!-- 高级实现 -->
      <div class="advanced-implementation card">
        <h2 class="section-title"><i class="icon icon-advanced"></i> 高级实现</h2>

        <div class="code-section">
          <h3>支持占位符的柯里化</h3>
          <div class="code-description">
            <p>使用特殊占位符允许跳过参数</p>
          </div>
          <pre><code>const _ = Symbol('placeholder');

function advancedCurry(fn) {
  return function curried(...args) {
    // 提取有效参数（过滤占位符）
    const validArgs = args.slice(0, fn.length);
    const hasPlaceholder = args.some(arg => arg === _);

    // 参数足够且无占位符时执行
    if (validArgs.length === fn.length && !hasPlaceholder) {
      return fn.apply(this, validArgs);
    }

    // 否则返回新函数继续收集
    return function(...nextArgs) {
      // 合并参数，用实际值替换占位符
      const mergedArgs = args.map(arg =>
        arg === _ && nextArgs.length ? nextArgs.shift() : arg
      ).concat(nextArgs);

      return curried.apply(this, mergedArgs);
    };
  };
}</code></pre>
        </div>

        <div class="usage-example">
          <h3>使用示例</h3>
          <div class="example-code">
            <pre><code>// 原始函数
function logInfo(date, importance, message) {
  return `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`;
}

// 柯里化
const curriedLog = advancedCurry(logInfo);

// 创建当前日志函数
const logNow = curriedLog(new Date());

// 使用占位符
const debugNow = curriedLog(new Date(), _, 'Debug info');

// 使用
console.log(logNow('INFO', 'System started'));
// [14:30] [INFO] System started

console.log(debugNow('DEBUG'));
// [14:30] [DEBUG] Debug info</code></pre>
          </div>
        </div>
      </div>

      <!-- 实际应用 -->
      <div class="applications-section card">
        <h2 class="section-title"><i class="icon icon-app"></i> 实际应用场景</h2>

        <div class="applications-grid">
          <div class="application">
            <div class="app-icon">
              <i class="icon icon-event"></i>
            </div>
            <h3>事件处理</h3>
            <p>创建预配置的事件处理器</p>
            <pre><code>const handleClick = (id, event) => {
  console.log(`Item ${id} clicked`, event);
};

const curriedHandle = curry(handleClick);

// 在组件中使用
items.map(item => (
  &lt;button onClick={curriedHandle(item.id)}&gt;
    {item.name}
  &lt;/button&gt;
));</code></pre>
          </div>

          <div class="application">
            <div class="app-icon">
              <i class="icon icon-api"></i>
            </div>
            <h3>API请求</h3>
            <p>创建预配置的API调用函数</p>
            <pre><code>const fetchData = curry((baseUrl, endpoint, params) => {
  return fetch(`${baseUrl}/${endpoint}`, { params });
});

const apiClient = fetchData('https://api.example.com');

// 使用
const getUser = apiClient('users');
const getProduct = apiClient('products');

getUser({ id: 123 });
getProduct({ category: 'books' });</code></pre>
          </div>

          <div class="application">
            <div class="app-icon">
              <i class="icon icon-validation"></i>
            </div>
            <h3>数据验证</h3>
            <p>创建可复用的验证规则</p>
            <pre><code>const validate = curry((rule, value) => rule.test(value));

// 创建验证规则
const isEmail = validate(/^\S+@\S+\.\S+$/);
const isPhone = validate(/^\d{10}$/);

// 使用
isEmail('test@example.com'); // true
isPhone('1234567890'); // true</code></pre>
          </div>

          <div class="application">
            <div class="app-icon">
              <i class="icon icon-transform"></i>
            </div>
            <h3>数据处理</h3>
            <p>创建数据转换管道</p>
            <pre><code>const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));

// 数据处理管道
const processData = pipe(
  filter(user => user.active),
  map(user => ({ ...user, name: user.name.toUpperCase() }))
);

// 使用
const users = [{/*...*/}];
const result = processData(users);</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-section card">
      <h2 class="section-title"><i class="icon icon-summary"></i> 柯里化要点总结</h2>
      <div class="summary-content">
        <div class="key-points">
          <div class="point">
            <h3><i class="icon icon-check"></i> 核心概念</h3>
            <p>将多参数函数转换为一系列单参数函数</p>
          </div>

          <div class="point">
            <h3><i class="icon icon-check"></i> 实现关键</h3>
            <p>参数累积和递归返回函数</p>
          </div>

          <div class="point">
            <h3><i class="icon icon-check"></i> 优势</h3>
            <p>函数复用、延迟执行、函数组合</p>
          </div>

          <div class="point">
            <h3><i class="icon icon-check"></i> 使用场景</h3>
            <p>事件处理、API封装、验证规则、数据处理管道</p>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践：</h3>
          <ul>
            <li>对于需要多次复用部分参数的函数使用柯里化</li>
            <li>避免对性能敏感的函数使用柯里化（可能增加调用开销）</li>
            <li>与函数组合（compose/pipe）结合使用效果更佳</li>
            <li>使用TypeScript添加类型支持，提高安全性</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Fun {
  (...args: any[]): any
}

interface CurriedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined
}

interface AdvancedCurriedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined
}
// 实际柯里化函数实现
function curry(fn: Fun): CurriedFunction<Fun> {
  return function curried(...args: Parameters<Fun>) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...nextArgs: Parameters<Fun>) {
        return curried.apply(this, args.concat(nextArgs))
      }
    }
  }
}

// 高级柯里化实现（带占位符）
const _ = Symbol('placeholder')

function advancedCurry(fn: Fun): AdvancedCurriedFunction<Fun> {
  return function curried(...args: Parameters<Fun>) {
    const validArgs = args.slice(0, fn.length)
    const hasPlaceholder = args.some((arg) => arg === _)

    if (validArgs.length === fn.length && !hasPlaceholder) {
      return fn.apply(this, validArgs)
    }

    return function (...nextArgs: Parameters<Fun>) {
      const mergedArgs = args
        .map((arg) => (arg === _ && nextArgs.length ? nextArgs.shift() : arg))
        .concat(nextArgs)

      return curried.apply(this, mergedArgs)
    }
  }
}

// 示例函数
function sum(a: number, b: number, c: number): number {
  return a + b + c
}

// 使用示例
const curriedSum = curry(sum)
console.log('Curried sum:', curriedSum(1)(2)(3)) // 6

// 高级柯里化示例
function logInfo(date: Date, importance: string, message: string): string {
  return `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`
}

const curriedLog = advancedCurry(logInfo)
const debugNow = curriedLog(new Date(), _, 'Debug info')
console.log('Debug log:', debugNow('DEBUG'))
</script>

<style lang="less" scoped>
.currying-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
  line-height: 1.6;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(38, 118, 252, 0.2);

    .title-group {
      margin-bottom: 1.2rem;

      h1 {
        font-weight: 700;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-top: 0;
      }
    }

    .pattern-meta {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.15);
        padding: 0.5rem 1.2rem;
        border-radius: 20px;
        font-size: 0.95rem;
        font-weight: 500;

        .icon {
          font-size: 1.1rem;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.8rem;
    margin-bottom: 2rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    background: #f8f9fa;
    margin: 0;
    padding: 1.2rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .icon {
      font-size: 1.2rem;
      color: #6a11cb;
    }
  }

  .concept-section {
    .concept-content {
      padding: 1.5rem;

      .definition {
        padding: 1.2rem;
        background: #f0f7ff;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        border-left: 4px solid #6a11cb;

        p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.7;
        }
      }

      .example {
        margin: 2rem 0;

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .function-comparison {
          display: flex;
          gap: 2rem;
          align-items: center;

          @media (max-width: 768px) {
            flex-direction: column;
            align-items: stretch;
          }

          .original,
          .curried {
            flex: 1;
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1.2rem;
            border: 1px solid #eaeaea;

            pre {
              margin: 0.5rem 0;

              code {
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
              }
            }
          }

          .arrow {
            .icon {
              font-size: 2rem;
              color: #6a11cb;
            }
          }
        }
      }

      .benefits {
        margin-top: 2rem;

        h3 {
          margin-top: 0;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;

          .benefit {
            text-align: center;
            padding: 1.5rem 1rem;
            background: #f9f5ff;
            border-radius: 10px;
            border: 1px solid #e9d8fd;

            .benefit-icon {
              width: 60px;
              height: 60px;
              background: #6a11cb;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem;

              .icon {
                color: white;
                font-size: 1.8rem;
              }
            }

            h4 {
              margin: 0 0 0.5rem;
              color: #2c3e50;
            }

            p {
              margin: 0;
              color: #666;
              font-size: 0.95rem;
            }
          }
        }
      }
    }
  }

  .implementation-section {
    .implementation-steps {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;

      .step {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 3px solid #6a11cb;

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          background: #6a11cb;
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .step-content {
          h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #555;
            font-size: 0.95rem;
          }
        }
      }
    }

    .visual-example {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: #f0f7ff;
      border-top: 1px solid #eaeaea;

      .visual-title {
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #6a11cb;
      }

      .visual-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .function-call {
          padding: 1rem 1.5rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          font-family: 'Fira Code', monospace;
          position: relative;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

          .func-name {
            color: #6a11cb;
            font-weight: 500;
          }

          &::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 15px;
            background: #6a11cb;
          }
        }

        .arrow-down {
          width: 2px;
          height: 20px;
          background: #6a11cb;
        }

        .function-result {
          padding: 1rem 1.5rem;
          background: #6a11cb;
          color: white;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          font-weight: 500;
        }
      }
    }
  }

  .basic-implementation,
  .advanced-implementation {
    .code-section {
      padding: 1.5rem;
      border-bottom: 1px solid #f0f0f0;

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-size: 1.1rem;
      }

      .code-description {
        margin-bottom: 1rem;

        p {
          margin: 0;
          color: #555;
          font-size: 0.95rem;
        }
      }

      pre {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;
        margin: 1rem 0;
        border: 1px solid #eaeaea;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #2d3748;

          .token.keyword {
            color: #d73a49;
          }
          .token.function {
            color: #6f42c1;
          }
          .token.operator {
            color: #d73a49;
          }
          .token.string {
            color: #032f62;
          }
          .token.comment {
            color: #6a737d;
          }
        }
      }
    }

    .usage-example {
      padding: 1.5rem;

      h3 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 1.1rem;
      }

      .example-code {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        border: 1px solid #eaeaea;

        pre {
          margin: 0;
        }
      }
    }
  }

  .applications-section {
    .applications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;

      .application {
        padding: 1.5rem;
        background: #f9fafb;
        border-radius: 8px;
        border: 1px solid #eaeaea;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .app-icon {
          width: 60px;
          height: 60px;
          background: #6a11cb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;

          .icon {
            color: white;
            font-size: 1.8rem;
          }
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        p {
          margin: 0 0 1rem;
          color: #666;
          font-size: 0.95rem;
        }

        pre {
          background: #f0f7ff;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 1rem;
          font-size: 0.85rem;

          code {
            font-family: 'Fira Code', monospace;
          }
        }
      }
    }
  }

  .summary-section {
    .summary-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .key-points {
        .point {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px dashed #eaeaea;

          &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          h3 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #555;
            padding-left: 1.8rem;
          }
        }
      }

      .best-practices {
        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 0.7rem;
            line-height: 1.5;
            position: relative;
            padding-left: 1.5rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: #6a11cb;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

// 图标样式
.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  &-function::before {
    content: 'functions';
  }
  &-partial::before {
    content: 'view_week';
  }
  &-compose::before {
    content: 'merge';
  }
  &-info::before {
    content: 'info';
  }
  &-lightbulb::before {
    content: 'lightbulb';
  }
  &-code::before {
    content: 'code';
  }
  &-advanced::before {
    content: 'rocket_launch';
  }
  &-app::before {
    content: 'apps';
  }
  &-summary::before {
    content: 'summarize';
  }
  &-reuse::before {
    content: 'loop';
  }
  &-composition::before {
    content: 'account_tree';
  }
  &-lazy::before {
    content: 'schedule';
  }
  &-specialize::before {
    content: 'build';
  }
  &-arrow::before {
    content: 'arrow_forward';
  }
  &-check::before {
    content: 'check_circle';
  }
  &-event::before {
    content: 'event';
  }
  &-api::before {
    content: 'cloud';
  }
  &-validation::before {
    content: 'fact_check';
  }
  &-transform::before {
    content: 'transform';
  }
}
</style>
