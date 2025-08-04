<template>
  <div class="float-container">
    <header class="header">
      <div class="title-container">
        <h1>JavaScript 浮点数精度问题解析</h1>
        <p class="subtitle">为什么 0.1 + 0.2 ≠ 0.3？深入理解与解决方案</p>
      </div>
      <div class="problem-example">
        <div class="code-block">
          <pre><code>console.log(0.1 + 0.2);
// 输出: 0.30000000000000004</code></pre>
        </div>
      </div>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <div class="section-title">内容导航</div>
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 问题现象 -->
        <section v-show="activeSection === 'problem'" class="section">
          <div class="section-header">
            <h2>浮点数精度问题现象</h2>
            <div class="tag">令人困惑的结果</div>
          </div>

          <div class="card">
            <div class="problem-grid">
              <div class="problem-card">
                <div class="problem-icon">🤔</div>
                <h3>直观的数学错误</h3>
                <p>在 JavaScript 中执行基本的数学运算时，有时会得到不符合预期的结果</p>
                <div class="code-block">
                  <pre><code>0.1 + 0.2 === 0.3; // false
0.1 + 0.2; // 0.30000000000000004</code></pre>
                </div>
              </div>

              <div class="problem-card">
                <div class="problem-icon">🔍</div>
                <h3>更多问题示例</h3>
                <p>这些不是个例，而是浮点数表示法的系统性问题</p>
                <div class="code-block">
                  <pre><code>0.7 * 10; // 6.999999999999999
0.1 + 0.4; // 0.5 (正确)
0.15 * 0.15; // 0.022500000000000003
1.005 * 100; // 100.49999999999999</code></pre>
                </div>
              </div>
            </div>

            <div class="consequences">
              <h3>精度问题带来的后果</h3>
              <div class="consequence-list">
                <div class="consequence">
                  <div class="icon">💰</div>
                  <div>
                    <h4>财务计算错误</h4>
                    <p>在金融应用中可能导致严重的计算错误</p>
                  </div>
                </div>
                <div class="consequence">
                  <div class="icon">📊</div>
                  <div>
                    <h4>数据不一致</h4>
                    <p>比较操作可能失败，导致逻辑错误</p>
                  </div>
                </div>
                <div class="consequence">
                  <div class="icon">📉</div>
                  <div>
                    <h4>科学计算偏差</h4>
                    <p>在科学计算中累积误差可能影响最终结果</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 问题原理 -->
        <section v-show="activeSection === 'principle'" class="section">
          <div class="section-header">
            <h2>问题原理分析</h2>
            <div class="tag">IEEE 754 标准</div>
          </div>

          <div class="card">
            <div class="ieee754">
              <h3>IEEE 754 双精度浮点数格式</h3>
              <div class="float-representation">
                <div class="sign-bit">
                  <div class="bit">1 bit</div>
                  <div class="label">符号位 (Sign)</div>
                </div>
                <div class="exponent">
                  <div class="bit">11 bits</div>
                  <div class="label">指数部分 (Exponent)</div>
                </div>
                <div class="mantissa">
                  <div class="bit">52 bits</div>
                  <div class="label">尾数部分 (Mantissa)</div>
                </div>
              </div>
              <div class="total-bits">64 bits 总长度</div>

              <div class="explanation">
                <p>JavaScript 使用 IEEE 754 标准的 64 位双精度浮点数表示所有数字：</p>
                <ul>
                  <li><strong>符号位 (1 bit)</strong>：决定数字的正负</li>
                  <li><strong>指数部分 (11 bits)</strong>：表示数字的规模</li>
                  <li><strong>尾数部分 (52 bits)</strong>：表示数字的精度</li>
                </ul>
              </div>
            </div>

            <div class="binary-problem">
              <h3>二进制表示问题</h3>
              <div class="problem-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>科学计数法 1.234 * 10^3 ===> 二进制 0(符号位) 10000000011(指数位) 1.00101011100(尾数位)</h3>
                    <h3>整数6二进制表示为 1110 那么6.1 二进制表示为 1110.1吗 </h3>
                    <h3>按照进制应该是8(1) 4(1) 2(1) 1(1) 0 0.5(1) 0.25(1) 0.125(1) 0.0625(1) 但是这样表示不了0.1</h3>
                    <h3>所以0.1 只能与小数点左边的计算方式相反(向右进位) 0.1*2=>0.2*2=>0.4*2=>0.8 相当于0.001(并且这个值还是为0.8并不是1) 继续切割0.8*2 = 1.6
                      1.6-1=0.6
                      这个0.6又要继续*2然后切割但是这样就无限循环了</h3>
                    <h3>所以最终0.1 表示为 0.0001100110011001100110011001100110011001100110011001101</h3>
                    <h3>所以计算机存储时太长只能存储近似值或者直接截取，所以一来二去就丢失了精度</h3>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>十进制转二进制</h4>
                    <p>0.1 在二进制中是无限循环小数：0.0001100110011...</p>
                    <div class="binary">0.1<sub>10</sub> = 0.0001100110011...<sub>2</sub></div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>存储限制</h4>
                    <p>64 位浮点数只能存储 52 位尾数，必须进行舍入</p>
                    <div class="binary">存储为: 0.0001100110011001100110011001100110011001100110011001101<sub>2</sub></div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>精度损失</h4>
                    <p>舍入导致精度损失，存储的值是近似值而非精确值</p>
                    <div class="binary">实际存储值: 0.1000000000000000055511151231257827</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="visualization">
              <h3>精度损失可视化</h3>
              <div class="precision-loss">
                <div class="real-value">实际值: 0.1</div>
                <div class="arrow">↓</div>
                <div class="stored-value">存储值: 0.1000000000000000055511151231257827</div>
                <div class="arrow">↓</div>
                <div class="difference">精度损失: 0.0000000000000000055511151231257827</div>
              </div>
              <div class="note">注：这种精度损失在多次运算中会累积放大</div>
            </div>
          </div>
        </section>

        <!-- 解决方案 -->
        <section v-show="activeSection === 'solutions'" class="section">
          <div class="section-header">
            <h2>解决方案与最佳实践</h2>
            <div class="tag">应对精度问题</div>
          </div>

          <div class="card">
            <div class="solution-methods">
              <div class="method">
                <div class="method-header">
                  <div class="method-icon">🔢</div>
                  <h3>转换为整数计算</h3>
                </div>
                <div class="method-desc">
                  <p>将浮点数转换为整数进行计算，然后再转换回浮点数</p>
                  <div class="code-block">
                    <pre><code>// 将浮点数转换为整数计算
