<template>
  <div class="array-container">
    <div class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24">
          <path d="M3,5H21V7H3V5M3,9H21V11H3V9M3,13H21V15H3V13M3,17H21V19H3V17Z" />
        </svg>
      </div>
      <h1>JavaScript Array 基本介绍</h1>
      <p class="subtitle">掌握数组的创建、操作、性能及最佳实践</p>
    </div>

    <div class="content">
      <!-- 数组简介 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>数组简介</h2>
        </div>
        <div class="section-content">
          <div class="overview-grid">
            <div class="overview-card">
              <h3>什么是数组</h3>
              <p>数组是JavaScript中用于存储有序集合的对象，可以包含不同类型的数据项。</p>
            </div>
            <div class="overview-card">
              <h3>数组特点</h3>
              <ul>
                <li>有序集合，元素有索引位置</li>
                <li>零索引（索引从0开始）</li>
                <li>可动态调整大小</li>
                <li>可包含不同类型的数据</li>
              </ul>
            </div>
            <div class="overview-card">
              <h3>数组属性</h3>
              <div class="props">
                <div class="prop">
                  <span class="prop-name">length</span>
                  <span class="prop-desc">数组元素个数</span>
                </div>
                <div class="prop">
                  <span class="prop-name">constructor</span>
                  <span class="prop-desc">返回数组构造函数</span>
                </div>
                <div class="prop">
                  <span class="prop-name">prototype</span>
                  <span class="prop-desc">允许添加属性和方法</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数组创建 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🛠️</div>
          <h2>数组创建方式</h2>
        </div>
        <div class="section-content">
          <div class="creation-grid">
            <div class="creation-card">
              <h3>数组字面量</h3>
              <div class="code-block">
                <pre>// 空数组
const arr1 = [];

// 带初始值
const arr2 = [1, 2, 'three', true];</pre>
              </div>
              <div class="usage">
                <span class="usage-label">最常用方式</span>
                <span class="usage-value">95% 使用率</span>
              </div>
            </div>

            <div class="creation-card">
              <h3>Array 构造函数</h3>
              <div class="code-block">
                <pre>// 空数组
const arr1 = new Array();

// 带初始长度
const arr2 = new Array(5); // [ &lt;5 empty items> ]

// 带初始值
const arr3 = new Array(1, 2, 3);</pre>
              </div>
              <div class="warning">
                <span class="warning-icon">⚠️</span>
                <span>避免使用 new Array(5) 创建稀疏数组</span>
              </div>
            </div>

            <div class="creation-card">
              <h3>Array.of()</h3>
              <div class="code-block">
                <pre>// 创建带元素的数组
const arr1 = Array.of(5); // [5]
const arr2 = Array.of(1, 2, 3); // [1, 2, 3]</pre>
              </div>
              <div class="usage">
                <span class="usage-label">解决构造函数问题</span>
                <span class="usage-value">ES6+</span>
              </div>
            </div>

            <div class="creation-card">
              <h3>Array.from()</h3>
              <div class="code-block">
                <pre>// 从类数组创建
const arr1 = Array.from('hello');
// ['h', 'e', 'l', 'l', 'o']

// 从迭代对象创建
const arr2 = Array.from(new Set([1, 2, 2, 3]));
// [1, 2, 3]

// 设定长度创建
const arr3 = Array.from({ length: 5 }, (_, i) => i);
// [0, 1, 2, 3, 4]
</pre>
              </div>
              <div class="usage">
                <span class="usage-label">转换类数组对象</span>
                <span class="usage-value">ES6+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数组清空 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🧹</div>
          <h2>数组清空</h2>
        </div>
        <div class="section-content">
          <div class="creation-grid">
            <div class="creation-card">
              <div>利用length清空数组</div>
              <div class="code-block">
                <pre>const arr = [1, 2, 3];
arr.length = 0;
console.log(arr); // []</pre>
              </div>
              <div class="usage">
                <span class="usage-label">推荐使用</span>
                <span class="usage-value">95% 使用率</span>
              </div>
            </div>
            <div class="creation-card">
              <div>利用splice清空数组</div>
              <div class="code-block">
                <pre>const arr = [1, 2, 3];
arr.splice(0, arr.length);
console.log(arr); // []</pre>
              </div>
              <div class="warning">
                <span class="warning-icon">⚠️</span>
                <span>性能较差</span>
              </div>
            </div>
            <div class="creation-card">
              <div>利用赋值清空数组</div>
              <div class="code-block">
                <pre>const arr = [1, 2, 3];