function add(a, b) {
  const multiplier = Math.pow(10, Math.max(
    a.toString().split('.')[1]?.length || 0,
    b.toString().split('.')[1]?.length || 0
  ));

  return (a * multiplier + b * multiplier) / multiplier;
}

add(0.1, 0.2); // 0.3</code></pre>
                  </div>
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <div class="title">优点</div>
                    <ul>
                      <li>无需外部库</li>
                      <li>简单直观</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <div class="title">缺点</div>
                    <ul>
                      <li>处理大数可能溢出</li>
                      <li>需要知道小数位数</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="method">
                <div class="method-header">
                  <div class="method-icon">📦</div>
                  <h3>使用专用库</h3>
                </div>
                <div class="method-desc">
                  <p>使用专门处理精确数学运算的库</p>
                  <div class="libraries">
                    <div class="library">
                      <div class="name">decimal.js</div>
                      <div class="code">
                        <pre><code>import Decimal from 'decimal.js';

new Decimal(0.1).plus(0.2).toNumber(); // 0.3</code></pre>
                      </div>
                    </div>
                    <div class="library">
                      <div class="name">big.js</div>
                      <div class="code">
                        <pre><code>import Big from 'big.js';

new Big(0.1).plus(0.2).toNumber(); // 0.3</code></pre>
                      </div>
                    </div>
                    <div class="library">
                      <div class="name">math.js</div>
                      <div class="code">
                        <pre><code>import math from 'mathjs';