arr = [];
console.log(arr); // []</pre>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 数组操作与性能 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">⚡</div>
          <h2>数组操作与性能分析</h2>
        </div>
        <div class="section-content">
          <div class="performance-intro">
            <p>JavaScript数组在V8引擎中的实现：</p>
            <ul>
              <li>小数组（&lt;10个元素）使用线性存储</li>
              <li>大数组使用哈希表（类似对象）</li>
              <li>数组类型切换（PACKED ↔ HOLEY）会影响性能</li>
            </ul>
          </div>

          <div class="performance-grid">
            <div class="operation-table">
              <h3>数组操作时间复杂度</h3>
              <table>
                <thead>
                  <tr>
                    <th>操作</th>
                    <th>时间复杂度</th>
                    <th>性能</th>
                    <th>描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>索引访问 (arr[i])</td>
                    <td>O(1)</td>
                    <td>
                      <div class="perf-bar" style="width: 95%"></div>
                    </td>
                    <td>直接内存访问</td>
                  </tr>
                  <tr>
                    <td>尾部插入 (push)</td>
                    <td>O(1)</td>
                    <td>
                      <div class="perf-bar" style="width: 90%"></div>
                    </td>
                    <td>高效，动态扩容</td>
                  </tr>
                  <tr>
                    <td>尾部删除 (pop)</td>
                    <td>O(1)</td>
                    <td>
                      <div class="perf-bar" style="width: 92%"></div>
                    </td>
                    <td>高效，不需要移动元素</td>
                  </tr>
                  <tr>
                    <td>头部插入 (unshift)</td>
                    <td>O(n)</td>
                    <td>
                      <div class="perf-bar" style="width: 30%"></div>
                    </td>
                    <td>需要移动所有元素</td>
                  </tr>
                  <tr>
                    <td>头部删除 (shift)</td>
                    <td>O(n)</td>
                    <td>
                      <div class="perf-bar" style="width: 35%"></div>
                    </td>
                    <td>需要移动所有元素</td>
                  </tr>
                  <tr>
                    <td>中间插入/删除 (splice)</td>
                    <td>O(n)</td>
                    <td>
                      <div class="perf-bar" style="width: 40%"></div>
                    </td>
                    <td>取决于插入位置</td>
                  </tr>
                  <tr>
                    <td>查找 (indexOf)</td>
                    <td>O(n)</td>
                    <td>
                      <div class="perf-bar" style="width: 50%"></div>
                    </td>
                    <td>线性搜索</td>
                  </tr>
                  <tr>
                    <td>排序 (sort)</td>
                    <td>O(n log n)</td>
                    <td>
                      <div class="perf-bar" style="width: 60%"></div>
                    </td>
                    <td>V8使用TimSort算法</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="performance-tips">
              <h3>性能优化技巧</h3>
              <div class="tip-card">
                <div class="tip-header">
                  <div class="tip-icon">🚀</div>
                  <h4>预分配数组大小</h4>
                </div>
                <p>当知道数组大小时，使用 <code>new Array(size)</code> 预分配空间，避免动态扩容开销。</p>
                <div class="code-compare">
                  <div class="code-bad">
                    <div class="code-label">低效:</div>
                    <pre>const arr = [];
for (let i = 0; i &lt; 10000; i++) {
  arr.push(i); // 多次扩容
}</pre>
                  </div>
                  <div class="code-good">
                    <div class="code-label">高效:</div>
                    <pre>const arr = new Array(10000);
for (let i = 0; i &lt; 10000; i++) {
  arr[i] = i; // 直接赋值
}</pre>
                  </div>
                </div>
              </div>

              <div class="tip-card">
                <div class="tip-header">
                  <div class="tip-icon">🔍</div>
                  <h4>避免稀疏数组</h4>
                </div>
                <p>稀疏数组（含有空位）会使引擎退化为字典模式，大大降低操作性能。</p>
                <div class="code-compare">
                  <div class="code-bad">
                    <div class="code-label">稀疏数组:</div>
                    <pre>const sparse = new Array(5);
sparse[100] = 'value'; // 创建95个空位</pre>
                  </div>
                  <div class="code-good">
                    <div class="code-label">密集数组:</div>
                    <pre>const dense = [];
for (let i = 0; i &lt; 5; i++) {
  dense[i] = i; // 无空位
}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">⚠️</div>
          <h2>使用注意事项</h2>
        </div>
        <div class="section-content">
          <div class="warning-cards">
            <div class="warning-card">
              <div class="warning-icon">1</div>
              <h3>引用类型问题</h3>
              <p>数组存储的是对象的引用，修改元素会影响所有引用该对象的变量。</p>
              <div class="code-block">
                <pre>const obj = { id: 1 };
const arr1 = [obj];
const arr2 = arr1.slice();