math.add(0.1, 0.2); // 0.3</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <div class="title">优点</div>
                    <ul>
                      <li>高精度计算</li>
                      <li>丰富的数学函数</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <div class="title">缺点</div>
                    <ul>
                      <li>增加项目体积</li>
                      <li>学习成本</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="method">
                <div class="method-header">
                  <div class="method-icon">🎯</div>
                  <h3>使用 toFixed 和 parseFloat</h3>
                </div>
                <div class="method-desc">
                  <p>对结果进行四舍五入处理，但需注意其局限性</p>
                  <div class="code-block">
                    <pre><code>// 使用 toFixed 处理显示
const result = 0.1 + 0.2; // 0.30000000000000004

// 转换为字符串并四舍五入
const fixed = result.toFixed(2); // "0.30"

// 转换回数字
parseFloat(fixed); // 0.3</code></pre>
                  </div>
                  <div class="warning">
                    <div class="icon">⚠️</div>
                    <div>
                      <strong>注意：</strong>
                      <p>toFixed() 返回的是字符串，且四舍五入规则可能不符合所有场景需求</p>
                    </div>
                  </div>
                </div>
                <div class="pros-cons">
                  <div class="pros">
                    <div class="title">优点</div>
                    <ul>
                      <li>内置方法无需依赖</li>
                      <li>简单易用</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <div class="title">缺点</div>
                    <ul>
                      <li>不适用于中间计算</li>
                      <li>精度控制有限</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="best-practices">
              <h3>最佳实践总结</h3>
              <div class="practices">
                <div class="practice">
                  <div class="icon">1</div>
                  <div class="content">
                    <h4>理解应用场景</h4>
                    <p>前端显示使用 toFixed，金融计算使用专用库</p>
                  </div>
                </div>
                <div class="practice">
                  <div class="icon">2</div>
                  <div class="content">
                    <h4>避免浮点数相等比较</h4>
                    <p>使用容差范围而非直接相等比较</p>
                    <div class="code-block">
                      <pre><code>// 错误的比较方式
if (a === b) {...}

// 正确的比较方式
function floatEqual(a, b, epsilon = 1e-10) {
  return Math.abs(a - b) < epsilon;
}</code></pre>
                    </div>
                  </div>
                </div>
                <div class="practice">
                  <div class="icon">3</div>
                  <div class="content">
                    <h4>优先使用整数</h4>
                    <p>金额以分为单位存储，避免使用元的小数形式</p>
                  </div>
                </div>
                <div class="practice">
                  <div class="icon">4</div>
                  <div class="content">
                    <h4>了解语言限制</h4>
                    <p>JavaScript 最大安全整数为 2<sup>53</sup>-1 (9,007,199,254,740,991)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 JavaScript 浮点数精度问题基础介绍 | 理解与解决计算机中的小数问题</p>
      <p>IEEE 754 是浮点数表示的国际标准，被几乎所有现代计算机系统采用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'problem', title: '问题现象' },
  { id: 'principle', title: '问题原理' },
  { id: 'solutions', title: '解决方案' }
]);

// 当前活动部分
const activeSection = ref('problem');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@primary-color: #3b82f6;
@error-color: #ef4444;
@success-color: #10b981;
@header-bg: #ffffff;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

// 全局样式
.float-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: @header-bg;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .title-container {
    max-width: 600px;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: @text-color;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-secondary;
      margin: 0.5rem 0 0;
    }
  }

  .problem-example {
    .code-block {
      background: #2d2d2d;
      color: #f8f8f2;
      border-radius: 8px;
      padding: 1.25rem;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 1.1rem;

      pre {
        margin: 0;
      }
    }
  }
}

.content-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 220px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;

  .section-title {
    color: @text-secondary;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 1.5rem 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: lighten(@primary-color, 40%);
    }

    &.active {
      background-color: lighten(@primary-color, 35%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: darken(@primary-color, 20%);
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.75rem;
      color: @text-color;
      margin: 0;
    }
  }
}

.tag {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  background: lighten(@primary-color, 40%);
  color: darken(@primary-color, 20%);
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  .box-shadow;
}