arr1[0].id = 100;
console.log(arr2[0].id); // 100，共享引用</pre>
              </div>
              <div class="solution">
                <strong>解决方案：</strong> 使用深拷贝创建新数组
              </div>
            </div>

            <div class="warning-card">
              <div class="warning-icon">2</div>
              <h3>数组长度陷阱</h3>
              <p>直接设置 <code>length</code> 属性会截断数组，可能导致数据丢失。</p>
              <div class="code-block">
                <pre>const arr = [1, 2, 3, 4, 5];
arr.length = 3; // 截断数组
console.log(arr); // [1, 2, 3]
console.log(arr[4]); // undefined</pre>
              </div>
              <div class="solution">
                <strong>解决方案：</strong> 使用 <code>splice</code> 代替直接修改 length
              </div>
            </div>

            <div class="warning-card">
              <div class="warning-icon">3</div>
              <h3>数组迭代问题</h3>
              <p><code>for...in</code> 会遍历数组的原型链和可枚举属性，不推荐使用。</p>
              <div class="code-block">
                <pre>Array.prototype.customMethod = () => {};
const arr = ['a', 'b', 'c'];

for (let key in arr) {
  console.log(key); // 输出 0,1,2,customMethod
}</pre>
              </div>
              <div class="solution">
                <strong>解决方案：</strong> 使用 <code>for...of</code> 或 <code>forEach</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 适用场景 -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>数组适用场景</h2>
        </div>
        <div class="section-content">
          <div class="usage-scenarios">
            <div class="scenario-card">
              <div class="scenario-icon">📊</div>
              <h3>数据集合</h3>
              <ul>
                <li>存储同类型数据列表</li>
                <li>API响应数据集合</li>
                <li>数据库查询结果</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🧮</div>
              <h3>算法实现</h3>
              <ul>
                <li>栈和队列实现</li>
                <li>排序和搜索算法</li>
                <li>图/树遍历</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">✨</div>
              <h3>数据处理</h3>
              <ul>
                <li>数据转换和格式化</li>
                <li>流式数据处理</li>
                <li>分页和切片</li>
              </ul>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🚫</div>
              <h3>不适用场景</h3>
              <ul>
                <li>键值对存储（使用Map/Object）</li>
                <li>唯一值集合（使用Set）</li>
                <li>大数据频繁插入/删除（考虑链表）</li>
              </ul>
            </div>
          </div>

          <div class="best-practices">
            <h3>数组最佳实践</h3>
            <div class="practices-grid">
              <div class="practice-card">
                <div class="practice-icon">📐</div>
                <p>优先使用字面量 <code>[]</code> 而不是 <code>new Array()</code></p>
              </div>
              <div class="practice-card">
                <div class="practice-icon">🔢</div>
                <p>避免使用稀疏数组（包含空位）</p>
              </div>
              <div class="practice-card">
                <div class="practice-icon">🧹</div>
                <p>使用 <code>Array.isArray()</code> 检查数组类型</p>
              </div>
              <div class="practice-card">
                <div class="practice-icon">🚮</div>
                <p>使用 <code>filter</code> 替代 <code>delete</code> 删除元素</p>
              </div>
              <div class="practice-card">
                <div class="practice-icon">⏱️</div>
                <p>大型数组操作使用 TypedArray</p>
              </div>
              <div class="practice-card">
                <div class="practice-icon">🔁</div>
                <p>优先使用不可变数组方法（map/filter）</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>JavaScript数组是高效的数据结构 | 合理使用可提升应用性能和可维护性</p>
      <div class="footer-links">
        <span>ECMAScript 2023 规范</span>
        <span>MDN Web 文档</span>
        <span>V8引擎优化指南</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const arrayExamples = ref([
  { name: '字面量创建', code: "const arr = [1, 2, 3];" },
  { name: '构造函数', code: "const arr = new Array(1, 2, 3);" },
  { name: 'Array.from', code: "const arr = Array.from('123');" }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #34495e;
@light-text: #7f8c8d;
@code-bg: #2d3748;
@success-color: #2ecc71;
@warning-color: #f39c12;

.array-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 2rem 1rem;
  margin-bottom: 1.5rem;

  .logo {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, @primary-color, darken(@primary-color, 10%));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 40px;
      height: 40px;
      fill: white;
    }
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  margin-bottom: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-color;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  .overview-card {
    background: rgba(@primary-color, 0.03);
    border: 1px solid fade(@primary-color, 15%);
    border-radius: 12px;
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @secondary-color;
      border-bottom: 1px solid @border-color;
      padding-bottom: 0.5rem;
    }

    p,
    ul {
      margin: 0;
      color: @light-text;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
      }
    }

    .props {
      .prop {
        display: flex;
        margin-bottom: 0.8rem;
        border-bottom: 1px dashed @border-color;
        padding-bottom: 0.5rem;

        .prop-name {
          width: 120px;
          font-weight: 600;
          color: @primary-color;
        }

        .prop-desc {
          flex: 1;
          color: @light-text;
        }
      }
    }
  }
}

.creation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .creation-card {
    border: 1px solid fade(@primary-color, 20%);
    border-radius: 12px;
    padding: 1.5rem;
    background: @card-bg;

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-color;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .code-block {
      background: darken(@light-bg, 2%);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;

      pre {
        margin: 0;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.9rem;
        line-height: 1.4;
        color: @text-color;
        overflow-x: auto;
      }
    }

    .usage {
      display: flex;
      justify-content: space-between;
      background: rgba(@success-color, 0.1);
      border-radius: 6px;
      padding: 0.5rem;
      font-size: 0.9rem;

      .usage-label {
        font-weight: 600;
        color: darken(@success-color, 15%);
      }

      .usage-value {
        color: @light-text;
        font-family: monospace;
      }
    }

    .warning {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(@warning-color, 0.1);
      border-radius: 6px;
      padding: 0.5rem;
      font-size: 0.9rem;
      color: darken(@warning-color, 15%);
      font-weight: 600;

      .warning-icon {
        font-size: 1.2rem;
      }
    }
  }
}

.performance-intro {
  background: rgba(@primary-color, 0.05);
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;

  p {
    font-weight: 600;
    margin-top: 0;
    color: @primary-color;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.performance-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.operation-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    th,
    td {
      padding: 0.8rem;
      text-align: left;
      border: 1px solid @border-color;
    }

    th {
      background: @primary-color;
      color: white;
      font-weight: 600;
      position: sticky;
      top: 0;
    }

    tr:nth-child(even) {
      background-color: rgba(@primary-color, 0.05);
    }

    .perf-bar {
      height: 8px;
      background: linear-gradient(90deg, @success-color, @warning-color);
      border-radius: 4px;
    }
  }
}

.performance-tips {
  .tip-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.2rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    .tip-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.8rem;

      .tip-icon {
        font-size: 1.5rem;
      }

      h4 {
        margin: 0;
        color: @secondary-color;
      }
    }

    p {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @light-text;
    }
  }
}

.code-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .code-bad,
  .code-good {
    border-radius: 8px;
    overflow: hidden;

    .code-label {
      padding: 0.4rem 0.8rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    pre {
      margin: 0;
      padding: 0.8rem;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }

  .code-bad {
    border: 1px solid fade(@accent-color, 30%);

    .code-label {
      background: fade(@accent-color, 15%);
      color: darken(@accent-color, 10%);
    }

    pre {
      background: fade(@accent-color, 5%);
    }
  }

  .code-good {
    border: 1px solid fade(@success-color, 30%);

    .code-label {
      background: fade(@success-color, 15%);
      color: darken(@success-color, 15%);
    }

    pre {
      background: fade(@success-color, 5%);
    }
  }
}

.warning-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;

  .warning-card {
    border: 1px solid fade(@warning-color, 30%);
    border-radius: 12px;
    padding: 1.5rem;
    background: rgba(@warning-color, 0.03);

    .warning-icon {
      width: 32px;
      height: 32px;
      background: @warning-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: darken(@warning-color, 15%);
    }

    p {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @light-text;
    }
  }
}

.code-block {
  background: darken(@card-bg, 2%);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;

  pre {
    margin: 0;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.4;
    color: @text-color;
    overflow-x: auto;
  }
}

.solution {
  background: rgba(@success-color, 0.1);
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: darken(@success-color, 15%);
  margin-top: 1rem;
}

.usage-scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .scenario-card {
    border: 1px solid fade(@primary-color, 15%);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @secondary-color;
    }

    ul {
      padding-left: 1.2rem;
      text-align: left;
      margin-bottom: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        color: @light-text;
      }
    }
  }
}

.best-practices {
  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid @border-color;
  }

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;

    .practice-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(@success-color, 0.05);
      border-radius: 10px;
      padding: 1rem;
      border-left: 3px solid @success-color;

      .practice-icon {
        font-size: 1.8rem;
        color: @success-color;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 500;

        code {
          background: rgba(0, 0, 0, 0.05);
          padding: 0.1rem 0.3rem;
          border-radius: 4px;
          font-family: monospace;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 0.95rem;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 0.8rem;

    span {
      cursor: pointer;
      color: @primary-color;
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem 0.5rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .performance-grid {
    grid-template-columns: 1fr;
  }
}
</style>