.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .problem-card {
    background: lighten(@primary-color, 45%);
    border-radius: 10px;
    padding: 1.5rem;

    .problem-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .code-block {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 1rem;
      margin-top: 1rem;
      font-size: 0.95rem;
      overflow-x: auto;

      pre {
        margin: 0;
      }
    }
  }
}

.consequences {
  margin-top: 2rem;

  .consequence-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .consequence {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: lighten(@error-color, 40%);
      border-radius: 10px;

      .icon {
        font-size: 1.75rem;
        flex-shrink: 0;
      }
    }
  }
}

.ieee754 {
  margin-bottom: 2rem;

  .float-representation {
    display: flex;
    margin: 1.5rem 0;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;

    .sign-bit,
    .exponent,
    .mantissa {
      text-align: center;
      padding: 1rem;

      .bit {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
    }

    .sign-bit {
      background: lighten(@primary-color, 40%);
      flex: 1;
    }

    .exponent {
      background: lighten(@primary-color, 30%);
      flex: 3;
    }

    .mantissa {
      background: lighten(@primary-color, 20%);
      flex: 5;
    }
  }

  .total-bits {
    text-align: center;
    font-weight: 500;
    color: @text-secondary;
    margin-bottom: 1rem;
  }

  .explanation {
    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
      }
    }
  }
}

.binary-problem {
  margin: 2rem 0;

  .problem-steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;

    .step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: #f1f5f9;
      border-radius: 10px;

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
      }

      .binary {
        font-family: 'Fira Code', monospace;
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 0.75rem;
        border-radius: 6px;
        margin-top: 0.75rem;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }
}

.visualization {
  margin-top: 2rem;
  padding: 1.5rem;
  background: lighten(@error-color, 45%);
  border-radius: 10px;

  .precision-loss {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;

    .real-value,
    .stored-value,
    .difference {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
    }

    .real-value {
      background: lighten(@success-color, 40%);
      border: 1px solid @success-color;
    }

    .stored-value {
      background: lighten(@primary-color, 40%);
      border: 1px solid @primary-color;
    }

    .difference {
      background: lighten(@error-color, 35%);
      border: 1px solid @error-color;
    }
  }

  .note {
    text-align: center;
    font-size: 0.9rem;
    color: @text-secondary;
    margin-top: 0.5rem;
  }
}

.solution-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .method {
    background: #f8fafc;
    border-radius: 10px;
    overflow: hidden;
    .box-shadow;

    &-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: lighten(@primary-color, 40%);

      .method-icon {
        font-size: 1.75rem;
      }
    }

    &-desc {
      padding: 1.25rem;

      .libraries {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;

        .library {
          background: #f1f5f9;
          border-radius: 8px;
          padding: 1rem;

          .name {
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .code {
            background: #2d2d2d;
            color: #f8f8f2;
            border-radius: 6px;
            padding: 0.75rem;
            font-size: 0.85rem;
            overflow-x: auto;

            pre {
              margin: 0;
            }
          }
        }
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        background: lighten(@error-color, 45%);
        border-left: 4px solid @error-color;
        border-radius: 0 4px 4px 0;
        padding: 1rem;
        margin-top: 1rem;

        .icon {
          font-size: 1.25rem;
        }
      }
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid @border-color;

      .pros,
      .cons {
        padding: 1rem;

        .title {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        ul {
          padding-left: 1.25rem;
          margin: 0;
        }
      }

      .pros {
        background: lighten(@success-color, 50%);
      }

      .cons {
        background: lighten(@error-color, 45%);
      }
    }
  }
}

.best-practices {
  margin-top: 2rem;

  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .practice {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: #f1f5f9;
      border-radius: 10px;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        font-weight: bold;
        flex-shrink: 0;
      }

      .code-block {
        background: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 1rem;
        margin-top: 0.75rem;
        font-size: 0.9rem;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @header-bg;
  color: @text-secondary;
  font-size: 0.85rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.25rem 0;
  }
}

// 响应式设计
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    .problem-example {
      width: 100%;
      margin-top: 1rem;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 1.6rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .content-container {
    padding: 1rem;
  }

  .problem-grid {
    grid-template-columns: 1fr;
  }

  .solution-methods {
    grid-template-columns: 1fr;
  }
}
</style>
